(() => {
  'use strict';
  const mEl = document.getElementById('cof-method'), wEl = document.getElementById('cof-water');
  const gEl = document.getElementById('cof-res-grounds'), rEl = document.getElementById('cof-res-ratio');

  function update() {
    const ratio = parseFloat(mEl.value);
    const water = parseFloat(wEl.value);
    if (isNaN(ratio) || isNaN(water) || ratio <= 0 || water <= 0) return;

    const grounds = water / ratio;
    gEl.textContent = grounds.toFixed(1) + ' grams';
    rEl.textContent = '1 : ' + ratio;
  }

  mEl.addEventListener('change', update);
  wEl.addEventListener('input', update);
  update();
})();