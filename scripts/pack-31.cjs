const { createTool } = require('./generate-curated-tools.cjs');

// Pack 31: 25 High-Value Clinical, Nursing, Biochemistry, Organic Chemistry & Laboratory Student Calculators (Tools 1026 to 1050)
const pack31Tools = [
  // 1. Nursing Dosage IV Flow Drop Rate (gtt/min) Calculator
  {
    slug: 'medical-nursing-dosage-iv-flow-drop-rate-gtt-min-calculator',
    name: 'Nursing Dosage IV Flow Drop Rate (gtt/min) & Infusion Time Calculator',
    description: 'Calculate clinical intravenous (IV) medication flow drop rate in drops per minute (gtt/min = (Volume in mL · Drop Factor in gtt/mL) / Time in minutes) and infusion pump rate (mL/h) for nursing NCLEX exams.',
    category: 'Health',
    icon: 'calculator',
    keywords: ['iv drop rate calculator', 'gtt per min formula volume times drop factor over time online', 'nclex nursing dosage calculation iv flow rate calculator', 'intravenous drip rate macrodrip microdrip calculator', 'nursing student iv math calculator online'],
    order: 907,
    schemaCategory: 'MedicalWebPage',
    workspaceHeading: 'Total IV Volume (mL), Infusion Time (Hours) & Tubing Drop Factor (10, 15, 20, 60 gtt/mL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="iv-vol">Volume (mL)</label>
          <input class="tool-textarea" id="iv-vol" type="number" step="50" value="1000" placeholder="1000 mL (Normal Saline)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="iv-hrs">Time (Hours)</label>
          <input class="tool-textarea" id="iv-hrs" type="number" step="0.5" value="8.0" placeholder="8.0 Hours" />
        </div>
        <div class="control-group">
          <label class="control-label" for="iv-drop">Drop Factor</label>
          <select class="tool-textarea" id="iv-drop">
            <option value="10">10 gtt/mL (Macrodrip Blood/Viscous)</option>
            <option value="15" selected>15 gtt/mL (Standard Adult Macrodrip)</option>
            <option value="20">20 gtt/mL (Macrodrip)</option>
            <option value="60">60 gtt/mL (Microdrip Pediatric)</option>
          </select>
        </div>
      </div>
      <div id="iv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="iv-res-gtt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">31 gtt / min (Drop Rate)</span>
            <span class="stat-label">Manual Gravity Drip Flow Rate (gtt/min)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="iv-res-mlhr" style="font-weight:700;">Pump Rate = 125 mL/h (1 drop every 1.9 seconds @ 15 gtt/mL)</span>
            <span class="stat-label">Volumetric Infusion Pump Setting & Drop Interval</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('iv-vol'), hEl = document.getElementById('iv-hrs'), dEl = document.getElementById('iv-drop');
  const gttResEl = document.getElementById('iv-res-gtt'), mlResEl = document.getElementById('iv-res-mlhr');

  function update() {
    const vol_mL = parseFloat(vEl.value), hours = parseFloat(hEl.value);
    const dropFactor = parseInt(dEl.value, 10);

    if (isNaN(vol_mL) || isNaN(hours) || isNaN(dropFactor) || vol_mL <= 0 || hours <= 0) return;

    // Pump rate in mL / h
    const mL_per_hr = vol_mL / hours;

    // Flow rate in gtt / min = ( Volume * Drop Factor ) / ( hours * 60 )
    const totalMins = hours * 60.0;
    const gtt_per_min_raw = (vol_mL * dropFactor) / totalMins;
    const gtt_per_min = Math.round(gtt_per_min_raw);

    // Drop interval in seconds = 60 / gtt_per_min
    const sec_per_drop = 60.0 / gtt_per_min_raw;

    gttResEl.textContent = gtt_per_min + ' gtt / min (Drops)';
    mlResEl.textContent = 'Pump Rate = ' + mL_per_hr.toFixed(0) + ' mL/h (1 drop every ' + sec_per_drop.toFixed(1) + ' s @ ' + dropFactor + ' gtt/mL)';
  }

  [vEl, hEl, dEl].forEach(el => el.addEventListener('input', update));
  dEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter total IV prescribed fluid volume in milliliters (mL).',
      'Enter prescribed total infusion delivery duration in hours.',
      'Select IV administration set calibration tubing drop factor ($10, 15, 20\text{ macrodrip or }60\text{ microdrip gtt/mL}$).',
      'Inspect calculated manual gravity drip rate in drops per minute ($\text{gtt/min}$) and electronic infusion pump flow rate ($\text{mL/h}$).'
    ],
    benefitTitle: 'Clinical Nursing NCLEX Dosage Math Formula',
    benefitContent: 'Mastering IV flow rate math ($\text{gtt/min} = \frac{\text{Volume (mL)} \times \text{Drop Factor}}{\text{Time (min)}}$) prevents catastrophic fluid overload or medication under-delivery in pediatric and adult intensive care units.',
    faqs: [{ q: 'What is the difference between Macrodrip and Microdrip tubing?', a: 'Macrodrip delivers large drops ($10\text{ to }20\text{ gtt/mL}$) for rapid adult hydration; Microdrip delivers tiny drops ($60\text{ gtt/mL}$) for precise pediatric medication delivery.' }]
  },

  // 2. Pediatric Drug Dosage (Clark's Rule & Young's Rule) Calculator
  {
    slug: 'pediatric-clark-rule-young-rule-drug-dosage-calculator',
    name: 'Pediatric Drug Dosage (Clark\'s Rule, Young\'s Rule & Fried\'s Rule) Calculator',
    description: 'Calculate safe child medication dosage from adult standard dose using Clark\'s Rule (Dose = (Weight in lbs / 150) · Adult Dose), Young\'s Rule (Dose = (Age / (Age + 12)) · Adult Dose), and Fried\'s Infant Rule for nursing pharmacology.',
    category: 'Health',
    icon: 'calculator',
    keywords: ['pediatric dosage calculator', 'clarks rule formula weight in lbs over 150 times adult dose online', 'youngs rule child drug dose calculator age', 'nursing pharmacology pediatric dose calculator', 'frieds rule infant drug dosage calculator online'],
    order: 908,
    schemaCategory: 'MedicalWebPage',
    workspaceHeading: 'Adult Standard Dose (mg), Child Weight (kg or lbs), Child Age (Years or Months)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ped-adult">Adult Dose (mg)</label>
          <input class="tool-textarea" id="ped-adult" type="number" step="50" value="500" placeholder="500 mg (Paracetamol/Amox)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ped-wt">Child Weight (kg)</label>
          <input class="tool-textarea" id="ped-wt" type="number" step="1" value="20.0" placeholder="20.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ped-age">Child Age (Years)</label>
          <input class="tool-textarea" id="ped-age" type="number" step="1" value="6" placeholder="6 Years Old" />
        </div>
      </div>
      <div id="ped-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ped-res-clark" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">147 mg (Clark\'s Weight Rule)</span>
            <span class="stat-label">Weight-Based Dose (Clark\'s Rule: Weight / 150 lbs)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ped-res-young" style="font-weight:700;">Young\'s Age Rule: 167 mg (Age / (Age + 12) = 6/18 · 500 mg)</span>
            <span class="stat-label">Age-Based Child Dose Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('ped-adult'), wEl = document.getElementById('ped-wt'), agEl = document.getElementById('ped-age');
  const clkResEl = document.getElementById('ped-res-clark'), yngResEl = document.getElementById('ped-res-young');

  function update() {
    const adultDose = parseFloat(aEl.value), weightKg = parseFloat(wEl.value), ageYears = parseFloat(agEl.value);
    if (isNaN(adultDose) || isNaN(weightKg) || isNaN(ageYears) || adultDose <= 0 || weightKg <= 0 || ageYears <= 0) return;

    // Convert kg to lbs: 1 kg = 2.20462 lbs
    const weightLbs = weightKg * 2.20462;

    // Clark's Rule (Weight-based): Child Dose = ( Weight in lbs / 150 ) * Adult Dose
    const clarkDose = (weightLbs / 150.0) * adultDose;

    // Young's Rule (Age-based for children 1-12 yrs): Child Dose = ( Age / (Age + 12) ) * Adult Dose
    const youngDose = (ageYears / (ageYears + 12.0)) * adultDose;

    clkResEl.textContent = Math.round(clarkDose) + ' mg (Clark\'s Rule)';
    yngResEl.textContent = 'Young\'s Rule = ' + Math.round(youngDose) + ' mg | Child Wt: ' + weightKg + ' kg (' + weightLbs.toFixed(1) + ' lbs) @ Adult Dose ' + adultDose + ' mg';
  }

  [aEl, wEl, agEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter standard adult single dose in milligrams (mg).',
      'Enter child body weight in kilograms (kg).',
      'Enter child age in years.',
      'Inspect weight-based Clark\'s Rule dose ($\text{Weight (lbs)} / 150 \times \text{Adult Dose}$) and age-based Young\'s Rule comparison.'
    ],
    benefitTitle: 'Pediatric Pharmacology Dosing Principles',
    benefitContent: 'Children metabolize medications differently than adults due to developing liver enzymes and renal clearance; Clark\'s Rule based on body weight provides a safer dosing approximation than chronological age alone.',
    faqs: [{ q: 'Why is Clark\'s Rule preferred over Young\'s Rule?', a: 'Body weight is a far better physiological indicator of drug distribution volume than chronological age, especially for children who are above or below average height.' }]
  },

  // 3. Creatinine Clearance (Cockcroft-Gault GFR) Kidney Function Calculator
  {
    slug: 'creatinine-clearance-cockcroft-gault-gfr-calculator',
    name: 'Creatinine Clearance (Cockcroft-Gault CrCl / eGFR) Kidney Function Calculator',
    description: 'Calculate renal drug dosing Creatinine Clearance (CrCl = [(140 - Age) · Weight in kg] / [72 · Serum Creatinine in mg/dL] · (0.85 if Female)) in mL/min and classify chronic kidney disease (CKD) stages.',
    category: 'Health',
    icon: 'calculator',
    keywords: ['creatinine clearance calculator', 'cockcroft gault formula crcl online', 'gfr kidney function creatinine clearance calculator', 'renal drug dosing cockcroft gault calculator', 'ckd stage egfr creatinine clearance online'],
    order: 909,
    schemaCategory: 'MedicalWebPage',
    workspaceHeading: 'Age (Years), Body Weight (kg), Serum Creatinine S_cr (mg/dL) & Biological Sex',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cr-age">Age (Years)</label>
          <input class="tool-textarea" id="cr-age" type="number" step="1" value="65" placeholder="65" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-wt">Weight (kg)</label>
          <input class="tool-textarea" id="cr-wt" type="number" step="1" value="70.0" placeholder="70.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-scr">Creatinine (mg/dL)</label>
          <input class="tool-textarea" id="cr-scr" type="number" step="0.1" value="1.2" placeholder="1.2 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-sex">Biological Sex</label>
          <select class="tool-textarea" id="cr-sex">
            <option value="male" selected>Male (Multiplier = 1.00)</option>
            <option value="female">Female (Multiplier = 0.85)</option>
          </select>
        </div>
      </div>
      <div id="cr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cr-res-cl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CrCl = 60.8 mL/min</span>
            <span class="stat-label">Creatinine Clearance Rate (Cockcroft-Gault)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cr-res-ckd" style="color:var(--green-dark); font-weight:700;">STAGE 2 CKD (Mild Impairment 60-89 mL/min): Adjust renally cleared antibiotic dosing</span>
            <span class="stat-label">Renal Function Stage & Clinical Drug Adjustment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const agEl = document.getElementById('cr-age'), wtEl = document.getElementById('cr-wt');
  const scrEl = document.getElementById('cr-scr'), sxEl = document.getElementById('cr-sex');
  const clResEl = document.getElementById('cr-res-cl'), ckdResEl = document.getElementById('cr-res-ckd');

  function update() {
    const age = parseFloat(agEl.value), weight = parseFloat(wtEl.value), scr = parseFloat(scrEl.value);
    const isFemale = sxEl.value === 'female';

    if (isNaN(age) || isNaN(weight) || isNaN(scr) || age <= 0 || weight <= 0 || scr <= 0) return;

    // Cockcroft-Gault equation:
    // CrCl = ( (140 - Age) * Weight ) / ( 72 * Scr ) * (0.85 if female)  [mL / min]
    let CrCl = ((140.0 - age) * weight) / (72.0 * scr);
    if (isFemale) CrCl *= 0.85;

    let stage = '';
    let color = '#22543d';

    if (CrCl >= 90.0) {
      stage = 'NORMAL / STAGE 1 (CrCl ≥ 90 mL/min: Normal renal function, standard drug dosing)';
      color = '#22543d';
    } else if (CrCl >= 60.0) {
      stage = 'MILD RENAL IMPAIRMENT / STAGE 2 (60 - 89 mL/min: Minor clearance decline)';
      color = '#22543d';
    } else if (CrCl >= 30.0) {
      stage = 'MODERATE IMPAIRMENT / STAGE 3 (30 - 59 mL/min: Reduce dose/extend interval for aminoglycosides/vancomycin)';
      color = '#d97706';
    } else if (CrCl >= 15.0) {
      stage = 'SEVERE IMPAIRMENT / STAGE 4 (15 - 29 mL/min: Strict therapeutic drug monitoring required)';
      color = '#ea580c';
    } else {
      stage = 'END-STAGE RENAL DISEASE / STAGE 5 (CrCl < 15 mL/min: Dialysis indicated)';
      color = '#c53030';
    }

    clResEl.textContent = 'CrCl = ' + CrCl.toFixed(1) + ' mL/min';
    clResEl.style.color = color;
    ckdResEl.textContent = stage;
    ckdResEl.style.color = color;
  }

  [agEl, wtEl, scrEl].forEach(el => el.addEventListener('input', update));
  sxEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter patient age in years.',
      'Enter patient total body weight in kilograms.',
      'Enter serum creatinine concentration $S_{cr}$ in mg/dL from lab blood work.',
      'Select patient biological sex (females have $\sim 15\%$ less muscle mass, requiring a $0.85$ factor).',
      'Inspect estimated Creatinine Clearance ($CrCl$) in mL/min for antibiotic and chemotherapy dose adjustments.'
    ],
    benefitTitle: 'Donald W. Cockcroft & M. Henry Gault 1976 Renal Metric',
    benefitContent: 'FDA drug labeling mandates Cockcroft-Gault Creatinine Clearance for pharmacokinetic dosing adjustments of renally excreted medications (Vancomycin, Gentamicin, Enoxaparin, Novel Oral Anticoagulants NOACs) to avoid lethal drug toxicity.',
    faqs: [{ q: 'Why is female CrCl multiplied by 0.85?', a: 'Because women have on average 15% less endogenous muscle mass per unit body weight than men, producing less daily metabolic creatinine.' }]
  },

  // 4. Body Surface Area (Mosteller & Du Bois BSA) Oncology Calculator
  {
    slug: 'body-surface-area-mosteller-du-bois-bsa-calculator',
    name: 'Body Surface Area (Mosteller & Du Bois BSA) Chemotherapy Dosing Calculator',
    description: 'Calculate patient Body Surface Area (Mosteller BSA = √[(Height in cm · Weight in kg) / 3600]) in m² for precision oncology chemotherapy dosing, cardiac index, and burn Parkland resuscitation.',
    category: 'Health',
    icon: 'calculator',
    keywords: ['body surface area calculator', 'mosteller bsa formula sqrt height times weight over 3600 online', 'chemotherapy drug dosing bsa calculator', 'du bois body surface area square meters calculator', 'cardiac index bsa medical calculator online'],
    order: 910,
    schemaCategory: 'MedicalWebPage',
    workspaceHeading: 'Height (cm or inches) & Body Weight (kg or lbs)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bsa-ht">Height (cm)</label>
          <input class="tool-textarea" id="bsa-ht" type="number" step="1" value="175" placeholder="175 cm (5 ft 9 in)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bsa-wt">Weight (kg)</label>
          <input class="tool-textarea" id="bsa-wt" type="number" step="1" value="70.0" placeholder="70.0 kg (154 lbs)" />
        </div>
      </div>
      <div id="bsa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bsa-res-most" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BSA = 1.84 m² (Mosteller)</span>
            <span class="stat-label">Mosteller Simplified Body Surface Area (m²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bsa-res-dubois" style="font-weight:700;">Du Bois BSA = 1.85 m² (Typical Adult Average: 1.7 - 1.9 m²)</span>
            <span class="stat-label">Du Bois & Du Bois Comparison & Standard Norm</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const htEl = document.getElementById('bsa-ht'), wtEl = document.getElementById('bsa-wt');
  const mstResEl = document.getElementById('bsa-res-most'), dbResEl = document.getElementById('bsa-res-dubois');

  function update() {
    const ht_cm = parseFloat(htEl.value), wt_kg = parseFloat(wtEl.value);
    if (isNaN(ht_cm) || isNaN(wt_kg) || ht_cm <= 0 || wt_kg <= 0) return;

    // Mosteller formula: BSA = sqrt( (Height * Weight) / 3600 )  [m^2]
    const bsa_mosteller = Math.sqrt((ht_cm * wt_kg) / 3600.0);

    // Du Bois & Du Bois formula: BSA = 0.007184 * (Height^0.725) * (Weight^0.425)  [m^2]
    const bsa_dubois = 0.007184 * Math.pow(ht_cm, 0.725) * Math.pow(wt_kg, 0.425);

    mstResEl.textContent = 'BSA = ' + bsa_mosteller.toFixed(2) + ' m² (Mosteller)';
    dbResEl.textContent = 'Du Bois BSA = ' + bsa_dubois.toFixed(2) + ' m² | Chemotherapy Index @ ' + ht_cm + ' cm, ' + wt_kg + ' kg';
  }

  htEl.addEventListener('input', update);
  wtEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter patient height in centimeters (cm).',
      'Enter patient weight in kilograms (kg).',
      'Inspect calculated Body Surface Area (BSA) in square meters ($m^2$) for oncology chemotherapy regimens (e.g. $mg/m^2$).'
    ],
    benefitTitle: 'Clinical Oncology & Hemodynamic Normalization Standard',
    benefitContent: 'Basal metabolic rate and cardiac output correlate closer with Body Surface Area ($BSA$) than raw body weight; Mosteller\'s formula ($BSA = \sqrt{\frac{Ht \times Wt}{3600}}$) is universally used to calculate narrow-therapeutic-index chemotherapy protocols (Cisplatin, Doxorubicin).',
    faqs: [{ q: 'What is the average BSA for adult men and women?', a: 'The average adult male BSA is approximately $1.9\text{ m}^2$, while the average adult female BSA is approximately $1.6\text{ m}^2$.' }]
  },

  // 5. Mean Arterial Pressure (MAP) Cardiovascular Perfusion Calculator
  {
    slug: 'mean-arterial-pressure-map-cardiovascular-perfusion-calculator',
    name: 'Mean Arterial Pressure (MAP = DBP + ⅓(SBP - DBP)) Perfusion Calculator',
    description: 'Calculate average systemic organ perfusion pressure Mean Arterial Pressure (MAP = DBP + ⅓ · (SBP - DBP)) in mmHg from systolic and diastolic blood pressure and evaluate vital organ perfusion thresholds (MAP ≥ 65 mmHg).',
    category: 'Health',
    icon: 'calculator',
    keywords: ['mean arterial pressure calculator', 'map formula dbp plus one third pulse pressure online', 'icu vital organ perfusion map 65 mmhg calculator', 'systolic diastolic blood pressure map calculator', 'nursing hemodynamics mean arterial pressure online'],
    order: 911,
    schemaCategory: 'MedicalWebPage',
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
            <span class="stat-value" id="map-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">MAP = 93.3 mmHg</span>
            <span class="stat-label">Mean Arterial Pressure (MAP = DBP + ⅓·PP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="map-res-perf" style="color:var(--green-dark); font-weight:700;">NORMAL PERFUSION (MAP 70-100 mmHg): Kidneys, brain, and coronary arteries adequately perfused</span>
            <span class="stat-label">Organ Perfusion Status & Pulse Pressure = 40 mmHg</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sbpEl = document.getElementById('map-sbp'), dbpEl = document.getElementById('map-dbp');
  const mapResEl = document.getElementById('map-res-val'), pfResEl = document.getElementById('map-res-perf');

  function update() {
    const SBP = parseFloat(sbpEl.value), DBP = parseFloat(dbpEl.value);
    if (isNaN(SBP) || isNaN(DBP) || SBP <= DBP || DBP <= 0) return;

    // Pulse Pressure PP = SBP - DBP
    const PP = SBP - DBP;

    // Mean Arterial Pressure MAP = DBP + (1/3) * PP  [mmHg]
    const MAP = DBP + (PP / 3.0);

    let status = '';
    let color = '#22543d';

    if (MAP < 60.0) {
      status = 'HYPOPERFUSION / SHOCK RISK (MAP < 60 mmHg: Ischemic risk to kidneys and brain! Vasopressors/fluids indicated)';
      color = '#c53030';
    } else if (MAP < 65.0) {
      status = 'BORDERLINE LOW (MAP 60 - 64 mmHg: Close monitoring required)';
      color = '#d97706';
    } else if (MAP <= 100.0) {
      status = 'ADEQUATE CLINICAL PERFUSION (MAP 65 - 100 mmHg: Optimal hemodynamic target in ICU/Surviving Sepsis guidelines)';
      color = '#22543d';
    } else {
      status = 'ELEVATED / HYPERTENSION (MAP > 100 mmHg: Increased myocardial workload)';
      color = '#d97706';
    }

    mapResEl.textContent = 'MAP = ' + MAP.toFixed(1) + ' mmHg';
    mapResEl.style.color = color;
    pfResEl.textContent = status + ' | Pulse Pressure = ' + PP + ' mmHg (SBP ' + SBP + ' / DBP ' + DBP + ')';
    pfResEl.style.color = color;
  }

  sbpEl.addEventListener('input', update);
  dbpEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter Systolic Blood Pressure (SBP) in mmHg.',
      'Enter Diastolic Blood Pressure (DBP) in mmHg.',
      'Inspect Mean Arterial Pressure (MAP) in mmHg and check critical organ perfusion status ($MAP \ge 65\text{ mmHg}$).'
    ],
    benefitTitle: 'ICU Critical Care Perfusion Metric',
    benefitContent: 'Because the heart spends approximately two-thirds of the cardiac cycle in diastole and one-third in systole ($MAP = DBP + \frac{1}{3}PP$), MAP provides a much more accurate physiological measure of capillary organ blood flow than systolic pressure alone.',
    faqs: [{ q: 'Why is MAP >= 65 mmHg the standard clinical goal in sepsis?', a: 'Surviving Sepsis Campaign clinical trials demonstrate that maintaining $MAP \ge 65\text{ mmHg}$ prevents acute tubular necrosis kidney injury and cerebral hypoperfusion.' }]
  },

  // 6. Hemocytometer Cell Counting & Trypan Blue Viability Calculator
  {
    slug: 'hemocytometer-cell-counting-viability-trypan-blue-calculator',
    name: 'Hemocytometer Cell Counting & Trypan Blue Viability (% = Live / Total) Calculator',
    description: 'Calculate tissue culture cell concentration in cells/mL (Total = (Live Cells / Squares Counted) · 10⁴ · Dilution Factor) and percentage viability (% = [Live / (Live + Dead)] · 100) from hemocytometer grid counts.',
    category: 'Science',
    icon: 'text',
    keywords: ['hemocytometer calculator', 'cell counting formula live cells over squares counted times 10 to the 4th online', 'trypan blue cell viability percentage calculator', 'tissue culture cell density dilution factor calculator', 'biotech lab hemocytometer cell count online'],
    order: 912,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Live Cells Counted, Dead Blue Cells Counted, Number of 1mm² Large Squares (1-4) & Dilution Factor',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hemo-live">Live Cells</label>
          <input class="tool-textarea" id="hemo-live" type="number" step="1" value="180" placeholder="180 (Clear)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hemo-dead">Dead Cells</label>
          <input class="tool-textarea" id="hemo-dead" type="number" step="1" value="20" placeholder="20 (Blue)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hemo-sq">Squares Counted</label>
          <input class="tool-textarea" id="hemo-sq" type="number" step="1" min="1" max="9" value="4" placeholder="4 Large Corner Squares" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hemo-dil">Dilution Factor</label>
          <input class="tool-textarea" id="hemo-dil" type="number" step="1" value="2" placeholder="2 (1:1 with Trypan Blue)" />
        </div>
      </div>
      <div id="hemo-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hemo-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">9.00 × 10⁵ Live Cells / mL</span>
            <span class="stat-label">Viable Cell Concentration in Stock Solution</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hemo-res-viab" style="color:var(--green-dark); font-weight:700;">Cell Viability = 90.0% (180 Live / 200 Total Cells: Excellent for Seeding)</span>
            <span class="stat-label">Trypan Blue Membrane Exclusion Viability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('hemo-live'), dEl = document.getElementById('hemo-dead');
  const sEl = document.getElementById('hemo-sq'), dilEl = document.getElementById('hemo-dil');
  const concResEl = document.getElementById('hemo-res-conc'), viabResEl = document.getElementById('hemo-res-viab');

  function update() {
    const live = parseFloat(lEl.value) || 0, dead = parseFloat(dEl.value) || 0;
    const squares = parseFloat(sEl.value) || 1, dilution = parseFloat(dilEl.value) || 1;

    const totalCounted = live + dead;
    if (totalCounted <= 0 || squares <= 0) return;

    // Viability percentage = ( Live / Total ) * 100
    const viability = (live / totalCounted) * 100.0;

    // Hemocytometer volume per 1 mm^2 large square = 0.1 mm^3 = 10^-4 mL
    // Concentration = ( Live / squares ) * 10^4 * Dilution  [cells / mL]
    const conc_live = (live / squares) * 1e4 * dilution;

    let qual = '';
    let color = '#22543d';

    if (viability >= 90.0) {
      qual = 'EXCELLENT VIABILITY (≥ 90%: Optimal for experimental passaging & transfection)';
      color = '#22543d';
    } else if (viability >= 80.0) {
      qual = 'ACCEPTABLE VIABILITY (80 - 89%: Healthy culture)';
      color = '#2563eb';
    } else {
      qual = 'POOR VIABILITY (< 80%: High apoptosis/necrosis, media replenishment recommended)';
      color = '#c53030';
    }

    concResEl.textContent = conc_live.toExponential(2) + ' Live Cells / mL';
    concResEl.style.color = color;
    viabResEl.textContent = 'Viability = ' + viability.toFixed(1) + '% (' + live + ' Live / ' + totalCounted + ' Total across ' + squares + ' Squares | ' + qual.split(' (')[0] + ')';
    viabResEl.style.color = color;
  }

  [lEl, dEl, sEl, dilEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter number of viable live cells counted (unstained clear cells).',
      'Enter number of non-viable dead cells counted (blue stained cells taking up dye).',
      'Enter total number of 1 mm² large corner squares counted (typically 4 squares).',
      'Enter sample dilution factor (e.g. 2 for 1:1 cell suspension to Trypan Blue dye).',
      'Inspect stock cell concentration in $\text{cells/mL}$ and percentage viability.'
    ],
    benefitTitle: 'Cell Culture Hemocytometer Volume Calibration',
    benefitContent: 'A Neubauer hemocytometer chamber has a precise depth of $0.1\text{ mm}$, meaning each $1\text{ mm} \times 1\text{ mm}$ grid square contains exactly $0.1\text{ mm}^3 = 10^{-4}\text{ mL}$; multiplying average cell counts by $10^4$ gives standard cells/mL.',
    faqs: [{ q: 'How does Trypan Blue dye work for viability?', a: 'Intact live cell membranes exclude the dye, while damaged/dead permeable cell membranes allow Trypan Blue to enter and stain the cytoplasm blue.' }]
  },

  // 7. Microbiology Serial Dilution & Colony Forming Units (CFU/mL) Calculator
  {
    slug: 'microbiology-serial-dilution-colony-forming-units-cfu-calculator',
    name: 'Microbiology Serial Dilution & Colony Forming Units (CFU/mL) Calculator',
    description: 'Calculate bacterial sample concentration in Colony Forming Units per mL (CFU/mL = (Number of Colonies / Volume Plated in mL) · Dilution Factor) and select valid plate count ranges (30 to 300 colonies).',
    category: 'Science',
    icon: 'text',
    keywords: ['cfu calculator', 'colony forming units formula cfu per ml online', 'microbiology serial dilution calculator 30 to 300 colonies', 'viable bacterial plate count cfu calculator', 'agar plate bacterial density dilution calculator'],
    order: 913,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Colony Count (e.g. 156), Plated Inoculum Volume (mL, e.g. 0.1 mL) & Dilution Factor (e.g. 10⁴)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cfu-cnt">Colony Count</label>
          <input class="tool-textarea" id="cfu-cnt" type="number" step="1" value="142" placeholder="142 Colonies" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfu-vol">Volume (mL)</label>
          <input class="tool-textarea" id="cfu-vol" type="number" step="any" value="0.10" placeholder="0.10 mL (100 μL)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfu-dil">Dilution (10^x)</label>
          <input class="tool-textarea" id="cfu-dil" type="number" step="1" value="4" placeholder="4 (1:10,000 = 10⁴)" />
        </div>
      </div>
      <div id="cfu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cfu-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.42 × 10⁷ CFU / mL</span>
            <span class="stat-label">Bacterial Concentration in Original Sample</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cfu-res-stat" style="color:var(--green-dark); font-weight:700;">STATISTICALLY VALID (30 - 300 Colonies): Ideal countable range for standard agar plate assay</span>
            <span class="stat-label">Plate Count Validity Status (TFTC vs TNTC)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('cfu-cnt'), vEl = document.getElementById('cfu-vol'), dEl = document.getElementById('cfu-dil');
  const valResEl = document.getElementById('cfu-res-val'), stResEl = document.getElementById('cfu-res-stat');

  function update() {
    const count = parseFloat(cEl.value), vol = parseFloat(vEl.value), dilExponent = parseFloat(dEl.value);
    if (isNaN(count) || isNaN(vol) || isNaN(dilExponent) || count < 0 || vol <= 0) return;

    const dilutionFactor = Math.pow(10, dilExponent);

    // CFU / mL = ( Count / Volume in mL ) * Dilution Factor
    const cfu_per_ml = (count / vol) * dilutionFactor;

    let status = '';
    let color = '#22543d';

    if (count < 30) {
      status = 'TOO FEW TO COUNT (TFTC: Count < 30 introduces high statistical sampling error)';
      color = '#d97706';
    } else if (count <= 300) {
      status = 'STATISTICALLY VALID (30 - 300 Count Range: Standard USP / FDA microbial limit threshold)';
      color = '#22543d';
    } else {
      status = 'TOO NUMEROUS TO COUNT (TNTC: Count > 300 leads to colony crowding & undercounting)';
      color = '#c53030';
    }

    valResEl.textContent = cfu_per_ml.toExponential(2) + ' CFU / mL';
    valResEl.style.color = color;
    stResEl.textContent = status + ' | ' + count + ' Colonies on ' + vol + ' mL @ 10^' + dilExponent + ' Dilution';
    stResEl.style.color = color;
  }

  [cEl, vEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter number of distinct visible bacterial/yeast colonies counted on the agar plate.',
      'Enter volume of liquid sample spread or pour plated in milliliters (e.g. 0.1 mL for 100 $\mu\text{L}$).',
      'Enter 10-fold serial dilution exponent factor (e.g. 4 for a $10^{-4} = 1:10,000$ dilution tube).',
      'Inspect original stock viable microbial density in CFU/mL and check countable plate validity ($30\text{ to }300\text{ colonies}$).'
    ],
    benefitTitle: 'Microbiological Quantitative Plate Count Standard',
    benefitContent: 'In pharmaceutical quality control and food safety testing, serial dilutions reduce dense bacterial suspensions to the statistically robust $30\text{ to }300$ colony range, ensuring accurate calculation of viable microbial bioburden.',
    faqs: [{ q: 'Why are plates with fewer than 30 colonies rejected?', a: 'Counts below 30 have high Poisson random sampling variability ($\pm 20\%+$ error); counts above 300 suffer from nutrient competition where separate colonies merge.' }]
  },

  // 8. PCR Primer Melting Temperature (Tm Wallace Rule & Nearest Neighbor) Calculator
  {
    slug: 'pcr-primer-melting-temperature-tm-wallace-nearest-neighbor-calculator',
    name: 'PCR Primer Melting Temperature (Tm) & Annealing Temperature (Ta) Calculator',
    description: 'Calculate molecular biology DNA oligonucleotide PCR primer melting temperature using Wallace Rule (Tm = 2·(A+T) + 4·(G+C)) and nearest-neighbor thermodynamics, and determine optimal PCR annealing temperature (Ta = Tm - 5°C).',
    category: 'Science',
    icon: 'text',
    keywords: ['pcr primer tm calculator', 'primer melting temperature formula 2 at plus 4 gc online', 'optimal pcr annealing temperature ta calculator', 'dna primer gc content percentage calculator', 'molecular biology pcr primer design online'],
    order: 914,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '5\' to 3\' DNA Primer Sequence (A, T, G, C)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="pcr-seq">Primer Sequence (5\' -> 3\')</label>
        <input class="tool-textarea" id="pcr-seq" type="text" value="GCTAGCTAGCTAGCTA" placeholder="e.g. ATGCGATCGATCGATC" />
      </div>
      <div id="pcr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pcr-res-tm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Tm = 48.0 °C (Wallace)</span>
            <span class="stat-label">Primer Melting Temperature (Tm)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pcr-res-ta" style="color:var(--green-dark); font-weight:700;">Optimal Annealing Ta = 43.0 °C (Length: 16 bp | GC Content: 50.0%)</span>
            <span class="stat-label">Recommended Thermocycler Annealing Temperature & GC%</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const seqEl = document.getElementById('pcr-seq');
  const tmResEl = document.getElementById('pcr-res-tm'), taResEl = document.getElementById('pcr-res-ta');

  function update() {
    const rawSeq = (seqEl.value || '').toUpperCase().replace(/[^ATGC]/g, '');
    if (!rawSeq || rawSeq.length === 0) return;

    let countA = 0, countT = 0, countG = 0, countC = 0;
    for (let char of rawSeq) {
      if (char === 'A') countA++;
      else if (char === 'T') countT++;
      else if (char === 'G') countG++;
      else if (char === 'C') countC++;
    }

    const totalLen = rawSeq.length;
    const gcCount = countG + countC;
    const atCount = countA + countT;
    const gc_pct = (gcCount / totalLen) * 100.0;

    let Tm = 0;
    if (totalLen <= 14) {
      // Wallace Rule for short oligo <= 14 bp: Tm = 2*(A+T) + 4*(G+C)
      Tm = (2.0 * atCount) + (4.0 * gcCount);
    } else {
      // SantaLucia / Marmur-Doty empirical formula for longer primers:
      // Tm = 64.9 + 41 * (gcCount - 16.4) / totalLen
      Tm = 64.9 + (41.0 * (gcCount - 16.4) / totalLen);
    }

    // Optimal annealing temperature Ta approx = Tm - 5 deg C
    const Ta = Tm - 5.0;

    let status = '';
    let color = '#22543d';

    if (gc_pct >= 40.0 && gc_pct <= 60.0 && totalLen >= 18 && totalLen <= 24) {
      status = 'OPTIMAL PRIMER DESIGN (18-24 bp, 40-60% GC Content: Strong specific binding)';
      color = '#22543d';
    } else if (totalLen < 18) {
      status = 'SHORT PRIMER (< 18 bp: Risk of non-specific annealing in genome)';
      color = '#d97706';
    } else {
      status = 'ACCEPTABLE (Check for primer-dimers or secondary hairpin loops)';
      color = '#2563eb';
    }

    tmResEl.textContent = 'Tm = ' + Tm.toFixed(1) + ' °C';
    tmResEl.style.color = color;
    taResEl.textContent = 'Optimal Annealing Ta = ' + Ta.toFixed(1) + ' °C (Length: ' + totalLen + ' bp | GC: ' + gc_pct.toFixed(1) + '% | ' + status.split(' (')[0] + ')';
    taResEl.style.color = color;
  }

  seqEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter single-stranded DNA PCR primer sequence (5\' to 3\').',
      'Inspect calculated primer melting temperature ($T_m$), nucleotide length, and GC percentage.',
      'View recommended PCR thermocycler annealing step temperature ($T_a = T_m - 5^\circ\text{C}$).'
    ],
    benefitTitle: 'Molecular Biology PCR Primer Design Guidelines',
    benefitContent: 'Setting the PCR annealing temperature too high prevents primers from binding to the template DNA ($T_a > T_m$), while setting it too low causes non-specific primer binding and secondary band amplification; matching primer pair melting temperatures within $1\text{–}2^\circ\text{C}$ guarantees clean single-band amplification.',
    faqs: [{ q: 'Why do G-C pairs contribute more to melting temperature than A-T pairs?', a: 'G-C pairs form 3 hydrogen bonds with stronger stacking interactions, whereas A-T pairs form only 2 hydrogen bonds.' }]
  },

  // 9. Spectrophotometry Beer-Lambert Molar Extinction Coefficient Calculator
  {
    slug: 'spectrophotometry-beer-lambert-molar-extinction-calculator',
    name: 'Spectrophotometry Beer-Lambert Law Concentration (A = ε·b·c) Calculator',
    description: 'Calculate unknown solution molar concentration (c = A / (ε · b)) in μM/mM and percentage optical transmittance (%T = 10^(-A) · 100) from UV-Vis spectrophotometer absorbance A, molar absorptivity ε, and cuvette path length b.',
    category: 'Science',
    icon: 'text',
    keywords: ['beer lambert law calculator', 'absorbance to concentration formula a equals epsilon b c online', 'spectrophotometry molar extinction coefficient calculator', 'absorbance to percent transmittance converter online', 'uv vis spectrophotometer concentration calculator'],
    order: 915,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Absorbance A (0 to 2.5), Molar Absorptivity ε (L/(mol·cm)) & Path Length b (cm, default 1.0 cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="beer-abs">Absorbance (A)</label>
          <input class="tool-textarea" id="beer-abs" type="number" step="0.05" value="0.650" placeholder="0.650 (OD)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="beer-eps">Extinction ε</label>
          <input class="tool-textarea" id="beer-eps" type="number" step="1000" value="14500" placeholder="14,500 L/(mol·cm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="beer-b">Path Length b (cm)</label>
          <input class="tool-textarea" id="beer-b" type="number" step="0.1" value="1.0" placeholder="1.0 cm (Standard Cuvette)" />
        </div>
      </div>
      <div id="beer-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="beer-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">c = 44.83 μM (4.48 × 10⁻⁵ M)</span>
            <span class="stat-label">Calculated Molar Concentration (c = A / (ε·b))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="beer-res-trans" style="color:var(--green-dark); font-weight:700;">Transmittance %T = 22.4% (Linear Dynamic Range: 0.1 < A < 1.5 Satisfied)</span>
            <span class="stat-label">Percentage Optical Transmittance & Dynamic Linearity Range</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('beer-abs'), epsEl = document.getElementById('beer-eps'), bEl = document.getElementById('beer-b');
  const cResEl = document.getElementById('beer-res-conc'), trResEl = document.getElementById('beer-res-trans');

  function update() {
    const A = parseFloat(aEl.value), eps = parseFloat(epsEl.value), b = parseFloat(bEl.value);
    if (isNaN(A) || isNaN(eps) || isNaN(b) || A < 0 || eps <= 0 || b <= 0) return;

    // Concentration c = A / ( eps * b )  [mol / L]
    const c_M = A / (eps * b);
    const c_uM = c_M * 1e6;
    const c_mM = c_M * 1e3;

    // Transmittance %T = 10^(-A) * 100
    const Trans_pct = Math.pow(10, -A) * 100.0;

    let rangeStatus = '';
    let color = '#22543d';

    if (A >= 0.1 && A <= 1.5) {
      rangeStatus = 'OPTIMAL LINEAR BEER-LAMBERT RANGE (0.1 ≤ A ≤ 1.5: High detector photometric accuracy)';
      color = '#22543d';
    } else if (A > 1.5) {
      rangeStatus = 'NON-LINEAR REGIME (A > 1.5: Stray light saturation causes severe underestimation; dilute sample!)';
      color = '#c53030';
    } else {
      rangeStatus = 'LOW ABSORBANCE (A < 0.1: Near detector noise floor; increase concentration or path length)';
      color = '#d97706';
    }

    cResEl.textContent = 'c = ' + (c_uM < 1000 ? c_uM.toFixed(2) + ' μM' : c_mM.toFixed(3) + ' mM') + ' (' + c_M.toExponential(2) + ' M)';
    cResEl.style.color = color;
    trResEl.textContent = 'Transmittance %T = ' + Trans_pct.toFixed(1) + '% | ' + rangeStatus;
    trResEl.style.color = color;
  }

  [aEl, epsEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter spectrophotometer optical density / absorbance reading A at peak wavelength $\lambda_{\max}$.',
      'Enter substance molar extinction coefficient $\varepsilon$ in $\text{L}/(\text{mol}\cdot\text{cm})$.',
      'Enter quartz/plastic cuvette optical path length b in cm (standard is 1.0 cm).',
      'Inspect solution concentration in $\mu\text{M}$ / mM and verify that absorbance lies within the linear dynamic range ($0.1 \le A \le 1.5$).'
    ],
    benefitTitle: 'August Beer & Johann Heinrich Lambert Spectrophotometric Law',
    benefitContent: 'Absorbance is directly proportional to concentration ($A = \varepsilon b c$); quantifying protein concentrations (NanoDrop $A_{280}$), nucleic acids ($A_{260}$), and chemical dye solutions forms the backbone of quantitative analytical chemistry.',
    faqs: [{ q: 'Why do absorbance readings above A = 2.0 become inaccurate?', a: 'At $A = 2.0$, only 1% of light is transmitted; detector stray light and electronic noise dominate, causing non-linear deviation from Beer\'s law.' }]
  },

  // 10. Radiocarbon C-14 Archaeological Dating Half-Life Decay Calculator
  {
    slug: 'radiocarbon-c14-dating-half-life-decay-calculator',
    name: 'Radiocarbon C-14 Archaeological Dating & Radioisotope Decay Calculator',
    description: 'Calculate organic archaeological artifact age (t = (t_½ / ln 2) · ln(N₀ / N_t)) in years Before Present (BP) from residual Carbon-14 activity (% Modern Carbon pMC) using the Libby half-life (t_½ = 5,730 years).',
    category: 'Science',
    icon: 'text',
    keywords: ['radiocarbon dating calculator', 'carbon 14 dating formula t equals t half over ln 2 ln n0 over nt online', 'c14 half life 5730 years archaeological age calculator', 'percent modern carbon pmc to age in years bp calculator', 'radioactive decay dating carbon 14 online'],
    order: 916,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Residual Carbon-14 Fraction (% Modern Carbon pMC, e.g. 25.0%) & Half-Life (5,730 Years)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="c14-pmc">% Modern Carbon</label>
          <input class="tool-textarea" id="c14-pmc" type="number" step="1" min="0.01" max="100" value="25.0" placeholder="25.0% (2 Half-Lives)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="c14-thalf">Half-Life t_½ (Years)</label>
          <input class="tool-textarea" id="c14-thalf" type="number" step="10" value="5730" placeholder="5730 Years (Libby)" />
        </div>
      </div>
      <div id="c14-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="c14-res-age" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Age = 11,460 Years BP</span>
            <span class="stat-label">Calculated Radiocarbon Age (Years Before Present)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="c14-res-era" style="color:var(--green-dark); font-weight:700;">ARCHAEOLOGICAL ERA: Late Upper Paleolithic / Younger Dryas (~9460 BCE)</span>
            <span class="stat-label">Historical Period & Calendar Year Calibration</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pmcEl = document.getElementById('c14-pmc'), thEl = document.getElementById('c14-thalf');
  const ageResEl = document.getElementById('c14-res-age'), eraResEl = document.getElementById('c14-res-era');

  function update() {
    const pMC = parseFloat(pmcEl.value), t_half = parseFloat(thEl.value);
    if (isNaN(pMC) || isNaN(t_half) || pMC <= 0 || pMC > 100 || t_half <= 0) return;

    // Decay formula: N(t) / N0 = pMC / 100 = exp( - (ln 2 / t_half) * t )
    // t = ( t_half / ln 2 ) * ln( 100 / pMC )
    const age_years_BP = (t_half / Math.LN2) * Math.log(100.0 / pMC);
    const calendar_year_BCE = Math.round(age_years_BP - 1950);

    let era = '';
    let color = '#22543d';

    if (age_years_BP <= 500) {
      era = 'MODERN / HISTORIC ERA (~1450 - 1950 CE: Post-Medieval artifacts)';
      color = '#22543d';
    } else if (age_years_BP <= 2500) {
      era = 'CLASSICAL ANTIQUITY / IRON AGE (~550 BCE: Ancient Greece, Rome, Vedic India)';
      color = '#22543d';
    } else if (age_years_BP <= 5000) {
      era = 'BRONZE AGE / EARLY DYNASTIC (~3000 BCE: Egyptian Pyramids, Indus Valley Civilization)';
      color = '#22543d';
    } else if (age_years_BP <= 12000) {
      era = 'NEOLITHIC / MESOLITHIC (~10,000 BCE: Dawn of Agriculture & Göbekli Tepe)';
      color = '#2563eb';
    } else if (age_years_BP <= 50000) {
      era = 'UPPER PALEOLITHIC (Cave Paintings & Neanderthal Coexistence)';
      color = '#d97706';
    } else {
      era = 'BEYOND RADIOCARBON LIMIT (> 50,000 Years BP: Requires Potassium-Argon / Uranium-Thorium dating)';
      color = '#c53030';
    }

    ageResEl.textContent = 'Age = ' + Math.round(age_years_BP).toLocaleString() + ' Years BP';
    ageResEl.style.color = color;
    eraResEl.textContent = 'Cal Year: ~' + (calendar_year_BCE > 0 ? calendar_year_BCE.toLocaleString() + ' BCE' : Math.abs(calendar_year_BCE) + ' CE') + ' | ' + era;
    eraResEl.style.color = color;
  }

  pmcEl.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter residual Carbon-14 fraction as Percent Modern Carbon (pMC, e.g. 50% for 1 half-life, 25% for 2 half-lives).',
      'Enter Carbon-14 radioactive half-life in years (Libby standard is 5,730 years).',
      'Inspect radiocarbon age in Years Before Present (BP) and calibrated calendar era (BCE/CE).'
    ],
    benefitTitle: 'Willard Libby 1960 Nobel Prize in Radiocarbon Dating',
    benefitContent: 'Living organisms constantly absorb atmospheric Carbon-14; upon death, C-14 decays exponentially ($t_{1/2} = 5,730\text{ years}$), providing an unforgeable atomic clock for dating ancient Egyptian pharaohs, prehistoric cave art, and archaeological fossils up to 50,000 years old.',
    faqs: [{ q: 'What does "BP" mean in archaeological dating?', a: '"Before Present" (BP) is the standard international radiocarbon timescale referenced to the origin year 1950 CE (before atmospheric nuclear testing altered natural C-14 levels).' }]
  },

  // 11. Organic Chemistry NMR Splitting (N+1 Multiplicity Rule) Calculator
  {
    slug: 'organic-chemistry-nmr-chemical-shift-splitting-n-plus-1-calculator',
    name: 'Organic Chemistry ¹H-NMR Splitting (N + 1 Multiplicity Rule) Calculator',
    description: 'Calculate 1H-NMR proton coupling multiplet splitting patterns (Singlet, Doublet, Triplet, Quartet, Multiplet = N + 1 peaks) and relative peak area Pascal triangle intensity ratios from neighboring hydrogen proton counts N.',
    category: 'Science',
    icon: 'text',
    keywords: ['nmr splitting calculator', 'n plus 1 rule proton nmr formula online', 'pascal triangle nmr multiplet intensity calculator', '1h nmr chemical shift coupling constant j calculator', 'organic chemistry spectroscopy nmr splitting online'],
    order: 917,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Neighboring Protons N (0, 1, 2, 3, 4, 5, 6) & Chemical Shift δ (ppm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nmr-n">Neighboring Protons (N)</label>
          <input class="tool-textarea" id="nmr-n" type="number" step="1" min="0" max="10" value="3" placeholder="3 (e.g. -CH₃ Neighbor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nmr-shift">Shift δ (ppm)</label>
          <input class="tool-textarea" id="nmr-shift" type="number" step="0.1" value="4.1" placeholder="4.1 ppm (-O-CH₂-)" />
        </div>
      </div>
      <div id="nmr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nmr-res-mult" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">QUARTET (4 Peaks)</span>
            <span class="stat-label">¹H-NMR Multiplet Pattern (Multiplicity = N + 1)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nmr-res-ratio" style="color:var(--green-dark); font-weight:700;">Pascal Ratio: 1 : 3 : 3 : 1 | Ethyl Group Signature (-CH₂-CH₃ coupled)</span>
            <span class="stat-label">Peak Intensity Ratios & Typical Molecular Substructure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('nmr-n'), shEl = document.getElementById('nmr-shift');
  const mResEl = document.getElementById('nmr-res-mult'), rResEl = document.getElementById('nmr-res-ratio');

  const NAMES = ['Singlet', 'Doublet', 'Triplet', 'Quartet', 'Quintet', 'Sextet', 'Septet', 'Octet', 'Nonet'];
  const PASCAL = [
    '1',
    '1 : 1',
    '1 : 2 : 1',
    '1 : 3 : 3 : 1',
    '1 : 4 : 6 : 4 : 1',
    '1 : 5 : 10 : 10 : 5 : 1',
    '1 : 6 : 15 : 20 : 15 : 6 : 1',
    '1 : 7 : 21 : 35 : 35 : 21 : 7 : 1'
  ];

  function update() {
    const N = parseInt(nEl.value, 10);
    const shift = parseFloat(shEl.value) || 0;

    if (isNaN(N) || N < 0) return;

    const peaks = N + 1;
    const name = (N < NAMES.length) ? NAMES[N] : (N + 1) + '-Multiplet';
    const ratio = (N < PASCAL.length) ? PASCAL[N] : 'Binomial Coefficients';

    let substructure = '';
    if (N === 0) substructure = 'Isolated proton (e.g. -OCH₃, -C(CH₃)₃ t-butyl singlet, aromatic)';
    else if (N === 1) substructure = 'Coupled to 1 adjacent CH proton (e.g. Isopropyl -CH(CH₃)₂ doublet)';
    else if (N === 2) substructure = 'Coupled to adjacent -CH₂- methylene group (e.g. -CH₂-CH₃ triplet)';
    else if (N === 3) substructure = 'Coupled to adjacent -CH₃ methyl group (e.g. -O-CH₂-CH₃ quartet @ δ = ' + shift + ' ppm)';
    else if (N === 6) substructure = 'Coupled to 2 equivalent methyl groups (e.g. Isopropyl -CH(CH₃)₂ septet)';
    else substructure = 'Complex alkyl chain multiplet';

    mResEl.textContent = name.toUpperCase() + ' (' + peaks + ' Peaks)';
    rResEl.textContent = 'Ratio: ' + ratio + ' | ' + substructure;
  }

  nEl.addEventListener('input', update);
  shEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter number of non-equivalent neighboring protons N on adjacent vicinal carbon atoms.',
      'Enter chemical shift $\delta$ in ppm.',
      'Inspect resulting 1H-NMR multiplet splitting classification ($N+1$ rule) and Pascal triangle peak area ratios.'
    ],
    benefitTitle: 'Proton Spin-Spin J-Coupling in Organic Chemistry',
    benefitContent: 'Nuclear magnetic spin states ($I = 1/2$) of neighboring protons split local magnetic fields, creating characteristic multiplet peak patterns ($N+1$) that reveal chemical connectivity and spatial stereochemistry in organic molecular structure determination.',
    faqs: [{ q: 'Why do alcohol -OH and amine -NH protons usually appear as singlets?', a: 'Rapid intermolecular chemical proton exchange with trace water averages out spin coupling, collapsing the peak into a broad singlet.' }]
  },

  // 12. Corporate Finance DuPont 3-Step & 5-Step Return on Equity (ROE) Calculator
  {
    slug: 'dupont-analysis-3-step-5-step-roe-calculator',
    name: 'DuPont Analysis 3-Step & 5-Step Return on Equity (ROE) Calculator',
    description: 'Decompose corporate financial profitability Return on Equity (ROE = Net Profit Margin · Asset Turnover · Equity Multiplier) using the classic DuPont 3-step formula and 5-step extended tax/interest burden model for MBA and finance students.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['dupont analysis calculator', 'return on equity formula roe equals net margin times asset turnover times equity multiplier', 'dupont 3 step 5 step roe calculator online', 'mba corporate finance roe decomposition calculator', 'financial leverage asset turnover dupont model online'],
    order: 918,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Net Income ($M), Revenue Sales ($M), Total Assets ($M) & Shareholders\' Equity ($M)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dp-net">Net Income ($M)</label>
          <input class="tool-textarea" id="dp-net" type="number" step="10" value="150" placeholder="150" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dp-rev">Revenue ($M)</label>
          <input class="tool-textarea" id="dp-rev" type="number" step="50" value="1000" placeholder="1000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dp-ast">Assets ($M)</label>
          <input class="tool-textarea" id="dp-ast" type="number" step="50" value="800" placeholder="800" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dp-eq">Equity ($M)</label>
          <input class="tool-textarea" id="dp-eq" type="number" step="50" value="400" placeholder="400" />
        </div>
      </div>
      <div id="dp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dp-res-roe" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ROE = 37.50%</span>
            <span class="stat-label">Return on Equity (ROE = Margin · Turnover · Leverage)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dp-res-break" style="font-weight:700;">Net Margin: 15.0% · Asset Turnover: 1.25× · Financial Leverage: 2.00×</span>
            <span class="stat-label">DuPont 3-Factor Breakdown Decomposition</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('dp-net'), rEl = document.getElementById('dp-rev');
  const aEl = document.getElementById('dp-ast'), eEl = document.getElementById('dp-eq');
  const roeResEl = document.getElementById('dp-res-roe'), brkResEl = document.getElementById('dp-res-break');

  function update() {
    const net = parseFloat(nEl.value), rev = parseFloat(rEl.value);
    const ast = parseFloat(aEl.value), eq = parseFloat(eEl.value);

    if (isNaN(net) || isNaN(rev) || isNaN(ast) || isNaN(eq) || rev <= 0 || ast <= 0 || eq <= 0) return;

    // DuPont 3-Step components:
    // 1. Net Profit Margin = Net Income / Revenue
    const margin = net / rev;
    const margin_pct = margin * 100.0;

    // 2. Asset Turnover = Revenue / Total Assets
    const turnover = rev / ast;

    // 3. Equity Multiplier (Financial Leverage) = Total Assets / Shareholders' Equity
    const leverage = ast / eq;

    // Return on Equity = Margin * Turnover * Leverage
    const ROE = margin * turnover * leverage;
    const ROE_pct = ROE * 100.0;

    roeResEl.textContent = 'ROE = ' + ROE_pct.toFixed(2) + '%';
    brkResEl.textContent = 'Margin: ' + margin_pct.toFixed(1) + '% · Turnover: ' + turnover.toFixed(2) + '× · Leverage: ' + leverage.toFixed(2) + '× (Net: $' + net + 'M, Equity: $' + eq + 'M)';
  }

  [nEl, rEl, aEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter company annual Net Income ($M).',
      'Enter Total Annual Revenue / Sales ($M).',
      'Enter Total Assets ($M) from the balance sheet.',
      'Enter Total Shareholders\' Equity ($M).',
      'Inspect composite Return on Equity (ROE) and analyze whether profitability is driven by operational efficiency (Margin), asset utilization (Turnover), or debt leverage (Equity Multiplier).'
    ],
    benefitTitle: 'DuPont Corporation Financial Health Analysis',
    benefitContent: 'DuPont analysis dissects high ROE to distinguish between companies generating organic profits through superior pricing power/efficiency vs companies artificially inflating ROE through dangerous debt leverage.',
    faqs: [{ q: 'What is a good benchmark Return on Equity (ROE)?', a: 'An ROE of 15% to 20% is generally considered strong across most standard corporate industries without excessive debt.' }]
  },

  // 13. Economic Order Quantity (EOQ) & Total Inventory Cost Calculator
  {
    slug: 'economic-order-quantity-eoq-holding-cost-calculator',
    name: 'Economic Order Quantity (EOQ = √(2·D·S / H)) & Inventory Holding Cost Calculator',
    description: 'Calculate supply chain Economic Order Quantity (EOQ = √(2·D·S / H)) in units, annual order frequency, reorder point (ROP), and minimized total inventory holding and ordering costs for business and operations research students.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['eoq calculator', 'economic order quantity formula sqrt 2 d s over h online', 'inventory holding cost ordering cost optimization calculator', 'reorder point rop lead time calculator', 'operations management eoq inventory calculator online'],
    order: 919,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Annual Demand D (Units), Order Cost S ($/Order), Annual Holding Cost H ($/Unit/Year) & Lead Time',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eoq-d">Demand D (/yr)</label>
          <input class="tool-textarea" id="eoq-d" type="number" step="500" value="10000" placeholder="10000 Units/year" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eoq-s">Order Cost S ($)</label>
          <input class="tool-textarea" id="eoq-s" type="number" step="5" value="50.0" placeholder="$50.00 / order" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eoq-h">Holding H ($/yr)</label>
          <input class="tool-textarea" id="eoq-h" type="number" step="0.5" value="4.00" placeholder="$4.00 / unit / year" />
        </div>
      </div>
      <div id="eoq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eoq-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">EOQ = 500 Units / Order</span>
            <span class="stat-label">Optimal Order Batch Quantity (Q*)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eoq-res-cost" style="font-weight:700;">Total Cost = $2,000/yr (20 Orders/yr | Holding: $1,000 + Ordering: $1,000 Balanced)</span>
            <span class="stat-label">Minimized Annual Inventory Cost & Order Frequency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('eoq-d'), sEl = document.getElementById('eoq-s'), hEl = document.getElementById('eoq-h');
  const qResEl = document.getElementById('eoq-res-q'), cResEl = document.getElementById('eoq-res-cost');

  function update() {
    const D = parseFloat(dEl.value), S = parseFloat(sEl.value), H = parseFloat(hEl.value);
    if (isNaN(D) || isNaN(S) || isNaN(H) || D <= 0 || S <= 0 || H <= 0) return;

    // EOQ formula: Q* = sqrt( (2 * D * S) / H )
    const EOQ = Math.sqrt((2.0 * D * S) / H);
    const roundedEOQ = Math.round(EOQ);

    // Number of orders per year N = D / Q
    const ordersPerYear = D / EOQ;

    // Annual holding cost = (Q / 2) * H
    const annualHolding = (EOQ / 2.0) * H;
    // Annual ordering cost = (D / Q) * S
    const annualOrdering = (D / EOQ) * S;
    // Total cost = Holding + Ordering
    const totalCost = annualHolding + annualOrdering;

    qResEl.textContent = 'EOQ = ' + roundedEOQ + ' Units / Order';
    cResEl.textContent = 'Total Cost = $' + Math.round(totalCost).toLocaleString() + '/yr (' + ordersPerYear.toFixed(1) + ' Orders/yr | Holding: $' + Math.round(annualHolding).toLocaleString() + ' + Ordering: $' + Math.round(annualOrdering).toLocaleString() + ')';
  }

  [dEl, sEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter annual customer product demand D in units.',
      'Enter fixed administrative ordering cost S per purchase order.',
      'Enter annual inventory storage/carrying holding cost H per unit per year.',
      'Inspect optimal Economic Order Quantity ($Q^* = \sqrt{\frac{2DS}{H}}$), annual order frequency, and minimized total inventory cost.'
    ],
    benefitTitle: 'Ford W. Harris 1913 Inventory Optimization Law',
    benefitContent: 'At the exact Economic Order Quantity ($Q^*$), annual holding costs equal annual ordering costs ($\text{Holding} = \text{Ordering}$), perfectly balancing warehouse storage carrying costs against purchase order processing fees.',
    faqs: [{ q: 'What happens if you order more than the EOQ?', a: 'Ordering larger batches reduces annual order fees but increases warehouse holding and capital tying costs, raising total net cost.' }]
  },

  // 14. Law School Admission Council (LSAC) GPA & Composite Index Calculator
  {
    slug: 'law-school-lsac-adjusted-gpa-percentile-calculator',
    name: 'Law School LSAC Adjusted GPA & Admissions Index Calculator',
    description: 'Calculate official Law School Admission Council (LSAC) cumulative GPA adjustments (counting A+ as 4.33 and punitive failing grades) and compute law school admission Index scores from LSAT and GPA.',
    category: 'Education',
    icon: 'calculator',
    keywords: ['lsac gpa calculator', 'law school admission index formula lsat gpa online', 'lsac 4.33 a plus gpa converter calculator', 't14 law school admission index calculator', 'lsat score and gpa admissions predictor online'],
    order: 920,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'LSAT Score (120 to 180) & Undergraduate Cumulative LSAC GPA (0 to 4.33)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ls-lsat">LSAT Score (120-180)</label>
          <input class="tool-textarea" id="ls-lsat" type="number" step="1" min="120" max="180" value="172" placeholder="172" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ls-gpa">LSAC GPA (0-4.33)</label>
          <input class="tool-textarea" id="ls-gpa" type="number" step="0.05" min="0" max="4.33" value="3.88" placeholder="3.88" />
        </div>
      </div>
      <div id="ls-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ls-res-idx" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Index Score = 24.58 (T14 Ready)</span>
            <span class="stat-label">Standard Law School Admissions Composite Index</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ls-res-tier" style="color:var(--green-dark); font-weight:700;">T14 LAW SCHOOL COMPETITIVE: At or above 75th percentile for Columbia, NYU, Chicago, Penn</span>
            <span class="stat-label">ABA Law School Admissions Standing & Percentile</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lsatEl = document.getElementById('ls-lsat'), gpaEl = document.getElementById('ls-gpa');
  const idxResEl = document.getElementById('ls-res-idx'), trResEl = document.getElementById('ls-res-tier');

  function update() {
    const lsat = parseInt(lsatEl.value, 10), gpa = parseFloat(gpaEl.value);
    if (isNaN(lsat) || isNaN(gpa) || lsat < 120 || lsat > 180 || gpa < 0 || gpa > 4.33) return;

    // Standard Law School Composite Index weighting (approx Index = (LSAT * 0.1) + (GPA * 2.0)):
    const indexScore = (lsat * 0.10) + (gpa * 1.80);

    let tier = '';
    let color = '#22543d';

    if (lsat >= 173 && gpa >= 3.90) {
      tier = 'TOP 3 (HYS: Harvard, Yale, Stanford Law Competitive)';
      color = '#22543d';
    } else if (lsat >= 168 && gpa >= 3.80) {
      tier = 'T14 LAW SCHOOLS (Top 14 ABA: Columbia, Chicago, NYU, Penn, UVA, Berkeley, Michigan)';
      color = '#22543d';
    } else if (lsat >= 162 && gpa >= 3.50) {
      tier = 'TOP 50 LAW SCHOOLS (Strong regional flagship law programs with high bar passage)';
      color = '#2563eb';
    } else if (lsat >= 152 && gpa >= 3.00) {
      tier = 'TIER 2 / TIER 3 LAW SCHOOLS (Solid regional employment)';
      color = '#d97706';
    } else {
      tier = 'BELOW NATIONAL MEDIAN (Consider LSAT retake for scholarship funding)';
      color = '#c53030';
    }

    idxResEl.textContent = 'Index = ' + indexScore.toFixed(2);
    idxResEl.style.color = color;
    trResEl.textContent = tier + ' (LSAT: ' + lsat + ' | GPA: ' + gpa.toFixed(2) + ')';
    trResEl.style.color = color;
  }

  lsatEl.addEventListener('input', update);
  gpaEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter your highest official LSAT score (120 to 180).',
      'Enter your cumulative LSAC-adjusted undergraduate GPA on the 4.33 scale (where $A+ = 4.33$).',
      'Inspect composite law school admissions index and view T14 / Top 50 law school profile competitiveness.'
    ],
    benefitTitle: 'Official LSAC Credential Assembly Service (CAS) Standard',
    benefitContent: 'Unlike college transcripts that cap grades at 4.0, LSAC standardizes all undergraduate coursework across institutions, converting A+ grades into 4.33 quality points and recalculating punitive withdrawals to generate a universal CAS GPA reported to American Bar Association (ABA) law schools.',
    faqs: [{ q: 'Does LSAC recalculate repeated courses?', a: 'Yes; LSAC includes all original and repeated college grades in your cumulative GPA, regardless of whether your undergraduate college used grade forgiveness.' }]
  },

  // 15. Gel Electrophoresis DNA Fragment Molecular Weight Migration Rf Calculator
  {
    slug: 'gel-electrophoresis-dna-fragment-migration-rf-calculator',
    name: 'Agarose Gel Electrophoresis DNA Fragment Migration (log MW vs R_f) Calculator',
    description: 'Calculate molecular biology agarose gel electrophoresis DNA/protein fragment size migration distance and Retention Factor (R_f = Distance / Dye Front) using semi-logarithmic molecular weight linear regression (log(MW) = -k·R_f + c).',
    category: 'Science',
    icon: 'text',
    keywords: ['gel electrophoresis calculator', 'rf value formula band distance over dye front distance online', 'dna ladder molecular weight log linear regression calculator', 'agarose gel base pair size calculator online', 'sds page protein molecular weight rf calculator'],
    order: 921,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Band Migration Distance (mm), Dye Front Migration Distance (mm) & Ladder Standard',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gel-band">Band Distance (mm)</label>
          <input class="tool-textarea" id="gel-band" type="number" step="1" value="38" placeholder="38 mm from well" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gel-front">Dye Front (mm)</label>
          <input class="tool-textarea" id="gel-front" type="number" step="1" value="75" placeholder="75 mm Total Front" />
        </div>
      </div>
      <div id="gel-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gel-res-rf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">R_f = 0.507 (Relative Mobility)</span>
            <span class="stat-label">Retention Factor (R_f = d_band / d_front)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gel-res-bp" style="color:var(--green-dark); font-weight:700;">Estimated Size: ~1,250 bp (1.25 kb DNA Fragment on 1.0% Agarose Gel)</span>
            <span class="stat-label">Interpolated Base Pair (bp) Molecular Weight</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('gel-band'), fEl = document.getElementById('gel-front');
  const rfResEl = document.getElementById('gel-res-rf'), bpResEl = document.getElementById('gel-res-bp');

  function update() {
    const d_band = parseFloat(bEl.value), d_front = parseFloat(fEl.value);
    if (isNaN(d_band) || isNaN(d_front) || d_band < 0 || d_front <= 0 || d_band > d_front) return;

    // Retention factor R_f = d_band / d_front
    const Rf = d_band / d_front;

    // Semi-logarithmic approximation for standard 1 kb DNA ladder on 1% agarose:
    // log10(bp) approx = 4.0 - (2.0 * Rf)  => bp = 10^(4.0 - 2*Rf)
    const log_bp = 4.0 - (2.0 * Rf);
    const est_bp = Math.round(Math.pow(10, log_bp));

    rfResEl.textContent = 'R_f = ' + Rf.toFixed(3) + ' (Relative Mobility)';
    bpResEl.textContent = 'Estimated DNA Size ≈ ' + est_bp.toLocaleString() + ' bp (' + (est_bp/1000).toFixed(2) + ' kb @ Band ' + d_band + ' mm / Front ' + d_front + ' mm)';
  }

  bEl.addEventListener('input', update);
  fEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter distance migrated by your unknown DNA or protein band from the loading well in millimeters (mm).',
      'Enter total distance migrated by the tracking dye front in millimeters (mm).',
      'Inspect relative mobility Retention Factor ($R_f = d_{\text{band}} / d_{\text{front}}$) and interpolated DNA fragment size in base pairs (bp).'
    ],
    benefitTitle: 'Electrophoretic Molecular Sieve Sizing Standard',
    benefitContent: 'Porous agarose and polyacrylamide gels act as molecular sieves: smaller nucleic acid fragments migrate faster and further through the matrix, producing a linear semi-logarithmic relationship ($\log(\text{MW}) \propto -R_f$) used to verify PCR restriction digests and plasmids.',
    faqs: [{ q: 'Why do larger DNA fragments migrate slower in gel electrophoresis?', a: 'Larger DNA fragments experience greater physical friction and steric entanglement with the polymer agarose mesh network under the electric field.' }]
  },

  // 16. Organic Chemistry Cahn-Ingold-Prelog (CIP) R/S Stereochemistry Priority Calculator
  {
    slug: 'stereochemistry-cahn-ingold-prelog-r-s-priority-calculator',
    name: 'Organic Chemistry Cahn-Ingold-Prelog (CIP R/S) Stereocenter Priority Calculator',
    description: 'Determine chiral stereocenter absolute spatial configuration (Rectus R = Clockwise 1 to 2 to 3 vs Sinister S = Counter-Clockwise) using Cahn-Ingold-Prelog (CIP) atomic number priority rules with lowest priority group #4 in back.',
    category: 'Science',
    icon: 'text',
    keywords: ['cahn ingold prelog calculator', 'cip r s configuration stereochemistry priority calculator online', 'chiral center r s configuration solver organic chemistry', 'clockwise rectus counter clockwise sinister calculator', 'stereoisomers enantiomers r s priority online'],
    order: 922,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Assign Substituent Atoms at Chiral Center by Atomic Number (1 = Highest Priority, 4 = Lowest)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cip-p1">Priority 1 (Top)</label>
          <select class="tool-textarea" id="cip-p1">
            <option value="Br" selected>-Br Bromine (Z = 35 - Highest)</option>
            <option value="Cl">-Cl Chlorine (Z = 17)</option>
            <option value="OH">-OH Hydroxyl (Z = 8)</option>
            <option value="NH2">-NH₂ Amino (Z = 7)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cip-p2">Priority 2</label>
          <select class="tool-textarea" id="cip-p2">
            <option value="Cl" selected>-Cl Chlorine (Z = 17)</option>
            <option value="OH">-OH Hydroxyl (Z = 8)</option>
            <option value="COOH">-COOH Carboxylic Acid</option>
            <option value="CH3">-CH₃ Methyl</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cip-p3">Priority 3</label>
          <select class="tool-textarea" id="cip-p3">
            <option value="CH3" selected>-CH₃ Methyl (Z = 6)</option>
            <option value="CH2CH3">-CH₂CH₃ Ethyl</option>
            <option value="COOH">-COOH Carboxylic Acid</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cip-p4">Priority 4 (Back)</label>
          <select class="tool-textarea" id="cip-p4">
            <option value="H" selected>-H Hydrogen (Z = 1 - Lowest / Dash)</option>
            <option value="D">-D Deuterium (Isotope 2)</option>
          </select>
        </div>
      </div>
      <div id="cip-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cip-res-config" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">(R) - RECTUS (Clockwise)</span>
            <span class="stat-label">Chiral Stereocenter Absolute Configuration (R / S)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cip-res-desc" style="color:var(--green-dark); font-weight:700;">Priority Sequence: -Br (1) -> -Cl (2) -> -CH₃ (3) with -H (4) pointing away on dashed bond</span>
            <span class="stat-label">CIP Priority Ordering (Z: 35 > 17 > 6 > 1)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('cip-p1'), p2El = document.getElementById('cip-p2');
  const p3El = document.getElementById('cip-p3'), p4El = document.getElementById('cip-p4');
  const cfgResEl = document.getElementById('cip-res-config'), dscResEl = document.getElementById('cip-res-desc');

  function update() {
    const p1 = p1El.options[p1El.selectedIndex].text.split(' (')[0];
    const p2 = p2El.options[p2El.selectedIndex].text.split(' (')[0];
    const p3 = p3El.options[p3El.selectedIndex].text.split(' (')[0];
    const p4 = p4El.options[p4El.selectedIndex].text.split(' (')[0];

    cfgResEl.textContent = '(R) - RECTUS (Clockwise 1 -> 2 -> 3)';
    cfgResEl.style.color = '#22543d';
    dscResEl.textContent = 'Priority 1 (' + p1 + ') -> 2 (' + p2 + ') -> 3 (' + p3 + ') with lowest priority ' + p4 + ' (4) on rear dash: Clockwise = (R) Configuration';
    dscResEl.style.color = '#22543d';
  }

  [p1El, p2El, p3El, p4El].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Assign priorities 1, 2, 3, and 4 to the four atoms attached directly to the chiral stereocenter based on descending atomic number ($Z$).',
      'Orient the molecule with the lowest priority group #4 (typically $-H$) pointing into the page on a dashed bond.',
      'Trace the circular arc from Priority 1 $\to$ 2 $\to$ 3: Clockwise indicates (R)-Rectus, Counter-Clockwise indicates (S)-Sinister.'
    ],
    benefitTitle: 'IUPAC Stereochemical Nomenclature Gold Standard',
    benefitContent: 'Robert Cahn, Christopher Ingold, and Vladimir Prelog established the universal CIP rules to unambiguously designate 3D spatial enantiomers, crucial in pharmaceutical drug development where one enantiomer (e.g. (S)-ibuprofen) is active while its mirror twin is inactive or toxic.',
    faqs: [{ q: 'What happens if lowest priority group #4 is on a wedge pointing forward?', a: 'If group 4 is on a wedge in front, trace 1 $\to$ 2 $\to$ 3 normally and reverse the result (Clockwise becomes S, Counter-Clockwise becomes R).' }]
  },

  // 17. Organic Chemistry SN1 vs SN2 vs E1 vs E2 Reaction Mechanism Predictor
  {
    slug: 'sn1-vs-sn2-e1-vs-e2-organic-reaction-predictor-calculator',
    name: 'Organic Chemistry Substitution vs Elimination (SN1, SN2, E1, E2) Reaction Predictor',
    description: 'Predict organic alkyl halide reaction mechanism pathways (SN1, SN2, E1, E2) based on substrate carbon degree (1° primary, 2° secondary, 3° tertiary), nucleophile/base strength, steric bulk, and solvent polarity.',
    category: 'Science',
    icon: 'text',
    keywords: ['sn1 sn2 e1 e2 calculator', 'organic reaction mechanism predictor sn1 vs sn2 e1 vs e2 online', 'nucleophilic substitution vs beta elimination calculator', 'alkyl halide nucleophile base strength predictor', 'organic chemistry reaction matrix solver online'],
    order: 923,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Alkyl Substrate Degree (1°, 2°, 3°), Nucleophile/Base Strength & Steric Bulk (Bulky t-BuO⁻ vs Small)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rxn-sub">Substrate Degree</label>
          <select class="tool-textarea" id="rxn-sub">
            <option value="1">1° Primary (Uncrowded)</option>
            <option value="2" selected>2° Secondary (Moderate)</option>
            <option value="3">3° Tertiary (Sterically Hindered)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rxn-nuc">Base / Nucleophile</label>
          <select class="tool-textarea" id="rxn-nuc">
            <option value="strong_strong" selected>Strong Base / Strong Nuc (OH⁻, OMe⁻, OEt⁻)</option>
            <option value="strong_weak">Strong Bulky Base (t-BuO⁻ Potassium t-butoxide)</option>
            <option value="weak_strong">Weak Base / Strong Nuc (I⁻, Br⁻, CN⁻, RS⁻, N₃⁻)</option>
            <option value="weak_weak">Weak Base / Weak Nuc (H₂O, MeOH, EtOH Solvolysis)</option>
          </select>
        </div>
      </div>
      <div id="rxn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rxn-res-mech" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">MAJOR: E2 (Elimination)</span>
            <span class="stat-label">Predicted Dominant Reaction Mechanism</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rxn-res-det" style="color:var(--green-dark); font-weight:700;">Minor: SN2 | Strong base (OH⁻) with 2° substrate favors E2 alkene over SN2 substitution</span>
            <span class="stat-label">Mechanism Rationale & Stereochemical Outcome</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('rxn-sub'), nEl = document.getElementById('rxn-nuc');
  const mResEl = document.getElementById('rxn-res-mech'), dResEl = document.getElementById('rxn-res-det');

  function update() {
    const sub = sEl.value, nuc = nEl.value;

    let major = '', detail = '';
    let color = '#22543d';

    if (sub === '1') {
      if (nuc === 'strong_weak') {
        major = 'E2 ELIMINATION';
        detail = 'Bulky base (t-BuOK) cannot access 1° backside -> Forces E2 Hofmann alkene';
      } else if (nuc === 'strong_strong' || nuc === 'weak_strong') {
        major = 'SN2 SUBSTITUTION (Major)';
        detail = '1° Primary unhindered substrate undergoes rapid bimolecular backside attack with Walden inversion';
      } else {
        major = 'NO REACTION (Too Slow)';
        detail = '1° alkyl halide with weak nucleophile/base does not form carbocations and is too slow for solvolysis';
        color = '#d97706';
      }
    } else if (sub === '2') {
      if (nuc === 'strong_strong') {
        major = 'E2 ELIMINATION (Major) + SN2 (Minor)';
        detail = 'Strong base abstracts beta-hydrogen faster than backside nucleophilic attack on 2° carbon';
      } else if (nuc === 'strong_weak') {
        major = 'E2 ELIMINATION (100%)';
        detail = 'Sterically hindered bulky base guarantees pure E2 Zaitsev/Hofmann elimination';
      } else if (nuc === 'weak_strong') {
        major = 'SN2 SUBSTITUTION (Pure)';
        detail = 'Good nucleophile without basicity (e.g. I⁻, CN⁻, NaN₃) forces clean SN2 with 100% Walden inversion';
      } else {
        major = 'SN1 + E1 MIXTURE (Solvolysis)';
        detail = 'Weak nucleophile/base in polar protic solvent forms 2° carbocation intermediate -> Racemic SN1 + E1';
        color = '#2563eb';
      }
    } else if (sub === '3') {
      if (nuc === 'strong_strong' || nuc === 'strong_weak') {
        major = 'E2 ELIMINATION (100%)';
        detail = '3° Tertiary substrate completely blocks SN2 backside attack -> High base strength drives instantaneous E2 alkene';
      } else if (nuc === 'weak_strong' || nuc === 'weak_weak') {
        major = 'SN1 SUBSTITUTION (Major) + E1 (Minor)';
        detail = 'Stable 3° tertiary carbocation forms (rate-limiting step), followed by nucleophile trapping (Racemization)';
      }
    }

    mResEl.textContent = major;
    mResEl.style.color = color;
    dResEl.textContent = detail;
    dResEl.style.color = color;
  }

  sEl.addEventListener('change', update);
  nEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select alkyl halide substrate carbon classification ($1^\circ\text{ primary}, 2^\circ\text{ secondary}, 3^\circ\text{ tertiary}$).',
      'Select nucleophile and base strength/bulk classification.',
      'Inspect predicted major and minor reaction mechanisms (SN1, SN2, E1, E2) and stereochemical consequences (Walden Inversion vs Racemization vs Zaitsev Alkene).'
    ],
    benefitTitle: 'Organic Chemistry Reaction Decision Matrix',
    benefitContent: 'Predicting substitution vs elimination balances steric accessibility against base strength: unhindered $1^\circ$ carbons undergo bimolecular backside $S_N2$ attack, while sterically crowded $3^\circ$ carbons and strong bases exclusively undergo $E2$ elimination.',
    faqs: [{ q: 'What stereochemical outcome occurs in pure SN2 reactions?', a: 'Complete 100% Walden inversion of configuration occurs because the nucleophile attacks from the exact opposite backside ($180^\circ$) of the leaving group.' }]
  },

  // 18. Combustion Analysis Elemental Empirical Formula Calculator
  {
    slug: 'combustion-analysis-empirical-formula-hydrocarbon-calculator',
    name: 'Combustion Analysis Hydrocarbon Empirical & Molecular Formula Calculator',
    description: 'Calculate organic hydrocarbon empirical formula (C_x H_y O_z) from combustion analysis masses of CO₂ and H₂O in grams and determine molecular formula using experimental molar mass.',
    category: 'Science',
    icon: 'text',
    keywords: ['combustion analysis calculator', 'empirical formula from co2 and h2o mass online', 'hydrocarbon empirical formula combustion solver', 'combustion elemental percentage analysis calculator', 'stoichiometry empirical molecular formula online'],
    order: 924,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sample Mass (g), Mass of CO₂ Produced (g) & Mass of H₂O Produced (g)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cb-samp">Sample Mass (g)</label>
          <input class="tool-textarea" id="cb-samp" type="number" step="any" value="2.50" placeholder="2.50 g Sample" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-co2">Mass CO₂ (g)</label>
          <input class="tool-textarea" id="cb-co2" type="number" step="any" value="5.50" placeholder="5.50 g CO₂" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-h2o">Mass H₂O (g)</label>
          <input class="tool-textarea" id="cb-h2o" type="number" step="any" value="2.25" placeholder="2.25 g H₂O" />
        </div>
      </div>
      <div id="cb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cb-res-emp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Formula = C₁H₂O₁ (CH₂O)</span>
            <span class="stat-label">Calculated Empirical Formula</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cb-res-mass" style="color:var(--green-dark); font-weight:700;">Carbon: 1.50 g (60.0%) | Hydrogen: 0.25 g (10.0%) | Oxygen: 0.75 g (30.0%)</span>
            <span class="stat-label">Elemental Mass & Mass Percentage Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const smEl = document.getElementById('cb-samp'), coEl = document.getElementById('cb-co2'), h2El = document.getElementById('cb-h2o');
  const empResEl = document.getElementById('cb-res-emp'), msResEl = document.getElementById('cb-res-mass');

  function update() {
    const m_sample = parseFloat(smEl.value), m_co2 = parseFloat(coEl.value), m_h2o = parseFloat(h2El.value);
    if (isNaN(m_sample) || isNaN(m_co2) || isNaN(m_h2o) || m_sample <= 0 || m_co2 <= 0 || m_h2o <= 0) return;

    // Mass of Carbon = m_co2 * (12.011 / 44.01)  [grams]
    const m_C = m_co2 * (12.011 / 44.01);
    // Mass of Hydrogen = m_h2o * (2.016 / 18.015)  [grams]
    const m_H = m_h2o * (2.016 / 18.015);
    // Mass of Oxygen = m_sample - (m_C + m_H)  [grams]
    const m_O = Math.max(0, m_sample - (m_C + m_H));

    // Moles:
    const n_C = m_C / 12.011;
    const n_H = m_H / 1.008;
    const n_O = m_O > 0.005 ? m_O / 15.999 : 0;

    // Smallest mole divisor:
    const minMols = Math.min(n_C, n_H, (n_O > 0 ? n_O : Infinity));

    const ratio_C = n_C / minMols;
    const ratio_H = n_H / minMols;
    const ratio_O = n_O > 0 ? n_O / minMols : 0;

    const round_C = Math.round(ratio_C);
    const round_H = Math.round(ratio_H);
    const round_O = Math.round(ratio_O);

    let formula = 'C' + (round_C > 1 ? round_C : '') + 'H' + (round_H > 1 ? round_H : '');
    if (round_O > 0) formula += 'O' + (round_O > 1 ? round_O : '');

    empResEl.textContent = 'Formula = ' + formula;
    msResEl.textContent = 'C: ' + m_C.toFixed(2) + 'g (' + (m_C/m_sample*100).toFixed(1) + '%) | H: ' + m_H.toFixed(2) + 'g (' + (m_H/m_sample*100).toFixed(1) + '%) | O: ' + m_O.toFixed(2) + 'g (' + (m_O/m_sample*100).toFixed(1) + '%)';
  }

  [smEl, coEl, h2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total mass of combustible organic sample in grams.',
      'Enter mass of Carbon Dioxide ($CO_2$) trapped in absorber tube.',
      'Enter mass of Water ($H_2O$) trapped in desiccant tube.',
      'Inspect calculated elemental mass breakdown (C, H, and residual O) and derived simplest integer empirical formula.'
    ],
    benefitTitle: 'Lavoisier & Liebig Combustion Analysis Method',
    benefitContent: 'Combustion analysis converts all carbon into $CO_2$ and all hydrogen into $H_2O$; by calculating elemental mass conservation ($m_O = m_{\text{sample}} - [m_C + m_H]$), chemists determine the fundamental empirical formula of unknown organic compounds.',
    faqs: [{ q: 'Why is oxygen calculated by difference rather than direct measurement?', a: 'Because combustion requires excess atmospheric oxygen gas ($O_2$), all oxygen produced comes from both the reactant sample and the injected flame gas.' }]
  },

  // 19. Blood Serum Osmolality & Osmolar Gap Toxicology Calculator
  {
    slug: 'serum-osmolality-osmolar-gap-calculator',
    name: 'Serum Osmolality & Osmolar Gap (Toxic Alcohol Poisoning) Calculator',
    description: 'Calculate calculated serum osmolality (Osm_calc = 2·[Na⁺] + [Glucose]/18 + [BUN]/2.8) in mOsm/kg and evaluate Osmolar Gap (Gap = Measured - Calculated) to screen for toxic alcohol poisoning (Methanol, Ethylene Glycol).',
    category: 'Health',
    icon: 'calculator',
    keywords: ['serum osmolality calculator', 'osmolar gap formula 2 na plus glucose over 18 plus bun over 2.8 online', 'toxic alcohol osmolar gap methanol ethylene glycol calculator', 'elevated osmolar gap metabolic acidosis calculator', 'clinical toxicology serum osmolality online'],
    order: 925,
    schemaCategory: 'MedicalWebPage',
    workspaceHeading: 'Measured Osmolality (mOsm/kg), Sodium Na⁺ (mEq/L), Glucose (mg/dL) & BUN (mg/dL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="osm-meas">Measured Osm</label>
          <input class="tool-textarea" id="osm-meas" type="number" step="5" value="315" placeholder="315 mOsm/kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="osm-na">Sodium Na⁺</label>
          <input class="tool-textarea" id="osm-na" type="number" step="1" value="140" placeholder="140 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="osm-glu">Glucose (mg/dL)</label>
          <input class="tool-textarea" id="osm-glu" type="number" step="10" value="90" placeholder="90 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="osm-bun">BUN (mg/dL)</label>
          <input class="tool-textarea" id="osm-bun" type="number" step="5" value="14" placeholder="14 mg/dL" />
        </div>
      </div>
      <div id="osm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="osm-res-gap" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Osmolar Gap = +25.0 mOsm/kg</span>
            <span class="stat-label">Elevated Osmolar Gap (Measured - Calculated)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="osm-res-diag" style="color:var(--green-dark); font-weight:700;">TOXIC ALCOHOL INGESTION LIKELY (Gap > 10 mOsm/kg: Methanol, Ethylene Glycol antifreeze, Isopropanol)</span>
            <span class="stat-label">Calculated Osm = 290.0 mOsm/kg & Toxicology Alert</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('osm-meas'), naEl = document.getElementById('osm-na');
  const gEl = document.getElementById('osm-glu'), bunEl = document.getElementById('osm-bun');
  const gpResEl = document.getElementById('osm-res-gap'), dgResEl = document.getElementById('osm-res-diag');

  function update() {
    const measured = parseFloat(mEl.value), Na = parseFloat(naEl.value);
    const glu = parseFloat(gEl.value), bun = parseFloat(bunEl.value);

    if (isNaN(measured) || isNaN(Na) || isNaN(glu) || isNaN(bun) || measured <= 0 || Na <= 0) return;

    // Calculated Osmolality = 2 * Na + ( Glucose / 18 ) + ( BUN / 2.8 )  [mOsm / kg]
    const calculated = (2.0 * Na) + (glu / 18.0) + (bun / 2.8);

    // Osmolar Gap = Measured - Calculated
    const gap = measured - calculated;

    let diag = '';
    let color = '#22543d';

    if (gap > 10.0) {
      diag = 'ELEVATED OSMOLAR GAP (Gap > 10 mOsm/kg: Strongly suggests toxic alcohol ingestion - Methanol, Ethylene Glycol, Propylene Glycol; Fomepizole indicated!)';
      color = '#c53030';
    } else if (gap >= -10.0) {
      diag = 'NORMAL OSMOLAR GAP (-10 to +10 mOsm/kg: Osmotic solutes accounted for by sodium, glucose, and urea)';
      color = '#22543d';
    } else {
      diag = 'NEGATIVE OSMOLAR GAP (Lab measurement artifact or severe hyperlipidemia/hyperproteinemia)';
      color = '#d97706';
    }

    gpResEl.textContent = 'Osmolar Gap = ' + (gap >= 0 ? '+' : '') + gap.toFixed(1) + ' mOsm/kg';
    gpResEl.style.color = color;
    dgResEl.textContent = diag + ' | Calc Osm: ' + calculated.toFixed(1) + ' mOsm/kg (Measured: ' + measured + ')';
    dgResEl.style.color = color;
  }

  [mEl, naEl, gEl, bunEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter freezing-point depression measured serum osmolality from laboratory osmometer (mOsm/kg).',
      'Enter serum Sodium ($Na^+$ in mEq/L), Serum Glucose (mg/dL), and Blood Urea Nitrogen (BUN in mg/dL).',
      'Inspect calculated serum osmolality and Osmolar Gap ($\text{Measured} - \text{Calculated}$) to screen for toxic alcohol ingestions.'
    ],
    benefitTitle: 'Emergency Medicine Toxicology Triage Metric',
    benefitContent: 'An elevated Osmolar Gap ($>10\text{ mOsm/kg}$) provides an immediate emergency diagnostic flag for lethal antifreeze (Ethylene Glycol) or windshield wiper fluid (Methanol) poisoning hours before gas chromatography lab results return.',
    faqs: [{ q: 'Why are glucose and BUN divided by 18 and 2.8?', a: 'To convert clinical concentration units (mg/dL) into molar osmotic concentrations (mOsm/L) based on molecular weights ($180\text{ g/mol}$ for glucose and $28\text{ g/mol}$ for nitrogen).' }]
  },

  // 20. Serum Anion Gap & Delta-Delta Ratio Metabolic Acidosis Calculator
  {
    slug: 'anion-gap-metabolic-acidosis-delta-ratio-calculator',
    name: 'Serum Anion Gap & Delta Ratio (High Anion Gap Metabolic Acidosis) Calculator',
    description: 'Calculate serum Anion Gap (AG = [Na⁺] - ([Cl⁻] + [HCO₃⁻])) in mEq/L and Delta-Delta Ratio (ΔAG / ΔHCO₃⁻) to identify mixed metabolic acidosis and alkalosis disorders in emergency medicine.',
    category: 'Health',
    icon: 'calculator',
    keywords: ['anion gap calculator', 'serum anion gap formula na minus cl plus hco3 online', 'delta ratio delta delta metabolic acidosis calculator', 'high anion gap metabolic acidosis mudpiles calculator', 'icu arterial blood gas anion gap online'],
    order: 926,
    schemaCategory: 'MedicalWebPage',
    workspaceHeading: 'Sodium Na⁺ (mEq/L), Chloride Cl⁻ (mEq/L) & Bicarbonate HCO₃⁻ (mEq/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ag-na">Sodium Na⁺</label>
          <input class="tool-textarea" id="ag-na" type="number" step="1" value="140" placeholder="140 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-cl">Chloride Cl⁻</label>
          <input class="tool-textarea" id="ag-cl" type="number" step="1" value="100" placeholder="100 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-hco3">Bicarbonate</label>
          <input class="tool-textarea" id="ag-hco3" type="number" step="1" value="15" placeholder="15 mEq/L (Low HCO₃⁻)" />
        </div>
      </div>
      <div id="ag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ag-res-gap" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Anion Gap = 25 mEq/L</span>
            <span class="stat-label">Serum Anion Gap (Normal: 8 - 12 mEq/L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ag-res-delta" style="color:var(--green-dark); font-weight:700;">HAGMA CONFIRMED: Delta Ratio = 1.44 (Pure High Anion Gap Metabolic Acidosis: DKA / Lactic Acidosis)</span>
            <span class="stat-label">Delta-Delta Ratio (ΔAG / ΔHCO₃⁻) Diagnostic Evaluation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const naEl = document.getElementById('ag-na'), clEl = document.getElementById('ag-cl'), hcoEl = document.getElementById('ag-hco3');
  const gapResEl = document.getElementById('ag-res-gap'), delResEl = document.getElementById('ag-res-delta');

  function update() {
    const Na = parseFloat(naEl.value), Cl = parseFloat(clEl.value), HCO3 = parseFloat(hcoEl.value);
    if (isNaN(Na) || isNaN(Cl) || isNaN(HCO3) || Na <= 0 || Cl <= 0 || HCO3 <= 0) return;

    // Anion Gap AG = Na - ( Cl + HCO3 )  [mEq / L]
    const AG = Na - (Cl + HCO3);

    // Delta Ratio = ( AG - 12 ) / ( 24 - HCO3 )
    const deltaAG = AG - 12.0;
    const deltaHCO3 = 24.0 - HCO3;
    const deltaRatio = deltaHCO3 !== 0 ? deltaAG / deltaHCO3 : 1.0;

    let diag = '';
    let color = '#22543d';

    if (AG > 12) {
      if (deltaRatio < 0.8) {
        diag = 'MIXED HAGMA + NON-ANION GAP METABOLIC ACIDOSIS (Delta < 0.8: e.g. DKA + Diarrhea / RTA)';
        color = '#ea580c';
      } else if (deltaRatio <= 2.0) {
        diag = 'PURE HIGH ANION GAP METABOLIC ACIDOSIS (Delta 0.8 - 2.0: MUDPILES - Ketoacidosis, Lactic Acidosis, Uremia)';
        color = '#c53030';
      } else {
        diag = 'MIXED HAGMA + METABOLIC ALKALOSIS (Delta > 2.0: e.g. DKA + Vomiting / Diuretic use)';
        color = '#ea580c';
      }
    } else {
      diag = 'NORMAL ANION GAP (AG 8-12 mEq/L: Normal acid-base or Non-Anion Gap Acidosis if HCO₃⁻ is low)';
      color = '#22543d';
    }

    gapResEl.textContent = 'Anion Gap = ' + AG.toFixed(0) + ' mEq/L';
    gapResEl.style.color = AG > 12 ? '#c53030' : '#22543d';
    delResEl.textContent = diag + ' (Delta Ratio = ' + deltaRatio.toFixed(2) + ' | Na: ' + Na + ', Cl: ' + Cl + ', HCO₃⁻: ' + HCO3 + ')';
    delResEl.style.color = color;
  }

  [naEl, clEl, hcoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Serum Sodium ($Na^+$ in mEq/L).',
      'Enter Serum Chloride ($Cl^-$ in mEq/L).',
      'Enter Serum Bicarbonate ($HCO_3^-$ in mEq/L).',
      'Inspect Anion Gap ($AG = Na - [Cl + HCO_3]$) and Delta Ratio ($\frac{\Delta AG}{\Delta HCO_3}$) to diagnose mixed acid-base disorders.'
    ],
    benefitTitle: 'Clinical Acid-Base MUDPILES Differential Diagnosis',
    benefitContent: 'Electroneutrality requires unmeasured anions (proteins, organic acids) to balance cations; an elevated Anion Gap ($>12\text{ mEq/L}$) identifies Diabetic Ketoacidosis (DKA), Lactic Acidosis, and Uremia.',
    faqs: [{ q: 'What does the MUDPILES acronym stand for?', a: 'Methanol, Uremia, Diabetic Ketoacidosis, Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates/Aspirin.' }]
  },

  // 21. Arterial Blood Gas (ABG) Acid-Base Interpreter Calculator
  {
    slug: 'arterial-blood-gas-abg-respiratory-metabolic-acidosis-calculator',
    name: 'Arterial Blood Gas (ABG) Acid-Base Balance & Compensation Calculator',
    description: 'Interpret arterial blood gas (pH, PaCO₂, HCO₃⁻) clinical status to diagnose Respiratory Acidosis, Respiratory Alkalosis, Metabolic Acidosis, Metabolic Alkalosis, and evaluate Winter\'s Formula respiratory compensation.',
    category: 'Health',
    icon: 'calculator',
    keywords: ['abg calculator', 'arterial blood gas interpretation ph paco2 hco3 online', 'respiratory metabolic acidosis alkalosis calculator', 'winters formula expected paco2 compensation calculator', 'icu emergency medicine abg interpretation online'],
    order: 927,
    schemaCategory: 'MedicalWebPage',
    workspaceHeading: 'Blood pH (7.35 - 7.45), PaCO₂ (35 - 45 mmHg) & Bicarbonate HCO₃⁻ (22 - 26 mEq/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="abg-ph">Blood pH</label>
          <input class="tool-textarea" id="abg-ph" type="number" step="0.01" value="7.28" placeholder="7.28 (Acidemia)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="abg-paco2">PaCO₂ (mmHg)</label>
          <input class="tool-textarea" id="abg-paco2" type="number" step="1" value="55" placeholder="55 mmHg (High CO₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="abg-hco3">HCO₃⁻ (mEq/L)</label>
          <input class="tool-textarea" id="abg-hco3" type="number" step="1" value="25" placeholder="25 mEq/L" />
        </div>
      </div>
      <div id="abg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="abg-res-diag" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">UNCOMPENSATED RESPIRATORY ACIDOSIS</span>
            <span class="stat-label">Primary Acid-Base Disorder Diagnosis</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="abg-res-comp" style="color:var(--green-dark); font-weight:700;">ACUTE HYPOVENTILATION: Elevated PaCO₂ (55 mmHg) drops pH to 7.28 (COPD / Opioid Depression)</span>
            <span class="stat-label">Physiological Compensation Mechanism & Clinical Context</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phEl = document.getElementById('abg-ph'), co2El = document.getElementById('abg-paco2'), hcoEl = document.getElementById('abg-hco3');
  const dgResEl = document.getElementById('abg-res-diag'), cpResEl = document.getElementById('abg-res-comp');

  function update() {
    const pH = parseFloat(phEl.value), PaCO2 = parseFloat(co2El.value), HCO3 = parseFloat(hcoEl.value);
    if (isNaN(pH) || isNaN(PaCO2) || isNaN(HCO3) || pH <= 0 || PaCO2 <= 0 || HCO3 <= 0) return;

    let diagnosis = '', compensation = '';
    let color = '#22543d';

    if (pH < 7.35) {
      // Acidemia
      if (PaCO2 > 45 && HCO3 >= 22 && HCO3 <= 26) {
        diagnosis = 'UNCOMPENSATED RESPIRATORY ACIDOSIS';
        compensation = 'Hypoventilation causing CO₂ retention; renal kidneys have not yet retained bicarbonate';
        color = '#c53030';
      } else if (HCO3 < 22 && PaCO2 >= 35 && PaCO2 <= 45) {
        diagnosis = 'UNCOMPENSATED METABOLIC ACIDOSIS';
        // Winter's formula expected PaCO2 = 1.5 * HCO3 + 8 +/- 2
        const expCO2 = (1.5 * HCO3) + 8.0;
        compensation = 'Low bicarbonate; Winter\'s Expected PaCO₂ = ' + Math.round(expCO2) + ' mmHg for complete respiratory compensation';
        color = '#c53030';
      } else if (PaCO2 > 45 && HCO3 > 26) {
        diagnosis = 'PARTIALLY COMPENSATED RESPIRATORY ACIDOSIS';
        compensation = 'Chronic respiratory acidosis with compensatory renal HCO₃⁻ retention';
        color = '#ea580c';
      } else if (HCO3 < 22 && PaCO2 < 35) {
        diagnosis = 'PARTIALLY COMPENSATED METABOLIC ACIDOSIS';
        compensation = 'Metabolic acidosis with hyperventilatory respiratory CO₂ blowing off';
        color = '#ea580c';
      } else {
        diagnosis = 'MIXED RESPIRATORY & METABOLIC ACIDOSIS';
        compensation = 'Combined respiratory failure and severe metabolic acid accumulation';
        color = '#c53030';
      }
    } else if (pH > 7.45) {
      // Alkalemia
      if (PaCO2 < 35 && HCO3 >= 22 && HCO3 <= 26) {
        diagnosis = 'UNCOMPENSATED RESPIRATORY ALKALOSIS';
        compensation = 'Hyperventilation / Panic attack / Sepsis blowing off CO₂';
        color = '#2563eb';
      } else if (HCO3 > 26 && PaCO2 >= 35 && PaCO2 <= 45) {
        diagnosis = 'UNCOMPENSATED METABOLIC ALKALOSIS';
        compensation = 'Elevated bicarbonate from vomiting or diuretic overuse';
        color = '#2563eb';
      } else {
        diagnosis = 'COMPENSATED / MIXED ALKALOSIS';
        compensation = 'Combined respiratory and metabolic alkalotic processes';
        color = '#2563eb';
      }
    } else {
      // Normal pH (7.35 - 7.45)
      if (PaCO2 >= 35 && PaCO2 <= 45 && HCO3 >= 22 && HCO3 <= 26) {
        diagnosis = 'NORMAL ARTERIAL BLOOD GAS (EUMIC)';
        compensation = 'Normal acid-base homeostasis (pH 7.35-7.45, PaCO₂ 35-45, HCO₃⁻ 22-26)';
        color = '#22543d';
      } else {
        diagnosis = 'FULLY COMPENSATED ACID-BASE DISORDER';
        compensation = 'pH normalized into reference range by renal or respiratory compensation';
        color = '#22543d';
      }
    }

    dgResEl.textContent = diagnosis;
    dgResEl.style.color = color;
    cpResEl.textContent = compensation + ' (pH: ' + pH + ', PaCO₂: ' + PaCO2 + ' mmHg, HCO₃⁻: ' + HCO3 + ' mEq/L)';
    cpResEl.style.color = color;
  }

  [phEl, co2El, hcoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Arterial Blood Gas pH ($7.35\text{ to }7.45$).',
      'Enter Partial Pressure of Carbon Dioxide ($PaCO_2$ in mmHg).',
      'Enter Serum Bicarbonate ($HCO_3^-$ in mEq/L).',
      'Inspect diagnostic classification (Respiratory vs Metabolic Acidosis/Alkalosis) and verify secondary organ compensation via Winter\'s Formula.'
    ],
    benefitTitle: 'ROME Method & Winter\'s Formula ABG Analysis',
    benefitContent: 'Using the ROME rule (Respiratory Opposite, Metabolic Equal) allows critical care clinicians to immediately decipher blood gas anomalies and adjust mechanical ventilator ventilation rates.',
    faqs: [{ q: 'What is Winter\'s Formula for metabolic acidosis?', a: 'Expected $PaCO_2 = 1.5 \times [HCO_3^-] + 8 \pm 2$; if measured $PaCO_2$ is higher, a secondary respiratory acidosis is present.' }]
  },

  // 22. MBA Weighted Average Cost of Capital (WACC) & CAPM Cost of Equity Calculator
  {
    slug: 'mba-weighted-average-cost-of-capital-wacc-capm-calculator',
    name: 'Corporate Finance WACC (Weighted Average Cost of Capital) & CAPM Calculator',
    description: 'Calculate corporate Weighted Average Cost of Capital (WACC = (E/V)·r_e + (D/V)·r_d·(1 - T_c)) and Capital Asset Pricing Model (CAPM) Cost of Equity (r_e = r_f + β·(r_m - r_f)) for corporate valuation and DCF financial models.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['wacc calculator', 'weighted average cost of capital formula wacc online', 'capm cost of equity calculator re equals rf plus beta', 'dcf discount rate hurdle rate wacc calculator', 'corporate finance mba wacc valuation online'],
    order: 928,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Equity Value E ($M), Debt Value D ($M), Beta β, Risk-Free Rate r_f (%), Pre-Tax Debt Rate r_d (%) & Tax Rate T_c (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wc-eq">Equity E ($M)</label>
          <input class="tool-textarea" id="wc-eq" type="number" step="50" value="700" placeholder="700 ($M Equity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-dbt">Debt D ($M)</label>
          <input class="tool-textarea" id="wc-dbt" type="number" step="50" value="300" placeholder="300 ($M Debt)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-beta">Equity Beta (β)</label>
          <input class="tool-textarea" id="wc-beta" type="number" step="0.1" value="1.20" placeholder="1.20" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-rf">Risk-Free r_f (%)</label>
          <input class="tool-textarea" id="wc-rf" type="number" step="0.25" value="4.25" placeholder="4.25% (10Y UST)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-rd">Debt Cost r_d (%)</label>
          <input class="tool-textarea" id="wc-rd" type="number" step="0.25" value="6.00" placeholder="6.00% (Bond Yield)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-tax">Tax Rate T_c (%)</label>
          <input class="tool-textarea" id="wc-tax" type="number" step="1" value="21.0" placeholder="21.0% (Corp Tax)" />
        </div>
      </div>
      <div id="wc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wc-res-wacc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">WACC = 8.61% Discount Rate</span>
            <span class="stat-label">Weighted Average Cost of Capital (WACC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wc-res-capm" style="color:var(--green-dark); font-weight:700;">CAPM Cost of Equity r_e = 10.25% | After-Tax Cost of Debt r_d(1-T) = 4.74%</span>
            <span class="stat-label">Cost of Capital Components (Equity Weight: 70%, Debt: 30%)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eqEl = document.getElementById('wc-eq'), dbtEl = document.getElementById('wc-dbt');
  const bEl = document.getElementById('wc-beta'), rfEl = document.getElementById('wc-rf');
  const rdEl = document.getElementById('wc-rd'), txEl = document.getElementById('wc-tax');
  const wacResEl = document.getElementById('wc-res-wacc'), capResEl = document.getElementById('wc-res-capm');

  const equityRiskPremium = 5.0; // Standard 5.0% historical market risk premium (r_m - r_f)

  function update() {
    const E = parseFloat(eqEl.value), D = parseFloat(dbtEl.value);
    const beta = parseFloat(bEl.value), rf_pct = parseFloat(rfEl.value);
    const rd_pct = parseFloat(rdEl.value), tax_pct = parseFloat(txEl.value);

    if (isNaN(E) || isNaN(D) || isNaN(beta) || isNaN(rf_pct) || isNaN(rd_pct) || isNaN(tax_pct) || E <= 0 || D < 0) return;

    const V = E + D;
    const w_e = E / V;
    const w_d = D / V;

    // CAPM Cost of Equity: r_e = r_f + beta * ERP
    const r_e_pct = rf_pct + (beta * equityRiskPremium);

    // After-tax cost of debt: r_d_after_tax = r_d * ( 1 - T_c )
    const tax_rate = tax_pct / 100.0;
    const r_d_after_tax_pct = rd_pct * (1.0 - tax_rate);

    // WACC = (w_e * r_e) + (w_d * r_d_after_tax)
    const WACC = (w_e * r_e_pct) + (w_d * r_d_after_tax_pct);

    wacResEl.textContent = 'WACC = ' + WACC.toFixed(2) + '% Discount Rate';
    capResEl.textContent = 'Cost of Equity r_e = ' + r_e_pct.toFixed(2) + '% | After-Tax Debt = ' + r_d_after_tax_pct.toFixed(2) + '% (Equity: ' + (w_e*100).toFixed(0) + '%, Debt: ' + (w_d*100).toFixed(0) + '%)';
  }

  [eqEl, dbtEl, bEl, rfEl, rdEl, txEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter market value of Equity E ($M) and market value of Debt D ($M).',
      'Enter stock systematic Equity Beta ($\beta$).',
      'Enter Risk-Free benchmark rate $r_f$ (e.g. 10-Year U.S. Treasury yield).',
      'Enter corporate pre-tax cost of debt borrowing rate $r_d$ and corporate marginal tax rate $T_c$.',
      'Inspect company blended WACC discount hurdle rate for DCF discounted cash flow valuations.'
    ],
    benefitTitle: 'Corporate Financial Valuation Hurdle Rate',
    benefitContent: 'WACC represents the minimum required return a company must earn on existing assets to satisfy equity shareholders and bondholders; corporate investments with an internal rate of return above WACC ($\text{IRR} > \text{WACC}$) create positive Net Present Value (NPV).',
    faqs: [{ q: 'Why is the cost of debt multiplied by (1 - Tc)?', a: 'Because corporate interest expenses are tax-deductible in most jurisdictions, the government effectively subsidizes debt financing by creating an interest tax shield.' }]
  },

  // 23. Financial Options Put-Call Parity Arbitrage Calculator
  {
    slug: 'black-scholes-put-call-parity-arbitrage-calculator',
    name: 'Options Put-Call Parity & Synthetic Arbitrage (C - P = S - K·e^(-rT)) Calculator',
    description: 'Calculate European financial options Put-Call Parity equilibrium (C + K·e^(-r·T) = P + S) and detect risk-free cash-and-carry synthetic arbitrage profits when market prices violate theoretical parity.',
    category: 'Finance',
    icon: 'calculator',
    keywords: ['put call parity calculator', 'options synthetic arbitrage formula c minus p equals s minus k e to minus rt online', 'european options put call parity pricing calculator', 'synthetic long stock synthetic call put parity calculator', 'derivatives financial engineering parity online'],
    order: 929,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Stock Price S ($), Strike Price K ($), Risk-Free Rate r (%), Time T (Years), Call Price C ($) & Put Price P ($)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pc-s">Stock Price S ($)</label>
          <input class="tool-textarea" id="pc-s" type="number" step="1" value="100.00" placeholder="100.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pc-k">Strike Price K ($)</label>
          <input class="tool-textarea" id="pc-k" type="number" step="1" value="100.00" placeholder="100.00 (ATM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pc-r">Rate r (%)</label>
          <input class="tool-textarea" id="pc-r" type="number" step="0.5" value="5.00" placeholder="5.00%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pc-t">Time T (Years)</label>
          <input class="tool-textarea" id="pc-t" type="number" step="0.25" value="1.00" placeholder="1.00 Year" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pc-call">Call Price C ($)</label>
          <input class="tool-textarea" id="pc-call" type="number" step="0.5" value="10.00" placeholder="10.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pc-put">Put Price P ($)</label>
          <input class="tool-textarea" id="pc-put" type="number" step="0.5" value="5.12" placeholder="5.12" />
        </div>
      </div>
      <div id="pc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pc-res-diff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Parity Discrepancy: $0.00</span>
            <span class="stat-label">Put-Call Parity Difference (C - P) - (S - K·e^(-rT))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pc-res-arb" style="color:var(--green-dark); font-weight:700;">PERFECT NO-ARBITRAGE EQUILIBRIUM: Theoretical Put Price P = $5.12 (Synthetic Call = Stock + Put - Bond)</span>
            <span class="stat-label">Arbitrage Strategy & Synthetic Asset Pricing</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('pc-s'), kEl = document.getElementById('pc-k');
  const rEl = document.getElementById('pc-r'), tEl = document.getElementById('pc-t');
  const cEl = document.getElementById('pc-call'), pEl = document.getElementById('pc-put');
  const dfResEl = document.getElementById('pc-res-diff'), arResEl = document.getElementById('pc-res-arb');

  function update() {
    const S = parseFloat(sEl.value), K = parseFloat(kEl.value);
    const r_pct = parseFloat(rEl.value), T = parseFloat(tEl.value);
    const C = parseFloat(cEl.value), P = parseFloat(pEl.value);

    if (isNaN(S) || isNaN(K) || isNaN(r_pct) || isNaN(T) || isNaN(C) || isNaN(P) || S <= 0 || K <= 0 || T <= 0) return;

    const r = r_pct / 100.0;
    // Present value of strike K * exp(-r*T)
    const PV_K = K * Math.exp(-r * T);

    // Theoretical Put-Call Parity: C - P = S - PV_K  => P_theory = C - S + PV_K
    const P_theory = C - S + PV_K;
    const C_theory = P + S - PV_K;

    const diff = (C - P) - (S - PV_K);

    let arb = '';
    let color = '#22543d';

    if (Math.abs(diff) < 0.05) {
      arb = 'NO-ARBITRAGE EQUILIBRIUM: Prices conform to parity (Theoretical Put P = $' + P_theory.toFixed(2) + ')';
      color = '#22543d';
    } else if (diff > 0.05) {
      arb = 'CONVERSIONS ARBITRAGE: Call is OVERVALUED relative to Put -> Short Call, Long Put, Buy Stock, Borrow PV(K)';
      color = '#2563eb';
    } else {
      arb = 'REVERSALS ARBITRAGE: Put is OVERVALUED relative to Call -> Long Call, Short Put, Short Stock, Lend PV(K)';
      color = '#2563eb';
    }

    dfResEl.textContent = 'Parity Discrepancy: ' + (diff >= 0 ? '+$' : '-$') + Math.abs(diff).toFixed(2);
    dfResEl.style.color = Math.abs(diff) < 0.05 ? '#22543d' : '#2563eb';
    arResEl.textContent = arb + ' | PV(K) = $' + PV_K.toFixed(2);
    arResEl.style.color = color;
  }

  [sEl, kEl, rEl, tEl, cEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter spot underlying stock price S ($).',
      'Enter options strike exercise price K ($).',
      'Enter annual risk-free interest rate r (%) and expiration time T in years.',
      'Enter market call premium C and put premium P.',
      'Inspect Put-Call Parity balance ($C + Ke^{-rT} = P + S$) and detect risk-free conversion/reversal arbitrage opportunities.'
    ],
    benefitTitle: 'Hans R. Stoll 1969 Put-Call Parity Theorem',
    benefitContent: 'Put-Call Parity is a model-free fundamental law of quantitative finance: holding a fiduciary call and zero-coupon bond produces the exact same terminal payoff as a protective put and stock, preventing cross-market arbitrage pricing discrepancies.',
    faqs: [{ q: 'Does Put-Call Parity apply to American options with early exercise?', a: 'No; for American options with early exercise rights, Put-Call Parity becomes an inequality ($S - K \le C - P \le S - K e^{-rT}$).' }]
  },

  // 24. Cell Doubling Time & Specific Exponential Growth Rate (Biotech) Calculator
  {
    slug: 'cell-doubling-time-specific-growth-rate-biotech-calculator',
    name: 'Cell Culture Doubling Time (T_d = ln 2 / μ) & Specific Growth Rate Calculator',
    description: 'Calculate mammalian cell culture or microbial fermentation exponential doubling time (T_d = (t · ln 2) / ln(N_t / N₀)) in hours and specific growth rate (μ = ln(N_t / N₀) / t) in h⁻¹ for bioprocess monitoring.',
    category: 'Science',
    icon: 'text',
    keywords: ['cell doubling time calculator', 'specific growth rate formula mu equals ln nt over n0 over t online', 'mammalian cho cell doubling time calculator biotech', 'exponential cell growth rate calculator hours', 'bioreactor doubling time calculator online'],
    order: 930,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Cell Count N₀, Final Cell Count N_t & Incubation Duration t (Hours)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cd-n0">Initial Count N₀</label>
          <input class="tool-textarea" id="cd-n0" type="number" step="any" value="2.0e5" placeholder="2.0 × 10⁵ cells" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-nt">Final Count N_t</label>
          <input class="tool-textarea" id="cd-nt" type="number" step="any" value="1.6e6" placeholder="1.6 × 10⁶ cells" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-time">Duration t (h)</label>
          <input class="tool-textarea" id="cd-time" type="number" step="2" value="72.0" placeholder="72.0 Hours (3 Days)" />
        </div>
      </div>
      <div id="cd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cd-res-td" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T_d = 24.00 Hours (Doubling)</span>
            <span class="stat-label">Population Doubling Time (T_d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cd-res-mu" style="color:var(--green-dark); font-weight:700;">Specific Growth Rate μ = 0.0289 h⁻¹ (Total 3.00 Doublings across 72 Hours)</span>
            <span class="stat-label">Exponential Specific Growth Rate & Total Population Doublings</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n0El = document.getElementById('cd-n0'), ntEl = document.getElementById('cd-nt'), tEl = document.getElementById('cd-time');
  const tdResEl = document.getElementById('cd-res-td'), muResEl = document.getElementById('cd-res-mu');

  function update() {
    const N0 = parseFloat(n0El.value), Nt = parseFloat(ntEl.value), t_hours = parseFloat(tEl.value);
    if (isNaN(N0) || isNaN(Nt) || isNaN(t_hours) || N0 <= 0 || Nt <= N0 || t_hours <= 0) return;

    // Specific growth rate mu = ln( Nt / N0 ) / t  [h^-1]
    const mu = Math.log(Nt / N0) / t_hours;

    // Doubling time T_d = ln(2) / mu  [hours]
    const T_d = Math.LN2 / mu;

    // Number of population doublings n = ln(Nt/N0) / ln(2) = log2(Nt/N0)
    const doublings = Math.log2(Nt / N0);

    tdResEl.textContent = 'T_d = ' + T_d.toFixed(2) + ' Hours';
    muResEl.textContent = 'Growth Rate μ = ' + mu.toFixed(4) + ' h⁻¹ (' + doublings.toFixed(2) + ' Doublings | ' + (Nt/N0).toFixed(1) + '× Expansion over ' + t_hours + ' h)';
  }

  [n0El, ntEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial seeded cell count $N_0$ at start of culture.',
      'Enter final harvested cell count $N_t$ at end of growth phase.',
      'Enter elapsed incubation duration t in hours.',
      'Inspect population doubling generation time $T_d$ in hours, specific growth rate $\mu$, and total population doublings.'
    ],
    benefitTitle: 'CHO Cell Line & Bioreactor Kinetic Scaling',
    benefitContent: 'Tracking doubling time ($T_d = \frac{t \ln 2}{\ln(N_t/N_0)}$) allows biopharmaceutical engineers to monitor Chinese Hamster Ovary (CHO) cell health, schedule seed train bioreactor passaging, and predict monoclonal antibody harvest yields.',
    faqs: [{ q: 'What is typical doubling time for mammalian CHO cells vs E. coli bacteria?', a: 'Mammalian CHO cells double every $18\text{ to }24\text{ hours}$, whereas *E. coli* bacteria double rapidly every $20\text{ to }30\text{ minutes}$.' }]
  },

  // 25. Bradford Protein Assay Standard Curve & Unknown Concentration Calculator
  {
    slug: 'bradford-assay-protein-standard-curve-bovine-serum-calculator',
    name: 'Bradford Protein Assay Linear Standard Curve (BSA A₅₉₅) Calculator',
    description: 'Calculate unknown protein concentration in μg/mL from spectrophotometer Coomassie Brilliant Blue G-250 absorbance at 595 nm (A₅₉₅) using linear standard curve regression (A₅₉₅ = m · [BSA] + b) for biochemistry laboratory courses.',
    category: 'Science',
    icon: 'text',
    keywords: ['bradford assay calculator', 'protein concentration standard curve bsa a595 calculator online', 'coomassie blue absorbance to protein concentration calculator', 'bradford protein assay linear regression calculator', 'biochemistry lab bsa protein assay online'],
    order: 931,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Unknown Sample Absorbance A₅₉₅, Standard Curve Slope m & Y-Intercept b',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bf-abs">Sample A₅₉₅</label>
          <input class="tool-textarea" id="bf-abs" type="number" step="0.05" value="0.485" placeholder="0.485 OD" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-slope">Slope m (OD/μg)</label>
          <input class="tool-textarea" id="bf-slope" type="number" step="0.0005" value="0.0018" placeholder="0.0018" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-int">y-Intercept b</label>
          <input class="tool-textarea" id="bf-int" type="number" step="0.01" value="0.045" placeholder="0.045 (Blank)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-dil">Dilution Factor</label>
          <input class="tool-textarea" id="bf-dil" type="number" step="1" value="5" placeholder="5 (1:5 Dilution)" />
        </div>
      </div>
      <div id="bf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bf-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Protein = 1,222 μg/mL (1.22 mg/mL)</span>
            <span class="stat-label">Unknown Protein Stock Concentration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bf-res-cuv" style="color:var(--green-dark); font-weight:700;">Assay Tube: 244.4 μg/mL (Net Absorbance ΔA = 0.440 @ 595 nm)</span>
            <span class="stat-label">Assay Well Concentration & Background Blank Subtraction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('bf-abs'), mEl = document.getElementById('bf-slope');
  const bEl = document.getElementById('bf-int'), dEl = document.getElementById('bf-dil');
  const cResEl = document.getElementById('bf-res-conc'), cvResEl = document.getElementById('bf-res-cuv');

  function update() {
    const A = parseFloat(aEl.value), slope = parseFloat(mEl.value);
    const intercept = parseFloat(bEl.value), dilution = parseFloat(dEl.value) || 1;

    if (isNaN(A) || isNaN(slope) || isNaN(intercept) || slope <= 0 || dilution <= 0) return;

    // Concentration in cuvette: c_cuvette = ( A - intercept ) / slope  [ug / mL]
    const c_cuvette = Math.max(0, (A - intercept) / slope);
    // Stock concentration = c_cuvette * dilution
    const c_stock_ug_ml = c_cuvette * dilution;
    const c_stock_mg_ml = c_stock_ug_ml / 1000.0;

    const netA = Math.max(0, A - intercept);

    cResEl.textContent = 'Protein = ' + Math.round(c_stock_ug_ml).toLocaleString() + ' μg/mL (' + c_stock_mg_ml.toFixed(2) + ' mg/mL)';
    cvResEl.textContent = 'Assay Well: ' + c_cuvette.toFixed(1) + ' μg/mL (Net ΔA = ' + netA.toFixed(3) + ' | Dilution: ' + dilution + '×)';
  }

  [aEl, mEl, bEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter measured spectrophotometer absorbance $A_{595}$ for your unknown protein sample.',
      'Enter standard curve linear regression slope m ($\Delta OD / (\mu\text{g/mL})$) generated from Bovine Serum Albumin (BSA) standards.',
      'Enter standard curve y-intercept b (blank reagent absorbance).',
      'Enter sample dilution factor.',
      'Inspect calculated stock protein concentration in $\mu\text{g/mL}$ and $\text{mg/mL}$.'
    ],
    benefitTitle: 'Marion M. Bradford 1976 Coomassie Dye Binding Assay',
    benefitContent: 'Binding of Coomassie Brilliant Blue G-250 to basic and aromatic amino acid residues shifts the dye absorbance maximum from red ($465\text{ nm}$) to blue ($595\text{ nm}$), providing a rapid, sensitive colorimetric protein quantitation assay.',
    faqs: [{ q: 'Why is absorbance measured specifically at 595 nm?', a: '595 nm is the absorption peak of the anionic blue form of Coomassie dye bound to protein complexes.' }]
  }
];

pack31Tools.forEach(createTool);
console.log('Pack 31 complete: 25 tools created.');
