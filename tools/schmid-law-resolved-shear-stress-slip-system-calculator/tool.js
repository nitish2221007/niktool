(() => {
  'use strict';
  const sEl = document.getElementById('sm-s'), phiEl = document.getElementById('sm-phi'), lmEl = document.getElementById('sm-lambda');
  const tuResEl = document.getElementById('sm-res-tau'), mResEl = document.getElementById('sm-res-m');

  function update() {
    const sigma = parseFloat(sEl.value), phi_deg = parseFloat(phiEl.value), lambda_deg = parseFloat(lmEl.value);
    if (isNaN(sigma) || isNaN(phi_deg) || isNaN(lambda_deg) || sigma < 0 || phi_deg < 0 || phi_deg > 90 || lambda_deg < 0 || lambda_deg > 90) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;
    const lambda_rad = (lambda_deg * Math.PI) / 180.0;

    // Schmid Factor m = cos(phi) * cos(lambda)
    const m = Math.cos(phi_rad) * Math.cos(lambda_rad);

    // Resolved shear stress: tau = sigma * m
    const tau = sigma * m;

    let orient = '';
    if (m >= 0.48) orient = 'MAXIMUM SLIP (m ≈ 0.50: Easiest dislocation glide)';
    else if (m >= 0.30) orient = 'MODERATE SLIP ORIENTATION';
    else if (m > 0.05) orient = 'HARD ORIENTATION (Requires high tensile stress to yield)';
    else orient = 'ZERO RESOLVED SHEAR (m ≈ 0: No dislocation slip occurs)';

    tuResEl.textContent = 'Resolved Shear τ = ' + tau.toFixed(1) + ' MPa';
    mResEl.textContent = 'Schmid Factor m = ' + m.toFixed(3) + ' (' + orient + ' @ φ=' + phi_deg + '°, λ=' + lambda_deg + '°)';
  }

  [sEl, phiEl, lmEl].forEach(el => el.addEventListener('input', update));
  update();
})();