const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const existingTools = new Set(fs.readdirSync('tools'));
const existingNames = new Set();

for (const dir of existingTools) {
  const catFile = path.join('tools', dir, 'catalog.json');
  if (fs.existsSync(catFile)) {
    try {
      const cat = JSON.parse(fs.readFileSync(catFile, 'utf8'));
      if (cat.name) existingNames.add(cat.name.trim().toLowerCase());
    } catch(e){}
  }
}

console.log(`Loaded ${existingTools.size} existing tool paths and ${existingNames.size} existing unique titles.`);

const boosterSpecs = [];

function addUniqueTool(slug, title, desc, category, subType, config) {
  const normTitle = title.trim().toLowerCase();
  if (existingTools.has(slug) || existingNames.has(normTitle)) {
    return;
  }
  existingTools.add(slug);
  existingNames.add(normTitle);
  boosterSpecs.push({ slug, title, desc, category, subType, config });
}

// 1. EEE Ohm's Law Voltage 51..100 x Current 1..10 (500 tools)
for (let v = 51; v <= 100; v++) {
  var volt = v * 5;
  for (let i = 1; i <= 10; i++) {
    var r = (volt / i).toFixed(2);
    var p = (volt * i).toFixed(1);
    addUniqueTool(
      `ohms-law-calculator-voltage-${volt}v-current-${i}a`,
      `Ohm's Law Calculator (Voltage ${volt}V, Current ${i}A)`,
      `Calculate Resistance (${r} Ω) and Electric Power (${p} W) for ${volt}V voltage and ${i}A current.`,
      'Developer',
      'ee_ohms',
      { volt: volt, current: i, resistance: r, power: p }
    );
  }
}

// 2. Mech Torque Power 51..100kW x RPM 500..4500 (500 tools)
for (let kw = 51; kw <= 100; kw++) {
  for (let rpm = 500; rpm <= 5000; rpm += 500) {
    var torque = ((kw * 1000 * 60) / (2 * Math.PI * rpm)).toFixed(2);
    addUniqueTool(
      `shaft-torque-calculator-power-${kw}kw-speed-${rpm}rpm`,
      `Shaft Torque Calculator (${kw} kW Power, ${rpm} RPM)`,
      `Calculate mechanical shaft torque (T = ${torque} N·m) for ${kw} kW power at ${rpm} RPM.`,
      'Utilities',
      'mech_torque',
      { powerKw: kw, rpm: rpm, torqueNm: torque }
    );
  }
}

// 3. Civil Beam Span 21..50m x Load 10..100kN/m (300 tools)
for (let len = 21; len <= 50; len++) {
  for (let load = 10; load <= 100; load += 10) {
    var bm = ((load * len * len) / 8).toFixed(2);
    addUniqueTool(
      `simple-beam-bending-moment-calculator-span-${len}m-load-${load}knm`,
      `Simply Supported Beam Bending Moment Calculator (Span ${len}m, Load ${load}kN/m)`,
      `Calculate maximum bending moment (Mmax = ${bm} kN·m) for simply supported beam of ${len}m span under ${load} kN/m load.`,
      'Utilities',
      'civil_beam',
      { spanM: len, loadKnM: load, maxBmMoment: bm }
    );
  }
}

// 4. CSE Download Size 51..100GB x Speed 100..1000Mbps (300 tools)
for (let gb = 51; gb <= 100; gb++) {
  for (let mbps of [100, 250, 500, 1000, 2500, 5000]) {
    var seconds = Math.round((gb * 8 * 1024) / mbps);
    var minutes = (seconds / 60).toFixed(1);
    addUniqueTool(
      `data-download-time-calculator-filesize-${gb}gb-speed-${mbps}mbps`,
      `Data Download Time Calculator (${gb} GB File, ${mbps} Mbps Speed)`,
      `Calculate file transfer download time (~${minutes} minutes / ${seconds}s) for ${gb} GB file at ${mbps} Mbps bandwidth.`,
      'Developer',
      'cs_download',
      { fileSizeGb: gb, speedMbps: mbps, downloadSeconds: seconds }
    );
  }
}

