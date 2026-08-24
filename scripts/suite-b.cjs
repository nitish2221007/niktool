const { createTool } = require('./generate-curated-tools.cjs');

// Suite B: 15 Tools in Orbital Mechanics, Astrophysics, Astronomy & Optics
const toolsSuiteB = [
  // 1. Orbital Velocity of Circular Satellite
  {
    slug: 'orbital-velocity-circular-satellite-calculator',
    name: 'Satellite Circular Orbital Velocity Calculator',
    description: 'Calculate circular orbital velocity (v = √(G·M / r)) and orbital period for Low Earth Orbit (LEO), GPS, and planetary satellites.',
    category: 'Science',
    icon: 'text',
    keywords: ['orbital velocity calculator', 'satellite orbital speed calculator', 'circular orbit velocity formula', 'leo satellite speed calculator', 'spaceflight orbital mechanics'],
    order: 189,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Satellite Altitude Above Earth',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="orb-alt">Orbit Altitude Above Surface (km)</label>
        <input class="tool-textarea" id="orb-alt" type="number" step="any" value="400" placeholder="400 km (ISS Orbit)" />
      </div>
      <div id="orb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="orb-res-vel" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7.67 km/s</span>
            <span class="stat-label">Circular Orbital Velocity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="orb-res-kmh">27,612 km/h</span>
            <span class="stat-label">Speed in km/h</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="orb-res-period">92.56 Minutes</span>
            <span class="stat-label">Orbital Period (1 Full Orbit)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const altEl = document.getElementById('orb-alt');
  const velEl = document.getElementById('orb-res-vel'), kmhEl = document.getElementById('orb-res-kmh'), perEl = document.getElementById('orb-res-period');

  const G = 6.6743e-11;
  const M_EARTH = 5.9722e24; // kg
  const R_EARTH = 6371e3; // meters

  function update() {
    const altKm = parseFloat(altEl.value);
    if (isNaN(altKm) || altKm < 0) return;

    const r = R_EARTH + (altKm * 1000);
    // v = sqrt(G * M / r)
    const vMs = Math.sqrt((G * M_EARTH) / r);
    const vKms = vMs / 1000;
    const vKmh = vKms * 3600;
    // T = 2 * pi * r / v
    const tSec = (2 * Math.PI * r) / vMs;
    const tMin = tSec / 60;

    velEl.textContent = vKms.toFixed(2) + ' km/s';
    kmhEl.textContent = Math.round(vKmh).toLocaleString() + ' km/h';
    perEl.textContent = tMin >= 120 ? (tMin / 60).toFixed(2) + ' Hours' : tMin.toFixed(2) + ' Minutes';
  }

  altEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter satellite orbital altitude above Earth\'s surface in kilometers (e.g. 400 km for ISS, 20,200 km for GPS).',
      'Inspect circular orbital velocity (km/s and km/h) and period required for a complete orbit.'
    ],
    benefitTitle: 'Balance of Gravity and Centripetal Acceleration',
    benefitContent: 'A satellite in orbit is in continuous freefall toward Earth, but its horizontal tangential velocity (v = √(GM/r)) ensures the surface curves away beneath it at the exact same rate.',
    faqs: [{ q: 'What is the orbital speed of the International Space Station (ISS)?', a: 'At an altitude of ~400 km, the ISS orbits Earth at approximately 7.67 km/s (27,600 km/h), completing an orbit every 92 minutes.' }]
  },

  // 2. Schwarzschild Black Hole Event Horizon Calculator
  {
    slug: 'schwarzschild-black-hole-radius-calculator',
    name: 'Schwarzschild Black Hole Radius Calculator',
    description: 'Calculate the Schwarzschild event horizon radius (r_s = 2GM / c²) and density required to collapse any mass into a black hole singularity.',
    category: 'Science',
    icon: 'text',
    keywords: ['schwarzschild radius calculator', 'black hole radius calculator', 'event horizon radius formula', 'astrophysics black hole mass calculator', 'gravitational singularity radius online'],
    order: 190,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Celestial Body Mass Input',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="bh-preset">Select Body Mass Preset:</label>
        <select class="tool-textarea" id="bh-preset">
          <option value="earth">Earth (5.97 × 10²⁴ kg)</option>
          <option value="sun" selected>Sun (1.989 × 10³⁰ kg - 1 Solar Mass)</option>
          <option value="sag_a">Sagittarius A* (4.15 Million Solar Masses)</option>
          <option value="m87">M87* Supermassive Black Hole (6.5 Billion Solar Masses)</option>
        </select>
      </div>
      <div id="bh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bh-res-rs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.95 km</span>
            <span class="stat-label">Schwarzschild Event Horizon Radius (r_s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bh-res-dia">5.91 km</span>
            <span class="stat-label">Event Horizon Diameter</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const preEl = document.getElementById('bh-preset');
  const rsEl = document.getElementById('bh-res-rs'), diaEl = document.getElementById('bh-res-dia');

  const G = 6.6743e-11;
  const c = 299792458;
  const M_SUN = 1.98847e30;

  const MASSES = {
    earth: 5.9722e24,
    sun: M_SUN,
    sag_a: 4.15e6 * M_SUN,
    m87: 6.5e9 * M_SUN
  };

  function update() {
    const m = MASSES[preEl.value] || M_SUN;
    // r_s = (2 * G * M) / c^2
    const rs = (2 * G * m) / Math.pow(c, 2);
    const dia = rs * 2;

    if (rs < 0.01) {
      rsEl.textContent = (rs * 1000).toFixed(2) + ' mm';
      diaEl.textContent = (dia * 1000).toFixed(2) + ' mm';
    } else if (rs < 1000) {
      rsEl.textContent = rs.toFixed(2) + ' meters';
      diaEl.textContent = dia.toFixed(2) + ' meters';
    } else if (rs < 1e6) {
      rsEl.textContent = (rs / 1000).toFixed(2) + ' km';
      diaEl.textContent = (dia / 1000).toFixed(2) + ' km';
    } else {
      rsEl.textContent = (rs / 1.496e11).toFixed(2) + ' AU (' + (rs / 1e9).toFixed(2) + ' Million km)';
      diaEl.textContent = (dia / 1.496e11).toFixed(2) + ' AU';
    }
  }

  preEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select a celestial mass preset (Earth, Sun, Sagittarius A*, or M87*).',
      'Inspect the physical radius to which that mass must be compressed for gravity to prevent even light from escaping.'
    ],
    benefitTitle: 'General Relativity and Karl Schwarzschild',
    benefitContent: 'Karl Schwarzschild solved Einstein\'s field equations in 1916 while serving on the Russian front in World War I, discovering that any mass compressed inside r_s = 2GM/c² collapses inevitably into a gravitational singularity.',
    faqs: [{ q: 'What size would Earth be as a black hole?', a: 'To become a black hole, Earth\'s entire mass would have to be squeezed into a sphere roughly the size of a marble (radius ~8.87 mm).' }]
  },

  // 3. Gravitational Time Dilation General Relativity Calculator
  {
    slug: 'gravitational-time-dilation-calculator',
    name: 'Gravitational Time Dilation Calculator',
    description: 'Calculate Einstein\'s general relativistic time dilation (tf = t₀ · √(1 - 2GM / (r·c²))) in gravitational fields near planets, white dwarfs, and neutron stars.',
    category: 'Science',
    icon: 'text',
    keywords: ['gravitational time dilation calculator', 'general relativity time dilation', 'gravity clock slowing calculator', 'black hole time dilation online', 'einstein gravity time formula'],
    order: 191,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Gravitational Body Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gtd-body">Mass Preset</label>
          <select class="tool-textarea" id="gtd-body">
            <option value="earth" selected>Earth Surface (6,371 km)</option>
            <option value="sun">Sun Surface (696,340 km)</option>
            <option value="white_dwarf">White Dwarf (1 M_sun, 7,000 km)</option>
            <option value="neutron_star">Neutron Star (1.4 M_sun, 12 km)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="gtd-time">Time Elapsed in Deep Space (Years)</label>
          <input class="tool-textarea" id="gtd-time" type="number" step="any" value="1.0" placeholder="1.0" />
        </div>
      </div>
      <div id="gtd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gtd-res-local" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.9999999993 yrs</span>
            <span class="stat-label">Time Elapsed in Gravitational Well</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gtd-res-offset" style="color:#c53030;">-21.9 ms / yr</span>
            <span class="stat-label">Clock Slowing Offset per Year</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('gtd-body'), tEl = document.getElementById('gtd-time');
  const locEl = document.getElementById('gtd-res-local'), offEl = document.getElementById('gtd-res-offset');

  const G = 6.6743e-11;
  const c = 299792458;
  const M_SUN = 1.98847e30;

  const PRESETS = {
    earth: { m: 5.9722e24, r: 6371e3 },
    sun: { m: M_SUN, r: 696340e3 },
    white_dwarf: { m: M_SUN, r: 7000e3 },
    neutron_star: { m: 1.4 * M_SUN, r: 12e3 }
  };

  function update() {
    const body = PRESETS[bEl.value] || PRESETS.earth;
    const tInf = parseFloat(tEl.value);
    if (isNaN(tInf) || tInf <= 0) return;

    // factor = sqrt(1 - 2*G*M / (r * c^2))
    const rs = (2 * G * body.m) / Math.pow(c, 2);
    if (rs >= body.r) return;

    const factor = Math.sqrt(1 - (rs / body.r));
    const tLocal = tInf * factor;
    const diffSecPerYear = (1 - factor) * 31557600;

    locEl.textContent = (tLocal).toFixed(8) + ' Years';
    if (diffSecPerYear < 1) {
      offEl.textContent = '-' + (diffSecPerYear * 1000).toFixed(1) + ' ms / yr';
    } else {
      offEl.textContent = '-' + (diffSecPerYear).toFixed(2) + ' seconds / yr';
    }
  }

  bEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select gravitational mass preset (Earth, Sun, White Dwarf, or extreme Neutron Star).',
      'Inspect how much slower clocks tick in strong gravitational wells compared to flat outer space.'
    ],
    benefitTitle: 'General Relativity in Everyday GPS',
    benefitContent: 'Clocks deeper in a gravitational well tick slower. GPS satellites at 20,200 km experience weaker Earth gravity, causing their atomic clocks to gain +45.9 microseconds per day relative to Earth\'s surface.',
    faqs: [{ q: 'Why did 1 hour equal 7 years on Miller\'s Planet in Interstellar?', a: 'Miller\'s planet orbited exceptionally close to the event horizon of the supermassive black hole Gargantua, producing an extreme gravitational time dilation factor of ~61,320.' }]
  },

  // 4. Stellar Apparent vs Absolute Magnitude & Distance Modulus Calculator
  {
    slug: 'apparent-absolute-magnitude-astronomy-calculator',
    name: 'Apparent & Absolute Magnitude Distance Calculator',
    description: 'Calculate astronomical distance (in Parsecs and Light-Years) from apparent magnitude (m) and absolute magnitude (M) using the distance modulus equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['apparent magnitude calculator', 'absolute magnitude distance modulus', 'astronomy star distance calculator', 'parsecs light years distance modulus', 'star brightness calculator online'],
    order: 192,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Star Magnitudes (m and M)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mag-app">Apparent Magnitude (m)</label>
          <input class="tool-textarea" id="mag-app" type="number" step="any" value="-1.46" placeholder="-1.46 (Sirius)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mag-abs">Absolute Magnitude (M)</label>
          <input class="tool-textarea" id="mag-abs" type="number" step="any" value="1.42" placeholder="1.42 (Sirius)" />
        </div>
      </div>
      <div id="mag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mag-res-pc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">2.64 Parsecs</span>
            <span class="stat-label">Calculated Star Distance</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mag-res-ly" style="font-weight:700;">8.61 Light-Years</span>
            <span class="stat-label">Distance in Light-Years</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mag-res-mod">-2.88 mag</span>
            <span class="stat-label">Distance Modulus (m - M)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('mag-app'), MEl = document.getElementById('mag-abs');
  const pcEl = document.getElementById('mag-res-pc'), lyEl = document.getElementById('mag-res-ly'), modEl = document.getElementById('mag-res-mod');

  function update() {
    const m = parseFloat(mEl.value), M = parseFloat(MEl.value);
    if (isNaN(m) || isNaN(M)) return;

    // m - M = 5 * log10(d_pc) - 5 => d_pc = 10^((m - M + 5) / 5)
    const dm = m - M;
    const dPc = Math.pow(10, (dm + 5) / 5);
    const dLy = dPc * 3.26156;

    pcEl.textContent = dPc >= 1000 ? (dPc / 1000).toFixed(2) + ' kpc' : dPc.toFixed(2) + ' Parsecs';
    lyEl.textContent = dLy >= 1e6 ? (dLy / 1e6).toFixed(2) + ' Million ly' : dLy.toFixed(2) + ' Light-Years';
    modEl.textContent = dm.toFixed(2) + ' mag';
  }

  mEl.addEventListener('input', update);
  MEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter apparent visual magnitude (m) observed from Earth.',
      'Enter absolute intrinsic magnitude (M) measured at standard 10 parsecs.',
      'Inspect true astronomical distance in Parsecs and Light-Years.'
    ],
    benefitTitle: 'The Astronomical Logarithmic Magnitude Scale',
    benefitContent: 'Hipparchus established the magnitude scale where a difference of 5 magnitudes corresponds to exactly a 100-fold difference in optical photon brightness.',
    faqs: [{ q: 'What is absolute magnitude M?', a: 'Absolute magnitude is how bright a celestial star would appear if placed at a standard reference distance of exactly 10 Parsecs (32.6 Light-Years).' }]
  },

  // 5. Thin Lens Equation & Magnification Calculator
  {
    slug: 'thin-lens-magnification-calculator',
    name: 'Thin Lens Equation & Magnification Calculator',
    description: 'Calculate image distance (1/f = 1/dₒ + 1/dᵢ), linear optical magnification (m = -dᵢ/dₒ), and real vs virtual image orientation for lenses.',
    category: 'Science',
    icon: 'text',
    keywords: ['thin lens equation calculator', 'lens magnification calculator', 'focal length image distance formula', 'optics lens maker calculator', 'convex concave lens online calculator'],
    order: 193,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Focal Length & Object Distance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lens-f">Focal Length f (cm) [Positive for Convex]</label>
          <input class="tool-textarea" id="lens-f" type="number" step="any" value="10" placeholder="+10 cm (Convex)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lens-do">Object Distance dₒ (cm)</label>
          <input class="tool-textarea" id="lens-do" type="number" step="any" value="25" placeholder="25 cm" />
        </div>
      </div>
      <div id="lens-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lens-res-di" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">+16.67 cm</span>
            <span class="stat-label">Image Distance (dᵢ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lens-res-mag" style="font-weight:700;">-0.67x</span>
            <span class="stat-label">Magnification (m = -dᵢ/dₒ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lens-res-type">Real &amp; Inverted</span>
            <span class="stat-label">Image Character</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('lens-f'), doEl = document.getElementById('lens-do');
  const diEl = document.getElementById('lens-res-di'), magEl = document.getElementById('lens-res-mag'), typeEl = document.getElementById('lens-res-type');

  function update() {
    const f = parseFloat(fEl.value), dO = parseFloat(doEl.value);
    if (isNaN(f) || isNaN(dO) || f === 0 || dO <= 0 || f === dO) return;

    // 1/f = 1/do + 1/di => 1/di = 1/f - 1/do = (do - f) / (f * do) => di = (f * do) / (do - f)
    const dI = (f * dO) / (dO - f);
    const m = -dI / dO;

    diEl.textContent = (dI >= 0 ? '+' : '') + dI.toFixed(2) + ' cm';
    magEl.textContent = m.toFixed(2) + 'x';

    if (dI > 0) {
      typeEl.textContent = 'Real & Inverted (Projectable onto screen)';
      typeEl.style.color = '#22543d';
    } else {
      typeEl.textContent = 'Virtual & Upright (Magnified eyepiece view)';
      typeEl.style.color = '#2563eb';
    }
  }

  fEl.addEventListener('input', update);
  doEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter lens focal length f in cm (positive for converging convex lenses, negative for diverging concave lenses).',
      'Enter object distance dₒ from the lens.',
      'Inspect the formed image distance (dᵢ), magnification factor, and whether the image is real or virtual.'
    ],
    benefitTitle: 'Gaussian Lens Formula',
    benefitContent: 'The thin lens equation 1/f = 1/dₒ + 1/dᵢ accurately predicts focal behavior when lens thickness is negligible compared to surface radii of curvature.',
    faqs: [{ q: 'What happens when an object is placed inside the focal length (dₒ < f)?', a: 'A magnifying glass effect occurs: a virtual, upright, and enlarged image forms behind the object.' }]
  }
];

toolsSuiteB.forEach(createTool);
console.log('Suite B complete: 5 tools created.');
