const { createTool } = require('./generate-curated-tools.cjs');

// Suite DDD: 5 Tools in Environmental Engineering, Wastewater Treatment & Water Disinfection to reach 588 tools
const toolsSuiteDDD = [
  // 1. Biochemical Oxygen Demand (BOD₅) Reaction Kinetics Calculator
  {
    slug: 'biochemical-oxygen-demand-bod5-kinetics-calculator',
    name: 'Biochemical Oxygen Demand (BOD₅ & Ultimate BOD) Calculator',
    description: 'Calculate exerted biochemical oxygen demand (BOD_t = BOD_u · (1 - e^(-k · t))) in mg/L, ultimate carbonaceous BOD (BOD_u), and temperature-corrected reaction rate constant k_T.',
    category: 'Science',
    icon: 'text',
    keywords: ['bod5 calculator', 'biochemical oxygen demand kinetics formula', 'ultimate bod bodu calculator', 'wastewater bod reaction rate k online', 'streeter phelps bod exertion calculator'],
    order: 461,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '5-Day BOD₅ (mg/L), Reaction Constant k₂₀ (day⁻¹) & Temperature (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bod-5">Measured BOD₅ (mg/L)</label>
          <input class="tool-textarea" id="bod-5" type="number" step="any" value="200" placeholder="200 mg/L (Municipal Raw)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bod-k">Rate Constant k₂₀ (day⁻¹)</label>
          <input class="tool-textarea" id="bod-k" type="number" step="0.01" value="0.23" placeholder="0.23 day⁻¹ (Base e)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bod-temp">Water Temp (°C)</label>
          <input class="tool-textarea" id="bod-temp" type="number" step="any" value="20" placeholder="20 °C" />
        </div>
      </div>
      <div id="bod-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bod-res-bodu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">292.6 mg / L</span>
            <span class="stat-label">Ultimate Carbonaceous BOD (BOD_u)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bod-res-frac" style="font-weight:700;">68.3% Exerted in 5 Days</span>
            <span class="stat-label">5-Day Exertion Fraction (1 - e^(-5k))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const b5El = document.getElementById('bod-5'), kEl = document.getElementById('bod-k'), tEl = document.getElementById('bod-temp');
  const uResEl = document.getElementById('bod-res-bodu'), fResEl = document.getElementById('bod-res-frac');

  function update() {
    const bod5 = parseFloat(b5El.value), k20 = parseFloat(kEl.value), tempC = parseFloat(tEl.value);
    if (isNaN(bod5) || isNaN(k20) || isNaN(tempC) || bod5 <= 0 || k20 <= 0) return;

    // Temperature correction: k_T = k_20 * theta^(T - 20) where theta = 1.047
    const kT = k20 * Math.pow(1.047, tempC - 20);

    // BOD_5 = BOD_u * (1 - exp(-5 * kT)) => BOD_u = BOD_5 / (1 - exp(-5 * kT))
    const exertionFraction = 1 - Math.exp(-5 * kT);
    const bodU = bod5 / exertionFraction;

    uResEl.textContent = bodU.toFixed(1) + ' mg / L Ultimate BOD';
    fResEl.textContent = (exertionFraction * 100).toFixed(1) + '% Exerted at ' + tempC + '°C (k_T = ' + kT.toFixed(3) + ' d⁻¹)';
  }

  [b5El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter measured laboratory 5-day standard Biochemical Oxygen Demand (BOD₅) in mg/L.',
      'Enter base-e degradation kinetic rate constant k₂₀ at 20°C (typically 0.20 to 0.25 day⁻¹ for domestic wastewater).',
      'Enter river/wastewater ambient temperature in Celsius.',
      'Inspect total ultimate carbonaceous oxygen demand (BOD_u) and exerted fraction.'
    ],
    benefitTitle: 'First-Order Organic Decomposition Kinetics',
    benefitContent: 'Microorganisms consume dissolved oxygen to oxidize organic matter following first-order kinetics (d[BOD]/dt = -k·BOD); standard 5-day BOD captures ~68% of total ultimate carbonaceous oxygen demand at 20°C.',
    faqs: [{ q: 'Why is 5 days the standard incubation period for BOD tests?', a: 'Five days was chosen historically in Great Britain because no British river takes more than 5 days to reach the sea from source, and 5 days avoids interference from secondary nitrifying bacteria.' }]
  },

  // 2. Activated Sludge Food-to-Microorganism (F/M) Ratio Calculator
  {
    slug: 'activated-sludge-food-to-mass-fm-ratio-calculator',
    name: 'Activated Sludge Food-to-Microorganism (F/M) Ratio Calculator',
    description: 'Calculate biological loading ratio (F/M = (Q · BOD_in) / (V · MLVSS)) in lb BOD / (lb MLVSS · day) or kg/kg·day for wastewater treatment plant aeration basins.',
    category: 'Science',
    icon: 'text',
    keywords: ['fm ratio calculator', 'food to microorganism ratio formula', 'activated sludge biological loading calculator', 'mlvss aeration basin bod loading online', 'wastewater treatment fm ratio calculator'],
    order: 462,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Q (MGD), Influent BOD (mg/L), Tank Volume (MG) & MLVSS (mg/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fm-q">Plant Flow Q (MGD)</label>
          <input class="tool-textarea" id="fm-q" type="number" step="any" value="5.0" placeholder="5.0 MGD" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fm-bod">Influent BOD (mg/L)</label>
          <input class="tool-textarea" id="fm-bod" type="number" step="any" value="220" placeholder="220 mg/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fm-v">Aeration Vol V (MG)</label>
          <input class="tool-textarea" id="fm-v" type="number" step="any" value="1.5" placeholder="1.5 MG (Million Gal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fm-mlvss">MLVSS Conc (mg/L)</label>
          <input class="tool-textarea" id="fm-mlvss" type="number" step="any" value="2500" placeholder="2500 mg/L" />
        </div>
      </div>
      <div id="fm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fm-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F/M = 0.293</span>
            <span class="stat-label">Food-to-Mass Ratio (day⁻¹)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fm-res-regime" style="color:var(--green-dark); font-weight:700;">Standard Conventional Activated Sludge</span>
            <span class="stat-label">Process Operating Mode</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('fm-q'), bEl = document.getElementById('fm-bod');
  const vEl = document.getElementById('fm-v'), mEl = document.getElementById('fm-mlvss');
  const rResEl = document.getElementById('fm-res-ratio'), rgResEl = document.getElementById('fm-res-regime');

  function update() {
    const Q = parseFloat(qEl.value), bodMgL = parseFloat(bEl.value);
    const V = parseFloat(vEl.value), mlvssMgL = parseFloat(mEl.value);

    if (isNaN(Q) || isNaN(bodMgL) || isNaN(V) || isNaN(mlvssMgL) || Q <= 0 || bodMgL <= 0 || V <= 0 || mlvssMgL <= 0) return;

    // F (lbs BOD / day) = Q * BOD * 8.34
    // M (lbs MLVSS) = V * MLVSS * 8.34
    // F/M = (Q * BOD) / (V * MLVSS)
    const fm = (Q * bodMgL) / (V * mlvssMgL);
    const foodLbsDay = Q * bodMgL * 8.34;
    const massLbs = V * mlvssMgL * 8.34;

    rResEl.textContent = 'F/M = ' + fm.toFixed(3) + ' lb BOD / (lb MLVSS·d)';

    if (fm < 0.05) {
      rgResEl.textContent = 'Extended Aeration / Total Oxidation (F/M < 0.10)';
      rgResEl.style.color = '#2563eb';
    } else if (fm >= 0.05 && fm <= 0.15) {
      rgResEl.textContent = 'Extended Aeration / Oxidation Ditch (F/M 0.05 - 0.15)';
      rgResEl.style.color = '#22543d';
    } else if (fm > 0.15 && fm <= 0.40) {
      rgResEl.textContent = 'Conventional Complete-Mix / Plug-Flow (F/M 0.2 - 0.4: Optimal)';
      rgResEl.style.color = '#22543d';
    } else if (fm > 0.40 && fm <= 1.0) {
      rgResEl.textContent = 'High-Rate Activated Sludge (F/M 0.4 - 1.0)';
      rgResEl.style.color = '#d97706';
    } else {
      rgResEl.textContent = 'Severe Organic Overload! (F/M > 1.0: Sludge Bulking Risk)';
      rgResEl.style.color = '#c53030';
    }
  }

  [qEl, bEl, vEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw wastewater influent flow rate Q in Million Gallons per Day (MGD).',
      'Enter primary effluent / influent BOD concentration in mg/L.',
      'Enter aeration basin volume V in Million Gallons (MG).',
      'Enter Mixed Liquor Volatile Suspended Solids (MLVSS) active bacterial biomass in mg/L (typically 2,000 to 3,500 mg/L).',
      'Inspect calculated F/M ratio and operational process mode (Conventional, Extended Aeration, or High-Rate).'
    ],
    benefitTitle: 'Bacterial Food-to-Microorganism Balance',
    benefitContent: 'Maintaining the F/M ratio within design target limits (0.2 to 0.4 for conventional activated sludge) ensures rapid organic carbon removal while producing dense, readily settleable bacterial flocs in secondary clarifiers.',
    faqs: [{ q: 'What happens if F/M ratio is too high?', a: 'When F/M > 0.5, bacteria enter the log-growth phase with excess dispersed growth, causing cloudy effluent and poor settling.' }]
  },

  // 3. Clarifier Surface Overflow Rate (SOR) & Weir Loading Rate Calculator
  {
    slug: 'clarifier-surface-overflow-rate-sor-calculator',
    name: 'Clarifier Surface Overflow Rate (SOR) & Weir Loading Calculator',
    description: 'Calculate secondary sedimentation clarifier Surface Overflow Rate (SOR = Q / A_surface) in gpd/ft² (m³/(m²·day)) and circular peripheral weir loading rate.',
    category: 'Science',
    icon: 'text',
    keywords: ['clarifier surface overflow rate calculator', 'sor wastewater clarifier formula', 'sedimentation tank overflow rate gpd ft2', 'circular clarifier weir loading rate calculator', 'clarifier surface settling rate online'],
    order: 463,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Q (MGD) & Clarifier Tank Diameter D (Feet or Meters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sor-q">Peak Flow Q (MGD)</label>
          <input class="tool-textarea" id="sor-q" type="number" step="any" value="4.0" placeholder="4.0 MGD" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sor-diam">Tank Diameter D (Feet)</label>
          <input class="tool-textarea" id="sor-diam" type="number" step="any" value="90" placeholder="90 ft (Circular Clarifier)" />
        </div>
      </div>
      <div id="sor-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sor-res-sor" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">628.7 gpd / ft²</span>
            <span class="stat-label">Surface Overflow Rate (SOR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sor-res-metric" style="font-weight:700;">25.6 m³ / (m²·day)</span>
            <span class="stat-label">Metric Surface Settling Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sor-res-weir">14,147 gpd / ft</span>
            <span class="stat-label">Weir Loading Rate (Q / πD)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('sor-q'), dEl = document.getElementById('sor-diam');
  const sorResEl = document.getElementById('sor-res-sor'), metResEl = document.getElementById('sor-res-metric'), wResEl = document.getElementById('sor-res-weir');

  function update() {
    const qMgd = parseFloat(qEl.value), dFt = parseFloat(dEl.value);
    if (isNaN(qMgd) || isNaN(dFt) || qMgd <= 0 || dFt <= 0) return;

    const qGpd = qMgd * 1e6;
    // Surface Area A = pi * (d^2) / 4 (sq ft)
    const areaSqFt = (Math.PI * Math.pow(dFt, 2)) / 4;
    // Surface Overflow Rate (SOR) = Q / A (gpd / sq ft)
    const sorGpdSqFt = qGpd / areaSqFt;
    // Convert to m^3 / (m^2 * day): 1 gpd/sq ft = 0.04074 m^3/(m^2*d)
    const sorMetric = sorGpdSqFt * 0.0407458;

    // Peripheral weir perimeter = pi * D (ft)
    const weirPerimFt = Math.PI * dFt;
    const weirLoadingGpdFt = qGpd / weirPerimFt;

    sorResEl.textContent = Math.round(sorGpdSqFt).toLocaleString() + ' gpd / ft²';

    if (sorGpdSqFt <= 800) {
      sorResEl.style.color = '#22543d';
    } else if (sorGpdSqFt <= 1200) {
      sorResEl.style.color = '#d97706';
    } else {
      sorResEl.style.color = '#c53030';
    }

    metResEl.textContent = sorMetric.toFixed(1) + ' m³ / (m²·day) (' + (sorGpdSqFt <= 800 ? 'Within EPA Standard' : 'High Rate') + ')';
    wResEl.textContent = Math.round(weirLoadingGpdFt).toLocaleString() + ' gpd / linear ft (Max 20,000 limit)';
  }

  qEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter wastewater plant daily peak flow rate Q in Million Gallons per Day (MGD).',
      'Enter circular sedimentation clarifier tank diameter in feet.',
      'Inspect Surface Overflow Rate (gpd/ft²), metric settling flux (m³/(m²·day)), and peripheral effluent weir loading rate.'
    ],
    benefitTitle: 'Hazen\'s Surface Settling Principle',
    benefitContent: 'According to Allen Hazen\'s sedimentation theory, a particle settles out of suspension if its discrete settling velocity exceeds the upward fluid velocity, which is governed exclusively by the surface overflow rate (SOR = Q/A) regardless of tank depth.',
    faqs: [{ q: 'What is the standard EPA design SOR for secondary clarifiers?', a: 'Standard design peak overflow rate is typically 600 to 800 gpd/ft² (1,000 to 1,200 gpd/ft² peak hourly flow) to prevent sludge solids washout.' }]
  },

  // 4. Wastewater Hydraulic Retention Time (HRT) Calculator
  {
    slug: 'wastewater-hydraulic-retention-time-hrt-calculator',
    name: 'Wastewater Hydraulic Retention Time (HRT) Calculator',
    description: 'Calculate liquid hydraulic retention / detention time (HRT = V / Q) in hours and minutes for wastewater treatment basins, contact tanks, and digesters.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydraulic retention time calculator', 'hrt formula wastewater', 'detention time v over q calculator', 'aeration basin retention time hours online', 'hydraulic residence time calculator'],
    order: 464,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Basin Volume (m³ or Gallons) & Flow Rate (MGD or m³/hr)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hrt-v">Basin Volume V (m³)</label>
          <input class="tool-textarea" id="hrt-v" type="number" step="any" value="2500" placeholder="2500 m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hrt-q">Flow Rate Q (m³ / hour)</label>
          <input class="tool-textarea" id="hrt-q" type="number" step="any" value="400" placeholder="400 m³/hr" />
        </div>
      </div>
      <div id="hrt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hrt-res-hours" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">6.25 Hours</span>
            <span class="stat-label">Hydraulic Retention Time (HRT)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hrt-res-mins" style="font-weight:700;">375 Minutes (0.26 Days)</span>
            <span class="stat-label">Mean Fluid Residence Duration</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('hrt-v'), qEl = document.getElementById('hrt-q');
  const hResEl = document.getElementById('hrt-res-hours'), mResEl = document.getElementById('hrt-res-mins');

  function update() {
    const V = parseFloat(vEl.value), Q = parseFloat(qEl.value);
    if (isNaN(V) || isNaN(Q) || V <= 0 || Q <= 0) return;

    // HRT = V / Q (hours)
    const hrtHours = V / Q;
    const hrtMins = hrtHours * 60;
    const hrtDays = hrtHours / 24;

    hResEl.textContent = hrtHours.toFixed(2) + ' Hours';
    mResEl.textContent = Math.round(hrtMins) + ' Minutes (' + hrtDays.toFixed(2) + ' Days Mean Detention)';
  }

  vEl.addEventListener('input', update);
  qEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter biological basin or wet well volume in cubic meters (m³).',
      'Enter continuous fluid flow rate in cubic meters per hour (m³/hr).',
      'Inspect mean hydraulic retention time (HRT) in hours, minutes, and days.'
    ],
    benefitTitle: 'Process Biological Reaction Contact Sizing',
    benefitContent: 'Hydraulic retention time guarantees sufficient contact duration for nitrifying bacteria and heterotrophs to biologically break down dissolved pollutants before water exits the tank.',
    faqs: [{ q: 'What is typical HRT for conventional activated sludge aeration basins?', a: 'Typical municipal activated sludge aeration basin HRT is 4 to 8 hours (extended aeration runs 18 to 24 hours).' }]
  },

  // 5. Drinking Water Chlorine Disinfection (CT Value) Calculator
  {
    slug: 'chlorine-contact-disinfection-ct-value-calculator',
    name: 'Drinking Water Chlorine Disinfection (CT Value) Calculator',
    description: 'Calculate EPA disinfection contact value (CT = C · T₁₀) in mg·min/L and verify pathogen log-inactivation (Giardia lamblia, viruses) from residual chlorine and contact time.',
    category: 'Science',
    icon: 'text',
    keywords: ['chlorine ct calculator', 'epa ct disinfection value formula', 'giardia log inactivation ct calculator', 'free chlorine residual contact time online', 'drinking water disinfection ct calculator'],
    order: 465,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Free Chlorine Residual C (mg/L), Contact Time T₁₀ (min) & Pathogen Target',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ct-c">Free Residual C (mg/L)</label>
          <input class="tool-textarea" id="ct-c" type="number" step="0.1" value="1.5" placeholder="1.5 mg/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-t">Baffled Time T₁₀ (min)</label>
          <input class="tool-textarea" id="ct-t" type="number" step="any" value="30" placeholder="30 min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-path">Pathogen Target</label>
          <select class="tool-textarea" id="ct-path">
            <option value="104" selected>3-Log (99.9%) Giardia lamblia (Req CT ≈ 104 @ 10°C, pH 7.5)</option>
            <option value="6">4-Log (99.99%) Viruses (Req CT ≈ 6 @ 10°C)</option>
          </select>
        </div>
      </div>
      <div id="ct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ct-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">45.0 mg·min / L</span>
            <span class="stat-label">Delivered Disinfection CT Value</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ct-res-status" style="color:#d97706; font-weight:700;">43.3% of 3-Log Giardia Target</span>
            <span class="stat-label">EPA Safe Drinking Water Compliance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('ct-c'), tEl = document.getElementById('ct-t'), pEl = document.getElementById('ct-path');
  const ctResEl = document.getElementById('ct-res-val'), stResEl = document.getElementById('ct-res-status');

  function update() {
    const C = parseFloat(cEl.value), T10 = parseFloat(tEl.value), reqCT = parseFloat(pEl.value);
    if (isNaN(C) || isNaN(T10) || isNaN(reqCT) || C <= 0 || T10 <= 0) return;

    // CT = C * T10 (mg*min / L)
    const ctDelivered = C * T10;
    const ratio = ctDelivered / reqCT;
    const pct = ratio * 100;

    ctResEl.textContent = ctDelivered.toFixed(1) + ' mg·min / L (C · T₁₀)';

    if (ctDelivered >= reqCT) {
      stResEl.textContent = 'COMPLIES (' + pct.toFixed(1) + '% of Required CT: Safe 3-Log Kill)';
      stResEl.style.color = '#22543d';
    } else {
      stResEl.textContent = 'DEFICIT (' + pct.toFixed(1) + '% of Required ' + reqCT + ' mg·min/L Target)';
      stResEl.style.color = '#c53030';
    }
  }

  [cEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter measured free available residual chlorine concentration C in mg/L (ppm).',
      'Enter T₁₀ effective baffled contact time in minutes (time for 10% of water to pass through pipe/clearwell).',
      'Select pathogen inactivation target (3-log Giardia or 4-log Virus).',
      'Inspect achieved CT disinfection product in mg·min/L and EPA compliance ratio.'
    ],
    benefitTitle: 'Chick-Watson Chemical Disinfection Law',
    benefitContent: 'Under EPA Safe Drinking Water Act rules, pathogen disinfection follows the Chick-Watson law: germicidal kill depends on the product of disinfectant concentration C and contact exposure time T₁₀ ($CT = C\cdot T_{10}$).',
    faqs: [{ q: 'What is T₁₀ contact time?', a: 'T₁₀ is the detention time through a clearwell basin at peak hourly flow through which 90% of water remains in the tank (10% has exited), accounting for short-circuiting.' }]
  }
];

toolsSuiteDDD.forEach(createTool);
console.log('Suite DDD complete: 5 tools created.');
