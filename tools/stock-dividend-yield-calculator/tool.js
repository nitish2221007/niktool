(() => {
  'use strict';
  const pEl = document.getElementById('div-price'), dpsEl = document.getElementById('div-dps'), sEl = document.getElementById('div-shares');
  const yEl = document.getElementById('div-res-yield'), aEl = document.getElementById('div-res-annual-inc'), qEl = document.getElementById('div-res-quarterly');

  function update() {
    const price = parseFloat(pEl.value), dps = parseFloat(dpsEl.value), shares = parseFloat(sEl.value);
    if (isNaN(price) || isNaN(dps) || isNaN(shares) || price <= 0 || dps < 0 || shares <= 0) return;

    const yieldPct = (dps / price) * 100;
    const annualIncome = dps * shares;
    const quarterly = annualIncome / 4;

    yEl.textContent = yieldPct.toFixed(2) + '%';
    aEl.textContent = '$' + Math.round(annualIncome).toLocaleString() + ' / yr';
    qEl.textContent = '$' + Math.round(quarterly).toLocaleString() + ' / quarter';
  }

  pEl.addEventListener('input', update);
  dpsEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();