const { createTool } = require('./generate-curated-tools.cjs');

const tools10 = [
  // 1. Snell's Law & Refraction Index Calculator
  {
    slug: 'snells-law-refraction-calculator',
    name: 'Snell\'s Law Refraction & Critical Angle Calculator',
    description: 'Calculate refraction angle (n₁·sin θ₁ = n₂·sin θ₂), critical angle, and total internal reflection for light passing between optical media.',
    category: 'Science',
    icon: 'text',
    keywords: ['snells law calculator', 'refraction angle calculator', 'critical angle total internal reflection', 'optics light refraction formula', 'refractive index calculator online'],
    order: 149,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Optical Media Refractive Indices & Angle',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sn-n1">Medium 1 Refractive Index (n₁)</label>
          <input class="tool-textarea" id="sn-n1" type="number" step="any" value="1.0003" placeholder="1.0003 (Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sn-deg1">Angle of Incidence θ₁ (Degrees)</label>
          <input class="tool-textarea" id="sn-deg1" type="number" min="0" max="90" step="any" value="30" placeholder="30°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sn-n2">Medium 2 Refractive Index (n₂)</label>
          <input class="tool-textarea" id="sn-n2" type="number" step="any" value="1.333" placeholder="1.333 (Water) or 1.52 (Glass)" />
        </div>
      </div>
      <div id="sn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sn-res-deg2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">22.09°</span>
            <span class="stat-label">Angle of Refraction (θ₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sn-res-crit" style="font-weight:700;">-</span>
            <span class="stat-label">Critical Angle (θc)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('sn-n1'), deg1El = document.getElementById('sn-deg1'), n2El = document.getElementById('sn-n2');
  const d2El = document.getElementById('sn-res-deg2'), critEl = document.getElementById('sn-res-crit');

  function update() {
    const n1 = parseFloat(n1El.value), deg1 = parseFloat(deg1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(deg1) || isNaN(n2) || n1 <= 0 || n2 <= 0 || deg1 < 0 || deg1 > 90) return;

    const rad1 = (deg1 * Math.PI) / 180;
    const sinTheta2 = (n1 * Math.sin(rad1)) / n2;

    if (sinTheta2 > 1.0) {
      d2El.textContent = 'Total Internal Reflection (TIR)';
      d2El.style.color = '#c53030';
    } else {
      const rad2 = Math.asin(sinTheta2);
      const deg2 = (rad2 * 180) / Math.PI;
      d2El.textContent = deg2.toFixed(2) + '°';
      d2El.style.color = '#22543d';
    }

    if (n1 > n2) {
      const critRad = Math.asin(n2 / n1);
      const critDeg = (critRad * 180) / Math.PI;
      critEl.textContent = critDeg.toFixed(2) + '°';
    } else {
      critEl.textContent = 'None (Light moving into denser medium)';
    }
  }

  [n1El, deg1El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter refractive index of origin medium (n₁) and incident angle θ₁.',
      'Enter refractive index of destination medium (n₂).',
      'Inspect the refracted beam angle or Total Internal Reflection (TIR) threshold.'
    ],
    benefitTitle: 'Snell\'s Law & Optical Fiber Waveguides',
    benefitContent: 'When light travels from an optically denser medium (high n) to a less dense medium at an incident angle exceeding the critical angle (θ > θc), 100% of light is reflected back without loss — the physical principle behind modern fiber optic internet cables.',
    faqs: [{ q: 'What is the refractive index of diamond?', a: 'Diamond has an exceptionally high refractive index of ~2.42, giving it a very small critical angle (24.4°) that produces intense internal brilliance and sparkle.' }]
  },

  // 2. Planck Photon Energy Calculator (E = hf)
  {
    slug: 'photon-energy-planck-calculator',
    name: 'Photon Energy & Planck Equation Calculator',
    description: 'Calculate photon quantum energy (E = h · f = h · c / λ) in Joules and Electron-Volts (eV) from light wavelength or electromagnetic frequency.',
    category: 'Science',
    icon: 'text',
    keywords: ['photon energy calculator', 'planck equation calculator', 'wavelength to ev calculator', 'quantum photon energy online', 'ehf light energy calculator'],
    order: 150,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electromagnetic Wavelength or Frequency',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ph-wl">Light Wavelength (Nanometers nm)</label>
          <input class="tool-textarea" id="ph-wl" type="number" step="any" value="550" placeholder="e.g. 550 nm (Green Light)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ph-freq">Frequency (THz) [Optional]</label>
          <input class="tool-textarea" id="ph-freq" type="number" step="any" placeholder="Frequency" />
        </div>
      </div>
      <div id="ph-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ph-res-ev" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.25 eV</span>
            <span class="stat-label">Photon Energy (Electron-Volts eV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ph-res-joules" style="font-family:monospace; font-weight:700;">3.61 × 10⁻¹⁹ J</span>
            <span class="stat-label">Energy in Joules (J)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ph-res-calc-freq">545.07 THz</span>
            <span class="stat-label">Wave Frequency (f)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wlEl = document.getElementById('ph-wl'), fEl = document.getElementById('ph-freq');
  const evEl = document.getElementById('ph-res-ev'), jEl = document.getElementById('ph-res-joules'), frqEl = document.getElementById('ph-res-calc-freq');

  const h = 6.62607015e-34; // Planck's constant (J·s)
  const c = 299792458; // Speed of light (m/s)
  const eV_J = 1.602176634e-19; // Joules per eV

  function updateFromWl() {
    const wlNm = parseFloat(wlEl.value);
    if (isNaN(wlNm) || wlNm <= 0) return;

    const lambdaM = wlNm * 1e-9;
    const freqHz = c / lambdaM;
    const freqThz = freqHz / 1e12;
    const eJoules = (h * c) / lambdaM;
    const eEv = eJoules / eV_J;

    fEl.value = freqThz.toFixed(2);
    evEl.textContent = eEv.toFixed(3) + ' eV';
    jEl.textContent = eJoules.toExponential(2) + ' J';
    frqEl.textContent = freqThz.toFixed(2) + ' THz';
  }

  function updateFromFreq() {
    const freqThz = parseFloat(fEl.value);
    if (isNaN(freqThz) || freqThz <= 0) return;

    const freqHz = freqThz * 1e12;
    const lambdaM = c / freqHz;
    const wlNm = lambdaM * 1e9;
    const eJoules = h * freqHz;
    const eEv = eJoules / eV_J;

    wlEl.value = wlNm.toFixed(1);
    evEl.textContent = eEv.toFixed(3) + ' eV';
    jEl.textContent = eJoules.toExponential(2) + ' J';
    frqEl.textContent = freqThz.toFixed(2) + ' THz';
  }

  wlEl.addEventListener('input', updateFromWl);
  fEl.addEventListener('input', updateFromFreq);
  updateFromWl();
})();`,
    howToSteps: [
      'Enter light wavelength in nanometers (e.g. 400nm Violet to 700nm Red).',
      'Or enter electromagnetic frequency in Terahertz (THz).',
      'Inspect single photon quantum energy in Electron-Volts (eV) and Joules.'
    ],
    benefitTitle: 'Quantum Energy & The Photoelectric Effect',
    benefitContent: 'Max Planck and Albert Einstein showed that electromagnetic radiation is quantized into discrete wave packets called photons with energy E = h·f.',
    faqs: [{ q: 'What is the energy of a 550nm green photon?', a: 'A 550nm green light photon carries approximately 2.25 eV (3.61 × 10⁻¹⁹ Joules).' }]
  },

  // 3. Reynolds Number Flow Regime Calculator
  {
    slug: 'reynolds-number-calculator',
    name: 'Reynolds Number & Flow Regime Calculator',
    description: 'Calculate pipe fluid Reynolds Number (Re = ρ·v·D / μ) to classify fluid motion into Laminar (Re below 2300), Transient, or Turbulent (Re above 4000) regimes.',
    category: 'Science',
    icon: 'text',
    keywords: ['reynolds number calculator', 'fluid flow regime calculator', 'laminar vs turbulent flow', 'pipe fluid mechanics reynolds formula', 'viscosity reynolds number online'],
    order: 151,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fluid & Pipe Geometry Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="re-rho">Fluid Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="re-rho" type="number" step="any" value="1000" placeholder="1000 (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="re-vel">Flow Velocity v (m/s)</label>
          <input class="tool-textarea" id="re-vel" type="number" step="any" value="0.5" placeholder="0.5 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="re-diam">Pipe Inner Diameter D (meters)</label>
          <input class="tool-textarea" id="re-diam" type="number" step="any" value="0.05" placeholder="0.05 m (50 mm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="re-visc">Dynamic Viscosity μ (Pa·s)</label>
          <input class="tool-textarea" id="re-visc" type="number" step="any" value="0.001" placeholder="0.001 (Water at 20°C)" />
        </div>
      </div>
      <div id="re-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="re-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">25,000</span>
            <span class="stat-label">Reynolds Number (Re)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="re-res-regime" style="color:#c53030; font-weight:700;">Turbulent Flow</span>
            <span class="stat-label">Flow Regime Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rhoEl = document.getElementById('re-rho'), vEl = document.getElementById('re-vel');
  const dEl = document.getElementById('re-diam'), muEl = document.getElementById('re-visc');
  const reValEl = document.getElementById('re-res-val'), regEl = document.getElementById('re-res-regime');

  function update() {
    const rho = parseFloat(rhoEl.value), v = parseFloat(vEl.value), D = parseFloat(dEl.value), mu = parseFloat(muEl.value);
    if (isNaN(rho) || isNaN(v) || isNaN(D) || isNaN(mu) || rho <= 0 || v <= 0 || D <= 0 || mu <= 0) return;

    // Re = (rho * v * D) / mu
    const Re = (rho * v * D) / mu;

    reValEl.textContent = Math.round(Re).toLocaleString();

    if (Re < 2300) {
      regEl.textContent = 'Laminar Flow (Smooth, streamlined layers)';
      regEl.style.color = '#22543d';
    } else if (Re <= 4000) {
      regEl.textContent = 'Transitional Flow (Unstable boundary layer)';
      regEl.style.color = '#d97706';
    } else {
      regEl.textContent = 'Turbulent Flow (Vortices & chaotic mixing)';
      regEl.style.color = '#c53030';
    }
  }

  [rhoEl, vEl, dEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fluid density (ρ) and dynamic viscosity (μ).',
      'Enter mean flow velocity (v) and internal pipe diameter (D).',
      'Inspect the dimensionless Reynolds Number and flow turbulence classification.'
    ],
    benefitTitle: 'Why Reynolds Number is Dimensionless',
    benefitContent: 'Reynolds number represents the dimensionless ratio of inertial forces to viscous forces in fluid dynamics: Re = (Inertial Forces) / (Viscous Forces).',
    faqs: [{ q: 'What is the critical Reynolds Number for pipe flow?', a: 'For circular pipe flow, the critical transition occurs at Re ≈ 2,300.' }]
  },

  // 4. Simple Pendulum Period & Frequency Calculator
  {
    slug: 'pendulum-period-calculator',
    name: 'Simple Pendulum Period & Frequency Calculator',
    description: 'Calculate pendulum oscillation period (T = 2π · √(L/g)), harmonic frequency (f = 1/T), and required string length from target timing.',
    category: 'Science',
    icon: 'text',
    keywords: ['pendulum period calculator', 'simple pendulum formula', 'pendulum frequency calculator', 'physics pendulum oscillation time', 'length of pendulum for 1 second'],
    order: 152,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pendulum Length & Gravity',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pen-len">Pendulum String Length L (meters)</label>
          <input class="tool-textarea" id="pen-len" type="number" step="any" value="0.994" placeholder="e.g. 0.994 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pen-g">Gravitational Acceleration g (m/s²)</label>
          <input class="tool-textarea" id="pen-g" type="number" step="any" value="9.80665" placeholder="9.80665 (Earth)" />
        </div>
      </div>
      <div id="pen-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pen-res-period" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.000 s</span>
            <span class="stat-label">Oscillation Period (T = 2π√(L/g))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pen-res-freq" style="font-weight:700;">0.500 Hz</span>
            <span class="stat-label">Frequency (f = 1/T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pen-res-half">1.000 s</span>
            <span class="stat-label">Half-Period (Single Tick)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('pen-len'), gEl = document.getElementById('pen-g');
  const tEl = document.getElementById('pen-res-period'), fEl = document.getElementById('pen-res-freq'), hEl = document.getElementById('pen-res-half');

  function update() {
    const L = parseFloat(lEl.value), g = parseFloat(gEl.value);
    if (isNaN(L) || isNaN(g) || L <= 0 || g <= 0) return;

    // T = 2 * pi * sqrt(L / g)
    const T = 2 * Math.PI * Math.sqrt(L / g);
    const freq = 1 / T;

    tEl.textContent = T.toFixed(3) + ' s';
    fEl.textContent = freq.toFixed(3) + ' Hz';
    hEl.textContent = (T / 2).toFixed(3) + ' s';
  }

  lEl.addEventListener('input', update);
  gEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the pendulum suspension cord length in meters.',
      'Optionally adjust gravitational acceleration (Earth standard is 9.80665 m/s²).',
      'Inspect the full oscillation back-and-forth period and single swing duration.'
    ],
    benefitTitle: 'Seconds Pendulum Discovery',
    benefitContent: 'A "seconds pendulum" is one whose period is exactly 2 seconds (so each one-way tick takes precisely 1 second). On Earth, its length is approximately 0.994 meters (39.1 inches).',
    faqs: [{ q: 'Does bob mass affect pendulum period?', a: 'No, in simple harmonic motion with small amplitude angles (<15°), period is completely independent of the bob\'s mass.' }]
  },

  // 5. Specific Heat Capacity Thermal Energy Calculator
  {
    slug: 'heat-capacity-specific-heat-calculator',
    name: 'Specific Heat Capacity & Thermal Energy Calculator',
    description: 'Calculate thermal heat energy transfer (Q = m · c · ΔT), required heating power, and final equilibrium temperature.',
    category: 'Science',
    icon: 'text',
    keywords: ['specific heat capacity calculator', 'thermal energy calculator q mc delta t', 'heat required to warm water', 'calorimetry thermal calculator', 'specific heat formula online'],
    order: 153,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass, Material Specific Heat & Temp Change',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ht-mat">Material Preset</label>
          <select class="tool-textarea" id="ht-mat">
            <option value="4184" selected>Water (4,184 J/kg·°C)</option>
            <option value="900">Aluminum (900 J/kg·°C)</option>
            <option value="450">Iron / Steel (450 J/kg·°C)</option>
            <option value="385">Copper (385 J/kg·°C)</option>
            <option value="129">Lead (129 J/kg·°C)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ht-mass">Substance Mass m (kg)</label>
          <input class="tool-textarea" id="ht-mass" type="number" step="any" value="2" placeholder="e.g. 2 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ht-dt">Temperature Change ΔT (°C or K)</label>
          <input class="tool-textarea" id="ht-dt" type="number" step="any" value="50" placeholder="e.g. 50 °C" />
        </div>
      </div>
      <div id="ht-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ht-res-kj" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">418.40 kJ</span>
            <span class="stat-label">Thermal Energy Transferred (Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ht-res-kcal" style="font-weight:700;">100.00 kcal</span>
            <span class="stat-label">Energy in Kilocalories</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ht-res-kwh">0.116 kWh</span>
            <span class="stat-label">Energy in kWh</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('ht-mat'), mEl = document.getElementById('ht-mass'), dtEl = document.getElementById('ht-dt');
  const kjEl = document.getElementById('ht-res-kj'), kcalEl = document.getElementById('ht-res-kcal'), kwhEl = document.getElementById('ht-res-kwh');

  function update() {
    const c = parseFloat(matEl.value);
    const m = parseFloat(mEl.value);
    const dt = parseFloat(dtEl.value);

    if (isNaN(c) || isNaN(m) || isNaN(dt) || m <= 0 || dt === 0) return;

    // Q = m * c * deltaT (in Joules)
    const qJoules = m * c * dt;
    const qKj = qJoules / 1000;
    const qKcal = Math.abs(qJoules) / 4184;
    const qKwh = Math.abs(qJoules) / 3600000;

    kjEl.textContent = (qKj >= 0 ? '+' : '-') + Math.abs(qKj).toFixed(2) + ' kJ';
    kcalEl.textContent = qKcal.toFixed(2) + ' kcal';
    kwhEl.textContent = qKwh.toFixed(3) + ' kWh';
  }

  matEl.addEventListener('change', update);
  mEl.addEventListener('input', update);
  dtEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Choose substance material preset or enter specific heat capacity (J/kg·°C).',
      'Enter mass in kilograms and temperature change (ΔT) in Celsius.',
      'Inspect the required heating/cooling thermal energy in kJ, kcal, and kWh.'
    ],
    benefitTitle: 'High Specific Heat of Water',
    benefitContent: 'Water possesses an unusually high specific heat capacity (4,184 J/kg·°C), making it an extraordinary thermal coolant in automotive radiators and planetary climate moderator.',
    faqs: [{ q: 'How much energy to boil 1 kg of water from 20°C to 100°C?', a: 'Q = 1 kg × 4,184 J/kg·°C × 80°C = 334.72 kJ (~0.093 kWh).' }]
  }
];

tools10.forEach(createTool);
console.log('Mega pack 10 complete.');
