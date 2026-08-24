const { createTool } = require('./generate-curated-tools.cjs');

// Suite CC: 5 Tools in Solar PV Arrays, 3-Phase AC Power, UPS Backup & Generators to cross 453 tools
const toolsSuiteCC = [
  // 1. Solar Panel Array Daily Output & Peak Sun Hours Calculator
  {
    slug: 'solar-panel-pv-array-output-calculator',
    name: 'Solar Panel Array Daily Output & Yield Calculator',
    description: 'Calculate expected daily and monthly solar photovoltaic kilowatt-hours (kWh = Array kW · Peak Sun Hours · System Efficiency) based on solar irradiance and thermal derating.',
    category: 'Daily',
    icon: 'text',
    keywords: ['solar panel output calculator', 'pv array daily kwh calculator', 'peak sun hours solar yield', 'solar panel monthly production formula', 'rooftop solar power output online'],
    order: 324,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Array Rating (Watts), Sun Hours & Derate Factor',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="spv-watts">Total Array Power (Watts)</label>
          <input class="tool-textarea" id="spv-watts" type="number" step="any" value="6000" placeholder="6,000 W (6 kW Array)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spv-sun">Peak Sun Hours (PSH)</label>
          <input class="tool-textarea" id="spv-sun" type="number" step="any" value="4.5" placeholder="4.5 Hours / day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spv-derate">System Efficiency Derate</label>
          <select class="tool-textarea" id="spv-derate">
            <option value="0.85">High Efficiency String / Microinverters (85%)</option>
            <option value="0.80" selected>Standard Rooftop Average (80%)</option>
            <option value="0.75">High Heat / Soiling / Shading (75%)</option>
          </select>
        </div>
      </div>
      <div id="spv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="spv-res-daily" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">21.60 kWh / day</span>
            <span class="stat-label">Estimated Daily Production</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="spv-res-month" style="font-weight:700;">648.0 kWh / month</span>
            <span class="stat-label">Monthly Energy Generation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('spv-watts'), sEl = document.getElementById('spv-sun'), dEl = document.getElementById('spv-derate');
  const dResEl = document.getElementById('spv-res-daily'), mResEl = document.getElementById('spv-res-month');

  function update() {
    const watts = parseFloat(wEl.value), psh = parseFloat(sEl.value), derate = parseFloat(dEl.value);
    if (isNaN(watts) || isNaN(psh) || isNaN(derate) || watts <= 0 || psh <= 0 || derate <= 0) return;

    // Daily kWh = (Watts / 1000) * PSH * derate
    const kwArray = watts / 1000;
    const dailyKwh = kwArray * psh * derate;
    const monthlyKwh = dailyKwh * 30;

    dResEl.textContent = dailyKwh.toFixed(2) + ' kWh / day';
    mResEl.textContent = monthlyKwh.toFixed(1) + ' kWh / month';
  }

  [wEl, sEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total solar array nameplate rating in Watts (e.g. 15 panels × 400W = 6,000W).',
      'Enter average local Peak Sun Hours (typically 3.5 to 5.5 hours per day).',
      'Select overall system derate efficiency.',
      'Inspect expected daily and monthly electricity harvest in Kilowatt-Hours (kWh).'
    ],
    benefitTitle: 'Peak Sun Hours (1,000 W/m² Standard)',
    benefitContent: 'One Peak Sun Hour represents the equivalent solar irradiance of 1,000 Watts per square meter for 1 hour, standardizing solar calculation across different latitudes and seasons.',
    faqs: [{ q: 'What factors cause solar derating?', a: 'High ambient temperature losses, inverter DC-to-AC conversion losses, dust/soiling, and cable resistance typically reduce output by 15-20% below STC nameplate ratings.' }]
  },

  // 2. 3-Phase & Single Phase AC Apparent Power (kVA) Calculator
  {
    slug: 'ac-apparent-power-kva-calculator',
    name: 'AC Apparent Power (kVA) & Transformer Sizing Calculator',
    description: 'Calculate AC apparent power (kVA = V · I / 1000 for single phase, kVA = √3 · V · I / 1000 for three-phase) and full-load line current for generator and transformer sizing.',
    category: 'Daily',
    icon: 'text',
    keywords: ['kva calculator', 'apparent power kva formula', '3 phase kva to amps calculator', 'transformer sizing kva online', 'single phase three phase kva calculator'],
    order: 325,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'System Phase, Voltage & Line Current (Amps)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kva-phase">Phase Configuration</label>
          <select class="tool-textarea" id="kva-phase">
            <option value="1">Single Phase (1Φ: V · I)</option>
            <option value="3" selected>Three Phase (3Φ: √3 · V_LL · I)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="kva-volt">Line-to-Line Voltage (V)</label>
          <input class="tool-textarea" id="kva-volt" type="number" step="any" value="480" placeholder="480 V (or 230V, 415V)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kva-amps">Line Current (Amps)</label>
          <input class="tool-textarea" id="kva-amps" type="number" step="any" value="50" placeholder="50 A" />
        </div>
      </div>
      <div id="kva-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kva-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">41.57 kVA</span>
            <span class="stat-label">Apparent Power (S in kVA)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kva-res-kw" style="font-weight:700;">33.26 kW (@ 0.80 PF)</span>
            <span class="stat-label">Real Power Capacity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('kva-phase'), vEl = document.getElementById('kva-volt'), aEl = document.getElementById('kva-amps');
  const kvaResEl = document.getElementById('kva-res-val'), kwResEl = document.getElementById('kva-res-kw');

  function update() {
    const is3Ph = pEl.value === '3';
    const V = parseFloat(vEl.value), I = parseFloat(aEl.value);
    if (isNaN(V) || isNaN(I) || V <= 0 || I <= 0) return;

    // S (kVA) = (V * I) / 1000 for 1Ph, (sqrt(3) * V * I) / 1000 for 3Ph
    const kva = is3Ph ? (Math.sqrt(3) * V * I) / 1000 : (V * I) / 1000;
    const kwAt08 = kva * 0.80;

    kvaResEl.textContent = kva.toFixed(2) + ' kVA';
    kwResEl.textContent = kwAt08.toFixed(2) + ' kW (@ 0.80 PF)';
  }

  [pEl, vEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select single-phase or three-phase electrical service.',
      'Enter voltage (Line-to-Line for 3-phase) and full-load line current in Amperes.',
      'Inspect apparent power in kVA and real power rating at standard 0.80 industrial power factor.'
    ],
    benefitTitle: 'Why Transformers and Generators Are Rated in kVA',
    benefitContent: 'Electrical windings are limited strictly by thermal heating from current (I²R losses) and magnetic core voltage saturation, regardless of whether the connected load is resistive, inductive, or capacitive.',
    faqs: [{ q: 'What is the relationship between kW and kVA?', a: 'Real Power (kW) = Apparent Power (kVA) × Power Factor (cos φ).' }]
  },

  // 3. AC Reactive Power (kVAR) & Power Factor Capacitor Sizing Calculator
  {
    slug: 'ac-reactive-power-kvar-calculator',
    name: 'AC Reactive Power (kVAR) & Capacitor Sizing Calculator',
    description: 'Calculate reactive power (kVAR = √(kVA² - kW²)) and determine power factor correction capacitor bank sizes (kVAR_cap = P · (tan θ₁ - tan θ₂)) to eliminate utility low power factor penalties.',
    category: 'Daily',
    icon: 'text',
    keywords: ['kvar calculator', 'reactive power calculator online', 'power factor correction capacitor sizing', 'kvar capacitor bank formula', 'kva kw kvar power triangle calculator'],
    order: 326,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Active Power (kW), Existing PF & Target PF',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kvar-kw">Real Load Power (kW)</label>
          <input class="tool-textarea" id="kvar-kw" type="number" step="any" value="100" placeholder="100 kW" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kvar-pf1">Existing Power Factor</label>
          <input class="tool-textarea" id="kvar-pf1" type="number" step="0.01" min="0.5" max="0.99" value="0.75" placeholder="0.75" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kvar-pf2">Target Power Factor</label>
          <input class="tool-textarea" id="kvar-pf2" type="number" step="0.01" min="0.8" max="1.0" value="0.95" placeholder="0.95" />
        </div>
      </div>
      <div id="kvar-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kvar-res-cap" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">55.3 kVAR</span>
            <span class="stat-label">Required Capacitor Bank Size</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kvar-res-curr">88.2 kVAR</span>
            <span class="stat-label">Current Uncorrected Reactive Load</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kwEl = document.getElementById('kvar-kw'), pf1El = document.getElementById('kvar-pf1'), pf2El = document.getElementById('kvar-pf2');
  const capResEl = document.getElementById('kvar-res-cap'), curResEl = document.getElementById('kvar-res-curr');

  function update() {
    const P = parseFloat(kwEl.value), pf1 = parseFloat(pf1El.value), pf2 = parseFloat(pf2El.value);
    if (isNaN(P) || isNaN(pf1) || isNaN(pf2) || P <= 0 || pf1 <= 0 || pf1 >= 1 || pf2 <= pf1 || pf2 > 1.0) return;

    // theta1 = acos(pf1), theta2 = acos(pf2)
    const th1 = Math.acos(pf1);
    const th2 = Math.acos(pf2);

    // Q1 = P * tan(th1)
    const Q1 = P * Math.tan(th1);
    // Q2 = P * tan(th2)
    const Q2 = P * Math.tan(th2);
    // Q_cap = Q1 - Q2 = P * (tan(th1) - tan(th2))
    const Qcap = Q1 - Q2;

    capResEl.textContent = Qcap.toFixed(1) + ' kVAR';
    curResEl.textContent = Q1.toFixed(1) + ' kVAR (Initial)';
  }

  [kwEl, pf1El, pf2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter facility real electrical load power in kilowatts (kW).',
      'Enter uncorrected measured power factor (e.g. 0.75 lagging from induction motors).',
      'Enter desired target power factor (e.g. 0.95).',
      'Inspect required shunt power factor correction capacitor bank size in kVAR.'
    ],
    benefitTitle: 'Eliminating Utility Reactive Power surcharges',
    benefitContent: 'Industrial facilities with low power factors draw excessive idle inductive current from the electrical grid; capacitor banks supply local reactive magnetizing power, freeing grid capacity and eliminating penalty surcharges.',
    faqs: [{ q: 'What causes low inductive power factor?', a: 'Heavy inductive loads such as AC induction motors, transformers, welding equipment, and magnetic ballasts.' }]
  },

  // 4. Diesel / Gasoline Generator Fuel Consumption Calculator
  {
    slug: 'diesel-generator-fuel-consumption-calculator',
    name: 'Diesel Generator Fuel Consumption & Runtime Calculator',
    description: 'Calculate hourly and daily fuel consumption rates (Gallons/Hour and Liters/Hour) for standby diesel generators across 25%, 50%, 75%, and 100% electrical load demands.',
    category: 'Daily',
    icon: 'text',
    keywords: ['diesel generator fuel consumption calculator', 'generator fuel burn rate calculator', 'gallons per hour diesel generator', 'generator fuel tank runtime online', 'genset fuel consumption chart'],
    order: 327,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Generator Power Rating (kW), Load % & Tank Size',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gen-kw">Generator Size (kW)</label>
          <input class="tool-textarea" id="gen-kw" type="number" step="any" value="50" placeholder="50 kW Generator" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gen-load">Operating Load Level</label>
          <select class="tool-textarea" id="gen-load">
            <option value="0.25">25% Electrical Load</option>
            <option value="0.50">50% Half Load</option>
            <option value="0.75" selected>75% Prime Continuous Load</option>
            <option value="1.00">100% Full Rated Load</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="gen-tank">Fuel Tank Capacity (Liters)</label>
          <input class="tool-textarea" id="gen-tank" type="number" step="any" value="250" placeholder="250 Liters (66 Gallons)" />
        </div>
      </div>
      <div id="gen-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gen-res-rate" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">10.4 L / hour</span>
            <span class="stat-label">Hourly Fuel Burn Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gen-res-run" style="font-weight:700;">24.0 Hours</span>
            <span class="stat-label">Full Tank Continuous Runtime</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gen-res-gph">2.75 GPH (US Gallons/hr)</span>
            <span class="stat-label">US Gallons Burn Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kwEl = document.getElementById('gen-kw'), ldEl = document.getElementById('gen-load'), tkEl = document.getElementById('gen-tank');
  const rResEl = document.getElementById('gen-res-rate'), runResEl = document.getElementById('gen-res-run'), gphResEl = document.getElementById('gen-res-gph');

  function update() {
    const kw = parseFloat(kwEl.value), load = parseFloat(ldEl.value), tankL = parseFloat(tkEl.value);
    if (isNaN(kw) || isNaN(load) || isNaN(tankL) || kw <= 0 || load <= 0 || tankL <= 0) return;

    // Standard diesel specific fuel consumption rule of thumb:
    // Full load: ~0.070 gallons per hour per kW (approx 0.265 L / kWh)
    // Part load scaling:
    const specificBurnGpkW = 0.070 * (0.35 + 0.65 * load);
    const gph = kw * specificBurnGpkW * load;
    const lph = gph * 3.78541;

    const runtimeHours = tankL / lph;

    rResEl.textContent = lph.toFixed(1) + ' L / hour';
    runResEl.textContent = runtimeHours.toFixed(1) + ' Hours (' + (runtimeHours / 24).toFixed(1) + ' Days)';
    gphResEl.textContent = gph.toFixed(2) + ' GPH (US Gallons/hr)';
  }

  [kwEl, ldEl, tkEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter generator prime rated electrical capacity in kilowatts (kW).',
      'Select active electrical facility load percentage (25% to 100%).',
      'Enter fuel tank storage volume in Liters.',
      'Inspect hourly diesel burn rate (L/hr, GPH) and autonomous tank runtime hours.'
    ],
    benefitTitle: 'Specific Fuel Consumption Part-Load Curves',
    benefitContent: 'Internal combustion diesel engines operate at peak thermodynamic efficiency when loaded above 60-75% rated power; running generators at ultra-light loads (<30%) causes incomplete fuel combustion and wet-stacking carbon buildup.',
    faqs: [{ q: 'How much diesel does a 50 kW generator burn at 75% load?', a: 'Approximately 2.75 US Gallons per hour (~10.4 Liters per hour).' }]
  },

  // 5. Uninterruptible Power Supply (UPS) Battery Runtime Calculator
  {
    slug: 'uninterruptible-power-supply-ups-runtime-calculator',
    name: 'UPS Battery Backup Runtime & Sizing Calculator',
    description: 'Calculate Uninterruptible Power Supply (UPS) backup battery runtime in minutes from total server/PC load Watts, battery bank Voltage, Amp-Hour capacity, and inverter conversion efficiency.',
    category: 'Daily',
    icon: 'text',
    keywords: ['ups battery runtime calculator', 'ups backup time calculator online', 'server ups runtime minutes formula', 'battery ah to ups runtime calculator', 'datacenter ups sizing online'],
    order: 328,
    schemaCategory: 'UtilitiesApplication',
    workspaceHeading: 'Connected Load (Watts), Battery Bank Voltage & Capacity',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ups-load">Connected Load (Watts)</label>
          <input class="tool-textarea" id="ups-load" type="number" step="any" value="400" placeholder="400 W (Server + Router)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ups-volt">Internal Battery DC Voltage</label>
          <select class="tool-textarea" id="ups-volt">
            <option value="12">12 Volts (Single Battery 500-1000VA)</option>
            <option value="24" selected>24 Volts (Dual Battery 1500VA)</option>
            <option value="48">48 Volts (Rackmount 3000VA)</option>
            <option value="96">96 Volts (Data Center Online UPS)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ups-ah">Battery Capacity (Ah)</label>
          <input class="tool-textarea" id="ups-ah" type="number" step="any" value="18" placeholder="18 Ah (2x 9Ah in series)" />
        </div>
      </div>
      <div id="ups-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ups-res-mins" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">55 Minutes</span>
            <span class="stat-label">Estimated Backup Runtime</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ups-res-wh" style="font-weight:700;">432 Wh (367 Wh usable)</span>
            <span class="stat-label">Total Battery Energy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ldEl = document.getElementById('ups-load'), vEl = document.getElementById('ups-volt'), ahEl = document.getElementById('ups-ah');
  const mResEl = document.getElementById('ups-res-mins'), whResEl = document.getElementById('ups-res-wh');

  function update() {
    const loadW = parseFloat(ldEl.value), volt = parseFloat(vEl.value), ah = parseFloat(ahEl.value);
    if (isNaN(loadW) || isNaN(volt) || isNaN(ah) || loadW <= 0 || volt <= 0 || ah <= 0) return;

    // Total Wh = Volt * Ah
    const totalWh = volt * ah;
    // Inverter efficiency ~ 85%
    const usableWh = totalWh * 0.85;

    // Runtime hours = usableWh / loadW
    const runHours = usableWh / loadW;
    const runMins = Math.round(runHours * 60);

    mResEl.textContent = runMins >= 60 ? (runMins / 60).toFixed(1) + ' Hours (' + runMins + ' Mins)' : runMins + ' Minutes';
    whResEl.textContent = Math.round(totalWh) + ' Wh (' + Math.round(usableWh) + ' Wh usable @ 85% eff)';
  }

  [ldEl, vEl, ahEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total connected computer, server, and networking load in Watts.',
      'Select internal UPS DC battery bus voltage (12V, 24V, 48V, or 96V).',
      'Enter total battery capacity in Amp-Hours (Ah).',
      'Inspect estimated emergency blackout runtime in minutes.'
    ],
    benefitTitle: 'Peukert\'s Effect and Inverter Thermal Efficiency',
    benefitContent: 'High discharge rates drain lead-acid batteries faster than nominal C20 ratings due to Peukert\'s law; factoring an 85% combined inverter/thermal efficiency delivers realistic, dependable server shutdown timelines.',
    faqs: [{ q: 'How long will a 1500VA (24V 18Ah) UPS run a 400W load?', a: 'Usable energy is (24V × 18Ah × 0.85) ≈ 367 Wh; 367 Wh / 400W ≈ 0.92 hours (~55 minutes).' }]
  }
];

toolsSuiteCC.forEach(createTool);
console.log('Suite CC complete: 5 tools created.');
