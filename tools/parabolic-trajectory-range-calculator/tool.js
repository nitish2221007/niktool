(() => {
  'use strict';
  const v0El = document.getElementById('ptr-v0'), angEl = document.getElementById('ptr-angle');
  const rEl = document.getElementById('ptr-res-range'), htEl = document.getElementById('ptr-res-hangtime');

  const g = 9.80665;

  function update() {
    const v0 = parseFloat(v0El.value), deg = parseFloat(angEl.value);
    if (isNaN(v0) || isNaN(deg) || v0 <= 0 || deg <= 0 || deg >= 90) return;

    const rad = (deg * Math.PI) / 180;
    // R = (v0^2 * sin(2*theta)) / g
    const range = (Math.pow(v0, 2) * Math.sin(2 * rad)) / g;
    // Total flight time T = 2 * v0 * sin(theta) / g
    const hangtime = (2 * v0 * Math.sin(rad)) / g;

    rEl.textContent = range.toFixed(2) + ' meters (' + (range * 1.09361).toFixed(1) + ' yards)';
    htEl.textContent = hangtime.toFixed(2) + ' seconds';
  }

  v0El.addEventListener('input', update);
  angEl.addEventListener('input', update);
  update();
})();