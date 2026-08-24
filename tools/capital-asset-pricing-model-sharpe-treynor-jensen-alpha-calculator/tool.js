(() => {
  'use strict';
  const rpEl = document.getElementById('cap-rp'), rfEl = document.getElementById('cap-rf');
  const rmEl = document.getElementById('cap-rm'), bEl = document.getElementById('cap-beta'), sdEl = document.getElementById('cap-sd');
  const alResEl = document.getElementById('cap-res-alpha'), rtResEl = document.getElementById('cap-res-ratios');

  function update() {
    const Rp = parseFloat(rpEl.value), Rf = parseFloat(rfEl.value);
    const Rm = parseFloat(rmEl.value), beta = parseFloat(bEl.value), sigma = parseFloat(sdEl.value);

    if (isNaN(Rp) || isNaN(Rf) || isNaN(Rm) || isNaN(beta) || isNaN(sigma) || sigma <= 0 || beta <= 0) return;

    // CAPM expected return: E(R) = Rf + beta * (Rm - Rf)
    const capm_expected = Rf + (beta * (Rm - Rf));

    // Jensen's Alpha: alpha = Rp - E(R)
    const alpha = Rp - capm_expected;

    // Sharpe Ratio = (Rp - Rf) / sigma
    const sharpe = (Rp - Rf) / sigma;

    // Treynor Ratio = (Rp - Rf) / beta
    const treynor = (Rp - Rf) / beta;

    alResEl.textContent = "Jensen's Alpha α = " + (alpha >= 0 ? '+' : '') + alpha.toFixed(2) + '%';
    alResEl.style.color = alpha >= 0 ? '#22543d' : '#c53030';
    rtResEl.textContent = 'Sharpe = ' + sharpe.toFixed(3) + ' | Treynor = ' + treynor.toFixed(2) + '% | CAPM Required Return = ' + capm_expected.toFixed(2) + '%';
  }

  [rpEl, rfEl, rmEl, bEl, sdEl].forEach(el => el.addEventListener('input', update));
  update();
})();