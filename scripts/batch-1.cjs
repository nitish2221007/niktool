const { createTool } = require('./generate-curated-tools.cjs');

const tools = [
  // 1. CAGR Calculator
  {
    slug: 'cagr-calculator',
    name: 'CAGR Calculator',
    description: 'Calculate Compound Annual Growth Rate (CAGR), absolute return, and investment doubling time with annualized growth breakdown.',
    category: 'Finance',
    icon: 'text',
    keywords: ['cagr calculator', 'compound annual growth rate', 'annualized return calculator', 'investment cagr', 'mutual fund cagr', 'cagr formula online'],
    order: 45,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'CAGR Investment Parameters',
    controlsHtml: `      <div class="control-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div class="control-group">
          <label class="control-label" for="cagr-initial">Initial Investment Value ($ / ₹)</label>
          <input class="tool-textarea" id="cagr-initial" type="number" step="any" placeholder="e.g. 10000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cagr-final">Final / Current Value ($ / ₹)</label>
          <input class="tool-textarea" id="cagr-final" type="number" step="any" placeholder="e.g. 25000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cagr-years">Duration (Years)</label>
          <input class="tool-textarea" id="cagr-years" type="number" step="any" placeholder="e.g. 5" />
        </div>
      </div>
      <div id="cagr-result-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cagr-res-rate" style="color:var(--green-dark);">-</span>
            <span class="stat-label">CAGR (Annualized Rate)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cagr-res-total">-</span>
            <span class="stat-label">Absolute Total Return</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cagr-res-gain">-</span>
            <span class="stat-label">Total Wealth Gain</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const initEl = document.getElementById('cagr-initial');
  const finalEl = document.getElementById('cagr-final');
  const yearsEl = document.getElementById('cagr-years');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('cagr-result-card');
  const resRate = document.getElementById('cagr-res-rate');
  const resTotal = document.getElementById('cagr-res-total');
  const resGain = document.getElementById('cagr-res-gain');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v0 = parseFloat(initEl.value);
    const vn = parseFloat(finalEl.value);
    const t = parseFloat(yearsEl.value);

    if (isNaN(v0) || isNaN(vn) || isNaN(t) || v0 <= 0 || vn <= 0 || t <= 0) {
      setMsg('Please enter valid positive numbers for all fields.', true);
      resCard.style.display = 'none';
      return;
    }

    const cagr = (Math.pow(vn / v0, 1 / t) - 1) * 100;
    const absGain = vn - v0;
    const absPercent = ((vn - v0) / v0) * 100;

    resRate.textContent = cagr.toFixed(2) + '%';
    resTotal.textContent = (absPercent >= 0 ? '+' : '') + absPercent.toFixed(2) + '%';
    resGain.textContent = (absGain >= 0 ? '+' : '') + absGain.toLocaleString('en-US', { maximumFractionDigits: 2 });

    resCard.style.display = 'block';
    setMsg('CAGR calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    initEl.value = ''; finalEl.value = ''; yearsEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the initial starting value of the investment.',
      'Enter the ending or current portfolio value.',
      'Enter the time period in total years (e.g. 3.5 for 3 years and 6 months).',
      'Click <strong>Calculate</strong> to inspect the annual compound rate and total absolute growth.'
    ],
    benefitTitle: 'What is Compound Annual Growth Rate (CAGR)?',
    benefitContent: 'CAGR is the mean annual growth rate of an investment over a specified period of time longer than one year. It represents one of the most accurate ways to calculate and determine returns for anything that can rise or fall in value over time.',
    faqs: [
      { q: 'How is CAGR calculated?', a: 'CAGR = (Ending Value / Beginning Value)^(1 / Years) - 1' },
      { q: 'Why is CAGR better than absolute return?', a: 'Absolute return ignores the time factor. A 50% return in 2 years is drastically better than a 50% return over 10 years; CAGR normalizes this by annualizing performance.' }
    ]
  },

  // 2. Margin & Markup Calculator
  {
    slug: 'margin-markup-calculator',
    name: 'Margin & Markup Calculator',
    description: 'Calculate profit margin, markup percentage, gross profit, and selling price instantly for business pricing decisions.',
    category: 'Finance',
    icon: 'text',
    keywords: ['margin markup calculator', 'profit margin calculator', 'markup percentage calculator', 'gross profit calculator', 'pricing calculator', 'cost to selling price'],
    order: 46,
    schemaCategory: 'FinanceApplication',
    workspaceHeading: 'Pricing & Cost Parameters',
    controlsHtml: `      <div class="control-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div class="control-group">
          <label class="control-label" for="mm-cost">Cost Price (CP)</label>
          <input class="tool-textarea" id="mm-cost" type="number" step="any" placeholder="e.g. 50" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-revenue">Selling Price (SP) [Optional]</label>
          <input class="tool-textarea" id="mm-revenue" type="number" step="any" placeholder="e.g. 75" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-margin-input">Desired Margin % [Optional]</label>
          <input class="tool-textarea" id="mm-margin-input" type="number" step="any" placeholder="e.g. 33.33" />
        </div>
      </div>
      <div id="mm-result-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mm-res-margin" style="color:var(--green-dark);">-</span>
            <span class="stat-label">Profit Margin %</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mm-res-markup">-</span>
            <span class="stat-label">Markup %</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mm-res-profit">-</span>
            <span class="stat-label">Gross Profit ($ / ₹)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mm-res-sp">-</span>
            <span class="stat-label">Selling Price</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const costEl = document.getElementById('mm-cost');
  const revEl = document.getElementById('mm-revenue');
  const margInputEl = document.getElementById('mm-margin-input');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('mm-result-card');
  const resMargin = document.getElementById('mm-res-margin');
  const resMarkup = document.getElementById('mm-res-markup');
  const resProfit = document.getElementById('mm-res-profit');
  const resSp = document.getElementById('mm-res-sp');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const cp = parseFloat(costEl.value);
    let sp = parseFloat(revEl.value);
    const targetMargin = parseFloat(margInputEl.value);

    if (isNaN(cp) || cp <= 0) {
      setMsg('Please enter a valid positive Cost Price.', true);
      resCard.style.display = 'none';
      return;
    }

    if (isNaN(sp) && !isNaN(targetMargin)) {
      if (targetMargin >= 100) {
        setMsg('Margin must be strictly less than 100%.', true);
        return;
      }
      sp = cp / (1 - (targetMargin / 100));
    }

    if (isNaN(sp) || sp <= 0) {
      setMsg('Please enter either Selling Price or Desired Margin %.', true);
      resCard.style.display = 'none';
      return;
    }

    const profit = sp - cp;
    const margin = (profit / sp) * 100;
    const markup = (profit / cp) * 100;

    resMargin.textContent = margin.toFixed(2) + '%';
    resMarkup.textContent = markup.toFixed(2) + '%';
    resProfit.textContent = profit.toFixed(2);
    resSp.textContent = sp.toFixed(2);

    resCard.style.display = 'block';
    setMsg('Calculated pricing metrics successfully.');
  });

  clearBtn.addEventListener('click', () => {
    costEl.value = ''; revEl.value = ''; margInputEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the Cost Price of your product or service.',
      'Enter either your target Selling Price or desired Profit Margin percentage.',
      'Click <strong>Calculate</strong> to instantly view your gross profit, markup, and margin.'
    ],
    benefitTitle: 'Difference between Margin and Markup',
    benefitContent: 'Margin is the ratio of profit to revenue (Selling Price), whereas Markup is the percentage added on top of the Cost Price. For instance, a 50% markup on a $100 product gives a $150 selling price, which translates to a 33.33% margin.',
    faqs: [
      { q: 'What is the margin formula?', a: 'Margin = ((Selling Price - Cost) / Selling Price) × 100' },
      { q: 'What is the markup formula?', a: 'Markup = ((Selling Price - Cost) / Cost) × 100' }
    ]
  },

  // 3. Attendance Shortage & Recovery Calculator
  {
    slug: 'attendance-shortage-calculator',
    name: 'Attendance Shortage Calculator',
    description: 'Calculate how many consecutive classes you need to attend to recover 75%, 80%, or 85% college attendance criteria.',
    category: 'Academic',
    icon: 'text',
    keywords: ['attendance shortage calculator', 'attendance recovery calculator', '75 attendance calculator', 'college attendance bunk calculator', 'classes needed for 75 percent', 'student attendance planner'],
    order: 47,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Attendance Recovery Planner',
    controlsHtml: `      <div class="control-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
        <div class="control-group">
          <label class="control-label" for="att-attended">Classes Attended So Far</label>
          <input class="tool-textarea" id="att-attended" type="number" min="0" placeholder="e.g. 45" />
        </div>
        <div class="control-group">
          <label class="control-label" for="att-total">Total Classes Conducted</label>
          <input class="tool-textarea" id="att-total" type="number" min="1" placeholder="e.g. 70" />
        </div>
        <div class="control-group">
          <label class="control-label" for="att-target">Target Attendance %</label>
          <select class="tool-textarea" id="att-target">
            <option value="75">75% (Standard Criteria)</option>
            <option value="80">80%</option>
            <option value="85">85%</option>
            <option value="90">90%</option>
          </select>
        </div>
      </div>
      <div id="att-result-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="att-res-current" style="color:var(--green-dark);">-</span>
            <span class="stat-label">Current Attendance %</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="att-res-needed" style="font-weight:800;">-</span>
            <span class="stat-label">Classes Needed to Attend</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="att-res-bunk">-</span>
            <span class="stat-label">Safe Classes You Can Miss</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const attEl = document.getElementById('att-attended');
  const totEl = document.getElementById('att-total');
  const targEl = document.getElementById('att-target');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('att-result-card');
  const resCur = document.getElementById('att-res-current');
  const resNeed = document.getElementById('att-res-needed');
  const resBunk = document.getElementById('att-res-bunk');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const attended = parseInt(attEl.value, 10);
    const total = parseInt(totEl.value, 10);
    const target = parseFloat(targEl.value) / 100;

    if (isNaN(attended) || isNaN(total) || attended < 0 || total <= 0 || attended > total) {
      setMsg('Please enter valid attended and total class counts (Attended cannot exceed Total).', true);
      resCard.style.display = 'none';
      return;
    }

    const curPct = (attended / total) * 100;
    resCur.textContent = curPct.toFixed(1) + '%';

    if (curPct >= target * 100) {
      // Safe to miss classes
      const maxBunks = Math.floor((attended - target * total) / target);
      resNeed.textContent = '0 (Target Met!)';
      resNeed.style.color = '#22543d';
      resBunk.textContent = maxBunks.toString();
      setMsg('Great job! Your attendance is already above ' + (target * 100) + '%.');
    } else {
      // Need more classes
      const needed = Math.ceil((target * total - attended) / (1 - target));
      resNeed.textContent = needed.toString();
      resNeed.style.color = '#c53030';
      resBunk.textContent = '0 (Shortage)';
      setMsg('You need to attend ' + needed + ' more consecutive classes to reach ' + (target * 100) + '%.', true);
    }

    resCard.style.display = 'block';
  });

  clearBtn.addEventListener('click', () => {
    attEl.value = ''; totEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter how many classes you have attended so far.',
      'Enter the total number of classes conducted to date.',
      'Select your university minimum target percentage (e.g. 75% or 80%).',
      'Click <strong>Calculate</strong> to see your exact status and recover plan.'
    ],
    benefitTitle: 'Never Get Shortage or Detained',
    benefitContent: 'Most colleges mandate a 75% minimum attendance to appear for semester end exams. This tool calculates the exact number of consecutive lectures you must sit for to recover your eligibility without guesswork.',
    faqs: [
      { q: 'How is attendance shortage recovery calculated?', a: 'Formula: Needed Classes = ceil((Target% × Total - Attended) / (1 - Target%))' },
      { q: 'Is my student data stored?', a: 'No, all calculations run in your web browser.' }
    ]
  },

  // 4. Roman Numeral Converter
  {
    slug: 'roman-numeral-converter',
    name: 'Roman Numeral Converter',
    description: 'Convert numbers to Roman numerals and Roman numerals to numbers (1 to 3,999,999) with real-time bidirectional conversion.',
    category: 'Math',
    icon: 'text',
    keywords: ['roman numeral converter', 'roman numerals to numbers', 'arabic to roman numerals', 'roman numbers converter', 'number to roman numerals', 'math roman converter'],
    order: 48,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bidirectional Roman Converter',
    controlsHtml: `      <div class="control-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
        <div class="control-group">
          <label class="control-label" for="roman-arabic-input">Decimal Number (1 - 3999)</label>
          <input class="tool-textarea" id="roman-arabic-input" type="number" min="1" max="3999" placeholder="e.g. 2026" />
        </div>
        <div class="control-group">
          <label class="control-label" for="roman-str-input">Roman Numeral (e.g. MMXXVI)</label>
          <input class="tool-textarea" id="roman-str-input" type="text" placeholder="e.g. MMXXVI" style="text-transform: uppercase;" />
        </div>
      </div>
      <div id="roman-result-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="roman-res-val" style="color:var(--green-dark); font-family:monospace;">-</span>
            <span class="stat-label">Converted Result</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const numInput = document.getElementById('roman-arabic-input');
  const romInput = document.getElementById('roman-str-input');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('roman-result-card');
  const resVal = document.getElementById('roman-res-val');

  const ROMAN_MAP = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
  ];

  function toRoman(num) {
    let result = '';
    for (const [val, letter] of ROMAN_MAP) {
      while (num >= val) {
        result += letter;
        num -= val;
      }
    }
    return result;
  }

  function fromRoman(str) {
    const valMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    const s = str.toUpperCase().trim();
    let total = 0;
    for (let i = 0; i < s.length; i++) {
      const cur = valMap[s[i]];
      const next = valMap[s[i + 1]];
      if (!cur) return NaN;
      if (next && cur < next) {
        total -= cur;
      } else {
        total += cur;
      }
    }
    return total;
  }

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    if (numInput.value) {
      const num = parseInt(numInput.value, 10);
      if (isNaN(num) || num < 1 || num > 3999) {
        setMsg('Please enter an integer between 1 and 3999.', true);
        resCard.style.display = 'none';
        return;
      }
      const r = toRoman(num);
      romInput.value = r;
      resVal.textContent = num + ' = ' + r;
      resCard.style.display = 'block';
      setMsg('Converted to Roman numerals.');
    } else if (romInput.value.trim()) {
      const parsed = fromRoman(romInput.value);
      if (isNaN(parsed) || parsed < 1 || parsed > 3999) {
        setMsg('Invalid Roman numeral string.', true);
        resCard.style.display = 'none';
        return;
      }
      numInput.value = parsed.toString();
      resVal.textContent = romInput.value.toUpperCase() + ' = ' + parsed;
      resCard.style.display = 'block';
      setMsg('Converted to Arabic number.');
    } else {
      setMsg('Please enter either a number or a Roman numeral.', true);
      resCard.style.display = 'none';
    }
  });

  numInput.addEventListener('input', () => {
    const num = parseInt(numInput.value, 10);
    if (!isNaN(num) && num >= 1 && num <= 3999) {
      romInput.value = toRoman(num);
    }
  });

  romInput.addEventListener('input', () => {
    const parsed = fromRoman(romInput.value);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 3999) {
      numInput.value = parsed.toString();
    }
  });

  clearBtn.addEventListener('click', () => {
    numInput.value = ''; romInput.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter an ordinary decimal number (1 to 3999) or a Roman numeral (e.g. MCMLXXXIV).',
      'The tool dynamically updates the reciprocal box in real time.',
      'Click <strong>Calculate</strong> to display the confirmed mathematical equivalence.'
    ],
    benefitTitle: 'Standard Roman Numeral Rules',
    benefitContent: 'Roman numerals use combinations of letters from the Latin alphabet: I (1), V (5), X (10), L (50), C (100), D (500), and M (1000). Subtracting principles apply when smaller values precede larger values (e.g., IV = 4, IX = 9, XC = 90).',
    faqs: [
      { q: 'What is the largest standard Roman numeral?', a: 'In standard Roman notation without overline vinculum bars, 3999 (MMMCMXCIX) is the highest representation.' }
    ]
  }
];

tools.forEach(createTool);
console.log('Batch 1 complete.');
