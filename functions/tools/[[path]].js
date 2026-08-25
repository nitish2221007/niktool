function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatToolTitle(slug) {
  if (slug === 'best-of-five-calculator') return 'Best of Five Calculator';
  if (slug === 'best-of-four-calculator') return 'Best of Four Calculator';
  if (slug === 'crop-image-to-4-3') return 'Crop Image to 4:3 Aspect Ratio';
  if (slug === 'crop-image-to-16-9') return 'Crop Image to 16:9 Aspect Ratio';
  if (slug === 'crop-image-to-9-16-vertical') return 'Crop Image to 9:16 Vertical Aspect Ratio';
  if (slug === 'crop-image-to-1-1-square') return 'Crop Image to 1:1 Square';
  if (slug === 'resize-image-for-youtube-thumbnail') return 'Resize Image for YouTube Thumbnail';

  const acronyms = {
    'pdf': 'PDF', 'json': 'JSON', 'xml': 'XML', 'yaml': 'YAML', 'csv': 'CSV',
    'sql': 'SQL', 'html': 'HTML', 'css': 'CSS', 'js': 'JS', 'api': 'API',
    'url': 'URL', 'cbse': 'CBSE', 'icse': 'ICSE', 'bod': 'BOD', 'cod': 'COD',
    'kva': 'kVA', 'kvar': 'kVAR', 'rlc': 'RLC', 'fm': 'F/M', 'mlss': 'MLSS',
    'srt': 'SRT', 'ytm': 'YTM', 'cdf': 'CDF', 'ct': 'CT', 'hu': 'HU',
    'gpa': 'GPA', 'bmi': 'BMI', 'emi': 'EMI', 'gst': 'GST', 'vat': 'VAT',
    'sip': 'SIP', 'fd': 'FD', 'rd': 'RD', 'epf': 'EPF', 'ppf': 'PPF',
    'nps': 'NPS', 'hvac': 'HVAC', 'suvat': 'SUVAT', 'voc': 'VOC', 'qr': 'QR',
    'youtube': 'YouTube', 'tiktok': 'TikTok', 'instagram': 'Instagram',
    'facebook': 'Facebook', 'twitter': 'Twitter', 'linkedin': 'LinkedIn'
  };

  const words = slug.split('-').filter(Boolean);
  const formatted = [];

  for (let i = 0; i < words.length; i++) {
    const w = words[i].toLowerCase();
    const next = (words[i + 1] || '').toLowerCase();
    const prev = (words[i - 1] || '').toLowerCase();

    if (/^\d+$/.test(w) && next === 'words' && (words[i + 2] || '').toLowerCase() === 'count') {
      formatted.push('(' + w + ' Words Count)');
      i += 2;
      continue;
    }
    if (/^(\d+)(kb|mb)$/i.test(w)) {
      const match = w.match(/^(\d+)(kb|mb)$/i);
      formatted.push(match[1] + match[2].toUpperCase());
      continue;
    }
    if (prev === 'to' && /^\d+$/.test(w) && /^\d+$/.test(next)) {
      formatted.push(w + ':' + next);
      i += 1;
      continue;
    }
    if (acronyms[w]) {
      formatted.push(acronyms[w]);
      continue;
    }
    formatted.push(w.charAt(0).toUpperCase() + w.slice(1));
  }

  return formatted.join(' ');
}

function slugToCategory(slug) {
  const s = slug.toLowerCase();
  if (s.includes('image') || s.includes('photo') || s.includes('crop') || s.includes('resize') || s.includes('compress-jpg') || s.includes('compress-image') || s.includes('png') || s.includes('webp') || s.includes('svg')) return 'Utilities';
  if (s.includes('pdf')) return 'PDF';
  if (s.includes('calc') || s.includes('math') || s.includes('percentage') || s.includes('ratio') || s.includes('formula') || s.includes('angle') || s.includes('frequency') || s.includes('impedance') || s.includes('power') || s.includes('loan') || s.includes('emi') || s.includes('interest') || s.includes('born-in') || s.includes('age-calc') || s.includes('best-of')) return 'Math';
  if (s.includes('text') || s.includes('word') || s.includes('string') || s.includes('convert') || s.includes('case') || s.includes('line') || s.includes('voice')) return 'Text';
  if (s.includes('json') || s.includes('xml') || s.includes('yaml') || s.includes('code') || s.includes('format') || s.includes('base64') || s.includes('sql') || s.includes('html') || s.includes('css')) return 'Developer';
  if (s.includes('password') || s.includes('hash') || s.includes('encode') || s.includes('encrypt') || s.includes('shield')) return 'Security';
  return 'Utilities';
}

function slugToDescription(slug, name) {
  const s = slug.toLowerCase();
  if (s.includes('youtube-thumbnail')) return 'Resize image to exact 1280x720 YouTube thumbnail size online. Free, fast, and high quality with no sign-up.';
  if (s.includes('best-of-five')) return 'Calculate your best 5 subject marks and percentage automatically. Free, fast, and 100% private browser-based calculator.';
  if (s.includes('best-of-four')) return 'Calculate your best 4 subject marks and percentage automatically. Free, fast, and 100% private browser-based calculator.';
  if (s.includes('crop-image-to-4-3')) return 'Crop photo to standard 4:3 aspect ratio for tablets and monitors.';
  if (s.includes('crop-image-to-16-9')) return 'Crop photo to standard 16:9 widescreen aspect ratio for YouTube and desktop displays.';
  if (s.includes('crop-image-to-9-16')) return 'Crop photo to vertical 9:16 aspect ratio for Instagram Stories, TikTok, and YouTube Shorts.';
  if (s.includes('crop-image-to-1-1')) return 'Crop photo to 1:1 square aspect ratio for Instagram and profile avatars.';
  if (s.includes('compress-image-to')) {
    const match = s.match(/compress-image-to-(\d+)(kb|mb)/);
    if (match) return `Compress image file size to exact ${match[1]}${match[2].toUpperCase()} online. Free, fast, 100% private in-browser image compressor.`;
  }
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
  if (s.includes('image') || s.includes('photo') || s.includes('crop') || s.includes('resize')) {
    return `Free online ${name} tool by NikTool. Process, crop, and optimize images 100% privately in your browser.`;
  }
  if (s.includes('pdf')) {
    return `Free online ${name} tool by NikTool. Process, extract, and convert PDF documents 100% privately in your browser.`;
  }
  return `Free online ${name} tool by NikTool. Fast, browser-based, 100% private processing with no sign-up or installation required.`;
}

