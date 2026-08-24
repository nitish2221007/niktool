(() => {
  'use strict';
  const vEl = document.getElementById('dg-speed'), cdEl = document.getElementById('dg-cd'), aEl = document.getElementById('dg-area');
  const fEl = document.getElementById('dg-res-force'), pEl = document.getElementById('dg-res-power');

  const rho = 1.225; // Air density at sea level (kg/m^3)

  function update() {
    const vKmh = parseFloat(vEl.value), cd = parseFloat(cdEl.value), A = parseFloat(aEl.value);
    if (isNaN(vKmh) || isNaN(cd) || isNaN(A) || vKmh <= 0 || cd <= 0 || A <= 0) return;

    const vMs = vKmh / 3.6;
    // Fd = 0.5 * rho * v^2 * Cd * A
    const fd = 0.5 * rho * Math.pow(vMs, 2) * cd * A;
    // Power = Force * velocity = 0.5 * rho * v^3 * Cd * A
    const powerWatts = fd * vMs;
    const powerKw = powerWatts / 1000;
    const powerHp = powerWatts / 745.7;

    fEl.textContent = fd.toFixed(1) + ' N (Newtons)';
    pEl.textContent = powerKw.toFixed(2) + ' kW (' + powerHp.toFixed(1) + ' HP)';
  }

  [vEl, cdEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();