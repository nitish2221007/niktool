from __future__ import annotations

import logging
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Any

from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request, send_file

from tool_agent import BuilderConfig, ToolBuilderAgent
from tool_agent.jobs import JobStore
from tool_agent.local_models import (
    LocalModelError,
    LocalModelManager,
    validate_model_name,
)


APP_ROOT = Path(__file__).resolve().parent
load_dotenv(APP_ROOT / ".env", override=True)


def create_app(test_config: dict[str, Any] | None = None) -> Flask:
    app = Flask(__name__)
    app.config.from_mapping(
        MAX_CONTENT_LENGTH=16 * 1024,
        JSON_SORT_KEYS=False,
    )
    if test_config:
        app.config.update(test_config)

    builder_config = BuilderConfig.from_env(APP_ROOT)
    builder_config.runs_root.mkdir(parents=True, exist_ok=True)
    jobs = JobStore()
    executor = ThreadPoolExecutor(max_workers=3, thread_name_prefix="tool-builder")
    local_model = (
        builder_config.model if builder_config.provider == "ollama" else "gemma3:4b"
    )
    ollama_api_url = builder_config.for_local_model(local_model).base_url
    if ollama_api_url.endswith("/v1"):
        ollama_api_url = ollama_api_url[:-3]
    model_manager = LocalModelManager(ollama_api_url)
    app.extensions["builder_config"] = builder_config
    app.extensions["job_store"] = jobs
    app.extensions["job_executor"] = executor
    app.extensions["local_model_manager"] = model_manager

    @app.get("/")
    def index() -> str:
        return render_template(
            "index.html",
            provider=builder_config.provider,
            model=builder_config.model,
            research_enabled=builder_config.web_research_enabled,
            configured=bool(builder_config.api_key),
            local_model=local_model,
        )

    @app.get("/api/health")
    def health():
        return jsonify(
            {
                "ok": True,
                "api_key_configured": bool(builder_config.api_key),
                "provider": builder_config.provider,
                "model": builder_config.model,
                "web_research_enabled": builder_config.web_research_enabled,
                "site_root_valid": (builder_config.site_root / "README.md").is_file(),
                "local_model": model_manager.status(local_model),
            }
        )

    @app.get("/api/local-model")
    def local_model_status():
        try:
            model = validate_model_name(request.args.get("model", local_model))
        except ValueError as error:
            return jsonify({"error": str(error)}), 400
        return jsonify(model_manager.status(model))

    @app.post("/api/local-model/start")
    def start_local_model_server():
        try:
            return jsonify(model_manager.ensure_server())
        except LocalModelError as error:
            return jsonify({"error": str(error)}), 409

    @app.post("/api/local-model/pulls")
    def pull_local_model():
        payload = request.get_json(silent=True)
        if not isinstance(payload, dict):
            return jsonify({"error": "Send a JSON object containing model."}), 400
        try:
            model = validate_model_name(payload.get("model", local_model))
        except ValueError as error:
            return jsonify({"error": str(error)}), 400
        status = model_manager.status(model)
        if status["model_ready"]:
            return jsonify({**status, "already_ready": True})
        pull_id = model_manager.create_pull(model)
        executor.submit(model_manager.run_pull, pull_id)
        return jsonify(
            {
                "pull_id": pull_id,
                "status_url": f"/api/local-model/pulls/{pull_id}",
            }
        ), 202

    @app.get("/api/local-model/pulls/<pull_id>")
    def get_local_model_pull(pull_id: str):
        pull = model_manager.get_pull(pull_id)
        if pull is None:
            return jsonify({"error": "Model download not found."}), 404
        return jsonify(pull)

    @app.post("/api/jobs")
    def create_job():
        payload = request.get_json(silent=True)
        if not isinstance(payload, dict):
            return jsonify({"error": "Send a JSON object containing idea."}), 400
        try:
            idea = ToolBuilderAgent.validate_niche(
                payload.get("idea", payload.get("niche", ""))
            )
            model = validate_model_name(payload.get("model", local_model))
        except ValueError as error:
            return jsonify({"error": str(error)}), 400

        status = model_manager.status(model)
        if not status["model_ready"]:
            return jsonify(
                {
                    "error": (
                        f"{model} is not ready. Install/start Ollama and download the "
                        "model from Local AI Setup first."
                    ),
                    "local_model": status,
                }
            ), 409

        job_config = builder_config.for_local_model(model)
        job_id = jobs.create(idea)
        executor.submit(_run_job, app, jobs, job_config, job_id, idea)
        return jsonify({"job_id": job_id, "status_url": f"/api/jobs/{job_id}"}), 202

    @app.get("/api/jobs/<job_id>")
    def get_job(job_id: str):
        job = jobs.public(job_id)
        if job is None:
            return jsonify({"error": "Job not found."}), 404
        return jsonify(job)

    @app.post("/api/jobs/<job_id>/alternatives")
    def create_alternative(job_id: str):
        parent = jobs.get(job_id)
        if parent is None:
            return jsonify({"error": "Job not found."}), 404
        if parent["status"] != "complete" or not isinstance(
            parent.get("result"), dict
        ):
            return jsonify({"error": "Wait for the primary idea to finish."}), 409

        result = parent["result"]
        selected = result.get("selected_idea")
        if not isinstance(selected, dict) or not isinstance(
            selected.get("slug"), str
        ):
            return jsonify({"error": "The primary idea is unavailable."}), 409
        excluded_slugs = {selected["slug"]}
        alternatives = result.get("alternatives", [])
        if isinstance(alternatives, list):
            for alternative in alternatives:
                if not isinstance(alternative, dict):
                    continue
                idea = alternative.get("idea")
                if isinstance(idea, dict) and isinstance(idea.get("slug"), str):
                    excluded_slugs.add(idea["slug"])

        alternative_job_id = jobs.create(parent["niche"])
        alternative_config = builder_config
        if result.get("provider") == "ollama" and isinstance(result.get("model"), str):
            alternative_config = builder_config.for_local_model(result["model"])
        executor.submit(
            _run_alternative_job,
            app,
            jobs,
            alternative_config,
            job_id,
            alternative_job_id,
            parent["niche"],
            excluded_slugs,
        )
        return jsonify(
            {
                "job_id": alternative_job_id,
                "status_url": f"/api/jobs/{alternative_job_id}",
            }
        ), 202

    @app.get("/assets/<path:filename>")
    def serve_site_assets(filename: str):
        assets_dir = (builder_config.site_root / "assets").resolve()
        file_path = (assets_dir / filename).resolve()
        if file_path.is_file() and str(file_path).startswith(str(assets_dir)):
            return send_file(file_path)
        return jsonify({"error": "Asset not found."}), 404

    @app.get("/tools/<slug>/<path:filename>")
    def serve_tool_file(slug: str, filename: str):
        if builder_config.output_root:
            published = (builder_config.output_root / slug / filename).resolve()
            if published.is_file():
                return send_file(published)
        for run_dir in builder_config.runs_root.glob("*"):
            tool_file = (run_dir / "tools" / slug / filename).resolve()
            if tool_file.is_file():
                return send_file(tool_file)
        return jsonify({"error": "Tool file not found."}), 404

    @app.get("/preview/<job_id>/")
    @app.get("/preview/<job_id>/<path:filename>")
    def preview_job(job_id: str, filename: str = "index.html"):
        job = jobs.get(job_id)
        if job is None:
            return jsonify({"error": "Job not found."}), 404
        if job["status"] != "complete" or not job.get("result"):
            return jsonify({"error": "The tool is not ready yet."}), 409

        tool_dir = _job_tool_dir(job, builder_config)
        if tool_dir is None:
            return jsonify({"error": "The generated folder is unavailable."}), 410
        file_path = (tool_dir / filename).resolve()
        if file_path.is_file() and file_path.is_relative_to(tool_dir):
            return send_file(file_path)
        return jsonify({"error": "File not found."}), 404

    @app.get("/api/jobs/<job_id>/files")
    def list_job_files(job_id: str):
        job = jobs.get(job_id)
        if job is None:
            return jsonify({"error": "Job not found."}), 404
        if job["status"] != "complete" or not job.get("result"):
            return jsonify({"error": "The generated files are not ready yet."}), 409
        output = job["result"].get("output", {})
        files = output.get("files", []) if isinstance(output, dict) else []
        return jsonify(
            {
                "files": files,
                "content_base_url": f"/api/jobs/{job_id}/files/",
            }
        )

    @app.get("/api/jobs/<job_id>/files/<path:filename>")
    def read_job_file(job_id: str, filename: str):
        job = jobs.get(job_id)
        if job is None:
            return jsonify({"error": "Job not found."}), 404
        if job["status"] != "complete" or not job.get("result"):
            return jsonify({"error": "The generated files are not ready yet."}), 409
        tool_dir = _job_tool_dir(job, builder_config)
        if tool_dir is None:
            return jsonify({"error": "The generated folder is unavailable."}), 410
        output = job["result"].get("output", {})
        allowed = set(output.get("files", [])) if isinstance(output, dict) else set()
        if filename not in allowed:
            return jsonify({"error": "File not found."}), 404
        file_path = (tool_dir / filename).resolve()
        if not file_path.is_file() or not file_path.is_relative_to(tool_dir):
            return jsonify({"error": "File not found."}), 404
        try:
            content = file_path.read_text(encoding="utf-8")
        except (OSError, UnicodeDecodeError):
            return jsonify({"error": "This file cannot be displayed as text."}), 415
        if len(content) > 500_000:
            return jsonify({"error": "This file is too large to display."}), 413
        return jsonify({"filename": filename, "content": content})

    @app.get("/api/jobs/<job_id>/download")
    def download(job_id: str):
        job = jobs.get(job_id)
        if job is None:
            return jsonify({"error": "Job not found."}), 404
        if job["status"] != "complete" or not job.get("result"):
            return jsonify({"error": "The generated folder is not ready yet."}), 409
        archive = Path(job["result"]["output"]["archive_path"])
        if not archive.is_file():
            return jsonify({"error": "The generated archive is unavailable."}), 410
        return send_file(
            archive,
            mimetype="application/zip",
            as_attachment=True,
            download_name=archive.name,
        )

    @app.get("/api/jobs/<job_id>/report")
    def report(job_id: str):
        job = jobs.get(job_id)
        if job is None:
            return jsonify({"error": "Job not found."}), 404
        if job["status"] != "complete" or not job.get("result"):
            return jsonify({"error": "The report is not ready yet."}), 409
        report_path = Path(job["result"]["output"]["report_path"])
        if not report_path.is_file():
            return jsonify({"error": "The research report is unavailable."}), 410
        return send_file(
            report_path,
            mimetype="text/markdown",
            as_attachment=True,
            download_name="tool-opportunity-report.md",
        )

    @app.errorhandler(413)
    def too_large(_error):
        return jsonify({"error": "Request is too large."}), 413

    return app


