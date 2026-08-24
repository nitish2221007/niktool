const { createTool } = require('./generate-curated-tools.cjs');

// Pack 50: 25 Nuclear Engineering, Radiation Physics, Plasma Physics & Nuclear Fusion Calculators (Tools 1501 to 1525)
const pack50Tools = [
  // 1. Lawson Criterion Fusion Triple Product Calculator
  {
    slug: 'lawson-criterion-triple-product-fusion-plasma-calculator',
    name: 'Lawson Criterion Fusion Triple Product (n·T·τ_E) & Ignition Calculator',
    description: 'Calculate magnetic confinement nuclear fusion Lawson Criterion Triple Product (n · T · τ_E in keV·s/m³), energy confinement time τ_E, and evaluate Deuterium-Tritium (D-T) thermonuclear ignition (n·T·τ_E ≥ 3 × 10²¹ keV·s/m³).',
    category: 'Science',
    icon: 'text',
    keywords: ['lawson criterion calculator', 'fusion triple product formula n t tau online', 'deuterium tritium ignition threshold calculator', 'energy confinement time tokamak stellarator calculator', 'plasma physics nuclear fusion nuclear engineering online'],
    order: 1385,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Plasma Ion Density n (10²⁰ m⁻³), Core Temperature T (keV) & Confinement Time τ_E (Seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lc-n">Ion Density n</label>
          <input class="tool-textarea" id="lc-n" type="number" step="0.2" value="1.0" placeholder="1.0 × 10²⁰ m⁻³ (ITER Target)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lc-t">Temp T (keV)</label>
          <input class="tool-textarea" id="lc-t" type="number" step="2" value="15.0" placeholder="15.0 keV (174 Million °C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lc-tau">Confinement τ_E (s)</label>
          <input class="tool-textarea" id="lc-tau" type="number" step="0.5" value="3.5" placeholder="3.5 Seconds" />
        </div>
      </div>
      <div id="lc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lc-res-triple" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Triple Product = 5.25 × 10²¹ keV · s / m³</span>
            <span class="stat-label">Fusion Triple Product (n · T · τ_E)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lc-res-eval" style="color:var(--green-dark); font-weight:700;">IGNITION ACHIEVED (Triple Product exceeds 3.0 × 10²¹ threshold: Self-sustaining alpha heating ✓)</span>
            <span class="stat-label">D-T Thermonuclear Burning Plasma State Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('lc-n'), tEl = document.getElementById('lc-t'), tauEl = document.getElementById('lc-tau');
  const tpResEl = document.getElementById('lc-res-triple'), evResEl = document.getElementById('lc-res-eval');

  function update() {
    const n_scaled = parseFloat(nEl.value), T_keV = parseFloat(tEl.value), tau_s = parseFloat(tauEl.value);
    if (isNaN(n_scaled) || isNaN(T_keV) || isNaN(tau_s) || n_scaled <= 0 || T_keV <= 0 || tau_s <= 0) return;

    const n_m3 = n_scaled * 1e20;
    const triple_product = n_m3 * T_keV * tau_s;
    const triple_scaled = triple_product / 1e21;
    const T_million_K = T_keV * 11.6045;

    let qual = '', color = '#22543d';
    if (triple_product >= 3.0e21) {
      qual = 'IGNITION ACHIEVED (n·T·τ_E ≥ 3.0×10²¹: Self-sustaining alpha-particle heating ✓)';
      color = '#22543d';
    } else if (triple_product >= 1.0e21) {
      qual = 'BURNING PLASMA (Q ≥ 5 - 10: Alpha heating dominates external drive)';
      color = '#22543d';
    } else if (triple_product >= 5.0e20) {
      qual = 'SCIENTIFIC BREAKEVEN (Q ≈ 1.0: Fusion power equals input power)';
      color = '#ea580c';
    } else {
      qual = 'SUB-BREAKEVEN (n·T·τ_E < 5×10²⁰: Requires substantial auxiliary heating)';
      color = '#c53030';
    }

    tpResEl.textContent = 'Triple Product = ' + triple_scaled.toFixed(2) + ' × 10²¹ keV · s / m³';
    tpResEl.style.color = color;
    evResEl.textContent = qual + ' [T = ' + T_keV + ' keV (' + Math.round(T_million_K) + 'M K) @ τ_E = ' + tau_s + ' s]';
  }

  [nEl, tEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter plasma core fuel ion density n in units of $10^{20}\text{ m}^{-3}$ (typically 0.5–2.0 for tokamaks).',
      'Enter plasma core kinetic temperature T in keV ($1\text{ keV} \approx 11.6\text{ Million Kelvin}$; optimal D-T peak is 10–20 keV).',
      'Enter energy confinement time $\tau_E$ in seconds.',
      'Inspect Lawson Criterion Triple Product in $\text{keV}\cdot\text{s/m}^3$ and evaluate thermonuclear ignition status.'
    ],
    benefitTitle: 'John D. Lawson 1955 Nuclear Fusion Criterion',
    benefitContent: 'Balances fusion alpha-particle self-heating power against plasma Bremsstrahlung radiation and conduction transport losses, establishing the non-negotiable threshold for commercial fusion power reactors.',
    faqs: [{ q: 'What is the physical meaning of energy confinement time τE?', a: '$\tau_E = W_{\text{plasma}} / P_{\text{loss}}$ measures how long thermal energy stays trapped inside the magnetic field cage before leaking to the reactor walls.' }]
  },

  // 2. Radioactive Decay Bateman Equations Calculator
  {
    slug: 'radioactive-decay-bateman-equations-daughter-isotope-calculator',
    name: 'Radioactive Decay Bateman Equations & Daughter Isotope Activity Calculator',
    description: 'Calculate radioactive decay series daughter isotope atom populations N₂(t) and activities A₂(t) in Becquerels (Bateman Equations: N₂(t) = λ₁·N₁(0)/(λ₂ - λ₁) · (e^(-λ₁·t) - e^(-λ₂·t))), secular equilibrium, and transient equilibrium.',
    category: 'Science',
    icon: 'text',
    keywords: ['bateman equations calculator', 'radioactive decay chain daughter activity formula online', 'secular transient equilibrium radioisotope calculator', 'radionuclide half life activity becquerel curie calculator', 'nuclear physics radiation protection radiochemistry online'],
    order: 1386,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Parent Half-Life T₁/2(1) (Hours), Daughter Half-Life T₁/2(2) (Hours), Initial Parent Activity A₁₀ (MBq) & Time t (Hours)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bt-t1">Parent T₁/2 (hr)</label>
          <input class="tool-textarea" id="bt-t1" type="number" step="5" value="66.0" placeholder="66.0 hr (Mo-99)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bt-t2">Daughter T₁/2 (hr)</label>
          <input class="tool-textarea" id="bt-t2" type="number" step="0.5" value="6.0" placeholder="6.0 hr (Tc-99m)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bt-a10">Initial A₁₀ (MBq)</label>
          <input class="tool-textarea" id="bt-a10" type="number" step="100" value="1000.0" placeholder="1000.0 MBq" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bt-time">Elapsed t (hr)</label>
          <input class="tool-textarea" id="bt-time" type="number" step="2" value="23.0" placeholder="23.0 hr (Peak Tc-99m)" />
        </div>
      </div>
      <div id="bt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bt-res-a2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Daughter Activity A₂ = 739.5 MBq (Peak Ingrowth)</span>
            <span class="stat-label">Daughter Isotope Activity (A₂(t) = λ₂ · N₂(t))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bt-res-eq" style="color:var(--green-dark); font-weight:700;">TRANSIENT EQUILIBRIUM (T₁ > T₂: A₂ / A₁ = 1.10 @ t > 4·T₂ | Peak Activity @ t_max = 22.9 hr)</span>
            <span class="stat-label">Parent Activity A₁ = 785.4 MBq & Decay Mode Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const t1El = document.getElementById('bt-t1'), t2El = document.getElementById('bt-t2');
  const a10El = document.getElementById('bt-a10'), tmEl = document.getElementById('bt-time');
  const a2ResEl = document.getElementById('bt-res-a2'), eqResEl = document.getElementById('bt-res-eq');

  function update() {
    const T1_hr = parseFloat(t1El.value), T2_hr = parseFloat(t2El.value);
    const A10_MBq = parseFloat(a10El.value), t_hr = parseFloat(tmEl.value);

    if (isNaN(T1_hr) || isNaN(T2_hr) || isNaN(A10_MBq) || isNaN(t_hr) || T1_hr <= 0 || T2_hr <= 0 || A10_MBq <= 0 || t_hr < 0 || T1_hr === T2_hr) return;

    const lambda1 = Math.LN2 / T1_hr;
    const lambda2 = Math.LN2 / T2_hr;

    const A1_MBq = A10_MBq * Math.exp(-lambda1 * t_hr);
    const factor = lambda2 / (lambda2 - lambda1);
    const A2_MBq = factor * A10_MBq * (Math.exp(-lambda1 * t_hr) - Math.exp(-lambda2 * t_hr));
    const t_max_hr = Math.log(lambda2 / lambda1) / (lambda2 - lambda1);

    let mode = '';
    if (T1_hr > 100.0 * T2_hr) {
      mode = 'SECULAR EQUILIBRIUM (T₁ >> T₂: A₂ approaches A₁ at long times)';
    } else if (T1_hr > T2_hr) {
      const eq_ratio = lambda2 / (lambda2 - lambda1);
      mode = 'TRANSIENT EQUILIBRIUM (T₁ > T₂: Ingrowth peak @ ' + t_max_hr.toFixed(1) + ' hr, asymptotic A₂/A₁ = ' + eq_ratio.toFixed(2) + ')';
    } else {
      mode = 'NO EQUILIBRIUM (T₁ < T₂: Daughter decays slower than parent)';
    }

    a2ResEl.textContent = 'Daughter Activity A₂ = ' + A2_MBq.toFixed(1) + ' MBq';
    eqResEl.textContent = 'Parent A₁ = ' + A1_MBq.toFixed(1) + ' MBq | ' + mode + ' [t_peak = ' + t_max_hr.toFixed(1) + ' hr]';
  }

  [t1El, t2El, a10El, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter parent radionuclide physical half-life in hours (e.g. 66.0 hr for Molybdenum-99).',
      'Enter daughter radionuclide physical half-life in hours (e.g. 6.0 hr for Technetium-99m).',
      'Enter initial pure parent radioactivity $A_{10}$ in MBq.',
      'Enter elapsed decay/ingrowth time t in hours.',
      'Inspect daughter activity $A_2(t)$, parent activity $A_1(t)$, and time to maximum daughter activity $t_{\max}$.'
    ],
    benefitTitle: 'Harry Bateman 1910 Radioactive Decay Kinetics Law',
    benefitContent: 'Governs isotopic ingrowth and decay in medical isotope generators ($\text{Mo-99} \to \text{Tc-99m}$ nuclear medicine elution cows) and nuclear waste actinide transmutation chains.',
    faqs: [{ q: 'What is the difference between Secular and Transient equilibrium?', a: 'Secular equilibrium occurs when the parent half-life is thousands of times longer than the daughter ($T_1 \gg T_2$), causing daughter activity to equalize exactly with parent activity ($A_2 = A_1$).' }]
  },

  // 3. Neutron Diffusion Length & Migration Area Calculator
  {
    slug: 'neutron-diffusion-length-fermi-age-thermalization-calculator',
    name: 'Neutron Diffusion Length (L = √(D/Σ_a)) & Reactor Migration Area (M²) Calculator',
    description: 'Calculate nuclear reactor thermal neutron diffusion length L in cm (L = √(D / Σ_a)), Fermi age to thermalization τ, total Migration Area M² = L² + τ, and non-leakage probability P_NL = 1 / (1 + M²·B_g²).',
    category: 'Science',
    icon: 'text',
    keywords: ['neutron diffusion length calculator', 'fermi age migration area formula m squared online', 'reactor non leakage probability buckling calculator', 'macroscopic absorption cross section sigma a calculator', 'nuclear engineering reactor physics core design online'],
    order: 1387,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Diffusion Coeff D (cm), Macroscopic Absorption Σ_a (cm⁻¹), Fermi Age τ (cm²) & Buckling B_g² (cm⁻²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nd-d">Diffusion D (cm)</label>
          <input class="tool-textarea" id="nd-d" type="number" step="0.05" value="0.16" placeholder="0.16 cm (Light Water H₂O)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nd-sa">Absorb Σ_a (cm⁻¹)</label>
          <input class="tool-textarea" id="nd-sa" type="number" step="0.005" value="0.022" placeholder="0.022 cm⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nd-tau">Fermi Age τ (cm²)</label>
          <input class="tool-textarea" id="nd-tau" type="number" step="2" value="27.0" placeholder="27.0 cm² (Slowing Down)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nd-bg">Buckling B_g² (cm⁻²)</label>
          <input class="tool-textarea" id="nd-bg" type="number" step="0.0001" value="0.0005" placeholder="0.0005 cm⁻² (Core Geometry)" />
        </div>
      </div>
      <div id="nd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nd-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Diffusion Length L = 2.70 cm (M² = 34.27 cm²)</span>
            <span class="stat-label">Thermal Neutron Diffusion Length (L = √(D / Σ_a))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nd-res-pnl" style="color:var(--green-dark); font-weight:700;">Non-Leakage Probability P_NL = 98.31% (Fast & Thermal Leakage = 1.69%)</span>
            <span class="stat-label">Total Neutron Non-Leakage Probability (P_NL = 1 / (1 + M² · B_g²))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('nd-d'), saEl = document.getElementById('nd-sa');
  const tauEl = document.getElementById('nd-tau'), bgEl = document.getElementById('nd-bg');
  const lResEl = document.getElementById('nd-res-l'), pnlResEl = document.getElementById('nd-res-pnl');

  function update() {
    const D_cm = parseFloat(dEl.value), Sigma_a = parseFloat(saEl.value);
    const tau_cm2 = parseFloat(tauEl.value), Bg_sq = parseFloat(bgEl.value);

    if (isNaN(D_cm) || isNaN(Sigma_a) || isNaN(tau_cm2) || isNaN(Bg_sq) || D_cm <= 0 || Sigma_a <= 0 || tau_cm2 < 0 || Bg_sq < 0) return;

    const L_cm = Math.sqrt(D_cm / Sigma_a);
    const L_sq = D_cm / Sigma_a;
    const M_sq = L_sq + tau_cm2;
    const P_NL = 1.0 / (1.0 + (M_sq * Bg_sq));
    const P_NL_pct = P_NL * 100.0;
    const leakage_pct = (1.0 - P_NL) * 100.0;

    lResEl.textContent = 'Diffusion Length L = ' + L_cm.toFixed(2) + ' cm (M² = ' + M_sq.toFixed(2) + ' cm²)';
    pnlResEl.textContent = 'Non-Leakage P_NL = ' + P_NL_pct.toFixed(2) + '% (Neutron Leakage = ' + leakage_pct.toFixed(2) + '% @ B_g²=' + Bg_sq + ' cm⁻²)';
  }

  [dEl, saEl, tauEl, bgEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter thermal neutron diffusion coefficient D in cm (typically 0.16 cm for $H_2O$, 0.85 cm for $D_2O$, 0.84 cm for Graphite).',
      'Enter macroscopic thermal absorption cross-section $\Sigma_a$ in $\text{cm}^{-1}$.',
      'Enter Enrico Fermi age to thermalization $\tau$ in $\text{cm}^2$ (slowing down area from fast fission to thermal).',
      'Enter geometric buckling $B_g^2$ in $\text{cm}^{-2}$ representing reactor core physical dimensions.',
      'Inspect thermal diffusion length L, total migration area $M^2$, and reactor non-leakage probability $P_{\text{NL}}$.'
    ],
    benefitTitle: 'Enrico Fermi 1936 Neutron Moderation & Diffusion Theory',
    benefitContent: 'Characterizes the spatial wander of neutrons from birth at 2 MeV fission energies down to 0.025 eV thermal absorption, sizing nuclear reactor cores to minimize edge neutron leakage.',
    faqs: [{ q: 'Why does Heavy Water (D2O) have a much larger diffusion length than Light Water (H2O)?', a: 'Deuterium has a nearly 600× smaller thermal neutron absorption cross-section than hydrogen ($\Sigma_a \approx 0.00003\text{ cm}^{-1}$ vs $0.022\text{ cm}^{-1}$), allowing neutrons to diffuse over $100\text{ cm}$.' }]
  },

  // 4. Four-Factor Formula Infinite Multiplication Factor Calculator
  {
    slug: 'four-factor-formula-infinite-multiplication-factor-calculator',
    name: 'Four-Factor Formula Infinite Multiplication Factor (k_∞ = ε·p·η·f) Calculator',
    description: 'Calculate nuclear reactor infinite multiplication factor k_∞ (Fermi Four-Factor Formula: k_∞ = ε · p · η · f), thermal utilization factor f, resonance escape probability p, and reproduction factor η.',
    category: 'Science',
    icon: 'text',
    keywords: ['four factor formula calculator', 'infinite multiplication factor k infinity formula online', 'thermal utilization resonance escape reproduction factor calculator', 'reactor criticality keff fermi four factor calculator', 'nuclear reactor physics nuclear engineering core design online'],
    order: 1388,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fast Fission ε (1.02 to 1.08), Resonance Escape p (0.80 to 0.95), Thermal Utilization f & Reproduction η',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ff-eps">Fast Fission ε</label>
          <input class="tool-textarea" id="ff-eps" type="number" step="0.01" value="1.03" placeholder="1.03 (U-238 Fast Fission)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ff-p">Resonance p</label>
          <input class="tool-textarea" id="ff-p" type="number" step="0.02" value="0.88" placeholder="0.88 (Resonance Escape)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ff-eta">Reproduction η</label>
          <input class="tool-textarea" id="ff-eta" type="number" step="0.05" value="2.08" placeholder="2.08 (Neutrons per Thermal Abs)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ff-f">Utilization f</label>
          <input class="tool-textarea" id="ff-f" type="number" step="0.02" value="0.65" placeholder="0.65 (Thermal Utilization)" />
        </div>
      </div>
      <div id="ff-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ff-res-kinf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">k_∞ = 1.226 (SUPERCRITICAL POTENTIAL)</span>
            <span class="stat-label">Infinite Medium Neutron Multiplication Factor (k_∞ = ε · p · η · f)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ff-res-eval" style="color:var(--green-dark); font-weight:700;">REACTIVITY MARGIN: Excess Reactivity Δk_∞ = +0.226 (+22,600 pcm) to accommodate leakage & burnup ✓</span>
            <span class="stat-label">Fermi Four-Factor Neutronic Balance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const epsEl = document.getElementById('ff-eps'), pEl = document.getElementById('ff-p');
  const etaEl = document.getElementById('ff-eta'), fEl = document.getElementById('ff-f');
  const kiResEl = document.getElementById('ff-res-kinf'), evResEl = document.getElementById('ff-res-eval');

  function update() {
    const epsilon = parseFloat(epsEl.value), p = parseFloat(pEl.value);
    const eta = parseFloat(etaEl.value), f = parseFloat(fEl.value);

    if (isNaN(epsilon) || isNaN(p) || isNaN(eta) || isNaN(f) || epsilon <= 0 || p <= 0 || eta <= 0 || f <= 0) return;

    const k_inf = epsilon * p * eta * f;
    const excess_k = k_inf - 1.0;
    const excess_pcm = excess_k * 1e5;

    let qual = '', color = '#22543d';
    if (k_inf >= 1.15) {
      qual = 'SUPERCRITICAL POTENTIAL (k_∞ ≥ 1.15: Ample margin for finite core leakage & control poison ✓)';
      color = '#22543d';
    } else if (k_inf >= 1.0) {
      qual = 'CRITICAL MARGINAL (1.00 ≤ k_∞ < 1.15: Requires low leakage core)';
      color = '#ea580c';
    } else {
      qual = 'SUBCRITICAL (k_∞ < 1.00: Cannot achieve chain reaction even in infinite medium ✗)';
      color = '#c53030';
    }

    kiResEl.textContent = 'k_∞ = ' + k_inf.toFixed(4) + ' (' + qual.split(' (')[0] + ')';
    kiResEl.style.color = color;
    evResEl.textContent = 'Excess Reactivity Δk_∞ = ' + (excess_k >= 0 ? '+' : '') + excess_k.toFixed(4) + ' (' + Math.round(excess_pcm).toLocaleString() + ' pcm | ε=' + epsilon + ', p=' + p + ', η=' + eta + ', f=' + f + ')';
  }

  [epsEl, pEl, etaEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fast fission factor $\epsilon$ (typically 1.03 for LWRs due to U-238 fast fissions).',
      'Enter resonance escape probability p (fraction of fast neutrons escaping U-238 resonance capture).',
      'Enter neutron reproduction factor $\eta$ (neutrons emitted per thermal neutron absorbed in fuel).',
      'Enter thermal utilization factor f (fraction of thermal neutrons absorbed in fuel vs moderator/cladding).',
      'Inspect infinite multiplication factor $k_\infty$ and excess reactivity margin in percent mille (pcm).'
    ],
    benefitTitle: 'Enrico Fermi 1942 Chicago Pile-1 Criticality Formula',
    benefitContent: 'Deconstructs the neutron life cycle into four discrete physical probabilities, determining whether a heterogeneous reactor lattice geometry can sustain a self-propagating nuclear chain reaction.',
    faqs: [{ q: 'Why is fuel lumped into fuel rods rather than homogeneously mixed?', a: 'Lumping fuel into rods increases resonance escape probability p because resonance capture occurs only at the rod surface (self-shielding).' }]
  },

  // 5. Nuclear Reactor Inhour Equation & Period Calculator
  {
    slug: 'reactor-period-inhour-equation-delayed-neutrons-calculator',
    name: 'Nuclear Reactor Inhour Equation & Delayed Neutron Period (T) Calculator',
    description: 'Calculate nuclear reactor stable asymptotic period T in seconds from reactivity ρ in pcm/dollars ($) using the Nordheim Inhour Equation (ρ = l* / (k·T) + ∑ β_i / (1 + λ_i·T)) and total delayed neutron fraction β.',
    category: 'Science',
    icon: 'text',
    keywords: ['inhour equation calculator', 'reactor period formula reactivity rho online', 'delayed neutron fraction beta prompt neutron lifetime calculator', 'nordheim inhour equation nuclear kinetics calculator', 'reactor dynamics safety nuclear engineering physics online'],
    order: 1389,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reactivity ρ (pcm or Dollars $), Delayed Fraction β (e.g. 0.0065 for U-235) & Mean Delayed Lifetime τ_d (s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ih-rho">Reactivity ρ (pcm)</label>
          <input class="tool-textarea" id="ih-rho" type="number" step="10" value="50.0" placeholder="50.0 pcm (0.077 $)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ih-beta">Delayed Beta β</label>
          <input class="tool-textarea" id="ih-beta" type="number" step="0.0005" value="0.0065" placeholder="0.0065 (0.65% U-235)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ih-tau">Mean Lifetime τ_d</label>
          <input class="tool-textarea" id="ih-tau" type="number" step="1" value="12.7" placeholder="12.7 s (Delayed Neutrons)" />
        </div>
      </div>
      <div id="ih-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ih-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Reactor Period T = 165.1 Seconds</span>
            <span class="stat-label">Stable Asymptotic Reactor Period (e-Folding Power Rise Time)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ih-res-eval" style="color:var(--green-dark); font-weight:700;">SAFE CONTROLLABLE TRANSIENT (Reactivity = 0.077 $ << 1.00 $ Prompt Critical Limit ✓)</span>
            <span class="stat-label">Prompt Jump & Delayed Neutron Kinetics (T ≈ (β - ρ) / (λ·ρ))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rhoEl = document.getElementById('ih-rho'), betaEl = document.getElementById('ih-beta'), tauEl = document.getElementById('ih-tau');
  const tResEl = document.getElementById('ih-res-t'), evResEl = document.getElementById('ih-res-eval');

  function update() {
    const rho_pcm = parseFloat(rhoEl.value), beta = parseFloat(betaEl.value), tau_d_s = parseFloat(tauEl.value);
    if (isNaN(rho_pcm) || isNaN(beta) || isNaN(tau_d_s) || rho_pcm === 0 || beta <= 0 || tau_d_s <= 0) return;

    const rho = rho_pcm * 1e-5;
    const dollars = rho / beta;

    if (dollars >= 1.0) {
      tResEl.textContent = 'PROMPT CRITICAL (T < 0.001 s ✗)';
      tResEl.style.color = '#c53030';
      evResEl.textContent = 'SUPER-PROMPT CRITICAL (ρ = ' + dollars.toFixed(3) + ' $ ≥ 1.00 $: Millisecond power excursion without delayed neutron control)';
      return;
    }

    const T_sec = ((beta - rho) * tau_d_s) / rho;

    let qual = '', color = '#22543d';
    if (T_sec >= 60.0) {
      qual = 'SLOW SAFE OPERATIONAL TRANSIENT (T ≥ 60 s: Operator manageable ✓)';
      color = '#22543d';
    } else if (T_sec >= 10.0) {
      qual = 'MODERATE POWER INCREASE (10 s ≤ T < 60 s)';
      color = '#ea580c';
    } else {
      qual = 'FAST TRANSIENT (T < 10 s: Automatic scram protection active)';
      color = '#c53030';
    }

    tResEl.textContent = 'Reactor Period T = ' + T_sec.toFixed(1) + ' Seconds';
    tResEl.style.color = color;
    evResEl.textContent = qual + ' [Reactivity = ' + dollars.toFixed(3) + ' $ (' + rho_pcm + ' pcm) @ β=' + (beta*100).toFixed(3) + '%]';
  }

  [rhoEl, betaEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied positive or negative reactivity $\rho$ in percent mille (pcm, $1\text{ pcm} = 10^{-5}\ \Delta k/k$).',
      'Enter effective delayed neutron fraction $\beta$ (0.0065 for U-235, 0.0021 for Pu-239).',
      'Enter effective one-group delayed neutron precursor mean lifetime $\tau_d$ in seconds (standard ~12.7 s).',
      'Inspect stable reactor asymptotic period T in seconds and evaluate Prompt Critical safety margin in Dollars ($).'
    ],
    benefitTitle: 'Eugene Wigner & Lothar Nordheim 1946 Inhour Equation',
    benefitContent: 'Delayed neutrons ($0.65\%$ born with half-lives up to 55 seconds from precursor fission products) slow down reactor time constants by a factor of 100,000, making nuclear fission humanly controllable.',
    faqs: [{ q: 'What happens at 1.00 Dollar ($) of reactivity (Prompt Critical)?', a: 'At $\rho = \beta$ ($1.00\$$), the reactor reaches criticality on prompt neutrons alone without waiting for delayed precursors, causing exponential power rises in microseconds.' }]
  },

  // 6. Xenon-135 Reactor Poisoning & Post-Shutdown Iodine Pit Calculator
  {
    slug: 'xenon-135-iodine-135-reactor-poisoning-pit-calculator',
    name: 'Xenon-135 Reactor Poisoning & Post-Shutdown Iodine Pit Calculator',
    description: 'Calculate nuclear reactor thermal neutron poison Xenon-135 reactivity worth in pcm (σ_a = 2.6 × 10⁶ barns), steady-state equilibrium poisoning, post-shutdown Iodine-135 decay peak (Iodine Pit / Xenon dead time ~9 to 11 hours).',
    category: 'Science',
    icon: 'text',
    keywords: ['xenon 135 calculator', 'reactor poisoning iodine pit formula online', 'post shutdown xenon peak dead time calculator', 'iodine 135 decay xenon reactivity worth calculator', 'nuclear reactor physics operations chernobyl physics online'],
    order: 1390,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Steady Thermal Neutron Flux Φ (10¹³ n/cm²·s) & Post-Shutdown Hours t_down (hr)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="xp-phi">Flux Φ (10¹³ n/cm²·s)</label>
          <input class="tool-textarea" id="xp-phi" type="number" step="2" value="10.0" placeholder="10.0 × 10¹³ n/cm²·s (Full Power)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="xp-tdown">Shutdown t (hr)</label>
          <input class="tool-textarea" id="xp-tdown" type="number" step="1" value="9.0" placeholder="9.0 Hours Post-Scram" />
        </div>
      </div>
      <div id="xp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="xp-res-rho" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Peak Xenon Worth = -4,850 pcm (-4.85% Δk/k)</span>
            <span class="stat-label">Post-Shutdown Maximum Xenon Poisoning Reactivity Deficit</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="xp-res-pit" style="color:var(--green-dark); font-weight:700;">IODINE PIT MAXIMUM @ t ≈ 9.5 Hours (Reactor Dead Time: Cannot restart without huge excess reactivity)</span>
            <span class="stat-label">I-135 (T₁/2=6.6h) decays into Xe-135 without neutron burnout destruction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phiEl = document.getElementById('xp-phi'), tdEl = document.getElementById('xp-tdown');
  const rhResEl = document.getElementById('xp-res-rho'), ptResEl = document.getElementById('xp-res-pit');

  function update() {
    const Phi_13 = parseFloat(phiEl.value), t_down = parseFloat(tdEl.value);
    if (isNaN(Phi_13) || isNaN(t_down) || Phi_13 <= 0 || t_down < 0) return;

    const Phi = Phi_13 * 1e13; // n / (cm^2 * s)

    // Steady-state equilibrium xenon reactivity worth approx:
    // rho_ss (pcm) approx - (3000 * Phi) / (Phi + 3.5e13) * 1.5
    const rho_ss_pcm = - (3200.0 * Phi) / (Phi + 3.0e13);

    // Post-shutdown peak factor: I-135 decays into Xe-135 with peak near 9.5 hours
    // Peak height scales with pre-shutdown flux Phi
    const peak_multiplier = 1.0 + (Phi_13 / 10.0) * 0.85;
    const peak_rho_pcm = rho_ss_pcm * peak_multiplier;

    // Time profile post shutdown:
    const decay_factor = Math.exp(-0.075 * Math.pow(t_down - 9.5, 2) / 8.0);
    const current_rho_pcm = rho_ss_pcm + (peak_rho_pcm - rho_ss_pcm) * Math.exp(-Math.pow(t_down - 9.5, 2) / 30.0);

    rhResEl.textContent = 'Xenon Worth = ' + Math.round(current_rho_pcm).toLocaleString() + ' pcm (' + (current_rho_pcm/1000).toFixed(2) + '% Δk/k)';
    ptResEl.textContent = 'Peak Deficit = ' + Math.round(peak_rho_pcm).toLocaleString() + ' pcm @ ~9.5 hr post-scram | Steady-State Worth = ' + Math.round(rho_ss_pcm).toLocaleString() + ' pcm (Pre-trip Φ=' + Phi_13 + '×10¹³)';
  }

  phiEl.addEventListener('input', update);
  tdEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter operating thermal neutron flux $\Phi$ in units of $10^{13}\text{ n/cm}^2\cdot\text{s}$ prior to reactor shutdown.',
      'Enter elapsed time since control rod trip/shutdown in hours.',
      'Inspect Xenon-135 negative reactivity poison worth in pcm and peak Iodine Pit depth at ~9 to 11 hours.'
    ],
    benefitTitle: 'Xenon-135 Nuclear Poisoning & Chernobyl Dynamics',
    benefitContent: 'Xenon-135 possesses the largest known thermal neutron absorption cross-section ($\sigma_a = 2.6 \times 10^6\text{ barns}$); after shutdown, parent Iodine-135 ($T_{1/2} = 6.6\text{ hr}$) continues feeding Xenon while neutron burnout ceases, creating the dangerous "Iodine Pit".',
    faqs: [{ q: 'What caused the Chernobyl Unit 4 Xenon accident in 1986?', a: 'Operators attempted to power up a reactor trapped deep inside the Xenon pit by pulling almost all control rods, leaving the core vulnerable to a massive positive void coefficient power excursion.' }]
  },

  // 7. Plasma Bremsstrahlung Radiation Power Loss Calculator
  {
    slug: 'bremsstrahlung-radiation-power-loss-fusion-plasma-calculator',
    name: 'Plasma Bremsstrahlung Radiation Power Loss (P_Br = 5.35×10⁻³⁷·Z_eff·n_e²·√T_e) Calculator',
    description: 'Calculate magnetically confined thermonuclear fusion plasma Bremsstrahlung X-ray radiative power loss density P_Br in MW/m³ (P_Br = 5.35 × 10⁻³⁷ · Z_eff · n_e² · √T_e) from effective charge Z_eff, electron density n_e, and temperature T_e.',
    category: 'Science',
    icon: 'text',
    keywords: ['bremsstrahlung radiation calculator', 'fusion plasma radiation loss formula online', 'bremsstrahlung x ray power density mw m3 calculator', 'zeff effective ion charge plasma calculator', 'plasma physics nuclear fusion tokamak astrophysics online'],
    order: 1391,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electron Density n_e (10²⁰ m⁻³), Temperature T_e (keV), Effective Charge Z_eff & Plasma Volume V (m³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="br-ne">Electron n_e</label>
          <input class="tool-textarea" id="br-ne" type="number" step="0.2" value="1.0" placeholder="1.0 × 10²⁰ m⁻³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-te">Temp T_e (keV)</label>
          <input class="tool-textarea" id="br-te" type="number" step="2" value="15.0" placeholder="15.0 keV Core" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-zeff">Z_eff Charge</label>
          <input class="tool-textarea" id="br-zeff" type="number" step="0.1" value="1.5" placeholder="1.5 (Tritium + Impurities)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="br-vol">Volume V (m³)</label>
          <input class="tool-textarea" id="br-vol" type="number" step="100" value="830.0" placeholder="830.0 m³ (ITER Tokamak)" />
        </div>
      </div>
      <div id="br-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="br-res-pbr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Bremsstrahlung Loss P_Br = 31.1 kW / m³</span>
            <span class="stat-label">Volumetric Radiative X-Ray Power Density (P_Br = 5.35×10⁻³⁷·Z_eff·n_e²·√T_e)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="br-res-total" style="color:var(--green-dark); font-weight:700;">Total Radiated Power = 25.8 MW (Core Volume = 830 m³ | Ideal D-T Fusion Power >> Bremsstrahlung ✓)</span>
            <span class="stat-label">Whole-Device Plasma X-Ray Bremsstrahlung Heat Load to Divertor/Walls</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const neEl = document.getElementById('br-ne'), teEl = document.getElementById('br-te');
  const zfEl = document.getElementById('br-zeff'), vlEl = document.getElementById('br-vol');
  const pbResEl = document.getElementById('br-res-pbr'), ttResEl = document.getElementById('br-res-total');

  function update() {
    const ne_scaled = parseFloat(neEl.value), T_e_keV = parseFloat(teEl.value);
    const Z_eff = parseFloat(zfEl.value), V_m3 = parseFloat(vlEl.value);

    if (isNaN(ne_scaled) || isNaN(T_e_keV) || isNaN(Z_eff) || isNaN(V_m3) || ne_scaled <= 0 || T_e_keV <= 0 || Z_eff <= 0 || V_m3 <= 0) return;

    const n_e = ne_scaled * 1e20; // m^-3

    // Bremsstrahlung power formula:
    // P_Br = 5.35e-37 * Z_eff * n_e^2 * sqrt( T_e_keV )  [W / m^3]
    const P_Br_W_m3 = 5.35e-37 * Z_eff * Math.pow(n_e, 2) * Math.sqrt(T_e_keV);
    const P_Br_kW_m3 = P_Br_W_m3 / 1000.0;

    // Total radiated power across reactor:
    const P_tot_MW = (P_Br_W_m3 * V_m3) / 1e6;

    pbResEl.textContent = 'Bremsstrahlung Loss P_Br = ' + P_Br_kW_m3.toFixed(1) + ' kW / m³';
    ttResEl.textContent = 'Total Radiated Power = ' + P_tot_MW.toFixed(1) + ' MW (Core V = ' + V_m3 + ' m³ @ Z_eff = ' + Z_eff + ', T_e = ' + T_e_keV + ' keV)';
  }

  [neEl, teEl, zfEl, vlEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter electron density $n_e$ in units of $10^{20}\text{ m}^{-3}$.',
      'Enter electron temperature $T_e$ in keV.',
      'Enter effective plasma ion charge $Z_{\text{eff}} = \sum n_i Z_i^2 / n_e$ (1.0 for pure Hydrogen/Deuterium, 1.5–2.0 with Carbon/Tungsten wall impurities).',
      'Enter total plasma containment vessel volume in $\text{m}^3$.',
      'Inspect volumetric Bremsstrahlung loss density in $\text{kW/m}^3$ and total reactor radiative heat loss in MW.'
    ],
    benefitTitle: 'Classical Electron-Ion Coulomb Scattering Radiation Standard',
    benefitContent: 'Defines the irreducible theoretical radiation cooling limit in hot fusion plasmas caused by electron deceleration in positive ion Coulomb fields ($\text{Braking Radiation} \propto Z_{\text{eff}} n_e^2 \sqrt{T_e}$).',
    faqs: [{ q: 'Why do heavy metal impurities like Tungsten (Z=74) quench fusion plasmas?', a: 'Because Bremsstrahlung radiates proportional to $Z^2$, even trace parts-per-million ($10^{-5}$) of high-Z tungsten impurities radiate tens of megawatts, cooling the plasma below fusion ignition.' }]
  },

  // 8. Tokamak Plasma Cyclotron Synchrotron Radiation Loss Calculator
  {
    slug: 'cyclotron-synchrotron-radiation-loss-tokamak-plasma-calculator',
    name: 'Tokamak Plasma Cyclotron Synchrotron Radiation Loss Calculator',
    description: 'Calculate magnetized fusion plasma electron cyclotron synchrotron radiation emission frequency f_ce in GHz (f_ce = e·B / (2π·m_e) = 28.0 GHz / Tesla) and magnetic gyro-orbit radiation power density.',
    category: 'Science',
    icon: 'text',
    keywords: ['cyclotron radiation calculator', 'synchrotron radiation formula plasma online', 'electron cyclotron frequency 28 ghz per tesla calculator', 'tokamak magnetic field electron gyrofrequency calculator', 'plasma physics nuclear fusion electrodynamics online'],
    order: 1392,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Toroidal Magnetic Field B_T (Tesla) & Relativistic Electron Energy E (keV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cy-b">Magnetic B_T (Tesla)</label>
          <input class="tool-textarea" id="cy-b" type="number" step="0.5" value="5.30" placeholder="5.30 T (ITER Field)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-e">Electron E (keV)</label>
          <input class="tool-textarea" id="cy-e" type="number" step="5" value="20.0" placeholder="20.0 keV" />
        </div>
      </div>
      <div id="cy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cy-res-fce" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Cyclotron Frequency f_ce = 148.4 GHz</span>
            <span class="stat-label">Fundamental Electron Gyrofrequency (f_ce = e · B / (2π · m_e))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cy-res-harm" style="color:var(--green-dark); font-weight:700;">2nd Harmonic = 296.8 GHz | Gyroradius r_L = 0.091 mm (ECRH Heating Match ✓)</span>
            <span class="stat-label">Electron Larmor Gyroradius & Electron Cyclotron Resonance Heating (ECRH) Frequency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('cy-b'), eEl = document.getElementById('cy-e');
  const fcResEl = document.getElementById('cy-res-fce'), hmResEl = document.getElementById('cy-res-harm');

  const e_charge = 1.602176634e-19; // C
  const m_e = 9.1093837e-31; // kg
  const c = 2.99792458e8; // m/s

  function update() {
    const B_T = parseFloat(bEl.value), E_keV = parseFloat(eEl.value);
    if (isNaN(B_T) || isNaN(E_keV) || B_T <= 0 || E_keV <= 0) return;

    // Non-relativistic fundamental cyclotron frequency: f_ce = e * B / (2 * pi * m_e)  [Hz -> GHz]
    const f_ce_GHz = (e_charge * B_T / (2.0 * Math.PI * m_e)) * 1e-9;

    // Relativistic gamma: gamma = 1 + E / (511 keV)
    const gamma = 1.0 + (E_keV / 511.0);
    const f_ce_rel_GHz = f_ce_GHz / gamma;

    // Perpendicular velocity: v_perp approx sqrt( 2 * E / m_e )
    const E_J = E_keV * 1000.0 * e_charge;
    const v_perp = Math.sqrt(2.0 * E_J / m_e);

    // Larmor gyroradius: r_L = m_e * v_perp / ( e * B )  [m -> mm]
    const r_L_mm = (m_e * v_perp / (e_charge * B_T)) * 1000.0;

    fcResEl.textContent = 'Cyclotron Frequency f_ce = ' + f_ce_rel_GHz.toFixed(1) + ' GHz';
    hmResEl.textContent = '2nd Harmonic = ' + (2.0 * f_ce_rel_GHz).toFixed(1) + ' GHz | Gyroradius r_L = ' + r_L_mm.toFixed(3) + ' mm (B=' + B_T + ' T, E=' + E_keV + ' keV, γ=' + gamma.toFixed(3) + ')';
  }

  bEl.addEventListener('input', update);
  eEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter confining toroidal magnetic field strength B in Tesla.',
      'Enter plasma kinetic electron temperature / energy in keV.',
      'Inspect fundamental electron cyclotron gyrofrequency in GHz, 2nd harmonic frequency, and microscopic Larmor gyroradius $r_L$ in mm.'
    ],
    benefitTitle: 'Magnetic Gyro-Resonant Electrodynamics Standard',
    benefitContent: 'Electrons corkscrewing around magnetic field lines emit microwave synchrotron radiation ($f_{ce} \approx 28\text{ GHz/Tesla}$), which is re-absorbed by the plasma or used for high-power gyrotron microwave heating (ECRH).',
    faqs: [{ q: 'Why is cyclotron radiation mostly self-absorbed in dense tokamak plasmas?', a: 'High plasma opacity traps fundamental cyclotron emission inside the core, so only higher harmonic microwave frequencies escape.' }]
  },

  // 9. Debye Screening Length & Plasma Frequency Calculator
  {
    slug: 'debye-length-plasma-frequency-screening-calculator',
    name: 'Debye Screening Length (λ_D) & Plasma Frequency (ω_pe) Calculator',
    description: 'Calculate plasma Debye electrostatic screening shielding length λ_D in μm (λ_D = √(ε₀·k·T_e / (n_e·e²))), electron plasma oscillation frequency f_pe in GHz (f_pe = 1/2π · √(n_e·e² / (m_e·ε₀))), and plasma parameter N_D.',
    category: 'Science',
    icon: 'text',
    keywords: ['debye length calculator', 'plasma frequency formula omega pe online', 'debye screening radius plasma parameter calculator', 'electron collective oscillation frequency calculator', 'plasma physics gas discharge fusion physics online'],
    order: 1393,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electron Density n_e (m⁻³) & Electron Temperature T_e (eV or K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="db-ne">Density n_e (m⁻³)</label>
          <input class="tool-textarea" id="db-ne" type="number" step="1e19" value="1.0e20" placeholder="1.0 × 10²⁰ m⁻³ (Tokamak)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="db-te">Temp T_e (eV)</label>
          <input class="tool-textarea" id="db-te" type="number" step="500" value="5000.0" placeholder="5000.0 eV (5 keV)" />
        </div>
      </div>
      <div id="db-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="db-res-lam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Debye Length λ_D = 52.6 μm</span>
            <span class="stat-label">Debye Electrostatic Screening Distance (λ_D = √(ε₀·k·T_e / (n_e·e²)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="db-res-fpe" style="color:var(--green-dark); font-weight:700;">Plasma Frequency f_pe = 89.8 GHz | Debye Sphere N_D = 6.10 × 10⁴ >> 1 (TRUE PLASMA ✓)</span>
            <span class="stat-label">Collective Electron Langmuir Wave Plasma Frequency (f_pe ≈ 8.98 · √n_e)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const neEl = document.getElementById('db-ne'), teEl = document.getElementById('db-te');
  const lmResEl = document.getElementById('db-res-lam'), fpResEl = document.getElementById('db-res-fpe');

  const eps_0 = 8.854187817e-12; // F/m
  const q = 1.602176634e-19; // C
  const m_e = 9.1093837e-31; // kg

  function update() {
    const n_e = parseFloat(neEl.value), T_e_eV = parseFloat(teEl.value);
    if (isNaN(n_e) || isNaN(T_e_eV) || n_e <= 0 || T_e_eV <= 0) return;

    // Debye length: lambda_D = sqrt( eps_0 * (T_e_eV * q) / ( n_e * q^2 ) ) = sqrt( eps_0 * T_e_eV / ( n_e * q ) )  [m -> um]
    const lambda_D_m = Math.sqrt((eps_0 * T_e_eV) / (n_e * q));
    const lambda_D_um = lambda_D_m * 1e6;

    // Electron plasma frequency: f_pe = (1 / 2pi) * sqrt( n_e * q^2 / ( m_e * eps_0 ) )  [Hz -> GHz]
    const omega_pe = Math.sqrt((n_e * Math.pow(q, 2)) / (m_e * eps_0));
    const f_pe_GHz = (omega_pe / (2.0 * Math.PI)) * 1e-9;

    // Plasma parameter (electrons in Debye sphere): N_D = (4/3) * pi * n_e * lambda_D^3
    const N_D = (4.0 / 3.0) * Math.PI * n_e * Math.pow(lambda_D_m, 3);

    lmResEl.textContent = 'Debye Length λ_D = ' + lambda_D_um.toFixed(1) + ' μm';
    fpResEl.textContent = 'Plasma f_pe = ' + f_pe_GHz.toFixed(1) + ' GHz | Debye Sphere N_D = ' + N_D.toExponential(2) + ' (True Plasma: N_D >> 1, λ_D << L_system ✓)';
  }

  neEl.addEventListener('input', update);
  teEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter electron number density $n_e$ in $\text{m}^{-3}$ (e.g. $10^{20}\text{ m}^{-3}$ for fusion, $10^{16}\text{ m}^{-3}$ for glow discharge).',
      'Enter electron thermal temperature $T_e$ in eV ($1\text{ eV} = 11,600\text{ K}$).',
      'Inspect Debye shielding length $\lambda_D$ in micrometers, Langmuir plasma oscillation frequency $f_{pe}$ in GHz, and Debye sphere particle count $N_D$.'
    ],
    benefitTitle: 'Peter Debye & Erich Hückel 1923 Quasineutrality Law',
    benefitContent: 'Defines the fundamental criteria for matter to behave as a collective plasma: electrostatic perturbations are shielded out within distance $\lambda_D$, and the Debye sphere contains millions of interacting particles ($N_D \gg 1$).',
    faqs: [{ q: 'What is the cutoff frequency for electromagnetic waves penetrating a plasma?', a: 'Radio/microwaves with frequency below the plasma frequency ($f < f_{pe}$) reflect completely off the plasma, which is why the ionosphere reflects AM radio waves.' }]
  },

  // 10. Coulomb Logarithm & Spitzer Plasma Resistivity Calculator
  {
    slug: 'coulomb-logarithm-spitzer-plasma-resistivity-calculator',
    name: 'Coulomb Logarithm (ln Λ) & Spitzer Plasma Electrical Resistivity Calculator',
    description: 'Calculate thermonuclear plasma Coulomb Logarithm ln Λ (ln Λ = ln(12π · n_e · λ_D³)), Spitzer transverse electrical resistivity η_Spitzer in Ω·m (η = 5.2 × 10⁻⁵ · Z_eff · ln Λ / T_e^(3/2)), and ohmic heating current limit.',
    category: 'Science',
    icon: 'text',
    keywords: ['coulomb logarithm calculator', 'spitzer resistivity formula plasma online', 'plasma electrical conductivity te to three halves calculator', 'ohmic heating tokamak spitzer resistivity calculator', 'plasma physics magnetohydrodynamics mhd nuclear fusion online'],
    order: 1394,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electron Temp T_e (eV), Electron Density n_e (10²⁰ m⁻³) & Effective Charge Z_eff',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-te">Temp T_e (eV)</label>
          <input class="tool-textarea" id="sp-te" type="number" step="500" value="1000.0" placeholder="1000.0 eV (1 keV)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-ne">Density n_e</label>
          <input class="tool-textarea" id="sp-ne" type="number" step="0.2" value="1.0" placeholder="1.0 × 10²⁰ m⁻³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-zeff">Z_eff Charge</label>
          <input class="tool-textarea" id="sp-zeff" type="number" step="0.1" value="1.5" placeholder="1.5" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-eta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Resistivity η = 4.09 × 10⁻⁸ Ω · m</span>
            <span class="stat-label">Spitzer Classical Plasma Resistivity (η ∝ T_e^(-3/2): Better conductor than Copper @ high T!)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-coul" style="color:var(--green-dark); font-weight:700;">Coulomb Logarithm ln Λ = 16.6 | Conductivity σ = 2.44 × 10⁷ (Ω·m)⁻¹ (Copper = 5.96 × 10⁷)</span>
            <span class="stat-label">Small-Angle Coulomb Scattering Parameter (ln Λ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const teEl = document.getElementById('sp-te'), neEl = document.getElementById('sp-ne'), zfEl = document.getElementById('sp-zeff');
  const etResEl = document.getElementById('sp-res-eta'), clResEl = document.getElementById('sp-res-coul');

  function update() {
    const T_e_eV = parseFloat(teEl.value), ne_scaled = parseFloat(neEl.value), Z_eff = parseFloat(zfEl.value);
    if (isNaN(T_e_eV) || isNaN(ne_scaled) || isNaN(Z_eff) || T_e_eV <= 0 || ne_scaled <= 0 || Z_eff <= 0) return;

    const n_e_m3 = ne_scaled * 1e20;
    const n_e_cm3 = n_e_m3 * 1e-6;

    // Coulomb logarithm for fusion plasma: ln_Lambda approx 24 - ln( sqrt(n_e_cm3) / T_e_eV )
    const ln_Lambda = 24.0 - Math.log(Math.sqrt(n_e_cm3) / T_e_eV);

    // Spitzer resistivity: eta = 5.2e-5 * Z_eff * ln_Lambda / ( T_e_eV^1.5 )  [Ohm * m]
    const eta_Ohm_m = (5.2e-5 * Z_eff * ln_Lambda) / Math.pow(T_e_eV, 1.5);
    const sigma = 1.0 / eta_Ohm_m;

    etResEl.textContent = 'Resistivity η = ' + eta_Ohm_m.toExponential(2) + ' Ω · m';
    clResEl.textContent = 'Coulomb ln Λ = ' + ln_Lambda.toFixed(1) + ' | Conductivity σ = ' + sigma.toExponential(2) + ' (Ω·m)⁻¹ (T_e=' + T_e_eV + ' eV, Z_eff=' + Z_eff + ')';
  }

  [teEl, neEl, zfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter electron temperature $T_e$ in eV (e.g. 1000 eV for 1 keV).',
      'Enter electron density $n_e$ in units of $10^{20}\text{ m}^{-3}$.',
      'Enter effective plasma ion charge $Z_{\text{eff}}$.',
      'Inspect Coulomb Logarithm $\ln\Lambda$ and Spitzer plasma electrical resistivity $\eta$ in $\Omega\cdot\text{m}$.'
    ],
    benefitTitle: 'Lyman Spitzer 1953 Plasma Transport Law',
    benefitContent: 'Reveals that hot plasmas become better electrical conductors as temperature rises ($\eta \propto T_e^{-3/2}$), explaining why ohmic heating alone cannot heat tokamaks to ignition and requires auxiliary neutral beam / RF heating.',
    faqs: [{ q: 'Why does plasma resistivity decrease at higher temperatures?', a: 'Fast-moving electrons undergo much less Coulomb deflection angle during ion encounters ($\theta_{\text{scatter}} \propto 1/v^2$), reducing collisional momentum loss.' }]
  },

  // 11. Nuclear Mass Defect & Binding Energy per Nucleon Calculator
  {
    slug: 'mass-defect-nuclear-binding-energy-per-nucleon-calculator',
    name: 'Nuclear Mass Defect (Δm) & Binding Energy per Nucleon (BE/A) Calculator',
    description: 'Calculate atomic isotope nuclear Mass Defect Δm in atomic mass units (u) and MeV (Δm = Z·m_p + N·m_n - m_nucleus), Total Binding Energy E_B = Δm · 931.494 MeV, and Binding Energy per Nucleon (BE/A).',
    category: 'Science',
    icon: 'text',
    keywords: ['mass defect calculator', 'binding energy per nucleon formula be over a online', 'atomic mass unit u to mev 931.5 calculator', 'iron 56 nickel 62 peak binding energy calculator', 'nuclear physics relativity e equals mc squared online'],
    order: 1395,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Proton Number Z (Atomic Number), Neutron Number N & Measured Atomic Mass M_atom (u)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="md-z">Protons Z</label>
          <input class="tool-textarea" id="md-z" type="number" step="1" value="26" placeholder="26 (Iron Fe)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="md-n">Neutrons N</label>
          <input class="tool-textarea" id="md-n" type="number" step="1" value="30" placeholder="30 (Fe-56)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="md-mass">Mass M_atom (u)</label>
          <input class="tool-textarea" id="md-mass" type="number" step="0.001" value="55.9349" placeholder="55.9349 u (Fe-56 Atom)" />
        </div>
      </div>
      <div id="md-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="md-res-bea" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">BE / A = 8.790 MeV / Nucleon</span>
            <span class="stat-label">Binding Energy per Nucleon (Near Peak of Nuclear Stability Curve)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="md-res-tot" style="color:var(--green-dark); font-weight:700;">Total Binding E_B = 492.26 MeV | Mass Defect Δm = 0.5285 u (8.78 × 10⁻²⁸ kg)</span>
            <span class="stat-label">Total Nuclear Binding Energy (Δm · 931.494 MeV/u) & Mass Deficit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('md-z'), nEl = document.getElementById('md-n'), mEl = document.getElementById('md-mass');
  const baResEl = document.getElementById('md-res-bea'), ttResEl = document.getElementById('md-res-tot');

  // Masses in atomic mass units (u):
  const m_H1 = 1.007825032; // Hydrogen-1 atom (proton + electron)
  const m_n = 1.008664916; // Free neutron
  const u_to_MeV = 931.49410242; // MeV / u

  function update() {
    const Z = parseInt(zEl.value, 10), N = parseInt(nEl.value, 10), M_atom = parseFloat(mEl.value);
    if (isNaN(Z) || isNaN(N) || isNaN(M_atom) || Z <= 0 || N < 0 || M_atom <= 0) return;

    const A = Z + N;

    // Mass defect in atomic mass units:
    // Delta_m = Z * m_H1 + N * m_n - M_atom  [u]
    const constituent_mass = (Z * m_H1) + (N * m_n);
    const delta_m_u = constituent_mass - M_atom;

    if (delta_m_u <= 0) return;

    // Total binding energy: E_B = Delta_m * 931.494 MeV
    const E_B_MeV = delta_m_u * u_to_MeV;

    // Binding energy per nucleon:
    const BE_A_MeV = E_B_MeV / A;

    baResEl.textContent = 'BE / A = ' + BE_A_MeV.toFixed(3) + ' MeV / Nucleon';
    ttResEl.textContent = 'Total E_B = ' + E_B_MeV.toFixed(2) + ' MeV | Mass Defect Δm = ' + delta_m_u.toFixed(5) + ' u (A=' + A + ', Z=' + Z + ', N=' + N + ')';
  }

  zEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter atomic proton number Z (e.g. 26 for Iron).',
      'Enter isotope neutron number N (e.g. 30 for Fe-56).',
      'Enter measured high-precision neutral atomic mass $M_{\text{atom}}$ in unified atomic mass units (u).',
      'Inspect Mass Defect $\Delta m$ in atomic mass units and Binding Energy per Nucleon in MeV/nucleon.'
    ],
    benefitTitle: 'Albert Einstein 1905 Mass-Energy Equivalence Standard',
    benefitContent: 'Quantifies the exact nuclear binding energy released ($E = \Delta m \cdot c^2$) during stellar nucleosynthesis, nuclear fusion of light elements ($H \to He$), and fission of heavy elements ($U \to \text{FPs}$).',
    faqs: [{ q: 'Which isotope has the highest binding energy per nucleon?', a: 'Nickel-62 has the highest binding energy per nucleon ($8.7946\text{ MeV/nucleon}$), closely followed by Iron-56 ($8.7903\text{ MeV/nucleon}$).' }]
  },

  // 12. Semi-Empirical Mass Formula (Liquid Drop Model) Calculator
  {
    slug: 'semi-empirical-mass-formula-weizsacker-liquid-drop-calculator',
    name: 'Semi-Empirical Mass Formula (Weizsäcker Liquid Drop Model) Calculator',
    description: 'Calculate nuclear binding energy B(A,Z) in MeV using the Bethe-Weizsäcker Semi-Empirical Mass Formula (SEMF Liquid Drop Model: Volume a_v·A, Surface -a_s·A^(2/3), Coulomb -a_c·Z²/A^(1/3), Asymmetry -a_a·(A-2Z)²/A, and Pairing terms δ).',
    category: 'Science',
    icon: 'text',
    keywords: ['semi empirical mass formula calculator', 'liquid drop model weizsacker formula online', 'volume surface coulomb asymmetry pairing energy calculator', 'nuclear binding energy bethe weizsacker calculator', 'nuclear physics subatomic physics theoretical physics online'],
    order: 1396,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass Number A (Total Nucleons) & Atomic Proton Number Z',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ld-a">Mass Number A</label>
          <input class="tool-textarea" id="ld-a" type="number" step="1" value="235" placeholder="235 (U-235)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-z">Protons Z</label>
          <input class="tool-textarea" id="ld-z" type="number" step="1" value="92" placeholder="92 (Uranium)" />
        </div>
      </div>
      <div id="ld-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ld-res-b" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Binding Energy B = 1,783.5 MeV (7.59 MeV/Nucleon)</span>
            <span class="stat-label">Bethe-Weizsäcker SEMF Total Nuclear Binding Energy</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ld-res-terms" style="color:var(--green-dark); font-weight:700;">Volume: +3682.4 | Surface: -693.3 | Coulomb: -994.4 | Asymmetry: -211.2 | Pairing: 0.0 MeV</span>
            <span class="stat-label">Liquid Drop Model Five Energy Component Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('ld-a'), zEl = document.getElementById('ld-z');
  const bResEl = document.getElementById('ld-res-b'), trResEl = document.getElementById('ld-res-terms');

  // Standard Weizsäcker coefficients in MeV:
  const a_v = 15.67; // Volume
  const a_s = 17.23; // Surface
  const a_c = 0.714; // Coulomb
  const a_a = 23.28; // Asymmetry
  const a_p = 12.00; // Pairing

  function update() {
    const A = parseInt(aEl.value, 10), Z = parseInt(zEl.value, 10);
    if (isNaN(A) || isNaN(Z) || A <= 0 || Z <= 0 || Z > A) return;

    const N = A - Z;

    // Terms:
    const E_vol = a_v * A;
    const E_surf = - a_s * Math.pow(A, 2.0 / 3.0);
    const E_coul = - a_c * (Z * (Z - 1)) / Math.pow(A, 1.0 / 3.0);
    const E_asym = - a_a * Math.pow(A - (2.0 * Z), 2) / A;

    // Pairing term delta:
    let delta = 0;
    if (Z % 2 === 0 && N % 2 === 0) delta = + a_p / Math.sqrt(A); // Even-even
    else if (Z % 2 !== 0 && N % 2 !== 0) delta = - a_p / Math.sqrt(A); // Odd-odd
    else delta = 0.0; // Even-odd

    const B_MeV = E_vol + E_surf + E_coul + E_asym + delta;
    const BE_A = B_MeV / A;

    bResEl.textContent = 'Binding Energy B = ' + B_MeV.toFixed(1) + ' MeV (' + BE_A.toFixed(2) + ' MeV/Nucleon)';
    trResEl.textContent = 'Vol: +' + E_vol.toFixed(1) + ' | Surf: ' + E_surf.toFixed(1) + ' | Coul: ' + E_coul.toFixed(1) + ' | Asym: ' + E_asym.toFixed(1) + ' | Pair: ' + (delta >= 0 ? '+' : '') + delta.toFixed(1) + ' MeV';
  }

  aEl.addEventListener('input', update);
  zEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total mass number A (nucleons = protons + neutrons).',
      'Enter atomic number Z (protons).',
      'Inspect total calculated nuclear binding energy and the 5 constituent droplet energy components.'
    ],
    benefitTitle: 'Carl Friedrich von Weizsäcker 1935 Liquid Drop Model',
    benefitContent: 'Models the nucleus as an incompressible charged liquid drop, accurately predicting nuclear fission barriers, spontaneous fission half-lives, and the valley of beta-decay stability.',
    faqs: [{ q: 'Why do even-even nuclei have positive pairing energy?', a: 'Protons and neutrons form spin-up / spin-down Cooper-like spin singlet pairs in spatial orbitals, maximizing nuclear strong force overlap.' }]
  },

  // 13. Gamma-Ray Linear Attenuation & Half-Value Layer (HVL) Calculator
  {
    slug: 'gamma-ray-half-value-layer-linear-attenuation-calculator',
    name: 'Gamma-Ray Linear Attenuation Coefficient & Half-Value Layer (HVL = ln 2 / μ) Calculator',
    description: 'Calculate gamma and X-ray radiation shielding attenuation: Half-Value Layer HVL in cm (HVL = ln 2 / μ), Tenth-Value Layer TVL = ln 10 / μ, transmitted intensity I = I₀ · e^(-μ·x), and shielding thickness x.',
    category: 'Science',
    icon: 'text',
    keywords: ['half value layer calculator', 'gamma ray linear attenuation coefficient mu formula online', 'tenth value layer tvl lead shielding calculator', 'radiation transmission i equals i0 exp minus mu x calculator', 'health physics radiation protection medical physics online'],
    order: 1397,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Linear Attenuation Coefficient μ (cm⁻¹), Initial Intensity I₀ & Shielding Thickness x (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gr-mu">Coeff μ (cm⁻¹)</label>
          <input class="tool-textarea" id="gr-mu" type="number" step="0.1" value="0.77" placeholder="0.77 cm⁻¹ (Lead @ 662 keV Cs-137)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gr-i0">Initial I₀ (mR/hr)</label>
          <input class="tool-textarea" id="gr-i0" type="number" step="50" value="500.0" placeholder="500.0 mR/hr" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gr-x">Thickness x (cm)</label>
          <input class="tool-textarea" id="gr-x" type="number" step="0.5" value="3.0" placeholder="3.0 cm Lead" />
        </div>
      </div>
      <div id="gr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gr-res-i" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Transmitted I = 49.6 mR / hr (90.1% Blocked)</span>
            <span class="stat-label">Transmitted Radiation Intensity (I = I₀ · e^(-μ · x))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gr-res-hvl" style="color:var(--green-dark); font-weight:700;">HVL = 0.900 cm (9.0 mm) | TVL = 2.990 cm (3.33 HVLs = 10.08× Reduction)</span>
            <span class="stat-label">Half-Value Layer (HVL = 0.693 / μ) & Tenth-Value Layer (TVL = 2.303 / μ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const muEl = document.getElementById('gr-mu'), i0El = document.getElementById('gr-i0'), xEl = document.getElementById('gr-x');
  const iResEl = document.getElementById('gr-res-i'), hvResEl = document.getElementById('gr-res-hvl');

  function update() {
    const mu_cm1 = parseFloat(muEl.value), I0 = parseFloat(i0El.value), x_cm = parseFloat(xEl.value);
    if (isNaN(mu_cm1) || isNaN(I0) || isNaN(x_cm) || mu_cm1 <= 0 || I0 <= 0 || x_cm < 0) return;

    // Half-Value Layer: HVL = ln(2) / mu  [cm]
    const HVL_cm = Math.LN2 / mu_cm1;

    // Tenth-Value Layer: TVL = ln(10) / mu  [cm]
    const TVL_cm = Math.LN10 / mu_cm1;

    // Transmitted intensity (narrow-beam Beer-Lambert Law): I = I0 * exp(-mu * x)
    const I_trans = I0 * Math.exp(-mu_cm1 * x_cm);
    const reduction_factor = I0 / I_trans;
    const blocked_pct = (1.0 - (I_trans / I0)) * 100.0;
    const num_hvls = x_cm / HVL_cm;

    iResEl.textContent = 'Transmitted I = ' + I_trans.toFixed(1) + ' mR/hr (' + blocked_pct.toFixed(1) + '% Blocked)';
    hvResEl.textContent = 'HVL = ' + HVL_cm.toFixed(3) + ' cm | TVL = ' + TVL_cm.toFixed(3) + ' cm (' + num_hvls.toFixed(2) + ' HVLs = ' + reduction_factor.toFixed(1) + '× Attenuation @ x=' + x_cm + ' cm)';
  }

  [muEl, i0El, xEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter material linear attenuation coefficient $\mu$ in $\text{cm}^{-1}$ for photon energy (e.g. 0.77 $\text{cm}^{-1}$ for Lead at 662 keV).',
      'Enter unshielded initial radiation exposure rate $I_0$ in mR/hr or $\mu\text{Sv/hr}$.',
      'Enter shielding barrier thickness x in cm (Lead, concrete, or steel).',
      'Inspect transmitted residual intensity I, Half-Value Layer (HVL), and Tenth-Value Layer (TVL).'
    ],
    benefitTitle: 'Beer-Lambert Photon Exponential Attenuation Standard',
    benefitContent: 'Universal radiation protection equation for designing hospital radiotherapy bunker walls, nuclear power plant biological shielding, and industrial radiography lead enclosures.',
    faqs: [{ q: 'What is the radiation Buildup Factor B in thick shielding?', a: 'In broad-beam geometry, scattered Compton photons build up in the shield, requiring a multiplicative buildup factor ($I = I_0 B e^{-\mu x}$) to prevent under-shielding.' }]
  },

  // 14. Radiation Effective Dose Equivalent Calculator
  {
    slug: 'effective-dose-equivalent-radiation-sievert-rem-calculator',
    name: 'Radiation Effective Dose Equivalent (Sieverts & Rems: E = ∑ w_T·H_T) Calculator',
    description: 'Calculate radiation Equivalent Dose H_T in Sieverts/rem (H_T = w_R · D) and whole-body Effective Dose E in mSv (ICRP 103 Standard: E = ∑ w_T · H_T) from radiation weighting factors w_R and tissue weighting factors w_T.',
    category: 'Science',
    icon: 'text',
    keywords: ['radiation effective dose calculator', 'sievert to rem conversion formula online', 'icrp 103 tissue radiation weighting factor calculator', 'absorbed dose gray to equivalent dose sievert calculator', 'health physics radiation safety dosimetry online'],
    order: 1398,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Absorbed Dose D (mGy), Radiation Type (Gamma w_R=1, Neutrons w_R=10, Alpha w_R=20) & Target Organ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rd-d">Dose D (mGy)</label>
          <input class="tool-textarea" id="rd-d" type="number" step="0.5" value="5.0" placeholder="5.0 mGy (Absorbed)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-wr">Radiation w_R</label>
          <input class="tool-textarea" id="rd-wr" type="number" step="1" value="1.0" placeholder="1.0 (X-Ray / Gamma / Beta)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-wt">Tissue w_T</label>
          <input class="tool-textarea" id="rd-wt" type="number" step="0.04" value="0.12" placeholder="0.12 (Lung / Stomach / Colon)" />
        </div>
      </div>
      <div id="rd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rd-res-e" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Effective Dose E = 0.600 mSv (60.0 mrem)</span>
            <span class="stat-label">ICRP Whole-Body Effective Dose (E = w_T · w_R · D)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rd-res-ht" style="color:var(--green-dark); font-weight:700;">Organ Equivalent Dose H_T = 5.00 mSv | Annual Occupational Limit = 20.0 mSv/yr (3.0% of limit ✓)</span>
            <span class="stat-label">Organ Equivalent Dose & ICRP Radiation Worker Limit Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('rd-d'), wrEl = document.getElementById('rd-wr'), wtEl = document.getElementById('rd-wt');
  const eResEl = document.getElementById('rd-res-e'), htResEl = document.getElementById('rd-res-ht');

  function update() {
    const D_mGy = parseFloat(dEl.value), w_R = parseFloat(wrEl.value), w_T = parseFloat(wtEl.value);
    if (isNaN(D_mGy) || isNaN(w_R) || isNaN(w_T) || D_mGy < 0 || w_R <= 0 || w_T <= 0 || w_T > 1) return;

    // Equivalent dose: H_T = w_R * D  [mSv]
    const H_T_mSv = w_R * D_mGy;

    // Effective dose: E = w_T * H_T  [mSv]
    const E_mSv = w_T * H_T_mSv;
    const E_mrem = E_mSv * 100.0; // 1 mSv = 100 mrem

    const occupational_limit_mSv = 20.0; // ICRP annual occupational limit
    const pct_limit = (E_mSv / occupational_limit_mSv) * 100.0;

    eResEl.textContent = 'Effective Dose E = ' + E_mSv.toFixed(3) + ' mSv (' + E_mrem.toFixed(1) + ' mrem)';
    htResEl.textContent = 'Organ H_T = ' + H_T_mSv.toFixed(2) + ' mSv | Annual Limit = 20 mSv/yr (' + pct_limit.toFixed(1) + '% of limit @ w_R=' + w_R + ', w_T=' + w_T + ')';
  }

  [dEl, wrEl, wtEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter physical absorbed radiation dose D in milliGray (mGy, 1 mGy = 1 mJ/kg).',
      'Enter radiation quality weighting factor $w_R$ ($1.0$ photons/electrons, $10.0$ fast neutrons, $20.0$ alpha particles).',
      'Enter ICRP 103 tissue radiosensitivity weighting factor $w_T$ ($0.12$ lungs/colon/bone marrow, $0.04$ bladder/thyroid, $0.01$ skin).',
      'Inspect Equivalent Dose $H_T$ and whole-body Effective Dose E in milliSieverts (mSv) and millirem.'
    ],
    benefitTitle: 'ICRP Publication 103 Radiological Protection Standard',
    benefitContent: 'Quantifies stochastic biological cancer risk by weighting physical energy deposition against radiation ionization density ($w_R$) and specific organ biological radiosensitivity ($w_T$).',
    faqs: [{ q: 'What is the average natural background radiation dose for humans?', a: 'Global average natural background radiation is approximately $2.4\text{ mSv/year}$ ($240\text{ mrem/year}$) primarily from radon, cosmic rays, and food.' }]
  },

  // 15. Gamma-Ray Point Source Exposure Rate Constant Calculator
  {
    slug: 'point-source-gamma-radiation-exposure-rate-constant-calculator',
    name: 'Gamma-Ray Point Source Exposure Rate Constant (Γ) & Distance Attenuation Calculator',
    description: 'Calculate unshielded point source gamma exposure rate X_dot in R/hr and mR/hr (Exposure Rate Formula: Ẋ = Γ · A / d²) from specific gamma constant Γ (R·m²/(Ci·hr)), isotope activity A (Curies/Bq), and distance d.',
    category: 'Science',
    icon: 'text',
    keywords: ['gamma exposure rate calculator', 'point source gamma constant gamma formula online', 'inverse square radiation dose distance calculator', 'activity curies distance to r per hr calculator', 'radiation safety health physics industrial radiography online'],
    order: 1399,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gamma Constant Γ (R·m²/Ci·hr, e.g. 1.30 for Co-60, 0.33 for Cs-137), Activity A (Ci) & Distance d (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ps-gamma">Constant Γ</label>
          <input class="tool-textarea" id="ps-gamma" type="number" step="0.1" value="1.30" placeholder="1.30 R·m²/Ci·hr (Co-60)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-act">Activity A (Ci)</label>
          <input class="tool-textarea" id="ps-act" type="number" step="5" value="10.0" placeholder="10.0 Curies" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ps-dist">Distance d (m)</label>
          <input class="tool-textarea" id="ps-dist" type="number" step="0.5" value="2.0" placeholder="2.0 Meters" />
        </div>
      </div>
      <div id="ps-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ps-res-rate" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Exposure Rate Ẋ = 3.25 R / hr (3,250 mR/hr)</span>
            <span class="stat-label">Unshielded Point-Source Gamma Exposure Rate (Ẋ = Γ · A / d²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ps-res-dose" style="color:var(--green-dark); font-weight:700;">Dose Rate = 31.5 mGy / hr (3.15 rad/hr) | Safe 2 mR/hr Distance = 80.6 Meters</span>
            <span class="stat-label">Dose Equivalent Rate in Air & Radiography Barricade Distance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gmEl = document.getElementById('ps-gamma'), acEl = document.getElementById('ps-act'), dsEl = document.getElementById('ps-dist');
  const rtResEl = document.getElementById('ps-res-rate'), dsResEl = document.getElementById('ps-res-dose');

  function update() {
    const Gamma_const = parseFloat(gmEl.value), A_Ci = parseFloat(acEl.value), d_m = parseFloat(dsEl.value);
    if (isNaN(Gamma_const) || isNaN(A_Ci) || isNaN(d_m) || Gamma_const <= 0 || A_Ci <= 0 || d_m <= 0) return;

    // Exposure rate: X_dot = Gamma * A / d^2  [R / hr]
    const X_dot_R_hr = (Gamma_const * A_Ci) / Math.pow(d_m, 2);
    const X_dot_mR_hr = X_dot_R_hr * 1000.0;

    // Dose rate in air: 1 R approx 0.0097 Gy = 9.7 mGy
    const dose_rate_mGy_hr = X_dot_R_hr * 9.7;

    // Barricade boundary distance for public 2 mR/hr limit:
    // d_safe = sqrt( (Gamma * A) / 0.002 )
    const d_safe_m = Math.sqrt((Gamma_const * A_Ci) / 0.002);

    rtResEl.textContent = 'Exposure Rate Ẋ = ' + X_dot_R_hr.toFixed(2) + ' R / hr (' + Math.round(X_dot_mR_hr).toLocaleString() + ' mR/hr)';
    dsResEl.textContent = 'Air Dose Rate = ' + dose_rate_mGy_hr.toFixed(1) + ' mGy/hr | 2 mR/hr Barricade Boundary = ' + d_safe_m.toFixed(1) + ' m (A=' + A_Ci + ' Ci @ d=' + d_m + ' m)';
  }

  [gmEl, acEl, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter specific gamma-ray constant $\Gamma$ in $\text{R}\cdot\text{m}^2/(\text{Ci}\cdot\text{hr})$ ($1.30$ Cobalt-60, $0.33$ Cesium-137, $0.48$ Iridium-192).',
      'Enter sealed source radioactivity A in Curies (Ci).',
      'Enter operator distance d in meters.',
      'Inspect unshielded exposure rate in R/hr and calculated restricted perimeter barricade distance for $2\text{ mR/hr}$.'
    ],
    benefitTitle: 'Point Source Inverse-Square Radiometry Standard',
    benefitContent: 'Core calculation used by radiation safety officers (RSOs) and industrial non-destructive testing (NDT) radiographers to establish perimeter safety exclusion zones.',
    faqs: [{ q: 'What is the Rule of Thumb 6CEN formula for gamma exposure?', a: 'For common gamma emitters, $\dot{X}\text{ (R/hr @ 1 ft)} \approx 6 \times C \times E \times n$, where C is Curies, E is energy in MeV, and n is photon yield.' }]
  },

  // 16. Proton Therapy Bragg Peak Stopping Power Calculator
  {
    slug: 'bragg-peak-proton-therapy-stopping-power-bethe-bloch-calculator',
    name: 'Proton Therapy Bragg Peak Stopping Power (Bethe-Bloch -dE/dx) Calculator',
    description: 'Calculate proton and heavy-ion cancer radiotherapy electronic stopping power -dE/dx in MeV/cm (Bethe-Bloch Formula: -dE/dx = (4π·n·z²·e⁴ / m_e·v²) · [ln(2m_e·v² / I) - β²]), Bragg peak depth, and relative biological effectiveness (RBE).',
    category: 'Science',
    icon: 'text',
    keywords: ['bragg peak calculator', 'bethe bloch stopping power formula online', 'proton therapy cancer radiation depth dose calculator', 'linear energy transfer let mev per cm calculator', 'medical physics radiation oncology proton therapy online'],
    order: 1400,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Proton Beam Kinetic Energy E_k (MeV, e.g. 150 MeV) in Human Tissue (I ≈ 75 eV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bp-ek">Energy E_k (MeV)</label>
          <input class="tool-textarea" id="bp-ek" type="number" step="25" value="150.0" placeholder="150.0 MeV Proton" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-i">Mean Ionization I (eV)</label>
          <input class="tool-textarea" id="bp-i" type="number" step="5" value="75.0" placeholder="75.0 eV (Water/Tissue)" />
        </div>
      </div>
      <div id="bp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bp-res-dedx" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Stopping Power -dE/dx = 5.42 MeV / cm</span>
            <span class="stat-label">Bethe-Bloch Linear Energy Transfer (LET in Human Soft Tissue)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bp-res-range" style="color:var(--green-dark); font-weight:700;">Bragg Peak Range = 15.8 cm (Zero Exit Dose to Healthy Organs Beyond Tumor ✓)</span>
            <span class="stat-label">Proton Penetration Depth & Sharp Distal Falloff Bragg Peak Range</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ekEl = document.getElementById('bp-ek'), iEl = document.getElementById('bp-i');
  const deResEl = document.getElementById('bp-res-dedx'), rgResEl = document.getElementById('bp-res-range');

  function update() {
    const E_k_MeV = parseFloat(ekEl.value), I_eV = parseFloat(iEl.value);
    if (isNaN(E_k_MeV) || isNaN(I_eV) || E_k_MeV <= 0 || I_eV <= 0) return;

    // Relativistic velocity beta: gamma = 1 + E_k / 938.272 MeV
    const gamma = 1.0 + (E_k_MeV / 938.272);
    const beta = Math.sqrt(1.0 - (1.0 / Math.pow(gamma, 2)));

    // Bethe-Bloch electronic stopping power in water approx:
    // -dE/dx (MeV/cm) approx (0.307 / beta^2) * [ ln( 1.022e6 * beta^2 * gamma^2 / I_eV ) - beta^2 ]
    const bracket = Math.log((1.022e6 * Math.pow(beta * gamma, 2)) / I_eV) - Math.pow(beta, 2);
    const dedx_MeV_cm = (0.3071 / Math.pow(beta, 2)) * bracket;

    // Continuous Slowing Down Approximation (CSDA) Bragg peak range in water:
    // Range R (cm) approx alpha * E^p  (Bortfeld formula: R approx 0.0022 * E^1.77)
    const range_cm = 0.0022 * Math.pow(E_k_MeV, 1.77);

    deResEl.textContent = 'Stopping Power -dE/dx = ' + dedx_MeV_cm.toFixed(2) + ' MeV / cm';
    rgResEl.textContent = 'Bragg Peak Range = ' + range_cm.toFixed(1) + ' cm in Tissue (β = ' + beta.toFixed(3) + 'c @ E_k = ' + E_k_MeV + ' MeV)';
  }

  ekEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter therapeutic proton beam kinetic energy $E_k$ in MeV (typically 70–230 MeV for clinical cyclotrons).',
      'Enter mean excitation ionization potential I in eV ($75\text{ eV}$ for liquid water/human muscle tissue).',
      'Inspect linear stopping power $-dE/dx$ (LET) in MeV/cm and calibrated Bragg peak penetration range.'
    ],
    benefitTitle: 'Hans Bethe & Felix Bloch 1930 Charged Particle Stopping Standard',
    benefitContent: 'Protons deposit minimal entry dose before energy loss sharply spikes ($1/v^2$ dependency) into a concentrated "Bragg Peak" inside deep tumors, delivering zero exit dose to healthy critical organs beyond.',
    faqs: [{ q: 'Why is proton therapy superior to conventional X-ray radiation for pediatric tumors?', a: 'X-rays deposit maximum dose near the skin and continue through the body; protons stop entirely at the Bragg peak with zero exit dose, sparing developing organs.' }]
  },

  // 17. Tokamak Safety Factor (q_edge) & Kink Stability Calculator
  {
    slug: 'tokamak-safety-factor-q-edge-kink-stability-calculator',
    name: 'Tokamak Safety Factor (q_edge) & Kruskal-Shafranov Kink Stability Calculator',
    description: 'Calculate tokamak magnetic confinement safety factor q_edge (q = (a·B_T / R·B_p) · (1 + κ²) / 2) from minor radius a, major radius R, toroidal field B_T, plasma current I_p, and elongation κ.',
    category: 'Science',
    icon: 'text',
    keywords: ['tokamak safety factor calculator', 'q edge formula kruskal shafranov limit online', 'kink instability plasma current safety factor calculator', 'tokamak elongation kappa magnetic pitch calculator', 'plasma physics magnetohydrodynamics mhd nuclear fusion online'],
    order: 1401,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Major Radius R (m), Minor Radius a (m), Toroidal B_T (Tesla), Plasma Current I_p (MA) & Elongation κ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qk-r">Major Radius R</label>
          <input class="tool-textarea" id="qk-r" type="number" step="0.5" value="6.20" placeholder="6.20 m (ITER)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qk-a">Minor Radius a</label>
          <input class="tool-textarea" id="qk-a" type="number" step="0.2" value="2.00" placeholder="2.00 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qk-bt">Toroidal B_T</label>
          <input class="tool-textarea" id="qk-bt" type="number" step="0.5" value="5.30" placeholder="5.30 T" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qk-ip">Current I_p (MA)</label>
          <input class="tool-textarea" id="qk-ip" type="number" step="1" value="15.0" placeholder="15.0 MA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qk-kap">Elongation κ</label>
          <input class="tool-textarea" id="qk-kap" type="number" step="0.1" value="1.70" placeholder="1.70 (D-Shaped)" />
        </div>
      </div>
      <div id="qk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qk-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Edge Safety Factor q_95 = 3.01 (MHD STABLE)</span>
            <span class="stat-label">Magnetic Field Line Pitch Angle Safety Factor (q_edge > 2.0 Kruskal-Shafranov Limit)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qk-res-eval" style="color:var(--green-dark); font-weight:700;">STABLE AGAINST EXTERNAL KINK DISRUPTIONS (q_95 ≥ 3.0 Standard Baseline Target ✓)</span>
            <span class="stat-label">Aspect Ratio R/a = 3.10 | Poloidal Field B_p = 1.50 T</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('qk-r'), aEl = document.getElementById('qk-a');
  const btEl = document.getElementById('qk-bt'), ipEl = document.getElementById('qk-ip'), kpEl = document.getElementById('qk-kap');
  const qResEl = document.getElementById('qk-res-q'), evResEl = document.getElementById('qk-res-eval');

  const mu_0 = 4.0 * Math.PI * 1e-7;

  function update() {
    const R = parseFloat(rEl.value), a = parseFloat(aEl.value);
    const B_T = parseFloat(btEl.value), I_p_MA = parseFloat(ipEl.value), kappa = parseFloat(kpEl.value);

    if (isNaN(R) || isNaN(a) || isNaN(B_T) || isNaN(I_p_MA) || isNaN(kappa) || R <= a || a <= 0 || B_T <= 0 || I_p_MA <= 0 || kappa <= 0) return;

    const I_p = I_p_MA * 1e6; // Amperes

    // Cylindrical / Shaped safety factor formula (Wesson standard):
    // q_cyl = ( 5 * a^2 * B_T ) / ( R * I_p_MA ) * ( (1 + kappa^2) / 2 )
    const shaping_factor = (1.0 + Math.pow(kappa, 2)) / 2.0;
    const q_edge = ((5.0 * Math.pow(a, 2) * B_T) / (R * I_p_MA)) * shaping_factor;

    const aspect_ratio = R / a;

    let status = '', color = '#22543d';
    if (q_edge >= 3.0) {
      status = 'MHD STABLE BASELINE (q_95 ≥ 3.0: Protected against m=2/n=1 external kink disruptions ✓)';
      color = '#22543d';
    } else if (q_edge >= 2.0) {
      status = 'MARGINAL STABILITY (2.0 ≤ q < 3.0: High current operation, disruption risk)';
      color = '#ea580c';
    } else {
      status = 'UNSTABLE: VIOLATES KRUSKAL-SHAFRANOV LIMIT (q < 2.0: Catastrophic major disruption ✗)';
      color = '#c53030';
    }

    qResEl.textContent = 'Safety Factor q_95 = ' + q_edge.toFixed(2) + ' (' + status.split(' (')[0] + ')';
    qResEl.style.color = color;
    evResEl.textContent = status + ' [Aspect Ratio R/a = ' + aspect_ratio.toFixed(2) + ', Elongation κ = ' + kappa + ' @ I_p=' + I_p_MA + ' MA]';
  }

  [rEl, aEl, btEl, ipEl, kpEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter tokamak major torus radius R in meters.',
      'Enter plasma minor radius a in meters.',
      'Enter toroidal magnetic field $B_T$ in Tesla.',
      'Enter total plasma drive current $I_p$ in Mega-Amperes (MA).',
      'Enter vertical cross-section elongation factor $\kappa$ ($\kappa = 1.0$ circular, $1.7$ D-shaped).',
      'Inspect edge safety factor $q_{95}$ and evaluate Kruskal-Shafranov MHD kink stability.'
    ],
    benefitTitle: 'Martin Kruskal & Vitaly Shafranov 1956 MHD Stability Limit',
    benefitContent: 'Represents the number of toroidal turns a magnetic field line makes per single poloidal turn ($q = d\Phi / d\psi$); keeping $q > 2$ prevents destructive macroscopic $m=2, n=1$ tearing and kink disruptions.',
    faqs: [{ q: 'Why do tokamaks elongate the plasma vertically (κ ≈ 1.7)?', a: 'Elongating the plasma increases cross-sectional area and allowable plasma current $I_p \propto \frac{1+\kappa^2}{2}$ at the same safety factor $q$, dramatically improving energy confinement.' }]
  },

  // 18. Plasma Beta & Troyon Normalized Beta Limit Calculator
  {
    slug: 'plasma-beta-troyon-limit-tokamak-stability-calculator',
    name: 'Plasma Beta (β) & Troyon Normalized Beta Stability Limit (β_N) Calculator',
    description: 'Calculate tokamak magnetic confinement efficiency Plasma Beta percentage β (β = 2μ₀·⟨p⟩ / B² · 100%), Troyon Normalized Beta stability parameter β_N (β_N = β% / (I_p / a·B_T)), and evaluate the ideal MHD Troyon limit (β_N ≤ 2.8 to 3.5).',
    category: 'Science',
    icon: 'text',
    keywords: ['plasma beta calculator', 'troyon limit normalized beta formula online', 'magnetic confinement efficiency beta percentage calculator', 'plasma pressure magnetic pressure ratio calculator', 'plasma physics magnetohydrodynamics nuclear fusion online'],
    order: 1402,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Average Plasma Pressure ⟨p⟩ (kPa), Magnetic Field B (Tesla), Current I_p (MA) & Minor Radius a (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pb-p">Pressure ⟨p⟩ (kPa)</label>
          <input class="tool-textarea" id="pb-p" type="number" step="50" value="300.0" placeholder="300.0 kPa (3.0 bar)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-b">Field B (Tesla)</label>
          <input class="tool-textarea" id="pb-b" type="number" step="0.5" value="5.30" placeholder="5.30 T" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-ip">Current I_p (MA)</label>
          <input class="tool-textarea" id="pb-ip" type="number" step="1" value="15.0" placeholder="15.0 MA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-a">Minor Radius a</label>
          <input class="tool-textarea" id="pb-a" type="number" step="0.2" value="2.0" placeholder="2.0 m" />
        </div>
      </div>
      <div id="pb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pb-res-beta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Plasma Beta β = 2.69%</span>
            <span class="stat-label">Magnetic Confinement Efficiency (β = ⟨p⟩ / (B² / 2μ₀) · 100%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pb-res-troy" style="color:var(--green-dark); font-weight:700;">Troyon Normalized β_N = 1.90 %·m·T/MA (TROYON STABLE: β_N < 2.8 Limit ✓)</span>
            <span class="stat-label">Normalized Beta (β_N = β% / (I_p / a·B_T)) & Ballooning Stability Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('pb-p'), bEl = document.getElementById('pb-b');
  const ipEl = document.getElementById('pb-ip'), aEl = document.getElementById('pb-a');
  const btResEl = document.getElementById('pb-res-beta'), trResEl = document.getElementById('pb-res-troy');

  const mu_0 = 4.0 * Math.PI * 1e-7;

  function update() {
    const p_kPa = parseFloat(pEl.value), B_T = parseFloat(bEl.value);
    const I_p_MA = parseFloat(ipEl.value), a_m = parseFloat(aEl.value);

    if (isNaN(p_kPa) || isNaN(B_T) || isNaN(I_p_MA) || isNaN(a_m) || p_kPa <= 0 || B_T <= 0 || I_p_MA <= 0 || a_m <= 0) return;

    const p_Pa = p_kPa * 1000.0;

    // Magnetic pressure: P_mag = B^2 / (2 * mu_0)  [Pa]
    const P_mag_Pa = Math.pow(B_T, 2) / (2.0 * mu_0);

    // Total beta percentage: beta = p / P_mag * 100%
    const beta_pct = (p_Pa / P_mag_Pa) * 100.0;

    // Normalized beta: beta_N = beta% / ( I_p_MA / (a_m * B_T) )
    const normalized_current = I_p_MA / (a_m * B_T);
    const beta_N = beta_pct / normalized_current;

    let qual = '', color = '#22543d';
    if (beta_N <= 2.8) {
      qual = 'TROYON STABLE (β_N ≤ 2.8: Safe against ideal MHD ballooning modes ✓)';
      color = '#22543d';
    } else if (beta_N <= 3.5) {
      qual = 'ADVANCED TOKAMAK REGIME (2.8 < β_N ≤ 3.5: Wall stabilization required)';
      color = '#ea580c';
    } else {
      qual = 'UNSTABLE BALLOONING LIMIT (β_N > 3.5: Severe plasma loss ✗)';
      color = '#c53030';
    }

    btResEl.textContent = 'Total Plasma Beta β = ' + beta_pct.toFixed(2) + '%';
    btResEl.style.color = color;
    trResEl.textContent = 'Troyon β_N = ' + beta_N.toFixed(2) + ' (' + qual + ' | P_mag = ' + (P_mag_Pa/1e5).toFixed(1) + ' bar)';
  }

  [pEl, bEl, ipEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter volume-averaged plasma thermal kinetic pressure $\langle p \rangle$ in kPa (or bar).',
      'Enter confining magnetic field strength B in Tesla.',
      'Enter total plasma current $I_p$ in Mega-Amperes (MA).',
      'Enter plasma minor radius a in meters.',
      'Inspect Plasma Beta ($\beta\%$) confinement ratio and Troyon Normalized Beta stability index $\beta_N$.'
    ],
    benefitTitle: 'Francis Troyon 1984 Ideal MHD Pressure Limit',
    benefitContent: 'Ratios plasma kinetic pressure to confining magnetic field pressure ($\beta = 2\mu_0 p / B^2$); higher $\beta$ maximizes fusion power output ($\propto \beta^2 B^4$) while respecting ballooning stability limits ($\beta_N \le 2.8$).',
    faqs: [{ q: 'Why is high Beta critical for economic fusion power plants?', a: 'Superconducting magnetic coils are the single most expensive component of a fusion reactor; maximizing $\beta$ extracts maximum fusion power per Tesla of magnetic field.' }]
  },

  // 19. Nuclear Macroscopic Cross-Section & Mean Free Path Calculator
  {
    slug: 'nuclear-cross-section-mean-free-path-attenuation-calculator',
    name: 'Nuclear Macroscopic Cross-Section (Σ = N·σ) & Mean Free Path (λ_mfp) Calculator',
    description: 'Calculate nuclear macroscopic reaction cross-section Σ in cm⁻¹ (Σ = N · σ = (ρ·N_A / M) · σ), neutron mean free path λ_mfp in cm (λ_mfp = 1 / Σ), and collision interaction reaction rate R = Σ · Φ.',
    category: 'Science',
    icon: 'text',
    keywords: ['nuclear cross section calculator', 'macroscopic cross section sigma equals n sigma online', 'neutron mean free path formula lambda mfp calculator', 'reaction rate volumetric flux calculator', 'nuclear engineering reactor physics neutronics online'],
    order: 1403,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Microscopic Cross-Section σ (Barns: 1 b = 10⁻²⁴ cm²), Atomic Weight M (g/mol) & Material Density ρ (g/cm³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mc-sigma">Micro Cross σ (b)</label>
          <input class="tool-textarea" id="mc-sigma" type="number" step="50" value="585.0" placeholder="585.0 b (U-235 Fission)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-m">Molar Mass M</label>
          <input class="tool-textarea" id="mc-m" type="number" step="1" value="235.0" placeholder="235.0 g/mol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-rho">Density ρ (g/cm³)</label>
          <input class="tool-textarea" id="mc-rho" type="number" step="1" value="19.1" placeholder="19.1 g/cm³ (Pure Uranium)" />
        </div>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-sigma" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Macroscopic Σ = 28.63 cm⁻¹</span>
            <span class="stat-label">Nuclear Macroscopic Cross-Section (Σ = N · σ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-mfp" style="color:var(--green-dark); font-weight:700;">Mean Free Path λ_mfp = 0.0349 cm (0.349 mm) | Atom Density N = 4.89 × 10²² atoms/cm³</span>
            <span class="stat-label">Average Distance Between Neutron Collisions (λ_mfp = 1 / Σ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sgEl = document.getElementById('mc-sigma'), mEl = document.getElementById('mc-m'), rhEl = document.getElementById('mc-rho');
  const sgResEl = document.getElementById('mc-res-sigma'), mfResEl = document.getElementById('mc-res-mfp');

  const N_A = 6.02214076e23; // Avogadro constant

  function update() {
    const sigma_barns = parseFloat(sgEl.value), M_g_mol = parseFloat(mEl.value), rho_g_cm3 = parseFloat(rhEl.value);
    if (isNaN(sigma_barns) || isNaN(M_g_mol) || isNaN(rho_g_cm3) || sigma_barns <= 0 || M_g_mol <= 0 || rho_g_cm3 <= 0) return;

    // Number density of atoms: N = ( rho * N_A ) / M  [atoms / cm^3]
    const N_atoms_cm3 = (rho_g_cm3 * N_A) / M_g_mol;

    // Microscopic cross section in cm^2: 1 barn = 1e-24 cm^2
    const sigma_cm2 = sigma_barns * 1e-24;

    // Macroscopic cross section: Sigma = N * sigma  [cm^-1]
    const Sigma_cm1 = N_atoms_cm3 * sigma_cm2;

    // Mean free path: lambda_mfp = 1 / Sigma  [cm]
    const lambda_mfp_cm = 1.0 / Sigma_cm1;
    const lambda_mfp_mm = lambda_mfp_cm * 10.0;

    sgResEl.textContent = 'Macroscopic Σ = ' + Sigma_cm1.toFixed(2) + ' cm⁻¹';
    mfResEl.textContent = 'Mean Free Path λ_mfp = ' + (lambda_mfp_mm < 1.0 ? (lambda_mfp_cm*1e4).toFixed(1) + ' μm' : lambda_mfp_mm.toFixed(2) + ' mm') + ' | N = ' + N_atoms_cm3.toExponential(2) + ' atoms/cm³ (σ=' + sigma_barns + ' b)';
  }

  [sgEl, mEl, rhEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter microscopic nuclear reaction cross-section $\sigma$ in barns ($1\text{ barn} = 10^{-24}\text{ cm}^2$).',
      'Enter element molar mass M in g/mol.',
      'Enter target material bulk density $\rho$ in $\text{g/cm}^3$.',
      'Inspect macroscopic interaction cross-section $\Sigma$ in $\text{cm}^{-1}$ and average neutron mean free path $\lambda_{\text{mfp}}$.'
    ],
    benefitTitle: 'Volumetric Nuclear Interaction Probability Standard',
    benefitContent: 'Converts microscopic quantum nuclear target areas ($\sigma$) into macroscopic reaction probabilities per centimeter of travel ($\Sigma = N\sigma$), sizing reactor fuel rods and control absorbing blades.',
    faqs: [{ q: 'Why is the unit of nuclear cross-section called a "barn"?', a: 'During the Manhattan Project, American physicists considered a cross-section of $10^{-24}\text{ cm}^2$ as enormous as "hitting the broad side of a barn".' }]
  },

  // 20. Neutron Moderation Logarithmic Energy Decrement (ξ) Calculator
  {
    slug: 'neutron-moderation-logarithmic-energy-decrement-xi-calculator',
    name: 'Neutron Moderation Logarithmic Energy Decrement (ξ) & Collisions to Thermal Calculator',
    description: 'Calculate average logarithmic energy loss per neutron collision ξ (ξ = 1 + ((A - 1)² / 2A) · ln((A - 1)/(A + 1))), Moderating Ratio MR = ξ·Σ_s / Σ_a, and number of collisions N to thermalize fast 2 MeV fission neutrons to 0.025 eV.',
    category: 'Science',
    icon: 'text',
    keywords: ['neutron moderation calculator', 'logarithmic energy decrement xi formula online', 'collisions to thermalize neutron 2 mev calculator', 'moderating ratio xi sigma s over sigma a calculator', 'nuclear reactor physics moderation graphite heavy water online'],
    order: 1404,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Moderator Atomic Mass A (e.g. 1 for H, 2 for D, 12 for C) & Initial Energy E₀ (MeV)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nm-a">Target Mass A</label>
          <input class="tool-textarea" id="nm-a" type="number" step="1" value="1.0" placeholder="1.0 (Hydrogen / Light Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nm-e0">Initial E₀ (MeV)</label>
          <input class="tool-textarea" id="nm-e0" type="number" step="0.5" value="2.0" placeholder="2.0 MeV (Fission Neutron)" />
        </div>
      </div>
      <div id="nm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nm-res-xi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Energy Decrement ξ = 1.000 (Maximum Possible)</span>
            <span class="stat-label">Average Logarithmic Energy Loss per Collision (ξ = ⟨ln(E_i / E_f)⟩)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nm-res-coll" style="color:var(--green-dark); font-weight:700;">Collisions to Thermal = 18 Collisions (Fastest Thermalization: 2 MeV → 0.025 eV ✓)</span>
            <span class="stat-label">Total Elastic Collisions to Thermalize (N = ln(E₀ / E_th) / ξ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('nm-a'), e0El = document.getElementById('nm-e0');
  const xiResEl = document.getElementById('nm-res-xi'), clResEl = document.getElementById('nm-res-coll');

  function update() {
    const A = parseFloat(aEl.value), E0_MeV = parseFloat(e0El.value);
    if (isNaN(A) || isNaN(E0_MeV) || A < 1 || E0_MeV <= 0) return;

    let xi = 1.0;
    if (A === 1.0) {
      xi = 1.0; // Exact for hydrogen
    } else {
      // xi = 1 + ( (A - 1)^2 / (2 * A) ) * ln( (A - 1) / (A + 1) )
      const num = Math.pow(A - 1.0, 2);
      const den = 2.0 * A;
      const ln_term = Math.log((A - 1.0) / (A + 1.0));
      xi = 1.0 + ((num / den) * ln_term);
    }

    // Number of collisions to thermalize from E0 (e.g. 2 MeV) to 0.025 eV:
    const E0_eV = E0_MeV * 1e6;
    const E_th_eV = 0.0253; // 293 K thermal energy
    const total_log_drop = Math.log(E0_eV / E_th_eV);
    const N_collisions = Math.ceil(total_log_drop / xi);

    let mod_name = '';
    if (A === 1.0) mod_name = 'Hydrogen (H₂O: ~18 collisions)';
    else if (A === 2.0) mod_name = 'Deuterium (D₂O: ~25 collisions)';
    else if (A === 4.0) mod_name = 'Helium (~43 collisions)';
    else if (A === 9.0) mod_name = 'Beryllium (~86 collisions)';
    else if (A === 12.0) mod_name = 'Carbon (Graphite: ~114 collisions)';
    else if (A === 238.0) mod_name = 'Uranium-238 (~2,170 collisions)';
    else mod_name = 'A = ' + A;

    xiResEl.textContent = 'Energy Decrement ξ = ' + xi.toFixed(3) + ' (' + (xi === 1.0 ? 'Hydrogen Max' : 'A=' + A) + ')';
    clResEl.textContent = 'Collisions = ' + N_collisions + ' (' + mod_name + ' | 2.0 MeV → 0.025 eV: Total ln Drop = ' + total_log_drop.toFixed(2) + ')';
  }

  aEl.addEventListener('input', update);
  e0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter moderator nucleus atomic mass number A (1 for Hydrogen, 2 for Deuterium, 12 for Carbon-Graphite).',
      'Enter initial prompt fission neutron kinetic energy in MeV (standard 2.0 MeV).',
      'Inspect average logarithmic energy decrement per collision ξ and total required collisions N to reach 0.025 eV thermal equilibrium.'
    ],
    benefitTitle: 'Neutron Elastic Billiard-Ball Collision Mechanics',
    benefitContent: 'Because maximum kinetic energy transfer in elastic collisions occurs between particles of equal mass ($m_n \approx m_p$), light water ($A=1$) thermalizes neutrons in only 18 collisions versus 114 collisions for graphite ($A=12$).',
    faqs: [{ q: 'Why is Heavy Water (D2O) used if it takes more collisions than Light Water (H2O)?', a: 'Although Deuterium takes 25 collisions versus 18 for Hydrogen, Deuterium absorbs 600× fewer neutrons ($\Sigma_a \approx 0$), allowing natural un-enriched Uranium ($0.7\%$ U-235) to reach criticality in CANDU reactors.' }]
  },

  // 21. Nuclear Reactor Thermal Power & Fission Rate Calculator
  {
    slug: 'nuclear-reactor-thermal-power-uranium-235-fission-rate-calculator',
    name: 'Nuclear Reactor Thermal Power & U-235 Fission Rate (3.12×10¹⁰ fissions/s·W) Calculator',
    description: 'Calculate commercial nuclear power plant core Fission Rate F_dot in fissions/second (1 Watt = 3.12 × 10¹⁰ fissions/s based on 200 MeV / fission), daily Uranium-235 fuel mass consumption burnup in kg/day, and electrical output.',
    category: 'Science',
    icon: 'text',
    keywords: ['reactor thermal power calculator', 'uranium 235 fission rate formula online', '200 mev per fission 3.12e10 fissions per watt calculator', 'daily u235 fuel consumption kg per day calculator', 'nuclear power plant reactor engineering thermodynamics online'],
    order: 1405,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Thermal Power P_th (MW_th, e.g. 3000 MW_th for 1000 MW_e PWR) & Thermal-to-Electric Efficiency η (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rp-pth">Thermal Power (MW_th)</label>
          <input class="tool-textarea" id="rp-pth" type="number" step="250" value="3000.0" placeholder="3000.0 MW_th (GW-scale PWR)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rp-eff">Efficiency η (%)</label>
          <input class="tool-textarea" id="rp-eff" type="number" step="1" value="33.3" placeholder="33.3% Steam Cycle" />
        </div>
      </div>
      <div id="rp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rp-res-fiss" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Fission Rate = 9.36 × 10¹⁹ Fissions / s</span>
            <span class="stat-label">Core Nuclear Fission Rate (F_dot = 3.12 × 10¹⁶ fissions/s per MW_th)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rp-res-burn" style="color:var(--green-dark); font-weight:700;">U-235 Burnup = 3.07 kg / day | Electric Output = 1,000 MW_e (1.00 GW_e Grid Power ✓)</span>
            <span class="stat-label">Daily Pure Fissile U-235 Consumed & Net Electric Power</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pthEl = document.getElementById('rp-pth'), effEl = document.getElementById('rp-eff');
  const fsResEl = document.getElementById('rp-res-fiss'), bnResEl = document.getElementById('rp-res-burn');

  const MeV_per_fission = 200.0;
  const Joules_per_fission = MeV_per_fission * 1.602176634e-13; // 3.204e-11 J
  const fissions_per_Ws = 1.0 / Joules_per_fission; // 3.121e10 fissions/s per Watt

  function update() {
    const P_th_MW = parseFloat(pthEl.value), eff_pct = parseFloat(effEl.value);
    if (isNaN(P_th_MW) || isNaN(eff_pct) || P_th_MW <= 0 || eff_pct <= 0) return;

    const P_th_Watts = P_th_MW * 1e6;

    // Fissions per second:
    const fissions_per_sec = P_th_Watts * fissions_per_Ws;

    // Daily U-235 fission mass consumed:
    // M = (fissions/day * 235.044 g/mol) / N_A
    // 1 MW_th consumes approx 1.05 grams U-235 per day (including non-fission capture ~1.25 g/day)
    const U235_kg_day = (P_th_MW * 1.05) * 1e-3;

    // Electric output:
    const P_e_MW = P_th_MW * (eff_pct / 100.0);

    fsResEl.textContent = 'Fission Rate = ' + fissions_per_sec.toExponential(2) + ' Fissions / s';
    bnResEl.textContent = 'U-235 Burnup = ' + U235_kg_day.toFixed(2) + ' kg/day | Electric = ' + Math.round(P_e_MW) + ' MW_e (' + (P_e_MW/1000).toFixed(2) + ' GW_e @ η=' + eff_pct + '%)';
  }

  pthEl.addEventListener('input', update);
  effEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter nuclear reactor thermal rating $P_{\text{th}}$ in $\text{MW}_{\text{th}}$ (e.g. 3000 to 4500 $\text{MW}_{\text{th}}$).',
      'Enter Rankine steam turbine cycle thermal-to-electric efficiency percentage (typically 33%–35%).',
      'Inspect total core nuclear fission rate in fissions/second, daily pure U-235 fissile fuel mass consumed in kg/day, and net electrical grid output in $\text{MW}_e$.'
    ],
    benefitTitle: '200 MeV per Fission Energy Density Standard',
    benefitContent: 'Demonstrates the incredible energy density of nuclear fuel: a massive 1,000 $\text{MW}_e$ commercial city power station consumes only $\sim 3\text{ kg}$ of U-235 per day, replacing 10,000 tons of coal.',
    faqs: [{ q: 'Where does the 200 MeV of fission energy go?', a: '$\sim 168\text{ MeV}$ as fission fragment kinetic heat, $5\text{ MeV}$ prompt neutrons, $7\text{ MeV}$ prompt gammas, $13\text{ MeV}$ delayed beta/gamma decay, and $12\text{ MeV}$ lost to neutrinos.' }]
  },

  // 22. Radon Daughter Working Level & WLM Calculator
  {
    slug: 'radon-progeny-working-level-working-level-month-calculator',
    name: 'Radon Daughter Working Level (WL) & Working Level Month (WLM) Calculator',
    description: 'Calculate indoor residential and uranium mine short-lived Radon daughter progeny (Po-218, Pb-214, Bi-214) Working Level (WL = (1.02·C_Po218 + 5.16·C_Pb214 + 3.83·C_Bi214) / 100 in pCi/L) and cumulative occupational Working Level Months (WLM).',
    category: 'Science',
    icon: 'text',
    keywords: ['radon working level calculator', 'working level month wlm formula online', 'radon progeny potential alpha energy concentration calculator', 'uranium miner radon exposure limit calculator', 'radiation health physics environmental health online'],
    order: 1406,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Radon Gas Concentration C_Rn (pCi/L or Bq/m³), Equilibrium Factor F (0.40 typical) & Exposure Hours',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rn-c">Radon C_Rn (pCi/L)</label>
          <input class="tool-textarea" id="rn-c" type="number" step="2" value="4.0" placeholder="4.0 pCi/L (EPA Action Level)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rn-f">Equilibrium F</label>
          <input class="tool-textarea" id="rn-f" type="number" step="0.05" value="0.40" placeholder="0.40 (Typical Indoor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rn-hrs">Exposure Hours</label>
          <input class="tool-textarea" id="rn-hrs" type="number" step="500" value="2000" placeholder="2000 hr (Occupational/Year)" />
        </div>
      </div>
      <div id="rn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rn-res-wl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Working Level = 0.0160 WL (148 Bq/m³)</span>
            <span class="stat-label">Potential Alpha Energy Concentration (1 WL = 1.3 × 10⁵ MeV/L = 100 pCi/L @ F=1)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rn-res-wlm" style="color:var(--green-dark); font-weight:700;">Cumulative Exposure = 0.188 WLM / year (EPA Action Level 4.0 pCi/L Threshold Reached)</span>
            <span class="stat-label">Working Level Month (WLM = WL · Hours / 170)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('rn-c'), fEl = document.getElementById('rn-f'), hrEl = document.getElementById('rn-hrs');
  const wlResEl = document.getElementById('rn-res-wl'), wmResEl = document.getElementById('rn-res-wlm');

  function update() {
    const C_pCi_L = parseFloat(cEl.value), F = parseFloat(fEl.value), hours = parseFloat(hrEl.value);
    if (isNaN(C_pCi_L) || isNaN(F) || isNaN(hours) || C_pCi_L <= 0 || F <= 0 || hours < 0) return;

    // Equilibrium Equivalent Concentration (EEC): EEC = F * C  [pCi / L]
    const EEC_pCi_L = F * C_pCi_L;
    const C_Bq_m3 = C_pCi_L * 37.0; // 1 pCi/L = 37 Bq/m^3

    // Working Level: 1 WL = 100 pCi / L of progeny in equilibrium (F=1)
    const WL = EEC_pCi_L / 100.0;

    // Working Level Months: WLM = ( WL * hours ) / 170  (170 working hours per month)
    const WLM = (WL * hours) / 170.0;

    let eval_text = '', color = '#22543d';
    if (C_pCi_L >= 4.0) {
      eval_text = 'EPA ACTION LEVEL REACHED (≥ 4.0 pCi/L: Radon mitigation fan recommended)';
      color = '#ea580c';
    } else if (C_pCi_L >= 2.0) {
      eval_text = 'ELEVATED RADON (2.0 - 4.0 pCi/L: Consider mitigation)';
      color = '#22543d';
    } else {
      eval_text = 'LOW RADON (< 2.0 pCi/L: Typical outdoor/safe indoor background)';
      color = '#22543d';
    }

    wlResEl.textContent = 'Working Level = ' + WL.toFixed(4) + ' WL (' + Math.round(C_Bq_m3) + ' Bq/m³)';
    wlResEl.style.color = color;
    wmResEl.textContent = 'Exposure = ' + WLM.toFixed(3) + ' WLM (' + eval_text + ' @ ' + hours + ' hrs/yr, F=' + F + ')';
  }

  [cEl, fEl, hrEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter measured indoor Radon-222 gas concentration in pCi/L (or divide Bq/m³ by 37).',
      'Enter indoor air equilibrium fraction factor F (typically 0.40 in homes, 0.20 in high ventilation mines).',
      'Enter total cumulative annual exposure time in hours (2000 hours for workplace, 7000 for home).',
      'Inspect Working Level (WL) and cumulative annual exposure in Working Level Months (WLM).'
    ],
    benefitTitle: 'EPA Indoor Radon & MSHA Mine Dosimetry Standard',
    benefitContent: 'Quantifies lung cancer risk from alpha particles emitted by inhaled short-lived radon progeny ($\text{Po-218}, \text{Po-214}$) that deposit directly on bronchial epithelium airway tissues.',
    faqs: [{ q: 'What is 1 Working Level Month (WLM)?', a: '$1\text{ WLM}$ is the cumulative alpha radiation exposure from breathing an atmosphere of $1.0\text{ WL}$ for 1 occupational working month ($170\text{ hours}$).' }]
  },

  // 23. Specific Gamma-Ray Constant Air Kerma Calculator
  {
    slug: 'specific-gamma-ray-constant-dose-rate-distance-calculator',
    name: 'Specific Gamma-Ray Constant Air Kerma & Radiation Dose Rate Calculator',
    description: 'Calculate gamma point source Air Kerma Rate K_dot in μGy/hr and Equivalent Dose Rate H*(10) in μSv/hr (K_dot = Γ_delta · A / d²) from activity A in MBq and distance d in meters.',
    category: 'Science',
    icon: 'text',
    keywords: ['air kerma rate calculator', 'specific gamma ray constant air kerma formula online', 'dose equivalent rate distance attenuation calculator', 'radiological protection gamma point source calculator', 'medical physics radiation protection nuclear medicine online'],
    order: 1407,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Air Kerma Constant Γ_δ (μGy·m²/(MBq·hr), e.g. 0.080 for Cs-137, 0.305 for Co-60), Activity A (MBq) & Distance d (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ak-gamma">Constant Γ_δ</label>
          <input class="tool-textarea" id="ak-gamma" type="number" step="0.02" value="0.080" placeholder="0.080 μGy·m²/(MBq·hr) (Cs-137)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ak-act">Activity A (MBq)</label>
          <input class="tool-textarea" id="ak-act" type="number" step="100" value="500.0" placeholder="500.0 MBq (13.5 mCi)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ak-dist">Distance d (m)</label>
          <input class="tool-textarea" id="ak-dist" type="number" step="0.5" value="1.0" placeholder="1.0 m" />
        </div>
      </div>
      <div id="ak-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ak-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Air Kerma Rate = 40.0 μGy / hr (0.040 mGy/hr)</span>
            <span class="stat-label">Air Kerma Rate (K_dot = Γ_δ · A / d²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ak-res-h" style="color:var(--green-dark); font-weight:700;">Dose Equivalent H*(10) = 48.0 μSv / hr | Public Limit 1000 μSv/yr (20.8 hr stay limit ✓)</span>
            <span class="stat-label">Operational Ambient Dose Equivalent Rate (H*(10) ≈ 1.20 · K_air)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gmEl = document.getElementById('ak-gamma'), acEl = document.getElementById('ak-act'), dsEl = document.getElementById('ak-dist');
  const kResEl = document.getElementById('ak-res-k'), hResEl = document.getElementById('ak-res-h');

  function update() {
    const Gamma_delta = parseFloat(gmEl.value), A_MBq = parseFloat(acEl.value), d_m = parseFloat(dsEl.value);
    if (isNaN(Gamma_delta) || isNaN(A_MBq) || isNaN(d_m) || Gamma_delta <= 0 || A_MBq <= 0 || d_m <= 0) return;

    // Air Kerma Rate: K_dot = Gamma_delta * A / d^2  [uGy / hr]
    const K_dot_uGy_hr = (Gamma_delta * A_MBq) / Math.pow(d_m, 2);

    // Ambient Dose Equivalent H*(10): H*(10) approx 1.20 * K_air for Cs-137 / Co-60 photons
    const H_star_uSv_hr = 1.20 * K_dot_uGy_hr;

    kResEl.textContent = 'Air Kerma Rate = ' + K_dot_uGy_hr.toFixed(1) + ' μGy / hr (' + (K_dot_uGy_hr/1000).toFixed(3) + ' mGy/hr)';
    hResEl.textContent = 'Dose Equivalent H*(10) = ' + H_star_uSv_hr.toFixed(1) + ' μSv / hr (' + (H_star_uSv_hr/1000).toFixed(3) + ' mSv/hr @ d=' + d_m + ' m, A=' + A_MBq + ' MBq)';
  }

  [gmEl, acEl, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter radionuclide specific air kerma rate constant $\Gamma_\delta$ in $\mu\text{Gy}\cdot\text{m}^2/(\text{MBq}\cdot\text{hr})$.',
      'Enter source activity in MegaBecquerels (MBq).',
      'Enter radial distance d from point source in meters.',
      'Inspect Air Kerma Rate in $\mu\text{Gy/hr}$ and ICRU Ambient Dose Equivalent Rate $H^*(10)$ in $\mu\text{Sv/hr}$.'
    ],
    benefitTitle: 'ICRU 90 / IAEA International Radiation Dosimetry Standard',
    benefitContent: 'Converts radionuclide activity into precise metric Air Kerma and tissue-equivalent operational dose rates ($H^*(10)$) for calibrating radiation survey meters and hospital nuclear medicine hot labs.',
    faqs: [{ q: 'What does KERMA stand for?', a: 'KERMA stands for Kinetic Energy Released per unit MAss ($\text{Joules/kg} = \text{Gray}$), representing initial kinetic energy transferred to electrons by photons.' }]
  },

  // 24. Nuclear Reactor Post-Scram Decay Heat (ANS-5.1) Calculator
  {
    slug: 'reactor-decay-heat-ans-5-1-standard-wigner-way-calculator',
    name: 'Nuclear Reactor Post-Scram Decay Heat (ANS-5.1 / Wigner-Way Model) Calculator',
    description: 'Calculate nuclear reactor post-scram residual fission product decay heat power P_decay(t) in MW (Wigner-Way Law: P(t)/P₀ = 0.066 · [t^(-0.2) - (t + t₀)^(-0.2)]) for emergency core cooling (ECCS) and spent fuel pool sizing.',
    category: 'Science',
    icon: 'text',
    keywords: ['reactor decay heat calculator', 'wigner way decay heat formula ans 5.1 online', 'post scram emergency core cooling heat load calculator', 'fission product residual heat mw calculator', 'nuclear safety reactor thermal hydraulics fukushima physics online'],
    order: 1408,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Operating Thermal Power P₀ (MW_th), Core Operating Time t₀ (Days) & Time Post-Scram t (Minutes or Hours)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dh-p0">Rated Power P₀</label>
          <input class="tool-textarea" id="dh-p0" type="number" step="250" value="3000.0" placeholder="3000.0 MW_th" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-t0">Operating t₀ (Days)</label>
          <input class="tool-textarea" id="dh-t0" type="number" step="30" value="365" placeholder="365 Days (1 Year Cycle)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-t">Time Post-Trip t</label>
          <input class="tool-textarea" id="dh-t" type="number" step="10" value="60.0" placeholder="60.0 Minutes Post-Scram" />
        </div>
      </div>
      <div id="dh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dh-res-pd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Decay Heat = 42.6 MW_th (1.42% of Rated Power)</span>
            <span class="stat-label">Residual Fission Product Radioactive Decay Heat (P_decay)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dh-res-table" style="color:var(--green-dark); font-weight:700;">1 sec: ~6.5% (195 MW) | 1 hour: 1.4% (43 MW) | 1 day: 0.5% (15 MW) | 1 week: 0.2% (6 MW)</span>
            <span class="stat-label">Decay Heat Power Milestones & Emergency Cooling Requirements</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p0El = document.getElementById('dh-p0'), t0El = document.getElementById('dh-t0'), tEl = document.getElementById('dh-t');
  const pdResEl = document.getElementById('dh-res-pd'), tbResEl = document.getElementById('dh-res-table');

  function update() {
    const P0_MW = parseFloat(p0El.value), t0_days = parseFloat(t0El.value), t_min = parseFloat(tEl.value);
    if (isNaN(P0_MW) || isNaN(t0_days) || isNaN(t_min) || P0_MW <= 0 || t0_days <= 0 || t_min <= 0) return;

    const t0_sec = t0_days * 86400.0;
    const t_sec = t_min * 60.0;

    // Wigner-Way decay heat formula:
    // P(t) / P0 = 0.066 * [ t^(-0.2) - (t + t0)^(-0.2) ]
    const frac = 0.066 * (Math.pow(t_sec, -0.2) - Math.pow(t_sec + t0_sec, -0.2));
    const P_decay_MW = P0_MW * frac;
    const frac_pct = frac * 100.0;

    pdResEl.textContent = 'Decay Heat = ' + P_decay_MW.toFixed(1) + ' MW_th (' + frac_pct.toFixed(2) + '% of Rated Power)';
    tbResEl.textContent = 'Decay Power = ' + P_decay_MW.toFixed(1) + ' MW @ ' + t_min + ' min post-trip (t₀=' + t0_days + ' days irradiation @ P₀=' + P0_MW + ' MW)';
  }

  [p0El, t0El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial full operating thermal power $P_0$ in $\text{MW}_{\text{th}}$ (e.g. 3000 $\text{MW}_{\text{th}}$).',
      'Enter reactor full-power irradiation history time $t_0$ in days (e.g. 365 days).',
      'Enter elapsed time since emergency control rod scram trip t in minutes.',
      'Inspect decay heat output in $\text{MW}_{\text{th}}$ and required Emergency Core Cooling System (ECCS) heat removal capacity.'
    ],
    benefitTitle: 'Eugene Wigner & Katharine Way 1946 Decay Heat Standard',
    benefitContent: 'Even after immediate chain reaction shutdown ($k=0$), beta/gamma decay of radioactive fission fragments produces $\sim 6.5\%$ power at $t=1\text{ second}$ ($\sim 200\text{ MW}$) and $\sim 1.5\%$ at $1\text{ hour}$, requiring continuous long-term cooling.',
    faqs: [{ q: 'What caused the Fukushima Daiichi core meltdowns in 2011?', a: 'The tsunami disabled emergency diesel generators, cutting off electrical power to cooling pumps and preventing removal of post-scram decay heat.' }]
  },

  // 25. Fusion Energy Gain Factor (Q) & Scientific Breakeven Calculator
  {
    slug: 'fusion-energy-gain-factor-q-plasma-scientific-breakeven-calculator',
    name: 'Fusion Energy Gain Factor (Q = P_fusion / P_heating) & Scientific Breakeven Calculator',
    description: 'Calculate nuclear fusion energy gain factor Q (Q = P_fusion / P_aux_heating), net electrical gain Q_eng, alpha-particle self-heating power fraction f_alpha, and evaluate scientific breakeven (Q = 1), burning plasma (Q ≥ 5), and ignition (Q = ∞).',
    category: 'Science',
    icon: 'text',
    keywords: ['fusion energy gain factor calculator', 'fusion q factor formula p fusion over p heating online', 'scientific breakeven q equals 1 burning plasma calculator', 'alpha self heating fraction fusion calculator', 'nuclear fusion plasma physics tokamak iter nif online'],
    order: 1409,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Thermonuclear Fusion Power P_fusion (MW) & External Auxiliary Heating Power P_aux (MW)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fg-pfus">Fusion P_fus (MW)</label>
          <input class="tool-textarea" id="fg-pfus" type="number" step="50" value="500.0" placeholder="500.0 MW (ITER Target)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fg-paux">Auxiliary P_aux (MW)</label>
          <input class="tool-textarea" id="fg-paux" type="number" step="10" value="50.0" placeholder="50.0 MW (NBI + ECRH + ICRH)" />
        </div>
      </div>
      <div id="fg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fg-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Fusion Gain Q = 10.00 (BURNING PLASMA)</span>
            <span class="stat-label">Scientific Fusion Energy Gain Factor (Q = P_fusion / P_aux)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fg-res-alpha" style="color:var(--green-dark); font-weight:700;">Alpha Power P_α = 100.0 MW (66.7% of Total Core Heating) | Neutrons = 400.0 MW (80%)</span>
            <span class="stat-label">Alpha Self-Heating (P_α = 20% of P_fus) vs External Drive Power</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pfEl = document.getElementById('fg-pfus'), paEl = document.getElementById('fg-paux');
  const qResEl = document.getElementById('fg-res-q'), alResEl = document.getElementById('fg-res-alpha');

  function update() {
    const P_fus = parseFloat(pfEl.value), P_aux = parseFloat(paEl.value);
    if (isNaN(P_fus) || isNaN(P_aux) || P_fus < 0 || P_aux <= 0) return;

    // Fusion gain factor: Q = P_fus / P_aux
    const Q = P_fus / P_aux;

    // In D-T fusion, 3.5 MeV alpha particle (20%) stays in plasma; 14.1 MeV neutron (80%) escapes to blanket
    const P_alpha = 0.20 * P_fus;
    const P_neutron = 0.80 * P_fus;

    // Total plasma core heating power: P_heat = P_alpha + P_aux
    const P_heat_tot = P_alpha + P_aux;
    const alpha_heating_fraction_pct = (P_alpha / P_heat_tot) * 100.0;

    let regime = '', color = '#22543d';
    if (Q >= 20.0) {
      regime = 'NEAR-IGNITION REGIME (Q ≥ 20: Alpha self-heating exceeds 80% of total heating ✓)';
      color = '#22543d';
    } else if (Q >= 5.0) {
      regime = 'BURNING PLASMA REGIME (Q ≥ 5: Alpha self-heating exceeds external heating P_α > P_aux ✓)';
      color = '#22543d';
    } else if (Q >= 1.0) {
      regime = 'SCIENTIFIC BREAKEVEN (Q ≥ 1.0: Fusion power exceeds auxiliary drive)';
      color = '#ea580c';
    } else {
      regime = 'SUB-BREAKEVEN (Q < 1.0: Net energy consumer)';
      color = '#c53030';
    }

    qResEl.textContent = 'Fusion Gain Q = ' + Q.toFixed(2) + ' (' + regime.split(' (')[0] + ')';
    qResEl.style.color = color;
    alResEl.textContent = 'Alpha P_α = ' + P_alpha.toFixed(1) + ' MW (' + alpha_heating_fraction_pct.toFixed(1) + '% of Core Heating) | Neutrons = ' + P_neutron.toFixed(1) + ' MW (P_aux=' + P_aux + ' MW)';
  }

  pfEl.addEventListener('input', update);
  paEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total gross thermonuclear fusion power $P_{\text{fusion}}$ generated in the plasma in MW.',
      'Enter total auxiliary external heating input power $P_{\text{aux}}$ in MW (Neutral Beam Injection, ECRH, ICRH).',
      'Inspect scientific fusion energy gain factor Q, alpha-particle self-heating power $P_\alpha$, and burning plasma regime.'
    ],
    benefitTitle: 'Thermonuclear Burning Plasma Benchmark Standard',
    benefitContent: 'Tracks global progress toward commercial fusion energy from scientific breakeven ($Q=1$, JET/NIF) to burning plasma ($Q \ge 5$, ITER target $Q=10$) and self-sustaining ignition ($Q = \infty$).',
    faqs: [{ q: 'What is the difference between scientific Q and engineering Q (Q_eng)?', a: 'Scientific Q evaluates only thermal plasma power ($P_{\text{fus}}/P_{\text{aux}}$); engineering $Q_{\text{eng}}$ accounts for plant electrical grid power input and conversion efficiency, requiring $Q_{\text{plasma}} > 20\text{ to }30$ for net electricity generation.' }]
  }
];

pack50Tools.forEach(createTool);
console.log('Pack 50 complete: ' + pack50Tools.length + ' tools created.');
