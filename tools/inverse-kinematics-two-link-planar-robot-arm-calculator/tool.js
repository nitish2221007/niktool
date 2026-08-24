(() => {
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
})();