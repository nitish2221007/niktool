(() => {
  'use strict';
  const rpEl = document.getElementById('rt-rp'), rfEl = document.getElementById('rt-rf');
  const sigEl = document.getElementById('rt-sig'), dvolEl = document.getElementById('rt-dvol'), bEl = document.getElementById('rt-beta');
  const shResEl = document.getElementById('rt-res-shp'), trResEl = document.getElementById('rt-res-try');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value);
    const sigma = parseFloat(sigEl.value), sigmaDown = parseFloat(dvolEl.value), beta = parseFloat(bEl.value);

    if (isNaN(Rp) || isNaN(Rf) || isNaN(sigma) || isNaN(sigmaDown) || isNaN(beta) || sigma <= 0 || sigmaDown <= 0 || beta <= 0) return;

    const excessReturn = Rp - Rf;

    // Sharpe Ratio = (Rp - Rf) / sigma
    const sharpe = excessReturn / sigma;

    // Sortino Ratio = (Rp - Rf) / sigma_downside
    const sortino = excessReturn / sigmaDown;

    // Treynor Ratio = (Rp - Rf) / beta
    const treynor = excessReturn / beta;

    shResEl.textContent = 'Sharpe: ' + sharpe.toFixed(2) + ' | Sortino: ' + sortino.toFixed(2);
    trResEl.textContent = 'Treynor: ' + treynor.toFixed(2) + '% | Excess Return: +' + excessReturn.toFixed(1) + '% above R_f (Sortino/Sharpe Ratio: ' + (sortino/sharpe).toFixed(2) + '×)';
  }

  [rpEl, rfEl, sigEl, dvolEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();