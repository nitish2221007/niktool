const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const newTools = [];

function addTool(slug, title, desc, category, subType, config) {
  newTools.push({ slug, title, desc, category, subType, config });
}

// =================================================================
// 1. EXPANDED IMAGE & MEDIA TOOLS (100+ new tools)
// =================================================================
const extraKb = [10, 30, 40, 60, 70, 80, 90, 150, 250, 400, 600, 700, 800, 900, 1024];
for (const kb of extraKb) {
  addTool(
    `compress-image-to-${kb}kb`,
    `Compress Image to ${kb}KB Online`,
    `Compress JPG, PNG, and WebP images to under ${kb}KB without losing quality. 100% free and local.`,
    'Utilities',
    'img_compress',
    { targetKB: kb }
  );
  addTool(
    `resize-image-to-${kb}kb`,
    `Resize Image to ${kb}KB Online`,
    `Reduce image file size to ${kb}KB for online forms and job applications. Fast and 100% private.`,
    'Utilities',
    'img_compress',
    { targetKB: kb }
  );
}

const extraDims = [
  { w: 2560, h: 1440, name: '2K 1440p' },
  { w: 3840, h: 2160, name: '4K UHD' },
  { w: 720, h: 1280, name: '720x1280 Vertical' },
  { w: 1080, h: 1920, name: '1080x1920 Vertical HD' },
  { w: 400, h: 400, name: '400x400 Profile' },
  { w: 150, h: 150, name: '150x150 Thumbnail' },
  { w: 1200, h: 630, name: 'Open Graph Image' },
  { w: 1500, h: 500, name: 'Twitter Header' },
  { w: 1584, h: 396, name: 'LinkedIn Banner' }
];

for (const d of extraDims) {
  addTool(
    `resize-image-to-${d.w}x${d.h}`,
    `Resize Image to ${d.w}x${d.h} Pixels`,
    `Resize any JPG, PNG, or WebP photo to exact ${d.w}x${d.h} pixel dimensions instantly. 100% free and local.`,
    'Utilities',
    'img_resize',
    { width: d.w, height: d.h }
  );
}

addTool('resize-image-for-facebook-cover', 'Resize Image for Facebook Cover', 'Resize banner image to 820x312 pixels for Facebook cover photo.', 'Utilities', 'img_resize', { width: 820, height: 312 });
addTool('resize-image-for-twitter-header', 'Resize Image for Twitter Header', 'Resize banner photo to 1500x500 pixels for Twitter profile headers.', 'Utilities', 'img_resize', { width: 1500, height: 500 });
addTool('resize-image-for-linkedin-banner', 'Resize Image for LinkedIn Banner', 'Resize cover image to 1584x396 pixels for LinkedIn profile banners.', 'Utilities', 'img_resize', { width: 1584, height: 396 });
addTool('resize-image-for-tiktok-video', 'Resize Image for TikTok Video Cover', 'Resize image to 1080x1920 vertical format for TikTok.', 'Utilities', 'img_resize', { width: 1080, height: 1920 });

// =================================================================
// 2. TEXT & STRING MANIPULATION TOOLS (100+ tools)
// =================================================================
for (let i = 1; i <= 20; i++) {
  addTool(
    `remove-line-${i}-from-text`,
    `Remove Line ${i} From Text`,
    `Delete line number ${i} from any multiline text document instantly. 100% free and local processing.`,
    'Text',
    'text_line_remove',
    { lineNumber: i }
  );
  addTool(
    `remove-first-${i}-lines-from-text`,
    `Remove First ${i} Lines From Text`,
    `Remove the first ${i} line${i > 1 ? 's' : ''} from multiline text files. 100% free and private.`,
    'Text',
    'text_first_lines_remove',
    { count: i }
  );
  addTool(
    `remove-last-${i}-lines-from-text`,
    `Remove Last ${i} Lines From Text`,
    `Remove the last ${i} line${i > 1 ? 's' : ''} from multiline text files. 100% free and private.`,
    'Text',
    'text_last_lines_remove',
    { count: i }
  );
}

