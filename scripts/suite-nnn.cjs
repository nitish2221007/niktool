const { createTool } = require('./generate-curated-tools.cjs');

// Suite NNN: 5 Tools in Biomedical Engineering, Clinical Physiology & Pharmacokinetics to reach 640 tools
const toolsSuiteNNN = [
  // 1. Creatinine Clearance (Cockcroft-Gault GFR) Calculator
  {
    slug: 'creatinine-clearance-cockcroft-gault-calculator',
    name: 'Creatinine Clearance (Cockcroft-Gault Kidney GFR) Calculator',
    description: 'Calculate estimated renal creatinine clearance (CrCl = ((140 - Age) · Weight · (0.85 if Female)) / (72 · S_cr)) in mL/min for clinical drug dosing adjustments.',
    category: 'Science',
    icon: 'text',
    keywords: ['creatinine clearance calculator', 'cockcroft gault formula online', 'crcl kidney function calculator', 'serum creatinine gfr calculator', 'renal drug dosing cockcroft gault online'],
    order: 513,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Age (Years), Weight (kg), Serum Creatinine (mg/dL) & Biological Sex',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cg-age">Age (Years)</label>
          <input class="tool-textarea" id="cg-age" type="number" min="18" max="110" value="65" placeholder="65" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-wt">Weight (kg)</label>
          <input class="tool-textarea" id="cg-wt" type="number" step="any" value="70.0" placeholder="70.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-scr">Serum Creatinine (mg/dL)</label>
          <input class="tool-textarea" id="cg-scr" type="number" step="0.1" value="1.2" placeholder="1.2 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-sex">Biological Sex</label>
          <select class="tool-textarea" id="cg-sex">
            <option value="1.0" selected>Male (Factor = 1.00)</option>
            <option value="0.85">Female (Factor = 0.85)</option>
          </select>
        </div>
      </div>
      <div id="cg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cg-res-crcl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">60.8 mL / min</span>
            <span class="stat-label">Estimated Creatinine Clearance (CrCl)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cg-res-stage" style="font-weight:700;">Mild Renal Impairment (60 - 89 mL/min)</span>
            <span class="stat-label">Renal Function Stage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('cg-age'), wEl = document.getElementById('cg-wt');
  const sEl = document.getElementById('cg-scr'), sxEl = document.getElementById('cg-sex');
  const cResEl = document.getElementById('cg-res-crcl'), stResEl = document.getElementById('cg-res-stage');

  function update() {
    const age = parseFloat(aEl.value), wtKg = parseFloat(wEl.value);
    const scr = parseFloat(sEl.value), sexFactor = parseFloat(sxEl.value);

    if (isNaN(age) || isNaN(wtKg) || isNaN(scr) || isNaN(sexFactor) || age <= 0 || wtKg <= 0 || scr <= 0) return;

    // Cockcroft-Gault: CrCl = [ (140 - Age) * Weight_kg * (0.85 if female) ] / ( 72 * Scr_mg_dL )  [mL/min]
    const crcl = ((140 - age) * wtKg * sexFactor) / (72 * scr);

    cResEl.textContent = crcl.toFixed(1) + ' mL / min';

    if (crcl >= 90) {
      stResEl.textContent = 'Normal Kidney Function (CrCl ≥ 90 mL/min)';
      stResEl.style.color = '#22543d';
    } else if (crcl >= 60) {
      stResEl.textContent = 'Mild Renal Impairment (60 to 89 mL/min)';
      stResEl.style.color = '#2563eb';
    } else if (crcl >= 30) {
      stResEl.textContent = 'Moderate Renal Impairment (30 to 59 mL/min: Dose Reduction Required)';
      stResEl.style.color = '#d97706';
    } else if (crcl >= 15) {
      stResEl.textContent = 'Severe Renal Impairment (15 to 29 mL/min)';
      stResEl.style.color = '#c53030';
    } else {
      stResEl.textContent = 'End-Stage Renal Disease / Kidney Failure (< 15 mL/min: Dialysis)';
      stResEl.style.color = '#c53030';
    }
  }

  [aEl, wEl, sEl, sxEl].forEach(el => el.addEventListener('input', update));
  sxEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter patient age in years (18+).',
      'Enter patient total body weight in kilograms (kg).',
      'Enter laboratory serum creatinine concentration in mg/dL.',
      'Select patient biological sex (0.85 female adjustment factor for muscle mass differences).',
      'Inspect estimated creatinine clearance in mL/min and FDA renal drug dosing impairment classification.'
    ],
    benefitTitle: 'Donald W. Cockcroft & M. Henry Gault 1976 Equation',
    benefitContent: 'Cockcroft-Gault remains the gold standard FDA regulatory formula for calculating patient renal clearance and adjusting antibiotic/chemotherapy dosages to prevent drug toxicity.',
    faqs: [{ q: 'Why is female clearance multiplied by 0.85?', a: 'Females have approximately 15% less lean skeletal muscle mass per kilogram than males, producing less endogenous baseline creatinine breakdown.' }]
  },

  // 2. Body Surface Area (BSA - Mosteller & Du Bois) Calculator
  {
    slug: 'body-surface-area-mosteller-du-bois-calculator',
    name: 'Body Surface Area (BSA - Mosteller & Du Bois) Calculator',
    description: 'Calculate patient total Body Surface Area (BSA = √((Height_cm · Weight_kg) / 3600)) in square meters (m²) using Mosteller, Du Bois, and Haycock clinical formulas.',
    category: 'Science',
    icon: 'text',
    keywords: ['bsa calculator', 'body surface area mosteller formula', 'du bois bsa calculator online', 'chemotherapy drug bsa dosing calculator', 'cardiac index bsa normalizer online'],
    order: 514,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Patient Height (cm or inches) & Patient Weight (kg or lbs)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bsa-ht">Height (cm)</label>
          <input class="tool-textarea" id="bsa-ht" type="number" step="any" value="175.0" placeholder="175 cm (5 ft 9 in)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bsa-wt">Weight (kg)</label>
          <input class="tool-textarea" id="bsa-wt" type="number" step="any" value="75.0" placeholder="75.0 kg (165 lbs)" />
        </div>
      </div>
      <div id="bsa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bsa-res-most" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.91 m²</span>
            <span class="stat-label">Mosteller BSA (Clinical Standard)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bsa-res-dubois" style="font-weight:700;">1.90 m² (Du Bois) | 1.91 m² (Haycock)</span>
            <span class="stat-label">Du Bois & Haycock Multi-Formula Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const htEl = document.getElementById('bsa-ht'), wtEl = document.getElementById('bsa-wt');
  const mResEl = document.getElementById('bsa-res-most'), dResEl = document.getElementById('bsa-res-dubois');

  function update() {
    const H = parseFloat(htEl.value), W = parseFloat(wtEl.value);
    if (isNaN(H) || isNaN(W) || H <= 0 || W <= 0) return;

    // Mosteller formula: BSA = sqrt( (H * W) / 3600 )  [m^2]
    const bsaMosteller = Math.sqrt((H * W) / 3600);
    // Du Bois formula: BSA = 0.007184 * (H^0.725) * (W^0.425)  [m^2]
    const bsaDuBois = 0.007184 * Math.pow(H, 0.725) * Math.pow(W, 0.425);
    // Haycock formula: BSA = 0.024265 * (H^0.3964) * (W^0.5378)  [m^2]
    const bsaHaycock = 0.024265 * Math.pow(H, 0.3964) * Math.pow(W, 0.5378);

    mResEl.textContent = bsaMosteller.toFixed(2) + ' m² (Mosteller BSA)';
    dResEl.textContent = bsaDuBois.toFixed(2) + ' m² (Du Bois) | ' + bsaHaycock.toFixed(2) + ' m² (Haycock)';
  }

  htEl.addEventListener('input', update);
  wtEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter patient body height in centimeters (cm).',
      'Enter patient body weight in kilograms (kg).',
      'Inspect calculated Body Surface Area in square meters ($m^2$) for chemotherapy dosage calculation and cardiac index indexing.'
    ],
    benefitTitle: 'Robert D. Mosteller\'s 1987 Simplified Formula',
    benefitContent: 'Mosteller demonstrated that the simple square-root formula $\\text{BSA} = \\sqrt{(H\\cdot W)/3600}$ matches complex multi-exponential models within 1%, becoming the universal hospital standard for oncology medication prescribing.',
    faqs: [{ q: 'What is the average adult BSA?', a: 'Average adult male BSA is approximately 1.9 m² (females ~1.6 m²).' }]
  },

  // 3. Mean Arterial Pressure (MAP) Cardiovascular Hemodynamics Calculator
  {
    slug: 'mean-arterial-pressure-map-cardiac-calculator',
    name: 'Mean Arterial Pressure (MAP) Hemodynamics Calculator',
    description: 'Calculate cardiovascular Mean Arterial Pressure (MAP = DBP + ⅓ · (SBP - DBP)) in mmHg, Pulse Pressure (PP = SBP - DBP), and organ perfusion safety margin.',
    category: 'Science',
    icon: 'text',
    keywords: ['map calculator', 'mean arterial pressure formula', 'pulse pressure sbp dbp calculator', 'organ perfusion map calculator online', 'icu hemodynamics mean arterial pressure online'],
    order: 515,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Systolic Blood Pressure (SBP in mmHg) & Diastolic (DBP in mmHg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="map-sbp">Systolic SBP (mmHg)</label>
          <input class="tool-textarea" id="map-sbp" type="number" step="1" value="120" placeholder="120 mmHg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="map-dbp">Diastolic DBP (mmHg)</label>
          <input class="tool-textarea" id="map-dbp" type="number" step="1" value="80" placeholder="80 mmHg" />
        </div>
      </div>
      <div id="map-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="map-res-map" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">93.3 mmHg (MAP)</span>
            <span class="stat-label">Mean Arterial Pressure (MAP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="map-res-perf" style="color:var(--green-dark); font-weight:700;">Adequate Vital Organ Perfusion (MAP ≥ 65 mmHg)</span>
            <span class="stat-label">Tissue Perfusion Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('map-sbp'), dEl = document.getElementById('map-dbp');
  const mResEl = document.getElementById('map-res-map'), pResEl = document.getElementById('map-res-perf');

  function update() {
    const sbp = parseFloat(sEl.value), dbp = parseFloat(dEl.value);
    if (isNaN(sbp) || isNaN(dbp) || sbp <= dbp || dbp <= 0) return;

    // Pulse Pressure PP = SBP - DBP
    const pp = sbp - dbp;
    // MAP = DBP + (1/3) * PP = (2 * DBP + SBP) / 3  [mmHg]
    const map = dbp + (pp / 3);

    mResEl.textContent = map.toFixed(1) + ' mmHg (Pulse Pressure ' + Math.round(pp) + ' mmHg)';

    if (map >= 70 && map <= 105) {
      pResEl.textContent = 'Normal Optimal Organ Perfusion (MAP 70 to 105 mmHg)';
      pResEl.style.color = '#22543d';
    } else if (map >= 65 && map < 70) {
      pResEl.textContent = 'Adequate Minimum Perfusion (MAP ≥ 65 mmHg ICU Threshold)';
      pResEl.style.color = '#2563eb';
    } else if (map < 65) {
      pResEl.textContent = 'HYPOPERFUSION RISK (MAP < 65 mmHg: Kidney & Brain Ischemia Danger)';
      pResEl.style.color = '#c53030';
    } else {
      pResEl.textContent = 'HYPERTENSION CRISIS RISK (MAP > 105 mmHg: High Cardiac Afterload)';
      pResEl.style.color = '#d97706';
    }
  }

  sEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter patient systolic blood pressure (SBP) in mmHg.',
      'Enter patient diastolic blood pressure (DBP) in mmHg.',
      'Inspect Mean Arterial Pressure (MAP) and verify adequate cerebral and renal tissue perfusion.'
    ],
    benefitTitle: 'Why Diastole Counts Twice as Much as Systole',
    benefitContent: 'Because the resting human cardiac cycle spends approximately 2/3 of its time in diastole (filling) and only 1/3 in systole (pumping), MAP weights diastolic pressure double ($MAP = (2\cdot DBP + SBP)/3$).',
    faqs: [{ q: 'What is the minimum safe MAP in intensive care units (ICU)?', a: 'Surviving Sepsis guidelines recommend maintaining MAP ≥ 65 mmHg to ensure adequate glomerular filtration in kidneys and coronary perfusion.' }]
  },

  // 4. Cardiac Output (Fick Principle) Hemodynamic Calculator
  {
    slug: 'cardiac-output-fick-principle-calculator',
    name: 'Cardiac Output (Fick Principle) Hemodynamic Calculator',
    description: 'Calculate total heart blood flow cardiac output (CO = VO₂ / (C_a - C_v) · 100) in L/min and Cardiac Index (CI = CO / BSA) using Adolf Fick\'s oxygen mass balance.',
    category: 'Science',
    icon: 'text',
    keywords: ['fick cardiac output calculator', 'fick principle oxygen consumption formula', 'cardiac index ci calculator online', 'arteriovenous oxygen difference avo2 calculator', 'hemodynamic catheterization fick calculator'],
    order: 516,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Oxygen Uptake VO₂ (mL/min), Arterial O₂ Content C_a (mL/dL) & Mixed Venous C_v (mL/dL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fick-vo2">O₂ Uptake VO₂ (mL/min)</label>
          <input class="tool-textarea" id="fick-vo2" type="number" step="any" value="250" placeholder="250 mL/min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fick-ca">Arterial C_a (mL/dL)</label>
          <input class="tool-textarea" id="fick-ca" type="number" step="any" value="19.0" placeholder="19.0 mL O₂ / dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fick-cv">Venous C_v (mL/dL)</label>
          <input class="tool-textarea" id="fick-cv" type="number" step="any" value="14.0" placeholder="14.0 mL O₂ / dL (Pulmonary Artery)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fick-bsa">Patient BSA (m²)</label>
          <input class="tool-textarea" id="fick-bsa" type="number" step="0.05" value="1.85" placeholder="1.85 m²" />
        </div>
      </div>
      <div id="fick-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fick-res-co" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.00 L / min</span>
            <span class="stat-label">Calculated Cardiac Output (CO)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fick-res-ci" style="font-weight:700;">CI = 2.70 L / min / m² (Normal)</span>
            <span class="stat-label">Cardiac Index (CO / BSA)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vo2El = document.getElementById('fick-vo2'), caEl = document.getElementById('fick-ca');
  const cvEl = document.getElementById('fick-cv'), bsaEl = document.getElementById('fick-bsa');
  const coResEl = document.getElementById('fick-res-co'), ciResEl = document.getElementById('fick-res-ci');

  function update() {
    const VO2 = parseFloat(vo2El.value), Ca = parseFloat(caEl.value);
    const Cv = parseFloat(cvEl.value), bsa = parseFloat(bsaEl.value);

    if (isNaN(VO2) || isNaN(Ca) || isNaN(Cv) || isNaN(bsa) || VO2 <= 0 || Ca <= Cv || Cv <= 0 || bsa <= 0) return;

    // A-V O2 difference in mL / L = (Ca - Cv) * 10
    const avDiff_mLL = (Ca - Cv) * 10;
    // Cardiac Output CO = VO2 / avDiff_mLL  [L / min]
    const CO = VO2 / avDiff_mLL;
    // Cardiac Index CI = CO / BSA  [L / min / m^2]
    const CI = CO / bsa;

    coResEl.textContent = CO.toFixed(2) + ' L / min (A-V Diff: ' + (Ca - Cv).toFixed(1) + ' mL/dL)';

    if (CI >= 2.5 && CI <= 4.0) {
      ciResEl.textContent = 'CI = ' + CI.toFixed(2) + ' L/min/m² (Normal Cardiac Index)';
      ciResEl.style.color = '#22543d';
    } else if (CI < 2.2) {
      ciResEl.textContent = 'CI = ' + CI.toFixed(2) + ' L/min/m² (CARDIOGENIC SHOCK / Low Output < 2.2)';
      ciResEl.style.color = '#c53030';
    } else {
      ciResEl.textContent = 'CI = ' + CI.toFixed(2) + ' L/min/m² (Hyperdynamic / High Output)';
      ciResEl.style.color = '#2563eb';
    }
  }

  [vo2El, caEl, cvEl, bsaEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter metabolic oxygen consumption rate $VO_2$ in mL/min (or estimated 125 mL/min/m² × BSA).',
      'Enter arterial oxygen content $C_a$ in mL O₂ / dL blood.',
      'Enter mixed venous oxygen content $C_v$ sampled from pulmonary artery catheter in mL/dL.',
      'Enter patient body surface area (BSA) in m².',
      'Inspect Cardiac Output in L/min and Cardiac Index ($L/min/m^2$).'
    ],
    benefitTitle: 'Adolf Fick\'s 1870 Mass Conservation Law',
    benefitContent: 'The direct Fick method remains the definitive clinical reference gold standard for measuring human heart pumping capacity by tracking whole-body oxygen consumption against arteriovenous blood extraction.',
    faqs: [{ q: 'What is normal resting cardiac output?', a: 'Normal adult resting cardiac output is 4.0 to 8.0 L/min (Cardiac Index 2.5 to 4.0 L/min/m²).' }]
  },

  // 5. Henderson-Hasselbalch Blood pH & Acid-Base ABG Calculator
  {
    slug: 'henderson-hasselbalch-blood-ph-calculator',
    name: 'Henderson-Hasselbalch Blood pH & Acid-Base ABG Calculator',
    description: 'Calculate arterial blood pH (pH = 6.10 + log₁₀([HCO₃⁻] / (0.0307 · PaCO₂))) from Bicarbonate and partial pressure of CO₂ to diagnose respiratory and metabolic acidosis/alkalosis.',
    category: 'Science',
    icon: 'text',
    keywords: ['henderson hasselbalch blood ph calculator', 'arterial blood gas abg calculator', 'acid base balance hco3 paco2 formula', 'metabolic respiratory acidosis alkalosis calculator', 'blood bicarbonate ph henderson online'],
    order: 517,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bicarbonate [HCO₃⁻] (mEq/L) & Arterial PaCO₂ (mmHg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hh-hco3">Bicarbonate [HCO₃⁻] (mEq/L)</label>
          <input class="tool-textarea" id="hh-hco3" type="number" step="any" value="24.0" placeholder="24.0 mEq/L (Normal 22-26)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hh-paco2">PaCO₂ (mmHg)</label>
          <input class="tool-textarea" id="hh-paco2" type="number" step="any" value="40.0" placeholder="40.0 mmHg (Normal 35-45)" />
        </div>
      </div>
      <div id="hh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hh-res-ph" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">pH 7.40</span>
            <span class="stat-label">Calculated Arterial Blood pH</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hh-res-diag" style="color:var(--green-dark); font-weight:700;">Normal Acid-Base Homeostasis (7.35 - 7.45)</span>
            <span class="stat-label">Clinical ABG Diagnosis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('hh-hco3'), pEl = document.getElementById('hh-paco2');
  const phResEl = document.getElementById('hh-res-ph'), dgResEl = document.getElementById('hh-res-diag');

  const pKa = 6.10;
  const alpha = 0.0307; // Solubility coefficient of CO2 in plasma (mM / mmHg)

  function update() {
    const hco3 = parseFloat(hEl.value), paco2 = parseFloat(pEl.value);
    if (isNaN(hco3) || isNaN(paco2) || hco3 <= 0 || paco2 <= 0) return;

    // Dissolved CO2 = alpha * PaCO2
    const dissolvedCO2 = alpha * paco2;
    // Henderson-Hasselbalch: pH = 6.10 + log10( [HCO3-] / dissolvedCO2 )
    const ratio = hco3 / dissolvedCO2;
    const pH = pKa + Math.log10(ratio);

    phResEl.textContent = 'pH ' + pH.toFixed(2) + ' (Ratio 20:1 = ' + ratio.toFixed(1) + ':1)';

    if (pH >= 7.35 && pH <= 7.45) {
      dgResEl.textContent = 'Normal Acid-Base Homeostasis (pH 7.35 to 7.45)';
      dgResEl.style.color = '#22543d';
    } else if (pH < 7.35) {
      let cause = (paco2 > 45 && hco3 < 22) ? 'Mixed Respiratory & Metabolic Acidosis' : (paco2 > 45 ? 'Respiratory Acidosis (CO₂ Retention)' : 'Metabolic Acidosis (Low HCO₃⁻)');
      dgResEl.textContent = 'ACIDEMIA (pH < 7.35): ' + cause;
      dgResEl.style.color = '#c53030';
    } else {
      let cause = (paco2 < 35 && hco3 > 26) ? 'Mixed Alkalosis' : (paco2 < 35 ? 'Respiratory Alkalosis (Hyperventilation)' : 'Metabolic Alkalosis (Excess HCO₃⁻)');
      dgResEl.textContent = 'ALKALEMIA (pH > 7.45): ' + cause;
      dgResEl.style.color = '#d97706';
    }
  }

  hEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter arterial serum bicarbonate concentration [HCO₃⁻] in mEq/L (normal 22 to 26 mEq/L).',
      'Enter arterial partial pressure of carbon dioxide (PaCO₂) in mmHg (normal 35 to 45 mmHg).',
      'Inspect calculated blood pH and clinical acid-base interpretation (Metabolic vs Respiratory Acidosis/Alkalosis).'
    ],
    benefitTitle: 'The 20:1 Carbonic Acid Buffer Equilibrium',
    benefitContent: 'Normal physiological human blood pH of 7.40 is maintained when the ratio of basic bicarbonate to dissolved acidic carbon dioxide equals exactly 20:1 ($\text{pH} = 6.10 + \log_{10}(20) = 6.10 + 1.30 = 7.40$).',
    faqs: [{ q: 'What is the normal arterial blood pH range?', a: 'Strict homeostatic normal arterial blood pH is 7.35 to 7.45.' }]
  }
];

toolsSuiteNNN.forEach(createTool);
console.log('Suite NNN complete: 5 tools created.');
