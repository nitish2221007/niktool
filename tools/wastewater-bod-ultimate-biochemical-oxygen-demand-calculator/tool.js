(() => {
  'use strict';
  const b5El = document.getElementById('bd-bod5'), kEl = document.getElementById('bd-k20'), tEl = document.getElementById('bd-temp');
  const buResEl = document.getElementById('bd-res-bodu'), rtResEl = document.getElementById('bd-res-rate');

  function update() {
    const BOD5 = parseFloat(b5El.value), k20 = parseFloat(kEl.value), T_C = parseFloat(tEl.value);
    if (isNaN(BOD5) || isNaN(k20) || isNaN(T_C) || BOD5 <= 0 || k20 <= 0) return;

    // Arrhenius temperature correction (theta = 1.047):
    const k_T = k20 * Math.pow(1.047, T_C - 20.0);

    // Fraction exerted in 5 days: frac = 1 - exp(-5 * k_T)
    const frac = 1.0 - Math.exp(-5.0 * k_T);

    // Ultimate BOD: BOD_u = BOD5 / frac
    const BOD_u = BOD5 / frac;

    buResEl.textContent = 'Ultimate BOD_u = ' + BOD_u.toFixed(1) + ' mg / L';
    rtResEl.textContent = 'k_T = ' + k_T.toFixed(3) + ' day⁻¹ @ ' + T_C + '°C | 5-day fraction = ' + (frac * 100).toFixed(1) + '% of Ultimate BOD';
  }

  [b5El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();