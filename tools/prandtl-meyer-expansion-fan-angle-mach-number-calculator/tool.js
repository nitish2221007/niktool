(() => {
  'use strict';
  const m1El = document.getElementById('pm-m1'), thEl = document.getElementById('pm-theta'), gmEl = document.getElementById('pm-gamma');
  const m2ResEl = document.getElementById('pm-res-m2'), anResEl = document.getElementById('pm-res-angles');

  function prandtl_meyer(M, gamma) {
    const term1 = Math.sqrt((gamma + 1.0) / (gamma - 1.0));
    const term2 = Math.sqrt(((gamma - 1.0) / (gamma + 1.0)) * (Math.pow(M, 2) - 1.0));
    const term3 = Math.sqrt(Math.pow(M, 2) - 1.0);
    const nu_rad = (term1 * Math.atan(term2)) - Math.atan(term3);
    return (nu_rad * 180.0) / Math.PI;
  }

  function update() {
    const M1 = parseFloat(m1El.value), theta_deg = parseFloat(thEl.value), gamma = parseFloat(gmEl.value);
    if (isNaN(M1) || isNaN(theta_deg) || isNaN(gamma) || M1 < 1.0 || theta_deg < 0 || gamma <= 1) return;

    const nu1_deg = prandtl_meyer(M1, gamma);
    const nu2_deg = nu1_deg + theta_deg;

    let M2 = M1;
    for (let m = M1; m <= 15.0; m += 0.01) {
      if (prandtl_meyer(m, gamma) >= nu2_deg) {
        M2 = m;
        break;
      }
    }

    const p1_p0 = Math.pow(1.0 + (0.5 * (gamma - 1.0) * Math.pow(M1, 2)), -gamma / (gamma - 1.0));
    const p2_p0 = Math.pow(1.0 + (0.5 * (gamma - 1.0) * Math.pow(M2, 2)), -gamma / (gamma - 1.0));
    const p2_p1 = p2_p0 / p1_p0;

    m2ResEl.textContent = 'Expanded Mach M₂ = ' + M2.toFixed(2) + ' (Accelerated Flow)';
    anResEl.textContent = 'ν(M₁) = ' + nu1_deg.toFixed(2) + '° → ν(M₂) = ' + nu2_deg.toFixed(2) + '° | Pressure p₂/p₁ = ' + p2_p1.toFixed(3) + '× (θ = ' + theta_deg + '°)';
  }

  [m1El, thEl, gmEl].forEach(el => el.addEventListener('input', update));
  update();
})();