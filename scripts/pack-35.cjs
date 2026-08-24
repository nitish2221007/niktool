const { createTool } = require('./generate-curated-tools.cjs');

// Pack 35: 25 University Physical Chemistry, Reaction Kinetics, Electrochemistry & Transport Phenomena Calculators (Tools 1126 to 1150)
const pack35Tools = [
  // 1. Gibbs Free Energy & Van 't Hoff Reaction Spontaneity Calculator
  {
    slug: 'gibbs-free-energy-reaction-spontaneity-van-t-hoff-isochore-calculator',
    name: 'Gibbs Free Energy (ΔG° = ΔH° - T·ΔS°) & Van \'t Hoff Equilibrium K Calculator',
    description: 'Calculate chemical reaction standard Gibbs Free Energy change (ΔG° = ΔH° - T · ΔS°) in kJ/mol, thermodynamic equilibrium constant (K = e^(-ΔG° / RT)), and crossover spontaneous temperature T_eq for physical chemistry.',
    category: 'Science',
    icon: 'text',
    keywords: ['gibbs free energy calculator', 'delta g equals delta h minus t delta s formula online', 'van t hoff equilibrium constant k calculator', 'reaction spontaneity enthalpy entropy temperature calculator', 'physical chemistry thermodynamics free energy online'],
    order: 1007,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Standard Enthalpy ΔH° (kJ/mol), Entropy ΔS° (J/(mol·K)) & Temperature T (K or °C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gb-dh">Enthalpy ΔH° (kJ/mol)</label>
          <input class="tool-textarea" id="gb-dh" type="number" step="10" value="-92.2" placeholder="-92.2 kJ/mol (Haber Process)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gb-ds">Entropy ΔS° (J/mol·K)</label>
          <input class="tool-textarea" id="gb-ds" type="number" step="10" value="-198.7" placeholder="-198.7 J/mol·K" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gb-temp">Temp T (K)</label>
          <input class="tool-textarea" id="gb-temp" type="number" step="25" value="298.15" placeholder="298.15 K (25°C)" />
        </div>
      </div>
      <div id="gb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gb-res-dg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ΔG° = -32.96 kJ / mol (SPONTANEOUS)</span>
            <span class="stat-label">Standard Gibbs Free Energy Change</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gb-res-k" style="color:var(--green-dark); font-weight:700;">Equilibrium K = 5.98 × 10⁵ | Spontaneous Crossover Temp T_eq = 464.0 K (190.9 °C)</span>
            <span class="stat-label">Thermodynamic Equilibrium Constant (K) & Equilibrium Boundary</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dhEl = document.getElementById('gb-dh'), dsEl = document.getElementById('gb-ds'), tEl = document.getElementById('gb-temp');
  const dgResEl = document.getElementById('gb-res-dg'), kResEl = document.getElementById('gb-res-k');

  const R = 8.314462; // J / (mol * K)

  function update() {
    const dH_kJ = parseFloat(dhEl.value), dS_J = parseFloat(dsEl.value), T = parseFloat(tEl.value);
    if (isNaN(dH_kJ) || isNaN(dS_J) || isNaN(T) || T <= 0) return;

    // Convert dH to J/mol:
    const dH_J = dH_kJ * 1000.0;

    // Delta G = dH - T * dS  [J / mol]
    const dG_J = dH_J - (T * dS_J);
    const dG_kJ = dG_J / 1000.0;

    // Equilibrium constant K = exp( -dG / (R * T) )
    const exponent = -dG_J / (R * T);
    let K_str = '';
    if (exponent > 700) K_str = '> 10³⁰⁰ (Extremely Products-Favored)';
    else if (exponent < -700) K_str = '< 10⁻³⁰⁰ (Reactants-Favored)';
    else {
      const K = Math.exp(exponent);
      K_str = K >= 1000 || K <= 0.001 ? K.toExponential(2) : K.toFixed(3);
    }

    // Crossover temperature where Delta G = 0: T_eq = dH / dS
    let crossoverStr = '';
    if (dS_J !== 0) {
      const T_eq = dH_J / dS_J;
      if (T_eq > 0) {
        crossoverStr = 'Spontaneous Crossover T_eq = ' + T_eq.toFixed(1) + ' K (' + (T_eq - 273.15).toFixed(1) + ' °C)';
      } else {
        crossoverStr = dH_kJ < 0 ? 'Spontaneous at ALL temperatures' : 'Non-spontaneous at ALL temperatures';
      }
    }

    let status = '', color = '#22543d';
    if (dG_kJ < 0) {
      status = 'SPONTANEOUS (ΔG° < 0: Exergonic, forward reaction favored)';
      color = '#22543d';
    } else if (dG_kJ === 0) {
      status = 'DYNAMIC EQUILIBRIUM (ΔG° = 0)';
      color = '#22543d';
    } else {
      status = 'NON-SPONTANEOUS (ΔG° > 0: Endergonic, reverse reaction favored)';
      color = '#c53030';
    }

    dgResEl.textContent = 'ΔG° = ' + (dG_kJ >= 0 ? '+' : '') + dG_kJ.toFixed(2) + ' kJ / mol (' + status.split(' (')[0] + ')';
    dgResEl.style.color = color;
    kResEl.textContent = 'Equilibrium K = ' + K_str + ' | ' + crossoverStr;
    kResEl.style.color = color;
  }

  [dhEl, dsEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter standard reaction enthalpy $\Delta H^\circ$ in kJ/mol (negative for exothermic, positive for endothermic).',
      'Enter standard reaction entropy change $\Delta S^\circ$ in $\text{J}/(\text{mol}\cdot\text{K})$.',
      'Enter absolute reaction temperature T in Kelvin (e.g. 298.15 K for $25^\circ\text{C}$).',
      'Inspect Gibbs Free Energy change ($\Delta G^\circ = \Delta H^\circ - T\Delta S^\circ$), thermodynamic equilibrium constant K, and crossover temperature $T_{\text{eq}} = \Delta H^\circ / \Delta S^\circ$.'
    ],
    benefitTitle: 'Josiah Willard Gibbs 1876 Chemical Thermodynamics Criterion',
    benefitContent: 'Gibbs Free Energy represents maximum non-expansion work extractable from a closed thermodynamic system at constant temperature and pressure; a negative value ($\Delta G < 0$) is the fundamental criterion for chemical reaction spontaneity.',
    faqs: [{ q: 'What is the relationship between Delta G and the equilibrium constant K?', a: '$\Delta G^\circ = -RT \ln K$. When $\Delta G^\circ < 0$, $K > 1$ and the equilibrium favors products.' }]
  },

  // 2. Clausius-Clapeyron Vapor Pressure & Enthalpy of Vaporization Calculator
  {
    slug: 'clausius-clapeyron-vapor-pressure-boiling-point-calculator',
    name: 'Clausius-Clapeyron Vapor Pressure & Boiling Point (ln(P₂/P₁) = -ΔH_vap/R·(1/T₂ - 1/T₁)) Calculator',
    description: 'Calculate liquid equilibrium vapor pressure (P₂ = P₁ · e^[-ΔH_vap/R · (1/T₂ - 1/T₁)]) in kPa/bar and boiling point shifts at reduced pressure (vacuum distillation) or high elevation for chemistry courses.',
    category: 'Science',
    icon: 'text',
    keywords: ['clausius clapeyron calculator', 'vapor pressure formula ln p2 over p1 online', 'enthalpy of vaporization boiling point vacuum calculator', 'liquid vapor phase boundary clausius clapeyron calculator', 'physical chemistry vapor pressure temperature online'],
    order: 1008,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Enthalpy of Vaporization ΔH_vap (kJ/mol), Known Reference (T₁ in K, P₁ in kPa) & Target Temp T₂ (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cc-dh">ΔH_vap (kJ/mol)</label>
          <input class="tool-textarea" id="cc-dh" type="number" step="2" value="40.66" placeholder="40.66 kJ/mol (Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cc-t1">Normal B.P. T₁ (K)</label>
          <input class="tool-textarea" id="cc-t1" type="number" step="5" value="373.15" placeholder="373.15 K (100°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cc-p1">Reference P₁ (kPa)</label>
          <input class="tool-textarea" id="cc-p1" type="number" step="1" value="101.325" placeholder="101.325 kPa (1 atm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cc-t2">Target Temp T₂ (K)</label>
          <input class="tool-textarea" id="cc-t2" type="number" step="5" value="353.15" placeholder="353.15 K (80°C)" />
        </div>
      </div>
      <div id="cc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cc-res-p2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Vapor Pressure P₂ = 47.33 kPa</span>
            <span class="stat-label">Equilibrium Saturated Vapor Pressure at T₂</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cc-res-bar" style="color:var(--green-dark); font-weight:700;">P₂ = 0.467 atm (355.0 mmHg) | Boiling occurs when ambient pressure drops to 47.33 kPa</span>
            <span class="stat-label">Vacuum Distillation & Phase Transition Equilibrium</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dhEl = document.getElementById('cc-dh'), t1El = document.getElementById('cc-t1');
  const p1El = document.getElementById('cc-p1'), t2El = document.getElementById('cc-t2');
  const p2ResEl = document.getElementById('cc-res-p2'), barResEl = document.getElementById('cc-res-bar');

  const R = 8.314462; // J / (mol * K)

  function update() {
    const dH_kJ = parseFloat(dhEl.value), T1 = parseFloat(t1El.value);
    const P1_kPa = parseFloat(p1El.value), T2 = parseFloat(t2El.value);

    if (isNaN(dH_kJ) || isNaN(T1) || isNaN(P1_kPa) || isNaN(T2) || dH_kJ <= 0 || T1 <= 0 || P1_kPa <= 0 || T2 <= 0) return;

    const dH_J = dH_kJ * 1000.0;

    // Clausius-Clapeyron equation: ln(P2 / P1) = -(dH_vap / R) * ( 1/T2 - 1/T1 )
    const exponent = -(dH_J / R) * ((1.0 / T2) - (1.0 / T1));
    const P2_kPa = P1_kPa * Math.exp(exponent);

    const P2_atm = P2_kPa / 101.325;
    const P2_mmHg = P2_kPa * 7.50062;

    p2ResEl.textContent = 'Vapor Pressure P₂ = ' + P2_kPa.toFixed(2) + ' kPa';
    barResEl.textContent = 'P₂ = ' + P2_atm.toFixed(3) + ' atm (' + P2_mmHg.toFixed(1) + ' mmHg) @ T₂ = ' + T2 + ' K (' + (T2 - 273.15).toFixed(1) + ' °C)';
  }

  [dhEl, t1El, p1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter molar enthalpy of vaporization $\Delta H_{\text{vap}}$ in kJ/mol (e.g. 40.66 kJ/mol for water, 38.56 kJ/mol for ethanol).',
      'Enter normal boiling point reference temperature $T_1$ in Kelvin at standard atmospheric pressure $P_1$ (101.325 kPa).',
      'Enter target operating temperature $T_2$ in Kelvin.',
      'Inspect equilibrium vapor pressure $P_2$ in kPa, atmospheres, and mmHg.'
    ],
    benefitTitle: 'Rudolf Clausius & Benoît Paul Émile Clapeyron 1834 Equation',
    benefitContent: 'The Clausius-Clapeyron equation describes exponential growth of saturated vapor pressure with temperature ($\frac{d \ln P}{dT} = \frac{\Delta H_{\text{vap}}}{RT^2}$), forming the engineering foundation of vacuum rotary evaporation and steam turbine power plants.',
    faqs: [{ q: 'Why does water boil at lower temperatures at high altitudes?', a: 'Atmospheric pressure is lower at high altitudes; boiling occurs when saturated vapor pressure equals ambient atmospheric pressure.' }]
  },

  // 3. Raoult's Law Ideal Binary Solution Vapor Pressure & Distillation Calculator
  {
    slug: 'raoults-law-ideal-solution-vapor-pressure-binary-mixture-calculator',
    name: 'Raoult\'s Law Binary Mixture Vapor Pressure (P_tot = x_A·P_A* + x_B·P_B*) Calculator',
    description: 'Calculate ideal liquid solution partial vapor pressures (P_A = x_A · P_A*, P_B = x_B · P_B*), total vapor pressure (P_total = P_A + P_B), and vapor phase mole fractions (y_A = P_A / P_total) for fractional distillation.',
    category: 'Science',
    icon: 'text',
    keywords: ['raoults law calculator', 'vapor pressure ideal binary solution formula online', 'mole fraction liquid vapor distillation raoult calculator', 'partial pressure dalton raoult binary mixture calculator', 'chemical engineering vapor liquid equilibrium vle online'],
    order: 1009,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Component A Liquid Mole Fraction x_A, Pure Vapor Pressure P_A* (kPa) & Pure P_B* (kPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ra-xa">Mole Fraction x_A</label>
          <input class="tool-textarea" id="ra-xa" type="number" step="0.05" min="0" max="1" value="0.40" placeholder="0.40 (40% Benzene)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ra-pa">Pure P_A* (kPa)</label>
          <input class="tool-textarea" id="ra-pa" type="number" step="5" value="100.0" placeholder="100.0 kPa (Volatile A)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ra-pb">Pure P_B* (kPa)</label>
          <input class="tool-textarea" id="ra-pb" type="number" step="5" value="40.0" placeholder="40.0 kPa (Toluene B)" />
        </div>
      </div>
      <div id="ra-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ra-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_total = 64.00 kPa</span>
            <span class="stat-label">Total Ideal Solution Vapor Pressure</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ra-res-vap" style="color:var(--green-dark); font-weight:700;">Vapor Mole Fraction y_A = 0.625 (62.5% A: Vapor is enriched in more volatile component)</span>
            <span class="stat-label">Vapor Phase Composition (y_A = P_A / P_total) & Separation Factor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xaEl = document.getElementById('ra-xa'), paEl = document.getElementById('ra-pa'), pbEl = document.getElementById('ra-pb');
  const totResEl = document.getElementById('ra-res-tot'), vapResEl = document.getElementById('ra-res-vap');

  function update() {
    const x_A = parseFloat(xaEl.value), P_A_pure = parseFloat(paEl.value), P_B_pure = parseFloat(pbEl.value);
    if (isNaN(x_A) || isNaN(P_A_pure) || isNaN(P_B_pure) || x_A < 0 || x_A > 1 || P_A_pure <= 0 || P_B_pure <= 0) return;

    const x_B = 1.0 - x_A;

    // Raoult's Law: P_A = x_A * P_A*, P_B = x_B * P_B*
    const P_A = x_A * P_A_pure;
    const P_B = x_B * P_B_pure;

    // Dalton's Law of Partial Pressures: P_total = P_A + P_B
    const P_total = P_A + P_B;

    // Vapor phase mole fraction: y_A = P_A / P_total
    const y_A = P_total > 0 ? (P_A / P_total) : 0;
    const y_B = 1.0 - y_A;

    // Relative volatility alpha = (y_A / x_A) / (y_B / x_B) = P_A* / P_B*
    const alpha = P_A_pure / P_B_pure;

    totResEl.textContent = 'P_total = ' + P_total.toFixed(2) + ' kPa (P_A: ' + P_A.toFixed(1) + ' + P_B: ' + P_B.toFixed(1) + ' kPa)';
    vapResEl.textContent = 'Vapor y_A = ' + y_A.toFixed(3) + ' (' + (y_A * 100).toFixed(1) + '% A) | Relative Volatility α = ' + alpha.toFixed(2) + ' (Enriched from ' + (x_A * 100).toFixed(1) + '% liquid)';
  }

  [xaEl, paEl, pbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter liquid mole fraction $x_A$ of the more volatile component A ($0 \le x_A \le 1$).',
      'Enter pure saturated vapor pressure $P_A^*$ of component A in kPa.',
      'Enter pure saturated vapor pressure $P_B^*$ of component B in kPa.',
      'Inspect total vapor pressure ($P_{\text{total}} = x_A P_A^* + x_B P_B^*$), vapor phase composition ($y_A$), and relative volatility separation factor $\alpha$.'
    ],
    benefitTitle: 'François-Marie Raoult 1887 Ideal Solution Law',
    benefitContent: 'Raoult\'s Law establishes that the vapor above an ideal mixture is always enriched in the more volatile component ($y_A > x_A$), providing the thermodynamic operating principle behind petrochemical crude oil distillation columns.',
    faqs: [{ q: 'What causes positive or negative deviations from Raoult\'s Law?', a: 'Strong intermolecular attractions between dissimilar molecules (A-B > A-A) cause negative deviations; repulsive interactions cause positive deviations and azeotropes.' }]
  },

  // 4. Henry's Law Gas Solubility in Aqueous Solution Calculator
  {
    slug: 'henrys-law-gas-solubility-aqueous-concentration-calculator',
    name: 'Henry\'s Law Gas Solubility (C = k_H · P_gas) in Water & Blood Calculator',
    description: 'Calculate dissolved aqueous gas concentration (C = k_H · P_gas) in mol/L and mg/L for Oxygen (O₂), Carbon Dioxide (CO₂), and Nitrogen (N₂) from partial pressure for marine biology and decompression sickness physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['henrys law calculator', 'gas solubility formula c equals kh times p online', 'dissolved oxygen nitrogen solubility water calculator', 'scuba diving decompression sickness henrys law calculator', 'environmental aquatic gas solubility online'],
    order: 1010,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gas Selection (O₂, CO₂, N₂), Partial Pressure P_gas (atm) & Water Temperature (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hn-gas">Gas</label>
          <select class="tool-textarea" id="hn-gas">
            <option value="o2_0.0013_32" selected>Oxygen O₂ (k_H = 1.30 × 10⁻³ mol/(L·atm))</option>
            <option value="co2_0.0340_44">Carbon Dioxide CO₂ (k_H = 3.40 × 10⁻² mol/(L·atm))</option>
            <option value="n2_0.00065_28">Nitrogen N₂ (k_H = 6.50 × 10⁻⁴ mol/(L·atm) - Bends)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hn-pgas">Partial Pressure (atm)</label>
          <input class="tool-textarea" id="hn-pgas" type="number" step="0.05" value="0.21" placeholder="0.21 atm (Sea Level Air O₂)" />
        </div>
      </div>
      <div id="hn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hn-res-conc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">C = 8.74 mg / L (Dissolved O₂)</span>
            <span class="stat-label">Dissolved Aqueous Gas Concentration (mg/L or ppm)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hn-res-molar" style="color:var(--green-dark); font-weight:700;">Molarity = 2.73 × 10⁻⁴ mol/L (0.273 mM) | Healthy Aquatic Life Level (DO > 6.0 mg/L)</span>
            <span class="stat-label">Molar Concentration & Ecological Water Quality</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('hn-gas'), pEl = document.getElementById('hn-pgas');
  const cResEl = document.getElementById('hn-res-conc'), mResEl = document.getElementById('hn-res-molar');

  function update() {
    const parts = gEl.value.split('_');
    const gasName = parts[0];
    const k_H = parseFloat(parts[1]); // mol / (L * atm)
    const molarMass = parseFloat(parts[2]); // g / mol

    const P_atm = parseFloat(pEl.value);
    if (isNaN(P_atm) || P_atm <= 0) return;

    // Henry's law: C = k_H * P_gas  [mol / L]
    const C_mol_L = k_H * P_atm;

    // Convert to mg/L (ppm): C_mg_L = C_mol_L * molarMass * 1000
    const C_mg_L = C_mol_L * molarMass * 1000.0;

    cResEl.textContent = 'C = ' + (C_mg_L >= 100 ? C_mg_L.toFixed(1) : C_mg_L.toFixed(2)) + ' mg / L (' + (C_mg_L).toFixed(1) + ' ppm)';
    mResEl.textContent = 'Molarity = ' + C_mol_L.toExponential(2) + ' mol/L (' + (C_mol_L * 1000).toFixed(3) + ' mM @ P_gas = ' + P_atm.toFixed(2) + ' atm)';
  }

  gEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select gas species ($O_2, CO_2,\text{ or }N_2$).',
      'Enter gas partial pressure $P_{\text{gas}}$ in atmospheres (e.g. 0.21 atm for atmospheric oxygen, 0.78 atm for atmospheric nitrogen).',
      'Inspect dissolved aqueous concentration in mg/L (ppm) and molarity (mol/L).'
    ],
    benefitTitle: 'William Henry 1803 Gas Solubility Law',
    benefitContent: 'Henry\'s law ($C = k_H P_{\text{gas}}$) governs oxygen dissolution into ocean ecosystems, sparkling beverage carbonation, and hyperbaric scuba diving decompression sickness ("the bends").',
    faqs: [{ q: 'Why is CO2 so much more soluble in water than O2 or N2?', a: 'Carbon dioxide has a Henry\'s constant nearly 30 times higher than oxygen and chemically reacts with water to form carbonic acid ($H_2CO_3$).' }]
  },

  // 5. Arrhenius Equation Activation Energy & Reaction Rate Constant Calculator
  {
    slug: 'arrhenius-equation-activation-energy-rate-constant-calculator',
    name: 'Arrhenius Equation Reaction Rate Constant (k = A·e^(-E_a / RT)) & Activation Energy Calculator',
    description: 'Calculate chemical reaction rate constant k (k = A · e^(-E_a / RT)) and predict temperature acceleration ratios (k₂/k₁ = e^[(E_a/R)·(1/T₁ - 1/T₂)]) from Activation Energy E_a in kJ/mol for chemical kinetics.',
    category: 'Science',
    icon: 'text',
    keywords: ['arrhenius equation calculator', 'activation energy formula k equals a exp minus ea over rt online', 'reaction rate temperature dependence calculator', 'pre exponential frequency factor arrhenius calculator', 'chemical kinetics reaction rate constant solver online'],
    order: 1011,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Activation Energy E_a (kJ/mol), Frequency Factor A (s⁻¹ or M⁻¹s⁻¹) & Temperature T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ar-ea">Activation E_a (kJ/mol)</label>
          <input class="tool-textarea" id="ar-ea" type="number" step="5" value="75.0" placeholder="75.0 kJ/mol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-a">Frequency Factor A</label>
          <input class="tool-textarea" id="ar-a" type="number" step="1" value="1.0e11" placeholder="1.0e11 s⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ar-t">Temp T (K)</label>
          <input class="tool-textarea" id="ar-t" type="number" step="10" value="298.15" placeholder="298.15 K (25°C)" />
        </div>
      </div>
      <div id="ar-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ar-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">k = 7.18 × 10⁻³ s⁻¹</span>
            <span class="stat-label">Reaction Rate Constant (k = A · e^(-E_a / RT))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ar-res-q10" style="color:var(--green-dark); font-weight:700;">+10°C Temp Boost (25°C -> 35°C): Rate increases by 2.70× (Q₁₀ Temperature Coefficient)</span>
            <span class="stat-label">Reaction Speed Acceleration with Temperature</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eaEl = document.getElementById('ar-ea'), aEl = document.getElementById('ar-a'), tEl = document.getElementById('ar-t');
  const kResEl = document.getElementById('ar-res-k'), q10ResEl = document.getElementById('ar-res-q10');

  const R = 8.314462; // J / (mol * K)

  function update() {
    const Ea_kJ = parseFloat(eaEl.value), A = parseFloat(aEl.value), T = parseFloat(tEl.value);
    if (isNaN(Ea_kJ) || isNaN(A) || isNaN(T) || Ea_kJ < 0 || A <= 0 || T <= 0) return;

    const Ea_J = Ea_kJ * 1000.0;

    // Arrhenius equation: k = A * exp( -Ea / (R * T) )
    const exponent = -Ea_J / (R * T);
    const k = A * Math.exp(exponent);

    // Q10 acceleration ratio for a 10 K rise:
    const T_plus_10 = T + 10.0;
    const exponent_plus_10 = -Ea_J / (R * T_plus_10);
    const k_plus_10 = A * Math.exp(exponent_plus_10);
    const ratio = k > 0 ? (k_plus_10 / k) : 0;

    kResEl.textContent = 'k = ' + k.toExponential(2) + ' s⁻¹';
    q10ResEl.textContent = '+10°C Temp Boost (' + (T - 273.15).toFixed(0) + '°C -> ' + (T - 263.15).toFixed(0) + '°C): Speed increases by ' + ratio.toFixed(2) + '× (E_a = ' + Ea_kJ + ' kJ/mol)';
  }

  [eaEl, aEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reaction Activation Energy $E_a$ in kJ/mol.',
      'Enter pre-exponential collision frequency factor A in $\text{s}^{-1}$.',
      'Enter absolute reaction temperature T in Kelvin.',
      'Inspect calculated reaction rate constant k and the $Q_{10}$ rate acceleration multiplier for a $+10^\circ\text{C}$ temperature increase.'
    ],
    benefitTitle: 'Svante Arrhenius 1889 Chemical Kinetics Law',
    benefitContent: 'The Arrhenius equation links molecular collision theory with Boltzmann statistics ($e^{-E_a/RT}$); as a general rule of thumb in organic synthesis, a $10^\circ\text{C}$ temperature increase roughly doubles or triples the reaction velocity.',
    faqs: [{ q: 'What is the role of a chemical catalyst in the Arrhenius equation?', a: 'A catalyst provides an alternative reaction pathway with a significantly lower activation energy ($E_a$), exponentially accelerating the rate constant k.' }]
  },

  // 6. Michaelis-Menten Enzyme Kinetics & Lineweaver-Burk Calculator
  {
    slug: 'michaelis-menten-enzyme-kinetics-lineweaver-burk-calculator',
    name: 'Michaelis-Menten Enzyme Kinetics (v = V_max·[S] / (K_m + [S])) & Lineweaver-Burk Calculator',
    description: 'Calculate biochemical enzyme-catalyzed reaction velocity (v = V_max · [S] / (K_m + [S])) in μM/min, substrate affinity (K_m), and catalytic efficiency (k_cat / K_m) for biochemistry students.',
    category: 'Science',
    icon: 'text',
    keywords: ['michaelis menten calculator', 'enzyme kinetics formula v equals vmax s over km plus s online', 'lineweaver burk double reciprocal plot calculator', 'substrate concentration enzyme affinity km vmax calculator', 'biochemistry enzyme catalysis rate online'],
    order: 1012,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Maximum Velocity V_max (μM/min), Michaelis Constant K_m (μM) & Substrate [S] (μM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mm-vmax">V_max (μM/min)</label>
          <input class="tool-textarea" id="mm-vmax" type="number" step="10" value="100.0" placeholder="100.0 μM/min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-km">K_m (μM)</label>
          <input class="tool-textarea" id="mm-km" type="number" step="5" value="20.0" placeholder="20.0 μM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-s">Substrate [S] (μM)</label>
          <input class="tool-textarea" id="mm-s" type="number" step="5" value="20.0" placeholder="20.0 μM ([S] = K_m)" />
        </div>
      </div>
      <div id="mm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mm-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">v = 50.00 μM / min (½ V_max)</span>
            <span class="stat-label">Initial Enzyme Reaction Velocity (v₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mm-res-lb" style="color:var(--green-dark); font-weight:700;">Lineweaver-Burk: 1/v = (K_m/V_max)·(1/[S]) + 1/V_max | Slope = 0.20 min</span>
            <span class="stat-label">Double-Reciprocal Lineweaver-Burk Linear Transformation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vmEl = document.getElementById('mm-vmax'), kmEl = document.getElementById('mm-km'), sEl = document.getElementById('mm-s');
  const vResEl = document.getElementById('mm-res-v'), lbResEl = document.getElementById('mm-res-lb');

  function update() {
    const V_max = parseFloat(vmEl.value), K_m = parseFloat(kmEl.value), S = parseFloat(sEl.value);
    if (isNaN(V_max) || isNaN(K_m) || isNaN(S) || V_max <= 0 || K_m <= 0 || S < 0) return;

    // Michaelis-Menten: v = ( V_max * [S] ) / ( K_m + [S] )
    const v = (V_max * S) / (K_m + S);
    const frac_vmax = (v / V_max) * 100.0;

    // Lineweaver-Burk slope: K_m / V_max
    const slope = K_m / V_max;

    let regime = '';
    if (S < (0.1 * K_m)) regime = 'First-Order Kinetics ([S] << K_m: v ∝ [S])';
    else if (S > (10.0 * K_m)) regime = 'Zero-Order Saturated Kinetics ([S] >> K_m: v ≈ V_max)';
    else regime = 'Mixed-Order Transition Kinetics';

    vResEl.textContent = 'v = ' + v.toFixed(2) + ' μM / min (' + frac_vmax.toFixed(1) + '% V_max)';
    lbResEl.textContent = 'Lineweaver-Burk Slope = ' + slope.toFixed(3) + ' min | ' + regime;
  }

  [vmEl, kmEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter enzyme maximum saturated velocity $V_{\max}$ in $\mu\text{M/min}$.',
      'Enter Michaelis constant $K_m$ in $\mu\text{M}$ (substrate concentration at which velocity is exactly half $V_{\max}$).',
      'Enter current substrate concentration $[S]$ in $\mu\text{M}$.',
      'Inspect initial reaction rate v and Lineweaver-Burk linear parameters.'
    ],
    benefitTitle: 'Leonor Michaelis & Maud Menten 1913 Enzyme Model',
    benefitContent: 'Michaelis-Menten kinetics models how enzymes form reversible enzyme-substrate complexes ($E + S \rightleftharpoons ES \rightarrow E + P$); low $K_m$ indicates high substrate binding affinity, vital for pharmaceutical drug inhibitor screening.',
    faqs: [{ q: 'What happens to enzyme velocity when [S] = Km?', a: 'When $[S] = K_m$, the reaction velocity is exactly half of the maximum velocity ($v = \frac{1}{2} V_{\max}$).' }]
  },

  // 7. First-Order & Second-Order Reaction Half-Life (t_1/2) Kinetics Calculator
  {
    slug: 'first-order-second-order-chemical-reaction-half-life-calculator',
    name: 'Chemical Reaction Order & Half-Life (Zero, 1st & 2nd Order Kinetics) Calculator',
    description: 'Calculate chemical reaction half-life (Zero-order t_½ = [A]₀/(2k), 1st-order t_½ = ln(2)/k, 2nd-order t_½ = 1/(k·[A]₀)) and remaining reactant concentration [A]_t over elapsed reaction time t.',
    category: 'Science',
    icon: 'text',
    keywords: ['reaction half life calculator', 'first order second order kinetics half life formula online', 'integrated rate law concentration time calculator', 'zero order first order second order reaction solver', 'chemical kinetics half life calculator online'],
    order: 1013,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reaction Order (0, 1st, 2nd), Rate Constant k, Initial [A]₀ (M) & Elapsed Time t (s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-ord">Reaction Order</label>
          <select class="tool-textarea" id="rk-ord">
            <option value="1" selected>1st Order (t_½ = ln(2)/k - Independent of [A]₀)</option>
            <option value="2">2nd Order (t_½ = 1/(k·[A]₀))</option>
            <option value="0">Zero Order (t_½ = [A]₀/(2k))</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-k">Rate Constant k</label>
          <input class="tool-textarea" id="rk-k" type="number" step="0.01" value="0.05" placeholder="0.05" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-a0">Initial [A]₀ (M)</label>
          <input class="tool-textarea" id="rk-a0" type="number" step="0.1" value="1.0" placeholder="1.0 M" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-t">Time t (s)</label>
          <input class="tool-textarea" id="rk-t" type="number" step="5" value="20.0" placeholder="20.0 Seconds" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-t12" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Half-Life t_½ = 13.86 s</span>
            <span class="stat-label">Reaction Half-Life (t_½ = ln(2) / k)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-at" style="color:var(--green-dark); font-weight:700;">Remaining [A]_t = 0.368 M (36.8% Remaining | 63.2% Reacted at t = 20.0 s)</span>
            <span class="stat-label">Integrated Rate Law Concentration at Time t</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ordEl = document.getElementById('rk-ord'), kEl = document.getElementById('rk-k');
  const a0El = document.getElementById('rk-a0'), tEl = document.getElementById('rk-t');
  const t12ResEl = document.getElementById('rk-res-t12'), atResEl = document.getElementById('rk-res-at');

  function update() {
    const order = parseInt(ordEl.value, 10);
    const k = parseFloat(kEl.value), A0 = parseFloat(a0El.value), t = parseFloat(tEl.value);

    if (isNaN(k) || isNaN(A0) || isNaN(t) || k <= 0 || A0 <= 0 || t < 0) return;

    let t_half = 0, At = 0, formulaDesc = '';

    if (order === 1) {
      // 1st order: t_1/2 = ln(2) / k, [A]_t = [A]_0 * exp(-k*t)
      t_half = Math.LN2 / k;
      At = A0 * Math.exp(-k * t);
      formulaDesc = '1st Order: [A]_t = [A]₀·e^(-kt)';
    } else if (order === 2) {
      // 2nd order: t_1/2 = 1 / (k * [A]_0), 1/[A]_t = 1/[A]_0 + k*t
      t_half = 1.0 / (k * A0);
      At = 1.0 / ((1.0 / A0) + (k * t));
      formulaDesc = '2nd Order: 1/[A]_t = 1/[A]₀ + kt';
    } else if (order === 0) {
      // Zero order: t_1/2 = [A]_0 / (2*k), [A]_t = [A]_0 - k*t
      t_half = A0 / (2.0 * k);
      At = Math.max(0, A0 - (k * t));
      formulaDesc = 'Zero Order: [A]_t = [A]₀ - kt';
    }

    const pctRemaining = (At / A0) * 100.0;

    t12ResEl.textContent = 'Half-Life t_½ = ' + t_half.toFixed(2) + ' s';
    atResEl.textContent = 'Remaining [A]_t = ' + At.toFixed(3) + ' M (' + pctRemaining.toFixed(1) + '% remaining | ' + formulaDesc + ')';
  }

  [ordEl, kEl, a0El, tEl].forEach(el => el.addEventListener('input', update));
  ordEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select reaction kinetic order (Zero, 1st, or 2nd order).',
      'Enter rate constant k in appropriate units ($\text{M/s}, \text{s}^{-1},\text{ or }\text{M}^{-1}\text{s}^{-1}$).',
      'Enter initial starting reactant concentration $[A]_0$ in Molar (M).',
      'Enter elapsed reaction time t in seconds.',
      'Inspect reaction half-life $t_{1/2}$ and remaining reactant concentration $[A]_t$.'
    ],
    benefitTitle: 'Integrated Rate Laws & Half-Life Physics',
    benefitContent: 'For first-order processes (like radioactive decay and pharmacological drug clearance), half-life is strictly constant and independent of initial concentration ($t_{1/2} = \frac{\ln 2}{k}$), whereas for second-order reactions half-life doubles as reactant is consumed.',
    faqs: [{ q: 'Why is first-order half-life independent of concentration?', a: 'Because the decay rate is strictly proportional to the number of remaining molecules, yielding an exponential decay function whose half-life depends purely on the rate constant k.' }]
  },

  // 8. Nernst Equation Electrochemical Cell Potential (EMF) Calculator
  {
    slug: 'nernst-equation-electrochemical-cell-potential-emf-calculator',
    name: 'Nernst Equation Electrochemical Cell Potential (E = E° - (RT/nF)·ln Q) Calculator',
    description: 'Calculate electrochemical battery and galvanic cell non-standard reduction potential (E = E° - (0.0592/n) · log₁₀ Q) in Volts from standard potential E°, transferred electron count n, and reaction quotient Q.',
    category: 'Science',
    icon: 'text',
    keywords: ['nernst equation calculator', 'electrochemical cell potential formula e equals e zero minus rt over nf ln q online', 'galvanic cell voltage nernst calculator', 'battery emf reaction quotient q calculator', 'electrochemistry redox potential online'],
    order: 1014,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Standard Cell Potential E° (V), Electron Moles n & Reaction Quotient Q ([Products]/[Reactants])',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ne-e0">Standard E° (V)</label>
          <input class="tool-textarea" id="ne-e0" type="number" step="0.05" value="1.10" placeholder="1.10 V (Daniell Zn-Cu Cell)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ne-n">Electrons n</label>
          <input class="tool-textarea" id="ne-n" type="number" step="1" min="1" value="2" placeholder="2 (Zn -> Zn²⁺ + 2e⁻)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ne-q">Quotient Q</label>
          <input class="tool-textarea" id="ne-q" type="number" step="0.1" value="0.01" placeholder="0.01 ([Zn²⁺]/[Cu²⁺])" />
        </div>
      </div>
      <div id="ne-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ne-res-emf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cell EMF E = +1.159 V (SPONTANEOUS)</span>
            <span class="stat-label">Non-Standard Cell Voltage (E_cell)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ne-res-dg" style="color:var(--green-dark); font-weight:700;">ΔG = -223.7 kJ/mol | Voltage boosted by +0.059 V because Q < 1.0 (Reactant Rich)</span>
            <span class="stat-label">Gibbs Energy (ΔG = -nFE) & Concentration Gradient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const e0El = document.getElementById('ne-e0'), nEl = document.getElementById('ne-n'), qEl = document.getElementById('ne-q');
  const emfResEl = document.getElementById('ne-res-emf'), dgResEl = document.getElementById('ne-res-dg');

  const F = 96485.33; // C / mol e-

  function update() {
    const E0 = parseFloat(e0El.value), n = parseInt(nEl.value, 10), Q = parseFloat(qEl.value);
    if (isNaN(E0) || isNaN(n) || isNaN(Q) || n < 1 || Q <= 0) return;

    // Nernst equation at 298.15 K (25°C): E = E0 - (0.05916 / n) * log10(Q)
    const deltaE = -(0.05916 / n) * Math.log10(Q);
    const E_cell = E0 + deltaE;

    // Delta G = -n * F * E_cell  [J / mol]
    const dG_kJ = (-n * F * E_cell) / 1000.0;

    let status = '', color = '#22543d';

    if (E_cell > 0) {
      status = 'SPONTANEOUS GALVANIC CELL (E > 0: Produces electric current)';
      color = '#22543d';
    } else if (E_cell === 0) {
      status = 'DEAD BATTERY AT EQUILIBRIUM (E = 0: Q = K_eq)';
      color = '#d97706';
    } else {
      status = 'ELECTROLYTIC CELL (E < 0: External voltage required to force reaction)';
      color = '#c53030';
    }

    emfResEl.textContent = 'Cell EMF E = ' + (E_cell >= 0 ? '+' : '') + E_cell.toFixed(3) + ' V (' + status.split(' (')[0] + ')';
    emfResEl.style.color = color;
    dgResEl.textContent = 'ΔG = ' + dG_kJ.toFixed(1) + ' kJ/mol | Nernst Shift = ' + (deltaE >= 0 ? '+' : '') + deltaE.toFixed(3) + ' V @ Q = ' + Q;
    dgResEl.style.color = color;
  }

  [e0El, nEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter standard electrochemical cell potential $E^\circ$ in Volts (e.g. $+1.10\text{ V}$ for standard Daniell zinc-copper cell).',
      'Enter number of moles of electrons transferred per balanced redox reaction n.',
      'Enter chemical reaction quotient $Q = \frac{[\text{Products}]^c}{[\text{Reactants}]^a}$.',
      'Inspect non-standard cell potential E in Volts and Gibbs Free Energy $\Delta G = -n F E$.'
    ],
    benefitTitle: 'Walther Nernst 1889 Electrochemistry Formulation',
    benefitContent: 'The Nernst equation connects chemical concentration gradients with electrical potential ($E = E^\circ - \frac{RT}{nF} \ln Q$), providing the operating principle for lithium-ion batteries, biological neuron action potentials, and laboratory pH glass electrodes.',
    faqs: [{ q: 'What is a dead battery in thermodynamic terms?', a: 'A dead battery has reached chemical equilibrium ($Q = K_{\text{eq}}$), making the cell potential $E = 0\text{ V}$ and $\Delta G = 0$.' }]
  },

  // 9. Faraday's Law of Electrolysis & Electroplating Mass Yield Calculator
  {
    slug: 'faraday-law-electrolysis-electroplating-mass-yield-calculator',
    name: 'Faraday\'s Law of Electrolysis & Electroplating Mass Yield (m = (I·t·M) / (z·F)) Calculator',
    description: 'Calculate electroplated metal mass yield (m = (I · t · M) / (z · F)) in grams, plating thickness in microns, and current efficiency percentage for industrial electroplating and electrolysis.',
    category: 'Science',
    icon: 'text',
    keywords: ['faraday law electrolysis calculator', 'electroplating mass formula m equals i t m over z f online', 'metal deposition thickness electroplating calculator', 'coulombs electric charge electrolysis calculator grams', 'electrochemistry faraday constant online'],
    order: 1015,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electrical Current I (Amperes), Plating Time t (minutes), Metal Valency z & Molar Mass M (g/mol)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fe-i">Current I (A)</label>
          <input class="tool-textarea" id="fe-i" type="number" step="0.5" value="5.0" placeholder="5.0 Amperes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fe-t">Time t (min)</label>
          <input class="tool-textarea" id="fe-t" type="number" step="5" value="30.0" placeholder="30.0 Minutes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fe-metal">Metal</label>
          <select class="tool-textarea" id="fe-metal">
            <option value="63.546_2" selected>Copper Cu²⁺ (M = 63.55 g/mol, z = 2)</option>
            <option value="107.868_1">Silver Ag⁺ (M = 107.87 g/mol, z = 1)</option>
            <option value="196.967_3">Gold Au³⁺ (M = 196.97 g/mol, z = 3)</option>
            <option value="58.693_2">Nickel Ni²⁺ (M = 58.69 g/mol, z = 2)</option>
            <option value="65.380_2">Zinc Zn²⁺ (M = 65.38 g/mol, z = 2)</option>
          </select>
        </div>
      </div>
      <div id="fe-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fe-res-mass" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Mass Yield m = 2.96 g Plated Metal</span>
            <span class="stat-label">Theoretical Deposited Metal Mass</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fe-res-charge" style="color:var(--green-dark); font-weight:700;">Total Charge Q = 9,000 Coulombs (0.0933 Faradays | 0.0466 mol Cu Deposited)</span>
            <span class="stat-label">Coulomb Electric Charge & Transferred Electron Moles</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('fe-i'), tEl = document.getElementById('fe-t'), mEl = document.getElementById('fe-metal');
  const msResEl = document.getElementById('fe-res-mass'), chResEl = document.getElementById('fe-res-charge');

  const F = 96485.33; // C / mol e-

  function update() {
    const I = parseFloat(iEl.value), t_min = parseFloat(tEl.value);
    const parts = mEl.value.split('_');
    const M = parseFloat(parts[0]);
    const z = parseInt(parts[1], 10);

    if (isNaN(I) || isNaN(t_min) || isNaN(M) || isNaN(z) || I <= 0 || t_min <= 0) return;

    const t_sec = t_min * 60.0;
    // Total electric charge Q = I * t  [Coulombs]
    const Q_coulombs = I * t_sec;

    // Faraday's Law: m = ( Q * M ) / ( z * F )  [grams]
    const mass_g = (Q_coulombs * M) / (z * F);

    const molesDeposited = mass_g / M;
    const faradays = Q_coulombs / F;

    msResEl.textContent = 'Mass Yield m = ' + mass_g.toFixed(2) + ' g Plated Metal';
    chResEl.textContent = 'Total Charge Q = ' + Math.round(Q_coulombs).toLocaleString() + ' C (' + faradays.toFixed(4) + ' Faradays | ' + molesDeposited.toFixed(4) + ' mol Deposited @ I = ' + I + ' A)';
  }

  [iEl, tEl].forEach(el => el.addEventListener('input', update));
  mEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter electroplating DC electrical current I in Amperes (A).',
      'Enter electrodeposition process duration t in minutes.',
      'Select electroplating metal ion species (Copper, Silver, Gold, Nickel, Zinc).',
      'Inspect deposited metallic mass yield in grams and total Coulombs of charge passed.'
    ],
    benefitTitle: 'Michael Faraday 1834 Laws of Electrolysis',
    benefitContent: 'Faraday\'s First and Second Laws prove that mass of substance deposited at an electrode is directly proportional to the total electrical charge passed ($m \propto Q$) and its chemical equivalent weight ($M / z$), enabling precise industrial anodizing and copper refining.',
    faqs: [{ q: 'What is the Faraday constant (96,485 C/mol)?', a: 'The Faraday constant ($F = e \cdot N_A$) represents the total electric charge carried by exactly one mole of electrons.' }]
  },

  // 10. Bragg's Law X-Ray Diffraction (XRD) Crystal Plane d-Spacing Calculator
  {
    slug: 'bragg-law-xray-diffraction-crystal-plane-spacing-calculator',
    name: 'Bragg\'s Law X-Ray Diffraction (n·λ = 2·d·sin θ) Crystal d-Spacing Calculator',
    description: 'Calculate crystalline lattice interplanar d-spacing (d = n·λ / (2·sin θ)) in Angstroms (Å) and nanometers (nm) from X-ray diffraction peak angle (2θ) and X-ray wavelength λ (Cu K-alpha 1.5406 Å) for crystallography.',
    category: 'Science',
    icon: 'text',
    keywords: ['braggs law calculator', 'xray diffraction xrd d spacing formula n lambda equals 2d sin theta online', 'crystal lattice interplanar spacing calculator angstroms', 'cu k alpha xrd peak 2 theta solver', 'materials science crystallography bragg diffraction online'],
    order: 1016,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Diffraction Peak 2θ (°), X-Ray Wavelength λ (Å, Cu K-α = 1.5406 Å) & Diffraction Order n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bg-two-theta">Diffraction Peak 2θ (°)</label>
          <input class="tool-textarea" id="bg-two-theta" type="number" step="0.5" value="38.50" placeholder="38.50° (2-Theta)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-lam">Wavelength λ (Å)</label>
          <input class="tool-textarea" id="bg-lam" type="number" step="0.01" value="1.5406" placeholder="1.5406 Å (Cu K-α)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-n">Order n</label>
          <input class="tool-textarea" id="bg-n" type="number" step="1" min="1" value="1" placeholder="1 (1st Order)" />
        </div>
      </div>
      <div id="bg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bg-res-d" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">d-Spacing = 2.336 Å (0.2336 nm)</span>
            <span class="stat-label">Crystal Lattice Interplanar Spacing (d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-theta" style="color:var(--green-dark); font-weight:700;">Bragg Angle θ = 19.25° | sin(θ) = 0.3297 (Constructive Interference Condition)</span>
            <span class="stat-label">Bragg Glancing Angle & Interference Condition</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ttEl = document.getElementById('bg-two-theta'), lamEl = document.getElementById('bg-lam'), nEl = document.getElementById('bg-n');
  const dResEl = document.getElementById('bg-res-d'), thResEl = document.getElementById('bg-res-theta');

  function update() {
    const two_theta = parseFloat(ttEl.value), lambda_ang = parseFloat(lamEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(two_theta) || isNaN(lambda_ang) || isNaN(n) || two_theta <= 0 || two_theta >= 180 || lambda_ang <= 0 || n < 1) return;

    // Bragg angle theta = 2theta / 2
    const theta_deg = two_theta / 2.0;
    const theta_rad = (theta_deg * Math.PI) / 180.0;

    const sin_theta = Math.sin(theta_rad);
    if (sin_theta <= 0) return;

    // Bragg's Law: n * lambda = 2 * d * sin(theta) => d = (n * lambda) / (2 * sin(theta))
    const d_ang = (n * lambda_ang) / (2.0 * sin_theta);
    const d_nm = d_ang / 10.0;

    dResEl.textContent = 'd-Spacing = ' + d_ang.toFixed(3) + ' Å (' + d_nm.toFixed(4) + ' nm)';
    thResEl.textContent = 'Bragg Angle θ = ' + theta_deg.toFixed(2) + '° | sin(θ) = ' + sin_theta.toFixed(4) + ' (2θ = ' + two_theta + '° @ λ = ' + lambda_ang + ' Å)';
  }

  [ttEl, lamEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter experimental X-ray diffractometer peak position $2\theta$ in degrees.',
      'Enter X-ray tube source wavelength $\lambda$ in Angstroms ($\text{\AA}$, standard $1.5406\text{ \AA}$ for Copper $K_\alpha$).',
      'Enter integer diffraction reflection order n (typically 1).',
      'Inspect atomic interplanar d-spacing distance in Angstroms and nanometers.'
    ],
    benefitTitle: 'William Henry Bragg & William Lawrence Bragg 1915 Nobel Physics Law',
    benefitContent: 'Bragg\'s Law ($n\lambda = 2d\sin\theta$) proves that constructive interference of scattered X-rays occurs when the extra path length traveled by waves equals an integer number of wavelengths, enabling atomic crystal structure determination in materials science and structural biology.',
    faqs: [{ q: 'Why is the instrument angle reported as 2θ rather than θ?', a: 'XRD instruments measure the angle between the transmitted incident beam and the diffracted beam, which equals $2\theta$.' }]
  },

  // 11. Miller Indices Cubic Lattice Interplanar Spacing (d_hkl) Calculator
  {
    slug: 'miller-indices-cubic-crystal-lattice-interplanar-d-spacing-calculator',
    name: 'Miller Indices (hkl) Cubic Crystal Lattice Interplanar Spacing (d_hkl = a / √(h² + k² + l²)) Calculator',
    description: 'Calculate cubic crystal system (SC, BCC, FCC) interplanar d-spacing (d_hkl = a / √(h² + k² + l²)) and determine allowed diffraction reflections from Miller indices (h, k, l) and lattice parameter a for materials science.',
    category: 'Science',
    icon: 'text',
    keywords: ['miller indices calculator', 'cubic crystal d spacing formula d hkl equals a over sqrt h2 k2 l2 online', 'fcc bcc sc allowed reflections miller indices calculator', 'lattice parameter a interplanar spacing calculator', 'crystallography solid state physics online'],
    order: 1017,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Lattice Parameter a (Å), Miller Indices (h, k, l) & Crystal System (FCC, BCC, Simple Cubic)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ml-a">Lattice a (Å)</label>
          <input class="tool-textarea" id="ml-a" type="number" step="0.1" value="4.086" placeholder="4.086 Å (Gold FCC)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ml-h">h</label>
          <input class="tool-textarea" id="ml-h" type="number" step="1" min="0" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ml-k">k</label>
          <input class="tool-textarea" id="ml-k" type="number" step="1" min="0" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ml-l">l</label>
          <input class="tool-textarea" id="ml-l" type="number" step="1" min="0" value="1" placeholder="1" />
        </div>
      </div>
      <div id="ml-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ml-res-dhkl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">d₁₁₁ = 2.359 Å</span>
            <span class="stat-label">Cubic Interplanar Spacing (d_hkl)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ml-res-rules" style="color:var(--green-dark); font-weight:700;">FCC Allowed (All Odd: h=1, k=1, l=1) | BCC Forbidden (h+k+l = 3 is odd)</span>
            <span class="stat-label">Crystallographic Extinction Selection Rules</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('ml-a'), hEl = document.getElementById('ml-h'), kEl = document.getElementById('ml-k'), lEl = document.getElementById('ml-l');
  const dResEl = document.getElementById('ml-res-dhkl'), rlResEl = document.getElementById('ml-res-rules');

  function update() {
    const a = parseFloat(aEl.value), h = parseInt(hEl.value, 10), k = parseInt(kEl.value, 10), l = parseInt(lEl.value, 10);
    if (isNaN(a) || isNaN(h) || isNaN(k) || isNaN(l) || a <= 0 || (h===0 && k===0 && l===0)) return;

    // d_hkl = a / sqrt( h^2 + k^2 + l^2 )
    const sumSq = Math.pow(h, 2) + Math.pow(k, 2) + Math.pow(l, 2);
    const d_hkl = a / Math.sqrt(sumSq);

    // Selection rules:
    // SC: All allowed
    // BCC: h + k + l must be even
    const sumIndices = h + k + l;
    const bccAllowed = (sumIndices % 2 === 0);

    // FCC: h, k, l must be unmixed (all even or all odd)
    const isHEven = (h % 2 === 0), isKEven = (k % 2 === 0), isLEven = (l % 2 === 0);
    const allEven = isHEven && isKEven && isLEven;
    const allOdd = !isHEven && !isKEven && !isLEven;
    const fccAllowed = allEven || allOdd;

    dResEl.textContent = 'd(' + h + k + l + ') = ' + d_hkl.toFixed(3) + ' Å (' + (d_hkl / 10).toFixed(4) + ' nm)';
    rlResEl.textContent = 'FCC: ' + (fccAllowed ? 'ALLOWED' : 'FORBIDDEN (Mixed parity)') + ' | BCC: ' + (bccAllowed ? 'ALLOWED' : 'FORBIDDEN (Sum is odd)') + ' | SC: ALLOWED (h²+k²+l² = ' + sumSq + ')';
  }

  [aEl, hEl, kEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cubic unit cell lattice parameter a in Angstroms ($\text{\AA}$).',
      'Enter Miller plane indices h, k, and l.',
      'Inspect interplanar d-spacing ($d_{hkl} = a / \sqrt{h^2 + k^2 + l^2}$) and verify systematic extinction diffraction selection rules (SC, BCC, FCC).'
    ],
    benefitTitle: 'William Hallowes Miller 1839 Crystallographic Notation',
    benefitContent: 'Miller indices $(hkl)$ uniquely define parallel planes of atoms in 3D lattices; identifying allowed XRD reflections reveals whether a metal crystallizes in Body-Centered Cubic (BCC) or Face-Centered Cubic (FCC) symmetry.',
    faqs: [{ q: 'Why is the (100) reflection forbidden in Face-Centered Cubic (FCC) crystals?', a: 'In FCC lattices, destructive interference from atoms on face centers cancels out the (100) diffracted wave, requiring all indices to be unmixed (all even or all odd).' }]
  },

  // 12. Fick's First Law Molecular Diffusion & Mass Transfer Flux Calculator
  {
    slug: 'fick-first-law-molecular-diffusion-mass-transfer-flux-calculator',
    name: 'Fick\'s First Law Molecular Diffusion (J = -D·(dC/dx)) Mass Flux Calculator',
    description: 'Calculate steady-state molecular mass diffusion flux (J = -D · (ΔC / Δx)) in mol/(m²·s) and g/(m²·s) from diffusion coefficient D and chemical concentration gradient for chemical engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['ficks first law calculator', 'molecular diffusion flux formula j equals minus d dc over dx online', 'diffusion coefficient concentration gradient mass transfer calculator', 'ficks law steady state diffusion calculator', 'chemical engineering transport phenomena online'],
    order: 1018,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Diffusion Coefficient D (m²/s, e.g. 1.0e-9 for liquid), Concentration Drop ΔC (mol/m³) & Diffusion Thickness Δx (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fk-d">Diffusivity D (m²/s)</label>
          <input class="tool-textarea" id="fk-d" type="number" step="1e-10" value="1.5e-9" placeholder="1.5e-9 (Water Solute)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-dc">Drop ΔC (mol/m³)</label>
          <input class="tool-textarea" id="fk-dc" type="number" step="50" value="500.0" placeholder="500.0 mol/m³ (0.5 M)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-dx">Thickness Δx (mm)</label>
          <input class="tool-textarea" id="fk-dx" type="number" step="0.5" value="2.0" placeholder="2.0 mm Membrane" />
        </div>
      </div>
      <div id="fk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fk-res-j" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Flux J = 3.75 × 10⁻⁴ mol / (m²·s)</span>
            <span class="stat-label">Steady-State Molecular Mass Diffusion Flux</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fk-res-grad" style="color:var(--green-dark); font-weight:700;">Concentration Gradient dC/dx = 250,000 mol/m⁴ (Across 2.0 mm Barrier)</span>
            <span class="stat-label">Spatial Concentration Driving Force Gradient</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('fk-d'), dcEl = document.getElementById('fk-dc'), dxEl = document.getElementById('fk-dx');
  const jResEl = document.getElementById('fk-res-j'), grResEl = document.getElementById('fk-res-grad');

  function update() {
    const D = parseFloat(dEl.value), dC = parseFloat(dcEl.value), dx_mm = parseFloat(dxEl.value);
    if (isNaN(D) || isNaN(dC) || isNaN(dx_mm) || D <= 0 || dC <= 0 || dx_mm <= 0) return;

    const dx_m = dx_mm / 1000.0;
    // Concentration gradient = dC / dx  [mol / m^4]
    const grad = dC / dx_m;

    // Fick's First Law: J = D * (dC / dx)  [mol / (m^2 * s)]
    const J = D * grad;

    jResEl.textContent = 'Flux J = ' + J.toExponential(2) + ' mol / (m²·s)';
    grResEl.textContent = 'Concentration Gradient = ' + Math.round(grad).toLocaleString() + ' mol/m⁴ (Diffusivity D = ' + D.toExponential(2) + ' m²/s @ Δx = ' + dx_mm + ' mm)';
  }

  [dEl, dcEl, dxEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mass diffusion coefficient D in $\text{m}^2/\text{s}$ (e.g. $10^{-5}\text{ m}^2/\text{s}$ in gases, $10^{-9}\text{ m}^2/\text{s}$ in liquids, $10^{-14}\text{ m}^2/\text{s}$ in solids).',
      'Enter concentration difference $\Delta C$ across boundary in $\text{mol/m}^3$.',
      'Enter diffusion barrier thickness $\Delta x$ in millimeters.',
      'Inspect molecular mass diffusion flux J in $\text{mol}/(\text{m}^2\cdot\text{s})$.'
    ],
    benefitTitle: 'Adolf Fick 1855 Mass Transport Differential Law',
    benefitContent: 'Fick\'s First Law ($J = -D \nabla C$) establishes that mass flows down chemical potential gradients in direct analogy to Fourier\'s law of heat conduction and Ohm\'s law of electrical current.',
    faqs: [{ q: 'What is the physical meaning of the negative sign in Fick\'s Law?', a: 'The negative sign indicates that chemical species naturally diffuse spontaneously from regions of high concentration to regions of low concentration.' }]
  },

  // 13. Debye-Huckel Limiting Law Ionic Strength & Activity Coefficient Calculator
  {
    slug: 'debye-huckel-limiting-law-ionic-strength-activity-coefficient-calculator',
    name: 'Debye-Hückel Limiting Law Ionic Strength (I) & Mean Activity Coefficient (γ_±) Calculator',
    description: 'Calculate aqueous electrolyte solution Ionic Strength (I = ½·Σ c_i·z_i²) and mean ionic activity coefficient (log₁₀ γ_± = -A·|z₊·z₋|·√I) for physical chemistry and analytical solution thermodynamics.',
    category: 'Science',
    icon: 'text',
    keywords: ['debye huckel limiting law calculator', 'ionic strength formula i equals half sum c z squared online', 'mean ionic activity coefficient gamma plus minus calculator', 'electrolyte non ideality debye huckel calculator', 'physical chemistry electrolyte solution thermodynamics online'],
    order: 1019,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electrolyte Type (1:1 NaCl, 2:1 CaCl₂, 2:2 MgSO₄, 3:1 AlCl₃) & Molar Concentration C (mol/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dh-type">Electrolyte</label>
          <select class="tool-textarea" id="dh-type">
            <option value="1_1_1" selected>1:1 Salt (e.g. NaCl, KNO₃: |z₊·z₋| = 1, I = C)</option>
            <option value="2_1_2">2:1 Salt (e.g. CaCl₂, Na₂SO₄: |z₊·z₋| = 2, I = 3C)</option>
            <option value="4_2_2">2:2 Salt (e.g. MgSO₄, CuSO₄: |z₊·z₋| = 4, I = 4C)</option>
            <option value="3_1_3">3:1 Salt (e.g. AlCl₃, FeCl₃: |z₊·z₋| = 3, I = 6C)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-conc">Concentration C (mol/L)</label>
          <input class="tool-textarea" id="dh-conc" type="number" step="0.005" min="0.0001" max="0.1" value="0.010" placeholder="0.010 M (10 mM)" />
        </div>
      </div>
      <div id="dh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dh-res-gamma" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Activity γ_± = 0.889 (Non-Ideal)</span>
            <span class="stat-label">Mean Ionic Activity Coefficient (γ_±)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dh-res-istr" style="color:var(--green-dark); font-weight:700;">Ionic Strength I = 0.010 M | Effective Activity a = 0.0089 M (Coulombic screening drops activity by 11.1%)</span>
            <span class="stat-label">Solution Ionic Strength & True Chemical Activity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('dh-type'), cEl = document.getElementById('dh-conc');
  const gmResEl = document.getElementById('dh-res-gamma'), isResEl = document.getElementById('dh-res-istr');

  const A = 0.509; // Debye-Huckel constant for water at 25°C

  function update() {
    const parts = tEl.value.split('_');
    const z_prod = parseFloat(parts[0]);
    const z_plus = parseFloat(parts[1]);
    const z_minus = parseFloat(parts[2]);

    const C = parseFloat(cEl.value);
    if (isNaN(C) || C <= 0) return;

    // Ionic strength calculation:
    // For 1:1 -> I = C
    // For 2:1 (e.g. CaCl2: Ca2+ + 2Cl-) -> I = 0.5 * (C * 4 + 2C * 1) = 3C
    // For 2:2 (e.g. MgSO4) -> I = 0.5 * (C * 4 + C * 4) = 4C
    // For 3:1 (e.g. AlCl3) -> I = 0.5 * (C * 9 + 3C * 1) = 6C
    let I = C;
    if (z_prod === 2) I = 3.0 * C;
    else if (z_prod === 4) I = 4.0 * C;
    else if (z_prod === 3) I = 6.0 * C;

    // Debye-Huckel Limiting Law: log10(gamma_pm) = -A * |z+ * z-| * sqrt(I)
    const log_gamma = -A * z_prod * Math.sqrt(I);
    const gamma_pm = Math.pow(10.0, log_gamma);

    const effectiveActivity = C * gamma_pm;

    gmResEl.textContent = 'Activity γ_± = ' + gamma_pm.toFixed(3);
    isResEl.textContent = 'Ionic Strength I = ' + I.toFixed(4) + ' M | True Activity a = ' + effectiveActivity.toFixed(4) + ' M (Debye A = ' + A + ' @ C = ' + C + ' M)';
  }

  tEl.addEventListener('change', update);
  cEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select electrolyte stoichiometry salt type (1:1 NaCl, 2:1 CaCl₂, 2:2 MgSO₄, 3:1 AlCl₃).',
      'Enter solution molar concentration C in mol/L ($C \le 0.1\text{ M}$ for Debye-Hückel limiting validity).',
      'Inspect ionic strength I, mean ionic activity coefficient $\gamma_\pm$, and true thermodynamic chemical activity $a = \gamma \cdot C$.'
    ],
    benefitTitle: 'Peter Debye & Erich Hückel 1923 Electrolyte Solution Theory',
    benefitContent: 'Electrostatic Coulombic attractions create an ionic atmosphere of opposite charges around each ion, screening its chemical potential and reducing effective chemical activity below analytical molar concentration.',
    faqs: [{ q: 'Why is the Debye-Huckel limiting law only valid for dilute solutions (I < 0.1 M)?', a: 'At higher concentrations, finite ion sizes and short-range non-Coulombic van der Waals interactions require extended Debye-Hückel or Pitzer virial equations.' }]
  },

  // 14. Langmuir & Freundlich Adsorption Isotherm Surface Coverage Calculator
  {
    slug: 'langmuir-freundlich-adsorption-isotherm-surface-coverage-calculator',
    name: 'Langmuir & Freundlich Adsorption Isotherm (θ = K·P / (1 + K·P)) Surface Coverage Calculator',
    description: 'Calculate gas/solid and liquid/carbon surface adsorption fractional monolayer coverage (θ = K·P / (1 + K·P)) and adsorbed capacity q_e under Langmuir and Freundlich models for environmental water purification.',
    category: 'Science',
    icon: 'text',
    keywords: ['langmuir adsorption isotherm calculator', 'freundlich isotherm formula surface coverage theta online', 'activated carbon adsorption capacity qe calculator', 'monolayer adsorption equilibrium constant k calculator', 'chemical engineering surface chemistry online'],
    order: 1020,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Adsorption Equilibrium Constant K (atm⁻¹ or L/mg) & Equilibrium Pressure/Concentration P',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lg-k">Constant K</label>
          <input class="tool-textarea" id="lg-k" type="number" step="0.5" value="2.5" placeholder="2.5 atm⁻¹ (Affinity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-p">Pressure / Conc P</label>
          <input class="tool-textarea" id="lg-p" type="number" step="0.2" value="1.0" placeholder="1.0 atm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lg-qmax">Max Capacity q_max</label>
          <input class="tool-textarea" id="lg-qmax" type="number" step="10" value="150" placeholder="150 mg/g Carbon" />
        </div>
      </div>
      <div id="lg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lg-res-theta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Coverage θ = 0.714 (71.4% Monolayer)</span>
            <span class="stat-label">Fractional Surface Monolayer Coverage (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lg-res-qe" style="color:var(--green-dark); font-weight:700;">Adsorbed Capacity q_e = 107.14 mg / g | Langmuir Linearity: 1/q_e = (1/(K·q_max))·(1/C) + 1/q_max</span>
            <span class="stat-label">Adsorbed Mass Equilibrium Capacity (q_e = θ · q_max)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('lg-k'), pEl = document.getElementById('lg-p'), qmEl = document.getElementById('lg-qmax');
  const thResEl = document.getElementById('lg-res-theta'), qeResEl = document.getElementById('lg-res-qe');

  function update() {
    const K = parseFloat(kEl.value), P = parseFloat(pEl.value), q_max = parseFloat(qmEl.value);
    if (isNaN(K) || isNaN(P) || isNaN(q_max) || K <= 0 || P < 0 || q_max <= 0) return;

    // Langmuir isotherm: theta = ( K * P ) / ( 1 + K * P )
    const theta = (K * P) / (1.0 + (K * P));
    const theta_pct = theta * 100.0;

    // Adsorbed capacity q_e = theta * q_max
    const q_e = theta * q_max;

    thResEl.textContent = 'Coverage θ = ' + theta.toFixed(3) + ' (' + theta_pct.toFixed(1) + '% Monolayer)';
    qeResEl.textContent = 'Adsorbed q_e = ' + q_e.toFixed(2) + ' mg/g (' + (q_max - q_e).toFixed(2) + ' mg/g Free Sites remaining @ K = ' + K + ')';
  }

  [kEl, pEl, qmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Langmuir adsorption equilibrium constant K (affinity parameter).',
      'Enter gas partial pressure P in atm or liquid solute concentration C in mg/L.',
      'Enter maximum theoretical monolayer saturation capacity $q_{\max}$ in mg/g.',
      'Inspect fractional surface coverage $\theta = \frac{KP}{1 + KP}$ and adsorbed mass capacity $q_e$.'
    ],
    benefitTitle: 'Irving Langmuir 1918 Nobel Prize Surface Chemistry Model',
    benefitContent: 'The Langmuir isotherm assumes monolayer coverage on a homogeneous surface with zero adsorbate-adsorbate lateral interactions, providing the theoretical basis for catalytic converters and water purification activated carbon filters.',
    faqs: [{ q: 'What happens at high pressure in the Langmuir isotherm?', a: 'At high pressure ($KP \gg 1$), the surface coverage approaches $100\%$ ($\theta \rightarrow 1.0$), reaching saturation where adsorption rate equals desorption rate.' }]
  },

  // 15. Colligative Properties (Boiling Elevation, Freezing Depression & Osmotic Pressure) Calculator
  {
    slug: 'colligative-properties-boiling-elevation-freezing-depression-osmotic-calculator',
    name: 'Colligative Properties (Boiling Point Elevation, Freezing Point Depression & Osmotic Pressure) Calculator',
    description: 'Calculate solution colligative properties: Freezing Point Depression (ΔT_f = i·K_f·m), Boiling Point Elevation (ΔT_b = i·K_b·m), and Osmotic Pressure (Π = i·M·R·T) in atm from van \'t Hoff factor i and molality.',
    category: 'Science',
    icon: 'text',
    keywords: ['colligative properties calculator', 'freezing point depression boiling point elevation formula online', 'osmotic pressure pi equals i m r t calculator', 'van t hoff factor colligative calculator', 'chemistry solution colligative properties online'],
    order: 1021,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'van \'t Hoff Factor i (1 for sugar, 2 for NaCl, 3 for CaCl₂), Molality m (mol/kg) & Solute Molarity M (mol/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cp-i">Factor i</label>
          <input class="tool-textarea" id="cp-i" type="number" step="0.5" min="1" value="2.0" placeholder="2.0 (NaCl)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-m">Molality m</label>
          <input class="tool-textarea" id="cp-m" type="number" step="0.1" value="0.50" placeholder="0.50 mol/kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-temp">Temp (°C)</label>
          <input class="tool-textarea" id="cp-temp" type="number" step="5" value="25.0" placeholder="25.0 °C" />
        </div>
      </div>
      <div id="cp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cp-res-tf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Freezing Point = -1.86 °C (ΔT_f = 1.86°C)</span>
            <span class="stat-label">Aqueous Freezing Point Depression (K_f = 1.86 °C·kg/mol)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cp-res-tb" style="color:var(--green-dark); font-weight:700;">Boiling Point = 100.51 °C (+0.51°C Elevation) | Osmotic Pressure Π = 24.46 atm</span>
            <span class="stat-label">Boiling Elevation (K_b = 0.512) & Van 't Hoff Osmotic Pressure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('cp-i'), mEl = document.getElementById('cp-m'), tEl = document.getElementById('cp-temp');
  const tfResEl = document.getElementById('cp-res-tf'), tbResEl = document.getElementById('cp-res-tb');

  const K_f_water = 1.86; // °C * kg / mol
  const K_b_water = 0.512; // °C * kg / mol
  const R_gas = 0.082057; // L * atm / (mol * K)

  function update() {
    const i = parseFloat(iEl.value), m = parseFloat(mEl.value), temp_C = parseFloat(tEl.value);
    if (isNaN(i) || isNaN(m) || isNaN(temp_C) || i < 1 || m < 0) return;

    const T_K = temp_C + 273.15;

    // Freezing point depression: deltaT_f = i * K_f * m
    const deltaT_f = i * K_f_water * m;
    const new_Tf = 0.0 - deltaT_f;

    // Boiling point elevation: deltaT_b = i * K_b * m
    const deltaT_b = i * K_b_water * m;
    const new_Tb = 100.0 + deltaT_b;

    // Osmotic pressure: Pi = i * M * R * T (approximating M approx m for dilute water)
    const Pi_atm = i * m * R_gas * T_K;

    tfResEl.textContent = 'Freezing Point = ' + new_Tf.toFixed(2) + ' °C (ΔT_f = ' + deltaT_f.toFixed(2) + '°C)';
    tbResEl.textContent = 'Boiling Point = ' + new_Tb.toFixed(2) + ' °C (+ΔT_b = ' + deltaT_b.toFixed(2) + '°C) | Osmotic Pressure Π = ' + Pi_atm.toFixed(2) + ' atm (' + (Pi_atm * 101.325).toFixed(0) + ' kPa)';
  }

  [iEl, mEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter van \'t Hoff ionization dissociation factor i ($i=1$ for glucose, $i=2$ for $\text{NaCl}$, $i=3$ for $\text{CaCl}_2$).',
      'Enter solute molal concentration m in mol/kg.',
      'Enter solution temperature in $^\circ\text{C}$.',
      'Inspect depressed freezing point ($T_f$), elevated boiling point ($T_b$), and generated Osmotic Pressure ($\Pi$).'
    ],
    benefitTitle: 'Solute Number-Dependent Colligative Properties',
    benefitContent: 'Colligative properties depend solely on the number ratio of solute particles to solvent molecules rather than chemical identity, explaining why road salt ($\text{NaCl}$ and $\text{CaCl}_2$) depresses the freezing point of icy roadways.',
    faqs: [{ q: 'What is the van \'t Hoff factor i?', a: 'The van \'t Hoff factor represents the number of discrete ions produced per formula unit of solute when dissolved in solution.' }]
  },

  // 16. Polyprotic Acid Buffer Capacity & Henderson-Hasselbalch Resistance Calculator
  {
    slug: 'henderson-hasselbalch-polyprotic-buffer-capacity-calculator',
    name: 'Chemical Buffer Solution Capacity (Van Slyke β = 2.303·C·[H⁺]·K_a / ([H⁺] + K_a)²) Calculator',
    description: 'Calculate acid-base chemical buffer capacity index (β = 2.303 · C · [H⁺]·K_a / ([H⁺] + K_a)²) in mol/(L·pH) and evaluate maximum buffer capacity at pH = pK_a for chemistry laboratory preparation.',
    category: 'Science',
    icon: 'text',
    keywords: ['buffer capacity calculator', 'van slyke buffer capacity beta formula online', 'henderson hasselbalch buffer resistance calculator', 'acid base buffer capacity maximum at pka calculator', 'analytical chemistry buffer solution design online'],
    order: 1022,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Buffer Concentration C (mol/L), Acid pK_a & Operating pH',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bf-c">Total Buffer C (M)</label>
          <input class="tool-textarea" id="bf-c" type="number" step="0.05" value="0.10" placeholder="0.10 M" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-pka">Acid pK_a</label>
          <input class="tool-textarea" id="bf-pka" type="number" step="0.1" value="4.76" placeholder="4.76 (Acetic Acid)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bf-ph">Solution pH</label>
          <input class="tool-textarea" id="bf-ph" type="number" step="0.1" value="4.76" placeholder="4.76 (pH = pK_a)" />
        </div>
      </div>
      <div id="bf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bf-res-beta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">β = 0.0576 mol / (L · pH) (MAXIMUM)</span>
            <span class="stat-label">Van Slyke Buffer Capacity Index (β)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bf-res-ratio" style="color:var(--green-dark); font-weight:700;">Base/Acid Ratio [A⁻]/[HA] = 1.00 (50% Conjugate Base / 50% Weak Acid | Optimal Buffering)</span>
            <span class="stat-label">Henderson-Hasselbalch Ratio & Resistance Power</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('bf-c'), pkaEl = document.getElementById('bf-pka'), phEl = document.getElementById('bf-ph');
  const btResEl = document.getElementById('bf-res-beta'), rtResEl = document.getElementById('bf-res-ratio');

  function update() {
    const C = parseFloat(cEl.value), pKa = parseFloat(pkaEl.value), pH = parseFloat(phEl.value);
    if (isNaN(C) || isNaN(pKa) || isNaN(pH) || C <= 0 || pH < 0 || pH > 14) return;

    const H = Math.pow(10.0, -pH);
    const Ka = Math.pow(10.0, -pKa);

    // Van Slyke buffer capacity formula: beta = 2.303 * C * ( (Ka * H) / (Ka + H)^2 )
    const beta = 2.302585 * C * ((Ka * H) / Math.pow(Ka + H, 2));

    // Ratio [A-] / [HA] = 10^(pH - pKa)
    const ratio = Math.pow(10.0, pH - pKa);
    const fracBase = (ratio / (1.0 + ratio)) * 100.0;

    let efficiency = '';
    let color = '#22543d';

    if (Math.abs(pH - pKa) <= 0.2) {
      efficiency = 'PEAK MAXIMUM CAPACITY (pH ≈ pKa: 100% of maximum possible buffer strength)';
      color = '#22543d';
    } else if (Math.abs(pH - pKa) <= 1.0) {
      efficiency = 'ACTIVE BUFFER ZONE (Within pKa ± 1.0 pH unit range)';
      color = '#22543d';
    } else {
      efficiency = 'POOR BUFFERING (Outside pKa ± 1: Depleted buffer capacity!)';
      color = '#c53030';
    }

    btResEl.textContent = 'β = ' + beta.toFixed(4) + ' mol / (L · pH) (' + efficiency.split(' (')[0] + ')';
    btResEl.style.color = color;
    rtResEl.textContent = 'Base/Acid Ratio = ' + ratio.toFixed(2) + ' (' + fracBase.toFixed(1) + '% Base / ' + (100 - fracBase).toFixed(1) + '% Acid | C = ' + C + ' M)';
    rtResEl.style.color = color;
  }

  [cEl, pkaEl, phEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total molar buffer concentration C ($C = [HA] + [A^-]$) in mol/L.',
      'Enter weak acid logarithmic dissociation constant $pK_a$.',
      'Enter current solution pH.',
      'Inspect Van Slyke buffer capacity index $\beta$ (moles of strong acid/base required to shift 1 Liter of solution by 1 pH unit).'
    ],
    benefitTitle: 'Donald Van Slyke 1922 Quantitative Buffer Capacity Index',
    benefitContent: 'Buffer capacity reaches its absolute mathematical maximum when $\text{pH} = pK_a$ ($\beta_{\max} \approx 0.576 C$), demonstrating why effective biological buffers (like blood bicarbonate and intracellular phosphate) operate within $pK_a \pm 1.0$.',
    faqs: [{ q: 'What is the practical effective buffering range of an acid-base buffer?', a: 'A buffer is practically effective only within $\pm 1.0\text{ pH unit}$ of its $pK_a$ ($\text{pH} = pK_a \pm 1$).' }]
  },

  // 17. Combustion Stoichiometry & Air-Fuel Equivalence Ratio (Lambda λ) Calculator
  {
    slug: 'combustion-stoichiometry-air-fuel-ratio-equivalence-ratio-calculator',
    name: 'Combustion Stoichiometry Air-Fuel Ratio (AFR) & Lambda Equivalence Ratio (λ) Calculator',
    description: 'Calculate stoichiometric Air-Fuel Ratio (AFR_stoich = (137.28·(n + m/4)) / (12.011·n + 1.008·m)) for hydrocarbons (C_n H_m), actual AFR, and combustion Lambda Equivalence Ratio (λ = AFR_actual / AFR_stoich).',
    category: 'Science',
    icon: 'text',
    keywords: ['air fuel ratio calculator', 'lambda equivalence ratio combustion stoichiometry formula online', 'stoichiometric afr gasoline diesel methane calculator', 'lean rich fuel air combustion lambda calculator', 'internal combustion engine stoichiometry online'],
    order: 1023,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fuel Type (Gasoline C₈H₁₈, Methane CH₄, Diesel C₁₂H₂₃, Ethanol C₂H₅OH) & Actual Mass AFR',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cb-fuel">Fuel</label>
          <select class="tool-textarea" id="cb-fuel">
            <option value="14.7_gasoline" selected>Gasoline / Octane C₈H₁₈ (Stoich AFR = 14.7 : 1)</option>
            <option value="17.2_methane">Methane / Natural Gas CH₄ (Stoich AFR = 17.2 : 1)</option>
            <option value="14.5_diesel">Diesel Fuel C₁₂H₂₃ (Stoich AFR = 14.5 : 1)</option>
            <option value="9.0_ethanol">Ethanol C₂H₅OH (Stoich AFR = 9.0 : 1)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="cb-afr">Actual AFR (Air : Fuel)</label>
          <input class="tool-textarea" id="cb-afr" type="number" step="0.5" value="14.7" placeholder="14.7" />
        </div>
      </div>
      <div id="cb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cb-res-lam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Lambda λ = 1.000 (STOICHIOMETRIC)</span>
            <span class="stat-label">Combustion Equivalence Ratio (λ = AFR / AFR_stoich)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cb-res-mix" style="color:var(--green-dark); font-weight:700;">PERFECT STOICHIOMETRY: Optimal for 3-Way Catalytic Converter (Complete CO₂ + H₂O combustion)</span>
            <span class="stat-label">Air-Fuel Mixture State & Emissions Profile</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('cb-fuel'), afrEl = document.getElementById('cb-afr');
  const lamResEl = document.getElementById('cb-res-lam'), mixResEl = document.getElementById('cb-res-mix');

  function update() {
    const parts = fEl.value.split('_');
    const stoichAFR = parseFloat(parts[0]);
    const fuelName = parts[1];

    const actualAFR = parseFloat(afrEl.value);
    if (isNaN(actualAFR) || isNaN(stoichAFR) || actualAFR <= 0) return;

    // Lambda = actualAFR / stoichAFR
    const lambda = actualAFR / stoichAFR;
    // Equivalence ratio phi = 1 / lambda
    const phi = 1.0 / lambda;

    let state = '', color = '#22543d';

    if (Math.abs(lambda - 1.0) < 0.02) {
      state = 'STOICHIOMETRIC (λ = 1.00: Ideal for catalytic converter conversion efficiency)';
      color = '#22543d';
    } else if (lambda > 1.0) {
      state = 'LEAN MIXTURE (λ = ' + lambda.toFixed(3) + ' > 1.0: Excess air / oxygen, lower CO but higher NOx)';
      color = '#2563eb';
    } else {
      state = 'RICH MIXTURE (λ = ' + lambda.toFixed(3) + ' < 1.0: Excess fuel, maximum power but high unburned hydrocarbons / CO)';
      color = '#c53030';
    }

    lamResEl.textContent = 'Lambda λ = ' + lambda.toFixed(3) + ' (' + state.split(' (')[0] + ')';
    lamResEl.style.color = color;
    mixResEl.textContent = state + ' | Equivalence Ratio φ = ' + phi.toFixed(3) + ' (Stoichiometric AFR = ' + stoichAFR + ':1)';
    mixResEl.style.color = color;
  }

  fEl.addEventListener('change', update);
  afrEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select hydrocarbon fuel type (Gasoline, Methane, Diesel, Ethanol).',
      'Enter actual engine operating mass Air-to-Fuel Ratio (AFR).',
      'Inspect combustion Lambda ($\lambda = \text{AFR} / \text{AFR}_{\text{stoich}}$) and fuel-air equivalence ratio $\phi = 1/\lambda$.'
    ],
    benefitTitle: 'Internal Combustion Chemical Stoichiometry',
    benefitContent: 'Automotive oxygen sensors monitor exhaust Lambda to maintain $\lambda = 1.000 \pm 0.005$, where 3-way catalytic converters simultaneously achieve $>99\%$ simultaneous conversion efficiency for CO, unburned hydrocarbons (HC), and Nitrogen Oxides (NOx).',
    faqs: [{ q: 'What is a Lean vs Rich engine mixture?', a: 'A Lean mixture ($\lambda > 1.0$) has excess air; a Rich mixture ($\lambda < 1.0$) has excess fuel providing maximum acceleration power.' }]
  },

  // 18. Stefan-Boltzmann Blackbody Radiation & Surface Heat Emission Calculator
  {
    slug: 'stefan-boltzmann-blackbody-radiation-emissivity-calculator',
    name: 'Stefan-Boltzmann Blackbody Thermal Radiation (P = ε·σ·A·(T⁴ - T_surr⁴)) Calculator',
    description: 'Calculate thermal radiative heat transfer power (P = ε · σ · A · (T⁴ - T_surr⁴)) in Watts and kW using the Stefan-Boltzmann law from surface temperature, emissivity ε, and ambient surroundings.',
    category: 'Science',
    icon: 'text',
    keywords: ['stefan boltzmann calculator', 'thermal radiation formula p equals epsilon sigma a t to fourth online', 'blackbody radiation emissive power calculator', 'radiative heat transfer surface area temperature calculator', 'thermal engineering radiation solver online'],
    order: 1024,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Surface Emissivity ε (0 to 1.0), Surface Area A (m²), Hot Temp T (K) & Surroundings T_surr (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sb-eps">Emissivity (ε)</label>
          <input class="tool-textarea" id="sb-eps" type="number" step="0.05" min="0.01" max="1" value="0.90" placeholder="0.90 (Matte Surface)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-area">Area A (m²)</label>
          <input class="tool-textarea" id="sb-area" type="number" step="0.5" value="2.0" placeholder="2.0 m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-thot">Surface Temp T (K)</label>
          <input class="tool-textarea" id="sb-thot" type="number" step="50" value="673.15" placeholder="673.15 K (400°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sb-tsurr">Surroundings (K)</label>
          <input class="tool-textarea" id="sb-tsurr" type="number" step="10" value="298.15" placeholder="298.15 K (25°C)" />
        </div>
      </div>
      <div id="sb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sb-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Radiative Power P = 20.14 kW</span>
            <span class="stat-label">Net Thermal Radiative Heat Emission Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sb-res-flux" style="color:var(--green-dark); font-weight:700;">Emissive Flux q\" = 10.07 kW/m² | T⁴ scaling: Doubling absolute temperature boosts radiation by 16×</span>
            <span class="stat-label">Radiative Heat Flux & 4th Power Absolute Temperature Scaling</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const epsEl = document.getElementById('sb-eps'), aEl = document.getElementById('sb-area');
  const thEl = document.getElementById('sb-thot'), tsEl = document.getElementById('sb-tsurr');
  const pwResEl = document.getElementById('sb-res-pwr'), flResEl = document.getElementById('sb-res-flux');

  const sigma = 5.670374419e-8; // W / (m^2 * K^4)

  function update() {
    const eps = parseFloat(epsEl.value), Area = parseFloat(aEl.value);
    const T_hot = parseFloat(thEl.value), T_surr = parseFloat(tsEl.value);

    if (isNaN(eps) || isNaN(Area) || isNaN(T_hot) || isNaN(T_surr) || eps <= 0 || Area <= 0 || T_hot <= 0 || T_surr < 0) return;

    // Stefan-Boltzmann net radiation: P = eps * sigma * Area * ( T_hot^4 - T_surr^4 )  [Watts]
    const P_watts = eps * sigma * Area * (Math.pow(T_hot, 4) - Math.pow(T_surr, 4));
    const P_kW = P_watts / 1000.0;
    const flux_kW_m2 = P_kW / Area;

    pwResEl.textContent = 'Radiative Power P = ' + (P_kW >= 1 ? P_kW.toFixed(2) + ' kW' : P_watts.toFixed(1) + ' W');
    flResEl.textContent = 'Emissive Flux q" = ' + flux_kW_m2.toFixed(2) + ' kW/m² (T_hot: ' + T_hot + ' K / T_surr: ' + T_surr + ' K @ ε = ' + eps + ')';
  }

  [epsEl, aEl, thEl, tsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter surface emissivity $\epsilon$ ($0 < \epsilon \le 1.0$, where $\epsilon = 1.0$ represents an ideal blackbody).',
      'Enter radiating surface area A in $\text{m}^2$.',
      'Enter hot object absolute surface temperature T in Kelvin.',
      'Enter cooler ambient surrounding wall temperature $T_{\text{surr}}$ in Kelvin.',
      'Inspect net radiated thermal power output in kW and heat flux in $\text{kW/m}^2$.'
    ],
    benefitTitle: 'Josef Stefan 1879 & Ludwig Boltzmann 1884 Radiation Law',
    benefitContent: 'Because thermal radiative emission scales with the fourth power of absolute temperature ($P \propto T^4$), radiation dominates all other modes of heat transfer (convection and conduction) at high temperatures in industrial furnaces, space satellites, and stellar astrophysics.',
    faqs: [{ q: 'What is an ideal blackbody?', a: 'A blackbody is an idealized physical object that absorbs all incident electromagnetic radiation and emits the theoretical maximum possible thermal radiation at any given temperature ($\epsilon = 1.0$).' }]
  },

  // 19. Fourier's Law of Heat Conduction in Cylindrical Pipe Insulation Calculator
  {
    slug: 'fourier-heat-conduction-cylindrical-pipe-insulation-loss-calculator',
    name: 'Cylindrical Pipe Radial Heat Conduction (q = 2π·k·L·(T₁ - T₂) / ln(r₂/r₁)) Calculator',
    description: 'Calculate radial conductive heat loss rate (q = 2π·k·L·(T₁ - T₂) / ln(r₂/r₁)) in Watts and critical insulation thickness radius (r_cr = k / h) for steam pipes and industrial thermal engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['fourier heat conduction pipe calculator', 'radial heat transfer cylinder formula 2 pi k l delta t over ln r2 over r1 online', 'critical radius of insulation pipe heat loss calculator', 'steam pipe thermal insulation heat loss calculator', 'mechanical engineering heat conduction online'],
    order: 1025,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inner Radius r₁ (mm), Outer Insulated Radius r₂ (mm), Pipe Length L (m), Conductivity k & Temp Drop ΔT',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cd-r1">Inner r₁ (mm)</label>
          <input class="tool-textarea" id="cd-r1" type="number" step="5" value="25.0" placeholder="25.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-r2">Outer r₂ (mm)</label>
          <input class="tool-textarea" id="cd-r2" type="number" step="5" value="50.0" placeholder="50.0 mm (Insulated)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-len">Length L (m)</label>
          <input class="tool-textarea" id="cd-len" type="number" step="5" value="10.0" placeholder="10.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-k">Conductivity k</label>
          <input class="tool-textarea" id="cd-k" type="number" step="0.01" value="0.04" placeholder="0.04 W/(m·K) (Fiberglass)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cd-dt">Temp Drop ΔT (°C)</label>
          <input class="tool-textarea" id="cd-dt" type="number" step="10" value="120.0" placeholder="120.0 °C (150°C - 30°C)" />
        </div>
      </div>
      <div id="cd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cd-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Heat Loss q = 435.1 Watts</span>
            <span class="stat-label">Radial Conductive Heat Loss Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cd-res-rate" style="color:var(--green-dark); font-weight:700;">Heat Loss per Meter = 43.5 W / m (92.5% Energy Savings compared to bare uninsulated pipe)</span>
            <span class="stat-label">Linear Thermal Heat Loss & Insulation Efficiency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const r1El = document.getElementById('cd-r1'), r2El = document.getElementById('cd-r2');
  const lEl = document.getElementById('cd-len'), kEl = document.getElementById('cd-k'), dtEl = document.getElementById('cd-dt');
  const qResEl = document.getElementById('cd-res-q'), rtResEl = document.getElementById('cd-res-rate');

  function update() {
    const r1_mm = parseFloat(r1El.value), r2_mm = parseFloat(r2El.value);
    const L = parseFloat(lEl.value), k = parseFloat(kEl.value), dT = parseFloat(dtEl.value);

    if (isNaN(r1_mm) || isNaN(r2_mm) || isNaN(L) || isNaN(k) || isNaN(dT) || r1_mm <= 0 || r2_mm <= r1_mm || L <= 0 || k <= 0 || dT <= 0) return;

    // Fourier radial heat conduction: q = ( 2 * pi * k * L * dT ) / ln( r2 / r1 )
    const q_watts = (2.0 * Math.PI * k * L * dT) / Math.log(r2_mm / r1_mm);
    const q_per_meter = q_watts / L;

    qResEl.textContent = 'Heat Loss q = ' + (q_watts >= 1000 ? (q_watts/1000).toFixed(2) + ' kW' : q_watts.toFixed(1) + ' Watts');
    rtResEl.textContent = 'Heat Loss per Meter = ' + q_per_meter.toFixed(1) + ' W / m (r₂/r₁ = ' + (r2_mm/r1_mm).toFixed(2) + ' @ ΔT = ' + dT + '°C, k = ' + k + ' W/m·K)';
  }

  [r1El, r2El, lEl, kEl, dtEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pipe outer radius $r_1$ in mm.',
      'Enter insulated outer jacket radius $r_2$ in mm ($r_2 > r_1$).',
      'Enter pipe length L in meters.',
      'Enter insulation thermal conductivity k in $\text{W}/(\text{m}\cdot\text{K})$ (e.g. 0.035 to 0.045 for mineral wool or fiberglass).',
      'Enter temperature drop $\Delta T = T_1 - T_2$ in $^\circ\text{C}$.',
      'Inspect total heat loss rate in Watts and linear heat loss per meter ($W/m$).'
    ],
    benefitTitle: 'Jean-Baptiste Joseph Fourier 1822 Analytical Theory of Heat',
    benefitContent: 'Because the heat transfer area increases radially with outer radius ($A(r) = 2\pi r L$), integrating Fourier\'s law yields the logarithmic cylindrical resistance formula ($R_{\text{th}} = \frac{\ln(r_2/r_1)}{2\pi k L}$), essential for sizing industrial steam piping thermal insulation.',
    faqs: [{ q: 'What is the Critical Radius of Insulation (r_cr = k/h)?', a: 'Adding insulation to a pipe with radius smaller than $r_{\text{cr}} = k/h$ actually increases heat loss because the expanded surface area increases convection faster than the added conduction resistance.' }]
  },

  // 20. Navier-Stokes Plane Couette Fluid Shear Stress & Velocity Profile Calculator
  {
    slug: 'navier-stokes-couette-flow-shear-stress-velocity-profile-calculator',
    name: 'Navier-Stokes Plane Couette Viscous Flow (u(y) = U·y/h) & Shear Stress (τ = μ·U/h) Calculator',
    description: 'Calculate laminar viscous fluid Couette flow linear velocity profile (u(y) = U · y / h), constant wall shear stress (τ = μ · U / h) in Pascals, and viscous shear force for hydrodynamic lubrication bearings.',
    category: 'Science',
    icon: 'text',
    keywords: ['couette flow calculator', 'navier stokes plane couette shear stress formula tau equals mu u over h online', 'laminar flow between parallel plates velocity profile calculator', 'dynamic viscosity wall shear stress couette calculator', 'fluid mechanics hydrodynamic lubrication online'],
    order: 1026,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Top Plate Velocity U (m/s), Plate Gap Height h (mm), Dynamic Viscosity μ (Pa·s) & Plate Area A (m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ct-u">Top Velocity U (m/s)</label>
          <input class="tool-textarea" id="ct-u" type="number" step="0.5" value="2.0" placeholder="2.0 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-h">Gap Height h (mm)</label>
          <input class="tool-textarea" id="ct-h" type="number" step="0.5" value="1.0" placeholder="1.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-mu">Viscosity μ (Pa·s)</label>
          <input class="tool-textarea" id="ct-mu" type="number" step="0.05" value="0.25" placeholder="0.25 Pa·s (Engine Oil)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ct-area">Plate Area A (m²)</label>
          <input class="tool-textarea" id="ct-area" type="number" step="0.1" value="0.50" placeholder="0.50 m²" />
        </div>
      </div>
      <div id="ct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ct-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Wall Shear τ = 500.0 Pa (N/m²)</span>
            <span class="stat-label">Uniform Viscous Wall Shear Stress (τ = μ · U / h)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ct-res-drag" style="color:var(--green-dark); font-weight:700;">Viscous Drag Force F = 250.0 N | Shear Strain Rate γ̇ = 2,000 s⁻¹ (Linear Velocity Profile)</span>
            <span class="stat-label">Total Viscous Drag Force (F = τ · A) & Shear Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uEl = document.getElementById('ct-u'), hEl = document.getElementById('ct-h');
  const muEl = document.getElementById('ct-mu'), aEl = document.getElementById('ct-area');
  const tauResEl = document.getElementById('ct-res-tau'), dgResEl = document.getElementById('ct-res-drag');

  function update() {
    const U = parseFloat(uEl.value), h_mm = parseFloat(hEl.value);
    const mu = parseFloat(muEl.value), Area = parseFloat(aEl.value);

    if (isNaN(U) || isNaN(h_mm) || isNaN(mu) || isNaN(Area) || U <= 0 || h_mm <= 0 || mu <= 0 || Area <= 0) return;

    const h_m = h_mm / 1000.0;

    // Shear strain rate gamma_dot = U / h  [s^-1]
    const gamma_dot = U / h_m;

    // Shear stress tau = mu * (U / h)  [Pa = N/m^2]
    const tau = mu * gamma_dot;

    // Viscous drag force F = tau * Area  [Newtons]
    const F_drag = tau * Area;

    tauResEl.textContent = 'Wall Shear τ = ' + tau.toFixed(1) + ' Pa (N/m²)';
    dgResEl.textContent = 'Viscous Drag Force F = ' + F_drag.toFixed(1) + ' N | Shear Rate γ̇ = ' + Math.round(gamma_dot).toLocaleString() + ' s⁻¹ (μ = ' + mu + ' Pa·s @ gap ' + h_mm + ' mm)';
  }

  [uEl, hEl, muEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter moving top plate sliding velocity U in m/s.',
      'Enter narrow fluid gap height h in millimeters (mm).',
      'Enter fluid dynamic viscosity $\mu$ in $\text{Pa}\cdot\text{s}$ (e.g. 0.001 for water, 0.25 for SAE 30 engine oil).',
      'Enter contact surface area A in $\text{m}^2$.',
      'Inspect uniform fluid shear stress $\tau = \mu \frac{U}{h}$ and total viscous drag force $F = \tau A$.'
    ],
    benefitTitle: 'Maurice Couette 1890 Exact Navier-Stokes Solution',
    benefitContent: 'Plane Couette flow is one of the rare exact analytical solutions to the non-linear Navier-Stokes equations, forming the physical basis for rotational cylinder viscometers and journal bearing lubrication oil film analysis.',
    faqs: [{ q: 'Why is the Couette velocity profile strictly linear?', a: 'In the absence of a pressure gradient ($\frac{dP}{dx} = 0$), viscous momentum diffusion across the gap creates a constant velocity gradient ($\frac{du}{dy} = \frac{U}{h}$).' }]
  },

  // 21. Centrifugal Pump Affinity Laws Flow Head & Power Scaling Calculator
  {
    slug: 'centrifugal-pump-affinity-laws-flow-head-power-calculator',
    name: 'Centrifugal Pump Affinity Laws (Q ∝ N, H ∝ N², P ∝ N³) Scaling Calculator',
    description: 'Calculate centrifugal pump scaling under variable frequency drive (VFD) speed changes using Affinity Laws: Flow Rate (Q₂/Q₁ = N₂/N₁), Total Dynamic Head (H₂/H₁ = (N₂/N₁)²), and Shaft Power (P₂/P₁ = (N₂/N₁)³).',
    category: 'Science',
    icon: 'text',
    keywords: ['pump affinity laws calculator', 'centrifugal pump speed scaling formula q h p online', 'vfd pump energy savings cubic power law calculator', 'impeller diameter speed pump scaling affinity calculator', 'fluid mechanical pumping systems online'],
    order: 1027,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Speed N₁ (RPM), Initial Flow Q₁ (m³/h), Initial Head H₁ (m), Initial Power P₁ (kW) & New Speed N₂ (RPM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pa-n1">Base Speed N₁ (RPM)</label>
          <input class="tool-textarea" id="pa-n1" type="number" step="100" value="1800" placeholder="1800 RPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pa-q1">Base Flow Q₁ (m³/h)</label>
          <input class="tool-textarea" id="pa-q1" type="number" step="10" value="100.0" placeholder="100.0 m³/h" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pa-h1">Base Head H₁ (m)</label>
          <input class="tool-textarea" id="pa-h1" type="number" step="5" value="40.0" placeholder="40.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pa-p1">Base Power P₁ (kW)</label>
          <input class="tool-textarea" id="pa-p1" type="number" step="2" value="15.0" placeholder="15.0 kW" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pa-n2">New Speed N₂ (RPM)</label>
          <input class="tool-textarea" id="pa-n2" type="number" step="100" value="1440" placeholder="1440 RPM (80% Speed)" />
        </div>
      </div>
      <div id="pa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pa-res-newp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">New Power P₂ = 7.68 kW (48.8% Energy Cut!)</span>
            <span class="stat-label">Scaled Shaft Electric Power (Cubic Law: P ∝ N³)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pa-res-qh" style="color:var(--green-dark); font-weight:700;">New Flow Q₂ = 80.0 m³/h (Linear: Q ∝ N) | New Head H₂ = 25.6 m (Quadratic: H ∝ N²)</span>
            <span class="stat-label">New Flow Rate & Head at Reduced Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('pa-n1'), q1El = document.getElementById('pa-q1');
  const h1El = document.getElementById('pa-h1'), p1El = document.getElementById('pa-p1'), n2El = document.getElementById('pa-n2');
  const npResEl = document.getElementById('pa-res-newp'), qhResEl = document.getElementById('pa-res-qh');

  function update() {
    const N1 = parseFloat(n1El.value), Q1 = parseFloat(q1El.value);
    const H1 = parseFloat(h1El.value), P1 = parseFloat(p1El.value), N2 = parseFloat(n2El.value);

    if (isNaN(N1) || isNaN(Q1) || isNaN(H1) || isNaN(P1) || isNaN(N2) || N1 <= 0 || Q1 <= 0 || H1 <= 0 || P1 <= 0 || N2 <= 0) return;

    const ratio = N2 / N1;

    // Affinity Laws:
    // Flow Q2 = Q1 * ratio
    const Q2 = Q1 * ratio;
    // Head H2 = H1 * ratio^2
    const H2 = H1 * Math.pow(ratio, 2);
    // Power P2 = P1 * ratio^3
    const P2 = P1 * Math.pow(ratio, 3);

    const powerSavedPct = ((P1 - P2) / P1) * 100.0;

    npResEl.textContent = 'New Power P₂ = ' + P2.toFixed(2) + ' kW (' + powerSavedPct.toFixed(1) + '% Energy Savings)';
    qhResEl.textContent = 'New Flow Q₂ = ' + Q2.toFixed(1) + ' m³/h | New Head H₂ = ' + H2.toFixed(1) + ' m (Speed Ratio = ' + (ratio * 100).toFixed(0) + '%)';
  }

  [n1El, q1El, h1El, p1El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter base impeller rotational speed $N_1$ in RPM.',
      'Enter baseline flow rate $Q_1$ ($\text{m}^3/\text{h}$), head $H_1$ (m), and electrical shaft power $P_1$ (kW).',
      'Enter new VFD operating speed $N_2$ in RPM.',
      'Inspect scaled flow rate ($Q_2 \propto N$), dynamic head ($H_2 \propto N^2$), and dramatic cubic power reduction ($P_2 \propto N^3$).'
    ],
    benefitTitle: 'Centrifugal Turbomachinery Affinity Laws',
    benefitContent: 'Because power consumption scales with the cube of rotational speed ($P \propto N^3$), reducing pump speed by only $20\%$ cuts electricity consumption by nearly $50\%$ ($1 - 0.8^3 = 48.8\%$), making Variable Frequency Drives (VFDs) the premier industrial energy efficiency investment.',
    faqs: [{ q: 'Why is pump power proportional to speed cubed?', a: 'Power is the product of flow and head ($P \propto Q \times H$); since $Q \propto N$ and $H \propto N^2$, total power scales as $N \times N^2 = N^3$.' }]
  },

  // 22. Distillation McCabe-Thiele Minimum Theoretical Stages (Fenske Equation) Calculator
  {
    slug: 'distillation-mccabe-thiele-minimum-reflux-stages-fenske-calculator',
    name: 'Distillation Minimum Theoretical Stages (Fenske Equation N_min = ln(S_D/S_B) / ln α) Calculator',
    description: 'Calculate continuous binary distillation column minimum theoretical equilibrium stages (N_min = ln[ (x_D/(1 - x_D)) / (x_B/(1 - x_B)) ] / ln α) under total reflux from relative volatility α and distillate/bottoms purity.',
    category: 'Science',
    icon: 'text',
    keywords: ['fenske equation calculator', 'distillation minimum stages mccabe thiele formula online', 'total reflux minimum theoretical trays fenske calculator', 'relative volatility distillation separation stages calculator', 'chemical engineering separation processes online'],
    order: 1028,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Relative Volatility α, Distillate Purity x_D (Top Product) & Bottoms Mole Fraction x_B (Heavy Product)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fn-alpha">Volatility (α)</label>
          <input class="tool-textarea" id="fn-alpha" type="number" step="0.1" value="2.5" placeholder="2.5 (Relative Volatility)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fn-xd">Distillate x_D</label>
          <input class="tool-textarea" id="fn-xd" type="number" step="0.01" min="0.5" max="0.999" value="0.95" placeholder="0.95 (95% Pure Top)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fn-xb">Bottoms x_B</label>
          <input class="tool-textarea" id="fn-xb" type="number" step="0.01" min="0.001" max="0.5" value="0.05" placeholder="0.05 (5% Bottoms)" />
        </div>
      </div>
      <div id="fn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fn-res-nmin" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N_min = 6.43 Trays (~7 Trays + Reboiler)</span>
            <span class="stat-label">Fenske Minimum Equilibrium Stages at Total Reflux</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fn-res-sep" style="color:var(--green-dark); font-weight:700;">Separation Factor S = 361.0 | Real Column: ~13 Trays needed @ Optimal Reflux Ratio R = 1.3·R_min</span>
            <span class="stat-label">Distillation Separation Factor & Practical Tray Estimate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const alEl = document.getElementById('fn-alpha'), xdEl = document.getElementById('fn-xd'), xbEl = document.getElementById('fn-xb');
  const nmResEl = document.getElementById('fn-res-nmin'), spResEl = document.getElementById('fn-res-sep');

  function update() {
    const alpha = parseFloat(alEl.value), x_D = parseFloat(xdEl.value), x_B = parseFloat(xbEl.value);
    if (isNaN(alpha) || isNaN(x_D) || isNaN(x_B) || alpha <= 1 || x_D <= x_B || x_D >= 1 || x_B <= 0) return;

    // Separation factor S = ( x_D / (1 - x_D) ) / ( x_B / (1 - x_B) )
    const topRatio = x_D / (1.0 - x_D);
    const bottomRatio = x_B / (1.0 - x_B);
    const S = topRatio / bottomRatio;

    // Fenske equation: N_min = ln(S) / ln(alpha)
    const N_min = Math.log(S) / Math.log(alpha);
    const practicalTrays = Math.round(N_min * 2.0);

    nmResEl.textContent = 'N_min = ' + N_min.toFixed(2) + ' Stages (~' + Math.ceil(N_min) + ' Trays)';
    spResEl.textContent = 'Separation Factor S = ' + S.toFixed(1) + ' | Practical Column: ~' + practicalTrays + ' Trays @ R = 1.3·R_min (α = ' + alpha + ')';
  }

  [alEl, xdEl, xbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter relative volatility $\alpha = P_A^* / P_B^*$ between light and heavy components ($\alpha > 1$).',
      'Enter target distillate top product purity mole fraction $x_D$ (e.g. 0.95).',
      'Enter bottoms impurity residue mole fraction $x_B$ (e.g. 0.05).',
      'Inspect minimum theoretical equilibrium separation stages $N_{\min}$ at total infinite reflux.'
    ],
    benefitTitle: 'Merrell Fenske 1932 Distillation Column Standard',
    benefitContent: 'The Fenske equation calculates the absolute minimum number of theoretical distillation trays required to achieve a specified chemical separation; real industrial columns operating at finite reflux typically require $1.5\times$ to $2\times$ $N_{\min}$.',
    faqs: [{ q: 'What is Total Reflux in distillation?', a: 'Total reflux means all condensed distillate vapor is returned back into the top of the column ($R = \infty$), maximizing separation with zero net product withdrawal.' }]
  },

  // 23. Crystallization Supersaturation Ratio & Theoretical Product Yield Calculator
  {
    slug: 'crystallization-supersaturation-solubility-yield-calculator',
    name: 'Crystallization Supersaturation Ratio (S = C / C*) & Crystal Yield Calculator',
    description: 'Calculate chemical crystallization relative supersaturation ratio (S = C / C*), driving force supersaturation (ΔC = C - C*), and theoretical crystalline mass yield (Y = M_solv · (C_hot - C_cold)) in kg.',
    category: 'Science',
    icon: 'text',
    keywords: ['crystallization calculator', 'supersaturation ratio s equals c over c star online', 'cooling crystallization yield mass calculator kg', 'solubility curve crystal mass yield calculator', 'chemical engineering industrial crystallization online'],
    order: 1029,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solvent Mass (kg), Hot Feed Solubility C_hot (g/100g) & Cold Mother Liquor Solubility C_cold (g/100g)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cr-solv">Solvent (kg Water)</label>
          <input class="tool-textarea" id="cr-solv" type="number" step="10" value="100.0" placeholder="100.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-chot">Hot Saturation C_hot</label>
          <input class="tool-textarea" id="cr-chot" type="number" step="5" value="80.0" placeholder="80.0 g / 100g (at 80°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cr-ccold">Cold Solubility C_cold</label>
          <input class="tool-textarea" id="cr-ccold" type="number" step="5" value="20.0" placeholder="20.0 g / 100g (at 20°C)" />
        </div>
      </div>
      <div id="cr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cr-res-yield" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Crystal Yield = 60.00 kg Pure Product</span>
            <span class="stat-label">Theoretical Crystallized Solid Mass Yield</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cr-res-eff" style="color:var(--green-dark); font-weight:700;">Recovery Efficiency = 75.0% (60 kg Recovered / 80 kg Dissolved in Feed | S = 4.00 Supersaturation)</span>
            <span class="stat-label">Crystallization Recovery Percentage & Supersaturation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('cr-solv'), chEl = document.getElementById('cr-chot'), ccEl = document.getElementById('cr-ccold');
  const ydResEl = document.getElementById('cr-res-yield'), efResEl = document.getElementById('cr-res-eff');

  function update() {
    const M_solv = parseFloat(sEl.value), C_hot = parseFloat(chEl.value), C_cold = parseFloat(ccEl.value);
    if (isNaN(M_solv) || isNaN(C_hot) || isNaN(C_cold) || M_solv <= 0 || C_hot <= C_cold || C_cold < 0) return;

    // Initial dissolved solute mass: M_hot = M_solv * (C_hot / 100)
    const M_hot = M_solv * (C_hot / 100.0);
    // Solute remaining in cold mother liquor: M_cold = M_solv * (C_cold / 100)
    const M_cold = M_solv * (C_cold / 100.0);

    // Theoretical anhydrous crystal yield: Yield = M_hot - M_cold
    const yield_kg = M_hot - M_cold;
    const recovery_pct = (yield_kg / M_hot) * 100.0;
    const S_ratio = C_hot / C_cold;

    ydResEl.textContent = 'Crystal Yield = ' + yield_kg.toFixed(2) + ' kg Pure Product';
    efResEl.textContent = 'Recovery = ' + recovery_pct.toFixed(1) + '% (' + yield_kg.toFixed(1) + ' kg Recovered / ' + M_hot.toFixed(1) + ' kg Feed | S_ratio = ' + S_ratio.toFixed(2) + ')';
  }

  [sEl, chEl, ccEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total mass of solvent (e.g. water) in kg.',
      'Enter hot feed saturation solubility $C_{\text{hot}}$ in grams solute per 100g solvent.',
      'Enter final cooled crystallizer solubility $C_{\text{cold}}$ in grams per 100g solvent.',
      'Inspect recovered crystalline solid product yield in kg and crystallization recovery percentage.'
    ],
    benefitTitle: 'Industrial Cooling Crystallization Mass Balance',
    benefitContent: 'Solubility differences between hot and cold mother liquor drive crystal nucleation and growth, providing an ultra-high purity purification step in the manufacturing of pharmaceutical active ingredients (APIs) and sugar.',
    faqs: [{ q: 'What is the metastable zone in crystallization?', a: 'The metastable zone is the supersaturated region between the equilibrium solubility curve and spontaneous nucleation boundary where crystals grow without creating excessive fine dust.' }]
  },

  // 24. Fluidized Bed Minimum Fluidization Velocity (Ergun Equation) Calculator
  {
    slug: 'fluidized-bed-minimum-fluidization-velocity-ergun-calculator',
    name: 'Fluidized Bed Minimum Fluidization Velocity (u_mf via Ergun Equation) Calculator',
    description: 'Calculate chemical reactor minimum fluidization superficial velocity (u_mf in m/s) from particle diameter d_p, solid particle density ρ_s, fluid density ρ, and bed voidage ε using the Ergun equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['minimum fluidization velocity calculator', 'ergun equation fluidization velocity u mf online', 'fluidized bed reactor particle density voidage calculator', 'wen yu correlation minimum fluidization velocity calculator', 'chemical reaction engineering fluidized bed online'],
    order: 1030,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Particle Diameter d_p (mm), Particle Density ρ_s (kg/m³), Fluid Density ρ (kg/m³) & Voidage ε',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fb-dp">Particle d_p (mm)</label>
          <input class="tool-textarea" id="fb-dp" type="number" step="0.05" value="0.25" placeholder="0.25 mm (250 μm Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fb-rhos">Solid ρ_s (kg/m³)</label>
          <input class="tool-textarea" id="fb-rhos" type="number" step="100" value="2500" placeholder="2500 kg/m³ (Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fb-rhof">Gas Density ρ (kg/m³)</label>
          <input class="tool-textarea" id="fb-rhof" type="number" step="0.1" value="1.20" placeholder="1.20 kg/m³ (Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fb-eps">Voidage (ε_mf)</label>
          <input class="tool-textarea" id="fb-eps" type="number" step="0.02" min="0.3" max="0.6" value="0.42" placeholder="0.42" />
        </div>
      </div>
      <div id="fb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fb-res-umf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">u_mf = 0.056 m / s (5.6 cm/s)</span>
            <span class="stat-label">Minimum Fluidization Velocity (u_mf)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fb-res-arch" style="color:var(--green-dark); font-weight:700;">Archimedes Ar = 276.5 | Geldart Group B (Sand-like bubbling bed behavior)</span>
            <span class="stat-label">Archimedes Number (Ar) & Geldart Particle Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('fb-dp'), rhosEl = document.getElementById('fb-rhos');
  const rhofEl = document.getElementById('fb-rhof'), epsEl = document.getElementById('fb-eps');
  const umfResEl = document.getElementById('fb-res-umf'), arResEl = document.getElementById('fb-res-arch');

  const g = 9.80665;
  const mu_air = 1.8e-5; // Pa * s

  function update() {
    const d_p_mm = parseFloat(dpEl.value), rho_s = parseFloat(rhosEl.value);
    const rho_g = parseFloat(rhofEl.value), eps = parseFloat(epsEl.value);

    if (isNaN(d_p_mm) || isNaN(rho_s) || isNaN(rho_g) || isNaN(eps) || d_p_mm <= 0 || rho_s <= rho_g || rho_g <= 0 || eps <= 0 || eps >= 1) return;

    const d_p = d_p_mm / 1000.0;
    const deltaRho = rho_s - rho_g;

    // Archimedes number Ar = ( d_p^3 * rho_g * deltaRho * g ) / mu^2
    const Ar = (Math.pow(d_p, 3) * rho_g * deltaRho * g) / Math.pow(mu_air, 2);

    // Wen and Yu simplified correlation for Re_mf:
    // Re_mf = sqrt( 27.2^2 + 0.0408 * Ar ) - 27.2
    const Re_mf = Math.sqrt(Math.pow(27.2, 2) + (0.0408 * Ar)) - 27.2;

    // u_mf = ( Re_mf * mu ) / ( d_p * rho_g )
    const u_mf = (Re_mf * mu_air) / (d_p * rho_g);

    let geldart = '';
    if (d_p_mm < 0.03) geldart = 'Geldart Group C (Cohesive fine powders)';
    else if (d_p_mm < 0.10 && rho_s < 1400) geldart = 'Geldart Group A (Aeratable easily fluidized)';
    else if (d_p_mm < 0.80) geldart = 'Geldart Group B (Sand-like bubbling fluidization)';
    else geldart = 'Geldart Group D (Coarse spoutable particles)';

    umfResEl.textContent = 'u_mf = ' + u_mf.toFixed(3) + ' m / s (' + (u_mf * 100).toFixed(1) + ' cm/s)';
    arResEl.textContent = 'Archimedes Ar = ' + Math.round(Ar).toLocaleString() + ' | ' + geldart + ' (d_p = ' + d_p_mm + ' mm, ρ_s = ' + rho_s + ' kg/m³)';
  }

  [dpEl, rhosEl, rhofEl, epsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mean solid catalyst/sand particle diameter $d_p$ in millimeters.',
      'Enter particle solid density $\rho_s$ in $\text{kg/m}^3$ (e.g. 2,500 for silica sand).',
      'Enter fluidizing gas density $\rho_g$ in $\text{kg/m}^3$ (1.20 for ambient air).',
      'Enter minimum fluidization bed voidage fraction $\varepsilon_{mf}$ (typically $0.40\text{ to }0.45$).',
      'Inspect minimum fluidization superficial gas velocity $u_{mf}$ in m/s and Geldart powder classification.'
    ],
    benefitTitle: 'Sabri Ergun 1952 Fluidized Bed Pressure Drop Balance',
    benefitContent: 'When upward hydrodynamic drag force balances the net gravitational weight of solid particles, the packed bed transitions into a liquid-like boiling state (fluidization), providing exceptional heat transfer in FCC petroleum catalytic cracking.',
    faqs: [{ q: 'What happens when gas velocity exceeds u_mf?', a: 'Gas bubbles form and rise through the bed (bubbling fluidization); if velocity exceeds the particle terminal settling velocity ($u_t$), particles are pneumatically carried out of the reactor.' }]
  },

  // 25. Cereal Grain Drying Equilibrium Moisture Content (Chung-Pfost EMC) Calculator
  {
    slug: 'cereal-grain-drying-equilibrium-moisture-content-emc-calculator',
    name: 'Agricultural Grain Storage Equilibrium Moisture Content (Chung-Pfost EMC) Calculator',
    description: 'Calculate cereal grain (Corn, Wheat, Rice, Soybeans) Equilibrium Moisture Content (EMC in % wet/dry basis) from air temperature T and Relative Humidity (RH) using ASABE Chung-Pfost equations.',
    category: 'Science',
    icon: 'text',
    keywords: ['equilibrium moisture content calculator', 'chung pfost emc grain drying formula online', 'grain storage equilibrium moisture content asabe calculator', 'corn wheat rice safe storage moisture calculator', 'agricultural post harvest engineering online'],
    order: 1031,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Crop Grain Type (Corn, Wheat, Rough Rice, Soybeans), Air Temperature (°C) & Relative Humidity (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="em-crop">Grain Crop</label>
          <select class="tool-textarea" id="em-crop">
            <option value="312.3_0.1982_0.0246_14.0" selected>Shelled Corn / Maize (Safe Storage: ≤ 14.0%)</option>
            <option value="423.8_0.2183_0.0163_13.5">Hard Red Winter Wheat (Safe Storage: ≤ 13.5%)</option>
            <option value="293.8_0.1873_0.0284_13.0">Rough Rice / Paddy (Safe Storage: ≤ 13.0%)</option>
            <option value="195.3_0.1706_0.0381_12.0">Soybeans (Safe Storage: ≤ 12.0%)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="em-temp">Air Temp (°C)</label>
          <input class="tool-textarea" id="em-temp" type="number" step="5" value="25.0" placeholder="25.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="em-rh">Air Humidity (%)</label>
          <input class="tool-textarea" id="em-rh" type="number" step="5" min="5" max="95" value="65.0" placeholder="65.0% RH" />
        </div>
      </div>
      <div id="em-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="em-res-emc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">EMC = 13.48% (Wet Basis)</span>
            <span class="stat-label">Equilibrium Moisture Content (Wet Basis % w.b.)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="em-res-safe" style="color:var(--green-dark); font-weight:700;">SAFE LONG-TERM STORAGE (EMC ≤ 14.0% safe threshold: Prevents mold, mycotoxins & heating)</span>
            <span class="stat-label">ASABE Post-Harvest Grain Storage Safety Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('em-crop'), tEl = document.getElementById('em-temp'), rhEl = document.getElementById('em-rh');
  const emcResEl = document.getElementById('em-res-emc'), sfResEl = document.getElementById('em-res-safe');

  function update() {
    const parts = cEl.value.split('_');
    const A = parseFloat(parts[0]);
    const B = parseFloat(parts[1]);
    const C = parseFloat(parts[2]);
    const safeMax = parseFloat(parts[3]);

    const temp_C = parseFloat(tEl.value), RH_pct = parseFloat(rhEl.value);
    if (isNaN(temp_C) || isNaN(RH_pct) || RH_pct <= 0 || RH_pct >= 100) return;

    const rh_dec = RH_pct / 100.0;

    // ASABE standard Chung-Pfost EMC equation (Dry Basis):
    // EMC_db = ( -1 / B ) * ln( -(temp_C + C) * ln(rh_dec) / A )
    // Ensure valid logarithm argument:
    const inner = -((temp_C + C) * Math.log(rh_dec)) / A;
    if (inner <= 0) return;

    const EMC_db_dec = (-1.0 / B) * Math.log(inner);
    const EMC_db = EMC_db_dec * 100.0;

    // Convert Dry Basis to Wet Basis: EMC_wb = ( EMC_db / (100 + EMC_db) ) * 100
    const EMC_wb = (EMC_db / (100.0 + EMC_db)) * 100.0;

    let status = '', color = '#22543d';

    if (EMC_wb <= safeMax) {
      status = 'SAFE LONG-TERM STORAGE (EMC ' + EMC_wb.toFixed(1) + '% ≤ Safe Limit ' + safeMax + '%: No mold risk)';
      color = '#22543d';
    } else {
      status = 'SPOILAGE RISK DANGER (EMC ' + EMC_wb.toFixed(1) + '% > Safe Limit ' + safeMax + '%: Active aeration / heated drying required!)';
      color = '#c53030';
    }

    emcResEl.textContent = 'EMC = ' + EMC_wb.toFixed(2) + '% Wet Basis (' + EMC_db.toFixed(2) + '% Dry Basis)';
    emcResEl.style.color = color;
    sfResEl.textContent = status + ' @ ' + temp_C + '°C, ' + RH_pct + '% RH';
    sfResEl.style.color = color;
  }

  cEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  rhEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select agricultural cereal grain crop (Corn, Wheat, Rice, Soybeans).',
      'Enter ambient storage bin air temperature in $^\circ\text{C}$.',
      'Enter storage silo air Relative Humidity (%RH).',
      'Inspect Equilibrium Moisture Content (EMC % wet and dry basis) and verify safe storage moisture threshold compliance.'
    ],
    benefitTitle: 'ASABE Agricultural Grain Psychrometry Standards',
    benefitContent: 'Grain is hygroscopic; it absorbs or desorbs moisture until vapor pressure inside the kernel equals surrounding air vapor pressure, establishing the mathematical basis for automated grain silo aeration fan controllers.',
    faqs: [{ q: 'What is the difference between wet basis and dry basis moisture content?', a: 'Wet basis (standard commercial trade) calculates moisture as percentage of total wet grain weight; dry basis divides water mass by dry matter mass.' }]
  }
];

pack35Tools.forEach(createTool);
console.log('Pack 35 complete: 25 tools created.');
