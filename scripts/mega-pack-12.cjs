const { createTool } = require('./generate-curated-tools.cjs');

const tools12 = [
  // 1. Mass Percent Concentration Calculator
  {
    slug: 'mass-percent-concentration-calculator',
    name: 'Mass Percent Concentration Calculator',
    description: 'Calculate solution mass percentage concentration (Mass % = (Solute Mass / Solution Mass) · 100) or required solute mass for target percentage.',
    category: 'Science',
    icon: 'text',
    keywords: ['mass percent calculator', 'mass percentage concentration', 'solute solvent solution calculator', 'chemistry mass percent formula', 'weight percent solution calculator'],
    order: 159,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solute & Solvent Masses (grams)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mp-solute">Solute Mass (grams)</label>
          <input class="tool-textarea" id="mp-solute" type="number" step="any" value="25" placeholder="e.g. 25 g (Salt/Sugar)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mp-solvent">Solvent Mass (grams)</label>
          <input class="tool-textarea" id="mp-solvent" type="number" step="any" value="175" placeholder="e.g. 175 g (Water)" />
        </div>
      </div>
      <div id="mp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mp-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">12.50%</span>
            <span class="stat-label">Mass Concentration (w/w %)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mp-res-total">200.00 g</span>
            <span class="stat-label">Total Solution Mass</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const solEl = document.getElementById('mp-solute'), solvEl = document.getElementById('mp-solvent');
  const pctEl = document.getElementById('mp-res-pct'), totEl = document.getElementById('mp-res-total');

  function update() {
    const solute = parseFloat(solEl.value), solvent = parseFloat(solvEl.value);
    if (isNaN(solute) || isNaN(solvent) || solute <= 0 || solvent <= 0) return;

    const total = solute + solvent;
    const pct = (solute / total) * 100;

    pctEl.textContent = pct.toFixed(2) + '% (w/w)';
    totEl.textContent = total.toFixed(2) + ' grams';
  }

  solEl.addEventListener('input', update);
  solvEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the solute mass (e.g. salt, sugar, chemical salt) in grams.',
      'Enter the solvent mass (e.g. water) in grams.',
      'Inspect the final mass concentration percentage (w/w %).'
    ],
    benefitTitle: 'Weight-by-Weight Concentration (w/w %)',
    benefitContent: 'Mass percent expresses the ratio of solute mass to total combined solution mass (Solute + Solvent): Mass % = (m_solute / (m_solute + m_solvent)) × 100.',
    faqs: [{ q: 'What is physiological saline concentration?', a: 'Normal medical saline is a 0.9% (w/w) sodium chloride (NaCl) solution in sterile water.' }]
  },

  // 2. Molality Concentration Calculator
  {
    slug: 'molality-calculator',
    name: 'Molality (m) Concentration Calculator',
    description: 'Calculate solution molality (m = Moles of Solute / kg of Solvent) from chemical formula weight and solvent mass.',
    category: 'Science',
    icon: 'text',
    keywords: ['molality calculator', 'calculate molality online', 'moles per kg solvent calculator', 'molality formula chemistry', 'molarity vs molality calculator'],
    order: 160,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solute Moles & Solvent Weight',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mol-moles">Solute Amount (Moles)</label>
          <input class="tool-textarea" id="mol-moles" type="number" step="any" value="0.5" placeholder="e.g. 0.5 moles" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mol-kg">Solvent Mass (Kilograms kg)</label>
          <input class="tool-textarea" id="mol-kg" type="number" step="any" value="2.0" placeholder="e.g. 2.0 kg" />
        </div>
      </div>
      <div id="mol-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mol-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.250 m</span>
            <span class="stat-label">Solution Molality (m or mol/kg)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const molEl = document.getElementById('mol-moles'), kgEl = document.getElementById('mol-kg');
  const resEl = document.getElementById('mol-res-val');

  function update() {
    const moles = parseFloat(molEl.value), kg = parseFloat(kgEl.value);
    if (isNaN(moles) || isNaN(kg) || moles <= 0 || kg <= 0) return;

    const m = moles / kg;
    resEl.textContent = m.toFixed(3) + ' mol/kg (m)';
  }

  molEl.addEventListener('input', update);
  kgEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the quantity of solute in moles.',
      'Enter the mass of pure solvent in kilograms.',
      'Inspect solution molality.'
    ],
    benefitTitle: 'Why Molality is Temperature-Independent',
    benefitContent: 'Unlike Molarity (moles/Liter), which changes as liquid volume expands or contracts with temperature, Molality (moles/kg) depends strictly on mass and remains completely invariant to temperature shifts.',
    faqs: [{ q: 'When is molality required over molarity?', a: 'Molality is mandatory when calculating colligative properties like boiling point elevation and freezing point depression.' }]
  },

  // 3. Freezing Point Depression Colligative Calculator
  {
    slug: 'freezing-point-depression-calculator',
    name: 'Freezing Point Depression Calculator',
    description: 'Calculate solution freezing point depression (ΔTf = i · Kf · m) and new depressed freezing point for antifreeze and road salt solutions.',
    category: 'Science',
    icon: 'text',
    keywords: ['freezing point depression calculator', 'colligative properties calculator', 'delta tf calculator', 'antifreeze freezing point calculator', 'van t hoff factor freezing point'],
    order: 161,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Colligative Solution Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fp-kf">Solvent Kf (°C·kg/mol)</label>
          <input class="tool-textarea" id="fp-kf" type="number" step="any" value="1.86" placeholder="1.86 (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fp-m">Solution Molality (mol/kg)</label>
          <input class="tool-textarea" id="fp-m" type="number" step="any" value="2.0" placeholder="2.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fp-i">Van \'t Hoff Factor (i)</label>
          <input class="tool-textarea" id="fp-i" type="number" step="any" value="2.0" placeholder="2.0 (NaCl) or 1.0 (Sugar)" />
        </div>
      </div>
      <div id="fp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fp-res-new" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-7.44 °C</span>
            <span class="stat-label">New Depressed Freezing Point</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fp-res-delta">7.44 °C</span>
            <span class="stat-label">Freezing Point Drop (ΔTf)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kfEl = document.getElementById('fp-kf'), mEl = document.getElementById('fp-m'), iEl = document.getElementById('fp-i');
  const newEl = document.getElementById('fp-res-new'), dEl = document.getElementById('fp-res-delta');

  function update() {
    const kf = parseFloat(kfEl.value), m = parseFloat(mEl.value), i = parseFloat(iEl.value);
    if (isNaN(kf) || isNaN(m) || isNaN(i) || kf <= 0 || m <= 0 || i <= 0) return;

    // Delta Tf = i * Kf * m
    const deltaTf = i * kf * m;
    const newFp = 0.0 - deltaTf; // For water pure FP = 0 C

    newEl.textContent = newFp.toFixed(2) + ' °C (' + ((newFp * 9/5) + 32).toFixed(2) + ' °F)';
    dEl.textContent = deltaTf.toFixed(2) + ' °C drop';
  }

  [kfEl, mEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter the cryoscopic constant (Kf) for the solvent (Water Kf = 1.86 °C·kg/mol).',
      'Enter solution molality (m).',
      'Enter Van \'t Hoff ionization factor (i = 1 for non-electrolytes like glucose, i = 2 for NaCl).',
      'Inspect the depressed freezing point.'
    ],
    benefitTitle: 'Why Road Salt Melts Ice',
    benefitContent: 'Dissolving ionic salts in water disrupts ice crystal lattice formation, depressing the equilibrium freezing point below 0 °C and causing ambient snow and ice to melt into liquid brine.',
    faqs: [{ q: 'What is the Van \'t Hoff factor for CaCl2?', a: 'Calcium chloride dissociates into 1 Ca²⁺ and 2 Cl⁻ ions, giving an ideal Van \'t Hoff factor of i = 3.' }]
  },

  // 4. Boiling Point Elevation Calculator
  {
    slug: 'boiling-point-elevation-calculator',
    name: 'Boiling Point Elevation Calculator',
    description: 'Calculate solution boiling point elevation (ΔTb = i · Kb · m) and elevated boiling temperature for aqueous and non-aqueous solutions.',
    category: 'Science',
    icon: 'text',
    keywords: ['boiling point elevation calculator', 'ebullioscopic calculator', 'delta tb calculator', 'boiling point of salt water', 'colligative boiling point formula'],
    order: 162,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ebullioscopic Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bp-kb">Solvent Kb (°C·kg/mol)</label>
          <input class="tool-textarea" id="bp-kb" type="number" step="any" value="0.512" placeholder="0.512 (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-m">Solution Molality (mol/kg)</label>
          <input class="tool-textarea" id="bp-m" type="number" step="any" value="2.0" placeholder="2.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-i">Van \'t Hoff Factor (i)</label>
          <input class="tool-textarea" id="bp-i" type="number" step="any" value="2.0" placeholder="2.0 (NaCl)" />
        </div>
      </div>
      <div id="bp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bp-res-new" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">102.05 °C</span>
            <span class="stat-label">New Elevated Boiling Point</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bp-res-delta">2.05 °C</span>
            <span class="stat-label">Boiling Point Increase (ΔTb)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kbEl = document.getElementById('bp-kb'), mEl = document.getElementById('bp-m'), iEl = document.getElementById('bp-i');
  const newEl = document.getElementById('bp-res-new'), dEl = document.getElementById('bp-res-delta');

  function update() {
    const kb = parseFloat(kbEl.value), m = parseFloat(mEl.value), i = parseFloat(iEl.value);
    if (isNaN(kb) || isNaN(m) || isNaN(i) || kb <= 0 || m <= 0 || i <= 0) return;

    // Delta Tb = i * Kb * m
    const deltaTb = i * kb * m;
    const newBp = 100.0 + deltaTb; // Water pure BP = 100 C at 1 atm

    newEl.textContent = newBp.toFixed(2) + ' °C (' + ((newBp * 9/5) + 32).toFixed(2) + ' °F)';
    dEl.textContent = '+' + deltaTb.toFixed(2) + ' °C rise';
  }

  [kbEl, mEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter the ebullioscopic constant (Kb) for the solvent (Water Kb = 0.512 °C·kg/mol).',
      'Enter solute molality and Van \'t Hoff factor.',
      'Inspect the elevated boiling point temperature.'
    ],
    benefitTitle: 'Vapor Pressure Lowering Principle',
    benefitContent: 'Non-volatile solute molecules occupy surface space at the liquid-gas interface, reducing solvent vapor pressure and requiring higher thermal kinetic energy to match atmospheric pressure.',
    faqs: [{ q: 'Does adding salt to cooking water boil pasta faster?', a: 'The minor boiling point elevation (typically less than 0.5 °C for standard culinary salt amounts) is negligible for cooking time.' }]
  },

  // 5. Van 't Hoff Osmotic Pressure Calculator
  {
    slug: 'osmotic-pressure-calculator',
    name: 'Van \'t Hoff Osmotic Pressure Calculator',
    description: 'Calculate osmotic pressure (Π = i · M · R · T) across semipermeable membranes in atmospheres, bar, and kPa for biological cells and reverse osmosis.',
    category: 'Science',
    icon: 'text',
    keywords: ['osmotic pressure calculator', 'van t hoff osmotic pressure', 'reverse osmosis pressure calculator', 'pi imrt chemistry formula', 'cell osmosis calculator'],
    order: 163,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Molarity, Temperature & Ionization',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="osm-m">Molar Concentration M (mol/L)</label>
          <input class="tool-textarea" id="osm-m" type="number" step="any" value="0.154" placeholder="0.154 M (Saline)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="osm-t">Temperature (°C)</label>
          <input class="tool-textarea" id="osm-t" type="number" step="any" value="37" placeholder="37 °C (Body Temp)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="osm-i">Van \'t Hoff Factor (i)</label>
          <input class="tool-textarea" id="osm-i" type="number" step="any" value="2.0" placeholder="2.0 (NaCl)" />
        </div>
      </div>
      <div id="osm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="osm-res-atm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.84 atm</span>
            <span class="stat-label">Osmotic Pressure (Π)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="osm-res-bar" style="font-weight:700;">7.94 bar</span>
            <span class="stat-label">Pressure in Bar</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="osm-res-kpa">794.4 kPa</span>
            <span class="stat-label">Pressure in Kilopascals</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('osm-m'), tEl = document.getElementById('osm-t'), iEl = document.getElementById('osm-i');
  const atmEl = document.getElementById('osm-res-atm'), barEl = document.getElementById('osm-res-bar'), kpaEl = document.getElementById('osm-res-kpa');

  const R = 0.082057; // L·atm / (mol·K)

  function update() {
    const M = parseFloat(mEl.value), tC = parseFloat(tEl.value), i = parseFloat(iEl.value);
    if (isNaN(M) || isNaN(tC) || isNaN(i) || M <= 0 || i <= 0) return;

    const T = tC + 273.15;
    // Pi = i * M * R * T (in atm)
    const piAtm = i * M * R * T;
    const piBar = piAtm * 1.01325;
    const piKpa = piAtm * 101.325;

    atmEl.textContent = piAtm.toFixed(2) + ' atm';
    barEl.textContent = piBar.toFixed(2) + ' bar';
    kpaEl.textContent = piKpa.toFixed(1) + ' kPa';
  }

  [mEl, tEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter solute molarity in mol/L.',
      'Enter temperature in Celsius (automatically converted to Kelvin).',
      'Enter the Van \'t Hoff dissociation factor.',
      'Inspect osmotic pressure in atm, bar, and kPa.'
    ],
    benefitTitle: 'Osmotic Pressure in Physiology',
    benefitContent: 'Osmotic pressure governs fluid movement across cell membranes. Intravenous IV infusions must be isotonic (~7.8 atm at 37 °C) to prevent red blood cells from swelling (hemolysis) or shrinking (crenation).',
    faqs: [{ q: 'What is Reverse Osmosis (RO)?', a: 'Applying hydrostatic pressure exceeding natural osmotic pressure forces pure water backwards through a semipermeable membrane, filtering out salts and contaminants.' }]
  }
];

tools12.forEach(createTool);
console.log('Mega pack 12 complete.');
