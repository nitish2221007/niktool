(() => {
  'use strict';
  const absEl = document.getElementById('bf-abs'), mEl = document.getElementById('bf-m');
  const cEl = document.getElementById('bf-c'), dfEl = document.getElementById('bf-df');
  const ccResEl = document.getElementById('bf-res-conc'), wlResEl = document.getElementById('bf-res-well');

  function update() {
    const A = parseFloat(absEl.value), m = parseFloat(mEl.value);
    const c = parseFloat(cEl.value), DF = parseFloat(dfEl.value);

    if (isNaN(A) || isNaN(m) || isNaN(c) || isNaN(DF) || m <= 0 || DF <= 0 || A < c) return;

    // Linear curve: A = m * x + c => x = (A - c) / m  [ug / mL in assay well]
    const conc_well_ug_mL = (A - c) / m;

    // Stock concentration factoring in dilution:
    const conc_stock_ug_mL = conc_well_ug_mL * DF;
    const conc_stock_mg_mL = conc_stock_ug_mL / 1000.0;

    ccResEl.textContent = 'Protein Conc = ' + conc_stock_mg_mL.toFixed(2) + ' mg / mL (' + Math.round(conc_stock_ug_mL).toLocaleString() + ' μg/mL)';
    wlResEl.textContent = 'Well Conc = ' + conc_well_ug_mL.toFixed(1) + ' μg/mL (Stock: ' + conc_stock_mg_mL.toFixed(2) + ' mg/mL @ 1:' + DF + ' Dilution | Net OD: ' + (A - c).toFixed(3) + ')';
  }

  [absEl, mEl, cEl, dfEl].forEach(el => el.addEventListener('input', update));
  update();
})();