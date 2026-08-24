const { createTool } = require('./generate-curated-tools.cjs');

// Pack 20: 25 Tools covering Biomechanics, Acoustics, Chemical Reactors, Geophysics, Industrial Automation (Tools 756 to 780)
const pack20Tools = [
  // --- Suite LLLL: Biomechanics, Sports Physics & Exercise Physiology (756 - 760) ---
  // 1. VO2 Max Treadmill & Running Velocity Calculator
  {
    slug: 'vo2-max-treadmill-running-calculator',
    name: 'VO₂ Max & Aerobic Running Performance (ACSM Equation) Calculator',
    description: 'Calculate maximal oxygen uptake VO₂ Max (mL/kg/min = 0.2·Speed + 0.9·Speed·Grade + 3.5) from running treadmill speed and incline grade.',
    category: 'Health',
    icon: 'text',
    keywords: ['vo2 max running calculator', 'acsm treadmill metabolic equation vo2 online', 'maximal oxygen consumption ml kg min calculator', 'aerobic fitness vo2 max rating calculator', 'running speed grade vo2 max online'],
    order: 635,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Running Speed (km/h or mph), Treadmill Grade Incline (%) & Body Weight (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vo2-spd">Speed (km/h)</label>
          <input class="tool-textarea" id="vo2-spd" type="number" step="any" value="12.0" placeholder="12.0 km/h (5:00/km Pace)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vo2-grd">Incline Grade (%)</label>
          <input class="tool-textarea" id="vo2-grd" type="number" step="any" value="2.0" placeholder="2.0 % Grade" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vo2-wt">Body Weight (kg)</label>
          <input class="tool-textarea" id="vo2-wt" type="number" step="any" value="70.0" placeholder="70.0 kg" />
        </div>
      </div>
      <div id="vo2-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vo2-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">47.1 mL / kg / min</span>
            <span class="stat-label">Estimated Steady-State Oxygen Cost (VO₂)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vo2-res-rate" style="color:var(--green-dark); font-weight:700;">Excellent Aerobic Fitness (13.5 METs | 16.5 kcal / min)</span>
            <span class="stat-label">Metabolic Equivalents (METs) & Caloric Expenditure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const spdEl = document.getElementById('vo2-spd'), grdEl = document.getElementById('vo2-grd'), wtEl = document.getElementById('vo2-wt');
  const vResEl = document.getElementById('vo2-res-val'), rResEl = document.getElementById('vo2-res-rate');

  function update() {
    const spdKmh = parseFloat(spdEl.value), gradePct = parseFloat(grdEl.value), wtKg = parseFloat(wtEl.value);
    if (isNaN(spdKmh) || isNaN(gradePct) || isNaN(wtKg) || spdKmh <= 0 || wtKg <= 0 || gradePct < 0) return;

    // Convert speed to meters / min (1 km/h = 16.6667 m/min)
    const spdMpm = spdKmh * (1000 / 60);
    const gradeFrac = gradePct / 100;

    // ACSM Running Equation: VO2 (mL/kg/min) = (0.2 * speed_m_min) + (0.9 * speed_m_min * grade) + 3.5
    const vo2 = (0.2 * spdMpm) + (0.9 * spdMpm * gradeFrac) + 3.5;
    const mets = vo2 / 3.5;

    // Caloric burn rate kcal/min = (VO2 * wtKg / 1000) * 5 kcal/L O2
    const kcalMin = (vo2 * wtKg / 1000) * 5.0;

    let fitnessTier = '';
    if (vo2 < 30) fitnessTier = 'Low Aerobic Capacity';
    else if (vo2 < 40) fitnessTier = 'Fair Fitness';
    else if (vo2 < 50) fitnessTier = 'Good / Excellent Fitness';
    else if (vo2 < 60) fitnessTier = 'Superior Endurance Athlete';
    else fitnessTier = 'Elite Olympic Endurance Tier';

    vResEl.textContent = vo2.toFixed(1) + ' mL / kg / min (VO₂)';
    rResEl.textContent = fitnessTier + ' (' + mets.toFixed(1) + ' METs | ' + kcalMin.toFixed(1) + ' kcal / min)';
  }

  [spdEl, grdEl, wtEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter running speed in km/h.',
      'Enter treadmill road incline grade percentage (0% to 15%).',
      'Enter runner body weight in kilograms.',
      'Inspect estimated oxygen consumption VO₂ in mL/kg/min, Metabolic Equivalent Task (METs) score, and caloric burn rate in kcal/min.'
    ],
    benefitTitle: 'American College of Sports Medicine (ACSM) Equations',
    benefitContent: 'The ACSM metabolic running model calculates the precise volume of oxygen consumed during steady-state aerobic exertion, accounting for horizontal kinetic work (0.2·v) and vertical gravitational climbing work (0.9·v·grade).',
    faqs: [{ q: 'What is 1 MET in oxygen consumption?', a: '1 MET (Metabolic Equivalent of Task) represents resting basal oxygen uptake: exactly 3.5 mL of O₂ per kilogram of body mass per minute.' }]
  },

  // 2. Projectile Motion with Aerodynamic Drag Trajectory Calculator
  {
    slug: 'projectile-motion-drag-trajectory-calculator',
    name: 'Projectile Motion with Quadratic Drag Trajectory Calculator',
    description: 'Calculate ballistic projectile range, flight time, apex altitude, and impact velocity accounting for atmospheric quadratic air resistance drag (F_drag = 1/2 · ρ · C_d · A · v²).',
    category: 'Science',
    icon: 'text',
    keywords: ['projectile motion drag calculator', 'ballistics trajectory air resistance formula', 'quadratic drag projectile range calculator online', 'aerodynamic drag bullet trajectory online', 'physics projectile motion with drag calculator'],
    order: 636,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Launch Speed v₀ (m/s), Launch Angle θ (°), Mass m (kg) & Cross-Section Area A (cm²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="drg-v0">Launch Speed v₀ (m/s)</label>
          <input class="tool-textarea" id="drg-v0" type="number" step="any" value="50.0" placeholder="50.0 m/s (180 km/h)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drg-th">Launch Angle θ (°)</label>
          <input class="tool-textarea" id="drg-th" type="number" step="1" value="45.0" placeholder="45.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drg-m">Mass m (kg)</label>
          <input class="tool-textarea" id="drg-m" type="number" step="any" value="0.145" placeholder="0.145 kg (Baseball)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="drg-cd">Drag Coeff C_d</label>
          <input class="tool-textarea" id="drg-cd" type="number" step="0.05" value="0.30" placeholder="0.30 (Sphere)" />
        </div>
      </div>
      <div id="drg-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="drg-res-range" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">124.8 m Drag Range</span>
            <span class="stat-label">Atmospheric Flight Range (Vacuum Ideal: 254.9 m)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="drg-res-apex" style="font-weight:700;">Apex: 42.1 m | Flight Time: 5.18 s | Impact Speed: 31.2 m/s</span>
            <span class="stat-label">Maximum Height (Apex), Duration & Terminal Impact Velocity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const v0El = document.getElementById('drg-v0'), thEl = document.getElementById('drg-th');
  const mEl = document.getElementById('drg-m'), cdEl = document.getElementById('drg-cd');
  const rResEl = document.getElementById('drg-res-range'), aResEl = document.getElementById('drg-res-apex');

  const g = 9.80665;
  const rho_air = 1.225;

  function update() {
    const v0 = parseFloat(v0El.value), thDeg = parseFloat(thEl.value);
    const mass = parseFloat(mEl.value), Cd = parseFloat(cdEl.value);

    if (isNaN(v0) || isNaN(thDeg) || isNaN(mass) || isNaN(Cd) || v0 <= 0 || mass <= 0 || Cd <= 0) return;

    const thRad = (thDeg * Math.PI) / 180;
    // Vacuum theoretical range = v0^2 * sin(2*th) / g
    const rangeVacuum = (Math.pow(v0, 2) * Math.sin(2 * thRad)) / g;

    // Cross-sectional area for baseball diameter ~7.4cm (0.0043 m^2)
    const Area = 0.0043;
    const k_drag = 0.5 * rho_air * Cd * Area;

    // Numerical Runge-Kutta simulation for trajectory with quadratic drag
    let dt = 0.005;
    let t = 0, x = 0, y = 0;
    let vx = v0 * Math.cos(thRad), vy = v0 * Math.sin(thRad);
    let yMax = 0;

    for (let step = 0; step < 10000; step++) {
      const v = Math.sqrt(vx*vx + vy*vy);
      const ax = -(k_drag / mass) * v * vx;
      const ay = -g - ((k_drag / mass) * v * vy);

      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;
      t += dt;

      if (y > yMax) yMax = y;
      if (y < 0 && step > 5) break;
    }

    const vImpact = Math.sqrt(vx*vx + vy*vy);
    const rangeLossPct = ((rangeVacuum - x) / rangeVacuum) * 100;

    rResEl.textContent = x.toFixed(1) + ' m Drag Range (Vacuum: ' + rangeVacuum.toFixed(1) + ' m, -' + rangeLossPct.toFixed(0) + '% Drag Loss)';
    aResEl.textContent = 'Apex: ' + yMax.toFixed(1) + ' m | Time: ' + t.toFixed(2) + ' s | Impact: ' + vImpact.toFixed(1) + ' m/s (' + (vImpact * 3.6).toFixed(0) + ' km/h)';
  }

  [v0El, thEl, mEl, cdEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial muzzle / launch velocity v₀ in m/s.',
      'Enter elevation launch angle θ in degrees.',
      'Enter projectile mass in kilograms (e.g. 0.145 kg for baseball, 0.045 kg for golf ball).',
      'Enter aerodynamic drag coefficient C_d (typically 0.25 to 0.40 for spheres).',
      'Inspect realistic atmospheric drag range, maximum flight apex height, and terminal impact velocity.'
    ],
    benefitTitle: 'Sir Isaac Newton Quadratic Drag Ballistics',
    benefitContent: 'Unlike idealized high school vacuum parabolic arcs, atmospheric drag produces an asymmetrical ballistic trajectory with a steep descent angle and cuts real-world flight distance by over 50%.',
    faqs: [{ q: 'Why is 45° not the optimal launch angle in air?', a: 'In the presence of aerodynamic drag, the optimal launch angle for maximum range drops to between 35° and 40°.' }]
  },

  // 3. Biomechanical Muscle Lever Arm & Joint Tendon Force Calculator
  {
    slug: 'muscle-force-lever-arm-torque-calculator',
    name: 'Biomechanical Muscle Lever Arm & Joint Tendon Force Calculator',
    description: 'Calculate human musculoskeletal joint tendon tension forces (F_tendon = (W_load · d_load + W_arm · d_arm) / d_tendon) and joint reaction compression loads.',
    category: 'Health',
    icon: 'text',
    keywords: ['muscle tendon force calculator', 'biomechanics joint lever arm torque formula', 'biceps tendon tension force calculator online', 'elbow joint compression reaction force calculator', 'human musculoskeletal mechanics calculator'],
    order: 637,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Hand Load Weight W_load (kg), Forearm Weight (kg), Tendon Insertion d_tendon (cm) & Forearm Length d_load (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bio-load">Hand Load (kg)</label>
          <input class="tool-textarea" id="bio-load" type="number" step="any" value="10.0" placeholder="10.0 kg (22 lbs Dumbbell)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bio-dtend">Tendon Insertion (cm)</label>
          <input class="tool-textarea" id="bio-dtend" type="number" step="0.1" value="4.5" placeholder="4.5 cm (Biceps Tendon)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bio-dload">Forearm Length (cm)</label>
          <input class="tool-textarea" id="bio-dload" type="number" step="any" value="35.0" placeholder="35.0 cm" />
        </div>
      </div>
      <div id="bio-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bio-res-tend" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">826.8 N Tendon Force</span>
            <span class="stat-label">Biceps Tendon Tensile Force (84.3 kg Tension)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bio-res-joint" style="font-weight:700;">Joint Reaction: 714.0 N Compression (7.8× Mechanical Disadvantage)</span>
            <span class="stat-label">Elbow Joint Compressive Reaction Force (F_joint)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ldEl = document.getElementById('bio-load'), dtEl = document.getElementById('bio-dtend'), dlEl = document.getElementById('bio-dload');
  const tdResEl = document.getElementById('bio-res-tend'), jtResEl = document.getElementById('bio-res-joint');

  const g = 9.80665;
  const forearmMassKg = 1.5; // average forearm + hand mass

  function update() {
    const loadKg = parseFloat(ldEl.value), d_tendon_cm = parseFloat(dtEl.value), d_load_cm = parseFloat(dlEl.value);
    if (isNaN(loadKg) || isNaN(d_tendon_cm) || isNaN(d_load_cm) || d_tendon_cm <= 0 || d_load_cm <= d_tendon_cm || loadKg < 0) return;

    const d_tendon_m = d_tendon_cm / 100;
    const d_load_m = d_load_cm / 100;
    const d_forearm_cg_m = d_load_m * 0.43; // center of gravity of forearm

    // Load torque = (m_load * g * d_load) + (m_forearm * g * d_forearm_cg)
    const tau_load = (loadKg * g * d_load_m) + (forearmMassKg * g * d_forearm_cg_m);

    // Tendon force F_tendon = tau_load / d_tendon
    const F_tendon_N = tau_load / d_tendon_m;
    const F_tendon_kg = F_tendon_N / g;

    // Joint reaction force F_joint = F_tendon - total downward load
    const totalDown_N = (loadKg + forearmMassKg) * g;
    const F_joint_N = F_tendon_N - totalDown_N;
    const mechDisadv = d_load_cm / d_tendon_cm;

    tdResEl.textContent = Math.round(F_tendon_N).toLocaleString() + ' N (' + F_tendon_kg.toFixed(1) + ' kg Tension)';
    jtResEl.textContent = 'Joint Reaction: ' + Math.round(F_joint_N).toLocaleString() + ' N Compression (' + mechDisadv.toFixed(1) + '× Class 3 Lever Disadvantage)';
  }

  [ldEl, dtEl, dlEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter load weight held in hand in kg.',
      'Enter muscle tendon anatomical insertion distance from joint pivot axis in cm (typically 4.0 to 5.0 cm for biceps insertion on the radial tuberosity).',
      'Enter total forearm moment arm length in cm.',
      'Inspect total muscular tendon tensile force and joint cartilage compressive reaction load.'
    ],
    benefitTitle: 'Class 3 Musculoskeletal Anatomical Levers',
    benefitContent: 'Human skeletal joints operate as Class 3 levers where muscles insert very close to the joint fulcrum; this trades mechanical advantage for high limb speed and range of motion, requiring the biceps tendon to generate over 800 N of force to hold a modest 10 kg dumbbell.',
    faqs: [{ q: 'Why are joint compression forces so large during heavy lifting?', a: 'Because muscle tendon pull angles are nearly parallel to bones, large tendon tensions pull joint surfaces tightly against each other, compressing cartilage.' }]
  },

  // 4. Vertical Jump Height & Ground Reaction Force Calculator
  {
    slug: 'jump-height-ground-reaction-force-calculator',
    name: 'Vertical Jump Height & Peak Ground Reaction Force (GRF) Calculator',
    description: 'Calculate athletic vertical jump height (h = v_takeoff² / 2g) in cm/inches, flight hang time, and peak ground reaction impulse force (GRF = m · (g + a)).',
    category: 'Health',
    icon: 'text',
    keywords: ['vertical jump calculator', 'jump height take off velocity formula v2 over 2g', 'ground reaction force vertical jump calculator online', 'hang time jump height calculator online', 'sports biomechanics force plate jump calculator'],
    order: 638,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Athlete Mass (kg), Take-Off Velocity v_takeoff (m/s) or Push-Off Distance (cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="jmp-mass">Athlete Mass (kg)</label>
          <input class="tool-textarea" id="jmp-mass" type="number" step="any" value="80.0" placeholder="80.0 kg" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jmp-v">Takeoff Speed (m/s)</label>
          <input class="tool-textarea" id="jmp-v" type="number" step="any" value="3.5" placeholder="3.5 m/s (62.5 cm Jump)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jmp-d">Squat Depth d (cm)</label>
          <input class="tool-textarea" id="jmp-d" type="number" step="any" value="40.0" placeholder="40.0 cm Push-Off" />
        </div>
      </div>
      <div id="jmp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="jmp-res-ht" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">62.5 cm (24.6 inches)</span>
            <span class="stat-label">True Vertical Jump Height (h = v² / 2g)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="jmp-res-grf" style="font-weight:700;">Peak GRF: 2,009 N (2.56× Bodyweight) | Hang Time: 0.714 s</span>
            <span class="stat-label">Ground Reaction Force (GRF) & Airborne Hang Time</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('jmp-mass'), vEl = document.getElementById('jmp-v'), dEl = document.getElementById('jmp-d');
  const hResEl = document.getElementById('jmp-res-ht'), gResEl = document.getElementById('jmp-res-grf');

  const g = 9.80665;

  function update() {
    const mass = parseFloat(mEl.value), vTakeoff = parseFloat(vEl.value), dPushCm = parseFloat(dEl.value);
    if (isNaN(mass) || isNaN(vTakeoff) || isNaN(dPushCm) || mass <= 0 || vTakeoff <= 0 || dPushCm <= 0) return;

    // Jump height h = v^2 / (2*g)  [meters]
    const hMeters = Math.pow(vTakeoff, 2) / (2 * g);
    const hCm = hMeters * 100;
    const hInches = hCm / 2.54;

    // Flight hang time = 2 * (v / g)
    const hangTime = 2 * (vTakeoff / g);

    // Push-off acceleration a = v^2 / (2 * d_push)
    const dPushM = dPushCm / 100;
    const accel = Math.pow(vTakeoff, 2) / (2 * dPushM);

    // Ground reaction force GRF = mass * (g + a)
    const GRF = mass * (g + accel);
    const bwRatio = GRF / (mass * g);

    hResEl.textContent = hCm.toFixed(1) + ' cm (' + hInches.toFixed(1) + ' inches Jump)';
    gResEl.textContent = 'Peak GRF: ' + Math.round(GRF).toLocaleString() + ' N (' + bwRatio.toFixed(2) + '× Bodyweight) | Hang Time: ' + hangTime.toFixed(3) + ' s';
  }

  [mEl, vEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter athlete body mass in kilograms.',
      'Enter vertical takeoff velocity in m/s (e.g. 2.8 m/s for 40cm jump, 3.5 m/s for 62cm jump).',
      'Enter countermovement squat push-off downward depth distance in cm.',
      'Inspect true center of mass vertical jump height in cm and inches, flight hang time, and peak ground reaction force (GRF) in Newtons and bodyweight multiples.'
    ],
    benefitTitle: 'Force Plate Impulse-Momentum Verification',
    benefitContent: 'Jump height is governed strictly by the vertical impulse ($\int (F - mg) dt = m v_{\text{takeoff}}$) generated against the ground; elite basketball and volleyball athletes routinely produce peak ground reaction forces exceeding 2.5× to 3.0× body weight.',
    faqs: [{ q: 'Why does measuring jump height by hang time sometimes overestimate height?', a: 'Tucking legs or bending knees before landing artificially extends flight hang time, distorting the $h = g t^2 / 8$ calculation.' }]
  },

  // 5. Cycling Power, Aerodynamic Drag & Climbing Watts Calculator
  {
    slug: 'cycling-power-aerodynamic-drag-climbing-calculator',
    name: 'Cycling Power (Watts), Aerodynamic Drag & Climbing Speed Calculator',
    description: 'Calculate bicycle rider mechanical power output (P_total = P_aero + P_rolling + P_gravity) in Watts and W/kg from speed, slope grade, and frontal aerodynamic CdA.',
    category: 'Health',
    icon: 'text',
    keywords: ['cycling power calculator', 'cycling watts formula aero rolling gravity online', 'cycling w kg climbing power calculator', 'cda aerodynamic drag power cycling online', 'bicycle speed to power calculator'],
    order: 639,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Speed (km/h), Hill Slope Grade (%), Total Weight (kg) & Riding Position (CdA)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cyc-spd">Speed (km/h)</label>
          <input class="tool-textarea" id="cyc-spd" type="number" step="any" value="36.0" placeholder="36.0 km/h (Flat Road)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-grd">Hill Slope (%)</label>
          <input class="tool-textarea" id="cyc-grd" type="number" step="any" value="0.0" placeholder="0.0 % (Flat Road)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-wt">Rider + Bike (kg)</label>
          <input class="tool-textarea" id="cyc-wt" type="number" step="any" value="78.0" placeholder="78.0 kg (70kg + 8kg Bike)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cyc-pos">Riding Position (CdA)</label>
          <select class="tool-textarea" id="cyc-pos">
            <option value="0.32" selected>Road Drops (CdA = 0.32 m²)</option>
            <option value="0.38">Road Hoods (CdA = 0.38 m²)</option>
            <option value="0.22">Time Trial TT Bars (CdA = 0.22 m²)</option>
            <option value="0.45">Tops / Commuter Upright (CdA = 0.45 m²)</option>
          </select>
        </div>
      </div>
      <div id="cyc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cyc-res-watts" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">231.4 Watts (3.31 W/kg)</span>
            <span class="stat-label">Total Required Mechanical Pedaling Power</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cyc-res-split" style="font-weight:700;">Aero: 196.0 W (84.7%) | Rolling: 35.4 W | Gravity: 0.0 W</span>
            <span class="stat-label">Power Dissipation Breakdown (P_aero, P_roll, P_climb)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const spdEl = document.getElementById('cyc-spd'), grdEl = document.getElementById('cyc-grd');
  const wtEl = document.getElementById('cyc-wt'), posEl = document.getElementById('cyc-pos');
  const wResEl = document.getElementById('cyc-res-watts'), spResEl = document.getElementById('cyc-res-split');

  const g = 9.80665;
  const rho_air = 1.225;
  const Crr = 0.004; // quality road bike tire rolling resistance coefficient

  function update() {
    const spdKmh = parseFloat(spdEl.value), gradePct = parseFloat(grdEl.value);
    const totalMass = parseFloat(wtEl.value), CdA = parseFloat(posEl.value);

    if (isNaN(spdKmh) || isNaN(gradePct) || isNaN(totalMass) || isNaN(CdA) || spdKmh <= 0 || totalMass <= 0) return;

    // Convert speed to m/s
    const v = spdKmh / 3.6;

    // Aerodynamic power P_aero = 0.5 * rho * CdA * v^3
    const Paero = 0.5 * rho_air * CdA * Math.pow(v, 3);

    // Rolling resistance power P_roll = Crr * m * g * v * cos(theta)
    const slopeAngle = Math.atan(gradePct / 100);
    const Proll = Crr * totalMass * g * v * Math.cos(slopeAngle);

    // Climbing gravitational power P_climb = m * g * v * sin(theta)
    const Pclimb = totalMass * g * v * Math.sin(slopeAngle);

    // Total mechanical power = P_aero + P_roll + P_climb
    const Ptotal = Paero + Proll + Pclimb;
    const wKg = Ptotal / (totalMass - 8); // normalized to rider body weight (assuming 8kg bike)

    wResEl.textContent = Ptotal.toFixed(1) + ' Watts (' + (wKg > 0 ? wKg.toFixed(2) + ' W/kg' : '0 W/kg') + ')';
    spResEl.textContent = 'Aero: ' + Paero.toFixed(1) + ' W (' + ((Paero/Ptotal)*100).toFixed(1) + '%) | Rolling: ' + Proll.toFixed(1) + ' W | Gravity: ' + Pclimb.toFixed(1) + ' W';
  }

  [spdEl, grdEl, wtEl].forEach(el => el.addEventListener('input', update));
  posEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter cycling travel speed in km/h.',
      'Enter road gradient slope in % (0% flat, 7% steep mountain pass, negative for descent).',
      'Enter combined total weight of rider plus bicycle in kilograms.',
      'Select aerodynamic riding posture (Road Drops, Hoods, or TT Aero Bars).',
      'Inspect total mechanical pedaling power in Watts, power-to-weight ratio (W/kg), and the percentage breakdown lost to aerodynamic drag vs tire rolling resistance vs gravity climbing.'
    ],
    benefitTitle: 'The Cubic Velocity Aerodynamic Wall (P ∝ v³)',
    benefitContent: 'Because aerodynamic drag power scales with the cube of velocity ($P_{\text{aero}} \propto v^3$), overcoming air resistance consumes over 85% of a cyclist\'s energy output above 35 km/h on flat ground.',
    faqs: [{ q: 'Why are climbing speeds governed by W/kg rather than pure Watts?', a: 'On steep climbs (>7% grade), gravitational work ($m \cdot g \cdot v \cdot \sin\theta$) dominates power demand; carrying less body mass drastically reduces required climbing wattage.' }]
  },

  // --- Suite MMMM: Acoustics, Sound Engineering & Psychoacoustics (761 - 765) ---
  // 6. Sound Pressure Level (SPL) Inverse Square Law Distance Calculator
  {
    slug: 'sound-pressure-level-inverse-square-law-calculator',
    name: 'Sound Pressure Level (SPL) Inverse Square Law Distance Calculator',
    description: 'Calculate acoustic sound pressure level drop over distance (L_p2 = L_p1 - 20 · log₁₀(r₂ / r₁)) in dB SPL, acoustic power in Watts, and safe exposure durations.',
    category: 'Science',
    icon: 'text',
    keywords: ['sound pressure level calculator', 'spl inverse square law formula 20 log r2 over r1', 'decibel drop with distance calculator online', 'audio acoustic distance attenuation calculator', 'db spl distance drop calculator'],
    order: 640,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Reference Level L_p1 (dB SPL), Reference Distance r₁ (m) & Target Distance r₂ (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="spl-l1">Reference Level (dB)</label>
          <input class="tool-textarea" id="spl-l1" type="number" step="any" value="100.0" placeholder="100.0 dB SPL (Rock Concert)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spl-r1">Ref Distance r₁ (m)</label>
          <input class="tool-textarea" id="spl-r1" type="number" step="any" value="1.0" placeholder="1.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="spl-r2">Target Distance r₂ (m)</label>
          <input class="tool-textarea" id="spl-r2" type="number" step="any" value="16.0" placeholder="16.0 m Audience" />
        </div>
      </div>
      <div id="spl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="spl-res-l2" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">75.9 dB SPL</span>
            <span class="stat-label">Sound Pressure Level at Distance r₂</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="spl-res-drop" style="font-weight:700;">-24.1 dB Attenuation (Pressure: 0.125 Pa | Safe Exposure: Continuous)</span>
            <span class="stat-label">Total Free-Field Geometric Attenuation & Acoustic Pressure</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l1El = document.getElementById('spl-l1'), r1El = document.getElementById('spl-r1'), r2El = document.getElementById('spl-r2');
  const l2ResEl = document.getElementById('spl-res-l2'), dpResEl = document.getElementById('spl-res-drop');

  function update() {
    const Lp1 = parseFloat(l1El.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(Lp1) || isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0) return;

    // L_p2 = L_p1 - 20 * log10(r2 / r1)
    const attenuation = 20 * Math.log10(r2 / r1);
    const Lp2 = Lp1 - attenuation;

    // Acoustic pressure p = p0 * 10^(Lp / 20) where p0 = 20 uPa
    const p2_pa = 20e-6 * Math.pow(10, Lp2 / 20);

    let oshaSafety = '';
    if (Lp2 < 85) oshaSafety = 'Continuous Safe Exposure (<85 dB)';
    else if (Lp2 <= 90) oshaSafety = 'OSHA 8-Hour Limit (90 dB)';
    else if (Lp2 <= 95) oshaSafety = 'OSHA 4-Hour Limit (95 dB)';
    else if (Lp2 <= 100) oshaSafety = 'OSHA 2-Hour Limit (100 dB)';
    else if (Lp2 <= 105) oshaSafety = 'OSHA 1-Hour Limit (105 dB)';
    else oshaSafety = 'DANGER: Immediate Hearing Protection Required (>110 dB)';

    l2ResEl.textContent = Lp2.toFixed(1) + ' dB SPL';
    dpResEl.textContent = '-' + attenuation.toFixed(1) + ' dB Attenuation (Pressure: ' + p2_pa.toFixed(3) + ' Pa | ' + oshaSafety + ')';
  }

  [l1El, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reference sound level $L_{p1}$ in dB SPL measured at close distance $r_1$.',
      'Enter reference distance $r_1$ in meters (typically 1.0 meter).',
      'Enter listener target distance $r_2$ in meters.',
      'Inspect attenuated sound pressure level in dB SPL (-6 dB per doubling of distance), physical air pressure fluctuation in Pascals, and OSHA noise safety exposure thresholds.'
    ],
    benefitTitle: 'The -6 dB per Distance Doubling Inverse Square Law',
    benefitContent: 'In an open free-field acoustic environment, sound wave intensity spreads over the expanding spherical wave front ($I \propto 1/r^2$); every time distance from the point source doubles ($2\times$), the sound pressure level drops by exactly 6.02 dB.',
    faqs: [{ q: 'Why is it 20·log10 for pressure but 10·log10 for power?', a: 'Because acoustic sound power is proportional to pressure squared ($P \propto p^2$); taking the logarithm brings the exponent down ($10 \times 2 = 20$).' }]
  },

  // 7. Sabine & Eyring Room Reverberation Time (RT60) Calculator
  {
    slug: 'reverberation-time-sabine-eyring-calculator',
    name: 'Room Reverberation Time (RT60 - Sabine & Eyring Formula) Calculator',
    description: 'Calculate architectural room acoustic reverberation time (RT60 = 0.161 · V / A) in seconds for concert halls, recording studios, and classrooms.',
    category: 'Science',
    icon: 'text',
    keywords: ['rt60 reverberation time calculator', 'sabine formula rt60 0.161 v over a', 'eyring reverberation time calculator online', 'room acoustic treatment rt60 calculator', 'recording studio acoustics rt60 online'],
    order: 641,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Room Volume V (m³), Total Boundary Surface Area S (m²) & Mean Absorption Coeff α',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rt-vol">Room Volume V (m³)</label>
          <input class="tool-textarea" id="rt-vol" type="number" step="any" value="200.0" placeholder="200.0 m³ (Studio / Classroom)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-surf">Surface Area S (m²)</label>
          <input class="tool-textarea" id="rt-surf" type="number" step="any" value="220.0" placeholder="220.0 m² (Walls+Ceiling+Floor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rt-alpha">Mean Absorption α</label>
          <input class="tool-textarea" id="rt-alpha" type="number" step="0.05" value="0.25" placeholder="0.25 (Treated Room)" />
        </div>
      </div>
      <div id="rt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rt-res-rt60" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">RT₆₀ = 0.585 Seconds</span>
            <span class="stat-label">Reverberation Decay Time (Sabine RT₆₀)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rt-res-type" style="color:var(--green-dark); font-weight:700;">Optimal Recording Studio & Speech Clarity (Eyring: 0.508 s)</span>
            <span class="stat-label">Acoustic Usage Suitability & Eyring Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('rt-vol'), sEl = document.getElementById('rt-surf'), aEl = document.getElementById('rt-alpha');
  const rResEl = document.getElementById('rt-res-rt60'), tResEl = document.getElementById('rt-res-type');

  function update() {
    const V = parseFloat(vEl.value), S = parseFloat(sEl.value), alpha = parseFloat(aEl.value);
    if (isNaN(V) || isNaN(S) || isNaN(alpha) || V <= 0 || S <= 0 || alpha <= 0 || alpha >= 1.0) return;

    // Total absorption in Sabins: A = S * alpha
    const A = S * alpha;

    // Sabine RT60 = 0.161 * V / A  [seconds]
    const rtSabine = (0.161 * V) / A;

    // Eyring RT60 = 0.161 * V / ( -S * ln(1 - alpha) )
    const rtEyring = (0.161 * V) / (-S * Math.log(1 - alpha));

    let acousticCategory = '';
    if (rtSabine < 0.4) acousticCategory = 'Dry Recording Booth / Broadcast Studio (<0.4s)';
    else if (rtSabine <= 0.7) acousticCategory = 'Optimal Classroom & Audio Control Room (0.4 - 0.7s)';
    else if (rtSabine <= 1.2) acousticCategory = 'Chamber Music Hall & Multipurpose Auditorium (0.8 - 1.2s)';
    else if (rtSabine <= 2.2) acousticCategory = 'Symphony Concert Hall (1.5 - 2.2s Warm Acoustic Resonance)';
    else acousticCategory = 'Cathedral / Church Echo Chamber (>2.2s High Reverberance)';

    rResEl.textContent = 'RT₆₀ = ' + rtSabine.toFixed(3) + ' s (Sabine)';
    tResEl.textContent = acousticCategory + ' | Eyring: ' + rtEyring.toFixed(3) + ' s (Total Absorption: ' + Math.round(A) + ' metric Sabins)';
  }

  [vEl, sEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total enclosed room interior volume V in cubic meters ($m^3$).',
      'Enter combined total boundary surface area S (walls, ceiling, floor) in $m^2$.',
      'Enter area-weighted mean acoustic absorption coefficient $\alpha$ (0.05 for bare concrete/glass, 0.25 for treated rooms, 0.70+ for anechoic acoustic foam).',
      'Inspect Sabine RT60 decay time in seconds, Eyring dead-room formula comparison, and recommended room acoustic application.'
    ],
    benefitTitle: 'Wallace Clement Sabine 1898 Harvard Acoustic Pioneer',
    benefitContent: 'RT60 measures the duration required for sound pressure energy to decay by 60 decibels ($1\text{ millionth}$ of original power); tuning RT60 via acoustic absorption panels balances speech intelligibility against musical warmth.',
    faqs: [{ q: 'Why is Eyring formula more accurate for dead treated studios?', a: 'Sabine\'s formula erroneously predicts non-zero decay time for 100% absorbing surfaces ($\alpha=1$), whereas Eyring\'s log formula correctly converges to zero seconds.' }]
  },

  // 8. Acoustic Doppler Effect Frequency Shift Calculator
  {
    slug: 'doppler-effect-moving-source-observer-calculator',
    name: 'Acoustic Doppler Effect Frequency Shift (f\' = f₀·(v ± v_o)/(v ∓ v_s)) Calculator',
    description: 'Calculate acoustic Doppler frequency shift and perceived audio pitch from moving sound sources (sirens, vehicles, trains) and moving listeners.',
    category: 'Science',
    icon: 'text',
    keywords: ['doppler effect calculator', 'acoustic doppler shift formula moving source observer', 'siren frequency pitch shift calculator online', 'sound speed doppler effect online', 'physics wave doppler shift calculator'],
    order: 642,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Source Frequency f₀ (Hz), Source Speed v_s (km/h) & Observer Speed v_o (km/h)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dop-f0">Source Pitch f₀ (Hz)</label>
          <input class="tool-textarea" id="dop-f0" type="number" step="any" value="800" placeholder="800 Hz (Emergency Siren)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dop-vs">Source Speed (km/h)</label>
          <input class="tool-textarea" id="dop-vs" type="number" step="any" value="108.0" placeholder="108.0 km/h (30 m/s)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dop-dir">Source Motion</label>
          <select class="tool-textarea" id="dop-dir">
            <option value="approaching" selected>Approaching Observer (Higher Pitch)</option>
            <option value="receding">Receding Away (Lower Pitch)</option>
          </select>
        </div>
      </div>
      <div id="dop-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dop-res-f" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">f\' = 876.5 Hz (+76.5 Hz Shift)</span>
            <span class="stat-label">Observed Perceived Frequency (f\')</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dop-res-pitch" style="font-weight:700;">Pitch Shift: +1.58 Semitones (Receding Pitch: 735.8 Hz)</span>
            <span class="stat-label">Musical Interval Shift & Receding Comparison</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const f0El = document.getElementById('dop-f0'), vsEl = document.getElementById('dop-vs'), dirEl = document.getElementById('dop-dir');
  const fResEl = document.getElementById('dop-res-f'), pResEl = document.getElementById('dop-res-pitch');

  const c_sound = 343.0; // m / s in 20°C air

  function update() {
    const f0 = parseFloat(f0El.value), vsKmh = parseFloat(vsEl.value);
    const mode = dirEl.value;

    if (isNaN(f0) || isNaN(vsKmh) || f0 <= 0 || vsKmh < 0) return;

    const vsMs = vsKmh / 3.6;
    if (vsMs >= c_sound) {
      fResEl.textContent = 'Sonic Boom Mach Wave (v_s ≥ 343 m/s)';
      pResEl.textContent = 'Source moving at supersonic speed (Mach ' + (vsMs / c_sound).toFixed(2) + ')';
      return;
    }

    // Approaching: f_app = f0 * ( c / (c - vs) )
    const f_app = f0 * (c_sound / (c_sound - vsMs));
    // Receding: f_rec = f0 * ( c / (c + vs) )
    const f_rec = f0 * (c_sound / (c_sound + vsMs));

    const fObs = mode === 'approaching' ? f_app : f_rec;
    const shiftHz = fObs - f0;

    // Musical semitone shift = 12 * log2(fObs / f0)
    const semitones = 12 * Math.log2(fObs / f0);

    fResEl.textContent = 'f\' = ' + fObs.toFixed(1) + ' Hz (' + (shiftHz >= 0 ? '+' : '') + shiftHz.toFixed(1) + ' Hz Shift)';
    pResEl.textContent = 'Pitch Shift: ' + (semitones >= 0 ? '+' : '') + semitones.toFixed(2) + ' Semitones | Approaching: ' + f_app.toFixed(1) + ' Hz, Receding: ' + f_rec.toFixed(1) + ' Hz';
  }

  [f0El, vsEl].forEach(el => el.addEventListener('input', update));
  dirEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter resting sound source fundamental frequency $f_0$ in Hz.',
      'Enter sound source travel velocity in km/h.',
      'Select relative motion direction (Approaching listener or Receding away).',
      'Inspect perceived Doppler frequency $f\'$, frequency shift in Hz, and musical pitch change in semitones.'
    ],
    benefitTitle: 'Christian Doppler 1842 Acoustic Wave Compression',
    benefitContent: 'As a moving vehicle emits sound waves, each successive wave crest is launched closer to the previous crest, compressing the effective wavelength ahead ($\lambda\' = (c - v_s)/f_0$) to produce a sharp upward pitch shift.',
    faqs: [{ q: 'What happens when a source reaches the speed of sound (Mach 1)?', a: 'Wavefronts bunch together into a single infinitely dense acoustic shockwave known as a Sonic Boom.' }]
  },

  // 9. Room Modes & Standing Wave Resonance (Rayleigh Equation) Calculator
  {
    slug: 'room-modes-standing-waves-axial-tangential-calculator',
    name: 'Room Modes & Standing Wave Resonance (Rayleigh Formula) Calculator',
    description: 'Calculate rectangular acoustic room mode resonant frequencies (f = (c/2) · √((p/L)² + (q/W)² + (r/H)²)) for axial, tangential, and oblique standing wave bass peaks.',
    category: 'Science',
    icon: 'text',
    keywords: ['room modes calculator', 'standing waves room acoustics formula rayleigh', 'axial tangential oblique room modes calculator', 'bass standing wave room resonance calculator online', 'studio acoustic bass trap calculator'],
    order: 643,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Room Dimensions: Length L (m), Width W (m) & Ceiling Height H (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rm-len">Length L (m)</label>
          <input class="tool-textarea" id="rm-len" type="number" step="any" value="6.0" placeholder="6.0 m Length" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-wid">Width W (m)</label>
          <input class="tool-textarea" id="rm-wid" type="number" step="any" value="4.5" placeholder="4.5 m Width" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rm-hgt">Height H (m)</label>
          <input class="tool-textarea" id="rm-hgt" type="number" step="any" value="2.8" placeholder="2.8 m Height" />
        </div>
      </div>
      <div id="rm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rm-res-fund" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">28.6 Hz (1,0,0 Axial)</span>
            <span class="stat-label">Lowest Fundamental Room Mode (f_1,0,0)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rm-res-modes" style="font-weight:700;">Axial Modes: 28.6 Hz (L) | 38.1 Hz (W) | 61.3 Hz (H) | Schroeder: 165 Hz</span>
            <span class="stat-label">Primary Axial Resonances & Schroeder Crossover Frequency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('rm-len'), wEl = document.getElementById('rm-wid'), hEl = document.getElementById('rm-hgt');
  const fResEl = document.getElementById('rm-res-fund'), mResEl = document.getElementById('rm-res-modes');

  const c_sound = 343.0; // m / s

  function update() {
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), H = parseFloat(hEl.value);
    if (isNaN(L) || isNaN(W) || isNaN(H) || L <= 0 || W <= 0 || H <= 0) return;

    // Fundamental axial modes: f = c / (2 * dim)
    const fL1 = c_sound / (2 * L);
    const fW1 = c_sound / (2 * W);
    const fH1 = c_sound / (2 * H);

    // Schroeder frequency approx f_sch = 2000 * sqrt( RT60 / V ) where assume RT60 ~ 0.4s
    const V = L * W * H;
    const fSchroeder = 2000 * Math.sqrt(0.4 / V);

    const minFund = Math.min(fL1, fW1, fH1);

    fResEl.textContent = minFund.toFixed(1) + ' Hz (Lowest Fundamental Axial Mode)';
    mResEl.textContent = 'Axial Modes: ' + fL1.toFixed(1) + ' Hz (L) | ' + fW1.toFixed(1) + ' Hz (W) | ' + fH1.toFixed(1) + ' Hz (H) | Schroeder: ' + Math.round(fSchroeder) + ' Hz';
  }

  [lEl, wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter rectangular room length, width, and height in meters.',
      'Inspect discrete low-frequency standing wave room modes (Axial modes along L, W, H).',
      'Inspect the Schroeder crossover frequency below which discrete room resonances cause boomy bass peaks and nulls.'
    ],
    benefitTitle: 'Lord Rayleigh 1896 Acoustic Eigenmodes',
    benefitContent: 'Enclosed rooms act as 3D acoustic resonators; parallel reflective walls trap standing waves where half-wavelengths fit the room dimensions ($L = n\lambda/2$), producing severe $\pm 20\text{ dB}$ bass peaks and null cancellations that require corner bass traps.',
    faqs: [{ q: 'What is the Schroeder frequency?', a: 'The Schroeder frequency ($f_{\text{sch}} \approx 2000\sqrt{\text{RT60}/V}$) marks the transition where individual discrete standing modes merge into a continuous diffuse sound field.' }]
  },

  // 10. Psychoacoustic Loudness (Phon to Sone & Stevens' Power Law) Calculator
  {
    slug: 'loudness-phon-sone-stevens-power-law-calculator',
    name: 'Psychoacoustic Loudness (Phon to Sone) & Stevens Power Law Calculator',
    description: 'Calculate perceived human psychoacoustic loudness (Sones = 2^((Phons - 40) / 10)) and equal-loudness Fletcher-Munson / ISO 226 perceived volume scaling.',
    category: 'Science',
    icon: 'text',
    keywords: ['phon to sone calculator', 'psychoacoustic loudness formula 2 to power phon minus 40 over 10', 'stevens power law sound loudness calculator online', 'fletcher munson perceived loudness calculator', 'iso 226 equal loudness online'],
    order: 644,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Loudness Level in Phons (L_N: 20 to 120 Phons)',
    controlsHtml: `      <div class="control-group">
        <label class="control-label" for="ph-val">Loudness Level (Phons)</label>
        <input class="tool-textarea" id="ph-val" type="number" step="any" value="70.0" placeholder="70.0 Phons (Normal Conversation / Vacuum)" />
      </div>
      <div id="ph-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ph-res-sone" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.00 Sones (Perceived Loudness)</span>
            <span class="stat-label">Linear Perceived Loudness (Sones)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ph-res-comp" style="font-weight:700;">8× Louder than 40 Phon Reference (1 Sone = 40 dB SPL @ 1 kHz)</span>
            <span class="stat-label">Subjective Loudness Multiplier vs Reference</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phEl = document.getElementById('ph-val');
  const sResEl = document.getElementById('ph-res-sone'), cResEl = document.getElementById('ph-res-comp');

  function update() {
    const phons = parseFloat(phEl.value);
    if (isNaN(phons) || phons < 0) return;

    // Sones = 2^( (Phons - 40) / 10 )
    let sones = 0;
    if (phons >= 40) {
      sones = Math.pow(2, (phons - 40) / 10);
    } else {
      // Sub-40 phon threshold power approximation: sones = (phons / 40)^2.642
      sones = Math.pow(phons / 40, 2.642);
    }

    sResEl.textContent = sones.toFixed(2) + ' Sones (Linear Loudness)';
    cResEl.textContent = sones.toFixed(2) + '× Perceived Subjective Loudness compared to 1.0 Sone (40 Phon Reference)';
  }

  phEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter equal-loudness level in Phons (1 Phon = 1 dB SPL at 1,000 Hz).',
      'Inspect linear perceived loudness in Sones (where 1 Sone = 40 Phons, and +10 Phons doubles perceived loudness to 2 Sones).'
    ],
    benefitTitle: 'Stanley Smith Stevens 1936 Psychoacoustic Power Law',
    benefitContent: 'Human hearing perception is non-linear; an increase of +10 decibels/phons produces a doubling ($2\times$) of perceived subjective loudness ($S = 2^{(P-40)/10}$).',
    faqs: [{ q: 'What is the difference between Decibels, Phons, and Sones?', a: 'Decibels measure physical acoustic energy; Phons measure frequency-weighted equal loudness contours; Sones measure direct linear subjective perception ($2\text{ sones} = \text{twice as loud as }1\text{ sone}$).' }]
  },

  // --- Suite NNNN: Chemical Reaction Engineering & Catalysis (766 - 770) ---
  // 11. Arrhenius Equation Activation Energy & Reaction Rate Calculator
  {
    slug: 'arrhenius-equation-activation-energy-rate-calculator',
    name: 'Arrhenius Equation Reaction Rate Constant (k = A·e^(-E_a / RT)) Calculator',
    description: 'Calculate chemical reaction rate constant k (k = A · e^(-E_a / (R·T))) and temperature acceleration from Arrhenius activation energy E_a and pre-exponential factor A.',
    category: 'Science',
    icon: 'text',
    keywords: ['arrhenius equation calculator', 'reaction rate constant formula k equals a exp minus ea over rt', 'activation energy chemical kinetics calculator', 'temperature coefficient reaction rate online', 'physical chemistry arrhenius kinetics online'],
    order: 645,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Activation Energy E_a (kJ/mol), Temperature T (°C) & Pre-Exponential Factor A (s⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="arr-ea">Activation E_a (kJ/mol)</label>
          <input class="tool-textarea" id="arr-ea" type="number" step="any" value="75.0" placeholder="75.0 kJ/mol" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arr-t">Temperature T (°C)</label>
          <input class="tool-textarea" id="arr-t" type="number" step="any" value="25.0" placeholder="25.0 °C (Room Temp)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="arr-a">Factor A (s⁻¹)</label>
          <input class="tool-textarea" id="arr-a" type="number" step="any" value="1.0e13" placeholder="1.0e13 s⁻¹" />
        </div>
      </div>
      <div id="arr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="arr-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">k = 7.15 × 10⁻¹ s⁻¹</span>
            <span class="stat-label">Reaction Rate Constant (k = A·e^(-E_a/RT))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="arr-res-q10" style="font-weight:700;">Q₁₀ Temp Coeff: 2.76× Speedup per +10°C Rise</span>
            <span class="stat-label">Arrhenius Temperature Sensitivity (Q₁₀ Factor)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const eaEl = document.getElementById('arr-ea'), tEl = document.getElementById('arr-t'), aEl = document.getElementById('arr-a');
  const kResEl = document.getElementById('arr-res-k'), qResEl = document.getElementById('arr-res-q10');

  const R = 8.314462618; // J / mol * K

  function update() {
    const Ea_kj = parseFloat(eaEl.value), Tc = parseFloat(tEl.value), A = parseFloat(aEl.value);
    if (isNaN(Ea_kj) || isNaN(Tc) || isNaN(A) || Ea_kj <= 0 || A <= 0 || Tc < -273.15) return;

    const Tk = Tc + 273.15;
    const Ea_j = Ea_kj * 1000;

    // k = A * exp( -Ea / (R * T) )
    const k = A * Math.exp(-Ea_j / (R * Tk));

    // Rate constant at T + 10°C
    const Tk_plus10 = Tk + 10;
    const k_plus10 = A * Math.exp(-Ea_j / (R * Tk_plus10));
    const Q10 = k_plus10 / k;

    kResEl.textContent = 'k = ' + k.toExponential(3) + ' s⁻¹';
    qResEl.textContent = 'Q₁₀ = ' + Q10.toFixed(2) + '× Rate Acceleration per +10°C (T = ' + Tk.toFixed(1) + ' K, E_a = ' + Ea_kj + ' kJ/mol)';
  }

  [eaEl, tEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter reaction activation energy $E_a$ in kJ/mol.',
      'Enter absolute chemical reaction temperature in Celsius.',
      'Enter pre-exponential frequency collision factor A in $s^{-1}$ (typically $10^{11}$ to $10^{14}\text{ s}^{-1}$).',
      'Inspect reaction rate constant k and temperature coefficient $Q_{10}$ multiplier per +10°C thermal increase.'
    ],
    benefitTitle: 'Svante Arrhenius 1889 Kinetic Activation Barrier',
    benefitContent: 'Chemical reactions require reactant molecules to possess sufficient kinetic collision energy to cross the transition state energy barrier ($E_a$); raising temperature exponentially increases the fraction of molecules with $E \ge E_a$.',
    faqs: [{ q: 'Why do chemical reaction rates roughly double for every 10°C rise?', a: 'For typical activation energies (~50 to 80 kJ/mol), the Arrhenius exponential term yields a $Q_{10}$ temperature coefficient between 2.0 and 3.0.' }]
  },

  // 12. Michaelis-Menten Enzyme Kinetics & Lineweaver-Burk Calculator
  {
    slug: 'michaelis-menten-enzyme-kinetics-calculator',
    name: 'Michaelis-Menten Enzyme Kinetics & Lineweaver-Burk Calculator',
    description: 'Calculate enzymatic reaction velocity (v = V_max · [S] / (K_m + [S])), turnover rate k_cat, catalytic efficiency (k_cat / K_m), and Lineweaver-Burk double reciprocal parameters.',
    category: 'Science',
    icon: 'text',
    keywords: ['michaelis menten calculator', 'enzyme kinetics formula vmax s over km plus s', 'lineweaver burk double reciprocal calculator online', 'enzyme catalytic efficiency kcat over km calculator', 'biochemistry enzyme reaction rate online'],
    order: 646,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Maximum Velocity V_max (μM/s), Michaelis Constant K_m (μM) & Substrate [S] (μM)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mm-vmax">V_max (μM/s)</label>
          <input class="tool-textarea" id="mm-vmax" type="number" step="any" value="100.0" placeholder="100.0 μM/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-km">K_m (μM)</label>
          <input class="tool-textarea" id="mm-km" type="number" step="any" value="25.0" placeholder="25.0 μM" />
        </div>
        <div class="control-group">
          <label class="control-label" for="mm-s">Substrate [S] (μM)</label>
          <input class="tool-textarea" id="mm-s" type="number" step="any" value="50.0" placeholder="50.0 μM" />
        </div>
      </div>
      <div id="mm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mm-res-v" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">v = 66.7 μM / s (66.7% V_max)</span>
            <span class="stat-label">Initial Enzymatic Reaction Velocity (v)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mm-res-lb" style="font-weight:700;">1/v = 0.0150 s/μM | 1/[S] = 0.020 μM⁻¹ (Lineweaver-Burk Slope: 0.25 s)</span>
            <span class="stat-label">Lineweaver-Burk Double Reciprocal Coordinates</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vmEl = document.getElementById('mm-vmax'), kmEl = document.getElementById('mm-km'), sEl = document.getElementById('mm-s');
  const vResEl = document.getElementById('mm-res-v'), lbResEl = document.getElementById('mm-res-lb');

  function update() {
    const Vmax = parseFloat(vmEl.value), Km = parseFloat(kmEl.value), S = parseFloat(sEl.value);
    if (isNaN(Vmax) || isNaN(Km) || isNaN(S) || Vmax <= 0 || Km <= 0 || S <= 0) return;

    // v = Vmax * [S] / (Km + [S])
    const v = (Vmax * S) / (Km + S);
    const pctVmax = (v / Vmax) * 100;

    const invV = 1 / v;
    const invS = 1 / S;
    const slope = Km / Vmax;

    vResEl.textContent = 'v = ' + v.toFixed(1) + ' μM / s (' + pctVmax.toFixed(1) + '% V_max)';
    lbResEl.textContent = '1/v = ' + invV.toFixed(4) + ' s/μM | 1/[S] = ' + invS.toFixed(4) + ' μM⁻¹ (Slope K_m/V_max = ' + slope.toFixed(3) + ' s)';
  }

  [vmEl, kmEl, sEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter maximum asymptotic enzymatic reaction velocity V_max in μM/s.',
      'Enter Michaelis constant K_m in μM (substrate concentration where $v = 0.5 V_{\max}$).',
      'Enter instantaneous substrate concentration [S] in μM.',
      'Inspect initial reaction rate v and Lineweaver-Burk double reciprocal coordinates ($1/v$ vs $1/[S]$).'
    ],
    benefitTitle: 'Leonor Michaelis & Maud Menten 1913 Catalytic Model',
    benefitContent: 'Enzyme catalysis follows hyperbolic saturation kinetics; at low substrate concentrations ($[S] \ll K_m$) reaction rate is first-order, while at high substrate concentrations ($[S] \gg K_m$) enzyme active sites become fully saturated (zero-order kinetics).',
    faqs: [{ q: 'What does a low Km value indicate?', a: 'A lower $K_m$ indicates higher substrate affinity, meaning the enzyme achieves high catalytic velocity even at low substrate concentrations.' }]
  },

  // 13. CSTR Continuous Stirred-Tank Reactor Sizing & Conversion Calculator
  {
    slug: 'cstr-continuous-stirred-tank-reactor-conversion-calculator',
    name: 'Continuous Stirred-Tank Reactor (CSTR) Volume & Conversion Calculator',
    description: 'Calculate chemical engineering CSTR reactor vessel volume (V = F_A0 · X / (-r_A)) and space time τ from molar inlet feed rate, fractional conversion X, and reaction rate kinetics.',
    category: 'Science',
    icon: 'text',
    keywords: ['cstr volume calculator', 'continuous stirred tank reactor design formula v equals fa0 x over minus ra', 'chemical reactor space time tau calculator', 'cstr conversion kinetics calculator online', 'chemical engineering cstr sizing online'],
    order: 647,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inlet Feed F_A0 (mol/s), Conversion X (0 to 0.99) & 1st-Order Rate Constant k (s⁻¹)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cstr-fa0">Feed F_A0 (mol/s)</label>
          <input class="tool-textarea" id="cstr-fa0" type="number" step="any" value="5.0" placeholder="5.0 mol/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cstr-ca0">Inlet C_A0 (mol/L)</label>
          <input class="tool-textarea" id="cstr-ca0" type="number" step="any" value="2.0" placeholder="2.0 mol/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cstr-x">Conversion X (0-1)</label>
          <input class="tool-textarea" id="cstr-x" type="number" step="0.05" min="0.01" max="0.99" value="0.80" placeholder="0.80 (80% Conversion)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cstr-k">Rate Const k (s⁻¹)</label>
          <input class="tool-textarea" id="cstr-k" type="number" step="any" value="0.05" placeholder="0.05 s⁻¹" />
        </div>
      </div>
      <div id="cstr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cstr-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">200.0 Liters Volume</span>
            <span class="stat-label">Required CSTR Vessel Volume (V = F_A0·X / (-r_A))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cstr-res-tau" style="font-weight:700;">Space Time τ = 80.0 s | Volumetric Flow Q = 2.50 L/s</span>
            <span class="stat-label">Reactor Space Time (τ = V / Q) & Flow Rate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fa0El = document.getElementById('cstr-fa0'), ca0El = document.getElementById('cstr-ca0');
  const xEl = document.getElementById('cstr-x'), kEl = document.getElementById('cstr-k');
  const vResEl = document.getElementById('cstr-res-vol'), tResEl = document.getElementById('cstr-res-tau');

  function update() {
    const Fa0 = parseFloat(fa0El.value), Ca0 = parseFloat(ca0El.value);
    const X = parseFloat(xEl.value), k = parseFloat(kEl.value);

    if (isNaN(Fa0) || isNaN(Ca0) || isNaN(X) || isNaN(k) || Fa0 <= 0 || Ca0 <= 0 || X <= 0 || X >= 1.0 || k <= 0) return;

    // Volumetric flow rate Q = Fa0 / Ca0 [L / s]
    const Q = Fa0 / Ca0;

    // For 1st order reaction: -r_A = k * C_A = k * C_A0 * (1 - X)
    const ra = k * Ca0 * (1 - X); // mol / (L * s)

    // CSTR Design Equation: V = Fa0 * X / (-ra)  [Liters]
    const V = (Fa0 * X) / ra;
    const tau = V / Q;

    vResEl.textContent = V.toFixed(1) + ' Liters (' + (V / 1000).toFixed(3) + ' m³ CSTR)';
    tResEl.textContent = 'Space Time τ = ' + tau.toFixed(1) + ' s | Volumetric Flow Q = ' + Q.toFixed(2) + ' L/s (-r_A = ' + ra.toFixed(3) + ' mol/L·s)';
  }

  [fa0El, ca0El, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter inlet reactant molar feed rate $F_{A0}$ in mol/s.',
      'Enter inlet reactant concentration $C_{A0}$ in mol/L.',
      'Enter target fractional conversion X (e.g. 0.80 for 80% reaction conversion).',
      'Enter first-order reaction kinetic rate constant k in $s^{-1}$.',
      'Inspect required perfectly mixed CSTR reactor tank volume in Liters/$m^3$ and space time $\tau$.'
    ],
    benefitTitle: 'Continuous Well-Mixed Reactor Design',
    benefitContent: 'In an ideal CSTR, vigorous mechanical agitation creates uniform composition throughout the tank identical to the exit stream; because reaction occurs entirely at the lowest reactant concentration ($C_A = C_{A0}(1-X)$), CSTRs require larger volumes than Plug Flow Reactors for high conversions.',
    faqs: [{ q: 'Why use a CSTR instead of a PFR if CSTR volume is larger?', a: 'CSTRs provide excellent temperature control for highly exothermic reactions and easy continuous pH and catalyst slurry handling.' }]
  },

  // 14. Plug Flow Reactor (PFR) Volume & Space Time Calculator
  {
    slug: 'pfr-plug-flow-reactor-volume-calculator',
    name: 'Plug Flow Reactor (PFR / Tubular Reactor) Volume & Conversion Calculator',
    description: 'Calculate tubular Plug Flow Reactor (PFR) volume (V = (F_A0 / (k·C_A0)) · ln(1 / (1 - X))) in Liters and compare volume savings over CSTR.',
    category: 'Science',
    icon: 'text',
    keywords: ['pfr volume calculator', 'plug flow reactor design equation formula', 'tubular reactor space time pfr calculator online', 'pfr vs cstr volume comparison calculator', 'chemical reaction engineering pfr online'],
    order: 648,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Inlet Feed F_A0 (mol/s), Concentration C_A0 (mol/L) & Conversion X (0-0.99)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pfr-fa0">Feed F_A0 (mol/s)</label>
          <input class="tool-textarea" id="pfr-fa0" type="number" step="any" value="5.0" placeholder="5.0 mol/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pfr-ca0">Inlet C_A0 (mol/L)</label>
          <input class="tool-textarea" id="pfr-ca0" type="number" step="any" value="2.0" placeholder="2.0 mol/L" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pfr-x">Conversion X (0-1)</label>
          <input class="tool-textarea" id="pfr-x" type="number" step="0.05" min="0.01" max="0.99" value="0.80" placeholder="0.80" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pfr-k">Rate Const k (s⁻¹)</label>
          <input class="tool-textarea" id="pfr-k" type="number" step="any" value="0.05" placeholder="0.05 s⁻¹" />
        </div>
      </div>
      <div id="pfr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pfr-res-vol" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">80.5 Liters Volume</span>
            <span class="stat-label">Required PFR Tubular Volume (V = (F_A0/k·C_A0)·ln(1/(1-X)))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pfr-res-cmp" style="color:var(--green-dark); font-weight:700;">59.8% Volume Savings vs CSTR (CSTR: 200.0 L vs PFR: 80.5 L)</span>
            <span class="stat-label">PFR Efficiency Advantage over CSTR for Same Conversion</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const fa0El = document.getElementById('pfr-fa0'), ca0El = document.getElementById('pfr-ca0');
  const xEl = document.getElementById('pfr-x'), kEl = document.getElementById('pfr-k');
  const vResEl = document.getElementById('pfr-res-vol'), cResEl = document.getElementById('pfr-res-cmp');

  function update() {
    const Fa0 = parseFloat(fa0El.value), Ca0 = parseFloat(ca0El.value);
    const X = parseFloat(xEl.value), k = parseFloat(kEl.value);

    if (isNaN(Fa0) || isNaN(Ca0) || isNaN(X) || isNaN(k) || Fa0 <= 0 || Ca0 <= 0 || X <= 0 || X >= 1.0 || k <= 0) return;

    // PFR 1st-order: V_pfr = (Fa0 / (k * Ca0)) * ln( 1 / (1 - X) )
    const V_pfr = (Fa0 / (k * Ca0)) * Math.log(1 / (1 - X));

    // CSTR for same conversion: V_cstr = (Fa0 * X) / (k * Ca0 * (1 - X))
    const V_cstr = (Fa0 * X) / (k * Ca0 * (1 - X));
    const savingsPct = ((V_cstr - V_pfr) / V_cstr) * 100;

    const Q = Fa0 / Ca0;
    const tau_pfr = V_pfr / Q;

    vResEl.textContent = V_pfr.toFixed(1) + ' Liters (PFR Space Time τ = ' + tau_pfr.toFixed(1) + ' s)';
    cResEl.textContent = savingsPct.toFixed(1) + '% Volume Savings vs CSTR (PFR: ' + V_pfr.toFixed(1) + ' L vs CSTR: ' + V_cstr.toFixed(1) + ' L @ ' + (X*100) + '% Conv)';
  }

  [fa0El, ca0El, xEl, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter inlet reactant molar feed rate $F_{A0}$ in mol/s.',
      'Enter inlet reactant concentration $C_{A0}$ in mol/L.',
      'Enter target fractional conversion X.',
      'Enter first-order reaction kinetic rate constant k in $s^{-1}$.',
      'Inspect required tubular Plug Flow Reactor volume and direct volume savings comparison over a continuous stirred-tank reactor.'
    ],
    benefitTitle: 'Zero Backmixing Plug Flow Kinetics',
    benefitContent: 'Fluid travels through a PFR with no axial mixing; reactant concentration decreases progressively down the tube length, keeping reaction rates high throughout the reactor and requiring significantly smaller reactor volume than a CSTR.',
    faqs: [{ q: 'Why is PFR volume always smaller than CSTR for positive-order reactions?', a: 'Because the average reaction rate in a PFR across the concentration gradient is always higher than the exit-concentration rate in a CSTR.' }]
  },

  // 15. Thiele Modulus & Catalyst Pellet Effectiveness Factor Calculator
  {
    slug: 'thiele-modulus-catalyst-effectiveness-factor-calculator',
    name: 'Thiele Modulus (ϕ) & Catalyst Pellet Effectiveness Factor (η) Calculator',
    description: 'Calculate heterogeneous catalysis Thiele modulus (ϕ = L · √(k / D_eff)) and internal pore diffusion effectiveness factor (η = tanh(ϕ) / ϕ) for industrial chemical catalysts.',
    category: 'Science',
    icon: 'text',
    keywords: ['thiele modulus calculator', 'catalyst effectiveness factor eta formula tanh phi over phi', 'pore diffusion limitation catalyst pellet calculator', 'heterogeneous catalysis chemical engineering online', 'weisz prater criterion thiele modulus calculator'],
    order: 649,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pellet Radius / Half-Thickness L (mm), Rate Constant k (s⁻¹) & Effective Diffusivity D_eff (m²/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="thl-l">Pellet Radius L (mm)</label>
          <input class="tool-textarea" id="thl-l" type="number" step="any" value="2.0" placeholder="2.0 mm (Porous Pellet)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="thl-k">Rate Const k (s⁻¹)</label>
          <input class="tool-textarea" id="thl-k" type="number" step="any" value="10.0" placeholder="10.0 s⁻¹" />
        </div>
        <div class="control-group">
          <label class="control-label" for="thl-deff">Diffusivity D_eff (m²/s)</label>
          <input class="tool-textarea" id="thl-deff" type="number" step="any" value="5.0e-7" placeholder="5.0e-7 m²/s" />
        </div>
      </div>
      <div id="thl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="thl-res-phi" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">ϕ = 8.94 (Thiele Modulus)</span>
            <span class="stat-label">Dimensionless Thiele Modulus (ϕ = L·√(k/D_eff))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="thl-res-eta" style="color:var(--green-dark); font-weight:700;">η = 0.112 (11.2% Catalyst Utilization - Severe Pore Diffusion Resistance)</span>
            <span class="stat-label">Internal Catalyst Effectiveness Factor (η = tanh(ϕ)/ϕ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('thl-l'), kEl = document.getElementById('thl-k'), dEl = document.getElementById('thl-deff');
  const pResEl = document.getElementById('thl-res-phi'), eResEl = document.getElementById('thl-res-eta');

  function update() {
    const L_mm = parseFloat(lEl.value), k = parseFloat(kEl.value), Deff = parseFloat(dEl.value);
    if (isNaN(L_mm) || isNaN(k) || isNaN(Deff) || L_mm <= 0 || k <= 0 || Deff <= 0) return;

    const L_m = L_mm / 1000;
    // Thiele modulus phi = L * sqrt( k / Deff )
    const phi = L_m * Math.sqrt(k / Deff);

    // Effectiveness factor for slab geometry: eta = tanh(phi) / phi
    const eta = Math.tanh(phi) / phi;
    const etaPct = eta * 100;

    pResEl.textContent = 'ϕ = ' + phi.toFixed(2) + ' (Thiele Modulus)';

    let regime = '';
    if (phi < 0.3) {
      regime = 'η = ' + eta.toFixed(3) + ' (' + etaPct.toFixed(1) + '%: Reaction Limited - Pellet Fully Active)';
      eResEl.style.color = '#22543d';
    } else if (phi <= 3.0) {
      regime = 'η = ' + eta.toFixed(3) + ' (' + etaPct.toFixed(1) + '%: Transitional Mixed Control)';
      eResEl.style.color = '#d97706';
    } else {
      regime = 'η = ' + eta.toFixed(3) + ' (' + etaPct.toFixed(1) + '%: Strong Pore Diffusion Resistance - Interior Starved)';
      eResEl.style.color = '#c53030';
    }
    eResEl.textContent = regime;
  }

  [lEl, kEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter porous catalyst pellet characteristic half-thickness / radius L in mm.',
      'Enter intrinsic catalytic reaction rate constant k in $s^{-1}$.',
      'Enter effective Knudsen pore diffusion coefficient $D_{\text{eff}}$ in $m^2/\text{s}$.',
      'Inspect dimensionless Thiele modulus $\phi$ and catalyst utilization effectiveness factor $\eta = \tanh(\phi)/\phi$.'
    ],
    benefitTitle: 'Ernest Thiele 1939 Heterogeneous Reaction Theory',
    benefitContent: 'When chemical reactions occur rapidly compared to molecular pore diffusion ($\phi > 3$), reactants consume before penetrating the catalyst pellet core, reducing overall catalyst utilization ($\eta \ll 1$) and wasting expensive precious metals (Pt/Pd).',
    faqs: [{ q: 'How do chemical engineers solve strong diffusion limitations?', a: 'By reducing catalyst pellet particle size or synthesizing eggshell catalysts where active metal is deposited only in a thin outer rim.' }]
  },

  // --- Suite OOOO: Mining, Geophysics & Earth Sciences (771 - 775) ---
  // 16. Seismic P-Wave and S-Wave Epicenter Distance Calculator
  {
    slug: 'seismic-wave-travel-time-epicenter-distance-calculator',
    name: 'Seismic P-Wave & S-Wave Earthquake Epicenter Distance Calculator',
    description: 'Calculate earthquake epicenter distance (d = Δt / (1/v_s - 1/v_p)) in kilometers from primary P-wave and secondary S-wave seismogram arrival time differential.',
    category: 'Science',
    icon: 'text',
    keywords: ['seismic wave epicenter calculator', 'p wave s wave travel time difference formula', 'earthquake epicenter distance calculator online', 'seismology p s wave arrival time calculator', 'geophysics earthquake triangulation online'],
    order: 650,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'S-P Time Interval Δt (seconds), P-Wave Speed v_p (km/s) & S-Wave Speed v_s (km/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="eq-dt">S-P Interval Δt (s)</label>
          <input class="tool-textarea" id="eq-dt" type="number" step="any" value="24.0" placeholder="24.0 s (Seismogram Delay)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eq-vp">P-Wave v_p (km/s)</label>
          <input class="tool-textarea" id="eq-vp" type="number" step="any" value="6.0" placeholder="6.0 km/s (Crustal P-Wave)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="eq-vs">S-Wave v_s (km/s)</label>
          <input class="tool-textarea" id="eq-vs" type="number" step="any" value="3.5" placeholder="3.5 km/s (Crustal S-Wave)" />
        </div>
      </div>
      <div id="eq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="eq-res-dist" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">201.6 km Distance</span>
            <span class="stat-label">Epicenter Radius Distance (d = Δt / (1/v_s - 1/v_p))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="eq-res-time" style="font-weight:700;">P-Arrival: 33.6 s | S-Arrival: 57.6 s (Travel Time from Focus)</span>
            <span class="stat-label">Individual Wave Transit Durations</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dtEl = document.getElementById('eq-dt'), vpEl = document.getElementById('eq-vp'), vsEl = document.getElementById('eq-vs');
  const dResEl = document.getElementById('eq-res-dist'), tResEl = document.getElementById('eq-res-time');

  function update() {
    const dt = parseFloat(dtEl.value), vp = parseFloat(vpEl.value), vs = parseFloat(vsEl.value);
    if (isNaN(dt) || isNaN(vp) || isNaN(vs) || dt <= 0 || vp <= vs || vs <= 0) return;

    // d = dt / ( (1/vs) - (1/vp) ) = dt * (vp * vs) / (vp - vs)
    const distKm = dt * (vp * vs) / (vp - vs);
    const distMiles = distKm * 0.621371;

    const tP = distKm / vp;
    const tS = distKm / vs;

    dResEl.textContent = distKm.toFixed(1) + ' km (' + distMiles.toFixed(1) + ' Miles Epicenter Distance)';
    tResEl.textContent = 'P-Arrival: ' + tP.toFixed(1) + ' s | S-Arrival: ' + tS.toFixed(1) + ' s (Travel Time from Earthquake Focus)';
  }

  [dtEl, vpEl, vsEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Measure the time delay interval $\Delta t = t_S - t_P$ between the initial primary P-wave arrival and the secondary shear S-wave arrival on a seismogram trace in seconds.',
      'Enter local crustal P-wave velocity $v_p$ (typically 5.5 to 6.5 km/s).',
      'Enter local crustal S-wave velocity $v_s$ (typically 3.0 to 3.8 km/s).',
      'Inspect calculated distance radius to the earthquake epicenter in kilometers and miles.'
    ],
    benefitTitle: 'Earthquake Triangulation & Body Wave Velocities',
    benefitContent: 'Compressional P-waves travel ~1.7× faster than transverse S-waves; calculating the S-P time lag from three separate seismic stations generates three intersecting distance circles that pinpoint the exact geographic epicenter coordinates.',
    faqs: [{ q: 'Why cannot S-waves travel through Earth\'s outer core?', a: 'S-waves are transverse shear waves; liquids have zero shear modulus ($G=0$), proving Earth\'s outer core is molten liquid.' }]
  },

  // 17. Airy Isostasy Crustal Root & Moho Depth Calculator
  {
    slug: 'moho-crustal-depth-airy-isostasy-calculator',
    name: 'Airy Isostasy Mountain Crustal Root & Moho Depth Calculator',
    description: 'Calculate mountain isostatic buoyant crustal root depth (b = h · ρ_c / (ρ_m - ρ_c)) in kilometers and total depth to the Mohorovičić (Moho) seismic discontinuity.',
    category: 'Science',
    icon: 'text',
    keywords: ['airy isostasy calculator', 'mountain crustal root depth formula moho', 'mohorovicic discontinuity depth calculator online', 'geophysics isostatic equilibrium calculator', 'crust mantle density buoyancy calculator'],
    order: 651,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Mountain Elevation h (km), Normal Crust Thickness T₀ (km) & Densities (g/cm³)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="iso-h">Elevation h (km)</label>
          <input class="tool-textarea" id="iso-h" type="number" step="any" value="4.5" placeholder="4.5 km (Himalayas / Andes)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="iso-t0">Base Crust T₀ (km)</label>
          <input class="tool-textarea" id="iso-t0" type="number" step="any" value="32.0" placeholder="32.0 km (Standard Continental)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="iso-rhoc">Crust Density ρ_c</label>
          <input class="tool-textarea" id="iso-rhoc" type="number" step="0.05" value="2.75" placeholder="2.75 g/cm³" />
        </div>
        <div class="control-group">
          <label class="control-label" for="iso-rhom">Mantle Density ρ_m</label>
          <input class="tool-textarea" id="iso-rhom" type="number" step="0.05" value="3.30" placeholder="3.30 g/cm³" />
        </div>
      </div>
      <div id="iso-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="iso-res-moho" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">59.0 km Moho Depth</span>
            <span class="stat-label">Total Depth to Mohorovičić Discontinuity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="iso-res-root" style="font-weight:700;">Sub-Crustal Root: 22.5 km (Total Crust Thickness: 63.5 km)</span>
            <span class="stat-label">Buoyant Isostatic Crustal Root Depth (b = h·ρ_c / Δρ)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const hEl = document.getElementById('iso-h'), t0El = document.getElementById('iso-t0');
  const rcEl = document.getElementById('iso-rhoc'), rmEl = document.getElementById('iso-rhom');
  const mResEl = document.getElementById('iso-res-moho'), rResEl = document.getElementById('iso-res-root');

  function update() {
    const h = parseFloat(hEl.value), T0 = parseFloat(t0El.value);
    const rho_c = parseFloat(rcEl.value), rho_m = parseFloat(rmEl.value);

    if (isNaN(h) || isNaN(T0) || isNaN(rho_c) || isNaN(rho_m) || h <= 0 || T0 <= 0 || rho_c <= 0 || rho_m <= rho_c) return;

    // Airy Isostasy root depth b = h * rho_c / (rho_m - rho_c)
    const deltaRho = rho_m - rho_c;
    const bRoot = h * (rho_c / deltaRho);

    // Total crustal thickness = T0 + h + b
    const totalCrust = T0 + h + bRoot;
    // Moho depth below sea level = T0 + b
    const mohoDepth = T0 + bRoot;

    mResEl.textContent = mohoDepth.toFixed(1) + ' km Moho Depth Below Sea Level';
    rResEl.textContent = 'Sub-Crustal Root: ' + bRoot.toFixed(1) + ' km (Total Crust: ' + totalCrust.toFixed(1) + ' km, Root/Top Ratio: ' + (bRoot/h).toFixed(1) + ':1)';
  }

  [hEl, t0El, rcEl, rmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter mountain topography elevation height h above sea level in kilometers.',
      'Enter standard undeformed continental crust reference thickness $T_0$ in km (typically ~30 to 35 km).',
      'Enter continental crust density $\rho_c$ in $g/\text{cm}^3$ (typically 2.7 to 2.8 $g/\text{cm}^3$).',
      'Enter upper mantle density $\rho_m$ in $g/\text{cm}^3$ (typically 3.3 $g/\text{cm}^3$).',
      'Inspect deep buoyant crustal root thickness and depth to the Mohorovičić seismic boundary.'
    ],
    benefitTitle: 'Sir George Biddell Airy 1855 Isostasy Hypothesis',
    benefitContent: 'Just as icebergs float with 90% of their mass submerged beneath water, high mountain ranges are supported by immense buoyant crustal roots extending 50 to 70 km deep into the denser asthenospheric mantle.',
    faqs: [{ q: 'What is the root-to-height ratio for typical continental mountains?', a: 'Because $\rho_c / (\rho_m - \rho_c) \approx 2.75 / (3.30 - 2.75) \approx 5.0$, every 1 km of mountain elevation requires approximately 5 km of deep subterranean crustal root.' }]
  },

  // 18. Magma Viscosity vs Silica Content & Temperature Calculator
  {
    slug: 'magma-viscosity-silica-content-temperature-calculator',
    name: 'Magma Viscosity vs Silica Content & Temperature Calculator',
    description: 'Calculate volcanic magma viscosity in Pascal-seconds (Pa·s) from SiO₂ silica weight percentage (Basalt 50% vs Rhyolite 75%) and magma temperature.',
    category: 'Science',
    icon: 'text',
    keywords: ['magma viscosity calculator', 'volcano silica content viscosity formula', 'basalt vs rhyolite magma viscosity calculator online', 'volcanology explosive eruption viscosity online', 'magma temperature viscosity giordano calculator'],
    order: 652,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Magma Composition Type (SiO₂ %) & Magma Temperature (°C)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="mag-type">Magma Rock Type</label>
          <select class="tool-textarea" id="mag-type">
            <option value="basalt" selected>Basaltic (50% SiO₂ - Hawaii, Kilauea)</option>
            <option value="andesite">Andesitic (60% SiO₂ - Mount St. Helens)</option>
            <option value="dacite">Dacitic (68% SiO₂ - Pinatubo)</option>
            <option value="rhyolite">Rhyolitic (75% SiO₂ - Yellowstone Supervolcano)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="mag-temp">Temperature (°C)</label>
          <input class="tool-textarea" id="mag-temp" type="number" step="any" value="1150" placeholder="1150 °C" />
        </div>
      </div>
      <div id="mag-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="mag-res-visc" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">η = 100 Pa · s</span>
            <span class="stat-label">Dynamic Magma Viscosity (Pa·s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="mag-res-erupt" style="color:var(--green-dark); font-weight:700;">Effusive Gentle Hawaiian Lava Flow (Low Viscosity, Low Explosivity)</span>
            <span class="stat-label">Volcanic Eruption Style & Flow Behavior</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const typeEl = document.getElementById('mag-type'), tEl = document.getElementById('mag-temp');
  const vResEl = document.getElementById('mag-res-visc'), eResEl = document.getElementById('mag-res-erupt');

  const MAGMA_MODELS = {
    'basalt':   { baseLog: 2.0, sio2: '50%', defaultT: 1150, desc: 'Effusive Gentle Lava Flow (Pahoehoe / Aa)' },
    'andesite': { baseLog: 4.5, sio2: '60%', defaultT: 1000, desc: 'Intermediate Explosive Vulcanian Eruptions' },
    'dacite':   { baseLog: 6.5, sio2: '68%', defaultT: 900,  desc: 'Highly Explosive Plinian Eruption & Lava Domes' },
    'rhyolite': { baseLog: 8.5, sio2: '75%', defaultT: 800,  desc: 'Catastrophic Ultra-Plinian Supervolcano Caldera' }
  };

  function update() {
    const m = MAGMA_MODELS[typeEl.value];
    const Tc = parseFloat(tEl.value);
    if (isNaN(Tc) || Tc < 500 || Tc > 1500) return;

    // Arrhenius temperature correction relative to default reference temp
    const deltaT = (m.defaultT - Tc) / 100;
    const logVisc = m.baseLog + (deltaT * 0.8);
    const viscPaS = Math.pow(10, logVisc);

    let vStr = '';
    if (viscPaS < 1e4) vStr = Math.round(viscPaS).toLocaleString() + ' Pa · s';
    else vStr = viscPaS.toExponential(2) + ' Pa · s';

    vResEl.textContent = 'η ≈ ' + vStr + ' (log₁₀ η = ' + logVisc.toFixed(1) + ')';
    eResEl.textContent = m.desc + ' (' + m.sio2 + ' SiO₂ @ ' + Tc + '°C)';
  }

  typeEl.addEventListener('change', () => {
    tEl.value = MAGMA_MODELS[typeEl.value].defaultT;
    update();
  });
  tEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select volcanic magma petrological type (Basalt 50% SiO₂, Andesite 60%, Dacite 68%, Rhyolite 75%).',
      'Enter magma chamber / eruption temperature in Celsius.',
      'Inspect dynamic magma viscosity in Pascal-seconds (Pa·s) and predict volcanic eruption style (gentle effusive shield flows vs catastrophic explosive Plinian ash columns).'
    ],
    benefitTitle: 'Silica Polymerization & Explosive Volcanism',
    benefitContent: 'Higher silica ($SiO_2$) content forms dense interconnected silicon-oxygen tetrahedral polymer networks, increasing magma viscosity by over six orders of magnitude ($10^2 \to 10^8\text{ Pa}\cdot\text{s}$) and trapping dissolved volcanic gases until explosive catastrophic fragmentation occurs.',
    faqs: [{ q: 'Why is basaltic lava so fluid compared to rhyolite?', a: 'Basalt has low silica content and high eruptive temperatures (~1,200°C), making it fluid like warm honey compared to stiff rhyolite paste.' }]
  },

  // 19. Theis Confined Aquifer Well Drawdown Calculator
  {
    slug: 'ground-water-drawdown-theis-well-equation-calculator',
    name: 'Theis Confined Aquifer Groundwater Well Drawdown Calculator',
    description: 'Calculate groundwater pumping well drawdown (s = (Q / 4π·T) · W(u)) in meters from pumping discharge rate Q, transmissivity T, storativity S, and distance r.',
    category: 'Science',
    icon: 'text',
    keywords: ['theis groundwater drawdown calculator', 'confined aquifer well drawdown formula w of u', 'theis well function calculator online', 'hydrogeology well pumping drawdown calculator', 'groundwater aquifer transmissivity storativity online'],
    order: 653,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pumping Rate Q (m³/day), Transmissivity T (m²/day), Storativity S & Distance r (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="th-q">Pumping Q (m³/day)</label>
          <input class="tool-textarea" id="th-q" type="number" step="any" value="1000" placeholder="1000 m³/day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-t">Transmissivity T</label>
          <input class="tool-textarea" id="th-t" type="number" step="any" value="250.0" placeholder="250.0 m²/day" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-s">Storativity S</label>
          <input class="tool-textarea" id="th-s" type="number" step="any" value="0.0005" placeholder="0.0005 (Confined)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-r">Distance r (m)</label>
          <input class="tool-textarea" id="th-r" type="number" step="any" value="50.0" placeholder="50.0 m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="th-time">Time t (days)</label>
          <input class="tool-textarea" id="th-time" type="number" step="any" value="5.0" placeholder="5.0 days" />
        </div>
      </div>
      <div id="th-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="th-res-dd" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">s = 3.02 m Drawdown</span>
            <span class="stat-label">Hydraulic Head Drawdown (s = (Q/4πT)·W(u))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="th-res-u" style="font-weight:700;">Well Function W(u) = 9.48 | u = 0.000250</span>
            <span class="stat-label">Theis Dimensionless Variable u & Exponential Integral W(u)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const qEl = document.getElementById('th-q'), tEl = document.getElementById('th-t'), sEl = document.getElementById('th-s');
  const rEl = document.getElementById('th-r'), tmEl = document.getElementById('th-time');
  const ddResEl = document.getElementById('th-res-dd'), uResEl = document.getElementById('th-res-u');

  function update() {
    const Q = parseFloat(qEl.value), T = parseFloat(tEl.value), S = parseFloat(sEl.value);
    const r = parseFloat(rEl.value), t = parseFloat(tmEl.value);

    if (isNaN(Q) || isNaN(T) || isNaN(S) || isNaN(r) || isNaN(t) || Q <= 0 || T <= 0 || S <= 0 || r <= 0 || t <= 0) return;

    // u = (r^2 * S) / (4 * T * t)
    const u = (Math.pow(r, 2) * S) / (4 * T * t);

    // Well function W(u) approximated via series: W(u) approx = -0.5772 - ln(u) + u - u^2/4 + ...
    let Wu = 0;
    if (u < 1.0) {
      Wu = -0.57721566 - Math.log(u) + u - (Math.pow(u, 2) / 4);
    } else {
      Wu = (Math.exp(-u) / u) * ((Math.pow(u, 2) + 2.334733 * u + 0.250621) / (Math.pow(u, 2) + 3.330657 * u + 1.681534));
    }

    // Drawdown s = (Q / (4 * pi * T)) * W(u)  [meters]
    const sDrawdown = (Q / (4 * Math.PI * T)) * Wu;

    ddResEl.textContent = 's = ' + sDrawdown.toFixed(2) + ' m (' + (sDrawdown * 3.28084).toFixed(1) + ' ft Water Table Drop)';
    uResEl.textContent = 'W(u) = ' + Wu.toFixed(2) + ' | u = ' + u.toExponential(3) + ' (r = ' + r + 'm after ' + t + ' days)';
  }

  [qEl, tEl, sEl, rEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter continuous well pumping discharge rate Q in $m^3/\text{day}$.',
      'Enter confined aquifer transmissivity T in $m^2/\text{day}$.',
      'Enter dimensionless storativity / storage coefficient S (typically $10^{-5}$ to $10^{-3}$ for confined aquifers).',
      'Enter observation distance r from pumping well in meters.',
      'Enter continuous pumping duration in days.',
      'Inspect groundwater head drawdown s in meters and feet.'
    ],
    benefitTitle: 'Charles Vernon Theis 1935 Transient Groundwater Solution',
    benefitContent: 'The Theis solution integrates transient heat flow analogies into hydrogeology, predicting the expanding cone of depression around pumping wells to prevent aquifer overdraft and well interference.',
    faqs: [{ q: 'What is Storativity in a confined aquifer?', a: 'Storativity is the volume of water an aquifer releases from storage per unit surface area per unit decline in hydraulic head.' }]
  },

  // 20. Rock Quality Designation (RQD) Geomechanics Calculator
  {
    slug: 'rock-quality-designation-rqd-geomechanics-calculator',
    name: 'Rock Quality Designation (RQD) Core Recovery & Geomechanics Calculator',
    description: 'Calculate geotechnical Rock Quality Designation (RQD = (Σ L_pieces≥10cm / L_total) · 100%) and determine Deere rock mass quality classification for tunnel and mining engineering.',
    category: 'Science',
    icon: 'text',
    keywords: ['rqd calculator', 'rock quality designation formula deere online', 'geotechnical rock mass quality rqd calculator', 'core recovery rqd mining calculator online', 'tunnel rock mass classification rqd online'],
    order: 654,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Core Run Length L_total (cm) & Sound Core Pieces (≥ 10 cm Length)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rqd-tot">Total Core Run (cm)</label>
          <input class="tool-textarea" id="rqd-tot" type="number" step="any" value="150.0" placeholder="150.0 cm (1.5 m Core Barrel)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rqd-pieces">Pieces ≥10cm (cm)</label>
          <input class="tool-textarea" id="rqd-pieces" type="text" value="25, 18, 30, 12, 15, 22" placeholder="e.g. 25, 18, 30, 12, 15 (Pieces ≥ 10cm)" />
        </div>
      </div>
      <div id="rqd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rqd-res-val" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">RQD = 81.3% (Good Quality)</span>
            <span class="stat-label">Rock Quality Designation (RQD)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rqd-res-desc" style="color:var(--green-dark); font-weight:700;">Deere Classification: GOOD (122 cm Sound Core / 150 cm Run)</span>
            <span class="stat-label">Geomechanical Rock Mass Classification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const totEl = document.getElementById('rqd-tot'), pcEl = document.getElementById('rqd-pieces');
  const vResEl = document.getElementById('rqd-res-val'), dResEl = document.getElementById('rqd-res-desc');

  function update() {
    const Ltot = parseFloat(totEl.value);
    const raw = pcEl.value;

    if (isNaN(Ltot) || Ltot <= 0) return;

    const pieces = raw.split(/[,\\s]+/).map(Number).filter(n => !isNaN(n) && n >= 10.0);
    const sumSoundPieces = pieces.reduce((a, b) => a + b, 0);

    // RQD = ( sum(L_pieces >= 10cm) / L_total ) * 100%
    const rqd = Math.min(100, (sumSoundPieces / Ltot) * 100);

    let classification = '';
    let color = '#22543d';

    if (rqd < 25) {
      classification = 'VERY POOR Rock Mass (Heavy Jointing / Fracturing)';
      color = '#c53030';
    } else if (rqd < 50) {
      classification = 'POOR Rock Mass';
      color = '#d97706';
    } else if (rqd < 75) {
      classification = 'FAIR Rock Quality';
      color = '#2563eb';
    } else if (rqd < 90) {
      classification = 'GOOD Rock Quality (Stable Tunneling)';
      color = '#22543d';
    } else {
      classification = 'EXCELLENT Massive Intact Rock Mass';
      color = '#22543d';
    }

    vResEl.textContent = 'RQD = ' + rqd.toFixed(1) + '%';
    dResEl.textContent = classification + ' (' + sumSoundPieces.toFixed(0) + ' cm Sound / ' + Ltot + ' cm Run, ' + pieces.length + ' Pieces)';
    dResEl.style.color = color;
  }

  totEl.addEventListener('input', update);
  pcEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter total borehole drill core run length in centimeters (e.g. 150 cm for 1.5m core barrel).',
      'Enter measured lengths of all individual sound, hard core cylinder pieces $\ge 10\text{ cm}$ (comma separated).',
      'Inspect Rock Quality Designation RQD percentage and Deere geomechanical rock engineering classification.'
    ],
    benefitTitle: 'Don U. Deere 1964 Geotechnical Standard',
    benefitContent: 'RQD quantifies the degree of jointing and fracture density in diamond drill cores, serving as a core input variable for Bieniawski\'s Rock Mass Rating (RMR) and the NGI Q-system for tunnel rock bolt and shotcrete support design.',
    faqs: [{ q: 'Why are pieces shorter than 10 cm discarded in RQD?', a: 'Pieces under 10 cm represent closely spaced natural joints, shear zones, or mechanical drilling breakage that compromise rock mass structural integrity.' }]
  },

  // --- Suite PPPP: Industrial Automation, PLC & Pneumatics (776 - 780) ---
  // 21. Pneumatic Air Cylinder Thrust Force & Air Consumption Calculator
  {
    slug: 'pneumatic-cylinder-thrust-force-air-consumption-calculator',
    name: 'Pneumatic Air Cylinder Thrust Force & CFM Consumption Calculator',
    description: 'Calculate pneumatic air cylinder extension/retraction force (F = P · A) in Newtons/lbf and compressed air consumption rate in SCFM and L/min from bore and stroke.',
    category: 'Science',
    icon: 'text',
    keywords: ['pneumatic cylinder force calculator', 'pneumatic thrust force formula f equals p times a', 'air cylinder cfm air consumption calculator online', 'double acting pneumatic cylinder sizing calculator', 'industrial automation pneumatic actuator online'],
    order: 655,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Cylinder Bore D (mm), Rod Diameter d (mm), Air Pressure P (bar or PSI) & Cycle Rate (cpm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pnu-bore">Bore D (mm)</label>
          <input class="tool-textarea" id="pnu-bore" type="number" step="any" value="50.0" placeholder="50.0 mm Bore" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pnu-rod">Rod d (mm)</label>
          <input class="tool-textarea" id="pnu-rod" type="number" step="any" value="20.0" placeholder="20.0 mm Rod" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pnu-p">Air Pressure (bar)</label>
          <input class="tool-textarea" id="pnu-p" type="number" step="any" value="6.0" placeholder="6.0 bar (87 PSI)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pnu-strk">Stroke (mm)</label>
          <input class="tool-textarea" id="pnu-strk" type="number" step="any" value="200.0" placeholder="200.0 mm Stroke" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pnu-cpm">Cycles / Min</label>
          <input class="tool-textarea" id="pnu-cpm" type="number" step="1" value="20" placeholder="20 CPM" />
        </div>
      </div>
      <div id="pnu-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pnu-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">1,178 N Extension (265 lbf)</span>
            <span class="stat-label">Pneumatic Push Extension Force</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pnu-res-air" style="font-weight:700;">Retraction: 989 N (222 lbf) | Air Flow: 1.83 SCFM (51.8 L/min)</span>
            <span class="stat-label">Pull Retraction Force & Compressed Air Consumption</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const bEl = document.getElementById('pnu-bore'), rEl = document.getElementById('pnu-rod');
  const pEl = document.getElementById('pnu-p'), sEl = document.getElementById('pnu-strk'), cEl = document.getElementById('pnu-cpm');
  const fResEl = document.getElementById('pnu-res-force'), aResEl = document.getElementById('pnu-res-air');

  function update() {
    const boreMm = parseFloat(bEl.value), rodMm = parseFloat(rEl.value);
    const pBar = parseFloat(pEl.value), strokeMm = parseFloat(sEl.value), cpm = parseFloat(cEl.value);

    if (isNaN(boreMm) || isNaN(rodMm) || isNaN(pBar) || isNaN(strokeMm) || isNaN(cpm) || boreMm <= 0 || pBar <= 0 || strokeMm <= 0 || cpm <= 0) return;

    const pPa = pBar * 1e5; // bar to Pa (N/m^2)
    const boreM = boreMm / 1000;
    const rodM = rodMm / 1000;

    // Full piston area (extension): A_ext = pi * (D/2)^2
    const A_ext = Math.PI * Math.pow(boreM / 2, 2);
    // Annular piston area (retraction): A_ret = pi/4 * (D^2 - d^2)
    const A_ret = (Math.PI / 4) * (Math.pow(boreM, 2) - Math.pow(rodM, 2));

    // Force = P * A
    const F_ext_N = pPa * A_ext;
    const F_ret_N = pPa * A_ret;

    const F_ext_lbf = F_ext_N * 0.224809;
    const F_ret_lbf = F_ret_N * 0.224809;

    // Compressed air volume per double stroke (ext + ret) at atmospheric pressure
    // Compression ratio CR = (pBar + 1.013) / 1.013
    const CR = (pBar + 1.013) / 1.013;
    const strokeM = strokeMm / 1000;
    const dispM3 = (A_ext + A_ret) * strokeM;
    const freeAirLitersPerCycle = dispM3 * 1000 * CR;
    const freeAirLpm = freeAirLitersPerCycle * cpm;
    const scfm = freeAirLpm / 28.3168;

    fResEl.textContent = Math.round(F_ext_N).toLocaleString() + ' N Extension (' + Math.round(F_ext_lbf) + ' lbf Push)';
    aResEl.textContent = 'Retract: ' + Math.round(F_ret_N).toLocaleString() + ' N (' + Math.round(F_ret_lbf) + ' lbf) | Air: ' + scfm.toFixed(2) + ' SCFM (' + Math.round(freeAirLpm) + ' L/min Free Air)';
  }

  [bEl, rEl, pEl, sEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter pneumatic cylinder piston bore diameter in millimeters.',
      'Enter piston rod diameter in millimeters.',
      'Enter shop air supply line gauge pressure in bar (typically 6.0 bar / ~90 PSI).',
      'Enter stroke length in millimeters and cycling speed in cycles per minute (CPM).',
      'Inspect extension push force, retraction pull force, and compressed air consumption in SCFM.'
    ],
    benefitTitle: 'ISO 15552 Pneumatic Actuator Sizing',
    benefitContent: 'Double-acting cylinders produce less force on retraction because the piston rod occupies cross-sectional volume; accounting for rod annular area ensures automated clamping mechanisms maintain necessary holding forces.',
    faqs: [{ q: 'Why is standard industrial air pressure set at 6 bar (87 PSI)?', a: '6 bar provides an optimal economic balance between actuator force output, compressor power consumption, and seal durability.' }]
  },

  // 22. Hydraulic Pump Flow Rate & Drive Motor Power Calculator
  {
    slug: 'hydraulic-pump-flow-power-displacement-calculator',
    name: 'Hydraulic Pump Flow Rate & Drive Motor Power Calculator',
    description: 'Calculate hydraulic fluid pump flow rate (Q = (V_d · n · η_v) / 1000) in L/min and electric motor drive power (P = (Q · p) / (600 · η_total)) in kW and Horsepower.',
    category: 'Science',
    icon: 'text',
    keywords: ['hydraulic pump power calculator', 'hydraulic pump flow rate formula displacement rpm', 'hydraulic motor drive power kw hp calculator', 'hydraulic pressure flow power calculator online', 'fluid power hydraulic pump sizing calculator'],
    order: 656,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Pump Displacement V_d (cm³/rev), Drive Speed n (RPM) & Pressure p (bar)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hyd-vd">Displacement (cm³/rev)</label>
          <input class="tool-textarea" id="hyd-vd" type="number" step="any" value="45.0" placeholder="45.0 cm³/rev (cc/rev)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hyd-rpm">Speed n (RPM)</label>
          <input class="tool-textarea" id="hyd-rpm" type="number" step="any" value="1450" placeholder="1450 RPM (4-Pole Motor)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hyd-p">Pressure p (bar)</label>
          <input class="tool-textarea" id="hyd-p" type="number" step="any" value="210.0" placeholder="210.0 bar (3000 PSI)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hyd-eff">Overall Efficiency</label>
          <input class="tool-textarea" id="hyd-eff" type="number" step="0.05" value="0.88" placeholder="0.88 (88% Efficiency)" />
        </div>
      </div>
      <div id="hyd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hyd-res-flow" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">62.0 L / min (16.4 GPM)</span>
            <span class="stat-label">Hydraulic Delivery Flow Rate (Q)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hyd-res-pwr" style="font-weight:700;">Drive Power: 24.7 kW (33.1 HP Electric Motor)</span>
            <span class="stat-label">Required Shaft Drive Power (P = Q·p / 600·η)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vdEl = document.getElementById('hyd-vd'), rpmEl = document.getElementById('hyd-rpm');
  const pEl = document.getElementById('hyd-p'), efEl = document.getElementById('hyd-eff');
  const flResEl = document.getElementById('hyd-res-flow'), pwResEl = document.getElementById('hyd-res-pwr');

  function update() {
    const Vd = parseFloat(vdEl.value), rpm = parseFloat(rpmEl.value);
    const pBar = parseFloat(pEl.value), eff = parseFloat(efEl.value);

    if (isNaN(Vd) || isNaN(rpm) || isNaN(pBar) || isNaN(eff) || Vd <= 0 || rpm <= 0 || pBar <= 0 || eff <= 0 || eff > 1.0) return;

    // Volumetric efficiency approx 95%
    const eta_v = 0.95;
    // Flow Q = (Vd * rpm * eta_v) / 1000  [L / min]
    const Q_lpm = (Vd * rpm * eta_v) / 1000;
    const Q_gpm = Q_lpm * 0.264172;

    // Drive power P = (Q * p) / (600 * eff)  [kW]
    const P_kw = (Q_lpm * pBar) / (600 * eff);
    const P_hp = P_kw * 1.34102;

    flResEl.textContent = Q_lpm.toFixed(1) + ' L / min (' + Q_gpm.toFixed(1) + ' GPM)';
    pwResEl.textContent = 'Drive Power: ' + P_kw.toFixed(1) + ' kW (' + P_hp.toFixed(1) + ' HP Motor | ' + pBar + ' bar / ' + Math.round(pBar*14.5038) + ' PSI)';
  }

  [vdEl, rpmEl, pEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter hydraulic pump geometric displacement in cm³/rev (cc/rev).',
      'Enter electric motor rotational speed in RPM.',
      'Enter operating system hydraulic pressure in bar (e.g. 210 bar = ~3,000 PSI).',
      'Enter total pump mechanical-hydraulic efficiency factor (typically 0.85 to 0.92).',
      'Inspect hydraulic output flow rate in L/min and GPM, and required electric drive motor power in kW and Horsepower.'
    ],
    benefitTitle: 'Fluid Power Energy Transformation',
    benefitContent: 'Hydraulic systems transmit high power through pressurized fluid ($P = Q \cdot p$); calculating exact electric motor sizing prevents motor thermal overload during peak pressure holding cycles in industrial hydraulic presses.',
    faqs: [{ q: 'Why is 600 the conversion divisor in P = Q·p / 600?', a: 'Because multiplying Liters/min ($10^{-3}\text{ m}^3 / 60\text{ s}$) by bar ($10^5\text{ N/m}^2$) gives $\text{kW} \times 600$.' }]
  },

  // 23. PLC Scan Time & Execution Cycle Latency Calculator
  {
    slug: 'plc-scan-time-execution-cycle-calculator',
    name: 'PLC Scan Time & Program Execution Cycle Latency Calculator',
    description: 'Calculate Programmable Logic Controller (PLC) scan cycle time (T_scan = T_input + T_program + T_output + T_comm) in ms and maximum detectable digital pulse frequency.',
    category: 'Science',
    icon: 'text',
    keywords: ['plc scan time calculator', 'plc execution cycle latency formula ms', 'plc ladder logic execution time calculator online', 'maximum input frequency plc scan time calculator', 'industrial automation plc scan cycle online'],
    order: 657,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Logic Instructions Count (K-Steps), Digital I/O Points & Ethernet Comm Burden',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="plc-steps">Logic Size (K-Instructions)</label>
          <input class="tool-textarea" id="plc-steps" type="number" step="any" value="25.0" placeholder="25.0 K-Instructions (25,000 rungs)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="plc-exec">CPU Speed (μs / k-inst)</label>
          <input class="tool-textarea" id="plc-exec" type="number" step="any" value="0.08" placeholder="0.08 μs/instruction (Fast CPU)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="plc-io">I/O Cards Overhead (ms)</label>
          <input class="tool-textarea" id="plc-io" type="number" step="any" value="1.2" placeholder="1.2 ms (I/O Bus Scan)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="plc-comm">Network Overhead (ms)</label>
          <input class="tool-textarea" id="plc-comm" type="number" step="any" value="1.5" placeholder="1.5 ms (EtherNet/IP / Profinet)" />
        </div>
      </div>
      <div id="plc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="plc-res-scan" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">T_scan = 4.70 ms</span>
            <span class="stat-label">Total PLC Scan Cycle Time</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="plc-res-freq" style="font-weight:700;">Max Input Frequency: 106.4 Hz (Min Pulse Width: 9.4 ms)</span>
            <span class="stat-label">Maximum Reliable Digital Input Sensor Frequency</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const stEl = document.getElementById('plc-steps'), exEl = document.getElementById('plc-exec');
  const ioEl = document.getElementById('plc-io'), cmEl = document.getElementById('plc-comm');
  const scResEl = document.getElementById('plc-res-scan'), fqResEl = document.getElementById('plc-res-freq');

  function update() {
    const kSteps = parseFloat(stEl.value), usPerInst = parseFloat(exEl.value);
    const tIO = parseFloat(ioEl.value), tComm = parseFloat(cmEl.value);

    if (isNaN(kSteps) || isNaN(usPerInst) || isNaN(tIO) || isNaN(tComm) || kSteps <= 0 || usPerInst <= 0 || tIO < 0 || tComm < 0) return;

    // Logic execution time in ms: (kSteps * 1000 * usPerInst) / 1000 = kSteps * usPerInst
    const tLogic = kSteps * usPerInst;

    // Total scan time in ms
    const tScan = tIO + tLogic + tComm;

    // Nyquist condition for PLC input scanning: pulse width must exceed 2 * tScan
    const minPulseMs = 2 * tScan;
    const maxFreqHz = 1000 / minPulseMs;

    scResEl.textContent = 'T_scan = ' + tScan.toFixed(2) + ' ms (Scan Rate: ' + Math.round(1000/tScan) + ' Hz)';
    fqResEl.textContent = 'Max Input Freq: ' + maxFreqHz.toFixed(1) + ' Hz | Logic: ' + tLogic.toFixed(2) + 'ms, I/O: ' + tIO.toFixed(2) + 'ms, Comm: ' + tComm.toFixed(2) + 'ms';
  }

  [stEl, exEl, ioEl, cmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total user program instruction memory size in thousands of instructions (K-steps).',
      'Enter PLC processor execution speed rating in microseconds per instruction.',
      'Enter physical I/O hardware bus module update overhead in milliseconds.',
      'Enter industrial Ethernet fieldbus communication overhead in milliseconds.',
      'Inspect total scan cycle execution time in ms and maximum reliable sensor pulse detection frequency without high-speed counter (HSC) modules.'
    ],
    benefitTitle: 'The Read-Execute-Write PLC Operating Cycle',
    benefitContent: 'PLCs execute cyclically: 1) Read physical inputs into the process image table, 2) Execute ladder logic sequentially, 3) Write output coils, and 4) Service communications; any physical digital sensor pulse shorter than $2\times T_{\text{scan}}$ risks being skipped entirely.',
    faqs: [{ q: 'How do PLCs handle high-speed encoder pulses faster than the scan time?', a: 'High-speed encoder signals bypass the main scan cycle by using dedicated hardware High-Speed Counter (HSC) and interrupt subroutines.' }]
  },

  // 24. Industrial Robot Arm Payload Inertia & Margin Calculator
  {
    slug: 'industrial-robot-payload-inertia-margin-calculator',
    name: 'Industrial Robot Tool Payload & Inertia Margin Calculator',
    description: 'Calculate 6-axis industrial robot wrist center of gravity offset (d) and total rotational mass moment of inertia (J = J_cg + m·d²) in kg·m² to prevent axis servo gearbox over-torque.',
    category: 'Science',
    icon: 'text',
    keywords: ['robot payload inertia calculator', 'robot wrist moment of inertia formula parallel axis', 'fanuc abb kuka robot payload margin calculator', 'end effector center of gravity inertia calculator', 'robotics tool load inertia online'],
    order: 658,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Tooling Mass m (kg), CG Offset Distance d (mm) & Rated Robot Max Payload (kg)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rb-mass">Tool Mass m (kg)</label>
          <input class="tool-textarea" id="rb-mass" type="number" step="any" value="12.0" placeholder="12.0 kg Gripper + Part" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rb-cg">CG Offset d (mm)</label>
          <input class="tool-textarea" id="rb-cg" type="number" step="any" value="150.0" placeholder="150.0 mm from Flange" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rb-maxm">Robot Max Mass (kg)</label>
          <input class="tool-textarea" id="rb-maxm" type="number" step="any" value="20.0" placeholder="20.0 kg (e.g. FANUC M-20iD)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rb-maxj">Max Inertia (kg·m²)</label>
          <input class="tool-textarea" id="rb-maxj" type="number" step="any" value="0.50" placeholder="0.50 kg·m² Wrist Limit" />
        </div>
      </div>
      <div id="rb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rb-res-j" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">J = 0.310 kg · m²</span>
            <span class="stat-label">Total Wrist Load Moment of Inertia (J)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rb-res-stat" style="color:var(--green-dark); font-weight:700;">SAFE: Within Payload Limits (Mass: 60.0%, Inertia: 62.0% of Max Rating)</span>
            <span class="stat-label">Robot Flange Payload & Dynamic Inertia Safety Status</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('rb-mass'), cgEl = document.getElementById('rb-cg');
  const mmEl = document.getElementById('rb-maxm'), mjEl = document.getElementById('rb-maxj');
  const jResEl = document.getElementById('rb-res-j'), stResEl = document.getElementById('rb-res-stat');

  function update() {
    const mass = parseFloat(mEl.value), dMm = parseFloat(cgEl.value);
    const maxMass = parseFloat(mmEl.value), maxJ = parseFloat(mjEl.value);

    if (isNaN(mass) || isNaN(dMm) || isNaN(maxMass) || isNaN(maxJ) || mass <= 0 || dMm <= 0 || maxMass <= 0 || maxJ <= 0) return;

    const dM = dMm / 1000;
    // Approximating rectangular gripper intrinsic inertia J_cg approx = (1/12)*m*(w^2 + h^2)
    const J_cg = (1 / 12) * mass * (Math.pow(0.12, 2) + Math.pow(0.12, 2));

    // Parallel axis theorem: J_total = J_cg + m * d^2
    const J_total = J_cg + (mass * Math.pow(dM, 2));

    const massPct = (mass / maxMass) * 100;
    const jPct = (J_total / maxJ) * 100;

    jResEl.textContent = 'J = ' + J_total.toFixed(3) + ' kg · m²';

    if (mass <= maxMass && J_total <= maxJ) {
      stResEl.textContent = 'SAFE: Within Rating (Mass: ' + massPct.toFixed(1) + '%, Inertia: ' + jPct.toFixed(1) + '% of Wrist Capacity)';
      stResEl.style.color = '#22543d';
    } else if (mass > maxMass && J_total <= maxJ) {
      stResEl.textContent = 'OVERLOAD: Mass Exceeds ' + maxMass + ' kg Limit (' + massPct.toFixed(1) + '%)';
      stResEl.style.color = '#c53030';
    } else if (mass <= maxMass && J_total > maxJ) {
      stResEl.textContent = 'INERTIA OVERLOAD: Moment of Inertia Exceeds ' + maxJ + ' kg·m² (' + jPct.toFixed(1) + '%) - Reduce Acceleration';
      stResEl.style.color = '#c53030';
    } else {
      stResEl.textContent = 'SEVERE OVERLOAD: Both Mass & Inertia Exceed Limits';
      stResEl.style.color = '#c53030';
    }
  }

  [mEl, cgEl, mmEl, mjEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total end-of-arm tooling (EOAT) plus workpiece mass in kilograms.',
      'Enter distance from robot tool mounting face flange to payload center of gravity (CG) in millimeters.',
      'Enter robot model rated maximum payload mass (kg) and maximum allowable wrist inertia in $kg\cdot m^2$.',
      'Inspect total dynamic mass moment of inertia ($J = J_{\text{cg}} + m d^2$) and safety verification status.'
    ],
    benefitTitle: 'Parallel Axis Theorem (Steiner) in Robotics',
    benefitContent: 'Even if tooling mass is well within rated payload limits, extending the center of gravity further away from the flange multiplies rotational inertia quadratically ($J \propto m \cdot d^2$), which can overheat and destroy wrist servo reduction gears during rapid emergency stops.',
    faqs: [{ q: 'What happens if a robot operates with excessive inertia?', a: 'Excessive inertia triggers servo tracking lag errors, path vibration ringing, and premature wear on cycloidal/harmonic gear teeth.' }]
  },

  // 25. Industrial Conveyor Belt Motor Power & Effective Tension Calculator
  {
    slug: 'conveyor-belt-motor-power-tension-calculator',
    name: 'Industrial Conveyor Belt Motor Power & Effective Tension (CEMA) Calculator',
    description: 'Calculate material handling conveyor belt effective drive tension (T_e = T_empty + T_material + T_lift) in Newtons and required motor drive power in kW and Horsepower.',
    category: 'Science',
    icon: 'text',
    keywords: ['conveyor belt power calculator', 'cema conveyor belt tension formula te', 'conveyor motor power kw hp calculator online', 'bulk material handling conveyor power calculator', 'conveyor belt sizing online'],
    order: 659,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Material Feed Rate (Tons/hour), Belt Speed v (m/s), Length L (m) & Lift Height H (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cnv-tph">Feed Rate (Tons/h)</label>
          <input class="tool-textarea" id="cnv-tph" type="number" step="any" value="250.0" placeholder="250.0 TPH" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cnv-v">Belt Speed (m/s)</label>
          <input class="tool-textarea" id="cnv-v" type="number" step="any" value="1.50" placeholder="1.50 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cnv-len">Length L (m)</label>
          <input class="tool-textarea" id="cnv-len" type="number" step="any" value="80.0" placeholder="80.0 m Center Distance" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cnv-h">Lift Height H (m)</label>
          <input class="tool-textarea" id="cnv-h" type="number" step="any" value="6.0" placeholder="6.0 m Incline Lift" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cnv-eff">Drive Efficiency</label>
          <input class="tool-textarea" id="cnv-eff" type="number" step="0.05" value="0.85" placeholder="0.85 (Gearbox + Motor)" />
        </div>
      </div>
      <div id="cnv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cnv-res-pwr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">8.71 kW (11.7 HP Motor)</span>
            <span class="stat-label">Required Electric Motor Drive Power</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cnv-res-ten" style="font-weight:700;">Effective Tension T_e = 4,937 N (1,110 lbf) | Material: 46.3 kg/m</span>
            <span class="stat-label">Total Effective Belt Drive Tension (T_e)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const tphEl = document.getElementById('cnv-tph'), vEl = document.getElementById('cnv-v');
  const lEl = document.getElementById('cnv-len'), hEl = document.getElementById('cnv-h'), efEl = document.getElementById('cnv-eff');
  const pwResEl = document.getElementById('cnv-res-pwr'), tnResEl = document.getElementById('cnv-res-ten');

  const g = 9.80665;
  const friction_f = 0.030; // CEMA idler and belt friction factor
  const beltWeightKgM = 20.0; // kg / m (belt + idler rotating parts weight)

  function update() {
    const tph = parseFloat(tphEl.value), vMs = parseFloat(vEl.value);
    const Lm = parseFloat(lEl.value), Hm = parseFloat(hEl.value), eff = parseFloat(efEl.value);

    if (isNaN(tph) || isNaN(vMs) || isNaN(Lm) || isNaN(Hm) || isNaN(eff) || tph <= 0 || vMs <= 0 || Lm <= 0 || Hm < 0 || eff <= 0 || eff > 1.0) return;

    // Material weight per linear meter q_m = (TPH * 1000) / (3600 * v)  [kg / m]
    const q_m = (tph * 1000) / (3600 * vMs);

    // Friction tension on empty and loaded belt T_f = friction_f * L * g * ( 2*q_belt + q_m )
    const T_friction = friction_f * Lm * g * ((2 * beltWeightKgM) + q_m);

    // Lift tension T_lift = q_m * g * H
    const T_lift = q_m * g * Hm;

    // Effective tension T_e = T_friction + T_lift  [Newtons]
    const Te = T_friction + T_lift;
    const Te_lbf = Te * 0.224809;

    // Motor Power P = (Te * v) / (1000 * eff)  [kW]
    const P_kw = (Te * vMs) / (1000 * eff);
    const P_hp = P_kw * 1.34102;

    pwResEl.textContent = P_kw.toFixed(2) + ' kW (' + P_hp.toFixed(1) + ' HP Motor)';
    tnResEl.textContent = 'T_e = ' + Math.round(Te).toLocaleString() + ' N (' + Math.round(Te_lbf).toLocaleString() + ' lbf) | Material Load: ' + q_m.toFixed(1) + ' kg/m (Friction: ' + Math.round(T_friction) + 'N, Lift: ' + Math.round(T_lift) + 'N)';
  }

  [tphEl, vEl, lEl, hEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter material bulk conveying capacity rate in Tons per Hour (TPH).',
      'Enter conveyor belt linear velocity in m/s.',
      'Enter center-to-center conveyor length in meters.',
      'Enter vertical material discharge lift height in meters.',
      'Enter gearbox and electric motor combined transmission efficiency (typically 0.80 to 0.90).',
      'Inspect effective belt drive tension $T_e$ in Newtons/lbf and required motor drive power in kW and Horsepower.'
    ],
    benefitTitle: 'Conveyor Equipment Manufacturers Association (CEMA) Standards',
    benefitContent: 'Conveyor power calculation combines mechanical idler rolling friction ($T_f$) and gravitational potential energy work ($T_{\text{lift}} = q_m g H$) to size electric drive motors and select appropriate multi-ply conveyor carcass tensile ratings.',
    faqs: [{ q: 'Why is belt speed important for sizing conveyor width and power?', a: 'Faster belt speeds reduce material loading per linear meter ($q_m \propto 1/v$), allowing narrower, lighter conveyor belts for the same TPH throughput.' }]
  }
];

pack20Tools.forEach(createTool);
console.log('Pack 20 complete: 25 tools created.');
