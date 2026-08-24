(() => {
  'use strict';
  const rEl = document.getElementById('ti-r'), rsiEl = document.getElementById('ti-rsi'), uEl = document.getElementById('ti-u');
  const dResEl = document.getElementById('ti-res-desc');

  function updateFromR(R) {
    if (R <= 0) return;
    // Metric RSI = R / 5.678263
    const rsi = R / 5.678263;
    // U = 1 / R
    const u = 1 / R;

    rsiEl.value = rsi.toFixed(2);
    uEl.value = u.toFixed(3);

    if (R < 10) dResEl.textContent = 'Single/Double Pane Window (R-1 to R-5)';
    else if (R < 16) dResEl.textContent = '2x4 Exterior Wall Cavity (R-13 to R-15)';
    else if (R < 25) dResEl.textContent = '2x6 Exterior Wall / Crawlspace (R-19 to R-21)';
    else if (R < 40) dResEl.textContent = 'Attic Ceiling Insulation (R-30 to R-38)';
    else dResEl.textContent = 'Cold Climate Super-Insulated Attic (R-49 to R-60)';
  }

  rEl.addEventListener('input', () => {
    const v = parseFloat(rEl.value);
    if (!isNaN(v) && v > 0) updateFromR(v);
  });

  rsiEl.addEventListener('input', () => {
    const v = parseFloat(rsiEl.value);
    if (!isNaN(v) && v > 0) {
      const R = v * 5.678263;
      rEl.value = R.toFixed(1);
      updateFromR(R);
    }
  });

  uEl.addEventListener('input', () => {
    const v = parseFloat(uEl.value);
    if (!isNaN(v) && v > 0) {
      const R = 1 / v;
      rEl.value = R.toFixed(1);
      updateFromR(R);
    }
  });

  updateFromR(13);
})();