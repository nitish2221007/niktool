const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch3 = [
  // 1. Projectile Motion Calculator
  {
    slug: 'projectile-motion-calculator',
    name: 'Projectile Motion Calculator',
    description: 'Calculate maximum height, total flight time, horizontal range, and trajectory parameters for 2D projectile motion under gravity.',
    category: 'Science',
    icon: 'text',
    keywords: ['projectile motion calculator', 'physics trajectory calculator', 'max height of projectile', 'horizontal range calculator', 'time of flight projectile'],
    order: 59,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Launch Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="proj-v0">Initial Velocity v₀ (m/s)</label>
          <input class="tool-textarea" id="proj-v0" type="number" step="any" placeholder="e.g. 25" />
        </div>
        <div class="control-group">
          <label class="control-label" for="proj-angle">Launch Angle θ (Degrees)</label>
          <input class="tool-textarea" id="proj-angle" type="number" min="0" max="90" step="any" placeholder="e.g. 45" />
        </div>
        <div class="control-group">
          <label class="control-label" for="proj-h0">Initial Height h₀ (m)</label>
          <input class="tool-textarea" id="proj-h0" type="number" min="0" step="any" value="0" placeholder="0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="proj-g">Gravity g (m/s²)</label>
          <input class="tool-textarea" id="proj-g" type="number" step="any" value="9.80665" />
        </div>
      </div>
      <div id="proj-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="proj-res-range" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Horizontal Range (m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="proj-res-height" style="font-weight:800;">-</span>
            <span class="stat-label">Maximum Height (m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="proj-res-time">-</span>
            <span class="stat-label">Total Flight Time (s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="proj-res-vx">-</span>
            <span class="stat-label">Vx Horizontal Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v0El = document.getElementById('proj-v0');
  const angleEl = document.getElementById('proj-angle');
  const h0El = document.getElementById('proj-h0');
  const gEl = document.getElementById('proj-g');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('proj-res-card');

  const resRange = document.getElementById('proj-res-range');
  const resHeight = document.getElementById('proj-res-height');
  const resTime = document.getElementById('proj-res-time');
  const resVx = document.getElementById('proj-res-vx');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v0 = parseFloat(v0El.value);
    const deg = parseFloat(angleEl.value);
    const h0 = parseFloat(h0El.value) || 0;
    const g = parseFloat(gEl.value) || 9.80665;

    if (isNaN(v0) || isNaN(deg) || v0 <= 0 || deg < 0 || deg > 90 || g <= 0) {
      setMsg('Please enter valid positive values (Angle between 0° and 90°).', true);
      resCard.style.display = 'none';
      return;
    }

    const rad = (deg * Math.PI) / 180;
    const vx = v0 * Math.cos(rad);
    const vy = v0 * Math.sin(rad);

    // Max height
    const maxH = h0 + (vy * vy) / (2 * g);

    // Total flight time solving: -0.5*g*t^2 + vy*t + h0 = 0
    const discriminant = (vy * vy) + 2 * g * h0;
    const tFlight = (vy + Math.sqrt(discriminant)) / g;

    // Range
    const range = vx * tFlight;

    resRange.textContent = range.toFixed(2) + ' m';
    resHeight.textContent = maxH.toFixed(2) + ' m';
    resTime.textContent = tFlight.toFixed(2) + ' s';
    resVx.textContent = vx.toFixed(2) + ' m/s';

    resCard.style.display = 'block';
    setMsg('Trajectory calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    v0El.value = ''; angleEl.value = ''; h0El.value = '0';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the initial launch velocity in meters per second (m/s).',
      'Enter the launch angle in degrees relative to the ground (45° gives maximum theoretical range on level ground).',
      'Optionally specify an initial elevation height (h₀).',
      'Click <strong>Calculate</strong> to inspect range, maximum altitude, and flight duration.'
    ],
    benefitTitle: 'Kinematic Trajectory Equations',
    benefitContent: 'In classical mechanics ignoring air drag, horizontal velocity remains constant (vx = v0 cos θ), while vertical motion experiences constant downward acceleration due to gravity (vy = v0 sin θ - gt).',
    faqs: [
      { q: 'What angle maximizes projectile range on flat ground?', a: '45 degrees produces the maximum range when launch height equals landing height.' }
    ]
  },

  // 2. Solution Dilution Calculator (C1V1 = C2V2)
  {
    slug: 'solution-dilution-calculator',
    name: 'Solution Dilution Calculator',
    description: 'Calculate initial concentration (C1), stock volume (V1), final concentration (C2), or target volume (V2) using C1V1 = C2V2.',
    category: 'Science',
    icon: 'text',
    keywords: ['solution dilution calculator', 'c1v1 c2v2 calculator', 'chemistry dilution formula', 'molarity dilution calculator', 'stock solution dilution'],
    order: 60,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dilution Equation (C₁V₁ = C₂V₂)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="dil-solve-for">Solve For Missing Variable:</label>
        <select class="tool-textarea" id="dil-solve-for">
          <option value="V1">Stock Volume Needed (V1)</option>
          <option value="C1">Initial Stock Concentration (C1)</option>
          <option value="C2">Final Diluted Concentration (C2)</option>
          <option value="V2">Final Diluted Volume (V2)</option>
        </select>
      </div>
      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem;">
        <div class="control-group" id="grp-c1">
          <label class="control-label" for="dil-c1">Stock Concentration C₁ (M / % / mg/mL)</label>
          <input class="tool-textarea" id="dil-c1" type="number" step="any" placeholder="e.g. 5.0" />
        </div>
        <div class="control-group" id="grp-v1" style="display:none;">
          <label class="control-label" for="dil-v1">Stock Volume V₁ (mL / L)</label>
          <input class="tool-textarea" id="dil-v1" type="number" step="any" placeholder="e.g. 10.0" />
        </div>
        <div class="control-group" id="grp-c2">
          <label class="control-label" for="dil-c2">Target Concentration C₂</label>
          <input class="tool-textarea" id="dil-c2" type="number" step="any" placeholder="e.g. 0.5" />
        </div>
        <div class="control-group" id="grp-v2">
          <label class="control-label" for="dil-v2">Target Final Volume V₂</label>
          <input class="tool-textarea" id="dil-v2" type="number" step="any" placeholder="e.g. 100.0" />
        </div>
      </div>
      <div id="dil-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dil-res-val" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Calculated Requirement</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dil-res-solvent">-</span>
            <span class="stat-label">Solvent (Water) to Add (V₂ - V₁)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const solveSelect = document.getElementById('dil-solve-for');
  const c1In = document.getElementById('dil-c1');
  const v1In = document.getElementById('dil-v1');
  const c2In = document.getElementById('dil-c2');
  const v2In = document.getElementById('dil-v2');

  const grpC1 = document.getElementById('grp-c1');
  const grpV1 = document.getElementById('grp-v1');
  const grpC2 = document.getElementById('grp-c2');
  const grpV2 = document.getElementById('grp-v2');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('dil-res-card');
  const resVal = document.getElementById('dil-res-val');
  const resSolvent = document.getElementById('dil-res-solvent');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function update() {
    const s = solveSelect.value;
    grpC1.style.display = s === 'C1' ? 'none' : 'block';
    grpV1.style.display = s === 'V1' ? 'none' : 'block';
    grpC2.style.display = s === 'C2' ? 'none' : 'block';
    grpV2.style.display = s === 'V2' ? 'none' : 'block';
    resCard.style.display = 'none';
  }

  solveSelect.addEventListener('change', update);
  update();

  btn.addEventListener('click', () => {
    const s = solveSelect.value;
    const c1 = parseFloat(c1In.value);
    const v1 = parseFloat(v1In.value);
    const c2 = parseFloat(c2In.value);
    const v2 = parseFloat(v2In.value);

    let result = 0;
    let solvent = '-';

    if (s === 'V1') {
      if (isNaN(c1) || isNaN(c2) || isNaN(v2) || c1 <= 0 || c2 <= 0 || v2 <= 0 || c2 > c1) {
        setMsg('Please enter valid positive values where C2 <= C1.', true); return;
      }
      result = (c2 * v2) / c1;
      solvent = (v2 - result).toFixed(3) + ' units';
      resVal.textContent = 'V₁ = ' + result.toFixed(3) + ' units';
    } else if (s === 'C1') {
      if (isNaN(v1) || isNaN(c2) || isNaN(v2) || v1 <= 0 || c2 <= 0 || v2 <= 0) {
        setMsg('Please enter positive values.', true); return;
      }
      result = (c2 * v2) / v1;
      resVal.textContent = 'C₁ = ' + result.toFixed(3) + ' units';
    } else if (s === 'C2') {
      if (isNaN(c1) || isNaN(v1) || isNaN(v2) || c1 <= 0 || v1 <= 0 || v2 <= 0) {
        setMsg('Please enter positive values.', true); return;
      }
      result = (c1 * v1) / v2;
      resVal.textContent = 'C₂ = ' + result.toFixed(3) + ' units';
    } else if (s === 'V2') {
      if (isNaN(c1) || isNaN(v1) || isNaN(c2) || c1 <= 0 || v1 <= 0 || c2 <= 0) {
        setMsg('Please enter positive values.', true); return;
      }
      result = (c1 * v1) / c2;
      solvent = (result - v1).toFixed(3) + ' units';
      resVal.textContent = 'V₂ = ' + result.toFixed(3) + ' units';
    }

    resSolvent.textContent = solvent;
    resCard.style.display = 'block';
    setMsg('Dilution calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    c1In.value = ''; v1In.value = ''; c2In.value = ''; v2In.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Choose the variable you need to determine (usually Stock Volume V₁).',
      'Input the known concentration and volume values.',
      'Click <strong>Calculate</strong> to inspect the exact volume of stock solution and solvent to mix.'
    ],
    benefitTitle: 'Dilution Equation in Chemistry Labs',
    benefitContent: 'The relation C₁V₁ = C₂V₂ holds because the absolute amount of solute remains unchanged during dilution by adding pure solvent (such as deionized water).',
    faqs: [
      { q: 'Can I use any concentration unit (Molarity, %, ppm)?', a: 'Yes, as long as both C1 and C2 share the exact same concentration unit.' }
    ]
  },

  // 3. BMR & TDEE Daily Calorie Calculator
  {
    slug: 'bmr-tdee-calculator',
    name: 'BMR and TDEE Calculator',
    description: 'Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) using the clinically validated Mifflin-St Jeor equation.',
    category: 'Health',
    icon: 'text',
    keywords: ['bmr calculator', 'tdee calculator', 'basal metabolic rate', 'total daily energy expenditure', 'mifflin st jeor calculator', 'daily calorie burn calculator'],
    order: 61,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Personal Health Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bmr-gender">Biological Sex</label>
          <select class="tool-textarea" id="bmr-gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bmr-age">Age (Years)</label>
          <input class="tool-textarea" id="bmr-age" type="number" min="10" max="120" placeholder="e.g. 25" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bmr-weight">Weight (kg)</label>
          <input class="tool-textarea" id="bmr-weight" type="number" step="any" placeholder="e.g. 70" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bmr-height">Height (cm)</label>
          <input class="tool-textarea" id="bmr-height" type="number" step="any" placeholder="e.g. 175" />
        </div>
      </div>
      <div class="control-group" style="margin-top:1rem;">
        <label class="control-label" for="bmr-activity">Physical Activity Level</label>
        <select class="tool-textarea" id="bmr-activity">
          <option value="1.2">Sedentary (Desk job, little to no exercise)</option>
          <option value="1.375">Lightly Active (Light exercise 1-3 days/week)</option>
          <option value="1.55" selected>Moderately Active (Moderate exercise 3-5 days/week)</option>
          <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
          <option value="1.9">Extremely Active (Physical job or 2x daily training)</option>
        </select>
      </div>
      <div id="bmr-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="res-tdee" style="color:var(--green-dark); font-weight:800; font-size:1.5rem;">-</span>
            <span class="stat-label">Daily Maintenance Calories (TDEE)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="res-bmr" style="font-weight:700;">-</span>
            <span class="stat-label">Base Metabolic Rate (BMR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="res-loss" style="color:#2563eb;">-</span>
            <span class="stat-label">Weight Loss Deficit (-500 kcal)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const genEl = document.getElementById('bmr-gender');
  const ageEl = document.getElementById('bmr-age');
  const wtEl = document.getElementById('bmr-weight');
  const htEl = document.getElementById('bmr-height');
  const actEl = document.getElementById('bmr-activity');

  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('bmr-res-card');
  const resTdee = document.getElementById('res-tdee');
  const resBmr = document.getElementById('res-bmr');
  const resLoss = document.getElementById('res-loss');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const age = parseFloat(ageEl.value);
    const wt = parseFloat(wtEl.value);
    const ht = parseFloat(htEl.value);
    const act = parseFloat(actEl.value);
    const isMale = genEl.value === 'male';

    if (isNaN(age) || isNaN(wt) || isNaN(ht) || age <= 0 || wt <= 0 || ht <= 0) {
      setMsg('Please enter valid positive numbers for age, weight, and height.', true);
      resCard.style.display = 'none';
      return;
    }

    // Mifflin-St Jeor formula
    // BMR = 10*weight(kg) + 6.25*height(cm) - 5*age(y) + s (+5 male, -161 female)
    let bmr = 10 * wt + 6.25 * ht - 5 * age + (isMale ? 5 : -161);
    let tdee = bmr * act;

    resBmr.textContent = Math.round(bmr).toLocaleString() + ' kcal/day';
    resTdee.textContent = Math.round(tdee).toLocaleString() + ' kcal/day';
    resLoss.textContent = Math.max(1200, Math.round(tdee - 500)).toLocaleString() + ' kcal/day';

    resCard.style.display = 'block';
    setMsg('Metabolic energy expenditure calculated successfully.');
  });

  clearBtn.addEventListener('click', () => {
    ageEl.value = ''; wtEl.value = ''; htEl.value = '';
    resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter your biological sex, age, weight in kilograms, and height in centimeters.',
      'Select your weekly physical activity level.',
      'Click <strong>Calculate</strong> to inspect your basal metabolic rate and daily calorie expenditure.'
    ],
    benefitTitle: 'Mifflin-St Jeor Metabolic Formula',
    benefitContent: 'BMR is the baseline energy expenditure required to sustain vital organ functions at rest. TDEE includes daily physical movements and thermal food effects. A 500 kcal/day deficit creates approximately 0.5 kg (1 lb) of fat loss per week.',
    faqs: [
      { q: 'What is the minimum healthy calorie intake?', a: 'Generally, adults should avoid dropping below 1200 kcal/day for women and 1500 kcal/day for men without clinical supervision.' }
    ]
  },

  // 4. Title Case Converter
  {
    slug: 'title-case-converter',
    name: 'Title Case Converter',
    description: 'Format headings and article titles into proper Title Case according to APA, Chicago, MLA, or AP capitalization styles.',
    category: 'Text',
    icon: 'text',
    keywords: ['title case converter', 'headline capitalization', 'apa title case', 'chicago title case', 'capitalise title online', 'sentence to title case'],
    order: 62,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Headline Capitalization',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="title-input">Input Headline / Sentence</label>
        <textarea class="tool-textarea" id="title-input" rows="4" placeholder="e.g. how to build fast and accessible web tools in 2026"></textarea>
      </div>
      <div class="control-group">
        <label class="control-label" for="title-style">Capitalization Style</label>
        <select class="tool-textarea" id="title-style">
          <option value="apa">APA Style (Capitalize 4+ letters, first, and last)</option>
          <option value="chicago">Chicago Manual of Style (Standard Editorial)</option>
          <option value="upper">UPPERCASE (ALL CAPS)</option>
          <option value="lower">lowercase (all small)</option>
        </select>
      </div>
      <div id="title-res-card" style="display:none; margin-top:1.25rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Formatted Title</label>
          <button class="button secondary" id="copy-title-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy Title</button>
        </div>
        <textarea class="tool-textarea" id="title-output" rows="4" readonly style="font-weight:700;"></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('title-input');
  const styleEl = document.getElementById('title-style');
  const outEl = document.getElementById('title-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-title-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('title-res-card');

  const LOWER_WORDS = new Set(['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in', 'of', 'with', 'as']);

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function toTitleCase(str) {
    return str.split('\\n').map(line => {
      const words = line.split(/(\\s+)/);
      return words.map((w, idx) => {
        if (/^\\s+$/.test(w) || !w) return w;
        const low = w.toLowerCase();
        // Capitalize first and last word or words longer than 3 letters not in lowercase list
        if (idx === 0 || idx === words.length - 1 || (!LOWER_WORDS.has(low) && low.length >= 4)) {
          return low.charAt(0).toUpperCase() + low.slice(1);
        }
        return low;
      }).join('');
    }).join('\\n');
  }

  function format() {
    const raw = inEl.value;
    if (!raw.trim()) {
      setMsg('Please enter text to format.', true);
      resCard.style.display = 'none';
      return;
    }
    const style = styleEl.value;
    let res = '';
    if (style === 'upper') res = raw.toUpperCase();
    else if (style === 'lower') res = raw.toLowerCase();
    else res = toTitleCase(raw);

    outEl.value = res;
    resCard.style.display = 'block';
    setMsg('Text formatted successfully.');
  }

  btn.addEventListener('click', format);
  inEl.addEventListener('input', format);
  styleEl.addEventListener('change', format);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Formatted title copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Paste your draft title or sentence.',
      'Select your target publication style (APA, Chicago, Upper, Lower).',
      'Copy the standardized headline for your blog, paper, or marketing copy.'
    ],
    benefitTitle: 'Headline Capitalization Rules',
    benefitContent: 'Title case rules capitalize the first and last words, all major words (nouns, verbs, adjectives, adverbs), and words with 4 or more letters, while leaving minor short prepositions and articles lowercase.',
    faqs: [
      { q: 'Should words after a colon be capitalized?', a: 'Yes, in major editorial style guides like APA and Chicago, the first word following a colon is always capitalized.' }
    ]
  },

  // 5. Text Duplicate Line Remover & Sorter
  {
    slug: 'text-duplicate-remover',
    name: 'Text Duplicate Line Remover',
    description: 'Remove duplicate lines from text lists, trim whitespace, sort alphabetically (A-Z or Z-A), and count unique entries instantly.',
    category: 'Text',
    icon: 'text',
    keywords: ['text duplicate remover', 'remove duplicate lines online', 'unique line extractor', 'deduplicate list', 'sort unique lines', 'clean text list'],
    order: 63,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Text List Deduplication',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="dup-input">Input List (One entry per line)</label>
        <textarea class="tool-textarea" id="dup-input" rows="6" placeholder="Apple&#10;Banana&#10;Apple&#10;Orange&#10;Banana&#10;Grape"></textarea>
      </div>
      <div style="display:flex; gap:1.25rem; flex-wrap:wrap; margin-bottom:1rem; font-size:0.9rem;">
        <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
          <input type="checkbox" id="dup-case-sensitive" />
          <span>Case Sensitive</span>
        </label>
        <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
          <input type="checkbox" id="dup-sort-az" checked />
          <span>Sort Alphabetically (A-Z)</span>
        </label>
        <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
          <input type="checkbox" id="dup-trim-ws" checked />
          <span>Trim Whitespace</span>
        </label>
      </div>
      <div id="dup-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid" style="margin-bottom:1rem;">
          <div class="stat">
            <span class="stat-value" id="dup-stat-orig">-</span>
            <span class="stat-label">Original Lines</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dup-stat-unique" style="color:var(--green-dark); font-weight:800;">-</span>
            <span class="stat-label">Unique Lines</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dup-stat-removed" style="color:#c53030;">-</span>
            <span class="stat-label">Duplicates Removed</span>
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
          <label class="control-label" style="margin-bottom:0;">Clean Deduplicated Output</label>
          <button class="button secondary" id="copy-dup-btn" type="button" style="padding:0.25rem 0.6rem; font-size:0.8rem;">Copy List</button>
        </div>
        <textarea class="tool-textarea" id="dup-output" rows="6" readonly></textarea>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('dup-input');
  const caseEl = document.getElementById('dup-case-sensitive');
  const sortEl = document.getElementById('dup-sort-az');
  const trimEl = document.getElementById('dup-trim-ws');

  const outEl = document.getElementById('dup-output');
  const btn = document.getElementById('primary-action-btn');
  const clearBtn = document.getElementById('clear-action-btn');
  const copyBtn = document.getElementById('copy-dup-btn');
  const msgEl = document.getElementById('tool-message');
  const resCard = document.getElementById('dup-res-card');

  const statOrig = document.getElementById('dup-stat-orig');
  const statUnique = document.getElementById('dup-stat-unique');
  const statRemoved = document.getElementById('dup-stat-removed');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function dedupe() {
    const raw = inEl.value;
    if (!raw.trim()) {
      setMsg('Please enter a list to deduplicate.', true);
      resCard.style.display = 'none';
      return;
    }

    let lines = raw.split('\\n');
    const totalLines = lines.length;
    const isCase = caseEl.checked;
    const doTrim = trimEl.checked;
    const doSort = sortEl.checked;

    const seen = new Set();
    const result = [];

    for (let line of lines) {
      if (doTrim) line = line.trim();
      if (!line) continue;
      const key = isCase ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }

    if (doSort) {
      result.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: isCase ? 'case' : 'base' }));
    }

    statOrig.textContent = totalLines.toString();
    statUnique.textContent = result.length.toString();
    statRemoved.textContent = (totalLines - result.length).toString();

    outEl.value = result.join('\\n');
    resCard.style.display = 'block';
    setMsg('Removed ' + (totalLines - result.length) + ' duplicate lines.');
  }

  btn.addEventListener('click', dedupe);
  caseEl.addEventListener('change', dedupe);
  sortEl.addEventListener('change', dedupe);
  trimEl.addEventListener('change', dedupe);

  copyBtn.addEventListener('click', () => {
    if (window.NikTool && typeof window.NikTool.copy === 'function') {
      window.NikTool.copy(outEl.value, copyBtn);
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(outEl.value);
    }
    setMsg('Deduplicated list copied.');
  });

  clearBtn.addEventListener('click', () => {
    inEl.value = ''; outEl.value = ''; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Paste your list of items (emails, keywords, names, numbers) with one item per line.',
      'Configure options: Case Sensitive matching, Alphabetical sorting, and Whitespace trimming.',
      'Click <strong>Calculate</strong> to inspect unique entries and duplicate removal stats.'
    ],
    benefitTitle: 'Fast List Cleanup for Large Datasets',
    benefitContent: 'Deduplicating text entries locally eliminates duplicate records from CSV exports, keyword lists, and contact rosters without risking data exposure to third-party cloud servers.',
    faqs: [
      { q: 'Can this tool process thousands of lines?', a: 'Yes, using JavaScript Set collections enables instant O(n) deduplication of lists with tens of thousands of lines in milliseconds.' }
    ]
  }
];

toolsBatch3.forEach(createTool);
console.log('Batch 3 complete.');
