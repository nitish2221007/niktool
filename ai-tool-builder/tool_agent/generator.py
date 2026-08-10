from __future__ import annotations

import html
import json
import os
import re
import shutil
import subprocess
import tempfile
import zipfile
from pathlib import Path
from typing import Any
from xml.etree import ElementTree

from bs4 import BeautifulSoup
from bs4.element import Tag


SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
PLAIN_RE = re.compile(r"[<>]")
PLACEHOLDER_RE = re.compile(
    r"(?<!\$)\{\{[^}]+\}\}|TODO|REPLACE_ME|example-tool|example\.com",
    re.IGNORECASE,
)

ICON_SVGS = {
    "text": (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        'stroke-width="1.8" stroke-linecap="round"><path d="M4 6h16M4 '
        '10h10M4 14h16M4 18h8"/></svg>'
    ),
    "code": (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'
        '<path d="m8 9-3 3 3 3m8-6 3 3-3 3m-2-9-4 12"/></svg>'
    ),
    "shield": (
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" '
        'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'
        '<path d="M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 '
        '7-10V6l-7-3Z"/><path d="m9.5 12 1.6 1.6 3.6-3.8"/></svg>'
    ),
}

ALLOWED_WORKSPACE_TAGS = {
    "button",
    "div",
    "fieldset",
    "legend",
    "label",
    "input",
    "li",
    "option",
    "output",
    "p",
    "select",
    "span",
    "strong",
    "textarea",
    "ul",
}
ALLOWED_WORKSPACE_ATTRS = {
    "accept",
    "aria-describedby",
    "aria-hidden",
    "aria-label",
    "aria-live",
    "aria-pressed",
    "autocomplete",
    "autofocus",
    "checked",
    "class",
    "cols",
    "disabled",
    "for",
    "hidden",
    "id",
    "inputmode",
    "max",
    "maxlength",
    "min",
    "minlength",
    "multiple",
    "name",
    "pattern",
    "placeholder",
    "readonly",
    "required",
    "role",
    "rows",
    "size",
    "spellcheck",
    "step",
    "tabindex",
    "title",
    "type",
    "value",
    "wrap",
}
ALLOWED_INPUT_TYPES = {
    "button",
    "checkbox",
    "color",
    "date",
    "datetime-local",
    "number",
    "radio",
    "range",
    "text",
    "time",
    "url",
}

FORBIDDEN_JAVASCRIPT = {
    r"\binnerHTML\b": "innerHTML is forbidden",
    r"\bouterHTML\b": "outerHTML is forbidden",
    r"\binsertAdjacentHTML\b": "HTML string insertion is forbidden",
    r"\bdocument\.write\b": "document.write is forbidden",
    r"\beval\s*\(": "eval is forbidden",
    r"\bnew\s+Function\b": "dynamic functions are forbidden",
    r"\bfetch\s*\(": "generated tools must not make network requests",
    r"\bXMLHttpRequest\b": "generated tools must not make network requests",
    r"\bWebSocket\b": "generated tools must not open network connections",
    r"\bEventSource\b": "generated tools must not open network connections",
    r"\b(?:localStorage|sessionStorage)\b": "browser storage is forbidden",
    r"\bdocument\.cookie\b": "cookies are forbidden",
    r"\bimport\s*\(": "dynamic imports are forbidden",
    r"\brequire\s*\(": "module loading is forbidden",
}

