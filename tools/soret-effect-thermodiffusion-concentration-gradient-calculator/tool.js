(() => {
  'use strict';
  const cEl = document.getElementById('se-c'), gtEl = document.getElementById('se-gradt'), stEl = document.getElementById('se-st');
  const gcResEl = document.getElementById('se-res-gradc'), thResEl = document.getElementById('se-res-therm');

  function update() {
    const C = parseFloat(cEl.value), gradT_K_mm = parseFloat(gtEl.value), S_T = parseFloat(stEl.value);
    if (isNaN(C) || isNaN(gradT_K_mm) || isNaN(S_T) || C <= 0 || C >= 1) return;

    // grad C per mm = - S_T * C * (1 - C) * gradT_K_mm
    const gradC_per_mm = -S_T * C * (1.0 - C) * gradT_K_mm;
    const gradC_pct_mm = gradC_per_mm * 100.0;

    let dir = '';
    if (S_T > 0) dir = 'THERMOPHOBIC: Solute migrates toward the COLD boundary';
    else if (S_T < 0) dir = 'THERMOPHILIC: Solute migrates toward the HOT boundary';
    else dir = 'NO THERMAL DIFFUSION (S_T = 0)';

    gcResEl.textContent = '∇C = ' + (gradC_pct_mm >= 0 ? '+' : '') + gradC_pct_mm.toFixed(2) + ' % / mm';
    thResEl.textContent = dir + ' [S_T = ' + S_T + ' K⁻¹ @ ∇T = ' + gradT_K_mm + ' K/mm]';
  }

  [cEl, gtEl, stEl].forEach(el => el.addEventListener('input', update));
  update();
})();