(() => {
  'use strict';
  const inEl = document.getElementById('rmse-input');
  const rmseEl = document.getElementById('rmse-res-val'), maeEl = document.getElementById('rmse-res-mae'), mseEl = document.getElementById('rmse-res-mse');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
    const pairs = [];
    for (const l of lines) {
      const parts = l.split(/[,\s\t]+/).map(Number);
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        pairs.push({ actual: parts[0], pred: parts[1] });
      }
    }

    if (pairs.length < 1) return;

    const n = pairs.length;
    let sumSqErr = 0;
    let sumAbsErr = 0;

    for (const p of pairs) {
      const err = p.pred - p.actual;
      sumSqErr += Math.pow(err, 2);
      sumAbsErr += Math.abs(err);
    }

    const mse = sumSqErr / n;
    const rmse = Math.sqrt(mse);
    const mae = sumAbsErr / n;

    rmseEl.textContent = rmse.toFixed(3);
    maeEl.textContent = mae.toFixed(3);
    mseEl.textContent = mse.toFixed(3);
  }

  inEl.addEventListener('input', update);
  update();
})();