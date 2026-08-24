const { createTool } = require('./generate-curated-tools.cjs');

// Suite KK: 5 Tools in AC Impedance, Dielectric Capacitance, Poynting Vectors & Bohr Energy Levels to reach 493 tools
const toolsSuiteKK = [
  // 1. RLC Series Circuit AC Impedance & Phase Angle Calculator
  {
    slug: 'ac-impedance-rlc-series-circuit-calculator',
    name: 'RLC Series Circuit AC Impedance & Phase Angle Calculator',
    description: 'Calculate total complex AC impedance (Z = √(R² + (X_L - X_C)²)), phase angle (θ = arctan((X_L - X_C)/R)), and resonant frequency for series RLC networks.',
    category: 'Science',
    icon: 'text',
    keywords: ['rlc circuit impedance calculator', 'ac impedance z calculator online', 'inductive capacitive reactance formula', 'phase angle rlc series calculator', 'complex impedance ohms online'],
    order: 364,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Resistance (R), Inductance (L), Capacitance (C) & Frequency (Hz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rlc-r">Resistance R (Ω)</label>
          <input class="tool-textarea" id="rlc-r" type="number" step="any" value="50" placeholder="50 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rlc-l">Inductance L (mH)</label>
          <input class="tool-textarea" id="rlc-l" type="number" step="any" value="10" placeholder="10 mH" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rlc-c">Capacitance C (μF)</label>
          <input class="tool-textarea" id="rlc-c" type="number" step="any" value="4.7" placeholder="4.7 μF" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rlc-f">AC Frequency (Hz)</label>
          <input class="tool-textarea" id="rlc-f" type="number" step="any" value="1000" placeholder="1000 Hz" />
        </div>
      </div>
      <div id="rlc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rlc-res-z" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">57.89 Ω</span>
            <span class="stat-label">Total AC Impedance (|Z|)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rlc-res-theta" style="font-weight:700;">+30.29° (Inductive)</span>
            <span class="stat-label">Phase Angle (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rlc-res-f0">f₀ = 734.1 Hz</span>
            <span class="stat-label">Resonance Frequency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('rlc-r'), lEl = document.getElementById('rlc-l');
  const cEl = document.getElementById('rlc-c'), fEl = document.getElementById('rlc-f');
  const zResEl = document.getElementById('rlc-res-z'), thResEl = document.getElementById('rlc-res-theta'), f0ResEl = document.getElementById('rlc-res-f0');

  function update() {
    const R = parseFloat(rEl.value), lMh = parseFloat(lEl.value), cUf = parseFloat(cEl.value), fHz = parseFloat(fEl.value);
    if (isNaN(R) || isNaN(lMh) || isNaN(cUf) || isNaN(fHz) || R < 0 || lMh <= 0 || cUf <= 0 || fHz <= 0) return;

    const L = lMh * 1e-3;
    const C = cUf * 1e-6;
    const omega = 2 * Math.PI * fHz;

    // Reactances: XL = omega*L, XC = 1 / (omega*C)
    const XL = omega * L;
    const XC = 1 / (omega * C);
    const Xnet = XL - XC;

    // Total Impedance Z = sqrt(R^2 + (XL - XC)^2)
    const Z = Math.sqrt(Math.pow(R, 2) + Math.pow(Xnet, 2));

    // Phase angle theta = atan(Xnet / R)
    const rad = Math.atan2(Xnet, R);
    const deg = (rad * 180) / Math.PI;

    // Resonance f0 = 1 / (2*pi*sqrt(L*C))
    const f0 = 1 / (2 * Math.PI * Math.sqrt(L * C));

    zResEl.textContent = Z.toFixed(2) + ' Ω';
    thResEl.textContent = (deg >= 0 ? '+' : '') + deg.toFixed(2) + '° (' + (deg > 0 ? 'Inductive' : (deg < 0 ? 'Capacitive' : 'Resonant')) + ')';
    f0ResEl.textContent = 'f₀ = ' + (f0 >= 1000 ? (f0 / 1000).toFixed(2) + ' kHz' : f0.toFixed(1) + ' Hz');
  }

  [rEl, lEl, cEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter series resistance in Ohms (Ω).',
      'Enter inductance in milliHenrys (mH) and capacitance in microFarads (μF).',
      'Enter AC driving frequency in Hertz (Hz).',
      'Inspect total complex impedance |Z|, phase angle θ, and natural series resonant frequency f₀.'
    ],
    benefitTitle: 'AC Phasor Vector Addition',
    benefitContent: 'Because voltage across an inductor leads current by +90° while capacitor voltage lags by -90°, inductive and capacitive reactances directly cancel each other out (X_net = X_L - X_C), leaving pure resistance R at resonance.',
    faqs: [{ q: 'What happens to RLC impedance at resonance (f = f₀)?', a: 'At resonance, X_L = X_C, net reactance becomes zero, and total circuit impedance reaches its minimum value Z = R.' }]
  },

  // 2. Parallel Plate Capacitor with Dielectric Constant Calculator
  {
    slug: 'parallel-plate-dielectric-capacitance-calculator',
    name: 'Parallel Plate Capacitor & Dielectric Constant Calculator',
    description: 'Calculate electrostatic capacitance (C = (ε₀ · ε_r · A) / d) in picoFarads (pF) and electric field breakdown limits for parallel plate capacitors.',
    category: 'Science',
    icon: 'text',
    keywords: ['parallel plate capacitor calculator', 'dielectric constant capacitance formula', 'capacitance plate area distance calculator', 'epsilon 0 epsilon r area over d online', 'picofarad capacitor sizing'],
    order: 365,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Plate Area (cm²), Plate Separation (mm) & Dielectric',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pp-area">Plate Area A (cm²)</label>
          <input class="tool-textarea" id="pp-area" type="number" step="any" value="50" placeholder="50 cm²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pp-d">Plate Spacing d (mm)</label>
          <input class="tool-textarea" id="pp-d" type="number" step="any" value="0.5" placeholder="0.5 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pp-diel">Dielectric Medium (ε_r)</label>
          <select class="tool-textarea" id="pp-diel">
            <option value="1.0" selected>Vacuum / Air (ε_r = 1.0)</option>
            <option value="2.1">PTFE / Teflon (ε_r = 2.1)</option>
            <option value="3.9">Silicon Dioxide SiO₂ (ε_r = 3.9)</option>
            <option value="4.8">Mica (ε_r = 4.8)</option>
            <option value="80.0">Water (ε_r = 80.0)</option>
          </select>
        </div>
      </div>
      <div id="pp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pp-res-c" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">88.54 pF</span>
            <span class="stat-label">Calculated Capacitance (C)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pp-res-gain">1.00x Base Vacuum Capacitance</span>
            <span class="stat-label">Dielectric Boost</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('pp-area'), dEl = document.getElementById('pp-d'), epsEl = document.getElementById('pp-diel');
  const cResEl = document.getElementById('pp-res-c'), gResEl = document.getElementById('pp-res-gain');

  const eps0 = 8.8541878128e-12; // F / m

  function update() {
    const aCm2 = parseFloat(aEl.value), dMm = parseFloat(dEl.value), epsR = parseFloat(epsEl.value);
    if (isNaN(aCm2) || isNaN(dMm) || isNaN(epsR) || aCm2 <= 0 || dMm <= 0 || epsR < 1) return;

    const aM2 = aCm2 * 1e-4;
    const dM = dMm * 1e-3;

    // C = (eps0 * epsR * A) / d
    const C = (eps0 * epsR * aM2) / dM;
    const cPf = C * 1e12;
    const cNf = C * 1e9;

    cResEl.textContent = cPf >= 1000 ? cNf.toFixed(2) + ' nF' : cPf.toFixed(2) + ' pF';
    gResEl.textContent = epsR.toFixed(1) + 'x Relative Permittivity (ε_r)';
  }

  [aEl, dEl, epsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter plate surface overlap area in square centimeters (cm²).',
      'Enter gap distance thickness between plates in millimeters (mm).',
      'Select dielectric insulator material (Air, Teflon, Mica, SiO₂).',
      'Inspect resulting capacitance in picoFarads (pF) or nanoFarads (nF).'
    ],
    benefitTitle: 'Dielectric Dipole Polarization',
    benefitContent: 'Inserting a dielectric insulator between capacitor plates causes molecular electric dipoles to align against the applied electric field, reducing internal field strength and allowing more charge to accumulate for the same applied voltage.',
    faqs: [{ q: 'What is the permittivity of free space (ε₀)?', a: 'ε₀ ≈ 8.854 × 10⁻¹² Farads per meter (F/m).' }]
  },

  // 3. Poynting Vector & Electromagnetic Wave Intensity Calculator
  {
    slug: 'poynting-vector-em-wave-intensity-calculator',
    name: 'Poynting Vector & Electromagnetic Radiation Intensity Calculator',
    description: 'Calculate electromagnetic wave power intensity (S = (E²) / (2 · μ₀ · c)) in Watts per square meter (W/m²) and magnetic field amplitude (B = E / c) from peak electric field strength.',
    category: 'Science',
    icon: 'text',
    keywords: ['poynting vector calculator', 'electromagnetic wave intensity calculator', 'em radiation power density w m2', 'electric to magnetic field amplitude em wave', 'poynting vector s formula online'],
    order: 366,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Peak Electric Field Strength E₀ (V/m)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="pv-e">Peak Electric Field E₀ (V/m)</label>
        <input class="tool-textarea" id="pv-e" type="number" step="any" value="1000" placeholder="1000 V/m (Solar Radiation at Earth)" />
      </div>
      <div id="pv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pv-res-s" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,326.3 W / m²</span>
            <span class="stat-label">Average Time-Harmonic Intensity (⟨S⟩)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pv-res-b" style="font-weight:700;">3.34 μT</span>
            <span class="stat-label">Peak Magnetic Field (B₀ = E₀ / c)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('pv-e');
  const sResEl = document.getElementById('pv-res-s'), bResEl = document.getElementById('pv-res-b');

  const cSpeed = 299792458; // m / s
  const mu0 = 4 * Math.PI * 1e-7;

  function update() {
    const E0 = parseFloat(eEl.value);
    if (isNaN(E0) || E0 <= 0) return;

    // Time-average Poynting flux <S> = (E0^2) / (2 * mu0 * c)
    const S = (Math.pow(E0, 2)) / (2 * mu0 * cSpeed);
    // B0 = E0 / c
    const B0 = E0 / cSpeed;
    const bMicroT = B0 * 1e6;

    sResEl.textContent = S >= 1000 ? (S / 1000).toFixed(2) + ' kW / m²' : S.toFixed(1) + ' W / m²';
    bResEl.textContent = bMicroT.toFixed(2) + ' μT (' + B0.toExponential(2) + ' Tesla)';
  }

  eEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter peak electric field amplitude E₀ in Volts per meter (V/m).',
      'Inspect average electromagnetic wave radiation intensity in Watts/m² and peak magnetic induction B₀ in microTeslas.'
    ],
    benefitTitle: 'John Henry Poynting\'s 1884 Energy Flow Theorem',
    benefitContent: 'The Poynting vector S = (1/μ₀) · (E × B) defines the directional energy flux density (Watts/m²) transported across space by propagating electromagnetic waves, explaining solar radiation and radio RF transmissions.',
    faqs: [{ q: 'What is the electric field of sunlight reaching Earth\'s upper atmosphere?', a: 'Solar constant intensity S ≈ 1,361 W/m² corresponds to a peak electric field E₀ ≈ 1,013 V/m and magnetic field B₀ ≈ 3.38 μT.' }]
  },

  // 4. Photon Momentum & Solar Sail Radiation Pressure Calculator
  {
    slug: 'photon-momentum-radiation-pressure-calculator',
    name: 'Photon Momentum & Radiation Pressure Calculator',
    description: 'Calculate photon momentum (p = h / λ), radiation pressure (P = 2·I/c for perfect reflection), and solar sail propulsive thrust in space.',
    category: 'Science',
    icon: 'text',
    keywords: ['radiation pressure calculator', 'photon momentum formula calculator', 'solar sail thrust calculator online', 'pressure of light p 2i over c', 'optomechanical radiation pressure online'],
    order: 367,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solar Irradiance Intensity (W/m²) & Sail Area (m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rad-i">Radiation Intensity (W/m²)</label>
          <input class="tool-textarea" id="rad-i" type="number" step="any" value="1361" placeholder="1361 W/m² (Earth Orbit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-area">Reflective Sail Area (m²)</label>
          <input class="tool-textarea" id="rad-area" type="number" step="any" value="1000" placeholder="1000 m² (31.6m × 31.6m)" />
        </div>
      </div>
      <div id="rad-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rad-res-press" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">9.08 μPa</span>
            <span class="stat-label">Radiation Pressure (P = 2I/c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rad-res-thrust" style="font-weight:700;">9.08 milliNewtons (mN)</span>
            <span class="stat-label">Total Continuous Solar Sail Thrust</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('rad-i'), aEl = document.getElementById('rad-area');
  const pResEl = document.getElementById('rad-res-press'), tResEl = document.getElementById('rad-res-thrust');

  const cSpeed = 299792458; // m / s

  function update() {
    const I = parseFloat(iEl.value), areaM2 = parseFloat(aEl.value);
    if (isNaN(I) || isNaN(areaM2) || I <= 0 || areaM2 <= 0) return;

    // For a 100% reflective mirror sail: P = 2 * I / c (Pascals = N / m^2)
    const pressurePa = (2 * I) / cSpeed;
    const pressUpa = pressurePa * 1e6;

    // Force = Pressure * Area
    const forceN = pressurePa * areaM2;
    const forceMn = forceN * 1000;

    pResEl.textContent = pressUpa.toFixed(2) + ' μPa (' + pressurePa.toExponential(2) + ' N/m²)';
    tResEl.textContent = forceMn >= 1.0 ? forceMn.toFixed(2) + ' mN (' + (forceN * 101.97).toFixed(1) + ' grams thrust)' : (forceN * 1e6).toFixed(1) + ' μN';
  }

  iEl.addEventListener('input', update);
  aEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter sunlight irradiance intensity in Watts/m² (1,361 W/m² at 1 AU).',
      'Enter reflective solar sail area in square meters (m²).',
      'Inspect radiation pressure in microPascals (μPa) and continuous propulsive thrust in milliNewtons.'
    ],
    benefitTitle: 'James Clerk Maxwell\'s Light Pressure Prediction',
    benefitContent: 'Photons carry momentum (p = E/c); reflecting off a shiny mirror imparts double momentum (2p), producing continuous fuel-free propulsion for interplanetary solar sails like NASA\'s ACS3 and JAXA\'s IKAROS.',
    faqs: [{ q: 'How much thrust does 1,000 m² of solar sail produce at 1 AU?', a: 'P = 2 × 1,361 / 3×10⁸ ≈ 9.08 μPa; on a 1,000 m² sail, this produces ~9.08 milliNewtons (~0.93 grams-force) of continuous thrust.' }]
  },

  // 5. Bohr Model Hydrogen Energy Levels & Spectral Transitions Calculator
  {
    slug: 'bohr-model-hydrogen-energy-levels-calculator',
    name: 'Bohr Hydrogen Atom Energy Levels & Spectral Transitions Calculator',
    description: 'Calculate quantized electron energy levels (E_n = -13.6 eV / n²), Bohr orbital radii (r_n = n² · a₀), and emitted photon wavelengths (Rydberg formula) for hydrogen atom quantum transitions.',
    category: 'Science',
    icon: 'text',
    keywords: ['bohr model calculator', 'hydrogen energy level formula', 'rydberg formula spectral transitions', 'lyman balmer paschen series calculator', 'electron quantum state energy 13.6 ev'],
    order: 368,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Quantum Level (n_i) & Final Level (n_f)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bohr-ni">Initial Level (n_i)</label>
          <input class="tool-textarea" id="bohr-ni" type="number" min="2" max="10" value="3" placeholder="3 (e.g. n=3 to n=2 H-alpha)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bohr-nf">Final Level (n_f)</label>
          <input class="tool-textarea" id="bohr-nf" type="number" min="1" max="9" value="2" placeholder="2 (Balmer Visible Series)" />
        </div>
      </div>
      <div id="bohr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bohr-res-lambda" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">656.3 nm (Red H-α)</span>
            <span class="stat-label">Emitted Photon Wavelength (λ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bohr-res-energy" style="font-weight:700;">1.889 eV</span>
            <span class="stat-label">Photon Energy (ΔE)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bohr-res-series">Balmer Series (Visible Light)</span>
            <span class="stat-label">Spectral Series</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const niEl = document.getElementById('bohr-ni'), nfEl = document.getElementById('bohr-nf');
  const lResEl = document.getElementById('bohr-res-lambda'), eResEl = document.getElementById('bohr-res-energy'), sResEl = document.getElementById('bohr-res-series');

  const R_inf = 1.0973731568508e7; // Rydberg constant m^-1

  function update() {
    const ni = parseInt(niEl.value, 10), nf = parseInt(nfEl.value, 10);
    if (isNaN(ni) || isNaN(nf) || ni <= nf || nf < 1) {
      lResEl.textContent = 'Ensure n_i > n_f ≥ 1';
      return;
    }

    // Rydberg: 1/lambda = R_inf * (1/nf^2 - 1/ni^2)
    const invLambda = R_inf * ((1 / Math.pow(nf, 2)) - (1 / Math.pow(ni, 2)));
    const lambdaM = 1 / invLambda;
    const lambdaNm = lambdaM * 1e9;

    // Delta E = 13.6 * (1/nf^2 - 1/ni^2) eV
    const deltaE = 13.605693 * ((1 / Math.pow(nf, 2)) - (1 / Math.pow(ni, 2)));

    let colorName = '';
    if (nf === 1) colorName = ' (Lyman UV)';
    else if (nf === 2) {
      if (ni === 3) colorName = ' (Red H-α 656nm)';
      else if (ni === 4) colorName = ' (Cyan H-β 486nm)';
      else if (ni === 5) colorName = ' (Blue H-γ 434nm)';
      else colorName = ' (Violet H-δ)';
    } else if (nf === 3) colorName = ' (Paschen Infrared)';
    else colorName = ' (Infrared)';

    lResEl.textContent = lambdaNm.toFixed(1) + ' nm' + colorName;
    eResEl.textContent = deltaE.toFixed(3) + ' eV (' + (deltaE * 1.60218e-19).toExponential(2) + ' J)';

    if (nf === 1) sResEl.textContent = 'Lyman Series (Ultraviolet)';
    else if (nf === 2) sResEl.textContent = 'Balmer Series (Visible Spectrum)';
    else if (nf === 3) sResEl.textContent = 'Paschen Series (Near Infrared)';
    else sResEl.textContent = 'Brackett / Pfund Series (Far Infrared)';
  }

  niEl.addEventListener('input', update);
  nfEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter upper initial quantum principal number n_i (e.g. 3) and lower final level n_f (e.g. 2).',
      'Inspect emitted photon wavelength in nanometers (nm), transition photon energy in electron-Volts (eV), and astronomical spectral series name.'
    ],
    benefitTitle: 'Niels Bohr\'s 1913 Quantized Angular Momentum Model',
    benefitContent: 'Bohr proved that electrons exist in discrete quantized orbital shells (L = n·ħ); transitions between energy states emit photons with exact energies matching the Balmer spectral lines of interstellar hydrogen nebulae.',
    faqs: [{ q: 'What is the wavelength of the famous hydrogen-alpha (H-α) line?', a: 'The n=3 to n=2 Balmer transition produces the crimson-red H-alpha spectral line at exactly 656.3 nm.' }]
  }
];

toolsSuiteKK.forEach(createTool);
console.log('Suite KK complete: 5 tools created.');
