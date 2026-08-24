(() => {
  'use strict';
  const rpEl = document.getElementById('trn-rp'), rfEl = document.getElementById('trn-rf'), bEl = document.getElementById('trn-beta');
  const rResEl = document.getElementById('trn-res-ratio'), exResEl = document.getElementById('trn-res-excess');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value), beta = parseFloat(bEl.value);
    if (isNaN(Rp) || isNaN(Rf) || isNaN(beta) || beta === 0) return;

    // Treynor Ratio = (Rp - Rf) / beta
    const excess = Rp - Rf;
    const treynor = excess / beta;

    rResEl.textContent = treynor.toFixed(2) + '% per Unit of Beta';
    exResEl.textContent = '+' + excess.toFixed(2) + '% Excess Return (β = ' + beta.toFixed(2) + ')';
  }

  [rpEl, rfEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();