const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const imageToolsList = [];

function addTool(slug, title, desc, toolType, config) {
  imageToolsList.push({ slug, title, desc, toolType, config });
}

// 1. FILE SIZE COMPRESSORS (KB Targets)
const kbTargets = [20, 50, 100, 200, 300, 500];
for (const kb of kbTargets) {
  addTool(
    `compress-image-to-${kb}kb`,
    `Compress Image to ${kb}KB Online`,
    `Compress JPG, PNG, and WebP images to under ${kb}KB without losing quality. 100% free, private, and processed locally in your browser.`,
    'compress_kb',
    { targetKB: kb }
  );
  addTool(
    `resize-image-to-${kb}kb`,
    `Resize Image to ${kb}KB Online`,
    `Reduce image file size to ${kb}KB for online forms, job applications, and portal submissions. Fast and 100% private.`,
    'compress_kb',
    { targetKB: kb }
  );
}

// 2. DIMENSION RESIZERS (Pixels WxH)
const dimTargets = [
  { w: 1920, h: 1080, name: '1920x1080 Full HD' },
  { w: 1280, h: 720, name: '1280x720 HD' },
  { w: 1080, h: 1080, name: '1080x1080 Square' },
  { w: 800, h: 600, name: '800x600 Standard' },
  { w: 600, h: 600, name: '600x600 Square' },
  { w: 500, h: 500, name: '500x500 Avatar' },
  { w: 300, h: 300, name: '300x300 Icon' },
  { w: 200, h: 200, name: '200x200 Badge' }
];

for (const d of dimTargets) {
  addTool(
    `resize-image-to-${d.w}x${d.h}`,
    `Resize Image to ${d.w}x${d.h} Pixels`,
    `Resize any JPG, PNG, or WebP photo to exact ${d.w}x${d.h} pixel dimensions instantly. 100% free and browser-processed.`,
    'resize_dim',
    { width: d.w, height: d.h }
  );
}

// 3. SPECIAL PURPOSE RESIZERS
addTool('resize-image-for-passport-photo', 'Resize Image for Passport Photo', 'Resize and format photo to standard passport dimensions (2x2 inches / 600x600 px) for online applications.', 'resize_dim', { width: 600, height: 600 });
addTool('resize-image-for-signature-online', 'Resize Image for Signature Online', 'Resize scanned signature images to small dimensions (e.g. 300x100 px under 50KB) for government forms.', 'resize_dim', { width: 300, height: 100 });
addTool('resize-image-for-youtube-thumbnail', 'Resize Image for YouTube Thumbnail', 'Resize photo to 1280x720 pixels (16:9 ratio) for YouTube thumbnails.', 'resize_dim', { width: 1280, height: 720 });
addTool('resize-image-for-instagram-post', 'Resize Image for Instagram Post', 'Resize and crop photo to 1080x1080 square for Instagram posts.', 'resize_dim', { width: 1080, height: 1080 });

// 4. FORMAT CONVERTERS
addTool('convert-png-to-webp', 'Convert PNG to WebP Online', 'Convert PNG images to lightweight WebP format to speed up your website. 100% free and local.', 'convert_format', { targetFormat: 'image/webp', ext: 'webp' });
addTool('convert-webp-to-png', 'Convert WebP to PNG Online', 'Convert WebP images to transparent PNG format instantly in your browser.', 'convert_format', { targetFormat: 'image/png', ext: 'png' });
addTool('convert-jpg-to-webp', 'Convert JPG to WebP Online', 'Convert JPG/JPEG images to modern compressed WebP format for fast web pages.', 'convert_format', { targetFormat: 'image/webp', ext: 'webp' });
addTool('convert-webp-to-jpg', 'Convert WebP to JPG Online', 'Convert WebP files to universal JPG/JPEG format for max compatibility.', 'convert_format', { targetFormat: 'image/jpeg', ext: 'jpg' });
addTool('convert-png-to-jpg', 'Convert PNG to JPG Online', 'Convert PNG images to JPG format with custom background and quality controls.', 'convert_format', { targetFormat: 'image/jpeg', ext: 'jpg' });
addTool('convert-jpg-to-png', 'Convert JPG to PNG Online', 'Convert JPG photos to high quality PNG format instantly in your browser.', 'convert_format', { targetFormat: 'image/png', ext: 'png' });

