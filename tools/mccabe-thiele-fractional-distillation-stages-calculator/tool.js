(() => {
  'use strict';
  const xdEl = document.getElementById('mt-xd'), xbEl = document.getElementById('mt-xb');
  const zfEl = document.getElementById('mt-zf'), rEl = document.getElementById('mt-r');
  const stResEl = document.getElementById('mt-res-stages'), rmResEl = document.getElementById('mt-res-rmin');

  function update() {
    const xD = parseFloat(xdEl.value), xB = parseFloat(xbEl.value);
    const zF = parseFloat(zfEl.value), R = parseFloat(rEl.value);

    if (isNaN(xD) || isNaN(xB) || isNaN(zF) || isNaN(R) || xD <= zF || zF <= xB || R <= 0) return;

    // Relative volatility alpha approx 2.5 (standard ethanol-water / benzene-toluene):
    const alpha = 2.5;

    // Minimum reflux ratio for saturated liquid feed (q=1):
    // y_pinch = alpha * zF / (1 + (alpha - 1)*zF)
    const y_pinch = (alpha * zF) / (1.0 + (alpha - 1.0) * zF);
    const R_min = (xD - y_pinch) / (y_pinch - zF);

    // Fenske minimum stages at total reflux: N_min = ln( (xD/(1-xD)) * ((1-xB)/xB) ) / ln(alpha)
    const N_min = Math.log( (xD / (1.0 - xD)) * ((1.0 - xB) / xB) ) / Math.log(alpha);

    // Gilliland correlation for theoretical stages N at actual reflux R:
    const X_gil = (R - R_min) / (R + 1.0);
    const Y_gil = X_gil > 0 ? 1.0 - Math.exp((1.0 + 54.4 * X_gil) / (11.0 + 117.2 * X_gil) * (X_gil - 1.0) / Math.sqrt(X_gil)) : 1.0;
    const N_stages = (N_min + Y_gil) / (1.0 - Y_gil);

    stResEl.textContent = 'Theoretical Stages N ≈ ' + (R > R_min ? N_stages.toFixed(1) : '∞ (R ≤ R_min)') + ' Stages';
    rmResEl.textContent = 'R_min = ' + R_min.toFixed(2) + ' | Operating R/R_min = ' + (R / R_min).toFixed(2) + '× (N_min = ' + N_min.toFixed(1) + ' trays @ total reflux)';
  }

  [xdEl, xbEl, zfEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();