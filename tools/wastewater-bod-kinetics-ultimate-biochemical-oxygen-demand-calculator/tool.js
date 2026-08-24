(() => {
  'use strict';
  const b5El = document.getElementById('bd-bod5'), k20El = document.getElementById('bd-k20'), tEl = document.getElementById('bd-temp');
  const buResEl = document.getElementById('bd-res-bodu'), frResEl = document.getElementById('bd-res-frac');

  function update() {
    const BOD5 = parseFloat(b5El.value), k20 = parseFloat(k20El.value), temp_C = parseFloat(tEl.value);
    if (isNaN(BOD5) || isNaN(k20) || isNaN(temp_C) || BOD5 <= 0 || k20 <= 0) return;

    // Temperature adjustment for deoxygenation rate constant: k_T = k20 * theta^(T - 20)
    // theta = 1.047 for T = 20-30°C, 1.135 for T = 4-20°C
    const theta = temp_C >= 20.0 ? 1.047 : 1.135;
    const k_T = k20 * Math.pow(theta, temp_C - 20.0);

    // BOD_t = BOD_u * ( 1 - exp(-k * t) ) => BOD_u = BOD5 / ( 1 - exp(-5 * k_T) )
    const exertion5 = 1.0 - Math.exp(-5.0 * k_T);
    const BOD_u = BOD5 / exertion5;
    const exertionPct = exertion5 * 100.0;

    buResEl.textContent = 'Ultimate BOD_u = ' + BOD_u.toFixed(1) + ' mg / L';
    frResEl.textContent = '5-Day Exertion = ' + exertionPct.toFixed(1) + '% (k_T = ' + k_T.toFixed(3) + ' day⁻¹ @ ' + temp_C + '°C | Raw BOD₅: ' + BOD5 + ' mg/L)';
  }

  [b5El, k20El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();