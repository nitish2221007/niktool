from __future__ import annotations

import copy
import json
import unittest
from xml.etree import ElementTree

from tool_agent.generator import ArtifactGenerator, ArtifactValidationError


def valid_artifact() -> dict:
    return {
        "tool": {
            "name": "Brief Length Estimator",
            "slug": "brief-length-estimator",
            "purpose": "Estimate a practical content brief length from scope and depth.",
            "category": "Text",
            "icon": "text",
            "schema_category": "UtilitiesApplication",
            "keywords": [
                "brief length estimator",
                "content brief length",
                "writing scope calculator",
            ],
        },
        "page": {
            "title": "Free Brief Length Estimator | NikTool",
            "meta_description": (
                "Estimate a practical content brief length from topic count and "
                "research depth directly in your browser with no uploads."
            ),
            "og_title": "Brief Length Estimator | NikTool",
            "og_description": "Plan a useful content brief length in seconds.",
            "hero_text": "Estimate a useful brief length before you start writing.",
            "workspace_heading": "Plan your brief",
            "initial_instruction": "Enter a topic count and depth to begin.",
            "workspace_html": """
      <div class="control-grid">
        <div class="control-group">
          <label class="control-label" for="topic-count">Topic count</label>
          <input id="topic-count" type="number" min="1" max="50" value="5">
        </div>
        <div class="control-group">
          <label class="control-label" for="depth">Research depth</label>
          <select id="depth"><option value="1">Basic</option><option value="2">Detailed</option></select>
        </div>
      </div>
      <output id="result-output" aria-live="polite"></output>
      <div class="toolbar">
        <button class="button" id="primary-action" type="button">Estimate length</button>
        <button class="button secondary" id="clear-action" type="button">Clear</button>
      </div>
            """,
            "how_to_steps": [
                "Enter how many topics the brief must cover.",
                "Choose the amount of research detail required.",
                "Select Estimate length and review the suggested range.",
            ],
            "result_heading": "A planning estimate, not a fixed rule",
            "result_description": (
                "The estimate combines topic count and depth into a practical range. "
                "Adjust it when a subject needs unusual evidence or examples."
            ),
            "privacy_description": (
                "The calculation runs locally in your browser. Values are not uploaded "
                "or stored by this tool."
            ),
            "limitations": [
                "The estimate cannot measure the complexity of an individual topic."
            ],
            "faqs": [
                {
                    "question": "Is the estimate a required word count?",
                    "answer": "No. It is a planning range that you can adjust.",
                },
                {
                    "question": "Are my planning values uploaded?",
                    "answer": "No. The calculation happens in your browser.",
                },
            ],
        },
        "javascript": """(() => {
  'use strict';
  const count = document.querySelector('#topic-count');
  const depth = document.querySelector('#depth');
  const output = document.querySelector('#result-output');
  const primary = document.querySelector('#primary-action');
  const clear = document.querySelector('#clear-action');
  const message = document.querySelector('#tool-message');
  if (!count || !depth || !output || !primary || !clear || !message) {
    console.error('Tool initialization failed.');
    return;
  }
  const update = () => {
    const ready = Number(count.value) > 0;
    primary.disabled = !ready;
    clear.disabled = !ready;
    message.textContent = ready ? 'Ready to estimate.' : 'Enter a topic count.';
  };
  primary.addEventListener('click', () => {
    const estimate = Number(count.value) * Number(depth.value) * 80;
    output.textContent = `${estimate} to ${estimate + 120} words`;
    message.textContent = 'Estimate ready.';
  });
  clear.addEventListener('click', () => {
    count.value = '';
    output.textContent = '';
    update();
    count.focus();
  });
  count.addEventListener('input', update);
  update();
})();""",
    }


class ArtifactGeneratorTests(unittest.TestCase):
    def setUp(self) -> None:
        self.generator = ArtifactGenerator()

    def test_valid_artifact_renders_required_files(self) -> None:
        artifact = valid_artifact()
        warnings = self.generator.validate(artifact, "brief-length-estimator")
        self.assertIsInstance(warnings, list)
        files = self.generator.render_files(artifact)
        self.assertEqual(
            set(files),
            {
                "index.html",
                "tool.js",
                "styles.css",
                "shared.js",
                "catalog.json",
                "sitemap.xml",
                "README.md",
                "LICENSE",
                ".gitignore",
                ".nojekyll",
                ".github/workflows/pages.yml",
            },
        )
        self.assertIn("actions/deploy-pages@v4", files[".github/workflows/pages.yml"])
        self.assertIn('src="./tool.js"', files["index.html"])
        self.assertEqual(
            json.loads(files["catalog.json"])["path"],
            "/tools/brief-length-estimator/",
        )
        ElementTree.fromstring(files["sitemap.xml"])

    def test_rejects_slug_change(self) -> None:
        artifact = valid_artifact()
        artifact["tool"]["slug"] = "different-slug"
        with self.assertRaisesRegex(ArtifactValidationError, "does not match"):
            self.generator.validate(artifact, "brief-length-estimator")

    def test_rejects_networking_javascript(self) -> None:
        artifact = valid_artifact()
        artifact["javascript"] = artifact["javascript"].replace(
            "const count", "fetch('/private');\n  const count"
        )
        with self.assertRaisesRegex(ArtifactValidationError, "network"):
            self.generator.validate(artifact, "brief-length-estimator")

    def test_rejects_unsafe_dom_insertion(self) -> None:
        artifact = valid_artifact()
        artifact["javascript"] = artifact["javascript"].replace(
            "output.textContent", "output.innerHTML"
        )
        with self.assertRaisesRegex(ArtifactValidationError, "innerHTML"):
            self.generator.validate(artifact, "brief-length-estimator")

    def test_rejects_unlabelled_input(self) -> None:
        artifact = copy.deepcopy(valid_artifact())
        artifact["page"]["workspace_html"] = artifact["page"][
            "workspace_html"
        ].replace('for="topic-count"', 'for="wrong-id"')
        with self.assertRaisesRegex(ArtifactValidationError, "visible label"):
            self.generator.validate(artifact, "brief-length-estimator")


if __name__ == "__main__":
    unittest.main()