FALLBACK_STYLES = """\
:root { color-scheme: light; font-family: Inter, system-ui, sans-serif; color: #15251f; background: #f7f5ef; }
* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; background: linear-gradient(145deg, #fbfaf6, #edf5ef); }
a { color: inherit; }
.skip-link { position: fixed; left: 1rem; top: -5rem; padding: .7rem 1rem; background: #0e5139; color: white; z-index: 10; }
.skip-link:focus { top: 1rem; }
.container { width: min(960px, calc(100% - 2rem)); margin-inline: auto; }
.site-header, .site-footer { border-bottom: 1px solid #dce3de; background: rgba(255,255,255,.82); }
.site-footer { margin-top: 4rem; border-top: 1px solid #dce3de; border-bottom: 0; }
.nav, .footer-inner { min-height: 68px; display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.brand { display: flex; align-items: center; gap: .65rem; text-decoration: none; font-weight: 850; }
.brand-mark, .tool-icon { display: grid; place-items: center; color: white; background: #176b4d; border-radius: .8rem; }
.brand-mark { width: 38px; height: 38px; }
.brand-mark svg, .tool-icon svg { width: 22px; }
.nav-links, .footer-links, .toolbar { display: flex; flex-wrap: wrap; gap: .75rem; }
.breadcrumbs { padding-top: 2rem; color: #64746d; font-size: .82rem; }
.breadcrumbs svg { width: 14px; vertical-align: middle; margin: 0 .4rem; }
.tool-hero { padding: 4rem 0 2rem; text-align: center; }
.tool-icon { width: 58px; height: 58px; margin: 0 auto 1rem; }
.tool-hero h1 { margin: 0; font: 500 clamp(2.5rem, 8vw, 5rem)/1 Georgia, serif; letter-spacing: -.05em; }
.tool-hero p { max-width: 680px; margin: 1rem auto 0; color: #64746d; line-height: 1.65; }
.tool-workspace, .seo-content { margin-top: 1.5rem; padding: clamp(1.2rem, 4vw, 2.25rem); border: 1px solid #dce3de; border-radius: 1.25rem; background: white; box-shadow: 0 22px 60px rgba(25,58,45,.09); }
.workspace-header { display: flex; justify-content: space-between; align-items: center; gap: 1rem; margin-bottom: 1.5rem; }
.workspace-header h2 { margin: 0; }
.workspace-status { color: #176b4d; font-size: .78rem; font-weight: 750; }
.status-dot { display: inline-block; width: 8px; height: 8px; margin-right: .35rem; background: #28a06b; border-radius: 50%; }
.control-grid, .json-layout, .stats-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.control-group, .editor-panel { display: grid; gap: .45rem; }
.control-label, .editor-label { font-size: .8rem; font-weight: 780; }
input, select, textarea { width: 100%; min-height: 46px; padding: .75rem; border: 1px solid #cbd7cf; border-radius: .65rem; background: #fbfcfa; font: inherit; }
textarea, .tool-textarea { min-height: 150px; resize: vertical; }
button, .button { min-height: 44px; padding: .7rem 1rem; border: 0; border-radius: .65rem; color: white; background: #176b4d; cursor: pointer; font: inherit; font-weight: 800; }
button.secondary, .button.secondary { color: #0e5139; border: 1px solid #b7d5c3; background: #e3f1e9; }
button:disabled { cursor: not-allowed; opacity: .55; }
.toolbar { margin-top: 1rem; }
.message, output { display: block; margin-top: 1rem; padding: .85rem; color: #0e5139; background: #eaf5ee; border-radius: .65rem; white-space: pre-wrap; }
.stat { padding: 1rem; background: #f7f5ef; border-radius: .8rem; }
.stat-value, .stat-label { display: block; }
.stat-value { font-size: 1.35rem; font-weight: 850; }
.stat-label { color: #64746d; font-size: .75rem; }
.seo-content { color: #44564e; line-height: 1.75; }
.seo-content h2 { margin-top: 2rem; color: #15251f; }
.seo-content h2:first-child { margin-top: 0; }
details { padding: 1rem 0; border-top: 1px solid #dce3de; }
summary { color: #15251f; cursor: pointer; font-weight: 750; }
.noscript { padding: 1rem; color: #a33b34; text-align: center; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }
@media (max-width: 640px) { .control-grid, .json-layout, .stats-grid { grid-template-columns: 1fr; } .nav-links { display: none; } .workspace-header { align-items: flex-start; flex-direction: column; } }
"""

FALLBACK_SHARED_JAVASCRIPT = """\
(() => {
  'use strict';
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
"""

GITHUB_PAGES_WORKFLOW = """\
name: Deploy static site to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Configure Pages
        uses: actions/configure-pages@v5
      - name: Upload site
        uses: actions/upload-pages-artifact@v3
        with:
          path: .
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
"""

