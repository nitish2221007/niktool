const { createTool } = require('./generate-curated-tools.cjs');

const toolsBatch8 = [
  // 1. Planetary Weight Calculator
  {
    slug: 'planetary-weight-calculator',
    name: 'Planetary Weight Calculator',
    description: 'Calculate your exact weight and gravitational acceleration on the Moon, Mars, Jupiter, Venus, Saturn, Mercury, and Pluto.',
    category: 'Science',
    icon: 'text',
    keywords: ['planetary weight calculator', 'weight on other planets', 'weight on mars calculator', 'weight on the moon calculator', 'gravity on planets calculator'],
    order: 89,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Earth Weight Input',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="planet-earth-wt">Your Weight on Earth (kg or lbs)</label>
        <input class="tool-textarea" id="planet-earth-wt" type="number" step="any" value="70" placeholder="e.g. 70 kg or 150 lbs" />
      </div>
      <div id="planet-res-card" style="margin-top:1.25rem;">
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:0.75rem;">
          <div class="stat"><span class="stat-value" id="pw-moon">-</span><span class="stat-label">Moon (0.166g)</span></div>
          <div class="stat"><span class="stat-value" id="pw-mars">-</span><span class="stat-label">Mars (0.379g)</span></div>
          <div class="stat"><span class="stat-value" id="pw-venus">-</span><span class="stat-label">Venus (0.907g)</span></div>
          <div class="stat"><span class="stat-value" id="pw-jupiter" style="color:#c53030;">-</span><span class="stat-label">Jupiter (2.528g)</span></div>
          <div class="stat"><span class="stat-value" id="pw-saturn">-</span><span class="stat-label">Saturn (1.065g)</span></div>
          <div class="stat"><span class="stat-value" id="pw-mercury">-</span><span class="stat-label">Mercury (0.378g)</span></div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wtEl = document.getElementById('planet-earth-wt');
  const moonEl = document.getElementById('pw-moon'), marsEl = document.getElementById('pw-mars'), venusEl = document.getElementById('pw-venus');
  const jupEl = document.getElementById('pw-jupiter'), satEl = document.getElementById('pw-saturn'), mercEl = document.getElementById('pw-mercury');

  const GRAVITY = {
    moon: 0.166, mars: 0.379, venus: 0.907,
    jupiter: 2.528, saturn: 1.065, mercury: 0.378
  };

  function update() {
    const w = parseFloat(wtEl.value);
    if (isNaN(w) || w <= 0) return;

    moonEl.textContent = (w * GRAVITY.moon).toFixed(1);
    marsEl.textContent = (w * GRAVITY.mars).toFixed(1);
    venusEl.textContent = (w * GRAVITY.venus).toFixed(1);
    jupEl.textContent = (w * GRAVITY.jupiter).toFixed(1);
    satEl.textContent = (w * GRAVITY.saturn).toFixed(1);
    mercEl.textContent = (w * GRAVITY.mercury).toFixed(1);
  }

  wtEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter your body weight (in kg or lbs).',
      'Instantly view your equivalent weight across the Solar System based on each celestial body\'s surface gravity.'
    ],
    benefitTitle: 'Mass vs Weight in Astronomy',
    benefitContent: 'Your mass (the quantity of matter in your body) remains constant anywhere in the universe. Weight is the downward gravitational force (W = m · g) exerted by the celestial mass beneath you.',
    faqs: [
      { q: 'Why do you weigh less on the Moon?', a: 'The Moon has roughly 1/81 of Earth\'s mass, producing surface gravity that is only 16.6% (1/6th) of Earth\'s gravity.' }
    ]
  },

  // 2. Wire Gauge Voltage Drop Calculator
  {
    slug: 'wire-gauge-voltage-drop-calculator',
    name: 'Wire Gauge & Voltage Drop Calculator',
    description: 'Calculate copper wire electrical resistance, percentage voltage drop, and power loss for DC and single-phase AC circuits.',
    category: 'Science',
    icon: 'text',
    keywords: ['wire gauge voltage drop calculator', 'awg voltage drop calculator', 'copper wire resistance calculator', 'cable size voltage drop', 'dc voltage drop online'],
    order: 90,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Electrical Conductor Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="wire-v">Source Voltage (Volts)</label>
          <input class="tool-textarea" id="wire-v" type="number" step="any" value="12" placeholder="e.g. 12V or 120V" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wire-i">Current Load (Amperes)</label>
          <input class="tool-textarea" id="wire-i" type="number" step="any" value="10" placeholder="e.g. 10 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wire-len">One-Way Distance (meters)</label>
          <input class="tool-textarea" id="wire-len" type="number" step="any" value="15" placeholder="e.g. 15 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="wire-awg">American Wire Gauge (AWG)</label>
          <select class="tool-textarea" id="wire-awg">
            <option value="18">18 AWG (0.823 mm²)</option>
            <option value="16">16 AWG (1.31 mm²)</option>
            <option value="14">14 AWG (2.08 mm²)</option>
            <option value="12" selected>12 AWG (3.31 mm²)</option>
            <option value="10">10 AWG (5.26 mm²)</option>
            <option value="8">8 AWG (8.37 mm²)</option>
            <option value="6">6 AWG (13.3 mm²)</option>
            <option value="4">4 AWG (21.2 mm²)</option>
          </select>
        </div>
      </div>
      <div id="wire-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wire-res-drop-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Total Voltage Drop (V)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wire-res-drop-pct" style="font-weight:700;">-</span>
            <span class="stat-label">Percentage Drop (%)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wire-res-v-end">-</span>
            <span class="stat-label">Voltage at Load End</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('wire-v'), iEl = document.getElementById('wire-i');
  const lenEl = document.getElementById('wire-len'), awgEl = document.getElementById('wire-awg');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('wire-res-card');
  const resV = document.getElementById('wire-res-drop-v'), resPct = document.getElementById('wire-res-drop-pct'), resEnd = document.getElementById('wire-res-v-end');

  // Resistance in Ohms per 1000 meters for copper at 20°C
  const AWG_RES = {
    18: 20.95, 16: 13.17, 14: 8.286, 12: 5.211,
    10: 3.277, 8: 2.061, 6: 1.296, 4: 0.8152
  };

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const v = parseFloat(vEl.value);
    const i = parseFloat(iEl.value);
    const lenM = parseFloat(lenEl.value);
    const awg = parseInt(awgEl.value, 10);

    if (isNaN(v) || isNaN(i) || isNaN(lenM) || v <= 0 || i <= 0 || lenM <= 0) {
      setMsg('Please enter valid positive numbers for voltage, current, and wire distance.', true);
      resCard.style.display = 'none'; return;
    }

    // Round-trip wire distance is 2 * lenM
    const rPerKm = AWG_RES[awg] || 5.211;
    const totalR = (rPerKm / 1000) * (2 * lenM);
    const dropV = i * totalR;
    const dropPct = (dropV / v) * 100;
    const loadV = v - dropV;

    resV.textContent = dropV.toFixed(2) + ' Volts';
    resPct.textContent = dropPct.toFixed(2) + '%';
    resPct.style.color = dropPct <= 3.0 ? '#22543d' : (dropPct <= 5.0 ? '#d97706' : '#c53030');
    resEnd.textContent = loadV.toFixed(2) + ' Volts';

    resCard.style.display = 'block';
    setMsg('Voltage drop calculated.');
  });

  clearBtn.addEventListener('click', () => {
    vEl.value = '12'; iEl.value = '10'; lenEl.value = '15'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the source supply voltage (e.g. 12V DC automotive/solar or 120V/230V AC).',
      'Enter the operating circuit current in Amperes.',
      'Enter the one-way cable run distance in meters.',
      'Select your conductor AWG gauge.',
      'Click <strong>Calculate</strong> to verify if voltage drop stays within the recommended 3% threshold.'
    ],
    benefitTitle: 'NEC Voltage Drop Recommendations',
    benefitContent: 'The National Electrical Code (NEC) recommends a maximum voltage drop of 3% for branch circuits and 5% for combined feeder and branch circuits to prevent equipment malfunction and overheating.',
    faqs: [
      { q: 'How to reduce excessive voltage drop?', a: 'Increase the wire conductor thickness (choose a thicker gauge with a lower AWG number) or shorten the circuit run length.' }
    ]
  },

  // 3. Sound Wavelength & Frequency Calculator
  {
    slug: 'sound-wavelength-frequency-calculator',
    name: 'Sound Wavelength & Frequency Calculator',
    description: 'Calculate acoustic sound wavelength (λ), audio frequency (f), and period (T) based on air temperature and speed of sound.',
    category: 'Science',
    icon: 'text',
    keywords: ['sound wavelength calculator', 'speed of sound wavelength', 'acoustic frequency wavelength', 'wavelength of sound in air', 'audio wavelength calculator'],
    order: 91,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Acoustic Frequency & Temperature',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ac-freq">Audio Frequency (Hz)</label>
          <input class="tool-textarea" id="ac-freq" type="number" step="any" value="440" placeholder="e.g. 440 Hz (Concert A)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ac-temp">Air Temperature (°C)</label>
          <input class="tool-textarea" id="ac-temp" type="number" step="any" value="20" placeholder="20 °C" />
        </div>
      </div>
      <div id="ac-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ac-res-lambda" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Wavelength (λ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ac-res-speed" style="font-weight:700;">-</span>
            <span class="stat-label">Speed of Sound in Air (c)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ac-res-period">-</span>
            <span class="stat-label">Wave Period (T = 1/f)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('ac-freq'), tEl = document.getElementById('ac-temp');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('ac-res-card');
  const resL = document.getElementById('ac-res-lambda'), resS = document.getElementById('ac-res-speed'), resP = document.getElementById('ac-res-period');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const f = parseFloat(fEl.value);
    const t = parseFloat(tEl.value);

    if (isNaN(f) || isNaN(t) || f <= 0) {
      setMsg('Please enter a positive frequency value.', true);
      resCard.style.display = 'none'; return;
    }

    // Speed of sound in dry air: c ≈ 331.3 + 0.606 * T (°C)
    const c = 331.3 + 0.606 * t;
    const lambda = c / f;
    const periodMs = (1 / f) * 1000;

    resL.textContent = lambda >= 1 ? lambda.toFixed(3) + ' meters' : (lambda * 100).toFixed(2) + ' cm';
    resS.textContent = c.toFixed(1) + ' m/s (' + (c * 3.6).toFixed(1) + ' km/h)';
    resP.textContent = periodMs.toFixed(3) + ' ms';

    resCard.style.display = 'block';
    setMsg('Acoustic wave parameters calculated.');
  });

  clearBtn.addEventListener('click', () => {
    fEl.value = '440'; tEl.value = '20'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the sound or musical frequency in Hertz (e.g. 440 Hz for Concert Pitch A4).',
      'Enter the ambient room temperature in Celsius.',
      'Click <strong>Calculate</strong> to inspect the acoustic physical wavelength and period.'
    ],
    benefitTitle: 'Acoustic Wave Physics',
    benefitContent: 'Sound is a mechanical pressure wave whose propagation speed in gases depends on absolute temperature: c ≈ 331.3 + 0.606 × T. Lower frequencies produce physically massive waves (e.g. a 20 Hz bass wave is over 17 meters long).',
    faqs: [
      { q: 'What is the speed of sound at 20 °C?', a: 'At 20 °C (68 °F), the speed of sound in dry air is approximately 343.4 meters per second (1,236 km/h).' }
    ]
  },

  // 4. Planetary Escape Velocity Calculator
  {
    slug: 'escape-velocity-calculator',
    name: 'Planetary Escape Velocity Calculator',
    description: 'Calculate the minimum escape velocity (ve = √(2GM/R)) required to break free from the gravitational pull of planets, stars, and celestial bodies.',
    category: 'Science',
    icon: 'text',
    keywords: ['escape velocity calculator', 'planetary escape velocity', 'gravitational escape velocity', 'orbital escape speed calculator', 'astrophysics escape velocity'],
    order: 92,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Celestial Body Presets & Custom Mass',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="esc-preset">Select Celestial Body Preset:</label>
        <select class="tool-textarea" id="esc-preset">
          <option value="earth" selected>Earth (5.972 × 10²⁴ kg, 6,371 km)</option>
          <option value="moon">Moon (7.342 × 10²² kg, 1,737 km)</option>
          <option value="mars">Mars (6.417 × 10²³ kg, 3,389 km)</option>
          <option value="jupiter">Jupiter (1.898 × 10²⁷ kg, 69,911 km)</option>
          <option value="sun">Sun (1.989 × 10³⁰ kg, 696,340 km)</option>
        </select>
      </div>
      <div id="esc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="esc-res-kms" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">11.19 km/s</span>
            <span class="stat-label">Escape Velocity (km/s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="esc-res-kmh">40,270 km/h</span>
            <span class="stat-label">Speed in km/h</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="esc-res-mph">25,022 mph</span>
            <span class="stat-label">Speed in mph</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const preEl = document.getElementById('esc-preset');
  const kmsEl = document.getElementById('esc-res-kms'), kmhEl = document.getElementById('esc-res-kmh'), mphEl = document.getElementById('esc-res-mph');

  const BODIES = {
    earth: { m: 5.9722e24, r: 6.371e6 },
    moon: { m: 7.342e22, r: 1.737e6 },
    mars: { m: 6.417e23, r: 3.389e6 },
    jupiter: { m: 1.898e27, r: 6.9911e7 },
    sun: { m: 1.989e30, r: 6.9634e8 }
  };

  const G = 6.67430e-11;

  function update() {
    const body = BODIES[preEl.value] || BODIES.earth;
    // ve = sqrt(2 * G * M / R)
    const ve = Math.sqrt((2 * G * body.m) / body.r);
    const veKms = ve / 1000;
    const veKmh = veKms * 3600;
    const veMph = veKmh * 0.621371;

    kmsEl.textContent = veKms.toFixed(2) + ' km/s';
    kmhEl.textContent = Math.round(veKmh).toLocaleString() + ' km/h';
    mphEl.textContent = Math.round(veMph).toLocaleString() + ' mph';
  }

  preEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select a celestial body from the solar system preset dropdown.',
      'Inspect the escape velocity in km/s, km/h, and mph.'
    ],
    benefitTitle: 'Escape Velocity Derivation',
    benefitContent: 'Escape velocity is the speed at which the kinetic energy of an unpropelled ballistic projectile equals its gravitational potential energy (1/2 m v² = G M m / r), giving v = √(2GM/r).',
    faqs: [
      { q: 'What is Earth\'s escape velocity?', a: 'From Earth\'s surface, escape velocity is approximately 11.19 km/s (roughly 40,270 km/h or Mach 33).' }
    ]
  },

  // 5. RF Wireless Link Fresnel Zone Calculator
  {
    slug: 'fresnel-zone-calculator',
    name: 'Fresnel Zone & Wireless Clearance Calculator',
    description: 'Calculate the first Fresnel zone radius (F1) and required line-of-sight obstacle clearance for Wi-Fi and point-to-point RF microwave links.',
    category: 'Science',
    icon: 'text',
    keywords: ['fresnel zone calculator', 'wireless link clearance calculator', 'rf fresnel zone radius', 'wifi line of sight calculator', 'microwave link clearance'],
    order: 93,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Radio Frequency & Link Distance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rf-freq">Frequency (GHz)</label>
          <input class="tool-textarea" id="rf-freq" type="number" step="any" value="5.8" placeholder="e.g. 2.4 or 5.8 GHz" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rf-dist">Total Link Distance (km)</label>
          <input class="tool-textarea" id="rf-dist" type="number" step="any" value="5.0" placeholder="e.g. 5 km" />
        </div>
      </div>
      <div id="rf-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rf-res-radius" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Max 1st Fresnel Radius (Midpoint)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rf-res-clearance" style="font-weight:700;">-</span>
            <span class="stat-label">60% Clearance Required</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('rf-freq'), dEl = document.getElementById('rf-dist');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('rf-res-card');
  const resR = document.getElementById('rf-res-radius'), resC = document.getElementById('rf-res-clearance');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const fGhz = parseFloat(fEl.value);
    const dKm = parseFloat(dEl.value);

    if (isNaN(fGhz) || isNaN(dKm) || fGhz <= 0 || dKm <= 0) {
      setMsg('Please enter positive numbers for frequency and link distance.', true);
      resCard.style.display = 'none'; return;
    }

    // Midpoint Fresnel Radius: r (meters) = 8.657 * sqrt(d_km / f_GHz)
    const rMeters = 8.657 * Math.sqrt(dKm / fGhz);
    const c60 = rMeters * 0.60;

    resR.textContent = rMeters.toFixed(2) + ' meters';
    resC.textContent = c60.toFixed(2) + ' meters';

    resCard.style.display = 'block';
    setMsg('Fresnel clearance calculated.');
  });

  clearBtn.addEventListener('click', () => {
    fEl.value = '5.8'; dEl.value = '5.0'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the wireless link carrier frequency in GHz (e.g. 2.4 GHz, 5.8 GHz, or 60 GHz).',
      'Enter the total line-of-sight distance between transmitter and receiver towers in kilometers.',
      'Click <strong>Calculate</strong> to inspect the required obstacle clearance radius.'
    ],
    benefitTitle: 'Why 60% Fresnel Clearance Matters',
    benefitContent: 'For long-range point-to-point Wi-Fi and microwave links, trees, terrain, and buildings must not intrude into at least 60% of the 1st Fresnel zone ellipsoid to prevent phase cancellation and severe signal attenuation.',
    faqs: [
      { q: 'What happens if Fresnel zone is partially blocked?', a: 'Obstructions penetrating more than 40% of the first Fresnel zone cause destructive multipath interference, drastically degrading wireless throughput.' }
    ]
  }
];

toolsBatch8.forEach(createTool);
console.log('Batch 8 complete.');