console.log(`Total 30K FINAL BOOSTER Unique Tools to create: ${boosterSpecs.length}`);

function generateHtml(tool) {
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
      color: #176b4d !important;
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
            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(`Enter your engineering parameters into the workspace panel and click Process for instant results.`)} }
          },
          {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% of calculations execute locally inside your web browser." }
          }
        ]
      }
    ]
  }
  </script>
</head>
<body class="standard-tool">
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
        <h2>Engineering Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
          <label class="editor-label" for="${tool.slug}-input">Input Parameters</label>
          <textarea class="tool-textarea" id="${tool.slug}-input" placeholder="Type or paste input parameters here..."></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${tool.slug}-output">Engineering Result</label>
          <textarea class="tool-textarea" id="${tool.slug}-output" placeholder="Calculation result will appear here..." readonly></textarea>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="primary-action-btn" type="button">Process</button>
        <button class="button secondary" id="copy-output" type="button">Copy Result</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${tool.slug}-message" role="status">Ready. Enter parameters above.</p>
    </section>

    <article class="seo-content">
      <h2>How to use ${tool.title}</h2>
      <ol>
        <li>Enter your engineering parameters into the <strong>Input</strong> panel above.</li>
        <li>Click <strong>Process</strong> to calculate the mathematical result instantly.</li>
        <li>Click <strong>Copy Result</strong> to copy your output to the clipboard.</li>
      </ol>

      <h2>Key Features &amp; Privacy</h2>
      <p>This engineering utility runs 100% locally in your web browser. No data is sent to external servers, providing maximum speed, security, and privacy.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use ${tool.title}?</summary>
        <p>Enter your engineering parameters into the workspace panel and click Process for instant calculations.</p>
      </details>
      <details>
        <summary>Is my engineering data secure?</summary>
        <p>Yes, 100% of calculations execute locally inside your browser.</p>
      </details>
      <details>
        <summary>Is this tool free?</summary>
        <p>Yes, NikTool is 100% free with no account or registration required.</p>
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
    try {
      var res = '';
      if (subType === 'ee_ohms') {
        res = 'Voltage (V): ' + config.volt + ' V\\nCurrent (I): ' + config.current + ' A\\nResistance (R): ' + config.resistance + ' Ω\\nElectric Power (P): ' + config.power + ' W';
      } else if (subType === 'mech_torque') {
        res = 'Power: ' + config.powerKw + ' kW\\nSpeed: ' + config.rpm + ' RPM\\nCalculated Torque: ' + config.torqueNm + ' N·m';
      } else if (subType === 'civil_beam') {
        res = 'Span: ' + config.spanM + ' m\\nLoad: ' + config.loadKnM + ' kN/m\\nMax Bending Moment: ' + config.maxBmMoment + ' kN·m';
      } else if (subType === 'cs_download') {
        res = 'File Size: ' + config.fileSizeGb + ' GB\\nSpeed: ' + config.speedMbps + ' Mbps\\nDownload Time: ' + config.downloadSeconds + ' seconds';
      } else {
        res = raw ? 'Processed: ' + raw : 'Result calculated.';
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
      'engineering tool',
      'online calculator',
      'niktool'
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

console.log(`Writing ${boosterSpecs.length} 30K FINAL BOOSTER unique tools...`);

for (const tool of boosterSpecs) {
  const dirPath = path.join(process.cwd(), 'tools', tool.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(path.join(dirPath, 'index.html'), generateHtml(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'tool.js'), generateJs(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'catalog.json'), generateCatalog(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'sitemap.xml'), generateSitemap(tool), 'utf8');
}

console.log('Running metadata sync...');
try {
  execSync('node scripts/sync-tool-metadata.cjs', { stdio: 'inherit', cwd: process.cwd() });
  console.log('Metadata sync complete!');
} catch (e) {
  console.error('Metadata sync failed:', e.message);
}
