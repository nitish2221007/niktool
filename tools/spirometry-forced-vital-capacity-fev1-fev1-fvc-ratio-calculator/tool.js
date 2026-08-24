(() => {
  'use strict';
  const fev1El = document.getElementById('sp-fev1'), fvcEl = document.getElementById('sp-fvc');
  const pfev1El = document.getElementById('sp-pfev1'), pfvcEl = document.getElementById('sp-pfvc');
  const rtResEl = document.getElementById('sp-res-ratio'), gdResEl = document.getElementById('sp-res-gold');

  function update() {
    const FEV1 = parseFloat(fev1El.value), FVC = parseFloat(fvcEl.value);
    const pred_FEV1 = parseFloat(pfev1El.value), pred_FVC = parseFloat(pfvcEl.value);

    if (isNaN(FEV1) || isNaN(FVC) || isNaN(pred_FEV1) || isNaN(pred_FVC) || FEV1 <= 0 || FVC <= 0 || pred_FEV1 <= 0 || pred_FVC <= 0) return;

    // FEV1 / FVC ratio percentage:
    const ratio_pct = (FEV1 / FVC) * 100.0;

    // Percent predicted values:
    const pct_pred_FEV1 = (FEV1 / pred_FEV1) * 100.0;
    const pct_pred_FVC = (FVC / pred_FVC) * 100.0;

    let diagnosis = '', gold_stage = '', color = '#22543d';

    if (ratio_pct < 70.0) {
      color = '#c53030';
      diagnosis = 'OBSTRUCTIVE VENTILATORY DEFECT (FEV₁/FVC < 70%)';
      if (pct_pred_FEV1 >= 80.0) gold_stage = 'GOLD 1: Mild Obstruction';
      else if (pct_pred_FEV1 >= 50.0) gold_stage = 'GOLD 2: Moderate Obstruction';
      else if (pct_pred_FEV1 >= 30.0) gold_stage = 'GOLD 3: Severe Obstruction';
      else gold_stage = 'GOLD 4: Very Severe Obstruction';
    } else {
      if (pct_pred_FVC < 80.0) {
        color = '#ea580c';
        diagnosis = 'SUGGESTIVE OF RESTRICTIVE PATTERN (Normal ratio, reduced FVC < 80% - Confirm with Plethysmography TLC)';
        gold_stage = 'Restrictive Pattern Suspicion';
      } else {
        color = '#22543d';
        diagnosis = 'NORMAL PULMONARY SPIROMETRY';
        gold_stage = 'Normal Lung Function';
      }
    }

    rtResEl.textContent = 'FEV₁ / FVC = ' + ratio_pct.toFixed(1) + '% (' + diagnosis + ')';
    rtResEl.style.color = color;
    gdResEl.textContent = gold_stage + ' | FEV₁ = ' + pct_pred_FEV1.toFixed(1) + '% Predicted | FVC = ' + pct_pred_FVC.toFixed(1) + '% Predicted';
  }

  [fev1El, fvcEl, pfev1El, pfvcEl].forEach(el => el.addEventListener('input', update));
  update();
})();