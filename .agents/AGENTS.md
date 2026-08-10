# NikTool AI Agent Authoring Guidelines & Master Prompt

Whenever an AI agent is requested to create or modify a tool in NikTool, it MUST follow the exact requirements and boilerplate documented below.

---

## 📋 Master Prompt & Creation Specification

```text
You are an expert web developer creating a new static web tool for the NikTool website.

TOOL TO CREATE: [YOUR TOOL NAME & IDEA HERE]

==================================================
CRITICAL DESIGN & CODE CONSTRAINTS
==================================================
1. DESIGN SYSTEM: Strictly use NikTool's existing CSS classes from /assets/styles.css. Do NOT invent custom CSS classes or add inline styles.
2. PRIVACY & PERFORMANCE: Processing MUST happen 100% locally in the browser. Do NOT send data to any external server.
3. COPY HELPER: Use `window.NikTool.copy(text, copyBtn)` for copy functionality.

==================================================
MINIMUM SEO & CONTENT REQUIREMENTS
==================================================
- Title Tag: "[Tool Title] - Free Online Tool | NikTool"
- Meta Description: Compelling 140-160 character description summarizing the tool.
- JSON-LD Schema: Must include both `@type: "SoftwareApplication"` and `@type: "FAQPage"`.
- SEO Content Article (<article class="seo-content">):
  * Minimum 1 Step-by-step guide (<ol> with at least 3 steps).
  * Minimum 3 H2 content sections ("How to use", "Features & Privacy", "Common Use Cases").
  * Minimum 4 to 5 FAQ items using <details> and <summary> tags.
  * MANDATORY FAQ ITEM: Must include an explicit "How do I use this tool?" FAQ item in both HTML and JSON-LD schema!
- Catalog Metadata (catalog.json):
  * MUST be a SINGLE JSON OBJECT `{ ... }` (Do NOT wrap in array `[ ]`).
  * `name`: Tool Title string
  * `description`: Short description string
  * `path`: "/tools/[tool-slug]/" (or "/tools/class-XX/subject/ch-X/[tool-slug]/" for nested tools)
  * `category`: Must be one of: "Text", "PDF", "Developer", "Utilities", "Math", "Security".
  * `icon`: Must be one of supported icons: "text", "code", "shield".
  * `keywords`: JSON Array of minimum 6 to 8 relevant search keywords.
  * `order`: Number (e.g., 50).

==================================================
EXACT CATALOG.JSON TEMPLATE (catalog.json)
==================================================
{
  "name": "[Tool Title]",
  "description": "[Short description 140-160 chars]",
  "path": "/tools/[tool-slug]/",
  "category": "Utilities",
  "icon": "text",
  "keywords": [
    "keyword 1",
    "keyword 2",
    "keyword 3",
    "keyword 4",
    "keyword 5",
    "keyword 6"
  ],
  "order": 50
}

==================================================
EXACT SITEMAP.XML TEMPLATE (sitemap.xml)
==================================================
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://niktool.in/tools/[tool-slug]/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>

==================================================
EXACT HTML BOILERPLATE TEMPLATE (index.html)
==================================================
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>[Tool Title] - Free Online Tool | NikTool</title>
  <meta name="description" content="[Short description 140-160 chars]">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://niktool.in/tools/[tool-slug]/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="[Tool Title] | NikTool">
  <meta property="og:description" content="[Short description]">
  <meta property="og:url" content="https://niktool.in/tools/[tool-slug]/">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#176b4d">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "[Tool Title]",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "url": "https://niktool.in/tools/[tool-slug]/",
        "description": "[Short description]",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I use this tool?",
            "acceptedAnswer": { "@type": "Answer", "text": "Simply paste your input data into the input field and click the primary action button to get instant results." }
          },
          {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, all processing happens locally in your browser." }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 7h14M8 12h8m-5 5h2"/></svg>
        </span>
        <span class="brand-text">NikTool</span>
      </a>
      <div class="nav-links"><a class="home-link" href="/">Home</a><a href="/#tools">All tools</a></div>
    </nav>
  </header>

  <main id="main" class="container">
    <section class="tool-hero">
      <h1>[Tool Title]</h1>
      <p>[Hero Subtitle Description]</p>
    </section>

    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
          <label class="editor-label" for="[tool-slug]-input">Input</label>
          <textarea class="tool-textarea" id="[tool-slug]-input" placeholder="Type or paste input here..."></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="[tool-slug]-output">Result</label>
          <textarea class="tool-textarea" id="[tool-slug]-output" placeholder="Result will appear here..." readonly></textarea>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="primary-action-btn" type="button">Process</button>
        <button class="button secondary" id="copy-output" type="button" disabled>Copy result</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="[tool-slug]-message" role="status">Ready. Enter input above.</p>
    </section>

    <article class="seo-content">
      <h2>How to use [Tool Title]</h2>
      <ol>
        <li>Step 1 description.</li>
        <li>Step 2 description.</li>
        <li>Step 3 description.</li>
      </ol>

      <h2>Key Features & Privacy</h2>
      <p>Detailed overview of why this tool is fast, free, and secure.</p>

      <h2>Common Use Cases</h2>
      <p>Explanation of who uses this tool and why.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use this tool?</summary>
        <p>Simply paste or type your input in the input area, click Process, and copy your result.</p>
      </details>
      <details>
        <summary>Is my data secure?</summary>
        <p>Yes, all calculations happen locally in your browser without server uploads.</p>
      </details>
      <details>
        <summary>Is this tool free to use?</summary>
        <p>Yes, NikTool is 100% free with no account or registration required.</p>
      </details>
      <details>
        <summary>Does it work offline?</summary>
        <p>Yes, once loaded, the tool works completely offline in your browser.</p>
      </details>
    </article>
  </main>

  <footer class="site-footer">
    <div class="footer-inner container">
      <p>&copy; <span data-year></span> NikTool.</p>
      <div class="footer-links"><a href="/">Home</a><a href="/#tools">All tools</a></div>
    </div>
  </footer>

  <script src="/assets/shared.js"></script>
  <script src="/tools/[tool-slug]/tool.js"></script>
</body>
</html>

==================================================
OUTPUT REQUIREMENT (TERMINAL SCRIPT)
==================================================
Output your ENTIRE response ONLY as a SINGLE Windows PowerShell script block that I can copy and paste directly into my terminal.

The script MUST:
1. Create directory `tools/[tool-slug]` (or `tools/class-XX/subject/ch-X/[tool-slug]` for nested tools)
2. Write `tools/[tool-slug]/index.html`
3. Write `tools/[tool-slug]/tool.js` (vanilla JS handling input, output, errors, copy, and clear)
4. Write `tools/[tool-slug]/catalog.json` (as a single JSON Object { ... }, NEVER wrapped in array [ ])
5. Write `tools/[tool-slug]/sitemap.xml`
6. Execute `node scripts/sync-tool-metadata.cjs` at the end.
```
