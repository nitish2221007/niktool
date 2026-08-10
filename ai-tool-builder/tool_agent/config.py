from __future__ import annotations

import os
from dataclasses import dataclass, replace
from pathlib import Path
from urllib.parse import urlparse


def _as_bool(value: str | None, default: bool) -> bool:
    if value is None:
        return default
    return value.strip().lower() in {"1", "true", "yes", "on"}


@dataclass(frozen=True)
class BuilderConfig:
    app_root: Path
    site_root: Path
    runs_root: Path
    output_root: Path | None
    provider: str
    api_key: str
    model: str
    base_url: str
    web_research_enabled: bool
    search_timeout_seconds: int

    @classmethod
    def from_env(cls, app_root: Path) -> "BuilderConfig":
        app_root = app_root.resolve()
        site_root = Path(os.getenv("NIKTOOL_SITE_ROOT", str(app_root.parent)))
        if not site_root.is_absolute():
            site_root = app_root / site_root

        output_value = os.getenv("NIKTOOL_OUTPUT_ROOT", "").strip()
        output_root = None
        if output_value:
            output_root = Path(output_value)
            if not output_root.is_absolute():
                output_root = app_root / output_root
            output_root = output_root.resolve()

        timeout = int(os.getenv("SEARCH_TIMEOUT_SECONDS", "12"))
        timeout = min(max(timeout, 3), 45)

        provider = os.getenv("AI_PROVIDER", "ollama").strip().lower()
        if provider == "ollama":
            api_key = "ollama"
            model = os.getenv("OLLAMA_MODEL", "gemma3:4b").strip()
            base_url = os.getenv(
                "OLLAMA_BASE_URL", "http://127.0.0.1:11434/v1"
            ).strip().rstrip("/")
        elif provider == "gemini":
            api_key = os.getenv("GEMINI_API_KEY", "").strip()
            model = os.getenv("GEMINI_MODEL", "gemini-2.5-flash").strip()
            base_url = os.getenv(
                "GEMINI_BASE_URL",
                "https://generativelanguage.googleapis.com/v1beta/openai/",
            ).strip().rstrip("/")
        else:
            provider = "nvidia"
            api_key = os.getenv("NVIDIA_API_KEY", os.getenv("AI_API_KEY", "")).strip()
            model = os.getenv("NVIDIA_MODEL", "meta/llama-3.3-70b-instruct").strip()
            base_url = os.getenv(
                "NVIDIA_BASE_URL", "https://integrate.api.nvidia.com/v1"
            ).strip().rstrip("/")

        research_enabled = (
            _as_bool(os.getenv("OLLAMA_WEB_RESEARCH_ENABLED"), False)
            if provider == "ollama"
            else _as_bool(os.getenv("WEB_RESEARCH_ENABLED"), True)
        )

        return cls(
            app_root=app_root,
            site_root=site_root.resolve(),
            runs_root=(app_root / "runs").resolve(),
            output_root=output_root,
            provider=provider,
            api_key=api_key,
            model=model,
            base_url=base_url,
            web_research_enabled=research_enabled,
            search_timeout_seconds=timeout,
        )

    def validate(self) -> None:
        if self.provider not in {"ollama", "nvidia", "gemini"}:
            raise RuntimeError("AI_PROVIDER must be 'ollama', 'nvidia', or 'gemini'.")
        if self.provider != "ollama" and not self.api_key:
            key_name = "NVIDIA_API_KEY" if self.provider == "nvidia" else "GEMINI_API_KEY"
            raise RuntimeError(
                f"{key_name} is not configured. Copy .env.example to .env "
                f"and add your {self.provider.upper()} API key."
            )
        if not self.model:
            raise RuntimeError(f"{self.provider.upper()} model must not be empty.")
        parsed_url = urlparse(self.base_url)
        if self.provider == "ollama":
            if parsed_url.scheme not in {"http", "https"} or parsed_url.hostname not in {
                "127.0.0.1",
                "localhost",
                "::1",
            }:
                raise RuntimeError("OLLAMA_BASE_URL must use a loopback address.")
        elif parsed_url.scheme != "https":
            raise RuntimeError("The selected cloud provider base URL must use HTTPS.")
        if not (self.site_root / "README.md").is_file():
            raise RuntimeError(
                f"NikTool site root is invalid: {self.site_root}. "
                "Set NIKTOOL_SITE_ROOT to the repository containing README.md."
            )
        if not (self.site_root / "tools").is_dir():
            raise RuntimeError(
                f"NikTool tools directory was not found under {self.site_root}."
            )

    def for_local_model(self, model: str) -> "BuilderConfig":
        return replace(
            self,
            provider="ollama",
            api_key="ollama",
            model=model,
            base_url=os.getenv(
                "OLLAMA_BASE_URL", "http://127.0.0.1:11434/v1"
            ).strip().rstrip("/"),
            web_research_enabled=False,
        )
