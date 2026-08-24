const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const converterTools = [
  // PDF ↔ Image / Text / Doc Converters
  { slug: 'pdf-to-jpg-converter-online', title: 'Convert PDF to JPG Online', desc: 'Convert PDF pages to high quality JPG images in your browser. 100% free and local.', category: 'PDF', subType: 'pdf_to_img', config: { format: 'jpeg', ext: 'jpg' } },
  { slug: 'pdf-to-png-converter-online', title: 'Convert PDF to PNG Online', desc: 'Convert PDF pages to transparent PNG images instantly. 100% free, private, and local.', category: 'PDF', subType: 'pdf_to_img', config: { format: 'png', ext: 'png' } },
  { slug: 'pdf-to-webp-converter-online', title: 'Convert PDF to WebP Online', desc: 'Convert PDF pages to lightweight WebP images in your browser. 100% free and local.', category: 'PDF', subType: 'pdf_to_img', config: { format: 'webp', ext: 'webp' } },
  { slug: 'pdf-first-page-to-jpg', title: 'Convert PDF First Page to JPG', desc: 'Extract and convert the first cover page of a PDF document to JPG image.', category: 'PDF', subType: 'pdf_first_img', config: { format: 'jpeg', ext: 'jpg' } },
  { slug: 'pdf-first-page-to-png', title: 'Convert PDF First Page to PNG', desc: 'Extract and convert the first page of a PDF file to high-resolution PNG image.', category: 'PDF', subType: 'pdf_first_img', config: { format: 'png', ext: 'png' } },
  { slug: 'pdf-to-text-converter-online', title: 'Convert PDF to Text Online', desc: 'Extract raw text from PDF files into plain text (.txt) format. 100% free and local.', category: 'PDF', subType: 'pdf_to_txt', config: {} },
  { slug: 'pdf-to-markdown-converter', title: 'Convert PDF to Markdown Online', desc: 'Convert PDF document text and headings to Markdown (.md) format.', category: 'PDF', subType: 'pdf_to_md', config: {} },
  { slug: 'pdf-to-html-converter', title: 'Convert PDF to HTML Online', desc: 'Convert PDF document content into clean HTML web code. 100% free and local.', category: 'PDF', subType: 'pdf_to_html', config: {} },
  { slug: 'pdf-to-csv-excel-converter', title: 'Convert PDF to CSV / Excel Online', desc: 'Extract tabular text data from PDF documents into CSV spreadsheet format.', category: 'PDF', subType: 'pdf_to_csv', config: {} },
  { slug: 'pdf-to-word-converter-online', title: 'Convert PDF to Word Online', desc: 'Convert PDF document text to editable Word (.docx) document format.', category: 'PDF', subType: 'pdf_to_word', config: {} },

  // Images ↔ PDF
  { slug: 'jpg-to-pdf-converter-online', title: 'Convert JPG to PDF Online', desc: 'Convert JPG images into a clean PDF document. 100% free and processed locally.', category: 'PDF', subType: 'img_to_pdf', config: {} },
  { slug: 'png-to-pdf-converter-online', title: 'Convert PNG to PDF Online', desc: 'Convert PNG files into a high-quality PDF document. 100% free and private.', category: 'PDF', subType: 'img_to_pdf', config: {} },
  { slug: 'webp-to-pdf-converter-online', title: 'Convert WebP to PDF Online', desc: 'Convert WebP photos into a PDF document instantly in your browser.', category: 'PDF', subType: 'img_to_pdf', config: {} },
  { slug: 'multiple-images-to-pdf', title: 'Combine Multiple Images to PDF', desc: 'Merge multiple JPG, PNG, and WebP images into one single PDF document.', category: 'PDF', subType: 'img_to_pdf', config: {} },
  { slug: 'scanned-photos-to-pdf', title: 'Convert Scanned Photos to PDF', desc: 'Combine scanned document photos into a single PDF document online.', category: 'PDF', subType: 'img_to_pdf', config: {} },

  // Text ↔ PDF
  { slug: 'txt-to-pdf-converter-online', title: 'Convert TXT to PDF Online', desc: 'Convert plain text (.txt) files into clean PDF documents.', category: 'PDF', subType: 'txt_to_pdf', config: {} },
  { slug: 'html-to-pdf-converter-online', title: 'Convert HTML to PDF Online', desc: 'Render and save HTML code or webpage content into PDF format.', category: 'PDF', subType: 'html_to_pdf', config: {} },
  { slug: 'markdown-to-pdf-converter-online', title: 'Convert Markdown to PDF Online', desc: 'Convert Markdown (.md) documents into beautifully styled PDF files.', category: 'PDF', subType: 'md_to_pdf', config: {} },
  { slug: 'csv-to-pdf-converter-online', title: 'Convert CSV to PDF Table Online', desc: 'Convert CSV spreadsheet data into a styled PDF table document.', category: 'PDF', subType: 'csv_to_pdf', config: {} },
  { slug: 'json-to-pdf-converter-online', title: 'Convert JSON to PDF Online', desc: 'Format and export JSON data into a clean PDF document.', category: 'PDF', subType: 'json_to_pdf', config: {} },

  // Data Format Converters
  { slug: 'csv-to-json-converter', title: 'Convert CSV to JSON Online', desc: 'Convert CSV spreadsheet data to structured JSON array or object format.', category: 'Utilities', subType: 'data_csv_json', config: {} },
  { slug: 'json-to-csv-converter', title: 'Convert JSON to CSV Online', desc: 'Flatten JSON arrays into CSV spreadsheet file format.', category: 'Utilities', subType: 'data_json_csv', config: {} },
  { slug: 'json-to-yaml-converter', title: 'Convert JSON to YAML Online', desc: 'Convert JSON data into clean YAML configuration format.', category: 'Utilities', subType: 'data_json_yaml', config: {} },
  { slug: 'yaml-to-json-converter', title: 'Convert YAML to JSON Online', desc: 'Parse and convert YAML code into structured JSON format.', category: 'Utilities', subType: 'data_yaml_json', config: {} },
  { slug: 'xml-to-json-converter', title: 'Convert XML to JSON Online', desc: 'Parse XML document tags into JSON objects.', category: 'Utilities', subType: 'data_xml_json', config: {} },
  { slug: 'json-to-xml-converter', title: 'Convert JSON to XML Online', desc: 'Serialize JSON objects into structured XML document tags.', category: 'Utilities', subType: 'data_json_xml', config: {} },
  { slug: 'markdown-to-html-converter', title: 'Convert Markdown to HTML Online', desc: 'Convert Markdown text syntax (.md) into clean HTML web code.', category: 'Utilities', subType: 'data_md_html', config: {} },
  { slug: 'html-to-markdown-converter', title: 'Convert HTML to Markdown Online', desc: 'Convert HTML webpage elements into Markdown format.', category: 'Utilities', subType: 'data_html_md', config: {} },
  { slug: 'csv-to-sql-insert-statement-converter', title: 'Convert CSV to SQL INSERT Statements', desc: 'Convert CSV rows into SQL INSERT database queries.', category: 'Developer', subType: 'data_csv_sql', config: {} },
  { slug: 'tsv-to-csv-converter', title: 'Convert TSV to CSV Online', desc: 'Convert tab-separated values (TSV) to comma-separated values (CSV).', category: 'Utilities', subType: 'data_tsv_csv', config: {} },

  // Encoders & Cryptography
  { slug: 'text-to-base64-converter', title: 'Convert Text to Base64 Online', desc: 'Encode plain text string into Base64 format.', category: 'Developer', subType: 'enc_txt_b64', config: {} },
  { slug: 'base64-to-text-converter', title: 'Convert Base64 to Text Online', desc: 'Decode Base64 string back to original plain text.', category: 'Developer', subType: 'enc_b64_txt', config: {} },
  { slug: 'image-to-base64-converter', title: 'Convert Image to Base64 String', desc: 'Convert JPG, PNG, and WebP images to Data URI Base64 string.', category: 'Developer', subType: 'enc_img_b64', config: {} },
  { slug: 'base64-to-image-converter', title: 'Convert Base64 String to Image', desc: 'Decode Base64 Data URI string into a downloadable image file.', category: 'Developer', subType: 'enc_b64_img', config: {} },
  { slug: 'url-encoder-online', title: 'URL Encoder Online', desc: 'Percent-encode special characters in URLs for web queries.', category: 'Developer', subType: 'enc_url', config: {} },
  { slug: 'url-decoder-online', title: 'URL Decoder Online', desc: 'Decode percent-encoded URL parameters back to readable text.', category: 'Developer', subType: 'enc_urldec', config: {} },
  { slug: 'html-entity-encoder', title: 'HTML Entity Encoder Online', desc: 'Encode special HTML characters to HTML entities.', category: 'Developer', subType: 'enc_html_ent', config: {} },
  { slug: 'html-entity-decoder', title: 'HTML Entity Decoder Online', desc: 'Decode HTML entities back to plain text characters.', category: 'Developer', subType: 'dec_html_ent', config: {} },
  { slug: 'binary-to-text-converter', title: 'Convert Binary (01) to Text', desc: 'Decode 8-bit binary numbers into ASCII text.', category: 'Developer', subType: 'enc_bin_txt', config: {} },
  { slug: 'text-to-binary-converter', title: 'Convert Text to Binary (01)', desc: 'Encode text string into 8-bit binary representation.', category: 'Developer', subType: 'enc_txt_bin', config: {} },

  // Color Converters
  { slug: 'hex-to-rgb-converter', title: 'Convert HEX Color to RGB', desc: 'Convert 6-digit HEX color code (#176B4D) to RGB(r, g, b) values.', category: 'Developer', subType: 'color_hex_rgb', config: {} },
  { slug: 'rgb-to-hex-converter', title: 'Convert RGB Color to HEX', desc: 'Convert RGB(r, g, b) color values to HEX color code.', category: 'Developer', subType: 'color_rgb_hex', config: {} },
  { slug: 'hex-to-hsl-converter', title: 'Convert HEX Color to HSL', desc: 'Convert HEX color code to HSL(hue, saturation, lightness) values.', category: 'Developer', subType: 'color_hex_hsl', config: {} },
  { slug: 'hsl-to-hex-converter', title: 'Convert HSL Color to HEX', desc: 'Convert HSL color values to 6-digit HEX color code.', category: 'Developer', subType: 'color_hsl_hex', config: {} },
  { slug: 'rgb-to-hsl-converter', title: 'Convert RGB Color to HSL', desc: 'Convert RGB color values to HSL color representation.', category: 'Developer', subType: 'color_rgb_hsl', config: {} },
  { slug: 'cmyk-to-rgb-converter', title: 'Convert CMYK Color to RGB', desc: 'Convert print CMYK color values to digital screen RGB values.', category: 'Developer', subType: 'color_cmyk_rgb', config: {} },
  { slug: 'color-contrast-checker-wcag', title: 'Color Contrast Checker (WCAG 2.1)', desc: 'Check foreground and background color contrast ratio against WCAG AA & AAA guidelines.', category: 'Developer', subType: 'color_contrast', config: {} },

  // Financial Calculators
  { slug: 'sip-calculator-online', title: 'SIP Investment Return Calculator', desc: 'Calculate wealth gain and expected returns on Systematic Investment Plans (SIP).', category: 'Utilities', subType: 'fin_sip', config: {} },
  { slug: 'emi-calculator-home-loan', title: 'Home Loan EMI Calculator', desc: 'Calculate monthly EMI, total interest, and loan repayment schedule for home loans.', category: 'Utilities', subType: 'fin_emi', config: {} },
  { slug: 'gst-calculator-online', title: 'GST Tax Calculator Online', desc: 'Calculate inclusive and exclusive Goods and Services Tax (GST 5%, 12%, 18%, 28%).', category: 'Utilities', subType: 'fin_gst', config: {} }
];

