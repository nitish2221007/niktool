(() => {
  'use strict';
  const m1El = document.getElementById('ob-m1'), thEl = document.getElementById('ob-theta'), gmEl = document.getElementById('ob-gamma');
  const btResEl = document.getElementById('ob-res-beta'), psResEl = document.getElementById('ob-res-post');

  function update() {
    const M1 = parseFloat(m1El.value), theta_deg = parseFloat(thEl.value), gamma = parseFloat(gmEl.value);
    if (isNaN(M1) || isNaN(theta_deg) || isNaN(gamma) || M1 <= 1 || theta_deg <= 0 || gamma <= 1) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const mu_mach_rad = Math.asin(1.0 / M1);

    let beta_weak = 0, found = false;
    for (let b_deg = (mu_mach_rad * 180 / Math.PI) + 0.1; b_deg <= 89.9; b_deg += 0.05) {
      const b_rad = (b_deg * Math.PI) / 180.0;
      const num = 2.0 * (1.0 / Math.tan(b_rad)) * (Math.pow(M1, 2) * Math.pow(Math.sin(b_rad), 2) - 1.0);
      const den = Math.pow(M1, 2) * (gamma + Math.cos(2.0 * b_rad)) + 2.0;
      const tan_theta_calc = num / den;

      if (tan_theta_calc >= Math.tan(theta_rad)) {
        beta_weak = b_deg;
        found = true;
        break;
      }
    }

    if (!found) {
      btResEl.textContent = 'DETACHED BOW SHOCK (θ > θ_max)';
      btResEl.style.color = '#c53030';
      psResEl.textContent = 'Wedge angle ' + theta_deg + '° exceeds maximum attachment angle for M₁=' + M1 + ' (Strong curved detached shock forms)';
      return;
    }

    const beta_rad = (beta_weak * Math.PI) / 180.0;
    const M1n = M1 * Math.sin(beta_rad);
    const p2_p1 = 1.0 + ((2.0 * gamma / (gamma + 1.0)) * (Math.pow(M1n, 2) - 1.0));
    const M2n_sq = (Math.pow(M1n, 2) + (2.0 / (gamma - 1.0))) / (((2.0 * gamma / (gamma - 1.0)) * Math.pow(M1n, 2)) - 1.0);
    const M2 = Math.sqrt(M2n_sq) / Math.sin(beta_rad - theta_rad);

    btResEl.textContent = 'Shock Angle β = ' + beta_weak.toFixed(2) + '° (Weak Attached Shock)';
    btResEl.style.color = '#22543d';
    psResEl.textContent = 'Downstream M₂ = ' + M2.toFixed(2) + ' | Pressure Jump p₂/p₁ = ' + p2_p1.toFixed(2) + '× (M₁n = ' + M1n.toFixed(2) + ' @ θ=' + theta_deg + '°)';
  }

  [m1El, thEl, gmEl].forEach(el => el.addEventListener('input', update));
  update();
})();