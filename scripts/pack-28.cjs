const { createTool } = require('./generate-curated-tools.cjs');

// Pack 28: 25 Tools covering Advanced Optics & Lasers, Chaos & Nonlinear Dynamics, Semiconductor Microelectronics, High-Voltage Dielectrics, Bioprocess Engineering (Tools 956 to 980)
const pack28Tools = [
  // --- Suite ZZZZZ: Advanced Optics, Laser Resonators & Interferometry (956 - 960) ---
  // 1. Fabry-Pérot Optical Cavity Finesse & Free Spectral Range Calculator
  {
    slug: 'fabry-perot-interferometer-finesse-free-spectral-range-calculator',
    name: 'Fabry-Pérot Optical Resonator Finesse (ℱ) & Free Spectral Range (FSR) Calculator',
    description: 'Calculate Fabry-Pérot optical cavity Free Spectral Range (FSR = c / (2·n·L)) in GHz and optical cavity finesse (ℱ = π·√R / (1 - R)) from mirror reflectivity R and cavity length L.',
    category: 'Science',
    icon: 'text',
    keywords: ['fabry perot calculator', 'optical cavity finesse formula script f equals pi sqrt r over 1 minus r', 'free spectral range fsr laser cavity calculator online', 'fabry perot interferometer resolution linewidth calculator', 'laser resonator mirror reflectivity online'],
    order: 837,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cavity Length L (mm), Mirror Reflectivity R (0 to 1.0) & Refractive Index n (1.0 for Air)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fp-len">Length L (mm)</label>
          <input class="tool-textarea" id="fp-len" type="number" step="any" value="10.0" placeholder="10.0 mm (1.0 cm Cavity)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fp-r">Reflectivity R</label>
          <input class="tool-textarea" id="fp-r" type="number" step="0.01" min="0.50" max="0.9999" value="0.95" placeholder="0.95 (95% Dielectric)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fp-n">Medium n</label>
          <input class="tool-textarea" id="fp-n" type="number" step="0.1" value="1.00" placeholder="1.00 (Vacuum/Air)" />
        </div>
      </div>
      <div id="fp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fp-res-fsr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">FSR = 14.99 GHz</span>
            <span class="stat-label">Free Spectral Range Optical Spacing (FSR = c / 2nL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fp-res-fin" style="font-weight:700;">Cavity Finesse ℱ = 61.2 | Linewidth Δν = 244.8 MHz (Q-Factor = 7.9 × 10⁶)</span>
            <span class="stat-label">Optical Cavity Finesse (ℱ) & Resonance Linewidth (FWHM)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('fp-len'), rEl = document.getElementById('fp-r'), nEl = document.getElementById('fp-n');
  const fsrResEl = document.getElementById('fp-res-fsr'), finResEl = document.getElementById('fp-res-fin');

  const c_light = 299792458; // m / s

  function update() {
    const L_mm = parseFloat(lEl.value), R = parseFloat(rEl.value), n_idx = parseFloat(nEl.value);
    if (isNaN(L_mm) || isNaN(R) || isNaN(n_idx) || L_mm <= 0 || R <= 0 || R >= 1.0 || n_idx <= 0) return;

    const L_m = L_mm * 1e-3;

    // Free Spectral Range FSR = c / ( 2 * n * L )  [Hz -> GHz]
    const FSR_hz = c_light / (2.0 * n_idx * L_m);
    const FSR_ghz = FSR_hz / 1e9;

    // Cavity finesse script F = ( pi * sqrt(R) ) / ( 1 - R )
    const Finesse = (Math.PI * Math.sqrt(R)) / (1.0 - R);

    // Resonance Full-Width at Half-Maximum linewidth delta_nu = FSR / Finesse  [MHz]
    const linewidth_hz = FSR_hz / Finesse;
    const linewidth_mhz = linewidth_hz / 1e6;

    // Photon cavity lifetime tau_c = 1 / ( 2 * pi * delta_nu )  [ns]
    const tau_c_ns = (1.0 / (2.0 * Math.PI * linewidth_hz)) * 1e9;

    fsrResEl.textContent = 'FSR = ' + FSR_ghz.toFixed(2) + ' GHz (Optical Spacing)';
    finResEl.textContent = 'Finesse ℱ = ' + Finesse.toFixed(1) + ' | Linewidth Δν = ' + linewidth_mhz.toFixed(1) + ' MHz (Photon Lifetime τ_c = ' + tau_c_ns.toFixed(2) + ' ns @ R = ' + (R*100).toFixed(1) + '%)';
  }

  [lEl, rEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Fabry-Pérot mirror separation spacing L in millimeters.',
      'Enter mirror dielectric coating power reflectivity R (0.50 to 0.9999).',
      'Enter intra-cavity medium refractive index n (1.0 for air/vacuum).',
      'Inspect Free Spectral Range (FSR) frequency spacing in GHz, cavity finesse $\mathcal{F}$, and resonant transmission linewidth Full-Width at Half-Maximum (FWHM) in MHz.'
    ],
    benefitTitle: 'Charles Fabry & Alfred Pérot 1899 Multiple-Beam Interferometry',
    benefitContent: 'Constructive multi-beam interference inside high-reflectivity Fabry-Pérot etalons ($\mathcal{F} = \frac{\pi\sqrt{R}}{1-R}$) narrows resonant transmission fringes to sub-megahertz linewidths, providing ultra-narrow spectral optical filters for laser wavelength stabilization and gravitational wave detectors (LIGO).',
    faqs: [{ q: 'What is the physical meaning of Optical Finesse (ℱ)?', a: 'Finesse represents the average number of back-and-forth round trips a photon bounces inside the optical cavity before escaping through the mirrors.' }]
  },

  // 2. Gaussian Laser Beam Waist, Rayleigh Range & Divergence Calculator
  {
    slug: 'gaussian-beam-waist-rayleigh-range-divergence-calculator',
    name: 'Gaussian Laser Beam Waist, Rayleigh Range (z_R) & Divergence (θ) Calculator',
    description: 'Calculate fundamental TEM₀₀ Gaussian laser beam Rayleigh range (z_R = π·w₀² / λ) in mm, far-field half-divergence angle (θ = λ / (π·w₀)) in mrad, and beam radius at distance z (w(z) = w₀·√(1 + (z/z_R)²)).',
    category: 'Science',
    icon: 'text',
    keywords: ['gaussian beam calculator', 'rayleigh range formula z_r equals pi w0 squared over lambda online', 'laser beam waist divergence angle calculator', 'gaussian beam radius at distance w of z calculator', 'optics laser spot size rayleigh length online'],
    order: 838,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Beam Waist Radius w₀ (μm), Wavelength λ (nm) & Propagation Distance z (meters)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gb-w0">Waist w₀ (μm)</label>
          <input class="tool-textarea" id="gb-w0" type="number" step="10" value="50.0" placeholder="50.0 μm (Focal Spot)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gb-lam">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="gb-lam" type="number" step="10" value="1064.0" placeholder="1064.0 nm (Nd:YAG Fiber)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gb-z">Distance z (m)</label>
          <input class="tool-textarea" id="gb-z" type="number" step="0.5" value="2.0" placeholder="2.0 m Target" />
        </div>
      </div>
      <div id="gb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gb-res-wz" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Spot w(2m) = 13.56 mm Radius</span>
            <span class="stat-label">Beam Radius at Distance z (w(z) = w₀·√(1 + (z/z_R)²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gb-res-div" style="font-weight:700;">Divergence θ = 6.77 mrad (0.388°) | Rayleigh Range z_R = 7.38 mm</span>
            <span class="stat-label">Far-Field Divergence Angle & Depth of Focus (2·z_R)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const w0El = document.getElementById('gb-w0'), lamEl = document.getElementById('gb-lam'), zEl = document.getElementById('gb-z');
  const wzResEl = document.getElementById('gb-res-wz'), divResEl = document.getElementById('gb-res-div');

  function update() {
    const w0_um = parseFloat(w0El.value), lam_nm = parseFloat(lamEl.value), z_m = parseFloat(zEl.value);
    if (isNaN(w0_um) || isNaN(lam_nm) || isNaN(z_m) || w0_um <= 0 || lam_nm <= 0 || z_m < 0) return;

    const w0_m = w0_um * 1e-6;
    const lam_m = lam_nm * 1e-9;

    // Rayleigh range z_R = ( pi * w0^2 ) / lambda  [meters]
    const z_R_m = (Math.PI * Math.pow(w0_m, 2)) / lam_m;
    const z_R_mm = z_R_m * 1000.0;

    // Far-field divergence half-angle theta = lambda / ( pi * w0 )  [radians -> mrad]
    const theta_rad = lam_m / (Math.PI * w0_m);
    const theta_mrad = theta_rad * 1000.0;
    const theta_deg = (theta_rad * 180.0) / Math.PI;

    // Beam radius at distance z: w(z) = w0 * sqrt( 1 + (z / z_R)^2 )  [meters -> mm]
    const wz_m = w0_m * Math.sqrt(1.0 + Math.pow(z_m / z_R_m, 2));
    const wz_mm = wz_m * 1000.0;
    const wz_um = wz_m * 1e6;

    wzResEl.textContent = 'Spot w(' + z_m + 'm) = ' + (wz_mm < 1.0 ? wz_um.toFixed(1) + ' μm' : wz_mm.toFixed(2) + ' mm Radius');
    divResEl.textContent = 'Half-Angle θ = ' + theta_mrad.toFixed(2) + ' mrad (' + theta_deg.toFixed(3) + '°) | Rayleigh Range z_R = ' + z_R_mm.toFixed(2) + ' mm (DOF = ' + (z_R_mm*2).toFixed(1) + ' mm)';
  }

  [w0El, lamEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter minimum beam waist focus radius $w_0$ in micrometers ($\mu\text{m}$).',
      'Enter laser emission wavelength $\lambda$ in nanometers (nm).',
      'Enter propagation distance z from beam waist in meters.',
      'Inspect spot size radius $w(z)$, Rayleigh collimation range $z_R$ (Depth of Focus $= 2 z_R$), and far-field diffraction divergence angle $\theta$.'
    ],
    benefitTitle: 'Paraxial Helmholtz Equation TEM₀₀ Spatial Profile',
    benefitContent: 'Diffraction dictates an inescapable trade-off: tightly focused laser spots ($w_0 < 10\ \mu\text{m}$) have immense optical intensity but short Rayleigh depths of focus ($z_R \propto w_0^2$), while collimated laser beams require large initial beam diameters to suppress far-field angular beam expansion ($\theta = \lambda / \pi w_0$).',
    faqs: [{ q: 'What is the definition of Rayleigh Range (zR)?', a: '$z_R$ is the distance from the waist where the beam cross-sectional area doubles and beam radius expands by $\sqrt{2} \approx 1.414 \times w_0$.' }]
  },

  // 3. Laser Diode Threshold Current (I_th) & Mirror Loss Calculator
  {
    slug: 'laser-diode-threshold-current-gain-calculator',
    name: 'Laser Diode Threshold Current (I_th) & Mirror Loss (α_m) Calculator',
    description: 'Calculate semiconductor edge-emitting laser diode threshold current (I_th = (e·V / (η_i·τ)) · n_th) in mA and cavity mirror reflection loss (α_m = (1 / 2L) · ln(1 / (R₁·R₂))) in cm⁻¹.',
    category: 'Science',
    icon: 'text',
    keywords: ['laser diode threshold current calculator', 'mirror loss formula alpha m equals 1 over 2l ln 1 over r1 r2', 'semiconductor laser threshold current density jth calculator', 'optical gain cavity loss laser threshold online', 'laser diode slope efficiency calculator online'],
    order: 839,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cavity Length L (μm), Cleaved Mirror Reflectivities (R₁, R₂), Internal Loss α_i (cm⁻¹) & Transparency n_tr',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ld-len">Cavity L (μm)</label>
          <input class="tool-textarea" id="ld-len" type="number" step="50" value="500.0" placeholder="500.0 μm (0.5 mm Chip)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-r1">Facet R₁</label>
          <input class="tool-textarea" id="ld-r1" type="number" step="0.05" value="0.32" placeholder="0.32 (Cleaved GaAs)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-r2">Facet R₂</label>
          <input class="tool-textarea" id="ld-r2" type="number" step="0.05" value="0.32" placeholder="0.32 (Cleaved GaAs)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ld-alphai">Internal α_i (cm⁻¹)</label>
          <input class="tool-textarea" id="ld-alphai" type="number" step="1" value="10.0" placeholder="10.0 cm⁻¹ (Scattering)" />
        </div>
      </div>
      <div id="ld-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ld-res-ith" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">I_th = 22.8 mA Threshold</span>
            <span class="stat-label">Lasing Threshold Injection Current (I_th)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ld-res-loss" style="font-weight:700;">Mirror Loss α_m = 22.8 cm⁻¹ | Total Threshold Gain g_th = 32.8 cm⁻¹</span>
            <span class="stat-label">Cavity Mirror Extraction Loss (α_m) & Required Threshold Gain</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('ld-len'), r1El = document.getElementById('ld-r1');
  const r2El = document.getElementById('ld-r2'), aiEl = document.getElementById('ld-alphai');
  const ithResEl = document.getElementById('ld-res-ith'), lsResEl = document.getElementById('ld-res-loss');

  function update() {
    const L_um = parseFloat(lEl.value), R1 = parseFloat(r1El.value);
    const R2 = parseFloat(r2El.value), alpha_i = parseFloat(aiEl.value);

    if (isNaN(L_um) || isNaN(R1) || isNaN(R2) || isNaN(alpha_i) || L_um <= 0 || R1 <= 0 || R2 <= 0 || R1 >= 1.0 || R2 >= 1.0) return;

    const L_cm = L_um * 1e-4; // um to cm

    // Mirror loss alpha_m = ( 1 / (2 * L_cm) ) * ln( 1 / (R1 * R2) )  [cm^-1]
    const alpha_m = (1.0 / (2.0 * L_cm)) * Math.log(1.0 / (R1 * R2));

    // Total threshold modal gain g_th = alpha_i + alpha_m  [cm^-1]
    const g_th = alpha_i + alpha_m;

    // Threshold current empirical scaling: I_th approx = (L_cm * W_cm) * J_th
    // Typical single-mode ridge waveguide (W = 3 um = 3e-4 cm):
    const W_cm = 3e-4;
    const J_0 = 400.0; // A / cm^2 transparency current density
    const J_th = J_0 + (g_th * 15.0); // A / cm^2
    const I_th_A = J_th * (L_cm * W_cm);
    const I_th_mA = I_th_A * 1000.0;

    ithResEl.textContent = 'I_th = ' + I_th_mA.toFixed(1) + ' mA Threshold Current';
    lsResEl.textContent = 'Mirror Loss α_m = ' + alpha_m.toFixed(1) + ' cm⁻¹ | Total Cavity Loss α_tot = ' + g_th.toFixed(1) + ' cm⁻¹ (L = ' + L_um + ' μm)';
  }

  [lEl, r1El, r2El, aiEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter semiconductor laser diode active cavity length L in micrometers ($\mu\text{m}$).',
      'Enter front and back cleaved facet power reflectivities $R_1$ and $R_2$ (typically 0.32 for as-cleaved semiconductor-air interfaces).',
      'Enter internal optical scattering absorption loss $\alpha_i$ in $\text{cm}^{-1}$.',
      'Inspect mirror extraction loss $\alpha_m$, total threshold modal optical gain $g_{\text{th}}$, and lasing threshold drive current $I_{\text{th}}$ in mA.'
    ],
    benefitTitle: 'Stimulated Emission Optical Round-Trip Gain Balance',
    benefitContent: 'Lasing threshold occurs when round-trip optical gain exactly balances cavity transmission losses ($\Gamma g_{\text{th}} = \alpha_i + \alpha_m$); below $I_{\text{th}}$ the device operates as a dim incoherent LED, while above $I_{\text{th}}$ stimulated emission dominates with high slope efficiency ($>0.8\text{ W/A}$).',
    faqs: [{ q: 'Why are High-Reflectivity (HR) coatings applied to the back facet?', a: 'Applying an HR dielectric coating ($R_2 \approx 95\%$) cuts mirror losses in half, lowering threshold current ($I_{\text{th}}$) and directing $>90\%$ of laser output power out the front facet.' }]
  },

  // 4. Photometry Inverse-Square Law & Illuminance (Lux to Foot-Candles) Calculator
  {
    slug: 'lux-to-foot-candles-inverse-square-photometry-calculator',
    name: 'Photometry Illuminance Inverse-Square Law (E = I·cos θ / d²) Calculator',
    description: 'Calculate lighting illuminance surface flux (E = (I · cos θ) / d²) in Lux (lumen/m²) and Foot-Candles (lumen/ft²) from luminous point source intensity I in Candela (cd) and distance d.',
    category: 'Science',
    icon: 'text',
    keywords: ['lux to foot candles calculator', 'inverse square law lighting illuminance formula e equals i over d squared online', 'photometry candela to lux distance calculator', 'lighting design foot candles to lux converter online', 'architectural lighting lux calculator'],
    order: 840,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Luminous Source Intensity I (Candela cd), Distance d (m or ft) & Incidence Tilt Angle θ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lux-i">Intensity I (cd)</label>
          <input class="tool-textarea" id="lux-i" type="number" step="100" value="1500.0" placeholder="1500.0 cd (Spotlight)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lux-d">Distance d (m)</label>
          <input class="tool-textarea" id="lux-d" type="number" step="any" value="2.0" placeholder="2.0 m Distance" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lux-th">Tilt Angle θ (°)</label>
          <input class="tool-textarea" id="lux-th" type="number" step="5" value="0.0" placeholder="0.0° (Perpendicular)" />
        </div>
      </div>
      <div id="lux-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lux-res-lux" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">375.0 Lux (34.8 fc)</span>
            <span class="stat-label">Surface Illuminance (Lux = lm/m² & Foot-Candles = lm/ft²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lux-res-rec" style="color:var(--green-dark); font-weight:700;">IESNA COMPLIANT: Standard Office Reading / Desk Workspace (300 - 500 Lux Recommended)</span>
            <span class="stat-label">Architectural Illuminance Standard Rating</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('lux-i'), dEl = document.getElementById('lux-d'), thEl = document.getElementById('lux-th');
  const lResEl = document.getElementById('lux-res-lux'), rResEl = document.getElementById('lux-res-rec');

  function update() {
    const I_cd = parseFloat(iEl.value), d_m = parseFloat(dEl.value), thetaDeg = parseFloat(thEl.value);
    if (isNaN(I_cd) || isNaN(d_m) || isNaN(thetaDeg) || I_cd <= 0 || d_m <= 0) return;

    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Illuminance in Lux E = ( I * cos(theta) ) / d^2  [lumens / m^2]
    const Lux = (I_cd * Math.cos(thetaRad)) / Math.pow(d_m, 2);

    // 1 Foot-Candle = 10.764 Lux => Foot-Candles = Lux / 10.764
    const FootCandles = Lux / 10.76391;

    let standard = '';
    let color = '#22543d';

    if (Lux < 100) {
      standard = 'CORRIDOR / AMBIENT LIGHT (50 - 100 Lux: Hallway & storage lighting)';
      color = '#d97706';
    } else if (Lux < 300) {
      standard = 'GENERAL LIVING / CASUAL WORK (150 - 300 Lux: Kitchen & dining area)';
      color = '#2563eb';
    } else if (Lux <= 750) {
      standard = 'OFFICE / DESK WORKSPACE (300 - 750 Lux: Standard IESNA reading & computer tasks)';
      color = '#22543d';
    } else if (Lux <= 1500) {
      standard = 'DETAILED INSPECTION (750 - 1,500 Lux: Precision assembly & drafting)';
      color = '#22543d';
    } else {
      standard = 'SURGICAL / HIGH PRECISION (>1,500 Lux: Operating rooms & fine electronics)';
      color = '#22543d';
    }

    lResEl.textContent = Lux.toFixed(1) + ' Lux (' + FootCandles.toFixed(1) + ' Foot-Candles)';
    rResEl.textContent = standard;
    rResEl.style.color = color;
  }

  [iEl, dEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter light source luminous intensity I in Candela (cd).',
      'Enter distance d from light source to illuminated surface plane in meters.',
      'Enter surface incidence tilt angle $\theta$ in degrees from normal ($0^\circ$ for perpendicular light beam).',
      'Inspect surface illuminance in Lux ($\text{lumen/m}^2$) and Foot-Candles ($\text{lumen/ft}^2$) and check IESNA architectural lighting compliance.'
    ],
    benefitTitle: 'Lambert\'s Cosine & Inverse-Square Photometric Law',
    benefitContent: 'Light spreads over the surface of an expanding sphere ($E \propto 1/d^2$); doubling the distance from a fixture quarters the illuminance, while tilting the surface reduces flux by $\cos\theta$, governing energy-efficient LED placement in architectural lighting designs.',
    faqs: [{ q: 'What is the conversion factor between Lux and Foot-Candles?', a: '$1\text{ Foot-Candle} = 10.764\text{ Lux}$ (since $1\text{ m}^2 = 10.764\text{ ft}^2$).' }]
  },

  // 5. Michelson Interferometer Fringe Shift & Gas Refractive Index Calculator
  {
    slug: 'michelson-interferometer-fringe-shift-refractive-index-calculator',
    name: 'Michelson Interferometer Fringe Shift (Δm) & Refractive Index (n) Calculator',
    description: 'Calculate Michelson interferometer fringe count shifts (Δm = 2·ΔL / λ) and gas index of refraction variations (n - 1 = Δm·λ / (2·L_cell)) from mirror displacement ΔL in nm/μm.',
    category: 'Science',
    icon: 'text',
    keywords: ['michelson interferometer calculator', 'fringe shift formula delta m equals 2 delta l over lambda online', 'gas refractive index michelson interferometer calculator', 'optical wavelength interference fringe counter online', 'precision laser interferometry displacement online'],
    order: 841,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Laser Wavelength λ (nm), Observed Fringe Count Shift Δm & Gas Cell Length L_cell (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mich-lam">Laser λ (nm)</label>
          <input class="tool-textarea" id="mich-lam" type="number" step="10" value="632.8" placeholder="632.8 nm (He-Ne Red)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mich-fringes">Fringe Shift Δm</label>
          <input class="tool-textarea" id="mich-fringes" type="number" step="1" value="45" placeholder="45 Fringes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mich-cell">Cell Length (cm)</label>
          <input class="tool-textarea" id="mich-cell" type="number" step="any" value="5.0" placeholder="5.0 cm Gas Cell" />
        </div>
      </div>
      <div id="mich-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mich-res-dl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Mirror ΔL = 14.238 μm</span>
            <span class="stat-label">Physical Mirror Displacement (ΔL = Δm · λ / 2)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mich-res-idx" style="font-weight:700;">Gas Index n = 1.000285 (Air Refractive Index Shift: Δn = 2.85 × 10⁻⁴)</span>
            <span class="stat-label">Measured Gas Refractive Index (Δn = Δm·λ / 2·L_cell)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('mich-lam'), frEl = document.getElementById('mich-fringes'), clEl = document.getElementById('mich-cell');
  const dlResEl = document.getElementById('mich-res-dl'), idxResEl = document.getElementById('mich-res-idx');

  function update() {
    const lamNm = parseFloat(lamEl.value), deltaM = parseFloat(frEl.value), cellCm = parseFloat(clEl.value);
    if (isNaN(lamNm) || isNaN(deltaM) || isNaN(cellCm) || lamNm <= 0 || deltaM <= 0 || cellCm <= 0) return;

    const lamM = lamNm * 1e-9;
    const cellM = cellCm * 1e-2;

    // Physical mirror displacement Delta_L = ( Delta_m * lambda ) / 2  [meters]
    const deltaL_m = (deltaM * lamM) / 2.0;
    const deltaL_um = deltaL_m * 1e6;

    // Gas refractive index difference: Delta_n = ( Delta_m * lambda ) / ( 2 * L_cell )
    const delta_n = (deltaM * lamM) / (2.0 * cellM);
    const n_gas = 1.0 + delta_n;

    dlResEl.textContent = 'Mirror ΔL = ' + deltaL_um.toFixed(3) + ' μm (' + (deltaL_m * 1e9).toFixed(1) + ' nm)';
    idxResEl.textContent = 'Gas n = ' + n_gas.toFixed(6) + ' (Δn = ' + delta_n.toExponential(3) + ' @ ' + cellCm + ' cm Cell Length, λ = ' + lamNm + ' nm)';
  }

  [lamEl, frEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser carrier wavelength $\lambda$ in nanometers (e.g. 632.8 nm for helium-neon red laser).',
      'Enter recorded interference bright/dark fringe count crossing shift $\Delta m$.',
      'Enter gas vacuum chamber cell optical path length in centimeters.',
      'Inspect precise sub-wavelength mirror displacement $\Delta L$ in $\mu\text{m}$ and calculated gas refractive index n.'
    ],
    benefitTitle: 'Albert Michelson & Edward Morley 1887 Interferometry',
    benefitContent: 'Because light traverses the interferometer arm twice in a round-trip, each single fringe shift represents exactly a half-wavelength displacement ($\Delta L = \lambda/2 \approx 316\text{ nm}$), delivering picometer-precision optical metrology and disproving the luminiferous aether.',
    faqs: [{ q: 'Why is a compensator glass plate placed in the reference arm?', a: 'To equalize the optical glass thickness traversed by both split beams, ensuring white-light interference fringes remain in zero dispersion phase.' }]
  },

  // --- Suite AAAAAA: Nonlinear Dynamics, Chaos Theory & Complex Systems (961 - 965) ---
  // 6. Maximal Lyapunov Exponent (λ) Chaos Divergence Calculator
  {
    slug: 'lyapunov-exponent-chaos-divergence-calculator',
    name: 'Maximal Lyapunov Exponent (λ) & Chaotic Horizon Calculator',
    description: 'Calculate nonlinear dynamical system trajectory separation (δZ(t) = δZ₀ · exp[λ · t]) and predict Lyapunov Predictability Horizon time (t_horizon = (1 / λ) · ln(ε / δZ₀)) for chaotic systems.',
    category: 'Science',
    icon: 'text',
    keywords: ['lyapunov exponent calculator', 'chaotic divergence formula lambda equals 1 over t ln delta z over delta z0', 'predictability horizon lyapunov time calculator online', 'butterfly effect chaotic trajectory divergence calculator', 'lorenz system lyapunov exponent online'],
    order: 842,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Maximal Lyapunov Exponent λ (s⁻¹ or day⁻¹), Initial Perturbation δZ₀ & Tolerance Limit ε',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ly-lam">Lyapunov λ (s⁻¹)</label>
          <input class="tool-textarea" id="ly-lam" type="number" step="any" value="0.9056" placeholder="0.9056 (Lorenz Attractor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ly-z0">Initial Error δZ₀</label>
          <input class="tool-textarea" id="ly-z0" type="number" step="any" value="1.0e-6" placeholder="1.0e-6 (Microscopic Error)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ly-eps">Tolerance ε</label>
          <input class="tool-textarea" id="ly-eps" type="number" step="any" value="1.0" placeholder="1.0 (Macroscopic Failure)" />
        </div>
      </div>
      <div id="ly-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ly-res-horiz" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">t_horizon = 15.26 Time Units</span>
            <span class="stat-label">Lyapunov Predictability Horizon Time (t_horizon)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ly-res-e-fold" style="color:var(--green-dark); font-weight:700;">CHAOTIC DYNAMICS (λ = +0.906 > 0: e-Folding Doubling Time τ = 1.10 s | Butterfly Effect)</span>
            <span class="stat-label">Dynamical Classification & Error e-Folding Time (τ = 1/λ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('ly-lam'), z0El = document.getElementById('ly-z0'), epsEl = document.getElementById('ly-eps');
  const hResEl = document.getElementById('ly-res-horiz'), efResEl = document.getElementById('ly-res-e-fold');

  function update() {
    const lambda = parseFloat(lamEl.value), deltaZ0 = parseFloat(z0El.value), epsilon = parseFloat(epsEl.value);
    if (isNaN(lambda) || isNaN(deltaZ0) || isNaN(epsilon) || deltaZ0 <= 0 || epsilon <= deltaZ0) return;

    // Characteristic e-folding time tau = 1 / lambda
    const tau_efold = lambda > 0 ? 1.0 / lambda : 0;

    // Lyapunov prediction horizon time: t_horizon = (1 / lambda) * ln( epsilon / deltaZ0 )
    let t_horizon = 0;
    let status = '';
    let color = '#22543d';

    if (lambda > 0) {
      t_horizon = (1.0 / lambda) * Math.log(epsilon / deltaZ0);
      status = 'DETERMINISTIC CHAOS (λ = +' + lambda.toFixed(3) + ' > 0: Exponential trajectory divergence | e-folding τ = ' + tau_efold.toFixed(2) + ' time units)';
      color = '#22543d';
    } else if (Math.abs(lambda) < 1e-4) {
      status = 'MARGINAL / CONSERVATIVE (λ = 0: Trajectories separate linearly, non-chaotic limit cycle)';
      color = '#2563eb';
    } else {
      status = 'STABLE ATTRACTOR (λ < 0: Perturbations contract exponentially to a point fixed attractor)';
      color = '#4b5563';
    }

    hResEl.textContent = lambda > 0 ? 't_horizon = ' + t_horizon.toFixed(2) + ' Time Units' : 'Infinite Horizon (Non-Chaotic)';
    hResEl.style.color = color;
    efResEl.textContent = status + ' | Amplification: ' + (epsilon / deltaZ0).toExponential(1) + '× growth from δZ₀ = ' + deltaZ0.toExponential(1);
    efResEl.style.color = color;
  }

  [lamEl, z0El, epsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter maximal Lyapunov exponent $\lambda$ in units of $1/\text{time}$ (positive for chaotic systems like Lorenz $\lambda \approx 0.906$).',
      'Enter initial microscopic measurement uncertainty perturbation $\delta Z_0$.',
      'Enter maximum allowable macroscopic error forecast tolerance $\epsilon$.',
      'Inspect Lyapunov Predictability Horizon time $t_{\text{horizon}} = \frac{1}{\lambda}\ln(\epsilon/\delta Z_0)$ and characteristic trajectory divergence e-folding time ($\tau = 1/\lambda$).'
    ],
    benefitTitle: 'Aleksandr Lyapunov 1892 Orbital Stability Theory',
    benefitContent: 'A positive maximal Lyapunov exponent ($\lambda > 0$) is the rigorous mathematical definition of chaos; because errors compound exponentially ($\delta Z(t) = \delta Z_0 e^{\lambda t}$), improving weather forecast sensor accuracy by a factor of 1,000 only extends reliable forecasting horizons by a few extra days.',
    faqs: [{ q: 'What is the Lyapunov time of Earth\'s solar system planetary orbits?', a: 'The solar system has a Lyapunov time of approximately 5 million years, beyond which planetary orbits cannot be deterministically predicted.' }]
  },

  // 7. Lorenz Strange Attractor Kaplan-Yorke Fractal Dimension Calculator
  {
    slug: 'lorenz-attractor-dimension-kaplan-yorke-calculator',
    name: 'Lorenz Strange Attractor Kaplan-Yorke Fractal Dimension (D_KY) Calculator',
    description: 'Calculate strange attractor fractal Lyapunov dimension (Kaplan-Yorke conjecture: D_KY = k + (λ₁ + ... + λ_k) / |λ_(k+1)|) from sorted Lyapunov exponent spectrums (λ₁ ≥ λ₂ ≥ λ₃).',
    category: 'Science',
    icon: 'text',
    keywords: ['kaplan yorke dimension calculator', 'lorenz attractor fractal dimension formula d_ky online', 'lyapunov dimension strange attractor calculator', 'chaos theory phase space contraction calculator online', 'fractal dimension lorenz butterfly attractor online'],
    order: 843,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Lyapunov Exponent Spectrum: λ₁ (Divergence), λ₂ (Along Flow = 0) & λ₃ (Dissipative Contraction)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ky-l1">λ₁ (Expanding)</label>
          <input class="tool-textarea" id="ky-l1" type="number" step="any" value="0.9056" placeholder="+0.9056 (Chaos)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ky-l2">λ₂ (Flow = 0)</label>
          <input class="tool-textarea" id="ky-l2" type="number" step="any" value="0.0000" placeholder="0.0000" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ky-l3">λ₃ (Contracting)</label>
          <input class="tool-textarea" id="ky-l3" type="number" step="any" value="-14.5723" placeholder="-14.5723" />
        </div>
      </div>
      <div id="ky-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ky-res-dim" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D_KY = 2.062 (Fractal Sheet)</span>
            <span class="stat-label">Kaplan-Yorke Lyapunov Fractal Dimension (D_KY)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ky-res-div" style="color:var(--green-dark); font-weight:700;">Phase Space Volume Contraction Rate: Σ λ_i = -13.67 s⁻¹ (Dissipative System)</span>
            <span class="stat-label">Total Lyapunov Sum & Phase Space Contraction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l1El = document.getElementById('ky-l1'), l2El = document.getElementById('ky-l2'), l3El = document.getElementById('ky-l3');
  const dResEl = document.getElementById('ky-res-dim'), dvResEl = document.getElementById('ky-res-div');

  function update() {
    const l1 = parseFloat(l1El.value), l2 = parseFloat(l2El.value), l3 = parseFloat(l3El.value);
    if (isNaN(l1) || isNaN(l2) || isNaN(l3)) return;

    // Total divergence sum = l1 + l2 + l3
    const sumAll = l1 + l2 + l3;

    // Kaplan-Yorke formula for 3D system with l1 > 0, l2 = 0, l1 + l2 > 0 and l1 + l2 + l3 < 0:
    // k = 2 because sum(l1 + l2) > 0 while sum(l1 + l2 + l3) < 0
    let D_KY = 0.0;
    if ((l1 + l2) > 0 && l3 < 0) {
      D_KY = 2.0 + ((l1 + l2) / Math.abs(l3));
    } else if (l1 <= 0) {
      D_KY = 1.0;
    } else {
      D_KY = 3.0;
    }

    dResEl.textContent = 'D_KY = ' + D_KY.toFixed(3) + ' Fractal Dimension';
    dvResEl.textContent = 'Σ λ_i = ' + sumAll.toFixed(2) + ' s⁻¹ (' + (sumAll < 0 ? 'Dissipative Strange Attractor' : 'Conservative Hamiltonian') + ' | Lorenz 1963 Attractor D ≈ 2.06)';
  }

  [l1El, l2El, l3El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter expanding positive Lyapunov exponent $\lambda_1 > 0$.',
      'Enter flow-tangent Lyapunov exponent $\lambda_2 \approx 0.0$.',
      'Enter strongly negative dissipative contracting Lyapunov exponent $\lambda_3 < 0$.',
      'Inspect Kaplan-Yorke Lyapunov fractal dimension $D_{KY}$ and phase space volume dissipation rate $\sum \lambda_i$.'
    ],
    benefitTitle: 'James L. Kaplan & James A. Yorke 1979 Fractal Dimension Conjecture',
    benefitContent: 'Strange attractors are non-integer geometric fractals folded endlessly within finite phase space; for the Lorenz butterfly attractor ($\sigma=10, \rho=28, \beta=8/3$), $D_{KY} \approx 2.062$ reveals that trajectories form an infinitely nested 2D sheet with fractal Cantor-set cross sections.',
    faqs: [{ q: 'Why is one Lyapunov exponent always zero (λ2 = 0) in continuous autonomous ODEs?', a: 'Because perturbations along the 1D direction of the trajectory flow neither expand nor contract, maintaining $\lambda = 0$.' }]
  },

  // 8. Mandelbrot Fractal Box-Counting Hausdorff Dimension Calculator
  {
    slug: 'mandelbrot-fractal-box-counting-hausdorff-dimension-calculator',
    name: 'Fractal Box-Counting Hausdorff Dimension (D₀) Calculator',
    description: 'Calculate fractal geometry capacity Hausdorff Box-Counting Dimension (D₀ = lim (ln N(ε) / ln(1/ε))) across Coastlines, Sierpiński Triangles (D = 1.585), Koch Snowflakes (D = 1.262), and Mandelbrot boundaries (D = 2.000).',
    category: 'Science',
    icon: 'text',
    keywords: ['box counting dimension calculator', 'hausdorff fractal dimension formula d0 equals ln n over ln 1 over epsilon online', 'sierpinski triangle koch snowflake fractal dimension calculator', 'coastline paradox fractal dimension calculator online', 'benoit mandelbrot fractal geometry online'],
    order: 844,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Benchmark Fractal Pattern Selection or Custom Box Counts N(ε) & Grid Scale (1/ε)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bx-fractal">Fractal Pattern</label>
          <select class="tool-textarea" id="bx-fractal">
            <option value="koch" selected>Koch Snowflake Curve (N = 4, Scale 1/ε = 3: D = ln 4 / ln 3 = 1.262)</option>
            <option value="sierpinski">Sierpiński Triangle (N = 3, Scale 1/ε = 2: D = ln 3 / ln 2 = 1.585)</option>
            <option value="cantor">Cantor Dust Set (N = 2, Scale 1/ε = 3: D = ln 2 / ln 3 = 0.631)</option>
            <option value="menger">Menger Sponge 3D (N = 20, Scale 1/ε = 3: D = ln 20 / ln 3 = 2.727)</option>
            <option value="britain">Coastline of Britain (Empirical Richardson Law: D ≈ 1.25)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bx-scale">Magnification Level</label>
          <input class="tool-textarea" id="bx-scale" type="number" step="1" min="1" max="10" value="4" placeholder="4 Iteration Steps" />
        </div>
      </div>
      <div id="bx-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bx-res-dim" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">D₀ = 1.2619 Hausdorff Dimension</span>
            <span class="stat-label">Fractal Box-Counting Self-Similarity Dimension (D₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bx-res-stat" style="color:var(--green-dark); font-weight:700;">Iteration 4: N = 256 sub-segments at scale 1/81 (Boundary length L -> ∞ as ε -> 0)</span>
            <span class="stat-label">Self-Similar Scaling Behavior & Coastline Paradox</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('bx-fractal'), sEl = document.getElementById('bx-scale');
  const dResEl = document.getElementById('bx-res-dim'), stResEl = document.getElementById('bx-res-stat');

  const FRACTALS = {
    'koch':       { N: 4,  scale: 3, name: 'Koch Snowflake' },
    'sierpinski': { N: 3,  scale: 2, name: 'Sierpiński Triangle' },
    'cantor':     { N: 2,  scale: 3, name: 'Cantor Dust Set' },
    'menger':     { N: 20, scale: 3, name: 'Menger Sponge' },
    'britain':    { N: 4.88, scale: 3.5, name: 'Coastline of Great Britain' }
  };

  function update() {
    const f = FRACTALS[fEl.value];
    const iter = parseInt(sEl.value, 10);

    if (isNaN(iter) || iter < 1) return;

    // Exact theoretical Hausdorff dimension D = ln(N) / ln(scale)
    const D0 = Math.log(f.N) / Math.log(f.scale);

    const totalPieces = Math.pow(f.N, iter);
    const boxSize = Math.pow(f.scale, iter);

    dResEl.textContent = 'D₀ = ' + D0.toFixed(4) + ' Dimension';
    stResEl.textContent = f.name + ' (Iter ' + iter + ': N = ' + Math.round(totalPieces).toLocaleString() + ' boxes @ scale 1/' + Math.round(boxSize).toLocaleString() + ' | D = ln(' + f.N + ')/ln(' + f.scale + '))';
  }

  fEl.addEventListener('change', update);
  sEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select classic fractal mathematical geometry (Koch Snowflake, Sierpiński Triangle, Cantor Set, Menger Sponge, Coastline of Britain).',
      'Enter recursive fractal iteration depth level.',
      'Inspect exact Hausdorff fractal dimension $D_0 = \frac{\ln N}{\ln(1/\epsilon)}$ and total box count coverage.'
    ],
    benefitTitle: 'Benoit Mandelbrot 1977 Fractal Geometry of Nature',
    benefitContent: 'Standard Euclidean geometry fails for rough natural objects ($D_{\text{line}}=1, D_{\text{surface}}=2$); fractal dimensions quantify spatial self-similarity across scales, resolving the Coastline Paradox where measured boundary lengths approach infinity ($L \to \infty$) as ruler size shrinks ($\epsilon \to 0$).',
    faqs: [{ q: 'What is the fractal dimension of the Mandelbrot Set boundary?', a: 'Mitsuhiro Shishikura proved in 1998 that the boundary of the Mandelbrot Set has a Hausdorff dimension of exactly $D = 2.000$, making it maximally rough.' }]
  },

  // 9. Logistic Map Period-Doubling Bifurcation & Feigenbaum Constant Calculator
  {
    slug: 'logistic-map-bifurcation-feigenbaum-constant-calculator',
    name: 'Logistic Map Period-Doubling Bifurcation & Feigenbaum Constant (δ = 4.6692) Calculator',
    description: 'Calculate nonlinear Logistic Map population dynamics (x_(n+1) = r · x_n · (1 - x_n)) and period-doubling bifurcation cascade threshold limits (r_∞ = 3.5699456) using the universal Feigenbaum constant δ = 4.6692016.',
    category: 'Science',
    icon: 'text',
    keywords: ['feigenbaum constant calculator', 'logistic map period doubling bifurcation formula r n plus 1 online', 'chaos route period doubling cascade calculator', 'feigenbaum delta 4.6692016 universality calculator', 'population ecology chaotic logistic map online'],
    order: 845,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Growth Parameter r (1.0 to 4.0) & Initial Seed Population x₀ (0 to 1.0)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="log-r">Growth Rate r (1.0 - 4.0)</label>
          <input class="tool-textarea" id="log-r" type="number" step="0.05" min="1.0" max="4.0" value="3.50" placeholder="3.50 (Period-4 Cycle)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="log-x0">Initial Seed x₀</label>
          <input class="tool-textarea" id="log-x0" type="number" step="0.05" min="0.01" max="0.99" value="0.40" placeholder="0.40 (40% Capacity)" />
        </div>
      </div>
      <div id="log-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="log-res-reg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PERIOD-4 STABLE CYCLE</span>
            <span class="stat-label">Logistic Map Attractor Dynamic State</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="log-res-orb" style="font-weight:700;">Attractor Orbit: {0.383, 0.827, 0.501, 0.875} | Chaos Boundary r_∞ = 3.5699</span>
            <span class="stat-label">Asymptotic Limit Cycle Values & Feigenbaum Universal Scaling</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('log-r'), x0El = document.getElementById('log-x0');
  const regResEl = document.getElementById('log-res-reg'), orbResEl = document.getElementById('log-res-orb');

  const delta_feigenbaum = 4.669201609;
  const r_infinity = 3.5699456;

  function update() {
    const r = parseFloat(rEl.value), x0 = parseFloat(x0El.value);
    if (isNaN(r) || isNaN(x0) || r < 0 || r > 4.0 || x0 <= 0 || x0 >= 1.0) return;

    // Iterate logistic map x_(n+1) = r * x_n * (1 - x_n) for 300 warm-up steps
    let x = x0;
    for (let i = 0; i < 300; i++) {
      x = r * x * (1.0 - x);
    }

    // Collect last 16 values to detect orbit period
    const orbit = [];
    for (let i = 0; i < 16; i++) {
      x = r * x * (1.0 - x);
      orbit.push(x);
    }

    let regime = '';
    let color = '#22543d';

    if (r < 3.0) {
      regime = 'PERIOD-1 FIXED POINT (Stable single equilibrium x* = ' + (1.0 - 1.0/r).toFixed(3) + ')';
      color = '#22543d';
    } else if (r < 3.449) {
      regime = 'PERIOD-2 STABLE CYCLE (Oscillates between 2 values)';
      color = '#2563eb';
    } else if (r < 3.544) {
      regime = 'PERIOD-4 STABLE CYCLE (Oscillates between 4 values)';
      color = '#2563eb';
    } else if (r < r_infinity) {
      regime = 'PERIOD-8 / PERIOD-16 CASCADE (Dense period doubling toward chaos)';
      color = '#d97706';
    } else if (r >= 3.8284 && r <= 3.8415) {
      regime = 'PERIOD-3 TANGENT WINDOW ("Period 3 Implies Chaos" - Li-Yorke Theorem)';
      color = '#ea580c';
    } else {
      regime = 'FULLY DEVELOPED DETERMINISTIC CHAOS (Aperiodic, sensitive to initial x₀)';
      color = '#c53030';
    }

    regResEl.textContent = regime;
    regResEl.style.color = color;
    orbResEl.textContent = 'Orbit Samples: {' + orbit.slice(0, 4).map(v => v.toFixed(3)).join(', ') + '} | Feigenbaum δ = ' + delta_feigenbaum.toFixed(4) + ' (r_∞ = 3.5699)';
  }

  rEl.addEventListener('input', update);
  x0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter non-dimensional fertility growth parameter r ($1.0 \le r \le 4.0$).',
      'Enter initial normalized starting population fraction $x_0 \in (0, 1)$.',
      'Inspect asymptotic steady-state attractor limit orbit and identify period-doubling bifurcation regime.'
    ],
    benefitTitle: 'Mitchell Feigenbaum 1978 Universal Route to Chaos',
    benefitContent: 'As nonlinear systems transition from order to chaos through period doubling ($2 \to 4 \to 8 \to 16 \to \infty$), the spacing between successive bifurcation intervals shrinks by the universal mathematical constant $\delta = 4.6692016\dots$, proving that fluid turbulence, beating heart arrhythmias, and laser instabilities share identical mathematical universality.',
    faqs: [{ q: 'What is the significance of the "Period Three Implies Chaos" theorem?', a: 'Tien-Yien Li and James Yorke proved in 1975 that if any continuous 1D interval map exhibits a stable period-3 cycle ($r \approx 3.83$), it mathematically guarantees the existence of periodic cycles of all integer lengths and chaotic orbits.' }]
  },

  // 10. Bethe Lattice Percolation Threshold & Spanning Cluster Size Calculator
  {
    slug: 'percolation-threshold-bethe-lattice-cluster-size-calculator',
    name: 'Percolation Threshold (p_c) & Spanning Cluster Probability Calculator',
    description: 'Calculate statistical percolation phase transition critical threshold (p_c = 1 / (z - 1)) on Bethe lattices and evaluate infinite spanning cluster probability P_inf(p) in porous rocks and epidemiology.',
    category: 'Science',
    icon: 'text',
    keywords: ['percolation threshold calculator', 'bethe lattice percolation formula p_c equals 1 over z minus 1 online', 'infinite spanning cluster probability calculator', 'porous rock oil permeability percolation calculator', 'epidemic disease outbreak percolation threshold online'],
    order: 846,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Lattice Topology (Square 2D, Cubic 3D, Bethe Tree z=3, Honeycomb) & Bond Probability p',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="perc-lat">Lattice Topology</label>
          <select class="tool-textarea" id="perc-lat">
            <option value="square" selected>2D Square Lattice (z = 4: Exact Bond p_c = 0.500)</option>
            <option value="cubic">3D Simple Cubic Lattice (z = 6: Bond p_c = 0.2488)</option>
            <option value="honeycomb">2D Honeycomb / Graphene (z = 3: Bond p_c = 0.6527)</option>
            <option value="bethe3">Bethe Tree Cayley Lattice (Coordination z = 3: p_c = 0.500)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="perc-p">Bond Probability p</label>
          <input class="tool-textarea" id="perc-p" type="number" step="0.05" min="0.01" max="0.99" value="0.60" placeholder="0.60 (60% Open Pores)" />
        </div>
      </div>
      <div id="perc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="perc-res-span" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_inf = 48.5% Spanning Cluster</span>
            <span class="stat-label">Infinite Spanning Cluster Probability (P_inf)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="perc-res-stat" style="color:var(--green-dark); font-weight:700;">SUPERCRITICAL PERCOLATING PHASE (p = 0.60 > p_c = 0.50: Continuous Fluid Flow Path Exists!)</span>
            <span class="stat-label">Percolation Phase Transition Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const latEl = document.getElementById('perc-lat'), pEl = document.getElementById('perc-p');
  const sResEl = document.getElementById('perc-res-span'), stResEl = document.getElementById('perc-res-stat');

  const LATTICES = {
    'square':    { pc: 0.5000, beta_exp: 0.138, name: '2D Square Lattice' },
    'cubic':     { pc: 0.2488, beta_exp: 0.418, name: '3D Cubic Lattice' },
    'honeycomb': { pc: 0.6527, beta_exp: 0.138, name: '2D Honeycomb' },
    'bethe3':    { pc: 0.5000, beta_exp: 1.000, name: 'Bethe Tree z=3' }
  };

  function update() {
    const l = LATTICES[latEl.value];
    const p = parseFloat(pEl.value);

    if (isNaN(p) || p <= 0 || p >= 1.0) return;

    let P_inf = 0.0;
    let status = '';
    let color = '#22543d';

    if (p <= l.pc) {
      P_inf = 0.0;
      status = 'SUBCRITICAL / BLOCKED (p ≤ p_c = ' + l.pc.toFixed(4) + ': Only isolated disconnected micro-clusters exist; zero macroscopic conduction)';
      color = '#c53030';
    } else {
      // Near critical scaling P_inf approx = ( (p - pc) / (1 - pc) )^beta
      const reduced = (p - l.pc) / (1.0 - l.pc);
      P_inf = Math.pow(reduced, l.beta_exp);
      const P_inf_pct = P_inf * 100.0;
      status = 'SUPERCRITICAL PERCOLATION (p > p_c: Continuous giant spanning cluster spans from edge to edge with ' + P_inf_pct.toFixed(1) + '% mass density)';
      color = '#22543d';
    }

    sResEl.textContent = 'P_inf = ' + (P_inf * 100).toFixed(1) + '% (Spanning Strength)';
    sResEl.style.color = color;
    stResEl.textContent = status + ' | ' + l.name + ' (Critical Threshold p_c = ' + l.pc.toFixed(4) + ')';
    stResEl.style.color = color;
  }

  latEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select lattice network geometry (2D Square, 3D Cubic, 2D Honeycomb, Bethe Tree).',
      'Enter random bond/site occupation probability p ($0 < p < 1$).',
      'Inspect critical percolation threshold $p_c$, infinite spanning cluster probability $P_\infty$, and phase transition conduction status.'
    ],
    benefitTitle: 'John Broadbent & John Hammersley 1957 Percolation Theory',
    benefitContent: 'Percolation is the geometric paradigm for second-order continuous phase transitions; below $p_c$ pores remain disconnected, while infinitesimally above $p_c$ a macroscopic spanning backbone forms, governing oil reservoir permeability, gelation polymerization, and wildfire propagation.',
    faqs: [{ q: 'What is the exact critical exponent (β) for 2D percolation?', a: 'For all 2D planar lattices, the critical exponent is universally $\beta = 5/36 \approx 0.1388$, proving that scaling behavior depends only on dimensionality, not lattice geometry.' }]
  },

  // --- Suite BBBBBB: Microelectronics & Semiconductor Device Physics (966 - 970) ---
  // 11. MOSFET Subthreshold Swing & Off-State Leakage Current Calculator
  {
    slug: 'mosfet-subthreshold-swing-leakage-current-calculator',
    name: 'MOSFET Subthreshold Swing (SS) & Off-State Leakage Current Calculator',
    description: 'Calculate MOSFET subthreshold swing slope (SS = ln(10)·(k_B·T / q) · [1 + C_dep / C_ox]) in mV/decade and evaluate off-state drain leakage current (I_off) at room and elevated temperatures.',
    category: 'Science',
    icon: 'text',
    keywords: ['subthreshold swing calculator', 'mosfet subthreshold slope formula ss equals ln 10 kt over q online', 'thermal limit 60 mv per decade mosfet calculator', 'off state leakage current ioff subthreshold calculator', 'cmos transistor subthreshold leakage online'],
    order: 847,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Temperature T (Kelvin), Depletion/Oxide Capacitance Ratio (C_dep / C_ox) & Threshold V_th (V)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ss-t">Temp T (K)</label>
          <input class="tool-textarea" id="ss-t" type="number" step="25" value="300.0" placeholder="300.0 K (27°C)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-cdep">C_dep / C_ox</label>
          <input class="tool-textarea" id="ss-cdep" type="number" step="0.05" value="0.15" placeholder="0.15 (Body Factor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-vth">Threshold V_th (V)</label>
          <input class="tool-textarea" id="ss-vth" type="number" step="0.05" value="0.35" placeholder="0.35 V" />
        </div>
      </div>
      <div id="ss-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ss-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">SS = 68.5 mV / decade</span>
            <span class="stat-label">Subthreshold Swing Slope (SS)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ss-res-ioff" style="font-weight:700;">I_off / I_on ≈ 7.8 × 10⁻⁶ (5.11 Decades of Drain Current Attenuation @ V_gs = 0V)</span>
            <span class="stat-label">Subthreshold Drain Current Attenuation & Leakage Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('ss-t'), cEl = document.getElementById('ss-cdep'), vthEl = document.getElementById('ss-vth');
  const ssResEl = document.getElementById('ss-res-val'), ioResEl = document.getElementById('ss-res-ioff');

  const kB_q_mV = 0.08617333; // (k_B / q) * 1000 in mV / K

  function update() {
    const T = parseFloat(tEl.value), c_ratio = parseFloat(cEl.value), Vth = parseFloat(vthEl.value);
    if (isNaN(T) || isNaN(c_ratio) || isNaN(Vth) || T <= 0 || c_ratio < 0 || Vth <= 0) return;

    // Thermal voltage V_T = k_B * T / q  [mV]
    const V_T_mV = kB_q_mV * T;

    // Subthreshold swing SS = ln(10) * V_T * ( 1 + C_dep / C_ox )  [mV / decade]
    const SS_mV_dec = Math.log(10) * V_T_mV * (1.0 + c_ratio);

    // Number of decades of current suppression between V_th and V_gs = 0:
    const decades = (Vth * 1000.0) / SS_mV_dec;
    // Current attenuation ratio = 10^-decades
    const attenRatio = Math.pow(10, -decades);

    ssResEl.textContent = 'SS = ' + SS_mV_dec.toFixed(1) + ' mV / decade (Limit: ' + (Math.log(10) * V_T_mV).toFixed(1) + ' mV/dec)';
    ioResEl.textContent = 'I_off / I_on ≈ ' + attenRatio.toExponential(2) + ' (' + decades.toFixed(2) + ' Decades of Attenuation @ V_th = ' + Vth.toFixed(2) + ' V, T = ' + T + ' K)';
  }

  [tEl, cEl, vthEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter transistor operating junction temperature T in Kelvin (300 K room temp to 380 K hot chip).',
      'Enter depletion-to-oxide capacitance body factor ratio $C_{\text{dep}}/C_{\text{ox}}$ (typically 0.1 to 0.2 for planar MOSFETs, $\sim 0.05$ for FinFETs).',
      'Enter MOSFET threshold voltage $V_{\text{th}}$ in Volts.',
      'Inspect subthreshold swing slope $SS$ in mV/decade, theoretical Boltzmann thermal limit ($60\text{ mV/decade}$ at 300 K), and off-state subthreshold leakage ratio.'
    ],
    benefitTitle: 'Robert Dennard Scaling & The Boltzmann Tyranny Limit',
    benefitContent: 'Thermal carrier diffusion imposes a fundamental thermodynamic barrier on classical field-effect transistors: subthreshold swing cannot drop below $SS_{\min} = \ln(10) \frac{k_B T}{q} \approx 60\text{ mV/decade}$ at room temperature, forcing static standby leakage power to rise as threshold voltages are scaled down.',
    faqs: [{ q: 'How do steep-slope devices (TFETs / NCFETs) beat the 60 mV/dec limit?', a: 'Tunnel FETs (band-to-band quantum filtering) and Negative Capacitance FETs (ferroelectric voltage amplification) bypass thermal Fermi distribution tails to achieve $SS < 60\text{ mV/dec}$.' }]
  },

  // 12. Bipolar Junction Transistor (BJT) Early Effect & Output Resistance Calculator
  {
    slug: 'early-effect-bjt-output-resistance-calculator',
    name: 'BJT Early Effect Base-Width Modulation & Dynamic Output Resistance (r_o) Calculator',
    description: 'Calculate BJT transistor Early effect base-width modulation dynamic small-signal output resistance (r_o = (V_A + V_CE) / I_C) in kΩ and collector current tilt slope.',
    category: 'Science',
    icon: 'text',
    keywords: ['early effect calculator', 'bjt output resistance formula ro equals va plus vce over ic online', 'early voltage va base width modulation calculator', 'small signal bjt collector resistance ro calculator', 'analog circuit design early effect online'],
    order: 848,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Early Voltage V_A (Volts), Collector Bias Current I_C (mA) & Collector-Emitter V_CE (Volts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="va-va">Early Volt V_A (V)</label>
          <input class="tool-textarea" id="va-va" type="number" step="10" value="100.0" placeholder="100.0 V (NPN BJT)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="va-ic">Bias Current I_C (mA)</label>
          <input class="tool-textarea" id="va-ic" type="number" step="0.5" value="1.0" placeholder="1.0 mA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="va-vce">Voltage V_CE (V)</label>
          <input class="tool-textarea" id="va-vce" type="number" step="1" value="5.0" placeholder="5.0 V" />
        </div>
      </div>
      <div id="va-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="va-res-ro" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">r_o = 105.0 kΩ Output Resistance</span>
            <span class="stat-label">Small-Signal Dynamic Collector Output Resistance (r_o)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="va-res-gain" style="font-weight:700;">Intrinsic Max Voltage Gain A_v,max = g_m · r_o = 4,038 V/V (72.1 dB @ V_T = 26 mV)</span>
            <span class="stat-label">Maximum Intrinsic Transistor Voltage Gain Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vaEl = document.getElementById('va-va'), icEl = document.getElementById('va-ic'), vceEl = document.getElementById('va-vce');
  const roResEl = document.getElementById('va-res-ro'), gnResEl = document.getElementById('va-res-gain');

  const V_T = 0.026; // 26 mV thermal voltage @ 300K

  function update() {
    const V_A = parseFloat(vaEl.value), I_c_mA = parseFloat(icEl.value), V_CE = parseFloat(vceEl.value);
    if (isNaN(V_A) || isNaN(I_c_mA) || isNaN(V_CE) || V_A <= 0 || I_c_mA <= 0 || V_CE < 0) return;

    const I_c_A = I_c_mA * 1e-3;

    // Small signal output resistance r_o = (V_A + V_CE) / I_C  [Ohms -> kOhms]
    const r_o_ohms = (V_A + V_CE) / I_c_A;
    const r_o_kohm = r_o_ohms / 1000.0;

    // Transconductance g_m = I_C / V_T  [A / V = Siemens]
    const g_m = I_c_A / V_T;

    // Maximum intrinsic single-transistor voltage gain A_v,max = g_m * r_o = (V_A + V_CE) / V_T
    const A_v_max = g_m * r_o_ohms;
    const gain_db = 20.0 * Math.log10(A_v_max);

    roResEl.textContent = 'r_o = ' + r_o_kohm.toFixed(1) + ' kΩ Output Resistance';
    gnResEl.textContent = 'A_v,max = ' + Math.round(A_v_max).toLocaleString() + ' V/V (' + gain_db.toFixed(1) + ' dB | g_m = ' + (g_m*1000).toFixed(1) + ' mA/V @ V_A = ' + V_A + ' V)';
  }

  [vaEl, icEl, vceEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter BJT Early Voltage $V_A$ in Volts (typically 50 V to 150 V for discrete NPN transistors, 20 V to 50 V for integrated ICs).',
      'Enter collector DC bias current $I_C$ in mA.',
      'Enter collector-emitter bias voltage $V_{CE}$ in Volts.',
      'Inspect small-signal output resistance $r_o$ in $k\Omega$, transconductance $g_m$, and maximum intrinsic single-stage voltage gain limit ($A_{v,\max} = g_m r_o$).'
    ],
    benefitTitle: 'James M. Early 1952 Base-Width Modulation Effect',
    benefitContent: 'Increasing reverse bias on the collector-base junction widens the depletion region into the neutral base, narrowing effective base width ($W_B$) and causing collector current to rise with $V_{CE}$; the Early effect sets the upper limit on analog amplifier open-loop voltage gain.',
    faqs: [{ q: 'What is the MOSFET equivalent of the Early Effect?', a: 'Channel-Length Modulation (CLM parameterized by $\lambda = 1/V_A$), where drain depletion shortens the effective channel length.' }]
  },

  // 13. High-κ Dielectric Equivalent Oxide Thickness (EOT) Calculator
  {
    slug: 'high-k-dielectric-equivalent-oxide-thickness-eot-calculator',
    name: 'High-κ Dielectric Equivalent Oxide Thickness (EOT) Gate Scaling Calculator',
    description: 'Calculate advanced semiconductor transistor Equivalent Oxide Thickness (EOT = t_high-k · (κ_SiO₂ / κ_high-k)) in nm and evaluate gate tunneling leakage reduction across HfO₂, ZrO₂, Al₂O₃, and TiO₂.',
    category: 'Science',
    icon: 'text',
    keywords: ['eot calculator', 'equivalent oxide thickness formula eot equals t high k kappa sio2 over kappa high k', 'hafnium oxide gate dielectric eot calculator online', 'cmos gate leakage physical vs electrical thickness calculator', 'semiconductor high k dielectric scaling online'],
    order: 849,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Physical High-κ Thickness t_phys (nm) & Dielectric Material Selection (HfO₂, ZrO₂, Al₂O₃, TiO₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eot-mat">Dielectric Material</label>
          <select class="tool-textarea" id="eot-mat">
            <option value="hfo2" selected>Hafnium Oxide HfO₂ (κ = 25.0: Intel/TSMC High-k Standard)</option>
            <option value="zro2">Zirconium Oxide ZrO₂ (κ = 24.0: DRAM Capacitors)</option>
            <option value="al2o3">Aluminum Oxide Al₂O₃ (κ = 9.0: High Bandgap 8.8 eV)</option>
            <option value="tio2">Titanium Dioxide TiO₂ (κ = 80.0: Ultra-High-k)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="eot-thk">Physical Thickness t (nm)</label>
          <input class="tool-textarea" id="eot-thk" type="number" step="0.2" value="3.0" placeholder="3.0 nm Physical" />
        </div>
      </div>
      <div id="eot-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eot-res-eot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">EOT = 0.47 nm (4.7 Å)</span>
            <span class="stat-label">Equivalent Oxide Thickness (EOT = t · κ_SiO₂ / κ_mat)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eot-res-leak" style="color:var(--green-dark); font-weight:700;">LEAKAGE REDUCTION: 10,000× Lower Gate Tunneling than 0.47 nm SiO₂</span>
            <span class="stat-label">Quantum Tunneling Gate Leakage Suppression</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('eot-mat'), tEl = document.getElementById('eot-thk');
  const eotResEl = document.getElementById('eot-res-eot'), lkResEl = document.getElementById('eot-res-leak');

  const kappa_SiO2 = 3.90; // Standard thermal silicon dioxide permittivity

  const HIGH_K = {
    'hfo2':  { kappa: 25.0, name: 'Hafnium Oxide (HfO₂)' },
    'zro2':  { kappa: 24.0, name: 'Zirconium Oxide (ZrO₂)' },
    'al2o3': { kappa: 9.0,  name: 'Aluminum Oxide (Al₂O₃)' },
    'tio2':  { kappa: 80.0, name: 'Titanium Dioxide (TiO₂)' }
  };

  function update() {
    const m = HIGH_K[mEl.value];
    const t_phys_nm = parseFloat(tEl.value);

    if (isNaN(t_phys_nm) || t_phys_nm <= 0) return;

    // EOT = t_phys * ( kappa_SiO2 / kappa_material )  [nm]
    const EOT_nm = t_phys_nm * (kappa_SiO2 / m.kappa);
    const EOT_angstrom = EOT_nm * 10.0;

    // Thickness multiplier
    const thickFactor = m.kappa / kappa_SiO2;

    eotResEl.textContent = 'EOT = ' + EOT_nm.toFixed(2) + ' nm (' + EOT_angstrom.toFixed(1) + ' Ångströms)';
    lkResEl.textContent = 'Physical t = ' + t_phys_nm.toFixed(1) + ' nm is ' + thickFactor.toFixed(1) + '× thicker than equivalent SiO₂, suppressing quantum direct tunneling leakage by >10⁴×';
  }

  mEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select high-$\kappa$ gate dielectric material (Hafnium Oxide $\text{HfO}_2$, Zirconium Oxide $\text{ZrO}_2$, Alumina $\text{Al}_2\text{O}_3$, Titania $\text{TiO}_2$).',
      'Enter physical layer thickness $t_{\text{phys}}$ in nanometers (nm).',
      'Inspect Equivalent Oxide Thickness (EOT) in nm and Ångströms compared to conventional $\text{SiO}_2$ ($\kappa = 3.9$).'
    ],
    benefitTitle: 'Robert Chau & Intel 2007 High-κ Metal Gate (HKMG) Revolution',
    benefitContent: 'When $\text{SiO}_2$ gate oxides scaled below 1.2 nm ($\sim 4$ atoms thick), quantum mechanical direct tunneling caused catastrophic leakage currents; replacing $\text{SiO}_2$ with high-permittivity $\text{HfO}_2$ ($\kappa=25$) allows a physically thick 3.0 nm layer to deliver the electrical capacitance of a 0.47 nm oxide with $10,000\times$ less leakage.',
    faqs: [{ q: 'Why is EOT used instead of physical thickness in CMOS design?', a: 'EOT normalizes gate capacitance per unit area ($C_{\text{ox}} = \kappa_{\text{SiO}_2} \epsilon_0 / \text{EOT}$), allowing circuit designers to compute transconductance and drive currents independently of the specific dielectric chemistry.' }]
  },

  // 14. Shubnikov-de Haas Oscillations & Quantum Hall Effect Calculator
  {
    slug: 'shubnikov-de-haas-quantum-hall-effect-calculator',
    name: 'Shubnikov-de Haas (SdH) Oscillations & Integer Quantum Hall Effect (R_H = h / ν·e²) Calculator',
    description: 'Calculate 2D electron gas (2DEG) Shubnikov-de Haas magneto-resistance oscillation frequency (Δ(1/B) = 2·e / (ℏ·n_2D)) and exact von Klitzing Integer Quantum Hall plateaus (R_H = h / (ν · e²)) in Ohms.',
    category: 'Science',
    icon: 'text',
    keywords: ['shubnikov de haas calculator', 'quantum hall effect formula r_h equals h over nu e squared online', 'von klitzing constant rk 25812 ohm calculator', '2deg carrier density sdh oscillations calculator', 'mesoscopic physics quantum hall plateaus online'],
    order: 850,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '2DEG Sheet Density n_2D (10¹¹ cm⁻²) & Integer Filling Factor ν (1, 2, 3, 4)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sdh-n2d">Density n_2D (10¹¹ cm⁻²)</label>
          <input class="tool-textarea" id="sdh-n2d" type="number" step="0.5" value="3.0" placeholder="3.0 (GaAs / Graphene 2DEG)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sdh-nu">Filling Factor (ν)</label>
          <select class="tool-textarea" id="sdh-nu">
            <option value="1">ν = 1 (R_H = 25,812.807 Ω - Fundamental)</option>
            <option value="2" selected>ν = 2 (R_H = 12,906.404 Ω - Spin Degenerate)</option>
            <option value="3">ν = 3 (R_H = 8,604.269 Ω)</option>
            <option value="4">ν = 4 (R_H = 6,453.202 Ω - Graphene)</option>
          </select>
        </div>
      </div>
      <div id="sdh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sdh-res-rh" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">R_H = 12,906.40 Ω Plateau</span>
            <span class="stat-label">Quantized Hall Resistance (R_H = R_K / ν)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sdh-res-b" style="font-weight:700;">Plateau Magnetic Field B_ν=2 = 6.20 Tesla (SdH Period Δ(1/B) = 0.161 T⁻¹)</span>
            <span class="stat-label">Required Quantum Magnetic Field & SdH Oscillation Period</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('sdh-n2d'), nuEl = document.getElementById('sdh-nu');
  const rhResEl = document.getElementById('sdh-res-rh'), bResEl = document.getElementById('sdh-res-b');

  const R_K = 25812.80745; // Ohms (exact von Klitzing constant h/e^2)
  const hbar = 1.054571817e-34;
  const e_charge = 1.602176634e-19;

  function update() {
    const nFactor = parseFloat(nEl.value), nu = parseInt(nuEl.value, 10);
    if (isNaN(nFactor) || isNaN(nu) || nFactor <= 0 || nu < 1) return;

    // Convert 10^11 cm^-2 to m^-2: nFactor * 1e11 * 1e4 = nFactor * 1e15 m^-2
    const n_2D_m2 = nFactor * 1e15;

    // Quantized Hall resistance R_H = R_K / nu  [Ohms]
    const R_H = R_K / nu;

    // SdH period in 1/B: Delta(1/B) = ( 2 * e ) / ( hbar * n_2D ) = ( 4 * pi * e ) / ( h * n_2D )  [T^-1]
    const delta_inv_B = (2.0 * e_charge) / (hbar * n_2D_m2);

    // Magnetic field corresponding to filling factor nu: B = ( h * n_2D ) / ( e * nu )  [Tesla]
    const B_nu = (2.0 * Math.PI * hbar * n_2D_m2) / (e_charge * nu);

    rhResEl.textContent = 'R_H = ' + R_H.toFixed(2) + ' Ω (ν = ' + nu + ')';
    bResEl.textContent = 'B_ν=' + nu + ' = ' + B_nu.toFixed(2) + ' Tesla (SdH Period Δ(1/B) = ' + delta_inv_B.toFixed(3) + ' T⁻¹ | n_2D = ' + nFactor + ' × 10¹¹ cm⁻²)';
  }

  nEl.addEventListener('input', update);
  nuEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter two-dimensional electron gas (2DEG) sheet carrier density $n_{2D}$ in units of $10^{11}\text{ cm}^{-2}$.',
      'Select Integer Quantum Hall filling factor $\nu$ ($\nu = 1, 2, 3, 4$).',
      'Inspect exact quantized Hall plateau resistance $R_H = R_K / \nu$ in Ohms and required magnetic field B in Tesla.'
    ],
    benefitTitle: 'Klaus von Klitzing 1980 Nobel Integer Quantum Hall Effect',
    benefitContent: 'At low temperatures and high magnetic fields, Landau levels create perfectly flat transverse Hall resistance plateaus ($R_H = h / \nu e^2$) invariant to sample impurities, establishing the international SI metrological standard for electrical resistance based on the exact von Klitzing constant ($R_K \approx 25,812.807\ \Omega$).',
    faqs: [{ q: 'What happens to longitudinal resistance Rxx during a Quantum Hall plateau?', a: 'During a Hall plateau ($R_{xy} = R_H$), the longitudinal resistance drops to exactly zero ($R_{xx} = 0$), indicating dissipationless chiral edge state transport.' }]
  },

  // 15. FinFET & Gate-All-Around (GAA) Effective Channel Width Calculator
  {
    slug: 'finfet-tri-gate-effective-channel-width-calculator',
    name: 'FinFET & GAA Nanosheet Transistor Effective Channel Width (W_eff) Calculator',
    description: 'Calculate 3D multi-gate FinFET (W_eff = N_fin · [2·H_fin + T_fin]) and Gate-All-Around Nanosheet (W_eff = 2·N_sheet · [W_ns + T_ns]) effective channel electrical drive widths in nm.',
    category: 'Science',
    icon: 'text',
    keywords: ['finfet effective channel width calculator', 'gaa nanosheet weff formula 2 hfin plus tfin online', 'tri gate transistor drive current weff calculator', 'sub 3nm node nanosheet gaa channel width calculator', 'semiconductor finfet layout sizing online'],
    order: 851,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Architecture (FinFET Tri-Gate or GAA Nanosheet), Fin Height / Nanosheet Width & Fin Count',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fin-type">Architecture</label>
          <select class="tool-textarea" id="fin-type">
            <option value="finfet" selected>FinFET (Tri-Gate: 2·H_fin + T_fin)</option>
            <option value="gaa">GAA Nanosheet (4-Sided: 2·[W_ns + T_ns])</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="fin-h">Height / Width (nm)</label>
          <input class="tool-textarea" id="fin-h" type="number" step="5" value="50.0" placeholder="50.0 nm (H_fin or W_ns)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fin-t">Thickness T (nm)</label>
          <input class="tool-textarea" id="fin-t" type="number" step="1" value="6.0" placeholder="6.0 nm (T_fin or T_ns)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fin-count">Fins / Sheets Count</label>
          <input class="tool-textarea" id="fin-count" type="number" step="1" value="3" placeholder="3 Fins" />
        </div>
      </div>
      <div id="fin-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fin-res-weff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">W_eff = 318.0 nm Active Width</span>
            <span class="stat-label">Total Effective Electrical Conduction Width (W_eff)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fin-res-curr" style="font-weight:700;">Drive Current I_on ≈ 381.6 μA (3.18× Footprint Density vs Planar @ J_on = 1.2 mA/μm)</span>
            <span class="stat-label">Estimated Transistor ON-Current (I_on)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const typeEl = document.getElementById('fin-type'), hEl = document.getElementById('fin-h');
  const tEl = document.getElementById('fin-t'), countEl = document.getElementById('fin-count');
  const wResEl = document.getElementById('fin-res-weff'), cResEl = document.getElementById('fin-res-curr');

  const Jon_mA_um = 1.20; // 1.2 mA per um of effective width (typical high-performance node)

  function update() {
    const isGAA = typeEl.value === 'gaa';
    const H_nm = parseFloat(hEl.value), T_nm = parseFloat(tEl.value), N = parseInt(countEl.value, 10);

    if (isNaN(H_nm) || isNaN(T_nm) || isNaN(N) || H_nm <= 0 || T_nm <= 0 || N < 1) return;

    let Weff_single = 0.0;
    if (!isGAA) {
      // Tri-gate FinFET: Weff = 2 * H_fin + T_fin
      Weff_single = (2.0 * H_nm) + T_nm;
    } else {
      // GAA Nanosheet: Weff = 2 * ( W_ns + T_ns )
      Weff_single = 2.0 * (H_nm + T_nm);
    }

    const Weff_total_nm = N * Weff_single;
    const Weff_total_um = Weff_total_nm / 1000.0;

    // Drive current Ion = Jon * Weff_total  [uA]
    const Ion_uA = Jon_mA_um * Weff_total_um * 1000.0;

    wResEl.textContent = 'W_eff = ' + Weff_total_nm.toFixed(1) + ' nm Active Width';
    cResEl.textContent = 'Drive Current I_on ≈ ' + Ion_uA.toFixed(1) + ' μA (' + N + ' ' + (isGAA ? 'Sheets' : 'Fins') + ' × ' + Weff_single.toFixed(0) + ' nm/fin | J_on = ' + Jon_mA_um + ' mA/μm)';
  }

  [typeEl, hEl, tEl, countEl].forEach(el => el.addEventListener('input', update));
  typeEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select 3D transistor architecture (FinFET Tri-Gate or GAA Nanosheet MBCFET).',
      'Enter fin vertical height $H_{\text{fin}}$ or nanosheet width $W_{\text{ns}}$ in nanometers.',
      'Enter channel thickness $T$ in nanometers (e.g. 5 to 7 nm).',
      'Enter number of parallel vertical fins or stacked nanosheets N.',
      'Inspect total effective electrical channel conduction width $W_{\text{eff}}$ and estimated transistor ON-state drive current $I_{\text{on}}$ in $\mu\text{A}$.'
    ],
    benefitTitle: 'Chenming Hu 1999 3D Multi-Gate Transistor Geometry',
    benefitContent: 'By wrapping the gate electrode around three sides of a vertical silicon fin (FinFET) or all four sides of stacked horizontal nanosheets (GAA), 3D multi-gate architectures dramatically increase effective channel width ($W_{\text{eff}} > 3\times\text{footprint}$) while suppressing short-channel drain-induced barrier lowering (DIBL).',
    faqs: [{ q: 'Why is Gate-All-Around (GAA) replacing FinFET at 2nm and below?', a: 'GAA nanosheets provide complete electrostatic gate control on all four sides of the channel, eliminating parasitic corner leakage and allowing continuous tuning of nanosheet width.' }]
  },

  // --- Suite CCCCCC: High-Voltage Electrical Engineering & Dielectric Breakdown (971 - 975) ---
  // 16. Paschen's Law Electrical Spark Breakdown Voltage Calculator
  {
    slug: 'paschen-law-electrical-spark-breakdown-voltage-calculator',
    name: 'Paschen\'s Law Gas Electrical Spark Breakdown Voltage (V_B) Calculator',
    description: 'Calculate high-voltage electrical spark breakdown voltage (V_B = (B · p · d) / [ln(A · p · d) - ln(ln(1 + 1/γ_se))]) in Volts from pressure-distance product p·d in Air, SF₆, Nitrogen, and Argon.',
    category: 'Science',
    icon: 'text',
    keywords: ['paschen law calculator', 'electrical breakdown voltage formula vb equals b p d over ln apd online', 'minimum paschen breakdown voltage 327v air calculator', 'high voltage gap spark discharge paschen calculator', 'sf6 dielectric gas breakdown voltage online'],
    order: 852,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gas Selection (Air, SF₆, Nitrogen N₂, Argon Ar, Helium He) & Gap Distance d (mm) / Pressure p (bar)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="psh-gas">Insulating Gas</label>
          <select class="tool-textarea" id="psh-gas">
            <option value="air" selected>Air (Min V_B = 327 V @ p·d = 0.57 Pa·m)</option>
            <option value="sf6">Sulfur Hexafluoride SF₆ (3× Higher Dielectric Strength)</option>
            <option value="n2">Pure Nitrogen N₂ (Min V_B = 250 V)</option>
            <option value="ar">Argon Ar (Min V_B = 137 V - Low Breakdown)</option>
            <option value="he">Helium He (Min V_B = 150 V)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="psh-pd">p · d (Torr · cm)</label>
          <input class="tool-textarea" id="psh-pd" type="number" step="any" value="76.0" placeholder="76.0 (1 atm × 1 mm Gap)" />
        </div>
      </div>
      <div id="psh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="psh-res-vb" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">V_B = 4.12 kV Spark Threshold</span>
            <span class="stat-label">Paschen Spark Breakdown Voltage (V_B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="psh-res-stat" style="color:var(--green-dark); font-weight:700;">HIGH VOLTAGE WITHSTAND: Gap supports up to 4.12 kV without electrical flashover</span>
            <span class="stat-label">Dielectric Withstand Voltage Assessment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('psh-gas'), pdEl = document.getElementById('psh-pd');
  const vbResEl = document.getElementById('psh-res-vb'), stResEl = document.getElementById('psh-res-stat');

  const GASES = {
    'air': { A: 15.0, B: 365.0, gamma: 0.01, min_v: 327, name: 'Air' },
    'sf6': { A: 27.0, B: 890.0, gamma: 0.005,min_v: 800, name: 'SF₆ Gas' },
    'n2':  { A: 12.0, B: 342.0, gamma: 0.01, min_v: 250, name: 'Nitrogen N₂' },
    'ar':  { A: 14.0, B: 180.0, gamma: 0.05, min_v: 137, name: 'Argon Ar' },
    'he':  { A: 3.0,  B: 34.0,  gamma: 0.08, min_v: 150, name: 'Helium He' }
  };

  function update() {
    const g = GASES[gEl.value];
    const pd = parseFloat(pdEl.value);

    if (isNaN(pd) || pd <= 0) return;

    // Paschen's formula: V_B = ( B * pd ) / [ ln( A * pd ) - ln( ln( 1 + 1/gamma ) ) ]  [Volts]
    const gamma_term = Math.log(Math.log(1.0 + (1.0 / g.gamma)));
    const log_term = Math.log(g.A * pd) - gamma_term;

    let V_B = 0.0;
    if (log_term > 0) {
      V_B = (g.B * pd) / log_term;
      V_B = Math.max(g.min_v, V_B);
    } else {
      V_B = g.min_v;
    }

    const V_B_kv = V_B / 1000.0;

    vbResEl.textContent = 'V_B = ' + (V_B_kv < 1.0 ? Math.round(V_B) + ' V' : V_B_kv.toFixed(2) + ' kV Spark Flashover');
    stResEl.textContent = 'Dielectric Withstand @ p·d = ' + pd + ' Torr·cm (Minimum Paschen Dip V_min = ' + g.min_v + ' V in ' + g.name + ')';
  }

  gEl.addEventListener('change', update);
  pdEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select insulating gas medium (Air, $SF_6$ High-Voltage Dielectric, Nitrogen, Argon, Helium).',
      'Enter pressure-distance product $p \cdot d$ in $\text{Torr}\cdot\text{cm}$ ($76.0\text{ Torr}\cdot\text{cm} = 1\text{ atm} \times 1\text{ mm gap}$).',
      'Inspect Paschen spark breakdown voltage $V_B$ in Volts and kilovolts (kV).'
    ],
    benefitTitle: 'Friedrich Paschen 1889 Townsend Avalanche Spark Law',
    benefitContent: 'Paschen\'s curve exhibits a universal "U-shaped" breakdown minimum ($\sim 327\text{ V}$ in air at $p\cdot d \approx 0.57\text{ Pa}\cdot\text{m}$); at ultra-low pressures (vacuum), electrons rarely collide with gas molecules, while at high pressures, frequent collisions prevent electrons from gaining ionization kinetic energy, requiring kilovolts to strike an arc.',
    faqs: [{ q: 'Why is SF6 used in high-voltage circuit breakers and switchgear?', a: 'Sulfur Hexafluoride ($SF_6$) is strongly electronegative, rapidly capturing free electrons to form heavy negative ions and delivering $3\times$ higher dielectric breakdown strength than air.' }]
  },

  // 17. Dielectric Loss Tangent (tan δ) & Dissipation Factor (DF) Calculator
  {
    slug: 'dielectric-loss-tangent-tan-delta-dissipation-calculator',
    name: 'Dielectric Loss Tangent (tan δ) & RF Thermal Power Dissipation Calculator',
    description: 'Calculate dielectric loss tangent dissipation factor (tan δ = ε\'\' / ε\' = 1 / (ω·R_p·C_p)) and internal volumetric RF dielectric heating power loss (P_loss = ω·C·V²·tan δ) in Watts.',
    category: 'Science',
    icon: 'text',
    keywords: ['dielectric loss tangent calculator', 'tan delta formula eps double prime over eps prime online', 'dissipation factor capacitor power loss calculator', 'dielectric heating high frequency dissipation factor calculator', 'rf pcb substrate tan delta online'],
    order: 853,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Capacitance C (pF), RMS Voltage V (Volts), Frequency f (MHz) & Dielectric Material',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="df-c">Capacitance C (pF)</label>
          <input class="tool-textarea" id="df-c" type="number" step="10" value="100.0" placeholder="100.0 pF" />
        </div>
        <div class="control-group">
          <label class="control-label" for="df-v">Voltage V_rms (V)</label>
          <input class="tool-textarea" id="df-v" type="number" step="10" value="250.0" placeholder="250.0 V (RF)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="df-freq">Freq f (MHz)</label>
          <input class="tool-textarea" id="df-freq" type="number" step="10" value="13.56" placeholder="13.56 MHz (ISM RF)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="df-mat">Dielectric</label>
          <select class="tool-textarea" id="df-mat">
            <option value="ptfe" selected>PTFE Teflon (tan δ = 0.0002: Ultra-Low Loss)</option>
            <option value="fr4">FR-4 Standard PCB (tan δ = 0.0200: High Loss)</option>
            <option value="c0g">C0G / NP0 Ceramic (tan δ = 0.0010)</option>
            <option value="x7r">X7R Ceramic (tan δ = 0.0250)</option>
          </select>
        </div>
      </div>
      <div id="df-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="df-res-ploss" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_loss = 0.106 Watts Heat</span>
            <span class="stat-label">Internal Dielectric Thermal Power Loss (P_loss)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="df-res-q" style="color:var(--green-dark); font-weight:700;">Quality Factor Q = 5,000 (Reactive Power Q_c = 532.5 VAR | tan δ = 0.0002)</span>
            <span class="stat-label">Capacitor Quality Factor (Q = 1 / tan δ) & Reactive Load</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('df-c'), vEl = document.getElementById('df-v');
  const fEl = document.getElementById('df-freq'), matEl = document.getElementById('df-mat');
  const pResEl = document.getElementById('df-res-ploss'), qResEl = document.getElementById('df-res-q');

  const MATS = {
    'ptfe': { tan_delta: 0.0002, name: 'PTFE Teflon' },
    'fr4':  { tan_delta: 0.0200, name: 'FR-4 Epoxy' },
    'c0g':  { tan_delta: 0.0010, name: 'C0G Ceramic' },
    'x7r':  { tan_delta: 0.0250, name: 'X7R Ceramic' }
  };

  function update() {
    const C_pf = parseFloat(cEl.value), V_rms = parseFloat(vEl.value), f_mhz = parseFloat(fEl.value);
    const m = MATS[matEl.value];

    if (isNaN(C_pf) || isNaN(V_rms) || isNaN(f_mhz) || C_pf <= 0 || V_rms <= 0 || f_mhz <= 0) return;

    const C_f = C_pf * 1e-12;
    const f_hz = f_mhz * 1e6;
    const omega = 2.0 * Math.PI * f_hz;

    // Dielectric loss power P_loss = omega * C * V^2 * tan(delta)  [Watts]
    const P_loss = omega * C_f * Math.pow(V_rms, 2) * m.tan_delta;

    // Reactive power Q_var = omega * C * V^2  [VAR]
    const Q_var = omega * C_f * Math.pow(V_rms, 2);

    // Quality factor Q = 1 / tan(delta)
    const Q_factor = 1.0 / m.tan_delta;

    pResEl.textContent = 'P_loss = ' + (P_loss < 1.0 ? (P_loss * 1000).toFixed(1) + ' mW' : P_loss.toFixed(2) + ' Watts Heat');
    qResEl.textContent = 'Quality Factor Q = ' + Math.round(Q_factor).toLocaleString() + ' | tan δ = ' + m.tan_delta + ' (' + m.name + ' @ ' + f_mhz + ' MHz, Reactive: ' + Q_var.toFixed(1) + ' VAR)';
  }

  [cEl, vEl, fEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter capacitance C in picofarads (pF).',
      'Enter applied RMS AC voltage V.',
      'Enter operating frequency f in MHz (e.g. 13.56 MHz ISM RF power).',
      'Select dielectric insulation material (PTFE Teflon, FR-4 PCB, C0G Ceramic, X7R).',
      'Inspect internal volumetric dielectric thermal heating dissipation power loss $P_{\text{loss}}$ in Watts and Quality Factor $Q = 1/\tan\delta$.'
    ],
    benefitTitle: 'Dielectric Relaxation & Molecular Dipole Friction',
    benefitContent: 'At high frequencies, molecular polar dipoles cannot rotate fast enough to follow the alternating electric field ($\epsilon = \epsilon\' - j\epsilon\'\'$), dissipating RF electrical energy as internal thermal Joule heat ($\tan\delta = \epsilon\'\'/\epsilon\'$); switching from lossy FR-4 to PTFE Teflon prevents high-power RF transmitters from catching fire.',
    faqs: [{ q: 'Why is tan δ also called Dissipation Factor (DF)?', a: 'Dissipation Factor is defined as the ratio of active real resistive power loss to reactive stored energy ($DF = \text{ESR} / X_C = \tan\delta$).' }]
  },

  // 18. High-Voltage Transmission Line Surge Impedance Loading (SIL) Calculator
  {
    slug: 'transmission-line-surge-impedance-loading-sil-calculator',
    name: 'High-Voltage Transmission Line Surge Impedance Loading (SIL) Calculator',
    description: 'Calculate high-voltage electrical grid surge impedance (Z_c = √(L / C)) in Ohms and natural Surge Impedance Loading capacity (SIL = V_LL² / Z_c) in Megawatts (MW) where line reactive power is 100% self-balancing.',
    category: 'Science',
    icon: 'text',
    keywords: ['surge impedance loading calculator', 'sil transmission line formula v squared over zc online', 'characteristic impedance transmission line inductance capacitance calculator', 'high voltage grid reactive power balance sil calculator', 'ferranti effect surge impedance loading online'],
    order: 854,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Line-to-Line Voltage V_LL (kV), Series Inductance L (mH/km) & Shunt Capacitance C (nF/km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sil-v">Voltage V_LL (kV)</label>
          <input class="tool-textarea" id="sil-v" type="number" step="50" value="500.0" placeholder="500.0 kV (EHV Line)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sil-l">Inductance L (mH/km)</label>
          <input class="tool-textarea" id="sil-l" type="number" step="0.1" value="0.95" placeholder="0.95 mH/km" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sil-c">Capacitance C (nF/km)</label>
          <input class="tool-textarea" id="sil-c" type="number" step="1" value="12.0" placeholder="12.0 nF/km" />
        </div>
      </div>
      <div id="sil-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sil-res-sil" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">SIL = 887.4 MW Natural Load</span>
            <span class="stat-label">Surge Impedance Loading Natural Capacity (SIL = V_LL² / Z_c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sil-res-zc" style="font-weight:700;">Surge Impedance Z_c = 281.7 Ω (Zero Net Reactive VAR Generation: Q_L = Q_C)</span>
            <span class="stat-label">Characteristic Surge Impedance (Z_c = √(L/C))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('sil-v'), lEl = document.getElementById('sil-l'), cEl = document.getElementById('sil-c');
  const silResEl = document.getElementById('sil-res-sil'), zcResEl = document.getElementById('sil-res-zc');

  function update() {
    const V_kv = parseFloat(vEl.value), L_mH = parseFloat(lEl.value), C_nF = parseFloat(cEl.value);
    if (isNaN(V_kv) || isNaN(L_mH) || isNaN(C_nF) || V_kv <= 0 || L_mH <= 0 || C_nF <= 0) return;

    // Convert L to H/km (1e-3) and C to F/km (1e-9)
    // Surge impedance Z_c = sqrt( L / C )  [Ohms]
    const Z_c = Math.sqrt((L_mH * 1e-3) / (C_nF * 1e-9));

    // SIL in Megawatts: SIL = ( V_kv )^2 / Z_c  [MW]
    const SIL_MW = Math.pow(V_kv, 2) / Z_c;

    silResEl.textContent = 'SIL = ' + SIL_MW.toFixed(1) + ' MW (' + V_kv + ' kV EHV Line)';
    zcResEl.textContent = 'Surge Impedance Z_c = ' + Z_c.toFixed(1) + ' Ω (L = ' + L_mH + ' mH/km, C = ' + C_nF + ' nF/km | Flat Voltage Profile @ P = SIL)';
  }

  [vEl, lEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter transmission line-to-line RMS operating voltage $V_{\text{LL}}$ in kilovolts (kV).',
      'Enter per-unit-length series line inductance L in mH/km.',
      'Enter per-unit-length shunt line capacitance C in nF/km.',
      'Inspect characteristic surge impedance $Z_c$ in Ohms and natural Surge Impedance Loading (SIL) capacity in MW.'
    ],
    benefitTitle: 'Reactive Power Balance on High-Voltage Transmission Lines',
    benefitContent: 'At exact Surge Impedance Loading ($P = \text{SIL}$), reactive power generated by line shunt capacitance ($Q_C = \omega C V^2$) exactly cancels reactive power consumed by series line inductance ($Q_L = I^2 \omega L$), maintaining a perfectly flat voltage profile across hundreds of kilometers without requiring shunt reactor compensation.',
    faqs: [{ q: 'What happens when power flow is less than SIL (P < SIL)?', a: 'The line acts as a net capacitor, generating excess reactive VARs that cause voltage to rise at the receiving end (the Ferranti Effect), requiring inductive shunt reactors.' }]
  },

  // 19. Peek's Law High-Voltage Corona Discharge Inception Calculator
  {
    slug: 'corona-discharge-peek-law-critical-voltage-calculator',
    name: 'Peek\'s Law High-Voltage Conductor Corona Discharge Inception Calculator',
    description: 'Calculate high-voltage transmission overhead conductor corona discharge visual inception electric field (E_v = m_v · g₀ · δ · [1 + 0.301 / √(δ · r)]) in kV/cm and critical disruptive voltage (V_d) in kV.',
    category: 'Science',
    icon: 'text',
    keywords: ['corona discharge calculator', 'peeks law visual corona inception electric field formula online', 'high voltage overhead conductor corona loss calculator', 'critical disruptive voltage vd transmission line calculator', 'power line audible noise corona loss online'],
    order: 855,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Conductor Radius r (cm), Phase Spacing D (m), Surface Roughness m_0 & Air Density Factor δ',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cor-r">Radius r (cm)</label>
          <input class="tool-textarea" id="cor-r" type="number" step="any" value="1.50" placeholder="1.50 cm (30 mm Conductor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cor-d">Spacing D (m)</label>
          <input class="tool-textarea" id="cor-d" type="number" step="any" value="4.50" placeholder="4.50 m Phase Spacing" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cor-m0">Roughness m₀</label>
          <input class="tool-textarea" id="cor-m0" type="number" step="0.05" value="0.85" placeholder="0.85 (Stranded Conductor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cor-delta">Density δ</label>
          <input class="tool-textarea" id="cor-delta" type="number" step="0.05" value="1.00" placeholder="1.00 (Standard Air)" />
        </div>
      </div>
      <div id="cor-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cor-res-ev" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">E_v = 31.8 kV / cm Inception</span>
            <span class="stat-label">Visual Corona Inception Electric Field (E_v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cor-res-vd" style="color:var(--green-dark); font-weight:700;">Critical Disruptive Line Voltage V_d = 272.5 kV RMS (Line-to-Line V_LL = 472.0 kV)</span>
            <span class="stat-label">Critical Disruptive Line-to-Ground Breakdown Voltage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('cor-r'), dEl = document.getElementById('cor-d');
  const mEl = document.getElementById('cor-m0'), deltaEl = document.getElementById('cor-delta');
  const evResEl = document.getElementById('cor-res-ev'), vdResEl = document.getElementById('cor-res-vd');

  const g0_kv_cm = 21.2; // kV_rms / cm (30 kV_peak / cm breakdown strength of clean air)

  function update() {
    const r_cm = parseFloat(rEl.value), D_m = parseFloat(dEl.value);
    const m0 = parseFloat(mEl.value), delta = parseFloat(deltaEl.value);

    if (isNaN(r_cm) || isNaN(D_m) || isNaN(m0) || isNaN(delta) || r_cm <= 0 || D_m <= 0 || m0 <= 0 || delta <= 0) return;

    const D_cm = D_m * 100.0;

    // Peek's formula for visual critical electric field:
    // E_v = m0 * g0 * delta * ( 1 + 0.301 / sqrt(delta * r_cm) )  [kV_rms / cm]
    const E_v = m0 * g0_kv_cm * delta * (1.0 + (0.301 / Math.sqrt(delta * r_cm)));

    // Critical disruptive voltage (line to neutral rms):
    // V_d = m0 * g0 * delta * r_cm * ln( D_cm / r_cm )  [kV_rms]
    const V_d_ln = m0 * g0_kv_cm * delta * r_cm * Math.log(D_cm / r_cm);
    const V_LL_d = V_d_ln * Math.sqrt(3.0); // Line-to-line rms

    evResEl.textContent = 'E_v = ' + E_v.toFixed(1) + ' kV / cm Inception Field';
    vdResEl.textContent = 'Critical Disruptive V_LL = ' + V_LL_d.toFixed(1) + ' kV RMS (Line-to-Ground: ' + V_d_ln.toFixed(1) + ' kV @ Spacing D = ' + D_m + ' m)';
  }

  [rEl, dEl, mEl, deltaEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter high-voltage conductor outer radius r in centimeters.',
      'Enter phase-to-phase separation spacing D in meters.',
      'Enter conductor surface roughness irregularity factor $m_0$ (1.0 for polished round wire, 0.80 to 0.85 for stranded ACSR cables).',
      'Enter air density correction factor $\delta = \frac{3.92 p}{273 + T}$.',
      'Inspect visual corona onset electric field $E_v$ in kV/cm and critical disruptive phase-to-phase voltage limit $V_{\text{LL}}$.'
    ],
    benefitTitle: 'Frank W. Peek Jr. 1929 High-Voltage Corona Law',
    benefitContent: 'When local electric fields exceed air breakdown strength ($E > 30\text{ kV/cm}$), air molecules ionize into a glowing violet corona sheath, creating audible hissing noise, radio interference, and multi-megawatt transmission power losses that power utilities prevent by bundling 2 to 4 sub-conductors per phase.',
    faqs: [{ q: 'Why does conductor bundling suppress corona discharge?', a: 'Bundling multiple parallel sub-conductors increases the effective electrical radius ($r_{\text{eff}} = \sqrt{r \cdot s}$), reducing the surface electric field gradient below the corona threshold.' }]
  },

  // 20. Standard Lightning Impulse 1.2/50 μs Marx High-Voltage Waveform Calculator
  {
    slug: 'lightning-impulse-1.2-50-wave-generator-calculator',
    name: 'Standard Lightning Impulse 1.2 / 50 μs Marx Generator Waveform Calculator',
    description: 'Calculate IEC 60060-1 standardized lightning high-voltage surge impulse wave (V(t) = V₀ · (exp[-t / τ₂] - exp[-t / τ₁])) and tune front time T₁ = 1.2 μs and tail time T₂ = 50 μs Marx generator resistors.',
    category: 'Science',
    icon: 'text',
    keywords: ['lightning impulse calculator', 'marx generator 1.2 50 wave formula v of t online', 'iec 60060 lightning surge impulse voltage calculator', 'front time tail time lightning impulse calculator online', 'high voltage impulse test circuit sizing online'],
    order: 856,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Peak Impulse Voltage V₀ (kV), Generator Capacitance C₁ (nF) & Load Capacitance C₂ (pF)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ltg-v0">Peak Voltage V₀ (kV)</label>
          <input class="tool-textarea" id="ltg-v0" type="number" step="100" value="1050.0" placeholder="1050.0 kV (1.05 MV BIL)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ltg-c1">Generator C₁ (nF)</label>
          <input class="tool-textarea" id="ltg-c1" type="number" step="5" value="25.0" placeholder="25.0 nF (Marx Bank)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ltg-c2">Load C₂ (pF)</label>
          <input class="tool-textarea" id="ltg-c2" type="number" step="200" value="1000.0" placeholder="1000.0 pF (Divider)" />
        </div>
      </div>
      <div id="ltg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ltg-res-times" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T₁ = 1.20 μs / T₂ = 50.0 μs Wave</span>
            <span class="stat-label">IEC 60060-1 Standard Lightning Impulse Waveform</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ltg-res-res" style="font-weight:700;">Front Resistor R₁ = 450 Ω | Tail Resistor R₂ = 2,050 Ω (Marx Energy: 13.8 kJ @ 1.05 MV)</span>
            <span class="stat-label">Tuned Marx Circuit Damping & Tail Resistors</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v0El = document.getElementById('ltg-v0'), c1El = document.getElementById('ltg-c1'), c2El = document.getElementById('ltg-c2');
  const tmResEl = document.getElementById('ltg-res-times'), rsResEl = document.getElementById('ltg-res-res');

  function update() {
    const V0_kv = parseFloat(v0El.value), C1_nf = parseFloat(c1El.value), C2_pf = parseFloat(c2El.value);
    if (isNaN(V0_kv) || isNaN(C1_nf) || isNaN(C2_pf) || V0_kv <= 0 || C1_nf <= 0 || C2_pf <= 0) return;

    const C1_f = C1_nf * 1e-9;
    const C2_f = C2_pf * 1e-12;

    // Time constants for exact 1.2 / 50 us wave:
    // tau1 approx = 0.405 us, tau2 approx = 68.2 us
    const tau1_sec = 0.405e-6;
    const tau2_sec = 68.2e-6;

    // Front damping resistance R1 approx = tau1 / C2
    const R1_ohms = tau1_sec / C2_f;
    // Tail discharge resistance R2 approx = tau2 / (C1 + C2)
    const R2_ohms = tau2_sec / (C1_f + C2_f);

    // Stored electrostatic energy E = 0.5 * C1 * V0^2  [Joules -> kJ]
    const Energy_J = 0.5 * C1_f * Math.pow(V0_kv * 1000.0, 2);
    const Energy_kJ = Energy_J / 1000.0;

    tmResEl.textContent = 'T₁ = 1.20 μs (Front) / T₂ = 50.0 μs (Tail) Wave';
    rsResEl.textContent = 'R₁ = ' + Math.round(R1_ohms) + ' Ω (Front Damping) | R₂ = ' + Math.round(R2_ohms) + ' Ω (Tail) | Marx Stored Energy: ' + Energy_kJ.toFixed(1) + ' kJ';
  }

  [v0El, c1El, c2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter required Peak Basic Lightning Impulse Insulation Level (BIL) $V_0$ in kilovolts (kV).',
      'Enter Marx surge impulse generator primary bank capacitance $C_1$ in nF.',
      'Enter high-voltage capacitive voltage divider load $C_2$ in pF.',
      'Inspect tuned front damping resistor $R_1$ and tail resistor $R_2$ required to synthesize the standard IEC 60060 $1.2/50\ \mu\text{s}$ impulse wave.'
    ],
    benefitTitle: 'IEC 60060 High-Voltage Lightning Insulation Certification',
    benefitContent: 'High-voltage power transformers and substation switchgear must withstand standard $1.2/50\ \mu\text{s}$ simulated lightning surges (rising in $1.2\ \mu\text{s}$, decaying to 50% in $50\ \mu\text{s}$) to prove transformer turn insulation will not suffer catastrophic puncture breakdowns during thunderstorms.',
    faqs: [{ q: 'What does "BIL" stand for in power systems?', a: 'Basic Impulse Insulation Level (BIL) is the crest voltage of the standard $1.2/50\ \mu\text{s}$ wave that equipment insulation can withstand without flashover (e.g. 1050 kV BIL for 230 kV grid transformers).' }]
  },

  // --- Suite DDDDDD: Bioprocess Engineering, Fermentation & Enzyme Bioreactors (976 - 980) ---
  // 21. Monod Microbial Growth Kinetics & Chemostat Dilution Rate Calculator
  {
    slug: 'monod-microbial-growth-kinetics-chemostat-calculator',
    name: 'Monod Microbial Growth Kinetics (μ = μ_max·S / (K_s + S)) & Chemostat Calculator',
    description: 'Calculate bioreactor microbial specific growth rate (μ = μ_max · S / (K_s + S)) in h⁻¹, biomass doubling time (t_d = ln 2 / μ), and steady-state continuous chemostat dilution washout limits.',
    category: 'Science',
    icon: 'text',
    keywords: ['monod equation calculator', 'microbial growth kinetics formula mu equals mu max s over ks plus s online', 'chemostat dilution rate steady state biomass calculator', 'bioreactor doubling time monod kinetics calculator online', 'fermentation substrate consumption rate online'],
    order: 857,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Max Growth Rate μ_max (h⁻¹), Limiting Substrate S (g/L), Monod Constant K_s (g/L) & Yield Y_x/s',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mon-mumax">μ_max (h⁻¹)</label>
          <input class="tool-textarea" id="mon-mumax" type="number" step="0.1" value="0.80" placeholder="0.80 h⁻¹ (E. coli)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mon-s">Substrate S (g/L)</label>
          <input class="tool-textarea" id="mon-s" type="number" step="any" value="2.50" placeholder="2.50 g/L (Glucose)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mon-ks">Monod K_s (g/L)</label>
          <input class="tool-textarea" id="mon-ks" type="number" step="0.05" value="0.10" placeholder="0.10 g/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mon-yield">Yield Y_x/s (g/g)</label>
          <input class="tool-textarea" id="mon-yield" type="number" step="0.05" value="0.50" placeholder="0.50 g Cells / g Sugar" />
        </div>
      </div>
      <div id="mon-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mon-res-mu" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">μ = 0.769 h⁻¹ (Doubling: 54.1 min)</span>
            <span class="stat-label">Specific Microbial Growth Rate (μ) & Generation Doubling Time</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mon-res-chem" style="color:var(--green-dark); font-weight:700;">Chemostat Dilution D = μ = 0.769 h⁻¹ | Washout Threshold D_crit = 0.77 h⁻¹</span>
            <span class="stat-label">Continuous Bioreactor Chemostat Operation & Washout Limit</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mmEl = document.getElementById('mon-mumax'), sEl = document.getElementById('mon-s');
  const ksEl = document.getElementById('mon-ks'), yEl = document.getElementById('mon-yield');
  const muResEl = document.getElementById('mon-res-mu'), chResEl = document.getElementById('mon-res-chem');

  function update() {
    const mu_max = parseFloat(mmEl.value), S = parseFloat(sEl.value);
    const K_s = parseFloat(ksEl.value), Y_xs = parseFloat(yEl.value);

    if (isNaN(mu_max) || isNaN(S) || isNaN(K_s) || isNaN(Y_xs) || mu_max <= 0 || S < 0 || K_s <= 0 || Y_xs <= 0) return;

    // Monod equation: mu = mu_max * S / ( K_s + S )  [h^-1]
    const mu = (mu_max * S) / (K_s + S);

    // Doubling generation time t_d = ln(2) / mu  [hours -> minutes]
    const t_d_hours = Math.log(2) / mu;
    const t_d_min = t_d_hours * 60.0;

    // Chemostat critical washout dilution rate D_crit = mu_max * S0 / (Ks + S0)
    const D_crit = mu;

    muResEl.textContent = 'μ = ' + mu.toFixed(3) + ' h⁻¹ (Doubling: ' + t_d_min.toFixed(1) + ' min)';
    chResEl.textContent = 'Steady Chemostat D = μ = ' + mu.toFixed(3) + ' h⁻¹ (Yield Y = ' + Y_xs + ' g/g | ' + (mu / mu_max * 100).toFixed(1) + '% of μ_max @ S = ' + S + ' g/L)';
  }

  [mmEl, sEl, ksEl, yEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter maximum specific growth rate $\mu_{\max}$ in $h^{-1}$ (e.g. 0.80 $h^{-1}$ for *E. coli* bacteria).',
      'Enter growth-limiting substrate concentration S in g/L (e.g. glucose nutrient).',
      'Enter Monod affinity constant $K_s$ in g/L (substrate concentration supporting $\mu = 0.5 \mu_{\max}$).',
      'Enter biomass-to-substrate conversion yield $Y_{X/S}$ (g dry cell weight per g substrate consumed).',
      'Inspect specific growth rate $\mu$, biomass doubling generation time in minutes, and continuous chemostat steady-state dilution rate ($D = \mu$).'
    ],
    benefitTitle: 'Jacques Monod 1949 Microbial Growth Kinetics',
    benefitContent: 'The Monod hyperbolic kinetic curve ($\mu = \frac{\mu_{\max} S}{K_s + S}$) mirrors Michaelis-Menten enzyme kinetics, allowing industrial biopharmaceutical engineers to optimize continuous bioreactor feeding rates for recombinant protein, insulin, and monoclonal antibody production.',
    faqs: [{ q: 'What happens when continuous chemostat dilution rate exceeds μ_max (D > μ_max)?', a: 'Cell washout occurs: liquid nutrient pumping flushes microbes out faster than they can divide, dropping biomass concentration in the fermenter to zero.' }]
  },

  // 22. Lineweaver-Burk Double-Reciprocal Enzyme Kinetics (K_m & V_max) Calculator
  {
    slug: 'lineweaver-burk-enzyme-inhibition-km-vmax-calculator',
    name: 'Lineweaver-Burk Double-Reciprocal Enzyme Kinetics (K_m & V_max) Calculator',
    description: 'Calculate enzyme kinetic parameters (K_m and V_max) and classify Competitive, Non-Competitive, and Uncompetitive enzyme inhibition from double-reciprocal plots (1/V = (K_m / V_max) · (1/[S]) + 1/V_max).',
    category: 'Science',
    icon: 'text',
    keywords: ['lineweaver burk calculator', 'double reciprocal enzyme kinetics formula 1 over v equals km over vmax 1 over s online', 'enzyme inhibition competitive noncompetitive calculator', 'michaelis menten km vmax lineweaver burk calculator online', 'biochemistry enzyme kinetics linear plot online'],
    order: 858,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Slope (K_m / V_max), Y-Intercept (1 / V_max) & Inhibition Mode (Uninhibited, Competitive, Non-Competitive)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lb-vmax">V_max (μmol/min)</label>
          <input class="tool-textarea" id="lb-vmax" type="number" step="5" value="50.0" placeholder="50.0 μmol/min" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lb-km">K_m (mM)</label>
          <input class="tool-textarea" id="lb-km" type="number" step="0.5" value="2.5" placeholder="2.5 mM" />
        </div>
        <div class="control-group" style="grid-column:1 / -1;">
          <label class="control-label" for="lb-mode">Inhibition Type</label>
          <select class="tool-textarea" id="lb-mode">
            <option value="none" selected>Uninhibited Native Enzyme (K_m = 2.5 mM, V_max = 50 μmol/min)</option>
            <option value="comp">Competitive Inhibition (Increases K_m,app to 5.0 mM | V_max Unchanged)</option>
            <option value="noncomp">Non-Competitive Inhibition (Halves V_max to 25 μmol/min | K_m Unchanged)</option>
            <option value="uncomp">Uncompetitive Inhibition (Decreases both K_m and V_max by 2×)</option>
          </select>
        </div>
      </div>
      <div id="lb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lb-res-eq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1/V = 0.050·(1/[S]) + 0.020</span>
            <span class="stat-label">Lineweaver-Burk Linear Regression Equation</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lb-res-int" style="color:var(--green-dark); font-weight:700;">y-Intercept = 1/V_max = 0.020 | x-Intercept = -1/K_m = -0.400 mM⁻¹</span>
            <span class="stat-label">Intercept Coordinates & Apparent Kinetic Parameters</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vmEl = document.getElementById('lb-vmax'), kmEl = document.getElementById('lb-km'), mdEl = document.getElementById('lb-mode');
  const eqResEl = document.getElementById('lb-res-eq'), intResEl = document.getElementById('lb-res-int');

  function update() {
    const base_vmax = parseFloat(vmEl.value), base_km = parseFloat(kmEl.value);
    const mode = mdEl.value;

    if (isNaN(base_vmax) || isNaN(base_km) || base_vmax <= 0 || base_km <= 0) return;

    let V_max = base_vmax;
    let K_m = base_km;

    if (mode === 'comp') {
      K_m = base_km * 2.0; // Competitive increases apparent Km
    } else if (mode === 'noncomp') {
      V_max = base_vmax / 2.0; // Non-competitive reduces Vmax
    } else if (mode === 'uncomp') {
      K_m = base_km / 2.0;
      V_max = base_vmax / 2.0;
    }

    // Lineweaver-Burk: 1/V = (Km / Vmax) * (1/[S]) + (1 / Vmax)
    const slope = K_m / V_max;
    const y_intercept = 1.0 / V_max;
    const x_intercept = -1.0 / K_m;

    eqResEl.textContent = '1/V = ' + slope.toFixed(3) + '·(1/[S]) + ' + y_intercept.toFixed(3);
    intResEl.textContent = 'Apparent K_m = ' + K_m.toFixed(2) + ' mM | V_max = ' + V_max.toFixed(1) + ' μmol/min (y-int: ' + y_intercept.toFixed(3) + ', x-int: ' + x_intercept.toFixed(3) + ' mM⁻¹)';
  }

  [vmEl, kmEl].forEach(el => el.addEventListener('input', update));
  mdEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter native maximum enzymatic velocity $V_{\max}$ in $\mu\text{mol/min}$.',
      'Enter Michaelis-Menten affinity constant $K_m$ in mM.',
      'Select drug inhibitor mechanism (Uninhibited, Competitive, Non-Competitive, Uncompetitive).',
      'Inspect Lineweaver-Burk double-reciprocal slope ($K_m / V_{\max}$), Y-intercept ($1/V_{\max}$), and X-intercept ($-1/K_m$).'
    ],
    benefitTitle: 'Hans Lineweaver & Dean Burk 1934 Linear Kinetic Transformation',
    benefitContent: 'Taking the reciprocal of the Michaelis-Menten equation linearizes non-linear enzyme saturation data ($\frac{1}{V} = \frac{K_m}{V_{\max}}\frac{1}{[S]} + \frac{1}{V_{\max}}$), allowing pharmaceutical biochemists to identify whether drug candidates compete directly at the active binding pocket (Competitive) or bind an allosteric regulatory site (Non-Competitive).',
    faqs: [{ q: 'How does competitive inhibition look on a Lineweaver-Burk plot?', a: 'Lines for uninhibited and competitively inhibited enzymes intersect at the exact same Y-intercept ($1/V_{\max}$), pivoting upwards to a more negative X-intercept (higher apparent $K_m$).' }]
  },

  // 23. Bioreactor Volumetric Oxygen Transfer Coefficient (k_L a) Calculator
  {
    slug: 'bioreactor-kla-volumetric-oxygen-transfer-calculator',
    name: 'Bioreactor Volumetric Oxygen Mass Transfer (k_L·a) & Oxygen Transfer Rate (OTR) Calculator',
    description: 'Calculate aerobic fermentation bioreactor Oxygen Transfer Rate (OTR = k_L·a · (C* - C_L)) in mmol/(L·h) and estimate volumetric mass transfer coefficient k_L·a (h⁻¹) from gas sparging superficial velocity and impeller power input.',
    category: 'Science',
    icon: 'text',
    keywords: ['kla calculator', 'volumetric oxygen mass transfer coefficient formula kla online', 'oxygen transfer rate otr bioreactor calculator', 'aerobic fermentation dissolved oxygen kla calculator', 'biochemical engineering kla gassing out online'],
    order: 859,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Volumetric Transfer k_L·a (h⁻¹), Saturation DO C* (mg/L) & Operating Dissolved Oxygen C_L (mg/L)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kla-val">Transfer k_L·a (h⁻¹)</label>
          <input class="tool-textarea" id="kla-val" type="number" step="25" value="150.0" placeholder="150.0 h⁻¹ (Fed-Batch)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kla-cstar">Sat DO C* (mg/L)</label>
          <input class="tool-textarea" id="kla-cstar" type="number" step="any" value="7.80" placeholder="7.80 mg/L (Air Saturation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kla-cl">Current DO C_L</label>
          <input class="tool-textarea" id="kla-cl" type="number" step="any" value="2.34" placeholder="2.34 mg/L (30% Air Sat)" />
        </div>
      </div>
      <div id="kla-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kla-res-otr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">OTR = 819.0 mg / (L·h)</span>
            <span class="stat-label">Volumetric Oxygen Transfer Rate (OTR)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kla-res-mmol" style="color:var(--green-dark); font-weight:700;">25.6 mmol O₂ / (L·h) (Driving Force ΔC = 5.46 mg/L | Supports ~51 g/L Yeast Biomass)</span>
            <span class="stat-label">Molar Oxygen Flux & Maximum Sustainable Aerobic Cell Density</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const klaEl = document.getElementById('kla-val'), csEl = document.getElementById('kla-cstar'), clEl = document.getElementById('kla-cl');
  const otrResEl = document.getElementById('kla-res-otr'), mmResEl = document.getElementById('kla-res-mmol');

  function update() {
    const kla = parseFloat(klaEl.value), C_star = parseFloat(csEl.value), C_L = parseFloat(clEl.value);
    if (isNaN(kla) || isNaN(C_star) || isNaN(C_L) || kla <= 0 || C_star <= C_L || C_L < 0) return;

    // Driving concentration gradient delta_C = C* - C_L  [mg / L]
    const delta_C = C_star - C_L;

    // Oxygen Transfer Rate OTR = k_L_a * (C* - C_L)  [mg / (L * h)]
    const OTR_mg_l_h = kla * delta_C;

    // Molar OTR in mmol / (L * h) (Molecular weight O2 = 32 mg / mmol)
    const OTR_mmol_l_h = OTR_mg_l_h / 32.0;

    // Supported dry cell biomass estimation (typical OUR = 0.5 mmol O2 / g dry cell * h):
    const maxBiomass = OTR_mmol_l_h / 0.50;

    otrResEl.textContent = 'OTR = ' + OTR_mg_l_h.toFixed(1) + ' mg / (L·h)';
    mmResEl.textContent = OTR_mmol_l_h.toFixed(1) + ' mmol O₂/(L·h) (Driving Force ΔC = ' + delta_C.toFixed(2) + ' mg/L | Supports ~' + Math.round(maxBiomass) + ' g/L Cells @ k_L·a = ' + kla + ' h⁻¹)';
  }

  [klaEl, csEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter volumetric gas-liquid oxygen mass transfer coefficient $k_L a$ in $h^{-1}$.',
      'Enter dissolved oxygen saturation equilibrium concentration $C^*$ in mg/L (typically $\sim 7.8\text{ mg/L}$ for air-saturated water at 30°C).',
      'Enter actual operational dissolved oxygen setpoint $C_L$ in mg/L (typically 20% to 30% air saturation).',
      'Inspect volumetric Oxygen Transfer Rate (OTR) in $\text{mg/(L}\cdot\text{h)}$ and $\text{mmol/(L}\cdot\text{h)}$ and maximum sustainable high-density aerobic biomass.'
    ],
    benefitTitle: 'Two-Film Gas-Liquid Mass Transfer in Bioreactors',
    benefitContent: 'Because oxygen has very low solubility in aqueous broth ($\sim 8\text{ ppm}$), oxygen transfer from sparged air bubbles into the liquid broth ($OTR = k_L a [C^* - C_L]$) is the primary rate-limiting bottleneck in industrial antibiotic, vaccine, and microbial biofuel fermentations.',
    faqs: [{ q: 'How do fermenter operators increase kLa during peak cell growth?', a: 'By increasing Rushton turbine impeller agitation RPM (shearing bubbles into higher interfacial area $a$) and boosting sterile compressed air sparging flow rate.' }]
  },

  // 24. Batch Liquid Sterilization Del Factor (∇) & Thermal Death Time Calculator
  {
    slug: 'batch-sterilization-del-factor-arrhenius-calculator',
    name: 'Batch Liquid Media Thermal Sterilization Del Factor (∇ = ln(N₀ / N_t)) Calculator',
    description: 'Calculate industrial fermentation liquid growth media thermal batch sterilization Del sterilization ratio (∇ = ln(N₀ / N_t)) and required holding kill time t_hold in minutes at 121°C from Arrhenius thermal spore death kinetics.',
    category: 'Science',
    icon: 'text',
    keywords: ['del factor calculator', 'batch sterilization formula nabla equals ln n0 over nt online', 'thermal spore death kinetics arrhenius del factor calculator', 'autoclave 121c sterilization hold time calculator', 'geobacillus stearothermophilus spore kill time online'],
    order: 860,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sterilization Temp T (°C), Initial Bioburden Spores N₀ & Contamination Risk Limit N_t (10⁻³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ster-temp">Temp T (°C)</label>
          <input class="tool-textarea" id="ster-temp" type="number" step="1" value="121.0" placeholder="121.0 °C (Standard Steam)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ster-n0">Initial Spores N₀</label>
          <input class="tool-textarea" id="ster-n0" type="number" step="any" value="1.0e11" placeholder="1.0e11 (10,000 L Tank)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ster-nt">Target Risk N_t</label>
          <input class="tool-textarea" id="ster-nt" type="number" step="any" value="1.0e-3" placeholder="1.0e-3 (1 in 1000 Failure)" />
        </div>
      </div>
      <div id="ster-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ster-res-del" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">∇ = 32.24 Del Factor</span>
            <span class="stat-label">Total Required Sterilization Criterion (∇ = ln(N₀ / N_t))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ster-res-time" style="font-weight:700;">Hold Time t_hold = 18.4 Minutes @ 121°C (Specific Spore Death k = 1.75 min⁻¹)</span>
            <span class="stat-label">Required Isothermal Holding Sterilization Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('ster-temp'), n0El = document.getElementById('ster-n0'), ntEl = document.getElementById('ster-nt');
  const dResEl = document.getElementById('ster-res-del'), tmResEl = document.getElementById('ster-res-time');

  // Standard Arrhenius parameters for resistant Geobacillus stearothermophilus spores:
  const Ea_J_mol = 283000.0; // 283 kJ / mol
  const A_prefactor = 5.7e36; // min^-1
  const R_gas = 8.314462;

  function update() {
    const TC = parseFloat(tEl.value), N0 = parseFloat(n0El.value), Nt = parseFloat(ntEl.value);
    if (isNaN(TC) || isNaN(N0) || isNaN(Nt) || N0 <= 0 || Nt <= 0 || N0 <= Nt) return;

    const TK = TC + 273.15;

    // Del factor nabla = ln( N0 / Nt )
    const nabla = Math.log(N0 / Nt);

    // Specific thermal death rate k = A * exp( -Ea / (R * T) )  [min^-1]
    const k_death_min = A_prefactor * Math.exp(-Ea_J_mol / (R_gas * TK));

    // Required holding time t_hold = nabla / k  [minutes]
    const t_hold_min = nabla / k_death_min;

    dResEl.textContent = '∇ = ' + nabla.toFixed(2) + ' Del Factor (' + Math.round(nabla / Math.log(10)) + ' Log Reductions)';
    tmResEl.textContent = 't_hold = ' + t_hold_min.toFixed(1) + ' min @ ' + TC + '°C (k = ' + k_death_min.toFixed(2) + ' min⁻¹ | N₀ = ' + N0.toExponential(1) + ' -> N_t = ' + Nt.toExponential(1) + ')';
  }

  [tEl, n0El, ntEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter steam sterilization temperature in Celsius (typically 121°C for standard autoclaves, 140°C for Continuous HTST Sterilizers).',
      'Enter total initial heat-resistant bacterial spore bioburden count $N_0$ across the liquid batch (e.g. $10^{11}$ spores in a $10\text{ m}^3$ fermenter).',
      'Enter maximum acceptable statistical contamination failure risk probability $N_t$ (typically $10^{-3} = 1\text{ in }1,000$ batches).',
      'Inspect required Del Sterilization Factor ($\nabla = \ln(N_0/N_t)$) and necessary isothermal sterilization holding time in minutes.'
    ],
    benefitTitle: 'Aiba & Humphrey Arrhenius Thermal Spore Inactivation',
    benefitContent: 'Sterilization kinetics follow first-order logarithmic spore death ($dN/dt = -k N$); high-temperature short-time (HTST 140°C for 30 seconds) sterilization delivers the required Del factor ($\nabla \approx 32$) with significantly less vitamin and protein thermal nutrient degradation than 121°C autoclaving for 20 minutes.',
    faqs: [{ q: 'Why is Nt set to a fraction less than 1 (e.g. 10⁻³)?', a: '$N_t < 1$ represents the statistical probability of a surviving spore; $N_t = 10^{-3}$ guarantees a $99.9\%$ confidence that zero viable spores remain in the batch.' }]
  },

  // 25. Tangential Flow Ultrafiltration (TFF) Membrane Flux & TMP Calculator
  {
    slug: 'tangential-flow-ultrafiltration-flux-tff-membrane-calculator',
    name: 'Tangential Flow Ultrafiltration (TFF Membrane Flux J & TMP) Calculator',
    description: 'Calculate downstream biopharmaceutical protein concentration Tangential Flow Filtration Transmembrane Pressure (TMP = (P_feed + P_retentate)/2 - P_permeate) in bar/psi and filtrate permeate flux (J = TMP / (μ · [R_m + R_c])) in LMH (L/m²·h).',
    category: 'Science',
    icon: 'text',
    keywords: ['tff filtration calculator', 'transmembrane pressure formula tmp equals pfeed plus pretentate over 2 minus ppermeate', 'tangential flow ultrafiltration flux lmh calculator', 'biopharmaceutical protein concentration tff calculator online', 'membrane fouling resistance tff flux online'],
    order: 861,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Feed Pressure P_feed (bar), Retentate P_retentate (bar), Permeate P_permeate (bar) & Membrane Area (m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tff-pfeed">P_feed (bar)</label>
          <input class="tool-textarea" id="tff-pfeed" type="number" step="0.2" value="2.2" placeholder="2.2 bar (Inlet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tff-pret">P_retentate (bar)</label>
          <input class="tool-textarea" id="tff-pret" type="number" step="0.2" value="1.4" placeholder="1.4 bar (Outlet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tff-pperm">P_permeate (bar)</label>
          <input class="tool-textarea" id="tff-pperm" type="number" step="0.1" value="0.2" placeholder="0.2 bar (Filtrate)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tff-area">Area (m²)</label>
          <input class="tool-textarea" id="tff-area" type="number" step="0.5" value="2.5" placeholder="2.5 m² Cassette" />
        </div>
      </div>
      <div id="tff-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tff-res-tmp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">TMP = 1.60 bar (23.2 psi)</span>
            <span class="stat-label">Transmembrane Pressure Driving Force (TMP)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tff-res-flux" style="color:var(--green-dark); font-weight:700;">Permeate Flux J = 64.0 LMH (160.0 L/h Total Flow Rate | ΔP_channel = 0.80 bar)</span>
            <span class="stat-label">Volumetric Permeate Flux (LMH = L / m²·h) & Total Filtrate Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pfEl = document.getElementById('tff-pfeed'), prEl = document.getElementById('tff-pret');
  const ppEl = document.getElementById('tff-pperm'), aEl = document.getElementById('tff-area');
  const tmpResEl = document.getElementById('tff-res-tmp'), flxResEl = document.getElementById('tff-res-flux');

  // Baseline normalized permeability: 40 LMH per bar of TMP
  const permeability_LMH_bar = 40.0;

  function update() {
    const Pf = parseFloat(pfEl.value), Pr = parseFloat(prEl.value);
    const Pp = parseFloat(ppEl.value), Area = parseFloat(aEl.value);

    if (isNaN(Pf) || isNaN(Pr) || isNaN(Pp) || isNaN(Area) || Pf < Pr || Area <= 0) return;

    // Transmembrane Pressure TMP = (Pf + Pr)/2 - Pp  [bar]
    const TMP_bar = ((Pf + Pr) / 2.0) - Pp;
    const TMP_psi = TMP_bar * 14.5038;

    // Channel pressure drop DeltaP_channel = Pf - Pr  [bar]
    const deltaP_channel = Pf - Pr;

    // Permeate flux J = permeability * TMP  [LMH = Liters / m^2 * h]
    const J_LMH = Math.max(0, permeability_LMH_bar * TMP_bar);

    // Total volumetric flow rate Q_permeate = J * Area  [L / h]
    const Q_perm_L_h = J_LMH * Area;

    tmpResEl.textContent = 'TMP = ' + TMP_bar.toFixed(2) + ' bar (' + TMP_psi.toFixed(1) + ' psi)';
    flxResEl.textContent = 'Flux J = ' + J_LMH.toFixed(1) + ' LMH (' + Q_perm_L_h.toFixed(1) + ' L/h Filtrate | Channel ΔP = ' + deltaP_channel.toFixed(2) + ' bar @ Area = ' + Area + ' m²)';
  }

  [pfEl, prEl, ppEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter cassette feed inlet pressure $P_{\text{feed}}$ in bar.',
      'Enter retentate outlet valve pressure $P_{\text{retentate}}$ in bar.',
      'Enter permeate filtrate line pressure $P_{\text{permeate}}$ in bar.',
      'Enter total ultrafiltration cassette membrane surface area in $m^2$.',
      'Inspect Transmembrane Pressure (TMP) driving force in bar/psi, crossflow channel pressure drop ($\Delta P = P_{\text{feed}} - P_{\text{retentate}}$), and volumetric permeate flux in LMH ($\text{L/m}^2\cdot\text{h}$).'
    ],
    benefitTitle: 'Tangential Crossflow Ultrafiltration & Diafiltration',
    benefitContent: 'Unlike dead-end filters that rapidly clog with cake fouling, TFF sweeps fluid parallel to the membrane surface at high crossflow velocity ($\Delta P_{\text{channel}}$), creating hydrodynamic shear that prevents gel-layer polarization and concentrates fragile therapeutic monoclonal antibodies (mAbs) to $>150\text{ g/L}$.',
    faqs: [{ q: 'What is the definition of TMP in Tangential Flow Filtration?', a: '$\text{TMP} = \frac{P_{\text{feed}} + P_{\text{retentate}}}{2} - P_{\text{permeate}}$ represents the average net hydraulic pressure gradient driving solvent through the membrane pores.' }]
  }
];

pack28Tools.forEach(createTool);
console.log('Pack 28 complete: 25 tools created.');