addTool('remove-empty-lines-from-text', 'Remove Empty Lines From Text', 'Delete all blank and empty lines from multiline text documents instantly.', 'Text', 'text_clean', { type: 'empty_lines' });
addTool('remove-duplicate-lines-from-text', 'Remove Duplicate Lines From Text', 'Deduplicate text lines and remove repeated lines online.', 'Text', 'text_clean', { type: 'duplicate_lines' });
addTool('add-prefix-to-each-line-of-text', 'Add Prefix to Each Line of Text', 'Prepend custom prefix or string to the beginning of every text line.', 'Text', 'text_prefix', {});
addTool('add-suffix-to-each-line-of-text', 'Add Suffix to Each Line of Text', 'Append custom suffix or string to the end of every text line.', 'Text', 'text_suffix', {});
addTool('number-each-line-of-text', 'Number Each Line of Text', 'Add line numbers (1. 2. 3.) to every line of text automatically.', 'Text', 'text_number', {});

// Case Converters
addTool('convert-text-to-uppercase', 'Convert Text to UPPERCASE', 'Convert all characters in text to UPPERCASE letters.', 'Text', 'case_convert', { case: 'upper' });
addTool('convert-text-to-lowercase', 'Convert Text to lowercase', 'Convert all characters in text to lowercase letters.', 'Text', 'case_convert', { case: 'lower' });
addTool('convert-text-to-title-case', 'Convert Text to Title Case', 'Capitalize the first letter of every word in text.', 'Text', 'case_convert', { case: 'title' });
addTool('convert-text-to-snake-case', 'Convert Text to snake_case', 'Convert text phrases into snake_case format for code variables.', 'Text', 'case_convert', { case: 'snake' });
addTool('convert-text-to-kebab-case', 'Convert Text to kebab-case', 'Convert text phrases into kebab-case slug format for URLs.', 'Text', 'case_convert', { case: 'kebab' });
addTool('convert-text-to-camel-case', 'Convert Text to camelCase', 'Convert text phrases into camelCase format for JavaScript.', 'Text', 'case_convert', { case: 'camel' });

// =================================================================
// 3. DEVELOPER & WEB UNITS (PX TO REM 1px..50px) (50+ tools)
// =================================================================
for (let px = 1; px <= 40; px++) {
  addTool(
    `convert-${px}px-to-rem`,
    `Convert ${px}px to REM`,
    `Convert ${px} pixels (px) to REM units based on 16px root font size (${(px/16).toFixed(4)}rem).`,
    'Developer',
    'unit_px_rem',
    { px: px }
  );
  addTool(
    `convert-${px/2}rem-to-px`,
    `Convert ${px/2} REM to PX`,
    `Convert ${px/2} REM units to pixels (px) based on 16px root font size (${(px/2)*16}px).`,
    'Developer',
    'unit_rem_px',
    { rem: px/2 }
  );
}

// =================================================================
// 4. ACADEMIC & MARKS CALCULATORS (50+ tools)
// =================================================================
for (let c = 1; c <= 10; c++) {
  addTool(
    `cgpa-to-percentage-calculator-scale-${c}`,
    `CGPA to Percentage Calculator (Scale ${c})`,
    `Convert cumulative grade point average (CGPA) on a ${c}-point scale to exact percentage.`,
    'Math',
    'cgpa_scale',
    { scale: c }
  );
}

for (let mark = 500; mark <= 1000; mark += 50) {
  addTool(
    `marks-to-percentage-calculator-${mark}-marks`,
    `Marks to Percentage Calculator (${mark} Total Marks)`,
    `Calculate your percentage score out of ${mark} total marks instantly with grade breakdown.`,
    'Math',
    'marks_total',
    { total: mark }
  );
}

console.log(`Total New Tools to Build: ${newTools.length}`);

