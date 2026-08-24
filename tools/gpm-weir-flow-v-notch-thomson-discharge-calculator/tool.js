(() => {
  'use strict';
  const hEl = document.getElementById('wr-h'), thEl = document.getElementById('wr-th'), cdEl = document.getElementById('wr-cd');
  const fResEl = document.getElementById('wr-res-flow'), mResEl = document.getElementById('wr-res-m3h');

  const g = 9.80665;

  function update() {
    const H_cm = parseFloat(hEl.value), thDeg = parseFloat(thEl.value), Cd = parseFloat(cdEl.value);
    if (isNaN(H_cm) || isNaN(thDeg) || isNaN(Cd) || H_cm <= 0 || thDeg <= 0 || Cd <= 0) return;

    const H_m = H_cm / 100.0;
    const halfAngleRad = ((thDeg / 2.0) * Math.PI) / 180;

    // Thomson triangular weir formula: Q = (8 / 15) * Cd * sqrt(2*g) * tan(theta/2) * H^(5/2)  [m^3 / s]
    const Q_m3_s = (8.0 / 15.0) * Cd * Math.sqrt(2 * g) * Math.tan(halfAngleRad) * Math.pow(H_m, 2.5);

    const Q_lps = Q_m3_s * 1000.0;
    const Q_gpm = Q_lps * 15.8503;
    const Q_m3_h = Q_m3_s * 3600.0;

    fResEl.textContent = 'Q = ' + Q_lps.toFixed(2) + ' L / s (' + Q_gpm.toFixed(1) + ' GPM)';
    mResEl.textContent = 'Q = ' + Q_m3_h.toFixed(1) + ' m³/h (' + thDeg + '° V-Notch @ H = ' + H_cm + ' cm, C_d = ' + Cd + ')';
  }

  [hEl, cdEl].forEach(el => el.addEventListener('input', update));
  thEl.addEventListener('change', update);
  update();
})();