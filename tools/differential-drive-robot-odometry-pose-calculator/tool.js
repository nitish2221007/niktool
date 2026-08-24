(() => {
  'use strict';
  const slEl = document.getElementById('odo-sl'), srEl = document.getElementById('odo-sr');
  const trkEl = document.getElementById('odo-track'), th0El = document.getElementById('odo-th0');
  const posResEl = document.getElementById('odo-res-pose'), thResEl = document.getElementById('odo-res-th');

  function update() {
    const sL = parseFloat(slEl.value), sR = parseFloat(srEl.value);
    const L = parseFloat(trkEl.value), th0Deg = parseFloat(th0El.value);

    if (isNaN(sL) || isNaN(sR) || isNaN(L) || isNaN(th0Deg) || L <= 0) return;

    const th0Rad = (th0Deg * Math.PI) / 180;

    // Linear center displacement delta_s = (sR + sL) / 2  [meters]
    const delta_s = (sR + sL) / 2;

    // Angular yaw rotation delta_theta = (sR - sL) / L  [radians]
    const delta_theta = (sR - sL) / L;
    const delta_theta_deg = (delta_theta * 180) / Math.PI;

    // Exact Runge-Kutta / midpoint integration:
    // delta_x = delta_s * cos(theta0 + delta_theta / 2)
    // delta_y = delta_s * sin(theta0 + delta_theta / 2)
    const midTheta = th0Rad + (delta_theta / 2);
    const delta_x = delta_s * Math.cos(midTheta);
    const delta_y = delta_s * Math.sin(midTheta);

    const finalThetaDeg = ((th0Deg + delta_theta_deg + 360) % 360);

    // Turn radius R = (L/2) * (sR + sL) / (sR - sL)
    const turnRadiusM = Math.abs(delta_theta) > 1e-4 ? delta_s / delta_theta : 999.9;

    posResEl.textContent = 'Δx: ' + (delta_x >= 0 ? '+' : '') + delta_x.toFixed(3) + ' m | Δy: ' + (delta_y >= 0 ? '+' : '') + delta_y.toFixed(3) + ' m';
    thResEl.textContent = 'Final Heading θ = ' + finalThetaDeg.toFixed(1) + '° (Yaw: ' + (delta_theta_deg >= 0 ? '+' : '') + delta_theta_deg.toFixed(2) + '° | Turn Radius R = ' + (turnRadiusM > 500 ? 'Straight' : turnRadiusM.toFixed(2) + ' m) )';
  }

  [slEl, srEl, trkEl, th0El].forEach(el => el.addEventListener('input', update));
  update();
})();