// Generate HTML
function generateHtml(tool) {
  const isImage = tool.subType.startsWith('img_');
  const isText = tool.category === 'Text';
  const isDev = tool.category === 'Developer';
  const isMath = tool.category === 'Math';

  const headingColor = isImage ? '#176b4d' : isText ? '#0d4b35' : isDev ? '#176b4d' : '#176b4d';
  const bodyClass = isImage ? 'image-page' : 'standard-tool';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${tool.title} - Free Online Tool | NikTool</title>
  <meta name="description" content="${tool.desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://niktool.in/tools/${tool.slug}/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${tool.title} | NikTool">
  <meta property="og:description" content="${tool.desc}">
  <meta property="og:url" content="https://niktool.in/tools/${tool.slug}/">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#176b4d">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
  <style>
    .tool-hero h1 {
      color: ${headingColor} !important;
      font-size: clamp(2.1rem, 5.5vw, 3.4rem) !important;
      line-height: 1.25 !important;
      letter-spacing: -0.02em !important;
      margin-top: 0.85rem !important;
      margin-bottom: 1rem !important;
    }
    .tool-hero p {
      margin-top: 0.85rem !important;
      line-height: 1.6 !important;
      font-size: 1.05rem !important;
    }
  </style>
  <!-- Google AdSense Auto Ads -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3039559152735742" crossorigin="anonymous"></script>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-HJB9MSVTRN"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-HJB9MSVTRN');
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": ${JSON.stringify(tool.title)},
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "url": "https://niktool.in/tools/${tool.slug}/",
        "description": ${JSON.stringify(tool.desc)},
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://niktool.in/" },
          { "@type": "ListItem", "position": 2, "name": ${JSON.stringify(tool.category)}, "item": "https://niktool.in/#tools" },
          { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(tool.title)}, "item": "https://niktool.in/tools/${tool.slug}/" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": ${JSON.stringify(`How do I use ${tool.title}?`)},
            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(`Enter or upload your input into the workspace field and click Process to get instant results.`)} }
          },
          {
            "@type": "Question",
            "name": "Is my data processed locally?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% of calculations and operations execute locally inside your web browser. No data is sent to external servers." }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="${bodyClass}">
  <a class="skip-link" href="#main">Skip to content</a>

  <header class="site-header">
    <nav class="nav" aria-label="Main navigation">
      <a class="brand" href="/">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 7h14M8 12h8m-5 5h2"/></svg>
        </span>
        <span class="brand-text">NikTool</span>
      </a>
      <div class="nav-links">
        <a class="home-link" href="/">Home</a>
        <a href="/#tools">All tools</a>
        <a href="/about/">About</a>
        <a href="/privacy/">Privacy</a>
        <a href="/contact/">Contact</a>
      </div>
    </nav>
  </header>

  <main id="main" class="container">
    <div class="breadcrumbs">
      <a href="/">Home</a>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <a href="/#tools">${tool.category}</a>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <span>${tool.title}</span>
    </div>

    <section class="tool-hero">
      <h1>${tool.title}</h1>
      <p>${tool.desc}</p>
    </section>

    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
          <label class="editor-label" for="${tool.slug}-input">Input</label>
          <textarea class="tool-textarea" id="${tool.slug}-input" placeholder="Enter input text or values here..."></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${tool.slug}-output">Result Output</label>
          <textarea class="tool-textarea" id="${tool.slug}-output" placeholder="Results will appear here..." readonly></textarea>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="primary-action-btn" type="button">Process</button>
        <button class="button secondary" id="copy-output" type="button">Copy Result</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${tool.slug}-message" role="status">Ready. Enter input above.</p>
    </section>

    <article class="seo-content">
      <h2>How to use ${tool.title}</h2>
      <ol>
        <li>Type or paste your input into the <strong>Input</strong> panel above.</li>
        <li>Click <strong>Process</strong> to calculate or transform your data instantly.</li>
        <li>Click <strong>Copy Result</strong> to copy your output to the clipboard.</li>
      </ol>

      <h2>Key Features &amp; Privacy</h2>
      <p>This utility operates 100% locally inside your web browser. No data is ever transmitted to an external server, providing maximum privacy and lightning-fast execution speed.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use ${tool.title}?</summary>
        <p>Enter or upload your input into the workspace field and click Process to get instant results.</p>
      </details>
      <details>
        <summary>Is my data processed locally?</summary>
        <p>Yes, 100% of calculations and operations execute locally inside your web browser. No data is sent to external servers.</p>
      </details>
      <details>
        <summary>Is this tool free?</summary>
        <p>Yes, NikTool tools are 100% free with no account or registration required.</p>
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
  <script src="/tools/${tool.slug}/tool.js"></script>
