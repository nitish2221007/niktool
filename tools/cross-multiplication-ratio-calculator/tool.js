(() => {
  'use strict';
  const aEl = document.getElementById('cm-a'), bEl = document.getElementById('cm-b'), cEl = document.getElementById('cm-c');
  const xEl = document.getElementById('cm-x'), resVal = document.getElementById('cm-res-val');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value), c = parseFloat(cEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(c) || a === 0) {
      xEl.value = '?'; resVal.textContent = '-'; return;
    }

    // A / B = C / X => X = (B * C) / A
    const x = (b * c) / a;
    xEl.value = Number.isInteger(x) ? x.toString() : x.toFixed(3);
    resVal.textContent = 'X = ' + (Number.isInteger(x) ? x : x.toFixed(3));
  }

  [aEl, bEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();