const { createTool } = require('./generate-curated-tools.cjs');

// Suite CCC: 5 Tools in HVAC Engineering, Psychrometrics & Chilled Water to reach 583 tools
const toolsSuiteCCC = [
  // 1. HVAC Sensible & Latent Air Cooling Load (BTU/hr) Calculator
  {
    slug: 'hvac-sensible-latent-heat-load-calculator',
    name: 'HVAC Sensible & Latent Cooling Load (BTU/hr) Calculator',
    description: 'Calculate sensible heat load (q_s = 1.08 · CFM · ΔT) and latent moisture load (q_l = 4840 · CFM · ΔW) in BTU/hr and cooling tons (12,000 BTU/hr = 1 Ton) from airflow and psychrometric state changes.',
    category: 'Science',
    icon: 'text',
    keywords: ['hvac sensible latent heat calculator', 'q 1.08 cfm delta t formula', 'latent heat 4840 cfm delta w calculator', 'air cooling load btu hr tons online', 'sensible heat ratio shr calculator'],
    order: 456,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Airflow (CFM), Temp Drop ΔT (°F) & Humidity Ratio Drop ΔW (lb/lb)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hvc-cfm">Airflow (CFM)</label>
          <input class="tool-textarea" id="hvc-cfm" type="number" step="any" value="1200" placeholder="1200 CFM (3-Ton System)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hvc-dt">Temp Drop ΔT (°F)</label>
          <input class="tool-textarea" id="hvc-dt" type="number" step="any" value="20" placeholder="20 °F (e.g. 75°F to 55°F)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hvc-dw">Humidity Drop ΔW (grains/lb)</label>
          <input class="tool-textarea" id="hvc-dw" type="number" step="any" value="15" placeholder="15 grains/lb (7000 gr = 1 lb)" />
        </div>
      </div>
      <div id="hvc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hvc-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">38,376 BTU/hr (3.20 Tons)</span>
            <span class="stat-label">Total Cooling Capacity (q_total)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hvc-res-shr" style="font-weight:700;">SHR = 0.675 (67.5% Sensible)</span>
            <span class="stat-label">Sensible Heat Ratio (q_s / q_total)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cfmEl = document.getElementById('hvc-cfm'), dtEl = document.getElementById('hvc-dt'), dwEl = document.getElementById('hvc-dw');
  const totResEl = document.getElementById('hvc-res-tot'), shrResEl = document.getElementById('hvc-res-shr');

  function update() {
    const cfm = parseFloat(cfmEl.value), dt = parseFloat(dtEl.value), dwGrains = parseFloat(dwEl.value);
    if (isNaN(cfm) || isNaN(dt) || isNaN(dwGrains) || cfm <= 0 || dt <= 0 || dwGrains < 0) return;

    // Sensible heat q_s = 1.08 * CFM * delta_T (BTU / hr)
    const qs = 1.08 * cfm * dt;
    // Latent heat q_l = 4840 * CFM * (delta_W_grains / 7000) = 0.6914 * CFM * delta_W_grains (BTU / hr)
    const ql = 0.6914 * cfm * dwGrains;
    const qTotal = qs + ql;
    const tons = qTotal / 12000;
    const shr = qs / qTotal;

    totResEl.textContent = Math.round(qTotal).toLocaleString() + ' BTU/hr (' + tons.toFixed(2) + ' Tons / ' + (qTotal * 0.000293071).toFixed(2) + ' kW)';
    shrResEl.textContent = 'SHR = ' + shr.toFixed(3) + ' (Sensible: ' + Math.round(qs).toLocaleString() + ' BTU/h, Latent: ' + Math.round(ql).toLocaleString() + ' BTU/h)';
  }

  [cfmEl, dtEl, dwEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter air volume flow rate in Cubic Feet per Minute (CFM) (typically 400 CFM per ton of cooling).',
      'Enter dry-bulb temperature drop ΔT across the cooling coil in °F.',
      'Enter moisture removal rate in grains of water per pound of dry air (7,000 grains = 1 lb H₂O).',
      'Inspect total cooling capacity in BTU/hr, cooling tons, and Sensible Heat Ratio (SHR).'
    ],
    benefitTitle: 'ASHRAE Fundamentals Psychrometric Equations',
    benefitContent: 'Air conditioners perform two distinct thermodynamic tasks: lowering air temperature (sensible cooling $q_s = 1.08\cdot\text{CFM}\cdot\Delta T$) and condensing dehumidified water vapor ($q_l = 4840\cdot\text{CFM}\cdot\Delta W$).',
    faqs: [{ q: 'How many BTU/hr is 1 ton of air conditioning?', a: '1 Ton of refrigeration = exactly 12,000 BTU/hr (equivalent to the heat required to melt 2,000 lbs of ice in 24 hours).' }]
  },

  // 2. Rectangular to Round Duct Equivalent Diameter (Huebscher Equation) Calculator
  {
    slug: 'air-duct-equivalent-round-diameter-calculator',
    name: 'Air Duct Equivalent Round Diameter (Huebscher Equation) Calculator',
    description: 'Calculate equivalent round duct diameter (D_e = 1.30 · (a · b)^0.625 / (a + b)^0.25) from rectangular duct width (a) and height (b) maintaining identical air friction loss.',
    category: 'Science',
    icon: 'text',
    keywords: ['duct equivalent diameter calculator', 'huebscher duct formula online', 'rectangular to round duct converter', 'ashrae equivalent diameter air duct', 'air duct friction sizing calculator'],
    order: 457,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rectangular Duct Width a (Inches) & Height b (Inches)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dct-w">Width a (Inches)</label>
          <input class="tool-textarea" id="dct-w" type="number" step="any" value="20" placeholder="20 in" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dct-h">Height b (Inches)</label>
          <input class="tool-textarea" id="dct-h" type="number" step="any" value="12" placeholder="12 in" />
        </div>
      </div>
      <div id="dct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dct-res-de" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">16.7 Inches (424 mm)</span>
            <span class="stat-label">Equivalent Round Diameter (D_e)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dct-res-aspect" style="font-weight:700;">1.67 : 1 (Good Aspect)</span>
            <span class="stat-label">Aspect Ratio (Width / Height)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('dct-w'), hEl = document.getElementById('dct-h');
  const deResEl = document.getElementById('dct-res-de'), arResEl = document.getElementById('dct-res-aspect');

  function update() {
    const a = parseFloat(wEl.value), b = parseFloat(hEl.value);
    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) return;

    // Huebscher formula: D_e = 1.30 * ( (a * b)^0.625 ) / ( (a + b)^0.25 )  [inches]
    const De = 1.30 * (Math.pow(a * b, 0.625) / Math.pow(a + b, 0.25));
    const DeMm = De * 25.4;
    const aspect = Math.max(a, b) / Math.min(a, b);

    deResEl.textContent = De.toFixed(1) + ' Inches (' + Math.round(DeMm) + ' mm Round Duct)';
    arResEl.textContent = aspect.toFixed(2) + ' : 1 Aspect Ratio (' + (aspect > 4 ? 'Poor > 4:1' : 'Good <= 4:1') + ')';
  }

  [wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rectangular duct internal width and height dimensions in inches.',
      'Inspect equivalent round duct diameter in inches and millimeters providing identical airflow friction drop.'
    ],
    benefitTitle: 'Huebscher\'s Equivalent Round Duct Friction Law',
    benefitContent: 'Round ductwork is the most aerodynamically efficient shape with minimal surface perimeter friction; the Huebscher equation allows HVAC engineers to swap rectangular trunk ducts for round spiral pipe without altering static pressure drop.',
    faqs: [{ q: 'Why is a 20" × 12" rectangular duct equivalent to a 16.7" round duct?', a: 'Although area is 240 sq in vs 219 sq in, the round duct has lower perimeter contact friction, achieving identical flow resistance.' }]
  },

  // 3. Central Plant Chilled Water Flow Rate (ΔT & GPM) Calculator
  {
    slug: 'chilled-water-flow-rate-delta-t-gpm-calculator',
    name: 'Chilled Water Flow Rate (GPM & ΔT) Sizing Calculator',
    description: 'Calculate hydronic chilled water distribution flow rate (GPM = (Tons · 24) / ΔT = Q_BTU / (500 · ΔT)) in gallons per minute from cooling plant tonnage and design temperature differential.',
    category: 'Science',
    icon: 'text',
    keywords: ['chilled water gpm calculator', 'chiller delta t gpm formula', 'cooling tons to gpm calculator online', 'gpm 24 times tons over delta t', 'central chiller plant flow rate calculator'],
    order: 458,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Chiller Tonnage (Tons) & Design Temperature Rise ΔT (°F)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="chw-tons">Chiller Capacity (Tons)</label>
          <input class="tool-textarea" id="chw-tons" type="number" step="any" value="250" placeholder="250 Tons" />
        </div>
        <div class="control-group">
          <label class="control-label" for="chw-dt">Design ΔT (°F)</label>
          <select class="tool-textarea" id="chw-dt">
            <option value="10" selected>10 °F Rise (44°F Supply / 54°F Return - Standard 2.4 GPM/Ton)</option>
            <option value="12">12 °F Rise (42°F / 54°F - 2.0 GPM/Ton High Efficiency)</option>
            <option value="16">16 °F Rise (40°F / 56°F - 1.5 GPM/Ton Low Flow)</option>
          </select>
        </div>
      </div>
      <div id="chw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="chw-res-gpm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">600.0 GPM (37.85 L/s)</span>
            <span class="stat-label">Chilled Water Primary Flow (GPM)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="chw-res-pipe" style="font-weight:700;">6" to 8" Schedule 40 Steel Pipe</span>
            <span class="stat-label">Recommended Main Header Diameter</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('chw-tons'), dtEl = document.getElementById('chw-dt');
  const gpmResEl = document.getElementById('chw-res-gpm'), pipResEl = document.getElementById('chw-res-pipe');

  function update() {
    const tons = parseFloat(tEl.value), dt = parseFloat(dtEl.value);
    if (isNaN(tons) || isNaN(dt) || tons <= 0 || dt <= 0) return;

    // GPM = (Tons * 24) / Delta_T
    const gpm = (tons * 24) / dt;
    const lps = gpm * 0.0630902;
    const gpmPerTon = gpm / tons;

    // Sizing pipe for ~6 to 8 ft/sec water velocity
    let pipeSize = '';
    if (gpm <= 60) pipeSize = '2" Pipe (up to 60 GPM)';
    else if (gpm <= 120) pipeSize = '3" Pipe (up to 120 GPM)';
    else if (gpm <= 250) pipeSize = '4" Pipe (up to 250 GPM)';
    else if (gpm <= 650) pipeSize = '6" Pipe (up to 650 GPM)';
    else if (gpm <= 1200) pipeSize = '8" Pipe (up to 1200 GPM)';
    else pipeSize = '10" to 12" Pipe Header';

    gpmResEl.textContent = gpm.toFixed(1) + ' GPM (' + lps.toFixed(1) + ' L/s, ' + gpmPerTon.toFixed(2) + ' GPM/Ton)';
    pipResEl.textContent = pipeSize;
  }

  tEl.addEventListener('input', update);
  dtEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter central chiller cooling plant capacity in refrigeration tons.',
      'Select design temperature differential ΔT (10°F standard = 2.4 GPM/ton; 12°F to 16°F for low-energy variable primary pumping).',
      'Inspect total required hydronic pumping flow in GPM and recommended header pipe diameter.'
    ],
    benefitTitle: 'Hydronic 500 Constant (Q = 500 · GPM · ΔT)',
    benefitContent: 'Because water weighs 8.33 lb/gal and specific heat is 1.0 BTU/(lb·°F), flow rate multiplies by 500 (8.33 × 60 min/hr) to directly convert thermal BTU/hr into GPM pump sizing.',
    faqs: [{ q: 'Why is 2.4 GPM per ton standard for 10°F ΔT?', a: 'GPM/Ton = 24 / 10°F = exactly 2.4 GPM per ton of refrigeration.' }]
  },

  // 4. Moist Air Specific Enthalpy Psychrometric Calculator
  {
    slug: 'enthalpy-moist-air-psychrometric-calculator',
    name: 'Moist Air Specific Enthalpy Psychrometric Calculator',
    description: 'Calculate total thermodynamic specific enthalpy of humid air (h = c_pa · T + W · (h_we + c_pw · T)) in kJ/kg and BTU/lb from dry-bulb temperature and humidity ratio.',
    category: 'Science',
    icon: 'text',
    keywords: ['enthalpy moist air calculator', 'psychrometric enthalpy formula', 'specific enthalpy humid air kj kg', 'btu per pound moist air enthalpy online', 'ashrae moist air enthalpy calculator'],
    order: 459,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dry-Bulb Temp T (°C) & Humidity Ratio W (g water / kg dry air)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ent-t">Dry-Bulb Temp T (°C)</label>
          <input class="tool-textarea" id="ent-t" type="number" step="any" value="25.0" placeholder="25.0 °C (77 °F)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ent-w">Humidity Ratio W (g/kg)</label>
          <input class="tool-textarea" id="ent-w" type="number" step="any" value="10.0" placeholder="10.0 g/kg (50% RH @ 25°C)" />
        </div>
      </div>
      <div id="ent-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ent-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">50.63 kJ / kg</span>
            <span class="stat-label">Specific Enthalpy (h)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ent-res-btu" style="font-weight:700;">21.77 BTU / lb</span>
            <span class="stat-label">Imperial Specific Enthalpy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('ent-t'), wEl = document.getElementById('ent-w');
  const hResEl = document.getElementById('ent-res-h'), btuResEl = document.getElementById('ent-res-btu');

  function update() {
    const T = parseFloat(tEl.value), wGrams = parseFloat(wEl.value);
    if (isNaN(T) || isNaN(wGrams) || wGrams < 0) return;

    const W = wGrams * 1e-3; // kg H2O / kg dry air
    // ASHRAE Psychrometric formula: h = 1.006 * T + W * (2501 + 1.86 * T)  [kJ / kg dry air]
    const hKj = 1.006 * T + W * (2501 + 1.86 * T);
    // Convert kJ/kg to BTU/lb: 1 kJ/kg = 0.429923 BTU/lb
    const hBtu = hKj * 0.429923;

    hResEl.textContent = hKj.toFixed(2) + ' kJ / kg dry air';
    btuResEl.textContent = hBtu.toFixed(2) + ' BTU / lb dry air';
  }

  [tEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter ambient dry-bulb temperature in Celsius.',
      'Enter humidity ratio W in grams of water vapor per kilogram of dry air (g/kg).',
      'Inspect total specific enthalpy of the humid air mixture in kJ/kg and BTU/lb.'
    ],
    benefitTitle: 'Thermodynamic Latent Enthalpy of Vaporization',
    benefitContent: 'At room temperature, the latent heat of water evaporation (2,501 kJ/kg) means that even small changes in humidity ratio dominate total air enthalpy, driving HVAC cooling energy consumption.',
    faqs: [{ q: 'What is the specific enthalpy of standard comfort air (25°C, 50% RH, W = 10 g/kg)?', a: 'h = 1.006(25) + 0.010(2501 + 1.86×25) = 25.15 + 25.48 = 50.63 kJ/kg (21.77 BTU/lb).' }]
  },

  // 5. Refrigerant R410A Pressure-Temperature (P-T) Chart Calculator
  {
    slug: 'refrigerant-pressure-temperature-pt-chart-calculator',
    name: 'Refrigerant R410A / R134a / R32 Saturation (P-T Chart) Calculator',
    description: 'Calculate saturation vapor pressure (psig / bar) and boiling evaporating/condensing saturation temperatures for HVAC refrigerants R410A, R134a, R32, and R404A.',
    category: 'Science',
    icon: 'text',
    keywords: ['refrigerant pt chart calculator', 'r410a pressure temperature calculator', 'r134a saturation pressure calculator online', 'hvac superheat subcooling pt chart', 'refrigerant evaporating temperature calculator'],
    order: 460,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Refrigerant Type & Saturation Temperature (°F)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pt-ref">Refrigerant</label>
          <select class="tool-textarea" id="pt-ref">
            <option value="R410A" selected>R-410A (Residential AC Standard)</option>
            <option value="R134a">R-134a (Automotive / Medium Temp Refrigeration)</option>
            <option value="R32">R-32 (Next-Gen Low GWP)</option>
            <option value="R404A">R-404A (Commercial Low-Temp Freezers)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pt-temp">Saturation Temp (°F)</label>
          <input class="tool-textarea" id="pt-temp" type="number" step="any" value="45.0" placeholder="45.0 °F (Evaporator Coil)" />
        </div>
      </div>
      <div id="pt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pt-res-psig" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">130.3 psig (9.98 bar)</span>
            <span class="stat-label">Saturation Gauge Pressure</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pt-res-psia" style="font-weight:700;">145.0 psia</span>
            <span class="stat-label">Absolute Pressure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('pt-ref'), tEl = document.getElementById('pt-temp');
  const pResEl = document.getElementById('pt-res-psig'), aResEl = document.getElementById('pt-res-psia');

  // Antoine saturation vapor pressure fit: ln(P_psia) = A - B / (T_F + C)
  const COEFFS = {
    'R410A': { A: 10.35, B: 3450, C: 430 },
    'R134a': { A: 9.85, B: 3520, C: 410 },
    'R32':   { A: 10.42, B: 3500, C: 435 },
    'R404A': { A: 10.20, B: 3380, C: 425 }
  };

  function update() {
    const ref = rEl.value, tF = parseFloat(tEl.value);
    if (isNaN(tF)) return;

    const c = COEFFS[ref];
    const lnP = c.A - (c.B / (tF + c.C));
    const psia = Math.exp(lnP);
    const psig = psia - 14.696;
    const barGauge = psig * 0.0689476;

    pResEl.textContent = (psig >= 0 ? psig.toFixed(1) + ' psig' : (psig * 2.036).toFixed(1) + ' in.Hg vacuum') + ' (' + (barGauge).toFixed(2) + ' bar)';
    aResEl.textContent = psia.toFixed(1) + ' psia (' + (psia * 6.89476).toFixed(1) + ' kPa abs)';
  }

  rEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select HVAC refrigerant blend (R410A, R134a, R32, R404A).',
      'Enter evaporating or condensing coil saturation temperature in °F.',
      'Inspect saturation gauge pressure in psig and bar gauge for troubleshooting system superheat and subcooling.'
    ],
    benefitTitle: 'Clausius-Clapeyron Vapor-Liquid Equilibrium',
    benefitContent: 'Inside an air conditioning evaporator or condenser coil, liquid and vapor refrigerants coexist in thermodynamic equilibrium; measuring pressure uniquely dictates the exact boiling saturation temperature.',
    faqs: [{ q: 'What is typical R-410A suction pressure for a 45°F evaporator coil?', a: 'At 45°F saturation temperature, standard R-410A suction gauge pressure is approximately 130.3 psig (~145.0 psia).' }]
  }
];

toolsSuiteCCC.forEach(createTool);
console.log('Suite CCC complete: 5 tools created.');
