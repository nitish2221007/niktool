const { createTool } = require('./generate-curated-tools.cjs');

// Suite A: 57 Advanced Tools in Applied Physics, Acoustics, Thermodynamics, Optics & Astronomy
const toolsSuiteA = [
  // 1. Bernoulli's Equation Pipe Flow Calculator
  {
    slug: 'bernoulli-equation-pipe-flow-calculator',
    name: 'Bernoulli\'s Equation & Pipe Flow Calculator',
    description: 'Calculate fluid pressure and velocity changes between varying pipe cross-sections using Bernoulli\'s conservation of energy law.',
    category: 'Science',
    icon: 'text',
    keywords: ['bernoulli equation calculator', 'fluid dynamics pipe flow', 'venturi pressure drop calculator', 'fluid velocity pressure relationship', 'bernoulli principle online'],
    order: 179,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pipe Section 1 and Section 2 Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ber-p1">Pressure P₁ (kPa)</label>
          <input class="tool-textarea" id="ber-p1" type="number" step="any" value="200" placeholder="200 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ber-v1">Velocity v₁ (m/s)</label>
          <input class="tool-textarea" id="ber-v1" type="number" step="any" value="2.0" placeholder="2.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ber-v2">Velocity v₂ (m/s)</label>
          <input class="tool-textarea" id="ber-v2" type="number" step="any" value="5.0" placeholder="5.0 m/s (Constriction)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ber-rho">Fluid Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="ber-rho" type="number" step="any" value="1000" placeholder="1000 (Water)" />
        </div>
      </div>
      <div id="ber-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ber-res-p2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">189.50 kPa</span>
            <span class="stat-label">Pressure at Constriction (P₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ber-res-drop" style="color:#c53030; font-weight:700;">-10.50 kPa</span>
            <span class="stat-label">Venturi Pressure Drop (ΔP)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('ber-p1'), v1El = document.getElementById('ber-v1');
  const v2El = document.getElementById('ber-v2'), rhoEl = document.getElementById('ber-rho');
  const p2El = document.getElementById('ber-res-p2'), dropEl = document.getElementById('ber-res-drop');

  function update() {
    const p1Kpa = parseFloat(p1El.value), v1 = parseFloat(v1El.value);
    const v2 = parseFloat(v2El.value), rho = parseFloat(rhoEl.value);
    if (isNaN(p1Kpa) || isNaN(v1) || isNaN(v2) || isNaN(rho) || rho <= 0 || v1 < 0 || v2 < 0) return;

    const p1Pa = p1Kpa * 1000;
    // P1 + 0.5*rho*v1^2 = P2 + 0.5*rho*v2^2 => P2 = P1 + 0.5*rho*(v1^2 - v2^2)
    const p2Pa = p1Pa + 0.5 * rho * (Math.pow(v1, 2) - Math.pow(v2, 2));
    const p2Kpa = p2Pa / 1000;
    const dropKpa = p2Kpa - p1Kpa;

    p2El.textContent = p2Kpa.toFixed(2) + ' kPa';
    dropEl.textContent = (dropKpa >= 0 ? '+' : '') + dropKpa.toFixed(2) + ' kPa';
  }

  [p1El, v1El, v2El, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial pipe pressure P₁ (in kPa) and velocity v₁.',
      'Enter restricted constriction velocity v₂ and fluid density.',
      'Inspect the resulting pressure drop across the constriction (Venturi effect).'
    ],
    benefitTitle: 'Bernoulli Principle in Fluid Dynamics',
    benefitContent: 'Bernoulli\'s principle states that an increase in fluid velocity occurs simultaneously with a decrease in static fluid pressure or potential energy.',
    faqs: [{ q: 'What causes the Venturi effect in carburetors and atomizers?', a: 'Constricting fluid flow forces velocity to increase, dropping local static pressure and drawing in fuel or auxiliary liquids.' }]
  },

  // 2. Torricelli's Law & Tank Drainage Efflux Calculator
  {
    slug: 'torricelli-law-tank-drain-calculator',
    name: 'Torricelli\'s Law & Tank Drain Calculator',
    description: 'Calculate fluid efflux exit velocity (v = √(2gh)), flow rate, and total drainage time for liquid tanks with bottom orifices.',
    category: 'Science',
    icon: 'text',
    keywords: ['torricelli law calculator', 'tank drainage time calculator', 'fluid efflux velocity formula', 'orifice discharge rate calculator', 'hydraulics tank drain time'],
    order: 180,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tank Depth & Hole Geometry',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="torr-h">Liquid Head Height h (meters)</label>
          <input class="tool-textarea" id="torr-h" type="number" step="any" value="4.0" placeholder="e.g. 4.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="torr-dia">Orifice Hole Diameter (cm)</label>
          <input class="tool-textarea" id="torr-dia" type="number" step="any" value="5.0" placeholder="e.g. 5.0 cm" />
        </div>
      </div>
      <div id="torr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="torr-res-vel" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.86 m/s</span>
            <span class="stat-label">Initial Efflux Velocity (√(2gh))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="torr-res-flow" style="font-weight:700;">17.39 L/s</span>
            <span class="stat-label">Volumetric Discharge Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('torr-h'), diaEl = document.getElementById('torr-dia');
  const velEl = document.getElementById('torr-res-vel'), flowEl = document.getElementById('torr-res-flow');

  const g = 9.80665;

  function update() {
    const h = parseFloat(hEl.value), diaCm = parseFloat(diaEl.value);
    if (isNaN(h) || isNaN(diaCm) || h <= 0 || diaCm <= 0) return;

    // v = sqrt(2 * g * h)
    const v = Math.sqrt(2 * g * h);
    const rM = (diaCm / 100) / 2;
    const area = Math.PI * Math.pow(rM, 2);
    const flowM3s = area * v;
    const flowLps = flowM3s * 1000;

    velEl.textContent = v.toFixed(2) + ' m/s (' + (v * 3.6).toFixed(1) + ' km/h)';
    flowEl.textContent = flowLps.toFixed(2) + ' L/s (' + (flowLps * 60).toFixed(0) + ' L/min)';
  }

  hEl.addEventListener('input', update);
  diaEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter liquid height column above the drain hole in meters.',
      'Enter orifice nozzle hole diameter in centimeters.',
      'Inspect liquid efflux exit velocity and discharge flow rate in Liters per second.'
    ],
    benefitTitle: 'Torricelli\'s Law Derivation',
    benefitContent: 'Evangelista Torricelli discovered in 1643 that liquid exits an open hole at the exact same velocity an object acquires when falling freely from the same height: v = √(2gh).',
    faqs: [{ q: 'Does fluid viscosity affect efflux velocity?', a: 'Torricelli\'s law assumes ideal non-viscous fluids; real-world viscous fluids experience a minor discharge coefficient derate (~0.62 for sharp-edged orifices).' }]
  },

  // 3. Mach Number & Flight Regime Calculator
  {
    slug: 'mach-number-speed-of-sound-calculator',
    name: 'Mach Number & Supersonic Speed Calculator',
    description: 'Calculate aircraft Mach number (M = v / c), flight regimes (Subsonic, Transonic, Supersonic, Hypersonic), and altitude speed of sound.',
    category: 'Science',
    icon: 'text',
    keywords: ['mach number calculator', 'speed of sound altitude calculator', 'supersonic speed calculator', 'mach to kmh converter', 'hypersonic mach calculator'],
    order: 181,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Aircraft Speed & Flight Altitude',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mach-spd">True Airspeed (km/h or knots)</label>
          <div style="display:flex; gap:0.4rem;">
            <input class="tool-textarea" id="mach-spd" type="number" step="any" value="1200" placeholder="1200" style="flex:2;" />
            <select class="tool-textarea" id="mach-unit" style="flex:1;">
              <option value="kmh" selected>km/h</option>
              <option value="mph">mph</option>
              <option value="knots">knots</option>
              <option value="ms">m/s</option>
            </select>
          </div>
        </div>
        <div class="control-group">
          <label class="control-label" for="mach-alt">Altitude (Meters / Feet)</label>
          <input class="tool-textarea" id="mach-alt" type="number" step="any" value="10000" placeholder="10,000 m (33,000 ft)" />
        </div>
      </div>
      <div id="mach-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mach-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Mach 1.11</span>
            <span class="stat-label">Mach Number (M = v / c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mach-res-regime" style="color:#d97706; font-weight:700;">Supersonic Flight</span>
            <span class="stat-label">Flight Regime Classification</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mach-res-sound">1,078 km/h</span>
            <span class="stat-label">Speed of Sound at Altitude</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const spdEl = document.getElementById('mach-spd'), unitEl = document.getElementById('mach-unit'), altEl = document.getElementById('mach-alt');
  const mValEl = document.getElementById('mach-res-val'), regEl = document.getElementById('mach-res-regime'), sndEl = document.getElementById('mach-res-sound');

  function update() {
    const rawSpd = parseFloat(spdEl.value), unit = unitEl.value, altM = parseFloat(altEl.value) || 0;
    if (isNaN(rawSpd) || rawSpd <= 0) return;

    let spdMs = rawSpd;
    if (unit === 'kmh') spdMs = rawSpd / 3.6;
    else if (unit === 'mph') spdMs = rawSpd * 0.44704;
    else if (unit === 'knots') spdMs = rawSpd * 0.514444;

    // ISA standard atmosphere temperature at altitude: T = 15 - 0.0065 * h (up to 11,000m)
    let tempC = 15 - 0.0065 * Math.min(11000, altM);
    if (altM > 11000) tempC = -56.5; // Stratosphere constant
    const tempK = tempC + 273.15;
    // Speed of sound in dry air: c = sqrt(gamma * R * T) = sqrt(1.4 * 287.05 * T)
    const cMs = Math.sqrt(1.4 * 287.05 * tempK);
    const mach = spdMs / cMs;

    mValEl.textContent = 'Mach ' + mach.toFixed(2);
    sndEl.textContent = Math.round(cMs * 3.6) + ' km/h (' + Math.round(cMs) + ' m/s)';

    if (mach < 0.8) {
      regEl.textContent = 'Subsonic Flight (M < 0.8)';
      regEl.style.color = '#22543d';
    } else if (mach <= 1.2) {
      regEl.textContent = 'Transonic Regime (0.8 ≤ M ≤ 1.2)';
      regEl.style.color = '#d97706';
    } else if (mach < 5.0) {
      regEl.textContent = 'Supersonic Flight (1.2 < M < 5.0)';
      regEl.style.color = '#c53030';
    } else {
      regEl.textContent = 'Hypersonic Flight (M ≥ 5.0)';
      regEl.style.color = '#7c3aed';
    }
  }

  [spdEl, unitEl, altEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter aircraft airspeed and select speed units (km/h, mph, knots, m/s).',
      'Enter cruise altitude in meters.',
      'Inspect the computed Mach number and supersonic flight regime.'
    ],
    benefitTitle: 'Why Speed of Sound Decreases with Altitude',
    benefitContent: 'Speed of sound depends directly on absolute air temperature (c ∝ √T). At 10,000 meters altitude where air temperature is -50 °C, the speed of sound drops from 1,235 km/h at sea level down to ~1,078 km/h.',
    faqs: [{ q: 'What Mach number defines hypersonic flight?', a: 'Speeds of Mach 5.0 and above (over 6,000 km/h) are classified as hypersonic.' }]
  },

  // 4. Stefan-Boltzmann Blackbody Radiation Law Calculator
  {
    slug: 'blackbody-stefan-boltzmann-calculator',
    name: 'Stefan-Boltzmann Blackbody Radiation Calculator',
    description: 'Calculate total radiative thermal power (P = ε · σ · A · T⁴) emitted by blackbody surfaces, stars, and industrial radiators.',
    category: 'Science',
    icon: 'text',
    keywords: ['stefan boltzmann calculator', 'blackbody radiation calculator', 'thermal radiative power formula', 'astrophysics star luminosity stefan boltzmann', 'stefan constant emissivity'],
    order: 182,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Temperature, Surface Area & Emissivity',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sb-temp">Absolute Temperature T (Kelvin K)</label>
          <input class="tool-textarea" id="sb-temp" type="number" step="any" value="5778" placeholder="5778 K (Sun's Surface)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-area">Surface Area A (m²)</label>
          <input class="tool-textarea" id="sb-area" type="number" step="any" value="1.0" placeholder="1.0 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-emis">Emissivity ε (0.0 to 1.0)</label>
          <input class="tool-textarea" id="sb-emis" type="number" min="0" max="1" step="any" value="1.0" placeholder="1.0 (Ideal Blackbody)" />
        </div>
      </div>
      <div id="sb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sb-res-power" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">63.16 MW/m²</span>
            <span class="stat-label">Radiative Heat Flux (P / A)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sb-res-sigma">5.67037 × 10⁻⁸ W/m²·K⁴</span>
            <span class="stat-label">Stefan-Boltzmann Constant (σ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('sb-temp'), aEl = document.getElementById('sb-area'), eEl = document.getElementById('sb-emis');
  const pEl = document.getElementById('sb-res-power');

  const sigma = 5.670374419e-8; // W / (m^2 * K^4)

  function update() {
    const T = parseFloat(tEl.value), A = parseFloat(aEl.value), eps = parseFloat(eEl.value);
    if (isNaN(T) || isNaN(A) || isNaN(eps) || T <= 0 || A <= 0 || eps <= 0 || eps > 1) return;

    // P = eps * sigma * A * T^4
    const totalWatts = eps * sigma * A * Math.pow(T, 4);
    const fluxWm2 = eps * sigma * Math.pow(T, 4);

    if (fluxWm2 >= 1e6) {
      pEl.textContent = (fluxWm2 / 1e6).toFixed(2) + ' MW/m² (' + (totalWatts / 1e6).toFixed(2) + ' MW total)';
    } else if (fluxWm2 >= 1e3) {
      pEl.textContent = (fluxWm2 / 1e3).toFixed(2) + ' kW/m² (' + (totalWatts / 1e3).toFixed(2) + ' kW total)';
    } else {
      pEl.textContent = fluxWm2.toFixed(1) + ' W/m² (' + totalWatts.toFixed(1) + ' W total)';
    }
  }

  [tEl, aEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter absolute surface temperature in Kelvin (e.g. 5,778 K for Sun photosphere).',
      'Enter radiating surface area in square meters (m²).',
      'Enter surface emissivity (1.0 for ideal blackbody radiator).',
      'Inspect emitted radiative thermal heat flux.'
    ],
    benefitTitle: 'T⁴ Fourth-Power Radiation Scaling',
    benefitContent: 'Radiated power scales with the fourth power of absolute temperature (P ∝ T⁴): doubling an object\'s Kelvin temperature increases its radiative thermal energy output by 16 times (2⁴ = 16).',
    faqs: [{ q: 'How much energy does the human body radiate?', a: 'At normal skin temperature (~305 K / 32 °C) with a surface area of ~1.8 m², a human radiates roughly 850-900 Watts of thermal infrared power.' }]
  },

  // 5. Wien's Displacement Law Peak Wavelength Calculator
  {
    slug: 'wien-displacement-law-calculator',
    name: 'Wien\'s Displacement Law Calculator',
    description: 'Calculate blackbody peak thermal radiation wavelength (λ_max = b / T) and spectrum color from star temperature.',
    category: 'Science',
    icon: 'text',
    keywords: ['wiens displacement law calculator', 'peak emission wavelength calculator', 'star surface temperature color', 'blackbody peak wavelength formula', 'wien constant online calculator'],
    order: 183,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Blackbody Surface Temperature',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="wien-temp">Temperature (Kelvin K)</label>
        <input class="tool-textarea" id="wien-temp" type="number" step="any" value="5778" placeholder="5778 K (Sun)" />
      </div>
      <div id="wien-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wien-res-lambda" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">501.5 nm</span>
            <span class="stat-label">Peak Emission Wavelength (λ_max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wien-res-band" style="font-weight:700;">Visible (Green Light)</span>
            <span class="stat-label">Spectral Band Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('wien-temp');
  const lEl = document.getElementById('wien-res-lambda'), bEl = document.getElementById('wien-res-band');

  const b = 2.897771955e-3; // Wien's displacement constant (m·K)

  function update() {
    const T = parseFloat(tEl.value);
    if (isNaN(T) || T <= 0) return;

    // lambda_max = b / T (in meters)
    const lambdaM = b / T;
    const lambdaNm = lambdaM * 1e9;

    lEl.textContent = lambdaNm >= 1000 ? (lambdaNm / 1000).toFixed(2) + ' μm' : lambdaNm.toFixed(1) + ' nm';

    if (lambdaNm < 10) bEl.textContent = 'Gamma / X-Rays';
    else if (lambdaNm < 400) bEl.textContent = 'Ultraviolet (UV)';
    else if (lambdaNm <= 700) bEl.textContent = 'Visible Optical Light';
    else if (lambdaNm <= 1000000) bEl.textContent = 'Infrared (Thermal IR)';
    else bEl.textContent = 'Microwaves / Radio';
  }

  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter surface temperature in Kelvin.',
      'Inspect peak emitted electromagnetic wavelength (λ_max) and radiation band.'
    ],
    benefitTitle: 'Why Hotter Stars Appear Blue',
    benefitContent: 'Wien\'s law demonstrates that peak emission wavelength is inversely proportional to temperature: cooler stars (3,000 K) peak in the red/infrared, while scorching stars (20,000 K) peak in the blue/ultraviolet.',
    faqs: [{ q: 'At what wavelength does the Sun peak?', a: 'At 5,778 K, the Sun\'s spectrum peaks at approximately 501.5 nm (green-blue optical visible light).' }]
  },

  // 6. Special Relativity Time Dilation Calculator
  {
    slug: 'special-relativity-time-dilation-calculator',
    name: 'Special Relativity Time Dilation Calculator',
    description: 'Calculate Einstein\'s relativistic time dilation (Δt\' = Δt / √(1 - v²/c²)) and Lorentz factor (γ) for high-speed interstellar spaceflight.',
    category: 'Science',
    icon: 'text',
    keywords: ['time dilation calculator', 'special relativity lorentz factor', 'einstein time dilation formula', 'relativistic time dilation online', 'twin paradox speed calculator'],
    order: 184,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Relativistic Velocity & Proper Time',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="td-vel-pct">Velocity (% Speed of Light c)</label>
          <input class="tool-textarea" id="td-vel-pct" type="number" min="0" max="99.9999" step="any" value="90" placeholder="90% of c" />
        </div>
        <div class="control-group">
          <label class="control-label" for="td-time">Proper Time on Spaceship (Years)</label>
          <input class="tool-textarea" id="td-time" type="number" step="any" value="1.0" placeholder="1.0 Year" />
        </div>
      </div>
      <div id="td-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="td-res-earth" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.29 Years</span>
            <span class="stat-label">Elapsed Time on Earth</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="td-res-gamma" style="font-weight:700;">γ = 2.294</span>
            <span class="stat-label">Lorentz Factor (γ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('td-vel-pct'), tEl = document.getElementById('td-time');
  const earthEl = document.getElementById('td-res-earth'), gamEl = document.getElementById('td-res-gamma');

  function update() {
    const vPct = parseFloat(vEl.value);
    const tProper = parseFloat(tEl.value);
    if (isNaN(vPct) || isNaN(tProper) || vPct < 0 || vPct >= 100 || tProper <= 0) return;

    const beta = vPct / 100;
    // gamma = 1 / sqrt(1 - beta^2)
    const gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));
    const tEarth = tProper * gamma;

    earthEl.textContent = tEarth.toFixed(2) + ' Years';
    gamEl.textContent = 'γ = ' + gamma.toFixed(3);
  }

  vEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter spacecraft speed as a percentage of the speed of light (e.g. 90% or 99.9% of c).',
      'Enter elapsed proper time on board the ship.',
      'Inspect the dilated time that elapses for a stationary observer on Earth.'
    ],
    benefitTitle: 'Einstein\'s Special Relativity Proofs',
    benefitContent: 'Time dilation has been confirmed to extreme precision by atomic clocks on high-speed jets, satellite GPS constellation timing offsets (+38 microseconds/day correction), and cosmic muon atmospheric decay lifetimes.',
    faqs: [{ q: 'What is the Lorentz factor at 99% speed of light?', a: 'At 0.99c, the Lorentz factor γ is approximately 7.089, meaning 1 year on the spacecraft equals over 7 years on Earth.' }]
  },

  // 7. Mass-Energy Equivalence Calculator (E = mc²)
  {
    slug: 'mass-energy-equivalence-calculator',
    name: 'Mass-Energy Equivalence Calculator (E = mc²)',
    description: 'Calculate pure energy release from converted mass (E = m · c²) in Joules, Megawatt-Hours, Megatons of TNT, and Kilocalories.',
    category: 'Science',
    icon: 'text',
    keywords: ['e mc2 calculator', 'mass energy equivalence calculator', 'convert mass to energy', 'einstein energy formula online', 'joules from grams mass'],
    order: 185,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Converted Mass (Grams / Kilograms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:2fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="emc-mass">Mass Value</label>
          <input class="tool-textarea" id="emc-mass" type="number" step="any" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="emc-unit">Mass Unit</label>
          <select class="tool-textarea" id="emc-unit">
            <option value="g" selected>Grams (g)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="mg">Milligrams (mg)</option>
          </select>
        </div>
      </div>
      <div id="emc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="emc-res-joules" style="color:var(--green-dark); font-weight:800; font-size:1.5rem; font-family:monospace;">8.99 × 10¹³ J</span>
            <span class="stat-label">Total Energy (Joules J)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="emc-res-kwh" style="font-weight:700;">24.97 Million kWh</span>
            <span class="stat-label">Electricity Equivalent</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="emc-res-tnt">21.48 Kilotons</span>
            <span class="stat-label">TNT Explosive Yield</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('emc-mass'), uEl = document.getElementById('emc-unit');
  const jEl = document.getElementById('emc-res-joules'), kwhEl = document.getElementById('emc-res-kwh'), tntEl = document.getElementById('emc-res-tnt');

  const c = 299792458; // m/s

  function update() {
    const rawM = parseFloat(mEl.value), unit = uEl.value;
    if (isNaN(rawM) || rawM <= 0) return;

    let kg = rawM;
    if (unit === 'g') kg = rawM / 1000;
    else if (unit === 'mg') kg = rawM / 1e6;

    // E = m * c^2
    const joules = kg * Math.pow(c, 2);
    const kwh = joules / 3600000;
    const megatonsTnt = joules / 4.184e15; // 1 Megaton TNT = 4.184 x 10^15 J

    jEl.textContent = joules.toExponential(2) + ' J';
    kwhEl.textContent = (kwh / 1e6).toFixed(2) + ' Million kWh';
    tntEl.textContent = megatonsTnt >= 1 ? megatonsTnt.toFixed(2) + ' Megatons TNT' : (megatonsTnt * 1000).toFixed(2) + ' Kilotons TNT';
  }

  mEl.addEventListener('input', update);
  uEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter the mass amount and select units (grams, kilograms, milligrams).',
      'Inspect the colossal energy released from full mass conversion according to E = mc².'
    ],
    benefitTitle: 'The Tremendous Power of Mass Conversion',
    benefitContent: 'Just 1 gram of matter converted completely into energy releases ~90 Terajoules of energy — equivalent to the detonation of approximately 21.5 Kilotons of TNT (comparable to the energy of the Trinity atomic test).',
    faqs: [{ q: 'What percentage of mass is converted in nuclear fission?', a: 'Uranium nuclear fission converts only approximately 0.08% of reactant mass into energy; antimatter annihilation converts 100% of mass into pure gamma photons.' }]
  },

  // 8. Radiocarbon (C-14) Archeological Dating Calculator
  {
    slug: 'radiocarbon-c14-dating-calculator',
    name: 'Radiocarbon (C-14) Archeological Dating Calculator',
    description: 'Calculate the archeological age of organic fossils, ancient wood, and artifacts from residual Carbon-14 radioactive isotope percentage.',
    category: 'Science',
    icon: 'text',
    keywords: ['radiocarbon dating calculator', 'carbon 14 dating calculator', 'archeological fossil age calculator', 'half life carbon 14 formula', 'radiometric dating online'],
    order: 186,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Residual C-14 Percentage',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="c14-pct">Remaining Carbon-14 (% of Modern Living Biomass)</label>
        <input class="tool-textarea" id="c14-pct" type="number" min="0.001" max="100" step="any" value="25.0" placeholder="e.g. 25.0%" />
      </div>
      <div id="c14-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="c14-res-age" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">11,460 Years Old</span>
            <span class="stat-label">Estimated Sample Age</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="c14-res-halves">2.00 Half-Lives</span>
            <span class="stat-label">Elapsed Half-Lives (t½ = 5,730 yrs)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('c14-pct');
  const aEl = document.getElementById('c14-res-age'), hEl = document.getElementById('c14-res-halves');

  const halfLife = 5730; // C-14 half-life in years

  function update() {
    const pct = parseFloat(pEl.value);
    if (isNaN(pct) || pct <= 0 || pct > 100) return;

    // N(t) / N0 = pct / 100 = e^(-lambda * t)
    // t = -ln(pct / 100) / (ln(2) / 5730)
    const lambda = Math.log(2) / halfLife;
    const ageYears = -Math.log(pct / 100) / lambda;
    const halves = ageYears / halfLife;

    aEl.textContent = Math.round(ageYears).toLocaleString() + ' Years Old';
    hEl.textContent = halves.toFixed(2) + ' Half-Lives';
  }

  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the measured percentage of residual Carbon-14 remaining in the organic specimen.',
      'Inspect the archeological radiocarbon age (accurate for samples up to ~50,000 years old).'
    ],
    benefitTitle: 'Willard Libby\'s Nobel Prize-Winning Method',
    benefitContent: 'Living organisms continuously incorporate atmospheric C-14 through respiration and food. When an organism dies, C-14 ingestion ceases, and the isotope decays with a half-life of 5,730 years.',
    faqs: [{ q: 'What is the maximum limit for C-14 dating?', a: 'Beyond approximately 50,000 to 60,000 years (~10 half-lives), residual C-14 drops below 0.1%, requiring Potassium-Argon or Uranium-Lead radiometric dating for older rocks.' }]
  },

  // 9. Carnot Heat Engine Maximum Thermodynamic Efficiency Calculator
  {
    slug: 'carnot-heat-engine-efficiency-calculator',
    name: 'Carnot Heat Engine Maximum Efficiency Calculator',
    description: 'Calculate theoretical maximum thermal efficiency (η = 1 - T_cold / T_hot) of Carnot heat engines from hot reservoir and cold exhaust temperatures.',
    category: 'Science',
    icon: 'text',
    keywords: ['carnot efficiency calculator', 'heat engine efficiency calculator', 'thermodynamic efficiency formula', 'carnot cycle theoretical limit', 'hot cold reservoir thermal efficiency'],
    order: 187,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Thermal Reservoir Temperatures',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="car-thot">Hot Reservoir Temp T_hot (°C)</label>
          <input class="tool-textarea" id="car-thot" type="number" step="any" value="550" placeholder="550 °C (Turbine Inlet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="car-tcold">Cold Exhaust Temp T_cold (°C)</label>
          <input class="tool-textarea" id="car-tcold" type="number" step="any" value="30" placeholder="30 °C (Cooling Tower)" />
        </div>
      </div>
      <div id="car-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="car-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">63.17%</span>
            <span class="stat-label">Carnot Theoretical Max Efficiency (η)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="car-res-loss">36.83%</span>
            <span class="stat-label">Minimum Thermal Heat Rejection</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('car-thot'), tcEl = document.getElementById('car-tcold');
  const effEl = document.getElementById('car-res-eff'), lossEl = document.getElementById('car-res-loss');

  function update() {
    const thC = parseFloat(thEl.value), tcC = parseFloat(tcEl.value);
    if (isNaN(thC) || isNaN(tcC)) return;

    const thK = thC + 273.15;
    const tcK = tcC + 273.15;

    if (thK <= tcK || tcK <= 0) {
      effEl.textContent = '-'; lossEl.textContent = 'Hot reservoir must exceed cold exhaust'; return;
    }

    // eta = 1 - (Tc / Th)
    const eff = 1 - (tcK / thK);
    const effPct = eff * 100;
    const lossPct = 100 - effPct;

    effEl.textContent = effPct.toFixed(2) + '%';
    lossEl.textContent = lossPct.toFixed(2) + '%';
  }

  thEl.addEventListener('input', update);
  tcEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter hot boiler or turbine combustion temperature in Celsius.',
      'Enter ambient cooling water or cold reservoir temperature in Celsius.',
      'Inspect the absolute thermodynamic maximum conversion efficiency limit.'
    ],
    benefitTitle: 'Second Law of Thermodynamics Limit',
    benefitContent: 'Nicolas Léonard Sadi Carnot proved in 1824 that no heat engine operating between two thermal reservoirs can be more efficient than a reversible Carnot engine: η_max = 1 - (T_cold / T_hot).',
    faqs: [{ q: 'Can any heat engine achieve 100% thermal efficiency?', a: 'No, achieving 100% efficiency would require a cold reservoir at absolute zero (0 Kelvin), which violates the Third Law of Thermodynamics.' }]
  },

  // 10. Aerodynamic Hydrodynamic Drag Force Calculator
  {
    slug: 'hydrodynamic-drag-force-calculator',
    name: 'Aerodynamic & Hydrodynamic Drag Force Calculator',
    description: 'Calculate vehicle and aircraft aerodynamic drag resistance force (Fd = ½ · ρ · v² · Cd · A) and required engine power to overcome drag.',
    category: 'Science',
    icon: 'text',
    keywords: ['aerodynamic drag calculator', 'drag force calculator online', 'air resistance power calculator', 'cd drag coefficient calculator', 'vehicle aerodynamics drag formula'],
    order: 188,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Speed, Frontal Area & Drag Coefficient',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dg-speed">Velocity v (km/h)</label>
          <input class="tool-textarea" id="dg-speed" type="number" step="any" value="120" placeholder="120 km/h" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dg-cd">Drag Coefficient (Cd)</label>
          <input class="tool-textarea" id="dg-cd" type="number" step="any" value="0.28" placeholder="0.28 (Modern Sedan)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dg-area">Frontal Projected Area A (m²)</label>
          <input class="tool-textarea" id="dg-area" type="number" step="any" value="2.2" placeholder="2.2 m²" />
        </div>
      </div>
      <div id="dg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dg-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">418.5 N</span>
            <span class="stat-label">Aerodynamic Drag Force (Fd)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dg-res-power" style="color:#2563eb; font-weight:700;">13.95 kW (18.7 HP)</span>
            <span class="stat-label">Engine Power to Overcome Drag</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('dg-speed'), cdEl = document.getElementById('dg-cd'), aEl = document.getElementById('dg-area');
  const fEl = document.getElementById('dg-res-force'), pEl = document.getElementById('dg-res-power');

  const rho = 1.225; // Air density at sea level (kg/m^3)

  function update() {
    const vKmh = parseFloat(vEl.value), cd = parseFloat(cdEl.value), A = parseFloat(aEl.value);
    if (isNaN(vKmh) || isNaN(cd) || isNaN(A) || vKmh <= 0 || cd <= 0 || A <= 0) return;

    const vMs = vKmh / 3.6;
    // Fd = 0.5 * rho * v^2 * Cd * A
    const fd = 0.5 * rho * Math.pow(vMs, 2) * cd * A;
    // Power = Force * velocity = 0.5 * rho * v^3 * Cd * A
    const powerWatts = fd * vMs;
    const powerKw = powerWatts / 1000;
    const powerHp = powerWatts / 745.7;

    fEl.textContent = fd.toFixed(1) + ' N (Newtons)';
    pEl.textContent = powerKw.toFixed(2) + ' kW (' + powerHp.toFixed(1) + ' HP)';
  }

  [vEl, cdEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter vehicle speed in km/h.',
      'Enter aerodynamic drag coefficient Cd (e.g. 0.24 for sleek electric cars, 0.35 for SUVs).',
      'Enter frontal projected surface area in m².',
      'Inspect resisting aerodynamic drag force and engine horsepower required to maintain velocity.'
    ],
    benefitTitle: 'The Cubic Velocity Power Curve (v³)',
    benefitContent: 'While drag force increases with the square of speed (Fd ∝ v²), the engine power required to overcome drag scales cubically with velocity (P ∝ v³): driving at 140 km/h requires almost twice the power of driving at 110 km/h.',
    faqs: [{ q: 'What is a typical drag coefficient for passenger cars?', a: 'Modern aerodynamic sedans range from Cd = 0.20 to 0.28, whereas boxy pickup trucks and SUVs range between 0.35 and 0.45.' }]
  }
];

toolsSuiteA.forEach(createTool);
console.log('Suite A complete: 10 tools created.');
