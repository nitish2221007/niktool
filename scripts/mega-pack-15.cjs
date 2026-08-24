const { createTool } = require('./generate-curated-tools.cjs');

const tools15 = [
  // 1. Karvonen Target Heart Rate Zones Calculator
  {
    slug: 'target-heart-rate-karvonen-calculator',
    name: 'Karvonen Target Heart Rate Zones Calculator',
    description: 'Calculate personalized exercise heart rate training zones (Warm-up, Fat Burn, Aerobic, Anaerobic, VO2 Max) using the clinical Karvonen formula.',
    category: 'Health',
    icon: 'text',
    keywords: ['karvonen heart rate calculator', 'target heart rate zones calculator', 'fat burn zone calculator', 'aerobic heart rate zone', 'max heart rate reserve formula'],
    order: 174,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Age & Resting Heart Rate',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hr-age">Age (Years)</label>
          <input class="tool-textarea" id="hr-age" type="number" min="10" max="100" value="28" placeholder="28" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-rest">Resting Heart Rate (BPM)</label>
          <input class="tool-textarea" id="hr-rest" type="number" min="35" max="120" value="65" placeholder="65 BPM" />
        </div>
      </div>
      <div id="hr-res-card" style="margin-top:1.25rem;">
        <div style="background:var(--surface); border:1px solid var(--line); border-radius:12px; padding:1rem;">
          <div style="display:grid; grid-template-columns:180px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Fat Burning (60-70%):</strong> <span id="hr-z2" style="color:var(--green-dark); font-weight:700;">141 - 154 BPM</span>
          </div>
          <div style="display:grid; grid-template-columns:180px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Aerobic Cardio (70-80%):</strong> <span id="hr-z3" style="font-weight:700;">154 - 167 BPM</span>
          </div>
          <div style="display:grid; grid-template-columns:180px 1fr; gap:0.5rem; padding:0.35rem 0; border-bottom:1px solid var(--line);">
            <strong>Anaerobic Threshold (80-90%):</strong> <span id="hr-z4" style="color:#d97706; font-weight:700;">167 - 179 BPM</span>
          </div>
          <div style="display:grid; grid-template-columns:180px 1fr; gap:0.5rem; padding:0.35rem 0;">
            <strong>VO2 Max / Redline (90-100%):</strong> <span id="hr-z5" style="color:#c53030; font-weight:700;">179 - 192 BPM</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ageEl = document.getElementById('hr-age'), restEl = document.getElementById('hr-rest');
  const z2El = document.getElementById('hr-z2'), z3El = document.getElementById('hr-z3'), z4El = document.getElementById('hr-z4'), z5El = document.getElementById('hr-z5');

  function update() {
    const age = parseFloat(ageEl.value);
    const rest = parseFloat(restEl.value);
    if (isNaN(age) || isNaN(rest) || age <= 0 || rest <= 0) return;

    // Max HR = 220 - age
    const maxHr = 220 - age;
    // HR Reserve (HRR) = Max HR - Resting HR
    const hrr = maxHr - rest;

    function calc(pct) { return Math.round(rest + (hrr * pct)); }

    z2El.textContent = calc(0.60) + ' - ' + calc(0.70) + ' BPM';
    z3El.textContent = calc(0.70) + ' - ' + calc(0.80) + ' BPM';
    z4El.textContent = calc(0.80) + ' - ' + calc(0.90) + ' BPM';
    z5El.textContent = calc(0.90) + ' - ' + maxHr + ' BPM';
  }

  ageEl.addEventListener('input', update);
  restEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter your chronological age.',
      'Enter your resting heart rate (measure upon waking in the morning).',
      'Inspect your custom 5-zone cardiovascular training heart rate ranges.'
    ],
    benefitTitle: 'Why Karvonen is Superior to Simple % Max HR',
    benefitContent: 'The Karvonen formula incorporates individual Heart Rate Reserve (HRR = HR_max - HR_rest), customizing training zones to match your true aerobic fitness baseline.',
    faqs: [{ q: 'What is the optimal heart rate zone for weight loss?', a: 'Zone 2 (60-70% of HRR) maximizes lipid fatty-acid oxidation as the primary muscular energy source.' }]
  },

  // 2. Macronutrient Calorie Split Calculator
  {
    slug: 'macro-nutrient-split-calculator',
    name: 'Macronutrient Grams & Calorie Split Calculator',
    description: 'Calculate daily gram targets for Proteins, Carbohydrates, and Fats based on total calorie goal and dietary split ratios (Balanced, Low-Carb, High-Protein).',
    category: 'Health',
    icon: 'text',
    keywords: ['macro calculator', 'macronutrient split calculator', 'protein carbs fat grams calculator', 'daily calories to macros', 'iifym macro calculator online'],
    order: 175,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Daily Calorie Target & Macro Ratios',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mac-cals">Daily Calorie Target (kcal)</label>
          <input class="tool-textarea" id="mac-cals" type="number" step="any" value="2200" placeholder="2200 kcal" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mac-plan">Dietary Split Preset</label>
          <select class="tool-textarea" id="mac-plan">
            <option value="40-30-30" selected>Balanced (40% Carb / 30% Protein / 30% Fat)</option>
            <option value="30-40-30">High-Protein (30% Carb / 40% Protein / 30% Fat)</option>
            <option value="20-40-40">Low-Carb (20% Carb / 40% Protein / 40% Fat)</option>
            <option value="5-25-70">Keto (5% Carb / 25% Protein / 70% Fat)</option>
          </select>
        </div>
      </div>
      <div id="mac-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="mac-res-p" style="color:#2563eb; font-weight:800; font-size:1.6rem;">165 g</span>
            <span class="stat-label">Protein (4 kcal/g)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mac-res-c" style="color:var(--green-dark); font-weight:700;">220 g</span>
            <span class="stat-label">Carbs (4 kcal/g)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mac-res-f" style="color:#d97706;">73 g</span>
            <span class="stat-label">Fats (9 kcal/g)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const calEl = document.getElementById('mac-cals'), planEl = document.getElementById('mac-plan');
  const pEl = document.getElementById('mac-res-p'), cEl = document.getElementById('mac-res-c'), fEl = document.getElementById('mac-res-f');

  function update() {
    const cals = parseFloat(calEl.value);
    const plan = planEl.value.split('-').map(Number);
    if (isNaN(cals) || cals <= 0 || plan.length !== 3) return;

    const carbPct = plan[0] / 100;
    const protPct = plan[1] / 100;
    const fatPct = plan[2] / 100;

    // Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g
    const protGrams = (cals * protPct) / 4;
    const carbGrams = (cals * carbPct) / 4;
    const fatGrams = (cals * fatPct) / 9;

    pEl.textContent = Math.round(protGrams) + ' g (' + Math.round(cals * protPct) + ' kcal)';
    cEl.textContent = Math.round(carbGrams) + ' g (' + Math.round(cals * carbPct) + ' kcal)';
    fEl.textContent = Math.round(fatGrams) + ' g (' + Math.round(cals * fatPct) + ' kcal)';
  }

  calEl.addEventListener('input', update);
  planEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter total daily caloric target.',
      'Select diet macro split (Balanced, High-Protein, Low-Carb, or Keto).',
      'Inspect exact gram amounts for proteins, carbs, and fats.'
    ],
    benefitTitle: 'Atwater Energy System',
    benefitContent: 'Proteins and Carbohydrates provide approximately 4.0 kcal per gram, while Dietary Fats provide 9.0 kcal per gram of metabolic energy.',
    faqs: [{ q: 'How much protein is recommended for muscle building?', a: 'Clinical sports nutrition guidelines recommend 1.6 to 2.2 grams of protein per kilogram of bodyweight.' }]
  },

  // 3. Sourdough Baker's Hydration Percentage Calculator
  {
    slug: 'baking-flour-hydration-percentage-calculator',
    name: 'Baker\'s Percentage & Bread Hydration Calculator',
    description: 'Calculate bread dough hydration percentage ((Water / Flour) · 100), sourdough starter baker\'s percentages, and total dough weight.',
    category: 'Daily',
    icon: 'text',
    keywords: ['bakers percentage calculator', 'dough hydration calculator', 'sourdough bread hydration formula', 'baking flour water ratio', 'artisan bread dough calculator'],
    order: 176,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Flour, Water & Starter Weights (grams)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bh-flour">Total Flour (grams)</label>
          <input class="tool-textarea" id="bh-flour" type="number" step="any" value="500" placeholder="500 g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bh-water">Water (grams / ml)</label>
          <input class="tool-textarea" id="bh-water" type="number" step="any" value="350" placeholder="350 g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bh-salt">Salt (grams)</label>
          <input class="tool-textarea" id="bh-salt" type="number" step="any" value="10" placeholder="10 g (2%)" />
        </div>
      </div>
      <div id="bh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bh-res-hydr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">70.0% Hydration</span>
            <span class="stat-label">Dough Hydration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bh-res-tot" style="font-weight:700;">860 g</span>
            <span class="stat-label">Total Dough Weight</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bh-res-salt-pct">2.0% Salt</span>
            <span class="stat-label">Baker\'s Salt %</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('bh-flour'), wEl = document.getElementById('bh-water'), sEl = document.getElementById('bh-salt');
  const hEl = document.getElementById('bh-res-hydr'), tEl = document.getElementById('bh-res-tot'), spEl = document.getElementById('bh-res-salt-pct');

  function update() {
    const flour = parseFloat(fEl.value), water = parseFloat(wEl.value), salt = parseFloat(sEl.value) || 0;
    if (isNaN(flour) || isNaN(water) || flour <= 0 || water <= 0) return;

    const hydrPct = (water / flour) * 100;
    const saltPct = (salt / flour) * 100;
    const totalWeight = flour + water + salt;

    hEl.textContent = hydrPct.toFixed(1) + '% Hydration';
    tEl.textContent = Math.round(totalWeight) + ' g';
    spEl.textContent = saltPct.toFixed(1) + '% Salt';
  }

  [fEl, wEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total flour weight in grams (flour is always the 100% baseline in Baker\'s percentages).',
      'Enter water weight in grams.',
      'Enter salt weight in grams (standard is 2%).',
      'Inspect hydration percentage and crumb openness projection.'
    ],
    benefitTitle: 'Understanding Baker\'s Percentages',
    benefitContent: 'In professional baking, all ingredient weights are expressed as a percentage of total flour weight: 70% hydration means 70g of water per 100g of flour.',
    faqs: [{ q: 'What is beginner vs artisan sourdough hydration?', a: 'Beginner dough is typically 65-70% hydration (easy to shape), while open-crumb artisan sourdough ranges between 75% and 85% hydration.' }]
  },

  // 4. Coffee Brew Ratio Calculator (Golden Cup Standard)
  {
    slug: 'coffee-brew-ratio-calculator',
    name: 'Coffee Brew Ratio & Grams Calculator',
    description: 'Calculate coffee grounds to water ratio (1:15 to 1:18) for Pour Over (V60, Chemex), French Press, AeroPress, and Espresso.',
    category: 'Daily',
    icon: 'text',
    keywords: ['coffee brew ratio calculator', 'coffee to water ratio calculator', 'v60 coffee ratio', 'french press ratio calculator', 'golden cup coffee formula'],
    order: 177,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Brew Method & Batch Volume',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cof-method">Brew Method Ratio</label>
          <select class="tool-textarea" id="cof-method">
            <option value="16" selected>Pour Over / V60 (1:16 Golden Cup)</option>
            <option value="15">Chemex / Rich Body (1:15)</option>
            <option value="12">French Press (1:12 Immersion)</option>
            <option value="17">Drip Machine (1:17 Standard)</option>
            <option value="2">Espresso (1:2 Ratio)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cof-water">Desired Cup Water (ml / grams)</label>
          <input class="tool-textarea" id="cof-water" type="number" step="any" value="350" placeholder="e.g. 350 ml (1 Mug)" />
        </div>
      </div>
      <div id="cof-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cof-res-grounds" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">21.9 g</span>
            <span class="stat-label">Coffee Grounds Required</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cof-res-ratio">1 : 16</span>
            <span class="stat-label">Brew Ratio (Coffee : Water)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('cof-method'), wEl = document.getElementById('cof-water');
  const gEl = document.getElementById('cof-res-grounds'), rEl = document.getElementById('cof-res-ratio');

  function update() {
    const ratio = parseFloat(mEl.value);
    const water = parseFloat(wEl.value);
    if (isNaN(ratio) || isNaN(water) || ratio <= 0 || water <= 0) return;

    const grounds = water / ratio;
    gEl.textContent = grounds.toFixed(1) + ' grams';
    rEl.textContent = '1 : ' + ratio;
  }

  mEl.addEventListener('change', update);
  wEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Choose brew method preset (Pour Over, French Press, Drip, Espresso).',
      'Enter target brewed water volume in milliliters (1 ml water = 1 gram).',
      'Weigh out exact ground coffee beans for specialty coffee balance.'
    ],
    benefitTitle: 'Specialty Coffee Association (SCA) Golden Cup Standard',
    benefitContent: 'SCA defines the optimal extraction ratio as 55 to 60 grams of coffee per 1,000 grams of water (1:16 to 1:18), achieving a total dissolved solids (TDS) concentration between 1.15% and 1.45%.',
    faqs: [{ q: 'How many grams of coffee for a 350ml morning mug?', a: 'At a 1:16 ratio, 350 ml of water requires approximately 21.9 grams of freshly ground coffee.' }]
  },

  // 5. Restaurant Split Bill & Tip Calculator
  {
    slug: 'split-bill-tip-calculator',
    name: 'Restaurant Split Bill & Tip Calculator',
    description: 'Split restaurant dining bills evenly across people, calculate custom tip percentages (10%, 15%, 18%, 20%), and individual payment shares.',
    category: 'Daily',
    icon: 'text',
    keywords: ['split bill calculator', 'tip calculator online', 'restaurant bill splitter', 'calculate tip per person', 'split dinner bill evenly'],
    order: 178,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Bill Amount, Tip & People',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tip-bill">Total Bill Amount ($ / ₹)</label>
          <input class="tool-textarea" id="tip-bill" type="number" step="any" value="120" placeholder="120" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tip-pct">Tip Percentage (%)</label>
          <input class="tool-textarea" id="tip-pct" type="number" step="any" value="18" placeholder="18%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tip-people">Number of People</label>
          <input class="tool-textarea" id="tip-people" type="number" min="1" step="1" value="4" placeholder="4" />
        </div>
      </div>
      <div id="tip-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tip-res-per-person" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">$35.40</span>
            <span class="stat-label">Each Person Pays</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tip-res-tot-tip" style="font-weight:700;">$21.60</span>
            <span class="stat-label">Total Tip Amount</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tip-res-grand-tot">$141.60</span>
            <span class="stat-label">Grand Total (Bill + Tip)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('tip-bill'), pEl = document.getElementById('tip-pct'), nEl = document.getElementById('tip-people');
  const ppEl = document.getElementById('tip-res-per-person'), ttEl = document.getElementById('tip-res-tot-tip'), gtEl = document.getElementById('tip-res-grand-tot');

  function update() {
    const bill = parseFloat(bEl.value);
    const tipPct = parseFloat(pEl.value) / 100;
    const people = parseInt(nEl.value, 10) || 1;

    if (isNaN(bill) || isNaN(tipPct) || bill <= 0 || people < 1) return;

    const tipTotal = bill * tipPct;
    const grandTotal = bill + tipTotal;
    const perPerson = grandTotal / people;

    ppEl.textContent = '$' + perPerson.toFixed(2);
    ttEl.textContent = '$' + tipTotal.toFixed(2);
    gtEl.textContent = '$' + grandTotal.toFixed(2);
  }

  [bEl, pEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total check bill before tip.',
      'Enter desired tip percentage (e.g. 15% or 18% or 20%).',
      'Enter the number of diners splitting the tab.',
      'Inspect each individual\'s exact payment share.'
    ],
    benefitTitle: 'Fair Dining Tab Splitting',
    benefitContent: 'Quickly calculating exact tip amounts and per-diner shares avoids awkward payment confusion at group dinners and events.',
    faqs: [{ q: 'What is standard restaurant tipping etiquette?', a: 'In the US and Canada, 15-20% is customary for table service. In Europe and Asia, service charge is frequently included or 5-10% is tipped for exceptional service.' }]
  }
];

tools15.forEach(createTool);
console.log('Mega pack 15 complete.');
