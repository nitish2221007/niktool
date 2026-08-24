const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch5 = [
  // 1. Binary to Text & Text to Binary Converter
  {
    slug: 'binary-to-text-converter',
    name: 'Binary to Text Converter',
    description: 'Convert ASCII and Unicode text to 8-bit binary code strings and decode binary 0s and 1s back into readable text instantly.',
    category: 'Developer',
    icon: 'code',
    keywords: ['binary to text converter', 'text to binary', 'binary translator online', 'ascii to binary', 'binary code to english', 'binary decoder'],
    order: 74,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Binary Code Converter',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="bin-input">Input (Text or 8-bit Binary Code)</label>
        <textarea class="tool-textarea" id="bin-input" rows="4" placeholder="Enter plain text (e.g. Hello) or binary bytes (e.g. 01001000 01100101 01101100)..."></textarea>
      </div>
      <div class="control-group">
        <label class="control-label" for="bin-mode">Conversion Direction</label>
        <select class="tool-textarea" id="bin-mode">
          <option value="text-to-bin">Text → 8-Bit Binary Code</option>
          <option value="bin-to-text">Binary Code → Plain Text</option>
        </select>
      </div>
      <div id="bin-res-card" style="display:none; margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Converted Result</label>
          <button class="button secondary" id="copy-bin-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Output</button>
        </div>
        <textarea class="tool-textarea" id="bin-output" rows="5" readonly style="font-family:monospace; font-size:0.95rem;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('bin-input'), modeEl = document.getElementById('bin-mode');
  const outEl = document.getElementById('bin-output'), btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn'), copyBtn = document.getElementById('copy-bin-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('bin-res-card');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function convert() {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter input to convert.', true); resCard.style.display = 'none'; return; }

    const mode = modeEl.value;
    if (mode === 'text-to-bin') {
      const bin = Array.from(new TextEncoder().encode(raw))
        .map(b => b.toString(2).padStart(8, '0')).join(' ');
      outEl.value = bin;
      setMsg('Text converted to binary bytes.');
    } else {
      const cleanBin = raw.replace(/[^01]/g, ' ').trim().split(/\\s+/);
      try {
        const bytes = new Uint8Array(cleanBin.map(b => parseInt(b, 2)));
        outEl.value = new TextDecoder().decode(bytes);
        setMsg('Binary converted to text.');
      } catch (e) {
        setMsg('Error decoding binary string.', true);
        return;
      }
    }
    resCard.style.display = 'block';
  }

  btn.addEventListener('click', convert);
  inEl.addEventListener('input', convert);
  modeEl.addEventListener('change', convert);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Result copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Type text into the input box or paste a series of binary octets (0s and 1s).',
      'Select the conversion direction (Text to Binary or Binary to Text).',
      'Click <strong>Calculate</strong> to inspect the result and copy it with 1 click.'
    ],
    benefitTitle: '8-Bit Byte Encoding',
    benefitContent: 'Every character in standard ASCII corresponds to a numerical byte value between 0 and 255 (e.g. "A" = 65 = 01000001 in binary).',
    faqs: [
      { q: 'What is the binary representation of letter A?', a: 'Capital letter A in ASCII is 01000001 (65 in decimal).' }
    ]
  },

  // 2. ROT13 & Caesar Cipher Tool
  {
    slug: 'rot13-caesar-cipher-tool',
    name: 'ROT13 & Caesar Cipher Tool',
    description: 'Encode and decode text using ROT13, ROT47, or custom Caesar cipher shift keys with instant bidirectional encryption.',
    category: 'Developer',
    icon: 'shield',
    keywords: ['rot13 cipher tool', 'caesar cipher decoder', 'rot13 online', 'rot47 encoder', 'caesar shift calculator', 'cryptography rot13'],
    order: 75,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Caesar & ROT13 Encryption',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="rot-input">Input Message</label>
        <textarea class="tool-textarea" id="rot-input" rows="4" placeholder="Enter message to encrypt or decrypt..."></textarea>
      </div>
      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rot-type">Cipher Type</label>
          <select class="tool-textarea" id="rot-type">
            <option value="13">ROT13 (Standard Letter Shift 13)</option>
            <option value="custom">Custom Caesar Shift (+N)</option>
          </select>
        </div>
        <div class="control-group" id="grp-rot-shift" style="display:none;">
          <label class="control-label" for="rot-shift-val">Shift Key (1 - 25)</label>
          <input class="tool-textarea" id="rot-shift-val" type="number" min="1" max="25" value="3" />
        </div>
      </div>
      <div id="rot-res-card" style="display:none; margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Cipher Output</label>
          <button class="button secondary" id="copy-rot-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Cipher</button>
        </div>
        <textarea class="tool-textarea" id="rot-output" rows="4" readonly style="font-family:monospace; font-weight:700;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('rot-input'), typeEl = document.getElementById('rot-type');
  const shiftEl = document.getElementById('rot-shift-val'), grpShift = document.getElementById('grp-rot-shift');
  const outEl = document.getElementById('rot-output'), btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn'), copyBtn = document.getElementById('copy-rot-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('rot-res-card');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  typeEl.addEventListener('change', () => {
    grpShift.style.display = typeEl.value === 'custom' ? 'block' : 'none';
    cipher();
  });

  function cipher() {
    const raw = inEl.value;
    if (!raw) { outEl.value = ''; resCard.style.display = 'none'; return; }

    const shift = typeEl.value === '13' ? 13 : (parseInt(shiftEl.value, 10) || 3) % 26;

    const res = raw.replace(/[a-zA-Z]/g, (c) => {
      const code = c.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const base = isUpper ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    });

    outEl.value = res;
    resCard.style.display = 'block';
    setMsg('Cipher generated successfully with shift key ' + shift + '.');
  }

  btn.addEventListener('click', cipher);
  inEl.addEventListener('input', cipher);
  shiftEl.addEventListener('input', cipher);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Cipher copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your text into the message box.',
      'Select ROT13 (standard symmetric substitution) or choose a custom shift key (e.g. Caesar shift +3).',
      'Copy the encoded cipher text.'
    ],
    benefitTitle: 'Symmetry of ROT13',
    benefitContent: 'Because the English alphabet has 26 letters, shifting by 13 is its own inverse: applying ROT13 twice restores the original text without requiring separate encryption and decryption algorithms.',
    faqs: [
      { q: 'Is ROT13 secure for passwords?', a: 'No, ROT13 is a simple obfuscation cipher for spoilers and puzzle games; it provides zero cryptographic security.' }
    ]
  },

  // 3. Aspect Ratio & Image Scaling Calculator
  {
    slug: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    description: 'Calculate image and video aspect ratios (16:9, 4:3, 21:9, 1:1) and automatically resize dimensions while preserving proportions.',
    category: 'Developer',
    icon: 'code',
    keywords: ['aspect ratio calculator', 'image dimension ratio', '16:9 aspect ratio calculator', 'image scaling calculator', 'video resolution aspect ratio'],
    order: 76,
    schemaCategory: 'DesignApplication',
    workspaceHeading: 'Aspect Ratio & Scaling Options',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ar-w1">Original Width (W1)</label>
          <input class="tool-textarea" id="ar-w1" type="number" step="any" value="1920" placeholder="1920" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-h1">Original Height (H1)</label>
          <input class="tool-textarea" id="ar-h1" type="number" step="any" value="1080" placeholder="1080" />
        </div>
      </div>
      <div style="margin-top:1rem; padding:1rem; background:var(--surface); border:1px solid var(--line); border-radius:12px;">
        <h4 style="margin:0 0 0.5rem;">New Scaled Dimensions</h4>
        <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="control-group" style="margin-bottom:0;">
            <label class="control-label" for="ar-w2">New Width (W2)</label>
            <input class="tool-textarea" id="ar-w2" type="number" step="any" placeholder="e.g. 1280" />
          </div>
          <div class="control-group" style="margin-bottom:0;">
            <label class="control-label" for="ar-h2">New Height (H2)</label>
            <input class="tool-textarea" id="ar-h2" type="number" step="any" placeholder="e.g. 720" />
          </div>
        </div>
      </div>
      <div id="ar-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ar-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">16:9</span>
            <span class="stat-label">Calculated Aspect Ratio</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ar-res-decimal">1.778</span>
            <span class="stat-label">Decimal Ratio (W / H)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const w1El = document.getElementById('ar-w1'), h1El = document.getElementById('ar-h1');
  const w2El = document.getElementById('ar-w2'), h2El = document.getElementById('ar-h2');
  const resRatio = document.getElementById('ar-res-ratio'), resDec = document.getElementById('ar-res-decimal');

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function updateRatio() {
    const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value);
    if (isNaN(w1) || isNaN(h1) || w1 <= 0 || h1 <= 0) return;

    const g = gcd(Math.round(w1), Math.round(h1));
    const simpleW = Math.round(w1) / g;
    const simpleH = Math.round(h1) / g;

    resRatio.textContent = simpleW + ':' + simpleH;
    resDec.textContent = (w1 / h1).toFixed(3);
  }

  w1El.addEventListener('input', () => {
    updateRatio();
    if (w2El.value) {
      const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value), w2 = parseFloat(w2El.value);
      if (w1 > 0 && h1 > 0 && w2 > 0) h2El.value = Math.round((w2 * h1) / w1);
    }
  });

  h1El.addEventListener('input', () => {
    updateRatio();
    if (w2El.value) {
      const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value), w2 = parseFloat(w2El.value);
      if (w1 > 0 && h1 > 0 && w2 > 0) h2El.value = Math.round((w2 * h1) / w1);
    }
  });

  w2El.addEventListener('input', () => {
    const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value), w2 = parseFloat(w2El.value);
    if (w1 > 0 && h1 > 0 && w2 > 0) {
      h2El.value = Math.round((w2 * h1) / w1);
    }
  });

  h2El.addEventListener('input', () => {
    const w1 = parseFloat(w1El.value), h1 = parseFloat(h1El.value), h2 = parseFloat(h2El.value);
    if (w1 > 0 && h1 > 0 && h2 > 0) {
      w2El.value = Math.round((h2 * w1) / h1);
    }
  });

  updateRatio();
})();`,
    howToSteps: [
      'Enter the original width and height in pixels (e.g. 1920 × 1080).',
      'Inspect the simplified aspect ratio (16:9).',
      'Enter a new target width or height in the second box to auto-calculate the proportional dimension.'
    ],
    benefitTitle: 'Standard Screen Aspect Ratios',
    benefitContent: 'Common aspect ratios include 16:9 (High-Definition TV & YouTube), 4:3 (Legacy TV & iPad displays), 21:9 (Ultrawide Cinema), 9:16 (Instagram Reels & TikTok videos), and 1:1 (Square social posts).',
    faqs: [
      { q: 'How is aspect ratio calculated?', a: 'Divide both width and height by their greatest common divisor (GCD).' }
    ]
  },

  // 4. Z-Score & Normal Distribution Calculator
  {
    slug: 'z-score-calculator',
    name: 'Z-Score Calculator',
    description: 'Calculate standard normal distribution Z-scores, percentile ranks, p-values, and probability area under the bell curve.',
    category: 'Math',
    icon: 'text',
    keywords: ['z-score calculator', 'standard normal distribution calculator', 'z score to percentile', 'p value from z score', 'normal curve probability'],
    order: 77,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Z-Score Inputs (x, μ, σ)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="z-raw">Raw Score (x)</label>
          <input class="tool-textarea" id="z-raw" type="number" step="any" placeholder="e.g. 85" />
        </div>
        <div class="control-group">
          <label class="control-label" for="z-mean">Population Mean (μ)</label>
          <input class="tool-textarea" id="z-mean" type="number" step="any" placeholder="e.g. 70" />
        </div>
        <div class="control-group">
          <label class="control-label" for="z-sd">Standard Deviation (σ)</label>
          <input class="tool-textarea" id="z-sd" type="number" step="any" placeholder="e.g. 10" />
        </div>
      </div>
      <div id="z-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="z-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Calculated Z-Score (z)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="z-res-pct" style="font-weight:700;">-</span>
            <span class="stat-label">Percentile Rank (P(X ≤ x))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="z-res-pval">-</span>
            <span class="stat-label">Right Tail P-Value (P(X &gt; x))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('z-raw'), muEl = document.getElementById('z-mean'), sdEl = document.getElementById('z-sd');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('z-res-card');
  const resZ = document.getElementById('z-res-val'), resPct = document.getElementById('z-res-pct'), resPval = document.getElementById('z-res-pval');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  // Approximation of cumulative standard normal distribution
  function normalCDF(z) {
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989422804014327 * Math.exp(-z * z / 2);
    const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
    return z > 0 ? 1 - p : p;
  }

  btn.addEventListener('click', () => {
    const x = parseFloat(xEl.value), mu = parseFloat(muEl.value), sd = parseFloat(sdEl.value);
    if (isNaN(x) || isNaN(mu) || isNaN(sd) || sd <= 0) {
      setMsg('Please enter valid numerical parameters (Standard Deviation must be > 0).', true);
      resCard.style.display = 'none'; return;
    }

    const z = (x - mu) / sd;
    const cdf = normalCDF(z);
    const pct = cdf * 100;
    const rightP = 1 - cdf;

    resZ.textContent = (z >= 0 ? '+' : '') + z.toFixed(4);
    resPct.textContent = pct.toFixed(2) + '%';
    resPval.textContent = rightP.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Z-score calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    xEl.value = ''; muEl.value = ''; sdEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your raw score (x), the population mean (μ), and standard deviation (σ).',
      'Click <strong>Calculate</strong> to inspect the Z-score and percentile rank under the normal curve.'
    ],
    benefitTitle: 'What Does a Z-Score Mean?',
    benefitContent: 'A Z-score indicates how many standard deviations an observation lies above or below the mean (z = (x - μ) / σ). A positive Z-score indicates a value above average, and a negative Z-score indicates a value below average.',
    faqs: [
      { q: 'What percentage falls within ±1 standard deviation?', a: 'In a normal distribution, approximately 68.27% of values fall within ±1 standard deviation, and 95.45% within ±2 standard deviations.' }
    ]
  },

  // 5. Freelance Hourly Rate to Annual Salary Calculator
  {
    slug: 'freelance-hourly-to-salary-calculator',
    name: 'Freelance Hourly Rate to Salary Calculator',
    description: 'Convert freelance hourly consulting rates into equivalent annual gross salary, monthly income, and estimated billable utilization.',
    category: 'Finance',
    icon: 'text',
    keywords: ['hourly to salary calculator', 'freelance rate calculator', 'hourly rate to annual salary', 'contractor salary calculator', 'consulting rate calculator'],
    order: 78,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Hourly Rate & Billable Hours',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hr-rate">Hourly Rate ($ / ₹ / €)</label>
          <input class="tool-textarea" id="hr-rate" type="number" step="any" placeholder="e.g. 50" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-hours">Billable Hours / Week</label>
          <input class="tool-textarea" id="hr-hours" type="number" step="any" value="30" placeholder="30" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-weeks">Working Weeks / Year</label>
          <input class="tool-textarea" id="hr-weeks" type="number" step="any" value="48" placeholder="48" />
        </div>
      </div>
      <div id="hr-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hr-res-annual" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Equivalent Annual Gross Revenue</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hr-res-monthly" style="font-weight:700;">-</span>
            <span class="stat-label">Monthly Gross Revenue</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hr-res-total-hours">-</span>
            <span class="stat-label">Total Annual Billable Hours</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rateEl = document.getElementById('hr-rate'), hrsEl = document.getElementById('hr-hours'), wksEl = document.getElementById('hr-weeks');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('hr-res-card');
  const resAnn = document.getElementById('hr-res-annual'), resMo = document.getElementById('hr-res-monthly'), resTot = document.getElementById('hr-res-total-hours');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const rate = parseFloat(rateEl.value);
    const hrs = parseFloat(hrsEl.value) || 30;
    const wks = parseFloat(wksEl.value) || 48;

    if (isNaN(rate) || rate <= 0 || hrs <= 0 || wks <= 0) {
      setMsg('Please enter valid positive numbers for rate and hours.', true);
      resCard.style.display = 'none'; return;
    }

    const totalHours = hrs * wks;
    const annual = rate * totalHours;
    const monthly = annual / 12;

    resAnn.textContent = '$' + Math.round(annual).toLocaleString();
    resMo.textContent = '$' + Math.round(monthly).toLocaleString() + ' / mo';
    resTot.textContent = totalHours.toLocaleString() + ' hrs';

    resCard.style.display = 'block';
    setMsg('Annual revenue equivalent calculated.');
  });

  clearBtn.addEventListener('click', () => {
    rateEl.value = ''; hrsEl.value = '30'; wksEl.value = '48'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your hourly consulting or freelance contracting rate.',
      'Enter estimated billable hours per week (freelancers typically average 25-35 billable hours due to admin overhead).',
      'Enter active working weeks per year (e.g. 48 weeks allows 4 weeks vacation/sick time).',
      'Click <strong>Calculate</strong> to inspect your annualized gross income.'
    ],
    benefitTitle: 'Freelance Billable Utilization Rule',
    benefitContent: 'Full-time standard employment assumes 2,080 hours (40 hrs × 52 weeks). However, independent contractors spend 25-30% of their time on unbillable client acquisition and invoicing, making 1,400 - 1,600 billable hours standard.',
    faqs: [
      { q: 'What is a good rule of thumb for hourly rate from salary?', a: 'A standard rule of thumb is to divide target annual salary by 1,000 (e.g. a $100k salary translates to a ~$100/hr freelance rate to account for taxes and healthcare).' }
    ]
  }
];

toolsBatch5.forEach(createTool);
console.log('Batch 5 complete.');
