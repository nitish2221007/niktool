(() => {
  'use strict';
  const fEl = document.getElementById('tq-f'), rEl = document.getElementById('tq-r'), thEl = document.getElementById('tq-th');
  const tqResEl = document.getElementById('tq-res-tau'), efResEl = document.getElementById('tq-res-eff');

  function update() {
    const F = parseFloat(fEl.value), r = parseFloat(rEl.value), theta_deg = parseFloat(thEl.value);
    if (isNaN(F) || isNaN(r) || isNaN(theta_deg) || F < 0 || r <= 0 || theta_deg < 0 || theta_deg > 180) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const sin_theta = Math.sin(theta_rad);

    // Torque tau = r * F * sin(theta)  [N * m]
    const tau_Nm = r * F * sin_theta;
    const tau_lbft = tau_Nm * 0.737562;

    const r_perp = r * sin_theta;

    tqResEl.textContent = 'Torque τ = ' + tau_Nm.toFixed(2) + ' N·m (' + tau_lbft.toFixed(2) + ' lb·ft)';
    efResEl.textContent = 'Effective Lever Arm r_perp = ' + r_perp.toFixed(3) + ' m (' + (sin_theta * 100).toFixed(1) + '% Torque Efficiency @ θ = ' + theta_deg + '°)';
  }

  [fEl, rEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();