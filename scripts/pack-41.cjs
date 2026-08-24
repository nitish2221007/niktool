const { createTool } = require('./generate-curated-tools.cjs');

// Pack 41: 25 Astrophysics, Astronomy, Cosmology & Planetary Science Calculators (Tools 1276 to 1300)
const pack41Tools = [
  // 1. Hubble-Lemaître Law Cosmic Expansion Calculator
  {
    slug: 'hubble-lemaitre-law-cosmic-expansion-recession-velocity-calculator',
    name: 'Hubble-Lemaître Law Cosmic Expansion (v = H₀·d) & Redshift Calculator',
    description: 'Calculate galaxy cosmological recession velocity (v = H₀ · d) in km/s, cosmological redshift z, lookback time, and Hubble age of the universe (t_H = 1 / H₀) from cosmological distance in Megaparsecs (Mpc) or Million Light-Years.',
    category: 'Science',
    icon: 'text',
    keywords: ['hubble lemaitre law calculator', 'recession velocity formula v equals h0 times d online', 'hubble constant expansion rate redshift calculator', 'cosmological lookback time megaparsec calculator', 'astrophysics cosmology expansion of universe online'],
    order: 1160,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cosmological Distance d (Mpc) & Hubble Constant H₀ (km/s/Mpc, Planck 67.4 or SH0ES 73.0)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hl-dist">Distance (Mpc)</label>
          <input class="tool-textarea" id="hl-dist" type="number" step="10" value="100.0" placeholder="100.0 Mpc (326 Mly)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hl-h0">Hubble H₀</label>
          <input class="tool-textarea" id="hl-h0" type="number" step="0.5" value="70.0" placeholder="70.0 km/s/Mpc" />
        </div>
      </div>
      <div id="hl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hl-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Recession Velocity v = 7,000 km / s (2.33% Speed of Light)</span>
            <span class="stat-label">Cosmic Expansion Recession Velocity (v = H₀ · d)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hl-res-z" style="color:var(--green-dark); font-weight:700;">Redshift z = 0.0236 | Lookback Time = 325.9 Million Years | Hubble Time t_H = 13.97 Gyr</span>
            <span class="stat-label">Cosmological Redshift, Lookback Travel Time & Hubble Age</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('hl-dist'), hEl = document.getElementById('hl-h0');
  const vResEl = document.getElementById('hl-res-v'), zResEl = document.getElementById('hl-res-z');

  const c_kms = 299792.458; // speed of light in km/s
  const Mpc_to_Mly = 3.26156;

  function update() {
    const d_Mpc = parseFloat(dEl.value), H0 = parseFloat(hEl.value);
    if (isNaN(d_Mpc) || isNaN(H0) || d_Mpc <= 0 || H0 <= 0) return;

    // Hubble law: v = H0 * d  [km / s]
    const v = H0 * d_Mpc;
    const beta = v / c_kms;

    // Relativistic redshift formula: 1 + z = sqrt((1 + beta)/(1 - beta)) if beta < 1
    let z = 0;
    if (beta < 0.99) {
      z = Math.sqrt((1.0 + beta) / (1.0 - beta)) - 1.0;
    } else {
      z = beta; // non-relativistic linear approximation fallback
    }

    // Lookback time approx: d_Mly = d_Mpc * 3.26156 Million light-years
    const d_Mly = d_Mpc * Mpc_to_Mly;

    // Hubble time: 1 / H0 converted to billions of years (Gyr)
    // 1 km/s/Mpc = 3.24078e-20 s^-1 => t_H = 1 / (H0 * 3.24078e-20) / (3.15576e16 seconds/Gyr)
    const t_Hubble_Gyr = 977.8 / H0;

    vResEl.textContent = 'Recession Velocity v = ' + Math.round(v).toLocaleString() + ' km / s (' + (beta * 100).toFixed(2) + '% c)';
    zResEl.textContent = 'Redshift z = ' + z.toFixed(4) + ' | Lookback = ' + d_Mly.toFixed(1) + ' Mly | Hubble Age t_H = ' + t_Hubble_Gyr.toFixed(2) + ' Billion Years';
  }

  dEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter galaxy cosmological co-moving distance d in Megaparsecs (Mpc).',
      'Enter Hubble expansion parameter $H_0$ in $\text{km/s/Mpc}$ (typically 67.4 to 73.0).',
      'Inspect galactic recession velocity, cosmological redshift z, lookback photon travel time, and total Hubble expansion age.'
    ],
    benefitTitle: 'Edwin Hubble & Georges Lemaître 1929 Expanding Universe Discovery',
    benefitContent: 'Distant galaxies recede from us at speeds proportional to their distance ($v = H_0 d$), proving that spacetime itself is uniformly expanding in all directions from the Big Bang.',
    faqs: [{ q: 'What is the Hubble Tension in modern astrophysics?', a: 'The Hubble Tension is the persistent discrepancy between cosmic microwave background measurements ($H_0 \approx 67.4\text{ km/s/Mpc}$) and local Cepheid/supernova measurements ($H_0 \approx 73.0\text{ km/s/Mpc}$).' }]
  },

  // 2. Stellar Mass-Luminosity Relation Calculator
  {
    slug: 'stellar-mass-luminosity-relation-main-sequence-calculator',
    name: 'Stellar Mass-Luminosity Relation (L / L_sun ∝ (M / M_sun)^3.5) Calculator',
    description: 'Calculate main sequence star radiative luminosity (L / L_sun = (M / M_sun)^3.5) and thermonuclear core hydrogen-burning stellar main sequence lifetime (t_ms = 10 · (M / M_sun)^(-2.5) Billion Years) for stellar astrophysics.',
    category: 'Science',
    icon: 'text',
    keywords: ['stellar mass luminosity relation calculator', 'main sequence luminosity formula l proportional to m to 3.5 online', 'stellar lifetime main sequence calculator billion years', 'solar masses to solar luminosities calculator', 'stellar astrophysics star evolution online'],
    order: 1161,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Stellar Mass M in Solar Masses (M_sun, e.g. 0.2 to 50.0 M_sun)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="ml-mass">Stellar Mass (M / M_sun)</label>
        <input class="tool-textarea" id="ml-mass" type="number" step="0.5" min="0.1" max="100.0" value="2.0" placeholder="2.0 M_sun (Sirius A)" />
      </div>
      <div id="ml-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ml-res-lum" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Luminosity L = 11.31 L_sun (4.33 × 10²⁷ Watts)</span>
            <span class="stat-label">Radiative Bolometric Stellar Luminosity (L ∝ M^3.5)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ml-res-life" style="color:var(--green-dark); font-weight:700;">Main Sequence Lifetime t_ms = 1.77 Billion Years (Sun = 10.0 Gyr | Burns fuel 5.7× faster)</span>
            <span class="stat-label">Core Hydrogen Fusion Stellar Main Sequence Lifespan</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('ml-mass');
  const lResEl = document.getElementById('ml-res-lum'), lfResEl = document.getElementById('ml-res-life');

  const L_sun_watts = 3.828e26;

  function update() {
    const M = parseFloat(mEl.value);
    if (isNaN(M) || M <= 0) return;

    // Piecewise standard Mass-Luminosity exponent alpha:
    let alpha = 3.5;
    if (M < 0.43) alpha = 2.3;
    else if (M < 2.0) alpha = 4.0;
    else if (M < 20.0) alpha = 3.5;
    else alpha = 1.0; // very massive Eddington radiation pressure limit

    const L_ratio = Math.pow(M, alpha);
    const L_watts = L_ratio * L_sun_watts;

    // Main sequence lifetime: t_ms = 10 Gyr * (M / L) = 10 Gyr * M / M^alpha = 10 * M^(1 - alpha)
    const t_ms_Gyr = 10.0 * (M / L_ratio);
    const t_ms_Myr = t_ms_Gyr * 1000.0;

    let timeStr = '';
    if (t_ms_Gyr >= 1.0) timeStr = t_ms_Gyr.toFixed(2) + ' Billion Years (Gyr)';
    else timeStr = t_ms_Myr.toFixed(1) + ' Million Years (Myr)';

    lResEl.textContent = 'Luminosity L = ' + (L_ratio >= 1000 ? L_ratio.toExponential(2) : L_ratio.toFixed(2)) + ' L_sun (' + L_watts.toExponential(2) + ' W)';
    lfResEl.textContent = 'Lifespan t_ms = ' + timeStr + ' (Mass: ' + M + ' M_sun | Scaling: L ∝ M^' + alpha + ')';
  }

  mEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter stellar mass M in solar units ($M_\odot = 1.989 \times 10^{30}\text{ kg}$).',
      'Inspect total bolometric luminosity in solar luminosities ($L_\odot$) and estimated core fusion main sequence lifetime.'
    ],
    benefitTitle: 'Sir Arthur Eddington 1924 Mass-Luminosity Law',
    benefitContent: 'Massive stars burn through core hydrogen at rates proportional to $M^{3.5}$; a $10 M_\odot$ blue supergiant shines $3,000\times$ brighter than the Sun and exhausts its nuclear fuel in only $30\text{ million years}$ before going supernova.',
    faqs: [{ q: 'Why do low-mass red dwarfs live for trillions of years?', a: 'Red dwarfs ($0.1 M_\odot$) have low core temperatures, burning hydrogen at a minuscule rate while remaining fully convective, enabling lifespans exceeding $1\text{ to }10\text{ trillion years}$.' }]
  },

  // 3. Apparent vs Absolute Magnitude & Distance Modulus Calculator
  {
    slug: 'apparent-vs-absolute-magnitude-distance-modulus-calculator',
    name: 'Astronomical Distance Modulus (m - M = 5·log₁₀(d) - 5) & Magnitude Calculator',
    description: 'Calculate astronomical stellar distance (d = 10^((m - M + 5) / 5)) in parsecs and light-years from apparent visual magnitude m and absolute bolometric magnitude M using the Pogson magnitude scale.',
    category: 'Science',
    icon: 'text',
    keywords: ['distance modulus calculator', 'apparent absolute magnitude formula m minus M equals 5 log d minus 5 online', 'astronomical parsec distance magnitude calculator', 'pogson magnitude scale distance calculator light years', 'observational astronomy photometry online'],
    order: 1162,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Apparent Magnitude m (Earth View) & Absolute Magnitude M (at Standard 10 Parsecs)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mag-m">Apparent m</label>
          <input class="tool-textarea" id="mag-m" type="number" step="0.5" value="0.03" placeholder="0.03 (Vega)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mag-M">Absolute M</label>
          <input class="tool-textarea" id="mag-M" type="number" step="0.5" value="0.58" placeholder="0.58 (Vega at 10 pc)" />
        </div>
      </div>
      <div id="mag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mag-res-dist" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Distance d = 7.76 Parsecs (25.3 Light-Years)</span>
            <span class="stat-label">True Stellar Distance (d = 10^((m - M + 5) / 5))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mag-res-mod" style="color:var(--green-dark); font-weight:700;">Distance Modulus μ = m - M = -0.55 | Flux Ratio = 1.66× Brighter than at 10 pc</span>
            <span class="stat-label">Distance Modulus (μ) & Inverse-Square Brightness Factor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('mag-m'), MEl = document.getElementById('mag-M');
  const dstResEl = document.getElementById('mag-res-dist'), modResEl = document.getElementById('mag-res-mod');

  function update() {
    const m = parseFloat(mEl.value), M = parseFloat(MEl.value);
    if (isNaN(m) || isNaN(M)) return;

    // Distance modulus: mu = m - M
    const mu = m - M;

    // Distance in parsecs: d = 10^( (mu + 5) / 5 )
    const d_pc = Math.pow(10.0, (mu + 5.0) / 5.0);
    const d_ly = d_pc * 3.26156;

    // Brightness flux ratio compared to standard 10 pc: (10 / d)^2 = 10^( -0.4 * mu )
    const flux_ratio = Math.pow(10.0, -0.4 * mu);

    dstResEl.textContent = 'Distance d = ' + (d_pc >= 1e6 ? (d_pc/1e6).toFixed(2) + ' Mpc' : (d_pc >= 1000 ? (d_pc/1000).toFixed(2) + ' kpc' : d_pc.toFixed(2) + ' pc')) + ' (' + (d_ly >= 1e6 ? (d_ly/1e6).toFixed(2) + ' Mly' : d_ly.toFixed(1) + ' Light-Years)');
    modResEl.textContent = 'Distance Modulus μ = ' + mu.toFixed(2) + ' | Flux = ' + flux_ratio.toFixed(2) + '× (m = ' + m + ', M = ' + M + ')';
  }

  mEl.addEventListener('input', update);
  MEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter apparent visual magnitude m seen through telescopes on Earth (lower/negative is brighter).',
      'Enter absolute bolometric/visual magnitude M (brightness if placed at standard 10 parsecs).',
      'Inspect distance modulus ($\mu = m - M$) and true stellar distance in parsecs and light-years.'
    ],
    benefitTitle: 'Norman Pogson 1856 Logarithmic Stellar Brightness Scale',
    benefitContent: 'A difference of 5 magnitudes corresponds exactly to a $100\times$ difference in light flux ($1\text{ magnitude} = \sqrt[5]{100} \approx 2.512$), providing the foundational standard candle distance ruler for Type Ia supernovae and Cepheid variables.',
    faqs: [{ q: 'What is the absolute magnitude of our Sun?', a: 'The Sun has an absolute visual magnitude $M = +4.83$; if placed at $10\text{ parsecs}$ ($32.6\text{ ly}$), it would appear as a faint 5th-magnitude star barely visible to the naked eye.' }]
  },

  // 4. Stellar Parallax Distance (Parsec to Arcsecond) Calculator
  {
    slug: 'stellar-parallax-distance-parsec-arcsecond-calculator',
    name: 'Stellar Parallax Distance (d = 1 / p Arcseconds to Parsecs) Calculator',
    description: 'Calculate astronomical trigonometric parallax distance (d = 1 / p) in parsecs, light-years, astronomical units (AU), and kilometers from stellar parallax angle p in arcseconds (arcsec or milliarcseconds mas) for astrometry.',
    category: 'Science',
    icon: 'text',
    keywords: ['stellar parallax calculator', 'parallax distance formula d equals 1 over p online', 'arcseconds to parsecs light years astronomical units calculator', 'gaia astrometry parallax calculator mas', 'observational astronomy astrometry parallax online'],
    order: 1163,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Parallax Angle p (Arcseconds or Milliarcseconds mas, e.g. 0.768" for Proxima Centauri)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="px-p">Parallax p</label>
          <input class="tool-textarea" id="px-p" type="number" step="0.05" value="0.768" placeholder="0.768 arcsec (Proxima Centauri)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="px-unit">Angle Units</label>
          <select class="tool-textarea" id="px-unit">
            <option value="arcsec" selected>Arcseconds (arcsec / ")</option>
            <option value="mas">Milliarcseconds (mas / 10⁻³ " - Gaia Spacecraft)</option>
          </select>
        </div>
      </div>
      <div id="px-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="px-res-pc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Distance d = 1.302 Parsecs (4.247 Light-Years)</span>
            <span class="stat-label">Trigonometric Parallax Distance (d = 1 / p)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="px-res-au" style="color:var(--green-dark); font-weight:700;">d = 268,570 AU (4.017 × 10¹³ km | 1 Parsec = 206,265 AU = 3.26 ly)</span>
            <span class="stat-label">Astronomical Units & Kilometers Conversion</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('px-p'), uEl = document.getElementById('px-unit');
  const pcResEl = document.getElementById('px-res-pc'), auResEl = document.getElementById('px-res-au');

  function update() {
    let p_input = parseFloat(pEl.value);
    const isMas = uEl.value === 'mas';

    if (isNaN(p_input) || p_input <= 0) return;

    // Convert to arcseconds:
    const p_arcsec = isMas ? p_input / 1000.0 : p_input;

    // Distance in parsecs: d = 1 / p_arcsec
    const d_pc = 1.0 / p_arcsec;
    const d_ly = d_pc * 3.26156;
    const d_au = d_pc * 206264.806;
    const d_km = d_au * 1.495978707e8;

    pcResEl.textContent = 'Distance d = ' + (d_pc >= 1000 ? (d_pc/1000).toFixed(3) + ' kpc' : d_pc.toFixed(3) + ' Parsecs') + ' (' + d_ly.toFixed(3) + ' Light-Years)';
    auResEl.textContent = 'd = ' + Math.round(d_au).toLocaleString() + ' AU (' + d_km.toExponential(3) + ' km | p = ' + p_arcsec.toFixed(4) + ' arcsec)';
  }

  pEl.addEventListener('input', update);
  uEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter stellar trigonometric parallax angle p in arcseconds or milliarcseconds (mas).',
      'Inspect direct geometric distance in parsecs, light-years, Astronomical Units (AU), and kilometers.'
    ],
    benefitTitle: 'Friedrich Bessel 1838 Stellar Parallax Baseline',
    benefitContent: '1 Parsec ("parallax of one second") is the distance at which 1 Astronomical Unit subtends an angle of 1 arcsecond ($1\text{ pc} = 206,265\text{ AU} \approx 3.26\text{ light-years}$), forming the first rung of the cosmic distance ladder.',
    faqs: [{ q: 'What is the precision of the ESA Gaia astrometry mission?', a: 'The Gaia space telescope measures stellar parallaxes with microarcsecond precision ($\mu\text{as}$), mapping over 1.8 billion stars across the Milky Way.' }]
  },

  // 5. Hawking Radiation Black Hole Temperature & Lifetime Calculator
  {
    slug: 'hawking-radiation-black-hole-temperature-lifetime-calculator',
    name: 'Hawking Radiation Black Hole Temperature (T_H = ℏ·c³ / (8π·G·M·k_B)) & Lifetime Calculator',
    description: 'Calculate quantum Hawking radiation temperature (T_H = ℏ · c³ / (8π · G · M · k_B)) in Kelvin, thermal luminosity in Watts, and complete gravitational evaporation lifetime in years from black hole mass in solar masses or kg.',
    category: 'Science',
    icon: 'text',
    keywords: ['hawking radiation calculator', 'black hole temperature formula t_h online', 'black hole evaporation lifetime calculator years', 'quantum gravity hawking temperature calculator kelvin', 'general relativity quantum cosmology black holes online'],
    order: 1164,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Black Hole Mass M (Solar Masses M_sun, e.g. 5.0 M_sun or Primordial kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hw-mass">Mass (M_sun)</label>
          <input class="tool-textarea" id="hw-mass" type="number" step="1" value="5.0" placeholder="5.0 M_sun (Stellar Black Hole)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hw-type">Mass Scale</label>
          <select class="tool-textarea" id="hw-type">
            <option value="msun" selected>Solar Masses (M_sun = 1.989 × 10³⁰ kg)</option>
            <option value="kg">Custom Kilograms (kg - Micro / Primordial)</option>
          </select>
        </div>
      </div>
      <div id="hw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hw-res-temp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Hawking Temp T_H = 1.23 × 10⁻⁸ K (Near Absolute Zero)</span>
            <span class="stat-label">Quantum Hawking Radiation Blackbody Temperature (T_H ∝ 1/M)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hw-res-life" style="color:var(--green-dark); font-weight:700;">Evaporation Lifetime t_evap = 2.62 × 10⁶⁹ Years | Power = 3.60 × 10⁻³⁰ Watts</span>
            <span class="stat-label">Total Quantum Evaporation Lifespan & Thermal Radiative Power</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('hw-mass'), tpEl = document.getElementById('hw-type');
  const tResEl = document.getElementById('hw-res-temp'), lfResEl = document.getElementById('hw-res-life');

  const M_sun_kg = 1.98847e30;
  // Hawking temp constant: T_H = (hbar * c^3) / (8 * pi * G * M * k_B) approx 1.227e23 / M (kg)
  const T_const = 1.227e23; // K * kg

  // Lifetime constant: t_evap = (5120 * pi * G^2 * M^3) / (hbar * c^4) approx 2.098e-16 * M^3 (seconds)
  // In years: t_evap_yr approx 2.098e-16 * M^3 / 3.15576e7 approx 6.648e-24 * M^3 (years)

  function update() {
    let mass_input = parseFloat(mEl.value);
    const isSolar = tpEl.value === 'msun';

    if (isNaN(mass_input) || mass_input <= 0) return;

    const M_kg = isSolar ? mass_input * M_sun_kg : mass_input;

    // Hawking temperature: T_H = T_const / M_kg  [K]
    const T_H_K = T_const / M_kg;

    // Lifetime in years: t_yr = 6.648e-24 * (M_kg)^3
    const t_evap_yr = 6.648e-24 * Math.pow(M_kg, 3);

    // Radiative power: P = (hbar * c^6) / (15360 * pi * G^2 * M^2) approx 3.562e32 / M^2  [Watts]
    const P_watts = 3.562e32 / Math.pow(M_kg, 2);

    tResEl.textContent = 'Hawking Temp T_H = ' + T_H_K.toExponential(2) + ' K';
    lfResEl.textContent = 'Lifetime t_evap = ' + t_evap_yr.toExponential(2) + ' Years | Power = ' + P_watts.toExponential(2) + ' Watts (M = ' + (isSolar ? mass_input + ' M_sun' : M_kg.toExponential(2) + ' kg') + ')';
  }

  mEl.addEventListener('input', update);
  tpEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter black hole mass in solar masses ($M_\odot$) or custom kilograms.',
      'Inspect quantum Hawking radiation blackbody temperature in Kelvin, thermal radiative power in Watts, and total evaporation lifespan in years.'
    ],
    benefitTitle: 'Stephen Hawking 1974 Black Hole Thermodynamics',
    benefitContent: 'Hawking proved that quantum vacuum fluctuations near an event horizon cause black holes to radiate thermal energy ($T_H \propto 1/M$), slowly shrinking until explosive evaporation.',
    faqs: [{ q: 'Why do stellar black holes absorb more heat than they radiate today?', a: 'A stellar black hole has $T_H \sim 10^{-8}\text{ K}$, far colder than the Cosmic Microwave Background ($2.725\text{ K}$), meaning they currently absorb net heat from space.' }]
  },

  // 6. Roche Tidal Disruption Limit Calculator
  {
    slug: 'roche-tidal-disruption-limit-satellite-destruction-calculator',
    name: 'Roche Tidal Disruption Limit (d = R_M·(2·ρ_M / ρ_m)^(⅓)) Planetary Ring Calculator',
    description: 'Calculate celestial Roche tidal disruption limit distance (d = R_M · (2 · ρ_M / ρ_m)^(1/3) for rigid bodies, d = 2.44 · R_M · (ρ_M / ρ_m)^(1/3) for fluid bodies) to predict planetary ring formation and moon tidal destruction.',
    category: 'Science',
    icon: 'text',
    keywords: ['roche limit calculator', 'tidal disruption limit formula online', 'planetary ring formation saturn roche limit calculator', 'gravitational tidal destruction distance calculator', 'planetary science celestial mechanics tidal forces online'],
    order: 1165,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Host Planet Radius R_M (km), Host Density ρ_M (g/cm³) & Satellite Density ρ_m (g/cm³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rc-r">Planet Radius R (km)</label>
          <input class="tool-textarea" id="rc-r" type="number" step="500" value="58232" placeholder="58,232 km (Saturn)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-rhom">Planet Density ρ_M</label>
          <input class="tool-textarea" id="rc-rhom" type="number" step="0.1" value="0.687" placeholder="0.687 g/cm³ (Saturn)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rc-rhos">Moon Density ρ_m</label>
          <input class="tool-textarea" id="rc-rhos" type="number" step="0.1" value="1.00" placeholder="1.00 g/cm³ (Icy Moon)" />
        </div>
      </div>
      <div id="rc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rc-res-fluid" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Fluid Roche Limit d = 125,487 km (2.15 R_Saturn)</span>
            <span class="stat-label">Fluid Satellite Tidal Disruption Boundary (Planetary Rings Envelope)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rc-res-rigid" style="color:var(--green-dark); font-weight:700;">Rigid Limit d = 64,570 km (1.11 R_Saturn) | Rings of Saturn lie inside Fluid Limit ✓</span>
            <span class="stat-label">Rigid Solid Rock Limit & Ring Stability Analysis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('rc-r'), rmEl = document.getElementById('rc-rhom'), rsEl = document.getElementById('rc-rhos');
  const flResEl = document.getElementById('rc-res-fluid'), rgResEl = document.getElementById('rc-res-rigid');

  function update() {
    const R_M = parseFloat(rEl.value), rho_M = parseFloat(rmEl.value), rho_m = parseFloat(rsEl.value);
    if (isNaN(R_M) || isNaN(rho_M) || isNaN(rho_m) || R_M <= 0 || rho_M <= 0 || rho_m <= 0) return;

    // Rigid body Roche limit: d_rigid = R_M * ( 2 * rho_M / rho_m )^(1/3) approx 1.26 * R_M * (rho_M / rho_m)^(1/3)
    const d_rigid = R_M * Math.pow((2.0 * rho_M) / rho_m, 1.0 / 3.0);

    // Fluid body Roche limit: d_fluid = 2.44 * R_M * ( rho_M / rho_m )^(1/3)
    const d_fluid = 2.44 * R_M * Math.pow(rho_M / rho_m, 1.0 / 3.0);

    const ratio_fluid = d_fluid / R_M;
    const ratio_rigid = d_rigid / R_M;

    flResEl.textContent = 'Fluid Roche Limit d = ' + Math.round(d_fluid).toLocaleString() + ' km (' + ratio_fluid.toFixed(2) + ' R_planet)';
    rgResEl.textContent = 'Rigid Limit d = ' + Math.round(d_rigid).toLocaleString() + ' km (' + ratio_rigid.toFixed(2) + ' R_planet | Disruption occurs inside limit)';
  }

  [rEl, rmEl, rsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter primary host planet equatorial radius $R_M$ in km.',
      'Enter primary planet bulk mean density $\rho_M$ in $\text{g/cm}^3$.',
      'Enter orbiting satellite bulk mean density $\rho_m$ in $\text{g/cm}^3$.',
      'Inspect fluid ($2.44 R_M$) and rigid ($1.26 R_M$) Roche tidal destruction thresholds.'
    ],
    benefitTitle: 'Édouard Roche 1848 Gravitational Tidal Limit',
    benefitContent: 'When a moon crosses inside a planet\'s Roche limit, differential gravitational tidal pull exceeds the moon\'s self-gravitational cohesion, shredding it into debris that flattens into planetary rings (e.g. Saturn\'s rings).',
    faqs: [{ q: 'Why do artificial satellites not break apart inside the Roche limit?', a: 'Artificial satellites are tiny and held together by electromagnetic chemical tensile bonds of metal/composite materials, not self-gravity.' }]
  },

  // 7. Drake Equation Extraterrestrial Civilizations (SETI) Calculator
  {
    slug: 'drake-equation-extraterrestrial-civilizations-seti-calculator',
    name: 'Drake Equation (N = R* · f_p · n_e · f_l · f_i · f_c · L) SETI Civilizations Calculator',
    description: 'Calculate the estimated number of active, communicative extraterrestrial civilizations in the Milky Way galaxy (N = R* · f_p · n_e · f_l · f_i · f_c · L) using Frank Drake\'s 1961 SETI probabilistic equation.',
    category: 'Science',
    icon: 'text',
    keywords: ['drake equation calculator', 'seti extraterrestrial civilizations formula n equals online', 'habitable planets intelligent life drake calculator', 'astronomy astrobiology alien life probability calculator', 'astrophysics seti radio communications online'],
    order: 1166,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Drake Equation Probabilistic Astronomical & Astrobiological Factors',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(110px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dr-r">R* (Stars/yr)</label>
          <input class="tool-textarea" id="dr-r" type="number" step="0.5" value="2.0" placeholder="2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dr-fp">f_p (Planets)</label>
          <input class="tool-textarea" id="dr-fp" type="number" step="0.1" max="1" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dr-ne">n_e (Habitable)</label>
          <input class="tool-textarea" id="dr-ne" type="number" step="0.1" value="0.4" placeholder="0.4" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dr-fl">f_l (Life)</label>
          <input class="tool-textarea" id="dr-fl" type="number" step="0.1" max="1" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dr-fi">f_i (Intel)</label>
          <input class="tool-textarea" id="dr-fi" type="number" step="0.05" max="1" value="0.2" placeholder="0.2" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dr-fc">f_c (Radio)</label>
          <input class="tool-textarea" id="dr-fc" type="number" step="0.05" max="1" value="0.2" placeholder="0.2" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dr-l">L (Years)</label>
          <input class="tool-textarea" id="dr-l" type="number" step="1000" value="10000" placeholder="10,000 Years" />
        </div>
      </div>
      <div id="dr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dr-res-n" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">N = 320 Communicating Civilizations</span>
            <span class="stat-label">Estimated Active Communicative Civilizations in Milky Way</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dr-res-dist" style="color:var(--green-dark); font-weight:700;">Average Distance to Nearest Neighbor ≈ 2,160 Light-Years (Fermi Paradox Realm)</span>
            <span class="stat-label">Estimated Average Interstellar Distance Between Civilizations</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rEl = document.getElementById('dr-r'), fpEl = document.getElementById('dr-fp');
  const neEl = document.getElementById('dr-ne'), flEl = document.getElementById('dr-fl');
  const fiEl = document.getElementById('dr-fi'), fcEl = document.getElementById('dr-fc');
  const lEl = document.getElementById('dr-l');
  const nResEl = document.getElementById('dr-res-n'), dsResEl = document.getElementById('dr-res-dist');

  function update() {
    const R = parseFloat(rEl.value), fp = parseFloat(fpEl.value), ne = parseFloat(neEl.value);
    const fl = parseFloat(flEl.value), fi = parseFloat(fiEl.value), fc = parseFloat(fcEl.value);
    const L = parseFloat(lEl.value);

    if (isNaN(R) || isNaN(fp) || isNaN(ne) || isNaN(fl) || isNaN(fi) || isNaN(fc) || isNaN(L) || R <= 0 || L <= 0) return;

    // Drake equation: N = R * fp * ne * fl * fi * fc * L
    const N = R * fp * ne * fl * fi * fc * L;

    // Milky Way galactic disk volume approx: Radius = 50,000 ly, Height = 1,000 ly => Vol = pi * R^2 * H approx 7.85e12 ly^3
    const Vol_MW = Math.PI * Math.pow(50000.0, 2) * 1000.0;
    const avgDist = N >= 1 ? Math.pow(Vol_MW / N, 1.0 / 3.0) : 100000.0;

    nResEl.textContent = 'N = ' + (N >= 10 ? Math.round(N).toLocaleString() : N.toFixed(2)) + ' Civilizations';
    dsResEl.textContent = 'Estimated Distance to Nearest Neighbor ≈ ' + (N >= 1 ? Math.round(avgDist).toLocaleString() + ' Light-Years' : 'Sole civilization in Galaxy (Rare Earth)') + ' [L = ' + L.toLocaleString() + ' yrs]';
  }

  [rEl, fpEl, neEl, flEl, fiEl, fcEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rate of star formation $R_*$ in the Milky Way (stars/year).',
      'Enter fraction of stars with planetary systems $f_p$.',
      'Enter number of habitable planets per star $n_e$.',
      'Enter fractions where life develops ($f_l$), intelligence evolves ($f_i$), and radio communications arise ($f_c$).',
      'Enter average longevity of a communicative civilization L in years.',
      'Inspect total estimated active civilizations N and average interstellar separation distance.'
    ],
    benefitTitle: 'Dr. Frank Drake 1961 Astrobiological Synthesis',
    benefitContent: 'Provides the formal framework for the Search for Extraterrestrial Intelligence (SETI) and highlights the Fermi Paradox ("Where is everybody?").',
    faqs: [{ q: 'What is the most sensitive parameter in the Drake Equation?', a: 'Civilization lifespan L (longevity) has the largest uncertainty, spanning from 100 years (nuclear self-destruction) to millions of years.' }]
  },

  // 8. Wien's Displacement Law Peak Wavelength Calculator
  {
    slug: 'wien-displacement-law-stellar-peak-wavelength-temperature-calculator',
    name: 'Wien\'s Displacement Law (λ_max = b / T) Peak Stellar Wavelength Calculator',
    description: 'Calculate blackbody and stellar emission peak emission wavelength (λ_max = 2.89777 × 10⁻³ m·K / T) in nanometers (nm) and Angstroms (Å), peak photon energy in eV, and classify star color spectrum from effective surface temperature T.',
    category: 'Science',
    icon: 'text',
    keywords: ['wiens displacement law calculator', 'peak wavelength formula lambda max equals b over t online', 'stellar blackbody temperature to peak wavelength calculator nm', 'star surface temperature color spectrum calculator', 'astrophysics radiation laws wien online'],
    order: 1167,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Stellar Effective Surface Temperature T (Kelvin, e.g. 3,000 K Red Giant to 30,000 K O-Star)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="wn-temp">Surface Temperature T (K)</label>
        <input class="tool-textarea" id="wn-temp" type="number" step="250" min="100" max="100000" value="5778" placeholder="5,778 K (Sun G2V)" />
      </div>
      <div id="wn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="wn-res-lambda" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Peak λ_max = 501.5 nm (5,015 Å - Green-Yellow Visible)</span>
            <span class="stat-label">Wien Peak Emission Wavelength (λ_max = b / T)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="wn-res-class" style="color:var(--green-dark); font-weight:700;">Photon Energy = 2.47 eV | Spectrum: Visible Light (Human eyes evolved for peak solar output)</span>
            <span class="stat-label">Peak Photon Energy & Electromagnetic Spectral Band</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('wn-temp');
  const lResEl = document.getElementById('wn-res-lambda'), clResEl = document.getElementById('wn-res-class');

  const b_wien = 2.897771955e-3; // m * K
  const h_c_eV_nm = 1239.84193; // hc in eV * nm

  function update() {
    const T = parseFloat(tEl.value);
    if (isNaN(T) || T <= 0) return;

    // Wien's Law: lambda_max = b / T  [meters -> nanometers]
    const lambda_m = b_wien / T;
    const lambda_nm = lambda_m * 1e9;
    const lambda_ang = lambda_nm * 10.0;

    // Peak photon energy: E = hc / lambda  [eV]
    const E_eV = h_c_eV_nm / lambda_nm;

    let band = '', color = '#22543d';
    if (lambda_nm < 10) { band = 'X-Ray / Gamma Ray Spectrum (Extreme accretion disk)'; color = '#2563eb'; }
    else if (lambda_nm < 380) { band = 'Ultraviolet (O / B Type Hot Blue Stars)'; color = '#2563eb'; }
    else if (lambda_nm <= 750) { band = 'Visible Light Spectrum (A, F, G, K Main Sequence Stars)'; color = '#22543d'; }
    else if (lambda_nm < 1e6) { band = 'Infrared (M-Dwarfs, Protostars & Brown Dwarfs)'; color = '#c53030'; }
    else { band = 'Microwave / Radio (Cosmic Microwave Background 2.73 K)'; color = '#ea580c'; }

    lResEl.textContent = 'Peak λ_max = ' + (lambda_nm >= 1000 ? (lambda_nm/1000).toFixed(2) + ' μm' : lambda_nm.toFixed(1) + ' nm') + ' (' + Math.round(lambda_ang).toLocaleString() + ' Å)';
    lResEl.style.color = color;
    clResEl.textContent = 'Photon Energy = ' + E_eV.toFixed(2) + ' eV | ' + band + ' (@ T = ' + T + ' K)';
    clResEl.style.color = color;
  }

  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter blackbody or stellar surface temperature in Kelvin.',
      'Inspect peak emission wavelength $\lambda_{\max} = b/T$ in nanometers and Angstroms, peak photon energy in electron-volts (eV), and electromagnetic band classification.'
    ],
    benefitTitle: 'Wilhelm Wien 1893 Thermal Radiation Displacement Law',
    benefitContent: 'Demonstrates that hotter objects radiate peak energy at shorter wavelengths ($\lambda_{\max} \propto 1/T$), explaining why cool stars glow red ($3,000\text{ K}$), medium stars shine yellow-white ($6,000\text{ K}$), and hot stars blaze blue-violet ($20,000\text{ K}$).',
    faqs: [{ q: 'Why did human vision evolve to see 400 to 700 nm wavelengths?', a: 'Because the Sun\'s surface temperature ($5,778\text{ K}$) emits its peak photon irradiance at $501.5\text{ nm}$ (green-yellow visible light).' }]
  },

  // 9. Planck Blackbody Spectral Radiance Calculator
  {
    slug: 'planck-blackbody-spectral-radiance-wavelength-calculator',
    name: 'Planck\'s Law Blackbody Spectral Radiance (B_λ(T) = 2hc² / (λ⁵·(e^(hc/λkT) - 1))) Calculator',
    description: 'Calculate spectral radiance B_λ(T) in W/(sr·m³), Rayleigh-Jeans classical ultraviolet catastrophe limit, and quantum spectral intensity across infrared, visible, and ultraviolet wavelengths.',
    category: 'Science',
    icon: 'text',
    keywords: ['planck law calculator', 'blackbody spectral radiance formula online', 'quantum blackbody radiation curve intensity calculator', 'planck radiation law ultraviolet catastrophe calculator', 'quantum physics stellar thermodynamics online'],
    order: 1168,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wavelength λ (nm) & Blackbody Temperature T (K)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pl-lambda">Wavelength (nm)</label>
          <input class="tool-textarea" id="pl-lambda" type="number" step="50" value="550" placeholder="550 nm (Green)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-temp">Temp T (K)</label>
          <input class="tool-textarea" id="pl-temp" type="number" step="250" value="5778" placeholder="5,778 K (Solar Surface)" />
        </div>
      </div>
      <div id="pl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pl-res-b" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Radiance B_λ = 2.63 × 10¹³ W / (sr · m³)</span>
            <span class="stat-label">Planck Spectral Radiance (B_λ(T))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pl-res-quant" style="color:var(--green-dark); font-weight:700;">Quantum Exponential Factor = 92.5 (Classical Rayleigh-Jeans fails by 46×)</span>
            <span class="stat-label">Quantum Energy Quantization vs Classical Physics</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('pl-lambda'), tEl = document.getElementById('pl-temp');
  const bResEl = document.getElementById('pl-res-b'), qResEl = document.getElementById('pl-res-quant');

  const h = 6.62607015e-34, c = 299792458, k_B = 1.380649e-23;

  function update() {
    const lambda_nm = parseFloat(lEl.value), T = parseFloat(tEl.value);
    if (isNaN(lambda_nm) || isNaN(T) || lambda_nm <= 0 || T <= 0) return;

    const lambda_m = lambda_nm * 1e-9;

    // Planck's Law: B_lambda = (2 * h * c^2) / ( lambda^5 * ( exp( (h*c)/(lambda * k_B * T) ) - 1 ) )
    const expTerm = (h * c) / (lambda_m * k_B * T);
    const expValue = Math.exp(expTerm);

    const B_lambda = (2.0 * h * Math.pow(c, 2)) / (Math.pow(lambda_m, 5) * (expValue - 1.0));

    // Classical Rayleigh-Jeans: B_RJ = 2 * c * k_B * T / lambda^4
    const B_RJ = (2.0 * c * k_B * T) / Math.pow(lambda_m, 4);
    const rj_ratio = B_RJ / B_lambda;

    bResEl.textContent = 'Radiance B_λ = ' + B_lambda.toExponential(2) + ' W / (sr · m³)';
    qResEl.textContent = 'B_λ = ' + (B_lambda / 1e12).toFixed(2) + ' kW/(sr·m²·nm) | Rayleigh-Jeans Error = ' + (rj_ratio >= 10 ? Math.round(rj_ratio) + '× Divergence' : rj_ratio.toFixed(2) + '×');
  }

  lEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter electromagnetic wavelength in nanometers (nm).',
      'Enter blackbody surface temperature in Kelvin.',
      'Inspect Planck spectral radiance $B_\lambda(T)$ and compare quantum curve behavior against classical Rayleigh-Jeans ultraviolet catastrophe.'
    ],
    benefitTitle: 'Max Planck 1900 Birth of Quantum Physics',
    benefitContent: 'By postulating that light energy is emitted in discrete quanta ($E = h\nu$), Planck solved the ultraviolet catastrophe and launched 20th-century quantum mechanics.',
    faqs: [{ q: 'What was the Ultraviolet Catastrophe?', a: 'Classical physics falsely predicted that blackbodies would emit infinite energy at short ultraviolet wavelengths; Planck\'s quantum exponential term resolved this divergence.' }]
  },

  // 10. Cosmological Redshift & Scale Factor Calculator
  {
    slug: 'cosmological-redshift-scale-factor-universe-age-calculator',
    name: 'Cosmological Redshift (1 + z = a₀ / a(t) = λ_obs / λ_emit) & Scale Factor Calculator',
    description: 'Calculate cosmological redshift (1 + z = a₀ / a(t) = λ_obs / λ_emit), cosmic scale factor a(t) relative to present day, temperature of the Cosmic Microwave Background (T(z) = 2.725·(1 + z) K), and universe expansion history.',
    category: 'Science',
    icon: 'text',
    keywords: ['cosmological redshift calculator', 'scale factor formula 1 plus z equals a0 over a online', 'cmb temperature redshift calculator kelvin', 'expansion of universe scale factor calculator', 'cosmology general relativity friedmann universe online'],
    order: 1169,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cosmological Redshift z (e.g. 0.5, 1.0, 6.0 Early Galaxies, 1100 CMB Recombination)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="cz-z">Redshift z</label>
        <input class="tool-textarea" id="cz-z" type="number" step="0.5" min="0" value="6.0" placeholder="6.0 (Early JWST Galaxy)" />
      </div>
      <div id="cz-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cz-res-scale" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Scale Factor a(t) = 0.143 (Universe was 1/7th current size)</span>
            <span class="stat-label">Cosmic Expansion Scale Factor (a(t) = 1 / (1 + z))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cz-res-cmb" style="color:var(--green-dark); font-weight:700;">CMB Temp T(z) = 19.08 K | Wavelength Stretched 7.00× (H-alpha 656 nm shifted to 4,594 nm IR)</span>
            <span class="stat-label">Thermal CMB Background Temperature & Spectral Line Stretch</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const zEl = document.getElementById('cz-z');
  const scResEl = document.getElementById('cz-res-scale'), cmResEl = document.getElementById('cz-res-cmb');

  const T_CMB_today = 2.7255; // K

  function update() {
    const z = parseFloat(zEl.value);
    if (isNaN(z) || z < 0) return;

    // Scale factor: a = 1 / (1 + z)
    const a = 1.0 / (1.0 + z);
    const stretch = 1.0 + z;

    // CMB temperature at redshift z: T(z) = T0 * (1 + z)  [K]
    const T_z = T_CMB_today * (1.0 + z);

    // Lyman-alpha (121.6 nm) and H-alpha (656.3 nm) shifted:
    const halpha_obs_nm = 656.3 * (1.0 + z);

    let era = '';
    if (z > 1000) era = 'RECOMBINATION EPOCH (z ~ 1100: Universe becomes transparent, CMB released)';
    else if (z > 6) era = 'REIONIZATION ERA (First stars and primeval galaxies formed)';
    else if (z > 1) era = 'COSMIC NOON (Peak star formation rate in the universe)';
    else era = 'MODERN COSMIC ERA (Dark energy accelerated expansion dominant)';

    scResEl.textContent = 'Scale Factor a(t) = ' + a.toFixed(3) + ' (Universe was 1/' + (1/a).toFixed(1) + ' its current size)';
    cmResEl.textContent = 'CMB Temp T(z) = ' + T_z.toFixed(2) + ' K | Stretch = ' + stretch.toFixed(2) + '× (H-α shifted to ' + Math.round(halpha_obs_nm) + ' nm | ' + era.split(' (')[0] + ')';
  }

  zEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter cosmological redshift z.',
      'Inspect cosmic scale factor $a(t) = 1/(1+z)$, CMB background temperature $T(z)$, and spectral photon wavelength stretching factor.'
    ],
    benefitTitle: 'Alexander Friedmann 1922 Cosmic Scale Factor',
    benefitContent: 'Cosmological redshift is not a Doppler shift through space, but rather the stretching of photon wavelengths as the fabric of spacetime expands during transit ($1+z = \frac{a_0}{a(t)}$).',
    faqs: [{ q: 'What was the temperature of the universe when the CMB was emitted (z ~ 1100)?', a: 'At $z \approx 1100$, the universe was $\sim 3,000\text{ K}$, cool enough for protons and electrons to combine into neutral hydrogen atoms.' }]
  },

  // 11. Jeans Instability Mass for Gravitational Star Collapse Calculator
  {
    slug: 'jeans-instability-mass-gravitational-collapse-star-formation-calculator',
    name: 'Jeans Instability Mass (M_J ∝ T^(3/2) / ρ^(1/2)) Star Formation Calculator',
    description: 'Calculate the minimum Jeans Mass (M_J = (5·k_B·T / (G·μ·m_H))^(3/2) · (3 / (4π·ρ))^(1/2)) in Solar Masses and Jeans Length λ_J in parsecs required for an interstellar molecular gas cloud to collapse under gravity into newborn stars.',
    category: 'Science',
    icon: 'text',
    keywords: ['jeans mass calculator', 'jeans instability formula mj online', 'interstellar cloud gravitational collapse star formation calculator', 'jeans length parsecs molecular cloud calculator', 'astrophysics star formation interstellar medium online'],
    order: 1170,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Molecular Cloud Temperature T (Kelvin, e.g. 10-30 K) & Number Density n (particles/cm³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="jn-temp">Cloud Temp T (K)</label>
          <input class="tool-textarea" id="jn-temp" type="number" step="5" value="15.0" placeholder="15.0 K (Cold Giant Molecular Cloud)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jn-dens">Density n (cm⁻³)</label>
          <input class="tool-textarea" id="jn-dens" type="number" step="1000" value="10000" placeholder="10,000 cm⁻³ (H₂ Gas)" />
        </div>
      </div>
      <div id="jn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="jn-res-mass" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Jeans Mass M_J = 4.72 M_sun</span>
            <span class="stat-label">Minimum Critical Gravitational Collapse Mass (M_J)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="jn-res-len" style="color:var(--green-dark); font-weight:700;">Jeans Length λ_J = 0.089 Parsecs (18,350 AU | Sound Speed c_s = 0.23 km/s)</span>
            <span class="stat-label">Critical Cloud Collapse Diameter & Thermal Sound Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('jn-temp'), nEl = document.getElementById('jn-dens');
  const msResEl = document.getElementById('jn-res-mass'), lnResEl = document.getElementById('jn-res-len');

  const k_B = 1.380649e-23, G = 6.67430e-11, m_H = 1.6735575e-27;
  const mu_mol = 2.3; // mean molecular weight for cold H2/He cloud
  const M_sun_kg = 1.98847e30;
  const pc_meters = 3.085677581e16;

  function update() {
    const T = parseFloat(tEl.value), n_cm3 = parseFloat(nEl.value);
    if (isNaN(T) || isNaN(n_cm3) || T <= 0 || n_cm3 <= 0) return;

    // Density rho = n * mu * m_H  [kg / m^3]
    const n_m3 = n_cm3 * 1e6;
    const rho = n_m3 * mu_mol * m_H;

    // Isothermal sound speed: c_s = sqrt( k_B * T / (mu * m_H) )  [m / s]
    const c_s = Math.sqrt((k_B * T) / (mu_mol * m_H));

    // Jeans Length: lambda_J = c_s * sqrt( pi / (G * rho) )  [meters]
    const lambda_J_m = c_s * Math.sqrt(Math.PI / (G * rho));
    const lambda_J_pc = lambda_J_m / pc_meters;
    const lambda_J_au = lambda_J_m / 1.495978707e11;

    // Jeans Mass: M_J = (4/3) * pi * rho * (lambda_J / 2)^3  [kg]
    const M_J_kg = (Math.PI / 6.0) * rho * Math.pow(lambda_J_m, 3);
    const M_J_sun = M_J_kg / M_sun_kg;

    msResEl.textContent = 'Jeans Mass M_J = ' + M_J_sun.toFixed(2) + ' M_sun';
    lnResEl.textContent = 'Jeans Length λ_J = ' + lambda_J_pc.toFixed(3) + ' pc (' + Math.round(lambda_J_au).toLocaleString() + ' AU | c_s = ' + (c_s/1000).toFixed(2) + ' km/s @ ' + T + ' K)';
  }

  tEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter interstellar molecular cloud temperature T in Kelvin (typically 10–30 K).',
      'Enter gas number density n in particles per $\text{cm}^3$ (typically $10^3\text{ to }10^5\text{ cm}^{-3}$).',
      'Inspect critical Jeans Mass $M_J$ in solar masses and Jeans Length $\lambda_J$ in parsecs.'
    ],
    benefitTitle: 'Sir James Jeans 1902 Gravitational Instability Criterion',
    benefitContent: 'When gas cloud mass exceeds the Jeans Mass ($M > M_J$), internal thermal pressure can no longer balance self-gravity, causing catastrophic gravitational collapse and stellar cluster birth.',
    faqs: [{ q: 'Why do cold, dense clouds collapse into stars while hot clouds do not?', a: 'Jeans mass scales as $M_J \propto T^{3/2} / \sqrt{\rho}$; cold dense gas has low thermal pressure, lowering the mass needed for gravity to trigger collapse.' }]
  },

  // 12. Gravitational Lensing Einstein Ring Radius Calculator
  {
    slug: 'gravitational-lensing-einstein-ring-angular-radius-calculator',
    name: 'Gravitational Lensing Einstein Ring Angular Radius (θ_E = √(4GM/c² · D_LS / (D_L·D_S))) Calculator',
    description: 'Calculate strong gravitational lensing Einstein ring angular radius (θ_E) in arcseconds, physical lens Einstein radius in kiloparsecs, and total gravitational mass of lensing galaxies and dark matter halos.',
    category: 'Science',
    icon: 'text',
    keywords: ['einstein ring calculator', 'gravitational lensing formula theta e online', 'strong gravitational lensing angular radius arcseconds calculator', 'dark matter halo mass gravitational lens calculator', 'astrophysics general relativity gravitational lensing online'],
    order: 1171,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Lens Mass M (Solar Masses M_sun), Lens Distance D_L (Mpc) & Source Distance D_S (Mpc)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gl-mass">Lens Mass (M_sun)</label>
          <input class="tool-textarea" id="gl-mass" type="number" step="1e11" value="1.0e12" placeholder="1.0 × 10¹² M_sun (Giant Elliptical)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gl-dl">Lens D_L (Mpc)</label>
          <input class="tool-textarea" id="gl-dl" type="number" step="100" value="1000.0" placeholder="1,000 Mpc" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gl-ds">Source D_S (Mpc)</label>
          <input class="tool-textarea" id="gl-ds" type="number" step="100" value="2000.0" placeholder="2,000 Mpc" />
        </div>
      </div>
      <div id="gl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gl-res-theta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Einstein Radius θ_E = 1.48 Arcseconds</span>
            <span class="stat-label">Strong Gravitational Lensing Angular Ring Radius (θ_E)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gl-res-phys" style="color:var(--green-dark); font-weight:700;">Physical Radius R_E = 7.18 kpc (23,410 Light-Years | D_LS = 1,000 Mpc)</span>
            <span class="stat-label">Physical Einstein Ring Radius at Deflector Plane</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('gl-mass'), dlEl = document.getElementById('gl-dl'), dsEl = document.getElementById('gl-ds');
  const thResEl = document.getElementById('gl-res-theta'), phResEl = document.getElementById('gl-res-phys');

  const G = 6.67430e-11, c = 299792458, M_sun_kg = 1.98847e30;
  const Mpc_to_m = 3.085677581e22;

  function update() {
    const M_sun = parseFloat(mEl.value), D_L_Mpc = parseFloat(dlEl.value), D_S_Mpc = parseFloat(dsEl.value);
    if (isNaN(M_sun) || isNaN(D_L_Mpc) || isNaN(D_S_Mpc) || M_sun <= 0 || D_L_Mpc <= 0 || D_S_Mpc <= D_L_Mpc) return;

    const D_LS_Mpc = D_S_Mpc - D_L_Mpc;

    const M_kg = M_sun * M_sun_kg;
    const D_L_m = D_L_Mpc * Mpc_to_m;
    const D_S_m = D_S_Mpc * Mpc_to_m;
    const D_LS_m = D_LS_Mpc * Mpc_to_m;

    // Einstein angle: theta_E = sqrt( (4 * G * M / c^2) * (D_LS / (D_L * D_S)) )  [radians]
    const theta_E_rad = Math.sqrt(((4.0 * G * M_kg) / Math.pow(c, 2)) * (D_LS_m / (D_L_m * D_S_m)));
    const theta_E_arcsec = theta_E_rad * (180.0 / Math.PI) * 3600.0;

    // Physical radius at lens plane: R_E = theta_E * D_L  [kpc]
    const R_E_kpc = (theta_E_rad * D_L_m) / (3.085677581e19);
    const R_E_ly = R_E_kpc * 3261.56;

    thResEl.textContent = 'Einstein Radius θ_E = ' + theta_E_arcsec.toFixed(2) + ' Arcseconds';
    phResEl.textContent = 'Physical Radius R_E = ' + R_E_kpc.toFixed(2) + ' kpc (' + Math.round(R_E_ly).toLocaleString() + ' Light-Years | Mass: ' + M_sun.toExponential(1) + ' M_sun)';
  }

  [mEl, dlEl, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total lensing galaxy/cluster mass in solar masses ($M_\odot$).',
      'Enter distance to lensing deflector galaxy $D_L$ in Megaparsecs (Mpc).',
      'Enter distance to background source galaxy $D_S$ in Megaparsecs ($D_S > D_L$).',
      'Inspect Einstein ring angular radius $\theta_E$ in arcseconds and physical radius in kiloparsecs (kpc).'
    ],
    benefitTitle: 'Albert Einstein 1936 Gravitational Light Deflection',
    benefitContent: 'General relativity shows that mass bends surrounding spacetime, creating natural cosmic telescopes that magnify distant early universe galaxies and map invisible dark matter halos.',
    faqs: [{ q: 'When does a perfect circular Einstein Ring appear?', a: 'An unbroken complete ring appears when the background source, foreground gravitational lens, and Earth observer align in exact coaxial symmetry.' }]
  },

  // 13. Gravitational Wave Strain & Binary Chirp Mass Calculator
  {
    slug: 'gravitational-wave-strain-chirp-mass-binary-black-hole-calculator',
    name: 'Gravitational Wave Chirp Mass (ℳ = (m₁·m₂)^(⅗) / (m₁ + m₂)^(⅕)) & Strain Calculator',
    description: 'Calculate binary black hole / neutron star merger Chirp Mass (ℳ in Solar Masses), gravitational wave frequency f_gw, and dimensionless spacetime strain amplitude h detected by LIGO/Virgo interferometers.',
    category: 'Science',
    icon: 'text',
    keywords: ['gravitational wave calculator', 'chirp mass formula binary black hole ligo online', 'gravitational wave strain amplitude h calculator', 'ligo virgo binary neutron star merger calculator', 'astrophysics gravitational waves general relativity online'],
    order: 1172,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Binary Component Masses m₁, m₂ (Solar Masses M_sun) & Luminosity Distance d_L (Mpc)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gw-m1">Mass m₁ (M_sun)</label>
          <input class="tool-textarea" id="gw-m1" type="number" step="5" value="36.0" placeholder="36.0 M_sun (GW150914)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-m2">Mass m₂ (M_sun)</label>
          <input class="tool-textarea" id="gw-m2" type="number" step="5" value="29.0" placeholder="29.0 M_sun" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gw-dist">Distance (Mpc)</label>
          <input class="tool-textarea" id="gw-dist" type="number" step="50" value="410.0" placeholder="410.0 Mpc (1.3 Gly)" />
        </div>
      </div>
      <div id="gw-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gw-res-chirp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Chirp Mass ℳ = 28.1 M_sun (Total = 65.0 M_sun)</span>
            <span class="stat-label">Binary Inspiral Chirp Mass (ℳ = (m₁m₂)^(3/5) / (m₁+m₂)^(1/5))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gw-res-strain" style="color:var(--green-dark); font-weight:700;">Strain Amplitude h ≈ 1.05 × 10⁻²¹ (LIGO Arm ΔL ≈ 4.2 × 10⁻¹⁸ m / 1/1000th proton diameter)</span>
            <span class="stat-label">Peak Spacetime Strain Amplitude (h) at Detector Plane</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('gw-m1'), m2El = document.getElementById('gw-m2'), dEl = document.getElementById('gw-dist');
  const chResEl = document.getElementById('gw-res-chirp'), stResEl = document.getElementById('gw-res-strain');

  const G = 6.67430e-11, c = 299792458, M_sun_kg = 1.98847e30;
  const Mpc_to_m = 3.085677581e22;

  function update() {
    const m1 = parseFloat(m1El.value), m2 = parseFloat(m2El.value), d_Mpc = parseFloat(dEl.value);
    if (isNaN(m1) || isNaN(m2) || isNaN(d_Mpc) || m1 <= 0 || m2 <= 0 || d_Mpc <= 0) return;

    const M_total = m1 + m2;

    // Chirp mass: M_chirp = (m1 * m2)^(3/5) / (m1 + m2)^(1/5)  [M_sun]
    const M_chirp = Math.pow(m1 * m2, 3.0 / 5.0) / Math.pow(M_total, 1.0 / 5.0);

    const M_chirp_kg = M_chirp * M_sun_kg;
    const r_m = d_Mpc * Mpc_to_m;

    // Peak GW frequency at ISCO: f_gw_peak = c^3 / ( 6^(3/2) * pi * G * M_total_kg )
    const M_total_kg = M_total * M_sun_kg;
    const f_peak = Math.pow(c, 3) / (Math.pow(6.0, 1.5) * Math.PI * G * M_total_kg);

    // Approximate strain amplitude at peak: h ~ (4 / r) * (G * M_chirp / c^2)^(5/3) * (pi * f / c)^(2/3)
    const h_strain = (4.0 / r_m) * Math.pow((G * M_chirp_kg) / Math.pow(c, 2), 5.0 / 3.0) * Math.pow((Math.PI * f_peak) / c, 2.0 / 3.0);

    // Displacement on 4km LIGO arm: Delta_L = h * L
    const delta_L = h_strain * 4000.0;

    chResEl.textContent = 'Chirp Mass ℳ = ' + M_chirp.toFixed(1) + ' M_sun (Total = ' + M_total.toFixed(1) + ' M_sun)';
    stResEl.textContent = 'Strain h ≈ ' + h_strain.toExponential(2) + ' (f_peak ≈ ' + Math.round(f_peak) + ' Hz | ΔL = ' + delta_L.toExponential(2) + ' m on 4 km arm)';
  }

  [m1El, m2El, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter binary component black hole/neutron star masses $m_1$ and $m_2$ in solar masses.',
      'Enter cosmological luminosity distance in Megaparsecs (Mpc).',
      'Inspect binary Chirp Mass ($\mathcal{M}$), peak gravitational wave frequency ($f_{\text{gw}}$), and dimensionless strain amplitude ($h$).'
    ],
    benefitTitle: 'Rainer Weiss, Kip Thorne & Barry Barish 2017 Nobel Prize Discovery',
    benefitContent: 'Chirp mass ($\mathcal{M}$) uniquely determines the frequency evolution ("chirp") of merging binary black holes, allowing gravitational wave detectors to measure cosmic distances directly without secondary calibration.',
    faqs: [{ q: 'What was the peak strain of the famous GW150914 event?', a: 'GW150914 produced a peak strain $h \approx 10^{-21}$, changing the length of LIGO\'s $4\text{ km}$ arms by less than one-thousandth the diameter of a proton.' }]
  },

  // 14. Planetary Equilibrium Temperature & Habitable Zone Calculator
  {
    slug: 'planetary-equilibrium-temperature-albedo-habitable-zone-calculator',
    name: 'Planetary Equilibrium Temperature (T_eq = T*·(1 - A)^(¼)·√(R* / 2d)) Calculator',
    description: 'Calculate exoplanet radiative equilibrium blackbody temperature (T_eq in K/°C), circumstellar Habitable Zone (Goldilocks Zone inner and outer boundaries in AU), and greenhouse surface warming.',
    category: 'Science',
    icon: 'text',
    keywords: ['planetary equilibrium temperature calculator', 'exoplanet habitable zone goldilocks calculator', 'planetary albedo stellar flux temperature calculator', 'blackbody equilibrium temperature earth mars exoplanet calculator', 'astrophysics astrobiology exoplanets online'],
    order: 1173,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Star Temp T* (K), Star Radius R* (R_sun), Orbital Distance d (AU) & Bond Albedo A (0 to 1)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pe-tstar">Star Temp T* (K)</label>
          <input class="tool-textarea" id="pe-tstar" type="number" step="100" value="5778" placeholder="5,778 K (Sun)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pe-rstar">Star Radius R*</label>
          <input class="tool-textarea" id="pe-rstar" type="number" step="0.1" value="1.0" placeholder="1.0 R_sun" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pe-dist">Distance d (AU)</label>
          <input class="tool-textarea" id="pe-dist" type="number" step="0.1" value="1.0" placeholder="1.0 AU (Earth)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pe-albedo">Albedo A</label>
          <input class="tool-textarea" id="pe-albedo" type="number" step="0.05" min="0" max="0.9" value="0.30" placeholder="0.30 (Earth Albedo)" />
        </div>
      </div>
      <div id="pe-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pe-res-teq" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Equilibrium T_eq = 255.0 K (-18.2 °C)</span>
            <span class="stat-label">Planetary Equilibrium Blackbody Temperature</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pe-res-hz" style="color:var(--green-dark); font-weight:700;">INSIDE HABITABLE ZONE (0.95 - 1.37 AU: Liquid surface water possible | +33 K Greenhouse → 15 °C)</span>
            <span class="stat-label">Circumstellar Habitable Zone & Atmospheric Greenhouse Offset</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('pe-tstar'), rEl = document.getElementById('pe-rstar');
  const dEl = document.getElementById('pe-dist'), aEl = document.getElementById('pe-albedo');
  const tqResEl = document.getElementById('pe-res-teq'), hzResEl = document.getElementById('pe-res-hz');

  const R_sun_AU = 0.00465047; // R_sun in AU

  function update() {
    const T_star = parseFloat(tEl.value), R_star_sun = parseFloat(rEl.value);
    const d_AU = parseFloat(dEl.value), A = parseFloat(aEl.value);

    if (isNaN(T_star) || isNaN(R_star_sun) || isNaN(d_AU) || isNaN(A) || T_star <= 0 || R_star_sun <= 0 || d_AU <= 0 || A < 0 || A >= 1) return;

    // Stellar luminosity relative to Sun: L / L_sun = (R / R_sun)^2 * (T / 5778)^4
    const L_rel = Math.pow(R_star_sun, 2) * Math.pow(T_star / 5778.0, 4);

    // Habitable zone inner (runaway greenhouse) and outer (maximum greenhouse) boundaries:
    const HZ_inner = Math.sqrt(L_rel / 1.1); // approx 0.95 AU for Sun
    const HZ_outer = Math.sqrt(L_rel / 0.53); // approx 1.37 AU for Sun

    // Equilibrium temperature: T_eq = T_star * (1 - A)^(1/4) * sqrt( R_star_AU / (2 * d_AU) )
    const R_star_AU = R_star_sun * R_sun_AU;
    const T_eq = T_star * Math.pow(1.0 - A, 0.25) * Math.sqrt(R_star_AU / (2.0 * d_AU));
    const T_eq_C = T_eq - 273.15;

    let hzStatus = '', color = '#22543d';
    if (d_AU >= HZ_inner && d_AU <= HZ_outer) {
      hzStatus = 'INSIDE HABITABLE ZONE (' + HZ_inner.toFixed(2) + ' - ' + HZ_outer.toFixed(2) + ' AU: Liquid water stable)';
      color = '#22543d';
    } else if (d_AU < HZ_inner) {
      hzStatus = 'TOO HOT / RUNAWAY GREENHOUSE (d < ' + HZ_inner.toFixed(2) + ' AU: Oceans vaporize like Venus)';
      color = '#c53030';
    } else {
      hzStatus = 'TOO COLD / GLOBAL GLACIATION (d > ' + HZ_outer.toFixed(2) + ' AU: Oceans freeze like Mars)';
      color = '#2563eb';
    }

    tqResEl.textContent = 'Equilibrium T_eq = ' + T_eq.toFixed(1) + ' K (' + (T_eq_C >= 0 ? '+' : '') + T_eq_C.toFixed(1) + ' °C)';
    tqResEl.style.color = color;
    hzResEl.textContent = hzStatus + ' [L* = ' + L_rel.toFixed(2) + ' L_sun, d = ' + d_AU + ' AU]';
    hzResEl.style.color = color;
  }

  [tEl, rEl, dEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter host star surface temperature T* in Kelvin and radius in solar radii.',
      'Enter orbital semimajor axis distance d in Astronomical Units (AU).',
      'Enter planetary Bond albedo A (0.30 for Earth).',
      'Inspect bare blackbody equilibrium temperature ($T_{\text{eq}}$) and circumstellar Goldilocks Habitable Zone boundaries.'
    ],
    benefitTitle: 'Planetary Radiative Thermal Equilibrium',
    benefitContent: 'Balancing absorbed stellar flux with emitted thermal infrared radiation determines whether a rocky world can support liquid oceans and life.',
    faqs: [{ q: 'Why is Earth\'s actual average temperature (+15°C) warmer than its equilibrium temp (-18°C)?', a: 'Atmospheric greenhouse gases ($H_2O, CO_2$) trap outgoing infrared radiation, providing $+33\text{ K}$ of natural greenhouse warming.' }]
  },

  // 15. Exoplanet Transit Photometric Depth Calculator
  {
    slug: 'exoplanet-transit-depth-light-curve-radius-calculator',
    name: 'Exoplanet Transit Photometric Depth (ΔF / F = (R_p / R*)²) Calculator',
    description: 'Calculate exoplanet transit light curve photometric dip depth (ΔF / F = (R_p / R*)²) in parts-per-thousand (ppt) and parts-per-million (ppm), and determine exoplanet radius R_p in Earth and Jupiter radii from Kepler/TESS transit data.',
    category: 'Science',
    icon: 'text',
    keywords: ['exoplanet transit depth calculator', 'transit photometry light curve formula delta f over f online', 'kepler tess planet radius calculator earth jupiter', 'exoplanet transit dip depth ppm calculator', 'astrophysics exoplanet detection transit method online'],
    order: 1174,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Transit Depth ΔF/F (%) or Host Star Radius R* (R_sun) & Planet Radius R_p (R_earth / R_jup)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tr-rp">Planet Radius R_p</label>
          <input class="tool-textarea" id="tr-rp" type="number" step="0.5" value="1.0" placeholder="1.0 (Earth Radius)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-runit">Planet Units</label>
          <select class="tool-textarea" id="tr-runit">
            <option value="earth" selected>Earth Radii (R_earth = 6,371 km)</option>
            <option value="jup">Jupiter Radii (R_jup = 71,492 km)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-rstar">Star Radius R*</label>
          <input class="tool-textarea" id="tr-rstar" type="number" step="0.1" value="1.0" placeholder="1.0 R_sun" />
        </div>
      </div>
      <div id="tr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tr-res-depth" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Transit Depth = 0.0084% (84.1 ppm)</span>
            <span class="stat-label">Photometric Light Curve Flux Drop (ΔF / F = (R_p / R*)²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tr-res-detect" style="color:var(--green-dark); font-weight:700;">Earth-Size Planet Transit (84 ppm: Detectable by Kepler / PLATO space telescopes)</span>
            <span class="stat-label">Photometric Detectability Threshold</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const rpEl = document.getElementById('tr-rp'), unEl = document.getElementById('tr-runit'), rsEl = document.getElementById('tr-rstar');
  const dpResEl = document.getElementById('tr-res-depth'), dtResEl = document.getElementById('tr-res-detect');

  const R_sun_km = 696340.0;
  const R_earth_km = 6371.0;
  const R_jup_km = 71492.0;

  function update() {
    const R_p_input = parseFloat(rpEl.value), isEarth = unEl.value === 'earth';
    const R_star_sun = parseFloat(rsEl.value);

    if (isNaN(R_p_input) || isNaN(R_star_sun) || R_p_input <= 0 || R_star_sun <= 0) return;

    // Convert planet radius to km:
    const R_p_km = isEarth ? R_p_input * R_earth_km : R_p_input * R_jup_km;
    const R_star_km = R_star_sun * R_sun_km;

    // Transit depth: Delta_F / F = ( R_p / R_star )^2
    const depth_fraction = Math.pow(R_p_km / R_star_km, 2);
    const depth_pct = depth_fraction * 100.0;
    const depth_ppm = depth_fraction * 1e6;

    let detStatus = '', color = '#22543d';
    if (depth_ppm >= 10000) {
      detStatus = 'HOT JUPITER TRANSIT (≥ 10,000 ppm / 1%: Easily detectable with amateur ground telescopes)';
      color = '#22543d';
    } else if (depth_ppm >= 1000) {
      detStatus = 'SUPER-EARTH / NEPTUNE (1,000 - 10,000 ppm: Detectable with professional ground surveys)';
      color = '#22543d';
    } else {
      detStatus = 'EARTH-ANALOG TRANSIT (80 - 500 ppm: Requires space telescopes like Kepler, TESS, PLATO)';
      color = '#2563eb';
    }

    dpResEl.textContent = 'Transit Depth = ' + depth_pct.toFixed(4) + '% (' + Math.round(depth_ppm).toLocaleString() + ' ppm)';
    dtResEl.textContent = detStatus;
    dtResEl.style.color = color;
  }

  [rpEl, rsEl].forEach(el => el.addEventListener('input', update));
  unEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter exoplanet physical radius in Earth or Jupiter radii.',
      'Enter host star radius in solar radii ($R_\odot$).',
      'Inspect photometric light curve transit drop depth in percent (%) and parts-per-million (ppm).'
    ],
    benefitTitle: 'NASA Kepler & TESS Transit Photometry Method',
    benefitContent: 'When an exoplanet transits across its host star\'s disc, it blocks light proportional to its cross-sectional area ($\Delta F/F = R_p^2 / R_*^2$), allowing precise measurement of planet radii.',
    faqs: [{ q: 'How deep is an Earth transit across the Sun?', a: 'Earth creates a transit depth of only $84\text{ ppm}$ ($0.0084\%$), requiring high-precision spaceborne CCD photometry to detect.' }]
  },

  // 16. Exoplanet Radial Velocity Doppler Wobble Semi-Amplitude Calculator
  {
    slug: 'exoplanet-radial-velocity-semi-amplitude-doppler-wobble-calculator',
    name: 'Exoplanet Radial Velocity Semi-Amplitude (K Doppler Wobble) Calculator',
    description: 'Calculate stellar reflex Doppler wobble velocity semi-amplitude (K in m/s or cm/s) induced by an orbiting exoplanet to evaluate radial velocity spectroscopic detection thresholds (HARPS, ESPRESSO).',
    category: 'Science',
    icon: 'text',
    keywords: ['radial velocity calculator', 'doppler wobble semi amplitude k formula exoplanet online', 'stellar reflex motion exoplanet mass calculator m s', 'harps espresso radial velocity precision calculator', 'astrophysics exoplanet spectroscopy online'],
    order: 1175,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Planet Mass M_p (Jupiter or Earth Mass), Host Star Mass M* (M_sun) & Orbital Period P (Days)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rv-mp">Planet Mass</label>
          <input class="tool-textarea" id="rv-mp" type="number" step="0.5" value="1.0" placeholder="1.0 M_jup" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rv-unit">Planet Mass Unit</label>
          <select class="tool-textarea" id="rv-unit">
            <option value="jup" selected>Jupiter Masses (M_jup = 317.8 M_earth)</option>
            <option value="earth">Earth Masses (M_earth = 5.97 × 10²⁴ kg)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="rv-mstar">Star Mass M*</label>
          <input class="tool-textarea" id="rv-mstar" type="number" step="0.1" value="1.0" placeholder="1.0 M_sun" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rv-period">Period P (Days)</label>
          <input class="tool-textarea" id="rv-period" type="number" step="5" value="4.23" placeholder="4.23 Days (51 Pegasi b)" />
        </div>
      </div>
      <div id="rv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rv-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Doppler Semi-Amplitude K = 55.9 m / s</span>
            <span class="stat-label">Stellar Reflex Radial Velocity Wobble (K)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rv-res-det" style="color:var(--green-dark); font-weight:700;">HOT JUPITER DETECTED (Easily resolved: Standard spectrograph threshold ~1 m/s)</span>
            <span class="stat-label">Spectroscopic Spectrograph Detectability Analysis</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mpEl = document.getElementById('rv-mp'), unEl = document.getElementById('rv-unit');
  const msEl = document.getElementById('rv-mstar'), prEl = document.getElementById('rv-period');
  const kResEl = document.getElementById('rv-res-k'), dtResEl = document.getElementById('rv-res-det');

  const G = 6.67430e-11, M_sun_kg = 1.98847e30;
  const M_jup_kg = 1.89813e27, M_earth_kg = 5.972e24;

  function update() {
    const M_p_input = parseFloat(mpEl.value), isJup = unEl.value === 'jup';
    const M_star_sun = parseFloat(msEl.value), P_days = parseFloat(prEl.value);

    if (isNaN(M_p_input) || isNaN(M_star_sun) || isNaN(P_days) || M_p_input <= 0 || M_star_sun <= 0 || P_days <= 0) return;

    const M_p_kg = isJup ? M_p_input * M_jup_kg : M_p_input * M_earth_kg;
    const M_star_kg = M_star_sun * M_sun_kg;
    const P_sec = P_days * 86400.0;

    // Radial velocity semi-amplitude for circular edge-on orbit (i=90 deg, e=0):
    // K = ( (2 * pi * G) / P )^(1/3) * ( M_p / (M_star + M_p)^(2/3) )  [m / s]
    const term1 = Math.pow((2.0 * Math.PI * G) / P_sec, 1.0 / 3.0);
    const term2 = M_p_kg / Math.pow(M_star_kg + M_p_kg, 2.0 / 3.0);
    const K_mps = term1 * term2;

    let det = '', color = '#22543d';
    if (K_mps >= 10.0) {
      det = 'HOT JUPITER (K > 10 m/s: Detected by Mayor & Queloz 1995 on 51 Pegasi b)';
      color = '#22543d';
    } else if (K_mps >= 1.0) {
      det = 'NEPTUNE / GIANT PLANET (1 - 10 m/s: Readily detected by HARPS / Keck)';
      color = '#22543d';
    } else if (K_mps >= 0.1) {
      det = 'SUPER-EARTH (10 - 100 cm/s: At detection limit of ESPRESSO on VLT)';
      color = '#ea580c';
    } else {
      det = 'EARTH-ANALOG WOBBLE (K ≈ 9 cm/s: Challenged by stellar magnetic activity/granulation)';
      color = '#c53030';
    }

    kResEl.textContent = 'Doppler Semi-Amplitude K = ' + (K_mps < 1.0 ? (K_mps * 100.0).toFixed(1) + ' cm / s' : K_mps.toFixed(2) + ' m / s');
    kResEl.style.color = color;
    dtResEl.textContent = det;
    dtResEl.style.color = color;
  }

  [mpEl, msEl, prEl].forEach(el => el.addEventListener('input', update));
  unEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter planet mass in Jupiter or Earth masses.',
      'Enter host star mass in solar masses ($M_\odot$).',
      'Enter orbital period in days.',
      'Inspect Doppler stellar wobble semi-amplitude K in m/s or cm/s.'
    ],
    benefitTitle: 'Michel Mayor & Didier Queloz 2019 Nobel Prize Discovery',
    benefitContent: 'Measuring periodic Doppler shifts in stellar spectral lines led to the discovery of 51 Pegasi b in 1995, proving the existence of exoplanets around Sun-like stars.',
    faqs: [{ q: 'What is Earth\'s Doppler reflex wobble on the Sun?', a: 'Earth induces a tiny radial velocity wobble on the Sun of only $8.9\text{ cm/s}$ with a 1-year period.' }]
  },

  // 17. Kepler's Third Law Binary Star System Mass Calculator
  {
    slug: 'kepler-third-law-binary-star-system-mass-calculator',
    name: 'Binary Star System Total Mass (M₁ + M₂ = a³ / P²) Kepler\'s Third Law Calculator',
    description: 'Calculate binary star system combined gravitational mass (M₁ + M₂ = a³ / P²) in Solar Masses from semi-major axis separation a in Astronomical Units (AU) and orbital period P in years.',
    category: 'Science',
    icon: 'text',
    keywords: ['binary star mass calculator', 'kepler third law binary star system formula m1 plus m2 equals a cubed over p squared online', 'astronomical binary orbit semi major axis mass calculator', 'stellar mass binary stars astrophysics calculator', 'astronomy celestial mechanics binary stars online'],
    order: 1176,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Semi-Major Axis Separation a (AU) & Orbital Period P (Years)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bp-a">Separation a (AU)</label>
          <input class="tool-textarea" id="bp-a" type="number" step="1" value="23.2" placeholder="23.2 AU (Alpha Centauri AB)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bp-p">Period P (Years)</label>
          <input class="tool-textarea" id="bp-p" type="number" step="5" value="79.9" placeholder="79.9 Years" />
        </div>
      </div>
      <div id="bp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bp-res-tot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Mass M₁ + M₂ = 1.96 M_sun</span>
            <span class="stat-label">Combined Binary Gravitational Mass (a³ / P²)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bp-res-indiv" style="color:var(--green-dark); font-weight:700;">Primary M₁ ≈ 1.08 M_sun | Secondary M₂ ≈ 0.88 M_sun (Alpha Centauri A & B System)</span>
            <span class="stat-label">Estimated Individual Component Stellar Masses</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('bp-a'), pEl = document.getElementById('bp-p');
  const totResEl = document.getElementById('bp-res-tot'), indResEl = document.getElementById('bp-res-indiv');

  function update() {
    const a_AU = parseFloat(aEl.value), P_yr = parseFloat(pEl.value);
    if (isNaN(a_AU) || isNaN(P_yr) || a_AU <= 0 || P_yr <= 0) return;

    // Kepler's Third Law in Solar/AU/Year units: M_total = a^3 / P^2  [M_sun]
    const M_total = Math.pow(a_AU, 3) / Math.pow(P_yr, 2);

    // Approximate 55/45 split for typical visual binary:
    const m1 = M_total * 0.55;
    const m2 = M_total * 0.45;

    totResEl.textContent = 'Total Mass M₁ + M₂ = ' + M_total.toFixed(2) + ' M_sun';
    indResEl.textContent = 'M₁ ≈ ' + m1.toFixed(2) + ' M_sun | M₂ ≈ ' + m2.toFixed(2) + ' M_sun (Separation: ' + a_AU + ' AU, Period: ' + P_yr + ' Years)';
  }

  aEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter binary orbital semi-major axis separation a in Astronomical Units (AU).',
      'Enter binary mutual orbital period P in Earth years.',
      'Inspect total combined stellar mass ($M_1 + M_2 = a^3/P^2$) in solar masses.'
    ],
    benefitTitle: 'Johannes Kepler & Isaac Newton Binary Mass Determination',
    benefitContent: 'Binary star orbits provide the only direct, model-independent empirical method to weigh stars in the universe.',
    faqs: [{ q: 'How are individual masses separated from the total mass?', a: 'By measuring the distance of each star from the common center of mass (barycenter) ($m_1 r_1 = m_2 r_2$).' }]
  },

  // 18. Synodic vs Sidereal Orbital Period Calculator
  {
    slug: 'synodic-vs-sidereal-orbital-period-planetary-alignment-calculator',
    name: 'Synodic vs Sidereal Orbital Period (1 / P_syn = |1/P₁ - 1/P₂|) Alignment Calculator',
    description: 'Calculate planetary synodic alignment period (1 / P_syn = |1/P₁ - 1/P₂|) in days and years between any two planets or moons for celestial conjunctions, oppositions, and launch windows.',
    category: 'Science',
    icon: 'text',
    keywords: ['synodic period calculator', 'sidereal vs synodic orbital period formula online', 'planetary opposition conjunction synodic cycle calculator', 'mars earth launch window synodic period calculator days', 'astronomy planetary alignment orbital mechanics online'],
    order: 1177,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Planet 1 Sidereal Period P₁ (Years, e.g. Earth = 1.0 yr) & Planet 2 Period P₂ (Years)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sy-p1">Earth Period P₁ (yr)</label>
          <input class="tool-textarea" id="sy-p1" type="number" step="0.1" value="1.00" placeholder="1.00 Year (Earth)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sy-p2">Target Period P₂ (yr)</label>
          <input class="tool-textarea" id="sy-p2" type="number" step="0.1" value="1.881" placeholder="1.881 Years (Mars)" />
        </div>
      </div>
      <div id="sy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sy-res-syn" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Synodic Period P_syn = 2.135 Years (780 Days)</span>
            <span class="stat-label">Time Between Successive Oppositions / Conjunctions</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sy-res-window" style="color:var(--green-dark); font-weight:700;">Earth-Mars Launch Window repeats every 25.6 Months (~780 Days)</span>
            <span class="stat-label">Orbital Resonance & Interplanetary Mission Launch Window</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('sy-p1'), p2El = document.getElementById('sy-p2');
  const snResEl = document.getElementById('sy-res-syn'), wnResEl = document.getElementById('sy-res-window');

  function update() {
    const P1 = parseFloat(p1El.value), P2 = parseFloat(p2El.value);
    if (isNaN(P1) || isNaN(P2) || P1 <= 0 || P2 <= 0 || P1 === P2) return;

    // 1 / P_syn = | 1/P1 - 1/P2 |
    const diff = Math.abs((1.0 / P1) - (1.0 / P2));
    const P_syn_yr = 1.0 / diff;
    const P_syn_days = P_syn_yr * 365.256;
    const P_syn_months = P_syn_yr * 12.0;

    snResEl.textContent = 'Synodic Period P_syn = ' + P_syn_yr.toFixed(3) + ' Years (' + Math.round(P_syn_days) + ' Days)';
    wnResEl.textContent = 'Alignment repeats every ' + P_syn_months.toFixed(1) + ' Months (' + Math.round(P_syn_days) + ' Days between successive close approaches)';
  }

  p1El.addEventListener('input', update);
  p2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter inner planet/observer sidereal orbit period $P_1$ in Earth years.',
      'Enter target planet sidereal orbit period $P_2$ in Earth years (e.g. 1.881 for Mars, 11.86 for Jupiter).',
      'Inspect synodic period in years, months, and days.'
    ],
    benefitTitle: 'Planetary Synodic Cycle Alignment',
    benefitContent: 'Governs the timing of optimal minimum-energy Hohmann transfer interplanetary launch windows (e.g. Earth to Mars every 26 months).',
    faqs: [{ q: 'What is the synodic period of Jupiter seen from Earth?', a: 'Earth catches up with Jupiter every $398.9\text{ days}$ ($1.092\text{ years}$).' }]
  },

  // 19. Telescope Resolving Power (Dawes & Rayleigh Criterion) Calculator
  {
    slug: 'telescope-resolving-power-dawes-rayleigh-criterion-calculator',
    name: 'Telescope Angular Resolving Power (Dawes R = 116 / D_mm & Rayleigh θ = 1.22·λ / D) Calculator',
    description: 'Calculate astronomical optical telescope angular resolving power in arcseconds using the Rayleigh diffraction criterion (θ = 1.22 · λ / D) and Dawes empirical limit for splitting binary double stars.',
    category: 'Science',
    icon: 'text',
    keywords: ['telescope resolving power calculator', 'rayleigh criterion formula theta equals 1.22 lambda over d online', 'dawes limit double star resolution calculator arcseconds', 'telescope aperture resolving power calculator mm inches', 'astronomy optics telescope resolution online'],
    order: 1178,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Telescope Aperture Diameter D (mm or inches) & Light Wavelength λ (nm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tl-ap">Aperture (mm)</label>
          <input class="tool-textarea" id="tl-ap" type="number" step="10" value="200.0" placeholder="200.0 mm (8-inch Dobsonian)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tl-wav">Wavelength λ (nm)</label>
          <input class="tool-textarea" id="tl-wav" type="number" step="50" value="550" placeholder="550 nm (Visible Green)" />
        </div>
      </div>
      <div id="tl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tl-res-dawes" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Dawes Limit R = 0.58 Arcseconds</span>
            <span class="stat-label">Dawes Empirical Binary Star Resolution Limit</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tl-res-ray" style="color:var(--green-dark); font-weight:700;">Rayleigh Criterion θ = 0.69 Arcseconds (Can resolve 1.3 km crater on Moon)</span>
            <span class="stat-label">Rayleigh Theoretical Diffraction Limit & Lunar Resolution</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const apEl = document.getElementById('tl-ap'), wvEl = document.getElementById('tl-wav');
  const dwResEl = document.getElementById('tl-res-dawes'), ryResEl = document.getElementById('tl-res-ray');

  function update() {
    const D_mm = parseFloat(apEl.value), lambda_nm = parseFloat(wvEl.value);
    if (isNaN(D_mm) || isNaN(lambda_nm) || D_mm <= 0 || lambda_nm <= 0) return;

    // Dawes Limit: R_arcsec = 116 / D_mm
    const R_dawes = 116.0 / D_mm;

    // Rayleigh Criterion: theta_rad = 1.22 * lambda / D
    const D_m = D_mm / 1000.0;
    const lambda_m = lambda_nm * 1e-9;
    const theta_rad = 1.22 * (lambda_m / D_m);
    const theta_arcsec = theta_rad * (180.0 / Math.PI) * 3600.0;

    // Lunar resolution at 384,400 km:
    const lunar_res_km = (theta_rad * 384400.0);

    dwResEl.textContent = 'Dawes Limit R = ' + R_dawes.toFixed(2) + ' Arcseconds';
    ryResEl.textContent = 'Rayleigh θ = ' + theta_arcsec.toFixed(2) + ' Arcsec | Lunar Feature Resolution ≈ ' + lunar_res_km.toFixed(1) + ' km (D = ' + D_mm + ' mm)';
  }

  apEl.addEventListener('input', update);
  wvEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter primary telescope objective lens/mirror aperture in millimeters.',
      'Enter observing wavelength in nanometers (550 nm for visible light).',
      'Inspect Dawes resolution limit and Rayleigh diffraction threshold in arcseconds.'
    ],
    benefitTitle: 'Lord Rayleigh & William R. Dawes Optical Resolution Criteria',
    benefitContent: 'Diffraction sets the ultimate physical limit on telescope sharpness ($\theta \propto \lambda/D$), explaining why giant ground telescopes (ELT 39m) and space telescopes require massive apertures.',
    faqs: [{ q: 'Why do ground telescopes rarely reach their diffraction limit?', a: 'Atmospheric turbulence ("seeing") typically limits ground telescope resolution to $\sim 0.5\text{ to }1.0\text{ arcseconds}$ unless adaptive optics are used.' }]
  },

  // 20. Telescope Magnification, Focal Ratio & Light Gathering Power Calculator
  {
    slug: 'telescope-magnification-focal-ratio-light-gathering-power-calculator',
    name: 'Telescope Magnification (M = f_scope / f_eye), Focal Ratio & Light Gathering Power Calculator',
    description: 'Calculate astronomical telescope visual magnification (M = f_scope / f_eye), optical Focal Ratio (f/N = f_scope / D), Light Gathering Power (LGP relative to 7mm human eye), and exit pupil diameter.',
    category: 'Science',
    icon: 'text',
    keywords: ['telescope magnification calculator', 'telescope focal ratio f number formula online', 'light gathering power lgp relative to human eye calculator', 'exit pupil eyepiece focal length telescope calculator', 'amateur astronomy optics telescope calculator online'],
    order: 1179,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Telescope Aperture D (mm), Telescope Focal Length f_scope (mm) & Eyepiece Focal Length f_eye (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="to-d">Aperture D (mm)</label>
          <input class="tool-textarea" id="to-d" type="number" step="10" value="203.0" placeholder="203.0 mm (8 inch)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="to-fscope">Focal Scope (mm)</label>
          <input class="tool-textarea" id="to-fscope" type="number" step="100" value="1000.0" placeholder="1,000 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="to-feye">Eyepiece (mm)</label>
          <input class="tool-textarea" id="to-feye" type="number" step="5" value="10.0" placeholder="10.0 mm" />
        </div>
      </div>
      <div id="to-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="to-res-mag" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Magnification = 100×</span>
            <span class="stat-label">Visual Telescopic Magnification (M = f_scope / f_eye)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="to-res-lgp" style="color:var(--green-dark); font-weight:700;">Light Gathering Power = 841× Human Eye | Focal Ratio = f/4.9 | Exit Pupil = 2.03 mm</span>
            <span class="stat-label">Light Gathering Power (vs 7mm Pupil) & Optical Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('to-d'), fsEl = document.getElementById('to-fscope'), feEl = document.getElementById('to-feye');
  const mgResEl = document.getElementById('to-res-mag'), lgResEl = document.getElementById('to-res-lgp');

  function update() {
    const D = parseFloat(dEl.value), f_scope = parseFloat(fsEl.value), f_eye = parseFloat(feEl.value);
    if (isNaN(D) || isNaN(f_scope) || isNaN(f_eye) || D <= 0 || f_scope <= 0 || f_eye <= 0) return;

    // Magnification: M = f_scope / f_eye
    const M = f_scope / f_eye;

    // Focal ratio: f/N = f_scope / D
    const f_ratio = f_scope / D;

    // Light gathering power compared to 7mm dark-adapted human eye pupil: LGP = ( D / 7 )^2
    const LGP = Math.pow(D / 7.0, 2);

    // Exit pupil: EP = D / M = f_eye / f_ratio  [mm]
    const exit_pupil = D / M;

    mgResEl.textContent = 'Magnification = ' + Math.round(M) + '×';
    lgResEl.textContent = 'LGP = ' + Math.round(LGP) + '× Eye | Focal Ratio = f/' + f_ratio.toFixed(1) + ' | Exit Pupil = ' + exit_pupil.toFixed(2) + ' mm';
  }

  [dEl, fsEl, feEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter telescope objective aperture diameter in millimeters.',
      'Enter telescope optical focal length in mm.',
      'Enter eyepiece focal length in mm.',
      'Inspect magnification power, optical focal ratio ($f/\#$), light gathering factor, and exit pupil diameter.'
    ],
    benefitTitle: 'Amateur Astronomy Optical Geometry',
    benefitContent: 'Light gathering power scales with the square of aperture ($LGP \propto D^2$), allowing large mirrors to reveal faint deep-sky nebulae and galaxies invisible to the human eye.',
    faqs: [{ q: 'What is the maximum useful magnification for a telescope?', a: 'Rule of thumb: maximum useful magnification is approximately $2\times$ the aperture diameter in millimeters ($2\times D_{\text{mm}}$).' }]
  },

  // 21. Lagrangian Equilibrium Points (L1 & L2) Calculator
  {
    slug: 'lagrangian-points-l1-l2-gravitational-equilibrium-calculator',
    name: 'Lagrangian Equilibrium Points (L₁ & L₂ Distance r ≈ R·(M₂ / 3M₁)^(⅓)) Calculator',
    description: 'Calculate celestial Lagrangian equilibrium point distances (L₁ and L₂ distance r ≈ R · (M₂ / 3M₁)^(1/3)) from secondary body for space telescopes (JWST at Sun-Earth L₂, SOHO at L₁) in astrodynamics.',
    category: 'Science',
    icon: 'text',
    keywords: ['lagrange points calculator', 'l1 l2 lagrangian distance formula r equals r times m2 over 3m1 online', 'jwst james webb l2 orbit distance calculator', 'soho solar observatory l1 lagrange point calculator', 'astrodynamics three body problem orbital mechanics online'],
    order: 1180,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Primary Mass M₁ (Sun), Secondary Mass M₂ (Earth) & Orbital Distance R (AU or km)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="lg-system">Three-Body System</label>
        <select class="tool-textarea" id="lg-system">
          <option value="sun_earth" selected>Sun - Earth System (R = 1.0 AU / 149.6 Million km)</option>
          <option value="earth_moon">Earth - Moon System (R = 384,400 km)</option>
          <option value="sun_jupiter">Sun - Jupiter System (R = 5.20 AU)</option>
        </select>
      </div>
      <div id="lg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lg-res-dist" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">L₁ / L₂ Distance r = 1,496,500 km (0.0100 AU)</span>
            <span class="stat-label">Equilibrium Distance from Secondary Body (r ≈ R·(M₂/3M₁)^(⅓))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lg-res-desc" style="color:var(--green-dark); font-weight:700;">L₂ = 1.50M km behind Earth (JWST Halo Orbit) | L₁ = 1.50M km Sunward (SOHO / DSCOVR)</span>
            <span class="stat-label">Spacecraft Mission Deployment Locations</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sysEl = document.getElementById('lg-system');
  const dstResEl = document.getElementById('lg-res-dist'), dsResEl = document.getElementById('lg-res-desc');

  function update() {
    const sys = sysEl.value;

    let M1 = 1.989e30, M2 = 5.972e24, R_km = 1.495978707e8, desc = '';

    if (sys === 'sun_earth') {
      M1 = 1.989e30; M2 = 5.972e24; R_km = 1.495978707e8;
      desc = 'Sun-Earth L₂ hosts JWST / Gaia; L₁ hosts SOHO solar observatory';
    } else if (sys === 'earth_moon') {
      M1 = 5.972e24; M2 = 7.342e22; R_km = 384400.0;
      desc = 'Earth-Moon L₁/L₂ gateway for lunar exploration and Artemis missions';
    } else {
      M1 = 1.989e30; M2 = 1.898e27; R_km = 7.785e8;
      desc = 'Sun-Jupiter L₄/L₅ host thousands of Trojan asteroids';
    }

    // Hill sphere / L1-L2 distance approx: r = R * ( M2 / (3 * M1) )^(1/3)
    const r_km = R_km * Math.pow(M2 / (3.0 * M1), 1.0 / 3.0);
    const r_AU = r_km / 1.495978707e8;

    dstResEl.textContent = 'L₁ / L₂ Distance r = ' + Math.round(r_km).toLocaleString() + ' km (' + r_AU.toFixed(4) + ' AU)';
    dsResEl.textContent = desc;
  }

  sysEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select gravitational three-body system (Sun-Earth, Earth-Moon, Sun-Jupiter).',
      'Inspect equilibrium distance from secondary body ($r \approx R \sqrt[3]{M_2 / 3M_1}$) in kilometers and AU.'
    ],
    benefitTitle: 'Joseph-Louis Lagrange 1772 Equilibrium Solutions',
    benefitContent: 'Lagrangian points are positions in space where gravitational forces of two large bodies combine with centrifugal force to create equilibrium parking zones for spacecraft like the James Webb Space Telescope (JWST).',
    faqs: [{ q: 'Why is JWST placed at Sun-Earth L2 instead of low Earth orbit?', a: 'At L2 ($1.5\text{ million km}$ from Earth), Earth and Sun remain in the same direction, allowing a single sunshield to permanently keep instruments at $-233^\circ\text{C}$ ($40\text{ K}$).' }]
  },

  // 22. Equation of Time & Solar Analemma Calculator
  {
    slug: 'apparent-solar-time-equation-of-time-analemma-calculator',
    name: 'Equation of Time (EoT = Apparent Solar Time - Mean Solar Time) Analemma Calculator',
    description: 'Calculate the astronomical Equation of Time (EoT in minutes) and solar declination across any day of the year to convert Sundial Apparent Solar Time to Standard Clock Mean Solar Time.',
    category: 'Science',
    icon: 'text',
    keywords: ['equation of time calculator', 'eot solar time sundial clock difference formula online', 'solar analemma equation of time calculator minutes', 'sundial to clock time converter calculator', 'astronomy solar geometry analemma online'],
    order: 1181,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Day of the Year N (1 to 365, e.g. Day 308 for Nov 3 Peak +16.4 min)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="eot-day">Day of the Year (1 - 365)</label>
        <input class="tool-textarea" id="eot-day" type="number" step="1" min="1" max="365" value="308" placeholder="308 (November 3 - Maximum +16.4 min)" />
      </div>
      <div id="eot-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eot-res-eot" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Equation of Time = +16.4 Minutes</span>
            <span class="stat-label">Sundial vs Clock Discrepancy (EoT = Solar Time - Mean Time)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eot-res-dec" style="color:var(--green-dark); font-weight:700;">Sundial is 16.4 min FAST | Solar Declination δ = -15.1° (Southern Sky)</span>
            <span class="stat-label">Solar Clock Adjustment & Declination Angle</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('eot-day');
  const eoResEl = document.getElementById('eot-res-eot'), dcResEl = document.getElementById('eot-res-dec');

  function update() {
    const N = parseInt(dEl.value, 10);
    if (isNaN(N) || N < 1 || N > 365) return;

    // Angle B = 360/365 * (N - 81)  [degrees -> radians]
    const B_rad = ((360.0 / 365.0) * (N - 81) * Math.PI) / 180.0;

    // Spencer / Smart empirical formula for Equation of Time in minutes:
    // EoT = 9.87 * sin(2B) - 7.53 * cos(B) - 1.5 * sin(B)  [minutes]
    const EoT_min = 9.87 * Math.sin(2.0 * B_rad) - 7.53 * Math.cos(B_rad) - 1.5 * Math.sin(B_rad);

    // Solar declination approx: delta = 23.45 * sin( 360/365 * (284 + N) )  [degrees]
    const dec_angle_rad = ((360.0 / 365.0) * (284 + N) * Math.PI) / 180.0;
    const dec_deg = 23.45 * Math.sin(dec_angle_rad);

    const sign = EoT_min >= 0 ? '+' : '';
    const status = EoT_min >= 0 ? 'Sundial is ' + Math.abs(EoT_min).toFixed(1) + ' min FAST' : 'Sundial is ' + Math.abs(EoT_min).toFixed(1) + ' min SLOW';

    eoResEl.textContent = 'Equation of Time = ' + sign + EoT_min.toFixed(1) + ' Minutes';
    dcResEl.textContent = status + ' | Solar Declination δ = ' + (dec_deg >= 0 ? '+' : '') + dec_deg.toFixed(1) + '° (Day ' + N + ')';
  }

  dEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter day of the year N from 1 to 365 (e.g., Feb 11 is ~Day 42, Nov 3 is ~Day 308).',
      'Inspect Equation of Time in minutes ($EoT$) and solar declination angle.'
    ],
    benefitTitle: 'Solar Analemma Figure-8 Geometry',
    benefitContent: 'Caused by Earth\'s orbital eccentricity ($e=0.0167$) and axial tilt ($\epsilon = 23.45^\circ$), sundials run up to 16.4 minutes ahead in November and 14.2 minutes behind in February compared to uniform clock time.',
    faqs: [{ q: 'On what four dates during the year is the Equation of Time exactly zero?', a: 'Around April 15, June 13, September 1, and December 25, sundials match standard clock time exactly ($EoT = 0$).' }]
  },

  // 23. Stellar Spectral Classification & HR Diagram Color Index Calculator
  {
    slug: 'stellar-spectral-classification-hr-diagram-color-index-calculator',
    name: 'Stellar Spectral Classification (OBAFGKM Sequence) & (B - V) Color Index Calculator',
    description: 'Classify stellar Morgan-Keenan spectral types (O, B, A, F, G, K, M) and Hertzsprung-Russell (H-R) diagram position from effective surface temperature T_eff in Kelvin or astronomical (B - V) color index.',
    category: 'Science',
    icon: 'text',
    keywords: ['stellar spectral classification calculator', 'obafgkm star spectral type calculator', 'b minus v color index star temperature calculator', 'hertzsprung russell hr diagram stellar class calculator', 'astronomy stellar classification online'],
    order: 1182,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Stellar Effective Surface Temperature T_eff (Kelvin, 2,500 K to 40,000 K)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="sp-temp">Surface Temp T_eff (K)</label>
        <input class="tool-textarea" id="sp-temp" type="number" step="500" value="5778" placeholder="5,778 K (Sun)" />
      </div>
      <div id="sp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-class" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Spectral Class: G2V (Yellow Dwarf)</span>
            <span class="stat-label">Morgan-Keenan (MK) Stellar Spectral Classification</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-bv" style="color:var(--green-dark); font-weight:700;">Color Index (B - V) = +0.65 | Prominent Lines: Ca II (H & K), Neutral Metals, Ionized Metals</span>
            <span class="stat-label">Astronomical (B - V) Color Index & Dominant Spectral Absorption Lines</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tEl = document.getElementById('sp-temp');
  const clResEl = document.getElementById('sp-res-class'), bvResEl = document.getElementById('sp-res-bv');

  function update() {
    const T = parseFloat(tEl.value);
    if (isNaN(T) || T <= 0) return;

    // Ballesteros formula: B - V = -0.72 + 0.46 * log10(T) ... simplified empirical fit:
    // B - V approx ( 4600 * (1/(T - 500)) - 0.25 )
    let BV = (8540.0 / T) - 0.72;
    BV = Math.max(-0.35, Math.min(1.80, BV));

    let spec = '', lines = '', color = '#22543d';
    if (T >= 30000) { spec = 'O-Type (Blazing Blue Supergiant)'; lines = 'Ionized Helium (He II), Strong UV continuum'; color = '#2563eb'; }
    else if (T >= 10000) { spec = 'B-Type (Blue-White Star - Rigel/Spica)'; lines = 'Neutral Helium (He I), Strong Balmer Hydrogen'; color = '#2563eb'; }
    else if (T >= 7500) { spec = 'A-Type (White Star - Sirius/Vega)'; lines = 'Strongest Balmer Hydrogen (H-alpha, H-beta, H-gamma)'; color = '#2563eb'; }
    else if (T >= 6000) { spec = 'F-Type (Yellow-White Star - Procyon)'; lines = 'Ionized Calcium Ca II, Weakening Hydrogen'; color = '#22543d'; }
    else if (T >= 5200) { spec = 'G-Type (Yellow Dwarf - Sun / Alpha Centauri A)'; lines = 'Strong Ca II H&K lines, Neutral Metals (Fe I, Mg I)'; color = '#22543d'; }
    else if (T >= 3700) { spec = 'K-Type (Orange Star - Arcturus/Aldebaran)'; lines = 'Neutral Metal Lines Dominant, Weak Hydrogen'; color = '#ea580c'; }
    else { spec = 'M-Type (Red Dwarf / Red Supergiant - Betelgeuse/Proxima)'; lines = 'Titanium Oxide (TiO) Molecular Bands, Neutral Atoms'; color = '#c53030'; }

    clResEl.textContent = 'Spectral Class: ' + spec;
    clResEl.style.color = color;
    bvResEl.textContent = 'Color (B - V) ≈ ' + (BV >= 0 ? '+' : '') + BV.toFixed(2) + ' | Spectral Lines: ' + lines;
    bvResEl.style.color = color;
  }

  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter stellar effective surface temperature in Kelvin.',
      'Inspect Morgan-Keenan spectral classification (O, B, A, F, G, K, M), (B - V) color index, and dominant spectral absorption features.'
    ],
    benefitTitle: 'Annie Jump Cannon & Harvard Stellar Classification',
    benefitContent: 'Standardized the Harvard spectral sequence ("Oh Be A Fine Girl/Guy, Kiss Me"), revealing that differences in stellar spectra reflect temperature rather than chemical composition variations.',
    faqs: [{ q: 'Why do A-type stars have the strongest hydrogen absorption lines?', a: 'At $\sim 10,000\text{ K}$, hydrogen atoms have electrons populated in the $n=2$ energy level optimal for visible Balmer series absorption.' }]
  },

  // 24. Interstellar Reddening & Dust Extinction Calculator
  {
    slug: 'interstellar-reddening-color-excess-extinction-calculator',
    name: 'Interstellar Reddening Color Excess (E(B - V)) & Dust Extinction (A_V = R_V·E(B - V)) Calculator',
    description: 'Calculate interstellar dust extinction in magnitudes (A_V = R_V · E(B - V)) and true de-reddened stellar magnitude from observed vs intrinsic color excess E(B - V) in observational astrophysics.',
    category: 'Science',
    icon: 'text',
    keywords: ['interstellar extinction calculator', 'color excess formula e b minus v online', 'interstellar reddening dust extinction a_v calculator', 'total to selective extinction ratio r_v calculator', 'observational astronomy interstellar dust online'],
    order: 1183,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Observed (B - V)_obs, Intrinsic (B - V)₀ & Extinction Ratio R_V (Standard 3.1 Milky Way)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rd-bvobs">Observed (B-V)</label>
          <input class="tool-textarea" id="rd-bvobs" type="number" step="0.1" value="0.85" placeholder="+0.85 (Reddened)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-bv0">Intrinsic (B-V)₀</label>
          <input class="tool-textarea" id="rd-bv0" type="number" step="0.1" value="0.15" placeholder="+0.15 (True Star Color)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rd-rv">Extinction R_V</label>
          <input class="tool-textarea" id="rd-rv" type="number" step="0.1" value="3.1" placeholder="3.1 (Standard Dust)" />
        </div>
      </div>
      <div id="rd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rd-res-av" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Visual Extinction A_V = 2.17 Magnitudes</span>
            <span class="stat-label">Total Interstellar Dust Visual Extinction (A_V = R_V · E(B-V))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rd-res-ebv" style="color:var(--green-dark); font-weight:700;">Color Excess E(B - V) = 0.70 mag | Star dimmed by 7.38× due to interstellar dust</span>
            <span class="stat-label">Selective Extinction & Transmitted Light Dimming Factor</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const obsEl = document.getElementById('rd-bvobs'), b0El = document.getElementById('rd-bv0'), rvEl = document.getElementById('rd-rv');
  const avResEl = document.getElementById('rd-res-av'), ebResEl = document.getElementById('rd-res-ebv');

  function update() {
    const BV_obs = parseFloat(obsEl.value), BV_0 = parseFloat(b0El.value), R_V = parseFloat(rvEl.value);
    if (isNaN(BV_obs) || isNaN(BV_0) || isNaN(R_V) || R_V <= 0) return;

    // Color excess: E(B - V) = (B - V)_obs - (B - V)_0  [magnitudes]
    const E_BV = BV_obs - BV_0;

    // Visual extinction: A_V = R_V * E(B - V)  [magnitudes]
    const A_V = R_V * E_BV;

    // Light dimming factor: 10^(0.4 * A_V)
    const dim_factor = Math.pow(10.0, 0.4 * A_V);

    avResEl.textContent = 'Visual Extinction A_V = ' + A_V.toFixed(2) + ' Magnitudes';
    ebResEl.textContent = 'Color Excess E(B - V) = ' + E_BV.toFixed(2) + ' mag | Star dimmed by ' + dim_factor.toFixed(2) + '× (True mag = V_obs - ' + A_V.toFixed(2) + ')';
  }

  [obsEl, b0El, rvEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter observed apparent color index $(B - V)_{\text{obs}}$.',
      'Enter true unreddened intrinsic color index $(B - V)_0$.',
      'Enter total-to-selective extinction ratio $R_V$ (standard 3.1 in diffuse Milky Way interstellar medium).',
      'Inspect total visual extinction $A_V$ in magnitudes and flux dimming factor.'
    ],
    benefitTitle: 'Robert J. Trumpler 1930 Discovery of Interstellar Dust',
    benefitContent: 'Sub-micron interstellar dust grains scatter blue light more efficiently than red light (Rayleigh scattering), causing distant stars to appear both redder and dimmer than their true brightness.',
    faqs: [{ q: 'Why is infrared astronomy effective at peering through dust clouds?', a: 'Infrared wavelengths are much longer than dust grain sizes ($\lambda \gg a$), passing cleanly through dense nebulae with minimal extinction ($A_K \approx 0.1 A_V$).' }]
  },

  // 25. Relativistic Beaming & Doppler Boosting (Blazar Jet) Calculator
  {
    slug: 'relativistic-beaming-doppler-boosting-blazar-jet-calculator',
    name: 'Relativistic Doppler Beaming Factor (δ = 1 / [γ·(1 - β·cos θ)]) Blazar Jet Calculator',
    description: 'Calculate relativistic beaming Doppler factor (δ = 1 / [γ · (1 - β · cos θ)]), Lorentz factor γ, apparent superluminal velocity β_app, and flux boosting (S_obs = S₀ · δ^(3 + α)) for active galactic nuclei (AGN) relativistic jets.',
    category: 'Science',
    icon: 'text',
    keywords: ['relativistic beaming calculator', 'doppler boosting factor delta formula blazar online', 'apparent superluminal motion velocity calculator', 'relativistic jet lorentz factor agn calculator', 'high energy astrophysics relativistic jets online'],
    order: 1184,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Jet Bulk Velocity β = v / c (e.g. 0.990) & Viewing Angle θ (° to line of sight)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rb-beta">Jet Velocity β (v/c)</label>
          <input class="tool-textarea" id="rb-beta" type="number" step="0.01" min="0.5" max="0.999" value="0.990" placeholder="0.990 c (Lorentz γ ≈ 7)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rb-theta">Viewing Angle θ (°)</label>
          <input class="tool-textarea" id="rb-theta" type="number" step="2" min="1" max="90" value="5.0" placeholder="5.0° (Blazar Alignment)" />
        </div>
      </div>
      <div id="rb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rb-res-delta" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Doppler Factor δ = 10.22 (Massive Boosting)</span>
            <span class="stat-label">Relativistic Doppler Boosting Factor (δ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rb-res-boost" style="color:var(--green-dark); font-weight:700;">Apparent Velocity β_app = 6.22 c (Superluminal Motion!) | Flux Boost = 4.2 × 10⁴× (42,000× Brighter)</span>
            <span class="stat-label">Apparent Superluminal Speed & Total Relativistic Flux Amplification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('rb-beta'), thEl = document.getElementById('rb-theta');
  const dlResEl = document.getElementById('rb-res-delta'), btResEl = document.getElementById('rb-res-boost');

  function update() {
    const beta = parseFloat(bEl.value), theta_deg = parseFloat(thEl.value);
    if (isNaN(beta) || isNaN(theta_deg) || beta <= 0 || beta >= 1 || theta_deg < 0 || theta_deg > 90) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;

    // Lorentz factor gamma = 1 / sqrt(1 - beta^2)
    const gamma = 1.0 / Math.sqrt(1.0 - Math.pow(beta, 2));

    // Doppler factor delta = 1 / [ gamma * ( 1 - beta * cos(theta) ) ]
    const delta = 1.0 / (gamma * (1.0 - beta * Math.cos(theta_rad)));

    // Apparent transverse velocity: beta_app = (beta * sin(theta)) / ( 1 - beta * cos(theta) )
    const beta_app = (beta * Math.sin(theta_rad)) / (1.0 - beta * Math.cos(theta_rad));

    // Flux boosting factor approx: S_obs / S0 = delta^(3 + alpha) where spectral index alpha ~ 0.7 => delta^3.7
    const flux_boost = Math.pow(delta, 3.7);

    dlResEl.textContent = 'Doppler Factor δ = ' + delta.toFixed(2) + ' (Lorentz γ = ' + gamma.toFixed(2) + ')';
    btResEl.textContent = 'Apparent Speed = ' + beta_app.toFixed(2) + ' c (' + (beta_app > 1.0 ? 'SUPERLUMINAL ILLUSION' : 'Subluminal') + ') | Flux Boost = ' + (flux_boost >= 1000 ? flux_boost.toExponential(2) : flux_boost.toFixed(1)) + '×';
  }

  bEl.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter relativistic plasma jet bulk velocity $\beta = v/c$ (e.g. 0.990c).',
      'Enter viewing angle $\theta$ in degrees relative to the observer\'s line of sight.',
      'Inspect Doppler boosting factor $\delta$, apparent superluminal velocity ($\beta_{\text{app}} > 1$), and total flux amplification.'
    ],
    benefitTitle: 'Martin Rees 1966 Relativistic Beaming & Superluminal Motion',
    benefitContent: 'When a relativistic jet points nearly directly at Earth ($\theta < 10^\circ$), relativistic aberration and Doppler shifting beam radiation into a tight forward cone, boosting blazar brightness by thousands of times and creating apparent faster-than-light transverse speeds.',
    faqs: [{ q: 'Does superluminal motion violate Einstein\'s Special Relativity?', a: 'No; it is an optical projection illusion caused by the jet catching up with its own emitted light as it approaches Earth.' }]
  }
];

pack41Tools.forEach(createTool);
console.log('Pack 41 complete: ' + pack41Tools.length + ' tools created.');
