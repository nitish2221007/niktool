(() => {
  'use strict';
  const tprEl = document.getElementById('rc-tpr'), fprEl = document.getElementById('rc-fpr');
  const aucResEl = document.getElementById('rc-res-auc'), ydResEl = document.getElementById('rc-res-youden');

  function update() {
    const TPR = parseFloat(tprEl.value), FPR = parseFloat(fprEl.value);
    if (isNaN(TPR) || isNaN(FPR) || TPR < 0 || TPR > 1 || FPR < 0 || FPR > 1) return;

    // Youden's J statistic = TPR - FPR
    const J = TPR - FPR;

    // Bi-trapezoidal AUC approximation through operating point (0,0) -> (FPR, TPR) -> (1,1):
    // AUC = 0.5 * FPR * TPR + 0.5 * (1 - FPR) * (1 + TPR)
    const AUC = 0.5 * (1.0 + TPR - FPR);

    // Diagnostic odds ratio: (TPR / (1 - TPR)) / (FPR / (1 - FPR))
    const DOR = (TPR > 0 && TPR < 1 && FPR > 0 && FPR < 1) ? (TPR / (1.0 - TPR)) / (FPR / (1.0 - FPR)) : 1.0;

    let qual = '', color = '#22543d';
    if (AUC >= 0.90) { qual = 'EXCELLENT CLASSIFIER (AUC 0.90 - 1.00)'; color = '#22543d'; }
    else if (AUC >= 0.80) { qual = 'GOOD DISCRIMINATION (AUC 0.80 - 0.89)'; color = '#22543d'; }
    else if (AUC >= 0.70) { qual = 'FAIR / MODERATE (AUC 0.70 - 0.79)'; color = '#ea580c'; }
    else if (AUC >= 0.50) { qual = 'POOR / RANDOM GUESS (AUC ~0.50)'; color = '#c53030'; }
    else { qual = 'INVERTED PREDICTION (AUC < 0.50)'; color = '#c53030'; }

    aucResEl.textContent = 'Estimated AUC = ' + AUC.toFixed(3) + ' (' + qual.split(' (')[0] + ')';
    aucResEl.style.color = color;
    ydResEl.textContent = 'Youden J = ' + J.toFixed(3) + ' | Diagnostic Odds Ratio = ' + (DOR >= 100 ? Math.round(DOR) : DOR.toFixed(1)) + ' (TPR = ' + TPR + ', FPR = ' + FPR + ')';
  }

  tprEl.addEventListener('input', update);
  fprEl.addEventListener('input', update);
  update();
})();