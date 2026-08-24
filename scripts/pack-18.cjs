const { createTool } = require('./generate-curated-tools.cjs');

// Pack 18: 26 Tools covering Solar PV, 3D Computational Geometry, Quantum Computing, Oceanography & Aerodynamics (Tools 705 to 730)
const pack18Tools = [
  // --- Suite BBBB: Solar Photovoltaics & Inverter Sizing (705 - 709) ---
  // 1. Solar Panel Temperature Coefficient Power Loss Calculator
  {
    slug: 'solar-panel-temperature-coefficient-power-loss-calculator',
    name: 'Solar Panel Temperature Coefficient & Power Loss Calculator',
    description: 'Calculate photovoltaic solar panel real-world output power loss (P = P_STC · [1 + γ · (T_cell - 25°C)]) and hot roof cell operating temperature from NOCT rating.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar panel temperature coefficient calculator', 'pv power loss heat formula gamma tcell', 'noct cell temperature calculator online', 'hot weather solar panel efficiency drop calculator', 'solar pv temperature derating online'],
    order: 584,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Panel STC Power P_STC (Watts), Ambient Temp (°C), Irradiance (W/m²) & Temp Coeff γ (%/°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pv-stc">STC Rating (W)</label>
          <input class="tool-textarea" id="pv-stc" type="number" step="any" value="400.0" placeholder="400.0 W" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-tamb">Ambient Temp (°C)</label>
          <input class="tool-textarea" id="pv-tamb" type="number" step="any" value="35.0" placeholder="35.0 °C (Hot Summer)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-irr">Irradiance (W/m²)</label>
          <input class="tool-textarea" id="pv-irr" type="number" step="any" value="1000" placeholder="1000 W/m² (Peak Sun)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-gamma">P_max Coeff γ (%/°C)</label>
          <input class="tool-textarea" id="pv-gamma" type="number" step="0.01" value="-0.35" placeholder="-0.35 %/°C" />
        </div>
      </div>
      <div id="pv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pv-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">342.3 Watts</span>
            <span class="stat-label">De-Rated Hot Operating Power (P_actual)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pv-res-temp" style="font-weight:700;">Cell Temp: 66.3°C (-14.4% Thermal Power Loss)</span>
            <span class="stat-label">Estimated Silicon Cell Temperature & Total Derate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const stcEl = document.getElementById('pv-stc'), tEl = document.getElementById('pv-tamb');
  const irrEl = document.getElementById('pv-irr'), gEl = document.getElementById('pv-gamma');
  const pResEl = document.getElementById('pv-res-pwr'), tmResEl = document.getElementById('pv-res-temp');

  const NOCT = 45.0;

  function update() {
    const Pstc = parseFloat(stcEl.value), Tamb = parseFloat(tEl.value);
    const Irr = parseFloat(irrEl.value), gamma = parseFloat(gEl.value);

    if (isNaN(Pstc) || isNaN(Tamb) || isNaN(Irr) || isNaN(gamma) || Pstc <= 0 || Irr <= 0) return;

    const Tcell = Tamb + (((NOCT - 20) / 800) * Irr);
    const deltaT = Tcell - 25.0;
    const deratePct = (gamma / 100) * deltaT;
    const Pactual = Pstc * (1 + deratePct) * (Irr / 1000);
    const lossPct = Math.abs(deratePct * 100);

    pResEl.textContent = Pactual.toFixed(1) + ' Watts (Actual Output)';
    tmResEl.textContent = 'Cell Temp: ' + Tcell.toFixed(1) + '°C (' + (deratePct < 0 ? '-' : '+') + lossPct.toFixed(1) + '% Thermal Shift @ ' + gamma + '%/°C)';
  }

  [stcEl, tEl, irrEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter manufacturer Standard Test Condition (STC: 25°C, 1000 W/m²) rated module wattage.',
      'Enter ambient summer air temperature in Celsius.',
      'Enter solar irradiance in Watts per square meter (1000 W/m² = 1 Peak Sun).',
      'Enter module temperature coefficient of P_max γ (typically -0.30% to -0.40%/°C for monocrystalline silicon).',
      'Inspect realistic hot rooftop cell operating temperature and de-rated actual power output in Watts.'
    ],
    benefitTitle: 'Thermal Degradation of Semiconductor Bandgap',
    benefitContent: 'As silicon solar cells heat up on dark rooftops, increased thermal atomic vibrations narrow the semiconductor bandgap, reducing open-circuit voltage Voc and slashing solar power output by 10% to 20% on hot summer afternoons.',
    faqs: [{ q: 'Why do N-type TOPCon and HJT panels perform better in the heat?', a: 'TOPCon and Heterojunction (HJT) solar panels have lower temperature coefficients (-0.26%/°C vs -0.38%/°C for standard P-type PERC), generating significantly more energy in hot climates.' }]
  },

  // 2. Solar Inverter DC-to-AC Ratio (ILR) & Clipping Loss Calculator
  {
    slug: 'solar-inverter-dc-ac-ratio-clipping-calculator',
    name: 'Solar Inverter DC-to-AC Ratio (ILR) & Clipping Calculator',
    description: 'Calculate solar photovoltaic Inverter Loading Ratio (ILR = DC_Array_kW / AC_Inverter_kW) and evaluate clipping losses vs inverter capital cost optimization.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar inverter dc ac ratio calculator', 'inverter loading ratio ilr formula', 'solar clipping loss percentage calculator online', 'oversizing solar array dc ac ratio calculator', 'pv inverter sizing optimizer online'],
    order: 585,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'DC Solar Array Size (kW_dc) & AC Inverter Rated Nameplate (kW_ac)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ilr-dc">DC Array Size (kW_dc)</label>
          <input class="tool-textarea" id="ilr-dc" type="number" step="any" value="10.0" placeholder="10.0 kW DC Array" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ilr-ac">AC Inverter (kW_ac)</label>
          <input class="tool-textarea" id="ilr-ac" type="number" step="any" value="7.6" placeholder="7.6 kW AC Inverter" />
        </div>
      </div>
      <div id="ilr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ilr-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ILR = 1.32 (131.6%)</span>
            <span class="stat-label">Inverter Loading Ratio (DC / AC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ilr-res-clip" style="color:var(--green-dark); font-weight:700;">Optimal Industry Standard (Estimated Clipping Loss below 1.2%)</span>
            <span class="stat-label">Array Oversizing Optimization Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dcEl = document.getElementById('ilr-dc'), acEl = document.getElementById('ilr-ac');
  const rResEl = document.getElementById('ilr-res-ratio'), clResEl = document.getElementById('ilr-res-clip');

  function update() {
    const dcKw = parseFloat(dcEl.value), acKw = parseFloat(acEl.value);
    if (isNaN(dcKw) || isNaN(acKw) || dcKw <= 0 || acKw <= 0) return;

    const ilr = dcKw / acKw;
    const ilrPct = ilr * 100;

    rResEl.textContent = 'ILR = ' + ilr.toFixed(2) + ' (' + ilrPct.toFixed(1) + '% DC/AC Ratio)';

    if (ilr < 1.10) {
      clResEl.textContent = 'Under-Loaded Inverter (ILR < 1.10: Inverter capacity underutilized in morning/evening)';
      clResEl.style.color = '#2563eb';
    } else if (ilr <= 1.35) {
      clResEl.textContent = 'Optimal Economic Sizing (ILR 1.15 - 1.35: Max energy harvest, Clipping < 1.5%)';
      clResEl.style.color = '#22543d';
    } else if (ilr <= 1.50) {
      clResEl.textContent = 'High DC Overbuild (ILR 1.35 - 1.50: Clipping ~2-5%, Good for winter/cloudy regions)';
      clResEl.style.color = '#d97706';
    } else {
      clResEl.textContent = 'Heavy Clipping Loss (ILR > 1.50: Severe midday thermal clipping > 8%)';
      clResEl.style.color = '#c53030';
    }
  }

  dcEl.addEventListener('input', update);
  acEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total nameplate DC solar panel capacity in kilowatts (kW_dc).',
      'Enter continuous AC inverter output nameplate capacity in kilowatts (kW_ac).',
      'Inspect Inverter Loading Ratio (ILR) and economic trade-off analysis between peak clipping loss and shoulder-hour energy harvesting.'
    ],
    benefitTitle: 'Why Oversizing DC Solar Arrays Boosts ROI',
    benefitContent: 'Solar arrays rarely operate at full 100% STC wattage due to thermal heat derates and low sun angles; oversizing DC panels by 20% to 35% (ILR 1.25 to 1.35) allows the inverter to reach peak capacity hours earlier in the morning and later in the afternoon.',
    faqs: [{ q: 'What is inverter clipping?', a: 'Clipping occurs when DC solar production exceeds the inverter\'s maximum AC capacity; the inverter throttles DC voltage away from the maximum power point to cap power safely.' }]
  },

  // 3. Solar PV Tilt & Azimuth Angle Optimization Calculator
  {
    slug: 'pv-system-tilt-azimuth-solar-irradiance-calculator',
    name: 'Solar Panel Optimal Tilt Angle & Azimuth Orientation Calculator',
    description: 'Calculate optimum solar panel fixed tilt angle (β = Latitude ± 15°) for summer, winter, and year-round maximum solar irradiance yield across global latitudes.',
    category: 'Science',
    icon: 'text',
    keywords: ['solar panel tilt angle calculator', 'optimum pv tilt formula latitude plus minus 15', 'solar panel azimuth south facing calculator online', 'yearly energy production solar panel angle calculator', 'photovoltaic installation tilt angle online'],
    order: 586,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Installation Latitude (° N / S) & Seasonal Energy Optimization Goal',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pv-lat">Site Latitude (°)</label>
          <input class="tool-textarea" id="pv-lat" type="number" step="any" value="34.05" placeholder="34.05° (e.g. Los Angeles)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-opt">Optimization Goal</label>
          <select class="tool-textarea" id="pv-opt">
            <option value="year" selected>Year-Round Annual Production (β ≈ Lat × 0.9)</option>
            <option value="winter">Winter Heating Max (β = Lat + 15°)</option>
            <option value="summer">Summer Cooling Max (β = Lat - 15°)</option>
          </select>
        </div>
      </div>
      <div id="pv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pv-res-tilt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">30.6° Fixed Tilt</span>
            <span class="stat-label">Recommended Optimal Panel Tilt Angle (β)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pv-res-azim" style="font-weight:700;">Azimuth: 180° True South (Northern Hemisphere)</span>
            <span class="stat-label">Compass Heading Orientation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const latEl = document.getElementById('pv-lat'), optEl = document.getElementById('pv-opt');
  const tlResEl = document.getElementById('pv-res-tilt'), azResEl = document.getElementById('pv-res-azim');

  function update() {
    const lat = parseFloat(latEl.value);
    const mode = optEl.value;

    if (isNaN(lat) || Math.abs(lat) > 90) return;

    const absLat = Math.abs(lat);
    let optTilt = absLat;

    if (mode === 'year') {
      if (absLat < 25) optTilt = absLat * 0.87;
      else optTilt = (absLat * 0.76) + 3.1;
    } else if (mode === 'winter') {
      optTilt = Math.min(90, absLat + 15);
    } else if (mode === 'summer') {
      optTilt = Math.max(0, absLat - 15);
    }

    const hemisphere = lat >= 0 ? 'Northern' : 'Southern';
    const trueDirection = lat >= 0 ? '180° True South' : '0° True North';

    tlResEl.textContent = optTilt.toFixed(1) + '° Fixed Tilt from Horizontal';
    azResEl.textContent = 'Azimuth: ' + trueDirection + ' (' + hemisphere + ' Hemisphere | Winter: ' + Math.min(90, absLat + 15).toFixed(1) + '°, Summer: ' + Math.max(0, absLat - 15).toFixed(1) + '°)';
  }

  latEl.addEventListener('input', update);
  optEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter geographic latitude in degrees (positive for Northern hemisphere, negative for Southern).',
      'Select energy generation priority: Annual Max, Winter Peak (off-grid), or Summer Peak (grid AC cooling).',
      'Inspect optimum tilt angle in degrees and true geographic azimuth compass direction.'
    ],
    benefitTitle: 'Solar Zenith Angle & Cosine Incident Losses',
    benefitContent: 'Perpendicular sunlight maximizes photon flux density per square meter; matching panel tilt to local latitude captures the highest integrated solar irradiance across changing seasons.',
    faqs: [{ q: 'Why is roof pitch often used instead of optimal tilt on homes?', a: 'Flush-mounting on existing roof slopes reduces racking costs, wind load shear forces, and improves architectural aesthetics despite minor ~2-5% cosine energy deviations.' }]
  },

  // 4. Solar Battery Storage Usable Capacity & Depth of Discharge Calculator
  {
    slug: 'solar-battery-storage-depth-of-discharge-calculator',
    name: 'Solar Battery Storage Usable Capacity & Depth of Discharge (DoD) Calculator',
    description: 'Calculate solar home energy storage usable energy (E_usable = Total_kWh · DoD · η_rt) and backup autonomy duration from battery chemistry (LiFePO4, NMC, Lead-Acid).',
    category: 'Science',
    icon: 'text',
    keywords: ['solar battery storage calculator', 'depth of discharge dod formula usable kwh', 'lifepo4 battery backup runtime calculator online', 'lithium vs lead acid dod round trip efficiency calculator', 'home solar battery sizing calculator'],
    order: 587,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Battery Capacity (kWh), Chemistry Type & Average Continuous Load (kW)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bat-kwh">Nameplate (kWh)</label>
          <input class="tool-textarea" id="bat-kwh" type="number" step="any" value="13.5" placeholder="13.5 kWh (Tesla Powerwall 2)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bat-chem">Battery Chemistry</label>
          <select class="tool-textarea" id="bat-chem">
            <option value="lifepo4" selected>Lithium Iron Phosphate (LiFePO4, 90% DoD, 95% Eff)</option>
            <option value="nmc">Lithium NMC (90% DoD, 92% Eff)</option>
            <option value="lead">Deep Cycle Lead-Acid AGM (50% DoD, 80% Eff)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bat-load">Continuous Load (kW)</label>
          <input class="tool-textarea" id="bat-load" type="number" step="any" value="1.5" placeholder="1.5 kW (Refrigeration + Lights + Router)" />
        </div>
      </div>
      <div id="bat-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bat-res-use" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">11.54 kWh Usable</span>
            <span class="stat-label">Net Usable Discharge Energy (E_usable)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bat-res-time" style="font-weight:700;">7.7 Hours Backup Autonomy Runtime</span>
            <span class="stat-label">Blackout Backup Autonomy Duration</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kwhEl = document.getElementById('bat-kwh'), chEl = document.getElementById('bat-chem'), ldEl = document.getElementById('bat-load');
  const uResEl = document.getElementById('bat-res-use'), tResEl = document.getElementById('bat-res-time');

  const CHEMS = {
    'lifepo4': { dod: 0.90, eff: 0.95, name: 'LiFePO4' },
    'nmc':     { dod: 0.90, eff: 0.92, name: 'Lithium NMC' },
    'lead':    { dod: 0.50, eff: 0.80, name: 'Lead-Acid AGM' }
  };

  function update() {
    const kwh = parseFloat(kwhEl.value), chem = CHEMS[chEl.value], loadKw = parseFloat(ldEl.value);
    if (isNaN(kwh) || isNaN(loadKw) || kwh <= 0 || loadKw <= 0) return;

    const usableKwh = kwh * chem.dod * chem.eff;
    const runtimeHrs = usableKwh / loadKw;
    const runtimeDays = runtimeHrs / 24;

    uResEl.textContent = usableKwh.toFixed(2) + ' kWh Usable (' + ((usableKwh / kwh) * 100).toFixed(1) + '% Net Delivery)';

    let timeStr = '';
    if (runtimeDays >= 1.0) timeStr = runtimeDays.toFixed(1) + ' Days (' + runtimeHrs.toFixed(1) + ' Hours)';
    else timeStr = runtimeHrs.toFixed(1) + ' Hours';

    tResEl.textContent = timeStr + ' Backup @ ' + loadKw.toFixed(2) + ' kW Continuous Load (DoD: ' + (chem.dod*100) + '%)';
  }

  [kwhEl, ldEl].forEach(el => el.addEventListener('input', update));
  chEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter nominal nameplate battery energy storage capacity in kilowatt-hours (kWh).',
      'Select battery chemistry (LiFePO4, NMC, Lead-Acid AGM).',
      'Enter essential household backup electrical continuous power load in kW.',
      'Inspect net deliverable usable energy in kWh and estimated blackout runtime duration.'
    ],
    benefitTitle: 'Depth of Discharge (DoD) & Battery Lifespan',
    benefitContent: 'Discharging lead-acid batteries beyond 50% causes rapid sulfation and destroys cells in months; modern Lithium Iron Phosphate (LiFePO4) chemistry safely operates at 90% Depth of Discharge for over 6,000+ daily charge cycles (15+ years).',
    faqs: [{ q: 'Why is Round-Trip Efficiency (RTE) important in solar batteries?', a: 'RTE measures energy lost as heat during chemical charge and discharge; LiFePO4 batteries deliver ~95% RTE compared to only ~75-80% for lead-acid.' }]
  },

  // 5. PV String Sizing & Cold Weather Voc Voltage Window Calculator
  {
    slug: 'pv-string-sizing-voltage-window-calculator',
    name: 'PV String Sizing & Cold Weather Voc Voltage Window Calculator',
    description: 'Calculate maximum series solar panel string size and coldest record winter open-circuit voltage (V_oc(cold) = V_oc · [1 + β_v · (T_min - 25°C)]) to prevent damaging MPPT inverter limits.',
    category: 'Science',
    icon: 'text',
    keywords: ['pv string sizing calculator', 'voc temperature coefficient formula cold weather', 'mppt voltage window maximum string size calculator', 'nec 690 solar string sizing online', 'solar inverter mppt min max string voltage calculator'],
    order: 588,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Panel V_oc (V), Temp Coeff β_v (%/°C), Record Cold T_min (°C) & Max Inverter V_max (V)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="str-voc">Panel V_oc (STC)</label>
          <input class="tool-textarea" id="str-voc" type="number" step="any" value="49.5" placeholder="49.5 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="str-beta">V_oc Coeff β_v (%/°C)</label>
          <input class="tool-textarea" id="str-beta" type="number" step="0.01" value="-0.27" placeholder="-0.27 %/°C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="str-tmin">Record Cold T_min (°C)</label>
          <input class="tool-textarea" id="str-tmin" type="number" step="any" value="-15.0" placeholder="-15.0 °C Winter Low" />
        </div>
        <div class="control-group">
          <label class="control-label" for="str-vmax">Inverter Max V_max (V)</label>
          <input class="tool-textarea" id="str-vmax" type="number" step="any" value="600.0" placeholder="600.0 V (Residential Limit)" />
        </div>
      </div>
      <div id="str-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="str-res-maxp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">10 Modules Max</span>
            <span class="stat-label">Maximum Series Modules per MPPT String</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="str-res-voc" style="font-weight:700;">54.8 V Cold V_oc / Module (String Max: 548.5 V)</span>
            <span class="stat-label">Worst-Case Winter Open Circuit Voltage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vocEl = document.getElementById('str-voc'), bEl = document.getElementById('str-beta');
  const tEl = document.getElementById('str-tmin'), vmEl = document.getElementById('str-vmax');
  const pResEl = document.getElementById('str-res-maxp'), vResEl = document.getElementById('str-res-voc');

  function update() {
    const Voc_stc = parseFloat(vocEl.value), beta = parseFloat(bEl.value);
    const Tmin = parseFloat(tEl.value), Vmax_inv = parseFloat(vmEl.value);

    if (isNaN(Voc_stc) || isNaN(beta) || isNaN(Tmin) || isNaN(Vmax_inv) || Voc_stc <= 0 || Vmax_inv <= 0) return;

    const deltaT = Tmin - 25.0;
    const Voc_cold = Voc_stc * (1 + ((beta / 100) * deltaT));
    const maxModules = Math.floor(Vmax_inv / Voc_cold);
    const maxStringVoc = maxModules * Voc_cold;

    pResEl.textContent = maxModules + ' Panels in Series (Max Safe String)';
    vResEl.textContent = Voc_cold.toFixed(2) + ' V Cold V_oc @ ' + Tmin + '°C (Max String V_oc = ' + maxStringVoc.toFixed(1) + ' V, Limit: ' + Vmax_inv + ' V)';
  }

  [vocEl, bEl, tEl, vmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter solar panel open-circuit voltage V_oc at Standard Test Conditions (25°C).',
      'Enter temperature coefficient of open-circuit voltage beta_v in %/°C (negative value, e.g. -0.27%/°C).',
      'Enter local historical record minimum winter morning temperature in Celsius.',
      'Enter inverter maximum allowable DC input voltage limit (600V for residential, 1000V/1500V for commercial).',
      'Inspect maximum safe series modules per string to guarantee the inverter never suffers catastrophic overvoltage.'
    ],
    benefitTitle: 'NEC Article 690 Cold Weather Overvoltage Compliance',
    benefitContent: 'On freezing, crystal-clear winter mornings, solar module voltages rise significantly above their nameplate 25°C ratings; calculating worst-case cold open-circuit voltage prevents catastrophic destruction of inverter input bridge capacitors.',
    faqs: [{ q: 'Why is V_oc higher in cold temperatures?', a: 'Lower temperatures reduce thermal recombination of charge carriers, increasing the internal built-in potential barrier and boosting cell voltage.' }]
  },

  // --- Suite CCCC: Computational Geometry, CAD & Graphics (710 - 714) ---
  // 6. Cubic Bézier Curve Interpolation & Arc-Length Calculator
  {
    slug: 'bezier-cubic-curve-interpolation-calculator',
    name: 'Cubic Bézier Curve Interpolation (B(t)) Calculator',
    description: 'Calculate 2D Cubic Bézier parametric spline coordinates (B(t) = (1-t)³·P₀ + 3·(1-t)²·t·P₁ + 3·(1-t)·t²·P₂ + t³·P₃), tangent slope, and curvature for CAD and vector graphics.',
    category: 'Science',
    icon: 'text',
    keywords: ['bezier curve calculator', 'cubic bezier formula b of t online', 'parametric bezier curve interpolation calculator', 'vector graphics font bezier spline calculator', 'computer graphics cubic bezier online'],
    order: 589,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Control Points P₀(0,0), P₁(x₁,y₁), P₂(x₂,y₂), P₃(1,1) & Parameter t (0 to 1)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bz-x1">P₁ X (Handle 1)</label>
          <input class="tool-textarea" id="bz-x1" type="number" step="0.05" value="0.25" placeholder="0.25" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bz-y1">P₁ Y (Handle 1)</label>
          <input class="tool-textarea" id="bz-y1" type="number" step="0.05" value="0.10" placeholder="0.10" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bz-x2">P₂ X (Handle 2)</label>
          <input class="tool-textarea" id="bz-x2" type="number" step="0.05" value="0.25" placeholder="0.25" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bz-y2">P₂ Y (Handle 2)</label>
          <input class="tool-textarea" id="bz-y2" type="number" step="0.05" value="1.00" placeholder="1.00" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bz-t">Parameter t (0 - 1)</label>
          <input class="tool-textarea" id="bz-t" type="number" step="0.05" min="0" max="1" value="0.50" placeholder="0.50 Midpoint" />
        </div>
      </div>
      <div id="bz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bz-res-pt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">B(0.5) = (0.344, 0.538)</span>
            <span class="stat-label">Calculated Curve Point B(t)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bz-res-tang" style="font-weight:700;">Tangent Velocity: (0.750, 1.350) | Slope m = 1.800</span>
            <span class="stat-label">First Derivative Tangent Vector B\'(t)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const x1El = document.getElementById('bz-x1'), y1El = document.getElementById('bz-y1');
  const x2El = document.getElementById('bz-x2'), y2El = document.getElementById('bz-y2'), tEl = document.getElementById('bz-t');
  const pResEl = document.getElementById('bz-res-pt'), tgResEl = document.getElementById('bz-res-tang');

  const P0 = { x: 0.0, y: 0.0 };
  const P3 = { x: 1.0, y: 1.0 };

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value), t = parseFloat(tEl.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(t) || t < 0 || t > 1) return;

    const u = 1 - t;
    const Bx = (Math.pow(u, 3) * P0.x) + (3 * Math.pow(u, 2) * t * x1) + (3 * u * Math.pow(t, 2) * x2) + (Math.pow(t, 3) * P3.x);
    const By = (Math.pow(u, 3) * P0.y) + (3 * Math.pow(u, 2) * t * y1) + (3 * u * Math.pow(t, 2) * y2) + (Math.pow(t, 3) * P3.y);

    const dBx = (3 * Math.pow(u, 2) * (x1 - P0.x)) + (6 * u * t * (x2 - x1)) + (3 * Math.pow(t, 2) * (P3.x - x2));
    const dBy = (3 * Math.pow(u, 2) * (y1 - P0.y)) + (6 * u * t * (y2 - y1)) + (3 * Math.pow(t, 2) * (P3.y - y2));
    const slope = dBx !== 0 ? (dBy / dBx) : 9999;

    pResEl.textContent = 'B(' + t.toFixed(2) + ') = (' + Bx.toFixed(3) + ', ' + By.toFixed(3) + ')';
    tgResEl.textContent = 'Tangent: (' + dBx.toFixed(3) + ', ' + dBy.toFixed(3) + ') | Slope m = ' + slope.toFixed(3) + ' (Angle: ' + ((Math.atan2(dBy, dBx) * 180) / Math.PI).toFixed(1) + '°)';
  }

  [x1El, y1El, x2El, y2El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter normalized coordinates for intermediate control handles P₁ and P₂ (starting at P₀(0,0) and ending at P₃(1,1)).',
      'Enter progression parameter t between 0.0 and 1.0.',
      'Inspect interpolated curve coordinates B(t), velocity tangent vector, and instantaneous curve slope.'
    ],
    benefitTitle: 'Pierre Bézier 1962 Renault CAD Geometry',
    benefitContent: 'Bézier curves define smooth, scalable shapes using affine combinations of Bernstein polynomials; they are the universal mathematical standard behind PostScript, SVG vector graphics, and CSS cubic-bezier animation easing curves.',
    faqs: [{ q: 'What is a CSS cubic-bezier(x1, y1, x2, y2) transition?', a: 'CSS animation easing curves are 2D cubic Bézier splines where X represents normalized animation time (0 to 1) and Y represents animated property completion (0 to 1).' }]
  },

  // 7. 3D Quaternion to Euler Angles (Roll, Pitch, Yaw) Converter
  {
    slug: 'quaternion-to-euler-angles-3d-rotation-calculator',
    name: '3D Unit Quaternion to Euler Angles (Roll, Pitch, Yaw) Converter',
    description: 'Convert 3D spatial rotation unit quaternions q = (w, x, y, z) into Euler angles (Roll φ, Pitch θ, Yaw ψ) in degrees and radians without gimbal lock singularities.',
    category: 'Science',
    icon: 'text',
    keywords: ['quaternion to euler angles calculator', 'quaternion roll pitch yaw converter online', '3d rotation quaternion w x y z to degrees', 'gimbal lock avoidance quaternion calculator', 'aerospace robotics 3d orientation converter'],
    order: 590,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Quaternion Components: Scalar w, Vector x, y, z',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qt-w">Scalar (w)</label>
          <input class="tool-textarea" id="qt-w" type="number" step="0.01" value="0.7071" placeholder="0.7071" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-x">Vector (x)</label>
          <input class="tool-textarea" id="qt-x" type="number" step="0.01" value="0.7071" placeholder="0.7071" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-y">Vector (y)</label>
          <input class="tool-textarea" id="qt-y" type="number" step="0.01" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-z">Vector (z)</label>
          <input class="tool-textarea" id="qt-z" type="number" step="0.01" value="0.0" placeholder="0.0" />
        </div>
      </div>
      <div id="qt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qt-res-eul" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Roll: 90.0° | Pitch: 0.0° | Yaw: 0.0°</span>
            <span class="stat-label">Euler Angles (Tait-Bryan ZYX)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qt-res-norm" style="font-weight:700;">Unit Magnitude |q| = 1.0000 (Pure 90° X-Axis Rotation)</span>
            <span class="stat-label">Quaternion Normalization Check & Rotation Axis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('qt-w'), xEl = document.getElementById('qt-x');
  const yEl = document.getElementById('qt-y'), zEl = document.getElementById('qt-z');
  const euResEl = document.getElementById('qt-res-eul'), nmResEl = document.getElementById('qt-res-norm');

  function update() {
    let w = parseFloat(wEl.value), x = parseFloat(xEl.value);
    let y = parseFloat(yEl.value), z = parseFloat(zEl.value);

    if (isNaN(w) || isNaN(x) || isNaN(y) || isNaN(z)) return;

    const mag = Math.sqrt(w*w + x*x + y*y + z*z);
    if (mag === 0) return;
    w /= mag; x /= mag; y /= mag; z /= mag;

    const sinr_cosp = 2 * (w * x + y * z);
    const cosr_cosp = 1 - 2 * (x * x + y * y);
    const rollRad = Math.atan2(sinr_cosp, cosr_cosp);
    const rollDeg = (rollRad * 180) / Math.PI;

    const sinp = 2 * (w * y - z * x);
    let pitchRad = 0;
    if (Math.abs(sinp) >= 1) {
      pitchRad = Math.sign(sinp) * (Math.PI / 2);
    } else {
      pitchRad = Math.asin(sinp);
    }
    const pitchDeg = (pitchRad * 180) / Math.PI;

    const siny_cosp = 2 * (w * z + x * y);
    const cosy_cosp = 1 - 2 * (y * y + z * z);
    const yawRad = Math.atan2(siny_cosp, cosy_cosp);
    const yawDeg = (yawRad * 180) / Math.PI;

    euResEl.textContent = 'Roll: ' + rollDeg.toFixed(1) + '° | Pitch: ' + pitchDeg.toFixed(1) + '° | Yaw: ' + yawDeg.toFixed(1) + '°';
    nmResEl.textContent = 'Norm: |q| = ' + mag.toFixed(4) + ' (Roll: ' + rollRad.toFixed(2) + ' rad, Pitch: ' + pitchRad.toFixed(2) + ' rad, Yaw: ' + yawRad.toFixed(2) + ' rad)';
  }

  [wEl, xEl, yEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter scalar real component w of the 4D orientation quaternion.',
      'Enter imaginary spatial vector components (x, y, z).',
      'The calculator automatically normalizes the quaternion to unit length (|q| = 1).',
      'Inspect converted Tait-Bryan aerospace Euler angles: Roll (Bank), Pitch (Elevation), and Yaw (Heading).'
    ],
    benefitTitle: 'Sir William Rowan Hamilton 1843 Quaternions vs Gimbal Lock',
    benefitContent: 'Euler angles suffer from mathematical singularities (Gimbal Lock) when pitch reaches 90 degrees, causing a degree of rotational freedom to vanish; 4D unit quaternions provide smooth, singularity-free spherical interpolation in 3D game engines and flight computers.',
    faqs: [{ q: 'How does a rotation angle theta around axis map to a quaternion?', a: 'q = (cos(theta/2), ux·sin(theta/2), uy·sin(theta/2), uz·sin(theta/2)).' }]
  },

  // 8. Polygon Area & Centroid (Shoelace Formula) Calculator
  {
    slug: 'polygon-shoelace-area-centroid-calculator',
    name: 'Polygon Area & Geometric Centroid (Shoelace Formula) Calculator',
    description: 'Calculate arbitrary 2D polygon area (A = 1/2 · |Σ(x_i · y_{i+1} - x_{i+1} · y_i)|) and center of mass centroid coordinates (C_x, C_y) from Cartesian vertex coordinates.',
    category: 'Science',
    icon: 'text',
    keywords: ['polygon area calculator', 'shoelace formula gauss area polygon calculator', 'polygon centroid coordinates cx cy calculator', 'surveying land area coordinates calculator online', 'computational geometry shoelace algorithm online'],
    order: 591,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Polygon Vertices (X, Y Pairs - One Point per Line in Order)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="shl-pts">Polygon Vertices (x, y)</label>
        <textarea class="tool-textarea" id="shl-pts" rows="4" placeholder="x1, y1&#10;x2, y2&#10;x3, y3...">0, 0&#10;10, 0&#10;12, 8&#10;4, 12&#10;0, 6</textarea>
      </div>
      <div id="shl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="shl-res-area" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">86.00 Sq Units</span>
            <span class="stat-label">Enclosed Polygon Area (A)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="shl-res-cent" style="font-weight:700;">Centroid C = (5.19, 5.09) | Perimeter: 37.28</span>
            <span class="stat-label">Center of Gravity Centroid (C_x, C_y) & Perimeter</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('shl-pts');
  const aResEl = document.getElementById('shl-res-area'), cResEl = document.getElementById('shl-res-cent');

  function update() {
    const raw = pEl.value.trim();
    if (!raw) return;

    const lines = raw.split(/\\r?\\n/);
    const pts = [];
    for (let i = 0; i < lines.length; i++) {
      const parts = lines[i].split(/[,\\s]+/).filter(Boolean);
      if (parts.length >= 2) {
        const x = parseFloat(parts[0]), y = parseFloat(parts[1]);
        if (!isNaN(x) && !isNaN(y)) pts.push({ x, y });
      }
    }

    if (pts.length < 3) {
      aResEl.textContent = 'At least 3 vertices required';
      cResEl.textContent = 'Enter valid polygon coordinates';
      return;
    }

    const n = pts.length;
    let signedArea = 0;
    let cx = 0, cy = 0;
    let perimeter = 0;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const cross = (pts[i].x * pts[j].y) - (pts[j].x * pts[i].y);
      signedArea += cross;
      cx += (pts[i].x + pts[j].x) * cross;
      cy += (pts[i].y + pts[j].y) * cross;

      const dx = pts[j].x - pts[i].x, dy = pts[j].y - pts[i].y;
      perimeter += Math.sqrt(dx*dx + dy*dy);
    }

    signedArea = signedArea / 2;
    const area = Math.abs(signedArea);

    if (area > 0) {
      cx = cx / (6 * signedArea);
      cy = cy / (6 * signedArea);
    }

    aResEl.textContent = area.toFixed(2) + ' Sq Units (Shoelace Area)';
    cResEl.textContent = 'Centroid C = (' + cx.toFixed(2) + ', ' + cy.toFixed(2) + ') | Perimeter: ' + perimeter.toFixed(2) + ' (' + n + ' Vertices)';
  }

  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter polygon vertex Cartesian coordinates (X, Y) in clockwise or counterclockwise perimeter order (one pair per line).',
      'The calculator automatically connects the final vertex back to the first vertex.',
      'Inspect polygon enclosed planar area using Gauss Shoelace formula, true center of mass centroid, and perimeter length.'
    ],
    benefitTitle: 'Carl Friedrich Gauss 1795 Shoelace Algorithm',
    benefitContent: 'The Shoelace formula integrates the cross product of adjacent vertex coordinate vectors to compute the exact area of non-self-intersecting polygons of arbitrary shape and complexity.',
    faqs: [{ q: 'Why is it named the Shoelace formula?', a: 'Because the pattern of multiplying cross-diagonal coordinate pairs resembles lacing up a shoe.' }]
  },

  // 9. Bresenham Line Rasterization Algorithm Step Calculator
  {
    slug: 'bresenham-line-rasterization-step-calculator',
    name: 'Bresenham Line Rasterization Algorithm Step Calculator',
    description: 'Calculate discrete pixel grid coordinates and integer decision error variables (D = 2Δy - Δx) generated by Jack Bresenham computer graphics line drawing algorithm.',
    category: 'Science',
    icon: 'text',
    keywords: ['bresenham line algorithm calculator', 'bresenham pixel grid rasterization online', 'integer dda line drawing decision error calculator', 'computer graphics raster line bresenham calculator', 'pixel coordinate generator online'],
    order: 592,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Start Point (X₀, Y₀) & End Point (X₁, Y₁)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="br-x0">Start X₀</label>
          <input class="tool-textarea" id="br-x0" type="number" step="1" value="2" placeholder="2" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-y0">Start Y₀</label>
          <input class="tool-textarea" id="br-y0" type="number" step="1" value="3" placeholder="3" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-x1">End X₁</label>
          <input class="tool-textarea" id="br-x1" type="number" step="1" value="10" placeholder="10" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-y1">End Y₁</label>
          <input class="tool-textarea" id="br-y1" type="number" step="1" value="7" placeholder="7" />
        </div>
      </div>
      <div id="br-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="br-res-cnt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">9 Pixels Rasterized</span>
            <span class="stat-label">Total Discrete Line Pixels Plotted</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="br-res-list" style="font-weight:700;">(2,3) to (3,4) to (4,4) to (5,5) to (6,5)...</span>
            <span class="stat-label">Rasterized Pixel Sequence Path</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const x0El = document.getElementById('br-x0'), y0El = document.getElementById('br-y0');
  const x1El = document.getElementById('br-x1'), y1El = document.getElementById('br-y1');
  const cResEl = document.getElementById('br-res-cnt'), lResEl = document.getElementById('br-res-list');

  function update() {
    let x0 = parseInt(x0El.value, 10), y0 = parseInt(y0El.value, 10);
    let x1 = parseInt(x1El.value, 10), y1 = parseInt(y1El.value, 10);

    if (isNaN(x0) || isNaN(y0) || isNaN(x1) || isNaN(y1)) return;

    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    const pixels = [];
    let curX = x0, curY = y0;

    while (true) {
      pixels.push('(' + curX + ',' + curY + ')');
      if (curX === x1 && curY === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        curX += sx;
      }
      if (e2 < dx) {
        err += dx;
        curY += sy;
      }
      if (pixels.length > 500) break;
    }

    cResEl.textContent = pixels.length + ' Pixels Rasterized (Δx=' + dx + ', Δy=' + dy + ')';
    lResEl.textContent = pixels.slice(0, 10).join(' -> ') + (pixels.length > 10 ? ' ... -> (' + x1 + ',' + y1 + ')' : '');
  }

  [x0El, y0El, x1El, y1El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter starting integer pixel coordinate (X₀, Y₀).',
      'Enter ending integer pixel coordinate (X₁, Y₁).',
      'Inspect total rasterized pixel count and sequential discrete pixel trajectory path.'
    ],
    benefitTitle: 'Jack Bresenham 1962 Integer Arithmetic Speed',
    benefitContent: 'Bresenham algorithm eliminates costly floating-point divisions by tracking an integer decision error variable, allowing hardware display controllers to rasterize lines using purely fast integer addition.',
    faqs: [{ q: 'Why is Bresenham algorithm faster than standard DDA?', a: 'Digital Differential Analyzers (DDA) require floating-point arithmetic and rounding at every step, whereas Bresenham uses exclusively integer additions.' }]
  },

  // 10. 3D Perspective Projection Frustum & FOV Calculator
  {
    slug: 'perspective-projection-fov-frustum-calculator',
    name: '3D Perspective Projection Camera FOV & Frustum Calculator',
    description: 'Calculate 3D graphics camera perspective projection matrix focal length (f = 1 / tan(FOV / 2)), near/far clipping plane dimensions, and Normalized Device Coordinates (NDC).',
    category: 'Science',
    icon: 'text',
    keywords: ['perspective projection calculator', 'camera fov focal length formula 1 over tan fov 2', '3d graphics frustum near far plane calculator', 'opengl directx perspective projection matrix online', 'game engine camera fov calculator'],
    order: 593,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Field of View FOV (° Vertical), Aspect Ratio (W:H) & Near/Far Planes (meters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cam-fov">Vertical FOV (°)</label>
          <input class="tool-textarea" id="cam-fov" type="number" step="1" value="60" placeholder="60° (Standard Gaming FOV)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cam-asp">Aspect Ratio</label>
          <select class="tool-textarea" id="cam-asp">
            <option value="1.777778" selected>16:9 Widescreen (1.778)</option>
            <option value="1.333333">4:3 Standard (1.333)</option>
            <option value="2.333333">21:9 Ultrawide (2.333)</option>
            <option value="1.000000">1:1 Square (1.000)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cam-near">Near Plane (m)</label>
          <input class="tool-textarea" id="cam-near" type="number" step="0.01" value="0.10" placeholder="0.10 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cam-far">Far Plane (m)</label>
          <input class="tool-textarea" id="cam-far" type="number" step="any" value="1000.0" placeholder="1000.0 m Draw Distance" />
        </div>
      </div>
      <div id="cam-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cam-res-foc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f = 1.732 (Focal Length)</span>
            <span class="stat-label">Projection Matrix Focal Parameter (cot(FOV/2))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cam-res-hfov" style="font-weight:700;">Horizontal FOV: 91.5° | Far Width: 2,053 m</span>
            <span class="stat-label">Equivalent Horizontal FOV & Far Plane Dimensions</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fovEl = document.getElementById('cam-fov'), aspEl = document.getElementById('cam-asp');
  const nEl = document.getElementById('cam-near'), fEl = document.getElementById('cam-far');
  const fcResEl = document.getElementById('cam-res-foc'), hfResEl = document.getElementById('cam-res-hfov');

  function update() {
    const fovVDeg = parseFloat(fovEl.value), aspect = parseFloat(aspEl.value);
    const zNear = parseFloat(nEl.value), zFar = parseFloat(fEl.value);

    if (isNaN(fovVDeg) || isNaN(aspect) || isNaN(zNear) || isNaN(zFar) || fovVDeg <= 0 || fovVDeg >= 180 || zNear <= 0 || zFar <= zNear) return;

    const fovVRad = (fovVDeg * Math.PI) / 180;
    const focalLength = 1 / Math.tan(fovVRad / 2);

    const fovHRad = 2 * Math.atan(Math.tan(fovVRad / 2) * aspect);
    const fovHDeg = (fovHRad * 180) / Math.PI;

    const farHeight = 2 * zFar * Math.tan(fovVRad / 2);
    const farWidth = farHeight * aspect;

    fcResEl.textContent = 'f = ' + focalLength.toFixed(3) + ' (cot(FOV/2))';
    hfResEl.textContent = 'Horizontal FOV: ' + fovHDeg.toFixed(1) + '° (Far Plane: ' + Math.round(farWidth).toLocaleString() + 'm × ' + Math.round(farHeight).toLocaleString() + 'm)';
  }

  [fovEl, nEl, fEl].forEach(el => el.addEventListener('input', update));
  aspEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter vertical field of view (FOV_v) in degrees (60° standard for 3D camera viewing).',
      'Select display viewport aspect ratio (16:9, 4:3, 21:9).',
      'Enter camera near and far depth clipping planes in meters.',
      'Inspect projection matrix focal scaling factor f = cot(FOV/2), equivalent horizontal field of view, and far plane viewing cone dimensions.'
    ],
    benefitTitle: 'OpenGL & Direct3D Frustum Mapping',
    benefitContent: 'The 4x4 perspective projection matrix maps a truncated view frustum into a canonical (-1 to +1) Normalized Device Coordinate cube; dividing by homogeneous coordinates (w = -z) shrinks distant geometry to create realistic 3D perspective depth.',
    faqs: [{ q: 'Why does setting near plane too close cause Z-fighting?', a: 'Perspective depth precision is non-linear (1/z distribution); placing the near plane too close consumes nearly all 24-bit depth buffer precision near the camera.' }]
  },

  // --- Suite DDDD: Quantum Computing & Qubits (715 - 719) ---
  // 11. Bloch Sphere Qubit State Coordinates Calculator
  {
    slug: 'bloch-sphere-qubit-state-coordinates-calculator',
    name: 'Bloch Sphere Qubit State Coordinates (|ψ⟩) Calculator',
    description: 'Calculate quantum qubit state vector (|ψ⟩ = cos(θ/2)|0⟩ + e^(i·ϕ)·sin(θ/2)|1⟩) probabilities and 3D Bloch sphere Cartesian coordinates (x, y, z).',
    category: 'Science',
    icon: 'text',
    keywords: ['bloch sphere calculator', 'qubit state vector formula theta phi', 'bloch sphere cartesian coordinates x y z calculator', 'quantum superposition probability 0 1 online', 'quantum computing bloch sphere online'],
    order: 594,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Polar Angle θ (° Colatitude) & Azimuthal Angle ϕ (° Phase)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bl-th">Polar Angle θ (°)</label>
          <input class="tool-textarea" id="bl-th" type="number" step="5" min="0" max="180" value="90" placeholder="90° (Equator Superposition)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-phi">Azimuthal Phase ϕ (°)</label>
          <input class="tool-textarea" id="bl-phi" type="number" step="5" min="0" max="360" value="0" placeholder="0° (|+) State)" />
        </div>
      </div>
      <div id="bl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bl-res-coord" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">(x=1.00, y=0.00, z=0.00)</span>
            <span class="stat-label">Bloch Sphere Cartesian Vector [x, y, z]</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bl-res-prob" style="font-weight:700;">|0⟩: 50.0% | |1⟩: 50.0% (|+) Superposition State)</span>
            <span class="stat-label">Measurement Outcome Probabilities (|α|² and |β|²)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('bl-th'), phiEl = document.getElementById('bl-phi');
  const cResEl = document.getElementById('bl-res-coord'), pResEl = document.getElementById('bl-res-prob');

  function update() {
    const thDeg = parseFloat(thEl.value), phiDeg = parseFloat(phiEl.value);
    if (isNaN(thDeg) || isNaN(phiDeg)) return;

    const thRad = (thDeg * Math.PI) / 180;
    const phiRad = (phiDeg * Math.PI) / 180;

    const x = Math.sin(thRad) * Math.cos(phiRad);
    const y = Math.sin(thRad) * Math.sin(phiRad);
    const z = Math.cos(thRad);

    const p0 = Math.pow(Math.cos(thRad / 2), 2) * 100;
    const p1 = Math.pow(Math.sin(thRad / 2), 2) * 100;

    let stateName = '';
    if (thDeg === 0) stateName = 'Ground State |0⟩';
    else if (thDeg === 180) stateName = 'Excited State |1⟩';
    else if (thDeg === 90 && phiDeg === 0) stateName = '|+⟩ State (Hadamard)';
    else if (thDeg === 90 && phiDeg === 180) stateName = '|-⟩ State';
    else if (thDeg === 90 && phiDeg === 90) stateName = '|i+⟩ State';
    else stateName = 'Superposition State';

    cResEl.textContent = '(x=' + x.toFixed(2) + ', y=' + y.toFixed(2) + ', z=' + z.toFixed(2) + ')';
    pResEl.textContent = 'P(|0⟩) = ' + p0.toFixed(1) + '% | P(|1⟩) = ' + p1.toFixed(1) + '% (' + stateName + ')';
  }

  thEl.addEventListener('input', update);
  phiEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter polar colatitude angle theta (0° North Pole = |0⟩, 180° South Pole = |1⟩, 90° Equator = Equal Superposition).',
      'Enter azimuthal quantum phase angle phi (0° to 360°).',
      'Inspect 3D Bloch sphere vector coordinates [x, y, z] and Born rule measurement probabilities P(|0⟩) and P(|1⟩).'
    ],
    benefitTitle: 'Felix Bloch 1946 Geometric Qubit Representation',
    benefitContent: 'The Bloch sphere maps pure single-qubit quantum states to the surface of a unit sphere in 3D space, making quantum gate operations visually equivalent to pure spatial rotations.',
    faqs: [{ q: 'Why is angle theta divided by 2 in the state equation?', a: 'Because orthogonal states |0⟩ and |1⟩ sit on opposite antipodal poles of the sphere (180 degrees apart in geometry, but 90 degrees orthogonal in Hilbert space).' }]
  },

  // 12. Hadamard Quantum Gate Superposition State Matrix Calculator
  {
    slug: 'hadamard-quantum-gate-superposition-calculator',
    name: 'Hadamard Quantum Gate (H) Superposition Matrix Calculator',
    description: 'Calculate Hadamard quantum gate unitary matrix transformations (H|0⟩ = |+⟩, H|1⟩ = |-⟩) and output state vector probability amplitudes.',
    category: 'Science',
    icon: 'text',
    keywords: ['hadamard gate calculator', 'hadamard matrix 1 over sqrt 2 formula', 'quantum superposition h gate calculator', 'qubit transformation hadamard online', 'quantum computing hadamard gate simulator'],
    order: 595,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input Pure Qubit State (|0⟩, |1⟩, |+⟩, |-⟩ or Custom Amplitudes)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hd-state">Input Qubit State</label>
          <select class="tool-textarea" id="hd-state">
            <option value="0" selected>Base State |0⟩ [α=1, β=0]</option>
            <option value="1">Base State |1⟩ [α=0, β=1]</option>
            <option value="plus">Superposition |+⟩ [α=1/√2, β=1/√2]</option>
            <option value="minus">Superposition |-⟩ [α=1/√2, β=-1/√2]</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hd-pass">Number of H Gates</label>
          <select class="tool-textarea" id="hd-pass">
            <option value="1" selected>Single H Gate (Create Superposition)</option>
            <option value="2">Two Consecutive H Gates (H² = I Identity)</option>
          </select>
        </div>
      </div>
      <div id="hd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hd-res-out" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">|+⟩ = 0.707|0⟩ + 0.707|1⟩</span>
            <span class="stat-label">Transformed Output Quantum State</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hd-res-prob" style="font-weight:700;">50% |0⟩ | 50% |1⟩ (Equal Probability Superposition)</span>
            <span class="stat-label">Measurement Outcome Probabilities</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const stEl = document.getElementById('hd-state'), psEl = document.getElementById('hd-pass');
  const oResEl = document.getElementById('hd-res-out'), pResEl = document.getElementById('hd-res-prob');

  const invSqrt2 = 1 / Math.SQRT2;

  function update() {
    const state = stEl.value, passes = parseInt(psEl.value, 10);

    let a = 1.0, b = 0.0;
    if (state === '1') { a = 0.0; b = 1.0; }
    else if (state === 'plus') { a = invSqrt2; b = invSqrt2; }
    else if (state === 'minus') { a = invSqrt2; b = -invSqrt2; }

    for (let i = 0; i < passes; i++) {
      const a_next = (a + b) * invSqrt2;
      const b_next = (a - b) * invSqrt2;
      a = a_next;
      b = b_next;
    }

    const p0 = Math.pow(a, 2) * 100;
    const p1 = Math.pow(b, 2) * 100;

    let signStr = b >= 0 ? ' + ' : ' - ';
    oResEl.textContent = a.toFixed(3) + '|0⟩' + signStr + Math.abs(b).toFixed(3) + '|1⟩';
    pResEl.textContent = p0.toFixed(1) + '% |0⟩ | ' + p1.toFixed(1) + '% |1⟩ (' + (passes === 2 ? 'H² = I Identity Restored' : 'Hadamard Transform') + ')';
  }

  stEl.addEventListener('change', update);
  psEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select initial input qubit state (|0⟩, |1⟩, |+⟩, |-⟩).',
      'Select number of sequential Hadamard gate operations.',
      'Inspect transformed quantum state vector amplitudes and measurement outcome probability collapse.'
    ],
    benefitTitle: 'The Fundamental Equal Superposition Creator',
    benefitContent: 'The Hadamard gate is an involuntary self-inverse unitary operator; applying H to ground state |0⟩ rotates it into equal 50/50 superposition, forming the opening step of Grover and Shor algorithms.',
    faqs: [{ q: 'What happens when you apply two Hadamard gates in a row?', a: 'Because H² = I (Identity matrix), applying two consecutive Hadamard gates reverses the superposition and returns the qubit to its original state.' }]
  },

  // 13. Pauli Spin Matrices & Qubit Expectation Values Calculator
  {
    slug: 'pauli-spin-matrices-expectation-value-calculator',
    name: 'Pauli Spin Matrices (σ_x, σ_y, σ_z) Qubit Expectation Value Calculator',
    description: 'Calculate quantum qubit observable expectation values (⟨σ_x⟩, ⟨σ_y⟩, ⟨σ_z⟩) and state purity from density matrix state amplitudes.',
    category: 'Science',
    icon: 'text',
    keywords: ['pauli matrices expectation value calculator', 'qubit sigma x y z expectation formula', 'pauli spin operators quantum measurement calculator', 'density matrix purity trace rho squared online', 'quantum mechanics pauli observable calculator'],
    order: 596,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Qubit State Polar Angle θ (0 to 180°) & Azimuthal Phase ϕ (0 to 360°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pl-th">Polar Angle θ (°)</label>
          <input class="tool-textarea" id="pl-th" type="number" step="5" value="60" placeholder="60°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-phi">Phase Angle ϕ (°)</label>
          <input class="tool-textarea" id="pl-phi" type="number" step="5" value="45" placeholder="45°" />
        </div>
      </div>
      <div id="pl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pl-res-exp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">⟨σ_x⟩=0.612 | ⟨σ_y⟩=0.612 | ⟨σ_z⟩=0.500</span>
            <span class="stat-label">Pauli Expectation Values (⟨σ_x⟩, ⟨σ_y⟩, ⟨σ_z⟩)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pl-res-pur" style="font-weight:700;">Pure Quantum State (Purity Tr(ρ²) = 1.000)</span>
            <span class="stat-label">Quantum State Purity & Vector Norm</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('pl-th'), phiEl = document.getElementById('pl-phi');
  const eResEl = document.getElementById('pl-res-exp'), pResEl = document.getElementById('pl-res-pur');

  function update() {
    const thDeg = parseFloat(thEl.value), phiDeg = parseFloat(phiEl.value);
    if (isNaN(thDeg) || isNaN(phiDeg)) return;

    const thRad = (thDeg * Math.PI) / 180;
    const phiRad = (phiDeg * Math.PI) / 180;

    const sx = Math.sin(thRad) * Math.cos(phiRad);
    const sy = Math.sin(thRad) * Math.sin(phiRad);
    const sz = Math.cos(thRad);
    const norm = Math.sqrt(sx*sx + sy*sy + sz*sz);

    eResEl.textContent = '⟨σ_x⟩ = ' + sx.toFixed(3) + ' | ⟨σ_y⟩ = ' + sy.toFixed(3) + ' | ⟨σ_z⟩ = ' + sz.toFixed(3);
    pResEl.textContent = 'Purity Tr(ρ²) = 1.000 (Pure State, |r| = ' + norm.toFixed(3) + ', Energy Eigenstate Z-Bias: ' + sz.toFixed(3) + ')';
  }

  thEl.addEventListener('input', update);
  phiEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter qubit state vector polar angle theta and phase phi in degrees.',
      'Inspect quantum expectation values for Pauli spin operators ⟨σ_x⟩, ⟨σ_y⟩, ⟨σ_z⟩.',
      'Verify quantum state purity Tr(ρ²) = 1 and polarization vector length.'
    ],
    benefitTitle: 'Wolfgang Pauli 1927 Spin Observables',
    benefitContent: 'Pauli matrices form a complete Hermitian basis for single-qubit observables; measuring along the σ_z axis projects qubits into computational classical bits 0 and 1.',
    faqs: [{ q: 'What is the expectation value of |0⟩ along σ_z?', a: 'For state |0⟩, ⟨σ_z⟩ = +1.0; for state |1⟩, ⟨σ_z⟩ = -1.0.' }]
  },

  // 14. Bell State Entanglement Fidelity & Concurrence Calculator
  {
    slug: 'bell-state-entanglement-fidelity-calculator',
    name: 'Bell State Entanglement Fidelity & Concurrence Calculator',
    description: 'Calculate two-qubit maximally entangled Bell state fidelity (F = ⟨Φ⁺|ρ|Φ⁺⟩) and Wootters concurrence entanglement measure (C = 1.00 for pure EPR pairs).',
    category: 'Science',
    icon: 'text',
    keywords: ['bell state fidelity calculator', 'quantum entanglement concurrence calculator', 'epr pair fidelity formula online', 'maximally entangled two qubit states online', 'quantum telemetry bell state measurement calculator'],
    order: 597,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bell Basis State (|Φ⁺⟩, |Φ⁻⟩, |Ψ⁺⟩, |Ψ⁻⟩) & Experimental Visibility V (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bel-state">Target Bell State</label>
          <select class="tool-textarea" id="bel-state">
            <option value="phi_plus" selected>|Φ⁺⟩ = (|00⟩ + |11⟩) / √2</option>
            <option value="phi_minus">|Φ⁻⟩ = (|00⟩ - |11⟩) / √2</option>
            <option value="psi_plus">|Ψ⁺⟩ = (|01⟩ + |10⟩) / √2</option>
            <option value="psi_minus">|Ψ⁻⟩ = (|01⟩ - |10⟩) / √2 (Singlet)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bel-vis">Interference Visibility V (%)</label>
          <input class="tool-textarea" id="bel-vis" type="number" step="1" min="0" max="100" value="98" placeholder="98% (High Purity Photons)" />
        </div>
      </div>
      <div id="bel-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bel-res-fid" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Fidelity F = 98.5%</span>
            <span class="stat-label">State Entanglement Overlap Fidelity (F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bel-res-conc" style="color:var(--green-dark); font-weight:700;">Concurrence C = 0.970 | VIOLATES CHSH BELL INEQUALITY (S = 2.77 > 2.0)</span>
            <span class="stat-label">Wootters Concurrence & Non-Locality Test</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const stEl = document.getElementById('bel-state'), vEl = document.getElementById('bel-vis');
  const fResEl = document.getElementById('bel-res-fid'), cResEl = document.getElementById('bel-res-conc');

  function update() {
    const V_pct = parseFloat(vEl.value);
    if (isNaN(V_pct) || V_pct < 0 || V_pct > 100) return;

    const V = V_pct / 100;
    const F = (1 + (3 * V)) / 4;
    const F_pct = F * 100;
    const concurrence = Math.max(0, (3 * V - 1) / 2);
    const S = 2 * Math.SQRT2 * V;

    fResEl.textContent = 'Fidelity F = ' + F_pct.toFixed(1) + '% (Target: ' + stEl.options[stEl.selectedIndex].text.split('=')[0].trim() + ')';

    if (S > 2.0) {
      cResEl.textContent = 'Concurrence C = ' + concurrence.toFixed(3) + ' | NON-LOCAL CHSH S = ' + S.toFixed(2) + ' > 2.0 (Entangled)';
      cResEl.style.color = '#22543d';
    } else {
      cResEl.textContent = 'Concurrence C = ' + concurrence.toFixed(3) + ' | CLASSICAL LIMIT S = ' + S.toFixed(2) + ' ≤ 2.0 (No Non-Locality)';
      cResEl.style.color = '#c53030';
    }
  }

  stEl.addEventListener('change', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select target maximally entangled Bell basis state (|Φ⁺⟩, |Φ⁻⟩, |Ψ⁺⟩, |Ψ⁻⟩).',
      'Enter two-photon two-qubit Hong-Ou-Mandel quantum interference visibility V in %.',
      'Inspect quantum state overlap fidelity F, Wootters concurrence entanglement metric, and CHSH Bell inequality test parameter S (S > 2.0 confirms true quantum non-locality).'
    ],
    benefitTitle: 'John Stewart Bell 1964 Non-Locality Theorem',
    benefitContent: 'Bell proved that entangled quantum states exhibit correlations impossible under any classical local hidden variable theory; maximally entangled Bell pairs achieve S = 2√2 ≈ 2.828 (Tsirelson Bound), shattering the classical ceiling of 2.0.',
    faqs: [{ q: 'What is the Nobel Prize in Physics 2022 connection?', a: 'Aspect, Clauser, and Zeilinger won the 2022 Nobel Prize for experimentally proving Bell inequality violations using entangled photon pairs.' }]
  },

  // 15. Qubit Decoherence T1 (Relaxation) & T2 (Dephasing) Calculator
  {
    slug: 'quantum-decoherence-t1-t2-relaxation-calculator',
    name: 'Qubit Decoherence T₁ (Relaxation) & T₂ (Dephasing) Calculator',
    description: 'Calculate superconducting and ion trap qubit state decay (P_1(t) = e^(-t/T₁)) and transverse phase coherence loss (1/T₂ = 1/(2·T₁) + 1/T_ϕ) over time.',
    category: 'Science',
    icon: 'text',
    keywords: ['qubit decoherence calculator', 't1 relaxation t2 dephasing formula online', 'superconducting qubit coherence time calculator', 't2 equals 2 t1 limit quantum computing', 'quantum gate fidelity decoherence error calculator'],
    order: 598,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Relaxation Time T₁ (μs), Pure Dephasing Time T_ϕ (μs) & Elapsed Time t (μs)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dec-t1">Relaxation T₁ (μs)</label>
          <input class="tool-textarea" id="dec-t1" type="number" step="any" value="100.0" placeholder="100.0 μs (Transmon Qubit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dec-tphi">Dephasing T_ϕ (μs)</label>
          <input class="tool-textarea" id="dec-tphi" type="number" step="any" value="150.0" placeholder="150.0 μs" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dec-t">Elapsed Time t (μs)</label>
          <input class="tool-textarea" id="dec-t" type="number" step="any" value="20.0" placeholder="20.0 μs (Circuit Runtime)" />
        </div>
      </div>
      <div id="dec-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dec-res-t2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T₂ = 85.7 μs</span>
            <span class="stat-label">Total Transverse Coherence Time (T₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dec-res-fid" style="font-weight:700;">Remaining |1⟩: 81.9% | Phase Coherence: 79.2%</span>
            <span class="stat-label">Surviving Qubit State Fidelity @ t = 20 μs</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t1El = document.getElementById('dec-t1'), tpEl = document.getElementById('dec-tphi'), tEl = document.getElementById('dec-t');
  const t2ResEl = document.getElementById('dec-res-t2'), fdResEl = document.getElementById('dec-res-fid');

  function update() {
    const T1 = parseFloat(t1El.value), Tphi = parseFloat(tpEl.value), t = parseFloat(tEl.value);
    if (isNaN(T1) || isNaN(Tphi) || isNaN(t) || T1 <= 0 || Tphi <= 0 || t < 0) return;

    const invT2 = (1 / (2 * T1)) + (1 / Tphi);
    const T2 = 1 / invT2;
    const p1_survive = Math.exp(-t / T1) * 100;
    const coh_survive = Math.exp(-t / T2) * 100;

    t2ResEl.textContent = 'T₂ = ' + T2.toFixed(1) + ' μs (Theoretical Max 2·T₁ = ' + (2*T1).toFixed(1) + ' μs)';
    fdResEl.textContent = 'Population |1⟩: ' + p1_survive.toFixed(1) + '% | Phase Coherence: ' + coh_survive.toFixed(1) + '% @ t = ' + t + ' μs';
  }

  [t1El, tpEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter longitudinal energy relaxation thermal decay time T₁ in microseconds (μs).',
      'Enter pure magnetic phase dephasing time T_ϕ in μs.',
      'Enter quantum circuit execution elapsed duration time t in μs.',
      'Inspect total transverse coherence time T₂ and surviving quantum gate state fidelity.'
    ],
    benefitTitle: 'The T₂ Bound in Quantum Computing',
    benefitContent: 'Energy loss fundamentally limits quantum phase retention; no qubit can possess a transverse coherence time longer than twice its relaxation time (T₂ ≤ 2·T₁).',
    faqs: [{ q: 'What causes T1 vs T2 decoherence in superconducting qubits?', a: 'T₁ is caused by energy dissipation into material dielectric substrate defects, while T₂ dephasing is driven by low-frequency flux and charge noise.' }]
  },

  // --- Suite EEEE: Oceanography & Coastal Engineering (720 - 724) ---
  // 16. Airy Linear Wave Theory Celerity & Wavelength Calculator
  {
    slug: 'ocean-wave-celerity-wavelength-airy-calculator',
    name: 'Ocean Wave Celerity & Wavelength (Airy Linear Wave Theory) Calculator',
    description: 'Calculate ocean wave phase speed celerity (c = √(g · L / 2π · tanh(2πd / L))) in m/s and wavelength L across deep water (d over L greater than 0.5) and shallow water (d over L less than 0.05).',
    category: 'Science',
    icon: 'text',
    keywords: ['ocean wave celerity calculator', 'airy linear wave theory wavelength formula', 'shallow deep water wave phase speed calculator', 'ocean wave period wavelength tanh online', 'coastal oceanography wave celerity online'],
    order: 599,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wave Period T (seconds) & Water Depth d (meters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wav-t">Wave Period T (s)</label>
          <input class="tool-textarea" id="wav-t" type="number" step="any" value="10.0" placeholder="10.0 s (Open Ocean Swell)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wav-d">Water Depth d (m)</label>
          <input class="tool-textarea" id="wav-d" type="number" step="any" value="20.0" placeholder="20.0 m (Coastal Shelf)" />
        </div>
      </div>
      <div id="wav-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wav-res-c" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">12.55 m / s (45.2 km/h)</span>
            <span class="stat-label">Wave Phase Speed / Celerity (c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wav-res-l" style="font-weight:700;">Wavelength L = 125.5 m (Transitional Depth: d/L = 0.159)</span>
            <span class="stat-label">Wave Length (L = c · T) & Depth Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('wav-t'), dEl = document.getElementById('wav-d');
  const cResEl = document.getElementById('wav-res-c'), lResEl = document.getElementById('wav-res-l');

  const g = 9.80665;

  function update() {
    const T = parseFloat(tEl.value), d = parseFloat(dEl.value);
    if (isNaN(T) || isNaN(d) || T <= 0 || d <= 0) return;

    const L0 = (g * Math.pow(T, 2)) / (2 * Math.PI);
    let L = L0;
    for (let i = 0; i < 25; i++) {
      L = L0 * Math.tanh((2 * Math.PI * d) / L);
    }

    const c = L / T;
    const dOverL = d / L;

    let regime = '';
    if (dOverL >= 0.5) regime = 'Deep Water (d ≥ L/2: c = 1.56·T)';
    else if (dOverL <= 0.05) regime = 'Shallow Water (d ≤ L/20: c = √(g·d) Tsunami Speed)';
    else regime = 'Transitional Intermediate Water (0.05 < d/L < 0.5)';

    cResEl.textContent = c.toFixed(2) + ' m / s (' + (c * 3.6).toFixed(1) + ' km/h, ' + (c * 1.94384).toFixed(1) + ' knots)';
    lResEl.textContent = 'Wavelength L = ' + L.toFixed(1) + ' m (L₀_deep = ' + L0.toFixed(1) + ' m | ' + regime + ')';
  }

  tEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter wave period T in seconds (e.g. 8 to 15 seconds for ocean swells).',
      'Enter local bathymetric water depth d in meters.',
      'Inspect iterative wave dispersion solution for wavelength L, celerity phase speed c in m/s, km/h, and knots, and water depth regime classification.'
    ],
    benefitTitle: 'George Biddell Airy 1841 Linear Wave Theory',
    benefitContent: 'As ocean swells approach shallow coastal waters, seafloor friction slows the wave celerity, causing wavelength to compress and wave height to steepen until breaking on the beach.',
    faqs: [{ q: 'What is the speed of a tsunami in the deep ocean (d = 4000m)?', a: 'In 4,000 meter deep ocean, long-period tsunamis travel as shallow-water waves at c = sqrt(gd) ≈ 198 m/s ≈ 713 km/h.' }]
  },

  // 17. Significant Wave Height & Energy Spectrum (H_m0) Calculator
  {
    slug: 'significant-wave-height-energy-spectrum-calculator',
    name: 'Significant Wave Height (H_m0 & H_1/3) & Sea State Calculator',
    description: 'Calculate ocean significant wave height (H_m0 = 4 · √m₀) in meters from spectral wave energy variance m₀ and determine World Meteorological Organization (WMO) Sea State code.',
    category: 'Science',
    icon: 'text',
    keywords: ['significant wave height calculator', 'hm0 4 sqrt m0 formula oceanography', 'h 1 3 significant wave height calculator online', 'wmo sea state code beaufort scale calculator', 'ocean spectral wave energy calculator'],
    order: 600,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Spectral Energy Variance m₀ (m²) or Zero-Moment Sensor Reading',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="swh-m0">Variance m₀ (m²)</label>
          <input class="tool-textarea" id="swh-m0" type="number" step="any" value="0.5625" placeholder="0.5625 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="swh-tp">Peak Period T_p (s)</label>
          <input class="tool-textarea" id="swh-tp" type="number" step="any" value="9.5" placeholder="9.5 s" />
        </div>
      </div>
      <div id="swh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="swh-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.00 m (9.84 ft)</span>
            <span class="stat-label">Significant Wave Height (H_m0 = 4·√m₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="swh-res-sea" style="color:var(--green-dark); font-weight:700;">WMO Sea State 5: Rough Seas (Max Wave H_max ≈ 5.6 m)</span>
            <span class="stat-label">WMO Sea State & Maximum Freak Wave Estimate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m0El = document.getElementById('swh-m0'), tpEl = document.getElementById('swh-tp');
  const hResEl = document.getElementById('swh-res-h'), sResEl = document.getElementById('swh-res-sea');

  function update() {
    const m0 = parseFloat(m0El.value), Tp = parseFloat(tpEl.value);
    if (isNaN(m0) || isNaN(Tp) || m0 <= 0 || Tp <= 0) return;

    const Hm0 = 4 * Math.sqrt(m0);
    const Hm0_ft = Hm0 * 3.28084;
    const Hmax = Hm0 * 1.86;

    let seaState = '';
    if (Hm0 < 0.1) seaState = 'WMO 0: Calm (Glassy)';
    else if (Hm0 < 0.5) seaState = 'WMO 1-2: Smooth to Slight';
    else if (Hm0 < 1.25) seaState = 'WMO 3: Moderate (0.5 - 1.25m)';
    else if (Hm0 < 2.5) seaState = 'WMO 4: Moderate to Rough (1.25 - 2.5m)';
    else if (Hm0 < 4.0) seaState = 'WMO 5: Rough Seas (2.5 - 4.0m)';
    else if (Hm0 < 6.0) seaState = 'WMO 6: Very Rough (4.0 - 6.0m)';
    else if (Hm0 < 9.0) seaState = 'WMO 7: High Seas (6.0 - 9.0m)';
    else if (Hm0 < 14.0) seaState = 'WMO 8: Very High (9.0 - 14.0m)';
    else seaState = 'WMO 9: Phenomenal (> 14m Monster Waves)';

    hResEl.textContent = Hm0.toFixed(2) + ' m (' + Hm0_ft.toFixed(1) + ' ft Significant H_m0)';
    sResEl.textContent = seaState + ' (Estimated Peak H_max ≈ ' + Hmax.toFixed(1) + ' m)';
  }

  m0El.addEventListener('input', update);
  tpEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter wave spectrum zero-moment variance m₀ in m² from oceanographic buoy data.',
      'Enter spectral peak wave period T_p in seconds.',
      'Inspect Significant Wave Height H_m0 = 4√m₀ in meters/feet, WMO Sea State scale code, and Rayleigh statistical maximum wave height H_max.'
    ],
    benefitTitle: 'Significant Wave Height H_1/3 vs Spectral H_m0',
    benefitContent: 'Historically defined as the average height of the tallest one-third of waves seen by an experienced mariner, spectral wave analysis mathematically formalizes significant wave height as H_m0 = 4√m₀.',
    faqs: [{ q: 'What is the relationship between H_m0 and maximum individual wave height?', a: 'In a standard storm duration of ~1,000 waves, the statistical maximum single wave height reaches approximately 1.86 × H_m0.' }]
  },

  // 18. Coastal Wave Shoaling & Refraction Calculator
  {
    slug: 'coastal-wave-shoaling-refraction-calculator',
    name: 'Coastal Wave Shoaling & Refraction Coefficient Calculator',
    description: 'Calculate coastal inshore wave height changes (H₂ = H₁ · K_s · K_r) from shoaling coefficient K_s and wave ray refraction angle convergence K_r.',
    category: 'Science',
    icon: 'text',
    keywords: ['wave shoaling calculator', 'coastal wave refraction formula ks kr', 'shoaling coefficient group velocity calculator', 'inshore wave height coastal engineering online', 'wave ray refraction snell law coastal calculator'],
    order: 601,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Deepwater Wave Height H₀ (m), Deep Depth d₁ (m) & Inshore Depth d₂ (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-h0">Deep Height H₀ (m)</label>
          <input class="tool-textarea" id="sh-h0" type="number" step="any" value="2.0" placeholder="2.0 m Deepwater" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-t">Wave Period T (s)</label>
          <input class="tool-textarea" id="sh-t" type="number" step="any" value="12.0" placeholder="12.0 s Period" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-d2">Inshore Depth d₂ (m)</label>
          <input class="tool-textarea" id="sh-d2" type="number" step="any" value="4.0" placeholder="4.0 m Nearshore" />
        </div>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-h2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.48 m Inshore Height</span>
            <span class="stat-label">Shoaled Inshore Wave Height (H₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-ks" style="font-weight:700;">Shoaling Coeff K_s = 1.24 (24% Height Amplification)</span>
            <span class="stat-label">Energy Conservation Shoaling Factor (K_s)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const h0El = document.getElementById('sh-h0'), tEl = document.getElementById('sh-t'), d2El = document.getElementById('sh-d2');
  const h2ResEl = document.getElementById('sh-res-h2'), ksResEl = document.getElementById('sh-res-ks');

  const g = 9.80665;

  function update() {
    const H0 = parseFloat(h0El.value), T = parseFloat(tEl.value), d2 = parseFloat(d2El.value);
    if (isNaN(H0) || isNaN(T) || isNaN(d2) || H0 <= 0 || T <= 0 || d2 <= 0) return;

    const Cg0 = 0.5 * ((g * T) / (2 * Math.PI));
    const L0 = (g * Math.pow(T, 2)) / (2 * Math.PI);
    let L2 = L0;
    for (let i = 0; i < 20; i++) {
      L2 = L0 * Math.tanh((2 * Math.PI * d2) / L2);
    }
    const c2 = L2 / T;
    const k2 = (2 * Math.PI) / L2;
    const n2 = 0.5 * (1 + ((2 * k2 * d2) / Math.sinh(2 * k2 * d2)));
    const Cg2 = n2 * c2;

    const Ks = Math.sqrt(Cg0 / Cg2);
    const H2 = H0 * Ks;
    const ampPct = (Ks - 1) * 100;

    h2ResEl.textContent = H2.toFixed(2) + ' m Inshore Height';
    ksResEl.textContent = 'K_s = ' + Ks.toFixed(2) + ' (' + (ampPct >= 0 ? '+' : '') + ampPct.toFixed(1) + '% Energy Compression, L₂ = ' + L2.toFixed(1) + ' m)';
  }

  [h0El, tEl, d2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter unrefracted deepwater significant wave height H₀ in meters.',
      'Enter wave period T in seconds.',
      'Enter target shallow inshore bathymetry depth d₂ in meters.',
      'Inspect wave shoaling energy amplification coefficient K_s and resulting nearshore wave height H₂.'
    ],
    benefitTitle: 'Wave Energy Flux Conservation',
    benefitContent: 'Because wave energy flux is conserved as waves enter shallow water, the dramatic drop in wave group velocity forces wave energy to compress into a taller, steeper wave crest until breaking occurs.',
    faqs: [{ q: 'What is the breaker depth index?', a: 'Waves break when wave height reaches approximately 78% of the local water depth (H_b ≈ 0.78 · d_b).' }]
  },

  // 19. Richardson Number (Gradient Ri) Ocean Stratification Calculator
  {
    slug: 'richardson-number-ocean-stratification-calculator',
    name: 'Richardson Number (Ri) Ocean Stratification & Shear Turbulence Calculator',
    description: 'Calculate gradient Richardson number (Ri = N² / (du / dz)²) from Brunt-Väisälä buoyancy frequency N and vertical current velocity shear to predict turbulent mixing (Ri below 0.25).',
    category: 'Science',
    icon: 'text',
    keywords: ['richardson number calculator', 'gradient ri formula n2 over du dz squared', 'ocean stratification turbulent mixing calculator', 'kelvin helmholtz instability richardson number online', 'oceanography shear flow stability calculator'],
    order: 602,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Brunt-Väisälä Frequency N (rad/s) & Velocity Shear du/dz (s⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ri-n">Buoyancy N (rad/s)</label>
          <input class="tool-textarea" id="ri-n" type="number" step="any" value="0.015" placeholder="0.015 rad/s (Pycnocline)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ri-shear">Current Shear du/dz (s⁻¹)</label>
          <input class="tool-textarea" id="ri-shear" type="number" step="any" value="0.040" placeholder="0.040 s⁻¹ Velocity Shear" />
        </div>
      </div>
      <div id="ri-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ri-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ri = 0.141</span>
            <span class="stat-label">Gradient Richardson Number (Ri)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ri-res-flow" style="color:var(--green-dark); font-weight:700;">UNSTABLE / TURBULENT MIXING (Ri < 0.25: Kelvin-Helmholtz Waves)</span>
            <span class="stat-label">Hydrodynamic Flow Stability State</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('ri-n'), sEl = document.getElementById('ri-shear');
  const vResEl = document.getElementById('ri-res-val'), fResEl = document.getElementById('ri-res-flow');

  function update() {
    const N = parseFloat(nEl.value), shear = parseFloat(sEl.value);
    if (isNaN(N) || isNaN(shear) || N <= 0 || shear <= 0) return;

    const Ri = Math.pow(N, 2) / Math.pow(shear, 2);
    vResEl.textContent = 'Ri = ' + Ri.toFixed(3);

    if (Ri < 0.25) {
      fResEl.textContent = 'DYNAMICALLY UNSTABLE (Ri < 0.25: Shear overcomes buoyancy, Kelvin-Helmholtz mixing)';
      fResEl.style.color = '#c53030';
    } else if (Ri < 1.0) {
      fResEl.textContent = 'MARGINALLY STABLE (0.25 ≤ Ri < 1.0: Intermittent shear wave breaking)';
      fResEl.style.color = '#d97706';
    } else {
      fResEl.textContent = 'STRONGLY STRATIFIED STABLE (Ri ≥ 1.0: Stable pycnocline, turbulent mixing suppressed)';
      fResEl.style.color = '#22543d';
    }
  }

  nEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter Brunt-Väisälä buoyancy frequency N in rad/s.',
      'Enter vertical current shear gradient du/dz in s⁻¹.',
      'Inspect gradient Richardson number Ri = N² / (du/dz)² and determine whether the ocean pycnocline experiences active turbulent mixing (Ri below 0.25).'
    ],
    benefitTitle: 'Lewis Fry Richardson 1920 Stability Criterion',
    benefitContent: 'Stratified shear flows are unconditionally stable against infinitesimal perturbations whenever the Richardson number exceeds 0.25; when Ri falls below 0.25, kinetic shear energy overcomes stabilizing gravity, triggering turbulent mixing.',
    faqs: [{ q: 'What is the critical Richardson number?', a: 'Ri_c = 0.25 is the universal theoretical threshold below which turbulent mixing occurs in both atmospheric and oceanic stratified flows.' }]
  },

  // 20. Ekman Spiral Layer Depth & Net Wind Drift Transport Calculator
  {
    slug: 'ekman-spiral-transport-depth-calculator',
    name: 'Ekman Spiral Layer Depth & Net Wind Drift Transport Calculator',
    description: 'Calculate wind-driven ocean surface Ekman layer depth (D_E = π · √(2 · A_z / |f|)) in meters and net mass transport volume deflected 90° by Coriolis force.',
    category: 'Science',
    icon: 'text',
    keywords: ['ekman spiral calculator', 'ekman layer depth formula de pi sqrt 2 az over f', 'ekman transport 90 degrees coriolis calculator', 'ocean surface current wind drift calculator online', 'coastal upwelling ekman transport online'],
    order: 603,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Latitude (° N / S), Vertical Eddy Viscosity A_z (m²/s) & Wind Stress τ (N/m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ek-lat">Latitude (°)</label>
          <input class="tool-textarea" id="ek-lat" type="number" step="any" value="35.0" placeholder="35.0° (California Upwelling)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ek-az">Eddy Viscosity A_z (m²/s)</label>
          <input class="tool-textarea" id="ek-az" type="number" step="any" value="0.05" placeholder="0.05 m²/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ek-tau">Wind Stress τ (N/m²)</label>
          <input class="tool-textarea" id="ek-tau" type="number" step="any" value="0.10" placeholder="0.10 N/m² (~10 m/s Wind)" />
        </div>
      </div>
      <div id="ek-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ek-res-de" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">108.6 m Depth</span>
            <span class="stat-label">Ekman Layer Boundary Depth (D_E)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ek-res-trans" style="font-weight:700;">Transport: 1,196 kg/m·s (Deflected 90° Right of Wind)</span>
            <span class="stat-label">Net Depth-Integrated Ekman Volume Transport (M_E)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const latEl = document.getElementById('ek-lat'), azEl = document.getElementById('ek-az'), tauEl = document.getElementById('ek-tau');
  const deResEl = document.getElementById('ek-res-de'), trResEl = document.getElementById('ek-res-trans');

  const omega = 7.2921159e-5;

  function update() {
    const lat = parseFloat(latEl.value), Az = parseFloat(azEl.value), tau = parseFloat(tauEl.value);
    if (isNaN(lat) || isNaN(Az) || isNaN(tau) || Math.abs(lat) === 0 || Math.abs(lat) > 90 || Az <= 0 || tau <= 0) return;

    const latRad = (lat * Math.PI) / 180;
    const f = 2 * omega * Math.sin(latRad);
    const absF = Math.abs(f);

    const DE = Math.PI * Math.sqrt((2 * Az) / absF);
    const ME = tau / absF;

    const deflectDir = lat > 0 ? '90° to the Right (Northern Hemisphere)' : '90° to the Left (Southern Hemisphere)';

    deResEl.textContent = DE.toFixed(1) + ' m Ekman Depth';
    trResEl.textContent = 'Net Transport: ' + Math.round(ME).toLocaleString() + ' kg/(m·s) (' + deflectDir + ')';
  }

  [latEl, azEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter ocean latitude in degrees (positive for Northern hemisphere, negative for Southern).',
      'Enter turbulent vertical eddy viscosity A_z in m²/s.',
      'Enter surface wind friction stress tau in N/m².',
      'Inspect depth of the Ekman layer D_E and net integrated volume transport deflected 90° to the right or left of prevailing winds.'
    ],
    benefitTitle: 'Vagn Walfrid Ekman 1905 Ocean Boundary Layer',
    benefitContent: 'Coriolis force deflects surface water 45° relative to wind; as momentum diffuses deeper into the ocean, current vectors rotate into a decaying spiral, causing net depth-integrated mass transport to flow exactly 90° perpendicular to the wind.',
    faqs: [{ q: 'How does Ekman transport cause coastal upwelling?', a: 'When equatorward winds blow along western continental coasts, Ekman transport drives surface water 90° offshore, pulling nutrient-rich cold deep water to the surface.' }]
  },

  // --- Suite FFFF: Aerodynamics & Flight Mechanics (725 - 730) ---
  // 21. Wing Induced Drag & Aspect Ratio Efficiency Calculator
  {
    slug: 'wing-induced-drag-aspect-ratio-calculator',
    name: 'Aircraft Wing Induced Drag (C_Di) & Aspect Ratio Calculator',
    description: 'Calculate aircraft wing vortex induced drag coefficient (C_Di = C_L² / (π · AR · e)) and induced drag force in Newtons/lbf from wing aspect ratio AR and Oswald efficiency factor e.',
    category: 'Science',
    icon: 'text',
    keywords: ['wing induced drag calculator', 'cdi cl squared over pi ar e formula', 'aspect ratio wing vortex drag calculator', 'oswald efficiency factor induced drag online', 'aerodynamic lift to drag aircraft calculator'],
    order: 604,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Lift Coefficient C_L, Wing Aspect Ratio (AR), Oswald Efficiency e & Dynamic Pressure q (Pa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="id-cl">Lift Coeff C_L</label>
          <input class="tool-textarea" id="id-cl" type="number" step="0.05" value="0.55" placeholder="0.55 Cruise Lift" />
        </div>
        <div class="control-group">
          <label class="control-label" for="id-ar">Aspect Ratio (AR)</label>
          <input class="tool-textarea" id="id-ar" type="number" step="any" value="8.5" placeholder="8.5 (b² / S)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="id-e">Oswald Factor (e)</label>
          <input class="tool-textarea" id="id-e" type="number" step="0.01" value="0.82" placeholder="0.82" />
        </div>
        <div class="control-group">
          <label class="control-label" for="id-s">Wing Area S (m²)</label>
          <input class="tool-textarea" id="id-s" type="number" step="any" value="122.0" placeholder="122.0 m² (A320 / B737)" />
        </div>
      </div>
      <div id="id-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="id-res-cdi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">C_Di = 0.0138 (138 Counts)</span>
            <span class="stat-label">Induced Drag Coefficient (C_Di)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="id-res-span" style="font-weight:700;">Wingspan b = 32.2 m (Lift-to-Induced-Drag Ratio: 39.8 : 1)</span>
            <span class="stat-label">Calculated Wingspan (b = √(AR · S))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const clEl = document.getElementById('id-cl'), arEl = document.getElementById('id-ar');
  const eEl = document.getElementById('id-e'), sEl = document.getElementById('id-s');
  const cdResEl = document.getElementById('id-res-cdi'), spResEl = document.getElementById('id-res-span');

  function update() {
    const CL = parseFloat(clEl.value), AR = parseFloat(arEl.value);
    const e = parseFloat(eEl.value), S = parseFloat(sEl.value);

    if (isNaN(CL) || isNaN(AR) || isNaN(e) || isNaN(S) || CL <= 0 || AR <= 0 || e <= 0 || S <= 0) return;

    const CDi = Math.pow(CL, 2) / (Math.PI * AR * e);
    const dragCounts = Math.round(CDi * 10000);
    const bSpan = Math.sqrt(AR * S);
    const ld_induced = CL / CDi;

    cdResEl.textContent = 'C_Di = ' + CDi.toFixed(4) + ' (' + dragCounts + ' Drag Counts)';
    spResEl.textContent = 'Span b = ' + bSpan.toFixed(1) + ' m (Lift/Induced-Drag: ' + ld_induced.toFixed(1) + ':1, e = ' + e.toFixed(2) + ')';
  }

  [clEl, arEl, eEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cruise lift coefficient C_L.',
      'Enter wing aspect ratio AR = b² / S.',
      'Enter Oswald span efficiency factor e (typically 0.75 to 0.85 for swept passenger jet wings).',
      'Enter total reference wing surface area S in m².',
      'Inspect induced vortex drag coefficient C_Di in drag counts and effective wingspan.'
    ],
    benefitTitle: 'Ludwig Prandtl 1918 Lifting-Line Wingtip Vortices',
    benefitContent: 'High-pressure air under the wing curls around wingtips toward lower pressure above, trailing spinning vortex tubes that deflect airflow downward; increasing aspect ratio stretches vortices apart, slashing induced drag.',
    faqs: [{ q: 'Why do gliders have extremely long, thin wings (AR > 25)?', a: 'Because induced drag scales inversely with aspect ratio, high-aspect wings achieve glide ratios exceeding 50:1.' }]
  },

  // 22. Airfoil Circulation (Kutta-Joukowski Theorem) Lift Calculator
  {
    slug: 'airfoil-circulation-kutta-joukowski-lift-calculator',
    name: 'Airfoil Circulation & Kutta-Joukowski Lift (L\' = ρ · V · Γ) Calculator',
    description: 'Calculate aerodynamic 2D airfoil sectional lift force per unit span (L\' = ρ_∞ · V_∞ · Γ) in N/m and Circulation Γ from free-stream air density and velocity.',
    category: 'Science',
    icon: 'text',
    keywords: ['kutta joukowski lift calculator', 'airfoil circulation gamma formula l prime rho v gamma', 'vortex lift per unit span calculator online', 'aerodynamics kutta condition circulation online', 'theoretical aerodynamics lift theorem calculator'],
    order: 605,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Air Density ρ (kg/m³), Velocity V (m/s) & Bound Vortex Circulation Γ (m²/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kj-rho">Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="kj-rho" type="number" step="any" value="1.225" placeholder="1.225 kg/m³ (Sea Level)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kj-v">Velocity V (m/s)</label>
          <input class="tool-textarea" id="kj-v" type="number" step="any" value="75.0" placeholder="75.0 m/s (270 km/h)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kj-gamma">Circulation Γ (m²/s)</label>
          <input class="tool-textarea" id="kj-gamma" type="number" step="any" value="25.0" placeholder="25.0 m²/s Bound Vortex" />
        </div>
      </div>
      <div id="kj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kj-res-lift" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2,296.9 N / m (157.4 lbf/ft)</span>
            <span class="stat-label">Sectional Lift Force per Unit Span (L\')</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kj-res-cl" style="font-weight:700;">Sectional Lift Coefficient C_l = 0.667 (Chord c = 1.0 m)</span>
            <span class="stat-label">Equivalent 2D Airfoil Lift Coefficient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('kj-rho'), vEl = document.getElementById('kj-v'), gEl = document.getElementById('kj-gamma');
  const lResEl = document.getElementById('kj-res-lift'), clResEl = document.getElementById('kj-res-cl');

  function update() {
    const rho = parseFloat(rEl.value), V = parseFloat(vEl.value), gamma = parseFloat(gEl.value);
    if (isNaN(rho) || isNaN(V) || isNaN(gamma) || rho <= 0 || V <= 0 || gamma <= 0) return;

    const Lprime = rho * V * gamma;
    const lbf_ft = Lprime * 0.068521766;
    const Cl = (2 * gamma) / (V * 1.0);

    lResEl.textContent = Lprime.toFixed(1) + ' N / m (' + lbf_ft.toFixed(1) + ' lbf/ft)';
    clResEl.textContent = 'C_l = ' + Cl.toFixed(3) + ' (for 1.0m Chord: Γ = ' + gamma.toFixed(1) + ' m²/s @ ' + V + ' m/s)';
  }

  [rEl, vEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter ambient free-stream air density ρ in kg/m³.',
      'Enter flight airspeed velocity V in m/s.',
      'Enter bound vortex circulation strength Γ in m²/s.',
      'Inspect 2D sectional lift generated per linear meter of wingspan.'
    ],
    benefitTitle: 'Martin Kutta & Nikolai Joukowski 1902 Theorem',
    benefitContent: 'The Kutta-Joukowski theorem is the foundation of fluid dynamics lift: any body moving through a fluid with bound circulation experiences a perpendicular aerodynamic lift force strictly proportional to L\' = ρ·V·Γ.',
    faqs: [{ q: 'What enforces circulation around an airfoil?', a: 'The Kutta condition requires flow to leave the sharp trailing edge smoothly without infinite velocity, fixing bound circulation to Γ = π·c·V·α.' }]
  },

  // 23. Prandtl-Glauert Compressibility Correction Factor Calculator
  {
    slug: 'prandtl-glauert-compressibility-correction-calculator',
    name: 'Prandtl-Glauert Compressibility Correction Factor Calculator',
    description: 'Calculate subsonic aerodynamic pressure coefficient (C_p = C_p0 / √(1 - M²)) and lift coefficient amplification from high subsonic Mach numbers (subsonic Mach below 0.8).',
    category: 'Science',
    icon: 'text',
    keywords: ['prandtl glauert compressibility calculator', 'cp cp0 over sqrt 1 minus m squared formula', 'subsonic mach number lift amplification calculator', 'high speed compressibility correction online', 'aerodynamics prandtl glauert rule calculator'],
    order: 606,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Free-Stream Flight Mach Number M_∞ (0.1 to 0.8) & Incompressible C_L0',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pg-m">Flight Mach M_∞</label>
          <input class="tool-textarea" id="pg-m" type="number" step="0.05" min="0.05" max="0.82" value="0.75" placeholder="0.75 Mach" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pg-cl0">Incompressible C_L0</label>
          <input class="tool-textarea" id="pg-cl0" type="number" step="0.05" value="0.45" placeholder="0.45 (Low Speed Lift)" />
        </div>
      </div>
      <div id="pg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pg-res-pg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.512× Correction (PG)</span>
            <span class="stat-label">Prandtl-Glauert Scaling Factor (1 / √(1 - M²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pg-res-cl" style="color:var(--green-dark); font-weight:700;">Compressible C_L = 0.680 (+51.2% High-Speed Lift Boost)</span>
            <span class="stat-label">Compressible High-Speed Lift Coefficient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('pg-m'), cl0El = document.getElementById('pg-cl0');
  const pgResEl = document.getElementById('pg-res-pg'), clResEl = document.getElementById('pg-res-cl');

  function update() {
    const M = parseFloat(mEl.value), CL0 = parseFloat(cl0El.value);
    if (isNaN(M) || isNaN(CL0) || M <= 0 || M >= 0.88 || CL0 <= 0) return;

    const beta = Math.sqrt(1 - Math.pow(M, 2));
    const pgFactor = 1 / beta;
    const CL_comp = CL0 * pgFactor;
    const boostPct = (pgFactor - 1) * 100;

    pgResEl.textContent = pgFactor.toFixed(3) + '× Prandtl-Glauert Factor';
    clResEl.textContent = 'C_L = ' + CL_comp.toFixed(3) + ' (+' + boostPct.toFixed(1) + '% High-Speed Lift Boost @ Mach ' + M.toFixed(2) + ')';
  }

  mEl.addEventListener('input', update);
  cl0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter flight Mach number between 0.1 and 0.8.',
      'Enter incompressible low-speed lift or pressure coefficient C_L0.',
      'Inspect Prandtl-Glauert scaling multiplier and compressibility-corrected high-speed aerodynamic lift coefficient.'
    ],
    benefitTitle: 'Ludwig Prandtl & Hermann Glauert 1928 Compressibility Rule',
    benefitContent: 'As aircraft approach the speed of sound, air density no longer remains constant; air compresses ahead of the airfoil, steepening pressure gradients and amplifying lift and pitching moments.',
    faqs: [{ q: 'Why does the Prandtl-Glauert rule fail near Mach 1?', a: 'As M approaches 1, the formula approaches infinity; transonic shock waves form, requiring non-linear transonic formulations.' }]
  },

  // 24. Supersonic Oblique Shock Wave (θ-β-Mach) Calculator
  {
    slug: 'supersonic-oblique-shock-theta-beta-mach-calculator',
    name: 'Supersonic Oblique Shock Wave (θ-β-Mach) Angle Calculator',
    description: 'Calculate supersonic oblique shock wave angle β (tan θ = 2 · cot β · (M₁² · sin² β - 1) / [M₁²(γ + cos 2β) + 2]), downstream Mach number M₂, and static pressure ratio p₂/p₁.',
    category: 'Science',
    icon: 'text',
    keywords: ['oblique shock wave calculator', 'theta beta mach relation supersonic formula', 'shock angle beta calculator online', 'downstream mach m2 oblique shock calculator', 'supersonic aerodynamics oblique shock online'],
    order: 607,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Upstream Mach Number M₁ (above 1.0) & Flow Deflection Wedge Angle θ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="obs-m1">Upstream Mach M₁</label>
          <input class="tool-textarea" id="obs-m1" type="number" step="0.1" value="2.50" placeholder="2.50 Mach" />
        </div>
        <div class="control-group">
          <label class="control-label" for="obs-th">Wedge Deflection θ (°)</label>
          <input class="tool-textarea" id="obs-th" type="number" step="1" value="15.0" placeholder="15.0° Wedge" />
        </div>
      </div>
      <div id="obs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="obs-res-beta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">β = 36.9° (Weak Shock)</span>
            <span class="stat-label">Oblique Shock Wave Angle (β)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="obs-res-m2" style="font-weight:700;">M₂ = 1.87 Supersonic | Pressure Ratio p₂/p₁ = 2.47</span>
            <span class="stat-label">Downstream Mach M₂ & Static Pressure Jump</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('obs-m1'), thEl = document.getElementById('obs-th');
  const bResEl = document.getElementById('obs-res-beta'), m2ResEl = document.getElementById('obs-res-m2');

  const gamma = 1.40;

  function update() {
    const M1 = parseFloat(m1El.value), thetaDeg = parseFloat(thEl.value);
    if (isNaN(M1) || isNaN(thetaDeg) || M1 <= 1.0 || thetaDeg <= 0) return;

    const thetaRad = (thetaDeg * Math.PI) / 180;
    const muMachAngle = Math.asin(1 / M1);

    let betaRad = 0;
    let found = false;

    for (let b = muMachAngle + 0.001; b < Math.PI / 2; b += 0.0005) {
      const num = 2 * (1 / Math.tan(b)) * (Math.pow(M1, 2) * Math.pow(Math.sin(b), 2) - 1);
      const den = (Math.pow(M1, 2) * (gamma + Math.cos(2 * b))) + 2;
      const tanThetaCalc = num / den;

      if (tanThetaCalc >= Math.tan(thetaRad)) {
        betaRad = b;
        found = true;
        break;
      }
    }

    if (!found) {
      bResEl.textContent = 'Detached Bow Shock Wave';
      m2ResEl.textContent = 'Wedge angle θ exceeds maximum attachment angle θ_max for Mach ' + M1.toFixed(2);
      return;
    }

    const betaDeg = (betaRad * 180) / Math.PI;
    const Mn1 = M1 * Math.sin(betaRad);
    const p2_p1 = 1 + (((2 * gamma) / (gamma + 1)) * (Math.pow(Mn1, 2) - 1));

    const Mn2_sq = (Math.pow(Mn1, 2) + (2 / (gamma - 1))) / (((2 * gamma / (gamma - 1)) * Math.pow(Mn1, 2)) - 1);
    const Mn2 = Math.sqrt(Math.max(0.01, Mn2_sq));
    const M2 = Mn2 / Math.sin(betaRad - thetaRad);

    bResEl.textContent = 'β = ' + betaDeg.toFixed(1) + '° (Weak Attached Shock)';
    m2ResEl.textContent = 'M₂ = ' + M2.toFixed(2) + ' (' + (M2 >= 1 ? 'Supersonic' : 'Subsonic') + ') | Pressure Jump p₂/p₁ = ' + p2_p1.toFixed(2) + '×';
  }

  m1El.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter upstream supersonic flight Mach number M₁ (M₁ > 1.0).',
      'Enter physical ramp / wedge flow deflection angle θ in degrees.',
      'Inspect oblique shock wave angle β, downstream post-shock Mach number M₂, and static pressure jump ratio p₂/p₁.'
    ],
    benefitTitle: 'The Classical θ-β-Mach Supersonic Equation',
    benefitContent: 'When supersonic flow encounters a wedge, a planar oblique shock forms at angle β, abruptly slowing the normal flow component while compressing and heating the gas.',
    faqs: [{ q: 'What happens if wedge angle θ exceeds θ_max?', a: 'The shock wave detaches from the wedge tip and curves into a detached subsonic bow shock wave ahead of the vehicle.' }]
  },

  // 25. Aircraft Stall Speed & Wing Loading Calculator
  {
    slug: 'aircraft-stall-speed-wing-loading-calculator',
    name: 'Aircraft Stall Speed & Wing Loading (W/S) Calculator',
    description: 'Calculate calibrated aircraft stall speed (V_stall = √(2 · W / (ρ · S · C_L(max)))) in knots, km/h, and mph from gross aircraft weight, wing area, and maximum lift coefficient.',
    category: 'Science',
    icon: 'text',
    keywords: ['aircraft stall speed calculator', 'v stall formula sqrt 2 w over rho s clmax', 'wing loading w over s calculator online', 'clean vs flap landing stall speed calculator', 'aviation flight mechanics stall speed online'],
    order: 608,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gross Aircraft Weight W (kg or lbs), Wing Area S (m²) & Max Lift Coeff C_L(max)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="stl-w">Gross Weight W (kg)</label>
          <input class="tool-textarea" id="stl-w" type="number" step="any" value="1150" placeholder="1150 kg (Cessna 172)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="stl-s">Wing Area S (m²)</label>
          <input class="tool-textarea" id="stl-s" type="number" step="any" value="16.2" placeholder="16.2 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="stl-cl">Max Lift C_L(max)</label>
          <input class="tool-textarea" id="stl-cl" type="number" step="0.05" value="1.60" placeholder="1.60 (Full Flaps Landing)" />
        </div>
      </div>
      <div id="stl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="stl-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">48.2 Knots (89.3 km/h)</span>
            <span class="stat-label">Calibrated Stall Speed (V_stall)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="stl-res-load" style="font-weight:700;">Wing Loading: 71.0 kg/m² (14.5 lb/ft²)</span>
            <span class="stat-label">Wing Area Wing Loading (W / S)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('stl-w'), sEl = document.getElementById('stl-s'), clEl = document.getElementById('stl-cl');
  const vResEl = document.getElementById('stl-res-v'), ldResEl = document.getElementById('stl-res-load');

  const g = 9.80665;
  const rho_sl = 1.225;

  function update() {
    const W_kg = parseFloat(wEl.value), S = parseFloat(sEl.value), CLmax = parseFloat(clEl.value);
    if (isNaN(W_kg) || isNaN(S) || isNaN(CLmax) || W_kg <= 0 || S <= 0 || CLmax <= 0) return;

    const W_N = W_kg * g;
    const vMs = Math.sqrt((2 * W_N) / (rho_sl * S * CLmax));
    const vKts = vMs * 1.94384;
    const vKmh = vMs * 3.6;
    const vMph = vMs * 2.23694;

    const wingLoadingKg_m2 = W_kg / S;
    const wingLoadingLb_ft2 = wingLoadingKg_m2 * 0.204816;

    vResEl.textContent = vKts.toFixed(1) + ' Knots (' + vKmh.toFixed(1) + ' km/h / ' + vMph.toFixed(1) + ' mph)';
    ldResEl.textContent = 'Wing Loading: ' + wingLoadingKg_m2.toFixed(1) + ' kg/m² (' + wingLoadingLb_ft2.toFixed(1) + ' lb/ft², C_L(max) = ' + CLmax.toFixed(2) + ')';
  }

  [wEl, sEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total gross aircraft weight W in kilograms (or converted lbs).',
      'Enter total wing planform reference area S in m².',
      'Enter maximum aerodynamic lift coefficient C_L(max) (1.2 to 1.5 clean wing, 1.6 to 2.4 with trailing edge flaps deployed).',
      'Inspect calibrated level-flight stall speed V_stall in Knots, km/h, and mph, and wing loading.'
    ],
    benefitTitle: 'The Lift Equation Boundary Limit',
    benefitContent: 'Stall occurs when angle of attack exceeds critical boundary layer separation angles; deploying high-lift Fowler flaps increases C_L(max) to dramatically lower touchdown landing speeds.',
    faqs: [{ q: 'How does aircraft bank angle affect stall speed in a turn?', a: 'In a banked turn with load factor n, stall speed increases by sqrt(n); in a steep 60 degree bank turn (n=2g), stall speed increases by 41.4%.' }]
  },

  // 26. Aircraft Best Glide Ratio & Maximum Range Gliding Calculator
  {
    slug: 'glide-ratio-lift-to-drag-range-calculator',
    name: 'Aircraft Best Glide Ratio (L/D) & Maximum Range Gliding Calculator',
    description: 'Calculate unpowered engine-out aircraft glide distance range (Range = Altitude · (L / D)_max) in nautical miles and kilometers from lift-to-drag ratio.',
    category: 'Science',
    icon: 'text',
    keywords: ['glide ratio calculator', 'best glide speed l over d max range formula', 'engine out glide distance calculator online', 'aircraft glide ratio nautical miles calculator', 'emergency unpowered gliding distance calculator'],
    order: 609,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Current Altitude AGL (ft or meters) & Best Glide Lift-to-Drag Ratio (L/D)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gl-alt">Altitude AGL (ft)</label>
          <input class="tool-textarea" id="gl-alt" type="number" step="any" value="8500" placeholder="8500 ft AGL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gl-ld">Glide Ratio (L / D)</label>
          <input class="tool-textarea" id="gl-ld" type="number" step="0.5" value="15.0" placeholder="15.0 (Boeing 737 / GA Plane)" />
        </div>
      </div>
      <div id="gl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gl-res-range" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">21.0 Nautical Miles</span>
            <span class="stat-label">Maximum Unpowered Glide Distance</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gl-res-metric" style="font-weight:700;">38.9 km (24.1 Statute Miles) | Descent Angle: 3.81°</span>
            <span class="stat-label">Ground Glide Range & Descent Glide Path Slope</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('gl-alt'), ldEl = document.getElementById('gl-ld');
  const rResEl = document.getElementById('gl-res-range'), mResEl = document.getElementById('gl-res-metric');

  function update() {
    const altFt = parseFloat(aEl.value), LD = parseFloat(ldEl.value);
    if (isNaN(altFt) || isNaN(LD) || altFt <= 0 || LD <= 0) return;

    const distFt = altFt * LD;
    const distNm = distFt / 6076.12;
    const distStatuteMiles = distFt / 5280;
    const distKm = (distFt * 0.3048) / 1000;
    const slopeDeg = (Math.atan(1 / LD) * 180) / Math.PI;

    rResEl.textContent = distNm.toFixed(1) + ' Nautical Miles (Glide Range)';
    mResEl.textContent = distKm.toFixed(1) + ' km (' + distStatuteMiles.toFixed(1) + ' Statute Miles) | Glide Angle: ' + slopeDeg.toFixed(2) + '° (L/D ' + LD.toFixed(1) + ':1)';
  }

  aEl.addEventListener('input', update);
  ldEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter current above-ground-level (AGL) altitude in feet.',
      'Enter aircraft best glide lift-to-drag ratio (L/D)_max (e.g. 9:1 for Cessna 172, 17:1 for Boeing 777, 40-50:1 for gliders).',
      'Inspect unpowered maximum glide footprint reach in Nautical Miles (NM), statute miles, kilometers, and descent glide angle.'
    ],
    benefitTitle: 'The Gimli Glider & Miracle on the Hudson Aerodynamic Proof',
    benefitContent: 'Without engine thrust, gravity acts as the propulsive engine component along the flight path slope; gliding range depends exclusively on aerodynamic (L/D)_max, completely independent of aircraft gross weight.',
    faqs: [{ q: 'Does aircraft weight affect maximum glide distance?', a: 'No! Heavier aircraft fly faster at their best glide speed (V_g), but travel the exact same horizontal distance as lighter aircraft with the same L/D.' }]
  }
];

pack18Tools.forEach(createTool);
console.log('Pack 18 complete: 26 tools created.');
