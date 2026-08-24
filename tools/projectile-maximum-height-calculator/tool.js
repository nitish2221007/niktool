(() => {
  'use strict';
  const v0El = document.getElementById('pmh-v0'), angEl = document.getElementById('pmh-angle');
  const hEl = document.getElementById('pmh-res-h'), tEl = document.getElementById('pmh-res-time');

  const g = 9.80665;

  function update() {
    const v0 = parseFloat(v0El.value), deg = parseFloat(angEl.value);
    if (isNaN(v0) || isNaN(deg) || v0 <= 0 || deg <= 0 || deg > 90) return;

    const rad = (deg * Math.PI) / 180;
    const vy = v0 * Math.sin(rad);

    // H_max = vy^2 / (2 * g)
    const hMax = Math.pow(vy, 2) / (2 * g);
    // t_apex = vy / g
    const tApex = vy / g;

    hEl.textContent = hMax.toFixed(2) + ' meters (' + (hMax * 3.28084).toFixed(1) + ' feet)';
    tEl.textContent = tApex.toFixed(2) + ' seconds';
  }

  v0El.addEventListener('input', update);
  angEl.addEventListener('input', update);
  update();
})();