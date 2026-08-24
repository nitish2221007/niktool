const { createTool } = require('./generate-curated-tools.cjs');

// Pack 22: 25 Tools covering Nuclear Reactor Physics, Polymer Rheology, Microfluidics, Geodesy Navigation, Power Electronics Converters (Tools 806 to 830)
const pack22Tools = [
  // --- Suite VVVV: Nuclear Reactor Physics & Radiation Shielding (806 - 810) ---
  // 1. Four-Factor Formula Neutron Multiplication Factor (k_inf) Calculator
  {
    slug: 'reactor-neutron-multiplication-four-factor-calculator',
    name: 'Nuclear Reactor Four-Factor Formula (k_∞ = ε·p·η·f) Calculator',
    description: 'Calculate infinite neutron multiplication factor (k_∞ = ε · p · η · f) and effective criticality (k_eff = k_∞ · P_NL) across Fast Fission, Resonance Escape, Reproduction, and Thermal Utilization.',
    category: 'Science',
    icon: 'text',
    keywords: ['four factor formula calculator', 'reactor neutron multiplication factor k infinity formula', 'effective criticality k eff non leakage calculator', 'nuclear reactor physics keff online', 'fast fission resonance escape thermal utilization calculator'],
    order: 686,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fast Fission Factor ε (1.03), Resonance Escape p (0.85), Reproduction η (2.05) & Utilization f (0.90)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nuc-eps">Fast Fission ε</label>
          <input class="tool-textarea" id="nuc-eps" type="number" step="0.01" value="1.03" placeholder="1.03" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nuc-p">Resonance p</label>
          <input class="tool-textarea" id="nuc-p" type="number" step="0.01" value="0.85" placeholder="0.85" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nuc-eta">Reproduction η</label>
          <input class="tool-textarea" id="nuc-eta" type="number" step="0.01" value="2.05" placeholder="2.05 (Thermal η)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nuc-f">Utilization f</label>
          <input class="tool-textarea" id="nuc-f" type="number" step="0.01" value="0.90" placeholder="0.90" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nuc-pnl">Non-Leakage P_NL</label>
          <input class="tool-textarea" id="nuc-pnl" type="number" step="0.01" value="0.60" placeholder="0.60 (Leakage Prob)" />
        </div>
      </div>
      <div id="nuc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nuc-res-kinf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">k_∞ = 1.615 | k_eff = 1.000</span>
            <span class="stat-label">Infinite & Effective Criticality Factor</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nuc-res-stat" style="color:var(--green-dark); font-weight:700;">EXACT CRITICAL STATE (k_eff = 1.00000 | Steady-State Power Operation)</span>
            <span class="stat-label">Nuclear Core Criticality Operating Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const epsEl = document.getElementById('nuc-eps'), pEl = document.getElementById('nuc-p');
  const etaEl = document.getElementById('nuc-eta'), fEl = document.getElementById('nuc-f'), pnlEl = document.getElementById('nuc-pnl');
  const kResEl = document.getElementById('nuc-res-kinf'), stResEl = document.getElementById('nuc-res-stat');

  function update() {
    const eps = parseFloat(epsEl.value), p = parseFloat(pEl.value);
    const eta = parseFloat(etaEl.value), f = parseFloat(fEl.value), P_NL = parseFloat(pnlEl.value);

    if (isNaN(eps) || isNaN(p) || isNaN(eta) || isNaN(f) || isNaN(P_NL) || eps <= 0 || p <= 0 || eta <= 0 || f <= 0 || P_NL <= 0) return;

    // Four-factor formula: k_inf = eps * p * eta * f
    const k_inf = eps * p * eta * f;

    // Six-factor effective multiplication: k_eff = k_inf * P_NL
    const k_eff = k_inf * P_NL;
    const reactivityPcm = ((k_eff - 1) / k_eff) * 1e5; // reactivity rho in percent millirads (pcm)

    kResEl.textContent = 'k_∞ = ' + k_inf.toFixed(3) + ' | k_eff = ' + k_eff.toFixed(4);

    let status = '';
    let color = '#22543d';

    if (Math.abs(k_eff - 1.0) < 0.001) {
      status = 'EXACT CRITICAL (k_eff ≈ 1.000: Steady Constant Power | Reactivity ρ = ' + reactivityPcm.toFixed(0) + ' pcm)';
      color = '#22543d';
    } else if (k_eff > 1.0) {
      status = 'SUPERCRITICAL (k_eff > 1.0: Neutron Flux & Reactor Power Rising | ρ = +' + reactivityPcm.toFixed(0) + ' pcm)';
      color = '#c53030';
    } else {
      status = 'SUBCRITICAL (k_eff < 1.0: Chain Reaction Decaying to Shutdown | ρ = ' + reactivityPcm.toFixed(0) + ' pcm)';
      color = '#2563eb';
    }

    stResEl.textContent = status;
    stResEl.style.color = color;
  }

  [epsEl, pEl, etaEl, fEl, pnlEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fast fission factor $\epsilon$ (typically 1.02 to 1.05).',
      'Enter resonance escape probability p (fraction of fast neutrons escaping capture by U-238 during moderation, ~0.80 to 0.90).',
      'Enter neutron reproduction factor $\eta$ (fission neutrons produced per thermal absorption in fuel, ~2.0 to 2.1).',
      'Enter thermal utilization factor f (fraction of thermal neutrons absorbed in fuel vs moderator/structure, ~0.85 to 0.95).',
      'Enter total non-leakage probability $P_{\text{NL}}$ ($P_{\text{FNL}} \cdot P_{\text{TNL}}$).',
      'Inspect infinite multiplication factor $k_\infty$, effective criticality $k_{\text{eff}}$, and reactivity $\rho$ in pcm.'
    ],
    benefitTitle: 'Enrico Fermi 1942 Chicago Pile Criticality Theory',
    benefitContent: 'Self-sustaining fission chain reactions require $k_{\text{eff}} = 1.000$; regulating control rods trims thermal utilization ($f$) to precisely balance prompt and delayed neutron populations.',
    faqs: [{ q: 'What is 1 pcm of nuclear reactivity?', a: '1 pcm (percent mille) equals $10^{-5}$ ($0.00001$) reactivity change ($\Delta k / k$).' }]
  },

  // 2. Radioactive Decay Chain (Bateman Two-Step Daughter Activity) Calculator
  {
    slug: 'radioactive-decay-chain-bateman-equations-calculator',
    name: 'Radioactive Decay Chain (Bateman Equations Daughter Growth) Calculator',
    description: 'Calculate radioactive parent-to-daughter isotopic activity and secular/transient equilibrium (N_2(t) = λ₁ / (λ₂ - λ₁) · N₁₀ · (e^(-λ₁·t) - e^(-λ₂·t))).',
    category: 'Science',
    icon: 'text',
    keywords: ['bateman equations calculator', 'radioactive decay daughter growth formula online', 'secular transient radioactive equilibrium calculator', 'parent daughter radionuclide activity calculator online', 'nuclear decay chain bateman calculator'],
    order: 687,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Parent Half-Life T_1/2 (hours), Daughter Half-Life T_1/2 (hours), Initial Parent N₁₀ & Elapsed Time t',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bat-th1">Parent T_1/2 (h)</label>
          <input class="tool-textarea" id="bat-th1" type="number" step="any" value="66.0" placeholder="66.0 h (Mo-99 Generator)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bat-th2">Daughter T_1/2 (h)</label>
          <input class="tool-textarea" id="bat-th2" type="number" step="any" value="6.0" placeholder="6.0 h (Tc-99m Medical)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bat-a0">Parent A₀ (GBq)</label>
          <input class="tool-textarea" id="bat-a0" type="number" step="any" value="100.0" placeholder="100.0 GBq Activity" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bat-time">Time t (hours)</label>
          <input class="tool-textarea" id="bat-time" type="number" step="any" value="23.0" placeholder="23.0 h (Peak Milk Time)" />
        </div>
      </div>
      <div id="bat-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bat-res-ad" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">86.3 GBq (Tc-99m)</span>
            <span class="stat-label">Daughter Isotope Activity A₂(t)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bat-res-peak" style="font-weight:700;">Peak Daughter Activity: 86.4 GBq @ t_max = 22.9 Hours (Transient Equilibrium)</span>
            <span class="stat-label">Transient Equilibrium & Maximum Daughter Ingrowth Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const th1El = document.getElementById('bat-th1'), th2El = document.getElementById('bat-th2');
  const a0El = document.getElementById('bat-a0'), tmEl = document.getElementById('bat-time');
  const adResEl = document.getElementById('bat-res-ad'), pkResEl = document.getElementById('bat-res-peak');

  function update() {
    const Th1 = parseFloat(th1El.value), Th2 = parseFloat(th2El.value);
    const A0 = parseFloat(a0El.value), t = parseFloat(tmEl.value);

    if (isNaN(Th1) || isNaN(Th2) || isNaN(A0) || isNaN(t) || Th1 <= 0 || Th2 <= 0 || A0 <= 0 || t < 0) return;

    const lambda1 = Math.LN2 / Th1;
    const lambda2 = Math.LN2 / Th2;

    // Parent activity A1(t) = A0 * exp(-lambda1 * t)
    const A1_t = A0 * Math.exp(-lambda1 * t);

    // Bateman equation for daughter activity A2(t):
    // A2(t) = A0 * ( lambda2 / (lambda2 - lambda1) ) * ( exp(-lambda1*t) - exp(-lambda2*t) )
    const A2_t = A0 * (lambda2 / (lambda2 - lambda1)) * (Math.exp(-lambda1 * t) - Math.exp(-lambda2 * t));

    // Time of maximum daughter activity: t_max = ln(lambda2 / lambda1) / (lambda2 - lambda1)
    const t_max = Math.log(lambda2 / lambda1) / (lambda2 - lambda1);
    const A2_max = A0 * (lambda2 / (lambda2 - lambda1)) * (Math.exp(-lambda1 * t_max) - Math.exp(-lambda2 * t_max));

    adResEl.textContent = A2_t.toFixed(1) + ' GBq Daughter Activity (Parent: ' + A1_t.toFixed(1) + ' GBq)';
    pkResEl.textContent = 'Peak: ' + A2_max.toFixed(1) + ' GBq @ t_max = ' + t_max.toFixed(1) + ' h (' + (Th1 > Th2 ? 'Transient Equilibrium A₂/A₁ = ' + (lambda2/(lambda2-lambda1)).toFixed(2) : 'No Equilibrium') + ')';
  }

  [th1El, th2El, a0El, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter radioactive parent isotope half-life $T_{1/2}$ in hours (e.g. 66.0 h for Mo-99).',
      'Enter decay daughter isotope half-life $T_{1/2}$ in hours (e.g. 6.0 h for medical Tc-99m).',
      'Enter initial parent radioactive source activity $A_0$ in GBq / mCi.',
      'Enter elapsed decay ingrowth time in hours.',
      'Inspect instantaneous daughter activity $A_2(t)$, parent activity $A_1(t)$, and optimal radiopharmaceutical elution harvest time $t_{\max}$.'
    ],
    benefitTitle: 'Harry Bateman 1910 Radioactive Transformation Equations',
    benefitContent: 'Medical Technetium-99m nuclear imaging generators rely on the Bateman equation; daughter Tc-99m ingrowth peaks at approximately 23 hours ($t_{\max}$), allowing hospital radiopharmacies to milk fresh doses daily from Mo-99 fission cows.',
    faqs: [{ q: 'What is the difference between Secular and Transient Equilibrium?', a: 'Secular equilibrium occurs when parent half-life is thousands of times longer than daughter ($T_1 \gg T_2$), locking daughter activity equal to parent; Transient equilibrium occurs when parent is moderately longer ($T_1 \sim 10\times T_2$).' }]
  },

  // 3. Radiation Gamma Shielding & Half-Value Layer (HVL) Calculator
  {
    slug: 'radiation-gamma-shielding-half-value-layer-calculator',
    name: 'Radiation Gamma Shielding & Half-Value Layer (HVL) Attenuation Calculator',
    description: 'Calculate gamma/X-ray photon radiation dose attenuation (I = I₀ · e^(-μ·x) = I₀ · (1/2)^(x / HVL)) and Tenth-Value Layer (TVL) thickness in Lead, Concrete, Steel, and Water.',
    category: 'Science',
    icon: 'text',
    keywords: ['radiation shielding calculator', 'gamma attenuation half value layer hvl formula online', 'tenth value layer tvl lead concrete shield calculator', 'xray radiation protection lead thickness calculator', 'nuclear radiation linear attenuation coefficient online'],
    order: 688,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Shielding Material (Lead, Concrete, Steel, Water), Shield Thickness x (cm) & Initial Dose Rate (mSv/h)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="shld-mat">Material (Cs-137)</label>
          <select class="tool-textarea" id="shld-mat">
            <option value="lead" selected>Lead (Pb: HVL = 0.55 cm, TVL = 1.83 cm)</option>
            <option value="steel">Steel / Iron (Fe: HVL = 1.60 cm, TVL = 5.32 cm)</option>
            <option value="concrete">Concrete (HVL = 4.80 cm, TVL = 15.9 cm)</option>
            <option value="water">Water (HVL = 10.5 cm, TVL = 34.9 cm)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="shld-thk">Thickness x (cm)</label>
          <input class="tool-textarea" id="shld-thk" type="number" step="any" value="2.5" placeholder="2.5 cm Shield" />
        </div>
        <div class="control-group">
          <label class="control-label" for="shld-i0">Initial Rate (mSv/h)</label>
          <input class="tool-textarea" id="shld-i0" type="number" step="any" value="50.0" placeholder="50.0 mSv/h Unshielded" />
        </div>
      </div>
      <div id="shld-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="shld-res-i" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.15 mSv / h (95.7% Attenuation)</span>
            <span class="stat-label">Transmitted Radiation Dose Rate (I)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="shld-res-hvl" style="font-weight:700;">4.55 Half-Value Layers (Dose Reduced by 23.3× Factor)</span>
            <span class="stat-label">Equivalent Half-Value Layers (x / HVL)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('shld-mat'), thkEl = document.getElementById('shld-thk'), i0El = document.getElementById('shld-i0');
  const iResEl = document.getElementById('shld-res-i'), hvlResEl = document.getElementById('shld-res-hvl');

  const SHIELDS = {
    'lead':     { hvl_cm: 0.55, mu_cm: 1.26, name: 'Lead' },
    'steel':    { hvl_cm: 1.60, mu_cm: 0.433, name: 'Steel' },
    'concrete': { hvl_cm: 4.80, mu_cm: 0.144, name: 'Concrete' },
    'water':    { hvl_cm: 10.5, mu_cm: 0.066, name: 'Water' }
  };

  function update() {
    const s = SHIELDS[matEl.value];
    const xCm = parseFloat(thkEl.value), I0 = parseFloat(i0El.value);

    if (isNaN(xCm) || isNaN(I0) || xCm < 0 || I0 <= 0) return;

    // Number of HVLs = x / HVL
    const numHvl = xCm / s.hvl_cm;

    // Attenuated dose rate I = I0 * (0.5)^numHvl = I0 * exp(-mu * x)
    const I = I0 * Math.pow(0.5, numHvl);
    const attenPct = ((I0 - I) / I0) * 100;
    const reductionFactor = I0 / I;

    iResEl.textContent = (I < 0.01 ? I.toExponential(2) : I.toFixed(2)) + ' mSv / h (' + attenPct.toFixed(1) + '% Blocked)';
    hvlResEl.textContent = numHvl.toFixed(2) + ' HVLs (' + s.name + ' Shield: ' + reductionFactor.toFixed(1) + '× Dose Reduction, TVL = ' + (s.hvl_cm * 3.322).toFixed(1) + ' cm)';
  }

  matEl.addEventListener('change', update);
  thkEl.addEventListener('input', update);
  i0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select protective radiation barrier shielding material (Lead, Steel, High-Density Concrete, Water).',
      'Enter barrier shield thickness in centimeters.',
      'Enter unshielded gamma/X-ray radiation source dose rate in mSv/h or mR/h.',
      'Inspect transmitted attenuated dose rate, total percentage of radiation blocked, and number of Half-Value Layers (HVL).'
    ],
    benefitTitle: 'Beer-Lambert Photon Attenuation Law',
    benefitContent: 'High atomic number (Z) and high density materials like Lead ($Z=82, \rho=11.3\text{ g/cm}^3$) maximize photoelectric absorption and Compton scattering cross-sections, compressing required shield wall thickness by 10× compared to concrete.',
    faqs: [{ q: 'What is a Tenth-Value Layer (TVL)?', a: 'A TVL is the shield thickness required to reduce radiation intensity by 90% (to $1/10\text{th}$ of original dose), equal to approximately $3.322 \times \text{HVL}$.' }]
  },

  // 4. Thermal Neutron Diffusion Length & Slowing-Down Area Calculator
  {
    slug: 'neutron-diffusion-length-slowing-down-calculator',
    name: 'Thermal Neutron Diffusion Length (L) & Migration Area (M²) Calculator',
    description: 'Calculate nuclear reactor moderator thermal neutron diffusion length (L = √(D / Σ_a)) in cm and total migration area (M² = L² + τ) for Light Water, Heavy Water, and Graphite.',
    category: 'Science',
    icon: 'text',
    keywords: ['neutron diffusion length calculator', 'neutron migration area formula m squared equals l squared plus tau', 'fermi age neutron slowing down calculator online', 'nuclear reactor moderator diffusion length online', 'light water vs heavy water graphite neutron diffusion calculator'],
    order: 689,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Nuclear Moderator Selection (Light Water H₂O, Heavy Water D₂O, Graphite C, Beryllium Be)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="mod-type">Moderator Material</label>
        <select class="tool-textarea" id="mod-type">
          <option value="h2o" selected>Light Water (H₂O: High Moderating Power, Short L = 2.85 cm)</option>
          <option value="d2o">Heavy Water (D₂O: Ultra-Low Absorption, Huge L = 171.0 cm - CANDU)</option>
          <option value="graphite">Nuclear Graphite (C: L = 59.0 cm - RBMK / Magnox)</option>
          <option value="be">Beryllium (Be: L = 21.0 cm - Research Reactors)</option>
        </select>
      </div>
      <div id="mod-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mod-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L = 2.85 cm Diffusion Length</span>
            <span class="stat-label">Thermal Neutron Diffusion Length (L = √(D/Σ_a))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mod-res-m2" style="font-weight:700;">Migration Area M² = 35.1 cm² (Fermi Age τ = 27.0 cm² | Crow Flight: 14.5 cm)</span>
            <span class="stat-label">Neutron Migration Area (M² = L² + τ) & Fission Displacement</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const modEl = document.getElementById('mod-type');
  const lResEl = document.getElementById('mod-res-l'), mResEl = document.getElementById('mod-res-m2');

  const MODS = {
    'h2o':      { L_cm: 2.85, tau_cm2: 27.0, D_cm: 0.16, sa_cm: 0.022, desc: 'PWR / BWR Standard: Compact Core, requires Enriched U-235' },
    'd2o':      { L_cm: 171.0, tau_cm2: 131.0, D_cm: 0.87, sa_cm: 0.00003, desc: 'CANDU Reactor: Natural Uranium Fuel (0.7% U-235) capable' },
    'graphite': { L_cm: 59.0, tau_cm2: 368.0, D_cm: 0.84, sa_cm: 0.00024, desc: 'Gas-Cooled / RBMK: High slowing down Fermi age' },
    'be':       { L_cm: 21.0, tau_cm2: 102.0, D_cm: 0.50, sa_cm: 0.0011, desc: 'High-Flux Compact Neutron Reflector' }
  };

  function update() {
    const m = MODS[modEl.value];
    // Migration area M^2 = L^2 + tau  [cm^2]
    const M2 = Math.pow(m.L_cm, 2) + m.tau_cm2;
    const r_crow = Math.sqrt(6 * M2); // Root mean square crow-flight travel distance

    lResEl.textContent = 'L = ' + m.L_cm.toFixed(2) + ' cm (D = ' + m.D_cm + ' cm, Σ_a = ' + m.sa_cm + ' cm⁻¹)';
    mResEl.textContent = 'M² = ' + Math.round(M2).toLocaleString() + ' cm² (Fermi Age τ = ' + m.tau_cm2 + ' cm² | RMS Travel: ' + r_crow.toFixed(1) + ' cm) - ' + m.desc;
  }

  modEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select reactor moderator substance (Light Water $H_2O$, Heavy Water $D_2O$, Nuclear Grade Graphite, Beryllium).',
      'Inspect thermal neutron diffusion length L in cm, Fermi slowing down age $\tau$, and total migration area $M^2 = L^2 + \tau$.'
    ],
    benefitTitle: 'Thermalization & Neutron Economy',
    benefitContent: 'Heavy water ($D_2O$) has an absorption cross-section 700× lower than light water ($\Sigma_a = 3\times 10^{-5}\text{ cm}^{-1}$ vs $0.022\text{ cm}^{-1}$), yielding an enormous diffusion length ($L = 171\text{ cm}$) that allows CANDU reactors to achieve criticality using unenriched natural uranium.',
    faqs: [{ q: 'What is Fermi Age (τ)?', a: 'Fermi age ($\tau$) is the slowing-down area representing the mean squared distance a fast 2 MeV fission neutron travels while slowing down to thermal energy (0.025 eV).' }]
  },

  // 5. Inhour Equation Reactor Period & Prompt Criticality Calculator
  {
    slug: 'fission-delayed-neutron-inhour-reactor-period-calculator',
    name: 'Inhour Equation Nuclear Reactor Period (T) & Prompt Jump Calculator',
    description: 'Calculate nuclear reactor asymptotic power doubling period T (Inhour formula: ρ = l* / T + Σ (β_i / (1 + λ_i·T))) in seconds and evaluate prompt critical ($1.00 Dollar) safety margins.',
    category: 'Science',
    icon: 'text',
    keywords: ['inhour equation calculator', 'reactor period formula t equals l star over rho plus beta', 'prompt critical dollar reactivity calculator online', 'delayed neutron fraction beta reactor kinetics online', 'nuclear reactor period doubling time calculator'],
    order: 690,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inserted Reactivity ρ (pcm or Dollars $), Prompt Lifetime l* (μs) & Delayed Fraction β (0.0065)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="inh-rho">Reactivity ρ (pcm)</label>
          <input class="tool-textarea" id="inh-rho" type="number" step="10" value="100.0" placeholder="100.0 pcm (+0.15 $)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="inh-lstar">Prompt Lifetime l* (μs)</label>
          <input class="tool-textarea" id="inh-lstar" type="number" step="any" value="30.0" placeholder="30.0 μs (PWR Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="inh-beta">Delayed Fraction β</label>
          <input class="tool-textarea" id="inh-beta" type="number" step="0.0005" value="0.0065" placeholder="0.0065 (U-235)" />
        </div>
      </div>
      <div id="inh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="inh-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Reactor Period T = 55.0 Seconds</span>
            <span class="stat-label">Stable Reactor Period (e-Folding Time T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="inh-res-dol" style="color:var(--green-dark); font-weight:700;">Reactivity: +0.154 $ (Dollars) | Power Doubling Time: 38.1 s (Delayed Critical Controlled)</span>
            <span class="stat-label">Dollar Reactivity ($ = ρ / β) & Safe Controllability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rhoEl = document.getElementById('inh-rho'), lEl = document.getElementById('inh-lstar'), bEl = document.getElementById('inh-beta');
  const tResEl = document.getElementById('inh-res-t'), dResEl = document.getElementById('inh-res-dol');

  // One-group effective delayed precursor decay constant lambda_eff approx 0.08 s^-1
  const lambda_eff = 0.08;

  function update() {
    const rhoPcm = parseFloat(rhoEl.value), lstarUs = parseFloat(lEl.value), beta = parseFloat(bEl.value);
    if (isNaN(rhoPcm) || isNaN(lstarUs) || isNaN(beta) || lstarUs <= 0 || beta <= 0) return;

    const rho = rhoPcm * 1e-5; // pcm to absolute delta k / k
    const dollar = rho / beta;
    const lstarSec = lstarUs * 1e-6;

    let T_sec = 0;
    let statusDesc = '';
    let color = '#22543d';

    if (rho >= beta) {
      // Prompt Supercritical regime! Period governed purely by prompt neutron lifetime
      T_sec = lstarSec / (rho - beta);
      statusDesc = 'PROMPT SUPERCRITICAL ($ ≥ 1.00): Explosive Millisecond Power Runaway (Chernobyl Condition!)';
      color = '#c53030';
    } else if (rho > 0) {
      // Delayed critical regime: T approx = (beta - rho) / (lambda_eff * rho)
      T_sec = (beta - rho) / (lambda_eff * rho);
      const tDouble = T_sec * Math.LN2;
      statusDesc = 'SAFE DELAYED CRITICAL: Controllable via Mechanical Rods (Doubling Time: ' + tDouble.toFixed(1) + ' s)';
      color = '#22543d';
    } else {
      T_sec = (beta - rho) / (lambda_eff * rho);
      statusDesc = 'SUBCRITICAL: Power Decaying Exponentially with Period T = ' + Math.abs(T_sec).toFixed(1) + ' s';
      color = '#2563eb';
    }

    tResEl.textContent = 'Reactor Period T = ' + (T_sec > 0 ? '+' : '') + (Math.abs(T_sec) < 0.01 ? T_sec.toExponential(2) : T_sec.toFixed(1)) + ' s';
    dResEl.textContent = 'Reactivity: ' + (dollar >= 0 ? '+' : '') + dollar.toFixed(3) + ' $ Dollars | ' + statusDesc;
    dResEl.style.color = color;
  }

  [rhoEl, lEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter inserted reactivity $\rho$ in pcm ($100\text{ pcm} = 0.00100$).',
      'Enter mean prompt neutron generation lifetime $l^*$ in microseconds ($\mu\text{s}$, typically 20 to 50 $\mu\text{s}$ for thermal reactors).',
      'Enter total delayed neutron fraction $\beta$ (0.0065 for U-235 fission).',
      'Inspect stable asymptotic reactor period T (time to multiply power by e = 2.718×) and Dollar reactivity ($ = \rho/\beta).'
    ],
    benefitTitle: 'Delayed Neutrons & Nuclear Reactor Controllability',
    benefitContent: 'Delayed neutrons emitted seconds after fission by precursor fragments (e.g. Br-87, I-137) lengthen the reactor response time from microseconds to tens of seconds ($T \sim 60\text{ s}$), making nuclear reactors safely controllable by mechanical motor-driven control rods.',
    faqs: [{ q: 'What is Prompt Critical ($1.00 Dollar Reactivity)?', a: 'When inserted reactivity equals the delayed neutron fraction ($\rho = \beta$, or $1.00), the reactor goes critical on prompt neutrons alone without waiting for delayed neutrons, triggering explosive millisecond power spikes.' }]
  },

  // --- Suite WWWW: Polymer Science, Rheology & Plastic Injection Molding (811 - 815) ---
  // 6. Mark-Houwink Intrinsic Viscosity Polymer Molecular Weight Calculator
  {
    slug: 'mark-houwink-equation-polymer-molar-mass-calculator',
    name: 'Mark-Houwink Equation Polymer Viscosity-Average Molar Mass (M_v) Calculator',
    description: 'Calculate polymer viscosity-average molecular weight (M_v = ([η] / K)^(1/a)) in g/mol from dilute solution intrinsic viscosity [η] in dL/g and Mark-Houwink constants K and a.',
    category: 'Science',
    icon: 'text',
    keywords: ['mark houwink equation calculator', 'intrinsic viscosity polymer molecular weight formula online', 'viscosity average molar mass mv calculator', 'polymer dilute solution viscometry mark houwink online', 'polystyrene pmma polyethylene molar mass calculator'],
    order: 691,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Intrinsic Viscosity [η] (dL/g), Mark-Houwink Constant K (dL/g) & Exponent a',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mh-eta">Viscosity [η] (dL/g)</label>
          <input class="tool-textarea" id="mh-eta" type="number" step="any" value="1.25" placeholder="1.25 dL/g" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mh-k">Constant K (dL/g)</label>
          <input class="tool-textarea" id="mh-k" type="number" step="any" value="1.1e-4" placeholder="1.1e-4 dL/g (Polystyrene)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mh-a">Exponent a</label>
          <input class="tool-textarea" id="mh-a" type="number" step="0.01" value="0.725" placeholder="0.725 (Good Solvent)" />
        </div>
      </div>
      <div id="mh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mh-res-mv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">M_v = 368,000 g / mol</span>
            <span class="stat-label">Viscosity-Average Molecular Weight (M_v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mh-res-conf" style="font-weight:700;">Degree of Polymerization DP ≈ 3,534 Monomer Units (Flexible Random Coil)</span>
            <span class="stat-label">Polymer Chain Conformation & Chain Length</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const etaEl = document.getElementById('mh-eta'), kEl = document.getElementById('mh-k'), aEl = document.getElementById('mh-a');
  const mvResEl = document.getElementById('mh-res-mv'), cfResEl = document.getElementById('mh-res-conf');

  function update() {
    const eta = parseFloat(etaEl.value), K = parseFloat(kEl.value), a = parseFloat(aEl.value);
    if (isNaN(eta) || isNaN(K) || isNaN(a) || eta <= 0 || K <= 0 || a <= 0) return;

    // Mark-Houwink: [eta] = K * (M_v)^a  =>  M_v = ( [eta] / K )^(1 / a)
    const Mv = Math.pow(eta / K, 1 / a);
    const DP = Mv / 104.15; // assuming styrene monomer Mw = 104.15 g/mol

    let solventQuality = '';
    if (a < 0.5) solventQuality = 'Collapsed Compact Globule (a < 0.5)';
    else if (Math.abs(a - 0.5) < 0.02) solventQuality = 'Theta Solvent Condition (Ideal Unperturbed Gaussian Coil, a = 0.50)';
    else if (a <= 0.8) solventQuality = 'Good Solvent Expanded Random Coil (0.5 < a < 0.8)';
    else solventQuality = 'Semi-Rigid / Rigid Extended Rod Polymer Chain (a > 0.8)';

    mvResEl.textContent = 'M_v = ' + Math.round(Mv).toLocaleString() + ' g / mol (' + (Mv / 1000).toFixed(1) + ' kDa)';
    cfResEl.textContent = solventQuality + ' | DP ≈ ' + Math.round(DP).toLocaleString() + ' Monomer Units';
  }

  [etaEl, kEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter capillary Ubbelohde viscometer extrapolated intrinsic viscosity $[\eta]$ in dL/g.',
      'Enter polymer-solvent Mark-Houwink constant K in dL/g.',
      'Enter Mark-Houwink scaling exponent a (0.50 for Theta solvent, 0.70 to 0.80 for good solvents).',
      'Inspect viscosity-average molar mass $M_v$ in g/mol and evaluate polymer chain solvent hydrodynamic conformation.'
    ],
    benefitTitle: 'Herman Mark & Roelof Houwink 1938 Hydrodynamic Scaling',
    benefitContent: 'Dilute solution viscometry provides an inexpensive, rapid method to determine polymer molecular weights ($[\eta] = K M_v^a$) without requiring expensive Gel Permeation Chromatography (GPC) light scattering instruments.',
    faqs: [{ q: 'What does a Mark-Houwink exponent a = 0.5 indicate?', a: '$a = 0.50$ indicates the Flory Theta ($\theta$) condition where polymer-solvent interactions exactly balance polymer-polymer segment attractions, producing ideal random Gaussian coils.' }]
  },

  // 7. Flory-Huggins Polymer Solution & Blend Free Energy of Mixing Calculator
  {
    slug: 'flory-huggins-polymer-solution-free-energy-calculator',
    name: 'Flory-Huggins Polymer Solution Free Energy of Mixing (ΔG_m) Calculator',
    description: 'Calculate polymer-solvent mixing thermodynamics (ΔG_m / (R·T) = n₁·ln φ₁ + n₂·ln φ₂ + χ·n₁·φ₂) and determine the Flory-Huggins critical interaction parameter χ_crit for phase separation.',
    category: 'Science',
    icon: 'text',
    keywords: ['flory huggins calculator', 'free energy of mixing polymer solution formula online', 'flory interaction parameter chi critical calculator', 'polymer miscibility phase separation calculator online', 'polymer thermodynamics flory huggins online'],
    order: 692,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solvent Volume Fraction φ₁, Polymer Degree of Polymerization N & Flory Interaction Parameter χ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fh-phi">Polymer Fraction φ₂</label>
          <input class="tool-textarea" id="fh-phi" type="number" step="0.05" min="0.01" max="0.99" value="0.25" placeholder="0.25 (25% Polymer)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fh-n">Polymer Length N</label>
          <input class="tool-textarea" id="fh-n" type="number" step="100" value="1000" placeholder="1000 Segments" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fh-chi">Interaction Parameter χ</label>
          <input class="tool-textarea" id="fh-chi" type="number" step="0.05" value="0.45" placeholder="0.45 (Flory χ)" />
        </div>
      </div>
      <div id="fh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fh-res-dg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ΔG_m / RT = -0.131 (Miscible)</span>
            <span class="stat-label">Dimensionless Free Energy of Mixing (ΔG_m / N_total·RT)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fh-res-crit" style="color:var(--green-dark); font-weight:700;">χ_crit = 0.532 (χ < χ_crit: Completely Miscible Single-Phase Solution)</span>
            <span class="stat-label">Critical Interaction Parameter (χ_crit = 1/2 · (1 + 1/√N)²)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phiEl = document.getElementById('fh-phi'), nEl = document.getElementById('fh-n'), chiEl = document.getElementById('fh-chi');
  const dgResEl = document.getElementById('fh-res-dg'), crResEl = document.getElementById('fh-res-crit');

  function update() {
    const phi2 = parseFloat(phiEl.value), N = parseFloat(nEl.value), chi = parseFloat(chiEl.value);
    if (isNaN(phi2) || isNaN(N) || isNaN(chi) || phi2 <= 0 || phi2 >= 1.0 || N <= 1) return;

    const phi1 = 1.0 - phi2;

    // Flory-Huggins lattice model:
    // delta_G_m / (N_sites * R * T) = phi1 * ln(phi1) + (phi2 / N) * ln(phi2) + chi * phi1 * phi2
    const termEntropy = (phi1 * Math.log(phi1)) + ((phi2 / N) * Math.log(phi2));
    const termEnthalpy = chi * phi1 * phi2;
    const deltaG = termEntropy + termEnthalpy;

    // Critical Flory parameter chi_crit = 0.5 * ( 1 + 1/sqrt(N) )^2
    const chiCrit = 0.5 * Math.pow(1 + (1 / Math.sqrt(N)), 2);

    let miscible = '';
    let color = '#22543d';

    if (chi < chiCrit) {
      miscible = 'χ = ' + chi.toFixed(2) + ' < χ_crit (' + chiCrit.toFixed(3) + '): HOMOGENEOUS MISCIBLE SOLUTION';
      color = '#22543d';
    } else {
      miscible = 'χ = ' + chi.toFixed(2) + ' > χ_crit (' + chiCrit.toFixed(3) + '): PHASE SEPARATION (Cloud Point Demixing)';
      color = '#c53030';
    }

    dgResEl.textContent = 'ΔG_m / RT = ' + deltaG.toFixed(4) + ' (Entropy: ' + termEntropy.toFixed(4) + ', Enthalpy: +' + termEnthalpy.toFixed(4) + ')';
    crResEl.textContent = miscible;
    crResEl.style.color = color;
  }

  [phiEl, nEl, chiEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter polymer volume fraction $\phi_2$ (e.g. 0.25 for 25% polymer solution).',
      'Enter polymer degree of polymerization chain segment length N (e.g. 1000).',
      'Enter Flory-Huggins pairwise interaction parameter $\chi$.',
      'Inspect total Free Energy of Mixing $\Delta G_m / RT$ and compare $\chi$ against the spinodal critical threshold $\chi_{\text{crit}}$.'
    ],
    benefitTitle: 'Paul Flory & Maurice Huggins 1942 Lattice Mixing Model',
    benefitContent: 'Because long polymer chains have extremely low combinatorial entropy of mixing ($1/N \to 0$), even small positive enthalpy interactions ($\chi > 0.5$) cause polymer solutions and plastic blends to phase separate into two immiscible layers.',
    faqs: [{ q: 'Why are most plastic polymer blends immiscible?', a: 'Mixing two high-molecular-weight polymers ($N_1, N_2 \gg 1000$) provides virtually zero entropy of mixing, so any slight positive $\chi$ causes immediate phase separation.' }]
  },

  // 8. Carreau-Yasuda Polymer Melt Shear-Thinning Viscosity Calculator
  {
    slug: 'carreau-yasuda-shear-thinning-viscosity-calculator',
    name: 'Carreau-Yasuda Polymer Melt Shear-Thinning Viscosity Calculator',
    description: 'Calculate non-Newtonian pseudoplastic polymer melt viscosity (η(γ̇) = η_∞ + (η₀ - η_∞) · [1 + (λ·γ̇)^a]^((n - 1)/a)) in Pa·s across extrusion and injection shear rates.',
    category: 'Science',
    icon: 'text',
    keywords: ['carreau yasuda viscosity calculator', 'polymer melt shear thinning formula non newtonian', 'pseudoplastic polymer viscosity shear rate calculator', 'power law polymer rheology carreau calculator online', 'injection molding polymer viscosity online'],
    order: 693,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Zero-Shear Viscosity η₀ (Pa·s), Relaxation Time λ (s), Power-Law Exponent n & Shear Rate γ̇ (s⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cy-eta0">Zero-Shear η₀ (Pa·s)</label>
          <input class="tool-textarea" id="cy-eta0" type="number" step="any" value="5000" placeholder="5000 Pa·s (Polypropylene)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-lam">Relaxation λ (s)</label>
          <input class="tool-textarea" id="cy-lam" type="number" step="any" value="0.10" placeholder="0.10 s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-n">Power-Law n</label>
          <input class="tool-textarea" id="cy-n" type="number" step="0.05" value="0.35" placeholder="0.35 (Shear-Thinning)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-gamma">Shear Rate γ̇ (s⁻¹)</label>
          <input class="tool-textarea" id="cy-gamma" type="number" step="any" value="1000" placeholder="1000 s⁻¹ (Injection Mold)" />
        </div>
      </div>
      <div id="cy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cy-res-eta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">η = 250.6 Pa · s</span>
            <span class="stat-label">Apparent Non-Newtonian Viscosity (η(γ̇))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cy-res-drop" style="font-weight:700;">95.0% Viscosity Reduction (5,000 Pa·s at rest -> 251 Pa·s under shear)</span>
            <span class="stat-label">Pseudoplastic Shear-Thinning Multiplier</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eta0El = document.getElementById('cy-eta0'), lamEl = document.getElementById('cy-lam');
  const nEl = document.getElementById('cy-n'), gamEl = document.getElementById('cy-gamma');
  const eResEl = document.getElementById('cy-res-eta'), dpResEl = document.getElementById('cy-res-drop');

  function update() {
    const eta0 = parseFloat(eta0El.value), lambda = parseFloat(lamEl.value);
    const n = parseFloat(nEl.value), gammaDot = parseFloat(gamEl.value);

    if (isNaN(eta0) || isNaN(lambda) || isNaN(n) || isNaN(gammaDot) || eta0 <= 0 || lambda <= 0 || n <= 0 || gammaDot <= 0) return;

    // Carreau-Yasuda model with standard transition parameter a = 2:
    // eta(gammaDot) = eta0 * [ 1 + (lambda * gammaDot)^2 ]^( (n - 1) / 2 )
    const term = 1.0 + Math.pow(lambda * gammaDot, 2);
    const eta = eta0 * Math.pow(term, (n - 1) / 2);
    const dropPct = ((eta0 - eta) / eta0) * 100;

    eResEl.textContent = 'η = ' + eta.toFixed(1) + ' Pa · s (Apparent Viscosity)';
    dpResEl.textContent = dropPct.toFixed(1) + '% Shear-Thinning Drop (Shear Stress τ = ' + Math.round(eta * gammaDot).toLocaleString() + ' Pa @ γ̇ = ' + gammaDot + ' s⁻¹)';
  }

  [eta0El, lamEl, nEl, gamEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter zero-shear Newtonian plateau viscosity $\eta_0$ in Pa·s.',
      'Enter characteristic polymer chain relaxation time constant $\lambda$ in seconds.',
      'Enter power-law index n ($n < 1.0$ for pseudoplastic shear-thinning melts).',
      'Enter process shear rate $\dot\gamma$ in $s^{-1}$ (e.g. $10\text{ s}^{-1}$ for extrusion, $1000\text{ s}^{-1}$ for injection mold gates).',
      'Inspect apparent dynamic viscosity $\eta(\dot\gamma)$ in Pa·s and percentage shear-thinning reduction.'
    ],
    benefitTitle: 'Molecular Chain Uncoiling & Alignment',
    benefitContent: 'Under high shear rates ($\dot\gamma > 1/\lambda$), entangled polymer random coils stretch and align parallel to the flow streamlines, drastically reducing intermolecular friction and dropping viscosity by 90%+ during rapid injection molding cavity filling.',
    faqs: [{ q: 'Why is shear-thinning crucial for plastic injection molding?', a: 'It allows high-molecular-weight polymers with excellent mechanical strength to flow freely through narrow mold gates without requiring extreme hydraulic pressures.' }]
  },

  // 9. Plastic Injection Molding Clamping Force Tonnage Calculator
  {
    slug: 'injection-molding-clamping-force-tonnage-calculator',
    name: 'Plastic Injection Molding Machine Clamping Force Tonnage Calculator',
    description: 'Calculate plastic injection molding machine hydraulic/electric clamp tonnage (F_clamp = P_cavity · A_projected · Safety_Factor / 1000) in metric tonnes and US tons.',
    category: 'Science',
    icon: 'text',
    keywords: ['injection molding clamping force calculator', 'clamp tonnage formula projected area cavity pressure', 'plastic injection molding machine tonnage calculator online', 'mold cavity projected area tonnage calculator', 'molding press clamp force online'],
    order: 694,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Projected Part Area A_proj (cm²), Cavity Count, Cavity Pressure P_cav (bar) & Safety Margin',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="clm-area">Single Part Area (cm²)</label>
          <input class="tool-textarea" id="clm-area" type="number" step="any" value="120.0" placeholder="120.0 cm² (Projected)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="clm-cav">Cavity Count</label>
          <input class="tool-textarea" id="clm-cav" type="number" step="1" value="4" placeholder="4 Cavities" />
        </div>
        <div class="control-group">
          <label class="control-label" for="clm-p">Cavity Pressure (bar)</label>
          <input class="tool-textarea" id="clm-p" type="number" step="any" value="400.0" placeholder="400.0 bar (PP / ABS)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="clm-sf">Safety Factor</label>
          <input class="tool-textarea" id="clm-sf" type="number" step="0.05" value="1.15" placeholder="1.15 (15% Margin)" />
        </div>
      </div>
      <div id="clm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="clm-res-ton" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">225 Metric Tonnes</span>
            <span class="stat-label">Required Machine Clamping Force (248 US Tons)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="clm-res-tot" style="font-weight:700;">Total Projected Area: 480 cm² (74.4 in²) | Force: 2,210 kN</span>
            <span class="stat-label">Total Mold Opening Force & Projected Shot Area</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('clm-area'), cEl = document.getElementById('clm-cav');
  const pEl = document.getElementById('clm-p'), sfEl = document.getElementById('clm-sf');
  const tnResEl = document.getElementById('clm-res-ton'), totResEl = document.getElementById('clm-res-tot');

  function update() {
    const singleAreaCm2 = parseFloat(aEl.value), cavities = parseFloat(cEl.value);
    const pBar = parseFloat(pEl.value), sf = parseFloat(sfEl.value);

    if (isNaN(singleAreaCm2) || isNaN(cavities) || isNaN(pBar) || isNaN(sf) || singleAreaCm2 <= 0 || cavities <= 0 || pBar <= 0 || sf < 1.0) return;

    // Total projected area including runner system (+10% for cold runner)
    const totalAreaCm2 = singleAreaCm2 * cavities * 1.10;
    const totalAreaM2 = totalAreaCm2 / 10000;

    // Pressure in Pa: pBar * 1e5
    const pPa = pBar * 1e5;

    // Opening Force F = P * Area  [Newtons]
    const F_open_N = pPa * totalAreaM2;

    // Clamp Force with safety factor: F_clamp = F_open * sf  [Newtons]
    const F_clamp_N = F_open_N * sf;
    const F_clamp_kN = F_clamp_N / 1000;

    // Metric Tonnes (1 tonne = 9.80665 kN)
    const metricTonnes = F_clamp_kN / 9.80665;
    const usTons = metricTonnes * 1.10231;

    tnResEl.textContent = Math.round(metricTonnes) + ' Metric Tonnes (' + Math.round(usTons) + ' US Tons Clamp)';
    totResEl.textContent = 'Projected Area: ' + Math.round(totalAreaCm2) + ' cm² (with Runners) | Peak Separating Force: ' + Math.round(F_clamp_kN) + ' kN';
  }

  [aEl, cEl, pEl, sfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter single molded part projected surface area on the mold parting line in $cm^2$.',
      'Enter number of mold cavities.',
      'Enter peak mold cavity plastic injection pressure in bar (typically 300 to 600 bar for engineering thermoplastics).',
      'Enter safety margin multiplier (typically 1.10 to 1.20).',
      'Inspect required injection molding press clamping tonnage in metric tonnes and US tons to prevent flash defects.'
    ],
    benefitTitle: 'Parting Line Flash Prevention',
    benefitContent: 'During high-pressure packing and holding, molten polymer exerts millions of Newtons of hydraulic separating force against the mold parting plane ($F = P \cdot A$); insufficient clamping tonnage allows the mold halves to separate slightly, causing molten plastic to bleed into flash defects.',
    faqs: [{ q: 'What rule of thumb tonnage is used per square inch of projected area?', a: 'Standard commercial rule of thumb is 3 to 5 US tons of clamp force per square inch ($0.5\text{ to }0.8\text{ tonnes/cm}^2$) of projected shot area.' }]
  },

  // 10. Polymer Melt Flow Index (MFI / MFR) to Capillary Shear Rate Calculator
  {
    slug: 'polymer-melt-flow-index-mfi-shear-rate-calculator',
    name: 'Polymer Melt Flow Index (MFI / MFR) & Capillary Shear Rate Calculator',
    description: 'Calculate standard ASTM D1238 polymer Melt Flow Index (MFI in g/10min), volumetric extrusion rate Q, and apparent capillary die wall shear rate (γ̇_w = 4·Q / (π·R³)).',
    category: 'Science',
    icon: 'text',
    keywords: ['melt flow index calculator', 'mfi mfr formula astm d1238 online', 'capillary wall shear rate mfi calculator online', 'polymer rheometer melt flow rate calculator', 'polyethylene melt flow index viscosity online'],
    order: 695,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Melt Flow Index (g / 10 min), Polymer Melt Density ρ_melt (g/cm³) & Test Load (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mfi-val">MFI (g / 10 min)</label>
          <input class="tool-textarea" id="mfi-val" type="number" step="any" value="12.0" placeholder="12.0 g/10min (Injection Grade)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mfi-rho">Melt Density (g/cm³)</label>
          <input class="tool-textarea" id="mfi-rho" type="number" step="0.01" value="0.76" placeholder="0.76 g/cm³ (Molten PE/PP)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mfi-wt">Test Load (kg)</label>
          <input class="tool-textarea" id="mfi-wt" type="number" step="any" value="2.16" placeholder="2.16 kg (ASTM D1238)" />
        </div>
      </div>
      <div id="mfi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mfi-res-gam" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">γ̇_w = 23.9 s⁻¹ Die Shear</span>
            <span class="stat-label">Apparent Wall Shear Rate in Standard Orifice (γ̇_w)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mfi-res-flow" style="font-weight:700;">Volumetric Flow Q = 26.3 mm³ / s | Orifice Velocity: 7.74 mm/s</span>
            <span class="stat-label">Melt Extrusion Volumetric Discharge Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mfiEl = document.getElementById('mfi-val'), rhoEl = document.getElementById('mfi-rho'), wtEl = document.getElementById('mfi-wt');
  const gResEl = document.getElementById('mfi-res-gam'), flResEl = document.getElementById('mfi-res-flow');

  // Standard ASTM D1238 die: Diameter D = 2.095 mm (Radius R = 1.0475 mm), Length L = 8.000 mm
  const R_die_mm = 1.0475;
  const R_die_m = R_die_mm / 1000;

  function update() {
    const MFI = parseFloat(mfiEl.value), rhoMelt = parseFloat(rhoEl.value), loadKg = parseFloat(wtEl.value);
    if (isNaN(MFI) || isNaN(rhoMelt) || isNaN(loadKg) || MFI <= 0 || rhoMelt <= 0 || loadKg <= 0) return;

    // Mass flow rate in g / s: MFI / 600
    const massFlowGs = MFI / 600;

    // Volumetric flow rate Q in cm^3 / s: massFlow / rhoMelt
    const Q_cm3_s = massFlowGs / rhoMelt;
    const Q_mm3_s = Q_cm3_s * 1000;
    const Q_m3_s = Q_cm3_s * 1e-6;

    // Apparent wall shear rate gammaDot_w = (4 * Q) / (pi * R^3)  [s^-1]
    const gammaDot_w = (4 * Q_m3_s) / (Math.PI * Math.pow(R_die_m, 3));

    // Die velocity v = Q / (pi * R^2)
    const v_mm_s = Q_mm3_s / (Math.PI * Math.pow(R_die_mm, 2));

    gResEl.textContent = 'γ̇_w = ' + gammaDot_w.toFixed(1) + ' s⁻¹ Apparent Die Wall Shear Rate';
    flResEl.textContent = 'Q = ' + Q_mm3_s.toFixed(1) + ' mm³/s (Linear Die Speed: ' + v_mm_s.toFixed(2) + ' mm/s @ ' + loadKg + ' kg Load)';
  }

  [mfiEl, rhoEl, wtEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Melt Flow Index (MFI / MFR) in grams per 10 minutes (g/10 min).',
      'Enter molten polymer melt density in $g/\text{cm}^3$ (typically 0.74 to 0.78 $g/\text{cm}^3$ at 190°C–230°C).',
      'Enter standard test piston load in kg (e.g. 2.16 kg or 5.0 kg per ASTM D1238 / ISO 1133).',
      'Inspect apparent wall shear rate $\dot\gamma_w$ in $s^{-1}$ and volumetric flow rate Q in $mm^3/\text{s}$.'
    ],
    benefitTitle: 'ASTM D1238 / ISO 1133 Extrusion Plastometer Standard',
    benefitContent: 'MFI is inversely related to molecular weight; high MFI resins (>15 g/10min) have lower molecular weights and viscosity suited for fast injection molding thin-wall packaging, while low MFI resins (<1.0 g/10min) provide high melt strength for blown film extrusion and pipe manufacturing.',
    faqs: [{ q: 'Why is MFI measured at 10-minute intervals?', a: 'Historical legacy standard: early plastometers required 10 minutes to collect sufficient extrudate mass for accurate physical weighing on laboratory balance scales.' }]
  },

  // --- Suite XXXX: Microfluidics, BioMEMS & Lab-on-a-Chip (816 - 820) ---
  // 11. Microfluidic Rectangular Channel Hydraulic Resistance Calculator
  {
    slug: 'microfluidic-rectangular-channel-hydraulic-resistance-calculator',
    name: 'Microfluidic Rectangular Channel Hydraulic Resistance (R_h) & Flow Calculator',
    description: 'Calculate microfluidic rectangular channel laminar hydraulic resistance (R_h ≈ 12·μ·L / (w·h³ · (1 - 0.63·h/w))) in Pa·s/m³ and pressure drop ΔP across Lab-on-a-Chip channels.',
    category: 'Science',
    icon: 'text',
    keywords: ['microfluidic hydraulic resistance calculator', 'rectangular channel flow resistance formula online', 'lab on a chip pressure drop calculator online', 'poiseuille flow rectangular microchannel calculator', 'microfluidics flow rate pressure drop online'],
    order: 696,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Channel Width w (μm), Channel Height h (μm), Length L (mm) & Flow Rate Q (μL/min)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mf-w">Width w (μm)</label>
          <input class="tool-textarea" id="mf-w" type="number" step="any" value="200.0" placeholder="200.0 μm Width" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mf-h">Height h (μm)</label>
          <input class="tool-textarea" id="mf-h" type="number" step="any" value="50.0" placeholder="50.0 μm (h < w)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mf-l">Length L (mm)</label>
          <input class="tool-textarea" id="mf-l" type="number" step="any" value="20.0" placeholder="20.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mf-q">Flow Q (μL/min)</label>
          <input class="tool-textarea" id="mf-q" type="number" step="any" value="10.0" placeholder="10.0 μL/min" />
        </div>
      </div>
      <div id="mf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mf-res-dp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ΔP = 1.95 kPa (19.5 mbar)</span>
            <span class="stat-label">Channel Pressure Drop (ΔP = Q · R_h)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mf-res-rh" style="font-weight:700;">R_h = 1.17 × 10¹¹ Pa·s/m³ (Fluidic Ohm's Law: ΔP = Q·R_h)</span>
            <span class="stat-label">Laminar Rectangular Hydraulic Resistance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('mf-w'), hEl = document.getElementById('mf-h');
  const lEl = document.getElementById('mf-l'), qEl = document.getElementById('mf-q');
  const dpResEl = document.getElementById('mf-res-dp'), rhResEl = document.getElementById('mf-res-rh');

  const mu_water = 0.001; // Pa * s (dynamic viscosity of water at 20°C)

  function update() {
    let wUm = parseFloat(wEl.value), hUm = parseFloat(hEl.value);
    const lMm = parseFloat(lEl.value), qUlMin = parseFloat(qEl.value);

    if (isNaN(wUm) || isNaN(hUm) || isNaN(lMm) || isNaN(qUlMin) || wUm <= 0 || hUm <= 0 || lMm <= 0 || qUlMin <= 0) return;

    // Ensure h <= w for standard shallow rectangular aspect ratio formula
    if (hUm > wUm) {
      const temp = wUm;
      wUm = hUm;
      hUm = temp;
    }

    const wM = wUm * 1e-6;
    const hM = hUm * 1e-6;
    const lM = lMm * 1e-3;

    // Volumetric flow rate Q in m^3 / s: (qUlMin * 1e-9) / 60
    const Q_m3_s = (qUlMin * 1e-9) / 60;

    // Hydraulic resistance for rectangular channel (h < w):
    // R_h = (12 * mu * L) / ( w * h^3 * ( 1 - 0.63 * (h / w) ) )  [Pa * s / m^3]
    const Rh = (12 * mu_water * lM) / (wM * Math.pow(hM, 3) * (1 - (0.63 * (hM / wM))));

    // Pressure drop delta_P = Q * R_h  [Pa]
    const dP_Pa = Q_m3_s * Rh;
    const dP_kpa = dP_Pa / 1000;
    const dP_mbar = dP_Pa / 100;

    dpResEl.textContent = 'ΔP = ' + dP_kpa.toFixed(2) + ' kPa (' + dP_mbar.toFixed(1) + ' mbar)';
    rhResEl.textContent = 'R_h = ' + Rh.toExponential(2) + ' Pa·s/m³ (Fluidic Ohm\'s Law ΔP = Q·R_h | Velocity: ' + ((Q_m3_s/(wM*hM))*1000).toFixed(1) + ' mm/s)';
  }

  [wEl, hEl, lEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter microchannel width w in micrometers ($\mu\text{m}$).',
      'Enter microchannel depth / height h in micrometers ($\mu\text{m}$).',
      'Enter total channel length L in millimeters.',
      'Enter syringe pump volumetric infusion flow rate Q in $\mu\text{L/min}$.',
      'Inspect hydraulic flow resistance $R_h$ in $\text{Pa}\cdot\text{s/m}^3$ and required driving pressure drop $\Delta P$ in kPa and mbar.'
    ],
    benefitTitle: 'Fluidic Ohm\'s Law Analogy in Microfluidics',
    benefitContent: 'At low Reynolds numbers ($Re \ll 1$), microchannel flow is strictly linear and Stokes-governed; hydraulic resistance ($R_h$) acts exactly like electrical resistance ($\Delta P = Q \cdot R_h$), enabling engineers to design complex passive fluidic splitters and resistor networks.',
    faqs: [{ q: 'Why does channel height h have a cubic (h³) effect on resistance?', a: 'Because Poiseuille viscous wall shear scales with $1/h^3$; halving channel height increases pressure drop by a factor of 8×.' }]
  },

  // 12. Capillary Action & Jurin's Law Meniscus Height Calculator
  {
    slug: 'capillary-action-jurins-law-meniscus-height-calculator',
    name: 'Capillary Action & Jurin\'s Law Meniscus Rise Height Calculator',
    description: 'Calculate capillary tube liquid rise height (h = (2·γ·cos θ) / (ρ·g·r)) in mm and capillary Laplace pressure differential (ΔP = 2·γ·cos θ / r) from surface tension and contact angle.',
    category: 'Science',
    icon: 'text',
    keywords: ['jurins law calculator', 'capillary action rise height formula 2 gamma cos theta over rho g r', 'surface tension capillary tube height calculator online', 'contact angle meniscus height calculator', 'microfluidics capillary pressure online'],
    order: 697,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Capillary Radius r (μm), Contact Angle θ (°) & Surface Tension γ (mN/m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cap-r">Radius r (μm)</label>
          <input class="tool-textarea" id="cap-r" type="number" step="any" value="100.0" placeholder="100.0 μm (0.1 mm Tube)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-th">Contact Angle θ (°)</label>
          <input class="tool-textarea" id="cap-th" type="number" step="1" value="20.0" placeholder="20.0° (Hydrophilic Glass)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cap-gam">Surface Tension γ</label>
          <input class="tool-textarea" id="cap-gam" type="number" step="any" value="72.8" placeholder="72.8 mN/m (Water @ 20°C)" />
        </div>
      </div>
      <div id="cap-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cap-res-ht" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">h = 139.5 mm Rise</span>
            <span class="stat-label">Capillary Equilibrium Rise Height (h = 2γ·cos θ / ρ·g·r)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cap-res-lp" style="font-weight:700;">Laplace Pressure: 1,368 Pa (13.7 mbar Self-Pumping Suction)</span>
            <span class="stat-label">Capillary Suction Pressure Differential (ΔP = 2γ·cos θ / r)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('cap-r'), thEl = document.getElementById('cap-th'), gamEl = document.getElementById('cap-gam');
  const hResEl = document.getElementById('cap-res-ht'), lpResEl = document.getElementById('cap-res-lp');

  const g = 9.80665;
  const rho_water = 1000.0; // kg / m^3

  function update() {
    const rUm = parseFloat(rEl.value), thDeg = parseFloat(thEl.value), gamMnm = parseFloat(gamEl.value);
    if (isNaN(rUm) || isNaN(thDeg) || isNaN(gamMnm) || rUm <= 0 || gamMnm <= 0 || thDeg < 0 || thDeg > 180) return;

    const rM = rUm * 1e-6;
    const gamNm = gamMnm * 1e-3; // mN/m to N/m
    const thRad = (thDeg * Math.PI) / 180;

    // Jurin's law: h = (2 * gamma * cos(theta)) / (rho * g * r)  [meters]
    const hM = (2 * gamNm * Math.cos(thRad)) / (rho_water * g * rM);
    const hMm = hM * 1000;

    // Capillary Laplace suction pressure: deltaP = (2 * gamma * cos(theta)) / r  [Pa]
    const dP_Pa = (2 * gamNm * Math.cos(thRad)) / rM;

    let behavior = '';
    if (thDeg < 90) {
      behavior = 'Hydrophilic Capillary Rise (+Spontaneous Inflow Wicking)';
    } else if (thDeg === 90) {
      behavior = 'Neutral Meniscus (Zero Capillary Force)';
    } else {
      behavior = 'Hydrophobic Capillary Depression (Requires External Pressure to Enter)';
    }

    hResEl.textContent = 'h = ' + hMm.toFixed(1) + ' mm (' + (hMm / 10).toFixed(2) + ' cm Rise Height)';
    lpResEl.textContent = 'Laplace Suction: ' + Math.round(dP_Pa).toLocaleString() + ' Pa (' + (dP_Pa / 100).toFixed(1) + ' mbar) - ' + behavior;
  }

  [rEl, thEl, gamEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter capillary channel circular pore radius r in micrometers ($\mu\text{m}$).',
      'Enter liquid-solid contact wetting angle $\theta$ in degrees ($<90^\circ$ hydrophilic, $>90^\circ$ hydrophobic).',
      'Enter liquid surface tension $\gamma$ in mN/m (72.8 mN/m for pure water at 20°C).',
      'Inspect spontaneous capillary meniscus rise height in millimeters and self-priming capillary Laplace suction pressure.'
    ],
    benefitTitle: 'James Jurin 1718 Capillary Action Equation',
    benefitContent: 'Capillary action drives paper microfluidics, lateral flow diagnostic test strips (e.g. pregnancy tests, rapid COVID kits), and plant xylem sap transport without requiring any external battery or mechanical pump.',
    faqs: [{ q: 'What happens when contact angle exceeds 90° (hydrophobic)?', a: 'When $\theta > 90^\circ$, $\cos\theta$ becomes negative, meaning the liquid experiences capillary repulsion and will not enter the channel without positive applied pressure.' }]
  },

  // 13. Droplet Microfluidics Capillary (Ca) & Weber (We) Number Calculator
  {
    slug: 'droplet-microfluidics-capillary-weber-number-calculator',
    name: 'Droplet Microfluidics Capillary (Ca) & Weber (We) Number Calculator',
    description: 'Calculate two-phase microfluidic droplet generation Capillary number (Ca = μ·v / γ) and Weber number (We = ρ·v²·L / γ) to predict Dripping vs Jetting regimes in T-junctions and flow-focusing devices.',
    category: 'Science',
    icon: 'text',
    keywords: ['droplet microfluidics calculator', 'capillary number formula ca equals mu v over gamma', 'weber number microfluidics calculator online', 'droplet generation dripping vs jetting calculator', 'flow focusing t junction microdroplets online'],
    order: 698,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Continuous Phase Velocity v (m/s), Viscosity μ (mPa·s) & Interfacial Tension γ (mN/m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="drp-v">Velocity v (m/s)</label>
          <input class="tool-textarea" id="drp-v" type="number" step="any" value="0.05" placeholder="0.05 m/s (50 mm/s)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drp-mu">Oil Viscosity μ</label>
          <input class="tool-textarea" id="drp-mu" type="number" step="any" value="5.0" placeholder="5.0 mPa·s (Mineral Oil)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drp-gam">Interfacial γ</label>
          <input class="tool-textarea" id="drp-gam" type="number" step="any" value="5.0" placeholder="5.0 mN/m (Surfactant)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drp-w">Channel Width (μm)</label>
          <input class="tool-textarea" id="drp-w" type="number" step="any" value="100.0" placeholder="100.0 μm Orifice" />
        </div>
      </div>
      <div id="drp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="drp-res-ca" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Ca = 0.050 (Dripping Regime)</span>
            <span class="stat-label">Capillary Number (Ca = μ·v / γ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="drp-res-reg" style="color:var(--green-dark); font-weight:700;">Monodisperse Dripping Regime (Ca < 0.1: Highly Uniform Droplets)</span>
            <span class="stat-label">Droplet Generation Regime & Weber Number</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('drp-v'), muEl = document.getElementById('drp-mu');
  const gamEl = document.getElementById('drp-gam'), wEl = document.getElementById('drp-w');
  const caResEl = document.getElementById('drp-res-ca'), rgResEl = document.getElementById('drp-res-reg');

  const rho_oil = 850.0; // kg / m^3

  function update() {
    const vMs = parseFloat(vEl.value), muMpaS = parseFloat(muEl.value);
    const gamMnm = parseFloat(gamEl.value), wUm = parseFloat(wEl.value);

    if (isNaN(vMs) || isNaN(muMpaS) || isNaN(gamMnm) || isNaN(wUm) || vMs <= 0 || muMpaS <= 0 || gamMnm <= 0 || wUm <= 0) return;

    const muPaS = muMpaS * 1e-3;
    const gamNm = gamMnm * 1e-3;
    const wM = wUm * 1e-6;

    // Capillary number Ca = (mu * v) / gamma
    const Ca = (muPaS * vMs) / gamNm;

    // Weber number We = (rho * v^2 * w) / gamma
    const We = (rho_oil * Math.pow(vMs, 2) * wM) / gamNm;

    caResEl.textContent = 'Ca = ' + Ca.toFixed(3) + ' (Capillary Number)';

    let regime = '';
    let color = '#22543d';

    if (Ca < 0.01) {
      regime = 'SQUEEZING REGIME (Ca << 1: Droplets fill channel cross-section, volume governed by flow ratio)';
      color = '#2563eb';
    } else if (Ca <= 0.10) {
      regime = 'DRIPPING REGIME (0.01 < Ca < 0.1: Highly Monodisperse Spherical Droplets, CV < 2%)';
      color = '#22543d';
    } else {
      regime = 'JETTING REGIME (Ca > 0.10: Unstable Long Filament Jet, Polydisperse Droplet Breakup)';
      color = '#c53030';
    }

    rgResEl.textContent = regime + ' | We = ' + We.toExponential(2);
    rgResEl.style.color = color;
  }

  [vEl, muEl, gamEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter continuous oil phase flow velocity v in m/s.',
      'Enter continuous oil dynamic viscosity in $\text{mPa}\cdot\text{s}$ (cP).',
      'Enter oil-water interfacial tension $\gamma$ in mN/m with surfactant (e.g. Span-80).',
      'Enter flow-focusing nozzle orifice width in micrometers ($\mu\text{m}$).',
      'Inspect dimensionless Capillary number (Ca), Weber number (We), and determine whether droplet generation operates in Squeezing, Dripping, or Jetting mode.'
    ],
    benefitTitle: 'Single-Cell Encapsulation & Digital PCR Microfluidics',
    benefitContent: 'Operating flow-focusing droplet generators in the dripping regime ($Ca \sim 0.05$) creates millions of ultra-monodisperse picoliter aqueous droplets per hour ($CV < 2\%$), enabling high-throughput single-cell RNA sequencing and droplet digital PCR (ddPCR).',
    faqs: [{ q: 'Why is surfactant essential in droplet microfluidics?', a: 'Fluorosurfactants lower interfacial tension ($\gamma$) to promote clean droplet pinch-off and prevent generated droplets from coalescing when collected in a vial.' }]
  },

  // 14. Dielectrophoresis (DEP) Cell Trapping Force Calculator
  {
    slug: 'dielectrophoresis-dep-particle-trapping-force-calculator',
    name: 'Dielectrophoresis (DEP) Cell Sorting & Trapping Force Calculator',
    description: 'Calculate AC electric field Dielectrophoresis force on biological cells (F_DEP = 2π · ε_m · r³ · Re[K(ω)] · ∇|E|²) in piconewtons (pN) for positive/negative DEP separation.',
    category: 'Science',
    icon: 'text',
    keywords: ['dielectrophoresis calculator', 'dep force formula biological cell sorting', 'clausius mossotti factor calculator online', 'ac electrokinetics cell trapping dep force calculator', 'microfluidic cell separation dielectrophoresis online'],
    order: 699,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cell Radius r (μm), Clausius-Mossotti Factor Re[K], Electric Field Gradient ∇|E|² (V²/m³) & Medium Relative ε_r',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dep-r">Cell Radius r (μm)</label>
          <input class="tool-textarea" id="dep-r" type="number" step="any" value="7.5" placeholder="7.5 μm (Cancer CTC)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dep-cm">Re[K(ω)] Factor</label>
          <input class="tool-textarea" id="dep-cm" type="number" step="0.05" min="-0.5" max="1.0" value="0.75" placeholder="0.75 (Positive pDEP)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dep-grad">Grad ∇|E|² (V²/m³)</label>
          <input class="tool-textarea" id="dep-grad" type="number" step="any" value="1.0e15" placeholder="1.0e15 V²/m³ (Microelectrodes)" />
        </div>
      </div>
      <div id="dep-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dep-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">F_DEP = +702 pN Trapping</span>
            <span class="stat-label">Dielectrophoretic Force (F_DEP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dep-res-dir" style="color:var(--green-dark); font-weight:700;">Positive pDEP: Cells attracted toward microelectrode high-field edges</span>
            <span class="stat-label">DEP Directional Migration Behavior</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('dep-r'), cmEl = document.getElementById('dep-cm'), grEl = document.getElementById('dep-grad');
  const fResEl = document.getElementById('dep-res-f'), dResEl = document.getElementById('dep-res-dir');

  const eps0 = 8.854187817e-12; // F / m
  const eps_r_water = 78.5; // aqueous medium relative permittivity

  function update() {
    const rUm = parseFloat(rEl.value), ReK = parseFloat(cmEl.value), gradE2 = parseFloat(grEl.value);
    if (isNaN(rUm) || isNaN(ReK) || isNaN(gradE2) || rUm <= 0 || gradE2 <= 0) return;

    const rM = rUm * 1e-6;
    const eps_m = eps_r_water * eps0;

    // F_DEP = 2 * pi * eps_m * r^3 * Re[K] * grad(|E|^2)  [Newtons]
    const F_dep_N = 2 * Math.PI * eps_m * Math.pow(rM, 3) * ReK * gradE2;
    const F_dep_pN = F_dep_N * 1e12; // Newtons to piconewtons

    let dirText = '';
    let color = '#22543d';

    if (ReK > 0) {
      dirText = 'POSITIVE pDEP (Re[K] > 0): Cells pulled toward microelectrode edges (High Electric Field Gradients)';
      color = '#22543d';
    } else if (ReK < 0) {
      dirText = 'NEGATIVE nDEP (Re[K] < 0): Cells repelled away from electrodes toward channel center field nulls';
      color = '#2563eb';
    } else {
      dirText = 'CROSSOVER FREQUENCY (Re[K] = 0): Zero DEP net force on cell';
      color = '#d97706';
    }

    fResEl.textContent = 'F_DEP = ' + (F_dep_pN >= 0 ? '+' : '') + Math.round(F_dep_pN).toLocaleString() + ' pN (' + (F_dep_pN > 0 ? 'Attraction' : 'Repulsion') + ')';
    dResEl.textContent = dirText;
    dResEl.style.color = color;
  }

  [rEl, cmEl, grEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter biological cell spherical radius r in micrometers ($\mu\text{m}$) (e.g. 7.5 $\mu\text{m}$ for Circulating Tumor Cells CTCs, 3.5 $\mu\text{m}$ for red blood cells).',
      'Enter real part of the Clausius-Mossotti polarizability factor $\text{Re}[K(\omega)]$ (-0.5 to +1.0).',
      'Enter electric field gradient $\nabla|E|^2$ in $V^2/m^3$ generated across interdigitated microelectrodes.',
      'Inspect Dielectrophoretic force in piconewtons (pN) and determine if cells experience positive trapping (pDEP) or negative repulsion (nDEP).'
    ],
    benefitTitle: 'Herbert Pohl 1978 Non-Uniform AC Dielectrophoresis',
    benefitContent: 'Because DEP force scales with cell volume ($F_{\text{DEP}} \propto r^3$), label-free microfluidic chips isolate rare cancer tumor cells from whole blood based purely on size and intrinsic dielectric membrane capacitance.',
    faqs: [{ q: 'What is the DEP Crossover Frequency?', a: 'The crossover frequency is the AC electric field frequency where $\text{Re}[K(\omega)] = 0$; below this frequency cells experience nDEP, while above it they switch to pDEP.' }]
  },

  // 15. Péclet Number & Microfluidic Diffusive Mixing Length Calculator
  {
    slug: 'peclet-number-microfluidic-molecular-mixing-calculator',
    name: 'Péclet Number (Pe = v·w / D) & Microchannel Diffusive Mixing Length Calculator',
    description: 'Calculate microfluidic mass transport Péclet number (Pe = v · w / D) and required laminar diffusive mixing channel length (L_mix ≈ w · Pe) in mm for small molecules and proteins.',
    category: 'Science',
    icon: 'text',
    keywords: ['peclet number calculator', 'microfluidic mixing length formula l mix equals w times pe', 'mass transport diffusion vs advection calculator', 'laminar flow diffusion channel length calculator online', 'lab on a chip molecular mixing online'],
    order: 700,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flow Velocity v (mm/s), Channel Width w (μm) & Diffusion Coeff D (m²/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pec-v">Velocity v (mm/s)</label>
          <input class="tool-textarea" id="pec-v" type="number" step="any" value="5.0" placeholder="5.0 mm/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pec-w">Width w (μm)</label>
          <input class="tool-textarea" id="pec-w" type="number" step="any" value="100.0" placeholder="100.0 μm Channel" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pec-d">Diffusivity D (m²/s)</label>
          <input class="tool-textarea" id="pec-d" type="number" step="any" value="5.0e-10" placeholder="5.0e-10 m²/s (Small Solute)" />
        </div>
      </div>
      <div id="pec-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pec-res-pe" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Pe = 1,000 (Advection Dominated)</span>
            <span class="stat-label">Mass Transport Péclet Number (Pe = v·w / D)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pec-res-lmix" style="font-weight:700;">L_mix ≈ 100.0 mm (Diffusion Time: 10.0 s - Requires Herringbone Chaotic Mixer)</span>
            <span class="stat-label">Diffusive Complete Mixing Length (L_mix ≈ w · Pe)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('pec-v'), wEl = document.getElementById('pec-w'), dEl = document.getElementById('pec-d');
  const peResEl = document.getElementById('pec-res-pe'), lmResEl = document.getElementById('pec-res-lmix');

  function update() {
    const vMms = parseFloat(vEl.value), wUm = parseFloat(wEl.value), D = parseFloat(dEl.value);
    if (isNaN(vMms) || isNaN(wUm) || isNaN(D) || vMms <= 0 || wUm <= 0 || D <= 0) return;

    const vMs = vMms * 1e-3;
    const wM = wUm * 1e-6;

    // Peclet number Pe = (v * w) / D
    const Pe = (vMs * wM) / D;

    // Diffusive time t_diff approx = w^2 / (2 * D)
    const t_diff = Math.pow(wM, 2) / (2 * D);

    // Diffusive mixing length L_mix approx = v * t_diff = (v * w^2) / (2 * D) = (w * Pe) / 2
    const L_mix_m = (wM * Pe) / 2;
    const L_mix_mm = L_mix_m * 1000;

    peResEl.textContent = 'Pe = ' + Math.round(Pe).toLocaleString() + ' (Advection / Diffusion Ratio)';

    let mixStrategy = '';
    if (Pe < 1.0) {
      mixStrategy = 'L_mix ≈ ' + L_mix_mm.toFixed(2) + ' mm: Fast Pure Molecular Diffusion';
    } else if (L_mix_mm < 10.0) {
      mixStrategy = 'L_mix ≈ ' + L_mix_mm.toFixed(1) + ' mm: Straight Laminar Co-Flow Channel Sufficient (t_diff = ' + t_diff.toFixed(2) + ' s)';
    } else {
      mixStrategy = 'L_mix ≈ ' + L_mix_mm.toFixed(1) + ' mm (Impractically Long): Staggered Herringbone Chaotic Mixer (SHM) Required';
    }

    lmResEl.textContent = mixStrategy;
  }

  [vEl, wEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter microchannel mean stream velocity in mm/s.',
      'Enter channel diffusion distance width w in micrometers ($\mu\text{m}$).',
      'Enter solute molecular diffusion coefficient D in $m^2/\text{s}$ (typically $10^{-9}\text{ m}^2/\text{s}$ for ions/salts, $10^{-10}$ for small drugs, $10^{-11}$ for proteins/DNA).',
      'Inspect dimensionless Péclet number (Pe) and required straight microchannel diffusive mixing length in millimeters.'
    ],
    benefitTitle: 'Jean Claude Péclet Advective-Diffusive Balance',
    benefitContent: 'Because microfluidic flows have zero turbulence ($Re < 1$), mixing relies strictly on molecular diffusion; large biomolecules (proteins/antibodies) have high Péclet numbers ($Pe > 1000$) requiring active chaotic herringbone groove mixers to fold fluid streamlines.',
    faqs: [{ q: 'Why is passive mixing difficult in microfluidic chips?', a: 'Laminar flow streamlines remain perfectly parallel without turbulent eddies; molecules can only cross stream boundaries via slow Brownian diffusion.' }]
  },

  // --- Suite YYYY: Aerospace Navigation, Orbital Tracking & Geodesy (821 - 825) ---
  // 16. Great Circle Haversine Distance & Initial Bearing Calculator
  {
    slug: 'great-circle-haversine-distance-bearing-calculator',
    name: 'Great Circle Haversine Distance & Initial Azimuth Bearing Calculator',
    description: 'Calculate spherical Earth shortest great-circle navigation distance in kilometers/nautical miles and initial compass forward azimuth bearing between two GPS coordinates.',
    category: 'Science',
    icon: 'text',
    keywords: ['great circle distance calculator', 'haversine formula distance bearing gps online', 'flight distance nautical miles haversine calculator', 'initial bearing compass azimuth calculator online', 'geodesy navigation great circle online'],
    order: 701,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Origin (Lat₁, Lon₁) and Destination (Lat₂, Lon₂) Decimal Degrees',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hav-lat1">Lat₁ (°)</label>
          <input class="tool-textarea" id="hav-lat1" type="number" step="any" value="40.7128" placeholder="40.7128 (New York JFK)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hav-lon1">Lon₁ (°)</label>
          <input class="tool-textarea" id="hav-lon1" type="number" step="any" value="-74.0060" placeholder="-74.0060 (New York)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hav-lat2">Lat₂ (°)</label>
          <input class="tool-textarea" id="hav-lat2" type="number" step="any" value="51.5074" placeholder="51.5074 (London LHR)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hav-lon2">Lon₂ (°)</label>
          <input class="tool-textarea" id="hav-lon2" type="number" step="any" value="-0.1278" placeholder="-0.1278 (London)" />
        </div>
      </div>
      <div id="hav-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hav-res-dist" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5,570 km (3,008 NM)</span>
            <span class="stat-label">Great-Circle Navigation Distance</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hav-res-brg" style="font-weight:700;">Initial True Heading Bearing: 051.2° (Northeast Track)</span>
            <span class="stat-label">Initial Forward Compass Azimuth Heading</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lat1El = document.getElementById('hav-lat1'), lon1El = document.getElementById('hav-lon1');
  const lat2El = document.getElementById('hav-lat2'), lon2El = document.getElementById('hav-lon2');
  const dResEl = document.getElementById('hav-res-dist'), bResEl = document.getElementById('hav-res-brg');

  const R_earth = 6371.0; // Mean Earth radius in km

  function update() {
    const lat1 = parseFloat(lat1El.value), lon1 = parseFloat(lon1El.value);
    const lat2 = parseFloat(lat2El.value), lon2 = parseFloat(lon2El.value);

    if (isNaN(lat1) || isNaN(lon1) || isNaN(lat2) || isNaN(lon2)) return;

    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLam = ((lon2 - lon1) * Math.PI) / 180;

    // Haversine formula:
    // a = sin^2(dPhi/2) + cos(phi1)*cos(phi2)*sin^2(dLam/2)
    // c = 2 * atan2( sqrt(a), sqrt(1-a) )
    const a = Math.pow(Math.sin(deltaPhi / 2), 2) + (Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(deltaLam / 2), 2));
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distKm = R_earth * c;
    const distNm = distKm * 0.539957;
    const distMiles = distKm * 0.621371;

    // Initial bearing theta = atan2( sin(dLam)*cos(phi2), cos(phi1)*sin(phi2) - sin(phi1)*cos(phi2)*cos(dLam) )
    const y = Math.sin(deltaLam) * Math.cos(phi2);
    const x = (Math.cos(phi1) * Math.sin(phi2)) - (Math.sin(phi1) * Math.cos(phi2) * Math.cos(deltaLam));
    let brgDeg = (Math.atan2(y, x) * 180) / Math.PI;
    brgDeg = (brgDeg + 360) % 360; // normalize to 0-360°

    dResEl.textContent = Math.round(distKm).toLocaleString() + ' km (' + Math.round(distNm).toLocaleString() + ' NM / ' + Math.round(distMiles).toLocaleString() + ' Miles)';
    bResEl.textContent = 'Initial Heading: ' + brgDeg.toFixed(1) + '° True Azimuth (Great Circle Arc)';
  }

  [lat1El, lon1El, lat2El, lon2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter departure airport / waypoint latitude and longitude in decimal degrees.',
      'Enter destination arrival latitude and longitude in decimal degrees.',
      'Inspect shortest orthodromic great circle track flight distance in kilometers, Nautical Miles (NM), and statute miles, along with the initial compass navigation heading bearing.'
    ],
    benefitTitle: 'James Inman 1835 Spherical Haversine Navigation',
    benefitContent: 'Great circle routes represent the shortest distance between any two points on a spherical planet; following a great circle flight path from New York to London takes aircraft over Newfoundland and Greenland, saving over 500 km compared to a straight line drawn on a flat Mercator map.',
    faqs: [{ q: 'Why does compass heading change constantly along a great circle route?', a: 'Because meridians of longitude converge toward the poles, a great circle arc crosses each meridian at a progressively changing angle.' }]
  },

  // 17. GPS Satellite Dilution of Precision (GDOP / PDOP) Positioning Error Calculator
  {
    slug: 'gps-dilution-of-precision-gdop-pdop-calculator',
    name: 'GPS Dilution of Precision (GDOP / PDOP) Positioning Accuracy Calculator',
    description: 'Calculate GNSS satellite constellation geometric quality (GDOP = √(PDOP² + TDOP²)) and total 3D user position accuracy error (3D Error = PDOP · UERE).',
    category: 'Science',
    icon: 'text',
    keywords: ['gps gdop pdop calculator', 'dilution of precision formula positioning error online', 'gnss satellite geometry pdop hdop vdop calculator', 'uere user equivalent range error gps calculator', 'satellite navigation positioning accuracy online'],
    order: 702,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Position DOP (PDOP), Time DOP (TDOP) & User Equivalent Range Error UERE (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dop-pdop">Position PDOP</label>
          <input class="tool-textarea" id="dop-pdop" type="number" step="0.1" value="1.8" placeholder="1.8 (Good Geometry)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dop-tdop">Time TDOP</label>
          <input class="tool-textarea" id="dop-tdop" type="number" step="0.1" value="1.1" placeholder="1.1 (Clock DOP)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dop-uere">UERE Error (m)</label>
          <input class="tool-textarea" id="dop-uere" type="number" step="any" value="2.5" placeholder="2.5 m (L1/L2 Dual-Freq)" />
        </div>
      </div>
      <div id="dop-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dop-res-gdop" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">GDOP = 2.11 (Excellent)</span>
            <span class="stat-label">Geometric Dilution of Precision (GDOP = √(PDOP² + TDOP²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dop-res-err" style="color:var(--green-dark); font-weight:700;">Estimated 3D Position Error: ±4.50 m (Horizontal HDOP: ±3.18 m)</span>
            <span class="stat-label">Expected 3D Navigation Position Error (1-Sigma)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pdopEl = document.getElementById('dop-pdop'), tdopEl = document.getElementById('dop-tdop'), uereEl = document.getElementById('dop-uere');
  const gdResEl = document.getElementById('dop-res-gdop'), erResEl = document.getElementById('dop-res-err');

  function update() {
    const PDOP = parseFloat(pdopEl.value), TDOP = parseFloat(tdopEl.value), UERE = parseFloat(uereEl.value);
    if (isNaN(PDOP) || isNaN(TDOP) || isNaN(UERE) || PDOP <= 0 || TDOP <= 0 || UERE <= 0) return;

    // GDOP = sqrt( PDOP^2 + TDOP^2 )
    const GDOP = Math.sqrt(Math.pow(PDOP, 2) + Math.pow(TDOP, 2));

    // 3D position error = PDOP * UERE  [meters]
    const posError3D = PDOP * UERE;

    // Approximate HDOP (horizontal) approx = PDOP * 0.707
    const HDOP = PDOP * 0.707;
    const posErrorHoriz = HDOP * UERE;

    let rating = '';
    let color = '#22543d';

    if (GDOP <= 2.0) {
      rating = 'IDEAL GEOMETRY (Open Sky Constellation)';
      color = '#22543d';
    } else if (GDOP <= 5.0) {
      rating = 'GOOD GEOMETRY (Standard Commercial Navigation)';
      color = '#22543d';
    } else if (GDOP <= 10.0) {
      rating = 'MODERATE GEOMETRY (Multipath / Urban Canyon Tree Canopy Obstruction)';
      color = '#d97706';
    } else {
      rating = 'POOR GEOMETRY (High Positioning Error - Unreliable Fix)';
      color = '#c53030';
    }

    gdResEl.textContent = 'GDOP = ' + GDOP.toFixed(2) + ' (' + rating + ')';
    erResEl.textContent = '3D Fix Accuracy: ±' + posError3D.toFixed(2) + ' m (Horizontal HDOP Error: ±' + posErrorHoriz.toFixed(2) + ' m @ UERE = ' + UERE + 'm)';
    erResEl.style.color = color;
  }

  [pdopEl, tdopEl, uereEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter 3D Position Dilution of Precision (PDOP) from GPS receiver NMEA stream.',
      'Enter Time Dilution of Precision (TDOP).',
      'Enter User Equivalent Range Error (UERE) in meters (typically ~2 to 5 meters for single-frequency GPS, <1 meter for dual-frequency RTK).',
      'Inspect total Geometric Dilution of Precision (GDOP) and calculated 3D real-time spatial positioning accuracy error in meters.'
    ],
    benefitTitle: 'Satellite Constellation Tetrahedron Geometry',
    benefitContent: 'DOP measures the geometric distribution of visible satellites; when satellites are widely spaced across all four quadrants of the sky, the volume of the intersecting user tetrahedron is maximized, minimizing error amplification (low PDOP < 2.0).',
    faqs: [{ q: 'Why is vertical GPS error (VDOP) always higher than horizontal error (HDOP)?', a: 'Because receivers cannot see satellites below the Earth horizon, the geometric lack of downward baseline angles naturally doubles vertical height uncertainty.' }]
  },

  // 18. WGS84 Geodetic to ECEF Cartesian Coordinate Converter
  {
    slug: 'wgs84-ellipsoid-geodetic-to-ecef-coordinates-calculator',
    name: 'WGS84 Geodetic (Lat, Lon, Alt) to ECEF (X, Y, Z) Coordinate Converter',
    description: 'Convert GPS WGS84 geodetic coordinates (Latitude φ, Longitude λ, Ellipsoidal Height h) into Earth-Centered Earth-Fixed (ECEF) 3D Cartesian coordinates (X, Y, Z) in meters.',
    category: 'Science',
    icon: 'text',
    keywords: ['wgs84 to ecef calculator', 'geodetic lat lon alt to ecef xyz formula online', 'earth centered earth fixed coordinate converter', 'gps wgs84 ellipsoid prime vertical radius calculator', 'geodesy aerospace coordinate transformation online'],
    order: 703,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Latitude φ (Decimal Degrees), Longitude λ (Decimal Degrees) & Height h (meters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ecef-lat">Latitude φ (°)</label>
          <input class="tool-textarea" id="ecef-lat" type="number" step="any" value="37.7749" placeholder="37.7749 (San Francisco)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ecef-lon">Longitude λ (°)</label>
          <input class="tool-textarea" id="ecef-lon" type="number" step="any" value="-122.4194" placeholder="-122.4194" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ecef-h">Height h (m)</label>
          <input class="tool-textarea" id="ecef-h" type="number" step="any" value="50.0" placeholder="50.0 m (Above Ellipsoid)" />
        </div>
      </div>
      <div id="ecef-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ecef-res-xyz" style="color:var(--green-dark); font-weight:800; font-size:1.4rem;">X: -2,706,629 m | Y: -4,260,835 m | Z: 3,885,618 m</span>
            <span class="stat-label">ECEF 3D Cartesian Coordinates (X, Y, Z)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ecef-res-n" style="font-weight:700;">Prime Vertical Radius N(φ) = 6,386,076 m (WGS84 a = 6378137.0 m, f = 1/298.257)</span>
            <span class="stat-label">WGS84 Reference Ellipsoid Radius of Curvature</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const latEl = document.getElementById('ecef-lat'), lonEl = document.getElementById('ecef-lon'), hEl = document.getElementById('ecef-h');
  const xyzResEl = document.getElementById('ecef-res-xyz'), nResEl = document.getElementById('ecef-res-n');

  // WGS84 Ellipsoid constants:
  const a = 6378137.0; // semi-major axis (meters)
  const f = 1 / 298.257223563; // flattening
  const e2 = (2 * f) - (Math.pow(f, 2)); // first eccentricity squared = 0.00669437999014

  function update() {
    const latDeg = parseFloat(latEl.value), lonDeg = parseFloat(lonEl.value), h = parseFloat(hEl.value);
    if (isNaN(latDeg) || isNaN(lonDeg) || isNaN(h) || Math.abs(latDeg) > 90) return;

    const phi = (latDeg * Math.PI) / 180;
    const lambda = (lonDeg * Math.PI) / 180;

    // Radius of curvature in the prime vertical: N(phi) = a / sqrt( 1 - e^2 * sin^2(phi) )
    const N = a / Math.sqrt(1 - (e2 * Math.pow(Math.sin(phi), 2)));

    // ECEF coordinates:
    // X = (N + h) * cos(phi) * cos(lambda)
    // Y = (N + h) * cos(phi) * sin(lambda)
    // Z = (N * (1 - e^2) + h) * sin(phi)
    const X = (N + h) * Math.cos(phi) * Math.cos(lambda);
    const Y = (N + h) * Math.cos(phi) * Math.sin(lambda);
    const Z = ((N * (1 - e2)) + h) * Math.sin(phi);

    xyzResEl.textContent = 'X: ' + Math.round(X).toLocaleString() + ' m | Y: ' + Math.round(Y).toLocaleString() + ' m | Z: ' + Math.round(Z).toLocaleString() + ' m';
    nResEl.textContent = 'Prime Vertical N(φ) = ' + Math.round(N).toLocaleString() + ' m (Geocentric Radius R = ' + Math.round(Math.sqrt(X*X + Y*Y + Z*Z)).toLocaleString() + ' m)';
  }

  [latEl, lonEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter GPS WGS84 geodetic latitude $\phi$ in decimal degrees.',
      'Enter geodetic longitude $\lambda$ in decimal degrees.',
      'Enter ellipsoidal height h in meters above the reference datum.',
      'Inspect 3D Earth-Centered Earth-Fixed Cartesian coordinates (X, Y, Z) in meters.'
    ],
    benefitTitle: 'Bowring 1976 Geodetic-to-Cartesian Mapping',
    benefitContent: 'ECEF Cartesian coordinates represent position relative to Earth\'s center of mass with the Z-axis aligned to the rotation pole and X-axis intersecting the Prime Meridian; ECEF is the standard framework for GPS satellite ephemeris orbital tracking.',
    faqs: [{ q: 'Why is ellipsoidal height different from mean sea level (MSL) altitude?', a: 'Ellipsoidal height is measured relative to the mathematical WGS84 reference ellipsoid, whereas MSL altitude is measured relative to the gravitational Earth geoid (EGM96/2008).' }]
  },

  // 19. Earth Observation Satellite Swath Width & Ground Track Calculator
  {
    slug: 'satellite-ground-track-swath-width-calculator',
    name: 'Earth Observation Satellite Swath Width & Ground Speed Calculator',
    description: 'Calculate Earth observation remote sensing imaging swath width (Swath = 2 · R_E · arcsin(sin(FOV/2) · (R_E + h) / R_E) - FOV) and sub-satellite ground track velocity.',
    category: 'Science',
    icon: 'text',
    keywords: ['satellite swath width calculator', 'earth observation field of view fov swath formula', 'satellite ground track velocity calculator online', 'remote sensing sensor swath width calculator', 'orbital ground speed earth observation online'],
    order: 704,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Orbital Altitude h (km) & Sensor Total Field of View FOV (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="swth-h">Altitude h (km)</label>
          <input class="tool-textarea" id="swth-h" type="number" step="any" value="705.0" placeholder="705.0 km (Landsat / Sentinel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="swth-fov">Sensor FOV (°)</label>
          <input class="tool-textarea" id="swth-fov" type="number" step="any" value="15.0" placeholder="15.0° (Total Cross-Track FOV)" />
        </div>
      </div>
      <div id="swth-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="swth-res-sw" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">185.2 km Swath Width</span>
            <span class="stat-label">Cross-Track Imaging Ground Swath Width</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="swth-res-spd" style="font-weight:700;">Ground Track Speed: 6.76 km/s (24,336 km/h | Orbit Speed: 7.50 km/s)</span>
            <span class="stat-label">Sub-Satellite Ground Track Speed & Orbital Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('swth-h'), fovEl = document.getElementById('swth-fov');
  const swResEl = document.getElementById('swth-res-sw'), spResEl = document.getElementById('swth-res-spd');

  const R_earth = 6371.0; // km
  const mu_earth = 398600.4418; // km^3 / s^2

  function update() {
    const hKm = parseFloat(hEl.value), fovDeg = parseFloat(fovEl.value);
    if (isNaN(hKm) || isNaN(fovDeg) || hKm <= 0 || fovDeg <= 0 || fovDeg >= 180) return;

    const fovRad = (fovDeg * Math.PI) / 180;
    const halfFov = fovRad / 2;

    // Sensor swath calculation accounting for spherical Earth curvature:
    // sin(gamma) = ( (R_E + h) / R_E ) * sin(halfFov)
    const sinGamma = ((R_earth + hKm) / R_earth) * Math.sin(halfFov);
    if (sinGamma > 1.0) {
      swResEl.textContent = 'FOV Exceeds Horizon Limit (Wide Angle)';
      return;
    }
    const gamma = Math.asin(sinGamma);
    // Earth central angle lambda = gamma - halfFov
    const lambda = gamma - halfFov;
    // Ground swath width = 2 * R_earth * lambda
    const swathKm = 2 * R_earth * lambda;

    // Orbital speed v_orb = sqrt( mu / (R_E + h) )  [km / s]
    const v_orb = Math.sqrt(mu_earth / (R_earth + hKm));
    // Ground track speed v_ground = v_orb * (R_E / (R_E + h))
    const v_ground = v_orb * (R_earth / (R_earth + hKm));
    const v_ground_kmh = v_ground * 3600;

    swResEl.textContent = swathKm.toFixed(1) + ' km Swath (' + (swathKm * 0.539957).toFixed(1) + ' NM Width)';
    spResEl.textContent = 'Ground Track Speed: ' + v_ground.toFixed(2) + ' km/s (' + Math.round(v_ground_kmh).toLocaleString() + ' km/h | Orbit Speed: ' + v_orb.toFixed(2) + ' km/s)';
  }

  hEl.addEventListener('input', update);
  fovEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter circular orbital altitude h in kilometers (e.g. 705 km for Sun-Synchronous Landsat 8/9).',
      'Enter optical/SAR payload total cross-track Field of View (FOV) angle in degrees.',
      'Inspect spherical curved Earth ground swath width in kilometers and ground track velocity in km/s.'
    ],
    benefitTitle: 'Spherical Earth Geometric Swath Projection',
    benefitContent: 'Accounting for Earth\'s spherical curvature is essential for wide FOV sensors; flat-earth approximations underestimate ground swath width by over 15% at orbital altitudes above 500 km.',
    faqs: [{ q: 'Why is ground track velocity slower than orbital velocity?', a: 'Because the satellite traverses an orbit at radius $(R_E + h)$, projecting its motion onto the smaller spherical Earth surface ($R_E$) compresses the linear velocity by $R_E / (R_E + h)$.' }]
  },

  // 20. Inertial Navigation System (INS) Dead-Reckoning Sensor Drift Error Calculator
  {
    slug: 'inertial-navigation-dead-reckoning-drift-error-calculator',
    name: 'Inertial Navigation System (INS) Dead-Reckoning Drift Error Calculator',
    description: 'Calculate INS dead-reckoning navigation position drift error (x_drift = 1/2 · b_a · t² + 1/6 · b_g · g · t³) from accelerometer bias b_a (mg) and gyroscope bias drift b_g (°/hr).',
    category: 'Science',
    icon: 'text',
    keywords: ['ins drift error calculator', 'inertial navigation system dead reckoning error formula', 'gyroscope bias drift position error calculator online', 'accelerometer bias position error ins calculator', 'imu navigation sensor drift online'],
    order: 705,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Accelerometer Bias b_a (mg), Gyroscope Bias b_g (°/hr) & Mission Duration t (minutes)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ins-ba">Accel Bias b_a (mg)</label>
          <input class="tool-textarea" id="ins-ba" type="number" step="any" value="0.5" placeholder="0.5 mg (MEMS IMU)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ins-bg">Gyro Drift (°/hr)</label>
          <input class="tool-textarea" id="ins-bg" type="number" step="any" value="1.0" placeholder="1.0 °/hr (Tactical Grade)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ins-time">Time t (min)</label>
          <input class="tool-textarea" id="ins-time" type="number" step="any" value="10.0" placeholder="10.0 min (GPS Outage)" />
        </div>
      </div>
      <div id="ins-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ins-res-err" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">890.3 m Total Drift</span>
            <span class="stat-label">Dead-Reckoning Position Error After Elapsed Time</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ins-res-split" style="font-weight:700;">Accel Quadratic Error: 882.6 m (t²) | Gyro Cubic Error: 7.7 m (t³)</span>
            <span class="stat-label">Sensor Drift Breakdown (1/2·b_a·t² vs 1/6·b_g·g·t³)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const baEl = document.getElementById('ins-ba'), bgEl = document.getElementById('ins-bg'), tmEl = document.getElementById('ins-time');
  const erResEl = document.getElementById('ins-res-err'), spResEl = document.getElementById('ins-res-split');

  const g = 9.80665;

  function update() {
    const ba_mg = parseFloat(baEl.value), bg_deg_hr = parseFloat(bgEl.value), tMin = parseFloat(tmEl.value);
    if (isNaN(ba_mg) || isNaN(bg_deg_hr) || isNaN(tMin) || ba_mg < 0 || bg_deg_hr < 0 || tMin <= 0) return;

    const tSec = tMin * 60;

    // Accelerometer bias in m / s^2: ba_mg * 1e-3 * g
    const ba_ms2 = ba_mg * 1e-3 * g;
    // Position error from accelerometer bias = 1/2 * ba * t^2
    const err_accel_m = 0.5 * ba_ms2 * Math.pow(tSec, 2);

    // Gyro bias in rad / s: (bg_deg_hr * pi/180) / 3600
    const bg_rad_s = ((bg_deg_hr * Math.PI) / 180) / 3600;
    // Position error from gyro tilt bias coupling with gravity = 1/6 * bg * g * t^3
    const err_gyro_m = (1 / 6) * bg_rad_s * g * Math.pow(tSec, 3);

    const totalErrorM = err_accel_m + err_gyro_m;
    const totalErrorKm = totalErrorM / 1000;

    let errStr = '';
    if (totalErrorM < 1000) errStr = totalErrorM.toFixed(1) + ' m';
    else errStr = totalErrorKm.toFixed(2) + ' km (' + Math.round(totalErrorM).toLocaleString() + ' m)';

    erResEl.textContent = errStr + ' Position Drift';
    spResEl.textContent = 'Accel: ' + (err_accel_m < 1000 ? err_accel_m.toFixed(1) + 'm' : (err_accel_m/1000).toFixed(2) + 'km') + ' (t²) | Gyro: ' + (err_gyro_m < 1000 ? err_gyro_m.toFixed(1) + 'm' : (err_gyro_m/1000).toFixed(2) + 'km') + ' (t³ coupling with 1g gravity)';
  }

  [baEl, bgEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter accelerometer zero-bias error in milli-g ($mg$).',
      'Enter gyroscope bias drift rate in degrees per hour ($^\circ/\text{hr}$).',
      'Enter unassisted dead-reckoning navigation duration (e.g. GPS denial outage) in minutes.',
      'Inspect accumulated positional dead-reckoning drift error in meters and kilometers.'
    ],
    benefitTitle: 'Double Integration Quadratic & Cubic Error Growth',
    benefitContent: 'Inertial navigation calculates position by integrating acceleration twice; uncompensated accelerometer bias errors grow quadratically with time ($x \propto t^2$), while gyro angular drift tilts the gravity vector to cause cubic error growth ($x \propto t^3$).',
    faqs: [{ q: 'Why is Kalman filtering (INS/GNSS coupling) used in aviation?', a: 'Extended Kalman Filters (EKF) fuse high-frequency IMU acceleration data with absolute GPS fixes to continuously estimate and subtract out sensor bias errors.' }]
  },

  // --- Suite ZZZZ: Power Electronics, Switch-Mode Converters & Inverters (826 - 830) ---
  // 21. Buck Converter Inductor & Capacitor Ripple Sizing Calculator
  {
    slug: 'buck-converter-inductor-capacitor-ripple-calculator',
    name: 'Buck Step-Down Converter Inductor & Output Capacitor Sizing Calculator',
    description: 'Calculate switch-mode Buck DC-DC converter duty cycle (D = V_out / V_in), critical filter inductance (L = V_out · (1 - D) / (ΔI_L · f_s)) in μH, and output capacitor ripple voltage.',
    category: 'Science',
    icon: 'text',
    keywords: ['buck converter calculator', 'step down converter inductor capacitor sizing formula', 'buck duty cycle ripple current calculator online', 'dc dc switch mode buck converter design online', 'power electronics buck filter calculator'],
    order: 706,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input Voltage V_in (V), Output V_out (V), Load Current I_out (A) & Switching Freq f_s (kHz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bck-vin">Input V_in (V)</label>
          <input class="tool-textarea" id="bck-vin" type="number" step="any" value="24.0" placeholder="24.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bck-vout">Output V_out (V)</label>
          <input class="tool-textarea" id="bck-vout" type="number" step="any" value="5.0" placeholder="5.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bck-iout">Load I_out (A)</label>
          <input class="tool-textarea" id="bck-iout" type="number" step="any" value="3.0" placeholder="3.0 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bck-fs">Freq f_s (kHz)</label>
          <input class="tool-textarea" id="bck-fs" type="number" step="any" value="200.0" placeholder="200.0 kHz" />
        </div>
      </div>
      <div id="bck-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bck-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L = 21.9 μH (D = 20.8%)</span>
            <span class="stat-label">Recommended Inductance (30% Peak-to-Peak Ripple)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bck-res-c" style="font-weight:700;">Output Capacitor C_out ≥ 11.3 μF (ΔV_out ≤ 50 mV Ripple | I_L,peak = 3.45 A)</span>
            <span class="stat-label">Output Filter Capacitance & Peak Switch Current</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vinEl = document.getElementById('bck-vin'), voutEl = document.getElementById('bck-vout');
  const ioutEl = document.getElementById('bck-iout'), fsEl = document.getElementById('bck-fs');
  const lResEl = document.getElementById('bck-res-l'), cResEl = document.getElementById('bck-res-c');

  function update() {
    const Vin = parseFloat(vinEl.value), Vout = parseFloat(voutEl.value);
    const Iout = parseFloat(ioutEl.value), fsKhz = parseFloat(fsEl.value);

    if (isNaN(Vin) || isNaN(Vout) || isNaN(Iout) || isNaN(fsKhz) || Vin <= Vout || Vout <= 0 || Iout <= 0 || fsKhz <= 0) return;

    const fsHz = fsKhz * 1000;
    // Ideal duty cycle D = Vout / Vin
    const D = Vout / Vin;

    // Standard inductor current ripple ratio r = 30% of Iout
    const deltaIL = 0.30 * Iout;

    // Inductance L = ( Vout * (1 - D) ) / ( deltaIL * fs )  [Henries]
    const L_h = (Vout * (1 - D)) / (deltaIL * fsHz);
    const L_uh = L_h * 1e6;

    // Target output voltage ripple deltaV = 1% of Vout (or 50mV)
    const deltaV = Math.max(0.02, 0.01 * Vout);
    // Output capacitance C = deltaIL / ( 8 * fs * deltaV )  [Farads]
    const C_f = deltaIL / (8 * fsHz * deltaV);
    const C_uf = C_f * 1e6;

    const peakCurrent = Iout + (deltaIL / 2);

    lResEl.textContent = 'L = ' + L_uh.toFixed(1) + ' μH (Duty D = ' + (D * 100).toFixed(1) + '%)';
    cResEl.textContent = 'C_out ≥ ' + C_uf.toFixed(1) + ' μF (ΔV_out ≤ ' + (deltaV*1000).toFixed(0) + ' mV | Peak I_L = ' + peakCurrent.toFixed(2) + ' A, Ripple ΔI_L = ' + deltaIL.toFixed(2) + ' A)';
  }

  [vinEl, voutEl, ioutEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter unregulated DC input supply voltage $V_{\text{in}}$ in Volts.',
      'Enter regulated DC output target voltage $V_{\text{out}}$ in Volts ($V_{\text{out}} < V_{\text{in}}$).',
      'Enter maximum continuous output load current $I_{\text{out}}$ in Amperes.',
      'Enter PWM switching frequency in kHz.',
      'Inspect optimal power inductor inductance L in $\mu\text{H}$, output filter capacitance $C_{\text{out}}$ in $\mu\text{F}$, and peak inductor saturation current.'
    ],
    benefitTitle: 'Continuous Conduction Mode (CCM) Buck Design',
    benefitContent: 'Sizing the inductor for a 30% current ripple ($\Delta I_L = 0.30 I_{\text{out}}$) provides an optimal balance between maintaining Continuous Conduction Mode (CCM) at light loads while minimizing physical inductor magnetic core size and $I^2R$ copper losses.',
    faqs: [{ q: 'Why is Buck converter efficiency typically >90% compared to linear regulators?', a: 'Buck converters toggle power MOSFETs fully ON or OFF with virtually zero voltage drop across the switch, eliminating the massive $(V_{\text{in}} - V_{\text{out}}) \cdot I$ thermal dissipation of linear LDOs.' }]
  },

  // 22. Boost Step-Up Converter Duty Cycle & Inductor Sizing Calculator
  {
    slug: 'boost-converter-duty-cycle-inductor-sizing-calculator',
    name: 'Boost Step-Up DC-DC Converter Duty Cycle & Inductor Sizing Calculator',
    description: 'Calculate switch-mode Boost step-up converter duty cycle (D = 1 - V_in / V_out), minimum boost inductance (L = V_in · D / (ΔI_L · f_s)) in μH, and switch voltage stress.',
    category: 'Science',
    icon: 'text',
    keywords: ['boost converter calculator', 'step up converter inductor sizing formula online', 'boost duty cycle switch mode power supply calculator', 'boost converter output capacitor ripple calculator', 'power electronics boost dc dc online'],
    order: 707,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Input Voltage V_in (V), Output V_out (V), Load Current I_out (A) & Switching Freq f_s (kHz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bst-vin">Input V_in (V)</label>
          <input class="tool-textarea" id="bst-vin" type="number" step="any" value="12.0" placeholder="12.0 V (Battery)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bst-vout">Output V_out (V)</label>
          <input class="tool-textarea" id="bst-vout" type="number" step="any" value="24.0" placeholder="24.0 V (Boosted)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bst-iout">Load I_out (A)</label>
          <input class="tool-textarea" id="bst-iout" type="number" step="any" value="2.0" placeholder="2.0 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bst-fs">Freq f_s (kHz)</label>
          <input class="tool-textarea" id="bst-fs" type="number" step="any" value="150.0" placeholder="150.0 kHz" />
        </div>
      </div>
      <div id="bst-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bst-res-l" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L = 33.3 μH (D = 50.0%)</span>
            <span class="stat-label">Boost Inductor Sizing (30% Input Ripple)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bst-res-sw" style="font-weight:700;">Avg Input Current: 4.00 A | Peak Switch Current: 4.60 A (V_ds Stress: 24.0 V)</span>
            <span class="stat-label">MOSFET Peak Switch Current & Voltage Rating</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vinEl = document.getElementById('bst-vin'), voutEl = document.getElementById('bst-vout');
  const ioutEl = document.getElementById('bst-iout'), fsEl = document.getElementById('bst-fs');
  const lResEl = document.getElementById('bst-res-l'), swResEl = document.getElementById('bst-res-sw');

  function update() {
    const Vin = parseFloat(vinEl.value), Vout = parseFloat(voutEl.value);
    const Iout = parseFloat(ioutEl.value), fsKhz = parseFloat(fsEl.value);

    if (isNaN(Vin) || isNaN(Vout) || isNaN(Iout) || isNaN(fsKhz) || Vout <= Vin || Vin <= 0 || Iout <= 0 || fsKhz <= 0) return;

    const fsHz = fsKhz * 1000;
    // Boost duty cycle D = 1 - (Vin / Vout)
    const D = 1.0 - (Vin / Vout);

    // Average input inductor current I_in = Iout / (1 - D)
    const I_in_avg = Iout / (1 - D);

    // 30% current ripple on input inductor
    const deltaIL = 0.30 * I_in_avg;

    // Inductance L = (Vin * D) / (deltaIL * fsHz)  [Henries]
    const L_h = (Vin * D) / (deltaIL * fsHz);
    const L_uh = L_h * 1e6;

    // Output capacitance for 1% ripple: C = (Iout * D) / (fs * deltaV)
    const deltaV = 0.01 * Vout;
    const C_uf = ((Iout * D) / (fsHz * deltaV)) * 1e6;

    const peakSwitchCurrent = I_in_avg + (deltaIL / 2);

    lResEl.textContent = 'L = ' + L_uh.toFixed(1) + ' μH (Duty D = ' + (D * 100).toFixed(1) + '%)';
    swResEl.textContent = 'Avg Input Current: ' + I_in_avg.toFixed(2) + ' A | Peak Switch I_pk: ' + peakSwitchCurrent.toFixed(2) + ' A (C_out ≥ ' + C_uf.toFixed(1) + ' μF @ ΔV ≤ ' + (deltaV*1000).toFixed(0) + 'mV)';
  }

  [vinEl, voutEl, ioutEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter DC source input supply voltage $V_{\text{in}}$ in Volts.',
      'Enter boosted target DC output voltage $V_{\text{out}}$ in Volts ($V_{\text{out}} > V_{\text{in}}$).',
      'Enter maximum output continuous load current $I_{\text{out}}$ in Amperes.',
      'Enter switching frequency in kHz.',
      'Inspect required boost inductor inductance L in $\mu\text{H}$, average input battery draw current, and MOSFET switch peak current rating.'
    ],
    benefitTitle: 'Energy Storage Inductive Flyback Principle',
    benefitContent: 'When the Boost switch closes, energy stores in the inductor magnetic field ($E = \frac{1}{2} L I^2$); when it opens, inductor collapse voltage sums with the input supply to pump electrons across the diode to the higher output voltage.',
    faqs: [{ q: 'Why is average input current in a boost converter higher than output current?', a: 'By conservation of power ($P_{\text{in}} \approx P_{\text{out}}$), stepping voltage up ($V_{\text{out}} > V_{\text{in}}$) requires drawing proportionately higher input current ($I_{\text{in}} = I_{\text{out}} / (1 - D)$).' }]
  },

  // 23. SPWM Three-Phase Inverter Modulation Index & Output RMS Voltage Calculator
  {
    slug: 'h-bridge-spwm-inverter-modulation-index-thd-calculator',
    name: 'Three-Phase Inverter SPWM Modulation Index & RMS Line Voltage Calculator',
    description: 'Calculate Sinusoidal Pulse Width Modulation (SPWM) amplitude modulation index (m_a = V_control / V_carrier) and AC fundamental RMS line-to-line output voltage (V_LL,1 = (√3 / 2√2) · m_a · V_dc) for variable frequency motor drives.',
    category: 'Science',
    icon: 'text',
    keywords: ['spwm inverter calculator', 'modulation index ma three phase inverter formula', 'inverter line to line rms voltage calculator online', 'vfd motor drive spwm voltage calculator', 'power electronics pwm inverter thd online'],
    order: 708,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'DC Bus Voltage V_dc (V), Control Voltage Amplitude V_control (V) & Carrier Amplitude V_carrier (V)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="inv-vdc">DC Bus V_dc (V)</label>
          <input class="tool-textarea" id="inv-vdc" type="number" step="any" value="560.0" placeholder="560.0 V (400V 3-Phase Rectified)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="inv-vctrl">V_control (V)</label>
          <input class="tool-textarea" id="inv-vctrl" type="number" step="any" value="0.85" placeholder="0.85 V Peak Sine" />
        </div>
        <div class="control-group">
          <label class="control-label" for="inv-vtri">V_carrier (V)</label>
          <input class="tool-textarea" id="inv-vtri" type="number" step="any" value="1.00" placeholder="1.00 V Peak Triangle" />
        </div>
      </div>
      <div id="inv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="inv-res-vrms" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">V_LL = 291.6 V RMS</span>
            <span class="stat-label">Fundamental AC Line-to-Line Output Voltage (V_LL,1)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="inv-res-ma" style="color:var(--green-dark); font-weight:700;">Linear Modulation Regime (m_a = 0.850 ≤ 1.0 | Phase V_LN = 168.4 V RMS)</span>
            <span class="stat-label">Amplitude Modulation Index (m_a = V_control / V_carrier)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vdcEl = document.getElementById('inv-vdc'), vctrlEl = document.getElementById('inv-vctrl'), vtriEl = document.getElementById('inv-vtri');
  const vrmsResEl = document.getElementById('inv-res-vrms'), maResEl = document.getElementById('inv-res-ma');

  function update() {
    const Vdc = parseFloat(vdcEl.value), Vctrl = parseFloat(vctrlEl.value), Vtri = parseFloat(vtriEl.value);
    if (isNaN(Vdc) || isNaN(Vctrl) || isNaN(Vtri) || Vdc <= 0 || Vctrl <= 0 || Vtri <= 0) return;

    // Amplitude modulation index m_a = Vctrl / Vtri
    const m_a = Vctrl / Vtri;

    let V_LL_rms = 0;
    let regimeDesc = '';
    let color = '#22543d';

    if (m_a <= 1.0) {
      // Linear modulation regime: V_LN,1,peak = m_a * Vdc / 2
      // V_LL,1,rms = sqrt(3) / sqrt(2) * (m_a * Vdc / 2) = (sqrt(3) / (2 * sqrt(2))) * m_a * Vdc
      V_LL_rms = (Math.sqrt(3) / (2 * Math.sqrt(2))) * m_a * Vdc;
      regimeDesc = 'LINEAR MODULATION (m_a = ' + m_a.toFixed(3) + ' ≤ 1.0: Pure Sine AC with Low THD)';
      color = '#22543d';
    } else if (m_a <= 3.24) {
      // Overmodulation regime
      const maxLinear = (Math.sqrt(3) / (2 * Math.sqrt(2))) * 1.0 * Vdc;
      const sixStep = (Math.sqrt(6) / Math.PI) * Vdc;
      V_LL_rms = maxLinear + ((sixStep - maxLinear) * ((m_a - 1.0) / 2.24));
      regimeDesc = 'OVERMODULATION (1.0 < m_a < 3.24: Non-linear voltage gain with lower-order harmonics)';
      color = '#d97706';
    } else {
      // Six-step square wave limit: V_LL,rms = sqrt(6)/pi * Vdc = 0.7797 * Vdc
      V_LL_rms = (Math.sqrt(6) / Math.PI) * Vdc;
      regimeDesc = 'SIX-STEP SQUARE WAVE OPERATION (m_a >> 1: Maximum Voltage Utilization 0.78·V_dc)';
      color = '#c53030';
    }

    const V_LN_rms = V_LL_rms / Math.sqrt(3);

    vrmsResEl.textContent = 'V_LL = ' + V_LL_rms.toFixed(1) + ' V RMS (Phase V_LN = ' + V_LN_rms.toFixed(1) + ' V)';
    maResEl.textContent = regimeDesc;
    maResEl.style.color = color;
  }

  [vdcEl, vctrlEl, vtriEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter DC link capacitor bus voltage $V_{\text{dc}}$ in Volts (e.g. 560V from rectified 400V 3-phase mains).',
      'Enter sine reference control wave peak amplitude $V_{\text{control}}$.',
      'Enter triangular carrier wave peak amplitude $V_{\text{carrier}}$.',
      'Inspect fundamental RMS Line-to-Line output AC voltage $V_{LL,1}$ and identify whether inverter operates in Linear, Overmodulation, or Six-Step Square wave mode.'
    ],
    benefitTitle: 'Sinusoidal Pulse Width Modulation (SPWM) Motor Drives',
    benefitContent: 'Comparing a sinusoidal reference wave against a high-frequency triangular carrier generates PWM pulses whose average voltage matches a pure sine wave, driving 3-phase induction and permanent magnet synchronous motors (PMSM) with minimal harmonic torque ripple.',
    faqs: [{ q: 'How does Space Vector PWM (SVPWM) improve on standard SPWM?', a: 'SVPWM injects third harmonic zero-sequence voltages, increasing maximum linear output AC voltage by 15.5% ($\frac{2}{\sqrt{3}} \approx 1.155$) without causing overmodulation distortion.' }]
  },

  // 24. Isolated Flyback Converter Transformer Turns Ratio & Magnetizing Inductance Calculator
  {
    slug: 'flyback-converter-transformer-turns-ratio-calculator',
    name: 'Isolated Flyback Converter Transformer Turns Ratio (N_p / N_s) & Inductance Calculator',
    description: 'Calculate isolated switch-mode Flyback SMPS transformer turns ratio (N_p / N_s = V_in,min · D_max / ((V_out + V_d) · (1 - D_max))) and primary magnetizing inductance L_m in μH.',
    category: 'Science',
    icon: 'text',
    keywords: ['flyback converter calculator', 'flyback transformer turns ratio formula np over ns', 'primary magnetizing inductance flyback calculator online', 'isolated smps flyback power supply design calculator', 'power electronics flyback converter online'],
    order: 709,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Min Input V_in,min (V), Output V_out (V), Output Power P_out (W) & Max Duty D_max (0.45)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fly-vin">Min Input V_in (V)</label>
          <input class="tool-textarea" id="fly-vin" type="number" step="any" value="100.0" placeholder="100.0 V (Universal AC Rectified)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fly-vout">Output V_out (V)</label>
          <input class="tool-textarea" id="fly-vout" type="number" step="any" value="12.0" placeholder="12.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fly-pout">Power P_out (W)</label>
          <input class="tool-textarea" id="fly-pout" type="number" step="any" value="45.0" placeholder="45.0 W (Laptop / Charger)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fly-fs">Freq f_s (kHz)</label>
          <input class="tool-textarea" id="fly-fs" type="number" step="any" value="65.0" placeholder="65.0 kHz" />
        </div>
      </div>
      <div id="fly-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fly-res-npns" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N_p / N_s = 6.44 : 1</span>
            <span class="stat-label">Primary to Secondary Turns Ratio (N_p / N_s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fly-res-lm" style="font-weight:700;">Primary Magnetizing Inductance: L_m = 582 μH (Peak I_p = 1.45 A)</span>
            <span class="stat-label">Coupled Inductor Magnetizing Inductance (L_m)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vinEl = document.getElementById('fly-vin'), voutEl = document.getElementById('fly-vout');
  const poutEl = document.getElementById('fly-pout'), fsEl = document.getElementById('fly-fs');
  const nResEl = document.getElementById('fly-res-npns'), lmResEl = document.getElementById('fly-res-lm');

  const D_max = 0.45; // standard maximum duty cycle limit
  const V_diode = 0.7; // output rectifier forward voltage drop
  const efficiency = 0.85; // SMPS efficiency

  function update() {
    const VinMin = parseFloat(vinEl.value), Vout = parseFloat(voutEl.value);
    const Pout = parseFloat(poutEl.value), fsKhz = parseFloat(fsEl.value);

    if (isNaN(VinMin) || isNaN(Vout) || isNaN(Pout) || isNaN(fsKhz) || VinMin <= 0 || Vout <= 0 || Pout <= 0 || fsKhz <= 0) return;

    const fsHz = fsKhz * 1000;
    const Pin = Pout / efficiency;

    // Flyback turns ratio n = Np / Ns = (VinMin * D_max) / ( (Vout + V_diode) * (1 - D_max) )
    const n_turns = (VinMin * D_max) / ((Vout + V_diode) * (1.0 - D_max));

    // For DCM / boundary conduction mode: L_m = (VinMin * D_max)^2 / (2 * Pin * fsHz)  [Henries]
    const Lm_h = Math.pow(VinMin * D_max, 2) / (2 * Pin * fsHz);
    const Lm_uh = Lm_h * 1e6;

    // Peak primary switch current I_pk = (VinMin * D_max) / (Lm_h * fsHz * ... ) approx = 2*Pin / (VinMin * D_max)
    const I_pk_primary = (2 * Pin) / (VinMin * D_max);

    // Primary reflected voltage V_reflected = (Vout + V_diode) * n_turns
    const V_reflected = (Vout + V_diode) * n_turns;

    nResEl.textContent = 'N_p / N_s = ' + n_turns.toFixed(2) + ' : 1 Turns Ratio';
    lmResEl.textContent = 'L_m = ' + Math.round(Lm_uh).toLocaleString() + ' μH | Peak Switch Current: ' + I_pk_primary.toFixed(2) + ' A (Reflected V_OR = ' + Math.round(V_reflected) + ' V)';
  }

  [vinEl, voutEl, poutEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter minimum rectified AC mains input voltage $V_{\text{in},\min}$ in Volts (e.g. 100V for universal 85–265V AC adapters).',
      'Enter regulated DC secondary output voltage $V_{\text{out}}$ in Volts.',
      'Enter total rated output load power in Watts.',
      'Enter SMPS PWM controller switching frequency in kHz.',
      'Inspect coupled transformer primary-to-secondary turns ratio ($N_p/N_s$), primary magnetizing inductance $L_m$ in $\mu\text{H}$, and peak primary switch current.'
    ],
    benefitTitle: 'Galvanic Isolation with Coupled Energy Storage',
    benefitContent: 'Unlike standard power transformers that transfer energy instantaneously, Flyback transformers are coupled gapped inductors that store energy in the core during the primary ON-time and release it to the secondary isolated load during the OFF-time.',
    faqs: [{ q: 'Why is maximum duty cycle typically capped at D_max = 0.45 in flybacks?', a: 'Capping duty cycle below 50% allows the transformer core sufficient demagnetization reset time during the OFF interval to prevent magnetic saturation staircase runaway.' }]
  },

  // 25. Power MOSFET & IGBT Conduction & Switching Loss Calculator
  {
    slug: 'mosfet-igbt-switching-loss-conduction-calculator',
    name: 'Power MOSFET & IGBT Conduction, Switching & Gate Loss (P_total) Calculator',
    description: 'Calculate power semiconductor thermal dissipation (P_total = P_conduction + P_switching + P_gate) where P_cond = I_rms² · R_ds(on) and P_sw = 1/2 · V_ds · I_d · (t_rise + t_fall) · f_s.',
    category: 'Science',
    icon: 'text',
    keywords: ['mosfet switching loss calculator', 'igbt conduction switching thermal dissipation formula online', 'power semiconductor heatsink power loss calculator', 'rds on conduction loss mosfet calculator online', 'gate drive power switching loss online'],
    order: 710,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'RMS Current I_rms (A), R_ds(on) (mΩ), Blocking Voltage V_ds (V), Rise/Fall Times (ns) & Freq f_s (kHz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pwr-irms">Current I_rms (A)</label>
          <input class="tool-textarea" id="pwr-irms" type="number" step="any" value="15.0" placeholder="15.0 A RMS" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pwr-rds">R_ds(on) (mΩ)</label>
          <input class="tool-textarea" id="pwr-rds" type="number" step="any" value="25.0" placeholder="25.0 mΩ (Hot)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pwr-vds">Voltage V_ds (V)</label>
          <input class="tool-textarea" id="pwr-vds" type="number" step="any" value="100.0" placeholder="100.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pwr-trtf">t_r + t_f (ns)</label>
          <input class="tool-textarea" id="pwr-trtf" type="number" step="any" value="40.0" placeholder="40.0 ns (20ns + 20ns)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pwr-fs">Freq f_s (kHz)</label>
          <input class="tool-textarea" id="pwr-fs" type="number" step="any" value="100.0" placeholder="100.0 kHz" />
        </div>
      </div>
      <div id="pwr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pwr-res-ptot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_total = 8.63 Watts</span>
            <span class="stat-label">Total MOSFET Power Dissipation Heat Loss</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pwr-res-split" style="font-weight:700;">Conduction: 5.63 W (65.2%) | Switching: 3.00 W (34.8%)</span>
            <span class="stat-label">Loss Breakdown (P_cond vs P_sw Heat Generation)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('pwr-irms'), rEl = document.getElementById('pwr-rds');
  const vEl = document.getElementById('pwr-vds'), trEl = document.getElementById('pwr-trtf'), fsEl = document.getElementById('pwr-fs');
  const pTotResEl = document.getElementById('pwr-res-ptot'), spResEl = document.getElementById('pwr-res-split');

  function update() {
    const Irms = parseFloat(iEl.value), RdsM = parseFloat(rEl.value);
    const Vds = parseFloat(vEl.value), trtfNs = parseFloat(trEl.value), fsKhz = parseFloat(fsEl.value);

    if (isNaN(Irms) || isNaN(RdsM) || isNaN(Vds) || isNaN(trtfNs) || isNaN(fsKhz) || Irms <= 0 || RdsM <= 0 || Vds <= 0 || trtfNs <= 0 || fsKhz <= 0) return;

    const RdsOhms = RdsM * 1e-3;
    const trtfSec = trtfNs * 1e-9;
    const fsHz = fsKhz * 1000;

    // Conduction loss P_cond = Irms^2 * Rds(on)  [Watts]
    const P_cond = Math.pow(Irms, 2) * RdsOhms;

    // Switching loss P_sw = 0.5 * Vds * I_peak * (t_rise + t_fall) * fs  [Watts]
    const P_sw = 0.5 * Vds * Irms * trtfSec * fsHz;

    // Total power loss P_total = P_cond + P_sw
    const P_total = P_cond + P_sw;

    const condPct = (P_cond / P_total) * 100;
    const swPct = (P_sw / P_total) * 100;

    pTotResEl.textContent = 'P_total = ' + P_total.toFixed(2) + ' Watts Heat Dissipation';
    spResEl.textContent = 'Conduction Loss: ' + P_cond.toFixed(2) + ' W (' + condPct.toFixed(1) + '%) | Switching Loss: ' + P_sw.toFixed(2) + ' W (' + swPct.toFixed(1) + '% @ ' + fsKhz + ' kHz)';
  }

  [iEl, rEl, vEl, trEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter continuous drain RMS current in Amperes.',
      'Enter MOSFET on-state resistance $R_{\text{ds(on)}}$ at junction operating temperature in milliohms ($m\Omega$).',
      'Enter DC link blocking voltage $V_{\text{ds}}$ in Volts.',
      'Enter total switching transition duration ($t_{\text{rise}} + t_{\text{fall}}$) in nanoseconds.',
      'Enter PWM switching frequency in kHz.',
      'Inspect total thermal power dissipation in Watts, conduction vs switching loss percentage, and size required heatsink thermal resistance ($R_{\theta\text{JA}}$).'
    ],
    benefitTitle: 'Thermal Management & Wide-Bandgap GaN / SiC Advantages',
    benefitContent: 'While conduction losses depend purely on load current ($I^2 R$), switching losses scale linearly with frequency ($P_{\text{sw}} \propto f_s$); transitioning to Gallium Nitride (GaN) and Silicon Carbide (SiC) slashes switching transition times from 40 ns to <5 ns, enabling megahertz switching with minimal heat dissipation.',
    faqs: [{ q: 'Why does R_ds(on) increase at higher operating temperatures?', a: 'Silicon lattice phonon scattering increases with temperature, causing hot MOSFET $R_{\text{ds(on)}}$ at 125°C to be approximately 1.5× to 1.8× higher than its 25°C room-temperature datasheet rating.' }]
  }
];

pack22Tools.forEach(createTool);
console.log('Pack 22 complete: 25 tools created.');
