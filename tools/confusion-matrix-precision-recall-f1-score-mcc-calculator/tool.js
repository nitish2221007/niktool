(() => {
  'use strict';
  const tpEl = document.getElementById('cm-tp'), fpEl = document.getElementById('cm-fp');
  const tnEl = document.getElementById('cm-tn'), fnEl = document.getElementById('cm-fn');
  const f1ResEl = document.getElementById('cm-res-f1'), allResEl = document.getElementById('cm-res-all');

  function update() {
    const TP = parseFloat(tpEl.value), FP = parseFloat(fpEl.value);
    const TN = parseFloat(tnEl.value), FN = parseFloat(fnEl.value);

    if (isNaN(TP) || isNaN(FP) || isNaN(TN) || isNaN(FN) || TP < 0 || FP < 0 || TN < 0 || FN < 0) return;

    const total = TP + FP + TN + FN;
    if (total === 0) return;

    const accuracy = (TP + TN) / total;
    const precision = (TP + FP) > 0 ? TP / (TP + FP) : 0;
    const recall = (TP + FN) > 0 ? TP / (TP + FN) : 0;
    const specificity = (TN + FP) > 0 ? TN / (TN + FP) : 0;

    // F1 Score = 2 * (Precision * Recall) / (Precision + Recall)
    const F1 = (precision + recall) > 0 ? (2.0 * precision * recall) / (precision + recall) : 0;

    // Matthews Correlation Coefficient (MCC) = (TP*TN - FP*FN) / sqrt((TP+FP)(TP+FN)(TN+FP)(TN+FN))
    const num_mcc = (TP * TN) - (FP * FN);
    const den_mcc = Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
    const MCC = den_mcc > 0 ? num_mcc / den_mcc : 0;

    f1ResEl.textContent = 'F1-Score = ' + F1.toFixed(3) + ' (' + (F1 * 100).toFixed(1) + '%)';
    allResEl.textContent = 'Acc = ' + (accuracy * 100).toFixed(1) + '% | Prec = ' + (precision * 100).toFixed(1) + '% | Rec = ' + (recall * 100).toFixed(1) + '% | Spec = ' + (specificity * 100).toFixed(1) + '% | MCC = ' + (MCC >= 0 ? '+' : '') + MCC.toFixed(3);
  }

  [tpEl, fpEl, tnEl, fnEl].forEach(el => el.addEventListener('input', update));
  update();
})();