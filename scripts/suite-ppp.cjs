const { createTool } = require('./generate-curated-tools.cjs');

// Suite PPP: 5 Tools in Laser Optics, Photonics, Dispersion & Diffraction Limits to reach 650 tools
const toolsSuitePPP = [
  // 1. Fresnel Reflection Coefficients & Brewster's Angle Calculator
  {
    slug: 'fresnel-reflection-snell-calculator',
    name: 'Fresnel Reflection Coefficients & Brewster\'s Angle Calculator',
    description: 'Calculate dielectric interface optical reflectance (R_s, R_p, R_unpolarized) and Brewster polarization angle (θ_B = arctan(n₂ / n₁)) from refractive indices.',
    category: 'Science',
    icon: 'text',
    keywords: ['fresnel reflection calculator', 'brewster angle calculator online', 'fresnel s and p polarization reflection formula', 'dielectric surface reflectance calculator', 'optics fresnel equations online'],
    order: 523,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Medium 1 Index n₁, Medium 2 Index n₂ & Angle of Incidence θ₁ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="frn-n1">Medium 1 (n₁)</label>
          <input class="tool-textarea" id="frn-n1" type="number" step="0.01" value="1.00" placeholder="1.00 (Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="frn-n2">Medium 2 (n₂)</label>
          <input class="tool-textarea" id="frn-n2" type="number" step="0.01" value="1.50" placeholder="1.50 (Crown Glass)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="frn-th1">Angle θ₁ (°)</label>
          <input class="tool-textarea" id="frn-th1" type="number" min="0" max="89.9" value="45.0" placeholder="45.0°" />
        </div>
      </div>
      <div id="frn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="frn-res-unpol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">4.72% Reflected</span>
            <span class="stat-label">Unpolarized Reflectance (R_avg)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="frn-res-brew" style="font-weight:700;">θ_B = 56.31° (Brewster Angle)</span>
            <span class="stat-label">100% P-Polarization Brewster Angle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('frn-n1'), n2El = document.getElementById('frn-n2'), th1El = document.getElementById('frn-th1');
  const unResEl = document.getElementById('frn-res-unpol'), brResEl = document.getElementById('frn-res-brew');

  function toRad(deg) { return (deg * Math.PI) / 180; }
  function toDeg(rad) { return (rad * 180) / Math.PI; }

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value), th1Deg = parseFloat(th1El.value);
    if (isNaN(n1) || isNaN(n2) || isNaN(th1Deg) || n1 <= 0 || n2 <= 0 || th1Deg < 0 || th1Deg >= 90) return;

    const th1 = toRad(th1Deg);
    // Snell's Law: sin(th2) = (n1 / n2) * sin(th1)
    const sinTh2 = (n1 / n2) * Math.sin(th1);

    // Brewster angle theta_B = arctan(n2 / n1)
    const brewsterDeg = toDeg(Math.atan(n2 / n1));

    if (sinTh2 > 1.0) {
      unResEl.textContent = '100.0% Total Internal Reflection (TIR)';
      brResEl.textContent = 'θ_critical = ' + toDeg(Math.asin(n2 / n1)).toFixed(2) + '° (TIR Exceeded)';
      return;
    }

    const th2 = Math.asin(sinTh2);

    // Fresnel Equations:
    // r_s = [ n1*cos(th1) - n2*cos(th2) ] / [ n1*cos(th1) + n2*cos(th2) ]
    const rs = (n1 * Math.cos(th1) - n2 * Math.cos(th2)) / (n1 * Math.cos(th1) + n2 * Math.cos(th2));
    const Rs = Math.pow(rs, 2);

    // r_p = [ n2*cos(th1) - n1*cos(th2) ] / [ n2*cos(th1) + n1*cos(th2) ]
    const rp = (n2 * Math.cos(th1) - n1 * Math.cos(th2)) / (n2 * Math.cos(th1) + n1 * Math.cos(th2));
    const Rp = Math.pow(rp, 2);

    const R_unpol = (Rs + Rp) / 2;

    unResEl.textContent = (R_unpol * 100).toFixed(2) + '% Reflected (Rs: ' + (Rs * 100).toFixed(2) + '%, Rp: ' + (Rp * 100).toFixed(2) + '%)';
    brResEl.textContent = 'θ_B = ' + brewsterDeg.toFixed(2) + '° (Zero P-Wave Reflection)';
  }

  [n1El, n2El, th1El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter refractive index of incident Medium 1 (air = 1.000).',
      'Enter refractive index of transmitting Medium 2 (glass = 1.50, water = 1.33).',
      'Enter incidence angle $\\theta_1$ in degrees.',
      'Inspect s-polarized and p-polarized reflectance and zero-reflection Brewster angle.'
    ],
    benefitTitle: 'Augustin-Jean Fresnel\'s 1823 Wave Optics Equations',
    benefitContent: 'Fresnel formulas describe how light splits between reflection and refraction at optical interfaces; at Brewster\'s angle ($\\theta_B = \\arctan(n_2/n_1)$), p-polarized light transmits with 100% transmission and zero reflection.',
    faqs: [{ q: 'What is normal incidence reflection for glass (n = 1.5) in air?', a: '$R = ((1.5 - 1) / (1.5 + 1))^2 = (0.5 / 2.5)^2 = 0.04 = 4.0\%$ reflected light per surface.' }]
  },

  // 2. Abbe Number & Optical Glass Chromatic Dispersion Calculator
  {
    slug: 'abbe-number-chromatic-dispersion-calculator',
    name: 'Abbe Number & Optical Glass Chromatic Dispersion Calculator',
    description: 'Calculate Abbe number V-number (V_d = (n_d - 1) / (n_F - n_C)) to evaluate chromatic dispersion and design achromatic doublet camera lenses.',
    category: 'Science',
    icon: 'text',
    keywords: ['abbe number calculator', 'vd formula chromatic dispersion online', 'optical glass dispersion calculator', 'achromatic doublet lens design online', 'ernst abbe v number calculator'],
    order: 524,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fraunhofer Spectral Line Indices (n_d @ 587.6nm, n_F @ 486.1nm, n_C @ 656.3nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="abb-nd">Helium d n_d (587.6 nm)</label>
          <input class="tool-textarea" id="abb-nd" type="number" step="0.0001" value="1.5168" placeholder="1.5168 (N-BK7 Crown)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="abb-nf">Hydrogen F n_F (486.1 nm)</label>
          <input class="tool-textarea" id="abb-nf" type="number" step="0.0001" value="1.5224" placeholder="1.5224 (Blue Line)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="abb-nc">Hydrogen C n_C (656.3 nm)</label>
          <input class="tool-textarea" id="abb-nc" type="number" step="0.0001" value="1.5143" placeholder="1.5143 (Red Line)" />
        </div>
      </div>
      <div id="abb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="abb-res-vd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">V_d = 63.80</span>
            <span class="stat-label">Abbe Dispersion V-Number (V_d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="abb-res-glass" style="color:var(--green-dark); font-weight:700;">Crown Glass (Low Dispersion V_d > 55)</span>
            <span class="stat-label">Schott Glass Category</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ndEl = document.getElementById('abb-nd'), nfEl = document.getElementById('abb-nf'), ncEl = document.getElementById('abb-nc');
  const vdResEl = document.getElementById('abb-res-vd'), glResEl = document.getElementById('abb-res-glass');

  function update() {
    const nd = parseFloat(ndEl.value), nf = parseFloat(nfEl.value), nc = parseFloat(ncEl.value);
    if (isNaN(nd) || isNaN(nf) || isNaN(nc) || nd <= 1.0 || nf <= nc) return;

    // Abbe Number V_d = (nd - 1) / (nf - nc)
    const deltaN = nf - nc;
    const Vd = (nd - 1) / deltaN;

    vdResEl.textContent = 'V_d = ' + Vd.toFixed(2) + ' (Principal Dispersion Δn = ' + deltaN.toFixed(4) + ')';

    if (Vd >= 55.0) {
      glResEl.textContent = 'Crown Glass (Low Dispersion V_d ≥ 55: High Color Clarity)';
      glResEl.style.color = '#22543d';
    } else {
      glResEl.textContent = 'Flint Glass (High Dispersion V_d < 55: Strong Prism Color Spreading)';
      glResEl.style.color = '#2563eb';
    }
  }

  [ndEl, nfEl, ncEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter helium yellow d-line (587.6 nm) refractive index $n_d$.',
      'Enter hydrogen blue F-line (486.1 nm) refractive index $n_F$.',
      'Enter hydrogen red C-line (656.3 nm) refractive index $n_C$.',
      'Inspect calculated Abbe number $V_d$ and glass classification (Crown vs Flint).'
    ],
    benefitTitle: 'Ernst Abbe\'s 1870 Optical Quality Metric',
    benefitContent: 'High Abbe number ($V_d > 55$, Crown glass) indicates low chromatic aberration color fringing; pairing high-Abbe crown glass with low-Abbe flint glass forms color-corrected achromatic camera lenses.',
    faqs: [{ q: 'What is the Abbe number of standard N-BK7 glass?', a: 'Standard Schott N-BK7 optical glass has $n_d = 1.5168$ and an Abbe number of $V_d = 64.17$.' }]
  },

  // 3. Rayleigh Criterion Optical Angular Resolution Limit Calculator
  {
    slug: 'rayleigh-criterion-angular-resolution-calculator',
    name: 'Rayleigh Criterion Optical Angular Resolution Limit Calculator',
    description: 'Calculate diffraction-limited angular resolution (θ = 1.22 · λ / D) in arcseconds, microradians, and resolvable spot size for telescopes, microscopes, and cameras.',
    category: 'Science',
    icon: 'text',
    keywords: ['rayleigh criterion calculator', 'angular resolution formula theta 1.22 lambda over d', 'telescope diffraction limit calculator arcseconds', 'optical resolving power calculator online', 'airy disk radius calculator online'],
    order: 525,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wavelength λ (nm) & Aperture / Objective Diameter D (mm or inches)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ray-lam">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="ray-lam" type="number" step="any" value="550" placeholder="550 nm (Green Visible Light)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ray-d">Aperture Diameter D (mm)</label>
          <input class="tool-textarea" id="ray-d" type="number" step="any" value="200" placeholder="200 mm (8-inch Telescope)" />
        </div>
      </div>
      <div id="ray-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ray-res-arcsec" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.693 Arcseconds</span>
            <span class="stat-label">Angular Resolution Limit (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ray-res-rad" style="font-weight:700;">3.36 μrad (Airy Disk Size)</span>
            <span class="stat-label">Microradians (1.22 · λ / D)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('ray-lam'), dEl = document.getElementById('ray-d');
  const aResEl = document.getElementById('ray-res-arcsec'), rResEl = document.getElementById('ray-res-rad');

  function update() {
    const lamNm = parseFloat(lEl.value), dMm = parseFloat(dEl.value);
    if (isNaN(lamNm) || isNaN(dMm) || lamNm <= 0 || dMm <= 0) return;

    const lamM = lamNm * 1e-9;
    const dM = dMm * 1e-3;

    // Rayleigh formula: theta (radians) = 1.22 * lambda / D
    const thetaRad = 1.22 * (lamM / dM);
    const thetaArcsec = thetaRad * (180 / Math.PI) * 3600;
    const thetaUrad = thetaRad * 1e6;

    aResEl.textContent = thetaArcsec.toFixed(3) + ' Arcseconds (' + (dMm / 25.4).toFixed(1) + '" Aperture)';
    rResEl.textContent = thetaUrad.toFixed(2) + ' μrad (Resolves ' + (thetaUrad * 384400 / 1000).toFixed(2) + ' km on the Moon)';
  }

  lEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter light optical wavelength $\\lambda$ in nanometers (550 nm standard for visible light).',
      'Enter telescope mirror, camera lens, or human pupil aperture diameter D in millimeters.',
      'Inspect theoretical diffraction-limited angular resolution limit in arcseconds and microradians.'
    ],
    benefitTitle: 'Lord Rayleigh\'s 1879 Airy Disk Separation Limit',
    benefitContent: 'Two distinct point stars are resolved when the center of one star\'s central Airy diffraction peak falls on the first dark diffraction ring minimum of the other ($\\theta = 1.22\\lambda / D$).',
    faqs: [{ q: 'What is the theoretical resolution of an 8-inch (200 mm) amateur telescope in visible light?', a: '$\\theta = 1.22 \times (550 \times 10^{-9}) / 0.200 = 3.355 \times 10^{-6}\\text{ radians} = 0.692\\text{ arcseconds}$.' }]
  },

  // 4. Gaussian Laser Beam Waist, Divergence & Rayleigh Range Calculator
  {
    slug: 'laser-beam-waist-divergence-rayleigh-range-calculator',
    name: 'Gaussian Laser Beam Waist, Divergence & Rayleigh Range (z_R) Calculator',
    description: 'Calculate fundamental TEM₀₀ Gaussian laser beam Rayleigh range (z_R = (π · w₀²) / λ), far-field divergence half-angle (θ = λ / (π · w₀)), and spot size w(z).',
    category: 'Science',
    icon: 'text',
    keywords: ['gaussian beam calculator', 'laser beam waist rayleigh range formula', 'laser divergence theta lambda over pi w0', 'tem00 laser spot size at distance z online', 'photonics gaussian beam propagation calculator'],
    order: 526,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Laser Wavelength λ (nm), Beam Waist Radius w₀ (μm) & Distance z (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lsr-lam">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="lsr-lam" type="number" step="any" value="1064" placeholder="1064 nm (Nd:YAG / Fiber Laser)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lsr-w0">Waist Radius w₀ (μm)</label>
          <input class="tool-textarea" id="lsr-w0" type="number" step="any" value="25.0" placeholder="25.0 μm (50 μm Focus Spot)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lsr-z">Distance z (m)</label>
          <input class="tool-textarea" id="lsr-z" type="number" step="any" value="1.0" placeholder="1.0 meter" />
        </div>
      </div>
      <div id="lsr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lsr-res-zr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1.84 mm (z_R)</span>
            <span class="stat-label">Rayleigh Range (Collimated Depth of Focus)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lsr-res-wz" style="font-weight:700;">w(1m) = 13.55 mm Radius</span>
            <span class="stat-label">Expanded Spot Radius @ Distance z</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('lsr-lam'), w0El = document.getElementById('lsr-w0'), zEl = document.getElementById('lsr-z');
  const zrResEl = document.getElementById('lsr-res-zr'), wzResEl = document.getElementById('lsr-res-wz');

  function update() {
    const lamNm = parseFloat(lEl.value), w0Um = parseFloat(w0El.value), zM = parseFloat(zEl.value);
    if (isNaN(lamNm) || isNaN(w0Um) || isNaN(zM) || lamNm <= 0 || w0Um <= 0 || zM < 0) return;

    const lamM = lamNm * 1e-9;
    const w0M = w0Um * 1e-6;

    // Rayleigh range: z_R = (pi * w0^2) / lambda  [meters]
    const zrM = (Math.PI * Math.pow(w0M, 2)) / lamM;
    const zrMm = zrM * 1000;

    // Far-field divergence half angle theta = lambda / (pi * w0)  [rad]
    const thetaDivMrad = (lamM / (Math.PI * w0M)) * 1000;

    // Spot radius at distance z: w(z) = w0 * sqrt( 1 + (z / z_R)^2 )
    const wzM = w0M * Math.sqrt(1 + Math.pow(zM / zrM, 2));
    const wzMm = wzM * 1000;

    zrResEl.textContent = (zrMm >= 10.0 ? (zrMm / 10).toFixed(2) + ' cm' : zrMm.toFixed(2) + ' mm') + ' (z_R, 2z_R Depth: ' + (zrMm * 2).toFixed(1) + ' mm)';
    wzResEl.textContent = 'w(' + zM + 'm) = ' + wzMm.toFixed(2) + ' mm Radius (Divergence θ = ' + thetaDivMrad.toFixed(2) + ' mrad)';
  }

  [lEl, w0El, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter laser wavelength $\\lambda$ in nanometers (e.g. 532 nm Green, 633 nm HeNe, 1064 nm Fiber).',
      'Enter focused beam waist radius $w_0$ ($1/e^2$ intensity radius) in micrometers.',
      'Enter propagation target distance z in meters.',
      'Inspect Rayleigh range $z_R$ (depth of focus where beam area doubles) and expanded beam radius $w(z)$.'
    ],
    benefitTitle: 'Helmholtz Paraxial Wave Equation',
    benefitContent: 'Diffraction dictates that tighter laser focal spots diverge more rapidly into the far field ($\\theta = \\lambda / \\pi w_0$); the Rayleigh range $z_R = \\pi w_0^2/\\lambda$ defines the confocal parameter over which the beam remains tightly focused.',
    faqs: [{ q: 'What is the Rayleigh range (z_R)?', a: 'The Rayleigh range is the distance from the focal waist where the beam cross-sectional radius expands by $\\sqrt{2} \\approx 1.414\\times$ (beam cross-sectional area doubles).' }]
  },

  // 5. Photodiode Responsivity (R) & Quantum Efficiency (QE) Calculator
  {
    slug: 'photodiode-responsivity-quantum-efficiency-calculator',
    name: 'Photodiode Responsivity (R) & Quantum Efficiency (QE) Calculator',
    description: 'Calculate photodetector spectral responsivity (R = (η · q · λ) / (h · c) = η · λ / 1239.8) in Amperes per Watt (A/W) from quantum efficiency percentage (η%) and wavelength.',
    category: 'Science',
    icon: 'text',
    keywords: ['photodiode responsivity calculator', 'quantum efficiency to responsivity formula', 'r eta lambda over 1240 online', 'silicon photodetector amps per watt calculator', 'optoelectronics quantum efficiency calculator'],
    order: 527,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Optical Wavelength λ (nm) & Quantum Efficiency η (%)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pd-lam">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="pd-lam" type="number" step="any" value="850" placeholder="850 nm (Near Infrared)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pd-qe">Quantum Efficiency η (%)</label>
          <input class="tool-textarea" id="pd-qe" type="number" step="0.5" min="1" max="100" value="85.0" placeholder="85.0% QE" />
        </div>
      </div>
      <div id="pd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pd-res-resp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.583 A / W</span>
            <span class="stat-label">Spectral Responsivity (R)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pd-res-curr" style="font-weight:700;">582.7 μA Photocurrent per 1 mW Optical Power</span>
            <span class="stat-label">Generated Photocurrent</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('pd-lam'), qEl = document.getElementById('pd-qe');
  const rResEl = document.getElementById('pd-res-resp'), cResEl = document.getElementById('pd-res-curr');

  function update() {
    const lamNm = parseFloat(lEl.value), qePct = parseFloat(qEl.value);
    if (isNaN(lamNm) || isNaN(qePct) || lamNm <= 0 || qePct <= 0) return;

    const eta = qePct / 100;
    // Responsivity R = (eta * q * lambda) / (h * c) = (eta * lambda_nm) / 1239.841984  [A / W]
    const R = (eta * lamNm) / 1239.841984;
    const microAmpsPerMilliwatt = R * 1000;

    rResEl.textContent = R.toFixed(3) + ' A / W (Responsivity)';
    cResEl.textContent = microAmpsPerMilliwatt.toFixed(1) + ' μA per 1 mW Light (Photon Energy ' + (1239.84 / lamNm).toFixed(2) + ' eV)';
  }

  lEl.addEventListener('input', update);
  qEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter incident photon optical wavelength $\\lambda$ in nanometers (nm).',
      'Enter semiconductor detector Quantum Efficiency percentage ($\\eta\\%$, fraction of photons that generate electron-hole pairs).',
      'Inspect spectral responsivity in Amperes per Watt (A/W) and generated photocurrent per milliwatt of laser input.'
    ],
    benefitTitle: 'The 1239.84 nm·eV Optoelectronic Conversion Constant',
    benefitContent: 'Because photon energy equals $E = hc/\\lambda = 1239.84/\\lambda\\text{ eV}$, longer wavelength photons carry less energy per photon; for fixed quantum efficiency $\\eta$, responsivity increases linearly with wavelength up to the semiconductor bandgap cutoff ($R = \\eta\\lambda / 1239.8$).',
    faqs: [{ q: 'What is the responsivity of a 100% efficient Silicon photodiode at 900 nm?', a: '$R = (1.00 \times 900) / 1239.84 \approx 0.726\text{ A/W}$.' }]
  }
];

toolsSuitePPP.forEach(createTool);
console.log('Suite PPP complete: 5 tools created.');
