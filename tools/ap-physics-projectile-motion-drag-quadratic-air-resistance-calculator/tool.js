(() => {
  'use strict';
  const v0El = document.getElementById('proj-v0'), thEl = document.getElementById('proj-th'), mEl = document.getElementById('proj-mass');
  const rngResEl = document.getElementById('proj-res-range'), vacResEl = document.getElementById('proj-res-vac');

  const g = 9.80665;

  function update() {
    const v0 = parseFloat(v0El.value), thetaDeg = parseFloat(thEl.value), mass = parseFloat(mEl.value);
    if (isNaN(v0) || isNaN(thetaDeg) || isNaN(mass) || v0 <= 0 || thetaDeg <= 0 || thetaDeg >= 90 || mass <= 0) return;

    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Ideal vacuum projectile:
    // Range = v0^2 * sin(2*theta) / g
    const range_vac = (Math.pow(v0, 2) * Math.sin(2.0 * thetaRad)) / g;
    // Apex = (v0 * sin(theta))^2 / (2*g)
    const apex_vac = Math.pow(v0 * Math.sin(thetaRad), 2) / (2.0 * g);
    // Time of flight = 2 * v0 * sin(theta) / g
    const tof_vac = (2.0 * v0 * Math.sin(thetaRad)) / g;

    // Numerical integration with quadratic drag (Cd = 0.3, Area = 0.0042 m^2 for baseball):
    const rho = 1.225; // kg/m^3
    const Cd = 0.30;
    const Area = 0.0042;
    const dragConst = 0.5 * Cd * rho * Area / mass;

    let x = 0, y = 0;
    let vx = v0 * Math.cos(thetaRad);
    let vy = v0 * Math.sin(thetaRad);
    let dt = 0.005;
    let apex_drag = 0;

    while (y >= 0 && x < 2000) {
      const v_mag = Math.sqrt(vx*vx + vy*vy);
      const ax = -dragConst * v_mag * vx;
      const ay = -g - (dragConst * v_mag * vy);

      vx += ax * dt;
      vy += ay * dt;
      x += vx * dt;
      y += vy * dt;

      if (y > apex_drag) apex_drag = y;
    }

    const range_drag = x;
    const reduction_pct = ((range_vac - range_drag) / range_vac) * 100.0;

    rngResEl.textContent = 'Range = ' + range_drag.toFixed(1) + ' m (Drag Trajectory)';
    vacResEl.textContent = 'Vacuum: ' + range_vac.toFixed(1) + ' m (Drag reduces range by ' + reduction_pct.toFixed(1) + '%) | Apex: ' + apex_drag.toFixed(1) + ' m (Vacuum: ' + apex_vac.toFixed(1) + ' m)';
  }

  [v0El, thEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();