// 5. ASPECT RATIO CROPPING
addTool('crop-image-to-16-9', 'Crop Image to 16:9 Aspect Ratio', 'Crop any photo to widescreen 16:9 aspect ratio for presentations, YouTube, and wallpapers.', 'crop_ratio', { ratioW: 16, ratioH: 9 });
addTool('crop-image-to-4-3', 'Crop Image to 4:3 Aspect Ratio', 'Crop photo to standard 4:3 aspect ratio for tablets and monitors.', 'crop_ratio', { ratioW: 4, ratioH: 3 });
addTool('crop-image-to-1-1-square', 'Crop Image to 1:1 Square Ratio', 'Crop any picture into a perfect 1:1 square ratio for profile avatars and Instagram.', 'crop_ratio', { ratioW: 1, ratioH: 1 });
addTool('crop-image-to-9-16-vertical', 'Crop Image to 9:16 Vertical Ratio', 'Crop photo to 9:16 vertical aspect ratio for mobile stories, TikTok, and Reels.', 'crop_ratio', { ratioW: 9, ratioH: 16 });

// 6. ENHANCEMENT & FILTERS
addTool('remove-exif-metadata-from-photo', 'Remove EXIF Metadata From Photo', 'Strip GPS location data, camera details, and personal EXIF metadata from photos before sharing online.', 'strip_exif', {});
addTool('grayscale-image-converter-online', 'Grayscale Image Converter Online', 'Convert colored photos to black & white / grayscale images instantly.', 'filter_effect', { filter: 'grayscale' });
addTool('invert-image-colors-online', 'Invert Image Colors Online', 'Invert photo colors to produce negative color effect online.', 'filter_effect', { filter: 'invert' });
addTool('flip-image-horizontally-online', 'Flip Image Horizontally Online', 'Flip image horizontally (mirror effect) online.', 'transform_effect', { transform: 'flip_h' });
addTool('flip-image-vertically-online', 'Flip Image Vertically Online', 'Flip image upside down / vertically online.', 'transform_effect', { transform: 'flip_v' });
addTool('rotate-image-90-degrees-clockwise', 'Rotate Image 90 Degrees Clockwise', 'Rotate photo 90 degrees clockwise online.', 'transform_effect', { transform: 'rotate_90' });

console.log(`Total Image Tool Specs Generated: ${imageToolsList.length}`);

