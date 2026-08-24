const { createTool } = require('./generate-curated-tools.cjs');

// Pack 46: 25 Geotechnical Engineering, Soil Mechanics, Hydrogeology & Geophysics Calculators (Tools 1401 to 1425)
const pack46Tools = [
  // 1. Darcy's Law Groundwater Flow & Hydraulic Conductivity Calculator
  {
    slug: 'darcy-law-groundwater-hydraulic-gradient-permeability-calculator',
    name: 'Darcy\'s Law Groundwater Flow & Hydraulic Conductivity (Q = -K·A·dh/dL) Calculator',
    description: 'Calculate groundwater volumetric seepage discharge flow rate Q in m³/day (Q = K · A · i), hydraulic gradient i (dh/dL), Darcy flux velocity v, and pore seepage interstitial velocity v_s through porous soil aquifers.',
    category: 'Science',
    icon: 'text',
    keywords: ['darcy law calculator', 'groundwater seepage flow rate formula q equals k a i online', 'hydraulic conductivity permeability aquifer calculator', 'hydraulic gradient seepage velocity calculator hydrogeology', 'geotechnical civil environmental engineering groundwater online'],
    order: 1285,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hydraulic Conductivity K (m/s or m/day), Aquifer Area A (m²), Head Loss Δh (m) & Distance L (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dc-k">Conductivity K (m/s)</label>
          <input class="tool-textarea" id="dc-k" type="number" step="1e-5" value="1.0e-4" placeholder="1.0 × 10⁻⁴ m/s (Clean Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dc-a">Aquifer Area A (m²)</label>
          <input class="tool-textarea" id="dc-a" type="number" step="100" value="500.0" placeholder="500.0 m² (Cross-section)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dc-dh">Head Drop Δh (m)</label>
          <input class="tool-textarea" id="dc-dh" type="number" step="0.5" value="2.5" placeholder="2.5 m Head Difference" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dc-l">Flow Length L (m)</label>
          <input class="tool-textarea" id="dc-l" type="number" step="10" value="100.0" placeholder="100.0 m Distance" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dc-n">Porosity n</label>
          <input class="tool-textarea" id="dc-n" type="number" step="0.05" min="0.1" max="0.6" value="0.30" placeholder="0.30 (30% Voids)" />
        </div>
      </div>
      <div id="dc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dc-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Flow Q = 108.0 m³ / day (1.25 L/s)</span>
            <span class="stat-label">Darcy Volumetric Aquifer Seepage Discharge (Q = K · A · i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dc-res-vel" style="color:var(--green-dark); font-weight:700;">Hydraulic Gradient i = 0.0250 (2.5%) | Seepage Pore Velocity v_s = 7.20 m/day</span>
            <span class="stat-label">Hydraulic Gradient & Actual Pore Interstitial Seepage Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('dc-k'), aEl = document.getElementById('dc-a');
  const dhEl = document.getElementById('dc-dh'), lEl = document.getElementById('dc-l'), nEl = document.getElementById('dc-n');
  const qResEl = document.getElementById('dc-res-q'), vlResEl = document.getElementById('dc-res-vel');

  function update() {
    const K = parseFloat(kEl.value), A = parseFloat(aEl.value);
    const dh = parseFloat(dhEl.value), L = parseFloat(lEl.value), n = parseFloat(nEl.value);

    if (isNaN(K) || isNaN(A) || isNaN(dh) || isNaN(L) || isNaN(n) || K <= 0 || A <= 0 || dh <= 0 || L <= 0 || n <= 0 || n >= 1) return;

    // Hydraulic gradient: i = dh / L
    const i = dh / L;

    // Darcy discharge: Q = K * A * i  [m^3 / s]
    const Q_m3_s = K * A * i;
    const Q_m3_day = Q_m3_s * 86400.0;
    const Q_L_s = Q_m3_s * 1000.0;

    // Darcy specific discharge velocity: v = K * i  [m / s]
    const v_m_s = K * i;

    // Actual pore seepage velocity: v_s = v / n  [m / s -> m / day]
    const v_s_m_s = v_m_s / n;
    const v_s_m_day = v_s_m_s * 86400.0;

    qResEl.textContent = 'Flow Q = ' + Q_m3_day.toFixed(1) + ' m³/day (' + Q_L_s.toFixed(2) + ' L/s)';
    vlResEl.textContent = 'Gradient i = ' + i.toFixed(4) + ' (' + (i * 100).toFixed(2) + '%) | Seepage v_s = ' + v_s_m_day.toFixed(2) + ' m/day (v_Darcy = ' + (v_m_s * 86400).toFixed(2) + ' m/day)';
  }

  [kEl, aEl, dhEl, lEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter aquifer hydraulic conductivity K in m/s (e.g. $10^{-4}\text{ m/s}$ for sand, $10^{-7}\text{ m/s}$ for silt).',
      'Enter perpendicular cross-sectional flow area A in $\text{m}^2$.',
      'Enter hydraulic head difference $\Delta h$ in meters and distance L in meters.',
      'Enter effective soil porosity n.',
      'Inspect total volumetric seepage discharge Q and actual interstitial pore seepage velocity $v_s$.'
    ],
    benefitTitle: 'Henry Darcy 1856 Porous Media Hydrodynamics Standard',
    benefitContent: 'Fundamental empirical law for laminar viscous groundwater flow in saturated porous aquifers and dam seepage foundation stability.',
    faqs: [{ q: 'Why is actual pore seepage velocity (v_s) faster than Darcy velocity (v)?', a: 'Darcy velocity treats the entire bulk area as open; water only flows through interconnected void pores ($v_s = v / n$).' }]
  },

  // 2. Terzaghi 1D Primary Consolidation Settlement Calculator
  {
    slug: 'terzaghi-one-dimensional-consolidation-settlement-calculator',
    name: 'Terzaghi 1D Consolidation Primary Settlement (S_c = C_c·H/(1+e₀)·log₁₀(σ\'/σ\'₀)) Calculator',
    description: 'Calculate normally consolidated clay primary consolidation settlement S_c in cm (S_c = C_c · H / (1 + e₀) · log₁₀((σ\'₀ + Δσ\') / σ\'₀)), compression index C_c, and time rate of consolidation T_v.',
    category: 'Science',
    icon: 'text',
    keywords: ['terzaghi consolidation calculator', 'primary settlement formula sc compression index cc online', 'clay consolidation settlement 1d terzaghi calculator', 'time factor tv degree of consolidation calculator', 'geotechnical engineering foundation settlement soil mechanics online'],
    order: 1286,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Clay Layer Thickness H (m), Initial Void Ratio e₀, Compression Index C_c, Initial Stress σ\'₀ (kPa) & Load Δσ\' (kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tc-h">Clay Layer H (m)</label>
          <input class="tool-textarea" id="tc-h" type="number" step="0.5" value="6.0" placeholder="6.0 m Clay Stratum" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tc-e0">Initial Void e₀</label>
          <input class="tool-textarea" id="tc-e0" type="number" step="0.05" value="0.95" placeholder="0.95" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tc-cc">Compression C_c</label>
          <input class="tool-textarea" id="tc-cc" type="number" step="0.05" value="0.35" placeholder="0.35 (Soft Clay)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tc-s0">Initial σ\'₀ (kPa)</label>
          <input class="tool-textarea" id="tc-s0" type="number" step="10" value="100.0" placeholder="100.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tc-ds">Load Δσ\' (kPa)</label>
          <input class="tool-textarea" id="tc-ds" type="number" step="10" value="80.0" placeholder="80.0 kPa (Foundation Load)" />
        </div>
      </div>
      <div id="tc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tc-res-sc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Settlement S_c = 27.5 cm (0.275 m)</span>
            <span class="stat-label">Total Primary Consolidation Settlement</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tc-res-log" style="color:var(--green-dark); font-weight:700;">Final σ\'_f = 180.0 kPa | Stress Ratio σ\'_f/σ\'₀ = 1.80 (Δe = -0.0893 void reduction)</span>
            <span class="stat-label">Effective Overburden Stress Increase & Void Ratio Reduction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('tc-h'), e0El = document.getElementById('tc-e0');
  const ccEl = document.getElementById('tc-cc'), s0El = document.getElementById('tc-s0'), dsEl = document.getElementById('tc-ds');
  const scResEl = document.getElementById('tc-res-sc'), lgResEl = document.getElementById('tc-res-log');

  function update() {
    const H_m = parseFloat(hEl.value), e0 = parseFloat(e0El.value);
    const C_c = parseFloat(ccEl.value), sigma_0 = parseFloat(s0El.value), delta_sigma = parseFloat(dsEl.value);

    if (isNaN(H_m) || isNaN(e0) || isNaN(C_c) || isNaN(sigma_0) || isNaN(delta_sigma) || H_m <= 0 || e0 <= 0 || C_c <= 0 || sigma_0 <= 0 || delta_sigma <= 0) return;

    const sigma_final = sigma_0 + delta_sigma;

    // Terzaghi 1D consolidation settlement: S_c = ( C_c * H ) / ( 1 + e0 ) * log10( (sigma_0 + delta_sigma) / sigma_0 )
    const S_c_m = ((C_c * H_m) / (1.0 + e0)) * Math.log10(sigma_final / sigma_0);
    const S_c_cm = S_c_m * 100.0;

    const delta_e = -C_c * Math.log10(sigma_final / sigma_0);

    scResEl.textContent = 'Settlement S_c = ' + S_c_cm.toFixed(1) + ' cm (' + S_c_m.toFixed(3) + ' m)';
    lgResEl.textContent = 'Final σ\'_f = ' + sigma_final.toFixed(1) + ' kPa | Ratio = ' + (sigma_final / sigma_0).toFixed(2) + '× (Δe = ' + delta_e.toFixed(4) + ' @ H=' + H_m + ' m)';
  }

  [hEl, e0El, ccEl, s0El, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter clay layer thickness H in meters.',
      'Enter in-situ initial void ratio $e_0$.',
      'Enter clay compression index $C_c$ from oedometer consolidation test.',
      'Enter initial effective vertical stress $\sigma^\prime_0$ in kPa and added structural foundation stress $\Delta\sigma^\prime$ in kPa.',
      'Inspect total ultimate primary consolidation settlement $S_c$ in cm and meters.'
    ],
    benefitTitle: 'Karl von Terzaghi 1925 Father of Modern Soil Mechanics',
    benefitContent: 'Quantifies gradual settlement resulting from the slow dissipation of excess pore water pressure in saturated clay foundations beneath building footings.',
    faqs: [{ q: 'What is the empirical Skempton formula for Compression Index Cc?', a: 'For undisturbed normally consolidated clays: $C_c \approx 0.009 \times (\text{Liquid Limit} - 10)$.' }]
  },

  // 3. Terzaghi Ultimate Bearing Capacity Shallow Strip Footing Calculator
  {
    slug: 'terzaghi-bearing-capacity-shallow-strip-footing-calculator',
    name: 'Terzaghi Ultimate Bearing Capacity Shallow Strip Footing (q_ult = c·N_c + q·N_q + ½γ·B·N_γ) Calculator',
    description: 'Calculate shallow strip footing ultimate bearing capacity q_ult in kPa (q_ult = c·N_c + q·N_q + ½·γ·B·N_γ) and allowable bearing capacity q_all with safety factor FS for geotechnical foundation design.',
    category: 'Science',
    icon: 'text',
    keywords: ['terzaghi bearing capacity calculator', 'shallow foundation bearing capacity formula q ult online', 'bearing capacity factors nc nq ngamma calculator', 'allowable soil bearing pressure safety factor calculator', 'geotechnical engineering foundation design civil engineering online'],
    order: 1287,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Footing Width B (m), Embedment Depth D_f (m), Soil Cohesion c (kPa), Friction Angle φ (°) & Unit Weight γ (kN/m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bg-b">Width B (m)</label>
          <input class="tool-textarea" id="bg-b" type="number" step="0.5" value="2.0" placeholder="2.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-df">Depth D_f (m)</label>
          <input class="tool-textarea" id="bg-df" type="number" step="0.5" value="1.5" placeholder="1.5 m (Embedment)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-c">Cohesion c (kPa)</label>
          <input class="tool-textarea" id="bg-c" type="number" step="5" value="20.0" placeholder="20.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-phi">Friction φ (°)</label>
          <input class="tool-textarea" id="bg-phi" type="number" step="2" value="28.0" placeholder="28.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-gamma">Soil Unit γ (kN/m³)</label>
          <input class="tool-textarea" id="bg-gamma" type="number" step="1" value="18.0" placeholder="18.0 kN/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-fs">Factor of Safety FS</label>
          <input class="tool-textarea" id="bg-fs" type="number" step="0.5" value="3.0" placeholder="3.0 (Standard FS)" />
        </div>
      </div>
      <div id="bg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bg-res-qult" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ultimate q_ult = 1,185 kPa (Allowable q_all = 395 kPa)</span>
            <span class="stat-label">Terzaghi Ultimate & Allowable Bearing Capacity (FS = 3.0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-factors" style="color:var(--green-dark); font-weight:700;">Bearing Factors: N_c = 31.6 | N_q = 17.8 | N_γ = 15.3 (Surcharge q = 27.0 kPa)</span>
            <span class="stat-label">Dimensionless Bearing Capacity Factors (N_c, N_q, N_γ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('bg-b'), dfEl = document.getElementById('bg-df');
  const cEl = document.getElementById('bg-c'), phiEl = document.getElementById('bg-phi');
  const gmEl = document.getElementById('bg-gamma'), fsEl = document.getElementById('bg-fs');
  const quResEl = document.getElementById('bg-res-qult'), fcResEl = document.getElementById('bg-res-factors');

  function update() {
    const B = parseFloat(bEl.value), D_f = parseFloat(dfEl.value);
    const c = parseFloat(cEl.value), phi_deg = parseFloat(phiEl.value);
    const gamma = parseFloat(gmEl.value), FS = parseFloat(fsEl.value);

    if (isNaN(B) || isNaN(D_f) || isNaN(c) || isNaN(phi_deg) || isNaN(gamma) || isNaN(FS) || B <= 0 || D_f < 0 || phi_deg < 0 || phi_deg >= 45 || gamma <= 0 || FS <= 0) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;

    // Terzaghi / Meyerhof bearing capacity factors:
    // N_q = exp( pi * tan(phi) ) * tan^2( 45° + phi/2 )
    const N_q = Math.exp(Math.PI * Math.tan(phi_rad)) * Math.pow(Math.tan((Math.PI / 4.0) + (phi_rad / 2.0)), 2);
    // N_c = (N_q - 1) / tan(phi)  (or 5.14 for phi = 0)
    const N_c = phi_deg > 0 ? (N_q - 1.0) / Math.tan(phi_rad) : 5.14;
    // N_gamma approx 2 * (N_q + 1) * tan(phi) (Vesic / Meyerhof)
    const N_gamma = 2.0 * (N_q + 1.0) * Math.tan(phi_rad);

    // Surcharge pressure q = gamma * D_f
    const q_surcharge = gamma * D_f;

    // Terzaghi ultimate bearing capacity for strip footing:
    // q_ult = c * N_c + q * N_q + 0.5 * gamma * B * N_gamma
    const term_c = c * N_c;
    const term_q = q_surcharge * N_q;
    const term_gamma = 0.5 * gamma * B * N_gamma;

    const q_ult = term_c + term_q + term_gamma;
    const q_all = q_ult / FS;

    quResEl.textContent = 'Ultimate q_ult = ' + Math.round(q_ult).toLocaleString() + ' kPa (Allowable q_all = ' + Math.round(q_all).toLocaleString() + ' kPa)';
    fcResEl.textContent = 'Factors: N_c=' + N_c.toFixed(1) + ', N_q=' + N_q.toFixed(1) + ', N_γ=' + N_gamma.toFixed(1) + ' (Cohesion: ' + Math.round(term_c) + ', Surcharge: ' + Math.round(term_q) + ', Wedge: ' + Math.round(term_gamma) + ' kPa)';
  }

  [bEl, dfEl, cEl, phiEl, gmEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter shallow footing width B in meters.',
      'Enter foundation embedment depth $D_f$ in meters.',
      'Enter soil effective cohesion c in kPa and internal friction angle $\phi$ in degrees.',
      'Enter soil moist/saturated unit weight $\gamma$ in $\text{kN/m}^3$.',
      'Enter geotechnical factor of safety FS (standard $FS = 3.0$).',
      'Inspect ultimate bearing capacity $q_{ult}$ and allowable soil bearing pressure $q_{all}$.'
    ],
    benefitTitle: 'Karl Terzaghi 1943 Shallow Foundation Bearing Capacity Theory',
    benefitContent: 'Evaluates general shear failure along triangular elastic wedges and log-spiral slip surfaces beneath shallow foundations, standardizing structural building design.',
    faqs: [{ q: 'What is the bearing capacity of pure saturated clay under undrained loading (phi = 0)?', a: 'Under undrained conditions ($\phi = 0$), $N_q = 1.0$, $N_\gamma = 0$, and $N_c = 5.14$, yielding $q_{ult} = 5.14 c_u + \gamma D_f$.' }]
  },

  // 4. Rankine Active & Passive Lateral Earth Pressure Coefficients Calculator
  {
    slug: 'rankine-active-passive-earth-pressure-coefficient-calculator',
    name: 'Rankine Lateral Earth Pressure (K_a = tan²(45° - φ/2) & K_p = tan²(45° + φ/2)) Calculator',
    description: 'Calculate Rankine active earth pressure coefficient K_a (K_a = (1 - sin φ) / (1 + sin φ)), passive earth pressure coefficient K_p (K_p = (1 + sin φ) / (1 - sin φ)), and total lateral thrust on vertical retaining walls.',
    category: 'Science',
    icon: 'text',
    keywords: ['rankine earth pressure calculator', 'active earth pressure coefficient formula ka online', 'passive earth pressure coefficient kp rankine calculator', 'retaining wall lateral earth thrust calculator', 'geotechnical engineering civil retaining walls soil mechanics online'],
    order: 1288,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Soil Internal Friction Angle φ (°), Wall Height H (m) & Soil Unit Weight γ (kN/m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-phi">Friction Angle φ (°)</label>
          <input class="tool-textarea" id="rk-phi" type="number" step="1" value="30.0" placeholder="30.0° (Sand / Gravel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-h">Wall Height H (m)</label>
          <input class="tool-textarea" id="rk-h" type="number" step="0.5" value="4.0" placeholder="4.0 m Wall" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-gamma">Soil Unit γ (kN/m³)</label>
          <input class="tool-textarea" id="rk-gamma" type="number" step="1" value="18.0" placeholder="18.0 kN/m³" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-thrust" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Active Thrust P_a = 48.0 kN / m Wall</span>
            <span class="stat-label">Total Rankine Active Lateral Earth Force (P_a = ½·K_a·γ·H²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-coeff" style="color:var(--green-dark); font-weight:700;">K_a = 0.333 (Active) | K_p = 3.000 (Passive: 9.0× Higher Resistance) | K_0 = 0.500 (At-Rest)</span>
            <span class="stat-label">Rankine Lateral Earth Pressure Coefficients (K_a & K_p)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phiEl = document.getElementById('rk-phi'), hEl = document.getElementById('rk-h'), gmEl = document.getElementById('rk-gamma');
  const thResEl = document.getElementById('rk-res-thrust'), cfResEl = document.getElementById('rk-res-coeff');

  function update() {
    const phi_deg = parseFloat(phiEl.value), H = parseFloat(hEl.value), gamma = parseFloat(gmEl.value);
    if (isNaN(phi_deg) || isNaN(H) || isNaN(gamma) || phi_deg < 0 || phi_deg >= 50 || H <= 0 || gamma <= 0) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;

    // Rankine active coefficient: K_a = (1 - sin phi) / (1 + sin phi) = tan^2(45° - phi/2)
    const sin_phi = Math.sin(phi_rad);
    const K_a = (1.0 - sin_phi) / (1.0 + sin_phi);

    // Rankine passive coefficient: K_p = 1 / K_a = (1 + sin phi) / (1 - sin phi)
    const K_p = (1.0 + sin_phi) / (1.0 - sin_phi);

    // At-rest coefficient (Jaky formula): K_0 = 1 - sin phi
    const K_0 = 1.0 - sin_phi;

    // Active thrust force: P_a = 0.5 * K_a * gamma * H^2  [kN / m]
    const P_a = 0.5 * K_a * gamma * Math.pow(H, 2);
    // Passive thrust force: P_p = 0.5 * K_p * gamma * H^2
    const P_p = 0.5 * K_p * gamma * Math.pow(H, 2);

    thResEl.textContent = 'Active Thrust P_a = ' + P_a.toFixed(1) + ' kN / m Wall';
    cfResEl.textContent = 'K_a = ' + K_a.toFixed(3) + ' | K_p = ' + K_p.toFixed(3) + ' | K_0 = ' + K_0.toFixed(3) + ' (Max Passive P_p = ' + Math.round(P_p).toLocaleString() + ' kN/m @ H=' + H + ' m)';
  }

  [phiEl, hEl, gmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter backfill soil internal friction angle $\phi$ in degrees (typically $30^\circ\text{ to }36^\circ$).',
      'Enter retaining wall vertical height H in meters.',
      'Enter backfill moist unit weight $\gamma$ in $\text{kN/m}^3$.',
      'Inspect Rankine active earth pressure coefficient $K_a$, passive coefficient $K_p$, and total lateral thrust $P_a$.'
    ],
    benefitTitle: 'William John Macquorn Rankine 1857 Earth Pressure Theory',
    benefitContent: 'Evaluates state of plastic equilibrium in frictionless soil backfills, defining minimum overturning and sliding forces for cantilever concrete retaining wall design.',
    faqs: [{ q: 'Where does the resultant active thrust act on the wall?', a: 'For a triangular pressure distribution, the resultant thrust $P_a$ acts at a height of $H/3$ above the base of the wall.' }]
  },

  // 5. Coulomb Lateral Earth Pressure Retaining Wall Calculator
  {
    slug: 'coulomb-lateral-earth-pressure-retaining-wall-calculator',
    name: 'Coulomb Lateral Earth Pressure (Active P_a & Wall Friction δ) Calculator',
    description: 'Calculate Coulomb active earth pressure coefficient K_a accounting for soil-wall friction angle δ, retaining wall backface batter angle β, and backfill slope angle α.',
    category: 'Science',
    icon: 'text',
    keywords: ['coulomb earth pressure calculator', 'wall friction delta active thrust formula online', 'coulomb sliding wedge retaining wall calculator', 'backfill slope batter angle earth pressure calculator', 'geotechnical engineering civil foundation retaining walls online'],
    order: 1289,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Soil Friction φ (°), Wall Friction δ (°), Wall Batter θ (° from vert) & Backfill Slope β (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cl-phi">Soil Friction φ (°)</label>
          <input class="tool-textarea" id="cl-phi" type="number" step="1" value="32.0" placeholder="32.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-delta">Wall Friction δ (°)</label>
          <input class="tool-textarea" id="cl-delta" type="number" step="1" value="20.0" placeholder="20.0° (2/3·φ)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-beta">Backfill Slope β (°)</label>
          <input class="tool-textarea" id="cl-beta" type="number" step="2" value="10.0" placeholder="10.0° (Sloped)" />
        </div>
      </div>
      <div id="cl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cl-res-ka" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Coulomb K_a = 0.297</span>
            <span class="stat-label">Coulomb Active Earth Pressure Coefficient</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cl-res-desc" style="color:var(--green-dark); font-weight:700;">Wall friction (δ = 20°) reduces lateral thrust by -10.8% compared to smooth Rankine wall</span>
            <span class="stat-label">Wall Interface Roughness Benefit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phiEl = document.getElementById('cl-phi'), dlEl = document.getElementById('cl-delta'), btEl = document.getElementById('cl-beta');
  const kaResEl = document.getElementById('cl-res-ka'), dsResEl = document.getElementById('cl-res-desc');

  function update() {
    const phi_deg = parseFloat(phiEl.value), delta_deg = parseFloat(dlEl.value), beta_deg = parseFloat(btEl.value);
    if (isNaN(phi_deg) || isNaN(delta_deg) || isNaN(beta_deg) || phi_deg <= 0 || delta_deg < 0 || beta_deg < 0 || beta_deg >= phi_deg) return;

    const phi = (phi_deg * Math.PI) / 180.0;
    const delta = (delta_deg * Math.PI) / 180.0;
    const beta = (beta_deg * Math.PI) / 180.0;

    // Coulomb Ka formula for vertical wall (theta = 0):
    // Ka = cos^2(phi) / [ cos(delta) * ( 1 + sqrt( sin(phi+delta)*sin(phi-beta) / (cos(delta)*cos(beta)) ) )^2 ]
    const num = Math.pow(Math.cos(phi), 2);
    const inner_term = Math.sqrt( (Math.sin(phi + delta) * Math.sin(phi - beta)) / (Math.cos(delta) * Math.cos(beta)) );
    const den = Math.cos(delta) * Math.pow(1.0 + inner_term, 2);
    const K_a = num / den;

    // Rankine comparison (delta = 0, beta = 0):
    const K_a_rankine = (1.0 - Math.sin(phi)) / (1.0 + Math.sin(phi));
    const diff_pct = ((K_a - K_a_rankine) / K_a_rankine) * 100.0;

    kaResEl.textContent = 'Coulomb K_a = ' + K_a.toFixed(3);
    dsResEl.textContent = 'Wall Friction δ = ' + delta_deg + '° (K_a=' + K_a.toFixed(3) + ' vs Rankine K_a=' + K_a_rankine.toFixed(3) + ' | ' + (diff_pct < 0 ? diff_pct.toFixed(1) + '% lower thrust' : '+' + diff_pct.toFixed(1) + '% thrust due to slope) + ')';
  }

  [phiEl, dlEl, btEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter soil internal friction angle $\phi$ in degrees.',
      'Enter soil-wall interface friction angle $\delta$ (typically $\frac{2}{3}\phi$ for rough concrete).',
      'Enter inclined backfill slope angle $\beta$ in degrees ($\beta < \phi$).',
      'Inspect Coulomb active lateral earth pressure coefficient $K_a$.'
    ],
    benefitTitle: 'Charles-Augustin de Coulomb 1776 Wedge Equilibrium',
    benefitContent: 'Evaluates limit equilibrium of a sliding triangular soil failure wedge, incorporating realistic soil-wall friction to yield more economical retaining wall dimensions.',
    faqs: [{ q: 'Why is wall friction typically assumed to be 2/3 of phi?', a: 'Testing shows shearing between poured concrete and granular soil achieves roughly $67\%$ of the internal soil shear strength.' }]
  },

  // 6. Mohr-Coulomb Soil Shear Strength Calculator
  {
    slug: 'mohr-coulomb-shear-strength-soil-cohesion-friction-calculator',
    name: 'Mohr-Coulomb Soil Shear Strength (τ_f = c\' + σ\'·tan φ\') Calculator',
    description: 'Calculate soil shear strength failure envelope τ_f in kPa (τ_f = c\' + σ\' · tan φ\'), effective normal stress σ\' (σ - u), and factor of safety against slope shear failure.',
    category: 'Science',
    icon: 'text',
    keywords: ['mohr coulomb calculator', 'soil shear strength formula tau f equals c plus sigma tan phi online', 'effective stress pore water pressure shear strength calculator', 'soil cohesion internal friction angle calculator', 'geotechnical engineering soil mechanics slope stability online'],
    order: 1290,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Effective Cohesion c\' (kPa), Friction Angle φ\' (°), Total Normal Stress σ (kPa) & Pore Pressure u (kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mc-c">Cohesion c\' (kPa)</label>
          <input class="tool-textarea" id="mc-c" type="number" step="5" value="15.0" placeholder="15.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-phi">Friction φ\' (°)</label>
          <input class="tool-textarea" id="mc-phi" type="number" step="1" value="30.0" placeholder="30.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-sigma">Total Stress σ (kPa)</label>
          <input class="tool-textarea" id="mc-sigma" type="number" step="25" value="150.0" placeholder="150.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-u">Pore Water u (kPa)</label>
          <input class="tool-textarea" id="mc-u" type="number" step="10" value="30.0" placeholder="30.0 kPa (Piezometric)" />
        </div>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-tauf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Shear Strength τ_f = 84.3 kPa</span>
            <span class="stat-label">Mohr-Coulomb Shear Strength (τ_f = c\' + σ\'·tan φ\')</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-eff" style="color:var(--green-dark); font-weight:700;">Effective Normal σ\' = 120.0 kPa (σ - u) | Frictional Component = 69.3 kPa (82.2%)</span>
            <span class="stat-label">Effective Normal Stress & Cohesive vs Frictional Components</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('mc-c'), phiEl = document.getElementById('mc-phi');
  const sgEl = document.getElementById('mc-sigma'), uEl = document.getElementById('mc-u');
  const tfResEl = document.getElementById('mc-res-tauf'), efResEl = document.getElementById('mc-res-eff');

  function update() {
    const c = parseFloat(cEl.value), phi_deg = parseFloat(phiEl.value);
    const sigma = parseFloat(sgEl.value), u = parseFloat(uEl.value);

    if (isNaN(c) || isNaN(phi_deg) || isNaN(sigma) || isNaN(u) || c < 0 || phi_deg < 0 || phi_deg >= 60 || sigma < 0) return;

    // Effective stress: sigma_prime = sigma - u
    const sigma_prime = Math.max(0.0, sigma - u);
    const phi_rad = (phi_deg * Math.PI) / 180.0;

    // Frictional strength component: sigma_prime * tan(phi)
    const tau_frictional = sigma_prime * Math.tan(phi_rad);

    // Total Mohr-Coulomb shear strength: tau_f = c + sigma_prime * tan(phi)
    const tau_f = c + tau_frictional;

    const pct_friction = tau_f > 0 ? (tau_frictional / tau_f) * 100.0 : 0;

    tfResEl.textContent = 'Shear Strength τ_f = ' + tau_f.toFixed(1) + ' kPa';
    efResEl.textContent = 'Effective σ\' = ' + sigma_prime.toFixed(1) + ' kPa (σ-u) | Friction = ' + tau_frictional.toFixed(1) + ' kPa (' + pct_friction.toFixed(1) + '%) + Cohesion ' + c + ' kPa';
  }

  [cEl, phiEl, sgEl, uEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter soil effective cohesion $c^\prime$ in kPa.',
      'Enter effective angle of internal friction $\phi^\prime$ in degrees.',
      'Enter total normal overburden/foundation stress $\sigma$ in kPa.',
      'Enter pore water pressure u in kPa.',
      'Inspect effective normal stress $\sigma^\prime = \sigma - u$ and ultimate failure shear strength $\tau_f$.'
    ],
    benefitTitle: 'Mohr-Coulomb Failure Criterion & Effective Stress Principle',
    benefitContent: 'Water pressure in soil pores bears no shear stress; positive pore water pressure directly reduces effective normal contact stress ($\sigma^\prime = \sigma - u$), triggering sudden slope landslides during heavy rainstorms.',
    faqs: [{ q: 'What is the shear strength of clean sand (c = 0)?', a: 'For clean cohesionless sand, shear strength is purely frictional: $\tau_f = \sigma^\prime \tan\phi^\prime$.' }]
  },

  // 7. Standard Penetration Test (SPT N60 & (N1)60 Correction) Calculator
  {
    slug: 'standard-penetration-test-spt-n-value-overburden-correction-calculator',
    name: 'Standard Penetration Test (SPT N₆₀ & (N₁)₆₀ Overburden Correction) Calculator',
    description: 'Calculate geotechnical Standard Penetration Test energy-corrected blow count N₆₀ (N₆₀ = N · (E_m · C_B · C_S · C_R) / 60) and overburden-normalized (N₁)₆₀ = C_N · N₆₀ for soil liquefaction and bearing capacity.',
    category: 'Science',
    icon: 'text',
    keywords: ['spt calculator', 'standard penetration test n60 formula online', 'overburden correction factor cn n160 calculator', 'soil liquefaction spt blow count calculator', 'geotechnical site investigation soil mechanics online'],
    order: 1291,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Field SPT N Blow Count, Hammer Energy Efficiency E_m (%), Effective Overburden σ\'_v (kPa) & Rod Length',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-n">Field Blow Count N</label>
          <input class="tool-textarea" id="sp-n" type="number" step="1" value="18" placeholder="18 Blows / 300 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-em">Hammer Energy E_m (%)</label>
          <input class="tool-textarea" id="sp-em" type="number" step="5" value="75.0" placeholder="75.0% (Automatic Hammer)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-sv">Overburden σ\'_v (kPa)</label>
          <input class="tool-textarea" id="sp-sv" type="number" step="20" value="80.0" placeholder="80.0 kPa (Depth ~5m)" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-n60" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N₆₀ = 22.5 | (N₁)₆₀ = 25.2</span>
            <span class="stat-label">Standard Energy-Corrected N₆₀ & Overburden-Normalized (N₁)₆₀</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-dens" style="color:var(--green-dark); font-weight:700;">MEDIUM DENSE SAND (Relative Density D_r ≈ 65% | Friction Angle φ\' ≈ 34.5°)</span>
            <span class="stat-label">Soil Density Classification & Estimated Internal Friction Angle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('sp-n'), emEl = document.getElementById('sp-em'), svEl = document.getElementById('sp-sv');
  const n60ResEl = document.getElementById('sp-res-n60'), dnResEl = document.getElementById('sp-res-dens');

  function update() {
    const N_field = parseFloat(nEl.value), E_m = parseFloat(emEl.value), sigma_v = parseFloat(svEl.value);
    if (isNaN(N_field) || isNaN(E_m) || isNaN(sigma_v) || N_field <= 0 || E_m <= 0 || sigma_v <= 0) return;

    // Standard N60 energy correction: N60 = N_field * (E_m / 60)
    const N60 = N_field * (E_m / 60.0);

    // Liao & Whitman overburden correction: C_N = sqrt( 100 / sigma_v ) <= 1.7
    const C_N = Math.min(1.70, Math.sqrt(100.0 / sigma_v));

    // (N1)60 = C_N * N60
    const N1_60 = C_N * N60;

    // Peck-Hanson-Thornburn estimated friction angle: phi = 27.1 + 0.3 * (N1)60 - 0.00054 * (N1)60^2
    const phi_est = 27.1 + (0.30 * N1_60) - (0.00054 * Math.pow(N1_60, 2));

    let density = '';
    if (N1_60 < 4) density = 'VERY LOOSE (N < 4)';
    else if (N1_60 <= 10) density = 'LOOSE SAND (4 - 10)';
    else if (N1_60 <= 30) density = 'MEDIUM DENSE SAND (10 - 30: Good foundation support)';
    else if (N1_60 <= 50) density = 'DENSE SAND (30 - 50)';
    else density = 'VERY DENSE (> 50)';

    n60ResEl.textContent = 'N₆₀ = ' + N60.toFixed(1) + ' | (N₁)₆₀ = ' + N1_60.toFixed(1);
    dnResEl.textContent = density + ' (Est φ\' ≈ ' + phi_est.toFixed(1) + '° | Overburden C_N = ' + C_N.toFixed(2) + ' @ ' + sigma_v + ' kPa)';
  }

  [nEl, emEl, svEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw measured field SPT N blow count (blows per 300 mm / 1 ft penetration).',
      'Enter hammer kinetic energy delivery efficiency percentage $E_m$ (typically $60\%$ for donut hammer, $75\%\text{ to }80\%$ for safety/automatic hammer).',
      'Enter effective vertical overburden pressure $\sigma^\prime_v$ in kPa.',
      'Inspect standardized $N_{60}$ and overburden-normalized $(N_1)_{60}$ values.'
    ],
    benefitTitle: 'ASTM D1586 Standard Penetration Test Normalization',
    benefitContent: 'Standardizes borehole blow counts to a baseline $60\%$ hammer energy and $100\text{ kPa}$ (1 atm) overburden stress, providing universal correlations for soil liquefaction triggering and pile bearing capacity.',
    faqs: [{ q: 'Why is overburden correction C_N required?', a: 'Higher confining pressure at depth increases blow counts even if soil density is identical; $C_N$ normalizes all depths to $100\text{ kPa}$ equivalent.' }]
  },

  // 8. Soil Phase Relationships & Void Ratio Calculator
  {
    slug: 'soil-porosity-void-ratio-bulk-density-phase-relations-calculator',
    name: 'Soil Phase Relationships (Void Ratio e, Porosity n, Bulk Density γ & Saturated Density) Calculator',
    description: 'Calculate 3-phase soil volume-mass weight-volume relations: Void Ratio e (e = n / (1 - n)), Porosity n (n = e / (1 + e)), Dry Density γ_d, Saturated Density γ_sat, and Submerged Buoyant Density γ\'.',
    category: 'Science',
    icon: 'text',
    keywords: ['soil phase relationships calculator', 'void ratio porosity formula e equals n over 1 minus n online', 'soil bulk density saturated density calculator', 'specific gravity gs dry unit weight calculator', 'geotechnical engineering soil mechanics weight volume online'],
    order: 1292,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Specific Gravity G_s (e.g. 2.65 for Quartz), Void Ratio e (0.4 to 1.2) & Water Content w (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-gs">Specific Gravity G_s</label>
          <input class="tool-textarea" id="sp-gs" type="number" step="0.05" value="2.65" placeholder="2.65 (Quartz Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-e">Void Ratio e</label>
          <input class="tool-textarea" id="sp-e" type="number" step="0.05" value="0.65" placeholder="0.65" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-w">Water Content w (%)</label>
          <input class="tool-textarea" id="sp-w" type="number" step="2" value="15.0" placeholder="15.0%" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-dens" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Moist Bulk γ = 18.12 kN / m³ (Dry γ_d = 15.76 kN/m³)</span>
            <span class="stat-label">Total Moist & Dry Unit Weights (γ = (G_s + S_r·e)·γ_w / (1+e))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-por" style="color:var(--green-dark); font-weight:700;">Porosity n = 39.39% | Saturated γ_sat = 19.62 kN/m³ | Buoyant γ\' = 9.81 kN/m³</span>
            <span class="stat-label">Porosity (n = e / (1+e)) & Submerged Unit Weights</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gsEl = document.getElementById('sp-gs'), eEl = document.getElementById('sp-e'), wEl = document.getElementById('sp-w');
  const dnResEl = document.getElementById('sp-res-dens'), prResEl = document.getElementById('sp-res-por');

  const gamma_w = 9.80665; // kN / m^3

  function update() {
    const G_s = parseFloat(gsEl.value), e = parseFloat(eEl.value), w_pct = parseFloat(wEl.value);
    if (isNaN(G_s) || isNaN(e) || isNaN(w_pct) || G_s <= 0 || e <= 0 || w_pct < 0) return;

    const w = w_pct / 100.0;

    // Porosity: n = e / (1 + e)
    const n = e / (1.0 + e);
    const n_pct = n * 100.0;

    // Dry unit weight: gamma_d = G_s * gamma_w / (1 + e)
    const gamma_d = (G_s * gamma_w) / (1.0 + e);

    // Total moist unit weight: gamma = gamma_d * (1 + w)
    const gamma_moist = gamma_d * (1.0 + w);

    // Saturated unit weight (Sr = 1.0): gamma_sat = (G_s + e) * gamma_w / (1 + e)
    const gamma_sat = ((G_s + e) * gamma_w) / (1.0 + e);

    // Submerged buoyant unit weight: gamma_prime = gamma_sat - gamma_w
    const gamma_prime = gamma_sat - gamma_w;

    // Degree of saturation: S_r = w * G_s / e
    const S_r_pct = (w * G_s / e) * 100.0;

    dnResEl.textContent = 'Moist Bulk γ = ' + gamma_moist.toFixed(2) + ' kN/m³ (Dry γ_d = ' + gamma_d.toFixed(2) + ' kN/m³)';
    prResEl.textContent = 'Porosity n = ' + n_pct.toFixed(2) + '% | γ_sat = ' + gamma_sat.toFixed(2) + ' kN/m³ | γ\' = ' + gamma_prime.toFixed(2) + ' kN/m³ (S_r = ' + S_r_pct.toFixed(1) + '%)';
  }

  [gsEl, eEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter soil solids specific gravity $G_s$ (typically 2.65 for sand, 2.70 for clay).',
      'Enter in-situ void ratio e.',
      'Enter gravimetric moisture content w in percent.',
      'Inspect porosity n, dry unit weight $\gamma_d$, moist bulk density $\gamma$, and buoyant submerged unit weight $\gamma^\prime$.'
    ],
    benefitTitle: 'Three-Phase Soil System Volumetric Standards',
    benefitContent: 'Connects the three distinct phases of soil (solid mineral grains, pore water, and pore air), forming the core volumetric framework of all geotechnical engineering analyses.',
    faqs: [{ q: 'What is the theoretical range of porosity n vs void ratio e?', a: 'Porosity $n$ is always strictly bounded between $0\%$ and $100\%$ ($n < 1$), whereas void ratio $e$ can exceed $1.0$ (e.g. $e > 2.0$ for soft organic clays).' }]
  },

  // 9. Soil Moisture Content & Degree of Saturation Calculator
  {
    slug: 'soil-moisture-content-degree-of-saturation-calculator',
    name: 'Soil Degree of Saturation (S_r = w·G_s / e) & Moisture Content Calculator',
    description: 'Calculate soil Degree of Saturation S_r percentage (S_r = w · G_s / e), gravimetric moisture content w (w = M_w / M_s · 100%), and volumetric water content θ for unsaturated soil mechanics.',
    category: 'Science',
    icon: 'text',
    keywords: ['soil saturation calculator', 'degree of saturation formula sr equals w gs over e online', 'gravimetric soil moisture content calculator', 'volumetric water content theta unsaturated soil calculator', 'geotechnical environmental engineering hydrology online'],
    order: 1293,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Moist Soil Mass M_total (g), Oven-Dry Soil Mass M_dry (g), Void Ratio e & Specific Gravity G_s',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sm-mtot">Moist Mass (g)</label>
          <input class="tool-textarea" id="sm-mtot" type="number" step="10" value="118.0" placeholder="118.0 g (Wet sample)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-mdry">Dry Mass (g)</label>
          <input class="tool-textarea" id="sm-mdry" type="number" step="10" value="100.0" placeholder="100.0 g (Oven-Dried)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-e">Void Ratio e</label>
          <input class="tool-textarea" id="sm-e" type="number" step="0.05" value="0.70" placeholder="0.70" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-gs">Specific Gravity G_s</label>
          <input class="tool-textarea" id="sm-gs" type="number" step="0.05" value="2.68" placeholder="2.68" />
        </div>
      </div>
      <div id="sm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sm-res-sr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Saturation S_r = 68.9% (PARTIALLY SATURATED)</span>
            <span class="stat-label">Soil Degree of Saturation (S_r = w · G_s / e)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sm-res-w" style="color:var(--green-dark); font-weight:700;">Gravimetric w = 18.0% (18.0 g Water / 100.0 g Solids) | Volumetric θ = 28.38%</span>
            <span class="stat-label">Gravimetric Water Content (w) & Volumetric Water Content (θ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mtotEl = document.getElementById('sm-mtot'), mdryEl = document.getElementById('sm-mdry');
  const eEl = document.getElementById('sm-e'), gsEl = document.getElementById('sm-gs');
  const srResEl = document.getElementById('sm-res-sr'), wResEl = document.getElementById('sm-res-w');

  function update() {
    const M_tot = parseFloat(mtotEl.value), M_dry = parseFloat(mdryEl.value);
    const e = parseFloat(eEl.value), G_s = parseFloat(gsEl.value);

    if (isNaN(M_tot) || isNaN(M_dry) || isNaN(e) || isNaN(G_s) || M_tot < M_dry || M_dry <= 0 || e <= 0 || G_s <= 0) return;

    // Water mass Mw = M_tot - M_dry
    const M_w = M_tot - M_dry;

    // Gravimetric water content: w = (M_w / M_dry) * 100%
    const w = M_w / M_dry;
    const w_pct = w * 100.0;

    // Degree of saturation: S_r = ( w * G_s ) / e
    const S_r = (w * G_s) / e;
    const S_r_pct = Math.min(100.0, S_r * 100.0);

    // Volumetric water content: theta = S_r * n = S_r * (e / (1+e))
    const n = e / (1.0 + e);
    const theta_pct = (S_r * n) * 100.0;

    let state = '';
    if (S_r_pct >= 99.0) state = 'FULLY SATURATED (S_r = 100%: All void space filled with water)';
    else if (S_r_pct >= 80.0) state = 'VERY MOIST (80% - 99%)';
    else if (S_r_pct >= 50.0) state = 'PARTIALLY SATURATED (50% - 79%)';
    else state = 'RELATIVELY DRY (S_r < 50%)';

    srResEl.textContent = 'Saturation S_r = ' + S_r_pct.toFixed(1) + '%';
    wResEl.textContent = 'Water Content w = ' + w_pct.toFixed(1) + '% | Volumetric θ = ' + theta_pct.toFixed(2) + '% (' + state + ')';
  }

  [mtotEl, mdryEl, eEl, gsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter moist soil sample mass before drying in grams.',
      'Enter oven-dried dry solid mass in grams.',
      'Enter soil void ratio e and specific gravity $G_s$.',
      'Inspect gravimetric water content w, Degree of Saturation $S_r$, and volumetric water content $\theta$.'
    ],
    benefitTitle: 'ASTM D2216 Laboratory Oven-Drying Standard',
    benefitContent: 'Quantifies pore water volume fraction ($S_r = V_w / V_v$), defining transition boundaries between dry, unsaturated, and fully liquefaction-susceptible saturated soils.',
    faqs: [{ q: 'What is the significance of 100% saturation (Sr = 100%) in foundation engineering?', a: 'At $S_r = 100\%$, soil is completely saturated; transient loads generate excess pore water pressures governed by Terzaghi consolidation theory.' }]
  },

  // 10. Theis Unsteady Aquifer Drawdown Well Function W(u) Calculator
  {
    slug: 'theis-unsteady-aquifer-drawdown-well-function-calculator',
    name: 'Theis Non-Equilibrium Aquifer Drawdown (s = Q / (4π·T) · W(u)) Well Function Calculator',
    description: 'Calculate transient pumping well drawdown s in meters (s = Q / (4π·T) · W(u)), Theis Well Function W(u) exponential integral, and aquifer dimensionless parameter u (u = r²·S / (4·T·t)) in hydrogeology.',
    category: 'Science',
    icon: 'text',
    keywords: ['theis equation calculator', 'well function w of u exponential integral formula online', 'confined aquifer transient drawdown theis calculator', 'transmissivity storativity aquifer pumping test calculator', 'hydrogeology water resources groundwater engineering online'],
    order: 1294,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pumping Rate Q (m³/day), Transmissivity T (m²/day), Storativity S (e.g. 0.001), Radius r (m) & Time t (Days)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="th-q">Pumping Q (m³/day)</label>
          <input class="tool-textarea" id="th-q" type="number" step="250" value="1500.0" placeholder="1500.0 m³/day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-t">Transmissivity T</label>
          <input class="tool-textarea" id="th-t" type="number" step="50" value="300.0" placeholder="300.0 m²/day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-s">Storativity S</label>
          <input class="tool-textarea" id="th-s" type="number" step="0.0005" value="0.0010" placeholder="0.0010 (Confined)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-r">Distance r (m)</label>
          <input class="tool-textarea" id="th-r" type="number" step="25" value="50.0" placeholder="50.0 m Observation" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-time">Time t (Days)</label>
          <input class="tool-textarea" id="th-time" type="number" step="0.5" value="2.0" placeholder="2.0 Days" />
        </div>
      </div>
      <div id="th-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="th-res-s" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Drawdown s = 3.01 m</span>
            <span class="stat-label">Transient Pumping Cone of Depression Drawdown (s = Q / (4π·T) · W(u))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="th-res-wu" style="color:var(--green-dark); font-weight:700;">Well Function W(u) = 7.570 | u = 0.00104 (u < 0.05 Cooper-Jacob Log Approx Valid ✓)</span>
            <span class="stat-label">Exponential Integral Theis Well Function & u-Parameter</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('th-q'), tEl = document.getElementById('th-t');
  const sEl = document.getElementById('th-s'), rEl = document.getElementById('th-r'), tmEl = document.getElementById('th-time');
  const sResEl = document.getElementById('th-res-s'), wuResEl = document.getElementById('th-res-wu');

  // Exponential integral W(u) approximation:
  function wellFunction(u) {
    if (u <= 0) return 0;
    if (u < 0.05) {
      // Cooper-Jacob approximation: -0.5772 - ln(u)
      return -0.5772156649 - Math.log(u);
    }
    // Power series for moderate u:
    return -0.5772156649 - Math.log(u) + u - (Math.pow(u, 2) / 4.0) + (Math.pow(u, 3) / 18.0) - (Math.pow(u, 4) / 96.0);
  }

  function update() {
    const Q = parseFloat(qEl.value), T = parseFloat(tEl.value);
    const S = parseFloat(sEl.value), r = parseFloat(rEl.value), t = parseFloat(tmEl.value);

    if (isNaN(Q) || isNaN(T) || isNaN(S) || isNaN(r) || isNaN(t) || Q <= 0 || T <= 0 || S <= 0 || r <= 0 || t <= 0) return;

    // Dimensionless parameter: u = ( r^2 * S ) / ( 4 * T * t )
    const u = (Math.pow(r, 2) * S) / (4.0 * T * t);

    const W_u = wellFunction(u);

    // Theis drawdown: s = ( Q / (4 * pi * T) ) * W(u)  [meters]
    const s_drawdown = (Q / (4.0 * Math.PI * T)) * W_u;

    sResEl.textContent = 'Drawdown s = ' + s_drawdown.toFixed(2) + ' m';
    wuResEl.textContent = 'Well Function W(u) = ' + W_u.toFixed(3) + ' | u = ' + u.toExponential(3) + ' (r=' + r + ' m @ t=' + t + ' days)';
  }

  [qEl, tEl, sEl, rEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter continuous well pumping rate Q in $\text{m}^3/\text{day}$.',
      'Enter aquifer Transmissivity T in $\text{m}^2/\text{day}$.',
      'Enter dimensionless aquifer Storativity S ($10^{-5}\text{ to }10^{-3}$ confined, $0.05\text{ to }0.30$ unconfined).',
      'Enter radial distance from pumping well to observation well r in meters.',
      'Enter elapsed continuous pumping time t in days.',
      'Inspect transient aquifer head drawdown s in meters.'
    ],
    benefitTitle: 'Charles V. Theis 1935 Non-Equilibrium Well Hydraulics',
    benefitContent: 'Exact mathematical solution for transient groundwater head decline ($s = \frac{Q}{4\pi T} W(u)$) derived from thermal conduction analogies, serving as the benchmark standard for aquifer pumping test analysis.',
    faqs: [{ q: 'What is the Cooper-Jacob simplification of the Theis equation?', a: 'For small $u < 0.05$ (long pumping times or small distances), $W(u) \approx \ln(2.25 T t / (r^2 S))$, yielding a linear semi-log plot.' }]
  },

  // 11. Thiem Confined Aquifer Steady-State Transmissivity Calculator
  {
    slug: 'thiem-steady-state-confined-aquifer-transmissivity-calculator',
    name: 'Thiem Confined Aquifer Steady-State Transmissivity (T = Q / (2π·(h₂ - h₁)) · ln(r₂ / r₁)) Calculator',
    description: 'Calculate confined aquifer hydraulic transmissivity T in m²/day (T = Q / (2π·(h₂ - h₁)) · ln(r₂ / r₁)) and hydraulic conductivity K from equilibrium two-well pumping test drawdown measurements.',
    category: 'Science',
    icon: 'text',
    keywords: ['thiem equation calculator', 'steady state confined aquifer transmissivity formula online', 'aquifer pumping test thiem method calculator', 'drawdown two observation wells permeability calculator', 'hydrogeology groundwater hydrology online'],
    order: 1295,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pumping Rate Q (m³/day), Radii r₁ & r₂ (m), Steady Heads h₁ & h₂ (m) & Aquifer Thickness b (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tm-q">Pumping Q (m³/day)</label>
          <input class="tool-textarea" id="tm-q" type="number" step="250" value="2000.0" placeholder="2000.0 m³/day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-r1">Near Well r₁ (m)</label>
          <input class="tool-textarea" id="tm-r1" type="number" step="10" value="20.0" placeholder="20.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-r2">Far Well r₂ (m)</label>
          <input class="tool-textarea" id="tm-r2" type="number" step="50" value="100.0" placeholder="100.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-dh">Head Diff h₂ - h₁ (m)</label>
          <input class="tool-textarea" id="tm-dh" type="number" step="0.2" value="1.80" placeholder="1.80 m (s1 - s2)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-b">Thickness b (m)</label>
          <input class="tool-textarea" id="tm-b" type="number" step="2" value="15.0" placeholder="15.0 m Stratum" />
        </div>
      </div>
      <div id="tm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tm-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Transmissivity T = 284.6 m² / day</span>
            <span class="stat-label">Thiem Steady-State Confined Aquifer Transmissivity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tm-res-k" style="color:var(--green-dark); font-weight:700;">Hydraulic Conductivity K = 18.97 m/day (2.20 × 10⁻⁴ m/s | Productive Gravel Aquifer)</span>
            <span class="stat-label">Hydraulic Conductivity (K = T / b) & Aquifer Productivity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('tm-q'), r1El = document.getElementById('tm-r1');
  const r2El = document.getElementById('tm-r2'), dhEl = document.getElementById('tm-dh'), bEl = document.getElementById('tm-b');
  const tResEl = document.getElementById('tm-res-t'), kResEl = document.getElementById('tm-res-k');

  function update() {
    const Q = parseFloat(qEl.value), r1 = parseFloat(r1El.value);
    const r2 = parseFloat(r2El.value), dh = parseFloat(dhEl.value), b = parseFloat(bEl.value);

    if (isNaN(Q) || isNaN(r1) || isNaN(r2) || isNaN(dh) || isNaN(b) || Q <= 0 || r1 <= 0 || r2 <= r1 || dh <= 0 || b <= 0) return;

    // Thiem equation: T = ( Q * ln(r2 / r1) ) / ( 2 * pi * dh )  [m^2 / day]
    const T = (Q * Math.log(r2 / r1)) / (2.0 * Math.PI * dh);

    // Hydraulic conductivity: K = T / b  [m / day]
    const K_m_day = T / b;
    const K_m_s = K_m_day / 86400.0;

    tResEl.textContent = 'Transmissivity T = ' + T.toFixed(1) + ' m² / day';
    kResEl.textContent = 'Conductivity K = ' + K_m_day.toFixed(2) + ' m/day (' + K_m_s.toExponential(2) + ' m/s @ b=' + b + ' m)';
  }

  [qEl, r1El, r2El, dhEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter steady pumping discharge rate Q in $\text{m}^3/\text{day}$.',
      'Enter radial distances to near ($r_1$) and far ($r_2$) piezometer observation wells in meters.',
      'Enter difference in piezometric water level elevation ($h_2 - h_1 = s_1 - s_2$) in meters.',
      'Enter confined aquifer saturated stratum thickness b in meters.',
      'Inspect aquifer transmissivity T and hydraulic conductivity K.'
    ],
    benefitTitle: 'Günther Thiem 1906 Equilibrium Well Formula',
    benefitContent: 'Provides the standard steady-state radial flow equation for confined aquifers, determining regional groundwater supply yields for municipal water wells.',
    faqs: [{ q: 'What is the relationship between Transmissivity (T) and Conductivity (K)?', a: 'Transmissivity represents the rate at which water transmits through the full saturated aquifer thickness: $T = K \times b$.' }]
  },

  // 12. Dupuit-Forchheimer Unconfined Aquifer Seepage Calculator
  {
    slug: 'dupuit-forchheimer-unconfined-aquifer-seepage-calculator',
    name: 'Dupuit-Forchheimer Unconfined Aquifer Seepage (q = K·(h₁² - h₂²) / 2L) Calculator',
    description: 'Calculate unconfined water table aquifer 1D steady-state seepage discharge flow rate q in m³/day per meter (q = K · (h₁² - h₂²) / (2·L)) and phreatic free water surface parabolic profile between two open water bodies.',
    category: 'Science',
    icon: 'text',
    keywords: ['dupuit forchheimer calculator', 'unconfined aquifer seepage discharge formula online', 'phreatic water table parabolic profile calculator', 'groundwater flow unconfined aquifer calculator', 'hydrogeology civil geotechnical engineering seepage online'],
    order: 1296,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Conductivity K (m/day), Upstream Head h₁ (m), Downstream Head h₂ (m) & Distance L (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="df-k">Conductivity K (m/day)</label>
          <input class="tool-textarea" id="df-k" type="number" step="2" value="10.0" placeholder="10.0 m/day (Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="df-h1">Upstream h₁ (m)</label>
          <input class="tool-textarea" id="df-h1" type="number" step="1" value="12.0" placeholder="12.0 m Head" />
        </div>
        <div class="control-group">
          <label class="control-label" for="df-h2">Downstream h₂ (m)</label>
          <input class="tool-textarea" id="df-h2" type="number" step="1" value="6.0" placeholder="6.0 m Head" />
        </div>
        <div class="control-group">
          <label class="control-label" for="df-l">Distance L (m)</label>
          <input class="tool-textarea" id="df-l" type="number" step="20" value="150.0" placeholder="150.0 m" />
        </div>
      </div>
      <div id="df-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="df-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Seepage q = 3.60 m³ / day per meter width</span>
            <span class="stat-label">Dupuit-Forchheimer 1D Unconfined Seepage Discharge (q = K·(h₁² - h₂²) / 2L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="df-res-mid" style="color:var(--green-dark); font-weight:700;">Midpoint Water Table Head h(L/2) = 9.49 m (Parabolic Phreatic Surface Profile)</span>
            <span class="stat-label">Midspan Phreatic Water Table Elevation (h(x) = √(h₁² - (h₁² - h₂²)·x/L))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('df-k'), h1El = document.getElementById('df-h1');
  const h2El = document.getElementById('df-h2'), lEl = document.getElementById('df-l');
  const qResEl = document.getElementById('df-res-q'), mdResEl = document.getElementById('df-res-mid');

  function update() {
    const K = parseFloat(kEl.value), h1 = parseFloat(h1El.value);
    const h2 = parseFloat(h2El.value), L = parseFloat(lEl.value);

    if (isNaN(K) || isNaN(h1) || isNaN(h2) || isNaN(L) || K <= 0 || h1 <= h2 || h2 <= 0 || L <= 0) return;

    // Dupuit formula: q = K * (h1^2 - h2^2) / (2 * L)  [m^3 / (day * m)]
    const q = (K * (Math.pow(h1, 2) - Math.pow(h2, 2))) / (2.0 * L);

    // Midpoint water table height at x = L / 2: h(x) = sqrt( h1^2 - (h1^2 - h2^2)*x/L )
    const h_mid = Math.sqrt(Math.pow(h1, 2) - 0.5 * (Math.pow(h1, 2) - Math.pow(h2, 2)));

    qResEl.textContent = 'Seepage q = ' + q.toFixed(2) + ' m³ / day / m';
    mdResEl.textContent = 'Midpoint Head h(L/2) = ' + h_mid.toFixed(2) + ' m (Drop = ' + (h1 - h2).toFixed(1) + ' m over ' + L + ' m)';
  }

  [kEl, h1El, h2El, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter unconfined aquifer hydraulic conductivity K in m/day.',
      'Enter upstream constant water table head $h_1$ above horizontal impermeable bedrock in meters.',
      'Enter downstream water table head $h_2$ in meters.',
      'Enter horizontal seepage flow length L in meters.',
      'Inspect unit seepage discharge rate q and midspan parabolic phreatic surface height.'
    ],
    benefitTitle: 'Jules Dupuit 1863 & Philipp Forchheimer Free Surface Hydraulics',
    benefitContent: 'Assumes horizontal streamlines and hydraulic gradient equal to phreatic slope ($i = dh/dx$), yielding exact discharge integrals for unconfined unpressurized groundwater seepage.',
    faqs: [{ q: 'Why is the Dupuit discharge exact despite the horizontal flow assumption?', a: 'Charny proved in 1951 that vertical streamline curvatures cancel out in the integrated 1D mass balance, making Dupuit\'s discharge calculation mathematically exact.' }]
  },

  // 13. Glover-Dumm Agricultural Drain Spacing Calculator
  {
    slug: 'glover-dumm-agricultural-drain-spacing-calculator',
    name: 'Glover-Dumm Agricultural Subsurface Drain Spacing Calculator',
    description: 'Calculate agricultural land subsurface drainage pipe tile spacing L in meters (Glover-Dumm transient water table drawdown equation) to prevent crop root waterlogging and soil salinization.',
    category: 'Science',
    icon: 'text',
    keywords: ['glover dumm calculator', 'subsurface agricultural drain spacing formula online', 'water table drawdown tile drainage calculator', 'crop waterlogging agricultural drainage spacing calculator', 'irrigation agriculture hydrology civil engineering online'],
    order: 1297,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hydraulic Conductivity K (m/day), Drainable Porosity μ (0.05 to 0.15), Initial Head h₀ (m) & Target Head h_t (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gd-k">Conductivity K (m/day)</label>
          <input class="tool-textarea" id="gd-k" type="number" step="0.5" value="1.50" placeholder="1.50 m/day (Loam)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gd-mu">Drainable Porosity μ</label>
          <input class="tool-textarea" id="gd-mu" type="number" step="0.02" value="0.08" placeholder="0.08 (Specific Yield)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gd-d">Barrier Depth d (m)</label>
          <input class="tool-textarea" id="gd-d" type="number" step="0.5" value="3.0" placeholder="3.0 m to Impermeable Base" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gd-t">Drawdown Days t</label>
          <input class="tool-textarea" id="gd-t" type="number" step="0.5" value="2.0" placeholder="2.0 Days" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gd-ratio">Head Drop (h_t/h₀)</label>
          <input class="tool-textarea" id="gd-ratio" type="number" step="0.05" min="0.1" max="0.9" value="0.50" placeholder="0.50 (50% Drop)" />
        </div>
      </div>
      <div id="gd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gd-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Drain Spacing L = 22.8 m</span>
            <span class="stat-label">Optimal Agricultural Subsurface Drain Tile Lateral Spacing</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gd-res-alpha" style="color:var(--green-dark); font-weight:700;">Reaction Factor α = 0.347 day⁻¹ | 50% Water Table Drawdown achieved in 2.0 Days</span>
            <span class="stat-label">Drainage Intensity Reaction Factor (α = π²·K·d / (μ·L²))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('gd-k'), muEl = document.getElementById('gd-mu');
  const dEl = document.getElementById('gd-d'), tEl = document.getElementById('gd-t'), rtEl = document.getElementById('gd-ratio');
  const lResEl = document.getElementById('gd-res-l'), alResEl = document.getElementById('gd-res-alpha');

  function update() {
    const K = parseFloat(kEl.value), mu = parseFloat(muEl.value);
    const d = parseFloat(dEl.value), t = parseFloat(tEl.value), ratio = parseFloat(rtEl.value);

    if (isNaN(K) || isNaN(mu) || isNaN(d) || isNaN(t) || isNaN(ratio) || K <= 0 || mu <= 0 || d <= 0 || t <= 0 || ratio <= 0 || ratio >= 1) return;

    // Glover-Dumm equation: h_t / h_0 = ( 4 / pi ) * exp( - alpha * t )
    // alpha = ( 1 / t ) * ln( (4 / pi) / (h_t / h_0) )
    const alpha = (1.0 / t) * Math.log((4.0 / Math.PI) / ratio);
    if (alpha <= 0) return;

    // alpha = ( pi^2 * K * d ) / ( mu * L^2 ) => L = sqrt( (pi^2 * K * d) / (mu * alpha) )
    const L = Math.sqrt((Math.pow(Math.PI, 2) * K * d) / (mu * alpha));

    lResEl.textContent = 'Drain Spacing L = ' + L.toFixed(1) + ' m';
    alResEl.textContent = 'Reaction Factor α = ' + alpha.toFixed(3) + ' day⁻¹ | ' + (ratio * 100).toFixed(0) + '% drop in ' + t + ' days (K=' + K + ' m/day, d=' + d + ' m)';
  }

  [kEl, muEl, dEl, tEl, rtEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter soil saturated hydraulic conductivity K in m/day.',
      'Enter drainable porosity / specific yield $\mu$ (typically 0.05 for clay, 0.12 for loam).',
      'Enter equivalent depth to impermeable barrier d in meters.',
      'Enter target drawdown time t in days (typically 1–2 days after heavy rainfall).',
      'Enter target water table head reduction ratio ($h_t / h_0$, e.g. 0.50 for $50\%$ drop).',
      'Inspect calculated drain lateral pipe spacing L in meters.'
    ],
    benefitTitle: 'Robert E. Glover & L. D. Dumm 1954 Drainage Design Standard',
    benefitContent: 'International Food and Agriculture Organization (FAO) standard for optimizing subsurface corrugated plastic tile drainage networks to prevent salinity and waterlogged crop damage.',
    faqs: [{ q: 'Why is rapid 24-48 hour water table drawdown essential for crops?', a: 'Plant root systems suffocate without oxygen when submerged in waterlogged soils for longer than 48 hours.' }]
  },

  // 14. Infinite Slope Stability Factor of Safety Calculator
  {
    slug: 'infinite-slope-stability-factor-of-safety-calculator',
    name: 'Infinite Slope Stability Factor of Safety (FS = c\'/(γH·sin β·cos β) + (tan φ\'/tan β)·(1 - γ_w·h_w/γH)) Calculator',
    description: 'Calculate geotechnical infinite slope stability Factor of Safety (FS) against planar landslide failure considering soil cohesion c\', friction angle φ\', slope inclination β, seepage pore water pressure, and groundwater table height h_w.',
    category: 'Science',
    icon: 'text',
    keywords: ['infinite slope stability calculator', 'landslide factor of safety formula online', 'planar slope failure pore water pressure calculator', 'geotechnical slope stability factor of safety calculator', 'civil geotechnical engineering slope stability landslides online'],
    order: 1298,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Slope Angle β (°), Failure Plane Depth H (m), Cohesion c\' (kPa), Friction φ\' (°) & Water Table Ratio (h_w / H)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="is-beta">Slope Angle β (°)</label>
          <input class="tool-textarea" id="is-beta" type="number" step="1" value="25.0" placeholder="25.0° Inclination" />
        </div>
        <div class="control-group">
          <label class="control-label" for="is-h">Depth H (m)</label>
          <input class="tool-textarea" id="is-h" type="number" step="0.5" value="4.0" placeholder="4.0 m Depth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="is-c">Cohesion c\' (kPa)</label>
          <input class="tool-textarea" id="is-c" type="number" step="2" value="10.0" placeholder="10.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="is-phi">Friction φ\' (°)</label>
          <input class="tool-textarea" id="is-phi" type="number" step="1" value="30.0" placeholder="30.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="is-hw">Water Ratio (h_w/H)</label>
          <input class="tool-textarea" id="is-hw" type="number" step="0.1" min="0" max="1" value="0.5" placeholder="0.5 (Half Saturated)" />
        </div>
      </div>
      <div id="is-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="is-res-fs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Factor of Safety FS = 1.39 (MARGINALLY STABLE)</span>
            <span class="stat-label">Limit Equilibrium Slope Factor of Safety (Resisting Shear / Driving Shear)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="is-res-break" style="color:var(--green-dark); font-weight:700;">Cohesive FS = +0.36 | Frictional FS = +1.03 (Full saturation h_w=H drops FS to 0.98: FAILURE)</span>
            <span class="stat-label">Cohesion vs Friction Components & Saturation Risk</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const btEl = document.getElementById('is-beta'), hEl = document.getElementById('is-h');
  const cEl = document.getElementById('is-c'), phiEl = document.getElementById('is-phi'), hwEl = document.getElementById('is-hw');
  const fsResEl = document.getElementById('is-res-fs'), bkResEl = document.getElementById('is-res-break');

  const gamma = 19.0; // kN / m^3
  const gamma_w = 9.81; // kN / m^3

  function update() {
    const beta_deg = parseFloat(btEl.value), H = parseFloat(hEl.value);
    const c = parseFloat(cEl.value), phi_deg = parseFloat(phiEl.value), hw_ratio = parseFloat(hwEl.value);

    if (isNaN(beta_deg) || isNaN(H) || isNaN(c) || isNaN(phi_deg) || isNaN(hw_ratio) || beta_deg <= 0 || beta_deg >= 90 || H <= 0 || c < 0 || phi_deg < 0 || hw_ratio < 0 || hw_ratio > 1) return;

    const beta = (beta_deg * Math.PI) / 180.0;
    const phi = (phi_deg * Math.PI) / 180.0;

    // Driving shear stress: tau_d = gamma * H * sin(beta) * cos(beta)
    const tau_driving = gamma * H * Math.sin(beta) * Math.cos(beta);

    // Cohesion component: c / tau_d
    const FS_c = c / tau_driving;

    // Frictional component: ( tan(phi) / tan(beta) ) * ( 1 - (gamma_w / gamma) * hw_ratio )
    const FS_phi = (Math.tan(phi) / Math.tan(beta)) * (1.0 - ((gamma_w / gamma) * hw_ratio));

    const FS = FS_c + FS_phi;

    // Full saturation FS (hw_ratio = 1):
    const FS_sat = FS_c + (Math.tan(phi) / Math.tan(beta)) * (1.0 - (gamma_w / gamma));

    let status = '', color = '#22543d';
    if (FS >= 1.5) { status = 'STABLE (FS ≥ 1.5: Adequate safety margin)'; color = '#22543d'; }
    else if (FS >= 1.0) { status = 'MARGINALLY STABLE (1.0 ≤ FS < 1.5: Landslide risk if saturated)'; color = '#ea580c'; }
    else { status = 'ACTIVE LANDSLIDE SLOPE FAILURE (FS < 1.0)'; color = '#c53030'; }

    fsResEl.textContent = 'Factor of Safety FS = ' + FS.toFixed(2) + ' (' + status.split(' (')[0] + ')';
    fsResEl.style.color = color;
    bkResEl.textContent = 'Cohesion = +' + FS_c.toFixed(2) + ' | Friction = +' + FS_phi.toFixed(2) + ' (If fully saturated h_w=H: FS drops to ' + FS_sat.toFixed(2) + ')';
  }

  [btEl, hEl, cEl, phiEl, hwEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hillside slope inclination angle $\beta$ in degrees.',
      'Enter depth to potential planar bedrock failure slip surface H in meters.',
      'Enter soil effective cohesion $c^\prime$ in kPa and friction angle $\phi^\prime$ in degrees.',
      'Enter normalized groundwater table height ratio $h_w / H$ (0 for dry slope, 1.0 for fully saturated).',
      'Inspect limit equilibrium Factor of Safety (FS).'
    ],
    benefitTitle: 'Planar Translational Landslide Stability Analysis',
    benefitContent: 'Evaluates hillside stability where failure plane runs parallel to ground surface; explains why rainwater saturation cuts frictional resistance roughly in half ($1 - \gamma_w/\gamma \approx 0.50$), triggering mudslides.',
    faqs: [{ q: 'What is the maximum stable angle for dry cohesionless sand?', a: 'For dry sand ($c=0, h_w=0$), the slope is stable as long as the slope angle is less than the angle of repose ($\beta \le \phi$).' }]
  },

  // 15. Bishop's Simplified Method of Slices Slope Stability Calculator
  {
    slug: 'bishop-simplified-method-slices-slope-stability-calculator',
    name: 'Bishop\'s Simplified Method of Slices Circular Slope Stability Factor of Safety Calculator',
    description: 'Calculate circular slip surface rotational slope stability Factor of Safety (FS) using Bishop\'s Simplified Method of Slices accounting for interslice normal forces and pore pressure ratio r_u.',
    category: 'Science',
    icon: 'text',
    keywords: ['bishop simplified method calculator', 'method of slices slope stability formula online', 'circular slip surface factor of safety calculator', 'pore pressure ratio ru bishop slope calculator', 'geotechnical engineering embankment stability civil engineering online'],
    order: 1299,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Driving Overturning Weight Moment ∑ W·sin α (kN), Friction φ\' (°) & Cohesion c\' (kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bs-c">Cohesion c\' (kPa)</label>
          <input class="tool-textarea" id="bs-c" type="number" step="5" value="12.0" placeholder="12.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-phi">Friction φ\' (°)</label>
          <input class="tool-textarea" id="bs-phi" type="number" step="1" value="26.0" placeholder="26.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-w">Total Weight W (kN)</label>
          <input class="tool-textarea" id="bs-w" type="number" step="500" value="2500.0" placeholder="2,500 kN" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-alpha">Mean Slice α (°)</label>
          <input class="tool-textarea" id="bs-alpha" type="number" step="2" value="22.0" placeholder="22.0° Base Angle" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-ru">Pore Ratio r_u</label>
          <input class="tool-textarea" id="bs-ru" type="number" step="0.05" min="0" max="0.6" value="0.20" placeholder="0.20 (u / γh)" />
        </div>
      </div>
      <div id="bs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bs-res-fs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bishop Factor of Safety FS = 1.48 (STABLE)</span>
            <span class="stat-label">Bishop Simplified Circular Slip Surface Factor of Safety</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bs-res-drive" style="color:var(--green-dark); font-weight:700;">Driving Shear = 936.5 kN (W·sin α) | Resisting Shear Capacity = 1,385.2 kN</span>
            <span class="stat-label">Total Driving vs Resisting Shear Capacity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('bs-c'), phiEl = document.getElementById('bs-phi');
  const wEl = document.getElementById('bs-w'), alEl = document.getElementById('bs-alpha'), ruEl = document.getElementById('bs-ru');
  const fsResEl = document.getElementById('bs-res-fs'), drResEl = document.getElementById('bs-res-drive');

  function update() {
    const c = parseFloat(cEl.value), phi_deg = parseFloat(phiEl.value);
    const W = parseFloat(wEl.value), alpha_deg = parseFloat(alEl.value), r_u = parseFloat(ruEl.value);

    if (isNaN(c) || isNaN(phi_deg) || isNaN(W) || isNaN(alpha_deg) || isNaN(r_u) || c < 0 || phi_deg < 0 || W <= 0 || alpha_deg <= 0 || r_u < 0) return;

    const phi = (phi_deg * Math.PI) / 180.0;
    const alpha = (alpha_deg * Math.PI) / 180.0;

    // Driving force: T_driving = W * sin(alpha)
    const driving = W * Math.sin(alpha);

    // Iterative solution for Bishop's FS:
    // FS = [ sum( c'*b + (W - u*b)*tan(phi) ) * 1/m_alpha ] / sum( W*sin(alpha) )
    // where m_alpha = cos(alpha) * ( 1 + tan(alpha)*tan(phi)/FS )
    let FS = 1.30;
    for (let iter = 0; iter < 10; iter++) {
      const m_alpha = Math.cos(alpha) * (1.0 + (Math.tan(alpha) * Math.tan(phi)) / FS);
      // Effective normal force: N_prime = ( W * (1 - r_u) ) / m_alpha
      const N_prime = (W * (1.0 - r_u)) / m_alpha;
      const resisting = (c * 15.0) + (N_prime * Math.tan(phi)); // 15m arc length
      FS = resisting / driving;
    }

    const resisting_total = FS * driving;

    let status = '', color = '#22543d';
    if (FS >= 1.5) { status = 'ADEQUATELY SAFE (FS ≥ 1.5)'; color = '#22543d'; }
    else if (FS >= 1.3) { status = 'ACCEPTABLE STABILITY (1.3 ≤ FS < 1.5)'; color = '#22543d'; }
    else if (FS >= 1.0) { status = 'MARGINAL (1.0 ≤ FS < 1.3)'; color = '#ea580c'; }
    else { status = 'UNSTABLE (FS < 1.0: Slope Failure)'; color = '#c53030'; }

    fsResEl.textContent = 'Bishop FS = ' + FS.toFixed(2) + ' (' + status.split(' (')[0] + ')';
    fsResEl.style.color = color;
    drResEl.textContent = 'Driving = ' + driving.toFixed(1) + ' kN | Resisting = ' + resisting_total.toFixed(1) + ' kN (r_u = ' + r_u + ')';
  }

  [cEl, phiEl, wEl, alEl, ruEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter soil effective cohesion $c^\prime$ in kPa and internal friction angle $\phi^\prime$ in degrees.',
      'Enter total sliding soil mass weight W in kN.',
      'Enter mean inclination base angle of slices $\alpha$ in degrees.',
      'Enter pore water pressure ratio $r_u = u / (\gamma h)$ (0 for dry embankment, 0.2–0.4 for steady seepage).',
      'Inspect Bishop\'s iteratively solved Factor of Safety (FS).'
    ],
    benefitTitle: 'Alan W. Bishop 1955 Rigorous Slices Formulation',
    benefitContent: 'Satisfies vertical force equilibrium on each individual slice ($m_\alpha = \cos\alpha (1 + \frac{\tan\alpha\tan\phi^\prime}{FS})$), providing substantially higher accuracy than the simplified Ordinary (Fellenius) method.',
    faqs: [{ q: 'Why is Bishop\'s method called simplified if it requires iteration?', a: 'It assumes interslice shear forces are zero ($\Delta X = 0$) while fully satisfying overall moment equilibrium and vertical slice force balance.' }]
  },

  // 16. Seismic Refraction Two-Layer Crustal Depth Calculator
  {
    slug: 'seismic-refraction-two-layer-crustal-depth-calculator',
    name: 'Seismic Refraction Two-Layer Subsurface Bedrock Depth (z₁ = ½·t_i·v₁·v₂ / √(v₂² - v₁²)) Calculator',
    description: 'Calculate seismic refraction subsurface overburden thickness and bedrock depth z₁ in meters (z₁ = ½ · t_i · v₁·v₂ / √(v₂² - v₁²)), critical refraction angle θ_c, and crossover cross distance x_c.',
    category: 'Science',
    icon: 'text',
    keywords: ['seismic refraction calculator', 'two layer bedrock depth formula ti v1 v2 online', 'seismic crossover distance critical angle calculator', 'geophysical survey p wave velocity calculator', 'geophysics civil engineering geotechnical investigation online'],
    order: 1300,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Top Layer P-Wave Velocity v₁ (m/s), Bedrock Velocity v₂ (m/s) & Intercept Time t_i (ms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sr-v1">Overburden v₁ (m/s)</label>
          <input class="tool-textarea" id="sr-v1" type="number" step="50" value="600.0" placeholder="600.0 m/s (Soil)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-v2">Bedrock v₂ (m/s)</label>
          <input class="tool-textarea" id="sr-v2" type="number" step="100" value="2500.0" placeholder="2500.0 m/s (Granite)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-ti">Intercept t_i (ms)</label>
          <input class="tool-textarea" id="sr-ti" type="number" step="5" value="35.0" placeholder="35.0 ms (Time Intercept)" />
        </div>
      </div>
      <div id="sr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sr-res-z1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bedrock Depth z₁ = 10.88 m</span>
            <span class="stat-label">Top Layer Overburden Thickness (z₁ = ½·t_i·v₁·v₂ / √(v₂² - v₁²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sr-res-xc" style="color:var(--green-dark); font-weight:700;">Critical Angle θ_c = 13.89° | Crossover Distance x_c = 28.5 m (Head wave overtakes direct wave)</span>
            <span class="stat-label">Snell's Law Critical Angle & Crossover Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v1El = document.getElementById('sr-v1'), v2El = document.getElementById('sr-v2'), tiEl = document.getElementById('sr-ti');
  const z1ResEl = document.getElementById('sr-res-z1'), xcResEl = document.getElementById('sr-res-xc');

  function update() {
    const v1 = parseFloat(v1El.value), v2 = parseFloat(v2El.value), ti_ms = parseFloat(tiEl.value);
    if (isNaN(v1) || isNaN(v2) || isNaN(ti_ms) || v1 <= 0 || v2 <= v1 || ti_ms <= 0) return;

    const ti_s = ti_ms * 1e-3;

    // Snell's Law critical angle: sin(theta_c) = v1 / v2
    const sin_theta_c = v1 / v2;
    const theta_c_rad = Math.asin(sin_theta_c);
    const theta_c_deg = (theta_c_rad * 180.0) / Math.PI;

    // Bedrock depth: z1 = (ti * v1 * v2) / ( 2 * sqrt(v2^2 - v1^2) )  [meters]
    const den = Math.sqrt(Math.pow(v2, 2) - Math.pow(v1, 2));
    const z1 = (ti_s * v1 * v2) / (2.0 * den);

    // Crossover distance x_c = 2 * z1 * sqrt( (v2 + v1) / (v2 - v1) )
    const x_c = 2.0 * z1 * Math.sqrt((v2 + v1) / (v2 - v1));

    z1ResEl.textContent = 'Bedrock Depth z₁ = ' + z1.toFixed(2) + ' m';
    xcResEl.textContent = 'Critical Angle θ_c = ' + theta_c_deg.toFixed(2) + '° | Crossover x_c = ' + x_c.toFixed(1) + ' m (v₁=' + v1 + ' m/s, v₂=' + v2 + ' m/s)';
  }

  [v1El, v2El, tiEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter seismic P-wave velocity of soil overburden layer $v_1$ in m/s.',
      'Enter P-wave velocity of underlying bedrock layer $v_2$ in m/s ($v_2 > v_1$).',
      'Enter seismic refraction time-distance graph intercept time $t_i$ in milliseconds.',
      'Inspect calculated bedrock depth $z_1$, critical refraction angle $\theta_c$, and crossover distance $x_c$.'
    ],
    benefitTitle: 'Willebrord Snellius & August Schmidt Seismic Refraction',
    benefitContent: 'Measures critically refracted head waves traveling along high-velocity bedrock interfaces ($v_2$), mapping shallow foundation depth to solid rock non-destructively from the surface.',
    faqs: [{ q: 'What is the crossover distance (x_c)?', a: '$x_c$ is the geophone offset distance where faster critically refracted head waves overtake slower direct surface waves.' }]
  },

  // 17. Seismic Reflection Normal Moveout (NMO) Calculator
  {
    slug: 'seismic-reflection-two-way-travel-time-twt-depth-calculator',
    name: 'Seismic Reflection Normal Moveout (NMO Δt = √(t₀² + x²/v_rms²) - t₀) Calculator',
    description: 'Calculate petroleum seismic reflection hyperbolic travel time t(x) (t² = t₀² + x² / v_rms²), Normal Moveout correction Δt_NMO, and subsurface reflector depth z₀ (z₀ = ½·v_rms·t₀).',
    category: 'Science',
    icon: 'text',
    keywords: ['seismic reflection calculator', 'normal moveout nmo formula delta t online', 'two way travel time twt reflector depth calculator', 'rms velocity hyperbolic moveout geophysics calculator', 'geophysics petroleum exploration seismic processing online'],
    order: 1301,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Zero-Offset Travel Time t₀ (s), Geophone Offset x (m) & RMS Velocity v_rms (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rf-t0">Zero-Offset t₀ (s)</label>
          <input class="tool-textarea" id="rf-t0" type="number" step="0.1" value="1.20" placeholder="1.20 s (TWT)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rf-x">Offset x (m)</label>
          <input class="tool-textarea" id="rf-x" type="number" step="100" value="1500.0" placeholder="1500.0 m (Shot-Receiver)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rf-v">RMS Velocity (m/s)</label>
          <input class="tool-textarea" id="rf-v" type="number" step="100" value="2500.0" placeholder="2500.0 m/s" />
        </div>
      </div>
      <div id="rf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rf-res-nmo" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">NMO Moveout Δt = 141.6 ms (t(x) = 1.342 s)</span>
            <span class="stat-label">Normal Moveout Hyperbolic Time Correction (Δt = t(x) - t₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rf-res-depth" style="color:var(--green-dark); font-weight:700;">Reflector Depth z₀ = 1,500 m (1.50 km) | Common Midpoint (CMP) Stack Correction</span>
            <span class="stat-label">True Geological Reflector Subsurface Depth (z₀ = ½·v_rms·t₀)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t0El = document.getElementById('rf-t0'), xEl = document.getElementById('rf-x'), vEl = document.getElementById('rf-v');
  const nmResEl = document.getElementById('rf-res-nmo'), dpResEl = document.getElementById('rf-res-depth');

  function update() {
    const t0 = parseFloat(t0El.value), x = parseFloat(xEl.value), v_rms = parseFloat(vEl.value);
    if (isNaN(t0) || isNaN(x) || isNaN(v_rms) || t0 <= 0 || x < 0 || v_rms <= 0) return;

    // Hyperbolic travel time: t(x) = sqrt( t0^2 + (x / v_rms)^2 )
    const t_x = Math.sqrt(Math.pow(t0, 2) + Math.pow(x / v_rms, 2));

    // NMO correction: Delta_t_NMO = t(x) - t0  [seconds -> ms]
    const delta_t_s = t_x - t0;
    const delta_t_ms = delta_t_s * 1000.0;

    // Reflector depth: z0 = 0.5 * v_rms * t0  [meters]
    const z0_m = 0.5 * v_rms * t0;

    nmResEl.textContent = 'NMO Moveout Δt = ' + delta_t_ms.toFixed(1) + ' ms (t(x) = ' + t_x.toFixed(3) + ' s)';
    dpResEl.textContent = 'Reflector Depth z₀ = ' + Math.round(z0_m).toLocaleString() + ' m (' + (z0_m / 1000).toFixed(2) + ' km @ v_rms=' + v_rms + ' m/s, x=' + x + ' m)';
  }

  [t0El, xEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter two-way zero-offset travel time $t_0$ in seconds.',
      'Enter source-to-geophone horizontal offset distance x in meters.',
      'Enter root-mean-square average crustal velocity $v_{\text{rms}}$ in m/s.',
      'Inspect Normal Moveout time shift $\Delta t_{\text{NMO}}$ and true reflector depth $z_0$.'
    ],
    benefitTitle: 'Common Midpoint (CMP) Seismic Stacking Principle',
    benefitContent: 'Subtracting NMO time delays flattens reflection hyperbolas across multi-channel receiver arrays, enabling coherent signal stacking to boost signal-to-noise ratios in oil and gas exploration.',
    faqs: [{ q: 'What is the Dix equation in seismic processing?', a: 'The C. Hewitt Dix 1955 equation extracts interval layer velocities ($v_{\text{int}}$) from stacking RMS velocities ($v_{\text{rms}}$).' }]
  },

  // 18. Bouguer Gravity Anomaly & Free-Air Terrain Correction Calculator
  {
    slug: 'bouguer-gravity-anomaly-elevation-slab-correction-calculator',
    name: 'Bouguer Gravity Anomaly & Free-Air Terrain Correction Calculator',
    description: 'Calculate Complete Bouguer Gravity Anomaly Δg_B in mGal (Δg_B = g_obs - g_0 + 0.3086·h - 0.04193·ρ·h) from observed gravity, theoretical latitude gravity g_0, Free-Air elevation correction, and crustal slab density.',
    category: 'Science',
    icon: 'text',
    keywords: ['bouguer anomaly calculator', 'gravity anomaly formula free air elevation correction online', 'bouguer slab reduction density 2.67 g cm3 calculator', 'isostasy crustal gravity survey geophysics calculator mgal', 'geophysics geodesy earth exploration gravity online'],
    order: 1302,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Observed g_obs (mGal), Latitude g_0 (mGal), Station Elevation h (m) & Crust Density ρ (g/cm³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bg-gobs">Observed g (mGal)</label>
          <input class="tool-textarea" id="bg-gobs" type="number" step="10" value="980250.0" placeholder="980,250.0 mGal" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-g0">Theoretical g₀ (mGal)</label>
          <input class="tool-textarea" id="bg-g0" type="number" step="10" value="980300.0" placeholder="980,300.0 mGal" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-elev">Elevation h (m)</label>
          <input class="tool-textarea" id="bg-elev" type="number" step="50" value="450.0" placeholder="450.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-rho">Crust ρ (g/cm³)</label>
          <input class="tool-textarea" id="bg-rho" type="number" step="0.05" value="2.67" placeholder="2.67 g/cm³ (Standard)" />
        </div>
      </div>
      <div id="bg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bg-res-boug" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bouguer Anomaly Δg_B = +38.5 mGal</span>
            <span class="stat-label">Complete Bouguer Gravity Anomaly (g_obs - g₀ + FAC - BC)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-fac" style="color:var(--green-dark); font-weight:700;">Free-Air Anomaly Δg_FA = +88.9 mGal (+0.3086·h) | Bouguer Slab Reduction = -50.4 mGal</span>
            <span class="stat-label">Free-Air Anomaly & Bouguer Slab Mass Attraction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gobsEl = document.getElementById('bg-gobs'), g0El = document.getElementById('bg-g0');
  const hEl = document.getElementById('bg-elev'), rhoEl = document.getElementById('bg-rho');
  const bgResEl = document.getElementById('bg-res-boug'), faResEl = document.getElementById('bg-res-fac');

  function update() {
    const g_obs = parseFloat(gobsEl.value), g_0 = parseFloat(g0El.value);
    const h = parseFloat(hEl.value), rho = parseFloat(rhoEl.value);

    if (isNaN(g_obs) || isNaN(g_0) || isNaN(h) || isNaN(rho) || rho <= 0) return;

    // Free-Air Correction: FAC = + 0.3086 * h  [mGal]
    const FAC = 0.3086 * h;
    const FreeAir_anomaly = (g_obs - g_0) + FAC;

    // Bouguer Plate Slab Correction: BC = - 2 * pi * G * rho * h = - 0.04193 * rho * h  [mGal]
    const BC = 0.04193 * rho * h;

    // Bouguer Anomaly: Delta_g_B = (g_obs - g_0) + FAC - BC
    const Delta_g_B = FreeAir_anomaly - BC;

    bgResEl.textContent = 'Bouguer Anomaly Δg_B = ' + (Delta_g_B >= 0 ? '+' : '') + Delta_g_B.toFixed(1) + ' mGal';
    faResEl.textContent = 'Free-Air Δg_FA = ' + (FreeAir_anomaly >= 0 ? '+' : '') + FreeAir_anomaly.toFixed(1) + ' mGal | Slab BC = -' + BC.toFixed(1) + ' mGal (h=' + h + ' m @ ρ=' + rho + ' g/cm³)';
  }

  [gobsEl, g0El, hEl, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw observed station gravity $g_{\text{obs}}$ in milliGals (mGal).',
      'Enter theoretical reference ellipsoid latitude gravity $g_0$ in mGal.',
      'Enter gravimeter station elevation h above sea level in meters.',
      'Enter average crustal rock slab density $\rho$ in $\text{g/cm}^3$ (standard reference is $2.67\text{ g/cm}^3$).',
      'Inspect Free-Air anomaly and Complete Bouguer anomaly.'
    ],
    benefitTitle: 'Pierre Bouguer 1749 Gravimetric Reduction Standard',
    benefitContent: 'Removes the gravitational effects of station elevation and intervening rock mass, revealing subsurface density anomalies caused by mineral deposits, salt domes, and deep isostatic crustal roots.',
    faqs: [{ q: 'Why are Bouguer anomalies negative over high mountain ranges?', a: 'Airy isostasy creates low-density crustal mountain roots extending deep into the denser mantle, creating a negative mass deficit.' }]
  },

  // 19. Apparent Resistivity Wenner & Schlumberger Array Calculator
  {
    slug: 'apparent-resistivity-wenner-schlumberger-array-calculator',
    name: 'Geoelectrical Apparent Resistivity (Wenner ρ_a = 2π·a·ΔV/I & Schlumberger) Calculator',
    description: 'Calculate electrical resistivity tomography (ERT) apparent resistivity ρ_a in Ω·m from injected current I (mA), potential voltage ΔV (mV), and 4-electrode geometric array spacing (Wenner & Schlumberger configurations).',
    category: 'Science',
    icon: 'text',
    keywords: ['apparent resistivity calculator', 'wenner array formula rho equals 2 pi a r online', 'schlumberger electrode array resistivity calculator', 'electrical resistivity tomography ert geophysics calculator', 'groundwater environmental geophysics resistivity sounding online'],
    order: 1303,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electrode Array (Wenner / Schlumberger), Spacing a (m), Voltage ΔV (mV) & Injected Current I (mA)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="er-array">Array Configuration</label>
          <select class="tool-textarea" id="er-array">
            <option value="wenner" selected>Wenner (Equal Spacing a)</option>
            <option value="schlumberger">Schlumberger (Current AB/2, Potential MN/2)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="er-a">Spacing a (m)</label>
          <input class="tool-textarea" id="er-a" type="number" step="2" value="10.0" placeholder="10.0 m Spacing" />
        </div>
        <div class="control-group">
          <label class="control-label" for="er-dv">Voltage ΔV (mV)</label>
          <input class="tool-textarea" id="er-dv" type="number" step="5" value="45.0" placeholder="45.0 mV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="er-i">Current I (mA)</label>
          <input class="tool-textarea" id="er-i" type="number" step="10" value="100.0" placeholder="100.0 mA" />
        </div>
      </div>
      <div id="er-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="er-res-rho" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Apparent ρ_a = 28.27 Ω·m</span>
            <span class="stat-label">Geoelectrical Apparent Resistivity (ρ_a = K_geom · R)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="er-res-geo" style="color:var(--green-dark); font-weight:700;">WET CLAY / FRESHWATER AQUIFER (ρ < 50 Ω·m | Resistance R = 0.450 Ω, Geometric K = 62.83 m)</span>
            <span class="stat-label">Subsurface Lithology Classification & Geometric Factor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const arEl = document.getElementById('er-array'), aEl = document.getElementById('er-a');
  const dvEl = document.getElementById('er-dv'), iEl = document.getElementById('er-i');
  const rhResEl = document.getElementById('er-res-rho'), geResEl = document.getElementById('er-res-geo');

  function update() {
    const array = arEl.value, a_m = parseFloat(aEl.value);
    const dV_mV = parseFloat(dvEl.value), I_mA = parseFloat(iEl.value);

    if (isNaN(a_m) || isNaN(dV_mV) || isNaN(I_mA) || a_m <= 0 || dV_mV <= 0 || I_mA <= 0) return;

    // Resistance: R = dV / I  [ohms]
    const R_ohm = (dV_mV * 1e-3) / (I_mA * 1e-3);

    // Geometric factor K:
    let K_geom = 0;
    if (array === 'wenner') {
      // Wenner geometric factor: K = 2 * pi * a
      K_geom = 2.0 * Math.PI * a_m;
    } else {
      // Schlumberger with s = 2a (AB/2 = 2a, MN/2 = a/2): K approx pi * ( (AB/2)^2 - (MN/2)^2 ) / MN
      K_geom = Math.PI * a_m * 3.75;
    }

    // Apparent resistivity: rho_a = K_geom * R  [ohm * m]
    const rho_a = K_geom * R_ohm;

    let litho = '';
    if (rho_a < 10) litho = 'SALINE GROUNDWATER / GRAPHITE (< 10 Ω·m)';
    else if (rho_a <= 50) litho = 'CLAY / SILT / SHALE (10 - 50 Ω·m)';
    else if (rho_a <= 250) litho = 'FRESHWATER SAND / GRAVEL AQUIFER (50 - 250 Ω·m)';
    else if (rho_a <= 1000) litho = 'SANDSTONE / LIMESTONE BEDROCK (250 - 1,000 Ω·m)';
    else litho = 'DRY IGNEOUS GRANITE / BASALT (> 1,000 Ω·m)';

    rhResEl.textContent = 'Apparent ρ_a = ' + rho_a.toFixed(2) + ' Ω·m';
    geResEl.textContent = litho + ' [R = ' + R_ohm.toFixed(3) + ' Ω, Geom K = ' + K_geom.toFixed(2) + ' m @ a=' + a_m + ' m]';
  }

  [arEl, aEl, dvEl, iEl].forEach(el => el.addEventListener('input', update));
  arEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select 4-electrode array layout (Wenner or Schlumberger).',
      'Enter electrode spacing a in meters.',
      'Enter measured potential difference $\Delta V$ in mV.',
      'Enter injected electrical current I in mA.',
      'Inspect apparent resistivity $\rho_a$ in $\Omega\cdot\text{m}$ and identify subsurface lithology.'
    ],
    benefitTitle: 'Frank Wenner 1915 & Conrad Schlumberger 1920 Geoelectrical Standard',
    benefitContent: 'Maps subsurface hydrogeological groundwater aquifers, contaminated leachate plumes, and bedrock depth without invasive drilling.',
    faqs: [{ q: 'What is the depth of investigation for a Wenner array?', a: 'The effective depth of investigation for a Wenner array is approximately $0.519 \times a$ (roughly half the electrode spacing).' }]
  },

  // 20. Kozeny-Carman Hydraulic Conductivity Granular Soil Calculator
  {
    slug: 'kozeny-carman-hydraulic-conductivity-granular-soil-calculator',
    name: 'Kozeny-Carman Hydraulic Conductivity (K = (ρg/μ)·(1/C_K·S_0²)·(e³/(1+e))) Calculator',
    description: 'Calculate granular sand and silt saturated hydraulic conductivity K in m/s (Kozeny-Carman semi-empirical equation) from specific surface area S_0, void ratio e, fluid viscosity, and Carman constant C_K.',
    category: 'Science',
    icon: 'text',
    keywords: ['kozeny carman calculator', 'hydraulic conductivity formula specific surface area void ratio online', 'porous media permeability kozeny carman calculator', 'granular soil hydraulic conductivity calculator', 'geotechnical hydrogeology porous flow soil physics online'],
    order: 1304,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Specific Surface Area S_0 (cm²/cm³ or m²/m³), Void Ratio e & Water Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kc-s0">Specific S_0 (m²/m³)</label>
          <input class="tool-textarea" id="kc-s0" type="number" step="10000" value="60000" placeholder="60,000 m²/m³ (Medium Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kc-e">Void Ratio e</label>
          <input class="tool-textarea" id="kc-e" type="number" step="0.05" value="0.65" placeholder="0.65" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kc-temp">Water Temp T (°C)</label>
          <input class="tool-textarea" id="kc-temp" type="number" step="5" value="20" placeholder="20 °C" />
        </div>
      </div>
      <div id="kc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kc-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">K = 4.47 × 10⁻⁴ m / s (38.6 m/day)</span>
            <span class="stat-label">Kozeny-Carman Saturated Hydraulic Conductivity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kc-res-perm" style="color:var(--green-dark); font-weight:700;">Intrinsic Permeability k = 4.56 × 10⁻¹¹ m² (46.2 Darcies | Clean Medium Sand)</span>
            <span class="stat-label">Intrinsic Permeability k (m² & Darcies)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const s0El = document.getElementById('kc-s0'), eEl = document.getElementById('kc-e'), tEl = document.getElementById('kc-temp');
  const kResEl = document.getElementById('kc-res-k'), pmResEl = document.getElementById('kc-res-perm');

  const rho_w = 1000.0; // kg/m^3
  const g = 9.80665; // m/s^2

  function update() {
    const S_0 = parseFloat(s0El.value), e = parseFloat(eEl.value), T_C = parseFloat(tEl.value);
    if (isNaN(S_0) || isNaN(e) || isNaN(T_C) || S_0 <= 0 || e <= 0 || T_C < 0) return;

    // Water viscosity vs temp approx: mu = 1.787 / (1 + 0.0337*T + 0.00022*T^2) * 1e-3 Pa*s
    const mu_Pa_s = (1.787 / (1.0 + 0.0337 * T_C + 0.000221 * Math.pow(T_C, 2))) * 1e-3;

    // Carman shape factor constant C_K approx 5.0
    const C_K = 5.0;

    // Intrinsic permeability: k = ( 1 / (C_K * S_0^2) ) * ( e^3 / (1 + e) )  [m^2]
    const void_factor = Math.pow(e, 3) / (1.0 + e);
    const k_perm_m2 = (1.0 / (C_K * Math.pow(S_0, 2))) * void_factor;
    const k_darcies = k_perm_m2 / 9.869233e-13;

    // Hydraulic conductivity: K = ( k * rho * g ) / mu  [m / s]
    const K_m_s = (k_perm_m2 * rho_w * g) / mu_Pa_s;
    const K_m_day = K_m_s * 86400.0;

    kResEl.textContent = 'K = ' + K_m_s.toExponential(2) + ' m/s (' + K_m_day.toFixed(1) + ' m/day)';
    pmResEl.textContent = 'Permeability k = ' + k_perm_m2.toExponential(2) + ' m² (' + k_darcies.toFixed(1) + ' Darcies @ e=' + e + ', ' + T_C + '°C)';
  }

  [s0El, eEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter particle specific surface area per unit volume of solids $S_0$ in $\text{m}^2/\text{m}^3$.',
      'Enter soil void ratio e.',
      'Enter groundwater temperature in $^\circ\text{C}$.',
      'Inspect hydraulic conductivity K in m/s and m/day and intrinsic permeability in Darcies.'
    ],
    benefitTitle: 'Josef Kozeny 1927 & Philip Carman 1937 Permeability Standard',
    benefitContent: 'Connects pore geometry and specific surface area to fluid hydraulic transmission ($K \propto \frac{e^3}{1+e}$), accurately predicting permeability in sands, filter beds, and porous ceramics.',
    faqs: [{ q: 'Why is Kozeny-Carman invalid for clay soils?', a: 'Clay platelet electro-chemical surface charges, bound water layers, and tortuous anisotropy violate the bundle-of-capillary tubes assumption.' }]
  },

  // 21. Hazen Formula Saturated Hydraulic Conductivity Calculator
  {
    slug: 'hazen-hydraulic-conductivity-effective-grain-size-calculator',
    name: 'Hazen Saturated Hydraulic Conductivity (K = C·d₁₀²) Filter Sand Calculator',
    description: 'Calculate clean sand filter hydraulic conductivity K in cm/s and m/day (K = C · d₁₀²) from effective grain size diameter d₁₀ (mm) and Hazen empirical coefficient C (0.8 to 1.5).',
    category: 'Science',
    icon: 'text',
    keywords: ['hazen formula calculator', 'effective grain size d10 hydraulic conductivity formula online', 'filter sand permeability hazen calculator', 'hazen coefficient c 1.0 calculator cm per s', 'hydrogeology water filtration civil engineering online'],
    order: 1305,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Effective Grain Size d₁₀ (mm), Hazen Constant C (0.8 to 1.5) & Water Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hz-d10">Effective d₁₀ (mm)</label>
          <input class="tool-textarea" id="hz-d10" type="number" step="0.05" value="0.30" placeholder="0.30 mm (Medium Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hz-c">Hazen Constant C</label>
          <input class="tool-textarea" id="hz-c" type="number" step="0.1" value="1.0" placeholder="1.0 (Standard Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hz-temp">Temp T (°C)</label>
          <input class="tool-textarea" id="hz-temp" type="number" step="5" value="20" placeholder="20 °C" />
        </div>
      </div>
      <div id="hz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hz-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">K = 0.0900 cm / s (77.8 m / day)</span>
            <span class="stat-label">Hazen Saturated Hydraulic Conductivity (K = C · d₁₀²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hz-res-desc" style="color:var(--green-dark); font-weight:700;">RAPID GRAVITY FILTER SAND (d₁₀ = 0.30 mm: Highly permeable water filtration media)</span>
            <span class="stat-label">Filtration Classification & Permeability Rating</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const d10El = document.getElementById('hz-d10'), cEl = document.getElementById('hz-c'), tEl = document.getElementById('hz-temp');
  const kResEl = document.getElementById('hz-res-k'), dsResEl = document.getElementById('hz-res-desc');

  function update() {
    const d10_mm = parseFloat(d10El.value), C = parseFloat(cEl.value), T_C = parseFloat(tEl.value);
    if (isNaN(d10_mm) || isNaN(C) || isNaN(T_C) || d10_mm <= 0 || C <= 0) return;

    // Hazen equation: K = C * (d10)^2  [cm / s @ 20°C]
    // Temperature viscosity correction: (0.70 + 0.03 * T)
    const temp_factor = 0.70 + (0.03 * T_C);
    const K_cm_s = C * Math.pow(d10_mm, 2) * (temp_factor / 1.30);
    const K_m_s = K_cm_s * 1e-2;
    const K_m_day = K_m_s * 86400.0;

    kResEl.textContent = 'K = ' + K_cm_s.toFixed(4) + ' cm/s (' + K_m_day.toFixed(1) + ' m/day)';
    dsResEl.textContent = 'K = ' + K_m_s.toExponential(2) + ' m/s (C = ' + C + ' for d₁₀ = ' + d10_mm + ' mm @ ' + T_C + '°C)';
  }

  [d10El, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter effective sieve diameter $d_{10}$ in mm ($10\%$ of grains by weight are finer).',
      'Enter Hazen empirical coefficient C (typically 1.0 for uniform sand).',
      'Enter water temperature in $^\circ\text{C}$.',
      'Inspect estimated saturated hydraulic conductivity K in cm/s and m/day.'
    ],
    benefitTitle: 'Allen Hazen 1892 Water Filtration Empirical Formula',
    benefitContent: 'Quick rule of thumb for estimating permeability of uniform slow/rapid gravity sand water filtration media with uniformity coefficient $C_u < 5$.',
    faqs: [{ q: 'What is the definition of d10 effective size?', a: '$d_{10}$ is the sieve mesh opening size through which exactly $10\%$ of the soil mass passes.' }]
  },

  // 22. Atkinson Mine Ventilation Airflow Friction Head Loss Calculator
  {
    slug: 'atkinson-mine-ventilation-friction-head-loss-calculator',
    name: 'Atkinson Mine Ventilation Friction Pressure Loss (H_f = K·P·L·Q² / 5.2·A³) Calculator',
    description: 'Calculate underground mine airway ventilation airway friction pressure loss H_f in inches of water gauge (in. w.g.) and Pa, airway resistance R, and air power requirement using Atkinson\'s equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['atkinson mine ventilation calculator', 'airway friction head loss formula atkinson online', 'underground mine ventilation pressure drop calculator', 'mine airway resistance r square law calculator', 'mining engineering ventilation airflow online'],
    order: 1306,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Airflow Volume Q (kcfm or m³/s), Cross-Section Area A (m²), Perimeter P (m), Length L (m) & Friction k',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ak-q">Airflow Q (m³/s)</label>
          <input class="tool-textarea" id="ak-q" type="number" step="10" value="50.0" placeholder="50.0 m³/s (106 kcfm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ak-a">Airway Area A (m²)</label>
          <input class="tool-textarea" id="ak-a" type="number" step="2" value="16.0" placeholder="16.0 m² (4m × 4m)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ak-p">Perimeter P (m)</label>
          <input class="tool-textarea" id="ak-p" type="number" step="2" value="16.0" placeholder="16.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ak-l">Length L (m)</label>
          <input class="tool-textarea" id="ak-l" type="number" step="100" value="500.0" placeholder="500.0 m Drift" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ak-k">Friction k (kg/m³)</label>
          <input class="tool-textarea" id="ak-k" type="number" step="0.002" value="0.012" placeholder="0.012 (Rock Airway)" />
        </div>
      </div>
      <div id="ak-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ak-res-dp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Pressure Drop ΔP = 58.6 Pa (0.235 in. w.g.)</span>
            <span class="stat-label">Atkinson Mine Airway Friction Pressure Loss (ΔP = R · Q²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ak-res-power" style="color:var(--green-dark); font-weight:700;">Fan Air Power = 2.93 kW | Atkinson Resistance R = 0.0234 N·s²/m⁸</span>
            <span class="stat-label">Ventilation Fan Aerodynamic Power & Airway Resistance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('ak-q'), aEl = document.getElementById('ak-a');
  const pEl = document.getElementById('ak-p'), lEl = document.getElementById('ak-l'), kEl = document.getElementById('ak-k');
  const dpResEl = document.getElementById('ak-res-dp'), pwResEl = document.getElementById('ak-res-power');

  function update() {
    const Q = parseFloat(qEl.value), A = parseFloat(aEl.value);
    const P = parseFloat(pEl.value), L = parseFloat(lEl.value), k_fric = parseFloat(kEl.value);

    if (isNaN(Q) || isNaN(A) || isNaN(P) || isNaN(L) || isNaN(k_fric) || Q <= 0 || A <= 0 || P <= 0 || L <= 0 || k_fric <= 0) return;

    // Atkinson Resistance: R = ( k * P * L ) / ( A^3 )  [N * s^2 / m^8]
    const R = (k_fric * P * L) / Math.pow(A, 3);

    // Pressure drop: Delta_P = R * Q^2  [Pa]
    const delta_P_Pa = R * Math.pow(Q, 2);
    const delta_P_in_wg = delta_P_Pa / 249.0889;

    // Fan air power: Air_Power = Delta_P * Q  [W -> kW]
    const power_kW = (delta_P_Pa * Q) / 1000.0;

    dpResEl.textContent = 'Pressure Drop ΔP = ' + delta_P_Pa.toFixed(1) + ' Pa (' + delta_P_in_wg.toFixed(3) + ' in. w.g.)';
    pwResEl.textContent = 'Fan Air Power = ' + power_kW.toFixed(2) + ' kW | Atkinson Resistance R = ' + R.toFixed(4) + ' N·s²/m⁸ (Q=' + Q + ' m³/s)';
  }

  [qEl, aEl, pEl, lEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter required airflow volumetric flow rate Q in $\text{m}^3/\text{s}$.',
      'Enter airway cross-sectional area A in $\text{m}^2$ and perimeter P in meters.',
      'Enter mine drift gallery length L in meters.',
      'Enter Atkinson friction factor k in $\text{kg/m}^3$ (typically 0.010–0.015 for rough rock walls).',
      'Inspect ventilation pressure drop $\Delta P$ in Pascals and Fan Air Power in kW.'
    ],
    benefitTitle: 'John Job Atkinson 1854 Mine Ventilation Equation',
    benefitContent: 'Quantifies airflow resistance in underground mine shaft networks ($\Delta P = R Q^2$), determining required primary exhaust ventilation fan power.',
    faqs: [{ q: 'Why is pressure drop inversely proportional to the cube of area (A³)?', a: 'Expanding cross-sectional area lowers velocity ($v = Q/A$) and expands hydraulic diameter, reducing friction drastically ($R \propto 1/A^3$).' }]
  },

  // 23. Ricker Wavelet Seismic Resolution & Tuning Thickness Calculator
  {
    slug: 'ricker-wavelet-seismic-peak-frequency-resolution-calculator',
    name: 'Ricker Wavelet Seismic Resolution & Tuning Thickness (λ / 4) Calculator',
    description: 'Calculate seismic zero-phase Ricker wavelet peak dominant frequency f_p, Rayleigh quarter-wavelength vertical resolution limit (Tuning Thickness = λ / 4 = v / 4·f_p), and time peak-to-trough separation.',
    category: 'Science',
    icon: 'text',
    keywords: ['ricker wavelet calculator', 'seismic tuning thickness formula lambda over 4 online', 'rayleigh criterion seismic vertical resolution calculator', 'ricker peak frequency peak to trough time calculator', 'geophysics seismic interpretation petroleum reservoir online'],
    order: 1307,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Peak Dominant Frequency f_p (Hz) & Reservoir Formation P-Wave Velocity v (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rw-fp">Peak Frequency f_p (Hz)</label>
          <input class="tool-textarea" id="rw-fp" type="number" step="5" value="35.0" placeholder="35.0 Hz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rw-v">Velocity v (m/s)</label>
          <input class="tool-textarea" id="rw-v" type="number" step="100" value="2800.0" placeholder="2800.0 m/s (Sandstone)" />
        </div>
      </div>
      <div id="rw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rw-res-tune" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Tuning Limit = 20.0 m (λ / 4 Resolution)</span>
            <span class="stat-label">Rayleigh Vertical Tuning Thickness (Bed thickness below which top/bottom interfere)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rw-res-time" style="color:var(--green-dark); font-weight:700;">Wavelength λ = 80.0 m | Peak-to-Trough Time Δt = 12.8 ms (√6 / (2·π·f_p))</span>
            <span class="stat-label">Dominant Wavelength (λ = v / f_p) & Wavelet Temporal Breadth</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fpEl = document.getElementById('rw-fp'), vEl = document.getElementById('rw-v');
  const tnResEl = document.getElementById('rw-res-tune'), tmResEl = document.getElementById('rw-res-time');

  function update() {
    const f_p = parseFloat(fpEl.value), v = parseFloat(vEl.value);
    if (isNaN(f_p) || isNaN(v) || f_p <= 0 || v <= 0) return;

    // Dominant seismic wavelength: lambda = v / f_p  [m]
    const lambda = v / f_p;

    // Rayleigh quarter-wavelength tuning thickness limit: z_tune = lambda / 4 = v / (4 * f_p)
    const z_tune = lambda / 4.0;

    // Ricker wavelet peak-to-trough time separation: Delta_t = sqrt(6) / (2 * pi * f_p)  [s -> ms]
    const delta_t_s = Math.sqrt(6.0) / (2.0 * Math.PI * f_p);
    const delta_t_ms = delta_t_s * 1000.0;

    tnResEl.textContent = 'Tuning Limit = ' + z_tune.toFixed(1) + ' m (λ / 4)';
    tmResEl.textContent = 'Wavelength λ = ' + lambda.toFixed(1) + ' m | Peak-to-Trough Δt = ' + delta_t_ms.toFixed(1) + ' ms (f_p = ' + f_p + ' Hz @ ' + v + ' m/s)';
  }

  fpEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter seismic source wavelet peak dominant frequency $f_p$ in Hz.',
      'Enter reservoir formation seismic acoustic velocity v in m/s.',
      'Inspect Rayleigh quarter-wavelength vertical resolution tuning thickness ($\lambda / 4$) and wavelet temporal width.'
    ],
    benefitTitle: 'Norman Ricker 1940 Wavelet Theory & Rayleigh Limit',
    benefitContent: 'Identifies the minimum geological layer thickness ($\lambda/4$) below which top and bottom acoustic reflections constructively interfere (tuning amplitude brightening), critical for thin-bed petroleum reservoir mapping.',
    faqs: [{ q: 'What is the limit of visibility for a thin bed?', a: 'The limit of visibility is approximately $\lambda / 30$; beds thinner than $\lambda/30$ produce no detectable seismic reflection.' }]
  },

  // 24. Archie's Law Formation Water Saturation Calculator
  {
    slug: 'archie-rock-water-saturation-resistivity-porosity-calculator',
    name: 'Archie\'s Law Well Logging Water Saturation (S_w = (a·R_w / (Φᵐ·R_t))^(1/n)) Calculator',
    description: 'Calculate hydrocarbon petroleum reservoir Water Saturation S_w (S_w = (a · R_w / (Φᵐ · R_t))^(1/n)), Hydrocarbon Saturation S_hc (1 - S_w), and Formation Factor F = a / Φᵐ from borehole electric wireline logs.',
    category: 'Science',
    icon: 'text',
    keywords: ['archie law calculator', 'water saturation formula sw online', 'formation factor cementation exponent m well logging calculator', 'hydrocarbon saturation wireline log archie calculator', 'petrophysics petroleum reservoir engineering geophysics online'],
    order: 1308,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Porosity Φ (0.05 to 0.40), True Resistivity R_t (Ω·m), Water Resistivity R_w (Ω·m) & Exponents (m, n)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ar-phi">Porosity Φ</label>
          <input class="tool-textarea" id="ar-phi" type="number" step="0.02" min="0.05" max="0.45" value="0.22" placeholder="0.22 (22% Porosity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-rt">True Deep R_t (Ω·m)</label>
          <input class="tool-textarea" id="ar-rt" type="number" step="5" value="50.0" placeholder="50.0 Ω·m (Hydrocarbon Pay)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-rw">Formation R_w (Ω·m)</label>
          <input class="tool-textarea" id="ar-rw" type="number" step="0.01" value="0.05" placeholder="0.05 Ω·m (Saline Brine)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-m">Cementation m</label>
          <input class="tool-textarea" id="ar-m" type="number" step="0.1" value="2.0" placeholder="2.0 (Sandstone)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-n">Saturation n</label>
          <input class="tool-textarea" id="ar-n" type="number" step="0.1" value="2.0" placeholder="2.0" />
        </div>
      </div>
      <div id="ar-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ar-res-sw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Water S_w = 14.4% | Hydrocarbon S_hc = 85.6%</span>
            <span class="stat-label">Archie Reservoir Fluid Saturation (S_w + S_hc = 100%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ar-res-f" style="color:var(--green-dark); font-weight:700;">Formation Factor F = 20.66 (1 / Φ²) | 100% Water Resistivity R_o = 1.03 Ω·m</span>
            <span class="stat-label">Formation Factor (F = a / Φᵐ) & 100% Water-Bearing Resistivity (R_o)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phiEl = document.getElementById('ar-phi'), rtEl = document.getElementById('ar-rt');
  const rwEl = document.getElementById('ar-rw'), mEl = document.getElementById('ar-m'), nEl = document.getElementById('ar-n');
  const swResEl = document.getElementById('ar-res-sw'), fResEl = document.getElementById('ar-res-f');

  function update() {
    const phi = parseFloat(phiEl.value), R_t = parseFloat(rtEl.value);
    const R_w = parseFloat(rwEl.value), m = parseFloat(mEl.value), n = parseFloat(nEl.value);

    if (isNaN(phi) || isNaN(R_t) || isNaN(R_w) || isNaN(m) || isNaN(n) || phi <= 0 || phi >= 1 || R_t <= 0 || R_w <= 0 || m <= 0 || n <= 0) return;

    // Formation factor: F = 1 / (phi^m)  (assuming a = 1.0)
    const F = 1.0 / Math.pow(phi, m);

    // 100% water saturated rock resistivity: R_o = F * R_w
    const R_o = F * R_w;

    // Archie Water Saturation: S_w = ( R_o / R_t )^(1 / n)
    const S_w = Math.pow(R_o / R_t, 1.0 / n);
    const S_w_pct = Math.min(100.0, S_w * 100.0);
    const S_hc_pct = 100.0 - S_w_pct;

    swResEl.textContent = 'Water S_w = ' + S_w_pct.toFixed(1) + '% | Oil/Gas S_hc = ' + S_hc_pct.toFixed(1) + '%';
    fResEl.textContent = 'Formation F = ' + F.toFixed(2) + ' | 100% Brine R_o = ' + R_o.toFixed(2) + ' Ω·m (R_t / R_o = ' + (R_t / R_o).toFixed(1) + '× Resistivity Boost)';
  }

  [phiEl, rtEl, rwEl, mEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reservoir formation fractional porosity $\Phi$ (e.g. 0.22 for $22\%$).',
      'Enter true deep formation resistivity $R_t$ from deep induction/lateral log in $\Omega\cdot\text{m}$.',
      'Enter formation connate water resistivity $R_w$ in $\Omega\cdot\text{m}$.',
      'Enter cementation exponent m (typically 2.0 for sandstone, 2.1 for carbonates) and saturation exponent n (typically 2.0).',
      'Inspect Water Saturation $S_w$ and net Hydrocarbon Saturation $S_{hc} = 1 - S_w$.'
    ],
    benefitTitle: 'Gus Archie 1942 Petrophysical Law',
    benefitContent: 'Hydrocarbons are non-conductive electrical insulators ($R_t \gg R_o$); Archie\'s equation calculates commercial oil and gas volume in place from wireline resistivity logging.',
    faqs: [{ q: 'What is considered a commercial water saturation threshold?', a: 'Water saturation $S_w < 30\%$ typically indicates commercial hydrocarbon production without excess water cut.' }]
  },

  // 25. Rock Mass Rating (Bieniawski RMR) Geomechanics Classification Calculator
  {
    slug: 'rock-mass-rating-rmr-geomechanics-classification-calculator',
    name: 'Rock Mass Rating (Bieniawski 1989 RMR Geomechanics Classification) Calculator',
    description: 'Calculate engineering Rock Mass Rating (RMR = R₁ + R₂ + R₃ + R₄ + R₅ + R₆ from 0 to 100) based on Bieniawski\'s 6 geomechanics parameters to determine tunnel stand-up time, cohesion, and friction angle.',
    category: 'Science',
    icon: 'text',
    keywords: ['rock mass rating calculator', 'bieniawski rmr geomechanics classification formula online', 'tunnel stand up time rock mass rating calculator', 'rock mass cohesion friction angle rmr calculator', 'mining civil rock mechanics tunneling engineering online'],
    order: 1309,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Uniaxial Compressive Strength (UCS), RQD (%), Joint Spacing, Joint Condition & Groundwater',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rm-r1">R₁: Intact Rock (UCS)</label>
          <select class="tool-textarea" id="rm-r1">
            <option value="12" selected>100 - 250 MPa (Very Strong: 12 pts)</option>
            <option value="15">> 250 MPa (Extremely Strong: 15 pts)</option>
            <option value="7">50 - 100 MPa (Strong: 7 pts)</option>
            <option value="4">25 - 50 MPa (Medium: 4 pts)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-r2">R₂: RQD Rating</label>
          <select class="tool-textarea" id="rm-r2">
            <option value="17" selected>75% - 90% RQD (Good: 17 pts)</option>
            <option value="20">90% - 100% RQD (Excellent: 20 pts)</option>
            <option value="13">50% - 75% RQD (Fair: 13 pts)</option>
            <option value="8">25% - 50% RQD (Poor: 8 pts)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-r3">R₃: Joint Spacing</label>
          <select class="tool-textarea" id="rm-r3">
            <option value="15" selected>0.6 - 2.0 m (Wide Spacing: 15 pts)</option>
            <option value="20">> 2.0 m (Very Wide: 20 pts)</option>
            <option value="10">0.2 - 0.6 m (Moderate: 10 pts)</option>
            <option value="8">0.06 - 0.2 m (Close: 8 pts)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-r4">R₄: Joint Condition</label>
          <select class="tool-textarea" id="rm-r4">
            <option value="25" selected>Slightly Rough, Hard Rock Walls (25 pts)</option>
            <option value="30">Very Rough, Unweathered, Tight (30 pts)</option>
            <option value="20">Slightly Rough, Gouge < 5mm (20 pts)</option>
            <option value="10">Slickensided, Gouge > 5mm (10 pts)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-r5">R₅: Groundwater</label>
          <select class="tool-textarea" id="rm-r5">
            <option value="15" selected>Completely Dry (15 pts)</option>
            <option value="10">Damp (10 pts)</option>
            <option value="7">Wet / Moderate Inflow (7 pts)</option>
            <option value="4">Dripping (4 pts)</option>
          </select>
        </div>
      </div>
      <div id="rm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rm-res-rmr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">RMR Score = 84 (CLASS I: VERY GOOD ROCK)</span>
            <span class="stat-label">Bieniawski Rock Mass Rating (RMR = ∑ R_i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rm-res-eng" style="color:var(--green-dark); font-weight:700;">Cohesion c > 400 kPa | Friction φ > 45° | Stand-Up Time: 20 Years for 15 m Span</span>
            <span class="stat-label">Rock Mass Shear Parameters & Tunnel Stand-Up Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('rm-r1'), r2El = document.getElementById('rm-r2');
  const r3El = document.getElementById('rm-r3'), r4El = document.getElementById('rm-r4'), r5El = document.getElementById('rm-r5');
  const rmrResEl = document.getElementById('rm-res-rmr'), engResEl = document.getElementById('rm-res-eng');

  function update() {
    const R1 = parseInt(r1El.value, 10);
    const R2 = parseInt(r2El.value, 10);
    const R3 = parseInt(r3El.value, 10);
    const R4 = parseInt(r4El.value, 10);
    const R5 = parseInt(r5El.value, 10);

    // Tunnel alignment adjustment R6 = 0 for favorable
    const RMR = R1 + R2 + R3 + R4 + R5;

    let rockClass = '', props = '', color = '#22543d';
    if (RMR >= 81) {
      rockClass = 'CLASS I: VERY GOOD ROCK (81 - 100)';
      props = 'Cohesion c > 400 kPa | Friction φ > 45° | Stand-Up: 20 yrs for 15m span';
      color = '#22543d';
    } else if (RMR >= 61) {
      rockClass = 'CLASS II: GOOD ROCK (61 - 80)';
      props = 'Cohesion c: 300 - 400 kPa | Friction φ: 35° - 45° | Stand-Up: 1 yr for 10m span';
      color = '#22543d';
    } else if (RMR >= 41) {
      rockClass = 'CLASS III: FAIR ROCK (41 - 60)';
      props = 'Cohesion c: 200 - 300 kPa | Friction φ: 25° - 35° | Stand-Up: 1 week for 5m span';
      color = '#ea580c';
    } else if (RMR >= 21) {
      rockClass = 'CLASS IV: POOR ROCK (21 - 40)';
      props = 'Cohesion c: 100 - 200 kPa | Friction φ: 15° - 25° | Stand-Up: 10 hrs for 2.5m span';
      color = '#c53030';
    } else {
      rockClass = 'CLASS V: VERY POOR ROCK (0 - 20)';
      props = 'Cohesion c < 100 kPa | Friction φ < 15° | Stand-Up: 30 min for 1m span';
      color = '#c53030';
    }

    rmrResEl.textContent = 'RMR Score = ' + RMR + ' (' + rockClass.split(' (')[0] + ')';
    rmrResEl.style.color = color;
    engResEl.textContent = props;
  }

  [r1El, r2El, r3El, r4El, r5El].forEach(el => el.addEventListener('change', update));
  update();
})();`,
    howToSteps: [
      'Select intact rock compressive strength rating $R_1$.',
      'Select Rock Quality Designation (RQD) rating $R_2$.',
      'Select discontinuity joint spacing rating $R_3$.',
      'Select joint wall condition rating $R_4$ and groundwater condition rating $R_5$.',
      'Inspect total Rock Mass Rating (RMR) score (0 to 100), rock mass classification (Class I to V), and tunnel unsupported stand-up time.'
    ],
    benefitTitle: 'Z. T. Bieniawski 1973/1989 Geomechanics Classification (RMR)',
    benefitContent: 'Universal empirical rock engineering classification system for designing tunnel rock bolt supports, shotcrete lining thickness, and dam foundation stability.',
    faqs: [{ q: 'What is Rock Quality Designation (RQD)?', a: 'RQD is the percentage of intact rock core pieces greater than $10\text{ cm}$ ($4\text{ inches}$) in length recovered from a drill core run.' }]
  }
];

pack46Tools.forEach(createTool);
console.log('Pack 46 complete: ' + pack46Tools.length + ' tools created.');
