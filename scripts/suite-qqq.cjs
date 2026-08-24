const { createTool } = require('./generate-curated-tools.cjs');

// Suite QQQ: 6 Tools in Laser Cavities, Interferometry, Pockels Cells & Spatial Filters to reach 655 tools
const toolsSuiteQQQ = [
  // 1. Fizeau Optical Interferometer Fringe Flatness Calculator
  {
    slug: 'fizeau-interferometer-fringe-flatness-calculator',
    name: 'Fizeau Interferometer Optical Surface Flatness Calculator',
    description: 'Calculate optical mirror and window peak-to-valley flatness deviation (Δh = N · (λ / 2)) in nanometers and fractions of a wave (λ/10, λ/20) from interferometric fringe count.',
    category: 'Science',
    icon: 'text',
    keywords: ['fizeau interferometer calculator', 'optical flatness fringe formula', 'peak to valley flatness lambda over 20 calculator', 'interferometric fringe deviation nanometers online', 'optical flat surface testing calculator'],
    order: 528,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Test Laser Wavelength λ (nm) & Fringe Deviation Count (Fringes N)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fiz-lam">Test Wavelength λ (nm)</label>
          <input class="tool-textarea" id="fiz-lam" type="number" step="any" value="632.8" placeholder="632.8 nm (He-Ne Red)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fiz-n">Fringe Deviation (N)</label>
          <input class="tool-textarea" id="fiz-n" type="number" step="0.05" value="0.10" placeholder="0.10 Fringes (1/10th fringe)" />
        </div>
      </div>
      <div id="fiz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fiz-res-nm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">31.64 nm (λ / 20)</span>
            <span class="stat-label">Peak-to-Valley Flatness Deviation (P-V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fiz-res-grade" style="color:var(--green-dark); font-weight:700;">Precision Laser Quality (λ / 20 Surface)</span>
            <span class="stat-label">Optical Quality Grade</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('fiz-lam'), nEl = document.getElementById('fiz-n');
  const nmResEl = document.getElementById('fiz-res-nm'), grResEl = document.getElementById('fiz-res-grade');

  function update() {
    const lamNm = parseFloat(lEl.value), N = parseFloat(nEl.value);
    if (isNaN(lamNm) || isNaN(N) || lamNm <= 0 || N < 0) return;

    // In reflection Fizeau interferometry: 1 fringe = lambda / 2 surface height
    const pvNm = N * (lamNm / 2);
    const lambdaFrac = N * 0.5;
    const invFrac = lambdaFrac > 0 ? (1 / lambdaFrac) : 0;

    nmResEl.textContent = pvNm.toFixed(2) + ' nm (λ / ' + invFrac.toFixed(1) + ' @ ' + lamNm + ' nm)';

    if (pvNm <= 32) {
      grResEl.textContent = 'Ultra-Precision Laser Optics (λ/20 Flatness: High-Power Mirrors)';
      grResEl.style.color = '#22543d';
    } else if (pvNm <= 65) {
      grResEl.textContent = 'Precision Optical Grade (λ/10 Flatness: Research Mirrors)';
      grResEl.style.color = '#22543d';
    } else if (pvNm <= 160) {
      grResEl.textContent = 'Standard Commercial Optics (λ/4 Flatness)';
      grResEl.style.color = '#2563eb';
    } else {
      grResEl.textContent = 'Commercial Window Glass (> λ/4 Flatness)';
      grResEl.style.color = '#d97706';
    }
  }

  lEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter testing laser wavelength in nanometers (632.8 nm He-Ne red standard).',
      'Enter fringe line curvature deviation count N measured against a reference master optical flat.',
      'Inspect peak-to-valley surface height error in nanometers and optical wave fraction (e.g. $\\lambda/10$, $\\lambda/20$).'
    ],
    benefitTitle: 'Hippolyte Fizeau 1862 Interferometric Metrology',
    benefitContent: 'Because light makes a double pass in reflection interferometry, a 1-fringe shift corresponds to an optical height difference of exactly half a wavelength ($\\Delta h = \\lambda / 2$), enabling sub-nanometer surface precision testing.',
    faqs: [{ q: 'What is a λ/20 optical surface?', a: 'At 633 nm He-Ne wavelength, a $\\lambda/20$ mirror surface has less than $633 / 20 = 31.65\\text{ nm}$ of peak-to-valley height distortion.' }]
  },

  // 2. Mach-Zehnder Optical Interferometer Phase Shift Calculator
  {
    slug: 'mach-zehnder-interferometer-phase-shift-calculator',
    name: 'Mach-Zehnder Interferometer Optical Phase Shift Calculator',
    description: 'Calculate optical phase delay (ΔΦ = (2 · π / λ) · Δn · L) in radians and degrees for electro-optic phase modulators and refractive index gas sensors.',
    category: 'Science',
    icon: 'text',
    keywords: ['mach zehnder interferometer calculator', 'optical phase shift formula 2 pi delta n l over lambda', 'electro optic phase modulator calculator online', 'optical gas sensor phase shift calculator', 'quantum optics mach zehnder online'],
    order: 529,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wavelength λ (nm), Interaction Length L (mm) & Refractive Index Change Δn',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mz-lam">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="mz-lam" type="number" step="any" value="1550" placeholder="1550 nm (Telecom Fiber)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mz-l">Arm Length L (mm)</label>
          <input class="tool-textarea" id="mz-l" type="number" step="any" value="20.0" placeholder="20.0 mm (LiNbO3 Modulator)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mz-dn">Index Change Δn</label>
          <input class="tool-textarea" id="mz-dn" type="number" step="0.00001" value="0.00003875" placeholder="0.00003875" />
        </div>
      </div>
      <div id="mz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mz-res-phi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">π Radians (180.0°)</span>
            <span class="stat-label">Optical Phase Shift (ΔΦ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mz-res-trans" style="font-weight:700;">0.0% Transmission (Complete Extinction)</span>
            <span class="stat-label">Mach-Zehnder Intensity Output</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('mz-lam'), lenEl = document.getElementById('mz-l'), dnEl = document.getElementById('mz-dn');
  const pResEl = document.getElementById('mz-res-phi'), tResEl = document.getElementById('mz-res-trans');

  function update() {
    const lamNm = parseFloat(lEl.value), lMm = parseFloat(lenEl.value), dn = parseFloat(dnEl.value);
    if (isNaN(lamNm) || isNaN(lMm) || isNaN(dn) || lamNm <= 0 || lMm <= 0) return;

    const lamM = lamNm * 1e-9;
    const lM = lMm * 1e-3;

    // Delta_Phi = (2 * pi / lambda) * dn * L  [radians]
    const dPhiRad = (2 * Math.PI * dn * lM) / lamM;
    const dPhiDeg = (dPhiRad * 180) / Math.PI;
    const piMultiple = dPhiRad / Math.PI;

    // Intensity transmission T = cos^2(Delta_Phi / 2)
    const trans = Math.pow(Math.cos(dPhiRad / 2), 2) * 100;

    pResEl.textContent = dPhiRad.toFixed(3) + ' rad (' + piMultiple.toFixed(2) + 'π / ' + dPhiDeg.toFixed(1) + '°)';
    tResEl.textContent = trans.toFixed(1) + '% Output Transmission (cos²(ΔΦ/2))';
  }

  [lEl, lenEl, dnEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser wavelength in nanometers (1550 nm standard for optical fiber telecommunications).',
      'Enter interaction waveguide or sample cell length L in millimeters.',
      'Enter refractive index modulation difference $\\Delta n$ between sample and reference arms.',
      'Inspect total induced optical phase shift in radians/degrees and interferometer output intensity transmission.'
    ],
    benefitTitle: 'Ludwig Mach & Ludwig Zehnder 1891 Split-Path Design',
    benefitContent: 'The Mach-Zehnder interferometer splits light into two isolated physical paths before recombining them, forming the backbone of high-speed 100G/400G lithium niobate ($LiNbO_3$) electro-optic telecommunication modulators.',
    faqs: [{ q: 'What phase shift causes complete destructive extinction?', a: 'An exact phase shift of $\\Delta\\Phi = \\pi\\text{ radians} = 180^\\circ$ causes complete destructive interference (0% transmission).' }]
  },

  // 3. Acousto-Optic Modulator (AOM) Bragg Angle & Deflection Calculator
  {
    slug: 'acousto-optic-modulator-bragg-angle-calculator',
    name: 'Acousto-Optic Modulator (AOM) Bragg Angle & Deflection Calculator',
    description: 'Calculate Acousto-Optic Modulator Bragg diffraction angle (θ_B = (λ · f) / (2 · v)) in milliradians and acoustic wavelength in TeO₂ / fused silica crystals.',
    category: 'Science',
    icon: 'text',
    keywords: ['aom bragg angle calculator', 'acousto optic modulator formula online', 'aom laser deflection angle calculator', 'bragg cell frequency sound velocity online', 'photonics aom beam steering calculator'],
    order: 530,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Laser λ (nm), Acoustic RF Frequency f (MHz) & Sound Velocity v (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="aom-lam">Laser λ (nm)</label>
          <input class="tool-textarea" id="aom-lam" type="number" step="any" value="532" placeholder="532 nm (Green)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="aom-f">RF Frequency f (MHz)</label>
          <input class="tool-textarea" id="aom-f" type="number" step="any" value="80" placeholder="80 MHz RF Drive" />
        </div>
        <div class="control-group">
          <label class="control-label" for="aom-v">Acoustic Speed v (m/s)</label>
          <input class="tool-textarea" id="aom-v" type="number" step="any" value="4200" placeholder="4200 m/s (TeO2 Crystal)" />
        </div>
      </div>
      <div id="aom-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="aom-res-thb" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">5.07 mrad (0.290°)</span>
            <span class="stat-label">Bragg Alignment Angle (θ_B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="aom-res-sep" style="font-weight:700;">2θ_B = 10.13 mrad Total Beam Deflection</span>
            <span class="stat-label">Diffracted 1st-Order Deflection</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('aom-lam'), fEl = document.getElementById('aom-f'), vEl = document.getElementById('aom-v');
  const thResEl = document.getElementById('aom-res-thb'), spResEl = document.getElementById('aom-res-sep');

  function update() {
    const lamNm = parseFloat(lEl.value), fMhz = parseFloat(fEl.value), vMs = parseFloat(vEl.value);
    if (isNaN(lamNm) || isNaN(fMhz) || isNaN(vMs) || lamNm <= 0 || fMhz <= 0 || vMs <= 0) return;

    const lamM = lamNm * 1e-9;
    const fHz = fMhz * 1e6;

    // Acoustic wavelength Lambda = v / f (microns)
    const bigLamM = vMs / fHz;
    const bigLamUm = bigLamM * 1e6;

    // Bragg angle theta_B = (lambda * f) / (2 * v)  [radians]
    const thetaBRad = (lamM * fHz) / (2 * vMs);
    const thetaBMrad = thetaBRad * 1000;
    const thetaBDeg = (thetaBRad * 180) / Math.PI;
    const totalDeflectMrad = thetaBMrad * 2;

    thResEl.textContent = thetaBMrad.toFixed(2) + ' mrad (' + thetaBDeg.toFixed(3) + '°)';
    spResEl.textContent = '2θ_B = ' + totalDeflectMrad.toFixed(2) + ' mrad Deflection (Acoustic Pitch Λ = ' + bigLamUm.toFixed(1) + ' μm)';
  }

  [lEl, fEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser wavelength in nanometers.',
      'Enter acoustic RF driving frequency in MHz (typically 40 to 200 MHz).',
      'Enter acoustic sound velocity in the crystal in m/s ($TeO_2 = 4,200\text{ m/s}$, Fused Silica = $5,960\text{ m/s}$).',
      'Inspect optimum Bragg angle alignment and total 1st-order diffracted beam separation angle.'
    ],
    benefitTitle: 'Travelling Acoustic Wave Phase Grating',
    benefitContent: 'A piezoelectric transducer launches ultrasonic acoustic waves into the optical crystal, creating a moving refractive index sinusoidal grating that diffracts laser light with nanosecond shutter switching speeds.',
    faqs: [{ q: 'What is the frequency of the diffracted laser beam?', a: 'The 1st-order diffracted beam undergoes a Doppler frequency shift equal to the RF drive frequency ($f_{\text{laser}} \pm f_{\text{RF}}$).' }]
  },

  // 4. Electro-Optic Pockels Cell Half-Wave Voltage (V_π) Calculator
  {
    slug: 'electro-optic-pockels-cell-half-wave-voltage-calculator',
    name: 'Electro-Optic Pockels Cell Half-Wave Voltage (V_π) Calculator',
    description: 'Calculate Pockels cell half-wave switching voltage (V_π = (λ · d) / (2 · n₀³ · r₆₃ · L)) for high-speed laser Q-switching and pulse picking crystals (KD*P, BBO, RTP).',
    category: 'Science',
    icon: 'text',
    keywords: ['pockels cell half wave voltage calculator', 'v pi formula electro optic effect', 'kdp bbo pockels cell voltage calculator', 'laser q switch pockels voltage online', 'transverse pockels cell half wave calculator'],
    order: 531,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wavelength λ (nm), Crystal Thickness d (mm), Length L (mm) & Electro-Optic r₆₃ (pm/V)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="poc-lam">Laser λ (nm)</label>
          <input class="tool-textarea" id="poc-lam" type="number" step="any" value="1064" placeholder="1064 nm (Nd:YAG Laser)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="poc-d">Electrode Gap d (mm)</label>
          <input class="tool-textarea" id="poc-d" type="number" step="any" value="3.0" placeholder="3.0 mm Aperture" />
        </div>
        <div class="control-group">
          <label class="control-label" for="poc-l">Crystal Length L (mm)</label>
          <input class="tool-textarea" id="poc-l" type="number" step="any" value="20.0" placeholder="20.0 mm Length" />
        </div>
        <div class="control-group">
          <label class="control-label" for="poc-r63">E-O Coeff r (pm/V)</label>
          <input class="tool-textarea" id="poc-r63" type="number" step="any" value="24.0" placeholder="24.0 pm/V (KD*P / DKDP)" />
        </div>
      </div>
      <div id="poc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="poc-res-vpi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,048 Volts (V_π)</span>
            <span class="stat-label">Half-Wave Retardation Voltage (V_π)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="poc-res-quarter" style="font-weight:700;">524 V (Quarter-Wave V_π/2 Q-Switch)</span>
            <span class="stat-label">Quarter-Wave Voltage (Double-Pass Q-Switch)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('poc-lam'), dEl = document.getElementById('poc-d');
  const lenEl = document.getElementById('poc-l'), rEl = document.getElementById('poc-r63');
  const vResEl = document.getElementById('poc-res-vpi'), qResEl = document.getElementById('poc-res-quarter');

  // Refractive index n0 ≈ 1.50 for KD*P crystal
  const n0 = 1.50;

  function update() {
    const lamNm = parseFloat(lEl.value), dMm = parseFloat(dEl.value);
    const lMm = parseFloat(lenEl.value), rPmV = parseFloat(rEl.value);

    if (isNaN(lamNm) || isNaN(dMm) || isNaN(lMm) || isNaN(rPmV) || lamNm <= 0 || dMm <= 0 || lMm <= 0 || rPmV <= 0) return;

    const lamM = lamNm * 1e-9;
    const dM = dMm * 1e-3;
    const lM = lMm * 1e-3;
    const rM_V = rPmV * 1e-12; // pm/V to m/V

    // Transverse Pockels cell half-wave voltage:
    // V_pi = (lambda * d) / (2 * n0^3 * r * L)  [Volts]
    const n0Cubed = Math.pow(n0, 3);
    const Vpi = (lamM * dM) / (2 * n0Cubed * rM_V * lM);
    const Vquarter = Vpi / 2;

    vResEl.textContent = Math.round(Vpi).toLocaleString() + ' Volts (V_π)';
    qResEl.textContent = Math.round(Vquarter).toLocaleString() + ' Volts (V_π/2 Quarter-Wave Voltage for Laser Q-Switching)';
  }

  [lEl, dEl, lenEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser wavelength in nanometers.',
      'Enter crystal electrode gap aperture thickness d in mm.',
      'Enter crystal optical path length L in mm.',
      'Enter Pockels electro-optic tensor coefficient r in picometers/Volt (KD*P ≈ 24 pm/V, BBO ≈ 2.2 pm/V).',
      'Inspect half-wave ($V_\\pi$) and quarter-wave ($V_{\\pi/2}$) high-voltage switching thresholds.'
    ],
    benefitTitle: 'Friedrich Pockels 1893 Linear Electro-Optic Effect',
    benefitContent: 'Applying an electric field directly alters the crystal\'s birefringent refractive indices, rotating polarized laser light by 90° in sub-nanosecond timescales to switch giant pulses out of laser cavities.',
    faqs: [{ q: 'Why is quarter-wave voltage (V_π/2) used in laser cavities?', a: 'Because light passes through the Pockels crystal twice (forward and backward reflecting off the cavity end mirror), applying $V_{\\pi/2}$ delivers the full half-wave 90° polarization rotation.' }]
  },

  // 5. Fabry-Pérot Interferometer Optical Cavity Finesse & Free Spectral Range (FSR) Calculator
  {
    slug: 'fabry-perot-interferometer-finesse-fsr-calculator',
    name: 'Fabry-Pérot Optical Cavity Finesse & Free Spectral Range (FSR) Calculator',
    description: 'Calculate Fabry-Pérot optical resonator Free Spectral Range (FSR = c / (2 · n · L)), coefficient of finesse (ℱ = π · √R / (1 - R)), and resonance linewidth (Δν = FSR / ℱ).',
    category: 'Science',
    icon: 'text',
    keywords: ['fabry perot calculator', 'optical cavity finesse formula online', 'free spectral range fsr c over 2l calculator', 'fabry perot resonance linewidth online', 'laser optical resonator cavity calculator'],
    order: 532,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cavity Length L (mm), Mirror Reflectivity R (%) & Medium Index n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fp-l">Cavity Length L (mm)</label>
          <input class="tool-textarea" id="fp-l" type="number" step="any" value="50.0" placeholder="50.0 mm (5 cm Etalon)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fp-r">Mirror Reflectivity R (%)</label>
          <input class="tool-textarea" id="fp-r" type="number" step="0.1" min="10" max="99.99" value="95.0" placeholder="95.0% Reflectance" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fp-n">Medium Index n</label>
          <input class="tool-textarea" id="fp-n" type="number" step="0.01" value="1.00" placeholder="1.00 (Air / Vacuum)" />
        </div>
      </div>
      <div id="fp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fp-res-fsr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.00 GHz (FSR)</span>
            <span class="stat-label">Free Spectral Range (FSR = c / 2nL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fp-res-fin" style="font-weight:700;">ℱ = 61.2 | Linewidth Δν = 49.0 MHz</span>
            <span class="stat-label">Cavity Finesse & Resonance Bandwidth</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('fp-l'), rEl = document.getElementById('fp-r'), nEl = document.getElementById('fp-n');
  const fsrResEl = document.getElementById('fp-res-fsr'), finResEl = document.getElementById('fp-res-fin');

  const c_mps = 299792458; // m / s

  function update() {
    const lMm = parseFloat(lEl.value), rPct = parseFloat(rEl.value), n = parseFloat(nEl.value);
    if (isNaN(lMm) || isNaN(rPct) || isNaN(n) || lMm <= 0 || rPct <= 0 || rPct >= 100 || n <= 0) return;

    const lM = lMm * 1e-3;
    const R = rPct / 100;

    // FSR = c / (2 * n * L)  [Hz]
    const fsrHz = c_mps / (2 * n * lM);
    const fsrGhz = fsrHz / 1e9;

    // Finesse F = (pi * sqrt(R)) / (1 - R)
    const finesse = (Math.PI * Math.sqrt(R)) / (1 - R);
    // Linewidth delta_nu = FSR / Finesse  [Hz]
    const linewidthHz = fsrHz / finesse;
    const linewidthMhz = linewidthHz / 1e6;

    fsrResEl.textContent = (fsrGhz >= 1.0 ? fsrGhz.toFixed(2) + ' GHz' : (fsrGhz * 1000).toFixed(1) + ' MHz') + ' (FSR)';
    finResEl.textContent = 'ℱ = ' + finesse.toFixed(1) + ' Finesse | Δν = ' + linewidthMhz.toFixed(1) + ' MHz FWHM';
  }

  [lEl, rEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter Fabry-Pérot optical cavity mirror spacing length L in millimeters.',
      'Enter cavity mirror optical power reflectivity percentage R (typically 90% to 99.9%).',
      'Inspect Free Spectral Range (FSR) frequency mode spacing, cavity Finesse $\\mathcal{F}$, and transmission resonance linewidth $\\Delta\\nu$.'
    ],
    benefitTitle: 'Charles Fabry & Alfred Pérot 1899 Multiple-Beam Resonator',
    benefitContent: 'High mirror reflectivity traps light inside the cavity for hundreds of round trips, creating ultra-narrow spectroscopic resonance peaks for laser frequency stabilization and optical spectrum analyzers.',
    faqs: [{ q: 'What is Free Spectral Range (FSR)?', a: 'FSR is the frequency spacing between adjacent longitudinal resonance transmission peaks of the optical cavity ($FSR = c / 2nL$).' }]
  },

  // 6. Laser Spatial Filter Pinhole Diameter Sizing Calculator
  {
    slug: 'spatial-filter-pinhole-diameter-laser-calculator',
    name: 'Laser Spatial Filter Pinhole Diameter Sizing Calculator',
    description: 'Calculate optimum spatial filter microscope objective pinhole diameter (D_pinhole ≈ 1.5 · (1.22 · λ · f / D_beam)) in micrometers to clean high-frequency laser beam noise.',
    category: 'Science',
    icon: 'text',
    keywords: ['spatial filter pinhole calculator', 'laser spatial filter formula online', 'pinhole diameter airy disk calculator', 'microscope objective laser cleaning pinhole', 'photonics spatial filter pinhole sizing online'],
    order: 533,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Laser Wavelength λ (nm), Beam Diameter D_beam (mm) & Objective Focal Length f (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="spf-lam">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="spf-lam" type="number" step="any" value="632.8" placeholder="632.8 nm (He-Ne)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spf-db">Beam Diameter (mm)</label>
          <input class="tool-textarea" id="spf-db" type="number" step="any" value="1.0" placeholder="1.0 mm 1/e²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spf-f">Objective Focal f (mm)</label>
          <input class="tool-textarea" id="spf-f" type="number" step="any" value="9.0" placeholder="9.0 mm (20x Objective)" />
        </div>
      </div>
      <div id="spf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="spf-res-pinh" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">10.4 μm Pinhole</span>
            <span class="stat-label">Recommended Pinhole Diameter (~1.5 · Airy Disk)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="spf-res-airy" style="font-weight:700;">6.95 μm Airy Central Spot</span>
            <span class="stat-label">Focal Spot Airy Disk Diameter</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('spf-lam'), dbEl = document.getElementById('spf-db'), fEl = document.getElementById('spf-f');
  const pResEl = document.getElementById('spf-res-pinh'), aResEl = document.getElementById('spf-res-airy');

  function update() {
    const lamNm = parseFloat(lEl.value), dbMm = parseFloat(dbEl.value), fMm = parseFloat(fEl.value);
    if (isNaN(lamNm) || isNaN(dbMm) || isNaN(fMm) || lamNm <= 0 || dbMm <= 0 || fMm <= 0) return;

    const lamM = lamNm * 1e-9;
    const dbM = dbMm * 1e-3;
    const fM = fMm * 1e-3;

    // Airy disk focal diameter d_airy = (1.22 * lambda * f) / (db / 2) = 2.44 * lambda * f / db  [meters]
    const dAiryM = (2.44 * lamM * fM) / dbM;
    const dAiryUm = dAiryM * 1e6;

    // Standard practical pinhole is chosen at ~1.5x Airy disk diameter to pass ~99% TEM00 power while blocking noise
    const dPinholeUm = dAiryUm * 1.5;

    // Available commercial pinhole standard sizes: 5, 10, 15, 25, 50 um
    let commPinhole = '';
    if (dPinholeUm <= 7.5) commPinhole = '5 μm Standard Pinhole';
    else if (dPinholeUm <= 12.5) commPinhole = '10 μm Standard Pinhole';
    else if (dPinholeUm <= 18) commPinhole = '15 μm Standard Pinhole';
    else if (dPinholeUm <= 35) commPinhole = '25 μm Standard Pinhole';
    else commPinhole = '50 μm Standard Pinhole';

    pResEl.textContent = dPinholeUm.toFixed(1) + ' μm (' + commPinhole + ')';
    aResEl.textContent = dAiryUm.toFixed(2) + ' μm Central Airy Spot (Passes > 99% TEM₀₀ Energy)';
  }

  [lEl, dbEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser wavelength in nanometers.',
      'Enter raw input laser beam diameter $D_{\\text{beam}}$ in millimeters.',
      'Enter focusing microscope objective focal length f in millimeters (e.g. 10x = 16 mm, 20x = 9 mm, 40x = 4.5 mm).',
      'Inspect recommended precision pinhole aperture size in micrometers (μm) to remove spatial intensity speckle noise.'
    ],
    benefitTitle: 'Fourier Plane Spatial Frequency Filtering',
    benefitContent: 'A spatial filter transforms laser dust scattering and diffraction rings into high-frequency spatial components that focus outside the central Airy spot; a pinhole placed at the focal point transmits only the clean, pristine TEM₀₀ Gaussian beam.',
    faqs: [{ q: 'Why is pinhole size chosen at 1.5x the Airy disk diameter?', a: 'Sizing the pinhole at 1.5x the Airy disk transmits ~99% of the desired TEM₀₀ Gaussian laser beam power while comfortably aligning without clipping.' }]
  }
];

toolsSuiteQQQ.forEach(createTool);
console.log('Suite QQQ complete: 6 tools created.');
