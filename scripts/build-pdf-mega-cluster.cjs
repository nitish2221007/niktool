const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pdfToolsList = [];

// Helper to add a PDF tool spec
function addTool(slug, title, desc, mode, param, category = 'PDF') {
  pdfToolsList.push({ slug, title, desc, mode, param, category });
}

// -------------------------------------------------------------
// 1. PAGE REMOVAL TOOLS (1..10 first/last, ranges, Nth)
// -------------------------------------------------------------
for (let i = 1; i <= 10; i++) {
  addTool(
    `remove-first-${i}-pages-from-pdf`,
    `Remove First ${i} Page${i > 1 ? 's' : ''} From PDF`,
    `Remove the first ${i} page${i > 1 ? 's' : ''} of any PDF file instantly in your browser. 100% free, private, and secure with local processing.`,
    'remove_first_n',
    i
  );
  addTool(
    `remove-last-${i}-pages-from-pdf`,
    `Remove Last ${i} Page${i > 1 ? 's' : ''} From PDF`,
    `Remove the last ${i} page${i > 1 ? 's' : ''} of any PDF file instantly in your browser. 100% free, private, and secure with local processing.`,
    'remove_last_n',
    i
  );
}

for (let i = 1; i <= 10; i++) {
  addTool(
    `remove-page-${i}-from-pdf`,
    `Remove Page ${i} From PDF`,
    `Remove specific page ${i} from any PDF document. 100% free, private, and browser-processed with no server upload.`,
    'remove_specific_page',
    i
  );
}

addTool('remove-pages-1-to-5-from-pdf', 'Remove Pages 1 to 5 From PDF', 'Delete pages 1 through 5 from any PDF file instantly in your browser.', 'remove_range', [1, 5]);
addTool('remove-pages-1-to-10-from-pdf', 'Remove Pages 1 to 10 From PDF', 'Delete pages 1 through 10 from any PDF file instantly in your browser.', 'remove_range', [1, 10]);
addTool('remove-pages-5-to-10-from-pdf', 'Remove Pages 5 to 10 From PDF', 'Delete pages 5 through 10 from any PDF file instantly in your browser.', 'remove_range', [5, 10]);
addTool('remove-pages-10-to-20-from-pdf', 'Remove Pages 10 to 20 From PDF', 'Delete pages 10 through 20 from any PDF file instantly in your browser.', 'remove_range', [10, 20]);

addTool('remove-cover-page-from-pdf', 'Remove Cover Page From PDF', 'Delete the cover page or title sheet of any PDF file instantly.', 'remove_first_n', 1);
addTool('remove-title-page-from-pdf', 'Remove Title Page From PDF', 'Remove title page and introductory pages from your PDF file.', 'remove_first_n', 1);
addTool('remove-disclaimer-page-from-pdf', 'Remove Disclaimer Page From PDF', 'Remove disclaimer or legal disclaimer pages from PDF documents.', 'remove_first_n', 1);
addTool('remove-front-and-back-cover-from-pdf', 'Remove Front & Back Cover From PDF', 'Remove both the front cover page and back cover page from any PDF file.', 'remove_front_and_back', null);

for (let n = 2; n <= 5; n++) {
  addTool(
    `remove-every-${n}nd-page-from-pdf`,
    `Remove Every ${n}${n===2?'nd':n===3?'rd':'th'} Page From PDF`,
    `Delete every ${n}${n===2?'nd':n===3?'rd':'th'} page from any PDF document automatically. 100% free and local.`,
    'remove_every_nth',
    n
  );
}

// -------------------------------------------------------------
// 2. PAGE EXTRACTION TOOLS (1..10 first/last, ranges)
// -------------------------------------------------------------
for (let i = 1; i <= 10; i++) {
  addTool(
    `extract-first-${i}-pages-from-pdf`,
    `Extract First ${i} Page${i > 1 ? 's' : ''} From PDF`,
    `Extract only the first ${i} page${i > 1 ? 's' : ''} of a PDF file into a clean new document. 100% free and private.`,
    'extract_first_n',
    i
  );
  addTool(
    `extract-last-${i}-pages-from-pdf`,
    `Extract Last ${i} Page${i > 1 ? 's' : ''} From PDF`,
    `Extract only the last ${i} page${i > 1 ? 's' : ''} of a PDF file into a clean new document. 100% free and private.`,
    'extract_last_n',
    i
  );
}

