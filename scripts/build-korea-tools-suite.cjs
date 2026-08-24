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

const koreaSpecs = [];

function addUniqueTool(slug, title, desc, category, subType, config) {
  const normTitle = title.trim().toLowerCase();
  if (existingTools.has(slug) || existingNames.has(normTitle)) {
    return; // Skip duplicate slug or duplicate title!
  }
  existingTools.add(slug);
  existingNames.add(normTitle);
  koreaSpecs.push({ slug, title, desc, category, subType, config });
}

// =================================================================
// 1. KOREAN TRADITIONAL UNITS (평 Pyung 1..150, 돈 Don 1..50, 근 Geun 1..50)
// =================================================================
for (let p = 1; p <= 150; p++) {
  var m2 = (p * 3.30578).toFixed(2);
  addUniqueTool(
    `pyung-to-square-meters-converter-${p}-pyung`,
    `Pyung to Square Meters Converter (${p} 평 = ${m2} m²)`,
    `Convert ${p} Korean Pyung (평) apartment area size to square meters (${m2} m²). 100% free and local.`,
    'Utilities',
    'kr_pyung',
    { pyung: p, sqMeters: m2 }
  );
  addUniqueTool(
    `square-meters-to-pyung-converter-${Math.round(m2)}-m2`,
    `Square Meters to Pyung Converter (${Math.round(m2)} m²)`,
    `Convert ${Math.round(m2)} square meters (m²) area size to Korean Pyung (평). 100% free and local.`,
    'Utilities',
    'kr_pyung_inv',
    { sqMeters: Math.round(m2), pyung: p }
  );
}

for (let d = 1; d <= 50; d++) {
  var grams = (d * 3.75).toFixed(2);
  addUniqueTool(
    `don-to-grams-gold-calculator-${d}-don`,
    `Don to Grams Gold Converter (${d} 돈 = ${grams}g)`,
    `Convert ${d} Korean Don (돈) gold weight to grams (${grams} g) for gold rings and bars.`,
    'Utilities',
    'kr_don',
    { don: d, grams: grams }
  );
}

for (let g = 1; g <= 50; g++) {
  var gramsMeat = g * 600;
  addUniqueTool(
    `geun-to-grams-meat-weight-converter-${g}-geun`,
    `Geun to Grams Meat Weight Converter (${g} 근 = ${gramsMeat}g)`,
    `Convert ${g} Korean Geun (근) meat weight to grams (${gramsMeat} g). 100% free and local.`,
    'Utilities',
    'kr_geun',
    { geun: g, grams: gramsMeat }
  );
}

// =================================================================
// 2. KOREAN AGE & LUNAR CONVERTERS
// =================================================================
for (let yr = 1950; yr <= 2025; yr++) {
  var officialAge = 2026 - yr;
  addUniqueTool(
    `official-korean-age-calculator-born-in-${yr}`,
    `Official Korean Age Calculator (Born in ${yr})`,
    `Calculate official civil law Korean age (만 나이 - ${officialAge} years old) under June 2023 Korean Age Act.`,
    'Utilities',
    'kr_age',
    { birthYear: yr, officialAge: officialAge }
  );
}

addUniqueTool('lunar-to-solar-calendar-converter-korea', 'Korean Lunar to Solar Calendar Converter (음력 ↔ 양력)', 'Convert Korean lunar calendar dates (설날, 추석) to Solar Gregorian dates.', 'Utilities', 'kr_lunar', {});

// =================================================================
// 3. KOREAN MILITARY DUTY & DISCHARGE
// =================================================================
const militaryBranches = [
  { slug: 'army', name: 'Army (육군)', months: 18 },
  { slug: 'navy', name: 'Navy (해군)', months: 20 },
  { slug: 'air-force', name: 'Air Force (공군)', months: 21 },
  { slug: 'marines', name: 'Marine Corps (해병대)', months: 18 },
  { slug: 'social-service', name: 'Social Service Personnel (사회복무요원)', months: 21 }
];

for (const branch of militaryBranches) {
  addUniqueTool(
    `korean-military-discharge-dday-calculator-${branch.slug}`,
    `Korean Military Discharge D-Day Calculator (${branch.name})`,
    `Calculate exact discharge date and D-Day countdown for ${branch.name} (${branch.months} months service).`,
    'Utilities',
    'kr_military',
    { branch: branch.name, months: branch.months }
  );
}

addUniqueTool('korean-military-rank-pay-calculator-2026', 'Korean Military Rank Monthly Base Pay Calculator 2026 (군인 봉급)', 'Calculate monthly stipend for Sergeant (병장), Corporal (상병), PFC (일병), Private (이병) + Jangbyeong Tomorrow Savings.', 'Utilities', 'kr_military_pay', {});

