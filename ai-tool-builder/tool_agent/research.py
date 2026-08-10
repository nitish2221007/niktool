from __future__ import annotations

import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import Any
from urllib.parse import parse_qs, unquote, urlparse

import requests
from bs4 import BeautifulSoup


TOKEN_RE = re.compile(r"[a-z0-9]+")


class WebResearcher:
    SEARCH_URL = "https://html.duckduckgo.com/html/"
    SUGGEST_URL = "https://duckduckgo.com/ac/"

    def __init__(self, timeout_seconds: int = 12, enabled: bool = True) -> None:
        self.timeout = timeout_seconds
        self.enabled = enabled
        self.headers = {
            "User-Agent": (
                "Mozilla/5.0 (compatible; NikToolResearch/1.0; "
                "+https://niktool.in/)"
            )
        }

    def research_ideas(self, ideas: list[dict[str, Any]]) -> list[dict[str, Any]]:
        if not self.enabled:
            return [self._disabled_result(idea) for idea in ideas]

        results: list[dict[str, Any] | None] = [None] * len(ideas)
        with ThreadPoolExecutor(max_workers=min(4, len(ideas) or 1)) as executor:
            futures = {
                executor.submit(self._research_one, idea): index
                for index, idea in enumerate(ideas)
            }
            for future in as_completed(futures):
                index = futures[future]
                try:
                    results[index] = future.result()
                except Exception as error:
                    results[index] = self._failed_result(ideas[index], str(error))

        return [result for result in results if result is not None]

    def _research_one(self, idea: dict[str, Any]) -> dict[str, Any]:
        primary_keyword = str(
            idea.get("primary_keyword") or idea.get("name") or ""
        ).strip()
        query = f'"{primary_keyword}" online tool'
        websites, search_error = self._search(query)
        suggestions, suggest_error = self._suggest(primary_keyword)

        primary_tokens = set(TOKEN_RE.findall(primary_keyword.lower()))
        exact_matches = 0
        title_token_sets: list[set[str]] = []
        domains: set[str] = set()
        for result in websites:
            title_tokens = set(TOKEN_RE.findall(result["title"].lower()))
            title_token_sets.append(title_tokens)
            overlap = (
                len(primary_tokens & title_tokens) / len(primary_tokens)
                if primary_tokens else 0
            )
            if overlap >= 0.8:
                exact_matches += 1
            if result["domain"]:
                domains.add(result["domain"])

        gaps: list[str] = []
        for suggestion in suggestions:
            suggestion_tokens = set(TOKEN_RE.findall(suggestion.lower()))
            if not suggestion_tokens:
                continue
            coverage = max(
                (
                    len(suggestion_tokens & title_tokens) / len(suggestion_tokens)
                    for title_tokens in title_token_sets
                ),
                default=0,
            )
            if coverage < 0.65:
                gaps.append(suggestion)

        competition = min(100, len(domains) * 11 + exact_matches * 12)
        opportunity = (
            max(
                0,
                min(100, 55 + min(len(suggestions), 10) * 3 - competition // 2),
            )
            if websites or suggestions
            else 0
        )
        errors = [error for error in (search_error, suggest_error) if error]
        if search_error and suggest_error:
            research_status = "failed"
        elif errors:
            research_status = "partial"
        else:
            research_status = "complete"

        return {
            "idea_slug": idea.get("slug"),
            "query": query,
            "primary_keyword": primary_keyword,
            "websites": websites,
            "keyword_suggestions": suggestions,
            "low_coverage_keywords": gaps[:8],
            "metrics": {
                "unique_domains": len(domains),
                "exact_title_matches": exact_matches,
                "competition_proxy": competition,
                "opportunity_proxy": opportunity,
            },
            "research_status": research_status,
            "research_notes": errors,
            "metric_disclaimer": (
                "Scores are qualitative search-result proxies, not search volume "
                "or advertising keyword data."
            ),
        }

    def _search(self, query: str) -> tuple[list[dict[str, str]], str | None]:
        try:
            response = requests.get(
                self.SEARCH_URL,
                params={"q": query},
                headers=self.headers,
                timeout=self.timeout,
            )
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")
            results: list[dict[str, str]] = []
            for result in soup.select(".result"):
                link = result.select_one(".result__a")
                if link is None:
                    continue
                raw_url = str(link.get("href") or "")
                url = self._clean_result_url(raw_url)
                parsed = urlparse(url)
                if parsed.scheme not in {"http", "https"}:
                    continue
                snippet_node = result.select_one(".result__snippet")
                results.append(
                    {
                        "title": link.get_text(" ", strip=True)[:180],
                        "url": url,
                        "domain": parsed.netloc.lower().removeprefix("www."),
                        "snippet": (
                            snippet_node.get_text(" ", strip=True)[:320]
                            if snippet_node else ""
                        ),
                    }
                )
                if len(results) >= 6:
                    break
            if not results:
                return [], "Search returned no parseable website results."
            return results, None
        except requests.RequestException as error:
            return [], f"Website search failed: {type(error).__name__}."

    def _suggest(self, query: str) -> tuple[list[str], str | None]:
        try:
            response = requests.get(
                self.SUGGEST_URL,
                params={"q": query, "type": "list"},
                headers=self.headers,
                timeout=self.timeout,
            )
            response.raise_for_status()
            payload = response.json()
            suggestions: list[str] = []
            if isinstance(payload, list):
                for entry in payload:
                    phrase = entry.get("phrase") if isinstance(entry, dict) else None
                    if isinstance(phrase, str) and phrase.strip():
                        normalized = phrase.strip().lower()
                        if normalized not in suggestions:
                            suggestions.append(normalized)
            return suggestions[:12], None
        except (requests.RequestException, ValueError) as error:
            return [], f"Keyword suggestions failed: {type(error).__name__}."

    @staticmethod
    def _clean_result_url(raw_url: str) -> str:
        parsed = urlparse(raw_url)
        if parsed.netloc.endswith("duckduckgo.com") or parsed.path.startswith("/l/"):
            target = parse_qs(parsed.query).get("uddg", [""])[0]
            if target:
                return unquote(target)
        return raw_url

    @staticmethod
    def _disabled_result(idea: dict[str, Any]) -> dict[str, Any]:
        return {
            "idea_slug": idea.get("slug"),
            "query": "",
            "primary_keyword": idea.get("primary_keyword", ""),
            "websites": [],
            "keyword_suggestions": [],
            "low_coverage_keywords": [],
            "metrics": {
                "unique_domains": 0,
                "exact_title_matches": 0,
                "competition_proxy": 0,
                "opportunity_proxy": 0,
            },
            "research_status": "disabled",
            "research_notes": ["Live web research is disabled by configuration."],
            "metric_disclaimer": (
                "No live validation was performed because web research is disabled."
            ),
        }

    @staticmethod
    def _failed_result(idea: dict[str, Any], detail: str) -> dict[str, Any]:
        result = WebResearcher._disabled_result(idea)
        result["research_status"] = "failed"
        result["research_notes"] = [f"Research failed: {detail[:180]}"]
        result["metric_disclaimer"] = "No reliable live validation was available."
        return result
