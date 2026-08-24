const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch = [
  // 1. HTML Entity Encoder / Decoder
  {
    slug: 'html-entity-encoder-decoder',
    name: 'HTML Entity Encoder Decoder',
    description: 'Encode special characters to HTML named and numeric entities (&amp;, &lt;, &gt;) or decode HTML entities back to raw text.',
    category: 'Developer',
    icon: 'code',
    keywords: ['html entity encoder', 'html entity decoder', 'html escape tool', 'html unescape', 'special characters to html entities', 'encode html online'],
    order: 49,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'HTML Entity Processor',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="html-input">Input Content</label>
        <textarea class="tool-textarea" id="html-input" rows="5" placeholder="Enter text or HTML entities here (e.g. &lt;div class=&quot;box&quot;&gt;Hello &amp; Welcome&lt;/div&gt;)"></textarea>
      </div>
      <div class="control-group">
        <label class="control-label" for="html-mode">Processing Mode</label>
        <select class="tool-textarea" id="html-mode">
          <option value="encode">Encode (Escape Characters to Entities)</option>
          <option value="decode">Decode (Unescape Entities to Normal Text)</option>
        </select>
      </div>
      <div id="html-res-card" style="display:none; margin-top:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Output Result</label>
          <button class="button secondary" id="copy-html-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Output</button>
        </div>
        <textarea class="tool-textarea" id="html-output" rows="6" readonly></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('html-input');
  const modeEl = document.getElementById('html-mode');
  const outEl = document.getElementById('html-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-html-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('html-res-card');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function encodeHTML(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  }

  function decodeHTML(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }

  btn.addEventListener('click', () => {
    const raw = inEl.value;
    if (!raw.trim()) {
      setMsg('Please enter text to encode or decode.', true);
      resCard.style.display = 'none';
      return;
    }
    const mode = modeEl.value;
    const res = mode === 'encode' ? encodeHTML(raw) : decodeHTML(raw);
    outEl.value = res;
    resCard.style.display = 'block';
    setMsg('HTML entities ' + mode + 'd successfully.');
  });

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Result copied to clipboard.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Paste your text or HTML snippet into the input box.',
      'Select Encode to escape symbols like <, >, &, and quotes into HTML entities, or Decode to revert them.',
      'Click <strong>Calculate</strong> to inspect the result and copy it with one click.'
    ],
    benefitTitle: 'Why Encode HTML Characters?',
    benefitContent: 'Encoding special characters ensures web browsers render symbols as literal text rather than interpreting them as active HTML elements. This is crucial for preventing Cross-Site Scripting (XSS) vulnerabilities and displaying code snippets safely in documentation.',
    faqs: [
      { q: 'Which characters are encoded by default?', a: '& becomes &amp;, < becomes &lt;, > becomes &gt;, " becomes &quot;, and \' becomes &#39;.' }
    ]
  },

  // 2. URL Slug Generator
  {
    slug: 'url-slug-generator',
    name: 'URL Slug Generator',
    description: 'Transform any article title, product name, or phrase into a clean, lowercase, SEO-friendly URL slug with stop-word filtering.',
    category: 'Developer',
    icon: 'code',
    keywords: ['url slug generator', 'slugify online', 'seo slug generator', 'permalink generator', 'title to url slug', 'url string cleaner'],
    order: 50,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Slug Generator Options',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="slug-input">Input Title or Headline</label>
        <input class="tool-textarea" id="slug-input" type="text" placeholder="e.g. 10 Best Online Tools for Productivity in 2026!" />
      </div>
      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; margin-top:0.75rem;">
        <div class="control-group">
          <label class="control-label" for="slug-sep">Separator Character</label>
          <select class="tool-textarea" id="slug-sep">
            <option value="-">Hyphen (-)</option>
            <option value="_">Underscore (_)</option>
          </select>
        </div>
        <div class="control-group" style="display:flex; align-items:center; gap:0.5rem; padding-top:1.5rem;">
          <input type="checkbox" id="slug-remove-stopwords" />
          <label for="slug-remove-stopwords" style="cursor:pointer; font-size:0.9rem;">Remove Common Stopwords (a, the, in, for...)</label>
        </div>
      </div>
      <div id="slug-res-card" style="display:none; margin-top:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated URL Slug</label>
          <button class="button secondary" id="copy-slug-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Slug</button>
        </div>
        <input class="tool-textarea" id="slug-output" type="text" readonly style="font-family:monospace; font-weight:700; color:var(--green-dark);" />
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('slug-input');
  const sepEl = document.getElementById('slug-sep');
  const stopEl = document.getElementById('slug-remove-stopwords');
  const outEl = document.getElementById('slug-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-slug-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('slug-res-card');

  const STOP_WORDS = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were']);

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function generateSlug() {
    const raw = inEl.value.trim();
    if (!raw) {
      setMsg('Please enter a title or text to slugify.', true);
      resCard.style.display = 'none';
      return;
    }
    const sep = sepEl.value;
    let words = raw.toLowerCase()
      .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '') // remove diacritics
      .replace(/[^a-z0-9\\s-_]/g, '')
      .split(/[\\s-_]+/);

    if (stopEl.checked) {
      words = words.filter(w => w && !STOP_WORDS.has(w));
    } else {
      words = words.filter(Boolean);
    }

    const slug = words.join(sep);
    outEl.value = slug;
    resCard.style.display = 'block';
    setMsg('Generated clean URL slug.');
  }

  btn.addEventListener('click', generateSlug);
  inEl.addEventListener('input', generateSlug);
  sepEl.addEventListener('change', generateSlug);
  stopEl.addEventListener('change', generateSlug);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Slug copied to clipboard.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Type or paste your post title or headline into the input field.',
      'Choose your preferred word delimiter (hyphen is recommended for SEO by Google).',
      'Optionally enable the stopwords removal toggle to create ultra-short permalinks.',
      'Copy the generated slug directly into your CMS or URL router.'
    ],
    benefitTitle: 'SEO Best Practices for URL Slugs',
    benefitContent: 'Clean, descriptive, hyphen-separated URL slugs improve click-through rates (CTR) in search engine result pages (SERPs) and provide clear keyword context for both crawlers and users.',
    faqs: [
      { q: 'Why are hyphens preferred over underscores in URLs?', a: 'Google officially recommends hyphens (-) because their algorithms treat hyphens as word separators, whereas underscores (_) combine words together.' }
    ]
  },

  // 3. CSS Glassmorphism Generator
  {
    slug: 'css-glassmorphism-generator',
    name: 'CSS Glassmorphism Generator',
    description: 'Design modern frosted glass UI cards with customizable backdrop blur, transparency, border reflection, and copy-ready CSS code.',
    category: 'Developer',
    icon: 'code',
    keywords: ['css glassmorphism generator', 'frosted glass css generator', 'backdrop filter blur generator', 'glassmorphism ui builder', 'css glass effect generator'],
    order: 51,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Glassmorphism Design Controls',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="glass-blur">Blur Radius: <span id="glass-blur-val">12px</span></label>
          <input type="range" id="glass-blur" min="0" max="40" value="12" style="width:100%;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="glass-opacity">Glass Opacity: <span id="glass-opacity-val">0.25</span></label>
          <input type="range" id="glass-opacity" min="0.05" max="0.9" step="0.05" value="0.25" style="width:100%;" />
        </div>
        <div class="control-group">
          <label class="control-label" for="glass-border">Border Opacity: <span id="glass-border-val">0.3</span></label>
          <input type="range" id="glass-border" min="0" max="0.8" step="0.05" value="0.3" style="width:100%;" />
        </div>
      </div>
      <div style="margin-top:1.5rem; background:linear-gradient(135deg, #176b4d, #dff36a); padding:2rem; border-radius:16px; display:flex; justify-content:center; align-items:center;">
        <div id="glass-preview-box" style="width:100%; max-width:320px; padding:1.5rem; border-radius:16px; color:#18211d; text-align:center;">
          <h3 style="margin-top:0;">Frosted Glass Card</h3>
          <p style="margin-bottom:0; font-size:0.9rem;">Clean backdrop filter blur with modern frosted translucent aesthetics.</p>
        </div>
      </div>
      <div id="glass-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated CSS</label>
          <button class="button secondary" id="copy-glass-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy CSS</button>
        </div>
        <textarea class="tool-textarea" id="glass-css-output" rows="5" readonly style="font-family:monospace; font-size:0.88rem;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const blurEl = document.getElementById('glass-blur');
  const opEl = document.getElementById('glass-opacity');
  const borderEl = document.getElementById('glass-border');
  const blurVal = document.getElementById('glass-blur-val');
  const opVal = document.getElementById('glass-opacity-val');
  const borderVal = document.getElementById('glass-border-val');
  const previewBox = document.getElementById('glass-preview-box');
  const cssOut = document.getElementById('glass-css-output');
  const copyBtn = document.getElementById('copy-glass-btn');

  function updateGlass() {
    const b = blurEl.value;
    const o = opEl.value;
    const bo = borderEl.value;

    blurVal.textContent = b + 'px';
    opVal.textContent = o;
    borderVal.textContent = bo;

    const bg = 'rgba(255, 255, 255, ' + o + ')';
    const border = '1px solid rgba(255, 255, 255, ' + bo + ')';
    const backdrop = 'blur(' + b + 'px)';
    const shadow = '0 8px 32px 0 rgba(0, 0, 0, 0.18)';

    previewBox.style.background = bg;
    previewBox.style.backdropFilter = backdrop;
    previewBox.style.webkitBackdropFilter = backdrop;
    previewBox.style.border = border;
    previewBox.style.boxShadow = shadow;

    cssOut.value = [
      'background: ' + bg + ';',
      'backdrop-filter: ' + backdrop + ';',
      '-webkit-backdrop-filter: ' + backdrop + ';',
      'border: ' + border + ';',
      'box-shadow: ' + shadow + ';',
      'border-radius: 16px;'
    ].join('\\n');
  }

  blurEl.addEventListener('input', updateGlass);
  opEl.addEventListener('input', updateGlass);
  borderEl.addEventListener('input', updateGlass);

  updateGlass();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(cssOut.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(cssOut.value);
    }
  });
})();`,
    howToSteps: [
      'Adjust the Blur, Opacity, and Border Reflection sliders in real time.',
      'Check the live preview card against the vibrant background gradient.',
      'Copy the ready-to-use CSS declarations including cross-browser -webkit- prefixes.'
    ],
    benefitTitle: 'Cross-Browser Glassmorphism',
    benefitContent: 'Glassmorphism relies on the CSS backdrop-filter property. Including both standard backdrop-filter and -webkit-backdrop-filter ensures smooth compatibility across Safari, Chrome, Firefox, and Edge.',
    faqs: [
      { q: 'Is backdrop-filter supported in all modern browsers?', a: 'Yes, backdrop-filter is supported in over 97% of global browsers including Safari iOS, Chrome, Edge, and modern Firefox.' }
    ]
  },

  // 4. Standard Deviation & Variance Calculator
  {
    slug: 'standard-deviation-calculator',
    name: 'Standard Deviation Calculator',
    description: 'Calculate sample and population standard deviation, variance, mean, sum, count, and margin of error from any comma- or space-separated dataset.',
    category: 'Math',
    icon: 'text',
    keywords: ['standard deviation calculator', 'variance calculator', 'sample standard deviation', 'population standard deviation', 'statistics calculator', 'mean and standard deviation'],
    order: 52,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Data Input & Statistical Analysis',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sd-input">Enter Numbers (separated by commas, spaces, or newlines)</label>
        <textarea class="tool-textarea" id="sd-input" rows="4" placeholder="e.g. 10, 12, 23, 23, 16, 23, 21, 16"></textarea>
      </div>
      <div id="sd-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="sd-res-sample" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Sample Std Dev (s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sd-res-pop">-</span>
            <span class="stat-label">Population Std Dev (σ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sd-res-mean">-</span>
            <span class="stat-label">Mean (Average)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sd-res-var">-</span>
            <span class="stat-label">Sample Variance (s²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sd-res-count">-</span>
            <span class="stat-label">Sample Count (n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sd-res-sum">-</span>
            <span class="stat-label">Sum (Σx)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('sd-input');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('sd-res-card');
  const resSample = document.getElementById('sd-res-sample');
  const resPop = document.getElementById('sd-res-pop');
  const resMean = document.getElementById('sd-res-mean');
  const resVar = document.getElementById('sd-res-var');
  const resCount = document.getElementById('sd-res-count');
  const resSum = document.getElementById('sd-res-sum');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) {
      setMsg('Please enter numerical data to calculate standard deviation.', true);
      resCard.style.display = 'none';
      return;
    }

    const nums = raw.split(/[,\\s\\n]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2) {
      setMsg('Please provide at least 2 valid numbers.', true);
      resCard.style.display = 'none';
      return;
    }

    const n = nums.length;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / n;

    const sqDiffs = nums.map(x => Math.pow(x - mean, 2));
    const sumSqDiffs = sqDiffs.reduce((a, b) => a + b, 0);

    const sampleVar = sumSqDiffs / (n - 1);
    const popVar = sumSqDiffs / n;

    const sampleSD = Math.sqrt(sampleVar);
    const popSD = Math.sqrt(popVar);

    resSample.textContent = sampleSD.toFixed(4);
    resPop.textContent = popSD.toFixed(4);
    resMean.textContent = mean.toFixed(4);
    resVar.textContent = sampleVar.toFixed(4);
    resCount.textContent = n.toString();
    resSum.textContent = sum.toFixed(2);

    resCard.style.display = 'block';
    setMsg('Statistical metrics calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Paste your dataset (numbers separated by commas, spaces, or tabs).',
      'Click <strong>Calculate</strong> to inspect both sample standard deviation (Bessel\'s correction n-1) and population standard deviation (n).',
      'Review additional stats including Mean, Sum, and Variance.'
    ],
    benefitTitle: 'Sample vs Population Standard Deviation',
    benefitContent: 'Use Sample Standard Deviation (s) with divisor (n-1) when your data represents a sample of a wider population to prevent underestimating variance. Use Population Standard Deviation (σ) with divisor (n) when your dataset encompasses the entire population.',
    faqs: [
      { q: 'What is the standard deviation formula?', a: 'Sample SD = sqrt(sum((x - mean)^2) / (n - 1))' }
    ]
  },

  // 5. Permutation and Combination Calculator
  {
    slug: 'permutation-combination-calculator',
    name: 'Permutation and Combination Calculator',
    description: 'Calculate permutations (nPr) and combinations (nCr) with step-by-step factorial formulas and instant probability computation.',
    category: 'Math',
    icon: 'text',
    keywords: ['permutation and combination calculator', 'npr calculator', 'ncr calculator', 'combinatorics calculator', 'permutations formula', 'combinations online'],
    order: 53,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Combinatorics Inputs (n and r)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ncr-n">Total Items (n)</label>
          <input class="tool-textarea" id="ncr-n" type="number" min="0" max="170" placeholder="e.g. 10" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ncr-r">Items Chosen (r)</label>
          <input class="tool-textarea" id="ncr-r" type="number" min="0" max="170" placeholder="e.g. 3" />
        </div>
      </div>
      <div id="ncr-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ncr-res-comb" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Combinations (nCr) - Order Doesn't Matter</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ncr-res-perm" style="font-weight:800;">-</span>
            <span class="stat-label">Permutations (nPr) - Order Matters</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('ncr-n');
  const rEl = document.getElementById('ncr-r');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('ncr-res-card');
  const resComb = document.getElementById('ncr-res-comb');
  const resPerm = document.getElementById('ncr-res-perm');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function factorial(num) {
    let res = 1n;
    for (let i = 2n; i <= BigInt(num); i++) res *= i;
    return res;
  }

  btn.addEventListener('click', () => {
    const n = parseInt(nEl.value, 10);
    const r = parseInt(rEl.value, 10);

    if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) {
      setMsg('Please enter valid integers where n >= 0, r >= 0, and r <= n.', true);
      resCard.style.display = 'none';
      return;
    }

    try {
      const factN = factorial(n);
      const factNR = factorial(n - r);
      const factR = factorial(r);

      const nPr = factN / factNR;
      const nCr = nPr / factR;

      resComb.textContent = nCr.toLocaleString();
      resPerm.textContent = nPr.toLocaleString();

      resCard.style.display = 'block';
      setMsg('Permutations and Combinations calculated successfully.');
    } catch (e) {
      setMsg('Values too large for computation.', true);
    }
  });

  clearBtn.addEventListener('click', () => {
    nEl.value = ''; rEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the total number of items (n).',
      'Enter the number of items to select (r).',
      'Click <strong>Calculate</strong> to inspect total permutations (nPr) and combinations (nCr).'
    ],
    benefitTitle: 'Permutation vs Combination',
    benefitContent: 'A Permutation is an arrangement of items where sequence/order is significant (e.g. locker lock combinations, race positions). A Combination is a selection of items where order does not matter (e.g. lottery numbers, card hands).',
    faqs: [
      { q: 'What is the formula for nCr?', a: 'nCr = n! / (r! × (n - r)!)' },
      { q: 'What is the formula for nPr?', a: 'nPr = n! / (n - r)!' }
    ]
  }
];

toolsBatch.forEach(createTool);
console.log('Batch suite 1 complete.');
