(() => {
  'use strict';
  const cEl = document.getElementById('mc-c'), phiEl = document.getElementById('mc-phi');
  const sgEl = document.getElementById('mc-sigma'), uEl = document.getElementById('mc-u');
  const tfResEl = document.getElementById('mc-res-tauf'), efResEl = document.getElementById('mc-res-eff');

  function update() {
    const c = parseFloat(cEl.value), phi_deg = parseFloat(phiEl.value);
    const sigma = parseFloat(sgEl.value), u = parseFloat(uEl.value);

    if (isNaN(c) || isNaN(phi_deg) || isNaN(sigma) || isNaN(u) || c < 0 || phi_deg < 0 || phi_deg >= 60 || sigma < 0) return;

    // Effective stress: sigma_prime = sigma - u
    const sigma_prime = Math.max(0.0, sigma - u);
    const phi_rad = (phi_deg * Math.PI) / 180.0;

    // Frictional strength component: sigma_prime * tan(phi)
    const tau_frictional = sigma_prime * Math.tan(phi_rad);

    // Total Mohr-Coulomb shear strength: tau_f = c + sigma_prime * tan(phi)
    const tau_f = c + tau_frictional;

    const pct_friction = tau_f > 0 ? (tau_frictional / tau_f) * 100.0 : 0;

    tfResEl.textContent = 'Shear Strength τ_f = ' + tau_f.toFixed(1) + ' kPa';
    efResEl.textContent = 'Effective σ' = ' + sigma_prime.toFixed(1) + ' kPa (σ-u) | Friction = ' + tau_frictional.toFixed(1) + ' kPa (' + pct_friction.toFixed(1) + '%) + Cohesion ' + c + ' kPa';
  }

  [cEl, phiEl, sgEl, uEl].forEach(el => el.addEventListener('input', update));
  update();
})();