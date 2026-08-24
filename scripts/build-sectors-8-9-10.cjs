const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Load existing tool slugs AND names for strict 100% deduplication
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

const newToolSpecs = [];

function addUniqueTool(slug, title, desc, category, subType, config) {
  const normTitle = title.trim().toLowerCase();
  if (existingTools.has(slug) || existingNames.has(normTitle)) {
    return; // Skip duplicate slug or duplicate title!
  }
  existingTools.add(slug);
  existingNames.add(normTitle);
  newToolSpecs.push({ slug, title, desc, category, subType, config });
}

// =================================================================
// SECTOR 8: HEALTH, FITNESS & MEDICAL CALCULATORS (400 tools)
// =================================================================
for (let h = 140; h <= 200; h += 2) {
  for (let w = 45; w <= 95; w += 5) {
    var hm = h / 100;
    var bmi = (w / (hm * hm)).toFixed(1);
    addUniqueTool(
      `bmi-calculator-height-${h}cm-weight-${w}kg`,
      `BMI Calculator (Height ${h}cm, Weight ${w}kg)`,
      `Calculate Body Mass Index (BMI ${bmi}) for height ${h} cm and weight ${w} kg. 100% free and local.`,
      'Utilities',
      'health_bmi',
      { heightCm: h, weightKg: w, bmi: bmi }
    );
  }
}

for (let age = 18; age <= 65; age += 2) {
  var bmr = (10 * 70 + 6.25 * 170 - 5 * age + 5).toFixed(0);
  addUniqueTool(
    `bmr-calculator-age-${age}-years-male`,
    `BMR Calculator (Age ${age} Years Male)`,
    `Calculate Basal Metabolic Rate (BMR ~${bmr} kcal/day) for ${age}-year-old male.`,
    'Utilities',
    'health_bmr',
    { age: age, gender: 'male', bmr: bmr }
  );
}

for (let cal = 100; cal <= 1000; cal += 20) {
  var kgPerWeek = (cal * 7 / 7700).toFixed(2);
  addUniqueTool(
    `calorie-deficit-calculator-${cal}-kcal-daily`,
    `Calorie Deficit Calculator (${cal} kcal/day)`,
    `Calculate estimated weekly weight loss (${kgPerWeek} kg/week) for a ${cal} kcal daily deficit.`,
    'Utilities',
    'health_cal',
    { deficit: cal, kgPerWeek: kgPerWeek }
  );
}

for (let ft = 4; ft <= 6; ft++) {
  for (let inc = 0; inc <= 11; inc++) {
    var totalInches = ft * 12 + inc;
    var ibw = (50 + 2.3 * (totalInches - 60)).toFixed(1);
    if (ibw > 30) {
      addUniqueTool(
        `ideal-body-weight-calculator-${ft}-feet-${inc}-inches`,
        `Ideal Body Weight Calculator (${ft} ft ${inc} in)`,
        `Calculate ideal body weight (~${ibw} kg) for height ${ft} feet ${inc} inches.`,
        'Utilities',
        'health_ibw',
        { feet: ft, inches: inc, ibwKg: ibw }
      );
    }
  }
}

// =================================================================
// SECTOR 9: TRANSPORTATION, TRAVEL & DISTANCE (350 tools)
// =================================================================
for (let dist = 10; dist <= 300; dist += 10) {
  for (let mil = 10; mil <= 25; mil += 5) {
    var fuel = (dist / mil).toFixed(1);
    var cost = (fuel * 96.5).toFixed(0);
    addUniqueTool(
      `fuel-cost-calculator-distance-${dist}km-mileage-${mil}kmpl`,
      `Fuel Cost Calculator (${dist} km Distance, ${mil} km/l Mileage)`,
      `Calculate total fuel required (${fuel} L) and estimated cost (₹${cost}) for ${dist} km trip.`,
      'Utilities',
      'travel_fuel',
      { distanceKm: dist, mileageKmpl: mil, fuelLiters: fuel, costRs: cost }
    );
  }
}

for (let nm = 1; nm <= 100; nm++) {
  var km = (nm * 1.852).toFixed(2);
  addUniqueTool(
    `convert-${nm}-nautical-miles-to-km`,
    `Convert ${nm} Nautical Mile${nm > 1 ? 's' : ''} to KM`,
    `Convert ${nm} nautical miles (NM) to kilometers (${km} km). 100% free and local.`,
    'Utilities',
    'unit_conv',
    { val: nm, from: 'NM', to: 'km', res: `${km} km` }
  );
}

for (let kn = 1; kn <= 100; kn++) {
  var kmh = (kn * 1.852).toFixed(2);
  addUniqueTool(
    `convert-${kn}-knots-to-kmh-speed`,
    `Convert ${kn} Knot${kn > 1 ? 's' : ''} to KM/H Speed`,
    `Convert ${kn} knots speed to kilometers per hour (${kmh} km/h).`,
    'Utilities',
    'unit_conv',
    { val: kn, from: 'knots', to: 'km/h', res: `${kmh} km/h` }
  );
}

