(() => {
  'use strict';
  const l0El = document.getElementById('lc-l0'), bEl = document.getElementById('lc-beta');
  const lResEl = document.getElementById('lc-res-l'), gResEl = document.getElementById('lc-res-gamma'), shResEl = document.getElementById('lc-res-shrink');

  function update() {
    const L0 = parseFloat(l0El.value), beta = parseFloat(bEl.value);
    if (isNaN(L0) || isNaN(beta) || L0 <= 0 || beta < 0 || beta >= 1.0) return;

    // Lorentz factor gamma = 1 / sqrt(1 - beta^2)
    const gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));
    // Contracted length L = L0 / gamma
    const L = L0 / gamma;
    const shrinkPct = ((L0 - L) / L0) * 100;

    lResEl.textContent = L.toFixed(2) + ' meters';
    gResEl.textContent = 'γ = ' + gamma.toFixed(3);
    shResEl.textContent = '-' + shrinkPct.toFixed(1) + '% Shorter';
  }

  l0El.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();