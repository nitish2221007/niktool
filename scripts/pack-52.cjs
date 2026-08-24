const { createTool } = require('./generate-curated-tools.cjs');

// Pack 52: 25 Biomedical Engineering, Biomechanics, Medical Imaging & Physiological Modeling Calculators (Tools 1551 to 1575)
const pack52Tools = [
  // 1. Michaelis-Menten Enzyme Kinetics Calculator
  {
    slug: 'michaelis-menten-enzyme-kinetics-km-vmax-calculator',
    name: 'Michaelis-Menten Enzyme Kinetics (v = V_max·[S] / (K_m + [S])) Calculator',
    description: 'Calculate biochemical enzyme reaction velocity v in μmol/(L·min) (Michaelis-Menten Equation: v = V_max · [S] / (K_m + [S])), catalytic efficiency k_cat / K_m, turnover number k_cat, and Lineweaver-Burk double reciprocal coordinates.',
    category: 'Science',
    icon: 'text',
    keywords: ['michaelis menten calculator', 'enzyme kinetics formula v equals vmax s over km plus s online', 'lineweaver burk double reciprocal plot calculator', 'catalytic efficiency turnover number kcat km calculator', 'biochemistry pharmacology enzyme kinetics online'],
    order: 1435,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Substrate Concentration [S] (μM or mM), Maximum Velocity V_max (μM/min) & Michaelis Constant K_m (μM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mm-s">Substrate [S] (μM)</label>
          <input class="tool-textarea" id="mm-s" type="number" step="10" value="50.0" placeholder="50.0 μM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-vmax">V_max (μM/min)</label>
          <input class="tool-textarea" id="mm-vmax" type="number" step="20" value="200.0" placeholder="200.0 μM/min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-km">K_m (μM)</label>
          <input class="tool-textarea" id="mm-km" type="number" step="10" value="25.0" placeholder="25.0 μM (Half-Max Affinity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-et">Enzyme [E]ₜ (μM)</label>
          <input class="tool-textarea" id="mm-et" type="number" step="0.5" value="2.0" placeholder="2.0 μM Active Enzyme" />
        </div>
      </div>
      <div id="mm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mm-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Initial Velocity v = 133.3 μM / min (66.7% V_max)</span>
            <span class="stat-label">Reaction Velocity (v = V_max · [S] / (K_m + [S]))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mm-res-kcat" style="color:var(--green-dark); font-weight:700;">Turnover k_cat = 1.67 s⁻¹ | Specificity k_cat/K_m = 6.67 × 10⁴ M⁻¹s⁻¹</span>
            <span class="stat-label">Turnover Number (k_cat = V_max / [E]ₜ) & Catalytic Efficiency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('mm-s'), vmEl = document.getElementById('mm-vmax');
  const kmEl = document.getElementById('mm-km'), etEl = document.getElementById('mm-et');
  const vResEl = document.getElementById('mm-res-v'), kcResEl = document.getElementById('mm-res-kcat');

  function update() {
    const S = parseFloat(sEl.value), Vmax = parseFloat(vmEl.value);
    const Km = parseFloat(kmEl.value), Et = parseFloat(etEl.value);

    if (isNaN(S) || isNaN(Vmax) || isNaN(Km) || isNaN(Et) || S < 0 || Vmax <= 0 || Km <= 0 || Et <= 0) return;

    const v = (Vmax * S) / (Km + S);
    const pct_Vmax = (v / Vmax) * 100.0;
    const kcat_min = Vmax / Et;
    const kcat_s = kcat_min / 60.0;
    const Km_M = Km * 1e-6;
    const specificity = kcat_s / Km_M;

    vResEl.textContent = 'Initial Velocity v = ' + v.toFixed(1) + ' μM / min (' + pct_Vmax.toFixed(1) + '% V_max)';
    kcResEl.textContent = 'Turnover k_cat = ' + kcat_s.toFixed(2) + ' s⁻¹ | Catalytic Efficiency = ' + specificity.toExponential(2) + ' M⁻¹s⁻¹ ([S]=' + S + ' μM, K_m=' + Km + ' μM)';
  }

  [sEl, vmEl, kmEl, etEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter current substrate concentration $[S]$ in $\mu\text{M}$ or mM.',
      'Enter maximum enzyme reaction velocity $V_{\max}$ in $\mu\text{M/min}$.',
      'Enter Michaelis constant $K_m$ in $\mu\text{M}$ (substrate concentration at half-maximal velocity $v = V_{\max}/2$).',
      'Enter total active enzyme catalyst concentration $[E]_t$ in $\mu\text{M}$.',
      'Inspect instantaneous reaction rate v, percentage of $V_{\max}$, turnover number $k_{\text{cat}}$, and catalytic efficiency.'
    ],
    benefitTitle: 'Leonor Michaelis & Maud Menten 1913 Kinetic Standard',
    benefitContent: 'The universal mathematical foundation for enzymatic catalysis, drug discovery, competitive/non-competitive inhibitor pharmacology, and metabolic pathway modeling.',
    faqs: [{ q: 'What is the physical meaning of the Michaelis constant Km?', a: 'Km is inversely related to enzyme-substrate binding affinity: a smaller Km means the enzyme binds substrate more tightly and reaches half-maximal speed at lower concentration.' }]
  },

  // 2. Hill Equation Hemoglobin Oxygen-Binding Calculator
  {
    slug: 'hill-equation-cooperativity-hemoglobin-oxygen-binding-calculator',
    name: 'Hill Equation Hemoglobin Oxygen-Binding & Allosteric Cooperativity Calculator',
    description: 'Calculate allosteric protein ligand binding fractional saturation θ (Hill Equation: θ = [L]^n / (K_d + [L]^n) = pO₂^n / (P₅₀^n + pO₂^n)), Hill cooperativity coefficient n, and evaluate positive vs negative cooperativity.',
    category: 'Science',
    icon: 'text',
    keywords: ['hill equation calculator', 'hemoglobin oxygen binding curve formula online', 'allosteric cooperativity hill coefficient n calculator', 'p50 oxygen saturation fraction calculator', 'biochemistry physiology hematology medical pharmacology online'],
    order: 1436,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Oxygen Partial Pressure pO₂ (mmHg), Half-Saturation P₅₀ (mmHg) & Hill Coefficient n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hl-po2">pO₂ (mmHg)</label>
          <input class="tool-textarea" id="hl-po2" type="number" step="5" value="40.0" placeholder="40.0 mmHg (Venous pO₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hl-p50">P₅₀ (mmHg)</label>
          <input class="tool-textarea" id="hl-p50" type="number" step="2" value="26.6" placeholder="26.6 mmHg (Normal Blood)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hl-n">Hill Coeff n</label>
          <input class="tool-textarea" id="hl-n" type="number" step="0.2" value="2.8" placeholder="2.8 (Human Hemoglobin)" />
        </div>
      </div>
      <div id="hl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hl-res-sat" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Saturation SO₂ = 75.1% (Venous Oxygen Fraction)</span>
            <span class="stat-label">Fractional Hemoglobin Binding Saturation (θ = pO₂ⁿ / (P₅₀ⁿ + pO₂ⁿ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hl-res-eval" style="color:var(--green-dark); font-weight:700;">POSITIVE COOPERATIVITY (n = 2.8 > 1: Sigmoidal S-shaped Bohr Dissociation Curve ✓)</span>
            <span class="stat-label">Allosteric T-State to R-State Quaternary Shift</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const po2El = document.getElementById('hl-po2'), p50El = document.getElementById('hl-p50'), nEl = document.getElementById('hl-n');
  const satResEl = document.getElementById('hl-res-sat'), evResEl = document.getElementById('hl-res-eval');

  function update() {
    const pO2 = parseFloat(po2El.value), P50 = parseFloat(p50El.value), n = parseFloat(nEl.value);
    if (isNaN(pO2) || isNaN(P50) || isNaN(n) || pO2 < 0 || P50 <= 0 || n <= 0) return;

    const po2_n = Math.pow(pO2, n);
    const p50_n = Math.pow(P50, n);
    const theta = po2_n / (p50_n + po2_n);
    const sat_pct = theta * 100.0;

    let coop = '', color = '#22543d';
    if (n > 1.05) {
      coop = 'POSITIVE COOPERATIVITY (n=' + n + ' > 1: Sigmoidal Binding Curve)';
      color = '#22543d';
    } else if (n < 0.95) {
      coop = 'NEGATIVE COOPERATIVITY (n=' + n + ' < 1: Decreasing Affinity)';
      color = '#ea580c';
    } else {
      coop = 'NON-COOPERATIVE INDEPENDENT SITES (n=1.0: Hyperbolic Myoglobin Binding)';
      color = '#22543d';
    }

    satResEl.textContent = 'Saturation SO₂ = ' + sat_pct.toFixed(1) + '% (Fraction θ = ' + theta.toFixed(3) + ')';
    evResEl.textContent = coop + ' [pO₂ = ' + pO2 + ' mmHg @ P₅₀ = ' + P50 + ' mmHg]';
    evResEl.style.color = color;
  }

  [po2El, p50El, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter dissolved oxygen partial pressure $\text{pO}_2$ in mmHg ($100\text{ mmHg}$ arterial, $40\text{ mmHg}$ mixed venous).',
      'Enter blood half-saturation pressure $P_{50}$ in mmHg (normal adult blood $26.6\text{ mmHg}$, shifted right by acidosis/hyperthermia).',
      'Enter Hill cooperativity coefficient n ($n = 2.8$ for 4-subunit human hemoglobin tetramer, $n = 1.0$ for single-subunit myoglobin).',
      'Inspect fractional binding saturation $S\text{O}_2\%$ and cooperative binding character.'
    ],
    benefitTitle: 'Archibald Vivian Hill 1910 Allosteric Cooperativity Standard',
    benefitContent: 'Explains why hemoglobin binds oxygen avidly in the high-$pO_2$ lungs ($\sim 98\%$) and unloads oxygen easily in active low-$pO_2$ muscle tissues ($\sim 75\%$), driving human respiration.',
    faqs: [{ q: 'What causes a Right Shift in the Oxyhemoglobin Dissociation curve?', a: 'Increased temperature, acidosis (low pH / Bohr effect), elevated $CO_2$, and high 2,3-DPG shift the curve right (increase $P_{50}$), releasing more $O_2$ to exercising tissues.' }]
  },

  // 3. Hodgkin-Huxley Giant Axon Action Potential Calculator
  {
    slug: 'hodgkin-huxley-nerve-membrane-action-potential-calculator',
    name: 'Hodgkin-Huxley Giant Axon Action Potential Membrane Current Calculator',
    description: 'Calculate neuron electrophysiology total transmembrane ionic current I_m in μA/cm² (Hodgkin-Huxley Model: I_m = g_Na·m³·h·(V - E_Na) + g_K·n⁴·(V - E_K) + g_L·(V - E_L) + C_m·dV/dt) from voltage-gated ion channels.',
    category: 'Science',
    icon: 'text',
    keywords: ['hodgkin huxley calculator', 'action potential membrane ionic current formula online', 'squid giant axon sodium potassium conductance calculator', 'nerve impulse electrophysiology voltage clamp calculator', 'neuroscience biomedical engineering biophysics online'],
    order: 1437,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Membrane Potential V (mV), Na+ Conductance g_Na (mS/cm²), K+ Conductance g_K & Leak g_L',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hh-v">Potential V (mV)</label>
          <input class="tool-textarea" id="hh-v" type="number" step="5" value="-20.0" placeholder="-20.0 mV (Depolarization)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hh-m">Na Gating m</label>
          <input class="tool-textarea" id="hh-m" type="number" step="0.05" value="0.75" placeholder="0.75 (m Activation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hh-h">Na Gating h</label>
          <input class="tool-textarea" id="hh-h" type="number" step="0.05" value="0.60" placeholder="0.60 (h Inactivation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hh-n">K Gating n</label>
          <input class="tool-textarea" id="hh-n" type="number" step="0.05" value="0.40" placeholder="0.40 (n Activation)" />
        </div>
      </div>
      <div id="hh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hh-res-curr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Ionic Current = -2,084 μA / cm² (Inward Na+ Rush)</span>
            <span class="stat-label">Net Transmembrane Current (I_ion = I_Na + I_K + I_L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hh-res-split" style="color:var(--green-dark); font-weight:700;">I_Na = -2,203 μA/cm² (Inward Depolarizing) | I_K = +113 μA/cm² | I_L = +6 μA/cm²</span>
            <span class="stat-label">Ionic Currents: E_Na = +50 mV, E_K = -77 mV, E_L = -54.4 mV</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('hh-v'), mEl = document.getElementById('hh-m');
  const hEl = document.getElementById('hh-h'), nEl = document.getElementById('hh-n');
  const crResEl = document.getElementById('hh-res-curr'), spResEl = document.getElementById('hh-res-split');

  const g_Na_max = 120.0;
  const g_K_max = 36.0;
  const g_L = 0.3;
  const E_Na = 50.0;
  const E_K = -77.0;
  const E_L = -54.4;

  function update() {
    const V = parseFloat(vEl.value), m = parseFloat(mEl.value);
    const h = parseFloat(hEl.value), n = parseFloat(nEl.value);

    if (isNaN(V) || isNaN(m) || isNaN(h) || isNaN(n) || m < 0 || m > 1 || h < 0 || h > 1 || n < 0 || n > 1) return;

    const I_Na = g_Na_max * Math.pow(m, 3) * h * (V - E_Na) * 10.0;
    const I_K = g_K_max * Math.pow(n, 4) * (V - E_K) * 10.0;
    const I_L = g_L * (V - E_L) * 10.0;
    const I_total = I_Na + I_K + I_L;

    let dir = '';
    if (I_total < 0) {
      dir = ' (Inward Na⁺ Current -> Rapid Action Potential Upstroke)';
    } else {
      dir = ' (Outward K⁺ Current -> Repolarization / Hyperpolarization)';
    }

    crResEl.textContent = 'Total Current I_ion = ' + (I_total >= 0 ? '+' : '') + Math.round(I_total).toLocaleString() + ' μA / cm²' + dir;
    spResEl.textContent = 'I_Na = ' + Math.round(I_Na).toLocaleString() + ' μA/cm² | I_K = ' + (I_K >= 0 ? '+' : '') + Math.round(I_K).toLocaleString() + ' μA/cm² | I_L = ' + (I_L >= 0 ? '+' : '') + Math.round(I_L) + ' μA/cm² (V=' + V + ' mV)';
  }

  [vEl, mEl, hEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter instantaneous transmembrane cell membrane potential V in mV (e.g. $-65\text{ mV}$ resting, $+30\text{ mV}$ peak overshoot).',
      'Enter sodium activation gating variable m ($0.0$ closed, $1.0$ open).',
      'Enter sodium inactivation gating variable h ($1.0$ unblocked, $0.0$ inactivated).',
      'Enter delayed rectifier potassium activation gating variable n ($0.0$ closed, $1.0$ open).',
      'Inspect individual ion channel currents ($I_{\text{Na}}, I_{\text{K}}, I_{\text{L}}$) in $\mu\text{A/cm}^2$ and net membrane voltage drive.'
    ],
    benefitTitle: 'Alan Hodgkin & Andrew Huxley 1952 Nobel Prize Ionic Theory',
    benefitContent: 'Formulates non-linear differential equations coupling voltage-gated ion channels to electrical spikes, forming the cornerstone of computational neuroscience and cardiac electrophysiology modeling.',
    faqs: [{ q: 'Why is the squid giant axon famous in neuroscience?', a: 'At up to 1 mm in diameter (100–1000× larger than mammalian axons), it allowed Hodgkin and Huxley to insert glass microelectrodes to record action potential currents directly.' }]
  },

  // 4. Windkessel Arterial Compliance & Vascular Impedance Calculator
  {
    slug: 'windkessel-arterial-cardiovascular-compliance-impedance-calculator',
    name: 'Windkessel Two-Element Arterial Compliance & Vascular Impedance Calculator',
    description: 'Calculate cardiovascular hemodynamics Otto Frank Windkessel Model diastolic arterial blood pressure decay P(t) in mmHg (P(t) = P_0 · e^(-t / (R·C))), Total Peripheral Resistance TPR (R), and arterial systemic compliance C in mL/mmHg.',
    category: 'Science',
    icon: 'text',
    keywords: ['windkessel arterial model calculator', 'cardiovascular compliance formula rc time constant online', 'diastolic blood pressure decay windkessel calculator', 'total peripheral resistance tpr arterial stiffness calculator', 'hemodynamics physiology biomedical engineering cardiology online'],
    order: 1438,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Systolic Pressure P₀ (mmHg), Total Resistance R (mmHg·s/mL) & Compliance C (mL/mmHg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wk-p0">Start P₀ (mmHg)</label>
          <input class="tool-textarea" id="wk-p0" type="number" step="10" value="120.0" placeholder="120.0 mmHg (End Systole)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wk-r">Resistance R</label>
          <input class="tool-textarea" id="wk-r" type="number" step="0.1" value="1.0" placeholder="1.0 mmHg·s/mL (TPR)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wk-c">Compliance C</label>
          <input class="tool-textarea" id="wk-c" type="number" step="0.2" value="1.2" placeholder="1.2 mL/mmHg (Aorta)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wk-t">Diastole t (s)</label>
          <input class="tool-textarea" id="wk-t" type="number" step="0.1" value="0.50" placeholder="0.50 s Diastolic Duration" />
        </div>
      </div>
      <div id="wk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wk-res-pt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">End-Diastolic P(t) = 79.1 mmHg (Normal Diastolic Pressure)</span>
            <span class="stat-label">Diastolic Pressure Decay (P(t) = P₀ · e^(-t / (R·C)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wk-res-tau" style="color:var(--green-dark); font-weight:700;">RC Time Constant τ = 1.20 Seconds | Stroke Volume Storage = 48 mL</span>
            <span class="stat-label">Arterial Hemodynamic Elastic Reservoir Damping Capacity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p0El = document.getElementById('wk-p0'), rEl = document.getElementById('wk-r');
  const cEl = document.getElementById('wk-c'), tEl = document.getElementById('wk-t');
  const ptResEl = document.getElementById('wk-res-pt'), tauResEl = document.getElementById('wk-res-tau');

  function update() {
    const P0 = parseFloat(p0El.value), R = parseFloat(rEl.value);
    const C = parseFloat(cEl.value), t_sec = parseFloat(tEl.value);

    if (isNaN(P0) || isNaN(R) || isNaN(C) || isNaN(t_sec) || P0 <= 0 || R <= 0 || C <= 0 || t_sec < 0) return;

    const tau = R * C;
    const P_t = P0 * Math.exp(- t_sec / tau);
    const stored_vol_mL = C * (P0 - P_t);

    ptResEl.textContent = 'End-Diastolic P(t) = ' + P_t.toFixed(1) + ' mmHg (' + (P_t >= 90 ? 'ELEVATED' : 'NORMAL') + ')';
    tauResEl.textContent = 'RC Time Constant τ = ' + tau.toFixed(2) + ' s | Stored Blood Ejected in Diastole = ' + stored_vol_mL.toFixed(1) + ' mL (t = ' + t_sec + ' s @ R·C=' + tau.toFixed(2) + ' s)';
  }

  [p0El, rEl, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter peak systolic aortic blood pressure $P_0$ in mmHg (typically 120 mmHg).',
      'Enter systemic Total Peripheral Resistance (TPR) R in $\text{mmHg}\cdot\text{s/mL}$ (normal $\sim 1.0\text{ mmHg}\cdot\text{s/mL}$).',
      'Enter systemic arterial tree compliance C in $\text{mL/mmHg}$ (normal $\sim 1.0\text{ to }1.5\text{ mL/mmHg}$, decreases with age/atherosclerosis).',
      'Enter cardiac diastolic cycle duration t in seconds (typically 0.4–0.6 s at 70 bpm).',
      'Inspect end-diastolic arterial pressure decay $P(t)$ and aortic elastic buffer volume.'
    ],
    benefitTitle: 'Otto Frank 1899 Windkessel ("Air Chamber") Cardiovascular Standard',
    benefitContent: 'Models the aorta as an elastic capacitor that expands during systole to absorb high pressure and recoils during diastole to maintain continuous forward capillary blood flow throughout the body.',
    faqs: [{ q: 'What happens to blood pressure when arteries stiffen with age (low C)?', a: 'Arterial compliance C drops, decreasing time constant $\tau = RC$, causing systolic pressure to spike dangerously high and diastolic pressure to drop rapidly (isolated systolic hypertension).' }]
  },

  // 5. Mechanical Ventilator Dynamic & Static Lung Compliance Calculator
  {
    slug: 'ventilator-dynamic-static-compliance-airway-resistance-calculator',
    name: 'Mechanical Ventilator Dynamic & Static Lung Compliance (C_stat) Calculator',
    description: 'Calculate intensive care mechanical ventilation respiratory mechanics: Static Respiratory Compliance C_stat in mL/cmH₂O (C_stat = V_t / (P_plat - PEEP)), Dynamic Compliance C_dyn, and Airway Resistance R_aw.',
    category: 'Science',
    icon: 'text',
    keywords: ['ventilator compliance calculator', 'static lung compliance formula cstat online', 'plateau pressure peep airway resistance calculator', 'ards respiratory mechanics tidal volume calculator', 'critical care intensive care pulmonology biomedical online'],
    order: 1439,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tidal Volume V_t (mL), Peak Pressure P_peak (cmH₂O), Plateau P_plat (cmH₂O) & PEEP (cmH₂O)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vc-vt">Tidal Vol V_t (mL)</label>
          <input class="tool-textarea" id="vc-vt" type="number" step="50" value="450.0" placeholder="450.0 mL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vc-ppk">P_peak (cmH₂O)</label>
          <input class="tool-textarea" id="vc-ppk" type="number" step="2" value="28.0" placeholder="28.0 cmH₂O" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vc-ppl">P_plat (cmH₂O)</label>
          <input class="tool-textarea" id="vc-ppl" type="number" step="2" value="20.0" placeholder="20.0 cmH₂O" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vc-peep">PEEP (cmH₂O)</label>
          <input class="tool-textarea" id="vc-peep" type="number" step="1" value="8.0" placeholder="8.0 cmH₂O (Positive End)" />
        </div>
      </div>
      <div id="vc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vc-res-cstat" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Static Compliance C_stat = 37.5 mL / cmH₂O</span>
            <span class="stat-label">Static Respiratory Compliance (C_stat = V_t / (P_plat - PEEP))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vc-res-eval" style="color:var(--green-dark); font-weight:700;">Driving Pressure ΔP = 12.0 cmH₂O (Safe Protective Target ≤ 14 cmH₂O ✓) | C_dyn = 22.5 mL/cmH₂O</span>
            <span class="stat-label">ARDS Lung Protective Ventilation Compliance Metric</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vtEl = document.getElementById('vc-vt'), ppkEl = document.getElementById('vc-ppk');
  const pplEl = document.getElementById('vc-ppl'), peepEl = document.getElementById('vc-peep');
  const csResEl = document.getElementById('vc-res-cstat'), evResEl = document.getElementById('vc-res-eval');

  function update() {
    const Vt = parseFloat(vtEl.value), Ppeak = parseFloat(ppkEl.value);
    const Pplat = parseFloat(pplEl.value), PEEP = parseFloat(peepEl.value);

    if (isNaN(Vt) || isNaN(Ppeak) || isNaN(Pplat) || isNaN(PEEP) || Vt <= 0 || Pplat <= PEEP || Ppeak <= Pplat) return;

    const driving_pressure = Pplat - PEEP;
    const C_stat = Vt / driving_pressure;
    const C_dyn = Vt / (Ppeak - PEEP);
    const transairway_P = Ppeak - Pplat;

    let stat_eval = '', color = '#22543d';
    if (driving_pressure > 14.0) {
      stat_eval = 'HIGH DRIVING PRESSURE (ΔP > 14 cmH₂O: Increased Risk of Barotrauma/VILI)';
      color = '#c53030';
    } else {
      stat_eval = 'LUNG-PROTECTIVE (ΔP = ' + driving_pressure.toFixed(1) + ' cmH₂O ≤ 14 cmH₂O Target ✓)';
      color = '#22543d';
    }

    csResEl.textContent = 'Static Compliance C_stat = ' + C_stat.toFixed(1) + ' mL / cmH₂O';
    evResEl.textContent = stat_eval + ' | C_dyn = ' + C_dyn.toFixed(1) + ' mL/cmH₂O | Transairway ΔP = ' + transairway_P.toFixed(1) + ' cmH₂O';
    evResEl.style.color = color;
  }

  [vtEl, ppkEl, pplEl, peepEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter delivered mechanical ventilator Tidal Volume $V_t$ in mL (e.g. 6 mL/kg ideal body weight).',
      'Enter Peak Inspiratory Pressure (PIP / $P_{\text{peak}}$) in $\text{cmH}_2\text{O}$.',
      'Enter inspiratory-hold Plateau Pressure ($P_{\text{plat}}$) in $\text{cmH}_2\text{O}$.',
      'Enter Positive End-Expiratory Pressure (PEEP) in $\text{cmH}_2\text{O}$.',
      'Inspect Static Lung Compliance $C_{\text{stat}}$, Dynamic Compliance $C_{\text{dyn}}$, and Driving Pressure ($\Delta P = P_{\text{plat}} - \text{PEEP}$).'
    ],
    benefitTitle: 'ARDSNet Lung Protective Mechanical Ventilation Standard',
    benefitContent: 'Isolates chest wall/lung parenchymal elasticity ($C_{\text{stat}}$) from endotracheal airway resistance, ensuring driving pressure stays below $14\ \text{cmH}_2\text{O}$ to avoid ventilator-induced lung injury (VILI).',
    faqs: [{ q: 'What causes a sudden drop in Static Compliance?', a: 'Pneumothorax, worsening pulmonary edema, ARDS consolidation, or mainstem endotracheal tube intubation decreases $C_{\text{stat}}$, causing $P_{\text{plat}}$ to rise.' }]
  },

  // 6. MRI Proton Larmor Precession Frequency Calculator
  {
    slug: 'mri-larmor-precession-frequency-gyromagnetic-ratio-calculator',
    name: 'MRI Proton Larmor Precession Frequency (f₀ = γ·B₀) & Magnetic Field Calculator',
    description: 'Calculate magnetic resonance imaging nuclear spin Larmor Precession Frequency f₀ in MHz (Larmor Equation: f₀ = (γ / 2π) · B₀) for Hydrogen ¹H (42.577 MHz/T), Carbon ¹³C, Sodium ²³Na, Phosphorus ³¹P, and magnetic field B₀.',
    category: 'Science',
    icon: 'text',
    keywords: ['mri larmor frequency calculator', 'larmor precession equation f0 equals gamma b0 online', 'magnetic resonance imaging gyromagnetic ratio calculator', '1.5t 3t 7t mri resonance frequency calculator', 'medical imaging radiology biomedical engineering physics online'],
    order: 1440,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Magnetic Field Strength B₀ (Tesla, e.g. 1.5T, 3.0T, 7.0T) & Nucleus Gyromagnetic Ratio γ/2π',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lr-b0">Field B₀ (Tesla)</label>
          <input class="tool-textarea" id="lr-b0" type="number" step="0.5" value="3.0" placeholder="3.0 Tesla (Clinical MRI)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lr-gamma">Nucleus γ/2π (MHz/T)</label>
          <input class="tool-textarea" id="lr-gamma" type="number" step="1" value="42.577" placeholder="42.577 MHz/T (¹H Proton)" />
        </div>
      </div>
      <div id="lr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lr-res-f0" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Larmor Frequency f₀ = 127.73 MHz</span>
            <span class="stat-label">RF Transmit/Receive Resonance Frequency (f₀ = (γ / 2π) · B₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lr-res-rf" style="color:var(--green-dark); font-weight:700;">RF Wavelength λ = 2.35 Meters (VHF FM Band) | Chemical Shift (1 ppm) = 127.7 Hz</span>
            <span class="stat-label">Electromagnetic Excitation Wavelength in Free Space</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const b0El = document.getElementById('lr-b0'), gmEl = document.getElementById('lr-gamma');
  const f0ResEl = document.getElementById('lr-res-f0'), rfResEl = document.getElementById('lr-res-rf');

  const c_light = 2.99792458e8;

  function update() {
    const B0_T = parseFloat(b0El.value), gamma_MHz_T = parseFloat(gmEl.value);
    if (isNaN(B0_T) || isNaN(gamma_MHz_T) || B0_T <= 0 || gamma_MHz_T <= 0) return;

    // Larmor frequency in MHz: f0 = gamma * B0
    const f0_MHz = gamma_MHz_T * B0_T;
    const f0_Hz = f0_MHz * 1e6;

    // RF Wavelength in vacuum: lambda = c / f0  [meters]
    const lambda_m = c_light / f0_Hz;

    // 1 ppm chemical shift in Hz:
    const shift_1ppm_Hz = f0_MHz;

    f0ResEl.textContent = 'Larmor Frequency f₀ = ' + f0_MHz.toFixed(2) + ' MHz';
    rfResEl.textContent = 'RF Wavelength λ = ' + lambda_m.toFixed(2) + ' m (VHF Band) | 1 ppm Shift = ' + shift_1ppm_Hz.toFixed(1) + ' Hz (@ B₀ = ' + B0_T + ' Tesla)';
  }

  b0El.addEventListener('input', update);
  gmEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter static primary MRI magnetic field strength $B_0$ in Tesla (e.g. 1.5T standard hospital scanner, 3.0T high-field, 7.0T ultra-high field research).',
      'Enter nucleus gyromagnetic ratio $\gamma/2\pi$ in $\text{MHz/T}$ (42.577 for $^1\text{H}$ Hydrogen protons, 10.708 for $^{13}\text{C}$, 11.262 for $^{23}\text{Na}$, 17.235 for $^{31}\text{P}$).',
      'Inspect resonant RF excitation Larmor frequency in MHz and RF coil tuning wavelength.'
    ],
    benefitTitle: 'Sir Joseph Larmor 1897 Magnetic Precession Standard',
    benefitContent: 'Dictates the precise radiofrequency pulse frequency needed to tilt nuclear magnetization spins in MRI scanners (63.87 MHz @ 1.5T, 127.73 MHz @ 3.0T) for clinical imaging.',
    faqs: [{ q: 'Why is Hydrogen-1 universally imaged in clinical MRI?', a: 'The human body is over $60\%$ water ($H_2O$) and lipids, giving Hydrogen an enormous natural abundance and the highest gyromagnetic ratio of all non-radioactive stable nuclei.' }]
  },

  // 7. MRI Bloch Equations T1/T2 Relaxation Calculator
  {
    slug: 'mri-t1-t2-relaxation-bloch-equations-signal-intensity-calculator',
    name: 'MRI Bloch Equations T1/T2 Relaxation & Spin-Echo Signal Intensity Calculator',
    description: 'Calculate MRI tissue contrast signal intensity S in Spin-Echo sequences (Bloch Equations: S = ρ_H · (1 - e^(-TR / T₁)) · e^(-TE / T₂)) from repetition time TR, echo time TE, longitudinal relaxation T₁, and transverse relaxation T₂.',
    category: 'Science',
    icon: 'text',
    keywords: ['mri bloch equations calculator', 'spin echo signal intensity formula t1 t2 tr te online', 'longitudinal transverse relaxation time calculator', 'mri image weighting t1 weighted t2 weighted pd calculator', 'magnetic resonance imaging radiology medical physics online'],
    order: 1441,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Repetition Time TR (ms), Echo Time TE (ms), Tissue T₁ (ms) & Tissue T₂ (ms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bl-tr">TR (ms)</label>
          <input class="tool-textarea" id="bl-tr" type="number" step="100" value="500.0" placeholder="500.0 ms (Short TR)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-te">TE (ms)</label>
          <input class="tool-textarea" id="bl-te" type="number" step="5" value="15.0" placeholder="15.0 ms (Short TE)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-t1">Tissue T₁ (ms)</label>
          <input class="tool-textarea" id="bl-t1" type="number" step="100" value="600.0" placeholder="600.0 ms (White Matter)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bl-t2">Tissue T₂ (ms)</label>
          <input class="tool-textarea" id="bl-t2" type="number" step="10" value="80.0" placeholder="80.0 ms (White Matter)" />
        </div>
      </div>
      <div id="bl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bl-res-sig" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Relative Signal S = 0.468 (46.8% Max Signal)</span>
            <span class="stat-label">Spin-Echo Signal (S = (1 - e^(-TR/T₁)) · e^(-TE/T₂))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bl-res-weight" style="color:var(--green-dark); font-weight:700;">T1-WEIGHTED CONTRAST (Short TR 500ms / Short TE 15ms: Fat/White Matter Bright ✓)</span>
            <span class="stat-label">T1 Recovery = 56.5% | T2 Decay Remaining = 82.9%</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const trEl = document.getElementById('bl-tr'), teEl = document.getElementById('bl-te');
  const t1El = document.getElementById('bl-t1'), t2El = document.getElementById('bl-t2');
  const sgResEl = document.getElementById('bl-res-sig'), wtResEl = document.getElementById('bl-res-weight');

  function update() {
    const TR = parseFloat(trEl.value), TE = parseFloat(teEl.value);
    const T1 = parseFloat(t1El.value), T2 = parseFloat(t2El.value);

    if (isNaN(TR) || isNaN(TE) || isNaN(T1) || isNaN(T2) || TR <= 0 || TE < 0 || T1 <= 0 || T2 <= 0) return;

    // Longitudinal T1 recovery fraction: (1 - exp(-TR / T1))
    const t1_recovery = 1.0 - Math.exp(- TR / T1);

    // Transverse T2 decay fraction: exp(-TE / T2)
    const t2_decay = Math.exp(- TE / T2);

    // Relative spin echo signal:
    const S = t1_recovery * t2_decay;

    let weighting = '', color = '#22543d';
    if (TR <= 800 && TE <= 30) {
      weighting = 'T1-WEIGHTED IMAGE (Short TR / Short TE: Anatomy & Fat Bright)';
      color = '#22543d';
    } else if (TR >= 2000 && TE >= 80) {
      weighting = 'T2-WEIGHTED IMAGE (Long TR / Long TE: Water / CSF / Edema Bright)';
      color = '#22543d';
    } else if (TR >= 2000 && TE <= 30) {
      weighting = 'PROTON DENSITY (PD) WEIGHTED (Long TR / Short TE: High SNR)';
      color = '#22543d';
    } else {
      weighting = 'MIXED T1/T2 CONTRAST (Intermediate Sequence)';
      color = '#ea580c';
    }

    sgResEl.textContent = 'Relative Signal S = ' + S.toFixed(3) + ' (' + (S * 100).toFixed(1) + '% Max)';
    wtResEl.textContent = weighting + ' [T1 Recovery = ' + (t1_recovery*100).toFixed(1) + '%, T2 Remaining = ' + (t2_decay*100).toFixed(1) + '%]';
    wtResEl.style.color = color;
  }

  [trEl, teEl, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pulse sequence Repetition Time TR in milliseconds.',
      'Enter pulse sequence Echo Time TE in milliseconds.',
      'Enter tissue longitudinal spin-lattice relaxation time $T_1$ in ms (e.g. fat $250\text{ ms}$, white matter $600\text{ ms}$, CSF $4000\text{ ms}$).',
      'Enter tissue transverse spin-spin relaxation time $T_2$ in ms (e.g. fat $70\text{ ms}$, white matter $80\text{ ms}$, CSF $2000\text{ ms}$).',
      'Inspect relative voxel signal intensity and identify image weighting (T1-weighted vs T2-weighted vs PD-weighted).'
    ],
    benefitTitle: 'Felix Bloch 1946 Nuclear Induction Equations Standard',
    benefitContent: 'Models differential magnetization relaxation kinetics between anatomical tissues to synthesize image contrast, identifying tumors, brain white matter lesions, and joint cartilage damage.',
    faqs: [{ q: 'Why does CSF appear black on T1 and bright white on T2?', a: 'Pure fluid (CSF) has long $T_1$ ($4000\text{ ms}$), so it recovers very little signal during short TR on T1-weighted scans, but has long $T_2$ ($2000\text{ ms}$), retaining strong signal on long-TE T2-weighted scans.' }]
  },

  // 8. Computed Tomography (CT) Hounsfield Unit Calculator
  {
    slug: 'computed-tomography-ct-hounsfield-unit-attenuation-calculator',
    name: 'Computed Tomography (CT) Hounsfield Unit (HU) Radiodensity Calculator',
    description: 'Calculate diagnostic X-ray Computed Tomography radiodensity Hounsfield Units HU (Sir Godfrey Hounsfield Scale: HU = 1000 · (μ_tissue - μ_water) / (μ_water - μ_air)) and display tissue classification (Air, Fat, Water, Soft Tissue, Bone).',
    category: 'Science',
    icon: 'text',
    keywords: ['ct hounsfield unit calculator', 'hu attenuation scale formula online', 'computed tomography radiodensity water bone fat calculator', 'xray linear attenuation coefficient mu hu calculator', 'medical imaging radiology ct scan physics online'],
    order: 1442,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tissue Linear Attenuation Coefficient μ (cm⁻¹), Water μ_w (0.206 cm⁻¹) & Air μ_air (0.0004 cm⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hu-mu">Tissue Attenuation μ (cm⁻¹)</label>
          <input class="tool-textarea" id="hu-mu" type="number" step="0.02" value="0.214" placeholder="0.214 cm⁻¹ (Liver Tissue)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hu-muw">Water μ_water (cm⁻¹)</label>
          <input class="tool-textarea" id="hu-muw" type="number" step="0.005" value="0.206" placeholder="0.206 cm⁻¹ (@ 70 keV)" />
        </div>
      </div>
      <div id="hu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hu-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CT Radiodensity = +39 HU (Liver / Muscle Parenchyma)</span>
            <span class="stat-label">Hounsfield Unit (HU = 1000 · (μ - μ_water) / μ_water)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hu-res-class" style="color:var(--green-dark); font-weight:700;">NORMAL SOFT TISSUE (Window Level L = +40 HU, Window Width W = 350 HU)</span>
            <span class="stat-label">Diagnostic CT Gray-Scale Windowing Assignment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const muEl = document.getElementById('hu-mu'), muwEl = document.getElementById('hu-muw');
  const valResEl = document.getElementById('hu-res-val'), clResEl = document.getElementById('hu-res-class');

  function update() {
    const mu = parseFloat(muEl.value), mu_w = parseFloat(muwEl.value);
    if (isNaN(mu) || isNaN(mu_w) || mu < 0 || mu_w <= 0) return;

    // Hounsfield unit formula: HU = 1000 * (mu - mu_w) / mu_w
    const HU = 1000.0 * (mu - mu_w) / mu_w;
    const round_HU = Math.round(HU);

    let tissue = '', windowing = '';
    if (round_HU <= -900) {
      tissue = 'AIR / LUNG TRACHEA (Black)';
      windowing = 'Lung Window: L = -600, W = 1500';
    } else if (round_HU <= -500) {
      tissue = 'LUNG PARENCHYMA';
      windowing = 'Lung Window: L = -600, W = 1500';
    } else if (round_HU <= -30) {
      tissue = 'ADIPOSE FAT TISSUE';
      windowing = 'Soft Tissue: L = +40, W = 350';
    } else if (round_HU <= 15) {
      tissue = 'WATER / CYST / CSF (0 HU Reference)';
      windowing = 'Soft Tissue: L = +40, W = 350';
    } else if (round_HU <= 80) {
      tissue = 'SOFT TISSUE / LIVER / MUSCLE / BLOOD';
      windowing = 'Abdominal Window: L = +40, W = 350';
    } else if (round_HU <= 300) {
      tissue = 'ACUTE CLOT / CONTRAST ENHANCEMENT';
      windowing = 'Angio Window: L = +100, W = 600';
    } else {
      tissue = 'CANCELLOUS / CORTICAL COMPACT BONE';
      windowing = 'Bone Window: L = +500, W = 2000';
    }

    valResEl.textContent = 'CT Radiodensity = ' + (round_HU >= 0 ? '+' : '') + round_HU + ' HU (' + tissue + ')';
    clResEl.textContent = tissue + ' | Recommended CT Display: ' + windowing + ' (μ = ' + mu.toFixed(3) + ' cm⁻¹)';
  }

  muEl.addEventListener('input', update);
  muwEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter tissue X-ray linear attenuation coefficient $\mu$ in $\text{cm}^{-1}$ for average diagnostic CT photon energy ($70\text{ keV}$).',
      'Enter reference water linear attenuation coefficient $\mu_{\text{water}}$ (typically $0.206\text{ cm}^{-1}$).',
      'Inspect calculated CT Hounsfield Unit (HU), automated tissue classification, and recommended clinical display window setting (Width W and Level L).'
    ],
    benefitTitle: 'Sir Godfrey Hounsfield 1979 Nobel Prize CT Scale',
    benefitContent: 'Calibrates X-ray attenuation on a standardized scale: Air is defined as $-1000\text{ HU}$, Water as $0\text{ HU}$, and dense cortical bone as $+1000\text{ to }+3000\text{ HU}$, enabling automated tissue segmentation.',
    faqs: [{ q: 'What is CT Windowing (Window Width and Level)?', a: 'Human eyes can distinguish only $\sim 30$ shades of gray; windowing maps a narrow HU range (e.g. Width 350, Level 40 for soft tissue) to full display brightness to maximize tumor contrast.' }]
  },

  // 9. Medical Ultrasound Acoustic Impedance & Reflection Calculator
  {
    slug: 'medical-ultrasound-acoustic-impedance-reflection-coefficient-calculator',
    name: 'Medical Ultrasound Acoustic Impedance (Z = ρ·c) & Reflection Coefficient Calculator',
    description: 'Calculate medical ultrasound tissue Acoustic Impedance Z in MRayl (Z = ρ · c), sound wave Intensity Reflection Coefficient R = ((Z₂ - Z₁) / (Z₂ + Z₁))², Transmitted Intensity T = 1 - R, and echo signal amplitude.',
    category: 'Science',
    icon: 'text',
    keywords: ['ultrasound acoustic impedance calculator', 'reflection coefficient formula r equals z2 minus z1 online', 'ultrasound gel acoustic matching calculator', 'soft tissue bone air acoustic boundary calculator', 'medical ultrasound imaging biomedical engineering physics online'],
    order: 1443,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Medium 1 Impedance Z₁ (MRayl, e.g. Tissue 1.63) & Medium 2 Impedance Z₂ (MRayl, e.g. Bone 7.80 or Air 0.0004)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="us-z1">Medium 1 Z₁ (MRayl)</label>
          <input class="tool-textarea" id="us-z1" type="number" step="0.1" value="1.63" placeholder="1.63 MRayl (Soft Tissue)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="us-z2">Medium 2 Z₂ (MRayl)</label>
          <input class="tool-textarea" id="us-z2" type="number" step="0.5" value="7.80" placeholder="7.80 MRayl (Skull Bone)" />
        </div>
      </div>
      <div id="us-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="us-res-r" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Intensity Reflected R = 42.8% (Echo Signal)</span>
            <span class="stat-label">Intensity Reflection Coefficient (R = ((Z₂ - Z₁) / (Z₂ + Z₁))²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="us-res-t" style="color:var(--green-dark); font-weight:700;">Transmitted T = 57.2% | Echo Decibels = -3.7 dB (Strong Bright Specular Boundary)</span>
            <span class="stat-label">Sound Energy Penetration & Acoustic Shadowing</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const z1El = document.getElementById('us-z1'), z2El = document.getElementById('us-z2');
  const rResEl = document.getElementById('us-res-r'), tResEl = document.getElementById('us-res-t');

  function update() {
    const Z1 = parseFloat(z1El.value), Z2 = parseFloat(z2El.value);
    if (isNaN(Z1) || isNaN(Z2) || Z1 <= 0 || Z2 <= 0) return;

    // Amplitude reflection coefficient: r_amp = (Z2 - Z1) / (Z2 + Z1)
    const r_amp = (Z2 - Z1) / (Z2 + Z1);

    // Intensity reflection coefficient: R = r_amp^2
    const R = Math.pow(r_amp, 2);
    const R_pct = R * 100.0;

    // Intensity transmission coefficient: T = 1 - R
    const T = 1.0 - R;
    const T_pct = T * 100.0;

    // Echo amplitude in dB: 10 * log10(R)
    const echo_dB = R > 0 ? 10.0 * Math.log10(R) : -100.0;

    let eval_text = '';
    if (R_pct >= 99.0) {
      eval_text = 'COMPLETE ACOUSTIC REFLECTION (Air boundary: total beam blocked, gel required!)';
    } else if (R_pct >= 30.0) {
      eval_text = 'STRONG SPECULAR REFLECTOR (Bone boundary: bright echo with posterior acoustic shadow)';
    } else if (R_pct >= 1.0) {
      eval_text = 'MODERATE BOUNDARY (Organ parenchyma interfaces: kidney/liver capsules)';
    } else {
      eval_text = 'MINIMAL REFLECTION (Fluid/blood interface: near-complete sound transmission)';
    }

    rResEl.textContent = 'Intensity Reflected R = ' + R_pct.toFixed(1) + '% (Echo Signal)';
    tResEl.textContent = 'Transmitted T = ' + T_pct.toFixed(1) + '% | ' + eval_text + ' (' + echo_dB.toFixed(1) + ' dB @ Z₁=' + Z1 + ', Z₂=' + Z2 + ' MRayl)';
  }

  z1El.addEventListener('input', update);
  z2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter acoustic impedance $Z_1 = \rho_1 c_1$ of the first medium in MRayl ($\text{kg}/(\text{m}^2\cdot\text{s}) \times 10^6$; e.g. soft tissue $1.63\text{ MRayl}$, fat $1.38$, blood $1.61$).',
      'Enter acoustic impedance $Z_2$ of the second medium in MRayl (bone $7.80$, air $0.0004$, water $1.48$).',
      'Inspect percentage of acoustic sound intensity reflected (R) vs transmitted (T) across the interface.'
    ],
    benefitTitle: 'Acoustic Characteristic Impedance Matching Standard',
    benefitContent: 'Explains why ultrasound transducer gel ($Z \approx 1.5\text{ MRayl}$) is required: without gel, the skin-air impedance mismatch reflects $99.9\%$ of sound energy before entering the body.',
    faqs: [{ q: 'Why cannot ultrasound penetrate through bone or lungs?', a: 'Bone has very high impedance ($7.8\text{ MRayl}$) and lung air has very low impedance ($0.0004\text{ MRayl}$); both create massive impedance mismatches that reflect nearly all ultrasound waves.' }]
  },

  // 10. Body Surface Area (BSA Mosteller & Du Bois Formula) Calculator
  {
    slug: 'body-surface-area-mosteller-du-bois-drug-dosage-calculator',
    name: 'Body Surface Area (BSA Mosteller & Du Bois Formula) Drug Dosage Calculator',
    description: 'Calculate clinical Body Surface Area BSA in m² (Mosteller Formula: BSA = √(Height(cm) · Weight(kg) / 3600), Du Bois Formula: BSA = 0.007184 · W^0.425 · H^0.725) for chemotherapy dosing and cardiac index normalization.',
    category: 'Science',
    icon: 'text',
    keywords: ['body surface area calculator', 'bsa mosteller formula online', 'du bois body surface area chemotherapy dosage calculator', 'cardiac index bsa normalization calculator', 'oncology clinical pharmacology biomedical medicine online'],
    order: 1444,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Patient Height H (cm or inches) & Patient Body Weight W (kg or lbs)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bsa-h">Height (cm)</label>
          <input class="tool-textarea" id="bsa-h" type="number" step="2" value="175.0" placeholder="175.0 cm (5 ft 9 in)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bsa-w">Weight (kg)</label>
          <input class="tool-textarea" id="bsa-w" type="number" step="2" value="70.0" placeholder="70.0 kg (154 lbs)" />
        </div>
      </div>
      <div id="bsa-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bsa-res-most" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BSA = 1.84 m² (Mosteller Standard)</span>
            <span class="stat-label">Body Surface Area (BSA = √(Height · Weight / 3600))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bsa-res-comp" style="color:var(--green-dark); font-weight:700;">Du Bois BSA = 1.85 m² | Haycock BSA = 1.84 m² | Standard Adult Norm = 1.73 m²</span>
            <span class="stat-label">Chemotherapy & Hemodynamic Normalization (Mosteller vs Du Bois)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('bsa-h'), wEl = document.getElementById('bsa-w');
  const msResEl = document.getElementById('bsa-res-most'), cpResEl = document.getElementById('bsa-res-comp');

  function update() {
    const H_cm = parseFloat(hEl.value), W_kg = parseFloat(wEl.value);
    if (isNaN(H_cm) || isNaN(W_kg) || H_cm <= 0 || W_kg <= 0) return;

    // Mosteller formula: BSA = sqrt( (Height * Weight) / 3600 )
    const BSA_mosteller = Math.sqrt((H_cm * W_kg) / 3600.0);

    // Du Bois formula: BSA = 0.007184 * (Weight^0.425) * (Height^0.725)
    const BSA_dubois = 0.007184 * Math.pow(W_kg, 0.425) * Math.pow(H_cm, 0.725);

    // Haycock formula: BSA = 0.024265 * (Weight^0.5378) * (Height^0.3964)
    const BSA_haycock = 0.024265 * Math.pow(W_kg, 0.5378) * Math.pow(H_cm, 0.3964);

    msResEl.textContent = 'BSA = ' + BSA_mosteller.toFixed(2) + ' m² (Mosteller Standard)';
    cpResEl.textContent = 'Du Bois = ' + BSA_dubois.toFixed(2) + ' m² | Haycock = ' + BSA_haycock.toFixed(2) + ' m² | Adult Reference = 1.73 m² (H=' + H_cm + ' cm, W=' + W_kg + ' kg)';
  }

  hEl.addEventListener('input', update);
  wEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter patient total standing height H in cm ($1\text{ inch} = 2.54\text{ cm}$).',
      'Enter patient body mass weight W in kg ($1\text{ lb} = 0.4536\text{ kg}$).',
      'Inspect clinical Body Surface Area (BSA) in $\text{m}^2$ computed by Mosteller, Du Bois, and Haycock formulas.'
    ],
    benefitTitle: 'Robert D. Mosteller 1987 Clinical BSA Sizing Standard',
    benefitContent: 'Provides a more accurate physiological scaling factor than body weight alone for narrow therapeutic index oncology chemotherapy regimens and cardiac output index normalization ($CI = CO / BSA$).',
    faqs: [{ q: 'Why is chemotherapy dosed per m² BSA rather than per kg weight?', a: 'Metabolic clearance, hepatic blood flow, and glomerular filtration rate scale allometrically with surface area rather than body fat mass.' }]
  },

  // 11. Alveolar Gas Equation & A-a Oxygen Gradient Calculator
  {
    slug: 'alveolar-gas-equation-arterial-oxygen-gradient-calculator',
    name: 'Alveolar Gas Equation & Alveolar-Arterial (A-a) Oxygen Gradient Calculator',
    description: 'Calculate alveolar oxygen partial pressure P_A O₂ in mmHg (Alveolar Gas Equation: P_A O₂ = FiO₂ · (P_atm - 47) - (PaCO₂ / R)), Alveolar-Arterial (A-a) Oxygen Gradient (P_A O₂ - PaO₂), and age-adjusted gradient.',
    category: 'Science',
    icon: 'text',
    keywords: ['alveolar gas equation calculator', 'a-a gradient oxygen partial pressure formula online', 'alveolar arterial gradient hypoxia calculator', 'fio2 patm paco2 pao2 abg calculator', 'pulmonology critical care arterial blood gas abg online'],
    order: 1445,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'FiO₂ (e.g. 0.21 Room Air), PaO₂ (mmHg), PaCO₂ (mmHg) & Patient Age (Years)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ag-fio2">FiO₂ (0.21 - 1.0)</label>
          <input class="tool-textarea" id="ag-fio2" type="number" step="0.05" value="0.21" placeholder="0.21 (Room Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-pao2">PaO₂ (mmHg)</label>
          <input class="tool-textarea" id="ag-pao2" type="number" step="5" value="85.0" placeholder="85.0 mmHg (Arterial)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-paco2">PaCO₂ (mmHg)</label>
          <input class="tool-textarea" id="ag-paco2" type="number" step="2" value="40.0" placeholder="40.0 mmHg (Normal CO₂)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-age">Age (Years)</label>
          <input class="tool-textarea" id="ag-age" type="number" step="5" value="45" placeholder="45 Years Old" />
        </div>
      </div>
      <div id="ag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ag-res-grad" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">A-a Gradient = 14.7 mmHg (NORMAL INTRAPULMONARY GAS EXCHANGE)</span>
            <span class="stat-label">Alveolar-Arterial Gradient (A-a = P_A O₂ - PaO₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ag-res-pao2" style="color:var(--green-dark); font-weight:700;">Alveolar P_A O₂ = 99.7 mmHg | Expected Normal A-a ≤ 15.3 mmHg (Age/4 + 4)</span>
            <span class="stat-label">Alveolar Gas Equation (P_A O₂ = FiO₂·(760-47) - PaCO₂/0.8)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fio2El = document.getElementById('ag-fio2'), pao2El = document.getElementById('ag-pao2');
  const paco2El = document.getElementById('ag-paco2'), ageEl = document.getElementById('ag-age');
  const grResEl = document.getElementById('ag-res-grad'), paResEl = document.getElementById('ag-res-pao2');

  const Patm = 760.0;  // Sea level atmospheric pressure mmHg
  const PH2O = 47.0;   // Saturated water vapor pressure @ 37°C mmHg
  const RQ = 0.8;      // Standard respiratory exchange ratio

  function update() {
    const FiO2 = parseFloat(fio2El.value), PaO2 = parseFloat(pao2El.value);
    const PaCO2 = parseFloat(paco2El.value), age = parseFloat(ageEl.value);

    if (isNaN(FiO2) || isNaN(PaO2) || isNaN(PaCO2) || isNaN(age) || FiO2 <= 0 || FiO2 > 1 || PaO2 <= 0 || PaCO2 <= 0 || age < 0) return;

    // Alveolar Gas Equation: P_A_O2 = FiO2 * (Patm - PH2O) - (PaCO2 / RQ)  [mmHg]
    const P_A_O2 = (FiO2 * (Patm - PH2O)) - (PaCO2 / RQ);

    // A-a Gradient: A-a = P_A_O2 - PaO2
    const Aa_gradient = P_A_O2 - PaO2;

    // Age-adjusted expected normal upper limit: (Age / 4) + 4
    const normal_Aa_limit = (age / 4.0) + 4.0;

    let eval_text = '', color = '#22543d';
    if (Aa_gradient > normal_Aa_limit) {
      eval_text = 'ELEVATED A-a GRADIENT (V/Q Mismatch, Shunt, or Diffusion Defect: PE, Pneumonia, ARDS)';
      color = '#c53030';
    } else {
      eval_text = 'NORMAL A-a GRADIENT (Normal gas exchange; hypoventilation or low FiO₂ if hypoxic)';
      color = '#22543d';
    }

    grResEl.textContent = 'A-a Gradient = ' + Aa_gradient.toFixed(1) + ' mmHg (' + (Aa_gradient <= normal_Aa_limit ? 'NORMAL' : 'ELEVATED') + ')';
    grResEl.style.color = color;
    paResEl.textContent = 'Alveolar P_A O₂ = ' + P_A_O2.toFixed(1) + ' mmHg | Age ' + age + ' Expected Upper Limit ≤ ' + normal_Aa_limit.toFixed(1) + ' mmHg [FiO₂=' + FiO2 + ']';
  }

  [fio2El, pao2El, paco2El, ageEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter inspired oxygen fraction $\text{FiO}_2$ (0.21 room air, 0.40 for 40% mask, 1.0 for pure oxygen).',
      'Enter arterial oxygen partial pressure $\text{PaO}_2$ in mmHg from an Arterial Blood Gas (ABG).',
      'Enter arterial carbon dioxide partial pressure $\text{PaCO}_2$ in mmHg from ABG.',
      'Enter patient age in years to compute age-adjusted gradient threshold ($(\text{Age}/4) + 4$).',
      'Inspect Alveolar oxygen tension $P_A\text{O}_2$, A-a gradient, and diagnostic etiology of hypoxia.'
    ],
    benefitTitle: 'Alveolar Gas Equation Clinical Diagnostic Standard',
    benefitContent: 'Differentiates intrinsic lung disease (pulmonary embolism, pneumonia, ARDS with high A-a gradient) from extrinsic central respiratory depression (opioid overdose, COPD hypoventilation with normal A-a gradient).',
    faqs: [{ q: 'Why does the A-a gradient increase with age?', a: 'Normal physiological lung aging increases closing volume and minor ventilation-perfusion ($V/Q$) mismatch, gradually widening normal A-a from $\sim 8\text{ mmHg}$ at age 20 to $\sim 24\text{ mmHg}$ at age 80.' }]
  },

  // 12. Henderson-Hasselbalch Blood pH & Acid-Base Calculator
  {
    slug: 'henderson-hasselbalch-blood-ph-bicarbonate-acid-base-calculator',
    name: 'Henderson-Hasselbalch Blood pH & Arterial Bicarbonate Acid-Base Calculator',
    description: 'Calculate human arterial blood pH (Henderson-Hasselbalch Equation: pH = 6.10 + log₁₀([HCO₃⁻] / (0.0307 · PaCO₂))), evaluate metabolic vs respiratory acidosis and alkalosis, and calculate expected compensation.',
    category: 'Science',
    icon: 'text',
    keywords: ['henderson hasselbalch blood ph calculator', 'arterial blood gas abg formula online', 'bicarbonate hco3 paco2 acid base calculator', 'metabolic respiratory acidosis alkalosis calculator', 'clinical medicine nephrology intensive care physiology online'],
    order: 1446,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Arterial Bicarbonate [HCO₃⁻] (mEq/L or mmol/L) & Arterial PaCO₂ (mmHg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hh-hco3">Bicarbonate [HCO₃⁻] (mEq/L)</label>
          <input class="tool-textarea" id="hh-hco3" type="number" step="1" value="24.0" placeholder="24.0 mEq/L (Normal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hh-paco2">PaCO₂ (mmHg)</label>
          <input class="tool-textarea" id="hh-paco2" type="number" step="2" value="40.0" placeholder="40.0 mmHg (Normal)" />
        </div>
      </div>
      <div id="hh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hh-res-ph" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Arterial Blood pH = 7.40 (NORMAL HOMEOSTASIS)</span>
            <span class="stat-label">Henderson-Hasselbalch (pH = 6.10 + log₁₀([HCO₃⁻] / (0.0307 · PaCO₂)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hh-res-diag" style="color:var(--green-dark); font-weight:700;">NORMAL ACID-BASE STATUS (Dissolved CO₂ = 1.23 mmol/L, [HCO₃⁻]/CO₂ Ratio = 19.5 : 1)</span>
            <span class="stat-label">Clinical ABG Acid-Base Diagnostic Interpretation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hco3El = document.getElementById('hh-hco3'), paco2El = document.getElementById('hh-paco2');
  const phResEl = document.getElementById('hh-res-ph'), dgResEl = document.getElementById('hh-res-diag');

  const pKa = 6.10;
  const alpha_CO2 = 0.0307; // mmol/L per mmHg PaCO2

  function update() {
    const HCO3 = parseFloat(hco3El.value), PaCO2 = parseFloat(paco2El.value);
    if (isNaN(HCO3) || isNaN(PaCO2) || HCO3 <= 0 || PaCO2 <= 0) return;

    // Dissolved CO2 in mmol/L:
    const dCO2 = alpha_CO2 * PaCO2;

    // Blood pH: pH = 6.10 + log10( [HCO3-] / dCO2 )
    const pH = pKa + Math.log10(HCO3 / dCO2);

    let status = '', color = '#22543d';
    if (pH < 7.35) {
      color = '#c53030';
      if (HCO3 < 22.0 && PaCO2 <= 40.0) status = 'METABOLIC ACIDOSIS (Low HCO₃⁻)';
      else if (PaCO2 > 45.0 && HCO3 >= 24.0) status = 'RESPIRATORY ACIDOSIS (CO₂ Retention)';
      else status = 'MIXED ACIDOSIS';
    } else if (pH > 7.45) {
      color = '#c53030';
      if (HCO3 > 26.0 && PaCO2 >= 40.0) status = 'METABOLIC ALKALOSIS (High HCO₃⁻)';
      else if (PaCO2 < 35.0 && HCO3 <= 24.0) status = 'RESPIRATORY ALKALOSIS (Hyperventilation)';
      else status = 'MIXED ALKALOSIS';
    } else {
      status = 'NORMAL ARTERIAL ACID-BASE BALANCE';
      color = '#22543d';
    }

    phResEl.textContent = 'Arterial Blood pH = ' + pH.toFixed(2) + ' (' + status + ')';
    phResEl.style.color = color;
    dgResEl.textContent = status + ' | Dissolved CO₂ = ' + dCO2.toFixed(2) + ' mmol/L (HCO₃⁻/CO₂ Ratio = ' + (HCO3/dCO2).toFixed(1) + ':1 @ PaCO₂=' + PaCO2 + ' mmHg)';
  }

  hco3El.addEventListener('input', update);
  paco2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter plasma bicarbonate concentration $[\text{HCO}_3^-]$ in mEq/L (normal reference $22\text{ to }26\text{ mEq/L}$).',
      'Enter arterial carbon dioxide partial pressure $\text{PaCO}_2$ in mmHg (normal reference $35\text{ to }45\text{ mmHg}$).',
      'Inspect calculated arterial blood pH and clinical acid-base diagnostic classification.'
    ],
    benefitTitle: 'Lawrence Henderson & Karl Hasselbalch 1916 Acid-Base Standard',
    benefitContent: 'The foundational equation of clinical nephrology and intensive care medicine, linking kidney bicarbonate excretion/reabsorption to lung ventilation rate.',
    faqs: [{ q: 'Why is blood pH tightly regulated between 7.35 and 7.45?', a: 'Enzymes, ion channels, and hemoglobin binding curves are exquisitely sensitive to hydrogen ion concentration; pH outside 6.8–7.8 is fatal.' }]
  },

  // 13. Serum Anion Gap & Serum Osmolality Calculator
  {
    slug: 'plasma-anion-gap-serum-osmolality-osmolar-gap-calculator',
    name: 'Serum Anion Gap & Serum Osmolality / Osmolar Gap Calculator',
    description: 'Calculate clinical Serum Anion Gap in mEq/L (Anion Gap = [Na⁺] - ([Cl⁻] + [HCO₃⁻])), Serum Osmolality in mOsm/kg (2·[Na⁺] + Glucose/18 + BUN/2.8), and Osmolar Gap to diagnose toxic alcohol ingestion.',
    category: 'Science',
    icon: 'text',
    keywords: ['serum anion gap calculator', 'osmolar gap formula methanol ethylene glycol online', 'high anion gap metabolic acidosis mudpiles calculator', 'serum osmolality formula online', 'toxicology nephrology emergency medicine clinical biochemistry online'],
    order: 1447,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sodium Na⁺ (mEq/L), Chloride Cl⁻ (mEq/L), HCO₃⁻ (mEq/L), Glucose (mg/dL) & BUN (mg/dL)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ag-na">Na⁺ (mEq/L)</label>
          <input class="tool-textarea" id="ag-na" type="number" step="1" value="140.0" placeholder="140.0 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-cl">Cl⁻ (mEq/L)</label>
          <input class="tool-textarea" id="ag-cl" type="number" step="1" value="102.0" placeholder="102.0 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-hc">HCO₃⁻ (mEq/L)</label>
          <input class="tool-textarea" id="ag-hc" type="number" step="1" value="24.0" placeholder="24.0 mEq/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-glu">Glucose (mg/dL)</label>
          <input class="tool-textarea" id="ag-glu" type="number" step="10" value="90.0" placeholder="90.0 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ag-bun">BUN (mg/dL)</label>
          <input class="tool-textarea" id="ag-bun" type="number" step="5" value="14.0" placeholder="14.0 mg/dL" />
        </div>
      </div>
      <div id="ag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ag-res-ag" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Anion Gap = 14.0 mEq / L (NORMAL ANION GAP)</span>
            <span class="stat-label">Serum Anion Gap (AG = [Na⁺] - ([Cl⁻] + [HCO₃⁻]))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ag-res-osm" style="color:var(--green-dark); font-weight:700;">Calculated Osmolality = 290.0 mOsm/kg | Expected Normal AG: 8 to 12 mEq/L</span>
            <span class="stat-label">Serum Osmolality (2·Na + Glucose/18 + BUN/2.8)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const naEl = document.getElementById('ag-na'), clEl = document.getElementById('ag-cl');
  const hcEl = document.getElementById('ag-hc'), gluEl = document.getElementById('ag-glu'), bunEl = document.getElementById('ag-bun');
  const agResEl = document.getElementById('ag-res-ag'), osmResEl = document.getElementById('ag-res-osm');

  function update() {
    const Na = parseFloat(naEl.value), Cl = parseFloat(clEl.value);
    const HCO3 = parseFloat(hcEl.value), Glu = parseFloat(gluEl.value), BUN = parseFloat(bunEl.value);

    if (isNaN(Na) || isNaN(Cl) || isNaN(HCO3) || isNaN(Glu) || isNaN(BUN) || Na <= 0 || Cl <= 0 || HCO3 <= 0) return;

    // Serum anion gap: AG = Na - (Cl + HCO3)
    const Anion_Gap = Na - (Cl + HCO3);

    // Calculated serum osmolality in mOsm/kg:
    // Osm = 2 * Na + (Glu / 18) + (BUN / 2.8)
    const Osmolality = (2.0 * Na) + (Glu / 18.0) + (BUN / 2.8);

    let ag_eval = '', color = '#22543d';
    if (Anion_Gap > 12.0) {
      ag_eval = 'HIGH ANION GAP METABOLIC ACIDOSIS (HAGMA: MUDPILES / GOLDMARK - DKA, Lactic Acidosis, Toxic Alcohols, Uremia)';
      color = '#c53030';
    } else if (Anion_Gap < 6.0) {
      ag_eval = 'LOW ANION GAP (Severe Hypoalbuminemia, Multiple Myeloma IgG Paraproteinemia)';
      color = '#ea580c';
    } else {
      ag_eval = 'NORMAL ANION GAP (Non-Anion Gap / Hyperchloremic: Diarrhea, RTA, Saline Infusion)';
      color = '#22543d';
    }

    agResEl.textContent = 'Anion Gap = ' + Anion_Gap.toFixed(1) + ' mEq / L (' + (Anion_Gap > 12 ? 'ELEVATED HAGMA' : 'NORMAL') + ')';
    agResEl.style.color = color;
    osmResEl.textContent = 'Calculated Osmolality = ' + Osmolality.toFixed(1) + ' mOsm/kg | ' + ag_eval;
  }

  [naEl, clEl, hcEl, gluEl, bunEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter serum sodium $[\text{Na}^+]$ in mEq/L.',
      'Enter serum chloride $[\text{Cl}^-]$ in mEq/L.',
      'Enter serum bicarbonate $[\text{HCO}_3^-]$ in mEq/L.',
      'Enter blood glucose in mg/dL.',
      'Enter blood urea nitrogen (BUN) in mg/dL.',
      'Inspect Serum Anion Gap in mEq/L and calculated serum osmolality.'
    ],
    benefitTitle: 'Clinical Toxicology & Nephrology MUDPILES Diagnostic Standard',
    benefitContent: 'Identifies unmeasured pathogenic anions (lactate, ketoacids, formate from methanol, glycolate from ethylene glycol, salicylate, sulfate in renal failure) in critically ill patients.',
    faqs: [{ q: 'What is the MUDPILES mnemonic for High Anion Gap Metabolic Acidosis?', a: 'Methanol, Uremia, Diabetic ketoacidosis, Paraldehyde/Propylene glycol, Isoniazid/Iron, Lactic acidosis, Ethylene glycol, Salicylates (aspirin).' }]
  },

  // 14. Creatinine Clearance Cockcroft-Gault Kidney Dosage Calculator
  {
    slug: 'creatinine-clearance-cockcroft-gault-formula-calculator',
    name: 'Creatinine Clearance Cockcroft-Gault Kidney GFR Dosage Adjustment Calculator',
    description: 'Calculate renal drug clearance Creatinine Clearance CrCl in mL/min (Cockcroft-Gault Formula: CrCl = (140 - Age) · Weight(kg) / (72 · SCr) · (0.85 if Female)) for FDA drug dosing adjustments and kidney function.',
    category: 'Science',
    icon: 'text',
    keywords: ['creatinine clearance calculator', 'cockcroft gault formula online', 'crcl renal drug dosage adjustment calculator', 'serum creatinine kidney function gfr calculator', 'clinical pharmacology pharmacy nephrology online'],
    order: 1448,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Age (Years), Body Weight (kg), Serum Creatinine SCr (mg/dL) & Biological Sex',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cg-age">Age (Years)</label>
          <input class="tool-textarea" id="cg-age" type="number" step="1" value="65" placeholder="65 Years" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-wt">Weight (kg)</label>
          <input class="tool-textarea" id="cg-wt" type="number" step="2" value="72.0" placeholder="72.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-scr">Serum Cr (mg/dL)</label>
          <input class="tool-textarea" id="cg-scr" type="number" step="0.1" value="1.10" placeholder="1.10 mg/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cg-sex">Sex</label>
          <select class="tool-textarea" id="cg-sex" style="padding:0.6rem;">
            <option value="1.0" selected>Male (× 1.0)</option>
            <option value="0.85">Female (× 0.85)</option>
          </select>
        </div>
      </div>
      <div id="cg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cg-res-crcl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CrCl = 68.2 mL / min (MILD RENAL IMPAIRMENT / STAGE 2 CKD)</span>
            <span class="stat-label">Cockcroft-Gault Creatinine Clearance (CrCl = (140-Age)·Wt / (72·SCr))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cg-res-dose" style="color:var(--green-dark); font-weight:700;">FDA DRUG DOSING BRACKET: 50 - 80 mL/min (Standard / Minor Dose Adjustment)</span>
            <span class="stat-label">Pharmacokinetic Renal Elimination Clearance Index</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ageEl = document.getElementById('cg-age'), wtEl = document.getElementById('cg-wt');
  const scrEl = document.getElementById('cg-scr'), sexEl = document.getElementById('cg-sex');
  const clResEl = document.getElementById('cg-res-crcl'), dsResEl = document.getElementById('cg-res-dose');

  function update() {
    const age = parseFloat(ageEl.value), wt = parseFloat(wtEl.value);
    const SCr = parseFloat(scrEl.value), sexFactor = parseFloat(sexEl.value);

    if (isNaN(age) || isNaN(wt) || isNaN(SCr) || age <= 0 || wt <= 0 || SCr <= 0) return;

    // Cockcroft-Gault formula: CrCl = [ (140 - Age) * Weight ] / ( 72 * SCr ) * (0.85 if female)
    const CrCl = ((140.0 - age) * wt) / (72.0 * SCr) * sexFactor;

    let stage = '', color = '#22543d';
    if (CrCl >= 90.0) {
      stage = 'NORMAL KIDNEY FUNCTION (CrCl ≥ 90 mL/min)';
      color = '#22543d';
    } else if (CrCl >= 60.0) {
      stage = 'MILD RENAL IMPAIRMENT (CrCl 60-89 mL/min)';
      color = '#22543d';
    } else if (CrCl >= 30.0) {
      stage = 'MODERATE RENAL IMPAIRMENT (CrCl 30-59 mL/min - Reduce Doses of Renally Cleared Drugs)';
      color = '#ea580c';
    } else if (CrCl >= 15.0) {
      stage = 'SEVERE RENAL IMPAIRMENT (CrCl 15-29 mL/min - Major Dose Reductions Required)';
      color = '#c53030';
    } else {
      stage = 'END-STAGE RENAL DISEASE (CrCl < 15 mL/min - Dialysis Dependent)';
      color = '#c53030';
    }

    clResEl.textContent = 'CrCl = ' + CrCl.toFixed(1) + ' mL / min';
    clResEl.style.color = color;
    dsResEl.textContent = stage + ' [SCr = ' + SCr + ' mg/dL, Age = ' + age + ' y, Wt = ' + wt + ' kg]';
  }

  [ageEl, wtEl, scrEl, sexEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter patient age in years.',
      'Enter patient total actual body weight in kg.',
      'Enter stable baseline serum creatinine (SCr) in mg/dL.',
      'Select patient biological sex (female factor 0.85 accounts for lower average muscle mass).',
      'Inspect calculated Creatinine Clearance in mL/min and FDA renal drug dosing tier.'
    ],
    benefitTitle: 'Donald W. Cockcroft & M. Henry Gault 1976 Renal Dosage Standard',
    benefitContent: 'The universal gold-standard equation specified in FDA drug package inserts (antibiotics, DOAC anticoagulants, chemo agents) to adjust medication dosages and avoid nephrotoxic drug accumulation.',
    faqs: [{ q: 'Why is Cockcroft-Gault preferred over CKD-EPI for drug dosing?', a: 'Most FDA clinical pharmacokinetic drug trials historical labeling criteria were established using Cockcroft-Gault CrCl (in mL/min) rather than body-surface-normalized eGFR.' }]
  },

  // 15. Fick Principle Cardiac Output Calculator
  {
    slug: 'cardiac-output-fick-principle-oxygen-consumption-calculator',
    name: 'Fick Principle Cardiac Output (CO = VO₂ / (CaO₂ - CvO₂)) & Stroke Index Calculator',
    description: 'Calculate clinical hemodynamic Cardiac Output CO in L/min (Adolf Fick Direct Principle: CO = VO₂ / (CaO₂ - CvO₂) = VO₂ / (13.4 · Hb · (SaO₂ - SvO₂))), Cardiac Index CI in L/min/m², and Stroke Volume.',
    category: 'Science',
    icon: 'text',
    keywords: ['fick principle cardiac output calculator', 'cardiac output formula vo2 over cao2 minus cvo2 online', 'cardiac index stroke volume hemodynamic calculator', 'pulmonary artery catheter swan ganz gold standard calculator', 'cardiology intensive care hemodynamics physiology online'],
    order: 1449,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Oxygen Consumption VO₂ (mL/min), Hemoglobin Hb (g/dL), SaO₂ (e.g. 0.98), SvO₂ (e.g. 0.70) & BSA (m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fk-vo2">VO₂ (mL/min)</label>
          <input class="tool-textarea" id="fk-vo2" type="number" step="10" value="250.0" placeholder="250.0 mL/min (Rest)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-hb">Hemoglobin (g/dL)</label>
          <input class="tool-textarea" id="fk-hb" type="number" step="1" value="14.0" placeholder="14.0 g/dL" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-sao2">Arterial SaO₂</label>
          <input class="tool-textarea" id="fk-sao2" type="number" step="0.01" value="0.98" placeholder="0.98 (98%)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-svo2">Mixed Venous SvO₂</label>
          <input class="tool-textarea" id="fk-svo2" type="number" step="0.02" value="0.70" placeholder="0.70 (70% PAC)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-bsa">BSA (m²)</label>
          <input class="tool-textarea" id="fk-bsa" type="number" step="0.1" value="1.80" placeholder="1.80 m²" />
        </div>
      </div>
      <div id="fk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fk-res-co" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cardiac Output CO = 4.76 L / min (NORMAL FLOW)</span>
            <span class="stat-label">Direct Fick Principle (CO = VO₂ / (CaO₂ - CvO₂))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fk-res-ci" style="color:var(--green-dark); font-weight:700;">Cardiac Index CI = 2.64 L/min/m² (Normal: 2.5 - 4.0) | A-V O₂ Diff = 52.5 mL/L</span>
            <span class="stat-label">Arteriovenous Oxygen Extraction Difference & Hemodynamic Index</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vo2El = document.getElementById('fk-vo2'), hbEl = document.getElementById('fk-hb');
  const sao2El = document.getElementById('fk-sao2'), svo2El = document.getElementById('fk-svo2'), bsaEl = document.getElementById('fk-bsa');
  const coResEl = document.getElementById('fk-res-co'), ciResEl = document.getElementById('fk-res-ci');

  function update() {
    const VO2 = parseFloat(vo2El.value), Hb = parseFloat(hbEl.value);
    const SaO2 = parseFloat(sao2El.value), SvO2 = parseFloat(svo2El.value), BSA = parseFloat(bsaEl.value);

    if (isNaN(VO2) || isNaN(Hb) || isNaN(SaO2) || isNaN(SvO2) || isNaN(BSA) || VO2 <= 0 || Hb <= 0 || SaO2 <= SvO2 || BSA <= 0) return;

    // Oxygen content in mL O2 / L of blood (Hüfner's constant 1.34 mL/g Hb):
    // CaO2 - CvO2 = 1.34 * Hb * 10 * (SaO2 - SvO2)  [mL O2 / Liter blood]
    const av_diff_mLO2_L = 1.34 * Hb * 10.0 * (SaO2 - SvO2);

    // Cardiac output in L / min: CO = VO2 / (CaO2 - CvO2)
    const CO = VO2 / av_diff_mLO2_L;

    // Cardiac Index in L / min / m^2: CI = CO / BSA
    const CI = CO / BSA;

    let eval_text = '', color = '#22543d';
    if (CI < 2.2) {
      eval_text = 'CARDIOGENIC SHOCK / LOW CARDIAC OUTPUT (CI < 2.2 L/min/m²)';
      color = '#c53030';
    } else if (CI < 2.5) {
      eval_text = 'BORDERLINE LOW CARDIAC INDEX (2.2 - 2.5 L/min/m²)';
      color = '#ea580c';
    } else if (CI > 4.2) {
      eval_text = 'HYPERDYNAMIC STATE (Sepsis, Anemia, Cirrhosis)';
      color = '#ea580c';
    } else {
      eval_text = 'NORMAL HEMODYNAMIC CARDIAC INDEX (2.5 - 4.0 L/min/m² ✓)';
      color = '#22543d';
    }

    coResEl.textContent = 'Cardiac Output CO = ' + CO.toFixed(2) + ' L / min (' + (CI >= 2.5 && CI <= 4.0 ? 'NORMAL' : 'ABNORMAL') + ')';
    coResEl.style.color = color;
    ciResEl.textContent = 'Cardiac Index CI = ' + CI.toFixed(2) + ' L/min/m² | ' + eval_text + ' (A-V Diff = ' + av_diff_mLO2_L.toFixed(1) + ' mL/L)';
  }

  [vo2El, hbEl, sao2El, svo2El, bsaEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total body oxygen consumption rate $V\text{O}_2$ in mL/min (typically $125\text{ mL/min/m}^2$ or $\sim 250\text{ mL/min}$ at rest).',
      'Enter blood hemoglobin concentration Hb in g/dL.',
      'Enter arterial oxygen saturation $S_a\text{O}_2$ (e.g. 0.98 for 98%).',
      'Enter mixed venous oxygen saturation $S_v\text{O}_2$ measured from a Swan-Ganz pulmonary artery catheter (e.g. 0.70 for 70%).',
      'Enter patient Body Surface Area (BSA) in $\text{m}^2$.',
      'Inspect Cardiac Output in L/min and normalized Cardiac Index in $\text{L/min/m}^2$.'
    ],
    benefitTitle: 'Adolf Fick 1870 Mass Balance Hemodynamic Standard',
    benefitContent: 'The gold-standard reference method for measuring human blood flow and diagnosing cardiogenic shock during right heart catheterization.',
    faqs: [{ q: 'Why is low mixed venous oxygen saturation (SvO2 < 60%) alarming?', a: 'When cardiac output drops, tissues must extract a higher percentage of oxygen from each milliliter of circulating blood, causing $S_v\text{O}_2$ to drop steeply.' }]
  },

  // 16. Hagen-Poiseuille Vascular Resistance Calculator
  {
    slug: 'poiseuille-vascular-resistance-blood-flow-viscosity-calculator',
    name: 'Hagen-Poiseuille Vascular Resistance (R = 8ηL / πr⁴) & Blood Flow Calculator',
    description: 'Calculate cardiovascular hemodynamic laminar blood flow resistance R (Hagen-Poiseuille Law: R = 8 · η · L / (π · r⁴)), volumetric blood flow rate Q = ΔP / R in mL/min, and demonstrate 4th-power vessel radius sensitivity.',
    category: 'Science',
    icon: 'text',
    keywords: ['poiseuille vascular resistance calculator', 'hagen poiseuille blood flow formula online', 'vessel radius fourth power resistance calculator', 'arterial vasoconstriction blood pressure calculator', 'hemodynamics physiology biomedical engineering cardiology online'],
    order: 1450,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Perfusion Pressure ΔP (mmHg), Vessel Radius r (mm), Vessel Length L (cm) & Blood Viscosity η (cP)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ps-dp">Pressure ΔP (mmHg)</label>
          <input class="tool-textarea" id="ps-dp" type="number" step="5" value="40.0" placeholder="40.0 mmHg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-r">Radius r (mm)</label>
          <input class="tool-textarea" id="ps-r" type="number" step="0.2" value="1.5" placeholder="1.5 mm Artery" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-l">Length L (cm)</label>
          <input class="tool-textarea" id="ps-l" type="number" step="2" value="10.0" placeholder="10.0 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-eta">Viscosity η (cP)</label>
          <input class="tool-textarea" id="ps-eta" type="number" step="0.5" value="3.5" placeholder="3.5 cP (Blood)" />
        </div>
      </div>
      <div id="ps-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ps-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Blood Flow Q = 380 mL / min</span>
            <span class="stat-label">Hagen-Poiseuille Flow Rate (Q = π · r⁴ · ΔP / (8 · η · L))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ps-res-sens" style="color:var(--green-dark); font-weight:700;">16× FLOW REDUCTION IF RADIUS HALVED (r⁴ Law: 50% Stenosis Drops Flow to 6.25%!)</span>
            <span class="stat-label">Arteriolar Vasomotion Resistance Sensitivity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dpEl = document.getElementById('ps-dp'), rEl = document.getElementById('ps-r');
  const lEl = document.getElementById('ps-l'), etEl = document.getElementById('ps-eta');
  const qResEl = document.getElementById('ps-res-q'), snResEl = document.getElementById('ps-res-sens');

  function update() {
    const dP_mmHg = parseFloat(dpEl.value), r_mm = parseFloat(rEl.value);
    const L_cm = parseFloat(lEl.value), eta_cP = parseFloat(etEl.value);

    if (isNaN(dP_mmHg) || isNaN(r_mm) || isNaN(L_cm) || isNaN(eta_cP) || dP_mmHg <= 0 || r_mm <= 0 || L_cm <= 0 || eta_cP <= 0) return;

    // Convert to SI units:
    // 1 mmHg = 133.322 Pa
    const dP_Pa = dP_mmHg * 133.322;
    // r in meters: 1 mm = 1e-3 m
    const r_m = r_mm * 1e-3;
    // L in meters: 1 cm = 1e-2 m
    const L_m = L_cm * 1e-2;
    // Viscosity in Pa*s: 1 cP = 1e-3 Pa*s
    const eta_Pas = eta_cP * 1e-3;

    // Hagen-Poiseuille flow Q in m^3 / s:
    // Q = ( pi * r^4 * dP ) / ( 8 * eta * L )
    const Q_m3_s = (Math.PI * Math.pow(r_m, 4) * dP_Pa) / (8.0 * eta_Pas * L_m);

    // Convert Q to mL / min: 1 m^3/s = 1e6 mL/s = 6e7 mL/min
    const Q_mL_min = Q_m3_s * 6e7;

    // Vascular resistance in mmHg * min / mL:
    const R_vasc = dP_mmHg / Q_mL_min;

    qResEl.textContent = 'Blood Flow Q = ' + Math.round(Q_mL_min).toLocaleString() + ' mL / min';
    snResEl.textContent = 'Vascular Resistance R = ' + R_vasc.toExponential(2) + ' mmHg·min/mL | Halving radius (r/2) increases resistance by 16× (r⁴ = ' + Math.pow(r_mm, 4).toFixed(2) + ' mm⁴)';
  }

  [dpEl, rEl, lEl, etEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter perfusion pressure gradient $\Delta P$ across the vessel in mmHg.',
      'Enter internal blood vessel lumen radius r in millimeters.',
      'Enter vessel length L in centimeters.',
      'Enter whole blood dynamic viscosity $\eta$ in centipoise (cP, normal $3.5\text{ cP}$, rises in polycythemia).',
      'Inspect total volumetric blood flow rate in mL/min and evaluate 4th-power radius dependence.'
    ],
    benefitTitle: 'Gotthilf Hagen & Jean Poiseuille 1840 Vascular Standard',
    benefitContent: 'Demonstrates why arterioles are the primary resistance regulators in the body: tiny changes in smooth muscle contraction ($10\%$ constriction) cause massive ($34\%$) drops in local organ blood perfusion.',
    faqs: [{ q: 'Why is blood pressure so sensitive to arterial vasoconstriction?', a: 'Resistance is inversely proportional to radius to the 4th power ($R \propto 1/r^4$); a $16\%$ reduction in vessel diameter doubles resistance to blood flow.' }]
  },

  // 17. Orthopedic Prosthetic Hip Joint Contact Stress Calculator
  {
    slug: 'prosthetic-joint-contact-stress-hertzian-contact-calculator',
    name: 'Orthopedic Prosthetic Hip Joint Hertzian Contact Stress & Wear Calculator',
    description: 'Calculate biomedical orthopedic total hip replacement artificial joint peak contact stress σ_max in MPa (Hertzian Spherical Contact Mechanics: σ_max = 3·F / (2·π·a²)) on UHMWPE polyethylene / ceramic liners and predict wear risk.',
    category: 'Science',
    icon: 'text',
    keywords: ['prosthetic joint contact stress calculator', 'hertzian contact mechanics orthopedic hip formula online', 'uhmwpe polyethylene wear peak stress mpa calculator', 'total hip arthroplasty contact area radius calculator', 'biomechanics orthopedic biomedical engineering materials online'],
    order: 1451,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Joint Contact Load F (N, e.g. 3× Body Weight), Femoral Head Radius R₁ (mm) & Cup Radius R₂ (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hj-f">Joint Load F (N)</label>
          <input class="tool-textarea" id="hj-f" type="number" step="250" value="2500.0" placeholder="2,500 N (3.5× BW Gait)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hj-r1">Head Radius R₁ (mm)</label>
          <input class="tool-textarea" id="hj-r1" type="number" step="2" value="16.0" placeholder="16.0 mm (32mm Head)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hj-r2">Cup Radius R₂ (mm)</label>
          <input class="tool-textarea" id="hj-r2" type="number" step="0.1" value="16.2" placeholder="16.2 mm (Radial Clearance)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hj-e">Cup Modulus E (GPa)</label>
          <input class="tool-textarea" id="hj-e" type="number" step="0.2" value="1.0" placeholder="1.0 GPa (UHMWPE Liner)" />
        </div>
      </div>
      <div id="hj-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hj-res-stress" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Peak Contact Stress σ_max = 14.8 MPa</span>
            <span class="stat-label">Hertzian Maximum Normal Contact Stress (σ_max = 3·F / (2·π·a²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hj-res-eval" style="color:var(--green-dark); font-weight:700;">SAFE WORKING STRESS (Below 20 MPa Yield Strength of Cross-Linked Polyethylene ✓)</span>
            <span class="stat-label">Contact Patch Radius a = 8.9 mm | Clearance Δr = 0.20 mm (200 μm)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('hj-f'), r1El = document.getElementById('hj-r1');
  const r2El = document.getElementById('hj-r2'), eEl = document.getElementById('hj-e');
  const stResEl = document.getElementById('hj-res-stress'), evResEl = document.getElementById('hj-res-eval');

  function update() {
    const F_N = parseFloat(fEl.value), R1_mm = parseFloat(r1El.value);
    const R2_mm = parseFloat(r2El.value), E_cup_GPa = parseFloat(eEl.value);

    if (isNaN(F_N) || isNaN(R1_mm) || isNaN(R2_mm) || isNaN(E_cup_GPa) || F_N <= 0 || R1_mm <= 0 || R2_mm <= R1_mm || E_cup_GPa <= 0) return;

    // Contact mechanics for sphere in conforming spherical socket:
    // Relative curvature: 1/R_eff = 1/R1 - 1/R2
    const R1_m = R1_mm * 1e-3;
    const R2_m = R2_mm * 1e-3;
    const one_over_Reff = (1.0 / R1_m) - (1.0 / R2_m);
    const R_eff_m = 1.0 / one_over_Reff;

    // Equivalent elastic modulus E*:
    // For metal/ceramic head (E >> E_cup) and cup (Poisson ~ 0.4):
    // E* approx E_cup / (1 - nu^2) approx E_cup / 0.84
    const E_star_Pa = (E_cup_GPa * 1e9) / 0.84;

    // Hertzian contact radius: a = ( (3 * F * R_eff) / (4 * E*) )^(1/3)
    const a_m = Math.pow((3.0 * F_N * R_eff_m) / (4.0 * E_star_Pa), 1.0 / 3.0);
    const a_mm = a_m * 1000.0;

    // Peak contact stress: sigma_max = 3 * F / ( 2 * pi * a^2 )  [Pa -> MPa]
    const sigma_max_Pa = (3.0 * F_N) / (2.0 * Math.PI * Math.pow(a_m, 2));
    const sigma_max_MPa = sigma_max_Pa / 1e6;

    let eval_text = '', color = '#22543d';
    if (sigma_max_MPa > 25.0) {
      eval_text = 'EXCESSIVE CONTACT STRESS (Risk of Polyethylene Delamination / Wear Debris Osteolysis)';
      color = '#c53030';
    } else if (sigma_max_MPa > 18.0) {
      eval_text = 'MODERATE-HIGH STRESS (Acceptable for Ceramic-on-Ceramic, high for Conventional UHMWPE)';
      color = '#ea580c';
    } else {
      eval_text = 'OPTIMAL CONTACT STRESS (Long Joint Replacement Implant Longevity ✓)';
      color = '#22543d';
    }

    stResEl.textContent = 'Peak Contact Stress σ_max = ' + sigma_max_MPa.toFixed(1) + ' MPa';
    stResEl.style.color = color;
    evResEl.textContent = eval_text + ' [Contact Radius a = ' + a_mm.toFixed(1) + ' mm, Clearance = ' + ((R2_mm - R1_mm)*1000).toFixed(0) + ' μm @ F = ' + F_N + ' N]';
  }

  [fEl, r1El, r2El, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter peak hip joint resultant contact force F in Newtons (during walking gait, peak force reaches 3–4× body weight, $\sim 2500\text{ N}$).',
      'Enter prosthetic femoral head ball radius $R_1$ in mm (e.g. 14 mm for 28mm head, 16 mm for 32mm head, 18 mm for 36mm head).',
      'Enter acetabular socket cup inner radius $R_2$ in mm ($R_2 > R_1$).',
      'Enter liner material Young\'s Elastic Modulus in GPa ($1.0\text{ GPa}$ for UHMWPE plastic, $400\text{ GPa}$ for Alumina ceramic).',
      'Inspect peak compressive contact stress $\sigma_{\max}$ in MPa and contact patch footprint size.'
    ],
    benefitTitle: 'Heinrich Hertz 1882 Orthopedic Contact Mechanics Standard',
    benefitContent: 'Prevents catastrophic polyethylene fatigue wear, micro-cracking, and wear debris osteolysis (which causes aseptic implant loosening and revision surgery) by optimizing implant head diameter and radial clearance.',
    faqs: [{ q: 'Why do larger femoral heads (36mm vs 28mm) reduce dislocation risk?', a: 'Larger heads provide greater jump distance before dislocation occurs, and spread joint contact forces over a larger surface area, lowering peak pressure.' }]
  },

  // 18. Archibald Hill Muscle Force-Velocity Hyperbolic Relation Calculator
  {
    slug: 'human-skeletal-muscle-hill-force-velocity-relation-calculator',
    name: 'Archibald Hill Muscle Force-Velocity Hyperbolic Relation & Peak Power Calculator',
    description: 'Calculate skeletal muscle contraction biomechanics (A.V. Hill Hyperbolic Equation: (F + a)·(v + b) = (F_0 + a)·b), shortening velocity v at load F, instantaneous mechanical power output P = F · v in Watts, and optimal velocity for peak power (v_opt ≈ 0.31 v_max).',
    category: 'Science',
    icon: 'text',
    keywords: ['hill muscle force velocity calculator', 'muscle contraction power output formula online', 'isometric tetanic force f0 hill hyperbolic curve calculator', 'maximum shortening velocity vmax peak power calculator', 'biomechanics exercise physiology muscle mechanics online'],
    order: 1452,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Operating Load Force F (N), Maximum Isometric Force F₀ (N) & Max Unloaded Velocity v_max (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hm-f">Load Force F (N)</label>
          <input class="tool-textarea" id="hm-f" type="number" step="25" value="150.0" placeholder="150.0 N Load" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hm-f0">Max Isometric F₀ (N)</label>
          <input class="tool-textarea" id="hm-f0" type="number" step="50" value="500.0" placeholder="500.0 N (Tetanus F₀)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hm-vmax">Max Speed v_max (m/s)</label>
          <input class="tool-textarea" id="hm-vmax" type="number" step="0.5" value="2.0" placeholder="2.0 m/s (Unloaded)" />
        </div>
      </div>
      <div id="hm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hm-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Mechanical Power P = 117.8 Watts</span>
            <span class="stat-label">Instantaneous Muscle Power Output (P = Force · Velocity)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hm-res-speed" style="color:var(--green-dark); font-weight:700;">Shortening Speed v = 0.785 m / s (39.3% v_max) | Peak Power = 125.0 W @ F ≈ 0.33 F₀</span>
            <span class="stat-label">Hill Muscle Dynamic Hyperbolic Force-Velocity Equilibrium</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('hm-f'), f0El = document.getElementById('hm-f0'), vmEl = document.getElementById('hm-vmax');
  const pwResEl = document.getElementById('hm-res-pwr'), spResEl = document.getElementById('hm-res-speed');

  function update() {
    const F = parseFloat(fEl.value), F0 = parseFloat(f0El.value), vmax = parseFloat(vmEl.value);
    if (isNaN(F) || isNaN(F0) || isNaN(vmax) || F < 0 || F > F0 || F0 <= 0 || vmax <= 0) return;

    // Hill characteristic constants (standard physiological a/F0 = 0.25):
    const a = 0.25 * F0;
    const b = (a * vmax) / F0; // b = 0.25 * vmax

    // Hill velocity equation: v = b * (F0 - F) / (F + a)  [m / s]
    const v = (b * (F0 - F)) / (F + a);
    const v_pct = (v / vmax) * 100.0;

    // Power output: P = F * v  [Watts]
    const Power_W = F * v;

    // Peak theoretical muscle power (occurs near F/F0 ~ 0.31, v/vmax ~ 0.31):
    const P_max_theoretical = 0.10 * F0 * vmax * 1.25;

    pwResEl.textContent = 'Mechanical Power P = ' + Power_W.toFixed(1) + ' Watts (' + (Power_W * 1.341e-3).toFixed(2) + ' hp)';
    spResEl.textContent = 'Shortening Speed v = ' + v.toFixed(3) + ' m/s (' + v_pct.toFixed(1) + '% v_max) | Max Power = ' + P_max_theoretical.toFixed(1) + ' W (F/F₀ = ' + (F/F0).toFixed(2) + ')';
  }

  [fEl, f0El, vmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied muscle load force F in Newtons ($0 \le F \le F_0$).',
      'Enter maximum isometric zero-velocity tetanic muscle strength force $F_0$ in Newtons.',
      'Enter maximum unloaded maximum shortening velocity $v_{\max}$ in m/s.',
      'Inspect muscle shortening velocity v, instantaneous mechanical power output in Watts, and optimal load fraction for sprint power.'
    ],
    benefitTitle: 'Archibald Vivian Hill 1938 Skeletal Muscle Mechanics Standard',
    benefitContent: 'Models the fundamental trade-off of human muscle physiology: muscle produces maximum force at zero speed ($F_0$) and maximum speed at zero force ($v_{\max}$), with peak power occurring at $\sim 30\%\text{ to }35\%$ of maximum load.',
    faqs: [{ q: 'Why do track cyclists and sprinters train at specific cadences (90–110 RPM)?', a: 'Cadence dictates muscle shortening velocity; pedaling at $\sim 30\%$ of maximum unloaded spin speed matches the peak of Hill\'s power-velocity curve.' }]
  },

  // 19. Hemodialysis Single-Pool Daugirdas Kt/V Adequacy Calculator
  {
    slug: 'dialysis-urea-kinetic-modeling-kt-v-adequacy-calculator',
    name: 'Hemodialysis Urea Kinetic Modeling (Single-Pool Daugirdas Kt/V Adequacy) Calculator',
    description: 'Calculate end-stage renal disease hemodialysis adequacy Kt/V (Second Generation Daugirdas Single-Pool spKt/V: Kt/V = -ln(R - 0.008·t) + (4 - 3.5·R) · (UF / W)), Urea Reduction Ratio URR%, and target adequacy validation.',
    category: 'Science',
    icon: 'text',
    keywords: ['dialysis kt over v calculator', 'daugirdas single pool spkt v formula online', 'hemodialysis adequacy urea reduction ratio urr calculator', 'esrd dialysis dose ultrafiltration volume calculator', 'nephrology kidney dialysis biomedical medicine online'],
    order: 1453,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pre-Dialysis BUN C₀ (mg/dL), Post-Dialysis BUN C (mg/dL), Time t (Hours) & Ultrafiltration UF (L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kd-pre">Pre-BUN (mg/dL)</label>
          <input class="tool-textarea" id="kd-pre" type="number" step="5" value="70.0" placeholder="70.0 mg/dL (Pre-Dialysis)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kd-post">Post-BUN (mg/dL)</label>
          <input class="tool-textarea" id="kd-post" type="number" step="2" value="20.0" placeholder="20.0 mg/dL (Post-Dialysis)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kd-t">Duration t (hr)</label>
          <input class="tool-textarea" id="kd-t" type="number" step="0.25" value="4.0" placeholder="4.0 Hours" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kd-uf">Ultrafiltration UF (L)</label>
          <input class="tool-textarea" id="kd-uf" type="number" step="0.5" value="2.5" placeholder="2.5 L Fluid Removed" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kd-w">Post Weight W (kg)</label>
          <input class="tool-textarea" id="kd-w" type="number" step="2" value="70.0" placeholder="70.0 kg Post Weight" />
        </div>
      </div>
      <div id="kd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kd-res-ktv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Dialysis Dose spKt/V = 1.43 (ADEQUATE DIALYSIS TARGET ACHIEVED)</span>
            <span class="stat-label">2nd Gen Daugirdas Single-Pool Kt/V Adequacy</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kd-res-urr" style="color:var(--green-dark); font-weight:700;">URR = 71.4% (KDOQI Target ≥ 65% ✓) | KDOQI Minimum Target: spKt/V ≥ 1.20 (Delivered ≥ 1.40)</span>
            <span class="stat-label">Urea Reduction Ratio (URR = (Pre - Post) / Pre · 100%)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const preEl = document.getElementById('kd-pre'), postEl = document.getElementById('kd-post');
  const tEl = document.getElementById('kd-t'), ufEl = document.getElementById('kd-uf'), wEl = document.getElementById('kd-w');
  const ktResEl = document.getElementById('kd-res-ktv'), urResEl = document.getElementById('kd-res-urr');

  function update() {
    const C0 = parseFloat(preEl.value), C = parseFloat(postEl.value);
    const t_hr = parseFloat(tEl.value), UF_L = parseFloat(ufEl.value), W_kg = parseFloat(wEl.value);

    if (isNaN(C0) || isNaN(C) || isNaN(t_hr) || isNaN(UF_L) || isNaN(W_kg) || C0 <= C || C <= 0 || t_hr <= 0 || W_kg <= 0) return;

    // Urea ratio R = C / C0
    const R = C / C0;

    // Urea reduction ratio URR:
    const URR_pct = (1.0 - R) * 100.0;

    // Daugirdas 2nd generation spKt/V formula:
    // spKt/V = - ln( R - 0.008 * t ) + ( 4 - 3.5 * R ) * ( UF / W )
    const term1 = - Math.log(R - (0.008 * t_hr));
    const term2 = (4.0 - (3.5 * R)) * (UF_L / W_kg);
    const spKtV = term1 + term2;

    let eval_text = '', color = '#22543d';
    if (spKtV < 1.20) {
      eval_text = 'INADEQUATE DIALYSIS DOSE (spKt/V < 1.20: Increase blood flow, dialysate flow, or duration)';
      color = '#c53030';
    } else if (spKtV < 1.40) {
      eval_text = 'BORDERLINE ADEQUACY (Meets KDOQI minimum 1.20, below target 1.40)';
      color = '#ea580c';
    } else {
      eval_text = 'OPTIMAL ADEQUATE DIALYSIS DOSE (spKt/V ≥ 1.40 Target ✓)';
      color = '#22543d';
    }

    ktResEl.textContent = 'Dialysis Dose spKt/V = ' + spKtV.toFixed(2) + ' (' + (spKtV >= 1.20 ? 'ADEQUATE' : 'INADEQUATE') + ')';
    ktResEl.style.color = color;
    urResEl.textContent = 'URR = ' + URR_pct.toFixed(1) + '% | ' + eval_text + ' (R = ' + R.toFixed(3) + ' @ ' + t_hr + ' hr, UF = ' + UF_L + ' L)';
  }

  [preEl, postEl, tEl, ufEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pre-dialysis Blood Urea Nitrogen (BUN) $C_0$ in mg/dL.',
      'Enter immediate post-dialysis BUN C in mg/dL.',
      'Enter total hemodialysis treatment duration t in hours (typically 3.5–4.5 hours).',
      'Enter ultrafiltration fluid volume removed (UF) in Liters.',
      'Enter patient post-dialysis target dry body weight W in kg.',
      'Inspect single-pool Daugirdas $spKt/V$ dose and Urea Reduction Ratio (URR%).'
    ],
    benefitTitle: 'John T. Daugirdas 1993 KDOQI Dialysis Adequacy Standard',
    benefitContent: 'Governs clinical hemodialysis prescriptions worldwide: maintaining $spKt/V \ge 1.40$ ($URR \ge 70\%$) significantly reduces uremic complications and all-cause mortality in kidney failure patients.',
    faqs: [{ q: 'What do the letters K, t, and V stand for in Kt/V?', a: 'K is dialyzer urea clearance rate (mL/min), t is treatment time (min), and V is the patient\'s total body water volume in which urea is distributed (mL).' }]
  },

  // 20. PET Scan Standardized Uptake Value (SUV_bw) Calculator
  {
    slug: 'pet-scan-standardized-uptake-value-suv-tumor-metabolism-calculator',
    name: 'PET Scan Standardized Uptake Value (SUV_bw) Tumor Metabolic Activity Calculator',
    description: 'Calculate Positron Emission Tomography (PET) diagnostic tumor metabolic FDG radiotracer avidity Standardized Uptake Value SUV_bw (SUV = Tissue Activity Concentration (kBq/mL) / (Decayed Injected Dose (MBq) / Patient Body Weight (kg))).',
    category: 'Science',
    icon: 'text',
    keywords: ['pet scan suv calculator', 'standardized uptake value formula suv bw online', 'pet ct 18f fdg tumor metabolism calculator', 'radiotracer tissue activity concentration calculator', 'nuclear medicine oncology radiology medical physics online'],
    order: 1454,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tissue Activity C_tissue (kBq/mL), Injected Dose (MBq), Uptake Time (min) & Body Weight (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="suv-ct">Tissue Activity (kBq/mL)</label>
          <input class="tool-textarea" id="suv-ct" type="number" step="5" value="28.0" placeholder="28.0 kBq/mL (Tumor ROI)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="suv-dose">Injected Dose (MBq)</label>
          <input class="tool-textarea" id="suv-dose" type="number" step="50" value="370.0" placeholder="370.0 MBq (10 mCi ¹⁸F-FDG)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="suv-t">Uptake Time (min)</label>
          <input class="tool-textarea" id="suv-t" type="number" step="5" value="60.0" placeholder="60.0 min (Standard Scan)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="suv-w">Weight (kg)</label>
          <input class="tool-textarea" id="suv-w" type="number" step="2" value="70.0" placeholder="70.0 kg" />
        </div>
      </div>
      <div id="suv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="suv-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">SUV_bw = 7.82 (HYPERMETABOLIC MALIGNANT FDG AVIDITY)</span>
            <span class="stat-label">Standardized Uptake Value (SUV = C_tissue / (Dose_decayed / Weight))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="suv-res-eval" style="color:var(--green-dark); font-weight:700;">MALIGNANT TUMOR RISK: SUV > 2.5 (High Glycolytic Warburg Metabolism ✓)</span>
            <span class="stat-label">Decayed Dose at Scan Time = 250.7 MBq (¹⁸F Half-life t_1/2 = 109.8 min)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ctEl = document.getElementById('suv-ct'), dsEl = document.getElementById('suv-dose');
  const tEl = document.getElementById('suv-t'), wEl = document.getElementById('suv-w');
  const svResEl = document.getElementById('suv-res-val'), evResEl = document.getElementById('suv-res-eval');

  const half_life_F18 = 109.77; // minutes for Fluorine-18

  function update() {
    const C_tissue_kBq_mL = parseFloat(ctEl.value), Injected_MBq = parseFloat(dsEl.value);
    const time_min = parseFloat(tEl.value), W_kg = parseFloat(wEl.value);

    if (isNaN(C_tissue_kBq_mL) || isNaN(Injected_MBq) || isNaN(time_min) || isNaN(W_kg) || C_tissue_kBq_mL < 0 || Injected_MBq <= 0 || time_min < 0 || W_kg <= 0) return;

    // Decay correction for 18F: Dose_decayed = Dose_inj * exp( - ln(2) * t / t_1/2 )
    const lambda_decay = Math.LN2 / half_life_F18;
    const Decayed_Dose_MBq = Injected_MBq * Math.exp(- lambda_decay * time_min);

    // Injected dose concentration in kBq / g (assuming tissue density 1 g/mL):
    // Dose_conc_kBq_g = (Decayed_Dose_MBq * 1000 kBq/MBq) / (W_kg * 1000 g/kg) = Decayed_Dose_MBq / W_kg
    const Dose_conc = Decayed_Dose_MBq / W_kg;

    // SUV_bw = C_tissue / Dose_conc
    const SUV_bw = C_tissue_kBq_mL / Dose_conc;

    let eval_text = '', color = '#22543d';
    if (SUV_bw > 5.0) {
      eval_text = 'INTENSE HYPERMETABOLISM (Strongly suggestive of active malignancy / high-grade lymphoma/carcinoma)';
      color = '#c53030';
    } else if (SUV_bw >= 2.5) {
      eval_text = 'MODERATE FDG AVIDITY (Malignant lesion or active inflammatory granuloma)';
      color = '#ea580c';
    } else {
      eval_text = 'PHYSIOLOGICAL / BENIGN BACKGROUND (Low metabolic glucose turnover)';
      color = '#22543d';
    }

    svResEl.textContent = 'SUV_bw = ' + SUV_bw.toFixed(2) + ' (' + (SUV_bw >= 2.5 ? 'HYPERMETABOLIC' : 'NORMAL') + ')';
    svResEl.style.color = color;
    evResEl.textContent = eval_text + ' [Decayed Dose = ' + Decayed_Dose_MBq.toFixed(1) + ' MBq @ ' + time_min + ' min post-injection, W = ' + W_kg + ' kg]';
  }

  [ctEl, dsEl, tEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Region of Interest (ROI) tissue radiotracer activity concentration $C_{\text{tissue}}$ in $\text{kBq/mL}$ from PET scanner voxel data.',
      'Enter initial injected dose of $^{18}\text{F}$-FDG radiotracer in MBq ($1\text{ mCi} = 37\text{ MBq}$).',
      'Enter uptake incubation time between injection and scan acquisition in minutes (standard $60\text{ min}$).',
      'Enter patient body weight in kg.',
      'Inspect Standardized Uptake Value ($\text{SUV}_{\text{bw}}$) and diagnostic malignancy stratification.'
    ],
    benefitTitle: 'Positron Emission Tomography Quantitative SUV Standard',
    benefitContent: 'Normalizes radiotracer uptake for patient size and physical radioisotope decay ($t_{1/2} = 109.8\text{ min}$), enabling oncologists to quantify tumor glucose consumption (Warburg effect) and assess response to chemotherapy.',
    faqs: [{ q: 'What is a typical cutoff for malignant tumors on FDG-PET?', a: 'Lesions with $\text{SUV} > 2.5$ have high likelihood of malignancy (e.g. solitary pulmonary nodules), though active infections (tuberculosis, abscesses) can also yield high SUV.' }]
  },

  // 21. ECG Corrected QT Interval Calculator
  {
    slug: 'electrocardiogram-ecg-corrected-qt-interval-bazett-fridericia-calculator',
    name: 'ECG Corrected QT Interval (Bazett & Fridericia QTc Formula) Calculator',
    description: 'Calculate electrocardiogram (ECG) heart rate-corrected QT interval QTc in milliseconds (Bazett Formula: QTc = QT / √RR, Fridericia Formula: QTc = QT / RR^(1/3), Framingham, Hodges) to diagnose Long QT Syndrome and arrhythmia risk.',
    category: 'Science',
    icon: 'text',
    keywords: ['ecg corrected qt interval calculator', 'qtc bazett fridericia formula online', 'long qt syndrome torsades de pointes calculator', 'rr interval heart rate ecg calculator', 'cardiology electrophysiology medicine pharmacology online'],
    order: 1455,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Measured QT Interval (ms), Heart Rate HR (bpm) or RR Interval (Seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ecg-qt">QT Interval (ms)</label>
          <input class="tool-textarea" id="ecg-qt" type="number" step="10" value="440.0" placeholder="440.0 ms" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ecg-hr">Heart Rate (bpm)</label>
          <input class="tool-textarea" id="ecg-hr" type="number" step="5" value="80.0" placeholder="80.0 bpm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ecg-sex">Sex</label>
          <select class="tool-textarea" id="ecg-sex" style="padding:0.6rem;">
            <option value="male" selected>Male (Normal ≤ 450 ms)</option>
            <option value="female">Female (Normal ≤ 460 ms)</option>
          </select>
        </div>
      </div>
      <div id="ecg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ecg-res-baz" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bazett QTc = 508 ms (PROLONGED QTc INTERVAL)</span>
            <span class="stat-label">Bazett Corrected QT (QTc = QT / √RR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ecg-res-frid" style="color:var(--green-dark); font-weight:700;">Fridericia QTc = 484 ms | RR Interval = 750 ms (0.75 s)</span>
            <span class="stat-label">Fridericia (QTc = QT / RR^0.333) & Long QT / Torsades Risk</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qtEl = document.getElementById('ecg-qt'), hrEl = document.getElementById('ecg-hr'), sexEl = document.getElementById('ecg-sex');
  const bzResEl = document.getElementById('ecg-res-baz'), frResEl = document.getElementById('ecg-res-frid');

  function update() {
    const QT_ms = parseFloat(qtEl.value), HR_bpm = parseFloat(hrEl.value);
    const sex = sexEl.value;

    if (isNaN(QT_ms) || isNaN(HR_bpm) || QT_ms <= 0 || HR_bpm <= 0) return;

    // RR interval in seconds: RR = 60 / HR
    const RR_sec = 60.0 / HR_bpm;
    const RR_ms = RR_sec * 1000.0;

    // Bazett formula: QTc = QT / sqrt(RR_sec)
    const QTc_bazett = QT_ms / Math.sqrt(RR_sec);

    // Fridericia formula: QTc = QT / (RR_sec^(1/3))
    const QTc_fridericia = QT_ms / Math.pow(RR_sec, 1.0 / 3.0);

    // Normal thresholds:
    const normal_limit = (sex === 'male') ? 450.0 : 460.0;

    let eval_text = '', color = '#22543d';
    if (QTc_bazett > 500.0) {
      eval_text = 'SEVERELY PROLONGED QTc (> 500 ms: High Risk of Torsades de Pointes / Fatal Ventricular Arrhythmia)';
      color = '#c53030';
    } else if (QTc_bazett > normal_limit) {
      eval_text = 'PROLONGED QTc (Above ' + normal_limit + ' ms threshold for ' + sex + ')';
      color = '#ea580c';
    } else {
      eval_text = 'NORMAL QTc INTERVAL (≤ ' + normal_limit + ' ms for ' + sex + ' ✓)';
      color = '#22543d';
    }

    bzResEl.textContent = 'Bazett QTc = ' + Math.round(QTc_bazett) + ' ms (' + (QTc_bazett > normal_limit ? 'PROLONGED' : 'NORMAL') + ')';
    bzResEl.style.color = color;
    frResEl.textContent = 'Fridericia QTc = ' + Math.round(QTc_fridericia) + ' ms | ' + eval_text + ' (RR = ' + Math.round(RR_ms) + ' ms @ HR=' + HR_bpm + ' bpm)';
  }

  [qtEl, hrEl, sexEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw measured ECG QT interval in milliseconds (from QRS onset to end of T wave).',
      'Enter patient heart rate in beats per minute (bpm).',
      'Select patient biological sex.',
      'Inspect rate-corrected $QT_c$ calculated by Bazett and Fridericia formulas and evaluate Torsades de Pointes arrhythmia risk.'
    ],
    benefitTitle: 'Henry Bazett 1920 & Moritz Fridericia 1920 Cardiac Safety Standard',
    benefitContent: 'Normalizes ventricular repolarization time for varying heart rates: drug-induced $QT_c > 500\text{ ms}$ triggers mandatory clinical warnings for antibiotics, antiarrhythmics, and psychiatric medications.',
    faqs: [{ q: 'Why is Fridericia formula often preferred over Bazett at high heart rates?', a: 'Bazett formula overcorrects at tachycardic heart rates ($HR > 85\text{ bpm}$), generating false-positive long QT alarms; Fridericia provides superior accuracy across all heart rates.' }]
  },

  // 22. Goldmann Applanation Tonometry Intraocular Pressure Calculator
  {
    slug: 'intraocular-pressure-goldmann-applanation-tonometry-calculator',
    name: 'Goldmann Applanation Tonometry Intraocular Pressure (IOP CCT Adjustment) Calculator',
    description: 'Calculate ophthalmology clinical Intraocular Pressure IOP in mmHg (Imbert-Fick Law: P = F / A) with Central Corneal Thickness CCT pachymetry adjustment (Dresdner / Ehlers Correction) for glaucoma screening.',
    category: 'Science',
    icon: 'text',
    keywords: ['goldmann tonometry iop calculator', 'intraocular pressure cct corneal thickness adjustment online', 'glaucoma eye pressure imbert fick formula calculator', 'pachymetry corrected iop mmhg calculator', 'ophthalmology optometry biomedical vision science online'],
    order: 1456,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Measured IOP (mmHg) & Central Corneal Thickness CCT (μm, Normal 545 μm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="iop-raw">Measured IOP (mmHg)</label>
          <input class="tool-textarea" id="iop-raw" type="number" step="1" value="22.0" placeholder="22.0 mmHg (Tonometry)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="iop-cct">Corneal Thickness (μm)</label>
          <input class="tool-textarea" id="iop-cct" type="number" step="10" value="590.0" placeholder="590.0 μm (Thick Cornea)" />
        </div>
      </div>
      <div id="iop-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="iop-res-adj" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Adjusted IOP = 19.3 mmHg (NORMAL RANGE ≤ 21 mmHg)</span>
            <span class="stat-label">CCT-Corrected True Intraocular Pressure</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="iop-res-eval" style="color:var(--green-dark); font-weight:700;">THICK CORNEA ARTIFACT: Raw IOP overestimates true pressure by +2.7 mmHg ✓</span>
            <span class="stat-label">Goldmann Calibration Baseline = 545 μm (Imbert-Fick 3.06mm Tip)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rawEl = document.getElementById('iop-raw'), cctEl = document.getElementById('iop-cct');
  const adResEl = document.getElementById('iop-res-adj'), evResEl = document.getElementById('iop-res-eval');

  const baseline_CCT = 545.0; // standard Goldmann calibration thickness in um

  function update() {
    const raw_IOP = parseFloat(rawEl.value), CCT_um = parseFloat(cctEl.value);
    if (isNaN(raw_IOP) || isNaN(CCT_um) || raw_IOP <= 0 || CCT_um <= 0) return;

    // Dresdner linear pachymetry correction:
    // delta_IOP approx - ( CCT - 545 ) / 16.5  (mmHg)
    const delta_IOP = - (CCT_um - baseline_CCT) / 16.5;
    const adjusted_IOP = raw_IOP + delta_IOP;

    let eval_text = '', color = '#22543d';
    if (adjusted_IOP > 21.0) {
      eval_text = 'OCULAR HYPERTENSION / GLAUCOMA RISK (Adjusted IOP > 21 mmHg: Optic Nerve Evaluation Needed)';
      color = '#c53030';
    } else if (adjusted_IOP < 10.0) {
      eval_text = 'OCULAR HYPOTONY (Adjusted IOP < 10 mmHg)';
      color = '#ea580c';
    } else {
      eval_text = 'NORMAL INTRAOCULAR PRESSURE (10 to 21 mmHg Range ✓)';
      color = '#22543d';
    }

    adResEl.textContent = 'Adjusted IOP = ' + adjusted_IOP.toFixed(1) + ' mmHg (' + (adjusted_IOP <= 21 ? 'NORMAL' : 'ELEVATED') + ')';
    adResEl.style.color = color;
    evResEl.textContent = eval_text + ' [CCT = ' + CCT_um + ' μm: ' + (delta_IOP >= 0 ? '+' : '') + delta_IOP.toFixed(1) + ' mmHg Pachymetry Offset]';
  }

  rawEl.addEventListener('input', update);
  cctEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter raw Goldmann Applanation Tonometer intraocular pressure reading in mmHg.',
      'Enter ultrasound or optical pachymetry Central Corneal Thickness (CCT) in micrometers ($\mu\text{m}$).',
      'Inspect pachymetry-adjusted true intraocular pressure and glaucoma ocular hypertension risk.'
    ],
    benefitTitle: 'Hans Goldmann 1957 Imbert-Fick Tonometry Standard',
    benefitContent: 'Eliminates diagnostic artifacts: thick corneas ($> 580\ \mu\text{m}$) artificially inflate tonometer readings (preventing unnecessary glaucoma medication), while thin corneas ($< 520\ \mu\text{m}$) mask dangerous glaucoma.',
    faqs: [{ q: 'Why does Goldmann applanation use a 3.06 mm diameter tip?', a: 'At exactly $3.06\text{ mm}$ applanation diameter, the corneal surface tension tear meniscus capillary force exactly cancels the corneal bending stiffness resistance.' }]
  },

  // 23. Pulmonary Function Spirometry FEV1 / FVC Ratio Calculator
  {
    slug: 'spirometry-forced-vital-capacity-fev1-fev1-fvc-ratio-calculator',
    name: 'Pulmonary Function Spirometry FEV1 / FVC Ratio & Lung Obstruction Calculator',
    description: 'Calculate respiratory diagnostic Spirometry Forced Expiratory Volume FEV₁ / FVC ratio percentage (Tiffeneau-Pinelli Index: FEV₁ / FVC · 100%), percent predicted values, and classify Obstructive (COPD/Asthma) vs Restrictive lung disease.',
    category: 'Science',
    icon: 'text',
    keywords: ['spirometry fev1 fvc ratio calculator', 'forced vital capacity tiffeneau index online', 'copd asthma obstructive restrictive spirometry calculator', 'percent predicted fev1 gold criteria calculator', 'pulmonology respiratory medicine physiology online'],
    order: 1457,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Measured FEV₁ (L), Measured FVC (L), Predicted FEV₁ (L) & Predicted FVC (L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-fev1">Measured FEV₁ (L)</label>
          <input class="tool-textarea" id="sp-fev1" type="number" step="0.1" value="2.10" placeholder="2.10 L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-fvc">Measured FVC (L)</label>
          <input class="tool-textarea" id="sp-fvc" type="number" step="0.1" value="3.80" placeholder="3.80 L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-pfev1">Pred FEV₁ (L)</label>
          <input class="tool-textarea" id="sp-pfev1" type="number" step="0.1" value="3.50" placeholder="3.50 L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-pfvc">Pred FVC (L)</label>
          <input class="tool-textarea" id="sp-pfvc" type="number" step="0.1" value="4.20" placeholder="4.20 L" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">FEV₁ / FVC = 55.3% (OBSTRUCTIVE DEFECT: FEV₁/FVC < 70%)</span>
            <span class="stat-label">Spirometric Tiffeneau-Pinelli Ratio (FEV₁ / FVC · 100%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-gold" style="color:var(--green-dark); font-weight:700;">GOLD Stage 2 Moderate COPD (FEV₁ = 60.0% Predicted) | FVC = 90.5% Predicted</span>
            <span class="stat-label">Global Initiative for Chronic Obstructive Lung Disease (GOLD) Staging</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fev1El = document.getElementById('sp-fev1'), fvcEl = document.getElementById('sp-fvc');
  const pfev1El = document.getElementById('sp-pfev1'), pfvcEl = document.getElementById('sp-pfvc');
  const rtResEl = document.getElementById('sp-res-ratio'), gdResEl = document.getElementById('sp-res-gold');

  function update() {
    const FEV1 = parseFloat(fev1El.value), FVC = parseFloat(fvcEl.value);
    const pred_FEV1 = parseFloat(pfev1El.value), pred_FVC = parseFloat(pfvcEl.value);

    if (isNaN(FEV1) || isNaN(FVC) || isNaN(pred_FEV1) || isNaN(pred_FVC) || FEV1 <= 0 || FVC <= 0 || pred_FEV1 <= 0 || pred_FVC <= 0) return;

    // FEV1 / FVC ratio percentage:
    const ratio_pct = (FEV1 / FVC) * 100.0;

    // Percent predicted values:
    const pct_pred_FEV1 = (FEV1 / pred_FEV1) * 100.0;
    const pct_pred_FVC = (FVC / pred_FVC) * 100.0;

    let diagnosis = '', gold_stage = '', color = '#22543d';

    if (ratio_pct < 70.0) {
      color = '#c53030';
      diagnosis = 'OBSTRUCTIVE VENTILATORY DEFECT (FEV₁/FVC < 70%)';
      if (pct_pred_FEV1 >= 80.0) gold_stage = 'GOLD 1: Mild Obstruction';
      else if (pct_pred_FEV1 >= 50.0) gold_stage = 'GOLD 2: Moderate Obstruction';
      else if (pct_pred_FEV1 >= 30.0) gold_stage = 'GOLD 3: Severe Obstruction';
      else gold_stage = 'GOLD 4: Very Severe Obstruction';
    } else {
      if (pct_pred_FVC < 80.0) {
        color = '#ea580c';
        diagnosis = 'SUGGESTIVE OF RESTRICTIVE PATTERN (Normal ratio, reduced FVC < 80% - Confirm with Plethysmography TLC)';
        gold_stage = 'Restrictive Pattern Suspicion';
      } else {
        color = '#22543d';
        diagnosis = 'NORMAL PULMONARY SPIROMETRY';
        gold_stage = 'Normal Lung Function';
      }
    }

    rtResEl.textContent = 'FEV₁ / FVC = ' + ratio_pct.toFixed(1) + '% (' + diagnosis + ')';
    rtResEl.style.color = color;
    gdResEl.textContent = gold_stage + ' | FEV₁ = ' + pct_pred_FEV1.toFixed(1) + '% Predicted | FVC = ' + pct_pred_FVC.toFixed(1) + '% Predicted';
  }

  [fev1El, fvcEl, pfev1El, pfvcEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter patient measured Forced Expiratory Volume in 1 second ($\text{FEV}_1$) in Liters.',
      'Enter patient measured Forced Vital Capacity (FVC) in Liters.',
      'Enter normative reference predicted $\text{FEV}_1$ in Liters (based on age, sex, height, race).',
      'Enter normative reference predicted FVC in Liters.',
      'Inspect $\text{FEV}_1/\text{FVC}$ ratio, GOLD severity stage (1 to 4), and Obstructive vs Restrictive differential.'
    ],
    benefitTitle: 'Robert Tiffeneau & P. Pinelli 1947 Spirometry Standard',
    benefitContent: 'The primary diagnostic standard for chronic obstructive pulmonary disease (COPD), asthma, pulmonary fibrosis, and pre-operative surgical pulmonary clearance.',
    faqs: [{ q: 'What is the difference between Obstructive and Restrictive lung disease?', a: 'Obstructive disease (COPD, asthma) limits expiratory air flow ($\text{FEV}_1/\text{FVC} < 70\%$), while Restrictive disease (fibrosis, scoliosis) reduces overall lung volume ($\text{TLC} < 80\%$, normal ratio).' }]
  },

  // 24. DEXA Bone Mineral Density T-Score & Z-Score Calculator
  {
    slug: 'bone-mineral-density-dexa-t-score-z-score-osteoporosis-calculator',
    name: 'DEXA Bone Mineral Density T-Score & Z-Score Osteoporosis Stage Calculator',
    description: 'Calculate Dual-Energy X-ray Absorptiometry (DEXA) Bone Mineral Density (BMD) T-score (T = (BMD - BMD_young) / SD_young) and Z-score (Z = (BMD - BMD_age) / SD_age) to classify Normal, Osteopenia, and Osteoporosis (WHO Criteria).',
    category: 'Science',
    icon: 'text',
    keywords: ['dexa bone mineral density calculator', 't score z score osteoporosis formula online', 'who osteopenia osteoporosis bmd calculator', 'dual energy xray absorptiometry t score calculator', 'endocrinology rheumatology geriatrics medical physics online'],
    order: 1458,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Patient BMD (g/cm²), Young Adult Reference Mean BMD (g/cm²) & Reference SD (g/cm²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dx-bmd">Patient BMD (g/cm²)</label>
          <input class="tool-textarea" id="dx-bmd" type="number" step="0.05" value="0.720" placeholder="0.720 g/cm² (Femoral Neck)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dx-ref">Young Ref BMD</label>
          <input class="tool-textarea" id="dx-ref" type="number" step="0.05" value="1.000" placeholder="1.000 g/cm²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dx-sd">Reference SD</label>
          <input class="tool-textarea" id="dx-sd" type="number" step="0.01" value="0.110" placeholder="0.110 g/cm²" />
        </div>
      </div>
      <div id="dx-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dx-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T-Score = -2.55 (OSTEOPOROSIS: T ≤ -2.5 SD)</span>
            <span class="stat-label">WHO Bone Mineral Density T-Score (T = (BMD - Mean) / SD)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dx-res-diag" style="color:var(--green-dark); font-weight:700;">HIGH FRACTURE RISK: Pharmacotherapy Indicated (Bisphosphonates / Denosumab)</span>
            <span class="stat-label">WHO Diagnostic Criteria: Normal (≥ -1.0), Osteopenia (-1.0 to -2.5), Osteoporosis (≤ -2.5)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bmdEl = document.getElementById('dx-bmd'), refEl = document.getElementById('dx-ref'), sdEl = document.getElementById('dx-sd');
  const tResEl = document.getElementById('dx-res-t'), dgResEl = document.getElementById('dx-res-diag');

  function update() {
    const BMD = parseFloat(bmdEl.value), ref_BMD = parseFloat(refEl.value), SD = parseFloat(sdEl.value);
    if (isNaN(BMD) || isNaN(ref_BMD) || isNaN(SD) || BMD <= 0 || ref_BMD <= 0 || SD <= 0) return;

    // T-score calculation: T = (BMD - ref_BMD) / SD
    const T_score = (BMD - ref_BMD) / SD;

    let who_class = '', color = '#22543d';
    if (T_score <= -2.5) {
      who_class = 'OSTEOPOROSIS (T ≤ -2.5: High Fracture Risk, Treatment Indicated)';
      color = '#c53030';
    } else if (T_score < -1.0) {
      who_class = 'OSTEOPENIA (Low Bone Mass: -2.5 < T < -1.0)';
      color = '#ea580c';
    } else {
      who_class = 'NORMAL BONE MINERAL DENSITY (T ≥ -1.0 ✓)';
      color = '#22543d';
    }

    tResEl.textContent = 'T-Score = ' + (T_score >= 0 ? '+' : '') + T_score.toFixed(2) + ' (' + (T_score <= -2.5 ? 'OSTEOPOROSIS' : T_score < -1.0 ? 'OSTEOPENIA' : 'NORMAL') + ')';
    tResEl.style.color = color;
    dgResEl.textContent = who_class + ' [BMD = ' + BMD.toFixed(3) + ' g/cm² vs Young Mean = ' + ref_BMD.toFixed(3) + ' g/cm²]';
  }

  [bmdEl, refEl, sdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter patient measured areal Bone Mineral Density (BMD) in $\text{g/cm}^2$ (from lumbar spine L1-L4 or femoral neck DEXA scan).',
      'Enter peak young adult sex-matched reference mean BMD (typically $\sim 1.000\text{ g/cm}^2$).',
      'Enter population reference standard deviation SD (typically $\sim 0.110\text{ g/cm}^2$).',
      'Inspect calculated T-score and WHO diagnostic classification (Normal, Osteopenia, Osteoporosis).'
    ],
    benefitTitle: 'World Health Organization (WHO) 1994 DEXA Osteoporosis Standard',
    benefitContent: 'Provides the universal epidemiological criterion for diagnosing osteoporosis and guiding anti-resorptive (bisphosphonate, denosumab) or anabolic (teriparatide) therapies.',
    faqs: [{ q: 'What is the difference between a T-score and a Z-score?', a: 'A T-score compares BMD to a healthy 30-year-old young adult peak bone mass; a Z-score compares BMD to an age- and sex-matched peer group.' }]
  },

  // 25. Pharmacokinetics One-Compartment IV Elimination Calculator
  {
    slug: 'pharmacokinetics-one-compartment-elimination-half-life-auc-calculator',
    name: 'Pharmacokinetics One-Compartment IV Elimination Rate & Half-Life (t_1/2) Calculator',
    description: 'Calculate clinical pharmacokinetics one-compartment IV bolus drug concentration decay C(t) = C_0 · e^(-k_e · t), elimination half-life t_1/2 = 0.693 / k_e, Volume of Distribution V_d = Dose / C_0, Total Body Clearance CL = k_e · V_d, and AUC.',
    category: 'Science',
    icon: 'text',
    keywords: ['pharmacokinetics calculator', 'one compartment elimination half life formula online', 'volume of distribution clearance auc calculator', 'drug plasma concentration decay pk calculator', 'clinical pharmacology pharmacy biomedical medicine online'],
    order: 1459,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'IV Bolus Dose (mg), Elimination Constant k_e (hr⁻¹) or Half-life, & Initial Peak C₀ (mg/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pk-dose">IV Dose (mg)</label>
          <input class="tool-textarea" id="pk-dose" type="number" step="50" value="500.0" placeholder="500.0 mg IV" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pk-c0">Initial C₀ (mg/L)</label>
          <input class="tool-textarea" id="pk-c0" type="number" step="5" value="25.0" placeholder="25.0 mg/L Peak" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pk-ke">Rate k_e (hr⁻¹)</label>
          <input class="tool-textarea" id="pk-ke" type="number" step="0.02" value="0.1155" placeholder="0.1155 hr⁻¹ (t_1/2 = 6 hr)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pk-t">Time t (Hours)</label>
          <input class="tool-textarea" id="pk-t" type="number" step="2" value="12.0" placeholder="12.0 Hours (2 Half-Lives)" />
        </div>
      </div>
      <div id="pk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pk-res-ct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Concentration C(t) = 6.25 mg / L (25.0% C₀)</span>
            <span class="stat-label">First-Order Elimination Decay (C(t) = C₀ · e^(-k_e · t))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pk-res-pk" style="color:var(--green-dark); font-weight:700;">Half-Life t_1/2 = 6.00 Hours | Clearance CL = 2.31 L/hr | Volume V_d = 20.0 L</span>
            <span class="stat-label">Area Under the Curve (AUC = C₀ / k_e = 216.5 mg·hr/L)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const doseEl = document.getElementById('pk-dose'), c0El = document.getElementById('pk-c0');
  const keEl = document.getElementById('pk-ke'), tEl = document.getElementById('pk-t');
  const ctResEl = document.getElementById('pk-res-ct'), pkResEl = document.getElementById('pk-res-pk');

  function update() {
    const Dose_mg = parseFloat(doseEl.value), C0_mg_L = parseFloat(c0El.value);
    const ke_hr = parseFloat(keEl.value), t_hr = parseFloat(tEl.value);

    if (isNaN(Dose_mg) || isNaN(C0_mg_L) || isNaN(ke_hr) || isNaN(t_hr) || Dose_mg <= 0 || C0_mg_L <= 0 || ke_hr <= 0 || t_hr < 0) return;

    // Elimination half-life: t_1/2 = ln(2) / ke
    const t_half_hr = Math.LN2 / ke_hr;

    // Plasma drug concentration at time t: C(t) = C0 * exp( - ke * t )
    const C_t = C0_mg_L * Math.exp(- ke_hr * t_hr);
    const pct_C0 = (C_t / C0_mg_L) * 100.0;

    // Volume of distribution: V_d = Dose / C0  [Liters]
    const V_d_L = Dose_mg / C0_mg_L;

    // Total body clearance: CL = ke * V_d  [L / hr]
    const CL_L_hr = ke_hr * V_d_L;

    // Area under the curve: AUC = C0 / ke  [mg * hr / L]
    const AUC = C0_mg_L / ke_hr;

    ctResEl.textContent = 'Concentration C(' + t_hr + 'h) = ' + C_t.toFixed(2) + ' mg / L (' + pct_C0.toFixed(1) + '% Peak)';
    pkResEl.textContent = 'Half-Life t_1/2 = ' + t_half_hr.toFixed(2) + ' hr | Clearance CL = ' + CL_L_hr.toFixed(2) + ' L/hr | V_d = ' + V_d_L.toFixed(1) + ' L (AUC = ' + AUC.toFixed(1) + ' mg·hr/L)';
  }

  [doseEl, c0El, keEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter intravenous bolus medication dose in mg.',
      'Enter initial extrapolated zero-time peak plasma drug concentration $C_0$ in mg/L.',
      'Enter first-order elimination rate constant $k_e$ in $\text{hr}^{-1}$ ($k_e = \ln(2) / t_{1/2}$).',
      'Enter elapsed post-dose time t in hours.',
      'Inspect remaining drug plasma concentration $C(t)$, elimination half-life $t_{1/2}$, Volume of Distribution ($V_d$), and Total Body Clearance (CL).'
    ],
    benefitTitle: 'Malcolm Rowland & Thomas N. Tozer Pharmacokinetic Standard',
    benefitContent: 'The core quantitative framework for therapeutic drug monitoring (vancomycin, aminoglycosides, theophylline), determining multi-dose steady-state accumulation and dosing intervals ($\tau$).',
    faqs: [{ q: 'How many half-lives does it take to eliminate 97% of a drug?', a: 'After 5 half-lives ($5 \times t_{1/2}$), $1 - (1/2)^5 = 96.875\%$ of the drug has been eliminated from the body.' }]
  }
];

pack52Tools.forEach(createTool);
console.log('Pack 52 complete: ' + pack52Tools.length + ' tools created.');
