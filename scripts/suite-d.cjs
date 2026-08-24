const { createTool } = require('./generate-curated-tools.cjs');

// Suite D: 5 Tools in Acoustics, Rotational Dynamics & Ballistics
const toolsSuiteD = [
  // 1. Sound Intensity Level (Watts/m² to Decibels) Calculator
  {
    slug: 'sound-intensity-level-watts-calculator',
    name: 'Sound Intensity Level (W/m² to dB) Calculator',
    description: 'Calculate acoustic sound intensity level (SIL = 10 · log₁₀(I / I₀)) in decibels (dB) from acoustic power intensity in Watts per square meter.',
    category: 'Science',
    icon: 'text',
    keywords: ['sound intensity level calculator', 'watts per square meter to decibels', 'acoustic intensity sil calculator', 'threshold of hearing intensity', 'decibel sound power formula'],
    order: 199,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Acoustic Sound Intensity (W/m²)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sil-watts">Sound Intensity I (Watts / m²)</label>
        <input class="tool-textarea" id="sil-watts" type="text" value="0.001" placeholder="e.g. 0.001 (10⁻³ W/m² - Busy Street)" />
      </div>
      <div id="sil-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sil-res-db" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">90.0 dB</span>
            <span class="stat-label">Sound Intensity Level (SIL)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sil-res-desc">Loud (Heavy Traffic / Lawn Mower)</span>
            <span class="stat-label">Human Perception Category</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('sil-watts');
  const dbEl = document.getElementById('sil-res-db'), descEl = document.getElementById('sil-res-desc');

  const I0 = 1e-12; // Reference threshold of human hearing (10^-12 W/m^2)

  function update() {
    const I = parseFloat(wEl.value);
    if (isNaN(I) || I <= 0) return;

    // SIL = 10 * log10(I / I0)
    const sil = 10 * Math.log10(I / I0);
    dbEl.textContent = sil.toFixed(1) + ' dB';

    if (sil < 20) descEl.textContent = 'Faint (Whisper / Rustling Leaves)';
    else if (sil < 50) descEl.textContent = 'Quiet (Quiet Library / Bedroom)';
    else if (sil < 70) descEl.textContent = 'Moderate (Normal Conversation)';
    else if (sil < 85) descEl.textContent = 'Loud (Busy Street / Vacuum)';
    else if (sil < 110) descEl.textContent = 'Very Loud (Power Tools / Nightclub - Hearing Risk)';
    else if (sil < 130) descEl.textContent = 'Extremely Dangerous (Rock Concert / Jet Engine)';
    else descEl.textContent = 'Threshold of Pain (Permanent Hearing Damage)';
  }

  wEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter physical sound acoustic intensity in Watts per square meter (W/m²). Scientific notation like 1e-3 is supported.',
      'Inspect the decibel sound intensity level (SIL).'
    ],
    benefitTitle: 'The Human Ear\'s Logarithmic Dynamic Range',
    benefitContent: 'The human ear perceives acoustic loudness logarithmically across an astonishing 12 orders of magnitude (1,000,000,000,000 to 1) between the threshold of hearing (10⁻¹² W/m²) and the threshold of pain (1 W/m²).',
    faqs: [{ q: 'What is 1 Watt/m² in decibels?', a: '1.0 W/m² equals exactly 120 dB (Threshold of Pain).' }]
  },

  // 2. Rotational Kinetic Energy Calculator
  {
    slug: 'rotational-kinetic-energy-calculator',
    name: 'Rotational Kinetic Energy & Flywheel Calculator',
    description: 'Calculate rotational kinetic energy (KE_rot = ½ · I · ω²) in Joules and mechanical flywheel stored energy from moment of inertia and RPM.',
    category: 'Science',
    icon: 'text',
    keywords: ['rotational kinetic energy calculator', 'flywheel energy storage calculator', 'kinetic energy of rotating body', 'half i omega squared formula', 'rpm to rotational energy online'],
    order: 200,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Moment of Inertia & Angular Speed',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rot-i">Moment of Inertia I (kg·m²)</label>
          <input class="tool-textarea" id="rot-i" type="number" step="any" value="2.5" placeholder="e.g. 2.5 kg·m²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rot-rpm">Rotational Speed (RPM)</label>
          <input class="tool-textarea" id="rot-rpm" type="number" step="any" value="3000" placeholder="e.g. 3000 RPM" />
        </div>
      </div>
      <div id="rot-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rot-res-kj" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">123.37 kJ</span>
            <span class="stat-label">Stored Kinetic Energy (½·I·ω²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rot-res-omega" style="font-weight:700;">314.16 rad/s</span>
            <span class="stat-label">Angular Velocity (ω)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rot-res-wh">34.27 Wh</span>
            <span class="stat-label">Energy in Watt-Hours</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('rot-i'), rpmEl = document.getElementById('rot-rpm');
  const kjEl = document.getElementById('rot-res-kj'), oEl = document.getElementById('rot-res-omega'), whEl = document.getElementById('rot-res-wh');

  function update() {
    const I = parseFloat(iEl.value), rpm = parseFloat(rpmEl.value);
    if (isNaN(I) || isNaN(rpm) || I <= 0 || rpm <= 0) return;

    // omega = (2 * pi * RPM) / 60 (rad/s)
    const omega = (2 * Math.PI * rpm) / 60;
    // KE = 0.5 * I * omega^2
    const joules = 0.5 * I * Math.pow(omega, 2);
    const kj = joules / 1000;
    const wh = joules / 3600;

    kjEl.textContent = kj >= 1000 ? (kj / 1000).toFixed(2) + ' MJ' : kj.toFixed(2) + ' kJ';
    oEl.textContent = omega.toFixed(2) + ' rad/s';
    whEl.textContent = wh.toFixed(2) + ' Wh';
  }

  iEl.addEventListener('input', update);
  rpmEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter the moment of inertia (I) in kg·m².',
      'Enter rotational revolutions per minute (RPM).',
      'Inspect stored kinetic energy in kJ, MJ, and Watt-Hours.'
    ],
    benefitTitle: 'Flywheel Energy Storage Systems (FESS)',
    benefitContent: 'Mechanical flywheels store clean grid energy rotationally with round-trip efficiencies exceeding 85-90% and virtually infinite charge-discharge cycle lifespans.',
    faqs: [{ q: 'What is the rotational kinetic energy formula?', a: 'KE_rot = ½ · I · ω², exactly analogous to translational kinetic energy (½ · m · v²).' }]
  },

  // 3. Thermal Volumetric Expansion Liquid Calculator
  {
    slug: 'thermal-volumetric-expansion-calculator',
    name: 'Thermal Volumetric Expansion Calculator',
    description: 'Calculate thermal liquid expansion (ΔV = β · V₀ · ΔT) and overflow volume for heating expansion tanks, boilers, and storage drums.',
    category: 'Science',
    icon: 'text',
    keywords: ['thermal volumetric expansion calculator', 'liquid thermal expansion beta', 'water thermal expansion overflow', 'boiler expansion tank sizing', 'volume expansion coefficient online'],
    order: 201,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Liquid, Initial Volume & Temperature Rise',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tve-liquid">Liquid Preset</label>
          <select class="tool-textarea" id="tve-liquid">
            <option value="0.000214" selected>Water (214 × 10⁻⁶ / °C at 20°C)</option>
            <option value="0.000950">Ethanol / Alcohol (950 × 10⁻⁶ / °C)</option>
            <option value="0.000950">Gasoline / Petrol (950 × 10⁻⁶ / °C)</option>
            <option value="0.000700">Engine Oil (700 × 10⁻⁶ / °C)</option>
            <option value="0.000181">Mercury (181 × 10⁻⁶ / °C)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="tve-v0">Initial Volume V₀ (Liters)</label>
          <input class="tool-textarea" id="tve-v0" type="number" step="any" value="200" placeholder="200 L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tve-dt">Temperature Rise ΔT (°C)</label>
          <input class="tool-textarea" id="tve-dt" type="number" step="any" value="50" placeholder="50 °C" />
        </div>
      </div>
      <div id="tve-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tve-res-delta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">+2.14 Liters</span>
            <span class="stat-label">Volume Expansion (ΔV)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tve-res-tot">202.14 Liters</span>
            <span class="stat-label">Total Expanded Volume</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const liqEl = document.getElementById('tve-liquid'), v0El = document.getElementById('tve-v0'), dtEl = document.getElementById('tve-dt');
  const dEl = document.getElementById('tve-res-delta'), totEl = document.getElementById('tve-res-tot');

  function update() {
    const beta = parseFloat(liqEl.value), v0 = parseFloat(v0El.value), dt = parseFloat(dtEl.value);
    if (isNaN(beta) || isNaN(v0) || isNaN(dt) || v0 <= 0 || dt === 0) return;

    // Delta V = beta * V0 * DeltaT
    const deltaV = beta * v0 * dt;
    const finalV = v0 + deltaV;

    dEl.textContent = (deltaV >= 0 ? '+' : '') + deltaV.toFixed(2) + ' Liters';
    totEl.textContent = finalV.toFixed(2) + ' Liters';
  }

  liqEl.addEventListener('change', update);
  v0El.addEventListener('input', update);
  dtEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select fluid preset (Water, Ethanol, Gasoline, Engine Oil, Mercury).',
      'Enter initial tank volume in Liters.',
      'Enter temperature rise in Celsius.',
      'Inspect the liquid expansion volume and required headspace buffer.'
    ],
    benefitTitle: 'Why Gasoline Tanks Require Headspace',
    benefitContent: 'Gasoline has a high volumetric expansion coefficient (β ≈ 950 × 10⁻⁶ / °C). Fuel pumped from cold underground tanks expands significantly when parked under hot sunshine, creating hazardous overflow without expansion volume.',
    faqs: [{ q: 'What is the relationship between linear (α) and volumetric (β) expansion for solids?', a: 'For isotropic solids, the volumetric expansion coefficient is approximately three times the linear coefficient: β ≈ 3α.' }]
  },

  // 4. Projectile Maximum Peak Height Calculator
  {
    slug: 'projectile-maximum-height-calculator',
    name: 'Projectile Maximum Peak Height Calculator',
    description: 'Calculate the maximum vertical apex apex height (H_max = (v₀ · sin θ)² / (2g)) and time to apex for ballistic projectiles and sports balls.',
    category: 'Science',
    icon: 'text',
    keywords: ['projectile maximum height calculator', 'apex height trajectory calculator', 'peak height projectile formula', 'ballistic peak altitude calculator', 'physics max height online'],
    order: 202,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Launch Speed & Launch Angle',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pmh-v0">Initial Velocity v₀ (m/s)</label>
          <input class="tool-textarea" id="pmh-v0" type="number" step="any" value="30" placeholder="30 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pmh-angle">Launch Angle θ (Degrees)</label>
          <input class="tool-textarea" id="pmh-angle" type="number" min="1" max="90" step="any" value="60" placeholder="60°" />
        </div>
      </div>
      <div id="pmh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pmh-res-h" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">34.39 meters</span>
            <span class="stat-label">Maximum Peak Height (H_max)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pmh-res-time" style="font-weight:700;">2.65 seconds</span>
            <span class="stat-label">Time to Reach Apex (t_apex)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v0El = document.getElementById('pmh-v0'), angEl = document.getElementById('pmh-angle');
  const hEl = document.getElementById('pmh-res-h'), tEl = document.getElementById('pmh-res-time');

  const g = 9.80665;

  function update() {
    const v0 = parseFloat(v0El.value), deg = parseFloat(angEl.value);
    if (isNaN(v0) || isNaN(deg) || v0 <= 0 || deg <= 0 || deg > 90) return;

    const rad = (deg * Math.PI) / 180;
    const vy = v0 * Math.sin(rad);

    // H_max = vy^2 / (2 * g)
    const hMax = Math.pow(vy, 2) / (2 * g);
    // t_apex = vy / g
    const tApex = vy / g;

    hEl.textContent = hMax.toFixed(2) + ' meters (' + (hMax * 3.28084).toFixed(1) + ' feet)';
    tEl.textContent = tApex.toFixed(2) + ' seconds';
  }

  v0El.addEventListener('input', update);
  angEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter initial muzzle or throw velocity (v₀) in meters per second (m/s).',
      'Enter launch elevation angle θ in degrees.',
      'Inspect the maximum peak trajectory altitude and time to reach apex.'
    ],
    benefitTitle: 'Conservation of Mechanical Energy at Apex',
    benefitContent: 'At the apex peak of ballistic flight, vertical velocity momentarily drops to exactly zero (vy = 0), converting all initial vertical kinetic energy into gravitational potential energy: m·g·h = ½·m·vy².',
    faqs: [{ q: 'What launch angle achieves maximum height?', a: 'A 90° straight vertical launch directs 100% of initial kinetic energy into vertical altitude.' }]
  },

  // 5. Parabolic Ballistic Trajectory Range Calculator
  {
    slug: 'parabolic-trajectory-range-calculator',
    name: 'Parabolic Ballistic Trajectory Range Calculator',
    description: 'Calculate horizontal ballistic range (R = (v₀² · sin(2θ)) / g), total hangtime, and trajectory apex for projectiles on level ground.',
    category: 'Science',
    icon: 'text',
    keywords: ['projectile range calculator', 'ballistic range trajectory formula', 'maximum distance launch angle 45', 'projectile hang time calculator', 'physics projectile motion range'],
    order: 203,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Launch Speed & Trajectory Angle',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ptr-v0">Initial Velocity v₀ (m/s)</label>
          <input class="tool-textarea" id="ptr-v0" type="number" step="any" value="50" placeholder="50 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ptr-angle">Launch Angle θ (Degrees)</label>
          <input class="tool-textarea" id="ptr-angle" type="number" min="1" max="89" step="any" value="45" placeholder="45° (Max Range)" />
        </div>
      </div>
      <div id="ptr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ptr-res-range" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">254.93 meters</span>
            <span class="stat-label">Total Horizontal Range (R)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ptr-res-hangtime" style="font-weight:700;">7.21 seconds</span>
            <span class="stat-label">Total Flight Hangtime</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v0El = document.getElementById('ptr-v0'), angEl = document.getElementById('ptr-angle');
  const rEl = document.getElementById('ptr-res-range'), htEl = document.getElementById('ptr-res-hangtime');

  const g = 9.80665;

  function update() {
    const v0 = parseFloat(v0El.value), deg = parseFloat(angEl.value);
    if (isNaN(v0) || isNaN(deg) || v0 <= 0 || deg <= 0 || deg >= 90) return;

    const rad = (deg * Math.PI) / 180;
    // R = (v0^2 * sin(2*theta)) / g
    const range = (Math.pow(v0, 2) * Math.sin(2 * rad)) / g;
    // Total flight time T = 2 * v0 * sin(theta) / g
    const hangtime = (2 * v0 * Math.sin(rad)) / g;

    rEl.textContent = range.toFixed(2) + ' meters (' + (range * 1.09361).toFixed(1) + ' yards)';
    htEl.textContent = hangtime.toFixed(2) + ' seconds';
  }

  v0El.addEventListener('input', update);
  angEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter launch velocity (v₀) in meters per second.',
      'Enter launch angle θ in degrees.',
      'Inspect the total horizontal distance traveled on level ground.'
    ],
    benefitTitle: 'The Optimal 45-Degree Launch Rule',
    benefitContent: 'Because sin(2θ) reaches its mathematical peak value of 1.0 when 2θ = 90°, a launch angle of exactly θ = 45° achieves the maximum horizontal range on flat ground.',
    faqs: [{ q: 'Why do complementary angles (e.g. 30° and 60°) achieve the same range?', a: 'Because sin(2 × 30°) = sin(60°) = sin(120°) = sin(2 × 60°), complementary angles produce identical range in vacuum conditions.' }]
  }
];

toolsSuiteD.forEach(createTool);
console.log('Suite D complete: 5 tools created.');
