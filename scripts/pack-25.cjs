const { createTool } = require('./generate-curated-tools.cjs');

// Pack 25: 26 Tools covering Computational Neuroscience, Petrochemical Distillation, Retaining Geotechnics, Cryogenics & Superconductivity, Six Sigma Process Control (Tools 880 to 905)
const pack25Tools = [
  // --- Suite KKKKK: Computational Neuroscience, Neuron Biophysics & Membrane Electrophysiology (880 - 884) ---
  // 1. Hodgkin-Huxley Membrane Potential & Ionic Currents Calculator
  {
    slug: 'hodgkin-huxley-action-potential-membrane-current-calculator',
    name: 'Hodgkin-Huxley Neuron Action Potential & Ionic Currents (I_m) Calculator',
    description: 'Calculate biophysical neuron action potential membrane current (I_m = C_m · dV/dt + ḡ_Na·m³h·(V - E_Na) + ḡ_K·n⁴·(V - E_K) + g_L·(V - E_L)) in μA/cm².',
    category: 'Science',
    icon: 'text',
    keywords: ['hodgkin huxley calculator', 'action potential membrane current formula ion channels online', 'sodium potassium conductance hodgkin huxley calculator', 'squid giant axon action potential model calculator', 'computational neuroscience neuron biophysics online'],
    order: 761,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Membrane Voltage V (mV), Na+ Gating (m, h), K+ Gating (n) & Capacitance C_m (1.0 μF/cm²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hh-v">Voltage V (mV)</label>
          <input class="tool-textarea" id="hh-v" type="number" step="any" value="20.0" placeholder="+20.0 mV (Depolarized Peak)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hh-m">Na+ Act (m)</label>
          <input class="tool-textarea" id="hh-m" type="number" step="0.05" min="0" max="1" value="0.80" placeholder="0.80 (m³ Gate)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hh-h">Na+ Inact (h)</label>
          <input class="tool-textarea" id="hh-h" type="number" step="0.05" min="0" max="1" value="0.40" placeholder="0.40 (h Ball)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hh-n">K+ Act (n)</label>
          <input class="tool-textarea" id="hh-n" type="number" step="0.05" min="0" max="1" value="0.70" placeholder="0.70 (n⁴ Gate)" />
        </div>
      </div>
      <div id="hh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hh-res-itot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">I_ion = +563.8 μA / cm²</span>
            <span class="stat-label">Total Ionic Membrane Current (I_Na + I_K + I_L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hh-res-split" style="font-weight:700;">I_Na = -844.8 μA/cm² (Inward) | I_K = +1,382.9 μA/cm² (Repolarizing Outward)</span>
            <span class="stat-label">Sodium vs Potassium Ionic Flux Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('hh-v'), mEl = document.getElementById('hh-m');
  const hEl = document.getElementById('hh-h'), nEl = document.getElementById('hh-n');
  const iTotResEl = document.getElementById('hh-res-itot'), spResEl = document.getElementById('hh-res-split');

  // Standard Hodgkin-Huxley 1952 Squid Giant Axon Parameters:
  const gbar_Na = 120.0; // mS / cm^2
  const gbar_K = 36.0;   // mS / cm^2
  const g_L = 0.30;      // mS / cm^2
  const E_Na = +50.0;    // mV
  const E_K = -77.0;     // mV
  const E_L = -54.4;     // mV

  function update() {
    const V = parseFloat(vEl.value), m = parseFloat(mEl.value);
    const h = parseFloat(hEl.value), n = parseFloat(nEl.value);

    if (isNaN(V) || isNaN(m) || isNaN(h) || isNaN(n) || m < 0 || m > 1 || h < 0 || h > 1 || n < 0 || n > 1) return;

    // Sodium Current I_Na = gbar_Na * m^3 * h * (V - E_Na)  [uA / cm^2]
    const g_Na = gbar_Na * Math.pow(m, 3) * h;
    const I_Na = g_Na * (V - E_Na);

    // Potassium Current I_K = gbar_K * n^4 * (V - E_K)  [uA / cm^2]
    const g_K = gbar_K * Math.pow(n, 4);
    const I_K = g_K * (V - E_K);

    // Leak Current I_L = g_L * (V - E_L)  [uA / cm^2]
    const I_L = g_L * (V - E_L);

    // Total ionic current I_ion = I_Na + I_K + I_L
    const I_ion = I_Na + I_K + I_L;

    iTotResEl.textContent = 'I_ion = ' + (I_ion >= 0 ? '+' : '') + I_ion.toFixed(1) + ' μA / cm²';
    spResEl.textContent = 'I_Na: ' + I_Na.toFixed(1) + ' μA/cm² (g_Na = ' + g_Na.toFixed(1) + ' mS) | I_K: +' + I_K.toFixed(1) + ' μA/cm² (g_K = ' + g_K.toFixed(1) + ' mS) | I_L: ' + I_L.toFixed(1) + ' μA/cm²';
  }

  [vEl, mEl, hEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter instantaneous transmembrane voltage V in millivolts (e.g. -70 mV resting, +30 mV action potential overshoot).',
      'Enter voltage-gated $Na^+$ activation probability m (0.0 to 1.0).',
      'Enter voltage-gated $Na^+$ inactivation ball probability h (0.0 to 1.0).',
      'Enter delayed-rectifier $K^+$ activation probability n (0.0 to 1.0).',
      'Inspect total ionic membrane current $I_{\text{ion}}$ in $\mu\text{A/cm}^2$ and individual inward $Na^+$ vs outward $K^+$ current components.'
    ],
    benefitTitle: 'Alan Hodgkin & Andrew Huxley 1952 Nobel Biophysical Model',
    benefitContent: 'Hodgkin-Huxley differential equations quantify how voltage-gated $Na^+$ channels rapidly activate ($m^3$) and inactivate ($h$) while delayed rectifier $K^+$ channels open slowly ($n^4$), creating the millisecond all-or-none action potential spike that drives all neural computation in the human brain.',
    faqs: [{ q: 'Why is m cubed (m³) but n to the fourth power (n⁴)?', a: 'Biophysical gating particle analysis proved that four independent protein subunits must open simultaneously for $K^+$ channels ($n^4$), while $Na^+$ channels require three activation gates plus one inactivation ball ($m^3 h$).' }]
  },

  // 2. Goldman-Hodgkin-Katz (GHK) Resting Membrane Potential Calculator
  {
    slug: 'goldman-hodgkin-katz-ghk-membrane-potential-calculator',
    name: 'Goldman-Hodgkin-Katz (GHK) Resting Membrane Potential (V_m) Calculator',
    description: 'Calculate multi-ion biological cell resting membrane potential (V_m = (RT/F) · ln((P_K[K⁺]_o + P_Na[Na⁺]_o + P_Cl[Cl⁻]_i) / (P_K[K⁺]_i + P_Na[Na⁺]_i + P_Cl[Cl⁻]_o))) in mV.',
    category: 'Science',
    icon: 'text',
    keywords: ['ghk equation calculator', 'goldman hodgkin katz resting membrane potential formula online', 'nernst vs ghk equation calculator', 'neuron resting potential ion permeability calculator', 'cellular electrophysiology membrane voltage online'],
    order: 762,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Extracellular & Intracellular Concentrations (mM) and Relative Permeabilities (P_K=1, P_Na=0.04, P_Cl=0.45)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ghk-ko">[K⁺]_out (mM)</label>
          <input class="tool-textarea" id="ghk-ko" type="number" step="any" value="4.5" placeholder="4.5 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ghk-ki">[K⁺]_in (mM)</label>
          <input class="tool-textarea" id="ghk-ki" type="number" step="any" value="140.0" placeholder="140.0 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ghk-nao">[Na⁺]_out (mM)</label>
          <input class="tool-textarea" id="ghk-nao" type="number" step="any" value="145.0" placeholder="145.0 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ghk-nai">[Na⁺]_in (mM)</label>
          <input class="tool-textarea" id="ghk-nai" type="number" step="any" value="12.0" placeholder="12.0 mM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ghk-pna">P_Na / P_K Ratio</label>
          <input class="tool-textarea" id="ghk-pna" type="number" step="0.01" value="0.04" placeholder="0.04 (Resting)" />
        </div>
      </div>
      <div id="ghk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ghk-res-vm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">V_m = -70.4 mV Resting</span>
            <span class="stat-label">Steady-State Resting Membrane Potential (V_m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ghk-res-nernst" style="font-weight:700;">E_K = -92.1 mV | E_Na = +66.7 mV | E_Cl = -76.8 mV (37°C Body Temp)</span>
            <span class="stat-label">Individual Nernst Equilibrium Potentials</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const koEl = document.getElementById('ghk-ko'), kiEl = document.getElementById('ghk-ki');
  const naoEl = document.getElementById('ghk-nao'), naiEl = document.getElementById('ghk-nai'), pnaEl = document.getElementById('ghk-pna');
  const vmResEl = document.getElementById('ghk-res-vm'), nrResEl = document.getElementById('ghk-res-nernst');

  const R = 8.314462;
  const F = 96485.33;
  const T = 310.15; // 37°C in Kelvin
  const RT_F_mV = (R * T / F) * 1000; // ~26.7 mV (ln multiplier: 61.5 for log10)

  // Standard chloride concentrations:
  const clo = 110.0;
  const cli = 10.0;
  const P_Cl = 0.40;

  function update() {
    const Ko = parseFloat(koEl.value), Ki = parseFloat(kiEl.value);
    const Nao = parseFloat(naoEl.value), Nai = parseFloat(naiEl.value);
    const P_Na = parseFloat(pnaEl.value);

    if (isNaN(Ko) || isNaN(Ki) || isNaN(Nao) || isNaN(Nai) || isNaN(P_Na) || Ko <= 0 || Ki <= 0 || Nao <= 0 || Nai <= 0 || P_Na < 0) return;

    const P_K = 1.00;

    // GHK Voltage equation: Vm = (RT/F) * ln( (P_K*Ko + P_Na*Nao + P_Cl*Cli) / (P_K*Ki + P_Na*Nai + P_Cl*Clo) )  [mV]
    const num = (P_K * Ko) + (P_Na * Nao) + (P_Cl * cli);
    const den = (P_K * Ki) + (P_Na * Nai) + (P_Cl * clo);
    const Vm = RT_F_mV * Math.log(num / den);

    // Individual Nernst potentials:
    const E_K = RT_F_mV * Math.log(Ko / Ki);
    const E_Na = RT_F_mV * Math.log(Nao / Nai);
    const E_Cl = -RT_F_mV * Math.log(clo / cli); // negative valence

    vmResEl.textContent = 'V_m = ' + Vm.toFixed(1) + ' mV Resting Potential';
    nrResEl.textContent = 'Nernst: E_K = ' + E_K.toFixed(1) + ' mV | E_Na = +' + E_Na.toFixed(1) + ' mV | E_Cl = ' + E_Cl.toFixed(1) + ' mV (RT/F = ' + RT_F_mV.toFixed(1) + ' mV @ 37°C)';
  }

  [koEl, kiEl, naoEl, naiEl, pnaEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter extracellular $[K^+]_o$ and intracellular $[K^+]_i$ concentrations in mM (typically 4.5 mM out, 140 mM in).',
      'Enter extracellular $[Na^+]_o$ and intracellular $[Na^+]_i$ concentrations in mM (typically 145 mM out, 12 mM in).',
      'Enter relative sodium-to-potassium membrane permeability ratio $P_{Na}/P_K$ (0.04 at rest, 20.0 at peak action potential).',
      'Inspect steady-state resting membrane potential $V_m$ in millivolts and compare against individual Nernst equilibrium potentials.'
    ],
    benefitTitle: 'David Goldman 1943 & Hodgkin-Katz 1949 Multi-Ion Electrophysiology',
    benefitContent: 'Because cell membranes at rest are 25× more permeable to potassium than sodium ($P_K \gg P_{Na}$), the resting potential sits near the potassium Nernst potential ($E_K \sim -90\text{ mV}$); hyperkalemia (high blood potassium) depolarizes $V_m$, triggering fatal cardiac arrhythmias.',
    faqs: [{ q: 'Why are chloride concentrations flipped in the GHK equation?', a: 'Because chloride is a negatively charged anion ($z = -1$), its intracellular concentration appears in the numerator and extracellular concentration in the denominator.' }]
  },

  // 3. Dendritic Cable Theory Space Constant (λ) & Time Constant (τ) Calculator
  {
    slug: 'cable-theory-length-time-constant-calculator',
    name: 'Dendritic Cable Theory Space Constant (λ) & Membrane Time Constant (τ_m) Calculator',
    description: 'Calculate neuron dendritic passive electrotonic signal decay length space constant (λ = √(r_m / r_i) = √(d·R_m / (4·R_i))) in μm/mm and membrane time constant (τ_m = R_m · C_m) in ms.',
    category: 'Science',
    icon: 'text',
    keywords: ['cable theory calculator', 'neuron length constant lambda space constant formula online', 'membrane time constant tau m calculator online', 'dendritic electrotonic signal attenuation calculator', 'synaptic potential cable theory online'],
    order: 763,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dendrite Diameter d (μm), Specific Membrane R_m (Ω·cm²), Axial R_i (Ω·cm) & Distance x (μm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cbl-d">Dendrite Dia d (μm)</label>
          <input class="tool-textarea" id="cbl-d" type="number" step="any" value="2.0" placeholder="2.0 μm (Apical Dendrite)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cbl-rm">Membrane R_m</label>
          <input class="tool-textarea" id="cbl-rm" type="number" step="any" value="20000" placeholder="20000 Ω·cm²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cbl-ri">Axial R_i (Ω·cm)</label>
          <input class="tool-textarea" id="cbl-ri" type="number" step="any" value="150.0" placeholder="150.0 Ω·cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cbl-x">Distance x (μm)</label>
          <input class="tool-textarea" id="cbl-x" type="number" step="any" value="500.0" placeholder="500.0 μm to Soma" />
        </div>
      </div>
      <div id="cbl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cbl-res-lam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ = 816.5 μm (0.816 mm)</span>
            <span class="stat-label">Electrotonic Length / Space Constant (λ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cbl-res-atten" style="font-weight:700;">V(500 μm) = 54.2% of Peak EPSP (Time Constant τ_m = 20.0 ms @ C_m = 1.0 μF/cm²)</span>
            <span class="stat-label">Synaptic Voltage Attenuation & Membrane Time Constant</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('cbl-d'), rmEl = document.getElementById('cbl-rm');
  const riEl = document.getElementById('cbl-ri'), xEl = document.getElementById('cbl-x');
  const lResEl = document.getElementById('cbl-res-lam'), atResEl = document.getElementById('cbl-res-atten');

  const C_m = 1.0e-6; // F / cm^2 (standard lipid bilayer capacitance)

  function update() {
    const dUm = parseFloat(dEl.value), Rm = parseFloat(rmEl.value);
    const Ri = parseFloat(riEl.value), xUm = parseFloat(xEl.value);

    if (isNaN(dUm) || isNaN(Rm) || isNaN(Ri) || isNaN(xUm) || dUm <= 0 || Rm <= 0 || Ri <= 0 || xUm < 0) return;

    const dCm = dUm * 1e-4; // um to cm

    // Space constant lambda = sqrt( (d * Rm) / (4 * Ri) )  [cm]
    const lambdaCm = Math.sqrt((dCm * Rm) / (4.0 * Ri));
    const lambdaUm = lambdaCm * 10000;
    const lambdaMm = lambdaCm * 10;

    // Membrane time constant tau_m = Rm * Cm  [seconds]
    const tau_m_sec = Rm * C_m;
    const tau_m_ms = tau_m_sec * 1000;

    // Passive steady-state exponential voltage attenuation: V(x) = V0 * exp(-x / lambda)
    const attenRatio = Math.exp(-xUm / lambdaUm);
    const attenPct = attenRatio * 100;

    lResEl.textContent = 'λ = ' + lambdaUm.toFixed(1) + ' μm (' + lambdaMm.toFixed(3) + ' mm Space Constant)';
    atResEl.textContent = 'V(' + xUm + ' μm) = ' + attenPct.toFixed(1) + '% of Initial EPSP | τ_m = ' + tau_m_ms.toFixed(1) + ' ms (Membrane Charging Time)';
  }

  [dEl, rmEl, riEl, xEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cylindrical dendritic branch diameter d in micrometers ($\mu\text{m}$).',
      'Enter specific membrane resistivity $R_m$ in $\Omega\cdot\text{cm}^2$ (typically 10,000 to 50,000 $\Omega\cdot\text{cm}^2$).',
      'Enter intracellular cytoplasm axial resistivity $R_i$ in $\Omega\cdot\text{cm}$ (typically 100 to 250 $\Omega\cdot\text{cm}$).',
      'Enter electrotonic conduction distance x from dendritic spine synapse to cell body soma in $\mu\text{m}$.',
      'Inspect electrotonic space constant $\lambda$, membrane time constant $\tau_m$, and passive synaptic potential voltage attenuation percentage.'
    ],
    benefitTitle: 'Wilfrid Rall 1959 Dendritic Cable Theory',
    benefitContent: 'Synaptic potentials (EPSPs) decay exponentially as they propagate along passive dendrites ($V(x) = V_0 e^{-x/\lambda}$); thick dendrites with high membrane resistance have large space constants ($\lambda > 1\text{ mm}$), transmitting electrical signals efficiently to the axon hillock to trigger action potentials.',
    faqs: [{ q: 'What is the physical definition of the space constant (λ)?', a: '$\lambda$ is the distance at which an electrotonic potential decays to $1/e \approx 36.8\%$ of its initial peak amplitude.' }]
  },

  // 4. Quantal Synaptic Neurotransmitter Release Binomial Statistics Calculator
  {
    slug: 'synaptic-quantal-release-binomial-statistics-calculator',
    name: 'Quantal Synaptic Neurotransmitter Release (Binomial Model m = n·p) Calculator',
    description: 'Calculate synaptic neurotransmitter release quantal content (m = n · p), vesicle release failure rate (P₀ = (1 - p)ⁿ), and Katz quantal amplitude variance.',
    category: 'Science',
    icon: 'text',
    keywords: ['quantal synaptic release calculator', 'binomial synaptic neurotransmitter release formula m equals n times p', 'katz quantal hypothesis synaptic failure rate calculator', 'readily releasable pool n release probability p calculator', 'neuroscience synaptic transmission online'],
    order: 764,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Readily Releasable Pool Size n (Vesicles), Release Probability p (0 to 1.0) & Quantal Size q (mV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qnt-n">Pool Size n</label>
          <input class="tool-textarea" id="qnt-n" type="number" step="1" value="10" placeholder="10 (Active Zone Vesicles)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qnt-p">Probability p</label>
          <input class="tool-textarea" id="qnt-p" type="number" step="0.05" min="0.01" max="0.99" value="0.30" placeholder="0.30 (Ca²⁺-Dependent)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qnt-q">Mini Size q (mV)</label>
          <input class="tool-textarea" id="qnt-q" type="number" step="any" value="0.50" placeholder="0.50 mV (Miniature EPSP)" />
        </div>
      </div>
      <div id="qnt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qnt-res-m" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">m = 3.00 Vesicles (1.50 mV)</span>
            <span class="stat-label">Mean Quantal Content (m = n · p) & Mean EPSP Amplitude</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qnt-res-fail" style="color:var(--green-dark); font-weight:700;">Failure Rate P(0) = 2.82% (Variance σ² = 2.10 vesicles² | CV = 0.483)</span>
            <span class="stat-label">Synaptic Transmission Failure Probability (P₀ = (1-p)ⁿ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('qnt-n'), pEl = document.getElementById('qnt-p'), qEl = document.getElementById('qnt-q');
  const mResEl = document.getElementById('qnt-res-m'), fResEl = document.getElementById('qnt-res-fail');

  function update() {
    const n = parseInt(nEl.value, 10), p = parseFloat(pEl.value), qMv = parseFloat(qEl.value);
    if (isNaN(n) || isNaN(p) || isNaN(qMv) || n <= 0 || p <= 0 || p >= 1.0 || qMv <= 0) return;

    // Mean quantal content m = n * p
    const m = n * p;
    // Mean evoked EPSP amplitude E = m * q
    const meanEpspMv = m * qMv;

    // Failure probability P(0) = (1 - p)^n
    const pZero = Math.pow(1.0 - p, n);
    const pZeroPct = pZero * 100;

    // Binomial variance sigma^2 = n * p * (1 - p)
    const variance = n * p * (1.0 - p);
    const stdDev = Math.sqrt(variance);
    const CV = stdDev / m; // coefficient of variation

    mResEl.textContent = 'm = ' + m.toFixed(2) + ' Vesicles (' + meanEpspMv.toFixed(2) + ' mV EPSP)';
    fResEl.textContent = 'Failure Rate P₀ = ' + pZeroPct.toFixed(2) + '% | Variance σ² = ' + variance.toFixed(2) + ' (CV = ' + CV.toFixed(3) + ', n = ' + n + ', p = ' + p.toFixed(2) + ')';
  }

  [nEl, pEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter number of docked neurotransmitter vesicles in the readily releasable pool (RRP) n.',
      'Enter single-vesicle exocytosis release probability p upon action potential arrival.',
      'Enter quantal miniature EPSP (mEPSP) response amplitude q in mV (response to a single vesicle).',
      'Inspect mean quantal content m, total evoked synaptic post-synaptic potential amplitude, and transmission failure rate $P_0$.'
    ],
    benefitTitle: 'Bernard Katz 1954 Quantal Release Hypothesis',
    benefitContent: 'Synaptic transmission is stochastic and quantized; calculating quantal content ($m = n \cdot p$) allows neuroscientists to determine whether synaptic plasticity (LTP/LTD) is driven by presynaptic increases in release probability ($p$) or postsynaptic receptor insertion ($q$).',
    faqs: [{ q: 'What is a "miniature" mEPSP?', a: 'A "mini" is the miniature postsynaptic electrical voltage depolarization generated by the spontaneous fusion of a single synaptic vesicle containing ~5,000 neurotransmitter molecules (glutamate/acetylcholine).' }]
  },

  // 5. Leaky Integrate-and-Fire (LIF) Neuron Firing Rate & F-I Curve Calculator
  {
    slug: 'integrate-and-fire-neuron-firing-rate-f-i-curve-calculator',
    name: 'Leaky Integrate-and-Fire (LIF) Neuron Firing Rate (F-I Curve) Calculator',
    description: 'Calculate Leaky Integrate-and-Fire (LIF) computational neuron spiking frequency (f = 1 / (t_ref - τ_m · ln(1 - V_th / (I_inj · R)))) in Hz and rheobase threshold current.',
    category: 'Science',
    icon: 'text',
    keywords: ['leaky integrate and fire calculator', 'lif neuron firing frequency formula f i curve online', 'rheobase threshold current lif neuron calculator', 'computational neuroscience spiking neuron model calculator', 'neuromorphic engineering lif firing rate online'],
    order: 765,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Injected Current I_inj (pA), Membrane Resistance R (MΩ), Threshold V_th (mV) & Refractory t_ref (ms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lif-i">Injected I_inj (pA)</label>
          <input class="tool-textarea" id="lif-i" type="number" step="10" value="250.0" placeholder="250.0 pA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lif-r">Resistance R (MΩ)</label>
          <input class="tool-textarea" id="lif-r" type="number" step="10" value="100.0" placeholder="100.0 MΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lif-vth">Threshold V_th (mV)</label>
          <input class="tool-textarea" id="lif-vth" type="number" step="1" value="20.0" placeholder="20.0 mV (Above Reset)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lif-tref">Refractory t_ref (ms)</label>
          <input class="tool-textarea" id="lif-tref" type="number" step="0.5" value="2.0" placeholder="2.0 ms" />
        </div>
      </div>
      <div id="lif-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lif-res-freq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f = 29.2 Hz Spiking</span>
            <span class="stat-label">Neuron Spiking Firing Rate (Output Frequency)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lif-res-rheo" style="color:var(--green-dark); font-weight:700;">Rheobase Current I_th = 200.0 pA (Inter-Spike Interval ISI = 34.2 ms)</span>
            <span class="stat-label">Threshold Rheobase Current & Inter-Spike Interval</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('lif-i'), rEl = document.getElementById('lif-r');
  const vthEl = document.getElementById('lif-vth'), trEl = document.getElementById('lif-tref');
  const fResEl = document.getElementById('lif-res-freq'), rhResEl = document.getElementById('lif-res-rheo');

  const tau_m_ms = 20.0; // 20 ms membrane time constant

  function update() {
    const I_pA = parseFloat(iEl.value), R_Mohm = parseFloat(rEl.value);
    const Vth_mV = parseFloat(vthEl.value), tref_ms = parseFloat(trEl.value);

    if (isNaN(I_pA) || isNaN(R_Mohm) || isNaN(Vth_mV) || isNaN(tref_ms) || R_Mohm <= 0 || Vth_mV <= 0 || tref_ms < 0) return;

    // Asymptotic steady-state voltage V_inf = I * R
    // I in pA (1e-12 A), R in MOhm (1e6 Ohm) => I * R in mV (1e-6 V = 1e-3 mV) => I_pA * R_Mohm / 1000  [mV]
    const V_inf_mV = (I_pA * R_Mohm) / 1000.0;

    // Rheobase threshold current I_rheo = (Vth / R) * 1000  [pA]
    const I_rheo_pA = (Vth_mV / R_Mohm) * 1000.0;

    if (V_inf_mV <= Vth_mV) {
      fResEl.textContent = '0.0 Hz (Sub-Threshold Quiescent)';
      rhResEl.textContent = 'Sub-threshold: I_inj (' + I_pA + ' pA) < Rheobase (' + I_rheo_pA.toFixed(1) + ' pA). No action potentials generated.';
      fResEl.style.color = '#2563eb';
      return;
    }
    fResEl.style.color = '#22543d';

    // Inter-spike interval ISI = t_ref + tau_m * ln( V_inf / (V_inf - Vth) )  [ms]
    const t_charge_ms = tau_m_ms * Math.log(V_inf_mV / (V_inf_mV - Vth_mV));
    const ISI_ms = tref_ms + t_charge_ms;

    // Firing frequency f = 1000 / ISI  [Hz]
    const f_hz = 1000.0 / ISI_ms;

    fResEl.textContent = 'f = ' + f_hz.toFixed(1) + ' Hz Spiking Rate';
    rhResEl.textContent = 'Rheobase I_th = ' + I_rheo_pA.toFixed(1) + ' pA | ISI = ' + ISI_ms.toFixed(1) + ' ms (Charge: ' + t_charge_ms.toFixed(1) + ' ms + Refractory: ' + tref_ms + ' ms)';
  }

  [iEl, rEl, vthEl, trEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter injected continuous somatic depolarizing current $I_{\text{inj}}$ in picoamperes (pA).',
      'Enter neuron input membrane resistance R in megaohms ($M\Omega$).',
      'Enter action potential voltage threshold $V_{\text{th}}$ above reset in millivolts (mV).',
      'Enter absolute refractory dead-time period $t_{\text{ref}}$ in milliseconds.',
      'Inspect steady-state spiking output frequency in Hz, Inter-Spike Interval (ISI), and minimum rheobase threshold firing current.'
    ],
    benefitTitle: 'Louis Lapicque 1907 Integrate-and-Fire Model',
    benefitContent: 'The LIF model is the workhorse of computational neuroscience and neuromorphic computing (Intel Loihi / IBM TrueNorth), providing an analytically tractable spiking neuron abstraction that accurately models gain modulation ($f\text{–}I$ curve).',
    faqs: [{ q: 'What is the Rheobase current?', a: 'Rheobase is the minimum continuous injected current required to charge the membrane up to the action potential threshold ($I_{\text{rheo}} = V_{\text{th}} / R$).' }]
  },

  // --- Suite LLLLL: Petrochemical, Chemical Refining & Distillation (McCabe-Thiele & Fenske) (885 - 889) ---
  // 6. Fenske Equation Minimum Distillation Equilibrium Stages Calculator
  {
    slug: 'fenske-underwood-gilliland-distillation-stages-calculator',
    name: 'Fenske-Underwood-Gilliland Distillation Minimum Stages (N_min) & Reflux Calculator',
    description: 'Calculate fractional distillation column minimum theoretical equilibrium stages at total reflux (Fenske equation: N_min = ln([(x_D/(1-x_D)) / (x_B/(1-x_B))]) / ln(α_avg)) and minimum reflux ratio R_min.',
    category: 'Science',
    icon: 'text',
    keywords: ['fenske equation calculator', 'minimum theoretical stages distillation fenske underwood formula', 'minimum reflux ratio r min calculator online', 'chemical engineering distillation column stages calculator', 'fenske gilliland shortcut distillation online'],
    order: 766,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Distillate Purity x_D (0 to 1), Bottoms Impurity x_B (0 to 1) & Relative Volatility α',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fnk-xd">Distillate x_D</label>
          <input class="tool-textarea" id="fnk-xd" type="number" step="0.01" min="0.50" max="0.999" value="0.95" placeholder="0.95 (95% Top Purity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fnk-xb">Bottoms x_B</label>
          <input class="tool-textarea" id="fnk-xb" type="number" step="0.01" min="0.001" max="0.50" value="0.05" placeholder="0.05 (5% in Bottoms)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fnk-alpha">Volatility α</label>
          <input class="tool-textarea" id="fnk-alpha" type="number" step="0.1" value="2.40" placeholder="2.40 (Benzene-Toluene)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fnk-xf">Feed x_F</label>
          <input class="tool-textarea" id="fnk-xf" type="number" step="0.05" value="0.50" placeholder="0.50 (50% Feed)" />
        </div>
      </div>
      <div id="fnk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fnk-res-nmin" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N_min = 6.78 Stages (7 Trays)</span>
            <span class="stat-label">Minimum Theoretical Equilibrium Stages (Total Reflux)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fnk-res-rmin" style="font-weight:700;">Minimum Reflux R_min = 1.08 | Operating R = 1.40 (Actual Trays: ~14 Stages)</span>
            <span class="stat-label">Underwood Minimum Reflux Ratio & Recommended Operation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xdEl = document.getElementById('fnk-xd'), xbEl = document.getElementById('fnk-xb');
  const aEl = document.getElementById('fnk-alpha'), xfEl = document.getElementById('fnk-xf');
  const nResEl = document.getElementById('fnk-res-nmin'), rResEl = document.getElementById('fnk-res-rmin');

  function update() {
    const xD = parseFloat(xdEl.value), xB = parseFloat(xbEl.value);
    const alpha = parseFloat(aEl.value), xF = parseFloat(xfEl.value);

    if (isNaN(xD) || isNaN(xB) || isNaN(alpha) || isNaN(xF) || xD <= xB || xD >= 1.0 || xB <= 0 || alpha <= 1.0 || xF <= 0 || xF >= 1.0) return;

    // Fenske equation: N_min = ln( (xD / (1 - xD)) / (xB / (1 - xB)) ) / ln(alpha)
    const topSep = xD / (1.0 - xD);
    const botSep = xB / (1.0 - xB);
    const N_min = Math.log(topSep / botSep) / Math.log(alpha);

    // Underwood minimum reflux ratio for saturated liquid feed (q=1):
    // R_min = ( 1 / (alpha - 1) ) * ( (xD / xF) - (alpha * (1 - xD) / (1 - xF)) )
    const R_min = (1.0 / (alpha - 1.0)) * ((xD / xF) - ((alpha * (1.0 - xD)) / (1.0 - xF)));

    // Standard commercial operating reflux R_op = 1.30 * R_min
    const R_op = Math.max(0.1, 1.30 * R_min);

    // Gilliland correlation for actual theoretical stages N_actual approx = 2 * N_min
    const N_actual = Math.ceil(N_min * 2.0);

    nResEl.textContent = 'N_min = ' + N_min.toFixed(2) + ' Stages (' + Math.ceil(N_min) + ' Trays @ Total Reflux)';
    rResEl.textContent = 'R_min = ' + R_min.toFixed(2) + ' | Operating R_op = ' + R_op.toFixed(2) + ' (1.3× R_min -> ~' + N_actual + ' Theoretical Trays)';
  }

  [xdEl, xbEl, aEl, xfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter light key mole fraction in top distillate product $x_D$ (e.g. 0.95).',
      'Enter light key mole fraction in bottoms discharge waste $x_B$ (e.g. 0.05).',
      'Enter relative volatility $\alpha = K_{\text{light}} / K_{\text{heavy}}$ between separation components.',
      'Enter light key mole fraction in raw feed stream $x_F$.',
      'Inspect minimum theoretical equilibrium stages $N_{\min}$ at total reflux, Underwood minimum reflux ratio $R_{\min}$, and estimated commercial tray count.'
    ],
    benefitTitle: 'Merrell Fenske 1932 Shortcut Distillation Column Sizing',
    benefitContent: 'The Fenske equation sets the absolute lower bound on distillation tower height ($N_{\min}$); chemical plant designers use the Fenske-Underwood-Gilliland shortcut method to optimize the economic trade-off between capital column height cost vs operating reboiler steam reflux costs.',
    faqs: [{ q: 'What happens as relative volatility (α) approaches 1.0?', a: 'When $\alpha \to 1.0$ (close-boiling mixtures or azeotropes), the required stages $N_{\min} \to \infty$, making simple distillation impossible without extractive solvents or entrainers.' }]
  },

  // 7. McCabe-Thiele Distillation Operating Lines & Feed q-Line Slope Calculator
  {
    slug: 'mccabe-thiele-reflux-ratio-feed-q-line-calculator',
    name: 'McCabe-Thiele Distillation Operating Lines & Feed q-Line Slope Calculator',
    description: 'Calculate McCabe-Thiele binary distillation column Rectifying line (y = (R/(R+1))·x + x_D/(R+1)), Stripping line, and thermal feed q-line slope (m_q = q / (q - 1)).',
    category: 'Science',
    icon: 'text',
    keywords: ['mccabe thiele calculator', 'distillation q line slope formula q over q minus 1 online', 'rectifying stripping operating line mccabe thiele calculator', 'reflux ratio mccabe thiele step by step online', 'chemical engineering binary distillation mccabe thiele'],
    order: 767,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reflux Ratio R, Distillate x_D, Feed x_F, Bottoms x_B & Feed Thermal State q',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mct-r">Reflux Ratio R</label>
          <input class="tool-textarea" id="mct-r" type="number" step="0.1" value="2.0" placeholder="2.0 (L / D)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mct-xd">Distillate x_D</label>
          <input class="tool-textarea" id="mct-xd" type="number" step="0.05" value="0.95" placeholder="0.95" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mct-xf">Feed x_F</label>
          <input class="tool-textarea" id="mct-xf" type="number" step="0.05" value="0.45" placeholder="0.45" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mct-q">Feed State (q)</label>
          <select class="tool-textarea" id="mct-q">
            <option value="1.0" selected>Saturated Liquid (q = 1.0: Vertical q-line)</option>
            <option value="1.2">Subcooled Cold Liquid (q = 1.2: Positive Slope)</option>
            <option value="0.5">Saturated Liquid-Vapor Mix (q = 0.5: Negative Slope)</option>
            <option value="0.0">Saturated Vapor (q = 0.0: Horizontal q-line)</option>
          </select>
        </div>
      </div>
      <div id="mct-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mct-res-rol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">y = 0.667·x + 0.317</span>
            <span class="stat-label">Rectifying Section Operating Line (ROL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mct-res-qline" style="font-weight:700;">Feed q-Line: x = 0.450 (Vertical Saturated Liquid Feed | q = 1.0)</span>
            <span class="stat-label">Feed Line Equation & Thermal Quality</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('mct-r'), xdEl = document.getElementById('mct-xd');
  const xfEl = document.getElementById('mct-xf'), qEl = document.getElementById('mct-q');
  const rolResEl = document.getElementById('mct-res-rol'), qlResEl = document.getElementById('mct-res-qline');

  function update() {
    const R = parseFloat(rEl.value), xD = parseFloat(xdEl.value);
    const xF = parseFloat(xfEl.value), q = parseFloat(qEl.value);

    if (isNaN(R) || isNaN(xD) || isNaN(xF) || isNaN(q) || R <= 0 || xD <= 0 || xF <= 0) return;

    // Rectifying Operating Line (ROL): y = (R / (R + 1)) * x + (xD / (R + 1))
    const slopeROL = R / (R + 1.0);
    const interceptROL = xD / (R + 1.0);

    // Feed q-line: y = (q / (q - 1)) * x - (xF / (q - 1))
    let qlineStr = '';
    if (Math.abs(q - 1.0) < 1e-4) {
      qlineStr = 'Vertical line x = ' + xF.toFixed(3) + ' (Saturated Liquid Feed)';
    } else if (Math.abs(q) < 1e-4) {
      qlineStr = 'Horizontal line y = ' + xF.toFixed(3) + ' (Saturated Vapor Feed)';
    } else {
      const slopeQ = q / (q - 1.0);
      const interceptQ = -xF / (q - 1.0);
      qlineStr = 'y = ' + slopeQ.toFixed(3) + '·x + ' + interceptQ.toFixed(3) + ' (Slope = ' + slopeQ.toFixed(2) + ')';
    }

    rolResEl.textContent = 'ROL: y = ' + slopeROL.toFixed(3) + '·x + ' + interceptROL.toFixed(3);
    qlResEl.textContent = 'Feed q-Line: ' + qlineStr + ' | y-Intercept = ' + interceptROL.toFixed(3);
  }

  [rEl, xdEl, xfEl].forEach(el => el.addEventListener('input', update));
  qEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter external reflux ratio $R = L/D$.',
      'Enter target distillate top product purity $x_D$.',
      'Enter raw feed liquid mole fraction $x_F$.',
      'Select thermal quality state of the feed stream (Saturated Liquid $q=1$, Saturated Vapor $q=0$, or Cold Subcooled Liquid $q>1$).',
      'Inspect Rectifying Operating Line (ROL) slope/intercept and feed q-line equation ready for graphical McCabe-Thiele stepping.'
    ],
    benefitTitle: 'Warren McCabe & Ernest Thiele 1925 Graphical Method',
    benefitContent: 'McCabe-Thiele assumes Constant Molar Overflow (CMO) to convert complex non-linear vapor-liquid equilibrium into straight operating lines on an x-y diagram, allowing visual step-by-step determination of exact feed tray location and column stages.',
    faqs: [{ q: 'What is the physical meaning of feed parameter q?', a: 'q represents the moles of liquid entering the stripping section per mole of total feed ($q = 1.0$ means the feed is liquid at its boiling bubble point).' }]
  },

  // 8. Gas Absorption Packed Tower Kremser Equation Number of Stages Calculator
  {
    slug: 'gas-absorption-kremser-equation-stages-calculator',
    name: 'Gas Absorption Packed Tower Kremser Equation (N_stages) Calculator',
    description: 'Calculate gas scrubbing absorption packed tower theoretical stages (Kremser equation: N = ln([(1 - 1/A)·(y_in - m·x_in)/(y_out - m·x_in) + 1/A]) / ln A) from Absorption Factor A = L / (m·G).',
    category: 'Science',
    icon: 'text',
    keywords: ['kremser equation calculator', 'gas absorption packed tower stages formula online', 'absorption factor a equals l over m g calculator', 'gas scrubbing column theoretical stages kremser online', 'chemical engineering gas absorption stripping online'],
    order: 768,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inlet Solute y_in (mol %), Outlet Target y_out (mol %), Liquid/Gas Ratio L/G & Henry\'s Slope m',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="krm-yin">Inlet y_in (%)</label>
          <input class="tool-textarea" id="krm-yin" type="number" step="any" value="5.0" placeholder="5.0 % (50,000 ppm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="krm-yout">Target y_out (%)</label>
          <input class="tool-textarea" id="krm-yout" type="number" step="any" value="0.10" placeholder="0.10 % (98% Removal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="krm-lg">L / G Ratio</label>
          <input class="tool-textarea" id="krm-lg" type="number" step="0.1" value="1.80" placeholder="1.80 (Liquid/Gas)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="krm-m">Henry Slope m</label>
          <input class="tool-textarea" id="krm-m" type="number" step="0.1" value="1.20" placeholder="1.20 (y = m·x)" />
        </div>
      </div>
      <div id="krm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="krm-res-n" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N = 6.42 Stages (7 Stages)</span>
            <span class="stat-label">Theoretical Transfer Stages (Kremser Equation)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="krm-res-a" style="color:var(--green-dark); font-weight:700;">Absorption Factor A = 1.50 (A > 1.0: Favorable Fast Scrubbing) | 98.0% Removal</span>
            <span class="stat-label">Dimensionless Absorption Factor (A = L / (m·G))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const yinEl = document.getElementById('krm-yin'), youtEl = document.getElementById('krm-yout');
  const lgEl = document.getElementById('krm-lg'), mEl = document.getElementById('krm-m');
  const nResEl = document.getElementById('krm-res-n'), aResEl = document.getElementById('krm-res-a');

  function update() {
    const yinPct = parseFloat(yinEl.value), youtPct = parseFloat(youtEl.value);
    const LG = parseFloat(lgEl.value), m = parseFloat(mEl.value);

    if (isNaN(yinPct) || isNaN(youtPct) || isNaN(LG) || isNaN(m) || yinPct <= youtPct || youtPct <= 0 || LG <= 0 || m <= 0) return;

    // Absorption factor A = L / (m * G) = (L/G) / m
    const A = LG / m;

    const removalPct = ((yinPct - youtPct) / yinPct) * 100;

    let N = 0;
    if (Math.abs(A - 1.0) < 0.01) {
      // Special case A = 1: N = (yin - yout) / yout
      N = (yinPct - youtPct) / youtPct;
    } else {
      // Kremser absorption formula with clean solvent (x_in = 0):
      // N = ln( (1 - 1/A)*(yin / yout) + 1/A ) / ln(A)
      const term = ((1.0 - (1.0 / A)) * (yinPct / youtPct)) + (1.0 / A);
      if (term > 0) {
        N = Math.log(term) / Math.log(A);
      } else {
        nResEl.textContent = 'Absorption Factor Too Low (A < 1)';
        return;
      }
    }

    nResEl.textContent = 'N = ' + N.toFixed(2) + ' Stages (' + Math.ceil(N) + ' Theoretical Trays)';
    aResEl.textContent = 'Absorption Factor A = ' + A.toFixed(2) + ' (' + removalPct.toFixed(1) + '% Solute Scrubbed | L/G = ' + LG.toFixed(2) + ', m = ' + m.toFixed(2) + ')';
  }

  [yinEl, youtEl, lgEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter raw gas stream inlet solute concentration $y_{\text{in}}$ in mol % (e.g. $CO_2, SO_2, NH_3$).',
      'Enter cleaned gas target outlet concentration $y_{\text{out}}$ in mol %.',
      'Enter molar liquid-to-gas solvent ratio L/G.',
      'Enter Henry\'s law vapor-liquid equilibrium slope m ($y = m \cdot x$).',
      'Inspect required number of theoretical absorption stages N and check that Absorption Factor $A > 1.2$ for economical solvent usage.'
    ],
    benefitTitle: 'Alois Kremser 1930 Analytical Absorption Sizing',
    benefitContent: 'The Kremser equation provides exact analytical solutions for countercurrent gas absorption and stripping columns; operating with an absorption factor $A = L/(mG) \approx 1.4\text{–}2.0$ guarantees deep solute removal without excessive solvent recirculation pumping costs.',
    faqs: [{ q: 'What happens if the absorption factor A is less than 1.0?', a: 'When $A < 1.0$, the solvent liquid rate is insufficient to absorb the solute, requiring infinite column height ($N \to \infty$) to achieve high removal percentages.' }]
  },

  // 9. Colburn Number of Transfer Units (NTU) & Packed Column Height Calculator
  {
    slug: 'colburn-htug-height-transfer-unit-packed-column-calculator',
    name: 'Colburn Number of Transfer Units (NTU) & Packed Column Height (Z) Calculator',
    description: 'Calculate mass transfer packed column bed height (Z = HTU · NTU) in meters from Height of a Transfer Unit (HTU) and Colburn Number of Transfer Units (NTU).',
    category: 'Science',
    icon: 'text',
    keywords: ['colburn ntu calculator', 'packed column height formula z equals htu times ntu', 'number of transfer units ntu absorption calculator online', 'height of transfer unit htu mass transfer calculator', 'packed tower structured packing height online'],
    order: 769,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Height of Transfer Unit HTU (m), Inlet y_in (%), Target y_out (%) & Absorption Factor A',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ntu-htu">HTU Height (m)</label>
          <input class="tool-textarea" id="ntu-htu" type="number" step="any" value="0.65" placeholder="0.65 m (Structured Packing)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ntu-yin">Inlet y_in (%)</label>
          <input class="tool-textarea" id="ntu-yin" type="number" step="any" value="4.0" placeholder="4.0 %" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ntu-yout">Target y_out (%)</label>
          <input class="tool-textarea" id="ntu-yout" type="number" step="any" value="0.08" placeholder="0.08 %" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ntu-a">Factor A</label>
          <input class="tool-textarea" id="ntu-a" type="number" step="0.1" value="1.40" placeholder="1.40" />
        </div>
      </div>
      <div id="ntu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ntu-res-z" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Z = 4.41 m Packing Height</span>
            <span class="stat-label">Required Packed Bed Height (Z = HTU · NTU)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ntu-res-ntu" style="font-weight:700;">NTU_OG = 6.78 Transfer Units (Separation Difficulty: 98.0% Removal)</span>
            <span class="stat-label">Overall Gas-Phase Transfer Units (NTU_OG)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const htuEl = document.getElementById('ntu-htu'), yinEl = document.getElementById('ntu-yin');
  const youtEl = document.getElementById('ntu-yout'), aEl = document.getElementById('ntu-a');
  const zResEl = document.getElementById('ntu-res-z'), ntuResEl = document.getElementById('ntu-res-ntu');

  function update() {
    const HTU = parseFloat(htuEl.value), yin = parseFloat(yinEl.value);
    const yout = parseFloat(youtEl.value), A = parseFloat(aEl.value);

    if (isNaN(HTU) || isNaN(yin) || isNaN(yout) || isNaN(A) || HTU <= 0 || yin <= yout || yout <= 0 || A <= 0) return;

    // Colburn equation for NTU_OG with clean solvent (x_in = 0):
    // NTU_OG = ( A / (A - 1) ) * ln( (1 - 1/A)*(yin / yout) + 1/A )
    let NTU = 0;
    if (Math.abs(A - 1.0) < 0.01) {
      NTU = (yin - yout) / yout;
    } else {
      const term = ((1.0 - (1.0 / A)) * (yin / yout)) + (1.0 / A);
      if (term > 0) {
        NTU = (A / (A - 1.0)) * Math.log(term);
      } else {
        zResEl.textContent = 'Invalid Parameter (A < 1)';
        return;
      }
    }

    // Total bed height Z = HTU * NTU  [meters]
    const Z_m = HTU * NTU;
    const Z_ft = Z_m * 3.28084;

    zResEl.textContent = 'Z = ' + Z_m.toFixed(2) + ' m (' + Z_ft.toFixed(1) + ' ft Packed Height)';
    ntuResEl.textContent = 'NTU_OG = ' + NTU.toFixed(2) + ' Transfer Units (HTU = ' + HTU + ' m | ' + ((yin-yout)/yin*100).toFixed(1) + '% Scrubbed @ A = ' + A.toFixed(2) + ')';
  }

  [htuEl, yinEl, youtEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter packing Height of a Transfer Unit (HTU) in meters (typically 0.3 to 0.8 m for high-efficiency structured packings like Mellapak).',
      'Enter inlet gas solute concentration $y_{\text{in}}$ in %.',
      'Enter target outlet gas solute concentration $y_{\text{out}}$ in %.',
      'Enter absorption factor A ($A = L / mG$).',
      'Inspect required total packed column bed height Z in meters and feet.'
    ],
    benefitTitle: 'Allan Colburn 1939 Continuous Mass Transfer Integration',
    benefitContent: 'Packed columns transfer mass continuously rather than in discrete equilibrium trays; factoring column height into $Z = HTU \times NTU$ separates the equipment mass transfer efficiency ($HTU$) from the thermodynamic separation difficulty ($NTU$).',
    faqs: [{ q: 'Why is structured packing preferred over random dumping rings in modern columns?', a: 'Structured corrugated sheet metal packings offer much higher surface area per unit volume with lower pressure drop, cutting HTU in half.' }]
  },

  // 10. Reid Vapor Pressure (RVP) Gasoline & Crude Oil Blending Calculator
  {
    slug: 'reid-vapor-pressure-rvp-crude-oil-blending-calculator',
    name: 'Reid Vapor Pressure (RVP) Gasoline & Crude Blending (Chevron Formula) Calculator',
    description: 'Calculate petroleum gasoline blending Reid Vapor Pressure (RVP_blend = (Σ v_i · RVP_i^1.25)^(1/1.25)) in psi/kPa across butane, reformate, alkylate, and FCC naphtha components.',
    category: 'Science',
    icon: 'text',
    keywords: ['reid vapor pressure calculator', 'rvp blending formula chevron 1.25 power online', 'gasoline rvp blending index calculator online', 'butane blending gasoline rvp calculator', 'petroleum refinery rvp compliance online'],
    order: 770,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Blend Fractions (%) and Component RVPs: Butane (52 psi), Alkylate (5 psi), Reformate (3.5 psi), Naphtha (12 psi)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rvp-but-vol">Butane Vol (%)</label>
          <input class="tool-textarea" id="rvp-but-vol" type="number" step="0.5" value="6.0" placeholder="6.0 % (RVP = 52 psi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rvp-alk-vol">Alkylate Vol (%)</label>
          <input class="tool-textarea" id="rvp-alk-vol" type="number" step="1" value="30.0" placeholder="30.0 % (RVP = 5.0 psi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rvp-ref-vol">Reformate (%)</label>
          <input class="tool-textarea" id="rvp-ref-vol" type="number" step="1" value="34.0" placeholder="34.0 % (RVP = 3.5 psi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rvp-fcc-vol">FCC Naphtha (%)</label>
          <input class="tool-textarea" id="rvp-fcc-vol" type="number" step="1" value="30.0" placeholder="30.0 % (RVP = 11.5 psi)" />
        </div>
      </div>
      <div id="rvp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rvp-res-blend" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">RVP = 8.82 psi (60.8 kPa)</span>
            <span class="stat-label">Chevron Non-Linear Blended Reid Vapor Pressure</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rvp-res-epa" style="color:var(--green-dark); font-weight:700;">EPA SUMMER COMPLIANT (RVP ≤ 9.00 psi Federal Ozone Attainment Limit)</span>
            <span class="stat-label">EPA Clean Air Act Summer/Winter Fuel Compliance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bVEl = document.getElementById('rvp-but-vol'), aVEl = document.getElementById('rvp-alk-vol');
  const rVEl = document.getElementById('rvp-ref-vol'), fVEl = document.getElementById('rvp-fcc-vol');
  const bResEl = document.getElementById('rvp-res-blend'), epaResEl = document.getElementById('rvp-res-epa');

  // Component pure RVPs in psi:
  const RVP_but = 52.0;  // n-Butane
  const RVP_alk = 5.0;   // Alkylate
  const RVP_ref = 3.5;   // Reformate
  const RVP_fcc = 11.5;  // FCC Naphtha

  function update() {
    const vBut = parseFloat(bVEl.value), vAlk = parseFloat(aVEl.value);
    const vRef = parseFloat(rVEl.value), vFcc = parseFloat(fVEl.value);

    if (isNaN(vBut) || isNaN(vAlk) || isNaN(vRef) || isNaN(vFcc)) return;

    const totalVol = vBut + vAlk + vRef + vFcc;
    if (totalVol === 0) return;

    // Chevron 1.25 power blending index method:
    // Blend Index BI = sum( (v_i / totalVol) * (RVP_i)^1.25 )
    // RVP_blend = (BI)^(1 / 1.25)
    const BI = ((vBut / totalVol) * Math.pow(RVP_but, 1.25)) +
               ((vAlk / totalVol) * Math.pow(RVP_alk, 1.25)) +
               ((vRef / totalVol) * Math.pow(RVP_ref, 1.25)) +
               ((vFcc / totalVol) * Math.pow(RVP_fcc, 1.25));

    const RVP_blend_psi = Math.pow(BI, 1.0 / 1.25);
    const RVP_blend_kpa = RVP_blend_psi * 6.89476;

    let epaStatus = '';
    let color = '#22543d';

    if (RVP_blend_psi <= 7.80) {
      epaStatus = 'EPA STRICT REFORMULATED (RFG) SUMMER COMPLIANT (RVP ≤ 7.8 psi: High Ozone Non-Attainment)';
      color = '#22543d';
    } else if (RVP_blend_psi <= 9.00) {
      epaStatus = 'EPA CONVENTIONAL SUMMER COMPLIANT (RVP ≤ 9.0 psi Federal Standard)';
      color = '#22543d';
    } else if (RVP_blend_psi <= 13.5) {
      epaStatus = 'WINTER GASOLINE SPECIFICATION (RVP 11.5 - 13.5 psi: Easy Cold Weather Engine Starting)';
      color = '#2563eb';
    } else {
      epaStatus = 'VAPOR LOCK RISK: RVP exceeds 13.5 psi - Risk of hot fuel pump cavitation vapor lock!';
      color = '#c53030';
    }

    bResEl.textContent = 'RVP = ' + RVP_blend_psi.toFixed(2) + ' psi (' + RVP_blend_kpa.toFixed(1) + ' kPa)';
    epaResEl.textContent = epaStatus + ' (Total Volume: ' + totalVol.toFixed(0) + '%)';
    epaResEl.style.color = color;
  }

  [bVEl, aVEl, rVEl, fVEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter volume percentage of volatile n-Butane ($RVP = 52\text{ psi}$).',
      'Enter volume percentage of low-volatility Alkylate ($RVP = 5.0\text{ psi}$).',
      'Enter volume percentage of high-octane Reformate ($RVP = 3.5\text{ psi}$).',
      'Enter volume percentage of FCC Catalytic Cracker Naphtha ($RVP = 11.5\text{ psi}$).',
      'Inspect blended Reid Vapor Pressure (RVP) in psi and kPa calculated via the Chevron 1.25 power method and verify EPA Clean Air Act compliance.'
    ],
    benefitTitle: 'Chevron Non-Linear Vapor Pressure Blending Law',
    benefitContent: 'Because butane vaporizes non-ideally in gasoline, simple linear blending underestimates vapor pressure; refinery linear programming (LP) models use Chevron\'s exponent rule ($RVP_{\text{blend}} = [\sum v_i RVP_i^{1.25}]^{0.8}$) to maximize high-margin butane blending without violating EPA summer 9.0 psi ozone smog limits.',
    faqs: [{ q: 'Why is gasoline RVP lower in summer than in winter?', a: 'Hot summer temperatures cause high-RVP fuel to rapidly evaporate into volatile organic compounds (VOCs) that create ground-level smog, whereas cold winter temperatures require higher RVP (13.5 psi) for reliable engine cold starts.' }]
  },

  // --- Suite MMMMM: Structural Foundation & Retaining Wall Geotechnics (890 - 894) ---
  // 11. Rankine Active & Passive Lateral Earth Pressure Calculator
  {
    slug: 'rankine-active-passive-earth-pressure-calculator',
    name: 'Rankine Lateral Earth Pressure (K_a & K_p) & Retaining Wall Thrust Calculator',
    description: 'Calculate soil lateral earth pressure coefficients (K_a = tan²(45° - ϕ/2), K_p = tan²(45° + ϕ/2)) and total lateral thrust force (P_a = 1/2 · K_a · γ · H²) in kN/m against vertical retaining walls.',
    category: 'Science',
    icon: 'text',
    keywords: ['rankine earth pressure calculator', 'active passive earth pressure formula ka kp tan squared 45 minus phi over 2', 'retaining wall lateral earth thrust calculator online', 'soil internal friction angle rankine calculator', 'geotechnical retaining wall earth pressure online'],
    order: 771,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wall Height H (m), Soil Unit Weight γ (kN/m³) & Internal Friction Angle ϕ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rnk-h">Wall Height H (m)</label>
          <input class="tool-textarea" id="rnk-h" type="number" step="any" value="4.0" placeholder="4.0 m Wall" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rnk-gamma">Unit Weight γ</label>
          <input class="tool-textarea" id="rnk-gamma" type="number" step="any" value="18.0" placeholder="18.0 kN/m³ (Compacted Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rnk-phi">Friction Angle ϕ (°)</label>
          <input class="tool-textarea" id="rnk-phi" type="number" step="1" value="32.0" placeholder="32.0°" />
        </div>
      </div>
      <div id="rnk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rnk-res-pa" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_a = 44.2 kN / m Thrust</span>
            <span class="stat-label">Total Active Lateral Earth Thrust Force (P_a)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rnk-res-coeffs" style="font-weight:700;">K_a = 0.307 (Active) | K_p = 3.255 (Passive Resistance 10.6× Higher)</span>
            <span class="stat-label">Rankine Earth Pressure Coefficients (K_a & K_p)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('rnk-h'), gEl = document.getElementById('rnk-gamma'), pEl = document.getElementById('rnk-phi');
  const paResEl = document.getElementById('rnk-res-pa'), cfResEl = document.getElementById('rnk-res-coeffs');

  function update() {
    const H = parseFloat(hEl.value), gamma = parseFloat(gEl.value), phiDeg = parseFloat(pEl.value);
    if (isNaN(H) || isNaN(gamma) || isNaN(phiDeg) || H <= 0 || gamma <= 0 || phiDeg <= 0 || phiDeg >= 90) return;

    const phiRad = (phiDeg * Math.PI) / 180;

    // Rankine active coefficient Ka = tan^2( 45° - phi/2 ) = (1 - sin(phi)) / (1 + sin(phi))
    const Ka = (1.0 - Math.sin(phiRad)) / (1.0 + Math.sin(phiRad));

    // Rankine passive coefficient Kp = tan^2( 45° + phi/2 ) = (1 + sin(phi)) / (1 - sin(phi)) = 1 / Ka
    const Kp = 1.0 / Ka;

    // At-rest coefficient K0 approx = 1 - sin(phi) (Jaky formula)
    const K0 = 1.0 - Math.sin(phiRad);

    // Total active thrust Pa = 0.5 * Ka * gamma * H^2  [kN / linear meter]
    const Pa = 0.5 * Ka * gamma * Math.pow(H, 2);

    // Overturning moment at base M_overturn = Pa * (H / 3)  [kN * m / m]
    const M_overturn = Pa * (H / 3.0);

    paResEl.textContent = 'P_a = ' + Pa.toFixed(1) + ' kN / m (Active Thrust @ H/3 = ' + (H/3).toFixed(2) + ' m)';
    cfResEl.textContent = 'K_a = ' + Ka.toFixed(3) + ' | K_0 = ' + K0.toFixed(3) + ' | K_p = ' + Kp.toFixed(3) + ' (Overturning Moment M_o = ' + M_overturn.toFixed(1) + ' kN·m/m)';
  }

  [hEl, gEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter retaining wall vertical stem height H in meters.',
      'Enter retained backfill soil unit weight $\gamma$ in $\text{kN/m}^3$ (typically 17 to 20 $\text{kN/m}^3$).',
      'Enter soil internal friction angle $\phi$ in degrees (typically 28° to 36° for granular soils).',
      'Inspect Rankine active coefficient $K_a$, at-rest $K_0$, passive resistance coefficient $K_p$, total lateral horizontal active thrust $P_a$ in kN/m, and overturning moment about the toe.'
    ],
    benefitTitle: 'William John Macquorn Rankine 1857 Earth Pressure Theory',
    benefitContent: 'Rankine assumes cohesionless soil in plastic equilibrium; as a retaining wall yields slightly outward ($0.001 H$), active earth pressure ($K_a$) drops to its minimum state, providing the baseline lateral load for designing reinforced concrete cantilever and gravity retaining walls.',
    faqs: [{ q: 'Why is active pressure (Ka) so much smaller than passive pressure (Kp)?', a: 'Active failure occurs when soil expands outward along slip planes, while passive failure requires compressing the entire soil mass against internal shear resistance.' }]
  },

  // 12. Retaining Wall Overturning & Sliding Factor of Safety Calculator
  {
    slug: 'retaining-wall-overturning-sliding-factor-of-safety-calculator',
    name: 'Retaining Wall Stability Factor of Safety (FS_overturn & FS_slide) Calculator',
    description: 'Calculate cantilever/gravity retaining wall stability Factors of Safety against Overturning (FS_overturn = Σ M_R / Σ M_O ≥ 2.0) and Base Sliding (FS_slide = μ·R_v / P_h ≥ 1.5).',
    category: 'Science',
    icon: 'text',
    keywords: ['retaining wall factor of safety calculator', 'overturning sliding stability formula sum mr over sum mo', 'retaining wall geotechnical safety factor calculator online', 'cantilever wall sliding resistance calculator', 'civil engineering retaining wall stability online'],
    order: 772,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Resisting Moment M_R (kN·m/m), Overturning M_O (kN·m/m), Vertical Weight R_v (kN/m) & Base Friction μ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rw-mr">Resisting M_R</label>
          <input class="tool-textarea" id="rw-mr" type="number" step="any" value="220.0" placeholder="220.0 kN·m/m (Weight)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rw-mo">Overturn M_O</label>
          <input class="tool-textarea" id="rw-mo" type="number" step="any" value="85.0" placeholder="85.0 kN·m/m (Thrust)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rw-rv">Total Weight R_v</label>
          <input class="tool-textarea" id="rw-rv" type="number" step="any" value="160.0" placeholder="160.0 kN/m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rw-ph">Lateral Thrust P_h</label>
          <input class="tool-textarea" id="rw-ph" type="number" step="any" value="50.0" placeholder="50.0 kN/m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rw-mu">Base Friction μ</label>
          <input class="tool-textarea" id="rw-mu" type="number" step="0.05" value="0.55" placeholder="0.55 (Concrete on Sand)" />
        </div>
      </div>
      <div id="rw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rw-res-fso" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">FS_overturn = 2.59 (SAFE ≥ 2.0)</span>
            <span class="stat-label">Factor of Safety Against Overturning About Toe</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rw-res-fss" style="color:var(--green-dark); font-weight:700;">FS_sliding = 1.76 (SAFE ≥ 1.5 | Sliding Resistance F_r = 88.0 kN/m)</span>
            <span class="stat-label">Factor of Safety Against Base Sliding</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mrEl = document.getElementById('rw-mr'), moEl = document.getElementById('rw-mo');
  const rvEl = document.getElementById('rw-rv'), phEl = document.getElementById('rw-ph'), muEl = document.getElementById('rw-mu');
  const fsoResEl = document.getElementById('rw-res-fso'), fssResEl = document.getElementById('rw-res-fss');

  function update() {
    const MR = parseFloat(mrEl.value), MO = parseFloat(moEl.value);
    const Rv = parseFloat(rvEl.value), Ph = parseFloat(phEl.value), mu = parseFloat(muEl.value);

    if (isNaN(MR) || isNaN(MO) || isNaN(Rv) || isNaN(Ph) || isNaN(mu) || MO <= 0 || Ph <= 0 || Rv <= 0 || mu <= 0) return;

    // FS against overturning = sum(M_R) / sum(M_O)
    const FS_ot = MR / MO;

    // Sliding resistance force Fr = mu * Rv  [kN / m]
    const Fr = mu * Rv;
    // FS against sliding = Fr / Ph
    const FS_sl = Fr / Ph;

    let otColor = FS_ot >= 2.0 ? '#22543d' : (FS_ot >= 1.5 ? '#d97706' : '#c53030');
    let slColor = FS_sl >= 1.5 ? '#22543d' : (FS_sl >= 1.2 ? '#d97706' : '#c53030');

    fsoResEl.textContent = 'FS_overturn = ' + FS_ot.toFixed(2) + ' (' + (FS_ot >= 2.0 ? 'SAFE ≥ 2.0 Code Compliant' : 'FAIL: Below 2.0 Minimum!') + ')';
    fsoResEl.style.color = otColor;

    fssResEl.textContent = 'FS_sliding = ' + FS_sl.toFixed(2) + ' (' + (FS_sl >= 1.5 ? 'SAFE ≥ 1.5' : 'FAIL: Base Key or Wider Footing Required!') + ' | Resisting Force F_r = ' + Fr.toFixed(1) + ' kN/m)';
    fssResEl.style.color = slColor;
  }

  [mrEl, moEl, rvEl, phEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total restoring stabilizing moment $M_R$ about the footing toe in $\text{kN}\cdot\text{m/m}$.',
      'Enter total destabilizing overturning moment $M_O$ in $\text{kN}\cdot\text{m/m}$.',
      'Enter total vertical downward foundation weight $R_v$ in kN/m.',
      'Enter total lateral horizontal soil thrust $P_h$ in kN/m.',
      'Enter base concrete-to-soil friction coefficient $\mu$ (typically 0.45 to 0.60).',
      'Inspect structural safety verification factors for Overturning ($FS \ge 2.0$) and Base Sliding ($FS \ge 1.5$).'
    ],
    benefitTitle: 'Geotechnical Retaining Wall Stability Verification',
    benefitContent: 'Building codes (IBC / Eurocode 7) mandate strict minimum safety margins ($FS_{\text{overturn}} \ge 2.0, FS_{\text{sliding}} \ge 1.5$) to guard against soil saturation, hydrostatic water pressure buildup, and earthquake ground shaking.',
    faqs: [{ q: 'How do civil engineers fix a sliding failure (FS_slide < 1.5)?', a: 'By extending the footing heel/toe width, casting a concrete shear key beneath the base slab, or installing tieback soil anchors.' }]
  },

  // 13. Deep Foundation Driven Pile Ultimate Bearing Capacity (Meyerhof Method) Calculator
  {
    slug: 'pile-foundation-bearing-capacity-meyershof-calculator',
    name: 'Deep Foundation Pile Bearing Capacity (Meyerhof Method Q_u = Q_b + Q_s) Calculator',
    description: 'Calculate deep foundation driven/bored pile ultimate axial load capacity (Q_u = q_p·A_p + Σ f_s·A_s) in kN and allowable working load (Q_all = Q_u / FS) across Sand and Clay strata.',
    category: 'Science',
    icon: 'text',
    keywords: ['pile bearing capacity calculator', 'meyerhof deep foundation formula q equals qb plus qs', 'end bearing skin friction pile capacity calculator online', 'driven concrete steel pile axial capacity calculator', 'geotechnical deep foundation pile sizing online'],
    order: 773,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pile Diameter D (m), Embedded Depth L (m), Soil SPT N-Value & Unit Weight γ (kN/m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pil-dia">Pile Dia D (m)</label>
          <input class="tool-textarea" id="pil-dia" type="number" step="any" value="0.50" placeholder="0.50 m (500 mm Pile)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pil-len">Depth L (m)</label>
          <input class="tool-textarea" id="pil-len" type="number" step="any" value="15.0" placeholder="15.0 m Embedment" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pil-spt">SPT N-Value</label>
          <input class="tool-textarea" id="pil-spt" type="number" step="1" value="25" placeholder="25 (Medium Dense Sand)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pil-fs">Safety Factor FS</label>
          <input class="tool-textarea" id="pil-fs" type="number" step="0.5" value="2.5" placeholder="2.5 (Standard)" />
        </div>
      </div>
      <div id="pil-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pil-res-qall" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Q_all = 982 kN (100.1 Tonnes)</span>
            <span class="stat-label">Allowable Working Load Capacity (Q_all = Q_u / FS)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pil-res-split" style="font-weight:700;">Ultimate Q_u = 2,454 kN (Base Q_b: 982 kN [40%] | Shaft Skin Q_s: 1,473 kN [60%])</span>
            <span class="stat-label">End Bearing vs Skin Friction Shaft Resistance Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('pil-dia'), lEl = document.getElementById('pil-len');
  const sptEl = document.getElementById('pil-spt'), fsEl = document.getElementById('pil-fs');
  const qaResEl = document.getElementById('pil-res-qall'), spResEl = document.getElementById('pil-res-split');

  function update() {
    const D = parseFloat(dEl.value), L = parseFloat(lEl.value);
    const N_spt = parseFloat(sptEl.value), FS = parseFloat(fsEl.value);

    if (isNaN(D) || isNaN(L) || isNaN(N_spt) || isNaN(FS) || D <= 0 || L <= 0 || N_spt <= 0 || FS < 1.0) return;

    // Cross-sectional base area A_p = pi * D^2 / 4  [m^2]
    const A_p = (Math.PI * Math.pow(D, 2)) / 4.0;
    // Shaft surface perimeter area A_s = pi * D * L  [m^2]
    const A_s = Math.PI * D * L;

    // Meyerhof empirical SPT correlations for driven piles in sand:
    // Ultimate unit tip resistance q_p = 400 * N_spt * (L/D) <= 4000 * N_spt  [kPa]
    const q_p_kpa = Math.min(4000.0 * N_spt, 400.0 * N_spt * (L / D));
    const Q_b_kN = q_p_kpa * A_p;

    // Average unit skin friction f_s = 2 * N_spt  [kPa] (for driven displacement piles)
    const f_s_kpa = 2.0 * N_spt;
    const Q_s_kN = f_s_kpa * A_s;

    // Total ultimate capacity Q_u = Q_b + Q_s  [kN]
    const Q_u_kN = Q_b_kN + Q_s_kN;

    // Allowable load Q_all = Q_u / FS  [kN]
    const Q_all_kN = Q_u_kN / FS;
    const Q_all_tonnes = Q_all_kN / 9.80665;

    qaResEl.textContent = 'Q_all = ' + Math.round(Q_all_kN).toLocaleString() + ' kN (' + Q_all_tonnes.toFixed(1) + ' Tonnes Working Load)';
    spResEl.textContent = 'Ultimate Q_u = ' + Math.round(Q_u_kN).toLocaleString() + ' kN (Base Q_b: ' + Math.round(Q_b_kN) + ' kN [' + ((Q_b_kN/Q_u_kN)*100).toFixed(0) + '%], Shaft Q_s: ' + Math.round(Q_s_kN) + ' kN [' + ((Q_s_kN/Q_u_kN)*100).toFixed(0) + '%] @ FS = ' + FS + ')';
  }

  [dEl, lEl, sptEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter circular pile diameter D in meters (e.g. 0.50 m).',
      'Enter embedded foundation depth length L in meters.',
      'Enter representative Standard Penetration Test (SPT) soil N-value.',
      'Enter engineering safety factor FS (typically 2.5 to 3.0).',
      'Inspect allowable working load capacity in kN and metric tonnes, along with the percentage breakdown between toe end-bearing ($Q_b$) and shaft skin friction ($Q_s$).'
    ],
    benefitTitle: 'G.G. Meyerhof 1976 Deep Foundation SPT Analysis',
    benefitContent: 'Pile foundations bypass weak surficial soils by transferring skyscraper column loads deep into dense bearing strata via simultaneous shaft perimeter shear friction ($\tau = 2N\text{ kPa}$) and high-pressure toe end-bearing ($q_p = 400N\text{ kPa}$).',
    faqs: [{ q: 'Why is a safety factor of 2.5 to 3.0 standard for piles?', a: 'High safety factors account for subterranean soil heterogeneity, pile installation group shadow effects, and down-drag negative skin friction.' }]
  },

  // 14. Slope Stability Bishop's Simplified Method of Slices Factor of Safety Calculator
  {
    slug: 'soil-slope-stability-bishop-simplified-method-calculator',
    name: 'Soil Slope Stability (Bishop\'s Simplified Method of Slices FS) Calculator',
    description: 'Calculate geotechnical embankment slope stability Factor of Safety (FS = Σ [c\'·b + (W - u·b)·tan ϕ\'] · (sec α / m_α) / Σ W·sin α) for circular slip surface failure.',
    category: 'Science',
    icon: 'text',
    keywords: ['slope stability calculator', 'bishops simplified method of slices formula fs online', 'geotechnical slope failure factor of safety calculator', 'circular slip surface cohesion friction angle calculator', 'landslide embankment slope stability online'],
    order: 774,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cohesion c\' (kPa), Friction Angle ϕ\' (°), Slope Height H (m), Slope Angle β (°) & Pore Pressure r_u',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="slp-c">Cohesion c\' (kPa)</label>
          <input class="tool-textarea" id="slp-c" type="number" step="any" value="15.0" placeholder="15.0 kPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="slp-phi">Friction ϕ\' (°)</label>
          <input class="tool-textarea" id="slp-phi" type="number" step="1" value="28.0" placeholder="28.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="slp-h">Slope Height H (m)</label>
          <input class="tool-textarea" id="slp-h" type="number" step="any" value="8.0" placeholder="8.0 m Embankment" />
        </div>
        <div class="control-group">
          <label class="control-label" for="slp-beta">Slope Angle β (°)</label>
          <input class="tool-textarea" id="slp-beta" type="number" step="1" value="30.0" placeholder="30.0° (1:1.73 Slope)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="slp-ru">Pore Water r_u</label>
          <input class="tool-textarea" id="slp-ru" type="number" step="0.05" value="0.15" placeholder="0.15 (Pore Pressure)" />
        </div>
      </div>
      <div id="slp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="slp-res-fs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">FS = 1.58 (STABLE ≥ 1.50)</span>
            <span class="stat-label">Bishop Factor of Safety Against Landslide Slip</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="slp-res-stat" style="color:var(--green-dark); font-weight:700;">SAFE: Long-term embankment slope is stable against rotational slip failure</span>
            <span class="stat-label">Geotechnical Slope Stability Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('slp-c'), phiEl = document.getElementById('slp-phi');
  const hEl = document.getElementById('slp-h'), bEl = document.getElementById('slp-beta'), ruEl = document.getElementById('slp-ru');
  const fsResEl = document.getElementById('slp-res-fs'), stResEl = document.getElementById('slp-res-stat');

  const gamma_soil = 19.0; // kN / m^3

  function update() {
    const c = parseFloat(cEl.value), phiDeg = parseFloat(phiEl.value);
    const H = parseFloat(hEl.value), betaDeg = parseFloat(bEl.value), ru = parseFloat(ruEl.value);

    if (isNaN(c) || isNaN(phiDeg) || isNaN(H) || isNaN(betaDeg) || isNaN(ru) || H <= 0 || betaDeg <= 0 || betaDeg >= 90) return;

    const phiRad = (phiDeg * Math.PI) / 180;
    const betaRad = (betaDeg * Math.PI) / 180;

    // Dimensionless stability number Taylor/Bishop correlation:
    // N_s = c / (gamma * H)
    const N_s = c / (gamma_soil * H);

    // Friction term component:
    const tanPhi = Math.tan(phiRad);
    const tanBeta = Math.tan(betaRad);

    // Bishop circular slip approximation:
    // FS approx = ( (c / (gamma * H * sin(beta)*cos(beta))) + (tan(phi)/tan(beta)) * (1 - ru / cos^2(beta)) )
    const termCohesion = c / (gamma_soil * H * Math.sin(betaRad) * Math.cos(betaRad));
    const termFriction = (tanPhi / tanBeta) * (1.0 - (ru / Math.pow(Math.cos(betaRad), 2)));
    const FS = termCohesion + Math.max(0, termFriction);

    let status = '';
    let color = '#22543d';

    if (FS >= 1.50) {
      status = 'STABLE (FS = ' + FS.toFixed(2) + ' ≥ 1.50: Meets highway embankment & civil engineering safety standard)';
      color = '#22543d';
    } else if (FS >= 1.00) {
      status = 'MARGINALLY STABLE (1.00 ≤ FS < 1.50: Risk of creep or rain-induced landslide triggering)';
      color = '#d97706';
    } else {
      status = 'UNSTABLE / ACTIVE FAILURE (FS < 1.00: Slope undergoes catastrophic rotational shear collapse!)';
      color = '#c53030';
    }

    fsResEl.textContent = 'FS = ' + FS.toFixed(2);
    fsResEl.style.color = color;
    stResEl.textContent = status + ' | Cohesion Contribution: +' + termCohesion.toFixed(2) + ', Friction: +' + termFriction.toFixed(2);
  }

  [cEl, phiEl, hEl, bEl, ruEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter effective soil cohesion $c\'$ in kPa.',
      'Enter effective soil internal friction angle $\phi\'$ in degrees.',
      'Enter total vertical slope height H in meters.',
      'Enter embankment slope incline angle $\beta$ in degrees.',
      'Enter pore water pressure ratio $r_u = u / (\gamma h)$ (0.0 for dry soil, 0.2 to 0.4 for saturated slopes).',
      'Inspect Bishop Factor of Safety (FS) against rotational circular slip landslide failure.'
    ],
    benefitTitle: 'Alan W. Bishop 1955 Inter-Slice Shear Method',
    benefitContent: 'Bishop\'s Simplified Method satisfies vertical force equilibrium across circular failure slices, improving on the Ordinary Method of Slices by accounting for inter-slice forces to deliver highly accurate Factors of Safety ($FS$) for dams, road cuts, and open-pit mine slopes.',
    faqs: [{ q: 'Why is pore water pressure (ru) the most common trigger of landslides?', a: 'Water fills pore voids without adding shear strength, exerting upward hydrostatic pressure that reduces effective stress ($\sigma\' = \sigma - u$), causing friction resistance to vanish.' }]
  },

  // 15. Westergaard Soil Stress Distribution Beneath Surface Load Calculator
  {
    slug: 'westergaard-elastic-stress-point-load-depth-calculator',
    name: 'Westergaard Layered Soil Stress Distribution (σ_z Beneath Load) Calculator',
    description: 'Calculate vertical subterranean stress increase (σ_z = (P / z²) · (1 / 2π) · [1 + 2·(r/z)²]^(-3/2)) in kPa beneath surface point loads in stratified layered soils.',
    category: 'Science',
    icon: 'text',
    keywords: ['westergaard stress distribution calculator', 'vertical soil stress sigma z formula point load online', 'westergaard vs boussinesq soil stress calculator', 'layered foundation settlement stress calculator online', 'geotechnical elastic stress distribution online'],
    order: 775,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Surface Point Load P (kN), Subsurface Depth z (m) & Horizontal Offset r (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wst-p">Point Load P (kN)</label>
          <input class="tool-textarea" id="wst-p" type="number" step="any" value="500.0" placeholder="500.0 kN (50 Tonnes)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wst-z">Depth z (m)</label>
          <input class="tool-textarea" id="wst-z" type="number" step="any" value="3.0" placeholder="3.0 m Depth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wst-r">Radial Offset r (m)</label>
          <input class="tool-textarea" id="wst-r" type="number" step="any" value="1.0" placeholder="1.0 m Offset" />
        </div>
      </div>
      <div id="wst-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wst-res-sig" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">σ_z = 21.6 kPa Stress</span>
            <span class="stat-label">Vertical Soil Stress Increase (Westergaard σ_z)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wst-res-cmp" style="font-weight:700;">Boussinesq: 22.8 kPa (Westergaard accounts for horizontal lateral reinforcement)</span>
            <span class="stat-label">Westergaard vs Boussinesq Homogeneous Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('wst-p'), zEl = document.getElementById('wst-z'), rEl = document.getElementById('wst-r');
  const sigResEl = document.getElementById('wst-res-sig'), cmpResEl = document.getElementById('wst-res-cmp');

  function update() {
    const P = parseFloat(pEl.value), z = parseFloat(zEl.value), r = parseFloat(rEl.value);
    if (isNaN(P) || isNaN(z) || isNaN(r) || P <= 0 || z <= 0 || r < 0) return;

    // Westergaard formula for layered soil with zero lateral strain:
    // sigma_z = (P / z^2) * (1 / (2*pi)) * ( 1 / [ 1 + 2*(r/z)^2 ]^(1.5) )  [kPa]
    const r_z_sq = Math.pow(r / z, 2);
    const wst_term = Math.pow(1.0 + (2.0 * r_z_sq), 1.5);
    const sigma_z_wst = (P / Math.pow(z, 2)) * (1.0 / (2.0 * Math.PI)) * (1.0 / wst_term);

    // Boussinesq formula for comparison (isotropic elastic half-space):
    // sigma_z = (3*P / (2*pi*z^2)) * ( 1 / [ 1 + (r/z)^2 ]^(2.5) )
    const bsq_term = Math.pow(1.0 + r_z_sq, 2.5);
    const sigma_z_bsq = ((3.0 * P) / (2.0 * Math.PI * Math.pow(z, 2))) * (1.0 / bsq_term);

    sigResEl.textContent = 'σ_z = ' + sigma_z_wst.toFixed(1) + ' kPa Vertical Stress';
    cmpResEl.textContent = 'Westergaard: ' + sigma_z_wst.toFixed(1) + ' kPa vs Boussinesq: ' + sigma_z_bsq.toFixed(1) + ' kPa @ z = ' + z + ' m, r = ' + r + ' m (P = ' + P + ' kN)';
  }

  [pEl, zEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter concentrated vertical surface column load P in kN.',
      'Enter subterranean soil stratum depth z in meters.',
      'Enter horizontal radial distance offset r from load centerline in meters ($r = 0$ directly under load).',
      'Inspect vertical compressive soil stress increase $\sigma_z$ in kPa computed via Westergaard and Boussinesq solutions.'
    ],
    benefitTitle: 'H.M. Westergaard 1938 Layered Soil Stress Distribution',
    benefitContent: 'While Boussinesq assumes an isotropic elastic half-space, Westergaard models stratified layered soils interspersed with rigid horizontal clay/silt sheets that resist lateral expansion ($\epsilon_x = \epsilon_y = 0$), providing more realistic settlement calculations for sedimentary soil deposits.',
    faqs: [{ q: 'Why is Westergaard stress lower than Boussinesq directly beneath the load (r=0)?', a: 'Directly under the load ($r=0$), Westergaard yields $\sigma_z = \frac{1}{2\pi} \frac{P}{z^2} \approx 0.318 \frac{P}{z^2}$, whereas Boussinesq yields $\frac{3}{2\pi} \frac{P}{z^2} \approx 0.477 \frac{P}{z^2}$ because horizontal reinforcement spreads stress wider.' }]
  },

  // --- Suite NNNNN: Cryogenics, Gas Liquefaction & Superconductivity (895 - 899) ---
  // 16. Joule-Thomson Coefficient & Cryogenic Gas Liquefaction Calculator
  {
    slug: 'joule-thomson-cooling-coefficient-liquefaction-calculator',
    name: 'Joule-Thomson Isenthalpic Throttling Coefficient (μ_JT) Calculator',
    description: 'Calculate cryogenic isenthalpic throttling expansion cooling temperature drop (ΔT = μ_JT · ΔP) from Joule-Thomson coefficient μ_JT (K/bar) and verify inversion temperature boundaries.',
    category: 'Science',
    icon: 'text',
    keywords: ['joule thomson coefficient calculator', 'cryogenic gas liquefaction hampson linde formula online', 'isenthalpic throttling temperature drop calculator', 'joule thomson inversion temperature calculator online', 'h2 he n2 cryogenic cooling calculator'],
    order: 776,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gas Selection (Nitrogen, Helium, Hydrogen, Methane, Air), Pressure Drop ΔP (bar) & Inlet Temp (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="jt-gas">Gas Type</label>
          <select class="tool-textarea" id="jt-gas">
            <option value="n2" selected>Nitrogen N₂ (μ_JT = +0.25 K/bar @ 20°C, Inversion: 621 K)</option>
            <option value="ch4">Methane CH₄ / LNG (μ_JT = +0.43 K/bar @ 20°C)</option>
            <option value="air">Air (μ_JT = +0.22 K/bar @ 20°C)</option>
            <option value="he">Helium He (μ_JT = -0.06 K/bar @ 20°C - Heats Up! Inversion: 45 K)</option>
            <option value="h2">Hydrogen H₂ (μ_JT = -0.03 K/bar @ 20°C - Inversion: 202 K)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="jt-dp">Pressure Drop ΔP (bar)</label>
          <input class="tool-textarea" id="jt-dp" type="number" step="any" value="150.0" placeholder="150.0 bar (200 -> 50 bar)" />
        </div>
      </div>
      <div id="jt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="jt-res-dt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ΔT = -37.5 °C Drop</span>
            <span class="stat-label">Joule-Thomson Throttling Temperature Change</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="jt-res-cool" style="color:var(--green-dark); font-weight:700;">COOLING REGIME (μ_JT > 0: Real Gas Expansion Cools Fluid via Van der Waals Work)</span>
            <span class="stat-label">Linde-Hampson Liquefaction Cooling Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gasEl = document.getElementById('jt-gas'), dpEl = document.getElementById('jt-dp');
  const dtResEl = document.getElementById('jt-res-dt'), cResEl = document.getElementById('jt-res-cool');

  const GASES = {
    'n2':  { mu_jt: +0.25, t_inv: 621, name: 'Nitrogen (N₂)' },
    'ch4': { mu_jt: +0.43, t_inv: 960, name: 'Methane (CH₄)' },
    'air': { mu_jt: +0.22, t_inv: 603, name: 'Compressed Air' },
    'he':  { mu_jt: -0.06, t_inv: 45,  name: 'Helium (He)' },
    'h2':  { mu_jt: -0.03, t_inv: 202, name: 'Hydrogen (H₂)' }
  };

  function update() {
    const g = GASES[gasEl.value];
    const dP = parseFloat(dpEl.value);

    if (isNaN(dP) || dP <= 0) return;

    // Delta_T = mu_JT * (-dP) where expansion is pressure drop
    const deltaT = -g.mu_jt * dP;

    let regime = '';
    let color = '#22543d';

    if (g.mu_jt > 0) {
      regime = 'COOLING REGIME (μ_JT = +' + g.mu_jt + ' K/bar): Throttling produces -' + Math.abs(deltaT).toFixed(1) + '°C cooling drop';
      color = '#22543d';
    } else {
      regime = 'HEATING REGIME (μ_JT = ' + g.mu_jt + ' K/bar): Gas HEATS UP by +' + Math.abs(deltaT).toFixed(1) + '°C upon expansion (Must pre-cool below ' + g.t_inv + ' K)';
      color = '#c53030';
    }

    dtResEl.textContent = 'ΔT = ' + (deltaT > 0 ? '+' : '') + deltaT.toFixed(1) + ' °C (' + (deltaT < 0 ? 'Cooling' : 'Heating') + ')';
    dtResEl.style.color = color;
    cResEl.textContent = regime + ' | Inversion Temp: ' + g.t_inv + ' K (' + (g.t_inv - 273.15).toFixed(0) + '°C)';
    cResEl.style.color = color;
  }

  gasEl.addEventListener('change', update);
  dpEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select cryogenic gas species (Nitrogen, Methane LNG, Air, Helium, Hydrogen).',
      'Enter expansion valve isenthalpic pressure drop $\Delta P$ in bar across porous plug / Joule-Thomson valve.',
      'Inspect Joule-Thomson temperature change $\Delta T$ in Celsius and verify whether gas is below its maximum inversion temperature ($T < T_{\text{inv}}$).'
    ],
    benefitTitle: 'James Prescott Joule & William Thomson 1852 Real Gas Expansion',
    benefitContent: 'When real gases expand through an adiabatic throttle valve without doing external mechanical work, molecules overcome intermolecular van der Waals attractive forces, converting internal kinetic energy into potential energy and producing rapid cryogenic cooling in Linde-Hampson liquefaction cycles.',
    faqs: [{ q: 'Why does Hydrogen and Helium heat up when throttled at room temperature?', a: 'Room temperature is far above the inversion temperature of Hydrogen (202 K) and Helium (45 K); intermolecular repulsive forces dominate, requiring pre-cooling with liquid nitrogen before JT liquefaction can occur.' }]
  },

  // 17. Cryogenic Liquid Boil-Off Rate & Dewar Tank Heat Leak Calculator
  {
    slug: 'cryogenic-nitrogen-boil-off-rate-dewar-heat-leak-calculator',
    name: 'Cryogenic Liquid (LN₂, LHe, LNG, LOX, LH₂) Boil-Off Rate Calculator',
    description: 'Calculate cryogenic liquid boil-off evaporation rate (ṁ = Q_leak / ΔH_vap) in kg/h and Liters/day from Dewar vacuum insulation thermal heat leak Q_leak in Watts.',
    category: 'Science',
    icon: 'text',
    keywords: ['cryogenic boil off rate calculator', 'liquid nitrogen boil off formula m dot equals q over delta h vap', 'liquid helium dewar heat leak calculator online', 'lng lox lh2 boil off gas calculator', 'cryogenic storage tank evaporation rate online'],
    order: 777,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cryogen Liquid (LN₂, LHe, LOX, LH₂, LNG) & Vacuum Insulation Heat Inleak Q_leak (Watts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bor-cryo">Cryogenic Liquid</label>
          <select class="tool-textarea" id="bor-cryo">
            <option value="ln2" selected>Liquid Nitrogen LN₂ (77 K / -196°C: ΔH_vap = 199 kJ/kg, ρ = 808 kg/m³)</option>
            <option value="lhe">Liquid Helium LHe (4.2 K / -269°C: ΔH_vap = 20.9 kJ/kg, ρ = 125 kg/m³)</option>
            <option value="lh2">Liquid Hydrogen LH₂ (20 K / -253°C: ΔH_vap = 446 kJ/kg, ρ = 71 kg/m³)</option>
            <option value="lox">Liquid Oxygen LOX (90 K / -183°C: ΔH_vap = 213 kJ/kg, ρ = 1141 kg/m³)</option>
            <option value="lng">Liquid Methane LNG (111 K / -162°C: ΔH_vap = 510 kJ/kg, ρ = 422 kg/m³)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bor-q">Heat Inleak Q (Watts)</label>
          <input class="tool-textarea" id="bor-q" type="number" step="any" value="5.0" placeholder="5.0 W (Dewar Neck Leak)" />
        </div>
      </div>
      <div id="bor-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bor-res-rate" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.68 Liters / Day Lost</span>
            <span class="stat-label">Daily Liquid Boil-Off Volume Loss Rate</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bor-res-mass" style="font-weight:700;">Mass Loss: 0.090 kg/h (2.17 kg/day) | Heat of Vaporization: 199 kJ/kg</span>
            <span class="stat-label">Mass Boil-Off Rate (ṁ = Q_leak / ΔH_vap)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('bor-cryo'), qEl = document.getElementById('bor-q');
  const rResEl = document.getElementById('bor-res-rate'), mResEl = document.getElementById('bor-res-mass');

  const CRYOS = {
    'ln2': { dh_vap: 199.0, rho: 808.0, name: 'Liquid Nitrogen LN₂' },
    'lhe': { dh_vap: 20.9,  rho: 125.0, name: 'Liquid Helium LHe' },
    'lh2': { dh_vap: 446.0, rho: 71.0,  name: 'Liquid Hydrogen LH₂' },
    'lox': { dh_vap: 213.0, rho: 1141.0,name: 'Liquid Oxygen LOX' },
    'lng': { dh_vap: 510.0, rho: 422.0, name: 'Liquid Methane LNG' }
  };

  function update() {
    const c = CRYOS[cEl.value];
    const Q_watts = parseFloat(qEl.value);

    if (isNaN(Q_watts) || Q_watts <= 0) return;

    // Heat of vaporization in Joules / kg: dh_vap * 1000
    const dh_J_kg = c.dh_vap * 1000;

    // Boil-off mass rate m_dot = Q / dh_vap  [kg / second]
    const m_dot_kg_s = Q_watts / dh_J_kg;
    const m_dot_kg_h = m_dot_kg_s * 3600;
    const m_dot_kg_day = m_dot_kg_h * 24;

    // Volumetric loss rate V_dot = m_dot / rho  [m^3 / s -> Liters / day]
    const v_dot_liters_day = (m_dot_kg_day / c.rho) * 1000;

    rResEl.textContent = v_dot_liters_day.toFixed(2) + ' Liters / Day Boil-Off';
    mResEl.textContent = 'Mass Loss: ' + m_dot_kg_h.toFixed(3) + ' kg/h (' + m_dot_kg_day.toFixed(2) + ' kg/d @ Q = ' + Q_watts + ' W Inleak into ' + c.name + ')';
  }

  cEl.addEventListener('change', update);
  qEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select cryogenic storage liquid (Liquid Nitrogen, Liquid Helium, Liquid Hydrogen, Liquid Oxygen, LNG).',
      'Enter total parasitic thermal heat leak into the vacuum Dewar / storage tank in Watts.',
      'Inspect daily liquid cryogen loss rate in Liters/day and mass boil-off rate in kg/hour.'
    ],
    benefitTitle: 'Latent Heat of Vaporization Barrier',
    benefitContent: 'Liquid Helium has an extremely small latent heat of vaporization ($\Delta H_{\text{vap}} = 20.9\text{ kJ/kg}$); a tiny heat leak of just 1.0 Watt evaporates over 4.1 Liters of liquid helium per day, requiring multi-layer vacuum insulation (MLI) and liquid nitrogen radiation thermal shields in MRI superconducting magnets.',
    faqs: [{ q: 'Why is Liquid Hydrogen boil-off difficult to eliminate completely?', a: 'Hydrogen has small molecular size causing high vapor pressure and undergoes slow exothermic ortho-to-para spin isomer conversion ($527\text{ kJ/kg}$) that self-boils stored liquid.' }]
  },

  // 18. BCS Superconducting Energy Gap (Δ₀) & Critical Magnetic Field Calculator
  {
    slug: 'bcs-theory-superconducting-energy-gap-critical-field-calculator',
    name: 'BCS Superconducting Energy Gap (Δ₀ = 1.764·k_B·T_c) & Critical Field Calculator',
    description: 'Calculate Bardeen-Cooper-Schrieffer (BCS) superconducting energy gap (Δ₀ = 1.764 · k_B · T_c) in meV and thermodynamic critical magnetic field (H_c(T) = H_c(0) · [1 - (T/T_c)²]) in Tesla.',
    category: 'Science',
    icon: 'text',
    keywords: ['bcs theory calculator', 'superconducting energy gap formula delta equals 1.764 kb tc', 'critical magnetic field temperature dependence calculator online', 'cooper pair binding energy superconductor calculator', 'nb3sn nbti ybco critical temperature online'],
    order: 778,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Superconductor Material (NbTi, Nb₃Sn, Pb, YBCO, MgB₂), Critical Temp T_c (K) & Operating Temp T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bcs-mat">Superconductor</label>
          <select class="tool-textarea" id="bcs-mat">
            <option value="nbti" selected>NbTi (MRI Magnets: T_c = 9.2 K, H_c2 = 14.5 T)</option>
            <option value="nb3sn">Nb₃Sn (CERN LHC / ITER: T_c = 18.3 K, H_c2 = 28.0 T)</option>
            <option value="pb">Lead Pb (Type I: T_c = 7.2 K, H_c0 = 0.08 T)</option>
            <option value="mgb2">MgB₂ (T_c = 39.0 K, H_c2 = 30.0 T)</option>
            <option value="ybco">YBCO High-Tc (T_c = 93.0 K, H_c2 = 120.0 T)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bcs-t">Operating Temp T (K)</label>
          <input class="tool-textarea" id="bcs-t" type="number" step="0.5" value="4.2" placeholder="4.2 K (Liquid Helium)" />
        </div>
      </div>
      <div id="bcs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bcs-res-gap" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2Δ₀ = 2.80 meV Cooper Gap</span>
            <span class="stat-label">BCS Superconducting Energy Gap (2Δ₀ = 3.528·k_B·T_c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bcs-res-hc" style="color:var(--green-dark); font-weight:700;">Critical Field H_c(4.2K) = 11.48 Tesla (79.2% of Zero-Kelvin Limit)</span>
            <span class="stat-label">Upper Critical Magnetic Field at Operating Temperature</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('bcs-mat'), tEl = document.getElementById('bcs-t');
  const gResEl = document.getElementById('bcs-res-gap'), hcResEl = document.getElementById('bcs-res-hc');

  const kB_ev = 8.617333262e-5; // eV / K

  const SUPERS = {
    'nbti':  { tc: 9.2,  hc0: 14.5, name: 'Niobium-Titanium (NbTi)' },
    'nb3sn': { tc: 18.3, hc0: 28.0, name: 'Niobium-Tin (Nb₃Sn)' },
    'pb':    { tc: 7.2,  hc0: 0.08, name: 'Lead (Pb Type I)' },
    'mgb2':  { tc: 39.0, hc0: 30.0, name: 'Magnesium Diboride (MgB₂)' },
    'ybco':  { tc: 93.0, hc0: 120.0,name: 'YBCO High-Temperature' }
  };

  function update() {
    const s = SUPERS[matEl.value];
    const T = parseFloat(tEl.value);

    if (isNaN(T) || T < 0) return;

    // BCS Zero-temperature energy gap: Delta_0 = 1.764 * kB * Tc  [eV -> meV]
    const delta0_ev = 1.764 * kB_ev * s.tc;
    const delta0_mev = delta0_ev * 1000;
    const fullGapMev = 2 * delta0_mev; // 2*Delta is the photon Cooper pair breakup energy

    if (T >= s.tc) {
      gResEl.textContent = 'NORMAL STATE (T ≥ T_c = ' + s.tc + ' K)';
      hcResEl.textContent = 'Superconductivity Destroyed by Thermal Energy (Zero Critical Field)';
      gResEl.style.color = '#c53030';
      return;
    }
    gResEl.style.color = '#22543d';

    // Critical magnetic field: H_c(T) = H_c(0) * [ 1 - (T / T_c)^2 ]  [Tesla]
    const Hc_T = s.hc0 * (1.0 - Math.pow(T / s.tc, 2));
    const fieldPct = (Hc_T / s.hc0) * 100;

    gResEl.textContent = '2Δ₀ = ' + fullGapMev.toFixed(2) + ' meV (Single Gap Δ₀ = ' + delta0_mev.toFixed(2) + ' meV)';
    hcResEl.textContent = 'H_c(' + T + ' K) = ' + Hc_T.toFixed(2) + ' Tesla (' + fieldPct.toFixed(1) + '% of H_c(0) = ' + s.hc0 + ' T in ' + s.name + ')';
  }

  matEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select technical superconductor material (NbTi, Nb₃Sn, Lead, MgB₂, YBCO).',
      'Enter cryostat operating temperature in Kelvin (e.g. 4.2 K for liquid helium, 77 K for liquid nitrogen).',
      'Inspect BCS Cooper pair binding energy gap $2\Delta_0$ in meV and upper critical magnetic field $H_c(T)$ in Tesla.'
    ],
    benefitTitle: 'John Bardeen, Leon Cooper & Robert Schrieffer 1957 BCS Theory',
    benefitContent: 'Below the critical temperature ($T_c$), electron-phonon lattice interactions bind conduction electrons into zero-spin Cooper pairs that condense into a macroscopic quantum ground state protected by an energy gap ($2\Delta_0 = 3.53 k_B T_c$), permitting infinite DC electrical current with zero electrical resistance.',
    faqs: [{ q: 'Why does magnetic field destroy superconductivity?', a: 'Magnetic fields exert Lorentz forces that penetrate the superconducting wavefunction, breaking Cooper pairs when the magnetic energy density ($\frac{1}{2}\mu_0 H^2$) exceeds the superconducting condensation energy.' }]
  },

  // 19. London Penetration Depth & Ginzburg-Landau Coherence Length Calculator
  {
    slug: 'london-penetration-depth-coherence-length-calculator',
    name: 'London Penetration Depth (λ_L) & Ginzburg-Landau Parameter (κ) Calculator',
    description: 'Calculate superconductor magnetic screening London penetration depth (λ_L = √(m / (μ₀·n_s·e²))) in nm, coherence length ξ, and Ginzburg-Landau parameter (κ = λ / ξ) to classify Type I vs Type II superconductors.',
    category: 'Science',
    icon: 'text',
    keywords: ['london penetration depth calculator', 'ginzburg landau parameter kappa formula lambda over xi', 'type 1 vs type 2 superconductor calculator online', 'superconducting electron density ns penetration depth calculator', 'meissner effect magnetic screening depth online'],
    order: 779,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Superconducting Electron Density n_s (10²⁸ m⁻³), Effective Mass m*/m₀ & Coherence Length ξ (nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lon-ns">Density n_s (10²⁸ m⁻³)</label>
          <input class="tool-textarea" id="lon-ns" type="number" step="0.5" value="2.0" placeholder="2.0 (10²⁸ Cooper Pairs/m³)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lon-xi">Coherence Length ξ (nm)</label>
          <input class="tool-textarea" id="lon-xi" type="number" step="any" value="5.0" placeholder="5.0 nm (Short Coherence)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lon-mass">Eff Mass (m*/m₀)</label>
          <input class="tool-textarea" id="lon-mass" type="number" step="0.1" value="1.0" placeholder="1.0" />
        </div>
      </div>
      <div id="lon-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lon-res-lam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">λ_L = 37.6 nm Screen Depth</span>
            <span class="stat-label">London Magnetic Penetration Depth (λ_L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lon-res-kappa" style="color:var(--green-dark); font-weight:700;">TYPE II SUPERCONDUCTOR (κ = 7.51 > 1/√2 = 0.707: Abrikosov Vortex Flux Lattice)</span>
            <span class="stat-label">Ginzburg-Landau Parameter (κ = λ / ξ) & Superconductor Type</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nsEl = document.getElementById('lon-ns'), xiEl = document.getElementById('lon-xi'), mEl = document.getElementById('lon-mass');
  const lResEl = document.getElementById('lon-res-lam'), kpResEl = document.getElementById('lon-res-kappa');

  const mu0 = 4.0 * Math.PI * 1e-7;
  const e_charge = 1.602176634e-19;
  const m_e = 9.1093837e-31;

  function update() {
    const ns_factor = parseFloat(nsEl.value), xiNm = parseFloat(xiEl.value), massRatio = parseFloat(mEl.value);
    if (isNaN(ns_factor) || isNaN(xiNm) || isNaN(massRatio) || ns_factor <= 0 || xiNm <= 0 || massRatio <= 0) return;

    const ns = ns_factor * 1e28; // Cooper pair super-electron density
    const m_eff = massRatio * m_e;

    // London penetration depth: lambda_L = sqrt( m / (mu0 * ns * e^2) )  [meters]
    const lambda_m = Math.sqrt(m_eff / (mu0 * ns * Math.pow(e_charge, 2)));
    const lambda_nm = lambda_m * 1e9;

    // Ginzburg-Landau parameter kappa = lambda / xi
    const kappa = lambda_nm / xiNm;

    let scType = '';
    let color = '#22543d';

    if (kappa < 0.70710678) {
      scType = 'TYPE I SUPERCONDUCTOR (κ = ' + kappa.toFixed(3) + ' < 1/√2: Complete Meissner Expulsion, Positive Surface Energy)';
      color = '#2563eb';
    } else {
      scType = 'TYPE II SUPERCONDUCTOR (κ = ' + kappa.toFixed(2) + ' > 1/√2: High-Field Abrikosov Vortex Mixed State)';
      color = '#22543d';
    }

    lResEl.textContent = 'λ_L = ' + lambda_nm.toFixed(1) + ' nm Meissner Screening Depth';
    kpResEl.textContent = scType + ' | ξ = ' + xiNm + ' nm (London λ_L = ' + lambda_nm.toFixed(1) + ' nm)';
    kpResEl.style.color = color;
  }

  [nsEl, xiEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter superconducting electron charge carrier density $n_s$ in units of $10^{28}\text{ m}^{-3}$.',
      'Enter Ginzburg-Landau Cooper pair spatial coherence length ξ in nanometers.',
      'Enter effective carrier mass ratio $m^*/m_0$.',
      'Inspect London magnetic screening penetration depth $\\lambda_L$ in nm, Ginzburg-Landau parameter $\\kappa = \\lambda/\\xi$, and classify whether the material is Type I ($\\kappa < 1/\\sqrt{2}$) or high-field Type II ($\\kappa > 1/\\sqrt{2}$).'
    ],
    benefitTitle: 'Fritz & Heinz London 1935 Meissner Screening Electrodynamics',
    benefitContent: 'London equations show that external magnetic fields decay exponentially inside a superconductor ($B(x) = B_0 e^{-x/\lambda_L}$); Type II superconductors ($\kappa > 0.707$) have negative surface energy that allows magnetic flux lines to penetrate in quantized Abrikosov flux vortices ($\Phi_0 = h/2e$), enabling ultra-high magnetic fields in MRI coils.',
    faqs: [{ q: 'What is the critical threshold separating Type I from Type II superconductors?', a: 'The exact theoretical boundary is $\kappa = \frac{1}{\sqrt{2}} \approx 0.7071$; below this threshold surface energy is positive (Type I), while above it surface energy is negative (Type II).' }]
  },

  // 20. Clausius-Clapeyron Vapor Pressure vs Cryogenic Boiling Point Calculator
  {
    slug: 'clausius-clapeyron-cryogen-vapor-pressure-boiling-calculator',
    name: 'Clausius-Clapeyron Cryogen Vapor Pressure & Boiling Point (P vs T) Calculator',
    description: 'Calculate cryogenic liquid boiling temperature shift under vacuum pumping or pressurization (ln(P₂ / P₁) = -ΔH_vap / R · (1/T₂ - 1/T₁)) in Kelvin and Celsius.',
    category: 'Science',
    icon: 'text',
    keywords: ['clausius clapeyron calculator', 'vapor pressure boiling point formula ln p2 over p1 online', 'vacuum pumping liquid nitrogen boiling temp calculator', 'cryogenic temperature pressure clausius clapeyron calculator', 'latent heat vaporization vapor pressure online'],
    order: 780,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Sub-Atmospheric Pressure P₂ (mbar / bar) & Cryogenic Liquid',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="clp-cryo">Liquid Cryogen</label>
          <select class="tool-textarea" id="clp-cryo">
            <option value="ln2" selected>Liquid Nitrogen LN₂ (T_boil = 77.36 K @ 1 atm, ΔH = 5.57 kJ/mol)</option>
            <option value="lhe">Liquid Helium LHe (T_boil = 4.22 K @ 1 atm, ΔH = 0.083 kJ/mol)</option>
            <option value="lh2">Liquid Hydrogen LH₂ (T_boil = 20.28 K @ 1 atm, ΔH = 0.90 kJ/mol)</option>
            <option value="lox">Liquid Oxygen LOX (T_boil = 90.19 K @ 1 atm, ΔH = 6.82 kJ/mol)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="clp-p2">Target Pressure P₂ (mbar)</label>
          <input class="tool-textarea" id="clp-p2" type="number" step="10" value="133.0" placeholder="133.0 mbar (100 Torr Vacuum)" />
        </div>
      </div>
      <div id="clp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="clp-res-t2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T₂ = 65.5 K (-207.7 °C)</span>
            <span class="stat-label">Reduced Cryogenic Boiling Temperature (T₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="clp-res-drop" style="font-weight:700;">-11.9 K Vacuum Temperature Drop (Pumping from 1,013 mbar down to 133 mbar)</span>
            <span class="stat-label">Evaporative Sub-Cooling Temperature Differential</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cryoEl = document.getElementById('clp-cryo'), p2El = document.getElementById('clp-p2');
  const t2ResEl = document.getElementById('clp-res-t2'), dpResEl = document.getElementById('clp-res-drop');

  const R = 8.314462; // J / mol * K

  const CRYOS = {
    'ln2': { t1_k: 77.36, dh_j_mol: 5570.0, name: 'Liquid Nitrogen (LN₂)' },
    'lhe': { t1_k: 4.22,  dh_j_mol: 83.0,   name: 'Liquid Helium (LHe)' },
    'lh2': { t1_k: 20.28, dh_j_mol: 900.0,  name: 'Liquid Hydrogen (LH₂)' },
    'lox': { t1_k: 90.19, dh_j_mol: 6820.0, name: 'Liquid Oxygen (LOX)' }
  };

  function update() {
    const c = CRYOS[cryoEl.value];
    const P2_mbar = parseFloat(p2El.value);

    if (isNaN(P2_mbar) || P2_mbar <= 0) return;

    const P1_mbar = 1013.25; // 1 atm reference

    // Clausius-Clapeyron equation:
    // ln(P2 / P1) = -(deltaH / R) * ( 1/T2 - 1/T1 )
    // 1/T2 = 1/T1 - (R / deltaH) * ln(P2 / P1)
    const invT2 = (1.0 / c.t1_k) - ((R / c.dh_j_mol) * Math.log(P2_mbar / P1_mbar));
    const T2_k = 1.0 / invT2;
    const T2_c = T2_k - 273.15;

    const deltaT = T2_k - c.t1_k;

    t2ResEl.textContent = 'T₂ = ' + T2_k.toFixed(2) + ' K (' + T2_c.toFixed(1) + ' °C Boiling Point)';
    dpResEl.textContent = (deltaT >= 0 ? '+' : '') + deltaT.toFixed(2) + ' K Temperature Shift (' + c.name + ' @ ' + P2_mbar + ' mbar vs 1 atm ' + c.t1_k.toFixed(1) + ' K)';
  }

  cryoEl.addEventListener('change', update);
  p2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select cryogenic liquid (Liquid Nitrogen, Liquid Helium, Liquid Hydrogen, Liquid Oxygen).',
      'Enter vacuum pump head pressure $P_2$ in mbar / hPa (e.g. 133 mbar = 100 Torr).',
      'Inspect reduced evaporative boiling temperature $T_2$ in Kelvin and Celsius.'
    ],
    benefitTitle: 'Vacuum Evaporative Sub-Cooling',
    benefitContent: 'Pumping on a cryogen bath lowers the vapor pressure, forcing the liquid to boil evaporatively and cool itself; vacuum pumping on Liquid Helium lowers its temperature from 4.2 K past the Lambda Point (2.17 K) to create Superfluid Helium II.',
    faqs: [{ q: 'What is the triple point limit of Liquid Nitrogen?', a: 'Liquid nitrogen freezes into solid nitrogen ice at its triple point ($T = 63.15\text{ K}, P = 125\text{ mbar}$), which sets the absolute lower temperature limit achievable by vacuum pumping.' }]
  },

  // --- Suite OOOOO: Industrial Process Control, Loop Tuning & Quality Engineering (900 - 905) ---
  // 21. Cohen-Coon Reaction Curve Open-Loop PID Tuning Calculator
  {
    slug: 'cohen-coon-pid-controller-open-loop-tuning-calculator',
    name: 'Cohen-Coon Reaction Curve Open-Loop PID Controller Tuning Calculator',
    description: 'Calculate industrial process control PID gain parameters (K_p, T_i, T_d) from open-loop step test First-Order Plus Dead-Time (FOPDT: Process Gain K, Time Constant τ, Dead Time θ).',
    category: 'Science',
    icon: 'text',
    keywords: ['cohen coon pid tuning calculator', 'open loop process reaction curve pid formula fopdt online', 'ziegler nichols vs cohen coon tuning calculator', 'pid controller kp ti td cohen coon calculator', 'industrial process automation loop tuning online'],
    order: 781,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Process Gain K (% / %), Time Constant τ (seconds) & Dead Time Delay θ (seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cc-k">Process Gain K</label>
          <input class="tool-textarea" id="cc-k" type="number" step="any" value="1.50" placeholder="1.50 (% PV / % CO)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cc-tau">Time Constant τ (s)</label>
          <input class="tool-textarea" id="cc-tau" type="number" step="any" value="40.0" placeholder="40.0 s (63.2% Response)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cc-theta">Dead Time θ (s)</label>
          <input class="tool-textarea" id="cc-theta" type="number" step="any" value="10.0" placeholder="10.0 s Transport Lag" />
        </div>
      </div>
      <div id="cc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cc-res-pid" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">K_p = 3.60 | T_i = 21.7 s | T_d = 3.48 s</span>
            <span class="stat-label">Cohen-Coon Ideal PID Controller Gains</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cc-res-ratio" style="font-weight:700;">Controllability θ/τ = 0.250 (Favorable Control: PI Mode K_p = 2.45, T_i = 25.4 s)</span>
            <span class="stat-label">Dead-Time-to-Time-Constant Ratio (θ / τ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('cc-k'), tauEl = document.getElementById('cc-tau'), thEl = document.getElementById('cc-theta');
  const pidResEl = document.getElementById('cc-res-pid'), rtResEl = document.getElementById('cc-res-ratio');

  function update() {
    const K = parseFloat(kEl.value), tau = parseFloat(tauEl.value), theta = parseFloat(thEl.value);
    if (isNaN(K) || isNaN(tau) || isNaN(theta) || K <= 0 || tau <= 0 || theta <= 0) return;

    const R = theta / tau; // Dead time to time constant ratio

    // Cohen-Coon PID tuning formulas:
    // K_p = (1 / (K * R)) * ( 4/3 + R/4 )
    const Kp_pid = (1.0 / (K * R)) * ((4.0 / 3.0) + (R / 4.0));
    // T_i = theta * ( (32 + 6*R) / (13 + 8*R) )  [seconds]
    const Ti_pid = theta * ((32.0 + (6.0 * R)) / (13.0 + (8.0 * R)));
    // T_d = theta * ( 4 / (11 + 2*R) )  [seconds]
    const Td_pid = theta * (4.0 / (11.0 + (2.0 * R)));

    // PI Controller comparison:
    const Kp_pi = (1.0 / (K * R)) * (0.90 + (R / 12.0));
    const Ti_pi = theta * ((30.0 + (3.0 * R)) / (9.0 + (20.0 * R)));

    pidResEl.textContent = 'K_p = ' + Kp_pid.toFixed(2) + ' | T_i = ' + Ti_pid.toFixed(1) + ' s | T_d = ' + Td_pid.toFixed(2) + ' s';
    rtResEl.textContent = 'Lag Ratio θ/τ = ' + R.toFixed(3) + ' (PI Alternative: K_p = ' + Kp_pi.toFixed(2) + ', T_i = ' + Ti_pi.toFixed(1) + ' s)';
  }

  [kEl, tauEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter open-loop step test steady-state process gain K ($\Delta\text{PV} / \Delta\text{CO}$).',
      'Enter process dominant lag time constant $\tau$ in seconds (time to reach 63.2% of steady-state).',
      'Enter pure transportation dead-time delay $\theta$ in seconds.',
      'Inspect tuned Cohen-Coon proportional gain $K_p$, integral reset time $T_i$ (s), and derivative rate time $T_d$ (s).'
    ],
    benefitTitle: 'G.H. Cohen & G.A. Coon 1953 Dead-Time Tolerant PID Tuning',
    benefitContent: 'Unlike classic Ziegler-Nichols tuning which becomes wildly oscillatory when dead time exceeds 20% of the time constant ($\theta/\tau > 0.2$), Cohen-Coon incorporates the dead-time ratio directly into the gain equations to deliver quarter-amplitude decay response in slow thermal and chemical processes.',
    faqs: [{ q: 'What is the dead time ratio (θ/τ) rule of thumb?', a: 'Processes with $\theta/\tau < 0.3$ are easy to control with PID; processes with $\theta/\tau > 1.0$ are dead-time dominated and require Smith Predictors or Model Predictive Control (MPC).' }]
  },

  // 22. Six Sigma Process Capability Index (Cp & Cpk) Calculator
  {
    slug: 'six-sigma-process-capability-cpk-dpmo-calculator',
    name: 'Six Sigma Process Capability (C_p, C_pk & DPMO) Quality Calculator',
    description: 'Calculate manufacturing quality Process Capability C_p = (USL - LSL) / (6·σ), C_pk = min((USL - μ)/(3·σ), (μ - LSL)/(3·σ)), defect rate in Parts Per Million (DPMO), and Sigma Level.',
    category: 'Science',
    icon: 'text',
    keywords: ['cpk calculator', 'six sigma process capability formula cp cpk online', 'dpmo defects per million opportunities calculator', 'manufacturing quality control cpk calculator online', 'process sigma level normal distribution cpk online'],
    order: 782,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Upper Spec USL, Lower Spec LSL, Process Mean μ & Standard Deviation σ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cpk-usl">Upper USL</label>
          <input class="tool-textarea" id="cpk-usl" type="number" step="any" value="105.0" placeholder="105.0 (Upper Limit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpk-lsl">Lower LSL</label>
          <input class="tool-textarea" id="cpk-lsl" type="number" step="any" value="95.0" placeholder="95.0 (Lower Limit)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpk-mu">Mean μ</label>
          <input class="tool-textarea" id="cpk-mu" type="number" step="any" value="100.5" placeholder="100.5 (Slight Offset)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpk-sig">Std Dev σ</label>
          <input class="tool-textarea" id="cpk-sig" type="number" step="any" value="1.00" placeholder="1.00" />
        </div>
      </div>
      <div id="cpk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cpk-res-cpk" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">C_pk = 1.50 | C_p = 1.67</span>
            <span class="stat-label">Process Capability Indices (C_pk & C_p)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cpk-res-dpmo" style="color:var(--green-dark); font-weight:700;">DPMO = 3.4 PPM (4.50 Sigma Quality - World Class Manufacturing)</span>
            <span class="stat-label">Expected Defect Rate (DPMO) & Six Sigma Benchmark</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const uslEl = document.getElementById('cpk-usl'), lslEl = document.getElementById('cpk-lsl');
  const muEl = document.getElementById('cpk-mu'), sigEl = document.getElementById('cpk-sig');
  const cpkResEl = document.getElementById('cpk-res-cpk'), dpResEl = document.getElementById('cpk-res-dpmo');

  function update() {
    const USL = parseFloat(uslEl.value), LSL = parseFloat(lslEl.value);
    const mu = parseFloat(muEl.value), sigma = parseFloat(sigEl.value);

    if (isNaN(USL) || isNaN(LSL) || isNaN(mu) || isNaN(sigma) || USL <= LSL || sigma <= 0) return;

    // Potential process capability Cp = (USL - LSL) / (6 * sigma)
    const Cp = (USL - LSL) / (6.0 * sigma);

    // Actual process capability Cpk = min( (USL - mu)/(3*sigma), (mu - LSL)/(3*sigma) )
    const Cpu = (USL - mu) / (3.0 * sigma);
    const Cpl = (mu - LSL) / (3.0 * sigma);
    const Cpk = Math.min(Cpu, Cpl);

    // Sigma level approx = 3 * Cpk
    const sigmaLevel = 3.0 * Cpk;

    // DPMO approximation:
    let dpmo = 0;
    if (Cpk >= 2.0) dpmo = 0.002;
    else if (Cpk >= 1.67) dpmo = 0.57;
    else if (Cpk >= 1.50) dpmo = 3.4;
    else if (Cpk >= 1.33) dpmo = 63.0;
    else if (Cpk >= 1.00) dpmo = 2700.0;
    else dpmo = 66807.0;

    let rating = '';
    let color = '#22543d';

    if (Cpk >= 1.67) {
      rating = 'EXCELLENT (C_pk ≥ 1.67: Six Sigma Benchmark)';
      color = '#22543d';
    } else if (Cpk >= 1.33) {
      rating = 'CAPABLE (C_pk ≥ 1.33: Standard Automotive/Aerospace Requirement)';
      color = '#22543d';
    } else if (Cpk >= 1.00) {
      rating = 'MARGINAL (1.00 ≤ C_pk < 1.33: Process strictly on threshold, requires tight monitoring)';
      color = '#d97706';
    } else {
      rating = 'NOT CAPABLE (C_pk < 1.00: Generates active out-of-spec scrap defects)';
      color = '#c53030';
    }

    cpkResEl.textContent = 'C_pk = ' + Cpk.toFixed(2) + ' | C_p = ' + Cp.toFixed(2);
    dpResEl.textContent = 'DPMO ≈ ' + (dpmo < 1.0 ? dpmo : Math.round(dpmo).toLocaleString()) + ' PPM (' + sigmaLevel.toFixed(2) + 'σ | ' + rating + ')';
    dpResEl.style.color = color;
  }

  [uslEl, lslEl, muEl, sigEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Upper Specification Limit (USL) tolerance.',
      'Enter Lower Specification Limit (LSL) tolerance.',
      'Enter actual manufacturing sample batch mean $\mu$.',
      'Enter process sample standard deviation $\sigma$.',
      'Inspect potential capability $C_p$, actual centered capability $C_{pk}$, equivalent Six Sigma level, and Defects Per Million Opportunities (DPMO).'
    ],
    benefitTitle: 'Motorola Six Sigma Statistical Process Control',
    benefitContent: '$C_p$ measures process spread relative to tolerance width, while $C_{pk}$ accounts for mean centering offset; automotive OEM standards (AIAG PPAP) strictly mandate $C_{pk} \ge 1.33$ ($<63\text{ DPMO}$) to certify production tooling.',
    faqs: [{ q: 'What is the difference between Cp and Cpk?', a: '$C_p$ assumes the process is centered on target; if the mean shifts away from center, $C_{pk}$ drops to reflect the higher defect risk on the closer spec boundary.' }]
  },

  // 23. Shewhart Statistical Process Control (X-bar and R Chart) Calculator
  {
    slug: 'shewhart-statistical-process-control-xbar-r-chart-calculator',
    name: 'Shewhart Statistical Process Control (X̄ and R Chart Limits) Calculator',
    description: 'Calculate ISO/ASTM Shewhart SPC control limits (UCL_X̄ = X̄̄ + A₂·R̄, LCL_X̄ = X̄̄ - A₂·R̄, UCL_R = D₄·R̄, LCL_R = D₃·R̄) for manufacturing quality monitoring.',
    category: 'Science',
    icon: 'text',
    keywords: ['spc xbar r chart calculator', 'shewhart statistical process control limits formula ucl lcl online', 'control chart constants a2 d3 d4 calculator', 'manufacturing statistical quality control spc online', 'subgroup range x bar r chart limits calculator'],
    order: 783,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Grand Mean X̄̄, Average Range R̄ & Subgroup Sample Size n (2 to 10)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="spc-xbar">Grand Mean X̄̄</label>
          <input class="tool-textarea" id="spc-xbar" type="number" step="any" value="50.00" placeholder="50.00 mm (Mean)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spc-rbar">Avg Range R̄</label>
          <input class="tool-textarea" id="spc-rbar" type="number" step="any" value="2.40" placeholder="2.40 mm (Range)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spc-n">Subgroup Size n</label>
          <select class="tool-textarea" id="spc-n">
            <option value="5" selected>n = 5 (A₂ = 0.577, D₄ = 2.114, D₃ = 0)</option>
            <option value="4">n = 4 (A₂ = 0.729, D₄ = 2.282, D₃ = 0)</option>
            <option value="3">n = 3 (A₂ = 1.023, D₄ = 2.574, D₃ = 0)</option>
            <option value="6">n = 6 (A₂ = 0.483, D₄ = 2.004, D₃ = 0)</option>
          </select>
        </div>
      </div>
      <div id="spc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="spc-res-xlim" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">X̄ Limits: 48.62 to 51.38 mm</span>
            <span class="stat-label">X̄ Control Limits (UCL_X̄ = 51.38, LCL_X̄ = 48.62)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="spc-res-rlim" style="font-weight:700;">Range Limits: LCL_R = 0.00 to UCL_R = 5.07 mm (Estimated σ = 1.03 mm)</span>
            <span class="stat-label">R Chart Control Limits (UCL_R = D₄·R̄) & Process Standard Deviation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xbEl = document.getElementById('spc-xbar'), rbEl = document.getElementById('spc-rbar'), nEl = document.getElementById('spc-n');
  const xResEl = document.getElementById('spc-res-xlim'), rResEl = document.getElementById('spc-res-rlim');

  const CONSTS = {
    '3': { A2: 1.023, D3: 0.0,   D4: 2.574, d2: 1.693 },
    '4': { A2: 0.729, D3: 0.0,   D4: 2.282, d2: 2.059 },
    '5': { A2: 0.577, D3: 0.0,   D4: 2.114, d2: 2.326 },
    '6': { A2: 0.483, D3: 0.0,   D4: 2.004, d2: 2.534 }
  };

  function update() {
    const c = CONSTS[nEl.value];
    const Xbarbar = parseFloat(xbEl.value), Rbar = parseFloat(rbEl.value);

    if (isNaN(Xbarbar) || isNaN(Rbar) || Rbar < 0) return;

    // X-bar chart limits: UCL = Xbarbar + A2 * Rbar, LCL = Xbarbar - A2 * Rbar
    const UCL_x = Xbarbar + (c.A2 * Rbar);
    const LCL_x = Xbarbar - (c.A2 * Rbar);

    // R chart limits: UCL = D4 * Rbar, LCL = D3 * Rbar
    const UCL_r = c.D4 * Rbar;
    const LCL_r = c.D3 * Rbar;

    // Estimated process standard deviation sigma = Rbar / d2
    const sigma_est = Rbar / c.d2;

    xResEl.textContent = 'X̄ Limits: [' + LCL_x.toFixed(2) + ' to ' + UCL_x.toFixed(2) + ']';
    rResEl.textContent = 'Range R Limits: [' + LCL_r.toFixed(2) + ' to ' + UCL_r.toFixed(2) + '] | Process σ̂ = ' + sigma_est.toFixed(3) + ' (d₂ = ' + c.d2 + ', A₂ = ' + c.A2 + ')';
  }

  [xbEl, rbEl].forEach(el => el.addEventListener('input', update));
  nEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter overall Grand Average Mean $\bar{\bar{X}}$ across all sample subgroups.',
      'Enter average subgroup range $\bar{R}$ (difference between max and min within subgroup).',
      'Select subgroup sample size n (typically $n=5$ parts per inspection interval).',
      'Inspect Upper and Lower Control Limits (UCL / LCL) for both X-bar and R charts.'
    ],
    benefitTitle: 'Walter A. Shewhart 1924 Statistical Process Control',
    benefitContent: 'Control charts distinguish natural random variation (common cause) from out-of-control shifts (special cause); plotting subgroup averages against $3\sigma$ control limits detects machine tool wear and process drifts before defective parts are produced.',
    faqs: [{ q: 'Why are Control Limits different from Specification Limits?', a: 'Control Limits ($3\sigma/\sqrt{n}$) represent the natural statistical voice of the process; Specification Limits represent the customer\'s tolerance requirements.' }]
  },

  // 24. Control Valve Liquid Flow Coefficient (C_v & K_v) Sizing Calculator
  {
    slug: 'control-valve-flow-coefficient-cv-liquid-sizing-calculator',
    name: 'Industrial Control Valve Flow Coefficient (C_v & K_v) Sizing Calculator',
    description: 'Calculate industrial process control valve flow coefficient (C_v = Q · √(SG / ΔP)) in US GPM / √psi and metric K_v (m³/h / √bar) for liquid flow piping systems.',
    category: 'Science',
    icon: 'text',
    keywords: ['control valve cv calculator', 'flow coefficient cv formula q times sqrt sg over delta p', 'valve sizing kv to cv converter online', 'isa control valve liquid flow sizing calculator', 'piping valve pressure drop cv calculator online'],
    order: 784,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Rate Q (GPM or m³/h), Pressure Drop ΔP (psi or bar) & Liquid Specific Gravity SG',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cv-q">Flow Q (US GPM)</label>
          <input class="tool-textarea" id="cv-q" type="number" step="any" value="150.0" placeholder="150.0 GPM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cv-dp">Pressure Drop ΔP (psi)</label>
          <input class="tool-textarea" id="cv-dp" type="number" step="any" value="15.0" placeholder="15.0 psi (Drop)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cv-sg">Specific Gravity SG</label>
          <input class="tool-textarea" id="cv-sg" type="number" step="0.05" value="1.00" placeholder="1.00 (Water)" />
        </div>
      </div>
      <div id="cv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cv-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">C_v = 38.7 | K_v = 33.5</span>
            <span class="stat-label">Required Valve Flow Sizing Coefficient (C_v & K_v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cv-res-pipe" style="font-weight:700;">Recommended Nominal Valve Size: 2.0" to 2.5" Pipe (Flow: 34.1 m³/h @ 1.03 bar drop)</span>
            <span class="stat-label">Recommended Control Valve Body Size</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('cv-q'), dpEl = document.getElementById('cv-dp'), sgEl = document.getElementById('cv-sg');
  const cvResEl = document.getElementById('cv-res-val'), pResEl = document.getElementById('cv-res-pipe');

  function update() {
    const Q_gpm = parseFloat(qEl.value), dP_psi = parseFloat(dpEl.value), SG = parseFloat(sgEl.value);
    if (isNaN(Q_gpm) || isNaN(dP_psi) || isNaN(SG) || Q_gpm <= 0 || dP_psi <= 0 || SG <= 0) return;

    // ISA-75 liquid sizing equation: C_v = Q * sqrt( SG / deltaP )  [GPM / sqrt(psi)]
    const Cv = Q_gpm * Math.sqrt(SG / dP_psi);

    // Metric Kv = 0.865 * Cv  [m^3/h / sqrt(bar)]
    const Kv = 0.865 * Cv;

    const Q_m3_h = Q_gpm * 0.227125;
    const dP_bar = dP_psi * 0.0689476;

    // Recommended nominal valve body diameter rule of thumb: D_valve approx sqrt(Cv / 10) inches
    let valveSize = '';
    if (Cv < 15) valveSize = '1.0" (DN 25)';
    else if (Cv < 30) valveSize = '1.5" (DN 40)';
    else if (Cv < 60) valveSize = '2.0" (DN 50)';
    else if (Cv < 120) valveSize = '3.0" (DN 80)';
    else if (Cv < 220) valveSize = '4.0" (DN 100)';
    else valveSize = '6.0"+ (DN 150+)';

    cvResEl.textContent = 'C_v = ' + Cv.toFixed(1) + ' (Metric K_v = ' + Kv.toFixed(1) + ')';
    pResEl.textContent = 'Recommended Body: ' + valveSize + ' | Flow: ' + Q_m3_h.toFixed(1) + ' m³/h @ ΔP = ' + dP_bar.toFixed(2) + ' bar (Operating at 70% Stroke)';
  }

  [qEl, dpEl, sgEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter volumetric liquid flow rate Q in US GPM.',
      'Enter pressure drop across the control valve orifice $\Delta P$ in psi.',
      'Enter fluid specific gravity SG (1.0 for water, 0.85 for diesel/oil).',
      'Inspect required valve flow coefficient $C_v$, metric equivalent $K_v$, and recommended valve body pipe diameter.'
    ],
    benefitTitle: 'ISA-75.01 Control Valve Flow Sizing Standard',
    benefitContent: '$C_v$ is defined as the volume of 60°F water in US GPM that flows through a wide-open valve with a 1.0 psi pressure drop; selecting a valve sized for $C_v$ between 60% and 80% of full travel ensures stable linear flow control without hunting or cavitation.',
    faqs: [{ q: 'What is the conversion factor between US Cv and metric Kv?', a: '$K_v = 0.865 \times C_v$ (or $C_v = 1.156 \times K_v$).' }]
  },

  // 25. Overall Equipment Effectiveness (OEE) Manufacturing Efficiency Calculator
  {
    slug: 'overall-equipment-effectiveness-oee-availability-quality-calculator',
    name: 'Overall Equipment Effectiveness (OEE = A × P × Q) Manufacturing Calculator',
    description: 'Calculate manufacturing Overall Equipment Effectiveness (OEE = Availability × Performance × Quality) and identify Six Big Losses in production line downtime.',
    category: 'Science',
    icon: 'text',
    keywords: ['oee calculator', 'overall equipment effectiveness formula availability performance quality online', 'six big losses manufacturing oee calculator', 'total productive maintenance tpm oee calculator online', 'production line efficiency oee benchmark online'],
    order: 785,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Availability A (%), Performance Efficiency P (%) & Quality Pass Rate Q (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="oee-a">Availability A (%)</label>
          <input class="tool-textarea" id="oee-a" type="number" step="0.5" value="90.0" placeholder="90.0 % (Uptime)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="oee-p">Performance P (%)</label>
          <input class="tool-textarea" id="oee-p" type="number" step="0.5" value="95.0" placeholder="95.0 % (Speed)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="oee-q">Quality Q (%)</label>
          <input class="tool-textarea" id="oee-q" type="number" step="0.5" value="99.0" placeholder="99.0 % (Good Parts)" />
        </div>
      </div>
      <div id="oee-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="oee-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">OEE = 84.6% (World Class)</span>
            <span class="stat-label">Overall Equipment Effectiveness (OEE = A · P · Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="oee-res-loss" style="color:var(--green-dark); font-weight:700;">Total Loss: 15.4% (Availability Loss: 10.0%, Performance Loss: 4.5%, Quality Scrap: 0.9%)</span>
            <span class="stat-label">Six Big Losses Breakdown & TPM Benchmark</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('oee-a'), pEl = document.getElementById('oee-p'), qEl = document.getElementById('oee-q');
  const oeeResEl = document.getElementById('oee-res-val'), lsResEl = document.getElementById('oee-res-loss');

  function update() {
    const A_pct = parseFloat(aEl.value), P_pct = parseFloat(pEl.value), Q_pct = parseFloat(qEl.value);
    if (isNaN(A_pct) || isNaN(P_pct) || isNaN(Q_pct) || A_pct <= 0 || P_pct <= 0 || Q_pct <= 0) return;

    // OEE = (A / 100) * (P / 100) * (Q / 100) * 100
    const A = A_pct / 100;
    const P = P_pct / 100;
    const Q = Q_pct / 100;
    const OEE = A * P * Q * 100;

    let benchmark = '';
    let color = '#22543d';

    if (OEE >= 85.0) {
      benchmark = 'WORLD CLASS OEE (≥85%: Top-tier lean manufacturing benchmark)';
      color = '#22543d';
    } else if (OEE >= 70.0) {
      benchmark = 'TYPICAL GOOD PERFORMANCE (70 - 84%: Stable plant operations)';
      color = '#2563eb';
    } else if (OEE >= 50.0) {
      benchmark = 'LOW OEE (50 - 69%: Significant hidden capacity opportunities in changeover & speed)';
      color = '#d97706';
    } else {
      benchmark = 'CRITICAL LOSSES (<50%: Major unmanaged downtime bottlenecks)';
      color = '#c53030';
    }

    oeeResEl.textContent = 'OEE = ' + OEE.toFixed(1) + '% (' + benchmark + ')';
    oeeResEl.style.color = color;
    lsResEl.textContent = 'Unutilized Loss: ' + (100 - OEE).toFixed(1) + '% (A: ' + A_pct + '%, P: ' + P_pct + '%, Q: ' + Q_pct + '%)';
  }

  [aEl, pEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Availability A in % (Operating Time / Planned Production Time).',
      'Enter Performance efficiency P in % (Actual Output / Theoretical Max Speed).',
      'Enter Quality yield rate Q in % (Good First-Pass Units / Total Units Produced).',
      'Inspect overall OEE score percentage and evaluate Total Productive Maintenance (TPM) performance benchmark.'
    ],
    benefitTitle: 'Seiichi Nakajima 1988 Total Productive Maintenance (TPM)',
    benefitContent: 'OEE uncovers hidden factory capacity by tracking the Six Big Losses: equipment breakdowns, setup adjustments, idling small stops, reduced speed, startup rejects, and production scrap.',
    faqs: [{ q: 'What is the recognized World Class OEE benchmark?', a: 'World Class OEE is 85%, representing 90% Availability $\times$ 95% Performance $\times$ 99.9% Quality.' }]
  },

  // 26. V-Notch (Thomson) Triangular Open-Channel Weir Flow Rate Calculator
  {
    slug: 'gpm-weir-flow-v-notch-thomson-discharge-calculator',
    name: 'V-Notch (Thomson Triangular) Open-Channel Weir Discharge (Q) Calculator',
    description: 'Calculate open channel open-water flow rate discharge (Q = 8/15 · C_d · √(2g) · tan(θ/2) · H^(5/2)) in L/s, m³/h, and GPM for 90°, 60°, and 45° V-notch weirs.',
    category: 'Science',
    icon: 'text',
    keywords: ['v notch weir calculator', 'triangular weir flow rate formula thomson 8 over 15 cd sqrt 2g', 'open channel v notch weir discharge calculator online', '90 degree v notch weir flow rate calculator', 'hydraulics water flow weir head h calculator'],
    order: 786,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Head Over Crest H (cm / mm), V-Notch Angle θ (90°, 60°, 45°) & Discharge Coeff C_d (0.58)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wr-h">Head H (cm)</label>
          <input class="tool-textarea" id="wr-h" type="number" step="any" value="20.0" placeholder="20.0 cm (0.20 m Head)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wr-th">Notch Angle θ</label>
          <select class="tool-textarea" id="wr-th">
            <option value="90" selected>90° V-Notch (Standard: tan(45°) = 1.00)</option>
            <option value="60">60° V-Notch (tan(30°) = 0.577)</option>
            <option value="45">45° V-Notch (tan(22.5°) = 0.414)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="wr-cd">Coeff C_d</label>
          <input class="tool-textarea" id="wr-cd" type="number" step="0.01" value="0.58" placeholder="0.58 (Standard)" />
        </div>
      </div>
      <div id="wr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wr-res-flow" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Q = 24.62 L / s (390.2 GPM)</span>
            <span class="stat-label">Open Channel Volumetric Water Discharge Rate (Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wr-res-m3h" style="font-weight:700;">Hourly Discharge: 88.6 m³ / hour (H^(5/2) scaling: Q ∝ H^2.5)</span>
            <span class="stat-label">Hydraulic Discharge Hourly Volume</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('wr-h'), thEl = document.getElementById('wr-th'), cdEl = document.getElementById('wr-cd');
  const fResEl = document.getElementById('wr-res-flow'), mResEl = document.getElementById('wr-res-m3h');

  const g = 9.80665;

  function update() {
    const H_cm = parseFloat(hEl.value), thDeg = parseFloat(thEl.value), Cd = parseFloat(cdEl.value);
    if (isNaN(H_cm) || isNaN(thDeg) || isNaN(Cd) || H_cm <= 0 || thDeg <= 0 || Cd <= 0) return;

    const H_m = H_cm / 100.0;
    const halfAngleRad = ((thDeg / 2.0) * Math.PI) / 180;

    // Thomson triangular weir formula: Q = (8 / 15) * Cd * sqrt(2*g) * tan(theta/2) * H^(5/2)  [m^3 / s]
    const Q_m3_s = (8.0 / 15.0) * Cd * Math.sqrt(2 * g) * Math.tan(halfAngleRad) * Math.pow(H_m, 2.5);

    const Q_lps = Q_m3_s * 1000.0;
    const Q_gpm = Q_lps * 15.8503;
    const Q_m3_h = Q_m3_s * 3600.0;

    fResEl.textContent = 'Q = ' + Q_lps.toFixed(2) + ' L / s (' + Q_gpm.toFixed(1) + ' GPM)';
    mResEl.textContent = 'Q = ' + Q_m3_h.toFixed(1) + ' m³/h (' + thDeg + '° V-Notch @ H = ' + H_cm + ' cm, C_d = ' + Cd + ')';
  }

  [hEl, cdEl].forEach(el => el.addEventListener('input', update));
  thEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter measured liquid head height H above the V-notch apex vertex in centimeters.',
      'Select triangular notch opening angle $\theta$ (90°, 60°, or 45°).',
      'Enter discharge coefficient $C_d$ (typically 0.58 for sharp-crested thin-plate weirs).',
      'Inspect open-channel volumetric flow discharge rate in L/s, US GPM, and $m^3/\text{hour}$.'
    ],
    benefitTitle: 'James Thomson 1858 Triangular Weir Hydraulics',
    benefitContent: 'Triangular V-notch weirs maintain geometric self-similarity at all water depths ($Q \propto H^{5/2}$), providing far greater flow measurement accuracy at low flow rates than rectangular weirs in environmental stream monitoring and wastewater effluent channels.',
    faqs: [{ q: 'Why is a 90° V-notch the most popular open-channel weir?', a: 'At 90°, $\tan(\theta/2) = \tan(45^\circ) = 1.0$, simplifying the discharge equation to $Q \approx 1.38 H^{2.5}\text{ m}^3/\text{s}$.' }]
  }
];

pack25Tools.forEach(createTool);
console.log('Pack 25 complete: 26 tools created.');
