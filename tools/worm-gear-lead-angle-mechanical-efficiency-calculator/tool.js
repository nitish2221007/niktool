(() => {
  'use strict';
  const z1El = document.getElementById('wg-z1'), pxEl = document.getElementById('wg-px');
  const d1El = document.getElementById('wg-d1'), muEl = document.getElementById('wg-mu');
  const ldResEl = document.getElementById('wg-res-lead'), efResEl = document.getElementById('wg-res-eff');

  function update() {
    const z1 = parseInt(z1El.value, 10), px = parseFloat(pxEl.value);
    const d1 = parseFloat(d1El.value), mu = parseFloat(muEl.value);

    if (isNaN(z1) || isNaN(px) || isNaN(d1) || isNaN(mu) || z1 < 1 || px <= 0 || d1 <= 0 || mu <= 0) return;

    // Lead L = z1 * px
    const Lead = z1 * px;

    // Lead angle gamma: tan(gamma) = Lead / (pi * d1)
    const tan_gamma = Lead / (Math.PI * d1);
    const gamma_rad = Math.atan(tan_gamma);
    const gamma_deg = (gamma_rad * 180.0) / Math.PI;

    // Friction angle phi_v = atan(mu / cos(alpha_n)) where normal pressure angle alpha_n ~ 20 deg
    const alpha_n_rad = (20.0 * Math.PI) / 180.0;
    const mu_virtual = mu / Math.cos(alpha_n_rad);
    const phi_v_rad = Math.atan(mu_virtual);
    const phi_v_deg = (phi_v_rad * 180.0) / Math.PI;

    // Worm drive efficiency: eta = tan(gamma) / tan(gamma + phi_v)
    const eta = tan_gamma / Math.tan(gamma_rad + phi_v_rad);
    const eta_pct = Math.max(0, eta * 100.0);

    const isSelfLocking = gamma_deg <= phi_v_deg + 1.0;

    ldResEl.textContent = 'Lead Angle γ = ' + gamma_deg.toFixed(2) + '° (' + (isSelfLocking ? 'SELF-LOCKING' : 'BACKDRIVABLE') + ')';
    efResEl.textContent = 'Efficiency η = ' + eta_pct.toFixed(1) + '% (Friction Angle φ = ' + phi_v_deg.toFixed(2) + '° | ' + (isSelfLocking ? 'Secure hoist brake: Cannot backdrive' : 'Multi-start high efficiency') + ')';
  }

  [z1El, pxEl, d1El, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();