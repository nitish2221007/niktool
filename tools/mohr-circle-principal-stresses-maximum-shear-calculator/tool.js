(() => {
  'use strict';
  const sxEl = document.getElementById('mc-sx'), syEl = document.getElementById('mc-sy'), txyEl = document.getElementById('mc-txy');
  const p12ResEl = document.getElementById('mc-res-p12'), tuResEl = document.getElementById('mc-res-tau');

  function update() {
    const sx = parseFloat(sxEl.value), sy = parseFloat(syEl.value), txy = parseFloat(txyEl.value);
    if (isNaN(sx) || isNaN(sy) || isNaN(txy)) return;

    // Mohr's circle center: sigma_avg = (sx + sy) / 2
    const sigma_avg = (sx + sy) / 2.0;

    // Mohr's circle radius R = sqrt( ((sx - sy)/2)^2 + txy^2 )
    const R = Math.sqrt(Math.pow((sx - sy) / 2.0, 2) + Math.pow(txy, 2));

    // Principal stresses:
    const sigma_1 = sigma_avg + R;
    const sigma_2 = sigma_avg - R;

    // Maximum in-plane shear stress = R
    const tau_max = R;

    // Principal angle: 2*theta_p = atan2(2*txy, sx - sy)
    const two_theta_p_rad = Math.atan2(2.0 * txy, sx - sy);
    const theta_p_deg = ((two_theta_p_rad * 180.0) / Math.PI) / 2.0;

    p12ResEl.textContent = 'σ₁ = ' + (sigma_1 >= 0 ? '+' : '') + sigma_1.toFixed(1) + ' MPa | σ₂ = ' + (sigma_2 >= 0 ? '+' : '') + sigma_2.toFixed(1) + ' MPa';
    tuResEl.textContent = 'Max Shear τ_max = ' + tau_max.toFixed(1) + ' MPa (Radius R) | θ_p = ' + theta_p_deg.toFixed(1) + '° (Center σ_avg = ' + sigma_avg.toFixed(1) + ' MPa)';
  }

  [sxEl, syEl, txyEl].forEach(el => el.addEventListener('input', update));
  update();
})();