function getRelatedTools(slug, category) {
  const s = slug.toLowerCase();
  const list = [];

  if (s.includes('image') || s.includes('photo') || s.includes('crop') || s.includes('resize') || s.includes('thumbnail')) {
    list.push(
      { slug: 'resize-image-for-youtube-thumbnail', name: 'Resize Image for YouTube Thumbnail', desc: 'Resize image to 1280x720 YouTube size.' },
      { slug: 'compress-image-to-100kb', name: 'Compress Image to 100KB', desc: 'Compress image file size down to 100KB.' },
      { slug: 'crop-image-to-16-9', name: 'Crop Image to 16:9 Aspect Ratio', desc: 'Crop photo to 16:9 widescreen ratio.' },
      { slug: 'crop-image-to-4-3', name: 'Crop Image to 4:3 Aspect Ratio', desc: 'Crop photo to standard 4:3 aspect ratio.' },
      { slug: 'crop-image-to-1-1-square', name: 'Crop Image to 1:1 Square', desc: 'Crop photo to 1:1 square for profile pictures.' },
      { slug: 'compress-image-to-50kb', name: 'Compress Image to 50KB', desc: 'Compress image file size down to 50KB.' }
    );
  } else if (s.includes('best-of') || s.includes('marks') || s.includes('gpa') || s.includes('grade')) {
    list.push(
      { slug: 'best-of-five-calculator', name: 'Best of Five Calculator', desc: 'Calculate top 5 marks and percentage.' },
      { slug: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Quick percentage calculation tool.' },
      { slug: 'gpa-calculator', name: 'GPA Calculator', desc: 'Calculate grade point average online.' },
      { slug: 'scientific-calculator', name: 'Scientific Calculator', desc: 'Advanced scientific math functions.' },
      { slug: 'days-between-dates-calculator', name: 'Days Between Dates', desc: 'Calculate duration between dates.' },
      { slug: 'word-counter', name: 'Word Counter', desc: 'Count words, characters, and reading time.' }
    );
  } else if (s.includes('word-count') || s.includes('words-count') || s.includes('word-length')) {
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
  } else if (category === 'PDF' || s.includes('pdf')) {
    list.push(
      { slug: 'extract-first-page-from-pdf', name: 'Extract First Page From PDF', desc: 'Extract and save only page 1 as a single-page PDF.' },
      { slug: 'extract-last-page-from-pdf', name: 'Extract Last Page From PDF', desc: 'Extract and save only the last page of a PDF.' },
      { slug: 'extract-even-pages-from-pdf', name: 'Extract Even Pages From PDF', desc: 'Extract all even-numbered pages from PDF.' },
      { slug: 'extract-odd-pages-from-pdf', name: 'Extract Odd Pages From PDF', desc: 'Extract all odd-numbered pages from PDF.' },
      { slug: 'reverse-page-order-in-pdf', name: 'Reverse PDF Page Order', desc: 'Reverse the sequence of pages in any PDF.' },
      { slug: 'remove-first-page-from-pdf', name: 'Remove First Page From PDF', desc: 'Delete page 1 from your PDF document.' }
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
  const name = formatToolTitle(slug);
  const description = slugToDescription(slug, name);
  const category = slugToCategory(slug);
  const relatedTools = getRelatedTools(slug, category);

  const safeName = escapeHtml(name);
  const safeDesc = escapeHtml(description);
  const safeCat = escapeHtml(category);
  const url = `https://niktool.in/tools/${slug}/`;
  const lowerSlug = slug.toLowerCase();

  const isPdf = category === 'PDF' || lowerSlug.includes('pdf');
  const isImage = lowerSlug.includes('image') || lowerSlug.includes('photo') || lowerSlug.includes('crop') || lowerSlug.includes('resize') || lowerSlug.includes('compress-jpg') || lowerSlug.includes('compress-image') || lowerSlug.includes('webp') || lowerSlug.includes('png') || lowerSlug.includes('thumbnail');
  const isWordCount = lowerSlug.includes('word-count') || lowerSlug.includes('words-count') || lowerSlug.includes('word-length');
  const isAge = lowerSlug.includes('age-calculator') || lowerSlug.includes('born-in');
  const isMarksCalc = lowerSlug.includes('best-of-five') || lowerSlug.includes('best-of-four') || lowerSlug.includes('marks-calculator') || lowerSlug.includes('board-percentage');

  let workspaceHtml = '';

  if (isMarksCalc) {
    const isBest4 = lowerSlug.includes('best-of-four');
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally</span>
      </div>

      <div class="json-layout">
        <div class="editor-panel">
          <label class="editor-label" for="${slug}-input">Enter All Subject Marks</label>
          <textarea class="tool-textarea" id="${slug}-input" placeholder="Enter marks separated by commas or newlines&#10;Example: 85, 92, 78, 88, 95, 80"></textarea>
        </div>
        <div class="editor-panel">
          <label class="editor-label" for="${slug}-output">Result</label>
          <textarea class="tool-textarea" id="${slug}-output" placeholder="${isBest4 ? 'Best 4' : 'Best 5'} calculation will appear here..." readonly></textarea>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="primary-action-btn" type="button">${isBest4 ? 'Calculate Best 4' : 'Calculate Best 5'}</button>
        <button class="button secondary" id="copy-output" type="button" disabled>Copy result</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Enter subject marks above.</p>
    </section>`;
  } else if (isImage) {
    let subTitle = 'Quality / Compression Target';
    if (lowerSlug.includes('youtube-thumbnail')) subTitle = 'Target: 1280 x 720 px (YouTube Thumbnail Standard)';
    else if (lowerSlug.includes('instagram-post')) subTitle = 'Target: 1080 x 1080 px (Instagram Square)';
    else if (lowerSlug.includes('compress-image-to')) {
      const match = lowerSlug.match(/compress-image-to-(\d+)(kb|mb)/);
      if (match) subTitle = `Target File Size: ${match[1]}${match[2].toUpperCase()}`;
    }

    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Image Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally in browser</span>
      </div>

      <!-- Hero File Dropzone -->
      <div class="img-hero-box" id="img-dropzone" style="text-align: center; padding: 2.5rem 1.5rem; border: 2px dashed #a3d9bc; border-radius: 24px; background: linear-gradient(180deg, rgba(247, 248, 244, 0.6) 0%, rgba(223, 245, 233, 0.35) 100%); cursor: pointer; margin-bottom: 1.5rem;">
        <div class="img-hero-icon" style="width: 64px; height: 64px; margin: 0 auto 1rem; display: grid; place-items: center; border-radius: 18px; background: #176b4d; color: white; box-shadow: 0 8px 20px rgba(23, 107, 77, 0.25);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
          </svg>
        </div>
        <button class="button" type="button" id="btn-select-img" style="min-height: 52px; padding: 0.8rem 2.2rem; font-size: 1.05rem; border-radius: 14px; background: #176b4d; color: white; border: 0; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 8px 24px rgba(23, 107, 77, 0.3);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Select Image File
        </button>
        <div class="drop-hint" style="margin-top: 0.85rem; color: #5b6861; font-size: 0.92rem; font-weight: 500;">or drop JPG, PNG, WebP image here</div>
        <input type="file" id="img-file-input" accept="image/*" style="display:none;">
      </div>

      <!-- Details Panel -->
      <div class="img-details-panel" id="img-details-panel" style="display: none; background: #ffffff; border: 1px solid var(--line); border-radius: 18px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: var(--shadow);">
        <div class="img-preview-shell" style="display: flex; gap: 1.5rem; align-items: center; margin-bottom: 1.25rem; padding-bottom: 1rem; border-bottom: 1px solid var(--line);">
          <div class="img-thumb-container" style="width: 130px; height: 130px; border-radius: 14px; border: 1px solid var(--line); overflow: hidden; display: grid; place-items: center; background: #f6f8f5; flex: none;">
            <img id="img-preview-tag" src="" alt="Image Preview" style="max-width: 100%; max-height: 100%; object-fit: contain;">
          </div>
          <div class="img-info-meta" style="flex: 1;">
            <div class="title" id="img-file-name" style="font-family: 'Manrope', sans-serif; font-size: 1.15rem; font-weight: 800; color: var(--ink); margin-bottom: 0.3rem;">image.png</div>
            <div class="img-badge-row" style="display: flex; flex-wrap: wrap; gap: 0.4rem; margin-top: 0.4rem;">
              <span class="img-badge" id="img-dim-badge" style="background: var(--mint); color: var(--green-dark); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">1920 x 1080 px</span>
              <span class="img-badge" id="img-size-badge" style="background: var(--mint); color: var(--green-dark); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">245 KB</span>
              <span class="img-badge" id="img-fmt-badge" style="background: var(--mint); color: var(--green-dark); padding: 0.2rem 0.6rem; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">PNG</span>
            </div>
          </div>
        </div>

        <div class="controls-group" id="controls-box" style="margin-top: 1rem; background: #fafbf8; padding: 1rem; border-radius: 14px; border: 1px solid var(--line);">
          <label for="img-quality-slider" style="display: block; font-weight: 700; font-size: 0.85rem; color: #46544c; margin-bottom: 0.4rem;">${escapeHtml(subTitle)}</label>
          <input type="range" id="img-quality-slider" min="10" max="100" value="85" style="width:100%;">
          <div style="font-size:0.8rem; color:#5b6861; margin-top:0.3rem;" id="img-quality-txt">Quality Target: 85%</div>
        </div>

        <div class="download-action-bar" style="margin-top: 1.25rem; display: flex; align-items: center; gap: 0.85rem;">
          <button class="button" id="btn-process-download" type="button" style="min-height: 48px; padding: 0.8rem 1.6rem; font-size: 1rem; background: #176b4d;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Process &amp; Download Image
          </button>
          <button class="button secondary" id="btn-reset-file" type="button">Select Another Image</button>
        </div>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Select an image above to get started.</p>
    </section>`;
  } else if (isPdf) {
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>PDF Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed 100% locally in browser</span>
      </div>

      <div class="pdf-hero-box" id="pdf-dropzone" style="text-align: center; padding: 2.5rem 1.5rem; border: 2px dashed #b5cdbf; border-radius: 24px; background: linear-gradient(180deg, rgba(247, 248, 244, 0.6) 0%, rgba(223, 245, 233, 0.3) 100%); cursor: pointer; margin-bottom: 1.5rem;">
        <div class="pdf-hero-icon" style="width: 64px; height: 64px; margin: 0 auto 1rem; display: grid; place-items: center; border-radius: 18px; background: var(--green); color: white; box-shadow: 0 8px 20px rgba(23, 107, 77, 0.25);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <polyline points="9 15 12 12 15 15"></polyline>
          </svg>
        </div>
        <button class="button" type="button" id="btn-select-pdf" style="min-height: 52px; padding: 0.8rem 2.2rem; font-size: 1.05rem; border-radius: 14px; background: #e53935; color: white; border: 0; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 0.6rem; box-shadow: 0 8px 24px rgba(229, 57, 53, 0.3);">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Select PDF file
        </button>
        <div class="drop-hint" style="margin-top: 0.85rem; color: #66736c; font-size: 0.92rem; font-weight: 500;">or drop PDF file here</div>
        <input type="file" id="pdf-file-input" accept="application/pdf" style="display:none;">
      </div>

      <div class="pdf-file-details" id="pdf-details-panel" style="display: none; background: #ffffff; border: 1px solid var(--line); border-radius: 18px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: var(--shadow);">
        <div class="pdf-file-header" style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--line); margin-bottom: 1rem;">
          <div class="pdf-file-title" id="pdf-file-name" style="font-family: 'Manrope', sans-serif; font-size: 1.1rem; font-weight: 800; color: var(--ink); display: flex; align-items: center; gap: 0.5rem;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e53935" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            document.pdf
          </div>
          <div class="pdf-file-badge" id="pdf-file-info" style="background: var(--mint); color: var(--green-dark); padding: 0.25rem 0.65rem; border-radius: 8px; font-size: 0.82rem; font-weight: 700;">Loading...</div>
        </div>

        <div class="download-action-bar" style="margin-top: 1.25rem; display: flex; align-items: center; gap: 0.85rem;">
          <button class="button" id="btn-process-download" type="button" style="min-height: 48px; padding: 0.8rem 1.6rem; font-size: 1rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Process &amp; Download PDF
          </button>
          <button class="button secondary" id="btn-reset-file" type="button">Select Another File</button>
        </div>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Select a PDF file above to get started.</p>
    </section>`;
  } else if (isWordCount) {
    const match = slug.match(/(\d+)-words-count/);
    const targetWords = match ? match[1] : null;
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Word Count Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally in browser</span>
      </div>

      <div class="editor-panel" style="margin-bottom: 1.25rem;">
        <label class="editor-label" for="${slug}-input">Your Text Content</label>
        <textarea class="tool-textarea" id="${slug}-input" placeholder="Type or paste your text here to count words and characters..." style="min-height: 180px;"></textarea>
      </div>

      <div class="stats-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.85rem; margin-bottom: 1.25rem;">
        <div style="background: #fafbf8; border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #66736c; font-weight: 700; text-transform: uppercase;">Words</div>
          <div id="stat-words" style="font-size: 1.6rem; font-weight: 800; color: var(--green); margin-top: 0.2rem;">0</div>
          ${targetWords ? `<div style="font-size: 0.72rem; color: #88958e; margin-top: 0.1rem;">Target: ${targetWords}</div>` : ''}
        </div>
        <div style="background: #fafbf8; border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #66736c; font-weight: 700; text-transform: uppercase;">Characters</div>
          <div id="stat-chars" style="font-size: 1.6rem; font-weight: 800; color: var(--ink); margin-top: 0.2rem;">0</div>
          <div style="font-size: 0.72rem; color: #88958e; margin-top: 0.1rem;">With spaces</div>
        </div>
        <div style="background: #fafbf8; border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #66736c; font-weight: 700; text-transform: uppercase;">Sentences</div>
          <div id="stat-sentences" style="font-size: 1.6rem; font-weight: 800; color: var(--ink); margin-top: 0.2rem;">0</div>
        </div>
        <div style="background: #fafbf8; border: 1px solid var(--line); border-radius: 12px; padding: 0.85rem; text-align: center;">
          <div style="font-size: 0.75rem; color: #66736c; font-weight: 700; text-transform: uppercase;">Reading Time</div>
          <div id="stat-reading" style="font-size: 1.4rem; font-weight: 800; color: var(--ink); margin-top: 0.2rem;">0s</div>
        </div>
      </div>

      <div class="toolbar">
        <button class="button" id="copy-output" type="button">Copy Text</button>
        <button class="button secondary" id="clear-text" type="button">Clear</button>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Type or paste your text above.</p>
    </section>`;
  } else if (isAge) {
    const match = slug.match(/born-in-(\d{4})/);
    const defaultYear = match ? match[1] : '1995';
    workspaceHtml = `
    <section class="tool-workspace">
      <div class="workspace-header">
        <h2>Age Calculator Workspace</h2>
        <span class="workspace-status"><span class="status-dot"></span>Processed locally in browser</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <label class="editor-label" for="birth-date-input">Date of Birth</label>
          <input type="date" class="tool-textarea" id="birth-date-input" value="${defaultYear}-01-01" style="min-height: 48px; padding: 0.6rem 0.85rem; font-size: 1rem;">
        </div>
        <div>
          <label class="editor-label" for="target-date-input">Age on Date</label>
          <input type="date" class="tool-textarea" id="target-date-input" style="min-height: 48px; padding: 0.6rem 0.85rem; font-size: 1rem;">
        </div>
      </div>

      <div class="toolbar" style="margin-bottom: 1.25rem;">
        <button class="button" id="primary-action-btn" type="button">Calculate Exact Age</button>
      </div>

      <div id="age-result-box" style="background: #fafbf8; border: 1px solid var(--line); border-radius: 14px; padding: 1.25rem; margin-bottom: 1rem;">
        <div style="font-size: 0.85rem; font-weight: 700; color: #55635c; text-transform: uppercase;">Exact Calculated Age</div>
        <div id="age-main-output" style="font-size: 1.6rem; font-weight: 800; color: var(--green); margin: 0.4rem 0;">Click Calculate Above</div>
        <div id="age-breakdown-output" style="font-size: 0.95rem; color: #43514a; line-height: 1.6;"></div>
      </div>

      <p class="message" id="${slug}-message" role="status">Ready. Select dates and click calculate.</p>
    </section>`;
  } else {
    workspaceHtml = `
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
    </section>`;
  }

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
  ${isPdf ? '<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>' : ''}
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
        "applicationCategory": "${isPdf ? 'UtilitiesApplication' : (safeCat === 'Math' ? 'CalculatorApplication' : 'UtilitiesApplication')}",
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
            "acceptedAnswer": { "@type": "Answer", "text": "${isMarksCalc ? 'Enter marks for your subjects separated by commas or newlines, then click Calculate Best to see your top scores and percentage.' : (isImage ? 'Select or drop your image file in the green dropzone above, customize quality or parameters, and click Process & Download Image.' : (isPdf ? 'Upload your PDF document in the workspace above and click Process & Download to save your modified file instantly.' : 'Simply enter your text or numerical values into the workspace input field, then click Process to get instant results.'))}" }
          },
          {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, all processing happens 100% locally in your web browser. No files or personal data are ever sent to external servers." }
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

    ${workspaceHtml}

    <article class="seo-content">
      <h2>How to use ${safeName}</h2>
      <ol>
        <li>${isMarksCalc ? 'Enter marks for all your subjects (separated by commas or newlines).' : (isImage ? 'Click Select Image File or drop your image into the workspace above.' : (isPdf ? 'Select or drop your PDF document into the workspace above.' : 'Enter or paste your text or values in the input field above.'))}</li>
        <li>${isMarksCalc ? 'Click Calculate to automatically select your highest scores and percentage.' : (isImage ? 'Review image specifications and click Process & Download Image.' : (isPdf ? 'Click the **Process & Download PDF** button.' : 'Click the **Process** button to calculate results instantly.'))}</li>
        <li>${isImage || isPdf ? 'Your processed file will download directly to your device.' : 'Click **Copy result** to copy the output to your clipboard.'}</li>
      </ol>

      <h2>Key Features & Privacy</h2>
      <p>NikTool's ${safeName} is designed for maximum speed, privacy, and simplicity. All processing happens 100% locally in your web browser. Your data never leaves your device and is never sent to any external server.</p>

      <h2>Common Use Cases</h2>
      <p>Whether you are a student, professional, or everyday web user, ${safeName} gives you fast, accurate results without registration or downloads.</p>

      <h2>Frequently asked questions</h2>
      <details>
        <summary>How do I use this tool?</summary>
        <p>${isMarksCalc ? 'Enter marks for your subjects, click Calculate, and view your top scores with percentage.' : (isImage ? 'Simply select or drop your image file in the upload box above and click Process & Download Image.' : (isPdf ? 'Simply select or drop your PDF file in the upload box above and click Process & Download PDF.' : 'Simply paste or type your input in the input area, click Process, and copy your result.'))}</p>
      </details>
      <details>
        <summary>Is my data secure?</summary>
        <p>Yes, all calculations and file processing happen locally in your browser without server uploads.</p>
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
  const name = formatToolTitle(slug);
  const lowerSlug = slug.toLowerCase();

  const isPdf = lowerSlug.includes('pdf');
  const isImage = lowerSlug.includes('image') || lowerSlug.includes('photo') || lowerSlug.includes('crop') || lowerSlug.includes('resize') || lowerSlug.includes('compress-jpg') || lowerSlug.includes('compress-image') || lowerSlug.includes('webp') || lowerSlug.includes('png') || lowerSlug.includes('thumbnail');
  const isWordCount = lowerSlug.includes('word-count') || lowerSlug.includes('words-count') || lowerSlug.includes('word-length');
  const isAge = lowerSlug.includes('age-calculator') || lowerSlug.includes('born-in');
  const isMarksCalc = lowerSlug.includes('best-of-five') || lowerSlug.includes('best-of-four') || lowerSlug.includes('marks-calculator') || lowerSlug.includes('board-percentage');

  if (isMarksCalc) {
    const isBest4 = lowerSlug.includes('best-of-four');
    const topCount = isBest4 ? 4 : 5;
    return `(function() {
  'use strict';
  const inputEl = document.getElementById('${slug}-input');
  const outputEl = document.getElementById('${slug}-output');
  const primaryBtn = document.getElementById('primary-action-btn');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('${slug}-message');

  if (!inputEl || !outputEl || !primaryBtn) return;

  primaryBtn.addEventListener('click', function() {
    const text = inputEl.value.trim();
    if (!text) {
      msgEl.textContent = 'Please enter marks for at least ${topCount} subjects.';
      msgEl.classList.add('is-error');
      return;
    }
    
    const marks = text.split(/[\\s,]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n >= 0);
    
    if (marks.length < ${topCount}) {
      msgEl.textContent = 'Please enter marks for at least ${topCount} subjects.';
      msgEl.classList.add('is-error');
      return;
    }
    
    const sorted = [...marks].sort((a, b) => b - a);
    const best = sorted.slice(0, ${topCount});
    const excluded = sorted.slice(${topCount});
    const total = best.reduce((sum, m) => sum + m, 0);
    const maxMarks = ${topCount * 100};
    const percentage = (total / maxMarks) * 100;
    
    let result = 'Best ${topCount} Marks: ' + best.join(', ') + '\\n';
    result += 'Total Marks: ' + total + ' / ' + maxMarks + '\\n';
    result += 'Calculated Percentage: ' + percentage.toFixed(2) + '%\\n';
    if (excluded.length > 0) {
      result += '\\nExcluded Subjects: ' + excluded.join(', ');
    }
    
    outputEl.value = result;
    if (copyBtn) copyBtn.disabled = false;
    msgEl.textContent = 'Best ${topCount} marks calculated successfully!';
    msgEl.classList.remove('is-error');
  });

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

  if (isImage) {
    return `(function() {
  'use strict';
  const slug = '${slug}';
  const dropzone = document.getElementById('img-dropzone');
  const fileInput = document.getElementById('img-file-input');
  const selectBtn = document.getElementById('btn-select-img');
  const detailsPanel = document.getElementById('img-details-panel');

  const previewTag = document.getElementById('img-preview-tag');
  const fileNameEl = document.getElementById('img-file-name');
  const dimBadge = document.getElementById('img-dim-badge');
  const sizeBadge = document.getElementById('img-size-badge');
  const fmtBadge = document.getElementById('img-fmt-badge');

  const qualitySlider = document.getElementById('img-quality-slider');
  const qualityTxt = document.getElementById('img-quality-txt');
  const processBtn = document.getElementById('btn-process-download');
  const resetBtn = document.getElementById('btn-reset-file');
  const msgEl = document.getElementById(slug + '-message');

  if (!dropzone || !fileInput) return;

  let currentFile = null;
  let imageObj = new Image();

  function setMsg(txt, err) {
    if (!msgEl) return;
    msgEl.textContent = txt;
    msgEl.classList.toggle('is-error', !!err);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  if (selectBtn) selectBtn.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) handleFile(fileInput.files[0]);
  });

  if (qualitySlider) {
    qualitySlider.addEventListener('input', () => {
      qualityTxt.textContent = 'Quality Target: ' + qualitySlider.value + '%';
    });
  }

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      setMsg('Please select a valid image file (JPG, PNG, WebP).', true);
      return;
    }

    currentFile = file;
    setMsg('Loading image...');

    const reader = new FileReader();
    reader.onload = (evt) => {
      previewTag.src = evt.target.result;
      imageObj.onload = () => {
        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';

        fileNameEl.textContent = file.name;
        dimBadge.textContent = imageObj.width + ' x ' + imageObj.height + ' px';
        sizeBadge.textContent = formatBytes(file.size);
        fmtBadge.textContent = (file.type.split('/')[1] || 'IMG').toUpperCase();

        setMsg('Image loaded successfully. Click Process & Download to save result.');
      };
      imageObj.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }

  processBtn.addEventListener('click', async () => {
    if (!currentFile || !imageObj.width) {
      setMsg('No image loaded.', true);
      return;
    }

    try {
      setMsg('Processing image...');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const lowerSlug = slug.toLowerCase();
      let targetWidth = imageObj.width;
      let targetHeight = imageObj.height;
      let exportQuality = parseFloat(qualitySlider ? qualitySlider.value : 85) / 100;
      let exportFormat = currentFile.type || 'image/jpeg';
      let ext = currentFile.name.split('.').pop() || 'jpg';
      let suffix = '-processed.' + ext;

      // 1. YouTube Thumbnail (1280x720)
      if (lowerSlug.includes('youtube-thumbnail') || lowerSlug.includes('1280x720')) {
        targetWidth = 1280;
        targetHeight = 720;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-youtube-thumbnail.jpg';
        exportFormat = 'image/jpeg';
      }
      // 2. Instagram Post (1080x1080)
      else if (lowerSlug.includes('instagram-post') || lowerSlug.includes('1080x1080')) {
        targetWidth = 1080;
        targetHeight = 1080;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-instagram-post.jpg';
        exportFormat = 'image/jpeg';
      }
      // 3. Facebook Cover (1200x630)
      else if (lowerSlug.includes('facebook-cover') || lowerSlug.includes('1200x630')) {
        targetWidth = 1200;
        targetHeight = 630;
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-facebook-cover.jpg';
        exportFormat = 'image/jpeg';
      }
      // 4. Custom Dimension Resize (WxH)
      else if (lowerSlug.match(/resize-image-to-(\\d+)x(\\d+)/)) {
        const dMatch = lowerSlug.match(/resize-image-to-(\\d+)x(\\d+)/);
        targetWidth = parseInt(dMatch[1], 10);
        targetHeight = parseInt(dMatch[2], 10);
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
        suffix = '-' + targetWidth + 'x' + targetHeight + '.' + ext;
      }
      // 5. Crop Ratios (4:3, 16:9, 1:1, 9:16)
      else if (lowerSlug.includes('crop-image-to-4-3')) {
        const ratio = 4 / 3;
        const currentRatio = imageObj.width / imageObj.height;
        let cropW = imageObj.width, cropH = imageObj.height, startX = 0, startY = 0;
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
        suffix = '-cropped-4-3.' + ext;
      } else if (lowerSlug.includes('crop-image-to-16-9')) {
        const ratio = 16 / 9;
        const currentRatio = imageObj.width / imageObj.height;
        let cropW = imageObj.width, cropH = imageObj.height, startX = 0, startY = 0;
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
        suffix = '-cropped-16-9.' + ext;
      } else if (lowerSlug.includes('crop-image-to-1-1')) {
        const size = Math.min(imageObj.width, imageObj.height);
        const startX = (imageObj.width - size) / 2;
        const startY = (imageObj.height - size) / 2;
        canvas.width = size;
        canvas.height = size;
        ctx.drawImage(imageObj, startX, startY, size, size, 0, 0, size, size);
        suffix = '-cropped-1-1.' + ext;
      } else if (lowerSlug.includes('crop-image-to-9-16')) {
        const ratio = 9 / 16;
        const currentRatio = imageObj.width / imageObj.height;
        let cropW = imageObj.width, cropH = imageObj.height, startX = 0, startY = 0;
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
        suffix = '-cropped-9-16.' + ext;
      } else {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.drawImage(imageObj, 0, 0, targetWidth, targetHeight);
      }

      // 6. Target KB Compression Logic
      const kbMatch = lowerSlug.match(/compress-image-to-(\\d+)kb/) || lowerSlug.match(/resize-image-to-(\\d+)kb/);
      if (kbMatch) {
        const targetKB = parseInt(kbMatch[1], 10);
        exportFormat = 'image/jpeg';
        suffix = '-compressed-' + targetKB + 'kb.jpg';
        
        let minQ = 0.05, maxQ = 0.95, bestBlob = null;
        let q = exportQuality;

        for (let i = 0; i < 7; i++) {
          const b = await new Promise(r => canvas.toBlob(r, exportFormat, q));
          if (!b) break;
          bestBlob = b;
          const kb = b.size / 1024;
          if (kb <= targetKB && kb >= targetKB * 0.85) break;
          if (kb > targetKB) { maxQ = q; q = (minQ + maxQ) / 2; }
          else { minQ = q; q = (minQ + maxQ) / 2; }
        }

        // If still exceeds target KB, scale resolution down
        if (bestBlob && (bestBlob.size / 1024) > targetKB) {
          const scale = Math.sqrt(targetKB / (bestBlob.size / 1024));
          const sCanvas = document.createElement('canvas');
          sCanvas.width = Math.max(100, Math.floor(canvas.width * scale));
          sCanvas.height = Math.max(100, Math.floor(canvas.height * scale));
          const sCtx = sCanvas.getContext('2d');
          sCtx.imageSmoothingEnabled = true;
          sCtx.imageSmoothingQuality = 'high';
          sCtx.drawImage(canvas, 0, 0, sCanvas.width, sCanvas.height);
          bestBlob = await new Promise(r => sCanvas.toBlob(r, exportFormat, 0.7));
        }

        if (bestBlob) {
          const url = URL.createObjectURL(bestBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = currentFile.name.replace(/\\.[^/.]+$/, '') + suffix;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setMsg('Success! Compressed to ' + formatBytes(bestBlob.size) + ' (Target: ' + targetKB + ' KB). Downloaded!');
          return;
        }
      }

      // Default export download
      canvas.toBlob((blob) => {
        if (!blob) { setMsg('Error exporting image.', true); return; }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile.name.replace(/\\.[^/.]+$/, '') + suffix;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setMsg('Success! Image processed to (' + canvas.width + 'x' + canvas.height + ' px, ' + formatBytes(blob.size) + ') & downloaded!');
      }, exportFormat, exportQuality);

    } catch (err) {
      setMsg('Error processing image: ' + err.message, true);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFile = null;
      imageObj = new Image();
      fileInput.value = '';
      detailsPanel.style.display = 'none';
      dropzone.style.display = 'block';
      setMsg('Ready. Select an image above to get started.');
    });
  }
})();`;
  }

  if (isPdf) {
    return `(function() {
  'use strict';
  const slug = '${slug}';
  const dropzone = document.getElementById('pdf-dropzone');
  const fileInput = document.getElementById('pdf-file-input');
  const selectBtn = document.getElementById('btn-select-pdf');
  const detailsPanel = document.getElementById('pdf-details-panel');
  const fileNameEl = document.getElementById('pdf-file-name');
  const fileInfoEl = document.getElementById('pdf-file-info');
  const processBtn = document.getElementById('btn-process-download');
  const resetBtn = document.getElementById('btn-reset-file');
  const msgEl = document.getElementById(slug + '-message');

  if (!dropzone || !fileInput) return;

  let currentFile = null;
  let currentArrayBuffer = null;
  let totalPagesCount = 0;

  function setMsg(txt, err) {
    if (!msgEl) return;
    msgEl.textContent = txt;
    msgEl.classList.toggle('is-error', !!err);
  }

  function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  if (selectBtn) selectBtn.addEventListener('click', (e) => { e.stopPropagation(); fileInput.click(); });
  dropzone.addEventListener('click', () => fileInput.click());
  dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
  dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) handleFile(fileInput.files[0]);
  });

  function handleFile(file) {
    if (!file || file.type !== 'application/pdf') {
      setMsg('Please select a valid PDF document (.pdf)', true);
      return;
    }
    currentFile = file;
    setMsg('Loading PDF file...');

    const reader = new FileReader();
    reader.onload = async (evt) => {
      currentArrayBuffer = evt.target.result;
      try {
        if (!window.PDFLib) {
          setMsg('PDF engine loading, please try again.', true);
          return;
        }
        const pdfDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
        totalPagesCount = pdfDoc.getPageCount();
        if (totalPagesCount === 0) {
          setMsg('The selected PDF has no pages.', true);
          return;
        }

        dropzone.style.display = 'none';
        detailsPanel.style.display = 'block';
        fileNameEl.childNodes[2].textContent = ' ' + file.name;
        fileInfoEl.textContent = totalPagesCount + ' Pages | ' + formatBytes(file.size);
        setMsg('PDF loaded successfully. Click Process & Download to get your result.');
      } catch (err) {
        setMsg('Failed to load PDF: ' + err.message, true);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  processBtn.addEventListener('click', async () => {
    if (!currentArrayBuffer || totalPagesCount === 0) {
      setMsg('No PDF loaded.', true);
      return;
    }

    try {
      setMsg('Processing PDF...');
      const srcDoc = await PDFLib.PDFDocument.load(currentArrayBuffer, { ignoreEncryption: true });
      const newDoc = await PDFLib.PDFDocument.create();
      const lowerSlug = slug.toLowerCase();

      let indicesToKeep = [];
      let suffix = '-processed.pdf';

      if (lowerSlug.includes('extract-first-page') || lowerSlug.includes('first1')) {
        indicesToKeep = [0];
        suffix = '-first-page.pdf';
      } else if (lowerSlug.includes('extract-last-page')) {
        indicesToKeep = [totalPagesCount - 1];
        suffix = '-last-page.pdf';
      } else if (lowerSlug.includes('extract-even-pages')) {
        for (let i = 1; i < totalPagesCount; i += 2) indicesToKeep.push(i);
        suffix = '-even-pages.pdf';
      } else if (lowerSlug.includes('extract-odd-pages')) {
        for (let i = 0; i < totalPagesCount; i += 2) indicesToKeep.push(i);
        suffix = '-odd-pages.pdf';
      } else if (lowerSlug.includes('remove-first-page')) {
        for (let i = 1; i < totalPagesCount; i++) indicesToKeep.push(i);
        suffix = '-no-first-page.pdf';
      } else if (lowerSlug.includes('reverse')) {
        for (let i = totalPagesCount - 1; i >= 0; i--) indicesToKeep.push(i);
        suffix = '-reversed.pdf';
      } else {
        for (let i = 0; i < totalPagesCount; i++) indicesToKeep.push(i);
      }

      if (indicesToKeep.length === 0) {
        setMsg('No pages selected for extraction.', true);
        return;
      }

      const copiedPages = await newDoc.copyPages(srcDoc, indicesToKeep);
      copiedPages.forEach(p => newDoc.addPage(p));

      const pdfBytes = await newDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const dlUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = dlUrl;
      a.download = (currentFile.name || 'document').replace(/\\.pdf$/i, '') + suffix;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setMsg('Success! File processed and downloaded.');
    } catch (err) {
      setMsg('Error processing PDF: ' + err.message, true);
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentFile = null;
      currentArrayBuffer = null;
      totalPagesCount = 0;
      fileInput.value = '';
      detailsPanel.style.display = 'none';
      dropzone.style.display = 'block';
      setMsg('Ready. Select a PDF file above.');
    });
  }
})();`;
  }

  if (isWordCount) {
    return `(function() {
  'use strict';
  const inputEl = document.getElementById('${slug}-input');
  const statWords = document.getElementById('stat-words');
  const statChars = document.getElementById('stat-chars');
  const statSentences = document.getElementById('stat-sentences');
  const statReading = document.getElementById('stat-reading');
  const copyBtn = document.getElementById('copy-output');
  const clearBtn = document.getElementById('clear-text');
  const msgEl = document.getElementById('${slug}-message');

  if (!inputEl) return;

  function updateCounts() {
    const text = inputEl.value;
    const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
    const chars = text.length;
    const sentences = text.trim() ? (text.match(/[.!?]+(\\s|$)/g) || []).length : 0;
    const readingSeconds = Math.ceil(words / 3.3); // ~200 WPM

    if (statWords) statWords.textContent = words;
    if (statChars) statChars.textContent = chars;
    if (statSentences) statSentences.textContent = sentences;
    if (statReading) statReading.textContent = readingSeconds < 60 ? readingSeconds + 's' : Math.ceil(readingSeconds / 60) + 'm';

    const match = '${slug}'.match(/(\\d+)-words-count/);
    if (match && msgEl) {
      const target = parseInt(match[1], 10);
      if (words === 0) {
        msgEl.textContent = 'Target: ' + target + ' words. Type or paste input above.';
        msgEl.classList.remove('is-error');
      } else if (words === target) {
        msgEl.textContent = '🎉 Exact Match! Target of ' + target + ' words reached.';
        msgEl.classList.remove('is-error');
      } else if (words < target) {
        msgEl.textContent = (target - words) + ' words remaining to reach ' + target + ' words.';
        msgEl.classList.remove('is-error');
      } else {
        msgEl.textContent = (words - target) + ' words over the ' + target + ' word limit.';
        msgEl.classList.add('is-error');
      }
    }
  }

  inputEl.addEventListener('input', updateCounts);

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      if (!inputEl.value.trim()) return;
      navigator.clipboard.writeText(inputEl.value);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy Text', 2000);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      inputEl.value = '';
      updateCounts();
    });
  }
})();`;
  }

  if (isAge) {
    return `(function() {
  'use strict';
  const birthInput = document.getElementById('birth-date-input');
  const targetInput = document.getElementById('target-date-input');
  const calcBtn = document.getElementById('primary-action-btn');
  const mainOut = document.getElementById('age-main-output');
  const breakdownOut = document.getElementById('age-breakdown-output');
  const msgEl = document.getElementById('${slug}-message');

  if (targetInput) {
    targetInput.value = new Date().toISOString().split('T')[0];
  }

  function calculateAge() {
    if (!birthInput || !targetInput) return;
    const bDate = new Date(birthInput.value);
    const tDate = new Date(targetInput.value);

    if (isNaN(bDate.getTime()) || isNaN(tDate.getTime())) {
      msgEl.textContent = 'Please enter valid dates.';
      msgEl.classList.add('is-error');
      return;
    }

    if (tDate < bDate) {
      msgEl.textContent = 'Target date cannot be earlier than birth date.';
      msgEl.classList.add('is-error');
      return;
    }

    let years = tDate.getFullYear() - bDate.getFullYear();
    let months = tDate.getMonth() - bDate.getMonth();
    let days = tDate.getDate() - bDate.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(tDate.getFullYear(), tDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = tDate - bDate;
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = (years * 12) + months;

    mainOut.textContent = years + ' Years, ' + months + ' Months, ' + days + ' Days';
    breakdownOut.innerHTML = '<strong>Total Lifetime Breakdown:</strong><br>' +
      '• ' + totalMonths.toLocaleString() + ' Total Months<br>' +
      '• ' + totalWeeks.toLocaleString() + ' Total Weeks<br>' +
      '• ' + totalDays.toLocaleString() + ' Total Days<br>' +
      '• ' + (totalDays * 24).toLocaleString() + ' Total Hours Lived';

    msgEl.textContent = 'Age calculated successfully!';
    msgEl.classList.remove('is-error');
  }

  if (calcBtn) calcBtn.addEventListener('click', calculateAge);
  calculateAge();
})();`;
  }

  // General Text / Calculation / Dev tools
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

      if (lowerSlug.includes('json')) {
        const obj = JSON.parse(val);
        result = JSON.stringify(obj, null, 2);
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

    const name = formatToolTitle(slug);
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
