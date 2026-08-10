from __future__ import annotations

import os
import unittest
from pathlib import Path
from unittest.mock import patch

from tool_agent.config import BuilderConfig


class BuilderConfigTests(unittest.TestCase):
    def test_selects_local_gemma_defaults(self) -> None:
        with patch.dict(
            os.environ,
            {
                "AI_PROVIDER": "ollama",
                "OLLAMA_MODEL": "gemma3:4b",
                "OLLAMA_BASE_URL": "http://127.0.0.1:11434/v1",
            },
            clear=False,
        ):
            config = BuilderConfig.from_env(Path.cwd())

        self.assertEqual(config.provider, "ollama")
        self.assertEqual(config.api_key, "ollama")
        self.assertEqual(config.model, "gemma3:4b")
        self.assertFalse(config.web_research_enabled)
        self.assertEqual(config.base_url, "http://127.0.0.1:11434/v1")

    def test_selects_gemini_credentials_and_defaults(self) -> None:
        with patch.dict(
            os.environ,
            {
                "AI_PROVIDER": "gemini",
                "GEMINI_API_KEY": "gemini-test-key",
                "GEMINI_MODEL": "gemini-3.5-flash",
            },
            clear=False,
        ):
            config = BuilderConfig.from_env(Path.cwd())

        self.assertEqual(config.provider, "gemini")
        self.assertEqual(config.api_key, "gemini-test-key")
        self.assertEqual(config.model, "gemini-3.5-flash")
        self.assertEqual(
            config.base_url,
            "https://generativelanguage.googleapis.com/v1beta/openai",
        )

    def test_selects_nvidia_credentials(self) -> None:
        with patch.dict(
            os.environ,
            {
                "AI_PROVIDER": "nvidia",
                "NVIDIA_API_KEY": "nvapi-test-key",
                "NVIDIA_MODEL": "meta/llama-3.3-70b-instruct",
            },
            clear=False,
        ):
            config = BuilderConfig.from_env(Path.cwd())

        self.assertEqual(config.provider, "nvidia")
        self.assertEqual(config.api_key, "nvapi-test-key")
        self.assertEqual(config.model, "meta/llama-3.3-70b-instruct")
        self.assertEqual(config.base_url, "https://integrate.api.nvidia.com/v1")

    def test_rejects_missing_api_key(self) -> None:
        with patch.dict(
            os.environ,
            {"AI_PROVIDER": "gemini", "GEMINI_API_KEY": ""},
            clear=False,
        ):
            config = BuilderConfig.from_env(Path.cwd())

        with self.assertRaisesRegex(RuntimeError, "GEMINI_API_KEY is not configured"):
            config.validate()


if __name__ == "__main__":
    unittest.main()

