const { createTool } = require('./generate-curated-tools.cjs');

// Suite JJ: 5 Tools in Inductance, Magnetic/Electric Energy Storage & Dipole Moments to reach 488 tools
const toolsSuiteJJ = [
  // 1. Solenoid Inductance & Coil Design Calculator
  {
    slug: 'inductance-solenoid-coil-calculator',
    name: 'Air-Core & Ferromagnetic Solenoid Inductance Calculator',
    description: 'Calculate self-inductance (L = (μ₀ · μ_r · N² · A) / l) in microHenrys (μH) and milliHenrys (mH) for cylindrical coil inductors and electromagnets.',
    category: 'Science',
    icon: 'text',
    keywords: ['solenoid inductance calculator', 'coil inductance formula online', 'microhenry inductor calculator', 'air core solenoid inductance formula', 'electromagnet turns inductance online'],
    order: 359,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Turns (N), Radius (mm), Length (mm) & Core Material',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sol-n">Number of Turns (N)</label>
          <input class="tool-textarea" id="sol-n" type="number" min="1" value="100" placeholder="100" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-r">Coil Radius r (mm)</label>
          <input class="tool-textarea" id="sol-r" type="number" step="any" value="10" placeholder="10 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-l">Coil Length l (mm)</label>
          <input class="tool-textarea" id="sol-l" type="number" step="any" value="50" placeholder="50 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-core">Core Material</label>
          <select class="tool-textarea" id="sol-core">
            <option value="1" selected>Air Core (μ_r = 1.0)</option>
            <option value="250">Ferrite Core (μ_r ≈ 250)</option>
            <option value="2000">Iron / Silicon Steel (μ_r ≈ 2,000)</option>
          </select>
        </div>
      </div>
      <div id="sol-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sol-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">78.96 μH</span>
            <span class="stat-label">Calculated Self-Inductance (L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sol-res-turns">2,000 turns/m</span>
            <span class="stat-label">Turns Density (n = N / l)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('sol-n'), rEl = document.getElementById('sol-r');
  const lEl = document.getElementById('sol-l'), cEl = document.getElementById('sol-core');
  const lResEl = document.getElementById('sol-res-l'), tResEl = document.getElementById('sol-res-turns');

  const mu0 = 4 * Math.PI * 1e-7;

  function update() {
    const N = parseInt(nEl.value, 10), rMm = parseFloat(rEl.value);
    const lMm = parseFloat(lEl.value), muR = parseFloat(cEl.value);

    if (isNaN(N) || isNaN(rMm) || isNaN(lMm) || isNaN(muR) || N < 1 || rMm <= 0 || lMm <= 0 || muR < 1) return;

    const rM = rMm * 1e-3;
    const lM = lMm * 1e-3;
    const areaM2 = Math.PI * Math.pow(rM, 2);

    // L = (mu0 * muR * N^2 * A) / l
    const L = (mu0 * muR * Math.pow(N, 2) * areaM2) / lM;
    const lUh = L * 1e6;
    const lMh = L * 1e3;

    lResEl.textContent = lMh >= 1.0 ? lMh.toFixed(2) + ' mH' : lUh.toFixed(2) + ' μH';
    tResEl.textContent = Math.round(N / lM).toLocaleString() + ' turns/meter';
  }

  [nEl, rEl, lEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter number of coil wire turns N.',
      'Enter solenoid radius and coil length in millimeters.',
      'Select magnetic core material (Air, Ferrite, or Iron core).',
      'Inspect self-inductance in microHenrys (μH) or milliHenrys (mH).'
    ],
    benefitTitle: 'N-Squared Inductance Scaling (N²)',
    benefitContent: 'Inductance scales quadratically with turns (L ∝ N²): doubling the number of turns quadruples the total inductance for the same physical geometry.',
    faqs: [{ q: 'Why do ferrite cores increase inductance?', a: 'High magnetic permeability materials (ferrites with μ_r ≈ 100-1000) concentrate magnetic flux lines, multiplying inductance by hundreds of times.' }]
  },

  // 2. Magnetic Energy Storage in Inductors Calculator
  {
    slug: 'magnetic-energy-inductor-storage-calculator',
    name: 'Inductor Magnetic Energy Storage (E = ½LI²) Calculator',
    description: 'Calculate stored magnetic energy (E = ½ · L · I²) in Joules and millijoules, and magnetic flux linkage (λ = L · I) for inductors and chokes.',
    category: 'Science',
    icon: 'text',
    keywords: ['magnetic energy inductor calculator', 'half l i squared calculator', 'stored magnetic energy formula', 'inductor energy joules online', 'flyback inductor energy calculator'],
    order: 360,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inductance (L in mH) & Current (I in Amps)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mei-l">Inductance L (milliHenrys mH)</label>
          <input class="tool-textarea" id="mei-l" type="number" step="any" value="25" placeholder="25 mH" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mei-i">Current I (Amps)</label>
          <input class="tool-textarea" id="mei-i" type="number" step="any" value="4.0" placeholder="4.0 A" />
        </div>
      </div>
      <div id="mei-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mei-res-energy" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.200 Joules (200 mJ)</span>
            <span class="stat-label">Stored Magnetic Energy (E = ½LI²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mei-res-flux" style="font-weight:700;">0.100 Wb-turns</span>
            <span class="stat-label">Flux Linkage (λ = L·I)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('mei-l'), iEl = document.getElementById('mei-i');
  const eResEl = document.getElementById('mei-res-energy'), fResEl = document.getElementById('mei-res-flux');

  function update() {
    const lMh = parseFloat(lEl.value), I = parseFloat(iEl.value);
    if (isNaN(lMh) || isNaN(I) || lMh <= 0 || I <= 0) return;

    const L = lMh * 1e-3;
    // Energy E = 0.5 * L * I^2 (Joules)
    const energy = 0.5 * L * Math.pow(I, 2);
    const energyMj = energy * 1000;
    const fluxLinkage = L * I;

    eResEl.textContent = energy >= 1.0 ? energy.toFixed(3) + ' Joules' : energyMj.toFixed(1) + ' mJ (' + energy.toFixed(4) + ' J)';
    fResEl.textContent = fluxLinkage.toFixed(3) + ' Wb-turns';
  }

  lEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter inductance in milliHenrys (mH).',
      'Enter peak saturation coil current in Amperes.',
      'Inspect stored magnetic field energy in Joules / millijoules.'
    ],
    benefitTitle: 'Switch-Mode Power Supply (SMPS) Energy Transfer',
    benefitContent: 'Flyback and Boost DC-DC converters store electrical energy in an inductor\'s magnetic field during the switch-ON phase (E = ½LI²) and discharge it into the output capacitor during switch-OFF.',
    faqs: [{ q: 'What is the energy in a 10 mH coil carrying 2 Amps?', a: 'E = ½ × 0.010 H × (2A)² = 0.5 × 0.010 × 4 = 0.020 Joules (20 millijoules).' }]
  },

  // 3. Electrostatic Energy Storage in Capacitors Calculator
  {
    slug: 'electric-energy-capacitor-storage-calculator',
    name: 'Capacitor Electrostatic Energy Storage (E = ½CV²) Calculator',
    description: 'Calculate stored electrostatic energy (E = ½ · C · V²) in Joules and microJoules, and stored electric charge (Q = C · V) across capacitor terminals.',
    category: 'Science',
    icon: 'text',
    keywords: ['capacitor energy calculator', 'half c v squared calculator', 'stored electrostatic energy formula', 'capacitor energy in joules online', 'defibrillator capacitor energy calculator'],
    order: 361,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Capacitance (C in μF) & Voltage (V in Volts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eec-c">Capacitance C (microFarads μF)</label>
          <input class="tool-textarea" id="eec-c" type="number" step="any" value="100" placeholder="100 μF" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eec-v">Voltage V (Volts)</label>
          <input class="tool-textarea" id="eec-v" type="number" step="any" value="400" placeholder="400 V" />
        </div>
      </div>
      <div id="eec-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eec-res-energy" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.00 Joules</span>
            <span class="stat-label">Stored Electrostatic Energy (E = ½CV²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eec-res-charge" style="font-weight:700;">40.0 mC (0.040 C)</span>
            <span class="stat-label">Stored Electric Charge (Q = C·V)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('eec-c'), vEl = document.getElementById('eec-v');
  const eResEl = document.getElementById('eec-res-energy'), qResEl = document.getElementById('eec-res-charge');

  function update() {
    const cUf = parseFloat(cEl.value), V = parseFloat(vEl.value);
    if (isNaN(cUf) || isNaN(V) || cUf <= 0 || V <= 0) return;

    const C = cUf * 1e-6;
    // Energy E = 0.5 * C * V^2 (Joules)
    const energy = 0.5 * C * Math.pow(V, 2);
    // Charge Q = C * V (Coulombs)
    const Q = C * V;
    const qMc = Q * 1000;

    eResEl.textContent = energy >= 0.01 ? energy.toFixed(2) + ' Joules' : (energy * 1e6).toFixed(1) + ' μJ';
    qResEl.textContent = qMc >= 1.0 ? qMc.toFixed(1) + ' mC (' + Q.toFixed(3) + ' C)' : (Q * 1e6).toFixed(1) + ' μC';
  }

  cEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter capacitance in microFarads (μF).',
      'Enter charging potential difference in Volts.',
      'Inspect stored electrostatic energy in Joules and charge in Coulombs.'
    ],
    benefitTitle: 'Defibrillator & Camera Flash Energy Storage',
    benefitContent: 'Medical external defibrillators charge capacitors to several thousand volts to deliver precise energy shocks (150-360 Joules) within milliseconds to restore normal sinus heart rhythm.',
    faqs: [{ q: 'How much energy is stored in a 100 μF capacitor at 400V?', a: 'E = ½ × (100 × 10⁻⁶ F) × (400V)² = 0.5 × 10⁻⁴ × 160,000 = exactly 8.0 Joules.' }]
  },

  // 4. Electric Dipole Torque & Potential Energy in Electric Field
  {
    slug: 'electric-dipole-torque-potential-energy-calculator',
    name: 'Electric Dipole Torque & Potential Energy Calculator',
    description: 'Calculate electrostatic torque (τ = p · E · sin(θ)) and potential energy (U = -p · E · cos(θ)) for an electric dipole aligned at angle θ in a uniform electric field.',
    category: 'Science',
    icon: 'text',
    keywords: ['electric dipole torque calculator', 'dipole potential energy u minus p dot e', 'torque on electric dipole in uniform field', 'p cross e dipole torque online', 'polar molecule torque electric field'],
    order: 362,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dipole Moment (p), Electric Field (E) & Alignment Angle (θ)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="edp-p">Dipole Moment p (Debye)</label>
          <input class="tool-textarea" id="edp-p" type="number" step="any" value="1.85" placeholder="1.85 (Water Molecule)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="edp-e">Electric Field E (V/m)</label>
          <input class="tool-textarea" id="edp-e" type="number" step="any" value="50000" placeholder="50,000 V/m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="edp-theta">Angle θ (Degrees)</label>
          <input class="tool-textarea" id="edp-theta" type="number" min="0" max="180" value="45" placeholder="45°" />
        </div>
      </div>
      <div id="edp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="edp-res-torque" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">2.18 × 10⁻²⁵ N·m</span>
            <span class="stat-label">Aligning Torque (τ = p·E·sin θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="edp-res-u" style="font-family:monospace; font-weight:700;">-2.18 × 10⁻²⁵ J</span>
            <span class="stat-label">Potential Energy (U = -p·E·cos θ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('edp-p'), eEl = document.getElementById('edp-e'), thEl = document.getElementById('edp-theta');
  const tResEl = document.getElementById('edp-res-torque'), uResEl = document.getElementById('edp-res-u');

  const debyeToCm = 3.33564e-30; // C*m per Debye

  function update() {
    const pDeb = parseFloat(pEl.value), E = parseFloat(eEl.value), deg = parseFloat(thEl.value);
    if (isNaN(pDeb) || isNaN(E) || isNaN(deg) || pDeb <= 0 || E <= 0) return;

    const pCm = pDeb * debyeToCm;
    const rad = (deg * Math.PI) / 180;

    // tau = p * E * sin(theta)
    const tau = pCm * E * Math.sin(rad);
    // U = -p * E * cos(theta)
    const U = -pCm * E * Math.cos(rad);

    tResEl.textContent = tau.toExponential(2) + ' N·m';
    uResEl.textContent = U.toExponential(2) + ' Joules (' + (deg === 0 ? 'Stable Minimum' : (deg === 180 ? 'Unstable Max' : 'Intermediate')) + ')';
  }

  [pEl, eEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter electric dipole moment in Debye units.',
      'Enter external electric field strength in V/m (N/C).',
      'Enter orientation angle θ (0° = parallel alignment, 90° = perpendicular max torque, 180° = antiparallel).',
      'Inspect mechanical restoring torque and electrostatic potential energy.'
    ],
    benefitTitle: 'Microwave Oven Dielectric Heating Principle',
    benefitContent: 'Microwave ovens oscillate high-frequency electric fields at 2.45 GHz, applying alternating torque on polar water molecules in food; the resulting molecular friction rapidly heats food throughout.',
    faqs: [{ q: 'When is dipole potential energy minimized?', a: 'When the dipole moment aligns perfectly parallel with the electric field (θ = 0°), potential energy reaches its minimum U = -p·E.' }]
  },

  // 5. Magnetic Dipole Moment Torque in Uniform B-Field Calculator
  {
    slug: 'magnetic-dipole-torque-potential-energy-calculator',
    name: 'Magnetic Dipole Torque & Potential Energy Calculator',
    description: 'Calculate magnetic torque (τ = μ · B · sin(θ)) and magnetic potential energy (U = -μ · B · cos(θ)) for current loops and bar compass magnets in a uniform magnetic field.',
    category: 'Science',
    icon: 'text',
    keywords: ['magnetic dipole torque calculator', 'magnetic moment u minus mu dot b', 'torque on current loop in magnetic field', 'magnetic dipole potential energy online', 'compass needle magnetic torque formula'],
    order: 363,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Magnetic Moment (μ in A·m²), Field (B) & Angle (θ)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mdp-mu">Magnetic Moment μ (A·m²)</label>
          <input class="tool-textarea" id="mdp-mu" type="number" step="any" value="0.5" placeholder="0.5 A·m² (Bar Magnet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mdp-b">Magnetic Field B (Tesla)</label>
          <input class="tool-textarea" id="mdp-b" type="number" step="any" value="1.2" placeholder="1.2 T" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mdp-theta">Angle θ (Degrees)</label>
          <input class="tool-textarea" id="mdp-theta" type="number" min="0" max="180" value="90" placeholder="90° (Max Torque)" />
        </div>
      </div>
      <div id="mdp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mdp-res-torque" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.600 N·m</span>
            <span class="stat-label">Aligning Torque (τ = μ·B·sin θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mdp-res-u" style="font-weight:700;">0.000 Joules</span>
            <span class="stat-label">Potential Energy (U = -μ·B·cos θ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const muEl = document.getElementById('mdp-mu'), bEl = document.getElementById('mdp-b'), thEl = document.getElementById('mdp-theta');
  const tResEl = document.getElementById('mdp-res-torque'), uResEl = document.getElementById('mdp-res-u');

  function update() {
    const mu = parseFloat(muEl.value), B = parseFloat(bEl.value), deg = parseFloat(thEl.value);
    if (isNaN(mu) || isNaN(B) || isNaN(deg) || mu <= 0 || B <= 0) return;

    const rad = (deg * Math.PI) / 180;
    // tau = mu * B * sin(theta)
    const tau = mu * B * Math.sin(rad);
    // U = -mu * B * cos(theta)
    const U = -mu * B * Math.cos(rad);

    tResEl.textContent = tau.toFixed(3) + ' N·m';
    uResEl.textContent = U.toFixed(3) + ' Joules';
  }

  [muEl, bEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter magnetic dipole moment μ in Ampere-square meters (A·m² or Joules/Tesla).',
      'Enter magnetic field B in Tesla.',
      'Enter angle θ in degrees between magnetic dipole vector and B-field lines.',
      'Inspect rotational torque in Newton-meters (N·m) and magnetic potential energy in Joules.'
    ],
    benefitTitle: 'Electric Motor Rotor Torque Foundation',
    benefitContent: 'In electric DC and AC induction motors, current-carrying wire coils act as magnetic dipoles (μ = N·I·A); the continuous torque exerted by the stator magnetic field (τ = μ × B) generates mechanical shaft rotation.',
    faqs: [{ q: 'What is the maximum torque on a magnetic dipole?', a: 'Maximum torque occurs at θ = 90° (perpendicular alignment) where sin(90°) = 1, yielding τ_max = μ · B.' }]
  }
];

toolsSuiteJJ.forEach(createTool);
console.log('Suite JJ complete: 5 tools created.');
