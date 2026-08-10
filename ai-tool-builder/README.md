# Offline AI Tool Builder

A local-first Flask studio that turns one product idea into a validated, previewable,
GitHub-ready static web app using Gemma through Ollama.

The user enters only an idea. The app then:

1. Converts the idea into a focused browser-app build brief.
2. Generates accessible HTML and dependency-free JavaScript with a local model.
3. Adds self-contained styles, documentation, license, and GitHub Pages automation.
4. Rejects unsafe or structurally invalid output and retries generation once.
5. Shows progress logs, a live app preview, and a read-only source-code browser.
6. Saves a build report and downloadable project ZIP.

Additional ideas are generated and demand-validated only when requested from the
completed result screen; they do not delay the first tool build.

Generated tools are staged under `runs/<run-id>/tools/<slug>/` by default. The existing NikTool repository is not changed unless `NIKTOOL_OUTPUT_ROOT` is explicitly configured.

## Setup

Python 3.11 or newer is recommended.

```powershell
cd ai-tool-builder
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

Install Ollama (Windows):

```powershell
winget install Ollama.Ollama
```

The default local setup needs no API key:

```text
AI_PROVIDER=ollama
OLLAMA_MODEL=gemma3:4b
OLLAMA_BASE_URL=http://127.0.0.1:11434/v1
OLLAMA_WEB_RESEARCH_ENABLED=false
NIKTOOL_SITE_ROOT=..
```

Start the app:

```powershell
python app.py
```

Open `http://127.0.0.1:5000`. The Local AI Setup card can start Ollama and
download `gemma3:4b`. This is Gemma 3's 4-billion-parameter model, often shortened
informally to “Gemma 4B.” After the one-time download, model generation works
offline. You can enter another current or future Ollama model tag in the same field.

The model requires several gigabytes of disk space. Generation speed depends on
available RAM, CPU, and GPU acceleration. Keep the app bound to localhost.

Cloud NVIDIA and Gemini variables remain available in `.env.example` for legacy
API use, but the browser builder intentionally submits jobs to the local runtime.

The development server binds to localhost and has no user authentication or rate
limiting. Do not expose it directly to the public internet; add production auth,
rate limits, HTTPS, and a real job queue before any shared deployment.

## Output modes

Safe staging is the default:

```text
ai-tool-builder/runs/<run-id>/
|-- report.md
|-- research.json
|-- <slug>.zip
`-- tools/<slug>/
    |-- .github/workflows/pages.yml
    |-- .gitignore
    |-- .nojekyll
    |-- index.html
    |-- styles.css
    |-- shared.js
    |-- tool.js
    |-- README.md
    |-- LICENSE
    |-- catalog.json
    `-- sitemap.xml
```

To also copy validated folders directly into this website, set:

```text
NIKTOOL_OUTPUT_ROOT=../tools
```

Direct output refuses to overwrite an existing slug. It does not update the generated root `catalog.json` or `sitemap.xml`. After reviewing the folder, run the website's normal metadata check from the repository root:

```powershell
node scripts/sync-tool-metadata.cjs
```

## Offline behavior

Ollama model files and inference stay on the computer. Local builds force web
research off, and generated tools are validated to reject runtime network calls.
Generated artifacts, reports, and ZIP files are saved under `runs/`.

## Generation guardrails

The agent only proposes static, deterministic tools that can run with native browser APIs. The validator rejects generated artifacts that include:

- Unexpected files or path/slug changes
- External scripts, dependencies, or runtime network calls
- `innerHTML`, `outerHTML`, `eval`, `new Function`, or dynamic imports
- Browser storage, cookies, WebSockets, or event streams
- Unlabelled controls, unsafe workspace tags/attributes, or submit buttons
- Missing NikTool metadata, inconsistent canonical/catalog/sitemap URLs, or multiple H1s
- Unfinished placeholders or JavaScript syntax errors when Node.js is available

The generated page is assembled from a deterministic NikTool shell. Model-generated HTML is limited to the interactive workspace fragment; metadata, JSON-LD, navigation, SEO sections, catalog data, and sitemap structure are rendered by the server.

AI-generated code still needs human review and browser testing before publication.
The project includes a GitHub Pages workflow and copyable setup commands, but it
does not collect GitHub tokens or push on the user's behalf.

## API routes

- `GET /` - one-field builder interface
- `GET /api/health` - configuration status (never returns secrets)
- `GET /api/local-model?model=gemma3:4b` - inspect Ollama/model readiness
- `POST /api/local-model/start` - start an installed Ollama server
- `POST /api/local-model/pulls` - download a model with progress polling
- `POST /api/jobs` - start a job with `{"idea": "...", "model": "gemma3:4b"}`
- `GET /api/jobs/<id>` - poll progress and fetch public results
- `POST /api/jobs/<id>/alternatives` - generate and demand-check one more idea
- `GET /api/jobs/<id>/download` - download the generated ZIP
- `GET /api/jobs/<id>/report` - download the Markdown research report
- `GET /api/jobs/<id>/files` - list generated source files
- `GET /api/jobs/<id>/files/<path>` - securely read one generated text file

Jobs are held in memory, while artifacts are stored on disk. Restarting Flask clears job URLs but does not remove completed run folders.

## Tests

```powershell
python -m unittest discover -s tests -v
```

The tests cover valid rendering, URL parity, unsafe JavaScript rejection, slug integrity, accessibility checks, and private server-path redaction.
