(() => {
  'use strict';
  const sxEl = document.getElementById('mc-sx'), syEl = document.getElementById('mc-sy'), txyEl = document.getElementById('mc-txy');
  const p1ResEl = document.getElementById('mc-res-p1'), tauResEl = document.getElementById('mc-res-tau');

  function update() {
    const sx = parseFloat(sxEl.value), sy = parseFloat(syEl.value), txy = parseFloat(txyEl.value);
    if (isNaN(sx) || isNaN(sy) || isNaN(txy)) return;

    // Center of Mohr's circle: sigma_avg = (sx + sy) / 2
    const s_avg = (sx + sy) / 2.0;

    // Radius R = sqrt( ((sx - sy)/2)^2 + txy^2 ) = tau_max
    const R = Math.sqrt(Math.pow((sx - sy) / 2.0, 2) + Math.pow(txy, 2));

    // Principal stresses: sigma_1 = s_avg + R, sigma_2 = s_avg - R
    const s1 = s_avg + R;
    const s2 = s_avg - R;

    // Principal angle: tan(2 * theta_p) = (2 * txy) / (sx - sy)
    const theta_p_rad = 0.5 * Math.atan2(2.0 * txy, sx - sy);
    const theta_p_deg = (theta_p_rad * 180.0) / Math.PI;

    p1ResEl.textContent = 'σ₁ = ' + (s1 >= 0 ? '+' : '') + s1.toFixed(2) + ' MPa, σ₂ = ' + (s2 >= 0 ? '+' : '') + s2.toFixed(2) + ' MPa';
    tauResEl.textContent = 'Max Shear τ_max = ' + R.toFixed(2) + ' MPa | Principal Angle θ_p = ' + theta_p_deg.toFixed(2) + '° (Circle Center σ_avg = ' + s_avg.toFixed(1) + ' MPa)';
  }

  [sxEl, syEl, txyEl].forEach(el => el.addEventListener('input', update));
  update();
})();