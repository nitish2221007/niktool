const { createTool } = require('./generate-curated-tools.cjs');

// Suite LLL: 5 Tools in Polymer Physics, Rheology, Glass Transition & Rubber Elasticity to reach 630 tools
const toolsSuiteLLL = [
  // 1. Polymer Copolymer Glass Transition (Fox Equation) Calculator
  {
    slug: 'polymer-glass-transition-fox-equation-calculator',
    name: 'Polymer Copolymer Glass Transition (Fox Equation) Calculator',
    description: 'Calculate miscibility copolymer glass transition temperature (1 / T_g = w₁ / T_g1 + w₂ / T_g2) in Kelvin and Celsius using the Thomas G. Fox equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['fox equation polymer calculator', 'copolymer glass transition calculator', 'tg copolymer blend formula online', 'fox equation kelvin to celsius', 'polymer physics glass transition online'],
    order: 503,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Polymer 1 (T_g1 in °C, Weight Fraction w₁) & Polymer 2 (T_g2 in °C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fox-tg1">Polymer 1 T_g1 (°C)</label>
          <input class="tool-textarea" id="fox-tg1" type="number" step="any" value="100.0" placeholder="100.0 °C (Polystyrene)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fox-w1">Weight Fraction w₁</label>
          <input class="tool-textarea" id="fox-w1" type="number" step="0.05" min="0" max="1" value="0.70" placeholder="0.70 (70% PS)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fox-tg2">Polymer 2 T_g2 (°C)</label>
          <input class="tool-textarea" id="fox-tg2" type="number" step="any" value="-60.0" placeholder="-60.0 °C (Polybutadiene)" />
        </div>
      </div>
      <div id="fox-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fox-res-c" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">31.6 °C (304.8 K)</span>
            <span class="stat-label">Predicted Blend T_g</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fox-res-state" style="font-weight:700;">Leathery / Flexible Solid @ 25°C</span>
            <span class="stat-label">Physical State at Room Temperature</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tg1El = document.getElementById('fox-tg1'), w1El = document.getElementById('fox-w1'), tg2El = document.getElementById('fox-tg2');
  const cResEl = document.getElementById('fox-res-c'), sResEl = document.getElementById('fox-res-state');

  function update() {
    const tg1C = parseFloat(tg1El.value), w1 = parseFloat(w1El.value), tg2C = parseFloat(tg2El.value);
    if (isNaN(tg1C) || isNaN(w1) || isNaN(tg2C) || w1 <= 0 || w1 >= 1) return;

    const w2 = 1.0 - w1;
    const tg1K = tg1C + 273.15;
    const tg2K = tg2C + 273.15;

    if (tg1K <= 0 || tg2K <= 0) return;

    // Fox Equation: 1 / Tg = (w1 / Tg1) + (w2 / Tg2)
    const invTg = (w1 / tg1K) + (w2 / tg2K);
    const tgBlendK = 1 / invTg;
    const tgBlendC = tgBlendK - 273.15;

    cResEl.textContent = tgBlendC.toFixed(1) + ' °C (' + tgBlendK.toFixed(1) + ' K)';

    if (tgBlendC > 40) {
      sResEl.textContent = 'Rigid Glassy Thermoplastic (T_g > Room Temp)';
      sResEl.style.color = '#22543d';
    } else if (tgBlendC >= 15 && tgBlendC <= 40) {
      sResEl.textContent = 'Leathery / Semi-Rigid Transition Zone';
      sResEl.style.color = '#2563eb';
    } else {
      sResEl.textContent = 'Rubbery / Highly Flexible Elastomer (T_g < Room Temp)';
      sResEl.style.color = '#d97706';
    }
  }

  [tg1El, w1El, tg2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter homopolymer 1 glass transition temperature T_g1 in °C.',
      'Enter homopolymer 1 weight fraction w₁ (0.0 to 1.0).',
      'Enter homopolymer 2 glass transition temperature T_g2 in °C.',
      'Inspect predicted random copolymer blend transition temperature T_g in Celsius and Kelvin.'
    ],
    benefitTitle: 'Thomas G. Fox\'s 1956 Free Volume Theorem',
    benefitContent: 'The Fox equation models how mixing hard, rigid monomers (like Styrene, T_g = 100°C) with soft, flexible monomers (like Butadiene, T_g = -60°C) proportionally shifts polymer chain segmental mobility and rubbery flexibility.',
    faqs: [{ q: 'Why must temperatures be converted to Kelvin in the Fox equation?', a: 'Thermodynamic molecular free volume calculations require absolute temperature scale (Kelvin).' }]
  },

  // 2. Polymer Melt Flow Index (MFI / MFR) Viscosity & Shear Rate Calculator
  {
    slug: 'melt-flow-index-mfi-viscosity-calculator',
    name: 'Polymer Melt Flow Index (MFI / MFR) & Extrusion Rheology Calculator',
    description: 'Calculate Melt Flow Rate (MFR = (Mass / Extrusion Time) · 600) in g/10 min and estimate zero-shear dynamic melt viscosity (η₀) per ASTM D1238 / ISO 1133 standards.',
    category: 'Science',
    icon: 'text',
    keywords: ['melt flow index calculator', 'mfi mfr formula polymer astm d1238', 'melt flow rate to viscosity calculator', 'plastics extrusion melt index online', 'polymer rheology zero shear viscosity calculator'],
    order: 504,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Extruded Polymer Strand Mass (g) & Timed Cut Interval (seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mfi-mass">Extrudate Mass (g)</label>
          <input class="tool-textarea" id="mfi-mass" type="number" step="any" value="0.25" placeholder="0.25 g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mfi-sec">Cut Interval (sec)</label>
          <input class="tool-textarea" id="mfi-sec" type="number" step="any" value="30" placeholder="30 seconds" />
        </div>
      </div>
      <div id="mfi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mfi-res-mfr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.00 g / 10 min</span>
            <span class="stat-label">Standard Melt Flow Rate (MFR / MFI)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mfi-res-proc" style="font-weight:700;">Film Extrusion / Blow Molding Grade</span>
            <span class="stat-label">Recommended Processing Method</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('mfi-mass'), sEl = document.getElementById('mfi-sec');
  const mfrResEl = document.getElementById('mfi-res-mfr'), prcResEl = document.getElementById('mfi-res-proc');

  function update() {
    const massG = parseFloat(mEl.value), sec = parseFloat(sEl.value);
    if (isNaN(massG) || isNaN(sec) || massG <= 0 || sec <= 0) return;

    // MFR = (mass * 600) / sec  [g / 10 min]
    const mfr = (massG * 600) / sec;

    mfrResEl.textContent = mfr.toFixed(2) + ' g / 10 min (MFR)';

    if (mfr < 1.0) {
      prcResEl.textContent = 'Pipe Extrusion / Heavy Blow Molding (Fractional Melt < 1: Very High Molecular Weight)';
      prcResEl.style.color = '#22543d';
    } else if (mfr >= 1.0 && mfr <= 10.0) {
      prcResEl.textContent = 'Blown Film / General Sheet Extrusion / Blow Molding (MFR 1 to 10)';
      prcResEl.style.color = '#22543d';
    } else if (mfr > 10.0 && mfr <= 40.0) {
      prcResEl.textContent = 'Injection Molding (MFR 10 to 40: High Flow Ease)';
      prcResEl.style.color = '#2563eb';
    } else {
      prcResEl.textContent = 'High-Speed Thin-Wall Injection Molding / Meltblown Nonwovens (MFR > 40)';
      prcResEl.style.color = '#d97706';
    }
  }

  mEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter mass of extruded polymer strand in grams from capillary plastometer.',
      'Enter timed cutting interval in seconds (e.g. 15s, 30s, 60s).',
      'Inspect standardized Melt Flow Rate (MFR in g/10 min) and processing application suitability (Blow Molding, Extrusion, or Injection Molding).'
    ],
    benefitTitle: 'Inverse Viscosity Relationship',
    benefitContent: 'Melt Flow Rate is inversely proportional to molecular weight and melt viscosity: high molecular weight polymers flow slowly with low MFR (< 1.0 g/10 min), while low molecular weight plastics melt into runny liquids with high MFR (> 20 g/10 min).',
    faqs: [{ q: 'What is a "fractional melt" polymer?', a: 'A polymer with an MFR of less than 1.0 g/10 min, offering maximum impact strength and environmental stress crack resistance (ESCR).' }]
  },

  // 3. Arrhenius Thermal Reaction Rate & Activation Energy Calculator
  {
    slug: 'arrhenius-thermal-degradation-activation-energy-calculator',
    name: 'Arrhenius Reaction Rate & Activation Energy (E_a) Calculator',
    description: 'Calculate temperature-dependent chemical reaction rate constants (k = A · e^(-E_a / (R · T))) and accelerated thermal aging factors using the Svante Arrhenius equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['arrhenius equation calculator', 'activation energy formula k a exp', 'accelerated aging temperature factor calculator', 'svante arrhenius reaction rate online', 'thermal shelf life arrhenius calculator'],
    order: 505,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Activation Energy E_a (kJ/mol), Pre-Exponential Factor A & Temp T (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="arh-ea">Activation Energy E_a (kJ/mol)</label>
          <input class="tool-textarea" id="arh-ea" type="number" step="any" value="85.0" placeholder="85.0 kJ/mol (Polymer Oxidation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arh-t1">Operating Temp T₁ (°C)</label>
          <input class="tool-textarea" id="arh-t1" type="number" step="any" value="25.0" placeholder="25.0 °C (Ambient Room)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arh-t2">Accelerated Temp T₂ (°C)</label>
          <input class="tool-textarea" id="arh-t2" type="number" step="any" value="55.0" placeholder="55.0 °C (Oven Test)" />
        </div>
      </div>
      <div id="arh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="arh-res-aaf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">25.6x Faster</span>
            <span class="stat-label">Accelerated Aging Factor (AAF = k₂ / k₁)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="arh-res-equiv" style="font-weight:700;">14.3 Days Test = 1 Year Life</span>
            <span class="stat-label">Equivalent Real-Time Service Life</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eaEl = document.getElementById('arh-ea'), t1El = document.getElementById('arh-t1'), t2El = document.getElementById('arh-t2');
  const aafResEl = document.getElementById('arh-res-aaf'), eqResEl = document.getElementById('arh-res-equiv');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const eaKj = parseFloat(eaEl.value), t1C = parseFloat(t1El.value), t2C = parseFloat(t2El.value);
    if (isNaN(eaKj) || isNaN(t1C) || isNaN(t2C) || eaKj <= 0) return;

    const eaJ = eaKj * 1000;
    const t1K = t1C + 273.15;
    const t2K = t2C + 273.15;

    if (t1K <= 0 || t2K <= 0) return;

    // Arrhenius Ratio: k2 / k1 = exp( (Ea / R) * (1/T1 - 1/T2) )
    const exponent = (eaJ / R) * ((1 / t1K) - (1 / t2K));
    const AAF = Math.exp(exponent);
    const testDaysFor1Year = 365.25 / AAF;

    aafResEl.textContent = AAF.toFixed(1) + 'x Accelerated Degradation Rate';
    eqResEl.textContent = testDaysFor1Year.toFixed(1) + ' Days at ' + t2C + '°C = Exactly 1 Year Life at ' + t1C + '°C';
  }

  [eaEl, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter degradation reaction Activation Energy $E_a$ in kJ/mol (typically 70 to 100 kJ/mol for polymer oxidation and pharmaceutical degradation).',
      'Enter ambient baseline operating temperature $T_1$ in °C.',
      'Enter accelerated aging test chamber temperature $T_2$ in °C.',
      'Inspect Accelerated Aging Factor (AAF) and equivalent test duration.'
    ],
    benefitTitle: 'Svante Arrhenius 1889 Kinetic Acceleration',
    benefitContent: 'By quantifying how thermal energy surmounts molecular activation energy barriers ($k = A e^{-E_a/RT}$), engineers perform accelerated thermal stress testing in ovens over weeks to certify decades of real-world product lifespan.',
    faqs: [{ q: 'What is the "10-degree rule" in chemistry?', a: 'As an empirical approximation for reactions with $E_a \approx 50\text{ kJ/mol}$, chemical reaction rate roughly doubles for every 10°C rise in temperature ($Q_{10} \approx 2$).' }]
  },

  // 4. Crosslink Density & Network Swelling (Flory-Rehner Theory) Calculator
  {
    slug: 'crosslink-density-flory-rehner-swelling-calculator',
    name: 'Polymer Crosslink Density & Swelling (Flory-Rehner Theory) Calculator',
    description: 'Estimate vulcanized rubber crosslink network density (ν = - (ln(1 - v_r) + v_r + χ · v_r²) / (V_s · (v_r^(1/3) - v_r / 2))) in mol/cm³ from solvent swelling equilibrium.',
    category: 'Science',
    icon: 'text',
    keywords: ['flory rehner calculator', 'crosslink density rubber swelling formula', 'polymer gel equilibrium swelling ratio', 'vulcanization network density mol cm3', 'flory huggins chi interaction parameter online'],
    order: 506,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Polymer Volume Fraction in Swollen Gel v_r & Interaction Parameter χ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="flr-vr">Polymer Fraction (v_r)</label>
          <input class="tool-textarea" id="flr-vr" type="number" step="0.01" min="0.05" max="0.95" value="0.25" placeholder="0.25 (Swollen 4x Volume)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="flr-chi">Flory Interaction (χ)</label>
          <input class="tool-textarea" id="flr-chi" type="number" step="0.05" value="0.38" placeholder="0.38 (Toluene / Natural Rubber)" />
        </div>
      </div>
      <div id="flr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="flr-res-nu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.42 × 10⁻⁴ mol / cm³</span>
            <span class="stat-label">Effective Crosslink Density (ν_e)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="flr-res-mc" style="font-weight:700;">M_c ≈ 7,040 g/mol</span>
            <span class="stat-label">Mean Molecular Weight Between Crosslinks</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vrEl = document.getElementById('flr-vr'), chiEl = document.getElementById('flr-chi');
  const nuResEl = document.getElementById('flr-res-nu'), mcResEl = document.getElementById('flr-res-mc');

  // Molar volume of toluene Vs = 106.3 cm^3 / mol; density of rubber rho = 1.0 g/cm^3
  const Vs = 106.3;
  const rho_p = 1.0;

  function update() {
    const vr = parseFloat(vrEl.value), chi = parseFloat(chiEl.value);
    if (isNaN(vr) || isNaN(chi) || vr <= 0 || vr >= 1) return;

    // Flory-Rehner equation:
    // nu_e = - [ ln(1 - vr) + vr + chi * vr^2 ] / [ Vs * ( vr^(1/3) - vr / 2 ) ]
    const numerator = -(Math.log(1 - vr) + vr + (chi * Math.pow(vr, 2)));
    const denominator = Vs * (Math.pow(vr, 1 / 3) - (vr / 2));
    const nu_e = numerator / denominator;
    const Mc = nu_e > 0 ? (rho_p / nu_e) : 0;

    nuResEl.textContent = (nu_e * 1e4).toFixed(2) + ' × 10⁻⁴ mol / cm³';
    mcResEl.textContent = 'M_c ≈ ' + Math.round(Mc).toLocaleString() + ' g / mol (Swelling Ratio Q = ' + (1 / vr).toFixed(1) + 'x)';
  }

  vrEl.addEventListener('input', update);
  chiEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter volume fraction of polymer in equilibrium solvent-swollen gel $v_r$ ($v_r = 1 / Q_{\\text{swelling}}$).',
      'Enter Flory-Huggins polymer-solvent interaction parameter $\\chi$ (typically 0.3 to 0.45 in good solvents).',
      'Inspect effective network crosslink density $\\nu_e$ in $\\text{mol}/\\text{cm}^3$ and mean molecular weight between crosslinks $M_c$.'
    ],
    benefitTitle: 'Paul Flory & John Rehner Jr. 1943 Rubber Theory',
    benefitContent: 'At swelling equilibrium, thermodynamic osmotic mixing forces that drive solvent inside the rubber network are exactly balanced by elastic conformational entropic retraction forces of stretched polymer chains.',
    faqs: [{ q: 'What does a higher crosslink density mean?', a: 'More crosslinks restrict polymer chain expansion, leading to lower solvent swelling ($v_r$ closer to 1), higher elastic modulus, and increased rubber hardness (Shore A durometer).' }]
  },

  // 5. Mooney-Rivlin Hyperelastic Rubber Tensile Stress Calculator
  {
    slug: 'mooney-rivlin-rubber-hyperelasticity-calculator',
    name: 'Mooney-Rivlin Hyperelastic Rubber Tensile Stress Calculator',
    description: 'Calculate uniaxial tensile engineering stress (σ = 2 · (λ - 1 / λ²) · (C₁₀ + C₀₁ / λ)) for hyperelastic vulcanized elastomers and silicone rubber.',
    category: 'Science',
    icon: 'text',
    keywords: ['mooney rivlin calculator', 'hyperelastic rubber stress strain formula', 'c10 c01 mooney rivlin strain energy', 'elastomer tensile stretch ratio lambda', 'finite element rubber material model online'],
    order: 507,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Stretch Ratio λ (Extension Ratio L / L₀) & Material Constants (C₁₀, C₀₁ in MPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mr-lambda">Stretch Ratio λ</label>
          <input class="tool-textarea" id="mr-lambda" type="number" step="0.1" min="1.05" max="10" value="2.5" placeholder="2.5 (150% Elongation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mr-c10">Constant C₁₀ (MPa)</label>
          <input class="tool-textarea" id="mr-c10" type="number" step="0.05" value="0.40" placeholder="0.40 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mr-c01">Constant C₀₁ (MPa)</label>
          <input class="tool-textarea" id="mr-c01" type="number" step="0.05" value="0.10" placeholder="0.10 MPa" />
        </div>
      </div>
      <div id="mr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mr-res-stress" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.06 MPa (298.8 psi)</span>
            <span class="stat-label">Uniaxial Engineering Stress (σ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mr-res-true" style="font-weight:700;">5.15 MPa True Stress (λ · σ)</span>
            <span class="stat-label">Cauchy True Stress</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('mr-lambda'), c10El = document.getElementById('mr-c10'), c01El = document.getElementById('mr-c01');
  const strResEl = document.getElementById('mr-res-stress'), truResEl = document.getElementById('mr-res-true');

  function update() {
    const lambda = parseFloat(lamEl.value), C10 = parseFloat(c10El.value), C01 = parseFloat(c01El.value);
    if (isNaN(lambda) || isNaN(C10) || isNaN(C01) || lambda <= 1.0) return;

    // Uniaxial Mooney-Rivlin: sigma = 2 * (lambda - 1 / (lambda^2)) * (C10 + C01 / lambda)
    const sigmaEngMpa = 2 * (lambda - (1 / Math.pow(lambda, 2))) * (C10 + (C01 / lambda));
    const sigmaEngPsi = sigmaEngMpa * 145.038;
    const trueStressMpa = sigmaEngMpa * lambda;

    strResEl.textContent = sigmaEngMpa.toFixed(2) + ' MPa (' + Math.round(sigmaEngPsi) + ' psi Engineering)';
    truResEl.textContent = trueStressMpa.toFixed(2) + ' MPa True Cauchy Stress (' + Math.round((lambda - 1) * 100) + '% Strain)';
  }

  [lamEl, c10El, c01El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter uniaxial stretch ratio $\\lambda = L / L_0$ (e.g. $\\lambda = 2.0$ represents 100% engineering strain).',
      'Enter Mooney-Rivlin strain energy constants $C_{10}$ and $C_{01}$ in MPa.',
      'Inspect nominal engineering stress and true Cauchy stress for nonlinear FEA elastomer modeling.'
    ],
    benefitTitle: 'Melvin Mooney & Ronald Rivlin\'s Hyperelastic Law',
    benefitContent: 'Unlike metals that obey linear Hooke\'s law, rubber undergoes immense non-linear elastic stretch without yielding; the 2-parameter Mooney-Rivlin strain energy function accurately reproduces elastomer S-curves up to 200-300% elongation.',
    faqs: [{ q: 'What is the relationship between Mooney-Rivlin constants and Shear Modulus (G)?', a: 'Initial small-strain shear modulus $G = 2 \cdot (C_{10} + C_{01})$, and initial Young\'s modulus $E_0 = 6 \cdot (C_{10} + C_{01})$.' }]
  }
];

toolsSuiteLLL.forEach(createTool);
console.log('Suite LLL complete: 5 tools created.');
