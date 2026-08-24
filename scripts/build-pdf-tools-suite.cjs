const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pdfTools = [
  {
    slug: 'remove-first-page-from-pdf',
    title: 'Remove First Page From PDF',
    desc: 'Remove the first page from any PDF file instantly in your browser. 100% free, private, and secure with local browser processing.',
    presetMode: 'first1',
    steps: [
      'Click **Select PDF file** or drop your PDF document into the dropzone.',
      'Page 1 is automatically selected for removal. You can toggle any additional pages in the grid.',
      'Click **Remove Pages & Download PDF** to save your updated file.'
    ],
    faqs: [
      { q: 'How do I remove only the first page of a PDF?', a: 'Upload your PDF and click Remove Pages & Download PDF. Page 1 is pre-selected by default.' },
      { q: 'Does this tool upload my PDF to any server?', a: 'No, processing runs 100% locally inside your browser.' },
      { q: 'Is there any file size limit?', a: 'No file size limits. It runs as fast as your computer can process it.' },
      { q: 'Is it completely free?', a: 'Yes, NikTool PDF tools are 100% free with no registration.' }
    ]
  },
  {
    slug: 'remove-last-page-from-pdf',
    title: 'Remove Last Page From PDF',
    desc: 'Remove the last page or trailing back-cover from your PDF document instantly. 100% free and processed locally in your browser.',
    presetMode: 'last1',
    steps: [
      'Select or drop your PDF document.',
      'The last page is pre-selected for removal automatically.',
      'Click **Remove Pages & Download PDF** to download your cleaned PDF file.'
    ],
    faqs: [
      { q: 'How do I remove the last page of a PDF?', a: 'Select your PDF. The last page is automatically pre-selected. Click Remove Pages & Download PDF.' },
      { q: 'Why remove the last page of a PDF?', a: 'Removing trailing blank pages or back-cover advertisements makes documents cleaner before sharing.' },
      { q: 'Are my files kept private?', a: 'Yes, no files ever leave your device.' },
      { q: 'Can I select multiple pages to remove?', a: 'Yes, click on any page card to toggle removal.' }
    ]
  },
  {
    slug: 'remove-last-two-pages-from-pdf',
    title: 'Remove Last Two Pages From PDF',
    desc: 'Remove the last two pages of any PDF document in your browser. 100% free, private, and secure with local browser processing.',
    presetMode: 'last2',
    steps: [
      'Select or drop your PDF file.',
      'The last two pages are automatically pre-selected for removal.',
      'Click **Remove Pages & Download PDF** to save your document.'
    ],
    faqs: [
      { q: 'How do I remove the last two pages of a PDF?', a: 'Drop your PDF file. The final 2 pages are pre-selected for removal. Click Download.' },
      { q: 'Does it work on mobile devices?', a: 'Yes, works on Android, iOS, Windows, Mac, and Linux browsers.' },
      { q: 'Is my data secure?', a: 'Yes, processing is 100% browser-based with zero server uploads.' },
      { q: 'Is there a limit on how many PDFs I can edit?', a: 'No limits at all. Unlimited free use.' }
    ]
  },
  {
    slug: 'remove-even-pages-from-pdf',
    title: 'Remove Even Pages From PDF',
    desc: 'Delete all even-numbered pages (pages 2, 4, 6, 8...) from a PDF document instantly. Free, private, and browser-processed.',
    presetMode: 'even',
    steps: [
      'Upload your PDF file.',
      'All even pages (2, 4, 6...) are automatically selected for removal.',
      'Click **Remove Pages & Download PDF** to download odd pages only.'
    ],
    faqs: [
      { q: 'How do I remove all even pages from a PDF?', a: 'Upload your file. The tool selects pages 2, 4, 6, 8... automatically. Click Download.' },
      { q: 'Why remove even pages?', a: 'Useful when scanning double-sided documents where even pages are blank or unneeded.' },
      { q: 'Is my document private?', a: 'Yes, 100% local processing.' },
      { q: 'Can I unselect certain even pages?', a: 'Yes, click any page card to toggle its status.' }
    ]
  },
  {
    slug: 'remove-odd-pages-from-pdf',
    title: 'Remove Odd Pages From PDF',
    desc: 'Delete all odd-numbered pages (pages 1, 3, 5, 7...) from a PDF file. 100% free, secure, and processed locally in your browser.',
    presetMode: 'odd',
    steps: [
      'Upload your PDF file.',
      'All odd pages (1, 3, 5...) are selected for removal automatically.',
      'Click **Remove Pages & Download PDF** to download even pages only.'
    ],
    faqs: [
      { q: 'How do I remove all odd pages from a PDF?', a: 'Drop your PDF file. Odd pages (1, 3, 5...) are auto-selected for deletion. Click Download.' },
      { q: 'Is there any server upload?', a: 'No, 100% browser-side execution.' },
      { q: 'Does it change PDF quality?', a: 'No, PDF vector graphics and text quality remain untouched.' },
      { q: 'Is this tool free?', a: 'Yes, 100% free forever.' }
    ]
  },
  {
    slug: 'extract-first-page-from-pdf',
    title: 'Extract First Page From PDF',
    desc: 'Extract and save only the first page (cover page) of any PDF document as a new single-page PDF. 100% free and private.',
    presetMode: 'extract_first1',
    steps: [
      'Upload your PDF file.',
      'Page 1 is kept while all other pages are removed.',
      'Click **Extract & Download PDF** to save the single-page PDF.'
    ],
    faqs: [
      { q: 'How do I extract just the first page of a PDF?', a: 'Upload your file and click Extract & Download PDF. Page 1 is isolated instantly.' },
      { q: 'What is page extraction useful for?', a: 'Extracting cover pages, executive summaries, or single certificates from larger documents.' },
      { q: 'Are my files kept confidential?', a: 'Yes, processed locally on your machine.' },
      { q: 'Is registration required?', a: 'No registration or login needed.' }
    ]
  },
  {
    slug: 'extract-first-two-pages-from-pdf',
    title: 'Extract First Two Pages From PDF',
    desc: 'Extract the first two pages of any PDF document into a new 2-page PDF file. Fast, free, and processed 100% in your browser.',
    presetMode: 'extract_first2',
    steps: [
      'Upload your PDF document.',
      'Pages 1 and 2 are kept while all trailing pages are removed.',
      'Click **Extract & Download PDF** to save the 2-page PDF.'
    ],
    faqs: [
      { q: 'How do I extract the first two pages of a PDF?', a: 'Upload your document. Pages 1 and 2 are kept by default. Click Download.' },
      { q: 'Is processing fast?', a: 'Yes, extraction takes less than 1 second.' },
      { q: 'Is my privacy protected?', a: 'Yes, 100% local processing.' },
      { q: 'Can I use this on mobile?', a: 'Yes, fully responsive on mobile and desktop.' }
    ]
  },
  {
    slug: 'extract-even-pages-from-pdf',
    title: 'Extract Even Pages From PDF',
    desc: 'Extract all even-numbered pages (2, 4, 6, 8...) from a PDF into a separate clean PDF document. 100% free and private.',
    presetMode: 'extract_even',
    steps: [
      'Upload your PDF file.',
      'Even pages are kept while odd pages are marked for removal.',
      'Click **Extract & Download PDF**.'
    ],
    faqs: [
      { q: 'How do I extract only even pages from a PDF?', a: 'Upload your file. Even pages are kept automatically. Click Download.' },
      { q: 'Where is this useful?', a: 'Splitting duplex scanned documents into even and odd page sets.' },
      { q: 'Is it free?', a: 'Yes, 100% free.' },
      { q: 'Are files saved on a server?', a: 'No, files stay in your browser.' }
    ]
  },
  {
    slug: 'extract-odd-pages-from-pdf',
    title: 'Extract Odd Pages From PDF',
    desc: 'Extract all odd-numbered pages (1, 3, 5, 7...) from a PDF file into a new document. 100% free, fast, and browser-processed.',
    presetMode: 'extract_odd',
    steps: [
      'Upload your PDF file.',
      'Odd pages are kept while even pages are removed.',
      'Click **Extract & Download PDF**.'
    ],
    faqs: [
      { q: 'How do I extract only odd pages from a PDF?', a: 'Upload your file. Odd pages (1, 3, 5...) are kept by default. Click Download.' },
      { q: 'Is there a page limit?', a: 'No page count or size limits.' },
      { q: 'Is my data safe?', a: 'Yes, 100% local browser processing.' },
      { q: 'Does it work offline?', a: 'Yes, works offline once loaded.' }
    ]
  },
  {
    slug: 'reverse-pdf-page-order',
    title: 'Reverse PDF Page Order',
    desc: 'Reverse the order of pages in a PDF document (last page becomes first). 100% free, private, and local browser processing.',
    presetMode: 'reverse',
    steps: [
      'Upload your PDF file.',
      'The tool automatically arranges pages in reverse order (N to 1).',
      'Click **Reverse & Download PDF**.'
    ],
    faqs: [
      { q: 'How do I reverse page order in a PDF?', a: 'Upload your document and click Reverse & Download PDF. Pages are flipped automatically.' },
      { q: 'Why reverse PDF pages?', a: 'Fixes documents that were scanned backwards or printed in reverse order.' },
      { q: 'Are my files kept private?', a: 'Yes, 100% local processing.' },
      { q: 'Is this service free?', a: 'Yes, 100% free.' }
    ]
  }
];