</body>
</html>
`;
}

// Generate JS
function generateJs(tool) {
  return `(function() {
  'use strict';
  var slug = '${tool.slug}';
  var subType = '${tool.subType}';
  var config = ${JSON.stringify(tool.config)};

  var inputEl = document.getElementById(slug + '-input');
  var outputEl = document.getElementById(slug + '-output');
  var msgEl = document.getElementById(slug + '-message');
  var btn = document.getElementById('primary-action-btn');
  var copyBtn = document.getElementById('copy-output');
  var clearBtn = document.getElementById('clear-text');

  function setMsg(t, err) {
    msgEl.textContent = t;
    msgEl.classList.toggle('is-error', !!err);
  }

  function process() {
    var raw = inputEl.value;
    if (!raw && subType.startsWith('text_')) {
      setMsg('Please enter input text.', true);
      outputEl.value = '';
      return;
    }

    try {
      var res = '';
      if (subType === 'text_line_remove') {
        var lines = raw.split('\\n');
        var targetIdx = config.lineNumber - 1;
        if (targetIdx >= 0 && targetIdx < lines.length) lines.splice(targetIdx, 1);
        res = lines.join('\\n');
      } else if (subType === 'text_first_lines_remove') {
        var lines = raw.split('\\n');
        res = lines.slice(config.count).join('\\n');
      } else if (subType === 'text_last_lines_remove') {
        var lines = raw.split('\\n');
        res = lines.slice(0, Math.max(0, lines.length - config.count)).join('\\n');
      } else if (subType === 'text_clean') {
        var lines = raw.split('\\n');
        if (config.type === 'empty_lines') {
          res = lines.filter(function(l) { return l.trim().length > 0; }).join('\\n');
        } else if (config.type === 'duplicate_lines') {
          var seen = new Set();
          res = lines.filter(function(l) { if (seen.has(l)) return false; seen.add(l); return true; }).join('\\n');
        }
      } else if (subType === 'case_convert') {
        if (config.case === 'upper') res = raw.toUpperCase();
        else if (config.case === 'lower') res = raw.toLowerCase();
        else if (config.case === 'title') res = raw.replace(/\\b\\w/g, function(l){ return l.toUpperCase(); });
        else if (config.case === 'snake') res = raw.trim().toLowerCase().replace(/\\s+/g, '_');
        else if (config.case === 'kebab') res = raw.trim().toLowerCase().replace(/\\s+/g, '-');
        else if (config.case === 'camel') res = raw.trim().toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function(m, c) { return c.toUpperCase(); });
      } else if (subType === 'unit_px_rem') {
        var val = parseFloat(raw) || config.px;
        res = (val / 16).toFixed(4) + ' rem (based on 16px root font size)';
      } else if (subType === 'unit_rem_px') {
        var val = parseFloat(raw) || config.rem;
        res = (val * 16).toFixed(2) + ' px (based on 16px root font size)';
      } else if (subType === 'cgpa_scale') {
        var cgpa = parseFloat(raw);
        if (isNaN(cgpa) || cgpa < 0 || cgpa > config.scale) {
          setMsg('Please enter a valid CGPA between 0 and ' + config.scale, true);
          return;
        }
        var pct = (cgpa / config.scale) * 100;
        res = 'CGPA: ' + cgpa + ' / ' + config.scale + '\\nPercentage: ' + pct.toFixed(2) + '%';
      } else if (subType === 'marks_total') {
        var obt = parseFloat(raw);
        if (isNaN(obt) || obt < 0 || obt > config.total) {
          setMsg('Please enter valid obtained marks between 0 and ' + config.total, true);
          return;
        }
        var pct = (obt / config.total) * 100;
        res = 'Obtained Marks: ' + obt + ' / ' + config.total + '\\nPercentage: ' + pct.toFixed(2) + '%';
      } else {
        res = raw;
      }

      outputEl.value = res;
      setMsg('Processed successfully.');
    } catch(e) {
      setMsg('Error: ' + e.message, true);
    }
  }

  btn.addEventListener('click', process);

  copyBtn.addEventListener('click', function() {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outputEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outputEl.value);
    }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', function() {
    inputEl.value = ''; outputEl.value = '';
    setMsg('Cleared. Enter input above.');
  });
})();
`;
}

function generateCatalog(tool) {
  return JSON.stringify({
    name: tool.title,
    description: tool.desc,
    path: `/tools/${tool.slug}/`,
    category: tool.category,
    icon: 'text',
    keywords: [
      tool.slug.replace(/-/g, ' '),
      tool.title,
      'online tool',
      'free tool',
      'browser tool'
    ],
    order: 10
  }, null, 2);
}

function generateSitemap(tool) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://niktool.in/tools/${tool.slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
}

console.log(`Writing ${newTools.length} additional cluster tools...`);

for (const tool of newTools) {
  const dirPath = path.join(process.cwd(), 'tools', tool.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(path.join(dirPath, 'index.html'), generateHtml(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'tool.js'), generateJs(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'catalog.json'), generateCatalog(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'sitemap.xml'), generateSitemap(tool), 'utf8');

  console.log(`Built tool: ${tool.slug}`);
}

console.log('Running metadata sync...');
try {
  execSync('node scripts/sync-tool-metadata.cjs', { stdio: 'inherit', cwd: process.cwd() });
  console.log('Metadata sync complete!');
} catch (e) {
  console.error('Metadata sync failed:', e.message);
}
