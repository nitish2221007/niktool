from __future__ import annotations

import threading
import uuid
from copy import deepcopy
from datetime import UTC, datetime
from typing import Any


class JobStore:
    def __init__(self, limit: int = 50) -> None:
        self._jobs: dict[str, dict[str, Any]] = {}
        self._lock = threading.Lock()
        self._limit = limit

    def create(self, niche: str) -> str:
        job_id = uuid.uuid4().hex
        now = datetime.now(UTC).isoformat()
        time_str = datetime.now(UTC).strftime("%H:%M:%S")
        with self._lock:
            self._prune()
            self._jobs[job_id] = {
                "id": job_id,
                "niche": niche,
                "status": "queued",
                "stage": "queued",
                "progress": 0,
                "message": "Waiting to start",
                "created_at": now,
                "updated_at": now,
                "logs": [f"[{time_str}] Queued build for idea '{niche}'"],
                "preview": None,
                "result": None,
                "error": None,
            }
        return job_id

    def update(self, job_id: str, stage: str, progress: int, message: str) -> None:
        with self._lock:
            job = self._jobs[job_id]
            time_str = datetime.now(UTC).strftime("%H:%M:%S")
            log_entry = f"[{time_str}] [{stage.upper()}] ({progress}%) {message}"
            logs = job.setdefault("logs", [])
            if not logs or logs[-1] != log_entry:
                logs.append(log_entry)
            job.update(
                {
                    "status": "running",
                    "stage": stage,
                    "progress": min(max(int(progress), 0), 100),
                    "message": message,
                    "updated_at": datetime.now(UTC).isoformat(),
                }
            )

    def add_log(self, job_id: str, text: str) -> None:
        with self._lock:
            if job_id in self._jobs:
                time_str = datetime.now(UTC).strftime("%H:%M:%S")
                self._jobs[job_id].setdefault("logs", []).append(f"[{time_str}] {text}")

    def publish_idea(self, job_id: str, idea: dict[str, Any]) -> None:
        with self._lock:
            job = self._jobs[job_id]
            job["preview"] = deepcopy(idea)
            time_str = datetime.now(UTC).strftime("%H:%M:%S")
            job.setdefault("logs", []).append(
                f"[{time_str}] [IDEATION] Proposed idea: '{idea.get('name')}' (slug: {idea.get('slug')})"
            )
            job["updated_at"] = datetime.now(UTC).isoformat()

    def complete(
        self,
        job_id: str,
        result: dict[str, Any],
        message: str = "Research report and tool folder are ready",
    ) -> None:
        with self._lock:
            job = self._jobs[job_id]
            time_str = datetime.now(UTC).strftime("%H:%M:%S")
            job.setdefault("logs", []).append(f"[{time_str}] [COMPLETE] (100%) {message}")
            job.update(
                {
                    "status": "complete",
                    "stage": "complete",
                    "progress": 100,
                    "message": message,
                    "updated_at": datetime.now(UTC).isoformat(),
                    "result": result,
                }
            )

    def append_alternative(
        self, job_id: str, alternative: dict[str, Any]
    ) -> None:
        with self._lock:
            job = self._jobs[job_id]
            result = job.get("result")
            if not isinstance(result, dict):
                raise RuntimeError("The primary job result is unavailable.")
            alternatives = result.setdefault("alternatives", [])
            alternatives.append(deepcopy(alternative))
            job["updated_at"] = datetime.now(UTC).isoformat()

    def fail(self, job_id: str, message: str) -> None:
        with self._lock:
            job = self._jobs[job_id]
            time_str = datetime.now(UTC).strftime("%H:%M:%S")
            job.setdefault("logs", []).append(f"[{time_str}] [ERROR] {message}")
            job.update(
                {
                    "status": "failed",
                    "stage": "failed",
                    "message": message,
                    "updated_at": datetime.now(UTC).isoformat(),
                    "error": message,
                }
            )

    def get(self, job_id: str) -> dict[str, Any] | None:
        with self._lock:
            job = self._jobs.get(job_id)
            return deepcopy(job) if job else None

    def public(self, job_id: str) -> dict[str, Any] | None:
        job = self.get(job_id)
        if job is None:
            return None
        result = job.get("result")
        if isinstance(result, dict):
            output = result.get("output")
            if isinstance(output, dict):
                output.pop("archive_path", None)
                output.pop("report_path", None)
        return job

    def _prune(self) -> None:
        if len(self._jobs) < self._limit:
            return
        finished = [
            job
            for job in self._jobs.values()
            if job["status"] in {"complete", "failed"}
        ]
        finished.sort(key=lambda item: item["updated_at"])
        for job in finished[: max(1, len(self._jobs) - self._limit + 1)]:
            self._jobs.pop(job["id"], None)