for (let i = 1; i <= 10; i++) {
  addTool(
    `extract-page-${i}-from-pdf`,
    `Extract Page ${i} From PDF`,
    `Extract specific page ${i} from any PDF file as a single-page document. 100% free and browser-processed.`,
    'extract_specific_page',
    i
  );
}

addTool('extract-pages-1-to-5-from-pdf', 'Extract Pages 1 to 5 From PDF', 'Extract pages 1 through 5 from any PDF file into a new PDF document.', 'extract_range', [1, 5]);
addTool('extract-pages-1-to-10-from-pdf', 'Extract Pages 1 to 10 From PDF', 'Extract pages 1 through 10 from any PDF file into a new PDF document.', 'extract_range', [1, 10]);
addTool('extract-pages-5-to-10-from-pdf', 'Extract Pages 5 to 10 From PDF', 'Extract pages 5 through 10 from any PDF file into a new PDF document.', 'extract_range', [5, 10]);
addTool('extract-pages-10-to-20-from-pdf', 'Extract Pages 10 to 20 From PDF', 'Extract pages 10 through 20 from any PDF file into a new PDF document.', 'extract_range', [10, 20]);
addTool('extract-middle-pages-from-pdf', 'Extract Middle Pages From PDF', 'Extract middle body pages from any PDF file while stripping covers.', 'extract_middle', null);

// -------------------------------------------------------------
// 3. PDF SPLITTING TOOLS
// -------------------------------------------------------------
const splitN = [1, 2, 3, 4, 5, 10, 15, 20];
for (const n of splitN) {
  addTool(
    `split-pdf-every-${n}-page${n > 1 ? 's' : ''}`,
    `Split PDF Every ${n} Page${n > 1 ? 's' : ''}`,
    `Split any PDF file into separate documents every ${n} page${n > 1 ? 's' : ''}. 100% free and local processing.`,
    'split_every_n',
    n
  );
}

for (let parts = 2; parts <= 5; parts++) {
  addTool(
    `split-pdf-into-${parts}-equal-parts`,
    `Split PDF Into ${parts} Equal Parts`,
    `Split any PDF document into ${parts} equal parts or segments instantly in your browser.`,
    'split_parts',
    parts
  );
}

addTool('split-pdf-by-page-range', 'Split PDF By Page Range', 'Split any PDF document into custom page ranges instantly.', 'split_ranges', null);
addTool('split-pdf-by-even-and-odd-pages', 'Split PDF By Even and Odd Pages', 'Split a PDF file into two separate files containing even pages and odd pages.', 'split_even_odd', null);

// -------------------------------------------------------------
// 4. PDF ROTATION & REORDERING TOOLS
// -------------------------------------------------------------
addTool('rotate-pdf-90-degrees-clockwise', 'Rotate PDF 90 Degrees Clockwise', 'Rotate all pages in a PDF document 90 degrees clockwise. Free and local.', 'rotate_all', 90);
addTool('rotate-pdf-180-degrees', 'Rotate PDF 180 Degrees', 'Rotate all pages in a PDF document 180 degrees upside down. Free and local.', 'rotate_all', 180);
addTool('rotate-pdf-270-degrees', 'Rotate PDF 270 Degrees', 'Rotate all pages in a PDF document 270 degrees clockwise. Free and local.', 'rotate_all', 270);
addTool('rotate-first-page-of-pdf', 'Rotate First Page Of PDF', 'Rotate only the first page of a PDF document 90 degrees clockwise.', 'rotate_first', 90);
addTool('rotate-last-page-of-pdf', 'Rotate Last Page Of PDF', 'Rotate only the last page of a PDF document 90 degrees clockwise.', 'rotate_last', 90);
addTool('rotate-even-pages-of-pdf', 'Rotate Even Pages Of PDF', 'Rotate all even pages (2, 4, 6...) in a PDF document by 90 degrees.', 'rotate_even', 90);
addTool('rotate-odd-pages-of-pdf', 'Rotate Odd Pages Of PDF', 'Rotate all odd pages (1, 3, 5...) in a PDF document by 90 degrees.', 'rotate_odd', 90);

