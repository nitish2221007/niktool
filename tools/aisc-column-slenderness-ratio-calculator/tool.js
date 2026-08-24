(() => {
  'use strict';
  const kEl = document.getElementById('sr-k'), lEl = document.getElementById('sr-l'), rEl = document.getElementById('sr-r');
  const klrResEl = document.getElementById('sr-res-klr'), chResEl = document.getElementById('sr-res-check');

  function update() {
    const K = parseFloat(kEl.value), lM = parseFloat(lEl.value), rCm = parseFloat(rEl.value);
    if (isNaN(K) || isNaN(lM) || isNaN(rCm) || K <= 0 || lM <= 0 || rCm <= 0) return;

    const lMm = lM * 1000;
    const rMm = rCm * 10;

    // Slenderness ratio = (K * L) / r
    const klr = (K * lMm) / rMm;

    klrResEl.textContent = 'KL / r = ' + klr.toFixed(1);

    if (klr > 200) {
      chResEl.textContent = 'EXCEEDS AISC Limit! (KL/r > 200: Add intermediate lateral bracing)';
      chResEl.style.color = '#c53030';
    } else if (klr < 4.71 * Math.sqrt(200000 / 345)) { // ~113 for Gr 50 steel
      chResEl.textContent = 'Inelastic Buckling Regime (KL/r ≤ 113 for 50 ksi steel)';
      chResEl.style.color = '#22543d';
    } else {
      chResEl.textContent = 'Elastic Buckling Regime (113 < KL/r ≤ 200)';
      chResEl.style.color = '#2563eb';
    }
  }

  [kEl, lEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();