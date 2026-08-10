from __future__ import annotations

import json
from typing import Any

from openai import OpenAI


class AIResponseError(RuntimeError):
    """Raised when a model response is missing required JSON."""


class AIService:
    def __init__(self, api_key: str, model: str, base_url: str) -> None:
        self.model = model
        self.local = base_url.startswith(
            ("http://127.0.0.1", "http://localhost", "http://[::1]")
        )
        self.client = OpenAI(
            api_key=api_key,
            base_url=base_url,
            timeout=600.0 if self.local else 120.0,
            max_retries=2,
        )

    def json_response(
        self,
        *,
        instructions: str,
        payload: dict[str, Any],
        response_contract: dict[str, Any],
    ) -> dict[str, Any]:
        prompt = (
            "Return one JSON object only. Do not use Markdown fences.\n\n"
            "Required JSON contract:\n"
            f"{json.dumps(response_contract, indent=2, ensure_ascii=False)}\n\n"
            "Input data:\n"
            f"{json.dumps(payload, indent=2, ensure_ascii=False)}"
        )
        request_options: dict[str, Any] = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": instructions},
                {"role": "user", "content": prompt},
            ],
            "temperature": 0.2,
            "top_p": 0.9,
            "max_tokens": 16384,
        }
        if self.local:
            request_options["response_format"] = {"type": "json_object"}
        response = self.client.chat.completions.create(
            **request_options,
        )
        if not response.choices:
            raise AIResponseError("The AI response did not contain a choice.")
        text = response.choices[0].message.content or ""
        if not isinstance(text, str):
            raise AIResponseError("The AI response content was not text.")
        return self._parse_object(text)

    @staticmethod
    def _parse_object(text: str) -> dict[str, Any]:
        candidate = text.strip()
        if candidate.startswith("```"):
            first_break = candidate.find("\n")
            last_fence = candidate.rfind("```")
            if first_break != -1 and last_fence > first_break:
                candidate = candidate[first_break + 1:last_fence].strip()

        try:
            value = json.loads(candidate)
        except json.JSONDecodeError:
            start = candidate.find("{")
            end = candidate.rfind("}")
            if start == -1 or end <= start:
                raise AIResponseError("The AI response did not contain a JSON object.")
            try:
                value = json.loads(candidate[start:end + 1])
            except json.JSONDecodeError as error:
                raise AIResponseError(
                    f"The AI returned invalid JSON: {error.msg}."
                ) from error

        if not isinstance(value, dict):
            raise AIResponseError("The AI response must be one JSON object.")
        return value