def _run_job(
    app: Flask,
    jobs: JobStore,
    config: BuilderConfig,
    job_id: str,
    niche: str,
) -> None:
    def update(stage: str, percent: int, message: str) -> None:
        jobs.update(job_id, stage, percent, message)

    try:
        agent = ToolBuilderAgent(config)
        result = agent.run(
            niche,
            update,
            publish_idea=lambda idea: jobs.publish_idea(job_id, idea),
        )
        result["output"]["download_url"] = f"/api/jobs/{job_id}/download"
        result["output"]["report_url"] = f"/api/jobs/{job_id}/report"
        result["output"]["preview_url"] = f"/preview/{job_id}/"
        result["output"]["files_url"] = f"/api/jobs/{job_id}/files"
        result["alternatives"] = []
        result["alternatives_url"] = f"/api/jobs/{job_id}/alternatives"
        jobs.complete(job_id, result)
    except Exception as error:
        app.logger.exception("Tool-builder job %s failed", job_id)
        jobs.fail(job_id, _public_error(error))


def _run_alternative_job(
    app: Flask,
    jobs: JobStore,
    config: BuilderConfig,
    parent_job_id: str,
    job_id: str,
    niche: str,
    excluded_slugs: set[str],
) -> None:
    def update(stage: str, percent: int, message: str) -> None:
        jobs.update(job_id, stage, percent, message)

    try:
        agent = ToolBuilderAgent(config)
        result = agent.validate_alternative(
            niche,
            excluded_slugs,
            update,
            publish_idea=lambda idea: jobs.publish_idea(job_id, idea),
        )
        jobs.append_alternative(parent_job_id, result)
        jobs.complete(
            job_id,
            result,
            "Alternative idea and demand validation are ready",
        )
    except Exception as error:
        app.logger.exception("Alternative-idea job %s failed", job_id)
        jobs.fail(job_id, _public_error(error))


def _public_error(error: Exception) -> str:
    message = " ".join(str(error).split())[:420]
    if not message:
        message = type(error).__name__
    return message


def _job_tool_dir(job: dict[str, Any], config: BuilderConfig) -> Path | None:
    result = job.get("result")
    output = result.get("output") if isinstance(result, dict) else None
    value = output.get("tool_path") if isinstance(output, dict) else None
    if not isinstance(value, str) or not value:
        return None
    path = Path(value)
    if not path.is_absolute():
        path = config.app_root / path
    resolved = path.resolve()
    if not resolved.is_relative_to(config.runs_root):
        return None
    return resolved


app = create_app()


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    app.run(host="127.0.0.1", port=5000, debug=False)
