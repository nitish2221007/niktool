(() => {
  'use strict';
  const spl1El = document.getElementById('sd-spl1'), d1El = document.getElementById('sd-d1'), d2El = document.getElementById('sd-d2');
  const spl2ResEl = document.getElementById('sd-res-spl2'), lossResEl = document.getElementById('sd-res-loss');

  function update() {
    const spl1 = parseFloat(spl1El.value), d1 = parseFloat(d1El.value), d2 = parseFloat(d2El.value);
    if (isNaN(spl1) || isNaN(d1) || isNaN(d2) || d1 <= 0 || d2 <= 0) return;

    // SPL2 = SPL1 - 20 * log10(d2 / d1)
    const dbLoss = 20 * Math.log10(d2 / d1);
    const spl2 = spl1 - dbLoss;

    spl2ResEl.textContent = spl2.toFixed(1) + ' dB SPL';
    lossResEl.textContent = '-' + dbLoss.toFixed(2) + ' dB (' + (d2 / d1).toFixed(1) + 'x Distance Factor)';
  }

  [spl1El, d1El, d2El].forEach(el => el.addEventListener('input', update));
  update();
})();