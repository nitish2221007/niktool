(() => {
  'use strict';
  const inEl = document.getElementById('lr-input');
  const eqEl = document.getElementById('lr-res-eq'), rEl = document.getElementById('lr-res-r'), r2El = document.getElementById('lr-res-r2');

  function update() {
    const raw = inEl.value.trim();
    if (!raw) return;

    const lines = raw.split('\n').map(l => l.trim()).filter(Boolean);
    const pts = [];
    for (const l of lines) {
      const parts = l.split(/[,\s\t]+/).map(Number);
      if (parts.length >= 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        pts.push({ x: parts[0], y: parts[1] });
      }
    }

    if (pts.length < 2) return;

    const n = pts.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
    for (const p of pts) {
      sumX += p.x; sumY += p.y;
      sumXY += p.x * p.y;
      sumX2 += p.x * p.x;
      sumY2 += p.y * p.y;
    }

    const denom = (n * sumX2 - sumX * sumX);
    if (denom === 0) return;

    const m = (n * sumXY - sumX * sumY) / denom;
    const c = (sumY - m * sumX) / n;

    const numR = (n * sumXY - sumX * sumY);
    const denomR = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    const r = denomR !== 0 ? numR / denomR : 1.0;
    const r2 = r * r;

    eqEl.textContent = 'y = ' + m.toFixed(2) + 'x ' + (c >= 0 ? '+ ' : '- ') + Math.abs(c).toFixed(2);
    rEl.textContent = 'r = ' + r.toFixed(3);
    r2El.textContent = 'R² = ' + r2.toFixed(3);
  }

  inEl.addEventListener('input', update);
  update();
})();