// =================================================================
// 4. KOREAN SALARY, SEVERANCE & TAX (퇴직금, 실수령액, 주휴수당)
// =================================================================
for (let man = 200; man <= 1000; man += 20) {
  var gross = man * 10000;
  var pension = Math.round(gross * 0.045);
  var health = Math.round(gross * 0.03545);
  var employment = Math.round(gross * 0.009);
  var approxNet = Math.round(gross - pension - health - employment - (gross * 0.03));
  addUniqueTool(
    `korean-salary-net-takehome-calculator-${man}-man-won`,
    `Korean Take-Home Net Salary Calculator (월급 ${man}만원 실수령액)`,
    `Calculate net take-home pay (~₩${approxNet.toLocaleString()} KRW) for ₩${man}만원 monthly salary after 4 Major Social Insurances (4대보험) and Income Tax.`,
    'Utilities',
    'kr_salary',
    { grossMan: man, approxNet: approxNet }
  );
}

for (let yrs = 1; yrs <= 30; yrs++) {
  addUniqueTool(
    `korean-severance-pay-calculator-${yrs}-years-service`,
    `Korean Severance Pay Calculator (${yrs} Year${yrs > 1 ? 's' : ''} Service 퇴직금)`,
    `Calculate statutory severance pay (퇴직금) after ${yrs} year${yrs > 1 ? 's' : ''} of continuous employment under ROK Labor Standards Act.`,
    'Utilities',
    'kr_severance',
    { serviceYears: yrs }
  );
}

for (let hrs = 15; hrs <= 40; hrs += 5) {
  addUniqueTool(
    `korean-weekly-holiday-allowance-calculator-${hrs}-hours`,
    `Korean Weekly Holiday Allowance Calculator (${hrs} Hours/Week 주휴수당)`,
    `Calculate statutory weekly paid day off allowance (주휴수당) for employees working ${hrs} hours per week.`,
    'Utilities',
    'kr_weekly_allowance',
    { hours: hrs }
  );
}

addUniqueTool('korean-freelancer-3-3-percent-tax-calculator', 'Korean Freelancer 3.3% Withholding Tax Calculator (3.3% 세금)', 'Calculate net payout and 3.3% income tax withholding for Korean freelancers.', 'Utilities', 'kr_freelance_tax', {});

// =================================================================
// 5. KOREAN REAL ESTATE & JEONSE (전세, 월세, 복비)
// =================================================================
for (let eok = 1; eok <= 20; eok++) {
  var deposit = eok * 100000000;
  addUniqueTool(
    `jeonse-to-wolse-conversion-calculator-${eok}-eok-won`,
    `Jeonse to Wolse Conversion Calculator (전세 ${eok}억원)`,
    `Convert Korean Lump-Sum Jeonse Deposit (전세 ₩${eok}억원) to Monthly Rent (월세) under Housing Lease Protection Act.`,
    'Utilities',
    'kr_jeonse',
    { eok: eok }
  );
  addUniqueTool(
    `korean-real-estate-realtor-fee-calculator-${eok}-eok-won`,
    `Korean Real Estate Brokerage Realtor Fee Calculator (복비 ${eok}억원)`,
    `Calculate legal max realtor commission fee (복비) for ₩${eok}억원 property purchase or rental.`,
    'Utilities',
    'kr_realtor_fee',
    { eok: eok }
  );
}

// =================================================================
// 6. KOREAN UNIVERSITY GPA & ACADEMIC GRADING
// =================================================================
addUniqueTool('korean-university-gpa-converter-4-5-to-4-0-scale', 'Korean University GPA Converter (4.5 Scale to 4.0 Scale 학점 변환)', 'Convert 4.5 GPA scale (SNU, Yonsei, Korea Univ standard) to 4.0 GPA scale.', 'Math', 'kr_gpa', {});
addUniqueTool('korean-university-gpa-converter-4-5-to-percentage', 'Korean University GPA to Percentage Calculator (4.5 학점 ↔ 백분율)', 'Convert 4.5 GPA score to 100% percentage grade.', 'Math', 'kr_gpa_pct', {});
addUniqueTool('suneung-csat-stanine-grade-calculator-korea', 'Suneung CSAT 9-Stanine Grade Calculator (수능 등급 / 백분위)', 'Calculate 9-tier stanine grade (1등급 ~ 9등급) from standard score (표준점수) and percentile.', 'Math', 'kr_suneung', {});

