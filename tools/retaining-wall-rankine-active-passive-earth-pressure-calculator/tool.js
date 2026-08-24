(() => {
  'use strict';
  const phiEl = document.getElementById('rk-phi'), gEl = document.getElementById('rk-gamma'), hEl = document.getElementById('rk-h');
  const paResEl = document.getElementById('rk-res-pa'), cfResEl = document.getElementById('rk-res-coeff');

  function update() {
    const phi_deg = parseFloat(phiEl.value), gamma = parseFloat(gEl.value), H = parseFloat(hEl.value);
    if (isNaN(phi_deg) || isNaN(gamma) || isNaN(H) || phi_deg <= 0 || phi_deg >= 90 || gamma <= 0 || H <= 0) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;
    const sin_phi = Math.sin(phi_rad);

    // Rankine active coefficient: K_a = ( 1 - sin(phi) ) / ( 1 + sin(phi) )
    const K_a = (1.0 - sin_phi) / (1.0 + sin_phi);

    // Rankine passive coefficient: K_p = ( 1 + sin(phi) ) / ( 1 - sin(phi) ) = 1 / K_a
    const K_p = (1.0 + sin_phi) / (1.0 - sin_phi);

    // Total active thrust force: P_a = 0.5 * K_a * gamma * H^2  [kN / m]
    const P_a = 0.5 * K_a * gamma * Math.pow(H, 2);

    // Overturning moment about the toe: M_ot = P_a * (H / 3)  [kN * m / m]
    const M_ot = P_a * (H / 3.0);

    paResEl.textContent = 'Active Thrust P_a = ' + P_a.toFixed(2) + ' kN / m';
    cfResEl.textContent = 'K_a = ' + K_a.toFixed(3) + ' | K_p = ' + K_p.toFixed(3) + ' | Overturning M_ot = ' + M_ot.toFixed(2) + ' kN·m/m (Thrust acting at ' + (H/3.0).toFixed(2) + ' m above base)';
  }

  [phiEl, gEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();