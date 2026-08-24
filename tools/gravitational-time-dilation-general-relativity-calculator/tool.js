(() => {
  'use strict';
  const mEl = document.getElementById('gtd-mass'), rEl = document.getElementById('gtd-r');
  const ratResEl = document.getElementById('gtd-res-ratio'), losResEl = document.getElementById('gtd-res-loss');

  function update() {
    const mSolar = parseFloat(mEl.value), rKm = parseFloat(rEl.value);
    if (isNaN(mSolar) || isNaN(rKm) || mSolar <= 0 || rKm <= 0) return;

    // Schwarzschild radius R_s = 2.95325 * M_solar (km)
    const rsKm = 2.95325 * mSolar;

    if (rKm <= rsKm) {
      ratResEl.textContent = 'Inside Event Horizon (r ≤ R_s)';
      losResEl.textContent = 'Time stops at the horizon (t_local -> 0)';
      return;
    }

    // Time dilation factor = sqrt( 1 - Rs / r )
    const factor = Math.sqrt(1 - (rsKm / rKm));
    const spaceHoursPerLocalHour = 1 / factor;
    const microsecondsPerDay = (1 - factor) * 86400 * 1e6;

    ratResEl.textContent = factor.toFixed(5) + ' (' + (factor * 100).toFixed(2) + '% of Deep Space Clock Speed)';

    if (factor < 0.9999) {
      losResEl.textContent = '1 Hour Local = ' + spaceHoursPerLocalHour.toFixed(3) + ' Hours in Deep Space';
    } else {
      losResEl.textContent = 'Clocks run slower by ' + microsecondsPerDay.toFixed(1) + ' μs/day (GPS Precision Scale)';
    }
  }

  mEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();