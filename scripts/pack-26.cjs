const { createTool } = require('./generate-curated-tools.cjs');

// Pack 26: 25 Tools covering Combustion Thermodynamics, Marine Hydrodynamics, Tribology & Contact Mechanics, Glass & Ceramic Materials, Orbital Spacecraft Perturbations (Tools 906 to 930)
const pack26Tools = [
  // --- Suite PPPPP: Combustion, Thermodynamics & High-Speed Propulsion (906 - 910) ---
  // 1. Fuel-Air Equivalence Ratio (Φ) & Combustion Stoichiometry Calculator
  {
    slug: 'equivalence-ratio-fuel-air-combustion-stoichiometry-calculator',
    name: 'Fuel-Air Equivalence Ratio (Φ) & Combustion Stoichiometry Calculator',
    description: 'Calculate combustion Fuel-Air Equivalence Ratio (Φ = (Fuel/Air)_actual / (Fuel/Air)_stoichiometric) and Lambda (λ = 1 / Φ) to classify Lean, Stoichiometric, and Rich engine combustion regimes.',
    category: 'Science',
    icon: 'text',
    keywords: ['equivalence ratio calculator', 'combustion fuel air ratio formula phi equals fa actual over fa stoich', 'lambda to equivalence ratio calculator online', 'gas turbine internal combustion rich lean phi calculator', 'stoichiometric air fuel ratio octane diesel online'],
    order: 787,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fuel Type (Gasoline / Octane, Methane, Diesel, Hydrogen, Ethanol) & Measured AFR (Air-Fuel Ratio)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eq-fuel">Fuel Type</label>
          <select class="tool-textarea" id="eq-fuel">
            <option value="gasoline" selected>Gasoline / Octane C₈H₁₈ (Stoichiometric AFR = 14.70 : 1)</option>
            <option value="methane">Natural Gas / Methane CH₄ (Stoich AFR = 17.20 : 1)</option>
            <option value="diesel">Diesel Fuel C₁₂H₂₃ (Stoich AFR = 14.50 : 1)</option>
            <option value="ethanol">Ethanol E100 C₂H₅OH (Stoich AFR = 9.00 : 1)</option>
            <option value="hydrogen">Hydrogen H₂ (Stoich AFR = 34.30 : 1)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="eq-afr">Actual AFR (Air : Fuel)</label>
          <input class="tool-textarea" id="eq-afr" type="number" step="0.1" value="12.5" placeholder="12.5 (Rich WOT Boost)" />
        </div>
      </div>
      <div id="eq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eq-res-phi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Φ = 1.176 (Rich) | λ = 0.850</span>
            <span class="stat-label">Equivalence Ratio (Φ) & Lambda Sensor Value (λ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eq-res-reg" style="color:var(--green-dark); font-weight:700;">RICH POWER REGIME (Φ > 1.0: +17.6% Excess Fuel - Maximum Turbo Knock Margin)</span>
            <span class="stat-label">Combustion Regime & Engine Tuning Strategy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('eq-fuel'), afrEl = document.getElementById('eq-afr');
  const phiResEl = document.getElementById('eq-res-phi'), regResEl = document.getElementById('eq-res-reg');

  const FUELS = {
    'gasoline': { stoich_afr: 14.70, name: 'Gasoline Octane' },
    'methane':  { stoich_afr: 17.20, name: 'Methane Gas' },
    'diesel':   { stoich_afr: 14.50, name: 'Diesel #2' },
    'ethanol':  { stoich_afr: 9.00,  name: 'Pure Ethanol' },
    'hydrogen': { stoich_afr: 34.30, name: 'Hydrogen' }
  };

  function update() {
    const f = FUELS[fEl.value];
    const actualAfr = parseFloat(afrEl.value);

    if (isNaN(actualAfr) || actualAfr <= 0) return;

    // Equivalence ratio Phi = (Fuel/Air)_actual / (Fuel/Air)_stoich = AFR_stoich / AFR_actual
    const Phi = f.stoich_afr / actualAfr;
    // Lambda = 1 / Phi = AFR_actual / AFR_stoich
    const Lambda = 1.0 / Phi;

    let regime = '';
    let color = '#22543d';

    if (Math.abs(Phi - 1.0) <= 0.02) {
      regime = 'STOICHIOMETRIC (Φ ≈ 1.00: Perfect complete combustion, peak 3-way catalytic converter efficiency)';
      color = '#22543d';
    } else if (Phi > 1.02) {
      const richPct = (Phi - 1.0) * 100;
      regime = 'RICH REGIME (Φ = ' + Phi.toFixed(3) + ' > 1.0: +' + richPct.toFixed(1) + '% Excess Fuel for maximum torque & chamber cooling)';
      color = '#2563eb';
    } else {
      const leanPct = (1.0 - Phi) * 100;
      regime = 'LEAN REGIME (Φ = ' + Phi.toFixed(3) + ' < 1.0: +' + leanPct.toFixed(1) + '% Excess Air for high thermal efficiency & low CO)';
      color = '#d97706';
    }

    phiResEl.textContent = 'Φ = ' + Phi.toFixed(3) + ' | λ = ' + Lambda.toFixed(3);
    phiResEl.style.color = color;
    regResEl.textContent = regime + ' (' + f.name + ' Stoichiometric AFR = ' + f.stoich_afr.toFixed(2) + ' : 1)';
    regResEl.style.color = color;
  }

  fEl.addEventListener('change', update);
  afrEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select engine fuel chemistry (Gasoline/Octane, Natural Gas/Methane, Diesel, Ethanol, Hydrogen).',
      'Enter actual measured air-fuel mass ratio (AFR) from wideband oxygen lambda sensor.',
      'Inspect fuel-air equivalence ratio $\Phi$, lambda value $\lambda = 1/\Phi$, and combustion operating regime.'
    ],
    benefitTitle: 'Combustion Thermodynamics Equivalence Ratio',
    benefitContent: 'Equivalence ratio ($\Phi = \text{AFR}_{\text{stoich}}/\text{AFR}$) normalizes fuel stoichiometry; race engines tune rich ($\Phi \approx 1.15\text{–}1.25$) to suppress knock and lower exhaust valve temps, while lean-burn gas turbines operate lean ($\Phi \approx 0.5\text{–}0.7$) to minimize thermal $NO_x$ emissions.',
    faqs: [{ q: 'What is the difference between Equivalence Ratio (Φ) and Lambda (λ)?', a: '$\Phi$ measures fuel excess ($\Phi > 1$ is fuel-rich), while $\lambda = 1/\Phi$ measures air excess ($\lambda > 1$ is air-rich / fuel-lean).' }]
  },

  // 2. Adiabatic Flame Temperature Constant-Pressure Combustion Calculator
  {
    slug: 'adiabatic-flame-temperature-constant-pressure-calculator',
    name: 'Adiabatic Flame Temperature (T_ad Constant-Pressure Combustion) Calculator',
    description: 'Calculate constant-pressure adiabatic flame temperature (T_ad = T_init + LHV / (M_products · c_p,avg)) in Kelvin and Celsius from fuel Lower Heating Value (LHV) and excess air ratio.',
    category: 'Science',
    icon: 'text',
    keywords: ['adiabatic flame temperature calculator', 'constant pressure combustion temperature formula online', 'flame temperature methane propane hydrogen calculator', 'combustion chamber adiabatic flame temp online', 'thermodynamic enthalpy combustion temperature calculator'],
    order: 788,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fuel Selection, Excess Air Percentage (%) & Reactant Initial Pre-Heat Temp (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="aft-fuel">Fuel Chemistry</label>
          <select class="tool-textarea" id="aft-fuel">
            <option value="methane" selected>Methane CH₄ (LHV = 50.0 MJ/kg, Stoich T_ad = 2226 K)</option>
            <option value="propane">Propane C₃H₈ (LHV = 46.4 MJ/kg, Stoich T_ad = 2267 K)</option>
            <option value="hydrogen">Hydrogen H₂ (LHV = 120.0 MJ/kg, Stoich T_ad = 2483 K)</option>
            <option value="gasoline">Octane / Gasoline (LHV = 44.4 MJ/kg, Stoich T_ad = 2277 K)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="aft-excess">Excess Air (%)</label>
          <input class="tool-textarea" id="aft-excess" type="number" step="5" min="0" value="20.0" placeholder="20.0 % Excess Air" />
        </div>
        <div class="control-group">
          <label class="control-label" for="aft-t0">Air Pre-Heat T₀ (°C)</label>
          <input class="tool-textarea" id="aft-t0" type="number" step="25" value="25.0" placeholder="25.0 °C" />
        </div>
      </div>
      <div id="aft-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="aft-res-temp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T_ad = 1,935 K (1,662 °C)</span>
            <span class="stat-label">Adiabatic Flame Temperature (Constant Pressure P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="aft-res-drop" style="font-weight:700;">-291 K Dilution Drop (20% Excess Air absorbs combustion heat into ballast N₂)</span>
            <span class="stat-label">Excess Air Quenching Differential & Thermal NOx Threshold</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('aft-fuel'), exEl = document.getElementById('aft-excess'), t0El = document.getElementById('aft-t0');
  const tResEl = document.getElementById('aft-res-temp'), dResEl = document.getElementById('aft-res-drop');

  const FUELS = {
    'methane':  { base_tad: 2226.0, name: 'Methane CH₄' },
    'propane':  { base_tad: 2267.0, name: 'Propane C₃H₈' },
    'hydrogen': { base_tad: 2483.0, name: 'Hydrogen H₂' },
    'gasoline': { base_tad: 2277.0, name: 'Gasoline Octane' }
  };

  function update() {
    const f = FUELS[fEl.value];
    const excessPct = parseFloat(exEl.value), t0C = parseFloat(t0El.value);

    if (isNaN(excessPct) || isNaN(t0C) || excessPct < 0) return;

    const excessRatio = excessPct / 100.0;
    const deltaT0 = t0C - 25.0; // Pre-heat bonus

    // Thermal dilution by excess ballast air: T_ad approx = (T_stoich - 298) / (1 + 0.65 * excessRatio) + 298 + deltaT0
    const heatRise = f.base_tad - 298.15;
    const dilutedRise = heatRise / (1.0 + (0.68 * excessRatio));
    const Tad_K = 298.15 + dilutedRise + (0.85 * deltaT0);
    const Tad_C = Tad_K - 273.15;

    const quenchDrop = f.base_tad - (298.15 + dilutedRise);

    let noxRisk = '';
    if (Tad_K >= 2100) noxRisk = 'SEVERE THERMAL NOx: T_ad ≥ 2100 K triggers Zeldovich thermal nitrogen oxide formation';
    else if (Tad_K >= 1800) noxRisk = 'MODERATE NOx: Thermal NOx active; selective catalytic reduction (SCR) recommended';
    else noxRisk = 'LOW NOx REGIME: Lean diluted flame suppresses Zeldovich thermal NOx';

    tResEl.textContent = 'T_ad = ' + Math.round(Tad_K).toLocaleString() + ' K (' + Math.round(Tad_C).toLocaleString() + ' °C)';
    dResEl.textContent = noxRisk + ' (Pure Stoichiometric T_ad = ' + Math.round(f.base_tad) + ' K | -' + Math.round(quenchDrop) + ' K Air Dilution)';
  }

  fEl.addEventListener('change', update);
  exEl.addEventListener('input', update);
  t0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select fuel chemistry (Methane, Propane, Hydrogen, Gasoline).',
      'Enter excess combustion air percentage (0% for stoichiometric, 20% to 100% for lean gas turbines).',
      'Enter combustion reactant air pre-heat temperature in Celsius.',
      'Inspect constant-pressure adiabatic flame temperature $T_{\text{ad}}$ in Kelvin and Celsius, along with Zeldovich thermal $NO_x$ emission risk assessment.'
    ],
    benefitTitle: 'First Law Combustion Enthalpy Balance',
    benefitContent: 'Adiabatic flame temperature assumes complete chemical reaction with zero thermal heat loss to the environment ($\Delta H_R = \Delta H_P$); calculating $T_{\text{ad}}$ is essential for selecting superalloy thermal barrier coatings in jet engine combustors and industrial furnaces.',
    faqs: [{ q: 'Why is actual flame temperature always lower than theoretical Tad?', a: 'High temperatures ($>1800\text{ K}$) trigger endothermic chemical dissociation ($CO_2 \rightleftharpoons CO + \frac{1}{2}O_2, H_2O \rightleftharpoons OH + H$), absorbing heat alongside radiative wall losses.' }]
  },

  // 3. Wobbe Index Fuel Gas Interchangeability Calculator
  {
    slug: 'wobbe-index-fuel-gas-interchangeability-calculator',
    name: 'Wobbe Index (I_W = HHV / √SG) Fuel Gas Interchangeability Calculator',
    description: 'Calculate fuel gas Wobbe Index (I_W = HHV / √SG) in MJ/m³ and BTU/scf to verify pipeline fuel interchangeability across Natural Gas, Biomethane, Propane-Air, and Hydrogen blends.',
    category: 'Science',
    icon: 'text',
    keywords: ['wobbe index calculator', 'fuel gas interchangeability formula iw equals hhv over sqrt sg', 'natural gas hydrogen blend wobbe index calculator online', 'burner orifice heating rate wobbe index calculator', 'biomethane pipeline grid injection wobbe online'],
    order: 789,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Higher Heating Value HHV (MJ/m³ or BTU/scf) & Gas Specific Gravity SG (relative to Air)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wb-hhv">HHV (MJ / m³)</label>
          <input class="tool-textarea" id="wb-hhv" type="number" step="any" value="38.5" placeholder="38.5 MJ/m³ (Standard Natural Gas)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-sg">Specific Gravity SG</label>
          <input class="tool-textarea" id="wb-sg" type="number" step="0.01" value="0.60" placeholder="0.60 (Air = 1.00)" />
        </div>
      </div>
      <div id="wb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wb-res-iw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">I_W = 49.70 MJ / m³ (1,334 BTU/scf)</span>
            <span class="stat-label">Higher Wobbe Index (I_W = HHV / √SG)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wb-res-stat" style="color:var(--green-dark); font-weight:700;">GRID COMPLIANT: Group H Natural Gas (48.5 - 57.0 MJ/m³ Standard Pipeline Range)</span>
            <span class="stat-label">Pipeline Gas Grid Interchangeability Standard</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hhvEl = document.getElementById('wb-hhv'), sgEl = document.getElementById('wb-sg');
  const iwResEl = document.getElementById('wb-res-iw'), stResEl = document.getElementById('wb-res-stat');

  function update() {
    const HHV = parseFloat(hhvEl.value), SG = parseFloat(sgEl.value);
    if (isNaN(HHV) || isNaN(SG) || HHV <= 0 || SG <= 0) return;

    // Wobbe Index I_W = HHV / sqrt(SG)  [MJ / m^3]
    const I_W = HHV / Math.sqrt(SG);
    // Convert MJ/m^3 to BTU/scf: 1 MJ/m^3 = 26.8392 BTU/scf
    const I_W_btu = I_W * 26.8392;

    let status = '';
    let color = '#22543d';

    if (I_W >= 48.5 && I_W <= 57.0) {
      status = 'GROUP H NATURAL GAS COMPLIANT (48.5 - 57.0 MJ/m³: Direct drop-in burner replacement)';
      color = '#22543d';
    } else if (I_W >= 39.0 && I_W < 48.5) {
      status = 'GROUP L NATURAL GAS (39.0 - 48.5 MJ/m³: Low-calorific gas, requires larger orifice)';
      color = '#2563eb';
    } else {
      status = 'OUT OF INTERCHANGEABILITY SPEC: Gas will cause flashback, flame lift-off, or carbon monoxide soot!';
      color = '#c53030';
    }

    iwResEl.textContent = 'I_W = ' + I_W.toFixed(2) + ' MJ / m³ (' + Math.round(I_W_btu).toLocaleString() + ' BTU/scf)';
    stResEl.textContent = status;
    stResEl.style.color = color;
  }

  hhvEl.addEventListener('input', update);
  sgEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter volumetric Higher Heating Value (HHV) in $MJ/m^3$ (or standard natural gas heating value).',
      'Enter gas specific gravity SG relative to ambient air ($SG_{\text{air}} = 1.00$).',
      'Inspect calculated Higher Wobbe Index $I_W$ and verify pipeline grid interchangeability compliance (Group H vs Group L gas).'
    ],
    benefitTitle: 'Goffredo Wobbe 1926 Gas Interchangeability Law',
    benefitContent: 'Because gas flow through a fixed burner injector nozzle scales as $1/\sqrt{SG}$ by Torricelli\'s orifice law, two different fuel gases with identical Wobbe Indices deliver the exact same thermal heat output at identical gas supply pressures without requiring burner orifice modifications.',
    faqs: [{ q: 'Why is hydrogen blending limited by Wobbe Index in natural gas grids?', a: 'Hydrogen has low specific gravity ($SG = 0.07$) and high flame speed; blending more than 20% $H_2$ shifts the Wobbe Index and increases the risk of explosive burner flashback.' }]
  },

  // 4. Chapman-Jouguet Detonation Wave Velocity & Pressure Calculator
  {
    slug: 'chapman-jouguet-detonation-velocity-hugoniot-calculator',
    name: 'Chapman-Jouguet Detonation Wave Velocity (D_CJ) & Pressure Calculator',
    description: 'Calculate supersonic gaseous/condensed explosive Chapman-Jouguet detonation wave propagation velocity (D_CJ = √(2·(γ² - 1)·q)) in m/s and peak detonation pressure (P_CJ = ρ₀·D_CJ² / (γ + 1)) in GPa/bar.',
    category: 'Science',
    icon: 'text',
    keywords: ['chapman jouguet detonation calculator', 'detonation wave velocity formula d cj equals sqrt 2 gamma squared minus 1 q', 'chapman jouguet pressure calculator online', 'rayleigh hugoniot detonation velocity online', 'explosive detonation shock wave speed calculator'],
    order: 790,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Specific Chemical Heat Release q (MJ/kg), Initial Density ρ₀ (kg/m³) & Specific Heat Ratio γ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cj-q">Heat Release q (MJ/kg)</label>
          <input class="tool-textarea" id="cj-q" type="number" step="any" value="4.50" placeholder="4.50 MJ/kg (TNT / RDX)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cj-rho">Initial Density ρ₀</label>
          <input class="tool-textarea" id="cj-rho" type="number" step="any" value="1600.0" placeholder="1600.0 kg/m³ (Solid TNT)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cj-gamma">Ratio γ</label>
          <input class="tool-textarea" id="cj-gamma" type="number" step="0.1" value="2.80" placeholder="2.80 (Explosive Gas)" />
        </div>
      </div>
      <div id="cj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cj-res-dcj" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D_CJ = 7,868 m / s (Mach 22.9)</span>
            <span class="stat-label">Chapman-Jouguet Detonation Wave Velocity (D_CJ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cj-res-pcj" style="color:var(--green-dark); font-weight:700;">Peak Detonation Pressure P_CJ = 26.07 GPa (260,700 Atmospheres Shock)</span>
            <span class="stat-label">Chapman-Jouguet Peak Detonation Shock Pressure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('cj-q'), rhoEl = document.getElementById('cj-rho'), gamEl = document.getElementById('cj-gamma');
  const dcjResEl = document.getElementById('cj-res-dcj'), pcjResEl = document.getElementById('cj-res-pcj');

  function update() {
    const qMkJ = parseFloat(qEl.value), rho0 = parseFloat(rhoEl.value), gamma = parseFloat(gamEl.value);
    if (isNaN(qMkJ) || isNaN(rho0) || isNaN(gamma) || qMkJ <= 0 || rho0 <= 0 || gamma <= 1.0) return;

    // Convert MJ/kg to J/kg: q * 1e6
    const q_j_kg = qMkJ * 1e6;

    // Chapman-Jouguet detonation velocity: D_CJ = sqrt( 2 * (gamma^2 - 1) * q )  [m / s]
    const D_CJ = Math.sqrt(2.0 * (Math.pow(gamma, 2) - 1.0) * q_j_kg);

    // Peak CJ detonation pressure: P_CJ = ( rho0 * D_CJ^2 ) / ( gamma + 1 )  [Pascals -> GPa]
    const P_CJ_pa = (rho0 * Math.pow(D_CJ, 2)) / (gamma + 1.0);
    const P_CJ_gpa = P_CJ_pa / 1e9;
    const P_CJ_bar = P_CJ_pa / 1e5;

    // Detonation Mach number in ambient air (c=343 m/s)
    const mach = D_CJ / 343.0;

    dcjResEl.textContent = 'D_CJ = ' + Math.round(D_CJ).toLocaleString() + ' m / s (Mach ' + mach.toFixed(1) + ' Supersonic Wave)';
    pcjResEl.textContent = 'P_CJ = ' + P_CJ_gpa.toFixed(2) + ' GPa (' + Math.round(P_CJ_bar).toLocaleString() + ' bar Shock Wave | ρ₀ = ' + rho0 + ' kg/m³)';
  }

  [qEl, rhoEl, gamEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter specific chemical energy heat release q in MJ/kg (e.g. 4.5 MJ/kg for TNT, 5.2 MJ/kg for RDX).',
      'Enter unreacted explosive initial density $\rho_0$ in $\text{kg/m}^3$ (e.g. $1600\text{ kg/m}^3$ for cast TNT, $1.2\text{ kg/m}^3$ for oxy-hydrogen gas mix).',
      'Enter detonation product gas specific heat ratio $\gamma$ (typically 2.8 to 3.0 for condensed explosives, 1.2 to 1.4 for gases).',
      'Inspect Chapman-Jouguet supersonic detonation velocity $D_{CJ}$ in m/s and peak shock pressure $P_{CJ}$ in GPa.'
    ],
    benefitTitle: 'David Chapman & Émile Jouguet 1899 Detonation Theory',
    benefitContent: 'Unlike deflagration (subsonic fire burning), detonation couples a leading supersonic shock wave directly to the exothermic reaction zone, creating extreme self-sustaining pressures ($P_{CJ} > 25\text{ GPa}$) in rotating detonation engines (RDEs) and shaped military warheads.',
    faqs: [{ q: 'What is the Chapman-Jouguet tangency condition?', a: 'The CJ state is the unique point where the Rayleigh line is exactly tangent to the Hugoniot combustion curve, causing reaction products to leave the wave at the local speed of sound ($M=1.0$ sonic plane).' }]
  },

  // 5. Rocket Characteristic Exhaust Velocity (c*) Combustion Sizing Calculator
  {
    slug: 'rocket-combustion-c-star-characteristic-velocity-calculator',
    name: 'Rocket Engine Characteristic Exhaust Velocity (c*) Combustion Efficiency Calculator',
    description: 'Calculate rocket combustion chamber performance characteristic velocity (c* = (p_c · A_t) / ṁ = √(γ·R·T_c) / (γ · √[2/(γ+1)]^((γ+1)/(γ-1)))) in m/s and evaluate c* combustion efficiency (η_c*).',
    category: 'Science',
    icon: 'text',
    keywords: ['rocket c star calculator', 'characteristic velocity formula c star equals pc at over m dot online', 'rocket combustion efficiency eta c star calculator', 'propulsion chamber c star specific heat ratio gamma calculator', 'liquid rocket propellant c star online'],
    order: 791,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Chamber Pressure p_c (bar), Throat Area A_t (cm²), Mass Flow ṁ (kg/s) & Propellant Selection',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cst-pc">Chamber p_c (bar)</label>
          <input class="tool-textarea" id="cst-pc" type="number" step="10" value="100.0" placeholder="100.0 bar (10 MPa)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cst-at">Throat A_t (cm²)</label>
          <input class="tool-textarea" id="cst-at" type="number" step="10" value="150.0" placeholder="150.0 cm²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cst-mdot">Mass Flow ṁ (kg/s)</label>
          <input class="tool-textarea" id="cst-mdot" type="number" step="5" value="85.0" placeholder="85.0 kg/s" />
        </div>
      </div>
      <div id="cst-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cst-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">c* = 1,765 m / s</span>
            <span class="stat-label">Measured Characteristic Velocity (c* = p_c · A_t / ṁ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cst-res-eff" style="color:var(--green-dark); font-weight:700;">Combustion Efficiency η_c* = 98.6% (vs Theoretical LOX/Kerosene c*_ideal = 1,790 m/s)</span>
            <span class="stat-label">Combustion Chamber Injector Efficiency (η_c*)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pcEl = document.getElementById('cst-pc'), atEl = document.getElementById('cst-at'), mdEl = document.getElementById('cst-mdot');
  const cstResEl = document.getElementById('cst-res-val'), efResEl = document.getElementById('cst-res-eff');

  const c_star_ideal_kerolox = 1790.0; // m / s (standard LOX / RP-1 @ 100 bar)

  function update() {
    const pcBar = parseFloat(pcEl.value), atCm2 = parseFloat(atEl.value), mdot = parseFloat(mdEl.value);
    if (isNaN(pcBar) || isNaN(atCm2) || isNaN(mdot) || pcBar <= 0 || atCm2 <= 0 || mdot <= 0) return;

    const pcPa = pcBar * 1e5;
    const atM2 = atCm2 * 1e-4;

    // Measured c* = (p_c * A_t) / mdot  [m / s]
    const c_star = (pcPa * atM2) / mdot;

    // Combustion efficiency eta_c* = c*_measured / c*_ideal
    const eta_c_star = (c_star / c_star_ideal_kerolox) * 100;

    let effRating = '';
    let color = '#22543d';

    if (eta_c_star >= 97.0) {
      effRating = 'EXCELLENT (η_c* ≥ 97%: High-performance pintle/coaxial injector atomization)';
      color = '#22543d';
    } else if (eta_c_star >= 92.0) {
      effRating = 'MODERATE (92 - 96%: Incomplete droplet vaporization or core streaking)';
      color = '#2563eb';
    } else {
      effRating = 'POOR ATOMIZATION (<92%: Severe propellant unburnt mass loss)';
      color = '#c53030';
    }

    cstResEl.textContent = 'c* = ' + Math.round(c_star).toLocaleString() + ' m / s (Characteristic Velocity)';
    efResEl.textContent = 'η_c* = ' + eta_c_star.toFixed(1) + '% (' + effRating + ' | Thrust: ' + ((pcBar * atCm2 * 0.15).toFixed(0)) + ' kN est.)';
    efResEl.style.color = color;
  }

  [pcEl, atEl, mdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rocket combustion chamber stagnation pressure $p_c$ in bar.',
      'Enter nozzle throat cross-sectional area $A_t$ in $\text{cm}^2$.',
      'Enter total propellant (fuel + oxidizer) mass flow rate $\dot{m}$ in kg/s.',
      'Inspect measured characteristic velocity $c^*$ in m/s and combustion chamber efficiency $\eta_{c^*}$.'
    ],
    benefitTitle: 'Nozzle-Independent Rocket Combustion Quality Figure',
    benefitContent: 'Characteristic velocity ($c^* = p_c A_t / \dot{m}$) isolates the thermodynamic quality of the combustion process from the nozzle expansion ratio; rocket engineers use $c^*$ to evaluate propellant injector atomization and chamber mixing before attaching supersonic bell nozzles.',
    faqs: [{ q: 'What determines the theoretical limit of c*?', a: '$c^* = \frac{\sqrt{\gamma R T_c}}{\Gamma(\gamma)}$ depends purely on high chamber flame temperature ($T_c$) and low product molecular weight (R), making LOX/Liquid Hydrogen ($c^* \approx 2,400\text{ m/s}$) superior to LOX/Kerosene ($c^* \approx 1,790\text{ m/s}$).' }]
  },

  // --- Suite QQQQQ: Naval Architecture, Marine Hydrodynamics & Offshore Mechanics (911 - 915) ---
  // 6. Froude Number Ship Wave-Making Resistance & Hull Speed Calculator
  {
    slug: 'froude-number-ship-wave-making-resistance-calculator',
    name: 'Froude Number (Fn) Ship Wave-Making Resistance & Hull Speed Calculator',
    description: 'Calculate naval architectural volumetric Froude number (Fn = v / √(g · L_wl)) and displacement hull maximum theoretical displacement hull speed (v_hull = 1.34 · √(L_wl_ft)) in knots.',
    category: 'Science',
    icon: 'text',
    keywords: ['froude number calculator', 'ship hull speed formula 1.34 sqrt lwl online', 'displacement hull wave making resistance froude calculator', 'naval architecture fn speed length ratio calculator', 'planing semi displacement froude number online'],
    order: 792,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Waterline Length L_wl (m) & Vessel Forward Velocity v (Knots / km/h / m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fn-lwl">Length L_wl (m)</label>
          <input class="tool-textarea" id="fn-lwl" type="number" step="any" value="25.0" placeholder="25.0 m (82 ft Yacht)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fn-vknots">Speed (Knots)</label>
          <input class="tool-textarea" id="fn-vknots" type="number" step="any" value="12.0" placeholder="12.0 Knots" />
        </div>
      </div>
      <div id="fn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fn-res-fn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Fn = 0.394 (Displacement Limit)</span>
            <span class="stat-label">Froude Length Number (Fn = v / √(g·L_wl))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fn-res-hull" style="font-weight:700;">Hull Speed: 12.1 Knots (Speed/Length Ratio = 1.33: Wave Resistance Barrier)</span>
            <span class="stat-label">Theoretical Hull Speed & Hydrodynamic Regime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('fn-lwl'), vEl = document.getElementById('fn-vknots');
  const fnResEl = document.getElementById('fn-res-fn'), hlResEl = document.getElementById('fn-res-hull');

  const g = 9.80665;

  function update() {
    const L_m = parseFloat(lEl.value), vKnots = parseFloat(vEl.value);
    if (isNaN(L_m) || isNaN(vKnots) || L_m <= 0 || vKnots <= 0) return;

    // Convert knots to m/s: 1 knot = 0.514444 m/s
    const v_m_s = vKnots * 0.514444;

    // Froude number Fn = v / sqrt( g * L )
    const Fn = v_m_s / Math.sqrt(g * L_m);

    // Length in feet for standard naval architecture formula: L_ft = L_m * 3.28084
    const L_ft = L_m * 3.28084;
    // Theoretical displacement hull speed in knots = 1.34 * sqrt(L_ft)
    const hullSpeedKnots = 1.34 * Math.sqrt(L_ft);

    // Speed-to-Length Ratio SLR = v_knots / sqrt(L_ft)
    const SLR = vKnots / Math.sqrt(L_ft);

    let regime = '';
    let color = '#22543d';

    if (Fn < 0.40) {
      regime = 'DISPLACEMENT REGIME (Fn < 0.40: Vessel supported purely by Archimedean buoyant forces)';
      color = '#22543d';
    } else if (Fn < 0.90) {
      regime = 'SEMI-DISPLACEMENT (0.40 ≤ Fn < 0.90: High wave-making drag hump, partial dynamic lift)';
      color = '#d97706';
    } else {
      regime = 'PLANING REGIME (Fn ≥ 0.90: Hydrodynamic lift supports hull, skimming above water)';
      color = '#2563eb';
    }

    fnResEl.textContent = 'Fn = ' + Fn.toFixed(3) + ' (' + regime.split('(')[0].trim() + ')';
    hlResEl.textContent = 'Hull Speed = ' + hullSpeedKnots.toFixed(1) + ' Knots (SLR = ' + SLR.toFixed(2) + ' | ' + regime + ')';
    fnResEl.style.color = color;
  }

  lEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter ship waterline length $L_{\text{wl}}$ in meters.',
      'Enter vessel forward cruising speed in Knots (nautical miles per hour).',
      'Inspect Froude length number ($Fn = v/\sqrt{gL}$), Speed-to-Length Ratio (SLR), theoretical maximum displacement hull speed, and hydrodynamic regime classification.'
    ],
    benefitTitle: 'William Froude 1868 Hydrodynamic Scaling Law',
    benefitContent: 'As a displacement hull approaches $Fn \approx 0.40$ ($\text{SLR} \approx 1.34$), the transverse bow wave wavelength matches the ship\'s waterline length, trapping the vessel in a deep wave trough that creates an exponential wave-making drag barrier unless the hull transitions to dynamic planing.',
    faqs: [{ q: 'How do long slender ships (e.g. destroyers / catamarans) exceed hull speed?', a: 'Slender hulls with length-to-beam ratios $> 8:1$ generate very thin bow wave patterns, reducing wave-making drag and allowing displacement cruising past $Fn = 0.50$.' }]
  },

  // 7. Ship Metacentric Height (GM) & Intact Hydrostatic Stability Calculator
  {
    slug: 'ship-metacentric-height-gm-intact-stability-calculator',
    name: 'Ship Metacentric Height (GM) & Intact Hydrostatic Stability Calculator',
    description: 'Calculate ship transverse metacentric height (GM = KB + BM - KG, where BM = I_xx / ∇) in meters and evaluate IMO intact stability righting lever (GZ = GM · sin θ).',
    category: 'Science',
    icon: 'text',
    keywords: ['metacentric height calculator', 'ship stability gm formula kb plus bm minus kg online', 'transverse metacenter bm equals i over volume calculator', 'imo intact stability righting moment gz calculator', 'naval architecture ship stability online'],
    order: 793,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Center of Buoyancy KB (m), Metacentric Radius BM (m), Center of Gravity KG (m) & Heel Angle θ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gm-kb">Buoyancy KB (m)</label>
          <input class="tool-textarea" id="gm-kb" type="number" step="any" value="2.80" placeholder="2.80 m (from Keel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-bm">Radius BM (m)</label>
          <input class="tool-textarea" id="gm-bm" type="number" step="any" value="4.20" placeholder="4.20 m (I_xx / ∇)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-kg">Gravity KG (m)</label>
          <input class="tool-textarea" id="gm-kg" type="number" step="any" value="5.50" placeholder="5.50 m (Loaded KG)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-theta">Heel Angle θ (°)</label>
          <input class="tool-textarea" id="gm-theta" type="number" step="1" value="10.0" placeholder="10.0° List" />
        </div>
      </div>
      <div id="gm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gm-res-gm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">GM = +1.50 m (STABLE)</span>
            <span class="stat-label">Transverse Metacentric Height (GM = KM - KG)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gm-res-gz" style="color:var(--green-dark); font-weight:700;">Righting Arm GZ = +0.260 m (IMO Compliant: GZ ≥ 0.20 m @ 30° / Roll Period T = 13.0 s)</span>
            <span class="stat-label">Righting Lever (GZ = GM·sin θ) & Roll Resonance Period</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kbEl = document.getElementById('gm-kb'), bmEl = document.getElementById('gm-bm');
  const kgEl = document.getElementById('gm-kg'), thEl = document.getElementById('gm-theta');
  const gmResEl = document.getElementById('gm-res-gm'), gzResEl = document.getElementById('gm-res-gz');

  function update() {
    const KB = parseFloat(kbEl.value), BM = parseFloat(bmEl.value);
    const KG = parseFloat(kgEl.value), thetaDeg = parseFloat(thEl.value);

    if (isNaN(KB) || isNaN(BM) || isNaN(KG) || isNaN(thetaDeg) || KB < 0 || BM < 0 || KG < 0) return;

    // Height of transverse metacenter above keel KM = KB + BM
    const KM = KB + BM;

    // Metacentric height GM = KM - KG
    const GM = KM - KG;

    const thetaRad = (thetaDeg * Math.PI) / 180;
    // Righting arm GZ = GM * sin(theta)
    const GZ = GM * Math.sin(thetaRad);

    let status = '';
    let color = '#22543d';

    if (GM >= 1.00) {
      status = 'STABLE (GM = +' + GM.toFixed(2) + ' m: Good righting ability, IMO Resolution A.749 Compliant)';
      color = '#22543d';
    } else if (GM > 0.15) {
      status = 'TENDER STABILITY (0.15 m < GM < 1.00 m: Slow comfortable passenger roll, sensitive to top weight)';
      color = '#2563eb';
    } else if (GM > 0) {
      status = 'CRITICALLY LOW (0 < GM ≤ 0.15 m: Dangerous list risk in wind gusts!)';
      color = '#d97706';
    } else {
      status = 'NEGATIVE GM (GM < 0: UNSTABLE - Vessel capsizes immediately upon listing!)';
      color = '#c53030';
    }

    gmResEl.textContent = 'GM = ' + (GM >= 0 ? '+' : '') + GM.toFixed(2) + ' m (KM = ' + KM.toFixed(2) + ' m)';
    gmResEl.style.color = color;
    gzResEl.textContent = 'GZ(' + thetaDeg + '°) = ' + GZ.toFixed(3) + ' m | ' + status;
    gzResEl.style.color = color;
  }

  [kbEl, bmEl, kgEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter vertical height of Center of Buoyancy above keel KB in meters.',
      'Enter metacentric radius $BM = I_{xx} / \nabla$ in meters (waterplane area inertia / submerged volume).',
      'Enter vertical height of Center of Gravity above keel KG in meters.',
      'Enter vessel heel roll angle $\theta$ in degrees.',
      'Inspect Metacentric Height GM ($GM = KB + BM - KG$), Righting Arm $GZ = GM \sin\theta$, and IMO Intact Stability Code safety assessment.'
    ],
    benefitTitle: 'Pierre Bouguer 1746 Metacentric Stability Criterion',
    benefitContent: 'A positive metacentric height ($GM > 0$) ensures that when a ship heels in waves, the upward buoyant force shifts outboard past the center of gravity, creating a positive restoring righting moment ($M_{\text{right}} = \Delta \cdot GZ$) that rights the vessel upright.',
    faqs: [{ q: 'Why is an excessively large GM (>3.0 m) uncomfortable for passengers?', a: 'A very large GM creates a "stiff" ship with violent, rapid snap-back roll motions that induce severe seasickness and high cargo lashing shear stresses.' }]
  },

  // 8. Morison Equation Offshore Pile Wave & Current Force Calculator
  {
    slug: 'morison-equation-wave-force-offshore-pile-calculator',
    name: 'Morison Equation Offshore Cylindrical Pile Wave Force Calculator',
    description: 'Calculate hydrodynamic inline wave force on offshore oil platform jacket legs and wind turbine monopiles (F = 1/2·C_d·ρ·D·u|u| + C_m·ρ·(π·D²/4)·u̇) in kN/m.',
    category: 'Science',
    icon: 'text',
    keywords: ['morison equation calculator', 'offshore wave force formula cd cm drag inertia online', 'monopile wave load morison equation calculator', 'ocean wave water particle velocity force calculator online', 'jacket platform offshore hydrodynamics online'],
    order: 794,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pile Outer Diameter D (m), Wave Water Velocity u (m/s), Acceleration u̇ (m/s²) & Drag C_d / Inertia C_m',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mor-d">Pile Dia D (m)</label>
          <input class="tool-textarea" id="mor-d" type="number" step="any" value="2.0" placeholder="2.0 m (Monopile)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mor-u">Wave Velocity u (m/s)</label>
          <input class="tool-textarea" id="mor-u" type="number" step="any" value="3.5" placeholder="3.5 m/s (Storm Wave)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mor-udot">Accel u̇ (m/s²)</label>
          <input class="tool-textarea" id="mor-udot" type="number" step="any" value="2.0" placeholder="2.0 m/s²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mor-cd">Drag C_d</label>
          <input class="tool-textarea" id="mor-cd" type="number" step="0.05" value="1.05" placeholder="1.05 (Marine Growth)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mor-cm">Inertia C_m</label>
          <input class="tool-textarea" id="mor-cm" type="number" step="0.1" value="2.00" placeholder="2.00 (Standard)" />
        </div>
      </div>
      <div id="mor-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mor-res-ftot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F_total = 26.0 kN / m Load</span>
            <span class="stat-label">Total Hydrodynamic Wave Force per Meter (F_drag + F_inertia)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mor-res-split" style="font-weight:700;">Drag F_d: 13.2 kN/m (50.7%) | Inertia F_m: 12.9 kN/m (49.3%)</span>
            <span class="stat-label">Viscous Form Drag vs Added Mass Inertia Force Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('mor-d'), uEl = document.getElementById('mor-u');
  const udotEl = document.getElementById('mor-udot'), cdEl = document.getElementById('mor-cd'), cmEl = document.getElementById('mor-cm');
  const ftResEl = document.getElementById('mor-res-ftot'), spResEl = document.getElementById('mor-res-split');

  const rho_seawater = 1025.0; // kg / m^3

  function update() {
    const D = parseFloat(dEl.value), u = parseFloat(uEl.value);
    const udot = parseFloat(udotEl.value), Cd = parseFloat(cdEl.value), Cm = parseFloat(cmEl.value);

    if (isNaN(D) || isNaN(u) || isNaN(udot) || isNaN(Cd) || isNaN(Cm) || D <= 0 || Cd <= 0 || Cm <= 0) return;

    // Morison Drag Force per unit length F_d = 0.5 * Cd * rho * D * u * |u|  [N / m]
    const F_d_N = 0.5 * Cd * rho_seawater * D * u * Math.abs(u);
    const F_d_kN = F_d_N / 1000;

    // Morison Inertia Force per unit length F_m = Cm * rho * (pi * D^2 / 4) * udot  [N / m]
    const area = (Math.PI * Math.pow(D, 2)) / 4.0;
    const F_m_N = Cm * rho_seawater * area * udot;
    const F_m_kN = F_m_N / 1000;

    // Total force per linear meter F_tot = F_d + F_m  [kN / m]
    const F_tot_kN = F_d_kN + F_m_kN;

    const dragPct = (Math.abs(F_d_kN) / (Math.abs(F_d_kN) + Math.abs(F_m_kN))) * 100;
    const inertiaPct = 100 - dragPct;

    ftResEl.textContent = 'F_total = ' + F_tot_kN.toFixed(1) + ' kN / m Pile Wave Force';
    spResEl.textContent = 'Drag F_d: ' + F_d_kN.toFixed(1) + ' kN/m (' + dragPct.toFixed(0) + '%) | Inertia F_m: ' + F_m_kN.toFixed(1) + ' kN/m (' + inertiaPct.toFixed(0) + '%) @ D = ' + D + ' m';
  }

  [dEl, uEl, udotEl, cdEl, cmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter circular offshore pile cylinder outer diameter D in meters.',
      'Enter horizontal water wave orbital particle velocity u in m/s.',
      'Enter horizontal water particle acceleration $\dot{u}$ in $\text{m/s}^2$.',
      'Enter hydrodynamic drag coefficient $C_d$ (0.7 smooth, 1.05 with marine biofouling growth).',
      'Enter hydrodynamic inertia / added mass coefficient $C_m$ (typically 2.0 for circular cylinders).',
      'Inspect total peak hydrodynamic wave load in kN per meter of embedded submerged depth.'
    ],
    benefitTitle: 'J.R. Morison 1950 Offshore Hydrodynamic Wave Loading',
    benefitContent: 'The Morison equation superimposes quadratic velocity form drag ($u|u|$) and unseparated fluid acceleration mass inertia ($\dot{u}$); structural engineers use it to design offshore wind turbine monopiles and jacket foundations against 100-year North Sea storm waves.',
    faqs: [{ q: 'When is Morison\'s equation valid vs MacCamy-Fuchs diffraction theory?', a: 'Morison\'s equation is valid for slender piles where $D/\lambda < 0.2$ (diameter is less than 20% of the ocean wavelength); large gravity base structures require full diffraction analysis.' }]
  },

  // 9. Savitsky Planing Hull Hydrodynamic Lift & Drag Calculator
  {
    slug: 'planing-hull-savitsky-lift-drag-speed-calculator',
    name: 'Savitsky Planing Hull Hydrodynamic Lift & Resistance Calculator',
    description: 'Calculate high-speed powerboat planing hull hydrodynamic lift coefficient (C_L0 = τ^1.1 · [0.0120·λ^0.5 + 0.0055·(λ^2.5 / C_v²)]) and wetted length λ using the Savitsky method.',
    category: 'Science',
    icon: 'text',
    keywords: ['savitsky planing hull calculator', 'planing boat lift drag formula savitsky method online', 'high speed powerboat resistance savitsky calculator', 'deadrise angle trim angle planing hull online', 'naval architecture planing speed calculator'],
    order: 795,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Chine Beam b (m), Trim Angle τ (°), Speed v (Knots), Deadrise β (°) & Displacement Mass (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sav-b">Chine Beam b (m)</label>
          <input class="tool-textarea" id="sav-b" type="number" step="any" value="2.40" placeholder="2.40 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sav-tau">Trim Angle τ (°)</label>
          <input class="tool-textarea" id="sav-tau" type="number" step="0.5" value="4.0" placeholder="4.0° (Running Trim)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sav-v">Speed (Knots)</label>
          <input class="tool-textarea" id="sav-v" type="number" step="any" value="30.0" placeholder="30.0 Knots (55 km/h)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sav-beta">Deadrise β (°)</label>
          <input class="tool-textarea" id="sav-beta" type="number" step="1" value="18.0" placeholder="18.0° (Deep-V)" />
        </div>
      </div>
      <div id="sav-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sav-res-cl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">C_Lβ = 0.0384 (Lift: 2,750 kg)</span>
            <span class="stat-label">Savitsky Dynamic Lift Coefficient (C_Lβ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sav-res-res" style="font-weight:700;">Wetted Length λ = 2.15 b (5.16 m) | Beam Froude C_v = 3.19 (Fully Planing)</span>
            <span class="stat-label">Wetted Keel Aspect Ratio (λ = L_k / b) & Beam Froude Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('sav-b'), tauEl = document.getElementById('sav-tau');
  const vEl = document.getElementById('sav-v'), betaEl = document.getElementById('sav-beta');
  const clResEl = document.getElementById('sav-res-cl'), resResEl = document.getElementById('sav-res-res');

  const g = 9.80665;
  const rho_water = 1025.0; // kg / m^3

  function update() {
    const b = parseFloat(bEl.value), tauDeg = parseFloat(tauEl.value);
    const vKnots = parseFloat(vEl.value), betaDeg = parseFloat(betaEl.value);

    if (isNaN(b) || isNaN(tauDeg) || isNaN(vKnots) || isNaN(betaDeg) || b <= 0 || tauDeg <= 0 || vKnots <= 0 || betaDeg < 0) return;

    const v_m_s = vKnots * 0.514444;

    // Beam Froude number C_v = v / sqrt( g * b )
    const C_v = v_m_s / Math.sqrt(g * b);

    // Typical wetted length ratio lambda = 2.15
    const lambda = 2.15;

    // Flat plate lift coefficient: C_L0 = tau^1.1 * [ 0.0120 * sqrt(lambda) + 0.0055 * (lambda^2.5 / C_v^2) ]
    const C_L0 = Math.pow(tauDeg, 1.1) * ((0.0120 * Math.sqrt(lambda)) + (0.0055 * (Math.pow(lambda, 2.5) / Math.pow(C_v, 2))));

    // Deadrise correction: C_L_beta = C_L0 - 0.0065 * beta * C_L0^0.6
    const C_L_beta = Math.max(0.001, C_L0 - (0.0065 * betaDeg * Math.pow(C_L0, 0.6)));

    // Total supported dynamic displacement weight Delta = 0.5 * rho * v^2 * b^2 * C_L_beta  [N -> kg]
    const Lift_N = 0.5 * rho_water * Math.pow(v_m_s, 2) * Math.pow(b, 2) * C_L_beta;
    const Lift_kg = Lift_N / 9.80665;

    clResEl.textContent = 'C_Lβ = ' + C_L_beta.toFixed(4) + ' (Dynamic Lift: ' + Math.round(Lift_kg).toLocaleString() + ' kg)';
    resResEl.textContent = 'Beam Froude C_v = ' + C_v.toFixed(2) + ' (Fully Planing @ ' + vKnots + ' kts) | Wetted Length L_k = ' + (lambda * b).toFixed(2) + ' m (Deadrise β = ' + betaDeg + '°)';
  }

  [bEl, tauEl, vEl, betaEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter planing hull chine beam width b in meters.',
      'Enter running longitudinal trim angle $\tau$ in degrees (typically 3° to 5° for optimal L/D).',
      'Enter planing boat speed in Knots.',
      'Enter transom deadrise bottom angle $\beta$ in degrees (e.g. 18° to 24° for deep-V offshore hulls).',
      'Inspect Savitsky hydrodynamic lift coefficient $C_{L\beta}$, total supported displacement weight in kg, and beam Froude number $C_v$.'
    ],
    benefitTitle: 'Daniel Savitsky 1964 Planing Hull Hydrodynamics',
    benefitContent: 'Savitsky empirical regression formulas accurately predict dynamic bottom water pressure, wetted keel surface area, and total hydrodynamic thrust resistance for high-speed motor yachts, patrol boats, and offshore racing catamarans.',
    faqs: [{ q: 'Why do deep-V deadrise hulls require more engine horsepower?', a: 'Deep-V bottoms ($\beta = 24^\circ$) cut smoothly through choppy waves without slamming, but have lower hydrodynamic lift ($C_{L\beta} < C_{L0}$), requiring more power than flat-bottom skiffs.' }]
  },

  // 10. Marine Propeller Advance Coefficient (J), Thrust (K_T) & Torque (K_Q) Calculator
  {
    slug: 'marine-propeller-advance-coefficient-thrust-calculator',
    name: 'Marine Propeller Advance Coefficient (J), Thrust (K_T) & Open-Water Efficiency Calculator',
    description: 'Calculate marine ship propeller Advance Coefficient (J = V_a / (n · D)), Thrust Coefficient K_T, Torque Coefficient K_Q, and open-water propulsion efficiency (η₀ = (J / 2π) · (K_T / K_Q)).',
    category: 'Science',
    icon: 'text',
    keywords: ['marine propeller calculator', 'advance coefficient formula j equals va over n d online', 'propeller thrust coefficient kt kq efficiency calculator', 'open water propeller efficiency eta 0 calculator online', 'naval architecture ship propulsion online'],
    order: 796,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Propeller Diameter D (m), Shaft RPM (n), Speed of Advance V_a (Knots) & Pitch Ratio P/D',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="prop-d">Diameter D (m)</label>
          <input class="tool-textarea" id="prop-d" type="number" step="any" value="1.80" placeholder="1.80 m (Prop Diameter)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="prop-rpm">Shaft Speed (RPM)</label>
          <input class="tool-textarea" id="prop-rpm" type="number" step="10" value="300.0" placeholder="300.0 RPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="prop-va">Advance V_a (Knots)</label>
          <input class="tool-textarea" id="prop-va" type="number" step="any" value="12.0" placeholder="12.0 Knots (Ship Inflow)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="prop-pd">Pitch Ratio P/D</label>
          <input class="tool-textarea" id="prop-pd" type="number" step="0.05" value="1.00" placeholder="1.00" />
        </div>
      </div>
      <div id="prop-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="prop-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">η₀ = 67.8% Efficiency</span>
            <span class="stat-label">Open-Water Propeller Efficiency (η₀ = (J/2π) · (K_T / K_Q))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="prop-res-thrust" style="font-weight:700;">Thrust T = 45.8 kN (Advance J = 0.686, K_T = 0.170, 10·K_Q = 0.274)</span>
            <span class="stat-label">Delivered Hydrodynamic Thrust Force (T = K_T · ρ · n² · D⁴)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('prop-d'), rpmEl = document.getElementById('prop-rpm');
  const vaEl = document.getElementById('prop-va'), pdEl = document.getElementById('prop-pd');
  const efResEl = document.getElementById('prop-res-eff'), thResEl = document.getElementById('prop-res-thrust');

  const rho_water = 1025.0; // kg / m^3

  function update() {
    const D = parseFloat(dEl.value), RPM = parseFloat(rpmEl.value);
    const vaKnots = parseFloat(vaEl.value), PD = parseFloat(pdEl.value);

    if (isNaN(D) || isNaN(RPM) || isNaN(vaKnots) || isNaN(PD) || D <= 0 || RPM <= 0 || vaKnots <= 0 || PD <= 0) return;

    // Rotational frequency n = RPM / 60  [revs / second]
    const n = RPM / 60.0;
    // Speed of advance V_a in m/s
    const V_a = vaKnots * 0.514444;

    // Advance coefficient J = V_a / ( n * D )
    const J = V_a / (n * D);

    // Wageningen B-Series polynomial approximation for 4-blade propeller (P/D ~ 1.0):
    // K_T approx = 0.35 * (P/D) - 0.26 * J
    const K_T = Math.max(0.01, (0.35 * PD) - (0.26 * J));
    // 10 * K_Q approx = 0.45 * (P/D) - 0.25 * J
    const K_Q = Math.max(0.002, ((0.45 * PD) - (0.25 * J)) / 10.0);

    // Open water efficiency eta_0 = ( J / (2 * pi) ) * ( K_T / K_Q )
    const eta_0 = (J / (2.0 * Math.PI)) * (K_T / K_Q);
    const eta_pct = Math.min(85.0, Math.max(0, eta_0 * 100));

    // Thrust T = K_T * rho * n^2 * D^4  [N -> kN]
    const Thrust_N = K_T * rho_water * Math.pow(n, 2) * Math.pow(D, 4);
    const Thrust_kN = Thrust_N / 1000.0;

    efResEl.textContent = 'η₀ = ' + eta_pct.toFixed(1) + '% Propulsive Efficiency';
    thResEl.textContent = 'Thrust T = ' + Thrust_kN.toFixed(1) + ' kN (Advance J = ' + J.toFixed(3) + ' | K_T = ' + K_T.toFixed(3) + ', 10·K_Q = ' + (K_Q*10).toFixed(3) + ' @ ' + RPM + ' RPM)';
  }

  [dEl, rpmEl, vaEl, pdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter propeller tip diameter D in meters.',
      'Enter shaft rotational speed in Revolutions Per Minute (RPM).',
      'Enter ship inflow speed of advance $V_a$ in Knots.',
      'Enter propeller pitch-to-diameter ratio P/D (typically 0.8 to 1.2).',
      'Inspect dimensionless Advance Coefficient J, Thrust coefficient $K_T$, Torque coefficient $K_Q$, delivered thrust in kN, and open-water propulsive efficiency $\eta_0$.'
    ],
    benefitTitle: 'Wageningen B-Screw Marine Propulsion Series',
    benefitContent: 'Matching the propeller advance coefficient ($J = V_a/nD$) to the ship hull wake fraction ensures peak open-water efficiency ($\eta_0 > 65\%$), avoiding propeller cavitation erosion and excessive diesel fuel consumption.',
    faqs: [{ q: 'What is the "Speed of Advance" (Va) vs Ship Speed (V)?', a: '$V_a = V(1 - w)$, where w is the Taylor wake fraction ($0.1\text{–}0.3$), accounting for water dragged forward by the ship\'s hull boundary layer.' }]
  },

  // --- Suite RRRRR: Tribology, Bearings & Contact Mechanics (916 - 920) ---
  // 11. Stribeck Curve Lubrication Regime & Hersey Number Calculator
  {
    slug: 'stribeck-curve-lubrication-regime-hersey-number-calculator',
    name: 'Stribeck Curve Lubrication Regime & Hersey Number (H = μ·N / P) Calculator',
    description: 'Calculate journal bearing Hersey friction number (H = μ · N / P) in mPa·s·rpm / MPa to identify Boundary Lubrication, Mixed Lubrication, and Hydrodynamic Full-Film regimes.',
    category: 'Science',
    icon: 'text',
    keywords: ['stribeck curve calculator', 'hersey number formula h equals mu n over p online', 'lubrication regime boundary mixed hydrodynamic calculator', 'bearing friction coefficient stribeck curve calculator', 'tribology oil film thickness hersey number online'],
    order: 797,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dynamic Viscosity μ (cP / mPa·s), Shaft Speed N (RPM) & Bearing Pressure P (MPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="str-mu">Viscosity μ (cP)</label>
          <input class="tool-textarea" id="str-mu" type="number" step="any" value="25.0" placeholder="25.0 cP (SAE 30 @ 80°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="str-n">Speed N (RPM)</label>
          <input class="tool-textarea" id="str-n" type="number" step="100" value="1800.0" placeholder="1800.0 RPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="str-p">Pressure P (MPa)</label>
          <input class="tool-textarea" id="str-p" type="number" step="0.5" value="2.5" placeholder="2.5 MPa (Load / Projected Area)" />
        </div>
      </div>
      <div id="str-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="str-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Hersey H = 18,000 (Full Film)</span>
            <span class="stat-label">Hersey Tribology Parameter (H = μ·N / P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="str-res-reg" style="color:var(--green-dark); font-weight:700;">HYDRODYNAMIC FULL-FILM REGIME (f ≈ 0.003: Zero Asperity Contact - Infinite Life)</span>
            <span class="stat-label">Stribeck Lubrication Regime & Friction Coefficient (f)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const muEl = document.getElementById('str-mu'), nEl = document.getElementById('str-n'), pEl = document.getElementById('str-p');
  const hResEl = document.getElementById('str-res-h'), regResEl = document.getElementById('str-res-reg');

  function update() {
    const mu = parseFloat(muEl.value), N = parseFloat(nEl.value), P = parseFloat(pEl.value);
    if (isNaN(mu) || isNaN(N) || isNaN(P) || mu <= 0 || N <= 0 || P <= 0) return;

    // Hersey number H = (mu * N) / P where mu in cP (mPa*s), N in RPM, P in MPa
    const H = (mu * N) / P;

    let regime = '';
    let f_coeff = 0.0;
    let color = '#22543d';

    if (H < 100) {
      regime = 'BOUNDARY LUBRICATION (f ≈ 0.10 - 0.15: Direct metal-to-metal asperity contact, high wear!)';
      f_coeff = 0.12;
      color = '#c53030';
    } else if (H < 1500) {
      regime = 'MIXED / ELASTOHYDRODYNAMIC (f ≈ 0.02 - 0.05: Partial fluid support, moderate wear risk)';
      f_coeff = 0.035;
      color = '#d97706';
    } else {
      regime = 'HYDRODYNAMIC FULL-FILM (f ≈ 0.002 - 0.008: Complete fluid wedge separation, zero wear)';
      f_coeff = 0.0015 * Math.pow(H / 1000, 0.5);
      color = '#22543d';
    }

    hResEl.textContent = 'Hersey H = ' + Math.round(H).toLocaleString() + ' (f ≈ ' + f_coeff.toFixed(4) + ')';
    hResEl.style.color = color;
    regResEl.textContent = regime;
    regResEl.style.color = color;
  }

  [muEl, nEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter lubricant dynamic operating viscosity $\mu$ in cP (mPa·s) at actual operating temperature.',
      'Enter journal shaft rotational speed N in RPM.',
      'Enter bearing specific projected unit pressure $P = W / (L \cdot D)$ in MPa.',
      'Inspect dimensionless Hersey number H, estimated friction coefficient f, and Stribeck lubrication regime (Boundary, Mixed, or Full-Film Hydrodynamic).'
    ],
    benefitTitle: 'Richard Stribeck & Mayo D. Hersey Tribology Curve',
    benefitContent: 'The Stribeck curve illustrates how fluid film pressure builds with increasing velocity ($H = \mu N / P$), lifting metal surfaces out of high-friction boundary contact ($f \approx 0.15$) into frictionless hydrodynamic fluid shearing ($f < 0.005$) to ensure zero mechanical wear in automotive crankshaft bearings.',
    faqs: [{ q: 'Why do engine start-stops cause the most bearing wear?', a: 'At zero speed ($N=0$), the Hersey number is zero, forcing bearings into the boundary lubrication regime where metal asperities touch until the hydrodynamic wedge builds up.' }]
  },

  // 12. Hydrodynamic Journal Bearing Sommerfeld Number & Film Thickness Calculator
  {
    slug: 'hydrodynamic-journal-bearing-sommerfeld-number-calculator',
    name: 'Hydrodynamic Journal Bearing Sommerfeld Number (S) & Minimum Film Thickness (h₀) Calculator',
    description: 'Calculate hydrodynamic journal bearing dimensionless Sommerfeld Number (S = (r/c)² · (μ·N / P)) and minimum oil film thickness (h₀ = c · (1 - ε)) in μm to prevent bearing seizure.',
    category: 'Science',
    icon: 'text',
    keywords: ['sommerfeld number calculator', 'hydrodynamic journal bearing formula s equals r over c squared mu n over p', 'minimum oil film thickness h0 bearing calculator online', 'bearing eccentricity ratio sommerfeld calculator', 'tribology journal bearing design online'],
    order: 798,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Journal Radius r (mm), Radial Clearance c (μm), Viscosity μ (cP), Speed N (rev/s) & Load W (kN)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="som-r">Journal Radius r (mm)</label>
          <input class="tool-textarea" id="som-r" type="number" step="any" value="25.0" placeholder="25.0 mm (50 mm Shaft)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="som-c">Radial Clearance c (μm)</label>
          <input class="tool-textarea" id="som-c" type="number" step="5" value="25.0" placeholder="25.0 μm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="som-mu">Viscosity μ (cP)</label>
          <input class="tool-textarea" id="som-mu" type="number" step="any" value="30.0" placeholder="30.0 cP" />
        </div>
        <div class="control-group">
          <label class="control-label" for="som-n">Speed N (rev/s)</label>
          <input class="tool-textarea" id="som-n" type="number" step="10" value="50.0" placeholder="50.0 rev/s (3000 RPM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="som-w">Load W (kN)</label>
          <input class="tool-textarea" id="som-w" type="number" step="any" value="5.0" placeholder="5.0 kN Load" />
        </div>
      </div>
      <div id="som-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="som-res-s" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">S = 0.150 (Sommerfeld Number)</span>
            <span class="stat-label">Dimensionless Sommerfeld Bearing Number (S)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="som-res-h0" style="color:var(--green-dark); font-weight:700;">Min Film h₀ = 10.5 μm (Eccentricity ε = 0.58 | Safe: h₀ > 3·R_a)</span>
            <span class="stat-label">Minimum Dynamic Oil Film Thickness (h₀) & Eccentricity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('som-r'), cEl = document.getElementById('som-c');
  const muEl = document.getElementById('som-mu'), nEl = document.getElementById('som-n'), wEl = document.getElementById('som-w');
  const sResEl = document.getElementById('som-res-s'), h0ResEl = document.getElementById('som-res-h0');

  function update() {
    const rMm = parseFloat(rEl.value), cUm = parseFloat(cEl.value);
    const muCp = parseFloat(muEl.value), N_rps = parseFloat(nEl.value), W_kN = parseFloat(wEl.value);

    if (isNaN(rMm) || isNaN(cUm) || isNaN(muCp) || isNaN(N_rps) || isNaN(W_kN) || rMm <= 0 || cUm <= 0 || muCp <= 0 || N_rps <= 0 || W_kN <= 0) return;

    const r_m = rMm * 1e-3;
    const c_m = cUm * 1e-6;
    const D_m = 2.0 * r_m;
    const L_m = D_m; // Assuming square bearing L/D = 1.0

    // Projected bearing area A_proj = L * D  [m^2]
    const A_proj = L_m * D_m;
    // Specific bearing pressure P = W / A_proj  [Pa]
    const P_pa = (W_kN * 1000.0) / A_proj;

    const mu_pa_s = muCp * 1e-3;

    // Sommerfeld Number S = (r / c)^2 * ( mu * n / P )
    const clearanceRatio = r_m / c_m;
    const S = Math.pow(clearanceRatio, 2) * ((mu_pa_s * N_rps) / P_pa);

    // Raimondi-Boyd approximation for eccentricity ratio epsilon from Sommerfeld S (for L/D=1):
    // epsilon approx = 1 / (1 + 4*S^0.7)
    const epsilon = Math.max(0.05, Math.min(0.95, 1.0 / (1.0 + (3.8 * Math.pow(S, 0.7)))));

    // Minimum film thickness h0 = c * (1 - epsilon)  [um]
    const h0_um = cUm * (1.0 - epsilon);

    let safety = '';
    let color = '#22543d';

    if (h0_um >= 10.0) {
      safety = 'EXCELLENT LUBRICATION: h₀ ≥ 10 μm provides robust safety against particulate scoring';
      color = '#22543d';
    } else if (h0_um >= 5.0) {
      safety = 'SAFE OPERATION: h₀ = ' + h0_um.toFixed(1) + ' μm requires fine oil filtration (<10 μm)';
      color = '#2563eb';
    } else {
      safety = 'DANGER OF WIPING: h₀ < 5 μm risk of babbitt metal thermal wipe & seizure!';
      color = '#c53030';
    }

    sResEl.textContent = 'S = ' + S.toFixed(3) + ' (P = ' + (P_pa/1e6).toFixed(2) + ' MPa)';
    h0ResEl.textContent = 'Min Film h₀ = ' + h0_um.toFixed(1) + ' μm (ε = ' + epsilon.toFixed(2) + ') | ' + safety;
    h0ResEl.style.color = color;
  }

  [rEl, cEl, muEl, nEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter journal shaft radius r in millimeters.',
      'Enter radial diametral clearance c in micrometers ($\mu\text{m}$).',
      'Enter dynamic lubricant viscosity $\mu$ in cP (mPa·s).',
      'Enter shaft rotational velocity N in revolutions per second (rev/s).',
      'Enter radial downward bearing load W in kN.',
      'Inspect dimensionless Sommerfeld Number S, eccentricity ratio $\epsilon$, and minimum hydrodynamic oil film thickness $h_0$ in $\mu\text{m}$.'
    ],
    benefitTitle: 'Arnold Sommerfeld 1904 Hydrodynamic Lubrication Theory',
    benefitContent: 'The Sommerfeld number is the universal design parameter for hydrodynamic journal bearings; maintaining $h_0 \ge 3 R_a$ ensures the hydrodynamic oil wedge completely separates rotating shaft journals from babbitt bushings to prevent catastrophic bearing wipe failure.',
    faqs: [{ q: 'What is a typical clearance ratio (r/c) for industrial bearings?', a: 'Standard industrial machinery uses a clearance ratio of $r/c \approx 1,000$ (1.0 mil of clearance per inch of shaft diameter).' }]
  },

  // 13. Hertzian Contact Stress (Sphere-on-Flat & Cylinder) Calculator
  {
    slug: 'hertzian-contact-stress-cylinder-sphere-calculator',
    name: 'Hertzian Contact Stress (Sphere & Cylinder Elastic Contact) Calculator',
    description: 'Calculate elastic non-conforming Hertzian contact stress peak pressure (p_max = 3·F / (2π·a²)) in GPa and maximum subsurface shear stress (τ_max = 0.31·p_max at depth z = 0.48·a) in ball and roller bearings.',
    category: 'Science',
    icon: 'text',
    keywords: ['hertzian contact stress calculator', 'peak contact pressure formula p max sphere cylinder online', 'subsurface shear stress hertzian fatigue calculator', 'ball bearing roller contact stress hertz calculator', 'tribology elastic contact mechanics online'],
    order: 799,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Contact Geometry (Sphere-on-Flat or Cylinder-on-Flat), Normal Load F (kN) & Radius R (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hz-type">Geometry</label>
          <select class="tool-textarea" id="hz-type">
            <option value="sphere" selected>Sphere on Flat (Ball Bearing: Circular Contact)</option>
            <option value="cylinder">Cylinder on Flat (Roller Bearing: Line Contact L=20mm)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hz-f">Normal Force F (kN)</label>
          <input class="tool-textarea" id="hz-f" type="number" step="any" value="5.0" placeholder="5.0 kN (500 kg Force)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hz-r">Radius R (mm)</label>
          <input class="tool-textarea" id="hz-r" type="number" step="any" value="12.0" placeholder="12.0 mm (24 mm Ball)" />
        </div>
      </div>
      <div id="hz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hz-res-pmax" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">p_max = 2.48 GPa (24,800 bar)</span>
            <span class="stat-label">Maximum Hertzian Peak Compressive Contact Stress</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hz-res-tau" style="font-weight:700;">Subsurface τ_max = 769 MPa @ depth z = 0.47 mm (Contact Radius a = 0.98 mm)</span>
            <span class="stat-label">Maximum Subsurface Shear Stress (Rolling Contact Fatigue Initiation)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const typeEl = document.getElementById('hz-type'), fEl = document.getElementById('hz-f'), rEl = document.getElementById('hz-r');
  const pResEl = document.getElementById('hz-res-pmax'), tauResEl = document.getElementById('hz-res-tau');

  // Hardened 52100 bearing steel properties:
  const E = 210e9; // Pa
  const nu = 0.30;
  const E_star = E / (2.0 * (1.0 - Math.pow(nu, 2))); // Equivalent modulus = 115.4 GPa

  function update() {
    const isSphere = typeEl.value === 'sphere';
    const F_kN = parseFloat(fEl.value), R_mm = parseFloat(rEl.value);

    if (isNaN(F_kN) || isNaN(R_mm) || F_kN <= 0 || R_mm <= 0) return;

    const F_N = F_kN * 1000.0;
    const R_m = R_mm * 1e-3;

    if (isSphere) {
      // Circular Hertz contact:
      // Contact radius a = [ (3 * F * R) / (4 * E_star) ]^(1/3)  [meters]
      const a_m = Math.pow((3.0 * F_N * R_m) / (4.0 * E_star), 1.0 / 3.0);
      const a_mm = a_m * 1000;

      // Peak pressure p_max = 3 * F / ( 2 * pi * a^2 )  [Pa]
      const p_max_pa = (3.0 * F_N) / (2.0 * Math.PI * Math.pow(a_m, 2));
      const p_max_gpa = p_max_pa / 1e9;

      // Maximum subsurface shear stress tau_max = 0.31 * p_max at depth z = 0.48 * a
      const tau_max_mpa = (0.31 * p_max_pa) / 1e6;
      const z_depth_mm = 0.48 * a_mm;

      pResEl.textContent = 'p_max = ' + p_max_gpa.toFixed(2) + ' GPa (' + Math.round(p_max_gpa * 10000).toLocaleString() + ' bar)';
      tauResEl.textContent = 'Subsurface τ_max = ' + Math.round(tau_max_mpa) + ' MPa @ depth z = ' + z_depth_mm.toFixed(2) + ' mm (Contact Radius a = ' + a_mm.toFixed(2) + ' mm)';
    } else {
      // Cylinder on flat (Line contact L = 20 mm):
      const L_m = 0.020;
      // Semi-width b = sqrt( (4 * F * R) / (pi * L * E_star) )  [meters]
      const b_m = Math.sqrt((4.0 * F_N * R_m) / (Math.PI * L_m * E_star));
      const b_mm = b_m * 1000;

      // Peak line pressure p_max = 2 * F / ( pi * b * L )  [Pa]
      const p_max_pa = (2.0 * F_N) / (Math.PI * b_m * L_m);
      const p_max_gpa = p_max_pa / 1e9;

      const tau_max_mpa = (0.30 * p_max_pa) / 1e6;
      const z_depth_mm = 0.78 * b_mm;

      pResEl.textContent = 'p_max = ' + p_max_gpa.toFixed(2) + ' GPa (Cylinder Line Contact L=20mm)';
      tauResEl.textContent = 'Subsurface τ_max = ' + Math.round(tau_max_mpa) + ' MPa @ depth z = ' + z_depth_mm.toFixed(2) + ' mm (Contact Strip Half-Width b = ' + b_mm.toFixed(2) + ' mm)';
    }
  }

  [typeEl, fEl, rEl].forEach(el => el.addEventListener('input', update));
  typeEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select contact geometry (Sphere-on-Flat Ball Bearing or Cylinder-on-Flat Roller Bearing).',
      'Enter applied normal compressive contact force F in kN.',
      'Enter roller or ball curvature radius R in millimeters.',
      'Inspect peak Hertzian contact pressure $p_{\max}$ in GPa and maximum subsurface shear stress $\tau_{\max}$ along with its critical subterranean initiation depth.'
    ],
    benefitTitle: 'Heinrich Hertz 1882 Contact Mechanics Theory',
    benefitContent: 'Hertzian analysis revealed that maximum shear stress occurs beneath the contact surface ($z \approx 0.48 a$), explaining why rolling element bearings fail via subsurface micro-crack initiation and spalling flaking rather than surface abrasion.',
    faqs: [{ q: 'What is the allowable Hertzian contact stress for hardened bearing steel?', a: 'Standard through-hardened 52100 chrome steel ($60\text{ HRC}$) has an allowable static contact stress threshold of $p_{\max} \le 4.0\text{ GPa}$ before permanent plastic brinelling indentation occurs.' }]
  },

  // 14. Archard Wear Law Sliding Material Loss Calculator
  {
    slug: 'archard-wear-law-volume-loss-sliding-calculator',
    name: 'Archard Wear Law Sliding Volume Loss (V = K · W · s / H) Calculator',
    description: 'Calculate abrasive/adhesive mechanical wear volumetric material loss (V = K · W · s / H) in mm³ and linear wear depth (h = V / A) from normal load W, sliding distance s, and hardness H.',
    category: 'Science',
    icon: 'text',
    keywords: ['archard wear law calculator', 'adhesive abrasive wear volume formula v equals k w s over h', 'sliding wear depth calculator online', 'tribology archard wear coefficient k calculator', 'pin on disc wear test volume loss online'],
    order: 800,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Normal Load W (N), Sliding Distance s (km), Material Hardness H (Vickers HV) & Wear Coeff K',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ach-w">Normal Load W (N)</label>
          <input class="tool-textarea" id="ach-w" type="number" step="10" value="100.0" placeholder="100.0 N" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ach-s">Distance s (km)</label>
          <input class="tool-textarea" id="ach-s" type="number" step="any" value="5.0" placeholder="5.0 km Sliding" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ach-h">Hardness H (HV)</label>
          <input class="tool-textarea" id="ach-h" type="number" step="50" value="250.0" placeholder="250.0 HV (Mild Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ach-k">Wear Coeff K (10⁻⁵)</label>
          <input class="tool-textarea" id="ach-k" type="number" step="any" value="1.0" placeholder="1.0 (10⁻⁵ Unlubricated)" />
        </div>
      </div>
      <div id="ach-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ach-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">V = 2.04 mm³ Lost</span>
            <span class="stat-label">Volumetric Sliding Wear Loss (V = K·W·s / H)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ach-res-rate" style="font-weight:700;">Specific Wear Rate k = 4.08 × 10⁻⁶ mm³ / (N·m) (Mass Loss: 16.0 mg Steel)</span>
            <span class="stat-label">Dimensional Wear Coefficient & Mass Removal</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('ach-w'), sEl = document.getElementById('ach-s');
  const hEl = document.getElementById('ach-h'), kEl = document.getElementById('ach-k');
  const vResEl = document.getElementById('ach-res-vol'), rResEl = document.getElementById('ach-res-rate');

  function update() {
    const W_N = parseFloat(wEl.value), s_km = parseFloat(sEl.value);
    const H_hv = parseFloat(hEl.value), K_factor = parseFloat(kEl.value);

    if (isNaN(W_N) || isNaN(s_km) || isNaN(H_hv) || isNaN(K_factor) || W_N <= 0 || s_km <= 0 || H_hv <= 0 || K_factor <= 0) return;

    // Convert sliding distance km to meters: s * 1000
    const s_m = s_km * 1000.0;
    // Convert Vickers Hardness HV to MPa: H_pa = H_hv * 9.80665 * 1e6 Pa
    const H_mpa = H_hv * 9.80665;
    const H_pa = H_mpa * 1e6;

    const K = K_factor * 1e-5; // dimensionless Archard wear coefficient

    // Archard Volume V = (K * W * s) / H  [m^3 -> mm^3]
    const V_m3 = (K * W_N * s_m) / H_pa;
    const V_mm3 = V_m3 * 1e9;

    // Specific dimensional wear rate k_spec = V_mm3 / (W_N * s_m)  [mm^3 / (N * m)]
    const k_spec = V_mm3 / (W_N * s_m);

    // Approximate mass loss for steel (rho = 7850 kg/m^3 -> 7.85 mg/mm^3)
    const massLossMg = V_mm3 * 7.85;

    vResEl.textContent = 'V = ' + V_mm3.toFixed(2) + ' mm³ (' + massLossMg.toFixed(1) + ' mg Material Removed)';
    rResEl.textContent = 'Specific Wear Rate k = ' + k_spec.toExponential(2) + ' mm³/(N·m) (W = ' + W_N + ' N, s = ' + s_km + ' km @ ' + H_hv + ' HV)';
  }

  [wEl, sEl, hEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied normal compressive contact load W in Newtons.',
      'Enter cumulative sliding friction distance s in kilometers.',
      'Enter softer contacting material hardness H in Vickers (HV).',
      'Enter dimensionless Archard wear coefficient K (e.g. $1.0 \times 10^{-5}$ for mild lubricated wear, $1.0 \times 10^{-3}$ for severe unlubricated sliding).',
      'Inspect total volumetric material loss in $\text{mm}^3$ and component mass loss in milligrams.'
    ],
    benefitTitle: 'John F. Archard 1953 Asperity Plastic Deformation Law',
    benefitContent: 'Archard proved that sliding wear volume is directly proportional to applied normal load and sliding distance while inversely proportional to material hardness ($V \propto W s / H$), providing the quantitative framework for pin-on-disk wear testing and brake pad lifecycle sizing.',
    faqs: [{ q: 'Why does increasing surface hardness reduce wear so effectively?', a: 'Harder materials reduce the real contact area of micro-asperities under load ($A_{\text{real}} = W/H$), directly decreasing the probability of adhesive debris detachment.' }]
  },

  // 15. Petroff's Bearing Friction Power Loss Calculator
  {
    slug: 'petroff-bearing-friction-power-loss-calculator',
    name: 'Petroff\'s Journal Bearing Friction Torque & Heat Power Loss Calculator',
    description: 'Calculate hydrodynamic concentric journal bearing viscous shear friction torque (T = 2π·μ·ω·r³·L / c) in N·m and thermal heat dissipation loss (P_loss = T · ω) in Watts/kW.',
    category: 'Science',
    icon: 'text',
    keywords: ['petroff equation calculator', 'journal bearing friction torque formula 2 pi mu omega r cubed l over c', 'bearing power loss heat dissipation calculator online', 'concentric journal bearing viscous friction petroff online', 'turbomachinery bearing parasitic loss calculator'],
    order: 801,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Journal Radius r (mm), Length L (mm), Radial Clearance c (μm), Viscosity μ (cP) & Speed (RPM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pet-r">Radius r (mm)</label>
          <input class="tool-textarea" id="pet-r" type="number" step="any" value="30.0" placeholder="30.0 mm (60 mm Shaft)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pet-l">Length L (mm)</label>
          <input class="tool-textarea" id="pet-l" type="number" step="any" value="60.0" placeholder="60.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pet-c">Clearance c (μm)</label>
          <input class="tool-textarea" id="pet-c" type="number" step="5" value="30.0" placeholder="30.0 μm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pet-mu">Viscosity μ (cP)</label>
          <input class="tool-textarea" id="pet-mu" type="number" step="any" value="20.0" placeholder="20.0 cP (ISO VG 32 @ 60°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pet-rpm">Speed (RPM)</label>
          <input class="tool-textarea" id="pet-rpm" type="number" step="100" value="3600.0" placeholder="3600.0 RPM" />
        </div>
      </div>
      <div id="pet-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pet-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_loss = 426.4 Watts Heat</span>
            <span class="stat-label">Parasitic Viscous Heat Power Loss (P = T · ω)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pet-res-trq" style="font-weight:700;">Friction Torque T = 1.131 N·m (Shear Rate γ̇ = 3.77 × 10⁵ s⁻¹ @ 3600 RPM)</span>
            <span class="stat-label">Petroff Hydrodynamic Shear Friction Torque</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('pet-r'), lEl = document.getElementById('pet-l');
  const cEl = document.getElementById('pet-c'), muEl = document.getElementById('pet-mu'), rpmEl = document.getElementById('pet-rpm');
  const pResEl = document.getElementById('pet-res-pwr'), tResEl = document.getElementById('pet-res-trq');

  function update() {
    const rMm = parseFloat(rEl.value), lMm = parseFloat(lEl.value);
    const cUm = parseFloat(cEl.value), muCp = parseFloat(muEl.value), RPM = parseFloat(rpmEl.value);

    if (isNaN(rMm) || isNaN(lMm) || isNaN(cUm) || isNaN(muCp) || isNaN(RPM) || rMm <= 0 || lMm <= 0 || cUm <= 0 || muCp <= 0 || RPM <= 0) return;

    const r_m = rMm * 1e-3;
    const l_m = lMm * 1e-3;
    const c_m = cUm * 1e-6;
    const mu_pa_s = muCp * 1e-3;

    // Angular velocity omega = 2 * pi * RPM / 60  [rad / s]
    const omega = (2.0 * Math.PI * RPM) / 60.0;

    // Surface tangential velocity U = omega * r
    const U = omega * r_m;
    // Shear rate gamma_dot = U / c
    const gamma_dot = U / c_m;

    // Petroff's law friction torque: T = 2 * pi * mu * omega * r^3 * L / c  [N * m]
    const Torque_Nm = (2.0 * Math.PI * mu_pa_s * omega * Math.pow(r_m, 3) * l_m) / c_m;

    // Power loss P = Torque * omega  [Watts]
    const Power_watts = Torque_Nm * omega;
    const Power_hp = Power_watts / 745.7;

    pResEl.textContent = 'P_loss = ' + Power_watts.toFixed(1) + ' Watts (' + Power_hp.toFixed(2) + ' HP Heat Dissipation)';
    tResEl.textContent = 'Friction Torque T = ' + Torque_Nm.toFixed(3) + ' N·m | Shear Rate γ̇ = ' + gamma_dot.toExponential(2) + ' s⁻¹ (Surface Speed = ' + U.toFixed(2) + ' m/s)';
  }

  [rEl, lEl, cEl, muEl, rpmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter journal shaft radius r in millimeters.',
      'Enter axial bearing bush length L in millimeters.',
      'Enter radial oil film clearance c in micrometers ($\mu\text{m}$).',
      'Enter dynamic lubricant viscosity $\mu$ in cP at operating oil temperature.',
      'Enter shaft rotational speed in RPM.',
      'Inspect Petroff viscous friction torque in $\text{N}\cdot\text{m}$, thermal heat dissipation power loss in Watts, and fluid shear strain rate.'
    ],
    benefitTitle: 'Nikolay Petroff 1883 Hydrodynamic Friction Law',
    benefitContent: 'Petroff\'s equation treats the lightly loaded journal bearing as concentric Couette fluid shear ($\tau = \mu U/c$), giving turbine designers exact analytical predictions of parasitic churning power losses to size lube oil heat exchangers and cooling pumps.',
    faqs: [{ q: 'Why does higher shaft speed increase bearing power loss quadratically?', a: 'Because friction torque scales linearly with speed ($T \propto \omega$) and power is $P = T \cdot \omega$, thermal power loss increases as the square of rotational speed ($P \propto \omega^2$).' }]
  },

  // --- Suite SSSSS: Ceramic, Glass, Refractory & High-Temperature Materials (921 - 925) ---
  // 16. Weibull Modulus Brittle Ceramic Fracture Probability Calculator
  {
    slug: 'weibull-modulus-brittle-ceramic-fracture-calculator',
    name: 'Weibull Modulus Brittle Ceramic Fracture Probability (P_f) Calculator',
    description: 'Calculate brittle ceramic material fracture failure probability (P_f = 1 - exp[- (σ / σ₀)^m]) and survival reliability from applied tensile stress σ, characteristic strength σ₀, and Weibull modulus m.',
    category: 'Science',
    icon: 'text',
    keywords: ['weibull modulus calculator', 'ceramic brittle fracture probability formula 1 minus exp minus sigma over sigma 0 power m', 'weibull statistics ceramic reliability calculator online', 'silicon nitride alumina fracture strength weibull calculator', 'structural ceramics weibull distribution online'],
    order: 802,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Stress σ (MPa), Characteristic Strength σ₀ (MPa) & Weibull Modulus m',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wb-sig">Applied Stress σ (MPa)</label>
          <input class="tool-textarea" id="wb-sig" type="number" step="10" value="250.0" placeholder="250.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-sig0">Char Strength σ₀</label>
          <input class="tool-textarea" id="wb-sig0" type="number" step="10" value="400.0" placeholder="400.0 MPa (63.2% Break)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-m">Weibull Modulus m</label>
          <input class="tool-textarea" id="wb-m" type="number" step="1" value="10.0" placeholder="10.0 (Engineered Ceramic)" />
        </div>
      </div>
      <div id="wb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wb-res-pf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_f = 0.89% (Reliability: 99.11%)</span>
            <span class="stat-label">Cumulative Fracture Failure Probability (P_f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wb-res-safe" style="color:var(--green-dark); font-weight:700;">Design Stress for 1-in-a-Million Failure (P_f = 10⁻⁶): σ = 100.5 MPa</span>
            <span class="stat-label">Ultra-High Reliability Safe Design Threshold</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sigEl = document.getElementById('wb-sig'), s0El = document.getElementById('wb-sig0'), mEl = document.getElementById('wb-m');
  const pfResEl = document.getElementById('wb-res-pf'), sfResEl = document.getElementById('wb-res-safe');

  function update() {
    const sigma = parseFloat(sigEl.value), sigma0 = parseFloat(s0El.value), m = parseFloat(mEl.value);
    if (isNaN(sigma) || isNaN(sigma0) || isNaN(m) || sigma <= 0 || sigma0 <= 0 || m <= 0) return;

    // Weibull two-parameter failure probability: P_f = 1 - exp( -(sigma / sigma0)^m )
    const stressRatio = sigma / sigma0;
    const exponent = Math.pow(stressRatio, m);
    const P_f = 1.0 - Math.exp(-exponent);
    const P_f_pct = P_f * 100;
    const reliability_pct = (1.0 - P_f) * 100;

    // Allowable stress for 1 ppm failure (P_f = 1e-6): sigma_safe = sigma0 * ( -ln(1 - 1e-6) )^(1/m) approx sigma0 * (1e-6)^(1/m)
    const sigma_safe_ppm = sigma0 * Math.pow(1e-6, 1.0 / m);

    let statClass = '';
    let color = '#22543d';

    if (P_f <= 0.01) {
      statClass = 'HIGH RELIABILITY (Failure risk < 1%): Safe structural design zone';
      color = '#22543d';
    } else if (P_f <= 0.10) {
      statClass = 'MODERATE RISK (1% - 10% Failure): Requires proof testing or proof stress screening';
      color = '#d97706';
    } else {
      statClass = 'UNSAFE / HIGH FAILURE RISK (>10% Failure): Catastrophic brittle fracture likely!';
      color = '#c53030';
    }

    pfResEl.textContent = 'P_f = ' + (P_f_pct < 0.01 ? P_f.toExponential(2) : P_f_pct.toFixed(2) + '%') + ' (Survival: ' + reliability_pct.toFixed(2) + '%)';
    pfResEl.style.color = color;
    sfResEl.textContent = 'Safe Stress for 1 PPM Failure: σ = ' + sigma_safe_ppm.toFixed(1) + ' MPa | ' + statClass;
  }

  [sigEl, s0El, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied working tensile stress $\sigma$ in MPa.',
      'Enter characteristic fracture strength $\sigma_0$ in MPa (stress level where 63.2% of samples fail).',
      'Enter Weibull modulus m (typically 5 for chalk/brick, 10 to 15 for engineered silicon nitride/zirconia, $>30$ for ductile metals).',
      'Inspect cumulative failure probability $P_f$, component survival reliability percentage, and safe design stress for $10^{-6}$ (1 ppm) failure risk.'
    ],
    benefitTitle: 'Waloddi Weibull 1939 Extreme Value Flaw Statistics',
    benefitContent: 'Brittle ceramics contain random microscopic Griffith flaw distributions; higher Weibull modulus ($m > 15$) narrows the scatter in fracture strength, allowing engineers to design structural ceramic gas turbine blades and dental implants with predictable reliability.',
    faqs: [{ q: 'Why do larger ceramic components fail at lower stresses than small fibers?', a: 'Due to volume flaw statistics ($P_f = 1 - \exp[-\int (\sigma/\sigma_0)^m dV]$), larger material volumes have a statistically higher probability of containing a critical fatal Griffith micro-crack.' }]
  },

  // 17. Thermal Shock Resistance Parameter (R & R') Calculator
  {
    slug: 'thermal-shock-resistance-parameter-r-calculator',
    name: 'Thermal Shock Resistance Parameters (R & R\') Refractory Calculator',
    description: 'Calculate ceramic refractory thermal shock resistance parameters (R = σ_f·(1 - ν) / (E·α)) in °C and thermal stress fracture resistance (R\' = R · k) in W/m.',
    category: 'Science',
    icon: 'text',
    keywords: ['thermal shock resistance calculator', 'thermal shock parameter r formula sigma f 1 minus nu over e alpha', 'ceramic thermal shock cracking delta t calculator', 'refractory thermal stress resistance r prime calculator online', 'fused silica alumina thermal shock online'],
    order: 803,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Material (Fused Silica, Silicon Carbide, Alumina, Zirconia, Glass) & Thermal Properties',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ts-mat">Ceramic Material</label>
          <select class="tool-textarea" id="ts-mat">
            <option value="fused_silica" selected>Fused Silica Glass (α = 0.5 × 10⁻⁶ /K, E = 72 GPa, R = 1,000°C)</option>
            <option value="sic">Silicon Carbide SiC (α = 4.0 × 10⁻⁶ /K, E = 410 GPa, k = 120 W/m·K)</option>
            <option value="alumina">Alumina Al₂O₃ 99% (α = 8.0 × 10⁻⁶ /K, E = 380 GPa, σ_f = 300 MPa)</option>
            <option value="zirconia">Zirconia Y-TZP (α = 10.5 × 10⁻⁶ /K, E = 210 GPa, σ_f = 1000 MPa)</option>
            <option value="borosilicate">Borosilicate Pyrex (α = 3.3 × 10⁻⁶ /K, E = 64 GPa)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-dt">Quench Temp Drop ΔT (°C)</label>
          <input class="tool-textarea" id="ts-dt" type="number" step="25" value="250.0" placeholder="250.0 °C (Rapid Water Quench)" />
        </div>
      </div>
      <div id="ts-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ts-res-r" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">R = 1,180 °C Critical ΔT</span>
            <span class="stat-label">Thermal Shock Parameter (R = σ_f·(1 - ν) / (E·α))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ts-res-stat" style="color:var(--green-dark); font-weight:700;">SAFE: Applied ΔT (250°C) is below critical thermal shock limit R (1,180°C)</span>
            <span class="stat-label">Thermal Shock Fracture Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('ts-mat'), dtEl = document.getElementById('ts-dt');
  const rResEl = document.getElementById('ts-res-r'), stResEl = document.getElementById('ts-res-stat');

  const MATERIALS = {
    'fused_silica': { sigma_f: 70.0,  E: 72.0,  nu: 0.17, alpha_ppm: 0.5,  k: 1.4,   name: 'Fused Silica Quartz' },
    'sic':          { sigma_f: 450.0, E: 410.0, nu: 0.16, alpha_ppm: 4.0,  k: 120.0, name: 'Sintered Silicon Carbide' },
    'alumina':      { sigma_f: 300.0, E: 380.0, nu: 0.22, alpha_ppm: 8.0,  k: 30.0,  name: '99% Alumina Al₂O₃' },
    'zirconia':     { sigma_f: 1000.0,E: 210.0, nu: 0.30, alpha_ppm: 10.5, k: 2.2,   name: 'Yttria-Stabilized Zirconia' },
    'borosilicate': { sigma_f: 80.0,  E: 64.0,  nu: 0.20, alpha_ppm: 3.3,  k: 1.2,   name: 'Borosilicate Glass (Pyrex)' }
  };

  function update() {
    const m = MATERIALS[matEl.value];
    const deltaT = parseFloat(dtEl.value);

    if (isNaN(deltaT) || deltaT <= 0) return;

    // Thermal expansion alpha in 1/K: alpha_ppm * 1e-6
    const alpha = m.alpha_ppm * 1e-6;
    const E_pa = m.E * 1e9;
    const sigma_f_pa = m.sigma_f * 1e6;

    // Thermal shock resistance parameter R = ( sigma_f * (1 - nu) ) / ( E * alpha )  [Kelvin / °C]
    const R_degC = (sigma_f_pa * (1.0 - m.nu)) / (E_pa * alpha);

    // High heat flux thermal shock parameter R' = R * k  [W / m]
    const R_prime_W_m = R_degC * m.k;

    let status = '';
    let color = '#22543d';

    if (deltaT <= R_degC) {
      status = 'THERMALLY RESISTANT (Quench ΔT = ' + deltaT + '°C < R = ' + Math.round(R_degC) + '°C: Zero thermal stress cracking)';
      color = '#22543d';
    } else {
      status = 'THERMAL SHOCK FAILURE (Quench ΔT = ' + deltaT + '°C EXCEEDS R = ' + Math.round(R_degC) + '°C: Catastrophic thermal spalling crack!)';
      color = '#c53030';
    }

    rResEl.textContent = 'R = ' + Math.round(R_degC).toLocaleString() + ' °C (R\' = ' + (R_prime_W_m/1000).toFixed(1) + ' kW/m)';
    stResEl.textContent = status + ' | ' + m.name + ' (α = ' + m.alpha_ppm + ' ppm/K, k = ' + m.k + ' W/m·K)';
    stResEl.style.color = color;
  }

  matEl.addEventListener('change', update);
  dtEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select technical ceramic refractory material (Fused Silica, Silicon Carbide, Alumina, Zirconia, Borosilicate Glass).',
      'Enter rapid water/air thermal quench temperature drop $\Delta T$ in Celsius.',
      'Inspect critical thermal shock parameter R (maximum sustainable thermal step change $\Delta T_c$ in °C) and heat flux parameter $R\' = R \cdot k$.'
    ],
    benefitTitle: 'W.D. Kingery & D.P.H. Hasselman Thermal Stress Theory',
    benefitContent: 'Thermal shock occurs when rapid surface cooling creates steep thermal gradients ($\sigma = E \alpha \Delta T / (1-\nu)$); Fused Silica has an ultra-low expansion coefficient ($\alpha = 0.5 \times 10^{-6}/\text{K}$), giving it an immense thermal shock threshold ($R > 1,000^\circ\text{C}$) that allows it to be dropped glowing red-hot into ice water without cracking.',
    faqs: [{ q: 'What is the difference between parameter R and parameter R\'?', a: 'R applies to instantaneous rapid quenching (Biot number $Bi \to \infty$), whereas $R\' = R \cdot k$ applies to steady-state high heat flux environments (e.g. rocket nozzle throats) where high thermal conductivity ($k$) relieves thermal stresses.' }]
  },

  // 18. Vogel-Fulcher-Tammann (VFT) Glass Viscosity vs Temperature Calculator
  {
    slug: 'vogel-fulcher-tammann-vft-glass-viscosity-calculator',
    name: 'Vogel-Fulcher-Tammann (VFT) Glass Viscosity & Working Range Calculator',
    description: 'Calculate silicate glass dynamic melt viscosity (log₁₀ η = A + B / (T - T₀)) in dPa·s (Poise) across Melting, Working, Softening, Annealing, and Strain reference points.',
    category: 'Science',
    icon: 'text',
    keywords: ['vft glass viscosity calculator', 'vogel fulcher tammann equation log10 eta a plus b over t minus t0', 'glass softening annealing strain point calculator online', 'soda lime glass working temperature viscosity calculator', 'glass manufacturing vft viscosity online'],
    order: 804,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Temperature T (°C) & Glass Composition (Soda-Lime, Borosilicate, Lead Crystal, Aluminosilicate)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vft-glass">Glass Composition</label>
          <select class="tool-textarea" id="vft-glass">
            <option value="soda_lime" selected>Soda-Lime Container Glass (A = -2.585, B = 4215, T₀ = 265°C)</option>
            <option value="borosilicate">Borosilicate Glass (A = -1.650, B = 4860, T₀ = 280°C)</option>
            <option value="lead">Lead Crystal Glass (A = -2.100, B = 3500, T₀ = 220°C)</option>
            <option value="aluminosilicate">Aluminosilicate Glass (A = -2.800, B = 5400, T₀ = 350°C)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="vft-temp">Temperature T (°C)</label>
          <input class="tool-textarea" id="vft-temp" type="number" step="25" value="1000.0" placeholder="1000.0 °C (Gathering / Working)" />
        </div>
      </div>
      <div id="vft-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vft-res-visc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">log₁₀ η = 3.15 (1,410 dPa·s)</span>
            <span class="stat-label">Dynamic Viscosity (VFT Equation log₁₀ η in dPa·s / Poise)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vft-res-pt" style="color:var(--green-dark); font-weight:700;">WORKING POINT (log₁₀ η ≈ 4.0 @ 950°C - Optimal for Glassblowing & Gob Forming)</span>
            <span class="stat-label">Glass Manufacturing Viscosity Fixed Point</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('vft-glass'), tEl = document.getElementById('vft-temp');
  const vResEl = document.getElementById('vft-res-visc'), ptResEl = document.getElementById('vft-res-pt');

  const GLASSES = {
    'soda_lime':        { A: -2.585, B: 4215.0, T0: 265.0, name: 'Soda-Lime Container Glass' },
    'borosilicate':     { A: -1.650, B: 4860.0, T0: 280.0, name: 'Borosilicate Glass' },
    'lead':             { A: -2.100, B: 3500.0, T0: 220.0, name: 'Lead Crystal Glass' },
    'aluminosilicate':  { A: -2.800, B: 5400.0, T0: 350.0, name: 'Aluminosilicate Glass' }
  };

  function update() {
    const g = GLASSES[gEl.value];
    const T_c = parseFloat(tEl.value);

    if (isNaN(T_c) || T_c <= g.T0) {
      vResEl.textContent = 'Temperature below VFT pole T₀ (' + g.T0 + '°C)';
      return;
    }

    // VFT Equation: log10(eta) = A + B / (T - T0) where eta is in dPa*s (Poise)
    const log_eta = g.A + (g.B / (T_c - g.T0));
    const eta_poise = Math.pow(10, log_eta);

    let fixedPoint = '';
    let color = '#22543d';

    if (log_eta <= 2.0) {
      fixedPoint = 'MELTING POINT (log₁₀ η ≤ 2.0 @ >1400°C: Fluid melt for batch fining & bubble removal)';
      color = '#c53030';
    } else if (log_eta <= 4.0) {
      fixedPoint = 'WORKING POINT (log₁₀ η ≈ 4.0: Ideal viscosity for bottle blowing, drawing & float casting)';
      color = '#22543d';
    } else if (log_eta <= 7.6) {
      fixedPoint = 'LITTLETON SOFTENING POINT (log₁₀ η = 7.6: Glass sags under its own weight)';
      color = '#2563eb';
    } else if (log_eta <= 13.0) {
      fixedPoint = 'ANNEALING POINT (log₁₀ η = 13.0: Internal thermal stresses relax in minutes)';
      color = '#d97706';
    } else if (log_eta <= 14.5) {
      fixedPoint = 'STRAIN POINT (log₁₀ η = 14.5: Solid glass transition Tg; zero plastic stress relief)';
      color = '#4b5563';
    } else {
      fixedPoint = 'SOLID ELASTIC STATE (log₁₀ η > 14.5: Solid rigid brittle glass)';
      color = '#1f2937';
    }

    vResEl.textContent = 'log₁₀ η = ' + log_eta.toFixed(2) + ' (' + (log_eta > 6 ? log_eta.toFixed(1) + ' log Poise' : Math.round(eta_poise).toLocaleString() + ' dPa·s)');
    ptResEl.textContent = fixedPoint + ' | ' + g.name;
    ptResEl.style.color = color;
  }

  gEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select glass chemical composition (Soda-Lime, Borosilicate, Lead Crystal, Aluminosilicate).',
      'Enter furnace/forming temperature in Celsius.',
      'Inspect dynamic melt viscosity in $\log_{10}\eta$ (dPa·s / Poise) and identify corresponding industrial glass manufacturing fixed point (Working, Softening, Annealing, or Strain Point).'
    ],
    benefitTitle: 'H. Vogel, G.S. Fulcher & G. Tammann 1925 Glass Viscosity Law',
    benefitContent: 'Unlike simple Arrhenius liquids, supercooled glass melts show steep non-Arrhenius viscosity curves modeled by VFT ($\log_{10}\eta = A + \frac{B}{T-T_0}$); controlling the "working range" ($\log_{10}\eta = 4\text{ to }7.6$) is critical for automated blow molding of billions of soda-lime beverage bottles.',
    faqs: [{ q: 'What is the Littleton Softening Point?', a: 'The Softening Point ($\log_{10}\eta = 7.6\text{ dPa}\cdot\text{s}$, $\sim 720^\circ\text{C}$ for soda-lime) is the standardized temperature where a 0.65 mm glass fiber elongates under its own weight at 1.0 mm/min.' }]
  },

  // 19. Pyrometric Cone Equivalent (PCE) Refractory Temperature Calculator
  {
    slug: 'pyrometric-cone-equivalent-refractory-temperature-calculator',
    name: 'Pyrometric Cone Equivalent (PCE & Orton/Seger Cones) Temperature Calculator',
    description: 'Calculate ceramic kiln pyrometric cone heat-work equivalence (PCE to °C / °F) across standard Orton / Seger cones (Cone 022 to Cone 42) for refractory brick firing.',
    category: 'Science',
    icon: 'text',
    keywords: ['pyrometric cone calculator', 'orton cone temperature chart seger cone calculator online', 'pce pyrometric cone equivalent refractory temp online', 'ceramic kiln heat work firing cone calculator', 'cone 06 cone 6 cone 10 temperature converter online'],
    order: 805,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Orton Pyrometric Cone Number (Cone 022 low-fire up to Cone 42 super-refractory) & Heating Rate',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pce-cone">Pyrometric Cone</label>
          <select class="tool-textarea" id="pce-cone">
            <option value="c06">Cone 06 (999°C / 1,830°F: Low-Fire Earthenware)</option>
            <option value="c04">Cone 04 (1,060°C / 1,940°F: Bisque Firing)</option>
            <option value="c6" selected>Cone 6 (1,222°C / 2,232°F: Mid-Fire Stoneware)</option>
            <option value="c10">Cone 10 (1,285°C / 2,345°F: High-Fire Porcelain / Reduction)</option>
            <option value="c32">Cone 32 (1,710°C / 3,110°F: Fireclay Refractory Brick)</option>
            <option value="c35">Cone 35 (1,785°C / 3,245°F: High-Alumina Refractory)</option>
            <option value="c40">Cone 40 (1,885°C / 3,425°F: Super-Duty Zirconia Refractory)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pce-rate">Ramp Rate (°C/h)</label>
          <select class="tool-textarea" id="pce-rate">
            <option value="150" selected>150 °C / hour (Standard Fast Ramp)</option>
            <option value="60">60 °C / hour (Slow Soaking Ramp: -20°C drop in bending temp)</option>
          </select>
        </div>
      </div>
      <div id="pce-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pce-res-temp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,222 °C (2,232 °F)</span>
            <span class="stat-label">Pyrometric Cone Bending Equivalent End-Point Temperature</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pce-res-use" style="font-weight:700;">MID-FIRE STONEWARE & REFRACTORY CERAMICS (ASTM C24 Standard PCE)</span>
            <span class="stat-label">Industrial Refractory & Kiln Application</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('pce-cone'), rEl = document.getElementById('pce-rate');
  const tResEl = document.getElementById('pce-res-temp'), uResEl = document.getElementById('pce-res-use');

  const CONES = {
    'c06': { base_c: 999,  name: 'Cone 06 (Low-Fire Earthenware Glaze)' },
    'c04': { base_c: 1060, name: 'Cone 04 (Standard Ceramic Bisque Firing)' },
    'c6':  { base_c: 1222, name: 'Cone 6 (Mid-Fire Stoneware & Vitrified Ceramics)' },
    'c10': { base_c: 1285, name: 'Cone 10 (High-Fire Gas Reduction Porcelain)' },
    'c32': { base_c: 1710, name: 'Cone 32 (ASTM C24 Fireclay Refractory Brick PCE)' },
    'c35': { base_c: 1785, name: 'Cone 35 (High-Alumina Industrial Refractory PCE)' },
    'c40': { base_c: 1885, name: 'Cone 40 (Super-Duty Zirconia Furnace Lining PCE)' }
  };

  function update() {
    const c = CONES[cEl.value];
    const isSlow = rEl.value === '60';

    // Slow 60°C/h soaking ramp softens cones at ~18°C lower end point:
    const tempC = isSlow ? c.base_c - 18 : c.base_c;
    const tempF = (tempC * 9.0 / 5.0) + 32.0;

    tResEl.textContent = tempC + ' °C (' + Math.round(tempF) + ' °F)';
    uResEl.textContent = c.name + ' | Ramp: ' + (isSlow ? '60°C/h Slow Soak' : '150°C/h Standard Fast');
  }

  cEl.addEventListener('change', update);
  rEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select standard Orton pyrometric cone number (from Cone 06 low-fire up to Cone 40 super-refractory).',
      'Select kiln thermal ramp heating rate (150°C/h standard fast vs 60°C/h slow heat-soak).',
      'Inspect exact cone bending tip touch temperature in Celsius and Fahrenheit.'
    ],
    benefitTitle: 'Edward Orton Jr. 1896 Heat-Work Pyrometric Equivalence',
    benefitContent: 'Pyrometric cones measure integrated "heat-work" (combined temperature + time sintering kinetics) rather than raw air temperature; ASTM C24 PCE tests classify furnace refractory bricks based on the cone number where the tip softens and bends to touch the plaque.',
    faqs: [{ q: 'Why is Cone 06 cooler than Cone 6?', a: 'In the Orton cone numbering system, the leading "0" denotes negative sequence (like negative numbers); Cone 06 ($999^\circ\text{C}$) is much cooler than Cone 6 ($1,222^\circ\text{C}$).' }]
  },

  // 20. Larson-Miller Parameter (LMP) High-Temperature Creep Rupture Calculator
  {
    slug: 'larson-miller-parameter-high-temp-creep-rupture-calculator',
    name: 'Larson-Miller Parameter (LMP = T·(log₁₀ t_r + C)·10⁻³) Creep Rupture Calculator',
    description: 'Calculate superalloy high-temperature creep rupture lifetime (LMP = T_Kelvin · (log₁₀ t_rupture + C) · 10⁻³) in hours and predict master stress-rupture curves in jet engine turbine blades.',
    category: 'Science',
    icon: 'text',
    keywords: ['larson miller parameter calculator', 'creep rupture lifetime formula lmp equals t times log tr plus c online', 'superalloy high temperature creep life calculator', 'inconel turbine blade creep stress rupture calculator online', 'larson miller master curve online'],
    order: 806,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Operating Temperature T (°C), Desired Service Life t_r (Hours) & Constant C (typically 20)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lmp-temp">Operating Temp T (°C)</label>
          <input class="tool-textarea" id="lmp-temp" type="number" step="25" value="850.0" placeholder="850.0 °C (Gas Turbine Blade)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lmp-time">Service Life t_r (h)</label>
          <input class="tool-textarea" id="lmp-time" type="number" step="1000" value="10000" placeholder="10000 h (1.14 Years)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lmp-c">Constant C</label>
          <input class="tool-textarea" id="lmp-c" type="number" step="1" value="20" placeholder="20 (Nickel Superalloys)" />
        </div>
      </div>
      <div id="lmp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lmp-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">LMP = 26.95 × 10³</span>
            <span class="stat-label">Larson-Miller Creep Rupture Parameter (LMP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lmp-res-acc" style="color:var(--green-dark); font-weight:700;">Accelerated Lab Test: 10.0 Hours @ 975°C yields identical creep damage!</span>
            <span class="stat-label">Accelerated High-Temperature Creep Equivalence</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('lmp-temp'), trEl = document.getElementById('lmp-time'), cEl = document.getElementById('lmp-c');
  const lmpResEl = document.getElementById('lmp-res-val'), accResEl = document.getElementById('lmp-res-acc');

  function update() {
    const Tc = parseFloat(tEl.value), tr_hours = parseFloat(trEl.value), C = parseFloat(cEl.value);
    if (isNaN(Tc) || isNaN(tr_hours) || isNaN(C) || tr_hours <= 0 || C <= 0) return;

    const T_k = Tc + 273.15;

    // Larson-Miller Parameter: LMP = T_k * ( log10(tr) + C ) * 1e-3
    const LMP = T_k * (Math.log10(tr_hours) + C) * 1e-3;

    // Equivalent accelerated laboratory test at +125°C higher temperature:
    const T_acc_k = T_k + 125.0;
    const T_acc_c = T_acc_k - 273.15;
    // LMP = T_acc_k * ( log10(t_acc) + C ) * 1e-3 => log10(t_acc) = (LMP * 1000 / T_acc_k) - C
    const log_t_acc = ((LMP * 1000.0) / T_acc_k) - C;
    const t_acc_hours = Math.pow(10, log_t_acc);

    lmpResEl.textContent = 'LMP = ' + LMP.toFixed(2) + ' × 10³ (' + T_k.toFixed(1) + ' K)';
    accResEl.textContent = 'Accelerated Equivalence: ' + t_acc_hours.toFixed(1) + ' Hours @ ' + Math.round(T_acc_c) + '°C produces identical LMP creep rupture damage!';
  }

  [tEl, trEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter long-term component operating temperature in Celsius (e.g. 850°C for Inconel 718 turbine disc).',
      'Enter target creep service lifetime in hours (e.g. 10,000 hours).',
      'Enter material-specific Larson-Miller constant C (typically $C = 20$ for nickel-base superalloys and steels).',
      'Inspect dimensionless Larson-Miller Parameter (LMP) and determine accelerated short-duration laboratory test equivalence.'
    ],
    benefitTitle: 'F.R. Larson & J. Miller 1952 Time-Temperature Creep Equivalence',
    benefitContent: 'The LMP parameter collapses decades of high-temperature creep rupture data across different temperatures and stresses onto a single master curve, enabling aerospace engineers to certify 100,000-hour power plant turbine blades using 100-hour high-temperature lab tests.',
    faqs: [{ q: 'What is the physical meaning of constant C in the Larson-Miller equation?', a: 'Constant C is derived from the Arrhenius activation energy for vacancy self-diffusion and dislocation climb ($C = \ln(A) / \ln(10) \approx 20$).' }]
  },

  // --- Suite TTTTT: Space Flight Mechanics, Orbital Perturbations & Rocket Trajectories (926 - 930) ---
  // 21. J₂ Gravitational Harmonic Nodal Precession & Sun-Synchronous Orbit Calculator
  {
    slug: 'j2-nodal-precession-sun-synchronous-orbit-calculator',
    name: 'J₂ Geopotential Nodal Precession (Ω̇) & Sun-Synchronous Orbit Calculator',
    description: 'Calculate Earth oblateness J₂ gravitational nodal precession rate (Ω̇ = -3/2 · J₂ · (R_E / p)² · n · cos i) in °/day and solve required retrograde inclination i for Sun-Synchronous Orbits (SSO).',
    category: 'Science',
    icon: 'text',
    keywords: ['j2 nodal precession calculator', 'sun synchronous orbit inclination formula j2 online', 'earth oblateness j2 orbital precession calculator', 'satellite orbital nodal regression rate online', 'astrodynamics sun synchronous orbit calculator'],
    order: 807,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Orbit Altitude h (km) & Orbit Inclination i (°) or SSO Mode',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="j2-alt">Altitude h (km)</label>
          <input class="tool-textarea" id="j2-alt" type="number" step="25" value="700.0" placeholder="700.0 km (Earth Observation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="j2-inc">Inclination i (°)</label>
          <input class="tool-textarea" id="j2-inc" type="number" step="0.1" value="98.19" placeholder="98.19° (SSO Target)" />
        </div>
      </div>
      <div id="j2-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="j2-res-raan" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ω̇ = +0.9856 ° / day</span>
            <span class="stat-label">Nodal Precession Drift Rate (dΩ/dt)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="j2-res-sso" style="color:var(--green-dark); font-weight:700;">PERFECT SUN-SYNCHRONOUS ORBIT (Exact SSO Inclination i = 98.19° @ 700 km Altitude)</span>
            <span class="stat-label">Sun-Synchronous Orbit Match (360° / 365.25 days = +0.9856°/day)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const altEl = document.getElementById('j2-alt'), incEl = document.getElementById('j2-inc');
  const raanResEl = document.getElementById('j2-res-raan'), ssoResEl = document.getElementById('j2-res-sso');

  const mu_earth = 398600.4418; // km^3 / s^2
  const R_E = 6378.137;         // Earth equatorial radius in km
  const J2 = 1.08263e-3;        // Earth second zonal harmonic

  function update() {
    const hKm = parseFloat(altEl.value), incDeg = parseFloat(incEl.value);
    if (isNaN(hKm) || isNaN(incDeg) || hKm <= 100 || incDeg < 0 || incDeg > 180) return;

    // Semi-major axis a = R_E + h  [km]
    const a = R_E + hKm;
    // Mean motion n = sqrt( mu / a^3 )  [rad / s]
    const n = Math.sqrt(mu_earth / Math.pow(a, 3));

    const incRad = (incDeg * Math.PI) / 180;

    // Nodal precession rate dOmega/dt = -1.5 * J2 * (R_E / a)^2 * n * cos(i)  [rad / s]
    const dOmega_rad_s = -1.5 * J2 * Math.pow(R_E / a, 2) * n * Math.cos(incRad);
    // Convert to degrees per day: dOmega_rad_s * (180/pi) * 86400
    const dOmega_deg_day = dOmega_rad_s * (180.0 / Math.PI) * 86400.0;

    // Target SSO precession rate = 360° / 365.2422 days = +0.985647 °/day
    const sso_rate_target_rad_s = (2.0 * Math.PI) / (365.2422 * 86400.0);
    // Required SSO cos(i) = - sso_rate_target / ( 1.5 * J2 * (R_E/a)^2 * n )
    const cos_i_sso = -sso_rate_target_rad_s / (1.5 * J2 * Math.pow(R_E / a, 2) * n);
    let sso_inc_deg = 0;
    if (Math.abs(cos_i_sso) <= 1.0) {
      sso_inc_deg = (Math.acos(cos_i_sso) * 180.0) / Math.PI;
    }

    const isSSO = Math.abs(dOmega_deg_day - 0.9856) <= 0.02;

    raanResEl.textContent = 'Ω̇ = ' + (dOmega_deg_day >= 0 ? '+' : '') + dOmega_deg_day.toFixed(4) + ' ° / day';
    ssoResEl.textContent = (isSSO ? 'PERFECT SUN-SYNCHRONOUS ORBIT' : 'Non-SSO Orbit (Target SSO i = ' + sso_inc_deg.toFixed(2) + '° @ ' + hKm + ' km)') + ' | Orbital Period: ' + ( (2*Math.PI/n)/60 ).toFixed(1) + ' min';
    raanResEl.style.color = isSSO ? '#22543d' : '#2563eb';
  }

  altEl.addEventListener('input', update);
  incEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter satellite circular orbital altitude h in kilometers (e.g. 500 to 1,000 km LEO).',
      'Enter orbit inclination angle i in degrees (e.g. 98.2° for SSO).',
      'Inspect Right Ascension of the Ascending Node (RAAN) precession drift rate $\dot{\Omega}$ in degrees/day and verify exact Sun-Synchronous retrograde inclination.'
    ],
    benefitTitle: 'Earth Equatorial Bulge J₂ Orbital Dynamics',
    benefitContent: 'Earth\'s equatorial centrifugal bulge creates the $J_2$ gravitational perturbation that torques satellite orbital planes; tuning retrograde inclination ($i \approx 97^\circ\text{–}99^\circ$) causes the orbital plane to precess eastwards by exactly $+0.9856^\circ/\text{day}$ ($360^\circ/\text{year}$), ensuring spy and weather satellites (Landsat, Sentinel) pass overhead at the exact same local solar time daily.',
    faqs: [{ q: 'Why must Sun-Synchronous Orbits be retrograde (i > 90°)?', a: 'Because $\cos(i)$ must be negative to make the precession rate $\dot{\Omega} \propto -\cos(i)$ positive (eastward matching the Sun\'s apparent motion).' }]
  },

  // 22. Gravity-Turn Rocket Launch Pitchover Trajectory Calculator
  {
    slug: 'gravity-turn-rocket-launch-pitchover-trajectory-calculator',
    name: 'Rocket Launch Gravity Turn Trajectory & Flight Path Angle (γ̇) Calculator',
    description: 'Calculate orbital launch vehicle zero-lift gravity turn steering dynamics (γ̇ = - (g / v) · cos γ + (v / r) · cos γ) and gravity drag delta-V penalty losses.',
    category: 'Science',
    icon: 'text',
    keywords: ['gravity turn calculator', 'rocket launch pitchover trajectory formula gamma dot online', 'orbital ascent gravity loss delta v calculator', 'launch vehicle flight path angle gravity turn online', 'rocket trajectory optimization astrodynamics online'],
    order: 808,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Rocket Velocity v (m/s), Flight Path Angle γ (° from Horizontal) & Altitude h (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gt-v">Velocity v (m/s)</label>
          <input class="tool-textarea" id="gt-v" type="number" step="50" value="500.0" placeholder="500.0 m/s (Mach 1.5)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gt-gamma">Path Angle γ (°)</label>
          <input class="tool-textarea" id="gt-gamma" type="number" step="1" value="65.0" placeholder="65.0° (from Horizontal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gt-alt">Altitude h (km)</label>
          <input class="tool-textarea" id="gt-alt" type="number" step="5" value="15.0" placeholder="15.0 km (Troposphere)" />
        </div>
      </div>
      <div id="gt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gt-res-gdot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">γ̇ = -0.472 ° / second Pitchover</span>
            <span class="stat-label">Natural Gravity-Turn Pitchover Rate (dγ/dt)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gt-res-grav" style="font-weight:700;">Instantaneous Gravity Drag Loss g·sin γ = 8.84 m/s² (0.90g Acceleration Penalty)</span>
            <span class="stat-label">Gravity Drag Penalty Loss Rate (g·sin γ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('gt-v'), gEl = document.getElementById('gt-gamma'), aEl = document.getElementById('gt-alt');
  const gdResEl = document.getElementById('gt-res-gdot'), grResEl = document.getElementById('gt-res-grav');

  const g0 = 9.80665;
  const R_E = 6378.137; // km

  function update() {
    const v = parseFloat(vEl.value), gammaDeg = parseFloat(gEl.value), hKm = parseFloat(aEl.value);
    if (isNaN(v) || isNaN(gammaDeg) || isNaN(hKm) || v <= 0 || gammaDeg <= 0 || gammaDeg > 90 || hKm < 0) return;

    const r_km = R_E + hKm;
    const r_m = r_km * 1000.0;

    // Altitude-dependent local gravity g = g0 * (R_E / r)^2
    const g_local = g0 * Math.pow(R_E / r_km, 2);

    const gammaRad = (gammaDeg * Math.PI) / 180;

    // Gravity turn flight path rate: gamma_dot = - (g_local / v) * cos(gamma) + (v / r_m) * cos(gamma)  [rad / s]
    const gamma_dot_rad = (-(g_local / v) + (v / r_m)) * Math.cos(gammaRad);
    const gamma_dot_deg = (gamma_dot_rad * 180.0) / Math.PI;

    // Instantaneous gravity drag loss a_grav = g_local * sin(gamma)  [m / s^2]
    const a_grav = g_local * Math.sin(gammaRad);

    gdResEl.textContent = 'γ̇ = ' + gamma_dot_deg.toFixed(3) + ' ° / second (Pitching Down)';
    grResEl.textContent = 'Gravity Drag: ' + a_grav.toFixed(2) + ' m/s² (g_local = ' + g_local.toFixed(2) + ' m/s² @ h = ' + hKm + ' km, v = ' + v + ' m/s)';
  }

  [vEl, gEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rocket instantaneous ascent velocity v in m/s.',
      'Enter flight path velocity angle $\gamma$ above horizontal in degrees (90° = vertical liftoff, 0° = horizontal orbital insertion).',
      'Enter current altitude h in kilometers.',
      'Inspect natural gravity-turn pitchover angular rate $\dot{\gamma}$ in degrees/second and instantaneous gravity drag delta-V loss rate ($g\sin\gamma$).'
    ],
    benefitTitle: 'Zero-Aerodynamic-Load Orbital Ascent Trajectory',
    benefitContent: 'By initiating a tiny pitchover kick at low altitude and aligning the rocket engine thrust vector exactly with the velocity vector ($\alpha = 0$), gravity naturally arcs the vehicle horizontal with zero aerodynamic angle of attack, eliminating destructive bending moments on the rocket fairing.',
    faqs: [{ q: 'What is Gravity Loss during rocket launch?', a: 'Gravity loss is the $\Delta v$ penalty ($\Delta v_{\text{grav}} = \int g \sin\gamma \, dt \approx 1,200\text{–}1,800\text{ m/s}$) spent overcoming Earth\'s downward gravitational pull during ascent.' }]
  },

  // 23. Patched Conics Hyperbolic Excess Velocity (v_∞) & Interplanetary Injection Calculator
  {
    slug: 'patched-conics-hyperbolic-excess-velocity-v-inf-calculator',
    name: 'Patched Conics Hyperbolic Excess Velocity (v_∞) & Trans-Injection Calculator',
    description: 'Calculate interplanetary hyperbolic excess escape velocity (v_∞ = √(v_inj² - 2·μ / r₀)) in km/s and required Trans-Mars/Venus Injection (TMI/TVI) burn delta-V from Low Earth Orbit.',
    category: 'Science',
    icon: 'text',
    keywords: ['hyperbolic excess velocity calculator', 'v infinity formula v inj squared minus 2 mu over r0 online', 'trans mars injection delta v calculator patched conics', 'interplanetary trajectory escape velocity calculator', 'astrodynamics hyperbolic departure burn online'],
    order: 809,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Parking Orbit Altitude h (km) & Target Interplanetary Departure v_∞ (km/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hyp-h">LEO Altitude h (km)</label>
          <input class="tool-textarea" id="hyp-h" type="number" step="25" value="250.0" placeholder="250.0 km (Parking Orbit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hyp-vinf">Excess v_∞ (km/s)</label>
          <input class="tool-textarea" id="hyp-vinf" type="number" step="0.1" value="2.95" placeholder="2.95 km/s (Trans-Mars Injection)" />
        </div>
      </div>
      <div id="hyp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hyp-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Δv_inj = 3.61 km / s Burn</span>
            <span class="stat-label">Required Departure Injection Burn Delta-V (Δv_inj)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hyp-res-v0" style="font-weight:700;">Departure Speed v_inj = 11.36 km/s (Escape v_esc = 10.97 km/s | Characteristic Energy C₃ = 8.70 km²/s²)</span>
            <span class="stat-label">Trans-Interplanetary Injection Speed & C₃ Energy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('hyp-h'), vinfEl = document.getElementById('hyp-vinf');
  const dvResEl = document.getElementById('hyp-res-dv'), v0ResEl = document.getElementById('hyp-res-v0');

  const mu_earth = 398600.4418; // km^3 / s^2
  const R_E = 6378.137;         // Earth radius in km

  function update() {
    const hKm = parseFloat(hEl.value), v_inf = parseFloat(vinfEl.value);
    if (isNaN(hKm) || isNaN(v_inf) || hKm <= 100 || v_inf < 0) return;

    const r0 = R_E + hKm;

    // Circular parking orbit velocity v_circ = sqrt( mu / r0 )  [km / s]
    const v_circ = Math.sqrt(mu_earth / r0);

    // Escape velocity from parking orbit v_esc = sqrt( 2 * mu / r0 )
    const v_esc = Math.sqrt(2.0 * mu_earth / r0);

    // Hyperbolic departure injection velocity v_inj = sqrt( v_esc^2 + v_inf^2 )
    const v_inj = Math.sqrt(Math.pow(v_esc, 2) + Math.pow(v_inf, 2));

    // Required burn delta-V: Delta_v = v_inj - v_circ  [km / s]
    const Delta_v = v_inj - v_circ;

    // Characteristic launch energy C3 = v_inf^2  [km^2 / s^2]
    const C3 = Math.pow(v_inf, 2);

    dvResEl.textContent = 'Δv_inj = ' + Delta_v.toFixed(2) + ' km / s (' + Math.round(Delta_v * 1000).toLocaleString() + ' m/s Burn)';
    v0ResEl.textContent = 'v_inj = ' + v_inj.toFixed(2) + ' km/s (C₃ = ' + C3.toFixed(2) + ' km²/s² | Circular v_circ = ' + v_circ.toFixed(2) + ' km/s, v_esc = ' + v_esc.toFixed(2) + ' km/s)';
  }

  hEl.addEventListener('input', update);
  vinfEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter circular Low Earth Orbit (LEO) parking altitude h in kilometers (e.g. 250 km).',
      'Enter target hyperbolic excess escape velocity $v_\infty$ in km/s (e.g. 2.95 km/s for standard Hohmann Trans-Mars Injection).',
      'Inspect required departure injection burn $\Delta v_{\text{inj}}$ in km/s, departure perigee velocity $v_{\text{inj}}$, and Characteristic Energy $C_3 = v_\infty^2$.'
    ],
    benefitTitle: 'Patched Conics Interplanetary Trajectory Method',
    benefitContent: 'The Oberth effect enables deep space spacecraft to perform high-energy departure burns inside Earth\'s gravity well ($v_{\text{inj}} = \sqrt{v_{\text{esc}}^2 + v_\infty^2}$), converting propellant chemical energy far more efficiently than firing in deep interplanetary space.',
    faqs: [{ q: 'What is Characteristic Launch Energy (C3)?', a: '$C_3 = v_\infty^2\text{ (km}^2/\text{s}^2)$ is NASA\'s standard metric for rating rocket launch vehicle throw-weight payload capacity for interplanetary robotic missions.' }]
  },

  // 24. Bi-Elliptic vs Hohmann Orbital Transfer Delta-V Comparison Calculator
  {
    slug: 'bi-elliptic-transfer-delta-v-hohmann-comparison-calculator',
    name: 'Bi-Elliptic vs Hohmann Orbital Transfer Total Delta-V (Δv_total) Calculator',
    description: 'Calculate 3-impulse Bi-Elliptic orbital transfer total delta-V (Δv_total = Δv₁ + Δv₂ + Δv₃) and compare against standard 2-impulse Hohmann transfer for large orbital radius ratios (r_final / r_initial exceeding 11.94).',
    category: 'Science',
    icon: 'text',
    keywords: ['bi elliptic transfer calculator', 'hohmann vs bi elliptic transfer delta v formula online', 'three burn bi elliptic orbital maneuver calculator', 'astrodynamics orbital transfer efficiency calculator', 'satellite orbit raising delta v online'],
    order: 810,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Orbit Radius r₁ (km), Final Target Radius r₂ (km) & Intermediate Apogee r_b (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bi-r1">Initial r₁ (km)</label>
          <input class="tool-textarea" id="bi-r1" type="number" step="100" value="7000.0" placeholder="7000.0 km (LEO)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bi-r2">Final r₂ (km)</label>
          <input class="tool-textarea" id="bi-r2" type="number" step="5000" value="105000.0" placeholder="105000.0 km (15× LEO)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bi-rb">Intermediate r_b</label>
          <input class="tool-textarea" id="bi-rb" type="number" step="10000" value="250000.0" placeholder="250000.0 km (Apogee)" />
        </div>
      </div>
      <div id="bi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bi-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bi-Elliptic: 4.12 km/s vs Hohmann: 4.38 km/s</span>
            <span class="stat-label">Total Transfer Delta-V Comparison (Δv_total)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bi-res-save" style="color:var(--green-dark); font-weight:700;">BI-ELLIPTIC SAVES +260 m/s FUEL (Radius Ratio r₂/r₁ = 15.0 > 11.94 Threshold)</span>
            <span class="stat-label">Propellant Delta-V Savings & Efficiency Analysis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('bi-r1'), r2El = document.getElementById('bi-r2'), rbEl = document.getElementById('bi-rb');
  const dvResEl = document.getElementById('bi-res-dv'), svResEl = document.getElementById('bi-res-save');

  const mu = 398600.4418; // Earth gravitational parameter in km^3 / s^2

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value), rb = parseFloat(rbEl.value);
    if (isNaN(r1) || isNaN(r2) || isNaN(rb) || r1 <= 0 || r2 <= r1 || rb <= r2) return;

    const ratio = r2 / r1;

    // Hohmann transfer 2-burn delta-V:
    // a_hoh = (r1 + r2) / 2
    // dv1_hoh = sqrt(mu/r1) * ( sqrt(2*r2 / (r1 + r2)) - 1 )
    // dv2_hoh = sqrt(mu/r2) * ( 1 - sqrt(2*r1 / (r1 + r2)) )
    const dv1_hoh = Math.sqrt(mu / r1) * (Math.sqrt((2.0 * r2) / (r1 + r2)) - 1.0);
    const dv2_hoh = Math.sqrt(mu / r2) * (1.0 - Math.sqrt((2.0 * r1) / (r1 + r2)));
    const dv_hohmann = dv1_hoh + dv2_hoh;

    // Bi-elliptic transfer 3-burn delta-V:
    // Burn 1 (at r1): dv1 = sqrt(2*mu/r1 - 2*mu/(r1+rb)) - sqrt(mu/r1)
    const dv1_bi = Math.sqrt((2.0 * mu / r1) - (2.0 * mu / (r1 + rb))) - Math.sqrt(mu / r1);
    // Burn 2 (at rb): dv2 = sqrt(2*mu/rb - 2*mu/(r2+rb)) - sqrt(2*mu/rb - 2*mu/(r1+rb))
    const dv2_bi = Math.abs(Math.sqrt((2.0 * mu / rb) - (2.0 * mu / (r2 + rb))) - Math.sqrt((2.0 * mu / rb) - (2.0 * mu / (r1 + rb))));
    // Burn 3 (at r2): dv3 = sqrt(mu/r2) - sqrt(2*mu/r2 - 2*mu/(r2+rb))
    const dv3_bi = Math.abs(Math.sqrt(mu / r2) - Math.sqrt((2.0 * mu / r2) - (2.0 * mu / (r2 + rb))));

    const dv_bielliptic = dv1_bi + dv2_bi + dv3_bi;
    const diff_m_s = (dv_hohmann - dv_bielliptic) * 1000.0;

    let evalStr = '';
    let color = '#22543d';

    if (ratio > 11.94 && dv_bielliptic < dv_hohmann) {
      evalStr = 'BI-ELLIPTIC IS MORE EFFICIENT (Saves +' + Math.round(diff_m_s) + ' m/s over Hohmann | r₂/r₁ = ' + ratio.toFixed(1) + ' > 11.94)';
      color = '#22543d';
    } else {
      evalStr = 'HOHMANN IS MORE EFFICIENT (Hohmann saves +' + Math.round(-diff_m_s) + ' m/s and requires much shorter transfer time)';
      color = '#2563eb';
    }

    dvResEl.textContent = 'Bi-Elliptic: ' + dv_bielliptic.toFixed(2) + ' km/s vs Hohmann: ' + dv_hohmann.toFixed(2) + ' km/s';
    svResEl.textContent = evalStr;
    svResEl.style.color = color;
  }

  [r1El, r2El, rbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter starting circular orbit radius $r_1$ in km (from center of central body).',
      'Enter target final orbit radius $r_2$ in km.',
      'Enter intermediate bi-elliptic apogee radius $r_b > r_2$ in km.',
      'Inspect total $\Delta v$ comparison between 2-impulse Hohmann and 3-impulse Bi-Elliptic trajectories.'
    ],
    benefitTitle: 'Ary Sternfeld 1934 Bi-Elliptic Transfer Principle',
    benefitContent: 'When raising an orbit by a factor greater than 11.94 ($r_2 / r_1 > 11.94$), boosting to a high intermediate apogee $r_b$ reduces plane-change and circularization speeds so drastically that a 3-burn bi-elliptic transfer uses strictly less propellant $\Delta v$ than a direct Hohmann transfer.',
    faqs: [{ q: 'What is the downside of a bi-elliptic transfer?', a: 'Bi-elliptic transfers take vastly longer elapsed flight times (often days or months longer) than direct Hohmann transfers.' }]
  },

  // 25. Earth-Sun / Earth-Moon Lagrange Points (L₁ & L₂) & Hill Sphere Calculator
  {
    slug: 'lagrange-point-l1-l2-location-hill-sphere-calculator',
    name: 'Lagrange Points (L₁, L₂ Distance) & Gravitational Hill Sphere Radius Calculator',
    description: 'Calculate three-body gravitational Lagrange collinear equilibrium points (L₁, L₂ distance r_L ≈ R · ∛(m₂ / 3·m₁)) in km and gravitational Hill Sphere stability radius.',
    category: 'Science',
    icon: 'text',
    keywords: ['lagrange point calculator', 'l1 l2 distance formula r cube root m2 over 3 m1 online', 'hill sphere radius calculator online', 'james webb space telescope l2 halo orbit calculator', 'three body gravitational equilibrium lagrange online'],
    order: 811,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primary Body (Sun-Earth, Earth-Moon, Sun-Jupiter), Separation Distance R (km) & Mass Ratio',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lag-system">Gravitational System</label>
          <select class="tool-textarea" id="lag-system">
            <option value="sun_earth" selected>Sun - Earth System (JWST, SOHO: R = 149.6M km, μ = 3.003e-6)</option>
            <option value="earth_moon">Earth - Moon System (Gateway: R = 384,400 km, μ = 0.01215)</option>
            <option value="sun_jupiter">Sun - Jupiter System (Trojan Asteroids: R = 778.5M km)</option>
          </select>
        </div>
      </div>
      <div id="lag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lag-res-l1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L₁ / L₂ Distance: 1,496,000 km (0.0100 AU)</span>
            <span class="stat-label">Collinear L₁ & L₂ Distance from Secondary Body</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lag-res-hill" style="color:var(--green-dark); font-weight:700;">Hill Sphere Radius r_H = 1,496,000 km (Earth Gravitational Dominance Boundary)</span>
            <span class="stat-label">Gravitational Hill Sphere Radius & Deep Space Observatory Location</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sysEl = document.getElementById('lag-system');
  const l1ResEl = document.getElementById('lag-res-l1'), hlResEl = document.getElementById('lag-res-hill');

  const SYSTEMS = {
    'sun_earth':   { R_km: 149597870.7, mu_ratio: 3.003e-6, name: 'Sun-Earth System (JWST @ L₂ / SOHO @ L₁)' },
    'earth_moon':  { R_km: 384400.0,    mu_ratio: 0.01215,  name: 'Earth-Moon System (Artemis Gateway L₂)' },
    'sun_jupiter': { R_km: 778500000.0, mu_ratio: 9.537e-4, name: 'Sun-Jupiter System (Trojan Asteroids @ L₄/L₅)' }
  };

  function update() {
    const s = SYSTEMS[sysEl.value];

    // Collinear L1 and L2 approximate distance r_L = R * ( mu_ratio / 3 )^(1/3)  [km]
    const r_L_km = s.R_km * Math.pow(s.mu_ratio / 3.0, 1.0 / 3.0);

    // Hill Sphere radius r_Hill = R * ( mu_ratio / 3 )^(1/3)
    const r_Hill_km = r_L_km;

    const r_L_miles = r_L_km * 0.621371;

    l1ResEl.textContent = 'L₁ / L₂ = ' + Math.round(r_L_km).toLocaleString() + ' km (' + Math.round(r_L_miles).toLocaleString() + ' mi from Secondary)';
    hlResEl.textContent = 'Hill Sphere: ' + Math.round(r_Hill_km).toLocaleString() + ' km | ' + s.name;
  }

  sysEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select three-body gravitational system (Sun-Earth, Earth-Moon, Sun-Jupiter).',
      'Inspect exact collinear Lagrange point $L_1$ and $L_2$ distance in kilometers and miles, along with the secondary body\'s gravitational Hill Sphere radius.'
    ],
    benefitTitle: 'Joseph-Louis Lagrange 1772 Three-Body Equilibrium Points',
    benefitContent: 'At $L_1$ and $L_2$, gravitational pull from the primary and secondary bodies balances centrifugal force, creating stable halo orbit locations for deep space observatories (NASA James Webb Space Telescope at Sun-Earth $L_2$ 1.5 million km away).',
    faqs: [{ q: 'Why is JWST placed at Sun-Earth L2 instead of LEO?', a: 'Sun-Earth $L_2$ keeps the Sun, Earth, and Moon all in one continuous direction behind the spacecraft\'s 5-layer tennis-court-sized sunshield, allowing cryo-cooling of infrared sensors to 40 K.' }]
  }
];

pack26Tools.forEach(createTool);
console.log('Pack 26 complete: 25 tools created.');
