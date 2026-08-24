(() => {
  'use strict';
  const aEl = document.getElementById('oct-a');
  const vEl = document.getElementById('oct-res-vol'), arEl = document.getElementById('oct-res-area'), cEl = document.getElementById('oct-res-circ');

  function update() {
    const a = parseFloat(aEl.value);
    if (isNaN(a) || a <= 0) return;

    // V = (1/3) * sqrt(2) * a^3
    const vol = (Math.sqrt(2) / 3) * Math.pow(a, 3);
    // A = 2 * sqrt(3) * a^2
    const area = 2 * Math.sqrt(3) * Math.pow(a, 2);
    // R = a / sqrt(2)
    const circum = a / Math.sqrt(2);

    vEl.textContent = vol.toFixed(2) + ' cu units';
    arEl.textContent = area.toFixed(2) + ' sq units';
    cEl.textContent = circum.toFixed(2) + ' units';
  }

  aEl.addEventListener('input', update);
  update();
})();