(() => {
  'use strict';
  const tcEl = document.getElementById('wb-tc'), hcEl = document.getElementById('wb-hc');
  const ttEl = document.getElementById('wb-tt'), htEl = document.getElementById('wb-ht');
  const fdResEl = document.getElementById('wb-res-fold'), rtResEl = document.getElementById('wb-res-ratio');

  function update() {
    const T_ctrl = parseFloat(tcEl.value), H_ctrl = parseFloat(hcEl.value);
    const T_trt = parseFloat(ttEl.value), H_trt = parseFloat(htEl.value);

    if (isNaN(T_ctrl) || isNaN(H_ctrl) || isNaN(T_trt) || isNaN(H_trt) || T_ctrl <= 0 || H_ctrl <= 0 || T_trt <= 0 || H_trt <= 0) return;

    // Normalized ratio control: R_ctrl = T_ctrl / H_ctrl
    const R_ctrl = T_ctrl / H_ctrl;
    // Normalized ratio treated: R_trt = T_trt / H_trt
    const R_trt = T_trt / H_trt;

    // Fold change: R_trt / R_ctrl
    const foldChange = R_trt / R_ctrl;
    const pctChange = (foldChange - 1.0) * 100.0;

    let status = '', color = '#22543d';
    if (foldChange > 1.2) { status = 'UPREGULATED'; color = '#22543d'; }
    else if (foldChange < 0.8) { status = 'DOWNREGULATED'; color = '#c53030'; }
    else { status = 'NO SIGNIFICANT CHANGE (0.8 - 1.2×)'; color = '#2563eb'; }

    fdResEl.textContent = 'Relative Expression = ' + foldChange.toFixed(2) + '-Fold (' + status + ')';
    fdResEl.style.color = color;
    rtResEl.textContent = 'Control Ratio = ' + R_ctrl.toFixed(3) + ' | Treated Ratio = ' + R_trt.toFixed(3) + ' (' + (pctChange >= 0 ? '+' : '') + pctChange.toFixed(1) + '% Change)';
  }

  [tcEl, hcEl, ttEl, htEl].forEach(el => el.addEventListener('input', update));
  update();
})();