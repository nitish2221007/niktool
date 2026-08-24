(() => {
  'use strict';
  const caEl = document.getElementById('ca-meas'), albEl = document.getElementById('ca-alb');
  const crResEl = document.getElementById('ca-res-corr'), stResEl = document.getElementById('ca-res-stat');

  function update() {
    const Ca = parseFloat(caEl.value), Alb = parseFloat(albEl.value);
    if (isNaN(Ca) || isNaN(Alb) || Ca <= 0 || Alb <= 0) return;

    // Payne Formula: Ca_corr = Ca_meas + 0.8 * (4.0 - Albumin)  [mg / dL]
    const Ca_corr_mg = Ca + 0.8 * (4.0 - Alb);
    const Ca_corr_mmol = Ca_corr_mg * 0.2495;

    let status = '', color = '#22543d';
    if (Ca_corr_mg >= 8.5 && Ca_corr_mg <= 10.5) {
      status = 'EUCALCEMIC / NORMAL (8.5 - 10.5 mg/dL: Ionized calcium is physiologic)';
      color = '#22543d';
    } else if (Ca_corr_mg < 8.5) {
      status = 'TRUE HYPOCALCEMIA (< 8.5 mg/dL: Check PTH, Vitamin D, Magnesium)';
      color = '#c53030';
    } else {
      status = 'HYPERCALCEMIA (> 10.5 mg/dL: Hyperparathyroidism / Malignancy workup)';
      color = '#ea580c';
    }

    crResEl.textContent = 'Corrected Ca = ' + Ca_corr_mg.toFixed(2) + ' mg / dL (' + Ca_corr_mmol.toFixed(2) + ' mmol/L)';
    crResEl.style.color = color;
    stResEl.textContent = status + ' [Measured Ca: ' + Ca + ' mg/dL @ Albumin: ' + Alb + ' g/dL]';
    stResEl.style.color = color;
  }

  caEl.addEventListener('input', update);
  albEl.addEventListener('input', update);
  update();
})();