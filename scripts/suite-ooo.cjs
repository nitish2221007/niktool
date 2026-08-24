const { createTool } = require('./generate-curated-tools.cjs');

// Suite OOO: 5 Tools in Astrophysics, Black Hole Mechanics, Cosmology & General Relativity to reach 645 tools
const toolsSuiteOOO = [
  // 1. Schwarzschild Radius & Black Hole Event Horizon Calculator
  {
    slug: 'schwarzschild-radius-black-hole-calculator',
    name: 'Schwarzschild Radius (Black Hole Event Horizon) Calculator',
    description: 'Calculate the Schwarzschild event horizon radius (R_s = (2 · G · M) / c²) in kilometers, miles, and AU for stellar, intermediate, and supermassive black holes.',
    category: 'Science',
    icon: 'text',
    keywords: ['schwarzschild radius calculator', 'black hole event horizon formula', 'rs 2gm over c squared online', 'supermassive black hole radius calculator', 'karl schwarzschild general relativity calculator'],
    order: 518,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Black Hole Mass (Solar Masses M_☉ or kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bh-mass">Mass in Solar Masses (M_☉)</label>
          <input class="tool-textarea" id="bh-mass" type="number" step="any" value="4150000" placeholder="4.15 Million M_☉ (Sagittarius A* Milky Way)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bh-type">Black Hole Class</label>
          <select class="tool-textarea" id="bh-type">
            <option value="custom" selected>Custom Solar Masses</option>
            <option value="1">1.0 M_☉ (Hypothetical Solar Mass)</option>
            <option value="10">10 M_☉ (Cygnus X-1 Stellar Mass)</option>
            <option value="4150000">4.15M M_☉ (Sagittarius A* Milky Way Center)</option>
            <option value="6500000000">6.5B M_☉ (M87* Supermassive Event Horizon)</option>
          </select>
        </div>
      </div>
      <div id="bh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bh-res-rs" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">12.26 Million km</span>
            <span class="stat-label">Schwarzschild Event Horizon Radius (R_s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bh-res-au" style="font-weight:700;">0.082 AU (7.62 Million Miles)</span>
            <span class="stat-label">Astronomical Units / Earth-Sun Scale</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('bh-mass'), tEl = document.getElementById('bh-type');
  const rsResEl = document.getElementById('bh-res-rs'), auResEl = document.getElementById('bh-res-au');

  // G = 6.67430e-11, c = 2.99792458e8, M_sun = 1.98847e30 kg
  // R_s (meters) = (2 * G * M_kg) / c^2
  // R_s per solar mass = (2 * 6.67430e-11 * 1.98847e30) / (2.99792458e8)^2 ≈ 2953.25 meters = 2.953 km / M_sun

  function update() {
    const mSolar = parseFloat(mEl.value);
    if (isNaN(mSolar) || mSolar <= 0) return;

    const rsKm = mSolar * 2.95325;
    const rsMiles = rsKm * 0.621371;
    const rsAu = rsKm / 1.495978707e8;

    if (rsKm > 1e6) {
      rsResEl.textContent = (rsKm / 1e6).toFixed(2) + ' Million km (Event Horizon Radius)';
    } else {
      rsResEl.textContent = rsKm.toFixed(2) + ' km (' + rsMiles.toFixed(2) + ' Miles)';
    }

    auResEl.textContent = rsAu.toFixed(4) + ' AU (' + (rsKm > 1e6 ? (rsMiles / 1e6).toFixed(2) + ' Million Miles' : rsMiles.toFixed(1) + ' Miles)');
  }

  tEl.addEventListener('change', () => {
    if (tEl.value !== 'custom') {
      mEl.value = tEl.value;
      update();
    }
  });

  mEl.addEventListener('input', () => {
    tEl.value = 'custom';
    update();
  });

  update();
})();`,
    howToSteps: [
      'Enter black hole mass in multiples of our Sun\'s mass ($M_\\odot = 1.989 \\times 10^{30}\\text{ kg}$).',
      'Or select astronomical presets (Sagittarius A* Milky Way center, M87* supermassive black hole).',
      'Inspect Schwarzschild radius $R_s$ in kilometers, miles, and Astronomical Units (AU).'
    ],
    benefitTitle: 'Karl Schwarzschild\'s 1916 Exact Einstein Solution',
    benefitContent: 'Schwarzschild derived the exact geometric radius where escape velocity equals the speed of light ($R_s = 2GM/c^2 = 2.953\\text{ km per solar mass}$); within this boundary, spacetime bends so steeply that nothing—not even light—can ever escape.',
    faqs: [{ q: 'What is the Schwarzschild radius of Earth?', a: 'If Earth\'s entire mass were compressed into a black hole, its Schwarzschild radius would be only 8.87 millimeters (the size of a marble).' }]
  },

  // 2. Hubble-Lemaître Law Cosmic Expansion & Redshift Calculator
  {
    slug: 'hubble-lemaitre-law-cosmic-expansion-calculator',
    name: 'Hubble-Lemaître Law Cosmic Expansion & Recession Velocity Calculator',
    description: 'Calculate galactic recession velocity (v = H₀ · d) in km/s and cosmological redshift (z = v / c) from distance in Megaparsecs (Mpc) using the Hubble Constant H₀.',
    category: 'Science',
    icon: 'text',
    keywords: ['hubble law calculator', 'cosmic expansion velocity formula v h0 d', 'galaxy redshift z calculator online', 'megaparsecs to recession velocity calculator', 'edwin hubble cosmological expansion online'],
    order: 519,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Galactic Distance d (Mpc or Mly) & Hubble Constant H₀ (km/s/Mpc)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hub-dist">Distance d (Megaparsecs Mpc)</label>
          <input class="tool-textarea" id="hub-dist" type="number" step="any" value="100.0" placeholder="100.0 Mpc (326 Million Light-Years)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hub-h0">Hubble Constant H₀</label>
          <input class="tool-textarea" id="hub-h0" type="number" step="0.5" value="70.0" placeholder="70.0 km/s/Mpc" />
        </div>
      </div>
      <div id="hub-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hub-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">7,000 km / s (2.33% c)</span>
            <span class="stat-label">Cosmological Recession Velocity (v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hub-res-z" style="font-weight:700;">Redshift z = 0.0233</span>
            <span class="stat-label">Spectroscopic Redshift (z = v / c)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('hub-dist'), h0El = document.getElementById('hub-h0');
  const vResEl = document.getElementById('hub-res-v'), zResEl = document.getElementById('hub-res-z');

  const c_kms = 299792.458; // km / s

  function update() {
    const dMpc = parseFloat(dEl.value), H0 = parseFloat(h0El.value);
    if (isNaN(dMpc) || isNaN(H0) || dMpc <= 0 || H0 <= 0) return;

    // Hubble Law: v = H0 * d  [km / s]
    const v = H0 * dMpc;
    const z = v / c_kms;
    const lightYearsMly = dMpc * 3.26156;
    const pctC = (v / c_kms) * 100;

    vResEl.textContent = Math.round(v).toLocaleString() + ' km / s (' + pctC.toFixed(2) + '% speed of light)';
    zResEl.textContent = 'Redshift z = ' + z.toFixed(4) + ' (Distance: ' + Math.round(lightYearsMly) + ' Million Light-Years)';
  }

  dEl.addEventListener('input', update);
  h0El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter distance to distant galaxy in Megaparsecs (1 Mpc = 3.26 million light-years).',
      'Enter Hubble expansion rate constant H₀ (standard Planck/Hubble value ~70 km/s/Mpc).',
      'Inspect apparent recession velocity in km/s and cosmological spectroscopic redshift z.'
    ],
    benefitTitle: 'Edwin Hubble & Georges Lemaître\'s Expanding Universe',
    benefitContent: 'Distant galaxies are not moving through static space; instead, the fabric of space itself is expanding uniformly in all directions at approximately 70 kilometers per second for every Megaparsec of distance.',
    faqs: [{ q: 'What is 1 Megaparsec (Mpc)?', a: '1 Megaparsec equals 1 million parsecs = 3.26 million light-years = $3.086 \\times 10^{19}\\text{ kilometers}$.' }]
  },

  // 3. Stefan-Boltzmann Stellar Luminosity & Radius Calculator
  {
    slug: 'stefan-boltzmann-stellar-luminosity-calculator',
    name: 'Stefan-Boltzmann Stellar Luminosity & Stellar Radius Calculator',
    description: 'Calculate total stellar energy radiation luminosity (L = 4 · π · R² · σ · T⁴) in Solar Luminosities (L_☉) and stellar radius from photosphere effective temperature.',
    category: 'Science',
    icon: 'text',
    keywords: ['stellar luminosity calculator', 'stefan boltzmann stellar radius formula', 'l 4 pi r2 sigma t4 online', 'hertzsprung russell diagram luminosity calculator', 'astrophysics blackbody star luminosity online'],
    order: 520,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Star Radius (Solar Radii R_☉) & Effective Photosphere Temperature (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="star-rad">Radius (Solar Radii R_☉)</label>
          <input class="tool-textarea" id="star-rad" type="number" step="any" value="1.71" placeholder="1.71 R_☉ (Sirius A)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="star-temp">Surface Temp T (K)</label>
          <input class="tool-textarea" id="star-temp" type="number" step="any" value="9940" placeholder="9,940 K (Sirius A)" />
        </div>
      </div>
      <div id="star-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="star-res-lum" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">25.4 L_☉ (Solar Luminosities)</span>
            <span class="stat-label">Total Radiated Power (Luminosity L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="star-res-watts" style="font-weight:700;">9.72 × 10²⁷ Watts</span>
            <span class="stat-label">Absolute Power Output (SI Joules/sec)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('star-rad'), tEl = document.getElementById('star-temp');
  const lResEl = document.getElementById('star-res-lum'), wResEl = document.getElementById('star-res-watts');

  // Sun reference values: T_sun = 5778 K, L_sun = 3.828e26 Watts
  const T_sun = 5778;
  const L_sun_watts = 3.828e26;

  function update() {
    const rSolar = parseFloat(rEl.value), tempK = parseFloat(tEl.value);
    if (isNaN(rSolar) || isNaN(tempK) || rSolar <= 0 || tempK <= 0) return;

    // Luminosity scaling: L / L_sun = (R / R_sun)^2 * (T / T_sun)^4
    const lumSolar = Math.pow(rSolar, 2) * Math.pow(tempK / T_sun, 4);
    const lumWatts = lumSolar * L_sun_watts;

    if (lumSolar > 1000) {
      lResEl.textContent = Math.round(lumSolar).toLocaleString() + ' L_☉ (Solar Luminosities)';
    } else {
      lResEl.textContent = lumSolar.toFixed(2) + ' L_☉ (Solar Luminosities)';
    }

    wResEl.textContent = (lumWatts / 1e26).toFixed(2) + ' × 10²⁶ Watts (Spectral Class ' + (tempK > 30000 ? 'O' : (tempK > 10000 ? 'B' : (tempK > 7500 ? 'A' : (tempK > 6000 ? 'F' : (tempK > 5200 ? 'G (Sun-like)' : (tempK > 3700 ? 'K' : 'M Red Dwarf')))))) + ')';
  }

  rEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter stellar radius in multiples of our Sun\'s radius ($R_\\odot = 696,340\\text{ km}$).',
      'Enter stellar photosphere effective blackbody surface temperature in Kelvin (Sun = 5,778 K).',
      'Inspect total radiated bolometric luminosity in Solar Luminosities ($L_\\odot$) and absolute watts.'
    ],
    benefitTitle: 'T⁴ Temperature Fourth-Power Radiation Scaling',
    benefitContent: 'Because blackbody power scales with temperature to the fourth power ($L \propto T^4$), a hot blue-white star (e.g. 10,000 K) radiates nearly 9 times more energy per square meter than our Sun, dominating the Hertzsprung-Russell diagram.',
    faqs: [{ q: 'What is our Sun\'s luminosity?', a: 'Our Sun radiates exactly $1.0\\text{ }L_\\odot = 3.828 \\times 10^{26}\\text{ Watts}$ of electromagnetic radiation into space.' }]
  },

  // 4. Kepler's Third Law Planetary & Exoplanet Orbital Period Calculator
  {
    slug: 'kepler-third-law-orbital-period-calculator',
    name: 'Kepler\'s Third Law Planetary & Exoplanet Orbital Period Calculator',
    description: 'Calculate planetary and exoplanetary orbital period (T² = (4 · π² / (G · M_star)) · a³ = a³ / M_star) in Earth years or days from semi-major axis (AU) and host star mass.',
    category: 'Science',
    icon: 'text',
    keywords: ['kepler third law calculator', 'planetary orbital period formula online', 't squared equals a cubed over m calculator', 'exoplanet semi major axis orbital period online', 'johannes kepler orbital mechanics calculator'],
    order: 521,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Semi-Major Axis a (AU) & Host Star Mass M_star (Solar Masses M_☉)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kep-a">Semi-Major Axis a (AU)</label>
          <input class="tool-textarea" id="kep-a" type="number" step="any" value="5.204" placeholder="5.204 AU (Jupiter)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kep-m">Star Mass (M_☉)</label>
          <input class="tool-textarea" id="kep-m" type="number" step="any" value="1.00" placeholder="1.00 M_☉ (Our Sun)" />
        </div>
      </div>
      <div id="kep-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kep-res-t" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">11.87 Earth Years</span>
            <span class="stat-label">Orbital Period (T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kep-res-days" style="font-weight:700;">4,336 Days (13.06 km/s Velocity)</span>
            <span class="stat-label">Days & Mean Orbital Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('kep-a'), mEl = document.getElementById('kep-m');
  const tResEl = document.getElementById('kep-res-t'), dResEl = document.getElementById('kep-res-days');

  function update() {
    const aAu = parseFloat(aEl.value), mSolar = parseFloat(mEl.value);
    if (isNaN(aAu) || isNaN(mSolar) || aAu <= 0 || mSolar <= 0) return;

    // Kepler's Third Law in Solar System units:
    // T^2 = a^3 / M  =>  T = sqrt( a^3 / M )  [Earth Years]
    const tYears = Math.sqrt(Math.pow(aAu, 3) / mSolar);
    const tDays = tYears * 365.256;
    // Mean orbital speed v ≈ 29.78 * sqrt(M / a)  [km/s]
    const orbSpeed = 29.78 * Math.sqrt(mSolar / aAu);

    tResEl.textContent = tYears >= 1.0 ? tYears.toFixed(2) + ' Earth Years' : (tYears * 12).toFixed(2) + ' Months';
    dResEl.textContent = Math.round(tDays).toLocaleString() + ' Days (Mean Orbit Speed: ' + orbSpeed.toFixed(2) + ' km/s)';
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter orbital semi-major axis distance a in Astronomical Units (1 AU = 149.6 million km = Earth-Sun distance).',
      'Enter central host star mass in solar masses ($M_\\odot$).',
      'Inspect planetary orbital revolution period in Earth years, days, and average orbital velocity in km/s.'
    ],
    benefitTitle: 'Johannes Kepler\'s 1619 Harmonic Third Law',
    benefitContent: 'Kepler proved that the square of orbital period is directly proportional to the cube of semi-major axis distance ($T^2 \propto a^3$), harmonizing planetary motions across our solar system and thousands of newly discovered exoplanets.',
    faqs: [{ q: 'What is Jupiter\'s orbital period at 5.2 AU?', a: '$T = \\sqrt{5.204^3 / 1.0} = \\sqrt{140.9} \\approx 11.87\\text{ Earth years}$ (4,336 days).' }]
  },

  // 5. Gravitational Time Dilation (General Relativity) Calculator
  {
    slug: 'gravitational-time-dilation-general-relativity-calculator',
    name: 'Gravitational Time Dilation (General Relativity) Calculator',
    description: 'Calculate Einstein gravitational time dilation (t_0 = t_f · √(1 - 2 · G · M / (r · c²))) near massive planets, neutron stars, and black holes.',
    category: 'Science',
    icon: 'text',
    keywords: ['gravitational time dilation calculator', 'general relativity time dilation formula', 'einstein gravitational time slowing online', 'gps gravitational time dilation calculator', 'black hole time dilation calculator online'],
    order: 522,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mass M (Solar Masses M_☉ or Earths) & Radial Distance r (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gtd-mass">Mass (Solar Masses M_☉)</label>
          <input class="tool-textarea" id="gtd-mass" type="number" step="any" value="1.40" placeholder="1.40 M_☉ (Neutron Star)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gtd-r">Radial Distance r (km)</label>
          <input class="tool-textarea" id="gtd-r" type="number" step="any" value="12.0" placeholder="12.0 km (Surface)" />
        </div>
      </div>
      <div id="gtd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gtd-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">0.8095 (80.95% Speed)</span>
            <span class="stat-label">Clock Rate Factor (t_local / t_infinity)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gtd-res-loss" style="font-weight:700;">1 Hour Surface = 1.235 Hours Space</span>
            <span class="stat-label">Relative Time Elapsed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('gtd-mass'), rEl = document.getElementById('gtd-r');
  const ratResEl = document.getElementById('gtd-res-ratio'), losResEl = document.getElementById('gtd-res-loss');

  function update() {
    const mSolar = parseFloat(mEl.value), rKm = parseFloat(rEl.value);
    if (isNaN(mSolar) || isNaN(rKm) || mSolar <= 0 || rKm <= 0) return;

    // Schwarzschild radius R_s = 2.95325 * M_solar (km)
    const rsKm = 2.95325 * mSolar;

    if (rKm <= rsKm) {
      ratResEl.textContent = 'Inside Event Horizon (r ≤ R_s)';
      losResEl.textContent = 'Time stops at the horizon (t_local -> 0)';
      return;
    }

    // Time dilation factor = sqrt( 1 - Rs / r )
    const factor = Math.sqrt(1 - (rsKm / rKm));
    const spaceHoursPerLocalHour = 1 / factor;
    const microsecondsPerDay = (1 - factor) * 86400 * 1e6;

    ratResEl.textContent = factor.toFixed(5) + ' (' + (factor * 100).toFixed(2) + '% of Deep Space Clock Speed)';

    if (factor < 0.9999) {
      losResEl.textContent = '1 Hour Local = ' + spaceHoursPerLocalHour.toFixed(3) + ' Hours in Deep Space';
    } else {
      losResEl.textContent = 'Clocks run slower by ' + microsecondsPerDay.toFixed(1) + ' μs/day (GPS Precision Scale)';
    }
  }

  mEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter celestial body mass in Solar Masses ($M_\\odot$).',
      'Enter radial distance from mass center r in kilometers.',
      'Inspect gravitational clock slowing factor compared to a stationary observer infinitely far away.'
    ],
    benefitTitle: 'Albert Einstein\'s 1915 Gravitational Spacetime Curvature',
    benefitContent: 'Stronger gravitational fields slow down the physical passage of time; without General Relativity time-dilation corrections (which speed up GPS satellite atomic clocks by 45 microseconds per day), car navigation systems would drift by over 10 km daily.',
    faqs: [{ q: 'What happens to time at the event horizon of a black hole?', a: 'As $r \to R_s$, the factor $\sqrt{1 - R_s/r} \to 0$, causing time for an outside observer to freeze completely at the horizon.' }]
  }
];

toolsSuiteOOO.forEach(createTool);
console.log('Suite OOO complete: 5 tools created.');
