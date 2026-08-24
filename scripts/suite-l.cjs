const { createTool } = require('./generate-curated-tools.cjs');

// Suite L: 10 Tools in Chemistry, Chemical Thermodynamics, Photometry & Stoichiometry
const toolsSuiteL = [
  // 1. Beer-Lambert Law Absorbance Calculator
  {
    slug: 'beer-lambert-law-absorbance-calculator',
    name: 'Beer-Lambert Law Spectrophotometry Calculator',
    description: 'Calculate optical absorbance (A = ε · c · l) and molar concentration from spectrophotometer transmission percentage in analytical chemistry.',
    category: 'Science',
    icon: 'text',
    keywords: ['beer lambert law calculator', 'spectrophotometry absorbance calculator', 'molar absorptivity epsilon calculator', 'transmittance to absorbance formula', 'beer lambert concentration online'],
    order: 239,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Molar Absorptivity, Path Length & Concentration',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bl-eps">Molar Absorptivity ε (L / (mol·cm))</label>
          <input class="tool-textarea" id="bl-eps" type="number" step="any" value="12500" placeholder="12500" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-l">Cuvette Path Length l (cm)</label>
          <input class="tool-textarea" id="bl-l" type="number" step="any" value="1.0" placeholder="1.0 cm (Standard Cuvette)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-c">Concentration c (mol/L or M)</label>
          <input class="tool-textarea" id="bl-c" type="number" step="any" value="0.00005" placeholder="0.00005 M" />
        </div>
      </div>
      <div id="bl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bl-res-abs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.625 AU</span>
            <span class="stat-label">Absorbance (A = ε·c·l)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bl-res-trans" style="font-weight:700;">23.71%</span>
            <span class="stat-label">Transmitted Light (%T)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const epsEl = document.getElementById('bl-eps'), lEl = document.getElementById('bl-l'), cEl = document.getElementById('bl-c');
  const aResEl = document.getElementById('bl-res-abs'), tResEl = document.getElementById('bl-res-trans');

  function update() {
    const eps = parseFloat(epsEl.value), l = parseFloat(lEl.value), c = parseFloat(cEl.value);
    if (isNaN(eps) || isNaN(l) || isNaN(c) || eps <= 0 || l <= 0 || c <= 0) return;

    // A = eps * c * l
    const A = eps * c * l;
    // %T = 10^(-A) * 100
    const pctT = Math.pow(10, -A) * 100;

    aResEl.textContent = A.toFixed(3) + ' AU';
    tResEl.textContent = pctT.toFixed(2) + '%';
  }

  [epsEl, lEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter molar absorptivity coefficient ε.',
      'Enter optical cuvette path length l (standard optical quartz is 1.0 cm).',
      'Enter chemical molar concentration c.',
      'Inspect optical absorbance (AU) and transmitted photon percentage (%T).'
    ],
    benefitTitle: 'UV-Vis Spectrophotometry Standards',
    benefitContent: 'Absorbance is linearly proportional to sample concentration up to A ≈ 1.5 to 2.0 AU, allowing rapid quantification of proteins, DNA, dyes, and pharmaceutical solutions.',
    faqs: [{ q: 'What is the relationship between Transmittance (%T) and Absorbance (A)?', a: 'A = 2 - log₁₀(%T).' }]
  },

  // 2. Gibbs Free Energy (ΔG = ΔH - TΔS) Reaction Spontaneity Calculator
  {
    slug: 'gibbs-free-energy-spontaneity-calculator',
    name: 'Gibbs Free Energy & Spontaneity Calculator (ΔG)',
    description: 'Calculate reaction Gibbs Free Energy change (ΔG = ΔH - T·ΔS) and equilibrium temperature to determine chemical thermodynamic spontaneity.',
    category: 'Science',
    icon: 'text',
    keywords: ['gibbs free energy calculator', 'delta g delta h t delta s', 'chemical spontaneity calculator', 'thermodynamic equilibrium temperature', 'exergonic vs endergonic calculator online'],
    order: 240,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Enthalpy (ΔH), Entropy (ΔS) & Temperature',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gfe-dh">Enthalpy Change ΔH (kJ/mol)</label>
          <input class="tool-textarea" id="gfe-dh" type="number" step="any" value="-50.0" placeholder="-50 (Exothermic)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gfe-ds">Entropy Change ΔS (J/(mol·K))</label>
          <input class="tool-textarea" id="gfe-ds" type="number" step="any" value="100.0" placeholder="100 J/(mol·K)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gfe-t">Temperature T (Kelvin K)</label>
          <input class="tool-textarea" id="gfe-t" type="number" step="any" value="298.15" placeholder="298.15 K (25°C)" />
        </div>
      </div>
      <div id="gfe-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gfe-res-dg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-79.82 kJ/mol</span>
            <span class="stat-label">Gibbs Free Energy Change (ΔG)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gfe-res-spont" style="color:var(--green-dark); font-weight:700;">Spontaneous (Exergonic)</span>
            <span class="stat-label">Thermodynamic Spontaneity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dhEl = document.getElementById('gfe-dh'), dsEl = document.getElementById('gfe-ds'), tEl = document.getElementById('gfe-t');
  const dgEl = document.getElementById('gfe-res-dg'), spEl = document.getElementById('gfe-res-spont');

  function update() {
    const dHkJ = parseFloat(dhEl.value), dSJ = parseFloat(dsEl.value), T = parseFloat(tEl.value);
    if (isNaN(dHkJ) || isNaN(dSJ) || isNaN(T) || T <= 0) return;

    // Convert dS from J to kJ: dSkJ = dSJ / 1000
    const dSkJ = dSJ / 1000;
    // Delta G = Delta H - T * Delta S
    const dG = dHkJ - (T * dSkJ);

    dgEl.textContent = (dG >= 0 ? '+' : '') + dG.toFixed(2) + ' kJ/mol';

    if (dG < 0) {
      spEl.textContent = 'Spontaneous (Exergonic, ΔG < 0)';
      spEl.style.color = '#22543d';
    } else if (dG === 0) {
      spEl.textContent = 'Dynamic Equilibrium (ΔG = 0)';
      spEl.style.color = '#d97706';
    } else {
      spEl.textContent = 'Non-Spontaneous (Endergonic, ΔG > 0)';
      spEl.style.color = '#c53030';
    }
  }

  [dhEl, dsEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reaction enthalpy change ΔH in kJ/mol (negative for exothermic).',
      'Enter entropy change ΔS in J/(mol·K).',
      'Enter Kelvin temperature T.',
      'Inspect reaction free energy change and spontaneity direction.'
    ],
    benefitTitle: 'Josiah Willard Gibbs Free Energy Theorem',
    benefitContent: 'A chemical reaction proceeds spontaneously at constant temperature and pressure if and only if the change in Gibbs free energy is negative (ΔG < 0).',
    faqs: [{ q: 'At what temperature does a reaction switch spontaneity?', a: 'Setting ΔG = 0 gives the crossover temperature T_eq = ΔH / ΔS.' }]
  },

  // 3. Chemical Reaction Percent Yield Calculator
  {
    slug: 'chemical-reaction-percent-yield-calculator',
    name: 'Chemical Reaction Percent Yield Calculator',
    description: 'Calculate reaction percent yield ((Actual Yield / Theoretical Yield) · 100) and product loss in synthetic chemistry laboratories.',
    category: 'Science',
    icon: 'text',
    keywords: ['percent yield calculator', 'actual vs theoretical yield chemistry', 'chemical reaction yield formula', 'stoichiometric yield calculator online', 'laboratory synthesis percent yield'],
    order: 241,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Actual & Theoretical Product Masses (grams)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="yld-act">Actual Recovered Yield (grams)</label>
          <input class="tool-textarea" id="yld-act" type="number" step="any" value="18.5" placeholder="e.g. 18.5 g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yld-theo">Theoretical Stoichiometric Yield (grams)</label>
          <input class="tool-textarea" id="yld-theo" type="number" step="any" value="22.0" placeholder="e.g. 22.0 g" />
        </div>
      </div>
      <div id="yld-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="yld-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">84.09%</span>
            <span class="stat-label">Reaction Percent Yield</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="yld-res-loss" style="color:#c53030; font-weight:700;">3.50 g (15.91%)</span>
            <span class="stat-label">Unrecovered Loss / Byproducts</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const actEl = document.getElementById('yld-act'), theoEl = document.getElementById('yld-theo');
  const pctEl = document.getElementById('yld-res-pct'), lossEl = document.getElementById('yld-res-loss');

  function update() {
    const act = parseFloat(actEl.value), theo = parseFloat(theoEl.value);
    if (isNaN(act) || isNaN(theo) || act < 0 || theo <= 0) return;

    const pct = (act / theo) * 100;
    const loss = theo - act;

    pctEl.textContent = pct.toFixed(2) + '%';
    lossEl.textContent = (loss >= 0 ? loss.toFixed(2) + ' g (' + (100 - pct).toFixed(2) + '%)' : 'Yield exceeds 100% (Check purity/dryness)');
  }

  actEl.addEventListener('input', update);
  theoEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the actual mass of purified isolated product measured on a laboratory scale.',
      'Enter the theoretical maximum product yield calculated from limiting reagent stoichiometry.',
      'Inspect the reaction percent yield.'
    ],
    benefitTitle: 'Industrial Synthesis Optimization',
    benefitContent: 'Tracking percent yield reveals chemical reaction efficiency, identifying losses caused by incomplete equilibrium, side reactions, or filtration wash stages.',
    faqs: [{ q: 'Why is actual yield almost always less than 100%?', a: 'Side reactions, incomplete equilibrium conversion, mechanical transfer losses, and crystallization retention prevent 100% theoretical recovery.' }]
  },

  // 4. Raoult's Law Ideal Solution Vapor Pressure Calculator
  {
    slug: 'raoult-law-vapor-pressure-calculator',
    name: 'Raoult\'s Law Ideal Solution Vapor Pressure Calculator',
    description: 'Calculate total and partial vapor pressure (P = χ_A · P_A° + χ_B · P_B°) of volatile binary liquid mixtures for distillation columns.',
    category: 'Science',
    icon: 'text',
    keywords: ['raoults law calculator', 'vapor pressure binary mixture calculator', 'mole fraction vapor pressure formula', 'distillation vapor liquid equilibrium', 'ideal solution raoult law online'],
    order: 242,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mole Fraction & Pure Vapor Pressures',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rl-x1">Mole Fraction Component A (χ_A)</label>
          <input class="tool-textarea" id="rl-x1" type="number" min="0" max="1" step="0.05" value="0.60" placeholder="0.60" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-p1">Pure Vapor Pressure P_A° (kPa)</label>
          <input class="tool-textarea" id="rl-p1" type="number" step="any" value="50" placeholder="50 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-p2">Pure Vapor Pressure P_B° (kPa)</label>
          <input class="tool-textarea" id="rl-p2" type="number" step="any" value="20" placeholder="20 kPa" />
        </div>
      </div>
      <div id="rl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rl-res-ptot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">38.00 kPa</span>
            <span class="stat-label">Total Equilibrium Vapor Pressure (P_tot)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rl-res-y1" style="font-weight:700;">0.789 (78.9% A)</span>
            <span class="stat-label">Vapor Phase Fraction (y_A)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const x1El = document.getElementById('rl-x1'), p1El = document.getElementById('rl-p1'), p2El = document.getElementById('rl-p2');
  const totEl = document.getElementById('rl-res-ptot'), y1El = document.getElementById('rl-res-y1');

  function update() {
    const xA = parseFloat(x1El.value), pA0 = parseFloat(p1El.value), pB0 = parseFloat(p2El.value);
    if (isNaN(xA) || isNaN(pA0) || isNaN(pB0) || xA < 0 || xA > 1 || pA0 <= 0 || pB0 <= 0) return;

    const xB = 1 - xA;
    // Partial pressures: P_A = x_A * P_A0, P_B = x_B * P_B0
    const pA = xA * pA0;
    const pB = xB * pB0;
    const pTot = pA + pB;
    // Vapor composition y_A = P_A / P_tot
    const yA = pA / pTot;

    totEl.textContent = pTot.toFixed(2) + ' kPa';
    y1El.textContent = yA.toFixed(3) + ' (' + (yA * 100).toFixed(1) + '% A in vapor)';
  }

  [x1El, p1El, p2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter liquid phase mole fraction of the more volatile component A (χ_A).',
      'Enter pure saturation vapor pressures of component A and component B at the given temperature.',
      'Inspect total vapor pressure and enriched vapor mole fraction (y_A).'
    ],
    benefitTitle: 'Principles of Fractional Distillation',
    benefitContent: 'Raoult\'s law demonstrates that the vapor above a boiling mixture is always richer in the more volatile lower-boiling component (y_A > χ_A), making separation by fractional distillation possible.',
    faqs: [{ q: 'What is an azeotrope?', a: 'A non-ideal liquid mixture where liquid and vapor compositions become identical (y_A = χ_A), preventing further separation by simple distillation.' }]
  },

  // 5. Chemical Equilibrium Constant (Kp / Kc) Converter
  {
    slug: 'equilibrium-constant-kp-kc-calculator',
    name: 'Chemical Equilibrium Constant (Kp / Kc) Converter',
    description: 'Convert between concentration equilibrium constant Kc and partial pressure constant Kp (Kp = Kc · (R·T)^Δn) for gas-phase reactions.',
    category: 'Science',
    icon: 'text',
    keywords: ['equilibrium constant kp kc calculator', 'kp kc converter online', 'chemical equilibrium constant formula', 'delta n gas moles equilibrium', 'kp kc temperature relation'],
    order: 243,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Equilibrium Constant, Temperature & Gas Mole Change (Δn)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eq-kc">Kc Concentration Constant</label>
          <input class="tool-textarea" id="eq-kc" type="number" step="any" value="0.045" placeholder="0.045" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eq-dn">Gas Mole Change Δn (Products - Reactants)</label>
          <input class="tool-textarea" id="eq-dn" type="number" step="1" value="-1" placeholder="-1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eq-t">Temperature T (Kelvin K)</label>
          <input class="tool-textarea" id="eq-t" type="number" step="any" value="500" placeholder="500 K" />
        </div>
      </div>
      <div id="eq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eq-res-kp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.00110</span>
            <span class="stat-label">Partial Pressure Constant (Kp)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eq-res-rt">RT = 41.03 L·atm/mol</span>
            <span class="stat-label">Gas Product Factor (R·T)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kcEl = document.getElementById('eq-kc'), dnEl = document.getElementById('eq-dn'), tEl = document.getElementById('eq-t');
  const kpEl = document.getElementById('eq-res-kp'), rtEl = document.getElementById('eq-res-rt');

  const R = 0.082057; // L·atm / (mol·K)

  function update() {
    const kc = parseFloat(kcEl.value), dn = parseFloat(dnEl.value), T = parseFloat(tEl.value);
    if (isNaN(kc) || isNaN(dn) || isNaN(T) || kc <= 0 || T <= 0) return;

    const RT = R * T;
    // Kp = Kc * (RT)^dn
    const kp = kc * Math.pow(RT, dn);

    kpEl.textContent = kp < 0.001 ? kp.toExponential(3) : kp.toFixed(5);
    rtEl.textContent = 'RT = ' + RT.toFixed(2) + ' L·atm/mol';
  }

  [kcEl, dnEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter concentration equilibrium constant Kc.',
      'Enter net change in gaseous stoichiometric coefficients Δn = (Moles Gas Products - Moles Gas Reactants).',
      'Enter absolute Kelvin temperature T.',
      'Inspect the partial pressure equilibrium constant Kp.'
    ],
    benefitTitle: 'Gas Mole Change and Kp = Kc Equality',
    benefitContent: 'When Δn = 0 (equal number of gas moles on reactant and product sides), (RT)⁰ = 1 and therefore Kp = Kc regardless of temperature.',
    faqs: [{ q: 'What is Δn for Haber process N₂ + 3H₂ ⇌ 2NH₃?', a: 'Δn = 2 (products) - (1 + 3) (reactants) = 2 - 4 = -2.' }]
  }
];

toolsSuiteL.forEach(createTool);
console.log('Suite L complete: 5 tools created.');