function generateHtml(tool) {
  const faqSchema = [
    { q: `How do I use ${tool.title}?`, a: `Select or drop your image into the green upload dropzone, adjust parameters if needed, and click Process & Download Image to save your output.` },
    { q: `Is my photo uploaded to any server?`, a: `No! 100% of image processing takes place locally inside your web browser using HTML5 Canvas. Your photos never leave your device.` },
    { q: `Is ${tool.title} free to use?`, a: `Yes, NikTool image utilities are 100% free with no file size limits, subscriptions, or accounts required.` }
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
    /* 10x Fancy Green Heading & Image Tool Styles */
    .image-page .tool-hero h1, .tool-hero h1 {
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
    .img-hero-box {
      text-align: center;
      padding: 2.5rem 1.5rem;
      border: 2px dashed #a3d9bc;
      border-radius: 24px;
      background: linear-gradient(180deg, rgba(247, 248, 244, 0.6) 0%, rgba(223, 245, 233, 0.35) 100%);
      transition: all 0.25s ease;
      cursor: pointer;
      margin-bottom: 1.5rem;
    }
    .img-hero-box:hover, .img-hero-box.dragover {
      border-color: #176b4d;
      background: rgba(223, 245, 233, 0.65);
      transform: translateY(-2px);
      box-shadow: 0 12px 30px rgba(23, 107, 77, 0.15);
    }
    .img-hero-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 1rem;
      display: grid;
      place-items: center;
      border-radius: 18px;
      background: #176b4d;
      color: white;
      box-shadow: 0 8px 20px rgba(23, 107, 77, 0.25);
    }
    .img-hero-icon svg { width: 32px; height: 32px; }
    .img-select-btn {
      min-height: 52px;
      padding: 0.8rem 2.2rem;
      font-size: 1.1rem;
      border-radius: 14px;
      background: #176b4d;
      color: white;
      border: 0;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 0.6rem;
      box-shadow: 0 8px 24px rgba(23, 107, 77, 0.3);
      transition: all 0.2s ease;
    }
    .img-select-btn:hover {
      background: #0d4b35;
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(23, 107, 77, 0.4);
    }
    .drop-hint { margin-top: 0.85rem; color: #5b6861; font-size: 0.92rem; font-weight: 500; }
    .img-details-panel {
      display: none;
      background: #ffffff;
      border: 1px solid var(--line);
      border-radius: 18px;
      padding: 1.25rem;
      margin-bottom: 1.5rem;
      box-shadow: var(--shadow);
    }
    .img-preview-shell {
      display: flex;
      gap: 1.5rem;
      align-items: center;
      margin-bottom: 1.25rem;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--line);
    }
    .img-thumb-container {
      width: 130px;
      height: 130px;
      border-radius: 14px;
      border: 1px solid var(--line);
      overflow: hidden;
      display: grid;
      place-items: center;
      background: #f6f8f5;
      flex: none;
    }
    .img-thumb-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    .img-info-meta { flex: 1; }
    .img-info-meta .title { font-family: "Manrope", sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--ink); margin-bottom: 0.3rem; }
    .img-badge-row { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem; }
    .img-badge { background: var(--mint); color: var(--green-dark); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700; }
    .controls-group { margin-top: 1rem; background: #fafbf8; padding: 1rem; border-radius: 14px; border: 1px solid var(--line); }
    .controls-group label { display: block; font-weight: 700; font-size: 0.85rem; color: #46544c; margin-bottom: 0.4rem; }
    .download-action-bar { margin-top: 1.25rem; display: flex; align-items: center; gap: 0.85rem; }
    @media (max-width: 600px) {
      .img-preview-shell { flex-direction: column; align-items: flex-start; }
      .img-thumb-container { width: 100%; height: 160px; }
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
          { "@type": "ListItem", "position": 2, "name": "Utilities", "item": "https://niktool.in/#tools" },
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
<body class="image-page">
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
      <a href="/#tools">Utilities</a>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
      <span>${tool.title}</span>
    </div>

    <section class="tool-hero image-hero">
      <h1>${tool.title}</h1>
      <p>${tool.desc}</p>
    </section>

    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Image Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally in browser</span>
      </div>

      <!-- Hero File Dropzone -->
      <div class="img-hero-box" id="img-dropzone">
        <div class="img-hero-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <button class="img-select-btn" type="button" id="btn-select-img">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Select Image File
        </button>
        <div class="drop-hint">or drop JPG, PNG, WebP image here</div>
        <input type="file" id="img-file-input" accept="image/*" style="display:none;">
      </div>

      <!-- Details Panel -->
      <div class="img-details-panel" id="img-details-panel">
        <div class="img-preview-shell">
          <div class="img-thumb-container">
            <img id="img-preview-tag" src="" alt="Image Preview">
          </div>
          <div class="img-info-meta">
            <div class="title" id="img-file-name">image.png</div>
            <div class="img-badge-row">
              <span class="img-badge" id="img-dim-badge">1920 x 1080 px</span>
              <span class="img-badge" id="img-size-badge">245 KB</span>
              <span class="img-badge" id="img-fmt-badge">PNG</span>
            </div>
          </div>
        </div>

        <div class="controls-group" id="controls-box">
          <label for="img-quality-slider">Quality / Processing Target</label>
          <input type="range" id="img-quality-slider" min="10" max="100" value="85" style="width:100%;">
          <div style="font-size:0.8rem; color:#5b6861; margin-top:0.3rem;" id="img-quality-txt">Quality: 85%</div>
        </div>

        <div class="download-action-bar">
          <button class="button" id="btn-process-download" type="button" style="min-height:48px; padding:0.8rem 1.6rem; font-size:1rem; background:#176b4d;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Process &amp; Download Image
          </button>
          <button class="button secondary" id="btn-reset-file" type="button">Select Another Image</button>
        </div>
      </div>

      <p class="message" id="${tool.slug}-message" role="status">Ready. Select an image above to get started.</p>
    </section>

    <article class="seo-content">
      <h2>How to use ${tool.title}</h2>
      <ol>
        <li>Click <strong>Select Image File</strong> or drag and drop your photo into the dropzone.</li>
        <li>Review image specifications and adjust quality or dimension targets.</li>
        <li>Click <strong>Process &amp; Download Image</strong> to save your processed file instantly.</li>
      </ol>

      <h2>100% Private Client-Side Image Processing</h2>
      <p>NikTool processes your images entirely inside your browser using HTML5 Canvas and Web APIs. Your photos never leave your device, ensuring complete privacy.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use ${tool.title}?</summary>
        <p>Select or drop your image into the green upload dropzone, adjust parameters if needed, and click Process &amp; Download Image to save your output.</p>
      </details>
      <details>
        <summary>Is my photo uploaded to any server?</summary>
        <p>No! 100% of image processing takes place locally inside your web browser using HTML5 Canvas. Your photos never leave your device.</p>
      </details>
      <details>
        <summary>Is ${tool.title} free to use?</summary>
        <p>Yes, NikTool image utilities are 100% free with no file size limits, subscriptions, or accounts required.</p>
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
  var toolType = '${tool.toolType}';
  var config = ${JSON.stringify(tool.config)};

  var dropzone = document.getElementById('img-dropzone');
  var fileInput = document.getElementById('img-file-input');
  var selectBtn = document.getElementById('btn-select-img');
  var detailsPanel = document.getElementById('img-details-panel');

  var previewTag = document.getElementById('img-preview-tag');
  var fileNameEl = document.getElementById('img-file-name');
  var dimBadge = document.getElementById('img-dim-badge');
  var sizeBadge = document.getElementById('img-size-badge');
  var fmtBadge = document.getElementById('img-fmt-badge');

  var qualitySlider = document.getElementById('img-quality-slider');
  var qualityTxt = document.getElementById('img-quality-txt');
  var processBtn = document.getElementById('btn-process-download');
  var resetBtn = document.getElementById('btn-reset-file');
  var msgEl = document.getElementById(slug + '-message');

  var currentFile = null;
  var imageObj = new Image();

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

  qualitySlider.addEventListener('input', function() {
    qualityTxt.textContent = 'Quality Target: ' + qualitySlider.value + '%';
  });

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      setMsg('Please select a valid image file (JPG, PNG, WebP).', true);
      return;
    }

    currentFile = file;
    setMsg('Loading image...');

    var reader = new FileReader();
    reader.onload = function(evt) {
      previewTag.src = evt.target.result;
      imageObj.onload = function() {
        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';

        fileNameEl.textContent = file.name;
        dimBadge.textContent = imageObj.width + ' x ' + imageObj.height + ' px';
        sizeBadge.textContent = formatBytes(file.size);
        fmtBadge.textContent = file.type.split('/')[1].toUpperCase();

        setMsg('Image loaded successfully.');
      };
      imageObj.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }

  processBtn.addEventListener('click', function() {
    if (!currentFile || !imageObj.width) { setMsg('No image loaded.', true); return; }

    try {
      setMsg('Processing image...');
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      var targetWidth = imageObj.width;
      var targetHeight = imageObj.height;
      var exportQuality = parseFloat(qualitySlider.value) / 100;
      var exportFormat = currentFile.type || 'image/jpeg';
      var ext = currentFile.name.split('.').pop() || 'jpg';

      if (toolType === 'resize_dim') {
        targetWidth = config.width;
        targetHeight = config.height;
      } else if (toolType === 'convert_format') {
        exportFormat = config.targetFormat;
        ext = config.ext;
      } else if (toolType === 'crop_ratio') {
        var ratio = config.ratioW / config.ratioH;
        var currentRatio = imageObj.width / imageObj.height;
        var cropW = imageObj.width;
        var cropH = imageObj.height;
        var startX = 0;
        var startY = 0;

        if (currentRatio > ratio) {
          cropW = imageObj.height * ratio;
          startX = (imageObj.width - cropW) / 2;
        } else {
          cropH = imageObj.width / ratio;
          startY = (imageObj.height - cropH) / 2;
        }
        canvas.width = cropW;
        canvas.height = cropH;
        ctx.drawImage(imageObj, startX, startY, cropW, cropH, 0, 0, cropW, cropH);

        canvas.toBlob(function(blob) {
          triggerDownload(blob, '-cropped.' + ext);
        }, exportFormat, exportQuality);
        return;
      } else if (toolType === 'filter_effect') {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        if (config.filter === 'grayscale') ctx.filter = 'grayscale(100%)';
        else if (config.filter === 'invert') ctx.filter = 'invert(100%)';
        ctx.drawImage(imageObj, 0, 0);

        canvas.toBlob(function(blob) {
          triggerDownload(blob, '-filtered.' + ext);
        }, exportFormat, exportQuality);
        return;
      } else if (toolType === 'transform_effect') {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        if (config.transform === 'flip_h') {
          ctx.translate(targetWidth, 0);
          ctx.scale(-1, 1);
        } else if (config.transform === 'flip_v') {
          ctx.translate(0, targetHeight);
          ctx.scale(1, -1);
        } else if (config.transform === 'rotate_90') {
          canvas.width = targetHeight;
          canvas.height = targetWidth;
          ctx.translate(canvas.width, 0);
          ctx.rotate(90 * Math.PI / 180);
        }
        ctx.drawImage(imageObj, 0, 0);

        canvas.toBlob(function(blob) {
          triggerDownload(blob, '-transformed.' + ext);
        }, exportFormat, exportQuality);
        return;
      }

      // Default Canvas Draw
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(function(blob) {
        triggerDownload(blob, '-processed.' + ext);
      }, exportFormat, exportQuality);

    } catch(e) {
      setMsg('Error processing image: ' + e.message, true);
    }
  });

  function triggerDownload(blob, suffix) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = currentFile.name.replace(/\\.[^/.]+$/, '') + suffix;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setMsg('Success! Image downloaded as "' + a.download + '". (' + formatBytes(blob.size) + ')');
  }

  resetBtn.addEventListener('click', function() {
    currentFile = null; imageObj = new Image(); fileInput.value = '';
    detailsPanel.style.display = 'none'; dropzone.style.display = 'block';
    setMsg('Ready. Select an image above to get started.');
  });
})();
`;
}

function generateCatalog(tool) {
  return JSON.stringify({
    name: tool.title,
    description: tool.desc,
    path: `/tools/${tool.slug}/`,
    category: 'Utilities',
    icon: 'text',
    keywords: [
      tool.slug.replace(/-/g, ' '),
      tool.title,
      'image tool',
      'online photo utility',
      'free image converter',
      'browser image editor'
    ],
    order: 3
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

console.log(`Writing ${imageToolsList.length} Image Tools...`);

for (const tool of imageToolsList) {
  const dirPath = path.join(process.cwd(), 'tools', tool.slug);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(path.join(dirPath, 'index.html'), generateHtml(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'tool.js'), generateJs(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'catalog.json'), generateCatalog(tool), 'utf8');
  fs.writeFileSync(path.join(dirPath, 'sitemap.xml'), generateSitemap(tool), 'utf8');

  console.log(`Built Image tool: ${tool.slug}`);
}

console.log('Running metadata sync...');
try {
  execSync('node scripts/sync-tool-metadata.cjs', { stdio: 'inherit', cwd: process.cwd() });
  console.log('Metadata sync complete!');
} catch (e) {
  console.error('Metadata sync failed:', e.message);
}
