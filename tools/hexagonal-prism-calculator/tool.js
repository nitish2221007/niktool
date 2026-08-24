(() => {
  'use strict';
  const aEl = document.getElementById('hp-a'), hEl = document.getElementById('hp-h');
  const vEl = document.getElementById('hp-res-vol'), bEl = document.getElementById('hp-res-base'), aTotEl = document.getElementById('hp-res-tot-area');

  function update() {
    const a = parseFloat(aEl.value), h = parseFloat(hEl.value);
    if (isNaN(a) || isNaN(h) || a <= 0 || h <= 0) return;

    // Base area = (3 * sqrt(3) / 2) * a^2
    const baseArea = (1.5 * Math.sqrt(3)) * Math.pow(a, 2);
    const vol = baseArea * h;
    const lateralArea = 6 * a * h;
    const totalArea = 2 * baseArea + lateralArea;

    vEl.textContent = vol.toFixed(2) + ' cu units';
    bEl.textContent = baseArea.toFixed(2) + ' sq units';
    aTotEl.textContent = totalArea.toFixed(2) + ' sq units';
  }

  aEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();