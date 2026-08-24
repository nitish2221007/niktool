const { createTool } = require('./generate-curated-tools.cjs');

const tools4 = [
  // 1. Voltage Divider Calculator
  {
    slug: 'voltage-divider-calculator',
    name: 'Voltage Divider Calculator',
    description: 'Calculate output voltage (Vout = Vin · R₂ / (R₁ + R₂)), current draw, and resistor power dissipation for resistor potential divider circuits.',
    category: 'Science',
    icon: 'text',
    keywords: ['voltage divider calculator', 'potential divider calculator', 'resistor voltage divider', 'calculate output voltage divider', 'vin vout r1 r2 calculator'],
    order: 119,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Voltage Divider Circuit Components',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vd-vin">Input Voltage (Vin) [Volts]</label>
          <input class="tool-textarea" id="vd-vin" type="number" step="any" value="12" placeholder="e.g. 12V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vd-r1">Resistor R₁ (Top) [Ohms]</label>
          <input class="tool-textarea" id="vd-r1" type="number" step="any" value="10000" placeholder="e.g. 10000 Ω (10k)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vd-r2">Resistor R₂ (Bottom) [Ohms]</label>
          <input class="tool-textarea" id="vd-r2" type="number" step="any" value="10000" placeholder="e.g. 10000 Ω (10k)" />
        </div>
      </div>
      <div id="vd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vd-res-vout" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">6.00 V</span>
            <span class="stat-label">Output Voltage (Vout)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vd-res-current">0.60 mA</span>
            <span class="stat-label">Divider Quiescent Current</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vd-res-ratio">0.500</span>
            <span class="stat-label">Division Ratio (Vout / Vin)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vinEl = document.getElementById('vd-vin'), r1El = document.getElementById('vd-r1'), r2El = document.getElementById('vd-r2');
  const voutEl = document.getElementById('vd-res-vout'), curEl = document.getElementById('vd-res-current'), ratEl = document.getElementById('vd-res-ratio');

  function update() {
    const vin = parseFloat(vinEl.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(vin) || isNaN(r1) || isNaN(r2) || r1 < 0 || r2 < 0 || (r1 + r2) <= 0) return;

    // Vout = Vin * (R2 / (R1 + R2))
    const vout = vin * (r2 / (r1 + r2));
    const currentA = vin / (r1 + r2);
    const currentMa = currentA * 1000;
    const ratio = r2 / (r1 + r2);

    voutEl.textContent = vout.toFixed(2) + ' V';
    curEl.textContent = currentMa >= 1 ? currentMa.toFixed(2) + ' mA' : (currentMa * 1000).toFixed(1) + ' μA';
    ratEl.textContent = ratio.toFixed(3);
  }

  [vinEl, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter the supply input voltage (Vin).',
      'Enter the resistances of R₁ and R₂ in Ohms.',
      'Inspect the scaled output voltage across R₂.'
    ],
    benefitTitle: 'Resistive Voltage Divider Formula',
    benefitContent: 'A voltage divider produces an output voltage that is a fraction of its input: Vout = Vin × (R₂ / (R₁ + R₂)). When R₁ = R₂, Vout is exactly half of Vin.',
    faqs: [{ q: 'Can a voltage divider be used as a power supply?', a: 'No, connecting a heavy load in parallel with R₂ alters the effective resistance and sags Vout unless buffered by an op-amp follower.' }]
  },

  // 2. Parallel & Series Capacitors Calculator
  {
    slug: 'parallel-series-capacitor-calculator',
    name: 'Series & Parallel Capacitor Calculator',
    description: 'Calculate equivalent capacitance (C_total) for capacitors in parallel (C₁ + C₂ + ...) and capacitors in series (1/C_total = 1/C₁ + 1/C₂ + ...).',
    category: 'Science',
    icon: 'text',
    keywords: ['parallel capacitor calculator', 'series capacitor calculator', 'equivalent capacitance calculator', 'capacitors in series and parallel', 'total capacitance formula'],
    order: 120,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Capacitor List (μF / nF / pF)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="cap-input">Capacitor Values (comma or space separated)</label>
        <textarea class="tool-textarea" id="cap-input" rows="3" placeholder="e.g. 10, 22, 47 (all in same unit e.g. μF)"></textarea>
      </div>
      <div id="cap-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cap-res-parallel" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Parallel Equivalent (C_total = ΣC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cap-res-series" style="font-weight:700;">-</span>
            <span class="stat-label">Series Equivalent (1/C_total = Σ(1/C))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('cap-input');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('cap-res-card');
  const resP = document.getElementById('cap-res-parallel'), resS = document.getElementById('cap-res-series');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const raw = inEl.value.trim();
    if (!raw) { setMsg('Please enter capacitor values.', true); resCard.style.display = 'none'; return; }

    const caps = raw.split(/[,\\s\\n]+/).map(Number).filter(n => !isNaN(n));
    if (caps.length < 2 || caps.some(c => c <= 0)) {
      setMsg('Please enter at least 2 positive capacitor values.', true);
      resCard.style.display = 'none'; return;
    }

    const cParallel = caps.reduce((a, b) => a + b, 0);
    const sumRecip = caps.reduce((acc, c) => acc + (1 / c), 0);
    const cSeries = 1 / sumRecip;

    resP.textContent = cParallel.toFixed(3) + ' units';
    resS.textContent = cSeries.toFixed(3) + ' units';

    resCard.style.display = 'block';
    setMsg('Equivalent capacitance calculated.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter capacitor values separated by commas.',
      'Click <strong>Calculate</strong> to inspect total capacitance in parallel (additive) and series (reciprocal).'
    ],
    benefitTitle: 'Capacitor Rules vs Resistor Rules',
    benefitContent: 'Capacitors combine opposite to resistors: in parallel, plate surface area adds directly (C = C₁ + C₂), while in series, effective dielectric spacing increases (1/C = 1/C₁ + 1/C₂).',
    faqs: [{ q: 'What is the series capacitance of two identical 10 μF capacitors?', a: 'Two 10 μF capacitors in series yield exactly 5.0 μF.' }]
  },

  // 3. 555 Timer Astable Multivibrator Calculator
  {
    slug: '555-timer-astable-multivibrator-calculator',
    name: '555 Timer Astable Circuit Calculator',
    description: 'Calculate 555 timer oscillation frequency (Hz), high time (t1), low time (t2), and duty cycle percentage from R1, R2, and capacitor C.',
    category: 'Science',
    icon: 'text',
    keywords: ['555 timer calculator', '555 astable multivibrator calculator', '555 frequency duty cycle calculator', 'ne555 oscillator calculator', '555 timer pulse width'],
    order: 121,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '555 Astable Component Values',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="t5-r1">Resistor R₁ (kΩ)</label>
          <input class="tool-textarea" id="t5-r1" type="number" step="any" value="10" placeholder="10 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="t5-r2">Resistor R₂ (kΩ)</label>
          <input class="tool-textarea" id="t5-r2" type="number" step="any" value="47" placeholder="47 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="t5-c">Timing Capacitor C (μF)</label>
          <input class="tool-textarea" id="t5-c" type="number" step="any" value="0.1" placeholder="0.1 μF" />
        </div>
      </div>
      <div id="t5-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="t5-res-freq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Oscillation Frequency (f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="t5-res-duty" style="font-weight:700;">-</span>
            <span class="stat-label">Duty Cycle (%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="t5-res-period">-</span>
            <span class="stat-label">Total Period (T = t₁ + t₂)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('t5-r1'), r2El = document.getElementById('t5-r2'), cEl = document.getElementById('t5-c');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('t5-res-card');
  const resF = document.getElementById('t5-res-freq'), resD = document.getElementById('t5-res-duty'), resP = document.getElementById('t5-res-period');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const r1 = parseFloat(r1El.value) * 1000; // to Ohms
    const r2 = parseFloat(r2El.value) * 1000; // to Ohms
    const c = parseFloat(cEl.value) * 0.000001; // to Farads

    if (isNaN(r1) || isNaN(r2) || isNaN(c) || r1 <= 0 || r2 <= 0 || c <= 0) {
      setMsg('Please enter positive values for resistors and capacitor.', true);
      resCard.style.display = 'none'; return;
    }

    const t1 = 0.693 * (r1 + r2) * c; // High time
    const t2 = 0.693 * r2 * c; // Low time
    const T = t1 + t2;
    const freq = 1.44 / ((r1 + 2 * r2) * c);
    const duty = (t1 / T) * 100;

    resF.textContent = freq >= 1000 ? (freq / 1000).toFixed(2) + ' kHz' : freq.toFixed(2) + ' Hz';
    resD.textContent = duty.toFixed(1) + '% (High)';
    resP.textContent = T >= 1 ? T.toFixed(3) + ' s' : (T * 1000).toFixed(2) + ' ms';

    resCard.style.display = 'block';
    setMsg('555 oscillator parameters calculated.');
  });

  clearBtn.addEventListener('click', () => {
    r1El.value = '10'; r2El.value = '47'; cEl.value = '0.1'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter R₁ and R₂ in kilo-Ohms (kΩ).',
      'Enter timing capacitor C in microfarads (μF).',
      'Click <strong>Calculate</strong> to inspect the oscillation frequency and duty cycle percentage.'
    ],
    benefitTitle: 'NE555 Astable Formulas',
    benefitContent: 'In astable mode, the 555 timer continuously oscillates: Frequency f = 1.44 / ((R₁ + 2R₂) · C), with High Time t₁ = 0.693·(R₁+R₂)·C and Low Time t₂ = 0.693·R₂·C.',
    faqs: [{ q: 'Can a standard 555 timer achieve 50% duty cycle?', a: 'Placing a diode in parallel with R₂ allows independent charge and discharge paths to achieve an exact 50% square wave.' }]
  },

  // 4. Lorem Ipsum Dummy Text Generator
  {
    slug: 'lorem-ipsum-generator',
    name: 'Lorem Ipsum Dummy Text Generator',
    description: 'Generate customized placeholder Lorem Ipsum paragraphs, sentences, and words for UI web design, mockups, and typography testing.',
    category: 'Text',
    icon: 'text',
    keywords: ['lorem ipsum generator', 'dummy text generator', 'placeholder text generator', 'lorem ipsum paragraphs online', 'mockup text builder'],
    order: 122,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Placeholder Text Generator',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="li-count">Quantity</label>
          <input class="tool-textarea" id="li-count" type="number" min="1" max="50" value="3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="li-type">Generation Unit</label>
          <select class="tool-textarea" id="li-type">
            <option value="paragraphs" selected>Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>
      </div>
      <div id="li-res-card" style="margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Generated Lorem Text</label>
          <button class="button secondary" id="copy-li-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Text</button>
        </div>
        <textarea class="tool-textarea" id="li-output" rows="8" readonly></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const countEl = document.getElementById('li-count'), typeEl = document.getElementById('li-type'), outEl = document.getElementById('li-output');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn'), copyBtn = document.getElementById('copy-li-btn');
  const msgEl = document.getElementById('tool-message');

  const WORDS = ['lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'];

  function makeSentence() {
    const len = 8 + Math.floor(Math.random() * 8);
    const words = [];
    for (let i = 0; i < len; i++) {
      words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
    }
    const str = words.join(' ');
    return str.charAt(0).toUpperCase() + str.slice(1) + '.';
  }

  function makeParagraph() {
    const sCount = 4 + Math.floor(Math.random() * 3);
    const sens = [];
    for (let i = 0; i < sCount; i++) sens.push(makeSentence());
    return sens.join(' ');
  }

  function generate() {
    const count = Math.min(50, Math.max(1, parseInt(countEl.value, 10) || 3));
    const type = typeEl.value;

    let res = '';
    if (type === 'words') {
      const w = [];
      for (let i = 0; i < count; i++) w.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      res = w.join(' ');
    } else if (type === 'sentences') {
      const s = [];
      for (let i = 0; i < count; i++) s.push(makeSentence());
      res = s.join(' ');
    } else {
      const p = [];
      for (let i = 0; i < count; i++) p.push(makeParagraph());
      res = p.join('\\n\\n');
    }

    outEl.value = res;
    msgEl.textContent = 'Generated ' + count + ' ' + type + '.';
  }

  btn.addEventListener('click', generate);
  typeEl.addEventListener('change', generate);
  countEl.addEventListener('input', generate);
  generate();

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    msgEl.textContent = 'Lorem Ipsum copied to clipboard.';
  });

  clearBtn.addEventListener('click', () => {
    outEl.value = '';
    msgEl.textContent = 'Ready. Enter parameters above.';
  });
})();`,
    howToSteps: [
      'Select generation unit: Paragraphs, Sentences, or Words.',
      'Enter the quantity.',
      'Copy placeholder dummy text directly into your web design mockup.'
    ],
    benefitTitle: 'History of Lorem Ipsum',
    benefitContent: 'Originating from sections 1.10.32 and 1.10.33 of Cicero\'s "De Finibus Bonorum et Malorum" (45 BC), Lorem Ipsum provides natural Latin-like letter distribution that prevents graphic layout distractions.',
    faqs: [{ q: 'Why not use repeated "Text here text here"?', a: 'Lorem Ipsum mimics authentic English word lengths and sentence rhythms far more naturally than repeated phrase patterns.' }]
  },

  // 5. Case Converter (camelCase, PascalCase, snake_case, kebab-case)
  {
    slug: 'case-kebab-camel-snake-converter',
    name: 'Naming Case Converter (camel, snake, kebab)',
    description: 'Transform variable names and text strings between camelCase, PascalCase, snake_case, kebab-case, and CONSTANT_CASE instantly.',
    category: 'Developer',
    icon: 'code',
    keywords: ['case converter programming', 'camelcase to snake_case', 'kebab case converter', 'pascalcase converter', 'constant case online converter'],
    order: 123,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Variable & String Case Transformation',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="case-input">Input Variable or Sentence</label>
        <input class="tool-textarea" id="case-input" type="text" value="user_profile_first_name" placeholder="e.g. user_profile_first_name or Get User Profile" />
      </div>
      <div id="case-res-card" style="margin-top:1.25rem;">
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem; font-family:monospace;">
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.6rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>camelCase:</strong> <span id="res-camel" style="color:var(--green-dark); font-weight:700;">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.6rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>PascalCase:</strong> <span id="res-pascal" style="font-weight:700;">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.6rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>snake_case:</strong> <span id="res-snake">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.6rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>kebab-case:</strong> <span id="res-kebab">-</span>
          </div>
          <div style="display:grid; grid-template-columns:140px 1fr; gap:0.6rem; padding:0.35rem 0;">
            <strong>CONSTANT_CASE:</strong> <span id="res-constant">-</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('case-input');
  const camelEl = document.getElementById('res-camel'), pascalEl = document.getElementById('res-pascal');
  const snakeEl = document.getElementById('res-snake'), kebabEl = document.getElementById('res-kebab'), constEl = document.getElementById('res-constant');

  function splitWords(str) {
    return str
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .trim()
      .toLowerCase()
      .split(/\\s+/)
      .filter(Boolean);
  }

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const words = splitWords(raw);
    if (words.length === 0) return;

    const camel = words[0] + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const pascal = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    const snake = words.join('_');
    const kebab = words.join('-');
    const constCase = words.join('_').toUpperCase();

    camelEl.textContent = camel;
    pascalEl.textContent = pascal;
    snakeEl.textContent = snake;
    kebabEl.textContent = kebab;
    constEl.textContent = constCase;
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter any identifier (camelCase, snake_case, PascalCase, or sentence).',
      'Inspect the simultaneous transformation across all 5 programming casing conventions.'
    ],
    benefitTitle: 'Programming Naming Conventions',
    benefitContent: 'JavaScript & Java prefer camelCase for variables and PascalCase for classes. Python & Rust prefer snake_case, while HTML/CSS & URLs prefer kebab-case.',
    faqs: [{ q: 'What is CONSTANT_CASE used for?', a: 'Global immutable constants in C, Java, and Python (e.g. MAX_BUFFER_SIZE).' }]
  }
];

tools4.forEach(createTool);
console.log('Mega pack 4 complete.');
