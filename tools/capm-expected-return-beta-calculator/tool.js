(() => {
  'use strict';
  const rfEl = document.getElementById('cpm-rf'), bEl = document.getElementById('cpm-beta'), rmEl = document.getElementById('cpm-rm');
  const erResEl = document.getElementById('cpm-res-er'), mrpResEl = document.getElementById('cpm-res-mrp');

  function update() {
    const Rf = parseFloat(rfEl.value), beta = parseFloat(bEl.value), Rm = parseFloat(rmEl.value);
    if (isNaN(Rf) || isNaN(beta) || isNaN(Rm)) return;

    // Market Risk Premium MRP = Rm - Rf
    const mrp = Rm - Rf;
    // CAPM: E[R] = Rf + beta * (Rm - Rf)
    const expectedReturn = Rf + (beta * mrp);

    erResEl.textContent = expectedReturn.toFixed(2) + '% Expected Return';
    mrpResEl.textContent = mrp.toFixed(2) + '% Market Risk Premium (Equity Risk: ' + (beta * mrp).toFixed(2) + '%)';
  }

  [rfEl, bEl, rmEl].forEach(el => el.addEventListener('input', update));
  update();
})();