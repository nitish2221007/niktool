(() => {
  'use strict';
  const aEl = document.getElementById('dod-a');
  const vEl = document.getElementById('dod-res-vol'), arEl = document.getElementById('dod-res-area');

  function update() {
    const a = parseFloat(aEl.value);
    if (isNaN(a) || a <= 0) return;

    // V = (1/4) * (15 + 7 * sqrt(5)) * a^3
    const vol = 0.25 * (15 + 7 * Math.sqrt(5)) * Math.pow(a, 3);
    // A = 3 * sqrt(25 + 10 * sqrt(5)) * a^2
    const area = 3 * Math.sqrt(25 + 10 * Math.sqrt(5)) * Math.pow(a, 2);

    vEl.textContent = vol.toFixed(2) + ' cu units';
    arEl.textContent = area.toFixed(2) + ' sq units';
  }

  aEl.addEventListener('input', update);
  update();
})();