function generateHtml(tool) {
  const faqSchema = tool.faqs.map(f => `          {\n            "@type": "Question",\n            "name": ${JSON.stringify(f.q)},\n            "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a)} }\n          }`).join(',\n');
  const stepsHtml = tool.steps.map(s => `        <li>${s}</li>`).join('\n');
  const faqsHtml = tool.faqs.map(f => `      <details>\n        <summary>${f.q}</summary>\n        <p>${f.a}</p>\n      </details>`).join('\n');

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
    .pdf-hero-box {
      text-align: center;
      padding: 2.5rem 1.5rem;
      border: 2px dashed #b5cdbf;
      border-radius: 24px;
      background: linear-gradient(180deg, rgba(247, 248, 244, 0.6) 0%, rgba(223, 245, 233, 0.3) 100%);
      transition: all 0.25s ease;
      cursor: pointer;
      margin-bottom: 1.5rem;
      position: relative;
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
      top: 4px;
      right: 4px;
      background: #e53935;
      color: white;
      font-size: 0.6rem;
      font-weight: 800;
      padding: 1px 4px;
      border-radius: 4px;
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

        <div style="font-size:0.88rem; font-weight:700; color:#3b4841; margin-bottom:0.5rem;">Page Removal Selection:</div>
        
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
${stepsHtml}
      </ol>

      <h2>100% Private Client-Side PDF Processing</h2>
      <p>NikTool processes your PDF entirely within your web browser using WebAssembly technology. Your files never touch an external server, guaranteeing total privacy for personal, legal, or financial documents.</p>

      <h2>Frequently asked questions</h2>
${faqsHtml}
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
  var presetMode = '${tool.presetMode}';

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

        applyPresetMode();
        setMsg('PDF loaded successfully.');
      } catch (err) {
        setMsg('Failed to parse PDF: ' + err.message, true);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  function applyPresetMode() {
    removedPages.clear();
    if (presetMode === 'first1') {
      if (totalPagesCount >= 1) removedPages.add(1);
    } else if (presetMode === 'last1') {
      if (totalPagesCount >= 1) removedPages.add(totalPagesCount);
    } else if (presetMode === 'last2') {
      if (totalPagesCount >= 1) removedPages.add(totalPagesCount);
      if (totalPagesCount >= 2) removedPages.add(totalPagesCount - 1);
    } else if (presetMode === 'even') {
      for (var i = 2; i <= totalPagesCount; i += 2) removedPages.add(i);
    } else if (presetMode === 'odd') {
      for (var i = 1; i <= totalPagesCount; i += 2) removedPages.add(i);
    } else if (presetMode === 'extract_first1') {
      for (var i = 2; i <= totalPagesCount; i++) removedPages.add(i);
    } else if (presetMode === 'extract_first2') {
      for (var i = 3; i <= totalPagesCount; i++) removedPages.add(i);
    } else if (presetMode === 'extract_even') {
      for (var i = 1; i <= totalPagesCount; i += 2) removedPages.add(i);
    } else if (presetMode === 'extract_odd') {
      for (var i = 2; i <= totalPagesCount; i += 2) removedPages.add(i);
    }
    renderPagesGrid();
  }

  function renderPagesGrid() {
    pagesContainer.innerHTML = '';
    for (var i = 1; i <= totalPagesCount; i++) {
      var isRemoved = removedPages.has(i);
      var card = document.createElement('div');
      card.className = 'page-card' + (isRemoved ? ' removed' : '');
      card.setAttribute('data-page', i);

      var numDiv = document.createElement('div');
      numDiv.className = 'page-num';
      numDiv.textContent = i;

      var labelDiv = document.createElement('div');
      labelDiv.className = 'page-label';
      labelDiv.textContent = isRemoved ? 'Remove' : 'Keep';

      card.appendChild(numDiv);
      card.appendChild(labelDiv);

      (function(pageIndex) {
        card.addEventListener('click', function() {
          if (removedPages.has(pageIndex)) removedPages.delete(pageIndex);
          else removedPages.add(pageIndex);
          renderPagesGrid();
        });
      })(i);

      pagesContainer.appendChild(card);
    }
  }

  presetDefault.addEventListener('click', function() { applyPresetMode(); });
  presetClear.addEventListener('click', function() { removedPages.clear(); renderPagesGrid(); });

  processBtn.addEventListener('click', async function() {
    if (!currentArrayBuffer || totalPagesCount === 0) { setMsg('No PDF loaded.', true); return; }

    if (presetMode === 'reverse') {
      try {
        setMsg('Reversing page order...');
        var srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
        var newDoc = await PDFLib.PDFDocument.create();
        var indices = [];
        for (var i = totalPagesCount - 1; i >= 0; i--) indices.push(i);
        var copiedPages = await newDoc.copyPages(srcDoc, indices);
        copiedPages.forEach(function(p) { newDoc.addPage(p); });
        var pdfBytes = await newDoc.save();
        downloadBlob(pdfBytes, '-reversed.pdf');
        setMsg('Success! Reversed PDF downloaded.');
        return;
      } catch (e) { setMsg('Error: ' + e.message, true); return; }
    }

    if (removedPages.size >= totalPagesCount) { setMsg('Cannot remove all pages from the document.', true); return; }

    try {
      setMsg('Processing PDF...');
      var srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
      var newDoc = await PDFLib.PDFDocument.create();

      var keepIndices = [];
      for (var i = 0; i < totalPagesCount; i++) {
        if (!removedPages.has(i + 1)) keepIndices.push(i);
      }

      var copiedPages = await newDoc.copyPages(srcDoc, keepIndices);
      copiedPages.forEach(function(page) { newDoc.addPage(page); });

      var pdfBytes = await newDoc.save();
      downloadBlob(pdfBytes, '-processed.pdf');
      setMsg('Success! Updated PDF downloaded.');
    } catch (e) {
      setMsg('Error processing PDF: ' + e.message, true);
    }
  });

  function downloadBlob(bytes, suffix) {
    var blob = new Blob([bytes], { type: 'application/pdf' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = currentFile.name.replace(/\\.pdf$/i, '') + suffix;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

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
    category: 'PDF',
    icon: 'text',
    keywords: [
      tool.slug.replace(/-/g, ' '),
      tool.title,
      'pdf tool',
      'online pdf utility',
      'free pdf tool',
      'browser pdf editor'
    ],
    order: 2
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

console.log(`Starting PDF Tools Suite Builder for ${pdfTools.length} tools...`);

for (const tool of pdfTools) {
  const dirPath = path.join(process.cwd(), 'tools', tool.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(path.join(dirPath, 'index.html'), generateHtml(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'tool.js'), generateJs(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'catalog.json'), generateCatalog(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'sitemap.xml'), generateSitemap(tool), 'utf8');

  console.log(`Built PDF tool: ${tool.slug}`);
}

console.log('Running metadata sync...');
try {
  execSync('node scripts/sync-tool-metadata.cjs', { stdio: 'inherit', cwd: process.cwd() });
  console.log('Metadata sync complete!');
} catch (e) {
  console.error('Metadata sync failed:', e.message);
}
