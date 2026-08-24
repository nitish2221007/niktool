const { createTool } = require('./generate-curated-tools.cjs');

// Pack 45: 25 Materials Science, Solid Mechanics, Metallurgy & Crystallography Calculators (Tools 1376 to 1400)
const pack45Tools = [
  // 1. Bragg's Law XRD Interplanar Spacing Calculator
  {
    slug: 'bragg-law-xray-diffraction-xrd-interplanar-spacing-calculator',
    name: 'Bragg\'s Law X-Ray Diffraction (nλ = 2d·sin θ) & Interplanar Spacing Calculator',
    description: 'Calculate crystal lattice interplanar spacing d (d = n·λ / (2·sin θ) in Ångströms and nm), diffraction Bragg angle θ, and lattice parameter a from X-ray diffraction (XRD) peak 2θ positions.',
    category: 'Science',
    icon: 'text',
    keywords: ['bragg law calculator', 'xray diffraction interplanar spacing formula n lambda equals 2d sin theta online', 'xrd 2theta peak to d spacing calculator angstroms', 'crystallography lattice spacing bragg diffraction calculator', 'materials science crystallography solid state physics online'],
    order: 1260,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Diffractometer 2θ Angle (°), X-Ray Wavelength λ (Å, e.g. 1.5406 Å for Cu Kα) & Order n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bg-two-theta">Diffraction 2θ (°)</label>
          <input class="tool-textarea" id="bg-two-theta" type="number" step="0.5" value="44.50" placeholder="44.50° (2-Theta)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-lambda">Wavelength λ (Å)</label>
          <input class="tool-textarea" id="bg-lambda" type="number" step="0.0001" value="1.5406" placeholder="1.5406 Å (Cu Kα)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bg-n">Order n</label>
          <input class="tool-textarea" id="bg-n" type="number" step="1" value="1" placeholder="1" />
        </div>
      </div>
      <div id="bg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bg-res-d" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Interplanar d = 2.034 Å (0.2034 nm)</span>
            <span class="stat-label">Crystal Plane d-Spacing (d = n·λ / 2·sin θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bg-res-fcc" style="color:var(--green-dark); font-weight:700;">Bragg Angle θ = 22.25° | Austenite FCC (111) Lattice a = 3.523 Å (0.352 nm)</span>
            <span class="stat-label">Bragg Angle & Cubic Lattice Parameter Estimation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ttEl = document.getElementById('bg-two-theta'), lmEl = document.getElementById('bg-lambda'), nEl = document.getElementById('bg-n');
  const dResEl = document.getElementById('bg-res-d'), fcResEl = document.getElementById('bg-res-fcc');

  function update() {
    const two_theta = parseFloat(ttEl.value), lambda_A = parseFloat(lmEl.value), n = parseFloat(nEl.value);
    if (isNaN(two_theta) || isNaN(lambda_A) || isNaN(n) || two_theta <= 0 || two_theta >= 180 || lambda_A <= 0 || n <= 0) return;

    // Bragg angle theta in degrees and radians:
    const theta_deg = two_theta / 2.0;
    const theta_rad = (theta_deg * Math.PI) / 180.0;

    // Bragg's Law: d = n * lambda / (2 * sin(theta))  [Angstroms]
    const d_spacing_A = (n * lambda_A) / (2.0 * Math.sin(theta_rad));
    const d_spacing_nm = d_spacing_A / 10.0;

    // Assuming (111) reflection in FCC: a = d * sqrt(h^2 + k^2 + l^2) = d * sqrt(3)
    const a_lattice_A = d_spacing_A * Math.sqrt(3.0);

    dResEl.textContent = 'Interplanar d = ' + d_spacing_A.toFixed(3) + ' Å (' + d_spacing_nm.toFixed(4) + ' nm)';
    fcResEl.textContent = 'Bragg θ = ' + theta_deg.toFixed(2) + '° | FCC (111) Lattice a = ' + a_lattice_A.toFixed(3) + ' Å (Cu Kα λ=' + lambda_A + ' Å @ 2θ=' + two_theta + '°)';
  }

  [ttEl, lmEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter experimental X-ray diffractometer peak position $2\theta$ in degrees.',
      'Enter X-ray source radiation wavelength $\lambda$ in Ångströms (typically 1.5406 Å for Copper $K\alpha$).',
      'Enter reflection integer diffraction order n (standard $n = 1$).',
      'Inspect interplanar atomic spacing d in Å and nm.'
    ],
    benefitTitle: 'William Lawrence Bragg 1913 Nobel Prize Equation',
    benefitContent: 'Constructive wave interference occurs when path differences between parallel atomic crystal planes equal integer multiples of wavelength ($n\lambda = 2d\sin\theta$), enabling atomic structure determination of crystalline materials.',
    faqs: [{ q: 'Why is XRD reported in 2-theta instead of theta?', a: 'Diffractometer detectors rotate by an angle of $2\theta$ relative to the incoming incident beam while the sample rotates by $\theta$.' }]
  },

  // 2. Hall-Petch Grain Boundary Strengthening Calculator
  {
    slug: 'hall-petch-grain-boundary-strengthening-yield-strength-calculator',
    name: 'Hall-Petch Grain Boundary Strengthening (σ_y = σ₀ + k_y·d^(-½)) Calculator',
    description: 'Calculate polycrystalline metal yield strength σ_y in MPa (σ_y = σ₀ + k_y · d^(-½)), friction stress σ₀, and Hall-Petch grain refinement strengthening coefficient k_y.',
    category: 'Science',
    icon: 'text',
    keywords: ['hall petch calculator', 'grain boundary strengthening formula yield strength online', 'hall petch relation grain size d minus half calculator', 'grain refinement microalloyed steel yield strength calculator', 'metallurgy materials science mechanical properties online'],
    order: 1261,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Average Grain Diameter d (μm), Friction Stress σ₀ (MPa) & Hall-Petch Slope k_y (MPa·μm^½)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hp-d">Grain Size d (μm)</label>
          <input class="tool-textarea" id="hp-d" type="number" step="5" value="16.0" placeholder="16.0 μm (Fine Grain Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-s0">Friction σ₀ (MPa)</label>
          <input class="tool-textarea" id="hp-s0" type="number" step="10" value="70.0" placeholder="70.0 MPa (Pure Ferrite)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-ky">Slope k_y (MPa·μm^½)</label>
          <input class="tool-textarea" id="hp-ky" type="number" step="10" value="600.0" placeholder="600.0 (Low-Carbon Steel)" />
        </div>
      </div>
      <div id="hp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hp-res-sy" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Yield Strength σ_y = 220.0 MPa</span>
            <span class="stat-label">Polycrystalline Yield Strength (σ_y = σ₀ + k_y · d^(-½))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-inc" style="color:var(--green-dark); font-weight:700;">Grain Boundary Strengthening Δσ = +150.0 MPa (+214.3% Strength Increase over single crystal)</span>
            <span class="stat-label">Dislocation Pile-Up Strengthening Contribution</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('hp-d'), s0El = document.getElementById('hp-s0'), kyEl = document.getElementById('hp-ky');
  const syResEl = document.getElementById('hp-res-sy'), inResEl = document.getElementById('hp-res-inc');

  function update() {
    const d_um = parseFloat(dEl.value), sigma_0 = parseFloat(s0El.value), k_y = parseFloat(kyEl.value);
    if (isNaN(d_um) || isNaN(sigma_0) || isNaN(k_y) || d_um <= 0 || sigma_0 < 0 || k_y <= 0) return;

    // Hall-Petch equation: sigma_y = sigma_0 + k_y / sqrt(d_um)  [MPa]
    const delta_sigma = k_y / Math.sqrt(d_um);
    const sigma_y = sigma_0 + delta_sigma;
    const pct_inc = (delta_sigma / sigma_0) * 100.0;

    syResEl.textContent = 'Yield Strength σ_y = ' + sigma_y.toFixed(1) + ' MPa';
    inResEl.textContent = 'Refinement Δσ = +' + delta_sigma.toFixed(1) + ' MPa (' + pct_inc.toFixed(1) + '% boost | d=' + d_um + ' μm, k_y=' + k_y + ')';
  }

  [dEl, s0El, kyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter average crystalline grain diameter d in micrometers ($\mu\text{m}$).',
      'Enter single-crystal lattice friction stress $\sigma_0$ in MPa.',
      'Enter Hall-Petch strengthening coefficient $k_y$ in $\text{MPa}\cdot\mu\text{m}^{1/2}$.',
      'Inspect polycrystalline yield strength $\sigma_y$ and grain boundary strengthening increase.'
    ],
    benefitTitle: 'E. O. Hall & N. J. Petch 1951 Grain Refinement Law',
    benefitContent: 'Grain boundaries act as physical pin barriers halting dislocation glide; refining grain size is the only metallurgical strengthening mechanism that simultaneously improves yield strength AND fracture toughness.',
    faqs: [{ q: 'What is the inverse Hall-Petch effect at nanocrystalline grain sizes (< 10 nm)?', a: 'Below $\sim 10\text{ nm}$, grain boundary sliding replaces dislocation pile-ups, causing metals to soften as grain size decreases.' }]
  },

  // 3. Schmid's Law Critical Resolved Shear Stress (CRSS) Calculator
  {
    slug: 'schmid-law-resolved-shear-stress-slip-system-calculator',
    name: 'Schmid\'s Law Critical Resolved Shear Stress (CRSS τ = σ·cos φ·cos λ) Calculator',
    description: 'Calculate single-crystal dislocation slip resolved shear stress τ (tau = σ · cos φ · cos λ), Schmid Factor m (m = cos φ · cos λ), and required tensile yield stress σ for crystallographic plastic deformation.',
    category: 'Science',
    icon: 'text',
    keywords: ['schmid law calculator', 'critical resolved shear stress crss formula online', 'schmid factor cos phi cos lambda calculator', 'single crystal dislocation slip system calculator', 'materials science crystallography plastic deformation online'],
    order: 1262,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Tensile Stress σ (MPa), Normal Angle φ (°) & Slip Direction Angle λ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sm-s">Applied Stress σ (MPa)</label>
          <input class="tool-textarea" id="sm-s" type="number" step="10" value="100.0" placeholder="100.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-phi">Normal Angle φ (°)</label>
          <input class="tool-textarea" id="sm-phi" type="number" step="5" value="45.0" placeholder="45.0° (Slip Plane Normal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-lambda">Slip Angle λ (°)</label>
          <input class="tool-textarea" id="sm-lambda" type="number" step="5" value="45.0" placeholder="45.0° (Slip Direction)" />
        </div>
      </div>
      <div id="sm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sm-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Resolved Shear τ = 50.0 MPa</span>
            <span class="stat-label">Resolved Shear Stress along Slip Direction (τ = σ · m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sm-res-m" style="color:var(--green-dark); font-weight:700;">Schmid Factor m = 0.500 (MAXIMUM THEORETICAL VALUE: Easiest slip orientation)</span>
            <span class="stat-label">Schmid Orientation Factor (m = cos φ · cos λ ≤ 0.50)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('sm-s'), phiEl = document.getElementById('sm-phi'), lmEl = document.getElementById('sm-lambda');
  const tuResEl = document.getElementById('sm-res-tau'), mResEl = document.getElementById('sm-res-m');

  function update() {
    const sigma = parseFloat(sEl.value), phi_deg = parseFloat(phiEl.value), lambda_deg = parseFloat(lmEl.value);
    if (isNaN(sigma) || isNaN(phi_deg) || isNaN(lambda_deg) || sigma < 0 || phi_deg < 0 || phi_deg > 90 || lambda_deg < 0 || lambda_deg > 90) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;
    const lambda_rad = (lambda_deg * Math.PI) / 180.0;

    // Schmid Factor m = cos(phi) * cos(lambda)
    const m = Math.cos(phi_rad) * Math.cos(lambda_rad);

    // Resolved shear stress: tau = sigma * m
    const tau = sigma * m;

    let orient = '';
    if (m >= 0.48) orient = 'MAXIMUM SLIP (m ≈ 0.50: Easiest dislocation glide)';
    else if (m >= 0.30) orient = 'MODERATE SLIP ORIENTATION';
    else if (m > 0.05) orient = 'HARD ORIENTATION (Requires high tensile stress to yield)';
    else orient = 'ZERO RESOLVED SHEAR (m ≈ 0: No dislocation slip occurs)';

    tuResEl.textContent = 'Resolved Shear τ = ' + tau.toFixed(1) + ' MPa';
    mResEl.textContent = 'Schmid Factor m = ' + m.toFixed(3) + ' (' + orient + ' @ φ=' + phi_deg + '°, λ=' + lambda_deg + '°)';
  }

  [sEl, phiEl, lmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied uniaxial tensile stress $\sigma$ in MPa.',
      'Enter angle $\phi$ between tensile load axis and slip plane normal vector in degrees.',
      'Enter angle $\lambda$ between tensile axis and slip direction in degrees.',
      'Inspect resolved shear stress $\tau$ and Schmid Factor ($m \le 0.50$).'
    ],
    benefitTitle: 'Erich Schmid 1924 Dislocation Glide Criterion',
    benefitContent: 'Plastic deformation in single crystals initiates only when resolved shear stress on the primary slip system reaches the Critical Resolved Shear Stress ($\tau \ge \tau_{\text{CRSS}}$).',
    faqs: [{ q: 'What is the maximum possible Schmid factor?', a: 'The theoretical maximum Schmid factor is exactly $0.50$, occurring when $\phi = \lambda = 45^\circ$.' }]
  },

  // 4. Lever Rule Binary Phase Diagram Phase Fraction Calculator
  {
    slug: 'lever-rule-binary-phase-diagram-mass-fraction-calculator',
    name: 'Lever Rule Binary Phase Diagram Phase Fraction (w_L & w_α) Calculator',
    description: 'Calculate solid/liquid equilibrium phase mass fractions (w_L = (C_α - C₀)/(C_α - C_L) and w_α = (C₀ - C_L)/(C_α - C_L)) across tie-lines in binary alloy phase diagrams (Cu-Ni, Fe-C, Pb-Sn).',
    category: 'Science',
    icon: 'text',
    keywords: ['lever rule calculator', 'binary phase diagram mass fraction formula online', 'liquid solid phase fraction tie line calculator', 'metallurgy phase diagram lever rule calculator wt percent', 'metallurgy materials science phase transformations online'],
    order: 1263,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Overall Alloy Composition C₀ (wt% B), Liquidus Boundary C_L & Solidus Boundary C_α',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lr-c0">Alloy C₀ (wt%)</label>
          <input class="tool-textarea" id="lr-c0" type="number" step="5" value="35.0" placeholder="35.0 wt% Ni" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lr-cl">Liquidus C_L (wt%)</label>
          <input class="tool-textarea" id="lr-cl" type="number" step="5" value="31.5" placeholder="31.5 wt% Ni (Liquid)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lr-ca">Solidus C_α (wt%)</label>
          <input class="tool-textarea" id="lr-ca" type="number" step="5" value="42.5" placeholder="42.5 wt% Ni (Solid α)" />
        </div>
      </div>
      <div id="lr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lr-res-fracs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Solid α = 31.8% | Liquid L = 68.2%</span>
            <span class="stat-label">Equilibrium Phase Mass Fractions (w_α + w_L = 100%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lr-res-mass" style="color:var(--green-dark); font-weight:700;">Tie-Line Length = 11.0 wt% | Opposite Lever Arm Ratio (3.5 / 11.0)</span>
            <span class="stat-label">Opposite Arm Lever Ratio Calculation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const c0El = document.getElementById('lr-c0'), clEl = document.getElementById('lr-cl'), caEl = document.getElementById('lr-ca');
  const frResEl = document.getElementById('lr-res-fracs'), msResEl = document.getElementById('lr-res-mass');

  function update() {
    const C0 = parseFloat(c0El.value), CL = parseFloat(clEl.value), C_alpha = parseFloat(caEl.value);
    if (isNaN(C0) || isNaN(CL) || isNaN(C_alpha) || CL >= C_alpha || C0 < CL || C0 > C_alpha) return;

    const tie_length = C_alpha - CL;

    // Lever Rule:
    // Fraction of liquid w_L = ( C_alpha - C0 ) / tie_length
    const w_L = (C_alpha - C0) / tie_length;
    // Fraction of solid w_alpha = ( C0 - CL ) / tie_length
    const w_alpha = (C0 - CL) / tie_length;

    const w_L_pct = w_L * 100.0;
    const w_alpha_pct = w_alpha * 100.0;

    frResEl.textContent = 'Solid α = ' + w_alpha_pct.toFixed(1) + '% | Liquid L = ' + w_L_pct.toFixed(1) + '%';
    msResEl.textContent = 'Tie-Line = ' + tie_length.toFixed(1) + ' wt% | Solid arm = ' + (C0 - CL).toFixed(1) + ' / ' + tie_length.toFixed(1) + ' (' + w_alpha_pct.toFixed(1) + '%)';
  }

  [c0El, clEl, caEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter overall alloy composition $C_0$ in weight percent.',
      'Enter liquidus phase boundary composition $C_L$ on the horizontal tie-line.',
      'Enter solidus phase boundary composition $C_\alpha$.',
      'Inspect solid and liquid equilibrium mass fractions ($w_\alpha$ and $w_L$).'
    ],
    benefitTitle: 'Conservation of Mass Tie-Line Lever Principle',
    benefitContent: 'Uses inverse lever arm proportions to determine the exact relative quantities of coexisting phases in two-phase regions of binary alloy phase diagrams.',
    faqs: [{ q: 'Why is the solid fraction calculated using the liquidus arm length?', a: 'Mass balance dictates that the phase fraction is proportional to the OPPOSITE lever arm distance.' }]
  },

  // 5. JMAK Phase Transformation Kinetics Calculator
  {
    slug: 'johnson-mehl-avrami-kolmogorov-jmak-phase-transformation-calculator',
    name: 'JMAK Phase Transformation Kinetics (X(t) = 1 - e^(-k·tⁿ)) Calculator',
    description: 'Calculate isothermal phase transformation volume fraction X(t) in metallurgy and polymer crystallization using the Johnson-Mehl-Avrami-Kolmogorov (JMAK) sigmoidal kinetic equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['jmak calculator', 'johnson mehl avrami kolmogorov formula online', 'isothermal phase transformation kinetics calculator', 'avrami exponent n crystallization calculator', 'metallurgy phase transitions materials science online'],
    order: 1264,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Transformation Rate k (s⁻ⁿ), Avrami Exponent n (1 to 4) & Time t (Seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="jm-k">Rate k (s⁻ⁿ)</label>
          <input class="tool-textarea" id="jm-k" type="number" step="1e-5" value="1.0e-4" placeholder="1.0 × 10⁻⁴" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jm-n">Avrami Exponent n</label>
          <input class="tool-textarea" id="jm-n" type="number" step="0.5" value="3.0" placeholder="3.0 (3D Nucleation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jm-time">Time t (s)</label>
          <input class="tool-textarea" id="jm-time" type="number" step="5" value="20.0" placeholder="20.0 Seconds" />
        </div>
      </div>
      <div id="jm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="jm-res-x" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Transformed X(t) = 55.1%</span>
            <span class="stat-label">Transformed Phase Fraction (X(t) = 1 - e^(-k·tⁿ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="jm-res-half" style="color:var(--green-dark); font-weight:700;">Half-Time t_0.5 = 19.07 s (Time for 50% Transformation) | Extended Vol = 0.800</span>
            <span class="stat-label">50% Half-Transformation Time (t_0.5 = (ln 2 / k)^(1/n))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('jm-k'), nEl = document.getElementById('jm-n'), tEl = document.getElementById('jm-time');
  const xResEl = document.getElementById('jm-res-x'), hfResEl = document.getElementById('jm-res-half');

  function update() {
    const k = parseFloat(kEl.value), n = parseFloat(nEl.value), t = parseFloat(tEl.value);
    if (isNaN(k) || isNaN(n) || isNaN(t) || k <= 0 || n <= 0 || t < 0) return;

    // Extended volume: V_ext = k * t^n
    const V_ext = k * Math.pow(t, n);

    // JMAK transformed fraction: X = 1 - exp(-V_ext)
    const X = 1.0 - Math.exp(-V_ext);
    const X_pct = X * 100.0;

    // Half-transformation time (X = 0.5): t_0.5 = ( ln(2) / k )^(1/n)
    const t_half = Math.pow(Math.log(2.0) / k, 1.0 / n);

    let mode = '';
    if (n >= 3.5) mode = '3D Growth with Constant Nucleation Rate';
    else if (n >= 2.5) mode = '3D Growth with Site Saturation (Pre-existing nuclei)';
    else if (n >= 1.5) mode = '2D Plate/Disc Growth';
    else mode = '1D Needle/Rod Growth';

    xResEl.textContent = 'Transformed X(t) = ' + X_pct.toFixed(1) + '%';
    hfResEl.textContent = 'Half-Time t₀.₅ = ' + t_half.toFixed(2) + ' s (' + mode + ' @ n=' + n + ')';
  }

  [kEl, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter kinetic rate constant k.',
      'Enter Avrami exponent n (1 for 1D needles, 2 for 2D discs, 3 for 3D spheres with site saturation, 4 for continuous 3D nucleation).',
      'Enter elapsed isothermal annealing time t in seconds.',
      'Inspect transformed volume fraction $X(t)$ and $50\%$ half-transformation time.'
    ],
    benefitTitle: 'Johnson-Mehl-Avrami-Kolmogorov Crystallization Standard',
    benefitContent: 'Accounts for phantom impingement and overlapping grain growth volumes ($X = 1 - e^{-V_{\text{ext}}}$), generating classic TTT (Time-Temperature-Transformation) diagrams in heat treatment metallurgy.',
    faqs: [{ q: 'Why is the JMAK curve sigmoidal (S-shaped)?', a: 'Transformation starts slow during nucleation incubation, accelerates as nuclei grow, and slows down near completion due to grain boundary impingement.' }]
  },

  // 6. Griffith Fracture Mechanics Critical Crack Stress Calculator
  {
    slug: 'griffith-fracture-mechanics-critical-crack-stress-calculator',
    name: 'Griffith Fracture Mechanics Critical Stress (σ_c = √(2·E·γ_s / π·a)) & K_IC Calculator',
    description: 'Calculate brittle material fracture stress σ_c in MPa (σ_c = √(2·E·γ_s / (π·a))), Mode I Stress Intensity Factor K_I (K_I = Y·σ·√(π·a)), and critical flaw crack size a_c for linear elastic fracture mechanics (LEFM).',
    category: 'Science',
    icon: 'text',
    keywords: ['griffith fracture mechanics calculator', 'critical fracture stress formula sigma c equals sqrt 2 e gamma online', 'stress intensity factor k1c fracture toughness calculator', 'critical crack length brittle fracture calculator', 'materials science solid mechanics fracture mechanics online'],
    order: 1265,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Young\'s Modulus E (GPa), Surface Energy γ_s (J/m²), Crack Half-Length a (mm) & Geometry Factor Y',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gf-e">Modulus E (GPa)</label>
          <input class="tool-textarea" id="gf-e" type="number" step="10" value="70.0" placeholder="70.0 GPa (Soda-Lime Glass)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gf-gamma">Surface Energy γ (J/m²)</label>
          <input class="tool-textarea" id="gf-gamma" type="number" step="0.2" value="1.0" placeholder="1.0 J/m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gf-a">Crack Length a (mm)</label>
          <input class="tool-textarea" id="gf-a" type="number" step="0.05" value="0.20" placeholder="0.20 mm Flaw" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gf-y">Geometry Y</label>
          <input class="tool-textarea" id="gf-y" type="number" step="0.05" value="1.12" placeholder="1.12 (Edge Crack)" />
        </div>
      </div>
      <div id="gf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gf-res-sc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Critical Stress σ_c = 47.2 MPa</span>
            <span class="stat-label">Griffith Critical Brittle Fracture Stress</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gf-res-kic" style="color:var(--green-dark); font-weight:700;">Plane Strain Toughness K_IC = 1.33 MPa·m^½ (Brittle Ceramic Catastrophic Cleavage)</span>
            <span class="stat-label">Critical Stress Intensity Factor (K_IC = Y·σ_c·√(π·a))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('gf-e'), gmEl = document.getElementById('gf-gamma');
  const aEl = document.getElementById('gf-a'), yEl = document.getElementById('gf-y');
  const scResEl = document.getElementById('gf-res-sc'), kicResEl = document.getElementById('gf-res-kic');

  function update() {
    const E_GPa = parseFloat(eEl.value), gamma_s = parseFloat(gmEl.value);
    const a_mm = parseFloat(aEl.value), Y = parseFloat(yEl.value);

    if (isNaN(E_GPa) || isNaN(gamma_s) || isNaN(a_mm) || isNaN(Y) || E_GPa <= 0 || gamma_s <= 0 || a_mm <= 0 || Y <= 0) return;

    const E_Pa = E_GPa * 1e9;
    const a_m = a_mm * 1e-3;

    // Griffith equation: sigma_c = sqrt( (2 * E * gamma_s) / (pi * a) )  [Pa -> MPa]
    const sigma_c_Pa = Math.sqrt((2.0 * E_Pa * gamma_s) / (Math.PI * a_m)) / Y;
    const sigma_c_MPa = sigma_c_Pa / 1e6;

    // Stress Intensity Factor K_IC = Y * sigma_c * sqrt(pi * a)  [MPa * m^0.5]
    const K_IC = Y * sigma_c_MPa * Math.sqrt(Math.PI * a_m);

    scResEl.textContent = 'Critical Stress σ_c = ' + sigma_c_MPa.toFixed(1) + ' MPa';
    kicResEl.textContent = 'Fracture Toughness K_IC = ' + K_IC.toFixed(2) + ' MPa·m^½ (Crack a=' + a_mm + ' mm, Y=' + Y + ')';
  }

  [eEl, gmEl, aEl, yEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter material Young\'s Elastic Modulus E in GPa.',
      'Enter specific fracture surface energy $\gamma_s$ in $\text{J/m}^2$.',
      'Enter surface/internal flaw crack length a in mm.',
      'Enter dimensionless crack geometry correction factor Y (1.0 for center crack, 1.12 for edge crack).',
      'Inspect critical brittle fracture stress $\sigma_c$ and fracture toughness $K_{IC}$.'
    ],
    benefitTitle: 'Alan Arnold Griffith 1921 Energy Release Rate Theorem',
    benefitContent: 'Demonstrates that a crack propagates unstably when elastic strain energy released by crack growth exceeds the surface energy needed to create new crack faces ($G \ge 2\gamma_s$).',
    faqs: [{ q: 'Why do metals have much higher fracture toughness than ceramics?', a: 'In ductile metals, significant plastic dissipation energy ($\gamma_p \gg \gamma_s$) absorbs energy at the crack tip, increasing critical stress.' }]
  },

  // 7. Paris' Law Fatigue Crack Growth Rate Calculator
  {
    slug: 'paris-law-fatigue-crack-growth-rate-calculator',
    name: 'Paris\' Law Fatigue Crack Propagation (da/dN = C·(ΔK)ᵐ) Calculator',
    description: 'Calculate subcritical cyclical fatigue crack growth rate da/dN (in mm/cycle and m/cycle) from cyclic stress intensity range ΔK = Y·Δσ·√(π·a) using the Paris-Erdogan empirical power law.',
    category: 'Science',
    icon: 'text',
    keywords: ['paris law calculator', 'fatigue crack growth rate formula da over dn online', 'cyclic stress intensity delta k paris law calculator', 'fatigue lifetime cycles to failure calculator', 'mechanical engineering aerospace fatigue fracture online'],
    order: 1266,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cyclic Stress Range Δσ (MPa), Crack Size a (mm), Paris Constant C & Exponent m (2.5 to 4.0)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pl-ds">Cyclic Δσ (MPa)</label>
          <input class="tool-textarea" id="pl-ds" type="number" step="25" value="150.0" placeholder="150.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-a">Crack Length a (mm)</label>
          <input class="tool-textarea" id="pl-a" type="number" step="1" value="5.0" placeholder="5.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-c">Paris Constant C</label>
          <input class="tool-textarea" id="pl-c" type="number" step="1e-12" value="3.0e-11" placeholder="3.0 × 10⁻¹¹ (Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-m">Paris Exponent m</label>
          <input class="tool-textarea" id="pl-m" type="number" step="0.1" value="3.0" placeholder="3.0 (Steel)" />
        </div>
      </div>
      <div id="pl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pl-res-dadn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">da/dN = 1.94 × 10⁻⁴ mm / cycle</span>
            <span class="stat-label">Cyclic Fatigue Crack Growth Rate (da/dN = C·(ΔK)ᵐ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pl-res-dk" style="color:var(--green-dark); font-weight:700;">Stress Intensity ΔK = 21.0 MPa·m^½ | 1.0 mm crack extension requires ~5,150 cycles</span>
            <span class="stat-label">Cyclic Stress Intensity Factor Range (ΔK) & Cycles to Extend</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dsEl = document.getElementById('pl-ds'), aEl = document.getElementById('pl-a');
  const cEl = document.getElementById('pl-c'), mEl = document.getElementById('pl-m');
  const daResEl = document.getElementById('pl-res-dadn'), dkResEl = document.getElementById('pl-res-dk');

  function update() {
    const delta_sigma = parseFloat(dsEl.value), a_mm = parseFloat(aEl.value);
    const C = parseFloat(cEl.value), m = parseFloat(mEl.value);

    if (isNaN(delta_sigma) || isNaN(a_mm) || isNaN(C) || isNaN(m) || delta_sigma <= 0 || a_mm <= 0 || C <= 0 || m <= 0) return;

    const a_m = a_mm * 1e-3;
    const Y = 1.12; // Standard edge crack factor

    // Stress intensity factor range: Delta_K = Y * delta_sigma * sqrt(pi * a_m)  [MPa * m^0.5]
    const Delta_K = Y * delta_sigma * Math.sqrt(Math.PI * a_m);

    // Paris Law: da/dN = C * (Delta_K)^m  [m / cycle -> mm / cycle]
    const dadn_m = C * Math.pow(Delta_K, m);
    const dadn_mm = dadn_m * 1000.0;

    // Cycles to grow 1 mm:
    const cycles_per_mm = dadn_mm > 0 ? Math.round(1.0 / dadn_mm) : 0;

    daResEl.textContent = 'da/dN = ' + dadn_mm.toExponential(2) + ' mm / cycle';
    dkResEl.textContent = 'ΔK = ' + Delta_K.toFixed(1) + ' MPa·m^½ | +1 mm growth requires ~' + cycles_per_mm.toLocaleString() + ' cycles (Δσ=' + delta_sigma + ' MPa)';
  }

  [dsEl, aEl, cEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cyclic fatigue tensile stress range $\Delta\sigma = \sigma_{\max} - \sigma_{\min}$ in MPa.',
      'Enter current crack length a in mm.',
      'Enter Paris material constants C and exponent m (typically $m \approx 3.0$ for steels, $m \approx 3.5$ for aluminum).',
      'Inspect crack growth rate per cycle ($da/dN$) and cyclic stress intensity range $\Delta K$.'
    ],
    benefitTitle: 'Paul C. Paris & Fazil Erdogan 1963 Fatigue Growth Standard',
    benefitContent: 'Provides the mathematical foundation for Damage Tolerance and periodic non-destructive inspection (NDI) scheduling in commercial aircraft airframes and bridge structures.',
    faqs: [{ q: 'What are the three regions of a fatigue crack growth curve?', a: 'Region I: Near-threshold ($\Delta K_{\text{th}}$) microcrack initiation; Region II: Linear Paris law power regime; Region III: Rapid unstable fracture approaching $K_{IC}$.' }]
  },

  // 8. Larson-Miller Parameter Creep Rupture Lifetime Calculator
  {
    slug: 'larson-miller-parameter-creep-rupture-lifetime-calculator',
    name: 'Larson-Miller Parameter Creep Rupture Lifetime (LMP = T·(C + log₁₀ t_r)) Calculator',
    description: 'Calculate high-temperature creep rupture time t_r in hours and Larson-Miller Parameter (LMP = T · (C + log₁₀(t_r)) / 1000) for gas turbine superalloys, boiler tubes, and nuclear reactor vessels.',
    category: 'Science',
    icon: 'text',
    keywords: ['larson miller parameter calculator', 'creep rupture lifetime formula lmp online', 'high temperature superalloy creep time to rupture calculator', 'larson miller constant c 20 calculator', 'metallurgy materials science high temperature mechanics online'],
    order: 1267,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Operating Temperature T (°C), Known LMP Rating & Larson-Miller Constant C (Standard C = 20)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lm-temp">Temp T (°C)</label>
          <input class="tool-textarea" id="lm-temp" type="number" step="25" value="650" placeholder="650 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-lmp">LMP (×10³ K·hr)</label>
          <input class="tool-textarea" id="lm-lmp" type="number" step="0.5" value="23.5" placeholder="23.5 (from Master Curve)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-c">Constant C</label>
          <input class="tool-textarea" id="lm-c" type="number" step="1" value="20" placeholder="20 (Standard for Steels)" />
        </div>
      </div>
      <div id="lm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lm-res-tr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Creep Life t_r = 30,199 Hours (3.45 Years)</span>
            <span class="stat-label">Predicted Time to Creep Rupture (t_r = 10^(LMP·1000/T - C))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lm-res-tdeg" style="color:var(--green-dark); font-weight:700;">Absolute T = 923.15 K | LMP = 23,500 | +25°C rise drops creep life to 0.72 Years (4.8× acceleration)</span>
            <span class="stat-label">Thermal Creep Acceleration Sensitivity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('lm-temp'), lmpEl = document.getElementById('lm-lmp'), cEl = document.getElementById('lm-c');
  const trResEl = document.getElementById('lm-res-tr'), tdResEl = document.getElementById('lm-res-tdeg');

  function update() {
    const T_C = parseFloat(tEl.value), LMP_k = parseFloat(lmpEl.value), C = parseFloat(cEl.value);
    if (isNaN(T_C) || isNaN(LMP_k) || isNaN(C) || T_C < -273.15 || LMP_k <= 0 || C <= 0) return;

    const T_K = T_C + 273.15;
    const LMP = LMP_k * 1000.0;

    // LMP = T * ( C + log10(t_r) ) => log10(t_r) = (LMP / T) - C
    const log10_tr = (LMP / T_K) - C;
    const t_r_hours = Math.pow(10.0, log10_tr);
    const t_r_years = t_r_hours / 8760.0;

    // +25°C thermal penalty:
    const T_hot_K = T_K + 25.0;
    const log10_tr_hot = (LMP / T_hot_K) - C;
    const tr_hot_years = Math.pow(10.0, log10_tr_hot) / 8760.0;

    trResEl.textContent = 'Creep Life t_r = ' + Math.round(t_r_hours).toLocaleString() + ' Hours (' + (t_r_years >= 1 ? t_r_years.toFixed(2) + ' Years' : (t_r_hours/24).toFixed(1) + ' Days') + ')';
    tdResEl.textContent = 'LMP = ' + LMP_k.toFixed(1) + 'k @ ' + T_C + '°C | +25°C rise shortens creep life to ' + (tr_hot_years >= 1 ? tr_hot_years.toFixed(2) + ' Years' : (tr_hot_years * 365).toFixed(1) + ' Days');
  }

  [tEl, lmpEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter continuous metal operating temperature in $^\circ\text{C}$.',
      'Enter material Larson-Miller Parameter LMP from isothermal stress-rupture master curve.',
      'Enter Larson-Miller constant C (standard $C = 20$ for nickel alloys and steels).',
      'Inspect estimated creep rupture life in hours and operating years.'
    ],
    benefitTitle: 'F. R. Larson & James Miller 1952 Time-Temperature Trade-Off',
    benefitContent: 'Allows short-term accelerated high-temperature laboratory creep test data to reliably extrapolate long-term multi-decade structural durability for power plant boilers and jet engines.',
    faqs: [{ q: 'What physical mechanism causes high-temperature creep deformation?', a: 'Thermally activated vacancy diffusion, dislocation climb, and grain boundary sliding operating above $0.4\ T_m$ (homologous melting temperature).' }]
  },

  // 9. Weibull Modulus Brittle Ceramic Fracture Probability Calculator
  {
    slug: 'weibull-modulus-brittle-ceramic-fracture-probability-calculator',
    name: 'Weibull Modulus (P_f = 1 - e^(-(σ / σ₀)ᵐ)) Brittle Ceramic Fracture Calculator',
    description: 'Calculate brittle ceramic and glass statistical failure probability P_f (P_f = 1 - exp(-(σ / σ₀)^m)), Weibull modulus m, and characteristic characteristic strength σ₀ (63.2% failure stress).',
    category: 'Science',
    icon: 'text',
    keywords: ['weibull modulus calculator', 'ceramic fracture probability formula online', 'characteristic strength sigma 0 weibull distribution calculator', 'brittle materials statistical reliability calculator', 'materials science ceramic engineering reliability online'],
    order: 1268,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Stress σ (MPa), Characteristic Strength σ₀ (MPa) & Weibull Modulus m (5 to 30)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wb-s">Applied Stress σ (MPa)</label>
          <input class="tool-textarea" id="wb-s" type="number" step="25" value="250.0" placeholder="250.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-s0">Char Strength σ₀</label>
          <input class="tool-textarea" id="wb-s0" type="number" step="25" value="350.0" placeholder="350.0 MPa (63.2% Fail)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wb-m">Weibull Modulus m</label>
          <input class="tool-textarea" id="wb-m" type="number" step="1" value="10.0" placeholder="10.0 (Structural Ceramic)" />
        </div>
      </div>
      <div id="wb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wb-res-pf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Failure Prob P_f = 3.30% (Reliability R = 96.7%)</span>
            <span class="stat-label">Cumulative Fracture Probability (P_f = 1 - e^(-(σ/σ₀)ᵐ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wb-res-desc" style="color:var(--green-dark); font-weight:700;">HIGH RELIABILITY (Weibull m = 10: Narrow flaw size distribution | Silicon Nitride range)</span>
            <span class="stat-label">Material Flaw Uniformity & Statistical Reliability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('wb-s'), s0El = document.getElementById('wb-s0'), mEl = document.getElementById('wb-m');
  const pfResEl = document.getElementById('wb-res-pf'), dsResEl = document.getElementById('wb-res-desc');

  function update() {
    const sigma = parseFloat(sEl.value), sigma_0 = parseFloat(s0El.value), m = parseFloat(mEl.value);
    if (isNaN(sigma) || isNaN(sigma_0) || isNaN(m) || sigma < 0 || sigma_0 <= 0 || m <= 0) return;

    // Weibull cumulative failure probability: P_f = 1 - exp( - (sigma / sigma_0)^m )
    const ratio = sigma / sigma_0;
    const P_f = 1.0 - Math.exp(-Math.pow(ratio, m));
    const P_f_pct = P_f * 100.0;
    const R_pct = (1.0 - P_f) * 100.0;

    let qual = '', color = '#22543d';
    if (m >= 15.0) qual = 'EXCELLENT UNIFORMITY (m ≥ 15: Low flaw scatter, engineered ceramic)';
    else if (m >= 8.0) qual = 'GOOD STRUCTURAL CERAMIC (m = 8 - 14: Si₃N₄, SiC, Al₂O₃)';
    else qual = 'BROAD FLAW DISTRIBUTION (m < 8: High scatter, traditional pottery/glass)';

    pfResEl.textContent = 'Failure P_f = ' + P_f_pct.toFixed(2) + '% (Survival R = ' + R_pct.toFixed(2) + '%)';
    dsResEl.textContent = qual + ' [σ = ' + sigma + ' MPa vs σ₀ = ' + sigma_0 + ' MPa @ m = ' + m + ']';
  }

  [sEl, s0El, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied tensile stress $\sigma$ in MPa.',
      'Enter characteristic scale parameter $\sigma_0$ (the stress where $63.2\%$ of samples fail).',
      'Enter Weibull modulus shape parameter m (flaw variability index).',
      'Inspect statistical cumulative failure probability $P_f$ and survival reliability R.'
    ],
    benefitTitle: 'Waloddi Weibull 1939 Statistical Strength Distribution',
    benefitContent: 'Brittle materials fail from random microscopic Griffith flaws; higher Weibull modulus m indicates tighter flaw size control and predictable structural performance.',
    faqs: [{ q: 'Why do large ceramic components fail at lower stresses than small test bars?', a: 'Larger volumes have a higher statistical probability of containing a critical fatal flaw (volume scaling effect $P_f \propto V$).' }]
  },

  // 10. Miller Indices Cubic Interplanar Spacing Calculator
  {
    slug: 'miller-indices-cubic-crystal-interplanar-spacing-calculator',
    name: 'Miller Indices Cubic Interplanar Spacing (d_hkl = a / √(h² + k² + l²)) Calculator',
    description: 'Calculate cubic crystal lattice plane interplanar spacing d_hkl in Ångströms (d_hkl = a / √(h² + k² + l²)), plane normal orientation, and Atomic Packing Factor (APF) for SC, BCC, and FCC crystal structures.',
    category: 'Science',
    icon: 'text',
    keywords: ['miller indices calculator', 'cubic crystal interplanar spacing formula d hkl online', 'lattice parameter a to d spacing calculator', 'bcc fcc sc atomic packing factor calculator', 'crystallography materials science solid state physics online'],
    order: 1269,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Miller Indices (h, k, l), Lattice Parameter a (Å) & Crystal Structure (FCC / BCC / SC)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mi-h">h</label>
          <input class="tool-textarea" id="mi-h" type="number" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mi-k">k</label>
          <input class="tool-textarea" id="mi-k" type="number" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mi-l">l</label>
          <input class="tool-textarea" id="mi-l" type="number" step="1" value="1" placeholder="1" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mi-a">Lattice a (Å)</label>
          <input class="tool-textarea" id="mi-a" type="number" step="0.01" value="3.615" placeholder="3.615 Å (Copper FCC)" />
        </div>
      </div>
      <div id="mi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mi-res-dhkl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">d₁₁₁ = 2.087 Å (0.2087 nm)</span>
            <span class="stat-label">Cubic Crystal Plane d-Spacing (d = a / √(h² + k² + l²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mi-res-apf" style="color:var(--green-dark); font-weight:700;">FCC Structure (APF = 74.0% Close-Packed) | Atomic Radius r = 1.278 Å (a·√2 / 4)</span>
            <span class="stat-label">Atomic Packing Factor (APF) & Hard-Sphere Metallic Radius</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('mi-h'), kEl = document.getElementById('mi-k'), lEl = document.getElementById('mi-l'), aEl = document.getElementById('mi-a');
  const dhResEl = document.getElementById('mi-res-dhkl'), apResEl = document.getElementById('mi-res-apf');

  function update() {
    const h = parseInt(hEl.value, 10), k = parseInt(kEl.value, 10), l = parseInt(lEl.value, 10);
    const a_A = parseFloat(aEl.value);

    if (isNaN(h) || isNaN(k) || isNaN(l) || isNaN(a_A) || a_A <= 0 || (h===0 && k===0 && l===0)) return;

    // d_hkl = a / sqrt(h^2 + k^2 + l^2)
    const sum_sq = Math.pow(h, 2) + Math.pow(k, 2) + Math.pow(l, 2);
    const d_hkl_A = a_A / Math.sqrt(sum_sq);
    const d_hkl_nm = d_hkl_A / 10.0;

    // Metallic radius for FCC: r = a * sqrt(2) / 4
    const r_fcc = (a_A * Math.SQRT2) / 4.0;

    dhResEl.textContent = 'd₍' + h + k + l + '₎ = ' + d_hkl_A.toFixed(3) + ' Å (' + d_hkl_nm.toFixed(4) + ' nm)';
    apResEl.textContent = 'FCC Metallic Radius r = ' + r_fcc.toFixed(3) + ' Å | h²+k²+l² = ' + sum_sq + ' (a=' + a_A + ' Å)';
  }

  [hEl, kEl, lEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter integer Miller indices h, k, and l for crystal plane (e.g. 1, 1, 1).',
      'Enter cubic unit cell lattice parameter a in Ångströms.',
      'Inspect perpendicular interplanar spacing $d_{hkl}$ and hard-sphere atomic radius.'
    ],
    benefitTitle: 'William Hallowes Miller 1839 Crystallographic Notation',
    benefitContent: 'Miller indices $(hkl)$ uniquely specify the orientation and spacing of parallel crystallographic atomic planes, governing X-ray diffraction peaks and dislocation slip planes.',
    faqs: [{ q: 'What is the closest packed plane in FCC vs BCC crystals?', a: 'In FCC crystals, $\{111\}$ planes are close-packed; in BCC crystals, $\{110\}$ planes have the highest planar atomic density.' }]
  },

  // 11. Hume-Rothery Solid Solubility Rules Evaluator
  {
    slug: 'hume-rothery-solid-solubility-rules-evaluator',
    name: 'Hume-Rothery Solid Solubility Rules (Atomic Size, Crystal Structure & Electronegativity) Evaluator',
    description: 'Evaluate substitutional complete solid solution solubility potential between solvent and solute elements using the 4 Hume-Rothery criteria (Atomic Size Difference under 15%, Crystal Structure, Valence, Electronegativity).',
    category: 'Science',
    icon: 'text',
    keywords: ['hume rothery rules calculator', 'substitutional solid solution solubility criteria online', 'atomic radius difference 15 percent rule calculator', 'complete miscibility alloy hume rothery evaluator', 'metallurgy materials science phase diagrams online'],
    order: 1270,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solvent Radius r_A (pm) & Solute Radius r_B (pm), Valencies & Electronegativities',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hr-ra">Solvent r_A (pm)</label>
          <input class="tool-textarea" id="hr-ra" type="number" step="5" value="128" placeholder="128 pm (Cu)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-rb">Solute r_B (pm)</label>
          <input class="tool-textarea" id="hr-rb" type="number" step="5" value="125" placeholder="125 pm (Ni)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-cryst">Crystal Match</label>
          <select class="tool-textarea" id="hr-cryst">
            <option value="match" selected>Identical (Both FCC / Both BCC)</option>
            <option value="diff">Different (e.g. FCC vs BCC)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-en">Δ Electronegativity</label>
          <input class="tool-textarea" id="hr-en" type="number" step="0.05" value="0.01" placeholder="0.01 (Cu: 1.90, Ni: 1.91)" />
        </div>
      </div>
      <div id="hr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hr-res-eval" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">COMPLETE SOLID SOLUBILITY (100% Miscible)</span>
            <span class="stat-label">Hume-Rothery Substitutional Solubility Prediction</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hr-res-diff" style="color:var(--green-dark); font-weight:700;">Size Difference Δr = 2.34% (< 15% Rule Satisfied ✓) | Identical FCC Crystal | ΔEN = 0.01</span>
            <span class="stat-label">Atomic Size Difference Percentage (|r_A - r_B| / r_A)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const raEl = document.getElementById('hr-ra'), rbEl = document.getElementById('hr-rb');
  const crEl = document.getElementById('hr-cryst'), enEl = document.getElementById('hr-en');
  const evResEl = document.getElementById('hr-res-eval'), dfResEl = document.getElementById('hr-res-diff');

  function update() {
    const rA = parseFloat(raEl.value), rB = parseFloat(rbEl.value);
    const cryst = crEl.value, dEN = parseFloat(enEl.value);

    if (isNaN(rA) || isNaN(rB) || isNaN(dEN) || rA <= 0 || rB <= 0 || dEN < 0) return;

    // Size difference percentage: |rA - rB| / rA * 100
    const delta_r_pct = (Math.abs(rA - rB) / rA) * 100.0;

    const sizePass = delta_r_pct < 15.0;
    const crystPass = (cryst === 'match');
    const enPass = dEN < 0.40;

    let evalText = '', color = '#22543d';
    if (sizePass && crystPass && enPass) {
      evalText = 'COMPLETE SOLID SOLUBILITY (Isomorphous System like Cu-Ni)';
      color = '#22543d';
    } else if (sizePass && enPass) {
      evalText = 'EXTENSIVE PARTIAL SOLUBILITY (Limited by crystal structure difference)';
      color = '#ea580c';
    } else {
      evalText = 'POOR / INSOLUBLE (Violates Hume-Rothery rules: Intermetallic compound forms)';
      color = '#c53030';
    }

    evResEl.textContent = evalText;
    evResEl.style.color = color;
    dfResEl.textContent = 'Size Difference Δr = ' + delta_r_pct.toFixed(2) + '% (' + (sizePass ? '< 15% ✓' : '> 15% ✗') + ') | Crystal: ' + (crystPass ? 'Match ✓' : 'Differs ✗') + ' | ΔEN = ' + dEN.toFixed(2);
  }

  [raEl, rbEl, enEl].forEach(el => el.addEventListener('input', update));
  crEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter solvent host atomic radius $r_A$ in picometers (pm).',
      'Enter solute solute atomic radius $r_B$ in pm.',
      'Select crystal lattice structure matching status (Identical vs Different).',
      'Enter electronegativity difference $|\chi_A - \chi_B|$.',
      'Inspect Hume-Rothery substitutional solubility verdict (Complete, Partial, Insoluble).'
    ],
    benefitTitle: 'William Hume-Rothery 1934 Metallurgical Standard',
    benefitContent: 'Provides the universal criteria governing complete solid solubility (isomorphous binary systems like Copper-Nickel Monel alloys) without brittle intermetallic phase formation.',
    faqs: [{ q: 'What is the 15% atomic size rule?', a: 'If solute and solvent atomic radii differ by more than $15\%$, severe lattice strain energy restricts solid solubility to minimal levels.' }]
  },

  // 12. Vickers, Brinell & Rockwell Hardness Conversion Calculator
  {
    slug: 'vickers-brinell-rockwell-hardness-conversion-calculator',
    name: 'Hardness Conversion (Vickers HV, Brinell HBW, Rockwell HRC & Tensile Strength) Calculator',
    description: 'Calculate and convert metallurgical hardness test scales (ASTM E140): Vickers Diamond Pyramid Hardness (HV), Brinell (HBW 10/3000), Rockwell C (HRC), Rockwell B (HRB), and estimated Ultimate Tensile Strength (UTS in MPa).',
    category: 'Science',
    icon: 'text',
    keywords: ['hardness conversion calculator', 'vickers to rockwell hrc brinell hbw formula online', 'astm e140 hardness conversion tensile strength calculator', 'metallurgical hardness testing scales calculator', 'metallurgy mechanical engineering materials testing online'],
    order: 1271,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Vickers Hardness (HV in kgf/mm²), Test Load F (kgf) & Indentation Diagonal d (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hd-hv">Vickers (HV)</label>
          <input class="tool-textarea" id="hd-hv" type="number" step="25" value="320" placeholder="320 HV (Hardened Steel)" />
        </div>
      </div>
      <div id="hd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hd-res-hrc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Rockwell HRC = 32.2 | Brinell HBW = 304</span>
            <span class="stat-label">Converted ASTM E140 Industrial Hardness Numbers</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hd-res-uts" style="color:var(--green-dark); font-weight:700;">Estimated Tensile Strength UTS ≈ 1,024 MPa (3.2 × HV Rule of Thumb)</span>
            <span class="stat-label">Empirical Ultimate Tensile Strength (UTS ≈ 3.2 · HV)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hvEl = document.getElementById('hd-hv');
  const hrcResEl = document.getElementById('hd-res-hrc'), utsResEl = document.getElementById('hd-res-uts');

  function update() {
    const HV = parseFloat(hvEl.value);
    if (isNaN(HV) || HV <= 0) return;

    // Empirical ASTM E140 steel hardness conversion approximations:
    // HRC approx = 110 - ( 1450 / sqrt(HV) )  valid for HV > 220
    let HRC = 0, HBW = 0;
    if (HV >= 220) {
      HRC = 110.0 - (1450.0 / Math.sqrt(HV));
      HBW = HV * 0.95;
    } else {
      HRC = 0;
      HBW = HV * 0.95;
    }

    // Ultimate Tensile Strength approx (for steels): UTS (MPa) approx 3.2 * HV approx 3.45 * HBW
    const UTS_MPa = HV * 3.2;

    hrcResEl.textContent = 'Rockwell HRC = ' + (HRC > 0 ? HRC.toFixed(1) : '< 20 HRC (Use HRB)') + ' | Brinell HBW = ' + Math.round(HBW);
    utsResEl.textContent = 'Estimated Tensile UTS ≈ ' + Math.round(UTS_MPa).toLocaleString() + ' MPa (' + Math.round(UTS_MPa / 6.895).toLocaleString() + ' ksi @ ' + HV + ' HV)';
  }

  hvEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter measured Vickers pyramid hardness value (HV in $\text{kgf/mm}^2$).',
      'Inspect corresponding Rockwell C (HRC), Brinell (HBW), and estimated steel tensile strength in MPa.'
    ],
    benefitTitle: 'ASTM E140 Standard Hardness Conversion',
    benefitContent: 'Allows rapid non-destructive estimation of steel tensile strength from compact microhardness indenter measurements ($UTS \approx 3.2 \times HV$).',
    faqs: [{ q: 'Why is the diamond pyramid angle 136° in the Vickers test?', a: 'An angle of $136^\circ$ provides the closest match to the ideal indent geometry of a Brinell ball with diameter $d = 0.375 D$.' }]
  },

  // 13. Mohr's Circle Principal Stresses Calculator
  {
    slug: 'mohr-circle-principal-stresses-maximum-shear-calculator',
    name: 'Mohr\'s Circle Principal Stresses (σ₁, σ₂) & Maximum In-Plane Shear (τ_max) Calculator',
    description: 'Calculate 2D plane stress state Mohr\'s Circle center (σ_avg), circle radius (R), principal normal stresses (σ₁, σ₂), maximum in-plane shear stress (τ_max), and principal stress orientation angle (2θ_p).',
    category: 'Math',
    icon: 'text',
    keywords: ['mohrs circle calculator', 'principal stresses formula sigma 1 sigma 2 online', 'maximum shear stress tau max mohrs circle calculator', 'plane stress transformation angle of principal plane calculator', 'solid mechanics mechanical civil engineering stress analysis online'],
    order: 1272,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Normal Stresses σ_x & σ_y (MPa, Tension +) & Shear Stress τ_xy (MPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mc-sx">Stress σ_x (MPa)</label>
          <input class="tool-textarea" id="mc-sx" type="number" step="10" value="80.0" placeholder="+80.0 MPa (Tension)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-sy">Stress σ_y (MPa)</label>
          <input class="tool-textarea" id="mc-sy" type="number" step="10" value="-20.0" placeholder="-20.0 MPa (Compression)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mc-txy">Shear τ_xy (MPa)</label>
          <input class="tool-textarea" id="mc-txy" type="number" step="5" value="40.0" placeholder="40.0 MPa" />
        </div>
      </div>
      <div id="mc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mc-res-p12" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">σ₁ = +94.0 MPa | σ₂ = -34.0 MPa</span>
            <span class="stat-label">Principal Normal Stresses (σ_avg ± R)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mc-res-tau" style="color:var(--green-dark); font-weight:700;">Max Shear τ_max = 64.0 MPa (Circle Radius R) | Principal Angle θ_p = 19.3°</span>
            <span class="stat-label">Maximum In-Plane Shear Stress & Principal Plane Orientation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sxEl = document.getElementById('mc-sx'), syEl = document.getElementById('mc-sy'), txyEl = document.getElementById('mc-txy');
  const p12ResEl = document.getElementById('mc-res-p12'), tuResEl = document.getElementById('mc-res-tau');

  function update() {
    const sx = parseFloat(sxEl.value), sy = parseFloat(syEl.value), txy = parseFloat(txyEl.value);
    if (isNaN(sx) || isNaN(sy) || isNaN(txy)) return;

    // Mohr's circle center: sigma_avg = (sx + sy) / 2
    const sigma_avg = (sx + sy) / 2.0;

    // Mohr's circle radius R = sqrt( ((sx - sy)/2)^2 + txy^2 )
    const R = Math.sqrt(Math.pow((sx - sy) / 2.0, 2) + Math.pow(txy, 2));

    // Principal stresses:
    const sigma_1 = sigma_avg + R;
    const sigma_2 = sigma_avg - R;

    // Maximum in-plane shear stress = R
    const tau_max = R;

    // Principal angle: 2*theta_p = atan2(2*txy, sx - sy)
    const two_theta_p_rad = Math.atan2(2.0 * txy, sx - sy);
    const theta_p_deg = ((two_theta_p_rad * 180.0) / Math.PI) / 2.0;

    p12ResEl.textContent = 'σ₁ = ' + (sigma_1 >= 0 ? '+' : '') + sigma_1.toFixed(1) + ' MPa | σ₂ = ' + (sigma_2 >= 0 ? '+' : '') + sigma_2.toFixed(1) + ' MPa';
    tuResEl.textContent = 'Max Shear τ_max = ' + tau_max.toFixed(1) + ' MPa (Radius R) | θ_p = ' + theta_p_deg.toFixed(1) + '° (Center σ_avg = ' + sigma_avg.toFixed(1) + ' MPa)';
  }

  [sxEl, syEl, txyEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter normal stresses $\sigma_x$ and $\sigma_y$ in MPa (positive for tension, negative for compression).',
      'Enter shear stress $\tau_{xy}$ in MPa.',
      'Inspect principal normal stresses ($\sigma_1, \sigma_2$), maximum in-plane shear stress $\tau_{\max}$, and principal orientation angle $\theta_p$.'
    ],
    benefitTitle: 'Christian Otto Mohr 1882 Stress Transformation Circle',
    benefitContent: 'Transforms 2D stress tensors onto a geometric circle, identifying the maximum tensile and shear stress planes critical for structural failure prediction.',
    faqs: [{ q: 'What is the shear stress on the principal stress planes?', a: 'On the principal stress planes, shear stress is identically ZERO ($\tau = 0$).' }]
  },

  // 14. Von Mises & Tresca Yield Criterion Equivalent Stress Calculator
  {
    slug: 'von-mises-tresca-yield-criterion-equivalent-stress-calculator',
    name: 'Von Mises & Tresca Yield Criterion Equivalent Stress Calculator',
    description: 'Calculate multi-axial equivalent stress under complex loading using Von Mises Distortion Energy (σ_vm) and Tresca Maximum Shear Stress (σ_tresca = σ₁ - σ₃) failure criteria.',
    category: 'Math',
    icon: 'text',
    keywords: ['von mises calculator', 'tresca yield criterion equivalent stress formula online', 'distortion energy theory von mises stress calculator', 'maximum shear stress theory tresca calculator', 'mechanical design failure theories solid mechanics online'],
    order: 1273,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Principal Stresses σ₁, σ₂, σ₃ (MPa) & Material Yield Strength S_y (MPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vm-s1">σ₁ (MPa)</label>
          <input class="tool-textarea" id="vm-s1" type="number" step="25" value="180.0" placeholder="+180.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vm-s2">σ₂ (MPa)</label>
          <input class="tool-textarea" id="vm-s2" type="number" step="25" value="60.0" placeholder="+60.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vm-s3">σ₃ (MPa)</label>
          <input class="tool-textarea" id="vm-s3" type="number" step="25" value="-40.0" placeholder="-40.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vm-sy">Yield S_y (MPa)</label>
          <input class="tool-textarea" id="vm-sy" type="number" step="25" value="250.0" placeholder="250.0 MPa" />
        </div>
      </div>
      <div id="vm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vm-res-vm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Von Mises σ_vm = 191.6 MPa (Safety Factor N = 1.30 ✓)</span>
            <span class="stat-label">Von Mises Equivalent Stress (Distortion Energy Theory)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vm-res-tr" style="color:var(--green-dark); font-weight:700;">Tresca σ_tresca = 220.0 MPa (Safety Factor N = 1.14 | More Conservative)</span>
            <span class="stat-label">Tresca Maximum Shear Stress Criterion (σ₁ - σ₃)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const s1El = document.getElementById('vm-s1'), s2El = document.getElementById('vm-s2');
  const s3El = document.getElementById('vm-s3'), syEl = document.getElementById('vm-sy');
  const vmResEl = document.getElementById('vm-res-vm'), trResEl = document.getElementById('vm-res-tr');

  function update() {
    const s1 = parseFloat(s1El.value), s2 = parseFloat(s2El.value);
    const s3 = parseFloat(s3El.value), Sy = parseFloat(syEl.value);

    if (isNaN(s1) || isNaN(s2) || isNaN(s3) || isNaN(Sy) || Sy <= 0) return;

    // Von Mises stress: sigma_vm = 1/sqrt(2) * sqrt( (s1-s2)^2 + (s2-s3)^2 + (s3-s1)^2 )
    const sigma_vm = (1.0 / Math.SQRT2) * Math.sqrt(
      Math.pow(s1 - s2, 2) + Math.pow(s2 - s3, 2) + Math.pow(s3 - s1, 2)
    );

    // Tresca stress: sigma_tresca = max(|s1-s2|, |s2-s3|, |s3-s1|)
    const sigma_tresca = Math.max(Math.abs(s1 - s2), Math.abs(s2 - s3), Math.abs(s3 - s1));

    const n_vm = Sy / sigma_vm;
    const n_tresca = Sy / sigma_tresca;

    vmResEl.textContent = 'Von Mises σ_vm = ' + sigma_vm.toFixed(1) + ' MPa (Factor N = ' + n_vm.toFixed(2) + ' ' + (n_vm >= 1.0 ? '✓ SAFE' : '✗ YIELD') + ')';
    vmResEl.style.color = n_vm >= 1.0 ? '#22543d' : '#c53030';
    trResEl.textContent = 'Tresca σ_tresca = ' + sigma_tresca.toFixed(1) + ' MPa (Factor N = ' + n_tresca.toFixed(2) + ' | ' + (n_tresca >= 1.0 ? 'SAFE' : 'YIELD') + ')';
  }

  [s1El, s2El, s3El, syEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter principal stresses $\sigma_1, \sigma_2, \sigma_3$ in MPa.',
      'Enter material uniaxial yield strength $S_y$ in MPa.',
      'Inspect Von Mises Distortion Energy and Tresca Maximum Shear equivalent stresses and design safety factors.'
    ],
    benefitTitle: 'Ductile Yield Failure Criteria',
    benefitContent: 'Hydrostatic pressure does not cause plastic yielding; Von Mises isolates distortional shape-changing energy, accurately predicting yielding in ductile metals under multi-axial loads.',
    faqs: [{ q: 'Why is Tresca always more conservative than Von Mises?', a: 'The Tresca hexagon yield locus is completely inscribed inside the smooth Von Mises ellipse, predicting yielding at up to $15.5\%$ lower stresses.' }]
  },

  // 15. Euler Column Buckling Critical Load Calculator
  {
    slug: 'euler-buckling-load-slenderness-ratio-column-calculator',
    name: 'Euler Column Buckling Critical Load (P_cr = π²·E·I / (K·L)²) Calculator',
    description: 'Calculate slender column elastic buckling critical load P_cr in kN (P_cr = π²·E·I / (K·L)²), critical buckling stress σ_cr, and slenderness ratio λ (lambda = K·L / r) for structural steel and civil engineering.',
    category: 'Math',
    icon: 'text',
    keywords: ['euler buckling calculator', 'critical buckling load formula p cr equals pi squared e i over kl squared online', 'column slenderness ratio effective length factor calculator', 'structural steel column buckling calculator', 'civil structural mechanical engineering column design online'],
    order: 1274,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Young\'s Modulus E (GPa), Area Moment of Inertia I (cm⁴), Column Length L (m) & End Condition K',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eb-e">Modulus E (GPa)</label>
          <input class="tool-textarea" id="eb-e" type="number" step="10" value="200.0" placeholder="200.0 GPa (Structural Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eb-i">Inertia I (cm⁴)</label>
          <input class="tool-textarea" id="eb-i" type="number" step="50" value="350.0" placeholder="350.0 cm⁴" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eb-l">Length L (m)</label>
          <input class="tool-textarea" id="eb-l" type="number" step="0.5" value="4.0" placeholder="4.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eb-k">End Condition K</label>
          <select class="tool-textarea" id="eb-k">
            <option value="1.0" selected>Pinned-Pinned (K = 1.0)</option>
            <option value="0.7">Fixed-Pinned (K = 0.7)</option>
            <option value="0.5">Fixed-Fixed (K = 0.5)</option>
            <option value="2.0">Fixed-Free Cantilever (K = 2.0)</option>
          </select>
        </div>
      </div>
      <div id="eb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eb-res-pcr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Critical Buckling Load P_cr = 431.8 kN</span>
            <span class="stat-label">Euler Elastic Instability Buckling Load (P_cr = π²·E·I / (K·L)²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eb-res-eff" style="color:var(--green-dark); font-weight:700;">Effective Length L_e = 4.00 m (K·L) | Flexural Rigidity E·I = 700.0 kN·m²</span>
            <span class="stat-label">Effective Column Length (L_e) & Flexural Rigidity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eEl = document.getElementById('eb-e'), iEl = document.getElementById('eb-i');
  const lEl = document.getElementById('eb-l'), kEl = document.getElementById('eb-k');
  const pcrResEl = document.getElementById('eb-res-pcr'), efResEl = document.getElementById('eb-res-eff');

  function update() {
    const E_GPa = parseFloat(eEl.value), I_cm4 = parseFloat(iEl.value);
    const L_m = parseFloat(lEl.value), K = parseFloat(kEl.value);

    if (isNaN(E_GPa) || isNaN(I_cm4) || isNaN(L_m) || isNaN(K) || E_GPa <= 0 || I_cm4 <= 0 || L_m <= 0 || K <= 0) return;

    const E_Pa = E_GPa * 1e9;
    const I_m4 = I_cm4 * 1e-8; // 1 cm^4 = 10^-8 m^4

    // Effective length: Le = K * L
    const Le = K * L_m;

    // Euler critical load: P_cr = pi^2 * E * I / (Le^2)  [N -> kN]
    const P_cr_N = (Math.pow(Math.PI, 2) * E_Pa * I_m4) / Math.pow(Le, 2);
    const P_cr_kN = P_cr_N / 1000.0;

    const EI_kNm2 = (E_Pa * I_m4) / 1000.0;

    pcrResEl.textContent = 'Buckling Load P_cr = ' + P_cr_kN.toFixed(1) + ' kN';
    efResEl.textContent = 'Effective L_e = ' + Le.toFixed(2) + ' m (K=' + K + ') | Flexural Rigidity EI = ' + EI_kNm2.toFixed(1) + ' kN·m²';
  }

  [eEl, iEl, lEl].forEach(el => el.addEventListener('input', update));
  kEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter material Young\'s Modulus E in GPa.',
      'Enter area moment of inertia of column cross-section I in $\text{cm}^4$.',
      'Enter unsupported column length L in meters.',
      'Select column boundary end support condition (Pinned-Pinned K=1.0, Fixed-Fixed K=0.5).',
      'Inspect Euler critical buckling load $P_{cr}$ in kN.'
    ],
    benefitTitle: 'Leonhard Euler 1757 Elastic Column Instability',
    benefitContent: 'Identifies sudden catastrophic lateral buckling failure under compressive axial loads that occur well below material compressive yield strength.',
    faqs: [{ q: 'Why is a fixed-fixed column 4x stronger in buckling than a pinned-pinned column?', a: 'Because $K = 0.5$, effective length is halved ($L_e = L/2$); since $P_{cr} \propto 1/L_e^2$, strength increases by $4\times$.' }]
  },

  // 16. Beam Bending Deflection & Elastic Section Modulus Calculator
  {
    slug: 'beam-bending-deflection-moment-inertia-calculator',
    name: 'Beam Bending Stress (σ = M·y / I) & Center Deflection (δ = F·L³ / 48EI) Calculator',
    description: 'Calculate simply supported beam center-point maximum deflection δ in mm (δ = F·L³ / (48·E·I)), maximum bending moment M (M = F·L / 4), and maximum outer fiber tensile/compressive flexural bending stress σ.',
    category: 'Math',
    icon: 'text',
    keywords: ['beam deflection calculator', 'bending stress formula my over i online', 'simply supported beam center load deflection calculator', 'moment of inertia section modulus beam calculator', 'civil structural mechanical engineering beam bending online'],
    order: 1275,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Center Point Load F (kN), Beam Span L (m), Modulus E (GPa) & Moment of Inertia I (cm⁴)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bm-f">Point Load F (kN)</label>
          <input class="tool-textarea" id="bm-f" type="number" step="5" value="25.0" placeholder="25.0 kN" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bm-l">Span L (m)</label>
          <input class="tool-textarea" id="bm-l" type="number" step="0.5" value="5.0" placeholder="5.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bm-e">Modulus E (GPa)</label>
          <input class="tool-textarea" id="bm-e" type="number" step="10" value="200.0" placeholder="200.0 GPa (Steel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bm-i">Inertia I (cm⁴)</label>
          <input class="tool-textarea" id="bm-i" type="number" step="500" value="4500" placeholder="4,500 cm⁴ (I-Beam)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bm-c">Half-Height c (mm)</label>
          <input class="tool-textarea" id="bm-c" type="number" step="10" value="100.0" placeholder="100.0 mm (h/2)" />
        </div>
      </div>
      <div id="bm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bm-res-def" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Center Deflection δ = 7.23 mm (L / 691)</span>
            <span class="stat-label">Maximum Midspan Deflection (δ = F·L³ / 48·E·I)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bm-res-stress" style="color:var(--green-dark); font-weight:700;">Max Bending Moment M = 31.25 kN·m | Max Bending Stress σ = 69.4 MPa</span>
            <span class="stat-label">Maximum Bending Moment & Outer Fiber Flexural Stress (σ = M·c / I)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('bm-f'), lEl = document.getElementById('bm-l');
  const eEl = document.getElementById('bm-e'), iEl = document.getElementById('bm-i'), cEl = document.getElementById('bm-c');
  const dfResEl = document.getElementById('bm-res-def'), stResEl = document.getElementById('bm-res-stress');

  function update() {
    const F_kN = parseFloat(fEl.value), L_m = parseFloat(lEl.value);
    const E_GPa = parseFloat(eEl.value), I_cm4 = parseFloat(iEl.value), c_mm = parseFloat(cEl.value);

    if (isNaN(F_kN) || isNaN(L_m) || isNaN(E_GPa) || isNaN(I_cm4) || isNaN(c_mm) || F_kN <= 0 || L_m <= 0 || E_GPa <= 0 || I_cm4 <= 0 || c_mm <= 0) return;

    const F_N = F_kN * 1000.0;
    const E_Pa = E_GPa * 1e9;
    const I_m4 = I_cm4 * 1e-8;
    const c_m = c_mm * 1e-3;

    // Midspan deflection: delta = F * L^3 / ( 48 * E * I )  [m -> mm]
    const delta_m = (F_N * Math.pow(L_m, 3)) / (48.0 * E_Pa * I_m4);
    const delta_mm = delta_m * 1000.0;
    const span_ratio = Math.round(L_m / delta_m);

    // Max bending moment: M = F * L / 4  [N*m -> kN*m]
    const M_Nm = (F_N * L_m) / 4.0;
    const M_kNm = M_Nm / 1000.0;

    // Max bending stress: sigma = M * c / I  [Pa -> MPa]
    const sigma_Pa = (M_Nm * c_m) / I_m4;
    const sigma_MPa = sigma_Pa / 1e6;

    dfResEl.textContent = 'Center Deflection δ = ' + delta_mm.toFixed(2) + ' mm (L / ' + span_ratio + ')';
    stResEl.textContent = 'Max Moment M = ' + M_kNm.toFixed(2) + ' kN·m | Max Stress σ = ' + sigma_MPa.toFixed(1) + ' MPa (I=' + I_cm4 + ' cm⁴)';
  }

  [fEl, lEl, eEl, iEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter concentrated midspan center point load F in kN.',
      'Enter simply supported beam clear span length L in meters.',
      'Enter Young\'s Modulus E in GPa and second moment of area I in $\text{cm}^4$.',
      'Enter distance from neutral axis to extreme outer fiber c in mm.',
      'Inspect center deflection $\delta$ in mm, span deflection ratio (e.g. L/691), and peak bending stress $\sigma$.'
    ],
    benefitTitle: 'Euler-Bernoulli Elastic Beam Theory',
    benefitContent: 'Standard structural engineering formulation for calculating beam stiffness and strength, ensuring commercial building floors meet deflection limits ($L/360$) and structural stress limits.',
    faqs: [{ q: 'What is Section Modulus S (or Z)?', a: 'Section modulus $S = I / c$ measures cross-sectional bending resistance; bending stress simplifies directly to $\sigma = M / S$.' }]
  },

  // 17. Shaft Torsional Shear Stress & Angle of Twist Calculator
  {
    slug: 'torsion-polar-moment-shear-stress-shaft-calculator',
    name: 'Shaft Torsion (τ = T·r / J) & Angle of Twist (θ = T·L / G·J) Calculator',
    description: 'Calculate circular driveshaft torsional shear stress τ in MPa (τ = T · r / J), angle of twist θ in degrees (θ = T · L / (G · J)), and polar moment of inertia J (J = π·D⁴ / 32) for rotating power transmission machinery.',
    category: 'Math',
    icon: 'text',
    keywords: ['shaft torsion calculator', 'torsional shear stress formula tau equals tr over j online', 'angle of twist degrees shaft calculator', 'polar moment of inertia circular shaft calculator', 'mechanical engineering machine design power transmission online'],
    order: 1276,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Torque T (N·m), Shaft Outer Diameter D (mm), Shaft Length L (m) & Shear Modulus G (GPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ts-t">Torque T (N·m)</label>
          <input class="tool-textarea" id="ts-t" type="number" step="50" value="500.0" placeholder="500.0 N·m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-d">Diameter D (mm)</label>
          <input class="tool-textarea" id="ts-d" type="number" step="5" value="40.0" placeholder="40.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-l">Length L (m)</label>
          <input class="tool-textarea" id="ts-l" type="number" step="0.5" value="1.5" placeholder="1.5 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ts-g">Modulus G (GPa)</label>
          <input class="tool-textarea" id="ts-g" type="number" step="5" value="77.0" placeholder="77.0 GPa (Steel)" />
        </div>
      </div>
      <div id="ts-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ts-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Max Shear τ = 39.8 MPa</span>
            <span class="stat-label">Maximum Surface Torsional Shear Stress (τ = 16·T / π·D³)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ts-res-theta" style="color:var(--green-dark); font-weight:700;">Angle of Twist θ = 2.21° (0.0386 rad) | Polar Inertia J = 25.13 cm⁴</span>
            <span class="stat-label">Elastic Torsional Deflection & Polar Moment of Inertia</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('ts-t'), dEl = document.getElementById('ts-d');
  const lEl = document.getElementById('ts-l'), gEl = document.getElementById('ts-g');
  const tuResEl = document.getElementById('ts-res-tau'), thResEl = document.getElementById('ts-res-theta');

  function update() {
    const T = parseFloat(tEl.value), D_mm = parseFloat(dEl.value);
    const L_m = parseFloat(lEl.value), G_GPa = parseFloat(gEl.value);

    if (isNaN(T) || isNaN(D_mm) || isNaN(L_m) || isNaN(G_GPa) || T <= 0 || D_mm <= 0 || L_m <= 0 || G_GPa <= 0) return;

    const D_m = D_mm * 1e-3;
    const r_m = D_m / 2.0;
    const G_Pa = G_GPa * 1e9;

    // Polar moment of inertia for solid circular shaft: J = pi * D^4 / 32  [m^4]
    const J_m4 = (Math.PI * Math.pow(D_m, 4)) / 32.0;
    const J_cm4 = J_m4 * 1e8;

    // Max surface shear stress: tau = T * r / J = 16 * T / (pi * D^3)  [Pa -> MPa]
    const tau_Pa = (T * r_m) / J_m4;
    const tau_MPa = tau_Pa / 1e6;

    // Angle of twist: theta = T * L / (G * J)  [rad -> deg]
    const theta_rad = (T * L_m) / (G_Pa * J_m4);
    const theta_deg = (theta_rad * 180.0) / Math.PI;

    tuResEl.textContent = 'Max Shear τ = ' + tau_MPa.toFixed(1) + ' MPa';
    thResEl.textContent = 'Angle of Twist θ = ' + theta_deg.toFixed(2) + '° (' + theta_rad.toFixed(4) + ' rad) | Polar J = ' + J_cm4.toFixed(2) + ' cm⁴';
  }

  [tEl, dEl, lEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter transmitted torsional moment (torque) T in $\text{N}\cdot\text{m}$.',
      'Enter circular shaft outer diameter D in mm.',
      'Enter shaft length L in meters.',
      'Enter material Shear Modulus (Modulus of Rigidity) G in GPa.',
      'Inspect maximum surface torsional shear stress $\tau$ and elastic angle of twist $\theta$.'
    ],
    benefitTitle: 'Circular Shaft Torsion Theory',
    benefitContent: 'Shear stress varies linearly from zero at the center to a maximum at the outer surface ($\tau \propto r$), guiding sizing of automotive driveshafts and industrial gearbox spindles.',
    faqs: [{ q: 'Why are hollow shafts more weight-efficient for torsion than solid shafts?', a: 'Material near the central core experiences near-zero shear stress; removing it in a hollow tube drastically cuts weight with minimal loss in torsional strength.' }]
  },

  // 18. Thin-Walled Pressure Vessel Hoop & Longitudinal Stress Calculator
  {
    slug: 'thin-walled-pressure-vessel-hoop-longitudinal-stress-calculator',
    name: 'Thin-Walled Pressure Vessel Stress (Hoop σ_h = P·r/t & Long σ_L = P·r/2t) Calculator',
    description: 'Calculate cylindrical and spherical thin-walled pressure vessel circumferential Hoop stress (σ_h = P·r / t), Longitudinal axial stress (σ_L = P·r / 2t), and minimum required wall thickness t (ASME Boiler & Pressure Vessel Code).',
    category: 'Science',
    icon: 'text',
    keywords: ['thin walled pressure vessel calculator', 'hoop stress formula pr over t online', 'longitudinal stress pressure vessel calculator', 'asme boiler pressure vessel wall thickness calculator', 'mechanical chemical engineering pressure vessels online'],
    order: 1277,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Internal Pressure P (bar), Vessel Inner Radius r (mm) & Wall Thickness t (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pv-p">Internal Press P (bar)</label>
          <input class="tool-textarea" id="pv-p" type="number" step="2" value="20.0" placeholder="20.0 bar (2.0 MPa)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-r">Radius r (mm)</label>
          <input class="tool-textarea" id="pv-r" type="number" step="50" value="500.0" placeholder="500.0 mm (1m Dia)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pv-t">Thickness t (mm)</label>
          <input class="tool-textarea" id="pv-t" type="number" step="1" value="10.0" placeholder="10.0 mm" />
        </div>
      </div>
      <div id="pv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pv-res-hoop" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Hoop Stress σ_h = 100.0 MPa</span>
            <span class="stat-label">Cylindrical Circumferential Hoop Stress (σ_h = P·r / t)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pv-res-long" style="color:var(--green-dark); font-weight:700;">Longitudinal σ_L = 50.0 MPa (Hoop stress is exactly 2× larger: r/t = 50.0 thin-walled ✓)</span>
            <span class="stat-label">Axial Longitudinal Stress & Thin-Wall Ratio (r/t ≥ 10)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('pv-p'), rEl = document.getElementById('pv-r'), tEl = document.getElementById('pv-t');
  const hpResEl = document.getElementById('pv-res-hoop'), lgResEl = document.getElementById('pv-res-long');

  function update() {
    const P_bar = parseFloat(pEl.value), r_mm = parseFloat(rEl.value), t_mm = parseFloat(tEl.value);
    if (isNaN(P_bar) || isNaN(r_mm) || isNaN(t_mm) || P_bar <= 0 || r_mm <= 0 || t_mm <= 0) return;

    // Convert bar to MPa: 1 bar = 0.1 MPa
    const P_MPa = P_bar * 0.1;

    // Hoop stress (circumferential): sigma_h = P * r / t  [MPa]
    const sigma_h = (P_MPa * r_mm) / t_mm;

    // Longitudinal stress (axial): sigma_L = P * r / (2 * t)  [MPa]
    const sigma_L = (P_MPa * r_mm) / (2.0 * t_mm);

    const r_over_t = r_mm / t_mm;

    hpResEl.textContent = 'Hoop Stress σ_h = ' + sigma_h.toFixed(1) + ' MPa';
    lgResEl.textContent = 'Longitudinal σ_L = ' + sigma_L.toFixed(1) + ' MPa | Spherical σ = ' + sigma_L.toFixed(1) + ' MPa (r/t = ' + r_over_t.toFixed(1) + (r_over_t >= 10 ? ' Thin-walled ✓' : ' Thick-walled: Use Lamé') + ')';
  }

  [pEl, rEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter internal fluid gauge pressure P in bar.',
      'Enter vessel inner radius r in mm.',
      'Enter wall thickness t in mm.',
      'Inspect circumferential Hoop stress $\sigma_h$ and axial Longitudinal stress $\sigma_L$.'
    ],
    benefitTitle: 'Thin-Walled Membrane Stress Theory',
    benefitContent: 'Hoop stress is exactly twice longitudinal stress ($\sigma_h = 2\sigma_L$), explaining why pressurized sausages and cylindrical boilers always burst along longitudinal seam splits.',
    faqs: [{ q: 'What is the thin-walled assumption limit?', a: 'The thin-walled assumption is valid when the radius-to-thickness ratio $r/t \ge 10$, where stress variation across the wall is under $5\%$.' }]
  },

  // 19. Thick-Walled Cylinder Lamé Equations Calculator
  {
    slug: 'thick-walled-cylinder-lame-equation-radial-hoop-stress-calculator',
    name: 'Thick-Walled Cylinder Lamé Equations (Radial σ_r & Hoop σ_θ Stress Distribution) Calculator',
    description: 'Calculate thick-walled hydraulic cylinder and gun barrel radial stress σ_r and tangential hoop stress σ_θ across cylinder wall thickness using Gabriel Lamé\'s exact elasticity equations.',
    category: 'Science',
    icon: 'text',
    keywords: ['lame equations calculator', 'thick walled cylinder stress distribution formula online', 'radial hoop stress hydraulic cylinder lame calculator', 'internal external pressure thick cylinder calculator', 'mechanical engineering solid mechanics pressure vessels online'],
    order: 1278,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Internal Pressure P_i (bar), Inner Radius r_i (mm) & Outer Radius r_o (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lm-pi">Internal P_i (bar)</label>
          <input class="tool-textarea" id="lm-pi" type="number" step="100" value="1000.0" placeholder="1000.0 bar (100 MPa)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-ri">Inner Radius r_i (mm)</label>
          <input class="tool-textarea" id="lm-ri" type="number" step="5" value="50.0" placeholder="50.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lm-ro">Outer Radius r_o (mm)</label>
          <input class="tool-textarea" id="lm-ro" type="number" step="10" value="100.0" placeholder="100.0 mm" />
        </div>
      </div>
      <div id="lm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lm-res-inner" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Inner Bore: σ_θ = +166.7 MPa | σ_r = -100.0 MPa</span>
            <span class="stat-label">Maximum Stresses at Critical Inner Surface (r = r_i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lm-res-outer" style="color:var(--green-dark); font-weight:700;">Outer Bore: σ_θ = +66.7 MPa | σ_r = 0.0 MPa (Stress concentration at inner bore)</span>
            <span class="stat-label">Stresses at Outer Boundary (r = r_o)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const piEl = document.getElementById('lm-pi'), riEl = document.getElementById('lm-ri'), roEl = document.getElementById('lm-ro');
  const inResEl = document.getElementById('lm-res-inner'), otResEl = document.getElementById('lm-res-outer');

  function update() {
    const Pi_bar = parseFloat(piEl.value), ri_mm = parseFloat(riEl.value), ro_mm = parseFloat(roEl.value);
    if (isNaN(Pi_bar) || isNaN(ri_mm) || isNaN(ro_mm) || Pi_bar <= 0 || ri_mm <= 0 || ro_mm <= ri_mm) return;

    // Convert bar to MPa: 1 bar = 0.1 MPa
    const Pi = Pi_bar * 0.1;

    const ri2 = Math.pow(ri_mm, 2);
    const ro2 = Math.pow(ro_mm, 2);
    const den = ro2 - ri2;

    // Lamé constants: A = (Pi * ri^2) / (ro^2 - ri^2), B = (Pi * ri^2 * ro^2) / (ro^2 - ri^2)
    const A = (Pi * ri2) / den;
    const B = (Pi * ri2 * ro2) / den;

    // At inner bore (r = ri):
    // sigma_theta_inner = A + B / ri^2 = Pi * (ro^2 + ri^2) / (ro^2 - ri^2)
    const sigma_theta_inner = (Pi * (ro2 + ri2)) / den;
    const sigma_r_inner = -Pi;

    // At outer surface (r = ro):
    // sigma_theta_outer = 2 * Pi * ri^2 / (ro^2 - ri^2)
    const sigma_theta_outer = (2.0 * Pi * ri2) / den;
    const sigma_r_outer = 0.0;

    inResEl.textContent = 'Inner Bore: σ_θ = +' + sigma_theta_inner.toFixed(1) + ' MPa | σ_r = -' + Pi.toFixed(1) + ' MPa';
    otResEl.textContent = 'Outer Surface: σ_θ = +' + sigma_theta_outer.toFixed(1) + ' MPa | σ_r = 0.0 MPa (Wall Thickness = ' + (ro_mm - ri_mm) + ' mm)';
  }

  [piEl, riEl, roEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter internal hydraulic/explosion fluid pressure $P_i$ in bar.',
      'Enter cylinder inner bore radius $r_i$ in mm.',
      'Enter cylinder outer radius $r_o$ in mm.',
      'Inspect maximum inner bore hoop tensile stress $\sigma_\theta$ and compressive radial stress $\sigma_r$.'
    ],
    benefitTitle: 'Gabriel Lamé 1852 Thick Cylinder Elasticity Solution',
    benefitContent: 'Solves the full 2D axisymmetrical Navier-Cauchy elasticity equations without thin-walled approximations, essential for high-pressure autoclaves ($P > 1000\text{ bar}$) and autofrettage cannon barrels.',
    faqs: [{ q: 'What is autofrettage in gun barrel manufacturing?', a: 'Pre-pressurizing the barrel to yield the inner bore creates residual compressive hoop stresses, dramatically increasing maximum operating pressure capacity.' }]
  },

  // 20. Goodman, Soderberg & Gerber Fatigue Life Calculator
  {
    slug: 'goodman-soderberg-gerber-fatigue-endurance-limit-calculator',
    name: 'Goodman, Soderberg & Gerber Mean Stress Fatigue Endurance Limit Calculator',
    description: 'Calculate fluctuating mean stress fatigue design safety factors (Goodman: σ_a/S_e + σ_m/S_ut = 1, Soderberg: σ_a/S_e + σ_m/S_y = 1, and Gerber parabola) for cyclical machine components.',
    category: 'Math',
    icon: 'text',
    keywords: ['goodman fatigue calculator', 'soderberg gerber mean stress fatigue formula online', 'fluctuating stress amplitude endurance limit calculator', 'fatigue safety factor alternating stress calculator', 'mechanical design machine elements fatigue online'],
    order: 1279,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Alternating Stress σ_a (MPa), Mean Stress σ_m (MPa), Endurance Limit S_e (MPa) & Ultimate S_ut (MPa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gm-sa">Alternating σ_a</label>
          <input class="tool-textarea" id="gm-sa" type="number" step="25" value="120.0" placeholder="120.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-sm">Mean Stress σ_m</label>
          <input class="tool-textarea" id="gm-sm" type="number" step="25" value="100.0" placeholder="100.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-se">Endurance S_e</label>
          <input class="tool-textarea" id="gm-se" type="number" step="25" value="250.0" placeholder="250.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gm-sut">Ultimate S_ut</label>
          <input class="tool-textarea" id="gm-sut" type="number" step="50" value="600.0" placeholder="600.0 MPa" />
        </div>
      </div>
      <div id="gm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gm-res-goodman" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Modified Goodman Factor N = 1.55 (SAFE)</span>
            <span class="stat-label">Goodman Design Safety Factor (1 / (σ_a/S_e + σ_m/S_ut))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gm-res-comp" style="color:var(--green-dark); font-weight:700;">Gerber Factor N = 1.97 | Soderberg (Conservative) N = 1.37 | Infinite Fatigue Life ✓</span>
            <span class="stat-label">Comparative Multi-Criterion Fatigue Safety Factors</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const saEl = document.getElementById('gm-sa'), smEl = document.getElementById('gm-sm');
  const seEl = document.getElementById('gm-se'), sutEl = document.getElementById('gm-sut');
  const gdResEl = document.getElementById('gm-res-goodman'), cpResEl = document.getElementById('gm-res-comp');

  function update() {
    const sigma_a = parseFloat(saEl.value), sigma_m = parseFloat(smEl.value);
    const Se = parseFloat(seEl.value), Sut = parseFloat(sutEl.value);

    if (isNaN(sigma_a) || isNaN(sigma_m) || isNaN(Se) || isNaN(Sut) || sigma_a < 0 || Se <= 0 || Sut <= 0) return;

    // Modified Goodman factor: 1 / n = (sigma_a / Se) + (sigma_m / Sut)
    const goodman_denom = (sigma_a / Se) + (sigma_m / Sut);
    const n_goodman = goodman_denom > 0 ? 1.0 / goodman_denom : 1.0;

    // Soderberg factor using Sy approx 0.8 * Sut:
    const Sy = 0.8 * Sut;
    const soderberg_denom = (sigma_a / Se) + (sigma_m / Sy);
    const n_soderberg = soderberg_denom > 0 ? 1.0 / soderberg_denom : 1.0;

    // Gerber factor: 1/n = (sigma_a / Se) + (sigma_m / Sut)^2 -> Solve quadratic for n:
    // n * (sigma_a / Se) + n^2 * (sigma_m / Sut)^2 = 1
    let n_gerber = 1.0;
    const A = Math.pow(sigma_m / Sut, 2);
    const B = sigma_a / Se;
    if (A > 0) {
      n_gerber = (-B + Math.sqrt(Math.pow(B, 2) + 4.0 * A)) / (2.0 * A);
    } else if (B > 0) {
      n_gerber = 1.0 / B;
    }

    gdResEl.textContent = 'Goodman Factor N = ' + n_goodman.toFixed(2) + ' (' + (n_goodman >= 1.0 ? 'SAFE ✓' : 'FATIGUE FAILURE ✗') + ')';
    gdResEl.style.color = n_goodman >= 1.0 ? '#22543d' : '#c53030';
    cpResEl.textContent = 'Gerber N = ' + n_gerber.toFixed(2) + ' | Soderberg N = ' + n_soderberg.toFixed(2) + ' (σ_a = ' + sigma_a + ' MPa, σ_m = ' + sigma_m + ' MPa)';
  }

  [saEl, smEl, seEl, sutEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter alternating stress amplitude $\sigma_a = (\sigma_{\max} - \sigma_{\min})/2$ in MPa.',
      'Enter mean static stress $\sigma_m = (\sigma_{\max} + \sigma_{\min})/2$ in MPa.',
      'Enter fully reversed endurance limit $S_e$ in MPa.',
      'Enter ultimate tensile strength $S_{ut}$ in MPa.',
      'Inspect Goodman, Soderberg, and Gerber fatigue life safety factors.'
    ],
    benefitTitle: 'John Goodman 1899 Mean Stress Fatigue Standard',
    benefitContent: 'Quantifies how steady tensile mean stresses lower cyclic fatigue endurance limits, providing the universal standard for crankshaft and aircraft engine design.',
    faqs: [{ q: 'What is the effect of compressive mean stress on fatigue life?', a: 'Compressive mean stress ($\sigma_m < 0$) closes microcracks and substantially INCREASES fatigue endurance life.' }]
  },

  // 21. Ramberg-Osgood Stress-Strain Plasticity Curve Calculator
  {
    slug: 'ramberg-osgood-nonlinear-stress-strain-plasticity-calculator',
    name: 'Ramberg-Osgood Nonlinear Stress-Strain Plasticity Curve (ε = σ/E + 0.002·(σ/σ₀)ⁿ) Calculator',
    description: 'Calculate nonlinear elastic-plastic true total strain ε (epsilon = σ/E + 0.002 · (σ / σ₀)^n), elastic strain, plastic offset strain, and tangent modulus E_t using the Ramberg-Osgood constitutive model.',
    category: 'Math',
    icon: 'text',
    keywords: ['ramberg osgood calculator', 'nonlinear stress strain curve formula online', 'plasticity strain hardening exponent n calculator', 'tangent modulus ramberg osgood plastic deformation calculator', 'finite element analysis solid mechanics materials science online'],
    order: 1280,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Stress σ (MPa), Yield Strength σ₀ (MPa), Young\'s Modulus E (GPa) & Hardening Exponent n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ro-s">Stress σ (MPa)</label>
          <input class="tool-textarea" id="ro-s" type="number" step="25" value="320.0" placeholder="320.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-s0">Yield σ₀ (MPa)</label>
          <input class="tool-textarea" id="ro-s0" type="number" step="25" value="300.0" placeholder="300.0 MPa (0.2% Offset)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-e">Modulus E (GPa)</label>
          <input class="tool-textarea" id="ro-e" type="number" step="10" value="200.0" placeholder="200.0 GPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ro-n">Hardening n</label>
          <input class="tool-textarea" id="ro-n" type="number" step="1" value="8.0" placeholder="8.0 (Austenitic Steel)" />
        </div>
      </div>
      <div id="ro-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ro-res-eps" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Strain ε = 0.496% (4,957 με)</span>
            <span class="stat-label">Ramberg-Osgood Total True Strain (Elastic + Plastic)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ro-res-parts" style="color:var(--green-dark); font-weight:700;">Elastic ε_e = 0.160% | Plastic Offset ε_p = 0.336% (Exceeds 0.2% yield offset ✓)</span>
            <span class="stat-label">Elastic vs Plastic Strain Breakdown</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sEl = document.getElementById('ro-s'), s0El = document.getElementById('ro-s0');
  const eEl = document.getElementById('ro-e'), nEl = document.getElementById('ro-n');
  const epResEl = document.getElementById('ro-res-eps'), ptResEl = document.getElementById('ro-res-parts');

  function update() {
    const sigma = parseFloat(sEl.value), sigma_0 = parseFloat(s0El.value);
    const E_GPa = parseFloat(eEl.value), n = parseFloat(nEl.value);

    if (isNaN(sigma) || isNaN(sigma_0) || isNaN(E_GPa) || isNaN(n) || sigma < 0 || sigma_0 <= 0 || E_GPa <= 0 || n <= 0) return;

    const E_MPa = E_GPa * 1000.0;

    // Elastic strain: eps_e = sigma / E
    const eps_e = sigma / E_MPa;

    // Plastic strain: eps_p = 0.002 * ( sigma / sigma_0 )^n
    const eps_p = 0.002 * Math.pow(sigma / sigma_0, n);

    // Total strain: eps_total = eps_e + eps_p
    const eps_total = eps_e + eps_p;

    const eps_total_pct = eps_total * 100.0;
    const eps_micro = Math.round(eps_total * 1e6);

    epResEl.textContent = 'Total Strain ε = ' + eps_total_pct.toFixed(3) + '% (' + eps_micro.toLocaleString() + ' με)';
    ptResEl.textContent = 'Elastic = ' + (eps_e * 100).toFixed(3) + '% | Plastic = ' + (eps_p * 100).toFixed(3) + '% (' + (sigma >= sigma_0 ? 'In Plastic Regime' : 'Predominantly Elastic') + ' @ n=' + n + ')';
  }

  [sEl, s0El, eEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied stress $\sigma$ in MPa.',
      'Enter material $0.2\%$ offset yield strength $\sigma_0$ in MPa.',
      'Enter Young\'s Elastic Modulus E in GPa.',
      'Enter strain-hardening exponent n.',
      'Inspect total true strain $\epsilon$, elastic strain $\epsilon_e$, and plastic strain $\epsilon_p$.'
    ],
    benefitTitle: 'Walter Ramberg & William R. Osgood 1943 Constitutive Law',
    benefitContent: 'Smoothly connects linear elastic behavior to nonlinear strain hardening without artificial sharp yield discontinuities, serving as the standard input for nonlinear Finite Element Analysis (FEA) crashworthiness simulations.',
    faqs: [{ q: 'What is the physical meaning of parameter 0.002 in the equation?', a: '$0.002$ ($0.2\%$) corresponds exactly to the standard engineering definition of yield strength offset strain.' }]
  },

  // 22. Taylor Hardening Flow Stress & Dislocation Density Calculator
  {
    slug: 'dislocation-density-taylor-hardening-flow-stress-calculator',
    name: 'Taylor Hardening Flow Stress & Dislocation Density (Δτ = α·G·b·√ρ) Calculator',
    description: 'Calculate work hardening flow stress increase Δτ in MPa (Δτ = α · G · b · √ρ) and required dislocation density ρ (lines/m²) from forest dislocation forest cutting and Taylor hardening interactions.',
    category: 'Science',
    icon: 'text',
    keywords: ['taylor hardening calculator', 'dislocation density flow stress formula delta tau equals alpha g b sqrt rho online', 'forest dislocation work hardening calculator', 'burgers vector shear modulus flow stress calculator', 'materials science dislocation mechanics crystal plasticity online'],
    order: 1281,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Dislocation Density ρ (m⁻²), Shear Modulus G (GPa), Burgers Vector b (nm) & Constant α (0.1 to 0.5)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="th-rho">Density ρ (m⁻²)</label>
          <input class="tool-textarea" id="th-rho" type="number" step="1e14" value="1.0e15" placeholder="1.0 × 10¹⁵ m⁻² (Cold Worked)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-g">Shear G (GPa)</label>
          <input class="tool-textarea" id="th-g" type="number" step="5" value="45.0" placeholder="45.0 GPa (Copper)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-b">Burgers b (nm)</label>
          <input class="tool-textarea" id="th-b" type="number" step="0.01" value="0.256" placeholder="0.256 nm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-alpha">Constant α</label>
          <input class="tool-textarea" id="th-alpha" type="number" step="0.05" value="0.30" placeholder="0.30" />
        </div>
      </div>
      <div id="th-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="th-res-dtau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Hardening Δτ = 109.3 MPa</span>
            <span class="stat-label">Taylor Dislocation Flow Stress Increase (Δτ = α·G·b·√ρ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="th-res-dist" style="color:var(--green-dark); font-weight:700;">Dislocation Spacing l ≈ 31.6 nm (1/√ρ) | Tensile Δσ ≈ 334.6 MPa (Taylor M = 3.06)</span>
            <span class="stat-label">Average Dislocation Spacing & Polycrystalline Tensile Yield Increase</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rhoEl = document.getElementById('th-rho'), gEl = document.getElementById('th-g');
  const bEl = document.getElementById('th-b'), alEl = document.getElementById('th-alpha');
  const dtResEl = document.getElementById('th-res-dtau'), dsResEl = document.getElementById('th-res-dist');

  function update() {
    const rho = parseFloat(rhoEl.value), G_GPa = parseFloat(gEl.value);
    const b_nm = parseFloat(bEl.value), alpha = parseFloat(alEl.value);

    if (isNaN(rho) || isNaN(G_GPa) || isNaN(b_nm) || isNaN(alpha) || rho <= 0 || G_GPa <= 0 || b_nm <= 0 || alpha <= 0) return;

    const G_Pa = G_GPa * 1e9;
    const b_m = b_nm * 1e-9;

    // Taylor equation: Delta_tau = alpha * G * b * sqrt(rho)  [Pa -> MPa]
    const delta_tau_Pa = alpha * G_Pa * b_m * Math.sqrt(rho);
    const delta_tau_MPa = delta_tau_Pa / 1e6;

    // Dislocation spacing: l = 1 / sqrt(rho)  [m -> nm]
    const spacing_nm = (1.0 / Math.sqrt(rho)) * 1e9;

    // Polycrystalline tensile increase via Taylor factor M = 3.06 (FCC):
    const delta_sigma_MPa = 3.06 * delta_tau_MPa;

    dtResEl.textContent = 'Hardening Δτ = ' + delta_tau_MPa.toFixed(1) + ' MPa';
    dsResEl.textContent = 'Spacing l ≈ ' + spacing_nm.toFixed(1) + ' nm | Polycrystalline Δσ ≈ ' + delta_sigma_MPa.toFixed(1) + ' MPa (ρ = ' + rho.toExponential(1) + ' m⁻²)';
  }

  [rhoEl, gEl, bEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter dislocation line density $\rho$ in $\text{m}^{-2}$ (typically $10^{10}\text{ m}^{-2}$ annealed, $10^{15}\text{ m}^{-2}$ cold worked).',
      'Enter material Shear Modulus G in GPa.',
      'Enter Burgers vector length b in nm.',
      'Enter interaction geometric parameter $\alpha$ (typically 0.2–0.4).',
      'Inspect work hardening resolved shear stress increase $\Delta\tau$ and average dislocation spacing.'
    ],
    benefitTitle: 'Sir Geoffrey Ingram Taylor 1934 Dislocation Hardening Model',
    benefitContent: 'Explains why metals become harder as they are plastically deformed (work hardening): intersecting dislocation tangles create mutual elastic repulsive stress fields proportional to $\sqrt{\rho}$.',
    faqs: [{ q: 'What is the Burgers vector b?', a: 'The Burgers vector represents the magnitude and direction of atomic lattice distortion resulting from dislocation slip.' }]
  },

  // 23. Soret Effect Thermodiffusion Gradient Calculator
  {
    slug: 'soret-effect-thermodiffusion-concentration-gradient-calculator',
    name: 'Soret Effect Thermodiffusion Steady-State Concentration Gradient Calculator',
    description: 'Calculate thermal diffusion concentration separation gradients (∇C = -S_T · C · (1 - C) · ∇T) and Soret coefficient S_T (K⁻¹) for isotope separation, polymer thermophoresis, and magmatic petrology.',
    category: 'Science',
    icon: 'text',
    keywords: ['soret effect calculator', 'thermodiffusion concentration gradient formula online', 'soret coefficient st calculator thermophoresis', 'thermal diffusion separation ludwig soret calculator', 'physical chemistry transport phenomena thermodynamics online'],
    order: 1282,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mean Concentration C (0 to 1), Temperature Gradient ∇T (K/m) & Soret Coefficient S_T (K⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="se-c">Conc C (Mole Frac)</label>
          <input class="tool-textarea" id="se-c" type="number" step="0.05" min="0.01" max="0.99" value="0.50" placeholder="0.50 (Equimolar)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="se-gradt">Grad ∇T (K/mm)</label>
          <input class="tool-textarea" id="se-gradt" type="number" step="0.5" value="2.0" placeholder="2.0 K/mm (2000 K/m)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="se-st">Soret S_T (K⁻¹)</label>
          <input class="tool-textarea" id="se-st" type="number" step="1e-3" value="5.0e-3" placeholder="0.005 K⁻¹" />
        </div>
      </div>
      <div id="se-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="se-res-gradc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">∇C = -2.50 % / mm (-25.0 m⁻¹)</span>
            <span class="stat-label">Steady-State Thermal Separation Concentration Gradient (∇C = -S_T·C·(1-C)·∇T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="se-res-therm" style="color:var(--green-dark); font-weight:700;">THERMOPHOBIC: Solute migrates from hot to cold (ΔC = 2.5% per 1 mm gap)</span>
            <span class="stat-label">Thermophoretic Migration Direction & Separation Magnitude</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('se-c'), gtEl = document.getElementById('se-gradt'), stEl = document.getElementById('se-st');
  const gcResEl = document.getElementById('se-res-gradc'), thResEl = document.getElementById('se-res-therm');

  function update() {
    const C = parseFloat(cEl.value), gradT_K_mm = parseFloat(gtEl.value), S_T = parseFloat(stEl.value);
    if (isNaN(C) || isNaN(gradT_K_mm) || isNaN(S_T) || C <= 0 || C >= 1) return;

    // grad C per mm = - S_T * C * (1 - C) * gradT_K_mm
    const gradC_per_mm = -S_T * C * (1.0 - C) * gradT_K_mm;
    const gradC_pct_mm = gradC_per_mm * 100.0;

    let dir = '';
    if (S_T > 0) dir = 'THERMOPHOBIC: Solute migrates toward the COLD boundary';
    else if (S_T < 0) dir = 'THERMOPHILIC: Solute migrates toward the HOT boundary';
    else dir = 'NO THERMAL DIFFUSION (S_T = 0)';

    gcResEl.textContent = '∇C = ' + (gradC_pct_mm >= 0 ? '+' : '') + gradC_pct_mm.toFixed(2) + ' % / mm';
    thResEl.textContent = dir + ' [S_T = ' + S_T + ' K⁻¹ @ ∇T = ' + gradT_K_mm + ' K/mm]';
  }

  [cEl, gtEl, stEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mean mixture composition mole fraction C.',
      'Enter applied thermal temperature gradient $\nabla T$ in K/mm.',
      'Enter Soret thermodiffusion coefficient $S_T$ in $\text{K}^{-1}$.',
      'Inspect steady-state concentration separation gradient $\nabla C$ and thermophoretic migration direction.'
    ],
    benefitTitle: 'Carl Ludwig 1856 & Charles Soret 1879 Thermal Diffusion Law',
    benefitContent: 'Quantifies mass transport driven purely by temperature gradients ($J = -\rho D_T C (1-C)\nabla T$), used for microfluidic biomolecule thermophoresis and uranium isotope gas centrifugation.',
    faqs: [{ q: 'What is the Ludwig-Soret vs Dufour effect?', a: 'The Soret effect is mass diffusion driven by a temperature gradient; the inverse Dufour effect is heat flux driven by a concentration gradient.' }]
  },

  // 24. Superplastic Forming Strain Rate Sensitivity Calculator
  {
    slug: 'superplastic-forming-strain-rate-sensitivity-m-calculator',
    name: 'Superplastic Forming Strain Rate Sensitivity (m = d ln σ / d ln ε̇) Calculator',
    description: 'Calculate high-temperature superplastic alloy strain rate sensitivity exponent m (m = ∂ ln σ / ∂ ln ε̇), flow stress σ (σ = K·ε̇ᵐ), and necking resistance for titanium and aluminum aerospace forming.',
    category: 'Science',
    icon: 'text',
    keywords: ['superplastic forming calculator', 'strain rate sensitivity m formula online', 'flow stress strain rate power law calculator', 'aerospace superplastic titanium forming calculator', 'metallurgy materials science manufacturing processes online'],
    order: 1283,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Strain Rates ε̇₁ & ε̇₂ (s⁻¹), Corresponding Flow Stresses σ₁ & σ₂ (MPa) & Target Rate ε̇',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-ed1">Rate ε̇₁ (s⁻¹)</label>
          <input class="tool-textarea" id="sp-ed1" type="number" step="1e-4" value="1.0e-4" placeholder="1.0 × 10⁻⁴ s⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-s1">Stress σ₁ (MPa)</label>
          <input class="tool-textarea" id="sp-s1" type="number" step="5" value="15.0" placeholder="15.0 MPa" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-ed2">Rate ε̇₂ (s⁻¹)</label>
          <input class="tool-textarea" id="sp-ed2" type="number" step="1e-3" value="1.0e-3" placeholder="1.0 × 10⁻³ s⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-s2">Stress σ₂ (MPa)</label>
          <input class="tool-textarea" id="sp-s2" type="number" step="5" value="45.0" placeholder="45.0 MPa" />
        </div>
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-m" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Sensitivity m = 0.477 (SUPERPLASTIC REGIME)</span>
            <span class="stat-label">Strain Rate Sensitivity Exponent (m = ln(σ₂/σ₁) / ln(ε̇₂/ε̇₁))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-elong" style="color:var(--green-dark); font-weight:700;">EXPECTED ELONGATION > 800% (High resistance to localized necking failure ✓)</span>
            <span class="stat-label">Tensile Ductility & Superplastic Necking Resistance</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ed1El = document.getElementById('sp-ed1'), s1El = document.getElementById('sp-s1');
  const ed2El = document.getElementById('sp-ed2'), s2El = document.getElementById('sp-s2');
  const mResEl = document.getElementById('sp-res-m'), elResEl = document.getElementById('sp-res-elong');

  function update() {
    const ed1 = parseFloat(ed1El.value), s1 = parseFloat(s1El.value);
    const ed2 = parseFloat(ed2El.value), s2 = parseFloat(s2El.value);

    if (isNaN(ed1) || isNaN(s1) || isNaN(ed2) || isNaN(s2) || ed1 <= 0 || s1 <= 0 || ed2 <= 0 || s2 <= 0 || ed1 === ed2) return;

    // m = ln(s2 / s1) / ln(ed2 / ed1)
    const m = Math.log(s2 / s1) / Math.log(ed2 / ed1);

    let regime = '', elong = '', color = '#22543d';
    if (m >= 0.40) {
      regime = 'SUPERPLASTIC (m ≥ 0.40: Grain boundary sliding dominant)';
      elong = 'SUPERPLASTIC ELONGATION > 500% - 1500% (Extremely high necking resistance)';
      color = '#22543d';
    } else if (m >= 0.20) {
      regime = 'DISLOCATION CREEP (m = 0.2 - 0.39)';
      elong = 'MODERATE DUCTILITY (100% - 300% Elongation)';
      color = '#ea580c';
    } else {
      regime = 'CONVENTIONAL FORMING (m < 0.20)';
      elong = 'EARLY NECKING FAILURE (< 50% Elongation)';
      color = '#c53030';
    }

    mResEl.textContent = 'Sensitivity m = ' + m.toFixed(3);
    mResEl.style.color = color;
    elResEl.textContent = elong + ' [' + regime.split(' (')[0] + ']';
    elResEl.style.color = color;
  }

  [ed1El, s1El, ed2El, s2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter two distinct test strain rates $\dot{\epsilon}_1$ and $\dot{\epsilon}_2$ in $\text{s}^{-1}$.',
      'Enter corresponding measured flow stresses $\sigma_1$ and $\sigma_2$ in MPa.',
      'Inspect strain rate sensitivity exponent m and predict superplastic tensile elongation.'
    ],
    benefitTitle: 'Superplastic Forming & Diffusion Bonding (SPF/DB)',
    benefitContent: 'When $m > 0.40$, local necking triggers immediate strain-rate hardening, forcing deformation to redistribute uniformly across the entire workpiece to achieve $> 1000\%$ tensile elongation in Ti-6Al-4V aerospace panels.',
    faqs: [{ q: 'What microstructure is required for superplasticity?', a: 'An ultra-fine equiaxed grain size ($d < 10\ \mu\text{m}$) and deformation at elevated temperatures ($T > 0.5\ T_m$).' }]
  },

  // 25. Pilling-Bedworth Ratio Metal Oxidation Passivation Calculator
  {
    slug: 'pilling-bedworth-ratio-metal-oxide-passivation-calculator',
    name: 'Pilling-Bedworth Ratio (PBR = M_ox·ρ_m / (n·M_m·ρ_ox)) Metal Oxidation Calculator',
    description: 'Calculate the Pilling-Bedworth Ratio (PBR = (M_ox · ρ_m) / (n · M_m · ρ_ox)) to predict whether high-temperature surface metal oxides form protective passivating films (1.0 ≤ PBR ≤ 2.0) vs porous or spalling scales.',
    category: 'Science',
    icon: 'text',
    keywords: ['pilling bedworth ratio calculator', 'pbr formula metal oxidation passivation online', 'protective oxide layer corrosion calculator', 'pilling bedworth rule high temperature oxidation calculator', 'materials science metallurgy corrosion engineering online'],
    order: 1284,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Oxide M_ox (g/mol) & Density ρ_ox (g/cm³), Metal M_m (g/mol), Density ρ_m (g/cm³) & Metal Atoms n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pb-mox">Oxide M_ox (g/mol)</label>
          <input class="tool-textarea" id="pb-mox" type="number" step="10" value="101.96" placeholder="101.96 (Al₂O₃)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-rhoox">Oxide ρ_ox (g/cm³)</label>
          <input class="tool-textarea" id="pb-rhoox" type="number" step="0.1" value="3.95" placeholder="3.95 g/cm³ (Alumina)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-mm">Metal M_m (g/mol)</label>
          <input class="tool-textarea" id="pb-mm" type="number" step="1" value="26.98" placeholder="26.98 (Al)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-rhom">Metal ρ_m (g/cm³)</label>
          <input class="tool-textarea" id="pb-rhom" type="number" step="0.1" value="2.70" placeholder="2.70 g/cm³ (Al)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pb-n">Metal Atoms n</label>
          <input class="tool-textarea" id="pb-n" type="number" step="1" value="2" placeholder="2 (2 Al per Al₂O₃)" />
        </div>
      </div>
      <div id="pb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pb-res-pbr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PBR = 1.288 (PROTECTIVE PASSIVATING OXIDE)</span>
            <span class="stat-label">Pilling-Bedworth Ratio (V_oxide / V_metal)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pb-res-eval" style="color:var(--green-dark); font-weight:700;">PASSIVATING SCALE (1.0 ≤ PBR ≤ 2.0: Continuous, adherent, self-healing oxide barrier)</span>
            <span class="stat-label">Oxide Layer Mechanical Integrity & Corrosion Protection</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const moxEl = document.getElementById('pb-mox'), rhooxEl = document.getElementById('pb-rhoox');
  const mmEl = document.getElementById('pb-mm'), rhomEl = document.getElementById('pb-rhom'), nEl = document.getElementById('pb-n');
  const pbrResEl = document.getElementById('pb-res-pbr'), evResEl = document.getElementById('pb-res-eval');

  function update() {
    const M_ox = parseFloat(moxEl.value), rho_ox = parseFloat(rhooxEl.value);
    const M_m = parseFloat(mmEl.value), rho_m = parseFloat(rhomEl.value), n = parseFloat(nEl.value);

    if (isNaN(M_ox) || isNaN(rho_ox) || isNaN(M_m) || isNaN(rho_m) || isNaN(n) || M_ox <= 0 || rho_ox <= 0 || M_m <= 0 || rho_m <= 0 || n <= 0) return;

    // PBR = ( M_ox * rho_m ) / ( n * M_m * rho_ox )
    const PBR = (M_ox * rho_m) / (n * M_m * rho_ox);

    let status = '', color = '#22543d';
    if (PBR >= 1.0 && PBR <= 2.0) {
      status = 'PROTECTIVE PASSIVATING FILM (1.0 ≤ PBR ≤ 2.0: Continuous, protective, adherent oxide)';
      color = '#22543d';
    } else if (PBR < 1.0) {
      status = 'POROUS / NON-PROTECTIVE (PBR < 1.0: Oxide volume insufficient, tensile cracks allow rapid oxidation, e.g. Mg, Na)';
      color = '#c53030';
    } else {
      status = 'COMPRESSIVE SPALLING / BUCKLING (PBR > 2.0: High compressive stresses cause oxide scale flaking, e.g. Fe, Cr)';
      color = '#ea580c';
    }

    pbrResEl.textContent = 'PBR = ' + PBR.toFixed(3);
    pbrResEl.style.color = color;
    evResEl.textContent = status;
    evResEl.style.color = color;
  }

  [moxEl, rhooxEl, mmEl, rhomEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter oxide molecular weight $M_{\text{ox}}$ in g/mol and oxide density $\rho_{\text{ox}}$ in $\text{g/cm}^3$.',
      'Enter metal atomic weight $M_m$ in g/mol and metal density $\rho_m$ in $\text{g/cm}^3$.',
      'Enter number of metal atoms per oxide formula unit n (e.g. 2 for $\text{Al}_2\text{O}_3$, 1 for $\text{TiO}_2$).',
      'Inspect Pilling-Bedworth Ratio (PBR) and assess oxide protective passivation integrity.'
    ],
    benefitTitle: 'N. B. Pilling & R. E. Bedworth 1923 Oxidation Standard',
    benefitContent: 'Compares the molar volume of metal oxide produced to the molar volume of metal consumed ($PBR = V_{\text{ox}} / V_m$); an optimal ratio ($1.0 \le PBR \le 2.0$) guarantees dense, non-porous passivation (Al, Ti, Ni).',
    faqs: [{ q: 'Why does magnesium burn and corrode rapidly in air despite forming an oxide?', a: 'Magnesium oxide has $PBR = 0.81 < 1.0$; the oxide cannot fully cover the underlying metal, leaving porous cracks for continuous oxygen ingress.' }]
  }
];

pack45Tools.forEach(createTool);
console.log('Pack 45 complete: ' + pack45Tools.length + ' tools created.');
