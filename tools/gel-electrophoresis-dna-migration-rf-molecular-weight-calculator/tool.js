(() => {
  'use strict';
  const dbEl = document.getElementById('ge-dband'), dfEl = document.getElementById('ge-dfront');
  const mEl = document.getElementById('ge-m'), cEl = document.getElementById('ge-c');
  const bpResEl = document.getElementById('ge-res-bp'), rfResEl = document.getElementById('ge-res-rf');

  function update() {
    const d_band = parseFloat(dbEl.value), d_front = parseFloat(dfEl.value);
    const m = parseFloat(mEl.value), c = parseFloat(cEl.value);

    if (isNaN(d_band) || isNaN(d_front) || isNaN(m) || isNaN(c) || d_band <= 0 || d_front <= 0 || d_band > d_front) return;

    // R_f = d_band / d_front
    const R_f = d_band / d_front;

    // Semi-log relationship: log10(bp) = -m * R_f + c
    const log_bp = -(m * R_f) + c;
    const bp = Math.pow(10.0, log_bp);
    const kb = bp / 1000.0;

    bpResEl.textContent = 'Estimated Size = ' + Math.round(bp).toLocaleString() + ' bp (' + kb.toFixed(2) + ' kb)';
    rfResEl.textContent = 'Migration R_f = ' + R_f.toFixed(3) + ' | log₁₀(bp) = ' + log_bp.toFixed(3) + ' (Band: ' + d_band + ' mm / Front: ' + d_front + ' mm)';
  }

  [dbEl, dfEl, mEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();