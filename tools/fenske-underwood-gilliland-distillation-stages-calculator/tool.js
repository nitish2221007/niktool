(() => {
  'use strict';
  const xdEl = document.getElementById('fnk-xd'), xbEl = document.getElementById('fnk-xb');
  const aEl = document.getElementById('fnk-alpha'), xfEl = document.getElementById('fnk-xf');
  const nResEl = document.getElementById('fnk-res-nmin'), rResEl = document.getElementById('fnk-res-rmin');

  function update() {
    const xD = parseFloat(xdEl.value), xB = parseFloat(xbEl.value);
    const alpha = parseFloat(aEl.value), xF = parseFloat(xfEl.value);

    if (isNaN(xD) || isNaN(xB) || isNaN(alpha) || isNaN(xF) || xD <= xB || xD >= 1.0 || xB <= 0 || alpha <= 1.0 || xF <= 0 || xF >= 1.0) return;

    // Fenske equation: N_min = ln( (xD / (1 - xD)) / (xB / (1 - xB)) ) / ln(alpha)
    const topSep = xD / (1.0 - xD);
    const botSep = xB / (1.0 - xB);
    const N_min = Math.log(topSep / botSep) / Math.log(alpha);

    // Underwood minimum reflux ratio for saturated liquid feed (q=1):
    // R_min = ( 1 / (alpha - 1) ) * ( (xD / xF) - (alpha * (1 - xD) / (1 - xF)) )
    const R_min = (1.0 / (alpha - 1.0)) * ((xD / xF) - ((alpha * (1.0 - xD)) / (1.0 - xF)));

    // Standard commercial operating reflux R_op = 1.30 * R_min
    const R_op = Math.max(0.1, 1.30 * R_min);

    // Gilliland correlation for actual theoretical stages N_actual approx = 2 * N_min
    const N_actual = Math.ceil(N_min * 2.0);

    nResEl.textContent = 'N_min = ' + N_min.toFixed(2) + ' Stages (' + Math.ceil(N_min) + ' Trays @ Total Reflux)';
    rResEl.textContent = 'R_min = ' + R_min.toFixed(2) + ' | Operating R_op = ' + R_op.toFixed(2) + ' (1.3× R_min -> ~' + N_actual + ' Theoretical Trays)';
  }

  [xdEl, xbEl, aEl, xfEl].forEach(el => el.addEventListener('input', update));
  update();
})();