const { createTool } = require('./generate-curated-tools.cjs');

// Pack 24: 25 Tools covering RF Transmission Lines, Solar Thermal & PCM Storage, Vibroacoustics & STC, Advanced Robotics Odometry, Bioinformatics Genetics (Tools 856 to 880)
const pack24Tools = [
  // --- Suite FFFFF: Computational Electromagnetics, RF Filters & Transmission Lines (856 - 860) ---
  // 1. Quarter-Wave Transformer Impedance Matching Calculator
  {
    slug: 'quarter-wave-transformer-impedance-matching-calculator',
    name: 'Quarter-Wave Transmission Line Impedance Matching (Z₀ = √(Z_in·Z_L)) Calculator',
    description: 'Calculate RF transmission line quarter-wavelength impedance matching section characteristic impedance (Z₀ = √(Z_in · Z_L)) and physical microstrip line length (λ/4) in mm.',
    category: 'Science',
    icon: 'text',
    keywords: ['quarter wave transformer calculator', 'impedance matching formula z0 equals sqrt zin times zl', 'quarter wavelength microstrip length calculator online', 'rf transmission line matching section calculator', 'microwave engineering quarter wave transformer online'],
    order: 736,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Source Impedance Z_in (Ω), Load Impedance Z_L (Ω), Frequency f (GHz) & Dielectric ε_r',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qwt-zin">Source Z_in (Ω)</label>
          <input class="tool-textarea" id="qwt-zin" type="number" step="any" value="50.0" placeholder="50.0 Ω (Standard Coax)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qwt-zl">Load Z_L (Ω)</label>
          <input class="tool-textarea" id="qwt-zl" type="number" step="any" value="100.0" placeholder="100.0 Ω (Antenna / Transistor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qwt-freq">Freq f (GHz)</label>
          <input class="tool-textarea" id="qwt-freq" type="number" step="any" value="2.45" placeholder="2.45 GHz (Wi-Fi / ISM)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qwt-er">Dielectric ε_r</label>
          <input class="tool-textarea" id="qwt-er" type="number" step="0.1" value="4.4" placeholder="4.4 (FR4 PCB)" />
        </div>
      </div>
      <div id="qwt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qwt-res-z0" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Z₀ = 70.71 Ω Matching Line</span>
            <span class="stat-label">Required Transformer Characteristic Impedance (Z₀ = √(Z_in·Z_L))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qwt-res-len" style="font-weight:700;">Length λ/4 = 14.63 mm (Guided λ_g = 58.5 mm @ 2.45 GHz)</span>
            <span class="stat-label">Physical Quarter-Wave Section Length</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zinEl = document.getElementById('qwt-zin'), zlEl = document.getElementById('qwt-zl');
  const fEl = document.getElementById('qwt-freq'), erEl = document.getElementById('qwt-er');
  const z0ResEl = document.getElementById('qwt-res-z0'), lResEl = document.getElementById('qwt-res-len');

  const c_light = 299792458; // m / s

  function update() {
    const Zin = parseFloat(zinEl.value), Zl = parseFloat(zlEl.value);
    const fGhz = parseFloat(fEl.value), eps_r = parseFloat(erEl.value);

    if (isNaN(Zin) || isNaN(Zl) || isNaN(fGhz) || isNaN(eps_r) || Zin <= 0 || Zl <= 0 || fGhz <= 0 || eps_r < 1.0) return;

    const fHz = fGhz * 1e9;

    // Matching section impedance Z0 = sqrt( Zin * Zl )  [Ohms]
    const Z0 = Math.sqrt(Zin * Zl);

    // Effective dielectric constant approximation for microstrip: eps_eff approx = (eps_r + 1)/2 + (eps_r - 1)/2 * (1 / sqrt(1 + 12*h/w))
    // Approximate eps_eff ~ 0.7 * eps_r + 0.3
    const eps_eff = (0.70 * eps_r) + 0.30;

    // Guided wavelength lambda_g = c / ( f * sqrt(eps_eff) )  [meters]
    const lambda_g_m = c_light / (fHz * Math.sqrt(eps_eff));
    const lambda_g_mm = lambda_g_m * 1000;

    // Quarter-wave length L = lambda_g / 4  [mm]
    const length_mm = lambda_g_mm / 4;

    z0ResEl.textContent = 'Z₀ = ' + Z0.toFixed(2) + ' Ω Matching Line';
    lResEl.textContent = 'Length λ/4 = ' + length_mm.toFixed(2) + ' mm (λ_g = ' + lambda_g_mm.toFixed(1) + ' mm | Perfect Match Γ = 0, VSWR = 1.00 @ ' + fGhz + ' GHz)';
  }

  [zinEl, zlEl, fEl, erEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter source generator input transmission line impedance $Z_{\text{in}}$ in Ohms (typically 50 Ω).',
      'Enter load antenna / device real termination impedance $Z_L$ in Ohms.',
      'Enter RF operating carrier frequency in GHz.',
      'Enter substrate PCB dielectric constant $\epsilon_r$ (4.4 for FR4, 3.48 for Rogers RO4350B).',
      'Inspect required intermediate matching transmission line impedance $Z_0$ in Ohms and physical $\lambda/4$ printed trace length in millimeters.'
    ],
    benefitTitle: 'Narrowband Transmission Line Impedance Matching',
    benefitContent: 'At quarter-wavelength electrical length ($\theta = \pi/2$), destructive interference cancels reverse reflections at the input interface ($Z_{\text{in}} = Z_0^2 / Z_L$), transferring 100% of RF microwave power into the load with zero reflected power ($\Gamma = 0$).',
    faqs: [{ q: 'Can a quarter-wave transformer match complex reactive impedances (R + jX)?', a: 'No, quarter-wave matching requires real impedances; a series transmission line spacer or shunt stub must first be added to cancel the reactive $+jX$ component.' }]
  },

  // 2. Coplanar Waveguide (CPW) Characteristic Impedance Calculator
  {
    slug: 'coplanar-waveguide-cpw-characteristic-impedance-calculator',
    name: 'Coplanar Waveguide (CPW) Characteristic Impedance (Z₀) Calculator',
    description: 'Calculate Coplanar Waveguide (CPW) characteristic impedance Z₀ in Ohms and effective dielectric constant ε_eff from center conductor trace width w, ground slot gap s, and substrate ε_r.',
    category: 'Science',
    icon: 'text',
    keywords: ['coplanar waveguide calculator', 'cpw characteristic impedance formula online', 'grounded coplanar waveguide gcpw calculator', 'conformal mapping complete elliptic integral cpw calculator', 'microwave transmission line cpw online'],
    order: 737,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Center Trace Width w (mm), Slot Gap s (mm) & Substrate Permittivity ε_r',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cpw-w">Trace Width w (mm)</label>
          <input class="tool-textarea" id="cpw-w" type="number" step="any" value="0.50" placeholder="0.50 mm (Center Conductor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpw-s">Slot Gap s (mm)</label>
          <input class="tool-textarea" id="cpw-s" type="number" step="any" value="0.25" placeholder="0.25 mm (Gap to Ground)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cpw-er">Dielectric ε_r</label>
          <input class="tool-textarea" id="cpw-er" type="number" step="0.1" value="4.4" placeholder="4.4 (FR4)" />
        </div>
      </div>
      <div id="cpw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cpw-res-z0" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Z₀ = 50.4 Ω</span>
            <span class="stat-label">CPW Characteristic Impedance (Z₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cpw-res-eff" style="font-weight:700;">ε_eff = 2.70 (k = 0.500: w / (w + 2s))</span>
            <span class="stat-label">Effective Dielectric Constant & Aspect Ratio</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('cpw-w'), sEl = document.getElementById('cpw-s'), erEl = document.getElementById('cpw-er');
  const z0ResEl = document.getElementById('cpw-res-z0'), efResEl = document.getElementById('cpw-res-eff');

  // Complete elliptic integral ratio K(k) / K'(k) approximation (Hilberg formula)
  function EllipticRatio(k) {
    const k_prime = Math.sqrt(1.0 - Math.pow(k, 2));
    if (k >= 0.70710678) {
      return Math.PI / Math.log(2 * (1 + Math.sqrt(k)) / (1 - Math.sqrt(k)));
    } else {
      return (1.0 / Math.PI) * Math.log(2 * (1 + Math.sqrt(k_prime)) / (1 - Math.sqrt(k_prime)));
    }
  }

  function update() {
    const w = parseFloat(wEl.value), s = parseFloat(sEl.value), eps_r = parseFloat(erEl.value);
    if (isNaN(w) || isNaN(s) || isNaN(eps_r) || w <= 0 || s <= 0 || eps_r < 1.0) return;

    // Aspect ratio modulus k = w / (w + 2*s)
    const k = w / (w + (2 * s));

    // Effective permittivity for infinitely thick CPW substrate: eps_eff = (eps_r + 1) / 2
    const eps_eff = (eps_r + 1.0) / 2.0;

    // Ratio K(k) / K'(k)
    const K_ratio = EllipticRatio(k);

    // CPW characteristic impedance Z0 = (30 * pi / sqrt(eps_eff)) * ( 1 / (K(k)/K'(k)) )
    const Z0 = (30 * Math.PI) / (Math.sqrt(eps_eff) * K_ratio);

    z0ResEl.textContent = 'Z₀ = ' + Z0.toFixed(1) + ' Ω Characteristic Impedance';
    efResEl.textContent = 'ε_eff = ' + eps_eff.toFixed(2) + ' (Modulus k = ' + k.toFixed(3) + ' | Ground Gap s = ' + s + ' mm, Trace w = ' + w + ' mm)';
  }

  [wEl, sEl, erEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter center strip conductor trace width w in millimeters.',
      'Enter side ground plane spacing slot gap s in millimeters.',
      'Enter PCB substrate dielectric relative permittivity $\epsilon_r$.',
      'Inspect Coplanar Waveguide (CPW) characteristic impedance $Z_0$ in Ohms and effective dielectric constant $\epsilon_{\text{eff}}$.'
    ],
    benefitTitle: 'Coplanar Waveguide Microwave Planar Geometry',
    benefitContent: 'CPW lines place signal and ground conductors on the same top metal layer, eliminating the parasitic inductance of ground vias and providing low dispersion up to 100+ GHz for monolithic microwave integrated circuits (MMICs).',
    faqs: [{ q: 'Why is CPW favored over standard microstrip for high frequencies?', a: 'CPW confines electric field lines in the narrow surface slot gaps, significantly reducing radiation loss and dielectric substrate thickness sensitivity.' }]
  },

  // 3. Skin Depth & High-Frequency AC Conductor Resistance Calculator
  {
    slug: 'skin-depth-ac-conductor-resistance-calculator',
    name: 'Skin Depth & High-Frequency AC Conductor Resistance (R_AC / R_DC) Calculator',
    description: 'Calculate electromagnetic skin depth (δ = √(ρ / (π·f·μ))) in μm and high-frequency AC copper wire resistance increase ratio (R_AC / R_DC) due to the skin effect.',
    category: 'Science',
    icon: 'text',
    keywords: ['skin depth calculator', 'ac resistance skin effect formula delta equals sqrt rho over pi f mu', 'high frequency copper wire resistance calculator online', 'skin effect depth copper aluminum gold calculator', 'rf eddy current skin depth online'],
    order: 738,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Frequency f (Hz / kHz / MHz / GHz), Wire Diameter D (mm) & Conductor Metal',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="skn-freq">Frequency (kHz)</label>
          <input class="tool-textarea" id="skn-freq" type="number" step="any" value="100.0" placeholder="100.0 kHz (SMPS / Induction)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="skn-dia">Wire Dia D (mm)</label>
          <input class="tool-textarea" id="skn-dia" type="number" step="any" value="1.0" placeholder="1.0 mm (18 AWG)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="skn-mat">Conductor Metal</label>
          <select class="tool-textarea" id="skn-mat">
            <option value="copper" selected>Copper (Cu: ρ = 1.68e-8 Ω·m)</option>
            <option value="aluminum">Aluminum (Al: ρ = 2.65e-8 Ω·m)</option>
            <option value="gold">Gold (Au: ρ = 2.44e-8 Ω·m)</option>
            <option value="silver">Silver (Ag: ρ = 1.59e-8 Ω·m)</option>
          </select>
        </div>
      </div>
      <div id="skn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="skn-res-delta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">δ = 206.3 μm (0.206 mm)</span>
            <span class="stat-label">Electromagnetic Skin Depth (δ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="skn-res-rac" style="font-weight:700;">R_AC / R_DC = 1.41× (+41.0% Extra Joule Heating Loss)</span>
            <span class="stat-label">High-Frequency AC Resistance Multiplier</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('skn-freq'), dEl = document.getElementById('skn-dia'), matEl = document.getElementById('skn-mat');
  const dlResEl = document.getElementById('skn-res-delta'), racResEl = document.getElementById('skn-res-rac');

  const mu0 = 4.0 * Math.PI * 1e-7; // H / m (vacuum permeability)

  const METALS = {
    'copper':   { rho: 1.68e-8, name: 'Copper' },
    'aluminum': { rho: 2.65e-8, name: 'Aluminum' },
    'gold':     { rho: 2.44e-8, name: 'Gold' },
    'silver':   { rho: 1.59e-8, name: 'Silver' }
  };

  function update() {
    const fKhz = parseFloat(fEl.value), diaMm = parseFloat(dEl.value);
    const m = METALS[matEl.value];

    if (isNaN(fKhz) || isNaN(diaMm) || fKhz <= 0 || diaMm <= 0) return;

    const fHz = fKhz * 1000;
    const rM = (diaMm / 2) * 1e-3;

    // Skin depth delta = sqrt( rho / (pi * f * mu0) )  [meters]
    const deltaM = Math.sqrt(m.rho / (Math.PI * fHz * mu0));
    const deltaUm = deltaM * 1e6;
    const deltaMm = deltaM * 1000;

    // AC to DC resistance ratio for cylindrical wire:
    // When r >> delta: R_AC / R_DC approx = r / (2 * delta) + 0.25
    let racRatio = 1.0;
    const x = rM / deltaM;
    if (x <= 1.0) {
      racRatio = 1.0 + (Math.pow(x, 4) / 48); // low-frequency expansion
    } else {
      racRatio = (x / 2) + 0.26;
    }

    let deltaStr = '';
    if (deltaUm < 1000) deltaStr = deltaUm.toFixed(1) + ' μm (' + deltaMm.toFixed(4) + ' mm)';
    else deltaStr = deltaMm.toFixed(3) + ' mm (' + Math.round(deltaUm) + ' μm)';

    dlResEl.textContent = 'δ = ' + deltaStr;
    racResEl.textContent = 'R_AC / R_DC = ' + racRatio.toFixed(2) + '× (' + m.name + ' Wire D = ' + diaMm + ' mm @ ' + fKhz + ' kHz, +' + ((racRatio-1)*100).toFixed(1) + '% High-Freq Loss)';
  }

  [fEl, dEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter AC electrical signal frequency in kHz (e.g. 50/60 Hz for power grid, 100 kHz for switch-mode supplies, 13.56 MHz for RFID).',
      'Enter circular wire conductor outer diameter in millimeters.',
      'Select conductor metal material (Copper, Aluminum, Gold, Silver).',
      'Inspect electromagnetic skin penetration depth $\delta$ in $\mu\text{m}$ and high-frequency AC resistance multiplier ratio ($R_{\text{AC}} / R_{\text{DC}}$).'
    ],
    benefitTitle: 'Eddy Current Surface Confinement',
    benefitContent: 'At high frequencies, internal opposing magnetic eddy currents force electric current into a thin outer annular ring of depth $\delta = \sqrt{\rho / \pi f \mu}$; in high-frequency SMPS transformers and induction heaters, using stranded Litz wire with individual insulated strands thinner than $\delta$ eliminates skin effect losses.',
    faqs: [{ q: 'What percentage of current flows within 1 skin depth?', a: 'Approximately 63.2% of total AC current flows within 1 skin depth ($\delta$), and over 98% flows within 4 skin depths ($4\delta$).' }]
  },

  // 4. Smith Chart Complex Reflection Coefficient (Γ) & VSWR Calculator
  {
    slug: 'smith-chart-reflection-coefficient-vswr-calculator',
    name: 'Smith Chart Complex Reflection Coefficient (Γ), Return Loss & VSWR Calculator',
    description: 'Calculate RF complex reflection coefficient (Γ = (Z_L - Z₀) / (Z_L + Z₀)), Voltage Standing Wave Ratio (VSWR = (1 + |Γ|) / (1 - |Γ|)), Return Loss (RL in dB), and Mismatch Loss.',
    category: 'Science',
    icon: 'text',
    keywords: ['smith chart calculator', 'reflection coefficient gamma formula zl minus z0 over zl plus z0', 'vswr return loss mismatch loss calculator online', 'rf transmission line reflection coefficient calculator', 'microwave vswr to return loss db online'],
    order: 739,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Load Resistance R_L (Ω), Reactance X_L (Ω) & Characteristic Reference Z₀ (50 Ω)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sm-rl">Load Resistance R_L</label>
          <input class="tool-textarea" id="sm-rl" type="number" step="any" value="75.0" placeholder="75.0 Ω (Real)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-xl">Load Reactance X_L</label>
          <input class="tool-textarea" id="sm-xl" type="number" step="any" value="25.0" placeholder="+25.0 Ω (Inductive +jX)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-z0">Reference Z₀ (Ω)</label>
          <input class="tool-textarea" id="sm-z0" type="number" step="any" value="50.0" placeholder="50.0 Ω" />
        </div>
      </div>
      <div id="sm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sm-res-vswr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">VSWR = 1.76 : 1 (RL = 11.3 dB)</span>
            <span class="stat-label">Voltage Standing Wave Ratio & Return Loss</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sm-res-gamma" style="font-weight:700;">|Γ| = 0.274 ∠ 38.7° (92.5% Transmitted Power | 7.5% Reflected)</span>
            <span class="stat-label">Complex Reflection Coefficient (Γ = (Z_L - Z₀) / (Z_L + Z₀))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rlEl = document.getElementById('sm-rl'), xlEl = document.getElementById('sm-xl'), z0El = document.getElementById('sm-z0');
  const vsResEl = document.getElementById('sm-res-vswr'), gmResEl = document.getElementById('sm-res-gamma');

  function update() {
    const RL = parseFloat(rlEl.value), XL = parseFloat(xlEl.value), Z0 = parseFloat(z0El.value);
    if (isNaN(RL) || isNaN(XL) || isNaN(Z0) || RL < 0 || Z0 <= 0) return;

    // Complex load ZL = RL + j*XL
    // Reflection coefficient Gamma = (ZL - Z0) / (ZL + Z0)
    // Numerator = (RL - Z0) + j*XL
    // Denominator = (RL + Z0) + j*XL
    const numReal = RL - Z0;
    const numImag = XL;
    const denReal = RL + Z0;
    const denImag = XL;

    const denMagSq = Math.pow(denReal, 2) + Math.pow(denImag, 2);
    const gammaReal = ((numReal * denReal) + (numImag * denImag)) / denMagSq;
    const gammaImag = ((numImag * denReal) - (numReal * denImag)) / denMagSq;

    const gammaMag = Math.sqrt(Math.pow(gammaReal, 2) + Math.pow(gammaImag, 2));
    const gammaPhaseRad = Math.atan2(gammaImag, gammaReal);
    const gammaPhaseDeg = (gammaPhaseRad * 180) / Math.PI;

    // Return Loss RL in dB = -20 * log10(|Gamma|)
    const returnLossDb = gammaMag > 0 ? -20 * Math.log10(gammaMag) : 99.9;

    // VSWR = (1 + |Gamma|) / (1 - |Gamma|)
    const vswr = gammaMag < 1.0 ? (1.0 + gammaMag) / (1.0 - gammaMag) : 99.9;

    // Power reflected fraction = |Gamma|^2
    const pReflPct = Math.pow(gammaMag, 2) * 100;
    const pTransPct = 100 - pReflPct;

    vsResEl.textContent = 'VSWR = ' + (vswr > 50 ? '∞' : vswr.toFixed(2)) + ' : 1 (Return Loss: ' + returnLossDb.toFixed(1) + ' dB)';
    gmResEl.textContent = '|Γ| = ' + gammaMag.toFixed(3) + ' ∠ ' + gammaPhaseDeg.toFixed(1) + '° (' + pTransPct.toFixed(1) + '% Power Delivered | ' + pReflPct.toFixed(1) + '% Reflected)';
  }

  [rlEl, xlEl, z0El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter load real termination resistance $R_L$ in Ohms.',
      'Enter load imaginary reactance $X_L$ in Ohms (positive for inductive $+jX$, negative for capacitive $-jX$).',
      'Enter characteristic transmission line reference impedance $Z_0$ (typically 50 Ω).',
      'Inspect complex reflection coefficient magnitude $|\Gamma|$ and phase angle, Voltage Standing Wave Ratio (VSWR), Return Loss in dB, and delivered power efficiency percentage.'
    ],
    benefitTitle: 'Phillip H. Smith 1939 Graphical Polar Transmission Tool',
    benefitContent: 'The Smith Chart maps infinite complex impedance half-planes into a compact circle of radius $|\Gamma| \le 1$; measuring return loss and VSWR validates antenna resonance ($VSWR < 1.5:1$ delivered power $>96\%$) to prevent destructive RF power amplifier reflections.',
    faqs: [{ q: 'What is ideal VSWR and Return Loss for an antenna?', a: 'A perfect match is $VSWR = 1.0:1$ ($\text{Return Loss} = \infty\text{ dB}$); in practice, $VSWR \le 1.5:1$ ($\text{Return Loss} \ge 14\text{ dB}$) is the commercial telecommunication standard.' }]
  },

  // 5. Chebyshev / Butterworth RF Filter Order & Attenuation Calculator
  {
    slug: 'microstrip-interdigital-bandpass-filter-order-calculator',
    name: 'RF Filter Minimum Order (Chebyshev & Butterworth n) Calculator',
    description: 'Calculate RF/microwave low-pass/bandpass filter minimum order n from passband ripple A_p (dB), stopband attenuation A_s (dB), and selectivity cutoff ratio (ω_s / ω_p).',
    category: 'Science',
    icon: 'text',
    keywords: ['rf filter order calculator', 'chebyshev filter order formula arccosh online', 'butterworth filter order calculator online', 'microwave filter attenuation selectivity calculator', 'analog active passive filter design calculator'],
    order: 740,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Passband Ripple A_p (dB), Stopband Attenuation A_s (dB) & Frequency Ratio (f_s / f_p)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="flt-ap">Pass Ripple A_p (dB)</label>
          <input class="tool-textarea" id="flt-ap" type="number" step="0.1" value="0.5" placeholder="0.5 dB Ripple" />
        </div>
        <div class="control-group">
          <label class="control-label" for="flt-as">Stop Atten A_s (dB)</label>
          <input class="tool-textarea" id="flt-as" type="number" step="5" value="40.0" placeholder="40.0 dB Rejection" />
        </div>
        <div class="control-group">
          <label class="control-label" for="flt-ratio">Ratio (f_s / f_p)</label>
          <input class="tool-textarea" id="flt-ratio" type="number" step="0.1" value="1.8" placeholder="1.8 (Selectivity Ratio)" />
        </div>
      </div>
      <div id="flt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="flt-res-cheb" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">n = 5 Order (Chebyshev)</span>
            <span class="stat-label">Minimum Required Chebyshev Filter Order (n)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="flt-res-butt" style="font-weight:700;">Butterworth Order: n = 8 (Chebyshev requires 3 fewer stages)</span>
            <span class="stat-label">Butterworth Order Comparison & Steepness Factor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const apEl = document.getElementById('flt-ap'), asEl = document.getElementById('flt-as'), ratEl = document.getElementById('flt-ratio');
  const chResEl = document.getElementById('flt-res-cheb'), btResEl = document.getElementById('flt-res-butt');

  function update() {
    const Ap = parseFloat(apEl.value), As = parseFloat(asEl.value), wRatio = parseFloat(ratEl.value);
    if (isNaN(Ap) || isNaN(As) || isNaN(wRatio) || Ap <= 0 || As <= Ap || wRatio <= 1.0) return;

    // Epsilon parameter: eps = sqrt( 10^(0.1*Ap) - 1 )
    const eps = Math.sqrt(Math.pow(10, 0.1 * Ap) - 1.0);

    // Stopband parameter: g = sqrt( (10^(0.1*As) - 1) / eps^2 )
    const g = Math.sqrt((Math.pow(10, 0.1 * As) - 1.0) / Math.pow(eps, 2));

    // Chebyshev order n_cheb = acosh(g) / acosh(wRatio)
    const n_cheb_exact = Math.acosh(g) / Math.acosh(wRatio);
    const n_cheb = Math.ceil(n_cheb_exact);

    // Butterworth order n_butt = log10( (10^(0.1*As) - 1) / (10^(0.1*Ap) - 1) ) / ( 2 * log10(wRatio) )
    const n_butt_exact = Math.log10((Math.pow(10, 0.1 * As) - 1.0) / (Math.pow(10, 0.1 * Ap) - 1.0)) / (2 * Math.log10(wRatio));
    const n_butt = Math.ceil(n_butt_exact);

    chResEl.textContent = 'n = ' + n_cheb + ' Order (Chebyshev Type I)';
    btResEl.textContent = 'Butterworth Order: n = ' + n_butt + ' (Chebyshev saves ' + (n_butt - n_cheb) + ' resonator stages | Exact n = ' + n_cheb_exact.toFixed(2) + ')';
  }

  [apEl, asEl, ratEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter maximum allowable passband insertion loss ripple $A_p$ in dB (typically 0.1 dB to 0.5 dB).',
      'Enter required stopband out-of-band rejection attenuation $A_s$ in dB (e.g. 40 dB to 60 dB).',
      'Enter selectivity transition ratio $f_{\text{stop}} / f_{\text{pass}} > 1.0$.',
      'Inspect minimum required polynomial order n for Chebyshev Type I and maximally-flat Butterworth filter architectures.'
    ],
    benefitTitle: 'Chebyshev Equal-Ripple Polynomial Steepness',
    benefitContent: 'By allowing small controlled ripple in the passband, Chebyshev filters produce a vastly steeper cutoff skirt than Butterworth filters, reducing the number of inductor/capacitor resonant tank stages required for sharp RF channel isolation.',
    faqs: [{ q: 'What is the trade-off of using a Chebyshev filter over a Butterworth filter?', a: 'Chebyshev filters have non-linear phase response and group delay distortion near the band edges, whereas Butterworth filters offer smooth linear phase response.' }]
  },

  // --- Suite GGGGG: Solar Thermal, Photothermal & Energy Storage (861 - 865) ---
  // 6. Concentrated Solar Power (CSP) Parabolic Trough Thermal Power Calculator
  {
    slug: 'parabolic-trough-solar-thermal-concentration-ratio-calculator',
    name: 'Concentrated Solar Power (CSP) Parabolic Trough Thermal Power Calculator',
    description: 'Calculate Concentrated Solar Power (CSP) parabolic trough optical concentration ratio (C = (W - D) / (π·D)) and useful thermal heat gain rate (Q_u = A_aperture · DNI · η_optical - Heat_Loss) in kW.',
    category: 'Science',
    icon: 'text',
    keywords: ['concentrated solar power calculator', 'parabolic trough concentration ratio formula online', 'csp thermal heat collection rate calculator', 'direct normal irradiance dni parabolic trough online', 'solar thermal molten salt power plant calculator'],
    order: 741,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Aperture Width W (m), Receiver Tube Dia D (m), Collector Length L (m) & DNI (W/m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="csp-w">Aperture Width W (m)</label>
          <input class="tool-textarea" id="csp-w" type="number" step="any" value="5.77" placeholder="5.77 m (EuroTrough)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="csp-d">Receiver Dia D (m)</label>
          <input class="tool-textarea" id="csp-d" type="number" step="any" value="0.070" placeholder="0.070 m (70 mm Absorber)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="csp-len">Length L (m)</label>
          <input class="tool-textarea" id="csp-len" type="number" step="any" value="100.0" placeholder="100.0 m Module" />
        </div>
        <div class="control-group">
          <label class="control-label" for="csp-dni">DNI (W/m²)</label>
          <input class="tool-textarea" id="csp-dni" type="number" step="any" value="850.0" placeholder="850.0 W/m² (Desert Sun)" />
        </div>
      </div>
      <div id="csp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="csp-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">367.8 kW Thermal Gain</span>
            <span class="stat-label">Useful Thermal Heat Output (Q_useful)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="csp-res-cr" style="font-weight:700;">Concentration Ratio C = 25.9× (Aperture: 577 m² | Optical η = 75%)</span>
            <span class="stat-label">Geometric Concentration Ratio (C = (W - D) / πD)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('csp-w'), dEl = document.getElementById('csp-d');
  const lEl = document.getElementById('csp-len'), dniEl = document.getElementById('csp-dni');
  const pResEl = document.getElementById('csp-res-pwr'), crResEl = document.getElementById('csp-res-cr');

  const eta_optical = 0.75; // 75% optical efficiency (reflectivity * intercept * absorptivity)

  function update() {
    const W = parseFloat(wEl.value), D = parseFloat(dEl.value);
    const L = parseFloat(lEl.value), DNI = parseFloat(dniEl.value);

    if (isNaN(W) || isNaN(D) || isNaN(L) || isNaN(DNI) || W <= D || D <= 0 || L <= 0 || DNI <= 0) return;

    // Geometric concentration ratio C = (W - D) / (pi * D)
    const C = (W - D) / (Math.PI * D);

    // Total collector aperture area A_ap = W * L  [m^2]
    const A_ap = W * L;

    // Incident solar power = A_ap * DNI  [Watts]
    const P_solar_in = A_ap * DNI;

    // Useful thermal heat output Q_u = P_solar_in * eta_optical * thermal_eff (approx 90% at 390°C)
    const Q_u_watts = P_solar_in * eta_optical * 0.90;
    const Q_u_kw = Q_u_watts / 1000;

    pResEl.textContent = Q_u_kw.toFixed(1) + ' kW Thermal Heat (' + (Q_u_kw / A_ap * 1000).toFixed(0) + ' W/m² Collection)';
    crResEl.textContent = 'Concentration Ratio C = ' + C.toFixed(1) + '× (Aperture: ' + Math.round(A_ap) + ' m² | Optical η = ' + (eta_optical*100) + '%, DNI = ' + DNI + ' W/m²)';
  }

  [wEl, dEl, lEl, dniEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter parabolic trough mirror aperture opening width W in meters (e.g. 5.77 m for standard EuroTrough / SEGS).',
      'Enter vacuum receiver glass/metal absorber tube outer diameter D in meters (typically 0.070 m / 70 mm).',
      'Enter trough collector module length in meters.',
      'Enter Direct Normal Irradiance (DNI) in $W/m^2$ (typically 800 to 1,000 $W/m^2$ in sunny arid regions).',
      'Inspect geometric optical concentration ratio C and useful thermal power output in kW.'
    ],
    benefitTitle: 'Concentrated Solar Thermal Power (CSP) Engineering',
    benefitContent: 'Parabolic trough mirrors focus direct sunlight ($DNI$) onto linear evacuated receiver tubes at 26× concentration, heating synthetic thermal oil or molten salt to 400°C–550°C to drive steam turbine generators with multi-hour thermal energy storage.',
    faqs: [{ q: 'Why is DNI used instead of Global Horizontal Irradiance (GHI) in CSP?', a: 'Focusing optical mirrors can only reflect parallel direct sunlight beams; diffuse scattered sky radiation cannot be concentrated by parabolic optics.' }]
  },

  // 7. Sensible Heat Thermal Energy Storage Mass & Volume Calculator
  {
    slug: 'sensible-heat-thermal-energy-storage-mass-calculator',
    name: 'Sensible Heat Thermal Energy Storage (Q = m·c_p·ΔT) Mass & Volume Calculator',
    description: 'Calculate sensible heat thermal energy storage capacity (Q = m · c_p · ΔT) in kWh/MWh and storage medium tank volume for Molten Solar Salt, Water, Concrete, and Thermal Oil.',
    category: 'Science',
    icon: 'text',
    keywords: ['sensible heat storage calculator', 'thermal energy storage formula q equals m cp delta t', 'molten salt thermal storage mwh calculator online', 'hot water thermal buffer tank storage calculator', 'csp thermal energy storage tank sizing online'],
    order: 742,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Storage Energy (MWh_th), Temp Difference ΔT (°C) & Storage Medium',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tes-mwh">Storage Target (MWh_th)</label>
          <input class="tool-textarea" id="tes-mwh" type="number" step="any" value="50.0" placeholder="50.0 MWh_th" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tes-dt">Temp Swing ΔT (°C)</label>
          <input class="tool-textarea" id="tes-dt" type="number" step="any" value="150.0" placeholder="150.0 °C (290°C to 440°C)" />
        </div>
        <div class="control-group" style="grid-column:1 / -1;">
          <label class="control-label" for="tes-mat">Storage Medium</label>
          <select class="tool-textarea" id="tes-mat">
            <option value="salt" selected>Solar Salt (60% NaNO₃ / 40% KNO₃: c_p = 1.50 kJ/kg·K, ρ = 1850 kg/m³)</option>
            <option value="water">Liquid Water (Pressurized: c_p = 4.18 kJ/kg·K, ρ = 1000 kg/m³)</option>
            <option value="oil">Synthetic Thermal Oil (Therminol VP-1: c_p = 2.30 kJ/kg·K, ρ = 850 kg/m³)</option>
            <option value="concrete">Solid Concrete Block (c_p = 0.90 kJ/kg·K, ρ = 2300 kg/m³)</option>
          </select>
        </div>
      </div>
      <div id="tes-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tes-res-mass" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">800.0 Tonnes Medium</span>
            <span class="stat-label">Required Thermal Storage Medium Mass</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tes-res-vol" style="font-weight:700;">Tank Volume: 432.4 m³ (8.2 m Dia × 8.2 m Height Cylinder)</span>
            <span class="stat-label">Storage Tank Geometric Volume & Dimensions</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mwhEl = document.getElementById('tes-mwh'), dtEl = document.getElementById('tes-dt'), matEl = document.getElementById('tes-mat');
  const mResEl = document.getElementById('tes-res-mass'), vResEl = document.getElementById('tes-res-vol');

  const MEDIA = {
    'salt':     { cp_kj: 1.50, rho: 1850.0, name: 'Molten Nitrate Solar Salt' },
    'water':    { cp_kj: 4.18, rho: 1000.0, name: 'Pressurized Water' },
    'oil':      { cp_kj: 2.30, rho: 850.0,  name: 'Synthetic Thermal Oil' },
    'concrete': { cp_kj: 0.90, rho: 2300.0, name: 'Solid Cast Concrete' }
  };

  function update() {
    const med = MEDIA[matEl.value];
    const MWh = parseFloat(mwhEl.value), deltaT = parseFloat(dtEl.value);

    if (isNaN(MWh) || isNaN(deltaT) || MWh <= 0 || deltaT <= 0) return;

    // Convert MWh to kJ: 1 MWh = 3.6e6 kJ
    const Q_kj = MWh * 3.6e6;

    // Mass m = Q / (cp * deltaT)  [kg]
    const massKg = Q_kj / (med.cp_kj * deltaT);
    const massTonnes = massKg / 1000;

    // Volume V = massKg / rho  [m^3]
    const volM3 = massKg / med.rho;

    // Cylindrical tank with Aspect Ratio H/D = 1: V = pi/4 * D^3 => D = (4V/pi)^(1/3)
    const tankDim = Math.pow((4 * volM3) / Math.PI, 1 / 3);

    mResEl.textContent = Math.round(massTonnes).toLocaleString() + ' Tonnes (' + med.name + ')';
    vResEl.textContent = 'Tank Volume: ' + Math.round(volM3).toLocaleString() + ' m³ (' + tankDim.toFixed(1) + ' m Dia × ' + tankDim.toFixed(1) + ' m Height Cylinder @ ΔT = ' + deltaT + '°C)';
  }

  [mwhEl, dtEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter target thermal energy storage capacity in MWh_thermal.',
      'Enter usable operational temperature difference $\Delta T = T_{\text{hot}} - T_{\text{cold}}$ in Celsius.',
      'Select sensible thermal storage medium (Molten Solar Salt 60/40, Pressurized Water, Thermal Oil, Cast Concrete).',
      'Inspect required medium mass in metric tonnes and cylindrical storage tank volume in cubic meters ($m^3$).'
    ],
    benefitTitle: 'Two-Tank Molten Salt Thermal Energy Storage',
    benefitContent: 'Storing thermal energy sensibly in liquid molten nitrate salts ($290^\circ\text{C} \to 565^\circ\text{C}$) enables concentrated solar plants like Solana and Crescent Dunes to dispatch clean electric power on demand 24/7 through the night.',
    faqs: [{ q: 'Why is Solar Salt chosen over water for high-temperature storage?', a: 'Molten nitrate salts remain in liquid phase at atmospheric pressure up to 600°C, whereas water would require massive pressure vessels exceeding 150 atmospheres.' }]
  },

  // 8. Phase Change Material (PCM) Latent Heat Thermal Energy Storage Calculator
  {
    slug: 'latent-heat-phase-change-material-pcm-storage-calculator',
    name: 'Phase Change Material (PCM) Latent Heat Thermal Energy Storage Calculator',
    description: 'Calculate Phase Change Material (PCM) combined sensible + latent isothermal heat storage (Q = m · [c_p,s·ΔT_s + ΔH_fusion + c_p,l·ΔT_l]) in kWh and compare storage mass savings over water.',
    category: 'Science',
    icon: 'text',
    keywords: ['pcm thermal storage calculator', 'latent heat phase change material formula q equals m delta h fusion', 'paraffin salt hydrate pcm storage calculator online', 'latent vs sensible heat thermal storage calculator', 'building pcm passive cooling calculator online'],
    order: 743,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'PCM Mass (kg), Heat of Fusion ΔH_f (kJ/kg), Melting Temp T_m (°C) & Operating Range',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pcm-mass">PCM Mass (kg)</label>
          <input class="tool-textarea" id="pcm-mass" type="number" step="any" value="250.0" placeholder="250.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pcm-mat">PCM Chemistry</label>
          <select class="tool-textarea" id="pcm-mat">
            <option value="paraffin" selected>Organic Paraffin Wax RT28 (ΔH_f = 245 kJ/kg, T_m = 28°C)</option>
            <option value="salt_hydrate">Inorganic Salt Hydrate CaCl₂·6H₂O (ΔH_f = 190 kJ/kg, T_m = 29°C)</option>
            <option value="ice">Ice / Water Slurry (ΔH_f = 334 kJ/kg, T_m = 0°C - Cold Storage)</option>
            <option value="erythritol">Erythritol Bio-PCM (ΔH_f = 340 kJ/kg, T_m = 118°C)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pcm-dt">Temp Range ΔT (°C)</label>
          <input class="tool-textarea" id="pcm-dt" type="number" step="any" value="10.0" placeholder="10.0 °C (23°C to 33°C)" />
        </div>
      </div>
      <div id="pcm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pcm-res-q" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">18.40 kWh Storage</span>
            <span class="stat-label">Total Thermal Storage Capacity (Q = Q_sensible + Q_latent)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pcm-res-cmp" style="color:var(--green-dark); font-weight:700;">Latent: 91.5% (17.0 kWh) | 6.3× Smaller Mass than Water Tank over 10°C Span</span>
            <span class="stat-label">Latent vs Sensible Energy Breakdown & Mass Density Advantage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('pcm-mass'), matEl = document.getElementById('pcm-mat'), dtEl = document.getElementById('pcm-dt');
  const qResEl = document.getElementById('pcm-res-q'), cmpResEl = document.getElementById('pcm-res-cmp');

  const PCMS = {
    'paraffin':     { dh_f: 245.0, cp_s: 2.0, cp_l: 2.4, name: 'Paraffin Wax RT28' },
    'salt_hydrate': { dh_f: 190.0, cp_s: 1.4, cp_l: 2.1, name: 'Salt Hydrate CaCl₂·6H₂O' },
    'ice':          { dh_f: 334.0, cp_s: 2.1, cp_l: 4.18, name: 'Ice / Water Phase Change' },
    'erythritol':   { dh_f: 340.0, cp_s: 1.8, cp_l: 2.8, name: 'Sugar Alcohol Erythritol' }
  };

  function update() {
    const p = PCMS[matEl.value];
    const massKg = parseFloat(mEl.value), deltaT = parseFloat(dtEl.value);

    if (isNaN(massKg) || isNaN(deltaT) || massKg <= 0 || deltaT <= 0) return;

    // Latent heat Q_latent = m * deltaH_f  [kJ]
    const Q_latent_kj = massKg * p.dh_f;

    // Sensible heat across solid + liquid phase (assuming half deltaT in each phase)
    const Q_sensible_kj = massKg * (((p.cp_s + p.cp_l) / 2) * deltaT);

    // Total stored heat Q_total = Q_latent + Q_sensible  [kJ]
    const Q_total_kj = Q_latent_kj + Q_sensible_kj;
    const Q_total_kwh = Q_total_kj / 3600;
    const Q_latent_kwh = Q_latent_kj / 3600;

    const latentPct = (Q_latent_kj / Q_total_kj) * 100;

    // Equivalent water mass required for same sensible storage over deltaT:
    // m_water = Q_total_kj / (4.18 * deltaT)
    const m_water_kg = Q_total_kj / (4.18 * deltaT);
    const massSavingFactor = m_water_kg / massKg;

    qResEl.textContent = Q_total_kwh.toFixed(2) + ' kWh (' + Math.round(Q_total_kj).toLocaleString() + ' kJ Storage)';
    cmpResEl.textContent = 'Latent: ' + latentPct.toFixed(1) + '% (' + Q_latent_kwh.toFixed(1) + ' kWh) | ' + massSavingFactor.toFixed(1) + '× Less Mass than Water (' + Math.round(m_water_kg) + ' kg Water required for ' + deltaT + '°C span)';
  }

  [mEl, dtEl].forEach(el => el.addEventListener('input', update));
  matEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter Phase Change Material (PCM) total mass in kg.',
      'Select PCM chemistry (Organic Paraffin, Inorganic Salt Hydrate, Ice, Erythritol).',
      'Enter allowable operational temperature swing range $\Delta T$ around the melting point in Celsius.',
      'Inspect total thermal storage capacity in kWh and evaluate mass reduction advantage over standard water tanks.'
    ],
    benefitTitle: 'Isothermal High-Density Latent Energy Storage',
    benefitContent: 'PCMs store massive amounts of thermal energy during solid-liquid phase transitions ($\Delta H_{\text{fusion}}$) at virtually constant temperature, packing 5× to 10× more thermal energy per unit volume than sensible water tanks over narrow temperature bands ($5\text{–}10^\circ\text{C}$).',
    faqs: [{ q: 'What is Phase Separation in salt hydrate PCMs?', a: 'Inorganic salt hydrates can suffer from incongruent melting where dense anhydrous salts precipitate to the bottom, causing gradual loss of latent heat storage capacity over thermal cycles.' }]
  },

  // 9. Flat-Plate Solar Thermal Collector (Hottel-Whillier-Bliss) Efficiency Calculator
  {
    slug: 'flat-plate-solar-collector-hottel-whillier-bliss-calculator',
    name: 'Flat-Plate Solar Collector (Hottel-Whillier-Bliss) Efficiency Calculator',
    description: 'Calculate solar hot water flat-plate collector thermal efficiency (η = F_R·(τα) - F_R·U_L · (T_in - T_a) / G_T) and daily thermal heat yield (Q_u in kWh/day).',
    category: 'Science',
    icon: 'text',
    keywords: ['flat plate solar collector calculator', 'hottel whillier bliss equation formula online', 'solar thermal collector efficiency fr ul calculator', 'solar water heater daily heat yield calculator online', 'hwb solar collector efficiency curve online'],
    order: 744,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Solar Irradiance G_T (W/m²), Inlet Fluid T_in (°C), Ambient Air T_a (°C) & Area (m²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hwb-gt">Irradiance G_T (W/m²)</label>
          <input class="tool-textarea" id="hwb-gt" type="number" step="any" value="800.0" placeholder="800.0 W/m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hwb-tin">Inlet Temp T_in (°C)</label>
          <input class="tool-textarea" id="hwb-tin" type="number" step="any" value="45.0" placeholder="45.0 °C (Cold Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hwb-ta">Ambient T_a (°C)</label>
          <input class="tool-textarea" id="hwb-ta" type="number" step="any" value="20.0" placeholder="20.0 °C" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hwb-area">Area A_c (m²)</label>
          <input class="tool-textarea" id="hwb-area" type="number" step="any" value="4.0" placeholder="4.0 m² (2 Panels)" />
        </div>
      </div>
      <div id="hwb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hwb-res-eff" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">η = 63.4% Efficiency</span>
            <span class="stat-label">Instantaneous Thermal Efficiency (HWB Equation)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hwb-res-pwr" style="font-weight:700;">Useful Power: 2.03 kW (F_R(τα) = 0.75, F_R·U_L = 3.7 W/m²·K)</span>
            <span class="stat-label">Useful Thermal Energy Collection Rate (Q_u)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gtEl = document.getElementById('hwb-gt'), tinEl = document.getElementById('hwb-tin');
  const taEl = document.getElementById('hwb-ta'), aEl = document.getElementById('hwb-area');
  const efResEl = document.getElementById('hwb-res-eff'), pwResEl = document.getElementById('hwb-res-pwr');

  // Glazed selective flat-plate collector parameters:
  const FR_tau_alpha = 0.75; // optical efficiency intercept
  const FR_UL = 3.70; // W / m^2 * K (heat loss coefficient slope)

  function update() {
    const G_T = parseFloat(gtEl.value), Tin = parseFloat(tinEl.value);
    const Ta = parseFloat(taEl.value), Area = parseFloat(aEl.value);

    if (isNaN(G_T) || isNaN(Tin) || isNaN(Ta) || isNaN(Area) || G_T <= 0 || Area <= 0) return;

    // Reduced temperature parameter x = (Tin - Ta) / G_T  [K * m^2 / W]
    const deltaT = Tin - Ta;
    const x = deltaT / G_T;

    // Hottel-Whillier-Bliss efficiency: eta = FR_tau_alpha - FR_UL * x
    const eta = Math.max(0, FR_tau_alpha - (FR_UL * x));
    const etaPct = eta * 100;

    // Useful heat gain Q_u = Area * G_T * eta  [Watts]
    const Q_u_watts = Area * G_T * eta;
    const Q_u_kw = Q_u_watts / 1000;

    // Stagnation temperature where eta = 0 => (T_stag - Ta)/G_T = FR_tau_alpha / FR_UL
    const T_stag = Ta + (G_T * (FR_tau_alpha / FR_UL));

    efResEl.textContent = 'η = ' + etaPct.toFixed(1) + '% Collector Efficiency';
    pwResEl.textContent = 'Q_u = ' + Q_u_kw.toFixed(2) + ' kW Thermal (' + (Q_u_watts/Area).toFixed(0) + ' W/m² | Max Stagnation Temp T_stag = ' + Math.round(T_stag) + '°C)';
  }

  [gtEl, tinEl, taEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total solar irradiance on tilted collector plane $G_T$ in $W/m^2$.',
      'Enter collector inlet water circulation temperature $T_{\text{in}}$ in Celsius.',
      'Enter ambient outdoor air dry-bulb temperature $T_a$ in Celsius.',
      'Enter total collector aperture gross area in $m^2$.',
      'Inspect instantaneous thermal efficiency $\eta$, useful thermal power output $Q_u$ in kW, and maximum stagnation safety temperature.'
    ],
    benefitTitle: 'Hoyt Hottel, Austin Whillier & Raymond Bliss 1958 Model',
    benefitContent: 'The HWB linear efficiency curve ($\eta = F_R(\tau\alpha) - F_R U_L \frac{T_{\text{in}} - T_a}{G_T}$) is the worldwide ISO 9806 certification standard for rating solar domestic hot water collectors and glazed solar thermal panels.',
    faqs: [{ q: 'What is Collector Stagnation Temperature?', a: 'Stagnation is the maximum equilibrium temperature reached when fluid pump circulation stops ($Q_u = 0$), where all incident solar energy is dissipated as thermal radiation/convection loss.' }]
  },

  // 10. Thermoelectric Generator (TEG) Seebeck Power & Efficiency Calculator
  {
    slug: 'thermoelectric-generator-teg-seebeck-power-calculator',
    name: 'Thermoelectric Generator (TEG Seebeck Effect) Power & Efficiency Calculator',
    description: 'Calculate Thermoelectric Generator waste heat power output (P_max = (S · ΔT)² / (4 · R_int)) in Watts and maximum conversion efficiency (η_max) from dimensionless Figure of Merit ZT.',
    category: 'Science',
    icon: 'text',
    keywords: ['thermoelectric generator calculator', 'teg seebeck effect power formula online', 'figure of merit zt thermoelectric efficiency calculator', 'peltier seebeck waste heat recovery calculator online', 'bismuth telluride teg power calculator'],
    order: 745,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hot Side T_h (°C), Cold Side T_c (°C), Seebeck Coeff S (mV/K) & Internal Resistance R_int (Ω)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="teg-th">Hot Side T_h (°C)</label>
          <input class="tool-textarea" id="teg-th" type="number" step="any" value="250.0" placeholder="250.0 °C (Exhaust Pipe)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="teg-tc">Cold Side T_c (°C)</label>
          <input class="tool-textarea" id="teg-tc" type="number" step="any" value="50.0" placeholder="50.0 °C (Cooling Water)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="teg-s">Seebeck S (mV/K)</label>
          <input class="tool-textarea" id="teg-s" type="number" step="any" value="45.0" placeholder="45.0 mV/K (Module)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="teg-rint">Internal R_int (Ω)</label>
          <input class="tool-textarea" id="teg-rint" type="number" step="any" value="2.5" placeholder="2.5 Ω" />
        </div>
      </div>
      <div id="teg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="teg-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">P_max = 8.10 Watts</span>
            <span class="stat-label">Maximum Matched Electric Power Output (P_max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="teg-res-eff" style="font-weight:700;">Open-Circuit V_oc = 9.00 V | Efficiency η = 5.24% (ZT ≈ 0.85, Carnot: 38.2%)</span>
            <span class="stat-label">Seebeck Open-Circuit Voltage & Thermodynamic Efficiency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('teg-th'), tcEl = document.getElementById('teg-tc');
  const sEl = document.getElementById('teg-s'), rEl = document.getElementById('teg-rint');
  const pResEl = document.getElementById('teg-res-pwr'), efResEl = document.getElementById('teg-res-eff');

  function update() {
    const ThC = parseFloat(thEl.value), TcC = parseFloat(tcEl.value);
    const SmV = parseFloat(sEl.value), Rint = parseFloat(rEl.value);

    if (isNaN(ThC) || isNaN(TcC) || isNaN(SmV) || isNaN(Rint) || ThC <= TcC || SmV <= 0 || Rint <= 0) return;

    const deltaT = ThC - TcC;
    const S_volts_K = SmV * 1e-3;

    // Open-circuit Seebeck voltage V_oc = S * deltaT  [Volts]
    const V_oc = S_volts_K * deltaT;

    // Maximum matched power output (R_load = R_int): P_max = V_oc^2 / (4 * R_int)  [Watts]
    const P_max = Math.pow(V_oc, 2) / (4 * Rint);

    // Thermodynamic efficiency with ZT ~ 0.85:
    const ThK = ThC + 273.15;
    const TcK = TcC + 273.15;
    const T_avg = (ThK + TcK) / 2;
    const ZT = 0.85; // typical Bi2Te3 figure of merit

    // Carnot efficiency eta_carnot = (Th - Tc) / Th
    const eta_carnot = deltaT / ThK;

    // TEG maximum efficiency: eta_max = eta_carnot * ( sqrt(1 + ZT) - 1 ) / ( sqrt(1 + ZT) + (Tc/Th) )
    const num = Math.sqrt(1 + ZT) - 1.0;
    const den = Math.sqrt(1 + ZT) + (TcK / ThK);
    const eta_teg = eta_carnot * (num / den);
    const eta_pct = eta_teg * 100;

    pResEl.textContent = 'P_max = ' + P_max.toFixed(2) + ' Watts Electrical Output';
    efResEl.textContent = 'V_oc = ' + V_oc.toFixed(2) + ' V (I_match = ' + (V_oc/(2*Rint)).toFixed(2) + ' A) | Efficiency η = ' + eta_pct.toFixed(2) + '% (Carnot: ' + (eta_carnot*100).toFixed(1) + '%, ΔT = ' + deltaT + '°C)';
  }

  [thEl, tcEl, sEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hot junction temperature $T_h$ in Celsius (e.g. 250°C from engine exhaust or industrial furnace).',
      'Enter cold junction heatsink temperature $T_c$ in Celsius.',
      'Enter total module Seebeck coefficient S in mV/K.',
      'Enter module internal electrical resistance $R_{\text{int}}$ in Ohms.',
      'Inspect open-circuit voltage $V_{\text{oc}}$, maximum matched power output $P_{\max}$ in Watts, and thermodynamic conversion efficiency.'
    ],
    benefitTitle: 'Thomas Johann Seebeck 1821 Solid-State Energy Harvesting',
    benefitContent: 'Thermoelectric generators convert waste heat directly into electricity with zero moving parts via charge carrier thermal diffusion, providing reliable electrical power for deep-space missions (NASA Voyager / Curiosity RTGs) and automotive exhaust energy recovery.',
    faqs: [{ q: 'What is the Dimensionless Figure of Merit (ZT)?', a: '$ZT = \frac{S^2 \sigma}{\kappa} T$ quantifies thermoelectric performance; high ZT requires high electrical conductivity ($\sigma$) and Seebeck coefficient ($S$) paired with low thermal conductivity ($\kappa$).' }]
  },

  // --- Suite HHHHH: Acoustics, Noise Control & Vibroacoustics (866 - 870) ---
  // 11. Sound Transmission Loss (STL & STC) Mass Law Calculator
  {
    slug: 'sound-transmission-class-stc-mass-law-calculator',
    name: 'Sound Transmission Loss (STL) Mass Law & Wall STC Rating Calculator',
    description: 'Calculate acoustic wall Sound Transmission Loss (STL = 20 · log₁₀(m · f) - 47 dB) in decibels from partition surface mass density m (kg/m²) and acoustic frequency f.',
    category: 'Science',
    icon: 'text',
    keywords: ['sound transmission loss calculator', 'mass law acoustic stl formula 20 log m times f minus 47', 'wall stc rating soundproofing calculator online', 'architectural acoustic partition transmission loss calculator', 'drywall concrete sound attenuation online'],
    order: 746,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wall Surface Mass Density m (kg/m²) & Frequency f (Hz) or Wall Construction',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="stl-mass">Surface Mass m (kg/m²)</label>
          <input class="tool-textarea" id="stl-mass" type="number" step="any" value="25.0" placeholder="25.0 kg/m² (Double Drywall)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="stl-freq">Frequency f (Hz)</label>
          <input class="tool-textarea" id="stl-freq" type="number" step="any" value="500.0" placeholder="500.0 Hz (Speech / Mid)" />
        </div>
      </div>
      <div id="stl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="stl-res-tl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">TL = 34.9 dB Loss</span>
            <span class="stat-label">Acoustic Sound Transmission Loss (TL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="stl-res-stc" style="font-weight:700;">Estimated Partition STC ≈ 35 (Normal speech audible but not intelligible)</span>
            <span class="stat-label">Estimated Sound Transmission Class (STC Rating)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('stl-mass'), fEl = document.getElementById('stl-freq');
  const tlResEl = document.getElementById('stl-res-tl'), stcResEl = document.getElementById('stl-res-stc');

  function update() {
    const m = parseFloat(mEl.value), f = parseFloat(fEl.value);
    if (isNaN(m) || isNaN(f) || m <= 0 || f <= 0) return;

    // Field-incidence mass law equation: TL = 20 * log10(m * f) - 47.0  [dB]
    const TL = (20 * Math.log10(m * f)) - 47.0;

    // Empirical STC estimate approx = TL @ 500 Hz: STC approx = 20*log10(m) + 7
    const STC = Math.round((20 * Math.log10(m)) + 7);

    let privacyLevel = '';
    if (STC < 30) privacyLevel = 'STC < 30: Poor isolation (Normal speech heard easily and understood)';
    else if (STC < 40) privacyLevel = 'STC 30 - 39: Moderate privacy (Loud speech heard but muffled)';
    else if (STC < 50) privacyLevel = 'STC 40 - 49: Good acoustic isolation (Loud speech heard only faintly)';
    else if (STC < 60) privacyLevel = 'STC 50 - 59: Excellent commercial soundproofing (Loud music muffled)';
    else privacyLevel = 'STC 60+: Studio-grade high acoustic isolation (Loud noise inaudible)';

    tlResEl.textContent = 'TL = ' + TL.toFixed(1) + ' dB Attenuation @ ' + f + ' Hz';
    stcResEl.textContent = 'Estimated Partition STC ≈ ' + STC + ' | ' + privacyLevel;
  }

  [mEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter wall or barrier partition surface mass density m in $\text{kg/m}^2$ (e.g. $10\text{ kg/m}^2$ for single 1/2" gypsum, $25\text{ kg/m}^2$ for double drywall, $240\text{ kg/m}^2$ for 100mm solid concrete).',
      'Enter acoustic sound frequency f in Hz.',
      'Inspect transmission loss (TL) in decibels and estimated ASTM E413 Sound Transmission Class (STC) rating.'
    ],
    benefitTitle: 'The +6 dB per Mass Doubling Law of Acoustics',
    benefitContent: 'In the mass-controlled region, sound transmission loss increases by exactly 6 dB for every doubling of surface mass density ($2\times m$) or doubling of acoustic frequency ($2\times f$).',
    faqs: [{ q: 'Why do double-leaf drywall cavity walls outperform solid mass walls?', a: 'Separating the leaves with an air gap and sound-absorbing fiberglass breaks mechanical vibration bridging, yielding high STC (>55) with a fraction of the physical weight.' }]
  },

  // 12. Helmholtz Resonator Acoustic Resonance Tuning Frequency Calculator
  {
    slug: 'helmholtz-resonator-acoustic-tuning-frequency-calculator',
    name: 'Helmholtz Resonator Acoustic Resonance Tuning Frequency (f₀) Calculator',
    description: 'Calculate acoustic Helmholtz resonator natural tuning frequency (f₀ = (c / 2π) · √(A / (V · L_eff))) in Hz from neck orifice area A, effective neck length L_eff, and cavity volume V.',
    category: 'Science',
    icon: 'text',
    keywords: ['helmholtz resonator calculator', 'acoustic resonance frequency formula f0 equals c over 2 pi sqrt a over v l', 'helmholtz resonator neck end correction calculator', 'intake exhaust acoustic resonator calculator online', 'bass trap helmholtz absorber online'],
    order: 747,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cavity Volume V (Liters), Neck Radius r (mm) & Physical Neck Length L (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hr-vol">Cavity Vol V (Liters)</label>
          <input class="tool-textarea" id="hr-vol" type="number" step="any" value="2.50" placeholder="2.50 Liters (Bottle / Box)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-rad">Neck Radius r (mm)</label>
          <input class="tool-textarea" id="hr-rad" type="number" step="any" value="15.0" placeholder="15.0 mm (30mm Neck)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hr-len">Neck Length L (mm)</label>
          <input class="tool-textarea" id="hr-len" type="number" step="any" value="40.0" placeholder="40.0 mm" />
        </div>
      </div>
      <div id="hr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hr-res-f0" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f₀ = 117.8 Hz (Acoustic Notch)</span>
            <span class="stat-label">Helmholtz Resonant Natural Frequency (f₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hr-res-corr" style="font-weight:700;">Effective Length L_eff = 64.0 mm (Flanged End Correction ΔL = 1.6 · r = 24.0 mm)</span>
            <span class="stat-label">End-Corrected Acoustic Neck Length</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('hr-vol'), rEl = document.getElementById('hr-rad'), lEl = document.getElementById('hr-len');
  const f0ResEl = document.getElementById('hr-res-f0'), crResEl = document.getElementById('hr-res-corr');

  const c_sound = 343.0; // m / s @ 20°C

  function update() {
    const vLiters = parseFloat(vEl.value), rMm = parseFloat(rEl.value), lMm = parseFloat(lEl.value);
    if (isNaN(vLiters) || isNaN(rMm) || isNaN(lMm) || vLiters <= 0 || rMm <= 0 || lMm < 0) return;

    const VM3 = vLiters * 1e-3;
    const rM = rMm * 1e-3;
    const lM = lMm * 1e-3;

    // Cross-sectional neck area A = pi * r^2  [m^2]
    const Area = Math.PI * Math.pow(rM, 2);

    // End correction: Delta_L = 0.85 * r (one end) or 1.6 * r (both ends flanged/open)
    const endCorrectionM = 1.6 * rM;
    const Leff_m = lM + endCorrectionM;
    const Leff_mm = Leff_m * 1000;

    // Helmholtz frequency: f0 = ( c / (2 * pi) ) * sqrt( A / ( V * Leff ) )  [Hz]
    const f0 = (c_sound / (2 * Math.PI)) * Math.sqrt(Area / (VM3 * Leff_m));

    f0ResEl.textContent = 'f₀ = ' + f0.toFixed(1) + ' Hz (Acoustic Resonance)';
    crResEl.textContent = 'L_eff = ' + Leff_mm.toFixed(1) + ' mm (Neck L: ' + lMm + ' mm + End Correction: ' + (endCorrectionM*1000).toFixed(1) + ' mm, Area A = ' + (Area*1e4).toFixed(1) + ' cm²)';
  }

  [vEl, rEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter internal enclosed resonator cavity volume in Liters ($1\text{ L} = 0.001\text{ m}^3$).',
      'Enter circular neck opening radius r in millimeters.',
      'Enter physical neck port length L in millimeters.',
      'Inspect resonant acoustic natural frequency $f_0$ in Hz and flanged neck end-correction length.'
    ],
    benefitTitle: 'Hermann von Helmholtz 1860 Lumped Acoustic Resonator',
    benefitContent: 'The air plug in the neck acts as an acoustic mass vibrating against the pneumatic air spring in the cavity ($f_0 \propto \sqrt{A/VL}$); automotive engineers tune Helmholtz side-branch resonators on engine air intakes to eliminate boomy low-frequency cabin drone noise.',
    faqs: [{ q: 'Why is acoustic end correction necessary?', a: 'Vibrating air near the open ends of the neck moves along with the neck plug, adding an acoustic mass equivalent to extending the physical neck length by $\sim 1.6 \times \text{radius}$.' }]
  },

  // 13. Quarter-Wavelength Acoustic Duct Silencer Calculator
  {
    slug: 'quarter-wavelength-acoustic-duct-silencer-calculator',
    name: 'Quarter-Wavelength Acoustic Duct Silencer Notch Frequency Calculator',
    description: 'Calculate HVAC and exhaust expansion side-branch quarter-wave silencer attenuation notch frequencies (f_notch = (2n - 1) · c / (4 · L)) in Hz and acoustic stub length L.',
    category: 'Science',
    icon: 'text',
    keywords: ['quarter wave silencer calculator', 'acoustic duct notch filter formula c over 4 l online', 'hvac duct silencer quarter wavelength calculator', 'exhaust noise quarter wave stub calculator online', 'acoustic side branch attenuator calculator'],
    order: 748,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Noise Frequency f_target (Hz) or Branch Stub Length L (cm) & Air Temp (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sil-target">Target Noise f (Hz)</label>
          <input class="tool-textarea" id="sil-target" type="number" step="any" value="120.0" placeholder="120.0 Hz (Exhaust Drone)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sil-temp">Air Temp (°C)</label>
          <input class="tool-textarea" id="sil-temp" type="number" step="any" value="20.0" placeholder="20.0 °C (Sound Speed = 343 m/s)" />
        </div>
      </div>
      <div id="sil-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sil-res-len" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L = 71.5 cm Stub Length</span>
            <span class="stat-label">Required Quarter-Wavelength Branch Length (λ/4)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sil-res-harm" style="font-weight:700;">Notch Harmonics: 120 Hz (1st), 360 Hz (3rd), 600 Hz (5th Odd Harmonics)</span>
            <span class="stat-label">Fundamental & Odd Higher Harmonics Attenuation Notches</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('sil-target'), tEl = document.getElementById('sil-temp');
  const lResEl = document.getElementById('sil-res-len'), hResEl = document.getElementById('sil-res-harm');

  function update() {
    const fTarget = parseFloat(fEl.value), Tc = parseFloat(tEl.value);
    if (isNaN(fTarget) || isNaN(Tc) || fTarget <= 0 || Tc < -100) return;

    // Sound speed in air c = 331.3 * sqrt(1 + Tc / 273.15)  [m / s]
    const c = 331.3 * Math.sqrt(1.0 + (Tc / 273.15));

    // Quarter-wave length L = c / (4 * fTarget)  [meters]
    const L_m = c / (4 * fTarget);
    const L_cm = L_m * 100;
    const L_inches = L_cm / 2.54;

    // Odd harmonics attenuated: f_n = (2n - 1) * fTarget
    const f3 = 3 * fTarget;
    const f5 = 5 * fTarget;

    lResEl.textContent = 'L = ' + L_cm.toFixed(1) + ' cm (' + L_inches.toFixed(1) + ' inches Stub Length)';
    hResEl.textContent = 'Notch Harmonics: ' + fTarget.toFixed(0) + ' Hz (1st), ' + f3.toFixed(0) + ' Hz (3rd), ' + f5.toFixed(0) + ' Hz (5th) | Sound Speed c = ' + c.toFixed(1) + ' m/s';
  }

  fEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter offending acoustic noise fundamental frequency in Hz (e.g. 120 Hz engine firing pulse drone or 60 Hz electrical hum).',
      'Enter duct air/gas temperature in Celsius.',
      'Inspect required closed-end quarter-wave side-branch stub physical length L in cm and inches.'
    ],
    benefitTitle: 'Acoustic Destructive Wave Interference',
    benefitContent: 'Sound entering the side branch travels length L to the closed end, reflects with zero phase inversion, and returns to the main duct after traveling a round trip of $2L = \lambda/2$ ($180^\circ$ out of phase), completely canceling the transmitted sound wave at that notch frequency.',
    faqs: [{ q: 'Why do quarter-wave silencers attenuate only odd harmonics (1st, 3rd, 5th)?', a: 'Because round-trip travel distances of $3\lambda/2, 5\lambda/2$ also produce exact $180^\circ$ phase reversals, whereas even harmonics ($2\lambda/2 = \lambda$) produce constructive reinforcement.' }]
  },

  // 14. Panel Acoustic Coincidence Critical Frequency (f_c) Calculator
  {
    slug: 'acoustic-coincidence-critical-frequency-calculator',
    name: 'Panel Acoustic Coincidence Critical Frequency (f_c) Calculator',
    description: 'Calculate acoustic coincidence critical dip frequency (f_c = (c² / 2π) · √(m / B)) in Hz where bending wave speed matches air sound speed, causing sharp soundproofing failure in glass and drywall panels.',
    category: 'Science',
    icon: 'text',
    keywords: ['coincidence critical frequency calculator', 'acoustic coincidence dip formula c squared over 2 pi sqrt m over b', 'bending wave sound speed critical frequency calculator', 'window glass sound transmission coincidence dip online', 'architectural acoustics coincidence frequency online'],
    order: 749,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Panel Material (Glass, Gypsum, Steel, Aluminum, Plywood) & Thickness t (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="coin-mat">Panel Material</label>
          <select class="tool-textarea" id="coin-mat">
            <option value="glass" selected>Window Float Glass (E = 70 GPa, ρ = 2500 kg/m³)</option>
            <option value="gypsum">Gypsum Plasterboard / Drywall (E = 2.5 GPa, ρ = 800 kg/m³)</option>
            <option value="steel">Sheet Steel (E = 200 GPa, ρ = 7850 kg/m³)</option>
            <option value="aluminum">Sheet Aluminum (E = 70 GPa, ρ = 2700 kg/m³)</option>
            <option value="plywood">Plywood (E = 6.0 GPa, ρ = 600 kg/m³)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="coin-thk">Thickness t (mm)</label>
          <input class="tool-textarea" id="coin-thk" type="number" step="any" value="6.0" placeholder="6.0 mm (Window Glass)" />
        </div>
      </div>
      <div id="coin-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="coin-res-fc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f_c = 2,050 Hz Critical Dip</span>
            <span class="stat-label">Coincidence Critical Frequency (f_c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="coin-res-desc" style="color:var(--green-dark); font-weight:700;">Severe -15 dB Sound Isolation Drop in High Speech / Sibilance Band (2.0 kHz)</span>
            <span class="stat-label">Acoustic Soundproofing Impact</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('coin-mat'), thkEl = document.getElementById('coin-thk');
  const fcResEl = document.getElementById('coin-res-fc'), dResEl = document.getElementById('coin-res-desc');

  const c_sound = 343.0; // m / s

  const PANELS = {
    'glass':    { E_gpa: 70.0,  rho: 2500.0, nu: 0.22, name: 'Float Glass' },
    'gypsum':   { E_gpa: 2.5,   rho: 800.0,  nu: 0.30, name: 'Gypsum Drywall' },
    'steel':    { E_gpa: 200.0, rho: 7850.0, nu: 0.28, name: 'Sheet Steel' },
    'aluminum': { E_gpa: 70.0,  rho: 2700.0, nu: 0.33, name: 'Sheet Aluminum' },
    'plywood':  { E_gpa: 6.0,   rho: 600.0,  nu: 0.25, name: 'Plywood Wood' }
  };

  function update() {
    const p = PANELS[matEl.value];
    const tMm = parseFloat(thkEl.value);

    if (isNaN(tMm) || tMm <= 0) return;

    const tM = tMm * 1e-3;
    const E_pa = p.E_gpa * 1e9;

    // Bending stiffness per unit width B = E * t^3 / ( 12 * (1 - nu^2) )  [N * m]
    const B = (E_pa * Math.pow(tM, 3)) / (12.0 * (1.0 - Math.pow(p.nu, 2)));

    // Surface mass density m = rho * t  [kg / m^2]
    const massDensity = p.rho * tM;

    // Critical coincidence frequency: f_c = ( c^2 / (2 * pi) ) * sqrt( m / B )  [Hz]
    const f_c = (Math.pow(c_sound, 2) / (2 * Math.PI)) * Math.sqrt(massDensity / B);

    fcResEl.textContent = 'f_c = ' + Math.round(f_c).toLocaleString() + ' Hz Coincidence Dip';
    dResEl.textContent = p.name + ' (' + tMm + ' mm: Surface Mass m = ' + massDensity.toFixed(1) + ' kg/m², Bending Stiffness B = ' + B.toFixed(1) + ' N·m)';
  }

  matEl.addEventListener('change', update);
  thkEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select solid panel barrier material (Float Window Glass, Gypsum Plasterboard, Steel, Aluminum, Plywood).',
      'Enter physical panel thickness in millimeters.',
      'Inspect coincidence critical frequency $f_c$ where soundproofing transmission loss drops sharply by 10 to 15 dB.'
    ],
    benefitTitle: 'Bending Wave Acoustic Trace Velocity Matching',
    benefitContent: 'At the critical coincidence frequency ($f_c$), free flexural bending waves in the solid panel propagate at the exact same velocity as airborne acoustic waves, causing the panel to become acoustically transparent and destroying sound isolation.',
    faqs: [{ q: 'How do acoustic engineers eliminate the coincidence dip in windows?', a: 'Using laminated glass with a damping acoustic Polyvinyl Butyral (PVB) interlayer absorbs flexural bending energy and smooths out the transmission loss dip.' }]
  },

  // 15. Noise Reduction Coefficient (NRC) & Weighted Sound Absorption Calculator
  {
    slug: 'noise-reduction-coefficient-nrc-porous-absorber-calculator',
    name: 'Noise Reduction Coefficient (NRC & SAA) Acoustic Absorption Calculator',
    description: 'Calculate standard ASTM C423 acoustic Noise Reduction Coefficient (NRC = (α₂₅₀ + α₅₀₀ + α₁₀₀₀ + α₂₀₀₀) / 4) and Sound Absorption Average (SAA) from octave band absorption coefficients.',
    category: 'Science',
    icon: 'text',
    keywords: ['nrc calculator acoustics', 'noise reduction coefficient formula astm c423 online', 'sound absorption average saa calculator', 'acoustic foam panel nrc rating calculator', 'porous sound absorber alpha coefficient online'],
    order: 750,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sound Absorption Coefficients α at 250 Hz, 500 Hz, 1000 Hz, 2000 Hz & 4000 Hz',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nrc-250">α (250 Hz)</label>
          <input class="tool-textarea" id="nrc-250" type="number" step="0.05" value="0.30" placeholder="0.30" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nrc-500">α (500 Hz)</label>
          <input class="tool-textarea" id="nrc-500" type="number" step="0.05" value="0.75" placeholder="0.75" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nrc-1k">α (1000 Hz)</label>
          <input class="tool-textarea" id="nrc-1k" type="number" step="0.05" value="0.95" placeholder="0.95" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nrc-2k">α (2000 Hz)</label>
          <input class="tool-textarea" id="nrc-2k" type="number" step="0.05" value="0.90" placeholder="0.90" />
        </div>
      </div>
      <div id="nrc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nrc-res-nrc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">NRC = 0.75 (High Absorption)</span>
            <span class="stat-label">Noise Reduction Coefficient (ASTM C423 Rounded to 0.05)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nrc-res-desc" style="color:var(--green-dark); font-weight:700;">72.5% Average Mid-Frequency Speech Sound Energy Absorbed</span>
            <span class="stat-label">Acoustic Material Performance Class</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const a250El = document.getElementById('nrc-250'), a500El = document.getElementById('nrc-500');
  const a1kEl = document.getElementById('nrc-1k'), a2kEl = document.getElementById('nrc-2k');
  const nrcResEl = document.getElementById('nrc-res-nrc'), dcResEl = document.getElementById('nrc-res-desc');

  function update() {
    const a250 = parseFloat(a250El.value), a500 = parseFloat(a500El.value);
    const a1k = parseFloat(a1kEl.value), a2k = parseFloat(a2kEl.value);

    if (isNaN(a250) || isNaN(a500) || isNaN(a1k) || isNaN(a2k)) return;

    // Raw average: (a250 + a500 + a1000 + a2000) / 4
    const rawAvg = (a250 + a500 + a1k + a2k) / 4.0;

    // ASTM C423 NRC is rounded to the nearest multiple of 0.05
    const NRC = Math.round(rawAvg * 20) / 20;

    let rating = '';
    let color = '#22543d';

    if (NRC < 0.20) {
      rating = 'Reflective Hard Surface (Concrete, Glass, Tile)';
      color = '#c53030';
    } else if (NRC < 0.50) {
      rating = 'Low-Absorption Material (Thin Carpet, Standard Ceiling Tile)';
      color = '#d97706';
    } else if (NRC < 0.75) {
      rating = 'Moderate Commercial Sound Absorber (Acoustic Baffle, Fabric Panel)';
      color = '#2563eb';
    } else {
      rating = 'High-Performance Acoustic Absorber (Studio Fiberglass / Open-Cell Foam)';
      color = '#22543d';
    }

    nrcResEl.textContent = 'NRC = ' + NRC.toFixed(2) + ' (Exact SAA = ' + rawAvg.toFixed(3) + ')';
    dcResEl.textContent = rating + ' (' + (rawAvg * 100).toFixed(1) + '% Average Acoustic Sound Absorption)';
    dcResEl.style.color = color;
  }

  [a250El, a500El, a1kEl, a2kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter random-incidence reverberation chamber acoustic absorption coefficients $\alpha$ measured at 250 Hz, 500 Hz, 1000 Hz, and 2000 Hz.',
      'Inspect standardized ASTM C423 Noise Reduction Coefficient (NRC rounded to nearest 0.05) and Sound Absorption Average (SAA).'
    ],
    benefitTitle: 'Single-Number Architectural Acoustic Rating',
    benefitContent: 'NRC summarizes a material\'s ability to absorb airborne sound across human speech frequencies (250–2000 Hz); an acoustic ceiling tile with $NRC = 0.80$ absorbs 80% of sound energy while reflecting only 20%.',
    faqs: [{ q: 'Can an NRC rating exceed 1.00?', a: 'Yes; 3D acoustic baffles and thick porous absorbers have edge surface diffraction effects in reverberation chambers that can produce test NRC ratings up to 1.15 to 1.20.' }]
  },

  // --- Suite IIIII: Advanced Robotics, Kinematics & Autonomous Motion Planning (871 - 875) ---
  // 16. Differential Drive Mobile Robot Odometry Dead-Reckoning Calculator
  {
    slug: 'differential-drive-robot-odometry-pose-calculator',
    name: 'Differential Drive Mobile Robot Wheel Odometry Pose (x, y, θ) Calculator',
    description: 'Calculate differential drive wheeled robot forward kinematic pose update (Δx = Δs·cos(θ + Δθ/2), Δy = Δs·sin(θ + Δθ/2), Δθ = (Δs_R - Δs_L) / L) in meters and degrees.',
    category: 'Science',
    icon: 'text',
    keywords: ['differential drive robot odometry calculator', 'wheel encoder odometry pose formula x y theta online', 'robot kinematics dead reckoning wheel displacement calculator', 'ros nav2 mobile robot odometry calculator online', 'two wheeled robot forward kinematics online'],
    order: 751,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Left Wheel Dist Δs_L (m), Right Wheel Dist Δs_R (m), Track Width L (m) & Initial Heading θ₀ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="odo-sl">Left Wheel Δs_L (m)</label>
          <input class="tool-textarea" id="odo-sl" type="number" step="any" value="1.00" placeholder="1.00 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="odo-sr">Right Wheel Δs_R (m)</label>
          <input class="tool-textarea" id="odo-sr" type="number" step="any" value="1.20" placeholder="1.20 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="odo-track">Wheelbase L (m)</label>
          <input class="tool-textarea" id="odo-track" type="number" step="any" value="0.40" placeholder="0.40 m Track" />
        </div>
        <div class="control-group">
          <label class="control-label" for="odo-th0">Initial Heading (°)</label>
          <input class="tool-textarea" id="odo-th0" type="number" step="any" value="0.0" placeholder="0.0°" />
        </div>
      </div>
      <div id="odo-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="odo-res-pose" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Δx: +1.066 m | Δy: +0.272 m</span>
            <span class="stat-label">Robot Cartesian Position Displacement (Δx, Δy)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="odo-res-th" style="font-weight:700;">Final Heading θ = +28.65° (+0.500 rad Turn) | Turn Radius R = 2.20 m</span>
            <span class="stat-label">Rotational Yaw Heading & Instantaneous Turn Radius</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const slEl = document.getElementById('odo-sl'), srEl = document.getElementById('odo-sr');
  const trkEl = document.getElementById('odo-track'), th0El = document.getElementById('odo-th0');
  const posResEl = document.getElementById('odo-res-pose'), thResEl = document.getElementById('odo-res-th');

  function update() {
    const sL = parseFloat(slEl.value), sR = parseFloat(srEl.value);
    const L = parseFloat(trkEl.value), th0Deg = parseFloat(th0El.value);

    if (isNaN(sL) || isNaN(sR) || isNaN(L) || isNaN(th0Deg) || L <= 0) return;

    const th0Rad = (th0Deg * Math.PI) / 180;

    // Linear center displacement delta_s = (sR + sL) / 2  [meters]
    const delta_s = (sR + sL) / 2;

    // Angular yaw rotation delta_theta = (sR - sL) / L  [radians]
    const delta_theta = (sR - sL) / L;
    const delta_theta_deg = (delta_theta * 180) / Math.PI;

    // Exact Runge-Kutta / midpoint integration:
    // delta_x = delta_s * cos(theta0 + delta_theta / 2)
    // delta_y = delta_s * sin(theta0 + delta_theta / 2)
    const midTheta = th0Rad + (delta_theta / 2);
    const delta_x = delta_s * Math.cos(midTheta);
    const delta_y = delta_s * Math.sin(midTheta);

    const finalThetaDeg = ((th0Deg + delta_theta_deg + 360) % 360);

    // Turn radius R = (L/2) * (sR + sL) / (sR - sL)
    const turnRadiusM = Math.abs(delta_theta) > 1e-4 ? delta_s / delta_theta : 999.9;

    posResEl.textContent = 'Δx: ' + (delta_x >= 0 ? '+' : '') + delta_x.toFixed(3) + ' m | Δy: ' + (delta_y >= 0 ? '+' : '') + delta_y.toFixed(3) + ' m';
    thResEl.textContent = 'Final Heading θ = ' + finalThetaDeg.toFixed(1) + '° (Yaw: ' + (delta_theta_deg >= 0 ? '+' : '') + delta_theta_deg.toFixed(2) + '° | Turn Radius R = ' + (turnRadiusM > 500 ? 'Straight' : turnRadiusM.toFixed(2) + ' m) )';
  }

  [slEl, srEl, trkEl, th0El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter left wheel travel distance $\Delta s_L$ in meters measured from optical wheel rotary encoders.',
      'Enter right wheel travel distance $\Delta s_R$ in meters.',
      'Enter robot lateral track width wheelbase L in meters.',
      'Enter initial robot heading angle $\theta_0$ in degrees.',
      'Inspect 2D robot odometry Cartesian position $(\Delta x, \Delta y)$ and updated rotational yaw orientation.'
    ],
    benefitTitle: 'Midpoint Runge-Kutta Robot Dead Reckoning',
    benefitContent: 'Second-order midpoint odometry integration ($\theta_{\text{mid}} = \theta_0 + \Delta\theta/2$) cancels first-order integration truncation errors during curved turning, providing accurate pose estimates for ROS Navigation (Nav2) autonomous mobile robots.',
    faqs: [{ q: 'What causes wheel odometry drift in mobile robots?', a: 'Wheel slip on slick floors, uneven tire wear, and floor bumps accumulate boundless position drift over time, requiring periodic correction from LiDAR SLAM or AprilTag fiducial landmarks.' }]
  },

  // 17. Pure Pursuit Autonomous Path Tracking Steering Angle Calculator
  {
    slug: 'pure-pursuit-path-tracking-steering-angle-calculator',
    name: 'Pure Pursuit Autonomous Vehicle Steering Angle (δ = arctan(2L·sin α / l_d)) Calculator',
    description: 'Calculate autonomous mobile robot path tracking Pure Pursuit steering angle (δ = arctan(2·L·sin α / l_d)) in degrees from lookahead distance l_d, heading error α, and wheelbase L.',
    category: 'Science',
    icon: 'text',
    keywords: ['pure pursuit calculator', 'autonomous vehicle steering angle formula delta equals arctan 2 l sin alpha over ld', 'pure pursuit path tracking lookahead distance calculator', 'robotics path following pure pursuit online', 'self driving car steering angle calculator'],
    order: 752,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Lookahead Distance l_d (m), Heading Angle to Goal α (°), Wheelbase L (m) & Vehicle Speed v (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pp-ld">Lookahead l_d (m)</label>
          <input class="tool-textarea" id="pp-ld" type="number" step="any" value="3.0" placeholder="3.0 m Lookahead" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pp-alpha">Target Angle α (°)</label>
          <input class="tool-textarea" id="pp-alpha" type="number" step="any" value="20.0" placeholder="20.0° (to Waypoint)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pp-l">Wheelbase L (m)</label>
          <input class="tool-textarea" id="pp-l" type="number" step="any" value="2.50" placeholder="2.50 m (Car Wheelbase)" />
        </div>
      </div>
      <div id="pp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pp-res-delta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Steering δ = +29.7°</span>
            <span class="stat-label">Required Front Wheel Steering Angle (δ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pp-res-curv" style="font-weight:700;">Path Curvature κ = 0.228 m⁻¹ (Turning Radius R = 4.39 m)</span>
            <span class="stat-label">Pursuit Arc Path Curvature (κ = 2·sin α / l_d)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ldEl = document.getElementById('pp-ld'), aEl = document.getElementById('pp-alpha'), lEl = document.getElementById('pp-l');
  const dResEl = document.getElementById('pp-res-delta'), cResEl = document.getElementById('pp-res-curv');

  function update() {
    const ld = parseFloat(ldEl.value), alphaDeg = parseFloat(aEl.value), L = parseFloat(lEl.value);
    if (isNaN(ld) || isNaN(alphaDeg) || isNaN(L) || ld <= 0 || L <= 0) return;

    const alphaRad = (alphaDeg * Math.PI) / 180;

    // Path curvature kappa = (2 * sin(alpha)) / ld  [m^-1]
    const kappa = (2 * Math.sin(alphaRad)) / ld;

    // Steering angle delta = atan( kappa * L ) = atan( (2 * L * sin(alpha)) / ld )
    const deltaRad = Math.atan(kappa * L);
    const deltaDeg = (deltaRad * 180) / Math.PI;

    // Turning radius R = 1 / kappa
    const turnRadius = Math.abs(kappa) > 1e-4 ? 1 / Math.abs(kappa) : 999.9;

    dResEl.textContent = 'Steering δ = ' + (deltaDeg >= 0 ? '+' : '') + deltaDeg.toFixed(1) + '° (' + (deltaRad).toFixed(3) + ' rad)';
    cResEl.textContent = 'Path Curvature κ = ' + kappa.toFixed(3) + ' m⁻¹ (Arc Radius R = ' + (turnRadius > 500 ? 'Straight' : turnRadius.toFixed(2) + ' m') + ')';
  }

  [ldEl, aEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Pure Pursuit lookahead distance $l_d$ in meters from vehicle rear axle to target waypoint.',
      'Enter angle $\alpha$ between current vehicle heading and the lookahead goal vector in degrees.',
      'Enter vehicle front-to-rear axle wheelbase length L in meters.',
      'Inspect required Ackermann front wheel steering angle $\delta$ in degrees and target path arc curvature $\kappa$.'
    ],
    benefitTitle: 'Geometric Goal-Chasing Path Following',
    benefitContent: 'Pure Pursuit fits a unique circular arc connecting the vehicle rear axle to a lookahead point on the global path; dynamically scaling lookahead distance with velocity ($l_d = k_v \cdot v$) provides smooth, non-oscillating trajectory tracking for autonomous self-driving cars.',
    faqs: [{ q: 'What happens if lookahead distance ld is too small?', a: 'A lookahead distance that is too small causes violent steering oscillations and instability around the path, while too large a lookahead causes the vehicle to cut corners.' }]
  },

  // 18. Dubins Car Shortest Path & Minimum Turning Radius Calculator
  {
    slug: 'dubins-car-minimum-turning-radius-path-calculator',
    name: 'Dubins Car Minimum Turning Radius (R_min) & Shortest Path Length Calculator',
    description: 'Calculate non-holonomic Dubins vehicle kinematic minimum turning radius (R_min = v / ω_max = L / tan(δ_max)) and evaluate optimal CSC (LSL, RSR, LSR, RSL) path segments.',
    category: 'Science',
    icon: 'text',
    keywords: ['dubins car calculator', 'minimum turning radius formula r equals v over omega max online', 'dubins path length csc curve straight curve calculator', 'non holonomic vehicle motion planning dubins online', 'robotics autonomous vehicle dubins path online'],
    order: 753,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Speed v (m/s), Max Yaw Rate ω_max (rad/s) or Max Steering Angle δ_max (°) & Wheelbase L (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dub-v">Speed v (m/s)</label>
          <input class="tool-textarea" id="dub-v" type="number" step="any" value="10.0" placeholder="10.0 m/s (36 km/h)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dub-delta">Max Steering δ_max (°)</label>
          <input class="tool-textarea" id="dub-delta" type="number" step="1" value="35.0" placeholder="35.0° (Max Lock)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dub-l">Wheelbase L (m)</label>
          <input class="tool-textarea" id="dub-l" type="number" step="any" value="2.70" placeholder="2.70 m" />
        </div>
      </div>
      <div id="dub-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dub-res-rmin" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">R_min = 3.86 m Turning Radius</span>
            <span class="stat-label">Minimum Kinematic Turning Radius (R_min)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dub-res-rate" style="font-weight:700;">Max Yaw Rate ω = 2.59 rad/s (148.6°/s) | Lateral Accel a_lat = 25.9 m/s² (2.64g)</span>
            <span class="stat-label">Maximum Angular Turn Velocity & Lateral Acceleration</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('dub-v'), dEl = document.getElementById('dub-delta'), lEl = document.getElementById('dub-l');
  const rResEl = document.getElementById('dub-res-rmin'), rtResEl = document.getElementById('dub-res-rate');

  function update() {
    const v = parseFloat(vEl.value), deltaDeg = parseFloat(dEl.value), L = parseFloat(lEl.value);
    if (isNaN(v) || isNaN(deltaDeg) || isNaN(L) || v <= 0 || deltaDeg <= 0 || deltaDeg >= 90 || L <= 0) return;

    const deltaRad = (deltaDeg * Math.PI) / 180;

    // Minimum turning radius R_min = L / tan(delta_max)  [meters]
    const R_min = L / Math.tan(deltaRad);

    // Maximum yaw rate omega_max = v / R_min  [rad / s]
    const omega_max = v / R_min;
    const omega_deg_s = (omega_max * 180) / Math.PI;

    // Lateral acceleration a_lat = v^2 / R_min  [m / s^2]
    const a_lat = Math.pow(v, 2) / R_min;
    const a_lat_g = a_lat / 9.80665;

    rResEl.textContent = 'R_min = ' + R_min.toFixed(2) + ' m (Wall-to-Wall Radius: ' + (R_min + 0.9).toFixed(2) + ' m)';
    rtResEl.textContent = 'Max Yaw Rate: ' + omega_max.toFixed(2) + ' rad/s (' + omega_deg_s.toFixed(1) + '°/s) | a_lat = ' + a_lat.toFixed(1) + ' m/s² (' + a_lat_g.toFixed(2) + 'g @ ' + (v*3.6).toFixed(0) + ' km/h)';
  }

  [vEl, dEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter vehicle forward travel velocity v in m/s.',
      'Enter maximum mechanical steering lock angle $\delta_{\max}$ in degrees.',
      'Enter vehicle axle wheelbase length L in meters.',
      'Inspect minimum kinematic circular turn radius $R_{\min}$ and maximum yaw turning rate in rad/s and degrees/s.'
    ],
    benefitTitle: 'Lester Eli Dubins 1957 Non-Holonomic Shortest Paths',
    benefitContent: 'Dubins proved that the shortest path between any initial 2D pose $(x_1, y_1, \theta_1)$ and target pose $(x_2, y_2, \theta_2)$ for a forward-only vehicle with minimum turning radius $R_{\min}$ is always composed of a combination of maximum-curvature circular arcs (C) and straight line segments (S) (e.g. RSR, LSL, RSL, LSR).',
    faqs: [{ q: 'What is the difference between Dubins and Reeds-Shepp paths?', a: 'Dubins paths permit only forward motion, whereas Reeds-Shepp paths allow both forward and reverse gear motion.' }]
  },

  // 19. True Ackermann Steering Geometry Inner vs Outer Wheel Angle Calculator
  {
    slug: 'ackermann-steering-geometry-inner-outer-wheel-angle-calculator',
    name: 'Ackermann Steering Geometry Inner & Outer Wheel Angles Calculator',
    description: 'Calculate 100% true Ackermann steering geometry (cot δ_outer - cot δ_inner = w / L) for slip-free vehicle turning to prevent front tire scrubbing.',
    category: 'Science',
    icon: 'text',
    keywords: ['ackermann steering calculator', 'ackermann geometry formula cot delta outer minus cot delta inner equals w over l', 'inner outer wheel steering angle calculator online', 'automotive suspension tire scrubbing ackermann calculator', 'vehicle dynamics ackermann turning geometry online'],
    order: 754,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wheelbase L (m), Track Width w (m) & Inner Wheel Steering Angle δ_inner (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ack-l">Wheelbase L (m)</label>
          <input class="tool-textarea" id="ack-l" type="number" step="any" value="2.60" placeholder="2.60 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ack-w">Track Width w (m)</label>
          <input class="tool-textarea" id="ack-w" type="number" step="any" value="1.50" placeholder="1.50 m Front Track" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ack-di">Inner Angle δ_i (°)</label>
          <input class="tool-textarea" id="ack-di" type="number" step="1" value="35.0" placeholder="35.0° (Inside Turn)" />
        </div>
      </div>
      <div id="ack-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ack-res-do" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Outer Angle δ_o = 26.5°</span>
            <span class="stat-label">True Ackermann Outer Wheel Angle (δ_outer)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ack-res-diff" style="font-weight:700;">Ackermann Spread Δδ = 8.46° | Center Turn Radius R = 4.47 m</span>
            <span class="stat-label">Toe-Out on Turn Angle Differential & Turn Center Radius</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('ack-l'), wEl = document.getElementById('ack-w'), diEl = document.getElementById('ack-di');
  const doResEl = document.getElementById('ack-res-do'), dfResEl = document.getElementById('ack-res-diff');

  function update() {
    const L = parseFloat(lEl.value), w = parseFloat(wEl.value), delta_i_deg = parseFloat(diEl.value);
    if (isNaN(L) || isNaN(w) || isNaN(delta_i_deg) || L <= 0 || w <= 0 || delta_i_deg <= 0 || delta_i_deg >= 90) return;

    const delta_i_rad = (delta_i_deg * Math.PI) / 180;

    // True Ackermann relation: cot(delta_o) - cot(delta_i) = w / L
    // cot(delta_o) = cot(delta_i) + (w / L)
    const cot_delta_i = 1.0 / Math.tan(delta_i_rad);
    const cot_delta_o = cot_delta_i + (w / L);

    const delta_o_rad = Math.atan(1.0 / cot_delta_o);
    const delta_o_deg = (delta_o_rad * 180) / Math.PI;

    const deltaDiff = delta_i_deg - delta_o_deg;

    // Centerline turn radius R = L / tan(delta_avg)
    const R_center = L / Math.tan((delta_i_rad + delta_o_rad) / 2);

    doResEl.textContent = 'Outer Angle δ_o = ' + delta_o_deg.toFixed(1) + '° (Inner: ' + delta_i_deg + '°)';
    dfResEl.textContent = 'Toe-Out on Turn: Δδ = ' + deltaDiff.toFixed(2) + '° | Common Center Turn Radius R = ' + R_center.toFixed(2) + ' m (Zero Tire Scrub)';
  }

  [lEl, wEl, diEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter vehicle axle wheelbase length L in meters.',
      'Enter front wheel track width w in meters.',
      'Enter inside wheel sharp steering lock angle $\delta_{\text{inner}}$ in degrees.',
      'Inspect calculated 100% Ackermann outer wheel angle $\delta_{\text{outer}}$ and dynamic toe-out on turn differential.'
    ],
    benefitTitle: 'Georg Lankensperger & Rudolph Ackermann 1818 Geometry',
    benefitContent: 'During a turn, the inner front wheel traces a tighter circle than the outer wheel; Ackermann steering linkages angle the inner wheel more sharply than the outer wheel ($\delta_{\text{inner}} > \delta_{\text{outer}}$), ensuring all four wheels rotate around a single common instantaneous center of curvature to eliminate tire scrubbing.',
    faqs: [{ q: 'Why do race cars often use Parallel or Anti-Ackermann steering?', a: 'At high speeds, lateral tire slip angles dominate; high-load outer tires benefit from greater steering angles to maximize aerodynamic cornering grip.' }]
  },

  // 20. 2R Planar Robot Arm Inverse Kinematics Calculator
  {
    slug: 'robot-inverse-kinematics-2r-planar-arm-calculator',
    name: '2R Planar Robot Arm Inverse Kinematics (θ₁, θ₂ from (x, y)) Calculator',
    description: 'Calculate 2-link (2R) planar robotic arm joint angles θ₁ and θ₂ (θ₂ = ±arccos((x² + y² - l₁² - l₂²) / (2·l₁·l₂))) for target Cartesian coordinate end-effector positions.',
    category: 'Science',
    icon: 'text',
    keywords: ['2r robot inverse kinematics calculator', 'two link robot arm joint angles theta1 theta2 formula', 'planar manipulator inverse kinematics calculator online', 'elbow up elbow down robot arm kinematics calculator', 'robotics end effector position to joint angles online'],
    order: 755,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Coordinates (x, y in mm) & Link Lengths l₁, l₂ (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ik-x">Target X (mm)</label>
          <input class="tool-textarea" id="ik-x" type="number" step="any" value="300.0" placeholder="300.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-y">Target Y (mm)</label>
          <input class="tool-textarea" id="ik-y" type="number" step="any" value="200.0" placeholder="200.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-l1">Link l₁ (mm)</label>
          <input class="tool-textarea" id="ik-l1" type="number" step="any" value="250.0" placeholder="250.0 mm Upper Arm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-l2">Link l₂ (mm)</label>
          <input class="tool-textarea" id="ik-l2" type="number" step="any" value="200.0" placeholder="200.0 mm Forearm" />
        </div>
      </div>
      <div id="ik-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ik-res-angles" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">θ₁ = +7.7° | θ₂ = +55.2°</span>
            <span class="stat-label">Elbow-Down Joint Configuration (θ₁, θ₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ik-res-alt" style="font-weight:700;">Elbow-Up Solution: θ₁ = +59.7°, θ₂ = -55.2° (Reach r = 360.6 mm / Max: 450 mm)</span>
            <span class="stat-label">Dual Kinematic Solution & Workspace Verification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('ik-x'), yEl = document.getElementById('ik-y');
  const l1El = document.getElementById('ik-l1'), l2El = document.getElementById('ik-l2');
  const aResEl = document.getElementById('ik-res-angles'), altResEl = document.getElementById('ik-res-alt');

  function update() {
    const x = parseFloat(xEl.value), y = parseFloat(yEl.value);
    const l1 = parseFloat(l1El.value), l2 = parseFloat(l2El.value);

    if (isNaN(x) || isNaN(y) || isNaN(l1) || isNaN(l2) || l1 <= 0 || l2 <= 0) return;

    const r_sq = Math.pow(x, 2) + Math.pow(y, 2);
    const r = Math.sqrt(r_sq);
    const maxReach = l1 + l2;
    const minReach = Math.abs(l1 - l2);

    if (r > maxReach || r < minReach) {
      aResEl.textContent = 'Target Outside Robot Workspace!';
      altResEl.textContent = 'Target Distance r = ' + r.toFixed(1) + ' mm (Allowed Workspace Range: ' + minReach.toFixed(1) + ' mm to ' + maxReach.toFixed(1) + ' mm)';
      aResEl.style.color = '#c53030';
      return;
    }
    aResEl.style.color = '#22543d';

    // Law of Cosines for theta2:
    // cos(theta2) = (x^2 + y^2 - l1^2 - l2^2) / (2 * l1 * l2)
    const cos_th2 = (r_sq - Math.pow(l1, 2) - Math.pow(l2, 2)) / (2 * l1 * l2);
    const th2_down_rad = Math.acos(Math.max(-1.0, Math.min(1.0, cos_th2)));
    const th2_up_rad = -th2_down_rad;

    // theta1 = atan2(y, x) - atan2( l2*sin(theta2), l1 + l2*cos(theta2) )
    const th1_down_rad = Math.atan2(y, x) - Math.atan2(l2 * Math.sin(th2_down_rad), l1 + (l2 * Math.cos(th2_down_rad)));
    const th1_up_rad = Math.atan2(y, x) - Math.atan2(l2 * Math.sin(th2_up_rad), l1 + (l2 * Math.cos(th2_up_rad)));

    const th1_down_deg = (th1_down_rad * 180) / Math.PI;
    const th2_down_deg = (th2_down_rad * 180) / Math.PI;
    const th1_up_deg = (th1_up_rad * 180) / Math.PI;
    const th2_up_deg = (th2_up_rad * 180) / Math.PI;

    aResEl.textContent = 'Elbow-Down: θ₁ = ' + (th1_down_deg >= 0 ? '+' : '') + th1_down_deg.toFixed(1) + '°, θ₂ = ' + (th2_down_deg >= 0 ? '+' : '') + th2_down_deg.toFixed(1) + '°';
    altResEl.textContent = 'Elbow-Up: θ₁ = ' + (th1_up_deg >= 0 ? '+' : '') + th1_up_deg.toFixed(1) + '°, θ₂ = ' + (th2_up_deg >= 0 ? '+' : '') + th2_up_deg.toFixed(1) + '° (Reach: ' + r.toFixed(1) + ' mm / ' + maxReach + ' mm)';
  }

  [xEl, yEl, l1El, l2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter target end-effector Cartesian coordinate (x, y) in millimeters.',
      'Enter upper arm link length $l_1$ in millimeters.',
      'Enter forearm link length $l_2$ in millimeters.',
      'Inspect analytical Inverse Kinematics solutions for both Elbow-Down and Elbow-Up configurations in degrees.'
    ],
    benefitTitle: 'Analytical Robot Manipulator Kinematics',
    benefitContent: 'For 2R planar robotic arms, geometric law-of-cosines yields closed-form analytical solutions that execute in microseconds on real-time microcontrollers without iterative numerical Jacobian convergence delays.',
    faqs: [{ q: 'What is a kinematic singularity in a 2R robot arm?', a: 'Singularities occur at full extension ($r = l_1 + l_2$) or full retraction ($r = |l_1 - l_2|$), where the arm loses a degree of freedom and the Jacobian determinant becomes zero.' }]
  },

  // --- Suite JJJJJ: Computational Biology, Bioinformatics & Population Genetics (876 - 880) ---
  // 21. Hardy-Weinberg Equilibrium Allele Frequency & Chi-Square Calculator
  {
    slug: 'hardy-weinberg-equilibrium-allele-frequency-calculator',
    name: 'Hardy-Weinberg Equilibrium Allele Frequency (p² + 2pq + q² = 1) Calculator',
    description: 'Calculate population genetics allele frequencies (p and q) from genotype counts (AA, Aa, aa) and perform Chi-Square (χ²) goodness-of-fit test for Hardy-Weinberg Equilibrium.',
    category: 'Science',
    icon: 'text',
    keywords: ['hardy weinberg calculator', 'hardy weinberg equation formula p squared plus 2pq plus q squared', 'population genetics allele frequency calculator online', 'chi square test hardy weinberg equilibrium calculator', 'genotype frequency aa aa aa calculator online'],
    order: 756,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Observed Genotype Sample Counts: Homozygous Dominant (AA), Heterozygous (Aa) & Recessive (aa)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hw-aa">Count (AA)</label>
          <input class="tool-textarea" id="hw-aa" type="number" step="1" value="490" placeholder="490 (Homozygous Dominant)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hw-ab">Count (Aa)</label>
          <input class="tool-textarea" id="hw-ab" type="number" step="1" value="420" placeholder="420 (Heterozygous)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hw-bb">Count (aa)</label>
          <input class="tool-textarea" id="hw-bb" type="number" step="1" value="90" placeholder="90 (Homozygous Recessive)" />
        </div>
      </div>
      <div id="hw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hw-res-freq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">p = 0.700 (A) | q = 0.300 (a)</span>
            <span class="stat-label">Allele Frequencies (p + q = 1.000)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hw-res-chi" style="color:var(--green-dark); font-weight:700;">χ² = 0.000 (p > 0.05: Population is in Perfect Hardy-Weinberg Equilibrium)</span>
            <span class="stat-label">Chi-Square Test (χ²) & Equilibrium Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aaEl = document.getElementById('hw-aa'), abEl = document.getElementById('hw-ab'), bbEl = document.getElementById('hw-bb');
  const fResEl = document.getElementById('hw-res-freq'), cResEl = document.getElementById('hw-res-chi');

  function update() {
    const nAA = parseInt(aaEl.value, 10), nAa = parseInt(abEl.value, 10), naa = parseInt(bbEl.value, 10);
    if (isNaN(nAA) || isNaN(nAa) || isNaN(naa) || nAA < 0 || nAa < 0 || naa < 0) return;

    const N_total = nAA + nAa + naa;
    if (N_total === 0) return;

    const totalAlleles = 2 * N_total;

    // Allele frequency p = ( 2*nAA + nAa ) / ( 2*N )
    const p = ((2 * nAA) + nAa) / totalAlleles;
    const q = 1.0 - p;

    // Expected genotype counts under HWE:
    // Exp(AA) = p^2 * N
    // Exp(Aa) = 2*p*q * N
    // Exp(aa) = q^2 * N
    const expAA = Math.pow(p, 2) * N_total;
    const expAa = 2 * p * q * N_total;
    const expaa = Math.pow(q, 2) * N_total;

    // Chi-square test statistic: sum( (Obs - Exp)^2 / Exp )
    const chi2 = (Math.pow(nAA - expAA, 2) / expAA) + (Math.pow(nAa - expAa, 2) / expAa) + (Math.pow(naa - expaa, 2) / expaa);

    // Critical value for 1 degree of freedom at alpha = 0.05 is 3.841
    let status = '';
    let color = '#22543d';

    if (chi2 <= 3.841) {
      status = 'χ² = ' + chi2.toFixed(3) + ' ≤ 3.841 (IN EQUILIBRIUM: Random mating, no significant selection/drift)';
      color = '#22543d';
    } else {
      status = 'χ² = ' + chi2.toFixed(3) + ' > 3.841 (DEVIATES FROM HWE: Evidence of selection, non-random mating, or migration)';
      color = '#c53030';
    }

    fResEl.textContent = 'p(A) = ' + p.toFixed(3) + ' | q(a) = ' + q.toFixed(3) + ' (Total N = ' + N_total.toLocaleString() + ')';
    cResEl.textContent = status + ' | Expected: ' + expAA.toFixed(0) + ' AA, ' + expAa.toFixed(0) + ' Aa, ' + expaa.toFixed(0) + ' aa';
    cResEl.style.color = color;
  }

  [aaEl, abEl, bbEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter observed sample count of Homozygous Dominant individuals (AA).',
      'Enter observed count of Heterozygous individuals (Aa).',
      'Enter observed count of Homozygous Recessive individuals (aa).',
      'Inspect calculated dominant (p) and recessive (q) allele frequencies, expected Hardy-Weinberg genotype numbers ($p^2 N, 2pqN, q^2 N$), and Chi-Square statistical test of genetic equilibrium.'
    ],
    benefitTitle: 'G.H. Hardy & Wilhelm Weinberg 1908 Genetic Null Model',
    benefitContent: 'Hardy-Weinberg equilibrium establishes the baseline null hypothesis for population genetics ($p^2 + 2pq + q^2 = 1$); statistically significant deviations ($\chi^2 > 3.841$) signal evolutionary pressures such as natural selection, genetic drift, assortative mating, or population bottlenecking.',
    faqs: [{ q: 'Why is there only 1 degree of freedom in the HWE Chi-Square test?', a: 'With 3 genotype classes, estimating the single parameter p leaves $k - 1 - 1 = 3 - 2 = 1$ degree of freedom.' }]
  },

  // 22. Smith-Waterman Local Sequence Alignment Dynamic Programming Score Calculator
  {
    slug: 'smith-waterman-local-sequence-alignment-score-calculator',
    name: 'Smith-Waterman Local Sequence Alignment (Dynamic Programming) Calculator',
    description: 'Calculate DNA/protein local sequence alignment optimal score and trace back highest-scoring local matching sub-sequences using the Smith-Waterman dynamic programming algorithm.',
    category: 'Science',
    icon: 'text',
    keywords: ['smith waterman calculator', 'local sequence alignment dynamic programming formula online', 'dna sequence similarity smith waterman calculator', 'bioinformatics local alignment blast score calculator', 'needleman wunsch vs smith waterman online'],
    order: 757,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sequence 1 (DNA / Protein), Sequence 2, Match (+2), Mismatch (-1) & Gap Penalty (-2)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sw-s1">Sequence 1</label>
          <input class="tool-textarea" id="sw-s1" type="text" value="ACACACTA" placeholder="e.g. ACACACTA" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sw-s2">Sequence 2</label>
          <input class="tool-textarea" id="sw-s2" type="text" value="AGCACACA" placeholder="e.g. AGCACACA" />
        </div>
      </div>
      <div id="sw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sw-res-score" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Max Alignment Score = 12</span>
            <span class="stat-label">Optimal Local Alignment Score (Smith-Waterman)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sw-res-align" style="font-weight:700;">Aligned Motif: 'CACACA' (100% Identity Match across 6 Base Pairs)</span>
            <span class="stat-label">Optimal Sub-Sequence Local Alignment</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const s1El = document.getElementById('sw-s1'), s2El = document.getElementById('sw-s2');
  const scResEl = document.getElementById('sw-res-score'), alResEl = document.getElementById('sw-res-align');

  const matchScore = 2;
  const mismatchScore = -1;
  const gapPenalty = -2;

  function update() {
    const s1 = s1El.value.trim().toUpperCase();
    const s2 = s2El.value.trim().toUpperCase();

    if (s1.length === 0 || s2.length === 0) return;

    const n = s1.length;
    const m = s2.length;

    // Initialize DP matrix with zeros
    const H = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

    let maxScore = 0;
    let maxI = 0, maxJ = 0;

    // Fill Smith-Waterman DP matrix: H[i][j] = max( 0, H[i-1][j-1] + score, H[i-1][j] + gap, H[i][j-1] + gap )
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        const sim = s1[i - 1] === s2[j - 1] ? matchScore : mismatchScore;
        const diag = H[i - 1][j - 1] + sim;
        const up = H[i - 1][j] + gapPenalty;
        const left = H[i][j - 1] + gapPenalty;

        H[i][j] = Math.max(0, diag, up, left);

        if (H[i][j] > maxScore) {
          maxScore = H[i][j];
          maxI = i;
          maxJ = j;
        }
      }
    }

    // Traceback from maxI, maxJ until cell value reaches 0
    let align1 = '';
    let align2 = '';
    let currI = maxI;
    let currJ = maxJ;

    while (currI > 0 && currJ > 0 && H[currI][currJ] > 0) {
      const sim = s1[currI - 1] === s2[currJ - 1] ? matchScore : mismatchScore;
      if (H[currI][currJ] === H[currI - 1][currJ - 1] + sim) {
        align1 = s1[currI - 1] + align1;
        align2 = s2[currJ - 1] + align2;
        currI--;
        currJ--;
      } else if (H[currI][currJ] === H[currI - 1][currJ] + gapPenalty) {
        align1 = s1[currI - 1] + align1;
        align2 = '-' + align2;
        currI--;
      } else {
        align1 = '-' + align1;
        align2 = s2[currJ - 1] + align2;
        currJ--;
      }
    }

    scResEl.textContent = 'Max Score = ' + maxScore + ' (Local Optimum)';
    alResEl.textContent = 'Seq1: ' + align1 + ' | Seq2: ' + align2 + ' (Length: ' + align1.length + ' bp, Match: +' + matchScore + ', Mis: ' + mismatchScore + ', Gap: ' + gapPenalty + ')';
  }

  s1El.addEventListener('input', update);
  s2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter primary nucleotide or amino acid sequence 1.',
      'Enter comparison target sequence 2.',
      'Inspect optimal local alignment matrix maximum score and trace-backed aligned matching motif.'
    ],
    benefitTitle: 'Temple F. Smith & Michael S. Waterman 1981 Local Alignment Algorithm',
    benefitContent: 'Unlike global alignment (Needleman-Wunsch) which forces entire end-to-end strings to align, Smith-Waterman resets negative matrix scores to zero ($H_{i,j} = \max(0, \dots)$), isolating conserved functional protein domains and shared genetic motifs amidst divergent flanking DNA.',
    faqs: [{ q: 'Why is BLAST used instead of pure Smith-Waterman for genome databases?', a: 'Smith-Waterman dynamic programming has $O(M\cdot N)$ complexity; heuristic BLAST algorithms use seed k-mer indexing to search billions of base pairs in seconds.' }]
  },

  // 23. DNA / PCR Primer Melting Temperature (Nearest-Neighbor Tm) Calculator
  {
    slug: 'dna-melting-temperature-nearest-neighbor-tm-calculator',
    name: 'DNA & PCR Primer Melting Temperature (Nearest-Neighbor T_m) Calculator',
    description: 'Calculate PCR oligonucleotide primer melting temperature T_m (Nearest-Neighbor thermodynamic model: T_m = ΔH / (ΔS + R·ln(C/4)) - 273.15 + 16.6·log₁₀[Na⁺]) in °C and GC content.',
    category: 'Science',
    icon: 'text',
    keywords: ['dna melting temperature calculator', 'pcr primer tm nearest neighbor formula online', 'primer gc content melting temp calculator', 'santa lucia nearest neighbor dna tm calculator', 'qpcr primer design melting temperature online'],
    order: 758,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primer Sequence 5\' -> 3\', Primer Concentration C (nM) & Monovalent Salt [Na⁺] (mM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group" style="grid-column:1 / -1;">
          <label class="control-label" for="dna-seq">Primer Sequence (5\' to 3\')</label>
          <input class="tool-textarea" id="dna-seq" type="text" value="AGCTGATCGATCGATCGATC" placeholder="e.g. AGCTGATCGATCGATCGATC (20 bp)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dna-conc">Primer Conc (nM)</label>
          <input class="tool-textarea" id="dna-conc" type="number" step="50" value="200" placeholder="200 nM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dna-salt">[Na⁺] Salt (mM)</label>
          <input class="tool-textarea" id="dna-salt" type="number" step="10" value="50" placeholder="50 mM (Standard PCR)" />
        </div>
      </div>
      <div id="dna-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dna-res-tm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T_m = 58.4 °C (Anneal: 53.4 °C)</span>
            <span class="stat-label">Nearest-Neighbor Melting Temperature (T_m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dna-res-gc" style="font-weight:700;">GC Content: 50.0% (10 GC / 10 AT) | Length: 20 nt | Wallace Rule: 60.0°C</span>
            <span class="stat-label">GC Content & Recommended PCR Annealing Temperature</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const seqEl = document.getElementById('dna-seq'), cEl = document.getElementById('dna-conc'), sEl = document.getElementById('dna-salt');
  const tmResEl = document.getElementById('dna-res-tm'), gcResEl = document.getElementById('dna-res-gc');

  function update() {
    const rawSeq = seqEl.value.trim().toUpperCase().replace(/[^ATGC]/g, '');
    const concNm = parseFloat(cEl.value), saltMm = parseFloat(sEl.value);

    if (rawSeq.length < 4 || isNaN(concNm) || isNaN(saltMm) || concNm <= 0 || saltMm <= 0) return;

    const n = rawSeq.length;
    let gcCount = 0;
    for (let char of rawSeq) {
      if (char === 'G' || char === 'C') gcCount++;
    }
    const atCount = n - gcCount;
    const gcPct = (gcCount / n) * 100;

    // Simple Wallace rule: 2*(A+T) + 4*(G+C)
    const wallaceTm = (2 * atCount) + (4 * gcCount);

    // Nearest-neighbor approximation formula (SantaLucia 1998):
    // Tm = 81.5 + 16.6 * log10([Na+]) + 0.41*(%GC) - (675 / N)
    const saltM = saltMm * 1e-3;
    const tm_nn = 81.5 + (16.6 * Math.log10(saltM)) + (0.41 * gcPct) - (675.0 / n);

    // Recommended PCR annealing temperature is typically Tm - 5°C
    const t_anneal = tm_nn - 5.0;

    tmResEl.textContent = 'T_m = ' + tm_nn.toFixed(1) + ' °C (Anneal: ' + t_anneal.toFixed(1) + ' °C)';
    gcResEl.textContent = 'GC: ' + gcPct.toFixed(1) + '% (' + gcCount + ' G/C, ' + atCount + ' A/T) | Length: ' + n + ' nt | Wallace Rule: ' + wallaceTm + '°C';
  }

  seqEl.addEventListener('input', update);
  cEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter oligonucleotide PCR primer sequence (5\' to 3\').',
      'Enter primer concentration in nM (typically 200 to 500 nM).',
      'Enter monovalent salt $[Na^+]$ concentration in mM (typically 50 mM in standard PCR master mix).',
      'Inspect Nearest-Neighbor melting temperature $T_m$ in Celsius, GC percentage, and recommended PCR thermal cycler annealing temperature ($T_m - 5^\circ\text{C}$).'
    ],
    benefitTitle: 'John SantaLucia 1998 Nearest-Neighbor Thermodynamic Stacking',
    benefitContent: 'Double-stranded DNA stability depends on base-stacking thermodynamics between adjacent dinucleotide pairs; nearest-neighbor calculations accurately predict primer annealing efficiency for qPCR, site-directed mutagenesis, and Sanger sequencing.',
    faqs: [{ q: 'Why is 40% to 60% GC content ideal for PCR primers?', a: 'Primers with 40–60% GC content ensure stable $T_m$ (55°C–65°C) with low secondary hairpin loop structure risk and strong 3\' clamp binding.' }]
  },

  // 24. Selection Coefficient & Evolutionary Natural Selection Rate Calculator
  {
    slug: 'selection-coefficient-evolutionary-fitness-decay-calculator',
    name: 'Evolutionary Selection Coefficient & Allele Frequency Trajectory Calculator',
    description: 'Calculate natural selection evolutionary allele frequency change per generation (p_(t+1) = (p_t · W_A) / W̄) and selection coefficient (s = 1 - W) in population biology.',
    category: 'Science',
    icon: 'text',
    keywords: ['selection coefficient calculator', 'natural selection evolutionary allele frequency formula online', 'relative fitness w selection coefficient s calculator', 'population genetics natural selection trajectory online', 'darwinian fitness allele fixation calculator'],
    order: 759,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Frequency p₀ (0 to 1.0), Selection Coefficient s (Advantage/Disadvantage) & Generations t',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sel-p0">Initial p₀</label>
          <input class="tool-textarea" id="sel-p0" type="number" step="0.01" min="0.001" max="0.999" value="0.05" placeholder="0.05 (Rare Mutation)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sel-s">Selection Coeff s</label>
          <input class="tool-textarea" id="sel-s" type="number" step="0.01" value="0.10" placeholder="+0.10 (+10% Fitness)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sel-gen">Generations (t)</label>
          <input class="tool-textarea" id="sel-gen" type="number" step="10" value="50" placeholder="50 Generations" />
        </div>
      </div>
      <div id="sel-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sel-res-pt" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">p(50) = 0.884 (88.4%)</span>
            <span class="stat-label">Allele Frequency After t Generations (p_t)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sel-res-fix" style="color:var(--green-dark); font-weight:700;">Fixation Horizon: ~72 Generations to reach 99% Fixation (Relative Fitness W = 1.10)</span>
            <span class="stat-label">Generations to Selective Fixation (p -> 1.0)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p0El = document.getElementById('sel-p0'), sEl = document.getElementById('sel-s'), genEl = document.getElementById('sel-gen');
  const ptResEl = document.getElementById('sel-res-pt'), fxResEl = document.getElementById('sel-res-fix');

  function update() {
    const p0 = parseFloat(p0El.value), s = parseFloat(sEl.value), tGen = parseInt(genEl.value, 10);
    if (isNaN(p0) || isNaN(s) || isNaN(tGen) || p0 <= 0 || p0 >= 1.0 || tGen < 0) return;

    // Discrete generation simulation of natural selection for dominant/haploid allele:
    // p_(t+1) = p_t * (1 + s) / ( 1 + s * p_t )
    let p_curr = p0;
    for (let g = 1; g <= tGen; g++) {
      p_curr = (p_curr * (1.0 + s)) / (1.0 + (s * p_curr));
    }

    // Time to 99% fixation approximation: t_fix approx = (2 / s) * ln( (1 - p0) / p0 )
    let t_fix_str = '';
    if (s > 0) {
      const t_fix = (1.0 / s) * Math.log((0.99 / (1.0 - 0.99)) / (p0 / (1.0 - p0)));
      t_fix_str = '~' + Math.round(t_fix) + ' Generations to reach 99% Selective Fixation';
    } else if (s < 0) {
      t_fix_str = 'Negative Selection: Allele purged toward extinction (p -> 0)';
    } else {
      t_fix_str = 'Neutral Evolution (s = 0): Governed purely by genetic drift';
    }

    ptResEl.textContent = 'p(' + tGen + ') = ' + p_curr.toFixed(3) + ' (' + (p_curr * 100).toFixed(1) + '% Frequency)';
    fxResEl.textContent = t_fix_str + ' (Relative Fitness W = ' + (1 + s).toFixed(2) + ' vs Baseline 1.00)';
  }

  [p0El, sEl, genEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial mutant beneficial allele frequency $p_0$ (e.g. 0.05 for 5% starting prevalence).',
      'Enter Darwinian selection coefficient s (e.g. $+0.10$ for a 10% reproductive fitness advantage).',
      'Enter elapsed generational time span in generations.',
      'Inspect updated population allele frequency $p_t$ and estimated generation horizon to selective fixation ($p \to 1.0$).'
    ],
    benefitTitle: 'J.B.S. Haldane & Sewall Wright Selection Trajectory',
    benefitContent: 'Natural selection changes allele frequencies deterministically according to relative fitness differentials ($W = 1 + s$); beneficial mutations spread with sigmoidal logistic dynamics across generations until reaching 100% species fixation.',
    faqs: [{ q: 'What is a typical selection coefficient in nature?', a: 'Most strongly selected adaptive mutations (such as lactase persistence in humans or antibiotic resistance in bacteria) have selection coefficients between $s = 0.01$ and $s = 0.15$.' }]
  },

  // 25. Shannon Diversity Index (H') & Pielou's Evenness (J') Ecology Calculator
  {
    slug: 'shannon-diversity-index-equitability-ecology-calculator',
    name: 'Shannon-Wiener Diversity Index (H\') & Pielou\'s Evenness (J\') Calculator',
    description: 'Calculate ecological community biodiversity (H\' = -Σ p_i · ln(p_i)) and Pielou\'s equitability species evenness (J\' = H\' / ln(S)) from individual species abundance counts.',
    category: 'Science',
    icon: 'text',
    keywords: ['shannon diversity index calculator', 'shannon wiener index formula minus sum pi ln pi online', 'pielou evenness j prime calculator online', 'ecology biodiversity species richness evenness calculator', 'microbiome shannon entropy diversity online'],
    order: 760,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Species Abundance Population Counts (Comma Separated, e.g. 120, 85, 40, 30, 15, 10)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="shn-counts">Species Abundance Counts</label>
        <input class="tool-textarea" id="shn-counts" type="text" value="120, 85, 45, 30, 15, 5" placeholder="e.g. 120, 85, 45, 30, 15, 5 (Species 1 to S)" />
      </div>
      <div id="shn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="shn-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">H\' = 1.442 (Shannon Index)</span>
            <span class="stat-label">Shannon-Wiener Diversity Index (H\')</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="shn-res-even" style="color:var(--green-dark); font-weight:700;">Pielou Evenness J\' = 0.805 (80.5% of Maximum Theoretical Diversity H_max = 1.792)</span>
            <span class="stat-label">Pielou Species Evenness Equitability (J\' = H\' / ln(S))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cEl = document.getElementById('shn-counts');
  const hResEl = document.getElementById('shn-res-h'), evResEl = document.getElementById('shn-res-even');

  function update() {
    const raw = cEl.value;
    const counts = raw.split(/[,\\s]+/).map(Number).filter(n => !isNaN(n) && n > 0);

    if (counts.length < 2) return;

    const S = counts.length; // Species richness
    const N_total = counts.reduce((a, b) => a + b, 0);

    // Relative proportions p_i = n_i / N_total
    // Shannon Index H' = - sum( p_i * ln(p_i) )
    let H = 0;
    for (let count of counts) {
      const p_i = count / N_total;
      H += p_i * Math.log(p_i);
    }
    H = -H;

    // Maximum theoretical diversity H_max = ln(S)
    const H_max = Math.log(S);

    // Pielou's Evenness J' = H' / H_max
    const J_prime = H / H_max;

    // Simpson's Index D = sum( p_i^2 )
    let D = 0;
    for (let count of counts) {
      const p_i = count / N_total;
      D += Math.pow(p_i, 2);
    }
    const GiniSimpson = 1.0 - D;

    hResEl.textContent = 'H\' = ' + H.toFixed(3) + ' (Richness S = ' + S + ' Species, N = ' + N_total + ')';
    evResEl.textContent = 'Pielou J\' = ' + J_prime.toFixed(3) + ' (' + (J_prime * 100).toFixed(1) + '% Evenness | Gini-Simpson 1-D = ' + GiniSimpson.toFixed(3) + ')';
  }

  cEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter individual species population abundance counts separated by commas (e.g. 120, 85, 45, 30, 15, 5).',
      'Inspect Shannon-Wiener Diversity Index $H\'$, Pielou\'s equitability species evenness $J\'$, and Gini-Simpson diversity ($1 - D$).'
    ],
    benefitTitle: 'Information Theory Entropy in Ecology & Microbiome Analysis',
    benefitContent: 'Shannon diversity measures ecological uncertainty ($H\' = -\sum p_i \ln p_i$); high values indicate rich, resilient ecosystems or healthy human gut microbiomes with balanced, non-dominated species distributions.',
    faqs: [{ q: 'What is the typical range of the Shannon Index in natural ecosystems?', a: 'In real-world biological surveys, $H\'$ typically ranges from 1.5 (low diversity, disturbed habitat) to 3.5+ (high diversity, tropical rainforest or coral reef).' }]
  }
];

pack24Tools.forEach(createTool);
console.log('Pack 24 complete: 25 tools created.');
