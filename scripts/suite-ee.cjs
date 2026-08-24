const { createTool } = require('./generate-curated-tools.cjs');

// Suite EE: 5 Tools in Biochemistry, Enzyme Kinetics & Chemical Reaction Rates to reach 463 tools
const toolsSuiteEE = [
  // 1. Michaelis-Menten Enzyme Kinetics Velocity Calculator
  {
    slug: 'michaelis-menten-enzyme-kinetics-calculator',
    name: 'Michaelis-Menten Enzyme Kinetics Calculator',
    description: 'Calculate initial biochemical enzymatic reaction rate (v = (V_max · [S]) / (K_m + [S])) from substrate concentration [S], maximum velocity V_max, and Michaelis constant K_m.',
    category: 'Science',
    icon: 'text',
    keywords: ['michaelis menten calculator', 'enzyme kinetics velocity calculator', 'vmax km substrate concentration formula', 'biochemistry enzyme reaction rate', 'michaelis menten curve online'],
    order: 334,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'V_max, Michaelis Constant (K_m) & Substrate [S]',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mm-vmax">Max Velocity V_max (μM/s)</label>
          <input class="tool-textarea" id="mm-vmax" type="number" step="any" value="100" placeholder="100 μM/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-km">Michaelis Constant K_m (mM)</label>
          <input class="tool-textarea" id="mm-km" type="number" step="any" value="5.0" placeholder="5.0 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-s">Substrate Conc. [S] (mM)</label>
          <input class="tool-textarea" id="mm-s" type="number" step="any" value="5.0" placeholder="5.0 mM" />
        </div>
      </div>
      <div id="mm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mm-res-v0" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">50.00 μM / s</span>
            <span class="stat-label">Initial Velocity (v₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mm-res-pct" style="font-weight:700;">50.0% of V_max</span>
            <span class="stat-label">Fractional Enzyme Saturation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vmEl = document.getElementById('mm-vmax'), kmEl = document.getElementById('mm-km'), sEl = document.getElementById('mm-s');
  const v0ResEl = document.getElementById('mm-res-v0'), pctResEl = document.getElementById('mm-res-pct');

  function update() {
    const Vmax = parseFloat(vmEl.value), Km = parseFloat(kmEl.value), S = parseFloat(sEl.value);
    if (isNaN(Vmax) || isNaN(Km) || isNaN(S) || Vmax <= 0 || Km <= 0 || S < 0) return;

    // v = (Vmax * [S]) / (Km + [S])
    const v0 = (Vmax * S) / (Km + S);
    const fracSat = (v0 / Vmax) * 100;

    v0ResEl.textContent = v0.toFixed(2) + ' μM / s';
    pctResEl.textContent = fracSat.toFixed(1) + '% of V_max';
  }

  [vmEl, kmEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter maximum enzyme catalytic velocity V_max in μM/s.',
      'Enter Michaelis constant K_m in millimolar (mM).',
      'Enter substrate concentration [S] in mM.',
      'Inspect initial reaction rate velocity (v₀) and fractional catalytic saturation.'
    ],
    benefitTitle: 'Leonor Michaelis and Maud Menten\'s 1913 Discovery',
    benefitContent: 'When [S] equals exactly K_m, reaction velocity equals exactly half of maximum speed (v = V_max / 2), establishing K_m as the definitive quantitative metric of enzyme-substrate affinity.',
    faqs: [{ q: 'What does a low K_m value signify?', a: 'A low K_m indicates high enzyme-substrate binding affinity, meaning only low substrate concentrations are needed to reach half-maximal velocity.' }]
  },

  // 2. Lineweaver-Burk Double Reciprocal Plot Calculator
  {
    slug: 'lineweaver-burk-double-reciprocal-calculator',
    name: 'Lineweaver-Burk Double Reciprocal Kinetics Calculator',
    description: 'Calculate double-reciprocal coordinates (1/v = (K_m / V_max) · (1/[S]) + 1/V_max), x-intercept (-1/K_m), and y-intercept (1/V_max) for enzyme inhibitor classification.',
    category: 'Science',
    icon: 'text',
    keywords: ['lineweaver burk calculator', 'double reciprocal plot calculator', 'enzyme inhibitor type lineweaver burk', '1 v vs 1 s plot calculator', 'competitive noncompetitive inhibition online'],
    order: 335,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'V_max & K_m Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lb-vmax">V_max (μmol / min)</label>
          <input class="tool-textarea" id="lb-vmax" type="number" step="any" value="50" placeholder="50" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lb-km">K_m (mM)</label>
          <input class="tool-textarea" id="lb-km" type="number" step="any" value="2.5" placeholder="2.5 mM" />
        </div>
      </div>
      <div id="lb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lb-res-slope" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Slope = 0.0500</span>
            <span class="stat-label">Slope (K_m / V_max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lb-res-yint" style="font-weight:700;">y-intercept = 0.0200</span>
            <span class="stat-label">1 / V_max</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lb-res-xint">-0.4000 mM⁻¹</span>
            <span class="stat-label">x-intercept (-1 / K_m)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vmEl = document.getElementById('lb-vmax'), kmEl = document.getElementById('lb-km');
  const slEl = document.getElementById('lb-res-slope'), yEl = document.getElementById('lb-res-yint'), xEl = document.getElementById('lb-res-xint');

  function update() {
    const Vmax = parseFloat(vmEl.value), Km = parseFloat(kmEl.value);
    if (isNaN(Vmax) || isNaN(Km) || Vmax <= 0 || Km <= 0) return;

    // 1/v = (Km/Vmax) * (1/[S]) + (1/Vmax)
    const slope = Km / Vmax;
    const yInt = 1 / Vmax;
    const xInt = -1 / Km;

    slEl.textContent = 'Slope = ' + slope.toFixed(4);
    yEl.textContent = 'y-int = ' + yInt.toFixed(4) + ' (1/V_max)';
    xEl.textContent = xInt.toFixed(4) + ' mM⁻¹ (-1/K_m)';
  }

  vmEl.addEventListener('input', update);
  kmEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter biochemical V_max and K_m.',
      'Inspect the linear double-reciprocal regression slope, y-intercept (1/V_max), and x-intercept (-1/K_m).'
    ],
    benefitTitle: 'Diagnosing Competitive vs Noncompetitive Inhibitors',
    benefitContent: 'Competitive inhibitors increase K_m without altering V_max (swiveling the slope at the same y-intercept), whereas noncompetitive inhibitors decrease V_max with unchanged K_m (shifting the y-intercept upward).',
    faqs: [{ q: 'What is the x-intercept of a Lineweaver-Burk plot?', a: 'The x-intercept equals exactly -1 / K_m.' }]
  },

  // 3. Amino Acid & Peptide Isoelectric Point (pI) Calculator
  {
    slug: 'isoelectric-point-pi-amino-acids-calculator',
    name: 'Isoelectric Point (pI) Amino Acid & Peptide Calculator',
    description: 'Calculate the isoelectric point (pI = (pK₁ + pK₂) / 2) and net molecular electrical charge for amino acids and peptides across pH gradients.',
    category: 'Science',
    icon: 'text',
    keywords: ['isoelectric point calculator', 'pi calculator amino acids', 'peptide isoelectric point formula', 'zwitterion net charge zero pi', 'gel electrophoresis pi calculator'],
    order: 336,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ionizable Group Dissociation Constants (pK_a)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pi-pk1">α-Carboxyl (pK₁)</label>
          <input class="tool-textarea" id="pi-pk1" type="number" step="any" value="2.34" placeholder="2.34 (Glycine)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pi-pk2">α-Amino (pK₂)</label>
          <input class="tool-textarea" id="pi-pk2" type="number" step="any" value="9.60" placeholder="9.60 (Glycine)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pi-ph">Environmental pH</label>
          <input class="tool-textarea" id="pi-ph" type="number" step="0.1" value="7.4" placeholder="7.4 (Blood pH)" />
        </div>
      </div>
      <div id="pi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pi-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">pI = 5.97</span>
            <span class="stat-label">Isoelectric Point (Zero Net Charge)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pi-res-state" style="color:#2563eb; font-weight:700;">Neutral Zwitterion</span>
            <span class="stat-label">Ionization State at pH 7.4</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pk1El = document.getElementById('pi-pk1'), pk2El = document.getElementById('pi-pk2'), phEl = document.getElementById('pi-ph');
  const piResEl = document.getElementById('pi-res-val'), stResEl = document.getElementById('pi-res-state');

  function update() {
    const pk1 = parseFloat(pk1El.value), pk2 = parseFloat(pk2El.value), ph = parseFloat(phEl.value);
    if (isNaN(pk1) || isNaN(pk2) || isNaN(ph)) return;

    // pI = (pK1 + pK2) / 2
    const pI = (pk1 + pk2) / 2;

    piResEl.textContent = 'pI = ' + pI.toFixed(2);

    if (Math.abs(ph - pI) < 0.2) {
      stResEl.textContent = 'Neutral Zwitterionic Form (Net Charge ≈ 0)';
      stResEl.style.color = '#22543d';
    } else if (ph < pI) {
      stResEl.textContent = 'Positively Charged Cation (pH < pI, Migrates to Cathode)';
      stResEl.style.color = '#2563eb';
    } else {
      stResEl.textContent = 'Negatively Charged Anion (pH > pI, Migrates to Anode)';
      stResEl.style.color = '#c53030';
    }
  }

  [pk1El, pk2El, phEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pK_a values for the relevant ionizable acid-base functional groups.',
      'Enter ambient solution pH.',
      'Inspect the computed isoelectric point (pI) and molecular net charge status.'
    ],
    benefitTitle: 'Isoelectric Focusing (IEF) Protein Separation',
    benefitContent: 'In an electric field, proteins migrate through a continuous pH gradient until they reach their unique isoelectric point (pI) where net charge becomes zero and electrophoresis migration ceases.',
    faqs: [{ q: 'What is the pI of Glycine (pK₁ = 2.34, pK₂ = 9.60)?', a: 'pI = (2.34 + 9.60) / 2 = 11.94 / 2 = 5.97.' }]
  },

  // 4. Arrhenius Chemical Reaction Activation Energy (Ea) Calculator
  {
    slug: 'arrhenius-equation-activation-energy-calculator',
    name: 'Arrhenius Equation & Activation Energy (Eₐ) Calculator',
    description: 'Calculate reaction rate constants (k = A · e^(-Eₐ / (R·T))) and determine chemical activation energy Eₐ from two temperatures (T₁, T₂) and rates (k₁, k₂).',
    category: 'Science',
    icon: 'text',
    keywords: ['arrhenius equation calculator', 'activation energy ea calculator', 'reaction rate temperature dependence', 'arrhenius formula k a exp', 'two temperature activation energy online'],
    order: 337,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Temperatures T₁, T₂ & Rate Constants k₁, k₂',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="arr-t1">Temp T₁ (°C)</label>
          <input class="tool-textarea" id="arr-t1" type="number" step="any" value="25" placeholder="25 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arr-k1">Rate k₁ (s⁻¹)</label>
          <input class="tool-textarea" id="arr-k1" type="number" step="any" value="0.015" placeholder="0.015" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arr-t2">Temp T₂ (°C)</label>
          <input class="tool-textarea" id="arr-t2" type="number" step="any" value="45" placeholder="45 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arr-k2">Rate k₂ (s⁻¹)</label>
          <input class="tool-textarea" id="arr-k2" type="number" step="any" value="0.065" placeholder="0.065" />
        </div>
      </div>
      <div id="arr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="arr-res-ea" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">58.07 kJ / mol</span>
            <span class="stat-label">Activation Energy (Eₐ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="arr-res-factor" style="font-weight:700;">4.33x Speedup</span>
            <span class="stat-label">Reaction Rate Ratio (k₂ / k₁)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t1El = document.getElementById('arr-t1'), k1El = document.getElementById('arr-k1');
  const t2El = document.getElementById('arr-t2'), k2El = document.getElementById('arr-k2');
  const eaResEl = document.getElementById('arr-res-ea'), facResEl = document.getElementById('arr-res-factor');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const t1C = parseFloat(t1El.value), k1 = parseFloat(k1El.value);
    const t2C = parseFloat(t2El.value), k2 = parseFloat(k2El.value);

    if (isNaN(t1C) || isNaN(k1) || isNaN(t2C) || isNaN(k2) || k1 <= 0 || k2 <= 0 || t1C === t2C) return;

    const T1 = t1C + 273.15;
    const T2 = t2C + 273.15;

    // ln(k2 / k1) = -(Ea / R) * (1/T2 - 1/T1) = (Ea / R) * (1/T1 - 1/T2)
    // Ea = (R * ln(k2 / k1)) / (1/T1 - 1/T2)
    const EaJoules = (R * Math.log(k2 / k1)) / ((1 / T1) - (1 / T2));
    const EaKj = EaJoules / 1000;
    const factor = k2 / k1;

    eaResEl.textContent = EaKj.toFixed(2) + ' kJ / mol';
    facResEl.textContent = factor.toFixed(2) + 'x Rate Increase';
  }

  [t1El, k1El, t2El, k2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter temperatures T₁ and T₂ in Celsius.',
      'Enter corresponding measured chemical reaction rates k₁ and k₂.',
      'Inspect molecular Activation Energy Eₐ in kJ/mol.'
    ],
    benefitTitle: 'Svante Arrhenius\' 1889 Rate Law',
    benefitContent: 'Arrhenius proved that molecules must overcome a kinetic energy barrier (Activation Energy Eₐ) to form transition states during chemical collisions.',
    faqs: [{ q: 'Why does reaction rate double every 10°C rise?', a: 'For typical organic reactions with Eₐ ≈ 50 kJ/mol, a 10°C temperature increase roughly doubles the fraction of collisions with energy exceeding Eₐ.' }]
  },

  // 5. Van 't Hoff Chemical Equilibrium Isochore Calculator
  {
    slug: 'van-t-hoff-equation-isochore-calculator',
    name: 'Van \'t Hoff Reaction Equilibrium & Enthalpy Calculator',
    description: 'Calculate equilibrium constant temperature shifts (ln(K₂/K₁) = (-ΔH° / R) · (1/T₂ - 1/T₁)) and reaction standard enthalpy ΔH° for endothermic and exothermic reactions.',
    category: 'Science',
    icon: 'text',
    keywords: ['van t hoff equation calculator', 'equilibrium constant temperature calculator', 'reaction enthalpy van t hoff formula', 'k1 k2 equilibrium shift calculator', 'chemical thermodynamics isochore online'],
    order: 338,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Standard Enthalpy ΔH° (kJ/mol), T₁ & T₂',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vth-dh">Enthalpy ΔH° (kJ/mol)</label>
          <input class="tool-textarea" id="vth-dh" type="number" step="any" value="-92.4" placeholder="-92.4 (Exothermic Haber Process)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vth-t1">Initial Temp T₁ (°C)</label>
          <input class="tool-textarea" id="vth-t1" type="number" step="any" value="25" placeholder="25 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vth-t2">Final Temp T₂ (°C)</label>
          <input class="tool-textarea" id="vth-t2" type="number" step="any" value="200" placeholder="200 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vth-k1">Initial K₁</label>
          <input class="tool-textarea" id="vth-k1" type="number" step="any" value="1.0" placeholder="1.0" />
        </div>
      </div>
      <div id="vth-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vth-res-k2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem; font-family:monospace;">8.58 × 10⁻⁷</span>
            <span class="stat-label">New Equilibrium Constant (K₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vth-res-shift" style="color:#c53030; font-weight:700;">Equilibrium Shifts Left (Reactants)</span>
            <span class="stat-label">Le Chatelier Direction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dhEl = document.getElementById('vth-dh'), t1El = document.getElementById('vth-t1'), t2El = document.getElementById('vth-t2'), k1El = document.getElementById('vth-k1');
  const k2ResEl = document.getElementById('vth-res-k2'), shResEl = document.getElementById('vth-res-shift');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const dhKj = parseFloat(dhEl.value), t1C = parseFloat(t1El.value), t2C = parseFloat(t2El.value), k1 = parseFloat(k1El.value);
    if (isNaN(dhKj) || isNaN(t1C) || isNaN(t2C) || isNaN(k1) || k1 <= 0 || t1C === t2C) return;

    const T1 = t1C + 273.15;
    const T2 = t2C + 273.15;
    const dhJoules = dhKj * 1000;

    // ln(K2 / K1) = -(dH / R) * (1/T2 - 1/T1)
    const lnRatio = -(dhJoules / R) * ((1 / T2) - (1 / T1));
    const k2 = k1 * Math.exp(lnRatio);

    k2ResEl.textContent = (k2 >= 0.01 && k2 <= 1000) ? k2.toFixed(3) : k2.toExponential(2);

    if (k2 > k1) {
      shResEl.textContent = 'Equilibrium Shifts Right (Favors Products)';
      shResEl.style.color = '#22543d';
    } else {
      shResEl.textContent = 'Equilibrium Shifts Left (Favors Reactants)';
      shResEl.style.color = '#c53030';
    }
  }

  [dhEl, t1El, t2El, k1El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reaction standard enthalpy ΔH° in kJ/mol (negative for exothermic, positive for endothermic).',
      'Enter initial temperature T₁ and target operational temperature T₂ in Celsius.',
      'Enter baseline equilibrium constant K₁.',
      'Inspect shifted equilibrium constant K₂ and Le Chatelier shift direction.'
    ],
    benefitTitle: 'Jacobus Henricus van \'t Hoff (First Chemistry Nobel Laureate)',
    benefitContent: 'The Van \'t Hoff equation quantitatively demonstrates Le Chatelier\'s principle: heating an exothermic reaction (ΔH < 0) suppresses product formation (driving equilibrium back to reactants), explaining the high-temperature trade-offs in Haber ammonia synthesis.',
    faqs: [{ q: 'How does temperature affect an endothermic reaction?', a: 'Heating an endothermic reaction (ΔH > 0) increases the equilibrium constant K, shifting equilibrium towards higher product yields.' }]
  }
];

toolsSuiteEE.forEach(createTool);
console.log('Suite EE complete: 5 tools created.');
