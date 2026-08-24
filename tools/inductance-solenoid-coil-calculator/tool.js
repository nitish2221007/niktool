(() => {
  'use strict';
  const nEl = document.getElementById('sol-n'), rEl = document.getElementById('sol-r');
  const lEl = document.getElementById('sol-l'), cEl = document.getElementById('sol-core');
  const lResEl = document.getElementById('sol-res-l'), tResEl = document.getElementById('sol-res-turns');

  const mu0 = 4 * Math.PI * 1e-7;

  function update() {
    const N = parseInt(nEl.value, 10), rMm = parseFloat(rEl.value);
    const lMm = parseFloat(lEl.value), muR = parseFloat(cEl.value);

    if (isNaN(N) || isNaN(rMm) || isNaN(lMm) || isNaN(muR) || N < 1 || rMm <= 0 || lMm <= 0 || muR < 1) return;

    const rM = rMm * 1e-3;
    const lM = lMm * 1e-3;
    const areaM2 = Math.PI * Math.pow(rM, 2);

    // L = (mu0 * muR * N^2 * A) / l
    const L = (mu0 * muR * Math.pow(N, 2) * areaM2) / lM;
    const lUh = L * 1e6;
    const lMh = L * 1e3;

    lResEl.textContent = lMh >= 1.0 ? lMh.toFixed(2) + ' mH' : lUh.toFixed(2) + ' μH';
    tResEl.textContent = Math.round(N / lM).toLocaleString() + ' turns/meter';
  }

  [nEl, rEl, lEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();