const { createTool } = require('./generate-curated-tools.cjs');

// Pack 23: 25 Tools covering CFD Turbulence, Medical Physics Dosimetry, Quantitative Finance & Greeks, Structural Dynamics, Environmental Wastewater (Tools 831 to 855)
const pack23Tools = [
  // --- Suite AAAAA: Computational Fluid Dynamics (CFD), Meshing & Turbulence (831 - 835) ---
  // 1. CFD First Layer Mesh Height y+ Boundary Layer Calculator
  {
    slug: 'cfd-y-plus-boundary-layer-wall-distance-calculator',
    name: 'CFD First Cell Mesh Height y+ & Boundary Layer Wall Distance Calculator',
    description: 'Calculate Computational Fluid Dynamics (CFD) boundary layer first mesh cell height y (Δy = y+ · ν / u_τ) in μm/mm for wall-resolved (y+ ≈ 1) or wall-function (y+ ≈ 30–300) turbulence models.',
    category: 'Science',
    icon: 'text',
    keywords: ['cfd y plus calculator', 'first layer mesh height formula y plus online', 'boundary layer wall distance calculator cfd', 'ansys fluent openfoam y plus mesh spacing calculator', 'skin friction velocity friction velocity u tau online'],
    order: 711,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Freestream Velocity U (m/s), Characteristic Length L (m), Target y+ (1 or 30) & Fluid (Air/Water)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="yp-u">Velocity U (m/s)</label>
          <input class="tool-textarea" id="yp-u" type="number" step="any" value="30.0" placeholder="30.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yp-l">Length L (m)</label>
          <input class="tool-textarea" id="yp-l" type="number" step="any" value="1.0" placeholder="1.0 m Chord / Pipe" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yp-targ">Target y+</label>
          <input class="tool-textarea" id="yp-targ" type="number" step="0.5" value="1.0" placeholder="1.0 (Viscous Sublayer)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yp-fluid">Fluid Medium</label>
          <select class="tool-textarea" id="yp-fluid">
            <option value="air" selected>Air (20°C: ρ = 1.225 kg/m³, ν = 1.5e-5 m²/s)</option>
            <option value="water">Water (20°C: ρ = 1000 kg/m³, ν = 1.0e-6 m²/s)</option>
          </select>
        </div>
      </div>
      <div id="yp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="yp-res-dy" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Δy = 11.2 μm (0.0112 mm)</span>
            <span class="stat-label">Required First Mesh Cell Height (Δy)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="yp-res-re" style="font-weight:700;">Re = 2.00 × 10⁶ | Friction Velocity u_τ = 1.34 m/s (C_f = 0.0040)</span>
            <span class="stat-label">Reynolds Number & Wall Shear Friction Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uEl = document.getElementById('yp-u'), lEl = document.getElementById('yp-l');
  const ypEl = document.getElementById('yp-targ'), flEl = document.getElementById('yp-fluid');
  const dyResEl = document.getElementById('yp-res-dy'), reResEl = document.getElementById('yp-res-re');

  const FLUIDS = {
    'air':   { rho: 1.225, nu: 1.51e-5 },
    'water': { rho: 1000.0, nu: 1.00e-6 }
  };

  function update() {
    const f = FLUIDS[flEl.value];
    const U = parseFloat(uEl.value), L = parseFloat(lEl.value), yPlus = parseFloat(ypEl.value);

    if (isNaN(U) || isNaN(L) || isNaN(yPlus) || U <= 0 || L <= 0 || yPlus <= 0) return;

    // Reynolds number Re = (U * L) / nu
    const Re = (U * L) / f.nu;

    // Flat plate turbulent skin friction coefficient: C_f approx = (2 * log10(Re) - 0.65)^(-2.3)
    // Or standard Schlichting formula: C_f = 0.0592 * Re^(-0.2)
    const Cf = 0.0592 * Math.pow(Re, -0.2);

    // Wall shear stress tau_w = 0.5 * rho * U^2 * Cf  [Pa]
    const tau_w = 0.5 * f.rho * Math.pow(U, 2) * Cf;

    // Friction velocity u_tau = sqrt( tau_w / rho ) = U * sqrt( Cf / 2 )  [m / s]
    const u_tau = U * Math.sqrt(Cf / 2);

    // First cell height delta_y = ( yPlus * nu ) / u_tau  [meters]
    const dy_m = (yPlus * f.nu) / u_tau;
    const dy_um = dy_m * 1e6;
    const dy_mm = dy_m * 1000;

    let dyStr = '';
    if (dy_um < 1000) dyStr = dy_um.toFixed(1) + ' μm (' + dy_mm.toFixed(4) + ' mm)';
    else dyStr = dy_mm.toFixed(3) + ' mm (' + Math.round(dy_um) + ' μm)';

    dyResEl.textContent = 'Δy = ' + dyStr + ' (Target y+ = ' + yPlus + ')';
    reResEl.textContent = 'Re = ' + Re.toExponential(2) + ' | u_τ = ' + u_tau.toFixed(2) + ' m/s (C_f = ' + Cf.toFixed(4) + ', τ_w = ' + tau_w.toFixed(1) + ' Pa)';
  }

  [uEl, lEl, ypEl].forEach(el => el.addEventListener('input', update));
  flEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter freestream fluid flow velocity U in m/s.',
      'Enter characteristic boundary layer length L (e.g. wing chord or pipe diameter) in meters.',
      'Enter target dimensionless wall distance y+ (choose $y^+ \le 1$ for SST k-$\omega$ or low-Re resolving, $y^+ \sim 30\text{–}100$ for standard k-$\epsilon$ wall functions).',
      'Select fluid medium (Air or Water at 20°C).',
      'Inspect required physical first layer inflation mesh cell height $\Delta y$ in micrometers ($\mu\text{m}$) and friction velocity $u_\tau$.'
    ],
    benefitTitle: 'Turbulent Boundary Layer Wall-Resolved Meshing',
    benefitContent: 'Near solid walls, steep velocity gradients in the viscous sublayer ($y^+ < 5$) dominate drag and separation; setting the correct inflation layer first cell height ($\Delta y$) ensures turbulence models accurately predict aerodynamic stall, heat transfer, and skin friction.',
    faqs: [{ q: 'Why is y+ ≈ 1 required for SST k-ω and LES models?', a: 'Because low-Re turbulence models integrate transport equations directly through the laminar sublayer to the wall without using empirical semi-logarithmic wall function approximations.' }]
  },

  // 2. CFD Turbulence Boundary Conditions (k, ε, ω & Turbulence Intensity) Calculator
  {
    slug: 'turbulence-intensity-kinetic-energy-k-omega-calculator',
    name: 'CFD Turbulence Inflow Boundary Conditions (k, ε, ω & Intensity I) Calculator',
    description: 'Calculate CFD inlet turbulence boundary conditions: kinetic energy (k = 3/2 · (U·I)²), dissipation (ε = C_μ^(3/4) · k^(3/2) / l), and specific dissipation rate (ω = k^(1/2) / (C_μ^(1/4) · l)) from turbulence intensity I (%).',
    category: 'Science',
    icon: 'text',
    keywords: ['cfd turbulence boundary conditions calculator', 'turbulent kinetic energy k formula 3 over 2 u times i squared', 'turbulence dissipation rate epsilon omega calculator online', 'ansys openfoam k omega inlet boundary calculator', 'turbulent length scale calculator online'],
    order: 712,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inlet Mean Velocity U (m/s), Turbulence Intensity I (%) & Hydraulic Diameter D_h (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="trb-u">Velocity U (m/s)</label>
          <input class="tool-textarea" id="trb-u" type="number" step="any" value="20.0" placeholder="20.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trb-i">Intensity I (%)</label>
          <input class="tool-textarea" id="trb-i" type="number" step="0.5" value="5.0" placeholder="5.0 % (Medium)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="trb-dh">Hydraulic D_h (m)</label>
          <input class="tool-textarea" id="trb-dh" type="number" step="any" value="0.50" placeholder="0.50 m Duct / Pipe" />
        </div>
      </div>
      <div id="trb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="trb-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">k = 1.500 m² / s²</span>
            <span class="stat-label">Turbulent Kinetic Energy (k = 3/2·(U·I)²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="trb-res-om" style="font-weight:700;">ω = 64.3 s⁻¹ | ε = 9.53 m²/s³ (Length Scale l = 35.0 mm)</span>
            <span class="stat-label">Specific Dissipation Rate (ω) & Dissipation Rate (ε)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uEl = document.getElementById('trb-u'), iEl = document.getElementById('trb-i'), dhEl = document.getElementById('trb-dh');
  const kResEl = document.getElementById('trb-res-k'), omResEl = document.getElementById('trb-res-om');

  const C_mu = 0.09;

  function update() {
    const U = parseFloat(uEl.value), IPct = parseFloat(iEl.value), Dh = parseFloat(dhEl.value);
    if (isNaN(U) || isNaN(IPct) || isNaN(Dh) || U <= 0 || IPct <= 0 || Dh <= 0) return;

    const I = IPct / 100;

    // Turbulent kinetic energy k = 1.5 * (U * I)^2  [m^2 / s^2]
    const k = 1.5 * Math.pow(U * I, 2);

    // Turbulent length scale l approx = 0.07 * Dh  [meters]
    const l_m = 0.07 * Dh;
    const l_mm = l_m * 1000;

    // Dissipation rate epsilon = (C_mu^0.75 * k^1.5) / l  [m^2 / s^3]
    const epsilon = (Math.pow(C_mu, 0.75) * Math.pow(k, 1.5)) / l_m;

    // Specific dissipation rate omega = k^0.5 / (C_mu^0.25 * l) = epsilon / (C_mu * k)  [s^-1]
    const omega = epsilon / (C_mu * k);

    // Eddy viscosity ratio (nu_t / nu)
    const nu_t = k / omega; // m^2 / s

    kResEl.textContent = 'k = ' + k.toFixed(3) + ' m² / s² (Turbulent Energy)';
    omResEl.textContent = 'ω = ' + omega.toFixed(1) + ' s⁻¹ | ε = ' + epsilon.toFixed(2) + ' m²/s³ (Length Scale l = ' + l_mm.toFixed(1) + ' mm, ν_t = ' + (nu_t * 1e4).toFixed(1) + ' cm²/s)';
  }

  [uEl, iEl, dhEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter inlet mean freestream velocity U in m/s.',
      'Enter turbulence intensity I in % (1% for external low-noise wind tunnels, 5% for medium industrial ducts, 10%+ for high-swirl turbomachinery).',
      'Enter inlet hydraulic diameter $D_h = 4A/P$ in meters.',
      'Inspect turbulent kinetic energy k ($m^2/s^2$), eddy dissipation rate $\epsilon$ ($m^2/s^3$), and specific dissipation rate $\omega$ ($s^{-1}$) ready to paste directly into Fluent or OpenFOAM boundary condition files.'
    ],
    benefitTitle: 'Two-Equation Turbulence Boundary Initialization',
    benefitContent: 'Accurate specification of inlet turbulence intensity ($I$) and length scale ($l = 0.07 D_h$) prevents non-physical unphysical decay of turbulence before reaching the test model in CFD domain simulations.',
    faqs: [{ q: 'Why is l assumed to be 0.07 · Dh for internal flows?', a: 'Empirical duct measurements show maximum turbulent mixing eddies are constrained by channel boundaries to approximately 7% of hydraulic diameter.' }]
  },

  // 3. Courant-Friedrichs-Lewy (CFL) Condition Maximum Time Step Calculator
  {
    slug: 'courant-friedrichs-lewy-cfl-time-step-calculator',
    name: 'Courant-Friedrichs-Lewy (CFL / Courant Number) Time Step Calculator',
    description: 'Calculate numerical simulation maximum stable transient time step (Δt = CFL · Δx / (u + c)) in microseconds/milliseconds from CFL condition and mesh cell spacing Δx.',
    category: 'Science',
    icon: 'text',
    keywords: ['cfl condition calculator', 'courant friedrichs lewy formula max time step online', 'cfd cfl number time step delta t calculator', 'compressible acoustic cfl stability calculator', 'finite difference numerical stability online'],
    order: 713,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Velocity u (m/s), Sound Speed c (m/s), Smallest Mesh Cell Δx (mm) & Target CFL Number',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cfl-u">Fluid Speed u (m/s)</label>
          <input class="tool-textarea" id="cfl-u" type="number" step="any" value="50.0" placeholder="50.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfl-c">Sound Speed c (m/s)</label>
          <input class="tool-textarea" id="cfl-c" type="number" step="any" value="343.0" placeholder="343.0 m/s (Acoustic)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfl-dx">Min Mesh Δx (mm)</label>
          <input class="tool-textarea" id="cfl-dx" type="number" step="any" value="0.50" placeholder="0.50 mm (Fine Cell)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cfl-num">Target CFL Number</label>
          <input class="tool-textarea" id="cfl-num" type="number" step="0.1" value="0.80" placeholder="0.80 (Explicit Stability)" />
        </div>
      </div>
      <div id="cfl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cfl-res-dt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Δt = 1.02 μs (Microseconds)</span>
            <span class="stat-label">Maximum Stable Simulation Time Step (Δt)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cfl-res-wave" style="font-weight:700;">Wave Speed u+c = 393 m/s | Incompressible advective Δt = 8.00 μs</span>
            <span class="stat-label">Characteristic Acoustic Wave Speed & Stability Margin</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uEl = document.getElementById('cfl-u'), cEl = document.getElementById('cfl-c');
  const dxEl = document.getElementById('cfl-dx'), cflEl = document.getElementById('cfl-num');
  const dtResEl = document.getElementById('cfl-res-dt'), wvResEl = document.getElementById('cfl-res-wave');

  function update() {
    const u = parseFloat(uEl.value), c = parseFloat(cEl.value);
    const dxMm = parseFloat(dxEl.value), cflTarget = parseFloat(cflEl.value);

    if (isNaN(u) || isNaN(c) || isNaN(dxMm) || isNaN(cflTarget) || u < 0 || c < 0 || dxMm <= 0 || cflTarget <= 0) return;

    const dxM = dxMm * 1e-3;
    const waveSpeed = u + c;

    // Compressible CFL limit: delta_t = (CFL * dx) / (u + c)  [seconds]
    const dt_sec = (cflTarget * dxM) / waveSpeed;
    const dt_us = dt_sec * 1e6;
    const dt_ms = dt_sec * 1e3;

    // Incompressible (advective only) limit: delta_t_adv = (CFL * dx) / u
    const dt_adv_us = u > 0 ? ((cflTarget * dxM) / u) * 1e6 : 0;

    let dtStr = '';
    if (dt_us < 1000) dtStr = dt_us.toFixed(2) + ' μs';
    else dtStr = dt_ms.toFixed(3) + ' ms (' + Math.round(dt_us).toLocaleString() + ' μs)';

    dtResEl.textContent = 'Δt = ' + dtStr + ' (CFL = ' + cflTarget + ')';
    wvResEl.textContent = 'Wave Speed (u+c) = ' + Math.round(waveSpeed) + ' m/s | Advective Δt = ' + dt_adv_us.toFixed(2) + ' μs (100k steps = ' + (dt_sec * 1e5).toFixed(3) + ' s physical time)';
  }

  [uEl, cEl, dxEl, cflEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter convective fluid velocity u in m/s.',
      'Enter medium acoustic speed of sound c in m/s (set $c=0$ for incompressible pressure-based solvers).',
      'Enter minimum spatial grid cell spacing $\Delta x$ in millimeters.',
      'Enter target numerical Courant number (typically $\text{CFL} \le 1.0$ for explicit time-stepping schemes, $\text{CFL} \sim 5\text{–}20$ for implicit solvers).',
      'Inspect maximum stable simulation time step $\Delta t$ in microseconds ($\mu\text{s}$) and milliseconds.'
    ],
    benefitTitle: 'Richard Courant, Kurt Friedrichs, & Hans Lewy 1928 Stability Criterion',
    benefitContent: 'The CFL condition mandates that numerical information propagation speed ($\Delta x / \Delta t$) must exceed physical wave propagation speed ($u + c$); violating CFL in explicit transient solvers triggers numerical instability and floating-point overflow divergence.',
    faqs: [{ q: 'Why do implicit CFD solvers allow CFL > 1?', a: 'Implicit solvers invert simultaneous matrix equations across the entire grid domain at once, removing the mathematical stability limit on time step size.' }]
  },

  // 4. Knudsen Number & Micro/Rarefied Gas Continuum Flow Regime Calculator
  {
    slug: 'mesh-knudsen-number-continuum-navier-stokes-calculator',
    name: 'Knudsen Number (Kn = λ / L) & Rarefied Gas Continuum Flow Regime Calculator',
    description: 'Calculate molecular mean free path λ (λ = k_B·T / (√2·π·d²·P)) and Knudsen number (Kn = λ / L) to determine Continuum (Navier-Stokes), Slip Flow, Transitional, or Free Molecular regimes.',
    category: 'Science',
    icon: 'text',
    keywords: ['knudsen number calculator', 'rarefied gas continuum flow formula kn equals lambda over l', 'molecular mean free path calculator online', 'navier stokes validity slip flow dsmc calculator', 'hypersonic space re entry knudsen number online'],
    order: 714,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gas Pressure P (Pa / bar), Temperature T (°C), Characteristic Length L (mm) & Molecular Dia d (nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kn-p">Pressure P (Pa)</label>
          <input class="tool-textarea" id="kn-p" type="number" step="any" value="101325" placeholder="101325 Pa (1 atm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kn-t">Temperature T (°C)</label>
          <input class="tool-textarea" id="kn-t" type="number" step="any" value="20.0" placeholder="20.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kn-l">Length L (mm)</label>
          <input class="tool-textarea" id="kn-l" type="number" step="any" value="0.05" placeholder="0.05 mm (50 μm MEMS)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kn-d">Gas Molecule</label>
          <select class="tool-textarea" id="kn-d">
            <option value="0.37" selected>Air / N₂ (d = 0.37 nm)</option>
            <option value="0.29">Helium (d = 0.29 nm)</option>
            <option value="0.41">CO₂ (d = 0.41 nm)</option>
          </select>
        </div>
      </div>
      <div id="kn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kn-res-kn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Kn = 0.00136 (Continuum)</span>
            <span class="stat-label">Knudsen Number (Kn = λ / L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kn-res-reg" style="color:var(--green-dark); font-weight:700;">Continuum Regime (Kn < 0.001: Standard Navier-Stokes No-Slip Valid)</span>
            <span class="stat-label">Aerodynamic Gas Dynamics Flow Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('kn-p'), tEl = document.getElementById('kn-t');
  const lEl = document.getElementById('kn-l'), dEl = document.getElementById('kn-d');
  const knResEl = document.getElementById('kn-res-kn'), rgResEl = document.getElementById('kn-res-reg');

  const kB = 1.380649e-23; // J / K (Boltzmann constant)

  function update() {
    const P = parseFloat(pEl.value), Tc = parseFloat(tEl.value);
    const LMm = parseFloat(lEl.value), dNm = parseFloat(dEl.value);

    if (isNaN(P) || isNaN(Tc) || isNaN(LMm) || isNaN(dNm) || P <= 0 || LMm <= 0 || dNm <= 0 || Tc < -273.15) return;

    const Tk = Tc + 273.15;
    const dM = dNm * 1e-9;
    const LM = LMm * 1e-3;

    // Molecular mean free path lambda = ( kB * T ) / ( sqrt(2) * pi * d^2 * P )  [meters]
    const lambdaM = (kB * Tk) / (Math.SQRT2 * Math.PI * Math.pow(dM, 2) * P);
    const lambdaNm = lambdaM * 1e9;
    const lambdaUm = lambdaM * 1e6;

    // Knudsen number Kn = lambda / L
    const Kn = lambdaM / LM;

    let regime = '';
    let color = '#22543d';

    if (Kn < 0.001) {
      regime = 'CONTINUUM FLOW (Kn < 0.001): Standard Navier-Stokes Equations with No-Slip Wall Boundary';
      color = '#22543d';
    } else if (Kn < 0.1) {
      regime = 'SLIP FLOW (0.001 < Kn < 0.1): Navier-Stokes with Maxwell Velocity Slip & Temperature Jump';
      color = '#2563eb';
    } else if (Kn < 10.0) {
      regime = 'TRANSITION REGIME (0.1 < Kn < 10): DSMC (Direct Simulation Monte Carlo) Particle Methods Required';
      color = '#d97706';
    } else {
      regime = 'FREE MOLECULAR FLOW (Kn > 10): Intermolecular Collisions Negligible - Collisionless Gas Kinetics';
      color = '#c53030';
    }

    knResEl.textContent = 'Kn = ' + (Kn < 0.01 ? Kn.toExponential(3) : Kn.toFixed(4)) + ' (Mean Free Path λ = ' + (lambdaUm < 1.0 ? lambdaNm.toFixed(1) + ' nm' : lambdaUm.toFixed(2) + ' μm)');
    rgResEl.textContent = regime;
    rgResEl.style.color = color;
  }

  [pEl, tEl, lEl].forEach(el => el.addEventListener('input', update));
  dEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter gas absolute pressure in Pascals (e.g. 101,325 Pa at sea level, 0.1 Pa in vacuum chambers, 0.01 Pa in upper mesosphere).',
      'Enter gas temperature in Celsius.',
      'Enter characteristic device dimension L (e.g. MEMS channel height or satellite diameter) in millimeters.',
      'Select gas molecular species (Air, Helium, $CO_2$).',
      'Inspect molecular mean free path $\lambda$ and Knudsen number Kn to verify whether continuum Navier-Stokes CFD or Direct Simulation Monte Carlo (DSMC) is required.'
    ],
    benefitTitle: 'Martin Knudsen 1909 Rarefied Gas Continuum Boundary',
    benefitContent: 'When characteristic dimensions approach the molecular collision distance ($Kn > 0.01$), thermodynamic equilibrium breaks down at solid surfaces, creating velocity slip ($u_{\text{gas}} \ne 0$) and rendering traditional continuum Navier-Stokes solvers invalid in MEMS devices and hypersonic spacecraft re-entry.',
    faqs: [{ q: 'What is the mean free path of air at standard sea level?', a: 'At standard atmospheric pressure and 20°C, the mean free path of air molecules is approximately 68 nanometers ($\sim 0.068\text{ }\mu\text{m}$).' }]
  },

  // 5. Rankine-Hugoniot Supersonic Normal Shock Wave Jump Calculator
  {
    slug: 'shock-capturing-rankine-hugoniot-density-jump-calculator',
    name: 'Rankine-Hugoniot Supersonic Normal Shock Wave Jump Calculator',
    description: 'Calculate normal shock wave discontinuous jumps across Mach number M₁: downstream Mach M₂, pressure ratio P₂/P₁, temperature ratio T₂/T₁, and density ratio ρ₂/ρ₁.',
    category: 'Science',
    icon: 'text',
    keywords: ['rankine hugoniot calculator', 'normal shock wave jump formula pressure ratio p2 over p1', 'supersonic normal shock mach number m2 calculator', 'gas dynamics normal shock density jump online', 'compressible aerodynamics shock wave calculator'],
    order: 715,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Upstream Mach Number M₁ (> 1.0) & Specific Heat Ratio γ (1.40 for Air)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="shk-m1">Upstream Mach M₁</label>
          <input class="tool-textarea" id="shk-m1" type="number" step="0.1" value="2.50" placeholder="2.50 (Supersonic)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="shk-gam">Ratio of Heats γ</label>
          <input class="tool-textarea" id="shk-gam" type="number" step="0.05" value="1.40" placeholder="1.40 (Air / Diatomic)" />
        </div>
      </div>
      <div id="shk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="shk-res-m2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">M₂ = 0.513 Subsonic</span>
            <span class="stat-label">Downstream Mach Number (M₂ < 1.0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="shk-res-ratios" style="font-weight:700;">P₂/P₁ = 7.125× | T₂/T₁ = 2.137× | ρ₂/ρ₁ = 3.333× (P_02/P_01 = 0.499)</span>
            <span class="stat-label">Static Pressure, Temperature, Density Jumps & Stagnation Loss</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('shk-m1'), gamEl = document.getElementById('shk-gam');
  const m2ResEl = document.getElementById('shk-res-m2'), ratResEl = document.getElementById('shk-res-ratios');

  function update() {
    const M1 = parseFloat(m1El.value), gamma = parseFloat(gamEl.value);
    if (isNaN(M1) || isNaN(gamma) || M1 < 1.0 || gamma <= 1.0) return;

    const M1_sq = Math.pow(M1, 2);

    // Downstream Mach M2: M2^2 = ( (gamma - 1)*M1^2 + 2 ) / ( 2*gamma*M1^2 - (gamma - 1) )
    const M2_sq = ((gamma - 1) * M1_sq + 2) / ((2 * gamma * M1_sq) - (gamma - 1));
    const M2 = Math.sqrt(Math.max(0, M2_sq));

    // Pressure ratio P2 / P1 = 1 + (2*gamma / (gamma + 1)) * (M1^2 - 1)
    const pRatio = 1.0 + (((2 * gamma) / (gamma + 1)) * (M1_sq - 1.0));

    // Density ratio rho2 / rho1 = ( (gamma + 1)*M1^2 ) / ( (gamma - 1)*M1^2 + 2 )
    const rhoRatio = ((gamma + 1) * M1_sq) / (((gamma - 1) * M1_sq) + 2);

    // Temperature ratio T2 / T1 = (P2/P1) / (rho2/rho1)
    const tRatio = pRatio / rhoRatio;

    // Stagnation pressure total recovery P02 / P01
    const p0Ratio = Math.pow(rhoRatio, gamma / (gamma - 1)) * Math.pow(1 / pRatio, 1 / (gamma - 1));

    m2ResEl.textContent = 'M₂ = ' + M2.toFixed(3) + ' Subsonic Exit';
    ratResEl.textContent = 'P₂/P₁ = ' + pRatio.toFixed(3) + '× | T₂/T₁ = ' + tRatio.toFixed(3) + '× | ρ₂/ρ₁ = ' + rhoRatio.toFixed(3) + '× (Total Pressure Recovery: ' + (p0Ratio * 100).toFixed(1) + '%)';
  }

  m1El.addEventListener('input', update);
  gamEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter upstream supersonic Mach number $M_1 \ge 1.0$.',
      'Enter gas ratio of specific heats $\gamma$ (1.40 for air).',
      'Inspect downstream subsonic Mach number $M_2$, static pressure jump ratio $P_2/P_1$, temperature rise $T_2/T_1$, compression density jump $\rho_2/\rho_1$, and total stagnation pressure recovery ($P_{02}/P_{01}$).'
    ],
    benefitTitle: 'William Rankine 1870 & Pierre-Henri Hugoniot 1887 Conservation Laws',
    benefitContent: 'Normal shocks are irreversible thermodynamic discontinuities that compress supersonic flow into subsonic flow ($M_2 < 1$); entropy generation across strong shock waves causes severe stagnation pressure loss ($P_{02} \ll P_{01}$) in supersonic scramjet intakes.',
    faqs: [{ q: 'What is the asymptotic maximum density jump limit for air (γ=1.4)?', a: 'As Mach approaches infinity ($M_1 \to \infty$), the maximum theoretical density ratio for air reaches an asymptotic limit of $\frac{\gamma+1}{\gamma-1} = \frac{2.4}{0.4} = 6.0\times$.' }]
  },

  // --- Suite BBBBB: Medical Physics, Radiotherapy & Dosimetry (836 - 840) ---
  // 6. Linear-Quadratic Model Biologically Effective Dose (BED) Calculator
  {
    slug: 'radiotherapy-linear-quadratic-biologically-effective-dose-calculator',
    name: 'Radiotherapy Biologically Effective Dose (BED & EQD2) Calculator',
    description: 'Calculate cancer radiation oncology Biologically Effective Dose (BED = n · d · (1 + d / (α/β))) in Gy and Equivalent Dose in 2 Gy fractions (EQD2) across tumor and normal tissue α/β ratios.',
    category: 'Health',
    icon: 'text',
    keywords: ['bed calculator radiotherapy', 'biologically effective dose formula n times d times 1 plus d over alpha beta', 'eqd2 equivalent dose in 2 gy fractions calculator', 'radiation oncology linear quadratic model calculator', 'sbrt stereotactic fractionation bed online'],
    order: 716,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fraction Dose d (Gy), Total Fractions n & Tissue α/β Ratio (Gy)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bed-d">Dose / Fraction d (Gy)</label>
          <input class="tool-textarea" id="bed-d" type="number" step="any" value="2.0" placeholder="2.0 Gy (Standard Fraction)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bed-n">Fractions n</label>
          <input class="tool-textarea" id="bed-n" type="number" step="1" value="30" placeholder="30 Fractions" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bed-ab">Tissue α/β (Gy)</label>
          <select class="tool-textarea" id="bed-ab">
            <option value="10.0" selected>Tumor / Acute Tissue (α/β = 10.0 Gy)</option>
            <option value="3.0">Late Responding Normal Tissue / Spinal Cord (α/β = 3.0 Gy)</option>
            <option value="1.5">Prostate Cancer (α/β = 1.5 Gy)</option>
          </select>
        </div>
      </div>
      <div id="bed-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bed-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BED₁₀ = 72.0 Gy₁₀</span>
            <span class="stat-label">Biologically Effective Dose (BED)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bed-res-eqd2" style="color:var(--green-dark); font-weight:700;">EQD2 = 60.0 Gy (Total Physical Dose: 60.0 Gy in 30 Fractions)</span>
            <span class="stat-label">Equivalent Dose in 2 Gy Fractions (EQD2)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('bed-d'), nEl = document.getElementById('bed-n'), abEl = document.getElementById('bed-ab');
  const bResEl = document.getElementById('bed-res-val'), eqResEl = document.getElementById('bed-res-eqd2');

  function update() {
    const d = parseFloat(dEl.value), n = parseFloat(nEl.value), ab = parseFloat(abEl.value);
    if (isNaN(d) || isNaN(n) || isNaN(ab) || d <= 0 || n <= 0 || ab <= 0) return;

    const totalPhysicalDose = n * d;

    // Linear-Quadratic Model: BED = n * d * ( 1 + d / (alpha/beta) )  [Gy]
    const BED = totalPhysicalDose * (1.0 + (d / ab));

    // EQD2 = BED / ( 1 + 2.0 / (alpha/beta) )  [Gy in 2 Gy fractions]
    const EQD2 = BED / (1.0 + (2.0 / ab));

    bResEl.textContent = 'BED_' + ab.toFixed(0) + ' = ' + BED.toFixed(1) + ' Gy_' + ab.toFixed(0);
    eqResEl.textContent = 'EQD2 = ' + EQD2.toFixed(1) + ' Gy (Physical Dose: ' + totalPhysicalDose.toFixed(1) + ' Gy in ' + n + ' × ' + d.toFixed(1) + ' Gy Fractions)';
  }

  [dEl, nEl].forEach(el => el.addEventListener('input', update));
  abEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter radiotherapy physical dose per fraction d in Gray (Gy).',
      'Enter total number of scheduled treatment fractions n.',
      'Select biological tissue $\alpha/\beta$ ratio (10.0 Gy for early-responding tumor cells, 3.0 Gy for late-responding healthy organs at risk).',
      'Inspect Biologically Effective Dose (BED) and standard 2 Gy normalized Equivalent Dose (EQD2).'
    ],
    benefitTitle: 'Linear-Quadratic (LQ) Radiobiology Model',
    benefitContent: 'The LQ model ($S = e^{-\alpha D - \beta D^2}$) accounts for lethal unrepairable double-strand DNA breaks ($\alpha$) and sublethal repairable damage ($\beta$); calculating BED allows radiation oncologists to safely convert standard 30-fraction regimens into 5-fraction Stereotactic Body Radiotherapy (SBRT).',
    faqs: [{ q: 'Why is α/β = 3 Gy critical for late-responding normal tissues?', a: 'Low $\alpha/\beta$ tissues (e.g. spinal cord, brainstem) are hypersensitive to large fraction doses ($d > 3\text{ Gy}$), requiring strict dose constraints to prevent late radiation necrosis.' }]
  },

  // 7. Bragg-Gray Cavity Theory Absorbed Radiation Dose Calculator
  {
    slug: 'absorbed-dose-kerma-stopping-power-bragg-gray-calculator',
    name: 'Bragg-Gray Cavity Theory Absorbed Radiation Dose (D_med) Calculator',
    description: 'Calculate medium radiation absorbed dose from ion chamber cavity ionization (D_med = (Q/m) · (W/e) · (S/ρ)_gas^med) in Gray (Gy) and Kerma conversion.',
    category: 'Science',
    icon: 'text',
    keywords: ['bragg gray cavity theory calculator', 'absorbed dose ionization chamber formula w over e', 'stopping power ratio absorbed dose calculator online', 'medical physics radiation dosimetry bragg gray online', 'linac calibration absorbed dose to water calculator'],
    order: 717,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Measured Charge Q (nC), Chamber Mass m (mg), Mass Stopping Power Ratio & W/e (33.97 eV/pair)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bg-q">Charge Q (nC)</label>
          <input class="tool-textarea" id="bg-q" type="number" step="any" value="25.4" placeholder="25.4 nC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-mass">Chamber Mass m (mg)</label>
          <input class="tool-textarea" id="bg-mass" type="number" step="any" value="0.75" placeholder="0.75 mg (0.6 cc Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-sp">Stopping Power (S/ρ)</label>
          <input class="tool-textarea" id="bg-sp" type="number" step="0.01" value="1.13" placeholder="1.13 (Water to Air)" />
        </div>
      </div>
      <div id="bg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bg-res-dose" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D_water = 1.300 Gy</span>
            <span class="stat-label">Absorbed Dose to Water (D_med)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-gas" style="font-weight:700;">Cavity Gas Dose D_gas: 1.151 Gy (W/e = 33.97 J/C in Dry Air)</span>
            <span class="stat-label">Ion Chamber Cavity Air Dose & Ionization Density</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('bg-q'), mEl = document.getElementById('bg-mass'), spEl = document.getElementById('bg-sp');
  const dResEl = document.getElementById('bg-res-dose'), gResEl = document.getElementById('bg-res-gas');

  const W_e = 33.97; // J / C (average energy required to produce an ion pair in dry air)

  function update() {
    const Q_nc = parseFloat(qEl.value), massMg = parseFloat(mEl.value), sRatio = parseFloat(spEl.value);
    if (isNaN(Q_nc) || isNaN(massMg) || isNaN(sRatio) || Q_nc <= 0 || massMg <= 0 || sRatio <= 0) return;

    const Q_c = Q_nc * 1e-9;
    const massKg = massMg * 1e-6;

    // Dose to cavity gas D_gas = (Q / m) * (W / e)  [Joules/kg = Gray]
    const D_gas = (Q_c / massKg) * W_e;

    // Bragg-Gray cavity relation: D_med = D_gas * (S / rho)_gas^med  [Gray]
    const D_med = D_gas * sRatio;

    dResEl.textContent = 'D_water = ' + D_med.toFixed(3) + ' Gy (' + (D_med * 100).toFixed(1) + ' cGy)';
    gResEl.textContent = 'D_gas: ' + D_gas.toFixed(3) + ' Gy | Specific Charge: ' + (Q_nc/massMg).toFixed(2) + ' nC/mg (AAPM TG-51 / IAEA TRS-398 Reference)';
  }

  [qEl, mEl, spEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter collected electrometer ionization charge Q in nanocoulombs (nC).',
      'Enter calibrated ion chamber cavity air mass in milligrams (mg).',
      'Enter mean restricted mass collision stopping power ratio $(S/\rho)_{\text{air}}^{\text{water}}$ (typically 1.13 for 6 MV clinical linac photons).',
      'Inspect calibrated absorbed dose to water in Gray (Gy) and centigray (cGy).'
    ],
    benefitTitle: 'William Henry Bragg & Louis Harold Gray Dosimetry Cavity Law',
    benefitContent: 'Bragg-Gray cavity theory proves that when an ionization chamber is small compared to the range of secondary electrons, the absorbed dose in surrounding tissue is directly proportional to the ionization created in the cavity gas scaled by the stopping power ratio.',
    faqs: [{ q: 'What is the W/e constant for dry air?', a: '$W/e = 33.97\text{ J/C}$ (or 33.97 eV per ion pair) is the fundamental physical constant relating ionization charge to absorbed energy in air.' }]
  },

  // 8. PET Scanner Spatial Resolution & Positron Range Calculator
  {
    slug: 'pet-scan-positron-range-non-collinearity-resolution-calculator',
    name: 'PET Scanner Spatial Resolution & Positron Range (FWHM) Calculator',
    description: 'Calculate Positron Emission Tomography (PET) image spatial resolution (R_FWHM = √(R_det² + R_range² + R_180² + R_block²)) in mm across F-18, C-11, Ga-68, and Rb-82 radiotracers.',
    category: 'Health',
    icon: 'text',
    keywords: ['pet scan spatial resolution calculator', 'positron range fwhm formula f18 ga68 online', 'non collinearity photon angle pet resolution calculator', 'detector crystal width pet spatial resolution online', 'medical physics pet imaging resolution calculator'],
    order: 718,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Radiotracer Isotope (F-18, C-11, Ga-68, Rb-82), Crystal Width d (mm) & Gantry Ring Dia D (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pet-iso">Positron Isotope</label>
          <select class="tool-textarea" id="pet-iso">
            <option value="f18" selected>F-18 (FDG: Low E_max = 0.63 MeV, R_range = 0.54 mm)</option>
            <option value="c11">C-11 (E_max = 0.96 MeV, R_range = 0.92 mm)</option>
            <option value="ga68">Ga-68 (PSMA/Dotatate: E_max = 1.90 MeV, R_range = 2.40 mm)</option>
            <option value="rb82">Rb-82 (Cardiac: E_max = 3.35 MeV, R_range = 5.50 mm)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pet-cryst">Crystal Width d (mm)</label>
          <input class="tool-textarea" id="pet-cryst" type="number" step="0.5" value="4.0" placeholder="4.0 mm LSO" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pet-dia">Gantry Dia D (cm)</label>
          <input class="tool-textarea" id="pet-dia" type="number" step="any" value="80.0" placeholder="80.0 cm Ring" />
        </div>
      </div>
      <div id="pet-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pet-res-fwhm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">R_FWHM = 3.12 mm</span>
            <span class="stat-label">Total Reconstructed PET Spatial Resolution (FWHM)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pet-res-split" style="font-weight:700;">Detector: 2.00 mm | Non-Collinearity: 1.76 mm | Positron Range: 0.54 mm</span>
            <span class="stat-label">Physical Blurring Resolution Components Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const isoEl = document.getElementById('pet-iso'), crystEl = document.getElementById('pet-cryst'), diaEl = document.getElementById('pet-dia');
  const fResEl = document.getElementById('pet-res-fwhm'), spResEl = document.getElementById('pet-res-split');

  const ISOS = {
    'f18':  { r_range: 0.54, name: 'Fluorine-18 (F-18)' },
    'c11':  { r_range: 0.92, name: 'Carbon-11 (C-11)' },
    'ga68': { r_range: 2.40, name: 'Gallium-68 (Ga-68)' },
    'rb82': { r_range: 5.50, name: 'Rubidium-82 (Rb-82)' }
  };

  function update() {
    const iso = ISOS[isoEl.value];
    const dMm = parseFloat(crystEl.value), ringDiaCm = parseFloat(diaEl.value);

    if (isNaN(dMm) || isNaN(ringDiaCm) || dMm <= 0 || ringDiaCm <= 0) return;

    // 1. Geometric detector resolution R_det = d / 2  [mm]
    const R_det = dMm / 2;

    // 2. Photon non-collinearity blurring R_180 = 0.0022 * D_ring  [mm]
    const D_ring_mm = ringDiaCm * 10;
    const R_180 = 0.0022 * D_ring_mm;

    // 3. Positron kinetic range blurring R_range
    const R_range = iso.r_range;

    // 4. Reconstruction filter blurring R_filter approx 1.0 mm
    const R_filter = 1.0;

    // Total FWHM resolution = sqrt( R_det^2 + R_180^2 + R_range^2 + R_filter^2 )
    const R_total = Math.sqrt(Math.pow(R_det, 2) + Math.pow(R_180, 2) + Math.pow(R_range, 2) + Math.pow(R_filter, 2));

    fResEl.textContent = 'R_FWHM = ' + R_total.toFixed(2) + ' mm (Spatial Resolution)';
    spResEl.textContent = 'Detector: ' + R_det.toFixed(2) + ' mm | 180° Acollinearity: ' + R_180.toFixed(2) + ' mm | Positron Range: ' + R_range.toFixed(2) + ' mm (' + iso.name + ')';
  }

  isoEl.addEventListener('change', update);
  crystEl.addEventListener('input', update);
  diaEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select PET radiotracer isotope (Fluorine-18, Carbon-11, Gallium-68, Rubidium-82).',
      'Enter scintillation detector crystal element width in mm (typically 3.0 to 5.0 mm LYSO crystals).',
      'Enter PET gantry ring detector diameter in cm (typically 70 to 85 cm).',
      'Inspect reconstructed Full Width at Half Maximum (FWHM) spatial image resolution in mm.'
    ],
    benefitTitle: 'Physical Fundamental Limits of PET Imaging',
    benefitContent: 'PET spatial resolution is limited by two unavoidable physical phenomena: 1) Positron range before electron-positron annihilation, and 2) Residual thermal momentum causing the two 511 keV gamma photons to emit at $180^\circ \pm 0.25^\circ$ (non-collinearity).',
    faqs: [{ q: 'Why do Ga-68 and Rb-82 have worse image resolution than F-18?', a: 'High-energy positrons emitted by Ga-68 (1.9 MeV) and Rb-82 (3.35 MeV) travel several millimeters through tissue before slowing down and annihilating, adding intrinsic blur.' }]
  },

  // 9. MRI Spin-Lattice T1 and T2 Relaxation Signal Intensity Calculator
  {
    slug: 'mri-spin-lattice-t1-t2-relaxation-signal-calculator',
    name: 'MRI Spin-Lattice T1 & T2 Relaxation Signal Intensity (Spin Echo) Calculator',
    description: 'Calculate Magnetic Resonance Imaging (MRI) spin echo tissue signal intensity (S = S₀ · (1 - e^(-TR / T₁)) · e^(-TE / T₂)) and optimize T1-weighted vs T2-weighted tissue contrast.',
    category: 'Health',
    icon: 'text',
    keywords: ['mri signal intensity calculator', 'spin echo formula s equals s0 1 minus exp minus tr over t1 exp minus te over t2', 'mri t1 t2 weighted image contrast calculator online', 'repetition time tr echo time te mri calculator', 'medical physics mri signal equation online'],
    order: 719,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Repetition Time TR (ms), Echo Time TE (ms) & Tissue Properties (CSF, Brain White/Gray Matter, Fat)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mri-tr">Repetition TR (ms)</label>
          <input class="tool-textarea" id="mri-tr" type="number" step="50" value="500.0" placeholder="500.0 ms (Short TR)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mri-te">Echo TE (ms)</label>
          <input class="tool-textarea" id="mri-te" type="number" step="5" value="15.0" placeholder="15.0 ms (Short TE)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mri-tissue">Tissue (1.5T MRI)</label>
          <select class="tool-textarea" id="mri-tissue">
            <option value="fat" selected>Subcutaneous Fat (T₁ = 250 ms, T₂ = 80 ms)</option>
            <option value="white">Brain White Matter (T₁ = 800 ms, T₂ = 80 ms)</option>
            <option value="gray">Brain Gray Matter (T₁ = 1100 ms, T₂ = 100 ms)</option>
            <option value="csf">Cerebrospinal Fluid CSF (T₁ = 4000 ms, T₂ = 2000 ms)</option>
          </select>
        </div>
      </div>
      <div id="mri-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mri-res-sig" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Relative Signal S = 0.716 (Bright)</span>
            <span class="stat-label">Relative MRI Spin Echo Signal Intensity (S / S₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mri-res-wt" style="color:var(--green-dark); font-weight:700;">T1-WEIGHTED CONTRAST (Short TR < 600ms, Short TE < 25ms: Fat Bright, Fluid Dark)</span>
            <span class="stat-label">Image Contrast Weighting Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const trEl = document.getElementById('mri-tr'), teEl = document.getElementById('mri-te'), tisEl = document.getElementById('mri-tissue');
  const sResEl = document.getElementById('mri-res-sig'), wtResEl = document.getElementById('mri-res-wt');

  const TISSUES = {
    'fat':   { t1: 250,  t2: 80,   name: 'Lipid / Fat' },
    'white': { t1: 800,  t2: 80,   name: 'White Matter' },
    'gray':  { t1: 1100, t2: 100,  name: 'Gray Matter' },
    'csf':   { t1: 4000, t2: 2000, name: 'CSF Water' }
  };

  function update() {
    const t = TISSUES[tisEl.value];
    const TR = parseFloat(trEl.value), TE = parseFloat(teEl.value);

    if (isNaN(TR) || isNaN(TE) || TR <= 0 || TE < 0) return;

    // Spin echo equation: S = ( 1 - exp(-TR / T1) ) * exp(-TE / T2)
    const t1Term = 1.0 - Math.exp(-TR / t.t1);
    const t2Term = Math.exp(-TE / t.t2);
    const S = t1Term * t2Term;

    let weighting = '';
    let color = '#22543d';

    if (TR < 800 && TE < 30) {
      weighting = 'T1-WEIGHTED: Anatomy mapping (Fat bright, CSF dark)';
      color = '#22543d';
    } else if (TR > 2000 && TE > 70) {
      weighting = 'T2-WEIGHTED: Pathology & Edema detection (Water/CSF bright)';
      color = '#2563eb';
    } else if (TR > 2000 && TE < 30) {
      weighting = 'PROTON DENSITY (PD-WEIGHTED): High SNR tissue density mapping';
      color = '#d97706';
    } else {
      weighting = 'MIXED T1/T2 WEIGHTING (Intermediate Contrast)';
      color = '#4a5568';
    }

    sResEl.textContent = 'Signal S = ' + S.toFixed(3) + ' (' + (S * 100).toFixed(1) + '% Max | T₁ Recov: ' + (t1Term*100).toFixed(0) + '%, T₂ Decay: ' + (t2Term*100).toFixed(0) + '%)';
    wtResEl.textContent = weighting + ' - ' + t.name;
    wtResEl.style.color = color;
  }

  [trEl, teEl].forEach(el => el.addEventListener('input', update));
  tisEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter Repetition Time TR in milliseconds.',
      'Enter Echo Time TE in milliseconds.',
      'Select anatomical tissue type (Subcutaneous Fat, Brain White Matter, Brain Gray Matter, Cerebrospinal Fluid CSF).',
      'Inspect relative spin-echo signal amplitude and identify whether the pulse sequence produces T1-weighted, T2-weighted, or Proton Density (PD) image contrast.'
    ],
    benefitTitle: 'Felix Bloch & Edward Purcell 1946 Nuclear Magnetic Resonance',
    benefitContent: 'MRI creates versatile diagnostic soft-tissue contrast without ionizing radiation by adjusting sequence timing ($TR, TE$); short TR highlights differences in longitudinal $T_1$ thermal recovery, while long TE highlights transverse $T_2$ spin dephasing in edema and tumors.',
    faqs: [{ q: 'Why is CSF dark on T1-weighted but bright on T2-weighted MRI?', a: 'CSF water molecules tumble rapidly, giving them very long $T_1$ ($4,000\text{ ms}$, unable to recover during short TR) and very long $T_2$ ($2,000\text{ ms}$, maintaining signal during long TE).' }]
  },

  // 10. Computed Tomography (CT) Hounsfield Unit (HU) Attenuation Calculator
  {
    slug: 'xray-ct-hounsfield-unit-attenuation-calculator',
    name: 'X-Ray CT Hounsfield Unit (HU) Linear Attenuation Coefficient Calculator',
    description: 'Calculate Computed Tomography X-ray attenuation Hounsfield Units (HU = 1000 · (μ - μ_water) / (μ_water - μ_air)) and identify tissue types (Air -1000, Lung -700, Fat -100, Water 0, Muscle +40, Bone +1000).',
    category: 'Health',
    icon: 'text',
    keywords: ['hounsfield unit calculator', 'ct hu number linear attenuation coefficient formula online', 'computed tomography hounsfield scale tissue calculator', 'ct window width window level hu calculator', 'medical imaging ct density online'],
    order: 720,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tissue Attenuation μ (cm⁻¹) or Preset Tissue Selection @ 120 kVp X-Ray Beam',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hu-tissue">Tissue Preset</label>
          <select class="tool-textarea" id="hu-tissue">
            <option value="water" selected>Water (Reference: μ = 0.200 cm⁻¹, HU = 0)</option>
            <option value="air">Air (-1000 HU: μ = 0.0002 cm⁻¹)</option>
            <option value="lung">Lung (-700 HU: μ = 0.060 cm⁻¹)</option>
            <option value="fat">Adipose / Fat (-100 HU: μ = 0.180 cm⁻¹)</option>
            <option value="muscle">Muscle / Soft Tissue (+40 HU: μ = 0.208 cm⁻¹)</option>
            <option value="blood">Blood Clot / Hemorrhage (+80 HU: μ = 0.216 cm⁻¹)</option>
            <option value="bone">Cortical Dense Bone (+1000 HU: μ = 0.400 cm⁻¹)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hu-mu">Linear Coeff μ (cm⁻¹)</label>
          <input class="tool-textarea" id="hu-mu" type="number" step="0.005" value="0.200" placeholder="0.200 cm⁻¹" />
        </div>
      </div>
      <div id="hu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hu-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0 HU (Pure Water Reference)</span>
            <span class="stat-label">Hounsfield Unit Number (HU)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hu-res-win" style="font-weight:700;">Recommended Window: Soft Tissue (WL = 40 HU, WW = 400 HU)</span>
            <span class="stat-label">Standard Clinical Radiologist Window / Level Preset</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tisEl = document.getElementById('hu-tissue'), muEl = document.getElementById('hu-mu');
  const hResEl = document.getElementById('hu-res-val'), wResEl = document.getElementById('hu-res-win');

  const mu_water = 0.200; // cm^-1 @ 120 kVp
  const mu_air = 0.0002;

  const PRESETS = {
    'water':  { mu: 0.200, hu: 0, win: 'Mediastinum (WL = 40, WW = 400)' },
    'air':    { mu: 0.0002, hu: -1000, win: 'Lung Window (WL = -600, WW = 1500)' },
    'lung':   { mu: 0.060, hu: -700, win: 'Lung Window (WL = -600, WW = 1500)' },
    'fat':    { mu: 0.180, hu: -100, win: 'Abdominal Soft Tissue (WL = 40, WW = 350)' },
    'muscle': { mu: 0.208, hu: 40, win: 'Soft Tissue (WL = 40, WW = 400)' },
    'blood':  { mu: 0.216, hu: 80, win: 'Brain Stroke / Hemorrhage (WL = 40, WW = 80)' },
    'bone':   { mu: 0.400, hu: 1000, win: 'Bone Window (WL = 400, WW = 2000)' }
  };

  function update() {
    const mu = parseFloat(muEl.value);
    if (isNaN(mu) || mu < 0) return;

    // HU = 1000 * (mu - mu_water) / (mu_water - mu_air)
    const HU = Math.round(1000 * (mu - mu_water) / (mu_water - mu_air));

    let tissueDesc = '';
    if (HU <= -900) tissueDesc = 'Air / Gas Space (-1000 HU)';
    else if (HU <= -400) tissueDesc = 'Aerated Lung Parenchyma (-700 to -500 HU)';
    else if (HU <= -30) tissueDesc = 'Adipose / Fat Tissue (-120 to -60 HU)';
    else if (HU <= 15) tissueDesc = 'Water / Simple Serous Fluid (0 to 15 HU)';
    else if (HU <= 45) tissueDesc = 'Soft Tissue / Muscle (+35 to +45 HU)';
    else if (HU <= 90) tissueDesc = 'Acute Clotted Blood / Hemorrhage (+60 to +85 HU)';
    else if (HU <= 300) tissueDesc = 'Trabecular Cancellous Bone (+150 to +300 HU)';
    else tissueDesc = 'Dense Cortical Bone / Calcification / Metal Artifact (>+500 HU)';

    hResEl.textContent = (HU >= 0 ? '+' : '') + HU + ' HU (' + tissueDesc + ')';
    wResEl.textContent = 'Linear Attenuation μ = ' + mu.toFixed(4) + ' cm⁻¹ | Standard Clinical Windowing: ' + PRESETS[tisEl.value].win;
  }

  tisEl.addEventListener('change', () => {
    muEl.value = PRESETS[tisEl.value].mu;
    update();
  });
  muEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select tissue preset or enter effective linear X-ray attenuation coefficient $\mu$ in $\text{cm}^{-1}$.',
      'Inspect calibrated Hounsfield Unit (HU) CT number and recommended radiological Window Level (WL) and Window Width (WW) display settings.'
    ],
    benefitTitle: 'Sir Godfrey Hounsfield 1972 CT Numbers',
    benefitContent: 'The Hounsfield scale normalizes raw scanner attenuation relative to distilled water ($0\text{ HU}$) and vacuum air ($-1000\text{ HU}$), providing a universally standardized quantitative scale for detecting internal brain hemorrhages ($+80\text{ HU}$) and soft tissue tumors.',
    faqs: [{ q: 'Why is acute hematoma clotted blood hyperdense (+80 HU)?', a: 'As a blood clot retracts, globin protein and iron hemoglobin concentrate, increasing physical density and photoelectric X-ray absorption compared to circulating blood (+40 HU).' }]
  },

  // --- Suite CCCCC: Financial Engineering & Quantitative Risk (Black-Scholes & Greeks) (841 - 845) ---
  // 11. Black-Scholes-Merton Option Pricing & Greeks Calculator
  {
    slug: 'black-scholes-merton-option-greeks-delta-gamma-calculator',
    name: 'Black-Scholes Option Pricing & Greeks (Delta, Gamma, Vega, Theta) Calculator',
    description: 'Calculate European call/put option fair value and first/second-order risk Greeks (Delta Δ, Gamma Γ, Vega ν, Theta Θ, Rho ρ) from spot price S, strike K, volatility σ, and risk-free rate r.',
    category: 'Finance',
    icon: 'text',
    keywords: ['black scholes calculator', 'option greeks formula delta gamma vega theta online', 'black scholes merton option pricing calculator', 'implied volatility call put option price calculator', 'quantitative finance option greeks online'],
    order: 721,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Spot Price S ($), Strike K ($), Time to Expiry T (Years), Volatility σ (%) & Risk-Free Rate r (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bs-s">Spot S ($)</label>
          <input class="tool-textarea" id="bs-s" type="number" step="any" value="100.0" placeholder="100.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-k">Strike K ($)</label>
          <input class="tool-textarea" id="bs-k" type="number" step="any" value="100.0" placeholder="100.0 (ATM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-t">Time T (Years)</label>
          <input class="tool-textarea" id="bs-t" type="number" step="any" value="0.25" placeholder="0.25 (3 Months)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-vol">Volatility σ (%)</label>
          <input class="tool-textarea" id="bs-vol" type="number" step="any" value="25.0" placeholder="25.0 %" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-r">Rate r (%)</label>
          <input class="tool-textarea" id="bs-r" type="number" step="any" value="5.0" placeholder="5.0 %" />
        </div>
      </div>
      <div id="bs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bs-res-price" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Call: $5.60 | Put: $4.36</span>
            <span class="stat-label">Black-Scholes Fair Value Option Price</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bs-res-greeks" style="font-weight:700;">Δ_call = +0.565 | Γ = 0.0315 | Vega = 0.197 | Θ_call = -$0.038/day</span>
            <span class="stat-label">Option Greeks Sensitivity Profile</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('bs-s'), kEl = document.getElementById('bs-k');
  const tEl = document.getElementById('bs-t'), volEl = document.getElementById('bs-vol'), rEl = document.getElementById('bs-r');
  const pResEl = document.getElementById('bs-res-price'), gResEl = document.getElementById('bs-res-greeks');

  // Standard normal cumulative distribution N(x) approximation (Hart formula)
  function CND(x) {
    const a1 = 0.31938153, a2 = -0.356563782, a3 = 1.781477937, a4 = -1.821255978, a5 = 1.330274429;
    const L = Math.abs(x);
    const K = 1.0 / (1.0 + (0.2316419 * L));
    let cnd = 1.0 - (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * L * L) * (a1 * K + a2 * Math.pow(K, 2) + a3 * Math.pow(K, 3) + a4 * Math.pow(K, 4) + a5 * Math.pow(K, 5));
    if (x < 0) cnd = 1.0 - cnd;
    return cnd;
  }

  function PDF(x) {
    return (1.0 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
  }

  function update() {
    const S = parseFloat(sEl.value), K = parseFloat(kEl.value);
    const T = parseFloat(tEl.value), volPct = parseFloat(volEl.value), rPct = parseFloat(rEl.value);

    if (isNaN(S) || isNaN(K) || isNaN(T) || isNaN(volPct) || isNaN(rPct) || S <= 0 || K <= 0 || T <= 0 || volPct <= 0) return;

    const sigma = volPct / 100;
    const r = rPct / 100;

    // d1 = ( ln(S/K) + (r + sigma^2/2)*T ) / ( sigma * sqrt(T) )
    const sqrtT = Math.sqrt(T);
    const d1 = (Math.log(S / K) + ((r + (Math.pow(sigma, 2) / 2)) * T)) / (sigma * sqrtT);
    const d2 = d1 - (sigma * sqrtT);

    const Nd1 = CND(d1);
    const Nd2 = CND(d2);
    const N_minus_d1 = CND(-d1);
    const N_minus_d2 = CND(-d2);
    const pdf_d1 = PDF(d1);

    // Call = S*N(d1) - K*exp(-r*T)*N(d2)
    const callPrice = (S * Nd1) - (K * Math.exp(-r * T) * Nd2);
    // Put = K*exp(-r*T)*N(-d2) - S*N(-d1)
    const putPrice = (K * Math.exp(-r * T) * N_minus_d2) - (S * N_minus_d1);

    // Greeks:
    const deltaCall = Nd1;
    const deltaPut = Nd1 - 1.0;
    const gamma = pdf_d1 / (S * sigma * sqrtT);
    const vega = (S * sqrtT * pdf_d1) / 100; // per 1% change in vol
    const thetaCallPerDay = (-( (S * pdf_d1 * sigma) / (2 * sqrtT) ) - (r * K * Math.exp(-r * T) * Nd2)) / 365;

    pResEl.textContent = 'Call: $' + callPrice.toFixed(2) + ' | Put: $' + putPrice.toFixed(2);
    gResEl.textContent = 'Δ_call: +' + deltaCall.toFixed(3) + ' (Put Δ: ' + deltaPut.toFixed(3) + ') | Γ: ' + gamma.toFixed(4) + ' | Vega: $' + vega.toFixed(3) + '/% | Θ: -$' + Math.abs(thetaCallPerDay).toFixed(3) + '/day';
  }

  [sEl, kEl, tEl, volEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter current underlying stock spot price S in dollars.',
      'Enter option contract strike price K in dollars.',
      'Enter time to expiration T in years (e.g. 0.25 for 3 months / 90 days).',
      'Enter annualized implied volatility $\sigma$ in %.',
      'Enter risk-free interest rate r in %.',
      'Inspect theoretical Call and Put prices alongside risk sensitivity Greeks (Delta, Gamma, Vega, Theta).'
    ],
    benefitTitle: 'Fischer Black, Myron Scholes & Robert Merton 1973 Nobel Model',
    benefitContent: 'Black-Scholes prices options by constructing a riskless dynamically delta-hedged replicating portfolio ($\Delta = \partial V / \partial S$); institutional market makers manage Gamma ($\partial^2 V / \partial S^2$) and Vega ($\partial V / \partial \sigma$) to maintain market neutrality.',
    faqs: [{ q: 'What does Delta (Δ) represent?', a: 'Delta measures the expected dollar change in option price for a $1.00 move in the underlying stock, and closely approximates the probability of the option expiring in-the-money.' }]
  },

  // 12. Parametric Value-at-Risk (VaR) & Expected Shortfall (CVaR) Calculator
  {
    slug: 'value-at-risk-var-parametric-monte-carlo-calculator',
    name: 'Portfolio Value-at-Risk (VaR) & Conditional VaR (Expected Shortfall) Calculator',
    description: 'Calculate quantitative financial portfolio Value-at-Risk (VaR_α = Portfolio · z_α · σ · √t) and Conditional VaR (CVaR / Expected Shortfall) at 95% and 99% confidence intervals.',
    category: 'Finance',
    icon: 'text',
    keywords: ['value at risk calculator', 'var formula parametric delta normal online', 'conditional var expected shortfall cvar calculator', 'portfolio risk management var 95 99 calculator', 'financial risk quantitative var online'],
    order: 722,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Portfolio Value ($), Daily Volatility σ_daily (%), Time Horizon (Days) & Confidence (95% or 99%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="var-port">Portfolio Value ($)</label>
          <input class="tool-textarea" id="var-port" type="number" step="any" value="1000000" placeholder="1000000 ($1M)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="var-vol">Daily Volatility σ (%)</label>
          <input class="tool-textarea" id="var-vol" type="number" step="any" value="1.25" placeholder="1.25 % (Daily Vol)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="var-days">Horizon (Days)</label>
          <input class="tool-textarea" id="var-days" type="number" step="1" value="10" placeholder="10 Days (Basel III)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="var-conf">Confidence Level</label>
          <select class="tool-textarea" id="var-conf">
            <option value="99" selected>99% Confidence (z = 2.326 - Basel Standard)</option>
            <option value="95">95% Confidence (z = 1.645)</option>
            <option value="99.9">99.9% Confidence (z = 3.090 - Economic Capital)</option>
          </select>
        </div>
      </div>
      <div id="var-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="var-res-var" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">VaR = $91,950 (9.20%)</span>
            <span class="stat-label">Parametric Value-at-Risk (10-Day Max Loss @ 99%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="var-res-cvar" style="font-weight:700;">CVaR (Expected Shortfall): $105,300 (Average loss in tail beyond 99%)</span>
            <span class="stat-label">Conditional VaR (Expected Shortfall Beyond Cutoff)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('var-port'), vEl = document.getElementById('var-vol');
  const dEl = document.getElementById('var-days'), cEl = document.getElementById('var-conf');
  const vResEl = document.getElementById('var-res-var'), cvResEl = document.getElementById('var-res-cvar');

  const Z_SCORES = {
    '95':   { z: 1.644853, esFactor: 2.0627 },
    '99':   { z: 2.326348, esFactor: 2.6652 },
    '99.9': { z: 3.090232, esFactor: 3.3671 }
  };

  function update() {
    const portVal = parseFloat(pEl.value), volPct = parseFloat(vEl.value), days = parseFloat(dEl.value);
    const conf = Z_SCORES[cEl.value];

    if (isNaN(portVal) || isNaN(volPct) || isNaN(days) || portVal <= 0 || volPct <= 0 || days <= 0) return;

    const sigmaDaily = volPct / 100;
    // Multi-day volatility: sigma_T = sigma_daily * sqrt(days)
    const sigmaHorizon = sigmaDaily * Math.sqrt(days);

    // Parametric VaR = Portfolio * z * sigma_T
    const VaR = portVal * conf.z * sigmaHorizon;
    const varPct = (VaR / portVal) * 100;

    // Expected Shortfall (CVaR) for normal distribution: CVaR = Portfolio * (pdf(z) / (1-alpha)) * sigma_T
    const CVaR = portVal * conf.esFactor * sigmaHorizon;
    const cvarPct = (CVaR / portVal) * 100;

    vResEl.textContent = 'VaR = $' + Math.round(VaR).toLocaleString() + ' (' + varPct.toFixed(2) + '% of Portfolio)';
    cvResEl.textContent = 'CVaR (Expected Shortfall): $' + Math.round(CVaR).toLocaleString() + ' (' + cvarPct.toFixed(2) + '% Tail Loss | ' + days + '-Day Horizon @ ' + cEl.value + '% Conf)';
  }

  [pEl, vEl, dEl].forEach(el => el.addEventListener('input', update));
  cEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter total investment portfolio capital value in dollars.',
      'Enter daily return standard deviation volatility $\sigma_{\text{daily}}$ in %.',
      'Enter risk time horizon in days (e.g. 10 days for Basel regulatory market risk).',
      'Select statistical confidence level (95%, 99%, or 99.9%).',
      'Inspect Value-at-Risk (VaR) maximum expected loss threshold and Conditional VaR (Expected Shortfall) average tail loss.'
    ],
    benefitTitle: 'J.P. Morgan 1994 RiskMetrics & Basel Regulatory Capital',
    benefitContent: 'VaR quantifies market risk into a single dollar figure ($VaR = P \cdot z \cdot \sigma \sqrt{t}$); because standard VaR ignores the magnitude of catastrophic tail risk beyond the cutoff, modern Basel III / IV banking rules mandate Expected Shortfall (CVaR).',
    faqs: [{ q: 'What is the square root of time rule in VaR?', a: 'Under the random walk assumption of independent daily returns, multi-period volatility scales with the square root of time ($\sigma_T = \sigma_1 \sqrt{T}$).' }]
  },

  // 13. Bond Macaulay & Modified Duration & Convexity Calculator
  {
    slug: 'bond-macaulay-modified-duration-convexity-calculator',
    name: 'Bond Macaulay Duration, Modified Duration & Convexity Price Sensitivity Calculator',
    description: 'Calculate fixed income bond Macaulay duration in years, Modified duration (D_mod = D_mac / (1 + y/m)), convexity C, and percentage price change (ΔP/P ≈ -D_mod·Δy + 1/2·C·(Δy)²) for interest rate shifts.',
    category: 'Finance',
    icon: 'text',
    keywords: ['bond duration calculator', 'macaulay modified duration formula online', 'bond convexity price sensitivity calculator', 'interest rate risk bond duration calculator online', 'fixed income modified duration calculator'],
    order: 723,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Coupon Rate (%), Yield to Maturity YTM (%), Maturity (Years) & Interest Rate Shift Δy (bps)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bnd-coup">Coupon (%)</label>
          <input class="tool-textarea" id="bnd-coup" type="number" step="any" value="5.0" placeholder="5.0 % Annual" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bnd-ytm">Yield YTM (%)</label>
          <input class="tool-textarea" id="bnd-ytm" type="number" step="any" value="6.0" placeholder="6.0 % YTM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bnd-mat">Maturity (Years)</label>
          <input class="tool-textarea" id="bnd-mat" type="number" step="1" value="10" placeholder="10 Years" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bnd-dy">Rate Shift (bps)</label>
          <input class="tool-textarea" id="bnd-dy" type="number" step="25" value="100" placeholder="100 bps (+1.0%)" />
        </div>
      </div>
      <div id="bnd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bnd-res-dur" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D_mod = 7.36 Years</span>
            <span class="stat-label">Modified Duration (Macaulay: 7.80 Years)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bnd-res-pdrop" style="font-weight:700;">Price Impact: -6.99% for +100 bps Hike (Convexity C = 74.5)</span>
            <span class="stat-label">Convexity-Adjusted Price Sensitivity (ΔP/P)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('bnd-coup'), yEl = document.getElementById('bnd-ytm');
  const mEl = document.getElementById('bnd-mat'), dyEl = document.getElementById('bnd-dy');
  const dResEl = document.getElementById('bnd-res-dur'), pResEl = document.getElementById('bnd-res-pdrop');

  function update() {
    const couponPct = parseFloat(cEl.value), ytmPct = parseFloat(yEl.value);
    const nYears = parseInt(mEl.value, 10), dyBps = parseFloat(dyEl.value);

    if (isNaN(couponPct) || isNaN(ytmPct) || isNaN(nYears) || isNaN(dyBps) || nYears <= 0 || ytmPct <= 0) return;

    const c = couponPct / 100;
    const y = ytmPct / 100;
    const dy = dyBps / 10000; // bps to decimal (100 bps = 0.01)

    // Calculate bond price P = sum( C / (1+y)^t ) + Face / (1+y)^N where Face = 100
    let price = 0;
    let macNum = 0;
    let convNum = 0;

    for (let t = 1; t <= nYears; t++) {
      const cashflow = t === nYears ? (100 * c) + 100 : (100 * c);
      const pv = cashflow / Math.pow(1 + y, t);
      price += pv;
      macNum += t * pv;
      convNum += t * (t + 1) * pv;
    }

    // Macaulay duration = macNum / Price  [years]
    const D_mac = macNum / price;
    // Modified duration = D_mac / (1 + y)  [years]
    const D_mod = D_mac / (1 + y);

    // Convexity C = convNum / ( Price * (1+y)^2 )
    const Convexity = convNum / (price * Math.pow(1 + y, 2));

    // Taylor series price change: deltaP_P = -D_mod * dy + 0.5 * Convexity * dy^2
    const deltaP_P_linear = -D_mod * dy;
    const deltaP_P_convex = deltaP_P_linear + (0.5 * Convexity * Math.pow(dy, 2));
    const deltaP_pct = deltaP_P_convex * 100;

    dResEl.textContent = 'D_mod = ' + D_mod.toFixed(2) + ' Years (Macaulay: ' + D_mac.toFixed(2) + ' Years)';
    pResEl.textContent = 'Price Change: ' + (deltaP_pct >= 0 ? '+' : '') + deltaP_pct.toFixed(2) + '% for ' + (dyBps >= 0 ? '+' : '') + dyBps + ' bps shift (Bond Price: $' + price.toFixed(2) + ', Convexity: ' + Convexity.toFixed(1) + ')';
  }

  [cEl, yEl, mEl, dyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter annual coupon interest rate in %.',
      'Enter annual Yield to Maturity (YTM) discount rate in %.',
      'Enter remaining bond maturity in years.',
      'Enter market benchmark interest rate shift in basis points (bps, where 100 bps = 1.00%).',
      'Inspect Macaulay duration in years, Modified duration ($D_{\text{mod}}$), portfolio convexity C, and accurate percentage bond price movement.'
    ],
    benefitTitle: 'Frederick Macaulay 1938 Duration & Convexity Curvature',
    benefitContent: 'Modified duration estimates linear interest rate price sensitivity ($\Delta P/P \approx -D_{\text{mod}}\Delta y$); adding the second-order positive convexity term ($\frac{1}{2} C (\Delta y)^2$) captures the non-linear curvature of bond pricing, showing that bond prices gain more when rates fall than they lose when rates rise.',
    faqs: [{ q: 'Why is positive convexity desirable in bond investing?', a: 'Bonds with high positive convexity experience greater price appreciation when interest rates drop and lesser price declines when interest rates climb.' }]
  },

  // 14. Capital Asset Pricing Model (CAPM) Expected Return & Beta Calculator
  {
    slug: 'capm-capital-asset-pricing-model-beta-alpha-calculator',
    name: 'CAPM Expected Return (E(R_i) = R_f + β_i·(E(R_m) - R_f)) & Jensen Alpha Calculator',
    description: 'Calculate equity cost of capital expected return (E(R_i) = R_f + β · (E(R_m) - R_f)) and Jensen\'s Alpha (α = R_actual - E(R_i)) from asset systematic market Beta.',
    category: 'Finance',
    icon: 'text',
    keywords: ['capm calculator', 'capital asset pricing model formula expected return online', 'jensen alpha beta calculator online', 'cost of equity capm market risk premium calculator', 'security market line sml capm online'],
    order: 724,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Risk-Free Rate R_f (%), Asset Systematic Beta β, Expected Market Return E(R_m) (%) & Actual Return (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cpm-rf">Risk-Free R_f (%)</label>
          <input class="tool-textarea" id="cpm-rf" type="number" step="any" value="4.50" placeholder="4.50 % (US Treasury)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpm-beta">Asset Beta β</label>
          <input class="tool-textarea" id="cpm-beta" type="number" step="0.05" value="1.25" placeholder="1.25 (Growth Stock)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpm-rm">Market E(R_m) (%)</label>
          <input class="tool-textarea" id="cpm-rm" type="number" step="any" value="10.00" placeholder="10.00 % (S&P 500)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpm-ract">Actual Return (%)</label>
          <input class="tool-textarea" id="cpm-ract" type="number" step="any" value="13.50" placeholder="13.50 % Actual" />
        </div>
      </div>
      <div id="cpm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cpm-res-er" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">E(R) = 11.38% Cost of Equity</span>
            <span class="stat-label">CAPM Required Expected Return (E(R_i))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cpm-res-alpha" style="color:var(--green-dark); font-weight:700;">Jensen's Alpha α = +2.12% (Positive Outperformance above SML)</span>
            <span class="stat-label">Risk-Adjusted Alpha (α = R_actual - E(R))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rfEl = document.getElementById('cpm-rf'), betaEl = document.getElementById('cpm-beta');
  const rmEl = document.getElementById('cpm-rm'), ractEl = document.getElementById('cpm-ract');
  const erResEl = document.getElementById('cpm-res-er'), aResEl = document.getElementById('cpm-res-alpha');

  function update() {
    const Rf = parseFloat(rfEl.value), beta = parseFloat(betaEl.value);
    const Rm = parseFloat(rmEl.value), Ract = parseFloat(ractEl.value);

    if (isNaN(Rf) || isNaN(beta) || isNaN(Rm) || isNaN(Ract)) return;

    // Market Risk Premium MRP = Rm - Rf
    const MRP = Rm - Rf;

    // CAPM Expected Return E(Ri) = Rf + beta * (Rm - Rf)  [%]
    const ER = Rf + (beta * MRP);

    // Jensen's Alpha = R_actual - E(Ri)
    const alpha = Ract - ER;

    erResEl.textContent = 'E(R) = ' + ER.toFixed(2) + '% (Market Premium: ' + MRP.toFixed(2) + '%)';

    let alphaText = '';
    let color = '#22543d';

    if (alpha > 0) {
      alphaText = 'Jensen\'s Alpha α = +' + alpha.toFixed(2) + '% (OUTPERFORMANCE: Beats Security Market Line by ' + alpha.toFixed(2) + '%)';
      color = '#22543d';
    } else if (alpha < 0) {
      alphaText = 'Jensen\'s Alpha α = ' + alpha.toFixed(2) + '% (UNDERPERFORMANCE: Fails to compensate for systematic risk β = ' + beta + ')';
      color = '#c53030';
    } else {
      alphaText = 'Jensen\'s Alpha α = 0.00% (Exactly on Security Market Line)';
      color = '#2563eb';
    }

    aResEl.textContent = alphaText;
    aResEl.style.color = color;
  }

  [rfEl, betaEl, rmEl, ractEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter risk-free benchmark discount rate $R_f$ in % (e.g. 10-Year US Treasury yield).',
      'Enter asset systematic covariance market Beta $\beta$ ($\beta=1.0$ matches the market index).',
      'Enter expected broad market equity return $E(R_m)$ in %.',
      'Enter actual annualized investment portfolio return in %.',
      'Inspect CAPM required hurdle rate / cost of equity $E(R_i)$ and risk-adjusted Jensen\'s Alpha $\alpha$.'
    ],
    benefitTitle: 'William Sharpe 1964 Capital Asset Pricing Model',
    benefitContent: 'CAPM establishes that investors only receive compensation for non-diversifiable systematic market risk ($\beta$); idiosyncratic firm-specific risk can be eliminated entirely through portfolio diversification without expected return sacrifice.',
    faqs: [{ q: 'What does a Beta > 1.0 indicate?', a: 'A Beta of 1.25 means the stock is 25% more volatile than the broad market; when the index rises 10%, the stock is expected to gain 12.5%.' }]
  },

  // 15. Sharpe, Sortino & Treynor Portfolio Risk-Adjusted Ratios Calculator
  {
    slug: 'sharpe-sortino-treynor-portfolio-risk-ratios-calculator',
    name: 'Portfolio Risk-Adjusted Returns (Sharpe, Sortino & Treynor Ratios) Calculator',
    description: 'Calculate investment performance metrics: Sharpe Ratio ((R_p - R_f) / σ_p), Sortino Ratio ((R_p - R_f) / σ_downside), and Treynor Ratio ((R_p - R_f) / β_p).',
    category: 'Finance',
    icon: 'text',
    keywords: ['sharpe ratio calculator', 'sortino ratio formula downside deviation online', 'treynor ratio portfolio performance calculator', 'risk adjusted return investment calculator online', 'hedge fund performance ratios online'],
    order: 725,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Portfolio Return R_p (%), Risk-Free R_f (%), Total Volatility σ (%), Downside Deviation σ_d (%) & Beta β',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rt-rp">Portfolio R_p (%)</label>
          <input class="tool-textarea" id="rt-rp" type="number" step="any" value="14.0" placeholder="14.0 % Annual" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-rf">Risk-Free R_f (%)</label>
          <input class="tool-textarea" id="rt-rf" type="number" step="any" value="4.0" placeholder="4.0 %" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-sig">Total Vol σ (%)</label>
          <input class="tool-textarea" id="rt-sig" type="number" step="any" value="12.0" placeholder="12.0 % Total StDev" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-dvol">Downside σ_d (%)</label>
          <input class="tool-textarea" id="rt-dvol" type="number" step="any" value="7.5" placeholder="7.5 % Downside Vol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-beta">Beta β</label>
          <input class="tool-textarea" id="rt-beta" type="number" step="0.05" value="0.90" placeholder="0.90 Beta" />
        </div>
      </div>
      <div id="rt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rt-res-shp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Sharpe: 0.833 | Sortino: 1.333</span>
            <span class="stat-label">Total Volatility vs Downside Risk Efficiency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rt-res-try" style="font-weight:700;">Treynor Ratio = 11.11% / Beta (Excess Return per Unit Systematic Risk)</span>
            <span class="stat-label">Treynor Systematic Risk Performance Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rpEl = document.getElementById('rt-rp'), rfEl = document.getElementById('rt-rf');
  const sigEl = document.getElementById('rt-sig'), dvolEl = document.getElementById('rt-dvol'), bEl = document.getElementById('rt-beta');
  const shResEl = document.getElementById('rt-res-shp'), trResEl = document.getElementById('rt-res-try');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value);
    const sigma = parseFloat(sigEl.value), sigmaDown = parseFloat(dvolEl.value), beta = parseFloat(bEl.value);

    if (isNaN(Rp) || isNaN(Rf) || isNaN(sigma) || isNaN(sigmaDown) || isNaN(beta) || sigma <= 0 || sigmaDown <= 0 || beta <= 0) return;

    const excessReturn = Rp - Rf;

    // Sharpe Ratio = (Rp - Rf) / sigma
    const sharpe = excessReturn / sigma;

    // Sortino Ratio = (Rp - Rf) / sigma_downside
    const sortino = excessReturn / sigmaDown;

    // Treynor Ratio = (Rp - Rf) / beta
    const treynor = excessReturn / beta;

    shResEl.textContent = 'Sharpe: ' + sharpe.toFixed(2) + ' | Sortino: ' + sortino.toFixed(2);
    trResEl.textContent = 'Treynor: ' + treynor.toFixed(2) + '% | Excess Return: +' + excessReturn.toFixed(1) + '% above R_f (Sortino/Sharpe Ratio: ' + (sortino/sharpe).toFixed(2) + '×)';
  }

  [rpEl, rfEl, sigEl, dvolEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter annualized portfolio investment return $R_p$ in %.',
      'Enter risk-free cash return $R_f$ in %.',
      'Enter total annualized portfolio return standard deviation volatility $\sigma$ in %.',
      'Enter semi-deviation downside volatility $\sigma_d$ in % (penalizes only negative return drawdowns).',
      'Enter portfolio market covariance Beta $\beta$.',
      'Inspect Sharpe Ratio, Sortino Ratio, and Treynor Ratio.'
    ],
    benefitTitle: 'Total Volatility vs Harmful Downside Risk',
    benefitContent: 'While the Sharpe Ratio penalizes upside gains equally with downside crashes, the Sortino Ratio divides excess return purely by downside volatility ($\sigma_{\text{down}}$), providing a superior risk metric for asymmetrical hedge fund strategies and options trading.',
    faqs: [{ q: 'What is considered a good Sharpe Ratio?', a: 'A Sharpe ratio $> 1.0$ is considered good, $> 2.0$ is very good, and $> 3.0$ is elite top-tier hedge fund performance.' }]
  },

  // --- Suite DDDDD: Structural Dynamics, Earthquake Engineering & Response Spectrum (846 - 850) ---
  // 16. Single Degree of Freedom (SDOF) Structural Natural Frequency & Damping Calculator
  {
    slug: 'single-degree-of-freedom-sdof-natural-frequency-damping-calculator',
    name: 'Single Degree of Freedom (SDOF) Natural Frequency & Damping Calculator',
    description: 'Calculate building structural dynamics SDOF natural circular frequency (ω_n = √(k / m)), natural period (T_n = 2π / ω_n) in seconds, and damped frequency (f_d = f_n · √(1 - ζ²)).',
    category: 'Science',
    icon: 'text',
    keywords: ['sdof natural frequency calculator', 'structural dynamics natural period formula 2 pi sqrt m over k', 'damped natural frequency calculator online', 'building structural stiffness mass period calculator', 'earthquake structural dynamics sdof online'],
    order: 726,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Structural Floor Mass m (Tonnes), Lateral Stiffness k (kN/m) & Damping Ratio ζ (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sdof-m">Mass m (Tonnes)</label>
          <input class="tool-textarea" id="sdof-m" type="number" step="any" value="250.0" placeholder="250.0 Tonnes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sdof-k">Stiffness k (kN/m)</label>
          <input class="tool-textarea" id="sdof-k" type="number" step="any" value="40000.0" placeholder="40000.0 kN/m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sdof-zeta">Damping ζ (%)</label>
          <input class="tool-textarea" id="sdof-zeta" type="number" step="0.5" value="5.0" placeholder="5.0 % (Concrete)" />
        </div>
      </div>
      <div id="sdof-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sdof-res-tn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T_n = 0.497 s (f_n = 2.01 Hz)</span>
            <span class="stat-label">Natural Period & Frequency (T_n = 2π·√(m/k))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sdof-res-om" style="font-weight:700;">ω_n = 12.65 rad/s | Damped f_d = 2.01 Hz (Critical Damping c_c = 6,325 kN·s/m)</span>
            <span class="stat-label">Circular Natural Frequency & Critical Damping</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('sdof-m'), kEl = document.getElementById('sdof-k'), zEl = document.getElementById('sdof-zeta');
  const tnResEl = document.getElementById('sdof-res-tn'), omResEl = document.getElementById('sdof-res-om');

  function update() {
    const mTonnes = parseFloat(mEl.value), kKnm = parseFloat(kEl.value), zetaPct = parseFloat(zEl.value);
    if (isNaN(mTonnes) || isNaN(kKnm) || isNaN(zetaPct) || mTonnes <= 0 || kKnm <= 0 || zetaPct < 0) return;

    const mKg = mTonnes * 1000;
    const kNm = kKnm * 1000;
    const zeta = zetaPct / 100;

    // Natural circular frequency omega_n = sqrt(k / m)  [rad / s]
    const omega_n = Math.sqrt(kNm / mKg);
    const fn_hz = omega_n / (2 * Math.PI);
    const Tn_sec = 1 / fn_hz;

    // Damped frequency f_d = f_n * sqrt(1 - zeta^2)
    const fd_hz = fn_hz * Math.sqrt(Math.max(0, 1 - Math.pow(zeta, 2)));

    // Critical damping coefficient c_c = 2 * sqrt(k * m)  [N * s / m]
    const c_c_kn_s_m = (2 * Math.sqrt(kNm * mKg)) / 1000;

    tnResEl.textContent = 'T_n = ' + Tn_sec.toFixed(3) + ' s (f_n = ' + fn_hz.toFixed(2) + ' Hz)';
    omResEl.textContent = 'ω_n = ' + omega_n.toFixed(2) + ' rad/s | f_d = ' + fd_hz.toFixed(2) + ' Hz (c_crit = ' + Math.round(c_c_kn_s_m).toLocaleString() + ' kN·s/m @ ζ = ' + zetaPct + '%)';
  }

  [mEl, kEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total lumped tributary floor mass in Tonnes.',
      'Enter lateral column structural spring stiffness k in kN/m.',
      'Enter structural modal damping ratio $\zeta$ in % (typically 2% for bare steel, 5% for reinforced concrete, 10%+ for isolated structures).',
      'Inspect fundamental natural period $T_n$ in seconds, natural frequency in Hz, and critical damping threshold.'
    ],
    benefitTitle: 'Harmonic Oscillator Resonance Physics',
    benefitContent: 'Determining a building\'s fundamental natural period ($T_n \approx 0.1 \times \text{Number of Stories}$) is the critical first step in earthquake structural design to avoid catastrophic dynamic resonance matching peak seismic ground acceleration frequencies.',
    faqs: [{ q: 'Why is 5% damping standard for civil concrete structures?', a: 'Micro-cracking in concrete, structural joint friction, and architectural partition walls dissipate mechanical vibration energy, providing ~5% equivalent viscous damping.' }]
  },

  // 17. Equivalent Lateral Force (ELF) Seismic Base Shear Calculator
  {
    slug: 'earthquake-elastic-response-spectrum-base-shear-calculator',
    name: 'Earthquake Equivalent Lateral Force (ELF) Seismic Base Shear (V_b) Calculator',
    description: 'Calculate ASCE 7 / IBC building earthquake design base shear force (V_b = C_s · W = (S_DS / (R / I_e)) · W) in kN and kips from spectral design acceleration S_DS and ductility R.',
    category: 'Science',
    icon: 'text',
    keywords: ['seismic base shear calculator', 'equivalent lateral force elf formula asce 7 ibc online', 'earthquake design response spectrum cs coefficient calculator', 'structural seismic weight base shear calculator', 'building earthquake design base shear online'],
    order: 727,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Design Spectral S_DS (g), Response Modification R, Importance I_e & Building Weight W (kN)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="elf-sds">Design S_DS (g)</label>
          <input class="tool-textarea" id="elf-sds" type="number" step="any" value="1.00" placeholder="1.00 g (High Seismic)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="elf-r">Factor R</label>
          <input class="tool-textarea" id="elf-r" type="number" step="0.5" value="8.0" placeholder="8.0 (Special Moment Frame)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="elf-ie">Importance I_e</label>
          <input class="tool-textarea" id="elf-ie" type="number" step="0.25" value="1.25" placeholder="1.25 (Hospital / Essential)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="elf-w">Seismic W (kN)</label>
          <input class="tool-textarea" id="elf-w" type="number" step="any" value="25000" placeholder="25000 kN Weight" />
        </div>
      </div>
      <div id="elf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="elf-res-vb" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">V_b = 3,906 kN (878 kips)</span>
            <span class="stat-label">Total Seismic Design Base Shear Force (V_b = C_s · W)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="elf-res-cs" style="font-weight:700;">Seismic Coefficient C_s = 0.1563 (15.63% Building Weight)</span>
            <span class="stat-label">ASCE 7-22 Seismic Response Coefficient (C_s)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sdsEl = document.getElementById('elf-sds'), rEl = document.getElementById('elf-r');
  const ieEl = document.getElementById('elf-ie'), wEl = document.getElementById('elf-w');
  const vbResEl = document.getElementById('elf-res-vb'), csResEl = document.getElementById('elf-res-cs');

  function update() {
    const Sds = parseFloat(sdsEl.value), R = parseFloat(rEl.value);
    const Ie = parseFloat(ieEl.value), W_kn = parseFloat(wEl.value);

    if (isNaN(Sds) || isNaN(R) || isNaN(Ie) || isNaN(W_kn) || Sds <= 0 || R <= 0 || Ie <= 0 || W_kn <= 0) return;

    // Seismic response coefficient: C_s = S_DS / ( R / I_e )
    let Cs = Sds / (R / Ie);

    // ASCE 7 minimum threshold: Cs shall not be less than 0.044 * S_DS * I_e or 0.01
    const Cs_min = Math.max(0.01, 0.044 * Sds * Ie);
    if (Cs < Cs_min) Cs = Cs_min;

    // Base shear V_b = C_s * W  [kN]
    const V_b = Cs * W_kn;
    const V_b_kips = V_b * 0.224809;

    vbResEl.textContent = 'V_b = ' + Math.round(V_b).toLocaleString() + ' kN (' + Math.round(V_b_kips).toLocaleString() + ' kips)';
    csResEl.textContent = 'C_s = ' + Cs.toFixed(4) + ' (' + (Cs * 100).toFixed(2) + '% of Seismic Weight | R/I_e = ' + (R/Ie).toFixed(2) + ' Ductility Reduction)';
  }

  [sdsEl, rEl, ieEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter ASCE 7 short-period design spectral acceleration $S_{DS}$ in g (e.g. 1.0g to 1.5g in California / Tokyo).',
      'Enter seismic Response Modification Factor R (e.g. R=8.0 for ductile Special Moment Frames, R=3.0 for Ordinary Shear Walls).',
      'Enter building Seismic Importance Factor $I_e$ (1.0 for standard residential/office, 1.25 for schools, 1.50 for hospitals/police stations).',
      'Enter total effective building seismic dead load weight W in kN.',
      'Inspect design earthquake base shear force $V_b$ in kN and kips.'
    ],
    benefitTitle: 'Inelastic Ductility Energy Dissipation',
    benefitContent: 'Rather than designing structures to remain completely elastic during giant earthquakes, structural codes divide elastic seismic forces by the response modification factor ($R \sim 8$), counting on controlled plastic hinge yielding in structural steel/rebar to absorb and dissipate earthquake shockwaves.',
    faqs: [{ q: 'What is the physical meaning of the R factor?', a: 'R represents the structural system\'s ability to undergo large inelastic cyclic deformations without collapsing.' }]
  },

  // 18. Logarithmic Decrement Structural Damping Ratio (ζ) Calculator
  {
    slug: 'logarithmic-decrement-structural-damping-ratio-calculator',
    name: 'Logarithmic Decrement Structural Damping Ratio (δ & ζ) Calculator',
    description: 'Calculate experimental vibration logarithmic decrement (δ = 1/n · ln(x₀ / x_n)) and viscous modal damping ratio (ζ ≈ δ / 2π) from free decay test amplitude peaks.',
    category: 'Science',
    icon: 'text',
    keywords: ['logarithmic decrement calculator', 'damping ratio formula delta equals 1 over n ln x0 over xn', 'vibration decay damping ratio zeta calculator online', 'free vibration decay structural damping calculator', 'experimental modal analysis damping online'],
    order: 728,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Peak Amplitude x₀ (mm), Peak Amplitude x_n (mm) & Number of Cycles n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="log-x0">Initial Peak x₀ (mm)</label>
          <input class="tool-textarea" id="log-x0" type="number" step="any" value="25.0" placeholder="25.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="log-xn">Later Peak x_n (mm)</label>
          <input class="tool-textarea" id="log-xn" type="number" step="any" value="5.2" placeholder="5.2 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="log-n">Cycles Count n</label>
          <input class="tool-textarea" id="log-n" type="number" step="1" value="5" placeholder="5 Cycles" />
        </div>
      </div>
      <div id="log-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="log-res-zeta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ζ = 5.00% Damping</span>
            <span class="stat-label">Modal Viscous Damping Ratio (ζ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="log-res-delta" style="font-weight:700;">Log Decrement δ = 0.3142 | Decay: 79.2% Amplitude Drop over 5 Cycles</span>
            <span class="stat-label">Logarithmic Decrement (δ = ln(x₀/x_n)/n)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const x0El = document.getElementById('log-x0'), xnEl = document.getElementById('log-xn'), nEl = document.getElementById('log-n');
  const zResEl = document.getElementById('log-res-zeta'), dResEl = document.getElementById('log-res-delta');

  function update() {
    const x0 = parseFloat(x0El.value), xn = parseFloat(xnEl.value), n = parseFloat(nEl.value);
    if (isNaN(x0) || isNaN(xn) || isNaN(n) || x0 <= 0 || xn <= 0 || n <= 0 || xn >= x0) return;

    // Logarithmic decrement delta = (1 / n) * ln(x0 / xn)
    const delta = (1 / n) * Math.log(x0 / xn);

    // Damping ratio zeta = delta / sqrt( 4*pi^2 + delta^2 )
    const zeta = delta / Math.sqrt((4 * Math.pow(Math.PI, 2)) + Math.pow(delta, 2));
    const zetaPct = zeta * 100;

    const dropPct = ((x0 - xn) / x0) * 100;

    zResEl.textContent = 'ζ = ' + zetaPct.toFixed(2) + '% Damping Ratio';
    dResEl.textContent = 'Log Decrement δ = ' + delta.toFixed(4) + ' (' + dropPct.toFixed(1) + '% Decay from ' + x0 + 'mm to ' + xn + 'mm across ' + n + ' Cycles)';
  }

  [x0El, xnEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial displacement vibration peak amplitude $x_0$ in mm from an accelerometer or LVDT sensor free-decay record.',
      'Enter damped peak amplitude $x_n$ measured n cycles later in mm.',
      'Enter integer cycle count n elapsed between peaks.',
      'Inspect logarithmic decrement $\delta$ and exact modal viscous damping ratio $\zeta$ in %.'
    ],
    benefitTitle: 'Experimental System Identification Damping Test',
    benefitContent: 'Measuring free vibration decay ring-down traces provides the definitive experimental validation of structural damping ($\zeta$) for bridges, wind turbines, and aerospace structures.',
    faqs: [{ q: 'Why is multiple cycles (n > 1) used instead of just one cycle?', a: 'Measuring over 5 to 10 cycles averages out measurement noise and sensor digitizer discretization errors.' }]
  },

  // 19. Dynamic Amplification Factor (DAF) Harmonic Resonance Calculator
  {
    slug: 'dynamic-amplification-factor-daf-resonance-calculator',
    name: 'Dynamic Amplification Factor (DAF / Transmissibility) Resonance Calculator',
    description: 'Calculate structural vibration dynamic amplification factor (DAF = 1 / √((1 - β²)² + (2·ζ·β)²)) and dynamic load multiplier at frequency ratio β = ω / ω_n.',
    category: 'Science',
    icon: 'text',
    keywords: ['dynamic amplification factor calculator', 'daf formula 1 over sqrt 1 minus beta squared squared', 'resonance amplification multiplier calculator online', 'structural dynamic magnification factor daf online', 'vibration transmissibility resonance calculator'],
    order: 729,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Excitation Frequency Ratio β (ω / ω_n) & Damping Ratio ζ (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="daf-beta">Frequency Ratio β (ω/ω_n)</label>
          <input class="tool-textarea" id="daf-beta" type="number" step="0.05" value="1.00" placeholder="1.00 (Exact Resonance)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="daf-zeta">Damping ζ (%)</label>
          <input class="tool-textarea" id="daf-zeta" type="number" step="0.5" value="5.0" placeholder="5.0 % Damping" />
        </div>
      </div>
      <div id="daf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="daf-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">DAF = 10.00× Amplification</span>
            <span class="stat-label">Dynamic Amplification Factor (DAF)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="daf-res-desc" style="color:var(--green-dark); font-weight:700;">PEAK RESONANCE (β = 1.00): Dynamic Load is 10.0× Higher than Static Load (Phase Lag: 90.0°)</span>
            <span class="stat-label">Structural Resonance Severity & Phase Lag</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('daf-beta'), zEl = document.getElementById('daf-zeta');
  const dResEl = document.getElementById('daf-res-val'), dcResEl = document.getElementById('daf-res-desc');

  function update() {
    const beta = parseFloat(bEl.value), zetaPct = parseFloat(zEl.value);
    if (isNaN(beta) || isNaN(zetaPct) || beta < 0 || zetaPct <= 0) return;

    const zeta = zetaPct / 100;

    // DAF = 1 / sqrt( (1 - beta^2)^2 + (2 * zeta * beta)^2 )
    const term1 = Math.pow(1 - Math.pow(beta, 2), 2);
    const term2 = Math.pow(2 * zeta * beta, 2);
    const DAF = 1.0 / Math.sqrt(term1 + term2);

    // Phase angle phi = atan2( 2*zeta*beta, 1 - beta^2 )
    const phiRad = Math.atan2(2 * zeta * beta, 1 - Math.pow(beta, 2));
    const phiDeg = (phiRad * 180) / Math.PI;

    let regime = '';
    let color = '#22543d';

    if (Math.abs(beta - 1.0) < 0.05) {
      regime = 'PEAK HARMONIC RESONANCE (β ≈ 1.0): Dynamic Displacement = ' + DAF.toFixed(1) + '× Static (Phase Lag: ' + phiDeg.toFixed(1) + '°)';
      color = '#c53030';
    } else if (beta < 0.8) {
      regime = 'QUASI-STATIC REGIME (β < 0.8): Response in phase with excitation force (Phase: ' + phiDeg.toFixed(1) + '°)';
      color = '#22543d';
    } else if (beta > 1.25) {
      regime = 'ISOLATION REGIME (β > √2 = 1.414): Dynamic forces attenuated below static load (DAF < 1.0)';
      color = '#2563eb';
    } else {
      regime = 'NEAR RESONANCE TRANSITION REGIME';
      color = '#d97706';
    }

    dResEl.textContent = 'DAF = ' + DAF.toFixed(2) + '× Dynamic Multiplier';
    dcResEl.textContent = regime;
    dcResEl.style.color = color;
  }

  bEl.addEventListener('input', update);
  zEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter excitation frequency ratio $\beta = \omega / \omega_n$ (excitation frequency divided by structural natural frequency).',
      'Enter structural damping ratio $\zeta$ in % (e.g. 5%).',
      'Inspect Dynamic Amplification Factor (DAF) load magnification multiplier and phase angle.'
    ],
    benefitTitle: 'Resonant Vibration Amplification & Isolation',
    benefitContent: 'At resonance ($\beta = 1.0$), dynamic amplitude multiplies by $1 / (2\zeta) = 10\times$ for 5% damping; when driving frequency exceeds $\beta > \sqrt{2} \approx 1.414$, the structure enters the vibration isolation regime where transmitted forces drop below static loads ($DAF < 1.0$).',
    faqs: [{ q: 'How does damping affect DAF at exact resonance (β=1)?', a: 'At $\beta=1.0$, $DAF_{\text{peak}} = \frac{1}{2\zeta}$; doubling damping from 2% to 4% cuts peak resonant stresses in half ($25\times \to 12.5\times$).' }]
  },

  // 20. Euler Column Buckling Critical Load & Slenderness Ratio Calculator
  {
    slug: 'structural-buckling-euler-effective-length-factor-calculator',
    name: 'Euler Column Buckling Critical Load (P_cr) & Slenderness Ratio Calculator',
    description: 'Calculate structural column elastic critical buckling load (P_cr = π²·E·I / (K·L)²) in kN/kips and slenderness ratio (λ = K·L / r) across Fixed, Pinned, and Free boundary supports.',
    category: 'Science',
    icon: 'text',
    keywords: ['euler column buckling calculator', 'critical buckling load formula pi squared e i over k l squared', 'column slenderness ratio lambda calculator online', 'effective length factor k euler buckling calculator', 'structural steel column buckling online'],
    order: 730,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Column Length L (m), Modulus E (GPa), Moment of Inertia I (cm⁴) & Boundary Support K',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bck-l">Length L (m)</label>
          <input class="tool-textarea" id="bck-l" type="number" step="any" value="4.0" placeholder="4.0 m Column" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bck-e">Modulus E (GPa)</label>
          <input class="tool-textarea" id="bck-e" type="number" step="any" value="200.0" placeholder="200.0 GPa (Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bck-i">Inertia I (cm⁴)</label>
          <input class="tool-textarea" id="bck-i" type="number" step="any" value="1200.0" placeholder="1200.0 cm⁴ (I_min)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bck-k">Support Factor K</label>
          <select class="tool-textarea" id="bck-k">
            <option value="1.0" selected>Pinned - Pinned (K = 1.0)</option>
            <option value="0.5">Fixed - Fixed (K = 0.5 - 4× Stronger)</option>
            <option value="0.7">Fixed - Pinned (K = 0.7)</option>
            <option value="2.0">Fixed - Free Flagpole (K = 2.0 - 1/4th Load)</option>
          </select>
        </div>
      </div>
      <div id="bck-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bck-res-pcr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_cr = 1,480 kN (333 kips)</span>
            <span class="stat-label">Euler Elastic Critical Buckling Load (P_cr)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bck-res-eff" style="font-weight:700;">Effective Length L_e = 4.00 m (K = 1.0) | Critical Mass: 151 Tonnes</span>
            <span class="stat-label">Effective Column Length (K·L) & Support Conditions</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('bck-l'), eEl = document.getElementById('bck-e');
  const iEl = document.getElementById('bck-i'), kEl = document.getElementById('bck-k');
  const pResEl = document.getElementById('bck-res-pcr'), efResEl = document.getElementById('bck-res-eff');

  function update() {
    const Lm = parseFloat(lEl.value), EGpa = parseFloat(eEl.value);
    const I_cm4 = parseFloat(iEl.value), K = parseFloat(kEl.value);

    if (isNaN(Lm) || isNaN(EGpa) || isNaN(I_cm4) || isNaN(K) || Lm <= 0 || EGpa <= 0 || I_cm4 <= 0 || K <= 0) return;

    const E_pa = EGpa * 1e9;
    const I_m4 = I_cm4 * 1e-8; // cm^4 to m^4
    const Le_m = K * Lm;

    // Euler buckling load: P_cr = ( pi^2 * E * I ) / Le^2  [Newtons]
    const Pcr_N = (Math.pow(Math.PI, 2) * E_pa * I_m4) / Math.pow(Le_m, 2);
    const Pcr_kN = Pcr_N / 1000;
    const Pcr_kips = Pcr_kN * 0.224809;
    const Pcr_tonnes = Pcr_kN / 9.80665;

    pResEl.textContent = 'P_cr = ' + Math.round(Pcr_kN).toLocaleString() + ' kN (' + Math.round(Pcr_kips).toLocaleString() + ' kips)';
    efResEl.textContent = 'Effective Length L_e = ' + Le_m.toFixed(2) + ' m (K = ' + K + ') | Critical Capacity: ' + Math.round(Pcr_tonnes).toLocaleString() + ' Tonnes';
  }

  [lEl, eEl, iEl].forEach(el => el.addEventListener('input', update));
  kEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter column unbraced physical length L in meters.',
      'Enter material Young\'s modulus of elasticity E in GPa (200 GPa for structural steel, 30 GPa for concrete, 70 GPa for aluminum).',
      'Enter minimum cross-sectional area moment of inertia $I_{\min}$ in $\text{cm}^4$.',
      'Select end boundary support conditions (Pinned-Pinned $K=1.0$, Fixed-Fixed $K=0.5$, Fixed-Pinned $K=0.7$, Fixed-Free $K=2.0$).',
      'Inspect Euler elastic critical buckling load $P_{\text{cr}}$ in kN and kips.'
    ],
    benefitTitle: 'Leonhard Euler 1744 Column Stability Theory',
    benefitContent: 'Slender structural columns fail catastrophically by sudden lateral elastic bifurcation instability (buckling) well before compressive material yield stress is reached; fixing both column ends ($K=0.5$) increases buckling resistance by a massive 4× factor.',
    faqs: [{ q: 'Why is the minimum moment of inertia (I_min) used in buckling calculations?', a: 'Columns buckle around the weakest principal geometric axis where resistance to bending is lowest.' }]
  },

  // --- Suite EEEEE: Environmental Engineering, Wastewater & Biological Treatment (851 - 855) ---
  // 21. Biochemical Oxygen Demand (BOD) Decay Kinetics Calculator
  {
    slug: 'activated-sludge-biochemical-oxygen-demand-bod-kinetics-calculator',
    name: 'Biochemical Oxygen Demand (BOD₅ & Ultimate BOD_u) Decay Kinetics Calculator',
    description: 'Calculate wastewater organic pollution decay kinetics (BOD_t = BOD_u · (1 - e^(-k·t))) and temperature-corrected deoxygenation rate (k_T = k₂₀ · 1.047^(T - 20)).',
    category: 'Science',
    icon: 'text',
    keywords: ['bod kinetics calculator', 'biochemical oxygen demand formula bod5 to ultimate bodu', 'deoxygenation rate constant k temperature correction calculator', 'wastewater treatment bod decay kinetics online', 'environmental engineering water quality bod calculator'],
    order: 731,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '5-Day BOD₅ (mg/L), Reaction Time t (Days), Rate Constant k₂₀ (day⁻¹) & Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bod-b5">5-Day BOD₅ (mg/L)</label>
          <input class="tool-textarea" id="bod-b5" type="number" step="any" value="200.0" placeholder="200.0 mg/L (Municipal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bod-k20">Rate k₂₀ (day⁻¹)</label>
          <input class="tool-textarea" id="bod-k20" type="number" step="0.01" value="0.23" placeholder="0.23 day⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bod-temp">Water Temp (°C)</label>
          <input class="tool-textarea" id="bod-temp" type="number" step="any" value="25.0" placeholder="25.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bod-t">Target Time t (days)</label>
          <input class="tool-textarea" id="bod-t" type="number" step="any" value="7.0" placeholder="7.0 days" />
        </div>
      </div>
      <div id="bod-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bod-res-bu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BOD_u = 292.6 mg / L</span>
            <span class="stat-label">Ultimate Carbonaceous Oxygen Demand (BOD_u)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bod-res-bt" style="font-weight:700;">BOD(7 days) = 254.3 mg/L (k₂₅ = 0.290 day⁻¹ | 86.9% Oxygen Exerted)</span>
            <span class="stat-label">Exerted Oxygen Demand at Time t</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const b5El = document.getElementById('bod-b5'), k20El = document.getElementById('bod-k20');
  const tEl = document.getElementById('bod-temp'), tmEl = document.getElementById('bod-t');
  const buResEl = document.getElementById('bod-res-bu'), btResEl = document.getElementById('bod-res-bt');

  function update() {
    const BOD5 = parseFloat(b5El.value), k20 = parseFloat(k20El.value);
    const Tc = parseFloat(tEl.value), tDays = parseFloat(tmEl.value);

    if (isNaN(BOD5) || isNaN(k20) || isNaN(Tc) || isNaN(tDays) || BOD5 <= 0 || k20 <= 0 || tDays <= 0) return;

    // Standard BOD5 is measured at 20°C: BOD5 = BOD_u * ( 1 - exp(-k20 * 5) )
    const BOD_u = BOD5 / (1.0 - Math.exp(-k20 * 5.0));

    // Temperature correction: k_T = k20 * (1.047)^(T - 20)
    const k_T = k20 * Math.pow(1.047, Tc - 20.0);

    // BOD exerted at target time t at temperature T: BOD_t = BOD_u * ( 1 - exp(-k_T * t) )
    const BOD_t = BOD_u * (1.0 - Math.exp(-k_T * tDays));
    const exertedPct = (BOD_t / BOD_u) * 100;

    buResEl.textContent = 'BOD_u = ' + BOD_u.toFixed(1) + ' mg / L Ultimate Oxygen Demand';
    btResEl.textContent = 'BOD(' + tDays + 'd @ ' + Tc + '°C) = ' + BOD_t.toFixed(1) + ' mg/L (' + exertedPct.toFixed(1) + '% Exerted, k_T = ' + k_T.toFixed(3) + ' day⁻¹)';
  }

  [b5El, k20El, tEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter standard laboratory 5-day Biochemical Oxygen Demand ($BOD_5$) in mg/L.',
      'Enter baseline 20°C deoxygenation rate constant $k_{20}$ in $\text{day}^{-1}$ (typically 0.15 to 0.30 $\text{day}^{-1}$ for municipal sewage).',
      'Enter receiving stream / wastewater temperature in Celsius.',
      'Enter target river travel time t in days.',
      'Inspect Ultimate Carbonaceous Oxygen Demand ($BOD_u$) and temperature-corrected oxygen depletion in mg/L.'
    ],
    benefitTitle: 'First-Order Microbial Respiration Kinetics',
    benefitContent: 'Microorganisms consume dissolved oxygen while degrading organic waste; calculating $BOD_u$ and temperature-corrected kinetics ($k_T = k_{20} \cdot 1.047^{\Delta T}$) is essential for the Streeter-Phelps river dissolved oxygen sag model.',
    faqs: [{ q: 'Why is BOD standard incubation set to 5 days at 20°C?', a: 'Historical British Royal Commission standard: 5 days represents the longest transit time for UK river water to travel from source to sea.' }]
  },

  // 22. Activated Sludge Mean Cell Residence Time (MCRT / Sludge Age) Calculator
  {
    slug: 'mean-cell-residence-time-sludge-age-mcrt-calculator',
    name: 'Wastewater Activated Sludge Mean Cell Residence Time (MCRT / Sludge Age) Calculator',
    description: 'Calculate wastewater biological treatment Mean Cell Residence Time (MCRT / θ_c = (V·X) / (Q_w·X_w + Q_e·X_e)) in days and daily waste sludge volume Q_w in m³/day.',
    category: 'Science',
    icon: 'text',
    keywords: ['mcrt calculator', 'sludge age formula mean cell residence time online', 'activated sludge solids retention time srt calculator', 'wastewater treatment waste sludge rate qw calculator', 'aeration tank mlss mcrt online'],
    order: 732,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Aeration Tank Vol V (m³), MLSS X (mg/L), Effluent Flow Q_e (m³/d) & Target MCRT θ_c (Days)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mcrt-v">Tank Volume V (m³)</label>
          <input class="tool-textarea" id="mcrt-v" type="number" step="any" value="5000.0" placeholder="5000.0 m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mcrt-x">Aeration MLSS (mg/L)</label>
          <input class="tool-textarea" id="mcrt-x" type="number" step="any" value="3000.0" placeholder="3000.0 mg/L MLSS" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mcrt-xw">Waste WAS X_w (mg/L)</label>
          <input class="tool-textarea" id="mcrt-xw" type="number" step="any" value="8000.0" placeholder="8000.0 mg/L (WAS)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mcrt-days">Target MCRT (Days)</label>
          <input class="tool-textarea" id="mcrt-days" type="number" step="0.5" value="10.0" placeholder="10.0 Days (Nitrification)" />
        </div>
      </div>
      <div id="mcrt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mcrt-res-qw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Q_w = 187.5 m³ / Day WAS</span>
            <span class="stat-label">Daily Waste Activated Sludge Pumping Rate (Q_w)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mcrt-res-inv" style="font-weight:700;">Total Inventory: 15,000 kg MLSS | Waste Solids: 1,500 kg/day</span>
            <span class="stat-label">Biological Aeration Inventory & Daily Sludge Production</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('mcrt-v'), xEl = document.getElementById('mcrt-x');
  const xwEl = document.getElementById('mcrt-xw'), dEl = document.getElementById('mcrt-days');
  const qwResEl = document.getElementById('mcrt-res-qw'), invResEl = document.getElementById('mcrt-res-inv');

  function update() {
    const V = parseFloat(vEl.value), X = parseFloat(xEl.value);
    const Xw = parseFloat(xwEl.value), targetMCRT = parseFloat(dEl.value);

    if (isNaN(V) || isNaN(X) || isNaN(Xw) || isNaN(targetMCRT) || V <= 0 || X <= 0 || Xw <= 0 || targetMCRT <= 0) return;

    // Total biomass inventory in aeration basin = V * X / 1000  [kg solids]
    const totalMassKg = (V * X) / 1000;

    // Required daily solids wasting rate = totalMassKg / targetMCRT  [kg / day]
    const dailyWastedKg = totalMassKg / targetMCRT;

    // Waste Activated Sludge (WAS) volumetric pumping rate Q_w = (dailyWastedKg * 1000) / Xw  [m^3 / day]
    const Qw_m3_day = (dailyWastedKg * 1000) / Xw;

    qwResEl.textContent = 'Q_w = ' + Qw_m3_day.toFixed(1) + ' m³ / Day WAS Pumping';
    invResEl.textContent = 'Inventory: ' + Math.round(totalMassKg).toLocaleString() + ' kg MLSS | Waste: ' + Math.round(dailyWastedKg).toLocaleString() + ' kg/d @ ' + targetMCRT + '-Day MCRT (θ_c)';
  }

  [vEl, xEl, xwEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter biological aeration basin volume V in $m^3$.',
      'Enter Mixed Liquor Suspended Solids (MLSS) concentration X in mg/L (typically 2,500 to 4,000 mg/L).',
      'Enter Waste Activated Sludge (WAS) concentration $X_w$ from clarifier underflow in mg/L (typically 6,000 to 10,000 mg/L).',
      'Enter target Solids Retention Time / MCRT in days (e.g. 5–8 days for BOD removal, 10–15 days for complete nitrification).',
      'Inspect daily waste activated sludge (WAS) volumetric pumping rate in $m^3/\text{day}$ and total basin solids inventory.'
    ],
    benefitTitle: 'Solids Retention Time (SRT) & Nitrification Control',
    benefitContent: 'MCRT ($\theta_c$) represents the average time nitrifying bacteria spend in the aeration system; keeping MCRT above 10 days ensures slow-growing autotrophic Nitrosomonas and Nitrobacter bacteria multiply faster than they are wasted, ensuring 100% ammonia removal.',
    faqs: [{ q: 'What happens if MCRT is too short (<3 days)?', a: 'Nitrifying bacteria wash out of the system, floc settling degrades in secondary clarifiers, and effluent turbidity surges.' }]
  },

  // 23. Food-to-Microorganism (F/M) Ratio Organic Loading Calculator
  {
    slug: 'food-to-microorganism-f-m-ratio-aeration-tank-calculator',
    name: 'Food-to-Microorganism (F/M) Organic Loading Ratio Calculator',
    description: 'Calculate wastewater aeration tank organic loading Food-to-Microorganism ratio (F/M = (Q · BOD₅) / (V · MLVSS)) in kg BOD₅ / (kg MLVSS · day) for conventional vs extended aeration.',
    category: 'Science',
    icon: 'text',
    keywords: ['food to microorganism ratio calculator', 'f to m ratio formula q times bod5 over v times mlvss', 'aeration tank organic loading rate calculator online', 'activated sludge process control f m ratio calculator', 'wastewater mlvss f to m online'],
    order: 733,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Influent Flow Q (m³/day), Influent BOD₅ (mg/L), Aeration Volume V (m³) & MLVSS (mg/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fm-q">Flow Q (m³/day)</label>
          <input class="tool-textarea" id="fm-q" type="number" step="any" value="10000.0" placeholder="10000.0 m³/d" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fm-bod">BOD₅ (mg/L)</label>
          <input class="tool-textarea" id="fm-bod" type="number" step="any" value="220.0" placeholder="220.0 mg/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fm-v">Tank Vol V (m³)</label>
          <input class="tool-textarea" id="fm-v" type="number" step="any" value="3500.0" placeholder="3500.0 m³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fm-mlvss">MLVSS (mg/L)</label>
          <input class="tool-textarea" id="fm-mlvss" type="number" step="any" value="2400.0" placeholder="2400.0 mg/L MLVSS" />
        </div>
      </div>
      <div id="fm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fm-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F/M = 0.262 d⁻¹</span>
            <span class="stat-label">Food-to-Microorganism Loading Ratio (F/M)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fm-res-reg" style="color:var(--green-dark); font-weight:700;">Conventional Plug-Flow Activated Sludge (0.2 - 0.4: Optimal Floc Settleability)</span>
            <span class="stat-label">Biological Process Operational Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('fm-q'), bodEl = document.getElementById('fm-bod');
  const vEl = document.getElementById('fm-v'), mlvssEl = document.getElementById('fm-mlvss');
  const fmResEl = document.getElementById('fm-res-val'), rgResEl = document.getElementById('fm-res-reg');

  function update() {
    const Q = parseFloat(qEl.value), BOD = parseFloat(bodEl.value);
    const V = parseFloat(vEl.value), MLVSS = parseFloat(mlvssEl.value);

    if (isNaN(Q) || isNaN(BOD) || isNaN(V) || isNaN(MLVSS) || Q <= 0 || BOD <= 0 || V <= 0 || MLVSS <= 0) return;

    // Daily food mass = Q * BOD / 1000  [kg BOD5 / day]
    const foodKgDay = (Q * BOD) / 1000;

    // Total microorganism biomass = V * MLVSS / 1000  [kg MLVSS]
    const microKg = (V * MLVSS) / 1000;

    // F/M ratio = foodKgDay / microKg  [kg BOD / kg MLVSS * day = day^-1]
    const FM = foodKgDay / microKg;

    // Hydraulic Retention Time HRT = V / Q * 24  [hours]
    const HRT_hours = (V / Q) * 24;

    let regime = '';
    let color = '#22543d';

    if (FM < 0.05) {
      regime = 'UNDERLOADED: Endogenous Respiration / Pin-Point Floc Ashing (F/M < 0.05)';
      color = '#d97706';
    } else if (FM <= 0.15) {
      regime = 'EXTENDED AERATION (0.05 - 0.15: High Stabilization, Low Sludge Yield)';
      color = '#2563eb';
    } else if (FM <= 0.45) {
      regime = 'CONVENTIONAL ACTIVATED SLUDGE (0.2 - 0.45: Optimal Good Settling Floc)';
      color = '#22543d';
    } else {
      regime = 'OVERLOADED: High-Rate Dispersed Growth / Incomplete Treatment (F/M > 0.45)';
      color = '#c53030';
    }

    fmResEl.textContent = 'F/M = ' + FM.toFixed(3) + ' kg BOD / (kg MLVSS · day)';
    rgResEl.textContent = regime + ' | Food: ' + Math.round(foodKgDay).toLocaleString() + ' kg/d, Microbes: ' + Math.round(microKg).toLocaleString() + ' kg (HRT = ' + HRT_hours.toFixed(1) + ' h)';
    rgResEl.style.color = color;
  }

  [qEl, bodEl, vEl, mlvssEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter daily raw wastewater influent flow rate Q in $m^3/\text{day}$.',
      'Enter primary effluent 5-day Biochemical Oxygen Demand ($BOD_5$) in mg/L.',
      'Enter total biological aeration basin liquid volume V in $m^3$.',
      'Enter Mixed Liquor Volatile Suspended Solids (MLVSS) active bacterial concentration in mg/L (typically 70–80% of MLSS).',
      'Inspect F/M loading ratio and evaluate whether the biological process operates in Extended Aeration, Conventional, or Overloaded mode.'
    ],
    benefitTitle: 'Bacterial Growth Phase & Floc Settleability',
    benefitContent: 'Maintaining F/M between 0.20 and 0.40 keeps bacteria in the declining growth phase where microorganisms produce extracellular polymeric slime (EPS) that naturally binds bacteria into dense, rapidly settling flocs in secondary clarifiers.',
    faqs: [{ q: 'What is the difference between MLSS and MLVSS?', a: 'MLSS measures total suspended solids (active bacteria + inert grit/sand); MLVSS measures the organic volatile fraction representing living active bacteria.' }]
  },

  // 24. Water Coagulation & Rapid Mix Camp-Stein Velocity Gradient (G) Calculator
  {
    slug: 'coagulation-flocculation-camp-stein-velocity-gradient-calculator',
    name: 'Water Coagulation & Flocculation Camp-Stein Velocity Gradient (G) Calculator',
    description: 'Calculate water treatment flash mixing and flocculation velocity gradient (G = √(P / (μ·V))) in s⁻¹ and dimensionless Camp number (G·t) from impeller power P and tank volume V.',
    category: 'Science',
    icon: 'text',
    keywords: ['camp stein velocity gradient calculator', 'flocculation velocity gradient g formula sqrt p over mu v', 'camp number g times t flocculator calculator online', 'water treatment coagulation rapid mix calculator', 'water clarification paddle flocculator online'],
    order: 734,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Impeller Mixer Power P (Watts), Tank Volume V (m³), Water Temp T (°C) & Detention Time t (s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cmp-p">Mixer Power P (W)</label>
          <input class="tool-textarea" id="cmp-p" type="number" step="any" value="750.0" placeholder="750.0 W (Rapid Mix)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cmp-v">Tank Volume V (m³)</label>
          <input class="tool-textarea" id="cmp-v" type="number" step="any" value="1.20" placeholder="1.20 m³ Tank" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cmp-temp">Water Temp (°C)</label>
          <input class="tool-textarea" id="cmp-temp" type="number" step="any" value="20.0" placeholder="20.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cmp-t">Detention t (s)</label>
          <input class="tool-textarea" id="cmp-t" type="number" step="any" value="45.0" placeholder="45.0 s (Flash Mix)" />
        </div>
      </div>
      <div id="cmp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cmp-res-g" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">G = 790.6 s⁻¹ Rapid Mix</span>
            <span class="stat-label">Camp-Stein Velocity Gradient (G = √(P/μV))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cmp-res-gt" style="color:var(--green-dark); font-weight:700;">Camp Number G·t = 35,575 (Optimal Flash Coagulant Dispersion)</span>
            <span class="stat-label">Dimensionless Flocculation Index (G · t)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('cmp-p'), vEl = document.getElementById('cmp-v');
  const tEl = document.getElementById('cmp-temp'), tmEl = document.getElementById('cmp-t');
  const gResEl = document.getElementById('cmp-res-g'), gtResEl = document.getElementById('cmp-res-gt');

  function update() {
    const P = parseFloat(pEl.value), V = parseFloat(vEl.value);
    const Tc = parseFloat(tEl.value), tSec = parseFloat(tmEl.value);

    if (isNaN(P) || isNaN(V) || isNaN(Tc) || isNaN(tSec) || P <= 0 || V <= 0 || tSec <= 0) return;

    // Dynamic viscosity of water as function of temperature approx: mu = 0.00179 / ( 1 + 0.03368*T + 0.000221*T^2 )  [Pa * s]
    const mu = 0.00179 / (1.0 + (0.03368 * Tc) + (0.000221 * Math.pow(Tc, 2)));

    // Camp-Stein velocity gradient G = sqrt( P / (mu * V) )  [s^-1]
    const G = Math.sqrt(P / (mu * V));

    // Camp number G * t (dimensionless)
    const Gt = G * tSec;

    let stageDesc = '';
    let color = '#22543d';

    if (G > 500) {
      stageDesc = 'RAPID FLASH COAGULATION (G = 600 - 1000 s⁻¹, t < 60s: Micro-floc nucleation & charge neutralization)';
      color = '#22543d';
    } else if (G >= 20 && G <= 80) {
      stageDesc = 'SLOW FLOCCULATION BASIN (G = 20 - 70 s⁻¹, G·t = 20,000 - 100,000: Gentle collision growth without shear breakup)';
      color = '#2563eb';
    } else {
      stageDesc = 'TRANSITIONAL MIXING STAGE';
      color = '#d97706';
    }

    gResEl.textContent = 'G = ' + G.toFixed(1) + ' s⁻¹ (Velocity Gradient)';
    gtResEl.textContent = 'Camp Number G·t = ' + Math.round(Gt).toLocaleString() + ' | ' + stageDesc;
    gtResEl.style.color = color;
  }

  [pEl, vEl, tEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mechanical mixer motor power dissipated into water P in Watts.',
      'Enter mixing chamber liquid volume V in $m^3$.',
      'Enter water temperature in Celsius.',
      'Enter hydraulic detention time t in seconds.',
      'Inspect Camp-Stein root-mean-square velocity gradient G in $s^{-1}$ and dimensionless Camp flocculation number ($G \cdot t$).'
    ],
    benefitTitle: 'Thomas R. Camp & Philip C. Stein 1943 Velocity Gradient',
    benefitContent: 'Velocity gradient (G) quantifies fluid shear strain rate; flash mixing requires intense shear ($G \sim 700\text{–}1000\text{ s}^{-1}$) for 30 seconds to disperse Alum/$FeCl_3$ coagulants within milliseconds, followed by gentle flocculator paddles ($G \sim 30\text{ s}^{-1}$) to agglomerate heavy pin flocs without shear tear-apart.',
    faqs: [{ q: 'Why do flocculation basins use tapered G values?', a: 'Multi-stage flocculators step G down gradually ($60\text{ s}^{-1} \to 40\text{ s}^{-1} \to 20\text{ s}^{-1}$) as flocs grow larger and more fragile to prevent shear fragmentation.' }]
  },

  // 25. Drinking Water Disinfection CT Value & Log Inactivation Calculator
  {
    slug: 'chlorine-disinfection-ct-disinfection-log-kill-calculator',
    name: 'Drinking Water Chlorine Disinfection CT Value & Pathogen Log Inactivation Calculator',
    description: 'Calculate drinking water disinfection Contact Time product (CT = C · T) in mg·min/L and verify EPA pathogen Log Reduction credits (Giardia 3-log 99.9%, Virus 4-log 99.99%, Cryptosporidium).',
    category: 'Health',
    icon: 'text',
    keywords: ['chlorine ct value calculator', 'disinfection contact time ct formula c times t online', 'giardia virus log inactivation epa ct calculator', 'drinking water chlorine residual ct credit online', 'water treatment plant chlorine contact chamber calculator'],
    order: 735,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Free Chlorine Residual C (mg/L), Effective Contact Time T₁₀ (min), Water Temp T (°C) & Target Pathogen',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ct-c">Free Chlorine C (mg/L)</label>
          <input class="tool-textarea" id="ct-c" type="number" step="any" value="1.20" placeholder="1.20 mg/L Free Cl₂" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-t">Baffled T₁₀ Time (min)</label>
          <input class="tool-textarea" id="ct-t" type="number" step="any" value="30.0" placeholder="30.0 min (T10)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-temp">Water Temp (°C)</label>
          <input class="tool-textarea" id="ct-temp" type="number" step="any" value="15.0" placeholder="15.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-path">Target Pathogen</label>
          <select class="tool-textarea" id="ct-path">
            <option value="giardia" selected>Giardia lamblia Cysts (3-Log 99.9% Kill Target)</option>
            <option value="virus">Enteric Viruses (4-Log 99.99% Kill Target)</option>
          </select>
        </div>
      </div>
      <div id="ct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ct-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CT = 36.0 mg · min / L</span>
            <span class="stat-label">Achieved Disinfection Contact Product (CT = C · T₁₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ct-res-log" style="color:var(--green-dark); font-weight:700;">EPA COMPLIANT: Achieved 1.48-Log Giardia Inactivation (Required for 3-Log: 73.0 mg·min/L @ 15°C, pH 7.5)</span>
            <span class="stat-label">EPA Surface Water Treatment Rule Compliance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('ct-c'), tEl = document.getElementById('ct-t');
  const tempEl = document.getElementById('ct-temp'), pathEl = document.getElementById('ct-path');
  const ctResEl = document.getElementById('ct-res-val'), logResEl = document.getElementById('ct-res-log');

  function update() {
    const C = parseFloat(cEl.value), T10 = parseFloat(tEl.value);
    const Tc = parseFloat(tempEl.value), pathogen = pathEl.value;

    if (isNaN(C) || isNaN(T10) || isNaN(Tc) || C <= 0 || T10 <= 0 || Tc < 0) return;

    // Achieved CT = C * T10  [mg * min / L]
    const achievedCT = C * T10;

    let reqCT = 0;
    let targetLog = 0;
    let pathName = '';

    if (pathogen === 'giardia') {
      // EPA 3-Log Giardia CT table approx for pH 7.5: CT_3log approx = 160 * exp(-0.055 * Tc)
      reqCT = 160.0 * Math.exp(-0.055 * Tc);
      targetLog = 3.0;
      pathName = 'Giardia Cysts';
    } else {
      // EPA 4-Log Virus CT table approx: CT_4log approx = 12 * exp(-0.07 * Tc)
      reqCT = 12.0 * Math.exp(-0.07 * Tc);
      targetLog = 4.0;
      pathName = 'Enteric Viruses';
    }

    // Achieved log inactivation = targetLog * (achievedCT / reqCT)
    const achievedLog = (targetLog * achievedCT) / reqCT;
    const killPct = (1.0 - Math.pow(10, -achievedLog)) * 100;

    let status = '';
    let color = '#22543d';

    if (achievedLog >= targetLog) {
      status = 'FULL EPA COMPLIANCE: ' + achievedLog.toFixed(2) + '-Log ' + pathName + ' Inactivation (' + killPct.toFixed(3) + '% Kill > ' + targetLog + '-Log Target)';
      color = '#22543d';
    } else {
      status = 'PARTIAL DISINFECTION: ' + achievedLog.toFixed(2) + '-Log Inactivation (' + (achievedCT/reqCT * 100).toFixed(0) + '% of Required ' + targetLog + '-Log CT = ' + reqCT.toFixed(1) + ' mg·min/L)';
      color = '#d97706';
    }

    ctResEl.textContent = 'CT = ' + achievedCT.toFixed(1) + ' mg · min / L (Achieved)';
    logResEl.textContent = status;
    logResEl.style.color = color;
  }

  [cEl, tEl, tempEl].forEach(el => el.addEventListener('input', update));
  pathEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter free available residual chlorine concentration C at clearwell effluent in mg/L.',
      'Enter effective $T_{10}$ contact time in minutes ($T_{10}$ is the time for 10% of water molecules to pass through the baffled clearwell basin).',
      'Enter water temperature in Celsius (disinfection kinetics slow down dramatically in cold winter water).',
      'Select target pathogen standard (Giardia lamblia 3-Log 99.9% or Enteric Viruses 4-Log 99.99%).',
      'Inspect achieved CT product and verify US EPA Surface Water Treatment Rule disinfection credits.'
    ],
    benefitTitle: 'EPA Surface Water Treatment Rule (SWTR) CT Compliance',
    benefitContent: 'Chick-Watson chemical disinfection kinetics prove that pathogen inactivation is proportional to the concentration-time product ($CT = C \times T_{10}$); colder water slows cell membrane oxidation, requiring higher chlorine residual or longer contact times to guarantee safe drinking water.',
    faqs: [{ q: 'What is T10 baffled contact time?', a: '$T_{10}$ is the hydraulic time at which 10% of tracer water exits the contact chamber, accounting for internal short-circuiting and dead zones.' }]
  }
];

pack23Tools.forEach(createTool);
console.log('Pack 23 complete: 25 tools created.');
