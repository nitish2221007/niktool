const { createTool } = require('./generate-curated-tools.cjs');

// Suite II: 5 Tools in Electromagnetism, Magnetic Fields, Cyclotron & Hall Effect to reach 483 tools
const toolsSuiteII = [
  // 1. Electric Field Strength (Coulomb's Law) Calculator
  {
    slug: 'coulomb-law-electric-field-calculator',
    name: 'Electric Field Strength (Coulomb\'s Law) Calculator',
    description: 'Calculate electrostatic electric field strength (E = (k · |q|) / r²) in Newtons per Coulomb (N/C) and Volts per meter (V/m) from point charge magnitude and distance.',
    category: 'Science',
    icon: 'text',
    keywords: ['electric field calculator', 'coulomb law electric field formula', 'point charge electric field strength', 'electrostatic field intensity n c online', 'electric field distance calculator'],
    order: 354,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Charge Magnitude (q) & Radial Distance (r)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ef-q">Point Charge q (MicroCoulombs μC)</label>
          <input class="tool-textarea" id="ef-q" type="number" step="any" value="5.0" placeholder="5.0 μC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ef-r">Distance r (Meters)</label>
          <input class="tool-textarea" id="ef-r" type="number" step="any" value="0.25" placeholder="0.25 m" />
        </div>
      </div>
      <div id="ef-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ef-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">7.19 × 10⁵ N / C</span>
            <span class="stat-label">Electric Field Strength (E)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ef-res-pot" style="font-weight:700;">179.8 kV</span>
            <span class="stat-label">Electric Potential (V = k·q/r)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('ef-q'), rEl = document.getElementById('ef-r');
  const eResEl = document.getElementById('ef-res-val'), vResEl = document.getElementById('ef-res-pot');

  const kCoulomb = 8.9875517923e9; // N*m^2 / C^2

  function update() {
    const qUc = parseFloat(qEl.value), rM = parseFloat(rEl.value);
    if (isNaN(qUc) || isNaN(rM) || qUc === 0 || rM <= 0) return;

    const qC = qUc * 1e-6;
    // E = (k * |q|) / r^2
    const E = (kCoulomb * Math.abs(qC)) / Math.pow(rM, 2);
    // V = (k * q) / r
    const V = (kCoulomb * qC) / rM;
    const vKv = V / 1000;

    eResEl.textContent = E.toExponential(2) + ' N/C (V/m)';
    vResEl.textContent = Math.abs(vKv) >= 1000 ? (vKv / 1000).toFixed(2) + ' MV' : vKv.toFixed(1) + ' kV';
  }

  qEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter source point charge in microCoulombs (μC).',
      'Enter radial distance from charge in meters.',
      'Inspect electric field strength (N/C) and electrostatic potential (kV).'
    ],
    benefitTitle: 'Inverse-Square Field Propagation',
    benefitContent: 'According to Gauss\'s Law, the electric flux spreading from a spherical point charge diminishes with the square of the distance (E ∝ 1/r²).',
    faqs: [{ q: 'What is 1 N/C in Volts per meter?', a: '1 Newton per Coulomb (N/C) is dimensionally identical to 1 Volt per meter (V/m).' }]
  },

  // 2. Magnetic Field Around Straight Wire (Biot-Savart / Ampère's Law)
  {
    slug: 'biot-savart-magnetic-field-wire-calculator',
    name: 'Magnetic Field Around Straight Wire (Ampère\'s Law) Calculator',
    description: 'Calculate magnetic flux density (B = (μ₀ · I) / (2 · π · r)) in Tesla and Gauss around a straight current-carrying electrical conductor.',
    category: 'Science',
    icon: 'text',
    keywords: ['magnetic field straight wire calculator', 'biot savart law wire calculator', 'amperes law magnetic field formula', 'tesla to gauss magnetic field wire', 'magnetic flux density wire online'],
    order: 355,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Conductor Current (Amps) & Radial Distance (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mag-i">Current I (Amps)</label>
          <input class="tool-textarea" id="mag-i" type="number" step="any" value="50" placeholder="50 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mag-r">Distance r (Centimeters)</label>
          <input class="tool-textarea" id="mag-r" type="number" step="any" value="5.0" placeholder="5.0 cm" />
        </div>
      </div>
      <div id="mag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mag-res-b" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">2.00 × 10⁻⁴ T (200.0 μT)</span>
            <span class="stat-label">Magnetic Flux Density (B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mag-res-gauss" style="font-weight:700;">2.00 Gauss</span>
            <span class="stat-label">Magnetic Field (CGS Units)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('mag-i'), rEl = document.getElementById('mag-r');
  const bResEl = document.getElementById('mag-res-b'), gResEl = document.getElementById('mag-res-gauss');

  const mu0 = 4 * Math.PI * 1e-7; // T*m / A

  function update() {
    const I = parseFloat(iEl.value), rCm = parseFloat(rEl.value);
    if (isNaN(I) || isNaN(rCm) || I <= 0 || rCm <= 0) return;

    const rM = rCm / 100;
    // B = (mu0 * I) / (2 * pi * r)
    const B = (mu0 * I) / (2 * Math.PI * rM);
    const bMicroT = B * 1e6;
    const gauss = B * 10000; // 1 T = 10,000 Gauss

    bResEl.textContent = B.toExponential(2) + ' T (' + bMicroT.toFixed(1) + ' μT)';
    gResEl.textContent = gauss.toFixed(2) + ' Gauss (' + (bMicroT / 50).toFixed(1) + 'x Earth Field)';
  }

  iEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter electric current flowing through wire in Amperes.',
      'Enter perpendicular distance from wire center in centimeters.',
      'Inspect magnetic field B in microTeslas (μT), Teslas (T), and Gauss compared to Earth\'s magnetic field (~50 μT).'
    ],
    benefitTitle: 'André-Marie Ampère and Biot-Savart',
    benefitContent: 'Current flowing through a conductor creates concentric circular magnetic field lines according to the right-hand rule (curl fingers along B with thumb pointing along current I).',
    faqs: [{ q: 'How many Gauss is 1 Tesla?', a: '1 Tesla (T) = exactly 10,000 Gauss (G).' }]
  },

  // 3. Cyclotron Frequency & Gyro-Radius (Larmor Radius) Calculator
  {
    slug: 'cyclotron-frequency-radius-calculator',
    name: 'Cyclotron Resonance Frequency & Gyroradius Calculator',
    description: 'Calculate charged particle cyclotron frequency (f_c = (q · B) / (2 · π · m)) and orbital gyroradius (r_L = (m · v) / (q · B)) in uniform magnetic fields.',
    category: 'Science',
    icon: 'text',
    keywords: ['cyclotron frequency calculator', 'larmor radius calculator', 'gyroradius particle in magnetic field', 'cyclotron resonance formula online', 'magnetic lorentz force orbit radius'],
    order: 356,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Particle Type, Velocity (m/s) & Magnetic Field (Tesla)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cyc-part">Charged Particle</label>
          <select class="tool-textarea" id="cyc-part">
            <option value="9.1093837e-31,1.602176634e-19" selected>Electron (e⁻)</option>
            <option value="1.67262192e-27,1.602176634e-19">Proton (p⁺)</option>
            <option value="6.6446572e-27,3.20435327e-19">Alpha Particle (He²⁺)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-b">Magnetic Field B (Tesla)</label>
          <input class="tool-textarea" id="cyc-b" type="number" step="any" value="1.5" placeholder="1.5 T (MRI Magnet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-v">Particle Speed v (m/s)</label>
          <input class="tool-textarea" id="cyc-v" type="number" step="any" value="1000000" placeholder="1,000,000 m/s" />
        </div>
      </div>
      <div id="cyc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cyc-res-freq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">41.97 GHz</span>
            <span class="stat-label">Cyclotron Frequency (f_c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cyc-res-rad" style="font-weight:700;">3.79 μm</span>
            <span class="stat-label">Gyroradius Orbit (r_L)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('cyc-part'), bEl = document.getElementById('cyc-b'), vEl = document.getElementById('cyc-v');
  const fResEl = document.getElementById('cyc-res-freq'), rResEl = document.getElementById('cyc-res-rad');

  function update() {
    const [m, q] = pEl.value.split(',').map(Number);
    const B = parseFloat(bEl.value), v = parseFloat(vEl.value);
    if (isNaN(B) || isNaN(v) || B <= 0 || v <= 0 || !m || !q) return;

    // f_c = (q * B) / (2 * pi * m)
    const fHz = (q * B) / (2 * Math.PI * m);
    // r_L = (m * v) / (q * B)
    const rM = (m * v) / (q * B);

    const fGhz = fHz / 1e9;
    const fMhz = fHz / 1e6;
    fResEl.textContent = fGhz >= 1.0 ? fGhz.toFixed(2) + ' GHz' : fMhz.toFixed(2) + ' MHz';

    const rUm = rM * 1e6;
    const rMm = rM * 1000;
    rResEl.textContent = rM >= 1.0 ? rM.toFixed(2) + ' meters' : (rMm >= 1.0 ? rMm.toFixed(2) + ' mm' : rUm.toFixed(2) + ' μm');
  }

  pEl.addEventListener('change', update);
  bEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select particle (Electron, Proton, Alpha).',
      'Enter magnetic field strength in Tesla.',
      'Enter particle velocity perpendicular to field in m/s.',
      'Inspect circular orbital cyclotron resonance frequency and gyroradius (Larmor radius).'
    ],
    benefitTitle: 'Ernest Lawrence\'s 1934 Cyclotron Accelerator',
    benefitContent: 'Because cyclotron orbital frequency (f_c) is independent of particle speed or orbit radius at non-relativistic velocities, fixed-frequency RF electric fields can accelerate particles continuously to high energies.',
    faqs: [{ q: 'Why is cyclotron frequency independent of particle speed?', a: 'As particle speed v increases, orbit radius r expands proportionally (r ∝ v), keeping the orbital period (T = 2πr/v = 2πm/qB) perfectly constant.' }]
  },

  // 4. Hall Effect Voltage & Charge Carrier Density Calculator
  {
    slug: 'hall-effect-voltage-calculator',
    name: 'Hall Effect Voltage & Carrier Density Calculator',
    description: 'Calculate transverse Hall voltage (V_H = (I · B) / (n · q · t)) and determine majority charge carrier density (n) in semiconductor sensors and metals.',
    category: 'Science',
    icon: 'text',
    keywords: ['hall effect calculator', 'hall voltage formula calculator', 'semiconductor carrier density hall effect', 'hall sensor magnetic field voltage', 'transverse hall potential online'],
    order: 357,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Current (I), Magnetic Field (B), Thickness (t) & Carrier Density (n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hl-i">Current I (mA)</label>
          <input class="tool-textarea" id="hl-i" type="number" step="any" value="10" placeholder="10 mA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hl-b">Field B (Tesla)</label>
          <input class="tool-textarea" id="hl-b" type="number" step="any" value="0.5" placeholder="0.5 T" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hl-t">Wafer Thickness t (μm)</label>
          <input class="tool-textarea" id="hl-t" type="number" step="any" value="2.0" placeholder="2.0 μm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hl-n">Carrier Density n (10²¹ m⁻³)</label>
          <input class="tool-textarea" id="hl-n" type="number" step="any" value="5.0" placeholder="5.0 (Semiconductor)" />
        </div>
      </div>
      <div id="hl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hl-res-vh" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.12 mV</span>
            <span class="stat-label">Hall Voltage (V_H)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hl-res-rh" style="font-weight:700;">1.25 × 10⁻³ m³ / C</span>
            <span class="stat-label">Hall Coefficient (R_H = 1 / nq)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('hl-i'), bEl = document.getElementById('hl-b'), tEl = document.getElementById('hl-t'), nEl = document.getElementById('hl-n');
  const vhResEl = document.getElementById('hl-res-vh'), rhResEl = document.getElementById('hl-res-rh');

  const qCharge = 1.602176634e-19;

  function update() {
    const iMa = parseFloat(iEl.value), B = parseFloat(bEl.value), tUm = parseFloat(tEl.value), nVal = parseFloat(nEl.value);
    if (isNaN(iMa) || isNaN(B) || isNaN(tUm) || isNaN(nVal) || iMa <= 0 || B <= 0 || tUm <= 0 || nVal <= 0) return;

    const I = iMa * 1e-3;
    const tM = tUm * 1e-6;
    const n = nVal * 1e21; // Carrier density per m^3

    // V_H = (I * B) / (n * q * t)
    const vH = (I * B) / (n * qCharge * tM);
    const vHMv = vH * 1000;
    const rH = 1 / (n * qCharge);

    vhResEl.textContent = vHMv >= 1.0 ? vHMv.toFixed(2) + ' mV' : (vH * 1e6).toFixed(1) + ' μV';
    rhResEl.textContent = rH.toExponential(2) + ' m³ / C';
  }

  [iEl, bEl, tEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter sensor bias current in milliamps (mA).',
      'Enter perpendicular magnetic flux density in Tesla.',
      'Enter semiconductor thickness in micrometers (μm) and carrier concentration.',
      'Inspect generated transverse Hall voltage (mV).'
    ],
    benefitTitle: 'Edwin Hall\'s 1879 Galvanomagnetic Effect',
    benefitContent: 'The Hall effect reveals whether conduction in a semiconductor is dominated by negative electrons (n-type) or positive holes (p-type) based on the polarity sign of the generated Hall potential.',
    faqs: [{ q: 'Where are Hall effect sensors used?', a: 'In brushless DC motor brushless commutation, smartphone compasses, current clamps, and anti-lock brake wheel speed sensors.' }]
  },

  // 5. Faraday's Law of Electromagnetic Induction Calculator
  {
    slug: 'faraday-law-electromagnetic-induction-calculator',
    name: 'Faraday\'s Law of Electromagnetic Induction Calculator',
    description: 'Calculate induced electromotive force voltage (EMF ε = -N · (ΔΦ / Δt)) from coil turns (N) and rate of magnetic flux change.',
    category: 'Science',
    icon: 'text',
    keywords: ['faradays law calculator', 'induced emf calculator online', 'electromagnetic induction formula', 'rate of change of magnetic flux emf', 'lenz law induced voltage calculator'],
    order: 358,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Coil Turns (N), Magnetic Flux Change (ΔΦ) & Time (Δt)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="far-n">Number of Turns (N)</label>
          <input class="tool-textarea" id="far-n" type="number" min="1" step="1" value="250" placeholder="250 Turns" />
        </div>
        <div class="control-group">
          <label class="control-label" for="far-dphi">Flux Change ΔΦ (milliWebers mWb)</label>
          <input class="tool-textarea" id="far-dphi" type="number" step="any" value="4.0" placeholder="4.0 mWb" />
        </div>
        <div class="control-group">
          <label class="control-label" for="far-dt">Time Interval Δt (milliseconds ms)</label>
          <input class="tool-textarea" id="far-dt" type="number" step="any" value="20" placeholder="20 ms" />
        </div>
      </div>
      <div id="far-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="far-res-emf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">50.00 Volts</span>
            <span class="stat-label">Induced Electromotive Force (|EMF|)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="far-res-rate" style="font-weight:700;">0.200 Wb / s</span>
            <span class="stat-label">Flux Time Derivative (dΦ/dt)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('far-n'), phiEl = document.getElementById('far-dphi'), tEl = document.getElementById('far-dt');
  const emfResEl = document.getElementById('far-res-emf'), rResEl = document.getElementById('far-res-rate');

  function update() {
    const N = parseInt(nEl.value, 10), dPhiMwb = parseFloat(phiEl.value), dtMs = parseFloat(tEl.value);
    if (isNaN(N) || isNaN(dPhiMwb) || isNaN(dtMs) || N < 1 || dtMs <= 0) return;

    const dPhiWb = dPhiMwb * 1e-3;
    const dtSec = dtMs * 1e-3;

    // Rate = dPhi / dt (Webers / sec = Volts)
    const rate = dPhiWb / dtSec;
    // EMF = N * (dPhi / dt)
    const emf = N * rate;

    emfResEl.textContent = Math.abs(emf).toFixed(2) + ' Volts';
    rResEl.textContent = rate.toFixed(3) + ' Wb / s';
  }

  [nEl, phiEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total number of wire turns N in the coil inductor.',
      'Enter magnetic flux change ΔΦ in milliWebers (mWb = 10⁻³ Wb).',
      'Enter elapsed time duration Δt in milliseconds (ms).',
      'Inspect generated induced voltage (EMF).'
    ],
    benefitTitle: 'Michael Faraday\'s 1831 Induction Law & Lenz\'s Rule',
    benefitContent: 'Electromagnetic induction underpins all modern electric power generators and transformers: moving a magnetic field through a conductive coil induces an opposing electric current (Lenz\'s Law).',
    faqs: [{ q: 'What is 1 Weber per second in SI units?', a: 'A magnetic flux change of 1 Weber per second (1 Wb/s) across a single turn induces exactly 1 Volt of electromotive force.' }]
  }
];

toolsSuiteII.forEach(createTool);
console.log('Suite II complete: 5 tools created.');
