from __future__ import annotations

import unittest

from tool_agent.jobs import JobStore


class JobStoreTests(unittest.TestCase):
    def test_publishes_idea_before_job_completion(self) -> None:
        jobs = JobStore()
        job_id = jobs.create("writers")

        jobs.publish_idea(
            job_id,
            {"name": "Pitch Timer", "slug": "pitch-timer", "purpose": "Plan pitches."},
        )

        public = jobs.public(job_id)
        self.assertIsNotNone(public)
        assert public is not None
        self.assertEqual(public["status"], "queued")
        self.assertEqual(public["preview"]["slug"], "pitch-timer")

    def test_appends_validated_alternative_to_primary_result(self) -> None:
        jobs = JobStore()
        job_id = jobs.create("writers")
        jobs.complete(job_id, {"alternatives": []})

        jobs.append_alternative(
            job_id,
            {"idea": {"name": "Outline Check", "slug": "outline-check"}},
        )

        public = jobs.public(job_id)
        self.assertIsNotNone(public)
        assert public is not None
        self.assertEqual(
            public["result"]["alternatives"][0]["idea"]["slug"],
            "outline-check",
        )

    def test_public_job_hides_private_download_paths(self) -> None:
        jobs = JobStore()
        job_id = jobs.create("writers")
        jobs.complete(
            job_id,
            {
                "output": {
                    "archive_path": "C:/private/run/tool.zip",
                    "report_path": "C:/private/run/report.md",
                    "download_url": f"/api/jobs/{job_id}/download",
                }
            },
        )
        public = jobs.public(job_id)
        self.assertIsNotNone(public)
        assert public is not None
        self.assertNotIn("archive_path", public["result"]["output"])
        self.assertNotIn("report_path", public["result"]["output"])


if __name__ == "__main__":
    unittest.main()
