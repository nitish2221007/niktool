(() => {
  'use strict';
  const pEl = document.getElementById('wst-p'), zEl = document.getElementById('wst-z'), rEl = document.getElementById('wst-r');
  const sigResEl = document.getElementById('wst-res-sig'), cmpResEl = document.getElementById('wst-res-cmp');

  function update() {
    const P = parseFloat(pEl.value), z = parseFloat(zEl.value), r = parseFloat(rEl.value);
    if (isNaN(P) || isNaN(z) || isNaN(r) || P <= 0 || z <= 0 || r < 0) return;

    // Westergaard formula for layered soil with zero lateral strain:
    // sigma_z = (P / z^2) * (1 / (2*pi)) * ( 1 / [ 1 + 2*(r/z)^2 ]^(1.5) )  [kPa]
    const r_z_sq = Math.pow(r / z, 2);
    const wst_term = Math.pow(1.0 + (2.0 * r_z_sq), 1.5);
    const sigma_z_wst = (P / Math.pow(z, 2)) * (1.0 / (2.0 * Math.PI)) * (1.0 / wst_term);

    // Boussinesq formula for comparison (isotropic elastic half-space):
    // sigma_z = (3*P / (2*pi*z^2)) * ( 1 / [ 1 + (r/z)^2 ]^(2.5) )
    const bsq_term = Math.pow(1.0 + r_z_sq, 2.5);
    const sigma_z_bsq = ((3.0 * P) / (2.0 * Math.PI * Math.pow(z, 2))) * (1.0 / bsq_term);

    sigResEl.textContent = 'σ_z = ' + sigma_z_wst.toFixed(1) + ' kPa Vertical Stress';
    cmpResEl.textContent = 'Westergaard: ' + sigma_z_wst.toFixed(1) + ' kPa vs Boussinesq: ' + sigma_z_bsq.toFixed(1) + ' kPa @ z = ' + z + ' m, r = ' + r + ' m (P = ' + P + ' kN)';
  }

  [pEl, zEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();