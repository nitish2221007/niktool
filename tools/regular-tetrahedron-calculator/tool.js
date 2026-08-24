(() => {
  'use strict';
  const aEl = document.getElementById('tet-a');
  const vEl = document.getElementById('tet-res-vol'), arEl = document.getElementById('tet-res-area'), hEl = document.getElementById('tet-res-h');

  function update() {
    const a = parseFloat(aEl.value);
    if (isNaN(a) || a <= 0) return;

    // V = a^3 / (6 * sqrt(2))
    const vol = Math.pow(a, 3) / (6 * Math.sqrt(2));
    // A = sqrt(3) * a^2
    const area = Math.sqrt(3) * Math.pow(a, 2);
    // Height H = sqrt(2/3) * a
    const height = Math.sqrt(2/3) * a;

    vEl.textContent = vol.toFixed(2) + ' cu units';
    arEl.textContent = area.toFixed(2) + ' sq units';
    hEl.textContent = height.toFixed(2) + ' units';
  }

  aEl.addEventListener('input', update);
  update();
})();