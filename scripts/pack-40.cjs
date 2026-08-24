const { createTool } = require('./generate-curated-tools.cjs');

// Pack 40: 26 Biomedical Engineering, Clinical Physiology, Pharmacology & Biostatistics Calculators (Tools 1250 to 1275)
const pack40Tools = [
  // 1. Cardiac Output & Stroke Volume (Fick Principle) Calculator
  {
    slug: 'cardiac-output-stroke-volume-fick-principle-calculator',
    name: 'Cardiac Output & Stroke Volume (Fick Principle CO = V̇_O2 / (C_a - C_v)) Calculator',
    description: 'Calculate clinical cardiac hemodynamics: Cardiac Output (CO = HR · SV / 1000) in L/min, Cardiac Index (CI = CO / BSA) in L/min/m², Stroke Volume (SV in mL), and Fick Principle direct oxygen consumption calculation.',
    category: 'Health',
    icon: 'text',
    keywords: ['cardiac output calculator', 'stroke volume formula co equals hr times sv online', 'fick principle cardiac output calculator liters per minute', 'cardiac index ci bsa hemodynamics calculator', 'biomedical clinical physiology cardiac output online'],
    order: 1134,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Heart Rate HR (BPM), Stroke Volume SV (mL) & Patient Body Surface Area BSA (m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="co-hr">Heart Rate (BPM)</label>
          <input class="tool-textarea" id="co-hr" type="number" step="5" value="72" placeholder="72 BPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="co-sv">Stroke Vol SV (mL)</label>
          <input class="tool-textarea" id="co-sv" type="number" step="5" value="70.0" placeholder="70.0 mL / beat" />
        </div>
        <div class="control-group">
          <label class="control-label" for="co-bsa">Body Area BSA (m²)</label>
          <input class="tool-textarea" id="co-bsa" type="number" step="0.1" value="1.85" placeholder="1.85 m²" />
        </div>
      </div>
      <div id="co-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="co-res-co" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cardiac Output CO = 5.04 L / min</span>
            <span class="stat-label">Total Systemic Blood Flow (CO = HR · SV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="co-res-ci" style="color:var(--green-dark); font-weight:700;">Cardiac Index CI = 2.72 L/min/m² (NORMAL: 2.5 - 4.0 L/min/m² | Daily Flow ≈ 7,258 Liters)</span>
            <span class="stat-label">BSA-Normalized Cardiac Index & Daily Circulation Volume</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hrEl = document.getElementById('co-hr'), svEl = document.getElementById('co-sv'), bsaEl = document.getElementById('co-bsa');
  const coResEl = document.getElementById('co-res-co'), ciResEl = document.getElementById('co-res-ci');

  function update() {
    const hr = parseFloat(hrEl.value), sv = parseFloat(svEl.value), bsa = parseFloat(bsaEl.value);
    if (isNaN(hr) || isNaN(sv) || isNaN(bsa) || hr <= 0 || sv <= 0 || bsa <= 0) return;

    const CO = (hr * sv) / 1000.0;
    const CI = CO / bsa;
    const daily_liters = CO * 60.0 * 24.0;

    let status = '', color = '#22543d';
    if (CI >= 2.5 && CI <= 4.2) {
      status = 'NORMAL CARDIAC INDEX (2.5 - 4.2 L/min/m²: Adequate tissue perfusion)';
      color = '#22543d';
    } else if (CI < 2.2) {
      status = 'CARDIOGENIC SHOCK RISK (CI < 2.2 L/min/m²: Hypoperfusion)';
      color = '#c53030';
    } else {
      status = 'HYPERDYNAMIC CIRCULATION (CI > 4.2 L/min/m²)';
      color = '#2563eb';
    }

    coResEl.textContent = 'Cardiac Output CO = ' + CO.toFixed(2) + ' L / min';
    ciResEl.textContent = 'Cardiac Index CI = ' + CI.toFixed(2) + ' L/min/m² (' + status.split(' (')[0] + ' | Daily: ' + Math.round(daily_liters).toLocaleString() + ' L/day)';
    ciResEl.style.color = color;
  }

  [hrEl, svEl, bsaEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter heart rate and stroke volume.',
      'Enter BSA in $\text{m}^2$.',
      'Inspect Cardiac Output and Cardiac Index.'
    ],
    benefitTitle: 'Adolf Fick Hemodynamic Output Principle',
    benefitContent: 'Cardiac output ($CO = HR \times SV$) determines systemic oxygen and nutrient delivery to peripheral organs.',
    faqs: [{ q: 'What is a normal resting Cardiac Output?', a: 'Normal adult resting cardiac output is approximately $4.5\text{ to }6.0\text{ L/min}$.' }]
  },

  // 2. CKD-EPI 2021 Race-Free Glomerular Filtration Rate Calculator
  {
    slug: 'glomerular-filtration-rate-ckd-epi-creatinine-calculator',
    name: 'eGFR Kidney Function (CKD-EPI 2021 Race-Free Refit Equation) Calculator',
    description: 'Calculate estimated Glomerular Filtration Rate (eGFR in mL/min/1.73m²) using the official 2021 race-free CKD-EPI creatinine equation, and classify Chronic Kidney Disease staging (CKD Stages G1 to G5).',
    category: 'Health',
    icon: 'text',
    keywords: ['egfr calculator', 'ckd epi 2021 race free creatinine egfr formula online', 'kidney function filtration rate stage g1 to g5 calculator', 'serum creatinine egfr ckd staging calculator', 'clinical nephrology kidney function online'],
    order: 1135,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Serum Creatinine S_cr (mg/dL), Age (Years) & Biological Sex',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gfr-scr">Creatinine (mg/dL)</label>
          <input class="tool-textarea" id="gfr-scr" type="number" step="0.1" value="1.0" placeholder="1.0 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gfr-age">Age (Years)</label>
          <input class="tool-textarea" id="gfr-age" type="number" step="1" value="55" placeholder="55 Years" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gfr-sex">Biological Sex</label>
          <select class="tool-textarea" id="gfr-sex">
            <option value="female">Female (κ = 0.7, α = -0.241)</option>
            <option value="male" selected>Male (κ = 0.9, α = -0.302)</option>
          </select>
        </div>
      </div>
      <div id="gfr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gfr-res-gfr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">eGFR = 86 mL / min / 1.73 m²</span>
            <span class="stat-label">Estimated Glomerular Filtration Rate (CKD-EPI 2021)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gfr-res-stage" style="color:var(--green-dark); font-weight:700;">STAGE G2: Mildly Decreased Kidney Function (60-89 mL/min/1.73m²)</span>
            <span class="stat-label">KDIGO Chronic Kidney Disease Staging</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const scrEl = document.getElementById('gfr-scr'), ageEl = document.getElementById('gfr-age'), sexEl = document.getElementById('gfr-sex');
  const gfrResEl = document.getElementById('gfr-res-gfr'), stgResEl = document.getElementById('gfr-res-stage');

  function update() {
    const Scr = parseFloat(scrEl.value), age = parseFloat(ageEl.value);
    const isFemale = sexEl.value === 'female';

    if (isNaN(Scr) || isNaN(age) || Scr <= 0 || age <= 0) return;

    const kappa = isFemale ? 0.7 : 0.9;
    const alpha = isFemale ? -0.241 : -0.302;
    const sexFactor = isFemale ? 1.012 : 1.0;

    const ratio = Scr / kappa;
    const term1 = Math.pow(Math.min(ratio, 1.0), alpha);
    const term2 = Math.pow(Math.max(ratio, 1.0), -1.200);
    const term3 = Math.pow(0.9938, age);

    const eGFR = 142.0 * term1 * term2 * term3 * sexFactor;

    let stage = '', color = '#22543d';
    if (eGFR >= 90.0) { stage = 'STAGE G1: Normal (≥ 90 mL/min/1.73m²)'; color = '#22543d'; }
    else if (eGFR >= 60.0) { stage = 'STAGE G2: Mildly Decreased (60 - 89 mL/min/1.73m²)'; color = '#22543d'; }
    else if (eGFR >= 45.0) { stage = 'STAGE G3a: Mild-Moderate (45 - 59 mL/min/1.73m²)'; color = '#ea580c'; }
    else if (eGFR >= 30.0) { stage = 'STAGE G3b: Moderate-Severe (30 - 44 mL/min/1.73m²)'; color = '#ea580c'; }
    else if (eGFR >= 15.0) { stage = 'STAGE G4: Severely Decreased (15 - 29 mL/min/1.73m²)'; color = '#c53030'; }
    else { stage = 'STAGE G5: Kidney Failure (< 15 mL/min)'; color = '#c53030'; }

    gfrResEl.textContent = 'eGFR = ' + Math.round(eGFR) + ' mL / min / 1.73 m²';
    gfrResEl.style.color = color;
    stgResEl.textContent = stage;
    stgResEl.style.color = color;
  }

  [scrEl, ageEl, sexEl].forEach(el => el.addEventListener('input', update));
  sexEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter serum creatinine in mg/dL.',
      'Enter patient age and biological sex.',
      'Inspect eGFR value and KDIGO CKD stage.'
    ],
    benefitTitle: 'CKD-EPI 2021 Global Standard',
    benefitContent: 'Eliminates racial adjustment factors for universal, equitable kidney diagnostic assessment.',
    faqs: [{ q: 'What eGFR indicates kidney failure?', a: 'eGFR $< 15\text{ mL/min/1.73m}^2$ defines Stage 5 End-Stage Renal Disease.' }]
  },

  // 3. Arterial Blood Gas (ABG) Acid-Base Calculator
  {
    slug: 'arterial-blood-gas-abg-henderson-hasselbalch-acid-base-calculator',
    name: 'Arterial Blood Gas (ABG Henderson-Hasselbalch pH = 6.1 + log([HCO₃⁻]/0.03·PaCO₂)) Calculator',
    description: 'Interpret clinical Arterial Blood Gas (ABG) panels: evaluate arterial blood pH, PaCO₂ in mmHg, HCO₃⁻ in mEq/L, and classify Metabolic vs Respiratory Acidosis / Alkalosis with Winter\'s formula respiratory compensation.',
    category: 'Health',
    icon: 'text',
    keywords: ['abg interpretation calculator', 'arterial blood gas henderson hasselbalch acid base formula online', 'metabolic respiratory acidosis alkalosis calculator', 'winters formula compensation abg calculator', 'clinical medicine intensive care abg interpretation online'],
    order: 1136,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Arterial pH (7.35-7.45), PaCO₂ (mmHg, 35-45) & Bicarbonate HCO₃⁻ (mEq/L, 22-26)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="abg-ph">Blood pH</label>
          <input class="tool-textarea" id="abg-ph" type="number" step="0.02" value="7.28" placeholder="7.28" />
        </div>
        <div class="control-group">
          <label class="control-label" for="abg-paco2">PaCO₂ (mmHg)</label>
          <input class="tool-textarea" id="abg-paco2" type="number" step="2" value="30.0" placeholder="30.0 mmHg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="abg-hco3">HCO₃⁻ (mEq/L)</label>
          <input class="tool-textarea" id="abg-hco3" type="number" step="1" value="14.0" placeholder="14.0 mEq/L" />
        </div>
      </div>
      <div id="abg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="abg-res-diag" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PRIMARY METABOLIC ACIDOSIS</span>
            <span class="stat-label">Primary Acid-Base Disturbance Diagnosis</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="abg-res-comp" style="color:var(--green-dark); font-weight:700;">Winter\'s Formula Expected PaCO₂ = 29.0 ± 2 mmHg (Appropriate Compensation ✓)</span>
            <span class="stat-label">Secondary Physiological Compensation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phEl = document.getElementById('abg-ph'), pco2El = document.getElementById('abg-paco2'), hco3El = document.getElementById('abg-hco3');
  const dgResEl = document.getElementById('abg-res-diag'), cpResEl = document.getElementById('abg-res-comp');

  function update() {
    const pH = parseFloat(phEl.value), PaCO2 = parseFloat(pco2El.value), HCO3 = parseFloat(hco3El.value);
    if (isNaN(pH) || isNaN(PaCO2) || isNaN(HCO3) || pH <= 0 || PaCO2 <= 0 || HCO3 <= 0) return;

    let diag = '', comp = '', color = '#22543d';

    if (pH < 7.35) {
      if (HCO3 < 22 && PaCO2 <= 40) {
        diag = 'PRIMARY METABOLIC ACIDOSIS (Low pH, Low HCO₃⁻)';
        color = '#c53030';
        const expPCO2 = 1.5 * HCO3 + 8.0;
        comp = 'Winter\'s Expected PaCO₂ = ' + expPCO2.toFixed(1) + ' ± 2 mmHg (' + (Math.abs(PaCO2 - expPCO2) <= 2 ? 'Appropriate Respiratory Compensation ✓' : 'Mixed Disorder') + ')';
      } else if (PaCO2 > 45 && HCO3 >= 22) {
        diag = 'PRIMARY RESPIRATORY ACIDOSIS (Low pH, High PaCO₂)';
        color = '#c53030';
        comp = 'Renal Bicarbonate Retention Compensation Active';
      } else {
        diag = 'MIXED ACIDOSIS';
        color = '#c53030';
      }
    } else if (pH > 7.45) {
      if (HCO3 > 26) {
        diag = 'PRIMARY METABOLIC ALKALOSIS (High pH, High HCO₃⁻)';
        color = '#2563eb';
        comp = 'Respiratory Hypoventilation Compensation';
      } else if (PaCO2 < 35) {
        diag = 'PRIMARY RESPIRATORY ALKALOSIS (High pH, Low PaCO₂)';
        color = '#2563eb';
        comp = 'Renal Bicarbonate Excretion Active';
      } else {
        diag = 'MIXED ALKALOSIS';
        color = '#2563eb';
      }
    } else {
      diag = 'NORMAL ACID-BASE BALANCE (pH 7.35 - 7.45)';
      comp = 'PaCO₂ = ' + PaCO2 + ' mmHg, HCO₃⁻ = ' + HCO3 + ' mEq/L';
    }

    dgResEl.textContent = diag;
    dgResEl.style.color = color;
    cpResEl.textContent = comp;
  }

  [phEl, pco2El, hco3El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pH, PaCO2, and HCO3.',
      'Inspect acid-base classification and physiological compensation.'
    ],
    benefitTitle: 'Henderson-Hasselbalch Acid-Base Equilibrium',
    benefitContent: 'Evaluates systemic bicarbonate and carbonic acid balance in critical care.',
    faqs: [{ q: 'What is Winter\'s formula used for?', a: 'Winter\'s formula evaluates respiratory compensation in metabolic acidosis.' }]
  },

  // 4. Body Surface Area (BSA) Mosteller Calculator
  {
    slug: 'body-surface-area-mosteller-du-bois-chemotherapy-calculator',
    name: 'Body Surface Area (BSA Mosteller Formula BSA = √(W·H / 3600)) Calculator',
    description: 'Calculate patient total Body Surface Area (BSA = √(Weight · Height / 3600)) in m² using the Mosteller, Du Bois, and Haycock formulas for chemotherapy dosing, burn assessment, and cardiac index.',
    category: 'Health',
    icon: 'text',
    keywords: ['body surface area calculator', 'mosteller bsa formula square root w h over 3600 online', 'chemotherapy drug dosing bsa calculator m2', 'du bois body surface area calculator height weight', 'clinical pharmacology oncology bsa online'],
    order: 1137,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Weight W (kg) & Height H (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bsa-w">Weight W (kg)</label>
          <input class="tool-textarea" id="bsa-w" type="number" step="1" value="70.0" placeholder="70.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bsa-h">Height H (cm)</label>
          <input class="tool-textarea" id="bsa-h" type="number" step="1" value="175.0" placeholder="175.0 cm" />
        </div>
      </div>
      <div id="bsa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bsa-res-most" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BSA = 1.84 m² (Mosteller)</span>
            <span class="stat-label">Mosteller Body Surface Area (BSA = √(W·H/3600))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bsa-res-other" style="color:var(--green-dark); font-weight:700;">Du Bois BSA = 1.85 m² | BMI = 22.9 kg/m²</span>
            <span class="stat-label">Comparative BSA Formulas & Body Mass Index</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('bsa-w'), hEl = document.getElementById('bsa-h');
  const mResEl = document.getElementById('bsa-res-most'), otResEl = document.getElementById('bsa-res-other');

  function update() {
    const W = parseFloat(wEl.value), H = parseFloat(hEl.value);
    if (isNaN(W) || isNaN(H) || W <= 0 || H <= 0) return;

    const bsa_mosteller = Math.sqrt((W * H) / 3600.0);
    const bsa_dubois = 0.007184 * Math.pow(W, 0.425) * Math.pow(H, 0.725);
    const bmi = W / Math.pow(H / 100.0, 2);

    mResEl.textContent = 'BSA = ' + bsa_mosteller.toFixed(2) + ' m² (Mosteller)';
    otResEl.textContent = 'Du Bois = ' + bsa_dubois.toFixed(2) + ' m² | BMI = ' + bmi.toFixed(1) + ' kg/m²';
  }

  wEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter weight in kg and height in cm.',
      'Inspect Mosteller and Du Bois BSA values in $\text{m}^2$.'
    ],
    benefitTitle: 'Mosteller Simplified BSA Standard',
    benefitContent: 'Accurately scales chemotherapy medication dosages to physiological surface area.',
    faqs: [{ q: 'Why is BSA used for cancer chemotherapy?', a: 'Metabolic drug clearance correlates more accurately with body surface area than total weight.' }]
  },

  // 5. Parkland Formula Burn Resuscitation Calculator
  {
    slug: 'parkland-formula-burn-resuscitation-fluid-calculator',
    name: 'Parkland Formula Burn Resuscitation IV Fluid (4 mL · kg · %TBSA) Calculator',
    description: 'Calculate emergency 24-hour Lactated Ringer\'s IV fluid resuscitation (Volume = 4 mL · Weight · %TBSA) for acute burn trauma patients, including first 8-hour and remaining 16-hour infusion rates.',
    category: 'Health',
    icon: 'text',
    keywords: ['parkland formula calculator', 'burn fluid resuscitation formula 4 ml kg tbsa online', 'lactated ringers iv infusion rate burn calculator ml hr', 'rule of nines total body surface area burn calculator', 'emergency medicine trauma burn resuscitation online'],
    order: 1138,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Weight (kg) & %TBSA Burn (2nd & 3rd Degree)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pk-w">Weight (kg)</label>
          <input class="tool-textarea" id="pk-w" type="number" step="5" value="75.0" placeholder="75.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pk-tbsa">%TBSA Burn</label>
          <input class="tool-textarea" id="pk-tbsa" type="number" step="5" min="10" max="95" value="30.0" placeholder="30.0%" />
        </div>
      </div>
      <div id="pk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pk-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">24-Hour Total = 9,000 mL Lactated Ringer\'s</span>
            <span class="stat-label">Total 24-Hour IV Resuscitation Fluid (4 mL · kg · %TBSA)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pk-res-rates" style="color:var(--green-dark); font-weight:700;">First 8 Hours: 563 mL/hr (4,500 mL) | Next 16 Hours: 281 mL/hr (4,500 mL)</span>
            <span class="stat-label">Initial 8-Hour vs Maintenance 16-Hour IV Infusion Rates</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('pk-w'), tbEl = document.getElementById('pk-tbsa');
  const totResEl = document.getElementById('pk-res-tot'), rtResEl = document.getElementById('pk-res-rates');

  function update() {
    const W = parseFloat(wEl.value), TBSA = parseFloat(tbEl.value);
    if (isNaN(W) || isNaN(TBSA) || W <= 0 || TBSA <= 0 || TBSA > 100) return;

    const total_vol_mL = 4.0 * W * TBSA;
    const vol_8h = total_vol_mL * 0.50;
    const rate_8h = vol_8h / 8.0;
    const vol_16h = total_vol_mL * 0.50;
    const rate_16h = vol_16h / 16.0;

    totResEl.textContent = '24-Hour Total = ' + Math.round(total_vol_mL).toLocaleString() + ' mL Lactated Ringer\'s';
    rtResEl.textContent = 'First 8 Hours: ' + Math.round(rate_8h) + ' mL/hr (' + Math.round(vol_8h).toLocaleString() + ' mL) | Next 16 Hours: ' + Math.round(rate_16h) + ' mL/hr';
  }

  wEl.addEventListener('input', update);
  tbEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter patient weight and %TBSA burn area.',
      'Inspect 24-hour total volume and first 8-hour vs 16-hour infusion rates.'
    ],
    benefitTitle: 'Parkland Burn Shock Resuscitation',
    benefitContent: 'Restores intravascular volume following severe thermal capillary permeability loss.',
    faqs: [{ q: 'What is the target urine output during burn resuscitation?', a: 'Target urine output is $0.5\text{ to }1.0\text{ mL/kg/hour}$ in adults.' }]
  },

  // 6. Glasgow Coma Scale (GCS) Calculator
  {
    slug: 'glasgow-coma-scale-gcs-neurological-tbi-calculator',
    name: 'Glasgow Coma Scale (GCS Total 3 to 15 Traumatic Brain Injury) Calculator',
    description: 'Calculate Glasgow Coma Scale neurological score (GCS = Eye + Verbal + Motor from 3 to 15) to evaluate consciousness level and classify Traumatic Brain Injury (TBI Mild 13-15, Moderate 9-12, Severe 3-8 intubation criteria).',
    category: 'Health',
    icon: 'text',
    keywords: ['glasgow coma scale calculator', 'gcs score formula eye verbal motor 3 to 15 online', 'traumatic brain injury severity tbi calculator', 'gcs intubation threshold emergency medicine calculator', 'neurology clinical gcs coma scale online'],
    order: 1139,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Eye Opening (E 1-4), Verbal Response (V 1-5) & Motor Response (M 1-6)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gcs-e">Eye (E)</label>
          <select class="tool-textarea" id="gcs-e">
            <option value="4" selected>4 - Spontaneous</option>
            <option value="3">3 - To sound</option>
            <option value="2">2 - To pressure</option>
            <option value="1">1 - None</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="gcs-v">Verbal (V)</label>
          <select class="tool-textarea" id="gcs-v">
            <option value="5" selected>5 - Oriented</option>
            <option value="4">4 - Confused</option>
            <option value="3">3 - Inappropriate</option>
            <option value="2">2 - Incomprehensible</option>
            <option value="1">1 - None</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="gcs-m">Motor (M)</label>
          <select class="tool-textarea" id="gcs-m">
            <option value="6" selected>6 - Obeys commands</option>
            <option value="5">5 - Localizes</option>
            <option value="4">4 - Flexion</option>
            <option value="3">3 - Abnormal flexion</option>
            <option value="2">2 - Extension</option>
            <option value="1">1 - None</option>
          </select>
        </div>
      </div>
      <div id="gcs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gcs-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total GCS = 15 (E4 V5 M6)</span>
            <span class="stat-label">Glasgow Coma Scale Total Score (Range: 3 to 15)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gcs-res-tbi" style="color:var(--green-dark); font-weight:700;">MILD HEAD INJURY (GCS 13-15: Fully conscious)</span>
            <span class="stat-label">Traumatic Brain Injury (TBI) Severity Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('gcs-e'), vEl = document.getElementById('gcs-v'), mEl = document.getElementById('gcs-m');
  const totResEl = document.getElementById('gcs-res-tot'), tbiResEl = document.getElementById('gcs-res-tbi');

  function update() {
    const E = parseInt(eEl.value, 10), V = parseInt(vEl.value, 10), M = parseInt(mEl.value, 10);
    const totalGCS = E + V + M;

    let tbi = '', color = '#22543d';
    if (totalGCS >= 13) { tbi = 'MILD BRAIN INJURY (GCS 13 - 15)'; color = '#22543d'; }
    else if (totalGCS >= 9) { tbi = 'MODERATE BRAIN INJURY (GCS 9 - 12)'; color = '#ea580c'; }
    else { tbi = 'SEVERE TBI / COMA (GCS ≤ 8: Intubation recommended)'; color = '#c53030'; }

    totResEl.textContent = 'Total GCS = ' + totalGCS + ' (E' + E + ' V' + V + ' M' + M + ')';
    totResEl.style.color = color;
    tbiResEl.textContent = tbi;
    tbiResEl.style.color = color;
  }

  [eEl, vEl, mEl].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Select Eye, Verbal, and Motor response categories.',
      'Inspect total GCS score (3–15) and TBI severity classification.'
    ],
    benefitTitle: 'Glasgow Coma Scale Neurological Standard',
    benefitContent: 'Standardizes objective consciousness assessment across trauma and neurocritical care.',
    faqs: [{ q: 'What is the lowest possible GCS score?', a: 'The lowest score is 3 (E1 V1 M1), representing complete unresponsiveness.' }]
  },

  // 7. Cockcroft-Gault Creatinine Clearance Calculator
  {
    slug: 'creatinine-clearance-cockcroft-gault-kidney-drug-dosing-calculator',
    name: 'Creatinine Clearance (Cockcroft-Gault CrCl = (140 - Age)·Weight / (72·S_cr)) Calculator',
    description: 'Calculate renal Creatinine Clearance (CrCl in mL/min) using the Cockcroft-Gault equation for clinical pharmacokinetic drug dosing adjustments (antibiotics, DOACs, chemotherapy).',
    category: 'Health',
    icon: 'text',
    keywords: ['cockcroft gault calculator', 'creatinine clearance crcl formula online', 'renal drug dosing adjustment calculator ml min', 'serum creatinine cockcroft gault clearance calculator', 'pharmacology clinical nephrology drug dosing online'],
    order: 1140,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Age (Years), Weight (kg), Serum Creatinine S_cr (mg/dL) & Sex',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cg-age">Age (Years)</label>
          <input class="tool-textarea" id="cg-age" type="number" step="1" value="65" placeholder="65" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-w">Weight (kg)</label>
          <input class="tool-textarea" id="cg-w" type="number" step="1" value="70.0" placeholder="70.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-scr">Creatinine (mg/dL)</label>
          <input class="tool-textarea" id="cg-scr" type="number" step="0.1" value="1.2" placeholder="1.2 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-sex">Sex</label>
          <select class="tool-textarea" id="cg-sex">
            <option value="male" selected>Male (1.00 Factor)</option>
            <option value="female">Female (0.85 Factor)</option>
          </select>
        </div>
      </div>
      <div id="cg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cg-res-crcl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CrCl = 60.8 mL / min</span>
            <span class="stat-label">Estimated Creatinine Clearance (Cockcroft-Gault)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cg-res-dose" style="color:var(--green-dark); font-weight:700;">Moderate Renal Impairment (50-80 mL/min: Reduce renally cleared drug doses by ~25%)</span>
            <span class="stat-label">Pharmacokinetic Drug Dosing Adjustment Guidance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ageEl = document.getElementById('cg-age'), wEl = document.getElementById('cg-w');
  const scrEl = document.getElementById('cg-scr'), sexEl = document.getElementById('cg-sex');
  const clResEl = document.getElementById('cg-res-crcl'), dsResEl = document.getElementById('cg-res-dose');

  function update() {
    const age = parseFloat(ageEl.value), W = parseFloat(wEl.value), Scr = parseFloat(scrEl.value);
    const isFemale = sexEl.value === 'female';

    if (isNaN(age) || isNaN(W) || isNaN(Scr) || age <= 0 || W <= 0 || Scr <= 0) return;

    // Cockcroft-Gault: CrCl = ( (140 - Age) * W ) / ( 72 * Scr ) * (0.85 if female)
    let CrCl = ((140.0 - age) * W) / (72.0 * Scr);
    if (isFemale) CrCl *= 0.85;

    let guide = '', color = '#22543d';
    if (CrCl >= 90) { guide = 'Normal Renal Clearance (≥ 90 mL/min: Standard 100% dosing)'; color = '#22543d'; }
    else if (CrCl >= 60) { guide = 'Mild Impairment (60 - 89 mL/min: Standard to mild dose reduction)'; color = '#22543d'; }
    else if (CrCl >= 30) { guide = 'Moderate Impairment (30 - 59 mL/min: Reduce dose / extend interval)'; color = '#ea580c'; }
    else if (CrCl >= 15) { guide = 'Severe Renal Impairment (15 - 29 mL/min: Significant dose reduction mandatory)'; color = '#c53030'; }
    else { guide = 'End-Stage Renal Failure (< 15 mL/min: Avoid nephrotoxic drugs / Dialysis dosing)'; color = '#c53030'; }

    clResEl.textContent = 'CrCl = ' + CrCl.toFixed(1) + ' mL / min';
    clResEl.style.color = color;
    dsResEl.textContent = guide;
    dsResEl.style.color = color;
  }

  [ageEl, wEl, scrEl].forEach(el => el.addEventListener('input', update));
  sexEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter patient age, weight in kg, serum creatinine in mg/dL, and sex.',
      'Inspect estimated Creatinine Clearance ($CrCl$) and FDA drug dosing adjustment recommendation.'
    ],
    benefitTitle: 'Cockcroft-Gault 1976 Pharmacokinetic Dosing Equation',
    benefitContent: 'Required by FDA and EMA package inserts for adjusting drug dosages (like novel oral anticoagulants DOACs and vancomycin).',
    faqs: [{ q: 'Why is female CrCl multiplied by 0.85?', a: 'Women have approximately $15\%$ less baseline muscle mass per kilogram of body weight, generating less daily creatinine.' }]
  },

  // 8. Mean Arterial Pressure (MAP) & Pulse Pressure Calculator
  {
    slug: 'mean-arterial-pressure-map-pulse-pressure-calculator',
    name: 'Mean Arterial Pressure (MAP = DBP + ⅓·(SBP - DBP)) & Pulse Pressure Calculator',
    description: 'Calculate clinical Mean Arterial Pressure (MAP = DBP + ⅓·(SBP - DBP)) in mmHg, Pulse Pressure (PP = SBP - DBP), and verify critical organ perfusion threshold (MAP ≥ 65 mmHg) for ICU hemodynamics.',
    category: 'Health',
    icon: 'text',
    keywords: ['mean arterial pressure calculator', 'map formula dbp plus one third pulse pressure online', 'pulse pressure sbp minus dbp calculator mmhg', 'icu organ perfusion map 65 mmhg threshold calculator', 'cardiovascular hemodynamics blood pressure online'],
    order: 1141,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Systolic Blood Pressure SBP (mmHg) & Diastolic Blood Pressure DBP (mmHg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="map-sbp">Systolic SBP (mmHg)</label>
          <input class="tool-textarea" id="map-sbp" type="number" step="5" value="120" placeholder="120 mmHg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="map-dbp">Diastolic DBP (mmHg)</label>
          <input class="tool-textarea" id="map-dbp" type="number" step="5" value="80" placeholder="80 mmHg" />
        </div>
      </div>
      <div id="map-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="map-res-map" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">MAP = 93.3 mmHg</span>
            <span class="stat-label">Mean Arterial Perfusion Pressure (MAP = DBP + ⅓·PP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="map-res-pp" style="color:var(--green-dark); font-weight:700;">Pulse Pressure PP = 40 mmHg (NORMAL: 30-50 mmHg | MAP ≥ 65 mmHg Adequate Perfusion ✓)</span>
            <span class="stat-label">Pulse Pressure & ICU Vital Organ Perfusion Benchmark</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sbpEl = document.getElementById('map-sbp'), dbpEl = document.getElementById('map-dbp');
  const mapResEl = document.getElementById('map-res-map'), ppResEl = document.getElementById('map-res-pp');

  function update() {
    const sbp = parseFloat(sbpEl.value), dbp = parseFloat(dbpEl.value);
    if (isNaN(sbp) || isNaN(dbp) || sbp <= 0 || dbp <= 0 || sbp <= dbp) return;

    // Pulse pressure PP = SBP - DBP
    const PP = sbp - dbp;

    // MAP = DBP + (1/3) * PP
    const MAP = dbp + (PP / 3.0);

    let status = '', color = '#22543d';
    if (MAP >= 70 && MAP <= 105) {
      status = 'OPTIMAL ORGAN PERFUSION (MAP 70 - 105 mmHg: Brain & renal autoregulation intact)';
      color = '#22543d';
    } else if (MAP >= 65) {
      status = 'ADEQUATE ICU THRESHOLD (MAP 65 - 69 mmHg: Surviving Sepsis Campaign target)';
      color = '#22543d';
    } else {
      status = 'HYPOPERFUSION RISK (MAP < 65 mmHg: Ischemia / acute tubular necrosis danger!)';
      color = '#c53030';
    }

    mapResEl.textContent = 'MAP = ' + MAP.toFixed(1) + ' mmHg';
    mapResEl.style.color = color;
    ppResEl.textContent = 'Pulse Pressure PP = ' + Math.round(PP) + ' mmHg | ' + status;
    ppResEl.style.color = color;
  }

  sbpEl.addEventListener('input', update);
  dbpEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter systolic blood pressure (SBP) in mmHg.',
      'Enter diastolic blood pressure (DBP) in mmHg.',
      'Inspect Mean Arterial Pressure ($MAP = DBP + \frac{1}{3}PP$), pulse pressure, and clinical perfusion status.'
    ],
    benefitTitle: 'Arterial Pressure Waveform Integration',
    benefitContent: 'Because the cardiac cycle spends approximately two-thirds of its time in diastole and one-third in systole, MAP weights diastolic pressure twice as heavily ($MAP = \frac{SBP + 2\cdot DBP}{3}$).',
    faqs: [{ q: 'Why is MAP >= 65 mmHg the standard ICU resuscitation target?', a: 'A MAP of $\ge 65\text{ mmHg}$ maintains coronary, cerebral, and renal capillary perfusion gradients.' }]
  },

  // 9. Systemic Vascular Resistance (SVR) Hemodynamics Calculator
  {
    slug: 'systemic-vascular-resistance-svr-cardiac-hemodynamics-calculator',
    name: 'Systemic Vascular Resistance (SVR = 80·(MAP - CVP) / CO) Hemodynamics Calculator',
    description: 'Calculate systemic vascular resistance (SVR = 80 · (MAP - CVP) / CO) in dynes·s/cm⁵ and Wood Units to evaluate arterial vasoconstriction vs vasodilation shock in intensive care.',
    category: 'Health',
    icon: 'text',
    keywords: ['systemic vascular resistance calculator', 'svr formula 80 times map minus cvp over co online', 'afterload vascular resistance hemodynamics calculator', 'distributive septic cardiogenic shock svr calculator', 'critical care cardiology hemodynamics online'],
    order: 1142,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mean Arterial Pressure MAP (mmHg), Central Venous Pressure CVP (mmHg) & Cardiac Output CO (L/min)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="svr-map">MAP (mmHg)</label>
          <input class="tool-textarea" id="svr-map" type="number" step="5" value="85.0" placeholder="85.0 mmHg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="svr-cvp">CVP (mmHg)</label>
          <input class="tool-textarea" id="svr-cvp" type="number" step="2" value="5.0" placeholder="5.0 mmHg (Right Atrial)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="svr-co">Cardiac Output CO</label>
          <input class="tool-textarea" id="svr-co" type="number" step="0.5" value="5.0" placeholder="5.0 L/min" />
        </div>
      </div>
      <div id="svr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="svr-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">SVR = 1,280 dynes·s / cm⁵</span>
            <span class="stat-label">Systemic Vascular Resistance (80·(MAP - CVP) / CO)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="svr-res-wood" style="color:var(--green-dark); font-weight:700;">NORMAL SVR (800 - 1,400 dynes·s/cm⁵ | 16.0 Wood Units | Normal Afterload)</span>
            <span class="stat-label">Clinical Hemodynamic State & Vasomotor Tone</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mapEl = document.getElementById('svr-map'), cvpEl = document.getElementById('svr-cvp'), coEl = document.getElementById('svr-co');
  const svrResEl = document.getElementById('svr-res-val'), wdResEl = document.getElementById('svr-res-wood');

  function update() {
    const MAP = parseFloat(mapEl.value), CVP = parseFloat(cvpEl.value), CO = parseFloat(coEl.value);
    if (isNaN(MAP) || isNaN(CVP) || isNaN(CO) || CO <= 0 || MAP <= CVP) return;

    // SVR = 80 * (MAP - CVP) / CO  [dynes * s / cm^5]
    const SVR = (80.0 * (MAP - CVP)) / CO;
    const woodUnits = (MAP - CVP) / CO;

    let status = '', color = '#22543d';
    if (SVR >= 800 && SVR <= 1400) {
      status = 'NORMAL VASCULAR TONE (800 - 1,400 dynes·s/cm⁵)';
      color = '#22543d';
    } else if (SVR < 800) {
      status = 'VASODILATORY / DISTRIBUTIVE SHOCK (SVR < 800: Sepsis / Anaphylaxis / Vasoplegia)';
      color = '#c53030';
    } else {
      status = 'VASOCONSTRICTED / HIGH AFTERLOAD (SVR > 1400: Cardiogenic shock / Hypovolemia)';
      color = '#2563eb';
    }

    svrResEl.textContent = 'SVR = ' + Math.round(SVR).toLocaleString() + ' dynes·s / cm⁵';
    svrResEl.style.color = color;
    wdResEl.textContent = woodUnits.toFixed(1) + ' Wood Units | ' + status;
    wdResEl.style.color = color;
  }

  [mapEl, cvpEl, coEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Mean Arterial Pressure (MAP) in mmHg.',
      'Enter Central Venous Pressure (CVP) in mmHg.',
      'Enter Cardiac Output (CO) in L/min.',
      'Inspect Systemic Vascular Resistance in $\text{dynes}\cdot\text{s/cm}^5$ and Wood Units.'
    ],
    benefitTitle: 'Ohm\'s Law Fluid Resistance Analog',
    benefitContent: 'SVR represents left ventricular afterload resistance ($\Delta P / Q$), distinguishing warm distributive septic shock (low SVR) from cold cardiogenic shock (high compensatory SVR).',
    faqs: [{ q: 'Why is SVR multiplied by 80?', a: '80 is the unit conversion factor converting mmHg per L/min into metric CGS units of $\text{dynes}\cdot\text{s/cm}^5$.' }]
  },

  // 10. Holliday-Segar 4-2-1 Maintenance IV Fluid Calculator
  {
    slug: 'maintenance-iv-fluid-holliday-segar-4-2-1-rule-calculator',
    name: 'Pediatric Maintenance IV Fluid (Holliday-Segar 4-2-1 Rule) Calculator',
    description: 'Calculate pediatric and adult baseline daily maintenance intravenous fluid volume and hourly infusion rates (4-2-1 Rule: 4 mL/kg/hr for first 10 kg, 2 mL/kg/hr for next 10 kg, 1 mL/kg/hr thereafter) for clinical medicine.',
    category: 'Health',
    icon: 'text',
    keywords: ['4 2 1 rule calculator', 'holliday segar maintenance iv fluid formula online', 'pediatric maintenance fluid calculator ml hr', 'daily fluid requirement holiday segar calculator ml day', 'pediatrics clinical iv fluid therapy online'],
    order: 1143,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Patient Body Weight (kg)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="iv-w">Body Weight (kg)</label>
        <input class="tool-textarea" id="iv-w" type="number" step="1" min="1" max="150" value="25.0" placeholder="25.0 kg (Child)" />
      </div>
      <div id="iv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="iv-res-rate" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Hourly Rate = 65 mL / hr</span>
            <span class="stat-label">Holliday-Segar Maintenance Infusion Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="iv-res-day" style="color:var(--green-dark); font-weight:700;">24-Hour Total = 1,600 mL / day (10kg: 40mL/hr + 10kg: 20mL/hr + 5kg: 5mL/hr)</span>
            <span class="stat-label">Total 24-Hour Daily Maintenance Fluid Requirement</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('iv-w');
  const rtResEl = document.getElementById('iv-res-rate'), dyResEl = document.getElementById('iv-res-day');

  function update() {
    const W = parseFloat(wEl.value);
    if (isNaN(W) || W <= 0) return;

    // 4-2-1 Rule:
    // First 10 kg: 4 mL/kg/hr (40 mL/hr max, or 100 mL/kg/day)
    // 10 to 20 kg: +2 mL/kg/hr (20 mL/hr max, or 50 mL/kg/day)
    // > 20 kg: +1 mL/kg/hr (20 mL/kg/day)
    let rate_mL_hr = 0, total_mL_day = 0;

    if (W <= 10.0) {
      rate_mL_hr = 4.0 * W;
      total_mL_day = 100.0 * W;
    } else if (W <= 20.0) {
      rate_mL_hr = 40.0 + 2.0 * (W - 10.0);
      total_mL_day = 1000.0 + 50.0 * (W - 10.0);
    } else {
      rate_mL_hr = 60.0 + 1.0 * (W - 20.0);
      total_mL_day = 1500.0 + 20.0 * (W - 20.0);
    }

    rtResEl.textContent = 'Hourly Rate = ' + Math.round(rate_mL_hr) + ' mL / hr';
    dyResEl.textContent = '24-Hour Total = ' + Math.round(total_mL_day).toLocaleString() + ' mL / day (Weight: ' + W + ' kg | Standard D5 ½ NS + 20 mEq KCl)';
  }

  wEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter patient body weight in kg.',
      'Inspect hourly maintenance IV fluid infusion rate in mL/hr and total 24-hour daily volume.'
    ],
    benefitTitle: 'Malcolm A. Holliday & William E. Segar 1957 Caloric Standard',
    benefitContent: 'Calculates physiological water loss based on metabolic caloric expenditure ($100\text{ kcal/kg}$ for infants), preventing dehydration or dangerous iatrogenic hyponatremia.',
    faqs: [{ q: 'What IV fluid is typically used for pediatric maintenance?', a: 'Isotonic crystalloid solutions like $D_5$ $0.9\%$ Normal Saline or Plasmalyte with $20\text{ mEq/L KCl}$ are recommended to avoid hyponatremia.' }]
  },

  // 11. Serum Anion Gap & Delta-Delta Metabolic Acidosis Calculator
  {
    slug: 'anion-gap-serum-osmolar-gap-metabolic-acidosis-calculator',
    name: 'Serum Anion Gap (AG = Na⁺ - (Cl⁻ + HCO₃⁻)) & Delta-Delta Ratio Calculator',
    description: 'Calculate serum Anion Gap (AG = Na⁺ - (Cl⁻ + HCO₃⁻)) in mEq/L, albumin-corrected anion gap, and Delta-Delta ratio (ΔAG / ΔHCO₃⁻) to identify mixed High Anion Gap Metabolic Acidosis (HAGMA vs NAGMA).',
    category: 'Health',
    icon: 'text',
    keywords: ['anion gap calculator', 'serum anion gap formula na minus cl plus hco3 online', 'hagma nagma metabolic acidosis calculator', 'delta delta ratio anion gap calculator', 'clinical nephrology intensive care acid base online'],
    order: 1144,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sodium Na⁺ (mEq/L), Chloride Cl⁻ (mEq/L), Bicarbonate HCO₃⁻ (mEq/L) & Serum Albumin (g/dL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ag-na">Na⁺ (mEq/L)</label>
          <input class="tool-textarea" id="ag-na" type="number" step="1" value="140" placeholder="140" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-cl">Cl⁻ (mEq/L)</label>
          <input class="tool-textarea" id="ag-cl" type="number" step="1" value="100" placeholder="100" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-hco3">HCO₃⁻ (mEq/L)</label>
          <input class="tool-textarea" id="ag-hco3" type="number" step="1" value="15" placeholder="15" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-alb">Albumin (g/dL)</label>
          <input class="tool-textarea" id="ag-alb" type="number" step="0.5" value="4.0" placeholder="4.0 g/dL" />
        </div>
      </div>
      <div id="ag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ag-res-ag" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Anion Gap = 25.0 mEq / L (ELEVATED)</span>
            <span class="stat-label">Serum Anion Gap (Normal: 8 to 12 mEq/L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ag-res-delta" style="color:var(--green-dark); font-weight:700;">HAGMA DETECTED | Delta Ratio = 1.44 (Pure High Anion Gap Metabolic Acidosis)</span>
            <span class="stat-label">Differential Diagnosis & Delta-Delta Ratio (ΔAG / ΔHCO₃⁻)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const naEl = document.getElementById('ag-na'), clEl = document.getElementById('ag-cl');
  const hco3El = document.getElementById('ag-hco3'), albEl = document.getElementById('ag-alb');
  const agResEl = document.getElementById('ag-res-ag'), dtResEl = document.getElementById('ag-res-delta');

  function update() {
    const Na = parseFloat(naEl.value), Cl = parseFloat(clEl.value);
    const HCO3 = parseFloat(hco3El.value), Alb = parseFloat(albEl.value);

    if (isNaN(Na) || isNaN(Cl) || isNaN(HCO3) || isNaN(Alb) || Na <= 0 || Cl <= 0 || HCO3 <= 0 || Alb <= 0) return;

    // Uncorrected Anion Gap: AG = Na - (Cl + HCO3)
    const AG = Na - (Cl + HCO3);

    // Albumin corrected AG = AG + 2.5 * (4.0 - Albumin)
    const AG_corr = AG + 2.5 * (4.0 - Alb);

    // Delta-Delta: delta_AG = AG_corr - 12, delta_HCO3 = 24 - HCO3
    const delta_AG = AG_corr - 12.0;
    const delta_HCO3 = 24.0 - HCO3;
    const delta_ratio = delta_HCO3 > 0 ? delta_AG / delta_HCO3 : 1.0;

    let status = '', color = '#22543d';
    if (AG_corr > 12.0) {
      status = 'HIGH ANION GAP (HAGMA: MUDPILES - Ketoacidosis, Lactic Acidosis, Toxins)';
      color = '#c53030';
    } else {
      status = 'NORMAL ANION GAP (NAGMA: Diarrhea, RTA, Saline Infusion)';
      color = '#22543d';
    }

    agResEl.textContent = 'Anion Gap = ' + AG_corr.toFixed(1) + ' mEq / L (' + (AG_corr > 12 ? 'ELEVATED' : 'NORMAL') + ')';
    agResEl.style.color = color;
    dtResEl.textContent = status + ' | Delta Ratio = ' + delta_ratio.toFixed(2) + ' (Albumin: ' + Alb + ' g/dL)';
    dtResEl.style.color = color;
  }

  [naEl, clEl, hco3El, albEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter serum sodium, chloride, bicarbonate, and albumin.',
      'Inspect albumin-corrected Anion Gap and Delta-Delta ratio classification.'
    ],
    benefitTitle: 'Serum Electroneutrality Anion Gap Principle',
    benefitContent: 'Unmeasured pathological organic anions (lactate, acetoacetate, formate) increase the anion gap, pinpointing diabetic ketoacidosis, septic lactic acidosis, and toxic alcohol ingestions.',
    faqs: [{ q: 'What is the MUDPILES mnemonic for high anion gap acidosis?', a: 'Methanol, Uremia, DKA, Paraldehyde, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates.' }]
  },

  // 12. Corrected Sodium in Hyperglycemia (Katz & Hillier) Calculator
  {
    slug: 'corrected-sodium-hyperglycemia-katz-hillier-calculator',
    name: 'Corrected Sodium in Hyperglycemia (Katz Na_corr = Na_meas + 0.016·(Glucose - 100)) Calculator',
    description: 'Calculate hyperglycemia osmotic pseudohyponatremia corrected serum sodium (Na_corr = Na_meas + 0.016 · (Glucose - 100) or Hillier 0.024 factor) for Diabetic Ketoacidosis (DKA) and HHS management.',
    category: 'Health',
    icon: 'text',
    keywords: ['corrected sodium calculator', 'hyperglycemia sodium correction formula katz hillier online', 'dka pseudohyponatremia corrected sodium calculator', 'glucose osmolarity corrected sodium calculator dka', 'endocrinology diabetes clinical dka calculator online'],
    order: 1145,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Measured Serum Sodium (mEq/L) & Serum Glucose (mg/dL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="na-meas">Measured Na⁺</label>
          <input class="tool-textarea" id="na-meas" type="number" step="1" value="130" placeholder="130 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="na-glu">Glucose (mg/dL)</label>
          <input class="tool-textarea" id="na-glu" type="number" step="50" value="600" placeholder="600 mg/dL (DKA)" />
        </div>
      </div>
      <div id="na-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="na-res-corr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Corrected Na⁺ = 138.0 mEq / L</span>
            <span class="stat-label">True Osmotic Corrected Sodium (Katz Standard Formula)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="na-res-hil" style="color:var(--green-dark); font-weight:700;">Hillier 2.4 Factor = 142.0 mEq/L | Effective Osmolality = 293.3 mOsm/kg (Normal Hydration)</span>
            <span class="stat-label">Hillier Comparison & Effective Serum Osmolality</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const naEl = document.getElementById('na-meas'), glEl = document.getElementById('na-glu');
  const crResEl = document.getElementById('na-res-corr'), hlResEl = document.getElementById('na-res-hil');

  function update() {
    const Na = parseFloat(naEl.value), Glu = parseFloat(glEl.value);
    if (isNaN(Na) || isNaN(Glu) || Na <= 0 || Glu <= 0) return;

    // Katz standard formula: Na_corr = Na + 0.016 * (Glu - 100) (1.6 mEq/L per 100 mg/dL over 100)
    const excessGlu = Math.max(0, Glu - 100.0);
    const Na_katz = Na + (0.016 * excessGlu);

    // Hillier formula: 2.4 mEq/L per 100 mg/dL glucose over 100
    const Na_hillier = Na + (0.024 * excessGlu);

    // Effective serum osmolality = 2 * Na + (Glu / 18)
    const eff_osmo = 2.0 * Na + (Glu / 18.0);

    crResEl.textContent = 'Corrected Na⁺ = ' + Na_katz.toFixed(1) + ' mEq / L (Katz 1.6)';
    hlResEl.textContent = 'Hillier 2.4 = ' + Na_hillier.toFixed(1) + ' mEq/L | Effective Osmolality = ' + eff_osmo.toFixed(1) + ' mOsm/kg (Measured Na: ' + Na + ' mEq/L @ Glucose: ' + Glu + ' mg/dL)';
  }

  naEl.addEventListener('input', update);
  glEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter measured lab serum sodium in mEq/L.',
      'Enter serum blood glucose level in mg/dL.',
      'Inspect osmotic corrected sodium (Katz 1.6 and Hillier 2.4 equations) and effective serum osmolality.'
    ],
    benefitTitle: 'Hyperglycemic Intracellular-Extracellular Osmotic Shift',
    benefitContent: 'High extracellular glucose draws water out of cells into vascular space by osmosis, diluting measured serum sodium; calculating corrected sodium prevents mistakenly infusing hypotonic fluids in DKA/HHS.',
    faqs: [{ q: 'When should 0.45% Normal Saline be selected in DKA?', a: 'If corrected sodium is normal or elevated ($\ge 135\text{ mEq/L}$), switch from $0.9\%$ to $0.45\%$ Normal Saline.' }]
  },

  // 13. Corrected Calcium in Hypoalbuminemia (Payne Formula) Calculator
  {
    slug: 'corrected-calcium-hypoalbuminemia-payne-formula-calculator',
    name: 'Corrected Calcium in Hypoalbuminemia (Payne Formula Ca_corr = Ca_meas + 0.8·(4.0 - Alb)) Calculator',
    description: 'Calculate serum total calcium corrected for hypoalbuminemia (Ca_corr = Ca_meas + 0.8 · (4.0 - Albumin)) in mg/dL and mmol/L to prevent misdiagnosing hypocalcemia in malnourished or ICU patients.',
    category: 'Health',
    icon: 'text',
    keywords: ['corrected calcium calculator', 'hypoalbuminemia calcium correction payne formula online', 'albumin corrected total calcium calculator mg dl mmol l', 'ionized calcium pseudohypocalcemia calculator', 'clinical biochemistry calcium homeostasis online'],
    order: 1146,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Measured Total Calcium (mg/dL) & Serum Albumin (g/dL, Normal 4.0 g/dL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ca-meas">Calcium (mg/dL)</label>
          <input class="tool-textarea" id="ca-meas" type="number" step="0.2" value="7.6" placeholder="7.6 mg/dL (8.5-10.5)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ca-alb">Albumin (g/dL)</label>
          <input class="tool-textarea" id="ca-alb" type="number" step="0.2" value="2.0" placeholder="2.0 g/dL (Low)" />
        </div>
      </div>
      <div id="ca-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ca-res-corr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Corrected Ca = 9.20 mg / dL (2.30 mmol/L)</span>
            <span class="stat-label">True Albumin-Corrected Serum Calcium (Payne Formula)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ca-res-stat" style="color:var(--green-dark); font-weight:700;">NORMO-CALCEMIC (8.5 - 10.5 mg/dL: Pseudohypocalcemia caused by low albumin protein)</span>
            <span class="stat-label">Clinical Calcium Status & Ionized Fraction Integrity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const caEl = document.getElementById('ca-meas'), albEl = document.getElementById('ca-alb');
  const crResEl = document.getElementById('ca-res-corr'), stResEl = document.getElementById('ca-res-stat');

  function update() {
    const Ca = parseFloat(caEl.value), Alb = parseFloat(albEl.value);
    if (isNaN(Ca) || isNaN(Alb) || Ca <= 0 || Alb <= 0) return;

    // Payne Formula: Ca_corr = Ca_meas + 0.8 * (4.0 - Albumin)  [mg / dL]
    const Ca_corr_mg = Ca + 0.8 * (4.0 - Alb);
    const Ca_corr_mmol = Ca_corr_mg * 0.2495;

    let status = '', color = '#22543d';
    if (Ca_corr_mg >= 8.5 && Ca_corr_mg <= 10.5) {
      status = 'EUCALCEMIC / NORMAL (8.5 - 10.5 mg/dL: Ionized calcium is physiologic)';
      color = '#22543d';
    } else if (Ca_corr_mg < 8.5) {
      status = 'TRUE HYPOCALCEMIA (< 8.5 mg/dL: Check PTH, Vitamin D, Magnesium)';
      color = '#c53030';
    } else {
      status = 'HYPERCALCEMIA (> 10.5 mg/dL: Hyperparathyroidism / Malignancy workup)';
      color = '#ea580c';
    }

    crResEl.textContent = 'Corrected Ca = ' + Ca_corr_mg.toFixed(2) + ' mg / dL (' + Ca_corr_mmol.toFixed(2) + ' mmol/L)';
    crResEl.style.color = color;
    stResEl.textContent = status + ' [Measured Ca: ' + Ca + ' mg/dL @ Albumin: ' + Alb + ' g/dL]';
    stResEl.style.color = color;
  }

  caEl.addEventListener('input', update);
  albEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total serum calcium in mg/dL.',
      'Enter serum albumin in g/dL.',
      'Inspect Payne corrected calcium in mg/dL and mmol/L.'
    ],
    benefitTitle: 'R. B. Payne 1973 Albumin-Calcium Binding Equation',
    benefitContent: 'Approximately $40\text{–}45\%$ of circulating blood calcium is bound to albumin; low albumin artificially lowers total calcium despite normal physiologically active ionized calcium ($Ca^{2+}$).',
    faqs: [{ q: 'What is the definitive test if corrected calcium remains equivocal?', a: 'Directly measure ionized calcium ($Ca^{2+}$) via blood gas analyzer.' }]
  },

  // 14. Fractional Excretion of Sodium (FeNa) Calculator
  {
    slug: 'fractional-excretion-of-sodium-fena-acute-kidney-injury-calculator',
    name: 'Fractional Excretion of Sodium (FeNa = (U_Na·S_Cr) / (S_Na·U_Cr)·100%) Calculator',
    description: 'Calculate Fractional Excretion of Sodium (FeNa = (U_Na · S_Cr) / (S_Na · U_Cr) · 100%) to differentiate Prerenal Azotemia (FeNa less than 1.0%) from Acute Tubular Necrosis (ATN FeNa greater than 2.0%) in Acute Kidney Injury (AKI).',
    category: 'Health',
    icon: 'text',
    keywords: ['fena calculator', 'fractional excretion of sodium formula online', 'prerenal azotemia vs intrinsic atn calculator', 'acute kidney injury fena calculation nephrology', 'clinical nephrology aki differential calculator online'],
    order: 1147,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Urine Sodium U_Na (mEq/L), Serum Sodium S_Na (mEq/L), Urine Cr (mg/dL) & Serum Cr (mg/dL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fn-una">Urine Na⁺</label>
          <input class="tool-textarea" id="fn-una" type="number" step="5" value="15.0" placeholder="15 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fn-sna">Serum Na⁺</label>
          <input class="tool-textarea" id="fn-sna" type="number" step="2" value="140.0" placeholder="140 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fn-ucr">Urine Cr</label>
          <input class="tool-textarea" id="fn-ucr" type="number" step="10" value="80.0" placeholder="80 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fn-scr">Serum Cr</label>
          <input class="tool-textarea" id="fn-scr" type="number" step="0.5" value="2.5" placeholder="2.5 mg/dL" />
        </div>
      </div>
      <div id="fn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fn-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">FeNa = 0.33% (PRERENAL)</span>
            <span class="stat-label">Fractional Excretion of Sodium Percentage</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fn-res-diag" style="color:var(--green-dark); font-weight:700;">PRERENAL AZOTEMIA (FeNa < 1.0%: Intact tubular sodium reabsorption / Dehydration)</span>
            <span class="stat-label">AKI Etiology Differential Diagnosis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const unaEl = document.getElementById('fn-una'), snaEl = document.getElementById('fn-sna');
  const ucrEl = document.getElementById('fn-ucr'), scrEl = document.getElementById('fn-scr');
  const fnResEl = document.getElementById('fn-res-val'), dgResEl = document.getElementById('fn-res-diag');

  function update() {
    const Una = parseFloat(unaEl.value), Sna = parseFloat(snaEl.value);
    const Ucr = parseFloat(ucrEl.value), Scr = parseFloat(scrEl.value);

    if (isNaN(Una) || isNaN(Sna) || isNaN(Ucr) || isNaN(Scr) || Una < 0 || Sna <= 0 || Ucr <= 0 || Scr <= 0) return;

    // FeNa = (Una * Scr) / (Sna * Ucr) * 100  [%]
    const FeNa = ((Una * Scr) / (Sna * Ucr)) * 100.0;

    let diag = '', color = '#22543d';
    if (FeNa < 1.0) {
      diag = 'PRERENAL AZOTEMIA (FeNa < 1.0%: Renal hypoperfusion, responds to IV fluids)';
      color = '#22543d';
    } else if (FeNa <= 2.0) {
      diag = 'INDETERMINATE / MIXED (FeNa 1.0% - 2.0%: Clinical correlation required)';
      color = '#ea580c';
    } else {
      diag = 'INTRINSIC ACUTE TUBULAR NECROSIS (ATN FeNa > 2.0%: Damaged tubules cannot reabsorb sodium)';
      color = '#c53030';
    }

    fnResEl.textContent = 'FeNa = ' + FeNa.toFixed(2) + '%';
    fnResEl.style.color = color;
    dgResEl.textContent = diag;
    dgResEl.style.color = color;
  }

  [unaEl, snaEl, ucrEl, scrEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter spot urine sodium and serum sodium in mEq/L.',
      'Enter spot urine creatinine and serum creatinine in mg/dL.',
      'Inspect FeNa percentage and distinguish prerenal hypoperfusion ($FeNa < 1.0\%$) from intrinsic ATN ($FeNa > 2.0\%$).'
    ],
    benefitTitle: 'Nephron Sodium Clearance Ratio',
    benefitContent: 'Measures the fraction of filtered sodium that escapes renal tubular reabsorption, providing the classic clinical test to guide IV fluid hydration vs diuretic therapy in oliguric renal failure.',
    faqs: [{ q: 'Why is FeNa invalid in patients taking loop diuretics (furosemide)?', a: 'Loop diuretics block tubular sodium reabsorption, causing falsely high FeNa; use Fractional Excretion of Urea (FeUrea $< 35\%$) instead.' }]
  },

  // 15. Oxygen Delivery (DO₂) & Arterial Oxygen Content (CaO₂) Calculator
  {
    slug: 'oxygen-delivery-do2-arterial-content-cao2-calculator',
    name: 'Oxygen Delivery (DO₂ = CO·CaO₂·10) & Arterial Oxygen Content (CaO₂) Calculator',
    description: 'Calculate arterial oxygen content (CaO₂ = 1.34·Hb·SaO₂ + 0.0031·PaO₂) in mL O₂/dL blood and total systemic Oxygen Delivery (DO₂ = CO · CaO₂ · 10) in mL/min for critical care shock resuscitation.',
    category: 'Health',
    icon: 'text',
    keywords: ['oxygen delivery do2 calculator', 'arterial oxygen content cao2 formula online', 'systemic oxygen delivery index do2i calculator ml min', 'hemoglobin oxygen saturation do2 shock calculator', 'critical care intensive care hemodynamics do2 online'],
    order: 1148,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hemoglobin Hb (g/dL), Arterial Saturation SaO₂ (%), PaO₂ (mmHg) & Cardiac Output CO (L/min)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="do-hb">Hemoglobin (g/dL)</label>
          <input class="tool-textarea" id="do-hb" type="number" step="0.5" value="14.0" placeholder="14.0 g/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="do-sao2">SaO₂ (%)</label>
          <input class="tool-textarea" id="do-sao2" type="number" step="1" value="98.0" placeholder="98.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="do-pao2">PaO₂ (mmHg)</label>
          <input class="tool-textarea" id="do-pao2" type="number" step="5" value="90.0" placeholder="90.0 mmHg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="do-co">CO (L/min)</label>
          <input class="tool-textarea" id="do-co" type="number" step="0.5" value="5.0" placeholder="5.0 L/min" />
        </div>
      </div>
      <div id="do-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="do-res-do2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">DO₂ = 933 mL O₂ / min (NORMAL)</span>
            <span class="stat-label">Total Systemic Oxygen Delivery Rate (DO₂ = CO·CaO₂·10)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="do-res-cao2" style="color:var(--green-dark); font-weight:700;">CaO₂ = 18.66 mL O₂ / dL (Bound: 18.38 mL/dL | Dissolved: 0.28 mL/dL | Baseline VO₂ ≈ 250 mL/min)</span>
            <span class="stat-label">Arterial Oxygen Content & Oxygen Extraction Reserve</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hbEl = document.getElementById('do-hb'), saEl = document.getElementById('do-sao2');
  const paEl = document.getElementById('do-pao2'), coEl = document.getElementById('do-co');
  const doResEl = document.getElementById('do-res-do2'), caResEl = document.getElementById('do-res-cao2');

  function update() {
    const Hb = parseFloat(hbEl.value), SaO2 = parseFloat(saEl.value);
    const PaO2 = parseFloat(paEl.value), CO = parseFloat(coEl.value);

    if (isNaN(Hb) || isNaN(SaO2) || isNaN(PaO2) || isNaN(CO) || Hb <= 0 || SaO2 <= 0 || PaO2 <= 0 || CO <= 0) return;

    // Bound O2 = 1.34 * Hb * (SaO2 / 100)  [mL / dL]
    const bound_O2 = 1.34 * Hb * (SaO2 / 100.0);
    // Dissolved O2 = 0.0031 * PaO2  [mL / dL]
    const dissolved_O2 = 0.0031 * PaO2;

    // Total Arterial O2 Content: CaO2 = Bound + Dissolved  [mL / dL]
    const CaO2 = bound_O2 + dissolved_O2;

    // Oxygen delivery: DO2 = CO * CaO2 * 10  [mL / min]
    const DO2 = CO * CaO2 * 10.0;

    let status = '', color = '#22543d';
    if (DO2 >= 900) { status = 'OPTIMAL OXYGEN DELIVERY (900 - 1,100 mL/min: Normal aerobic tissue support)'; color = '#22543d'; }
    else if (DO2 >= 600) { status = 'COMPENSATED (600 - 900 mL/min: Tissue extraction ratio rises)'; color = '#ea580c'; }
    else { status = 'CRITICAL DYSOXIA / SHOCK (DO₂ < 600 mL/min: Anaerobic metabolism & lactic acidosis)'; color = '#c53030'; }

    doResEl.textContent = 'DO₂ = ' + Math.round(DO2) + ' mL O₂ / min (' + status.split(' (')[0] + ')';
    doResEl.style.color = color;
    caResEl.textContent = 'CaO₂ = ' + CaO2.toFixed(2) + ' mL/dL (Hb Bound: ' + bound_O2.toFixed(2) + ' + Dissolved: ' + dissolved_O2.toFixed(2) + ' mL/dL)';
    caResEl.style.color = color;
  }

  [hbEl, saEl, paEl, coEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hemoglobin level in g/dL.',
      'Enter pulse oximeter arterial saturation $SaO_2$ in %.',
      'Enter arterial oxygen partial pressure $PaO_2$ in mmHg.',
      'Enter cardiac output in L/min.',
      'Inspect total Oxygen Delivery ($DO_2$) in mL/min and Arterial Oxygen Content ($CaO_2$).'
    ],
    benefitTitle: 'Arterial Oxygen Carrying Capacity & Tissue Perfusion',
    benefitContent: 'Demonstrates that $98.5\%$ of oxygen is transported bound to hemoglobin ($1.34\text{ mL O}_2/\text{g Hb}$) rather than dissolved in plasma, showing why blood transfusion and inotropes restore $DO_2$ during septic shock.',
    faqs: [{ q: 'What happens when DO2 drops below critical threshold (DO2_crit)?', a: 'When $DO_2$ falls below $\sim 300\text{–}400\text{ mL/min}$, cells switch to anaerobic glycolysis, generating dangerous lactic acidosis.' }]
  },

  // 16. QTc Interval Bazett & Fridericia ECG Formula Calculator
  {
    slug: 'qtc-interval-bazett-fridericia-framingham-ecg-calculator',
    name: 'ECG QTc Interval (Bazett QTc = QT / √RR & Fridericia QTc = QT / ∛RR) Calculator',
    description: 'Calculate heart rate-corrected QT interval (QTc) on 12-lead electrocardiograms using Bazett (QT / √RR), Fridericia (QT / ∛RR), and Framingham formulas to detect Long QT Syndrome and Torsades de Pointes arrhythmia risk.',
    category: 'Health',
    icon: 'text',
    keywords: ['qtc calculator', 'bazett formula qtc equals qt over sqrt rr online', 'fridericia qtc formula ecg calculator ms', 'long qt syndrome torsades de pointes calculator', 'cardiology clinical electrophysiology ecg qtc online'],
    order: 1149,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Measured QT Interval (ms) & Heart Rate (BPM) or RR Interval (ms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qt-meas">Measured QT (ms)</label>
          <input class="tool-textarea" id="qt-meas" type="number" step="10" value="420" placeholder="420 ms" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-hr">Heart Rate (BPM)</label>
          <input class="tool-textarea" id="qt-hr" type="number" step="5" value="75" placeholder="75 BPM" />
        </div>
      </div>
      <div id="qt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qt-res-baz" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bazett QTc = 469.6 ms (BORDERLINE)</span>
            <span class="stat-label">Bazett Heart Rate Corrected QT Interval (QT / √RR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qt-res-frid" style="color:var(--green-dark); font-weight:700;">Fridericia QTc = 452.4 ms | Framingham QTc = 444.0 ms | RR = 800 ms</span>
            <span class="stat-label">Fridericia Cubed-Root & Framingham Linear Formula Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qtEl = document.getElementById('qt-meas'), hrEl = document.getElementById('qt-hr');
  const bzResEl = document.getElementById('qt-res-baz'), frResEl = document.getElementById('qt-res-frid');

  function update() {
    const QT_ms = parseFloat(qtEl.value), HR = parseFloat(hrEl.value);
    if (isNaN(QT_ms) || isNaN(HR) || QT_ms <= 0 || HR <= 0) return;

    // RR interval in seconds: RR = 60 / HR
    const RR_sec = 60.0 / HR;
    const RR_ms = RR_sec * 1000.0;

    // Bazett formula: QTc = QT_ms / sqrt(RR_sec)
    const QTc_bazett = QT_ms / Math.sqrt(RR_sec);

    // Fridericia formula: QTc = QT_ms / (RR_sec)^(1/3)
    const QTc_fridericia = QT_ms / Math.pow(RR_sec, 1.0 / 3.0);

    // Framingham formula: QTc = QT_ms + 154 * (1 - RR_sec)
    const QTc_framingham = QT_ms + 154.0 * (1.0 - RR_sec);

    let status = '', color = '#22543d';
    if (QTc_bazett < 450) {
      status = 'NORMAL (QTc < 450 ms: Low arrhythmia risk)';
      color = '#22543d';
    } else if (QTc_bazett <= 500) {
      status = 'BORDERLINE PROLONGED (QTc 450 - 500 ms: Review QT-prolonging drugs)';
      color = '#ea580c';
    } else {
      status = 'HIGH RISK PROLONGED (QTc > 500 ms: Severe risk of Torsades de Pointes / VFib!)';
      color = '#c53030';
    }

    bzResEl.textContent = 'Bazett QTc = ' + QTc_bazett.toFixed(1) + ' ms (' + status.split(' (')[0] + ')';
    bzResEl.style.color = color;
    frResEl.textContent = 'Fridericia = ' + QTc_fridericia.toFixed(1) + ' ms | Framingham = ' + QTc_framingham.toFixed(1) + ' ms | RR Interval = ' + Math.round(RR_ms) + ' ms';
    frResEl.style.color = color;
  }

  qtEl.addEventListener('input', update);
  hrEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter raw measured electrocardiographic QT interval in milliseconds (ms).',
      'Enter patient resting heart rate in BPM.',
      'Inspect Bazett ($QT / \sqrt{RR}$), Fridericia ($QT / \sqrt[3]{RR}$), and Framingham corrected QTc values.'
    ],
    benefitTitle: 'H. C. Bazett 1920 Ventricular Repolarization Standard',
    benefitContent: 'Normalizes QT duration for heart rate variations; identifying $QTc > 500\text{ ms}$ warns clinicians of imminent lethal Torsades de Pointes ventricular fibrillation when prescribing antiarrhythmics, macrolide antibiotics, or psychotropics.',
    faqs: [{ q: 'Why is Fridericia preferred at high or low heart rates?', a: 'Bazett overcorrects at fast heart rates ($>100\text{ BPM}$) and undercorrects at slow heart rates ($<60\text{ BPM}$), whereas Fridericia\'s cube-root formula maintains physiological stability.' }]
  },

  // 17. CURB-65 Pneumonia Severity Score Calculator
  {
    slug: 'curb-65-pneumonia-severity-mortality-score-calculator',
    name: 'CURB-65 Community-Acquired Pneumonia Severity & Mortality Score Calculator',
    description: 'Calculate CURB-65 pneumonia severity score (Confusion, elevated Urea, Respiratory Rate ≥ 30, low Blood Pressure, Age ≥ 65) to guide outpatient vs hospital inpatient vs ICU admission decisions.',
    category: 'Health',
    icon: 'text',
    keywords: ['curb 65 calculator', 'pneumonia severity score curb 65 online', 'community acquired pneumonia mortality risk calculator', 'curb 65 outpatient inpatient icu admission calculator', 'pulmonology infectious disease pneumonia score online'],
    order: 1150,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'CURB-65 Clinical Criteria Assessment Checklist',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr; gap:0.5rem;">
        <label><input type="checkbox" id="c65-c" /> <strong>C</strong> - Confusion (New disorientation to person, place, or time)</label>
        <label><input type="checkbox" id="c65-u" /> <strong>U</strong> - Blood Urea Nitrogen > 19 mg/dL (> 7 mmol/L)</label>
        <label><input type="checkbox" id="c65-r" /> <strong>R</strong> - Respiratory Rate ≥ 30 breaths / min</label>
        <label><input type="checkbox" id="c65-b" /> <strong>B</strong> - Blood Pressure (Systolic < 90 mmHg OR Diastolic ≤ 60 mmHg)</label>
        <label><input type="checkbox" id="c65-65" /> <strong>65</strong> - Age ≥ 65 Years</label>
      </div>
      <div id="c65-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="c65-res-score" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CURB-65 Score = 0</span>
            <span class="stat-label">Total CURB-65 Score (Range: 0 to 5)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="c65-res-strat" style="color:var(--green-dark); font-weight:700;">LOW RISK (0.6% 30-Day Mortality): Outpatient Home Treatment Suitable</span>
            <span class="stat-label">30-Day Mortality Risk & Recommended Site of Care</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('c65-c'), uEl = document.getElementById('c65-u');
  const rEl = document.getElementById('c65-r'), bEl = document.getElementById('c65-b'), a65El = document.getElementById('c65-65');
  const scResEl = document.getElementById('c65-res-score'), stResEl = document.getElementById('c65-res-strat');

  function update() {
    let score = 0;
    if (cEl.checked) score++;
    if (uEl.checked) score++;
    if (rEl.checked) score++;
    if (bEl.checked) score++;
    if (a65El.checked) score++;

    let strat = '', color = '#22543d';
    if (score <= 1) {
      strat = 'LOW RISK (0.6 - 2.7% 30-Day Mortality): Outpatient Home Treatment Suitable';
      color = '#22543d';
    } else if (score === 2) {
      strat = 'MODERATE RISK (6.8% Mortality): Short Hospital Inpatient Stay or Supervised Outpatient';
      color = '#ea580c';
    } else {
      strat = 'SEVERE PNEUMONIA (' + (score === 3 ? '14.0%' : '27.8%+') + ' Mortality): Urgent Hospital Inpatient / ICU Admission';
      color = '#c53030';
    }

    scResEl.textContent = 'CURB-65 Score = ' + score + ' / 5';
    scResEl.style.color = color;
    stResEl.textContent = strat;
    stResEl.style.color = color;
  }

  [cEl, uEl, rEl, bEl, a65El].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Check all present clinical criteria (Confusion, elevated Urea, high Respiratory rate, low Blood pressure, Age 65+).',
      'Inspect total CURB-65 score (0–5), estimated 30-day mortality risk, and site of care recommendation.'
    ],
    benefitTitle: 'British Thoracic Society (BTS) CURB-65 Standard',
    benefitContent: 'Provides an evidence-based risk stratification score preventing unnecessary hospitalizations for low-risk pneumonia patients while identifying high-risk sepsis candidates.',
    faqs: [{ q: 'What is the CRB-65 score without urea laboratory testing?', a: 'CRB-65 omits blood urea testing ($0\text{–}4\text{ scale}$), allowing rapid triage in primary care clinic settings.' }]
  },

  // 18. CHA2DS2-VASc Atrial Fibrillation Stroke Risk Score Calculator
  {
    slug: 'cha2ds2-vasc-atrial-fibrillation-stroke-risk-calculator',
    name: 'CHA₂DS₂-VASc Score for Atrial Fibrillation Stroke Risk Calculator',
    description: 'Calculate CHA₂DS₂-VASc thromboembolic stroke risk score (0 to 9) in non-valvular atrial fibrillation to guide oral anticoagulation therapy (DOACs / Warfarin) per ACC/AHA/ESC guidelines.',
    category: 'Health',
    icon: 'text',
    keywords: ['cha2ds2 vasc calculator', 'atrial fibrillation stroke risk score formula online', 'afib oral anticoagulation doac indication calculator', 'stroke risk annual percentage cha2ds2 vasc calculator', 'cardiology electrophysiology stroke prevention online'],
    order: 1151,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'CHA₂DS₂-VASc Clinical Thromboembolism Risk Checklist',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr; gap:0.5rem;">
        <label><input type="checkbox" id="cv-c" /> <strong>C</strong> - Congestive Heart Failure / LV dysfunction (+1)</label>
        <label><input type="checkbox" id="cv-h" /> <strong>H</strong> - Hypertension history (+1)</label>
        <label><input type="checkbox" id="cv-a2" /> <strong>A₂</strong> - Age ≥ 75 Years (+2)</label>
        <label><input type="checkbox" id="cv-d" /> <strong>D</strong> - Diabetes Mellitus (+1)</label>
        <label><input type="checkbox" id="cv-s2" /> <strong>S₂</strong> - Prior Stroke / TIA / Thromboembolism (+2)</label>
        <label><input type="checkbox" id="cv-v" /> <strong>V</strong> - Vascular Disease (Prior MI, PAD, Aortic plaque) (+1)</label>
        <label><input type="checkbox" id="cv-a" /> <strong>A</strong> - Age 65 to 74 Years (+1)</label>
        <label><input type="checkbox" id="cv-sc" /> <strong>Sc</strong> - Female Sex Category (+1)</label>
      </div>
      <div id="cv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cv-res-score" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Score = 0</span>
            <span class="stat-label">Total CHA₂DS₂-VASc Score (Range: 0 to 9)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cv-res-rec" style="color:var(--green-dark); font-weight:700;">LOW RISK (0.2% Annual Stroke Risk): No Anticoagulation or Antiplatelet Recommended</span>
            <span class="stat-label">Annual Ischemic Stroke Risk & Anticoagulation Indication</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('cv-c'), hEl = document.getElementById('cv-h');
  const a2El = document.getElementById('cv-a2'), dEl = document.getElementById('cv-d');
  const s2El = document.getElementById('cv-s2'), vEl = document.getElementById('cv-v');
  const aEl = document.getElementById('cv-a'), scEl = document.getElementById('cv-sc');
  const scResEl = document.getElementById('cv-res-score'), rcResEl = document.getElementById('cv-res-rec');

  const strokeRates = [0.2, 0.6, 2.2, 3.2, 4.8, 7.2, 9.7, 11.2, 12.5, 15.2];

  function update() {
    let score = 0;
    if (cEl.checked) score += 1;
    if (hEl.checked) score += 1;
    if (a2El.checked) {
      score += 2;
      aEl.checked = false; // mutually exclusive age
    } else if (aEl.checked) {
      score += 1;
    }
    if (dEl.checked) score += 1;
    if (s2El.checked) score += 2;
    if (vEl.checked) score += 1;
    if (scEl.checked) score += 1;

    score = Math.min(9, score);
    const annRisk = strokeRates[score] || 15.2;

    let rec = '', color = '#22543d';
    if (score === 0 || (score === 1 && scEl.checked && !cEl.checked && !hEl.checked && !dEl.checked && !s2El.checked && !vEl.checked && !aEl.checked && !a2El.checked)) {
      rec = 'LOW RISK (' + annRisk + '%/yr): No Anticoagulation Needed (Class I)';
      color = '#22543d';
    } else if (score === 1) {
      rec = 'INTERMEDIATE RISK (' + annRisk + '%/yr): Oral Anticoagulant (DOAC) May Be Considered (Class IIb)';
      color = '#ea580c';
    } else {
      rec = 'HIGH RISK (' + annRisk + '%/yr): Oral Anticoagulation (DOAC: Apixaban/Rivaroxaban) Strongly Recommended (Class I)';
      color = '#c53030';
    }

    scResEl.textContent = 'CHA₂DS₂-VASc Score = ' + score;
    scResEl.style.color = color;
    rcResEl.textContent = rec;
    rcResEl.style.color = color;
  }

  [cEl, hEl, a2El, dEl, s2El, vEl, aEl, scEl].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Select patient clinical comorbidities and demographic risk factors.',
      'Inspect total CHA2DS2-VASc score (0 to 9), estimated annual ischemic stroke risk percentage, and guideline recommendation for oral anticoagulation (DOAC).'
    ],
    benefitTitle: 'ACC/AHA/ESC Thromboembolic Prophylaxis Standard',
    benefitContent: 'Scores $\ge 2$ in men or $\ge 3$ in women warrant oral anticoagulants (DOACs like apixaban/rivaroxaban), reducing embolic stroke risk by over $65\%$.',
    faqs: [{ q: 'Why does female sex not count as a risk factor in isolation (score 1)?', a: 'Female sex modifies stroke risk in the presence of other risk factors but does not independently increase stroke risk in young, otherwise healthy patients.' }]
  },

  // 19. MELD-Na Score for End-Stage Liver Disease Calculator
  {
    slug: 'meld-na-score-end-stage-liver-disease-allocation-calculator',
    name: 'MELD-Na Score for End-Stage Liver Disease (OPTN / UNOS Transplant Allocation) Calculator',
    description: 'Calculate MELD-Na liver disease severity score (Model for End-Stage Liver Disease incorporating serum Sodium, Bilirubin, INR, and Creatinine) for UNOS liver transplant waitlist prioritization.',
    category: 'Health',
    icon: 'text',
    keywords: ['meld na calculator', 'model for end stage liver disease formula online', 'meld score liver transplant allocation calculator', 'bilirubin inr creatinine sodium meld calculator', 'hepatology gastroenterology liver failure meld online'],
    order: 1152,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bilirubin (mg/dL), INR, Creatinine (mg/dL), Sodium Na⁺ (mEq/L) & Dialysis Twice in Past Week',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ml-bili">Bilirubin (mg/dL)</label>
          <input class="tool-textarea" id="ml-bili" type="number" step="0.5" value="2.5" placeholder="2.5 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ml-inr">INR</label>
          <input class="tool-textarea" id="ml-inr" type="number" step="0.1" value="1.8" placeholder="1.8" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ml-cr">Creatinine (mg/dL)</label>
          <input class="tool-textarea" id="ml-cr" type="number" step="0.2" value="1.6" placeholder="1.6 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ml-na">Sodium (mEq/L)</label>
          <input class="tool-textarea" id="ml-na" type="number" step="1" value="132" placeholder="132 mEq/L" />
        </div>
      </div>
      <div id="ml-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ml-res-meld" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">MELD-Na = 23 (UNOS Allocation Score)</span>
            <span class="stat-label">OPTN / UNOS MELD-Na Liver Allocation Score (6 to 40)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ml-res-mort" style="color:var(--green-dark); font-weight:700;">3-Month Mortality ≈ 19.6% (Original MELD: 20 | Hyponatremia adds +3 points)</span>
            <span class="stat-label">Estimated 90-Day Waitlist Mortality Risk</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const biEl = document.getElementById('ml-bili'), inrEl = document.getElementById('ml-inr');
  const crEl = document.getElementById('ml-cr'), naEl = document.getElementById('ml-na');
  const mlResEl = document.getElementById('ml-res-meld'), mrResEl = document.getElementById('ml-res-mort');

  function update() {
    let bili = parseFloat(biEl.value), inr = parseFloat(inrEl.value);
    let cr = parseFloat(crEl.value), na = parseFloat(naEl.value);

    if (isNaN(bili) || isNaN(inr) || isNaN(cr) || isNaN(na) || bili <= 0 || inr <= 0 || cr <= 0 || na <= 0) return;

    // UNOS bounds: lower bound 1.0 for bili, inr, cr; upper bound 4.0 for cr; Na bounded [125, 137]
    bili = Math.max(1.0, bili);
    inr = Math.max(1.0, inr);
    cr = Math.min(4.0, Math.max(1.0, cr));
    const na_bound = Math.min(137.0, Math.max(125.0, na));

    // Original MELD = 9.57 * ln(Cr) + 3.78 * ln(Bili) + 11.20 * ln(INR) + 6.43
    const meld_orig = 9.57 * Math.log(cr) + 3.78 * Math.log(bili) + 11.20 * Math.log(inr) + 6.43;
    const meld_i = Math.round(meld_orig);

    // MELD-Na: If MELD > 11, MELD-Na = MELD_i + 1.32 * (137 - Na) - [ 0.033 * MELD_i * (137 - Na) ]
    let meld_na = meld_i;
    if (meld_i > 11) {
      meld_na = meld_i + 1.32 * (137.0 - na_bound) - (0.033 * meld_i * (137.0 - na_bound));
    }
    meld_na = Math.min(40, Math.max(6, Math.round(meld_na)));

    let mort = 1.9;
    if (meld_na >= 40) mort = 71.3;
    else if (meld_na >= 30) mort = 52.6;
    else if (meld_na >= 20) mort = 19.6;
    else if (meld_na >= 10) mort = 6.0;
    else mort = 1.9;

    mlResEl.textContent = 'MELD-Na = ' + meld_na + ' (UNOS Allocation)';
    mrResEl.textContent = '3-Month Mortality ≈ ' + mort + '% (MELD Base = ' + meld_i + ' | Na Correction = ' + (meld_na >= meld_i ? '+' : '') + (meld_na - meld_i) + ' pts)';
  }

  [biEl, inrEl, crEl, naEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total serum bilirubin in mg/dL.',
      'Enter International Normalized Ratio (INR).',
      'Enter serum creatinine in mg/dL.',
      'Enter serum sodium in mEq/L.',
      'Inspect official UNOS/OPTN MELD-Na score (6 to 40) and 90-day waitlist mortality projection.'
    ],
    benefitTitle: 'OPTN/UNOS 2016 Liver Transplant Allocation Standard',
    benefitContent: 'MELD-Na accurately predicts 90-day pre-transplant mortality, allocating donor organs strictly to the sickest patients first ("sickest-first" policy).',
    faqs: [{ q: 'Why was serum sodium added to the original MELD score?', a: 'Hyponatremia ($Na < 130\text{ mEq/L}$) reflects severe portal hypertension and ascites, significantly increasing mortality independently of liver labs.' }]
  },

  // 20. Wells Score for Deep Vein Thrombosis (DVT) Calculator
  {
    slug: 'wells-score-dvt-deep-vein-thrombosis-probability-calculator',
    name: 'Wells Score for Deep Vein Thrombosis (DVT Clinical Pretest Probability) Calculator',
    description: 'Calculate Wells DVT pretest probability score (-2 to 8 points) to risk-stratify lower extremity Deep Vein Thrombosis and determine D-dimer vs duplex compression ultrasound diagnostic pathways.',
    category: 'Health',
    icon: 'text',
    keywords: ['wells score dvt calculator', 'deep vein thrombosis wells criteria score online', 'dvt pretest probability d dimer ultrasound calculator', 'wells score lower extremity blood clot calculator', 'vascular medicine emergency medicine dvt online'],
    order: 1153,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wells DVT Clinical Diagnostic Checklist',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr; gap:0.5rem;">
        <label><input type="checkbox" id="wd-can" /> Active Cancer (treatment within 6 months) (+1)</label>
        <label><input type="checkbox" id="wd-par" /> Paralysis, paresis, or recent plaster cast of lower extremity (+1)</label>
        <label><input type="checkbox" id="wd-bed" /> Bedridden > 3 days or major surgery within 12 weeks (+1)</label>
        <label><input type="checkbox" id="wd-ten" /> Localized tenderness along deep venous system distribution (+1)</label>
        <label><input type="checkbox" id="wd-leg" /> Entire leg swollen (+1)</label>
        <label><input type="checkbox" id="wd-calf" /> Calf swelling > 3 cm compared to asymptomatic leg (+1)</label>
        <label><input type="checkbox" id="wd-pit" /> Pitting edema confined to symptomatic leg (+1)</label>
        <label><input type="checkbox" id="wd-coll" /> Collateral superficial non-varicose veins (+1)</label>
        <label><input type="checkbox" id="wd-alt" /> Alternative diagnosis at least as likely as DVT (-2)</label>
      </div>
      <div id="wd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wd-res-score" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Wells Score = 0</span>
            <span class="stat-label">Total Wells DVT Score</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wd-res-prob" style="color:var(--green-dark); font-weight:700;">DVT UNLIKELY (≤ 1 Point: High-sensitivity D-dimer test indicated to rule out DVT)</span>
            <span class="stat-label">Clinical Probability & Recommended Diagnostic Pathway</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const canEl = document.getElementById('wd-can'), parEl = document.getElementById('wd-par');
  const bedEl = document.getElementById('wd-bed'), tenEl = document.getElementById('wd-ten');
  const legEl = document.getElementById('wd-leg'), calfEl = document.getElementById('wd-calf');
  const pitEl = document.getElementById('wd-pit'), collEl = document.getElementById('wd-coll');
  const altEl = document.getElementById('wd-alt');
  const scResEl = document.getElementById('wd-res-score'), prResEl = document.getElementById('wd-res-prob');

  function update() {
    let score = 0;
    if (canEl.checked) score += 1;
    if (parEl.checked) score += 1;
    if (bedEl.checked) score += 1;
    if (tenEl.checked) score += 1;
    if (legEl.checked) score += 1;
    if (calfEl.checked) score += 1;
    if (pitEl.checked) score += 1;
    if (collEl.checked) score += 1;
    if (altEl.checked) score -= 2;

    let prob = '', color = '#22543d';
    if (score <= 1) {
      prob = 'DVT UNLIKELY (~5% Pretest Prevalence: D-dimer test can safely rule out DVT without ultrasound)';
      color = '#22543d';
    } else {
      prob = 'DVT LIKELY (≥ 2 Points / ~28% Prevalence: Order urgent Lower Extremity Duplex Ultrasound)';
      color = '#c53030';
    }

    scResEl.textContent = 'Wells Score = ' + score;
    scResEl.style.color = color;
    prResEl.textContent = prob;
    prResEl.style.color = color;
  }

  [canEl, parEl, bedEl, tenEl, legEl, calfEl, pitEl, collEl, altEl].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Check all positive physical exam findings and clinical risk criteria.',
      'Inspect total Wells score and determine whether D-dimer or urgent compression duplex ultrasound is indicated.'
    ],
    benefitTitle: 'Philip S. Wells 2003 DVT Clinical Decision Rule',
    benefitContent: 'Enables safe outpatient exclusion of blood clots when combined with a negative high-sensitivity D-dimer assay ($>99.5\%$ negative predictive value).',
    faqs: [{ q: 'What should be done if Wells score is >= 2?', a: 'Patients with Wells score $\ge 2$ should proceed directly to lower extremity venous compression ultrasound.' }]
  },

  // 21. Wells Score for Pulmonary Embolism (PE) Calculator
  {
    slug: 'wells-score-pulmonary-embolism-pe-probability-calculator',
    name: 'Wells Score for Pulmonary Embolism (PE Clinical Probability & PERC Rule) Calculator',
    description: 'Calculate Wells PE probability score (0 to 12.5 points) to risk-stratify acute Pulmonary Embolism and determine D-dimer vs CT Pulmonary Angiography (CTPA) diagnostic imaging protocol.',
    category: 'Health',
    icon: 'text',
    keywords: ['wells score pe calculator', 'pulmonary embolism wells criteria score online', 'pe clinical probability d dimer ctpa calculator', 'pulmonary embolism rule out perc wells calculator', 'emergency medicine pulmonology pe diagnosis online'],
    order: 1154,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wells Pulmonary Embolism Criteria Checklist',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr; gap:0.5rem;">
        <label><input type="checkbox" id="wp-dvt" /> Clinical signs/symptoms of DVT (leg swelling, tenderness) (+3.0)</label>
        <label><input type="checkbox" id="wp-alt" /> PE is #1 diagnosis OR equally likely as other differential (+3.0)</label>
        <label><input type="checkbox" id="wp-hr" /> Heart Rate > 100 BPM (Tachycardia) (+1.5)</label>
        <label><input type="checkbox" id="wp-imm" /> Immobilization ≥ 3 days OR surgery in past 4 weeks (+1.5)</label>
        <label><input type="checkbox" id="wp-prior" /> Previous objectively diagnosed DVT or PE (+1.5)</label>
        <label><input type="checkbox" id="wp-hem" /> Hemoptysis (coughing up blood) (+1.0)</label>
        <label><input type="checkbox" id="wp-can" /> Active Malignancy (treatment ongoing or within 6 months) (+1.0)</label>
      </div>
      <div id="wp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wp-res-score" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Wells PE Score = 0.0</span>
            <span class="stat-label">Total Wells PE Score (Range: 0 to 12.5)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wp-res-strat" style="color:var(--green-dark); font-weight:700;">PE UNLIKELY (Score ≤ 4.0: High-sensitivity D-dimer indicated to rule out PE)</span>
            <span class="stat-label">Clinical Probability & CT Pulmonary Angiography (CTPA) Indication</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dvtEl = document.getElementById('wp-dvt'), altEl = document.getElementById('wp-alt');
  const hrEl = document.getElementById('wp-hr'), immEl = document.getElementById('wp-imm');
  const priEl = document.getElementById('wp-prior'), hemEl = document.getElementById('wp-hem');
  const canEl = document.getElementById('wp-can');
  const scResEl = document.getElementById('wp-res-score'), stResEl = document.getElementById('wp-res-strat');

  function update() {
    let score = 0;
    if (dvtEl.checked) score += 3.0;
    if (altEl.checked) score += 3.0;
    if (hrEl.checked) score += 1.5;
    if (immEl.checked) score += 1.5;
    if (priEl.checked) score += 1.5;
    if (hemEl.checked) score += 1.0;
    if (canEl.checked) score += 1.0;

    let strat = '', color = '#22543d';
    if (score <= 4.0) {
      strat = 'PE UNLIKELY (Score ≤ 4.0 / ~12% Prevalence: Order D-dimer to rule out PE without CT scan)';
      color = '#22543d';
    } else {
      strat = 'PE LIKELY (Score > 4.0 / ~37% Prevalence: Order urgent CT Pulmonary Angiogram CTPA)';
      color = '#c53030';
    }

    scResEl.textContent = 'Wells PE Score = ' + score.toFixed(1);
    scResEl.style.color = color;
    stResEl.textContent = strat;
    stResEl.style.color = color;
  }

  [dvtEl, altEl, hrEl, immEl, priEl, hemEl, canEl].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Check all present clinical signs and risk factors for pulmonary embolism.',
      'Inspect total Wells PE score and determine whether high-sensitivity D-dimer or CT Pulmonary Angiography is indicated.'
    ],
    benefitTitle: 'Philip S. Wells 2000 Pulmonary Embolism Standard',
    benefitContent: 'Reduces unnecessary radiation and IV iodinated contrast exposure from CT scans by safely ruling out PE in low-probability patients with a negative D-dimer.',
    faqs: [{ q: 'What is the PERC Rule in low-risk PE evaluation?', a: 'The Pulmonary Embolism Rule-out Criteria (PERC) allows clinicians to rule out PE with zero lab tests if the patient meets all 8 PERC criteria.' }]
  },

  // 22. APGAR Score for Newborn Infant Assessment Calculator
  {
    slug: 'apgar-score-newborn-infant-health-assessment-calculator',
    name: 'APGAR Score Newborn Health Assessment (1-Minute & 5-Minute Evaluation 0 to 10) Calculator',
    description: 'Calculate neonatal APGAR score (Appearance, Pulse, Grimace, Activity, Respiration from 0 to 10) at 1 and 5 minutes post-birth to evaluate newborn infant vitality and delivery room resuscitation need.',
    category: 'Health',
    icon: 'text',
    keywords: ['apgar score calculator', 'newborn apgar score formula 0 to 10 online', 'neonatal vitality 1 5 minute apgar score calculator', 'infant delivery room resuscitation apgar calculator', 'pediatrics neonatology obstetrics apgar score online'],
    order: 1155,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Appearance, Pulse, Grimace, Activity & Respiration (0, 1, or 2 points each)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ap-app">Appearance (Color)</label>
          <select class="tool-textarea" id="ap-app">
            <option value="2" selected>2 - Completely pink</option>
            <option value="1">1 - Body pink, extremities blue (Acrocyanosis)</option>
            <option value="0">0 - Pale or blue all over</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ap-pul">Pulse (Heart Rate)</label>
          <select class="tool-textarea" id="ap-pul">
            <option value="2" selected>2 - ≥ 100 BPM</option>
            <option value="1">1 - < 100 BPM</option>
            <option value="0">0 - Absent</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ap-grim">Grimace (Reflex)</label>
          <select class="tool-textarea" id="ap-grim">
            <option value="2" selected>2 - Prompt cough, sneeze, or vigorous cry</option>
            <option value="1">1 - Weak cry or grimace</option>
            <option value="0">0 - No response to stimulation</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ap-act">Activity (Muscle Tone)</label>
          <select class="tool-textarea" id="ap-act">
            <option value="2" selected>2 - Active spontaneous motion</option>
            <option value="1">1 - Some flexion of extremities</option>
            <option value="0">0 - Flaccid / Limp</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ap-resp">Respiration</label>
          <select class="tool-textarea" id="ap-resp">
            <option value="2" selected>2 - Vigorous good cry, regular breathing</option>
            <option value="1">1 - Slow, irregular, or gasping cry</option>
            <option value="0">0 - Absent (Apneic)</option>
          </select>
        </div>
      </div>
      <div id="ap-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ap-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">APGAR Score = 10 / 10</span>
            <span class="stat-label">Total Neonatal Vitality APGAR Score</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ap-res-cond" style="color:var(--green-dark); font-weight:700;">NORMAL VITALITY (Score 7-10: Excellent transition, routine newborn care)</span>
            <span class="stat-label">Clinical Transition Assessment & Neonatal Resuscitation Need</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const appEl = document.getElementById('ap-app'), pulEl = document.getElementById('ap-pul');
  const grEl = document.getElementById('ap-grim'), actEl = document.getElementById('ap-act');
  const respEl = document.getElementById('ap-resp');
  const totResEl = document.getElementById('ap-res-tot'), cdResEl = document.getElementById('ap-res-cond');

  function update() {
    const app = parseInt(appEl.value, 10), pul = parseInt(pulEl.value, 10);
    const gr = parseInt(grEl.value, 10), act = parseInt(actEl.value, 10);
    const resp = parseInt(respEl.value, 10);

    const total = app + pul + gr + act + resp;

    let cond = '', color = '#22543d';
    if (total >= 7) {
      cond = 'REASSURING TRANSITION (Score 7 - 10: Normal newborn vigor, routine drying & warming)';
      color = '#22543d';
    } else if (total >= 4) {
      cond = 'MODERATELY ABNORMAL (Score 4 - 6: Stimulate, clear airway, supplemental oxygen / PPV)';
      color = '#ea580c';
    } else {
      cond = 'CRITICALLY LOW (Score 0 - 3: Immediate Neonatal Resuscitation Protocol / Bag-Mask / CPR)';
      color = '#c53030';
    }

    totResEl.textContent = 'APGAR Score = ' + total + ' / 10';
    totResEl.style.color = color;
    cdResEl.textContent = cond;
    cdResEl.style.color = color;
  }

  [appEl, pulEl, grEl, actEl, respEl].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Select Appearance (Color), Pulse (Heart rate), Grimace (Reflex irritability), Activity (Muscle tone), and Respiration.',
      'Inspect total APGAR score (0 to 10) and clinical delivery room resuscitation guidance.'
    ],
    benefitTitle: 'Dr. Virginia Apgar 1952 Neonatal Assessment Standard',
    benefitContent: 'Provides an immediate, standardized objective assessment of a newborn\'s cardiopulmonary transition to extrauterine life at 1 and 5 minutes after birth.',
    faqs: [{ q: 'What does an APGAR score of 7 to 10 indicate?', a: 'A score of 7 to 10 indicates normal physiological vigor requiring only routine clearing of secretions and warming.' }]
  },

  // 23. Pharmacokinetics Half-Life & Clearance Calculator
  {
    slug: 'pharmacokinetics-half-life-clearance-volume-of-distribution-calculator',
    name: 'Pharmacokinetics Elimination Half-Life (t_½ = 0.693·V_d / CL) & Steady State Calculator',
    description: 'Calculate clinical pharmacokinetic drug elimination half-life (t_½ = 0.693 · V_d / CL) in hours, elimination rate constant k_el, time to reach 97% steady state (5 · t_½), and steady-state drug concentration (C_ss = R₀ / CL).',
    category: 'Health',
    icon: 'text',
    keywords: ['pharmacokinetics calculator', 'elimination half life formula t half equals 0.693 vd over cl online', 'steady state concentration css rate over clearance calculator', 'volume of distribution clearance elimination rate calculator', 'clinical pharmacology pharmacokinetics online'],
    order: 1156,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Volume of Distribution V_d (L), Clearance CL (L/hr) & Continuous Infusion Rate R₀ (mg/hr)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pk-vd">Volume V_d (L)</label>
          <input class="tool-textarea" id="pk-vd" type="number" step="5" value="40.0" placeholder="40.0 L (Aminoglycoside)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pk-cl">Clearance CL (L/hr)</label>
          <input class="tool-textarea" id="pk-cl" type="number" step="0.5" value="4.0" placeholder="4.0 L/hr" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pk-r0">Infusion R₀ (mg/hr)</label>
          <input class="tool-textarea" id="pk-r0" type="number" step="10" value="80.0" placeholder="80.0 mg/hr" />
        </div>
      </div>
      <div id="pk-res-card2" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pk-res-thalf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Elimination Half-Life t_½ = 6.93 Hours</span>
            <span class="stat-label">Drug Elimination Half-Life (t_½ = 0.693 · V_d / CL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pk-res-css" style="color:var(--green-dark); font-weight:700;">Steady State C_ss = 20.0 mg/L | Time to 97% Steady State = 34.65 Hours (5 × t_½)</span>
            <span class="stat-label">Steady-State Plasma Concentration & 5-Half-Life Rule</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vdEl = document.getElementById('pk-vd'), clEl = document.getElementById('pk-cl'), r0El = document.getElementById('pk-r0');
  const thResEl = document.getElementById('pk-res-thalf'), csResEl = document.getElementById('pk-res-css');

  function update() {
    const V_d = parseFloat(vdEl.value), CL = parseFloat(clEl.value), R0 = parseFloat(r0El.value);
    if (isNaN(V_d) || isNaN(CL) || isNaN(R0) || V_d <= 0 || CL <= 0 || R0 <= 0) return;

    // Elimination rate constant: k_el = CL / V_d  [hr^-1]
    const k_el = CL / V_d;

    // Half-life: t_1/2 = 0.693147 / k_el = (0.693147 * V_d) / CL  [hours]
    const t_half = (0.693147 * V_d) / CL;

    // Steady state concentration: C_ss = R0 / CL  [mg / L]
    const C_ss = R0 / CL;

    // Time to 5 half lives (96.875% steady state):
    const time_5thalf = 5.0 * t_half;

    thResEl.textContent = 'Half-Life t_½ = ' + t_half.toFixed(2) + ' Hours';
    csResEl.textContent = 'Steady State C_ss = ' + C_ss.toFixed(1) + ' mg/L | 5 Half-Lives = ' + time_5thalf.toFixed(1) + ' Hours (k_el = ' + k_el.toFixed(3) + ' hr⁻¹)';
  }

  [vdEl, clEl, r0El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter drug Volume of Distribution $V_d$ in Liters.',
      'Enter total body Clearance $CL$ in L/hr.',
      'Enter continuous IV infusion rate $R_0$ in mg/hr.',
      'Inspect elimination half-life $t_{1/2}$, steady-state target concentration $C_{ss}$, and 5-half-life equilibration duration.'
    ],
    benefitTitle: 'First-Order Pharmacokinetic Clearance Dynamics',
    benefitContent: 'Half-life determines how long a drug remains in the body and dictates dosing intervals; approximately 5 half-lives ($97\%$) are required to reach therapeutic steady state during continuous dosing.',
    faqs: [{ q: 'How many half-lives are required to eliminate a drug from the body?', a: 'After 5 half-lives, $96.875\%$ of the drug is eliminated; after 7 half-lives, over $99\%$ is cleared.' }]
  },

  // 24. Alveolar Gas Equation & A-a Oxygen Gradient Calculator
  {
    slug: 'alveolar-gas-equation-a-a-oxygen-gradient-calculator',
    name: 'Alveolar Gas Equation & A-a Oxygen Gradient (P_A O₂ = F_i O₂·(P_atm - 47) - PaCO₂/R) Calculator',
    description: 'Calculate ideal alveolar oxygen partial pressure (P_A O₂ = F_i O₂ · (P_atm - 47) - PaCO₂ / 0.8) in mmHg and Alveolar-Arterial (A-a) Oxygen Gradient (P_A O₂ - PaO₂) to evaluate hypoxemic respiratory failure etiology.',
    category: 'Health',
    icon: 'text',
    keywords: ['alveolar gas equation calculator', 'a a gradient formula pao2 minus pao2 online', 'hypoxemia shunt v q mismatch alveolar gas calculator', 'inspired oxygen fio2 paco2 alveolar oxygen calculator', 'pulmonology respiratory critical care online'],
    order: 1157,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fraction of Inspired O₂ F_i O₂ (0.21 Room Air to 1.0), PaCO₂ (mmHg) & Arterial PaO₂ (mmHg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ag-fio2">F_i O₂ (Fraction)</label>
          <input class="tool-textarea" id="ag-fio2" type="number" step="0.1" min="0.21" max="1.0" value="0.21" placeholder="0.21 (Room Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-paco2">PaCO₂ (mmHg)</label>
          <input class="tool-textarea" id="ag-paco2" type="number" step="5" value="40.0" placeholder="40.0 mmHg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-pao2">PaO₂ (mmHg)</label>
          <input class="tool-textarea" id="ag-pao2" type="number" step="5" value="65.0" placeholder="65.0 mmHg (Hypoxemic)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-age">Age (Years)</label>
          <input class="tool-textarea" id="ag-age" type="number" step="5" value="60" placeholder="60 Years" />
        </div>
      </div>
      <div id="ag-res-card2" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ag-res-aa" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">A-a Gradient = 34.7 mmHg (WIDENED)</span>
            <span class="stat-label">Alveolar-Arterial Oxygen Partial Pressure Difference</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ag-res-alv" style="color:var(--green-dark); font-weight:700;">Alveolar P_A O₂ = 99.7 mmHg | Expected Normal A-a ≤ 19.0 mmHg (V/Q Mismatch / Shunt / Diffusion Defect)</span>
            <span class="stat-label">Alveolar Gas Equation & Age-Adjusted Normal Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fiEl = document.getElementById('ag-fio2'), pco2El = document.getElementById('ag-paco2');
  const paEl = document.getElementById('ag-pao2'), agEl = document.getElementById('ag-age');
  const aaResEl = document.getElementById('ag-res-aa'), alResEl = document.getElementById('ag-res-alv');

  const P_atm = 760.0, P_H2O = 47.0, R = 0.80; // Respiratory quotient

  function update() {
    const FiO2 = parseFloat(fiEl.value), PaCO2 = parseFloat(pco2El.value);
    const PaO2 = parseFloat(paEl.value), age = parseFloat(agEl.value);

    if (isNaN(FiO2) || isNaN(PaCO2) || isNaN(PaO2) || isNaN(age) || FiO2 <= 0 || PaCO2 <= 0 || PaO2 <= 0) return;

    // Alveolar Gas Equation: P_A O2 = FiO2 * (P_atm - P_H2O) - (PaCO2 / R)
    const P_A_O2 = FiO2 * (P_atm - P_H2O) - (PaCO2 / R);

    // A-a Gradient = P_A O2 - PaO2
    const Aa_gradient = P_A_O2 - PaO2;

    // Expected normal A-a gradient: (Age / 4) + 4
    const expected_Aa = (age / 4.0) + 4.0;

    let diag = '', color = '#22543d';
    if (Aa_gradient <= expected_Aa + 5.0) {
      diag = 'NORMAL A-a GRADIENT (Hypoventilation / High Altitude / Low FiO₂)';
      color = '#22543d';
    } else {
      diag = 'ELEVATED A-a GRADIENT (V/Q Mismatch, Intrapulmonary Shunt, Diffusion Impairment - PE / Pneumonia / ARDS)';
      color = '#c53030';
    }

    aaResEl.textContent = 'A-a Gradient = ' + Aa_gradient.toFixed(1) + ' mmHg (' + (Aa_gradient > expected_Aa + 5 ? 'WIDENED' : 'NORMAL') + ')';
    aaResEl.style.color = color;
    alResEl.textContent = 'Alveolar P_A O₂ = ' + P_A_O2.toFixed(1) + ' mmHg | Expected Normal ≤ ' + expected_Aa.toFixed(1) + ' mmHg (' + diag.split(' (')[0] + ')';
    alResEl.style.color = color;
  }

  [fiEl, pco2El, paEl, agEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Fraction of Inspired Oxygen $F_i O_2$ (0.21 on room air).',
      'Enter arterial $PaCO_2$ and $PaO_2$ in mmHg from blood gas.',
      'Enter patient age in years.',
      'Inspect calculated Alveolar oxygen pressure ($P_A O_2$) and A-a gradient difference to differentiate intrinsic pulmonary disease from hypoventilation.'
    ],
    benefitTitle: 'Alveolar-Arterial Oxygen Gas Diffusion Barrier',
    benefitContent: 'A normal A-a gradient with low $PaO_2$ indicates pure hypoventilation (narcotic overdose), whereas an elevated A-a gradient confirms intrinsic lung pathology (pulmonary embolism, pneumonia, pulmonary edema).',
    faqs: [{ q: 'What is the rule of thumb for normal A-a gradient with age?', a: 'Normal expected A-a gradient increases with age: $\text{Normal A-a} \approx \frac{\text{Age}}{4} + 4\text{ mmHg}$.' }]
  },

  // 25. Pediatric Drug Dosage (Clark's Rule & Young's Rule) Calculator
  {
    slug: 'pediatric-drug-dosage-clark-young-rule-calculator',
    name: 'Pediatric Drug Dosage Rules (Clark\'s Weight Rule & Young\'s Age Rule) Calculator',
    description: 'Calculate approximate pediatric medication dosages from standard adult doses using Clark\'s Weight Rule (Dose = Adult Dose · (Weight in lbs / 150)) and Young\'s Age Rule (Dose = Adult Dose · (Age / (Age + 12))).',
    category: 'Health',
    icon: 'text',
    keywords: ['pediatric dosage calculator', 'clarks rule drug dosage formula online', 'youngs rule pediatric medication calculator', 'child drug dosage adult dose weight calculator', 'pediatric clinical pharmacology dosing rules online'],
    order: 1158,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Adult Standard Dose (mg), Child Weight (kg or lbs) & Child Age (Years)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pd-adult">Adult Dose (mg)</label>
          <input class="tool-textarea" id="pd-adult" type="number" step="50" value="500" placeholder="500 mg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pd-w">Child Weight (kg)</label>
          <input class="tool-textarea" id="pd-w" type="number" step="2" value="20.0" placeholder="20.0 kg (44.1 lbs)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pd-age">Child Age (Years)</label>
          <input class="tool-textarea" id="pd-age" type="number" step="1" value="6" placeholder="6 Years" />
        </div>
      </div>
      <div id="pd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pd-res-clark" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Clark\'s Dose = 147.0 mg (Weight-Based)</span>
            <span class="stat-label">Clark\'s Rule Pediatric Dose (Adult Dose · (Weight_lbs / 150))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pd-res-young" style="color:var(--green-dark); font-weight:700;">Young\'s Age Dose = 166.7 mg | Weight = 44.1 lbs (29.4% of standard 500 mg adult dose)</span>
            <span class="stat-label">Young\'s Rule Comparison & Adult Fractional Percentage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const adEl = document.getElementById('pd-adult'), wEl = document.getElementById('pd-w'), agEl = document.getElementById('pd-age');
  const clResEl = document.getElementById('pd-res-clark'), ygResEl = document.getElementById('pd-res-young');

  function update() {
    const adultDose = parseFloat(adEl.value), W_kg = parseFloat(wEl.value), age = parseFloat(agEl.value);
    if (isNaN(adultDose) || isNaN(W_kg) || isNaN(age) || adultDose <= 0 || W_kg <= 0 || age <= 0) return;

    // Convert kg to lbs:
    const W_lbs = W_kg * 2.20462;

    // Clark's Rule: Child Dose = Adult Dose * (Weight_lbs / 150)
    const clarkDose = adultDose * (W_lbs / 150.0);

    // Young's Rule: Child Dose = Adult Dose * (Age / (Age + 12))
    const youngDose = adultDose * (age / (age + 12.0));

    const fracPct = (clarkDose / adultDose) * 100.0;

    clResEl.textContent = 'Clark\'s Dose = ' + clarkDose.toFixed(1) + ' mg';
    ygResEl.textContent = 'Young\'s Dose = ' + youngDose.toFixed(1) + ' mg | Weight = ' + W_lbs.toFixed(1) + ' lbs (' + fracPct.toFixed(1) + '% of ' + adultDose + ' mg adult dose)';
  }

  [adEl, wEl, agEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter standard recommended adult drug dose in mg.',
      'Enter child body weight in kg.',
      'Enter child age in years.',
      'Inspect estimated pediatric doses calculated via Clark\'s weight rule and Young\'s age rule.'
    ],
    benefitTitle: 'Historical Clinical Pediatric Dosing Rules',
    benefitContent: 'Clark\'s Rule scales dosing based on standard $150\text{ lb}$ average adult weight, providing historical empirical guidance when precise mg/kg pediatric dosing guidelines are unavailable.',
    faqs: [{ q: 'Why is mg/kg dosing preferred over Clark or Young rules in modern pediatrics?', a: 'Modern clinical pediatrics doses medications strictly per kilogram ($mg/kg$) or body surface area ($mg/m^2$) for precise therapeutic index control.' }]
  },

  // 26. Optical Lens Vergence & Vertex Distance Power Compensation Calculator
  {
    slug: 'lens-vergence-spectacle-magnification-refraction-calculator',
    name: 'Ophthalmic Lens Vergence (P = 1/f) & Vertex Distance Compensation Calculator',
    description: 'Calculate optical focal power vergence in diopters (D = 1 / f), spectacle-to-contact lens vertex distance power compensation (F_contact = F_spec / (1 - d·F_spec)), and retinal image magnification in optometry.',
    category: 'Health',
    icon: 'text',
    keywords: ['lens vergence calculator', 'vertex distance compensation formula f contact equals f spec over 1 minus d f spec online', 'diopters focal length optometry calculator', 'spectacle to contact lens power converter calculator', 'optometry ophthalmology optical refraction online'],
    order: 1159,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Spectacle Prescription Power F_spec (Diopters D) & Vertex Distance d (mm, typically 12-14 mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lv-pwr">Spectacle (D)</label>
          <input class="tool-textarea" id="lv-pwr" type="number" step="0.25" value="-6.00" placeholder="-6.00 D (High Myopia)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lv-d">Vertex d (mm)</label>
          <input class="tool-textarea" id="lv-d" type="number" step="1" value="12.0" placeholder="12.0 mm" />
        </div>
      </div>
      <div id="lv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lv-res-contact" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Contact Lens = -5.60 D (-5.50 or -5.75 D)</span>
            <span class="stat-label">Vertex-Corrected Contact Lens Refractive Power</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lv-res-focal" style="color:var(--green-dark); font-weight:700;">Focal Length f = -16.67 cm (-0.167 m) | Less minus power needed on cornea</span>
            <span class="stat-label">True Optical Focal Distance (f = 1 / P) & Refractive Shift</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pwrEl = document.getElementById('lv-pwr'), dEl = document.getElementById('lv-d');
  const ctResEl = document.getElementById('lv-res-contact'), fcResEl = document.getElementById('lv-res-focal');

  function update() {
    const F_spec = parseFloat(pwrEl.value), d_mm = parseFloat(dEl.value);
    if (isNaN(F_spec) || isNaN(d_mm) || F_spec === 0 || d_mm < 0) return;

    const d_m = d_mm / 1000.0;

    // Vertex distance compensation:
    // F_contact = F_spec / ( 1 - d * F_spec )  [Diopters]
    const F_contact = F_spec / (1.0 - d_m * F_spec);

    // Focal length f = 1 / F_spec  [meters -> cm]
    const f_cm = (1.0 / F_spec) * 100.0;

    // Round to nearest 0.25 D standard prescription step:
    const rounded_25 = Math.round(F_contact * 4.0) / 4.0;

    ctResEl.textContent = 'Contact Lens = ' + F_contact.toFixed(2) + ' D (' + (rounded_25 >= 0 ? '+' : '') + rounded_25.toFixed(2) + ' D standard)';
    fcResEl.textContent = 'Focal Length f = ' + f_cm.toFixed(2) + ' cm | Vertex: ' + d_mm + ' mm (Shift = ' + (F_contact - F_spec >= 0 ? '+' : '') + (F_contact - F_spec).toFixed(2) + ' D)';
  }

  pwrEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter eyeglass spectacle prescription power in Diopters (negative for myopia nearsightedness, positive for hyperopia farsightedness).',
      'Enter spectacle back vertex distance d in mm (distance from corneal apex to back of eyeglass lens, standard 12 mm).',
      'Inspect required vertex-corrected contact lens prescription power and true optical focal length.'
    ],
    benefitTitle: 'Ophthalmic Vertex Distance Compensation Standard',
    benefitContent: 'Moving a lens closer to the cornea shifts effective vergence; myopic patients require less minus power in contact lenses ($F_{\text{contact}} = \frac{F_{\text{spec}}}{1 - d F_{\text{spec}}}$) while hyperopes require more plus power.',
    faqs: [{ q: 'At what prescription power does vertex distance compensation become necessary?', a: 'Vertex distance compensation is clinically mandatory for any prescription exceeding $\pm 4.00\text{ Diopters}$.' }]
  }
];

pack40Tools.forEach(createTool);
console.log('Pack 40 complete: ' + pack40Tools.length + ' tools created.');
