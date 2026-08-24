const { createTool } = require('./generate-curated-tools.cjs');

// Pack 47: 25 Robotics, Control Systems, Kinematics & Mechatronics Calculators (Tools 1426 to 1450)
const pack47Tools = [
  // 1. PID Controller Ziegler-Nichols Closed-Loop Tuning Calculator
  {
    slug: 'pid-controller-gain-ziegler-nichols-tuning-calculator',
    name: 'PID Controller Ziegler-Nichols Closed-Loop Tuning (K_p, T_i, T_d) Calculator',
    description: 'Calculate classical Ziegler-Nichols closed-loop PID controller tuning gains (Proportional K_p = 0.6·K_u, Integral time T_i = 0.5·T_u, Derivative time T_d = 0.125·T_u) from ultimate gain K_u and oscillation period T_u.',
    category: 'Math',
    icon: 'text',
    keywords: ['pid controller calculator', 'ziegler nichols closed loop tuning formula online', 'ultimate gain ku ultimate period tu pid tuning calculator', 'p pi pid controller gains kp ki kd calculator', 'control systems engineering robotics mechatronics online'],
    order: 1310,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Ultimate Sustained Oscillation Gain K_u & Ultimate Period T_u (Seconds)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="zn-ku">Ultimate Gain K_u</label>
          <input class="tool-textarea" id="zn-ku" type="number" step="0.5" value="10.0" placeholder="10.0 (Marginal Stability)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="zn-tu">Ultimate Period T_u (s)</label>
          <input class="tool-textarea" id="zn-tu" type="number" step="0.2" value="2.4" placeholder="2.4 Seconds" />
        </div>
      </div>
      <div id="zn-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="zn-res-pid" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">PID: K_p = 6.00 | K_i = 5.00 s⁻¹ | K_d = 1.80 s</span>
            <span class="stat-label">Full PID Controller Gains (K_p = 0.6·K_u, T_i = 0.5·T_u, T_d = 0.125·T_u)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="zn-res-other" style="color:var(--green-dark); font-weight:700;">PI: K_p = 4.50, K_i = 2.25 s⁻¹ | P-Only: K_p = 5.00 (Quarter Amplitude Damping)</span>
            <span class="stat-label">Alternative P and PI Controller Formulations</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const kuEl = document.getElementById('zn-ku'), tuEl = document.getElementById('zn-tu');
  const pidResEl = document.getElementById('zn-res-pid'), otResEl = document.getElementById('zn-res-other');

  function update() {
    const K_u = parseFloat(kuEl.value), T_u = parseFloat(tuEl.value);
    if (isNaN(K_u) || isNaN(T_u) || K_u <= 0 || T_u <= 0) return;

    // Classic Ziegler-Nichols Closed-Loop PID Tuning Rules:
    // P-only: Kp = 0.5 * Ku
    const Kp_p = 0.5 * K_u;

    // PI: Kp = 0.45 * Ku, Ti = Tu / 1.2 => Ki = Kp / Ti
    const Kp_pi = 0.45 * K_u;
    const Ti_pi = T_u / 1.2;
    const Ki_pi = Kp_pi / Ti_pi;

    // Full PID: Kp = 0.6 * Ku, Ti = 0.5 * Tu, Td = 0.125 * Tu
    const Kp_pid = 0.60 * K_u;
    const Ti_pid = 0.50 * T_u;
    const Td_pid = 0.125 * T_u;
    const Ki_pid = Kp_pid / Ti_pid;
    const Kd_pid = Kp_pid * Td_pid;

    pidResEl.textContent = 'PID: K_p = ' + Kp_pid.toFixed(2) + ' | K_i = ' + Ki_pid.toFixed(2) + ' | K_d = ' + Kd_pid.toFixed(2);
    otResEl.textContent = 'PI: K_p=' + Kp_pi.toFixed(2) + ', K_i=' + Ki_pi.toFixed(2) + ' | P-Only: K_p=' + Kp_p.toFixed(2) + ' (T_i=' + Ti_pid.toFixed(2) + 's, T_d=' + Td_pid.toFixed(3) + 's @ K_u=' + K_u + ')';
  }

  kuEl.addEventListener('input', update);
  tuEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Increase proportional gain with I and D turned off until the closed-loop system reaches continuous marginal sustained oscillation (Ultimate Gain $K_u$).',
      'Measure sustained oscillation period $T_u$ in seconds.',
      'Inspect calculated Proportional ($K_p$), Integral ($K_i$), and Derivative ($K_d$) control gains.'
    ],
    benefitTitle: 'John G. Ziegler & Nathaniel B. Nichols 1942 PID Benchmark',
    benefitContent: 'World\'s most famous empirical control loop tuning method, providing quarter-amplitude damping ($1/4$ decay ratio) for industrial process valves, temperature ovens, and robotic motor servos.',
    faqs: [{ q: 'What is the parallel vs ideal PID equation form?', a: 'Ideal form: $u(t) = K_p(e + \frac{1}{T_i}\int e\,dt + T_d\frac{de}{dt})$; Parallel form: $u(t) = K_p e + K_i\int e\,dt + K_d\frac{de}{dt}$.' }]
  },

  // 2. Robotic Forward Kinematics Denavit-Hartenberg (DH Parameters) Matrix Calculator
  {
    slug: 'forward-kinematics-denavit-hartenberg-dh-parameters-calculator',
    name: 'Robotic Forward Kinematics Denavit-Hartenberg (DH Parameters) Matrix Calculator',
    description: 'Calculate 4×4 homogeneous transformation matrix T_i = Rot_z(θ) · Trans_z(d) · Trans_x(a) · Rot_x(α) from Denavit-Hartenberg standard joint parameters (θ, d, a, α) for robotic arm forward kinematics.',
    category: 'Math',
    icon: 'text',
    keywords: ['denavit hartenberg calculator', 'dh parameters forward kinematics matrix formula online', 'homogeneous transformation matrix 4x4 robotics calculator', 'joint angle link length twist dh matrix calculator', 'robotics kinematics serial manipulator mechatronics online'],
    order: 1311,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Joint Angle θ (°), Link Offset d (mm), Link Length a (mm) & Link Twist α (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dh-theta">Joint θ (°)</label>
          <input class="tool-textarea" id="dh-theta" type="number" step="5" value="45.0" placeholder="45.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-d">Offset d (mm)</label>
          <input class="tool-textarea" id="dh-d" type="number" step="10" value="150.0" placeholder="150.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-a">Length a (mm)</label>
          <input class="tool-textarea" id="dh-a" type="number" step="10" value="250.0" placeholder="250.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dh-alpha">Twist α (°)</label>
          <input class="tool-textarea" id="dh-alpha" type="number" step="15" value="90.0" placeholder="90.0° (Perpendicular)" />
        </div>
      </div>
      <div id="dh-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dh-res-pos" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">End Position: [X: 176.8, Y: 176.8, Z: 150.0] mm</span>
            <span class="stat-label">Homogeneous Transformation Position Vector (P = [a·cos θ, a·sin θ, d]ᵀ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dh-res-mat" style="color:var(--green-dark); font-weight:700;">DH Transformation Matrix (4×4 Standard Formulation)</span>
            <span class="stat-label">3×3 Direction Cosine Rotation Matrix & [0, 0, 0, 1] Scale Row</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thEl = document.getElementById('dh-theta'), dEl = document.getElementById('dh-d');
  const aEl = document.getElementById('dh-a'), alEl = document.getElementById('dh-alpha');
  const psResEl = document.getElementById('dh-res-pos'), mtResEl = document.getElementById('dh-res-mat');

  function update() {
    const theta_deg = parseFloat(thEl.value), d_mm = parseFloat(dEl.value);
    const a_mm = parseFloat(aEl.value), alpha_deg = parseFloat(alEl.value);

    if (isNaN(theta_deg) || isNaN(d_mm) || isNaN(a_mm) || isNaN(alpha_deg)) return;

    const th = (theta_deg * Math.PI) / 180.0;
    const al = (alpha_deg * Math.PI) / 180.0;

    const ct = Math.cos(th), st = Math.sin(th);
    const ca = Math.cos(al), sa = Math.sin(al);

    // Standard DH Transformation Matrix:
    // [ cos(th), -sin(th)*cos(al),  sin(th)*sin(al), a*cos(th) ]
    // [ sin(th),  cos(th)*cos(al), -cos(th)*sin(al), a*sin(th) ]
    // [    0   ,      sin(al)    ,      cos(al)    ,     d     ]
    // [    0   ,         0       ,         0       ,     1     ]
    const r11 = ct, r12 = -st * ca, r13 = st * sa, px = a_mm * ct;
    const r21 = st, r22 = ct * ca, r23 = -ct * sa, py = a_mm * st;
    const r31 = 0, r32 = sa, r33 = ca, pz = d_mm;

    psResEl.textContent = 'Position P: [X=' + px.toFixed(1) + ', Y=' + py.toFixed(1) + ', Z=' + pz.toFixed(1) + '] mm';
    mtResEl.textContent = 'R₁=[' + r11.toFixed(2) + ', ' + r12.toFixed(2) + ', ' + r13.toFixed(2) + '] | R₂=[' + r21.toFixed(2) + ', ' + r22.toFixed(2) + ', ' + r23.toFixed(2) + '] | R₃=[' + r31.toFixed(2) + ', ' + r32.toFixed(2) + ', ' + r33.toFixed(2) + ']';
  }

  [thEl, dEl, aEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter revolute joint rotation angle $\theta$ in degrees.',
      'Enter prismatic link offset distance d along z-axis in mm.',
      'Enter common normal link length a along x-axis in mm.',
      'Enter link twist angle $\alpha$ around x-axis in degrees.',
      'Inspect $4\times 4$ homogeneous coordinate transformation matrix and translated end position $[X, Y, Z]$.'
    ],
    benefitTitle: 'Jacques Denavit & Richard S. Hartenberg 1955 Kinematic Standard',
    benefitContent: 'Universal robotic kinematic convention reducing complicated 6-DOF coordinate attachments to exactly four parameters per joint ($\theta_i, d_i, a_i, \alpha_i$) across industrial 6-axis articulated robot arms.',
    faqs: [{ q: 'What is the difference between standard and modified DH parameters?', a: 'Standard DH assigns link length $a_i$ and twist $\alpha_i$ to axis $i-1$; Craig\'s modified DH attaches coordinate frames directly at the preceding joint.' }]
  },

  // 3. 2-Link Planar Robotic Arm Inverse Kinematics Calculator
  {
    slug: 'inverse-kinematics-two-link-planar-robot-arm-calculator',
    name: '2-Link Planar Robotic Arm Geometric Inverse Kinematics (IK) Calculator',
    description: 'Calculate robotic 2-link revolute planar manipulator joint angles θ₁ (shoulder) and θ₂ (elbow) in degrees (Elbow-Up and Elbow-Down analytical solutions) to reach target Cartesian coordinates (X, Y).',
    category: 'Math',
    icon: 'text',
    keywords: ['inverse kinematics calculator', '2 link robot arm ik formula theta1 theta2 online', 'elbow up elbow down planar manipulator calculator', 'law of cosines robotic inverse kinematics calculator', 'robotics motion planning mechatronics automation online'],
    order: 1312,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Target Coordinate X (mm), Target Y (mm), Link 1 Length L₁ (mm) & Link 2 Length L₂ (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ik-x">Target X (mm)</label>
          <input class="tool-textarea" id="ik-x" type="number" step="25" value="250.0" placeholder="250.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-y">Target Y (mm)</label>
          <input class="tool-textarea" id="ik-y" type="number" step="25" value="200.0" placeholder="200.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-l1">Link L₁ (mm)</label>
          <input class="tool-textarea" id="ik-l1" type="number" step="25" value="200.0" placeholder="200.0 mm (Proximal)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ik-l2">Link L₂ (mm)</label>
          <input class="tool-textarea" id="ik-l2" type="number" step="25" value="150.0" placeholder="150.0 mm (Distal)" />
        </div>
      </div>
      <div id="ik-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ik-res-angles" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Elbow-Down: θ₁ = 12.8°, θ₂ = +58.8°</span>
            <span class="stat-label">Analytical Geometric Joint Solutions (Reaches target (X, Y) ✓)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ik-res-alt" style="color:var(--green-dark); font-weight:700;">Elbow-Up Solution: θ₁ = 64.5°, θ₂ = -58.8° | Radius R = 320.2 mm (Reach = 350.0 mm)</span>
            <span class="stat-label">Dual Configuration Reachability & Workspace Verification</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('ik-x'), yEl = document.getElementById('ik-y');
  const l1El = document.getElementById('ik-l1'), l2El = document.getElementById('ik-l2');
  const anResEl = document.getElementById('ik-res-angles'), alResEl = document.getElementById('ik-res-alt');

  function update() {
    const x = parseFloat(xEl.value), y = parseFloat(yEl.value);
    const L1 = parseFloat(l1El.value), L2 = parseFloat(l2El.value);

    if (isNaN(x) || isNaN(y) || isNaN(L1) || isNaN(L2) || L1 <= 0 || L2 <= 0) return;

    // Target radial distance squared: r^2 = x^2 + y^2
    const r2 = Math.pow(x, 2) + Math.pow(y, 2);
    const r = Math.sqrt(r2);

    const max_reach = L1 + L2;
    const min_reach = Math.abs(L1 - L2);

    if (r > max_reach || r < min_reach) {
      anResEl.textContent = 'TARGET UNREACHABLE (Out of Workspace)';
      anResEl.style.color = '#c53030';
      alResEl.textContent = 'Target Radius R = ' + r.toFixed(1) + ' mm (Allowed Workspace: ' + min_reach.toFixed(1) + ' mm to ' + max_reach.toFixed(1) + ' mm)';
      return;
    }

    // Law of Cosines for elbow angle: cos(theta2) = (x^2 + y^2 - L1^2 - L2^2) / (2 * L1 * L2)
    const cos_th2 = (r2 - Math.pow(L1, 2) - Math.pow(L2, 2)) / (2.0 * L1 * L2);
    const clamped_cos = Math.max(-1.0, Math.min(1.0, cos_th2));

    // Elbow-down (theta2 > 0) and Elbow-up (theta2 < 0):
    const th2_down_rad = Math.acos(clamped_cos);
    const th2_up_rad = -th2_down_rad;

    // Shoulder angle: theta1 = atan2(y, x) - atan2(L2*sin(th2), L1 + L2*cos(th2))
    const gamma = Math.atan2(y, x);
    const th1_down_rad = gamma - Math.atan2(L2 * Math.sin(th2_down_rad), L1 + (L2 * Math.cos(th2_down_rad)));
    const th1_up_rad = gamma - Math.atan2(L2 * Math.sin(th2_up_rad), L1 + (L2 * Math.cos(th2_up_rad)));

    const th1_down_deg = (th1_down_rad * 180.0) / Math.PI;
    const th2_down_deg = (th2_down_rad * 180.0) / Math.PI;
    const th1_up_deg = (th1_up_rad * 180.0) / Math.PI;
    const th2_up_deg = (th2_up_rad * 180.0) / Math.PI;

    anResEl.textContent = 'Elbow-Down: θ₁ = ' + th1_down_deg.toFixed(1) + '°, θ₂ = ' + (th2_down_deg >= 0 ? '+' : '') + th2_down_deg.toFixed(1) + '°';
    anResEl.style.color = '#22543d';
    alResEl.textContent = 'Elbow-Up: θ₁ = ' + th1_up_deg.toFixed(1) + '°, θ₂ = ' + th2_up_deg.toFixed(1) + '° | Radius R = ' + r.toFixed(1) + ' mm (Max ' + max_reach + ' mm)';
  }

  [xEl, yEl, l1El, l2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter desired end-effector target Cartesian coordinate (X, Y) in mm.',
      'Enter proximal link length $L_1$ and distal link length $L_2$ in mm.',
      'Inspect dual kinematic solutions: Elbow-Down ($\theta_2 > 0$) and Elbow-Up ($\theta_2 < 0$).'
    ],
    benefitTitle: 'Closed-Form Analytical Inverse Kinematics',
    benefitContent: 'Instantly computes required robotic motor joint angles ($\theta_1, \theta_2$) without numerical divergence, enabling real-time microsecond trajectory tracking on robotic microcontroller arms.',
    faqs: [{ q: 'What is a kinematic singularity in a 2-link arm?', a: 'When the arm is fully extended ($r = L_1 + L_2$) or folded back ($r = |L_1 - L_2|$), $\theta_2 = 0^\circ$ or $180^\circ$ and the arm loses 1 degree of freedom.' }]
  },

  // 4. Robot Manipulator Jacobian Matrix & Velocity Calculator
  {
    slug: 'robot-jacobian-differential-motion-end-effector-velocity-calculator',
    name: 'Robot Manipulator Jacobian Matrix & End-Effector Velocity (v = J·q̇) Calculator',
    description: 'Calculate 2-link planar robotic manipulator Jacobian matrix J(q), end-effector Cartesian velocities [v_x, v_y] in mm/s (v = J · q̇), and Yoshikawa Manipulability Measure w = √det(J·Jᵀ).',
    category: 'Math',
    icon: 'text',
    keywords: ['robot jacobian calculator', 'end effector velocity formula v equals j q dot online', 'yoshikawa manipulability measure jacobian calculator', 'joint angular velocity to linear velocity calculator', 'robotics differential kinematics mechatronics online'],
    order: 1313,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Joint Angles θ₁ & θ₂ (°), Joint Speeds θ̇₁ & θ̇₂ (rad/s) & Link Lengths L₁ & L₂ (mm)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="jb-th1">Joint θ₁ (°)</label>
          <input class="tool-textarea" id="jb-th1" type="number" step="10" value="30.0" placeholder="30.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jb-th2">Joint θ₂ (°)</label>
          <input class="tool-textarea" id="jb-th2" type="number" step="10" value="45.0" placeholder="45.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jb-w1">Speed θ̇₁ (rad/s)</label>
          <input class="tool-textarea" id="jb-w1" type="number" step="0.5" value="1.50" placeholder="1.50 rad/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jb-w2">Speed θ̇₂ (rad/s)</label>
          <input class="tool-textarea" id="jb-w2" type="number" step="0.5" value="-1.00" placeholder="-1.00 rad/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jb-l1">Link L₁ (mm)</label>
          <input class="tool-textarea" id="jb-l1" type="number" step="25" value="300.0" placeholder="300.0 mm" />
        </div>
        <div class="control-group">
          <label class="control-label" for="jb-l2">Link L₂ (mm)</label>
          <input class="tool-textarea" id="jb-l2" type="number" step="25" value="200.0" placeholder="200.0 mm" />
        </div>
      </div>
      <div id="jb-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="jb-res-vel" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">End-Effector Velocity: [v_x: -349.8, v_y: +448.2] mm/s (|v| = 568.6 mm/s)</span>
            <span class="stat-label">Differential Cartesian Velocity (v = J(q) · q̇)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="jb-res-jac" style="color:var(--green-dark); font-weight:700;">Manipulability w = 42,426 mm² (w = L₁·L₂·|sin θ₂|) | High Velocity Dexterity ✓</span>
            <span class="stat-label">Yoshikawa Manipulability Index & Singularity Proximity</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const th1El = document.getElementById('jb-th1'), th2El = document.getElementById('jb-th2');
  const w1El = document.getElementById('jb-w1'), w2El = document.getElementById('jb-w2');
  const l1El = document.getElementById('jb-l1'), l2El = document.getElementById('jb-l2');
  const vlResEl = document.getElementById('jb-res-vel'), jcResEl = document.getElementById('jb-res-jac');

  function update() {
    const th1_deg = parseFloat(th1El.value), th2_deg = parseFloat(th2El.value);
    const q1_dot = parseFloat(w1El.value), q2_dot = parseFloat(w2El.value);
    const L1 = parseFloat(l1El.value), L2 = parseFloat(l2El.value);

    if (isNaN(th1_deg) || isNaN(th2_deg) || isNaN(q1_dot) || isNaN(q2_dot) || isNaN(L1) || isNaN(L2) || L1 <= 0 || L2 <= 0) return;

    const th1 = (th1_deg * Math.PI) / 180.0;
    const th2 = (th2_deg * Math.PI) / 180.0;
    const th12 = th1 + th2;

    // Jacobian elements for 2-link planar arm:
    // J11 = - L1*sin(th1) - L2*sin(th12), J12 = - L2*sin(th12)
    // J21 =   L1*cos(th1) + L2*cos(th12), J22 =   L2*cos(th12)
    const J11 = -(L1 * Math.sin(th1)) - (L2 * Math.sin(th12));
    const J12 = -(L2 * Math.sin(th12));
    const J21 = (L1 * Math.cos(th1)) + (L2 * Math.cos(th12));
    const J22 = (L2 * Math.cos(th12));

    // Cartesian velocities: [vx, vy] = J * [q1_dot, q2_dot]
    const vx = (J11 * q1_dot) + (J12 * q2_dot);
    const vy = (J21 * q1_dot) + (J22 * q2_dot);
    const v_mag = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));

    // Yoshikawa Manipulability: w = sqrt( det( J * J^T ) ) = L1 * L2 * |sin(th2)|
    const w_manip = L1 * L2 * Math.abs(Math.sin(th2));

    vlResEl.textContent = 'Velocity: [v_x = ' + vx.toFixed(1) + ', v_y = ' + (vy >= 0 ? '+' : '') + vy.toFixed(1) + '] mm/s (|v| = ' + v_mag.toFixed(1) + ' mm/s)';
    jcResEl.textContent = 'Manipulability w = ' + Math.round(w_manip).toLocaleString() + ' mm² (J=[' + J11.toFixed(1) + ', ' + J12.toFixed(1) + '; ' + J21.toFixed(1) + ', ' + J22.toFixed(1) + '])';
  }

  [th1El, th2El, w1El, w2El, l1El, l2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter current robot joint angles $\theta_1$ and $\theta_2$ in degrees.',
      'Enter joint angular velocities $\dot{\theta}_1$ and $\dot{\theta}_2$ in rad/s.',
      'Enter arm link lengths $L_1$ and $L_2$ in mm.',
      'Inspect end-effector linear Cartesian velocity vector $[v_x, v_y]$ and Yoshikawa Manipulability index.'
    ],
    benefitTitle: 'Differential Kinematics & Manipulability Ellipsoids',
    benefitContent: 'Maps motor joint velocities to spatial tool velocities ($\mathbf{v} = J\dot{\mathbf{q}}$) and joint torques to tool contact forces ($\boldsymbol{\tau} = J^T \mathbf{F}$), essential for robotic force control.',
    faqs: [{ q: 'What happens to the Jacobian at a singular configuration?', a: 'The Jacobian matrix drops rank ($\det(J) = 0$), preventing motion along the lost degree of freedom and causing inverse velocity solvers to demand infinite joint speeds.' }]
  },

  // 5. DC Motor Torque-Speed Curve & Back-EMF Calculator
  {
    slug: 'dc-motor-torque-speed-back-emf-mechanical-power-calculator',
    name: 'DC Motor Torque-Speed Curve, Back-EMF & Mechanical Power Calculator',
    description: 'Calculate brushed and brushless DC motor stall torque T_stall in N·m (T_stall = K_t · V / R), no-load RPM speed, Back-EMF voltage V_emf, electrical efficiency η, and peak mechanical power output.',
    category: 'Science',
    icon: 'text',
    keywords: ['dc motor torque speed calculator', 'stall torque formula kt v over r online', 'back emf mechanical power efficiency dc motor calculator', 'no load rpm stall current mechatronics calculator', 'robotics mechatronics electrical engineering motors online'],
    order: 1314,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Supply Voltage V (Volts), Armature Resistance R (Ω), Torque Constant K_t (N·m/A) & Load Torque T (N·m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dc-v">Voltage V (V)</label>
          <input class="tool-textarea" id="dc-v" type="number" step="2" value="24.0" placeholder="24.0 V DC" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dc-r">Resistance R (Ω)</label>
          <input class="tool-textarea" id="dc-r" type="number" step="0.5" value="1.50" placeholder="1.50 Ω" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dc-kt">Torque K_t (N·m/A)</label>
          <input class="tool-textarea" id="dc-kt" type="number" step="0.01" value="0.050" placeholder="0.050 N·m/A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dc-load">Load Torque (N·m)</label>
          <input class="tool-textarea" id="dc-load" type="number" step="0.1" value="0.30" placeholder="0.30 N·m Operating" />
        </div>
      </div>
      <div id="dc-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dc-res-rpm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Operating Speed = 2,865 RPM (300.0 rad/s)</span>
            <span class="stat-label">Operating Motor Speed under Load (ω = (V - I·R) / K_e)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dc-res-power" style="color:var(--green-dark); font-weight:700;">Mechanical Power P = 90.0 W (Efficiency η = 62.5%) | Stall Torque = 0.800 N·m (16.0 A)</span>
            <span class="stat-label">Mechanical Power, Electrical Efficiency & Stall Characteristics</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vEl = document.getElementById('dc-v'), rEl = document.getElementById('dc-r');
  const ktEl = document.getElementById('dc-kt'), ldEl = document.getElementById('dc-load');
  const rpResEl = document.getElementById('dc-res-rpm'), pwResEl = document.getElementById('dc-res-power');

  function update() {
    const V = parseFloat(vEl.value), R = parseFloat(rEl.value);
    const K_t = parseFloat(ktEl.value), T_load = parseFloat(ldEl.value);

    if (isNaN(V) || isNaN(R) || isNaN(K_t) || isNaN(T_load) || V <= 0 || R <= 0 || K_t <= 0 || T_load < 0) return;

    // Stall current & torque:
    const I_stall = V / R;
    const T_stall = K_t * I_stall;

    if (T_load >= T_stall) {
      rpResEl.textContent = 'MOTOR STALLED (0 RPM)';
      rpResEl.style.color = '#c53030';
      pwResEl.textContent = 'Stall Current I = ' + I_stall.toFixed(1) + ' A | Power = 0 W (High Heat Dissipation ' + (Math.pow(I_stall, 2) * R).toFixed(0) + ' W)';
      return;
    }

    // Operating current: I = T_load / K_t
    const I_op = T_load / K_t;

    // Back EMF: V_emf = V - (I_op * R)
    const V_emf = V - (I_op * R);

    // K_e (in V / (rad/s)) is identical to K_t (in N*m / A) in SI units:
    const omega_rad_s = V_emf / K_t;
    const rpm = (omega_rad_s * 60.0) / (2.0 * Math.PI);

    // Mechanical power: P_mech = T_load * omega
    const P_mech = T_load * omega_rad_s;

    // Electrical input power: P_elec = V * I_op
    const P_elec = V * I_op;
    const eff_pct = P_elec > 0 ? (P_mech / P_elec) * 100.0 : 0;

    // No-load speed:
    const no_load_rpm = ((V / K_t) * 60.0) / (2.0 * Math.PI);

    rpResEl.textContent = 'Operating Speed = ' + Math.round(rpm).toLocaleString() + ' RPM (' + omega_rad_s.toFixed(1) + ' rad/s)';
    rpResEl.style.color = '#22543d';
    pwResEl.textContent = 'Power P = ' + P_mech.toFixed(1) + ' W (η = ' + eff_pct.toFixed(1) + '%) | Stall = ' + T_stall.toFixed(3) + ' N·m (I_stall = ' + I_stall.toFixed(1) + ' A, No-Load ' + Math.round(no_load_rpm) + ' RPM)';
  }

  [vEl, rEl, ktEl, ldEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter motor DC terminal power supply voltage in Volts.',
      'Enter armature coil winding phase resistance R in Ohms.',
      'Enter motor Torque Constant $K_t$ in $\text{N}\cdot\text{m}/\text{A}$ (equivalent to Back-EMF constant $K_e$ in $\text{V}/(\text{rad/s})$ in SI units).',
      'Enter applied mechanical load torque in $\text{N}\cdot\text{m}$.',
      'Inspect operating motor shaft speed in RPM, mechanical shaft power output in Watts, and electrical efficiency.'
    ],
    benefitTitle: 'Electromechanical Energy Conversion & Back-EMF Law',
    benefitContent: 'Generates the linear DC motor operating curve ($\omega = \omega_0 - \frac{R}{K_t K_e} T$), balancing mechanical torque against induced opposing electromagnetic Back-EMF voltage.',
    faqs: [{ q: 'At what operating speed is maximum mechanical power achieved?', a: 'Maximum mechanical output power occurs exactly at $50\%$ of no-load speed and $50\%$ of stall torque ($P_{\max} = \frac{1}{4} T_{\text{stall}} \omega_0$).' }]
  },

  // 6. Stepper Motor Step Angle, Microstepping Pulse Rate & RPM Calculator
  {
    slug: 'stepper-motor-step-angle-pulse-rate-rpm-calculator',
    name: 'Stepper Motor Step Angle, Microstepping Pulse Rate & RPM Calculator',
    description: 'Calculate 2-phase hybrid stepper motor shaft rotational speed in RPM (RPM = (PPS · 60) / (Steps/Rev · Microstepping)), step angle θ_s (360° / 200 = 1.8°), step frequency pulse rate, and linear lead screw speed.',
    category: 'Science',
    icon: 'text',
    keywords: ['stepper motor calculator', 'step angle pulse rate rpm formula online', 'microstepping 1 16 1 32 steps per revolution calculator', 'pulses per second pps to rpm stepper calculator', 'cnc 3d printing robotics mechatronics online'],
    order: 1315,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Base Step Angle θ_s (e.g. 1.8° or 0.9°), Microstepping Mode (1/1 to 1/64) & Pulse Rate (PPS or Hz)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sm-step">Step Angle θ_s (°)</label>
          <select class="tool-textarea" id="sm-step">
            <option value="1.8" selected>1.8° (200 Steps/Rev - Standard NEMA 17/23)</option>
            <option value="0.9">0.9° (400 Steps/Rev - High Precision)</option>
            <option value="7.5">7.5° (48 Steps/Rev - Can-Stack)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-micro">Microstepping</label>
          <select class="tool-textarea" id="sm-micro">
            <option value="16" selected>1/16 Microstepping (3,200 Pulses/Rev)</option>
            <option value="32">1/32 Microstepping (6,400 Pulses/Rev)</option>
            <option value="8">1/8 Microstepping (1,600 Pulses/Rev)</option>
            <option value="1">1/1 Full Step (200 Pulses/Rev)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sm-pps">Pulse Rate (PPS / Hz)</label>
          <input class="tool-textarea" id="sm-pps" type="number" step="500" value="6400.0" placeholder="6,400 Hz" />
        </div>
      </div>
      <div id="sm-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sm-res-rpm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Rotational Speed = 120.0 RPM (2.00 Rev/s)</span>
            <span class="stat-label">Shaft Rotational Speed (RPM = (PPS · 60) / Pulses_per_Rev)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sm-res-res" style="color:var(--green-dark); font-weight:700;">Resolution = 3,200 Steps/Rev (0.1125° per microstep) | 8mm Lead Screw: 16.0 mm/s linear</span>
            <span class="stat-label">Angular Microstepping Resolution & CNC Axis Feedrate</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const stEl = document.getElementById('sm-step'), mcEl = document.getElementById('sm-micro'), ppEl = document.getElementById('sm-pps');
  const rpResEl = document.getElementById('sm-res-rpm'), rsResEl = document.getElementById('sm-res-res');

  function update() {
    const step_angle = parseFloat(stEl.value), micro = parseFloat(mcEl.value), pps = parseFloat(ppEl.value);
    if (isNaN(step_angle) || isNaN(micro) || isNaN(pps) || step_angle <= 0 || micro <= 0 || pps <= 0) return;

    // Full steps per revolution:
    const full_steps = 360.0 / step_angle;

    // Total microstep pulses per full revolution:
    const pulses_per_rev = full_steps * micro;

    // Rotational speed in RPM: RPM = (PPS * 60) / pulses_per_rev
    const rps = pps / pulses_per_rev;
    const rpm = rps * 60.0;

    // Angular resolution per microstep pulse in degrees:
    const deg_per_pulse = step_angle / micro;

    // Assuming standard 8mm lead screw (T8x8):
    const linear_feed_mm_s = rps * 8.0;

    rpResEl.textContent = 'Rotational Speed = ' + rpm.toFixed(1) + ' RPM (' + rps.toFixed(2) + ' Rev/s)';
    rsResEl.textContent = 'Resolution: ' + pulses_per_rev.toLocaleString() + ' Pulses/Rev (' + deg_per_pulse.toFixed(4) + '°/pulse) | T8 Lead Screw: ' + linear_feed_mm_s.toFixed(1) + ' mm/s';
  }

  [stEl, mcEl, ppEl].forEach(el => el.addEventListener('change', update));
  ppEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Select native stepper motor full-step angle $\theta_s$ ($1.8^\circ$ for 200-step motors, $0.9^\circ$ for 400-step motors).',
      'Select stepper motor driver microstepping subdivision factor ($1/1, 1/8, 1/16, 1/32$).',
      'Enter input STEP pulse frequency in Pulses Per Second (PPS / Hz).',
      'Inspect shaft rotational speed in RPM and CNC linear lead screw axis feedrate.'
    ],
    benefitTitle: 'Digital Pulse Open-Loop Position Control',
    benefitContent: 'Allows precise open-loop angular motion indexing without expensive optical encoders in 3D printers, CNC milling routers, and robotic joint pick-and-place arms.',
    faqs: [{ q: 'Why is microstepping used beyond full step mode?', a: 'Microstepping reduces low-speed motor acoustic resonance vibrations and provides silky smooth motion, though available holding torque per microstep decreases.' }]
  },

  // 7. Root Locus Asymptotes & Stability Breakaway Points Calculator
  {
    slug: 'root-locus-open-loop-poles-zeros-stability-calculator',
    name: 'Root Locus Asymptotes, Centroid & Stability Breakaway Points Calculator',
    description: 'Calculate control system Root Locus geometric characteristics: number of infinite asymptotes (n - m), real-axis asymptote centroid σ_a (σ_a = (∑ poles - ∑ zeros) / (n - m)), and asymptote departure angles.',
    category: 'Math',
    icon: 'text',
    keywords: ['root locus calculator', 'asymptote centroid formula sigma a online', 'root locus departure angle poles zeros calculator', 'closed loop stability evans root locus calculator', 'classical control engineering transfer function stability online'],
    order: 1316,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Open-Loop Poles (comma-separated real parts), Open-Loop Zeros & Order',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="rl-poles">Poles (e.g. 0, -2, -4)</label>
          <input class="tool-textarea" id="rl-poles" type="text" value="0, -2, -4" placeholder="0, -2, -4" />
        </div>
        <div class="control-group">
          <label class="control-label" for="rl-zeros">Zeros (e.g. -1)</label>
          <input class="tool-textarea" id="rl-zeros" type="text" value="-1" placeholder="-1 (or empty)" />
        </div>
      </div>
      <div id="rl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="rl-res-cent" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Asymptote Centroid σ_a = -2.50</span>
            <span class="stat-label">Real Axis Asymptote Center of Gravity (σ_a = (∑ p - ∑ z) / (n - m))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="rl-res-angles" style="color:var(--green-dark); font-weight:700;">2 Asymptotes (n - m = 2) at ±90.0° (Stable closed-loop for all gain K > 0 ✓)</span>
            <span class="stat-label">Number of Asymptote Branches & Angles (θ_a = (2k+1)·180° / (n-m))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('rl-poles'), zEl = document.getElementById('rl-zeros');
  const ctResEl = document.getElementById('rl-res-cent'), anResEl = document.getElementById('rl-res-angles');

  function parseNumbers(str) {
    if (!str || !str.trim()) return [];
    return str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  }

  function update() {
    const poles = parseNumbers(pEl.value);
    const zeros = parseNumbers(zEl.value);

    const n = poles.length;
    const m = zeros.length;

    if (n === 0 || n <= m) {
      ctResEl.textContent = 'Invalid (System must have more poles than zeros n > m)';
      anResEl.textContent = 'Enter poles e.g. 0, -2, -4 and zeros e.g. -1';
      return;
    }

    const num_asymptotes = n - m;

    // Sum of poles and sum of zeros:
    const sum_p = poles.reduce((a, b) => a + b, 0);
    const sum_z = zeros.reduce((a, b) => a + b, 0);

    // Centroid: sigma_a = ( sum(p) - sum(z) ) / ( n - m )
    const sigma_a = (sum_p - sum_z) / num_asymptotes;

    // Asymptote angles: theta_k = (2k + 1) * 180 / (n - m)
    const angles = [];
    for (let k = 0; k < num_asymptotes; k++) {
      const ang = ((2 * k + 1) * 180.0) / num_asymptotes;
      angles.push(ang.toFixed(1) + '°');
    }

    ctResEl.textContent = 'Centroid σ_a = ' + sigma_a.toFixed(2);
    anResEl.textContent = num_asymptotes + ' Asymptotes at [' + angles.join(', ') + '] (Poles n=' + n + ', Zeros m=' + m + ')';
  }

  [pEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter open-loop system transfer function pole real locations separated by commas (e.g. 0, -2, -4).',
      'Enter open-loop zero real locations (e.g. -1).',
      'Inspect root locus asymptote centroid $\sigma_a$, number of asymptotes ($n - m$), and departure angle directions.'
    ],
    benefitTitle: 'Walter R. Evans 1948 Root Locus Method',
    benefitContent: 'Traces the geometric trajectory of closed-loop system poles as controller feedback gain K varies from $0$ to $\infty$, identifying gain limits where system transitions into instability.',
    faqs: [{ q: 'What is the real-axis criterion for the Root Locus?', a: 'A point on the real axis lies on the root locus if and only if the total number of real poles and zeros to its RIGHT is ODD.' }]
  },

  // 8. Bode Plot Gain Margin (GM) & Phase Margin (PM) Calculator
  {
    slug: 'bode-plot-gain-phase-margin-gain-crossover-calculator',
    name: 'Bode Plot Gain Margin (GM), Phase Margin (PM) & Crossover Frequency Calculator',
    description: 'Calculate frequency domain relative stability metrics: Gain Margin GM in dB (GM = -20·log₁₀|G(jω_π)|) at phase crossover frequency ω_π and Phase Margin PM (PM = 180° + ∠G(jω_c)) at gain crossover frequency ω_c.',
    category: 'Math',
    icon: 'text',
    keywords: ['bode plot calculator', 'gain margin phase margin formula online', 'gain crossover phase crossover frequency calculator', 'bode stability frequency response calculator', 'control systems mechatronics electrical engineering online'],
    order: 1317,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Magnitude at -180° Phase |G(jω_π)| (Linear or dB) & Phase at 0 dB Unity Gain ∠G(jω_c) (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="bd-mag">|G(jω_π)| Magnitude</label>
          <input class="tool-textarea" id="bd-mag" type="number" step="0.05" value="0.25" placeholder="0.25 (Magnitude @ -180°)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="bd-phase">Phase ∠G(jω_c) (°)</label>
          <input class="tool-textarea" id="bd-phase" type="number" step="5" value="-135.0" placeholder="-135.0° (Phase @ 0 dB)" />
        </div>
      </div>
      <div id="bd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="bd-res-gm" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Gain Margin GM = +12.04 dB (4.00× Gain Headroom)</span>
            <span class="stat-label">Gain Margin (GM = -20·log₁₀|G(jω_π)|)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="bd-res-pm" style="color:var(--green-dark); font-weight:700;">Phase Margin PM = +45.0° (STABLE: Excellent damping ratio ζ ≈ 0.45 ✓)</span>
            <span class="stat-label">Phase Margin (PM = 180° + ∠G(jω_c) ≥ 45° Target)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mgEl = document.getElementById('bd-mag'), phEl = document.getElementById('bd-phase');
  const gmResEl = document.getElementById('bd-res-gm'), pmResEl = document.getElementById('bd-res-pm');

  function update() {
    const mag_linear = parseFloat(mgEl.value), phase_deg = parseFloat(phEl.value);
    if (isNaN(mag_linear) || isNaN(phase_deg) || mag_linear <= 0) return;

    // Gain Margin: GM = - 20 * log10( |G(j*w_pi)| )  [dB]
    const GM_dB = -20.0 * Math.log10(mag_linear);
    const GM_linear = 1.0 / mag_linear;

    // Phase Margin: PM = 180° + phase(w_c)  [deg]
    const PM_deg = 180.0 + phase_deg;

    // Damping ratio approximation: zeta approx PM / 100
    const zeta_approx = Math.max(0, PM_deg / 100.0);

    let status = '', color = '#22543d';
    if (GM_dB >= 6.0 && PM_deg >= 40.0) {
      status = 'ROBUST STABILITY (GM ≥ 6 dB, PM ≥ 40°: Ideal transient response)';
      color = '#22543d';
    } else if (GM_dB > 0 && PM_deg > 0) {
      status = 'MARGINALLY STABLE (Under-damped ringing)';
      color = '#ea580c';
    } else {
      status = 'UNSTABLE CLOSED LOOP (GM < 0 dB or PM < 0°)';
      color = '#c53030';
    }

    gmResEl.textContent = 'Gain Margin GM = ' + (GM_dB >= 0 ? '+' : '') + GM_dB.toFixed(2) + ' dB (' + GM_linear.toFixed(2) + '× headroom)';
    gmResEl.style.color = color;
    pmResEl.textContent = 'Phase Margin PM = ' + (PM_deg >= 0 ? '+' : '') + PM_deg.toFixed(1) + '° (' + status + ')';
  }

  mgEl.addEventListener('input', update);
  phEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter open-loop frequency response magnitude $|G(j\omega_\pi)|$ at the $-180^\circ$ phase crossover frequency.',
      'Enter open-loop phase angle $\angle G(j\omega_c)$ in degrees at the $0\text{ dB}$ ($|G|=1$) gain crossover frequency.',
      'Inspect Gain Margin (GM in dB) and Phase Margin (PM in degrees).'
    ],
    benefitTitle: 'Hendrik Wade Bode 1940 Frequency Response Standard',
    benefitContent: 'Quantifies control system robustness against gain fluctuations and phase time delays; standard industrial design target is $GM \ge 6\text{ dB}$ and $PM \ge 45^\circ$.',
    faqs: [{ q: 'What is the physical meaning of Phase Margin PM?', a: 'Phase Margin represents the additional phase lag time delay $\tau_d = \frac{PM}{\omega_c}$ the feedback system can tolerate before becoming unstable.' }]
  },

  // 9. Nyquist Stability Criterion Encirclements Calculator
  {
    slug: 'nyquist-stability-criterion-encirclements-calculator',
    name: 'Nyquist Stability Criterion (Z = N + P) Encirclements Calculator',
    description: 'Calculate closed-loop right-half-plane (RHP) unstable poles Z (Z = N + P) using the Nyquist Stability Criterion from number of clockwise encirclements N of critical point (-1 + j0) and open-loop unstable poles P.',
    category: 'Math',
    icon: 'text',
    keywords: ['nyquist stability calculator', 'nyquist criterion formula z equals n plus p online', 'critical point minus 1 plus j0 encirclements calculator', 'closed loop rhp poles stability nyquist calculator', 'frequency domain control theory stability online'],
    order: 1318,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Clockwise Encirclements N of (-1, j0) & Open-Loop Unstable RHP Poles P',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="nq-n">Encirclements N</label>
          <input class="tool-textarea" id="nq-n" type="number" step="1" value="0" placeholder="0 (Clockwise + / CCW -)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="nq-p">Open-Loop RHP Poles P</label>
          <input class="tool-textarea" id="nq-p" type="number" step="1" min="0" value="0" placeholder="0 (Open-Loop Stable)" />
        </div>
      </div>
      <div id="nq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="nq-res-z" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Closed-Loop RHP Poles Z = 0 (STABLE)</span>
            <span class="stat-label">Closed-Loop Unstable Poles (Z = N + P)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="nq-res-eval" style="color:var(--green-dark); font-weight:700;">SYSTEM IS ASYMPTOTICALLY STABLE (Z = 0: All closed-loop roots in Left-Half Plane)</span>
            <span class="stat-label">Cauchy Argument Principle Stability Verdict</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nEl = document.getElementById('nq-n'), pEl = document.getElementById('nq-p');
  const zResEl = document.getElementById('nq-res-z'), evResEl = document.getElementById('nq-res-eval');

  function update() {
    const N = parseInt(nEl.value, 10), P = parseInt(pEl.value, 10);
    if (isNaN(N) || isNaN(P) || P < 0) return;

    // Nyquist criterion: Z = N + P
    const Z = N + P;

    let verdict = '', color = '#22543d';
    if (Z === 0) {
      verdict = 'CLOSED-LOOP IS ASYMPTOTICALLY STABLE (Z = 0: Zero unstable poles in RHP ✓)';
      color = '#22543d';
    } else {
      verdict = 'CLOSED-LOOP IS UNSTABLE (' + Z + ' Unstable Pole' + (Z > 1 ? 's' : '') + ' in Right-Half Plane ✗)';
      color = '#c53030';
    }

    zResEl.textContent = 'Closed-Loop RHP Poles Z = ' + Z + ' (' + (Z === 0 ? 'STABLE ✓' : 'UNSTABLE ✗') + ')';
    zResEl.style.color = color;
    evResEl.textContent = verdict + ' [N = ' + N + ', P = ' + P + ']';
    evResEl.style.color = color;
  }

  nEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter net number of clockwise encirclements N of point $(-1 + j0)$ in the Nyquist complex polar plot (positive for clockwise, negative for counter-clockwise).',
      'Enter number of open-loop poles P located in the Right-Half s-Plane (RHP).',
      'Inspect total number of closed-loop unstable poles $Z = N + P$ and stability verdict.'
    ],
    benefitTitle: 'Harry Nyquist 1932 Cauchy Argument Principle',
    benefitContent: 'Evaluates closed-loop feedback stability directly from open-loop frequency response measurements without needing to factor high-order characteristic polynomials.',
    faqs: [{ q: 'How does Nyquist handle an open-loop unstable plant (P > 0)?', a: 'To stabilize an open-loop unstable plant ($P > 0$), the Nyquist contour must encircle $(-1 + j0)$ exactly $P$ times in the COUNTER-CLOCKWISE direction ($N = -P$), making $Z = 0$.' }]
  },

  // 10. State-Space Controllability & Observability Gramian Matrix Calculator
  {
    slug: 'state-space-system-controllability-observability-gramian-calculator',
    name: 'State-Space Controllability & Observability Matrix (Rank Check) Calculator',
    description: 'Calculate 2-state system Controllability Matrix C = [B, AB] and Observability Matrix O = [C; CA], determinant, and Kalman rank condition to verify full state feedback controllability and observer design.',
    category: 'Math',
    icon: 'text',
    keywords: ['state space controllability calculator', 'observability matrix rank kalman condition online', 'controllability matrix c equals b ab calculator', 'state feedback pole placement observability calculator', 'modern control theory state space mechatronics online'],
    order: 1319,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: '2×2 State Matrix A = [a₁₁ a₁₂; a₂₁ a₂₂] & Input Matrix B = [b₁; b₂]',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ss-a11">a₁₁</label>
          <input class="tool-textarea" id="ss-a11" type="number" step="0.5" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-a12">a₁₂</label>
          <input class="tool-textarea" id="ss-a12" type="number" step="0.5" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-a21">a₂₁</label>
          <input class="tool-textarea" id="ss-a21" type="number" step="0.5" value="-2.0" placeholder="-2.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-a22">a₂₂</label>
          <input class="tool-textarea" id="ss-a22" type="number" step="0.5" value="-3.0" placeholder="-3.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-b1">b₁</label>
          <input class="tool-textarea" id="ss-b1" type="number" step="0.5" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ss-b2">b₂</label>
          <input class="tool-textarea" id="ss-b2" type="number" step="0.5" value="1.0" placeholder="1.0" />
        </div>
      </div>
      <div id="ss-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ss-res-ctrl" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">CONTROLLABLE (Rank = 2, det(C) = -1.00)</span>
            <span class="stat-label">Kalman Controllability Matrix Rank (C = [B, AB])</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ss-res-mat" style="color:var(--green-dark); font-weight:700;">Controllability Matrix C = [0, 1; 1, -3] | Full state feedback pole placement possible ✓</span>
            <span class="stat-label">Controllability Matrix Elements & Eigenvalue Arbitrary Placement</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const a11El = document.getElementById('ss-a11'), a12El = document.getElementById('ss-a12');
  const a21El = document.getElementById('ss-a21'), a22El = document.getElementById('ss-a22');
  const b1El = document.getElementById('ss-b1'), b2El = document.getElementById('ss-b2');
  const ctResEl = document.getElementById('ss-res-ctrl'), mtResEl = document.getElementById('ss-res-mat');

  function update() {
    const a11 = parseFloat(a11El.value), a12 = parseFloat(a12El.value);
    const a21 = parseFloat(a21El.value), a22 = parseFloat(a22El.value);
    const b1 = parseFloat(b1El.value), b2 = parseFloat(b2El.value);

    if (isNaN(a11) || isNaN(a12) || isNaN(a21) || isNaN(a22) || isNaN(b1) || isNaN(b2)) return;

    // A * B vector:
    // [ a11*b1 + a12*b2 ]
    // [ a21*b1 + a22*b2 ]
    const ab1 = (a11 * b1) + (a12 * b2);
    const ab2 = (a21 * b1) + (a22 * b2);

    // Controllability matrix C = [ B, AB ] = [ b1, ab1; b2, ab2 ]
    const det_C = (b1 * ab2) - (ab1 * b2);
    const is_controllable = Math.abs(det_C) > 1e-6;

    ctResEl.textContent = is_controllable ? 'CONTROLLABLE (Rank = 2, det(C) = ' + det_C.toFixed(2) + ')' : 'UNCONTROLLABLE (Rank < 2, det(C) = 0)';
    ctResEl.style.color = is_controllable ? '#22543d' : '#c53030';
    mtResEl.textContent = 'Matrix C = [' + b1 + ', ' + ab1.toFixed(1) + '; ' + b2 + ', ' + ab2.toFixed(1) + '] | ' + (is_controllable ? 'Full state feedback gain K can place all closed-loop poles' : 'System has uncontrollable uncontrollable modes');
  }

  [a11El, a12El, a21El, a22El, b1El, b2El].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter system state transition matrix elements $A = [a_{11}, a_{12}; a_{21}, a_{22}]$.',
      'Enter control input matrix elements $B = [b_1; b_2]$.',
      'Inspect Controllability Matrix $\mathcal{C} = [B\ AB]$ determinant and Kalman rank condition.'
    ],
    benefitTitle: 'Rudolf E. Kálmán 1960 State-Space Controllability Criterion',
    benefitContent: 'Guarantees that an input control trajectory $u(t)$ exists to steer the system states from any initial condition to any arbitrary target state within finite time.',
    faqs: [{ q: 'What is Ackermann\'s formula for pole placement?', a: 'Ackermann\'s formula ($K = [0\dots 1] \mathcal{C}^{-1} \phi_d(A)$) directly computes the state feedback gain matrix K from the controllability matrix.' }]
  },

  // 11. Linear Quadratic Regulator (LQR Gain K) Calculator
  {
    slug: 'linear-quadratic-regulator-lqr-riccati-gain-matrix-calculator',
    name: 'Linear Quadratic Regulator (LQR 1D Riccati Equation & Optimal Gain K) Calculator',
    description: 'Calculate 1-state Continuous-Time Linear Quadratic Regulator (LQR) Algebraic Riccati Equation solution P (2·a·P - P²·b²/r + q = 0) and optimal state feedback gain K = b·P/r to minimize cost J = ∫(q·x² + r·u²)dt.',
    category: 'Math',
    icon: 'text',
    keywords: ['lqr calculator', 'linear quadratic regulator riccati equation formula online', 'optimal control gain k lqr calculator', 'algebraic riccati equation continuous time lqr calculator', 'optimal control state space robotics mechatronics online'],
    order: 1320,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'System Dynamics a (ẋ = a·x + b·u), Input Coefficient b, State Weight q & Control Weight r',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="lq-a">System a</label>
          <input class="tool-textarea" id="lq-a" type="number" step="0.5" value="1.0" placeholder="+1.0 (Unstable Plant)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lq-b">Input b</label>
          <input class="tool-textarea" id="lq-b" type="number" step="0.5" value="1.0" placeholder="1.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lq-q">State Weight q</label>
          <input class="tool-textarea" id="lq-q" type="number" step="1" value="10.0" placeholder="10.0 (Track Error Penalty)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="lq-r">Control Weight r</label>
          <input class="tool-textarea" id="lq-r" type="number" step="0.5" value="1.0" placeholder="1.0 (Energy Penalty)" />
        </div>
      </div>
      <div id="lq-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="lq-res-k" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Optimal Gain K = 4.32 (u = -K·x)</span>
            <span class="stat-label">LQR Optimal State Feedback Gain (K = b · P / r)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="lq-res-ricc" style="color:var(--green-dark); font-weight:700;">Riccati P = 4.317 | Stable Closed-Loop Pole s = -3.32 (a - b·K)</span>
            <span class="stat-label">Algebraic Riccati Solution P & Closed-Loop Eigenvalue</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const aEl = document.getElementById('lq-a'), bEl = document.getElementById('lq-b');
  const qEl = document.getElementById('lq-q'), rEl = document.getElementById('lq-r');
  const kResEl = document.getElementById('lq-res-k'), rcResEl = document.getElementById('lq-res-ricc');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const q = parseFloat(qEl.value), r = parseFloat(rEl.value);

    if (isNaN(a) || isNaN(b) || isNaN(q) || isNaN(r) || b === 0 || q < 0 || r <= 0) return;

    // Algebraic Riccati Equation for 1D scalar: 2*a*P - (b^2 / r)*P^2 + q = 0
    // Quadratic in P: (b^2/r)*P^2 - (2*a)*P - q = 0
    const A_coef = Math.pow(b, 2) / r;
    const B_coef = -2.0 * a;
    const C_coef = -q;

    // Positive stabilizing root of quadratic:
    const disc = Math.pow(B_coef, 2) - (4.0 * A_coef * C_coef);
    const P = (-B_coef + Math.sqrt(disc)) / (2.0 * A_coef);

    // Optimal gain: K = (b * P) / r
    const K = (b * P) / r;

    // Closed loop pole: a_cl = a - b * K
    const a_cl = a - (b * K);

    kResEl.textContent = 'Optimal Gain K = ' + K.toFixed(2) + ' (u = -' + K.toFixed(2) + '·x)';
    rcResEl.textContent = 'Riccati P = ' + P.toFixed(3) + ' | Closed-Loop Pole s = ' + a_cl.toFixed(2) + ' (q/r = ' + (q/r).toFixed(1) + ' @ a=' + a + ')';
  }

  [aEl, bEl, qEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter open-loop system parameter a ($\dot{x} = ax + bu$).',
      'Enter control input gain coefficient b.',
      'Enter state tracking error cost penalty weighting q ($q \ge 0$).',
      'Enter control effort actuator energy penalty weighting r ($r > 0$).',
      'Inspect Algebraic Riccati Equation positive solution P and optimal feedback gain K.'
    ],
    benefitTitle: 'Optimal Control & Guaranteed Gain/Phase Margins',
    benefitContent: 'Continuous-time LQR provides mathematically guaranteed stability margins: infinite gain margin ($GM = \infty$) and at least $60^\circ$ of phase margin ($PM \ge 60^\circ$).',
    faqs: [{ q: 'What happens when state penalty q is increased relative to r?', a: 'Higher $q/r$ forces the controller to eliminate state errors faster (faster response), resulting in higher feedback gain K.' }]
  },

  // 12. Quaternion to Euler Angles & Rotation Matrix Calculator
  {
    slug: 'quaternion-to-euler-angles-rotation-matrix-calculator',
    name: 'Unit Quaternion to Euler Angles (Roll-Pitch-Yaw) & Rotation Matrix Calculator',
    description: 'Convert 3D unit orientation quaternion q = [w, x, y, z] to aeronautical Euler Angles: Roll (φ), Pitch (θ), Yaw (ψ) in degrees, avoiding gimbal lock singularities in robotics and aerospace avionics.',
    category: 'Math',
    icon: 'text',
    keywords: ['quaternion to euler angles calculator', 'roll pitch yaw formula quaternion conversion online', 'quaternion to 3x3 rotation matrix calculator', 'gimbal lock avoidance aerospace attitude calculator', 'robotics aerospace drone navigation avionics online'],
    order: 1321,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Unit Quaternion Components q = [w (scalar), x, y, z (vector)]',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="qt-w">w (Scalar)</label>
          <input class="tool-textarea" id="qt-w" type="number" step="0.05" value="0.7071" placeholder="0.7071" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-x">x</label>
          <input class="tool-textarea" id="qt-x" type="number" step="0.05" value="0.0" placeholder="0.0" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-y">y</label>
          <input class="tool-textarea" id="qt-y" type="number" step="0.05" value="0.7071" placeholder="0.7071" />
        </div>
        <div class="control-group">
          <label class="control-label" for="qt-z">z</label>
          <input class="tool-textarea" id="qt-z" type="number" step="0.05" value="0.0" placeholder="0.0" />
        </div>
      </div>
      <div id="qt-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="qt-res-euler" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Roll φ = 0.0° | Pitch θ = 90.0° | Yaw ψ = 0.0°</span>
            <span class="stat-label">Aeronautical ZYX Tait-Bryan Euler Angles (Degrees)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="qt-res-norm" style="color:var(--green-dark); font-weight:700;">Normalized |q| = 1.000 | Pure 90° Pitch-Up Rotation about Y-Axis</span>
            <span class="stat-label">Quaternion Unit Norm & Rotation Axis Interpretation</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const wEl = document.getElementById('qt-w'), xEl = document.getElementById('qt-x');
  const yEl = document.getElementById('qt-y'), zEl = document.getElementById('qt-z');
  const euResEl = document.getElementById('qt-res-euler'), nmResEl = document.getElementById('qt-res-norm');

  function update() {
    let w = parseFloat(wEl.value), x = parseFloat(xEl.value);
    let y = parseFloat(yEl.value), z = parseFloat(zEl.value);

    if (isNaN(w) || isNaN(x) || isNaN(y) || isNaN(z)) return;

    // Normalize quaternion:
    const norm = Math.sqrt(Math.pow(w, 2) + Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
    if (norm === 0) return;
    w /= norm; x /= norm; y /= norm; z /= norm;

    // Roll (x-axis rotation): atan2(2*(w*x + y*z), 1 - 2*(x^2 + y^2))
    const sinr_cosp = 2.0 * ((w * x) + (y * z));
    const cosr_cosp = 1.0 - (2.0 * (Math.pow(x, 2) + Math.pow(y, 2)));
    const roll_rad = Math.atan2(sinr_cosp, cosr_cosp);

    // Pitch (y-axis rotation): asin(2*(w*y - z*x))
    const sinp = 2.0 * ((w * y) - (z * x));
    let pitch_rad = 0;
    if (Math.abs(sinp) >= 1) {
      pitch_rad = (Math.sign(sinp) * Math.PI) / 2.0; // Gimbal lock 90 deg
    } else {
      pitch_rad = Math.asin(sinp);
    }

    // Yaw (z-axis rotation): atan2(2*(w*z + x*y), 1 - 2*(y^2 + z^2))
    const siny_cosp = 2.0 * ((w * z) + (x * y));
    const cosy_cosp = 1.0 - (2.0 * (Math.pow(y, 2) + Math.pow(z, 2)));
    const yaw_rad = Math.atan2(siny_cosp, cosy_cosp);

    const roll_deg = (roll_rad * 180.0) / Math.PI;
    const pitch_deg = (pitch_rad * 180.0) / Math.PI;
    const yaw_deg = (yaw_rad * 180.0) / Math.PI;

    euResEl.textContent = 'Roll φ = ' + roll_deg.toFixed(1) + '° | Pitch θ = ' + pitch_deg.toFixed(1) + '° | Yaw ψ = ' + yaw_deg.toFixed(1) + '°';
    nmResEl.textContent = 'Norm |q| = ' + norm.toFixed(3) + ' (Normalized: [' + w.toFixed(3) + ', ' + x.toFixed(3) + ', ' + y.toFixed(3) + ', ' + z.toFixed(3) + '])';
  }

  [wEl, xEl, yEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter scalar quaternion real component w.',
      'Enter imaginary 3D vector components x, y, and z.',
      'Inspect converted Tait-Bryan Euler Angles (Roll $\phi$, Pitch $\theta$, Yaw $\psi$) in degrees.'
    ],
    benefitTitle: 'Sir William Rowan Hamilton 1843 Quaternions in 3D Robotics',
    benefitContent: 'Unit quaternions ($w^2 + x^2 + y^2 + z^2 = 1$) represent 3D spatial rotations continuously without gimbal lock coordinate singularities at $\pm 90^\circ$ pitch.',
    faqs: [{ q: 'What is SLERP in robotic path planning?', a: 'Spherical Linear Interpolation (SLERP) interpolates quaternions along the shortest great-circle arc on the 4D unit sphere at constant angular velocity.' }]
  },

  // 13. Differential Drive Two-Wheel Mobile Robot Kinematics Calculator
  {
    slug: 'differential-drive-mobile-robot-unicycle-odometry-calculator',
    name: 'Differential Drive Mobile Robot Kinematics (v = (v_r + v_l)/2 & ω = (v_r - v_l)/L) Calculator',
    description: 'Calculate 2-wheel differential drive mobile robot linear velocity v, angular turning velocity ω (omega = (v_r - v_l) / L), Instantaneous Center of Curvature (ICC) radius R, and dead-reckoning odometry.',
    category: 'Science',
    icon: 'text',
    keywords: ['differential drive calculator', 'unicycle robot kinematics formula online', 'instantaneous center of curvature icc differential drive calculator', 'wheel speeds vr vl to robot velocity calculator', 'robotics autonomous mobile robots ros navigation online'],
    order: 1322,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Right Wheel Speed v_r (m/s), Left Wheel Speed v_l (m/s) & Wheelbase Track Width L (m)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="dd-vr">Right Wheel v_r (m/s)</label>
          <input class="tool-textarea" id="dd-vr" type="number" step="0.1" value="0.80" placeholder="0.80 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dd-vl">Left Wheel v_l (m/s)</label>
          <input class="tool-textarea" id="dd-vl" type="number" step="0.1" value="0.40" placeholder="0.40 m/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="dd-l">Wheelbase L (m)</label>
          <input class="tool-textarea" id="dd-l" type="number" step="0.05" value="0.50" placeholder="0.50 m (Track Width)" />
        </div>
      </div>
      <div id="dd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="dd-res-kin" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Linear v = 0.60 m/s | Turning ω = +0.80 rad/s (45.8°/s)</span>
            <span class="stat-label">Forward Velocity & Counter-Clockwise Yaw Angular Velocity</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="dd-res-icc" style="color:var(--green-dark); font-weight:700;">ICC Turning Radius R = 0.75 m (Left Turn Arc) | Forward Arc Motion</span>
            <span class="stat-label">Instantaneous Center of Curvature (R = L/2 · (v_r + v_l) / (v_r - v_l))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const vrEl = document.getElementById('dd-vr'), vlEl = document.getElementById('dd-vl'), lEl = document.getElementById('dd-l');
  const knResEl = document.getElementById('dd-res-kin'), icResEl = document.getElementById('dd-res-icc');

  function update() {
    const vr = parseFloat(vrEl.value), vl = parseFloat(vlEl.value), L = parseFloat(lEl.value);
    if (isNaN(vr) || isNaN(vl) || isNaN(L) || L <= 0) return;

    // Linear velocity: v = (vr + vl) / 2
    const v = (vr + vl) / 2.0;

    // Angular velocity: omega = (vr - vl) / L  [rad / s]
    const omega = (vr - vl) / L;
    const omega_deg = (omega * 180.0) / Math.PI;

    // ICC Turning Radius R = (L / 2) * (vr + vl) / (vr - vl) = v / omega
    let icc_text = '';
    if (Math.abs(omega) > 1e-5) {
      const R = v / omega;
      icc_text = 'ICC Radius R = ' + Math.abs(R).toFixed(2) + ' m (' + (omega > 0 ? 'Left Turn Arc' : 'Right Turn Arc') + ')';
    } else {
      icc_text = 'STRAIGHT LINE MOTION (R = ∞, ω = 0)';
    }

    if (Math.abs(v) < 1e-5 && Math.abs(omega) > 1e-5) {
      icc_text = 'ZERO-RADIUS IN-PLACE SPIN (Rotate about center point R = 0)';
    }

    knResEl.textContent = 'Linear v = ' + v.toFixed(2) + ' m/s | Turning ω = ' + (omega >= 0 ? '+' : '') + omega.toFixed(2) + ' rad/s (' + omega_deg.toFixed(1) + '°/s)';
    icResEl.textContent = icc_text + ' [Track L = ' + L + ' m, v_r=' + vr + ' m/s, v_l=' + vl + ' m/s]';
  }

  [vrEl, vlEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter right wheel linear ground speed $v_r$ in m/s.',
      'Enter left wheel linear ground speed $v_l$ in m/s.',
      'Enter distance between left and right wheel ground contact points (wheelbase track width L) in meters.',
      'Inspect robot center linear forward velocity v, yaw turning rate $\omega$, and instantaneous turning radius R.'
    ],
    benefitTitle: 'Unicycle Non-Holonomic Kinematic Model',
    benefitContent: 'Governs mobile robot ground navigation in warehouse AGVs (Automated Guided Vehicles) and Roomba vacuum cleaners, enforcing the non-holonomic no-side-slip constraint.',
    faqs: [{ q: 'How does a differential robot achieve zero-radius in-place rotation?', a: 'By driving wheels in opposite directions at equal speeds ($v_r = -v_l$), linear speed $v = 0$ while turning speed $\omega = 2 v_r / L$.' }]
  },

  // 14. Ackermann Steering Geometry Turning Radius Calculator
  {
    slug: 'ackermann-steering-geometry-turning-radius-calculator',
    name: 'Ackermann Steering Geometry Turning Radius & Inner/Outer Wheel Angles Calculator',
    description: 'Calculate automobile Ackermann steering geometry inner wheel angle δ_i (cot δ_o - cot δ_i = w / L), outer wheel angle δ_o, and vehicle center turning radius R without tire scrub wear.',
    category: 'Science',
    icon: 'text',
    keywords: ['ackermann steering calculator', 'turning radius formula cot delta outer minus cot delta inner online', 'ackermann geometry inner outer wheel angle calculator', 'vehicle dynamics wheelbase track width turning circle calculator', 'automotive engineering vehicle dynamics robotics online'],
    order: 1323,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Wheelbase L (m), Track Width w (m) & Inner Steering Angle δ_i (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ak-l">Wheelbase L (m)</label>
          <input class="tool-textarea" id="ak-l" type="number" step="0.2" value="2.70" placeholder="2.70 m (Axle-to-Axle)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ak-w">Track Width w (m)</label>
          <input class="tool-textarea" id="ak-w" type="number" step="0.1" value="1.60" placeholder="1.60 m (Left-to-Right)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ak-delta">Inner Angle δ_i (°)</label>
          <input class="tool-textarea" id="ak-delta" type="number" step="2" value="35.0" placeholder="35.0° Inner Turn" />
        </div>
      </div>
      <div id="ak-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ak-res-rad" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Turning Radius R = 4.65 m (Curb-to-Curb 9.3 m)</span>
            <span class="stat-label">Center Turning Radius (R = √( (L/tan δ_avg)² + (L/2)² ))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ak-res-outer" style="color:var(--green-dark); font-weight:700;">Outer Wheel δ_o = 26.3° (8.7° Less Steering to prevent tire scrub ✓)</span>
            <span class="stat-label">Ackermann Principle (cot δ_o = cot δ_i + w / L)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const lEl = document.getElementById('ak-l'), wEl = document.getElementById('ak-w'), dlEl = document.getElementById('ak-delta');
  const rdResEl = document.getElementById('ak-res-rad'), otResEl = document.getElementById('ak-res-outer');

  function update() {
    const L = parseFloat(lEl.value), w = parseFloat(wEl.value), delta_i_deg = parseFloat(dlEl.value);
    if (isNaN(L) || isNaN(w) || isNaN(delta_i_deg) || L <= 0 || w <= 0 || delta_i_deg <= 0 || delta_i_deg >= 85) return;

    const delta_i_rad = (delta_i_deg * Math.PI) / 180.0;

    // Ackermann formula: cot(delta_o) = cot(delta_i) + (w / L)
    const cot_delta_i = 1.0 / Math.tan(delta_i_rad);
    const cot_delta_o = cot_delta_i + (w / L);
    const delta_o_rad = Math.atan(1.0 / cot_delta_o);
    const delta_o_deg = (delta_o_rad * 180.0) / Math.PI;

    // Center turning radius R from rear axle center: R_rear = L / tan(delta_center) approx L / tan((delta_i + delta_o)/2)
    const delta_avg = (delta_i_rad + delta_o_rad) / 2.0;
    const R_rear = L / Math.tan(delta_avg);
    const R_center = Math.sqrt(Math.pow(R_rear, 2) + Math.pow(L / 2.0, 2));

    rdResEl.textContent = 'Turning Radius R = ' + R_center.toFixed(2) + ' m (Diameter ' + (R_center * 2).toFixed(1) + ' m)';
    otResEl.textContent = 'Outer Wheel δ_o = ' + delta_o_deg.toFixed(1) + '° (Inner δ_i = ' + delta_i_deg.toFixed(1) + '°: Δδ = ' + (delta_i_deg - delta_o_deg).toFixed(1) + '° Difference)';
  }

  [lEl, wEl, dlEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter vehicle longitudinal wheelbase length L (distance from front to rear axle) in meters.',
      'Enter vehicle lateral track width w (distance between left and right kingpins) in meters.',
      'Enter front inner wheel steering angle $\delta_i$ in degrees.',
      'Inspect optimal outer wheel steering angle $\delta_o$ and minimum vehicle turning radius R.'
    ],
    benefitTitle: 'Rudolph Ackermann 1818 Kinematic Steering Law',
    benefitContent: 'Ensures all four wheel axes intersect at a single shared center point during a turn, eliminating lateral tire scrubbing and tire tread wear in automotive cars and forklift trucks.',
    faqs: [{ q: 'Why must the inner wheel turn sharper than the outer wheel?', a: 'The inner wheel traces a tighter circular radius path than the outer wheel ($R_{\text{inner}} < R_{\text{outer}}$), requiring a steeper angle ($\delta_i > \delta_o$).' }]
  },

  // 15. 1D Discrete Kalman Filter State Estimate Calculator
  {
    slug: 'kalman-filter-1d-state-estimate-measurement-update-calculator',
    name: '1D Discrete Kalman Filter State Estimate & Measurement Update (K_k) Calculator',
    description: 'Calculate 1D discrete Kalman filter measurement update: Kalman Gain K_k (K_k = P / (P + R)), optimal state estimate x̂_k (x̂ = x̂_prior + K_k·(z - x̂_prior)), and updated error variance P_post.',
    category: 'Math',
    icon: 'text',
    keywords: ['kalman filter calculator', 'kalman gain formula k equals p over p plus r online', 'measurement update state estimate 1d kalman calculator', 'sensor fusion variance reduction kalman filter calculator', 'robotics autonomous navigation signal processing online'],
    order: 1324,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Prior State Estimate x̂_prior, Prior Variance P_prior, Noisy Sensor Measurement z & Sensor Noise R',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="kf-x">Prior State x̂</label>
          <input class="tool-textarea" id="kf-x" type="number" step="1" value="20.0" placeholder="20.0 (Predicted State)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kf-p">Prior Variance P</label>
          <input class="tool-textarea" id="kf-p" type="number" step="0.5" value="4.0" placeholder="4.0 (σ² = 4.0)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kf-z">Measurement z</label>
          <input class="tool-textarea" id="kf-z" type="number" step="1" value="25.0" placeholder="25.0 (Sensor Reading)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="kf-r">Sensor Noise R</label>
          <input class="tool-textarea" id="kf-r" type="number" step="0.5" value="2.0" placeholder="2.0 (Sensor σ²)" />
        </div>
      </div>
      <div id="kf-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="kf-res-xpost" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Updated State x̂_post = 23.33</span>
            <span class="stat-label">Optimal Minimum-Variance State Estimate (x̂_post = x̂_prior + K_k·(z - x̂_prior))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="kf-res-gain" style="color:var(--green-dark); font-weight:700;">Kalman Gain K_k = 0.667 | Variance reduced from P=4.00 to P_post = 1.33 (-66.7% Uncertainty)</span>
            <span class="stat-label">Kalman Optimal Weighting & Uncertainty Reduction</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const xEl = document.getElementById('kf-x'), pEl = document.getElementById('kf-p');
  const zEl = document.getElementById('kf-z'), rEl = document.getElementById('kf-r');
  const xpResEl = document.getElementById('kf-res-xpost'), gnResEl = document.getElementById('kf-res-gain');

  function update() {
    const x_prior = parseFloat(xEl.value), P_prior = parseFloat(pEl.value);
    const z = parseFloat(zEl.value), R = parseFloat(rEl.value);

    if (isNaN(x_prior) || isNaN(P_prior) || isNaN(z) || isNaN(R) || P_prior < 0 || R <= 0) return;

    // Measurement innovation / residual: y = z - x_prior
    const innovation = z - x_prior;

    // Kalman gain: K_k = P_prior / ( P_prior + R )
    const K_k = P_prior / (P_prior + R);

    // Posterior state estimate: x_post = x_prior + K_k * innovation
    const x_post = x_prior + (K_k * innovation);

    // Posterior variance: P_post = (1 - K_k) * P_prior
    const P_post = (1.0 - K_k) * P_prior;

    const unc_reduction_pct = P_prior > 0 ? ((P_prior - P_post) / P_prior) * 100.0 : 0;

    xpResEl.textContent = 'Updated State x̂_post = ' + x_post.toFixed(2);
    gnResEl.textContent = 'Gain K_k = ' + K_k.toFixed(3) + ' | Variance: ' + P_prior.toFixed(2) + ' → ' + P_post.toFixed(2) + ' (-' + unc_reduction_pct.toFixed(1) + '% Error Uncertainty | Residual = ' + (innovation >= 0 ? '+' : '') + innovation.toFixed(1) + ')';
  }

  [xEl, pEl, zEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter model prior state estimate prediction $\hat{x}_{\text{prior}}$ (e.g. from odometry / physics propagation).',
      'Enter prior estimate error variance $P_{\text{prior}}$ ($\sigma^2$).',
      'Enter new noisy sensor measurement reading z (e.g. from GPS / LiDAR / sonar).',
      'Enter sensor measurement noise variance R ($\sigma_v^2$).',
      'Inspect optimal Kalman Gain $K_k$, updated posterior state estimate $\hat{x}_{\text{post}}$, and reduced error variance $P_{\text{post}}$.'
    ],
    benefitTitle: 'Rudolf E. Kálmán 1960 Recursive Bayesian Filter',
    benefitContent: 'Provably optimal linear quadratic state estimator that fuses noisy physics predictions with noisy sensor measurements to achieve minimum possible error variance in Apollo lunar guidance and autonomous self-driving cars.',
    faqs: [{ q: 'What happens when sensor noise R approaches zero?', a: 'As $R \to 0$, Kalman Gain $K_k \to 1.0$, meaning the filter trusts the measurement completely and sets $\hat{x}_{\text{post}} = z$.' }]
  },

  // 16. Robotic Trajectory Quintic & Cubic Polynomial Motion Profile Calculator
  {
    slug: 'trajectory-cubic-quintic-polynomial-motion-profile-calculator',
    name: 'Robotic Trajectory Quintic & Cubic Polynomial Motion Profile Calculator',
    description: 'Calculate robotic joint trajectory 5th-order quintic polynomial coefficients (s(t) = a₀ + a₁t + a₂t² + a₃t³ + a₄t⁴ + a₅t⁵) and 3rd-order cubic curves with zero initial/final velocity and acceleration boundary conditions.',
    category: 'Math',
    icon: 'text',
    keywords: ['trajectory generation calculator', 'quintic polynomial trajectory formula robotics online', 'cubic polynomial motion profile calculator', 'zero jerk velocity acceleration boundary conditions calculator', 'robotics motion planning automation mechatronics online'],
    order: 1325,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Initial Position q₀ (°), Target Position q_f (°), Travel Time T (s) & Current Time t (s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="tr-q0">Start q₀ (°)</label>
          <input class="tool-textarea" id="tr-q0" type="number" step="10" value="0.0" placeholder="0.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-qf">Target q_f (°)</label>
          <input class="tool-textarea" id="tr-qf" type="number" step="10" value="90.0" placeholder="90.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-t">Total Time T (s)</label>
          <input class="tool-textarea" id="tr-t" type="number" step="0.5" value="2.0" placeholder="2.0 Seconds" />
        </div>
        <div class="control-group">
          <label class="control-label" for="tr-time">Current t (s)</label>
          <input class="tool-textarea" id="tr-time" type="number" step="0.2" value="1.0" placeholder="1.0 s (Midpoint)" />
        </div>
      </div>
      <div id="tr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="tr-res-pos" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Position q(t) = 45.0° | Speed q̇(t) = 84.38 °/s</span>
            <span class="stat-label">Quintic Polynomial Trajectory State at Time t (Position, Velocity, Acceleration)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="tr-res-peak" style="color:var(--green-dark); font-weight:700;">Max Velocity = 84.38 °/s (1.875·Δq/T) | Max Acceleration = 117.0 °/s² (Smooth C² continuity ✓)</span>
            <span class="stat-label">Peak Trajectory Kinematic Limits (Zero Initial/Final Acceleration & Jerk)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const q0El = document.getElementById('tr-q0'), qfEl = document.getElementById('tr-qf');
  const tEl = document.getElementById('tr-t'), tmEl = document.getElementById('tr-time');
  const psResEl = document.getElementById('tr-res-pos'), pkResEl = document.getElementById('tr-res-peak');

  function update() {
    const q0 = parseFloat(q0El.value), qf = parseFloat(qfEl.value);
    const T = parseFloat(tEl.value), t_cur = parseFloat(tmEl.value);

    if (isNaN(q0) || isNaN(qf) || isNaN(T) || isNaN(t_cur) || T <= 0 || t_cur < 0) return;

    const delta_q = qf - q0;
    const t = Math.min(T, t_cur);

    // Quintic polynomial boundary conditions: v0=0, vf=0, a0=0, af=0
    // s(t) = q0 + delta_q * ( 10*(t/T)^3 - 15*(t/T)^4 + 6*(t/T)^5 )
    const tau = t / T;
    const s_norm = (10.0 * Math.pow(tau, 3)) - (15.0 * Math.pow(tau, 4)) + (6.0 * Math.pow(tau, 5));
    const s_dot_norm = (30.0 * Math.pow(tau, 2)) - (60.0 * Math.pow(tau, 3)) + (30.0 * Math.pow(tau, 4));
    const s_ddot_norm = (60.0 * tau) - (180.0 * Math.pow(tau, 2)) + (120.0 * Math.pow(tau, 3));

    const q_t = q0 + (delta_q * s_norm);
    const v_t = (delta_q / T) * s_dot_norm;
    const a_t = (delta_q / Math.pow(T, 2)) * s_ddot_norm;

    // Peak limits for quintic:
    const v_max = (15.0 / 8.0) * (Math.abs(delta_q) / T); // 1.875 * Delta_q / T
    const a_max = (10.0 / (Math.sqrt(3))) * (Math.abs(delta_q) / Math.pow(T, 2)); // 5.77 * Delta_q / T^2

    psResEl.textContent = 'Position q(t) = ' + q_t.toFixed(1) + '° | Speed q̇(t) = ' + v_t.toFixed(2) + ' °/s | Accel q̈ = ' + a_t.toFixed(1) + ' °/s²';
    pkResEl.textContent = 'Peak Velocity = ' + v_max.toFixed(2) + ' °/s | Peak Accel = ' + a_max.toFixed(1) + ' °/s² (t=' + t.toFixed(2) + 's / ' + T + 's)';
  }

  [q0El, qfEl, tEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter initial starting joint position $q_0$ in degrees.',
      'Enter final target position $q_f$ in degrees.',
      'Enter total movement execution duration T in seconds.',
      'Enter current elapsed time t in seconds.',
      'Inspect interpolated joint position, velocity, acceleration, and peak trajectory motion bounds.'
    ],
    benefitTitle: 'Quintic Smooth Polynomial Trajectory Generation',
    benefitContent: 'Guarantees $C^2$ continuous position, velocity, and acceleration profiles with zero start/end jerk ($a(0) = a(T) = 0$), preventing robotic arm mechanical vibrations and motor gear train wear.',
    faqs: [{ q: 'Why is a quintic (5th-order) polynomial preferred over cubic (3rd-order)?', a: 'Cubic trajectories cannot specify acceleration at endpoints ($a(0), a(T)$), causing sudden step jumps in acceleration that trigger mechanical vibrations.' }]
  },

  // 17. Trapezoidal & S-Curve Velocity Profile Calculator
  {
    slug: 'trapezoidal-s-curve-velocity-profile-motion-calculator',
    name: 'Trapezoidal & S-Curve Velocity Profile Motion Profile Calculator',
    description: 'Calculate industrial CNC and pick-and-place trapezoidal velocity profile kinematics: acceleration time t_acc (v_max / a), cruise distance, total movement duration T, and minimum distance required to reach top speed.',
    category: 'Science',
    icon: 'text',
    keywords: ['trapezoidal velocity profile calculator', 'motion profile acceleration time t acc formula online', 's curve velocity profile cnc feedrate calculator', 'peak velocity acceleration distance motion controller calculator', 'mechatronics robotics automation industrial motion online'],
    order: 1326,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Total Displacement Distance D (mm), Max Velocity v_max (mm/s) & Acceleration a (mm/s²)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="vp-d">Distance D (mm)</label>
          <input class="tool-textarea" id="vp-d" type="number" step="50" value="500.0" placeholder="500.0 mm Stroke" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vp-vmax">Max Speed v_max (mm/s)</label>
          <input class="tool-textarea" id="vp-vmax" type="number" step="50" value="250.0" placeholder="250.0 mm/s" />
        </div>
        <div class="control-group">
          <label class="control-label" for="vp-a">Accel a (mm/s²)</label>
          <input class="tool-textarea" id="vp-a" type="number" step="100" value="1000.0" placeholder="1000.0 mm/s²" />
        </div>
      </div>
      <div id="vp-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="vp-res-time" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Total Move Time T = 2.250 s</span>
            <span class="stat-label">Complete Stroke Profile Duration (T = t_acc + t_cruise + t_dec)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="vp-res-phases" style="color:var(--green-dark); font-weight:700;">Accel: 0.250s (31.3 mm) | Cruise: 1.750s (437.5 mm) | Decel: 0.250s (31.3 mm)</span>
            <span class="stat-label">Three-Phase Motion Breakdown (Trapezoidal Profile Achieved ✓)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const dEl = document.getElementById('vp-d'), vmEl = document.getElementById('vp-vmax'), aEl = document.getElementById('vp-a');
  const tmResEl = document.getElementById('vp-res-time'), phResEl = document.getElementById('vp-res-phases');

  function update() {
    const D = parseFloat(dEl.value), v_max = parseFloat(vmEl.value), a = parseFloat(aEl.value);
    if (isNaN(D) || isNaN(v_max) || isNaN(a) || D <= 0 || v_max <= 0 || a <= 0) return;

    // Time to reach v_max: t_acc = v_max / a
    const t_acc = v_max / a;

    // Distance covered during acceleration: d_acc = 0.5 * a * t_acc^2 = 0.5 * v_max^2 / a
    const d_acc = 0.5 * Math.pow(v_max, 2) / a;

    // Total distance needed for both accel and decel: d_crit = 2 * d_acc
    const d_crit = 2.0 * d_acc;

    let T_total = 0, t_cruise = 0, d_cruise = 0, v_peak = v_max;

    if (D >= d_crit) {
      // True Trapezoidal Profile (reaches full v_max):
      d_cruise = D - d_crit;
      t_cruise = d_cruise / v_max;
      T_total = (2.0 * t_acc) + t_cruise;

      tmResEl.textContent = 'Total Move Time T = ' + T_total.toFixed(3) + ' s';
      phResEl.textContent = 'Accel: ' + t_acc.toFixed(3) + 's (' + d_acc.toFixed(1) + 'mm) | Cruise: ' + t_cruise.toFixed(3) + 's (' + d_cruise.toFixed(1) + 'mm) | Decel: ' + t_acc.toFixed(3) + 's';
    } else {
      // Triangular Profile (stroke too short to reach v_max):
      v_peak = Math.sqrt(a * D);
      const t_tri_acc = v_peak / a;
      T_total = 2.0 * t_tri_acc;

      tmResEl.textContent = 'Total Move Time T = ' + T_total.toFixed(3) + ' s (TRIANGULAR PROFILE)';
      phResEl.textContent = 'Peak Speed = ' + v_peak.toFixed(1) + ' mm/s (Stroke ' + D + ' mm too short for ' + v_max + ' mm/s | Accel: ' + t_tri_acc.toFixed(3) + 's)';
    }
  }

  [dEl, vmEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter total linear/rotational stroke displacement D in mm.',
      'Enter programmed maximum velocity $v_{\max}$ in mm/s.',
      'Enter maximum motor/drive acceleration a in $\text{mm/s}^2$.',
      'Inspect total travel time T and breakdown across acceleration, constant velocity cruising, and deceleration phases.'
    ],
    benefitTitle: 'Time-Optimal Motion Profile Standard',
    benefitContent: 'Industry standard kinematic profile for industrial linear stages, 3D printers (G-code motion planner), and servo gantries, balancing speed against motor torque saturation.',
    faqs: [{ q: 'What is a triangular motion profile?', a: 'When the stroke distance D is too short, the motor must immediately begin decelerating before reaching $v_{\max}$, creating a triangular speed curve.' }]
  },

  // 18. Lead-Lag Frequency Compensator Phase Boost Calculator
  {
    slug: 'lead-lag-compensator-frequency-response-phase-boost-calculator',
    name: 'Lead-Lag Frequency Compensator Phase Boost (sin φ_m = (1-α)/(1+α)) Calculator',
    description: 'Calculate control system Phase-Lead frequency compensator G_c(s) = (s + 1/T) / (s + 1/(α·T)) maximum phase lead boost φ_m (sin φ_m = (1 - α) / (1 + α)), attenuation factor α, and geometric center frequency ω_m.',
    category: 'Math',
    icon: 'text',
    keywords: ['lead lag compensator calculator', 'phase lead boost formula sin phi m online', 'attenuation factor alpha compensator calculator', 'frequency response phase margin lead compensator calculator', 'control systems mechatronics electrical engineering online'],
    order: 1327,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Desired Phase Lead Boost φ_m (Degrees) & Target Center Frequency ω_m (rad/s)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ll-phi">Phase Boost φ_m (°)</label>
          <input class="tool-textarea" id="ll-phi" type="number" step="5" min="5" max="80" value="45.0" placeholder="45.0° (Lead Boost)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ll-wm">Center Freq ω_m (rad/s)</label>
          <input class="tool-textarea" id="ll-wm" type="number" step="10" value="50.0" placeholder="50.0 rad/s" />
        </div>
      </div>
      <div id="ll-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ll-res-comp" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Lead Compensator: Zero at -20.7 rad/s | Pole at -120.7 rad/s</span>
            <span class="stat-label">Transfer Function Poles & Zeros: G_c(s) = (s + 20.7) / (s + 120.7)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ll-res-alpha" style="color:var(--green-dark); font-weight:700;">Attenuation α = 0.1716 (α < 1: Lead) | High Frequency Gain Boost = +15.3 dB (1/α = 5.83×)</span>
            <span class="stat-label">Lead Parameter α = (1 - sin φ_m) / (1 + sin φ_m)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const phiEl = document.getElementById('ll-phi'), wmEl = document.getElementById('ll-wm');
  const cpResEl = document.getElementById('ll-res-comp'), alResEl = document.getElementById('ll-res-alpha');

  function update() {
    const phi_m_deg = parseFloat(phiEl.value), omega_m = parseFloat(wmEl.value);
    if (isNaN(phi_m_deg) || isNaN(omega_m) || phi_m_deg <= 0 || phi_m_deg >= 90 || omega_m <= 0) return;

    const phi_m_rad = (phi_m_deg * Math.PI) / 180.0;

    // Attenuation factor: alpha = ( 1 - sin(phi_m) ) / ( 1 + sin(phi_m) )
    const sin_phi = Math.sin(phi_m_rad);
    const alpha = (1.0 - sin_phi) / (1.0 + sin_phi);

    // Center frequency: omega_m = 1 / ( T * sqrt(alpha) ) => T = 1 / ( omega_m * sqrt(alpha) )
    const T = 1.0 / (omega_m * Math.sqrt(alpha));

    // Zero location: z = 1 / T
    const zero_loc = 1.0 / T;

    // Pole location: p = 1 / ( alpha * T )
    const pole_loc = 1.0 / (alpha * T);

    // High frequency gain in dB: 20 * log10( 1 / alpha )
    const gain_dB = 20.0 * Math.log10(1.0 / alpha);

    cpResEl.textContent = 'G_c(s) = (s + ' + zero_loc.toFixed(1) + ') / (s + ' + pole_loc.toFixed(1) + ')';
    alResEl.textContent = 'α = ' + alpha.toFixed(4) + ' | Zero: -' + zero_loc.toFixed(1) + ', Pole: -' + pole_loc.toFixed(1) + ' rad/s (+ ' + gain_dB.toFixed(1) + ' dB Gain Boost)';
  }

  phiEl.addEventListener('input', update));
  wmEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter required additional Phase Margin boost $\phi_m$ in degrees (typically $30^\circ\text{ to }55^\circ$).',
      'Enter desired gain crossover frequency $\omega_m$ in rad/s.',
      'Inspect lead parameter $\alpha$, compensator zero location $z = 1/T$, and pole location $p = 1/(\alpha T)$.'
    ],
    benefitTitle: 'Frequency Domain Loop Shaping Standard',
    benefitContent: 'Injects positive phase lead around the gain crossover frequency to increase Phase Margin (PM), speeding up closed-loop transient response without destabilizing oscillations.',
    faqs: [{ q: 'Why is phase lead limited to approximately 60° per stage?', a: 'Higher $\phi_m$ requires extremely small $\alpha$, amplifying high-frequency sensor noise excessively ($Gain = 1/\alpha$).' }]
  },

  // 19. Harmonic Drive Strain Wave Gear Reduction Ratio Calculator
  {
    slug: 'harmonic-drive-strain-wave-gear-reduction-ratio-calculator',
    name: 'Harmonic Drive Strain Wave Gear Reduction Ratio (R = N_flex / (N_circ - N_flex)) Calculator',
    description: 'Calculate zero-backlash robotic strain wave harmonic drive gear reduction ratio R (R = N_flex / (N_circ - N_flex)), output torque multiplication, and wave generator input speed for precision robot joints.',
    category: 'Science',
    icon: 'text',
    keywords: ['harmonic drive calculator', 'strain wave gear reduction ratio formula online', 'zero backlash flexspline circular spline teeth calculator', 'robot joint precision harmonic drive ratio calculator', 'robotics mechatronics precision gearboxes online'],
    order: 1328,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Flexspline Teeth N_flex, Circular Spline Teeth N_circ & Input Wave Generator RPM',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="hd-nflex">Flexspline Teeth N_f</label>
          <input class="tool-textarea" id="hd-nflex" type="number" step="2" value="200" placeholder="200 (Flexible Spline)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hd-ncirc">Circular Teeth N_c</label>
          <input class="tool-textarea" id="hd-ncirc" type="number" step="2" value="202" placeholder="202 (N_f + 2)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="hd-rpm">Input Speed (RPM)</label>
          <input class="tool-textarea" id="hd-rpm" type="number" step="500" value="3000.0" placeholder="3000.0 RPM (Motor)" />
        </div>
      </div>
      <div id="hd-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="hd-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Gear Ratio R = 100 : 1 (Output Speed = -30.0 RPM)</span>
            <span class="stat-label">Strain Wave Gear Reduction Ratio (R = N_flex / (N_circ - N_flex))</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="hd-res-torque" style="color:var(--green-dark); font-weight:700;">Zero Backlash (< 0.1 arcmin) | Torque Multiplication = 100× | Reverse Rotation Direction</span>
            <span class="stat-label">Torque Multiplication & High-Precision Positional Repeatability</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nfEl = document.getElementById('hd-nflex'), ncEl = document.getElementById('hd-ncirc'), rpmEl = document.getElementById('hd-rpm');
  const rtResEl = document.getElementById('hd-res-ratio'), tqResEl = document.getElementById('hd-res-torque');

  function update() {
    const N_flex = parseInt(nfEl.value, 10), N_circ = parseInt(ncEl.value, 10);
    const rpm_in = parseFloat(rpmEl.value);

    if (isNaN(N_flex) || isNaN(N_circ) || isNaN(rpm_in) || N_flex <= 0 || N_circ <= N_flex) return;

    // Harmonic drive reduction ratio with circular spline fixed and flexspline output:
    // Ratio R = N_flex / ( N_circ - N_flex )
    const diff = N_circ - N_flex;
    const ratio = N_flex / diff;

    // Output speed (rotates in opposite direction to wave generator):
    const rpm_out = - (rpm_in / ratio);

    rtResEl.textContent = 'Gear Ratio R = ' + ratio.toFixed(0) + ' : 1 (Output = ' + rpm_out.toFixed(1) + ' RPM)';
    tqResEl.textContent = 'Zero Backlash (< 1 arcsec) | Torque Boost: ' + ratio.toFixed(0) + '× | Wave Diff = ' + diff + ' Teeth (Input ' + rpm_in + ' RPM)';
  }

  [nfEl, ncEl, rpmEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter number of external teeth on the thin elastic cup Flexspline $N_{\text{flex}}$.',
      'Enter number of internal teeth on the rigid Circular Spline $N_{\text{circ}}$ (typically $N_{\text{flex}} + 2$).',
      'Enter input Wave Generator motor shaft rotational speed in RPM.',
      'Inspect gear reduction ratio R and output joint shaft RPM.'
    ],
    benefitTitle: 'C. Walton Musser 1957 Strain Wave Gearing Patent',
    benefitContent: 'Achieves massive compact single-stage reduction ratios ($50:1\text{ to }160:1$) with zero mechanical backlash, serving as the universal standard for robotic arm joints and aerospace satellite gimbals.',
    faqs: [{ q: 'Why is harmonic drive gearing backlash-free?', a: 'Multiple teeth are continuously pre-loaded in radial elastic mesh on opposite sides of the elliptical wave generator simultaneously.' }]
  },

  // 20. IMU Sensor Fusion Complementary Filter Angle Calculator
  {
    slug: 'inertial-measurement-unit-imu-complementary-filter-angle-calculator',
    name: 'IMU Sensor Fusion Complementary Filter Orientation Angle Calculator',
    description: 'Calculate 6-DOF IMU fused pitch/roll tilt angle θ_k in degrees using a digital Complementary Filter (θ_k = α · (θ_{k-1} + ω_gyro · Δt) + (1 - α) · θ_accel) fusing gyroscope integration and accelerometer gravity vector.',
    category: 'Science',
    icon: 'text',
    keywords: ['complementary filter calculator', 'imu sensor fusion formula theta k equals alpha online', 'accelerometer gyroscope fusion filter calculator', 'drone quadcopter attitude estimation imu calculator', 'robotics mechatronics avionics embedded systems online'],
    order: 1329,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Previous Angle θ_{k-1} (°), Gyro Rate ω (°/s), Sample Time Δt (s) & Accelerometer Pitch (°)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="im-thprev">Prev θ_{k-1} (°)</label>
          <input class="tool-textarea" id="im-thprev" type="number" step="1" value="15.0" placeholder="15.0°" />
        </div>
        <div class="control-group">
          <label class="control-label" for="im-gyro">Gyro ω (°/s)</label>
          <input class="tool-textarea" id="im-gyro" type="number" step="5" value="20.0" placeholder="+20.0 °/s Pitch" />
        </div>
        <div class="control-group">
          <label class="control-label" for="im-dt">Sample Δt (s)</label>
          <input class="tool-textarea" id="im-dt" type="number" step="0.005" value="0.010" placeholder="0.010 s (100 Hz)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="im-accel">Accel Pitch (°)</label>
          <input class="tool-textarea" id="im-accel" type="number" step="1" value="15.5" placeholder="15.5° (atan2(Ay, Az))" />
        </div>
        <div class="control-group">
          <label class="control-label" for="im-alpha">Filter Weight α</label>
          <input class="tool-textarea" id="im-alpha" type="number" step="0.01" min="0.8" max="0.999" value="0.98" placeholder="0.98 (Standard)" />
        </div>
      </div>
      <div id="im-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="im-res-fused" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Fused Tilt Angle θ_k = 15.21°</span>
            <span class="stat-label">Complementary Fused Angle (θ = α·(θ_prev + ω·Δt) + (1-α)·θ_acc)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="im-res-parts" style="color:var(--green-dark); font-weight:700;">Gyro High-Pass Contribution = 14.90° (98%) | Accel Low-Pass = 0.31° (2% Drift Correction)</span>
            <span class="stat-label">Frequency Decomposition (Gyro dynamic tracking + Accel zero-drift baseline)</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const thpEl = document.getElementById('im-thprev'), gyEl = document.getElementById('im-gyro');
  const dtEl = document.getElementById('im-dt'), acEl = document.getElementById('im-accel'), alEl = document.getElementById('im-alpha');
  const fsResEl = document.getElementById('im-res-fused'), ptResEl = document.getElementById('im-res-parts');

  function update() {
    const th_prev = parseFloat(thpEl.value), omega_gyro = parseFloat(gyEl.value);
    const dt = parseFloat(dtEl.value), th_accel = parseFloat(acEl.value), alpha = parseFloat(alEl.value);

    if (isNaN(th_prev) || isNaN(omega_gyro) || isNaN(dt) || isNaN(th_accel) || isNaN(alpha) || dt <= 0 || alpha <= 0 || alpha >= 1) return;

    // Gyro dead-reckoning integration:
    const gyro_integrated = th_prev + (omega_gyro * dt);

    // Complementary Filter equation:
    // theta_k = alpha * ( theta_{k-1} + omega_gyro * dt ) + ( 1 - alpha ) * theta_accel
    const part_gyro = alpha * gyro_integrated;
    const part_accel = (1.0 - alpha) * th_accel;
    const theta_fused = part_gyro + part_accel;

    fsResEl.textContent = 'Fused Tilt Angle θ_k = ' + theta_fused.toFixed(2) + '°';
    ptResEl.textContent = 'Gyro Track = ' + part_gyro.toFixed(2) + '° (' + (alpha * 100).toFixed(0) + '%) | Accel Drift Fix = ' + part_accel.toFixed(2) + '° (' + ((1.0 - alpha) * 100).toFixed(0) + '% @ ' + (1.0/dt).toFixed(0) + ' Hz)';
  }

  [thpEl, gyEl, dtEl, acEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter prior orientation tilt angle $\theta_{k-1}$ in degrees.',
      'Enter gyroscope angular rotation rate $\omega_{\text{gyro}}$ in $^\circ/\text{s}$.',
      'Enter IMU sensor sampling loop time step $\Delta t$ in seconds (e.g. 0.010 s for 100 Hz).',
      'Enter raw accelerometer inclination angle $\theta_{\text{accel}} = \text{atan2}(A_y, A_z)$ in degrees.',
      'Enter filter weighting parameter $\alpha$ (typically 0.96–0.98).',
      'Inspect noise-filtered fused orientation angle $\theta_k$.'
    ],
    benefitTitle: 'Lightweight Digital Sensor Fusion Filter',
    benefitContent: 'High-pass filters gyroscope integration (eliminating slow DC gyro integration drift) and low-pass filters accelerometer readings (eliminating high-frequency motor vibration noise) with minimal CPU cycles on 8-bit/32-bit microcontrollers.',
    faqs: [{ q: 'Why is a complementary filter used over a full Kalman filter?', a: 'It requires only 2 additions and 2 multiplications per loop update, executing $100\times$ faster than an Extended Kalman Filter (EKF) matrix inversion.' }]
  },

  // 21. Planetary Epicyclic Gear Train Speed Ratio Calculator
  {
    slug: 'planetary-epicyclic-gear-train-sun-ring-carrier-speed-calculator',
    name: 'Planetary Epicyclic Gear Train Speed Ratio (Sun, Ring, Carrier) Calculator',
    description: 'Calculate epicyclic planetary gearbox speeds and gear ratios (Willis Equation: (ω_s - ω_c) / (ω_r - ω_c) = - N_r / N_s) for sun gear, ring gear (annulus), planet carrier, and planetary reduction stages.',
    category: 'Science',
    icon: 'text',
    keywords: ['planetary gear calculator', 'epicyclic gear train willis formula online', 'sun ring planet carrier gear ratio calculator', 'automatic transmission planetary reduction calculator', 'mechanical engineering machine design robotics online'],
    order: 1330,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Sun Gear Teeth N_s, Ring Gear Teeth N_r, Sun Input RPM & Fixed Element',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="pl-ns">Sun Teeth N_s</label>
          <input class="tool-textarea" id="pl-ns" type="number" step="2" value="24" placeholder="24 Teeth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-nr">Ring Teeth N_r</label>
          <input class="tool-textarea" id="pl-nr" type="number" step="2" value="72" placeholder="72 Teeth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-mode">Fixed Element</label>
          <select class="tool-textarea" id="pl-mode">
            <option value="fixed_ring" selected>Ring Fixed (Sun In → Carrier Out)</option>
            <option value="fixed_carrier">Carrier Fixed (Sun In → Ring Out - Reverse)</option>
            <option value="fixed_sun">Sun Fixed (Ring In → Carrier Out)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="pl-rpm">Input Speed (RPM)</label>
          <input class="tool-textarea" id="pl-rpm" type="number" step="500" value="2000.0" placeholder="2000.0 RPM" />
        </div>
      </div>
      <div id="pl-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="pl-res-ratio" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Gear Ratio = 4.00 : 1 (Output Carrier = 500.0 RPM)</span>
            <span class="stat-label">Planetary Gear Reduction Ratio (R = 1 + N_r / N_s)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="pl-res-planet" style="color:var(--green-dark); font-weight:700;">Planet Gear Teeth N_p = 24 (N_p = (N_r - N_s)/2) | Same Direction Rotation</span>
            <span class="stat-label">Planet Pinion Size & Coaxial Power Transmission</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const nsEl = document.getElementById('pl-ns'), nrEl = document.getElementById('pl-nr');
  const mdEl = document.getElementById('pl-mode'), rpEl = document.getElementById('pl-rpm');
  const rtResEl = document.getElementById('pl-res-ratio'), plResEl = document.getElementById('pl-res-planet');

  function update() {
    const N_s = parseInt(nsEl.value, 10), N_r = parseInt(nrEl.value, 10);
    const mode = mdEl.value, rpm_in = parseFloat(rpEl.value);

    if (isNaN(N_s) || isNaN(N_r) || isNaN(rpm_in) || N_s <= 0 || N_r <= N_s) return;

    // Planet pinion teeth: N_p = (N_r - N_s) / 2
    const N_p = (N_r - N_s) / 2.0;

    let ratio = 0, rpm_out = 0, desc = '';

    if (mode === 'fixed_ring') {
      // Ring fixed (omega_r = 0): omega_s / omega_c = 1 + (N_r / N_s)
      ratio = 1.0 + (N_r / N_s);
      rpm_out = rpm_in / ratio;
      desc = 'Forward Reduction (Ratio = 1 + N_r/N_s)';
    } else if (mode === 'fixed_carrier') {
      // Carrier fixed (omega_c = 0): omega_s / omega_r = - (N_r / N_s)
      ratio = N_r / N_s;
      rpm_out = - (rpm_in / ratio);
      desc = 'Reverse Speed Reduction (Ratio = - N_r/N_s)';
    } else {
      // Sun fixed (omega_s = 0): omega_r / omega_c = 1 + (N_s / N_r)
      ratio = 1.0 + (N_s / N_r);
      rpm_out = rpm_in / ratio;
      desc = 'Low Overdrive Reduction (Ratio = 1 + N_s/N_r)';
    }

    rtResEl.textContent = 'Gear Ratio = ' + ratio.toFixed(2) + ' : 1 (Output = ' + (rpm_out >= 0 ? '+' : '') + rpm_out.toFixed(1) + ' RPM)';
    plResEl.textContent = 'Planet Pinion N_p = ' + N_p + ' Teeth | ' + desc + ' (Sun=' + N_s + ', Ring=' + N_r + ')';
  }

  [nsEl, nrEl, rpEl].forEach(el => el.addEventListener('input', update));
  mdEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter number of teeth on central Sun gear $N_s$.',
      'Enter number of internal teeth on outer Ring gear (Annulus) $N_r$.',
      'Select fixed stationary gear element (Fixed Ring, Fixed Carrier, or Fixed Sun).',
      'Enter input shaft rotational speed in RPM.',
      'Inspect planetary gear speed reduction ratio and output shaft RPM.'
    ],
    benefitTitle: 'Robert Willis 1841 Relative Planetary Kinematics Formula',
    benefitContent: 'Allows extremely high torque density in coaxial compact packages, standard for automatic automobile transmissions and wind turbine power generators.',
    faqs: [{ q: 'What is the fundamental geometric mesh condition for planetary gears?', a: 'For symmetrical planet pinion spacing: $N_{\text{planet}} = (N_r - N_s)/2$ and $(N_s + N_r) / (\text{Number of Planets})$ must be an integer.' }]
  },

  // 22. Lead Screw & Ball Screw Linear Thrust Force Calculator
  {
    slug: 'lead-screw-ball-screw-torque-efficiency-linear-thrust-calculator',
    name: 'Lead Screw & Ball Screw Linear Thrust Force (F = 2π·η·T / L) & Torque Calculator',
    description: 'Calculate linear actuator drive torque T in N·m (T = F · L / (2π · η)), linear thrust force F in kN, screw mechanical efficiency η, and lead angle λ for precision CNC machine ball screws and ACME lead screws.',
    category: 'Science',
    icon: 'text',
    keywords: ['ball screw calculator', 'lead screw thrust force formula online', 'motor torque to linear force ball screw calculator', 'lead screw efficiency lead angle calculator', 'cnc automation mechanical engineering robotics online'],
    order: 1331,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Screw Lead L (mm/rev), Screw Diameter d (mm), Driving Torque T (N·m) & Screw Type',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="ls-lead">Lead L (mm/rev)</label>
          <input class="tool-textarea" id="ls-lead" type="number" step="1" value="5.0" placeholder="5.0 mm / rev" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ls-d">Diameter d (mm)</label>
          <input class="tool-textarea" id="ls-d" type="number" step="2" value="16.0" placeholder="16.0 mm (e.g. SFU1605)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ls-torque">Motor Torque T (N·m)</label>
          <input class="tool-textarea" id="ls-torque" type="number" step="0.5" value="2.0" placeholder="2.0 N·m" />
        </div>
        <div class="control-group">
          <label class="control-label" for="ls-type">Screw Type</label>
          <select class="tool-textarea" id="ls-type">
            <option value="0.90" selected>Ball Screw (η = 90% High Efficiency)</option>
            <option value="0.45">ACME Trapezoidal Bronze (η = 45% Self-Locking)</option>
            <option value="0.30">Steel-on-Steel Metric (η = 30%)</option>
          </select>
        </div>
      </div>
      <div id="ls-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="ls-res-force" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Linear Thrust F = 2,262 N (2.26 kN / 508 lbf)</span>
            <span class="stat-label">Linear Axial Thrust Force Output (F = 2π · η · T / L)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="ls-res-leadang" style="color:var(--green-dark); font-weight:700;">Helix Lead Angle λ = 5.68° (tan λ = L / (π·d)) | 1,000 RPM Motor = 83.3 mm/s Linear Feed</span>
            <span class="stat-label">Helix Lead Angle & Linear Feed Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const ldEl = document.getElementById('ls-lead'), dEl = document.getElementById('ls-d');
  const tqEl = document.getElementById('ls-torque'), tpEl = document.getElementById('ls-type');
  const fcResEl = document.getElementById('ls-res-force'), laResEl = document.getElementById('ls-res-leadang');

  function update() {
    const L_mm = parseFloat(ldEl.value), d_mm = parseFloat(dEl.value);
    const T = parseFloat(tqEl.value), eta = parseFloat(tpEl.value);

    if (isNaN(L_mm) || isNaN(d_mm) || isNaN(T) || isNaN(eta) || L_mm <= 0 || d_mm <= 0 || T <= 0) return;

    const L_m = L_mm * 1e-3;

    // Linear thrust force: F = ( 2 * pi * eta * T ) / L_m  [Newtons]
    const F_N = (2.0 * Math.PI * eta * T) / L_m;
    const F_kN = F_N / 1000.0;
    const F_lbf = F_N * 0.224809;

    // Helix lead angle: tan(lambda) = L / (pi * d)
    const tan_lambda = L_mm / (Math.PI * d_mm);
    const lambda_deg = (Math.atan(tan_lambda) * 180.0) / Math.PI;

    // Linear feed at 1000 RPM: (1000 / 60) * L_mm mm/s
    const feed_1000_rpm = (1000.0 / 60.0) * L_mm;

    fcResEl.textContent = 'Thrust Force F = ' + Math.round(F_N).toLocaleString() + ' N (' + F_kN.toFixed(2) + ' kN / ' + Math.round(F_lbf) + ' lbf)';
    laResEl.textContent = 'Helix Angle λ = ' + lambda_deg.toFixed(2) + '° | Feed at 1000 RPM = ' + feed_1000_rpm.toFixed(1) + ' mm/s (η = ' + (eta * 100).toFixed(0) + '%)';
  }

  [ldEl, dEl, tqEl].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Enter screw lead L in mm/revolution (linear travel per 1 full turn).',
      'Enter screw nominal diameter d in mm (e.g. 16 mm for SFU1605).',
      'Enter driving stepper/servo motor torque T in $\text{N}\cdot\text{m}$.',
      'Select screw mechanical drive efficiency $\eta$ (Ball screw $\approx 90\%$, ACME bronze $\approx 45\%$).',
      'Inspect generated linear axial thrust force F in Newtons, kN, and pounds-force.'
    ],
    benefitTitle: 'Rotary-to-Linear Mechanical Advantage Standard',
    benefitContent: 'Converts rotary motor torque into enormous linear thrust forces ($F = \frac{2\pi\eta T}{L}$), sizing machine tool ball screw drives for heavy metal cutting.',
    faqs: [{ q: 'What is the difference between lead and pitch in multi-start screws?', a: 'Pitch is the axial distance between adjacent threads; Lead is the linear travel per revolution ($Lead = Pitch \times Number\ of\ Starts$).' }]
  },

  // 23. Pneumatic & Hydraulic Cylinder Push-Pull Thrust Force Calculator
  {
    slug: 'pneumatic-hydraulic-cylinder-thrust-force-speed-calculator',
    name: 'Pneumatic & Hydraulic Cylinder Push-Pull Thrust Force (F = P·A) & Speed Calculator',
    description: 'Calculate double-acting pneumatic and hydraulic actuator extension push force F_push in kN (F = P · π·D² / 4), retraction pull force F_pull (accounting for piston rod diameter d), and stroke velocity v.',
    category: 'Science',
    icon: 'text',
    keywords: ['pneumatic cylinder force calculator', 'hydraulic cylinder push pull thrust formula online', 'annular piston rod area force calculator', 'fluid power hydraulic actuator sizing calculator', 'fluid power mechanical automation robotics online'],
    order: 1332,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Operating Pressure P (bar), Bore Diameter D (mm), Rod Diameter d (mm) & Flow Rate Q (L/min)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="cy-p">Pressure P (bar)</label>
          <input class="tool-textarea" id="cy-p" type="number" step="10" value="160.0" placeholder="160.0 bar (Hydraulic)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-d">Bore Bore D (mm)</label>
          <input class="tool-textarea" id="cy-d" type="number" step="10" value="80.0" placeholder="80.0 mm Bore" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-rod">Rod Dia d (mm)</label>
          <input class="tool-textarea" id="cy-rod" type="number" step="5" value="45.0" placeholder="45.0 mm Rod" />
        </div>
        <div class="control-group">
          <label class="control-label" for="cy-q">Flow Q (L/min)</label>
          <input class="tool-textarea" id="cy-q" type="number" step="5" value="20.0" placeholder="20.0 L/min" />
        </div>
      </div>
      <div id="cy-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="cy-res-push" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Push Force = 80.42 kN (8.20 Metric Tons)</span>
            <span class="stat-label">Full Bore Extension Push Force (F_push = P · π·D² / 4)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="cy-res-pull" style="color:var(--green-dark); font-weight:700;">Pull Force = 54.98 kN (5.61 Tons) | Extension Speed v = 6.63 cm/s</span>
            <span class="stat-label">Annular Retraction Pull Force & Stroke Linear Speed</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const pEl = document.getElementById('cy-p'), dEl = document.getElementById('cy-d');
  const rodEl = document.getElementById('cy-rod'), qEl = document.getElementById('cy-q');
  const psResEl = document.getElementById('cy-res-push'), plResEl = document.getElementById('cy-res-pull');

  function update() {
    const P_bar = parseFloat(pEl.value), D_mm = parseFloat(dEl.value);
    const d_mm = parseFloat(rodEl.value), Q_L_min = parseFloat(qEl.value);

    if (isNaN(P_bar) || isNaN(D_mm) || isNaN(d_mm) || isNaN(Q_L_min) || P_bar <= 0 || D_mm <= 0 || d_mm < 0 || d_mm >= D_mm || Q_L_min <= 0) return;

    // Convert bar to N/mm^2 (MPa): 1 bar = 0.1 N/mm^2
    const P_MPa = P_bar * 0.1;

    // Full bore piston area: A_push = pi * D^2 / 4  [mm^2]
    const A_push_mm2 = (Math.PI * Math.pow(D_mm, 2)) / 4.0;
    const A_push_m2 = A_push_mm2 * 1e-6;

    // Annular pull area: A_pull = pi * (D^2 - d^2) / 4  [mm^2]
    const A_pull_mm2 = (Math.PI * (Math.pow(D_mm, 2) - Math.pow(d_mm, 2))) / 4.0;

    // Forces: F = P * A  [Newtons -> kN]
    const F_push_N = P_MPa * A_push_mm2;
    const F_push_kN = F_push_N / 1000.0;
    const F_push_tons = F_push_kN / 9.80665;

    const F_pull_N = P_MPa * A_pull_mm2;
    const F_pull_kN = F_pull_N / 1000.0;
    const F_pull_tons = F_pull_kN / 9.80665;

    // Extension velocity: v = Q / A  [m/s -> cm/s]
    const Q_m3_s = (Q_L_min * 1e-3) / 60.0;
    const v_push_m_s = Q_m3_s / A_push_m2;
    const v_push_cm_s = v_push_m_s * 100.0;

    psResEl.textContent = 'Push Force = ' + F_push_kN.toFixed(2) + ' kN (' + F_push_tons.toFixed(2) + ' Tons)';
    plResEl.textContent = 'Pull Force = ' + F_pull_kN.toFixed(2) + ' kN (' + F_pull_tons.toFixed(2) + ' Tons) | Extension Speed v = ' + v_push_cm_s.toFixed(2) + ' cm/s (Q=' + Q_L_min + ' L/min)';
  }

  [pEl, dEl, rodEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();`,
    howToSteps: [
      'Enter fluid supply operating pressure P in bar (typically 6 bar for pneumatics, 160–210 bar for hydraulics).',
      'Enter cylinder piston main bore diameter D in mm.',
      'Enter piston rod diameter d in mm.',
      'Enter fluid pump/compressor flow rate Q in Liters/minute (L/min).',
      'Inspect extension push force, annular retraction pull force in kN/Tons, and stroke linear speed.'
    ],
    benefitTitle: 'Pascal\'s Hydrostatic Actuator Force Principle',
    benefitContent: 'Directly converts hydraulic fluid pressure into heavy linear actuation forces ($F = P \cdot A$), sizing construction excavator rams and factory automation clamp cylinders.',
    faqs: [{ q: 'Why is pull force always lower than push force in double-acting cylinders?', a: 'The steel piston rod occupies cross-sectional area in the rod chamber, reducing effective pressure area ($A_{\text{pull}} = \frac{\pi}{4}(D^2 - d^2)$).' }]
  },

  // 24. RC Servo Motor PWM Pulse Width to Angle Calculator
  {
    slug: 'rc-servo-motor-pwm-pulse-width-duty-cycle-angle-calculator',
    name: 'RC Servo Motor PWM Pulse Width (1.0 - 2.0 ms) to Angle (0° - 180°) Calculator',
    description: 'Calculate standard hobby and robotic RC servo motor PWM high pulse duration in milliseconds (1.0 ms = 0°, 1.5 ms = 90° center, 2.0 ms = 180°), duty cycle percentage at 50 Hz, and angular position.',
    category: 'Science',
    icon: 'text',
    keywords: ['rc servo pulse width calculator', 'servo pwm duty cycle 50hz formula online', 'microsecond pulse width to servo angle calculator', 'arduino servo motor timer pwm calculator', 'robotics arduino mechatronics embedded electronics online'],
    order: 1333,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Desired Servo Angle θ (0° to 180°) or Pulse Width t_pulse (1000 to 2000 μs) at 50 Hz',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sv-angle">Target Angle θ (°)</label>
          <input class="tool-textarea" id="sv-angle" type="number" step="5" min="0" max="180" value="90.0" placeholder="90.0° (Center)" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sv-freq">PWM Frequency (Hz)</label>
          <input class="tool-textarea" id="sv-freq" type="number" step="10" value="50.0" placeholder="50.0 Hz (Standard 20ms Frame)" />
        </div>
      </div>
      <div id="sv-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sv-res-pulse" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">High Pulse = 1,500 μs (1.500 ms)</span>
            <span class="stat-label">Microsecond High Pulse Width (1000 μs + θ · 1000 μs / 180°)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sv-res-duty" style="color:var(--green-dark); font-weight:700;">PWM Duty Cycle = 7.50% (50 Hz / 20.0 ms Frame Period) | Exact Neutral Center</span>
            <span class="stat-label">Digital Timer PWM Duty Cycle & Frame Period</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const anEl = document.getElementById('sv-angle'), fqEl = document.getElementById('sv-freq');
  const plResEl = document.getElementById('sv-res-pulse'), dtResEl = document.getElementById('sv-res-duty');

  function update() {
    const angle_deg = parseFloat(anEl.value), freq_hz = parseFloat(fqEl.value);
    if (isNaN(angle_deg) || isNaN(freq_hz) || angle_deg < 0 || angle_deg > 180 || freq_hz <= 0) return;

    // Standard 1.0 ms (0 deg) to 2.0 ms (180 deg) pulse mapping:
    const pulse_width_ms = 1.0 + (angle_deg / 180.0) * 1.0;
    const pulse_width_us = pulse_width_ms * 1000.0;

    // Period T = 1 / freq_hz  [ms]
    const period_ms = (1.0 / freq_hz) * 1000.0;

    // Duty cycle percentage:
    const duty_cycle_pct = (pulse_width_ms / period_ms) * 100.0;

    plResEl.textContent = 'High Pulse = ' + Math.round(pulse_width_us).toLocaleString() + ' μs (' + pulse_width_ms.toFixed(3) + ' ms)';
    dtResEl.textContent = 'Duty Cycle = ' + duty_cycle_pct.toFixed(2) + '% (Period = ' + period_ms.toFixed(1) + ' ms @ ' + freq_hz + ' Hz | Angle = ' + angle_deg + '°)';
  }

  anEl.addEventListener('input', update);
  fqEl.addEventListener('input', update);
  update();
})();`,
    howToSteps: [
      'Enter desired RC servo horn angular position $\theta$ from $0^\circ$ to $180^\circ$.',
      'Enter standard PWM frame control frequency in Hz (typically 50 Hz / 20 ms period).',
      'Inspect required microsecond high pulse duration ($1000\ \mu\text{s}$ to $2000\ \mu\text{s}$) and timer duty cycle percentage.'
    ],
    benefitTitle: 'Standard RC Hobby Servo Protocol',
    benefitContent: 'Universal pulse-width-position encoding standard for hobby drones, RC airplanes, and robot steering grippers, decoding pulse width into proportional potentiometer feedback positions.',
    faqs: [{ q: 'Why is standard RC servo frequency 50 Hz?', a: 'A 50 Hz refresh rate ($20\text{ ms}$ period) allows ample quiet time after a $1\text{ to }2\text{ ms}$ pulse for analog integrator circuits to settle.' }]
  },

  // 25. Switched Reluctance Motor Step Angle & Torque Calculator
  {
    slug: 'switched-reluctance-motor-step-angle-torque-reluctance-calculator',
    name: 'Switched Reluctance Motor Step Angle & Reluctance Torque (T = ½·i²·dL/dθ) Calculator',
    description: 'Calculate Switched Reluctance Motor (SRM) fundamental step angle θ_s in degrees (θ_s = 360° / (m · N_r)), reluctance torque T in N·m (T = ½ · i² · dL/dθ), and stator/rotor pole configurations (e.g. 8/6 and 6/4).',
    category: 'Science',
    icon: 'text',
    keywords: ['switched reluctance motor calculator', 'srm step angle formula theta s online', 'reluctance torque half i squared dl over dtheta calculator', 'srm stator rotor pole configuration calculator', 'electric vehicle motor drives mechatronics electrical machines online'],
    order: 1334,
    schemaCategory: 'EducationalApplication',
    workspaceHeading: 'Number of Phases m, Rotor Poles N_r, Phase Current i (A) & Inductance Gradient dL/dθ (H/rad)',
    controlsHtml: `      <div class="control-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:1rem;">
        <div class="control-group">
          <label class="control-label" for="sr-m">Phases m</label>
          <select class="tool-textarea" id="sr-m">
            <option value="4" selected>4-Phase (8/6 SRM Configuration)</option>
            <option value="3">3-Phase (6/4 SRM Configuration)</option>
            <option value="5">5-Phase (10/8 SRM Configuration)</option>
          </select>
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-nr">Rotor Poles N_r</label>
          <input class="tool-textarea" id="sr-nr" type="number" step="2" value="6" placeholder="6 Rotor Teeth" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-i">Current i (A)</label>
          <input class="tool-textarea" id="sr-i" type="number" step="5" value="20.0" placeholder="20.0 A" />
        </div>
        <div class="control-group">
          <label class="control-label" for="sr-dldth">dL/dθ (H/rad)</label>
          <input class="tool-textarea" id="sr-dldth" type="number" step="0.01" value="0.080" placeholder="0.080 H/rad" />
        </div>
      </div>
      <div id="sr-res-card" style="margin-top:1.25rem;">
        <div class="stats-grid">
          <div class="stat">
            <span class="stat-value" id="sr-res-torque" style="color:var(--green-dark); font-weight:800; font-size:1.6rem;">Reluctance Torque T = 16.00 N·m</span>
            <span class="stat-label">Instantaneous Electromagnetic Reluctance Torque (T = ½ · i² · dL/dθ)</span>
          </div>
          <div class="stat">
            <span class="stat-value" id="sr-res-step" style="color:var(--green-dark); font-weight:700;">Step Angle θ_s = 15.0° (24 Strokes / Revolution) | Magnet-Free Robust Rotor ✓</span>
            <span class="stat-label">Commutation Stroke Step Angle (θ_s = 360° / (m · N_r))</span>
          </div>
        </div>
      </div>`,
    toolJsContent: `(() => {
  'use strict';
  const mEl = document.getElementById('sr-m'), nrEl = document.getElementById('sr-nr');
  const iEl = document.getElementById('sr-i'), dlEl = document.getElementById('sr-dldth');
  const tqResEl = document.getElementById('sr-res-torque'), stResEl = document.getElementById('sr-res-step');

  function update() {
    const m = parseInt(mEl.value, 10), N_r = parseInt(nrEl.value, 10);
    const i = parseFloat(iEl.value), dL_dth = parseFloat(dlEl.value);

    if (isNaN(m) || isNaN(N_r) || isNaN(i) || isNaN(dL_dth) || m <= 0 || N_r <= 0 || i < 0 || dL_dth < 0) return;

    // Reluctance torque: T = 0.5 * i^2 * (dL / dtheta)  [N*m]
    const torque = 0.5 * Math.pow(i, 2) * dL_dth;

    // Stroke step angle: theta_s = 360 / ( m * N_r )  [deg]
    const theta_s = 360.0 / (m * N_r);
    const strokes_per_rev = m * N_r;

    tqResEl.textContent = 'Reluctance Torque T = ' + torque.toFixed(2) + ' N·m';
    stResEl.textContent = 'Step Angle θ_s = ' + theta_s.toFixed(1) + '° (' + strokes_per_rev + ' Commutations/Rev | m=' + m + ' phases, N_r=' + N_r + ' poles)';
  }

  [mEl, nrEl, iEl, dlEl].forEach(el => el.addEventListener('input', update));
  mEl.addEventListener('change', update);
  update();
})();`,
    howToSteps: [
      'Select number of stator phase windings m (typically 3, 4, or 5 phases).',
      'Enter number of salient rotor steel teeth $N_r$ (e.g. 6 for an 8/6 motor).',
      'Enter phase winding excitation current i in Amperes.',
      'Enter phase inductance angular rate of change $dL/d\theta$ in Henries/radian.',
      'Inspect instantaneous reluctance torque in $\text{N}\cdot\text{m}$ and commutation step angle.'
    ],
    benefitTitle: 'Rare-Earth-Free Variable Reluctance Motor Drive',
    benefitContent: 'Operates purely on magnetic reluctance minimization without expensive permanent magnets (NdFeB), providing ultra-high temperature durability for electric vehicle drivetrains and aerospace turbine starter-generators.',
    faqs: [{ q: 'Why is reluctance torque independent of current direction?', a: 'Because torque is proportional to $i^2$ ($T \propto i^2$), current flowing in either direction produces positive forward motoring torque.' }]
  }
];

pack47Tools.forEach(createTool);
console.log('Pack 47 complete: ' + pack47Tools.length + ' tools created.');
