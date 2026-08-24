(() => {
  'use strict';
  const eEl = document.getElementById('sp-e'), nEl = document.getElementById('sp-n');
  const dResEl = document.getElementById('sp-res-desc'), vsResEl = document.getElementById('sp-res-vs');

  function updateFromE(e) {
    if (isNaN(e) || e <= 0) return;

    // n = e / (1 + e)
    const n = e / (1 + e);
    const nPct = n * 100;
    nEl.value = nPct.toFixed(1);

    vsResEl.textContent = ((1 - n) * 100).toFixed(1) + '% Solids Fraction';

    if (e < 0.4) dResEl.textContent = 'Dense Well-Graded Gravel / Till (e < 0.4)';
    else if (e < 0.7) dResEl.textContent = 'Medium Sand / Sandy Gravel (e = 0.4 - 0.7)';
    else if (e < 1.1) dResEl.textContent = 'Loose Sand / Silty Clay (e = 0.7 - 1.1)';
    else dResEl.textContent = 'Soft Organic Clay / Peat (e > 1.1: High Settlement)';
  }

  eEl.addEventListener('input', () => {
    const v = parseFloat(eEl.value);
    if (!isNaN(v) && v > 0) updateFromE(v);
  });

  nEl.addEventListener('input', () => {
    const nPct = parseFloat(nEl.value);
    if (!isNaN(nPct) && nPct > 0 && nPct < 100) {
      const n = nPct / 100;
      const e = n / (1 - n);
      eEl.value = e.toFixed(3);
      updateFromE(e);
    }
  });

  updateFromE(0.65);
})();