MIT_LICENSE = """\
MIT License

Copyright (c) 2026 AI Tool Builder project author

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""


class ArtifactValidationError(RuntimeError):
    """Raised when generated content does not satisfy the NikTool contract."""


class ArtifactGenerator:
    def __init__(
        self, output_root: Path | None = None, site_root: Path | None = None
    ) -> None:
        self.output_root = output_root
        self.site_root = site_root

    def validate(self, artifact: dict[str, Any], expected_slug: str) -> list[str]:
        tool = self._object(artifact, "tool")
        page = self._object(artifact, "page")
        javascript = artifact.get("javascript")
        if not isinstance(javascript, str) or not javascript.strip():
            raise ArtifactValidationError("Generated JavaScript is missing.")

        slug = self._plain(tool, "slug", 64)
        if slug != expected_slug or not SLUG_RE.fullmatch(slug):
            raise ArtifactValidationError(
                f"Generated slug {slug!r} does not match selected slug {expected_slug!r}."
            )

        self._plain(tool, "name", 80)
        self._plain(tool, "purpose", 220)
        self._plain(tool, "category", 40)
        icon = self._plain(tool, "icon", 20)
        if icon not in ICON_SVGS:
            raise ArtifactValidationError("Icon must be text, code, or shield.")
        schema_category = self._plain(tool, "schema_category", 50)
        if schema_category not in {
            "UtilitiesApplication",
            "DeveloperApplication",
            "SecurityApplication",
            "DesignApplication",
        }:
            raise ArtifactValidationError("Unsupported schema application category.")

        keywords = tool.get("keywords")
        if not isinstance(keywords, list) or not 3 <= len(keywords) <= 10:
            raise ArtifactValidationError("Tool keywords must contain 3 to 10 phrases.")
        normalized_keywords: list[str] = []
        for keyword in keywords:
            if not isinstance(keyword, str):
                raise ArtifactValidationError("Every keyword must be text.")
            value = keyword.strip().lower()
            self._validate_plain(value, "keyword", 80)
            if value and value not in normalized_keywords:
                normalized_keywords.append(value)
        if len(normalized_keywords) < 3:
            raise ArtifactValidationError("Tool keywords must be unique.")
        tool["keywords"] = normalized_keywords

        for key, limit in {
            "title": 90,
            "meta_description": 180,
            "og_title": 90,
            "og_description": 180,
            "hero_text": 240,
            "workspace_heading": 100,
            "initial_instruction": 220,
            "result_heading": 120,
            "result_description": 900,
            "privacy_description": 700,
        }.items():
            self._plain(page, key, limit)

        steps = page.get("how_to_steps")
        if not isinstance(steps, list) or len(steps) != 3:
            raise ArtifactValidationError("The page must contain exactly three usage steps.")
        for step in steps:
            if not isinstance(step, str):
                raise ArtifactValidationError("Usage steps must be text.")
            self._validate_plain(step.strip(), "usage step", 260)

        limitations = page.get("limitations")
        if not isinstance(limitations, list) or not 1 <= len(limitations) <= 5:
            raise ArtifactValidationError("The page must state 1 to 5 limitations.")
        for limitation in limitations:
            if not isinstance(limitation, str):
                raise ArtifactValidationError("Limitations must be text.")
            self._validate_plain(limitation.strip(), "limitation", 280)

        faqs = page.get("faqs")
        if not isinstance(faqs, list) or not 2 <= len(faqs) <= 5:
            raise ArtifactValidationError("The page must include 2 to 5 FAQs.")
        for faq in faqs:
            if not isinstance(faq, dict):
                raise ArtifactValidationError("Every FAQ must be an object.")
            self._plain(faq, "question", 180)
            self._plain(faq, "answer", 500)

        workspace_html = page.get("workspace_html")
        if not isinstance(workspace_html, str) or not workspace_html.strip():
            raise ArtifactValidationError("Workspace HTML is missing.")
        workspace_ids = self._validate_workspace(workspace_html)
        self._validate_javascript(javascript, workspace_ids | {"tool-message"})

        warnings = self._check_javascript_syntax(javascript)
        rendered = self.render_files(artifact)
        self._validate_rendered(rendered, slug)
        return warnings

    def render_files(self, artifact: dict[str, Any]) -> dict[str, str]:
        tool = artifact["tool"]
        page = artifact["page"]
        slug = tool["slug"]
        public_path = f"/tools/{slug}/"
        public_url = f"https://niktool.in{public_path}"

        catalog = {
            "name": tool["name"].strip(),
            "description": tool["purpose"].strip(),
            "path": public_path,
            "category": tool["category"].strip(),
            "icon": tool["icon"].strip(),
            "keywords": tool["keywords"],
        }
        sitemap = (
            '<?xml version="1.0" encoding="UTF-8"?>\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            "  <url>\n"
            f"    <loc>{public_url}</loc>\n"
            "    <changefreq>monthly</changefreq>\n"
            "    <priority>0.8</priority>\n"
            "  </url>\n"
            "</urlset>\n"
        )
        return {
            "index.html": self._render_html(tool, page),
            "tool.js": artifact["javascript"].strip() + "\n",
            "styles.css": self._asset("styles.css", FALLBACK_STYLES),
            "shared.js": self._asset(
                "shared.js", FALLBACK_SHARED_JAVASCRIPT
            ),
            "catalog.json": json.dumps(catalog, indent=2, ensure_ascii=False) + "\n",
            "sitemap.xml": sitemap,
            "README.md": self._render_readme(tool),
            "LICENSE": MIT_LICENSE,
            ".gitignore": ".DS_Store\nThumbs.db\n.vscode/\n.idea/\n",
            ".nojekyll": "",
            ".github/workflows/pages.yml": GITHUB_PAGES_WORKFLOW,
        }

    def write(
        self,
        *,
        run_dir: Path,
        artifact: dict[str, Any],
    ) -> dict[str, Any]:
        slug = artifact["tool"]["slug"]
        files = self.render_files(artifact)
        tools_dir = run_dir / "tools"
        tools_dir.mkdir(parents=True, exist_ok=True)
        target = tools_dir / slug
        if target.exists():
            raise ArtifactValidationError(f"Run artifact already exists: {target}")

        staging = Path(tempfile.mkdtemp(prefix=f".{slug}-", dir=tools_dir))
        try:
            for filename, content in files.items():
                destination = staging / filename
                destination.parent.mkdir(parents=True, exist_ok=True)
                destination.write_text(content, encoding="utf-8", newline="\n")
            os.replace(staging, target)
        except Exception:
            shutil.rmtree(staging, ignore_errors=True)
            raise

        published_path: str | None = None
        if self.output_root is not None:
            self.output_root.mkdir(parents=True, exist_ok=True)
            publish_target = self.output_root / slug
            if publish_target.exists():
                raise ArtifactValidationError(
                    f"Refusing to overwrite existing tool folder: {publish_target}"
                )
            publish_staging = Path(
                tempfile.mkdtemp(prefix=f".{slug}-", dir=self.output_root)
            )
            shutil.rmtree(publish_staging)
            try:
                shutil.copytree(target, publish_staging)
                os.replace(publish_staging, publish_target)
                published_path = str(publish_target)
            except Exception:
                shutil.rmtree(publish_staging, ignore_errors=True)
                raise

        archive_path = run_dir / f"{slug}.zip"
        with zipfile.ZipFile(
            archive_path, "w", compression=zipfile.ZIP_DEFLATED
        ) as archive:
            for filename in sorted(files):
                archive.write(target / filename, f"{slug}/{filename}")

        return {
            "slug": slug,
            "tool_path": str(target),
            "published_path": published_path,
            "archive_path": str(archive_path),
            "files": sorted(files),
            "public_path": f"/tools/{slug}/",
        }

    def _asset(self, filename: str, fallback: str) -> str:
        if self.site_root is not None:
            path = self.site_root / "assets" / filename
            try:
                return path.read_text(encoding="utf-8")
            except OSError:
                pass
        return fallback

    @staticmethod
    def _render_readme(tool: dict[str, Any]) -> str:
        return (
            f"# {tool['name']}\n\n"
            f"{tool['purpose']}\n\n"
            "This is a dependency-free static web app generated locally by AI Tool "
            "Builder. User data stays in the browser.\n\n"
            "## Run locally\n\n"
            "Open `index.html` directly, or start a static server:\n\n"
            "```powershell\npython -m http.server 8080\n```\n\n"
            "Then open `http://127.0.0.1:8080`.\n\n"
            "## Publish with GitHub Pages\n\n"
            "1. Create an empty GitHub repository and push this folder to `main`.\n"
            "2. In repository Settings, open Pages.\n"
            "3. Set Source to **GitHub Actions**.\n"
            "4. The included workflow deploys the site after every push.\n\n"
            "## Files\n\n"
            "- `index.html` - accessible page and content\n"
            "- `styles.css` - self-contained visual styles\n"
            "- `tool.js` - generated browser logic\n"
            "- `.github/workflows/pages.yml` - GitHub Pages deployment\n\n"
            "Review and test AI-generated code before publishing.\n"
        )

    @staticmethod
    def _object(parent: dict[str, Any], key: str) -> dict[str, Any]:
        value = parent.get(key)
        if not isinstance(value, dict):
            raise ArtifactValidationError(f"Generated {key} object is missing.")
        return value

    def _plain(self, parent: dict[str, Any], key: str, limit: int) -> str:
        value = parent.get(key)
        if not isinstance(value, str):
            raise ArtifactValidationError(f"Generated field {key!r} must be text.")
        value = value.strip()
        self._validate_plain(value, key, limit)
        parent[key] = value
        return value

    @staticmethod
    def _validate_plain(value: str, label: str, limit: int) -> None:
        if not value:
            raise ArtifactValidationError(f"Generated {label} cannot be empty.")
        if len(value) > limit:
            raise ArtifactValidationError(
                f"Generated {label} exceeds the {limit}-character limit."
            )
        if PLAIN_RE.search(value) or "\x00" in value:
            raise ArtifactValidationError(f"Generated {label} must be plain text.")

    def _validate_workspace(self, source: str) -> set[str]:
        if len(source) > 18_000:
            raise ArtifactValidationError("Workspace HTML is too large.")
        soup = BeautifulSoup(source, "html.parser")
        ids: set[str] = set()
        label_targets: set[str] = set()

        for tag in soup.find_all(True):
            if tag.name not in ALLOWED_WORKSPACE_TAGS:
                raise ArtifactValidationError(
                    f"Workspace tag <{tag.name}> is not allowed."
                )
            for attribute in tag.attrs:
                if (
                    attribute not in ALLOWED_WORKSPACE_ATTRS
                    and not attribute.startswith("data-")
                    and not attribute.startswith("aria-")
                ):
                    raise ArtifactValidationError(
                        f"Workspace attribute {attribute!r} is not allowed."
                    )
            node_id = tag.get("id")
            if node_id:
                if not re.fullmatch(r"[A-Za-z][A-Za-z0-9_-]*", str(node_id)):
                    raise ArtifactValidationError(f"Invalid workspace id: {node_id!r}.")
                if node_id in ids:
                    raise ArtifactValidationError(f"Duplicate workspace id: {node_id!r}.")
                ids.add(str(node_id))
            if tag.name == "label" and tag.get("for"):
                label_targets.add(str(tag.get("for")))
            if tag.name == "button" and tag.get("type") != "button":
                raise ArtifactValidationError(
                    "Every generated button must use type=\"button\"."
                )
            if tag.name == "input":
                input_type = str(tag.get("type") or "text").lower()
                if input_type not in ALLOWED_INPUT_TYPES:
                    raise ArtifactValidationError(
                        f"Input type {input_type!r} is not allowed."
                    )

        for control in soup.find_all(["input", "textarea", "select"]):
            node_id = str(control.get("id") or "")
            if not node_id:
                raise ArtifactValidationError("Every generated input needs an id.")
            if node_id not in label_targets and not control.get("aria-label"):
                raise ArtifactValidationError(
                    f"Generated input #{node_id} needs a visible label."
                )

        for required_id in {"primary-action", "clear-action"}:
            if required_id not in ids:
                raise ArtifactValidationError(
                    f"Workspace must contain #{required_id}."
                )
        return ids

    @staticmethod
    def _validate_javascript(source: str, available_ids: set[str]) -> None:
        if len(source) > 45_000:
            raise ArtifactValidationError("Generated JavaScript is too large.")
        if "'use strict'" not in source and '"use strict"' not in source:
            raise ArtifactValidationError("Generated JavaScript must use strict mode.")
        if not re.search(r"\(\s*\(\s*\)\s*=>\s*\{", source):
            raise ArtifactValidationError(
                "Generated JavaScript must be isolated in an IIFE."
            )
        for pattern, message in FORBIDDEN_JAVASCRIPT.items():
            if re.search(pattern, source, re.IGNORECASE):
                raise ArtifactValidationError(message + ".")

        referenced_ids = set(
            re.findall(
                r"querySelector\(\s*['\"]#([A-Za-z][A-Za-z0-9_-]*)['\"]\s*\)",
                source,
            )
        )
        referenced_ids.update(
            re.findall(
                r"getElementById\(\s*['\"]([A-Za-z][A-Za-z0-9_-]*)['\"]\s*\)",
                source,
            )
        )
        missing = sorted(referenced_ids - available_ids)
        if missing:
            raise ArtifactValidationError(
                "JavaScript references missing elements: " + ", ".join(missing)
            )

    @staticmethod
    def _check_javascript_syntax(source: str) -> list[str]:
        node = shutil.which("node")
        if node is None:
            return ["Node.js was unavailable, so JavaScript syntax was not parsed."]
        temp_path: str | None = None
        try:
            with tempfile.NamedTemporaryFile(
                mode="w", suffix=".js", encoding="utf-8", delete=False
            ) as handle:
                handle.write(source)
                temp_path = handle.name
            result = subprocess.run(
                [node, "--check", temp_path],
                capture_output=True,
                text=True,
                timeout=10,
                check=False,
            )
            if result.returncode != 0:
                detail = (result.stderr or result.stdout).strip().splitlines()
                message = detail[-1] if detail else "unknown syntax error"
                raise ArtifactValidationError(
                    f"Generated JavaScript failed syntax validation: {message}"
                )
            return []
        finally:
            if temp_path:
                Path(temp_path).unlink(missing_ok=True)

    def _render_html(self, tool: dict[str, Any], page: dict[str, Any]) -> str:
        esc = lambda value: html.escape(str(value), quote=True)
        slug = tool["slug"]
        public_url = f"https://niktool.in/tools/{slug}/"
        title = page["title"]
        if "niktool" not in title.lower():
            title = f"{title} | NikTool"

        software_schema = {
            "@type": "SoftwareApplication",
            "name": tool["name"],
            "applicationCategory": tool["schema_category"],
            "operatingSystem": "Any",
            "url": public_url,
            "description": tool["purpose"],
            "offers": {"@type": "Offer", "price": "0", "priceCurrency": "USD"},
        }
        faq_schema = {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": faq["question"],
                    "acceptedAnswer": {"@type": "Answer", "text": faq["answer"]},
                }
                for faq in page["faqs"]
            ],
        }
        schema = json.dumps(
            {"@context": "https://schema.org", "@graph": [software_schema, faq_schema]},
            indent=2,
            ensure_ascii=False,
        ).replace("</", "<\\/")
        steps = "\n".join(f"        <li>{esc(step)}</li>" for step in page["how_to_steps"])
        limits = "\n".join(
            f"        <li>{esc(item)}</li>" for item in page["limitations"]
        )
        faqs = "\n".join(
            "      <details>\n"
            f"        <summary>{esc(faq['question'])}</summary>\n"
            f"        <p>{esc(faq['answer'])}</p>\n"
            "      </details>"
            for faq in page["faqs"]
        )

        return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <meta name="description" content="{esc(page['meta_description'])}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="{public_url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="{esc(page['og_title'])}">
  <meta property="og:description" content="{esc(page['og_description'])}">
  <meta property="og:url" content="{public_url}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#176b4d">
  <link rel="stylesheet" href="./styles.css">
  <script type="application/ld+json">
{schema}
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="./" aria-label="Generated tool home"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 7h14M8 12h8m-5 5h2"/></svg></span><span class="brand-text">{esc(tool['name'])}</span></a>
      <div class="nav-links"><a class="home-link" href="#main">Tool</a><a href="#about">About</a></div>
    </nav>
  </header>

  <main id="main" class="container">
    <div class="breadcrumbs"><a href="./">Home</a><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg><span>{esc(tool['name'])}</span></div>
    <section class="tool-hero">
      <span class="tool-icon" aria-hidden="true">{ICON_SVGS[tool['icon']]}</span>
      <h1>{esc(tool['name'])}</h1>
      <p>{esc(page['hero_text'])}</p>
    </section>

    <section class="tool-workspace" aria-labelledby="workspace-title">
      <div class="workspace-header"><h2 id="workspace-title">{esc(page['workspace_heading'])}</h2><span class="workspace-status"><span class="status-dot"></span>Processed locally</span></div>
{page['workspace_html'].strip()}
      <p class="message" id="tool-message" role="status" aria-live="polite">{esc(page['initial_instruction'])}</p>
    </section>

    <article class="seo-content" id="about">
      <h2>How to use {esc(tool['name'])}</h2>
      <ol>
{steps}
      </ol>
      <h2>{esc(page['result_heading'])}</h2>
      <p>{esc(page['result_description'])}</p>
      <h2>Private browser-based processing</h2>
      <p>{esc(page['privacy_description'])}</p>
      <h2>Important limitations</h2>
      <ul>
{limits}
      </ul>
      <h2>Frequently asked questions</h2>
{faqs}
    </article>
  </main>

  <footer class="site-footer"><div class="footer-inner container"><p>&copy; <span data-year></span> {esc(tool['name'])}.</p><div class="footer-links"><a href="#main">Tool</a><a href="#about">About</a></div></div></footer>
  <noscript><p class="noscript">This tool requires JavaScript to work.</p></noscript>
  <script src="./shared.js"></script>
  <script src="./tool.js"></script>
</body>
</html>
'''

    @staticmethod
    def _validate_rendered(files: dict[str, str], slug: str) -> None:
        required_files = {
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
        }
        if set(files) != required_files:
            raise ArtifactValidationError("Generated folder has unexpected files.")
        for filename, content in files.items():
            if PLACEHOLDER_RE.search(content):
                raise ArtifactValidationError(
                    f"Generated {filename} contains unfinished placeholder text."
                )

        page = BeautifulSoup(files["index.html"], "html.parser")
        if len(page.find_all("h1")) != 1:
            raise ArtifactValidationError("Generated page must contain exactly one H1.")
        canonical = page.find("link", rel="canonical")
        expected_url = f"https://niktool.in/tools/{slug}/"
        if not isinstance(canonical, Tag) or canonical.get("href") != expected_url:
            raise ArtifactValidationError("Generated canonical URL is inconsistent.")
        scripts: list[str] = []
        for element in page.find_all("script"):
            if not isinstance(element, Tag):
                continue
            source = element.attrs.get("src")
            if isinstance(source, str):
                scripts.append(source)
        if scripts != ["./shared.js", "./tool.js"]:
            raise ArtifactValidationError("Generated page has unexpected scripts.")

        catalog = json.loads(files["catalog.json"])
        if catalog.get("path") != f"/tools/{slug}/":
            raise ArtifactValidationError("Catalog path is inconsistent.")
        try:
            root = ElementTree.fromstring(files["sitemap.xml"])
        except ElementTree.ParseError as error:
            raise ArtifactValidationError("Generated sitemap XML is invalid.") from error
        namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
        locs = root.findall(f"{namespace}url/{namespace}loc")
        if len(locs) != 1 or locs[0].text != expected_url:
            raise ArtifactValidationError("Sitemap URL is inconsistent.")
