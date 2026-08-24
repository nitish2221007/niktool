const { createTool } = require('./generate-curated-tools.cjs');

// Suite Z: 5 Tools in Combustion Stoichiometry, Ksp Solubility, Henry's Law & Chemical Bonding
const toolsSuiteZ = [
  // 1. Combustion Stoichiometric Air-Fuel Ratio (AFR) Calculator
  {
    slug: 'combustion-stoichiometry-air-fuel-ratio-calculator',
    name: 'Combustion Air-Fuel Ratio (AFR) & Lambda Calculator',
    description: 'Calculate stoichiometric air-fuel ratio (AFR), excess air factor (Lambda λ), and combustion air mass required for gasoline, diesel, methane, and propane fuels.',
    category: 'Science',
    icon: 'text',
    keywords: ['air fuel ratio calculator', 'stoichiometric afr calculator', 'lambda air fuel ratio online', 'combustion air mass calculator', 'gasoline diesel afr formula'],
    order: 309,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fuel Type, Fuel Mass & Measured Air Mass',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="afr-fuel">Fuel Type</label>
          <select class="tool-textarea" id="afr-fuel">
            <option value="14.7" selected>Gasoline / Petrol (14.7 : 1)</option>
            <option value="14.5">Diesel Fuel (14.5 : 1)</option>
            <option value="17.2">Methane / Natural Gas (17.2 : 1)</option>
            <option value="15.7">Propane / LPG (15.7 : 1)</option>
            <option value="9.0">Ethanol E100 (9.0 : 1)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="afr-fmass">Fuel Injected (grams)</label>
          <input class="tool-textarea" id="afr-fmass" type="number" step="any" value="10" placeholder="10 g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="afr-amass">Air Intake (grams)</label>
          <input class="tool-textarea" id="afr-amass" type="number" step="any" value="147" placeholder="147 g" />
        </div>
      </div>
      <div id="afr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="afr-res-lambda" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ = 1.000</span>
            <span class="stat-label">Equivalence Ratio (Lambda λ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="afr-res-actual" style="font-weight:700;">14.70 : 1</span>
            <span class="stat-label">Actual AFR Mixture</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="afr-res-status" style="color:var(--green-dark);">Stoichiometric (Perfect Combustion)</span>
            <span class="stat-label">Mixture Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('afr-fuel'), fmEl = document.getElementById('afr-fmass'), amEl = document.getElementById('afr-amass');
  const lamEl = document.getElementById('afr-res-lambda'), actEl = document.getElementById('afr-res-actual'), stEl = document.getElementById('afr-res-status');

  function update() {
    const stoichAfr = parseFloat(fEl.value);
    const fuelMass = parseFloat(fmEl.value);
    const airMass = parseFloat(amEl.value);
    if (isNaN(stoichAfr) || isNaN(fuelMass) || isNaN(airMass) || fuelMass <= 0 || airMass <= 0) return;

    // Actual AFR = Air Mass / Fuel Mass
    const actualAfr = airMass / fuelMass;
    // Lambda = Actual AFR / Stoichiometric AFR
    const lambda = actualAfr / stoichAfr;

    lamEl.textContent = 'λ = ' + lambda.toFixed(3);
    actEl.textContent = actualAfr.toFixed(2) + ' : 1';

    if (Math.abs(lambda - 1.0) < 0.02) {
      stEl.textContent = 'Stoichiometric (Optimal Emissions & Fuel Economy)';
      stEl.style.color = '#22543d';
    } else if (lambda < 0.98) {
      stEl.textContent = 'Rich Mixture (λ < 1.0: Maximum Power, Higher CO)';
      stEl.style.color = '#2563eb';
    } else {
      stEl.textContent = 'Lean Mixture (λ > 1.0: High Efficiency, Higher NOx)';
      stEl.style.color = '#d97706';
    }
  }

  [fEl, fmEl, amEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select engine fuel type (Gasoline, Diesel, Methane, Ethanol).',
      'Enter injected fuel mass and measured intake air mass in grams.',
      'Inspect actual AFR ratio, lambda equivalence factor (λ), and combustion state (Rich vs Lean).'
    ],
    benefitTitle: 'Lambda Oxygen Sensor Closed-Loop Tuning',
    benefitContent: 'Three-way automotive catalytic converters require an exact stoichiometric air-fuel ratio (λ = 1.00 ± 0.01) to simultaneously convert CO, unburnt hydrocarbons (HC), and nitrogen oxides (NOx) into harmless CO₂, H₂O, and N₂.',
    faqs: [{ q: 'What is stoichiometric AFR for standard gasoline?', a: 'Exactly 14.7 : 1 by mass (14.7 grams of dry air per 1.0 gram of gasoline).' }]
  },

  // 2. Solubility Product Constant (Ksp) & Molar Solubility Calculator
  {
    slug: 'solubility-product-ksp-molar-solubility-calculator',
    name: 'Solubility Product (Ksp) & Molar Solubility Calculator',
    description: 'Calculate molar solubility (s in mol/L and g/L) and precipitation limits for sparingly soluble ionic salts (AB, AB₂, AB₃, A₂B₃) from Ksp values.',
    category: 'Science',
    icon: 'text',
    keywords: ['ksp calculator', 'solubility product constant calculator', 'molar solubility from ksp online', 'precipitation reaction ksp formula', 'sparingly soluble salt solubility'],
    order: 310,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Salt Type, Ksp & Formula Weight',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ksp-type">Salt Stoichiometry</label>
          <select class="tool-textarea" id="ksp-type">
            <option value="1" selected>AB (e.g. AgCl, BaSO4: Ksp = s²)</option>
            <option value="2">AB₂ or A₂B (e.g. CaF2, PbCl2: Ksp = 4s³)</option>
            <option value="3">AB₃ (e.g. Al(OH)3, Fe(OH)3: Ksp = 27s⁴)</option>
            <option value="4">A₂B₃ (e.g. Bi2S3: Ksp = 108s⁵)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ksp-val">Solubility Product (Ksp)</label>
          <input class="tool-textarea" id="ksp-val" type="text" value="1.8e-10" placeholder="1.8e-10 (AgCl)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ksp-mw">Molar Mass (g/mol)</label>
          <input class="tool-textarea" id="ksp-mw" type="number" step="any" value="143.32" placeholder="143.32 g/mol (AgCl)" />
        </div>
      </div>
      <div id="ksp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ksp-res-molar" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">1.34 × 10⁻⁵ M</span>
            <span class="stat-label">Molar Solubility (mol / L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ksp-res-mass" style="font-weight:700;">1.92 mg / L</span>
            <span class="stat-label">Mass Solubility in Water</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('ksp-type'), kEl = document.getElementById('ksp-val'), mEl = document.getElementById('ksp-mw');
  const molEl = document.getElementById('ksp-res-molar'), massEl = document.getElementById('ksp-res-mass');

  function update() {
    const type = parseInt(tEl.value, 10);
    const ksp = parseFloat(kEl.value);
    const mw = parseFloat(mEl.value) || 100;

    if (isNaN(ksp) || isNaN(mw) || ksp <= 0 || mw <= 0) return;

    let s = 0;
    if (type === 1) { // Ksp = s^2
      s = Math.sqrt(ksp);
    } else if (type === 2) { // Ksp = 4s^3
      s = Math.pow(ksp / 4, 1/3);
    } else if (type === 3) { // Ksp = 27s^4
      s = Math.pow(ksp / 27, 1/4);
    } else if (type === 4) { // Ksp = 108s^5
      s = Math.pow(ksp / 108, 1/5);
    }

    const massSolGpl = s * mw;
    const massSolMgpl = massSolGpl * 1000;

    molEl.textContent = s.toExponential(2) + ' mol/L';
    massEl.textContent = massSolMgpl >= 1000 ? (massSolMgpl / 1000).toFixed(2) + ' g/L' : massSolMgpl.toFixed(2) + ' mg/L';
  }

  tEl.addEventListener('change', update);
  kEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select salt stoichiometry (AB, AB₂, AB₃, or A₂B₃).',
      'Enter solubility product equilibrium constant Ksp (scientific notation like 1.8e-10 is supported).',
      'Enter formula molar mass in g/mol.',
      'Inspect molar solubility in mol/L and dissolved concentration in mg/L.'
    ],
    benefitTitle: 'Predicting Precipitation Reactions',
    benefitContent: 'Precipitation occurs whenever the instantaneous ion product quotient Q exceeds the equilibrium solubility constant (Q > Ksp).',
    faqs: [{ q: 'What is the molar solubility of Silver Chloride (AgCl)?', a: 'With Ksp = 1.8 × 10⁻¹⁰, s = √(1.8×10⁻¹⁰) ≈ 1.34 × 10⁻⁵ mol/L (~1.92 mg/L in water).' }]
  },

  // 3. Henry's Law Gas Solubility Under Pressure Calculator
  {
    slug: 'henry-law-gas-solubility-calculator',
    name: 'Henry\'s Law Gas Solubility & Carbonation Calculator',
    description: 'Calculate dissolved gas concentration in liquid (C = k_H · P) from gas partial pressure and Henry\'s law constants for beverage carbonation and scuba diving.',
    category: 'Science',
    icon: 'text',
    keywords: ['henrys law calculator', 'gas solubility pressure calculator', 'carbonation co2 solubility calculator', 'henry constant kh formula', 'scuba nitrogen blood solubility online'],
    order: 311,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dissolved Gas & Partial Pressure',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(150px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hen-gas">Dissolved Gas (in Water at 25°C)</label>
          <select class="tool-textarea" id="hen-gas">
            <option value="0.034" selected>Carbon Dioxide CO₂ (k_H = 0.034 mol/(L·atm))</option>
            <option value="0.0013">Oxygen O₂ (k_H = 0.0013 mol/(L·atm))</option>
            <option value="0.00061">Nitrogen N₂ (k_H = 0.00061 mol/(L·atm))</option>
            <option value="0.00078">Hydrogen H₂ (k_H = 0.00078 mol/(L·atm))</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hen-p">Gas Partial Pressure P (atm)</label>
          <input class="tool-textarea" id="hen-p" type="number" step="any" value="3.0" placeholder="3.0 atm (Soda Bottle)" />
        </div>
      </div>
      <div id="hen-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hen-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.102 mol / L</span>
            <span class="stat-label">Dissolved Molar Concentration (C = k_H·P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hen-res-mass" style="font-weight:700;">4.49 g / L CO₂</span>
            <span class="stat-label">Dissolved Mass in Water</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('hen-gas'), pEl = document.getElementById('hen-p');
  const cEl = document.getElementById('hen-res-conc'), mEl = document.getElementById('hen-res-mass');

  const MW = { '0.034': 44.01, '0.0013': 32.00, '0.00061': 28.01, '0.00078': 2.02 };

  function update() {
    const kH = parseFloat(gEl.value), P = parseFloat(pEl.value);
    if (isNaN(kH) || isNaN(P) || kH <= 0 || P <= 0) return;

    // C = kH * P (mol / L)
    const concMol = kH * P;
    const mw = MW[gEl.value] || 44.01;
    const concGpl = concMol * mw;

    cEl.textContent = concMol >= 0.001 ? concMol.toFixed(3) + ' mol / L' : concMol.toExponential(2) + ' mol / L';
    mEl.textContent = concGpl >= 1.0 ? concGpl.toFixed(2) + ' g / L' : (concGpl * 1000).toFixed(1) + ' mg / L';
  }

  gEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select the gas type (CO₂, O₂, N₂, H₂).',
      'Enter gas headspace partial pressure in atmospheres (atm).',
      'Inspect equilibrium dissolved gas concentration.'
    ],
    benefitTitle: 'William Henry\'s 1803 Law and Scuba "Bends"',
    benefitContent: 'At high underwater pressure, nitrogen gas dissolves rapidly into diver blood and lipid tissue; ascending too quickly without decompression stops causes nitrogen to bubble out of solution like soda fizz (Decompression Sickness).',
    faqs: [{ q: 'Why do opened soda cans fizz?', a: 'Opening the can releases the 3 atm CO₂ pressure down to atmospheric 0.0004 atm, drastically reducing CO₂ solubility and causing bubbles to escape.' }]
  },

  // 4. Dipole Moment & Bond Polarity Calculator
  {
    slug: 'dipole-moment-debye-charge-separation-calculator',
    name: 'Electric Dipole Moment (Debye) Calculator',
    description: 'Calculate molecular electric dipole moment (μ = q · d) in Debye (D) and Coulomb-meters from partial charge separation and atomic bond distance.',
    category: 'Science',
    icon: 'text',
    keywords: ['dipole moment calculator', 'molecular dipole moment debye', 'bond polarity calculator online', 'charge separation dipole moment formula', 'debye to coulomb meter converter'],
    order: 312,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Partial Charge (e) & Separation Distance (Ångströms Å)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dp-q">Partial Charge δ (Fraction of e)</label>
          <input class="tool-textarea" id="dp-q" type="number" step="any" value="0.33" placeholder="0.33 e (Water H-O)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dp-d">Bond Distance d (Ångströms Å)</label>
          <input class="tool-textarea" id="dp-d" type="number" step="any" value="0.96" placeholder="0.96 Å (Water bond)" />
        </div>
      </div>
      <div id="dp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dp-res-debye" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.52 Debye</span>
            <span class="stat-label">Dipole Moment (μ in Debye)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dp-res-cm" style="font-family:monospace; font-weight:700;">5.07 × 10⁻³⁰ C·m</span>
            <span class="stat-label">SI Units (Coulomb·meters)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('dp-q'), dEl = document.getElementById('dp-d');
  const debEl = document.getElementById('dp-res-debye'), cmEl = document.getElementById('dp-res-cm');

  const eCharge = 1.602176634e-19; // Coulombs
  const debyeUnit = 3.33564e-30; // 1 Debye in C*m

  function update() {
    const qFrac = parseFloat(qEl.value), dAng = parseFloat(dEl.value);
    if (isNaN(qFrac) || isNaN(dAng) || qFrac <= 0 || dAng <= 0) return;

    const qCoulomb = qFrac * eCharge;
    const dMeters = dAng * 1e-10;

    // mu = q * d (C*m)
    const muCm = qCoulomb * dMeters;
    const muDebye = muCm / debyeUnit;

    debEl.textContent = muDebye.toFixed(2) + ' Debye';
    cmEl.textContent = muCm.toExponential(2) + ' C·m';
  }

  qEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter partial charge separation δ as a fraction of elementary charge e (e.g. 0.33e).',
      'Enter bond length distance d in Ångströms (1 Å = 10⁻¹⁰ meters).',
      'Inspect molecular electric dipole moment in Debye and SI Coulomb-meters.'
    ],
    benefitTitle: 'Peter Debye\'s Molecular Polarity Unit',
    benefitContent: 'Named after Nobel laureate Peter Debye (1936), the Debye unit quantifies molecular polarity: non-polar molecules like CO₂ have μ = 0 D, whereas highly polar water has a permanent dipole moment of μ = 1.85 D.',
    faqs: [{ q: 'What is 1 Debye in SI units?', a: '1 Debye = 10⁻¹⁸ statcoulomb-centimeter ≈ 3.33564 × 10⁻³⁰ Coulomb-meters.' }]
  },

  // 5. Molecular Orbital Bond Order & Stability Calculator
  {
    slug: 'bond-order-molecular-orbital-calculator',
    name: 'Molecular Orbital Bond Order & Stability Calculator',
    description: 'Calculate chemical bond order (Bond Order = ½ · (Bonding Electrons - Antibonding Electrons)) and magnetic properties (Paramagnetic vs Diamagnetic) for diatomic molecules.',
    category: 'Science',
    icon: 'text',
    keywords: ['bond order calculator', 'molecular orbital bond order formula', 'bonding minus antibonding electrons calculator', 'paramagnetic diamagnetic bond order', 'o2 n2 bond order online'],
    order: 313,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bonding (N_b) & Antibonding (N_a) Valence Electrons',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bo-nb">Bonding Electrons (N_b)</label>
          <input class="tool-textarea" id="bo-nb" type="number" min="0" max="20" value="8" placeholder="8 (e.g. N₂ or O₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bo-na">Antibonding Electrons (N_a)</label>
          <input class="tool-textarea" id="bo-na" type="number" min="0" max="20" value="2" placeholder="2 (e.g. N₂)" />
        </div>
      </div>
      <div id="bo-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bo-res-order" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bond Order = 3.0</span>
            <span class="stat-label">Covalent Bond Order (Triple Bond)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bo-res-stab" style="color:var(--green-dark); font-weight:700;">Extremely Stable Molecule</span>
            <span class="stat-label">Thermodynamic Stability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nbEl = document.getElementById('bo-nb'), naEl = document.getElementById('bo-na');
  const ordEl = document.getElementById('bo-res-order'), stabEl = document.getElementById('bo-res-stab');

  function update() {
    const nb = parseInt(nbEl.value, 10), na = parseInt(naEl.value, 10);
    if (isNaN(nb) || isNaN(na) || nb < 0 || na < 0) return;

    // Bond Order = 0.5 * (Nb - Na)
    const bo = 0.5 * (nb - na);

    ordEl.textContent = 'Bond Order = ' + bo.toFixed(1);

    if (bo === 3.0) {
      ordEl.textContent += ' (Triple Bond)';
      stabEl.textContent = 'Extremely Stable & High Bond Dissociation Energy';
      stabEl.style.color = '#22543d';
    } else if (bo === 2.0) {
      ordEl.textContent += ' (Double Bond)';
      stabEl.textContent = 'Stable Covalent Bond';
      stabEl.style.color = '#22543d';
    } else if (bo === 1.0) {
      ordEl.textContent += ' (Single Bond)';
      stabEl.textContent = 'Stable Single Covalent Bond';
      stabEl.style.color = '#2563eb';
    } else if (bo > 0) {
      ordEl.textContent += ' (Fractional Resonance Bond)';
      stabEl.textContent = 'Transient / Radical Species';
      stabEl.style.color = '#d97706';
    } else {
      ordEl.textContent += ' (No Bond Formed)';
      stabEl.textContent = 'Unstable / Does Not Exist in Standard Conditions (e.g. He₂)';
      stabEl.style.color = '#c53030';
    }
  }

  nbEl.addEventListener('input', update);
  naEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total number of valence bonding electrons (N_b) from molecular orbital diagram.',
      'Enter total number of antibonding electrons (N_a) in starred orbitals (σ*, π*).',
      'Inspect resulting covalent bond order and molecular bond stability.'
    ],
    benefitTitle: 'Molecular Orbital (MO) Theory Power',
    benefitContent: 'MO theory accurately predicts that oxygen (O₂, Bond Order = 2.0) contains two unpaired electrons in degenerate π* antibonding orbitals, explaining why liquid oxygen is visibly attracted to magnetic fields (paramagnetic).',
    faqs: [{ q: 'Why does Helium dimer (He₂) not form?', a: 'He₂ has 2 bonding and 2 antibonding electrons; Bond Order = ½·(2 - 2) = 0, meaning no net chemical bond can hold the atoms together.' }]
  }
];

toolsSuiteZ.forEach(createTool);
console.log('Suite Z complete: 5 tools created.');