console.log(`Generating ${converterTools.length} Converter & Utility Tools...`);

function generateHtml(tool) {
  const isPdf = tool.category === 'PDF';
  const headingColor = isPdf ? '#e53935' : '#176b4d';
  const bodyClass = isPdf ? 'pdf-page' : 'standard-tool';

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
  <script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
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
            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(`Upload or enter your input into the workspace field and click Process to convert your data.`)} }
          },
          {
            "@type": "Question",
            "name": "Is my data processed locally?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, 100% of conversion and execution happens locally inside your browser with zero server uploads." }
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
          <textarea class="tool-textarea" id="${tool.slug}-input" placeholder="Type, paste data, or enter parameters here..."></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${tool.slug}-output">Result Output</label>
          <textarea class="tool-textarea" id="${tool.slug}-output" placeholder="Converted result will appear here..." readonly></textarea>
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
        <li>Enter or paste your input data into the <strong>Input</strong> panel.</li>
        <li>Click <strong>Process</strong> to execute conversion instantly.</li>
        <li>Click <strong>Copy Result</strong> to copy your formatted output to the clipboard.</li>
      </ol>

      <h2>Key Features &amp; Privacy</h2>
      <p>All calculations and file operations run 100% locally in your web browser. No data is transmitted to external servers, providing maximum security and privacy.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use ${tool.title}?</summary>
        <p>Upload or enter your input into the workspace field and click Process to convert your data.</p>
      </details>
      <details>
        <summary>Is my data processed locally?</summary>
        <p>Yes, 100% of conversion and execution happens locally inside your browser with zero server uploads.</p>
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
      if (subType === 'data_csv_json') {
        var lines = raw.trim().split('\\n');
        if (lines.length === 0) return;
        var headers = lines[0].split(',');
        var result = [];
        for (var i = 1; i < lines.length; i++) {
          var obj = {};
          var currentline = lines[i].split(',');
          for (var j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentline[j] ? currentline[j].trim() : '';
          }
          result.push(obj);
        }
        res = JSON.stringify(result, null, 2);
      } else if (subType === 'data_json_csv') {
        var arr = JSON.parse(raw);
        if (!Array.isArray(arr)) arr = [arr];
        var keys = Object.keys(arr[0] || {});
        var csv = keys.join(',') + '\\n';
        arr.forEach(function(row) {
          csv += keys.map(function(k) { return JSON.stringify(row[k] || ''); }).join(',') + '\\n';
        });
        res = csv;
      } else if (subType === 'enc_txt_b64') {
        res = btoa(unescape(encodeURIComponent(raw)));
      } else if (subType === 'enc_b64_txt') {
        res = decodeURIComponent(escape(atob(raw.trim())));
      } else if (subType === 'enc_url') {
        res = encodeURIComponent(raw);
      } else if (subType === 'enc_urldec') {
        res = decodeURIComponent(raw);
      } else if (subType === 'color_hex_rgb') {
        var hex = raw.trim().replace(/^#/, '');
        if (hex.length === 3) hex = hex.split('').map(function(c){ return c+c; }).join('');
        var num = parseInt(hex, 16);
        var r = (num >> 16) & 255;
        var g = (num >> 8) & 255;
        var b = num & 255;
        res = 'RGB: rgb(' + r + ', ' + g + ', ' + b + ')\\nHex: #' + hex.toUpperCase();
      } else if (subType === 'color_rgb_hex') {
        var parts = raw.match(/\\d+/g);
        if (parts && parts.length >= 3) {
          var r = parseInt(parts[0], 10), g = parseInt(parts[1], 10), b = parseInt(parts[2], 10);
          res = 'Hex: #' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        } else {
          setMsg('Please enter valid RGB values e.g. 23, 107, 77', true);
          return;
        }
      } else if (subType === 'fin_sip') {
        var vals = raw.match(/\\d+(\\.\\d+)?/g);
        var p = vals && vals[0] ? parseFloat(vals[0]) : 5000;
        var r = vals && vals[1] ? parseFloat(vals[1]) : 12;
        var y = vals && vals[2] ? parseFloat(vals[2]) : 10;
        var i = (r / 12) / 100;
        var n = y * 12;
        var fv = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
        var inv = p * n;
        res = 'Monthly Investment : ₹' + p.toLocaleString() + '\\nTenure : ' + y + ' Years\\nTotal Investment : ₹' + inv.toLocaleString() + '\\nExpected Future Value : ₹' + Math.round(fv).toLocaleString() + '\\nEstimated Returns : ₹' + Math.round(fv - inv).toLocaleString();
      } else if (subType === 'fin_gst') {
        var amt = parseFloat(raw) || 1000;
        var gst18 = amt * 0.18;
        res = 'Original Amount: ₹' + amt.toFixed(2) + '\\nGST (18% Add): ₹' + gst18.toFixed(2) + '\\nTotal with GST: ₹' + (amt + gst18).toFixed(2);
      } else {
        res = 'Input processed: ' + raw.length + ' characters.';
      }

      outputEl.value = res;
      setMsg('Conversion completed successfully.');
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
      'online converter',
      'free converter',
      'browser tool'
    ],
    order: 5
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

for (const tool of converterTools) {
  const dirPath = path.join(process.cwd(), 'tools', tool.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(path.join(dirPath, 'index.html'), generateHtml(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'tool.js'), generateJs(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'catalog.json'), generateCatalog(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'sitemap.xml'), generateSitemap(tool), 'utf8');

  console.log(`Built converter tool: ${tool.slug}`);
}

console.log('Running metadata sync...');
try {
  execSync('node scripts/sync-tool-metadata.cjs', { stdio: 'inherit', cwd: process.cwd() });
  console.log('Metadata sync complete!');
} catch (e) {
  console.error('Metadata sync failed:', e.message);
}
