const { createTool } = require('./generate-curated-tools.cjs');

// Pack 48: 25 Civil & Environmental Engineering, Waste Water Treatment, Hydrology & Air Quality Calculators (Tools 1451 to 1475)
const pack48Tools = [
  // 1. Gaussian Plume Air Pollution Dispersion Model Calculator
  {
    slug: 'gaussian-plume-atmospheric-air-pollution-dispersion-calculator',
    name: 'Gaussian Plume Atmospheric Air Pollution Dispersion Model Calculator',
    description: 'Calculate ground-level industrial smokestack air pollutant concentration C in μg/m³ (Gaussian Plume Equation) from emission source rate Q, wind speed u, effective stack height H, and Pasquill-Gifford dispersion coefficients (σ_y, σ_z).',
    category: 'Science',
    icon: 'text',
    keywords: ['gaussian plume calculator', 'air pollution dispersion formula online', 'smokestack emission ground level concentration calculator', 'pasquill gifford atmospheric dispersion calculator', 'environmental engineering air quality meteorology online'],
    order: 1335,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Emission Rate Q (g/s), Wind Speed u (m/s), Effective Height H (m) & Downwind Distance x (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gp-q">Emission Q (g/s)</label>
          <input class="tool-textarea" id="gp-q" type="number" step="10" value="100.0" placeholder="100.0 g/s SO₂" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gp-u">Wind Speed u (m/s)</label>
          <input class="tool-textarea" id="gp-u" type="number" step="0.5" value="4.0" placeholder="4.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gp-h">Stack Height H (m)</label>
          <input class="tool-textarea" id="gp-h" type="number" step="10" value="80.0" placeholder="80.0 m (Effective)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gp-x">Distance x (km)</label>
          <input class="tool-textarea" id="gp-x" type="number" step="0.5" value="2.0" placeholder="2.0 km Downwind" />
        </div>
      </div>
      <div id="gp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gp-res-c" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ground Conc C = 112.4 μg / m³ (0.112 mg/m³)</span>
            <span class="stat-label">Centerline Ground-Level Air Pollutant Concentration (z = 0, y = 0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gp-res-sig" style="color:var(--green-dark); font-weight:700;">Dispersion: σ_y = 156.4 m | σ_z = 89.2 m (Class C Slightly Unstable Atmosphere)</span>
            <span class="stat-label">Pasquill-Gifford Lateral & Vertical Gaussian Standard Deviations</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('gp-q'), uEl = document.getElementById('gp-u');
  const hEl = document.getElementById('gp-h'), xEl = document.getElementById('gp-x');
  const cResEl = document.getElementById('gp-res-c'), sgResEl = document.getElementById('gp-res-sig');

  function update() {
    const Q = parseFloat(qEl.value), u = parseFloat(uEl.value);
    const H = parseFloat(hEl.value), x_km = parseFloat(xEl.value);

    if (isNaN(Q) || isNaN(u) || isNaN(H) || isNaN(x_km) || Q <= 0 || u <= 0 || H < 0 || x_km <= 0) return;

    // Pasquill-Gifford dispersion parameters (Class C Neutral/Slightly Unstable approximation):
    // sigma_y approx 104 * x^0.89 [m], sigma_z approx 61 * x^0.91 [m]
    const sigma_y = 104.0 * Math.pow(x_km, 0.89);
    const sigma_z = 61.0 * Math.pow(x_km, 0.91);

    // Gaussian Plume Ground-Level Centerline Concentration (y = 0, z = 0 with ground reflection factor of 2):
    // C(x, 0, 0) = ( Q / (pi * u * sigma_y * sigma_z) ) * exp( - H^2 / (2 * sigma_z^2) )  [g/m^3 -> ug/m^3]
    const exp_term = Math.exp(-Math.pow(H, 2) / (2.0 * Math.pow(sigma_z, 2)));
    const C_g_m3 = (Q / (Math.PI * u * sigma_y * sigma_z)) * exp_term;
    const C_ug_m3 = C_g_m3 * 1e6;

    cResEl.textContent = 'Ground Conc C = ' + C_ug_m3.toFixed(1) + ' μg / m³ (' + (C_ug_m3/1000).toFixed(3) + ' mg/m³)';
    sgResEl.textContent = 'Dispersion: σ_y = ' + sigma_y.toFixed(1) + ' m, σ_z = ' + sigma_z.toFixed(1) + ' m (H=' + H + ' m @ x=' + x_km + ' km downwind, u=' + u + ' m/s)';
  }

  [qEl, uEl, hEl, xEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter continuous smokestack emission mass flow rate Q in g/s (e.g. $\text{SO}_2, \text{NO}_x$).',
      'Enter mean ambient wind speed u in m/s at stack top height.',
      'Enter effective plume release height H in meters (physical stack height + buoyant plume rise).',
      'Enter receptor downwind distance x in kilometers.',
      'Inspect ground-level ambient pollutant concentration in $\mu\text{g/m}^3$ and Pasquill dispersion spreads.'
    ],
    benefitTitle: 'EPA Industrial Source Complex (ISC3 / AERMOD) Standard',
    benefitContent: 'Universal atmospheric dispersion modeling equation governing Clean Air Act Title V industrial environmental compliance permits and smokestack height regulations.',
    faqs: [{ q: 'What causes maximum ground-level concentration to occur some distance downwind?', a: 'Directly at the base of the stack, the elevated plume ($H$) hasn\'t diffused down yet; concentration peaks at $x_{\max} \approx H / \sqrt{2}$ before wind dilution reduces it.' }]
  },

  // 2. Streeter-Phelps Dissolved Oxygen (DO) Sag Curve Calculator
  {
    slug: 'streeter-phelps-dissolved-oxygen-sag-curve-calculator',
    name: 'Streeter-Phelps Dissolved Oxygen (DO) Sag Curve & Critical Deficit Calculator',
    description: 'Calculate river river water quality Dissolved Oxygen deficit D(t) (Streeter-Phelps equation), critical time to oxygen sag minimum t_c, and critical lowest dissolved oxygen concentration DO_min from wastewater BOD discharge.',
    category: 'Science',
    icon: 'text',
    keywords: ['streeter phelps calculator', 'dissolved oxygen sag curve formula online', 'critical oxygen deficit time tc calculator', 'river water quality bod reaeration rate calculator', 'environmental engineering hydrology water resources online'],
    order: 1336,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Deoxygenation Rate k_d (day⁻¹), Reaeration Rate k_r (day⁻¹), Initial BOD L₀ (mg/L) & Initial Deficit D₀ (mg/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-kd">Deox k_d (day⁻¹)</label>
          <input class="tool-textarea" id="sp-kd" type="number" step="0.05" value="0.25" placeholder="0.25 day⁻¹ (BOD Decay)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-kr">Reaeration k_r (day⁻¹)</label>
          <input class="tool-textarea" id="sp-kr" type="number" step="0.1" value="0.50" placeholder="0.50 day⁻¹ (Surface O₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-l0">Initial BOD L₀ (mg/L)</label>
          <input class="tool-textarea" id="sp-l0" type="number" step="5" value="25.0" placeholder="25.0 mg/L (Mixed Stream)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-d0">Initial Deficit D₀</label>
          <input class="tool-textarea" id="sp-d0" type="number" step="0.5" value="1.5" placeholder="1.5 mg/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-dosat">DO Saturated (mg/L)</label>
          <input class="tool-textarea" id="sp-dosat" type="number" step="0.5" value="9.2" placeholder="9.2 mg/L @ 20°C" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-min" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Minimum DO = 4.14 mg/L (Critical Sag Point)</span>
            <span class="stat-label">Lowest River Dissolved Oxygen Concentration (DO_sat - D_c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-tc" style="color:var(--green-dark); font-weight:700;">Critical Time t_c = 2.45 Days (Max Deficit D_c = 5.06 mg/L) | Self-Purification Ratio f = 2.00</span>
            <span class="stat-label">Time to Reach Sag Minimum & Fair\'s Self-Purification Constant (f = k_r / k_d)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kdEl = document.getElementById('sp-kd'), krEl = document.getElementById('sp-kr');
  const l0El = document.getElementById('sp-l0'), d0El = document.getElementById('sp-d0'), satEl = document.getElementById('sp-dosat');
  const minResEl = document.getElementById('sp-res-min'), tcResEl = document.getElementById('sp-res-tc');

  function update() {
    const k_d = parseFloat(kdEl.value), k_r = parseFloat(krEl.value);
    const L_0 = parseFloat(l0El.value), D_0 = parseFloat(d0El.value), DO_sat = parseFloat(satEl.value);

    if (isNaN(k_d) || isNaN(k_r) || isNaN(L_0) || isNaN(D_0) || isNaN(DO_sat) || k_d <= 0 || k_r <= 0 || k_d === k_r || L_0 <= 0 || D_0 < 0 || DO_sat <= 0) return;

    // Self-purification constant f = k_r / k_d
    const f = k_r / k_d;

    // Critical time t_c:
    // t_c = ( 1 / (k_r - k_d) ) * ln( (k_r / k_d) * [ 1 - (D_0 * (k_r - k_d) / (k_d * L_0)) ] )
    const bracket = 1.0 - ( (D_0 * (k_r - k_d)) / (k_d * L_0) );
    if (bracket <= 0) return;

    const t_c = (1.0 / (k_r - k_d)) * Math.log(f * bracket);

    // Critical oxygen deficit D_c = (k_d / k_r) * L_0 * exp(-k_d * t_c)
    // Streeter-Phelps equation: D(t) = ( (k_d * L_0) / (k_r - k_d) ) * ( exp(-k_d*t) - exp(-k_r*t) ) + D_0 * exp(-k_r*t)
    const D_c = ((k_d * L_0) / (k_r - k_d)) * (Math.exp(-k_d * t_c) - Math.exp(-k_r * t_c)) + (D_0 * Math.exp(-k_r * t_c));

    const DO_min = Math.max(0.0, DO_sat - D_c);

    let qual = '', color = '#22543d';
    if (DO_min >= 5.0) { qual = 'HEALTHY AQUATIC LIFE (DO ≥ 5.0 mg/L ✓)'; color = '#22543d'; }
    else if (DO_min >= 2.0) { qual = 'STRESSED FISHERY (2.0 ≤ DO < 5.0 mg/L: Sensitive fish die-off risk)'; color = '#ea580c'; }
    else { qual = 'SEPTIC / ANOXIC CONDITIONS (DO < 2.0 mg/L: Severe fish kills ✗)'; color = '#c53030'; }

    minResEl.textContent = 'Minimum DO = ' + DO_min.toFixed(2) + ' mg/L (' + qual.split(' (')[0] + ')';
    minResEl.style.color = color;
    tcResEl.textContent = 'Critical Sag t_c = ' + t_c.toFixed(2) + ' Days (Max Deficit D_c = ' + D_c.toFixed(2) + ' mg/L | Self-Purification f = ' + f.toFixed(2) + ')';
  }

  [kdEl, krEl, l0El, d0El, satEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter wastewater bacterial deoxygenation kinetic rate $k_d$ in $\text{day}^{-1}$ (base e).',
      'Enter stream reaeration atmospheric exchange rate $k_r$ in $\text{day}^{-1}$.',
      'Enter initial river ultimate BOD $L_0$ after initial wastewater mixing in mg/L.',
      'Enter initial dissolved oxygen deficit $D_0 = \text{DO}_{\text{sat}} - \text{DO}_0$ in mg/L.',
      'Inspect critical time to lowest oxygen sag ($t_c$) and minimum stream Dissolved Oxygen concentration $\text{DO}_{\min}$.'
    ],
    benefitTitle: 'Harold W. Streeter & Earle B. Phelps 1925 Ohio River DO Model',
    benefitContent: 'Balances biological bacterial oxygen consumption against surface atmospheric oxygen reaeration, determining maximum allowable municipal sewage discharge limits to preserve freshwater aquatic fish ecosystems.',
    faqs: [{ q: 'What is the regulatory minimum Dissolved Oxygen threshold for warm water fish?', a: 'EPA water quality criteria generally mandate a minimum dissolved oxygen concentration of at least $5.0\text{ mg/L}$.' }]
  },

  // 3. Activated Sludge Solids Retention Time (SRT) Calculator
  {
    slug: 'activated-sludge-solids-retention-time-srt-sludge-age-calculator',
    name: 'Activated Sludge Solids Retention Time (SRT θ_c) & F/M Ratio Calculator',
    description: 'Calculate wastewater treatment plant activated sludge mean cell residence time / Solids Retention Time (SRT / Sludge Age θ_c in days: θ_c = V·X / (Q_w·X_w + Q_e·X_e)), Food-to-Microorganism F/M ratio, and daily waste sludge mass.',
    category: 'Science',
    icon: 'text',
    keywords: ['activated sludge srt calculator', 'solids retention time sludge age formula theta c online', 'food to microorganism fm ratio mlss calculator', 'wastewater treatment aeration tank sizing calculator', 'environmental engineering wastewater civil engineering online'],
    order: 1337,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Aeration Tank Vol V (m³), MLSS Biomass X (mg/L), Daily Waste Q_w (m³/day) & Waste RAS X_w (mg/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="as-v">Tank Volume V (m³)</label>
          <input class="tool-textarea" id="as-v" type="number" step="500" value="4000.0" placeholder="4000.0 m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-x">Aeration MLSS X</label>
          <input class="tool-textarea" id="as-x" type="number" step="250" value="3000.0" placeholder="3000.0 mg/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-qw">Waste Q_w (m³/day)</label>
          <input class="tool-textarea" id="as-qw" type="number" step="20" value="120.0" placeholder="120.0 m³/day WAS" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-xw">Waste RAS X_w</label>
          <input class="tool-textarea" id="as-xw" type="number" step="500" value="8000.0" placeholder="8000.0 mg/L WAS" />
        </div>
      </div>
      <div id="as-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="as-res-srt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Sludge Age (SRT) θ_c = 12.50 Days</span>
            <span class="stat-label">Solids Retention Time (θ_c = Total Biomass / Daily Mass Wasted)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="as-res-mass" style="color:var(--green-dark); font-weight:700;">Inventory = 12,000 kg MLSS | Daily WAS Waste = 960 kg / day (Nitrification Capable ✓)</span>
            <span class="stat-label">Total Biological Inventory & Waste Activated Sludge (WAS) Mass</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('as-v'), xEl = document.getElementById('as-x');
  const qwEl = document.getElementById('as-qw'), xwEl = document.getElementById('as-xw');
  const srtResEl = document.getElementById('as-res-srt'), msResEl = document.getElementById('as-res-mass');

  function update() {
    const V = parseFloat(vEl.value), X = parseFloat(xEl.value);
    const Q_w = parseFloat(qwEl.value), X_w = parseFloat(xwEl.value);

    if (isNaN(V) || isNaN(X) || isNaN(Q_w) || isNaN(X_w) || V <= 0 || X <= 0 || Q_w <= 0 || X_w <= 0) return;

    // Total biomass inventory in aeration basin: Mass = V * X * 1e-3 [kg]
    const total_biomass_kg = (V * X) / 1000.0;

    // Daily waste biomass mass: Waste_kg_day = Q_w * X_w * 1e-3 [kg / day]
    const daily_waste_kg = (Q_w * X_w) / 1000.0;

    // Solids Retention Time: theta_c = ( V * X ) / ( Q_w * X_w )  [days]
    const theta_c = (V * X) / (Q_w * X_w);

    let status = '', color = '#22543d';
    if (theta_c >= 10.0) {
      status = 'COMPLETE NITRIFICATION (SRT ≥ 10 Days: Autotrophic nitrifiers flourish ✓)';
      color = '#22543d';
    } else if (theta_c >= 4.0) {
      status = 'CONVENTIONAL CARBONACEOUS BOD REMOVAL (4 - 8 Days)';
      color = '#22543d';
    } else {
      status = 'HIGH-RATE SHORT SRT (Sludge washout risk, poor settling)';
      color = '#ea580c';
    }

    srtResEl.textContent = 'Sludge Age (SRT) θ_c = ' + theta_c.toFixed(2) + ' Days';
    srtResEl.style.color = color;
    msResEl.textContent = 'Inventory = ' + Math.round(total_biomass_kg).toLocaleString() + ' kg MLSS | WAS Waste = ' + Math.round(daily_waste_kg).toLocaleString() + ' kg/day (' + status.split(' (')[0] + ')';
  }

  [vEl, xEl, qwEl, xwEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter aeration basin reactor volume V in $\text{m}^3$.',
      'Enter Mixed Liquor Suspended Solids (MLSS) concentration X in mg/L.',
      'Enter daily Waste Activated Sludge (WAS) volumetric pumping rate $Q_w$ in $\text{m}^3/\text{day}$.',
      'Enter WAS concentrated biomass solids concentration $X_w$ in mg/L.',
      'Inspect Solids Retention Time (Sludge Age $\theta_c$) and evaluate biological nitrification capacity.'
    ],
    benefitTitle: 'Biological Wastewater Treatment Primary Control Parameter',
    benefitContent: 'SRT ($\theta_c$) controls microbial population ecology: slow-growing nitrifying bacteria (Nitrosomonas / Nitrobacter) require $\theta_c \ge 10\text{ days}$ at $20^\circ\text{C}$ to prevent ammonia washout.',
    faqs: [{ q: 'What is the typical SRT for an Extended Aeration plant?', a: 'Extended aeration oxidation ditches operate at long SRTs of $20\text{ to }30\text{ days}$, producing fully aerobically digested sludge.' }]
  },

  // 4. Wastewater Biochemical Oxygen Demand (BOD) Kinetics Calculator
  {
    slug: 'wastewater-bod-ultimate-biochemical-oxygen-demand-calculator',
    name: 'Wastewater Biochemical Oxygen Demand Kinetics (BOD_t = BOD_u·(1 - e^(-k·t))) Calculator',
    description: 'Calculate 5-day Biochemical Oxygen Demand (BOD₅) in mg/L, Ultimate carbonaceous oxygen demand BOD_u (BOD_u = BOD₅ / (1 - e^(-5k))), and temperature-adjusted reaction rates k_T = k₂₀·θ^(T-20).',
    category: 'Science',
    icon: 'text',
    keywords: ['bod calculator', 'biochemical oxygen demand formula bod5 ultimate bod u online', 'first order bod kinetics reaction rate k calculator', 'wastewater organic loading temperature correction calculator', 'environmental engineering water quality wastewater online'],
    order: 1338,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '5-Day BOD₅ Test Result (mg/L), Reaction Rate k₂₀ (day⁻¹) & Water Temperature T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bd-bod5">BOD₅ (mg/L)</label>
          <input class="tool-textarea" id="bd-bod5" type="number" step="25" value="200.0" placeholder="200.0 mg/L (Municipal Raw)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bd-k20">Rate k₂₀ (day⁻¹)</label>
          <input class="tool-textarea" id="bd-k20" type="number" step="0.02" value="0.23" placeholder="0.23 day⁻¹ (Base e @ 20°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bd-temp">Temp T (°C)</label>
          <input class="tool-textarea" id="bd-temp" type="number" step="2" value="20" placeholder="20 °C" />
        </div>
      </div>
      <div id="bd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bd-res-bodu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ultimate BOD_u = 292.6 mg / L</span>
            <span class="stat-label">Ultimate Carbonaceous Oxygen Demand (BOD_u = BOD₅ / (1 - e^(-5k)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bd-res-rate" style="color:var(--green-dark); font-weight:700;">Rate k_T = 0.230 day⁻¹ | BOD₅ represents 68.3% of total carbonaceous oxygen demand</span>
            <span class="stat-label">Temperature-Adjusted Kinetic Rate (k_T = k₂₀·1.047^(T-20))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const b5El = document.getElementById('bd-bod5'), kEl = document.getElementById('bd-k20'), tEl = document.getElementById('bd-temp');
  const buResEl = document.getElementById('bd-res-bodu'), rtResEl = document.getElementById('bd-res-rate');

  function update() {
    const BOD5 = parseFloat(b5El.value), k20 = parseFloat(kEl.value), T_C = parseFloat(tEl.value);
    if (isNaN(BOD5) || isNaN(k20) || isNaN(T_C) || BOD5 <= 0 || k20 <= 0) return;

    // Arrhenius temperature correction (theta = 1.047):
    const k_T = k20 * Math.pow(1.047, T_C - 20.0);

    // Fraction exerted in 5 days: frac = 1 - exp(-5 * k_T)
    const frac = 1.0 - Math.exp(-5.0 * k_T);

    // Ultimate BOD: BOD_u = BOD5 / frac
    const BOD_u = BOD5 / frac;

    buResEl.textContent = 'Ultimate BOD_u = ' + BOD_u.toFixed(1) + ' mg / L';
    rtResEl.textContent = 'k_T = ' + k_T.toFixed(3) + ' day⁻¹ @ ' + T_C + '°C | 5-day fraction = ' + (frac * 100).toFixed(1) + '% of Ultimate BOD';
  }

  [b5El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter standard 5-day Biochemical Oxygen Demand ($\text{BOD}_5$) laboratory measurement in mg/L.',
      'Enter wastewater first-order organic degradation reaction constant $k_{20}$ in $\text{day}^{-1}$ (base e).',
      'Enter water temperature in $^\circ\text{C}$.',
      'Inspect Ultimate carbonaceous oxygen demand $\text{BOD}_u$ and temperature-adjusted degradation rate $k_T$.'
    ],
    benefitTitle: 'Standard Organic Loading Characterization',
    benefitContent: 'Quantifies the total bioavailable dissolved organic carbon pollution load requiring biological oxidation in municipal sewage and industrial brewery effluents.',
    faqs: [{ q: 'Why is 5 days standard for the BOD test?', a: 'By 5 days, carbonaceous degradation is roughly $70\%$ complete, before autotrophic nitrifying bacteria begin exerting interference nitrogenous demand (NBOD).' }]
  },

  // 5. Manning's Equation Open Channel Flow Calculator
  {
    slug: 'manning-open-channel-flow-trapezoidal-hydraulic-radius-calculator',
    name: 'Manning\'s Equation Open Channel Flow & Normal Depth (Q = 1/n·A·R_h^(2/3)·S^(1/2)) Calculator',
    description: 'Calculate open channel gravity flow discharge Q in m³/s (Manning\'s Equation), flow velocity v in m/s, hydraulic radius R_h (A / P), and wetted perimeter for rectangular and trapezoidal drainage channels.',
    category: 'Science',
    icon: 'text',
    keywords: ['manning equation calculator', 'open channel flow formula q equals 1 over n a r two thirds s half online', 'hydraulic radius normal depth trapezoidal channel calculator', 'manning roughness coefficient culvert storm sewer calculator', 'civil environmental hydraulic engineering open channel online'],
    order: 1339,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Channel Bottom Width b (m), Water Depth y (m), Side Slope z (H:1V), Bed Slope S & Manning n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mn-b">Bottom Width b (m)</label>
          <input class="tool-textarea" id="mn-b" type="number" step="0.5" value="3.0" placeholder="3.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mn-y">Depth y (m)</label>
          <input class="tool-textarea" id="mn-y" type="number" step="0.2" value="1.5" placeholder="1.5 m Normal Depth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mn-z">Side Slope z (H:1V)</label>
          <input class="tool-textarea" id="mn-z" type="number" step="0.5" value="1.5" placeholder="1.5 (Trapezoidal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mn-s">Slope S (m/m)</label>
          <input class="tool-textarea" id="mn-s" type="number" step="0.0005" value="0.0020" placeholder="0.0020 (0.2%)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mn-n">Manning n</label>
          <input class="tool-textarea" id="mn-n" type="number" step="0.002" value="0.015" placeholder="0.015 (Concrete Canal)" />
        </div>
      </div>
      <div id="mn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mn-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Discharge Q = 25.13 m³ / s (25,130 L/s)</span>
            <span class="stat-label">Uniform Gravity Open Channel Flow Discharge (Q = 1/n · A · R_h^(2/3) · S^(1/2))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mn-res-geom" style="color:var(--green-dark); font-weight:700;">Velocity v = 3.19 m/s | Area A = 7.88 m² | Hydraulic Radius R_h = 0.937 m</span>
            <span class="stat-label">Mean Flow Velocity, Cross-Section Area & Hydraulic Radius (R_h = A / P)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('mn-b'), yEl = document.getElementById('mn-y');
  const zEl = document.getElementById('mn-z'), sEl = document.getElementById('mn-s'), nEl = document.getElementById('mn-n');
  const qResEl = document.getElementById('mn-res-q'), gmResEl = document.getElementById('mn-res-geom');

  function update() {
    const b = parseFloat(bEl.value), y = parseFloat(yEl.value);
    const z = parseFloat(zEl.value), S = parseFloat(sEl.value), n = parseFloat(nEl.value);

    if (isNaN(b) || isNaN(y) || isNaN(z) || isNaN(S) || isNaN(n) || b <= 0 || y <= 0 || z < 0 || S <= 0 || n <= 0) return;

    // Cross-sectional area: A = (b + z*y) * y  [m^2]
    const A = (b + (z * y)) * y;

    // Wetted perimeter: P = b + 2 * y * sqrt(1 + z^2)  [m]
    const P = b + (2.0 * y * Math.sqrt(1.0 + Math.pow(z, 2)));

    // Hydraulic radius: R_h = A / P  [m]
    const R_h = A / P;

    // Mean velocity: v = (1 / n) * R_h^(2/3) * S^(1/2)  [m / s]
    const v = (1.0 / n) * Math.pow(R_h, 2.0 / 3.0) * Math.sqrt(S);

    // Discharge: Q = v * A  [m^3 / s]
    const Q = v * A;

    qResEl.textContent = 'Discharge Q = ' + Q.toFixed(2) + ' m³ / s (' + Math.round(Q * 1000).toLocaleString() + ' L/s)';
    gmResEl.textContent = 'Velocity v = ' + v.toFixed(2) + ' m/s | Area A = ' + A.toFixed(2) + ' m² | R_h = ' + R_h.toFixed(3) + ' m (Perimeter P = ' + P.toFixed(2) + ' m)';
  }

  [bEl, yEl, zEl, sEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter channel bottom bed width b in meters.',
      'Enter uniform normal water flow depth y in meters.',
      'Enter trapezoidal side slope z (horizontal distance per 1 vertical unit; enter 0 for rectangular channel).',
      'Enter longitudinal channel bed slope S (m/m, e.g. 0.002 for $0.2\%$).',
      'Enter Manning\'s roughness coefficient n (e.g. 0.013 for smooth concrete, 0.030 for natural river channel).',
      'Inspect total volumetric discharge Q in $\text{m}^3/\text{s}$, velocity v, and hydraulic radius $R_h$.'
    ],
    benefitTitle: 'Robert Manning 1889 Open Channel Hydraulics Standard',
    benefitContent: 'World\'s most widely used equation for designing stormwater drainage culverts, municipal storm sewers, irrigation canals, and flood control spillway waterways.',
    faqs: [{ q: 'What is the most hydraulically efficient open channel cross-section?', a: 'A trapezoidal channel with side slopes of $60^\circ$ ($z = 1/\sqrt{3} \approx 0.577$), forming a semi-hexagon that maximizes hydraulic radius $R_h = y/2$.' }]
  },

  // 6. Froude Number & Hydraulic Jump Energy Dissipation Calculator
  {
    slug: 'froude-number-hydraulic-jump-energy-dissipation-calculator',
    name: 'Froude Number (Fr) & Open Channel Hydraulic Jump Energy Dissipation Calculator',
    description: 'Calculate open channel flow Froude Number Fr (Fr = v / √(g·y)), flow regime (Subcritical Fr under 1 vs Supercritical Fr over 1), sequent conjugate jump depth y₂ (Bélanger equation), and energy head loss ΔE.',
    category: 'Science',
    icon: 'text',
    keywords: ['froude number calculator', 'hydraulic jump formula sequent depth belanger online', 'subcritical supercritical flow froude calculator', 'spillway hydraulic jump energy dissipation calculator', 'civil environmental hydraulic engineering open channel online'],
    order: 1340,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Upstream Depth y₁ (m) & Supercritical Flow Velocity v₁ (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fr-y1">Initial Depth y₁ (m)</label>
          <input class="tool-textarea" id="fr-y1" type="number" step="0.2" value="0.50" placeholder="0.50 m (Supercritical)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fr-v1">Velocity v₁ (m/s)</label>
          <input class="tool-textarea" id="fr-v1" type="number" step="1" value="8.0" placeholder="8.0 m/s (Spillway Base)" />
        </div>
      </div>
      <div id="fr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fr-res-fr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Froude Number Fr₁ = 3.61 (SUPERCRITICAL)</span>
            <span class="stat-label">Upstream Froude Number (Fr = v / √(g·y₁))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fr-res-jump" style="color:var(--green-dark); font-weight:700;">Sequent Depth y₂ = 2.32 m (4.64× Rise) | Energy Dissipation ΔE = 1.33 m (35.2% Head Loss)</span>
            <span class="stat-label">Bélanger Sequent Conjugate Depth (y₂/y₁ = ½·(√(1+8Fr₁²) - 1)) & Energy Loss</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const y1El = document.getElementById('fr-y1'), v1El = document.getElementById('fr-v1');
  const frResEl = document.getElementById('fr-res-fr'), jmResEl = document.getElementById('fr-res-jump');

  const g = 9.80665; // m/s^2

  function update() {
    const y1 = parseFloat(y1El.value), v1 = parseFloat(v1El.value);
    if (isNaN(y1) || isNaN(v1) || y1 <= 0 || v1 <= 0) return;

    // Froude number: Fr1 = v1 / sqrt(g * y1)
    const Fr1 = v1 / Math.sqrt(g * y1);

    if (Fr1 <= 1.0) {
      frResEl.textContent = 'Froude Number Fr₁ = ' + Fr1.toFixed(2) + ' (SUBCRITICAL: Fr < 1)';
      frResEl.style.color = '#22543d';
      jmResEl.textContent = 'No Hydraulic Jump occurs (Flow is already subcritical tranquil: v < wave celerity c)';
      return;
    }

    // Bélanger equation for sequent depth: y2 = (y1 / 2) * ( sqrt(1 + 8 * Fr1^2) - 1 )
    const y2 = (y1 / 2.0) * (Math.sqrt(1.0 + (8.0 * Math.pow(Fr1, 2))) - 1.0);

    // Specific energy before jump: E1 = y1 + v1^2 / (2g)
    const E1 = y1 + (Math.pow(v1, 2) / (2.0 * g));

    // Energy dissipation head loss: Delta_E = (y2 - y1)^3 / ( 4 * y1 * y2 )  [meters]
    const delta_E = Math.pow(y2 - y1, 3) / (4.0 * y1 * y2);
    const loss_pct = (delta_E / E1) * 100.0;

    let jumpClass = '';
    if (Fr1 < 2.5) jumpClass = 'Weak / Oscillating Jump';
    else if (Fr1 < 4.5) jumpClass = 'Oscillating / Steady Jump (Good Energy Dissipation)';
    else if (Fr1 < 9.0) jumpClass = 'Steady Strong Jump (45% - 70% Energy Dissipation)';
    else jumpClass = 'Rough Choppy Jump (> 70% Dissipation)';

    frResEl.textContent = 'Froude Fr₁ = ' + Fr1.toFixed(2) + ' (SUPERCRITICAL: ' + jumpClass + ')';
    frResEl.style.color = '#22543d';
    jmResEl.textContent = 'Sequent Depth y₂ = ' + y2.toFixed(2) + ' m | Head Loss ΔE = ' + delta_E.toFixed(2) + ' m (' + loss_pct.toFixed(1) + '% Energy Dissipated | E₁=' + E1.toFixed(2) + ' m)';
  }

  y1El.addEventListener('input', update);
  v1El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter upstream flow water depth $y_1$ in meters at the base of a spillway chute or sluice gate.',
      'Enter high-velocity supercritical flow speed $v_1$ in m/s.',
      'Inspect Froude Number $Fr_1$, downstream subcritical sequent conjugate depth $y_2$, and hydraulic jump energy head loss $\Delta E$.'
    ],
    benefitTitle: 'Jean-Baptiste Bélanger 1828 Hydraulic Jump Momentum Equation',
    benefitContent: 'Quantifies massive turbulent energy dissipation at dam spillway stilling basins ($Fr_1 > 4.5$), converting destructive high-velocity kinetic energy into harmless heat and turbulence to prevent downstream riverbed scour.',
    faqs: [{ q: 'What is critical depth yc?', a: 'Critical depth ($Fr = 1.0$) is the water depth where specific energy is at its absolute theoretical minimum ($y_c = (q^2 / g)^{1/3}$).' }]
  },

  // 7. SCS-CN Runoff Curve Number Rainfall-Runoff Calculator
  {
    slug: 'scs-curve-number-runoff-precipitation-depth-calculator',
    name: 'SCS-CN Runoff Curve Number Rainfall-Runoff Depth (Q = (P - 0.2S)² / (P + 0.8S)) Calculator',
    description: 'Calculate storm event direct runoff depth Q in mm (USDA NRCS / SCS Runoff Curve Number method: Q = (P - 0.2·S)² / (P + 0.8·S)), maximum soil potential retention S = (25400/CN - 254), and initial abstraction I_a.',
    category: 'Science',
    icon: 'text',
    keywords: ['scs curve number calculator', 'rainfall runoff depth formula online', 'nrcs runoff curve number cn calculator', 'initial abstraction potential retention s calculator', 'hydrology stormwater management civil engineering online'],
    order: 1341,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rainfall Storm Depth P (mm), SCS Curve Number CN (30 to 98) & Initial Abstraction Ratio',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sc-p">Rainfall P (mm)</label>
          <input class="tool-textarea" id="sc-p" type="number" step="10" value="75.0" placeholder="75.0 mm (3 inches)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sc-cn">Curve Number CN</label>
          <input class="tool-textarea" id="sc-cn" type="number" step="2" value="78" placeholder="78 (Residential / Cultivated)" />
        </div>
      </div>
      <div id="sc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sc-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Direct Runoff Q = 29.5 mm (39.3% of Rainfall)</span>
            <span class="stat-label">SCS Direct Storm Runoff Volume Depth (Q = (P - 0.2S)² / (P + 0.8S))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sc-res-s" style="color:var(--green-dark); font-weight:700;">Soil Retention S = 71.7 mm | Initial Abstraction I_a = 14.3 mm (Rainfall before runoff begins)</span>
            <span class="stat-label">Maximum Potential Watershed Soil Retention & Initial Abstraction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('sc-p'), cnEl = document.getElementById('sc-cn');
  const qResEl = document.getElementById('sc-res-q'), sResEl = document.getElementById('sc-res-s');

  function update() {
    const P_mm = parseFloat(pEl.value), CN = parseFloat(cnEl.value);
    if (isNaN(P_mm) || isNaN(CN) || P_mm <= 0 || CN <= 30 || CN >= 100) return;

    // Maximum potential retention: S = (25400 / CN) - 254  [mm]
    const S_mm = (25400.0 / CN) - 254.0;

    // Initial abstraction: Ia = 0.2 * S  [mm]
    const Ia_mm = 0.20 * S_mm;

    if (P_mm <= Ia_mm) {
      qResEl.textContent = 'Direct Runoff Q = 0.0 mm (0%)';
      qResEl.style.color = '#22543d';
      sResEl.textContent = 'All rainfall absorbed by soil/canopy (P = ' + P_mm + ' mm ≤ Initial Abstraction I_a = ' + Ia_mm.toFixed(1) + ' mm)';
      return;
    }

    // Direct runoff depth: Q = (P - 0.2*S)^2 / (P + 0.8*S)  [mm]
    const Q_mm = Math.pow(P_mm - Ia_mm, 2) / (P_mm + (0.80 * S_mm));
    const runoff_pct = (Q_mm / P_mm) * 100.0;

    qResEl.textContent = 'Direct Runoff Q = ' + Q_mm.toFixed(1) + ' mm (' + runoff_pct.toFixed(1) + '% of storm)';
    qResEl.style.color = '#22543d';
    sResEl.textContent = 'Soil Retention S = ' + S_mm.toFixed(1) + ' mm | Initial Abstraction I_a = ' + Ia_mm.toFixed(1) + ' mm (CN = ' + CN + ')';
  }

  pEl.addEventListener('input', update);
  cnEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total 24-hour design storm precipitation depth P in mm (e.g. 10-year or 100-year storm).',
      'Enter NRCS Runoff Curve Number CN (30 for forested sand, 75 for residential loam, 98 for paved impervious asphalt).',
      'Inspect direct watershed runoff depth Q in mm and initial interception abstraction $I_a$.'
    ],
    benefitTitle: 'USDA Natural Resources Conservation Service (NRCS) Standard',
    benefitContent: 'Standard empirical method for estimating watershed storm flood runoff volumes based on hydrologic soil group (A, B, C, D), land use, and antecedent moisture condition (AMC).',
    faqs: [{ q: 'What is the physical meaning of Curve Number CN = 100?', a: '$CN = 100$ represents a completely impervious surface ($S = 0, I_a = 0$) where $100\%$ of rainfall immediately converts to runoff ($Q = P$).' }]
  },

  // 8. Rational Method Peak Stormwater Runoff Discharge Calculator
  {
    slug: 'rational-method-peak-stormwater-runoff-discharge-calculator',
    name: 'Rational Method Peak Stormwater Runoff Discharge (Q = C·I·A) Calculator',
    description: 'Calculate urban drainage watershed peak flood runoff discharge flow rate Q in m³/s and cfs (Rational Formula: Q = C · I · A) from runoff coefficient C, rainfall intensity I (mm/hr), and drainage basin area A.',
    category: 'Science',
    icon: 'text',
    keywords: ['rational method calculator', 'peak stormwater runoff formula q equals c i a online', 'rational runoff coefficient rainfall intensity calculator', 'urban drainage storm sewer sizing calculator cfs m3 s', 'civil environmental engineering hydrology stormwater online'],
    order: 1342,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Runoff Coefficient C (0.10 to 0.95), Rainfall Intensity I (mm/hr) & Drainage Area A (Hectares or Acres)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rm-c">Coefficient C</label>
          <input class="tool-textarea" id="rm-c" type="number" step="0.05" min="0.1" max="0.95" value="0.65" placeholder="0.65 (Commercial / Urban)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-i">Intensity I (mm/hr)</label>
          <input class="tool-textarea" id="rm-i" type="number" step="10" value="50.0" placeholder="50.0 mm/hr (10-Yr Storm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-a">Area A (Hectares)</label>
          <input class="tool-textarea" id="rm-a" type="number" step="2" value="12.0" placeholder="12.0 Hectares (ha)" />
        </div>
      </div>
      <div id="rm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rm-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Peak Discharge Q = 1.083 m³ / s (38.26 cfs)</span>
            <span class="stat-label">Rational Method Peak Stormwater Runoff (Q = C · I · A / 360)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rm-res-equiv" style="color:var(--green-dark); font-weight:700;">1,083 L / s (65.0 m³/min) | Area = 120,000 m² (29.65 Acres | Impervious Factor C = 0.65)</span>
            <span class="stat-label">Alternative Flow Units & Drainage Basin Dimensions</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('rm-c'), iEl = document.getElementById('rm-i'), aEl = document.getElementById('rm-a');
  const qResEl = document.getElementById('rm-res-q'), eqResEl = document.getElementById('rm-res-equiv');

  function update() {
    const C = parseFloat(cEl.value), I_mm_hr = parseFloat(iEl.value), A_ha = parseFloat(aEl.value);
    if (isNaN(C) || isNaN(I_mm_hr) || isNaN(A_ha) || C <= 0 || C > 1 || I_mm_hr <= 0 || A_ha <= 0) return;

    // Rational Formula in SI metric:
    // Q (m^3 / s) = ( C * I (mm/hr) * A (ha) ) / 360
    const Q_m3_s = (C * I_mm_hr * A_ha) / 360.0;
    const Q_L_s = Q_m3_s * 1000.0;
    const Q_cfs = Q_m3_s * 35.3147;

    const A_acres = A_ha * 2.47105;

    qResEl.textContent = 'Peak Q = ' + Q_m3_s.toFixed(3) + ' m³/s (' + Q_cfs.toFixed(2) + ' cfs)';
    eqResEl.textContent = 'Flow = ' + Math.round(Q_L_s).toLocaleString() + ' L/s (' + (Q_m3_s * 60).toFixed(1) + ' m³/min) | Area: ' + A_ha + ' ha (' + A_acres.toFixed(1) + ' acres @ C=' + C + ')';
  }

  [cEl, iEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter dimensionless catchment runoff coefficient C ($0.15$ lawns, $0.50$ residential, $0.85$ paved parking lots).',
      'Enter design storm rainfall intensity I in mm/hr for duration equal to catchment time of concentration ($t_c$).',
      'Enter total tributary drainage basin area A in hectares (ha).',
      'Inspect peak stormwater runoff discharge flow rate Q in $\text{m}^3/\text{s}$, Liters/second, and cubic feet per second (cfs).'
    ],
    benefitTitle: 'Thomas Mulvaney 1850 Rational Formula Standard',
    benefitContent: 'The most popular engineering method worldwide for sizing urban storm sewers, roadway gutters, parking lot retention ponds, and small catchments under 80 hectares (200 acres).',
    faqs: [{ q: 'Why is rainfall intensity evaluated at duration equal to time of concentration (tc)?', a: 'At $t = t_c$, the entire watershed contributes runoff to the outlet simultaneously, producing the absolute maximum peak discharge.' }]
  },

  // 9. Sound Pressure Level (SPL Decibels & Distance) Calculator
  {
    slug: 'sound-pressure-level-spl-decibel-distance-attenuation-calculator',
    name: 'Sound Pressure Level (SPL Decibels & Inverse Square Distance Attenuation) Calculator',
    description: 'Calculate acoustic Sound Pressure Level SPL in dB (SPL = 20·log₁₀(p / p₀)), point source distance attenuation (SPL₂ = SPL₁ - 20·log₁₀(r₂ / r₁) - 6 dB per distance doubling), and sound power level L_w.',
    category: 'Science',
    icon: 'text',
    keywords: ['sound pressure level calculator', 'spl decibel distance attenuation formula online', '6 db per doubling of distance acoustic calculator', 'sound power level lw to spl calculator', 'environmental acoustics noise pollution mechanical noise online'],
    order: 1343,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Source Noise Level SPL₁ (dB), Reference Distance r₁ (m) & Target Receptor Distance r₂ (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-spl1">Noise SPL₁ (dB)</label>
          <input class="tool-textarea" id="sp-spl1" type="number" step="5" value="85.0" placeholder="85.0 dBA (Equipment)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-r1">Ref Distance r₁ (m)</label>
          <input class="tool-textarea" id="sp-r1" type="number" step="0.5" value="1.0" placeholder="1.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-r2">Target Distance r₂ (m)</label>
          <input class="tool-textarea" id="sp-r2" type="number" step="5" value="20.0" placeholder="20.0 m (Boundary)" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-spl2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Target Noise SPL₂ = 59.0 dB (SAFE: < 65 dB limit ✓)</span>
            <span class="stat-label">Geometric Spherical Free-Field Divergence Attenuation</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-drop" style="color:var(--green-dark); font-weight:700;">Noise Reduction ΔSPL = -26.0 dB (20× distance = 4.32 doublings × 6.02 dB)</span>
            <span class="stat-label">Inverse Square Law Distance Drop (SPL₂ = SPL₁ - 20·log₁₀(r₂/r₁))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const spl1El = document.getElementById('sp-spl1'), r1El = document.getElementById('sp-r1'), r2El = document.getElementById('sp-r2');
  const sp2ResEl = document.getElementById('sp-res-spl2'), dpResEl = document.getElementById('sp-res-drop');

  function update() {
    const spl1 = parseFloat(spl1El.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(spl1) || isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0) return;

    // Inverse Square Law spherical point source attenuation:
    // SPL2 = SPL1 - 20 * log10( r2 / r1 )
    const attenuation = 20.0 * Math.log10(r2 / r1);
    const spl2 = spl1 - attenuation;

    let status = '', color = '#22543d';
    if (spl2 <= 55.0) { status = 'QUIET RESIDENTIAL LEVEL (≤ 55 dBA ✓)'; color = '#22543d'; }
    else if (spl2 <= 70.0) { status = 'COMMERCIAL / DAYTIME LIMIT (55 - 70 dBA)'; color = '#22543d'; }
    else if (spl2 <= 85.0) { status = 'INDUSTRIAL OCCUPATIONAL LIMIT (70 - 85 dBA)'; color = '#ea580c'; }
    else { status = 'HAZARDOUS NOISE (> 85 dBA: OSHA Hearing Protection Mandatory ✗)'; color = '#c53030'; }

    sp2ResEl.textContent = 'Target Noise SPL₂ = ' + spl2.toFixed(1) + ' dB';
    sp2ResEl.style.color = color;
    dpResEl.textContent = 'Noise Reduction ΔSPL = -' + attenuation.toFixed(1) + ' dB (' + status + ' @ r₂=' + r2 + ' m)';
  }

  [spl1El, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter known sound pressure level $\text{SPL}_1$ in dB at reference measurement distance.',
      'Enter reference measurement distance $r_1$ in meters (typically 1.0 m).',
      'Enter receptor property line target distance $r_2$ in meters.',
      'Inspect attenuated sound level $\text{SPL}_2$ in dB and compare against residential noise limits.'
    ],
    benefitTitle: 'Acoustic Inverse Square Spherical Divergence Law',
    benefitContent: 'Sound pressure decays by exactly $6.02\text{ dB}$ for every doubling of distance in a spherical free field ($\text{SPL} \propto 1/r$), defining plant perimeter setback distances.',
    faqs: [{ q: 'What is the acoustic reference sound pressure p0 in air?', a: '$p_0 = 20\ \mu\text{Pa}$ ($2 \times 10^{-5}\text{ Pa}$), representing the absolute human threshold of hearing at 1000 Hz.' }]
  },

  // 10. Equivalent Continuous Sound Level (Leq) Calculator
  {
    slug: 'equivalent-continuous-sound-level-leq-noise-calculator',
    name: 'Equivalent Continuous Sound Level (L_eq Industrial Noise Exposure) Calculator',
    description: 'Calculate cumulative energy-averaged Equivalent Continuous Sound Level L_eq in dBA (L_eq = 10 · log₁₀(1/T · ∑ t_i · 10^(L_i/10))) and OSHA/NIOSH Daily Noise Dose (D%) for occupational safety.',
    category: 'Science',
    icon: 'text',
    keywords: ['leq calculator', 'equivalent continuous sound level formula online', 'osha daily noise dose d percentage calculator', 'energy average sound level leq decibels calculator', 'occupational safety acoustics industrial hygiene online'],
    order: 1344,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Exposures: Noise Level L₁ (dBA) & Duration t₁, Noise L₂ (dBA) & Duration t₂, etc.',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lq-l1">Task 1 L₁ (dBA)</label>
          <input class="tool-textarea" id="lq-l1" type="number" step="5" value="90.0" placeholder="90.0 dBA (Grinding)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lq-t1">Time t₁ (Hours)</label>
          <input class="tool-textarea" id="lq-t1" type="number" step="0.5" value="2.0" placeholder="2.0 Hours" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lq-l2">Task 2 L₂ (dBA)</label>
          <input class="tool-textarea" id="lq-l2" type="number" step="5" value="80.0" placeholder="80.0 dBA (Assembly)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lq-t2">Time t₂ (Hours)</label>
          <input class="tool-textarea" id="lq-t2" type="number" step="0.5" value="6.0" placeholder="6.0 Hours" />
        </div>
      </div>
      <div id="lq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lq-res-leq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8-Hour L_eq = 85.0 dBA (OSHA Action Level)</span>
            <span class="stat-label">Equivalent Continuous A-Weighted Sound Exposure Level</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lq-res-dose" style="color:var(--green-dark); font-weight:700;">OSHA Noise Dose = 50.0% (Action Level Reached: Hearing Conservation Program Required)</span>
            <span class="stat-label">OSHA 8-Hour Permissible Noise Dose Percentage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l1El = document.getElementById('lq-l1'), t1El = document.getElementById('lq-t1');
  const l2El = document.getElementById('lq-l2'), t2El = document.getElementById('lq-t2');
  const lqResEl = document.getElementById('lq-res-leq'), dsResEl = document.getElementById('lq-res-dose');

  function update() {
    const L1 = parseFloat(l1El.value), t1 = parseFloat(t1El.value);
    const L2 = parseFloat(l2El.value), t2 = parseFloat(t2El.value);

    if (isNaN(L1) || isNaN(t1) || isNaN(L2) || isNaN(t2) || t1 < 0 || t2 < 0 || (t1 + t2) <= 0) return;

    const T_total = t1 + t2;

    // Energy-averaged Leq = 10 * log10( (1/T) * ( t1*10^(L1/10) + t2*10^(L2/10) ) )
    const energy_sum = (t1 * Math.pow(10.0, L1 / 10.0)) + (t2 * Math.pow(10.0, L2 / 10.0));
    const Leq = 10.0 * Math.log10(energy_sum / T_total);

    // OSHA Dose calculation (PEL = 90 dBA, 5 dB exchange rate: C1/T1 + C2/T2):
    // Allowed time T = 8 / 2^((L - 90)/5)
    const T_allow_1 = 8.0 / Math.pow(2.0, (L1 - 90.0) / 5.0);
    const T_allow_2 = 8.0 / Math.pow(2.0, (L2 - 90.0) / 5.0);
    const osha_dose_pct = ((t1 / T_allow_1) + (t2 / T_allow_2)) * 100.0;

    let eval_text = '', color = '#22543d';
    if (osha_dose_pct >= 100.0) {
      eval_text = 'EXCEEDS OSHA PEL 100% DOSE (Hearing Protection Mandatory ✗)';
      color = '#c53030';
    } else if (osha_dose_pct >= 50.0) {
      eval_text = 'OSHA ACTION LEVEL REACHED (Dose ≥ 50%: Hearing testing required)';
      color = '#ea580c';
    } else {
      eval_text = 'COMPLIANT (Dose < 50%: Safe occupational exposure ✓)';
      color = '#22543d';
    }

    lqResEl.textContent = T_total.toFixed(0) + '-Hour L_eq = ' + Leq.toFixed(1) + ' dBA';
    lqResEl.style.color = color;
    dsResEl.textContent = 'OSHA Noise Dose = ' + osha_dose_pct.toFixed(1) + '% (' + eval_text + ' | Total Shift = ' + T_total.toFixed(1) + ' hrs)';
  }

  [l1El, t1El, l2El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter noise level $L_1$ in dBA and duration $t_1$ in hours for the noisy task.',
      'Enter noise level $L_2$ in dBA and duration $t_2$ in hours for ambient background work.',
      'Inspect total energy-averaged $L_{\text{eq}}$ and OSHA cumulative Noise Dose percentage.'
    ],
    benefitTitle: 'OSHA 29 CFR 1910.95 Occupational Noise Standard',
    benefitContent: 'Because decibels are logarithmic ($10^{L/10}$), brief high-noise exposure spikes dominate total shift acoustic energy, requiring accurate $L_{\text{eq}}$ integration.',
    faqs: [{ q: 'What is the OSHA 5-dB exchange rate vs NIOSH 3-dB rule?', a: 'OSHA uses a 5 dB trading ratio (halving allowable exposure time for every 5 dB rise above 90 dBA); NIOSH uses a stricter 3 dB rule.' }]
  },

  // 11. Sabine Formula Room Reverberation Time (RT60) Calculator
  {
    slug: 'sabine-formula-room-reverberation-time-rt60-calculator',
    name: 'Sabine Formula Architectural Room Reverberation Time (RT₆₀ = 0.161·V / A) Calculator',
    description: 'Calculate architectural room reverberation decay time RT₆₀ in seconds (Sabine Formula: RT₆₀ = 0.161 · V / A) from room volume V (m³), surface areas, and acoustic absorption coefficients (Metric Sabins A = ∑ S_i · α_i).',
    category: 'Science',
    icon: 'text',
    keywords: ['sabine formula calculator', 'reverberation time rt60 formula online', 'room acoustic absorption sabins calculator', 'classroom auditorium reverberation time calculator', 'architectural acoustics audio engineering building physics online'],
    order: 1345,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Room Volume V (m³), Total Boundary Surface Area S (m²) & Average Absorption Coefficient α',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sb-v">Room Volume V (m³)</label>
          <input class="tool-textarea" id="sb-v" type="number" step="100" value="800.0" placeholder="800.0 m³ (Classroom)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-s">Surface Area S (m²)</label>
          <input class="tool-textarea" id="sb-s" type="number" step="50" value="550.0" placeholder="550.0 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-alpha">Mean Absorption α</label>
          <input class="tool-textarea" id="sb-alpha" type="number" step="0.05" min="0.02" max="0.95" value="0.25" placeholder="0.25 (Acoustic Panels)" />
        </div>
      </div>
      <div id="sb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sb-res-rt60" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">RT₆₀ = 0.937 Seconds</span>
            <span class="stat-label">Sabine Reverberation Decay Time for 60 dB Sound Reduction</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sb-res-eval" style="color:var(--green-dark); font-weight:700;">EXCELLENT SPEECH CLARITY (Target RT₆₀: 0.6 - 1.0 s for Classrooms & Lecture Halls ✓)</span>
            <span class="stat-label">Total Absorption A = 137.5 Metric Sabins (A = S · α)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('sb-v'), sEl = document.getElementById('sb-s'), alEl = document.getElementById('sb-alpha');
  const rtResEl = document.getElementById('sb-res-rt60'), evResEl = document.getElementById('sb-res-eval');

  function update() {
    const V = parseFloat(vEl.value), S = parseFloat(sEl.value), alpha = parseFloat(alEl.value);
    if (isNaN(V) || isNaN(S) || isNaN(alpha) || V <= 0 || S <= 0 || alpha <= 0 || alpha >= 1) return;

    // Total metric absorption: A = S * alpha  [m^2 sabins]
    const A = S * alpha;

    // Sabine formula: RT60 = ( 0.161 * V ) / A  [seconds]
    const RT60 = (0.161 * V) / A;

    let use = '', color = '#22543d';
    if (RT60 <= 0.6) {
      use = 'RECORDING STUDIO / PODCAST ROOM (Dry acoustic environment: RT₆₀ < 0.6 s)';
      color = '#22543d';
    } else if (RT60 <= 1.1) {
      use = 'CLASSROOM / LECTURE AUDITORIUM (Ideal Speech Intelligibility: 0.6 - 1.1 s)';
      color = '#22543d';
    } else if (RT60 <= 2.2) {
      use = 'ORCHESTRAL CONCERT HALL (Rich musical warmth: 1.6 - 2.2 s)';
      color = '#22543d';
    } else {
      use = 'EXCESSIVE ECHO / CATHEDRAL (RT₆₀ > 2.5 s: Poor speech intelligibility)';
      color = '#ea580c';
    }

    rtResEl.textContent = 'RT₆₀ = ' + RT60.toFixed(3) + ' Seconds';
    evResEl.textContent = use + ' [Absorption A = ' + A.toFixed(1) + ' Sabins @ α=' + alpha + ']';
    evResEl.style.color = color;
  }

  [vEl, sEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter internal enclosed room volume V in $\text{m}^3$.',
      'Enter total bounding boundary surface area S (walls, floor, ceiling) in $\text{m}^2$.',
      'Enter average acoustic absorption coefficient $\alpha$ (0.05 for hard concrete/glass, 0.70 for fiberglass acoustic baffle tiles).',
      'Inspect calculated reverberation time $\text{RT}_{60}$ in seconds.'
    ],
    benefitTitle: 'Wallace Clement Sabine 1898 Architectural Acoustics Standard',
    benefitContent: 'Quantifies sound decay rate ($60\text{ dB}$ drop), optimizing room acoustics for speech intelligibility in lecture classrooms ($RT_{60} \approx 0.8\text{ s}$) versus orchestral music concert halls ($RT_{60} \approx 2.0\text{ s}$).',
    faqs: [{ q: 'What is the Eyring equation modification for highly absorbent rooms?', a: 'Carl F. Eyring modified Sabine\'s formula for dead rooms ($\alpha > 0.3$) to $RT_{60} = \frac{0.161 V}{-S \ln(1 - \alpha)}$.' }]
  },

  // 12. Sedimentation Clarifier Surface Overflow Rate (SOR) Calculator
  {
    slug: 'sedimentation-clarifier-surface-overflow-rate-weir-loading-calculator',
    name: 'Sedimentation Clarifier Surface Overflow Rate (SOR) & Weir Loading Calculator',
    description: 'Calculate wastewater primary and secondary clarifier Surface Overflow Rate SOR in m³/(m²·day) (SOR = Q / A_surface), weir loading rate (m³/(m·day)), hydraulic retention time (HRT in hours), and solids capture efficiency.',
    category: 'Science',
    icon: 'text',
    keywords: ['clarifier surface overflow rate calculator', 'sedimentation tank sor weir loading formula online', 'hydraulic retention time hrt clarifier calculator', 'wastewater primary secondary settling tank calculator', 'environmental engineering water wastewater civil engineering online'],
    order: 1346,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Rate Q (m³/day), Clarifier Diameter D (m) & Water Depth H (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cl-q">Flow Q (m³/day)</label>
          <input class="tool-textarea" id="cl-q" type="number" step="1000" value="15000.0" placeholder="15000.0 m³/day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-d">Clarifier Dia D (m)</label>
          <input class="tool-textarea" id="cl-d" type="number" step="2" value="28.0" placeholder="28.0 m Circular" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-h">Side Depth H (m)</label>
          <input class="tool-textarea" id="cl-h" type="number" step="0.5" value="4.0" placeholder="4.0 m Depth" />
        </div>
      </div>
      <div id="cl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cl-res-sor" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Overflow Rate SOR = 24.36 m³ / (m² · day)</span>
            <span class="stat-label">Surface Overflow Rate (SOR = Q / A_surface = 1.015 m/hr)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cl-res-hrt" style="color:var(--green-dark); font-weight:700;">HRT = 3.94 Hours (Volume = 2,463 m³) | Peripheral Weir Loading = 170.5 m³ / (m · day)</span>
            <span class="stat-label">Hydraulic Retention Time & Peripheral Effluent Weir Overflow Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('cl-q'), dEl = document.getElementById('cl-d'), hEl = document.getElementById('cl-h');
  const soResEl = document.getElementById('cl-res-sor'), hrResEl = document.getElementById('cl-res-hrt');

  function update() {
    const Q = parseFloat(qEl.value), D = parseFloat(dEl.value), H = parseFloat(hEl.value);
    if (isNaN(Q) || isNaN(D) || isNaN(H) || Q <= 0 || D <= 0 || H <= 0) return;

    // Surface area: A = pi * D^2 / 4  [m^2]
    const A_surf = (Math.PI * Math.pow(D, 2)) / 4.0;

    // Clarifier volume: V = A * H  [m^3]
    const V = A_surf * H;

    // Surface overflow rate: SOR = Q / A_surf  [m^3 / (m^2 * day) -> m / day]
    const SOR = Q / A_surf;
    const SOR_m_hr = SOR / 24.0;

    // Hydraulic Retention Time: HRT = V / Q * 24  [hours]
    const HRT_hours = (V / Q) * 24.0;

    // Peripheral weir length: L_weir = pi * D  [m]
    const L_weir = Math.PI * D;
    const weir_loading = Q / L_weir;

    soResEl.textContent = 'Overflow Rate SOR = ' + SOR.toFixed(2) + ' m³ / (m²·day) (' + SOR_m_hr.toFixed(3) + ' m/hr)';
    hrResEl.textContent = 'HRT = ' + HRT_hours.toFixed(2) + ' Hours (V = ' + Math.round(V).toLocaleString() + ' m³) | Weir Loading = ' + weir_loading.toFixed(1) + ' m³/(m·day)';
  }

  [qEl, dEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter wastewater influent daily flow rate Q in $\text{m}^3/\text{day}$.',
      'Enter circular clarifier settling tank diameter D in meters.',
      'Enter side water depth H in meters.',
      'Inspect Surface Overflow Rate (SOR in $\text{m}^3/(\text{m}^2\cdot\text{day})$), Hydraulic Retention Time (HRT in hours), and peripheral weir loading rate.'
    ],
    benefitTitle: 'Ten States Standards Clarifier Sizing Rules',
    benefitContent: 'Governs discrete particle gravitational sedimentation; any suspended floc particle whose terminal settling velocity exceeds the upward surface overflow rate ($v_s \ge \text{SOR}$) is $100\%$ captured.',
    faqs: [{ q: 'What is the recommended SOR limit for secondary activated sludge clarifiers?', a: 'Standard peak design SOR is typically $24\text{ to }32\text{ m}^3/(\text{m}^2\cdot\text{day})$ ($600\text{ to }800\text{ gpd/ft}^2$) to prevent sludge blanket carryover.' }]
  },

  // 13. Rapid Sand Filter Backwash Bed Expansion Calculator
  {
    slug: 'rapid-sand-filter-backwash-expansion-bed-porosity-calculator',
    name: 'Rapid Sand Filter Backwash Bed Expansion (L_e / L₀ = (1 - ε₀)/(1 - ε_e)) Calculator',
    description: 'Calculate drinking water rapid gravity sand filter fluidization bed expansion L_e in cm (L_e = L₀ · (1 - ε₀) / (1 - ε_e)), expanded bed porosity ε_e from upward backwash water velocity, and cleaning washwater volume.',
    category: 'Science',
    icon: 'text',
    keywords: ['rapid sand filter calculator', 'backwash bed expansion formula le over l0 online', 'fluidized filter bed porosity calculator', 'drinking water filtration backwash rate calculator', 'civil environmental water treatment engineering online'],
    order: 1347,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Settled Sand Bed Depth L₀ (cm), Initial Porosity ε₀ (e.g. 0.40) & Expanded Porosity ε_e (0.50 to 0.65)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fb-l0">Initial Depth L₀ (cm)</label>
          <input class="tool-textarea" id="fb-l0" type="number" step="5" value="75.0" placeholder="75.0 cm Filter Bed" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fb-e0">Initial Porosity ε₀</label>
          <input class="tool-textarea" id="fb-e0" type="number" step="0.02" value="0.42" placeholder="0.42" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fb-ee">Fluidized Porosity ε_e</label>
          <input class="tool-textarea" id="fb-ee" type="number" step="0.02" value="0.55" placeholder="0.55 (Expanded)" />
        </div>
      </div>
      <div id="fb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fb-res-le" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Expanded Depth L_e = 96.7 cm (+28.9% Expansion)</span>
            <span class="stat-label">Fluidized Backwash Sand Bed Depth (L_e = L₀ · (1 - ε₀) / (1 - ε_e))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fb-res-eval" style="color:var(--green-dark); font-weight:700;">OPTIMAL BED FLUIDIZATION (Target: 20% - 30% Bed Expansion for effective media scouring ✓)</span>
            <span class="stat-label">Backwash Scour Efficacy & Sand Loss Prevention</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l0El = document.getElementById('fb-l0'), e0El = document.getElementById('fb-e0'), eeEl = document.getElementById('fb-ee');
  const leResEl = document.getElementById('fb-res-le'), evResEl = document.getElementById('fb-res-eval');

  function update() {
    const L0 = parseFloat(l0El.value), eps0 = parseFloat(e0El.value), eps_e = parseFloat(eeEl.value);
    if (isNaN(L0) || isNaN(eps0) || isNaN(eps_e) || L0 <= 0 || eps0 <= 0 || eps0 >= 1 || eps_e <= eps0 || eps_e >= 1) return;

    // Solid sand volume conservation: L_e * (1 - eps_e) = L0 * (1 - eps0)
    // L_e = L0 * (1 - eps0) / (1 - eps_e)
    const L_e = L0 * (1.0 - eps0) / (1.0 - eps_e);
    const expansion_pct = ((L_e - L0) / L0) * 100.0;

    let qual = '', color = '#22543d';
    if (expansion_pct >= 20.0 && expansion_pct <= 35.0) {
      qual = 'OPTIMAL FLUIDIZATION (20% - 35% Expansion: Thorough media scouring without sand loss ✓)';
      color = '#22543d';
    } else if (expansion_pct < 20.0) {
      qual = 'UNDER-EXPANDED (< 20%: Inadequate wash scouring, mudball risk)';
      color = '#ea580c';
    } else {
      qual = 'OVER-EXPANDED (> 35%: Risk of sand media washout into troughs)';
      color = '#c53030';
    }

    leResEl.textContent = 'Expanded Depth L_e = ' + L_e.toFixed(1) + ' cm (+' + expansion_pct.toFixed(1) + '% Expansion)';
    evResEl.textContent = qual + ' [L₀ = ' + L0 + ' cm → L_e = ' + L_e.toFixed(1) + ' cm]';
    evResEl.style.color = color;
  }

  [l0El, e0El, eeEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter static settled filter sand bed depth $L_0$ in cm.',
      'Enter unfluidized initial sand bed porosity $\epsilon_0$ (typically 0.40–0.44).',
      'Enter expanded fluidized bed porosity $\epsilon_e$ under upward backwash flow (typically 0.52–0.58).',
      'Inspect expanded backwash bed depth $L_e$ and total percentage bed expansion.'
    ],
    benefitTitle: 'Water Treatment Granular Media Fluidization Standard',
    benefitContent: 'Ensures water backwash rates lift and fluidize granular sand grains by $25\%\text{ to }30\%$, enabling inter-particle collision scouring to flush trapped clay turbidity without washing sand into waste troughs.',
    faqs: [{ q: 'Why is air scouring combined with water backwash?', a: 'Combined air scour breaks sticky surface mudballs and reduces required washwater volume by over $40\%$.' }]
  },

  // 14. EPA Chlorine Disinfection Concentration-Time (CT) Calculator
  {
    slug: 'chlorine-disinfection-ct-disinfection-log-inactivation-calculator',
    name: 'EPA Chlorine Disinfection Concentration-Time (CT Table & Log Inactivation) Calculator',
    description: 'Calculate drinking water disinfection Contact Time Product CT in mg·min/L (CT = C · T₁₀), log-inactivation reduction of Giardia lamblia cysts and viruses, and compliance with the EPA Surface Water Treatment Rule.',
    category: 'Science',
    icon: 'text',
    keywords: ['ct calculator', 'chlorine disinfection ct table formula online', 'giardia virus log inactivation disinfection calculator', 'free chlorine residual contact time t10 calculator', 'drinking water treatment environmental engineering epa online'],
    order: 1348,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Free Chlorine Residual C (mg/L), Effective Contact Time T₁₀ (Minutes) & Water Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ct-c">Free Chlorine C (mg/L)</label>
          <input class="tool-textarea" id="ct-c" type="number" step="0.2" value="1.20" placeholder="1.20 mg/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-t10">Contact T₁₀ (min)</label>
          <input class="tool-textarea" id="ct-t10" type="number" step="5" value="45.0" placeholder="45.0 Minutes (Baffled)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-temp">Water Temp (°C)</label>
          <input class="tool-textarea" id="ct-temp" type="number" step="2" value="15" placeholder="15 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-ph">Water pH</label>
          <input class="tool-textarea" id="ct-ph" type="number" step="0.2" value="7.5" placeholder="7.5" />
        </div>
      </div>
      <div id="ct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ct-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Achieved CT = 54.0 mg · min / L</span>
            <span class="stat-label">Disinfection Concentration × Time Product (CT = C · T₁₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ct-res-eval" style="color:var(--green-dark); font-weight:700;">FULL COMPLIANCE (> 3-Log Giardia Inactivation: 99.9% Kill & > 4-Log Virus Kill ✓)</span>
            <span class="stat-label">EPA SWTR Giardia Lamblia Inactivation (Required CT ≈ 49 mg·min/L)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('ct-c'), t10El = document.getElementById('ct-t10');
  const tmEl = document.getElementById('ct-temp'), phEl = document.getElementById('ct-ph');
  const valResEl = document.getElementById('ct-res-val'), evResEl = document.getElementById('ct-res-eval');

  function update() {
    const C = parseFloat(cEl.value), T10 = parseFloat(t10El.value);
    const T_C = parseFloat(tmEl.value), pH = parseFloat(phEl.value);

    if (isNaN(C) || isNaN(T10) || isNaN(T_C) || isNaN(pH) || C <= 0 || T10 <= 0 || T_C < 0 || pH <= 0) return;

    // Achieved CT = C * T10  [mg * min / L]
    const CT_achieved = C * T10;

    // EPA SWTR Required 3-Log (99.9%) Giardia CT approx: CT_req approx (2.8 * pH - 5.0) * exp(-0.05 * T_C) * 35
    // Typical at 15°C, pH 7.5, C=1.2: CT_req approx 49 mg*min/L
    const CT_req_3log = (2.5 * pH) * Math.exp(-0.045 * T_C) * 3.5;
    const log_inact = (CT_achieved / CT_req_3log) * 3.0;

    let qual = '', color = '#22543d';
    if (CT_achieved >= CT_req_3log) {
      qual = 'COMPLIANT (Achieved ' + log_inact.toFixed(2) + '-Log Giardia Kill ≥ 3.0-Log EPA Standard ✓)';
      color = '#22543d';
    } else {
      qual = 'NON-COMPLIANT (Achieved ' + log_inact.toFixed(2) + '-Log < 3.0-Log Required CT: Increase chlorine or contact time ✗)';
      color = '#c53030';
    }

    valResEl.textContent = 'Achieved CT = ' + CT_achieved.toFixed(1) + ' mg · min / L';
    evResEl.textContent = qual + ' [Required 3-Log CT ≈ ' + CT_req_3log.toFixed(1) + ' mg·min/L @ ' + T_C + '°C, pH ' + pH + ']';
    evResEl.style.color = color;
  }

  [cEl, t10El, tmEl, phEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter measured free chlorine residual concentration C in mg/L at clearwell exit.',
      'Enter hydraulic contact time $T_{10}$ in minutes ($10\%$ of water passes faster, accounting for tank baffling factor).',
      'Enter water temperature in $^\circ\text{C}$ and water pH.',
      'Inspect achieved CT value in $\text{mg}\cdot\text{min/L}$ and EPA 3-log Giardia ($99.9\%$) inactivation compliance.'
    ],
    benefitTitle: 'EPA Surface Water Treatment Rule (SWTR) Disinfection Standard',
    benefitContent: 'Ensures municipal water supplies achieve mandated 3-log ($99.9\%$) Giardia cyst inactivation and 4-log ($99.99\%$) virus reduction to prevent waterborne pathogen outbreaks.',
    faqs: [{ q: 'What is the baffling factor in contact time calculations?', a: 'Unbaffled tanks experience short-circuiting ($T_{10}/T \approx 0.1$); adding serpentine baffles increases effective contact time ($T_{10}/T \approx 0.7$).' }]
  },

  // 15. Anaerobic Digester Methane Biogas Production Yield Calculator
  {
    slug: 'anaerobic-digester-methane-biogas-yield-calculator',
    name: 'Anaerobic Digester Methane Biogas Production Yield Calculator',
    description: 'Calculate municipal sludge and agricultural manure anaerobic digestion methane biogas generation rate V_CH4 in m³/day (0.35 m³ CH₄ / kg COD_removed at STP), thermal energy power output (kW), and volatile solids destruction (VSD%).',
    category: 'Science',
    icon: 'text',
    keywords: ['anaerobic digester calculator', 'biogas methane yield formula online', 'cod removed to methane 0.35 m3 per kg calculator', 'volatile solids destruction vsd biogas calculator', 'renewable energy environmental engineering wastewater online'],
    order: 1349,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Daily Sludge Flow Q (m³/day), Influent COD (g/L or kg/m³), COD Removal Efficiency (%) & % CH₄ in Gas',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ad-q">Sludge Flow Q (m³/day)</label>
          <input class="tool-textarea" id="ad-q" type="number" step="20" value="100.0" placeholder="100.0 m³/day Sludge" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ad-cod">Influent COD (kg/m³)</label>
          <input class="tool-textarea" id="ad-cod" type="number" step="5" value="40.0" placeholder="40.0 kg/m³ (40 g/L)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ad-eff">COD Removal (%)</label>
          <input class="tool-textarea" id="ad-eff" type="number" step="5" value="75.0" placeholder="75.0% Digestion" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ad-pch4">% Methane CH₄</label>
          <input class="tool-textarea" id="ad-pch4" type="number" step="5" value="65.0" placeholder="65.0% CH₄" />
        </div>
      </div>
      <div id="ad-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ad-res-ch4" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Pure Methane = 1,050 m³ CH₄ / day (Biogas = 1,615 m³/day)</span>
            <span class="stat-label">Methane Production (0.35 m³ CH₄ / kg COD_destructed at STP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ad-res-energy" style="color:var(--green-dark); font-weight:700;">Thermal Power = 437.5 kW (37,800 MJ/day) | Electricity @ 38% CHP = 166.3 kW</span>
            <span class="stat-label">Combined Heat & Power (CHP) Renewable Energy Generation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('ad-q'), codEl = document.getElementById('ad-cod');
  const effEl = document.getElementById('ad-eff'), pch4El = document.getElementById('ad-pch4');
  const ch4ResEl = document.getElementById('ad-res-ch4'), enResEl = document.getElementById('ad-res-energy');

  function update() {
    const Q = parseFloat(qEl.value), COD_in = parseFloat(codEl.value);
    const eff_pct = parseFloat(effEl.value), pch4_pct = parseFloat(pch4El.value);

    if (isNaN(Q) || isNaN(COD_in) || isNaN(eff_pct) || isNaN(pch4_pct) || Q <= 0 || COD_in <= 0 || eff_pct <= 0 || pch4_pct <= 0) return;

    // Daily COD mass removed: COD_destructed = Q * COD_in * (eff / 100)  [kg COD / day]
    const COD_destructed = Q * COD_in * (eff_pct / 100.0);

    // Stoichiometric methane generation at STP: 0.35 m^3 CH4 per kg COD converted
    const V_CH4_m3_day = 0.35 * COD_destructed;

    // Total raw biogas volume:
    const V_biogas_m3_day = V_CH4_m3_day / (pch4_pct / 100.0);

    // Heating value of pure methane approx 36.0 MJ / m^3:
    const energy_MJ_day = V_CH4_m3_day * 36.0;
    const thermal_kW = energy_MJ_day / 86.4; // 1 kW = 86.4 MJ/day
    const electric_kW = thermal_kW * 0.38; // 38% electrical generator efficiency

    ch4ResEl.textContent = 'Methane = ' + Math.round(V_CH4_m3_day).toLocaleString() + ' m³ CH₄ / day (Biogas ' + Math.round(V_biogas_m3_day).toLocaleString() + ' m³/day)';
    enResEl.textContent = 'Thermal = ' + thermal_kW.toFixed(1) + ' kW (' + Math.round(energy_MJ_day).toLocaleString() + ' MJ/day) | CHP Electric = ' + electric_kW.toFixed(1) + ' kW (COD removed: ' + Math.round(COD_destructed) + ' kg/day)';
  }

  [qEl, codEl, effEl, pch4El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter daily raw organic sludge volumetric loading rate Q in $\text{m}^3/\text{day}$.',
      'Enter influent Chemical Oxygen Demand (COD) concentration in $\text{kg/m}^3$ (g/L).',
      'Enter anaerobic digestion COD destruction percentage (typically 65%–80%).',
      'Enter methane volumetric fraction in biogas (typically 60%–70% $\text{CH}_4$).',
      'Inspect methane gas generation rate in $\text{m}^3/\text{day}$ and Combined Heat & Power (CHP) electric output in kW.'
    ],
    benefitTitle: 'Stoichiometric Methanogenesis Conversion Standard',
    benefitContent: 'Based on Buswell\'s anaerobic stoichiometry ($1\text{ mole CH}_4 = 64\text{ g COD} \implies 0.35\text{ m}^3\text{ CH}_4/\text{kg COD}$), sizing wastewater energy-neutral net-zero biogas cogeneration engines.',
    faqs: [{ q: 'What are the main stages of anaerobic digestion?', a: '1. Hydrolysis $\to$ 2. Acidogenesis $\to$ 3. Acetogenesis $\to$ 4. Methanogenesis by Archaea microbes.' }]
  },

  // 16. EPA Landfill Gas Methane Generation (LandGEM Model) Calculator
  {
    slug: 'landfill-gas-generation-first-order-decay-calculator',
    name: 'EPA Landfill Gas Methane Generation First-Order Decay (LandGEM Model) Calculator',
    description: 'Calculate municipal solid waste landfill methane generation rate Q_CH4 in m³/year (EPA LandGEM first-order decomposition equation: Q_CH4 = 2·k·L₀·M·e^(-k·t)) from methane generation potential L₀ and decay constant k.',
    category: 'Science',
    icon: 'text',
    keywords: ['landfill gas calculator', 'landgem methane generation formula online', 'first order decay methane potential l0 calculator', 'municipal solid waste landfill emissions calculator', 'environmental engineering solid waste renewable energy online'],
    order: 1350,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Waste Mass in Place M (Metric Tons), Methane Potential L₀ (m³/Mg), Decay Rate k (yr⁻¹) & Age t (Years)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lg-m">Waste Mass M (Tons)</label>
          <input class="tool-textarea" id="lg-m" type="number" step="50000" value="500000" placeholder="500,000 Mg (Metric Tons)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-l0">Potential L₀ (m³/Mg)</label>
          <input class="tool-textarea" id="lg-l0" type="number" step="10" value="100.0" placeholder="100.0 m³/Mg (Standard MSW)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-k">Decay k (yr⁻¹)</label>
          <input class="tool-textarea" id="lg-k" type="number" step="0.01" value="0.040" placeholder="0.040 yr⁻¹ (Moderate Rain)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-t">Landfill Age t (Years)</label>
          <input class="tool-textarea" id="lg-t" type="number" step="1" value="8.0" placeholder="8.0 Years Post-Closure" />
        </div>
      </div>
      <div id="lg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lg-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Methane Q_CH₄ = 2.90 × 10⁶ m³ / year (331 m³/hr)</span>
            <span class="stat-label">Annual Methane Gas Generation Rate (Q_CH₄ = 2·k·L₀·M·e^(-k·t))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lg-res-pwr" style="color:var(--green-dark); font-weight:700;">Landfill Gas Power = 3.32 MW Thermal (1.26 MW Electric @ 38% Generator)</span>
            <span class="stat-label">Landfill Gas-to-Energy (LFGTE) Power Potential</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('lg-m'), l0El = document.getElementById('lg-l0');
  const kEl = document.getElementById('lg-k'), tEl = document.getElementById('lg-t');
  const qResEl = document.getElementById('lg-res-q'), pwResEl = document.getElementById('lg-res-pwr');

  function update() {
    const M = parseFloat(mEl.value), L0 = parseFloat(l0El.value);
    const k = parseFloat(kEl.value), t = parseFloat(tEl.value);

    if (isNaN(M) || isNaN(L0) || isNaN(k) || isNaN(t) || M <= 0 || L0 <= 0 || k <= 0 || t < 0) return;

    // EPA LandGEM equation for annual methane generation:
    // Q_CH4 = 2 * k * L0 * M * exp( - k * t )  [m^3 / year]
    // (factor of 2 converts methane volume to total biogas if 50% CH4)
    const Q_CH4_m3_yr = k * L0 * M * Math.exp(-k * t);
    const Q_CH4_m3_hr = Q_CH4_m3_yr / 8760.0;

    // Power: 36 MJ/m^3 CH4 => 36e6 J / (8760 * 3600 s) = 1.1415 W per m^3/yr
    const power_thermal_kW = (Q_CH4_m3_yr * 36.0) / 31536.0;
    const power_electric_MW = (power_thermal_kW * 0.38) / 1000.0;

    qResEl.textContent = 'Methane Q = ' + (Q_CH4_m3_yr / 1e6).toFixed(2) + ' × 10⁶ m³/year (' + Math.round(Q_CH4_m3_hr) + ' m³/hr)';
    pwResEl.textContent = 'Power = ' + (power_thermal_kW / 1000).toFixed(2) + ' MW Thermal (' + power_electric_MW.toFixed(2) + ' MW Electric @ ' + t + ' yrs post-placement)';
  }

  [mEl, l0El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total mass of municipal solid waste in place M in metric tons (Mg).',
      'Enter methane generation capacity $L_0$ in $\text{m}^3/\text{Mg}$ (standard $100\text{ m}^3/\text{Mg}$).',
      'Enter first-order decay rate constant k in $\text{year}^{-1}$ (0.02 arid climates, 0.04 conventional, 0.06 wet bioreactor).',
      'Enter elapsed landfill age t in years.',
      'Inspect annual methane generation in $\text{m}^3/\text{year}$ and Landfill Gas-to-Energy (LFGTE) electric power potential.'
    ],
    benefitTitle: 'EPA Landfill Gas Emissions Model (LandGEM V3.02) Standard',
    benefitContent: 'Regulatory standard for estimating fugitive greenhouse gas emissions from landfills and designing commercial landfill gas collection piping and flare destruction systems.',
    faqs: [{ q: 'What is the global warming potential (GWP) of landfill methane?', a: 'Methane has a GWP of 28–36 over 100 years, making capturing and flaring landfill gas one of the most effective carbon reduction projects.' }]
  },

  // 17. Hazardous Waste Incinerator Destruction and Removal Efficiency (DRE) Calculator
  {
    slug: 'hazardous-waste-incinerator-destruction-removal-efficiency-dre-calculator',
    name: 'Hazardous Waste Incinerator Destruction and Removal Efficiency (DRE 99.99%) Calculator',
    description: 'Calculate hazardous waste thermal incinerator Principal Organic Hazardous Constituent (POHC) Destruction and Removal Efficiency percentage (DRE = (W_in - W_out) / W_in · 100%) for EPA RCRA compliance (Four-Nines 99.99% and Six-Nines 99.9999% for PCBs/dioxins).',
    category: 'Science',
    icon: 'text',
    keywords: ['dre calculator', 'destruction and removal efficiency formula online', 'hazardous waste incinerator 99.99 percent rcra calculator', 'pohc emission stack testing incinerator calculator', 'environmental engineering hazardous waste thermal treatment online'],
    order: 1351,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Feed Rate W_in (kg/hr) & Stack Emission Exhaust Mass Rate W_out (g/hr)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dr-win">Feed W_in (kg/hr)</label>
          <input class="tool-textarea" id="dr-win" type="number" step="50" value="250.0" placeholder="250.0 kg/hr POHC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dr-wout">Stack W_out (g/hr)</label>
          <input class="tool-textarea" id="dr-wout" type="number" step="0.5" value="1.25" placeholder="1.25 g/hr Exhaust" />
        </div>
      </div>
      <div id="dr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dr-res-dre" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">DRE = 99.99950 % (5.30 Nines)</span>
            <span class="stat-label">POHC Destruction and Removal Efficiency (DRE = (W_in - W_out) / W_in · 100%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dr-res-eval" style="color:var(--green-dark); font-weight:700;">RCRA COMPLIANT (Exceeds 99.99% "Four-Nines" EPA Hazardous Waste Standard ✓)</span>
            <span class="stat-label">EPA 40 CFR Part 264 Subpart O Incineration Compliance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const winEl = document.getElementById('dr-win'), woutEl = document.getElementById('dr-wout');
  const dreResEl = document.getElementById('dr-res-dre'), evResEl = document.getElementById('dr-res-eval');

  function update() {
    const Win_kg_hr = parseFloat(winEl.value), Wout_g_hr = parseFloat(woutEl.value);
    if (isNaN(Win_kg_hr) || isNaN(Wout_g_hr) || Win_kg_hr <= 0 || Wout_g_hr < 0) return;

    // Convert both to kg/hr:
    const Win = Win_kg_hr;
    const Wout = Wout_g_hr * 1e-3;

    // DRE = (Win - Wout) / Win * 100%
    const DRE_pct = ((Win - Wout) / Win) * 100.0;
    const nines = -Math.log10(1.0 - (DRE_pct / 100.0));

    let qual = '', color = '#22543d';
    if (DRE_pct >= 99.9999) {
      qual = 'PCB / DIOXIN COMPLIANT (≥ 99.9999% Six-Nines Standard ✓)';
      color = '#22543d';
    } else if (DRE_pct >= 99.99) {
      qual = 'STANDARD RCRA COMPLIANT (≥ 99.99% Four-Nines Standard ✓)';
      color = '#22543d';
    } else {
      qual = 'NON-COMPLIANT (DRE < 99.99%: Violation of EPA Hazardous Waste Rules ✗)';
      color = '#c53030';
    }

    dreResEl.textContent = 'DRE = ' + DRE_pct.toFixed(5) + ' % (' + nines.toFixed(2) + ' Nines)';
    dreResEl.style.color = color;
    evResEl.textContent = qual + ' [Fed: ' + Win + ' kg/hr vs Emitted: ' + Wout_g_hr + ' g/hr]';
    evResEl.style.color = color;
  }

  winEl.addEventListener('input', update);
  woutEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter mass feed rate of Principal Organic Hazardous Constituent $W_{\text{in}}$ in kg/hr into incinerator burner.',
      'Enter measured stack exhaust gas emission rate $W_{\text{out}}$ in g/hr.',
      'Inspect Destruction and Removal Efficiency (DRE) percentage and compare against EPA four-nines ($99.99\%$) standard.'
    ],
    benefitTitle: 'EPA Resource Conservation and Recovery Act (RCRA) Standard',
    benefitContent: 'Enforces strict thermal destruction compliance ($99.99\%$ for toxic organics and $99.9999\%$ six-nines for PCBs and dioxins) in hazardous waste rotary kilns.',
    faqs: [{ q: 'What are the 3 Ts of successful incineration?', a: 'Temperature ($> 1100^\circ\text{C}$), Time ($> 2.0\text{ seconds}$ gas residence time), and Turbulence (thorough air-fuel mixing).' }]
  },

  // 18. Venturi Gas Scrubber Particle Collection Efficiency Calculator
  {
    slug: 'cyclone-gas-scrubber-collection-efficiency-venturi-calculator',
    name: 'Venturi Gas Scrubber Particle Collection Efficiency & Pressure Drop Calculator',
    description: 'Calculate high-energy industrial Venturi gas scrubber aerodynamic particle collection efficiency η (Calvert cut diameter d_50 model) and throat pressure drop ΔP in inches of water gauge (in. w.g.) and kPa.',
    category: 'Science',
    icon: 'text',
    keywords: ['venturi scrubber calculator', 'gas scrubber particle collection efficiency formula online', 'venturi throat pressure drop inches water gauge calculator', 'calvert cut diameter dust removal scrubber calculator', 'environmental air pollution control chemical engineering online'],
    order: 1352,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Throat Gas Velocity v_t (m/s), Liquid-to-Gas Ratio L/G (L/m³) & Particle Size d_p (μm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vs-vt">Throat Velocity v_t</label>
          <input class="tool-textarea" id="vs-vt" type="number" step="10" value="90.0" placeholder="90.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vs-lg">Liquid/Gas L/G (L/m³)</label>
          <input class="tool-textarea" id="vs-lg" type="number" step="0.2" value="1.20" placeholder="1.20 L / m³ Gas" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vs-dp">Particle Size d_p (μm)</label>
          <input class="tool-textarea" id="vs-dp" type="number" step="0.5" value="1.0" placeholder="1.0 μm Sub-micron Dust" />
        </div>
      </div>
      <div id="vs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vs-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Efficiency η = 98.42% (Sub-micron Dust Capture)</span>
            <span class="stat-label">Venturi Wet Scrubber Particle Removal Efficiency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vs-res-dp" style="color:var(--green-dark); font-weight:700;">Pressure Drop ΔP = 7.42 kPa (29.8 in. w.g.) | Cut Diameter d₅₀ = 0.32 μm</span>
            <span class="stat-label">Throat Gas Pressure Drop (Hesketh Correlation) & 50% Cut Size</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vtEl = document.getElementById('vs-vt'), lgEl = document.getElementById('vs-lg'), dpEl = document.getElementById('vs-dp');
  const efResEl = document.getElementById('vs-res-eff'), dpResEl = document.getElementById('vs-res-dp');

  function update() {
    const v_t = parseFloat(vtEl.value), L_G = parseFloat(lgEl.value), d_p_um = parseFloat(dpEl.value);
    if (isNaN(v_t) || isNaN(L_G) || isNaN(d_p_um) || v_t <= 0 || L_G <= 0 || d_p_um <= 0) return;

    // Hesketh pressure drop approximation: Delta_P (cm H2O) approx 0.0005 * (v_t)^2 * L_G
    const dp_cm_h2o = 0.00055 * Math.pow(v_t, 2) * L_G * 10.0;
    const dp_in_wg = dp_cm_h2o / 2.54;
    const dp_kPa = dp_in_wg * 0.249089;

    // Calvert cut diameter d_50 (microns): d50 approx 2.0 / ( (v_t * L_G)^0.5 )
    const d50_um = 3.5 / Math.sqrt(v_t * L_G);

    // Collection efficiency for particle size d_p: eta = ( (d_p / d50)^2 ) / ( 1 + (d_p / d50)^2 )
    const ratio_sq = Math.pow(d_p_um / d50_um, 2.5);
    const eta = ratio_sq / (1.0 + ratio_sq);
    const eta_pct = Math.min(99.99, eta * 100.0);

    efResEl.textContent = 'Efficiency η = ' + eta_pct.toFixed(2) + '%';
    dpResEl.textContent = 'Pressure Drop ΔP = ' + dp_kPa.toFixed(2) + ' kPa (' + dp_in_wg.toFixed(1) + ' in. w.g.) | Cut d₅₀ = ' + d50_um.toFixed(2) + ' μm (v_t=' + v_t + ' m/s)';
  }

  [vtEl, lgEl, dpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter gas velocity in the narrow Venturi throat $v_t$ in m/s (typically 60–120 m/s).',
      'Enter scrubbing liquid-to-gas ratio $L/G$ in $\text{L}/\text{m}^3$ (typically 0.7–2.0 L/m³).',
      'Enter target aerosol particulate dust aerodynamic diameter $d_p$ in micrometers ($\mu\text{m}$).',
      'Inspect particle collection efficiency $\eta$, cut diameter $d_{50}$, and throat pressure drop $\Delta P$.'
    ],
    benefitTitle: 'High-Energy Wet Scrubbing Physics',
    benefitContent: 'High-velocity gas atomizes liquid droplets into high-speed liquid curtains, capturing sub-micron sticky dust and acid gas aerosols with $> 98\%$ efficiency.',
    faqs: [{ q: 'What is the trade-off of high collection efficiency in Venturi scrubbers?', a: 'Capturing sub-micron particles requires extreme gas velocities ($v_t > 90\text{ m/s}$), demanding huge fan electrical power to overcome high pressure drops ($\Delta P > 30\text{ in. w.g.}$).' }]
  },

  // 19. Electrostatic Precipitator (Deutsch-Anderson) Calculator
  {
    slug: 'electrostatic-precipitator-deutsch-anderson-efficiency-calculator',
    name: 'Electrostatic Precipitator (Deutsch-Anderson Collection Efficiency η) Calculator',
    description: 'Calculate coal-fired power plant and cement kiln Electrostatic Precipitator (ESP) particulate collection efficiency η (Deutsch-Anderson Equation: η = 1 - e^(-w · A / Q)) and required collecting plate area A.',
    category: 'Science',
    icon: 'text',
    keywords: ['electrostatic precipitator calculator', 'deutsch anderson equation esp efficiency formula online', 'particle migration velocity w plate area calculator', 'flue gas particulate removal electrostatic precipitator calculator', 'environmental engineering air pollution control power plants online'],
    order: 1353,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gas Flow Rate Q (m³/s), Total Plate Area A (m²) & Particle Drift Migration Velocity w (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="es-q">Gas Flow Q (m³/s)</label>
          <input class="tool-textarea" id="es-q" type="number" step="50" value="250.0" placeholder="250.0 m³/s (Flue Gas)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="es-a">Plate Area A (m²)</label>
          <input class="tool-textarea" id="es-a" type="number" step="1000" value="12000.0" placeholder="12,000 m² Plate Area" />
        </div>
        <div class="control-group">
          <label class="control-label" for="es-w">Migration w (m/s)</label>
          <input class="tool-textarea" id="es-w" type="number" step="0.02" value="0.10" placeholder="0.10 m/s (Fly Ash Drift)" />
        </div>
      </div>
      <div id="es-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="es-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Collection Efficiency η = 99.18%</span>
            <span class="stat-label">Deutsch-Anderson Particulate Removal Efficiency (η = 1 - e^(-w·A / Q))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="es-res-sca" style="color:var(--green-dark); font-weight:700;">Specific Collection Area SCA = 48.0 s / m (m² / (m³/s)) | Fly Ash Penetration = 0.82%</span>
            <span class="stat-label">Specific Collection Area (SCA = A / Q) & Particulate Penetration</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('es-q'), aEl = document.getElementById('es-a'), wEl = document.getElementById('es-w');
  const efResEl = document.getElementById('es-res-eff'), scResEl = document.getElementById('es-res-sca');

  function update() {
    const Q = parseFloat(qEl.value), A = parseFloat(aEl.value), w = parseFloat(wEl.value);
    if (isNaN(Q) || isNaN(A) || isNaN(w) || Q <= 0 || A <= 0 || w <= 0) return;

    // Specific Collection Area: SCA = A / Q  [s / m]
    const SCA = A / Q;

    // Deutsch-Anderson equation: eta = 1 - exp( - w * A / Q )
    const exponent = (w * A) / Q;
    const eta = 1.0 - Math.exp(-exponent);
    const eta_pct = eta * 100.0;
    const penetration_pct = (1.0 - eta) * 100.0;

    efResEl.textContent = 'Collection Efficiency η = ' + eta_pct.toFixed(2) + '%';
    scResEl.textContent = 'SCA = ' + SCA.toFixed(1) + ' s/m (' + A.toLocaleString() + ' m² / ' + Q + ' m³/s) | Penetration = ' + penetration_pct.toFixed(2) + '% (w=' + w + ' m/s)';
  }

  [qEl, aEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter volumetric flue gas flow rate Q in $\text{m}^3/\text{s}$.',
      'Enter total collecting electrode plate surface area A in $\text{m}^2$.',
      'Enter effective electrical particle drift migration velocity w in m/s (typically 0.05–0.15 m/s for coal fly ash).',
      'Inspect particulate collection efficiency $\eta$ and Specific Collection Area (SCA).'
    ],
    benefitTitle: 'Walther Deutsch 1922 & Evelyn Anderson Electrostatic Collection Law',
    benefitContent: 'High-voltage corona ionization charges dust particles negatively, driving them toward grounded collector plates to achieve $> 99\%$ particulate removal with near-zero gas pressure drop.',
    faqs: [{ q: 'Why do ESPs have very low operating energy costs compared to baghouses?', a: 'Electrostatic force acts only on the charged particles themselves rather than restricting the entire bulk gas flow, keeping pressure drops under $0.5\text{ kPa}$ ($2\text{ in. w.g.}$).' }]
  },

  // 20. Reverse Osmosis (RO) Membrane Water Flux & Salt Rejection Calculator
  {
    slug: 'reverse-osmosis-membrane-salt-rejection-flux-calculator',
    name: 'Reverse Osmosis (RO) Membrane Water Flux & Salt Rejection Efficiency Calculator',
    description: 'Calculate seawater and brackish water Reverse Osmosis (RO) membrane permeate water flux J_w in LMH (J_w = A · (ΔP - Δπ)), salt rejection efficiency R (R = (1 - C_p / C_f) · 100%), and permeate recovery rate (Y%).',
    category: 'Science',
    icon: 'text',
    keywords: ['reverse osmosis calculator', 'ro membrane water flux formula lmh online', 'salt rejection efficiency permeate recovery ro calculator', 'net driving pressure ndp osmotic pressure calculator', 'desalination water treatment environmental engineering online'],
    order: 1354,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Feed Pressure P_f (bar), Feed TDS C_f (mg/L), Permeate TDS C_p (mg/L) & Permeability A',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ro-p">Feed Press P (bar)</label>
          <input class="tool-textarea" id="ro-p" type="number" step="5" value="55.0" placeholder="55.0 bar (Seawater RO)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-cf">Feed TDS C_f (mg/L)</label>
          <input class="tool-textarea" id="ro-cf" type="number" step="2500" value="35000.0" placeholder="35,000 mg/L (Seawater)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-cp">Permeate C_p (mg/L)</label>
          <input class="tool-textarea" id="ro-cp" type="number" step="50" value="250.0" placeholder="250.0 mg/L (Potable)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-a">Permeability A</label>
          <input class="tool-textarea" id="ro-a" type="number" step="0.2" value="1.20" placeholder="1.20 LMH / bar" />
        </div>
      </div>
      <div id="ro-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ro-res-flux" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Water Flux J_w = 32.4 LMH (L / m² · hr)</span>
            <span class="stat-label">Net Driving Pressure Permeate Flux (J_w = A · (ΔP - Δπ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ro-res-rej" style="color:var(--green-dark); font-weight:700;">Salt Rejection R = 99.29% | Osmotic Pressure π = 28.0 bar | Net Drive NDP = 27.0 bar</span>
            <span class="stat-label">Membrane Salt Rejection Efficiency (R = 1 - C_p / C_f)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('ro-p'), cfEl = document.getElementById('ro-cf');
  const cpEl = document.getElementById('ro-cp'), aEl = document.getElementById('ro-a');
  const flResEl = document.getElementById('ro-res-flux'), rjResEl = document.getElementById('ro-res-rej');

  function update() {
    const P_bar = parseFloat(pEl.value), C_f = parseFloat(cfEl.value);
    const C_p = parseFloat(cpEl.value), A_perm = parseFloat(aEl.value);

    if (isNaN(P_bar) || isNaN(C_f) || isNaN(C_p) || isNaN(A_perm) || P_bar <= 0 || C_f <= 0 || C_p < 0 || A_perm <= 0) return;

    // Osmotic pressure approx for seawater: pi approx 0.8 bar per 1000 mg/L TDS (van 't Hoff rule)
    const pi_bar = (C_f / 1000.0) * 0.80;

    // Net Driving Pressure: NDP = Delta_P - Delta_pi
    const NDP = Math.max(0.0, P_bar - pi_bar);

    // Permeate flux: J_w = A * NDP  [L / (m^2 * hr) = LMH]
    const J_w = A_perm * NDP;

    // Salt rejection efficiency: R = ( 1 - C_p / C_f ) * 100%
    const R_pct = (1.0 - (C_p / C_f)) * 100.0;

    flResEl.textContent = 'Water Flux J_w = ' + J_w.toFixed(1) + ' LMH (L/m²·hr)';
    rjResEl.textContent = 'Salt Rejection R = ' + R_pct.toFixed(2) + '% | Osmotic π = ' + pi_bar.toFixed(1) + ' bar (NDP = ' + NDP.toFixed(1) + ' bar @ P=' + P_bar + ' bar)';
  }

  [pEl, cfEl, cpEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter high-pressure feed pump operating pressure in bar.',
      'Enter raw feed water Total Dissolved Solids (TDS) concentration in mg/L.',
      'Enter treated permeate product water TDS in mg/L.',
      'Enter membrane pure water permeability constant A in LMH/bar.',
      'Inspect permeate water flux $J_w$ (LMH), membrane salt rejection percentage R, and osmotic pressure $\pi$.'
    ],
    benefitTitle: 'Seawater & Brackish Water Desalination Standard',
    benefitContent: 'Overcomes natural osmotic pressure barriers ($\Delta P > \Delta\pi$) to produce WHO-standard potable drinking water from seawater with $> 99\%$ salt rejection.',
    faqs: [{ q: 'What is the typical energy consumption of seawater reverse osmosis (SWRO)?', a: 'Modern SWRO plants equipped with isobaric energy recovery devices (ERDs) consume only $2.5\text{ to }3.5\text{ kWh/m}^3$ of fresh water produced.' }]
  },

  // 21. Ion Exchange Water Softening Resin Capacity Calculator
  {
    slug: 'ion-exchange-water-softening-resin-capacity-calculator',
    name: 'Ion Exchange Water Softening Resin Capacity & Breakthrough Volume Calculator',
    description: 'Calculate cation exchange water softening resin service throughput breakthrough volume in m³ (Bed Volumes BV = Total Resin Capacity / Water Hardness as CaCO₃), regeneration salt (NaCl) requirements, and run time.',
    category: 'Science',
    icon: 'text',
    keywords: ['ion exchange water softener calculator', 'resin capacity breakthrough volume formula online', 'water hardness caco3 grains per gallon resin calculator', 'sodium chloride regeneration salt ion exchange calculator', 'water treatment environmental engineering plumbing online'],
    order: 1355,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Water Total Hardness (mg/L as CaCO₃), Resin Volume V_r (L) & Resin Capacity (eq/L or kgr/ft³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ix-hard">Hardness (mg/L CaCO₃)</label>
          <input class="tool-textarea" id="ix-hard" type="number" step="50" value="250.0" placeholder="250.0 mg/L (14.6 gpg)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ix-vr">Resin Volume V_r (L)</label>
          <input class="tool-textarea" id="ix-vr" type="number" step="10" value="50.0" placeholder="50.0 Liters Resin" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ix-cap">Resin Cap (eq/L)</label>
          <input class="tool-textarea" id="ix-cap" type="number" step="0.2" value="2.0" placeholder="2.0 eq/L (SAC Resin)" />
        </div>
      </div>
      <div id="ix-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ix-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Treated Water = 20.0 m³ (20,000 Liters / 400 BV)</span>
            <span class="stat-label">Softened Water Volume to Exhaustion Breakthrough (400 Bed Volumes)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ix-res-salt" style="color:var(--green-dark); font-weight:700;">Total Exchange Capacity = 100 eq (5,000 g CaCO₃) | Regen Salt (NaCl) = 12.0 kg @ 120 g/eq</span>
            <span class="stat-label">Equivalent Exchange Capacity & Brine Regeneration Salt Mass</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hdEl = document.getElementById('ix-hard'), vrEl = document.getElementById('ix-vr'), cpEl = document.getElementById('ix-cap');
  const vlResEl = document.getElementById('ix-res-vol'), stResEl = document.getElementById('ix-res-salt');

  function update() {
    const hardness_mg_L = parseFloat(hdEl.value), V_resin_L = parseFloat(vrEl.value), cap_eq_L = parseFloat(cpEl.value);
    if (isNaN(hardness_mg_L) || isNaN(V_resin_L) || isNaN(cap_eq_L) || hardness_mg_L <= 0 || V_resin_L <= 0 || cap_eq_L <= 0) return;

    // Hardness in meq/L: 1 meq/L CaCO3 = 50.045 mg/L CaCO3
    const hardness_eq_L = hardness_mg_L / 50045.0;

    // Total resin exchange capacity in equivalents:
    const total_capacity_eq = V_resin_L * cap_eq_L;
    const total_capacity_g_caco3 = total_capacity_eq * 50.045;

    // Total water treated volume in Liters:
    const treated_volume_L = total_capacity_eq / hardness_eq_L;
    const treated_volume_m3 = treated_volume_L / 1000.0;
    const bed_volumes = treated_volume_L / V_resin_L;

    // Regeneration NaCl salt required (typically ~120 g NaCl per equivalent of capacity):
    const salt_kg = (total_capacity_eq * 120.0) / 1000.0;

    vlResEl.textContent = 'Treated Water = ' + treated_volume_m3.toFixed(1) + ' m³ (' + Math.round(treated_volume_L).toLocaleString() + ' L / ' + Math.round(bed_volumes) + ' BV)';
    stResEl.textContent = 'Capacity = ' + total_capacity_eq.toFixed(0) + ' eq (' + Math.round(total_capacity_g_caco3) + ' g CaCO₃) | Regen NaCl Salt = ' + salt_kg.toFixed(1) + ' kg (' + (hardness_mg_L/17.1).toFixed(1) + ' gpg)';
  }

  [hdEl, vrEl, cpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw water Total Hardness concentration in mg/L as $\text{CaCO}_3$ (or divide mg/L by 17.1 for grains per gallon).',
      'Enter Strong Acid Cation (SAC) resin bed volume in Liters.',
      'Enter manufacturer total exchange capacity in $\text{eq/L}$ (typically 1.8–2.2 eq/L).',
      'Inspect total treated softened water volume in $\text{m}^3$, Bed Volumes (BV), and required regeneration rock salt mass.'
    ],
    benefitTitle: 'Cation Exchange Water Softening Stoichiometry',
    benefitContent: 'Exchanges dissolved scaling hardness ions ($\text{Ca}^{2+}, \text{Mg}^{2+}$) for non-scaling sodium ($\text{Na}^+$), protecting domestic plumbing boilers and industrial cooling towers from mineral scaling.',
    faqs: [{ q: 'What is a Bed Volume (BV)?', a: 'Bed Volume is the volume of water treated divided by the volume of resin media ($BV = V_{\text{water}} / V_{\text{resin}}$); typical softening runs achieve 300–600 BV.' }]
  },

  // 22. Activated Carbon Adsorption Isotherms Calculator
  {
    slug: 'carbon-adsorption-freundlich-langmuir-isotherm-calculator',
    name: 'Activated Carbon Adsorption Isotherms (Freundlich q_e = K_F·C_e^(1/n) & Langmuir) Calculator',
    description: 'Calculate granular activated carbon (GAC) contaminant adsorption capacity q_e in mg/g using the Freundlich empirical isotherm (q_e = K_F · C_e^(1/n)) and Langmuir monolayer isotherm (q_e = q_max · K_L · C_e / (1 + K_L · C_e)).',
    category: 'Science',
    icon: 'text',
    keywords: ['carbon adsorption calculator', 'freundlich isotherm formula qe equals kf ce one over n online', 'langmuir adsorption isotherm activated carbon calculator', 'gac carbon usage rate pac water treatment calculator', 'environmental chemical engineering water purification online'],
    order: 1356,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Equilibrium Concentration C_e (mg/L), Freundlich K_F ((mg/g)·(L/mg)^(1/n)) & 1/n Exponent',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ad-ce">Equilibrium C_e (mg/L)</label>
          <input class="tool-textarea" id="ad-ce" type="number" step="0.5" value="2.0" placeholder="2.0 mg/L Phenol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ad-kf">Freundlich K_F</label>
          <input class="tool-textarea" id="ad-kf" type="number" step="5" value="45.0" placeholder="45.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ad-n">Exponent 1/n</label>
          <input class="tool-textarea" id="ad-n" type="number" step="0.05" value="0.45" placeholder="0.45 (1/n < 1: Favorable)" />
        </div>
      </div>
      <div id="ad-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ad-res-qe" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Adsorption Capacity q_e = 61.47 mg / g Carbon</span>
            <span class="stat-label">Freundlich Equilibrium Adsorbed Solid Concentration (q_e = K_F · C_e^(1/n))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ad-res-cur" style="color:var(--green-dark); font-weight:700;">FAVORABLE ADSORPTION (1/n = 0.45 < 1.0) | Carbon Usage Rate CUR = 16.3 g GAC / m³ Treated</span>
            <span class="stat-label">Adsorption Favorability & Carbon Usage Rate (CUR = C_0 / q_e)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ceEl = document.getElementById('ad-ce'), kfEl = document.getElementById('ad-kf'), nEl = document.getElementById('ad-n');
  const qeResEl = document.getElementById('ad-res-qe'), curResEl = document.getElementById('ad-res-cur');

  function update() {
    const C_e = parseFloat(ceEl.value), K_F = parseFloat(kfEl.value), one_over_n = parseFloat(nEl.value);
    if (isNaN(C_e) || isNaN(K_F) || isNaN(one_over_n) || C_e <= 0 || K_F <= 0 || one_over_n <= 0) return;

    // Freundlich adsorption capacity: q_e = K_F * (C_e)^(1/n)  [mg contaminant / g carbon]
    const q_e = K_F * Math.pow(C_e, one_over_n);

    // Carbon usage rate: CUR = C_e / q_e * 1000  [g carbon / m^3 water]
    const CUR_g_m3 = (C_e / q_e) * 1000.0;

    let fav = '';
    if (one_over_n < 0.1) fav = 'IRREVERSIBLE ADSORPTION (1/n < 0.1)';
    else if (one_over_n <= 0.5) fav = 'HIGHLY FAVORABLE ADSORPTION (1/n = 0.1 - 0.5 ✓)';
    else if (one_over_n <= 1.0) fav = 'MODERATELY FAVORABLE ADSORPTION (1/n = 0.5 - 1.0)';
    else fav = 'UNFAVORABLE ADSORPTION (1/n > 1.0)';

    qeResEl.textContent = 'Capacity q_e = ' + q_e.toFixed(2) + ' mg / g Carbon';
    curResEl.textContent = fav + ' | Usage Rate CUR = ' + CUR_g_m3.toFixed(1) + ' g GAC / m³ (1 kg treats ' + (1000 / CUR_g_m3).toFixed(1) + ' m³)';
  }

  [ceEl, kfEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter residual liquid equilibrium dissolved contaminant concentration $C_e$ in mg/L.',
      'Enter Freundlich adsorption capacity parameter $K_F$ from laboratory bottle test.',
      'Enter Freundlich heterogeneity exponent $1/n$ ($1/n < 1$ indicates favorable adsorption).',
      'Inspect equilibrium carbon adsorption capacity $q_e$ in mg/g and Carbon Usage Rate (CUR).'
    ],
    benefitTitle: 'Herbert Freundlich 1906 Heterogeneous Adsorption Isotherm',
    benefitContent: 'Standard mathematical isotherm for sizing Granular Activated Carbon (GAC) lead-lag filter vessels to remove pesticides, PFAS, pharmaceuticals, and taste/odor compounds.',
    faqs: [{ q: 'What does 1/n < 1 indicate in Freundlich adsorption?', a: 'When $1/n < 1$, adsorption is favorable because relative adsorption capacity increases sharply at low contaminant trace concentrations.' }]
  },

  // 23. Packed Air Stripping Tower VOC Removal Calculator
  {
    slug: 'air-stripping-tower-henry-law-voc-removal-calculator',
    name: 'Packed Air Stripping Tower Volatile Organic Compound (VOC Removal Factor) Calculator',
    description: 'Calculate counter-current packed tower air stripping Volatile Organic Compound (VOC: TCE, PCE, benzene) stripping factor R (R = H · G / (P_tot · L)), number of transfer units NTU, and removal efficiency η%.',
    category: 'Science',
    icon: 'text',
    keywords: ['air stripping tower calculator', 'voc removal efficiency stripping factor formula online', 'henry law constant tce pce air stripper calculator', 'groundwater remediation packed column transfer units calculator', 'environmental engineering water treatment chemical engineering online'],
    order: 1357,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dimensionless Henry\'s Law Constant H\', Volumetric Air-to-Water Ratio G/L & Packing Height NTU',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="as-h">Henry\'s H\' (Dimless)</label>
          <input class="tool-textarea" id="as-h" type="number" step="0.05" value="0.40" placeholder="0.40 (TCE @ 20°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-gl">Air/Water Ratio (G/L)</label>
          <input class="tool-textarea" id="as-gl" type="number" step="10" value="50.0" placeholder="50.0 (Volumetric Ratio)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-ntu">Transfer Units NTU</label>
          <input class="tool-textarea" id="as-ntu" type="number" step="1" value="4.0" placeholder="4.0 (Packing Depth)" />
        </div>
      </div>
      <div id="as-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="as-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Removal η = 98.24% (TCE / PCE Stripped)</span>
            <span class="stat-label">VOC Air Stripping Removal Efficiency (η = (R - 1) / (R - e^(-NTU·(R-1)/R)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="as-res-r" style="color:var(--green-dark); font-weight:700;">Stripping Factor R = 20.00 (R >> 1: Gas-Phase Stripping Controlled ✓)</span>
            <span class="stat-label">Stripping Factor (R = H\' · G/L ≥ 3.0 Standard Target)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('as-h'), glEl = document.getElementById('as-gl'), ntuEl = document.getElementById('as-ntu');
  const efResEl = document.getElementById('as-res-eff'), rResEl = document.getElementById('as-res-r');

  function update() {
    const H_prime = parseFloat(hEl.value), G_over_L = parseFloat(glEl.value), NTU = parseFloat(ntuEl.value);
    if (isNaN(H_prime) || isNaN(G_over_L) || isNaN(NTU) || H_prime <= 0 || G_over_L <= 0 || NTU <= 0) return;

    // Stripping factor: R = H_prime * (G / L)
    const R = H_prime * G_over_L;

    if (R <= 1.0) {
      efResEl.textContent = 'POOR REMOVAL (Stripping Factor R ≤ 1.0)';
      efResEl.style.color = '#c53030';
      rResEl.textContent = 'R = ' + R.toFixed(2) + ' (Insufficient air flow G/L: Gas becomes saturated with VOC)';
      return;
    }

    // Onda / Treybal removal efficiency formula for packed tower:
    // Fraction remaining: C_out / C_in = (R - 1) / ( R * exp( NTU * (R - 1) / R ) - 1 )
    const num = R - 1.0;
    const den = (R * Math.exp(NTU * (R - 1.0) / R)) - 1.0;
    const frac_remaining = num / den;

    const removal_eff_pct = (1.0 - frac_remaining) * 100.0;

    efResEl.textContent = 'Removal η = ' + removal_eff_pct.toFixed(2) + '%';
    efResEl.style.color = '#22543d';
    rResEl.textContent = 'Stripping Factor R = ' + R.toFixed(2) + ' | NTU = ' + NTU + ' (Air/Water G/L = ' + G_over_L + ', H\'=' + H_prime + ')';
  }

  [hEl, glEl, ntuEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter dimensionless Henry\'s Law constant $H^\prime$ at water temperature (e.g. 0.40 for TCE, 0.70 for PCE, 0.22 for Benzene).',
      'Enter volumetric Air-to-Water flow ratio $G/L$ (typically 30–100).',
      'Enter Number of Transfer Units (NTU) corresponding to packing media depth.',
      'Inspect VOC removal stripping efficiency $\eta\%$ and stripping factor R.'
    ],
    benefitTitle: 'Groundwater VOC Remediation Packed Tower Standard',
    benefitContent: 'Mass transfer equation for designing counter-current packed aeration columns to strip carcinogenic volatile chlorinated solvents (TCE, PCE) from contaminated Superfund groundwater aquifers.',
    faqs: [{ q: 'What is the optimal design rule for Stripping Factor R?', a: 'Standard engineering design targets $R = H^\prime (G/L) \ge 3.0$ to $5.0$, ensuring air never reaches VOC equilibrium saturation.' }]
  },

  // 24. Water Treatment Rapid Mix Coagulation Velocity Gradient (Camp G-Value) Calculator
  {
    slug: 'coagulation-flocculation-velocity-gradient-g-value-calculator',
    name: 'Water Treatment Rapid Mix Coagulation Velocity Gradient (Camp G-Value) Calculator',
    description: 'Calculate drinking water rapid mix coagulation and flocculation velocity gradient G in s⁻¹ (Camp Equation: G = √(P / (μ·V))), Camp Number G·t dimensionless mixing parameter, and mechanical mixer motor power P.',
    category: 'Science',
    icon: 'text',
    keywords: ['camp g value calculator', 'velocity gradient formula g equals sqrt p over mu v online', 'camp number gt rapid mix flocculation calculator', 'coagulation mixer power dissipation water treatment calculator', 'environmental civil engineering water treatment online'],
    order: 1358,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dissipated Mixer Power P (Watts), Basin Volume V (m³), Water Temp T (°C) & Retention Time t (s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cg-p">Mixer Power P (W)</label>
          <input class="tool-textarea" id="cg-p" type="number" step="250" value="1500.0" placeholder="1500.0 Watts" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-v">Basin Volume V (m³)</label>
          <input class="tool-textarea" id="cg-v" type="number" step="1" value="3.0" placeholder="3.0 m³ Rapid Mix" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-t">Retention Time t (s)</label>
          <input class="tool-textarea" id="cg-t" type="number" step="5" value="30.0" placeholder="30.0 s Retention" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-temp">Water Temp (°C)</label>
          <input class="tool-textarea" id="cg-temp" type="number" step="5" value="20" placeholder="20 °C" />
        </div>
      </div>
      <div id="cg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cg-res-g" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Velocity Gradient G = 705 s⁻¹</span>
            <span class="stat-label">Camp Velocity Gradient (G = √(P / (μ · V)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cg-res-gt" style="color:var(--green-dark); font-weight:700;">Camp Number G·t = 21,150 (RAPID MIX COAGULATION: Target G = 700 - 1000 s⁻¹ ✓)</span>
            <span class="stat-label">Camp Number (G · t Dimensionless Mixing Energy Index)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('cg-p'), vEl = document.getElementById('cg-v');
  const tEl = document.getElementById('cg-t'), tmEl = document.getElementById('cg-temp');
  const gResEl = document.getElementById('cg-res-g'), gtResEl = document.getElementById('cg-res-gt');

  function update() {
    const P_watts = parseFloat(pEl.value), V_m3 = parseFloat(vEl.value);
    const t_sec = parseFloat(tEl.value), T_C = parseFloat(tmEl.value);

    if (isNaN(P_watts) || isNaN(V_m3) || isNaN(t_sec) || isNaN(T_C) || P_watts <= 0 || V_m3 <= 0 || t_sec <= 0) return;

    // Water dynamic viscosity: mu = 1.002e-3 Pa*s @ 20°C
    const mu = (1.787 / (1.0 + 0.0337 * T_C + 0.000221 * Math.pow(T_C, 2))) * 1e-3;

    // Camp velocity gradient: G = sqrt( P / (mu * V) )  [s^-1]
    const G = Math.sqrt(P_watts / (mu * V_m3));

    // Camp dimensionless number: G * t
    const G_t = G * t_sec;

    let regime = '', color = '#22543d';
    if (G >= 500.0) {
      regime = 'RAPID MIX FLASH COAGULATION (G = 600 - 1000 s⁻¹: Alum/Ferric dispersion ✓)';
      color = '#22543d';
    } else if (G >= 50.0 && G <= 100.0) {
      regime = 'STAGE 1 FLOCCULATION (G = 50 - 100 s⁻¹: Gentle floc growth)';
      color = '#22543d';
    } else if (G >= 20.0 && G < 50.0) {
      regime = 'STAGE 2/3 FLOCCULATION (G = 20 - 50 s⁻¹: Prevents floc shear breakup)';
      color = '#22543d';
    } else {
      regime = 'VERY SLOW MIXING (G < 20 s⁻¹)';
      color = '#ea580c';
    }

    gResEl.textContent = 'Velocity Gradient G = ' + Math.round(G).toLocaleString() + ' s⁻¹';
    gtResEl.textContent = 'Camp G·t = ' + Math.round(G_t).toLocaleString() + ' (' + regime.split(' (')[0] + ' @ μ=' + (mu*1000).toFixed(3) + ' mPa·s)';
    gtResEl.style.color = color;
  }

  [pEl, vEl, tEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter power dissipated into the water by the mechanical impeller P in Watts.',
      'Enter mixing chamber basin volume V in $\text{m}^3$.',
      'Enter water hydraulic retention mixing time t in seconds.',
      'Enter water temperature in $^\circ\text{C}$.',
      'Inspect Camp velocity gradient G in $\text{s}^{-1}$ and dimensionless Camp mixing index $G\cdot t$.'
    ],
    benefitTitle: 'Thomas R. Camp 1943 Velocity Gradient Standard',
    benefitContent: 'Balances particle collision frequency ($G$) against hydraulic shear stress to achieve microsecond coagulant chemical dispersion in rapid mix tanks ($G > 700\text{ s}^{-1}$) and gentle floc growth in flocculators ($G \approx 30\text{ s}^{-1}$).',
    faqs: [{ q: 'Why must G be decreased in tapered flocculation basins?', a: 'As floc aggregates grow larger, their structural shear strength weakens; decreasing G prevents hydrodynamic shear tearing of flocs.' }]
  },

  // 25. Solid Waste Composting Carbon-to-Nitrogen (C:N Ratio) Calculator
  {
    slug: 'composting-carbon-nitrogen-cn-ratio-moisture-calculator',
    name: 'Solid Waste Composting Carbon-to-Nitrogen (C:N Ratio & Moisture Balance) Calculator',
    description: 'Calculate municipal organic solid waste and agricultural composting blended Carbon-to-Nitrogen C:N ratio (optimal 25:1 to 30:1), blend moisture content (50% to 60%), and recipe balancing between greens (nitrogen-rich) and browns (carbon-rich).',
    category: 'Science',
    icon: 'text',
    keywords: ['compost cn ratio calculator', 'carbon to nitrogen ratio composting formula online', 'compost moisture balance recipe calculator', 'greens and browns carbon nitrogen ratio calculator', 'solid waste environmental engineering agriculture online'],
    order: 1359,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Green Material (e.g. Food Waste: C:N 15:1, 75% Moisture) & Brown Material (e.g. Wood Chips: C:N 400:1, 20% Moisture)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cp-mg">Green Mass (kg)</label>
          <input class="tool-textarea" id="cp-mg" type="number" step="50" value="300.0" placeholder="300.0 kg Food Waste" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-cng">Green C:N</label>
          <input class="tool-textarea" id="cp-cng" type="number" step="2" value="15.0" placeholder="15 (C:N 15:1)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-wg">Green Moist (%)</label>
          <input class="tool-textarea" id="cp-wg" type="number" step="5" value="75.0" placeholder="75.0% Moisture" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-mb">Brown Mass (kg)</label>
          <input class="tool-textarea" id="cp-mb" type="number" step="25" value="100.0" placeholder="100.0 kg Woodchips" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-cnb">Brown C:N</label>
          <input class="tool-textarea" id="cp-cnb" type="number" step="50" value="300.0" placeholder="300 (C:N 300:1)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-wb">Brown Moist (%)</label>
          <input class="tool-textarea" id="cp-wb" type="number" step="5" value="20.0" placeholder="20.0% Moisture" />
        </div>
      </div>
      <div id="cp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cp-res-cn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Blended C:N Ratio = 28.6 : 1 (OPTIMAL COMPOST RECIPE)</span>
            <span class="stat-label">Blended Carbon-to-Nitrogen Ratio (Target: 25:1 to 30:1)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cp-res-moist" style="color:var(--green-dark); font-weight:700;">Blend Moisture = 61.3% (Ideal: 50% - 60% for thermophilic aerobic composting ✓)</span>
            <span class="stat-label">Total Pile Blended Moisture Content by Weight</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mgEl = document.getElementById('cp-mg'), cngEl = document.getElementById('cp-cng'), wgEl = document.getElementById('cp-wg');
  const mbEl = document.getElementById('cp-mb'), cnbEl = document.getElementById('cp-cnb'), wbEl = document.getElementById('cp-wb');
  const cnResEl = document.getElementById('cp-res-cn'), msResEl = document.getElementById('cp-res-moist');

  function update() {
    const Mg = parseFloat(mgEl.value), CNg = parseFloat(cngEl.value), Wg_pct = parseFloat(wgEl.value);
    const Mb = parseFloat(mbEl.value), CNb = parseFloat(cnbEl.value), Wb_pct = parseFloat(wbEl.value);

    if (isNaN(Mg) || isNaN(CNg) || isNaN(Wg_pct) || isNaN(Mb) || isNaN(CNb) || isNaN(Wb_pct) || Mg <= 0 || CNg <= 0 || Mb <= 0 || CNb <= 0) return;

    // Dry mass:
    const dry_g = Mg * (1.0 - (Wg_pct / 100.0));
    const dry_b = Mb * (1.0 - (Wb_pct / 100.0));

    // Assume carbon is approx 50% of dry organic matter:
    const C_g = 0.50 * dry_g;
    const N_g = C_g / CNg;

    const C_b = 0.50 * dry_b;
    const N_b = C_b / CNb;

    // Blended C:N ratio:
    const total_C = C_g + C_b;
    const total_N = N_g + N_b;
    const blended_CN = total_C / total_N;

    // Blended moisture:
    const total_water = (Mg * (Wg_pct / 100.0)) + (Mb * (Wb_pct / 100.0));
    const blended_moisture_pct = (total_water / (Mg + Mb)) * 100.0;

    let eval_cn = '', color = '#22543d';
    if (blended_CN >= 25.0 && blended_CN <= 35.0) {
      eval_cn = 'OPTIMAL C:N (25:1 - 35:1: Rapid thermophilic decomposition without odor ✓)';
      color = '#22543d';
    } else if (blended_CN < 25.0) {
      eval_cn = 'TOO MUCH NITROGEN (< 25:1: Ammonia odor & fly nuisance: Add more browns)';
      color = '#ea580c';
    } else {
      eval_cn = 'TOO MUCH CARBON (> 35:1: Slow decomposition rate: Add more nitrogen greens)';
      color = '#ea580c';
    }

    cnResEl.textContent = 'Blended C:N Ratio = ' + blended_CN.toFixed(1) + ' : 1';
    cnResEl.style.color = color;
    msResEl.textContent = 'Moisture = ' + blended_moisture_pct.toFixed(1) + '% (' + eval_cn.split(' (')[0] + ' | Total Weight = ' + (Mg + Mb) + ' kg)';
  }

  [mgEl, cngEl, wgEl, mbEl, cnbEl, wbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter wet mass of green nitrogenous feedstock (food waste, grass, manure) in kg.',
      'Enter Green C:N ratio (typically 12:1 to 20:1) and moisture percentage ($70\%\text{ to }85\%$).',
      'Enter wet mass of brown carbonaceous bulking agent (woodchips, dry leaves, straw, sawdust) in kg.',
      'Enter Brown C:N ratio (typically 200:1 to 500:1) and moisture percentage ($15\%\text{ to }25\%$).',
      'Inspect blended composite C:N ratio and pile moisture percentage.'
    ],
    benefitTitle: 'Thermophilic Composting Microbiological Balance',
    benefitContent: 'Maintains the stoichiometric carbon energy-to-nitrogen protein ratio needed by thermophilic bacteria ($55^\circ\text{C}$ to $65^\circ\text{C}$) to sanitize pathogens and produce fertile humic compost without foul ammonia odors.',
    faqs: [{ q: 'What happens if the C:N ratio drops below 20:1?', a: 'Excess nitrogen cannot be assimilated by bacteria and volatilizes into foul ammonia gas ($\text{NH}_3$), causing severe odor problems and nitrogen loss.' }]
  }
];

pack48Tools.forEach(createTool);
console.log('Pack 48 complete: ' + pack48Tools.length + ' tools created.');
