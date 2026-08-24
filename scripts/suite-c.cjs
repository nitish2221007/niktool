const { createTool } = require('./generate-curated-tools.cjs');

// Suite C: 10 Tools in Acoustics, Wave Optics, Polarization & Thermal Physics
const toolsSuiteC = [
  // 1. Telescope Magnification & Focal Ratio Calculator
  {
    slug: 'telescope-magnification-focal-ratio-calculator',
    name: 'Telescope Magnification & Focal Ratio Calculator',
    description: 'Calculate telescope optical magnification (M = F_objective / f_eyepiece), focal ratio (f-number), and exit pupil diameter for astronomy observing.',
    category: 'Science',
    icon: 'text',
    keywords: ['telescope magnification calculator', 'telescope focal ratio calculator', 'exit pupil calculator astronomy', 'eyepiece magnification formula', 'astronomy telescope optics online'],
    order: 194,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Aperture, Focal Lengths & Eyepiece',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tel-ap">Aperture Diameter (mm)</label>
          <input class="tool-textarea" id="tel-ap" type="number" step="any" value="200" placeholder="200 mm (8-inch)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tel-f-obj">Telescope Focal Length (mm)</label>
          <input class="tool-textarea" id="tel-f-obj" type="number" step="any" value="1000" placeholder="1000 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tel-f-eye">Eyepiece Focal Length (mm)</label>
          <input class="tool-textarea" id="tel-f-eye" type="number" step="any" value="10" placeholder="10 mm" />
        </div>
      </div>
      <div id="tel-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tel-res-mag" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">100x</span>
            <span class="stat-label">Optical Magnification Power</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tel-res-fratio" style="font-weight:700;">f / 5.0</span>
            <span class="stat-label">Focal Ratio (Speed)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tel-res-exit">2.00 mm</span>
            <span class="stat-label">Exit Pupil Diameter</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const apEl = document.getElementById('tel-ap'), fObjEl = document.getElementById('tel-f-obj'), fEyeEl = document.getElementById('tel-f-eye');
  const magEl = document.getElementById('tel-res-mag'), frEl = document.getElementById('tel-res-fratio'), exitEl = document.getElementById('tel-res-exit');

  function update() {
    const ap = parseFloat(apEl.value), fObj = parseFloat(fObjEl.value), fEye = parseFloat(fEyeEl.value);
    if (isNaN(ap) || isNaN(fObj) || isNaN(fEye) || ap <= 0 || fObj <= 0 || fEye <= 0) return;

    const mag = fObj / fEye;
    const fRatio = fObj / ap;
    const exitPupil = ap / mag;

    magEl.textContent = Math.round(mag) + 'x';
    frEl.textContent = 'f / ' + fRatio.toFixed(1);
    exitEl.textContent = exitPupil.toFixed(2) + ' mm';
  }

  [apEl, fObjEl, fEyeEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter primary telescope objective aperture in millimeters (e.g. 200 mm for 8-inch reflector).',
      'Enter telescope focal length in mm.',
      'Enter eyepiece focal length in mm (e.g. 25mm, 10mm, 6mm).',
      'Inspect magnification, focal ratio (f-stop speed), and exit pupil beam diameter.'
    ],
    benefitTitle: 'Telescope Exit Pupil and Human Eye Pupil Match',
    benefitContent: 'The exit pupil (Aperture / Magnification) should match the observer\'s dark-adapted eye pupil (~5mm to 7mm for humans) to capture maximum photons without clipping the light beam.',
    faqs: [{ q: 'What is a "fast" telescope in astrophotography?', a: 'Telescopes with low focal ratios (f/4 to f/5) collect photons faster across a wider field of view than "slow" high focal ratio (f/10 to f/15) planetary scopes.' }]
  },

  // 2. Rayleigh Criterion Telescope Angular Resolution Calculator
  {
    slug: 'rayleigh-criterion-angular-resolution-calculator',
    name: 'Rayleigh Criterion Angular Resolution Calculator',
    description: 'Calculate optical diffraction resolution limit (θ = 1.22 · λ / D) in arcseconds and radians for telescopes, cameras, and microscopes.',
    category: 'Science',
    icon: 'text',
    keywords: ['rayleigh criterion calculator', 'angular resolution calculator', 'telescope diffraction limit arcseconds', 'dawes limit resolution calculator', 'optics airy disk resolving power'],
    order: 195,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Aperture Diameter & Light Wavelength',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ray-dia">Optic Aperture Diameter D (mm)</label>
          <input class="tool-textarea" id="ray-dia" type="number" step="any" value="200" placeholder="200 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ray-lambda">Light Wavelength λ (nm)</label>
          <input class="tool-textarea" id="ray-lambda" type="number" step="any" value="550" placeholder="550 nm (Visible Light)" />
        </div>
      </div>
      <div id="ray-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ray-res-arcsec" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.69 Arcsec</span>
            <span class="stat-label">Rayleigh Resolution Limit (θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ray-res-dawes" style="font-weight:700;">0.58 Arcsec</span>
            <span class="stat-label">Dawes Limit (Double Stars)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const diaEl = document.getElementById('ray-dia'), lamEl = document.getElementById('ray-lambda');
  const arcsecEl = document.getElementById('ray-res-arcsec'), dawesEl = document.getElementById('ray-res-dawes');

  function update() {
    const diaMm = parseFloat(diaEl.value), lamNm = parseFloat(lamEl.value);
    if (isNaN(diaMm) || isNaN(lamNm) || diaMm <= 0 || lamNm <= 0) return;

    const dM = diaMm / 1000;
    const lamM = lamNm * 1e-9;

    // theta (radians) = 1.22 * lambda / D
    const thetaRad = 1.22 * (lamM / dM);
    // Convert radians to arcseconds: 1 rad = 206264.806 arcsec
    const thetaArcsec = thetaRad * 206264.806;
    // Dawes limit: R = 116 / D(mm) in arcseconds
    const dawes = 116 / diaMm;

    arcsecEl.textContent = thetaArcsec.toFixed(2) + ' Arcseconds';
    dawesEl.textContent = dawes.toFixed(2) + ' Arcseconds';
  }

  diaEl.addEventListener('input', update);
  lamEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter lens or primary mirror aperture diameter in millimeters.',
      'Enter observed light wavelength in nanometers.',
      'Inspect the diffraction-limited resolution in arcseconds.'
    ],
    benefitTitle: 'Lord Rayleigh\'s Diffraction Limit',
    benefitContent: 'Diffraction at a circular aperture creates an Airy disk pattern. Two point sources of light are resolvable when the central peak of the first Airy disk coincides with the first dark ring minimum of the second: θ = 1.22 · λ / D.',
    faqs: [{ q: 'What is the theoretical resolution of the Hubble Space Telescope?', a: 'With a 2.4-meter primary mirror at 550nm visible light, Hubble achieves a diffraction resolution limit of ~0.058 arcseconds.' }]
  },

  // 3. Brewster's Polarization Angle Calculator
  {
    slug: 'brewster-polarization-angle-calculator',
    name: 'Brewster\'s Angle & Polarization Calculator',
    description: 'Calculate Brewster\'s polarization angle (tan θ_B = n₂ / n₁) where reflected light becomes 100% linearly polarized with zero p-polarized glare.',
    category: 'Science',
    icon: 'text',
    keywords: ['brewsters angle calculator', 'polarization angle calculator', 'polarizing sunglasses angle', 'optics brewster angle formula', 'tan theta b n2 n1 online'],
    order: 196,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Refractive Indices of Interfacing Media',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="brew-n1">Medium 1 Refractive Index (n₁)</label>
          <input class="tool-textarea" id="brew-n1" type="number" step="any" value="1.0003" placeholder="1.0003 (Air)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="brew-n2">Medium 2 Refractive Index (n₂)</label>
          <input class="tool-textarea" id="brew-n2" type="number" step="any" value="1.333" placeholder="1.333 (Water) or 1.52 (Glass)" />
        </div>
      </div>
      <div id="brew-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="brew-res-deg" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">53.11°</span>
            <span class="stat-label">Brewster\'s Polarization Angle (θ_B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="brew-res-comp">36.89°</span>
            <span class="stat-label">Complementary Grazing Angle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('brew-n1'), n2El = document.getElementById('brew-n2');
  const degEl = document.getElementById('brew-res-deg'), compEl = document.getElementById('brew-res-comp');

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0) return;

    // tan(theta_B) = n2 / n1 => theta_B = atan(n2 / n1)
    const thetaRad = Math.atan(n2 / n1);
    const thetaDeg = (thetaRad * 180) / Math.PI;
    const compDeg = 90 - thetaDeg;

    degEl.textContent = thetaDeg.toFixed(2) + '°';
    compEl.textContent = compDeg.toFixed(2) + '°';
  }

  n1El.addEventListener('input', update);
  n2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter refractive index of the incident medium (Air = 1.0003).',
      'Enter refractive index of the reflecting dielectric surface (Water = 1.333, Crown Glass = 1.52).',
      'Inspect Brewster\'s polarization angle (θ_B).'
    ],
    benefitTitle: 'Why Polarized Sunglasses Eliminate Water Glare',
    benefitContent: 'Sir David Brewster showed in 1815 that when light reflects off water or glass at θ_B = arctan(n₂/n₁) (~53° on water), reflected light is 100% horizontally polarized. Vertically oriented polarizing sunglass filters eliminate 100% of this blinding glare.',
    faqs: [{ q: 'What is Brewster\'s angle for glass in air?', a: 'For standard window glass (n = 1.52) in air (n = 1.0), Brewster\'s angle is arctan(1.52) = 56.66°.' }]
  },

  // 4. Malus's Law Polarizer Transmitted Intensity Calculator
  {
    slug: 'malus-law-polarizer-intensity-calculator',
    name: 'Malus\'s Law Polarizer Light Intensity Calculator',
    description: 'Calculate transmitted polarized light intensity (I = I₀ · cos² θ) and percentage attenuation through two linear polarizing filters.',
    category: 'Science',
    icon: 'text',
    keywords: ['malus law calculator', 'polarizer intensity calculator', 'cos squared theta light transmission', 'crossed polarizers extinction', 'optics polarization intensity formula'],
    order: 197,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Intensity & Filter Alignment Angle',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mal-i0">Incident Intensity I₀ (W/m² or %)</label>
          <input class="tool-textarea" id="mal-i0" type="number" step="any" value="100" placeholder="100" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mal-angle">Angle θ Between Polarizers (Degrees)</label>
          <input class="tool-textarea" id="mal-angle" type="number" min="0" max="90" step="any" value="45" placeholder="e.g. 45°" />
        </div>
      </div>
      <div id="mal-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mal-res-i" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">50.00%</span>
            <span class="stat-label">Transmitted Intensity (I = I₀ · cos² θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mal-res-ext" style="color:#c53030; font-weight:700;">50.00%</span>
            <span class="stat-label">Blocked / Absorbed Intensity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const i0El = document.getElementById('mal-i0'), angEl = document.getElementById('mal-angle');
  const iResEl = document.getElementById('mal-res-i'), extEl = document.getElementById('mal-res-ext');

  function update() {
    const i0 = parseFloat(i0El.value), deg = parseFloat(angEl.value);
    if (isNaN(i0) || isNaN(deg) || i0 < 0 || deg < 0 || deg > 180) return;

    const rad = (deg * Math.PI) / 180;
    // I = I0 * cos^2(theta)
    const I = i0 * Math.pow(Math.cos(rad), 2);
    const blocked = i0 - I;

    iResEl.textContent = I.toFixed(2) + ' units (' + ((I / i0) * 100).toFixed(1) + '%)';
    extEl.textContent = blocked.toFixed(2) + ' units (' + ((blocked / i0) * 100).toFixed(1) + '%)';
  }

  i0El.addEventListener('input', update);
  angEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter initial polarized light beam intensity (I₀).',
      'Enter transmission angle θ between the polarizing axis and analyzer (0° to 90°).',
      'Inspect transmitted light intensity and absorption percentage.'
    ],
    benefitTitle: 'Crossed Polarizers and LCD Displays',
    benefitContent: 'When two polarizers are oriented perpendicular to each other (θ = 90°), cos(90°) = 0, causing complete optical extinction (0% transmission) — the basis of LCD monitor pixel switching.',
    faqs: [{ q: 'What is transmitted intensity at 45 degrees?', a: 'Because cos(45°) = 1/√2, cos²(45°) = 0.5, transmitting exactly 50% of the light.' }]
  },

  // 5. Thermal Linear Expansion Metal Calculator
  {
    slug: 'thermal-linear-expansion-calculator',
    name: 'Thermal Linear Expansion Calculator',
    description: 'Calculate elongation and length expansion (ΔL = α · L₀ · ΔT) in steel bridges, railroad tracks, and structural beams across temperature extremes.',
    category: 'Science',
    icon: 'text',
    keywords: ['thermal linear expansion calculator', 'metal expansion calculator delta l', 'railroad bridge expansion gap formula', 'coefficient of linear expansion alpha', 'thermal elongation online'],
    order: 198,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Material, Initial Length & Temperature Rise',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tle-mat">Material Preset</label>
          <select class="tool-textarea" id="tle-mat">
            <option value="0.000012" selected>Structural Steel (12 × 10⁻⁶ / °C)</option>
            <option value="0.000023">Aluminum (23 × 10⁻⁶ / °C)</option>
            <option value="0.000017">Copper (17 × 10⁻⁶ / °C)</option>
            <option value="0.000009">Glass (9 × 10⁻⁶ / °C)</option>
            <option value="0.000012">Concrete (12 × 10⁻⁶ / °C)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="tle-l0">Initial Length L₀ (meters)</label>
          <input class="tool-textarea" id="tle-l0" type="number" step="any" value="100" placeholder="100 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tle-dt">Temperature Change ΔT (°C)</label>
          <input class="tool-textarea" id="tle-dt" type="number" step="any" value="40" placeholder="40 °C" />
        </div>
      </div>
      <div id="tle-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tle-res-delta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">+48.0 mm</span>
            <span class="stat-label">Length Expansion (ΔL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tle-res-final">100.048 m</span>
            <span class="stat-label">Total Expanded Length (L₀ + ΔL)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const matEl = document.getElementById('tle-mat'), l0El = document.getElementById('tle-l0'), dtEl = document.getElementById('tle-dt');
  const dEl = document.getElementById('tle-res-delta'), fEl = document.getElementById('tle-res-final');

  function update() {
    const alpha = parseFloat(matEl.value);
    const l0 = parseFloat(l0El.value);
    const dt = parseFloat(dtEl.value);
    if (isNaN(alpha) || isNaN(l0) || isNaN(dt) || l0 <= 0 || dt === 0) return;

    // Delta L = alpha * L0 * DeltaT
    const deltaLM = alpha * l0 * dt;
    const deltaLMm = deltaLM * 1000;
    const finalLM = l0 + deltaLM;

    dEl.textContent = (deltaLMm >= 0 ? '+' : '') + deltaLMm.toFixed(1) + ' mm (' + (deltaLMm / 10).toFixed(2) + ' cm)';
    fEl.textContent = finalLM.toFixed(4) + ' meters';
  }

  matEl.addEventListener('change', update);
  l0El.addEventListener('input', update);
  dtEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select material preset (Structural Steel, Aluminum, Copper, Concrete).',
      'Enter initial beam length in meters.',
      'Enter temperature swing in Celsius (e.g. summer heat minus winter cold).',
      'Inspect structural thermal expansion in millimeters.'
    ],
    benefitTitle: 'Why Civil Engineers Use Bridge Expansion Joints',
    benefitContent: 'A 1,000-meter steel bridge subjected to a 40 °C seasonal temperature change expands by nearly half a meter (48 cm). Finger expansion joints prevent destructive compressive buckling.',
    faqs: [{ q: 'Why is steel reinforced concrete so durable?', a: 'Steel and concrete share nearly identical thermal expansion coefficients (α ≈ 12 × 10⁻⁶ / °C), preventing thermal shear delamination during temperature swings.' }]
  }
];

toolsSuiteC.forEach(createTool);
console.log('Suite C complete: 5 tools created.');
