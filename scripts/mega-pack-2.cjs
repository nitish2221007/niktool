const { createTool } = require('./generate-curated-tools.cjs');

const tools2 = [
  // 1. pH, pOH, and [H+] Ion Concentration Calculator
  {
    slug: 'ph-poh-hydrogen-ion-calculator',
    name: 'pH and pOH Hydrogen Ion Calculator',
    description: 'Convert between pH, pOH, hydrogen ion concentration [H+], and hydroxide ion concentration [OH-] with automatic acidity classification.',
    category: 'Science',
    icon: 'text',
    keywords: ['ph poh calculator', 'hydrogen ion concentration calculator', 'ph to poh converter', 'h+ to ph calculator', 'acid base ph calculator'],
    order: 109,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'pH / pOH / [H+] / [OH-] Interconversion',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ph-type">Input Known Variable:</label>
          <select class="tool-textarea" id="ph-type">
            <option value="ph" selected>pH Value (0 - 14)</option>
            <option value="poh">pOH Value (0 - 14)</option>
            <option value="h">Hydrogen Ion [H+] (mol/L)</option>
            <option value="oh">Hydroxide Ion [OH-] (mol/L)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ph-val">Value</label>
          <input class="tool-textarea" id="ph-val" type="text" value="7.4" placeholder="e.g. 7.4 or 1e-7" />
        </div>
      </div>
      <div id="ph-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
          <div class="stat">
            <span class="stat-value" id="ph-res-ph" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.40</span>
            <span class="stat-label">pH Level</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ph-res-poh" style="font-weight:700;">6.60</span>
            <span class="stat-label">pOH Level</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ph-res-h" style="font-family:monospace;">3.98 × 10⁻⁸</span>
            <span class="stat-label">[H⁺] (mol/L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ph-res-oh" style="font-family:monospace;">2.51 × 10⁻⁷</span>
            <span class="stat-label">[OH⁻] (mol/L)</span>
          </div>
          <div class="stat" style="grid-column:1 / -1;">
            <span class="stat-value" id="ph-res-class">Slightly Alkaline / Basic</span>
            <span class="stat-label">Solution Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const typeEl = document.getElementById('ph-type'), valEl = document.getElementById('ph-val');
  const phEl = document.getElementById('ph-res-ph'), pohEl = document.getElementById('ph-res-poh');
  const hEl = document.getElementById('ph-res-h'), ohEl = document.getElementById('ph-res-oh'), classEl = document.getElementById('ph-res-class');

  function update() {
    const type = typeEl.value;
    const raw = parseFloat(valEl.value);
    if (isNaN(raw) || raw <= 0) return;

    let pH = 7.0;
    if (type === 'ph') pH = raw;
    else if (type === 'poh') pH = 14.0 - raw;
    else if (type === 'h') pH = -Math.log10(raw);
    else if (type === 'oh') pH = 14.0 - (-Math.log10(raw));

    pH = Math.max(0, Math.min(14, pH));
    const pOH = 14.0 - pH;
    const hConc = Math.pow(10, -pH);
    const ohConc = Math.pow(10, -pOH);

    phEl.textContent = pH.toFixed(2);
    pohEl.textContent = pOH.toFixed(2);
    hEl.textContent = hConc.toExponential(2);
    ohEl.textContent = ohConc.toExponential(2);

    if (Math.abs(pH - 7.0) < 0.05) classEl.textContent = 'Neutral (Pure Water)';
    else if (pH < 3) classEl.textContent = 'Strongly Acidic';
    else if (pH < 7) classEl.textContent = 'Weakly Acidic';
    else if (pH < 11) classEl.textContent = 'Weakly Alkaline / Basic';
    else classEl.textContent = 'Strongly Alkaline / Basic';
  }

  typeEl.addEventListener('change', update);
  valEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Choose which parameter you know (pH, pOH, [H+], or [OH-]).',
      'Enter the numerical value (scientific notation like 1e-7 is supported).',
      'Inspect the full 4-parameter aqueous chemical equilibrium matrix.'
    ],
    benefitTitle: 'Aqueous pH Equilibrium',
    benefitContent: 'In pure water at 25 °C, the ion product Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴. Therefore, pH + pOH = 14 always holds in standard dilute solutions.',
    faqs: [{ q: 'What is human blood pH?', a: 'Normal arterial blood pH is tightly regulated between 7.35 and 7.45 (slightly alkaline).' }]
  },

  // 2. Henderson-Hasselbalch Buffer pH Calculator
  {
    slug: 'henderson-hasselbalch-buffer-calculator',
    name: 'Henderson-Hasselbalch Buffer Calculator',
    description: 'Calculate buffer solution pH (pH = pKa + log([A⁻]/[HA])) from acid dissociation constant pKa and conjugate acid-base concentrations.',
    category: 'Science',
    icon: 'text',
    keywords: ['henderson hasselbalch calculator', 'buffer ph calculator', 'pka to ph calculator', 'acid buffer solution calculator', 'conjugate base acid ratio'],
    order: 110,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Buffer System Inputs',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="buf-pka">Acid Dissociation pKa</label>
          <input class="tool-textarea" id="buf-pka" type="number" step="any" value="4.76" placeholder="e.g. 4.76 (Acetic Acid)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="buf-base">Conjugate Base [A⁻] (M)</label>
          <input class="tool-textarea" id="buf-base" type="number" step="any" value="0.1" placeholder="e.g. 0.1 M" />
        </div>
        <div class="control-group">
          <label class="control-label" for="buf-acid">Weak Acid [HA] (M)</label>
          <input class="tool-textarea" id="buf-acid" type="number" step="any" value="0.1" placeholder="e.g. 0.1 M" />
        </div>
      </div>
      <div id="buf-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="buf-res-ph" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Buffer Solution pH</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="buf-res-ratio" style="font-weight:700;">-</span>
            <span class="stat-label">Base/Acid Ratio ([A⁻]/[HA])</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pkaEl = document.getElementById('buf-pka'), baseEl = document.getElementById('buf-base'), acidEl = document.getElementById('buf-acid');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('buf-res-card');
  const resPh = document.getElementById('buf-res-ph'), resRatio = document.getElementById('buf-res-ratio');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const pKa = parseFloat(pkaEl.value);
    const base = parseFloat(baseEl.value);
    const acid = parseFloat(acidEl.value);

    if (isNaN(pKa) || isNaN(base) || isNaN(acid) || base <= 0 || acid <= 0) {
      setMsg('Please enter positive concentrations for acid and base.', true);
      resCard.style.display = 'none'; return;
    }

    const ratio = base / acid;
    const pH = pKa + Math.log10(ratio);

    resPh.textContent = pH.toFixed(2);
    resRatio.textContent = ratio.toFixed(3);

    resCard.style.display = 'block';
    setMsg('Buffer pH calculated.');
  });

  clearBtn.addEventListener('click', () => {
    pkaEl.value = '4.76'; baseEl.value = '0.1'; acidEl.value = '0.1'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the pKa of your weak acid.',
      'Enter the molar concentrations of conjugate base [A⁻] and weak acid [HA].',
      'Click <strong>Calculate</strong> to inspect buffer pH.'
    ],
    benefitTitle: 'Henderson-Hasselbalch Equation',
    benefitContent: 'The Henderson-Hasselbalch equation relates pH to acid dissociation constant pKa: pH = pKa + log([A⁻]/[HA]). When [A⁻] = [HA], pH = pKa, which provides maximum buffer capacity.',
    faqs: [{ q: 'What is buffer capacity?', a: 'Buffer capacity is the amount of strong acid or base a buffer can absorb before significant pH changes occur; it is highest within ±1 pH unit of pKa.' }]
  },

  // 3. Boyle's Law Gas Calculator (P1·V1 = P2·V2)
  {
    slug: 'boyles-law-gas-calculator',
    name: 'Boyle\'s Law Gas Calculator',
    description: 'Solve for pressure or volume in isothermal gas expansion and compression using Boyle\'s law P₁ · V₁ = P₂ · V₂.',
    category: 'Science',
    icon: 'text',
    keywords: ['boyles law calculator', 'isothermal gas calculator', 'p1v1 p2v2 calculator', 'gas pressure volume calculator', 'chemistry boyle formula'],
    order: 111,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Boyle\'s Law Equation (P₁V₁ = P₂V₂)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="boyle-solve">Solve For:</label>
        <select class="tool-textarea" id="boyle-solve">
          <option value="P2" selected>Final Pressure (P₂)</option>
          <option value="V2">Final Volume (V₂)</option>
          <option value="P1">Initial Pressure (P₁)</option>
          <option value="V1">Initial Volume (V₁)</option>
        </select>
      </div>
      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:1rem;">
        <div class="control-group" id="grp-bp1">
          <label class="control-label" for="boyle-p1">Initial Pressure P₁ (atm / kPa)</label>
          <input class="tool-textarea" id="boyle-p1" type="number" step="any" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group" id="grp-bv1">
          <label class="control-label" for="boyle-v1">Initial Volume V₁ (Liters)</label>
          <input class="tool-textarea" id="boyle-v1" type="number" step="any" value="10.0" placeholder="10.0" />
        </div>
        <div class="control-group" id="grp-bp2" style="display:none;">
          <label class="control-label" for="boyle-p2">Final Pressure P₂</label>
          <input class="tool-textarea" id="boyle-p2" type="number" step="any" value="2.0" placeholder="2.0" />
        </div>
        <div class="control-group" id="grp-bv2">
          <label class="control-label" for="boyle-v2">Final Volume V₂</label>
          <input class="tool-textarea" id="boyle-v2" type="number" step="any" value="5.0" placeholder="5.0" />
        </div>
      </div>
      <div id="boyle-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="boyle-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Calculated Result</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const solveEl = document.getElementById('boyle-solve');
  const p1El = document.getElementById('boyle-p1'), v1El = document.getElementById('boyle-v1');
  const p2El = document.getElementById('boyle-p2'), v2El = document.getElementById('boyle-v2');
  const grpP1 = document.getElementById('grp-bp1'), grpV1 = document.getElementById('grp-bv1');
  const grpP2 = document.getElementById('grp-bp2'), grpV2 = document.getElementById('grp-bv2');

  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('boyle-res-card'), resVal = document.getElementById('boyle-res-val');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  function update() {
    const s = solveEl.value;
    grpP1.style.display = s === 'P1' ? 'none' : 'block';
    grpV1.style.display = s === 'V1' ? 'none' : 'block';
    grpP2.style.display = s === 'P2' ? 'none' : 'block';
    grpV2.style.display = s === 'V2' ? 'none' : 'block';
    resCard.style.display = 'none';
  }

  solveEl.addEventListener('change', update);
  update();

  btn.addEventListener('click', () => {
    const s = solveEl.value;
    const p1 = parseFloat(p1El.value), v1 = parseFloat(v1El.value);
    const p2 = parseFloat(p2El.value), v2 = parseFloat(v2El.value);

    let res = 0, label = '';
    if (s === 'P2') {
      if (isNaN(p1) || isNaN(v1) || isNaN(v2) || p1 <= 0 || v1 <= 0 || v2 <= 0) { setMsg('Please enter positive values.', true); return; }
      res = (p1 * v1) / v2; label = 'P₂ = ' + res.toFixed(3) + ' pressure units';
    } else if (s === 'V2') {
      if (isNaN(p1) || isNaN(v1) || isNaN(p2) || p1 <= 0 || v1 <= 0 || p2 <= 0) { setMsg('Please enter positive values.', true); return; }
      res = (p1 * v1) / p2; label = 'V₂ = ' + res.toFixed(3) + ' volume units';
    } else if (s === 'P1') {
      if (isNaN(p2) || isNaN(v2) || isNaN(v1) || p2 <= 0 || v2 <= 0 || v1 <= 0) { setMsg('Please enter positive values.', true); return; }
      res = (p2 * v2) / v1; label = 'P₁ = ' + res.toFixed(3) + ' pressure units';
    } else if (s === 'V1') {
      if (isNaN(p2) || isNaN(v2) || isNaN(p1) || p2 <= 0 || v2 <= 0 || p1 <= 0) { setMsg('Please enter positive values.', true); return; }
      res = (p2 * v2) / p1; label = 'V₁ = ' + res.toFixed(3) + ' volume units';
    }

    resVal.textContent = label;
    resCard.style.display = 'block';
    setMsg('Boyle\'s Law computed.');
  });

  clearBtn.addEventListener('click', () => {
    p1El.value = '1.0'; v1El.value = '10.0'; p2El.value = '2.0'; v2El.value = '5.0'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Select the variable to solve (P₁, V₁, P₂, or V₂).',
      'Enter the known initial and final states.',
      'Click <strong>Calculate</strong> to inspect the isothermal pressure-volume result.'
    ],
    benefitTitle: 'Boyle\'s Law Principle',
    benefitContent: 'At constant temperature, the absolute pressure and volume of a fixed mass of ideal gas are inversely proportional (P₁V₁ = P₂V₂ = constant). Halving the gas volume doubles its pressure.',
    faqs: [{ q: 'Does Boyle\'s Law hold during temperature changes?', a: 'No, Boyle\'s Law strictly assumes an isothermal process with constant temperature (T₁ = T₂).' }]
  },

  // 4. Charles's Law Gas Calculator (V1/T1 = V2/T2)
  {
    slug: 'charles-law-gas-calculator',
    name: 'Charles\'s Law Gas Calculator',
    description: 'Calculate volume or absolute temperature in isobaric gas heating and cooling using Charles\'s law V₁ / T₁ = V₂ / T₂.',
    category: 'Science',
    icon: 'text',
    keywords: ['charles law calculator', 'isobaric gas calculator', 'v1 t1 v2 t2 calculator', 'gas volume temperature calculator', 'charles law formula online'],
    order: 112,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Charles\'s Law Equation (V₁/T₁ = V₂/T₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ch-v1">Initial Volume V₁ (Liters)</label>
          <input class="tool-textarea" id="ch-v1" type="number" step="any" value="5.0" placeholder="5.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ch-t1">Initial Temperature T₁ (Kelvin K)</label>
          <input class="tool-textarea" id="ch-t1" type="number" step="any" value="293.15" placeholder="293.15 K (20°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ch-t2">Final Temperature T₂ (Kelvin K)</label>
          <input class="tool-textarea" id="ch-t2" type="number" step="any" value="373.15" placeholder="373.15 K (100°C)" />
        </div>
      </div>
      <div id="ch-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ch-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Final Expanded Volume (V₂)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v1El = document.getElementById('ch-v1'), t1El = document.getElementById('ch-t1'), t2El = document.getElementById('ch-t2');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('ch-res-card'), resVal = document.getElementById('ch-res-val');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v1 = parseFloat(v1El.value), t1 = parseFloat(t1El.value), t2 = parseFloat(t2El.value);
    if (isNaN(v1) || isNaN(t1) || isNaN(t2) || v1 <= 0 || t1 <= 0 || t2 <= 0) {
      setMsg('Please enter positive numbers (Temperature must be in Kelvin > 0).', true);
      resCard.style.display = 'none'; return;
    }

    // V2 = V1 * (T2 / T1)
    const v2 = v1 * (t2 / t1);
    resVal.textContent = v2.toFixed(3) + ' Liters';
    resCard.style.display = 'block';
    setMsg('Charles\'s Law computed.');
  });

  clearBtn.addEventListener('click', () => {
    v1El.value = '5.0'; t1El.value = '293.15'; t2El.value = '373.15'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter initial volume and absolute temperature in Kelvin (K = °C + 273.15).',
      'Enter the new final temperature in Kelvin.',
      'Click <strong>Calculate</strong> to inspect the expanded or contracted gas volume.'
    ],
    benefitTitle: 'Isobaric Gas Expansion',
    benefitContent: 'Charles\'s law states that at constant pressure, volume is directly proportional to absolute Kelvin temperature (V/T = k).',
    faqs: [{ q: 'Why must temperature be in Kelvin?', a: 'Kelvin measures absolute thermal kinetic energy starting from absolute zero (0 K); Celsius gives mathematical division errors.' }]
  },

  // 5. Activation Energy Arrhenius Equation Calculator
  {
    slug: 'activation-energy-arrhenius-calculator',
    name: 'Activation Energy Arrhenius Calculator',
    description: 'Calculate reaction activation energy (Ea) or reaction rate constant ratio (k2/k1) at two temperatures using the Arrhenius equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['activation energy calculator', 'arrhenius equation calculator', 'reaction rate constant ratio', 'chemistry activation energy online', 'arrhenius kinetics calculator'],
    order: 113,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Two-Point Arrhenius Rate Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="arr-t1">Initial Temperature T₁ (K)</label>
          <input class="tool-textarea" id="arr-t1" type="number" step="any" value="298.15" placeholder="298.15 K (25°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arr-k1">Rate Constant k₁</label>
          <input class="tool-textarea" id="arr-k1" type="number" step="any" value="0.015" placeholder="0.015" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arr-t2">Second Temperature T₂ (K)</label>
          <input class="tool-textarea" id="arr-t2" type="number" step="any" value="318.15" placeholder="318.15 K (45°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arr-k2">Rate Constant k₂</label>
          <input class="tool-textarea" id="arr-k2" type="number" step="any" value="0.045" placeholder="0.045" />
        </div>
      </div>
      <div id="arr-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="arr-res-ea" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Activation Energy (Ea)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="arr-res-ratio" style="font-weight:700;">-</span>
            <span class="stat-label">Rate Acceleration Factor (k₂/k₁)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t1El = document.getElementById('arr-t1'), k1El = document.getElementById('arr-k1');
  const t2El = document.getElementById('arr-t2'), k2El = document.getElementById('arr-k2');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('arr-res-card');
  const resEa = document.getElementById('arr-res-ea'), resRatio = document.getElementById('arr-res-ratio');

  const R = 8.314462; // J / (mol K)

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const t1 = parseFloat(t1El.value), k1 = parseFloat(k1El.value);
    const t2 = parseFloat(t2El.value), k2 = parseFloat(k2El.value);

    if (isNaN(t1) || isNaN(k1) || isNaN(t2) || isNaN(k2) || t1 <= 0 || k1 <= 0 || t2 <= 0 || k2 <= 0 || t1 === t2) {
      setMsg('Please enter valid positive values with different temperatures.', true);
      resCard.style.display = 'none'; return;
    }

    // ln(k2/k1) = (-Ea / R) * (1/T2 - 1/T1) = (Ea / R) * (1/T1 - 1/T2)
    // Ea = (R * ln(k2/k1)) / (1/T1 - 1/T2)
    const ratio = k2 / k1;
    const eaJoules = (R * Math.log(ratio)) / ((1 / t1) - (1 / t2));
    const eaKj = eaJoules / 1000;

    resEa.textContent = eaKj.toFixed(2) + ' kJ/mol (' + eaJoules.toFixed(0) + ' J/mol)';
    resRatio.textContent = ratio.toFixed(2) + 'x Faster';

    resCard.style.display = 'block';
    setMsg('Activation energy computed.');
  });

  clearBtn.addEventListener('click', () => {
    t1El.value = '298.15'; k1El.value = '0.015'; t2El.value = '318.15'; k2El.value = '0.045'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter initial temperature T₁ and observed reaction rate constant k₁.',
      'Enter elevated temperature T₂ and new rate constant k₂.',
      'Click <strong>Calculate</strong> to inspect the activation energy barrier in kJ/mol.'
    ],
    benefitTitle: 'Chemical Kinetics & Temperature Sensitivity',
    benefitContent: 'Arrhenius kinetics explains why reaction rates increase exponentially with temperature: higher thermal energy enables a greater fraction of colliding molecules to surpass the activation energy barrier Ea.',
    faqs: [{ q: 'What is the standard rule of thumb for chemical reaction rates?', a: 'For many common chemical reactions near room temperature, the reaction rate approximately doubles for every 10 °C increase in temperature.' }]
  }
];

tools2.forEach(createTool);
console.log('Mega pack 2 complete.');
