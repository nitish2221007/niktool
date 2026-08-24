const { createTool } = require('./generate-curated-tools.cjs');

// Suite NN: 5 Tools in Wave Optics, Diffraction, Double-Slit & Fiber Optics to reach 510 tools
const toolsSuiteNN = [
  // 1. Single Slit Diffraction Minima & Central Maximum Width Calculator
  {
    slug: 'single-slit-diffraction-pattern-calculator',
    name: 'Single Slit Diffraction Pattern & Central Maximum Calculator',
    description: 'Calculate dark fringe minima angles (sin θ = m · λ / a), linear fringe width on screen (w = 2 · λ · L / a), and intensity distribution for single-slit Fraunhofer diffraction.',
    category: 'Science',
    icon: 'text',
    keywords: ['single slit diffraction calculator', 'fraunhofer single slit formula', 'central maximum width single slit', 'diffraction dark fringe minima calculator', 'slit width wavelength screen distance online'],
    order: 381,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Slit Width (a in μm), Wavelength (nm) & Screen Distance (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ssd-a">Slit Width a (μm)</label>
          <input class="tool-textarea" id="ssd-a" type="number" step="any" value="50" placeholder="50 μm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ssd-lambda">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="ssd-lambda" type="number" step="any" value="632.8" placeholder="632.8 nm (He-Ne Laser)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ssd-l">Screen Distance L (m)</label>
          <input class="tool-textarea" id="ssd-l" type="number" step="any" value="2.0" placeholder="2.0 m" />
        </div>
      </div>
      <div id="ssd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ssd-res-width" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">50.62 mm (5.06 cm)</span>
            <span class="stat-label">Central Bright Maximum Width (w)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ssd-res-theta" style="font-weight:700;">0.725° (12.66 mrad)</span>
            <span class="stat-label">First Minimum Angle (θ₁)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('ssd-a'), lamEl = document.getElementById('ssd-lambda'), lEl = document.getElementById('ssd-l');
  const wResEl = document.getElementById('ssd-res-width'), thResEl = document.getElementById('ssd-res-theta');

  function update() {
    const aUm = parseFloat(aEl.value), lamNm = parseFloat(lamEl.value), lM = parseFloat(lEl.value);
    if (isNaN(aUm) || isNaN(lamNm) || isNaN(lM) || aUm <= 0 || lamNm <= 0 || lM <= 0) return;

    const aM = aUm * 1e-6;
    const lamM = lamNm * 1e-9;

    // First minimum: sin(theta) = lambda / a
    const sinTheta = lamM / aM;
    if (sinTheta > 1.0) {
      wResEl.textContent = 'Slit too narrow (Diffuses everywhere)';
      thResEl.textContent = 'θ₁ > 90°';
      return;
    }

    const rad = Math.asin(sinTheta);
    const deg = (rad * 180) / Math.PI;

    // Central peak width w = 2 * L * tan(theta)
    const widthM = 2 * lM * Math.tan(rad);
    const widthMm = widthM * 1000;
    const widthCm = widthM * 100;

    wResEl.textContent = widthMm >= 1000 ? widthM.toFixed(2) + ' meters' : widthMm.toFixed(2) + ' mm (' + widthCm.toFixed(2) + ' cm)';
    thResEl.textContent = deg.toFixed(3) + '° (' + (rad * 1000).toFixed(2) + ' mrad)';
  }

  [aEl, lamEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter narrow aperture slit width in micrometers (μm).',
      'Enter laser light wavelength in nanometers (nm) (e.g. 632.8 nm Red, 532 nm Green).',
      'Enter distance from slit to viewing projection screen in meters.',
      'Inspect physical width of the central bright diffraction peak and angular spread.'
    ],
    benefitTitle: 'Joseph von Fraunhofer\'s Diffraction Optics',
    benefitContent: 'Diffraction sets the fundamental physical limit for optical focus resolution: narrowing a slit spreads the transmitted light cone wider on the screen (w ∝ 1/a).',
    faqs: [{ q: 'Why is the central maximum twice as wide as secondary fringes?', a: 'Because the central peak spans between m = -1 and m = +1 minima (width 2λL/a), whereas secondary bright bands span only between adjacent minima (width λL/a).' }]
  },

  // 2. Young's Double Slit Interference Fringe Spacing Calculator
  {
    slug: 'young-double-slit-interference-calculator',
    name: 'Young\'s Double Slit Interference Fringe Calculator',
    description: 'Calculate interference bright fringe spacing (Δy = λ · L / d), path difference (Δx = d · sin θ), and constructive interference order positions on screen.',
    category: 'Science',
    icon: 'text',
    keywords: ['youngs double slit calculator', 'double slit fringe spacing calculator', 'interference fringe width formula online', 'd sin theta m lambda calculator', 'thomas young wave interference online'],
    order: 382,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Slit Separation (d in mm), Wavelength & Screen Distance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="yds-d">Slit Separation d (mm)</label>
          <input class="tool-textarea" id="yds-d" type="number" step="any" value="0.25" placeholder="0.25 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yds-lambda">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="yds-lambda" type="number" step="any" value="532" placeholder="532 nm (Green Laser)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yds-l">Screen Distance L (m)</label>
          <input class="tool-textarea" id="yds-l" type="number" step="any" value="1.5" placeholder="1.5 m" />
        </div>
      </div>
      <div id="yds-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="yds-res-dy" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.19 mm</span>
            <span class="stat-label">Fringe Separation (Δy = λL / d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="yds-res-theta" style="font-weight:700;">0.122° (2.13 mrad)</span>
            <span class="stat-label">Fringe Angular Separation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('yds-d'), lamEl = document.getElementById('yds-lambda'), lEl = document.getElementById('yds-l');
  const dyResEl = document.getElementById('yds-res-dy'), thResEl = document.getElementById('yds-res-theta');

  function update() {
    const dMm = parseFloat(dEl.value), lamNm = parseFloat(lamEl.value), lM = parseFloat(lEl.value);
    if (isNaN(dMm) || isNaN(lamNm) || isNaN(lM) || dMm <= 0 || lamNm <= 0 || lM <= 0) return;

    const dM = dMm * 1e-3;
    const lamM = lamNm * 1e-9;

    // Fringe spacing Delta_y = (lambda * L) / d
    const dyM = (lamM * lM) / dM;
    const dyMm = dyM * 1000;

    // Angular spacing theta = lambda / d (radians)
    const thRad = lamM / dM;
    const thDeg = (thRad * 180) / Math.PI;

    dyResEl.textContent = dyMm.toFixed(2) + ' mm';
    thResEl.textContent = thDeg.toFixed(3) + '° (' + (thRad * 1000).toFixed(2) + ' mrad)';
  }

  [dEl, lamEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter distance between the two slit apertures (d) in millimeters.',
      'Enter laser wavelength in nanometers (nm).',
      'Enter distance to projection screen in meters.',
      'Inspect physical millimeter separation between consecutive bright interference fringes (Δy).'
    ],
    benefitTitle: 'Thomas Young\'s 1801 Wave Theory Experiment',
    benefitContent: 'Young\'s double slit experiment proved conclusively that light behaves as a wave: overlapping wavefronts from the two slits interfere constructively when optical path difference is an integer wavelength (d·sin θ = mλ).',
    faqs: [{ q: 'What happens to fringe spacing when moving the screen farther away?', a: 'Fringe spacing increases linearly with distance L (Δy ∝ L), making fringes wider and easier to see.' }]
  },

  // 3. Diffraction Grating Spectrometer Line Spacing Calculator
  {
    slug: 'diffraction-grating-lines-per-mm-calculator',
    name: 'Diffraction Grating Spectrometer & Angular Dispersion Calculator',
    description: 'Calculate spectral diffraction angles (d · sin θ = m · λ), angular dispersion (dθ/dλ), and maximum visible diffraction orders for transmission gratings (lines/mm).',
    category: 'Science',
    icon: 'text',
    keywords: ['diffraction grating calculator', 'spectrometer lines per mm calculator', 'd sin theta m lambda grating formula', 'spectroscopy angular dispersion calculator', 'diffraction grating order angles online'],
    order: 383,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Grating Density (lines/mm), Wavelength & Order (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dg-grooves">Grating Density (lines / mm)</label>
          <input class="tool-textarea" id="dg-grooves" type="number" step="any" value="600" placeholder="600 lines/mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dg-lambda">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="dg-lambda" type="number" step="any" value="589.0" placeholder="589.0 nm (Sodium Doublet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dg-order">Spectral Order (m)</label>
          <select class="tool-textarea" id="dg-order">
            <option value="1" selected>m = 1 (First Order)</option>
            <option value="2">m = 2 (Second Order)</option>
            <option value="3">m = 3 (Third Order)</option>
          </select>
        </div>
      </div>
      <div id="dg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dg-res-theta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">20.70°</span>
            <span class="stat-label">Diffraction Deflection Angle (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dg-res-d">d = 1.667 μm</span>
            <span class="stat-label">Groove Spacing (d = 1 / N)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dg-res-max-m">m_max = 2</span>
            <span class="stat-label">Highest Possible Order</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const grEl = document.getElementById('dg-grooves'), lamEl = document.getElementById('dg-lambda'), mEl = document.getElementById('dg-order');
  const thResEl = document.getElementById('dg-res-theta'), dResEl = document.getElementById('dg-res-d'), maxMResEl = document.getElementById('dg-res-max-m');

  function update() {
    const linesPerMm = parseFloat(grEl.value), lamNm = parseFloat(lamEl.value), m = parseInt(mEl.value, 10);
    if (isNaN(linesPerMm) || isNaN(lamNm) || linesPerMm <= 0 || lamNm <= 0 || m < 1) return;

    // Slit spacing d in meters = (1e-3 m) / linesPerMm
    const dM = 1e-3 / linesPerMm;
    const dUm = dM * 1e6;
    const lamM = lamNm * 1e-9;

    // Maximum possible order m_max = floor(d / lambda)
    const maxM = Math.floor(dM / lamM);
    maxMResEl.textContent = 'm_max = ' + maxM;

    // d * sin(theta) = m * lambda => sin(theta) = (m * lambda) / d
    const sinTheta = (m * lamM) / dM;
    if (sinTheta > 1.0) {
      thResEl.textContent = 'Order m=' + m + ' Exceeds 90° (Not Visible)';
      thResEl.style.color = '#c53030';
    } else {
      const rad = Math.asin(sinTheta);
      const deg = (rad * 180) / Math.PI;
      thResEl.textContent = deg.toFixed(2) + '°';
      thResEl.style.color = '#22543d';
    }

    dResEl.textContent = 'd = ' + dUm.toFixed(3) + ' μm (' + Math.round(linesPerMm).toLocaleString() + ' lines/mm)';
  }

  [grEl, lamEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter grating groove density in lines per millimeter (e.g. 300, 600, or 1200 lines/mm).',
      'Enter target spectral line wavelength in nanometers (nm).',
      'Select spectral order m (m=1, 2, or 3).',
      'Inspect diffraction deflection angle θ and groove spacing.'
    ],
    benefitTitle: 'Spectrophotometer Chemical Wavelength Separation',
    benefitContent: 'Diffraction gratings spread multi-wavelength white light into sharply resolved spectral lines according to d·sin θ = mλ, powering laboratory UV-Vis spectrophotometers and astronomical exoplanet atmosphere sensors.',
    faqs: [{ q: 'What is the groove spacing of a 600 lines/mm grating?', a: 'd = 1 mm / 600 = 0.001667 mm = 1.667 micrometers (μm).' }]
  },

  // 4. Fiber Optic Cable Numerical Aperture (NA) & Acceptance Angle Calculator
  {
    slug: 'fiber-optic-numerical-aperture-acceptance-angle-calculator',
    name: 'Fiber Optic Numerical Aperture (NA) & Acceptance Angle Calculator',
    description: 'Calculate optical fiber Numerical Aperture (NA = √(n_core² - n_clad²)), critical total internal reflection angle (θ_c), and maximum light coupling acceptance cone half-angle (θ_max).',
    category: 'Science',
    icon: 'text',
    keywords: ['numerical aperture fiber calculator', 'fiber optic acceptance angle calculator', 'core cladding refractive index calculator', 'total internal reflection fiber optic formula', 'fiber na online calculator'],
    order: 384,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Core Refractive Index (n₁) & Cladding Index (n₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fo-n1">Core Index (n₁)</label>
          <input class="tool-textarea" id="fo-n1" type="number" step="any" value="1.480" placeholder="1.480 (Silica Core)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fo-n2">Cladding Index (n₂)</label>
          <input class="tool-textarea" id="fo-n2" type="number" step="any" value="1.460" placeholder="1.460 (Cladding)" />
        </div>
      </div>
      <div id="fo-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fo-res-na" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">NA = 0.2425</span>
            <span class="stat-label">Numerical Aperture (NA)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fo-res-theta" style="font-weight:700;">14.04°</span>
            <span class="stat-label">Acceptance Cone Half-Angle (θ_max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fo-res-crit">80.57°</span>
            <span class="stat-label">TIR Critical Angle (θ_crit)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('fo-n1'), n2El = document.getElementById('fo-n2');
  const naResEl = document.getElementById('fo-res-na'), thResEl = document.getElementById('fo-res-theta'), crResEl = document.getElementById('fo-res-crit');

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(n2) || n1 <= 1.0 || n2 <= 1.0 || n2 >= n1) {
      naResEl.textContent = 'Requires n_core > n_clad > 1.0';
      return;
    }

    // NA = sqrt(n1^2 - n2^2)
    const NA = Math.sqrt(Math.pow(n1, 2) - Math.pow(n2, 2));
    // Acceptance angle in air (n0 = 1.0): theta_max = asin(NA)
    const thMaxRad = Math.asin(Math.min(1.0, NA));
    const thMaxDeg = (thMaxRad * 180) / Math.PI;

    // Critical angle at core-cladding boundary: theta_crit = asin(n2 / n1)
    const thCritRad = Math.asin(n2 / n1);
    const thCritDeg = (thCritRad * 180) / Math.PI;

    naResEl.textContent = 'NA = ' + NA.toFixed(4);
    thResEl.textContent = thMaxDeg.toFixed(2) + '° (Full Cone = ' + (thMaxDeg * 2).toFixed(1) + '°)';
    crResEl.textContent = thCritDeg.toFixed(2) + '°';
  }

  n1El.addEventListener('input', update);
  n2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter fiber optical glass core refractive index n₁ (e.g. 1.480).',
      'Enter outer cladding glass refractive index n₂ (e.g. 1.460).',
      'Inspect fiber Numerical Aperture (NA), external laser coupling acceptance cone angle (θ_max), and internal Total Internal Reflection (TIR) critical angle.'
    ],
    benefitTitle: 'Total Internal Reflection Light Guiding',
    benefitContent: 'Light rays entering within the acceptance cone strike the core-cladding interface at angles exceeding the critical angle (θ > θ_crit), undergoing 100% lossless Total Internal Reflection along miles of fiber optic internet cables.',
    faqs: [{ q: 'What is typical Numerical Aperture for single-mode telecom fiber?', a: 'Standard single-mode telecommunication fiber (Corning SMF-28) has an NA of approximately 0.14 (acceptance half-angle ~8.0°).' }]
  },

  // 5. Polarizer Malus's Law Double & Triple Filter Transmission Calculator
  {
    slug: 'polarization-malus-law-double-filter-calculator',
    name: 'Polarization Malus\'s Law & Optical Filter Transmission Calculator',
    description: 'Calculate transmitted polarized light intensity (I = I₀ · cos²(θ)) and analyze the three-polarizer quantum transmission paradox.',
    category: 'Science',
    icon: 'text',
    keywords: ['malus law calculator', 'polarization intensity calculator online', 'cos squared theta polarizer calculator', 'three polarizer quantum paradox formula', 'linear polarizer light transmission online'],
    order: 385,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Filter Angles θ₁ and θ₂ (Degrees)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mal-th1">First Polarizer Angle θ₁</label>
          <input class="tool-textarea" id="mal-th1" type="number" min="0" max="360" value="0" placeholder="0° (Vertical)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mal-th2">Second Analyzer Angle θ₂</label>
          <input class="tool-textarea" id="mal-th2" type="number" min="0" max="360" value="60" placeholder="60°" />
        </div>
      </div>
      <div id="mal-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mal-res-pct" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">25.0% Transmission</span>
            <span class="stat-label">Transmitted Intensity (I / I_pol)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mal-res-unpol" style="font-weight:700;">12.5% of Unpolarized Input</span>
            <span class="stat-label">Total Transmission from Raw Light</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const th1El = document.getElementById('mal-th1'), th2El = document.getElementById('mal-th2');
  const pctResEl = document.getElementById('mal-res-pct'), unpResEl = document.getElementById('mal-res-unpol');

  function update() {
    const th1 = parseFloat(th1El.value), th2 = parseFloat(th2El.value);
    if (isNaN(th1) || isNaN(th2)) return;

    const angleDiffDeg = Math.abs(th2 - th1);
    const rad = (angleDiffDeg * Math.PI) / 180;

    // Malus's Law: I = I0 * cos^2(Delta_theta)
    const transFraction = Math.pow(Math.cos(rad), 2);
    const transPct = transFraction * 100;
    // For unpolarized initial light: first polarizer transmits 50%
    const unpolPct = transPct * 0.50;

    pctResEl.textContent = transPct.toFixed(1) + '% Transmission';
    if (Math.abs(angleDiffDeg - 90) < 0.1 || Math.abs(angleDiffDeg - 270) < 0.1) {
      pctResEl.textContent = '0.0% (Complete Extinction - Crossed Polarizers)';
      pctResEl.style.color = '#c53030';
    } else {
      pctResEl.style.color = '#22543d';
    }

    unpResEl.textContent = unpolPct.toFixed(1) + '% of Raw Unpolarized Light';
  }

  th1El.addEventListener('input', update);
  th2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter orientation angle of the first polarizer filter in degrees.',
      'Enter orientation angle of the second analyzer filter in degrees.',
      'Inspect transmitted light intensity percentage according to Malus\'s Law.'
    ],
    benefitTitle: 'Étienne-Louis Malus\'s 1809 Polarization Discovery',
    benefitContent: 'Crossed polarizers at 90° block 100% of light (extinction); remarkably, inserting a third diagonal polarizer at 45° between the crossed filters allows 12.5% of light to pass through by rotating the photon quantum polarization state.',
    faqs: [{ q: 'What is light transmission through polarizers at 60° relative angle?', a: 'cos²(60°) = (0.5)² = exactly 25.0% of polarized light is transmitted.' }]
  }
];

toolsSuiteNN.forEach(createTool);
console.log('Suite NN complete: 5 tools created.');
