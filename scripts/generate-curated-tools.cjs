const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const toolsRoot = path.join(root, 'tools');

function createTool(toolDef) {
  const {
    slug,
    name,
    description,
    category,
    icon,
    keywords,
    order,
    schemaCategory = 'UtilitiesApplication',
    workspaceHeading = 'Interactive Workspace',
    controlsHtml,
    toolJsContent,
    howToSteps,
    benefitTitle,
    benefitContent,
    privacyContent,
    faqs
  } = toolDef;

  const toolDir = path.join(toolsRoot, slug);
  if (!fs.existsSync(toolDir)) {
    fs.mkdirSync(toolDir, { recursive: true });
  }

  // Generate FAQ Schema and HTML
  const faqSchemaList = faqs.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": f.a
    }
  }));

  const faqsHtml = faqs.map(f => `      <details>
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`).join('\n');

  const stepsHtml = howToSteps.map(s => `        <li>${s}</li>`).join('\n');

  // Generate index.html
  const htmlContent = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${name} - Free Online Tool | NikTool</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://niktool.in/tools/${slug}/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${name} | NikTool">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="https://niktool.in/tools/${slug}/">
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
        "name": "${name}",
        "applicationCategory": "${schemaCategory}",
        "operatingSystem": "Any",
        "url": "https://niktool.in/tools/${slug}/",
        "description": "${description}",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": ${JSON.stringify(faqSchemaList, null, 2)}
      }
    ]
  }
  </script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/" aria-label="NikTool home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 7h14M8 12h8m-5 5h2"/></svg>
        </span>
        <span class="brand-text">NikTool</span>
      </a>
      <div class="nav-links"><a class="home-link" href="/">Home</a><a href="/#tools">All tools</a></div>
    </nav>
  </header>

  <main id="main" class="container">
    <div class="breadcrumbs">
      <a href="/">Home</a>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <span>${name}</span>
    </div>

    <section class="tool-hero">
      <span class="tool-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16M4 10h10M4 14h16M4 18h8"/></svg>
      </span>
      <h1>${name}</h1>
      <p>${description}</p>
    </section>

    <section class="tool-workspace" aria-labelledby="workspace-title">
      <div class="workspace-header">
        <h2 id="workspace-title">${workspaceHeading}</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally</span>
      </div>

${controlsHtml}

      <div class="toolbar" style="margin-top: 1.25rem;">
        <button class="button" id="primary-action-btn" type="button">Calculate</button>
        <button class="button secondary" id="copy-result-btn" type="button" style="display: none;">Copy Result</button>
        <button class="button secondary" id="clear-action-btn" type="button">Clear</button>
      </div>

      <p class="message" id="tool-message" role="status" aria-live="polite">Ready. Enter parameters above.</p>
    </section>

    <article class="seo-content">
      <h2>How to use ${name}</h2>
      <ol>
${stepsHtml}
      </ol>

      <h2>${benefitTitle}</h2>
      <p>${benefitContent}</p>

      <h2>Private browser-based processing</h2>
      <p>${privacyContent || 'All calculations and conversions run 100% locally in your browser. No personal data or numbers are ever transmitted or saved to external servers.'}</p>

      <h2>Frequently asked questions</h2>
${faqsHtml}
    </article>
  </main>

  <footer class="site-footer">
    <div class="footer-inner container">
      <p>&copy; <span data-year></span> NikTool.</p>
      <div class="footer-links">
        <a href="/">Home</a>
        <a href="/#tools">All tools</a>
      </div>
    </div>
  </footer>

  <noscript>
    <p class="noscript">This tool requires JavaScript to work.</p>
  </noscript>

  <script src="/assets/shared.js"></script>
  <script src="/tools/${slug}/tool.js"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(toolDir, 'index.html'), htmlContent, 'utf8');
  fs.writeFileSync(path.join(toolDir, 'tool.js'), toolJsContent, 'utf8');

  // Generate catalog.json
  const catalogObj = {
    name,
    description,
    path: `/tools/${slug}/`,
    category,
    icon,
    keywords,
    order: order || 90
  };
  fs.writeFileSync(path.join(toolDir, 'catalog.json'), JSON.stringify(catalogObj, null, 2) + '\n', 'utf8');

  // Generate sitemap.xml
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://niktool.in/tools/${slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
`;
  fs.writeFileSync(path.join(toolDir, 'sitemap.xml'), sitemapXml, 'utf8');
  console.log(`Created tool: ${slug}`);
}

module.exports = { createTool };
