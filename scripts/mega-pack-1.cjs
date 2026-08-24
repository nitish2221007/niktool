const { createTool } = require('./generate-curated-tools.cjs');

const tools1 = [
  // 1. Kinetic Friction Calculator
  {
    slug: 'kinetic-friction-calculator',
    name: 'Kinetic Friction Calculator',
    description: 'Calculate kinetic friction force (fk = μk · N), normal force, and coefficient of kinetic friction from object mass and surface properties.',
    category: 'Science',
    icon: 'text',
    keywords: ['kinetic friction calculator', 'friction force calculator', 'coefficient of kinetic friction', 'normal force friction', 'physics friction online'],
    order: 104,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Kinetic Friction Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kf-mass">Object Mass (kg)</label>
          <input class="tool-textarea" id="kf-mass" type="number" step="any" value="20" placeholder="e.g. 20 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kf-mu">Kinetic Friction Coeff (μk)</label>
          <input class="tool-textarea" id="kf-mu" type="number" step="any" value="0.3" placeholder="e.g. 0.3 (Wood on Wood)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kf-angle">Incline Angle θ (Degrees)</label>
          <input class="tool-textarea" id="kf-angle" type="number" min="0" max="89" step="any" value="0" placeholder="0 for flat ground" />
        </div>
      </div>
      <div id="kf-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kf-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Kinetic Friction Force (fk)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kf-res-normal" style="font-weight:700;">-</span>
            <span class="stat-label">Normal Force (N = mg cos θ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('kf-mass'), muEl = document.getElementById('kf-mu'), aEl = document.getElementById('kf-angle');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('kf-res-card');
  const resF = document.getElementById('kf-res-force'), resN = document.getElementById('kf-res-normal');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const m = parseFloat(mEl.value), mu = parseFloat(muEl.value), deg = parseFloat(aEl.value) || 0;
    if (isNaN(m) || isNaN(mu) || m <= 0 || mu < 0 || deg < 0 || deg >= 90) {
      setMsg('Please enter valid positive values (Angle between 0° and 89°).', true);
      resCard.style.display = 'none'; return;
    }
    const g = 9.80665;
    const rad = (deg * Math.PI) / 180;
    const normal = m * g * Math.cos(rad);
    const fk = mu * normal;

    resF.textContent = fk.toFixed(2) + ' N (Newtons)';
    resN.textContent = normal.toFixed(2) + ' N';
    resCard.style.display = 'block';
    setMsg('Kinetic friction calculated.');
  });

  clearBtn.addEventListener('click', () => {
    mEl.value = '20'; muEl.value = '0.3'; aEl.value = '0'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter object mass in kilograms and coefficient of friction (μk).',
      'Enter the slope incline angle (0° for flat ground).',
      'Click <strong>Calculate</strong> to inspect the resisting kinetic friction force in Newtons.'
    ],
    benefitTitle: 'Kinetic Friction Mechanics',
    benefitContent: 'Kinetic friction opposes the relative sliding motion between two solid surfaces in contact. The magnitude fk is directly proportional to the normal contact force: fk = μk · N.',
    faqs: [{ q: 'Is kinetic friction independent of sliding speed?', a: 'In standard classical Coulomb friction, kinetic friction is approximately independent of sliding velocity and surface area.' }]
  },

  // 2. Centripetal Force Calculator
  {
    slug: 'centripetal-force-calculator',
    name: 'Centripetal Force Calculator',
    description: 'Calculate centripetal force (Fc = m·v²/r), radial acceleration, and angular velocity for circular orbital motion.',
    category: 'Science',
    icon: 'text',
    keywords: ['centripetal force calculator', 'centripetal acceleration calculator', 'circular motion force', 'physics orbital force calculator'],
    order: 105,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Circular Motion Parameters',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cf-mass">Mass m (kg)</label>
          <input class="tool-textarea" id="cf-mass" type="number" step="any" value="1000" placeholder="e.g. 1000 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cf-vel">Tangential Velocity v (m/s)</label>
          <input class="tool-textarea" id="cf-vel" type="number" step="any" value="20" placeholder="e.g. 20 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cf-rad">Radius of Curve r (meters)</label>
          <input class="tool-textarea" id="cf-rad" type="number" step="any" value="50" placeholder="e.g. 50 m" />
        </div>
      </div>
      <div id="cf-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cf-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Centripetal Force (Fc)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cf-res-acc" style="font-weight:700;">-</span>
            <span class="stat-label">Radial Acceleration (ac)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cf-res-omega">-</span>
            <span class="stat-label">Angular Velocity (ω)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('cf-mass'), vEl = document.getElementById('cf-vel'), rEl = document.getElementById('cf-rad');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('cf-res-card');
  const resF = document.getElementById('cf-res-force'), resAcc = document.getElementById('cf-res-acc'), resO = document.getElementById('cf-res-omega');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const m = parseFloat(mEl.value), v = parseFloat(vEl.value), r = parseFloat(rEl.value);
    if (isNaN(m) || isNaN(v) || isNaN(r) || m <= 0 || v <= 0 || r <= 0) {
      setMsg('Please enter valid positive numbers for mass, velocity, and radius.', true);
      resCard.style.display = 'none'; return;
    }
    const ac = (v * v) / r;
    const fc = m * ac;
    const omega = v / r;

    resF.textContent = Math.round(fc).toLocaleString() + ' N';
    resAcc.textContent = ac.toFixed(2) + ' m/s² (' + (ac / 9.80665).toFixed(1) + ' g)';
    resO.textContent = omega.toFixed(3) + ' rad/s';

    resCard.style.display = 'block';
    setMsg('Centripetal force calculated.');
  });

  clearBtn.addEventListener('click', () => {
    mEl.value = '1000'; vEl.value = '20'; rEl.value = '50'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the rotating body mass in kilograms.',
      'Enter tangential velocity in meters per second (m/s).',
      'Enter the radius of the circular path in meters.',
      'Click <strong>Calculate</strong> to inspect the required inward centripetal force.'
    ],
    benefitTitle: 'Centripetal Force in Curvature',
    benefitContent: 'Any object moving in a circle must experience an inward net force (Fc = m·v²/r) directed toward the center of curvature to constantly change its velocity vector.',
    faqs: [{ q: 'What provides centripetal force for a turning car?', a: 'Static friction between the car tires and the road surface provides the necessary inward centripetal force.' }]
  },

  // 3. Newton's Universal Gravitation Calculator
  {
    slug: 'gravitational-force-calculator',
    name: 'Gravitational Force Calculator',
    description: 'Calculate Newton\'s universal gravitational attraction force (F = G · m₁ · m₂ / r²) between any two masses across space.',
    category: 'Science',
    icon: 'text',
    keywords: ['gravitational force calculator', 'newton gravity calculator', 'gravitational attraction formula', 'universal gravitation calculator online'],
    order: 106,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Masses and Center-to-Center Distance',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="gf-m1">Mass 1 (kg) [e.g. 5.972e24 for Earth]</label>
          <input class="tool-textarea" id="gf-m1" type="text" value="5.972e24" placeholder="e.g. 5.972e24" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gf-m2">Mass 2 (kg) [e.g. 7.342e22 for Moon]</label>
          <input class="tool-textarea" id="gf-m2" type="text" value="7.342e22" placeholder="e.g. 7.342e22" />
        </div>
        <div class="control-group">
          <label class="control-label" for="gf-r">Distance r (meters) [e.g. 3.844e8 for Earth-Moon]</label>
          <input class="tool-textarea" id="gf-r" type="text" value="3.844e8" placeholder="e.g. 3.844e8" />
        </div>
      </div>
      <div id="gf-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="gf-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Gravitational Attraction Force (F)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="gf-res-g-const">6.6743 × 10⁻¹¹ N·m²/kg²</span>
            <span class="stat-label">Gravitational Constant (G)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const m1El = document.getElementById('gf-m1'), m2El = document.getElementById('gf-m2'), rEl = document.getElementById('gf-r');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('gf-res-card');
  const resF = document.getElementById('gf-res-force');

  const G = 6.67430e-11;

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const m1 = parseFloat(m1El.value), m2 = parseFloat(m2El.value), r = parseFloat(rEl.value);
    if (isNaN(m1) || isNaN(m2) || isNaN(r) || m1 <= 0 || m2 <= 0 || r <= 0) {
      setMsg('Please enter positive numerical values (Scientific notation like 5.97e24 is supported).', true);
      resCard.style.display = 'none'; return;
    }

    const F = (G * m1 * m2) / (r * r);
    resF.textContent = F.toExponential(4) + ' N (Newtons)';
    resCard.style.display = 'block';
    setMsg('Gravitational attraction computed.');
  });

  clearBtn.addEventListener('click', () => {
    m1El.value = '5.972e24'; m2El.value = '7.342e22'; rEl.value = '3.844e8'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the masses of the two interacting bodies (kg). Scientific notation like 5.97e24 is fully supported.',
      'Enter the center-to-center distance in meters.',
      'Click <strong>Calculate</strong> to inspect the gravitational attraction force.'
    ],
    benefitTitle: 'Newtonian Gravitation Law',
    benefitContent: 'Every particle attracts every other particle with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between their centers (F = G·m₁·m₂/r²).',
    faqs: [{ q: 'What is the gravitational attraction between Earth and Moon?', a: 'Approximately 1.98 × 10²⁰ Newtons, which keeps the Moon in stable orbit around Earth.' }]
  },

  // 4. Hooke's Law & Elastic Potential Energy Calculator
  {
    slug: 'elastic-potential-energy-calculator',
    name: 'Elastic Potential Energy & Hooke\'s Law Calculator',
    description: 'Calculate spring restoring force (F = k·x) and stored elastic potential energy (PE = ½·k·x²) from spring constant and displacement.',
    category: 'Science',
    icon: 'text',
    keywords: ['elastic potential energy calculator', 'hookes law calculator', 'spring energy calculator', 'spring constant force calculator', 'physics spring potential energy'],
    order: 107,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Spring Constant & Displacement',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sp-k">Spring Constant k (N/m)</label>
          <input class="tool-textarea" id="sp-k" type="number" step="any" value="250" placeholder="e.g. 250 N/m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sp-x">Displacement / Stretch x (meters)</label>
          <input class="tool-textarea" id="sp-x" type="number" step="any" value="0.2" placeholder="e.g. 0.2 m (20 cm)" />
        </div>
      </div>
      <div id="sp-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sp-res-pe" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">-</span>
            <span class="stat-label">Stored Elastic Energy (PE)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sp-res-force" style="font-weight:700;">-</span>
            <span class="stat-label">Restoring Force (F = k·x)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kEl = document.getElementById('sp-k'), xEl = document.getElementById('sp-x');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('sp-res-card');
  const resPE = document.getElementById('sp-res-pe'), resF = document.getElementById('sp-res-force');

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const k = parseFloat(kEl.value), x = parseFloat(xEl.value);
    if (isNaN(k) || isNaN(x) || k <= 0 || x <= 0) {
      setMsg('Please enter positive numbers for spring constant and displacement.', true);
      resCard.style.display = 'none'; return;
    }

    const force = k * x;
    const pe = 0.5 * k * Math.pow(x, 2);

    resPE.textContent = pe.toFixed(3) + ' Joules (J)';
    resF.textContent = force.toFixed(2) + ' Newtons (N)';

    resCard.style.display = 'block';
    setMsg('Spring potential energy calculated.');
  });

  clearBtn.addEventListener('click', () => {
    kEl.value = '250'; xEl.value = '0.2'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Enter the spring constant (k) in Newtons per meter (N/m).',
      'Enter the displacement or extension (x) in meters.',
      'Click <strong>Calculate</strong> to inspect the stored Joules and restoring force.'
    ],
    benefitTitle: 'Hooke\'s Law Energy Derivation',
    benefitContent: 'The potential energy stored in an extended or compressed spring corresponds to the work done: W = ∫ F dx = ∫ kx dx = ½ k x².',
    faqs: [{ q: 'What happens to spring energy if displacement doubles?', a: 'Because energy scales with x², doubling displacement increases stored potential energy by 4 times.' }]
  },

  // 5. Hydrostatic Pressure Calculator
  {
    slug: 'hydrostatic-pressure-calculator',
    name: 'Hydrostatic Pressure & Depth Calculator',
    description: 'Calculate fluid hydrostatic pressure (P = ρ · g · h), total atmospheric pressure, and underwater depth pressure for water and oil.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydrostatic pressure calculator', 'underwater pressure calculator', 'fluid depth pressure formula', 'fluid mechanics pressure calculator'],
    order: 108,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Fluid Density & Column Depth',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hp-fluid">Fluid Type</label>
          <select class="tool-textarea" id="hp-fluid">
            <option value="1000" selected>Freshwater (1,000 kg/m³)</option>
            <option value="1025">Seawater (1,025 kg/m³)</option>
            <option value="920">Oil (920 kg/m³)</option>
            <option value="13600">Mercury (13,600 kg/m³)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="hp-depth">Depth h (meters)</label>
          <input class="tool-textarea" id="hp-depth" type="number" step="any" value="10" placeholder="e.g. 10 m" />
        </div>
      </div>
      <div id="hp-res-card" style="display:none; margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hp-res-hydro" style="color:var(--green-dark); font-weight:800; font-size:1.5rem;">-</span>
            <span class="stat-label">Hydrostatic Pressure (ρgh)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-total" style="font-weight:700;">-</span>
            <span class="stat-label">Total Absolute Pressure (+1 atm)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hp-res-atm">-</span>
            <span class="stat-label">Atmospheres (atm)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fEl = document.getElementById('hp-fluid'), dEl = document.getElementById('hp-depth');
  const btn = document.getElementById('primary-action-btn'), clearBtn = document.getElementById('clear-action-btn');
  const msgEl = document.getElementById('tool-message'), resCard = document.getElementById('hp-res-card');
  const resH = document.getElementById('hp-res-hydro'), resT = document.getElementById('hp-res-total'), resAtm = document.getElementById('hp-res-atm');

  const ATM_PA = 101325; // 1 atm in Pascals
  const g = 9.80665;

  function setMsg(t, e) { msgEl.textContent = t; msgEl.className = 'message' + (e ? ' error' : ' success'); }

  btn.addEventListener('click', () => {
    const rho = parseFloat(fEl.value);
    const h = parseFloat(dEl.value);
    if (isNaN(rho) || isNaN(h) || rho <= 0 || h < 0) {
      setMsg('Please enter a valid non-negative depth.', true);
      resCard.style.display = 'none'; return;
    }

    const hydroPa = rho * g * h;
    const totalPa = hydroPa + ATM_PA;
    const atm = totalPa / ATM_PA;

    resH.textContent = (hydroPa / 1000).toFixed(2) + ' kPa (' + (hydroPa / 100000).toFixed(2) + ' bar)';
    resT.textContent = (totalPa / 1000).toFixed(2) + ' kPa';
    resAtm.textContent = atm.toFixed(2) + ' atm';

    resCard.style.display = 'block';
    setMsg('Hydrostatic pressure computed.');
  });

  clearBtn.addEventListener('click', () => {
    dEl.value = '10'; resCard.style.display = 'none';
    msgEl.textContent = 'Ready. Enter parameters above.';
    msgEl.className = 'message';
  });
})();`,
    howToSteps: [
      'Select fluid density preset (Freshwater, Seawater, Oil, Mercury).',
      'Enter column liquid depth in meters.',
      'Click <strong>Calculate</strong> to inspect hydrostatic pressure and total absolute pressure in kPa, bar, and atmospheres.'
    ],
    benefitTitle: 'Hydrostatic Law Principles',
    benefitContent: 'Hydrostatic pressure increases linearly with depth (P = ρ·g·h) due to the gravitational weight of fluid above. In seawater, pressure increases by roughly 1 atmosphere for every 10 meters of descent.',
    faqs: [{ q: 'What is the pressure at 10 meters underwater?', a: 'At 10 meters in freshwater, total absolute pressure is approximately 2 atmospheres (~200 kPa).' }]
  }
];

tools1.forEach(createTool);
console.log('Mega pack 1 complete.');
