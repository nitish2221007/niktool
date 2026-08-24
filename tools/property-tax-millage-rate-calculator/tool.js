(() => {
  'use strict';
  const valEl = document.getElementById('pt-val'), millEl = document.getElementById('pt-mill');
  const aResEl = document.getElementById('pt-res-annual'), mResEl = document.getElementById('pt-res-month'), effEl = document.getElementById('pt-res-eff');

  function update() {
    const val = parseFloat(valEl.value), mills = parseFloat(millEl.value);
    if (isNaN(val) || isNaN(mills) || val <= 0 || mills <= 0) return;

    // 1 mill = $1 per $1,000 of assessed value = 0.001
    const annualTax = val * (mills / 1000);
    const monthlyEscrow = annualTax / 12;
    const effectivePct = (annualTax / val) * 100;

    aResEl.textContent = '$' + Math.round(annualTax).toLocaleString() + ' / yr';
    mResEl.textContent = '$' + monthlyEscrow.toFixed(2) + ' / mo';
    effEl.textContent = effectivePct.toFixed(2) + '%';
  }

  valEl.addEventListener('input', update);
  millEl.addEventListener('input', update);
  update();
})();