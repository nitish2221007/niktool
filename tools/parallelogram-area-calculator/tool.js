(() => {
  'use strict';
  const aEl = document.getElementById('pl-a'), bEl = document.getElementById('pl-b'), degEl = document.getElementById('pl-angle');
  const areaEl = document.getElementById('pl-res-area'), hEl = document.getElementById('pl-res-h'), perEl = document.getElementById('pl-res-perim');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value), deg = parseFloat(degEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(deg) || a <= 0 || b <= 0 || deg <= 0 || deg >= 180) return;

    const rad = (deg * Math.PI) / 180;
    const h = a * Math.sin(rad);
    const area = b * h;
    const perim = 2 * (a + b);

    areaEl.textContent = area.toFixed(2) + ' sq units';
    hEl.textContent = h.toFixed(2) + ' units';
    perEl.textContent = perim.toFixed(2) + ' units';
  }

  [aEl, bEl, degEl].forEach(el => el.addEventListener('input', update));
  update();
})();