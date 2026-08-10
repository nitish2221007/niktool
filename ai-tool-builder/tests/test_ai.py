from __future__ import annotations

import unittest
from types import SimpleNamespace
from unittest.mock import Mock

from tool_agent.ai import AIResponseError, AIService


class AIServiceTests(unittest.TestCase):
    def setUp(self) -> None:
        self.service = AIService(
            api_key="test-key",
            model="gemini-3.5-flash",
            base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
        )
        self.service.client = Mock()

    def test_gemini_uses_standard_chat_completion_fields(self) -> None:
        self.service.client.chat.completions.create.return_value = SimpleNamespace(
            choices=[
                SimpleNamespace(
                    message=SimpleNamespace(content='{"result": "ok"}')
                )
            ]
        )

        result = self.service.json_response(
            instructions="Return structured data.",
            payload={"input": "hello"},
            response_contract={"result": "text"},
        )

        self.assertEqual(result, {"result": "ok"})
        request = self.service.client.chat.completions.create.call_args.kwargs
        self.assertEqual(request["model"], "gemini-3.5-flash")
        self.assertEqual(request["messages"][0]["role"], "system")
        self.assertEqual(request["messages"][1]["role"], "user")

    def test_rejects_empty_completion_choices(self) -> None:
        self.service.client.chat.completions.create.return_value = SimpleNamespace(
            choices=[]
        )

        with self.assertRaisesRegex(AIResponseError, "did not contain a choice"):
            self.service.json_response(
                instructions="Return structured data.",
                payload={},
                response_contract={"result": "text"},
            )


if __name__ == "__main__":
    unittest.main()

