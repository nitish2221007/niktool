(() => {
  'use strict';
  const pEl = document.getElementById('tr-p'), thEl = document.getElementById('tr-th'), ryEl = document.getElementById('tr-ry');
  const dgResEl = document.getElementById('tr-res-diag'), chResEl = document.getElementById('tr-res-chord');

  function update() {
    const P = parseFloat(pEl.value), theta_deg = parseFloat(thEl.value), R_y = parseFloat(ryEl.value);
    if (isNaN(P) || isNaN(theta_deg) || isNaN(R_y) || theta_deg <= 0 || theta_deg >= 90) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const sin_th = Math.sin(theta_rad);
    const cos_th = Math.cos(theta_rad);

    // At support joint:
    // Sigma F_y = 0 => R_y - F_diag * sin(theta) = 0 => F_diag = R_y / sin(theta) [Compression]
    const F_diag = R_y / sin_th;

    // Sigma F_x = 0 => F_bottom - F_diag * cos(theta) = 0 => F_bottom = F_diag * cos(theta) = R_y / tan(theta) [Tension]
    const F_bottom = R_y / Math.tan(theta_rad);

    dgResEl.textContent = 'F_diag = ' + F_diag.toFixed(2) + ' kN (COMPRESSION)';
    chResEl.textContent = 'Bottom Tie F_bot = +' + F_bottom.toFixed(2) + ' kN (TENSION) | R_y = ' + R_y + ' kN @ θ = ' + theta_deg + '°';
  }

  [pEl, thEl, ryEl].forEach(el => el.addEventListener('input', update));
  update();
})();