addTool('reverse-pdf-pages-online', 'Reverse PDF Pages Online', 'Reverse the page order of any PDF document (last page becomes first).', 'reverse_all', null);
addTool('swap-first-and-last-page-of-pdf', 'Swap First & Last Page Of PDF', 'Swap the position of the first page and last page in any PDF file.', 'swap_first_last', null);
addTool('move-first-page-to-end-of-pdf', 'Move First Page To End Of PDF', 'Move the cover page or first page to the very end of the PDF file.', 'move_first_to_end', null);
addTool('move-last-page-to-front-of-pdf', 'Move Last Page To Front Of PDF', 'Move the last page of a PDF file to the very beginning as page 1.', 'move_last_to_front', null);

// -------------------------------------------------------------
// 5. PDF DUPLICATION & MANIPULATION
// -------------------------------------------------------------
addTool('duplicate-first-page-of-pdf', 'Duplicate First Page Of PDF', 'Duplicate the first page of a PDF file and insert it as page 2.', 'duplicate_first', null);
addTool('duplicate-last-page-of-pdf', 'Duplicate Last Page Of PDF', 'Duplicate the last page of a PDF document at the end.', 'duplicate_last', null);
addTool('duplicate-all-pdf-pages', 'Duplicate All PDF Pages', 'Duplicate every page in a PDF file (1, 1, 2, 2, 3, 3...).', 'duplicate_all', null);

// -------------------------------------------------------------
// 6. MULTI-PAGE TARGETING SUITES (Ranges 1-50)
// -------------------------------------------------------------
for (let p = 11; p <= 30; p++) {
  addTool(
    `remove-page-${p}-from-pdf`,
    `Remove Page ${p} From PDF`,
    `Remove page ${p} from any PDF file instantly in your browser. 100% free and local.`,
    'remove_specific_page',
    p
  );
  addTool(
    `extract-page-${p}-from-pdf`,
    `Extract Page ${p} From PDF`,
    `Extract page ${p} from any PDF file as a single-page document. 100% free and local.`,
    'extract_specific_page',
    p
  );
}

for (let p = 11; p <= 25; p++) {
  addTool(
    `remove-first-${p}-pages-from-pdf`,
    `Remove First ${p} Pages From PDF`,
    `Remove the first ${p} pages of any PDF document. 100% free, private, and local.`,
    'remove_first_n',
    p
  );
  addTool(
    `extract-first-${p}-pages-from-pdf`,
    `Extract First ${p} Pages From PDF`,
    `Extract the first ${p} pages of any PDF document into a clean file. 100% free and local.`,
    'extract_first_n',
    p
  );
}

for (let p = 11; p <= 25; p++) {
  addTool(
    `remove-last-${p}-pages-from-pdf`,
    `Remove Last ${p} Pages From PDF`,
    `Remove the last ${p} pages of any PDF file. 100% free, private, and browser-processed.`,
    'remove_last_n',
    p
  );
  addTool(
    `extract-last-${p}-pages-from-pdf`,
    `Extract Last ${p} Pages From PDF`,
    `Extract the last ${p} pages of any PDF file into a clean file. 100% free and local.`,
    'extract_last_n',
    p
  );
}

console.log(`Generated Total PDF Tool Specs: ${pdfToolsList.length}`);

