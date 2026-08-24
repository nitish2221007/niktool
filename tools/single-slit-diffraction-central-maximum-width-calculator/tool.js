(() => {
  'use strict';
  const lamEl = document.getElementById('ss-lam'), aEl = document.getElementById('ss-a'), lEl = document.getElementById('ss-l');
  const wResEl = document.getElementById('ss-res-width'), agResEl = document.getElementById('ss-res-ang');

  function update() {
    const lambda_nm = parseFloat(lamEl.value), a_um = parseFloat(aEl.value), L_m = parseFloat(lEl.value);
    if (isNaN(lambda_nm) || isNaN(a_um) || isNaN(L_m) || lambda_nm <= 0 || a_um <= 0 || L_m <= 0) return;

    const lambda_m = lambda_nm * 1e-9;
    const a_m = a_um * 1e-6;

    // First minimum angle: sin(theta) = lambda / a
    const sin_theta = lambda_m / a_m;
    const theta_rad = Math.asin(Math.min(1.0, sin_theta));
    const theta_deg = (theta_rad * 180.0) / Math.PI;

    // Linear central width on screen: W = 2 * L * tan(theta) approx 2 * lambda * L / a
    const W_m = 2.0 * L_m * Math.tan(theta_rad);
    const W_mm = W_m * 1000.0;

    wResEl.textContent = 'Central Width W = ' + W_mm.toFixed(2) + ' mm';
    agResEl.textContent = '1st Minima θ₁ = ' + theta_deg.toFixed(3) + '° (' + (theta_rad * 1000).toFixed(2) + ' mrad | Slit a = ' + a_um + ' μm @ L = ' + L_m + ' m)';
  }

  [lamEl, aEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();