const { createTool } = require('./generate-curated-tools.cjs');

// Suite RR: 5 Tools in Robotics, Forward/Inverse Kinematics, PID Tuning & Stepper Motion to reach 530 tools
const toolsSuiteRR = [
  // 1. PID Controller Ziegler-Nichols Closed-Loop Tuning Calculator
  {
    slug: 'pid-controller-gain-tuning-calculator',
    name: 'PID Controller Ziegler-Nichols Tuning Calculator',
    description: 'Calculate optimal Proportional (K_p), Integral (T_i / K_i), and Derivative (T_d / K_d) control gains using the classic Ziegler-Nichols ultimate gain (K_u) and oscillation period (P_u) method.',
    category: 'Developer',
    icon: 'code',
    keywords: ['pid controller tuning calculator', 'ziegler nichols pid formula', 'kp ki kd pid calculator online', 'ultimate gain oscillation period pid', 'closed loop pid tuning calculator'],
    order: 401,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Ultimate Critical Gain (K_u) & Oscillation Period (P_u in sec)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pid-ku">Ultimate Gain (K_u)</label>
          <input class="tool-textarea" id="pid-ku" type="number" step="any" value="10.0" placeholder="10.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pid-pu">Oscillation Period P_u (sec)</label>
          <input class="tool-textarea" id="pid-pu" type="number" step="any" value="2.4" placeholder="2.4 sec" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pid-type">Controller Type</label>
          <select class="tool-textarea" id="pid-type">
            <option value="pid" selected>Full PID (Proportional-Integral-Derivative)</option>
            <option value="pi">PI (Proportional-Integral - No Overshoot)</option>
            <option value="p">P Only (Proportional)</option>
          </select>
        </div>
      </div>
      <div id="pid-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pid-res-kp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">K_p = 6.00</span>
            <span class="stat-label">Proportional Gain (K_p = 0.6·K_u)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pid-res-ki" style="color:#2563eb; font-weight:700;">K_i = 5.00</span>
            <span class="stat-label">Integral Gain (K_i = K_p / T_i)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pid-res-kd">K_d = 1.80</span>
            <span class="stat-label">Derivative Gain (K_d = K_p · T_d)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kuEl = document.getElementById('pid-ku'), puEl = document.getElementById('pid-pu'), typeEl = document.getElementById('pid-type');
  const kpResEl = document.getElementById('pid-res-kp'), kiResEl = document.getElementById('pid-res-ki'), kdResEl = document.getElementById('pid-res-kd');

  function update() {
    const Ku = parseFloat(kuEl.value), Pu = parseFloat(puEl.value), mode = typeEl.value;
    if (isNaN(Ku) || isNaN(Pu) || Ku <= 0 || Pu <= 0) return;

    let Kp = 0, Ti = 0, Td = 0, Ki = 0, Kd = 0;

    if (mode === 'p') {
      Kp = 0.50 * Ku;
      kpResEl.textContent = 'K_p = ' + Kp.toFixed(2);
      kiResEl.textContent = 'K_i = 0.00 (Off)';
      kdResEl.textContent = 'K_d = 0.00 (Off)';
    } else if (mode === 'pi') {
      Kp = 0.45 * Ku;
      Ti = Pu / 1.2;
      Ki = Kp / Ti;
      kpResEl.textContent = 'K_p = ' + Kp.toFixed(2);
      kiResEl.textContent = 'K_i = ' + Ki.toFixed(2) + ' (T_i = ' + Ti.toFixed(2) + 's)';
      kdResEl.textContent = 'K_d = 0.00 (Off)';
    } else { // Full PID
      Kp = 0.60 * Ku;
      Ti = 0.50 * Pu;
      Td = 0.125 * Pu;
      Ki = Kp / Ti;
      Kd = Kp * Td;
      kpResEl.textContent = 'K_p = ' + Kp.toFixed(2);
      kiResEl.textContent = 'K_i = ' + Ki.toFixed(2) + ' (T_i = ' + Ti.toFixed(2) + 's)';
      kdResEl.textContent = 'K_d = ' + Kd.toFixed(2) + ' (T_d = ' + Td.toFixed(2) + 's)';
    }
  }

  kuEl.addEventListener('input', update);
  puEl.addEventListener('input', update);
  typeEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Increase P-gain on physical hardware until output sustained neutral oscillations appear.',
      'Enter the critical ultimate oscillation gain (K_u) and measured oscillation wave period (P_u) in seconds.',
      'Select control architecture (Full PID, PI, or P).',
      'Inspect calibrated K_p, K_i, and K_d controller tuning gains.'
    ],
    benefitTitle: 'John Ziegler and Nathaniel Nichols\' 1942 Method',
    benefitContent: 'The Ziegler-Nichols heuristic provides a standard closed-loop tuning methodology that achieves rapid setpoint tracking with approximately quarter-decay ratio (25% initial overshoot).',
    faqs: [{ q: 'What is the full PID tuning formula?', a: 'K_p = 0.60 · K_u, T_i = 0.50 · P_u (K_i = K_p / T_i), and T_d = 0.125 · P_u (K_d = K_p · T_d).' }]
  },

  // 2. 2D Robotic Arm Forward Kinematics Calculator
  {
    slug: 'forward-kinematics-2d-robotic-arm-calculator',
    name: '2-Link Robotic Arm Forward Kinematics Calculator',
    description: 'Calculate 2D robotic arm end-effector tool position (x = l₁·cos θ₁ + l₂·cos(θ₁+θ₂), y = l₁·sin θ₁ + l₂·sin(θ₁+θ₂)) from link lengths and joint angles.',
    category: 'Developer',
    icon: 'code',
    keywords: ['forward kinematics calculator', '2 link robotic arm forward kinematics', 'end effector position calculator', 'robot joint angles to xy coordinates', 'planar robot arm kinematics online'],
    order: 402,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Link Lengths (l₁, l₂) & Joint Angles (θ₁, θ₂)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="fk-l1">Link 1 Length l₁ (cm)</label>
          <input class="tool-textarea" id="fk-l1" type="number" step="any" value="25" placeholder="25 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-l2">Link 2 Length l₂ (cm)</label>
          <input class="tool-textarea" id="fk-l2" type="number" step="any" value="20" placeholder="20 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-th1">Joint 1 Angle θ₁ (°)</label>
          <input class="tool-textarea" id="fk-th1" type="number" step="any" value="45" placeholder="45°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="fk-th2">Joint 2 Angle θ₂ (°)</label>
          <input class="tool-textarea" id="fk-th2" type="number" step="any" value="30" placeholder="30°" />
        </div>
      </div>
      <div id="fk-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="fk-res-pos" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">(22.85, 36.99) cm</span>
            <span class="stat-label">End-Effector Coordinates (X, Y)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="fk-res-reach" style="font-weight:700;">43.48 cm (96.6% Reach)</span>
            <span class="stat-label">Radial Distance from Base</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const l1El = document.getElementById('fk-l1'), l2El = document.getElementById('fk-l2');
  const th1El = document.getElementById('fk-th1'), th2El = document.getElementById('fk-th2');
  const posResEl = document.getElementById('fk-res-pos'), rchResEl = document.getElementById('fk-res-reach');

  function update() {
    const l1 = parseFloat(l1El.value), l2 = parseFloat(l2El.value);
    const deg1 = parseFloat(th1El.value), deg2 = parseFloat(th2El.value);

    if (isNaN(l1) || isNaN(l2) || isNaN(deg1) || isNaN(deg2) || l1 <= 0 || l2 <= 0) return;

    const rad1 = (deg1 * Math.PI) / 180;
    const rad12 = ((deg1 + deg2) * Math.PI) / 180;

    // x = l1 * cos(th1) + l2 * cos(th1 + th2)
    // y = l1 * sin(th1) + l2 * sin(th1 + th2)
    const x = l1 * Math.cos(rad1) + l2 * Math.cos(rad12);
    const y = l1 * Math.sin(rad1) + l2 * Math.sin(rad12);

    const radius = Math.sqrt(x*x + y*y);
    const maxReach = l1 + l2;
    const reachPct = (radius / maxReach) * 100;

    posResEl.textContent = '(' + x.toFixed(2) + ', ' + y.toFixed(2) + ') cm';
    rchResEl.textContent = radius.toFixed(2) + ' cm (' + reachPct.toFixed(1) + '% of max ' + maxReach + ' cm)';
  }

  [l1El, l2El, th1El, th2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter robotic upper arm link length l₁ and forearm length l₂ in cm.',
      'Enter shoulder joint angle θ₁ and elbow joint angle θ₂ in degrees.',
      'Inspect exact 2D Cartesian coordinates (X, Y) of the gripper end-effector and radial extension reach.'
    ],
    benefitTitle: 'Denavit-Hartenberg (DH) Planar Kinematics',
    benefitContent: 'Forward kinematics maps joint angles directly into operational workspace Cartesian coordinates via trigonometric coordinate transformation frames.',
    faqs: [{ q: 'What is the maximum reachable envelope of the arm?', a: 'A circle of radius R_max = l₁ + l₂ around the base origin (0, 0).' }]
  },

  // 3. 2D Robotic Arm Inverse Kinematics Calculator
  {
    slug: 'inverse-kinematics-2d-robotic-arm-calculator',
    name: '2-Link Robotic Arm Inverse Kinematics Calculator',
    description: 'Calculate target joint angles (θ₁, θ₂) using the Law of Cosines inverse kinematics (IK) to position a 2-link robotic arm at specific (X, Y) target coordinates.',
    category: 'Developer',
    icon: 'code',
    keywords: ['inverse kinematics calculator', '2 link ik calculator online', 'robot joint angles from target xy', 'elbow up elbow down inverse kinematics', 'scara robot ik formula'],
    order: 403,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Target (X, Y in cm) & Link Lengths (l₁, l₂ in cm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ik-x">Target X (cm)</label>
          <input class="tool-textarea" id="ik-x" type="number" step="any" value="20" placeholder="20 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-y">Target Y (cm)</label>
          <input class="tool-textarea" id="ik-y" type="number" step="any" value="25" placeholder="25 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-l1">Link 1 (cm)</label>
          <input class="tool-textarea" id="ik-l1" type="number" step="any" value="20" placeholder="20 cm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-l2">Link 2 (cm)</label>
          <input class="tool-textarea" id="ik-l2" type="number" step="any" value="20" placeholder="20 cm" />
        </div>
      </div>
      <div id="ik-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ik-res-angles" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">θ₁ = 14.0°, θ₂ = 74.7°</span>
            <span class="stat-label">Calculated Joint Angles (Elbow Down)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ik-res-sol">Valid Target in Workspace</span>
            <span class="stat-label">Kinematic Reachability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('ik-x'), yEl = document.getElementById('ik-y');
  const l1El = document.getElementById('ik-l1'), l2El = document.getElementById('ik-l2');
  const angResEl = document.getElementById('ik-res-angles'), solResEl = document.getElementById('ik-res-sol');

  function update() {
    const x = parseFloat(xEl.value), y = parseFloat(yEl.value);
    const l1 = parseFloat(l1El.value), l2 = parseFloat(l2El.value);

    if (isNaN(x) || isNaN(y) || isNaN(l1) || isNaN(l2) || l1 <= 0 || l2 <= 0) return;

    const r2 = Math.pow(x, 2) + Math.pow(y, 2);
    const r = Math.sqrt(r2);

    if (r > (l1 + l2)) {
      angResEl.textContent = 'Out of Reach! (Distance ' + r.toFixed(1) + ' cm > Max ' + (l1+l2) + ' cm)';
      angResEl.style.color = '#c53030';
      solResEl.textContent = 'Unreachable Target (Beyond Envelope)';
      solResEl.style.color = '#c53030';
      return;
    }
    if (r < Math.abs(l1 - l2)) {
      angResEl.textContent = 'Too Close! (Inside Deadzone)';
      angResEl.style.color = '#c53030';
      return;
    }

    // Law of Cosines: cos(th2) = (x^2 + y^2 - l1^2 - l2^2) / (2 * l1 * l2)
    let cosTh2 = (r2 - Math.pow(l1, 2) - Math.pow(l2, 2)) / (2 * l1 * l2);
    if (cosTh2 > 1) cosTh2 = 1;
    if (cosTh2 < -1) cosTh2 = -1;

    const th2Rad = Math.acos(cosTh2);
    // th1 = atan2(y, x) - atan2(l2 * sin(th2), l1 + l2 * cos(th2))
    const alpha = Math.atan2(y, x);
    const beta = Math.atan2(l2 * Math.sin(th2Rad), l1 + l2 * Math.cos(th2Rad));
    const th1Rad = alpha - beta;

    const th1Deg = (th1Rad * 180) / Math.PI;
    const th2Deg = (th2Rad * 180) / Math.PI;

    angResEl.textContent = 'θ₁ = ' + th1Deg.toFixed(1) + '°, θ₂ = ' + th2Deg.toFixed(1) + '°';
    angResEl.style.color = '#22543d';
    solResEl.textContent = 'Valid Reachable Target (r = ' + r.toFixed(1) + ' cm)';
    solResEl.style.color = '#22543d';
  }

  [xEl, yEl, l1El, l2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter desired target gripper position coordinates (X, Y) in cm.',
      'Enter arm link lengths l₁ and l₂ in cm.',
      'Inspect calculated shoulder (θ₁) and elbow (θ₂) joint angles required to reach the target.'
    ],
    benefitTitle: 'Elbow-Up vs Elbow-Down Dual Solutions',
    benefitContent: 'Planar 2-link robotic arms have two symmetric mathematical IK solutions for any reachable point (Elbow-Up and Elbow-Down), allowing motion planners to avoid physical obstacles.',
    faqs: [{ q: 'What happens if the target is outside l₁ + l₂?', a: 'The target lies outside the reachable workspace boundary and the mathematical inverse cosine has no real solution.' }]
  },

  // 4. Stepper Motor Steps per Degree & Pulse Resolution Calculator
  {
    slug: 'stepper-motor-steps-per-degree-calculator',
    name: 'Stepper Motor Steps per Degree & Resolution Calculator',
    description: 'Calculate total pulses per revolution (PPR = (360 / Step Angle) · Microstepping), step angular resolution in degrees and arcminutes for CNC and 3D printer drivers.',
    category: 'Developer',
    icon: 'code',
    keywords: ['stepper motor steps per degree calculator', 'microstepping resolution calculator', 'pulses per revolution stepper formula', '1.8 degree stepper microstep calculator', 'cnc stepper motor pulse calculator online'],
    order: 404,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Step Angle (°) & Microstep Driver Setting',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="stp-ang">Motor Full Step Angle</label>
          <select class="tool-textarea" id="stp-ang">
            <option value="1.8" selected>1.8° (200 Full Steps/Rev - Standard NEMA 17/23)</option>
            <option value="0.9">0.9° (400 Full Steps/Rev - High Precision)</option>
            <option value="7.5">7.5° (48 Full Steps/Rev - Can-Stack)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="stp-ustep">Microstepping Driver</label>
          <select class="tool-textarea" id="stp-ustep">
            <option value="1">1 (Full Step)</option>
            <option value="2">1/2 Half Step</option>
            <option value="4">1/4 Microstep</option>
            <option value="8">1/8 Microstep</option>
            <option value="16" selected>1/16 Microstep (A4988 / TMC2209 Standard)</option>
            <option value="32">1/32 Microstep</option>
            <option value="64">1/64 Microstep</option>
          </select>
        </div>
      </div>
      <div id="stp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="stp-res-ppr" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">3,200 Pulses / Rev</span>
            <span class="stat-label">Total Pulses per Revolution</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="stp-res-res" style="font-weight:700;">0.1125° per pulse (6.75 arcmin)</span>
            <span class="stat-label">Angular Positioning Resolution</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="stp-res-spd">8.89 Steps / Degree</span>
            <span class="stat-label">Pulses per Degree of Rotation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const angEl = document.getElementById('stp-ang'), ustepEl = document.getElementById('stp-ustep');
  const pprResEl = document.getElementById('stp-res-ppr'), resResEl = document.getElementById('stp-res-res'), spdResEl = document.getElementById('stp-res-spd');

  function update() {
    const stepAng = parseFloat(angEl.value), ustep = parseInt(ustepEl.value, 10);
    if (isNaN(stepAng) || isNaN(ustep) || stepAng <= 0 || ustep < 1) return;

    // Full steps per rev = 360 / stepAng
    const fullSteps = 360 / stepAng;
    // Total microsteps per rev = fullSteps * ustep
    const totalPpr = fullSteps * ustep;

    // Angular resolution = stepAng / ustep (degrees)
    const angResDeg = stepAng / ustep;
    const arcMins = angResDeg * 60;
    const pulsesPerDeg = totalPpr / 360;

    pprResEl.textContent = totalPpr.toLocaleString() + ' Pulses / Rev';
    resResEl.textContent = angResDeg.toFixed(4) + '° (' + arcMins.toFixed(2) + ' arcmin)';
    spdResEl.textContent = pulsesPerDeg.toFixed(2) + ' Steps / Degree';
  }

  angEl.addEventListener('change', update);
  ustepEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select motor step angle (1.8° standard or 0.9° high precision).',
      'Select motor driver microstepping setting (Full Step up to 1/64 microstepping).',
      'Inspect total pulses per revolution (PPR) and angular resolution per step.'
    ],
    benefitTitle: 'TMC SilentStepStick Microstep Interpolation',
    benefitContent: 'Microstepping divides full motor stator coil phases into sine-cosine current sub-steps, dramatically reducing low-speed acoustic resonance and vibration in 3D printers and telescope trackers.',
    faqs: [{ q: 'How many microsteps are in one revolution of a 1.8° motor at 1/16 microstepping?', a: '200 full steps × 16 = 3,200 microsteps per revolution (0.1125° per microstep).' }]
  },

  // 5. Lead Screw Pitch to Linear Travel & Steps per mm Calculator
  {
    slug: 'lead-screw-pitch-linear-travel-calculator',
    name: 'CNC Lead Screw Pitch & Steps per mm Calibration Calculator',
    description: 'Calculate 3D printer and CNC linear axis steps per millimeter (Steps/mm = (Steps per Rev · Microsteps) / Lead Screw Pitch) and linear speed.',
    category: 'Developer',
    icon: 'code',
    keywords: ['steps per mm calculator lead screw', 'cnc lead screw travel calculator', 't8 lead screw steps per mm formula', '3d printer z axis calibration calculator', 'lead screw pitch linear travel online'],
    order: 405,
    schemaCategory: 'DeveloperApplication',
    workspaceHeading: 'Motor Steps, Microstepping & Lead Screw Lead (Pitch × Starts)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ls-lead">Screw Lead / Travel per Rev (mm)</label>
          <input class="tool-textarea" id="ls-lead" type="number" step="any" value="8.0" placeholder="8.0 mm (Standard T8x8 Lead)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ls-mstep">Full Steps per Rev</label>
          <select class="tool-textarea" id="ls-mstep">
            <option value="200" selected>200 (1.8° Motor)</option>
            <option value="400">400 (0.9° Motor)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="ls-ustep">Driver Microstepping</label>
          <select class="tool-textarea" id="ls-ustep">
            <option value="16" selected>1/16 Microstepping</option>
            <option value="32">1/32 Microstepping</option>
            <option value="8">1/8 Microstepping</option>
          </select>
        </div>
      </div>
      <div id="ls-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ls-res-spm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">400.00 Steps / mm</span>
            <span class="stat-label">Marlin / Klipper Firmware Value (Steps/mm)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ls-res-res" style="font-weight:700;">2.50 μm (0.0025 mm)</span>
            <span class="stat-label">Linear Resolution per Step</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ldEl = document.getElementById('ls-lead'), msEl = document.getElementById('ls-mstep'), usEl = document.getElementById('ls-ustep');
  const spmResEl = document.getElementById('ls-res-spm'), resResEl = document.getElementById('ls-res-res');

  function update() {
    const leadMm = parseFloat(ldEl.value), fullSteps = parseFloat(msEl.value), usteps = parseFloat(usEl.value);
    if (isNaN(leadMm) || isNaN(fullSteps) || isNaN(usteps) || leadMm <= 0) return;

    // Total steps per revolution = fullSteps * usteps
    const totalStepsRev = fullSteps * usteps;
    // Steps per mm = totalStepsRev / leadMm
    const stepsPerMm = totalStepsRev / leadMm;
    // Resolution per step = 1 / stepsPerMm (in mm)
    const resMm = 1 / stepsPerMm;
    const resUm = resMm * 1000;

    spmResEl.textContent = stepsPerMm.toFixed(2) + ' Steps / mm';
    resResEl.textContent = resUm.toFixed(2) + ' μm (' + resMm.toFixed(4) + ' mm)';
  }

  [ldEl, msEl, usEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter lead screw lead in millimeters (linear distance traveled per 1 full rotation; T8x8 = 8mm lead, T8x4 = 4mm, T8x2 = 2mm).',
      'Select motor full steps (200 steps standard) and driver microstepping (1/16).',
      'Inspect calibrated Steps/mm parameter to enter into Marlin, Klipper, or GRBL CNC firmware configuration.'
    ],
    benefitTitle: 'Pitch vs Lead Multi-Start Thread Distinction',
    benefitContent: 'Lead equals pitch multiplied by the number of thread starts (Lead = Pitch × Starts); a standard 4-start T8 screw with 2mm pitch moves exactly 8.0 mm linear distance per revolution.',
    faqs: [{ q: 'What is the standard Z-axis steps/mm for an Ender 3 with T8x8 lead screw?', a: '(200 × 16) / 8.0 mm = exactly 400.00 Steps per mm.' }]
  }
];

toolsSuiteRR.forEach(createTool);
console.log('Suite RR complete: 5 tools created.');
