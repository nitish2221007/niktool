(() => {
  'use strict';
  const lamEl = document.getElementById('yd-lam'), dEl = document.getElementById('yd-d'), lEl = document.getElementById('yd-l');
  const btResEl = document.getElementById('yd-res-beta'), posResEl = document.getElementById('yd-res-pos');

  function update() {
    const lambda_nm = parseFloat(lamEl.value), d_mm = parseFloat(dEl.value), L_m = parseFloat(lEl.value);
    if (isNaN(lambda_nm) || isNaN(d_mm) || isNaN(L_m) || lambda_nm <= 0 || d_mm <= 0 || L_m <= 0) return;

    const lambda_m = lambda_nm * 1e-9;
    const d_m = d_mm * 1e-3;

    // Fringe width beta = ( lambda * L ) / d  [meters]
    const beta_m = (lambda_m * L_m) / d_m;
    const beta_mm = beta_m * 1000.0;

    const y1 = beta_mm;
    const y2 = 2.0 * beta_mm;
    const y_dark1 = 0.5 * beta_mm;

    btResEl.textContent = 'Fringe Width β = ' + beta_mm.toFixed(2) + ' mm';
    posResEl.textContent = '1st Max y₁ = ' + y1.toFixed(2) + ' mm | 2nd Max y₂ = ' + y2.toFixed(2) + ' mm | 1st Dark Min = ' + y_dark1.toFixed(2) + ' mm (λ = ' + lambda_nm + ' nm @ d = ' + d_mm + ' mm)';
  }

  [lamEl, dEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();