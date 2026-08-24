(() => {
  'use strict';
  const aEl = document.getElementById('bf-abs'), mEl = document.getElementById('bf-slope');
  const bEl = document.getElementById('bf-int'), dEl = document.getElementById('bf-dil');
  const cResEl = document.getElementById('bf-res-conc'), cvResEl = document.getElementById('bf-res-cuv');

  function update() {
    const A = parseFloat(aEl.value), slope = parseFloat(mEl.value);
    const intercept = parseFloat(bEl.value), dilution = parseFloat(dEl.value) || 1;

    if (isNaN(A) || isNaN(slope) || isNaN(intercept) || slope <= 0 || dilution <= 0) return;

    // Concentration in cuvette: c_cuvette = ( A - intercept ) / slope  [ug / mL]
    const c_cuvette = Math.max(0, (A - intercept) / slope);
    // Stock concentration = c_cuvette * dilution
    const c_stock_ug_ml = c_cuvette * dilution;
    const c_stock_mg_ml = c_stock_ug_ml / 1000.0;

    const netA = Math.max(0, A - intercept);

    cResEl.textContent = 'Protein = ' + Math.round(c_stock_ug_ml).toLocaleString() + ' μg/mL (' + c_stock_mg_ml.toFixed(2) + ' mg/mL)';
    cvResEl.textContent = 'Assay Well: ' + c_cuvette.toFixed(1) + ' μg/mL (Net ΔA = ' + netA.toFixed(3) + ' | Dilution: ' + dilution + '×)';
  }

  [aEl, mEl, bEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();