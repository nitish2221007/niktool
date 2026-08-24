(() => {
  'use strict';
  const rfEl = document.getElementById('cpm-rf'), betaEl = document.getElementById('cpm-beta');
  const rmEl = document.getElementById('cpm-rm'), ractEl = document.getElementById('cpm-ract');
  const erResEl = document.getElementById('cpm-res-er'), aResEl = document.getElementById('cpm-res-alpha');

  function update() {
    const Rf = parseFloat(rfEl.value), beta = parseFloat(betaEl.value);
    const Rm = parseFloat(rmEl.value), Ract = parseFloat(ractEl.value);

    if (isNaN(Rf) || isNaN(beta) || isNaN(Rm) || isNaN(Ract)) return;

    // Market Risk Premium MRP = Rm - Rf
    const MRP = Rm - Rf;

    // CAPM Expected Return E(Ri) = Rf + beta * (Rm - Rf)  [%]
    const ER = Rf + (beta * MRP);

    // Jensen's Alpha = R_actual - E(Ri)
    const alpha = Ract - ER;

    erResEl.textContent = 'E(R) = ' + ER.toFixed(2) + '% (Market Premium: ' + MRP.toFixed(2) + '%)';

    let alphaText = '';
    let color = '#22543d';

    if (alpha > 0) {
      alphaText = 'Jensen's Alpha α = +' + alpha.toFixed(2) + '% (OUTPERFORMANCE: Beats Security Market Line by ' + alpha.toFixed(2) + '%)';
      color = '#22543d';
    } else if (alpha < 0) {
      alphaText = 'Jensen's Alpha α = ' + alpha.toFixed(2) + '% (UNDERPERFORMANCE: Fails to compensate for systematic risk β = ' + beta + ')';
      color = '#c53030';
    } else {
      alphaText = 'Jensen's Alpha α = 0.00% (Exactly on Security Market Line)';
      color = '#2563eb';
    }

    aResEl.textContent = alphaText;
    aResEl.style.color = color;
  }

  [rfEl, betaEl, rmEl, ractEl].forEach(el => el.addEventListener('input', update));
  update();
})();