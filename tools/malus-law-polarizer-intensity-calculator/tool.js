(() => {
  'use strict';
  const i0El = document.getElementById('mal-i0'), angEl = document.getElementById('mal-angle');
  const iResEl = document.getElementById('mal-res-i'), extEl = document.getElementById('mal-res-ext');

  function update() {
    const i0 = parseFloat(i0El.value), deg = parseFloat(angEl.value);
    if (isNaN(i0) || isNaN(deg) || i0 < 0 || deg < 0 || deg > 180) return;

    const rad = (deg * Math.PI) / 180;
    // I = I0 * cos^2(theta)
    const I = i0 * Math.pow(Math.cos(rad), 2);
    const blocked = i0 - I;

    iResEl.textContent = I.toFixed(2) + ' units (' + ((I / i0) * 100).toFixed(1) + '%)';
    extEl.textContent = blocked.toFixed(2) + ' units (' + ((blocked / i0) * 100).toFixed(1) + '%)';
  }

  i0El.addEventListener('input', update);
  angEl.addEventListener('input', update);
  update();
})();