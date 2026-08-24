const { createTool } = require('./generate-curated-tools.cjs');

// Suite XX: 5 Tools in Renewable Energy, Wind Betz Limit, Hydroelectric, Heat Pumps & Solar Strings to reach 558 tools
const toolsSuiteXX = [
  // 1. Wind Turbine Betz Limit & Aerodynamic Power Calculator
  {
    slug: 'wind-turbine-betz-limit-power-calculator',
    name: 'Wind Turbine Betz Limit & Aerodynamic Power Calculator',
    description: 'Calculate theoretical maximum aerodynamic wind power (P_Betz = 16/27 · ½ · ρ · A · v³ = 0.593 · P_wind) and actual generator electrical output in kW.',
    category: 'Science',
    icon: 'text',
    keywords: ['betz limit calculator', 'wind turbine power calculator online', '16 over 27 wind power formula', 'rotor swept area wind turbine calculator', 'wind speed to kw calculator online'],
    order: 431,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rotor Diameter (m), Wind Speed (m/s) & Generator Efficiency',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wt-diam">Rotor Diameter (m)</label>
          <input class="tool-textarea" id="wt-diam" type="number" step="any" value="120" placeholder="120 m (3.5 MW Turbine)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-v">Wind Speed v (m/s)</label>
          <input class="tool-textarea" id="wt-v" type="number" step="any" value="11.0" placeholder="11.0 m/s (~25 mph)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-cp">Power Coefficient (C_p)</label>
          <input class="tool-textarea" id="wt-cp" type="number" step="0.01" min="0.1" max="0.593" value="0.45" placeholder="0.45 (Modern 3-Blade)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wt-eff">Gen Efficiency (%)</label>
          <input class="tool-textarea" id="wt-eff" type="number" min="50" max="100" value="92" placeholder="92%" />
        </div>
      </div>
      <div id="wt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wt-res-pgen" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3,858 kW (3.86 MW)</span>
            <span class="stat-label">Delivered Electrical Power</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wt-res-betz" style="font-weight:700;">5,528 kW</span>
            <span class="stat-label">Theoretical Betz Limit Max (59.3%)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('wt-diam'), vEl = document.getElementById('wt-v');
  const cpEl = document.getElementById('wt-cp'), effEl = document.getElementById('wt-eff');
  const pgResEl = document.getElementById('wt-res-pgen'), bzResEl = document.getElementById('wt-res-betz');

  const rhoAir = 1.225; // kg / m^3 (Sea level air density)
  const betzMax = 16 / 27; // ~0.5926

  function update() {
    const diamM = parseFloat(dEl.value), vMs = parseFloat(vEl.value);
    const Cp = parseFloat(cpEl.value), effPct = parseFloat(effEl.value);

    if (isNaN(diamM) || isNaN(vMs) || isNaN(Cp) || isNaN(effPct) || diamM <= 0 || vMs <= 0 || Cp <= 0 || Cp > betzMax) return;

    const radius = diamM / 2;
    const sweptArea = Math.PI * Math.pow(radius, 2);

    // Total wind kinetic flux P_wind = 0.5 * rho * A * v^3 (Watts)
    const pWind = 0.5 * rhoAir * sweptArea * Math.pow(vMs, 3);
    const pBetz = betzMax * pWind;
    const pAero = Cp * pWind;
    const pElec = pAero * (effPct / 100);

    const pElecKw = pElec / 1000;
    const pElecMw = pElecKw / 1000;
    const pBetzKw = pBetz / 1000;

    pgResEl.textContent = pElecMw >= 1.0 ? pElecMw.toFixed(2) + ' MW (' + Math.round(pElecKw).toLocaleString() + ' kW)' : Math.round(pElecKw) + ' kW';
    bzResEl.textContent = (pBetzKw >= 1000 ? (pBetzKw / 1000).toFixed(2) + ' MW' : Math.round(pBetzKw) + ' kW') + ' (Swept ' + Math.round(sweptArea).toLocaleString() + ' m²)';
  }

  [dEl, vEl, cpEl, effEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter wind turbine rotor diameter in meters.',
      'Enter wind speed velocity in meters per second (m/s).',
      'Enter blade aerodynamic power coefficient C_p (max 0.593 Betz limit, 0.40 to 0.48 typical modern turbines) and generator electrical efficiency.',
      'Inspect generated electrical output in Megawatts (MW) and kW.'
    ],
    benefitTitle: 'Albert Betz\'s 1919 Theoretical Wind Limit',
    benefitContent: 'Betz\'s Law proves that no wind turbine can capture more than 16/27 (59.3%) of kinetic wind energy because the air must retain residual velocity to exit behind the rotor blades.',
    faqs: [{ q: 'Why does wind power scale with the cube of wind speed (v³)?', a: 'Kinetic energy per air parcel is ½mv² and the volume flow rate passing through the rotor is proportional to v; multiplying them yields total power P ∝ v³.' }]
  },

  // 2. Hydroelectric Power Plant Head & Flow Calculator
  {
    slug: 'hydroelectric-power-head-flow-calculator',
    name: 'Hydroelectric Power (Head & Flow) Generator Calculator',
    description: 'Calculate hydroelectric power generation (P = η · ρ · g · Q · H) in kW and Megawatts (MW) from water head height (H in meters), flow rate (Q in m³/s), and turbine-generator efficiency.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydroelectric power calculator', 'hydro turbine power formula online', 'water head flow rate kw calculator', 'hydropower p eta rho g q h calculator', 'micro hydro power output online'],
    order: 432,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gross Hydraulic Head H (m), Flow Rate Q (m³/s) & Efficiency (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hp-h">Net Head H (m)</label>
          <input class="tool-textarea" id="hp-h" type="number" step="any" value="50" placeholder="50 m (164 ft)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-q">Flow Rate Q (m³ / s)</label>
          <input class="tool-textarea" id="hp-q" type="number" step="any" value="10" placeholder="10 m³/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-eff">Combined Efficiency η (%)</label>
          <input class="tool-textarea" id="hp-eff" type="number" min="50" max="98" value="88" placeholder="88% (Francis / Kaplan)" />
        </div>
      </div>
      <div id="hp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hp-res-p" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4.31 MW (4,315 kW)</span>
            <span class="stat-label">Electrical Generation Output (P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-annual" style="font-weight:700;">37.8 GWh / year</span>
            <span class="stat-label">Annual Clean Energy Generation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('hp-h'), qEl = document.getElementById('hp-q'), effEl = document.getElementById('hp-eff');
  const pResEl = document.getElementById('hp-res-p'), aResEl = document.getElementById('hp-res-annual');

  const rhoWater = 1000; // kg / m^3
  const gGrav = 9.80665; // m / s^2

  function update() {
    const H = parseFloat(hEl.value), Q = parseFloat(qEl.value), effPct = parseFloat(effEl.value);
    if (isNaN(H) || isNaN(Q) || isNaN(effPct) || H <= 0 || Q <= 0 || effPct <= 0) return;

    // P = eta * rho * g * Q * H (Watts)
    const pWatts = (effPct / 100) * rhoWater * gGrav * Q * H;
    const pKw = pWatts / 1000;
    const pMw = pKw / 1000;

    // Annual energy (8,760 hours/yr at 100% capacity factor)
    const gwhYear = (pMw * 8760) / 1000;

    pResEl.textContent = pMw >= 1.0 ? pMw.toFixed(2) + ' MW (' + Math.round(pKw).toLocaleString() + ' kW)' : Math.round(pKw) + ' kW';
    aResEl.textContent = gwhYear.toFixed(1) + ' GWh / year (~' + Math.round(gwhYear * 1000 / 10.5).toLocaleString() + ' homes powered)';
  }

  [hEl, qEl, effEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter net effective hydraulic vertical head drop H in meters.',
      'Enter volumetric water river discharge flow rate Q in cubic meters per second (m³/s).',
      'Enter overall combined water turbine and generator efficiency percentage (85-92% typical).',
      'Inspect generated electrical power in Megawatts (MW) and annual MWh/GWh clean electricity.'
    ],
    benefitTitle: 'Gravitational Potential Energy Conversion',
    benefitContent: 'Hydroelectric turbines convert the gravitational potential energy of falling water (E = mgh) into rotational shaft torque with exceptional thermodynamic conversion efficiencies exceeding 90%.',
    faqs: [{ q: 'What power is generated by 1 m³/s falling through a 100m head at 85% efficiency?', a: 'P = 0.85 × 1,000 kg/m³ × 9.81 m/s² × 1 m³/s × 100m ≈ 833.8 kW.' }]
  },

  // 3. Heat Pump Coefficient of Performance (COP) & Carnot Efficiency Calculator
  {
    slug: 'heat-pump-cop-carnot-efficiency-calculator',
    name: 'Heat Pump COP & Carnot Efficiency Calculator',
    description: 'Calculate heating and cooling Coefficient of Performance (COP_heat = T_hot / (T_hot - T_cold)), seasonal efficiency ratio, and running cost savings over electrical resistance heaters.',
    category: 'Daily',
    icon: 'text',
    keywords: ['heat pump cop calculator', 'coefficient of performance heat pump formula', 'carnot heat pump efficiency online', 'heat pump heating cop vs resistance', 'seer to cop heat pump converter'],
    order: 433,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Outdoor Ambient Temp (°C), Indoor Target Temp (°C) & Carnot Fraction',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hp-tout">Outdoor Temp (°C)</label>
          <input class="tool-textarea" id="hp-tout" type="number" step="any" value="2.0" placeholder="2.0 °C (Winter Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-tin">Indoor Heating (°C)</label>
          <input class="tool-textarea" id="hp-tin" type="number" step="any" value="21.0" placeholder="21.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-carnot">Carnot Efficiency Ratio</label>
          <select class="tool-textarea" id="hp-carnot">
            <option value="0.50" selected>50% of Carnot (High-Efficiency Inverter Heat Pump)</option>
            <option value="0.40">40% of Carnot (Standard Heat Pump)</option>
            <option value="0.60">60% of Carnot (Ground-Source Geothermal)</option>
          </select>
        </div>
      </div>
      <div id="hp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hp-res-cop" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">COP = 3.87</span>
            <span class="stat-label">Heating COP (Heat Delivered / Electricity Used)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-save" style="color:#2563eb; font-weight:700;">74.2% Electric Savings</span>
            <span class="stat-label">Savings vs Baseboard Electric Heaters</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const toutEl = document.getElementById('hp-tout'), tinEl = document.getElementById('hp-tin'), carEl = document.getElementById('hp-carnot');
  const copResEl = document.getElementById('hp-res-cop'), savResEl = document.getElementById('hp-res-save');

  function update() {
    const ToutC = parseFloat(toutEl.value), TinC = parseFloat(tinEl.value), carRatio = parseFloat(carEl.value);
    if (isNaN(ToutC) || isNaN(TinC) || isNaN(carRatio) || TinC <= ToutC) return;

    const Thot = TinC + 273.15;
    const Tcold = ToutC + 273.15;

    // Ideal Carnot Heating COP = Thot / (Thot - Tcold)
    const copCarnot = Thot / (Thot - Tcold);
    // Real COP = carnotRatio * copCarnot
    const copReal = Math.max(1.0, carRatio * copCarnot);

    // Savings vs 1.0 COP electric resistance = (1 - 1/COP) * 100
    const savingsPct = ((copReal - 1) / copReal) * 100;

    copResEl.textContent = 'COP = ' + copReal.toFixed(2) + ' (' + (copReal * 100).toFixed(0) + '% Thermal Output)';
    savResEl.textContent = savingsPct.toFixed(1) + '% Electricity Savings (vs COP 1.0 Heaters)';
  }

  [toutEl, tinEl, carEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter outdoor winter ambient temperature in Celsius.',
      'Enter desired indoor living space temperature in Celsius.',
      'Select heat pump equipment tier (air-source inverter or geothermal ground-source).',
      'Inspect real-world Coefficient of Performance (COP) and electric bill heating savings.'
    ],
    benefitTitle: 'Why Heat Pumps Deliver 300% to 400% Efficiency',
    benefitContent: 'Unlike resistive heaters that create heat directly from electric current (1 kW electric = 1 kW heat), a heat pump uses refrigeration compression to move ambient outdoor heat indoors, delivering 3 to 4 kW of warmth for every 1 kW of consumed electricity (COP = 3.0 - 4.0).',
    faqs: [{ q: 'What does a COP of 4.0 mean?', a: 'A COP of 4.0 means the heat pump outputs 4.0 Kilowatt-hours of heat energy into your home for every 1.0 Kilowatt-hour of electricity consumed.' }]
  },

  // 4. Solar PV Panel String Voltage & Cold-Weather Inverter Safety Calculator
  {
    slug: 'solar-panel-string-voltage-temperature-coefficient-calculator',
    name: 'Solar PV String Voltage & Cold Temperature Safety Calculator',
    description: 'Calculate maximum open-circuit voltage (V_oc(max) = V_oc(STC) · (1 + γ_Voc · (T_min - 25))) for solar PV strings under extreme cold winter conditions to prevent inverter overvoltage destruction.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar string voltage calculator', 'solar voc temperature coefficient calculator', 'cold weather solar panel voc formula', 'inverter max input voltage solar string sizing', 'nec 690 7 solar voltage calculator'],
    order: 434,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Panels per String, Panel V_oc (STC), Temp Coeff (%/°C) & Min Temp (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sol-n">Panels in Series</label>
          <input class="tool-textarea" id="sol-n" type="number" min="1" max="30" value="10" placeholder="10 Panels" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-voc">Panel V_oc @ 25°C (V)</label>
          <input class="tool-textarea" id="sol-voc" type="number" step="any" value="41.5" placeholder="41.5 V (400W Panel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-coeff">V_oc Coeff (%/°C)</label>
          <input class="tool-textarea" id="sol-coeff" type="number" step="0.01" value="-0.27" placeholder="-0.27 %/°C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sol-tmin">Record Low Temp (°C)</label>
          <input class="tool-textarea" id="sol-tmin" type="number" step="any" value="-15" placeholder="-15 °C (5 °F)" />
        </div>
      </div>
      <div id="sol-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sol-res-vmax" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">459.8 Volts DC</span>
            <span class="stat-label">Max Cold Winter String V_oc</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sol-res-check" style="color:var(--green-dark); font-weight:700;">SAFE for 600V Inverter</span>
            <span class="stat-label">NEC 600V / 1000V Inverter Safety</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('sol-n'), vocEl = document.getElementById('sol-voc');
  const cEl = document.getElementById('sol-coeff'), tEl = document.getElementById('sol-tmin');
  const vmResEl = document.getElementById('sol-res-vmax'), chResEl = document.getElementById('sol-res-check');

  function update() {
    const N = parseInt(nEl.value, 10), vocStc = parseFloat(vocEl.value);
    const coeffPct = parseFloat(cEl.value), tMinC = parseFloat(tEl.value);

    if (isNaN(N) || isNaN(vocStc) || isNaN(coeffPct) || isNaN(tMinC) || N < 1 || vocStc <= 0) return;

    // Delta T from STC (25°C)
    const deltaT = tMinC - 25;
    // Single panel cold Voc = Voc_STC * (1 + (coeffPct / 100) * deltaT)
    const singlePanelColdVoc = vocStc * (1 + ((coeffPct / 100) * deltaT));
    const totalStringColdVoc = N * singlePanelColdVoc;
    const stcStringVoc = N * vocStc;

    vmResEl.textContent = totalStringColdVoc.toFixed(1) + ' V DC (STC ' + stcStringVoc.toFixed(1) + 'V)';

    if (totalStringColdVoc > 600) {
      chResEl.textContent = 'EXCEEDS 600V Inverter Limit! (Use 1000V Commercial Inverter or Reduce Panels)';
      chResEl.style.color = '#c53030';
    } else {
      chResEl.textContent = 'SAFE for 600V Residential Inverter (Headroom ' + (600 - totalStringColdVoc).toFixed(1) + 'V)';
      chResEl.style.color = '#22543d';
    }
  }

  [nEl, vocEl, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter number of photovoltaic solar modules wired in series string.',
      'Enter manufacturer datasheet Open-Circuit Voltage (V_oc) at standard 25°C test conditions (STC).',
      'Enter negative V_oc temperature coefficient in %/°C (typically -0.25% to -0.30%/°C).',
      'Enter local historic record winter low ambient temperature in Celsius.',
      'Verify that cold-weather peak string voltage stays safely below inverter maximum MPPT DC voltage limits (600V residential or 1000V commercial).'
    ],
    benefitTitle: 'NEC Article 690.7 Solar Safety Code Compliance',
    benefitContent: 'Silicon PV semiconductor bandgaps widen at cold temperatures, generating higher open-circuit voltages (V_oc); failing to account for winter freezing temperatures can instantly blow solar inverter input capacitors on crisp sunny mornings.',
    faqs: [{ q: 'Why do solar panels produce more voltage in freezing weather?', a: 'As semiconductor crystal temperature drops, charge carrier recombination slows and bandgap energy increases, boosting open-circuit voltage by ~10% to 15% in winter.' }]
  },

  // 5. Optimal Solar PV Panel Seasonal Tilt Angle Calculator
  {
    slug: 'solar-pv-tilt-angle-optimal-calculator',
    name: 'Optimal Solar Panel Tilt Angle & Azimuth Calculator',
    description: 'Calculate optimum fixed and seasonal solar photovoltaic panel tilt angles (Latitude · 0.9 for year-round, +15° for winter, -15° for summer) based on geographic latitude.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar panel tilt angle calculator', 'optimum solar angle latitude calculator', 'solar panel winter summer tilt formula', 'pv array orientation angle online', 'solar roof pitch angle calculator'],
    order: 435,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Geographic Latitude (Degrees: 0° Equator to 65° Arctic)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="tilt-lat">Site Latitude (° N or S)</label>
        <input class="tool-textarea" id="tilt-lat" type="number" step="any" min="0" max="65" value="37.5" placeholder="37.5° (e.g. San Francisco / Richmond)" />
      </div>
      <div id="tilt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="tilt-res-year" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">33.8° Tilt</span>
            <span class="stat-label">Optimal Year-Round Fixed Tilt</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tilt-res-winter" style="color:#2563eb; font-weight:800; font-size:1.4rem;">52.5° Tilt</span>
            <span class="stat-label">Winter Optimum (Latitude + 15°)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tilt-res-summer" style="font-weight:700;">22.5° Tilt</span>
            <span class="stat-label">Summer Optimum (Latitude - 15°)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const latEl = document.getElementById('tilt-lat');
  const yrResEl = document.getElementById('tilt-res-year'), winResEl = document.getElementById('tilt-res-winter'), sumResEl = document.getElementById('tilt-res-summer');

  function update() {
    const lat = parseFloat(latEl.value);
    if (isNaN(lat) || lat < 0 || lat > 65) return;

    // Standard year-round fixed optimal tilt rule: Latitude * 0.9 + 2.9 (or Lat * 0.9)
    const fixedTilt = Math.max(10, lat * 0.9);
    const winterTilt = Math.min(65, lat + 15);
    const summerTilt = Math.max(10, lat - 15);

    yrResEl.textContent = fixedTilt.toFixed(1) + '° Fixed Tilt';
    winResEl.textContent = winterTilt.toFixed(1) + '° Winter Tilt';
    sumResEl.textContent = summerTilt.toFixed(1) + '° Summer Tilt';
  }

  latEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter geographic installation site latitude in degrees (e.g. 28° for Florida/Delhi, 37° for California, 51° for London).',
      'Inspect optimal year-round fixed tilt angle and 2-season adjustable winter/summer angles facing true Solar South (or Solar North in Southern Hemisphere).'
    ],
    benefitTitle: 'Maximizing Solar Cosine Radiation Capture',
    benefitContent: 'Tilting solar modules perpendicular to incident sunlight maximizes solar irradiance per unit area (Irradiance = I₀ · cos θ_incidence), boosting annual kWh harvest by 15% to 25% over flat horizontal mounting.',
    faqs: [{ q: 'What direction should solar panels face?', a: 'In the Northern Hemisphere, panels should face True South (180° Azimuth); in the Southern Hemisphere, panels should face True North (0° Azimuth).' }]
  }
];

toolsSuiteXX.forEach(createTool);
console.log('Suite XX complete: 5 tools created.');
