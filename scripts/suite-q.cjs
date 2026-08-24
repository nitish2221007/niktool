const { createTool } = require('./generate-curated-tools.cjs');

// Suite Q: 7 Tools to cross 395+ tools in Cardiovascular, Metabolic & Anthropometric Metrics
const toolsSuiteQ = [
  // 1. Tanaka Maximum Heart Rate Formula Calculator
  {
    slug: 'max-heart-rate-tanaka-calculator',
    name: 'Tanaka Maximum Heart Rate Formula Calculator',
    description: 'Calculate clinical maximum heart rate (HR_max = 208 - 0.7 · Age) using the validated Tanaka meta-analysis formula.',
    category: 'Health',
    icon: 'text',
    keywords: ['tanaka max heart rate calculator', '208 minus 0.7 age formula', 'clinical maximum heart rate calculator', 'tanaka vs fox heart rate formula', 'accurate max hr calculator online'],
    order: 264,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Chronological Age (Years)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="tan-age">Age (Years)</label>
        <input class="tool-textarea" id="tan-age" type="number" min="10" max="100" value="45" placeholder="45" />
      </div>
      <div id="tan-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tan-res-tanaka" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">176 BPM</span>
            <span class="stat-label">Tanaka Max HR (208 - 0.7·Age)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tan-res-fox" style="font-weight:700;">175 BPM</span>
            <span class="stat-label">Legacy Fox Formula (220 - Age)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('tan-age');
  const tResEl = document.getElementById('tan-res-tanaka'), fResEl = document.getElementById('tan-res-fox');

  function update() {
    const age = parseFloat(aEl.value);
    if (isNaN(age) || age <= 0 || age > 120) return;

    // Tanaka: HR_max = 208 - (0.7 * age)
    const hrTanaka = 208 - (0.7 * age);
    // Fox: HR_max = 220 - age
    const hrFox = 220 - age;

    tResEl.textContent = Math.round(hrTanaka) + ' BPM';
    fResEl.textContent = Math.round(hrFox) + ' BPM';
  }

  aEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter your chronological age.',
      'Inspect your maximum heart rate calculated by the modern Tanaka clinical equation.'
    ],
    benefitTitle: 'Why Tanaka is More Accurate than 220 - Age',
    benefitContent: 'Hirofumi Tanaka analyzed 351 studies across 18,712 subjects to correct the old Fox formula, which systematically underestimates max heart rate in older adults and overestimates it in youth.',
    faqs: [{ q: 'What is max heart rate for a 60-year-old under Tanaka?', a: 'HR_max = 208 - (0.7 × 60) = 208 - 42 = 166 BPM (compared to 160 BPM under the older 220-age rule).' }]
  },

  // 2. Revised Harris-Benedict BMR Calculator
  {
    slug: 'harris-benedict-bmr-calculator',
    name: 'Revised Harris-Benedict BMR Calculator',
    description: 'Calculate basal metabolic rate (BMR) calories using the Roza and Shizgal revised Harris-Benedict clinical equation.',
    category: 'Health',
    icon: 'text',
    keywords: ['harris benedict bmr calculator', 'revised harris benedict equation', 'basal metabolic rate calculator online', 'daily basal calories formula', 'roza shizgal bmr calculator'],
    order: 265,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Sex, Weight, Height & Age',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hb-gender">Sex</label>
          <select class="tool-textarea" id="hb-gender">
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hb-wt">Weight (kg)</label>
          <input class="tool-textarea" id="hb-wt" type="number" step="any" value="75" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hb-ht">Height (cm)</label>
          <input class="tool-textarea" id="hb-ht" type="number" step="any" value="175" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hb-age">Age (Years)</label>
          <input class="tool-textarea" id="hb-age" type="number" value="30" />
        </div>
      </div>
      <div id="hb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hb-res-bmr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,724 kcal</span>
            <span class="stat-label">Basal Metabolic Rate (BMR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hb-res-hr">71.8 kcal / hr</span>
            <span class="stat-label">Hourly Resting Burn</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('hb-gender'), wEl = document.getElementById('hb-wt');
  const hEl = document.getElementById('hb-ht'), aEl = document.getElementById('hb-age');
  const bmrEl = document.getElementById('hb-res-bmr'), hrEl = document.getElementById('hb-res-hr');

  function update() {
    const isMale = gEl.value === 'male';
    const W = parseFloat(wEl.value), H = parseFloat(hEl.value), A = parseFloat(aEl.value);
    if (isNaN(W) || isNaN(H) || isNaN(A) || W <= 0 || H <= 0 || A <= 0) return;

    // Revised Harris-Benedict (1984):
    // Men: BMR = 88.362 + (13.397 * W) + (4.799 * H) - (5.677 * A)
    // Women: BMR = 447.593 + (9.247 * W) + (3.098 * H) - (4.330 * A)
    let bmr = isMale ? (88.362 + (13.397 * W) + (4.799 * H) - (5.677 * A)) : (447.593 + (9.247 * W) + (3.098 * H) - (4.330 * A));

    bmrEl.textContent = Math.round(bmr).toLocaleString() + ' kcal / day';
    hrEl.textContent = (bmr / 24).toFixed(1) + ' kcal / hr';
  }

  [gEl, wEl, hEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter biological sex, weight, height, and age.',
      'Inspect resting basal energy expenditure required to sustain vital organs at complete rest.'
    ],
    benefitTitle: 'Roza and Shizgal Revision',
    benefitContent: 'Roza and Shizgal re-evaluated the original 1919 Carnegie Institution data with modern regression techniques to establish accurate baseline metabolic constants.',
    faqs: [{ q: 'Does BMR include daily physical walking and movement?', a: 'No, BMR represents purely basal metabolic functions (brain, liver, heart, respiration) at complete bed rest.' }]
  },

  // 3. Waist-to-Hip Ratio (WHR) Health Risk Calculator
  {
    slug: 'waist-to-hip-ratio-whr-calculator',
    name: 'Waist-to-Hip Ratio (WHR) Health Risk Calculator',
    description: 'Calculate Waist-to-Hip Ratio (WHR = Waist / Hip) and evaluate World Health Organization (WHO) abdominal visceral fat cardiovascular risk.',
    category: 'Health',
    icon: 'text',
    keywords: ['waist to hip ratio calculator', 'whr calculator online', 'abdominal obesity who ratio', 'visceral fat waist hip calculator', 'cardiovascular risk whr formula'],
    order: 266,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Waist & Hip Circumferences (cm or inches)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="whr-gender">Biological Sex</label>
          <select class="tool-textarea" id="whr-gender">
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="whr-waist">Waist Circumference (cm / in)</label>
          <input class="tool-textarea" id="whr-waist" type="number" step="any" value="82" placeholder="82 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="whr-hip">Hip Circumference (cm / in)</label>
          <input class="tool-textarea" id="whr-hip" type="number" step="any" value="98" placeholder="98 cm" />
        </div>
      </div>
      <div id="whr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="whr-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.84</span>
            <span class="stat-label">Waist-to-Hip Ratio (WHR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="whr-res-risk" style="color:var(--green-dark); font-weight:700;">Low Health Risk</span>
            <span class="stat-label">WHO Risk Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('whr-gender'), wEl = document.getElementById('whr-waist'), hEl = document.getElementById('whr-hip');
  const valEl = document.getElementById('whr-res-val'), rskEl = document.getElementById('whr-res-risk');

  function update() {
    const isMale = gEl.value === 'male';
    const waist = parseFloat(wEl.value), hip = parseFloat(hEl.value);
    if (isNaN(waist) || isNaN(hip) || waist <= 0 || hip <= 0) return;

    const whr = waist / hip;
    valEl.textContent = whr.toFixed(2);

    if (isMale) {
      if (whr < 0.90) {
        rskEl.textContent = 'Low Health Risk (WHR < 0.90)';
        rskEl.style.color = '#22543d';
      } else if (whr <= 0.99) {
        rskEl.textContent = 'Moderate Health Risk (0.90 - 0.99)';
        rskEl.style.color = '#d97706';
      } else {
        rskEl.textContent = 'High Cardiovascular Risk (WHR ≥ 1.0)';
        rskEl.style.color = '#c53030';
      }
    } else {
      if (whr < 0.80) {
        rskEl.textContent = 'Low Health Risk (WHR < 0.80)';
        rskEl.style.color = '#22543d';
      } else if (whr <= 0.84) {
        rskEl.textContent = 'Moderate Health Risk (0.80 - 0.84)';
        rskEl.style.color = '#d97706';
      } else {
        rskEl.textContent = 'High Cardiovascular Risk (WHR ≥ 0.85)';
        rskEl.style.color = '#c53030';
      }
    }
  }

  [gEl, wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Measure waist circumference at the narrowest point (above the navel).',
      'Measure hip circumference at the widest point across the buttocks.',
      'Inspect your Waist-to-Hip Ratio and WHO metabolic health classification.'
    ],
    benefitTitle: 'Why WHR Predicts Health Better than BMI',
    benefitContent: 'WHR identifies abdominal "apple" vs peripheral "pear" fat distribution. Visceral abdominal fat directly surrounds liver and pancreas organs, releasing inflammatory cytokines associated with Type 2 diabetes and hypertension.',
    faqs: [{ q: 'What is the WHO cutoff for abdominal obesity in men and women?', a: 'WHO defines abdominal obesity as WHR ≥ 0.90 for men and WHR ≥ 0.85 for women.' }]
  },

  // 4. Waist-to-Height Ratio (WHtR) Calculator
  {
    slug: 'waist-to-height-ratio-whtr-calculator',
    name: 'Waist-to-Height Ratio (WHtR) Health Calculator',
    description: 'Calculate Waist-to-Height Ratio (WHtR = Waist / Height) and verify the clinical "Keep your waist to less than half your height" longevity rule.',
    category: 'Health',
    icon: 'text',
    keywords: ['waist to height ratio calculator', 'whtr calculator online', 'keep waist half your height rule', 'whtr body fat health score', 'visceral fat waist height ratio'],
    order: 267,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Waist Circumference & Vertical Height (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="whtr-waist">Waist Circumference (cm)</label>
          <input class="tool-textarea" id="whtr-waist" type="number" step="any" value="80" placeholder="80 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="whtr-ht">Height (cm)</label>
          <input class="tool-textarea" id="whtr-ht" type="number" step="any" value="175" placeholder="175 cm" />
        </div>
      </div>
      <div id="whtr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="whtr-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.46</span>
            <span class="stat-label">Waist-to-Height Ratio (WHtR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="whtr-res-cat" style="color:var(--green-dark); font-weight:700;">Healthy (Under 0.50)</span>
            <span class="stat-label">Longevity Health Target</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('whtr-waist'), hEl = document.getElementById('whtr-ht');
  const valEl = document.getElementById('whtr-res-val'), catEl = document.getElementById('whtr-res-cat');

  function update() {
    const waist = parseFloat(wEl.value), ht = parseFloat(hEl.value);
    if (isNaN(waist) || isNaN(ht) || waist <= 0 || ht <= 0) return;

    const whtr = waist / ht;
    valEl.textContent = whtr.toFixed(2);

    if (whtr < 0.40) {
      catEl.textContent = 'Underweight (WHtR < 0.40)';
      catEl.style.color = '#2563eb';
    } else if (whtr <= 0.49) {
      catEl.textContent = 'Healthy (0.40 - 0.49: Optimal Longevity)';
      catEl.style.color = '#22543d';
    } else if (whtr <= 0.59) {
      catEl.textContent = 'Increased Risk (0.50 - 0.59: Overweight)';
      catEl.style.color = '#d97706';
    } else {
      catEl.textContent = 'High Health Risk (WHtR ≥ 0.60)';
      catEl.style.color = '#c53030';
    }
  }

  wEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter waist circumference in centimeters.',
      'Enter height in centimeters.',
      'Inspect Waist-to-Height Ratio.'
    ],
    benefitTitle: 'The Universal "Half Your Height" Metric',
    benefitContent: 'A Waist-to-Height ratio under 0.50 applies equally across all ethnicities, genders, and ages, making it a simple, universal public health guideline.',
    faqs: [{ q: 'What is the healthy waist limit for a 180 cm tall person?', a: '180 cm × 0.50 = maximum 90 cm (35.4 inches) waist circumference.' }]
  },

  // 5. Blood Alcohol Concentration (BAC) Widmark Formula Calculator
  {
    slug: 'blood-alcohol-content-widmark-calculator',
    name: 'Blood Alcohol Content (BAC) Widmark Calculator',
    description: 'Estimate Blood Alcohol Concentration (BAC %) and hours until sober using the Swedish physician Erik Widmark pharmacokinetic formula.',
    category: 'Health',
    icon: 'text',
    keywords: ['bac calculator widmark formula', 'blood alcohol content calculator', 'hours to sober calculator', 'standard drinks to bac online', 'widmark alcohol elimination rate'],
    order: 268,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Sex, Weight, Drinks & Elapsed Time',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bac-gender">Sex</label>
          <select class="tool-textarea" id="bac-gender">
            <option value="male" selected>Male (r = 0.68)</option>
            <option value="female">Female (r = 0.55)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bac-wt">Weight (kg)</label>
          <input class="tool-textarea" id="bac-wt" type="number" step="any" value="75" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bac-drinks">Standard Drinks (14g alcohol)</label>
          <input class="tool-textarea" id="bac-drinks" type="number" step="0.5" value="3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bac-hours">Hours Since First Drink</label>
          <input class="tool-textarea" id="bac-hours" type="number" step="0.5" value="2" />
        </div>
      </div>
      <div id="bac-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bac-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.052%</span>
            <span class="stat-label">Estimated Blood Alcohol (BAC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bac-res-sober" style="font-weight:700;">3.5 Hours</span>
            <span class="stat-label">Time to Reach 0.00% BAC</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('bac-gender'), wEl = document.getElementById('bac-wt');
  const dEl = document.getElementById('bac-drinks'), hEl = document.getElementById('bac-hours');
  const valEl = document.getElementById('bac-res-val'), sobEl = document.getElementById('bac-res-sober');

  function update() {
    const isMale = gEl.value === 'male';
    const r = isMale ? 0.68 : 0.55;
    const wtKg = parseFloat(wEl.value);
    const drinks = parseFloat(dEl.value);
    const hours = parseFloat(hEl.value);

    if (isNaN(wtKg) || isNaN(drinks) || isNaN(hours) || wtKg <= 0 || drinks < 0 || hours < 0) return;

    // Grams alcohol = drinks * 14 grams
    const alcoholGrams = drinks * 14;
    // Widmark BAC = (Grams / (Weight_g * r)) * 100 - (0.015 * hours)
    const wtGrams = wtKg * 1000;
    const peakBac = (alcoholGrams / (wtGrams * r)) * 100;
    let currentBac = peakBac - (0.015 * hours);
    if (currentBac < 0) currentBac = 0;

    const timeToZero = currentBac / 0.015;

    valEl.textContent = currentBac.toFixed(3) + '%';
    valEl.style.color = currentBac >= 0.08 ? '#c53030' : (currentBac >= 0.05 ? '#d97706' : '#22543d');
    sobEl.textContent = timeToZero > 0 ? timeToZero.toFixed(1) + ' Hours' : '0.0 Hours (Sober)';
  }

  [gEl, wEl, dEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select sex, enter body weight in kilograms, number of standard drinks (1 standard drink = 12oz 5% beer, 5oz 12% wine, or 1.5oz 40% spirits), and elapsed hours.',
      'Inspect estimated Blood Alcohol Content percentage and time to complete sobriety.'
    ],
    benefitTitle: 'Hepatic Alcohol Metabolism Rate (β = 0.015%/hr)',
    benefitContent: 'The human liver metabolizes alcohol at a steady linear rate of approximately 0.015% BAC per hour (zero-order elimination kinetics), unaffected by coffee, cold showers, or exercise.',
    faqs: [{ q: 'What is the legal driving limit in the US and UK?', a: 'In the United States and England/Wales, the legal limit for non-commercial driving is 0.08% BAC; in Scotland and most European countries, it is 0.05% or zero-tolerance.' }]
  }
];

toolsSuiteQ.forEach(createTool);
console.log('Suite Q complete: 5 tools created.');
