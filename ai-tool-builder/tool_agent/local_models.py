from __future__ import annotations

import json
import re
import shutil
import subprocess
import threading
import time
import uuid
from copy import deepcopy
from datetime import UTC, datetime
from typing import Any

import requests


MODEL_NAME_RE = re.compile(
    r"^[A-Za-z0-9][A-Za-z0-9._-]*(?:/[A-Za-z0-9][A-Za-z0-9._-]*)*(?::[A-Za-z0-9][A-Za-z0-9._-]*)?$"
)


class LocalModelError(RuntimeError):
    """A user-actionable Ollama/model error."""


def validate_model_name(value: Any) -> str:
    if not isinstance(value, str):
        raise ValueError("Model name must be text.")
    model = value.strip()
    if not model or len(model) > 120 or not MODEL_NAME_RE.fullmatch(model):
        raise ValueError(
            "Use a valid Ollama model tag such as gemma3:4b or gemma3:12b."
        )
    return model


class LocalModelManager:
    def __init__(self, base_url: str = "http://127.0.0.1:11434") -> None:
        self.base_url = base_url.rstrip("/")
        self._pulls: dict[str, dict[str, Any]] = {}
        self._lock = threading.Lock()

    def status(self, model: str) -> dict[str, Any]:
        model = validate_model_name(model)
        executable = shutil.which("ollama")
        try:
            response = requests.get(f"{self.base_url}/api/tags", timeout=2.5)
            response.raise_for_status()
            payload = response.json()
            models = payload.get("models", []) if isinstance(payload, dict) else []
            installed = sorted(
                {
                    str(item.get("name", "")).strip()
                    for item in models
                    if isinstance(item, dict) and item.get("name")
                }
            )
            return {
                "ollama_installed": executable is not None,
                "server_ready": True,
                "model": model,
                "model_ready": self._is_installed(model, installed),
                "installed_models": installed,
                "message": (
                    f"{model} is downloaded and ready for offline use."
                    if self._is_installed(model, installed)
                    else f"Ollama is ready. Download {model} once to use it offline."
                ),
            }
        except (requests.RequestException, ValueError, json.JSONDecodeError):
            installed_message = (
                "Ollama is installed but its local server is not running."
                if executable
                else "Ollama is not installed on this computer."
            )
            return {
                "ollama_installed": executable is not None,
                "server_ready": False,
                "model": model,
                "model_ready": False,
                "installed_models": [],
                "message": installed_message,
            }

    def ensure_server(self) -> dict[str, Any]:
        current = self.status("gemma3:4b")
        if current["server_ready"]:
            return current
        executable = shutil.which("ollama")
        if executable is None:
            raise LocalModelError(
                "Ollama is not installed. Run 'winget install Ollama.Ollama', "
                "then reopen this app."
            )

        creationflags = getattr(subprocess, "CREATE_NO_WINDOW", 0)
        try:
            subprocess.Popen(
                [executable, "serve"],
                stdin=subprocess.DEVNULL,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
                creationflags=creationflags,
            )
        except OSError as error:
            raise LocalModelError(f"Could not start Ollama: {error}") from error

        for _ in range(20):
            time.sleep(0.25)
            current = self.status("gemma3:4b")
            if current["server_ready"]:
                return current
        raise LocalModelError(
            "Ollama was started, but its API did not become ready. Open Ollama and retry."
        )

    def create_pull(self, model: str) -> str:
        model = validate_model_name(model)
        pull_id = uuid.uuid4().hex
        now = datetime.now(UTC).isoformat()
        with self._lock:
            self._pulls[pull_id] = {
                "id": pull_id,
                "model": model,
                "status": "queued",
                "progress": 0,
                "message": f"Preparing to download {model}",
                "created_at": now,
                "updated_at": now,
                "logs": [f"Queued one-time download for {model}"],
                "error": None,
            }
        return pull_id

    def run_pull(self, pull_id: str) -> None:
        pull = self.get_pull(pull_id)
        if pull is None:
            return
        model = pull["model"]
        try:
            self._update_pull(pull_id, "running", 1, "Starting Ollama")
            self.ensure_server()
            self._update_pull(pull_id, "running", 2, f"Connecting to {model}")
            with requests.post(
                f"{self.base_url}/api/pull",
                json={"name": model, "stream": True},
                stream=True,
                timeout=(10, 3600),
            ) as response:
                response.raise_for_status()
                for raw_line in response.iter_lines():
                    if not raw_line:
                        continue
                    event = json.loads(raw_line.decode("utf-8"))
                    if not isinstance(event, dict):
                        continue
                    if event.get("error"):
                        raise LocalModelError(str(event["error"]))
                    completed = event.get("completed")
                    total = event.get("total")
                    if isinstance(completed, int) and isinstance(total, int) and total:
                        percent = min(99, max(2, round(completed / total * 100)))
                    else:
                        percent = self.get_pull(pull_id).get("progress", 2)
                    message = str(event.get("status") or "Downloading model layers")
                    self._update_pull(pull_id, "running", percent, message)
            self._update_pull(
                pull_id,
                "complete",
                100,
                f"{model} is ready. Generation now works without internet.",
            )
        except (
            LocalModelError,
            requests.RequestException,
            json.JSONDecodeError,
            UnicodeDecodeError,
        ) as error:
            self._fail_pull(pull_id, str(error))

    def get_pull(self, pull_id: str) -> dict[str, Any] | None:
        with self._lock:
            pull = self._pulls.get(pull_id)
            return deepcopy(pull) if pull else None

    def _update_pull(
        self, pull_id: str, status: str, progress: int, message: str
    ) -> None:
        with self._lock:
            pull = self._pulls[pull_id]
            if not pull["logs"] or pull["logs"][-1] != message:
                pull["logs"].append(message)
                pull["logs"] = pull["logs"][-80:]
            pull.update(
                {
                    "status": status,
                    "progress": min(max(int(progress), 0), 100),
                    "message": message,
                    "updated_at": datetime.now(UTC).isoformat(),
                }
            )

    def _fail_pull(self, pull_id: str, message: str) -> None:
        public_message = " ".join(message.split())[:400] or "Model download failed."
        with self._lock:
            pull = self._pulls[pull_id]
            pull["logs"].append(f"ERROR: {public_message}")
            pull.update(
                {
                    "status": "failed",
                    "message": public_message,
                    "error": public_message,
                    "updated_at": datetime.now(UTC).isoformat(),
                }
            )

    @staticmethod
    def _is_installed(model: str, installed: list[str]) -> bool:
        requested = model if ":" in model else f"{model}:latest"
        return any(
            (name if ":" in name else f"{name}:latest") == requested
            for name in installed
        )
