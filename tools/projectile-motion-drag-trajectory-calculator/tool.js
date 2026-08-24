(() => {
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
})();