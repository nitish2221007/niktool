const { createTool } = require('./generate-curated-tools.cjs');

// Pack 17: 25 Tools covering Renewable Wind & Hydro Power, Geotechnical Engineering, CNC Machining, Cryptography & Rocket Propulsion (Tools 681 to 705)
const pack17Tools = [
  // --- Suite WWW: Renewable Wind & Hydro Power (681 - 685) ---
  // 1. Wind Turbine Power Output & Betz Limit Calculator
  {
    slug: 'wind-turbine-betz-limit-power-output-calculator',
    name: 'Wind Turbine Power Output & Betz Limit (59.3%) Calculator',
    description: 'Calculate aerodynamic wind turbine power generation (P = 1/2 · ρ · A · v³ · C_p) in kW and compare against Albert Betz theoretical maximum limit (C_p(max) = 16/27 = 59.26%).',
    category: 'Science',
    icon: 'text',
    keywords: ['wind turbine power calculator', 'betz limit formula 16 27', 'wind power half rho a v cubed calculator', 'rotor diameter wind energy calculator online', 'aerodynamic power coefficient cp calculator'],
    order: 559,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rotor Diameter D (m), Wind Speed v (m/s) & Power Coefficient C_p',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wt-d">Rotor Diameter (m)</label>
          <input class="tool-textarea" id="wt-d" type="number" step="any" value="120.0" placeholder="120.0 m (3.5 MW Turbine)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-v">Wind Speed (m/s)</label>
          <input class="tool-textarea" id="wt-v" type="number" step="any" value="11.0" placeholder="11.0 m/s (Rated Wind)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-cp">Aero Efficiency C_p</label>
          <input class="tool-textarea" id="wt-cp" type="number" step="0.01" min="0.1" max="0.59" value="0.45" placeholder="0.45 (Modern 3-Blade)" />
        </div>
      </div>
      <div id="wt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wt-res-kw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4,151 kW (4.15 MW)</span>
            <span class="stat-label">Electrical Generation Output Power (P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wt-res-betz" style="font-weight:700;">Betz Max: 5,466 kW (76.0% of Betz Ceiling)</span>
            <span class="stat-label">Betz Theoretical Aerodynamic Ceiling</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('wt-d'), vEl = document.getElementById('wt-v'), cpEl = document.getElementById('wt-cp');
  const kwResEl = document.getElementById('wt-res-kw'), bzResEl = document.getElementById('wt-res-betz');

  const rho_air = 1.225;

  function update() {
    const D = parseFloat(dEl.value), v = parseFloat(vEl.value), Cp = parseFloat(cpEl.value);
    if (isNaN(D) || isNaN(v) || isNaN(Cp) || D <= 0 || v <= 0 || Cp <= 0 || Cp > 0.593) return;

    const A = Math.PI * Math.pow(D / 2, 2);
    const pWindWatts = 0.5 * rho_air * A * Math.pow(v, 3);
    const pExtractWatts = pWindWatts * Cp * 0.92;
    const pExtractKw = pExtractWatts / 1000;
    const pExtractMw = pExtractKw / 1000;

    const pBetzWatts = pWindWatts * (16 / 27);
    const pBetzKw = pBetzWatts / 1000;
    const betzRatioPct = (pExtractKw / pBetzKw) * 100;

    kwResEl.textContent = (pExtractKw >= 1000 ? pExtractMw.toFixed(2) + ' MW' : Math.round(pExtractKw).toLocaleString() + ' kW') + ' Output Power';
    bzResEl.textContent = 'Betz Theoretical Max: ' + Math.round(pBetzKw).toLocaleString() + ' kW (' + betzRatioPct.toFixed(1) + '% of Betz Limit, Swept: ' + Math.round(A).toLocaleString() + ' m²)';
  }

  [dEl, vEl, cpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter wind turbine rotor blade diameter D in meters.',
      'Enter incoming free-stream wind speed v in m/s (1 m/s = 2.237 mph).',
      'Enter aerodynamic power extraction coefficient C_p (typically 0.40 to 0.48 for modern 3-blade HAWT turbines).',
      'Inspect generated electrical power in kW/MW and comparison against Albert Betz theoretical maximum limit.'
    ],
    benefitTitle: 'Albert Betz 1919 Aerodynamic Limit',
    benefitContent: 'Because wind must retain residual kinetic velocity to exit behind the rotor blades, no wind turbine can capture more than 16/27 (59.26%) of the kinetic energy in moving wind columns.',
    faqs: [{ q: 'Why is wind power proportional to the cube of wind speed (v³)?', a: 'Power equals energy per unit mass (½v²) multiplied by mass flow rate (ρAv), causing power to scale with the cube of velocity (P proportional to v³).' }]
  },

  // 2. Wind Shear Power Law (Hellmann Exponent) Hub Height Speed Calculator
  {
    slug: 'wind-shear-power-law-hub-height-calculator',
    name: 'Wind Shear Power Law (Hellmann Exponent) Hub Height Calculator',
    description: 'Calculate wind velocity increase at elevated turbine hub heights (v₂ = v₁ · (h₂ / h₁)^α) using empirical atmospheric wind shear power law exponents across varied terrain roughness.',
    category: 'Science',
    icon: 'text',
    keywords: ['wind shear power law calculator', 'hellmann exponent alpha formula', 'wind speed hub height extrapolation calculator', 'wind turbine tower height power gain online', 'atmospheric boundary layer wind shear calculator'],
    order: 560,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reference Anemometer Height h₁ (m) & Speed v₁ (m/s), Target Hub Height h₂ (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ws-h1">Sensor Height h₁ (m)</label>
          <input class="tool-textarea" id="ws-h1" type="number" step="any" value="10.0" placeholder="10.0 m (Standard Met Mast)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ws-v1">Speed v₁ @ h₁ (m/s)</label>
          <input class="tool-textarea" id="ws-v1" type="number" step="any" value="6.5" placeholder="6.5 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ws-h2">Hub Height h₂ (m)</label>
          <input class="tool-textarea" id="ws-h2" type="number" step="any" value="120.0" placeholder="120.0 m Hub" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ws-terr">Terrain Roughness (α)</label>
          <select class="tool-textarea" id="ws-terr">
            <option value="0.10">Offshore / Smooth Water (α = 0.10)</option>
            <option value="0.14" selected>Open Flat Farmland / Grassland (α = 0.14)</option>
            <option value="0.20">Woodlands / Forest Canopies (α = 0.20)</option>
            <option value="0.30">Suburban / Forested Hills (α = 0.30)</option>
          </select>
        </div>
      </div>
      <div id="ws-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ws-res-v2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">9.20 m/s @ 120 m</span>
            <span class="stat-label">Extrapolated Hub Height Wind Speed (v₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ws-res-gain" style="color:var(--green-dark); font-weight:700;">+183.6% Wind Power Potential Gain (v³)</span>
            <span class="stat-label">Kinetic Power Density Multiplier</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const h1El = document.getElementById('ws-h1'), v1El = document.getElementById('ws-v1');
  const h2El = document.getElementById('ws-h2'), tEl = document.getElementById('ws-terr');
  const v2ResEl = document.getElementById('ws-res-v2'), gnResEl = document.getElementById('ws-res-gain');

  function update() {
    const h1 = parseFloat(h1El.value), v1 = parseFloat(v1El.value);
    const h2 = parseFloat(h2El.value), alpha = parseFloat(tEl.value);

    if (isNaN(h1) || isNaN(v1) || isNaN(h2) || isNaN(alpha) || h1 <= 0 || v1 <= 0 || h2 <= 0) return;

    const v2 = v1 * Math.pow(h2 / h1, alpha);
    const pwrRatio = Math.pow(v2 / v1, 3);
    const pwrGainPct = (pwrRatio - 1) * 100;

    v2ResEl.textContent = v2.toFixed(2) + ' m/s @ ' + h2 + ' m (' + (v2 * 2.23694).toFixed(1) + ' mph)';
    gnResEl.textContent = '+' + pwrGainPct.toFixed(1) + '% Kinetic Power Gain (' + pwrRatio.toFixed(2) + '× v³ Multiplier vs 10m Mast)';
  }

  [h1El, v1El, h2El].forEach(el => el.addEventListener('input', update));
  tEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter reference anemometer measurement mast height h₁ in meters (standard meteorological height is 10 m).',
      'Enter measured base wind speed v₁ in m/s.',
      'Enter target commercial wind turbine nacelle hub height h₂ in meters (e.g. 100 m to 150 m).',
      'Select landscape terrain friction roughness coefficient α (Hellmann shear exponent).',
      'Inspect extrapolated hub wind velocity and cubic kinetic power energy yield expansion.'
    ],
    benefitTitle: 'The 1/7th Boundary Layer Power Law',
    benefitContent: 'Surface frictional drag slows air near ground level; elevating a turbine rotor from 10 m to 120 m on open plains increases wind speed by 41%, translating to an astounding 184% increase in energy production due to the cubic power law.',
    faqs: [{ q: 'What is the Hellmann exponent (α)?', a: 'The Hellmann exponent α characterizes ground friction and atmospheric stability, ranging from 0.10 over open calm seas to 0.30+ over suburban tree canopies.' }]
  },

  // 3. Pelton Wheel Impulse Hydraulic Turbine Power Calculator
  {
    slug: 'pelton-wheel-turbine-hydraulic-power-calculator',
    name: 'Pelton Wheel Impulse Turbine Hydraulic Power & Jet Speed Calculator',
    description: 'Calculate high-head impulse Pelton hydroelectric turbine jet velocity (v_jet = C_v · √(2 · g · H)) in m/s, runner bucket RPM, and mechanical power output (P = η · ρ · g · Q · H) in kW/MW.',
    category: 'Science',
    icon: 'text',
    keywords: ['pelton wheel calculator', 'impulse hydraulic turbine power formula', 'jet velocity v sqrt 2gh calculator', 'pelton runner bucket rpm calculator online', 'high head hydro power generation calculator'],
    order: 561,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Net Hydraulic Head H (meters), Flow Rate Q (m³/s) & Runner Pitch Diameter D (meters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pel-h">Net Head H (m)</label>
          <input class="tool-textarea" id="pel-h" type="number" step="any" value="350.0" placeholder="350.0 m (High Mountain Head)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pel-q">Flow Rate Q (m³/s)</label>
          <input class="tool-textarea" id="pel-q" type="number" step="any" value="1.50" placeholder="1.50 m³/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pel-d">Runner Diameter D (m)</label>
          <input class="tool-textarea" id="pel-d" type="number" step="any" value="1.20" placeholder="1.20 m Pitch Circle" />
        </div>
      </div>
      <div id="pel-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pel-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4,635 kW (4.64 MW)</span>
            <span class="stat-label">Turbine Shaft Mechanical Power (P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pel-res-jet" style="font-weight:700;">Jet Speed: 81.1 m/s (292 km/h) | 620 RPM</span>
            <span class="stat-label">Nozzle Water Jet Velocity & Optimum Runner RPM</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('pel-h'), qEl = document.getElementById('pel-q'), dEl = document.getElementById('pel-d');
  const pResEl = document.getElementById('pel-res-pwr'), jResEl = document.getElementById('pel-res-jet');

  const g = 9.80665;
  const rho_water = 1000;
  const Cv = 0.98;
  const eta = 0.90;

  function update() {
    const H = parseFloat(hEl.value), Q = parseFloat(qEl.value), D = parseFloat(dEl.value);
    if (isNaN(H) || isNaN(Q) || isNaN(D) || H <= 0 || Q <= 0 || D <= 0) return;

    const vJet = Cv * Math.sqrt(2 * g * H);
    const uBucket = 0.46 * vJet;
    const rpm = (uBucket * 60) / (Math.PI * D);

    const pWatts = eta * rho_water * g * Q * H;
    const pKw = pWatts / 1000;
    const pMw = pKw / 1000;

    pResEl.textContent = (pKw >= 1000 ? pMw.toFixed(2) + ' MW' : Math.round(pKw).toLocaleString() + ' kW') + ' (Shaft Power)';
    jResEl.textContent = 'Jet: ' + vJet.toFixed(1) + ' m/s (' + (vJet * 3.6).toFixed(0) + ' km/h) | ' + Math.round(rpm) + ' RPM (Runner D = ' + D + ' m)';
  }

  [hEl, qEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter net water head H in meters (effective elevation drop after penstock friction losses).',
      'Enter volumetric discharge water flow rate Q in cubic meters per second (m³/s).',
      'Enter Pelton wheel runner pitch diameter D in meters.',
      'Inspect generated electrical shaft power in kW/MW, spear nozzle jet exit speed, and optimal runner rotational RPM.'
    ],
    benefitTitle: 'Lester Pelton 1880 Double-Cup Impulse Runner',
    benefitContent: 'By splitting high-velocity water jets into twin hemispherical cups and turning them nearly 180 degrees, the Pelton wheel extracts over 90% of kinetic momentum without immersion, making it the premier choice for mountainous heads exceeding 200 to 1,000+ meters.',
    faqs: [{ q: 'Why do Pelton buckets operate at 46% of jet velocity?', a: 'Theoretical maximum momentum transfer occurs when the bucket moves at exactly half the water jet speed (u = 0.5 v_jet), with practical friction reducing it to ~0.46.' }]
  },

  // 4. Hydro Turbine Specific Speed (N_s) & Runner Selection Calculator
  {
    slug: 'francis-kaplan-turbine-specific-speed-calculator',
    name: 'Hydro Turbine Specific Speed (N_s) & Runner Selection Calculator',
    description: 'Calculate dimensionless hydraulic turbine specific speed (N_s = (N · √P) / H^(5/4)) to identify optimum turbine type: Pelton impulse, Francis reaction, or Kaplan propeller.',
    category: 'Science',
    icon: 'text',
    keywords: ['turbine specific speed calculator', 'ns formula hydro turbine runner selection', 'francis kaplan pelton turbine selector online', 'hydraulic turbine n sqrt p over h 5 4 calculator', 'hydroelectric power plant design calculator'],
    order: 562,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rotational Speed N (RPM), Power Output P (kW) & Net Head H (meters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ns-n">Speed N (RPM)</label>
          <input class="tool-textarea" id="ns-n" type="number" step="any" value="500" placeholder="500 RPM (Synchronous Speed)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ns-p">Power P (kW)</label>
          <input class="tool-textarea" id="ns-p" type="number" step="any" value="10000" placeholder="10,000 kW (10 MW)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ns-h">Net Head H (m)</label>
          <input class="tool-textarea" id="ns-h" type="number" step="any" value="80.0" placeholder="80.0 m (Medium Head)" />
        </div>
      </div>
      <div id="ns-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ns-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N_s = 207.2 (Metric)</span>
            <span class="stat-label">Turbine Specific Speed (N_s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ns-res-type" style="color:var(--green-dark); font-weight:700;">Medium-Head Francis Reaction Runner</span>
            <span class="stat-label">Optimal Turbine Design Type</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('ns-n'), pEl = document.getElementById('ns-p'), hEl = document.getElementById('ns-h');
  const valResEl = document.getElementById('ns-res-val'), typResEl = document.getElementById('ns-res-type');

  function update() {
    const N = parseFloat(nEl.value), P_kw = parseFloat(pEl.value), H = parseFloat(hEl.value);
    if (isNaN(N) || isNaN(P_kw) || isNaN(H) || N <= 0 || P_kw <= 0 || H <= 0) return;

    const Ns = (N * Math.sqrt(P_kw)) / Math.pow(H, 1.25);
    valResEl.textContent = 'N_s = ' + Ns.toFixed(1) + ' (Metric kW units)';

    if (Ns < 35) {
      typResEl.textContent = 'Pelton Wheel (Single Jet Impulse Runner: High Head > 300m)';
      typResEl.style.color = '#2563eb';
    } else if (Ns < 70) {
      typResEl.textContent = 'Multi-Jet Pelton or Turgo Runner (High Head 150 - 400m)';
      typResEl.style.color = '#2563eb';
    } else if (Ns < 300) {
      typResEl.textContent = 'Francis Reaction Mixed-Flow Runner (Medium Head 40 - 250m)';
      typResEl.style.color = '#22543d';
    } else if (Ns < 500) {
      typResEl.textContent = 'High-Speed Francis or Deriaz Runner (Medium-Low Head 25 - 60m)';
      typResEl.style.color = '#22543d';
    } else {
      typResEl.textContent = 'Kaplan / Propeller Axial-Flow Runner (Low Head < 30m, High Flow)';
      typResEl.style.color = '#d97706';
    }
  }

  [nEl, pEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter generator synchronous rotational speed N in RPM.',
      'Enter turbine electrical power output P in kilowatts (kW).',
      'Enter net available head H in meters.',
      'Inspect dimensionless specific speed N_s and recommended turbine runner architecture.'
    ],
    benefitTitle: 'Hydro Turbine Hydraulic Similitude',
    benefitContent: 'Specific speed defines the rotational speed of a geometrically similar model turbine that produces 1 kW under 1 meter of head; low N_s indicates impulse Pelton turbines, medium N_s indicates Francis runners, and high N_s demands axial Kaplan propeller turbines.',
    faqs: [{ q: 'What is the most widely used hydroelectric turbine in the world?', a: 'The Francis reaction turbine is the world\'s most common turbine, handling medium heads from 40 to 300 meters with over 93% peak efficiency.' }]
  },

  // 5. Tidal Barrage Basin Potential Energy Generation Calculator
  {
    slug: 'tidal-barrage-potential-energy-generation-calculator',
    name: 'Tidal Barrage Basin Potential Energy Generation Calculator',
    description: 'Calculate tidal range estuary potential energy generation per tide cycle (E = 1/2 · A · ρ · g · R²) in MWh and annual power output from basin surface area A and tidal amplitude range R.',
    category: 'Science',
    icon: 'text',
    keywords: ['tidal barrage energy calculator', 'tidal range potential energy formula', 'estuary tidal power generation calculator', 'bay of fundy tidal energy calculator online', 'renewable ocean tidal basin calculator'],
    order: 563,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Basin Surface Area A (km²), Tidal Range R (meters) & Hydro Efficiency η (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tb-a">Basin Area A (km²)</label>
          <input class="tool-textarea" id="tb-a" type="number" step="any" value="22.0" placeholder="22.0 km² (La Rance Basin)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tb-r">Tidal Range R (m)</label>
          <input class="tool-textarea" id="tb-r" type="number" step="any" value="8.5" placeholder="8.5 m High Tide Range" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tb-eta">Efficiency η (%)</label>
          <input class="tool-textarea" id="tb-eta" type="number" step="1" value="85" placeholder="85% Bulb Turbines" />
        </div>
      </div>
      <div id="tb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tb-res-cycle" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,883 MWh / Tide</span>
            <span class="stat-label">Energy Generation per Ebb Tide Cycle</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tb-res-ann" style="font-weight:700;">1,329 GWh / Year (Avg Power: 151.7 MW)</span>
            <span class="stat-label">Annual Ocean Energy Production (705 Tides/yr)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('tb-a'), rEl = document.getElementById('tb-r'), etaEl = document.getElementById('tb-eta');
  const cyResEl = document.getElementById('tb-res-cycle'), anResEl = document.getElementById('tb-res-ann');

  const g = 9.80665;
  const rho_sea = 1025;

  function update() {
    const aKm2 = parseFloat(aEl.value), R = parseFloat(rEl.value), etaPct = parseFloat(etaEl.value);
    if (isNaN(aKm2) || isNaN(R) || isNaN(etaPct) || aKm2 <= 0 || R <= 0 || etaPct <= 0) return;

    const aM2 = aKm2 * 1e6;
    const eta = etaPct / 100;
    const eJoules = 0.5 * aM2 * rho_sea * g * Math.pow(R, 2);
    const eMwh = (eJoules / 3.6e9) * eta;
    const annualGwh = (eMwh * 705) / 1000;
    const avgPowerMw = (annualGwh * 1000) / 8760;

    cyResEl.textContent = Math.round(eMwh).toLocaleString() + ' MWh / Tide Cycle';
    anResEl.textContent = Math.round(annualGwh).toLocaleString() + ' GWh / Year (Average Capacity: ' + avgPowerMw.toFixed(1) + ' MW, R² Scaling)';
  }

  [aEl, rEl, etaEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter enclosed tidal estuary basin surface area A in square kilometers (km²).',
      'Enter mean spring tidal range R (height difference between high and low tide) in meters.',
      'Enter bidirectional bulb turbine hydraulic generation efficiency percentage.',
      'Inspect electrical potential energy output per tidal cycle in MWh and total annual clean ocean electricity yield in GWh.'
    ],
    benefitTitle: 'R² Quadratic Gravitational Tidal Energy Scaling',
    benefitContent: 'Because both water volume and hydrostatic head increase with tidal amplitude, energy generation scales with the square of the tidal range; estuaries with 10 m tides produce 4 times more energy than 5 m tides.',
    faqs: [{ q: 'Where is the world\'s largest operational tidal barrage?', a: 'Sihwa Lake Tidal Power Station in South Korea is the world\'s largest at 254 MW capacity, followed closely by France\'s 240 MW La Rance Barrage.' }]
  },

  // --- Suite XXX: Geotechnical Soil Mechanics & Foundations (686 - 690) ---
  // 6. Terzaghi Ultimate Bearing Capacity Shallow Foundation Calculator
  {
    slug: 'terzaghi-bearing-capacity-shallow-foundation-calculator',
    name: 'Terzaghi Ultimate Soil Bearing Capacity Shallow Foundation Calculator',
    description: 'Calculate shallow foundation ultimate soil bearing capacity (q_ult = c · N_c + q · N_q + 0.5 · γ · B · N_γ) and allowable bearing pressure using Karl Terzaghi bearing capacity factors.',
    category: 'Science',
    icon: 'text',
    keywords: ['terzaghi bearing capacity calculator', 'shallow footing ultimate bearing capacity formula', 'nc nq n_gamma soil factors calculator', 'geotechnical allowable bearing pressure online', 'foundation engineering terzaghi calculator'],
    order: 564,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cohesion c (kPa), Friction Angle ϕ (°), Unit Weight γ (kN/m³), Width B (m) & Depth D_f (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tz-c">Cohesion c (kPa)</label>
          <input class="tool-textarea" id="tz-c" type="number" step="any" value="15.0" placeholder="15.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tz-phi">Friction Angle ϕ (°)</label>
          <input class="tool-textarea" id="tz-phi" type="number" step="1" min="0" max="45" value="30" placeholder="30° (Medium Sand/Clay)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tz-gam">Unit Weight γ (kN/m³)</label>
          <input class="tool-textarea" id="tz-gam" type="number" step="any" value="18.5" placeholder="18.5 kN/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tz-b">Footing Width B (m)</label>
          <input class="tool-textarea" id="tz-b" type="number" step="any" value="2.0" placeholder="2.0 m Width" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tz-df">Embedment Depth D_f (m)</label>
          <input class="tool-textarea" id="tz-df" type="number" step="any" value="1.5" placeholder="1.5 m Footing Depth" />
        </div>
      </div>
      <div id="tz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tz-res-qult" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,353.4 kPa</span>
            <span class="stat-label">Ultimate Soil Bearing Capacity (q_ult)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tz-res-qall" style="color:var(--green-dark); font-weight:700;">451.1 kPa (FS = 3.0 Allowable Pressure)</span>
            <span class="stat-label">Safe Allowable Bearing Capacity (q_all)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('tz-c'), pEl = document.getElementById('tz-phi');
  const gEl = document.getElementById('tz-gam'), bEl = document.getElementById('tz-b'), dfEl = document.getElementById('tz-df');
  const quResEl = document.getElementById('tz-res-qult'), qaResEl = document.getElementById('tz-res-qall');

  function update() {
    const c = parseFloat(cEl.value), phiDeg = parseFloat(pEl.value);
    const gamma = parseFloat(gEl.value), B = parseFloat(bEl.value), Df = parseFloat(dfEl.value);

    if (isNaN(c) || isNaN(phiDeg) || isNaN(gamma) || isNaN(B) || isNaN(Df) || c < 0 || phiDeg < 0 || phiDeg > 45 || gamma <= 0 || B <= 0 || Df < 0) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const q_surcharge = gamma * Df;

    let Nq = 1.0, Nc = 5.14, Ngamma = 0.0;
    if (phiDeg > 0) {
      Nq = Math.exp(Math.PI * Math.tan(phiRad)) * Math.pow(Math.tan((Math.PI / 4) + (phiRad / 2)), 2);
      Nc = (Nq - 1) / Math.tan(phiRad);
      Ngamma = 2 * (Nq + 1) * Math.tan(phiRad);
    }

    const q_ult = (c * Nc) + (q_surcharge * Nq) + (0.5 * gamma * B * Ngamma);
    const q_allow = q_ult / 3.0;

    quResEl.textContent = q_ult.toFixed(1) + ' kPa (q_ult)';
    qaResEl.textContent = q_allow.toFixed(1) + ' kPa (FS = 3.0 | N_c=' + Nc.toFixed(1) + ', N_q=' + Nq.toFixed(1) + ', N_γ=' + Ngamma.toFixed(1) + ')';
  }

  [cEl, pEl, gEl, bEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter soil effective cohesion c in kilopascals (kPa).',
      'Enter internal friction angle ϕ in degrees (0° for saturated pure clays, 30-38° for granular sands).',
      'Enter soil unit weight γ in kN/m³.',
      'Enter footing width B and embedment depth D_f in meters.',
      'Inspect ultimate bearing capacity q_ult and design allowable bearing capacity q_all with standard Factor of Safety (FS = 3.0).'
    ],
    benefitTitle: 'Karl Terzaghi 1943 General Shear Failure Theory',
    benefitContent: 'Terzaghi partitioned foundation soil failure into three distinct resistance zones: elastic triangular wedge, radial shear log-spiral fan, and passive linear Rankine surcharge zone.',
    faqs: [{ q: 'Why is a Factor of Safety of 3.0 standard in geotechnical footing design?', a: 'A safety factor of 3.0 provides robust protection against soil stratification uncertainties, groundwater table fluctuations, and limits excessive post-construction settlement.' }]
  },

  // 7. Mohr-Coulomb Shear Strength Envelope Calculator
  {
    slug: 'mohr-coulomb-shear-strength-envelope-calculator',
    name: 'Mohr-Coulomb Soil Shear Strength Envelope Calculator',
    description: 'Calculate geotechnical soil shear failure strength (τ = c + σ_n · tan(ϕ)) in kPa from effective normal stress, cohesion intercept c, and internal friction angle ϕ.',
    category: 'Science',
    icon: 'text',
    keywords: ['mohr coulomb shear strength calculator', 'tau c plus sigma tan phi formula', 'soil shear failure envelope calculator', 'effective normal stress triaxial shear calculator', 'geotechnical soil mechanics shear strength online'],
    order: 565,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Effective Normal Stress σ_n (kPa), Effective Cohesion c (kPa) & Friction Angle ϕ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mc-sig">Normal Stress σ_n (kPa)</label>
          <input class="tool-textarea" id="mc-sig" type="number" step="any" value="120.0" placeholder="120.0 kPa Normal Stress" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-c">Cohesion c (kPa)</label>
          <input class="tool-textarea" id="mc-c" type="number" step="any" value="20.0" placeholder="20.0 kPa Cohesion" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-phi">Friction Angle ϕ (°)</label>
          <input class="tool-textarea" id="mc-phi" type="number" step="1" min="0" max="45" value="28" placeholder="28° Angle" />
        </div>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">83.8 kPa</span>
            <span class="stat-label">Maximum Shear Strength at Failure (τ_f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-fail" style="font-weight:700;">Failure Plane Angle θ_f = 59.0° (45° + ϕ/2)</span>
            <span class="stat-label">Critical Theoretical Shear Rupture Plane Angle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('mc-sig'), cEl = document.getElementById('mc-c'), pEl = document.getElementById('mc-phi');
  const tResEl = document.getElementById('mc-res-tau'), fResEl = document.getElementById('mc-res-fail');

  function update() {
    const sigma = parseFloat(sEl.value), c = parseFloat(cEl.value), phiDeg = parseFloat(pEl.value);
    if (isNaN(sigma) || isNaN(c) || isNaN(phiDeg) || sigma < 0 || c < 0 || phiDeg < 0 || phiDeg > 45) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const tau = c + (sigma * Math.tan(phiRad));
    const thetaF = 45 + (phiDeg / 2);
    const tauFric = sigma * Math.tan(phiRad);

    tResEl.textContent = tau.toFixed(1) + ' kPa (Shear Strength τ_f)';
    fResEl.textContent = 'Rupture Plane θ_f = ' + thetaF.toFixed(1) + '° (Cohesive: ' + c.toFixed(1) + ' kPa, Frictional: ' + tauFric.toFixed(1) + ' kPa)';
  }

  [sEl, cEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter effective normal stress σ_n acting on the soil failure plane in kPa.',
      'Enter drained soil cohesion intercept c in kPa.',
      'Enter effective internal angle of shearing resistance ϕ in degrees.',
      'Inspect peak shear strength τ_f and orientation angle of the theoretical slip failure plane θ_f = 45° + ϕ/2.'
    ],
    benefitTitle: 'Charles-Augustin de Coulomb 1776 Shear Failure Law',
    benefitContent: 'Soil shearing resistance derives from two physical mechanisms: interparticle cementation/electrostatic bonding (cohesion c) and mechanical grain interlocking friction that increases linearly with confining overburden pressure.',
    faqs: [{ q: 'What is the friction angle of pure dry sand?', a: 'Clean dry sand has zero cohesion (c = 0) and an internal friction angle ϕ typically between 30° (loose) and 40° (dense compacted).' }]
  },

  // 8. Atterberg Limits Plasticity Index (PI) & Liquidity Index (LI) Calculator
  {
    slug: 'atterberg-limits-plasticity-liquidity-index-calculator',
    name: 'Atterberg Limits Plasticity Index (PI) & Liquidity Index (LI) Calculator',
    description: 'Calculate soil Plasticity Index (PI = LL - PL), Liquidity Index (LI = (w - PL) / PI), Activity number, and USCS soil classification (CL, CH, ML, MH) from liquid and plastic limits.',
    category: 'Science',
    icon: 'text',
    keywords: ['atterberg limits calculator', 'plasticity index pi formula ll minus pl', 'liquidity index li calculator online', 'uscs soil classification a line casagrande', 'clay consistency atterberg limits online'],
    order: 566,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Liquid Limit LL (%), Plastic Limit PL (%) & Natural Water Content w (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="att-ll">Liquid Limit LL (%)</label>
          <input class="tool-textarea" id="att-ll" type="number" step="any" value="48.0" placeholder="48.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="att-pl">Plastic Limit PL (%)</label>
          <input class="tool-textarea" id="att-pl" type="number" step="any" value="22.0" placeholder="22.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="att-w">Natural Moisture w (%)</label>
          <input class="tool-textarea" id="att-w" type="number" step="any" value="26.0" placeholder="26.0% In-Situ" />
        </div>
      </div>
      <div id="att-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="att-res-pi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PI = 26.0% | LI = 0.15</span>
            <span class="stat-label">Plasticity Index (PI) & Liquidity Index (LI)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="att-res-uscs" style="color:var(--green-dark); font-weight:700;">CL: Lean Clay of Low-to-Medium Plasticity</span>
            <span class="stat-label">USCS Casagrande Soil Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const llEl = document.getElementById('att-ll'), plEl = document.getElementById('att-pl'), wEl = document.getElementById('att-w');
  const piResEl = document.getElementById('att-res-pi'), usResEl = document.getElementById('att-res-uscs');

  function update() {
    const LL = parseFloat(llEl.value), PL = parseFloat(plEl.value), w = parseFloat(wEl.value);
    if (isNaN(LL) || isNaN(PL) || isNaN(w) || LL <= 0 || PL <= 0 || LL <= PL || w < 0) return;

    const PI = LL - PL;
    const LI = (w - PL) / PI;
    const pi_A = 0.73 * (LL - 20);

    let uscs = '';
    if (LL >= 50) {
      if (PI >= pi_A) uscs = 'CH: Fat / High Plasticity Clay (Above A-Line, LL ≥ 50%)';
      else uscs = 'MH / OH: Elastic Silt / Organic Clay (Below A-Line, LL ≥ 50%)';
    } else {
      if (PI >= pi_A && PI > 7) uscs = 'CL: Lean Clay of Low Plasticity (Above A-Line, LL < 50%)';
      else if (PI < pi_A && PI < 4) uscs = 'ML: Low Plasticity Silt (Below A-Line, LL < 50%)';
      else uscs = 'CL-ML: Silty Clay Dual Classification';
    }

    let state = 'Plastic Solid State';
    if (LI < 0) state = 'Semi-Solid to Brittle (w < PL, Overconsolidated)';
    else if (LI > 1.0) state = 'Viscous Liquid / Sensitive Quick Clay (w > LL, High Liquefaction Risk)';

    piResEl.textContent = 'PI = ' + PI.toFixed(1) + '% | LI = ' + LI.toFixed(2) + ' (' + state + ')';
    usResEl.textContent = uscs;
  }

  [llEl, plEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Casagrande cup Liquid Limit LL (moisture content % where soil begins flowing as a liquid).',
      'Enter Plastic Limit PL (moisture content % where a 3 mm soil thread begins crumbling).',
      'Enter natural in-situ field moisture content w (%).',
      'Inspect Plasticity Index PI, Liquidity Index LI, and Unified Soil Classification System (USCS) clay classification.'
    ],
    benefitTitle: 'Albert Atterberg & Arthur Casagrande Soil Consistency',
    benefitContent: 'Atterberg limits quantify how fine-grained soils transition between solid, semi-solid, plastic, and liquid states; Casagrande A-line (PI = 0.73(LL - 20)) mathematically separates true cohesive clays from inorganic silts.',
    faqs: [{ q: 'What does a Liquidity Index (LI) greater than 1.0 indicate?', a: 'When LI > 1.0, natural moisture exceeds the liquid limit, indicating extremely sensitive quick clays prone to catastrophic structural liquefaction upon disturbance.' }]
  },

  // 9. Soil One-Dimensional Consolidation Settlement Calculator
  {
    slug: 'soil-one-dimensional-consolidation-settlement-calculator',
    name: 'Soil 1D Primary Consolidation Settlement (S_c) Calculator',
    description: 'Calculate clay primary settlement (S_c = (C_c · H₀ / (1 + e₀)) · log₁₀((σ₀ + Δσ) / σ₀)) in millimeters from compression index C_c and void ratio e₀.',
    category: 'Science',
    icon: 'text',
    keywords: ['consolidation settlement calculator', 'soil 1d settlement formula cc h0 over 1 plus e0', 'primary consolidation settlement clay calculator', 'void ratio compression index settlement online', 'geotechnical foundation settlement calculator'],
    order: 567,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Layer Thickness H₀ (m), Initial Void Ratio e₀, Compression Index C_c, Initial σ₀ (kPa) & Increase Δσ (kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cs-h0">Layer Thickness H₀ (m)</label>
          <input class="tool-textarea" id="cs-h0" type="number" step="any" value="5.0" placeholder="5.0 m Clay Layer" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-e0">Initial Void Ratio e₀</label>
          <input class="tool-textarea" id="cs-e0" type="number" step="0.01" value="0.85" placeholder="0.85 Void Ratio" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-cc">Compression Index C_c</label>
          <input class="tool-textarea" id="cs-cc" type="number" step="0.01" value="0.32" placeholder="0.32 (Medium Soft Clay)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-s0">Initial σ₀ (kPa)</label>
          <input class="tool-textarea" id="cs-s0" type="number" step="any" value="75.0" placeholder="75.0 kPa In-Situ Stress" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-ds">Stress Increase Δσ (kPa)</label>
          <input class="tool-textarea" id="cs-ds" type="number" step="any" value="50.0" placeholder="50.0 kPa Foundation Load" />
        </div>
      </div>
      <div id="cs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cs-res-sc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">192.1 mm (19.2 cm)</span>
            <span class="stat-label">Primary Consolidation Settlement (S_c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cs-res-strain" style="font-weight:700;">3.84% Vertical Strain (Final Void Ratio e_f = 0.779)</span>
            <span class="stat-label">Long-Term Volumetric Compression Strain</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const h0El = document.getElementById('cs-h0'), e0El = document.getElementById('cs-e0');
  const ccEl = document.getElementById('cs-cc'), s0El = document.getElementById('cs-s0'), dsEl = document.getElementById('cs-ds');
  const scResEl = document.getElementById('cs-res-sc'), stResEl = document.getElementById('cs-res-strain');

  function update() {
    const H0 = parseFloat(h0El.value), e0 = parseFloat(e0El.value);
    const Cc = parseFloat(ccEl.value), s0 = parseFloat(s0El.value), ds = parseFloat(dsEl.value);

    if (isNaN(H0) || isNaN(e0) || isNaN(Cc) || isNaN(s0) || isNaN(ds) || H0 <= 0 || e0 <= 0 || Cc <= 0 || s0 <= 0 || ds <= 0) return;

    const Sc_m = ((Cc * H0) / (1 + e0)) * Math.log10((s0 + ds) / s0);
    const Sc_mm = Sc_m * 1000;
    const Sc_cm = Sc_m * 100;

    const vertStrainPct = (Sc_m / H0) * 100;
    const delta_e = Cc * Math.log10((s0 + ds) / s0);
    const e_final = e0 - delta_e;

    scResEl.textContent = Sc_mm.toFixed(1) + ' mm (' + Sc_cm.toFixed(1) + ' cm Settlement)';
    stResEl.textContent = vertStrainPct.toFixed(2) + '% Vertical Strain (Final Void Ratio e_f = ' + e_final.toFixed(3) + ')';
  }

  [h0El, e0El, ccEl, s0El, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter clay stratum thickness H₀ in meters.',
      'Enter initial in-situ void ratio e₀ (ratio of volume of voids to volume of solids).',
      'Enter compression index C_c obtained from oedometer consolidation testing.',
      'Enter initial effective vertical overburden stress σ₀ in kPa at mid-layer depth.',
      'Enter net vertical stress increase Δσ imparted by building foundation footing loads.',
      'Inspect total ultimate primary consolidation settlement in millimeters and centimeters.'
    ],
    benefitTitle: 'Terzaghi 1D Pore Water Dissipation Consolidation',
    benefitContent: 'Foundation loads initially pressurize incompressible water inside saturated clay pores; as pore water slowly squeezes out over years, soil skeleton void ratio decreases exponentially.',
    faqs: [{ q: 'What is the empirical Skempton formula for Compression Index C_c?', a: 'C_c ≈ 0.009 × (LL - 10) for normally consolidated undisturbed clays.' }]
  },

  // 10. Constant Head Soil Permeability (Darcy Hydraulic Conductivity k) Calculator
  {
    slug: 'constant-head-soil-permeability-darcy-k-calculator',
    name: 'Constant Head Soil Permeability (Darcy k) Calculator',
    description: 'Calculate soil hydraulic conductivity coefficient (k = (Q · L) / (A · h · t)) in cm/s and m/s from constant-head laboratory permeameter test data per ASTM D2434.',
    category: 'Science',
    icon: 'text',
    keywords: ['soil permeability calculator', 'darcy hydraulic conductivity formula k ql over aht', 'constant head permeameter calculator astm d2434', 'coarse sand gravel permeability calculator online', 'geotechnical seepage velocity calculator'],
    order: 568,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Discharge Volume Q (cm³), Sample Length L (cm), Area A (cm²), Head h (cm) & Time t (sec)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="per-q">Collected Q (cm³ / mL)</label>
          <input class="tool-textarea" id="per-q" type="number" step="any" value="450.0" placeholder="450.0 mL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="per-l">Sample Length L (cm)</label>
          <input class="tool-textarea" id="per-l" type="number" step="any" value="15.0" placeholder="15.0 cm Cylinder" />
        </div>
        <div class="control-group">
          <label class="control-label" for="per-a">Cross-Section A (cm²)</label>
          <input class="tool-textarea" id="per-a" type="number" step="any" value="80.0" placeholder="80.0 cm²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="per-h">Constant Head h (cm)</label>
          <input class="tool-textarea" id="per-h" type="number" step="any" value="30.0" placeholder="30.0 cm Head Loss" />
        </div>
        <div class="control-group">
          <label class="control-label" for="per-t">Elapsed Time t (s)</label>
          <input class="tool-textarea" id="per-t" type="number" step="any" value="60.0" placeholder="60.0 seconds" />
        </div>
      </div>
      <div id="per-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="per-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4.69 × 10⁻² cm / s</span>
            <span class="stat-label">Hydraulic Conductivity (Darcy Coefficient k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="per-res-type" style="color:var(--green-dark); font-weight:700;">Clean Coarse Sand / Gravel (High Drainage)</span>
            <span class="stat-label">Permeability Soil Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('per-q'), lEl = document.getElementById('per-l');
  const aEl = document.getElementById('per-a'), hEl = document.getElementById('per-h'), tEl = document.getElementById('per-t');
  const kResEl = document.getElementById('per-res-k'), typResEl = document.getElementById('per-res-type');

  function update() {
    const Q = parseFloat(qEl.value), L = parseFloat(lEl.value);
    const A = parseFloat(aEl.value), h = parseFloat(hEl.value), t = parseFloat(tEl.value);

    if (isNaN(Q) || isNaN(L) || isNaN(A) || isNaN(h) || isNaN(t) || Q <= 0 || L <= 0 || A <= 0 || h <= 0 || t <= 0) return;

    const k_cm_s = (Q * L) / (A * h * t);
    const k_m_s = k_cm_s * 1e-2;
    const k_m_day = k_m_s * 86400;

    kResEl.textContent = k_cm_s.toExponential(2) + ' cm / s (' + k_m_day.toFixed(1) + ' m/day)';

    if (k_cm_s >= 1e-1) {
      typResEl.textContent = 'Clean Gravel / Coarse Aggregate (k > 0.1 cm/s: Excellent Drainage)';
      typResEl.style.color = '#22543d';
    } else if (k_cm_s >= 1e-3) {
      typResEl.textContent = 'Clean Sand / Medium Sand (10⁻³ to 10⁻¹ cm/s: Good Drainage)';
      typResEl.style.color = '#22543d';
    } else if (k_cm_s >= 1e-5) {
      typResEl.textContent = 'Fine Sand / Silty Sand (10⁻⁵ to 10⁻³ cm/s: Poor Drainage)';
      typResEl.style.color = '#2563eb';
    } else {
      typResEl.textContent = 'Dense Silt / Clay (k < 10⁻⁵ cm/s: Practically Impermeable)';
      typResEl.style.color = '#d97706';
    }
  }

  [qEl, lEl, aEl, hEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total volume Q of water collected in milliliters / cubic centimeters.',
      'Enter soil sample cylinder specimen length L in cm.',
      'Enter sample cross-sectional area A in cm².',
      'Enter constant water manometric head difference h in cm.',
      'Enter test duration time t in seconds.',
      'Inspect Darcy hydraulic conductivity k in cm/s and m/day.'
    ],
    benefitTitle: 'Henry Darcy 1856 Law of Seepage Flow',
    benefitContent: 'Constant-head permeameters test coarse granular soils where discharge is substantial; Darcy law relates volumetric flow rate to hydraulic gradient via Q = k · i · A · t.',
    faqs: [{ q: 'Why is a falling-head test used instead of constant-head for fine clay?', a: 'Clay hydraulic conductivity is so low that water volume collected in a constant head test is too tiny to measure accurately.' }]
  },

  // --- Suite YYY: Manufacturing CNC Machining & Metal Cutting (691 - 695) ---
  // 11. CNC Milling Feed Rate & Speed Calculator
  {
    slug: 'cnc-milling-feed-rate-ipt-ipm-calculator',
    name: 'CNC Milling Feed Rate (IPM / mm/min) & Spindle Speed Calculator',
    description: 'Calculate CNC milling table feed rate (Feed = RPM · Flutes · FPT) in inches per minute (IPM) and mm/min, spindle RPM, and chip load per tooth.',
    category: 'Science',
    icon: 'text',
    keywords: ['cnc milling feed rate calculator', 'spindle speed rpm formula sfm over diameter', 'feed rate ipm rpm flutes fpt calculator', 'chip load per tooth milling calculator online', 'speeds and feeds cnc machining online'],
    order: 569,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cutter Diameter D (in or mm), Surface Speed (SFM or m/min), Flutes & Chip Load (IPT or mm/tooth)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cnc-d">Endmill Diameter D (in)</label>
          <input class="tool-textarea" id="cnc-d" type="number" step="any" value="0.500" placeholder="0.500 in (1/2 Endmill)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cnc-sfm">Cutting Speed (SFM)</label>
          <input class="tool-textarea" id="cnc-sfm" type="number" step="any" value="600" placeholder="600 SFM (6061 Aluminum Carbide)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cnc-fl">Number of Flutes (Z)</label>
          <input class="tool-textarea" id="cnc-fl" type="number" step="1" value="3" placeholder="3 Flutes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cnc-fpt">Feed / Tooth (IPT)</label>
          <input class="tool-textarea" id="cnc-fpt" type="number" step="0.0005" value="0.0040" placeholder="0.0040 in/tooth" />
        </div>
      </div>
      <div id="cnc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cnc-res-ipm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">55.0 IPM (1,397 mm/min)</span>
            <span class="stat-label">Table Feed Rate (F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cnc-res-rpm" style="font-weight:700;">4,584 RPM Spindle Speed</span>
            <span class="stat-label">Calculated Spindle Speed (RPM = SFM · 3.82 / D)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('cnc-d'), sfmEl = document.getElementById('cnc-sfm');
  const flEl = document.getElementById('cnc-fl'), fptEl = document.getElementById('cnc-fpt');
  const ipmResEl = document.getElementById('cnc-res-ipm'), rpmResEl = document.getElementById('cnc-res-rpm');

  function update() {
    const D_in = parseFloat(dEl.value), SFM = parseFloat(sfmEl.value);
    const Z = parseInt(flEl.value, 10), FPT_in = parseFloat(fptEl.value);

    if (isNaN(D_in) || isNaN(SFM) || isNaN(Z) || isNaN(FPT_in) || D_in <= 0 || SFM <= 0 || Z <= 0 || FPT_in <= 0) return;

    const rpm = (SFM * 3.8197) / D_in;
    const ipm = rpm * Z * FPT_in;
    const mmMin = ipm * 25.4;

    ipmResEl.textContent = ipm.toFixed(1) + ' IPM (' + Math.round(mmMin).toLocaleString() + ' mm/min)';
    rpmResEl.textContent = Math.round(rpm).toLocaleString() + ' RPM Spindle Speed (D = ' + D_in + '", ' + Z + '-Flute)';
  }

  [dEl, sfmEl, flEl, fptEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cutting tool shank / cutting edge diameter D in inches (e.g. 0.500" or 0.250").',
      'Enter material recommended Surface Feet per Minute (SFM) cutting speed (e.g. 600 SFM for Aluminum, 250 SFM for Mild Steel with carbide tooling).',
      'Enter number of cutting flutes Z.',
      'Enter recommended chip load per tooth (Feed Per Tooth IPT).',
      'Inspect spindle RPM and linear table travel feed rate in Inches Per Minute (IPM) and mm/min.'
    ],
    benefitTitle: 'Optimizing Machining Tool Life & Surface Finish',
    benefitContent: 'Running too slow rubs and overheats the carbide cutting edges, while running too fast causes tool chipping; calculating exact chip load per tooth ensures proper thermal chip evacuation and clean mirror finishes.',
    faqs: [{ q: 'What is the 3.82 constant in the RPM formula?', a: '3.82 = 12 / pi, which converts tool circumference in inches to surface speed in feet (SFM = pi · D · RPM / 12).' }]
  },

  // 12. Lathe Turning Surface Speed (SFM) to RPM & Feed Calculator
  {
    slug: 'lathe-turning-surface-speed-sfm-rpm-calculator',
    name: 'Lathe Turning Surface Speed (SFM) & Spindle RPM Calculator',
    description: 'Calculate CNC and manual lathe turning spindle speed (RPM = (SFM · 3.82) / D) in revolutions per minute and constant surface speed (CSS) for facing and turning operations.',
    category: 'Science',
    icon: 'text',
    keywords: ['lathe turning rpm calculator', 'surface speed sfm to rpm lathe formula', 'constant surface speed css lathe calculator', 'workpiece diameter turning rpm online', 'cnc lathe speeds and feeds calculator'],
    order: 570,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Workpiece Diameter D (in), Cutting Speed SFM & Feed per Rev (IPR)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lt-d">Stock Diameter D (in)</label>
          <input class="tool-textarea" id="lt-d" type="number" step="any" value="2.50" placeholder="2.50 in Diameter" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lt-sfm">Cutting Speed (SFM)</label>
          <input class="tool-textarea" id="lt-sfm" type="number" step="any" value="450" placeholder="450 SFM (Carbide on 4140 Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lt-ipr">Feed / Rev (IPR)</label>
          <input class="tool-textarea" id="lt-ipr" type="number" step="0.001" value="0.008" placeholder="0.008 in/rev" />
        </div>
      </div>
      <div id="lt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lt-res-rpm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">688 RPM</span>
            <span class="stat-label">Spindle Rotational Speed (RPM)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lt-res-ipm" style="font-weight:700;">5.50 IPM Feed Rate (140 mm/min)</span>
            <span class="stat-label">Longitudinal Carriage Travel Feed Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('lt-d'), sfmEl = document.getElementById('lt-sfm'), iprEl = document.getElementById('lt-ipr');
  const rpmResEl = document.getElementById('lt-res-rpm'), ipmResEl = document.getElementById('lt-res-ipm');

  function update() {
    const D = parseFloat(dEl.value), SFM = parseFloat(sfmEl.value), IPR = parseFloat(iprEl.value);
    if (isNaN(D) || isNaN(SFM) || isNaN(IPR) || D <= 0 || SFM <= 0 || IPR <= 0) return;

    const rpm = (SFM * 3.8197) / D;
    const ipm = rpm * IPR;
    const mmMin = ipm * 25.4;

    rpmResEl.textContent = Math.round(rpm).toLocaleString() + ' RPM (CSS ' + SFM + ' SFM @ Ø ' + D + '")';
    ipmResEl.textContent = ipm.toFixed(2) + ' IPM (' + Math.round(mmMin) + ' mm/min, Feed ' + IPR + ' IPR)';
  }

  [dEl, sfmEl, iprEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter current cylindrical workpiece turning diameter D in inches.',
      'Enter material recommended Surface Feet per Minute (SFM) turning speed.',
      'Enter longitudinal feed rate per spindle revolution (Inches Per Revolution IPR).',
      'Inspect required lathe spindle RPM and carriage linear traverse rate in Inches Per Minute (IPM).'
    ],
    benefitTitle: 'Constant Surface Speed (CSS) vs Fixed RPM',
    benefitContent: 'When facing across a cylinder face toward center zero, fixed RPM causes cutting speed to collapse to zero; CNC lathes use Constant Surface Speed (G96) to accelerate the spindle smoothly as diameter shrinks, preserving constant cutting forces.',
    faqs: [{ q: 'What is the maximum G50 RPM clamp on a CNC lathe?', a: 'G50 clamps maximum spindle RPM to prevent huge centrifugal forces from causing chuck jaws to release workpieces at small facing diameters.' }]
  },

  // 13. Taylor Tool Life Equation Cutting Speed Calculator
  {
    slug: 'taylor-tool-life-equation-cutting-speed-calculator',
    name: 'Taylor Tool Life Equation (V · Tⁿ = C) Machining Calculator',
    description: 'Calculate cutting tool life duration in minutes (T = (C / V)^(1/n)) and optimum cutting velocity V from Frederick Winslow Taylor empirical tool life constants n and C.',
    category: 'Science',
    icon: 'text',
    keywords: ['taylor tool life calculator', 'v t to the n equals c formula', 'tool wear life minutes calculator online', 'carbide hss taylor tool life equation online', 'metal cutting tool life optimization calculator'],
    order: 571,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cutting Speed V (m/min or SFM), Taylor Exponent n & Taylor Constant C',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tay-v">Cutting Speed V (m/min)</label>
          <input class="tool-textarea" id="tay-v" type="number" step="any" value="220.0" placeholder="220.0 m/min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tay-n">Taylor Exponent (n)</label>
          <select class="tool-textarea" id="tay-n">
            <option value="0.125">HSS Tool Steel (n = 0.125)</option>
            <option value="0.250" selected>Uncoated Carbide (n = 0.250)</option>
            <option value="0.350">TiAlN Coated Carbide (n = 0.350)</option>
            <option value="0.500">Ceramic / CBN Tooling (n = 0.500)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="tay-c">Taylor Constant C</label>
          <input class="tool-textarea" id="tay-c" type="number" step="any" value="450.0" placeholder="450.0" />
        </div>
      </div>
      <div id="tay-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tay-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">17.5 Minutes</span>
            <span class="stat-label">Estimated Tool Life (T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tay-res-eco" style="font-weight:700;">V_60 = 162.0 m/min for 60-Minute Tool Life</span>
            <span class="stat-label">Economic Cutting Velocity (60-Min Tool Life)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('tay-v'), nEl = document.getElementById('tay-n'), cEl = document.getElementById('tay-c');
  const tResEl = document.getElementById('tay-res-t'), ecoResEl = document.getElementById('tay-res-eco');

  function update() {
    const V = parseFloat(vEl.value), n = parseFloat(nEl.value), C = parseFloat(cEl.value);
    if (isNaN(V) || isNaN(n) || isNaN(C) || V <= 0 || n <= 0 || C <= 0) return;

    const T_min = Math.pow(C / V, 1 / n);
    const V_60 = C / Math.pow(60, n);

    let timeStr = '';
    if (T_min >= 60) timeStr = (T_min / 60).toFixed(1) + ' Hours (' + Math.round(T_min) + ' min)';
    else timeStr = T_min.toFixed(1) + ' Minutes';

    tResEl.textContent = timeStr + ' (V · T^' + n + ' = ' + C + ')';
    ecoResEl.textContent = 'V_60 = ' + V_60.toFixed(1) + ' m/min for 60-Minute Tool Life (V_15 = ' + (C / Math.pow(15, n)).toFixed(1) + ' m/min)';
  }

  [vEl, cEl].forEach(el => el.addEventListener('input', update));
  nEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter cutting speed V in meters per minute (or SFM).',
      'Select tool material Taylor exponent n (HSS = 0.12, Carbide = 0.25, Coated Carbide = 0.35, Ceramics = 0.50).',
      'Enter Taylor constant C (the cutting speed in m/min that yields exactly 1 minute of tool life).',
      'Inspect usable cutting insert lifespan in minutes before flank wear limit and economic 60-minute speed.'
    ],
    benefitTitle: 'Frederick Winslow Taylor 1906 Tool Wear Law',
    benefitContent: 'Taylor law (V · Tⁿ = C) proves that cutting speed is the single most destructive parameter driving tool flank wear; increasing speed by 20% can cut carbide insert life in half due to intense Arrhenius thermal degradation.',
    faqs: [{ q: 'What is Taylor constant C?', a: 'Constant C is the theoretical cutting velocity at which the tool would wear out in exactly 1 minute.' }]
  },

  // 14. Metal Removal Rate (MRR) Milling & Turning Calculator
  {
    slug: 'metal-removal-rate-mrr-milling-turning-calculator',
    name: 'Metal Removal Rate (MRR) Milling & Turning Calculator',
    description: 'Calculate metal cutting volumetric material removal rate (MRR = WOC · DOC · Feed) in in³/min and cm³/min to determine roughing productivity and spindle power demands.',
    category: 'Science',
    icon: 'text',
    keywords: ['metal removal rate calculator', 'mrr formula milling turning', 'volumetric cutting rate in3 per min calculator', 'width of cut depth of cut feed mrr online', 'cnc roughing productivity mrr calculator'],
    order: 572,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Radial Width of Cut WOC / Stepover (in), Axial Depth of Cut DOC (in) & Feed Rate (IPM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mrr-woc">Radial Width (WOC / ae)</label>
          <input class="tool-textarea" id="mrr-woc" type="number" step="any" value="0.250" placeholder="0.250 in (50% Stepover)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mrr-doc">Axial Depth (DOC / ap)</label>
          <input class="tool-textarea" id="mrr-doc" type="number" step="any" value="0.500" placeholder="0.500 in Depth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mrr-feed">Table Feed (IPM)</label>
          <input class="tool-textarea" id="mrr-feed" type="number" step="any" value="60.0" placeholder="60.0 IPM" />
        </div>
      </div>
      <div id="mrr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mrr-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.50 in³ / min</span>
            <span class="stat-label">Material Removal Rate (MRR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mrr-res-metric" style="font-weight:700;">122.9 cm³ / min (7.37 Liters / hour)</span>
            <span class="stat-label">Metric Volumetric Cutting Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('mrr-woc'), dEl = document.getElementById('mrr-doc'), fEl = document.getElementById('mrr-feed');
  const valResEl = document.getElementById('mrr-res-val'), metResEl = document.getElementById('mrr-res-metric');

  function update() {
    const WOC = parseFloat(wEl.value), DOC = parseFloat(dEl.value), Feed = parseFloat(fEl.value);
    if (isNaN(WOC) || isNaN(DOC) || isNaN(Feed) || WOC <= 0 || DOC <= 0 || Feed <= 0) return;

    const mrr_in3_min = WOC * DOC * Feed;
    const mrr_cm3_min = mrr_in3_min * 16.387064;
    const litersPerHour = (mrr_cm3_min * 60) / 1000;

    valResEl.textContent = mrr_in3_min.toFixed(2) + ' in³ / min';
    metResEl.textContent = mrr_cm3_min.toFixed(1) + ' cm³ / min (' + litersPerHour.toFixed(2) + ' Liters of Chips / hr)';
  }

  [wEl, dEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter radial width of cut WOC (stepover) in inches.',
      'Enter axial depth of cut DOC in inches.',
      'Enter linear feed rate in Inches Per Minute (IPM).',
      'Inspect volumetric material removal rate in cubic inches per minute and metric cm³/min.'
    ],
    benefitTitle: 'Roughing Productivity Figure of Merit',
    benefitContent: 'MRR is the primary metric evaluating roughing efficiency in high-performance CNC machining centers; balancing high MRR against spindle horsepower limits tool deflection and machine vibration chatter.',
    faqs: [{ q: 'What is High Efficiency Milling (HEM)?', a: 'HEM uses a light radial width of cut (WOC 5-15%) combined with full axial flute depth (DOC 100-200%) at extreme feed rates to maximize MRR while keeping cutting temperatures low.' }]
  },

  // 15. CNC Spindle Cutting Power & Unit Power Requirement Calculator
  {
    slug: 'drill-thrust-force-spindle-power-calculator',
    name: 'CNC Spindle Cutting Power & Machinability Power Requirement Calculator',
    description: 'Calculate net spindle motor horsepower and kilowatts (P = MRR · K_p / η) required to machine Aluminum, Steel, Titanium, and Cast Iron from unit power coefficients K_p.',
    category: 'Science',
    icon: 'text',
    keywords: ['spindle cutting power calculator', 'machining motor power formula mrr times kp', 'horsepower required milling turning calculator', 'unit power coefficient kp steel aluminum online', 'cnc spindle horsepower demand calculator'],
    order: 573,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Material Workpiece, Material Removal Rate MRR (in³/min) & Spindle Efficiency η (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-mat">Workpiece Material (K_p)</label>
          <select class="tool-textarea" id="sp-mat">
            <option value="0.25">Aluminum Alloys 6061/7075 (K_p = 0.25 HP/in³/min)</option>
            <option value="0.50">Brass & Bronze Alloys (K_p = 0.50 HP/in³/min)</option>
            <option value="0.75">Cast Iron (K_p = 0.75 HP/in³/min)</option>
            <option value="1.00" selected>Carbon & Alloy Steels (K_p = 1.00 HP/in³/min)</option>
            <option value="1.40">Stainless Steel 304/316 (K_p = 1.40 HP/in³/min)</option>
            <option value="1.75">Titanium Ti-6Al-4V / Inconel (K_p = 1.75 HP/in³/min)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-mrr">MRR (in³ / min)</label>
          <input class="tool-textarea" id="sp-mrr" type="number" step="any" value="6.0" placeholder="6.0 in³/min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-eta">Drivetrain Efficiency η (%)</label>
          <input class="tool-textarea" id="sp-eta" type="number" step="1" value="80" placeholder="80% Spindle Mechanical Eff" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-hp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.50 HP (5.59 kW)</span>
            <span class="stat-label">Required Spindle Motor Power (P_motor)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-cut" style="font-weight:700;">Cut Power: 6.00 HP | Torque @ 4000 RPM: 9.8 ft·lbs</span>
            <span class="stat-label">Net Tool-Tip Power & Spindle Torque</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('sp-mat'), mrrEl = document.getElementById('sp-mrr'), etaEl = document.getElementById('sp-eta');
  const hpResEl = document.getElementById('sp-res-hp'), cutResEl = document.getElementById('sp-res-cut');

  function update() {
    const Kp = parseFloat(mEl.value), mrr = parseFloat(mrrEl.value), etaPct = parseFloat(etaEl.value);
    if (isNaN(Kp) || isNaN(mrr) || isNaN(etaPct) || Kp <= 0 || mrr <= 0 || etaPct <= 0) return;

    const eta = etaPct / 100;
    const pCutHp = mrr * Kp;
    const pMotorHp = pCutHp / eta;
    const pMotorKw = pMotorHp * 0.7457;

    hpResEl.textContent = pMotorHp.toFixed(2) + ' HP (' + pMotorKw.toFixed(2) + ' kW Motor Demand)';
    cutResEl.textContent = 'Net Tool-Tip Power: ' + pCutHp.toFixed(2) + ' HP (Unit Power K_p = ' + Kp.toFixed(2) + ' HP/in³/min)';
  }

  mrrEl.addEventListener('input', update);
  etaEl.addEventListener('input', update);
  mEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select workpiece material unit power coefficient K_p (Aluminum, Carbon Steel, Stainless, Titanium).',
      'Enter volumetric metal removal rate MRR in in³/min.',
      'Enter spindle electrical/mechanical transmission efficiency percentage η (typically 80% to 85%).',
      'Inspect required spindle motor electrical horsepower (HP) and kilowatts (kW).'
    ],
    benefitTitle: 'Specific Cutting Energy & Spindle Sizing',
    benefitContent: 'Different metal crystal structures require distinct specific cutting energies; cutting Titanium requires 7 times more spindle horsepower per cubic inch removed than Aluminum.',
    faqs: [{ q: 'What is unit power coefficient K_p?', a: 'K_p is the specific horsepower required to machine away 1 cubic inch of material in 1 minute (HP = MRR · K_p).' }]
  },

  // --- Suite ZZZ: Cryptography & Information Theory (696 - 700) ---
  // 16. Shannon Entropy & Information Content Calculator
  {
    slug: 'shannon-entropy-information-content-calculator',
    name: 'Shannon Entropy & Information Content (H = -Σ p · log₂ p) Calculator',
    description: 'Calculate Claude Shannon information entropy (H(X) = -Σ p_i · log₂(p_i)) in bits per symbol and data compression redundancy limits for text, alphabet symbols, and discrete distributions.',
    category: 'Science',
    icon: 'text',
    keywords: ['shannon entropy calculator', 'information entropy formula minus sum p log2 p', 'bits per symbol data compression calculator', 'claude shannon information theory online', 'entropy of discrete probability distribution calculator'],
    order: 574,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input Text String or Symbol Probability Values (p₁, p₂, p₃...)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sh-txt">Sample Text to Analyze</label>
        <textarea class="tool-textarea" id="sh-txt" rows="3" placeholder="Type or paste text here to measure Shannon entropy in bits/symbol...">Claude Shannon 1948 A Mathematical Theory of Communication</textarea>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-bits" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4.22 Bits / Symbol</span>
            <span class="stat-label">Shannon Information Entropy (H)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-eff" style="font-weight:700;">Theoretical Max: 4.64 bits | Redundancy: 9.1%</span>
            <span class="stat-label">Entropy Efficiency & Lossless Compression Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('sh-txt');
  const bResEl = document.getElementById('sh-res-bits'), eResEl = document.getElementById('sh-res-eff');

  function update() {
    const text = tEl.value;
    if (!text || text.length === 0) {
      bResEl.textContent = '0.00 Bits / Symbol';
      eResEl.textContent = 'Enter text to calculate';
      return;
    }

    const totalChars = text.length;
    const freqs = {};
    for (let i = 0; i < totalChars; i++) {
      const ch = text[i];
      freqs[ch] = (freqs[ch] || 0) + 1;
    }

    const uniqueChars = Object.keys(freqs).length;
    let H = 0;
    for (const ch in freqs) {
      const p = freqs[ch] / totalChars;
      H += -p * (Math.log(p) / Math.LN2);
    }

    const H_max = uniqueChars > 1 ? (Math.log(uniqueChars) / Math.LN2) : 1;
    const redundancyPct = uniqueChars > 1 ? Math.max(0, (1 - (H / H_max)) * 100) : 0;
    const minCompressedBytes = Math.ceil((H * totalChars) / 8);

    bResEl.textContent = H.toFixed(2) + ' Bits / Character (H(X))';
    eResEl.textContent = 'Unique Symbols: ' + uniqueChars + ' | Min Compressed: ' + minCompressedBytes + ' Bytes (' + redundancyPct.toFixed(1) + '% Redundancy)';
  }

  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Type or paste any text string or code into the input box.',
      'The calculator computes exact relative frequency probability p_i = n_i / N for every unique character.',
      'Inspect Shannon entropy in bits per symbol and theoretical lossless compression storage ceiling.'
    ],
    benefitTitle: 'Claude Shannon 1948 Information Theory Foundation',
    benefitContent: 'Shannon entropy measures the fundamental average uncertainty and information density in a message; it sets the mathematical lower bound for lossless data compression algorithms.',
    faqs: [{ q: 'What is the maximum entropy of standard 8-bit ASCII text?', a: '8.00 bits per character (when all 256 byte values are distributed with equal uniform probability).' }]
  },

  // 17. Shannon-Hartley Theorem Channel Capacity Bandwidth Calculator
  {
    slug: 'shannon-hartley-channel-capacity-bandwidth-calculator',
    name: 'Shannon-Hartley Channel Capacity (C = B · log₂(1 + SNR)) Calculator',
    description: 'Calculate maximum theoretical error-free data transmission channel capacity (C = B · log₂(1 + SNR)) in Mbps/Gbps from analog channel bandwidth B (Hz) and Signal-to-Noise Ratio (SNR in dB).',
    category: 'Science',
    icon: 'text',
    keywords: ['shannon hartley channel capacity calculator', 'c b log2 1 plus snr formula', 'signal to noise ratio channel bandwidth calculator', 'wifi 5g channel data rate shannon limit online', 'telecommunications shannon capacity calculator'],
    order: 575,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Channel Bandwidth B (MHz) & Signal-to-Noise Ratio SNR (dB)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-b">Bandwidth B (MHz)</label>
          <input class="tool-textarea" id="sh-b" type="number" step="any" value="20.0" placeholder="20.0 MHz (WiFi 2.4 GHz Channel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-snr">SNR (dB)</label>
          <input class="tool-textarea" id="sh-snr" type="number" step="any" value="30.0" placeholder="30.0 dB (SNR = 1000:1)" />
        </div>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-c" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">199.3 Mbps</span>
            <span class="stat-label">Maximum Channel Capacity (C)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-spec" style="font-weight:700;">Spectral Efficiency: 9.97 bits / s / Hz</span>
            <span class="stat-label">Spectral Information Density (C / B)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('sh-b'), snrEl = document.getElementById('sh-snr');
  const cResEl = document.getElementById('sh-res-c'), spResEl = document.getElementById('sh-res-spec');

  function update() {
    const bMhz = parseFloat(bEl.value), snrDb = parseFloat(snrEl.value);
    if (isNaN(bMhz) || isNaN(snrDb) || bMhz <= 0) return;

    const bHz = bMhz * 1e6;
    const snrLinear = Math.pow(10, snrDb / 10);
    const cBps = bHz * (Math.log(1 + snrLinear) / Math.LN2);
    const cMbps = cBps / 1e6;
    const cGbps = cBps / 1e9;
    const specEff = Math.log(1 + snrLinear) / Math.LN2;

    cResEl.textContent = (cGbps >= 1.0 ? cGbps.toFixed(2) + ' Gbps' : cMbps.toFixed(1) + ' Mbps') + ' (Shannon Limit)';
    spResEl.textContent = 'Spectral Efficiency: ' + specEff.toFixed(2) + ' bits/sec/Hz (Linear SNR = ' + Math.round(snrLinear).toLocaleString() + ':1)';
  }

  bEl.addEventListener('input', update);
  snrEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter analog channel bandwidth B in Megahertz (e.g. 20 MHz WiFi, 100 MHz 5G NR carrier).',
      'Enter Signal-to-Noise Ratio (SNR) in decibels (dB).',
      'Inspect theoretical maximum error-free data channel throughput in Mbps/Gbps and spectral efficiency (bits/s/Hz).'
    ],
    benefitTitle: 'The Shannon-Hartley Telecommunications Ceiling',
    benefitContent: 'No modulation scheme can transmit data faster than C = B · log₂(1 + SNR) without corrupted packet errors; doubling channel bandwidth doubles data rate linearly, while increasing SNR yields logarithmic gains.',
    faqs: [{ q: 'What is 30 dB SNR in linear signal power ratio?', a: '30 dB = 10^(30/10) = 1000:1, meaning the signal power is 1,000 times stronger than background thermal noise power.' }]
  },

  // 18. Diffie-Hellman Key Exchange Modular Exponentiation Calculator
  {
    slug: 'diffie-hellman-key-exchange-modular-exponentiation-calculator',
    name: 'Diffie-Hellman Key Exchange Modular Exponentiation Calculator',
    description: 'Calculate public keys (A = g^a mod p, B = g^b mod p) and shared secret key (s = B^a mod p = A^b mod p) to simulate asymmetric cryptographic key agreement.',
    category: 'Science',
    icon: 'text',
    keywords: ['diffie hellman key exchange calculator', 'modular exponentiation g to the a mod p calculator', 'shared secret key diffie hellman online', 'discrete logarithm cryptography calculator', 'public key exchange simulator online'],
    order: 576,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Prime Modulus p, Generator g, Alice Secret a & Bob Secret b',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dh-p">Prime Modulus (p)</label>
          <input class="tool-textarea" id="dh-p" type="number" step="1" value="23" placeholder="23 (Prime)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-g">Base Generator (g)</label>
          <input class="tool-textarea" id="dh-g" type="number" step="1" value="5" placeholder="5 (Primitive Root)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-a">Alice Private (a)</label>
          <input class="tool-textarea" id="dh-a" type="number" step="1" value="6" placeholder="6 (Alice Secret)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-b">Bob Private (b)</label>
          <input class="tool-textarea" id="dh-b" type="number" step="1" value="15" placeholder="15 (Bob Secret)" />
        </div>
      </div>
      <div id="dh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dh-res-sec" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Shared Secret s = 2</span>
            <span class="stat-label">Agreed Symmetric Shared Secret Key (s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dh-res-pub" style="font-weight:700;">Alice Public A = 8 | Bob Public B = 19</span>
            <span class="stat-label">Public Intermediary Keys Transmitted Openly</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('dh-p'), gEl = document.getElementById('dh-g');
  const aEl = document.getElementById('dh-a'), bEl = document.getElementById('dh-b');
  const sResEl = document.getElementById('dh-res-sec'), pubResEl = document.getElementById('dh-res-pub');

  function modExp(base, exp, mod) {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      exp = exp / 2n;
      base = (base * base) % mod;
    }
    return res;
  }

  function update() {
    try {
      const p = BigInt(pEl.value), g = BigInt(gEl.value);
      const a = BigInt(aEl.value), b = BigInt(bEl.value);

      if (p <= 2n || g <= 1n || a <= 0n || b <= 0n) return;

      const A = modExp(g, a, p);
      const B = modExp(g, b, p);
      const s_alice = modExp(B, a, p);

      sResEl.textContent = 'Shared Secret s = ' + s_alice.toString() + ' (Identical for Alice & Bob!)';
      pubResEl.textContent = 'Alice Public A = ' + A.toString() + ' | Bob Public B = ' + B.toString() + ' (mod ' + p.toString() + ')';
    } catch (err) {}
  }

  [pEl, gEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter shared prime modulus p (e.g. 23) and generator base g (e.g. 5).',
      'Enter Alice secret private integer a and Bob secret private integer b.',
      'Inspect public keys A = g^a mod p and B = g^b mod p sent over untrusted public networks.',
      'Verify that Alice calculating B^a mod p and Bob calculating A^b mod p arrive at the exact same shared secret key.'
    ],
    benefitTitle: 'Whitfield Diffie & Martin Hellman 1976 Key Exchange',
    benefitContent: 'Diffie-Hellman allows two parties to create a shared secret encryption key over an insecure eavesdropped public channel without exchanging the secret itself, based on the intractability of the discrete logarithm problem.',
    faqs: [{ q: 'Why can\'t an eavesdropper deduce the secret from A and B?', a: 'Computing the discrete logarithm a from g^a mod p with 2048-bit prime numbers would take trillions of supercomputer years.' }]
  },

  // 19. RSA Asymmetric Public/Private Key Math Calculator
  {
    slug: 'rsa-public-private-key-math-calculator',
    name: 'RSA Asymmetric Public & Private Key Encryption Math Calculator',
    description: 'Calculate RSA key components (n = p · q, Euler totient φ(n) = (p - 1) · (q - 1), private exponent d ≡ e⁻¹ mod φ(n)) and simulate message encryption/decryption.',
    category: 'Science',
    icon: 'text',
    keywords: ['rsa key calculator', 'rsa encryption math formula n p q', 'modular inverse private exponent d calculator', 'euler totient phi n rsa calculator', 'rsa public private key generator online'],
    order: 577,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Prime p, Prime q, Public Exponent e & Plaintext Message M (Integer)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rsa-p">Prime (p)</label>
          <input class="tool-textarea" id="rsa-p" type="number" step="1" value="61" placeholder="61" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-q">Prime (q)</label>
          <input class="tool-textarea" id="rsa-q" type="number" step="1" value="53" placeholder="53" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-e">Public (e)</label>
          <input class="tool-textarea" id="rsa-e" type="number" step="1" value="17" placeholder="17 (Coprime to φ)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rsa-m">Message (M)</label>
          <input class="tool-textarea" id="rsa-m" type="number" step="1" value="65" placeholder="65 (e.g. ASCII 'A')" />
        </div>
      </div>
      <div id="rsa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rsa-res-ciph" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ciphertext C = 2790</span>
            <span class="stat-label">Encrypted Ciphertext (C = M^e mod n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rsa-res-keys" style="font-weight:700;">Public: (n=3233, e=17) | Private d = 2753</span>
            <span class="stat-label">Modulus n, Totient φ(n)=3120 & Private Key d</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('rsa-p'), qEl = document.getElementById('rsa-q');
  const eEl = document.getElementById('rsa-e'), mEl = document.getElementById('rsa-m');
  const cResEl = document.getElementById('rsa-res-ciph'), kResEl = document.getElementById('rsa-res-keys');

  function modExp(base, exp, mod) {
    let res = 1n;
    base = base % mod;
    while (exp > 0n) {
      if (exp % 2n === 1n) res = (res * base) % mod;
      exp = exp / 2n;
      base = (base * base) % mod;
    }
    return res;
  }

  function modInverse(e, phi) {
    let [m0, y, x] = [phi, 0n, 1n];
    if (phi === 1n) return 0n;
    while (e > 1n) {
      if (phi === 0n) return null;
      let q = e / phi;
      let t = phi;
      phi = e % phi;
      e = t;
      t = y;
      y = x - q * y;
      x = t;
    }
    if (x < 0n) x += m0;
    return x;
  }

  function update() {
    try {
      const p = BigInt(pEl.value), q = BigInt(qEl.value);
      const e = BigInt(eEl.value), M = BigInt(mEl.value);

      if (p <= 1n || q <= 1n || p === q || e <= 1n || M < 0n) return;

      const n = p * q;
      const phi = (p - 1n) * (q - 1n);
      const d = modInverse(e, phi);
      if (!d) {
        cResEl.textContent = 'Error: e is not coprime to φ(n)';
        return;
      }

      const C = modExp(M, e, n);
      const M_dec = modExp(C, d, n);

      cResEl.textContent = 'Ciphertext C = ' + C.toString() + ' (Decrypted: ' + M_dec.toString() + ')';
      kResEl.textContent = 'Public (n=' + n.toString() + ', e=' + e.toString() + ') | Private d=' + d.toString() + ' (φ=' + phi.toString() + ')';
    } catch (err) {}
  }

  [pEl, qEl, eEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter two prime numbers p and q (e.g. 61 and 53).',
      'Enter public exponent e (e.g. 17 or 65537, must be coprime to φ(n)).',
      'Enter plaintext integer message M (M < n).',
      'Inspect generated RSA modulus n = p · q, Euler totient φ(n), calculated private key d, and encrypted ciphertext C = M^e mod n.'
    ],
    benefitTitle: 'Ron Rivest, Adi Shamir & Leonard Adleman 1977 RSA Cryptosystem',
    benefitContent: 'RSA security rests on the computational asymmetry of prime factorization: multiplying two 1024-bit primes to create n takes microseconds, but factoring n back into p and q to find private key d requires billions of compute years.',
    faqs: [{ q: 'Why is e = 65537 the standard public exponent in RSA?', a: '65537 has only two set binary bits, making modular exponentiation M^e mod n extraordinarily fast via repeated squaring (only 17 multiplications).' }]
  },

  // 20. Password Entropy & Brute-Force Crack Time Calculator
  {
    slug: 'password-entropy-crack-time-brute-force-calculator',
    name: 'Password Entropy & GPU Brute-Force Crack Time Calculator',
    description: 'Calculate cryptographic password entropy in bits (E = L · log₂(N)) and estimated brute-force crack time across modern 100 Billion Hash/sec RTX 4090 GPU clusters.',
    category: 'Science',
    icon: 'text',
    keywords: ['password entropy calculator', 'bits of entropy password formula', 'brute force crack time calculator online', 'rtx 4090 hashcat password crack duration', 'nist password complexity entropy calculator'],
    order: 578,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Password Character Pool Set & Length (L Characters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pw-str">Test Password / Phrase</label>
          <input class="tool-textarea" id="pw-str" type="text" value="CorrectHorseBatteryStaple!9" placeholder="Enter password..." />
        </div>
        <div class="control-group">
          <label class="control-label" for="pw-hash">GPU Speed (Hashes/sec)</label>
          <select class="tool-textarea" id="pw-hash">
            <option value="1e9">1 Billion / sec (Single Modern GPU)</option>
            <option value="1e11" selected>100 Billion / sec (8× RTX 4090 Cluster)</option>
            <option value="1e13">10 Trillion / sec (Nation-State Supercomputer)</option>
          </select>
        </div>
      </div>
      <div id="pw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pw-res-bits" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">177.4 Bits of Entropy</span>
            <span class="stat-label">Information-Theoretic Password Strength</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pw-res-time" style="color:var(--green-dark); font-weight:700;">6.2 × 10³¹ Years (Unbreakable)</span>
            <span class="stat-label">Estimated GPU Brute-Force Exhaustion Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('pw-str'), hEl = document.getElementById('pw-hash');
  const bResEl = document.getElementById('pw-res-bits'), tResEl = document.getElementById('pw-res-time');

  function update() {
    const pw = pEl.value;
    const hashesPerSec = parseFloat(hEl.value);

    if (!pw || pw.length === 0) {
      bResEl.textContent = '0.0 Bits of Entropy';
      tResEl.textContent = 'Instantaneous Crack (Empty)';
      return;
    }

    const L = pw.length;
    let poolSize = 0;
    const hasLower = /[a-z]/.test(pw);
    const hasUpper = /[A-Z]/.test(pw);
    const hasDigits = /[0-9]/.test(pw);
    const hasSymbols = /[^a-zA-Z0-9]/.test(pw);

    if (hasLower) poolSize += 26;
    if (hasUpper) poolSize += 26;
    if (hasDigits) poolSize += 10;
    if (hasSymbols) poolSize += 33;

    const entropyBits = L * (Math.log(poolSize) / Math.LN2);
    const log10_seconds = ((entropyBits - 1) * Math.LOG10E * Math.LN2) - Math.log10(hashesPerSec);
    const seconds = Math.pow(10, log10_seconds);
    const years = seconds / 31557600;

    let timeStr = '';
    if (log10_seconds > 18) {
      const expYears = (log10_seconds - Math.log10(31557600));
      timeStr = '10^' + expYears.toFixed(0) + ' Years (Cosmologically Uncrackable)';
      tResEl.style.color = '#22543d';
    } else if (years >= 1e9) {
      timeStr = (years / 1e9).toFixed(1) + ' Billion Years';
      tResEl.style.color = '#22543d';
    } else if (years >= 1e6) {
      timeStr = (years / 1e6).toFixed(1) + ' Million Years';
      tResEl.style.color = '#22543d';
    } else if (years >= 1.0) {
      timeStr = years.toFixed(1) + ' Years';
      tResEl.style.color = '#2563eb';
    } else if (seconds >= 86400) {
      timeStr = (seconds / 86400).toFixed(1) + ' Days';
      tResEl.style.color = '#d97706';
    } else if (seconds >= 3600) {
      timeStr = (seconds / 3600).toFixed(1) + ' Hours';
      tResEl.style.color = '#c53030';
    } else if (seconds >= 60) {
      timeStr = (seconds / 60).toFixed(1) + ' Minutes';
      tResEl.style.color = '#c53030';
    } else {
      timeStr = seconds.toFixed(2) + ' Seconds (CRACKED INSTANTLY)';
      tResEl.style.color = '#c53030';
    }

    bResEl.textContent = entropyBits.toFixed(1) + ' Bits (L = ' + L + ', Pool N = ' + poolSize + ')';
    tResEl.textContent = timeStr + ' @ ' + (hashesPerSec >= 1e12 ? (hashesPerSec/1e12) + ' TH/s' : (hashesPerSec/1e9) + ' GH/s');
  }

  pEl.addEventListener('input', update);
  hEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Type any test password or multi-word passphrase into the input field.',
      'Select simulated brute-force cracking hardware hash rate (1 Billion/s single GPU to 10 Trillion/s supercomputer).',
      'Inspect NIST character pool size, Shannon password entropy in bits, and estimated time required for exhaustive brute-force recovery.'
    ],
    benefitTitle: 'Exponential Passphrase Length Scaling',
    benefitContent: 'Adding just 4 random characters to a password expands the search keyspace by over 73 million times; passphrases with >80 bits of entropy are virtually impossible to crack with current physics limits.',
    faqs: [{ q: 'How much entropy is considered completely secure against offline attacks?', a: 'NIST and cybersecurity standards recommend at least 80 bits of entropy for standard accounts and 128 bits for master encryption keys.' }]
  },

  // --- Suite AAAA: Space Flight Mechanics & Rocket Propulsion (701 - 705) ---
  // 21. Tsiolkovsky Rocket Equation (Delta-v) Calculator
  {
    slug: 'tsiolkovsky-rocket-equation-delta-v-calculator',
    name: 'Tsiolkovsky Rocket Equation (Δv = I_sp · g₀ · ln(m₀ / m_f)) Calculator',
    description: 'Calculate orbital rocket velocity increment (Δv = I_sp · g₀ · ln(m₀ / m_f)) in km/s and payload mass fraction from engine specific impulse I_sp and wet/dry mass.',
    category: 'Science',
    icon: 'text',
    keywords: ['tsiolkovsky rocket equation calculator', 'delta v formula isp g0 ln m0 over mf', 'specific impulse rocket delta v calculator online', 'orbital velocity payload mass fraction calculator', 'space flight mechanics rocket equation online'],
    order: 579,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Specific Impulse I_sp (seconds), Wet Mass m₀ (kg) & Dry Mass m_f (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-isp">Specific Impulse I_sp (s)</label>
          <input class="tool-textarea" id="rk-isp" type="number" step="any" value="348.0" placeholder="348.0 s (Merlin 1D Vacuum)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-m0">Wet Mass m₀ (kg)</label>
          <input class="tool-textarea" id="rk-m0" type="number" step="any" value="115000" placeholder="115,000 kg (Stage 2 + Payload)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-mf">Dry Mass m_f (kg)</label>
          <input class="tool-textarea" id="rk-mf" type="number" step="any" value="12500" placeholder="12,500 kg (Empty Stage + Payload)" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.58 km / s (7,575 m/s)</span>
            <span class="stat-label">Total Delta-v Velocity Increment (Δv)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-mass" style="font-weight:700;">Mass Ratio: 9.20 : 1 (89.1% Propellant Mass Fraction)</span>
            <span class="stat-label">Stage Propellant Mass Fraction (m_prop / m₀)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ispEl = document.getElementById('rk-isp'), m0El = document.getElementById('rk-m0'), mfEl = document.getElementById('rk-mf');
  const dvResEl = document.getElementById('rk-res-dv'), msResEl = document.getElementById('rk-res-mass');

  const g0 = 9.80665;

  function update() {
    const Isp = parseFloat(ispEl.value), m0 = parseFloat(m0El.value), mf = parseFloat(mfEl.value);
    if (isNaN(Isp) || isNaN(m0) || isNaN(mf) || Isp <= 0 || m0 <= 0 || mf <= 0 || mf >= m0) return;

    const ve = Isp * g0;
    const deltaV = ve * Math.log(m0 / mf);
    const deltaV_kms = deltaV / 1000;

    const massRatio = m0 / mf;
    const propMass = m0 - mf;
    const propFractionPct = (propMass / m0) * 100;

    dvResEl.textContent = deltaV_kms.toFixed(2) + ' km / s (' + Math.round(deltaV).toLocaleString() + ' m/s Δv)';
    msResEl.textContent = 'Mass Ratio: ' + massRatio.toFixed(2) + ' : 1 (' + propFractionPct.toFixed(1) + '% Propellant, v_e = ' + Math.round(ve) + ' m/s)';
  }

  [ispEl, m0El, mfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rocket engine specific impulse I_sp in seconds (e.g. 311s for Kerolox sea level, 348s for vacuum, 450s for Hydrolox).',
      'Enter initial wet fully-fueled rocket mass m₀ in kilograms.',
      'Enter final dry burnout mass m_f in kilograms (empty stage hardware + payload).',
      'Inspect total orbital velocity change Δv in km/s and stage propellant mass fraction.'
    ],
    benefitTitle: 'Konstantin Tsiolkovsky 1903 Rocketry Equation',
    benefitContent: 'Tsiolkovsky showed that escaping Earth gravity into Low Earth Orbit requires Δv ≈ 9.4 km/s; because velocity scales logarithmically with mass ratio, staging is mandatory to avoid carrying empty dry tanks.',
    faqs: [{ q: 'Why is specific impulse (I_sp) measured in seconds?', a: 'Specific impulse is thrust divided by weight flow rate of fuel (I_sp = F / (ṁ · g₀)), canceling units down to seconds across both metric and imperial systems.' }]
  },

  // 22. Hohmann Orbital Transfer Orbit Delta-v Calculator
  {
    slug: 'hohmann-transfer-orbit-delta-v-calculator',
    name: 'Hohmann Transfer Orbit Delta-v & Flight Time Calculator',
    description: 'Calculate two-impulse Hohmann orbital transfer maneuver velocity changes (Δv₁ and Δv₂) in km/s and transfer time in hours/days between circular orbits around Earth or the Sun.',
    category: 'Science',
    icon: 'text',
    keywords: ['hohmann transfer orbit calculator', 'orbital transfer delta v formula r1 r2', 'leo to geo hohmann transfer calculator', 'orbital mechanics delta v1 delta v2 online', 'spacecraft orbit raising transfer time calculator'],
    order: 580,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Orbit Radius r₁ (km) & Target Orbit Radius r₂ (km) [Earth: μ = 398,600 km³/s²]',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hoh-r1">Initial Radius r₁ (km)</label>
          <input class="tool-textarea" id="hoh-r1" type="number" step="any" value="6678.0" placeholder="6678 km (300 km LEO Alt)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hoh-r2">Final Radius r₂ (km)</label>
          <input class="tool-textarea" id="hoh-r2" type="number" step="any" value="42164.0" placeholder="42,164 km (Geostationary GEO)" />
        </div>
      </div>
      <div id="hoh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hoh-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.93 km / s Total Δv</span>
            <span class="stat-label">Total Hohmann Maneuver Delta-v (Δv₁ + Δv₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hoh-res-time" style="font-weight:700;">Transfer Time: 5.27 Hours (Burn 1: 2.44 km/s | Burn 2: 1.49 km/s)</span>
            <span class="stat-label">Transfer Ellipse Flight Duration & Individual Burns</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('hoh-r1'), r2El = document.getElementById('hoh-r2');
  const totResEl = document.getElementById('hoh-res-tot'), timResEl = document.getElementById('hoh-res-time');

  const mu_earth = 398600.4418;

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0 || r1 === r2) return;

    const aTx = (r1 + r2) / 2;
    const v1 = Math.sqrt(mu_earth / r1);
    const v2 = Math.sqrt(mu_earth / r2);

    const vTx1 = Math.sqrt(mu_earth * ((2 / r1) - (1 / aTx)));
    const dv1 = Math.abs(vTx1 - v1);

    const vTx2 = Math.sqrt(mu_earth * ((2 / r2) - (1 / aTx)));
    const dv2 = Math.abs(v2 - vTx2);
    const totalDv = dv1 + dv2;

    const tSec = Math.PI * Math.sqrt(Math.pow(aTx, 3) / mu_earth);
    const tHours = tSec / 3600;
    const tDays = tHours / 24;

    totResEl.textContent = totalDv.toFixed(2) + ' km / s Total Δv';

    let timeStr = '';
    if (tDays >= 1.0) timeStr = tDays.toFixed(2) + ' Days (' + tHours.toFixed(1) + ' hrs)';
    else timeStr = tHours.toFixed(2) + ' Hours';

    timResEl.textContent = 'Flight Time: ' + timeStr + ' (Burn 1: ' + dv1.toFixed(2) + ' km/s, Burn 2: ' + dv2.toFixed(2) + ' km/s)';
  }

  r1El.addEventListener('input', update);
  r2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter initial circular orbit radius r₁ from Earth center in kilometers (Earth Radius = 6,378 km + Altitude).',
      'Enter destination circular orbit radius r₂ in kilometers (e.g. Geostationary GEO = 42,164 km).',
      'Inspect total two-burn Δv = Δv₁ + Δv₂ requirement and half-ellipse coast transfer duration.'
    ],
    benefitTitle: 'Walter Hohmann 1925 Optimal Orbital Transfer',
    benefitContent: 'A Hohmann transfer is the most fuel-efficient two-impulse orbital maneuver connecting two coplanar circular orbits, using an elliptical transfer orbit tangent to both initial and final trajectories.',
    faqs: [{ q: 'What is the Delta-v required to go from LEO to GEO?', a: 'Transferring from a 300 km Low Earth Orbit to Geostationary Orbit requires exactly Δv₁ = 2.44 km/s and Δv₂ = 1.49 km/s (total 3.93 km/s).' }]
  },

  // 23. Rocket Thrust & Specific Impulse (I_sp) Calculator
  {
    slug: 'rocket-thrust-specific-impulse-calculator',
    name: 'Rocket Engine Thrust & Specific Impulse (I_sp) Calculator',
    description: 'Calculate rocket motor total thrust force (F = ṁ · v_e + (p_e - p_a) · A_e) in kN and specific impulse (I_sp = F / (ṁ · g₀)) from propellant mass flow rate ṁ and nozzle exit conditions.',
    category: 'Science',
    icon: 'text',
    keywords: ['rocket thrust calculator', 'specific impulse formula isp f over mdot g0', 'mass flow rate rocket thrust calculator online', 'nozzle exit pressure thrust equation calculator', 'rocket propulsion engineering calculator'],
    order: 581,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass Flow ṁ (kg/s), Exit Velocity v_e (m/s), Exit Area A_e (m²) & Pressure Delta (p_e - p_a in kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="th-mdot">Mass Flow ṁ (kg/s)</label>
          <input class="tool-textarea" id="th-mdot" type="number" step="any" value="275.0" placeholder="275.0 kg/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-ve">Exit Velocity v_e (m/s)</label>
          <input class="tool-textarea" id="th-ve" type="number" step="any" value="3050.0" placeholder="3050 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-ae">Exit Area A_e (m²)</label>
          <input class="tool-textarea" id="th-ae" type="number" step="any" value="0.85" placeholder="0.85 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-dp">Pressure Δp (kPa)</label>
          <input class="tool-textarea" id="th-dp" type="number" step="any" value="10.0" placeholder="10.0 kPa (p_e - p_a)" />
        </div>
      </div>
      <div id="th-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="th-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">847.3 kN (190,470 lbf)</span>
            <span class="stat-label">Total Rocket Thrust Force (F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="th-res-isp" style="font-weight:700;">I_sp = 314.2 Seconds (Effective v_c = 3,081 m/s)</span>
            <span class="stat-label">Specific Impulse (I_sp = F / ṁ·g₀)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mdEl = document.getElementById('th-mdot'), veEl = document.getElementById('th-ve');
  const aeEl = document.getElementById('th-ae'), dpEl = document.getElementById('th-dp');
  const fResEl = document.getElementById('th-res-f'), ispResEl = document.getElementById('th-res-isp');

  const g0 = 9.80665;

  function update() {
    const mdot = parseFloat(mdEl.value), ve = parseFloat(veEl.value);
    const Ae = parseFloat(aeEl.value), dpKpa = parseFloat(dpEl.value);

    if (isNaN(mdot) || isNaN(ve) || isNaN(Ae) || isNaN(dpKpa) || mdot <= 0 || ve <= 0 || Ae < 0) return;

    const dpPa = dpKpa * 1000;
    const fNewtons = (mdot * ve) + (dpPa * Ae);
    const fKn = fNewtons / 1000;
    const fLbf = fNewtons * 0.224808943;
    const Isp = fNewtons / (mdot * g0);
    const cEff = fNewtons / mdot;

    fResEl.textContent = fKn.toFixed(1) + ' kN (' + Math.round(fLbf).toLocaleString() + ' lbf)';
    ispResEl.textContent = 'I_sp = ' + Isp.toFixed(1) + ' s (Effective Exhaust c = ' + Math.round(cEff) + ' m/s, Momentum: ' + ((mdot*ve)/1000).toFixed(1) + ' kN)';
  }

  [mdEl, veEl, aeEl, dpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter propellant total mass flow rate ṁ in kg/s (oxidizer + fuel).',
      'Enter gas exhaust velocity v_e at the nozzle exit plane in m/s.',
      'Enter nozzle bell exit plane cross-sectional area A_e in m².',
      'Enter pressure imbalance (p_e - p_a) in kPa (0 for perfectly expanded flow).',
      'Inspect total thrust generated in kN and lbf, and engine specific impulse (I_sp) in seconds.'
    ],
    benefitTitle: 'Momentum Thrust vs Pressure Thrust',
    benefitContent: 'Total rocket thrust combines bulk momentum ejection and pressure imbalance forces on the nozzle face; when exit pressure matches ambient atmospheric pressure, thrust reaches maximum theoretical efficiency.',
    faqs: [{ q: 'What is the thrust of a SpaceX Merlin 1D engine?', a: 'A sea-level Merlin 1D produces approximately 845 kN (190,000 lbf) of thrust at an I_sp of 282 seconds.' }]
  },

  // 24. De Laval Rocket Nozzle Area Expansion Ratio Calculator
  {
    slug: 'de-laval-rocket-nozzle-area-expansion-ratio-calculator',
    name: 'De Laval Rocket Nozzle Area Expansion Ratio (ε = A_e / A*) Calculator',
    description: 'Calculate supersonic converging-diverging de Laval rocket nozzle area expansion ratio (ε = A_e / A*) and exit Mach number M_e from specific heat ratio γ.',
    category: 'Science',
    icon: 'text',
    keywords: ['de laval nozzle calculator', 'rocket nozzle area expansion ratio epsilon formula', 'converging diverging nozzle mach number calculator', 'throat area exit area ratio online', 'supersonic isentropic nozzle flow calculator'],
    order: 582,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Desired Exit Mach Number M_e & Specific Heat Ratio γ (Gas Isentropic Index)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dl-m">Exit Mach Number M_e</label>
          <input class="tool-textarea" id="dl-m" type="number" step="0.1" value="3.5" placeholder="3.5 (Supersonic Exit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dl-gam">Gas Heat Ratio γ</label>
          <input class="tool-textarea" id="dl-gam" type="number" step="0.01" value="1.22" placeholder="1.22 (Combustion Gas Products)" />
        </div>
      </div>
      <div id="dl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dl-res-eps" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ε = 16.2 : 1 (A_e / A*)</span>
            <span class="stat-label">Nozzle Area Expansion Ratio (ε)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dl-res-prat" style="font-weight:700;">Pressure Ratio p_e / p₀ = 0.0125 (1.25% of Chamber P₀)</span>
            <span class="stat-label">Isentropic Exit-to-Chamber Pressure Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('dl-m'), gEl = document.getElementById('dl-gam');
  const epsResEl = document.getElementById('dl-res-eps'), prResEl = document.getElementById('dl-res-prat');

  function update() {
    const M = parseFloat(mEl.value), gamma = parseFloat(gEl.value);
    if (isNaN(M) || isNaN(gamma) || M <= 1.0 || gamma <= 1.05 || gamma >= 1.67) return;

    const expTerm = (gamma + 1) / (2 * (gamma - 1));
    const bracket = (2 / (gamma + 1)) * (1 + (((gamma - 1) / 2) * Math.pow(M, 2)));
    const epsilon = (1 / M) * Math.pow(bracket, expTerm);
    const pr = Math.pow(1 + (((gamma - 1) / 2) * Math.pow(M, 2)), -gamma / (gamma - 1));

    epsResEl.textContent = 'ε = ' + epsilon.toFixed(1) + ' : 1 (A_e / A*)';
    prResEl.textContent = 'Exit Pressure p_e / p₀ = ' + (pr * 100).toFixed(3) + '% of Chamber Pressure (M_e = ' + M.toFixed(1) + ')';
  }

  mEl.addEventListener('input', update);
  gEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter desired supersonic exhaust gas exit Mach number M_e (M_e > 1.0).',
      'Enter propellant combustion product gas specific heat ratio γ = c_p / c_v (typically 1.20 to 1.25 for rocket propellants).',
      'Inspect required nozzle bell area expansion ratio ε = A_e / A* and exit static pressure ratio p_e / p₀.'
    ],
    benefitTitle: 'Gustaf de Laval 1888 Supersonic Nozzle Geometry',
    benefitContent: 'A converging-diverging de Laval nozzle accelerates subsonic combustion gas to Mach 1 at the narrowest throat, then expands supersonic gas in the divergent bell to convert thermal pressure into massive kinetic exhaust velocity.',
    faqs: [{ q: 'Why do vacuum rocket engines have huge expansion ratios (ε > 100)?', a: 'In the vacuum of space, expanding the nozzle bell to huge ratios captures every drop of pressure energy without risking flow separation.' }]
  },

  // 25. Satellite Orbital Decay & Atmospheric Drag Lifetime Calculator
  {
    slug: 'orbital-decay-atmospheric-drag-lifetime-calculator',
    name: 'Satellite Orbital Decay & Atmospheric Drag Lifetime Calculator',
    description: 'Calculate Low Earth Orbit satellite deceleration from aerodynamic drag (a_drag = 1/2 · ρ · v² · C_d · A / m) in m/s² and estimated orbital decay altitude loss rate per day.',
    category: 'Science',
    icon: 'text',
    keywords: ['orbital decay calculator', 'atmospheric drag satellite lifetime formula', 'a drag half rho v2 cd a over m calculator', 'leo satellite re entry decay rate online', 'ballistic coefficient bstar orbital decay online'],
    order: 583,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Altitude h (km), Satellite Mass m (kg), Drag Area A (m²) & Drag Coeff C_d',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="od-h">Altitude h (km)</label>
          <input class="tool-textarea" id="od-h" type="number" step="any" value="350.0" placeholder="350.0 km (ISS Altitude)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="od-m">Satellite Mass m (kg)</label>
          <input class="tool-textarea" id="od-m" type="number" step="any" value="1000" placeholder="1000 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="od-a">Cross-Section A (m²)</label>
          <input class="tool-textarea" id="od-a" type="number" step="any" value="5.0" placeholder="5.0 m² Cross-Section" />
        </div>
        <div class="control-group">
          <label class="control-label" for="od-cd">Drag Coeff C_d</label>
          <input class="tool-textarea" id="od-cd" type="number" step="0.1" value="2.2" placeholder="2.2 (Rarefied Flow)" />
        </div>
      </div>
      <div id="od-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="od-res-loss" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">82.5 m / day Altitude Loss</span>
            <span class="stat-label">Daily Orbital Altitude Decay Rate (Δr / day)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="od-res-drag" style="font-weight:700;">Drag Deceleration: 2.76 × 10⁻⁵ m/s² (Ballistic B: 90.9 kg/m²)</span>
            <span class="stat-label">Aerodynamic Drag Acceleration & Ballistic Coefficient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('od-h'), mEl = document.getElementById('od-m');
  const aEl = document.getElementById('od-a'), cdEl = document.getElementById('od-cd');
  const lsResEl = document.getElementById('od-res-loss'), drResEl = document.getElementById('od-res-drag');

  const mu_earth = 398600.4418e9;
  const r_earth = 6378137;

  function update() {
    const hKm = parseFloat(hEl.value), mKg = parseFloat(mEl.value);
    const aM2 = parseFloat(aEl.value), Cd = parseFloat(cdEl.value);

    if (isNaN(hKm) || isNaN(mKg) || isNaN(aM2) || isNaN(Cd) || hKm <= 100 || mKg <= 0 || aM2 <= 0 || Cd <= 0) return;

    const rOrbit = r_earth + (hKm * 1000);
    const vOrbit = Math.sqrt(mu_earth / rOrbit);

    const H_scale = 50.0;
    const rhoAir = 6e-10 * Math.exp(-(hKm - 175) / H_scale);
    const aDrag = 0.5 * rhoAir * Math.pow(vOrbit, 2) * ((Cd * aM2) / mKg);

    const tOrbit = (2 * Math.PI * rOrbit) / vOrbit;
    const dailyLossMeters = 2 * (aDrag / vOrbit) * rOrbit * (86400 / tOrbit);
    const ballisticCoeff = mKg / (Cd * aM2);

    lsResEl.textContent = (dailyLossMeters >= 1000 ? (dailyLossMeters / 1000).toFixed(2) + ' km / day' : dailyLossMeters.toFixed(1) + ' m / day') + ' Altitude Loss';
    drResEl.textContent = 'Drag: ' + aDrag.toExponential(2) + ' m/s² (Ballistic B = ' + ballisticCoeff.toFixed(1) + ' kg/m², Density ρ = ' + rhoAir.toExponential(1) + ' kg/m³)';
  }

  [hEl, mEl, aEl, cdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter satellite orbital altitude h in kilometers (e.g. 350 to 500 km).',
      'Enter total spacecraft mass m in kilograms.',
      'Enter ram-facing aerodynamic cross-sectional surface area A in m².',
      'Enter hypersonic rarefied drag coefficient C_d (typically 2.2 for flat plates / cylinders in free molecular flow).',
      'Inspect daily orbital altitude decay drop rate and ballistic coefficient B = m / (C_d · A).'
    ],
    benefitTitle: 'Thermospheric Atmospheric Drag & Space Debris Clearance',
    benefitContent: 'Even at 400 km, residual thermospheric air molecules collide with satellites at 7.7 km/s; low ballistic coefficient objects decay in months, naturally cleansing Low Earth Orbit of defunct space debris.',
    faqs: [{ q: 'Why is C_d ≈ 2.2 in Low Earth Orbit instead of 0.5?', a: 'In the free molecular flow regime of upper space, air molecules do not form a continuous fluid boundary layer; they bounce off surfaces with diffuse reflection, yielding C_d ≈ 2.0 - 2.2.' }]
  }
];

pack17Tools.forEach(createTool);
console.log('Pack 17 complete: 25 tools created.');
