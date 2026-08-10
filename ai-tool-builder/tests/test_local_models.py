from __future__ import annotations

import unittest
from unittest.mock import Mock, patch

from tool_agent.local_models import LocalModelManager, validate_model_name


class LocalModelTests(unittest.TestCase):
    def test_accepts_gemma_ollama_tags(self) -> None:
        self.assertEqual(validate_model_name("gemma3:4b"), "gemma3:4b")
        self.assertEqual(
            validate_model_name("library/custom-code-model:latest"),
            "library/custom-code-model:latest",
        )

    def test_rejects_model_name_with_command_characters(self) -> None:
        with self.assertRaisesRegex(ValueError, "valid Ollama model tag"):
            validate_model_name("gemma3:4b; Remove-Item")

    @patch("tool_agent.local_models.shutil.which", return_value="ollama.exe")
    @patch("tool_agent.local_models.requests.get")
    def test_reports_downloaded_model_ready(
        self, get: Mock, _which: Mock
    ) -> None:
        response = Mock()
        response.json.return_value = {"models": [{"name": "gemma3:4b"}]}
        response.raise_for_status.return_value = None
        get.return_value = response

        status = LocalModelManager().status("gemma3:4b")

        self.assertTrue(status["server_ready"])
        self.assertTrue(status["model_ready"])


if __name__ == "__main__":
    unittest.main()
