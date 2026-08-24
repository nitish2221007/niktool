(() => {
  'use strict';
  const mEl = document.getElementById('ml-mass');
  const lResEl = document.getElementById('ml-res-lum'), lfResEl = document.getElementById('ml-res-life');

  const L_sun_watts = 3.828e26;

  function update() {
    const M = parseFloat(mEl.value);
    if (isNaN(M) || M <= 0) return;

    // Piecewise standard Mass-Luminosity exponent alpha:
    let alpha = 3.5;
    if (M < 0.43) alpha = 2.3;
    else if (M < 2.0) alpha = 4.0;
    else if (M < 20.0) alpha = 3.5;
    else alpha = 1.0; // very massive Eddington radiation pressure limit

    const L_ratio = Math.pow(M, alpha);
    const L_watts = L_ratio * L_sun_watts;

    // Main sequence lifetime: t_ms = 10 Gyr * (M / L) = 10 Gyr * M / M^alpha = 10 * M^(1 - alpha)
    const t_ms_Gyr = 10.0 * (M / L_ratio);
    const t_ms_Myr = t_ms_Gyr * 1000.0;

    let timeStr = '';
    if (t_ms_Gyr >= 1.0) timeStr = t_ms_Gyr.toFixed(2) + ' Billion Years (Gyr)';
    else timeStr = t_ms_Myr.toFixed(1) + ' Million Years (Myr)';

    lResEl.textContent = 'Luminosity L = ' + (L_ratio >= 1000 ? L_ratio.toExponential(2) : L_ratio.toFixed(2)) + ' L_sun (' + L_watts.toExponential(2) + ' W)';
    lfResEl.textContent = 'Lifespan t_ms = ' + timeStr + ' (Mass: ' + M + ' M_sun | Scaling: L ∝ M^' + alpha + ')';
  }

  mEl.addEventListener('input', update);
  update();
})();