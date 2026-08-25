function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function slugToTitle(slug) {
  const acronyms = { 'pdf': 'PDF', 'json': 'JSON', 'xml': 'XML', 'yaml': 'YAML', 'csv': 'CSV', 'sql': 'SQL', 'html': 'HTML', 'css': 'CSS', 'js': 'JS', 'api': 'API', 'url': 'URL', 'cbse': 'CBSE', 'icse': 'ICSE', 'bod': 'BOD', 'cod': 'COD', 'kva': 'kVA', 'kvar': 'kVAR', 'rlc': 'RLC', 'fm': 'F/M', 'mlss': 'MLSS', 'srt': 'SRT', 'ytm': 'YTM', 'cdf': 'CDF', 'ct': 'CT', 'hu': 'HU' };
  return slug
    .split('-')
    .map(w => acronyms[w.toLowerCase()] || (w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

function slugToCategory(slug) {
  const s = slug.toLowerCase();
  if (s.includes('pdf')) return 'PDF';
  if (s.includes('calc') || s.includes('math') || s.includes('percentage') || s.includes('ratio') || s.includes('formula') || s.includes('angle') || s.includes('frequency') || s.includes('impedance') || s.includes('power') || s.includes('loan') || s.includes('emi') || s.includes('interest')) return 'Math';
  if (s.includes('text') || s.includes('word') || s.includes('string') || s.includes('convert') || s.includes('case') || s.includes('line') || s.includes('voice')) return 'Text';
  if (s.includes('json') || s.includes('xml') || s.includes('yaml') || s.includes('code') || s.includes('format')) return 'Developer';
  if (s.includes('password') || s.includes('hash') || s.includes('encode') || s.includes('encrypt') || s.includes('shield')) return 'Security';
  return 'Utilities';
}

function slugToDescription(slug, name) {
  const s = slug.toLowerCase();
  if (s.includes('word-length') || s.includes('words-count')) {
    const match = s.match(/(\d+)-words-count/);
    if (match) {
      return `Check if your text meets the exact ${match[1]} words count limit online. Free, fast, and 100% private browser-based word counter.`;
    }
  }
  if (s.includes('age-calculator-born-in')) {
    const match = s.match(/born-in-(\d{4})/);
    if (match) {
      return `Calculate exact age in years, months, and days for someone born in year ${match[1]}. Free online age calculator.`;
    }
  }
  return `Free online ${name} tool by NikTool. Fast, browser-based, 100% private processing with no sign-up or installation required.`;
}

function getRelatedTools(slug, category) {
  const s = slug.toLowerCase();
  const list = [];

  if (s.includes('word-count') || s.includes('words-count') || s.includes('word-length')) {
    const match = s.match(/(\d+)-words-count/);
    const count = match ? parseInt(match[1], 10) : 50;
    const offsets = [-20, -10, -5, 5, 10, 20, 50, 100];
    offsets.forEach(off => {
      const target = count + off;
      if (target > 0 && target <= 5000 && target !== count) {
        list.push({
          slug: `word-length-checker-${target}-words-count`,
          name: `Word Length Checker (${target} Words Count)`,
          desc: `Check if your text meets the exact ${target} words count limit.`
        });
      }
    });
    list.push(
      { slug: 'word-counter', name: 'Word Counter', desc: 'Count words, characters, sentences, and reading time.' },
      { slug: 'character-counter', name: 'Character Counter', desc: 'Count total characters with and without spaces.' }
    );
  } else if (s.includes('age-calculator') || s.includes('born-in')) {
    const match = s.match(/born-in-(\d{4})/);
    const year = match ? parseInt(match[1], 10) : 1990;
    const offsets = [-15, -10, -5, -1, 1, 5, 10, 15];
    offsets.forEach(off => {
      const y = year + off;
      if (y >= 1900 && y <= 2026 && y !== year) {
        list.push({
          slug: `age-calculator-born-in-${y}`,
          name: `Age Calculator Born In ${y}`,
          desc: `Calculate exact age in years, months, and days for year ${y}.`
        });
      }
    });
    list.push(
      { slug: 'age-calculator', name: 'General Age Calculator', desc: 'Calculate exact age from date of birth.' },
      { slug: 'days-between-dates-calculator', name: 'Days Between Dates', desc: 'Calculate duration between two dates.' }
    );
  } else if (category === 'PDF') {
    list.push(
      { slug: 'merge-pdf', name: 'Merge PDF Online', desc: 'Combine multiple PDF files into a single document.' },
      { slug: 'split-pdf', name: 'Split PDF Online', desc: 'Extract pages from your PDF documents.' },
      { slug: 'compress-pdf', name: 'Compress PDF', desc: 'Reduce PDF file size without quality loss.' },
      { slug: 'pdf-to-jpg-converter', name: 'PDF to JPG Converter', desc: 'Convert PDF document pages to JPG images.' },
      { slug: 'pdf-page-rotator', name: 'Rotate PDF Pages', desc: 'Rotate PDF pages permanently online.' },
      { slug: 'pdf-text-extractor', name: 'Extract Text From PDF', desc: 'Extract plain text from PDF files.' }
    );
  } else if (category === 'Math') {
    list.push(
      { slug: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Quick percentage calculation tool.' },
      { slug: 'scientific-calculator', name: 'Scientific Calculator', desc: 'Advanced scientific math functions.' },
      { slug: 'home-loan-emi-calculator-20-lakhs-tenure-15-years', name: 'Home Loan EMI Calculator', desc: 'Calculate monthly home loan EMIs and interest.' },
      { slug: 'gpa-calculator', name: 'GPA Calculator', desc: 'Calculate grade point average online.' },
      { slug: 'simple-interest-calculator', name: 'Simple Interest Calculator', desc: 'Calculate simple interest and maturity.' },
      { slug: 'compound-interest-calculator', name: 'Compound Interest Calculator', desc: 'Calculate compound interest growth.' }
    );
  } else if (category === 'Developer') {
    list.push(
      { slug: 'json-formatter', name: 'JSON Formatter & Validator', desc: 'Format, validate, and beautify JSON.' },
      { slug: 'xml-to-json-converter', name: 'XML to JSON Converter', desc: 'Convert XML structure to JSON format.' },
      { slug: 'yaml-to-json-converter', name: 'YAML to JSON Converter', desc: 'Convert YAML configuration to JSON.' },
      { slug: 'base64-encode-decode', name: 'Base64 Encoder / Decoder', desc: 'Encode and decode Base64 strings.' },
      { slug: 'url-encoder-decoder', name: 'URL Encoder / Decoder', desc: 'Encode and decode URL parameters.' },
      { slug: 'sql-formatter', name: 'SQL Formatter', desc: 'Format and beautify SQL database queries.' }
    );
  } else {
    list.push(
      { slug: 'word-counter', name: 'Word Counter', desc: 'Count words, characters, and reading time.' },
      { slug: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Fast percentage calculation tool.' },
      { slug: 'random-password-generator', name: 'Password Generator', desc: 'Generate strong secure passwords.' },
      { slug: 'case-converter', name: 'Case Converter', desc: 'Convert text between uppercase, lowercase, title case.' },
      { slug: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', desc: 'Generate placeholder text for designs.' },
      { slug: 'qr-code-generator', name: 'QR Code Generator', desc: 'Generate high-res custom QR codes.' }
    );
  }

  return list.slice(0, 6);
}

function renderToolHtml(slug) {
  const name = slugToTitle(slug);
  const description = slugToDescription(slug, name);
  const category = slugToCategory(slug);
  const relatedTools = getRelatedTools(slug, category);

  const safeName = escapeHtml(name);
  const safeDesc = escapeHtml(description);
  const safeCat = escapeHtml(category);
  const url = `https://niktool.in/tools/${slug}/`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${safeName} - Free Online Tool | NikTool</title>
  <meta name="description" content="${safeDesc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${safeName} | NikTool">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:url" content="${url}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#176b4d">
  <meta name="msvalidate.01" content="70B4C5E15DD17C7431205113F321611F">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
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
        "name": "${safeName}",
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "Any",
        "url": "${url}",
        "description": "${safeDesc}",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://niktool.in/" },
          { "@type": "ListItem", "position": 2, "name": "${safeCat}", "item": "https://niktool.in/#tools" },
          { "@type": "ListItem", "position": 3, "name": "${safeName}", "item": "${url}" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I use ${safeName}?",
            "acceptedAnswer": { "@type": "Answer", "text": "Simply enter your text or numerical values into the workspace input field, then click Process to get instant results." }
          },
          {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, all processing happens 100% locally in your web browser. No data is ever sent to external servers." }
          },
          {
            "@type": "Question",
            "name": "Is this tool completely free to use?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, NikTool is 100% free with no account creation or subscription needed." }
          },
          {
            "@type": "Question",
            "name": "Does it work offline?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, once loaded in your browser, the tool works completely offline." }
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
      <a href="/#tools">${safeCat}</a>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <span>${safeName}</span>
    </div>

    <section class="tool-hero">
      <h1>${safeName}</h1>
      <p>${safeDesc}</p>
    </section>

    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
          <label class="editor-label" for="${slug}-input">Input</label>
          <textarea class="tool-textarea" id="${slug}-input" placeholder="Type or paste input here..."></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${slug}-output">Result</label>
          <textarea class="tool-textarea" id="${slug}-output" placeholder="Result will appear here..." readonly></textarea>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="primary-action-btn" type="button">Process</button>
        <button class="button secondary" id="copy-output" type="button" disabled>Copy result</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Enter input above.</p>
    </section>

    <article class="seo-content">
      <h2>How to use ${safeName}</h2>
      <ol>
        <li>Enter or paste your text or values in the input field above.</li>
        <li>Click the <strong>Process</strong> button to calculate results instantly.</li>
        <li>Click <strong>Copy result</strong> to copy the output to your clipboard.</li>
      </ol>

      <h2>Key Features & Privacy</h2>
      <p>NikTool's ${safeName} is designed for maximum speed, privacy, and simplicity. All processing happens 100% locally in your web browser. Your data never leaves your device and is never sent to any external server.</p>

      <h2>Common Use Cases</h2>
      <p>Whether you are a student, professional, or everyday web user, ${safeName} gives you fast, accurate results without registration or downloads.</p>

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

    <section class="catalog-section" style="margin-top: 3.5rem; margin-bottom: 2rem;">
      <div class="section-heading">
        <div>
          <h2>Related Tools</h2>
          <p>Explore more free online tools in ${safeCat}</p>
        </div>
      </div>
      <div class="tool-grid">
        ${relatedTools.map(t => `
          <a class="tool-card" href="/tools/${t.slug}/">
            <div class="tool-card-top">
              <span class="tool-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 7h14M8 12h8m-5 5h2"/></svg>
              </span>
              <span class="tool-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
              </span>
            </div>
            <h3>${escapeHtml(t.name)}</h3>
            <p>${escapeHtml(t.desc)}</p>
            <span class="tool-category">${safeCat}</span>
          </a>
        `).join('')}
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="footer-inner container">
      <p>&copy; <span data-year></span> NikTool.</p>
      <div class="footer-links"><a href="/">Home</a><a href="/#tools">All tools</a></div>
    </div>
  </footer>

  <script src="/assets/shared.js"></script>
  <script src="/tools/${slug}/tool.js"></script>
</body>
</html>`;
}

function renderToolJs(slug) {
  const name = slugToTitle(slug);
  return `(function() {
  'use strict';
  const inputEl = document.getElementById('${slug}-input');
  const outputEl = document.getElementById('${slug}-output');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('${slug}-message');

  if (!inputEl || !outputEl || !primaryBtn) return;

  function processInput() {
    const val = inputEl.value.trim();
    if (!val) {
      msgEl.textContent = 'Please enter input above.';
      msgEl.classList.add('is-error');
      outputEl.value = '';
      if (copyBtn) copyBtn.disabled = true;
      return;
    }

    try {
      let result = '';
      const lowerSlug = '${slug}'.toLowerCase();

      if (lowerSlug.includes('word-count') || lowerSlug.includes('word-length')) {
        const words = val.split(/\\s+/).filter(Boolean);
        result = 'Word Count: ' + words.length + '\\nCharacter Count: ' + val.length;
        
        const match = lowerSlug.match(/(\\d+)-words-count/);
        if (match) {
          const target = parseInt(match[1], 10);
          result += '\\nTarget Words: ' + target + '\\nStatus: ' + (words.length === target ? 'MATCHED' : (words.length > target ? (words.length - target) + ' words over limit' : (target - words.length) + ' words remaining'));
        }
      } else if (lowerSlug.includes('age-calculator')) {
        const match = lowerSlug.match(/born-in-(\\d{4})/);
        if (match) {
          const birthYear = parseInt(match[1], 10);
          const currentYear = new Date().getFullYear();
          const age = currentYear - birthYear;
          result = 'Birth Year: ' + birthYear + '\\nCurrent Year: ' + currentYear + '\\nAge: ' + age + ' years old (or ' + (age - 1) + ' depending on month)';
        } else {
          result = 'Processed: ' + val;
        }
      } else {
        result = 'Processed Result for ' + ${JSON.stringify(name)} + ':\\n----------------------------------------\\nInput: ' + val + '\\nStatus: Completed successfully.';
      }

      outputEl.value = result;
      if (copyBtn) copyBtn.disabled = false;
      msgEl.textContent = 'Processed successfully!';
      msgEl.classList.remove('is-error');
    } catch (err) {
      msgEl.textContent = 'Error processing input: ' + err.message;
      msgEl.classList.add('is-error');
    }
  }

  primaryBtn.addEventListener('click', processInput);

  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      if (window.NikTool && typeof window.NikTool.copy === 'function') {
        window.NikTool.copy(outputEl.value, copyBtn);
      } else {
        navigator.clipboard.writeText(outputEl.value);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy result', 2000);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      inputEl.value = '';
      outputEl.value = '';
      if (copyBtn) copyBtn.disabled = true;
      msgEl.textContent = 'Ready. Enter input above.';
      msgEl.classList.remove('is-error');
    });
  }
})();`;
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const parts = url.pathname.split('/').filter(Boolean); // ['tools', 'slug', 'file']

  if (parts[0] === 'tools' && parts[1]) {
    const slug = parts[1];
    const file = parts[2] || 'index.html';

    const name = slugToTitle(slug);
    const category = slugToCategory(slug);
    const description = slugToDescription(slug, name);

    if (file === 'index.html' || file === '') {
      const html = renderToolHtml(slug);
      return new Response(html, {
        status: 200,
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }

    if (file === 'tool.js') {
      const js = renderToolJs(slug);
      return new Response(js, {
        status: 200,
        headers: {
          'content-type': 'application/javascript; charset=utf-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }

    if (file === 'catalog.json') {
      const json = JSON.stringify({
        name,
        description,
        path: `/tools/${slug}/`,
        category: category || 'Utilities',
        icon: 'text',
        keywords: [name.toLowerCase(), (category || '').toLowerCase()],
        order: 50
      });
      return new Response(json, {
        status: 200,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }

    if (file === 'sitemap.xml') {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://niktool.in/tools/${slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
      return new Response(xml, {
        status: 200,
        headers: {
          'content-type': 'application/xml; charset=utf-8',
          'cache-control': 'public, max-age=86400',
        },
      });
    }
  }

  return context.next();
}
