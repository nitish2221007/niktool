const { createTool } = require('./generate-curated-tools.cjs');

const tools3 = [
  // 1. Arithmetic Series Sum Calculator
  {
    slug: 'arithmetic-series-sum-calculator',
    name: 'Arithmetic Series Sum Calculator',
    description: 'Calculate the nth term (an) and sum of arithmetic sequence progression (Sn = n/2 · (2a + (n-1)d)) with step-by-step expansion.',
    category: 'Math',
    icon: 'text',
    keywords: ['arithmetic series calculator', 'sum of ap calculator', 'nth term of arithmetic progression', 'arithmetic sequence sum online', 'gauss sum calculator'],
    order: 114,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'AP Series Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ap-a">First Term (a₁)</label>
          <input class="tool-textarea" id="ap-a" type="number" step="any" value="3" placeholder="e.g. 3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ap-d">Common Difference (d)</label>
          <input class="tool-textarea" id="ap-d" type="number" step="any" value="5" placeholder="e.g. 5" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ap-n">Number of Terms (n)</label>
          <input class="tool-textarea" id="ap-n" type="number" min="1" step="1" value="20" placeholder="e.g. 20" />
        </div>
      </div>
      <div id="ap-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ap-res-sum" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Sum of First n Terms (Sₙ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ap-res-last" style="font-weight:700;">-</span>
            <span class="stat-label">Last / Nth Term (aₙ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('ap-a'), dEl = document.getElementById('ap-d'), nEl = document.getElementById('ap-n');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('ap-res-card');
  const resSum = document.getElementById('ap-res-sum'), resLast = document.getElementById('ap-res-last');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const a = parseFloat(aEl.value), d = parseFloat(dEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(a) || isNaN(d) || isNaN(n) || n < 1) {
      setMsg('Please enter valid numbers (n must be integer >= 1).', true);
      resCard.style.display = 'none'; return;
    }

    const an = a + (n - 1) * d;
    const sn = (n / 2) * (2 * a + (n - 1) * d);

    resSum.textContent = sn.toLocaleString();
    resLast.textContent = an.toLocaleString();

    resCard.style.display = 'block';
    setMsg('Arithmetic series computed.');
  });

  clearBtn.addEventListener('click', () => {
    aEl.value = '3'; dEl.value = '5'; nEl.value = '20'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the starting first term (a₁).',
      'Enter the common difference (d) between consecutive terms.',
      'Enter the total number of terms (n).',
      'Click <strong>Calculate</strong> to inspect the total sum (Sₙ) and the nth term value.'
    ],
    benefitTitle: 'Gauss Arithmetic Summation Formula',
    benefitContent: 'Carl Friedrich Gauss discovered the arithmetic summation method pairing first and last terms: Sₙ = (n/2) × (a₁ + aₙ) = (n/2) × (2a₁ + (n-1)d).',
    faqs: [{ q: 'What is the sum of integers from 1 to 100?', a: 'S₁₀₀ = (100/2) × (1 + 100) = 50 × 101 = 5,050.' }]
  },

  // 2. Geometric Series & Infinite Sum Calculator
  {
    slug: 'geometric-series-sum-calculator',
    name: 'Geometric Series & Infinite Sum Calculator',
    description: 'Calculate the nth term, finite geometric series sum (Sn), and convergent infinite geometric series sum (S∞ = a / (1 - r)).',
    category: 'Math',
    icon: 'text',
    keywords: ['geometric series calculator', 'infinite geometric series sum', 'sum of gp calculator', 'geometric progression sum', 'convergent geometric series'],
    order: 115,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Geometric Progression Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gp-a">First Term (a₁)</label>
          <input class="tool-textarea" id="gp-a" type="number" step="any" value="1" placeholder="e.g. 1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gp-r">Common Ratio (r)</label>
          <input class="tool-textarea" id="gp-r" type="number" step="any" value="0.5" placeholder="e.g. 0.5" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gp-n">Number of Terms (n)</label>
          <input class="tool-textarea" id="gp-n" type="number" min="1" step="1" value="10" placeholder="e.g. 10" />
        </div>
      </div>
      <div id="gp-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gp-res-sum" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Finite Sum of n Terms (Sₙ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gp-res-inf" style="font-weight:700;">-</span>
            <span class="stat-label">Infinite Sum (S∞)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gp-res-last">-</span>
            <span class="stat-label">Nth Term (aₙ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('gp-a'), rEl = document.getElementById('gp-r'), nEl = document.getElementById('gp-n');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('gp-res-card');
  const resSum = document.getElementById('gp-res-sum'), resInf = document.getElementById('gp-res-inf'), resLast = document.getElementById('gp-res-last');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const a = parseFloat(aEl.value), r = parseFloat(rEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(a) || isNaN(r) || isNaN(n) || n < 1) {
      setMsg('Please enter valid numbers (n must be integer >= 1).', true);
      resCard.style.display = 'none'; return;
    }

    const an = a * Math.pow(r, n - 1);
    let sn = 0;
    if (r === 1) sn = a * n;
    else sn = a * (1 - Math.pow(r, n)) / (1 - r);

    let sinf = 'Divergent (|r| ≥ 1)';
    if (Math.abs(r) < 1) {
      sinf = (a / (1 - r)).toFixed(4);
    }

    resSum.textContent = sn.toFixed(4);
    resInf.textContent = sinf;
    resLast.textContent = an.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Geometric series computed.');
  });

  clearBtn.addEventListener('click', () => {
    aEl.value = '1'; rEl.value = '0.5'; nEl.value = '10'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the initial term (a₁).',
      'Enter the multiplier common ratio (r).',
      'Enter the number of terms (n).',
      'Click <strong>Calculate</strong> to inspect both finite series sum and convergent infinite sum.'
    ],
    benefitTitle: 'Convergence of Infinite Geometric Series',
    benefitContent: 'An infinite geometric series converges to a finite limit S∞ = a / (1 - r) if and only if the absolute common ratio is strictly less than 1 (|r| < 1). If |r| ≥ 1, the series diverges toward infinity.',
    faqs: [{ q: 'What is 1/2 + 1/4 + 1/8 + 1/16 + ... ?', a: 'With a = 0.5 and r = 0.5, S∞ = 0.5 / (1 - 0.5) = 1.0 exactly.' }]
  },

  // 3. Harmonic Mean Calculator
  {
    slug: 'harmonic-mean-calculator',
    name: 'Harmonic Mean Calculator',
    description: 'Calculate the harmonic mean of numbers, average trip speeds, financial P/E ratios, and rates of work with step-by-step reciprocal steps.',
    category: 'Math',
    icon: 'text',
    keywords: ['harmonic mean calculator', 'average speed calculator harmonic mean', 'harmonic average online', 'statistics harmonic mean', 'sub-contrary mean'],
    order: 116,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dataset Input (Rates & Speeds)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="hm-input">Enter Numbers (separated by commas or spaces)</label>
        <textarea class="tool-textarea" id="hm-input" rows="4" placeholder="e.g. 40, 60 (Round trip speeds)"></textarea>
      </div>
      <div id="hm-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hm-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Harmonic Mean (H)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hm-res-arithmetic">-</span>
            <span class="stat-label">Arithmetic Mean (Comparison)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('hm-input');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('hm-res-card');
  const resH = document.getElementById('hm-res-val'), resA = document.getElementById('hm-res-arithmetic');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter numbers.', true); resCard.style.display = 'none'; return; }

    const nums = raw.split(/[,\\s\\n]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2 || nums.some(n => n <= 0)) {
      setMsg('Please enter at least 2 strictly positive numbers (Harmonic mean is undefined for zero or negative values).', true);
      resCard.style.display = 'none'; return;
    }

    const n = nums.length;
    const sumReciprocals = nums.reduce((acc, val) => acc + (1 / val), 0);
    const hm = n / sumReciprocals;
    const am = nums.reduce((a, b) => a + b, 0) / n;

    resH.textContent = hm.toFixed(4);
    resA.textContent = am.toFixed(4);

    resCard.style.display = 'block';
    setMsg('Harmonic mean computed.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your dataset of speeds, rates, or ratios separated by commas.',
      'Click <strong>Calculate</strong> to inspect the true harmonic mean H = n / Σ(1/x).'
    ],
    benefitTitle: 'Why Use Harmonic Mean for Average Speed?',
    benefitContent: 'If you drive to a destination at 40 km/h and return along the same distance at 60 km/h, your average speed is NOT the simple average (50 km/h), but the Harmonic Mean: 2 / (1/40 + 1/60) = 48.0 km/h, because more time is spent driving at the slower speed.',
    faqs: [{ q: 'What is the relation between AM, GM, and HM?', a: 'For any positive numbers, the inequality AM ≥ GM ≥ HM always holds.' }]
  },

  // 4. Geometric Mean Calculator
  {
    slug: 'geometric-mean-calculator',
    name: 'Geometric Mean Calculator',
    description: 'Calculate the geometric mean G = (x₁ · x₂ · ... · xₙ)^(1/n) for compound investment returns, biology growth rates, and geometric scaling.',
    category: 'Math',
    icon: 'text',
    keywords: ['geometric mean calculator', 'calculate geometric mean online', 'compound average growth calculator', 'geometric average statistics', 'gm calculator'],
    order: 117,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Growth Rates & Multipliers Dataset',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="gm-input">Enter Numbers (separated by commas or spaces)</label>
        <textarea class="tool-textarea" id="gm-input" rows="4" placeholder="e.g. 1.10, 1.25, 0.90, 1.15 (Annual portfolio multipliers)"></textarea>
      </div>
      <div id="gm-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gm-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Geometric Mean (G)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gm-res-prod">-</span>
            <span class="stat-label">Total Product (Πx)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('gm-input');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('gm-res-card');
  const resG = document.getElementById('gm-res-val'), resP = document.getElementById('gm-res-prod');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter numbers.', true); resCard.style.display = 'none'; return; }

    const nums = raw.split(/[,\\s\\n]+/).map(Number).filter(n => !isNaN(n));
    if (nums.length < 2 || nums.some(n => n <= 0)) {
      setMsg('Please enter at least 2 strictly positive numbers.', true);
      resCard.style.display = 'none'; return;
    }

    const n = nums.length;
    // Use sum of logs to prevent numerical floating point overflow
    const sumLogs = nums.reduce((acc, val) => acc + Math.log(val), 0);
    const gm = Math.exp(sumLogs / n);
    const prod = nums.reduce((a, b) => a * b, 1);

    resG.textContent = gm.toFixed(4);
    resP.textContent = prod.toLocaleString('en-US', { maximumFractionDigits: 4 });

    resCard.style.display = 'block';
    setMsg('Geometric mean computed.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter growth multipliers or positive numbers separated by commas.',
      'Click <strong>Calculate</strong> to inspect the compound nth root geometric mean.'
    ],
    benefitTitle: 'Why Use Geometric Mean in Finance?',
    benefitContent: 'When averaging percentage changes or investment returns over multiple years, the geometric mean correctly captures compounding without upward arithmetic bias.',
    faqs: [{ q: 'What is the geometric mean of 4 and 9?', a: 'G = √(4 × 9) = √36 = 6.0.' }]
  },

  // 5. Cross Multiplication Ratio Solver (a/b = c/x)
  {
    slug: 'cross-multiplication-ratio-calculator',
    name: 'Cross Multiplication & Ratio Calculator',
    description: 'Solve proportions and cross multiplication equations (A / B = C / X) instantly for scale models, recipe conversions, and algebra.',
    category: 'Math',
    icon: 'text',
    keywords: ['cross multiplication calculator', 'proportion solver online', 'ratio cross multiply calculator', 'solve for x proportion', 'algebra cross multiplication'],
    order: 118,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Proportion Equation (A / B = C / X)',
    controlsHtml: `      <div style="display:flex; justify-content:center; align-items:center; gap:0.75rem; flex-wrap:wrap; font-size:1.4rem; font-weight:700; margin:1rem 0;">
        <div style="display:inline-flex; flex-direction:column; width:90px; text-align:center;">
          <input class="tool-textarea" id="cm-a" type="number" step="any" value="4" placeholder="A" style="text-align:center;" />
          <hr style="border:none; border-top:2px solid var(--ink); margin:4px 0;" />
          <input class="tool-textarea" id="cm-b" type="number" step="any" value="10" placeholder="B" style="text-align:center;" />
        </div>
        <span>=</span>
        <div style="display:inline-flex; flex-direction:column; width:90px; text-align:center;">
          <input class="tool-textarea" id="cm-c" type="number" step="any" value="6" placeholder="C" style="text-align:center;" />
          <hr style="border:none; border-top:2px solid var(--ink); margin:4px 0;" />
          <input class="tool-textarea" id="cm-x" type="text" value="?" readonly style="text-align:center; font-weight:800; color:var(--green-dark); background:var(--surface);" />
        </div>
      </div>
      <div id="cm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cm-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">X = 15.00</span>
            <span class="stat-label">Unknown Variable (X = (B · C) / A)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('cm-a'), bEl = document.getElementById('cm-b'), cEl = document.getElementById('cm-c');
  const xEl = document.getElementById('cm-x'), resVal = document.getElementById('cm-res-val');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value), c = parseFloat(cEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      xEl.value = '?'; resVal.textContent = '-'; return;
    }

    // A / B = C / X => X = (B * C) / A
    const x = (b * c) / a;
    xEl.value = Number.isInteger(x) ? x.toString() : x.toFixed(3);
    resVal.textContent = 'X = ' + (Number.isInteger(x) ? x : x.toFixed(3));
  }

  [aEl, bEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter the values for A, B, and C in the fraction proportion matrix.',
      'The tool automatically solves for the missing variable X = (B × C) / A.'
    ],
    benefitTitle: 'Cross Multiplication Rule',
    benefitContent: 'Cross multiplication relies on the equality of fractions: if a/b = c/d, then a·d = b·c. Dividing by a yields the unknown denominator d = (b·c)/a.',
    faqs: [{ q: 'If 4 apples cost $10, how much do 6 apples cost?', a: '4/10 = 6/X => X = (10 × 6) / 4 = $15.' }]
  }
];

tools3.forEach(createTool);
console.log('Mega pack 3 complete.');
