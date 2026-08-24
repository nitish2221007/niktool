(() => {
  'use strict';
  const gEl = document.getElementById('sal-gross'), tEl = document.getElementById('sal-tax-pct'), dEl = document.getElementById('sal-deduct');
  const mNet = document.getElementById('sal-res-month-net'), aNet = document.getElementById('sal-res-annual-net'), aTax = document.getElementById('sal-res-tax-paid');

  function update() {
    const gross = parseFloat(gEl.value);
    const taxPct = parseFloat(tEl.value) / 100;
    const moDeduct = parseFloat(dEl.value) || 0;

    if (isNaN(gross) || isNaN(taxPct) || gross <= 0 || taxPct < 0) return;

    const annualTax = gross * taxPct;
    const annualDeduct = moDeduct * 12;
    const annualNet = Math.max(0, gross - annualTax - annualDeduct);
    const monthlyNet = annualNet / 12;

    mNet.textContent = '$' + Math.round(monthlyNet).toLocaleString() + ' / mo';
    aNet.textContent = '$' + Math.round(annualNet).toLocaleString() + ' / yr';
    aTax.textContent = '$' + Math.round(annualTax).toLocaleString() + ' / yr';
  }

  [gEl, tEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();