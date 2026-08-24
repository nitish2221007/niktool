const { createTool } = require('./generate-curated-tools.cjs');

// Suite LL: 7 Tools to cross the 500 VALIDATED TOOLS MILESTONE in Quantum Mechanics & Special Relativity
const toolsSuiteLL = [
  // 1. Louis de Broglie Matter Wavelength Calculator
  {
    slug: 'de-broglie-matter-wavelength-calculator',
    name: 'de Broglie Matter Wavelength Calculator',
    description: 'Calculate quantum matter wave de Broglie wavelength (λ = h / (m · v)) and momentum for electrons, neutrons, and macroscopic objects.',
    category: 'Science',
    icon: 'text',
    keywords: ['de broglie wavelength calculator', 'matter wave wavelength formula', 'electron de broglie wavelength online', 'wave particle duality calculator', 'planck constant momentum wavelength online'],
    order: 369,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Particle Mass & Velocity (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="db-part">Particle</label>
          <select class="tool-textarea" id="db-part">
            <option value="9.1093837e-31" selected>Electron (9.11 × 10⁻³¹ kg)</option>
            <option value="1.67262192e-27">Proton (1.67 × 10⁻²⁷ kg)</option>
            <option value="1.67492749e-27">Neutron (1.67 × 10⁻²⁷ kg)</option>
            <option value="0.145">Baseball (0.145 kg)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="db-v">Velocity v (m/s)</label>
          <input class="tool-textarea" id="db-v" type="number" step="any" value="1000000" placeholder="1,000,000 m/s" />
        </div>
      </div>
      <div id="db-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="db-res-lambda" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">0.727 nm (7.27 Å)</span>
            <span class="stat-label">de Broglie Wavelength (λ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="db-res-p" style="font-family:monospace; font-weight:700;">9.11 × 10⁻²⁵ kg·m/s</span>
            <span class="stat-label">Linear Momentum (p = m·v)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('db-part'), vEl = document.getElementById('db-v');
  const lResEl = document.getElementById('db-res-lambda'), pResEl = document.getElementById('db-res-p');

  const hPlanck = 6.62607015e-34; // J*s

  function update() {
    const mKg = parseFloat(pEl.value), vMs = parseFloat(vEl.value);
    if (isNaN(mKg) || isNaN(vMs) || mKg <= 0 || vMs <= 0) return;

    // p = m * v
    const p = mKg * vMs;
    // lambda = h / p
    const lambda = hPlanck / p;
    const lambdaNm = lambda * 1e9;
    const lambdaAng = lambda * 1e10;

    lResEl.textContent = lambda >= 1e-6 ? lambda.toExponential(2) + ' meters' : (lambdaNm >= 1.0 ? lambdaNm.toFixed(3) + ' nm' : lambdaAng.toFixed(2) + ' Å (' + lambda.toExponential(2) + ' m)');
    pResEl.textContent = p.toExponential(2) + ' kg·m/s';
  }

  pEl.addEventListener('change', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select particle (Electron, Proton, Neutron, Baseball).',
      'Enter velocity in meters per second (m/s).',
      'Inspect quantum de Broglie wavelength (nm / Å) and linear momentum.'
    ],
    benefitTitle: 'Louis de Broglie\'s 1924 Wave-Particle Duality Hypothesis',
    benefitContent: 'De Broglie proposed that all moving matter possesses wave properties; an electron moving at 10⁶ m/s has a wavelength comparable to atomic lattice spacings (0.7 nm), enabling Transmission Electron Microscopes (TEM) to resolve individual atoms.',
    faqs: [{ q: 'Why do everyday macroscopic objects not exhibit visible wave diffraction?', a: 'Because macroscopic objects have huge mass m, their de Broglie wavelength is infinitesimal (~10⁻³⁴ meters), making quantum wave diffraction imperceptible.' }]
  },

  // 2. Heisenberg Uncertainty Principle Bound Calculator
  {
    slug: 'heisenberg-uncertainty-principle-calculator',
    name: 'Heisenberg Uncertainty Principle (Δx · Δp ≥ ℏ/2) Calculator',
    description: 'Calculate quantum mechanical uncertainty limits in position (Δx) and momentum / velocity (Δv = ℏ / (2 · m · Δx)) for subatomic particles.',
    category: 'Science',
    icon: 'text',
    keywords: ['heisenberg uncertainty principle calculator', 'delta x delta p hbar over 2 formula', 'position momentum uncertainty online', 'quantum uncertainty bound calculator', 'electron velocity uncertainty calculator'],
    order: 370,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Particle Mass & Position Uncertainty (Δx in Å / nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hup-part">Particle</label>
          <select class="tool-textarea" id="hup-part">
            <option value="9.1093837e-31" selected>Electron (9.11 × 10⁻³¹ kg)</option>
            <option value="1.67262192e-27">Proton (1.67 × 10⁻²⁷ kg)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hup-dx">Position Uncertainty Δx (Ångströms Å)</label>
          <input class="tool-textarea" id="hup-dx" type="number" step="any" value="1.0" placeholder="1.0 Å (Atomic scale)" />
        </div>
      </div>
      <div id="hup-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hup-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">578.8 km / s</span>
            <span class="stat-label">Minimum Velocity Uncertainty (Δv)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hup-res-dp" style="font-family:monospace; font-weight:700;">5.27 × 10⁻²⁵ kg·m/s</span>
            <span class="stat-label">Minimum Momentum Uncertainty (Δp)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('hup-part'), dxEl = document.getElementById('hup-dx');
  const dvResEl = document.getElementById('hup-res-dv'), dpResEl = document.getElementById('hup-res-dp');

  const hBar = 1.054571817e-34; // J*s (h / 2pi)

  function update() {
    const mKg = parseFloat(pEl.value), dxAng = parseFloat(dxEl.value);
    if (isNaN(mKg) || isNaN(dxAng) || mKg <= 0 || dxAng <= 0) return;

    const dxM = dxAng * 1e-10;
    // Delta_p >= hBar / (2 * Delta_x)
    const dp = hBar / (2 * dxM);
    // Delta_v = Delta_p / m
    const dv = dp / mKg;
    const dvKms = dv / 1000;

    dvResEl.textContent = dvKms >= 1.0 ? dvKms.toFixed(1) + ' km/s (' + (dv / 299792.458 * 100).toFixed(2) + '% c)' : dv.toFixed(1) + ' m/s';
    dpResEl.textContent = dp.toExponential(2) + ' kg·m/s';
  }

  pEl.addEventListener('change', update);
  dxEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select particle (Electron or Proton).',
      'Enter spatial confinement position uncertainty Δx in Ångströms (1 Å = 0.1 nm = 10⁻¹⁰ m).',
      'Inspect the fundamental quantum lower bound on velocity uncertainty Δv.'
    ],
    benefitTitle: 'Werner Heisenberg\'s 1927 Foundational Principle',
    benefitContent: 'The uncertainty principle is a fundamental wave mechanics theorem (not an experimental measurement error): confining an electron within a 1 Ångström atomic diameter automatically induces an intrinsic velocity spread of over 578 km/s.',
    faqs: [{ q: 'Why can an electron never be at absolute rest at the center of an atom?', a: 'If an electron were completely stationary (Δp = 0), its position uncertainty would be infinite (Δx = ∞), escaping atomic confinement entirely.' }]
  },

  // 3. Particle in a 1D Infinite Potential Well (Quantum Box) Calculator
  {
    slug: 'schrodinger-infinite-potential-well-calculator',
    name: 'Quantum Particle in a Box (1D Infinite Well) Calculator',
    description: 'Calculate quantized energy eigenvalues (E_n = (n² · π² · ℏ²) / (2 · m · L²) = (n² · h²) / (8 · m · L²)) and transition photon energies for a particle trapped in a 1D potential well.',
    category: 'Science',
    icon: 'text',
    keywords: ['particle in a box calculator', 'infinite potential well energy levels', 'schrodinger 1d box eigenvalues', 'quantum well ground state energy online', 'quantum particle box formula'],
    order: 371,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Quantum State (n) & Well Width (L in nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pib-n">Quantum Level (n)</label>
          <input class="tool-textarea" id="pib-n" type="number" min="1" max="20" value="1" placeholder="1 (Ground State)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pib-l">Well Width L (Nanometers nm)</label>
          <input class="tool-textarea" id="pib-l" type="number" step="any" value="1.0" placeholder="1.0 nm" />
        </div>
      </div>
      <div id="pib-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pib-res-en" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.376 eV</span>
            <span class="stat-label">Energy Eigenvalue (E_n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pib-res-joules" style="font-family:monospace; font-weight:700;">6.02 × 10⁻²⁰ J</span>
            <span class="stat-label">Energy in Joules</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('pib-n'), lEl = document.getElementById('pib-l');
  const enResEl = document.getElementById('pib-res-en'), jResEl = document.getElementById('pib-res-joules');

  const hPlanck = 6.62607015e-34;
  const mElectron = 9.1093837e-31;
  const eVToJ = 1.602176634e-19;

  function update() {
    const n = parseInt(nEl.value, 10), lNm = parseFloat(lEl.value);
    if (isNaN(n) || isNaN(lNm) || n < 1 || lNm <= 0) return;

    const lM = lNm * 1e-9;
    // E_n = (n^2 * h^2) / (8 * m * L^2)  [Joules]
    const energyJ = (Math.pow(n, 2) * Math.pow(hPlanck, 2)) / (8 * mElectron * Math.pow(lM, 2));
    const energyEv = energyJ / eVToJ;

    enResEl.textContent = energyEv >= 1000 ? (energyEv / 1000).toFixed(2) + ' keV' : energyEv.toFixed(3) + ' eV';
    jResEl.textContent = energyJ.toExponential(2) + ' Joules (n = ' + n + ')';
  }

  nEl.addEventListener('input', update);
  lEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter principal quantum number integer n (n = 1, 2, 3...).',
      'Enter quantum well box width L in nanometers (nm).',
      'Inspect quantized electronic energy in electron-Volts (eV) and Joules.'
    ],
    benefitTitle: 'Quantum Dot Nanotechnology Applications',
    benefitContent: 'Semiconductor quantum dots trap electrons in nanoscale potential wells; adjusting nanoparticle diameter L precisely tunes the emitted fluorescence color from red to violet in QLED television displays.',
    faqs: [{ q: 'Why is the ground state energy (n=1) greater than zero?', a: 'By the uncertainty principle, confining a particle inside finite width L prevents its kinetic energy from ever dropping to zero (Zero-Point Energy E₁ > 0).' }]
  },

  // 4. Arthur Compton Scattering X-Ray Wavelength Shift Calculator
  {
    slug: 'compton-scattering-wavelength-shift-calculator',
    name: 'Compton Scattering X-Ray Wavelength Shift Calculator',
    description: 'Calculate photon wavelength shift (Δλ = λ_c · (1 - cos θ) where λ_c = h / (m_e · c) = 2.426 pm) and scattered photon energy after colliding with a stationary electron.',
    category: 'Science',
    icon: 'text',
    keywords: ['compton scattering calculator', 'compton wavelength shift formula', 'x ray photon compton collision online', 'compton wavelength of electron 2.426 pm', 'quantum photon scattering angle calculator'],
    order: 372,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Incident Wavelength (pm) & Scattering Angle (θ)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cpt-lambda">Incident Photon λ₀ (Picometers pm)</label>
          <input class="tool-textarea" id="cpt-lambda" type="number" step="any" value="20.0" placeholder="20.0 pm (Hard X-Ray)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpt-theta">Scattering Angle θ (Degrees)</label>
          <input class="tool-textarea" id="cpt-theta" type="number" min="0" max="180" value="90" placeholder="90°" />
        </div>
      </div>
      <div id="cpt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cpt-res-dlam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">+2.426 pm</span>
            <span class="stat-label">Compton Wavelength Shift (Δλ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cpt-res-prime" style="font-weight:700;">22.426 pm</span>
            <span class="stat-label">Scattered Photon λ\'</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cpt-res-ke">6.71 keV</span>
            <span class="stat-label">Recoil Electron Kinetic Energy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l0El = document.getElementById('cpt-lambda'), thEl = document.getElementById('cpt-theta');
  const dlResEl = document.getElementById('cpt-res-dlam'), lpResEl = document.getElementById('cpt-res-prime'), keResEl = document.getElementById('cpt-res-ke');

  const lambdaC = 2.42631023867; // Compton wavelength in picometers (pm)
  const hc_keV_pm = 1239.841984; // h*c in keV * pm

  function update() {
    const l0Pm = parseFloat(l0El.value), deg = parseFloat(thEl.value);
    if (isNaN(l0Pm) || isNaN(deg) || l0Pm <= 0) return;

    const rad = (deg * Math.PI) / 180;
    // Delta_lambda = lambda_c * (1 - cos(theta))  [pm]
    const deltaLambda = lambdaC * (1 - Math.cos(rad));
    const lambdaPrime = l0Pm + deltaLambda;

    // Energies: E = hc / lambda
    const e0 = hc_keV_pm / l0Pm;
    const ePrime = hc_keV_pm / lambdaPrime;
    const recoilKe = e0 - ePrime;

    dlResEl.textContent = '+' + deltaLambda.toFixed(3) + ' pm';
    lpResEl.textContent = lambdaPrime.toFixed(3) + ' pm (' + ePrime.toFixed(2) + ' keV)';
    keResEl.textContent = recoilKe.toFixed(2) + ' keV Recoil Energy';
  }

  l0El.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter incident X-ray / Gamma-ray photon wavelength in picometers (1 pm = 10⁻¹² m).',
      'Enter deflection scattering angle θ in degrees (180° = direct backscattering).',
      'Inspect Compton wavelength shift (Δλ), scattered photon wavelength (λ\'), and electron recoil kinetic energy.'
    ],
    benefitTitle: 'Arthur Compton\'s 1923 Particle Nature of Light Proof',
    benefitContent: 'Compton treated X-ray photons as relativistic billiard balls colliding elastically with electrons, proving that light carries discrete relativistic particle momentum (p = h/λ) and earning the 1927 Nobel Prize.',
    faqs: [{ q: 'What is the Compton wavelength of an electron (λ_c)?', a: 'λ_c = h / (m_e · c) ≈ 2.4263 picometers (pm).' }]
  },

  // 5. Einstein Photoelectric Effect & Work Function Calculator
  {
    slug: 'einstein-photoelectric-effect-work-function-calculator',
    name: 'Photoelectric Effect & Work Function Calculator',
    description: 'Calculate maximum photoelectron kinetic energy (K_max = h · f - Φ = h · c / λ - Φ) in eV, stopping voltage (V_s), and threshold cutoff wavelength.',
    category: 'Science',
    icon: 'text',
    keywords: ['photoelectric effect calculator', 'work function kmax calculator', 'stopping potential photoelectric formula', 'threshold frequency cutoff wavelength online', 'einstein photoelectric equation online'],
    order: 373,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Incident Light Wavelength (nm) & Metal Work Function (eV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pe-metal">Cathode Metal Work Function (Φ)</label>
          <select class="tool-textarea" id="pe-metal">
            <option value="2.14">Cesium (Φ = 2.14 eV)</option>
            <option value="2.28" selected>Potassium (Φ = 2.28 eV)</option>
            <option value="2.75">Sodium (Φ = 2.75 eV)</option>
            <option value="4.28">Aluminum (Φ = 4.28 eV)</option>
            <option value="4.65">Copper (Φ = 4.65 eV)</option>
            <option value="5.65">Platinum (Φ = 5.65 eV)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pe-lambda">Incident Wavelength λ (nm)</label>
          <input class="tool-textarea" id="pe-lambda" type="number" step="any" value="380" placeholder="380 nm (Near UV / Violet)" />
        </div>
      </div>
      <div id="pe-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pe-res-kmax" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.983 eV</span>
            <span class="stat-label">Max Kinetic Energy (K_max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pe-res-vs" style="font-weight:700;">0.983 Volts</span>
            <span class="stat-label">Stopping Potential (V_stop)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pe-res-cutoff">543.8 nm</span>
            <span class="stat-label">Threshold Cutoff Wavelength</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('pe-metal'), lEl = document.getElementById('pe-lambda');
  const kResEl = document.getElementById('pe-res-kmax'), vsResEl = document.getElementById('pe-res-vs'), cResEl = document.getElementById('pe-res-cutoff');

  const hc_eV_nm = 1239.841984; // h*c in eV * nm

  function update() {
    const phi = parseFloat(mEl.value), lambdaNm = parseFloat(lEl.value);
    if (isNaN(phi) || isNaN(lambdaNm) || phi <= 0 || lambdaNm <= 0) return;

    // Photon energy E = hc / lambda (in eV)
    const ePhoton = hc_eV_nm / lambdaNm;
    const kMax = ePhoton - phi;
    const cutoffNm = hc_eV_nm / phi;

    if (kMax > 0) {
      kResEl.textContent = kMax.toFixed(3) + ' eV';
      kResEl.style.color = '#22543d';
      vsResEl.textContent = kMax.toFixed(3) + ' Volts (V_stop)';
    } else {
      kResEl.textContent = '0.000 eV (No Emission)';
      kResEl.style.color = '#c53030';
      vsResEl.textContent = 'Below Threshold (E_photon < Φ)';
    }

    cResEl.textContent = cutoffNm.toFixed(1) + ' nm (f₀ = ' + (3e17 / cutoffNm / 1e12).toFixed(1) + ' THz)';
  }

  mEl.addEventListener('change', update);
  lEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select cathode metal to load its characteristic work function Φ in electron-Volts (eV).',
      'Enter illumination light wavelength in nanometers (nm).',
      'Inspect maximum ejected photoelectron kinetic energy (K_max), stopping voltage (V_stop), and red-threshold cutoff wavelength.'
    ],
    benefitTitle: 'Albert Einstein\'s 1905 Nobel Prize Discovery',
    benefitContent: 'Einstein showed that light delivers energy in discrete photon packets (E = hf); if a single photon does not possess enough energy to overcome the metal\'s binding work function (Φ), no electrons are emitted regardless of beam intensity.',
    faqs: [{ q: 'What is stopping potential?', a: 'The opposing voltage required to completely decelerate and stop the fastest emitted photoelectrons, satisfying e · V_stop = K_max.' }]
  },

  // 6. Relativistic Length Contraction Calculator
  {
    slug: 'lorentz-length-contraction-relativity-calculator',
    name: 'Relativistic Length Contraction & Lorentz Factor Calculator',
    description: 'Calculate relativistic spatial length contraction (L = L₀ · √(1 - v²/c²) = L₀ / γ) and Lorentz factor (γ) for objects moving near the speed of light.',
    category: 'Science',
    icon: 'text',
    keywords: ['length contraction calculator', 'special relativity length contraction formula', 'lorentz factor gamma calculator online', 'relativistic length contraction percentage', 'einstein special relativity calculator'],
    order: 374,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Proper Rest Length (L₀) & Velocity (Fraction of c)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lc-l0">Proper Rest Length L₀ (Meters)</label>
          <input class="tool-textarea" id="lc-l0" type="number" step="any" value="100" placeholder="100 m (Starship)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lc-beta">Speed v (Fraction of c: 0 to 0.999c)</label>
          <input class="tool-textarea" id="lc-beta" type="number" step="0.01" min="0" max="0.9999" value="0.80" placeholder="0.80c" />
        </div>
      </div>
      <div id="lc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lc-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">60.00 meters</span>
            <span class="stat-label">Contracted Length (L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lc-res-gamma" style="font-weight:700;">γ = 1.667</span>
            <span class="stat-label">Lorentz Factor (γ = 1/√(1-v²/c²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lc-res-shrink">-40.0% Shorter</span>
            <span class="stat-label">Spatial Contraction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l0El = document.getElementById('lc-l0'), bEl = document.getElementById('lc-beta');
  const lResEl = document.getElementById('lc-res-l'), gResEl = document.getElementById('lc-res-gamma'), shResEl = document.getElementById('lc-res-shrink');

  function update() {
    const L0 = parseFloat(l0El.value), beta = parseFloat(bEl.value);
    if (isNaN(L0) || isNaN(beta) || L0 <= 0 || beta < 0 || beta >= 1.0) return;

    // Lorentz factor gamma = 1 / sqrt(1 - beta^2)
    const gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));
    // Contracted length L = L0 / gamma
    const L = L0 / gamma;
    const shrinkPct = ((L0 - L) / L0) * 100;

    lResEl.textContent = L.toFixed(2) + ' meters';
    gResEl.textContent = 'γ = ' + gamma.toFixed(3);
    shResEl.textContent = '-' + shrinkPct.toFixed(1) + '% Shorter';
  }

  l0El.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter proper rest length (L₀) in meters.',
      'Enter relative speed as a fraction of the speed of light (e.g. 0.80 for 80% c).',
      'Inspect contracted length in the stationary observer frame and the relativistic Lorentz dilation factor (γ).'
    ],
    benefitTitle: 'Hendrik Lorentz & Albert Einstein (1905)',
    benefitContent: 'Length contraction occurs strictly along the direction of motion: an outside stationary observer sees a 100-meter starship traveling at 0.80c shortened to exactly 60.0 meters.',
    faqs: [{ q: 'Does a passenger on board the starship feel squeezed?', a: 'No, in the passenger\'s own reference frame, the ship remains at its full rest length of 100 meters, while outside distances appear contracted.' }]
  },

  // 7. Relativistic Kinetic Energy & Total Energy Calculator
  {
    slug: 'relativistic-kinetic-energy-calculator',
    name: 'Relativistic Kinetic Energy & Total Mass-Energy Calculator',
    description: 'Calculate relativistic kinetic energy (K = (γ - 1) · m · c²), total energy (E = γ · m · c²), and relativistic momentum (p = γ · m · v) at near-light speeds.',
    category: 'Science',
    icon: 'text',
    keywords: ['relativistic kinetic energy calculator', 'gamma minus 1 m c squared calculator', 'relativistic total energy calculator online', 'relativistic momentum formula', 'particle kinetic energy special relativity'],
    order: 375,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rest Mass (kg) & Velocity (Fraction of c)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rke-mass">Particle Rest Mass</label>
          <select class="tool-textarea" id="rke-mass">
            <option value="1.67262192e-27" selected>Proton (1.67 × 10⁻²⁷ kg / 938.3 MeV)</option>
            <option value="9.1093837e-31">Electron (9.11 × 10⁻³¹ kg / 0.511 MeV)</option>
            <option value="1.0">1.0 kg Object</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rke-beta">Speed v (Fraction of c: 0 to 0.999c)</label>
          <input class="tool-textarea" id="rke-beta" type="number" step="0.01" min="0" max="0.9999" value="0.90" placeholder="0.90c" />
        </div>
      </div>
      <div id="rke-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rke-res-ke" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.214 GeV</span>
            <span class="stat-label">Relativistic Kinetic Energy (K = (γ-1)mc²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rke-res-gamma" style="font-weight:700;">γ = 2.294</span>
            <span class="stat-label">Lorentz Factor</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rke-res-tot">2.153 GeV</span>
            <span class="stat-label">Total Energy (E = γ·m·c²)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('rke-mass'), bEl = document.getElementById('rke-beta');
  const keResEl = document.getElementById('rke-res-ke'), gResEl = document.getElementById('rke-res-gamma'), tResEl = document.getElementById('rke-res-tot');

  const cSpeed = 299792458; // m / s
  const eVToJ = 1.602176634e-19;

  function update() {
    const mKg = parseFloat(mEl.value), beta = parseFloat(bEl.value);
    if (isNaN(mKg) || isNaN(beta) || mKg <= 0 || beta < 0 || beta >= 1.0) return;

    // Lorentz factor gamma = 1 / sqrt(1 - beta^2)
    const gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));
    // Rest Energy E0 = m * c^2 (Joules)
    const E0_J = mKg * Math.pow(cSpeed, 2);
    // Kinetic energy K = (gamma - 1) * E0
    const K_J = (gamma - 1) * E0_J;
    // Total energy E = gamma * E0
    const E_tot_J = gamma * E0_J;

    const K_eV = K_J / eVToJ;
    const E_tot_eV = E_tot_J / eVToJ;

    if (mKg < 1e-20) {
      // Subatomic formatting in MeV/GeV
      keResEl.textContent = K_eV >= 1e9 ? (K_eV / 1e9).toFixed(3) + ' GeV' : (K_eV / 1e6).toFixed(3) + ' MeV';
      tResEl.textContent = E_tot_eV >= 1e9 ? (E_tot_eV / 1e9).toFixed(3) + ' GeV' : (E_tot_eV / 1e6).toFixed(3) + ' MeV';
    } else {
      // Macroscopic formatting in Joules
      keResEl.textContent = (K_J / 1e15).toFixed(2) + ' Petajoules (' + K_J.toExponential(2) + ' J)';
      tResEl.textContent = (E_tot_J / 1e15).toFixed(2) + ' Petajoules';
    }

    gResEl.textContent = 'γ = ' + gamma.toFixed(3);
  }

  mEl.addEventListener('change', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select particle (Proton, Electron, or 1 kg object).',
      'Enter velocity as a fraction of the speed of light c (e.g. 0.90c).',
      'Inspect relativistic kinetic energy and total mass-energy in MeV/GeV or Joules.'
    ],
    benefitTitle: 'Why Massive Objects Cannot Reach the Speed of Light',
    benefitContent: 'As velocity approaches c (β → 1.0), the Lorentz factor γ diverges to infinity (γ → ∞), requiring infinite kinetic energy to reach the speed of light.',
    faqs: [{ q: 'At what speed does relativistic kinetic energy equal classical ½mv²?', a: 'Only at low speeds (v < 0.1c); at 0.90c, relativistic kinetic energy (1.29 mc²) is more than triple the classical Newtonian prediction (0.405 mc²).' }]
  }
];

toolsSuiteLL.forEach(createTool);
console.log('Suite LL complete: 7 tools created.');
