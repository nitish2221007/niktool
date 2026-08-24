(() => {
  'use strict';
  const rhoEl = document.getElementById('th-rho'), gEl = document.getElementById('th-g');
  const bEl = document.getElementById('th-b'), alEl = document.getElementById('th-alpha');
  const dtResEl = document.getElementById('th-res-dtau'), dsResEl = document.getElementById('th-res-dist');

  function update() {
    const rho = parseFloat(rhoEl.value), G_GPa = parseFloat(gEl.value);
    const b_nm = parseFloat(bEl.value), alpha = parseFloat(alEl.value);

    if (isNaN(rho) || isNaN(G_GPa) || isNaN(b_nm) || isNaN(alpha) || rho <= 0 || G_GPa <= 0 || b_nm <= 0 || alpha <= 0) return;

    const G_Pa = G_GPa * 1e9;
    const b_m = b_nm * 1e-9;

    // Taylor equation: Delta_tau = alpha * G * b * sqrt(rho)  [Pa -> MPa]
    const delta_tau_Pa = alpha * G_Pa * b_m * Math.sqrt(rho);
    const delta_tau_MPa = delta_tau_Pa / 1e6;

    // Dislocation spacing: l = 1 / sqrt(rho)  [m -> nm]
    const spacing_nm = (1.0 / Math.sqrt(rho)) * 1e9;

    // Polycrystalline tensile increase via Taylor factor M = 3.06 (FCC):
    const delta_sigma_MPa = 3.06 * delta_tau_MPa;

    dtResEl.textContent = 'Hardening Δτ = ' + delta_tau_MPa.toFixed(1) + ' MPa';
    dsResEl.textContent = 'Spacing l ≈ ' + spacing_nm.toFixed(1) + ' nm | Polycrystalline Δσ ≈ ' + delta_sigma_MPa.toFixed(1) + ' MPa (ρ = ' + rho.toExponential(1) + ' m⁻²)';
  }

  [rhoEl, gEl, bEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();