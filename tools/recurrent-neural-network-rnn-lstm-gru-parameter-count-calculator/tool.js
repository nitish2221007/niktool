(() => {
  'use strict';
  const dxEl = document.getElementById('rn-dx'), dhEl = document.getElementById('rn-dh'), arEl = document.getElementById('rn-arch');
  const prResEl = document.getElementById('rn-res-param'), gtResEl = document.getElementById('rn-res-gate');

  function update() {
    const d_x = parseFloat(dxEl.value), d_h = parseFloat(dhEl.value);
    const parts = arEl.value.split('_');
    const gates = parseInt(parts[0], 10);
    const archName = parts[1].toUpperCase();

    if (isNaN(d_x) || isNaN(d_h) || d_x <= 0 || d_h <= 0) return;

    // Single gate parameters = ( d_h * d_x ) + ( d_h * d_h ) + d_h (bias) = d_h * (d_x + d_h + 1)
    const perGate = d_h * (d_x + d_h + 1.0);
    const totalParams = gates * perGate;

    // Memory in MB assuming FP32 (4 bytes per parameter):
    const memoryMB = (totalParams * 4.0) / (1024.0 * 1024.0);

    prResEl.textContent = archName + ' Parameters = ' + totalParams.toLocaleString() + ' (' + (totalParams/1e6).toFixed(2) + 'M)';
    gtResEl.textContent = 'Per Gate = ' + perGate.toLocaleString() + ' Weights | Memory = ' + memoryMB.toFixed(2) + ' MB (FP32 @ d_x=' + d_x + ', d_h=' + d_h + ')';
  }

  [dxEl, dhEl].forEach(el => el.addEventListener('input', update));
  arEl.addEventListener('change', update);
  update();
})();