const { createTool } = require('./generate-curated-tools.cjs');

// Suite OO: 5 Tools in Astrodynamics, Rocket Propulsion & Orbital Mechanics to reach 515 tools
const toolsSuiteOO = [
  // 1. Hohmann Transfer Orbit Delta-V (Δv) Calculator
  {
    slug: 'hohmann-transfer-orbit-delta-v-calculator',
    name: 'Hohmann Transfer Orbit Delta-V (Δv) Calculator',
    description: 'Calculate total velocity change (Δv_tot = Δv₁ + Δv₂) and one-way transfer transit time for minimum-energy elliptic orbital transfers around Earth and the Sun.',
    category: 'Science',
    icon: 'text',
    keywords: ['hohmann transfer orbit calculator', 'delta v orbital transfer calculator', 'orbital maneuver velocity change formula', 'leo to geo delta v calculator', 'interplanetary hohmann transit time online'],
    order: 386,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Orbit Radius (r₁) & Final Orbit Radius (r₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hoh-body">Central Body</label>
          <select class="tool-textarea" id="hoh-body">
            <option value="398600.4418" selected>Earth (μ = 398,600 km³/s²)</option>
            <option value="132712440018">Sun (μ = 1.327 × 10¹¹ km³/s²)</option>
            <option value="4902.8">Moon (μ = 4,902.8 km³/s²)</option>
            <option value="42828.3">Mars (μ = 42,828 km³/s²)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hoh-r1">Initial Radius r₁ (km)</label>
          <input class="tool-textarea" id="hoh-r1" type="number" step="any" value="6678" placeholder="6678 km (300 km LEO)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hoh-r2">Final Radius r₂ (km)</label>
          <input class="tool-textarea" id="hoh-r2" type="number" step="any" value="42164" placeholder="42164 km (Geostationary GEO)" />
        </div>
      </div>
      <div id="hoh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hoh-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3.856 km / s</span>
            <span class="stat-label">Total Required Delta-V (Δv_tot)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hoh-res-time" style="font-weight:700;">5.27 Hours</span>
            <span class="stat-label">Transfer Transit Duration (t_trans)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hoh-res-splits">Δv₁ = 2.427 km/s, Δv₂ = 1.429 km/s</span>
            <span class="stat-label">Burn Velocity Impulses</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('hoh-body'), r1El = document.getElementById('hoh-r1'), r2El = document.getElementById('hoh-r2');
  const dvResEl = document.getElementById('hoh-res-dv'), tResEl = document.getElementById('hoh-res-time'), sResEl = document.getElementById('hoh-res-splits');

  function update() {
    const mu = parseFloat(bEl.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(mu) || isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0 || r1 === r2) return;

    // Semi-major axis of transfer ellipse a_trans = (r1 + r2) / 2
    const aTrans = (r1 + r2) / 2;

    // Initial circular velocity v1 = sqrt(mu / r1)
    const v1 = Math.sqrt(mu / r1);
    // Periapsis velocity on transfer ellipse v_t1 = sqrt(mu * (2/r1 - 1/aTrans))
    const vt1 = Math.sqrt(mu * ((2 / r1) - (1 / aTrans)));
    const dv1 = Math.abs(vt1 - v1);

    // Final circular velocity v2 = sqrt(mu / r2)
    const v2 = Math.sqrt(mu / r2);
    // Apoapsis velocity on transfer ellipse v_t2 = sqrt(mu * (2/r2 - 1/aTrans))
    const vt2 = Math.sqrt(mu * ((2 / r2) - (1 / aTrans)));
    const dv2 = Math.abs(v2 - vt2);

    const totalDv = dv1 + dv2;

    // Transfer time = half of orbital period = pi * sqrt(aTrans^3 / mu)
    const timeSec = Math.PI * Math.sqrt(Math.pow(aTrans, 3) / mu);
    const timeHours = timeSec / 3600;
    const timeDays = timeHours / 24;

    dvResEl.textContent = totalDv.toFixed(3) + ' km / s (' + (totalDv * 1000).toFixed(0) + ' m/s)';
    tResEl.textContent = timeDays >= 2.0 ? timeDays.toFixed(1) + ' Days (' + timeHours.toFixed(1) + ' hrs)' : timeHours.toFixed(2) + ' Hours';
    sResEl.textContent = 'Δv₁ = ' + dv1.toFixed(3) + ' km/s, Δv₂ = ' + dv2.toFixed(3) + ' km/s';
  }

  [bEl, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Select central gravitational body (Earth, Sun, Moon, or Mars).',
      'Enter initial circular orbit radius r₁ and target final orbit radius r₂ in kilometers from center of mass.',
      'Inspect total mission Delta-V (Δv) budget, individual burn impulses (Δv₁, Δv₂), and one-way orbital transit time.'
    ],
    benefitTitle: 'Walter Hohmann\'s 1925 Optimal Orbital Transfer',
    benefitContent: 'The Hohmann transfer orbit uses an elliptical tangent trajectory that is simultaneously tangent to both the departure and destination circular orbits, minimizing total chemical propellant consumption.',
    faqs: [{ q: 'What is the Delta-V needed from LEO (300 km) to GEO (35,786 km)?', a: 'Δv_tot ≈ 3.86 km/s (Δv₁ ≈ 2.43 km/s for GTO injection and Δv₂ ≈ 1.43 km/s for GEO circularization and plane alignment).' }]
  },

  // 2. Konstantin Tsiolkovsky Rocket Equation Calculator
  {
    slug: 'tsiolkovsky-rocket-equation-calculator',
    name: 'Tsiolkovsky Rocket Equation & Propellant Mass Calculator',
    description: 'Calculate rocket velocity change capability (Δv = I_sp · g₀ · ln(m₀ / m_f)) and required propellant mass fraction from specific impulse (I_sp).',
    category: 'Science',
    icon: 'text',
    keywords: ['tsiolkovsky rocket equation calculator', 'rocket delta v calculator', 'specific impulse propellant mass fraction', 'ideal rocket equation isp g0 ln m0 mf', 'spacecraft propulsion calculator online'],
    order: 387,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Specific Impulse (I_sp in seconds), Dry Mass & Wet Mass',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rk-isp">Specific Impulse I_sp (s)</label>
          <input class="tool-textarea" id="rk-isp" type="number" step="any" value="311" placeholder="311 s (Kerosene Merlin 1D)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-m0">Initial Wet Mass m₀ (kg)</label>
          <input class="tool-textarea" id="rk-m0" type="number" step="any" value="549054" placeholder="549,054 kg (Falcon 9)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rk-mf">Dry Burnout Mass m_f (kg)</label>
          <input class="tool-textarea" id="rk-mf" type="number" step="any" value="38500" placeholder="38,500 kg" />
        </div>
      </div>
      <div id="rk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rk-res-dv" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.106 km / s</span>
            <span class="stat-label">Total Delta-V Capability (Δv)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rk-res-prop" style="font-weight:700;">93.0% Propellant Fraction</span>
            <span class="stat-label">Propellant Mass (510.5 Tons)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ispEl = document.getElementById('rk-isp'), m0El = document.getElementById('rk-m0'), mfEl = document.getElementById('rk-mf');
  const dvResEl = document.getElementById('rk-res-dv'), propResEl = document.getElementById('rk-res-prop');

  const g0 = 9.80665; // Standard gravity m/s^2

  function update() {
    const isp = parseFloat(ispEl.value), m0 = parseFloat(m0El.value), mf = parseFloat(mfEl.value);
    if (isNaN(isp) || isNaN(m0) || isNaN(mf) || isp <= 0 || m0 <= mf || mf <= 0) return;

    // Effective exhaust velocity v_e = Isp * g0
    const ve = isp * g0;
    // Delta_v = ve * ln(m0 / mf) (m/s)
    const dvMs = ve * Math.log(m0 / mf);
    const dvKms = dvMs / 1000;

    const propKg = m0 - mf;
    const propPct = (propKg / m0) * 100;
    const propTons = propKg / 1000;

    dvResEl.textContent = dvKms.toFixed(3) + ' km / s (' + Math.round(dvMs).toLocaleString() + ' m/s)';
    propResEl.textContent = propPct.toFixed(1) + '% Propellant (' + propTons.toFixed(1) + ' metric tons fuel)';
  }

  [ispEl, m0El, mfEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rocket engine Specific Impulse (I_sp) in seconds (e.g. 311s Kerosene/LOX, 380s Methane/LOX, 450s Hydrolox).',
      'Enter rocket liftoff initial wet mass m₀ and stage burnout dry mass m_f in kg.',
      'Inspect total Delta-V capability (km/s) and propellant mass percentage.'
    ],
    benefitTitle: 'Konstantin Tsiolkovsky\'s 1903 Rocketry Equation',
    benefitContent: 'Known as the "tyranny of the rocket equation", achieving orbital velocity (~9.4 km/s with atmospheric drag) requires modern orbital rockets to be over 90-94% pure propellant mass by weight.',
    faqs: [{ q: 'What is Specific Impulse (I_sp)?', a: 'I_sp measures rocket propellant fuel efficiency in seconds (effective exhaust velocity divided by standard gravity g₀: I_sp = v_e / g₀).' }]
  },

  // 3. Lagrange Equilibrium Points (L1 & L2) Distance Calculator
  {
    slug: 'lagrange-points-l1-l2-distance-calculator',
    name: 'Lagrange Equilibrium Points (L1 & L2) Distance Calculator',
    description: 'Calculate distance from the secondary body to collinear Lagrange equilibrium libration points (r_L1, r_L2 ≈ R · (M₂ / (3·M₁))^(1/3)) in three-body orbital systems.',
    category: 'Science',
    icon: 'text',
    keywords: ['lagrange points calculator', 'l1 l2 distance calculator', 'james webb space telescope l2 orbit distance', 'hill sphere lagrange point formula', 'three body gravitational libration points online'],
    order: 388,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Three-Body Gravitational System Preset',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="lag-sys">Select Celestial System</label>
        <select class="tool-textarea" id="lag-sys">
          <option value="149597870.7,1.989e30,5.972e24,JWST" selected>Sun - Earth System (JWST & DSCOVR Orbit)</option>
          <option value="384400,5.972e24,7.342e22,Artemis">Earth - Moon System (Gateway Space Station)</option>
          <option value="227939200,1.989e30,6.417e23,Mars">Sun - Mars System</option>
          <option value="778570000,1.989e30,1.898e27,Jupiter">Sun - Jupiter System (Trojan Asteroids)</option>
        </select>
      </div>
      <div id="lag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lag-res-dist" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,496,500 km</span>
            <span class="stat-label">L1 / L2 Distance from Earth</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lag-res-jwst" style="color:#2563eb; font-weight:700;">James Webb Space Telescope (JWST) at L2</span>
            <span class="stat-label">Mission Utilization</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const sysEl = document.getElementById('lag-sys');
  const dResEl = document.getElementById('lag-res-dist'), mResEl = document.getElementById('lag-res-jwst');

  function update() {
    const [distKm, m1, m2, name] = sysEl.value.split(',');
    const R = parseFloat(distKm), M1 = parseFloat(m1), M2 = parseFloat(m2);

    // First-order Hill approximation for collinear points L1/L2:
    // r_L ≈ R * (M2 / (3 * M1))^(1/3)
    const rL = R * Math.pow(M2 / (3 * M1), 1 / 3);

    dResEl.textContent = Math.round(rL).toLocaleString() + ' km (' + (rL / R * 100).toFixed(2) + '% of Orbital Distance)';

    if (name === 'JWST') {
      mResEl.textContent = 'Sun-Earth L2 (JWST) & L1 (Solar DSCOVR / SOHO Observatories)';
    } else if (name === 'Artemis') {
      mResEl.textContent = 'Earth-Moon L2 / Halo Orbits (NASA Artemis Gateway Station)';
    } else {
      mResEl.textContent = 'Interplanetary Libration Point in Deep Space';
    }
  }

  sysEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select three-body gravitational system (Sun-Earth, Earth-Moon, Sun-Jupiter).',
      'Inspect exact distance from the smaller celestial body to the L1 (inward) and L2 (outward) gravitational equilibrium points in kilometers.'
    ],
    benefitTitle: 'Joseph-Louis Lagrange\'s 1772 Libration Solution',
    benefitContent: 'At Lagrange points, the combined gravitational pull of the two large masses matches the orbital centripetal acceleration required to move with them, allowing satellites like the James Webb Space Telescope (JWST) to stay stationary relative to Earth with minimal station-keeping propellant.',
    faqs: [{ q: 'Where is the James Webb Space Telescope located?', a: 'JWST orbits the Sun-Earth L2 Lagrange point, approximately 1.5 million kilometers (1 million miles) directly behind Earth away from the Sun.' }]
  },

  // 4. Planetary Escape Velocity Calculator
  {
    slug: 'escape-velocity-from-planet-calculator',
    name: 'Planetary Escape Velocity & Surface Gravity Calculator',
    description: 'Calculate escape velocity (v_esc = √(2 · G · M / R)) and surface gravitational acceleration (g = G · M / R²) for planets, moons, and black holes.',
    category: 'Science',
    icon: 'text',
    keywords: ['escape velocity calculator', 'planetary escape velocity formula', 'surface gravity calculator online', 'v esc sqrt 2 g m r calculator', 'earth escape velocity 11.2 km s online'],
    order: 389,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Celestial Body Mass (kg) & Mean Radius (km)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="esc-preset">Celestial Body Preset</label>
          <select class="tool-textarea" id="esc-preset">
            <option value="5.972e24,6371" selected>Earth (M = 5.97 × 10²⁴ kg, R = 6,371 km)</option>
            <option value="7.342e22,1737">Moon (M = 7.34 × 10²² kg, R = 1,737 km)</option>
            <option value="6.417e23,3390">Mars (M = 6.42 × 10²³ kg, R = 3,390 km)</option>
            <option value="1.898e27,69911">Jupiter (M = 1.90 × 10²⁷ kg, R = 69,911 km)</option>
            <option value="1.989e30,696340">Sun (M = 1.99 × 10³⁰ kg, R = 696,340 km)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="esc-r">Orbital Radius r (km)</label>
          <input class="tool-textarea" id="esc-r" type="number" step="any" value="6371" placeholder="6,371 km" />
        </div>
      </div>
      <div id="esc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="esc-res-vesc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">11.186 km / s</span>
            <span class="stat-label">Escape Velocity (v_esc = √(2GM/r))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="esc-res-vorb" style="font-weight:700;">7.910 km / s</span>
            <span class="stat-label">Circular Orbital Speed (v_orb = v_esc / √2)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="esc-res-g">g = 9.82 m/s² (1.00 g)</span>
            <span class="stat-label">Surface Gravity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const preEl = document.getElementById('esc-preset'), rEl = document.getElementById('esc-r');
  const vescResEl = document.getElementById('esc-res-vesc'), vorbResEl = document.getElementById('esc-res-vorb'), gResEl = document.getElementById('esc-res-g');

  const GConst = 6.67430e-11; // m^3 / (kg * s^2)

  function update() {
    const [mKgStr, rKmStr] = preEl.value.split(',');
    const M = parseFloat(mKgStr);
    const rKm = parseFloat(rEl.value);
    if (isNaN(M) || isNaN(rKm) || M <= 0 || rKm <= 0) return;

    const rM = rKm * 1000;

    // v_esc = sqrt(2 * G * M / r) (m/s)
    const vEscMs = Math.sqrt((2 * GConst * M) / rM);
    const vEscKms = vEscMs / 1000;
    const vOrbKms = vEscKms / Math.SQRT2;

    // g = G * M / r^2 (m/s^2)
    const gVal = (GConst * M) / Math.pow(rM, 2);
    const gEarth = gVal / 9.80665;

    vescResEl.textContent = vEscKms.toFixed(3) + ' km / s (' + (vEscKms * 3600).toLocaleString() + ' km/h)';
    vorbResEl.textContent = vOrbKms.toFixed(3) + ' km / s (' + Math.round(vOrbKms * 1000) + ' m/s)';
    gResEl.textContent = 'g = ' + gVal.toFixed(2) + ' m/s² (' + gEarth.toFixed(2) + ' g)';
  }

  preEl.addEventListener('change', () => {
    const [, rKmStr] = preEl.value.split(',');
    rEl.value = rKmStr;
    update();
  });

  rEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select celestial body preset (Earth, Moon, Mars, Jupiter, Sun).',
      'Adjust radius distance in kilometers.',
      'Inspect gravitational escape velocity (km/s), minimum circular orbital velocity, and surface acceleration g.'
    ],
    benefitTitle: 'Zero-Energy Parabolic Trajectory Threshold',
    benefitContent: 'Escape velocity represents the minimum initial speed an unpropelled projectile needs to completely break free from a planet\'s gravitational well to infinity without ever falling back (kinetic energy balances gravitational potential energy: ½mv² = GMm/r).',
    faqs: [{ q: 'What is Earth\'s surface escape velocity?', a: 'Earth\'s surface escape velocity is exactly 11.186 km/s (~25,020 mph).' }]
  },

  // 5. Synodic Planetary Conjunction Period Calculator
  {
    slug: 'synodic-period-planets-calculator',
    name: 'Synodic Planetary Conjunction Period Calculator',
    description: 'Calculate planetary synodic periods (1/S = |1/P₁ - 1/P₂|) and recurrence timelines between consecutive planetary alignments and Mars launch windows.',
    category: 'Science',
    icon: 'text',
    keywords: ['synodic period calculator', 'planetary conjunction recurrence calculator', 'mars launch window synodic period', 'orbital period to synodic period formula', 'astronomy planetary alignment calculator'],
    order: 390,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Orbital Periods of Inner Body (P₁) & Outer Body (P₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="syn-p1">Inner Planet Period P₁ (Days)</label>
          <input class="tool-textarea" id="syn-p1" type="number" step="any" value="365.25" placeholder="365.25 Days (Earth)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="syn-p2">Outer Planet Period P₂ (Days)</label>
          <input class="tool-textarea" id="syn-p2" type="number" step="any" value="686.98" placeholder="686.98 Days (Mars)" />
        </div>
      </div>
      <div id="syn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="syn-res-days" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">779.9 Days</span>
            <span class="stat-label">Synodic Period (S)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="syn-res-years" style="font-weight:700;">2.14 Years (25.6 Months)</span>
            <span class="stat-label">Conjunction Launch Window Cadence</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const p1El = document.getElementById('syn-p1'), p2El = document.getElementById('syn-p2');
  const dResEl = document.getElementById('syn-res-days'), yResEl = document.getElementById('syn-res-years');

  function update() {
    const P1 = parseFloat(p1El.value), P2 = parseFloat(p2El.value);
    if (isNaN(P1) || isNaN(P2) || P1 <= 0 || P2 <= 0 || P1 === P2) return;

    // 1/S = |1/P1 - 1/P2| => S = (P1 * P2) / |P1 - P2|
    const S = (P1 * P2) / Math.abs(P1 - P2);
    const sYears = S / 365.25;
    const sMonths = sYears * 12;

    dResEl.textContent = S.toFixed(1) + ' Days';
    yResEl.textContent = sYears.toFixed(2) + ' Years (' + sMonths.toFixed(1) + ' Months)';
  }

  p1El.addEventListener('input', update);
  p2El.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter sidereal orbital period of inner body P₁ in Earth days (Earth = 365.25 days).',
      'Enter orbital period of outer body P₂ in days (Mars = 687 days, Jupiter = 4,333 days).',
      'Inspect synodic period S between consecutive celestial alignments.'
    ],
    benefitTitle: 'Mars Launch Windows Every 26 Months',
    benefitContent: 'Because Earth orbits faster than Mars, Earth "laps" Mars once every 780 days (~26 months); interplanetary spacecraft must launch during this exact planetary alignment window to intercept Mars with minimal fuel.',
    faqs: [{ q: 'What is the synodic period between Earth and Mars?', a: 'S = (365.25 × 686.98) / (686.98 - 365.25) ≈ 779.9 days (~2.14 years).' }]
  }
];

toolsSuiteOO.forEach(createTool);
console.log('Suite OO complete: 5 tools created.');
