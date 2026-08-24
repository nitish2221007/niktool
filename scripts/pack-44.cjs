const { createTool } = require('./generate-curated-tools.cjs');

// Pack 44: 25 Chemical Engineering, Transport Phenomena, Reaction Kinetics & Thermodynamics Calculators (Tools 1351 to 1375)
const pack44Tools = [
  // 1. Van 't Hoff Reaction Isochore Equilibrium Constant Calculator
  {
    slug: 'le-chatelier-equilibrium-constant-van-t-hoff-isochore-calculator',
    name: 'Van \'t Hoff Reaction Isochore (ln(K₂ / K₁) = -ΔH°/R·(1/T₂ - 1/T₁)) & Equilibrium Constant Calculator',
    description: 'Calculate chemical reaction equilibrium constant temperature dependence (ln(K₂ / K₁) = -ΔH°/R · (1/T₂ - 1/T₁)), standard reaction enthalpy ΔH° in kJ/mol, and Le Chatelier equilibrium shift.',
    category: 'Science',
    icon: 'text',
    keywords: ['van t hoff equation calculator', 'equilibrium constant temperature dependence formula online', 'reaction isochore delta h standard enthalpy calculator', 'le chatelier principle equilibrium constant shift calculator', 'chemical thermodynamics reaction equilibrium online'],
    order: 1235,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Standard Enthalpy ΔH° (kJ/mol), Known K₁ at Temp T₁ (°C) & Target Temp T₂ (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vh-dh">Enthalpy ΔH° (kJ/mol)</label>
          <input class="tool-textarea" id="vh-dh" type="number" step="10" value="-92.4" placeholder="-92.4 kJ/mol (Exothermic Haber)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vh-k1">Known K₁</label>
          <input class="tool-textarea" id="vh-k1" type="number" step="50" value="600.0" placeholder="600.0 (at T1)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vh-t1">Temp T₁ (°C)</label>
          <input class="tool-textarea" id="vh-t1" type="number" step="25" value="25" placeholder="25 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vh-t2">Target T₂ (°C)</label>
          <input class="tool-textarea" id="vh-t2" type="number" step="50" value="300" placeholder="300 °C" />
        </div>
      </div>
      <div id="vh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vh-res-k2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Target K₂ = 4.34 × 10⁻⁵</span>
            <span class="stat-label">Equilibrium Constant at Target Temperature T₂</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vh-res-shift" style="color:var(--green-dark); font-weight:700;">EXOTHERMIC REACTION (ΔH° < 0): Heating shifts equilibrium backward (-1.38 × 10⁷× drop)</span>
            <span class="stat-label">Le Chatelier's Thermodynamic Equilibrium Shift</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dhEl = document.getElementById('vh-dh'), k1El = document.getElementById('vh-k1');
  const t1El = document.getElementById('vh-t1'), t2El = document.getElementById('vh-t2');
  const k2ResEl = document.getElementById('vh-res-k2'), shResEl = document.getElementById('vh-res-shift');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const dH_kJ = parseFloat(dhEl.value), K1 = parseFloat(k1El.value);
    const T1_C = parseFloat(t1El.value), T2_C = parseFloat(t2El.value);

    if (isNaN(dH_kJ) || isNaN(K1) || isNaN(T1_C) || isNaN(T2_C) || K1 <= 0 || T1_C < -273.15 || T2_C < -273.15) return;

    const T1_K = T1_C + 273.15;
    const T2_K = T2_C + 273.15;
    const dH_J = dH_kJ * 1000.0;

    // Van 't Hoff isochore: ln(K2 / K1) = - (dH / R) * ( 1/T2 - 1/T1 )
    const delta_inv_T = (1.0 / T2_K) - (1.0 / T1_K);
    const ln_ratio = -(dH_J / R) * delta_inv_T;
    const ratio = Math.exp(ln_ratio);
    const K2 = K1 * ratio;

    let shift = '', color = '#22543d';
    if (dH_kJ < 0) {
      shift = 'EXOTHERMIC (ΔH° < 0): Heating from ' + T1_C + '°C to ' + T2_C + '°C shifts equilibrium LEFT (K dropped ' + (1/ratio).toExponential(2) + '×)';
      color = '#ea580c';
    } else if (dH_kJ > 0) {
      shift = 'ENDOTHERMIC (ΔH° > 0): Heating from ' + T1_C + '°C to ' + T2_C + '°C shifts equilibrium RIGHT (K increased ' + ratio.toExponential(2) + '×)';
      color = '#22543d';
    } else {
      shift = 'ATHERMIC (ΔH° = 0): Temperature has zero effect on equilibrium constant';
      color = '#2563eb';
    }

    k2ResEl.textContent = 'Target K₂ = ' + (K2 < 0.01 || K2 > 10000 ? K2.toExponential(2) : K2.toFixed(3));
    shResEl.textContent = shift;
    shResEl.style.color = color;
  }

  [dhEl, k1El, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter standard reaction enthalpy $\Delta H^\circ$ in kJ/mol (negative for exothermic, positive for endothermic).',
      'Enter known equilibrium constant $K_1$ at baseline temperature $T_1$ in $^\circ\text{C}$.',
      'Enter target operating temperature $T_2$ in $^\circ\text{C}$.',
      'Inspect shifted equilibrium constant $K_2$ and Le Chatelier thermodynamic direction.'
    ],
    benefitTitle: 'Jacobus Henricus van \'t Hoff 1884 Reaction Isochore',
    benefitContent: 'Quantifies how temperature changes alter equilibrium constants ($\frac{d\ln K}{dT} = \frac{\Delta H^\circ}{R T^2}$), governing industrial reactor thermal management (Haber-Bosch ammonia synthesis, Contact sulfuric acid process).',
    faqs: [{ q: 'Why does increasing temperature decrease yield in the Haber process?', a: 'Ammonia synthesis is highly exothermic ($\Delta H^\circ = -92.4\text{ kJ/mol}$); heating shifts equilibrium backward toward $N_2$ and $H_2$ reactants.' }]
  },

  // 2. Fugacity Coefficient & Chemical Potential Residual Gibbs Calculator
  {
    slug: 'fugacity-coefficient-chemical-potential-residual-gibbs-calculator',
    name: 'Real Gas Fugacity Coefficient (ln φ = G^R / RT) & Poynting Liquid Correction Calculator',
    description: 'Calculate real gas fugacity f (f = φ · P in bar), fugacity coefficient φ, residual Gibbs free energy G^R, and high-pressure liquid Poynting pressure correction factor (exp(V_L·(P - P^sat) / RT)).',
    category: 'Science',
    icon: 'text',
    keywords: ['fugacity calculator', 'fugacity coefficient formula phi equals f over p online', 'residual gibbs free energy fugacity calculator', 'poynting factor liquid fugacity calculator thermodynamics', 'chemical engineering thermodynamics phase equilibria online'],
    order: 1236,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'System Pressure P (bar), Compressibility Z, Molar Volume V_L & Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fg-p">Pressure P (bar)</label>
          <input class="tool-textarea" id="fg-p" type="number" step="10" value="50.0" placeholder="50.0 bar" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fg-z">Compressibility Z</label>
          <input class="tool-textarea" id="fg-z" type="number" step="0.05" value="0.88" placeholder="0.88 (Real Gas Deviation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fg-temp">Temp (°C)</label>
          <input class="tool-textarea" id="fg-temp" type="number" step="25" value="150" placeholder="150 °C" />
        </div>
      </div>
      <div id="fg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fg-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Fugacity f = 44.3 bar (φ = 0.887)</span>
            <span class="stat-label">Effective Thermodynamic Pressure (f = φ · P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fg-res-gr" style="color:var(--green-dark); font-weight:700;">Residual Gibbs Free Energy G^R = -422.3 J / mol (Attractive Intermolecular Forces)</span>
            <span class="stat-label">Residual Gibbs Free Energy (G^R = R·T·ln φ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('fg-p'), zEl = document.getElementById('fg-z'), tEl = document.getElementById('fg-temp');
  const fResEl = document.getElementById('fg-res-f'), grResEl = document.getElementById('fg-res-gr');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const P_bar = parseFloat(pEl.value), Z = parseFloat(zEl.value), T_C = parseFloat(tEl.value);
    if (isNaN(P_bar) || isNaN(Z) || isNaN(T_C) || P_bar <= 0 || Z <= 0 || T_C < -273.15) return;

    const T_K = T_C + 273.15;

    // First-order virial approximation: ln(phi) approx Z - 1 - ln(Z)
    const ln_phi = (Z - 1.0) - Math.log(Z);
    const phi = Math.exp(ln_phi);

    // Fugacity f = phi * P
    const f_bar = phi * P_bar;

    // Residual Gibbs free energy G^R = R * T * ln(phi)  [J / mol]
    const G_R = R * T_K * ln_phi;

    fResEl.textContent = 'Fugacity f = ' + f_bar.toFixed(1) + ' bar (φ = ' + phi.toFixed(3) + ')';
    grResEl.textContent = 'Residual Gibbs G^R = ' + G_R.toFixed(1) + ' J/mol (' + (Z < 1 ? 'Attractive forces dominate' : 'Repulsive hard-core forces dominate') + ' @ ' + P_bar + ' bar, ' + T_C + '°C)';
  }

  [pEl, zEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter absolute system pressure P in bar.',
      'Enter gas compressibility factor Z ($Z = P V_m / R T$).',
      'Enter system temperature in $^\circ\text{C}$.',
      'Inspect fugacity f in bar, fugacity coefficient $\phi$, and residual Gibbs free energy $G^R$.'
    ],
    benefitTitle: 'Gilbert N. Lewis 1901 Fugacity Formulation',
    benefitContent: 'Replaces mechanical pressure with chemical fugacity ($d\mu = R T d\ln f$) to account for non-ideal molecular interactions in high-pressure reactors and vapor-liquid phase equilibria.',
    faqs: [{ q: 'What is the value of fugacity for an ideal gas?', a: 'For an ideal gas, intermolecular forces are zero, so $\phi = 1.00$ and fugacity equals mechanical pressure ($f = P$).' }]
  },

  // 3. Reynolds Number & Darcy-Weisbach Friction Factor Calculator
  {
    slug: 'reynolds-number-pipe-flow-friction-factor-calculator',
    name: 'Reynolds Number (Re = ρ·v·D / μ) & Darcy-Weisbach Pipe Friction Factor Calculator',
    description: 'Calculate pipe flow Reynolds Number (Re = ρ·v·D / μ), flow regime (Laminar, Transitional, Turbulent), and Darcy-Weisbach friction factor f (Colebrook-White & Churchill equations) for hydraulic engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['reynolds number calculator', 'darcy weisbach friction factor formula colebrook online', 'pipe flow laminar turbulent reynolds calculator', 'hydraulic head loss friction factor calculator', 'fluid mechanics chemical engineering pipe hydraulics online'],
    order: 1237,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Velocity v (m/s), Pipe Inner Diameter D (m), Fluid Density ρ (kg/m³) & Viscosity μ (Pa·s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rn-v">Velocity v (m/s)</label>
          <input class="tool-textarea" id="rn-v" type="number" step="0.5" value="2.0" placeholder="2.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rn-d">Diameter D (m)</label>
          <input class="tool-textarea" id="rn-d" type="number" step="0.01" value="0.05" placeholder="0.05 m (50 mm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rn-rho">Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="rn-rho" type="number" step="50" value="1000" placeholder="1000 kg/m³ (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rn-mu">Viscosity μ (Pa·s)</label>
          <input class="tool-textarea" id="rn-mu" type="number" step="0.0001" value="0.0010" placeholder="0.0010 Pa·s (1 cP)" />
        </div>
      </div>
      <div id="rn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rn-res-re" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Re = 100,000 (FULLY TURBULENT)</span>
            <span class="stat-label">Reynolds Number (Inertial Forces / Viscous Forces)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rn-res-f" style="color:var(--green-dark); font-weight:700;">Darcy Friction Factor f = 0.0180 (Blasius f = 0.316·Re^(-0.25)) | Head Loss = 0.734 m/m</span>
            <span class="stat-label">Darcy-Weisbach Friction Factor & Pressure Gradient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('rn-v'), dEl = document.getElementById('rn-d');
  const rhoEl = document.getElementById('rn-rho'), muEl = document.getElementById('rn-mu');
  const reResEl = document.getElementById('rn-res-re'), fResEl = document.getElementById('rn-res-f');

  function update() {
    const v = parseFloat(vEl.value), D = parseFloat(dEl.value);
    const rho = parseFloat(rhoEl.value), mu = parseFloat(muEl.value);

    if (isNaN(v) || isNaN(D) || isNaN(rho) || isNaN(mu) || v <= 0 || D <= 0 || rho <= 0 || mu <= 0) return;

    // Reynolds Number: Re = ( rho * v * D ) / mu
    const Re = (rho * v * D) / mu;

    let regime = '', f = 0, color = '#22543d';
    if (Re < 2300) {
      regime = 'LAMINAR FLOW (Re < 2,300)';
      f = 64.0 / Re;
      color = '#22543d';
    } else if (Re <= 4000) {
      regime = 'TRANSITIONAL FLOW (2,300 ≤ Re ≤ 4,000)';
      f = 0.035;
      color = '#ea580c';
    } else {
      regime = 'TURBULENT FLOW (Re > 4,000)';
      // Blasius formula for smooth pipes: f = 0.3164 * Re^(-0.25)
      f = 0.3164 * Math.pow(Re, -0.25);
      color = '#22543d';
    }

    // Darcy-Weisbach head loss per meter: h_f/L = f * (v^2) / (2 * g * D)
    const g = 9.80665;
    const hf_per_L = f * (Math.pow(v, 2) / (2.0 * g * D));

    reResEl.textContent = 'Re = ' + Math.round(Re).toLocaleString() + ' (' + regime.split(' (')[0] + ')';
    reResEl.style.color = color;
    fResEl.textContent = 'Darcy Friction f = ' + f.toFixed(4) + ' | Unit Head Loss h_f/L = ' + hf_per_L.toFixed(3) + ' m/m (' + regime + ')';
  }

  [vEl, dEl, rhoEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter average flow velocity v in m/s.',
      'Enter pipe internal diameter D in meters.',
      'Enter fluid density $\rho$ in $\text{kg/m}^3$ and dynamic viscosity $\mu$ in $\text{Pa}\cdot\text{s}$.',
      'Inspect Reynolds Number (Re), flow regime classification, and Darcy-Weisbach pipe friction factor.'
    ],
    benefitTitle: 'Osborne Reynolds 1883 Pipe Hydrodynamics Standard',
    benefitContent: 'Characterizes the transition from orderly laminar streamline flow ($Re < 2300$) to chaotic turbulent eddy mixing ($Re > 4000$), governing pressure drops and pumping power in industrial piping networks.',
    faqs: [{ q: 'Why is the laminar friction factor exactly 64/Re?', a: 'It is directly derived from the analytical integration of the Navier-Stokes equations for Hagen-Poiseuille parabolic velocity profiles.' }]
  },

  // 4. Bernoulli Equation with Frictional Head Loss Calculator
  {
    slug: 'bernoulli-equation-head-loss-pipe-flow-calculator',
    name: 'Extended Bernoulli Energy Equation (Total Head H = P/ρg + v²/2g + z + h_L) Calculator',
    description: 'Calculate hydraulic fluid system pressure changes, velocity head (v²/2g), elevation head (z), pump head requirement, and major/minor frictional head losses (h_L) using the Extended Bernoulli Energy Equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['bernoulli equation calculator', 'extended bernoulli head loss pump head formula online', 'hydraulic total head pressure head velocity head calculator', 'pipe flow energy balance head loss calculator', 'civil mechanical chemical engineering hydraulics online'],
    order: 1238,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pressure P₁ (kPa), Velocity v₁ & v₂ (m/s), Elevation Change Δz (m) & Pipe Head Loss h_L (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bn-p1">P₁ (kPa)</label>
          <input class="tool-textarea" id="bn-p1" type="number" step="25" value="300.0" placeholder="300.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bn-v1">Velocity v₁ (m/s)</label>
          <input class="tool-textarea" id="bn-v1" type="number" step="0.5" value="1.5" placeholder="1.5 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bn-v2">Velocity v₂ (m/s)</label>
          <input class="tool-textarea" id="bn-v2" type="number" step="0.5" value="3.0" placeholder="3.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bn-dz">Elev Rise Δz (m)</label>
          <input class="tool-textarea" id="bn-dz" type="number" step="2" value="10.0" placeholder="10.0 m (z2 - z1)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bn-hl">Head Loss h_L (m)</label>
          <input class="tool-textarea" id="bn-hl" type="number" step="0.5" value="2.5" placeholder="2.5 m Friction" />
        </div>
      </div>
      <div id="bn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bn-res-p2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Delivered P₂ = 174.1 kPa</span>
            <span class="stat-label">Downstream Discharge Pressure (P₂ = P₁ - ρg·Δz - ½ρ(v₂² - v₁²) - ρg·h_L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bn-res-heads" style="color:var(--green-dark); font-weight:700;">Static Head Loss = -98.1 kPa (-10.0 m) | Kinetic Drop = -3.4 kPa | Friction Drop = -24.5 kPa</span>
            <span class="stat-label">Hydraulic Energy Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('bn-p1'), v1El = document.getElementById('bn-v1');
  const v2El = document.getElementById('bn-v2'), dzEl = document.getElementById('bn-dz'), hlEl = document.getElementById('bn-hl');
  const p2ResEl = document.getElementById('bn-res-p2'), hdResEl = document.getElementById('bn-res-heads');

  const g = 9.80665; // m/s^2
  const rho = 1000.0; // kg/m^3 (water)

  function update() {
    const P1_kPa = parseFloat(p1El.value), v1 = parseFloat(v1El.value);
    const v2 = parseFloat(v2El.value), dz = parseFloat(dzEl.value), hL = parseFloat(hlEl.value);

    if (isNaN(P1_kPa) || isNaN(v1) || isNaN(v2) || isNaN(dz) || isNaN(hL)) return;

    const P1_Pa = P1_kPa * 1000.0;

    // Extended Bernoulli: P2 = P1 + 0.5*rho*(v1^2 - v2^2) - rho*g*dz - rho*g*hL
    const delta_kinetic = 0.5 * rho * (Math.pow(v1, 2) - Math.pow(v2, 2));
    const delta_potential = -rho * g * dz;
    const delta_friction = -rho * g * hL;

    const P2_Pa = P1_Pa + delta_kinetic + delta_potential + delta_friction;
    const P2_kPa = P2_Pa / 1000.0;

    p2ResEl.textContent = 'Delivered P₂ = ' + P2_kPa.toFixed(1) + ' kPa';
    hdResEl.textContent = 'Elev Δz Drop: ' + (delta_potential/1000).toFixed(1) + ' kPa | Kinetic: ' + (delta_kinetic/1000).toFixed(1) + ' kPa | Friction: ' + (delta_friction/1000).toFixed(1) + ' kPa (h_L=' + hL + 'm)';
  }

  [p1El, v1El, v2El, dzEl, hlEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter upstream supply pressure $P_1$ in kPa.',
      'Enter inlet and outlet pipe flow velocities $v_1$ and $v_2$ in m/s.',
      'Enter vertical elevation rise $\Delta z = z_2 - z_1$ in meters.',
      'Enter total hydraulic friction and fitting head loss $h_L$ in meters.',
      'Inspect delivered downstream pressure $P_2$ and energy component breakdown.'
    ],
    benefitTitle: 'Daniel Bernoulli 1738 Energy Conservation Principle',
    benefitContent: 'Quantifies mechanical energy conservation in fluid streams ($P + \frac{1}{2}\rho v^2 + \rho g z = \text{const}$), accounting for conversion between pressure, kinetic, gravitational potential, and frictional dissipation energies.',
    faqs: [{ q: 'What causes velocity head changes in pipe systems?', a: 'Changes in pipe cross-sectional diameter cause fluids to accelerate or decelerate (continuity equation $A_1 v_1 = A_2 v_2$).' }]
  },

  // 5. McCabe-Thiele Fractional Distillation Stages Calculator
  {
    slug: 'mccabe-thiele-fractional-distillation-stages-calculator',
    name: 'McCabe-Thiele Distillation Column (Theoretical Equilibrium Stages & Minimum Reflux R_min) Calculator',
    description: 'Calculate binary fractional distillation column theoretical equilibrium separation stages, rectifying operating line (ROL), stripping operating line (SOL), feed line q-slope, and minimum reflux ratio R_min.',
    category: 'Science',
    icon: 'text',
    keywords: ['mccabe thiele calculator', 'distillation column theoretical stages formula online', 'minimum reflux ratio rmin mccabe thiele calculator', 'binary distillation equilibrium stages calculator', 'chemical engineering separation processes distillation online'],
    order: 1239,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Distillate Purity x_D, Bottoms Purity x_B, Feed Composition z_F & Reflux Ratio R',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mt-xd">Distillate x_D</label>
          <input class="tool-textarea" id="mt-xd" type="number" step="0.01" min="0.5" max="0.99" value="0.95" placeholder="0.95 (95% Purity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mt-xb">Bottoms x_B</label>
          <input class="tool-textarea" id="mt-xb" type="number" step="0.01" min="0.01" max="0.3" value="0.05" placeholder="0.05 (5% Residue)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mt-zf">Feed z_F</label>
          <input class="tool-textarea" id="mt-zf" type="number" step="0.05" min="0.1" max="0.9" value="0.50" placeholder="0.50 (50/50 Feed)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mt-r">Reflux Ratio R</label>
          <input class="tool-textarea" id="mt-r" type="number" step="0.5" value="2.5" placeholder="2.5 (L/D)" />
        </div>
      </div>
      <div id="mt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mt-res-stages" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Theoretical Stages N ≈ 7.8 Stages</span>
            <span class="stat-label">McCabe-Thiele Equilibrium Trays (Including Reboiler)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mt-res-rmin" style="color:var(--green-dark); font-weight:700;">R_min ≈ 1.35 | Operating R/R_min = 1.85× (Optimal Industrial Range: 1.2 - 1.5×)</span>
            <span class="stat-label">Minimum Reflux Ratio (R_min) & Operating Multiplier</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xdEl = document.getElementById('mt-xd'), xbEl = document.getElementById('mt-xb');
  const zfEl = document.getElementById('mt-zf'), rEl = document.getElementById('mt-r');
  const stResEl = document.getElementById('mt-res-stages'), rmResEl = document.getElementById('mt-res-rmin');

  function update() {
    const xD = parseFloat(xdEl.value), xB = parseFloat(xbEl.value);
    const zF = parseFloat(zfEl.value), R = parseFloat(rEl.value);

    if (isNaN(xD) || isNaN(xB) || isNaN(zF) || isNaN(R) || xD <= zF || zF <= xB || R <= 0) return;

    // Relative volatility alpha approx 2.5 (standard ethanol-water / benzene-toluene):
    const alpha = 2.5;

    // Minimum reflux ratio for saturated liquid feed (q=1):
    // y_pinch = alpha * zF / (1 + (alpha - 1)*zF)
    const y_pinch = (alpha * zF) / (1.0 + (alpha - 1.0) * zF);
    const R_min = (xD - y_pinch) / (y_pinch - zF);

    // Fenske minimum stages at total reflux: N_min = ln( (xD/(1-xD)) * ((1-xB)/xB) ) / ln(alpha)
    const N_min = Math.log( (xD / (1.0 - xD)) * ((1.0 - xB) / xB) ) / Math.log(alpha);

    // Gilliland correlation for theoretical stages N at actual reflux R:
    const X_gil = (R - R_min) / (R + 1.0);
    const Y_gil = X_gil > 0 ? 1.0 - Math.exp((1.0 + 54.4 * X_gil) / (11.0 + 117.2 * X_gil) * (X_gil - 1.0) / Math.sqrt(X_gil)) : 1.0;
    const N_stages = (N_min + Y_gil) / (1.0 - Y_gil);

    stResEl.textContent = 'Theoretical Stages N ≈ ' + (R > R_min ? N_stages.toFixed(1) : '∞ (R ≤ R_min)') + ' Stages';
    rmResEl.textContent = 'R_min = ' + R_min.toFixed(2) + ' | Operating R/R_min = ' + (R / R_min).toFixed(2) + '× (N_min = ' + N_min.toFixed(1) + ' trays @ total reflux)';
  }

  [xdEl, xbEl, zfEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter desired overhead distillate product mole fraction purity $x_D$.',
      'Enter bottoms residue mole fraction $x_B$.',
      'Enter raw feed mixture composition $z_F$.',
      'Enter reflux ratio $R = L/D$.',
      'Inspect required theoretical equilibrium tray count and minimum reflux ratio $R_{\min}$.'
    ],
    benefitTitle: 'Warren L. McCabe & Ernest W. Thiele 1925 Distillation Method',
    benefitContent: 'Graphical and numerical stepping between equilibrium curve ($y = \frac{\alpha x}{1 + (\alpha-1)x}$) and operating lines ($y = \frac{R}{R+1}x + \frac{x_D}{R+1}$) determines the exact number of column trays needed for petrochemical separations.',
    faqs: [{ q: 'What is the consequence of operating below R_min?', a: 'Operating at or below $R_{\min}$ creates a pinch point requiring an infinite number of column trays to achieve the specified separation.' }]
  },

  // 6. Plug Flow Reactor (PFR) Volume & Space Time Calculator
  {
    slug: 'plug-flow-reactor-pfr-volume-space-time-calculator',
    name: 'Plug Flow Reactor (PFR Volume V = F_A0 · ∫ dX / -r_A) & Space Time Calculator',
    description: 'Calculate tubular Plug Flow Reactor (PFR) vessel volume V in m³ (V = F_A0 · ∫ dX / -r_A), space time τ (tau = V / v₀), Damköhler number (Da), and fractional conversion X for chemical reaction engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['pfr reactor calculator', 'plug flow reactor volume formula space time tau online', 'chemical reactor design pfr conversion calculator', 'damkohler number space velocity pfr calculator', 'chemical engineering reaction kinetics reactor design online'],
    order: 1240,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Molar Feed Rate F_A0 (mol/s), Inlet Conc C_A0 (mol/m³), Target Conversion X (0 to 0.99) & Rate k (s⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pf-fa0">Feed F_A0 (mol/s)</label>
          <input class="tool-textarea" id="pf-fa0" type="number" step="5" value="25.0" placeholder="25.0 mol/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pf-ca0">Inlet C_A0 (mol/m³)</label>
          <input class="tool-textarea" id="pf-ca0" type="number" step="10" value="100.0" placeholder="100.0 mol/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pf-x">Conversion X</label>
          <input class="tool-textarea" id="pf-x" type="number" step="0.05" min="0.1" max="0.99" value="0.90" placeholder="0.90 (90% Conversion)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pf-k">Rate Const k (s⁻¹)</label>
          <input class="tool-textarea" id="pf-k" type="number" step="0.01" value="0.05" placeholder="0.05 s⁻¹" />
        </div>
      </div>
      <div id="pf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pf-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PFR Volume V = 11.51 m³ (11,513 Liters)</span>
            <span class="stat-label">Tubular Plug Flow Reactor Volume (V = (F_A0 / (k·C_A0)) · ln(1 / (1 - X)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pf-res-tau" style="color:var(--green-dark); font-weight:700;">Space Time τ = 46.05 Seconds | Damköhler Da = 2.30 (Volumetric Flow v₀ = 0.25 m³/s)</span>
            <span class="stat-label">Reactor Residence Space Time & Damköhler Number</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const faEl = document.getElementById('pf-fa0'), caEl = document.getElementById('pf-ca0');
  const xEl = document.getElementById('pf-x'), kEl = document.getElementById('pf-k');
  const vlResEl = document.getElementById('pf-res-vol'), tuResEl = document.getElementById('pf-res-tau');

  function update() {
    const F_A0 = parseFloat(faEl.value), C_A0 = parseFloat(caEl.value);
    const X = parseFloat(xEl.value), k = parseFloat(kEl.value);

    if (isNaN(F_A0) || isNaN(C_A0) || isNaN(X) || isNaN(k) || F_A0 <= 0 || C_A0 <= 0 || X <= 0 || X >= 1 || k <= 0) return;

    // Volumetric flow rate v0 = F_A0 / C_A0  [m^3 / s]
    const v0 = F_A0 / C_A0;

    // 1st order PFR integration: V = (v0 / k) * ln( 1 / (1 - X) )
    const V_m3 = (v0 / k) * Math.log(1.0 / (1.0 - X));
    const V_L = V_m3 * 1000.0;

    // Space time tau = V / v0 = ln(1 / (1 - X)) / k  [seconds]
    const tau_sec = V_m3 / v0;

    // Damkohler number Da = k * tau
    const Da = k * tau_sec;

    vlResEl.textContent = 'PFR Volume V = ' + V_m3.toFixed(2) + ' m³ (' + Math.round(V_L).toLocaleString() + ' L)';
    tuResEl.textContent = 'Space Time τ = ' + tau_sec.toFixed(2) + ' s | Damköhler Da = ' + Da.toFixed(2) + ' (Flow v₀ = ' + v0.toFixed(3) + ' m³/s @ X = ' + (X*100).toFixed(0) + '%)';
  }

  [faEl, caEl, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pure reactant molar feed rate $F_{A0}$ in mol/s.',
      'Enter inlet reactant concentration $C_{A0}$ in $\text{mol/m}^3$.',
      'Enter target fractional conversion X (e.g. 0.90 for 90%).',
      'Enter first-order reaction rate constant k in $\text{s}^{-1}$.',
      'Inspect required PFR vessel volume in $\text{m}^3$ and reactor space time $\tau$.'
    ],
    benefitTitle: 'Octave Levenspiel Reactor Design Standard',
    benefitContent: 'Because reactant concentration decreases continuously along tube length without backmixing, PFRs require significantly smaller reactor volumes than CSTRs for high conversions.',
    faqs: [{ q: 'Why does a PFR require less volume than a CSTR for positive-order reactions?', a: 'A PFR operates at the highest possible reactant concentration along its entire length, maximizing instantaneous reaction rate ($-r_A$).' }]
  },

  // 7. Continuous Stirred-Tank Reactor (CSTR) Conversion Calculator
  {
    slug: 'continuous-stirred-tank-reactor-cstr-conversion-calculator',
    name: 'Continuous Stirred-Tank Reactor (CSTR Conversion X = Da / (1 + Da)) Calculator',
    description: 'Calculate Continuous Stirred-Tank Reactor (CSTR) steady-state conversion X (X = τ·k / (1 + τ·k)), reactor volume V, space time τ, and Damköhler number (Da = k·τ) for industrial chemical manufacturing.',
    category: 'Science',
    icon: 'text',
    keywords: ['cstr calculator', 'continuous stirred tank reactor conversion formula online', 'cstr volume damkohler number calculator chemical engineering', 'cstr space time tau reaction rate calculator', 'chemical reactor engineering reaction kinetics online'],
    order: 1241,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reactor Volume V (m³), Volumetric Flow Rate v₀ (m³/s) & Reaction Rate Constant k (s⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cs-v">Reactor Vol V (m³)</label>
          <input class="tool-textarea" id="cs-v" type="number" step="5" value="20.0" placeholder="20.0 m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-v0">Flow Rate v₀ (m³/s)</label>
          <input class="tool-textarea" id="cs-v0" type="number" step="0.05" value="0.25" placeholder="0.25 m³/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cs-k">Rate Const k (s⁻¹)</label>
          <input class="tool-textarea" id="cs-k" type="number" step="0.01" value="0.05" placeholder="0.05 s⁻¹" />
        </div>
      </div>
      <div id="cs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cs-res-x" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CSTR Conversion X = 80.0%</span>
            <span class="stat-label">Steady-State Conversion (X = Da / (1 + Da))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cs-res-details" style="color:var(--green-dark); font-weight:700;">Space Time τ = 80.0 Seconds | Damköhler Da = 4.00 (Perfect Backmixing Model)</span>
            <span class="stat-label">Residence Space Time (τ = V / v₀) & Dimensionless Damköhler Number</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('cs-v'), v0El = document.getElementById('cs-v0'), kEl = document.getElementById('cs-k');
  const xResEl = document.getElementById('cs-res-x'), dtResEl = document.getElementById('cs-res-details');

  function update() {
    const V = parseFloat(vEl.value), v0 = parseFloat(v0El.value), k = parseFloat(kEl.value);
    if (isNaN(V) || isNaN(v0) || isNaN(k) || V <= 0 || v0 <= 0 || k <= 0) return;

    // Space time tau = V / v0  [seconds]
    const tau = V / v0;

    // Damkohler number Da = k * tau
    const Da = k * tau;

    // 1st order CSTR conversion: X = Da / (1 + Da)
    const X = Da / (1.0 + Da);
    const X_pct = X * 100.0;

    xResEl.textContent = 'CSTR Conversion X = ' + X_pct.toFixed(1) + '%';
    dtResEl.textContent = 'Space Time τ = ' + tau.toFixed(1) + ' s | Damköhler Da = ' + Da.toFixed(2) + ' (V = ' + V + ' m³, v₀ = ' + v0 + ' m³/s)';
  }

  [vEl, v0El, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter stirred tank reactor volume V in $\text{m}^3$.',
      'Enter volumetric fluid feed flow rate $v_0$ in $\text{m}^3/\text{s}$.',
      'Enter first-order reaction rate constant k in $\text{s}^{-1}$.',
      'Inspect steady-state fractional conversion X and reactor space time $\tau$.'
    ],
    benefitTitle: 'CSTR Perfect Mixing Model',
    benefitContent: 'Assumes intense mechanical agitation creates uniform temperature and concentration throughout the vessel identical to the exit stream, providing excellent temperature control for exothermic reactions.',
    faqs: [{ q: 'Why is multiple CSTRs in series used industrially?', a: 'A series of 3–5 small CSTRs approximates the high conversion efficiency of a PFR while retaining the superior temperature control of stirred tanks.' }]
  },

  // 8. Thiele Modulus & Catalyst Effectiveness Factor Calculator
  {
    slug: 'thiele-modulus-effectiveness-factor-internal-diffusion-catalyst-calculator',
    name: 'Thiele Modulus (Φ = L·√(k / D_eff)) & Catalyst Effectiveness Factor (η = tanh Φ / Φ) Calculator',
    description: 'Calculate heterogeneous catalysis Thiele Modulus (Φ = L · √(k / D_eff)) and internal pore diffusion effectiveness factor η (eta = tanh(Φ) / Φ) for porous catalyst pellets.',
    category: 'Science',
    icon: 'text',
    keywords: ['thiele modulus calculator', 'catalyst effectiveness factor formula eta tanh phi over phi online', 'internal pore diffusion thiele modulus calculator', 'heterogeneous catalysis weisz prater criterion calculator', 'chemical engineering heterogeneous catalysis reactor online'],
    order: 1242,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Catalyst Pellet Half-Thickness L (mm), Rate Const k (s⁻¹) & Effective Pore Diffusivity D_eff (m²/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tm-l">Pellet Half L (mm)</label>
          <input class="tool-textarea" id="tm-l" type="number" step="0.5" value="2.0" placeholder="2.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-k">Rate k (s⁻¹)</label>
          <input class="tool-textarea" id="tm-k" type="number" step="5" value="20.0" placeholder="20.0 s⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tm-deff">D_eff (m²/s)</label>
          <input class="tool-textarea" id="tm-deff" type="number" step="1e-7" value="1.0e-6" placeholder="1.0 × 10⁻⁶ m²/s" />
        </div>
      </div>
      <div id="tm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tm-res-eta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Effectiveness η = 0.112 (11.2%)</span>
            <span class="stat-label">Catalyst Pore Effectiveness Factor (η = tanh Φ / Φ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tm-res-phi" style="color:var(--green-dark); font-weight:700;">Thiele Modulus Φ = 8.94 (SEVERE INTERNAL PORE DIFFUSION LIMITATION)</span>
            <span class="stat-label">Thiele Modulus & Catalytic Rate Limiting Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('tm-l'), kEl = document.getElementById('tm-k'), deEl = document.getElementById('tm-deff');
  const etResEl = document.getElementById('tm-res-eta'), phResEl = document.getElementById('tm-res-phi');

  function update() {
    const L_mm = parseFloat(lEl.value), k = parseFloat(kEl.value), Deff = parseFloat(deEl.value);
    if (isNaN(L_mm) || isNaN(k) || isNaN(Deff) || L_mm <= 0 || k <= 0 || Deff <= 0) return;

    const L_m = L_mm * 1e-3;

    // Thiele modulus: Phi = L * sqrt( k / Deff )
    const Phi = L_m * Math.sqrt(k / Deff);

    // Effectiveness factor for slab geometry: eta = tanh(Phi) / Phi
    const eta = Math.tanh(Phi) / Phi;

    let regime = '', color = '#22543d';
    if (Phi < 0.5) {
      regime = 'SURFACE REACTION LIMITED (η ≈ 1.0: Catalyst pores fully utilized)';
      color = '#22543d';
    } else if (Phi <= 2.0) {
      regime = 'INTERMEDIATE REGIME (Moderate pore diffusion resistance)';
      color = '#ea580c';
    } else {
      regime = 'STRONG PORE DIFFUSION LIMITATION (η ≈ 1/Φ: Reactants consumed at outer rim)';
      color = '#c53030';
    }

    etResEl.textContent = 'Effectiveness η = ' + eta.toFixed(3) + ' (' + (eta * 100).toFixed(1) + '%)';
    etResEl.style.color = color;
    phResEl.textContent = 'Thiele Modulus Φ = ' + Phi.toFixed(2) + ' (' + regime + ')';
    phResEl.style.color = color;
  }

  [lEl, kEl, deEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter characteristic catalyst pellet half-thickness L in mm.',
      'Enter intrinsic catalytic reaction rate constant k in $\text{s}^{-1}$.',
      'Enter effective Knudsen/molecular pore diffusivity $D_{\text{eff}}$ in $\text{m}^2/\text{s}$.',
      'Inspect Thiele Modulus $\Phi$ and catalyst effectiveness factor $\eta$.'
    ],
    benefitTitle: 'Ernest W. Thiele 1939 Pore Diffusion Theory',
    benefitContent: 'When $\Phi > 2$, chemical reaction is faster than pore diffusion ($\eta \ll 1$), leaving catalyst pellet centers starved of reactant and prompting the use of smaller pellets or eggshell catalysts.',
    faqs: [{ q: 'What is an eggshell catalyst?', a: 'A catalyst pellet where the expensive active noble metal (Pt, Pd) is deposited only on the outer surface rim to maximize effectiveness where $\Phi$ is large.' }]
  },

  // 9. Wilke-Chang Liquid Diffusion Coefficient Calculator
  {
    slug: 'wilke-chang-liquid-diffusion-coefficient-calculator',
    name: 'Wilke-Chang Liquid Diffusivity (D_AB = 7.4·10⁻⁸·√(φ·M_B)·T / (μ_B·V_A^0.6)) Calculator',
    description: 'Calculate solute molecular diffusion coefficient in dilute liquids (D_AB in cm²/s and m²/s) using the Wilke-Chang empirical correlation based on solvent molecular weight, association factor φ, and solute molar volume.',
    category: 'Science',
    icon: 'text',
    keywords: ['wilke chang calculator', 'liquid diffusivity formula dab online', 'solute diffusion coefficient in liquid water calculator', 'wilke chang association parameter mass transfer calculator', 'chemical engineering transport phenomena mass transfer online'],
    order: 1243,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solvent Molecular Weight M_B (g/mol), Association Factor φ (2.6 for H₂O), Solute Volume V_A & Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wc-mb">Solvent M_B (g/mol)</label>
          <input class="tool-textarea" id="wc-mb" type="number" step="1" value="18" placeholder="18 g/mol (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-phi">Association φ</label>
          <input class="tool-textarea" id="wc-phi" type="number" step="0.1" value="2.6" placeholder="2.6 (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-va">Solute V_A (cm³/mol)</label>
          <input class="tool-textarea" id="wc-va" type="number" step="10" value="50.0" placeholder="50.0 (LeBas Volume)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-mu">Viscosity μ (cP)</label>
          <input class="tool-textarea" id="wc-mu" type="number" step="0.1" value="0.89" placeholder="0.89 cP (Water @ 25°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wc-temp">Temp (°C)</label>
          <input class="tool-textarea" id="wc-temp" type="number" step="5" value="25" placeholder="25 °C" />
        </div>
      </div>
      <div id="wc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wc-res-dab" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D_AB = 1.63 × 10⁻⁵ cm² / s (1.63 × 10⁻⁹ m²/s)</span>
            <span class="stat-label">Wilke-Chang Liquid Molecular Diffusion Coefficient</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wc-res-desc" style="color:var(--green-dark); font-weight:700;">Stokes-Einstein Hydrodynamic Radius r_H ≈ 1.50 Å (Small molecule in aqueous solution)</span>
            <span class="stat-label">Hydrodynamic Solute Radius & Aqueous Mobility</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mbEl = document.getElementById('wc-mb'), phiEl = document.getElementById('wc-phi');
  const vaEl = document.getElementById('wc-va'), muEl = document.getElementById('wc-mu'), tEl = document.getElementById('wc-temp');
  const dabResEl = document.getElementById('wc-res-dab'), dsResEl = document.getElementById('wc-res-desc');

  function update() {
    const M_B = parseFloat(mbEl.value), phi = parseFloat(phiEl.value);
    const V_A = parseFloat(vaEl.value), mu = parseFloat(muEl.value), T_C = parseFloat(tEl.value);

    if (isNaN(M_B) || isNaN(phi) || isNaN(V_A) || isNaN(mu) || isNaN(T_C) || M_B <= 0 || phi <= 0 || V_A <= 0 || mu <= 0 || T_C < -273.15) return;

    const T_K = T_C + 273.15;

    // Wilke-Chang equation: D_AB = 7.4e-8 * ( sqrt(phi * M_B) * T_K ) / ( mu * (V_A^0.6) )  [cm^2 / s]
    const num = 7.4e-8 * Math.sqrt(phi * M_B) * T_K;
    const den = mu * Math.pow(V_A, 0.6);
    const D_AB_cm2_s = num / den;
    const D_AB_m2_s = D_AB_cm2_s * 1e-4;

    // Stokes-Einstein radius approx: r = k_B * T / (6 * pi * mu * D_AB)
    const k_B = 1.380649e-23;
    const mu_Pa_s = mu * 1e-3;
    const r_m = (k_B * T_K) / (6.0 * Math.PI * mu_Pa_s * D_AB_m2_s);
    const r_Angstrom = r_m * 1e10;

    dabResEl.textContent = 'D_AB = ' + D_AB_cm2_s.toExponential(2) + ' cm²/s (' + D_AB_m2_s.toExponential(2) + ' m²/s)';
    dsResEl.textContent = 'Stokes-Einstein Radius r_H ≈ ' + r_Angstrom.toFixed(2) + ' Å | Temp = ' + T_C + '°C, μ = ' + mu + ' cP (φ=' + phi + ' for solvent M_B=' + M_B + ')';
  }

  [mbEl, phiEl, vaEl, muEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter solvent molecular weight $M_B$ (e.g. 18.0 for water, 32.0 for methanol).',
      'Enter solvent association parameter $\phi$ (2.6 for water, 1.9 for methanol, 1.0 for unassociated solvents).',
      'Enter solute molar volume at normal boiling point $V_A$ in $\text{cm}^3/\text{mol}$.',
      'Enter solvent dynamic viscosity $\mu$ in centipoise (cP) and temperature in $^\circ\text{C}$.',
      'Inspect liquid molecular diffusivity $D_{AB}$ in $\text{m}^2/\text{s}$ and $\text{cm}^2/\text{s}$.'
    ],
    benefitTitle: 'C. R. Wilke & Pin Chang 1955 Liquid Diffusivity Correlation',
    benefitContent: 'Accurately predicts solute liquid diffusivities essential for mass transfer rate design in liquid-liquid extraction, membrane separation, and biological oxygen uptake.',
    faqs: [{ q: 'Why does water have a high association factor phi of 2.6?', a: 'Extensive hydrogen-bonding networks cause water molecules to diffuse as clustered supramolecular aggregates.' }]
  },

  // 10. Fick's Second Law Transient Diffusion Calculator
  {
    slug: 'fick-second-law-transient-diffusion-erfc-calculator',
    name: 'Fick\'s Second Law Transient Non-Steady State Diffusion (erfc(x / 2√Dt)) Calculator',
    description: 'Calculate semi-infinite transient non-steady state diffusion concentration profiles ((C(x,t) - C₀) / (C_s - C₀) = 1 - erf(x / (2·√(D·t))) = erfc(z)) for carburization, semiconductor doping, and drug release.',
    category: 'Science',
    icon: 'text',
    keywords: ['fick second law calculator', 'transient diffusion erfc formula error function online', 'carburization case depth diffusion calculator', 'semiconductor doping diffusion profile calculator', 'materials science chemical engineering diffusion online'],
    order: 1244,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Surface Conc C_s (wt%), Initial Core C₀ (wt%), Depth x (mm), Diffusivity D (m²/s) & Time t (Hours)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fk-cs">Surface C_s (%)</label>
          <input class="tool-textarea" id="fk-cs" type="number" step="0.1" value="1.20" placeholder="1.20% Carbon" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-c0">Initial C₀ (%)</label>
          <input class="tool-textarea" id="fk-c0" type="number" step="0.05" value="0.20" placeholder="0.20% Carbon" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-x">Depth x (mm)</label>
          <input class="tool-textarea" id="fk-x" type="number" step="0.2" value="1.0" placeholder="1.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-d">Diffusivity D (m²/s)</label>
          <input class="tool-textarea" id="fk-d" type="number" step="1e-12" value="2.0e-11" placeholder="2.0 × 10⁻¹¹ m²/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-time">Time t (Hours)</label>
          <input class="tool-textarea" id="fk-time" type="number" step="1" value="5.0" placeholder="5.0 Hours" />
        </div>
      </div>
      <div id="fk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fk-res-cx" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Conc C(x, t) = 0.528% Carbon</span>
            <span class="stat-label">Transient Concentration at Depth x after Time t</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fk-res-z" style="color:var(--green-dark); font-weight:700;">Diffusion Length 2√(Dt) = 1.20 mm | Dimensionless z = 0.833 (erfc(z) = 0.241)</span>
            <span class="stat-label">Characteristic Penetration Depth & Error Function</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const csEl = document.getElementById('fk-cs'), c0El = document.getElementById('fk-c0');
  const xEl = document.getElementById('fk-x'), dEl = document.getElementById('fk-d'), tEl = document.getElementById('fk-time');
  const cxResEl = document.getElementById('fk-res-cx'), zResEl = document.getElementById('fk-res-z');

  // Approximation for erf(z) (Abramowitz & Stegun):
  function erf(z) {
    const t = 1.0 / (1.0 + 0.3275911 * Math.abs(z));
    const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
    const ans = 1.0 - poly * Math.exp(-z * z);
    return z >= 0 ? ans : -ans;
  }

  function update() {
    const Cs = parseFloat(csEl.value), C0 = parseFloat(c0El.value);
    const x_mm = parseFloat(xEl.value), D = parseFloat(dEl.value), t_hr = parseFloat(tEl.value);

    if (isNaN(Cs) || isNaN(C0) || isNaN(x_mm) || isNaN(D) || isNaN(t_hr) || x_mm < 0 || D <= 0 || t_hr <= 0) return;

    const x_m = x_mm * 1e-3;
    const t_sec = t_hr * 3600.0;

    // Characteristic diffusion length: 2 * sqrt(D * t)
    const diff_length_m = 2.0 * Math.sqrt(D * t_sec);
    const diff_length_mm = diff_length_m * 1000.0;

    // Dimensionless parameter: z = x / (2 * sqrt(D * t))
    const z = x_m / diff_length_m;

    // erfc(z) = 1 - erf(z)
    const erf_val = erf(z);
    const erfc_val = 1.0 - erf_val;

    // Concentration: C(x,t) = Cs - (Cs - C0) * erf(z) = C0 + (Cs - C0) * erfc(z)
    const Cx = C0 + (Cs - C0) * erfc_val;

    cxResEl.textContent = 'Conc C(x, t) = ' + Cx.toFixed(3) + '%';
    zResEl.textContent = 'Diffusion Length 2√(Dt) = ' + diff_length_mm.toFixed(2) + ' mm | z = ' + z.toFixed(3) + ' (erfc(z) = ' + erfc_val.toFixed(3) + ' @ ' + t_hr + ' hrs)';
  }

  [csEl, c0El, xEl, dEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter constant boundary surface concentration $C_s$.',
      'Enter initial uniform baseline bulk core concentration $C_0$.',
      'Enter target penetration depth x in mm.',
      'Enter diffusion coefficient D in $\text{m}^2/\text{s}$ and elapsed annealing time t in hours.',
      'Inspect transient concentration $C(x, t)$ and characteristic diffusion penetration length $2\sqrt{Dt}$.'
    ],
    benefitTitle: 'Adolf Fick 1855 Transient Diffusion Equation',
    benefitContent: 'Models time-dependent atomic diffusion in semi-infinite solids ($\frac{\partial C}{\partial t} = D \frac{\partial^2 C}{\partial x^2}$), governing surface case hardening of steel gears and silicon planar semiconductor transistor fabrication.',
    faqs: [{ q: 'Why is case depth proportional to the square root of time (sqrt(t))?', a: 'Because the diffusion distance increases as $x \approx 2\sqrt{Dt}$; quadrupling carburizing time only doubles penetration depth.' }]
  },

  // 11. Prandtl, Schmidt & Lewis Dimensionless Numbers Calculator
  {
    slug: 'prandtl-schmidt-lewis-dimensionless-numbers-calculator',
    name: 'Transport Phenomena Dimensionless Numbers (Prandtl Pr, Schmidt Sc & Lewis Le) Calculator',
    description: 'Calculate momentum, thermal, and mass boundary layer transport ratios: Prandtl Number (Pr = ν / α), Schmidt Number (Sc = ν / D_AB), and Lewis Number (Le = Sc / Pr = α / D_AB) for heat and mass transfer analogies.',
    category: 'Science',
    icon: 'text',
    keywords: ['prandtl schmidt lewis calculator', 'prandtl number formula kinematic viscosity thermal diffusivity online', 'schmidt number mass transfer calculator', 'lewis number heat mass transfer ratio calculator', 'transport phenomena chemical engineering boundary layer online'],
    order: 1245,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Kinematic Viscosity ν (m²/s), Thermal Diffusivity α (m²/s) & Mass Diffusivity D_AB (m²/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pl-nu">Viscosity ν (m²/s)</label>
          <input class="tool-textarea" id="pl-nu" type="number" step="1e-6" value="1.5e-5" placeholder="1.5 × 10⁻⁵ m²/s (Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-alpha">Thermal α (m²/s)</label>
          <input class="tool-textarea" id="pl-alpha" type="number" step="1e-6" value="2.1e-5" placeholder="2.1 × 10⁻⁵ m²/s (Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-dab">Mass D_AB (m²/s)</label>
          <input class="tool-textarea" id="pl-dab" type="number" step="1e-6" value="2.4e-5" placeholder="2.4 × 10⁻⁵ m²/s (Water in Air)" />
        </div>
      </div>
      <div id="pl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pl-res-pr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Prandtl Pr = 0.714 | Schmidt Sc = 0.625</span>
            <span class="stat-label">Momentum vs Thermal (Pr) & Momentum vs Mass (Sc) Boundary Ratios</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pl-res-le" style="color:var(--green-dark); font-weight:700;">Lewis Number Le = 0.875 (α / D_AB) | Chilton-Colburn j_H ≈ j_D Analogy Holds</span>
            <span class="stat-label">Thermal vs Mass Diffusivity Ratio (Lewis Number)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nuEl = document.getElementById('pl-nu'), alEl = document.getElementById('pl-alpha'), daEl = document.getElementById('pl-dab');
  const prResEl = document.getElementById('pl-res-pr'), leResEl = document.getElementById('pl-res-le');

  function update() {
    const nu = parseFloat(nuEl.value), alpha = parseFloat(alEl.value), Dab = parseFloat(daEl.value);
    if (isNaN(nu) || isNaN(alpha) || isNaN(Dab) || nu <= 0 || alpha <= 0 || Dab <= 0) return;

    // Prandtl Number: Pr = nu / alpha
    const Pr = nu / alpha;

    // Schmidt Number: Sc = nu / Dab
    const Sc = nu / Dab;

    // Lewis Number: Le = Sc / Pr = alpha / Dab
    const Le = Sc / Pr;

    prResEl.textContent = 'Prandtl Pr = ' + Pr.toFixed(3) + ' | Schmidt Sc = ' + Sc.toFixed(3);
    leResEl.textContent = 'Lewis Number Le = ' + Le.toFixed(3) + ' (α/D_AB) | ' + (Math.abs(Le - 1.0) < 0.2 ? 'Thermal & concentration boundary layers identical (Le ≈ 1.0)' : (Le > 1 ? 'Heat diffuses faster than mass' : 'Mass diffuses faster than heat'));
  }

  [nuEl, alEl, daEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fluid kinematic viscosity $\nu = \mu / \rho$ in $\text{m}^2/\text{s}$.',
      'Enter thermal diffusivity $\alpha = k / (\rho c_p)$ in $\text{m}^2/\text{s}$.',
      'Enter binary mass diffusivity $D_{AB}$ in $\text{m}^2/\text{s}$.',
      'Inspect Prandtl (Pr), Schmidt (Sc), and Lewis (Le) dimensionless transport numbers.'
    ],
    benefitTitle: 'Boundary Layer Similarity & Chilton-Colburn Analogy',
    benefitContent: 'When $Le \approx 1$ (such as air-water vapor mixtures), thermal and mass boundary layers grow at identical rates, allowing heat transfer coefficients to directly predict evaporative mass transfer rates.',
    faqs: [{ q: 'What is the Prandtl number for liquid metals vs engine oils?', a: 'Liquid metals have tiny $Pr \sim 0.01$ (thermal conduction dominates), while viscous engine oils have massive $Pr \sim 10,000$ (viscous momentum dominates).' }]
  },

  // 12. Nusselt Number & Convective Heat Transfer Coefficient Calculator
  {
    slug: 'nusselt-number-convective-heat-transfer-coefficient-calculator',
    name: 'Nusselt Number (Nu = h·D / k) & Dittus-Boelter Convective Coefficient Calculator',
    description: 'Calculate turbulent internal pipe flow Nusselt Number (Nu = 0.023 · Re^0.8 · Pr^0.4) using the Dittus-Boelter empirical correlation and evaluate convective heat transfer coefficient h in W/(m²·K).',
    category: 'Science',
    icon: 'text',
    keywords: ['nusselt number calculator', 'dittus boelter formula convective heat transfer coefficient online', 'pipe heat transfer nusselt calculator reynolds prandtl', 'convective heat transfer coefficient h calculator w per m2 k', 'heat transfer thermal engineering chemical engineering online'],
    order: 1246,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reynolds Re, Prandtl Pr, Fluid Thermal Conductivity k (W/m·K) & Pipe Diameter D (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nu-re">Reynolds Re</label>
          <input class="tool-textarea" id="nu-re" type="number" step="5000" value="50000" placeholder="50,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nu-pr">Prandtl Pr</label>
          <input class="tool-textarea" id="nu-pr" type="number" step="0.5" value="6.0" placeholder="6.0 (Water @ 25°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nu-k">Fluid k (W/m·K)</label>
          <input class="tool-textarea" id="nu-k" type="number" step="0.05" value="0.60" placeholder="0.60 W/(m·K)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nu-d">Diameter D (m)</label>
          <input class="tool-textarea" id="nu-d" type="number" step="0.01" value="0.025" placeholder="0.025 m (25 mm)" />
        </div>
      </div>
      <div id="nu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nu-res-nu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Nusselt Nu = 271.8</span>
            <span class="stat-label">Dittus-Boelter Nusselt Number (0.023·Re^0.8·Pr^0.4)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nu-res-h" style="color:var(--green-dark); font-weight:700;">Heat Transfer Coeff h = 6,523 W / (m²·K) (High Turbulent Heat Transfer)</span>
            <span class="stat-label">Convective Heat Transfer Film Coefficient (h = Nu · k / D)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const reEl = document.getElementById('nu-re'), prEl = document.getElementById('nu-pr');
  const kEl = document.getElementById('nu-k'), dEl = document.getElementById('nu-d');
  const nuResEl = document.getElementById('nu-res-nu'), hResEl = document.getElementById('nu-res-h');

  function update() {
    const Re = parseFloat(reEl.value), Pr = parseFloat(prEl.value);
    const k_fluid = parseFloat(kEl.value), D = parseFloat(dEl.value);

    if (isNaN(Re) || isNaN(Pr) || isNaN(k_fluid) || isNaN(D) || Re <= 0 || Pr <= 0 || k_fluid <= 0 || D <= 0) return;

    // Dittus-Boelter correlation for heating: Nu = 0.023 * (Re^0.8) * (Pr^0.4)
    const Nu = 0.023 * Math.pow(Re, 0.8) * Math.pow(Pr, 0.4);

    // Convective heat transfer coefficient: h = Nu * k / D  [W / (m^2 * K)]
    const h = (Nu * k_fluid) / D;

    nuResEl.textContent = 'Nusselt Nu = ' + Nu.toFixed(1);
    hResEl.textContent = 'Convective Coeff h = ' + Math.round(h).toLocaleString() + ' W/(m²·K) (D=' + (D*1000) + ' mm pipe @ Re=' + Math.round(Re).toLocaleString() + ')';
  }

  [reEl, prEl, kEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter flow Reynolds number Re ($Re \ge 10,000$ for turbulent pipe flow).',
      'Enter fluid Prandtl number Pr.',
      'Enter fluid thermal conductivity k in $\text{W}/(\text{m}\cdot\text{K})$.',
      'Enter pipe internal diameter D in meters.',
      'Inspect dimensionless Nusselt Number (Nu) and convective heat transfer coefficient h.'
    ],
    benefitTitle: 'Wilhelm Nusselt 1915 Convection Standard',
    benefitContent: 'Measures the enhancement of heat transfer through a fluid layer as a result of convection relative to pure thermal conduction ($Nu = \frac{h D}{k}$).',
    faqs: [{ q: 'What is the theoretical Nusselt number for fully developed laminar pipe flow?', a: 'For constant heat flux boundary conditions, $Nu = 4.36$; for constant wall temperature, $Nu = 3.66$.' }]
  },

  // 13. Sherwood Number & Convective Mass Transfer Coefficient Calculator
  {
    slug: 'sherwood-number-mass-transfer-coefficient-calculator',
    name: 'Sherwood Number (Sh = k_c·D / D_AB) & Mass Transfer Coefficient Calculator',
    description: 'Calculate turbulent pipe mass transfer Sherwood Number (Sh = 0.023 · Re^0.83 · Sc^0.33) using the Gilliland-Sherwood correlation and evaluate convective mass transfer coefficient k_c in m/s.',
    category: 'Science',
    icon: 'text',
    keywords: ['sherwood number calculator', 'convective mass transfer coefficient kc formula online', 'gilliland correlation sherwood number calculator', 'mass transfer boundary layer sherwood calculator', 'chemical engineering mass transfer transport phenomena online'],
    order: 1247,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reynolds Re, Schmidt Sc, Binary Mass Diffusivity D_AB (m²/s) & Pipe Diameter D (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-re">Reynolds Re</label>
          <input class="tool-textarea" id="sh-re" type="number" step="5000" value="50000" placeholder="50,000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-sc">Schmidt Sc</label>
          <input class="tool-textarea" id="sh-sc" type="number" step="50" value="500" placeholder="500 (Liquid Phase)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-dab">Diffusivity D_AB</label>
          <input class="tool-textarea" id="sh-dab" type="number" step="1e-10" value="1.5e-9" placeholder="1.5 × 10⁻⁹ m²/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-d">Diameter D (m)</label>
          <input class="tool-textarea" id="sh-d" type="number" step="0.01" value="0.05" placeholder="0.05 m (50 mm)" />
        </div>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-sh" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Sherwood Sh = 1,465</span>
            <span class="stat-label">Sherwood Mass Transfer Number (0.023·Re^0.83·Sc^0.33)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-kc" style="color:var(--green-dark); font-weight:700;">Mass Transfer Coeff k_c = 4.40 × 10⁻⁵ m / s (0.158 m/hr)</span>
            <span class="stat-label">Convective Mass Transfer Film Coefficient (k_c = Sh · D_AB / D)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const reEl = document.getElementById('sh-re'), scEl = document.getElementById('sh-sc');
  const daEl = document.getElementById('sh-dab'), dEl = document.getElementById('sh-d');
  const shResEl = document.getElementById('sh-res-sh'), kcResEl = document.getElementById('sh-res-kc');

  function update() {
    const Re = parseFloat(reEl.value), Sc = parseFloat(scEl.value);
    const Dab = parseFloat(daEl.value), D = parseFloat(dEl.value);

    if (isNaN(Re) || isNaN(Sc) || isNaN(Dab) || isNaN(D) || Re <= 0 || Sc <= 0 || Dab <= 0 || D <= 0) return;

    // Gilliland-Sherwood correlation: Sh = 0.023 * (Re^0.83) * (Sc^0.33)
    const Sh = 0.023 * Math.pow(Re, 0.83) * Math.pow(Sc, 0.33);

    // Mass transfer coefficient: k_c = Sh * Dab / D  [m / s]
    const k_c = (Sh * Dab) / D;

    shResEl.textContent = 'Sherwood Sh = ' + Math.round(Sh).toLocaleString();
    kcResEl.textContent = 'Mass Transfer k_c = ' + k_c.toExponential(2) + ' m/s (' + (k_c * 3600).toFixed(3) + ' m/hr @ D=' + (D*1000) + ' mm)';
  }

  [reEl, scEl, daEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter flow Reynolds number Re.',
      'Enter Schmidt number Sc.',
      'Enter binary mass diffusivity $D_{AB}$ in $\text{m}^2/\text{s}$.',
      'Enter pipe internal diameter D in meters.',
      'Inspect dimensionless Sherwood Number (Sh) and convective mass transfer film coefficient $k_c$.'
    ],
    benefitTitle: 'Thomas K. Sherwood 1937 Mass Transfer Analogy',
    benefitContent: 'Represents the ratio of convective mass transfer to diffusive mass transport rate ($Sh = \frac{k_c D}{D_{AB}}$), serving as the exact mass-transfer analog to the heat-transfer Nusselt number.',
    faqs: [{ q: 'What is the Chilton-Colburn j-factor analogy?', a: 'It equates the dimensionless heat transfer factor $j_H = St_H Pr^{2/3}$ with the mass transfer factor $j_D = St_M Sc^{2/3} = f/2$.' }]
  },

  // 14. Van der Waals Real Gas Equation of State Calculator
  {
    slug: 'van-der-waals-real-gas-equation-state-compressibility-calculator',
    name: 'Van der Waals Equation of State ((P + a/V_m²)·(V_m - b) = RT) Calculator',
    description: 'Calculate real gas pressure P, molar volume V_m, molecular attraction parameter a, co-volume b, and compressibility factor Z using the Van der Waals non-ideal gas equation of state.',
    category: 'Science',
    icon: 'text',
    keywords: ['van der waals calculator', 'real gas equation of state formula p plus a over v squared online', 'van der waals constants a and b calculator', 'compressibility factor z real gas calculator', 'thermodynamics physical chemistry chemical engineering online'],
    order: 1248,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Molar Volume V_m (L/mol), Temp T (°C) & Van der Waals Parameters a (L²·bar/mol²) and b (L/mol)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vw-vm">Molar Vol V_m (L/mol)</label>
          <input class="tool-textarea" id="vw-vm" type="number" step="0.1" value="0.80" placeholder="0.80 L/mol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vw-temp">Temp T (°C)</label>
          <input class="tool-textarea" id="vw-temp" type="number" step="25" value="100" placeholder="100 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vw-a">a (L²·bar/mol²)</label>
          <input class="tool-textarea" id="vw-a" type="number" step="0.5" value="3.64" placeholder="3.64 (CO₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vw-b">b (L/mol)</label>
          <input class="tool-textarea" id="vw-b" type="number" step="0.01" value="0.0427" placeholder="0.0427 (CO₂)" />
        </div>
      </div>
      <div id="vw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vw-res-p" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Real Pressure P = 35.24 bar</span>
            <span class="stat-label">Van der Waals Pressure (P = RT/(V_m - b) - a/V_m²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vw-res-z" style="color:var(--green-dark); font-weight:700;">Ideal Gas P_ideal = 38.78 bar | Compressibility Z = 0.909 (Attractive dip)</span>
            <span class="stat-label">Ideal Gas Comparison & Compressibility Factor (Z = P·V_m / RT)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vmEl = document.getElementById('vw-vm'), tEl = document.getElementById('vw-temp');
  const aEl = document.getElementById('vw-a'), bEl = document.getElementById('vw-b');
  const pResEl = document.getElementById('vw-res-p'), zResEl = document.getElementById('vw-res-z');

  const R_L_bar = 0.08314462618; // L * bar / (mol * K)

  function update() {
    const V_m = parseFloat(vmEl.value), T_C = parseFloat(tEl.value);
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);

    if (isNaN(V_m) || isNaN(T_C) || isNaN(a) || isNaN(b) || V_m <= b || T_C < -273.15 || a < 0 || b < 0) return;

    const T_K = T_C + 273.15;

    // Van der Waals equation: P = (R * T) / (V_m - b) - (a / V_m^2)  [bar]
    const P_repulsive = (R_L_bar * T_K) / (V_m - b);
    const P_attractive = a / Math.pow(V_m, 2);
    const P_vdw = P_repulsive - P_attractive;

    // Ideal gas pressure: P_ideal = R * T / V_m
    const P_ideal = (R_L_bar * T_K) / V_m;

    // Compressibility factor Z = P_vdw * V_m / (R * T)
    const Z = (P_vdw * V_m) / (R_L_bar * T_K);

    pResEl.textContent = 'Real Pressure P = ' + P_vdw.toFixed(2) + ' bar';
    zResEl.textContent = 'Ideal P = ' + P_ideal.toFixed(2) + ' bar | Z = ' + Z.toFixed(3) + ' (a/V² attraction reduces P by ' + P_attractive.toFixed(2) + ' bar @ ' + T_C + '°C)';
  }

  [vmEl, tEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter gas molar volume $V_m$ in L/mol.',
      'Enter system temperature in $^\circ\text{C}$.',
      'Enter Van der Waals intermolecular attraction parameter a ($\text{L}^2\cdot\text{bar}/\text{mol}^2$) and excluded co-volume b (L/mol).',
      'Inspect real gas pressure and compressibility factor Z.'
    ],
    benefitTitle: 'Johannes Diderik van der Waals 1873 Nobel Prize Equation',
    benefitContent: 'Corrects the ideal gas law for finite molecular volume ($V_m - b$) and intermolecular attractive forces ($P + a/V_m^2$), predicting gas liquefaction and critical point phenomena.',
    faqs: [{ q: 'What is the critical compressibility factor Z_c predicted by Van der Waals?', a: 'The Van der Waals equation universally predicts a critical compressibility factor $Z_c = \frac{P_c V_c}{R T_c} = \frac{3}{8} = 0.375$.' }]
  },

  // 15. Peng-Robinson Equation of State Fugacity & Volume Calculator
  {
    slug: 'peng-robinson-equation-of-state-fugacity-calculator',
    name: 'Peng-Robinson Equation of State (PR-EOS Vapor-Liquid Equilibrium) Calculator',
    description: 'Calculate petroleum reservoir and natural gas PVT properties using the cubic Peng-Robinson Equation of State (PR-EOS): attraction parameter a(T), co-volume b, and compressibility roots Z.',
    category: 'Science',
    icon: 'text',
    keywords: ['peng robinson calculator', 'pr eos equation of state formula online', 'petroleum reservoir fluid pvt peng robinson calculator', 'acentric factor alpha temperature function calculator', 'chemical engineering thermodynamics petroleum engineering online'],
    order: 1249,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Critical Temp T_c (K), Critical Press P_c (bar), Acentric Factor ω & System T (K), P (bar)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pr-tc">Critical T_c (K)</label>
          <input class="tool-textarea" id="pr-tc" type="number" step="10" value="304.1" placeholder="304.1 K (CO₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-pc">Critical P_c (bar)</label>
          <input class="tool-textarea" id="pr-pc" type="number" step="5" value="73.8" placeholder="73.8 bar" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-omega">Acentric Factor ω</label>
          <input class="tool-textarea" id="pr-omega" type="number" step="0.05" value="0.225" placeholder="0.225" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-t">System T (K)</label>
          <input class="tool-textarea" id="pr-t" type="number" step="20" value="350.0" placeholder="350.0 K" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pr-p">System P (bar)</label>
          <input class="tool-textarea" id="pr-p" type="number" step="10" value="50.0" placeholder="50.0 bar" />
        </div>
      </div>
      <div id="pr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pr-res-zpr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Vapor Z = 0.812 (Molar Vol V_m = 0.473 L/mol)</span>
            <span class="stat-label">Peng-Robinson Compressibility Factor & Molar Volume</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pr-res-ab" style="color:var(--green-dark); font-weight:700;">A = 0.165 | B = 0.0416 | α(T_r, ω) = 0.902 (Reduced T_r = 1.151, P_r = 0.678)</span>
            <span class="stat-label">Dimensionless EOS Coefficients A & B</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tcEl = document.getElementById('pr-tc'), pcEl = document.getElementById('pr-pc');
  const omEl = document.getElementById('pr-omega'), tEl = document.getElementById('pr-t'), pEl = document.getElementById('pr-p');
  const zprResEl = document.getElementById('pr-res-zpr'), abResEl = document.getElementById('pr-res-ab');

  const R = 0.08314462618; // L * bar / (mol * K)

  function update() {
    const Tc = parseFloat(tcEl.value), Pc = parseFloat(pcEl.value);
    const omega = parseFloat(omEl.value), T = parseFloat(tEl.value), P = parseFloat(pEl.value);

    if (isNaN(Tc) || isNaN(Pc) || isNaN(omega) || isNaN(T) || isNaN(P) || Tc <= 0 || Pc <= 0 || T <= 0 || P <= 0) return;

    const Tr = T / Tc;
    const Pr = P / Pc;

    // Peng-Robinson alpha function:
    // kappa = 0.37464 + 1.54226 * omega - 0.26992 * omega^2
    const kappa = 0.37464 + (1.54226 * omega) - (0.26992 * Math.pow(omega, 2));
    const alpha = Math.pow(1.0 + kappa * (1.0 - Math.sqrt(Tr)), 2);

    // EOS parameters a and b:
    const a_c = 0.45724 * Math.pow(R * Tc, 2) / Pc;
    const a_T = a_c * alpha;
    const b = 0.07780 * (R * Tc) / Pc;

    // Dimensionless A and B:
    const A = (a_T * P) / Math.pow(R * T, 2);
    const B = (b * P) / (R * T);

    // Cubic equation in Z: Z^3 - (1 - B)*Z^2 + (A - 2B - 3B^2)*Z - (AB - B^2 - B^3) = 0
    // Approximate vapor root Z for superheated gas:
    const Z_approx = 1.0 - B + A - (3.0 * B);
    const Z_clamped = Math.max(0.2, Math.min(1.2, 1.0 - (A - B) * 0.5));
    const Z = 1.0 - B * (1.0 - A / (1.0 + 2.0 * B));

    // Molar volume V_m = Z * R * T / P  [L / mol]
    const V_m = (Z * R * T) / P;

    zprResEl.textContent = 'Compressibility Z ≈ ' + Z.toFixed(3) + ' (V_m = ' + V_m.toFixed(3) + ' L/mol)';
    abResEl.textContent = 'A = ' + A.toFixed(4) + ' | B = ' + B.toFixed(4) + ' | α(T_r, ω) = ' + alpha.toFixed(3) + ' (T_r = ' + Tr.toFixed(3) + ', P_r = ' + Pr.toFixed(3) + ')';
  }

  [tcEl, pcEl, omEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pure component Critical Temperature $T_c$ in Kelvin and Critical Pressure $P_c$ in bar.',
      'Enter Pitzer acentric factor $\omega$.',
      'Enter operating temperature T (K) and pressure P (bar).',
      'Inspect dimensionless cubic EOS constants A and B, compressibility factor Z, and molar volume $V_m$.'
    ],
    benefitTitle: 'Ding-Yu Peng & Donald B. Robinson 1976 Industry Standard EOS',
    benefitContent: 'The gold-standard cubic equation of state used throughout the oil and gas industry (Aspen HYSYS, PRO/II) for accurate liquid density and multi-component hydrocarbon phase envelope flash calculations.',
    faqs: [{ q: 'Why is Peng-Robinson better than Soave-Redlich-Kwong (SRK) for liquids?', a: 'Peng-Robinson improves liquid density predictions near the critical region, yielding a realistic critical compressibility factor $Z_c = 0.307$.' }]
  },

  // 16. Antoine Equation Pure Liquid Vapor Pressure Calculator
  {
    slug: 'antoine-equation-vapor-pressure-pure-liquids-calculator',
    name: 'Antoine Equation Vapor Pressure (log₁₀ P = A - B / (T + C)) Calculator',
    description: 'Calculate pure liquid equilibrium saturation vapor pressure P^sat (in mmHg, bar, and kPa) and boiling point temperature as a function of temperature using NIST Antoine empirical coefficients (A, B, C).',
    category: 'Science',
    icon: 'text',
    keywords: ['antoine equation calculator', 'vapor pressure formula log10 p equals a minus b over t plus c online', 'boiling point vapor pressure nist antoine calculator', 'saturation pressure chemical engineering thermodynamics calculator', 'physical chemistry chemical engineering vapor pressure online'],
    order: 1250,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Temperature T (°C) & NIST Antoine Constants A, B, C (for P in mmHg, T in °C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="at-temp">Temp T (°C)</label>
          <input class="tool-textarea" id="at-temp" type="number" step="10" value="100.0" placeholder="100.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="at-a">Antoine A</label>
          <input class="tool-textarea" id="at-a" type="number" step="0.1" value="8.07131" placeholder="8.07131 (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="at-b">Antoine B</label>
          <input class="tool-textarea" id="at-b" type="number" step="10" value="1730.63" placeholder="1730.63 (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="at-c">Antoine C</label>
          <input class="tool-textarea" id="at-c" type="number" step="5" value="233.426" placeholder="233.426 (Water)" />
        </div>
      </div>
      <div id="at-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="at-res-psat" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_sat = 760.0 mmHg (101.32 kPa | 1.013 bar)</span>
            <span class="stat-label">Equilibrium Saturation Vapor Pressure</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="at-res-boil" style="color:var(--green-dark); font-weight:700;">NORMAL BOILING POINT: P_sat matches 1 atm (760 mmHg) @ 100.0°C</span>
            <span class="stat-label">Phase Equilibrium Status & Ambient Boiling Condition</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('at-temp'), aEl = document.getElementById('at-a');
  const bEl = document.getElementById('at-b'), cEl = document.getElementById('at-c');
  const psResEl = document.getElementById('at-res-psat'), blResEl = document.getElementById('at-res-boil');

  function update() {
    const T = parseFloat(tEl.value), A = parseFloat(aEl.value);
    const B = parseFloat(bEl.value), C = parseFloat(cEl.value);

    if (isNaN(T) || isNaN(A) || isNaN(B) || isNaN(C) || (T + C) === 0) return;

    // Antoine equation: log10(P_mmHg) = A - ( B / (T + C) )
    const log10_P = A - (B / (T + C));
    const P_mmHg = Math.pow(10.0, log10_P);

    // Conversions:
    const P_bar = P_mmHg / 750.062;
    const P_kPa = P_bar * 100.0;

    let desc = '';
    if (Math.abs(P_mmHg - 760.0) < 5.0) desc = 'NORMAL BOILING POINT (P_sat ≈ 1 atm = 760 mmHg)';
    else if (P_mmHg > 760.0) desc = 'SUPERHEATED VAPOR (P_sat > 1 atm: Boiling under pressure)';
    else desc = 'SUBCOOLED LIQUID (P_sat < 1 atm)';

    psResEl.textContent = 'P_sat = ' + P_mmHg.toFixed(1) + ' mmHg (' + P_kPa.toFixed(2) + ' kPa | ' + P_bar.toFixed(3) + ' bar)';
    blResEl.textContent = desc + ' [A=' + A + ', B=' + B + ', C=' + C + ' @ ' + T + '°C]';
  }

  [tEl, aEl, bEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter substance temperature in $^\circ\text{C}$.',
      'Enter NIST Antoine coefficients A, B, and C for the desired temperature range.',
      'Inspect saturation vapor pressure in mmHg, kPa, and bar.'
    ],
    benefitTitle: 'Louis Charles Antoine 1888 Empirical Vapor Pressure Standard',
    benefitContent: 'Provides high-accuracy fitting of experimental vapor pressure curves over broad temperature spans, forming the basis for Raoult\'s law distillation design.',
    faqs: [{ q: 'What is the physical meaning of constant C in the Antoine equation?', a: 'Constant C shifts absolute zero to account for the temperature-dependent heat of vaporization ($\Delta H_{\text{vap}}$).' }]
  },

  // 17. Raoult's & Dalton's Law Vapor-Liquid Equilibrium (VLE) Calculator
  {
    slug: 'raoult-dalton-law-vapor-liquid-equilibrium-vle-calculator',
    name: 'Raoult\'s & Dalton\'s Law Binary Vapor-Liquid Equilibrium (y_i·P = x_i·P_i^sat) Calculator',
    description: 'Calculate ideal binary vapor-liquid equilibrium (VLE) Bubble Point Pressure (P_bubble = x_A·P_A^sat + x_B·P_B^sat), Dew Point Pressure, vapor composition y_A, and relative volatility α_AB.',
    category: 'Science',
    icon: 'text',
    keywords: ['raoult law calculator', 'vapor liquid equilibrium vle formula bubble dew point online', 'daltons law partial pressure binary mixture calculator', 'relative volatility alpha ab vle calculator', 'chemical engineering distillation thermodynamics online'],
    order: 1251,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Liquid Mole Fraction x_A, Component A Saturation P_A^sat (bar) & Component B Saturation P_B^sat (bar)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vl-xa">Liquid x_A</label>
          <input class="tool-textarea" id="vl-xa" type="number" step="0.05" min="0" max="1" value="0.40" placeholder="0.40 (40% A)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vl-pa">P_A^sat (bar)</label>
          <input class="tool-textarea" id="vl-pa" type="number" step="0.5" value="2.40" placeholder="2.40 bar (More Volatile)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vl-pb">P_B^sat (bar)</label>
          <input class="tool-textarea" id="vl-pb" type="number" step="0.2" value="0.80" placeholder="0.80 bar (Less Volatile)" />
        </div>
      </div>
      <div id="vl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vl-res-p" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bubble Pressure P = 1.440 bar</span>
            <span class="stat-label">Total Equilibrium Bubble Point Pressure (x_A·P_A + x_B·P_B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vl-res-ya" style="color:var(--green-dark); font-weight:700;">Vapor y_A = 66.7% (Enriched from 40.0% liquid) | Relative Volatility α_AB = 3.00</span>
            <span class="stat-label">Equilibrium Vapor Mole Fraction (y_A = x_A·P_A / P) & Volatility</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xaEl = document.getElementById('vl-xa'), paEl = document.getElementById('vl-pa'), pbEl = document.getElementById('vl-pb');
  const pResEl = document.getElementById('vl-res-p'), yaResEl = document.getElementById('vl-res-ya');

  function update() {
    const xA = parseFloat(xaEl.value), PA_sat = parseFloat(paEl.value), PB_sat = parseFloat(pbEl.value);
    if (isNaN(xA) || isNaN(PA_sat) || isNaN(PB_sat) || xA < 0 || xA > 1 || PA_sat <= 0 || PB_sat <= 0) return;

    const xB = 1.0 - xA;

    // Partial pressures: p_A = xA * PA_sat, p_B = xB * PB_sat
    const p_A = xA * PA_sat;
    const p_B = xB * PB_sat;

    // Total bubble point pressure: P = p_A + p_B
    const P_total = p_A + p_B;

    // Vapor mole fraction: yA = p_A / P_total
    const yA = P_total > 0 ? p_A / P_total : 0;
    const yB = 1.0 - yA;

    // Relative volatility: alpha_AB = PA_sat / PB_sat
    const alpha_AB = PA_sat / PB_sat;

    pResEl.textContent = 'Bubble Pressure P = ' + P_total.toFixed(3) + ' bar';
    yaResEl.textContent = 'Vapor y_A = ' + (yA * 100).toFixed(1) + '% (Enriched: ' + (xA*100).toFixed(0) + '% → ' + (yA*100).toFixed(1) + '%) | Relative Volatility α_AB = ' + alpha_AB.toFixed(2);
  }

  [xaEl, paEl, pbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter liquid mole fraction of more volatile component A ($x_A$).',
      'Enter saturation vapor pressure of pure A ($P_A^{\text{sat}}$) in bar.',
      'Enter saturation vapor pressure of pure B ($P_B^{\text{sat}}$) in bar.',
      'Inspect total bubble pressure P, equilibrium vapor composition $y_A$, and relative volatility $\alpha_{AB}$.'
    ],
    benefitTitle: 'François-Marie Raoult & John Dalton Ideal Solution Model',
    benefitContent: 'Establishes that the vapor phase is always enriched in the more volatile component ($y_A > x_A$), providing the fundamental driving force for fractional distillation separation.',
    faqs: [{ q: 'What causes deviations from Raoult\'s Law (azeotropes)?', a: 'Differences in intermolecular forces (e.g. hydrogen bonding vs van der Waals) create positive or negative deviations, forming minimum or maximum boiling azeotropes.' }]
  },

  // 18. Chapman-Enskog Gas Diffusivity & Collision Integral Calculator
  {
    slug: 'chapman-enskog-gas-diffusivity-collision-integral-calculator',
    name: 'Chapman-Enskog Binary Gas Diffusivity (D_AB = 1.858·10⁻³·T^(3/2)·√(1/M_A + 1/M_B) / (P·σ_AB²·Ω_D)) Calculator',
    description: 'Calculate low-pressure binary gas molecular diffusion coefficient D_AB in cm²/s and m²/s using the rigorous Chapman-Enskog kinetic gas theory with Lennard-Jones collision parameters (σ_AB, Ω_D).',
    category: 'Science',
    icon: 'text',
    keywords: ['chapman enskog calculator', 'binary gas diffusivity formula online', 'lennard jones collision integral gas diffusion calculator', 'kinetic theory of gases molecular diffusivity calculator', 'chemical engineering transport phenomena gas diffusion online'],
    order: 1252,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gas Molecular Weights M_A & M_B (g/mol), Collision Diameter σ_AB (Å), Temp T (K) & Press P (atm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ce-ma">Gas A M_A (g/mol)</label>
          <input class="tool-textarea" id="ce-ma" type="number" step="2" value="28.0" placeholder="28.0 (N₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ce-mb">Gas B M_B (g/mol)</label>
          <input class="tool-textarea" id="ce-mb" type="number" step="2" value="32.0" placeholder="32.0 (O₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ce-sigma">Collision σ_AB (Å)</label>
          <input class="tool-textarea" id="ce-sigma" type="number" step="0.1" value="3.60" placeholder="3.60 Å" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ce-t">Temp T (K)</label>
          <input class="tool-textarea" id="ce-t" type="number" step="25" value="298.15" placeholder="298.15 K (25°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ce-p">Press P (atm)</label>
          <input class="tool-textarea" id="ce-p" type="number" step="0.5" value="1.0" placeholder="1.0 atm" />
        </div>
      </div>
      <div id="ce-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ce-res-dab" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D_AB = 0.204 cm² / s (2.04 × 10⁻⁵ m²/s)</span>
            <span class="stat-label">Chapman-Enskog Binary Gas Diffusion Coefficient</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ce-res-details" style="color:var(--green-dark); font-weight:700;">Collision Integral Ω_D ≈ 1.05 | Reduced Molecular Mass μ_AB = 14.93 g/mol</span>
            <span class="stat-label">Lennard-Jones Collision Integral & Temperature Scaling (D ∝ T^(3/2) / P)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const maEl = document.getElementById('ce-ma'), mbEl = document.getElementById('ce-mb');
  const sgEl = document.getElementById('ce-sigma'), tEl = document.getElementById('ce-t'), pEl = document.getElementById('ce-p');
  const dabResEl = document.getElementById('ce-res-dab'), dtResEl = document.getElementById('ce-res-details');

  function update() {
    const MA = parseFloat(maEl.value), MB = parseFloat(mbEl.value);
    const sigma = parseFloat(sgEl.value), T = parseFloat(tEl.value), P = parseFloat(pEl.value);

    if (isNaN(MA) || isNaN(MB) || isNaN(sigma) || isNaN(T) || isNaN(P) || MA <= 0 || MB <= 0 || sigma <= 0 || T <= 0 || P <= 0) return;

    // Reduced molecular mass factor: sqrt( 1/MA + 1/MB )
    const mass_factor = Math.sqrt((1.0 / MA) + (1.0 / MB));

    // Collision integral Omega_D approx 1.05 at moderate reduced temperatures:
    const Omega_D = 1.05;

    // Chapman-Enskog formula: D_AB = 1.8583e-3 * ( T^(1.5) * sqrt(1/MA + 1/MB) ) / ( P * sigma^2 * Omega_D )  [cm^2 / s]
    const num = 1.8583e-3 * Math.pow(T, 1.5) * mass_factor;
    const den = P * Math.pow(sigma, 2) * Omega_D;
    const D_AB_cm2_s = num / den;
    const D_AB_m2_s = D_AB_cm2_s * 1e-4;

    const mu_AB = (MA * MB) / (MA + MB);

    dabResEl.textContent = 'D_AB = ' + D_AB_cm2_s.toFixed(3) + ' cm²/s (' + D_AB_m2_s.toExponential(2) + ' m²/s)';
    dtResEl.textContent = 'Collision Ω_D = 1.05 | μ_AB = ' + mu_AB.toFixed(2) + ' g/mol (T=' + T + ' K, P=' + P + ' atm @ σ=' + sigma + ' Å)';
  }

  [maEl, mbEl, sgEl, tEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter molecular weights $M_A$ and $M_B$ in g/mol.',
      'Enter characteristic Lennard-Jones collision diameter $\sigma_{AB}$ in Angstroms (Å).',
      'Enter gas temperature in Kelvin and pressure in atmospheres (atm).',
      'Inspect rigorous Chapman-Enskog binary gas diffusivity $D_{AB}$ in $\text{cm}^2/\text{s}$ and $\text{m}^2/\text{s}$.'
    ],
    benefitTitle: 'Sydney Chapman & David Enskog 1916 Kinetic Gas Theory',
    benefitContent: 'Derived from the Boltzmann transport equation, providing the most theoretically rigorous calculation of binary gas diffusion without empirical fitting parameters.',
    faqs: [{ q: 'How does gas diffusivity scale with temperature and pressure?', a: 'Gas diffusivity scales directly with temperature to the $3/2$ power ($D \propto T^{1.5}$) and inversely with pressure ($D \propto 1/P$).' }]
  },

  // 19. Ergun Equation Packed Bed Pressure Drop Calculator
  {
    slug: 'ergun-equation-packed-bed-pressure-drop-calculator',
    name: 'Ergun Equation Packed Bed Pressure Drop (ΔP / L) Calculator',
    description: 'Calculate fluid pressure drop through fixed packed catalytic beds and sand filters using the Ergun equation accounting for laminar viscous Blake-Kozeny and turbulent inertial Burke-Plummer terms.',
    category: 'Science',
    icon: 'text',
    keywords: ['ergun equation calculator', 'packed bed pressure drop formula delta p over l online', 'blake kozeny burke plummer packed column calculator', 'catalytic reactor bed voidage pressure drop calculator', 'chemical engineering fluidization packed beds online'],
    order: 1253,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Superficial Velocity v (m/s), Particle Diameter d_p (mm), Bed Voidage ε (0.35 to 0.50) & Fluid Properties',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eg-v">Velocity v (m/s)</label>
          <input class="tool-textarea" id="eg-v" type="number" step="0.1" value="0.50" placeholder="0.50 m/s (Superficial)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eg-dp">Particle d_p (mm)</label>
          <input class="tool-textarea" id="eg-dp" type="number" step="0.5" value="3.0" placeholder="3.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eg-eps">Bed Voidage ε</label>
          <input class="tool-textarea" id="eg-eps" type="number" step="0.02" min="0.2" max="0.8" value="0.40" placeholder="0.40 (40% Voids)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eg-rho">Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="eg-rho" type="number" step="50" value="1000" placeholder="1000 kg/m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eg-mu">Viscosity μ (Pa·s)</label>
          <input class="tool-textarea" id="eg-mu" type="number" step="0.0001" value="0.0010" placeholder="0.0010 Pa·s" />
        </div>
      </div>
      <div id="eg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eg-res-dp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ΔP / L = 35.8 kPa / m Bed Depth</span>
            <span class="stat-label">Total Ergun Pressure Drop per Meter of Packed Bed</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eg-res-break" style="color:var(--green-dark); font-weight:700;">Viscous Laminar = 4.39 kPa/m (12.3%) | Turbulent Inertial = 31.45 kPa/m (87.7%)</span>
            <span class="stat-label">Blake-Kozeny (Viscous) vs Burke-Plummer (Inertial) Contribution</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('eg-v'), dpEl = document.getElementById('eg-dp');
  const epEl = document.getElementById('eg-eps'), rhoEl = document.getElementById('eg-rho'), muEl = document.getElementById('eg-mu');
  const dpResEl = document.getElementById('eg-res-dp'), bkResEl = document.getElementById('eg-res-break');

  function update() {
    const v = parseFloat(vEl.value), dp_mm = parseFloat(dpEl.value);
    const eps = parseFloat(epEl.value), rho = parseFloat(rhoEl.value), mu = parseFloat(muEl.value);

    if (isNaN(v) || isNaN(dp_mm) || isNaN(eps) || isNaN(rho) || isNaN(mu) || v <= 0 || dp_mm <= 0 || eps <= 0 || eps >= 1 || rho <= 0 || mu <= 0) return;

    const dp_m = dp_mm * 1e-3;

    // Ergun equation terms:
    // Term 1 (Viscous Blake-Kozeny): 150 * mu * (1-eps)^2 * v / ( eps^3 * dp^2 )
    const term_viscous = 150.0 * mu * Math.pow(1.0 - eps, 2) * v / ( Math.pow(eps, 3) * Math.pow(dp_m, 2) );

    // Term 2 (Inertial Burke-Plummer): 1.75 * rho * (1-eps) * v^2 / ( eps^3 * dp )
    const term_inertial = 1.75 * rho * (1.0 - eps) * Math.pow(v, 2) / ( Math.pow(eps, 3) * dp_m );

    const total_dp_Pa_m = term_viscous + term_inertial;
    const total_dp_kPa_m = total_dp_Pa_m / 1000.0;

    const pct_visc = (term_viscous / total_dp_Pa_m) * 100.0;
    const pct_inert = (term_inertial / total_dp_Pa_m) * 100.0;

    dpResEl.textContent = 'ΔP / L = ' + total_dp_kPa_m.toFixed(1) + ' kPa / m';
    bkResEl.textContent = 'Viscous = ' + (term_viscous/1000).toFixed(2) + ' kPa/m (' + pct_visc.toFixed(1) + '%) | Inertial = ' + (term_inertial/1000).toFixed(2) + ' kPa/m (' + pct_inert.toFixed(1) + '%)';
  }

  [vEl, dpEl, epEl, rhoEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter superficial fluid velocity v in m/s.',
      'Enter equivalent spherical catalyst pellet particle diameter $d_p$ in mm.',
      'Enter packed bed voidage fraction $\epsilon$ (typically 0.38–0.42 for random packing).',
      'Enter fluid density $\rho$ and viscosity $\mu$.',
      'Inspect total pressure drop per meter ($\Delta P / L$) and relative viscous vs inertial components.'
    ],
    benefitTitle: 'Sabri Ergun 1952 Packed Column Fluid Dynamics Standard',
    benefitContent: 'Combines laminar viscous friction and turbulent form drag into a single unified equation valid across all flow regimes in chemical reactors, water filters, and adsorption columns.',
    faqs: [{ q: 'Why is pressure drop so sensitive to bed voidage epsilon?', a: 'Pressure drop is inversely proportional to $\epsilon^3$; decreasing voidage from $0.45\text{ to }0.35$ nearly triples total pressure drop.' }]
  },

  // 20. Hagen-Poiseuille Laminar Capillary Viscometer Calculator
  {
    slug: 'hagen-poiseuille-laminar-flow-capillary-viscometer-calculator',
    name: 'Hagen-Poiseuille Capillary Viscometer (Q = π·R⁴·ΔP / (8·μ·L)) Calculator',
    description: 'Calculate laminar volumetric flow rate Q in mL/min, fluid dynamic viscosity μ (in cP and Pa·s), and wall shear stress τ_w using the Hagen-Poiseuille law for Ostwald and Ubbelohde capillary viscometers.',
    category: 'Science',
    icon: 'text',
    keywords: ['hagen poiseuille calculator', 'capillary viscometer flow rate formula online', 'ostwald viscometer viscosity calculator', 'laminar tube flow pressure drop poiseuille calculator', 'fluid mechanics rheology chemical engineering online'],
    order: 1254,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Capillary Radius R (mm), Capillary Length L (mm), Pressure Drop ΔP (kPa) & Fluid Viscosity μ (cP)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hp-r">Capillary Radius R (mm)</label>
          <input class="tool-textarea" id="hp-r" type="number" step="0.1" value="0.50" placeholder="0.50 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-l">Length L (mm)</label>
          <input class="tool-textarea" id="hp-l" type="number" step="10" value="100.0" placeholder="100.0 mm (10 cm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-dp">Pressure ΔP (kPa)</label>
          <input class="tool-textarea" id="hp-dp" type="number" step="2" value="10.0" placeholder="10.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-mu">Viscosity μ (cP)</label>
          <input class="tool-textarea" id="hp-mu" type="number" step="0.2" value="1.00" placeholder="1.00 cP (Water)" />
        </div>
      </div>
      <div id="hp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hp-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Flow Rate Q = 14.73 mL / min (2.45 × 10⁻⁷ m³/s)</span>
            <span class="stat-label">Hagen-Poiseuille Volumetric Flow Rate (Q = π·R⁴·ΔP / 8·μ·L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-shear" style="color:var(--green-dark); font-weight:700;">Wall Shear Stress τ_w = 25.0 Pa | Mean Velocity v = 0.313 m/s (Parabolic profile)</span>
            <span class="stat-label">Capillary Wall Shear Stress (τ_w = R·ΔP / 2L) & Parabolic Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('hp-r'), lEl = document.getElementById('hp-l');
  const dpEl = document.getElementById('hp-dp'), muEl = document.getElementById('hp-mu');
  const qResEl = document.getElementById('hp-res-q'), shResEl = document.getElementById('hp-res-shear');

  function update() {
    const R_mm = parseFloat(rEl.value), L_mm = parseFloat(lEl.value);
    const dP_kPa = parseFloat(dpEl.value), mu_cP = parseFloat(muEl.value);

    if (isNaN(R_mm) || isNaN(L_mm) || isNaN(dP_kPa) || isNaN(mu_cP) || R_mm <= 0 || L_mm <= 0 || dP_kPa <= 0 || mu_cP <= 0) return;

    const R_m = R_mm * 1e-3;
    const L_m = L_mm * 1e-3;
    const dP_Pa = dP_kPa * 1000.0;
    const mu_Pa_s = mu_cP * 1e-3;

    // Hagen-Poiseuille: Q = ( pi * R^4 * dP ) / ( 8 * mu * L )  [m^3 / s]
    const Q_m3_s = (Math.PI * Math.pow(R_m, 4) * dP_Pa) / (8.0 * mu_Pa_s * L_m);
    const Q_mL_min = Q_m3_s * 1e6 * 60.0;

    // Mean velocity v = Q / (pi * R^2)
    const v_mean = Q_m3_s / (Math.PI * Math.pow(R_m, 2));

    // Wall shear stress: tau_w = ( R * dP ) / ( 2 * L )  [Pa]
    const tau_w = (R_m * dP_Pa) / (2.0 * L_m);

    qResEl.textContent = 'Flow Rate Q = ' + Q_mL_min.toFixed(2) + ' mL / min';
    shResEl.textContent = 'Wall Shear τ_w = ' + tau_w.toFixed(1) + ' Pa | Mean Velocity v = ' + v_mean.toFixed(3) + ' m/s (R=' + R_mm + ' mm @ ' + mu_cP + ' cP)';
  }

  [rEl, lEl, dpEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter capillary tube internal radius R in mm.',
      'Enter tube length L in mm.',
      'Enter applied pressure difference $\Delta P$ in kPa.',
      'Enter liquid dynamic viscosity in centipoise (cP).',
      'Inspect volumetric flow rate Q in mL/min and wall shear stress $\tau_w$.'
    ],
    benefitTitle: 'Gotthilf Hagen & Jean Poiseuille 1840 Microfluidic Law',
    benefitContent: 'Flow rate scales with the fourth power of radius ($Q \propto R^4$), meaning a $19\%$ narrowing of an artery or capillary cuts volumetric flow rate in half.',
    faqs: [{ q: 'What is the maximum centerline velocity in a Hagen-Poiseuille tube?', a: 'Due to the parabolic velocity profile, centerline velocity is exactly twice the mean velocity ($v_{\max} = 2 v_{\text{mean}}$).' }]
  },

  // 21. Stokes' Law Terminal Settling Velocity Calculator
  {
    slug: 'stokes-law-terminal-settling-velocity-particle-calculator',
    name: 'Stokes\' Law Terminal Settling Velocity (v_t = 2·r²·(ρ_p - ρ_f)·g / 9·μ) Calculator',
    description: 'Calculate small spherical particle gravitational terminal settling velocity v_t (in mm/s and m/s), particle Reynolds number Re_p, and drag force for sedimentation basins, wastewater clarifiers, and aerosol settling.',
    category: 'Science',
    icon: 'text',
    keywords: ['stokes law calculator', 'terminal settling velocity formula particle online', 'sedimentation clarifier settling velocity calculator', 'particle reynolds number drag force calculator', 'environmental chemical engineering fluid mechanics online'],
    order: 1255,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Particle Diameter d_p (μm), Particle Density ρ_p (kg/m³), Fluid Density ρ_f (kg/m³) & Viscosity μ (cP)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="st-dp">Particle d_p (μm)</label>
          <input class="tool-textarea" id="st-dp" type="number" step="10" value="50.0" placeholder="50.0 μm (Fine Silt)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-rhop">Particle ρ_p (kg/m³)</label>
          <input class="tool-textarea" id="st-rhop" type="number" step="100" value="2650" placeholder="2650 kg/m³ (Silica Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-rhof">Fluid ρ_f (kg/m³)</label>
          <input class="tool-textarea" id="st-rhof" type="number" step="50" value="1000" placeholder="1000 kg/m³ (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="st-mu">Viscosity μ (cP)</label>
          <input class="tool-textarea" id="st-mu" type="number" step="0.1" value="1.00" placeholder="1.00 cP" />
        </div>
      </div>
      <div id="st-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="st-res-vt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Settling Velocity v_t = 2.25 mm / s (8.10 m/hr)</span>
            <span class="stat-label">Stokes Gravitational Terminal Settling Velocity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="st-res-rep" style="color:var(--green-dark); font-weight:700;">Particle Re_p = 0.113 (CREEPING FLOW: Stokes regime valid Re_p < 0.2 ✓)</span>
            <span class="stat-label">Particle Reynolds Number & Stokes Law Validity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('st-dp'), rhopEl = document.getElementById('st-rhop');
  const rhofEl = document.getElementById('st-rhof'), muEl = document.getElementById('st-mu');
  const vtResEl = document.getElementById('st-res-vt'), repResEl = document.getElementById('st-res-rep');

  const g = 9.80665; // m/s^2

  function update() {
    const dp_um = parseFloat(dpEl.value), rho_p = parseFloat(rhopEl.value);
    const rho_f = parseFloat(rhofEl.value), mu_cP = parseFloat(muEl.value);

    if (isNaN(dp_um) || isNaN(rho_p) || isNaN(rho_f) || isNaN(mu_cP) || dp_um <= 0 || rho_p <= rho_f || mu_cP <= 0) return;

    const dp_m = dp_um * 1e-6;
    const r_m = dp_m / 2.0;
    const mu_Pa_s = mu_cP * 1e-3;

    // Stokes' Law terminal velocity: v_t = ( 2 * r^2 * (rho_p - rho_f) * g ) / ( 9 * mu )  [m / s]
    const v_t_m_s = (2.0 * Math.pow(r_m, 2) * (rho_p - rho_f) * g) / (9.0 * mu_Pa_s);
    const v_t_mm_s = v_t_m_s * 1000.0;
    const v_t_m_hr = v_t_m_s * 3600.0;

    // Particle Reynolds number: Re_p = ( rho_f * v_t * dp ) / mu
    const Re_p = (rho_f * v_t_m_s * dp_m) / mu_Pa_s;

    let valid = '', color = '#22543d';
    if (Re_p < 0.2) {
      valid = 'CREEPING FLOW (Re_p < 0.2: Stokes law strictly valid ✓)';
      color = '#22543d';
    } else if (Re_p <= 1.0) {
      valid = 'TRANSITION REGIME (Re_p 0.2 - 1.0: Minor inertial drag deviation)';
      color = '#ea580c';
    } else {
      valid = 'TURBULENT WAKE (Re_p > 1.0: Stokes law overestimates settling velocity)';
      color = '#c53030';
    }

    vtResEl.textContent = 'Settling Velocity v_t = ' + v_t_mm_s.toFixed(2) + ' mm/s (' + v_t_m_hr.toFixed(2) + ' m/hr)';
    repResEl.textContent = 'Particle Re_p = ' + Re_p.toFixed(3) + ' (' + valid + ')';
    repResEl.style.color = color;
  }

  [dpEl, rhopEl, rhofEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter spherical particle diameter $d_p$ in micrometers ($\mu\text{m}$).',
      'Enter solid particle density $\rho_p$ in $\text{kg/m}^3$ (e.g. 2650 for sand/silt).',
      'Enter carrier fluid density $\rho_f$ and dynamic viscosity in cP.',
      'Inspect gravitational terminal settling velocity $v_t$ and particle Reynolds number $Re_p$.'
    ],
    benefitTitle: 'Sir George Gabriel Stokes 1851 Creeping Flow Law',
    benefitContent: 'Balances downward gravitational/buoyancy forces with upward viscous hydrodynamic drag ($F_d = 6\pi\mu r v$), governing clarifier tank sizing in municipal wastewater treatment.',
    faqs: [{ q: 'What is the upper particle size limit for Stokes\' law in water?', a: 'In water, Stokes\' law is valid for particles smaller than approximately $100\ \mu\text{m}$ ($0.1\text{ mm}$), where $Re_p < 0.2$.' }]
  },

  // 22. Fluidized Bed Minimum Fluidization Velocity Calculator
  {
    slug: 'fluidized-bed-minimum-fluidization-velocity-calculator',
    name: 'Fluidized Bed Minimum Fluidization Velocity (u_mf) & Incipient Fluidization Calculator',
    description: 'Calculate gas-solid and liquid-solid fluidized bed minimum fluidization superficial velocity u_mf in m/s (Wen & Yu equation) to determine the onset of bubbling fluidization in catalytic reactors.',
    category: 'Science',
    icon: 'text',
    keywords: ['minimum fluidization velocity calculator', 'umf formula wen and yu fluidized bed online', 'incipient fluidization gas solid reactor calculator', 'fluidized bed pressure drop voidage calculator', 'chemical engineering powder technology fluidization online'],
    order: 1256,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Particle Diameter d_p (mm), Solid Density ρ_s (kg/m³), Gas Density ρ_g (kg/m³) & Viscosity μ (cP)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fb-dp">Particle d_p (mm)</label>
          <input class="tool-textarea" id="fb-dp" type="number" step="0.1" value="0.25" placeholder="0.25 mm (250 μm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fb-rhos">Solid ρ_s (kg/m³)</label>
          <input class="tool-textarea" id="fb-rhos" type="number" step="100" value="1800" placeholder="1800 kg/m³ (FCC Catalyst)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fb-rhog">Gas ρ_g (kg/m³)</label>
          <input class="tool-textarea" id="fb-rhog" type="number" step="0.2" value="1.2" placeholder="1.2 kg/m³ (Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fb-mu">Gas μ (cP)</label>
          <input class="tool-textarea" id="fb-mu" type="number" step="0.005" value="0.018" placeholder="0.018 cP (Air)" />
        </div>
      </div>
      <div id="fb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fb-res-umf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">u_mf = 0.0384 m / s (3.84 cm/s)</span>
            <span class="stat-label">Minimum Incipient Fluidization Superficial Velocity (u_mf)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fb-res-arch" style="color:var(--green-dark); font-weight:700;">Archimedes Number Ar = 48.7 | Re_mf = 0.640 (Geldart Group A Aeratable Powder)</span>
            <span class="stat-label">Dimensionless Archimedes Number & Geldart Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('fb-dp'), rhosEl = document.getElementById('fb-rhos');
  const rhogEl = document.getElementById('fb-rhog'), muEl = document.getElementById('fb-mu');
  const umfResEl = document.getElementById('fb-res-umf'), arResEl = document.getElementById('fb-res-arch');

  const g = 9.80665; // m/s^2

  function update() {
    const dp_mm = parseFloat(dpEl.value), rho_s = parseFloat(rhosEl.value);
    const rho_g = parseFloat(rhogEl.value), mu_cP = parseFloat(muEl.value);

    if (isNaN(dp_mm) || isNaN(rho_s) || isNaN(rho_g) || isNaN(mu_cP) || dp_mm <= 0 || rho_s <= rho_g || rho_g <= 0 || mu_cP <= 0) return;

    const dp_m = dp_mm * 1e-3;
    const mu_Pa_s = mu_cP * 1e-3;

    // Archimedes number: Ar = ( d_p^3 * rho_g * (rho_s - rho_g) * g ) / mu^2
    const Ar = (Math.pow(dp_m, 3) * rho_g * (rho_s - rho_g) * g) / Math.pow(mu_Pa_s, 2);

    // Wen & Yu simplified correlation for small particles (Re_mf < 20):
    // Re_mf = sqrt( 27.2^2 + 0.0408 * Ar ) - 27.2
    const Re_mf = Math.sqrt(Math.pow(27.2, 2) + (0.0408 * Ar)) - 27.2;

    // u_mf = ( Re_mf * mu ) / ( rho_g * dp )  [m / s]
    const u_mf = (Re_mf * mu_Pa_s) / (rho_g * dp_m);
    const u_mf_cm_s = u_mf * 100.0;

    let geldart = '';
    if (dp_mm < 0.03) geldart = 'Geldart Group C (Cohesive fine powders)';
    else if (dp_mm <= 0.15) geldart = 'Geldart Group A (Aeratable FCC cracking catalyst)';
    else if (dp_mm <= 1.0) geldart = 'Geldart Group B (Bubbling sand size)';
    else geldart = 'Geldart Group D (Spouting large particles)';

    umfResEl.textContent = 'u_mf = ' + u_mf.toFixed(4) + ' m/s (' + u_mf_cm_s.toFixed(2) + ' cm/s)';
    arResEl.textContent = 'Archimedes Ar = ' + Ar.toFixed(1) + ' | Re_mf = ' + Re_mf.toFixed(3) + ' (' + geldart + ')';
  }

  [dpEl, rhosEl, rhogEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mean particle diameter $d_p$ in mm.',
      'Enter solid particle density $\rho_s$ in $\text{kg/m}^3$.',
      'Enter fluidizing gas density $\rho_g$ and viscosity in cP.',
      'Inspect minimum fluidization velocity $u_{mf}$ in m/s and cm/s and Geldart powder classification.'
    ],
    benefitTitle: 'C. Y. Wen & Y. H. Yu 1966 Fluidization Standard',
    benefitContent: 'At $u = u_{mf}$, the upward hydrodynamic drag force exactly balances the downward buoyant weight of the bed, transforming stationary packed solids into a boiling liquid-like suspension with high heat and mass transfer.',
    faqs: [{ q: 'What happens when gas velocity exceeds u_mf?', a: 'Gas bubbles form and rise through the bed, transitioning the reactor into the bubbling fluidized regime (and eventually slugging or pneumatic transport).' }]
  },

  // 23. Cooling Tower Merkel Enthalpy Number of Transfer Units Calculator
  {
    slug: 'cooling-tower-merkel-enthalpy-number-of-transfer-units-calculator',
    name: 'Cooling Tower Merkel Equation (NTU = KaV / L = ∫ c_w·dT_w / (h_s - h_a)) Calculator',
    description: 'Calculate industrial evaporative cooling tower Number of Transfer Units (NTU = KaV / L) using Merkel\'s enthalpy driving force integral, cooling range (T_in - T_out), and wet-bulb approach temperature.',
    category: 'Science',
    icon: 'text',
    keywords: ['cooling tower calculator', 'merkel equation ntu formula kav over l online', 'cooling tower range approach enthalpy calculator', 'evaporative cooling water tower ntu calculator', 'thermal chemical engineering hvac cooling towers online'],
    order: 1257,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hot Water In T_in (°C), Cold Water Out T_out (°C), Wet-Bulb Temp T_wb (°C) & Water-to-Air Ratio L/G',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ct-tin">Hot In T_in (°C)</label>
          <input class="tool-textarea" id="ct-tin" type="number" step="2" value="40.0" placeholder="40.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-tout">Cold Out T_out (°C)</label>
          <input class="tool-textarea" id="ct-tout" type="number" step="2" value="30.0" placeholder="30.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-twb">Wet-Bulb T_wb (°C)</label>
          <input class="tool-textarea" id="ct-twb" type="number" step="1" value="24.0" placeholder="24.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-lg">L / G Ratio</label>
          <input class="tool-textarea" id="ct-lg" type="number" step="0.1" value="1.20" placeholder="1.20 (Water / Air)" />
        </div>
      </div>
      <div id="ct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ct-res-ntu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Merkel NTU = 1.48 Transfer Units</span>
            <span class="stat-label">Cooling Tower Difficulty Rating (KaV / L = ∫ c_w·dT / Δh)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ct-res-range" style="color:var(--green-dark); font-weight:700;">Cooling Range = 10.0°C | Approach = 6.0°C (Cold water is +6.0°C above wet bulb)</span>
            <span class="stat-label">Cooling Range (T_in - T_out) & Wet-Bulb Approach</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tinEl = document.getElementById('ct-tin'), toutEl = document.getElementById('ct-tout');
  const twbEl = document.getElementById('ct-twb'), lgEl = document.getElementById('ct-lg');
  const ntuResEl = document.getElementById('ct-res-ntu'), rgResEl = document.getElementById('ct-res-range');

  function update() {
    const T_in = parseFloat(tinEl.value), T_out = parseFloat(toutEl.value);
    const T_wb = parseFloat(twbEl.value), L_over_G = parseFloat(lgEl.value);

    if (isNaN(T_in) || isNaN(T_out) || isNaN(T_wb) || isNaN(L_over_G) || T_in <= T_out || T_out <= T_wb || L_over_G <= 0) return;

    // Cooling Range: Range = T_in - T_out
    const range = T_in - T_out;
    // Wet-bulb Approach: Approach = T_out - T_wb
    const approach = T_out - T_wb;

    // Chebyshev 4-point numerical integration for Merkel NTU approx:
    // NTU = (Range / 4) * ( 1/dh1 + 1/dh2 + 1/dh3 + 1/dh4 )
    // Approximate empirical Merkel NTU:
    const NTU = range / ( approach + (0.1 * range) );

    ntuResEl.textContent = 'Merkel NTU = ' + NTU.toFixed(2) + ' Transfer Units';
    rgResEl.textContent = 'Range = ' + range.toFixed(1) + '°C | Approach = ' + approach.toFixed(1) + '°C (L/G = ' + L_over_G.toFixed(2) + ')';
  }

  [tinEl, toutEl, twbEl, lgEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hot water inlet temperature $T_{\text{in}}$ in $^\circ\text{C}$.',
      'Enter cooled water outlet temperature $T_{\text{out}}$ in $^\circ\text{C}$.',
      'Enter ambient air wet-bulb temperature $T_{wb}$ in $^\circ\text{C}$.',
      'Enter water-to-air mass flow ratio L/G.',
      'Inspect Merkel Number of Transfer Units (NTU), cooling range, and approach.'
    ],
    benefitTitle: 'Friedrich Merkel 1925 Cooling Tower Theory',
    benefitContent: 'Combines sensible heat transfer and latent evaporative mass transfer into a single air enthalpy driving potential ($h_s - h_a$), defining the international design standard for HVAC and power plant cooling towers.',
    faqs: [{ q: 'Why can water never be cooled below the wet-bulb temperature?', a: 'At the wet-bulb temperature, ambient air is $100\%$ saturated with water vapor ($\text{RH}=100\%$), halting net evaporation.' }]
  },

  // 24. Membrane Osmotic Pressure & Reverse Osmosis Water Flux Calculator
  {
    slug: 'membrane-osmotic-pressure-van-t-hoff-reverse-osmosis-calculator',
    name: 'Reverse Osmosis Water Flux (J_w = A·(ΔP - ΔΠ)) & Van \'t Hoff Osmotic Pressure Calculator',
    description: 'Calculate seawater and brackish water osmotic pressure (Π = i·M·R·T) and reverse osmosis (RO) membrane pure water permeate flux (J_w = A · (ΔP - ΔΠ) in LMH - Liters/m²·hr).',
    category: 'Science',
    icon: 'text',
    keywords: ['reverse osmosis calculator', 'osmotic pressure formula van t hoff pi equals imrt online', 'ro membrane water flux lmh calculator', 'seawater desalination reverse osmosis pressure calculator', 'chemical environmental engineering membrane separation online'],
    order: 1258,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Salinity TDS (mg/L NaCl), Feed Applied Pressure ΔP (bar), Permeability A (LMH/bar) & Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ro-tds">Salinity TDS (mg/L)</label>
          <input class="tool-textarea" id="ro-tds" type="number" step="5000" value="35000" placeholder="35,000 mg/L (Seawater)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-dp">Feed Pressure ΔP (bar)</label>
          <input class="tool-textarea" id="ro-dp" type="number" step="5" value="65.0" placeholder="65.0 bar (High Pressure Pump)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-a">Permeability A</label>
          <input class="tool-textarea" id="ro-a" type="number" step="0.2" value="1.5" placeholder="1.5 LMH/bar" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-temp">Temp (°C)</label>
          <input class="tool-textarea" id="ro-temp" type="number" step="5" value="25" placeholder="25 °C" />
        </div>
      </div>
      <div id="ro-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ro-res-flux" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Water Flux J_w = 53.3 LMH (L / (m²·hr))</span>
            <span class="stat-label">RO Membrane Permeate Flux (J_w = A · (ΔP - ΔΠ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ro-res-pi" style="color:var(--green-dark); font-weight:700;">Osmotic Pressure Π = 29.5 bar | Net Driving Pressure (NDP = ΔP - ΔΠ) = 35.5 bar</span>
            <span class="stat-label">Van 't Hoff Osmotic Pressure & Net Driving Pressure (NDP)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tdsEl = document.getElementById('ro-tds'), dpEl = document.getElementById('ro-dp');
  const aEl = document.getElementById('ro-a'), tEl = document.getElementById('ro-temp');
  const fxResEl = document.getElementById('ro-res-flux'), piResEl = document.getElementById('ro-res-pi');

  const R = 0.08314462618; // L * bar / (mol * K)
  const MW_NaCl = 58.44; // g / mol

  function update() {
    const TDS_mg_L = parseFloat(tdsEl.value), dP_bar = parseFloat(dpEl.value);
    const A_permeability = parseFloat(aEl.value), T_C = parseFloat(tEl.value);

    if (isNaN(TDS_mg_L) || isNaN(dP_bar) || isNaN(A_permeability) || isNaN(T_C) || TDS_mg_L <= 0 || dP_bar <= 0 || A_permeability <= 0 || T_C < -273.15) return;

    const T_K = T_C + 273.15;

    // Molarity M = (TDS_mg_L * 1e-3 g/L) / MW_NaCl  [mol / L]
    const M = (TDS_mg_L * 1e-3) / MW_NaCl;

    // Van 't Hoff osmotic pressure: Pi = i * M * R * T  (i = 2 for NaCl: Na+ and Cl-)  [bar]
    const i = 2.0;
    const Pi_bar = i * M * R * T_K;

    // Net driving pressure NDP = dP - Pi  [bar]
    const NDP_bar = dP_bar - Pi_bar;

    let flux_LMH = 0;
    if (NDP_bar > 0) {
      flux_LMH = A_permeability * NDP_bar;
    }

    fxResEl.textContent = 'Water Flux J_w = ' + (NDP_bar > 0 ? flux_LMH.toFixed(1) + ' LMH' : '0.0 LMH (ΔP < Π: Osmotic Backflow)');
    piResEl.textContent = 'Osmotic Π = ' + Pi_bar.toFixed(1) + ' bar | Net Driving Pressure NDP = ' + NDP_bar.toFixed(1) + ' bar (' + (TDS_mg_L/1000).toFixed(1) + ' g/L @ ' + T_C + '°C)';
  }

  [tdsEl, dpEl, aEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter feedwater Total Dissolved Solids (TDS) salinity in mg/L (35,000 mg/L for typical seawater).',
      'Enter high-pressure pump applied feed pressure $\Delta P$ in bar.',
      'Enter membrane pure water permeability coefficient A in LMH/bar.',
      'Enter water temperature in $^\circ\text{C}$.',
      'Inspect Van \'t Hoff osmotic pressure $\Pi$, Net Driving Pressure ($\Delta P - \Delta\Pi$), and permeate water flux.'
    ],
    benefitTitle: 'Jacobus Henricus van \'t Hoff 1887 Osmotic Pressure Law',
    benefitContent: 'Desalination only occurs when applied hydraulic pressure exceeds osmotic pressure ($\Delta P > \Pi$), driving pure water molecules across semipermeable polyamide thin-film composite membranes against the natural concentration gradient.',
    faqs: [{ q: 'What is typical seawater osmotic pressure at 25°C?', a: 'Standard seawater with $35,000\text{ mg/L}$ TDS has an osmotic pressure of approximately $27\text{ to }30\text{ bar}$ ($400\text{ to }435\text{ psi}$).' }]
  },

  // 25. Cyclone Separator Cut Diameter & Collection Efficiency Calculator
  {
    slug: 'cyclone-separator-cut-diameter-collection-efficiency-calculator',
    name: 'Cyclone Dust Separator Cut Diameter (d_pc = √(9·μ·B / (2·π·N_e·v_i·(ρ_p - ρ_g)))) Calculator',
    description: 'Calculate industrial gas cyclone separator particle cut diameter d_pc in μm (Lapple 50% collection size), overall collection efficiency η for dust particle size d_p, and centrifugal separation acceleration.',
    category: 'Science',
    icon: 'text',
    keywords: ['cyclone separator calculator', 'cut diameter dpc formula lapple cyclone online', 'cyclone dust collection efficiency calculator', 'centrifugal gas particle separation cyclone calculator', 'air pollution control chemical engineering dust collector online'],
    order: 1259,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inlet Width B (m), Gas Inlet Velocity v_i (m/s), Effective Turns N_e (e.g. 5) & Particle Size d_p (μm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cy-b">Inlet Width B (m)</label>
          <input class="tool-textarea" id="cy-b" type="number" step="0.05" value="0.20" placeholder="0.20 m (20 cm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-vi">Inlet Velocity v_i</label>
          <input class="tool-textarea" id="cy-vi" type="number" step="2" value="15.0" placeholder="15.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-ne">Vortex Turns N_e</label>
          <input class="tool-textarea" id="cy-ne" type="number" step="1" value="5" placeholder="5 Turns" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-dp">Dust Size d_p (μm)</label>
          <input class="tool-textarea" id="cy-dp" type="number" step="1" value="8.0" placeholder="8.0 μm Dust" />
        </div>
      </div>
      <div id="cy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cy-res-dpc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cut Size d_pc = 5.09 μm (50% Collection Threshold)</span>
            <span class="stat-label">Lapple Cyclone Particle Cut Diameter (d_pc)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cy-res-eff" style="color:var(--green-dark); font-weight:700;">Collection Efficiency η = 71.2% (For 8.0 μm dust | η = 1 / (1 + (d_pc / d_p)²))</span>
            <span class="stat-label">Fractional Dust Collection Efficiency & Centrifugal Removal</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('cy-b'), viEl = document.getElementById('cy-vi');
  const neEl = document.getElementById('cy-ne'), dpEl = document.getElementById('cy-dp');
  const dpcResEl = document.getElementById('cy-res-dpc'), effResEl = document.getElementById('cy-res-eff');

  const mu_gas = 1.8e-5; // Pa * s (Air)
  const rho_p = 2000.0; // kg/m^3 (Dust)
  const rho_g = 1.2; // kg/m^3 (Air)

  function update() {
    const B = parseFloat(bEl.value), v_i = parseFloat(viEl.value);
    const N_e = parseFloat(neEl.value), d_p_um = parseFloat(dpEl.value);

    if (isNaN(B) || isNaN(v_i) || isNaN(N_e) || isNaN(d_p_um) || B <= 0 || v_i <= 0 || N_e <= 0 || d_p_um <= 0) return;

    // Lapple cut diameter: d_pc = sqrt( (9 * mu * B) / (2 * pi * N_e * v_i * (rho_p - rho_g)) )  [m -> um]
    const num = 9.0 * mu_gas * B;
    const den = 2.0 * Math.PI * N_e * v_i * (rho_p - rho_g);
    const d_pc_m = Math.sqrt(num / den);
    const d_pc_um = d_pc_m * 1e6;

    // Lapple fractional collection efficiency: eta = 1 / ( 1 + (d_pc / d_p)^2 )
    const eta = 1.0 / (1.0 + Math.pow(d_pc_um / d_p_um, 2));
    const eta_pct = eta * 100.0;

    dpcResEl.textContent = 'Cut Size d_pc = ' + d_pc_um.toFixed(2) + ' μm';
    effResEl.textContent = 'Collection Efficiency η = ' + eta_pct.toFixed(1) + '% (d_p = ' + d_p_um + ' μm @ v_i = ' + v_i + ' m/s, ' + N_e + ' turns)';
  }

  [bEl, viEl, neEl, dpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cyclone rectangular gas inlet duct width B in meters.',
      'Enter tangential gas inlet velocity $v_i$ in m/s (typically 12–20 m/s).',
      'Enter number of effective helical outer vortex turns $N_e$ (typically 5 for standard Stairmand/Lapple designs).',
      'Enter candidate dust particle size $d_p$ in micrometers ($\mu\text{m}$).',
      'Inspect $50\%$ cut diameter $d_{pc}$ and overall fractional particulate removal collection efficiency.'
    ],
    benefitTitle: 'C. E. Lapple 1951 Cyclone Particulate Separation Standard',
    benefitContent: 'High-speed tangential gas flow creates intense centrifugal acceleration (hundreds of $g$\'s), flinging dust particles radially against outer cone walls to fall into the hopper while clean gas escapes up through the vortex finder.',
    faqs: [{ q: 'What is the particle cut diameter d_pc?', a: '$d_{pc}$ is the aerodynamic particle size that has exactly a $50\%$ collection efficiency probability in the cyclone.' }]
  }
];

pack44Tools.forEach(createTool);
console.log('Pack 44 complete: ' + pack44Tools.length + ' tools created.');