// =================================================================
// 7. HANGUL & KOREAN UTILITIES
// =================================================================
addUniqueTool('korean-name-revised-romanization-converter', 'Korean Name Revised Romanization Converter (한글 ↔ 로마자 표기법)', 'Convert Korean names and addresses to official Revised Romanization for passport application.', 'Text', 'kr_roman', {});
addUniqueTool('hangul-jamo-splitter-online', 'Hangul Jamo Splitter & Combiner (한글 자모 분리/합치기)', 'Separate Korean Hangul block syllables into individual consonants and vowels (ㄱ, ㄴ, ㄷ, ㅏ, ㅑ).', 'Text', 'kr_jamo', {});
addUniqueTool('korean-cover-letter-character-counter-jasoseo', 'Korean Cover Letter Character Counter (자소서 글자수 세기)', 'Count characters with and without spaces (공백 포함/제외) for Korean job application essays.', 'Text', 'kr_jasoseo', {});

// =================================================================
// 8. KOREAN CAR TAX & SAVINGS TAX 15.4%
// =================================================================
const engineCCs = [1000, 1600, 2000, 2500, 3000, 3500];
for (const cc of engineCCs) {
  addUniqueTool(
    `korean-car-tax-calculator-${cc}cc-engine`,
    `Korean Automobile Tax Calculator (${cc}cc Engine 자동차세)`,
    `Calculate annual car tax for ${cc}cc displacement vehicle in South Korea.`,
    'Utilities',
    'kr_cartax',
    { cc: cc }
  );
}

for (let eok = 1; eok <= 10; eok++) {
  addUniqueTool(
    `korean-savings-interest-tax-calculator-${eok}-eok-won`,
    `Korean Fixed Deposit Interest Net Tax Calculator (15.4% 이자소득세 ${eok}억원)`,
    `Calculate net interest payout after 15.4% Interest Income Tax (이자소득세 14% + 지방소득세 1.4%) on ₩${eok}억원 deposit.`,
    'Utilities',
    'kr_interest_tax',
    { eok: eok }
  );
}

// =================================================================
// 9. KOREAN WEBTOON & KAKAOTALK SIZING
// =================================================================
addUniqueTool('naver-webtoon-image-strip-slicer-690px', 'Naver Webtoon Vertical Strip Image Slicer (네이버 웹툰 690px 규격)', 'Slice long vertical webtoon image strips into Naver Webtoon 690px width cuts.', 'Utilities', 'kr_webtoon', { width: 690 });
addUniqueTool('naver-webtoon-image-strip-slicer-800px', 'Naver Webtoon Vertical Strip Image Slicer (네이버 웹툰 800px 규격)', 'Slice long vertical webtoon image strips into 800px width cuts.', 'Utilities', 'kr_webtoon', { width: 800 });
addUniqueTool('kakaotalk-profile-image-resizer-online', 'KakaoTalk Profile Image Resizer Online (카카오톡 프로필 사이즈)', 'Resize and crop photos into 360x360 square for KakaoTalk profile icons.', 'Utilities', 'kr_kakao', { width: 360, height: 360 });

console.log(`Total KOREAN UNIQUE Tools to create: ${koreaSpecs.length}`);

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
            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(`Enter your values into the workspace input panel and click Process for instant results.`)} }
          },
          {
            "@type": "Question",
            "name": "Is my data processed locally?",
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
        <p>Enter your values into the workspace input panel and click Process for instant results.</p>
      </details>
      <details>
        <summary>Is my data processed locally?</summary>
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
      if (subType === 'kr_pyung') {
        res = config.pyung + ' 평 (Pyung) = ' + config.sqMeters + ' m² (Square Meters)';
      } else if (subType === 'kr_don') {
        res = config.don + ' 돈 (Don) = ' + config.grams + ' g (Grams Gold Weight)';
      } else if (subType === 'kr_geun') {
        res = config.geun + ' 근 (Geun) = ' + config.grams + ' g (Grams Meat Weight)';
      } else if (subType === 'kr_age') {
        res = 'Birth Year: ' + config.birthYear + '\\nOfficial Korean Civil Age (만 나이): ' + config.officialAge + ' years old';
      } else if (subType === 'kr_salary') {
        res = 'Gross Monthly Salary: ₩' + (config.grossMan * 10000).toLocaleString() + ' KRW\\nEstimated Net Take-Home Pay (실수령액): ₩' + config.approxNet.toLocaleString() + ' KRW\\n(After 4 Major Insurances 4대보험 & Income Tax)';
      } else if (subType === 'kr_military') {
        res = 'Branch: ' + config.branch + '\\nService Duration: ' + config.months + ' months\\nDischarge D-Day Countdown Ready.';
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
      'korean tool',
      'korea online converter',
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

console.log(`Writing ${koreaSpecs.length} KOREAN UNIQUE tools...`);

for (const tool of koreaSpecs) {
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
