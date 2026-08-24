const { createTool } = require('./generate-curated-tools.cjs');

// Suite P: 5 Tools in Clinical Anthropometry, Body Composition & Sports Science
const toolsSuiteP = [
  // 1. Boer & Hume Lean Body Mass (LBM) Calculator
  {
    slug: 'lean-body-mass-boer-calculator',
    name: 'Lean Body Mass (LBM) Clinical Calculator',
    description: 'Calculate fat-free Lean Body Mass (LBM) in kilograms and pounds using the validated clinical Boer, James, and Hume anthropometric formulas.',
    category: 'Health',
    icon: 'text',
    keywords: ['lean body mass calculator', 'lbm calculator boer formula', 'fat free mass calculator online', 'hume lean body mass', 'clinical lbm drug dosing formula'],
    order: 259,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Biological Sex, Weight & Height',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lbm-gender">Biological Sex</label>
          <select class="tool-textarea" id="lbm-gender">
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="lbm-wt">Total Weight (kg)</label>
          <input class="tool-textarea" id="lbm-wt" type="number" step="any" value="75" placeholder="75 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lbm-ht">Height (cm)</label>
          <input class="tool-textarea" id="lbm-ht" type="number" step="any" value="178" placeholder="178 cm" />
        </div>
      </div>
      <div id="lbm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lbm-res-boer" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">58.7 kg (129.4 lbs)</span>
            <span class="stat-label">Boer Lean Body Mass (LBM)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lbm-res-fat" style="color:#2563eb; font-weight:700;">16.3 kg (21.7%)</span>
            <span class="stat-label">Estimated Body Fat Mass</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('lbm-gender'), wEl = document.getElementById('lbm-wt'), hEl = document.getElementById('lbm-ht');
  const boerEl = document.getElementById('lbm-res-boer'), fatEl = document.getElementById('lbm-res-fat');

  function update() {
    const isMale = gEl.value === 'male';
    const W = parseFloat(wEl.value);
    const H = parseFloat(hEl.value);
    if (isNaN(W) || isNaN(H) || W <= 0 || H <= 0) return;

    // Boer Formula:
    // Male: LBM = 0.407 * W + 0.267 * H - 19.2
    // Female: LBM = 0.252 * W + 0.473 * H - 48.3
    let lbm = isMale ? (0.407 * W + 0.267 * H - 19.2) : (0.252 * W + 0.473 * H - 48.3);
    if (lbm < 10) lbm = 10;
    if (lbm > W) lbm = W * 0.95;

    const fatKg = W - lbm;
    const fatPct = (fatKg / W) * 100;
    const lbmLbs = lbm * 2.20462;

    boerEl.textContent = lbm.toFixed(1) + ' kg (' + lbmLbs.toFixed(1) + ' lbs)';
    fatEl.textContent = fatKg.toFixed(1) + ' kg (' + fatPct.toFixed(1) + '%)';
  }

  [gEl, wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select biological sex (Male or Female).',
      'Enter body weight in kilograms and height in centimeters.',
      'Inspect total fat-free muscle, bone, and organ mass (LBM).'
    ],
    benefitTitle: 'Pharmacokinetics and Critical Drug Dosing',
    benefitContent: 'Water-soluble anesthetics and chemotherapy agents distribute primarily into lean muscle tissue rather than adipose fat; dosing by LBM prevents accidental toxicity in overweight patients.',
    faqs: [{ q: 'What makes up Lean Body Mass?', a: 'Skeletal muscle mass, bones, water, internal organs, and essential structural lipids.' }]
  },

  // 2. Ideal Body Weight (IBW) Multi-Formula Comparison
  {
    slug: 'ideal-body-weight-devine-calculator',
    name: 'Ideal Body Weight (IBW) Multi-Formula Calculator',
    description: 'Compare clinical Ideal Body Weight (IBW) across the Devine (1974), Robinson (1983), Miller (1983), and Hamwi (1964) medical standards.',
    category: 'Health',
    icon: 'text',
    keywords: ['ideal body weight calculator', 'devine formula ibw calculator', 'robinson miller hamwi ibw comparison', 'clinical ideal weight calculator online', 'ventilator tidal volume ibw formula'],
    order: 260,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Biological Sex & Height',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ibw-gender">Biological Sex</label>
          <select class="tool-textarea" id="ibw-gender">
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ibw-ht-cm">Height (cm)</label>
          <input class="tool-textarea" id="ibw-ht-cm" type="number" step="any" value="175" placeholder="175 cm (5 ft 9 in)" />
        </div>
      </div>
      <div id="ibw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ibw-res-devine" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">70.5 kg (155.4 lbs)</span>
            <span class="stat-label">Devine Formula (Clinical Gold Standard)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ibw-res-robinson" style="font-weight:700;">68.8 kg</span>
            <span class="stat-label">Robinson Formula</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ibw-res-hamwi">69.8 kg</span>
            <span class="stat-label">Hamwi Formula</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('ibw-gender'), hEl = document.getElementById('ibw-ht-cm');
  const dEl = document.getElementById('ibw-res-devine'), rEl = document.getElementById('ibw-res-robinson'), mEl = document.getElementById('ibw-res-hamwi');

  function update() {
    const isMale = gEl.value === 'male';
    const hCm = parseFloat(hEl.value);
    if (isNaN(hCm) || hCm <= 100) return;

    const hInches = hCm / 2.54;
    const over5Ft = Math.max(0, hInches - 60);

    // Devine (1974): Male: 50.0 + 2.3 * over5Ft, Female: 45.5 + 2.3 * over5Ft
    const ibwDevine = isMale ? (50.0 + 2.3 * over5Ft) : (45.5 + 2.3 * over5Ft);
    // Robinson (1983): Male: 52.0 + 1.9 * over5Ft, Female: 49.0 + 1.7 * over5Ft
    const ibwRobinson = isMale ? (52.0 + 1.9 * over5Ft) : (49.0 + 1.7 * over5Ft);
    // Hamwi (1964): Male: 48.0 + 2.7 * over5Ft, Female: 45.5 + 2.2 * over5Ft
    const ibwHamwi = isMale ? (48.0 + 2.7 * over5Ft) : (45.5 + 2.2 * over5Ft);

    dEl.textContent = ibwDevine.toFixed(1) + ' kg (' + (ibwDevine * 2.20462).toFixed(1) + ' lbs)';
    rEl.textContent = ibwRobinson.toFixed(1) + ' kg (' + (ibwRobinson * 2.20462).toFixed(1) + ' lbs)';
    mEl.textContent = ibwHamwi.toFixed(1) + ' kg (' + (ibwHamwi * 2.20462).toFixed(1) + ' lbs)';
  }

  gEl.addEventListener('change', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select biological sex and enter height in centimeters.',
      'Inspect medical Ideal Body Weight benchmarks used by hospitals for mechanical ventilation tidal volume and renal clearance.'
    ],
    benefitTitle: 'Why Devine IBW is Used in ICU Mechanical Ventilation',
    benefitContent: 'Lung capacity scales strictly with vertical height and biological sex (not adipose body fat). Setting ICU ventilator tidal volumes (6-8 mL/kg) using Devine IBW prevents barotrauma.',
    faqs: [{ q: 'What is the Devine baseline height?', a: '5 feet (60 inches / 152.4 cm) provides the baseline 50 kg (male) or 45.5 kg (female), adding 2.3 kg per additional inch.' }]
  },

  // 3. Adjusted Body Weight (AdjBW) Clinical Dosing Calculator
  {
    slug: 'adjusted-body-weight-clinical-calculator',
    name: 'Adjusted Body Weight (AdjBW) Clinical Dosing Calculator',
    description: 'Calculate Adjusted Body Weight (AdjBW = IBW + 0.4 · (Actual Weight - IBW)) for aminoglycoside antibiotic and critical medication dosing in obese patients.',
    category: 'Health',
    icon: 'text',
    keywords: ['adjusted body weight calculator', 'adjbw clinical dosing calculator', 'antibiotic dosing adjusted body weight', 'aminoglycoside adjbw formula', 'ibw actual weight adjustment online'],
    order: 261,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Actual Weight, Height & Sex',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="adj-gender">Biological Sex</label>
          <select class="tool-textarea" id="adj-gender">
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="adj-act-wt">Actual Weight (kg)</label>
          <input class="tool-textarea" id="adj-act-wt" type="number" step="any" value="105" placeholder="105 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="adj-ht">Height (cm)</label>
          <input class="tool-textarea" id="adj-ht" type="number" step="any" value="175" placeholder="175 cm" />
        </div>
      </div>
      <div id="adj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="adj-res-adj" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">84.3 kg</span>
            <span class="stat-label">Adjusted Body Weight (AdjBW)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="adj-res-ibw" style="font-weight:700;">70.5 kg</span>
            <span class="stat-label">Ideal Body Weight (IBW)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="adj-res-pct">148.9% of IBW</span>
            <span class="stat-label">Overweight Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('adj-gender'), wEl = document.getElementById('adj-act-wt'), hEl = document.getElementById('adj-ht');
  const adjEl = document.getElementById('adj-res-adj'), ibwEl = document.getElementById('adj-res-ibw'), pctEl = document.getElementById('adj-res-pct');

  function update() {
    const isMale = gEl.value === 'male';
    const actWt = parseFloat(wEl.value), hCm = parseFloat(hEl.value);
    if (isNaN(actWt) || isNaN(hCm) || actWt <= 0 || hCm <= 100) return;

    const hInches = hCm / 2.54;
    const over5Ft = Math.max(0, hInches - 60);
    const ibw = isMale ? (50.0 + 2.3 * over5Ft) : (45.5 + 2.3 * over5Ft);

    // AdjBW = IBW + 0.4 * (Actual - IBW)
    let adjBw = ibw;
    if (actWt > ibw) {
      adjBw = ibw + 0.4 * (actWt - ibw);
    }

    const pctOfIbw = (actWt / ibw) * 100;

    adjEl.textContent = adjBw.toFixed(1) + ' kg (' + (adjBw * 2.20462).toFixed(1) + ' lbs)';
    ibwEl.textContent = ibw.toFixed(1) + ' kg';
    pctEl.textContent = pctOfIbw.toFixed(1) + '% of IBW' + (pctOfIbw > 120 ? ' (AdjBW Required)' : ' (Use Actual Wt)');
  }

  [gEl, wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select sex and enter actual patient scale weight and height.',
      'If actual weight exceeds 120% of Ideal Body Weight (IBW), clinical pharmacy guidelines mandate using AdjBW for dosing medications like Gentamicin and Vancomycin.'
    ],
    benefitTitle: 'Adipose Tissue Volume of Distribution (Vd)',
    benefitContent: 'Adipose tissue possesses ~40% of the extracellular fluid volume of lean vascularized muscle tissue, making 0.4 the standard clinical correction coefficient.',
    faqs: [{ q: 'When is AdjBW clinically recommended?', a: 'When a patient\'s actual body weight is greater than 120% of their calculated Devine Ideal Body Weight.' }]
  },

  // 4. Heart Rate Variability (HRV) RMSSD Recovery Score Calculator
  {
    slug: 'heart-rate-variability-rmssd-calculator',
    name: 'Heart Rate Variability (HRV) RMSSD Recovery Calculator',
    description: 'Calculate root mean square of successive RR interval differences (RMSSD = √(Σ(ΔRR²) / (N-1))) and autonomic parasympathetic recovery status.',
    category: 'Health',
    icon: 'text',
    keywords: ['hrv rmssd calculator', 'heart rate variability calculator', 'rr interval ms rmssd formula', 'parasympathetic recovery hrv score', 'whoop oura hrv calculation online'],
    order: 262,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Consecutive Beat-to-Beat RR Intervals (milliseconds ms)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="hrv-rr">Enter RR Intervals in ms (comma or newline separated)</label>
        <textarea class="tool-textarea" id="hrv-rr" rows="4" placeholder="850, 890, 830, 910, 860, 920, 840, 880"></textarea>
      </div>
      <div id="hrv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hrv-res-rmssd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">63.2 ms</span>
            <span class="stat-label">HRV RMSSD Score</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hrv-res-mean-hr" style="font-weight:700;">68 BPM</span>
            <span class="stat-label">Average Heart Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hrv-res-state">Optimal Parasympathetic Recovery</span>
            <span class="stat-label">Autonomic Nervous System</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const inEl = document.getElementById('hrv-rr');
  const rmssdEl = document.getElementById('hrv-res-rmssd'), hrEl = document.getElementById('hrv-res-mean-hr'), stEl = document.getElementById('hrv-res-state');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const rrs = raw.split(/[,\\s\\t\\n]+/).map(Number).filter(v => !isNaN(v) && v > 300 && v < 2000);
    if (rrs.length < 3) return;

    let sumDiffSq = 0;
    for (let i = 0; i < rrs.length - 1; i++) {
      const diff = rrs[i+1] - rrs[i];
      sumDiffSq += Math.pow(diff, 2);
    }

    const rmssd = Math.sqrt(sumDiffSq / (rrs.length - 1));
    const meanRR = rrs.reduce((a, b) => a + b, 0) / rrs.length;
    const meanBpm = 60000 / meanRR;

    rmssdEl.textContent = rmssd.toFixed(1) + ' ms';
    hrEl.textContent = Math.round(meanBpm) + ' BPM';

    if (rmssd > 50) {
      stEl.textContent = 'High HRV: Optimal Parasympathetic Recovery';
      stEl.style.color = '#22543d';
    } else if (rmssd >= 25) {
      stEl.textContent = 'Moderate HRV: Balanced Nervous System';
      stEl.style.color = '#2563eb';
    } else {
      stEl.textContent = 'Low HRV: Sympathetic Stress / Overtraining Alert';
      stEl.style.color = '#c53030';
    }
  }

  inEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Paste consecutive electrocardiogram (ECG) or optical PPG beat-to-beat RR intervals in milliseconds.',
      'Inspect RMSSD HRV score and autonomic recovery status.'
    ],
    benefitTitle: 'Vagal Nerve Parasympathetic Activity',
    benefitContent: 'Higher Heart Rate Variability (RMSSD > 50ms) reflects healthy vagal tone, high physical recovery, and readiness for athletic strain; low HRV signals accumulated physical exhaustion, illness, or systemic stress.',
    faqs: [{ q: 'What device sensors measure RMSSD?', a: 'Smart rings (Oura), chest straps (Polar H10), and fitness trackers (Whoop, Apple Watch).' }]
  },

  // 5. Rockport 1-Mile Walk Test VO2 Max Calculator
  {
    slug: 'vo2-max-rockport-walking-test-calculator',
    name: 'Rockport 1-Mile Walk Test VO2 Max Calculator',
    description: 'Calculate cardiovascular aerobic fitness capacity (VO2 Max in mL/kg/min) from a 1-mile brisk walk completion time and heart rate.',
    category: 'Health',
    icon: 'text',
    keywords: ['rockport walk test calculator', 'vo2 max walking test calculator', 'cardiovascular fitness vo2 max formula', 'rockport 1 mile fitness score', 'aerobic capacity walk test online'],
    order: 263,
    schemaCategory: 'HealthApplication',
    workspaceHeading: 'Age, Sex, Weight, Walk Time & Heart Rate',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rp-gender">Sex</label>
          <select class="tool-textarea" id="rp-gender">
            <option value="1" selected>Male (Gender = 1)</option>
            <option value="0">Female (Gender = 0)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rp-age">Age</label>
          <input class="tool-textarea" id="rp-age" type="number" value="30" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rp-wt-lbs">Weight (lbs)</label>
          <input class="tool-textarea" id="rp-wt-lbs" type="number" step="any" value="165" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rp-time-min">Walk Time (Mins)</label>
          <input class="tool-textarea" id="rp-time-min" type="number" step="any" value="14.5" placeholder="14.5 mins" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rp-hr">Finish Heart Rate (BPM)</label>
          <input class="tool-textarea" id="rp-hr" type="number" value="120" />
        </div>
      </div>
      <div id="rp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rp-res-vo2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">47.8 mL/kg/min</span>
            <span class="stat-label">Estimated Aerobic VO2 Max</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rp-res-cat" style="color:var(--green-dark); font-weight:700;">Excellent Aerobic Fitness</span>
            <span class="stat-label">Cardiovascular Fitness Level</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('rp-gender'), aEl = document.getElementById('rp-age'), wEl = document.getElementById('rp-wt-lbs');
  const tEl = document.getElementById('rp-time-min'), hrEl = document.getElementById('rp-hr');
  const vo2El = document.getElementById('rp-res-vo2'), catEl = document.getElementById('rp-res-cat');

  function update() {
    const gender = parseInt(gEl.value, 10);
    const age = parseFloat(aEl.value);
    const wtLbs = parseFloat(wEl.value);
    const timeMins = parseFloat(tEl.value);
    const hr = parseFloat(hrEl.value);

    if (isNaN(age) || isNaN(wtLbs) || isNaN(timeMins) || isNaN(hr) || age <= 0 || wtLbs <= 0 || timeMins <= 0 || hr <= 0) return;

    // Rockport formula:
    // VO2 max = 132.853 - (0.0769 * Weight_lbs) - (0.3877 * Age) + (6.315 * Gender) - (3.2649 * Time_min) - (0.1565 * HeartRate)
    const vo2 = 132.853 - (0.0769 * wtLbs) - (0.3877 * age) + (6.315 * gender) - (3.2649 * timeMins) - (0.1565 * hr);

    vo2El.textContent = vo2.toFixed(1) + ' mL/kg/min';

    if (vo2 >= 50) {
      catEl.textContent = 'Superior / Elite Cardio Capacity';
      catEl.style.color = '#22543d';
    } else if (vo2 >= 42) {
      catEl.textContent = 'Excellent Aerobic Fitness';
      catEl.style.color = '#22543d';
    } else if (vo2 >= 35) {
      catEl.textContent = 'Good / Average Fitness';
      catEl.style.color = '#2563eb';
    } else {
      catEl.textContent = 'Below Average (Aerobic Training Recommended)';
      catEl.style.color = '#c53030';
    }
  }

  [gEl, aEl, wEl, tEl, hrEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Walk 1 mile (1,609 meters) as fast as possible on a flat track.',
      'Record exact completion time in decimal minutes and immediate heart rate upon crossing the finish line.',
      'Inspect your clinical VO2 Max aerobic fitness classification.'
    ],
    benefitTitle: 'Sub-Maximal Aerobic Capacity Testing',
    benefitContent: 'Developed at the Department of Exercise Science at UMass Amherst, the Rockport walk test allows safe, non-invasive estimation of VO2 max without requiring maximal treadmill exhaustion testing.',
    faqs: [{ q: 'What is a good VO2 max for a 30-year-old male?', a: 'Between 45 and 52 mL/kg/min represents excellent cardiovascular aerobic health.' }]
  }
];

toolsSuiteP.forEach(createTool);
console.log('Suite P complete: 5 tools created.');
