(() => {
  'use strict';
  const xEl = document.getElementById('ik-x'), yEl = document.getElementById('ik-y');
  const l1El = document.getElementById('ik-l1'), l2El = document.getElementById('ik-l2');
  const aResEl = document.getElementById('ik-res-angles'), altResEl = document.getElementById('ik-res-alt');

  function update() {
    const x = parseFloat(xEl.value), y = parseFloat(yEl.value);
    const l1 = parseFloat(l1El.value), l2 = parseFloat(l2El.value);

    if (isNaN(x) || isNaN(y) || isNaN(l1) || isNaN(l2) || l1 <= 0 || l2 <= 0) return;

    const r_sq = Math.pow(x, 2) + Math.pow(y, 2);
    const r = Math.sqrt(r_sq);
    const maxReach = l1 + l2;
    const minReach = Math.abs(l1 - l2);

    if (r > maxReach || r < minReach) {
      aResEl.textContent = 'Target Outside Robot Workspace!';
      altResEl.textContent = 'Target Distance r = ' + r.toFixed(1) + ' mm (Allowed Workspace Range: ' + minReach.toFixed(1) + ' mm to ' + maxReach.toFixed(1) + ' mm)';
      aResEl.style.color = '#c53030';
      return;
    }
    aResEl.style.color = '#22543d';

    // Law of Cosines for theta2:
    // cos(theta2) = (x^2 + y^2 - l1^2 - l2^2) / (2 * l1 * l2)
    const cos_th2 = (r_sq - Math.pow(l1, 2) - Math.pow(l2, 2)) / (2 * l1 * l2);
    const th2_down_rad = Math.acos(Math.max(-1.0, Math.min(1.0, cos_th2)));
    const th2_up_rad = -th2_down_rad;

    // theta1 = atan2(y, x) - atan2( l2*sin(theta2), l1 + l2*cos(theta2) )
    const th1_down_rad = Math.atan2(y, x) - Math.atan2(l2 * Math.sin(th2_down_rad), l1 + (l2 * Math.cos(th2_down_rad)));
    const th1_up_rad = Math.atan2(y, x) - Math.atan2(l2 * Math.sin(th2_up_rad), l1 + (l2 * Math.cos(th2_up_rad)));

    const th1_down_deg = (th1_down_rad * 180) / Math.PI;
    const th2_down_deg = (th2_down_rad * 180) / Math.PI;
    const th1_up_deg = (th1_up_rad * 180) / Math.PI;
    const th2_up_deg = (th2_up_rad * 180) / Math.PI;

    aResEl.textContent = 'Elbow-Down: θ₁ = ' + (th1_down_deg >= 0 ? '+' : '') + th1_down_deg.toFixed(1) + '°, θ₂ = ' + (th2_down_deg >= 0 ? '+' : '') + th2_down_deg.toFixed(1) + '°';
    altResEl.textContent = 'Elbow-Up: θ₁ = ' + (th1_up_deg >= 0 ? '+' : '') + th1_up_deg.toFixed(1) + '°, θ₂ = ' + (th2_up_deg >= 0 ? '+' : '') + th2_up_deg.toFixed(1) + '° (Reach: ' + r.toFixed(1) + ' mm / ' + maxReach + ' mm)';
  }

  [xEl, yEl, l1El, l2El].forEach(el => el.addEventListener('input', update));
  update();
})();