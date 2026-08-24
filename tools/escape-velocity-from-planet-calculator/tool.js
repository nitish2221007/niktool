(() => {
  'use strict';
  const preEl = document.getElementById('esc-preset'), rEl = document.getElementById('esc-r');
  const vescResEl = document.getElementById('esc-res-vesc'), vorbResEl = document.getElementById('esc-res-vorb'), gResEl = document.getElementById('esc-res-g');

  const GConst = 6.67430e-11; // m^3 / (kg * s^2)

  function update() {
    const [mKgStr, rKmStr] = preEl.value.split(',');
    const M = parseFloat(mKgStr);
    const rKm = parseFloat(rEl.value);
    if (isNaN(M) || isNaN(rKm) || M <= 0 || rKm <= 0) return;

    const rM = rKm * 1000;

    // v_esc = sqrt(2 * G * M / r) (m/s)
    const vEscMs = Math.sqrt((2 * GConst * M) / rM);
    const vEscKms = vEscMs / 1000;
    const vOrbKms = vEscKms / Math.SQRT2;

    // g = G * M / r^2 (m/s^2)
    const gVal = (GConst * M) / Math.pow(rM, 2);
    const gEarth = gVal / 9.80665;

    vescResEl.textContent = vEscKms.toFixed(3) + ' km / s (' + (vEscKms * 3600).toLocaleString() + ' km/h)';
    vorbResEl.textContent = vOrbKms.toFixed(3) + ' km / s (' + Math.round(vOrbKms * 1000) + ' m/s)';
    gResEl.textContent = 'g = ' + gVal.toFixed(2) + ' m/s² (' + gEarth.toFixed(2) + ' g)';
  }

  preEl.addEventListener('change', () => {
    const [, rKmStr] = preEl.value.split(',');
    rEl.value = rKmStr;
    update();
  });

  rEl.addEventListener('input', update);
  update();
})();