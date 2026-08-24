(() => {
  'use strict';
  const alEl = document.getElementById('fn-alpha'), xdEl = document.getElementById('fn-xd'), xbEl = document.getElementById('fn-xb');
  const nmResEl = document.getElementById('fn-res-nmin'), spResEl = document.getElementById('fn-res-sep');

  function update() {
    const alpha = parseFloat(alEl.value), x_D = parseFloat(xdEl.value), x_B = parseFloat(xbEl.value);
    if (isNaN(alpha) || isNaN(x_D) || isNaN(x_B) || alpha <= 1 || x_D <= x_B || x_D >= 1 || x_B <= 0) return;

    // Separation factor S = ( x_D / (1 - x_D) ) / ( x_B / (1 - x_B) )
    const topRatio = x_D / (1.0 - x_D);
    const bottomRatio = x_B / (1.0 - x_B);
    const S = topRatio / bottomRatio;

    // Fenske equation: N_min = ln(S) / ln(alpha)
    const N_min = Math.log(S) / Math.log(alpha);
    const practicalTrays = Math.round(N_min * 2.0);

    nmResEl.textContent = 'N_min = ' + N_min.toFixed(2) + ' Stages (~' + Math.ceil(N_min) + ' Trays)';
    spResEl.textContent = 'Separation Factor S = ' + S.toFixed(1) + ' | Practical Column: ~' + practicalTrays + ' Trays @ R = 1.3·R_min (α = ' + alpha + ')';
  }

  [alEl, xdEl, xbEl].forEach(el => el.addEventListener('input', update));
  update();
})();