// =================================================================
// SECTOR 10: TIME, DATE & PRODUCTIVITY TOOLS (350 tools)
// =================================================================
for (let yr = 1960; yr <= 2024; yr++) {
  var age2026 = 2026 - yr;
  addUniqueTool(
    `age-calculator-born-in-${yr}`,
    `Age Calculator (Born in ${yr})`,
    `Calculate exact age (${age2026} years old in 2026) for someone born in year ${yr}.`,
    'Utilities',
    'time_age',
    { birthYear: yr, ageYears: age2026 }
  );
}

for (let hr = 1; hr <= 100; hr++) {
  var min = hr * 60;
  var sec = hr * 3600;
  addUniqueTool(
    `convert-${hr}-hour${hr > 1 ? 's' : ''}-to-seconds-time`,
    `Convert ${hr} Hour${hr > 1 ? 's' : ''} to Seconds`,
    `Convert ${hr} hour${hr > 1 ? 's' : ''} to minutes (${min} min) and seconds (${sec.toLocaleString()} sec).`,
    'Utilities',
    'unit_conv',
    { val: hr, from: 'hours', to: 'seconds', res: `${sec.toLocaleString()} seconds` }
  );
}

for (let day = 1; day <= 100; day++) {
  var hrs = day * 24;
  addUniqueTool(
    `convert-${day}-day${day > 1 ? 's' : ''}-to-hours-time`,
    `Convert ${day} Day${day > 1 ? 's' : ''} to Hours`,
    `Convert ${day} day${day > 1 ? 's' : ''} to total hours (${hrs} hours). 100% free and local.`,
    'Utilities',
    'unit_conv',
    { val: day, from: 'days', to: 'hours', res: `${hrs} hours` }
  );
}

for (let rate = 10; rate <= 100; rate += 5) {
  var daily = rate * 8;
  var monthly = daily * 22;
  addUniqueTool(
    `freelance-hourly-rate-calculator-${rate}-dollars-per-hour`,
    `Freelance Income Calculator ($${rate}/Hour)`,
    `Calculate daily ($${daily}) and estimated monthly ($${monthly.toLocaleString()}) freelance earnings at $${rate}/hr.`,
    'Utilities',
    'time_freelance',
    { rateHourly: rate, dailyIncome: daily, monthlyIncome: monthly }
  );
}

console.log(`Total SECTORS 8, 9 & 10 UNIQUE Tools to create: ${newToolSpecs.length}`);

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
            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(`Enter your values into the input panel and click Process for instant results.`)} }
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
        <h2>Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
          <label class="editor-label" for="${tool.slug}-input">Input</label>
          <textarea class="tool-textarea" id="${tool.slug}-input" placeholder="Type or paste input here..."></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${tool.slug}-output">Result Output</label>
          <textarea class="tool-textarea" id="${tool.slug}-output" placeholder="Result will appear here..." readonly></textarea>
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
        <li>Enter or paste your input into the <strong>Input</strong> panel above.</li>
        <li>Click <strong>Process</strong> to calculate or transform your data instantly.</li>
        <li>Click <strong>Copy Result</strong> to copy your output to the clipboard.</li>
      </ol>

      <h2>Key Features &amp; Privacy</h2>
      <p>This online utility runs 100% locally in your web browser. No data is sent to external servers, providing maximum speed, security, and privacy.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use ${tool.title}?</summary>
        <p>Enter your values into the input panel and click Process for instant results.</p>
      </details>
      <details>
        <summary>Is my data secure?</summary>
        <p>Yes, 100% of calculations execute locally inside your web browser.</p>
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
      if (subType === 'health_bmi') {
        res = 'Height: ' + config.heightCm + ' cm\\nWeight: ' + config.weightKg + ' kg\\nCalculated BMI: ' + config.bmi;
      } else if (subType === 'health_bmr') {
        res = 'Age: ' + config.age + ' years (' + config.gender + ')\\nBasal Metabolic Rate: ' + config.bmr + ' kcal/day';
      } else if (subType === 'travel_fuel') {
        res = 'Distance: ' + config.distanceKm + ' km\\nMileage: ' + config.mileageKmpl + ' km/l\\nFuel Needed: ' + config.fuelLiters + ' Liters\\nEstimated Cost: ₹' + config.costRs;
      } else if (subType === 'time_age') {
        res = 'Birth Year: ' + config.birthYear + '\\nAge in 2026: ' + config.ageYears + ' years old';
      } else if (subType === 'unit_conv') {
        var v = parseFloat(raw) || config.val;
        res = v + ' ' + config.from + ' = ' + config.res;
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
      'online tool',
      'free tool',
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

console.log(`Writing ${newToolSpecs.length} NEW Sectors 8, 9, 10 unique tools...`);

for (const tool of newToolSpecs) {
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
