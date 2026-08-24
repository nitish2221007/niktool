const { createTool } = require('./generate-curated-tools.cjs');

// Pack 36: 25 Fundamental & Intermediate Physics, Mechanics, Optics, Sound, Waves & Electromagnetism Calculators (Tools 1151 to 1175)
const pack36Tools = [
  // 1. Doppler Effect Sound Frequency Shift Moving Source & Observer Calculator
  {
    slug: 'doppler-effect-sound-frequency-shift-moving-source-observer-calculator',
    name: 'Doppler Effect Sound Frequency Shift (f\' = f₀·(v ± v_o) / (v ∓ v_s)) Calculator',
    description: 'Calculate perceived acoustic Doppler frequency shift (f\' = f₀ · (v ± v_o) / (v ∓ v_s)) in Hz for approaching or receding sound sources (sirens, trains, aircraft) and moving observers in physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['doppler effect calculator', 'sound frequency shift formula f prime equals f0 times v plus vo over v minus vs online', 'approaching receding sound source doppler shift calculator', 'acoustic doppler velocity frequency calculator hz', 'physics sound waves doppler effect online'],
    order: 1032,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Source Frequency f₀ (Hz), Sound Speed v (m/s, 343 m/s in air), Source Speed v_s (m/s) & Observer Speed v_o (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dp-f0">Source f₀ (Hz)</label>
          <input class="tool-textarea" id="dp-f0" type="number" step="10" value="440.0" placeholder="440.0 Hz (Concert A)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dp-vs">Source v_s (m/s)</label>
          <input class="tool-textarea" id="dp-vs" type="number" step="5" value="30.0" placeholder="30.0 m/s (~108 km/h)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dp-motion">Source Motion</label>
          <select class="tool-textarea" id="dp-motion">
            <option value="approach" selected>Approaching Observer (Higher Pitch)</option>
            <option value="recede">Receding Away (Lower Pitch)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="dp-vsound">Speed of Sound v</label>
          <input class="tool-textarea" id="dp-vsound" type="number" step="1" value="343.0" placeholder="343.0 m/s (20°C Air)" />
        </div>
      </div>
      <div id="dp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dp-res-fprime" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f\' = 482.17 Hz (+42.17 Hz Shift)</span>
            <span class="stat-label">Observed Perceived Sound Frequency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dp-res-recede" style="color:var(--green-dark); font-weight:700;">When Receding: f\' = 404.61 Hz (-35.39 Hz) | Total Pitch Drop across passage = 77.56 Hz</span>
            <span class="stat-label">Receding Frequency & Total Doppler Pitch Drop</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const f0El = document.getElementById('dp-f0'), vsEl = document.getElementById('dp-vs');
  const motEl = document.getElementById('dp-motion'), vEl = document.getElementById('dp-vsound');
  const fpResEl = document.getElementById('dp-res-fprime'), rcResEl = document.getElementById('dp-res-recede');

  function update() {
    const f0 = parseFloat(f0El.value), vs = parseFloat(vsEl.value);
    const isApproach = motEl.value === 'approach', v = parseFloat(vEl.value);

    if (isNaN(f0) || isNaN(vs) || isNaN(v) || f0 <= 0 || vs < 0 || v <= vs) return;

    // Approaching source: f_app = f0 * ( v / (v - vs) )
    const f_app = f0 * (v / (v - vs));
    // Receding source: f_rec = f0 * ( v / (v + vs) )
    const f_rec = f0 * (v / (v + vs));

    const current_f = isApproach ? f_app : f_rec;
    const diff = current_f - f0;
    const drop = f_app - f_rec;

    fpResEl.textContent = 'f\' = ' + current_f.toFixed(2) + ' Hz (' + (diff >= 0 ? '+' : '') + diff.toFixed(2) + ' Hz Shift)';
    rcResEl.textContent = (isApproach ? 'When Receding: f\' = ' + f_rec.toFixed(2) + ' Hz' : 'When Approaching: f\' = ' + f_app.toFixed(2) + ' Hz') + ' | Total Pass Drop = ' + drop.toFixed(2) + ' Hz (Mach ' + (vs/v).toFixed(2) + ')';
  }

  [f0El, vsEl, vEl].forEach(el => el.addEventListener('input', update));
  motEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter original stationary sound source frequency $f_0$ in Hertz (e.g. 440 Hz for Musical A4).',
      'Enter source travel speed $v_s$ in m/s (e.g. $30\text{ m/s} \approx 108\text{ km/h}$).',
      'Select source motion direction relative to stationary observer (Approaching vs Receding).',
      'Inspect observed shifted frequency $f\'$ in Hz and total pitch drop during flyby.'
    ],
    benefitTitle: 'Christian Doppler 1842 Wave Frequency Shift Principle',
    benefitContent: 'Wavefronts compress together in front of a moving source ($\lambda = (v - v_s)/f$) and stretch behind it, producing the characteristic high-pitch to low-pitch drop heard as emergency sirens pass by.',
    faqs: [{ q: 'What happens when source speed reaches the speed of sound (vs = v)?', a: 'Wavefronts pile up into a high-pressure shock wave barrier, generating a sonic boom (Mach 1).' }]
  },

  // 2. Sound Intensity Level Decibels & Inverse Square Law Calculator
  {
    slug: 'sound-intensity-level-decibels-inverse-square-law-calculator',
    name: 'Sound Intensity Level (dB = 10·log₁₀(I / I₀)) & Distance Inverse Square Law Calculator',
    description: 'Calculate acoustic sound pressure/intensity level in decibels (L_p = 10 · log₁₀(I / 10⁻¹²) dB) and calculate geometric sound level attenuation over distance (L₂ = L₁ - 20·log₁₀(r₂ / r₁)) using the inverse-square law.',
    category: 'Science',
    icon: 'text',
    keywords: ['sound decibel calculator', 'sound intensity level formula 10 log i over i0 online', 'inverse square law sound distance attenuation calculator db', 'decibels to watts per meter squared sound calculator', 'acoustics noise level distance calculator online'],
    order: 1033,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reference Sound Level L₁ (dB) at Distance r₁ (m) & New Observer Distance r₂ (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="db-l1">Base Level L₁ (dB)</label>
          <input class="tool-textarea" id="db-l1" type="number" step="5" value="90.0" placeholder="90.0 dB (Lawnmower)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="db-r1">Base Distance r₁ (m)</label>
          <input class="tool-textarea" id="db-r1" type="number" step="0.5" value="1.0" placeholder="1.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="db-r2">Target Distance r₂ (m)</label>
          <input class="tool-textarea" id="db-r2" type="number" step="5" value="10.0" placeholder="10.0 m (10× farther)" />
        </div>
      </div>
      <div id="db-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="db-res-l2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L₂ = 70.0 dB (Busy Traffic Level)</span>
            <span class="stat-label">Sound Level at Distance r₂ (L₂ = L₁ - 20·log₁₀(r₂/r₁))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="db-res-int" style="color:var(--green-dark); font-weight:700;">Intensity I = 1.00 × 10⁻⁵ W/m² (-20.0 dB drop: Doubling distance drops level by exactly 6 dB)</span>
            <span class="stat-label">Acoustic Intensity (W/m²) & 6 dB Distance Rule</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l1El = document.getElementById('db-l1'), r1El = document.getElementById('db-r1'), r2El = document.getElementById('db-r2');
  const l2ResEl = document.getElementById('db-res-l2'), intResEl = document.getElementById('db-res-int');

  const I_0 = 1.0e-12; // Reference threshold of human hearing in W / m^2

  function update() {
    const L1 = parseFloat(l1El.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(L1) || isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0) return;

    // Inverse square law for sound pressure level in free spherical field:
    // L2 = L1 - 20 * log10( r2 / r1 )
    const drop_dB = 20.0 * Math.log10(r2 / r1);
    const L2 = L1 - drop_dB;

    // Physical intensity at r2: I = I_0 * 10^(L2 / 10)  [W / m^2]
    const I_watts_m2 = I_0 * Math.pow(10.0, L2 / 10.0);

    let desc = '';
    if (L2 >= 85.0) desc = 'HAZARDOUS (≥ 85 dB: OSHA Hearing Protection Required)';
    else if (L2 >= 70.0) desc = 'MODERATE NOISE (70-85 dB: Vacuum cleaner / Traffic)';
    else if (L2 >= 50.0) desc = 'CONVERSATIONAL (50-70 dB: Normal speech / Office)';
    else desc = 'QUIET (≤ 50 dB: Quiet library / Bedroom)';

    l2ResEl.textContent = 'L₂ = ' + L2.toFixed(1) + ' dB (' + desc.split(' (')[0] + ')';
    intResEl.textContent = 'Intensity I = ' + I_watts_m2.toExponential(2) + ' W/m² (' + (drop_dB >= 0 ? '-' : '+') + Math.abs(drop_dB).toFixed(1) + ' dB change @ ' + r2 + ' m | ' + desc + ')';
  }

  [l1El, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter known reference sound level $L_1$ in decibels (dB).',
      'Enter measurement reference distance $r_1$ in meters.',
      'Enter new target observer distance $r_2$ in meters.',
      'Inspect attenuated sound level $L_2$ in dB and physical acoustic intensity in $\text{W/m}^2$.'
    ],
    benefitTitle: 'Acoustic Inverse-Square Geometrical Spreading Law',
    benefitContent: 'Sound power spreads outward over an expanding spherical surface area ($A = 4\pi r^2$), which reduces intensity by a factor of 4 ($6.02\text{ dB}$ drop) every time the distance to the sound source is doubled.',
    faqs: [{ q: 'Why is the decibel scale logarithmic?', a: 'Human hearing spans an immense intensity range of $10^{12}$ ($1\text{ to }1,000,000,000,000\text{ W/m}^2$); the logarithmic decibel scale compresses this into a manageable 0 to 120 dB scale.' }]
  },

  // 3. Standing Waves Harmonics (Open/Closed Pipe & Stretched String) Calculator
  {
    slug: 'standing-waves-harmonics-open-closed-pipe-string-calculator',
    name: 'Standing Wave Harmonics (String & Open/Closed Pipe Resonance) Calculator',
    description: 'Calculate standing wave resonant harmonic frequencies (Open Pipe / Stretched String f_n = n·v / (2L), Closed Pipe f_n = n·v / (4L) for odd n) and wavelength nodes for acoustics and musical physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['standing waves calculator', 'harmonics open closed pipe formula f equals n v over 2l online', 'stretched string fundamental frequency resonant harmonics calculator', 'acoustics musical pitch harmonics calculator', 'physics standing waves nodes antinodes online'],
    order: 1034,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'System Type (String / Open-Open Pipe vs Closed-Open Pipe), Length L (m) & Wave Speed v (m/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sw-sys">System</label>
          <select class="tool-textarea" id="sw-sys">
            <option value="open" selected>Open Pipe / Fixed String (f_n = n·v / 2L: All Harmonics)</option>
            <option value="closed">Closed-End Pipe (f_n = n·v / 4L: Odd Harmonics Only)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sw-len">Length L (m)</label>
          <input class="tool-textarea" id="sw-len" type="number" step="0.1" value="0.65" placeholder="0.65 m (Guitar String)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sw-v">Wave Speed v (m/s)</label>
          <input class="tool-textarea" id="sw-v" type="number" step="10" value="429.0" placeholder="429.0 m/s" />
        </div>
      </div>
      <div id="sw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sw-res-f1" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f₁ = 330.00 Hz (Fundamental E4)</span>
            <span class="stat-label">1st Harmonic Fundamental Resonant Frequency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sw-res-harm" style="color:var(--green-dark); font-weight:700;">2nd f₂ = 660.0 Hz | 3rd f₃ = 990.0 Hz | 4th f₄ = 1,320.0 Hz (Wavelength λ₁ = 1.30 m)</span>
            <span class="stat-label">Higher Overtones / Harmonic Frequency Spectrum</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sysEl = document.getElementById('sw-sys'), lEl = document.getElementById('sw-len'), vEl = document.getElementById('sw-v');
  const f1ResEl = document.getElementById('sw-res-f1'), hResEl = document.getElementById('sw-res-harm');

  function update() {
    const isOpen = sysEl.value === 'open';
    const L = parseFloat(lEl.value), v = parseFloat(vEl.value);

    if (isNaN(L) || isNaN(v) || L <= 0 || v <= 0) return;

    let f1 = 0, f2 = 0, f3 = 0, f4 = 0, lam1 = 0, harmText = '';

    if (isOpen) {
      // f_n = n * v / (2 * L) for n = 1, 2, 3, 4
      f1 = v / (2.0 * L);
      f2 = 2.0 * f1;
      f3 = 3.0 * f1;
      f4 = 4.0 * f1;
      lam1 = 2.0 * L;
      harmText = '2nd: ' + f2.toFixed(1) + ' Hz | 3rd: ' + f3.toFixed(1) + ' Hz | 4th: ' + f4.toFixed(1) + ' Hz (λ₁ = ' + lam1.toFixed(2) + ' m)';
    } else {
      // Closed pipe: f_n = n * v / (4 * L) for odd n = 1, 3, 5, 7
      f1 = v / (4.0 * L);
      f2 = 3.0 * f1;
      f3 = 5.0 * f1;
      f4 = 7.0 * f1;
      lam1 = 4.0 * L;
      harmText = '3rd: ' + f2.toFixed(1) + ' Hz | 5th: ' + f3.toFixed(1) + ' Hz | 7th: ' + f4.toFixed(1) + ' Hz (Only Odd Harmonics, λ₁ = ' + lam1.toFixed(2) + ' m)';
    }

    f1ResEl.textContent = 'f₁ = ' + f1.toFixed(2) + ' Hz (Fundamental)';
    hResEl.textContent = harmText + ' [Length L = ' + L + ' m, Wave Speed v = ' + v + ' m/s]';
  }

  [sysEl, lEl, vEl].forEach(el => el.addEventListener('input', update));
  sysEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select physical resonator system (Open-Ended Pipe / Stretched String vs Closed-Ended Pipe / Organ Tube).',
      'Enter vibrating tube/string length L in meters.',
      'Enter wave propagation speed v in m/s (e.g. 343 m/s for sound in air, $\sqrt{T/\mu}$ for string tension).',
      'Inspect fundamental frequency $f_1$ and higher integer harmonic overtones.'
    ],
    benefitTitle: 'Acoustic Standing Wave Boundary Conditions',
    benefitContent: 'Open ends and string fixed ends enforce boundary displacement nodes and antinodes, ensuring open pipes produce full harmonic integer spectra ($1f, 2f, 3f$) while closed pipes produce exclusively odd harmonics ($1f, 3f, 5f$).',
    faqs: [{ q: 'Why do closed-end organ pipes sound deeper than open pipes of the same length?', a: 'A closed pipe fundamental wavelength is twice as long ($\lambda = 4L$) as an open pipe ($\lambda = 2L$), producing an octave lower fundamental pitch ($f_{\text{closed}} = \frac{1}{2} f_{\text{open}}$).' }]
  },

  // 4. Snell's Law Refraction & Critical Angle Total Internal Reflection Calculator
  {
    slug: 'snells-law-light-refraction-critical-angle-tir-calculator',
    name: 'Snell\'s Law of Refraction (n₁·sin θ₁ = n₂·sin θ₂) & Critical Angle Calculator',
    description: 'Calculate optical light refraction angle (θ₂ = arcsin[(n₁/n₂)·sin θ₁]), critical angle for Total Internal Reflection (θ_c = arcsin(n₂ / n₁)), and Brewster\'s polarization angle for optics and fiber telecommunications.',
    category: 'Science',
    icon: 'text',
    keywords: ['snells law calculator', 'refraction formula n1 sin theta1 equals n2 sin theta2 online', 'critical angle total internal reflection fiber optics calculator', 'brewsters angle polarization calculator optics', 'physics light refraction index of refraction online'],
    order: 1035,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Medium 1 Index n₁, Incident Angle θ₁ (°), Medium 2 Index n₂ (e.g. Glass 1.50, Water 1.33, Air 1.00)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sn-n1">Medium 1 (n₁)</label>
          <input class="tool-textarea" id="sn-n1" type="number" step="0.05" value="1.50" placeholder="1.50 (Crown Glass)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sn-th1">Incident Angle θ₁ (°)</label>
          <input class="tool-textarea" id="sn-th1" type="number" step="1" min="0" max="90" value="30.0" placeholder="30.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sn-n2">Medium 2 (n₂)</label>
          <input class="tool-textarea" id="sn-n2" type="number" step="0.05" value="1.00" placeholder="1.00 (Air)" />
        </div>
      </div>
      <div id="sn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sn-res-th2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Refraction Angle θ₂ = 48.59°</span>
            <span class="stat-label">Refracted Beam Angle in Medium 2</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sn-res-crit" style="color:var(--green-dark); font-weight:700;">Critical Angle θ_c = 41.81° | Brewster Angle θ_B = 33.69° (TIR occurs if θ₁ > 41.81°)</span>
            <span class="stat-label">Total Internal Reflection (TIR) Critical Threshold</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const n1El = document.getElementById('sn-n1'), th1El = document.getElementById('sn-th1'), n2El = document.getElementById('sn-n2');
  const th2ResEl = document.getElementById('sn-res-th2'), crResEl = document.getElementById('sn-res-crit');

  function update() {
    const n1 = parseFloat(n1El.value), theta1_deg = parseFloat(th1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(theta1_deg) || isNaN(n2) || n1 <= 0 || n2 <= 0 || theta1_deg < 0 || theta1_deg > 90) return;

    const theta1_rad = (theta1_deg * Math.PI) / 180.0;
    const sin_theta2 = (n1 / n2) * Math.sin(theta1_rad);

    let th2Text = '', color = '#22543d';

    if (sin_theta2 > 1.0) {
      th2Text = 'TOTAL INTERNAL REFLECTION (TIR: 100% Light Reflected Back into Medium 1)';
      color = '#2563eb';
    } else {
      const theta2_rad = Math.asin(sin_theta2);
      const theta2_deg = (theta2_rad * 180.0) / Math.PI;
      th2Text = 'Refraction Angle θ₂ = ' + theta2_deg.toFixed(2) + '°';
      color = '#22543d';
    }

    // Critical angle if n1 > n2:
    let critText = '';
    if (n1 > n2) {
      const crit_rad = Math.asin(n2 / n1);
      const crit_deg = (crit_rad * 180.0) / Math.PI;
      const brewster_deg = (Math.atan(n2 / n1) * 180.0) / Math.PI;
      critText = 'Critical Angle θ_c = ' + crit_deg.toFixed(2) + '° | Brewster Angle θ_B = ' + brewster_deg.toFixed(2) + '° (TIR if θ₁ > ' + crit_deg.toFixed(1) + '°)';
    } else {
      critText = 'No Critical Angle (Light entering denser medium: n₁ < n₂ bends toward normal)';
    }

    th2ResEl.textContent = th2Text;
    th2ResEl.style.color = color;
    crResEl.textContent = critText;
  }

  [n1El, th1El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter refractive index $n_1$ of initial medium (e.g. 1.00 for air, 1.33 for water, 1.50 for glass, 2.42 for diamond).',
      'Enter beam incident angle $\theta_1$ in degrees measured from the surface normal.',
      'Enter refractive index $n_2$ of target transmission medium.',
      'Inspect refracted beam angle $\theta_2$, critical angle $\theta_c$, and Total Internal Reflection status.'
    ],
    benefitTitle: 'Willebrord Snellius 1621 Optical Refraction Law',
    benefitContent: 'Snell\'s law ($n_1 \sin\theta_1 = n_2 \sin\theta_2$) governs the bending of light at optical boundaries; when light attempts to exit a denser medium at angles exceeding the critical angle ($\theta_1 > \theta_c$), $100\%$ of optical power is reflected with zero loss, enabling worldwide high-speed fiber-optic internet communication.',
    faqs: [{ q: 'What is Total Internal Reflection (TIR)?', a: 'TIR occurs when light traveling through an optically denser medium strikes a boundary with a less dense medium at an angle greater than $\theta_c = \arcsin(n_2/n_1)$, completely trapping the light inside.' }]
  },

  // 5. Thin Lens & Curved Mirror Equation (1/f = 1/d_o + 1/d_i) Calculator
  {
    slug: 'thin-lens-mirror-magnification-equation-calculator',
    name: 'Thin Lens & Spherical Mirror (1/f = 1/d_o + 1/d_i) & Magnification Calculator',
    description: 'Calculate optical focal length, image distance (1/d_i = 1/f - 1/d_o), lateral magnification (m = -d_i / d_o), and image properties (Real vs Virtual, Inverted vs Upright) for convex and concave lenses/mirrors.',
    category: 'Science',
    icon: 'text',
    keywords: ['thin lens equation calculator', 'lens formula 1 over f equals 1 over do plus 1 over di online', 'concave convex mirror magnification calculator', 'real virtual image distance thin lens calculator', 'geometrical optics focal length magnification online'],
    order: 1036,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Focal Length f (cm, Positive for Convex Lens/Concave Mirror), Object Distance d_o (cm) & Object Height h_o (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ln-f">Focal Length f (cm)</label>
          <input class="tool-textarea" id="ln-f" type="number" step="1" value="15.0" placeholder="+15.0 cm (Converging)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ln-do">Object Distance d_o (cm)</label>
          <input class="tool-textarea" id="ln-do" type="number" step="5" value="45.0" placeholder="45.0 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ln-ho">Height h_o (cm)</label>
          <input class="tool-textarea" id="ln-ho" type="number" step="1" value="5.0" placeholder="5.0 cm" />
        </div>
      </div>
      <div id="ln-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ln-res-di" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">d_i = +22.50 cm (REAL IMAGE)</span>
            <span class="stat-label">Image Distance from Lens / Mirror</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ln-res-mag" style="color:var(--green-dark); font-weight:700;">Magnification m = -0.50× (INVERTED, Diminished | Height h_i = -2.50 cm)</span>
            <span class="stat-label">Lateral Optical Magnification & Image Orientation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('ln-f'), doEl = document.getElementById('ln-do'), hoEl = document.getElementById('ln-ho');
  const diResEl = document.getElementById('ln-res-di'), mgResEl = document.getElementById('ln-res-mag');

  function update() {
    const f = parseFloat(fEl.value), d_o = parseFloat(doEl.value), h_o = parseFloat(hoEl.value);
    if (isNaN(f) || isNaN(d_o) || isNaN(h_o) || f === 0 || d_o <= 0) return;

    // 1/f = 1/d_o + 1/d_i => 1/d_i = 1/f - 1/d_o = (d_o - f) / (f * d_o)
    // d_i = (f * d_o) / (d_o - f)
    if (d_o === f) {
      diResEl.textContent = 'Image at INFINITY (Parallel Rays: No Image Formed)';
      mgResEl.textContent = 'Object located exactly at the focal point (d_o = f)';
      return;
    }

    const d_i = (f * d_o) / (d_o - f);
    const m = -d_i / d_o;
    const h_i = m * h_o;

    const isReal = d_i > 0;
    const isInverted = m < 0;

    diResEl.textContent = 'd_i = ' + (d_i >= 0 ? '+' : '') + d_i.toFixed(2) + ' cm (' + (isReal ? 'REAL IMAGE' : 'VIRTUAL IMAGE') + ')';
    mgResEl.textContent = 'Magnification m = ' + m.toFixed(2) + '× (' + (isInverted ? 'INVERTED' : 'UPRIGHT') + ', ' + (Math.abs(m) > 1 ? 'Magnified' : 'Diminished') + ' | Image Height h_i = ' + h_i.toFixed(2) + ' cm)';
  }

  [fEl, doEl, hoEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter focal length f in cm (positive for converging convex lens/concave mirror, negative for diverging concave lens).',
      'Enter object distance $d_o$ in cm.',
      'Enter object height $h_o$ in cm.',
      'Inspect calculated image distance $d_i$, lateral magnification m, and image classification (Real/Virtual, Inverted/Upright).'
    ],
    benefitTitle: 'Gaussian Thin Lens Optical Formula',
    benefitContent: 'The thin-lens formula ($\frac{1}{f} = \frac{1}{d_o} + \frac{1}{d_i}$) provides the fundamental geometric optics ray-tracing calculation used in designing camera lenses, microscopes, telescopes, and corrective eyeglasses.',
    faqs: [{ q: 'What is the physical difference between a Real and Virtual image?', a: 'A Real image ($d_i > 0$) is formed by actual converging light rays and can be projected onto a screen; a Virtual image ($d_i < 0$) is formed by diverging rays that appear to originate from behind the lens.' }]
  },

  // 6. Young's Double-Slit Wave Interference Fringe Width Calculator
  {
    slug: 'young-double-slit-interference-fringe-width-calculator',
    name: 'Young\'s Double-Slit Interference (y = m·λ·L / d) & Fringe Width (β = λ·L / d) Calculator',
    description: 'Calculate double-slit wave interference bright fringe position (y_m = m · λ · L / d) in mm, dark fringe minima, and uniform fringe spacing width (β = λ · L / d) for wave optics physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['youngs double slit calculator', 'interference fringe width formula beta equals lambda L over d online', 'double slit bright dark fringes position calculator', 'optical wavelength slit separation interference calculator', 'wave optics double slit experiment online'],
    order: 1037,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Light Wavelength λ (nm, e.g. 632.8 nm He-Ne Laser), Slit Separation d (mm) & Screen Distance L (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="yd-lam">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="yd-lam" type="number" step="10" value="632.8" placeholder="632.8 nm (Red Laser)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yd-d">Slit Spacing d (mm)</label>
          <input class="tool-textarea" id="yd-d" type="number" step="0.05" value="0.25" placeholder="0.25 mm (250 μm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="yd-l">Screen L (m)</label>
          <input class="tool-textarea" id="yd-l" type="number" step="0.2" value="1.5" placeholder="1.5 m" />
        </div>
      </div>
      <div id="yd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="yd-res-beta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Fringe Width β = 3.80 mm</span>
            <span class="stat-label">Interference Fringe Spacing (β = λ·L / d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="yd-res-pos" style="color:var(--green-dark); font-weight:700;">1st Bright Max y₁ = 3.80 mm | 2nd y₂ = 7.60 mm | 1st Dark Min = 1.90 mm</span>
            <span class="stat-label">Constructive & Destructive Interference Positions</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('yd-lam'), dEl = document.getElementById('yd-d'), lEl = document.getElementById('yd-l');
  const btResEl = document.getElementById('yd-res-beta'), posResEl = document.getElementById('yd-res-pos');

  function update() {
    const lambda_nm = parseFloat(lamEl.value), d_mm = parseFloat(dEl.value), L_m = parseFloat(lEl.value);
    if (isNaN(lambda_nm) || isNaN(d_mm) || isNaN(L_m) || lambda_nm <= 0 || d_mm <= 0 || L_m <= 0) return;

    const lambda_m = lambda_nm * 1e-9;
    const d_m = d_mm * 1e-3;

    // Fringe width beta = ( lambda * L ) / d  [meters]
    const beta_m = (lambda_m * L_m) / d_m;
    const beta_mm = beta_m * 1000.0;

    const y1 = beta_mm;
    const y2 = 2.0 * beta_mm;
    const y_dark1 = 0.5 * beta_mm;

    btResEl.textContent = 'Fringe Width β = ' + beta_mm.toFixed(2) + ' mm';
    posResEl.textContent = '1st Max y₁ = ' + y1.toFixed(2) + ' mm | 2nd Max y₂ = ' + y2.toFixed(2) + ' mm | 1st Dark Min = ' + y_dark1.toFixed(2) + ' mm (λ = ' + lambda_nm + ' nm @ d = ' + d_mm + ' mm)';
  }

  [lamEl, dEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter monochromatic light wavelength $\lambda$ in nanometers (nm).',
      'Enter distance between the two slits d in millimeters (mm).',
      'Enter distance from slits to projection screen L in meters.',
      'Inspect fringe spacing width ($\beta = \frac{\lambda L}{d}$) and positions of constructive bright maxima and destructive dark minima.'
    ],
    benefitTitle: 'Thomas Young 1801 Wave Nature of Light Demonstration',
    benefitContent: 'Young\'s double-slit experiment proved the wave theory of light by demonstrating that overlapping coherent light beams produce alternating constructive and destructive interference fringes ($d\sin\theta = m\lambda$).',
    faqs: [{ q: 'What happens to fringe width if the screen is moved further away?', a: 'Fringe width increases linearly with screen distance L ($\beta \propto L$), spreading the pattern further apart.' }]
  },

  // 7. Single-Slit Fraunhofer Diffraction Central Maximum Width Calculator
  {
    slug: 'single-slit-diffraction-central-maximum-width-calculator',
    name: 'Single-Slit Fraunhofer Diffraction (a·sin θ = m·λ) & Central Maximum Width Calculator',
    description: 'Calculate single-slit diffraction minima angles (sin θ = m·λ / a) and linear width of the central diffraction maximum (W = 2·λ·L / a) in mm for wave optics physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['single slit diffraction calculator', 'central maximum width formula w equals 2 lambda L over a online', 'fraunhofer diffraction single slit minima calculator', 'slit width airy disk wave optics calculator', 'optics single slit diffraction solver online'],
    order: 1038,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wavelength λ (nm), Slit Width a (μm or mm) & Screen Distance L (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ss-lam">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="ss-lam" type="number" step="10" value="532.0" placeholder="532.0 nm (Green Laser)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-a">Slit Width a (μm)</label>
          <input class="tool-textarea" id="ss-a" type="number" step="10" value="100.0" placeholder="100.0 μm (0.1 mm)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-l">Screen L (m)</label>
          <input class="tool-textarea" id="ss-l" type="number" step="0.2" value="2.0" placeholder="2.0 m" />
        </div>
      </div>
      <div id="ss-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ss-res-width" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Central Width W = 21.28 mm</span>
            <span class="stat-label">Central Diffraction Peak Width (W = 2·λ·L / a)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ss-res-ang" style="color:var(--green-dark); font-weight:700;">1st Minima Angle θ₁ = 0.305° (5.32 mrad | Contains ~85% of total optical beam energy)</span>
            <span class="stat-label">Angular Half-Width to First Diffraction Dark Minimum</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lamEl = document.getElementById('ss-lam'), aEl = document.getElementById('ss-a'), lEl = document.getElementById('ss-l');
  const wResEl = document.getElementById('ss-res-width'), agResEl = document.getElementById('ss-res-ang');

  function update() {
    const lambda_nm = parseFloat(lamEl.value), a_um = parseFloat(aEl.value), L_m = parseFloat(lEl.value);
    if (isNaN(lambda_nm) || isNaN(a_um) || isNaN(L_m) || lambda_nm <= 0 || a_um <= 0 || L_m <= 0) return;

    const lambda_m = lambda_nm * 1e-9;
    const a_m = a_um * 1e-6;

    // First minimum angle: sin(theta) = lambda / a
    const sin_theta = lambda_m / a_m;
    const theta_rad = Math.asin(Math.min(1.0, sin_theta));
    const theta_deg = (theta_rad * 180.0) / Math.PI;

    // Linear central width on screen: W = 2 * L * tan(theta) approx 2 * lambda * L / a
    const W_m = 2.0 * L_m * Math.tan(theta_rad);
    const W_mm = W_m * 1000.0;

    wResEl.textContent = 'Central Width W = ' + W_mm.toFixed(2) + ' mm';
    agResEl.textContent = '1st Minima θ₁ = ' + theta_deg.toFixed(3) + '° (' + (theta_rad * 1000).toFixed(2) + ' mrad | Slit a = ' + a_um + ' μm @ L = ' + L_m + ' m)';
  }

  [lamEl, aEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter light wavelength $\lambda$ in nanometers (nm).',
      'Enter single slit aperture opening width a in micrometers ($\mu\text{m}$).',
      'Enter distance to projection screen L in meters.',
      'Inspect total linear width of the central bright diffraction maximum $W = \frac{2\lambda L}{a}$ and angular spread.'
    ],
    benefitTitle: 'Joseph von Fraunhofer 1821 Single-Slit Diffraction Theory',
    benefitContent: 'Because light waves bend around aperture edges, narrowing a slit surprisingly causes the central diffraction peak to spread wider ($W \propto 1/a$), establishing the fundamental wave diffraction limit on optical camera resolution.',
    faqs: [{ q: 'Why is the central maximum twice as wide as secondary maxima?', a: 'The central maximum spans from $-1\lambda/a$ to $+1\lambda/a$ (width $2\lambda/a$), while secondary peaks span only $1\lambda/a$ between adjacent minima.' }]
  },

  // 8. Polarization & Malus's Law Transmitted Light Intensity Calculator
  {
    slug: 'polarization-malus-law-light-intensity-transmission-calculator',
    name: 'Polarization & Malus\'s Law (I = I₀·cos² θ) Transmitted Intensity Calculator',
    description: 'Calculate polarized light intensity transmission through polarizing filters (I = I₀ · cos² θ) and multi-filter polarizers (e.g. 3-filter quantum eraser paradox) for wave optics physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['malus law calculator', 'polarization intensity formula i equals i0 cos squared theta online', 'polarizer angle light transmission calculator', 'crossed polarizers three polarizer paradox calculator', 'wave optics light polarization online'],
    order: 1039,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Polarized Intensity I₀ (W/m² or %), Polarizer Angle θ (°) & Intermediate 45° Filter Option',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ml-i0">Initial Intensity I₀</label>
          <input class="tool-textarea" id="ml-i0" type="number" step="10" value="100.0" placeholder="100.0% (or W/m²)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ml-th">Filter Angle θ (°)</label>
          <input class="tool-textarea" id="ml-th" type="number" step="5" min="0" max="180" value="60.0" placeholder="60.0°" />
        </div>
      </div>
      <div id="ml-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ml-res-trans" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Transmitted I = 25.00% (¼ I₀)</span>
            <span class="stat-label">Transmitted Light Intensity (I = I₀·cos² θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ml-res-ratio" style="color:var(--green-dark); font-weight:700;">cos(60°) = 0.500 | Electric field amplitude E = 50.0% | Power attenuation = -6.02 dB</span>
            <span class="stat-label">E-Field Amplitude Transmission & Decibel Attenuation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const i0El = document.getElementById('ml-i0'), thEl = document.getElementById('ml-th');
  const trResEl = document.getElementById('ml-res-trans'), rtResEl = document.getElementById('ml-res-ratio');

  function update() {
    const I0 = parseFloat(i0El.value), theta_deg = parseFloat(thEl.value);
    if (isNaN(I0) || isNaN(theta_deg) || I0 < 0) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const cos_theta = Math.cos(theta_rad);

    // Malus's Law: I = I0 * cos^2(theta)
    const I_trans = I0 * Math.pow(cos_theta, 2);
    const frac = (I_trans / I0) * 100.0;
    const dB_loss = I_trans > 0 ? 10.0 * Math.log10(I_trans / I0) : -Infinity;

    trResEl.textContent = 'Transmitted I = ' + I_trans.toFixed(2) + ' (' + frac.toFixed(1) + '% I₀)';
    rtResEl.textContent = 'cos(' + theta_deg + '°) = ' + cos_theta.toFixed(3) + ' | E-Field Amplitude = ' + (Math.abs(cos_theta) * 100).toFixed(1) + '% | Loss = ' + (isFinite(dB_loss) ? dB_loss.toFixed(2) + ' dB' : '-∞ dB (Crossed Polarizers)');
  }

  [i0El, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial polarized beam light intensity $I_0$ (e.g. 100%).',
      'Enter relative transmission axis angle $\theta$ of the analyzing polarizing filter in degrees.',
      'Inspect transmitted intensity $I = I_0 \cos^2\theta$, E-field amplitude transmission, and decibel optical loss.'
    ],
    benefitTitle: 'Étienne-Louis Malus 1809 Polarization Cosine Law',
    benefitContent: 'Because light is a transverse electromagnetic wave, only the electric field component parallel to the filter transmission axis passes through ($E = E_0 \cos\theta$), causing intensity ($I \propto E^2$) to scale with the cosine squared.',
    faqs: [{ q: 'What is the Three-Polarizer Paradox in quantum physics?', a: 'Crossed $0^\circ$ and $90^\circ$ polarizers block $100\%$ of light; inserting a third $45^\circ$ polarizer between them allows $12.5\%$ of light to pass through by rotating the quantum state vector.' }]
  },

  // 9. Coulomb's Law Electrostatic Force Between Two Point Charges Calculator
  {
    slug: 'coulombs-law-electrostatic-force-two-point-charges-calculator',
    name: 'Coulomb\'s Law Electrostatic Force (F = k_e·|q₁·q₂| / r²) Calculator',
    description: 'Calculate electrostatic Coulomb force (F = k_e · |q₁ · q₂| / r²) in Newtons between two electric point charges in microcoulombs (μC) and separation distance r in physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['coulombs law calculator', 'electrostatic force formula f equals k q1 q2 over r squared online', 'point charge electric repulsion attraction calculator', 'coulomb constant ke physics force calculator', 'electrostatics coulombs law online'],
    order: 1040,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Charge q₁ (μC), Charge q₂ (μC) & Separation Distance r (cm or m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cl-q1">Charge q₁ (μC)</label>
          <input class="tool-textarea" id="cl-q1" type="number" step="1" value="5.0" placeholder="+5.0 μC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-q2">Charge q₂ (μC)</label>
          <input class="tool-textarea" id="cl-q2" type="number" step="1" value="-3.0" placeholder="-3.0 μC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cl-r">Distance r (cm)</label>
          <input class="tool-textarea" id="cl-r" type="number" step="1" value="10.0" placeholder="10.0 cm (0.1 m)" />
        </div>
      </div>
      <div id="cl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cl-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Force F = 13.48 N (ATTRACTIVE)</span>
            <span class="stat-label">Electrostatic Coulomb Force Magnitude</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cl-res-nature" style="color:var(--green-dark); font-weight:700;">OPPOSITE CHARGES ATTRACT (+ and -): Force pulls charges toward each other</span>
            <span class="stat-label">Electrostatic Force Vector Direction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const q1El = document.getElementById('cl-q1'), q2El = document.getElementById('cl-q2'), rEl = document.getElementById('cl-r');
  const fResEl = document.getElementById('cl-res-f'), ntResEl = document.getElementById('cl-res-nature');

  const k_e = 8.9875517923e9; // N * m^2 / C^2

  function update() {
    const q1_uC = parseFloat(q1El.value), q2_uC = parseFloat(q2El.value), r_cm = parseFloat(rEl.value);
    if (isNaN(q1_uC) || isNaN(q2_uC) || isNaN(r_cm) || r_cm <= 0) return;

    const q1_C = q1_uC * 1e-6;
    const q2_C = q2_uC * 1e-6;
    const r_m = r_cm / 100.0;

    // Coulomb's Law: F = k_e * |q1 * q2| / r^2  [Newtons]
    const F = (k_e * Math.abs(q1_C * q2_C)) / Math.pow(r_m, 2);

    const isAttractive = (q1_uC * q2_uC) < 0;
    const isZero = q1_uC === 0 || q2_uC === 0;

    let nature = '', color = '#22543d';
    if (isZero) { nature = 'ZERO FORCE (Uncharged point)'; color = '#22543d'; }
    else if (isAttractive) { nature = 'ATTRACTIVE FORCE (Opposite charges attract: + and -)'; color = '#22543d'; }
    else { nature = 'REPULSIVE FORCE (Like charges repel: +/+ or -/-)'; color = '#2563eb'; }

    fResEl.textContent = 'Force F = ' + (F >= 1000 ? (F/1000).toFixed(2) + ' kN' : F.toFixed(2) + ' N') + ' (' + (isAttractive ? 'ATTRACTIVE' : 'REPULSIVE') + ')';
    fResEl.style.color = color;
    ntResEl.textContent = nature + ' [Distance r = ' + r_cm + ' cm | k_e = 8.99 × 10⁹ N·m²/C²]';
    ntResEl.style.color = color;
  }

  [q1El, q2El, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter charge $q_1$ in microcoulombs ($\mu\text{C}$, positive or negative).',
      'Enter charge $q_2$ in microcoulombs ($\mu\text{C}$).',
      'Enter separation distance r in centimeters (cm).',
      'Inspect electrostatic force F in Newtons and determine whether the interaction is attractive or repulsive.'
    ],
    benefitTitle: 'Charles-Augustin de Coulomb 1785 Fundamental Law',
    benefitContent: 'Coulomb\'s inverse-square law ($F = k_e \frac{q_1 q_2}{r^2}$) establishes the electrostatic force holding electrons in atomic orbitals around positively charged atomic nuclei.',
    faqs: [{ q: 'How strong is the electrostatic force compared to gravity?', a: 'Between two protons, the electrostatic repulsion is approximately $10^{36}$ times stronger than their mutual gravitational attraction.' }]
  },

  // 10. Electric Field & Electric Potential of a Point Charge Calculator
  {
    slug: 'electric-field-electric-potential-point-charge-calculator',
    name: 'Point Charge Electric Field (E = k_e·q / r²) & Electric Potential (V = k_e·q / r) Calculator',
    description: 'Calculate electrostatic Electric Field strength (E = k_e · q / r²) in N/C (or V/m) and absolute Electric Potential (V = k_e · q / r) in Volts generated by a point charge q at radial distance r.',
    category: 'Science',
    icon: 'text',
    keywords: ['electric field point charge calculator', 'electric potential formula v equals k q over r online', 'electric field strength n per c volts per meter calculator', 'electrostatic potential energy point charge calculator', 'physics electrostatics electric field online'],
    order: 1041,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electric Charge q (nC or μC) & Radial Distance r (cm or m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ef-q">Charge q (nC)</label>
          <input class="tool-textarea" id="ef-q" type="number" step="1" value="10.0" placeholder="+10.0 nC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ef-r">Distance r (cm)</label>
          <input class="tool-textarea" id="ef-r" type="number" step="5" value="20.0" placeholder="20.0 cm (0.2 m)" />
        </div>
      </div>
      <div id="ef-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ef-res-field" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Field E = 2,247 V / m (N/C)</span>
            <span class="stat-label">Electric Field Strength (E = k_e · q / r²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ef-res-pot" style="color:var(--green-dark); font-weight:700;">Potential V = +449.4 Volts | Directed radially OUTWARD away from positive charge</span>
            <span class="stat-label">Electric Potential (V = k_e · q / r) & Field Vector Direction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('ef-q'), rEl = document.getElementById('ef-r');
  const fldResEl = document.getElementById('ef-res-field'), potResEl = document.getElementById('ef-res-pot');

  const k_e = 8.9875517923e9; // N * m^2 / C^2

  function update() {
    const q_nC = parseFloat(qEl.value), r_cm = parseFloat(rEl.value);
    if (isNaN(q_nC) || isNaN(r_cm) || r_cm <= 0) return;

    const q_C = q_nC * 1e-9;
    const r_m = r_cm / 100.0;

    // Electric field E = k_e * |q| / r^2  [V / m = N / C]
    const E = (k_e * Math.abs(q_C)) / Math.pow(r_m, 2);

    // Electric potential V = k_e * q / r  [Volts]
    const V = (k_e * q_C) / r_m;

    const isPositive = q_nC > 0;
    const dir = isPositive ? 'Radially OUTWARD (Repels positive test charge)' : 'Radially INWARD (Attracts positive test charge)';

    fldResEl.textContent = 'Field E = ' + Math.round(E).toLocaleString() + ' V / m (N/C)';
    potResEl.textContent = 'Potential V = ' + (V >= 0 ? '+' : '') + V.toFixed(1) + ' Volts | ' + dir + ' @ r = ' + r_cm + ' cm';
  }

  qEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter source point charge q in nanocoulombs (nC).',
      'Enter radial observation distance r in centimeters (cm).',
      'Inspect electrostatic Electric Field vector magnitude E in V/m (N/C) and scalar Electric Potential V in Volts.'
    ],
    benefitTitle: 'Michael Faraday Field Theory Formulation',
    benefitContent: 'The electric field ($\vec{E} = -\nabla V$) represents the physical force per unit positive test charge ($\vec{F} = q\vec{E}$), mediating electrostatic action-at-a-distance across empty space at the speed of light.',
    faqs: [{ q: 'What is the relationship between Electric Field and Electric Potential?', a: 'The electric field is the negative spatial gradient (slope) of electric potential ($E = -dV/dr$).' }]
  },

  // 11. Parallel-Plate Capacitor Capacitance & Stored Energy Calculator
  {
    slug: 'parallel-plate-capacitor-capacitance-stored-energy-calculator',
    name: 'Parallel-Plate Capacitor Capacitance (C = κ·ε₀·A / d) & Stored Energy (U = ½·C·V²) Calculator',
    description: 'Calculate parallel-plate electrostatic capacitance (C = κ · ε₀ · A / d) in pF/nF, stored electrical potential energy (U = ½ · C · V²) in Joules, and uniform electric field (E = V / d) in kV/m.',
    category: 'Science',
    icon: 'text',
    keywords: ['capacitor capacitance calculator', 'parallel plate capacitor formula c equals kappa epsilon0 a over d online', 'stored electrical energy half c v squared calculator', 'dielectric constant capacitance voltage calculator', 'electronics electrostatic capacitor online'],
    order: 1042,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Plate Area A (cm²), Separation d (mm), Dielectric Constant κ (1.0 Air, 3.7 Paper, 80 Water) & Voltage V (Volts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cp-area">Area A (cm²)</label>
          <input class="tool-textarea" id="cp-area" type="number" step="10" value="100.0" placeholder="100.0 cm²" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-d">Separation d (mm)</label>
          <input class="tool-textarea" id="cp-d" type="number" step="0.1" value="1.0" placeholder="1.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-kappa">Dielectric (κ)</label>
          <input class="tool-textarea" id="cp-kappa" type="number" step="0.5" value="3.5" placeholder="3.5 (Mylar / Film)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cp-volt">Voltage V (Volts)</label>
          <input class="tool-textarea" id="cp-volt" type="number" step="10" value="50.0" placeholder="50.0 V" />
        </div>
      </div>
      <div id="cp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cp-res-cap" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Capacitance C = 309.9 pF</span>
            <span class="stat-label">Capacitance (C = κ·ε₀·A / d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cp-res-en" style="color:var(--green-dark); font-weight:700;">Stored Energy U = 0.387 μJ | Charge Q = 15.5 nC | Field E = 50.0 kV/m</span>
            <span class="stat-label">Electrostatic Energy (U = ½·C·V²), Charge & Plate Electric Field</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('cp-area'), dEl = document.getElementById('cp-d');
  const kEl = document.getElementById('cp-kappa'), vEl = document.getElementById('cp-volt');
  const capResEl = document.getElementById('cp-res-cap'), enResEl = document.getElementById('cp-res-en');

  const eps_0 = 8.8541878128e-12; // F / m

  function update() {
    const Area_cm2 = parseFloat(aEl.value), d_mm = parseFloat(dEl.value);
    const kappa = parseFloat(kEl.value), V = parseFloat(vEl.value);

    if (isNaN(Area_cm2) || isNaN(d_mm) || isNaN(kappa) || isNaN(V) || Area_cm2 <= 0 || d_mm <= 0 || kappa < 1 || V < 0) return;

    const Area_m2 = Area_cm2 * 1e-4;
    const d_m = d_mm / 1000.0;

    // Capacitance: C = kappa * eps_0 * Area / d  [Farads]
    const C_farads = (kappa * eps_0 * Area_m2) / d_m;
    const C_pF = C_farads * 1e12;

    // Stored Energy: U = 0.5 * C * V^2  [Joules]
    const U_joules = 0.5 * C_farads * Math.pow(V, 2);
    const U_uJ = U_joules * 1e6;

    // Stored Charge: Q = C * V  [Coulombs]
    const Q_nC = C_farads * V * 1e9;

    // Electric field: E = V / d  [V / m]
    const E_kV_m = (V / d_m) / 1000.0;

    capResEl.textContent = 'Capacitance C = ' + (C_pF >= 1000 ? (C_pF/1000).toFixed(2) + ' nF' : C_pF.toFixed(1) + ' pF');
    enResEl.textContent = 'Stored Energy U = ' + U_uJ.toFixed(3) + ' μJ | Charge Q = ' + Q_nC.toFixed(2) + ' nC | Field E = ' + E_kV_m.toFixed(1) + ' kV/m (κ = ' + kappa + ')';
  }

  [aEl, dEl, kEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter capacitor plate surface area A in $\text{cm}^2$.',
      'Enter plate gap separation distance d in millimeters (mm).',
      'Enter dielectric relative permittivity constant $\kappa$ (1.0 for vacuum/air, 2.1 for Teflon, 3.5 for Mylar, 80 for water).',
      'Enter applied charging DC voltage V in Volts.',
      'Inspect capacitance (C in pF/nF), stored electrostatic energy ($U = \frac{1}{2} C V^2$), and internal electric field strength.'
    ],
    benefitTitle: 'Electrostatic Energy Storage Physics',
    benefitContent: 'Capacitors store electrical potential energy in the organized polarization of the electric field between conductive plates ($U = \frac{1}{2} C V^2$), enabling instantaneous high-current power release in camera flashes and medical defibrillators.',
    faqs: [{ q: 'Why does inserting a dielectric increase capacitance?', a: 'Dielectric molecules polarize and create an opposing internal electric field, reducing voltage for the same charge and thereby increasing capacitance by factor $\kappa$ ($C = \kappa C_0$).' }]
  },

  // 12. RC Circuit Charging & Discharging Time Constant Calculator
  {
    slug: 'rc-circuit-charging-discharging-time-constant-calculator',
    name: 'RC Circuit Time Constant (τ = R·C) Charging & Discharging Voltage Calculator',
    description: 'Calculate resistor-capacitor (RC) circuit time constant (τ = R · C) in ms/seconds, instantaneous charging voltage (V(t) = V₀·(1 - e^(-t/τ))), and discharging voltage decay curve.',
    category: 'Science',
    icon: 'text',
    keywords: ['rc circuit calculator', 'time constant tau equals r c formula online', 'capacitor charging discharging voltage calculator', 'rc transient response exponential decay calculator', 'electronics rc circuit timing online'],
    order: 1043,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Resistance R (kΩ), Capacitance C (μF), Supply Voltage V₀ (V) & Elapsed Time t (ms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rc-r">Resistor R (kΩ)</label>
          <input class="tool-textarea" id="rc-r" type="number" step="5" value="10.0" placeholder="10.0 kΩ" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-c">Capacitor C (μF)</label>
          <input class="tool-textarea" id="rc-c" type="number" step="10" value="100.0" placeholder="100.0 μF" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-v0">Supply V₀ (V)</label>
          <input class="tool-textarea" id="rc-v0" type="number" step="1" value="12.0" placeholder="12.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-t">Time t (s)</label>
          <input class="tool-textarea" id="rc-t" type="number" step="0.5" value="1.0" placeholder="1.0 Second" />
        </div>
      </div>
      <div id="rc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rc-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Time Constant τ = 1.000 s</span>
            <span class="stat-label">RC Circuit Time Constant (τ = R · C)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-vt" style="color:var(--green-dark); font-weight:700;">Charging V(t) = 7.59 V (63.2% V₀ at t = 1τ) | Discharging V(t) = 4.41 V (36.8% V₀)</span>
            <span class="stat-label">Instantaneous Charging & Discharging Capacitor Voltage</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('rc-r'), cEl = document.getElementById('rc-c');
  const v0El = document.getElementById('rc-v0'), tEl = document.getElementById('rc-t');
  const tauResEl = document.getElementById('rc-res-tau'), vtResEl = document.getElementById('rc-res-vt');

  function update() {
    const R_k = parseFloat(rEl.value), C_uF = parseFloat(cEl.value);
    const V0 = parseFloat(v0El.value), t_s = parseFloat(tEl.value);

    if (isNaN(R_k) || isNaN(C_uF) || isNaN(V0) || isNaN(t_s) || R_k <= 0 || C_uF <= 0 || V0 <= 0 || t_s < 0) return;

    const R = R_k * 1000.0;
    const C = C_uF * 1e-6;

    // Time constant tau = R * C  [seconds]
    const tau = R * C;

    // Charging voltage: V_charge(t) = V0 * ( 1 - exp(-t / tau) )
    const V_charge = V0 * (1.0 - Math.exp(-t_s / tau));
    const pct_charge = (V_charge / V0) * 100.0;

    // Discharging voltage: V_discharge(t) = V0 * exp(-t / tau)
    const V_discharge = V0 * Math.exp(-t_s / tau);

    tauResEl.textContent = 'Time Constant τ = ' + (tau >= 1 ? tau.toFixed(3) + ' s' : (tau * 1000).toFixed(1) + ' ms');
    vtResEl.textContent = 'Charging V(t) = ' + V_charge.toFixed(2) + ' V (' + pct_charge.toFixed(1) + '% V₀) | Discharging V(t) = ' + V_discharge.toFixed(2) + ' V (Fully settled at 5τ = ' + (5 * tau).toFixed(2) + ' s)';
  }

  [rEl, cEl, v0El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter circuit series resistance R in $\text{k}\Omega$.',
      'Enter capacitance C in microfarads ($\mu\text{F}$).',
      'Enter DC supply charging voltage $V_0$ in Volts.',
      'Enter elapsed time t in seconds.',
      'Inspect circuit time constant $\tau = RC$, charging voltage curve, and discharging voltage.'
    ],
    benefitTitle: 'First-Order RC Transient Exponential Response',
    benefitContent: 'In exactly 1 time constant ($t = 1\tau$), a charging capacitor reaches $63.2\%$ of supply voltage ($1 - e^{-1}$); after 5 time constants ($t = 5\tau$), the circuit is considered $99.3\%$ fully charged.',
    faqs: [{ q: 'How long does it take for an RC circuit to fully charge?', a: 'In engineering practice, an RC circuit is considered fully charged after $5\tau$ ($5 \times R \times C$), reaching $99.33\%$ of maximum voltage.' }]
  },

  // 13. RLC Resonant Circuit Frequency, Quality Factor (Q) & Bandwidth Calculator
  {
    slug: 'rlc-resonant-frequency-quality-factor-bandwidth-calculator',
    name: 'RLC Resonant Circuit (f₀ = 1 / (2π·√(LC))) & Quality Factor (Q) Calculator',
    description: 'Calculate series/parallel RLC circuit resonant frequency (f₀ = 1 / (2π·√(LC))) in kHz/MHz, Quality Factor (Q = (1/R)·√(L/C)), and -3dB bandwidth (BW = f₀ / Q) for radio frequency tuning.',
    category: 'Science',
    icon: 'text',
    keywords: ['rlc resonance calculator', 'resonant frequency formula f0 equals 1 over 2 pi sqrt lc online', 'quality factor q factor rlc bandwidth calculator', 'series parallel rlc tank circuit tuner calculator', 'rf radio tuning resonant frequency online'],
    order: 1044,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inductance L (μH or mH), Capacitance C (nF or pF) & Series Resistance R (Ω)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rl-ind">Inductance L (μH)</label>
          <input class="tool-textarea" id="rl-ind" type="number" step="10" value="100.0" placeholder="100.0 μH" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-cap">Capacitance C (pF)</label>
          <input class="tool-textarea" id="rl-cap" type="number" step="50" value="250.0" placeholder="250.0 pF (AM Radio Band)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-res">Resistance R (Ω)</label>
          <input class="tool-textarea" id="rl-res" type="number" step="2" value="10.0" placeholder="10.0 Ω" />
        </div>
      </div>
      <div id="rl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rl-res-f0" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f₀ = 1,006.58 kHz (1.01 MHz AM Radio)</span>
            <span class="stat-label">Resonant Center Frequency (f₀ = 1 / 2π√(LC))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rl-res-q" style="color:var(--green-dark); font-weight:700;">Quality Factor Q = 63.25 | Bandwidth BW = 15.91 kHz (High Selectivity RF Tuner)</span>
            <span class="stat-label">Quality Factor (Q = (1/R)√(L/C)) & -3dB Bandwidth</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('rl-ind'), cEl = document.getElementById('rl-cap'), rEl = document.getElementById('rl-res');
  const f0ResEl = document.getElementById('rl-res-f0'), qResEl = document.getElementById('rl-res-q');

  function update() {
    const L_uH = parseFloat(lEl.value), C_pF = parseFloat(cEl.value), R = parseFloat(rEl.value);
    if (isNaN(L_uH) || isNaN(C_pF) || isNaN(R) || L_uH <= 0 || C_pF <= 0 || R <= 0) return;

    const L = L_uH * 1e-6;
    const C = C_pF * 1e-12;

    // Resonant frequency: f0 = 1 / ( 2 * pi * sqrt(L * C) )  [Hz]
    const f0 = 1.0 / (2.0 * Math.PI * Math.sqrt(L * C));

    // Quality Factor Q = ( 1 / R ) * sqrt( L / C )
    const Q = (1.0 / R) * Math.sqrt(L / C);

    // Bandwidth BW = f0 / Q  [Hz]
    const BW = f0 / Q;

    let f0Str = '';
    if (f0 >= 1e6) f0Str = (f0 / 1e6).toFixed(3) + ' MHz';
    else if (f0 >= 1e3) f0Str = (f0 / 1e3).toFixed(2) + ' kHz';
    else f0Str = f0.toFixed(1) + ' Hz';

    let bwStr = '';
    if (BW >= 1e6) bwStr = (BW / 1e6).toFixed(2) + ' MHz';
    else if (BW >= 1e3) bwStr = (BW / 1e3).toFixed(2) + ' kHz';
    else bwStr = BW.toFixed(1) + ' Hz';

    f0ResEl.textContent = 'f₀ = ' + f0Str;
    qResEl.textContent = 'Quality Factor Q = ' + Q.toFixed(2) + ' | -3dB Bandwidth BW = ' + bwStr + ' (Characteristic Z₀ = ' + Math.sqrt(L/C).toFixed(1) + ' Ω @ R = ' + R + ' Ω)';
  }

  [lEl, cEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter tuning inductor inductance L in microhenries ($\mu\text{H}$).',
      'Enter variable tuning capacitor capacitance C in picofarads (pF).',
      'Enter series resistance R in Ohms ($\Omega$).',
      'Inspect center resonant frequency $f_0$, Quality Factor Q, and $-3\text{dB}$ bandpass filter bandwidth.'
    ],
    benefitTitle: 'Electromagnetic Resonance & Tuned Tank Circuits',
    benefitContent: 'At resonance ($X_L = X_C$), inductive and capacitive reactances cancel out completely, reducing circuit impedance to pure resistance R and allowing narrow-band station selection in wireless radio receivers.',
    faqs: [{ q: 'What does a high Quality Factor (Q > 50) indicate?', a: 'A high Q factor indicates sharp frequency selectivity with low energy dissipation, enabling reception of a specific radio station without bleed-through from adjacent channels.' }]
  },

  // 14. Lorentz Magnetic Force on Moving Charged Particle & Cyclotron Radius Calculator
  {
    slug: 'lorentz-magnetic-force-charged-particle-cyclotron-radius-calculator',
    name: 'Lorentz Magnetic Force (F = q·v·B·sin θ) & Cyclotron Gyro-Radius (r = m·v / q·B) Calculator',
    description: 'Calculate magnetic deflecting force on a moving charge (F = q · v · B · sin θ) in Newtons, circular trajectory cyclotron radius (r = m·v / (q·B)), and cyclotron frequency (f_c = q·B / (2π·m)) for particle accelerators.',
    category: 'Science',
    icon: 'text',
    keywords: ['lorentz force calculator', 'magnetic force on charged particle formula f equals q v b sin theta online', 'cyclotron radius gyro radius calculator r equals m v over q b', 'cyclotron frequency particle accelerator calculator', 'physics electromagnetism lorentz force online'],
    order: 1045,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Particle (Proton, Electron, Alpha), Velocity v (m/s), Magnetic Field B (Tesla) & Angle θ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lf-part">Particle</label>
          <select class="tool-textarea" id="lf-part">
            <option value="1.602e-19_1.673e-27" selected>Proton (q = +e, m = 1.67 × 10⁻²⁷ kg)</option>
            <option value="1.602e-19_9.109e-31">Electron (q = -e, m = 9.11 × 10⁻³¹ kg)</option>
            <option value="3.204e-19_6.644e-27">Alpha Particle He²⁺ (q = +2e, m = 6.64 × 10⁻²⁷ kg)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="lf-v">Velocity v (m/s)</label>
          <input class="tool-textarea" id="lf-v" type="number" step="1e6" value="5.0e6" placeholder="5.0e6 m/s (5,000 km/s)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lf-b">Field B (Tesla)</label>
          <input class="tool-textarea" id="lf-b" type="number" step="0.5" value="1.50" placeholder="1.50 T (MRI Magnet)" />
        </div>
      </div>
      <div id="lf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lf-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Force F = 1.20 × 10⁻¹² N</span>
            <span class="stat-label">Lorentz Deflecting Magnetic Force (F = q·v·B)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lf-res-rad" style="color:var(--green-dark); font-weight:700;">Cyclotron Radius r = 3.48 cm (0.0348 m) | Gyrofrequency f_c = 22.88 MHz</span>
            <span class="stat-label">Circular Orbital Radius (r = m·v / q·B) & Gyrofrequency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('lf-part'), vEl = document.getElementById('lf-v'), bEl = document.getElementById('lf-b');
  const fResEl = document.getElementById('lf-res-force'), rResEl = document.getElementById('lf-res-rad');

  function update() {
    const parts = pEl.value.split('_');
    const q = parseFloat(parts[0]);
    const m = parseFloat(parts[1]);

    const v = parseFloat(vEl.value), B = parseFloat(bEl.value);
    if (isNaN(v) || isNaN(B) || v <= 0 || B <= 0) return;

    // Lorentz force (assuming perpendicular theta = 90 deg): F = q * v * B  [Newtons]
    const F = q * v * B;

    // Cyclotron radius: r = ( m * v ) / ( q * B )  [meters]
    const r_m = (m * v) / (q * B);
    const r_cm = r_m * 100.0;

    // Cyclotron frequency: f_c = ( q * B ) / ( 2 * pi * m )  [Hz]
    const f_c = (q * B) / (2.0 * Math.PI * m);
    const f_c_MHz = f_c / 1e6;

    fResEl.textContent = 'Force F = ' + F.toExponential(2) + ' N';
    rResEl.textContent = 'Cyclotron Radius r = ' + (r_cm >= 100 ? r_m.toFixed(2) + ' m' : r_cm.toFixed(2) + ' cm') + ' | Gyrofrequency f_c = ' + f_c_MHz.toFixed(2) + ' MHz (Field B = ' + B + ' T)';
  }

  pEl.addEventListener('change', update);
  vEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select charged particle species (Proton, Electron, Alpha particle).',
      'Enter particle velocity v in m/s.',
      'Enter magnetic flux density B in Tesla (T).',
      'Inspect deflecting Lorentz force F, circular cyclotron gyro-radius r, and orbital gyrofrequency $f_c$.'
    ],
    benefitTitle: 'Hendrik Lorentz 1895 Magnetic Force Vector Law',
    benefitContent: 'Because the magnetic force acts strictly perpendicular to the particle velocity vector ($\vec{F} = q\vec{v} \times \vec{B}$), it performs zero mechanical work on the particle, bending its path into a pure circle ($r = \frac{mv}{qB}$) used in mass spectrometers and CERN synchrotrons.',
    faqs: [{ q: 'Why does an electron have a much smaller cyclotron radius than a proton at the same speed?', a: 'Because a proton is 1,836 times more massive than an electron ($m_p \gg m_e$), giving it much higher momentum and inertia to resist magnetic bending.' }]
  },

  // 15. AC Circuits Inductive/Capacitive Reactance & Total Impedance Calculator
  {
    slug: 'ac-circuits-inductive-capacitive-reactance-impedance-calculator',
    name: 'AC Circuits Reactance (X_L = 2π·f·L, X_C = 1 / (2π·f·C)) & Total Impedance (Z) Calculator',
    description: 'Calculate AC alternating current inductive reactance (X_L = 2π·f·L), capacitive reactance (X_C = 1 / (2π·f·C)), total series impedance (Z = √(R² + (X_L - X_C)²)), and phase angle φ in degrees.',
    category: 'Science',
    icon: 'text',
    keywords: ['ac impedance calculator', 'inductive capacitive reactance formula xl xc online', 'rlc series impedance z equals sqrt r squared plus xl minus xc squared calculator', 'ac circuit phase angle phi power factor calculator', 'electrical engineering ac circuit analysis online'],
    order: 1046,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'AC Frequency f (Hz), Resistance R (Ω), Inductance L (mH) & Capacitance C (μF)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ac-f">Frequency f (Hz)</label>
          <input class="tool-textarea" id="ac-f" type="number" step="10" value="60.0" placeholder="60.0 Hz (Grid)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ac-r">Resistance R (Ω)</label>
          <input class="tool-textarea" id="ac-r" type="number" step="10" value="50.0" placeholder="50.0 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ac-l">Inductance L (mH)</label>
          <input class="tool-textarea" id="ac-l" type="number" step="50" value="200.0" placeholder="200.0 mH" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ac-c">Capacitance C (μF)</label>
          <input class="tool-textarea" id="ac-c" type="number" step="10" value="50.0" placeholder="50.0 μF" />
        </div>
      </div>
      <div id="ac-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ac-res-z" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Impedance Z = 54.80 Ω</span>
            <span class="stat-label">Total Series AC Impedance (Z = √(R² + (X_L - X_C)²))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ac-res-react" style="color:var(--green-dark); font-weight:700;">X_L = 75.40 Ω | X_C = 53.05 Ω | Net Reactance X = +22.35 Ω (Inductive: Current lags voltage by 24.08°)</span>
            <span class="stat-label">Reactances, Net Reactance & Phase Angle φ</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('ac-f'), rEl = document.getElementById('ac-r');
  const lEl = document.getElementById('ac-l'), cEl = document.getElementById('ac-c');
  const zResEl = document.getElementById('ac-res-z'), rcResEl = document.getElementById('ac-res-react');

  function update() {
    const f = parseFloat(fEl.value), R = parseFloat(rEl.value);
    const L_mH = parseFloat(lEl.value), C_uF = parseFloat(cEl.value);

    if (isNaN(f) || isNaN(R) || isNaN(L_mH) || isNaN(C_uF) || f <= 0 || R < 0 || L_mH < 0 || C_uF <= 0) return;

    const L = L_mH / 1000.0;
    const C = C_uF * 1e-6;

    // Inductive reactance: X_L = 2 * pi * f * L  [Ohms]
    const X_L = 2.0 * Math.PI * f * L;
    // Capacitive reactance: X_C = 1 / ( 2 * pi * f * C )  [Ohms]
    const X_C = 1.0 / (2.0 * Math.PI * f * C);

    const netX = X_L - X_C;

    // Total impedance: Z = sqrt( R^2 + (X_L - X_C)^2 )  [Ohms]
    const Z = Math.sqrt(Math.pow(R, 2) + Math.pow(netX, 2));

    // Phase angle phi = atan( (X_L - X_C) / R ) in degrees
    const phi_rad = Math.atan2(netX, R);
    const phi_deg = (phi_rad * 180.0) / Math.PI;

    let regime = '';
    if (netX > 0.1) regime = 'INDUCTIVE (X_L > X_C: Current lags voltage by ' + phi_deg.toFixed(1) + '°)';
    else if (netX < -0.1) regime = 'CAPACITIVE (X_C > X_L: Current leads voltage by ' + Math.abs(phi_deg).toFixed(1) + '°)';
    else regime = 'PURELY RESISTIVE (Resonance: X_L = X_C, Z = R)';

    zResEl.textContent = 'Impedance Z = ' + Z.toFixed(2) + ' Ω';
    rcResEl.textContent = 'X_L = ' + X_L.toFixed(2) + ' Ω | X_C = ' + X_C.toFixed(2) + ' Ω | Net X = ' + (netX >= 0 ? '+' : '') + netX.toFixed(2) + ' Ω (' + regime + ')';
  }

  [fEl, rEl, lEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter AC alternating current operating frequency f in Hertz (e.g. 50 Hz or 60 Hz for utility grid power).',
      'Enter series resistance R in Ohms ($\Omega$).',
      'Enter series inductance L in millihenries (mH).',
      'Enter series capacitance C in microfarads ($\mu\text{F}$).',
      'Inspect inductive reactance ($X_L$), capacitive reactance ($X_C$), total impedance Z, and voltage-current phase shift angle $\phi$.'
    ],
    benefitTitle: 'AC Phasor Impedance Analysis',
    benefitContent: 'In AC circuits, inductors resist high frequencies ($X_L \propto f$) while capacitors block low frequencies ($X_C \propto 1/f$); calculating vector impedance $Z = R + j(X_L - X_C)$ is fundamental to audio crossover filters and power grid transmission.',
    faqs: [{ q: 'What is the power factor of an AC circuit?', a: 'Power factor is the cosine of the phase angle ($\text{PF} = \cos\phi = R / Z$), representing the fraction of apparent electrical power that performs real work.' }]
  },

  // 16. Power Factor & AC Power Triangle (Real, Reactive & Apparent Power) Calculator
  {
    slug: 'power-factor-apparent-real-reactive-power-triangle-calculator',
    name: 'AC Power Triangle & Power Factor (P = S·cos φ, Q = S·sin φ, S = V·I) Calculator',
    description: 'Calculate AC electrical power triangle components: Real Active Power (P in kW = S · cos φ), Reactive Magnetizing Power (Q in kVAR = S · sin φ), Apparent Power (S in kVA = V · I), and Power Factor (PF = cos φ).',
    category: 'Science',
    icon: 'text',
    keywords: ['power factor calculator', 'power triangle formula real reactive apparent power online', 'kw kva kvar power factor correction calculator', 'cos phi true power apparent power calculator', 'electrical engineering industrial power factor online'],
    order: 1047,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Line Voltage V (Volts RMS), Current I (Amperes RMS) & Phase Angle φ (°) or Power Factor',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pf-v">Voltage V (V)</label>
          <input class="tool-textarea" id="pf-v" type="number" step="10" value="230.0" placeholder="230.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pf-i">Current I (A)</label>
          <input class="tool-textarea" id="pf-i" type="number" step="5" value="50.0" placeholder="50.0 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pf-cos">Power Factor cos(φ)</label>
          <input class="tool-textarea" id="pf-cos" type="number" step="0.05" min="0.1" max="1.0" value="0.80" placeholder="0.80 (Inductive Motor)" />
        </div>
      </div>
      <div id="pf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pf-res-p" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Real Power P = 9.20 kW</span>
            <span class="stat-label">Real Active Useful Work Power (P = S · cos φ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pf-res-sq" style="color:var(--green-dark); font-weight:700;">Apparent S = 11.50 kVA | Reactive Q = 6.90 kVAR (Phase Angle φ = 36.87° Lagging)</span>
            <span class="stat-label">Apparent Power (S), Reactive Power (Q) & Power Triangle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('pf-v'), iEl = document.getElementById('pf-i'), cosEl = document.getElementById('pf-cos');
  const pResEl = document.getElementById('pf-res-p'), sqResEl = document.getElementById('pf-res-sq');

  function update() {
    const V = parseFloat(vEl.value), I = parseFloat(iEl.value), pf = parseFloat(cosEl.value);
    if (isNaN(V) || isNaN(I) || isNaN(pf) || V <= 0 || I <= 0 || pf <= 0 || pf > 1.0) return;

    // Apparent power: S = V * I  [VA -> kVA]
    const S_kVA = (V * I) / 1000.0;

    // Real power: P = S * PF  [kW]
    const P_kW = S_kVA * pf;

    // Phase angle: phi = acos(PF) in rad
    const phi_rad = Math.acos(pf);
    const phi_deg = (phi_rad * 180.0) / Math.PI;

    // Reactive power: Q = S * sin(phi)  [kVAR]
    const Q_kVAR = S_kVA * Math.sin(phi_rad);

    // Capacitor compensation needed to reach PF = 0.95:
    const target_phi = Math.acos(0.95);
    const target_Q = P_kW * Math.tan(target_phi);
    const cap_kVAR = Math.max(0, Q_kVAR - target_Q);

    pResEl.textContent = 'Real Power P = ' + P_kW.toFixed(2) + ' kW (' + (pf * 100).toFixed(0) + '% Power Factor)';
    sqResEl.textContent = 'Apparent S = ' + S_kVA.toFixed(2) + ' kVA | Reactive Q = ' + Q_kVAR.toFixed(2) + ' kVAR (Add ' + cap_kVAR.toFixed(2) + ' kVAR capacitors to reach 0.95 PF)';
  }

  [vEl, iEl, cosEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter RMS AC operating voltage V in Volts (e.g. 230 V single-phase or 400 V three-phase).',
      'Enter measured load current I in Amperes (A).',
      'Enter current load power factor $\cos\phi$ (typically $0.75\text{ to }0.85$ for inductive induction motors).',
      'Inspect Real Power (kW), Reactive Power (kVAR), Apparent Power (kVA), and required power factor correction capacitor sizing.'
    ],
    benefitTitle: 'Industrial AC Electrical Power Triangle S² = P² + Q²',
    benefitContent: 'Low power factor forces electric utilities to install oversized transformers and transmission wires to supply non-productive reactive magnetizing current ($Q$); installing power factor correction capacitors eliminates penalty utility surcharges.',
    faqs: [{ q: 'Why do utilities penalize industrial plants with power factor < 0.90?', a: 'Low power factor draws heavy reactive current that creates $I^2 R$ heat losses on utility grid power lines without registering on standard kilowatt-hour meters.' }]
  },

  // 17. Centripetal Acceleration & Centripetal Force in Circular Motion Calculator
  {
    slug: 'centripetal-acceleration-centripetal-force-curved-motion-calculator',
    name: 'Circular Motion Centripetal Acceleration (a_c = v² / r) & Centripetal Force (F_c = m·v² / r) Calculator',
    description: 'Calculate circular motion centripetal acceleration (a_c = v² / r = ω²·r) in m/s² and g-force, centripetal force (F_c = m·v² / r) in Newtons, and banking angle (tan θ = v² / (g·r)) for highway curves and roller coasters.',
    category: 'Science',
    icon: 'text',
    keywords: ['centripetal acceleration calculator', 'centripetal force formula f equals m v squared over r online', 'g force circular motion curve calculator', 'banked curve roadway angle centripetal calculator', 'classical mechanics circular motion physics online'],
    order: 1048,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Object Mass m (kg), Tangential Speed v (m/s or km/h) & Curve Radius r (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ca-m">Mass m (kg)</label>
          <input class="tool-textarea" id="ca-m" type="number" step="50" value="1200" placeholder="1200 kg (Car)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ca-v">Speed v (m/s)</label>
          <input class="tool-textarea" id="ca-v" type="number" step="5" value="25.0" placeholder="25.0 m/s (90 km/h)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ca-r">Radius r (m)</label>
          <input class="tool-textarea" id="ca-r" type="number" step="10" value="100.0" placeholder="100.0 m" />
        </div>
      </div>
      <div id="ca-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ca-res-acc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">a_c = 6.25 m / s² (0.64 g)</span>
            <span class="stat-label">Inward Radial Centripetal Acceleration</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ca-res-force" style="color:var(--green-dark); font-weight:700;">Centripetal Force F_c = 7,500 N | Ideal Roadway Bank Angle θ = 32.5° (Frictionless turn)</span>
            <span class="stat-label">Inward Force (F_c = m·v²/r) & Civil Highway Bank Angle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('ca-m'), vEl = document.getElementById('ca-v'), rEl = document.getElementById('ca-r');
  const acResEl = document.getElementById('ca-res-acc'), fcResEl = document.getElementById('ca-res-force');

  const g = 9.80665; // m/s^2

  function update() {
    const m = parseFloat(mEl.value), v = parseFloat(vEl.value), r = parseFloat(rEl.value);
    if (isNaN(m) || isNaN(v) || isNaN(r) || m <= 0 || v <= 0 || r <= 0) return;

    // Centripetal acceleration a_c = v^2 / r  [m / s^2]
    const a_c = Math.pow(v, 2) / r;
    const g_force = a_c / g;

    // Centripetal force F_c = m * a_c  [Newtons]
    const F_c = m * a_c;

    // Ideal frictionless roadway bank angle: tan(theta) = v^2 / (g * r)
    const tan_theta = Math.pow(v, 2) / (g * r);
    const bank_deg = (Math.atan(tan_theta) * 180.0) / Math.PI;

    acResEl.textContent = 'a_c = ' + a_c.toFixed(2) + ' m / s² (' + g_force.toFixed(2) + ' g-force)';
    fcResEl.textContent = 'Force F_c = ' + Math.round(F_c).toLocaleString() + ' N (' + (F_c/1000).toFixed(2) + ' kN) | Bank Angle θ = ' + bank_deg.toFixed(1) + '° (Speed: ' + (v * 3.6).toFixed(0) + ' km/h @ r = ' + r + ' m)';
  }

  [mEl, vEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter moving vehicle or particle mass m in kg.',
      'Enter tangential curved speed v in m/s (multiply km/h by 0.278 to get m/s).',
      'Enter curved track turning radius r in meters.',
      'Inspect inward radial centripetal acceleration ($a_c = v^2/r$), g-force, centripetal force ($F_c$), and civil engineering roadway banking angle.'
    ],
    benefitTitle: 'Sir Isaac Newton 1687 Centripetal Motion Principle',
    benefitContent: 'Even at constant speed, circular motion involves continuous acceleration ($a_c = v^2/r$) directed toward the center of the curve because the velocity vector direction changes continuously.',
    faqs: [{ q: 'What is the difference between Centripetal and Centrifugal force?', a: 'Centripetal force is the real inward force (like tire friction or string tension) causing circular motion; centrifugal force is the fictitious outward inertia experienced in a rotating non-inertial frame of reference.' }]
  },

  // 18. Rotational Kinetic Energy Moment of Inertia & Angular Momentum Calculator
  {
    slug: 'rotational-kinetic-energy-moment-of-inertia-angular-momentum-calculator',
    name: 'Rotational Dynamics (K_rot = ½·I·ω², L = I·ω) & Moment of Inertia Calculator',
    description: 'Calculate rotational kinetic energy (K_rot = ½ · I · ω²) in Joules, angular momentum (L = I · ω) in kg·m²/s, and moment of inertia I for solid cylinders (½·m·r²), spheres (⅖·m·r²), and thin rods (1/12·m·L²).',
    category: 'Science',
    icon: 'text',
    keywords: ['rotational kinetic energy calculator', 'moment of inertia formula half m r squared online', 'angular momentum l equals i omega calculator', 'flywheel kinetic energy storage rotational dynamics calculator', 'classical mechanics rotational physics online'],
    order: 1049,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Geometry (Cylinder Flywheel, Solid Sphere, Thin Rod), Mass m (kg), Radius r / Length L (m) & Rotational Speed ω (RPM or rad/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rd-geom">Body Shape</label>
          <select class="tool-textarea" id="rd-geom">
            <option value="cylinder" selected>Solid Cylinder / Flywheel Disk (I = ½·m·r²)</option>
            <option value="sphere">Solid Sphere (I = ⅖·m·r²)</option>
            <option value="hoop">Thin Cylindrical Hoop / Ring (I = m·r²)</option>
            <option value="rod">Thin Rod about Center (I = 1/12·m·L²)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-m">Mass m (kg)</label>
          <input class="tool-textarea" id="rd-m" type="number" step="5" value="50.0" placeholder="50.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-r">Radius / Length (m)</label>
          <input class="tool-textarea" id="rd-r" type="number" step="0.1" value="0.40" placeholder="0.40 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-rpm">Speed (RPM)</label>
          <input class="tool-textarea" id="rd-rpm" type="number" step="500" value="3000" placeholder="3000 RPM" />
        </div>
      </div>
      <div id="rd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rd-res-krot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Energy K_rot = 197.39 kJ</span>
            <span class="stat-label">Rotational Kinetic Energy (K_rot = ½·I·ω²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rd-res-i" style="color:var(--green-dark); font-weight:700;">Inertia I = 4.00 kg·m² | Angular Momentum L = 1,256.6 kg·m²/s (ω = 314.16 rad/s)</span>
            <span class="stat-label">Moment of Inertia (I) & Conserved Angular Momentum (L)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const gEl = document.getElementById('rd-geom'), mEl = document.getElementById('rd-m');
  const rEl = document.getElementById('rd-r'), rpmEl = document.getElementById('rd-rpm');
  const krResEl = document.getElementById('rd-res-krot'), iResEl = document.getElementById('rd-res-i');

  function update() {
    const geom = gEl.value;
    const m = parseFloat(mEl.value), r = parseFloat(rEl.value), rpm = parseFloat(rpmEl.value);

    if (isNaN(m) || isNaN(r) || isNaN(rpm) || m <= 0 || r <= 0 || rpm < 0) return;

    // Moment of Inertia I:
    let I = 0;
    if (geom === 'cylinder') I = 0.5 * m * Math.pow(r, 2);
    else if (geom === 'sphere') I = 0.4 * m * Math.pow(r, 2);
    else if (geom === 'hoop') I = m * Math.pow(r, 2);
    else if (geom === 'rod') I = (1.0 / 12.0) * m * Math.pow(r, 2);

    // Angular velocity omega = RPM * 2*pi / 60  [rad / s]
    const omega = (rpm * 2.0 * Math.PI) / 60.0;

    // Rotational kinetic energy: K_rot = 0.5 * I * omega^2  [Joules]
    const K_rot_J = 0.5 * I * Math.pow(omega, 2);
    const K_rot_kJ = K_rot_J / 1000.0;

    // Angular momentum: L = I * omega  [kg * m^2 / s]
    const L_ang = I * omega;

    krResEl.textContent = 'Energy K_rot = ' + (K_rot_kJ >= 1 ? K_rot_kJ.toFixed(2) + ' kJ' : K_rot_J.toFixed(1) + ' J');
    iResEl.textContent = 'Inertia I = ' + I.toFixed(3) + ' kg·m² | Angular Momentum L = ' + L_ang.toFixed(1) + ' kg·m²/s (ω = ' + omega.toFixed(2) + ' rad/s @ ' + rpm + ' RPM)';
  }

  [gEl, mEl, rEl, rpmEl].forEach(el => el.addEventListener('input', update));
  gEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select rotational geometry (Flywheel Cylinder $\frac{1}{2}mr^2$, Sphere $\frac{2}{5}mr^2$, Thin Hoop $mr^2$, Thin Rod $\frac{1}{12}mL^2$).',
      'Enter body mass m in kg.',
      'Enter radius r or rod length L in meters.',
      'Enter rotational speed in Revolutions Per Minute (RPM).',
      'Inspect stored Rotational Kinetic Energy in kJ, Moment of Inertia I, and Angular Momentum L.'
    ],
    benefitTitle: 'Rotational Analog of Linear Newtonian Mechanics',
    benefitContent: 'Moment of Inertia ($I = \sum m_i r_i^2$) represents rotational inertia; flywheels store grid kinetic energy ($K_{\text{rot}} = \frac{1}{2} I \omega^2$), while conservation of angular momentum ($L = I\omega = \text{constant}$) governs ice skater spins and pulsar neutron stars.',
    faqs: [{ q: 'Why does mass placed farther from the axis increase moment of inertia so dramatically?', a: 'Because moment of inertia scales with radius squared ($I \propto r^2$), placing mass on outer rims quadruples rotational resistance for the same mass.' }]
  },

  // 19. Torque Lever Arm & Static Rotational Equilibrium Calculator
  {
    slug: 'torque-lever-arm-rotational-equilibrium-calculator',
    name: 'Torque Lever Arm (τ = r·F·sin θ) & Static Rotational Equilibrium (Στ = 0) Calculator',
    description: 'Calculate mechanical torque moment (τ = r · F · sin θ) in N·m, mechanical advantage of levers, and solve static equilibrium balance equations (Στ = 0) for mechanical engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['torque calculator', 'lever arm torque formula tau equals r f sin theta online', 'mechanical advantage lever rotational equilibrium calculator', 'moment of force newton meters calculator', 'physics statics torque balance online'],
    order: 1050,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Applied Force F (N), Lever Arm Distance r (m) & Force Angle θ (° from Lever Arm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tq-f">Applied Force F (N)</label>
          <input class="tool-textarea" id="tq-f" type="number" step="20" value="200.0" placeholder="200.0 N" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tq-r">Lever Arm r (m)</label>
          <input class="tool-textarea" id="tq-r" type="number" step="0.1" value="0.50" placeholder="0.50 m (Wrench)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tq-th">Angle θ (°)</label>
          <input class="tool-textarea" id="tq-th" type="number" step="5" min="0" max="180" value="90.0" placeholder="90.0° (Perpendicular)" />
        </div>
      </div>
      <div id="tq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tq-res-tau" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Torque τ = 100.00 N·m (73.76 lb·ft)</span>
            <span class="stat-label">Rotational Torque Moment (τ = r · F · sin θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tq-res-eff" style="color:var(--green-dark); font-weight:700;">Effective Perpendicular Lever Arm r_perp = 0.500 m (100% Maximum Torque Efficiency @ 90°)</span>
            <span class="stat-label">Perpendicular Moment Arm Distance & Angular Efficiency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('tq-f'), rEl = document.getElementById('tq-r'), thEl = document.getElementById('tq-th');
  const tqResEl = document.getElementById('tq-res-tau'), efResEl = document.getElementById('tq-res-eff');

  function update() {
    const F = parseFloat(fEl.value), r = parseFloat(rEl.value), theta_deg = parseFloat(thEl.value);
    if (isNaN(F) || isNaN(r) || isNaN(theta_deg) || F < 0 || r <= 0 || theta_deg < 0 || theta_deg > 180) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const sin_theta = Math.sin(theta_rad);

    // Torque tau = r * F * sin(theta)  [N * m]
    const tau_Nm = r * F * sin_theta;
    const tau_lbft = tau_Nm * 0.737562;

    const r_perp = r * sin_theta;

    tqResEl.textContent = 'Torque τ = ' + tau_Nm.toFixed(2) + ' N·m (' + tau_lbft.toFixed(2) + ' lb·ft)';
    efResEl.textContent = 'Effective Lever Arm r_perp = ' + r_perp.toFixed(3) + ' m (' + (sin_theta * 100).toFixed(1) + '% Torque Efficiency @ θ = ' + theta_deg + '°)';
  }

  [fEl, rEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter applied muscular or mechanical force F in Newtons (N).',
      'Enter distance r from pivot axis to point of force application in meters.',
      'Enter angle $\theta$ between force vector and lever arm in degrees ($90^\circ$ for maximum torque).',
      'Inspect resultant rotational torque moment $\tau$ in $\text{N}\cdot\text{m}$ and foot-pounds ($\text{lb}\cdot\text{ft}$).'
    ],
    benefitTitle: 'Archimedes Law of the Lever & Mechanical Torque',
    benefitContent: '"Give me a place to stand, and I shall move the Earth." Torque ($\vec{\tau} = \vec{r} \times \vec{F}$) measures rotational twisting force, allowing long wrench handles to multiply torque on tight bolts.',
    faqs: [{ q: 'Why is torque zero when pushing directly toward the pivot (θ = 0°)?', a: 'Because $\sin(0^\circ) = 0$, the force vector passes directly through the rotation axis with zero perpendicular lever arm, producing pure linear compression without rotational moment.' }]
  },

  // 20. Simple Pendulum Period (Small Angle Approximation) Calculator
  {
    slug: 'simple-pendulum-period-small-angle-calculator',
    name: 'Simple Pendulum Period (T = 2π·√(L / g)) Small Angle Harmonic Motion Calculator',
    description: 'Calculate gravitational simple pendulum period of oscillation (T = 2π · √(L / g)) in seconds and frequency f in Hz from pendulum length L and gravitational acceleration g on Earth, Moon, and Mars.',
    category: 'Science',
    icon: 'text',
    keywords: ['simple pendulum calculator', 'pendulum period formula t equals 2 pi sqrt l over g online', 'simple harmonic motion pendulum frequency calculator', 'pendulum length gravity time period calculator', 'physics simple pendulum oscillation online'],
    order: 1051,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pendulum String Length L (m or cm) & Celestial Gravity g (m/s²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pn-len">Length L (m)</label>
          <input class="tool-textarea" id="pn-len" type="number" step="0.1" value="1.0" placeholder="1.0 m (Seconds Pendulum ≈ 0.994 m)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pn-g">Gravity g</label>
          <select class="tool-textarea" id="pn-g">
            <option value="9.80665" selected>Earth Standard (g = 9.81 m/s²)</option>
            <option value="1.62">Moon (g = 1.62 m/s² - 2.46× Slower)</option>
            <option value="3.71">Mars (g = 3.71 m/s²)</option>
            <option value="24.79">Jupiter (g = 24.79 m/s² - Fast)</option>
          </select>
        </div>
      </div>
      <div id="pn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pn-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Period T = 2.006 Seconds</span>
            <span class="stat-label">Full Back-and-Forth Oscillation Period (T = 2π√(L/g))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pn-res-freq" style="color:var(--green-dark); font-weight:700;">Frequency f = 0.498 Hz (29.9 cycles/min | Mass Independent: Bob mass has 0 effect on period!)</span>
            <span class="stat-label">Oscillation Frequency & Isochronism Principle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('pn-len'), gEl = document.getElementById('pn-g');
  const tResEl = document.getElementById('pn-res-t'), fqResEl = document.getElementById('pn-res-freq');

  function update() {
    const L = parseFloat(lEl.value), g = parseFloat(gEl.value);
    if (isNaN(L) || isNaN(g) || L <= 0 || g <= 0) return;

    // Simple pendulum period: T = 2 * pi * sqrt( L / g )  [seconds]
    const T = 2.0 * Math.PI * Math.sqrt(L / g);
    const freq = 1.0 / T;

    tResEl.textContent = 'Period T = ' + T.toFixed(3) + ' Seconds';
    fqResEl.textContent = 'Frequency f = ' + freq.toFixed(3) + ' Hz (' + (freq * 60).toFixed(1) + ' BPM | Length L = ' + L + ' m @ g = ' + g + ' m/s²)';
  }

  lEl.addEventListener('input', update);
  gEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter pendulum string length L in meters (e.g. 1.0 m).',
      'Select gravitational field g (Earth, Moon, Mars, Jupiter).',
      'Inspect full back-and-forth oscillation period T in seconds and frequency f in Hz.'
    ],
    benefitTitle: 'Galileo Galilei 1602 Isochronism of the Pendulum',
    benefitContent: 'For small amplitudes ($\theta < 15^\circ$), pendulum period depends exclusively on length and gravity ($T = 2\pi\sqrt{L/g}$), completely independent of the hanging bob mass or swing angle, providing the historical foundation for mechanical pendulum grandfather clocks.',
    faqs: [{ q: 'Does a heavier pendulum bob swing faster or slower?', a: 'Bob mass has zero effect on the period; gravity accelerates all masses at the exact same rate ($g$).' }]
  },

  // 21. Mass-Spring Simple Harmonic Motion (SHM) Period & Frequency Calculator
  {
    slug: 'mass-spring-simple-harmonic-motion-period-frequency-calculator',
    name: 'Mass-Spring Harmonic Oscillator Period (T = 2π·√(m / k)) & Frequency Calculator',
    description: 'Calculate simple harmonic motion (SHM) mass-spring oscillation period (T = 2π · √(m / k)) in seconds, angular frequency (ω = √(k / m)), and spring potential energy (U = ½·k·x²) from spring constant k and mass m.',
    category: 'Science',
    icon: 'text',
    keywords: ['mass spring calculator', 'simple harmonic motion shm period formula t equals 2 pi sqrt m over k online', 'spring constant oscillation frequency calculator', 'harmonic oscillator angular frequency omega calculator', 'physics simple harmonic motion spring online'],
    order: 1052,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Oscillating Mass m (kg), Spring Constant k (N/m) & Amplitude Displacement x (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sh-m">Mass m (kg)</label>
          <input class="tool-textarea" id="sh-m" type="number" step="0.5" value="2.0" placeholder="2.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-k">Spring Constant k</label>
          <input class="tool-textarea" id="sh-k" type="number" step="20" value="200.0" placeholder="200.0 N/m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sh-amp">Amplitude x (cm)</label>
          <input class="tool-textarea" id="sh-amp" type="number" step="1" value="10.0" placeholder="10.0 cm" />
        </div>
      </div>
      <div id="sh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sh-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Period T = 0.628 Seconds (f = 1.59 Hz)</span>
            <span class="stat-label">Harmonic Oscillation Period & Frequency</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sh-res-en" style="color:var(--green-dark); font-weight:700;">Angular ω = 10.00 rad/s | Peak Energy U_max = 1.00 J | Max Speed v_max = 1.00 m/s</span>
            <span class="stat-label">Angular Frequency, Maximum Restoring Energy & Peak Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('sh-m'), kEl = document.getElementById('sh-k'), ampEl = document.getElementById('sh-amp');
  const tResEl = document.getElementById('sh-res-t'), enResEl = document.getElementById('sh-res-en');

  function update() {
    const m = parseFloat(mEl.value), k = parseFloat(kEl.value), x_cm = parseFloat(ampEl.value);
    if (isNaN(m) || isNaN(k) || isNaN(x_cm) || m <= 0 || k <= 0 || x_cm < 0) return;

    const x_m = x_cm / 100.0;

    // Angular frequency omega = sqrt( k / m )  [rad / s]
    const omega = Math.sqrt(k / m);

    // Period T = 2 * pi / omega = 2 * pi * sqrt( m / k )  [seconds]
    const T = (2.0 * Math.PI) / omega;
    const freq = 1.0 / T;

    // Max potential energy U_max = 0.5 * k * x^2  [Joules]
    const U_max = 0.5 * k * Math.pow(x_m, 2);

    // Max speed v_max = omega * x  [m / s]
    const v_max = omega * x_m;

    tResEl.textContent = 'Period T = ' + T.toFixed(3) + ' s (f = ' + freq.toFixed(2) + ' Hz)';
    enResEl.textContent = 'Angular ω = ' + omega.toFixed(2) + ' rad/s | Energy U = ' + U_max.toFixed(2) + ' J | Max Velocity v_max = ' + v_max.toFixed(2) + ' m/s @ k = ' + k + ' N/m';
  }

  [mEl, kEl, ampEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter oscillating attached mass m in kg.',
      'Enter spring stiffness constant k in N/m.',
      'Enter maximum displacement amplitude x in cm.',
      'Inspect oscillation period T, natural frequency f, angular velocity $\omega = \sqrt{k/m}$, and maximum mechanical energy.'
    ],
    benefitTitle: 'Robert Hooke Restoring Force Linear Elasticity Law',
    benefitContent: 'Because the restoring spring force is strictly proportional to displacement ($F = -kx$), the resulting differential equation ($m\ddot{x} + kx = 0$) produces sinusoidal harmonic motion with constant frequency regardless of amplitude.',
    faqs: [{ q: 'What happens to the oscillation period if the mass is quadrupled?', a: 'Quadrupling the mass doubles the oscillation period ($T \propto \sqrt{m}$, so $\sqrt{4} = 2$).' }]
  },

  // 22. Magnetic Force on a Current-Carrying Conductor Wire Calculator
  {
    slug: 'magnetic-force-current-carrying-conductor-wire-calculator',
    name: 'Magnetic Force on Current-Carrying Wire (F = I·L·B·sin θ) Calculator',
    description: 'Calculate magnetic Laplace force on a straight electrical wire (F = I · L · B · sin θ) in Newtons from current I in Amperes, wire length L in meters, magnetic field B in Tesla, and angle θ for electric motor physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['magnetic force on wire calculator', 'laplace force formula f equals i l b sin theta online', 'current carrying conductor magnetic force calculator', 'electric motor torque wire magnetic force calculator', 'physics electromagnetism magnetic force on conductor online'],
    order: 1053,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Current I (Amperes), Wire Length L (m), Magnetic Field B (Tesla) & Orientation Angle θ (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mw-i">Current I (A)</label>
          <input class="tool-textarea" id="mw-i" type="number" step="2" value="10.0" placeholder="10.0 Amperes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mw-l">Length L (m)</label>
          <input class="tool-textarea" id="mw-l" type="number" step="0.1" value="0.50" placeholder="0.50 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mw-b">Field B (Tesla)</label>
          <input class="tool-textarea" id="mw-b" type="number" step="0.2" value="0.80" placeholder="0.80 T" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mw-th">Angle θ (°)</label>
          <input class="tool-textarea" id="mw-th" type="number" step="5" min="0" max="180" value="90.0" placeholder="90.0° (Perpendicular)" />
        </div>
      </div>
      <div id="mw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mw-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Force F = 4.00 N</span>
            <span class="stat-label">Magnetic Deflection Force (F = I · L · B · sin θ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mw-res-dir" style="color:var(--green-dark); font-weight:700;">Direction given by Right-Hand Rule (Index: Current, Middle: B-Field, Thumb: Force)</span>
            <span class="stat-label">Fleming's Left-Hand / Right-Hand Vector Orientation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const iEl = document.getElementById('mw-i'), lEl = document.getElementById('mw-l');
  const bEl = document.getElementById('mw-b'), thEl = document.getElementById('mw-th');
  const fResEl = document.getElementById('mw-res-force'), drResEl = document.getElementById('mw-res-dir');

  function update() {
    const I = parseFloat(iEl.value), L = parseFloat(lEl.value);
    const B = parseFloat(bEl.value), theta_deg = parseFloat(thEl.value);

    if (isNaN(I) || isNaN(L) || isNaN(B) || isNaN(theta_deg) || I < 0 || L <= 0 || B < 0 || theta_deg < 0 || theta_deg > 180) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const sin_theta = Math.sin(theta_rad);

    // Magnetic force: F = I * L * B * sin(theta)  [Newtons]
    const F = I * L * B * sin_theta;

    fResEl.textContent = 'Force F = ' + F.toFixed(2) + ' N';
    drResEl.textContent = 'Perpendicular Force: ' + F.toFixed(2) + ' N (' + (sin_theta * 100).toFixed(1) + '% max force @ θ = ' + theta_deg + '°, I = ' + I + ' A, B = ' + B + ' T)';
  }

  [iEl, lEl, bEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter electric current I in Amperes.',
      'Enter wire length L inside the magnetic field in meters.',
      'Enter uniform magnetic field strength B in Tesla.',
      'Enter orientation angle $\theta$ between wire and magnetic field lines in degrees.',
      'Inspect deflecting magnetic Laplace force F in Newtons.'
    ],
    benefitTitle: 'Pierre-Simon Laplace Electromagnetic Conductor Force',
    benefitContent: 'When charge carriers drift through a magnetic field, the sum of individual microscopic Lorentz forces produces macroscopic mechanical force on the wire ($\vec{F} = I\vec{L} \times \vec{B}$), driving all industrial electric motors and loudspeaker voice coils.',
    faqs: [{ q: 'Why is the force zero when the wire is parallel to the magnetic field (θ = 0°)?', a: 'Because $\sin(0^\circ) = 0$, current flowing parallel to magnetic field lines experiences zero deflecting Lorentz force.' }]
  },

  // 23. Biot-Savart Law Magnetic Field of Straight Wire & Solenoid Calculator
  {
    slug: 'biot-savart-law-magnetic-field-straight-wire-loop-solenoid-calculator',
    name: 'Biot-Savart Law Magnetic Field (Wire B = μ₀·I / 2π·r & Solenoid B = μ₀·n·I) Calculator',
    description: 'Calculate magnetic field B in microtesla (μT) and Gauss produced by long straight electrical wires (B = μ₀·I / 2π·r), circular loops, and multi-turn solenoids (B = μ₀ · n · I) in physics.',
    category: 'Science',
    icon: 'text',
    keywords: ['biot savart law calculator', 'magnetic field straight wire formula b equals mu0 i over 2 pi r online', 'solenoid magnetic field b equals mu0 n i calculator', 'electromagnet coil magnetic field calculator tesla', 'physics electromagnetism magnetic field online'],
    order: 1054,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Configuration (Long Straight Wire vs Multi-Turn Solenoid Coil), Current I (A) & Distance r (cm) / Turn Density n',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bs-cfg">Geometry</label>
          <select class="tool-textarea" id="bs-cfg">
            <option value="wire" selected>Long Straight Wire (B = μ₀·I / 2π·r)</option>
            <option value="solenoid">Solenoid Coil (B = μ₀·n·I)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-i">Current I (A)</label>
          <input class="tool-textarea" id="bs-i" type="number" step="1" value="5.0" placeholder="5.0 Amperes" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bs-r">Distance r (cm) / Turns n</label>
          <input class="tool-textarea" id="bs-r" type="number" step="1" value="5.0" placeholder="5.0 cm (or 1000 turns/m)" />
        </div>
      </div>
      <div id="bs-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bs-res-b" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Field B = 20.00 μT (0.20 Gauss)</span>
            <span class="stat-label">Magnetic Flux Density B (Tesla)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bs-res-desc" style="color:var(--green-dark); font-weight:700;">Earth Background Field Comparison: ~40 to 50 μT (B-field circles around wire by Right-Hand Rule)</span>
            <span class="stat-label">Geomagnetic Comparison & Right-Hand Curl Rule</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const cfgEl = document.getElementById('bs-cfg'), iEl = document.getElementById('bs-i'), rEl = document.getElementById('bs-r');
  const bResEl = document.getElementById('bs-res-b'), dsResEl = document.getElementById('bs-res-desc');

  const mu_0 = 4.0 * Math.PI * 1e-7; // T * m / A

  function update() {
    const isWire = cfgEl.value === 'wire';
    const I = parseFloat(iEl.value), val = parseFloat(rEl.value);

    if (isNaN(I) || isNaN(val) || I <= 0 || val <= 0) return;

    let B_tesla = 0;
    if (isWire) {
      // Straight wire: B = ( mu_0 * I ) / ( 2 * pi * r )
      const r_m = val / 100.0;
      B_tesla = (mu_0 * I) / (2.0 * Math.PI * r_m);
    } else {
      // Solenoid: B = mu_0 * n * I (val = turns per meter)
      const n_turns_m = val;
      B_tesla = mu_0 * n_turns_m * I;
    }

    const B_uT = B_tesla * 1e6;
    const B_gauss = B_tesla * 1e4;

    bResEl.textContent = 'Field B = ' + (B_uT >= 1000 ? (B_uT/1000).toFixed(3) + ' mT' : B_uT.toFixed(2) + ' μT') + ' (' + B_gauss.toFixed(3) + ' Gauss)';
    dsResEl.textContent = (isWire ? 'Straight Wire at r = ' + val + ' cm' : 'Solenoid Coil with n = ' + val + ' turns/m') + ' @ Current I = ' + I + ' A';
  }

  [cfgEl, iEl, rEl].forEach(el => el.addEventListener('input', update));
  cfgEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select electromagnetic conductor geometry (Straight Wire vs Solenoid Coil).',
      'Enter electrical current I in Amperes.',
      'Enter radial distance r in cm (for wire) or turn density n in turns/meter (for solenoid).',
      'Inspect generated magnetic flux density B in microtesla ($\mu\text{T}$) and Gauss.'
    ],
    benefitTitle: 'Jean-Baptiste Biot & Félix Savart 1820 Magnetostatic Law',
    benefitContent: 'The Biot-Savart law demonstrates that electric currents create surrounding magnetic fields ($\vec{B} \propto I/r$), establishing the foundation for Ampère\'s circuital law, electromagnets, and inductive transformers.',
    faqs: [{ q: 'What is the permeability of free space (μ₀)?', a: '$\mu_0 = 4\pi \times 10^{-7}\text{ T}\cdot\text{m/A} \approx 1.2566 \times 10^{-6}\text{ H/m}$, quantifying magnetic field propagation through vacuum.' }]
  },

  // 24. Faraday's Law of Electromagnetic Induction & Induced EMF Calculator
  {
    slug: 'faraday-law-electromagnetic-induction-induced-emf-calculator',
    name: 'Faraday\'s Law of Electromagnetic Induction (EMF = -N·(ΔΦ / Δt)) Calculator',
    description: 'Calculate electromagnetic induced electromotive force voltage (EMF = -N · (ΔΦ / Δt)) in Volts, rate of magnetic flux change (ΔΦ/Δt in Webers/s), and Lenz\'s Law opposing polarity for electrical generators.',
    category: 'Science',
    icon: 'text',
    keywords: ['faradays law induction calculator', 'induced emf formula emf equals minus n delta phi over delta t online', 'magnetic flux change rate webers per second calculator', 'lenzs law electromagnetic induction calculator volts', 'physics electric generator induction online'],
    order: 1055,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Coil Wire Turns N, Initial Flux Φ₁ (Wb), Final Flux Φ₂ (Wb) & Time Interval Δt (ms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fi-n">Coil Turns N</label>
          <input class="tool-textarea" id="fi-n" type="number" step="50" value="500" placeholder="500 Turns" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fi-p1">Initial Flux Φ₁ (Wb)</label>
          <input class="tool-textarea" id="fi-p1" type="number" step="0.01" value="0.00" placeholder="0.00 Wb" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fi-p2">Final Flux Φ₂ (Wb)</label>
          <input class="tool-textarea" id="fi-p2" type="number" step="0.01" value="0.05" placeholder="0.05 Wb (Webers)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fi-dt">Time Δt (ms)</label>
          <input class="tool-textarea" id="fi-dt" type="number" step="10" value="50.0" placeholder="50.0 ms" />
        </div>
      </div>
      <div id="fi-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fi-res-emf" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Induced EMF = -500.0 Volts</span>
            <span class="stat-label">Generated Electromotive Force (EMF = -N·ΔΦ/Δt)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fi-res-lenz" style="color:var(--green-dark); font-weight:700;">Rate of Flux Change = 1.00 Wb / s | Negative sign represents Lenz\'s Law opposing back-EMF</span>
            <span class="stat-label">Magnetic Flux Rate of Change (dΦ/dt) & Lenz's Law</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('fi-n'), p1El = document.getElementById('fi-p1');
  const p2El = document.getElementById('fi-p2'), dtEl = document.getElementById('fi-dt');
  const emfResEl = document.getElementById('fi-res-emf'), lzResEl = document.getElementById('fi-res-lenz');

  function update() {
    const N = parseInt(nEl.value, 10), phi1 = parseFloat(p1El.value);
    const phi2 = parseFloat(p2El.value), dt_ms = parseFloat(dtEl.value);

    if (isNaN(N) || isNaN(phi1) || isNaN(phi2) || isNaN(dt_ms) || N < 1 || dt_ms <= 0) return;

    const dt_s = dt_ms / 1000.0;
    const deltaPhi = phi2 - phi1; // Webers

    // Rate of change: dPhi / dt
    const rate_Wb_s = deltaPhi / dt_s;

    // Faraday's Law: EMF = -N * (dPhi / dt)  [Volts]
    const EMF = -N * rate_Wb_s;

    emfResEl.textContent = 'Induced EMF = ' + (EMF >= 0 ? '+' : '') + EMF.toFixed(1) + ' Volts';
    lzResEl.textContent = 'Flux Rate = ' + rate_Wb_s.toFixed(2) + ' Wb/s | N = ' + N + ' Turns (Lenz\'s Law opposes flux change of ' + (deltaPhi >= 0 ? '+' : '') + deltaPhi.toFixed(3) + ' Wb)';
  }

  [nEl, p1El, p2El, dtEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total number of wire turns N in the induction coil.',
      'Enter initial magnetic flux $\Phi_1$ in Webers ($\text{Wb} = \text{Tesla} \cdot \text{m}^2$).',
      'Enter final magnetic flux $\Phi_2$ in Webers.',
      'Enter elapsed time interval $\Delta t$ in milliseconds.',
      'Inspect generated induced electromotive force voltage (EMF in Volts).'
    ],
    benefitTitle: 'Michael Faraday 1831 Electromagnetic Induction Standard',
    benefitContent: 'Faraday discovered that a changing magnetic flux induces an electric potential ($\mathcal{E} = -N \frac{d\Phi}{dt}$), which Heinrich Lenz proved creates opposing currents conserving energy; this principle generates $>99\%$ of human civilization\'s electrical power.',
    faqs: [{ q: 'What is 1 Weber of magnetic flux?', a: '1 Weber ($1\text{ Wb} = 1\text{ T}\cdot\text{m}^2$) is the magnetic flux passing through a $1\text{ m}^2$ area perpendicular to a uniform 1 Tesla magnetic field.' }]
  },

  // 25. RL Circuit Current Growth & Decay Time Constant Calculator
  {
    slug: 'rl-circuit-current-growth-decay-time-constant-calculator',
    name: 'RL Circuit Time Constant (τ = L / R) Current Growth & Decay Calculator',
    description: 'Calculate resistor-inductor (RL) circuit inductive time constant (τ = L / R) in ms, transient current growth (I(t) = I₀·(1 - e^(-t/τ))), stored magnetic energy (U = ½·L·I²), and inductive flyback voltage.',
    category: 'Science',
    icon: 'text',
    keywords: ['rl circuit calculator', 'time constant tau equals l over r formula online', 'inductor current growth decay transient calculator', 'rl circuit stored magnetic energy calculator', 'electronics rl circuit time constant online'],
    order: 1056,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inductance L (mH), Resistance R (Ω), Supply Voltage V₀ (V) & Elapsed Time t (ms)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rl-ind2">Inductance L (mH)</label>
          <input class="tool-textarea" id="rl-ind2" type="number" step="50" value="250.0" placeholder="250.0 mH" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-res2">Resistance R (Ω)</label>
          <input class="tool-textarea" id="rl-res2" type="number" step="5" value="50.0" placeholder="50.0 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-v02">Supply V₀ (V)</label>
          <input class="tool-textarea" id="rl-v02" type="number" step="2" value="24.0" placeholder="24.0 V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-t2">Time t (ms)</label>
          <input class="tool-textarea" id="rl-t2" type="number" step="1" value="5.0" placeholder="5.0 ms" />
        </div>
      </div>
      <div id="rl-res-card2" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rl-res-tau2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Time Constant τ = 5.00 ms</span>
            <span class="stat-label">RL Inductive Time Constant (τ = L / R)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rl-res-it" style="color:var(--green-dark); font-weight:700;">Current I(t) = 0.303 A (63.2% Steady-State I_max = 0.480 A | Stored Energy U = 11.5 mJ)</span>
            <span class="stat-label">Instantaneous Current Growth & Stored Magnetic Energy</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('rl-ind2'), rEl = document.getElementById('rl-res2');
  const v0El = document.getElementById('rl-v02'), tEl = document.getElementById('rl-t2');
  const tauResEl = document.getElementById('rl-res-tau2'), itResEl = document.getElementById('rl-res-it');

  function update() {
    const L_mH = parseFloat(lEl.value), R = parseFloat(rEl.value);
    const V0 = parseFloat(v0El.value), t_ms = parseFloat(tEl.value);

    if (isNaN(L_mH) || isNaN(R) || isNaN(V0) || isNaN(t_ms) || L_mH <= 0 || R <= 0 || V0 <= 0 || t_ms < 0) return;

    const L = L_mH / 1000.0;
    const t_s = t_ms / 1000.0;

    // Time constant tau = L / R  [seconds]
    const tau_s = L / R;
    const tau_ms = tau_s * 1000.0;

    // Steady state maximum current I_max = V0 / R  [Amperes]
    const I_max = V0 / R;

    // Current growth: I(t) = I_max * ( 1 - exp(-t / tau) )
    const I_t = I_max * (1.0 - Math.exp(-t_s / tau_s));
    const pct_I = (I_t / I_max) * 100.0;

    // Stored magnetic energy: U = 0.5 * L * I^2  [Joules]
    const U_mJ = 0.5 * L * Math.pow(I_t, 2) * 1000.0;

    tauResEl.textContent = 'Time Constant τ = ' + (tau_ms >= 1000 ? (tau_ms/1000).toFixed(2) + ' s' : tau_ms.toFixed(2) + ' ms');
    itResEl.textContent = 'Current I(t) = ' + I_t.toFixed(3) + ' A (' + pct_I.toFixed(1) + '% I_max = ' + I_max.toFixed(3) + ' A | Energy U = ' + U_mJ.toFixed(1) + ' mJ @ t = ' + t_ms + ' ms)';
  }

  [lEl, rEl, v0El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter inductor inductance L in millihenries (mH).',
      'Enter circuit series resistance R in Ohms ($\Omega$).',
      'Enter DC driving voltage $V_0$ in Volts.',
      'Enter elapsed time t in milliseconds (ms).',
      'Inspect RL inductive time constant $\tau = L/R$, exponential current growth $I(t)$, and stored magnetic field energy.'
    ],
    benefitTitle: 'Joseph Henry 1832 Inductive Back-EMF Opposition',
    benefitContent: 'Inductors oppose instantaneous changes in electric current by generating a counter back-EMF ($\mathcal{E} = -L \frac{dI}{dt}$); in exactly 1 time constant ($\tau = L/R$), current reaches $63.2\%$ of maximum steady-state Ohm\'s law current ($V_0/R$).',
    faqs: [{ q: 'What causes inductive flyback voltage spikes when opening a circuit?', a: 'Attempting to instantly interrupt inductor current ($dt \rightarrow 0$) creates a huge back-EMF spike ($V = -L \frac{dI}{dt}$) that can spark switches or destroy transistors without a flyback snubber diode.' }]
  }
];

pack36Tools.forEach(createTool);
console.log('Pack 36 complete: 25 tools created.');
