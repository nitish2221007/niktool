(() => {
  'use strict';
  const zEl = document.getElementById('cos-z'), h0El = document.getElementById('cos-h0');
  const scResEl = document.getElementById('cos-res-scale'), lkResEl = document.getElementById('cos-res-look');

  const age_universe_Gyr = 13.787; // Total age of Universe in Billion Years

  function update() {
    const z = parseFloat(zEl.value), H0 = parseFloat(h0El.value);
    if (isNaN(z) || isNaN(H0) || z < 0 || H0 <= 0) return;

    // Cosmic scale factor a(t) = 1 / (1 + z)
    const scale_factor = 1.0 / (1.0 + z);
    const sizeRatio = 1.0 + z;

    // Approximate lookback time integral for standard flat Lambda-CDM (Omega_M = 0.3, Omega_Lambda = 0.7):
    // t_lookback approx = t_age * ( 1 - (1 + z)^(-1.5) )
    const lookback_Gyr = age_universe_Gyr * (1.0 - Math.pow(1.0 + z, -1.35));
    const age_at_emission_Myr = Math.max(10, (age_universe_Gyr - lookback_Gyr) * 1000.0);

    scResEl.textContent = 'Scale a(t) = ' + scale_factor.toFixed(3) + ' (Universe was ' + sizeRatio.toFixed(1) + '× smaller)';
    lkResEl.textContent = 'Lookback Time: ' + lookback_Gyr.toFixed(2) + ' Billion Years (Emitted ~' + Math.round(age_at_emission_Myr) + ' Myr after Big Bang @ z = ' + z + ')';
  }

  zEl.addEventListener('input', update);
  h0El.addEventListener('input', update);
  update();
})();