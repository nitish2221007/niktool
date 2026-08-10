from __future__ import annotations

import unittest
from unittest.mock import patch

from app import create_app


class AlternativeRouteTests(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app({"TESTING": True})
        self.client = self.app.test_client()
        self.jobs = self.app.extensions["job_store"]
        self.executor = self.app.extensions["job_executor"]

    def tearDown(self) -> None:
        self.executor.shutdown(wait=False, cancel_futures=True)

    def test_requires_completed_primary_job(self) -> None:
        job_id = self.jobs.create("writers")

        response = self.client.post(f"/api/jobs/{job_id}/alternatives")

        self.assertEqual(response.status_code, 409)

    def test_index_contains_incremental_idea_controls(self) -> None:
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertIn(b'id="idea-preview"', response.data)
        self.assertIn(b'id="alternative-button"', response.data)
        self.assertIn(b'id="model-input"', response.data)
        self.assertIn(b'id="code-file-tabs"', response.data)
        self.assertIn(b'id="github-commands"', response.data)

    def test_starts_alternative_job_with_existing_slugs_excluded(self) -> None:
        job_id = self.jobs.create("writers")
        self.jobs.complete(
            job_id,
            {
                "selected_idea": {"slug": "pitch-timer"},
                "alternatives": [
                    {"idea": {"slug": "outline-check"}},
                ],
            },
        )

        with patch.object(self.executor, "submit") as submit:
            response = self.client.post(f"/api/jobs/{job_id}/alternatives")

        self.assertEqual(response.status_code, 202)
        payload = response.get_json()
        self.assertRegex(payload["status_url"], r"^/api/jobs/[a-f0-9]+$")
        excluded_slugs = submit.call_args.args[-1]
        self.assertEqual(excluded_slugs, {"pitch-timer", "outline-check"})


if __name__ == "__main__":
    unittest.main()
