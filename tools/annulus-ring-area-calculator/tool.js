(() => {
  'use strict';
  const outEl = document.getElementById('an-r-out'), inEl = document.getElementById('an-r-in');
  const areaEl = document.getElementById('an-res-area'), wEl = document.getElementById('an-res-width');

  function update() {
    const R = parseFloat(outEl.value), r = parseFloat(inEl.value);
    if (isNaN(R) || isNaN(r) || R <= 0 || r <= 0 || R <= r) {
      areaEl.textContent = '-'; wEl.textContent = 'Outer R must exceed Inner r'; return;
    }

    const area = Math.PI * (Math.pow(R, 2) - Math.pow(r, 2));
    const width = R - r;

    areaEl.textContent = area.toFixed(2) + ' sq units';
    wEl.textContent = width.toFixed(2) + ' units';
  }

  outEl.addEventListener('input', update);
  inEl.addEventListener('input', update);
  update();
})();