(() => {
  'use strict';
  const d1El = document.getElementById('rh-d1'), d2El = document.getElementById('rh-d2');
  const areaEl = document.getElementById('rh-res-area'), sideEl = document.getElementById('rh-res-side'), perEl = document.getElementById('rh-res-perim');

  function update() {
    const d1 = parseFloat(d1El.value), d2 = parseFloat(d2El.value);
    if (isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) return;

    const area = 0.5 * d1 * d2;
    // Side length by Pythagorean theorem on 4 right triangles: s = sqrt((d1/2)^2 + (d2/2)^2)
    const side = Math.sqrt(Math.pow(d1 / 2, 2) + Math.pow(d2 / 2, 2));
    const perim = 4 * side;

    areaEl.textContent = area.toFixed(2) + ' sq units';
    sideEl.textContent = side.toFixed(2) + ' units';
    perEl.textContent = perim.toFixed(2) + ' units';
  }

  d1El.addEventListener('input', update);
  d2El.addEventListener('input', update);
  update();
})();