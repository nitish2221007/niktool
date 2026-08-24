const { createTool } = require('./generate-curated-tools.cjs');

// Pack 37: 25 Civil, Structural, Geotechnical, Hydraulic, Transportation & Environmental Engineering Calculators (Tools 1176 to 1200)
const pack37Tools = [
  // 1. Concrete Mix Design Water-Cement Ratio (ACI 211.1) Calculator
  {
    slug: 'concrete-mix-design-water-cement-ratio-aci-211-calculator',
    name: 'Concrete Mix Design (ACI 211.1 Water-Cement Ratio & Batch Quantities) Calculator',
    description: 'Calculate standard concrete batch proportions per cubic meter (Cement, Water, Coarse Gravel, Fine Sand in kg/m³) from target compressive strength f\'_c in MPa using ACI 211.1 standards for civil engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['concrete mix design calculator', 'aci 211 water cement ratio formula online', 'concrete batch proportioning cement sand gravel water calculator kg m3', 'compressive strength fc target mix design calculator', 'civil engineering concrete mix design online'],
    order: 1057,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target 28-Day Strength f\'_c (MPa), Slump (mm), Max Aggregate Size (mm) & Volume (m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cm-fc">Target f\'_c (MPa)</label>
          <input class="tool-textarea" id="cm-fc" type="number" step="5" value="30.0" placeholder="30.0 MPa (C30/37)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cm-vol">Volume (m³)</label>
          <input class="tool-textarea" id="cm-vol" type="number" step="0.5" value="1.0" placeholder="1.0 m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cm-slump">Slump (mm)</label>
          <input class="tool-textarea" id="cm-slump" type="number" step="25" value="100" placeholder="100 mm (Medium)" />
        </div>
      </div>
      <div id="cm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cm-res-cement" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cement = 380 kg | Water = 190 kg (w/c = 0.50)</span>
            <span class="stat-label">Binder & Water Proportions (w/c = 0.50)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cm-res-agg" style="color:var(--green-dark); font-weight:700;">Gravel Aggregate = 1,120 kg | Sand = 710 kg (Total Wet Density = 2,400 kg/m³)</span>
            <span class="stat-label">Coarse & Fine Aggregate Batch Weights per 1.0 m³</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fcEl = document.getElementById('cm-fc'), volEl = document.getElementById('cm-vol'), slEl = document.getElementById('cm-slump');
  const cmResEl = document.getElementById('cm-res-cement'), agResEl = document.getElementById('cm-res-agg');

  function update() {
    const fc = parseFloat(fcEl.value), vol = parseFloat(volEl.value), slump = parseFloat(slEl.value);
    if (isNaN(fc) || isNaN(vol) || isNaN(slump) || fc <= 0 || vol <= 0) return;

    // ACI 211.1 empirical w/c ratio correlation:
    // w/c approx = 1.15 - 0.0215 * fc (capped between 0.35 and 0.65)
    let wc = Math.max(0.35, Math.min(0.65, 1.15 - (0.0215 * fc)));

    // Standard water demand for 100 mm slump: ~190 kg/m^3
    let water_kg_m3 = 190.0 + ((slump - 100.0) / 25.0) * 5.0;
    let cement_kg_m3 = water_kg_m3 / wc;

    // Coarse gravel: ~1120 kg/m^3, Fine sand: remainder to reach ~2400 kg/m^3
    let gravel_kg_m3 = 1120.0;
    let sand_kg_m3 = Math.max(500.0, 2400.0 - cement_kg_m3 - water_kg_m3 - gravel_kg_m3);

    const totalCement = Math.round(cement_kg_m3 * vol);
    const totalWater = Math.round(water_kg_m3 * vol);
    const totalGravel = Math.round(gravel_kg_m3 * vol);
    const totalSand = Math.round(sand_kg_m3 * vol);

    cmResEl.textContent = 'Cement = ' + totalCement + ' kg | Water = ' + totalWater + ' kg (w/c = ' + wc.toFixed(2) + ')';
    agResEl.textContent = 'Gravel = ' + totalGravel + ' kg | Sand = ' + totalSand + ' kg (Batch for ' + vol + ' m³ @ target ' + fc + ' MPa)';
  }

  [fcEl, volEl, slEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter 28-day characteristic compressive strength $f\'_c$ in MPa (e.g. 25, 30, 40 MPa).',
      'Enter total ready-mix concrete batch volume in cubic meters ($\text{m}^3$).',
      'Enter required workability slump in millimeters (e.g. 100 mm).',
      'Inspect calculated batch weights for Portland Cement, Water, Coarse Gravel, and Fine Sand.'
    ],
    benefitTitle: 'Abrams Law of Water-Cement Ratio & ACI 211.1 Mix Standard',
    benefitContent: 'Duff Abrams proved in 1918 that concrete compressive strength is determined primarily by the water-cement ratio ($f\'_c \propto \frac{1}{(w/c)}$); reducing $w/c$ from 0.60 to 0.40 nearly doubles structural concrete load-bearing strength.',
    faqs: [{ q: 'What is the standard ratio of cement to sand to gravel in nominal mix concrete?', a: 'Standard M20 nominal concrete uses a 1 : 1.5 : 3 volumetric proportion (1 part cement : 1.5 parts sand : 3 parts coarse aggregate).' }]
  },

  // 2. Reinforced Concrete Beam Ultimate Moment Capacity (ACI 318 Whitney Stress Block) Calculator
  {
    slug: 'reinforced-concrete-beam-ultimate-moment-capacity-aci-318-calculator',
    name: 'Reinforced Concrete Beam Flexural Capacity (ACI 318 Whitney Stress Block M_n) Calculator',
    description: 'Calculate singly reinforced concrete rectangular beam nominal flexural bending strength (M_n = A_s·f_y·(d - a/2)) in kN·m, equivalent Whitney stress block depth a, and design capacity (φ·M_n) under ACI 318.',
    category: 'Science',
    icon: 'text',
    keywords: ['reinforced concrete beam calculator', 'aci 318 nominal flexural moment capacity whitney stress block online', 'singly reinforced beam steel area as mn calculator', 'concrete beam design phi mn kn m calculator', 'structural engineering reinforced concrete bending online'],
    order: 1058,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Beam Width b (mm), Effective Depth d (mm), Steel Rebar Area A_s (mm²), f\'_c (MPa) & f_y (MPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rc-b">Width b (mm)</label>
          <input class="tool-textarea" id="rc-b" type="number" step="25" value="300" placeholder="300 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-d">Depth d (mm)</label>
          <input class="tool-textarea" id="rc-d" type="number" step="25" value="500" placeholder="500 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-as">Steel A_s (mm²)</label>
          <input class="tool-textarea" id="rc-as" type="number" step="100" value="1200" placeholder="1200 mm² (e.g. 4 #20)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-fc">f\'_c (MPa)</label>
          <input class="tool-textarea" id="rc-fc" type="number" step="5" value="30.0" placeholder="30.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-fy">Rebar f_y (MPa)</label>
          <input class="tool-textarea" id="rc-fy" type="number" step="20" value="420" placeholder="420 MPa (Grade 60)" />
        </div>
      </div>
      <div id="rc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rc-res-phi-mn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Design φ·M_n = 212.16 kN·m</span>
            <span class="stat-label">Factored Ultimate Design Moment Capacity (φ = 0.90)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-whitney" style="color:var(--green-dark); font-weight:700;">Nominal M_n = 235.73 kN·m | Whitney Depth a = 65.88 mm | Tension-Controlled Ductile Failure</span>
            <span class="stat-label">Whitney Stress Block (a = A_s·f_y / 0.85·f\'_c·b) & Failure Mode</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('rc-b'), dEl = document.getElementById('rc-d'), asEl = document.getElementById('rc-as');
  const fcEl = document.getElementById('rc-fc'), fyEl = document.getElementById('rc-fy');
  const phiMnResEl = document.getElementById('rc-res-phi-mn'), whResEl = document.getElementById('rc-res-whitney');

  function update() {
    const b = parseFloat(bEl.value), d = parseFloat(dEl.value), As = parseFloat(asEl.value);
    const fc = parseFloat(fcEl.value), fy = parseFloat(fyEl.value);

    if (isNaN(b) || isNaN(d) || isNaN(As) || isNaN(fc) || isNaN(fy) || b <= 0 || d <= 0 || As <= 0 || fc <= 0 || fy <= 0) return;

    // Whitney stress block depth a = ( As * fy ) / ( 0.85 * fc * b )  [mm]
    const a = (As * fy) / (0.85 * fc * b);

    // Nominal moment capacity: Mn = As * fy * ( d - a/2 )  [N * mm]
    const Mn_Nmm = As * fy * (d - (a / 2.0));
    const Mn_kNm = Mn_Nmm / 1e6;

    // Design moment capacity (tension-controlled phi = 0.90):
    const phi = 0.90;
    const phi_Mn_kNm = phi * Mn_kNm;

    // Reinforcement ratio rho = As / (b * d)
    const rho = (As / (b * d)) * 100.0;

    phiMnResEl.textContent = 'Design φ·M_n = ' + phi_Mn_kNm.toFixed(2) + ' kN·m';
    whResEl.textContent = 'Nominal M_n = ' + Mn_kNm.toFixed(2) + ' kN·m | a = ' + a.toFixed(2) + ' mm (Lever arm: ' + (d - a/2).toFixed(1) + ' mm | Rebar Ratio ρ = ' + rho.toFixed(2) + '%)';
  }

  [bEl, dEl, asEl, fcEl, fyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter concrete beam web cross-sectional width b in mm.',
      'Enter effective depth d from top compression fiber to centroid of longitudinal tension steel rebar in mm.',
      'Enter total area of tension steel rebar $A_s$ in $\text{mm}^2$.',
      'Enter concrete cylinder compressive strength $f\'_c$ and rebar yield strength $f_y$ in MPa (e.g. 420 MPa for Grade 60 steel).',
      'Inspect nominal moment $M_n$, Whitney block depth a, and factored design capacity $\phi M_n$ in $\text{kN}\cdot\text{m}$.'
    ],
    benefitTitle: 'Charles S. Whitney 1937 Equivalent Stress Block Theory',
    benefitContent: 'Whitney replaced the complex parabolic concrete stress distribution with a rectangular equivalent block ($0.85 f\'_c$ over depth $a$), simplifying flexural beam analysis while ensuring ductile tension-controlled failure with ample warning before collapse.',
    faqs: [{ q: 'Why is a strength reduction factor (phi = 0.90) applied in ACI 318?', a: 'The $\phi = 0.90$ factor accounts for material strength variations, construction tolerances, and structural safety margins in tension-controlled flexural members.' }]
  },

  // 3. Retaining Wall Rankine Active & Passive Lateral Earth Pressure Calculator
  {
    slug: 'retaining-wall-rankine-active-passive-earth-pressure-calculator',
    name: 'Retaining Wall Rankine Lateral Earth Pressure (K_a = (1-sin φ)/(1+sin φ)) Calculator',
    description: 'Calculate Rankine active earth pressure coefficient (K_a = (1 - sin φ) / (1 + sin φ)), passive coefficient (K_p = (1 + sin φ) / (1 - sin φ)), total lateral thrust force (P_a = ½·K_a·γ·H²) in kN/m, and overturning moment for retaining wall design.',
    category: 'Science',
    icon: 'text',
    keywords: ['rankine earth pressure calculator', 'retaining wall active passive coefficient formula ka kp online', 'lateral earth thrust force p equals half ka gamma h squared calculator', 'geotechnical retaining wall overturning moment calculator', 'soil mechanics rankine earth pressure online'],
    order: 1059,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Soil Internal Friction Angle φ (°), Soil Unit Weight γ (kN/m³) & Wall Height H (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-phi">Friction Angle φ (°)</label>
          <input class="tool-textarea" id="rk-phi" type="number" step="1" min="10" max="45" value="30.0" placeholder="30.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-gamma">Unit Weight γ</label>
          <input class="tool-textarea" id="rk-gamma" type="number" step="0.5" value="18.0" placeholder="18.0 kN/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-h">Wall Height H (m)</label>
          <input class="tool-textarea" id="rk-h" type="number" step="0.5" value="4.0" placeholder="4.0 m" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-pa" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Active Thrust P_a = 48.00 kN / m</span>
            <span class="stat-label">Total Lateral Active Earth Thrust Force per Meter Wall</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-coeff" style="color:var(--green-dark); font-weight:700;">K_a = 0.333 | K_p = 3.000 (9× Higher) | Overturning Moment M_ot = 64.00 kN·m/m (Line of action @ H/3 = 1.33 m)</span>
            <span class="stat-label">Rankine Coefficients (K_a, K_p) & Overturning Moment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phiEl = document.getElementById('rk-phi'), gEl = document.getElementById('rk-gamma'), hEl = document.getElementById('rk-h');
  const paResEl = document.getElementById('rk-res-pa'), cfResEl = document.getElementById('rk-res-coeff');

  function update() {
    const phi_deg = parseFloat(phiEl.value), gamma = parseFloat(gEl.value), H = parseFloat(hEl.value);
    if (isNaN(phi_deg) || isNaN(gamma) || isNaN(H) || phi_deg <= 0 || phi_deg >= 90 || gamma <= 0 || H <= 0) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;
    const sin_phi = Math.sin(phi_rad);

    // Rankine active coefficient: K_a = ( 1 - sin(phi) ) / ( 1 + sin(phi) )
    const K_a = (1.0 - sin_phi) / (1.0 + sin_phi);

    // Rankine passive coefficient: K_p = ( 1 + sin(phi) ) / ( 1 - sin(phi) ) = 1 / K_a
    const K_p = (1.0 + sin_phi) / (1.0 - sin_phi);

    // Total active thrust force: P_a = 0.5 * K_a * gamma * H^2  [kN / m]
    const P_a = 0.5 * K_a * gamma * Math.pow(H, 2);

    // Overturning moment about the toe: M_ot = P_a * (H / 3)  [kN * m / m]
    const M_ot = P_a * (H / 3.0);

    paResEl.textContent = 'Active Thrust P_a = ' + P_a.toFixed(2) + ' kN / m';
    cfResEl.textContent = 'K_a = ' + K_a.toFixed(3) + ' | K_p = ' + K_p.toFixed(3) + ' | Overturning M_ot = ' + M_ot.toFixed(2) + ' kN·m/m (Thrust acting at ' + (H/3.0).toFixed(2) + ' m above base)';
  }

  [phiEl, gEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter backfill soil internal angle of friction $\phi$ in degrees (e.g. $30^\circ$ for loose sand, $38^\circ$ for dense gravel).',
      'Enter moist soil unit weight $\gamma$ in $\text{kN/m}^3$ (typically 18 to 20 $\text{kN/m}^3$).',
      'Enter retaining wall vertical stem height H in meters.',
      'Inspect Rankine active earth pressure coefficient ($K_a$), passive coefficient ($K_p$), total horizontal thrust force ($P_a$), and base overturning moment.'
    ],
    benefitTitle: 'William John Macquorn Rankine 1857 Earth Pressure Theory',
    benefitContent: 'Rankine assumed a frictionless vertical wall retaining cohesionless soil in plastic equilibrium, demonstrating that triangular soil pressure creates a resultant thrust located at one-third height ($H/3$), which must be balanced to prevent sliding and overturning collapse.',
    faqs: [{ q: 'What is the difference between Active and Passive earth pressure?', a: 'Active pressure ($K_a < 1$) occurs when the wall tilts away from the backfill; passive pressure ($K_p > 1$) occurs when the wall pushes into the soil mass, developing enormous resistance.' }]
  },

  // 4. Terzaghi's Ultimate Bearing Capacity of Shallow Foundations Calculator
  {
    slug: 'terzaghi-bearing-capacity-shallow-foundation-footing-calculator',
    name: 'Terzaghi\'s Shallow Foundation Ultimate Bearing Capacity (q_ult = c·N_c + q·N_q + ½·γ·B·N_γ) Calculator',
    description: 'Calculate shallow strip/square foundation ultimate bearing capacity (q_ult = c·N_c + q·N_q + ½·γ·B·N_γ) in kPa and allowable bearing capacity (q_all = q_ult / FS) using Karl Terzaghi\'s bearing capacity factors.',
    category: 'Science',
    icon: 'text',
    keywords: ['terzaghi bearing capacity calculator', 'shallow foundation ultimate bearing capacity formula online', 'strip square footing allowable soil bearing capacity calculator', 'bearing capacity factors nc nq ngamma calculator', 'geotechnical foundation engineering online'],
    order: 1060,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Footing Width B (m), Embedment Depth D_f (m), Soil Cohesion c (kPa), Friction φ (°) & Unit Weight γ (kN/m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tz-b">Width B (m)</label>
          <input class="tool-textarea" id="tz-b" type="number" step="0.5" value="2.0" placeholder="2.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tz-df">Depth D_f (m)</label>
          <input class="tool-textarea" id="tz-df" type="number" step="0.5" value="1.5" placeholder="1.5 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tz-phi">Friction φ (°)</label>
          <input class="tool-textarea" id="tz-phi" type="number" step="1" value="28.0" placeholder="28.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tz-c">Cohesion c (kPa)</label>
          <input class="tool-textarea" id="tz-c" type="number" step="5" value="10.0" placeholder="10.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tz-gamma">Unit Weight γ</label>
          <input class="tool-textarea" id="tz-gamma" type="number" step="0.5" value="18.0" placeholder="18.0 kN/m³" />
        </div>
      </div>
      <div id="tz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tz-res-qall" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Allowable q_all = 312.4 kPa (FS = 3.0)</span>
            <span class="stat-label">Safe Allowable Soil Bearing Pressure (q_all = q_ult / 3.0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tz-res-factors" style="color:var(--green-dark); font-weight:700;">Ultimate q_ult = 937.2 kPa | N_c = 31.6, N_q = 17.8, N_γ = 15.3 (Strip Footing General Shear)</span>
            <span class="stat-label">Terzaghi Dimensionless Bearing Factors (N_c, N_q, N_γ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('tz-b'), dfEl = document.getElementById('tz-df'), phiEl = document.getElementById('tz-phi');
  const cEl = document.getElementById('tz-c'), gEl = document.getElementById('tz-gamma');
  const qallResEl = document.getElementById('tz-res-qall'), fctResEl = document.getElementById('tz-res-factors');

  function update() {
    const B = parseFloat(bEl.value), D_f = parseFloat(dfEl.value), phi_deg = parseFloat(phiEl.value);
    const c = parseFloat(cEl.value), gamma = parseFloat(gEl.value);

    if (isNaN(B) || isNaN(D_f) || isNaN(phi_deg) || isNaN(c) || isNaN(gamma) || B <= 0 || D_f < 0 || phi_deg < 0 || phi_deg >= 50 || c < 0 || gamma <= 0) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;

    // Surcharge at foundation base: q = gamma * D_f
    const q_surcharge = gamma * D_f;

    // Terzaghi Bearing Capacity Factors:
    // N_q = exp( (3*pi/2 - phi)*tan(phi) ) / ( 2 * cos^2(45 + phi/2) ) approx standard formula:
    const a_angle = (0.75 * Math.PI) - (phi_rad / 2.0);
    const N_q = (Math.exp(2.0 * ((0.75 * Math.PI) - (phi_rad / 2.0)) * Math.tan(phi_rad))) / (2.0 * Math.pow(Math.cos((Math.PI / 4.0) + (phi_rad / 2.0)), 2));
    const N_c = phi_deg > 0 ? (N_q - 1.0) / Math.tan(phi_rad) : 5.7;
    const K_pg = 1.0 + (phi_deg / 10.0); // empirical passive earth pressure coefficient
    const N_gamma = 0.5 * ( (K_pg / Math.pow(Math.cos(phi_rad), 2)) - 1.0 ) * Math.tan(phi_rad);

    // Terzaghi Strip Footing Ultimate Capacity:
    // q_ult = c * N_c + q_surcharge * N_q + 0.5 * gamma * B * N_gamma
    const q_ult = (c * N_c) + (q_surcharge * N_q) + (0.5 * gamma * B * Math.max(0.1, N_gamma));

    // Allowable bearing capacity with Safety Factor FS = 3.0:
    const FS = 3.0;
    const q_all = q_ult / FS;

    qallResEl.textContent = 'Allowable q_all = ' + q_all.toFixed(1) + ' kPa (FS = 3.0)';
    fctResEl.textContent = 'Ultimate q_ult = ' + q_ult.toFixed(1) + ' kPa | N_c = ' + N_c.toFixed(1) + ', N_q = ' + N_q.toFixed(1) + ', N_γ = ' + Math.max(0, N_gamma).toFixed(1) + ' (B = ' + B + 'm, D_f = ' + D_f + 'm)';
  }

  [bEl, dfEl, phiEl, cEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter footing foundation contact width B in meters.',
      'Enter foundation embedment depth $D_f$ in meters.',
      'Enter soil effective internal friction angle $\phi$ in degrees.',
      'Enter soil cohesion c in kPa ($c=0$ for clean sand).',
      'Enter soil unit weight $\gamma$ in $\text{kN/m}^3$.',
      'Inspect Terzaghi bearing capacity factors ($N_c, N_q, N_\gamma$), ultimate capacity $q_{\text{ult}}$, and safe allowable pressure $q_{\text{all}} = q_{\text{ult}} / 3.0$.'
    ],
    benefitTitle: 'Karl von Terzaghi 1943 Father of Soil Mechanics',
    benefitContent: 'Terzaghi\'s bearing capacity equation divides soil resistance into three distinct components: cohesion along slip planes ($c N_c$), overburden surcharge weight ($q N_q$), and soil self-weight wedge friction ($\frac{1}{2}\gamma B N_\gamma$), preventing catastrophic building foundation shear failure.',
    faqs: [{ q: 'Why is a safety factor of 3.0 typically applied to soil bearing capacity?', a: 'Because soil is a natural, highly variable anisotropic geological material with non-uniform shear strength properties.' }]
  },

  // 5. Rational Method Peak Stormwater Runoff (Q = C·I·A / 360) Calculator
  {
    slug: 'rational-method-peak-stormwater-runoff-q-cia-calculator',
    name: 'Rational Method Peak Stormwater Runoff (Q = C·I·A / 360) Drainage Culvert Calculator',
    description: 'Calculate peak urban stormwater runoff discharge (Q = C · I · A / 360) in m³/s and cfs from watershed drainage catchment area A in hectares, rainfall intensity I in mm/hr, and runoff coefficient C.',
    category: 'Science',
    icon: 'text',
    keywords: ['rational method runoff calculator', 'peak stormwater discharge formula q equals c i a online', 'drainage culvert runoff coefficient calculator', 'rainfall intensity catchment area stormwater calculator m3 s', 'civil environmental hydrology rational method online'],
    order: 1061,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Catchment Area A (Hectares), Rainfall Intensity I (mm/hr) & Runoff Coefficient C (Pavement 0.90, Lawn 0.20)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rm-c">Runoff Coeff (C)</label>
          <input class="tool-textarea" id="rm-c" type="number" step="0.05" min="0.05" max="1.0" value="0.75" placeholder="0.75 (Commercial)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-i">Rainfall I (mm/hr)</label>
          <input class="tool-textarea" id="rm-i" type="number" step="5" value="65.0" placeholder="65.0 mm/hr (10-Yr Storm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-area">Area A (Hectares)</label>
          <input class="tool-textarea" id="rm-area" type="number" step="0.5" value="5.0" placeholder="5.0 Hectares (50,000 m²)" />
        </div>
      </div>
      <div id="rm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rm-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Peak Q = 0.677 m³ / s (23.9 cfs)</span>
            <span class="stat-label">Peak Stormwater Runoff Discharge Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rm-res-pipe" style="color:var(--green-dark); font-weight:700;">Recommended Storm Culvert Diameter: ~750 mm (30 inch pipe @ 1.5 m/s flow velocity)</span>
            <span class="stat-label">Stormwater Culvert Pipe Sizing Requirement</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('rm-c'), iEl = document.getElementById('rm-i'), aEl = document.getElementById('rm-area');
  const qResEl = document.getElementById('rm-res-q'), ppResEl = document.getElementById('rm-res-pipe');

  function update() {
    const C = parseFloat(cEl.value), I_mm_hr = parseFloat(iEl.value), A_ha = parseFloat(aEl.value);
    if (isNaN(C) || isNaN(I_mm_hr) || isNaN(A_ha) || C <= 0 || C > 1.0 || I_mm_hr <= 0 || A_ha <= 0) return;

    // Rational method SI formula: Q = ( C * I * A ) / 360  [m^3 / s]
    // where I is in mm/hr and A is in hectares (1 ha = 10,000 m^2)
    const Q_m3s = (C * I_mm_hr * A_ha) / 360.0;
    const Q_cfs = Q_m3s * 35.3147;

    // Approximate pipe sizing assuming full gravity flow at v = 1.5 m/s:
    // Area = Q / v => pi * D^2 / 4 = Q / 1.5 => D = sqrt( (4 * Q) / (1.5 * pi) )
    const D_req_m = Math.sqrt((4.0 * Q_m3s) / (1.5 * Math.PI));
    const D_req_mm = Math.round(D_req_m * 1000.0);
    const D_req_in = Math.round(D_req_m * 39.37);

    qResEl.textContent = 'Peak Q = ' + Q_m3s.toFixed(3) + ' m³ / s (' + Q_cfs.toFixed(1) + ' cfs)';
    ppResEl.textContent = 'Recommended Pipe Diameter ≈ ' + D_req_mm + ' mm (' + D_req_in + '" Culvert @ 1.5 m/s | C = ' + C + ' across ' + A_ha + ' ha)';
  }

  [cEl, iEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter dimensionless composite runoff coefficient C (0.90 for asphalt/roofs, 0.70 for commercial downtown, 0.20 for grass lawns).',
      'Enter design storm rainfall intensity I in mm/hr from local Intensity-Duration-Frequency (IDF) curves.',
      'Enter drainage watershed catchment area A in hectares ($1\text{ ha} = 10,000\text{ m}^2$).',
      'Inspect peak stormwater discharge rate Q in $\text{m}^3/\text{s}$ (cfs) and required storm sewer culvert pipe diameter.'
    ],
    benefitTitle: 'Thomas Mulvaney 1851 Rational Hydrology Formula',
    benefitContent: 'The Rational Method is the world\'s most widely used engineering standard for sizing municipal stormwater street inlets, roadside ditches, and culverts for small catchments ($<80\text{ hectares}$).',
    faqs: [{ q: 'What is the physical meaning of the constant 360 in the Rational formula?', a: '360 converts rainfall in mm/hr ($10^{-3}\text{ m/3600 s}$) over hectares ($10^4\text{ m}^2$) directly into cubic meters per second ($\text{m}^3/\text{s}$).' }]
  },

  // 6. Highway Stopping Sight Distance (AASHTO SSD) Calculator
  {
    slug: 'highway-stopping-sight-distance-ssd-reaction-braking-calculator',
    name: 'Highway Stopping Sight Distance (AASHTO SSD = 0.278·v·t + v² / (254·(f ± G))) Calculator',
    description: 'Calculate transportation highway vehicle Stopping Sight Distance (SSD = 0.278·v·t + v² / (254·(a/g ± G))) in meters from design speed v in km/h, driver perception-reaction time t (2.5 s AASHTO), deceleration rate a, and road grade G (%).',
    category: 'Science',
    icon: 'text',
    keywords: ['stopping sight distance calculator', 'aashto ssd formula reaction braking distance online', 'highway design stopping sight distance calculator meters', 'driver perception reaction time braking distance calculator', 'civil transportation highway engineering online'],
    order: 1062,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Design Speed v (km/h), Perception-Reaction Time t (s, 2.5 s AASHTO) & Roadway Grade G (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ssd-v">Speed v (km/h)</label>
          <input class="tool-textarea" id="ssd-v" type="number" step="10" value="100.0" placeholder="100.0 km/h (62 mph)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ssd-t">Reaction t (s)</label>
          <input class="tool-textarea" id="ssd-t" type="number" step="0.1" value="2.5" placeholder="2.5 s (AASHTO Standard)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ssd-g">Grade G (%)</label>
          <input class="tool-textarea" id="ssd-g" type="number" step="1" value="-3.0" placeholder="-3.0% (Downgrade)" />
        </div>
      </div>
      <div id="ssd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ssd-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Required SSD = 191.8 m</span>
            <span class="stat-label">Minimum AASHTO Stopping Sight Distance</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ssd-res-break" style="color:var(--green-dark); font-weight:700;">Perception-Reaction = 69.4 m | Braking Distance = 122.4 m (+10.5 m longer on 3% downgrade)</span>
            <span class="stat-label">Perception Distance vs Physical Friction Braking Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('ssd-v'), tEl = document.getElementById('ssd-t'), gEl = document.getElementById('ssd-g');
  const totResEl = document.getElementById('ssd-res-tot'), brkResEl = document.getElementById('ssd-res-break');

  function update() {
    const v_kmh = parseFloat(vEl.value), t_sec = parseFloat(tEl.value), G_pct = parseFloat(gEl.value);
    if (isNaN(v_kmh) || isNaN(t_sec) || isNaN(G_pct) || v_kmh <= 0 || t_sec <= 0) return;

    // Perception-reaction distance: d_r = 0.2778 * v * t  [meters]
    const d_reaction = 0.277778 * v_kmh * t_sec;

    // AASHTO design deceleration rate a = 3.4 m/s^2 (a/g = 0.35 friction coefficient)
    const a_over_g = 0.35;
    const G_dec = G_pct / 100.0;

    // Braking distance: d_b = v^2 / ( 254 * ( (a/g) + G ) )  [meters]
    const denominator = 254.0 * (a_over_g + G_dec);
    if (denominator <= 0) return;

    const d_braking = Math.pow(v_kmh, 2) / denominator;
    const total_SSD = d_reaction + d_braking;

    totResEl.textContent = 'Required SSD = ' + total_SSD.toFixed(1) + ' m';
    brkResEl.textContent = 'Reaction = ' + d_reaction.toFixed(1) + ' m | Braking = ' + d_braking.toFixed(1) + ' m (' + (G_pct < 0 ? Math.abs(G_pct) + '% Downgrade increases braking length' : 'Flat/Upgrade') + ' @ ' + v_kmh + ' km/h)';
  }

  [vEl, tEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter highway design speed v in km/h.',
      'Enter driver perception-reaction time t in seconds (standard 2.5 seconds per AASHTO Green Book).',
      'Enter roadway vertical longitudinal grade G in % (negative for downhill downgrade).',
      'Inspect total required Stopping Sight Distance (SSD) in meters, reaction distance, and physical braking distance.'
    ],
    benefitTitle: 'AASHTO Green Book Highway Safety Geometric Standard',
    benefitContent: 'Designing vertical crest curves and horizontal turns with sight distance exceeding SSD ($SSD = d_{\text{reaction}} + d_{\text{braking}}$) ensures motorists can spot a 15 cm stationary obstacle and safely stop without collision.',
    faqs: [{ q: 'Why is perception-reaction time set to 2.5 seconds?', a: '2.5 seconds accommodates the 90th percentile of human driver reaction capabilities across complex unexpected highway conditions.' }]
  },

  // 7. Highway Horizontal Curve Minimum Radius & Superelevation Calculator
  {
    slug: 'highway-horizontal-curve-radius-superelevation-calculator',
    name: 'Highway Horizontal Curve Radius (R = v² / (127·(e + f_s))) & Superelevation Calculator',
    description: 'Calculate minimum horizontal curve radius (R = v² / (127 · (e + f_s))) in meters from highway design speed v in km/h, maximum roadway superelevation bank e (%), and side friction factor f_s under AASHTO rules.',
    category: 'Science',
    icon: 'text',
    keywords: ['horizontal curve radius calculator', 'superelevation formula r equals v squared over 127 e plus f online', 'highway curve minimum radius aashto calculator', 'side friction factor roadway banking calculator', 'transportation highway geometry horizontal curve online'],
    order: 1063,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Design Speed v (km/h), Max Superelevation e (%) & Side Friction Factor f_s',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hc-v">Speed v (km/h)</label>
          <input class="tool-textarea" id="hc-v" type="number" step="10" value="100.0" placeholder="100.0 km/h" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-e">Bank e (%)</label>
          <input class="tool-textarea" id="hc-e" type="number" step="1" value="6.0" placeholder="6.0% (0.06)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hc-fs">Friction f_s</label>
          <input class="tool-textarea" id="hc-fs" type="number" step="0.01" value="0.12" placeholder="0.12 (AASHTO at 100 km/h)" />
        </div>
      </div>
      <div id="hc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hc-res-rmin" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Min Radius R_min = 437.4 m</span>
            <span class="stat-label">AASHTO Minimum Safe Horizontal Curve Radius</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hc-res-deg" style="color:var(--green-dark); font-weight:700;">Degree of Curve D = 2.62° (Sharpness) | Total Lateral Banking Resistance = e + f_s = 0.180</span>
            <span class="stat-label">Curve Sharpness & Centrifugal Force Equilibrium</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('hc-v'), eEl = document.getElementById('hc-e'), fsEl = document.getElementById('hc-fs');
  const rmResEl = document.getElementById('hc-res-rmin'), dgResEl = document.getElementById('hc-res-deg');

  function update() {
    const v_kmh = parseFloat(vEl.value), e_pct = parseFloat(eEl.value), f_s = parseFloat(fsEl.value);
    if (isNaN(v_kmh) || isNaN(e_pct) || isNaN(f_s) || v_kmh <= 0 || e_pct < 0 || f_s <= 0) return;

    const e_dec = e_pct / 100.0;

    // Minimum radius: R_min = v^2 / ( 127 * ( e + f_s ) )  [meters]
    const R_min = Math.pow(v_kmh, 2) / (127.0 * (e_dec + f_s));

    // Degree of curve (100 ft arc definition): D = 1746.38 / R_min
    const D_deg = 1746.38 / R_min;

    rmResEl.textContent = 'Min Radius R_min = ' + R_min.toFixed(1) + ' m';
    dgResEl.textContent = 'Degree of Curve D = ' + D_deg.toFixed(2) + '° | e = ' + e_pct + '% bank + f_s = ' + f_s + ' (Resists centrifugal acceleration at ' + v_kmh + ' km/h)';
  }

  [vEl, eEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter highway design speed v in km/h.',
      'Enter maximum roadway cross-slope superelevation e % (typically 6% for rural highways, 4% for urban streets).',
      'Enter design tire-pavement side friction factor $f_s$ (typically 0.11 to 0.16).',
      'Inspect minimum safe horizontal curve centerline turning radius $R_{\min}$ in meters.'
    ],
    benefitTitle: 'AASHTO Point-Mass Horizontal Curve Equilibrium',
    benefitContent: 'Balancing vehicle centrifugal force against banking tilt and tire friction ($\frac{v^2}{gR} = e + f_s$) prevents high-speed vehicle skidding and rollovers on highway curves.',
    faqs: [{ q: 'Why is maximum superelevation capped at 6% to 8% in cold climates?', a: 'To prevent slow-moving vehicles or stopped traffic from sliding down the banked curve on slippery ice or snow.' }]
  },

  // 8. Traffic Flow Greenshields Model Speed Density & Maximum Capacity Calculator
  {
    slug: 'traffic-flow-greenshields-model-capacity-density-calculator',
    name: 'Greenshields Traffic Flow Model (q_max = ¼·v_f·k_j) & Highway Capacity Calculator',
    description: 'Calculate highway macroscopic traffic flow parameters (q = k · v = k · v_f · (1 - k / k_j)) in vehicles/hour/lane, maximum highway capacity (q_max = ¼ · v_f · k_j), and optimum speed v_opt for transportation engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['greenshields traffic flow calculator', 'traffic speed density relationship formula online', 'highway capacity q max formula quarter vf kj calculator', 'jam density free flow speed traffic flow calculator', 'transportation engineering traffic stream models online'],
    order: 1064,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Free-Flow Speed v_f (km/h), Jam Density k_j (veh/km/lane) & Current Traffic Density k (veh/km/lane)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gs-vf">Free Speed v_f</label>
          <input class="tool-textarea" id="gs-vf" type="number" step="10" value="110.0" placeholder="110.0 km/h (Empty Highway)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gs-kj">Jam Density k_j</label>
          <input class="tool-textarea" id="gs-kj" type="number" step="10" value="120.0" placeholder="120.0 veh/km/lane (Gridlock)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gs-k">Current Density k</label>
          <input class="tool-textarea" id="gs-k" type="number" step="10" value="60.0" placeholder="60.0 veh/km (k = ½ k_j)" />
        </div>
      </div>
      <div id="gs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gs-res-flow" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Flow q = 3,300 veh / hr / lane (CAPACITY)</span>
            <span class="stat-label">Macroscopic Traffic Flow Rate (q = k · v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gs-res-state" style="color:var(--green-dark); font-weight:700;">Speed v = 55.0 km/h | Max Capacity q_max = 3,300 veh/h @ Optimum Density k_opt = 60 veh/km</span>
            <span class="stat-label">Operating Speed & Maximum Sustainable Highway Capacity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vfEl = document.getElementById('gs-vf'), kjEl = document.getElementById('gs-kj'), kEl = document.getElementById('gs-k');
  const flResEl = document.getElementById('gs-res-flow'), stResEl = document.getElementById('gs-res-state');

  function update() {
    const v_f = parseFloat(vfEl.value), k_j = parseFloat(kjEl.value), k = parseFloat(kEl.value);
    if (isNaN(v_f) || isNaN(k_j) || isNaN(k) || v_f <= 0 || k_j <= 0 || k < 0) return;

    // Greenshields linear speed-density: v = v_f * ( 1 - k / k_j )
    const v = Math.max(0, v_f * (1.0 - (k / k_j)));

    // Traffic flow: q = k * v  [veh / hr]
    const q = k * v;

    // Max capacity at k_opt = k_j / 2, v_opt = v_f / 2: q_max = 0.25 * v_f * k_j
    const q_max = 0.25 * v_f * k_j;
    const k_opt = k_j / 2.0;

    let regime = '', color = '#22543d';
    if (k <= k_opt) {
      regime = 'UNCONGESTED FREE FLOW (k ≤ k_opt: Stable traffic stream)';
      color = '#22543d';
    } else {
      regime = 'CONGESTED FORCED FLOW (k > k_opt: Stop-and-go breakdown / Bottleneck queue)';
      color = '#c53030';
    }

    flResEl.textContent = 'Flow q = ' + Math.round(q).toLocaleString() + ' veh / hr / lane (' + (k === k_opt ? 'MAX CAPACITY' : regime.split(' (')[0]) + ')';
    flResEl.style.color = color;
    stResEl.textContent = 'Speed v = ' + v.toFixed(1) + ' km/h | Max Capacity q_max = ' + Math.round(q_max).toLocaleString() + ' veh/h @ k_opt = ' + k_opt.toFixed(0) + ' veh/km';
    stResEl.style.color = color;
  }

  [vfEl, kjEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter free-flow travel speed $v_f$ on an empty highway in km/h.',
      'Enter bumper-to-bumper standstill jam density $k_j$ in vehicles/km/lane (typically 110 to 130 veh/km).',
      'Enter current real-time vehicle density k in vehicles/km/lane.',
      'Inspect macroscopic flow rate q (veh/hr/lane), average operating speed, and highway maximum capacity ($q_{\max} = \frac{1}{4} v_f k_j$).'
    ],
    benefitTitle: 'Bruce D. Greenshields 1935 Macroscopic Traffic Stream Model',
    benefitContent: 'Greenshields proved that flow follows a parabolic curve ($q = v_f k - \frac{v_f}{k_j} k^2$); highway throughput peaks at half the free-flow speed ($v_{\text{opt}} = \frac{1}{2}v_f$) and half jam density ($k_{\text{opt}} = \frac{1}{2}k_j$), beyond which shockwaves cause congestion collapse.',
    faqs: [{ q: 'Why does flow decrease as density increases past k_opt?', a: 'When vehicle packing exceeds optimal spacing, drivers tap brakes, slowing average speed faster than the rate of density increase and cutting total flow.' }]
  },

  // 9. Wastewater Biochemical Oxygen Demand (BOD₅ to Ultimate BOD_u) Kinetics Calculator
  {
    slug: 'wastewater-bod-kinetics-ultimate-biochemical-oxygen-demand-calculator',
    name: 'Wastewater BOD Kinetics (BOD_t = BOD_u·(1 - e^(-k·t))) & Ultimate BOD_u Calculator',
    description: 'Calculate 5-day Biochemical Oxygen Demand (BOD₅) in mg/L, Ultimate carbonaceous oxygen demand (BOD_u = BOD₅ / (1 - e^(-5k))), and temperature-adjusted deoxygenation rate k_T for wastewater treatment plant design.',
    category: 'Science',
    icon: 'text',
    keywords: ['bod kinetics calculator', 'biochemical oxygen demand formula bod t equals bod u times 1 minus exp minus kt online', 'bod5 to ultimate bod u calculator wastewater', 'deoxygenation rate constant temperature adjustment calculator', 'environmental wastewater treatment bod online'],
    order: 1065,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '5-Day BOD₅ (mg/L), Reaction Rate k₂₀ (day⁻¹, 0.23 day⁻¹ standard) & Water Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bd-bod5">BOD₅ (mg/L)</label>
          <input class="tool-textarea" id="bd-bod5" type="number" step="10" value="200.0" placeholder="200.0 mg/L (Municipal Raw)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bd-k20">Rate k₂₀ (day⁻¹)</label>
          <input class="tool-textarea" id="bd-k20" type="number" step="0.02" value="0.23" placeholder="0.23 day⁻¹ (Base e)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bd-temp">Water Temp (°C)</label>
          <input class="tool-textarea" id="bd-temp" type="number" step="2" value="20.0" placeholder="20.0 °C" />
        </div>
      </div>
      <div id="bd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bd-res-bodu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ultimate BOD_u = 292.6 mg / L</span>
            <span class="stat-label">Total Ultimate Carbonaceous Oxygen Demand (BOD_u)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bd-res-frac" style="color:var(--green-dark); font-weight:700;">5-Day Exertion = 68.3% (BOD₅ accounts for 68.3% of total oxygen demand at 20°C, k = 0.23 day⁻¹)</span>
            <span class="stat-label">BOD Exertion Fraction & Treatment Aeration Demand</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const b5El = document.getElementById('bd-bod5'), k20El = document.getElementById('bd-k20'), tEl = document.getElementById('bd-temp');
  const buResEl = document.getElementById('bd-res-bodu'), frResEl = document.getElementById('bd-res-frac');

  function update() {
    const BOD5 = parseFloat(b5El.value), k20 = parseFloat(k20El.value), temp_C = parseFloat(tEl.value);
    if (isNaN(BOD5) || isNaN(k20) || isNaN(temp_C) || BOD5 <= 0 || k20 <= 0) return;

    // Temperature adjustment for deoxygenation rate constant: k_T = k20 * theta^(T - 20)
    // theta = 1.047 for T = 20-30°C, 1.135 for T = 4-20°C
    const theta = temp_C >= 20.0 ? 1.047 : 1.135;
    const k_T = k20 * Math.pow(theta, temp_C - 20.0);

    // BOD_t = BOD_u * ( 1 - exp(-k * t) ) => BOD_u = BOD5 / ( 1 - exp(-5 * k_T) )
    const exertion5 = 1.0 - Math.exp(-5.0 * k_T);
    const BOD_u = BOD5 / exertion5;
    const exertionPct = exertion5 * 100.0;

    buResEl.textContent = 'Ultimate BOD_u = ' + BOD_u.toFixed(1) + ' mg / L';
    frResEl.textContent = '5-Day Exertion = ' + exertionPct.toFixed(1) + '% (k_T = ' + k_T.toFixed(3) + ' day⁻¹ @ ' + temp_C + '°C | Raw BOD₅: ' + BOD5 + ' mg/L)';
  }

  [b5El, k20El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter standard 5-day Biochemical Oxygen Demand ($BOD_5$) in mg/L.',
      'Enter base deoxygenation rate constant $k_{20}$ in $\text{day}^{-1}$ ($0.23\text{ day}^{-1}$ standard for domestic wastewater).',
      'Enter wastewater stream temperature in $^\circ\text{C}$.',
      'Inspect Ultimate carbonaceous oxygen demand $BOD_u$ in mg/L and percentage exertion.'
    ],
    benefitTitle: 'First-Order Organic Waste Biodegradation Kinetics',
    benefitContent: 'Aerobic bacteria oxidize organic matter exponentially ($BOD_t = BOD_u (1 - e^{-kt})$); converting standard 5-day $BOD_5$ to Ultimate $BOD_u$ is necessary to size aeration blower horsepower in municipal wastewater treatment plants.',
    faqs: [{ q: 'Why is standard BOD measured for 5 days (BOD5)?', a: 'Historical British sanitary engineers selected 5 days because the longest river in the UK (River Thames) takes approximately 5 days to flow from source to the sea.' }]
  },

  // 10. Streeter-Phelps River Dissolved Oxygen Sag Curve Calculator
  {
    slug: 'streeter-phelps-dissolved-oxygen-sag-curve-river-calculator',
    name: 'Streeter-Phelps Dissolved Oxygen (DO) Sag Curve & Critical Deficit (D_c) Calculator',
    description: 'Calculate river dissolved oxygen sag deficit (D(t) = [k₁·L₀ / (k₂ - k₁)] · (e^(-k₁·t) - e^(-k₂·t)) + D₀·e^(-k₂·t)) in mg/L, critical time t_c, and minimum dissolved oxygen level for river pollution control.',
    category: 'Science',
    icon: 'text',
    keywords: ['streeter phelps calculator', 'dissolved oxygen sag curve formula river do deficit online', 'critical dissolved oxygen deficit tc dc calculator', 'deoxygenation reaeration rate river waste assimilation calculator', 'environmental water quality stream dissolved oxygen online'],
    order: 1066,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial BOD L₀ (mg/L), Initial DO Deficit D₀ (mg/L), Deoxygenation k₁ (day⁻¹) & Reaeration k₂ (day⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-l0">Initial BOD L₀</label>
          <input class="tool-textarea" id="sp-l0" type="number" step="5" value="25.0" placeholder="25.0 mg/L (Mixed Stream)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-d0">Initial Deficit D₀</label>
          <input class="tool-textarea" id="sp-d0" type="number" step="0.5" value="2.0" placeholder="2.0 mg/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-k1">Deoxygenation k₁</label>
          <input class="tool-textarea" id="sp-k1" type="number" step="0.05" value="0.20" placeholder="0.20 day⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-k2">Reaeration k₂</label>
          <input class="tool-textarea" id="sp-k2" type="number" step="0.1" value="0.50" placeholder="0.50 day⁻¹" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-dc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Critical DO Deficit D_c = 5.86 mg / L</span>
            <span class="stat-label">Maximum Oxygen Deficit at Critical Sag Point</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-tc" style="color:var(--green-dark); font-weight:700;">Critical Time t_c = 1.95 Days | Min Dissolved Oxygen = 3.24 mg/L (DO_sat = 9.10 mg/L @ 20°C)</span>
            <span class="stat-label">Time to Critical Sag Point & Minimum River Oxygen</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l0El = document.getElementById('sp-l0'), d0El = document.getElementById('sp-d0');
  const k1El = document.getElementById('sp-k1'), k2El = document.getElementById('sp-k2');
  const dcResEl = document.getElementById('sp-res-dc'), tcResEl = document.getElementById('sp-res-tc');

  const DO_sat_20C = 9.10; // mg / L saturation at 20°C

  function update() {
    const L0 = parseFloat(l0El.value), D0 = parseFloat(d0El.value);
    const k1 = parseFloat(k1El.value), k2 = parseFloat(k2El.value);

    if (isNaN(L0) || isNaN(D0) || isNaN(k1) || isNaN(k2) || L0 <= 0 || k1 <= 0 || k2 <= 0 || k1 === k2) return;

    // Critical time formula: t_c = ( 1 / (k2 - k1) ) * ln( (k2 / k1) * ( 1 - D0*(k2 - k1)/(k1*L0) ) )
    const term = (k2 / k1) * (1.0 - (D0 * (k2 - k1)) / (k1 * L0));
    if (term <= 0) return;

    const t_c = (1.0 / (k2 - k1)) * Math.log(term);

    // Streeter-Phelps DO deficit at t_c:
    // D(t) = [ (k1 * L0) / (k2 - k1) ] * ( exp(-k1 * t) - exp(-k2 * t) ) + D0 * exp(-k2 * t)
    const D_c = ((k1 * L0) / (k2 - k1)) * (Math.exp(-k1 * t_c) - Math.exp(-k2 * t_c)) + (D0 * Math.exp(-k2 * t_c));
    const minDO = Math.max(0, DO_sat_20C - D_c);

    let status = '', color = '#22543d';
    if (minDO >= 5.0) { status = 'HEALTHY AQUATIC ECOSYSTEM (Min DO ≥ 5.0 mg/L: Supports game fish)'; color = '#22543d'; }
    else if (minDO >= 2.0) { status = 'STRESSED FISH HABITAT (Min DO 2.0 - 5.0 mg/L: Sensitive fish flee / die)'; color = '#ea580c'; }
    else { status = 'SEVERE ANOXIA / FISH KILL (Min DO < 2.0 mg/L: Anaerobic odors / massive mortality!)'; color = '#c53030'; }

    dcResEl.textContent = 'Critical DO Deficit D_c = ' + D_c.toFixed(2) + ' mg / L (' + status.split(' (')[0] + ')';
    dcResEl.style.color = color;
    tcResEl.textContent = 'Critical Sag t_c = ' + t_c.toFixed(2) + ' Days | Min DO = ' + minDO.toFixed(2) + ' mg/L (Saturation: 9.10 mg/L @ 20°C, k₁=' + k1 + ', k₂=' + k2 + ')';
    tcResEl.style.color = color;
  }

  [l0El, d0El, k1El, k2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mixed river wastewater initial carbonaceous BOD $L_0$ in mg/L.',
      'Enter initial river dissolved oxygen deficit $D_0 = \text{DO}_{\text{sat}} - \text{DO}_{\text{actual}}$ in mg/L.',
      'Enter bacterial deoxygenation rate constant $k_1$ in $\text{day}^{-1}$.',
      'Enter atmospheric surface reaeration rate constant $k_2$ in $\text{day}^{-1}$.',
      'Inspect critical sag time $t_c$ in days, maximum oxygen deficit $D_c$, and minimum dissolved oxygen concentration in mg/L.'
    ],
    benefitTitle: 'Harold W. Streeter & Earle B. Phelps 1925 Ohio River Model',
    benefitContent: 'The Streeter-Phelps equation balances bacterial oxygen consumption against surface atmospheric reaeration, defining the famous "DO sag curve" used worldwide to establish legal effluent discharge limits under the US Clean Water Act.',
    faqs: [{ q: 'What causes the minimum dissolved oxygen dip (sag point)?', a: 'Immediately downstream of discharge, bacterial deoxygenation exceeds atmospheric reaeration; oxygen levels drop until reaeration matches deoxygenation rate ($t_c$), after which the river recovers.' }]
  },

  // 11. Activated Sludge Aeration Tank Food-to-Microorganism (F/M) Ratio Calculator
  {
    slug: 'activated-sludge-aeration-tank-fm-ratio-mlss-calculator',
    name: 'Activated Sludge F/M Ratio & Aeration Tank Sizing ((F/M) = Q·S₀ / (V·X)) Calculator',
    description: 'Calculate wastewater treatment activated sludge Food-to-Microorganism ratio (F/M = Q · S₀ / (V · X)) in kg BOD / (kg MLVSS · day), Mean Cell Residence Time / Sludge Age (MCRT / θ_c in days), and volumetric organic loading rate.',
    category: 'Science',
    icon: 'text',
    keywords: ['activated sludge fm ratio calculator', 'food to microorganism ratio formula q s0 over v x online', 'mlss mlvss aeration tank sizing calculator wastewater', 'mean cell residence time sludge age mcrt calculator', 'environmental biological wastewater treatment online'],
    order: 1067,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Influent Flow Q (m³/day), Influent BOD S₀ (mg/L), Tank Volume V (m³) & Mixed Liquor MLVSS X (mg/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="as-q">Flow Q (m³/day)</label>
          <input class="tool-textarea" id="as-q" type="number" step="500" value="10000" placeholder="10,000 m³/day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-s0">BOD S₀ (mg/L)</label>
          <input class="tool-textarea" id="as-s0" type="number" step="20" value="220" placeholder="220 mg/L BOD" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-vol">Tank V (m³)</label>
          <input class="tool-textarea" id="as-vol" type="number" step="500" value="4000" placeholder="4,000 m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-x">MLVSS X (mg/L)</label>
          <input class="tool-textarea" id="as-x" type="number" step="200" value="2500" placeholder="2,500 mg/L MLVSS" />
        </div>
      </div>
      <div id="as-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="as-res-fm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F/M = 0.220 kg BOD / kg MLVSS·day</span>
            <span class="stat-label">Food-to-Microorganism Organic Loading Ratio (F/M)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="as-res-hrt" style="color:var(--green-dark); font-weight:700;">CONVENTIONAL PLUG FLOW (F/M 0.2-0.5: Excellent floc settlement) | Hydraulic Retention HRT = 9.60 Hours</span>
            <span class="stat-label">Aeration Basin Hydraulic Retention Time (HRT) & Sludge Settleability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('as-q'), s0El = document.getElementById('as-s0');
  const vEl = document.getElementById('as-vol'), xEl = document.getElementById('as-x');
  const fmResEl = document.getElementById('as-res-fm'), hrtResEl = document.getElementById('as-res-hrt');

  function update() {
    const Q = parseFloat(qEl.value), S0 = parseFloat(s0El.value);
    const V = parseFloat(vEl.value), X = parseFloat(xEl.value);

    if (isNaN(Q) || isNaN(S0) || isNaN(V) || isNaN(X) || Q <= 0 || S0 <= 0 || V <= 0 || X <= 0) return;

    // Daily Food load = Q * S0 / 1000  [kg BOD / day]
    const food_kg_day = (Q * S0) / 1000.0;

    // Total Microorganisms in aeration tank = V * X / 1000  [kg MLVSS]
    const mass_microbes_kg = (V * X) / 1000.0;

    // F/M ratio = Food / Microorganisms
    const FM_ratio = food_kg_day / mass_microbes_kg;

    // Hydraulic Retention Time HRT (hours) = (V / Q) * 24
    const HRT_hours = (V / Q) * 24.0;

    let regime = '', color = '#22543d';
    if (FM_ratio < 0.15) {
      regime = 'EXTENDED AERATION (F/M < 0.15: High endogenous respiration, low sludge yield)';
      color = '#2563eb';
    } else if (FM_ratio <= 0.50) {
      regime = 'CONVENTIONAL ACTIVATED SLUDGE (F/M 0.20 - 0.50: Optimal BOD removal & good settling)';
      color = '#22543d';
    } else {
      regime = 'HIGH RATE / OVERLOADED (F/M > 0.50: Turbid effluent, poor settling pin-point floc)';
      color = '#c53030';
    }

    fmResEl.textContent = 'F/M = ' + FM_ratio.toFixed(3) + ' kg BOD / kg MLVSS·day';
    fmResEl.style.color = color;
    hrtResEl.textContent = regime + ' | HRT = ' + HRT_hours.toFixed(1) + ' Hours (Food: ' + Math.round(food_kg_day).toLocaleString() + ' kg/d / Microbes: ' + Math.round(mass_microbes_kg).toLocaleString() + ' kg)';
    hrtResEl.style.color = color;
  }

  [qEl, s0El, vEl, xEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter primary effluent wastewater daily flow rate Q in $\text{m}^3/\text{day}$.',
      'Enter influent carbonaceous Biochemical Oxygen Demand $S_0$ in mg/L.',
      'Enter biological aeration tank basin liquid volume V in $\text{m}^3$.',
      'Enter Mixed Liquor Volatile Suspended Solids (MLVSS) active biomass concentration X in mg/L.',
      'Inspect Food-to-Microorganism ratio (F/M in $\text{kg BOD}/(\text{kg MLVSS}\cdot\text{day})$) and Hydraulic Retention Time (HRT).'
    ],
    benefitTitle: 'Biological Wastewater Treatment Process Control',
    benefitContent: 'Controlling the F/M ratio between $0.20\text{ and }0.50$ ensures bacteria have sufficient organic substrate to oxidize contaminants while starving them just enough to form dense, rapidly settling biological flocs in secondary clarifiers.',
    faqs: [{ q: 'What is MLSS vs MLVSS in activated sludge?', a: 'MLSS (Mixed Liquor Suspended Solids) measures total suspended solids; MLVSS (Volatile portion, $\sim 75\text{–}80\%$ of MLSS) represents the living active bacterial biomass.' }]
  },

  // 12. Open Channel Hydraulic Jump Sequent Depth & Energy Dissipation Calculator
  {
    slug: 'open-channel-hydraulic-jump-sequent-depth-energy-loss-calculator',
    name: 'Open Channel Hydraulic Jump Sequent Depth (y₂/y₁ = ½·(√(1 + 8·Fr₁²) - 1)) Calculator',
    description: 'Calculate open channel hydraulic jump sequent post-jump water depth (y₂/y₁ = ½ · (√(1 + 8·Fr₁²) - 1)), upstream Froude number (Fr₁ = v₁ / √(g·y₁)), and total turbulence energy head dissipation (ΔE) for dam stilling basins.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydraulic jump calculator', 'sequent depth formula y2 over y1 equals half sqrt 1 plus 8 fr squared minus 1 online', 'froude number supercritical subcritical flow calculator', 'stilling basin energy dissipation hydraulic jump calculator', 'civil hydraulic open channel flow online'],
    order: 1068,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Upstream Supercritical Water Depth y₁ (m) & Upstream Flow Velocity v₁ (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hj-y1">Upstream Depth y₁ (m)</label>
          <input class="tool-textarea" id="hj-y1" type="number" step="0.1" value="0.50" placeholder="0.50 m (Supercritical)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hj-v1">Velocity v₁ (m/s)</label>
          <input class="tool-textarea" id="hj-v1" type="number" step="1" value="8.0" placeholder="8.0 m/s" />
        </div>
      </div>
      <div id="hj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hj-res-y2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Post-Jump Depth y₂ = 2.37 m (4.74× Rise)</span>
            <span class="stat-label">Subcritical Sequent / Conjugate Water Depth (y₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hj-res-eloss" style="color:var(--green-dark); font-weight:700;">Energy Head Loss ΔE = 1.38 m (36.6% Energy Dissipation | Froude Fr₁ = 3.61 Steady Jump)</span>
            <span class="stat-label">Hydraulic Jump Energy Loss (ΔE = (y₂ - y₁)³ / 4y₁y₂) & Froude Number</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const y1El = document.getElementById('hj-y1'), v1El = document.getElementById('hj-v1');
  const y2ResEl = document.getElementById('hj-res-y2'), elResEl = document.getElementById('hj-res-eloss');

  const g = 9.80665; // m/s^2

  function update() {
    const y1 = parseFloat(y1El.value), v1 = parseFloat(v1El.value);
    if (isNaN(y1) || isNaN(v1) || y1 <= 0 || v1 <= 0) return;

    // Upstream Froude number: Fr1 = v1 / sqrt( g * y1 )
    const Fr1 = v1 / Math.sqrt(g * y1);

    if (Fr1 <= 1.0) {
      y2ResEl.textContent = 'NO HYDRAULIC JUMP (Fr₁ = ' + Fr1.toFixed(2) + ' ≤ 1.0: Flow is subcritical, jump cannot form)';
      elResEl.textContent = 'Supercritical flow (Fr₁ > 1.0) is mandatory for a hydraulic jump';
      return;
    }

    // Belanger's sequent depth equation: y2 / y1 = 0.5 * ( sqrt( 1 + 8 * Fr1^2 ) - 1 )
    const ratio_y2_y1 = 0.5 * (Math.sqrt(1.0 + 8.0 * Math.pow(Fr1, 2)) - 1.0);
    const y2 = y1 * ratio_y2_y1;

    // Specific energy loss: deltaE = ( y2 - y1 )^3 / ( 4 * y1 * y2 )  [meters]
    const deltaE = Math.pow(y2 - y1, 3) / (4.0 * y1 * y2);

    // Initial specific energy E1 = y1 + v1^2 / (2*g)
    const E1 = y1 + (Math.pow(v1, 2) / (2.0 * g));
    const loss_pct = (deltaE / E1) * 100.0;

    let jumpType = '';
    if (Fr1 < 1.7) jumpType = 'Undular Jump';
    else if (Fr1 < 2.5) jumpType = 'Weak Jump (Low dissipation)';
    else if (Fr1 < 4.5) jumpType = 'Oscillating Jump';
    else if (Fr1 < 9.0) jumpType = 'Steady Well-Behaved Jump (45-70% Energy Dissipation)';
    else jumpType = 'Strong Choppy Jump (>85% Dissipation)';

    y2ResEl.textContent = 'Post-Jump y₂ = ' + y2.toFixed(2) + ' m (' + ratio_y2_y1.toFixed(2) + '× Depth Rise)';
    elResEl.textContent = 'Energy Head Loss ΔE = ' + deltaE.toFixed(2) + ' m (' + loss_pct.toFixed(1) + '% Dissipated | Fr₁ = ' + Fr1.toFixed(2) + ' ' + jumpType + ')';
  }

  y1El.addEventListener('input', update);
  v1El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter upstream supercritical water depth $y_1$ in meters.',
      'Enter upstream high-velocity jet speed $v_1$ in m/s.',
      'Inspect Froude number ($Fr_1 = \frac{v_1}{\sqrt{g y_1}} > 1.0$), post-jump subcritical sequent depth $y_2$, and hydraulic jump energy head loss ($\Delta E$).'
    ],
    benefitTitle: 'Jean-Baptiste Bélanger 1828 Hydraulic Jump Momentum Equation',
    benefitContent: 'Hydraulic jumps occur when high-velocity supercritical flow abruptly transitions to slow subcritical flow, converting destructive kinetic energy into turbulent thermal heat dissipation to protect downstream riverbeds below spillway dam chutes.',
    faqs: [{ q: 'What Froude number produces the most stable hydraulic jump?', a: 'A Froude number between $4.5\text{ and }9.0$ creates a stable, well-formed hydraulic jump that dissipates $45\%\text{ to }70\%$ of upstream kinetic energy.' }]
  },

  // 13. Sharp-Crested & V-Notch Weir Open Channel Flow Rate Calculator
  {
    slug: 'weir-flow-rate-rectangular-triangular-v-notch-calculator',
    name: 'Weir Open Channel Flow Rate (Rectangular & 90° V-Notch Thomson Weir) Calculator',
    description: 'Calculate open channel open stream discharge using weirs: 90° V-Notch Triangular Weir (Q = 1.38 · H^(5/2)) and Rectangular Francis Weir (Q = 1.84 · (b - 0.2·H) · H^(3/2)) in m³/s and L/s.',
    category: 'Science',
    icon: 'text',
    keywords: ['weir flow rate calculator', 'v notch weir formula q equals 1.38 h to 5 halves online', 'rectangular weir francis formula discharge calculator', 'open channel weir head flow measurement calculator', 'civil hydraulic weir flow online'],
    order: 1069,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Weir Type (90° V-Notch vs Suppressed Rectangular), Head Above Crest H (m) & Crest Width b (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wr-type">Weir Type</label>
          <select class="tool-textarea" id="wr-type">
            <option value="vnotch" selected>90° V-Notch Weir (Thomson: Q = 1.38·H^2.5)</option>
            <option value="rectangular">Rectangular Weir (Francis: Q = 1.84·b·H^1.5)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="wr-h">Head H (m)</label>
          <input class="tool-textarea" id="wr-h" type="number" step="0.05" value="0.30" placeholder="0.30 m (30 cm Head)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wr-b">Crest Width b (m)</label>
          <input class="tool-textarea" id="wr-b" type="number" step="0.5" value="1.50" placeholder="1.50 m (Rectangular)" />
        </div>
      </div>
      <div id="wr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wr-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Discharge Q = 68.1 L / s (0.068 m³/s)</span>
            <span class="stat-label">Calculated Open Channel Discharge Flow Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wr-res-rate" style="color:var(--green-dark); font-weight:700;">Daily Volume = 5,884 m³ / day (245.2 m³/h | 90° Triangular V-Notch Thomson Standard)</span>
            <span class="stat-label">Volumetric Daily Runoff & Standard Rating Equation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const typeEl = document.getElementById('wr-type'), hEl = document.getElementById('wr-h'), bEl = document.getElementById('wr-b');
  const qResEl = document.getElementById('wr-res-q'), rtResEl = document.getElementById('wr-res-rate');

  function update() {
    const isVNotch = typeEl.value === 'vnotch';
    const H = parseFloat(hEl.value), b = parseFloat(bEl.value);

    if (isNaN(H) || H <= 0) return;

    let Q_m3s = 0;
    if (isVNotch) {
      // 90° V-notch formula (Thomson): Q = (8/15) * Cd * sqrt(2*g) * tan(theta/2) * H^(5/2) approx 1.38 * H^(2.5)
      Q_m3s = 1.38 * Math.pow(H, 2.5);
    } else {
      // Francis rectangular weir: Q = 1.84 * ( b - 0.2*H ) * H^(1.5)
      if (isNaN(b) || b <= 0) return;
      const b_eff = Math.max(0.1, b - 0.2 * H);
      Q_m3s = 1.84 * b_eff * Math.pow(H, 1.5);
    }

    const Q_Ls = Q_m3s * 1000.0;
    const Q_m3_day = Q_m3s * 86400.0;

    qResEl.textContent = 'Discharge Q = ' + (Q_Ls >= 1000 ? Q_m3s.toFixed(3) + ' m³ / s' : Q_Ls.toFixed(1) + ' L / s');
    rtResEl.textContent = 'Daily Runoff = ' + Math.round(Q_m3_day).toLocaleString() + ' m³/day (' + (Q_m3s * 3600).toFixed(1) + ' m³/h @ Head H = ' + H.toFixed(2) + ' m)';
  }

  [typeEl, hEl, bEl].forEach(el => el.addEventListener('input', update));
  typeEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select hydraulic weir geometry (90° Triangular V-Notch for small accurate flows vs Rectangular Francis Weir for rivers).',
      'Enter upstream liquid head height H above the weir crest in meters.',
      'Enter rectangular weir crest horizontal width b in meters.',
      'Inspect calculated open-channel volumetric discharge flow rate in Liters/second and $\text{m}^3/\text{day}$.'
    ],
    benefitTitle: 'James Thomson & James B. Francis Hydraulic Weir Standard',
    benefitContent: 'Sharp-crested weirs create a standardized critical depth waterfall ($Q \propto H^{2.5}$ for V-notches, $Q \propto H^{1.5}$ for rectangular weirs), allowing simple ultrasonic liquid level sensors to monitor stream discharge accurately without submerged moving parts.',
    faqs: [{ q: 'Why are V-notch weirs preferred for low flow rates?', a: 'Because a V-notch narrows toward the apex ($Q \propto H^{2.5}$), small changes in low discharge create easily measurable changes in head height.' }]
  },

  // 14. Water Hammer Joukowsky Transient Surge Pressure Calculator
  {
    slug: 'pipe-water-hammer-joukowsky-surge-pressure-calculator',
    name: 'Pipe Water Hammer & Joukowsky Transient Surge Pressure (ΔP = ρ·c·Δv) Calculator',
    description: 'Calculate pipeline hydraulic water hammer transient shock pressure (ΔP = ρ · c · Δv) in bar and MPa, acoustic wave speed c in m/s, and critical rapid valve closure time (t_cr = 2L / c) for water distribution piping.',
    category: 'Science',
    icon: 'text',
    keywords: ['water hammer calculator', 'joukowsky equation transient surge pressure delta p equals rho c delta v online', 'pipeline water hammer valve closure time calculator', 'acoustic wave speed pipeline shock pressure calculator bar', 'civil mechanical fluid piping surge analysis online'],
    order: 1070,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pipe Length L (m), Initial Velocity v (m/s), Pipe Material Wave Speed c (m/s, 1000-1400 m/s) & Fluid Density ρ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wh-l">Pipe Length L (m)</label>
          <input class="tool-textarea" id="wh-l" type="number" step="100" value="1000.0" placeholder="1,000 m (1 km Pipe)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wh-v">Fluid Velocity v (m/s)</label>
          <input class="tool-textarea" id="wh-v" type="number" step="0.5" value="2.0" placeholder="2.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wh-c">Wave Speed c (m/s)</label>
          <input class="tool-textarea" id="wh-c" type="number" step="50" value="1200.0" placeholder="1200.0 m/s (Steel Pipe)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wh-rho">Density ρ</label>
          <input class="tool-textarea" id="wh-rho" type="number" step="50" value="1000" placeholder="1000 kg/m³ (Water)" />
        </div>
      </div>
      <div id="wh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wh-res-dp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Surge ΔP = 24.00 bar (2.40 MPa / 244.8 m Head)</span>
            <span class="stat-label">Joukowsky Maximum Shock Pressure Rise (ΔP = ρ·c·Δv)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wh-res-tcr" style="color:var(--green-dark); font-weight:700;">Critical Valve Closure Time t_cr = 1.67 s (Closing valve in < 1.67 s triggers maximum water hammer)</span>
            <span class="stat-label">Critical Acoustic Round-Trip Reflection Time (2L / c)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('wh-l'), vEl = document.getElementById('wh-v');
  const cEl = document.getElementById('wh-c'), rhoEl = document.getElementById('wh-rho');
  const dpResEl = document.getElementById('wh-res-dp'), tcrResEl = document.getElementById('wh-res-tcr');

  const g = 9.80665;

  function update() {
    const L = parseFloat(lEl.value), v = parseFloat(vEl.value);
    const c = parseFloat(cEl.value), rho = parseFloat(rhoEl.value);

    if (isNaN(L) || isNaN(v) || isNaN(c) || isNaN(rho) || L <= 0 || v <= 0 || c <= 0 || rho <= 0) return;

    // Joukowsky Equation: deltaP = rho * c * delta_v  [Pascals]
    const deltaP_Pa = rho * c * v;
    const deltaP_bar = deltaP_Pa / 1e5;
    const deltaP_MPa = deltaP_Pa / 1e6;

    // Pressure head rise: deltaH = deltaP / (rho * g) = (c * v) / g  [meters]
    const deltaH_m = (c * v) / g;

    // Critical round-trip time: t_cr = 2 * L / c  [seconds]
    const t_cr = (2.0 * L) / c;

    dpResEl.textContent = 'Surge ΔP = ' + deltaP_bar.toFixed(2) + ' bar (' + deltaP_MPa.toFixed(2) + ' MPa / ' + deltaH_m.toFixed(1) + ' m Head)';
    tcrResEl.textContent = 'Critical Valve Time t_cr = ' + t_cr.toFixed(2) + ' s (Closing in less than ' + t_cr.toFixed(2) + ' s causes full 24 bar shock @ L = ' + L + ' m)';
  }

  [lEl, vEl, cEl, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total pipeline transmission length L in meters.',
      'Enter initial steady-state fluid flow velocity v in m/s.',
      'Enter acoustic pressure wave speed c in the fluid-pipe system in m/s (typically 1,000 to 1,400 m/s for water in steel/ductile iron pipes, 300 to 500 m/s in flexible HDPE).',
      'Enter fluid density $\rho$ (1,000 $\text{kg/m}^3$ for water).',
      'Inspect maximum Joukowsky transient shock pressure rise $\Delta P$ in bar and critical valve closure time $t_{\text{cr}} = 2L/c$.'
    ],
    benefitTitle: 'Nikolay Joukowsky 1898 Water Hammer Equation',
    benefitContent: 'Rapidly slamming a valve shut converts fluid kinetic momentum into an acoustic pressure shockwave ($\Delta P = \rho c \Delta v$), which can shatter cast iron pipes, burst pump casings, or collapse penstocks without surge suppression tanks or slow-closing motorized valves.',
    faqs: [{ q: 'How can water hammer be prevented in piping systems?', a: 'Install surge tanks, air release valves, hydropneumatic accumulator surge vessels, or ensure valve closure time exceeds $t_{\text{cr}} = 2L/c$.' }]
  },

  // 15. Flexible Pavement AASHTO Structural Number (SN) Sizing Calculator
  {
    slug: 'flexible-pavement-aashto-structural-number-sn-calculator',
    name: 'Flexible Pavement Design (AASHTO Structural Number SN = a₁·D₁ + a₂·D₂·m₂ + a₃·D₃·m₃) Calculator',
    description: 'Calculate asphalt highway flexible pavement Structural Number (SN = a₁·D₁ + a₂·D₂·m₂ + a₃·D₃·m₃) and evaluate allowable 18-kip Equivalent Single Axle Loads (ESALs) under AASHTO 1993 pavement design guides.',
    category: 'Science',
    icon: 'text',
    keywords: ['flexible pavement calculator', 'aashto structural number formula sn equals a1 d1 plus a2 d2 m2 online', 'asphalt pavement layer thickness sn calculator', 'esal axle load structural number pavement calculator', 'civil transportation highway pavement design online'],
    order: 1071,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Asphalt Surface Layer D₁ (inches, a₁ = 0.44), Crushed Base D₂ (inches, a₂ = 0.14) & Subbase D₃ (inches, a₃ = 0.11)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pv-d1">Asphalt D₁ (in)</label>
          <input class="tool-textarea" id="pv-d1" type="number" step="0.5" value="4.0" placeholder="4.0 in (100 mm HMA)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-d2">Base D₂ (in)</label>
          <input class="tool-textarea" id="pv-d2" type="number" step="1" value="8.0" placeholder="8.0 in (200 mm Crushed Stone)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-d3">Subbase D₃ (in)</label>
          <input class="tool-textarea" id="pv-d3" type="number" step="1" value="12.0" placeholder="12.0 in (300 mm Gravel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-m">Drainage (m)</label>
          <input class="tool-textarea" id="pv-m" type="number" step="0.05" min="0.5" max="1.4" value="1.00" placeholder="1.00 (Good Drainage)" />
        </div>
      </div>
      <div id="pv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pv-res-sn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Structural Number SN = 4.20</span>
            <span class="stat-label">Total Pavement Structural Capacity (SN)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pv-res-esal" style="color:var(--green-dark); font-weight:700;">Capacity: ~5.8 Million ESALs (Heavy Interstate Truck Traffic | D₁: 1.76 + D₂: 1.12 + D₃: 1.32)</span>
            <span class="stat-label">Allowable 18-kip Equivalent Single Axle Loads (ESALs)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const d1El = document.getElementById('pv-d1'), d2El = document.getElementById('pv-d2');
  const d3El = document.getElementById('pv-d3'), mEl = document.getElementById('pv-m');
  const snResEl = document.getElementById('pv-res-sn'), esResEl = document.getElementById('pv-res-esal');

  function update() {
    const D1 = parseFloat(d1El.value), D2 = parseFloat(d2El.value);
    const D3 = parseFloat(d3El.value), m = parseFloat(mEl.value);

    if (isNaN(D1) || isNaN(D2) || isNaN(D3) || isNaN(m) || D1 < 0 || D2 < 0 || D3 < 0 || m <= 0) return;

    // Standard AASHTO layer structural coefficients:
    // Hot Mix Asphalt (HMA): a1 = 0.44 per inch
    // Crushed aggregate base: a2 = 0.14 per inch
    // Granular subbase: a3 = 0.11 per inch
    const sn1 = 0.44 * D1;
    const sn2 = 0.14 * D2 * m;
    const sn3 = 0.11 * D3 * m;

    const SN = sn1 + sn2 + sn3;

    // Approximate AASHTO ESALs capacity: ESALs approx = 10^( (SN - 1.5) / 0.45 ) * 100,000
    const esals = Math.pow(10.0, (SN - 1.5) / 0.55) * 50000;
    const esal_millions = esals / 1e6;

    snResEl.textContent = 'Structural Number SN = ' + SN.toFixed(2);
    esResEl.textContent = 'Capacity ≈ ' + esal_millions.toFixed(1) + 'M ESALs (HMA: ' + sn1.toFixed(2) + ' + Base: ' + sn2.toFixed(2) + ' + Subbase: ' + sn3.toFixed(2) + ' @ m = ' + m + ')';
  }

  [d1El, d2El, d3El, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Hot Mix Asphalt (HMA) surface course layer thickness $D_1$ in inches.',
      'Enter crushed aggregate stone base layer thickness $D_2$ in inches.',
      'Enter granular gravel subbase layer thickness $D_3$ in inches.',
      'Enter drainage quality modifier coefficient m ($0.80\text{ to }1.20$).',
      'Inspect total AASHTO Structural Number (SN) and estimated lifetime allowable heavy truck axle passes (ESALs).'
    ],
    benefitTitle: 'AASHTO 1993 Empirical Pavement Design Standard',
    benefitContent: 'The Structural Number ($SN = a_1 D_1 + a_2 D_2 m_2 + a_3 D_3 m_3$) converts multi-layered flexible pavement systems into an index representing structural capacity to distribute heavy commercial truck wheel loads onto the subgrade soil without rutting or fatigue cracking.',
    faqs: [{ q: 'What is an ESAL in transportation pavement design?', a: 'An ESAL (Equivalent Single Axle Load) standardizes the damaging effect of varying axle configurations relative to one standard 18,000-pound ($80\text{ kN}$) single axle.' }]
  },

  // 16. Structural Steel Compact W-Shape Plastic Moment Capacity Calculator
  {
    slug: 'steel-w-shape-beam-compact-section-plastic-moment-calculator',
    name: 'Structural Steel W-Shape Beam Plastic Moment Capacity (M_p = F_y·Z_x) Calculator',
    description: 'Calculate structural steel wide-flange I-beam (W-Shape) Plastic Moment flexural capacity (M_p = F_y · Z_x) in kN·m and kip·ft, yield moment (M_y = F_y · S_x), and Shape Factor (k = Z_x / S_x) under AISC 360.',
    category: 'Science',
    icon: 'text',
    keywords: ['steel beam moment capacity calculator', 'plastic moment formula mp equals fy zx aisc online', 'plastic section modulus zx yield moment my calculator', 'shape factor w beam structural steel calculator', 'civil structural steel flexural design online'],
    order: 1072,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Steel Yield Strength F_y (MPa, Grade 50 = 345 MPa), Plastic Modulus Z_x (cm³) & Elastic S_x (cm³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="st-fy">Yield F_y (MPa)</label>
          <input class="tool-textarea" id="st-fy" type="number" step="25" value="345.0" placeholder="345.0 MPa (ASTM A992 / 50 ksi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-zx">Plastic Z_x (cm³)</label>
          <input class="tool-textarea" id="st-zx" type="number" step="100" value="1200.0" placeholder="1200.0 cm³ (W16x40 approx)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-sx">Elastic S_x (cm³)</label>
          <input class="tool-textarea" id="st-sx" type="number" step="100" value="1050.0" placeholder="1050.0 cm³" />
        </div>
      </div>
      <div id="st-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="st-res-mp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">M_p = 414.00 kN·m (305.4 kip·ft)</span>
            <span class="stat-label">AISC Plastic Moment Bending Capacity (M_p = F_y · Z_x)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="st-res-shape" style="color:var(--green-dark); font-weight:700;">Yield Moment M_y = 362.25 kN·m | Shape Factor = 1.14 (14.3% Plastic Reserve Strength)</span>
            <span class="stat-label">Yield Moment (M_y = F_y · S_x) & Shape Factor (Z_x / S_x)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fyEl = document.getElementById('st-fy'), zxEl = document.getElementById('st-zx'), sxEl = document.getElementById('st-sx');
  const mpResEl = document.getElementById('st-res-mp'), shResEl = document.getElementById('st-res-shape');

  function update() {
    const Fy_MPa = parseFloat(fyEl.value), Zx_cm3 = parseFloat(zxEl.value), Sx_cm3 = parseFloat(sxEl.value);
    if (isNaN(Fy_MPa) || isNaN(Zx_cm3) || isNaN(Sx_cm3) || Fy_MPa <= 0 || Zx_cm3 <= 0 || Sx_cm3 <= 0) return;

    // Convert cm^3 to m^3 (1 cm^3 = 10^-6 m^3):
    const Zx_m3 = Zx_cm3 * 1e-6;
    const Sx_m3 = Sx_cm3 * 1e-6;
    const Fy_Pa = Fy_MPa * 1e6;

    // Plastic Moment: M_p = F_y * Z_x  [N * m -> kN * m]
    const Mp_kNm = (Fy_Pa * Zx_m3) / 1000.0;
    const Mp_kipft = Mp_kNm * 0.737562;

    // Elastic Yield Moment: M_y = F_y * S_x  [kN * m]
    const My_kNm = (Fy_Pa * Sx_m3) / 1000.0;

    // Shape factor k = Z_x / S_x
    const shapeFactor = Zx_cm3 / Sx_cm3;
    const reservePct = (shapeFactor - 1.0) * 100.0;

    // LRFD design moment (phi = 0.90):
    const phi_Mp = 0.90 * Mp_kNm;

    mpResEl.textContent = 'M_p = ' + Mp_kNm.toFixed(2) + ' kN·m (φ·M_p = ' + phi_Mp.toFixed(1) + ' kN·m)';
    shResEl.textContent = 'Yield M_y = ' + My_kNm.toFixed(2) + ' kN·m | Shape Factor = ' + shapeFactor.toFixed(2) + ' (+' + reservePct.toFixed(1) + '% Plastic Reserve @ F_y = ' + Fy_MPa + ' MPa)';
  }

  [fyEl, zxEl, sxEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter steel structural yield strength $F_y$ in MPa (e.g. 250 MPa for A36, 345 MPa / 50 ksi for A992).',
      'Enter plastic section modulus $Z_x$ in $\text{cm}^3$ from AISC steel manual tables.',
      'Enter elastic section modulus $S_x$ in $\text{cm}^3$.',
      'Inspect Plastic Moment capacity $M_p$, Yield Moment $M_y$, and plastic cross-section Shape Factor.'
    ],
    benefitTitle: 'AISC 360 Plastic Limit State Structural Design',
    benefitContent: 'Compact steel sections develop complete plastic hinging across the entire depth before local buckling occurs ($M_p = F_y Z_x$), unlocking an extra $12\%\text{ to }15\%$ reserve load capacity beyond first yield ($M_y$).',
    faqs: [{ q: 'What is the Shape Factor of an I-beam vs a solid rectangle?', a: 'A standard wide-flange I-beam has a shape factor of $\sim 1.12\text{–}1.15$, whereas a solid rectangular beam has a shape factor of $1.50$.' }]
  },

  // 17. Method of Joints 2D Pin-Jointed Truss Member Force Calculator
  {
    slug: 'truss-method-of-joints-member-axial-force-calculator',
    name: '2D Pin-Jointed Truss Member Axial Force (Method of Joints ΣF_x = 0, ΣF_y = 0) Calculator',
    description: 'Calculate planar pin-connected structural truss joint equilibrium member forces (Tension vs Compression in kN) using static Method of Joints (ΣF_x = 0, ΣF_y = 0) for civil and mechanical engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['truss calculator', 'method of joints truss member force formula online', 'pin jointed truss tension compression calculator', 'structural statics truss joint equilibrium calculator', 'civil engineering bridge truss analysis online'],
    order: 1073,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Joint Downward Point Load P (kN), Chord Angle θ (° from Horizontal) & Support Reaction R_y (kN)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tr-p">Vertical Load P (kN)</label>
          <input class="tool-textarea" id="tr-p" type="number" step="10" value="50.0" placeholder="50.0 kN" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-th">Diagonal Angle θ (°)</label>
          <input class="tool-textarea" id="tr-th" type="number" step="5" min="15" max="75" value="45.0" placeholder="45.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-ry">Support Reaction R_y</label>
          <input class="tool-textarea" id="tr-ry" type="number" step="10" value="25.0" placeholder="25.0 kN (Half Span)" />
        </div>
      </div>
      <div id="tr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tr-res-diag" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F_diag = 35.36 kN (COMPRESSION)</span>
            <span class="stat-label">Diagonal Truss Strut Member Force</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tr-res-chord" style="color:var(--green-dark); font-weight:700;">Bottom Chord F_bot = +25.00 kN (TENSION) | Joint ΣF_x = 0, ΣF_y = 0 in Static Equilibrium</span>
            <span class="stat-label">Bottom Chord Tie Member Force & Equilibrium Check</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('tr-p'), thEl = document.getElementById('tr-th'), ryEl = document.getElementById('tr-ry');
  const dgResEl = document.getElementById('tr-res-diag'), chResEl = document.getElementById('tr-res-chord');

  function update() {
    const P = parseFloat(pEl.value), theta_deg = parseFloat(thEl.value), R_y = parseFloat(ryEl.value);
    if (isNaN(P) || isNaN(theta_deg) || isNaN(R_y) || theta_deg <= 0 || theta_deg >= 90) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const sin_th = Math.sin(theta_rad);
    const cos_th = Math.cos(theta_rad);

    // At support joint:
    // Sigma F_y = 0 => R_y - F_diag * sin(theta) = 0 => F_diag = R_y / sin(theta) [Compression]
    const F_diag = R_y / sin_th;

    // Sigma F_x = 0 => F_bottom - F_diag * cos(theta) = 0 => F_bottom = F_diag * cos(theta) = R_y / tan(theta) [Tension]
    const F_bottom = R_y / Math.tan(theta_rad);

    dgResEl.textContent = 'F_diag = ' + F_diag.toFixed(2) + ' kN (COMPRESSION)';
    chResEl.textContent = 'Bottom Tie F_bot = +' + F_bottom.toFixed(2) + ' kN (TENSION) | R_y = ' + R_y + ' kN @ θ = ' + theta_deg + '°';
  }

  [pEl, thEl, ryEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied downward joint nodal load P in kN.',
      'Enter truss web diagonal member angle $\theta$ in degrees from the horizontal.',
      'Enter upward support vertical reaction force $R_y$ in kN.',
      'Inspect diagonal strut compressive force and bottom chord horizontal tension force.'
    ],
    benefitTitle: 'Method of Joints Static Equilibrium Principle',
    benefitContent: 'Because pin joints cannot transmit bending moments, every truss node is in concurrent coplanar static equilibrium ($\sum F_x = 0, \sum F_y = 0$), allowing straightforward determination of axial tension ties and compression struts in bridge trusses.',
    faqs: [{ q: 'What is a Zero-Force Member in a truss?', a: 'A zero-force member carries zero axial force under a specific loading condition but provides essential lateral buckling stability.' }]
  },

  // 18. Sound Transmission Class (STC) Wall Partition Soundproofing Calculator
  {
    slug: 'sound-transmission-class-stc-wall-soundproofing-calculator',
    name: 'Architectural Sound Transmission Class (STC & Mass Law Transmission Loss) Calculator',
    description: 'Calculate architectural wall partition sound transmission loss (TL = 20·log₁₀(m_s) + 20·log₁₀(f) - 47 dB), Sound Transmission Class (STC rating), and evaluate speech privacy (STC 35 to STC 55+).',
    category: 'Science',
    icon: 'text',
    keywords: ['sound transmission class calculator', 'stc rating formula mass law transmission loss online', 'wall soundproofing decibel reduction stc calculator', 'acoustic speech privacy partition wall stc calculator', 'architectural acoustics sound isolation online'],
    order: 1074,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wall Surface Mass Density m_s (kg/m²), Sound Frequency f (Hz) & Partition Wall Type',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="stc-wall">Wall System</label>
          <select class="tool-textarea" id="stc-wall">
            <option value="25_40" selected>Single Stud Drywall (m_s = 25 kg/m², STC ~40)</option>
            <option value="50_50">Double Layer + Batt Insulation (m_s = 50 kg/m², STC ~50)</option>
            <option value="150_55">Concrete Masonry Block CMU (m_s = 150 kg/m², STC ~55)</option>
            <option value="240_58">Solid Poured Concrete 100mm (m_s = 240 kg/m², STC ~58)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="stc-freq">Frequency f (Hz)</label>
          <input class="tool-textarea" id="stc-freq" type="number" step="100" value="500.0" placeholder="500.0 Hz (Speech Center)" />
        </div>
      </div>
      <div id="stc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="stc-res-stc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">STC ≈ 40 (Moderate Privacy)</span>
            <span class="stat-label">Sound Transmission Class Rating (STC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="stc-res-tl" style="color:var(--green-dark); font-weight:700;">Transmission Loss TL = 34.9 dB @ 500 Hz | Loud speech heard but unintelligible</span>
            <span class="stat-label">Acoustic Mass Law Transmission Loss (TL) & Speech Privacy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('stc-wall'), fEl = document.getElementById('stc-freq');
  const stcResEl = document.getElementById('stc-res-stc'), tlResEl = document.getElementById('stc-res-tl');

  function update() {
    const parts = wEl.value.split('_');
    const m_s = parseFloat(parts[0]);
    const nominalSTC = parseInt(parts[1], 10);
    const f = parseFloat(fEl.value);

    if (isNaN(m_s) || isNaN(f) || m_s <= 0 || f <= 0) return;

    // Theoretical Mass Law for Transmission Loss: TL = 20*log10(m_s) + 20*log10(f) - 47.2  [dB]
    const TL = (20.0 * Math.log10(m_s)) + (20.0 * Math.log10(f)) - 47.2;

    let privacy = '', color = '#22543d';
    if (nominalSTC >= 55) { privacy = 'EXCELLENT PRIVACY (STC 55+: Music / shouting completely inaudible)'; color = '#22543d'; }
    else if (nominalSTC >= 50) { privacy = 'HIGH PRIVACY (STC 50+: Multi-family residential building code standard)'; color = '#22543d'; }
    else if (nominalSTC >= 40) { privacy = 'MODERATE PRIVACY (STC 40-49: Loud speech heard faintly)'; color = '#2563eb'; }
    else { privacy = 'POOR PRIVACY (STC < 40: Normal conversation clearly audible through wall)'; color = '#c53030'; }

    stcResEl.textContent = 'STC ≈ ' + nominalSTC + ' (' + privacy.split(' (')[0] + ')';
    stcResEl.style.color = color;
    tlResEl.textContent = 'Transmission Loss TL = ' + TL.toFixed(1) + ' dB @ ' + f + ' Hz (Mass m_s = ' + m_s + ' kg/m² | ' + privacy + ')';
    tlResEl.style.color = color;
  }

  wEl.addEventListener('change', update);
  fEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select wall assembly construction partition type (Single Stud Drywall, Insulated Double Wall, Concrete Block, Poured Concrete).',
      'Enter acoustic sound frequency f in Hertz (e.g. 500 Hz or 1,000 Hz for human speech).',
      'Inspect Sound Transmission Class (STC rating), Transmission Loss in dB, and architectural speech privacy compliance.'
    ],
    benefitTitle: 'ASTM E90 & E413 Architectural Soundproofing Standard',
    benefitContent: 'The Acoustic Mass Law dictates that doubling wall surface mass increases sound transmission loss by $6\text{ dB}$; building codes mandate minimum $\text{STC } 50$ between adjacent apartment condominium units.',
    faqs: [{ q: 'What is the minimum STC required by the International Building Code (IBC)?', a: 'IBC Section 1207 mandates a minimum laboratory rating of $\text{STC } 50$ (or field test $\text{FSTC } 45$) for walls and floor-ceiling assemblies separating dwelling units.' }]
  },

  // 19. Soil Compaction Proctor Optimum Moisture Content & Dry Density Calculator
  {
    slug: 'soil-compaction-proctor-optimum-moisture-maximum-dry-density-calculator',
    name: 'Soil Compaction Proctor Test (γ_d = γ_wet / (1 + w)) & Relative Compaction Calculator',
    description: 'Calculate geotechnical soil dry density (γ_d = γ_wet / (1 + w)) in kN/m³, zero-air-voids theoretical density (γ_zav = G_s·γ_w / (1 + w·G_s)), and field Relative Compaction percentage (RC = γ_d_field / γ_d_max · 100).',
    category: 'Science',
    icon: 'text',
    keywords: ['proctor compaction calculator', 'soil dry density formula gamma d equals gamma wet over 1 plus w online', 'optimum moisture content maximum dry density proctor calculator', 'relative compaction percentage field density calculator', 'geotechnical earthwork soil compaction online'],
    order: 1075,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Field Moist Unit Weight γ_wet (kN/m³), Moisture Content w (%), Lab Max γ_d_max (kN/m³) & Specific Gravity G_s',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pr-gwet">Moist γ_wet (kN/m³)</label>
          <input class="tool-textarea" id="pr-gwet" type="number" step="0.5" value="20.5" placeholder="20.5 kN/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-w">Moisture w (%)</label>
          <input class="tool-textarea" id="pr-w" type="number" step="0.5" value="12.0" placeholder="12.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-max">Lab Max γ_d_max</label>
          <input class="tool-textarea" id="pr-max" type="number" step="0.5" value="19.0" placeholder="19.0 kN/m³ (Standard Proctor)" />
        </div>
      </div>
      <div id="pr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pr-res-gd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Dry Density γ_d = 18.30 kN / m³</span>
            <span class="stat-label">Soil Dry Unit Weight (γ_d = γ_wet / (1 + w))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pr-res-rc" style="color:var(--green-dark); font-weight:700;">Relative Compaction RC = 96.3% (PASSES: Exceeds standard 95% specification threshold)</span>
            <span class="stat-label">Field Relative Compaction Quality Control Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gwEl = document.getElementById('pr-gwet'), wEl = document.getElementById('pr-w'), maxEl = document.getElementById('pr-max');
  const gdResEl = document.getElementById('pr-res-gd'), rcResEl = document.getElementById('pr-res-rc');

  function update() {
    const gamma_wet = parseFloat(gwEl.value), w_pct = parseFloat(wEl.value), gamma_d_max = parseFloat(maxEl.value);
    if (isNaN(gamma_wet) || isNaN(w_pct) || isNaN(gamma_d_max) || gamma_wet <= 0 || w_pct < 0 || gamma_d_max <= 0) return;

    const w_dec = w_pct / 100.0;

    // Dry density: gamma_d = gamma_wet / ( 1 + w )  [kN / m^3]
    const gamma_d = gamma_wet / (1.0 + w_dec);

    // Relative compaction: RC = ( gamma_d / gamma_d_max ) * 100  [%]
    const RC = (gamma_d / gamma_d_max) * 100.0;

    let passStatus = '', color = '#22543d';
    if (RC >= 95.0) {
      passStatus = 'PASSES SPECIFICATION (RC = ' + RC.toFixed(1) + '% ≥ 95.0%: High structural stability)';
      color = '#22543d';
    } else {
      passStatus = 'FAILS (RC = ' + RC.toFixed(1) + '% < 95.0%: Additional roller compaction passes required!)';
      color = '#c53030';
    }

    gdResEl.textContent = 'Dry Density γ_d = ' + gamma_d.toFixed(2) + ' kN / m³';
    rcResEl.textContent = 'Relative Compaction RC = ' + RC.toFixed(1) + '% | ' + passStatus + ' (w = ' + w_pct + '%)';
    rcResEl.style.color = color;
  }

  [gwEl, wEl, maxEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter field wet soil unit weight $\gamma_{\text{wet}}$ in $\text{kN/m}^3$ (from nuclear gauge or sand cone test).',
      'Enter soil water moisture content w (%).',
      'Enter laboratory maximum dry density $\gamma_{d,\max}$ from standard/modified Proctor test.',
      'Inspect dry unit weight $\gamma_d$ and verify field Relative Compaction percentage compliance ($RC \ge 95\%$).'
    ],
    benefitTitle: 'Ralph R. Proctor 1933 Earthwork Compaction Standard',
    benefitContent: 'Compaction expels air voids from soil, increasing shear strength, reducing hydraulic permeability, and minimizing future post-construction building foundation settlement.',
    faqs: [{ q: 'What is Optimum Moisture Content (OMC)?', a: 'OMC is the exact water content at which soil reaches its maximum possible dry density for a given compaction energy effort.' }]
  },

  // 20. Direct Shear Test Mohr-Coulomb Soil Cohesion & Friction Angle Calculator
  {
    slug: 'direct-shear-test-mohr-coulomb-cohesion-friction-angle-calculator',
    name: 'Direct Shear Test Mohr-Coulomb Shear Strength (τ = c + σ·tan φ) Calculator',
    description: 'Calculate geotechnical soil shear strength parameters: internal angle of friction φ in degrees and cohesion c in kPa from direct shear box normal stresses (σ) and failure shear stresses (τ) under ASTM D3080.',
    category: 'Science',
    icon: 'text',
    keywords: ['direct shear test calculator', 'mohr coulomb shear strength formula tau equals c plus sigma tan phi online', 'soil friction angle cohesion calculator astm d3080', 'shear strength failure envelope geotechnical calculator', 'soil mechanics direct shear box online'],
    order: 1076,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Test 1 (Normal σ₁ in kPa, Shear τ₁ in kPa) & Test 2 (Normal σ₂ in kPa, Shear τ₂ in kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ds-s1">Normal σ₁ (kPa)</label>
          <input class="tool-textarea" id="ds-s1" type="number" step="25" value="50.0" placeholder="50.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ds-t1">Shear τ₁ (kPa)</label>
          <input class="tool-textarea" id="ds-t1" type="number" step="10" value="40.0" placeholder="40.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ds-s2">Normal σ₂ (kPa)</label>
          <input class="tool-textarea" id="ds-s2" type="number" step="25" value="150.0" placeholder="150.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ds-t2">Shear τ₂ (kPa)</label>
          <input class="tool-textarea" id="ds-t2" type="number" step="10" value="100.0" placeholder="100.0 kPa" />
        </div>
      </div>
      <div id="ds-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ds-res-phi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Friction Angle φ = 30.96°</span>
            <span class="stat-label">Mohr-Coulomb Angle of Internal Friction (φ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ds-res-c" style="color:var(--green-dark); font-weight:700;">Cohesion c = 10.00 kPa | Envelope: τ = 10.00 + σ·tan(30.96°)</span>
            <span class="stat-label">Apparent Soil Cohesion Intercept (c) & Strength Envelope</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const s1El = document.getElementById('ds-s1'), t1El = document.getElementById('ds-t1');
  const s2El = document.getElementById('ds-s2'), t2El = document.getElementById('ds-t2');
  const phiResEl = document.getElementById('ds-res-phi'), cResEl = document.getElementById('ds-res-c');

  function update() {
    const s1 = parseFloat(s1El.value), t1 = parseFloat(t1El.value);
    const s2 = parseFloat(s2El.value), t2 = parseFloat(t2El.value);

    if (isNaN(s1) || isNaN(t1) || isNaN(s2) || isNaN(t2) || s1 <= 0 || s2 <= s1 || t1 <= 0 || t2 <= 0) return;

    // Linear regression slope = tan(phi) = (t2 - t1) / (s2 - s1)
    const tan_phi = (t2 - t1) / (s2 - s1);
    const phi_rad = Math.atan(tan_phi);
    const phi_deg = (phi_rad * 180.0) / Math.PI;

    // Cohesion intercept: c = t1 - s1 * tan(phi)
    const c = Math.max(0, t1 - (s1 * tan_phi));

    phiResEl.textContent = 'Friction Angle φ = ' + phi_deg.toFixed(2) + '°';
    cResEl.textContent = 'Cohesion c = ' + c.toFixed(2) + ' kPa | Envelope: τ = ' + c.toFixed(2) + ' + σ·tan(' + phi_deg.toFixed(1) + '°)';
  }

  [s1El, t1El, s2El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter normal stress $\sigma_1$ and peak shear failure stress $\tau_1$ from direct shear lab test 1.',
      'Enter higher normal stress $\sigma_2$ and resulting shear failure stress $\tau_2$ from test 2.',
      'Inspect internal friction angle $\phi$ and cohesion intercept c defining the Mohr-Coulomb failure envelope ($\tau = c + \sigma \tan\phi$).'
    ],
    benefitTitle: 'Charles-Augustin de Coulomb 1776 Soil Shear Strength Law',
    benefitContent: 'The Mohr-Coulomb failure criterion models soil shear resistance as the sum of particle interlocking friction ($\sigma \tan\phi$) and electrostatic clay cohesion (c), governing slope stability, retaining walls, and foundation bearing capacity.',
    faqs: [{ q: 'What is the friction angle of a purely cohesive clay vs dry sand?', a: 'Saturated undrained clay has $\phi_u = 0^\circ$ (pure cohesion $c = S_u$), while clean sand has $c = 0\text{ kPa}$ (pure friction $\phi \approx 30^\circ\text{–}38^\circ$).' }]
  },

  // 21. Asphalt Marshall Mix Air Voids (V_a), VMA & VFA Calculator
  {
    slug: 'asphalt-air-voids-vma-vfa-marshall-mix-calculator',
    name: 'Asphalt Pavement Marshall Mix Volumetrics (Air Voids V_a, VMA & VFA) Calculator',
    description: 'Calculate Hot Mix Asphalt (HMA) volumetric properties: Air Voids (V_a in %), Voids in Mineral Aggregate (VMA in %), and Voids Filled with Asphalt (VFA in %) from bulk and maximum theoretical specific gravities under Superpave / Marshall standards.',
    category: 'Science',
    icon: 'text',
    keywords: ['asphalt volumetrics calculator', 'air voids va vma vfa formula superpave marshall online', 'voids in mineral aggregate vma asphalt mix calculator', 'bulk specific gravity maximum theoretical gmm gmb calculator', 'civil transportation asphalt paving technology online'],
    order: 1077,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Bulk Specific Gravity G_mb, Maximum Theoretical G_mm, Binder Content P_b (%) & Combined Aggregate G_sb',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="as-gmb">Bulk G_mb</label>
          <input class="tool-textarea" id="as-gmb" type="number" step="0.01" value="2.380" placeholder="2.380 (Core / Lab)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-gmm">Max G_mm</label>
          <input class="tool-textarea" id="as-gmm" type="number" step="0.01" value="2.480" placeholder="2.480 (Rice Gravity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-pb">Binder P_b (%)</label>
          <input class="tool-textarea" id="as-pb" type="number" step="0.2" value="5.2" placeholder="5.2% Bitumen" />
        </div>
        <div class="control-group">
          <label class="control-label" for="as-gsb">Aggregate G_sb</label>
          <input class="tool-textarea" id="as-gsb" type="number" step="0.01" value="2.650" placeholder="2.650" />
        </div>
      </div>
      <div id="as-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="as-res-va" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Air Voids V_a = 4.03% (OPTIMAL)</span>
            <span class="stat-label">Air Voids Percentage (Target: 4.0% Superpave Standard)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="as-res-vma" style="color:var(--green-dark); font-weight:700;">VMA = 14.86% (≥ 14.0% Min) | VFA = 72.88% (65-78% Standard: Excellent Rutting & Fatigue Durability)</span>
            <span class="stat-label">Voids in Mineral Aggregate (VMA) & Voids Filled with Asphalt (VFA)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gmbEl = document.getElementById('as-gmb'), gmmEl = document.getElementById('as-gmm');
  const pbEl = document.getElementById('as-pb'), gsbEl = document.getElementById('as-gsb');
  const vaResEl = document.getElementById('as-res-va'), vmaResEl = document.getElementById('as-res-vma');

  function update() {
    const G_mb = parseFloat(gmbEl.value), G_mm = parseFloat(gmmEl.value);
    const P_b = parseFloat(pbEl.value), G_sb = parseFloat(gsbEl.value);

    if (isNaN(G_mb) || isNaN(G_mm) || isNaN(P_b) || isNaN(G_sb) || G_mb <= 0 || G_mm <= G_mb || P_b <= 0 || G_sb <= 0) return;

    // Air Voids: V_a = [ (G_mm - G_mb) / G_mm ] * 100  [%]
    const V_a = ((G_mm - G_mb) / G_mm) * 100.0;

    // Aggregate percentage P_s = 100 - P_b
    const P_s = 100.0 - P_b;

    // Voids in Mineral Aggregate: VMA = 100 - ( G_mb * P_s / G_sb )  [%]
    const VMA = 100.0 - ((G_mb * P_s) / G_sb);

    // Voids Filled with Asphalt: VFA = [ (VMA - V_a) / VMA ] * 100  [%]
    const VFA = ((VMA - V_a) / VMA) * 100.0;

    let vaStatus = '', color = '#22543d';
    if (V_a >= 3.0 && V_a <= 5.0) {
      vaStatus = 'OPTIMAL COMPLIANCE (3.0% - 5.0% Target)';
      color = '#22543d';
    } else if (V_a < 3.0) {
      vaStatus = 'RUTTING RISK (Air Voids < 3.0%: Bleeding / plastic flushing)';
      color = '#c53030';
    } else {
      vaStatus = 'PERMEABILITY RISK (Air Voids > 5.0%: Premature oxidative aging & moisture ravelling)';
      color = '#ea580c';
    }

    vaResEl.textContent = 'Air Voids V_a = ' + V_a.toFixed(2) + '% (' + vaStatus.split(' (')[0] + ')';
    vaResEl.style.color = color;
    vmaResEl.textContent = 'VMA = ' + VMA.toFixed(2) + '% | VFA = ' + VFA.toFixed(2) + '% (Binder P_b = ' + P_b + '% | ' + vaStatus + ')';
    vmaResEl.style.color = color;
  }

  [gmbEl, gmmEl, pbEl, gsbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter compacted asphalt specimen bulk specific gravity $G_{mb}$.',
      'Enter theoretical maximum specific gravity $G_{mm}$ (Rice test).',
      'Enter asphalt binder content percentage $P_b$ by total mix weight.',
      'Enter blended combined aggregate bulk specific gravity $G_{sb}$.',
      'Inspect Air Voids ($V_a$), Voids in Mineral Aggregate (VMA), and Voids Filled with Asphalt (VFA).'
    ],
    benefitTitle: 'Superpave Asphalt Volumetric Mix Design Standard',
    benefitContent: 'Targeting exactly $4.0\%$ air voids ($V_a$) provides the optimum balance between structural rutting resistance under heavy summer truck axle loads and sufficient binder thickness for durability against cold weather thermal cracking.',
    faqs: [{ q: 'What happens if asphalt air voids drop below 3.0%?', a: 'Traffic compaction squeezes asphalt binder to the pavement surface ("flushing/bleeding"), causing permanent rutting grooves and slippery hydroplaning hazards.' }]
  },

  // 22. Timber Wood Beam Bending Shear & Deflection (NDS) Calculator
  {
    slug: 'timber-wood-beam-bending-shear-deflection-ndsi-calculator',
    name: 'Timber Wood Beam Flexural Bending & Shear Capacity (NDS Standard) Calculator',
    description: 'Calculate structural timber joist and beam actual bending stress (f_b = M / S), horizontal shear stress (f_v = 1.5·V / A), and elastic live-load deflection (δ = 5·w·L⁴ / 384·E·I) under NDS wood design standards.',
    category: 'Science',
    icon: 'text',
    keywords: ['timber beam calculator', 'wood beam bending shear stress formula nds online', 'timber joist deflection 5 w l4 over 384 e i calculator', 'rectangular wood beam section modulus moment of inertia calculator', 'structural wood timber design online'],
    order: 1078,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Beam Width b (mm, e.g. 50 mm), Depth h (mm, e.g. 200 mm), Span L (m) & Uniform Load w (kN/m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tm-b">Width b (mm)</label>
          <input class="tool-textarea" id="tm-b" type="number" step="10" value="50.0" placeholder="50.0 mm (2-inch nominal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-h">Depth h (mm)</label>
          <input class="tool-textarea" id="tm-h" type="number" step="25" value="200.0" placeholder="200.0 mm (8-inch nominal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-l">Span L (m)</label>
          <input class="tool-textarea" id="tm-l" type="number" step="0.5" value="4.0" placeholder="4.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-w">Load w (kN/m)</label>
          <input class="tool-textarea" id="tm-w" type="number" step="0.5" value="2.5" placeholder="2.5 kN/m" />
        </div>
      </div>
      <div id="tm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tm-res-fb" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bending f_b = 15.00 MPa</span>
            <span class="stat-label">Actual Extreme Fiber Bending Stress (f_b = M / S)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tm-res-shear" style="color:var(--green-dark); font-weight:700;">Horizontal Shear f_v = 0.75 MPa | Deflection δ = 10.42 mm (L / 384: Passes L/360 Limit)</span>
            <span class="stat-label">Horizontal Shear Stress (1.5·V/A) & Midspan Deflection</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('tm-b'), hEl = document.getElementById('tm-h');
  const lEl = document.getElementById('tm-l'), wEl = document.getElementById('tm-w');
  const fbResEl = document.getElementById('tm-res-fb'), shResEl = document.getElementById('tm-res-shear');

  const E_wood_GPa = 11.0; // Typical Douglas Fir / Pine Modulus of Elasticity

  function update() {
    const b_mm = parseFloat(bEl.value), h_mm = parseFloat(hEl.value);
    const L_m = parseFloat(lEl.value), w_kNm = parseFloat(wEl.value);

    if (isNaN(b_mm) || isNaN(h_mm) || isNaN(L_m) || isNaN(w_kNm) || b_mm <= 0 || h_mm <= 0 || L_m <= 0 || w_kNm <= 0) return;

    // Cross-sectional properties:
    // Area A = b * h  [mm^2]
    const A_mm2 = b_mm * h_mm;
    // Section Modulus S = ( b * h^2 ) / 6  [mm^3]
    const S_mm3 = (b_mm * Math.pow(h_mm, 2)) / 6.0;
    // Moment of Inertia I = ( b * h^3 ) / 12  [mm^4]
    const I_mm4 = (b_mm * Math.pow(h_mm, 3)) / 12.0;

    // Max bending moment: M = w * L^2 / 8  [kN * m -> N * mm]
    const M_kNm = (w_kNm * Math.pow(L_m, 2)) / 8.0;
    const M_Nmm = M_kNm * 1e6;

    // Bending stress f_b = M / S  [MPa]
    const f_b = M_Nmm / S_mm3;

    // Max shear force: V = w * L / 2  [kN -> N]
    const V_N = (w_kNm * L_m * 1000.0) / 2.0;
    // Horizontal shear stress for rectangular beam: f_v = 1.5 * V / A  [MPa]
    const f_v = (1.5 * V_N) / A_mm2;

    // Midspan deflection: delta = ( 5 * w * L^4 ) / ( 384 * E * I )  [mm]
    const w_N_mm = w_kNm; // 1 kN/m = 1 N/mm
    const L_mm = L_m * 1000.0;
    const E_MPa = E_wood_GPa * 1000.0;
    const delta_mm = (5.0 * w_N_mm * Math.pow(L_mm, 4)) / (384.0 * E_MPa * I_mm4);

    const spanRatio = Math.round(L_mm / delta_mm);

    fbResEl.textContent = 'Bending f_b = ' + f_b.toFixed(2) + ' MPa (M = ' + M_kNm.toFixed(2) + ' kN·m)';
    shResEl.textContent = 'Shear f_v = ' + f_v.toFixed(2) + ' MPa | Deflection δ = ' + delta_mm.toFixed(2) + ' mm (L / ' + spanRatio + ' @ ' + b_mm + '×' + h_mm + ' mm)';
  }

  [bEl, hEl, lEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter timber beam cross-sectional width b in mm.',
      'Enter beam vertical height depth h in mm.',
      'Enter unsupported beam clear span L in meters.',
      'Enter total uniform distributed dead plus live load w in kN/m.',
      'Inspect extreme fiber bending stress $f_b$, horizontal shear stress $f_v$, and midspan serviceability deflection ($\delta$).'
    ],
    benefitTitle: 'National Design Specification (NDS) for Wood Construction',
    benefitContent: 'Wood is anisotropic with natural grain defects; calculating horizontal shear parallel to grain ($f_v = \frac{1.5 V}{A}$) is critical because timber shears along annual growth rings at much lower stress than tension/compression.',
    faqs: [{ q: 'What is the standard residential floor joist deflection limit?', a: 'Residential building codes specify a maximum live-load deflection limit of $L / 360$ to prevent drywall ceiling cracking and floor bouncing.' }]
  },

  // 23. Soil One-Dimensional Consolidation Settlement Calculator
  {
    slug: 'consolidation-settlement-clay-compression-index-calculator',
    name: 'Clay Soil Consolidation Settlement (S_c = (C_c·H / (1 + e₀))·log₁₀[(σ₀\' + Δσ\') / σ₀\']) Calculator',
    description: 'Calculate primary 1D consolidation settlement of saturated clay layers (S_c = [C_c · H / (1 + e₀)] · log₁₀[(σ₀\' + Δσ\') / σ₀\']) in mm from Compression Index C_c, initial void ratio e₀, and building load stress increase Δσ\'.',
    category: 'Science',
    icon: 'text',
    keywords: ['consolidation settlement calculator', 'terzaghi 1d consolidation formula sc equals cc h over 1 plus e0 log online', 'clay compression index void ratio settlement calculator', 'soil mechanics effective stress increase settlement calculator', 'geotechnical foundation consolidation settlement online'],
    order: 1079,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Clay Layer Thickness H (m), Initial Void Ratio e₀, Compression Index C_c, Initial σ₀\' (kPa) & Stress Increase Δσ\' (kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cs-h">Clay Layer H (m)</label>
          <input class="tool-textarea" id="cs-h" type="number" step="0.5" value="4.0" placeholder="4.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-e0">Initial Void e₀</label>
          <input class="tool-textarea" id="cs-e0" type="number" step="0.05" value="0.80" placeholder="0.80" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-cc">Index C_c</label>
          <input class="tool-textarea" id="cs-cc" type="number" step="0.05" value="0.30" placeholder="0.30 (Medium Clay)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-s0">Initial σ₀\' (kPa)</label>
          <input class="tool-textarea" id="cs-s0" type="number" step="20" value="100.0" placeholder="100.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-ds">Load Δσ\' (kPa)</label>
          <input class="tool-textarea" id="cs-ds" type="number" step="10" value="50.0" placeholder="50.0 kPa (Foundation)" />
        </div>
      </div>
      <div id="cs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cs-res-sc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Settlement S_c = 117.4 mm (4.62 inches)</span>
            <span class="stat-label">Primary 1D Consolidation Settlement (S_c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cs-res-ratio" style="color:var(--green-dark); font-weight:700;">Stress Ratio (σ₀\' + Δσ\') / σ₀\' = 1.50 | Void Ratio Reduction Δe = 0.053 (from e₀ = 0.80 -> e_final = 0.747)</span>
            <span class="stat-label">Effective Stress Increment & Long-Term Void Ratio Change</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('cs-h'), e0El = document.getElementById('cs-e0');
  const ccEl = document.getElementById('cs-cc'), s0El = document.getElementById('cs-s0'), dsEl = document.getElementById('cs-ds');
  const scResEl = document.getElementById('cs-res-sc'), rtResEl = document.getElementById('cs-res-ratio');

  function update() {
    const H = parseFloat(hEl.value), e0 = parseFloat(e0El.value);
    const Cc = parseFloat(ccEl.value), sigma0 = parseFloat(s0El.value), deltaSigma = parseFloat(dsEl.value);

    if (isNaN(H) || isNaN(e0) || isNaN(Cc) || isNaN(sigma0) || isNaN(deltaSigma) || H <= 0 || e0 <= 0 || Cc <= 0 || sigma0 <= 0 || deltaSigma <= 0) return;

    // Stress ratio: ( sigma0 + deltaSigma ) / sigma0
    const stressRatio = (sigma0 + deltaSigma) / sigma0;

    // Void ratio change: Delta_e = Cc * log10( stressRatio )
    const delta_e = Cc * Math.log10(stressRatio);

    // Primary settlement: S_c = ( H * 1000 ) * ( delta_e / (1 + e0) )  [mm]
    const S_c_mm = (H * 1000.0) * (delta_e / (1.0 + e0));
    const S_c_in = S_c_mm / 25.4;

    scResEl.textContent = 'Settlement S_c = ' + S_c_mm.toFixed(1) + ' mm (' + S_c_in.toFixed(2) + ' in)';
    rtResEl.textContent = 'Stress Ratio = ' + stressRatio.toFixed(2) + ' | Δe = ' + delta_e.toFixed(3) + ' (Final e = ' + (e0 - delta_e).toFixed(3) + ' @ H = ' + H + ' m, C_c = ' + Cc + ')';
  }

  [hEl, e0El, ccEl, s0El, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter compressible clay layer thickness H in meters.',
      'Enter initial in-situ void ratio $e_0$ (ratio of pore void volume to solid mineral volume).',
      'Enter soil virgin compression index $C_c$ from oedometer consolidation lab test ($C_c \approx 0.009(LL - 10)$).',
      'Enter initial effective overburden stress $\sigma_0\'$ at layer mid-height in kPa.',
      'Enter foundation building net load stress increase $\Delta\sigma\'$ in kPa.',
      'Inspect predicted long-term primary consolidation settlement in millimeters and inches.'
    ],
    benefitTitle: 'Terzaghi 1925 One-Dimensional Consolidation Theory',
    benefitContent: 'Unlike porous sands which settle instantly, saturated clay soils squeeze out pore water slowly over years or decades ($S_c = \frac{C_c H}{1 + e_0} \log_{10}\frac{\sigma_0\' + \Delta\sigma\'}{\sigma_0\'}$), causing infamous historic structural tilting like the Leaning Tower of Pisa.',
    faqs: [{ q: 'What is the difference between primary and secondary consolidation?', a: 'Primary consolidation is caused by the slow dissipation of excess pore water pressure; secondary consolidation (creep) is the slow plastic readjustment of clay particle skeleton bonds.' }]
  },

  // 24. Culvert Hydraulics Inlet & Outlet Control Headwater Calculator
  {
    slug: 'culvert-hydraulic-inlet-outlet-control-headwater-calculator',
    name: 'Culvert Hydraulics Headwater Depth (FHWA HDS-5 Inlet & Outlet Control) Calculator',
    description: 'Calculate highway roadway stormwater culvert headwater depth (HW / D) under FHWA HDS-5 Inlet Control (HW/D = c·(Q / (A·√D))^Y) and Outlet Control to prevent road embankment overtopping floods.',
    category: 'Science',
    icon: 'text',
    keywords: ['culvert hydraulics calculator', 'inlet control outlet control headwater depth hw over d online', 'fhwa hds 5 culvert sizing calculator', 'stormwater culvert discharge capacity headwater calculator', 'civil highway drainage culvert online'],
    order: 1080,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Design Discharge Q (m³/s), Circular Culvert Diameter D (m), Culvert Length L (m) & Slope S (m/m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cl-q">Discharge Q (m³/s)</label>
          <input class="tool-textarea" id="cl-q" type="number" step="0.5" value="2.5" placeholder="2.5 m³/s (25-Yr Peak)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-dia">Diameter D (m)</label>
          <input class="tool-textarea" id="cl-dia" type="number" step="0.2" value="1.20" placeholder="1.20 m (48 inch Pipe)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-l">Length L (m)</label>
          <input class="tool-textarea" id="cl-l" type="number" step="5" value="30.0" placeholder="30.0 m" />
        </div>
      </div>
      <div id="cl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cl-res-hw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Headwater HW = 1.62 m (HW / D = 1.35)</span>
            <span class="stat-label">Inlet Control Upstream Ponding Depth (HW)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cl-res-stat" style="color:var(--green-dark); font-weight:700;">SAFE SUBMERGED INLET: HW/D ≤ 1.50 Design Standard (0.42 m freeboard above crown)</span>
            <span class="stat-label">FHWA HDS-5 Embankment Overtopping Safety Check</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('cl-q'), diaEl = document.getElementById('cl-dia'), lEl = document.getElementById('cl-l');
  const hwResEl = document.getElementById('cl-res-hw'), stResEl = document.getElementById('cl-res-stat');

  function update() {
    const Q = parseFloat(qEl.value), D = parseFloat(diaEl.value), L = parseFloat(lEl.value);
    if (isNaN(Q) || isNaN(D) || isNaN(L) || Q <= 0 || D <= 0 || L <= 0) return;

    // Cross-sectional Area A = pi * (D/2)^2
    const Area = (Math.PI / 4.0) * Math.pow(D, 2);

    // Dimensionless discharge parameter: Q / ( A * sqrt(D) )
    const q_param = Q / (Area * Math.sqrt(D));

    // FHWA HDS-5 Form 1 Inlet Control for square edge concrete pipe:
    // For submerged inlet: HW / D = c * ( Q / (A*sqrt(D)) )^2 + Y - 0.5 * S
    // Typical empirical curve: HW/D approx = 0.50 + 0.35 * q_param^1.8
    const HW_over_D = 0.50 + 0.35 * Math.pow(q_param, 1.8);
    const HW_m = HW_over_D * D;

    let status = '', color = '#22543d';
    if (HW_over_D <= 1.2) {
      status = 'UNSUBMERGED INLET (HW/D ≤ 1.20: Low headwater, ample capacity)';
      color = '#22543d';
    } else if (HW_over_D <= 1.5) {
      status = 'SUBMERGED INLET SAFE (HW/D 1.20 - 1.50: Standard highway culvert design threshold)';
      color = '#22543d';
    } else {
      status = 'OVERTOPPING FLOOD RISK (HW/D > 1.50: Road embankment flooding danger, increase diameter!)';
      color = '#c53030';
    }

    hwResEl.textContent = 'Headwater HW = ' + HW_m.toFixed(2) + ' m (HW / D = ' + HW_over_D.toFixed(2) + ')';
    hwResEl.style.color = color;
    stResEl.textContent = status + ' [Q = ' + Q + ' m³/s, D = ' + D + ' m (' + (D * 39.37).toFixed(0) + '") @ L = ' + L + ' m]';
    stResEl.style.color = color;
  }

  [qEl, diaEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter design peak storm flood discharge Q in $\text{m}^3/\text{s}$.',
      'Enter circular culvert barrel internal diameter D in meters.',
      'Enter total barrel length L in meters.',
      'Inspect upstream ponded headwater depth HW, headwater ratio ($HW / D$), and road embankment flood overtopping safety check.'
    ],
    benefitTitle: 'Federal Highway Administration (FHWA) HDS-5 Standard',
    benefitContent: 'Culvert capacity is governed either by the barrel entrance (Inlet Control) or barrel friction and tailwater (Outlet Control); maintaining $HW / D \le 1.2\text{ to }1.5$ prevents catastrophic roadway embankment washouts during 25-year and 100-year storm events.',
    faqs: [{ q: 'What is the difference between Inlet Control and Outlet Control?', a: 'Under Inlet Control, water flows freely out the barrel and capacity is restricted only by entrance geometry; under Outlet Control, barrel friction and downstream tailwater submerge the pipe.' }]
  },

  // 25. Concrete Slump Test Workability & Consistency Class (EN 12350-2) Calculator
  {
    slug: 'concrete-slump-test-workability-flow-calculator',
    name: 'Concrete Slump Test Workability (EN 12350-2 & ASTM C143 Consistency S1 to S5) Calculator',
    description: 'Calculate fresh concrete workability slump subsidence in mm and inches, classify European standard consistency classes (S1 to S5), and evaluate placement suitability for slabs, foundations, and pumpable concrete.',
    category: 'Science',
    icon: 'text',
    keywords: ['concrete slump test calculator', 'slump test workability en 12350 2 s1 to s5 online', 'fresh concrete consistency slump mm inches calculator', 'pumpable concrete slump foundation slab calculator', 'civil engineering concrete technology online'],
    order: 1081,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Measured Slump Drop (mm or inches) using 300 mm Abrams Slump Cone',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sl-drop">Measured Slump Drop (mm)</label>
        <input class="tool-textarea" id="sl-drop" type="number" step="10" min="0" max="280" value="120" placeholder="120 mm (4.7 inches)" />
      </div>
      <div id="sl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sl-res-class" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Class S3 (100 - 150 mm) PLASTIC</span>
            <span class="stat-label">EN 12350-2 European Concrete Consistency Class</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sl-res-app" style="color:var(--green-dark); font-weight:700;">Slump = 4.72 inches | Ideal for Pumped Concrete, Heavily Reinforced Beams & Slabs</span>
            <span class="stat-label">Construction Placement Applications & Rheology</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dropEl = document.getElementById('sl-drop');
  const clsResEl = document.getElementById('sl-res-class'), appResEl = document.getElementById('sl-res-app');

  function update() {
    const slump_mm = parseFloat(dropEl.value);
    if (isNaN(slump_mm) || slump_mm < 0 || slump_mm > 300) return;

    const slump_in = slump_mm / 25.4;

    let sClass = '', appDesc = '', color = '#22543d';

    if (slump_mm <= 40) {
      sClass = 'Class S1 (10 - 40 mm) SEMI-DRY';
      appDesc = 'Road paving, mass gravity dams, roller compacted concrete (Requires heavy mechanical vibration)';
      color = '#2563eb';
    } else if (slump_mm <= 90) {
      sClass = 'Class S2 (50 - 90 mm) LOW PLASTICITY';
      appDesc = 'Standard strip footings, unreinforced foundation pads, mass concrete slabs';
      color = '#22543d';
    } else if (slump_mm <= 150) {
      sClass = 'Class S3 (100 - 150 mm) PLASTIC (STANDARD)';
      appDesc = 'Pumped concrete, heavily reinforced columns, suspended slabs, bridge decks';
      color = '#22543d';
    } else if (slump_mm <= 210) {
      sClass = 'Class S4 (160 - 210 mm) HIGH FLUIDITY';
      appDesc = 'Tremie underwater concrete, congested rebar cages, self-leveling base';
      color = '#ea580c';
    } else {
      sClass = 'Class S5 (≥ 220 mm) SUPER-FLUID';
      appDesc = 'Self-Compacting Concrete (SCC) with superplasticizers (Requires flow table test)';
      color = '#c53030';
    }

    clsResEl.textContent = sClass;
    clsResEl.style.color = color;
    appResEl.textContent = 'Slump = ' + slump_in.toFixed(2) + ' in (' + slump_mm + ' mm) | ' + appDesc;
  }

  dropEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter fresh concrete vertical subsidence drop in millimeters (mm) measured using standard 300 mm Abrams slump cone.',
      'Inspect European Standard EN 12350-2 consistency class (S1 Semi-Dry to S5 Super-Fluid) and recommended construction placement application.'
    ],
    benefitTitle: 'ASTM C143 & EN 12350-2 Fresh Concrete Quality Control',
    benefitContent: 'The slump test is the primary universal field quality control test for fresh ready-mix concrete; verifying slump before discharging mixer trucks ensures specified water content is maintained without segregated aggregate or weakened strength.',
    faqs: [{ q: 'What is a Shear Slump or Collapse Slump?', a: 'A true slump subsides evenly; a shear slump (top half shears off sideways) or collapse slump indicates a harsh uncohesive mix with excessive water.' }]
  }
];

pack37Tools.forEach(createTool);
console.log('Pack 37 complete: 25 tools created.');
