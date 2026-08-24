(() => {
  'use strict';
  const lEl = document.getElementById('pen-len'), gEl = document.getElementById('pen-g');
  const tEl = document.getElementById('pen-res-period'), fEl = document.getElementById('pen-res-freq'), hEl = document.getElementById('pen-res-half');

  function update() {
    const L = parseFloat(lEl.value), g = parseFloat(gEl.value);
    if (isNaN(L) || isNaN(g) || L <= 0 || g <= 0) return;

    // T = 2 * pi * sqrt(L / g)
    const T = 2 * Math.PI * Math.sqrt(L / g);
    const freq = 1 / T;

    tEl.textContent = T.toFixed(3) + ' s';
    fEl.textContent = freq.toFixed(3) + ' Hz';
    hEl.textContent = (T / 2).toFixed(3) + ' s';
  }

  lEl.addEventListener('input', update);
  gEl.addEventListener('input', update);
  update();
})();