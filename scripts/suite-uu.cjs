const { createTool } = require('./generate-curated-tools.cjs');

// Suite UU: 5 Tools in Physical Chemistry, Colligative Properties & Solution Dilution to reach 545 tools
const toolsSuiteUU = [
  // 1. Van 't Hoff Osmotic Pressure Calculator
  {
    slug: 'osmotic-pressure-van-t-hoff-calculator',
    name: 'Osmotic Pressure (Van \'t Hoff) Calculator',
    description: 'Calculate solution osmotic pressure (Π = i · M · R · T) in atmospheres (atm), bar, and kPa from solute molarity, van \'t Hoff factor (i), and temperature.',
    category: 'Science',
    icon: 'text',
    keywords: ['osmotic pressure calculator', 'van t hoff osmotic pressure formula', 'pi i m r t calculator online', 'colligative osmotic pressure atm online', 'reverse osmosis osmotic pressure calculator'],
    order: 416,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solute Molarity (M), Van \'t Hoff Factor (i) & Temperature (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="osm-m">Molarity M (mol / L)</label>
          <input class="tool-textarea" id="osm-m" type="number" step="any" value="0.154" placeholder="0.154 M (Normal Saline)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="osm-i">van \'t Hoff Factor (i)</label>
          <select class="tool-textarea" id="osm-i">
            <option value="1.0">1.0 (Non-electrolyte: Glucose, Sucrose, Urea)</option>
            <option value="1.9" selected>1.9 (NaCl Sodium Chloride Saline)</option>
            <option value="2.6">2.6 (CaCl₂ Calcium Chloride)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="osm-t">Temperature T (°C)</label>
          <input class="tool-textarea" id="osm-t" type="number" step="any" value="37" placeholder="37 °C (Body Temp)" />
        </div>
      </div>
      <div id="osm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="osm-res-pi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.45 atm</span>
            <span class="stat-label">Osmotic Pressure (Π)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="osm-res-kpa" style="font-weight:700;">755.2 kPa (7.55 bar)</span>
            <span class="stat-label">Metric Pressure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('osm-m'), iEl = document.getElementById('osm-i'), tEl = document.getElementById('osm-t');
  const piResEl = document.getElementById('osm-res-pi'), kpaResEl = document.getElementById('osm-res-kpa');

  const R_gas_atm = 0.082057338; // L * atm / (mol * K)

  function update() {
    const M = parseFloat(mEl.value), iFactor = parseFloat(iEl.value), tC = parseFloat(tEl.value);
    if (isNaN(M) || isNaN(iFactor) || isNaN(tC) || M <= 0 || iFactor < 1) return;

    const T_K = tC + 273.15;
    // Pi = i * M * R * T (atm)
    const Pi_atm = iFactor * M * R_gas_atm * T_K;
    const Pi_kPa = Pi_atm * 101.325;
    const Pi_bar = Pi_atm * 1.01325;

    piResEl.textContent = Pi_atm.toFixed(2) + ' atm';
    kpaResEl.textContent = Pi_kPa.toFixed(1) + ' kPa (' + Pi_bar.toFixed(2) + ' bar / ' + (Pi_atm * 14.696).toFixed(1) + ' psi)';
  }

  [mEl, iEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter solute molarity concentration in mol/L.',
      'Select dissociation van \'t Hoff factor i (1.0 for non-electrolytes, ~1.9 for NaCl).',
      'Enter solution temperature in Celsius (e.g. 37°C for human physiology, 25°C for room temp).',
      'Inspect osmotic pressure in atmospheres (atm), bar, and kPa.'
    ],
    benefitTitle: 'Jacobus Henricus van \'t Hoff\'s 1901 Nobel Discovery',
    benefitContent: 'Osmotic pressure is the minimum external hydrostatic pressure required to prevent the inward inward flow of pure water across a semipermeable membrane into a concentrated solution, governing IV fluid isotonicity and reverse osmosis desalination plants.',
    faqs: [{ q: 'Why is normal saline (0.9% NaCl) isotonic with blood?', a: '0.9% saline (~0.154 M NaCl) creates an osmotic pressure of ~7.5 atm at 37°C, perfectly balancing the intracellular osmotic pressure of red blood cells to prevent cell lysis.' }]
  },

  // 2. Boiling Point Elevation (Ebullioscopic) Calculator
  {
    slug: 'boiling-point-elevation-ebullioscopic-calculator',
    name: 'Boiling Point Elevation (Ebullioscopy) Calculator',
    description: 'Calculate boiling point increase (ΔT_b = i · K_b · m) and elevated boiling temperature for solutions from solute molality and solvent ebullioscopic constant (K_b).',
    category: 'Science',
    icon: 'text',
    keywords: ['boiling point elevation calculator', 'ebullioscopic constant kb formula', 'delta tb i kb m calculator online', 'solution boiling point elevation calculator', 'colligative boiling point online'],
    order: 417,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solvent Preset, Solute Molality (m) & Van \'t Hoff Factor (i)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bp-solv">Solvent</label>
          <select class="tool-textarea" id="bp-solv">
            <option value="100.0,0.512" selected>Water (T_b = 100.0 °C, K_b = 0.512 °C·kg/mol)</option>
            <option value="78.24,1.22">Ethanol (T_b = 78.24 °C, K_b = 1.22 °C·kg/mol)</option>
            <option value="56.08,1.71">Acetone (T_b = 56.08 °C, K_b = 1.71 °C·kg/mol)</option>
            <option value="80.1,2.53">Benzene (T_b = 80.1 °C, K_b = 2.53 °C·kg/mol)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-m">Molality m (mol / kg)</label>
          <input class="tool-textarea" id="bp-m" type="number" step="any" value="1.0" placeholder="1.0 mol/kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-i">van \'t Hoff (i)</label>
          <input class="tool-textarea" id="bp-i" type="number" step="0.1" value="1.9" placeholder="1.9 (NaCl)" />
        </div>
      </div>
      <div id="bp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bp-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">100.97 °C</span>
            <span class="stat-label">Elevated Boiling Point (T_b)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bp-res-dt" style="color:#2563eb; font-weight:700;">+0.973 °C Rise</span>
            <span class="stat-label">Boiling Elevation (ΔT_b)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('bp-solv'), mEl = document.getElementById('bp-m'), iEl = document.getElementById('bp-i');
  const totResEl = document.getElementById('bp-res-tot'), dtResEl = document.getElementById('bp-res-dt');

  function update() {
    const [tbStr, kbStr] = sEl.value.split(',');
    const Tb0 = parseFloat(tbStr), Kb = parseFloat(kbStr);
    const m = parseFloat(mEl.value), iFactor = parseFloat(iEl.value);

    if (isNaN(m) || isNaN(iFactor) || m <= 0 || iFactor < 1) return;

    // Delta_Tb = i * Kb * m
    const dTb = iFactor * Kb * m;
    const elevatedTb = Tb0 + dTb;

    totResEl.textContent = elevatedTb.toFixed(2) + ' °C';
    dtResEl.textContent = '+' + dTb.toFixed(3) + ' °C Elevation';
  }

  sEl.addEventListener('change', update);
  mEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select solvent liquid (Water, Ethanol, Acetone, Benzene).',
      'Enter solute molal concentration m (moles of solute per kg of solvent).',
      'Enter dissociation van \'t Hoff factor i (1 for non-electrolyte sugar, 2 for NaCl).',
      'Inspect elevated boiling point in Celsius.'
    ],
    benefitTitle: 'Colligative Raoult\'s Law Phenomenon',
    benefitContent: 'Adding non-volatile solute particles lowers the solvent\'s vapor pressure; consequently, higher thermal kinetic energy is required for solution vapor pressure to equal atmospheric pressure, raising the boiling point.',
    faqs: [{ q: 'Does adding salt to cooking water significantly speed up boiling?', a: 'Adding 1 tablespoon of salt (~15g) to 1 liter of water raises boiling point by only ~0.26°C—an insignificant culinary difference.' }]
  },

  // 3. Freezing Point Depression (Cryoscopic) Calculator
  {
    slug: 'freezing-point-depression-cryoscopic-calculator',
    name: 'Freezing Point Depression (Cryoscopy) Calculator',
    description: 'Calculate freezing point lowering (ΔT_f = i · K_f · m) and antifreeze / road de-icing temperatures from solute molality and cryoscopic constant (K_f).',
    category: 'Science',
    icon: 'text',
    keywords: ['freezing point depression calculator', 'cryoscopic constant kf formula', 'delta tf i kf m calculator online', 'road salt de icing freezing point calculator', 'antifreeze ethylene glycol freezing calculator'],
    order: 418,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solvent Preset, Solute Molality (m) & Van \'t Hoff Factor (i)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fp-solv">Solvent</label>
          <select class="tool-textarea" id="fp-solv">
            <option value="0.0,1.86" selected>Water (T_f = 0.0 °C, K_f = 1.86 °C·kg/mol)</option>
            <option value="5.5,5.12">Benzene (T_f = 5.5 °C, K_f = 5.12 °C·kg/mol)</option>
            <option value="6.6,20.0">Cyclohexane (T_f = 6.6 °C, K_f = 20.0 °C·kg/mol)</option>
            <option value="178.4,40.0">Camphor (T_f = 178.4 °C, K_f = 40.0 °C·kg/mol)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="fp-m">Molality m (mol / kg)</label>
          <input class="tool-textarea" id="fp-m" type="number" step="any" value="3.0" placeholder="3.0 mol/kg (Road Salt)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fp-i">van \'t Hoff (i)</label>
          <input class="tool-textarea" id="fp-i" type="number" step="0.1" value="1.9" placeholder="1.9 (NaCl)" />
        </div>
      </div>
      <div id="fp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fp-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-10.60 °C</span>
            <span class="stat-label">Depressed Freezing Point (T_f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fp-res-dt" style="color:#2563eb; font-weight:700;">-10.602 °C Drop</span>
            <span class="stat-label">Freezing Depression (ΔT_f)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('fp-solv'), mEl = document.getElementById('fp-m'), iEl = document.getElementById('fp-i');
  const totResEl = document.getElementById('fp-res-tot'), dtResEl = document.getElementById('fp-res-dt');

  function update() {
    const [tfStr, kfStr] = sEl.value.split(',');
    const Tf0 = parseFloat(tfStr), Kf = parseFloat(kfStr);
    const m = parseFloat(mEl.value), iFactor = parseFloat(iEl.value);

    if (isNaN(m) || isNaN(iFactor) || m <= 0 || iFactor < 1) return;

    // Delta_Tf = i * Kf * m
    const dTf = iFactor * Kf * m;
    const depressedTf = Tf0 - dTf;

    totResEl.textContent = depressedTf.toFixed(2) + ' °C (' + (depressedTf * 9/5 + 32).toFixed(1) + ' °F)';
    dtResEl.textContent = '-' + dTf.toFixed(3) + ' °C Depression';
  }

  sEl.addEventListener('change', update);
  mEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select solvent liquid (Water K_f = 1.86 °C·kg/mol).',
      'Enter solute molality m in mol/kg.',
      'Enter dissociation van \'t Hoff factor i.',
      'Inspect lowered freezing point in Celsius and Fahrenheit for winter de-icing solutions.'
    ],
    benefitTitle: 'Winter Road De-Icing & Engine Antifreeze Principle',
    benefitContent: 'Dissolving rock salt (NaCl or CaCl₂) into ice creates a brine solution with a freezing point significantly below 0°C, preventing dangerous road ice formation and protecting automobile radiators from freezing in sub-zero winter temperatures.',
    faqs: [{ q: 'Why is CaCl₂ more effective than NaCl for road de-icing?', a: 'Calcium chloride (CaCl₂) dissociates into 3 ions (i ≈ 2.7) compared to 2 ions for NaCl (i ≈ 1.9), producing a greater freezing point depression per mole.' }]
  },

  // 4. Solution Dilution Molarity (M₁V₁ = M₂V₂) Calculator
  {
    slug: 'dilution-law-m1v1-m2v2-calculator',
    name: 'Solution Dilution (M₁V₁ = M₂V₂) Calculator',
    description: 'Calculate required stock solution volume (V₁) or target concentration (M₂) using the fundamental chemical dilution equation M₁ · V₁ = M₂ · V₂ (C₁V₁ = C₂V₂).',
    category: 'Science',
    icon: 'text',
    keywords: ['m1v1 m2v2 calculator', 'solution dilution calculator', 'c1v1 c2v2 formula online', 'stock solution dilution calculator', 'laboratory molarity dilution calculator'],
    order: 419,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Stock Concentration (M₁), Desired Concentration (M₂) & Final Volume (V₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dil-m1">Stock Conc M₁ (M / %)</label>
          <input class="tool-textarea" id="dil-m1" type="number" step="any" value="12.0" placeholder="12.0 M (Conc. HCl)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dil-m2">Target Conc M₂ (M / %)</label>
          <input class="tool-textarea" id="dil-m2" type="number" step="any" value="1.0" placeholder="1.0 M" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dil-v2">Target Volume V₂ (mL)</label>
          <input class="tool-textarea" id="dil-v2" type="number" step="any" value="500" placeholder="500 mL" />
        </div>
      </div>
      <div id="dil-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dil-res-v1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">41.67 mL Stock</span>
            <span class="stat-label">Required Stock Volume (V₁)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dil-res-water" style="font-weight:700;">458.33 mL Water</span>
            <span class="stat-label">Solvent to Add (V₂ - V₁)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('dil-m1'), m2El = document.getElementById('dil-m2'), v2El = document.getElementById('dil-v2');
  const v1ResEl = document.getElementById('dil-res-v1'), wResEl = document.getElementById('dil-res-water');

  function update() {
    const M1 = parseFloat(m1El.value), M2 = parseFloat(m2El.value), V2 = parseFloat(v2El.value);
    if (isNaN(M1) || isNaN(M2) || isNaN(V2) || M1 <= 0 || M2 <= 0 || V2 <= 0 || M2 > M1) {
      v1ResEl.textContent = 'Ensure M₁ ≥ M₂ > 0';
      return;
    }

    // M1 * V1 = M2 * V2 => V1 = (M2 * V2) / M1
    const V1 = (M2 * V2) / M1;
    const waterToAdd = V2 - V1;
    const dilFactor = M1 / M2;

    v1ResEl.textContent = V1.toFixed(2) + ' mL Stock (' + dilFactor.toFixed(1) + 'x Dilution)';
    wResEl.textContent = waterToAdd.toFixed(2) + ' mL Solvent (DI Water)';
  }

  [m1El, m2El, v2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter concentrated stock solution molarity or percentage (M₁).',
      'Enter target diluted concentration (M₂) and desired total final volume (V₂) in mL.',
      'Inspect exact volume of stock solution to pipette (V₁) and volume of deionized water solvent to add.'
    ],
    benefitTitle: 'Conservation of Solute Mass Law',
    benefitContent: 'Dilution preserves the absolute number of solute moles (n = M₁·V₁ = M₂·V₂); adding pure solvent increases the denominator volume without changing total dissolved solute mass.',
    faqs: [{ q: 'How do you prepare 500 mL of 1M HCl from 12M concentrated stock?', a: 'V₁ = (1M × 500 mL) / 12M = 41.67 mL of concentrated HCl diluted into 458.33 mL of water.' }]
  },

  // 5. Molarity to Molality & Density Interconversion Calculator
  {
    slug: 'molarity-to-molality-density-converter',
    name: 'Molarity (M) to Molality (m) & Density Converter',
    description: 'Convert between Molarity (mol/L solution) and Molality (mol/kg solvent) using solution density (d in g/mL) and solute molecular weight (MW in g/mol).',
    category: 'Science',
    icon: 'text',
    keywords: ['molarity to molality calculator', 'molality to molarity formula', 'convert molar to molal online', 'molarity density molecular weight molality', 'solution concentration converter chemistry'],
    order: 420,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Molarity (M), Solution Density (g/mL) & Solute MW (g/mol)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mm-molar">Molarity M (mol / L)</label>
          <input class="tool-textarea" id="mm-molar" type="number" step="any" value="2.0" placeholder="2.0 M" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-dens">Density d (g / mL)</label>
          <input class="tool-textarea" id="mm-dens" type="number" step="any" value="1.08" placeholder="1.08 g/mL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-mw">Solute MW (g / mol)</label>
          <input class="tool-textarea" id="mm-mw" type="number" step="any" value="58.44" placeholder="58.44 (NaCl)" />
        </div>
      </div>
      <div id="mm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mm-res-molal" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.08 mol / kg</span>
            <span class="stat-label">Calculated Molality (m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mm-res-wtpct" style="font-weight:700;">10.82%</span>
            <span class="stat-label">Mass Weight Percentage (wt%)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('mm-molar'), dEl = document.getElementById('mm-dens'), mwEl = document.getElementById('mm-mw');
  const molResEl = document.getElementById('mm-res-molal'), wtResEl = document.getElementById('mm-res-wtpct');

  function update() {
    const M = parseFloat(mEl.value), d = parseFloat(dEl.value), MW = parseFloat(mwEl.value);
    if (isNaN(M) || isNaN(d) || isNaN(MW) || M <= 0 || d <= 0 || MW <= 0) return;

    // Mass of 1 Liter of solution = 1000 * d (grams)
    const massSoln = 1000 * d;
    // Mass of solute in 1 Liter = M * MW (grams)
    const massSolute = M * MW;
    // Mass of solvent in 1 Liter = massSoln - massSolute (grams)
    const massSolvent = massSoln - massSolute;

    if (massSolvent <= 0) {
      molResEl.textContent = 'Invalid parameters (Solute mass exceeds solution mass)';
      return;
    }

    // Molality m = Moles / (massSolvent / 1000) = (1000 * M) / massSolvent
    const molality = (1000 * M) / massSolvent;
    // Weight % = (massSolute / massSoln) * 100
    const wtPct = (massSolute / massSoln) * 100;

    molResEl.textContent = molality.toFixed(3) + ' mol / kg (molal)';
    wtResEl.textContent = wtPct.toFixed(2) + '% by Mass (w/w)';
  }

  [mEl, dEl, mwEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter solution Molarity M (mol/L).',
      'Enter solution density d in g/mL (e.g. 1.00 for dilute water, 1.08 for 2M NaCl).',
      'Enter solute molecular weight in g/mol.',
      'Inspect Molality m (mol/kg solvent) and mass weight concentration percentage (wt%).'
    ],
    benefitTitle: 'Temperature Independence of Molality',
    benefitContent: 'Because volumetric molarity (mol/L) changes with thermal liquid expansion/contraction, thermodynamics and colligative properties strictly employ temperature-invariant Molality (mol/kg mass of solvent).',
    faqs: [{ q: 'When are Molarity and Molality nearly identical?', a: 'In dilute aqueous solutions at room temperature where density ≈ 1.00 g/mL and solute mass is negligible, Molarity (M) ≈ Molality (m).' }]
  }
];

toolsSuiteUU.forEach(createTool);
console.log('Suite UU complete: 5 tools created.');
