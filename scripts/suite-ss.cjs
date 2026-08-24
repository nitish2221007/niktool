const { createTool } = require('./generate-curated-tools.cjs');

// Suite SS: 5 Tools in Heat Transfer, Conduction, Convection & Heat Exchangers to reach 535 tools
const toolsSuiteSS = [
  // 1. Fourier's Law 1D Thermal Conduction Heat Rate Calculator
  {
    slug: 'fourier-law-thermal-conduction-calculator',
    name: 'Fourier\'s Law 1D Thermal Conduction Heat Rate Calculator',
    description: 'Calculate conductive heat transfer rate (q = (k · A · ΔT) / L) in Watts, heat flux (q" = q/A in W/m²), and thermal conduction resistance (R_th = L / (k·A)).',
    category: 'Science',
    icon: 'text',
    keywords: ['fourier law thermal conduction calculator', 'conductive heat transfer rate formula', 'thermal conductivity k a delta t over l', 'heat flux watts per square meter online', 'thermal resistance rth conduction calculator'],
    order: 406,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Thermal Conductivity (k in W/(m·K)), Area (m²), Temp ΔT & Thickness (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fc-k">Conductivity k (W/(m·K))</label>
          <input class="tool-textarea" id="fc-k" type="number" step="any" value="205" placeholder="205 (Aluminum)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fc-area">Area A (m²)</label>
          <input class="tool-textarea" id="fc-area" type="number" step="any" value="0.05" placeholder="0.05 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fc-dt">Temp Difference ΔT (°C / K)</label>
          <input class="tool-textarea" id="fc-dt" type="number" step="any" value="40" placeholder="40 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fc-l">Thickness L (mm)</label>
          <input class="tool-textarea" id="fc-l" type="number" step="any" value="5.0" placeholder="5.0 mm" />
        </div>
      </div>
      <div id="fc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fc-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">82.00 kW</span>
            <span class="stat-label">Conduction Heat Rate (q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fc-res-flux" style="font-weight:700;">1.64 MW / m²</span>
            <span class="stat-label">Heat Flux (q")</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fc-res-rth">0.00049 K / W</span>
            <span class="stat-label">Thermal Resistance (R_th)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('fc-k'), aEl = document.getElementById('fc-area');
  const dtEl = document.getElementById('fc-dt'), lEl = document.getElementById('fc-l');
  const qResEl = document.getElementById('fc-res-q'), fResEl = document.getElementById('fc-res-flux'), rResEl = document.getElementById('fc-res-rth');

  function update() {
    const k = parseFloat(kEl.value), A = parseFloat(aEl.value), dt = parseFloat(dtEl.value), lMm = parseFloat(lEl.value);
    if (isNaN(k) || isNaN(A) || isNaN(dt) || isNaN(lMm) || k <= 0 || A <= 0 || dt <= 0 || lMm <= 0) return;

    const lM = lMm * 1e-3;

    // q = (k * A * dt) / L (Watts)
    const qWatts = (k * A * dt) / lM;
    const qKw = qWatts / 1000;
    // Heat flux q" = q / A (W / m^2)
    const flux = qWatts / A;
    const fluxMw = flux / 1e6;
    // R_th = L / (k * A) (K / W)
    const rTh = lM / (k * A);

    qResEl.textContent = qKw >= 1.0 ? qKw.toFixed(2) + ' kW (' + Math.round(qWatts).toLocaleString() + ' W)' : qWatts.toFixed(1) + ' Watts';
    fResEl.textContent = fluxMw >= 1.0 ? fluxMw.toFixed(2) + ' MW / m²' : (flux / 1000).toFixed(1) + ' kW / m²';
    rResEl.textContent = rTh.toExponential(3) + ' K / W';
  }

  [kEl, aEl, dtEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter material thermal conductivity k in W/(m·K) (e.g. Copper = 400, Aluminum = 205, Stainless Steel = 16, Glass = 0.8).',
      'Enter surface contact area A in square meters.',
      'Enter temperature difference ΔT across the material in Celsius / Kelvin.',
      'Enter heat path thickness L in millimeters.',
      'Inspect total heat flow rate in Watts / kW and conduction thermal resistance R_th.'
    ],
    benefitTitle: 'Joseph Fourier\'s 1822 Analytical Theory of Heat',
    benefitContent: 'Fourier\'s Law establishes that thermal conduction is linearly proportional to the temperature gradient; heatsinks use high-conductivity aluminum to minimize thermal resistance and protect CPU semiconductor dies.',
    faqs: [{ q: 'What is thermal resistance R_th?', a: 'R_th = ΔT / q = L / (k·A), representing a component\'s resistance to heat flow analogous to Ohm\'s electrical resistance (R = V/I).' }]
  },

  // 2. Newton's Law of Cooling & Convective Heat Transfer Calculator
  {
    slug: 'newton-law-cooling-convection-calculator',
    name: 'Newton\'s Law of Cooling & Convective Heat Transfer Calculator',
    description: 'Calculate convective heat dissipation (q = h · A · (T_s - T_∞)) in Watts from surface temperature T_s, ambient fluid temperature T_∞, and convective heat transfer coefficient h.',
    category: 'Science',
    icon: 'text',
    keywords: ['newtons law of cooling calculator', 'convective heat transfer calculator', 'q h a delta t formula online', 'heat transfer coefficient convection calculator', 'heatsink convective cooling online'],
    order: 407,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Convective Coefficient (h in W/(m²·K)), Area, Surface & Ambient Temps',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nc-h">Convective Coeff h (W/(m²·K))</label>
          <input class="tool-textarea" id="nc-h" type="number" step="any" value="25" placeholder="25 (Forced Air Fan)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nc-area">Surface Area A (m²)</label>
          <input class="tool-textarea" id="nc-area" type="number" step="any" value="0.12" placeholder="0.12 m² (Heatsink)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nc-ts">Surface Temp T_s (°C)</label>
          <input class="tool-textarea" id="nc-ts" type="number" step="any" value="70" placeholder="70 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nc-tinf">Ambient Air T_∞ (°C)</label>
          <input class="tool-textarea" id="nc-tinf" type="number" step="any" value="25" placeholder="25 °C" />
        </div>
      </div>
      <div id="nc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nc-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">135.00 Watts</span>
            <span class="stat-label">Convective Dissipation Rate (q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nc-res-rth">0.333 °C / W</span>
            <span class="stat-label">Thermal Resistance (R_conv = 1/(hA))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('nc-h'), aEl = document.getElementById('nc-area');
  const tsEl = document.getElementById('nc-ts'), tiEl = document.getElementById('nc-tinf');
  const qResEl = document.getElementById('nc-res-q'), rResEl = document.getElementById('nc-res-rth');

  function update() {
    const h = parseFloat(hEl.value), A = parseFloat(aEl.value), Ts = parseFloat(tsEl.value), Tinf = parseFloat(tiEl.value);
    if (isNaN(h) || isNaN(A) || isNaN(Ts) || isNaN(Tinf) || h <= 0 || A <= 0 || Ts <= Tinf) return;

    // q = h * A * (Ts - Tinf) (Watts)
    const qWatts = h * A * (Ts - Tinf);
    // R_conv = 1 / (h * A)
    const rConv = 1 / (h * A);

    qResEl.textContent = qWatts >= 1000 ? (qWatts / 1000).toFixed(2) + ' kW' : qWatts.toFixed(2) + ' Watts';
    rResEl.textContent = rConv.toFixed(3) + ' °C / W';
  }

  [hEl, aEl, tsEl, tiEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter convective heat transfer coefficient h (Free air = 5-15, Forced air fan = 25-100, Forced water = 500-2000 W/(m²·K)).',
      'Enter total fin surface area A in square meters.',
      'Enter hot surface temperature T_s and cooler ambient fluid temperature T_∞.',
      'Inspect convective heat dissipation in Watts and convective thermal resistance in °C/W.'
    ],
    benefitTitle: 'Forced Convection Cooling Power',
    benefitContent: 'Forced air fans increase the convective coefficient h by 5x to 10x over natural buoyant free convection, dramatically increasing heatsink heat removal for the exact same physical footprint.',
    faqs: [{ q: 'What is the thermal resistance of a convective boundary?', a: 'R_conv = 1 / (h · A) in °C/W (Kelvin per Watt).' }]
  },

  // 3. Lumped Capacitance Transient Thermal Cooling Time Calculator
  {
    slug: 'lumped-capacitance-transient-thermal-calculator',
    name: 'Lumped Capacitance Transient Thermal Cooling Calculator',
    description: 'Calculate transient cooling temperature profiles (T(t) = T_inf + (T0 - T_inf) · e^(-t / tau)), thermal time constant (tau = rho · V · c / (h · A)), and verify Biot number validity (Bi below 0.1).',
    category: 'Science',
    icon: 'text',
    keywords: ['lumped capacitance calculator', 'transient thermal cooling calculator', 'biot number calculator online', 'thermal time constant tau formula', 'unsteady state heat transfer online'],
    order: 408,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Temp (T₀), Ambient (T_∞), Time Constant (τ) & Elapsed Time (t)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lc-t0">Initial Temp T₀ (°C)</label>
          <input class="tool-textarea" id="lc-t0" type="number" step="any" value="95" placeholder="95 °C (Hot Coffee)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lc-ti">Ambient Temp T_∞ (°C)</label>
          <input class="tool-textarea" id="lc-ti" type="number" step="any" value="20" placeholder="20 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lc-tau">Time Constant τ (sec)</label>
          <input class="tool-textarea" id="lc-tau" type="number" step="any" value="1200" placeholder="1200 s (20 mins)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lc-t">Elapsed Time t (sec)</label>
          <input class="tool-textarea" id="lc-t" type="number" step="any" value="600" placeholder="600 s (10 mins)" />
        </div>
      </div>
      <div id="lc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lc-res-temp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">65.49 °C</span>
            <span class="stat-label">Current Temperature T(t)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lc-res-drop" style="font-weight:700;">-29.51 °C Cooled</span>
            <span class="stat-label">Temperature Drop (39.3% Progress)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t0El = document.getElementById('lc-t0'), tiEl = document.getElementById('lc-ti');
  const tauEl = document.getElementById('lc-tau'), tEl = document.getElementById('lc-t');
  const tmpResEl = document.getElementById('lc-res-temp'), drpResEl = document.getElementById('lc-res-drop');

  function update() {
    const T0 = parseFloat(t0El.value), Tinf = parseFloat(tiEl.value);
    const tau = parseFloat(tauEl.value), tSec = parseFloat(tEl.value);
    if (isNaN(T0) || isNaN(Tinf) || isNaN(tau) || isNaN(tSec) || tau <= 0 || tSec < 0) return;

    // T(t) = Tinf + (T0 - Tinf) * exp(-t / tau)
    const currentT = Tinf + (T0 - Tinf) * Math.exp(-tSec / tau);
    const tempDrop = T0 - currentT;
    const totalDelta = T0 - Tinf;
    const pctCooled = (tempDrop / totalDelta) * 100;

    tmpResEl.textContent = currentT.toFixed(2) + ' °C';
    drpResEl.textContent = (tempDrop >= 0 ? '-' : '+') + Math.abs(tempDrop).toFixed(2) + ' °C (' + pctCooled.toFixed(1) + '% of Equilibrium)';
  }

  [t0El, tiEl, tauEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial object temperature T₀ and ambient surrounding temperature T_∞ in Celsius.',
      'Enter thermal cooling time constant τ in seconds (τ = (m · c) / (h · A)).',
      'Enter elapsed cooling time t in seconds.',
      'Inspect instantaneous object temperature and fractional decay towards ambient equilibrium.'
    ],
    benefitTitle: 'Biot Number Criterion (Bi < 0.1)',
    benefitContent: 'Lumped capacitance assumes spatial temperature uniformity within the body, which is mathematically valid whenever the internal conduction resistance is negligible compared to external convection (Biot Number Bi = h·L_c/k < 0.1).',
    faqs: [{ q: 'What happens at t = τ (one time constant)?', a: 'After exactly one time constant (t = τ), the object cools by 1 - 1/e ≈ 63.2% of the initial temperature difference towards ambient.' }]
  },

  // 4. Log Mean Temperature Difference (LMTD) Heat Exchanger Calculator
  {
    slug: 'heat-exchanger-lmtd-log-mean-calculator',
    name: 'Heat Exchanger Log Mean Temperature Difference (LMTD) Calculator',
    description: 'Calculate Logarithmic Mean Temperature Difference (LMTD = (ΔT₁ - ΔT₂) / ln(ΔT₁ / ΔT₂)) and total thermal duty (Q = U · A · LMTD) for parallel-flow and counter-flow heat exchangers.',
    category: 'Science',
    icon: 'text',
    keywords: ['lmtd calculator', 'heat exchanger lmtd formula', 'log mean temperature difference calculator', 'counter flow parallel flow lmtd online', 'q u a lmtd heat exchanger sizing'],
    order: 409,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hot Fluid (T_h,in to T_h,out) & Cold Fluid (T_c,in to T_c,out) in °C',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lmt-flow">Flow Arrangement</label>
          <select class="tool-textarea" id="lmt-flow">
            <option value="counter" selected>Counter-Flow (More Efficient)</option>
            <option value="parallel">Parallel-Flow (Co-current)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="lmt-thin">Hot In T_h,in (°C)</label>
          <input class="tool-textarea" id="lmt-thin" type="number" step="any" value="90" placeholder="90 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lmt-thout">Hot Out T_h,out (°C)</label>
          <input class="tool-textarea" id="lmt-thout" type="number" step="any" value="60" placeholder="60 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lmt-tcin">Cold In T_c,in (°C)</label>
          <input class="tool-textarea" id="lmt-tcin" type="number" step="any" value="20" placeholder="20 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lmt-tcout">Cold Out T_c,out (°C)</label>
          <input class="tool-textarea" id="lmt-tcout" type="number" step="any" value="45" placeholder="45 °C" />
        </div>
      </div>
      <div id="lmt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lmt-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">42.42 °C</span>
            <span class="stat-label">Effective LMTD (ΔT_lm)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lmt-res-splits">ΔT₁ = 45.0 °C, ΔT₂ = 40.0 °C</span>
            <span class="stat-label">Terminal Temperature Differences</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('lmt-flow'), thiEl = document.getElementById('lmt-thin'), thoEl = document.getElementById('lmt-thout');
  const tciEl = document.getElementById('lmt-tcin'), tcoEl = document.getElementById('lmt-tcout');
  const lmtResEl = document.getElementById('lmt-res-val'), splResEl = document.getElementById('lmt-res-splits');

  function update() {
    const flow = fEl.value;
    const Thi = parseFloat(thiEl.value), Tho = parseFloat(thoEl.value);
    const Tci = parseFloat(tciEl.value), Tco = parseFloat(tcoEl.value);

    if (isNaN(Thi) || isNaN(Tho) || isNaN(Tci) || isNaN(Tco) || Thi <= Tho || Tco <= Tci) return;

    let dt1 = 0, dt2 = 0;
    if (flow === 'counter') {
      // Counter-flow: dt1 = Thi - Tco, dt2 = Tho - Tci
      dt1 = Thi - Tco;
      dt2 = Tho - Tci;
    } else {
      // Parallel-flow: dt1 = Thi - Tci, dt2 = Tho - Tco
      dt1 = Thi - Tci;
      dt2 = Tho - Tco;
    }

    if (dt1 <= 0 || dt2 <= 0) {
      lmtResEl.textContent = 'Invalid Temperature Cross!';
      lmtResEl.style.color = '#c53030';
      return;
    }

    // LMTD = (dt1 - dt2) / ln(dt1 / dt2)
    let lmtd = 0;
    if (Math.abs(dt1 - dt2) < 0.001) {
      lmtd = dt1; // Arithmetic limit
    } else {
      lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);
    }

    lmtResEl.textContent = lmtd.toFixed(2) + ' °C LMTD';
    lmtResEl.style.color = '#22543d';
    splResEl.textContent = 'ΔT₁ = ' + dt1.toFixed(1) + ' °C, ΔT₂ = ' + dt2.toFixed(1) + ' °C';
  }

  [fEl, thiEl, thoEl, tciEl, tcoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select heat exchanger flow configuration (Counter-Flow or Parallel-Flow).',
      'Enter hot stream inlet/outlet temperatures and cold stream inlet/outlet temperatures in Celsius.',
      'Inspect the Logarithmic Mean Temperature Difference (LMTD) driving the heat transfer process.'
    ],
    benefitTitle: 'Why Counter-Flow Yields Superior LMTD',
    benefitContent: 'In counter-flow heat exchangers, the exiting hot stream transfers heat to the coldest entering fluid; this maintains a uniform temperature difference throughout the unit, producing a higher LMTD and requiring less surface area than parallel-flow designs.',
    faqs: [{ q: 'Can a heat exchanger cold fluid exit hotter than the hot fluid exit?', a: 'Yes, in counter-flow heat exchangers, the cold fluid outlet temperature T_c,out can exceed the hot fluid outlet temperature T_h,out.' }]
  },

  // 5. Thermal Radiation Exchange & Net Radiative Heat Rate Calculator
  {
    slug: 'blackbody-radiation-emissivity-calculator',
    name: 'Thermal Radiation Heat Exchange & Emissivity Calculator',
    description: 'Calculate net radiative heat transfer (q = ε · σ · A · (T₁⁴ - T₂⁴)) in Watts and thermal radiation heat flux from surface emissivity (ε) and absolute temperatures (Kelvin).',
    category: 'Science',
    icon: 'text',
    keywords: ['thermal radiation calculator', 'stefan boltzmann emissivity calculator', 'net radiative heat transfer formula', 'radiation heat loss watts online', 'emissivity sigma t4 calculator'],
    order: 410,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Surface Emissivity (ε), Area (m²) & Temperatures (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rad-eps">Emissivity ε (0 to 1.0)</label>
          <input class="tool-textarea" id="rad-eps" type="number" step="0.01" min="0.01" max="1.0" value="0.85" placeholder="0.85 (Painted Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-area">Radiating Area A (m²)</label>
          <input class="tool-textarea" id="rad-area" type="number" step="any" value="2.0" placeholder="2.0 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-t1">Surface Temp T₁ (°C)</label>
          <input class="tool-textarea" id="rad-t1" type="number" step="any" value="150" placeholder="150 °C (423 K)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rad-t2">Surrounding Temp T₂ (°C)</label>
          <input class="tool-textarea" id="rad-t2" type="number" step="any" value="25" placeholder="25 °C (298 K)" />
        </div>
      </div>
      <div id="rad-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rad-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.32 kW</span>
            <span class="stat-label">Net Radiative Heat Transfer (q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rad-res-flux" style="font-weight:700;">1,161 W / m²</span>
            <span class="stat-label">Net Radiation Flux</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const epsEl = document.getElementById('rad-eps'), aEl = document.getElementById('rad-area');
  const t1El = document.getElementById('rad-t1'), t2El = document.getElementById('rad-t2');
  const qResEl = document.getElementById('rad-res-q'), fResEl = document.getElementById('rad-res-flux');

  const sigma = 5.670374419e-8; // Stefan-Boltzmann constant W / (m^2 * K^4)

  function update() {
    const eps = parseFloat(epsEl.value), A = parseFloat(aEl.value);
    const t1C = parseFloat(t1El.value), t2C = parseFloat(t2El.value);

    if (isNaN(eps) || isNaN(A) || isNaN(t1C) || isNaN(t2C) || eps <= 0 || eps > 1.0 || A <= 0 || t1C <= t2C) return;

    const T1 = t1C + 273.15;
    const T2 = t2C + 273.15;

    // q = eps * sigma * A * (T1^4 - T2^4) (Watts)
    const qWatts = eps * sigma * A * (Math.pow(T1, 4) - Math.pow(T2, 4));
    const qKw = qWatts / 1000;
    const flux = qWatts / A;

    qResEl.textContent = qKw >= 1.0 ? qKw.toFixed(2) + ' kW (' + Math.round(qWatts).toLocaleString() + ' W)' : qWatts.toFixed(1) + ' Watts';
    fResEl.textContent = flux >= 1000 ? (flux / 1000).toFixed(2) + ' kW / m²' : Math.round(flux).toLocaleString() + ' W / m²';
  }

  [epsEl, aEl, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter surface emissivity factor ε (0.05 for polished aluminum, 0.90 for black paint/anodized aluminum, 0.95 for water/skin).',
      'Enter total surface area A in square meters.',
      'Enter hot radiating surface temperature T₁ and surrounding ambient enclosure temperature T₂ in Celsius.',
      'Inspect net thermal radiation energy emission in kW / Watts and radiation flux.'
    ],
    benefitTitle: 'Fourth-Power Absolute Temperature Law (T⁴)',
    benefitContent: 'Thermal radiation scales with the fourth power of absolute Kelvin temperature (q ∝ T⁴): doubling absolute temperature increases radiated thermal power by a factor of 16 (2⁴ = 16x).',
    faqs: [{ q: 'What is the emissivity of a perfect theoretical blackbody?', a: 'A perfect blackbody has an emissivity of ε = 1.0, absorbing and emitting maximum possible radiation at all wavelengths.' }]
  }
];

toolsSuiteSS.forEach(createTool);
console.log('Suite SS complete: 5 tools created.');
