(() => {
  'use strict';
  const kEl = document.getElementById('cheb-k');
  const wEl = document.getElementById('cheb-res-within'), oEl = document.getElementById('cheb-res-outside');

  function update() {
    const k = parseFloat(kEl.value);
    if (isNaN(k) || k <= 1) {
      wEl.textContent = 'k must be > 1'; oEl.textContent = '-'; return;
    }

    // P(|X - mu| < k*sigma) >= 1 - (1 / k^2)
    const maxOut = (1 / Math.pow(k, 2));
    const minIn = 1 - maxOut;

    wEl.textContent = '≥ ' + (minIn * 100).toFixed(2) + '%';
    oEl.textContent = '≤ ' + (maxOut * 100).toFixed(2) + '%';
  }

  kEl.addEventListener('input', update);
  update();
})();