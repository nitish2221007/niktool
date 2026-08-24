(() => {
  'use strict';
  const aEl = document.getElementById('inf-amount'), rEl = document.getElementById('inf-rate'), yEl = document.getElementById('inf-years');
  const realEl = document.getElementById('inf-res-real'), lossEl = document.getElementById('inf-res-loss');

  function update() {
    const amount = parseFloat(aEl.value), ratePct = parseFloat(rEl.value), years = parseFloat(yEl.value);
    if (isNaN(amount) || isNaN(ratePct) || isNaN(years) || amount <= 0 || ratePct < 0 || years <= 0) return;

    // Real Value = Nominal / (1 + r)^n
    const r = ratePct / 100;
    const realValue = amount / Math.pow(1 + r, years);
    const lossPct = ((amount - realValue) / amount) * 100;

    realEl.textContent = '$' + Math.round(realValue).toLocaleString();
    lossEl.textContent = '-' + lossPct.toFixed(2) + '% Lost to Inflation';
  }

  [aEl, rEl, yEl].forEach(el => el.addEventListener('input', update));
  update();
})();