// Generate HTML Boilerplate
function generateHtml(tool) {
  const faqSchema = [
    { q: `How do I use ${tool.title}?`, a: `Select or drag your PDF file into the upload dropzone, review the page selection, and click Process & Download PDF to save your file.` },
    { q: `Is my PDF uploaded to a server?`, a: `No, 100% of PDF processing takes place locally inside your web browser using WebAssembly. Your files never touch an external server.` },
    { q: `Is ${tool.title} free?`, a: `Yes, NikTool PDF utilities are 100% free with no file size limits, subscription, or account creation.` }
  ].map(f => `          {\n            "@type": "Question",\n            "name": ${JSON.stringify(f.q)},\n            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} }\n          }`).join(',\n');

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
      color: #e53935 !important;
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
    .pdf-hero-box {
      text-align: center;
      padding: 2.5rem 1.5rem;
      border: 2px dashed #b5cdbf;
      border-radius: 24px;
      background: linear-gradient(180deg, rgba(247, 248, 244, 0.6) 0%, rgba(223, 245, 233, 0.3) 100%);
      transition: all 0.25s ease;
      cursor: pointer;
      margin-bottom: 1.5rem;
    }
    .pdf-hero-box:hover, .pdf-hero-box.dragover {
      border-color: var(--green);
      background: rgba(223, 245, 233, 0.6);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(23, 107, 77, 0.12);
    }
    .pdf-hero-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1rem;
      display: grid;
      place-items: center;
      border-radius: 18px;
      background: var(--green);
      color: white;
      box-shadow: 0 8px 20px rgba(23, 107, 77, 0.25);
    }
    .pdf-hero-icon svg { width: 32px; height: 32px; }
    .pdf-select-btn {
      min-height: 52px;
      padding: 0.8rem 2.2rem;
      font-size: 1.1rem;
      border-radius: 14px;
      background: #e53935;
      color: white;
      border: 0;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      box-shadow: 0 8px 24px rgba(229, 57, 53, 0.3);
      transition: all 0.2s ease;
    }
    .pdf-select-btn:hover {
      background: #d32f2f;
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(229, 57, 53, 0.4);
    }
    .drop-hint { margin-top: 0.85rem; color: #66736c; font-size: 0.92rem; font-weight: 500; }
    .pdf-file-details {
      display: none;
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow);
    }
    .pdf-file-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--line);
      margin-bottom: 1rem;
    }
    .pdf-file-title {
      font-family: "Manrope", sans-serif;
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--ink);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .pdf-file-badge {
      background: var(--mint);
      color: var(--green-dark);
      padding: 0.25rem 0.65rem;
      border-radius: 8px;
      font-size: 0.82rem;
      font-weight: 700;
    }
    .pdf-presets-bar { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
    .preset-btn {
      padding: 0.4rem 0.85rem;
      border: 1px solid var(--line);
      border-radius: 99px;
      background: #fafbf8;
      color: #48564f;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .preset-btn:hover { border-color: var(--green); color: var(--green-dark); background: var(--mint); }
    .preset-btn.active { background: var(--green); color: white; border-color: var(--green); }
    .pages-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
      gap: 0.75rem;
      max-height: 320px;
      overflow-y: auto;
      padding: 0.5rem;
      border: 1px solid var(--line);
      border-radius: 14px;
      background: #fcfdfa;
    }
    .page-card {
      position: relative;
      border: 2px solid var(--line);
      border-radius: 12px;
      padding: 0.85rem 0.5rem;
      text-align: center;
      background: white;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    }
    .page-card:hover { border-color: var(--green); }
    .page-card.removed { border-color: #e53935; background: #fdeded; opacity: 0.75; }
    .page-card.removed::after {
      content: "REMOVED";
      position: absolute;
      top: 4px; right: 4px;
      background: #e53935; color: white;
      font-size: 0.6rem; font-weight: 800;
      padding: 1px 4px; border-radius: 4px;
    }
    .page-num { font-family: "Manrope", sans-serif; font-weight: 800; font-size: 1.1rem; color: var(--ink); }
    .page-card.removed .page-num { color: #b71c1c; text-decoration: line-through; }
    .page-label { font-size: 0.72rem; color: #728078; }
    .download-action-bar { margin-top: 1.25rem; display: flex; align-items: center; gap: 0.85rem; }
    @media (max-width: 600px) {
      .pdf-file-header { flex-direction: column; align-items: flex-start; }
      .pages-grid { grid-template-columns: repeat(4, 1fr); }
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
          { "@type": "ListItem", "position": 2, "name": "PDF", "item": "https://niktool.in/#tools" },
          { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(tool.title)}, "item": "https://niktool.in/tools/${tool.slug}/" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
${faqSchema}
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
      <a href="/#tools">PDF</a>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <span>${tool.title}</span>
    </div>

    <section class="tool-hero">
      <h1>${tool.title}</h1>
      <p>${tool.desc}</p>
    </section>

    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>PDF Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally in browser</span>
      </div>

      <div class="pdf-hero-box" id="pdf-dropzone">
        <div class="pdf-hero-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <polyline points="9 15 12 12 15 15"></polyline>
          </svg>
        </div>
        <button class="pdf-select-btn" type="button" id="btn-select-pdf">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Select PDF file
        </button>
        <div class="drop-hint">or drop PDF file here</div>
        <input type="file" id="pdf-file-input" accept="application/pdf" style="display:none;">
      </div>

      <div class="pdf-file-details" id="pdf-details-panel">
        <div class="pdf-file-header">
          <div class="pdf-file-title" id="pdf-file-name">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e53935" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            document.pdf
          </div>
          <div class="pdf-file-badge" id="pdf-file-info">10 Pages | 1.2 MB</div>
        </div>

        <div style="font-size:0.88rem; font-weight:700; color:#3b4841; margin-bottom:0.5rem;">Page Selection:</div>
        
        <div class="pdf-presets-bar">
          <button type="button" class="preset-btn active" id="preset-default">Default Operation</button>
          <button type="button" class="preset-btn" id="preset-clear">Clear Selection</button>
        </div>

        <div class="pages-grid" id="pages-container"></div>

        <div class="download-action-bar">
          <button class="button" id="btn-process-download" type="button" style="min-height:48px; padding:0.8rem 1.6rem; font-size:1rem;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Process &amp; Download PDF
          </button>
          <button class="button secondary" id="btn-reset-file" type="button">Select Another File</button>
        </div>
      </div>

      <p class="message" id="${tool.slug}-message" role="status">Ready. Select a PDF file above to get started.</p>
    </section>

    <article class="seo-content">
      <h2>How to use ${tool.title}</h2>
      <ol>
        <li>Click <strong>Select PDF file</strong> or drop your document into the upload dropzone.</li>
        <li>Review auto-selected pages in the interactive page grid. Click cards to adjust selection.</li>
        <li>Click <strong>Process &amp; Download PDF</strong> to save your clean document instantly.</li>
      </ol>

      <h2>100% Private Client-Side PDF Engine</h2>
      <p>NikTool processes your PDF entirely within your web browser using WebAssembly technology. Your files never touch an external server, guaranteeing total privacy for personal, legal, or financial documents.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use ${tool.title}?</summary>
        <p>Select or drag your PDF file into the upload dropzone, review the page selection, and click Process &amp; Download PDF to save your file.</p>
      </details>
      <details>
        <summary>Is my PDF uploaded to a server?</summary>
        <p>No, 100% of PDF processing takes place locally inside your web browser using WebAssembly. Your files never touch an external server.</p>
      </details>
      <details>
        <summary>Is ${tool.title} free?</summary>
        <p>Yes, NikTool PDF utilities are 100% free with no file size limits, subscription, or account creation.</p>
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

// Generate JS Logic
function generateJs(tool) {
  return `(function() {
  'use strict';
  var slug = '${tool.slug}';
  var mode = '${tool.mode}';
  var param = ${JSON.stringify(tool.param)};

  var dropzone = document.getElementById('pdf-dropzone');
  var fileInput = document.getElementById('pdf-file-input');
  var selectBtn = document.getElementById('btn-select-pdf');
  var detailsPanel = document.getElementById('pdf-details-panel');

  var fileNameEl = document.getElementById('pdf-file-name');
  var fileInfoEl = document.getElementById('pdf-file-info');
  var pagesContainer = document.getElementById('pages-container');
  var processBtn = document.getElementById('btn-process-download');
  var resetBtn = document.getElementById('btn-reset-file');
  var msgEl = document.getElementById(slug + '-message');

  var presetDefault = document.getElementById('preset-default');
  var presetClear = document.getElementById('preset-clear');

  var currentFile = null;
  var currentArrayBuffer = null;
  var totalPagesCount = 0;
  var removedPages = new Set();
  var rotateDegrees = 0;

  function setMsg(txt, err) {
    msgEl.textContent = txt;
    msgEl.classList.toggle('is-error', !!err);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    var k = 1024;
    var sizes = ['Bytes', 'KB', 'MB', 'GB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  selectBtn.addEventListener('click', function(e) { e.stopPropagation(); fileInput.click(); });
  dropzone.addEventListener('click', function() { fileInput.click(); });
  dropzone.addEventListener('dragover', function(e) { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', function() { dropzone.classList.remove('dragover'); });
  dropzone.addEventListener('drop', function(e) {
    e.preventDefault(); dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', function() {
    if (fileInput.files && fileInput.files.length > 0) handleFile(fileInput.files[0]);
  });

  function handleFile(file) {
    if (!file || file.type !== 'application/pdf') { setMsg('Please select a valid PDF document (.pdf)', true); return; }
    currentFile = file;
    setMsg('Loading PDF file...');

    var reader = new FileReader();
    reader.onload = async function(evt) {
      currentArrayBuffer = evt.target.result;
      try {
        if (!window.PDFLib) { setMsg('PDF engine loading, please try again.', true); return; }
        var pdfDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
        totalPagesCount = pdfDoc.getPageCount();
        if (totalPagesCount === 0) { setMsg('The selected PDF has no pages.', true); return; }

        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';

        fileNameEl.childNodes[2].textContent = ' ' + file.name;
        fileInfoEl.textContent = totalPagesCount + ' Pages | ' + formatBytes(file.size);

        applyModeSelection();
        setMsg('PDF loaded successfully.');
      } catch (err) {
        setMsg('Failed to parse PDF: ' + err.message, true);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function applyModeSelection() {
    removedPages.clear();
    if (mode === 'remove_first_n') {
      var n = Math.min(param, totalPagesCount);
      for (var i = 1; i <= n; i++) removedPages.add(i);
    } else if (mode === 'remove_last_n') {
      var n = Math.min(param, totalPagesCount);
      for (var i = totalPagesCount - n + 1; i <= totalPagesCount; i++) if (i >= 1) removedPages.add(i);
    } else if (mode === 'remove_specific_page') {
      if (param <= totalPagesCount && param >= 1) removedPages.add(param);
    } else if (mode === 'remove_range') {
      var s = param[0], e = Math.min(param[1], totalPagesCount);
      for (var i = s; i <= e; i++) removedPages.add(i);
    } else if (mode === 'remove_front_and_back') {
      if (totalPagesCount >= 1) removedPages.add(1);
      if (totalPagesCount >= 2) removedPages.add(totalPagesCount);
    } else if (mode === 'remove_every_nth') {
      for (var i = param; i <= totalPagesCount; i += param) removedPages.add(i);
    } else if (mode === 'extract_first_n') {
      var n = Math.min(param, totalPagesCount);
      for (var i = n + 1; i <= totalPagesCount; i++) removedPages.add(i);
    } else if (mode === 'extract_last_n') {
      var n = Math.min(param, totalPagesCount);
      for (var i = 1; i <= totalPagesCount - n; i++) removedPages.add(i);
    } else if (mode === 'extract_specific_page') {
      for (var i = 1; i <= totalPagesCount; i++) if (i !== param) removedPages.add(i);
    } else if (mode === 'extract_range') {
      var s = param[0], e = Math.min(param[1], totalPagesCount);
      for (var i = 1; i <= totalPagesCount; i++) if (i < s || i > e) removedPages.add(i);
    } else if (mode === 'extract_middle') {
      if (totalPagesCount >= 1) removedPages.add(1);
      if (totalPagesCount >= 2) removedPages.add(totalPagesCount);
    } else if (mode === 'rotate_all') {
      rotateDegrees = param;
    }
    renderPagesGrid();
  }

  function renderPagesGrid() {
    pagesContainer.innerHTML = '';
    for (var i = 1; i <= totalPagesCount; i++) {
      var isRemoved = removedPages.has(i);
      var card = document.createElement('div');
      card.className = 'page-card' + (isRemoved ? ' removed' : '');

      var numDiv = document.createElement('div');
      numDiv.className = 'page-num';
      numDiv.textContent = i;

      var labelDiv = document.createElement('div');
      labelDiv.className = 'page-label';
      labelDiv.textContent = isRemoved ? 'Remove' : 'Keep';

      card.appendChild(numDiv);
      card.appendChild(labelDiv);

      (function(idx) {
        card.addEventListener('click', function() {
          if (removedPages.has(idx)) removedPages.delete(idx);
          else removedPages.add(idx);
          renderPagesGrid();
        });
      })(i);

      pagesContainer.appendChild(card);
    }
  }

  presetDefault.addEventListener('click', function() { applyModeSelection(); });
  presetClear.addEventListener('click', function() { removedPages.clear(); renderPagesGrid(); });

  processBtn.addEventListener('click', async function() {
    if (!currentArrayBuffer || totalPagesCount === 0) { setMsg('No PDF loaded.', true); return; }

    try {
      setMsg('Processing PDF...');
      var srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
      var newDoc = await PDFLib.PDFDocument.create();

      var keepIndices = [];
      if (mode === 'reverse_all') {
        for (var i = totalPagesCount - 1; i >= 0; i--) keepIndices.push(i);
      } else if (mode === 'swap_first_last') {
        if (totalPagesCount >= 2) {
          keepIndices.push(totalPagesCount - 1);
          for (var i = 1; i < totalPagesCount - 1; i++) keepIndices.push(i);
          keepIndices.push(0);
        } else {
          keepIndices.push(0);
        }
      } else if (mode === 'move_first_to_end') {
        for (var i = 1; i < totalPagesCount; i++) keepIndices.push(i);
        keepIndices.push(0);
      } else if (mode === 'move_last_to_front') {
        keepIndices.push(totalPagesCount - 1);
        for (var i = 0; i < totalPagesCount - 1; i++) keepIndices.push(i);
      } else if (mode === 'duplicate_first') {
        keepIndices.push(0);
        for (var i = 0; i < totalPagesCount; i++) keepIndices.push(i);
      } else if (mode === 'duplicate_last') {
        for (var i = 0; i < totalPagesCount; i++) keepIndices.push(i);
        keepIndices.push(totalPagesCount - 1);
      } else if (mode === 'duplicate_all') {
        for (var i = 0; i < totalPagesCount; i++) { keepIndices.push(i); keepIndices.push(i); }
      } else {
        for (var i = 0; i < totalPagesCount; i++) {
          if (!removedPages.has(i + 1)) keepIndices.push(i);
        }
      }

      if (keepIndices.length === 0) { setMsg('Cannot remove all pages from document.', true); return; }

      var copiedPages = await newDoc.copyPages(srcDoc, keepIndices);
      copiedPages.forEach(function(page) {
        if (rotateDegrees > 0) {
          var currRot = page.getRotation().angle;
          page.setRotation(PDFLib.degrees((currRot + rotateDegrees) % 360));
        }
        newDoc.addPage(page);
      });

      var pdfBytes = await newDoc.save();
      var blob = new Blob([pdfBytes], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = currentFile.name.replace(/\\.pdf$/i, '') + '-processed.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setMsg('Success! Updated PDF downloaded. (' + keepIndices.length + ' pages saved)');
    } catch (e) {
      setMsg('Error: ' + e.message, true);
    }
  });

  resetBtn.addEventListener('click', function() {
    currentFile = null; currentArrayBuffer = null; totalPagesCount = 0; removedPages.clear(); fileInput.value = '';
    detailsPanel.style.display = 'none'; dropzone.style.display = 'block';
    setMsg('Ready. Select a PDF file above.');
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
      'pdf tool',
      'online pdf utility',
      'free pdf tool',
      'browser pdf editor'
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

console.log(`Writing ${pdfToolsList.length} PDF Tools...`);

for (const tool of pdfToolsList) {
  const dirPath = path.join(process.cwd(), 'tools', tool.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(path.join(dirPath, 'index.html'), generateHtml(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'tool.js'), generateJs(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'catalog.json'), generateCatalog(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'sitemap.xml'), generateSitemap(tool), 'utf8');

  console.log(`Generated: ${tool.slug}`);
}

console.log('Running metadata sync...');
try {
  execSync('node scripts/sync-tool-metadata.cjs', { stdio: 'inherit', cwd: process.cwd() });
  console.log('Metadata sync complete!');
} catch (e) {
  console.error('Metadata sync failed:', e.message);
}
