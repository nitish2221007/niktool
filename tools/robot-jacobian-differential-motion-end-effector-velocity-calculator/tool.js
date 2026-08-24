(() => {
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
})();