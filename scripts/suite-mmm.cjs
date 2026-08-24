const { createTool } = require('./generate-curated-tools.cjs');

// Suite MMM: 5 Tools in Chemical Reaction Kinetics, Half-Life & Reactor Sizing to reach 635 tools
const toolsSuiteMMM = [
  // 1. First-Order Reaction Kinetics & Half-Life Calculator
  {
    slug: 'half-life-radioactive-first-order-decay-calculator',
    name: 'First-Order Reaction Kinetics & Half-Life (t₁/₂) Calculator',
    description: 'Calculate remaining reactant concentration (C_t = C₀ · e^(-k · t)), half-life (t₁/₂ = ln(2) / k = 0.69315 / k), and reaction duration for first-order chemical and radioactive decay.',
    category: 'Science',
    icon: 'text',
    keywords: ['first order reaction half life calculator', 'radioactive decay formula n0 exp minus kt', 't1 2 ln2 over k calculator', 'chemical reaction kinetics first order online', 'pharmacokinetic drug elimination half life online'],
    order: 508,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Concentration C₀ (M or %), Rate Constant k (time⁻¹) & Elapsed Time t',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fo-c0">Initial C₀ (M or %)</label>
          <input class="tool-textarea" id="fo-c0" type="number" step="any" value="100.0" placeholder="100.0%" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fo-k">Rate Constant k (h⁻¹)</label>
          <input class="tool-textarea" id="fo-k" type="number" step="any" value="0.1386" placeholder="0.1386 h⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fo-t">Elapsed Time t (hours)</label>
          <input class="tool-textarea" id="fo-t" type="number" step="any" value="10.0" placeholder="10.0 hours" />
        </div>
      </div>
      <div id="fo-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fo-res-ct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">25.00 M (25.0% Remaining)</span>
            <span class="stat-label">Remaining Concentration (C_t)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fo-res-thalf" style="font-weight:700;">t₁/₂ = 5.00 hours</span>
            <span class="stat-label">Half-Life Duration (ln 2 / k)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const c0El = document.getElementById('fo-c0'), kEl = document.getElementById('fo-k'), tEl = document.getElementById('fo-t');
  const ctResEl = document.getElementById('fo-res-ct'), thResEl = document.getElementById('fo-res-thalf');

  function update() {
    const C0 = parseFloat(c0El.value), k = parseFloat(kEl.value), t = parseFloat(tEl.value);
    if (isNaN(C0) || isNaN(k) || isNaN(t) || C0 <= 0 || k <= 0 || t < 0) return;

    // First order: C_t = C0 * exp(-k * t)
    const Ct = C0 * Math.exp(-k * t);
    const tHalf = Math.LN2 / k;
    const pctRemain = (Ct / C0) * 100;
    const halfLivesPassed = t / tHalf;

    ctResEl.textContent = Ct.toFixed(2) + ' (' + pctRemain.toFixed(1) + '% Remaining)';
    thResEl.textContent = 't₁/₂ = ' + tHalf.toFixed(2) + ' time units (' + halfLivesPassed.toFixed(2) + ' Half-Lives Passed)';
  }

  [c0El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial reactant concentration C₀ (in Molarity or percentage %).',
      'Enter first-order kinetic rate constant k ($s^{-1}$, $min^{-1}$, or $h^{-1}$).',
      'Enter elapsed reaction time duration t.',
      'Inspect remaining concentration $C_t$, half-life $t_{1/2}$, and elapsed half-life cycles.'
    ],
    benefitTitle: 'Concentration-Independent Half-Life',
    benefitContent: 'For all first-order chemical reactions and nuclear decay processes, half-life is completely independent of starting concentration ($t_{1/2} = \ln(2)/k \approx 0.693/k$), decaying by exactly 50% every cycle.',
    faqs: [{ q: 'How much drug remains after 5 half-lives?', a: 'After 5 half-lives, $(1/2)^5 = 1/32 = 3.125\%$ of the original drug remains in the bloodstream (96.875% cleared).' }]
  },

  // 2. Second-Order Reaction Kinetics & Half-Life Calculator
  {
    slug: 'second-order-reaction-rate-half-life-calculator',
    name: 'Second-Order Reaction Kinetics & Half-Life Calculator',
    description: 'Calculate remaining reactant concentration (1 / [A]_t = 1 / [A]₀ + k · t) and concentration-dependent half-life (t₁/₂ = 1 / (k · [A]₀)) for bimolecular second-order chemical reactions.',
    category: 'Science',
    icon: 'text',
    keywords: ['second order reaction calculator', 'second order kinetics half life formula', '1 over a0 plus kt calculator online', 'bimolecular reaction rate calculator', 'chemical kinetics second order online'],
    order: 509,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Concentration [A]₀ (M), Rate Constant k (M⁻¹·s⁻¹) & Time t (s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="so-a0">Initial [A]₀ (M)</label>
          <input class="tool-textarea" id="so-a0" type="number" step="any" value="0.50" placeholder="0.50 M" />
        </div>
        <div class="control-group">
          <label class="control-label" for="so-k">Rate k (M⁻¹·s⁻¹)</label>
          <input class="tool-textarea" id="so-k" type="number" step="any" value="0.040" placeholder="0.040 M⁻¹·s⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="so-t">Time t (seconds)</label>
          <input class="tool-textarea" id="so-t" type="number" step="any" value="100.0" placeholder="100.0 s" />
        </div>
      </div>
      <div id="so-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="so-res-at" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.167 M (33.3% Left)</span>
            <span class="stat-label">Remaining Concentration [A]_t</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="so-res-thalf" style="font-weight:700;">Initial t₁/₂ = 50.0 s</span>
            <span class="stat-label">First Half-Life (1 / (k · [A]₀))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const a0El = document.getElementById('so-a0'), kEl = document.getElementById('so-k'), tEl = document.getElementById('so-t');
  const atResEl = document.getElementById('so-res-at'), thResEl = document.getElementById('so-res-thalf');

  function update() {
    const A0 = parseFloat(a0El.value), k = parseFloat(kEl.value), t = parseFloat(tEl.value);
    if (isNaN(A0) || isNaN(k) || isNaN(t) || A0 <= 0 || k <= 0 || t < 0) return;

    // Second order: 1 / At = 1 / A0 + k * t  => At = 1 / (1/A0 + k*t)
    const invAt = (1 / A0) + (k * t);
    const At = 1 / invAt;
    const tHalf1 = 1 / (k * A0);
    const pctRemain = (At / A0) * 100;

    atResEl.textContent = At.toFixed(3) + ' M (' + pctRemain.toFixed(1) + '% Remaining)';
    thResEl.textContent = '1st t₁/₂ = ' + tHalf1.toFixed(1) + ' s (2nd t₁/₂ = ' + (tHalf1 * 2).toFixed(1) + ' s Doubled)';
  }

  [a0El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial reactant concentration $[A]_0$ in Moles/Liter (M).',
      'Enter second-order rate constant k in $M^{-1}s^{-1}$.',
      'Enter reaction elapsed duration time t in seconds.',
      'Inspect remaining concentration $[A]_t$ and initial half-life $t_{1/2}$.'
    ],
    benefitTitle: 'Concentration-Dependent Half-Life Doubling',
    benefitContent: 'In second-order reactions, molecular collisions govern the speed; as reactants are consumed and become dilute, each successive half-life takes exactly twice as long as the preceding one ($t_{1/2} = 1/(k\cdot[A]_0)$).',
    faqs: [{ q: 'Why does second-order half-life double each cycle?', a: 'Because $[A]$ is cut in half, $1/(k\cdot [A])$ doubles, causing reactions to slow dramatically at low concentrations.' }]
  },

  // 3. Plug Flow Reactor (PFR) Space-Time & Sizing Calculator
  {
    slug: 'pfr-plug-flow-reactor-space-time-calculator',
    name: 'Plug Flow Reactor (PFR) Space-Time (τ) & Sizing Calculator',
    description: 'Calculate ideal Plug Flow Tubular Reactor volume (V = v₀ · τ) and space-time (τ = - ln(1 - X) / k) for isothermal first-order liquid and gas reactions.',
    category: 'Science',
    icon: 'text',
    keywords: ['pfr reactor calculator', 'plug flow reactor space time tau formula', 'tubular reactor volume sizing calculator', 'pfr first order reaction conversion online', 'chemical reaction engineering pfr calculator'],
    order: 510,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Volumetric Flow v₀ (L/min), Target Conversion X (%) & Rate Constant k (min⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pfr-v0">Flow Rate v₀ (L / min)</label>
          <input class="tool-textarea" id="pfr-v0" type="number" step="any" value="50.0" placeholder="50.0 L/min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pfr-x">Target Conversion X (%)</label>
          <input class="tool-textarea" id="pfr-x" type="number" step="1" min="1" max="99.9" value="90" placeholder="90% Conversion" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pfr-k">Rate Constant k (min⁻¹)</label>
          <input class="tool-textarea" id="pfr-k" type="number" step="any" value="0.25" placeholder="0.25 min⁻¹" />
        </div>
      </div>
      <div id="pfr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pfr-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">460.5 Liters (0.461 m³)</span>
            <span class="stat-label">Required PFR Reactor Volume (V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pfr-res-tau" style="font-weight:700;">τ = 9.21 Minutes Space-Time</span>
            <span class="stat-label">Mean Residence Time (V / v₀)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v0El = document.getElementById('pfr-v0'), xEl = document.getElementById('pfr-x'), kEl = document.getElementById('pfr-k');
  const vResEl = document.getElementById('pfr-res-vol'), tauResEl = document.getElementById('pfr-res-tau');

  function update() {
    const v0 = parseFloat(v0El.value), xPct = parseFloat(xEl.value), k = parseFloat(kEl.value);
    if (isNaN(v0) || isNaN(xPct) || isNaN(k) || v0 <= 0 || xPct <= 0 || xPct >= 100 || k <= 0) return;

    const X = xPct / 100;
    // For 1st order PFR: tau = -ln(1 - X) / k  [min]
    const tau = -Math.log(1 - X) / k;
    // Volume V = v0 * tau  [Liters]
    const V_liters = v0 * tau;
    const V_m3 = V_liters / 1000;

    vResEl.textContent = V_liters.toFixed(1) + ' Liters (' + V_m3.toFixed(3) + ' m³)';
    tauResEl.textContent = 'τ = ' + tau.toFixed(2) + ' Minutes (' + Math.round(tau * 60) + ' seconds Residence Time)';
  }

  [v0El, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter volumetric feed flow rate $v_0$ in Liters per minute.',
      'Enter desired fractional chemical conversion percentage X (e.g. 90% or 95%).',
      'Enter first-order kinetic rate constant k ($min^{-1}$).',
      'Inspect required tubular PFR reactor volume and mean residence space-time $\\tau$.'
    ],
    benefitTitle: 'Octave Levenspiel Reactor Performance Law',
    benefitContent: 'Because tubular plug flow maintains high reactant concentration along the entire tube length with zero backmixing, a PFR requires significantly smaller volume than a stirred tank CSTR to achieve identical high chemical conversion.',
    faqs: [{ q: 'What is space-time (τ)?', a: 'Space-time $\\tau = V / v_0$ is the time required to process one reactor volume of feed at inlet conditions.' }]
  },

  // 4. Continuous Stirred Tank Reactor (CSTR) Sizing Calculator
  {
    slug: 'cstr-continuous-stirred-tank-reactor-volume-calculator',
    name: 'Continuous Stirred-Tank Reactor (CSTR) Volume Sizing Calculator',
    description: 'Calculate ideal CSTR tank volume (V = (v₀ · X) / (k · (1 - X))) for isothermal first-order liquid reactions and compare volume efficiency against PFR reactors.',
    category: 'Science',
    icon: 'text',
    keywords: ['cstr reactor calculator', 'continuous stirred tank reactor volume formula', 'cstr first order reaction sizing online', 'cstr vs pfr volume comparison calculator', 'chemical reaction engineering cstr online'],
    order: 511,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Rate v₀ (L/min), Target Conversion X (%) & Rate Constant k (min⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cstr-v0">Flow Rate v₀ (L / min)</label>
          <input class="tool-textarea" id="cstr-v0" type="number" step="any" value="50.0" placeholder="50.0 L/min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cstr-x">Target Conversion X (%)</label>
          <input class="tool-textarea" id="cstr-x" type="number" step="1" min="1" max="99.9" value="90" placeholder="90% Conversion" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cstr-k">Rate Constant k (min⁻¹)</label>
          <input class="tool-textarea" id="cstr-k" type="number" step="any" value="0.25" placeholder="0.25 min⁻¹" />
        </div>
      </div>
      <div id="cstr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cstr-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,800.0 Liters (1.80 m³)</span>
            <span class="stat-label">Required CSTR Tank Volume (V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cstr-res-ratio" style="color:#d97706; font-weight:700;">3.91x Larger than PFR (460.5 L)</span>
            <span class="stat-label">CSTR vs PFR Volume Ratio (V_CSTR / V_PFR)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v0El = document.getElementById('cstr-v0'), xEl = document.getElementById('cstr-x'), kEl = document.getElementById('cstr-k');
  const vResEl = document.getElementById('cstr-res-vol'), ratResEl = document.getElementById('cstr-res-ratio');

  function update() {
    const v0 = parseFloat(v0El.value), xPct = parseFloat(xEl.value), k = parseFloat(kEl.value);
    if (isNaN(v0) || isNaN(xPct) || isNaN(k) || v0 <= 0 || xPct <= 0 || xPct >= 100 || k <= 0) return;

    const X = xPct / 100;
    // For 1st order CSTR: tau = X / (k * (1 - X))  [min]
    const tauCstr = X / (k * (1 - X));
    const vCstr = v0 * tauCstr;

    // Equivalent PFR: tau = -ln(1 - X) / k
    const tauPfr = -Math.log(1 - X) / k;
    const vPfr = v0 * tauPfr;
    const ratio = vCstr / vPfr;

    vResEl.textContent = Math.round(vCstr).toLocaleString() + ' Liters (' + (vCstr / 1000).toFixed(2) + ' m³, τ = ' + tauCstr.toFixed(1) + ' min)';
    ratResEl.textContent = ratio.toFixed(2) + 'x Larger than PFR (' + Math.round(vPfr).toLocaleString() + ' L PFR)';
  }

  [v0El, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter volumetric feed rate $v_0$ in Liters/min.',
      'Enter desired fractional chemical conversion percentage X (e.g. 90%).',
      'Enter first-order reaction rate constant k ($min^{-1}$).',
      'Inspect required CSTR tank volume and size comparison multiplier against an equivalent PFR.'
    ],
    benefitTitle: 'Backmixing Dilution Effect in Continuous Stirred Tanks',
    benefitContent: 'Because fresh feed immediately mixes into the bulk liquid inside a CSTR, reaction occurs at the lowest exit concentration ($C_{A,\\text{exit}} = C_{A0}(1-X)$), requiring ~4x larger tank volume at 90% conversion compared to an unmixed tubular PFR.',
    faqs: [{ q: 'Why use a CSTR if PFR is smaller?', a: 'CSTRs provide superior temperature control for highly exothermic reactions and prevent hot spots through continuous agitation.' }]
  },

  // 5. Damköhler Number (Da_I) Reaction vs Convection Scaling Calculator
  {
    slug: 'damkohler-number-mass-transfer-reactor-calculator',
    name: 'Damköhler Number (Da_I) Chemical Reaction vs Flow Scaling Calculator',
    description: 'Calculate First Damköhler Number (Da_I = k · C_A0^(n-1) · τ) to determine whether chemical reactor conversion is reaction-rate limited (low Da) or convection/flow limited (high Da).',
    category: 'Science',
    icon: 'text',
    keywords: ['damkohler number calculator', 'damkohler number chemical reactor formula', 'da1 k tau conversion calculator', 'reaction rate vs residence time ratio online', 'dimensionless numbers reactor engineering calculator'],
    order: 512,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Kinetic Rate Constant k (s⁻¹) & Reactor Space-Time τ (seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dam-k">Rate Constant k (s⁻¹)</label>
          <input class="tool-textarea" id="dam-k" type="number" step="any" value="0.05" placeholder="0.05 s⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dam-tau">Space-Time τ (s)</label>
          <input class="tool-textarea" id="dam-tau" type="number" step="any" value="60.0" placeholder="60.0 seconds" />
        </div>
      </div>
      <div id="dam-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dam-res-da" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Da_I = 3.00</span>
            <span class="stat-label">First Damköhler Number (Da_I = k · τ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dam-res-conv" style="font-weight:700;">95.0% PFR Conversion (75.0% CSTR)</span>
            <span class="stat-label">Predicted Chemical Conversion</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('dam-k'), tauEl = document.getElementById('dam-tau');
  const daResEl = document.getElementById('dam-res-da'), cnResEl = document.getElementById('dam-res-conv');

  function update() {
    const k = parseFloat(kEl.value), tau = parseFloat(tauEl.value);
    if (isNaN(k) || isNaN(tau) || k <= 0 || tau <= 0) return;

    // First Damkohler number for 1st order: Da = k * tau
    const Da = k * tau;
    // PFR Conversion X_pfr = 1 - exp(-Da)
    const X_pfr = (1 - Math.exp(-Da)) * 100;
    // CSTR Conversion X_cstr = Da / (1 + Da)
    const X_cstr = (Da / (1 + Da)) * 100;

    daResEl.textContent = 'Da_I = ' + Da.toFixed(2);

    if (Da > 10.0) {
      cnResEl.textContent = 'Diffusion/Flow Controlled (Da > 10: Near 100% Conversion)';
      cnResEl.style.color = '#22543d';
    } else if (Da >= 1.0) {
      cnResEl.textContent = X_pfr.toFixed(1) + '% PFR Conversion (' + X_cstr.toFixed(1) + '% CSTR Conversion)';
      cnResEl.style.color = '#22543d';
    } else {
      cnResEl.textContent = 'Kinetically Controlled (Da < 1: Low Conversion ' + X_pfr.toFixed(1) + '%)';
      cnResEl.style.color = '#d97706';
    }
  }

  kEl.addEventListener('input', update);
  tauEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter first-order reaction rate constant k in $s^{-1}$.',
      'Enter reactor hydrodynamic residence space-time $\\tau$ in seconds.',
      'Inspect dimensionless Damköhler Number ($Da_I = k\\cdot\\tau$) and expected PFR / CSTR chemical conversion percentage.'
    ],
    benefitTitle: 'Gerhard Damköhler\'s 1936 Dimensionless Number',
    benefitContent: 'The Damköhler number relates the chemical reaction rate timescale to the fluid convective transport timescale; when $Da_I > 2$, reactors achieve over 85-95% chemical conversion.',
    faqs: [{ q: 'What is the conversion in a CSTR when Da = 1.0?', a: 'For a first-order reaction, $X = Da / (1 + Da) = 1.0 / (1 + 1.0) = 50.0\%$ conversion.' }]
  }
];

toolsSuiteMMM.forEach(createTool);
console.log('Suite MMM complete: 5 tools created.');
