(() => {
  'use strict';
  const phiEl = document.getElementById('rk-phi'), hEl = document.getElementById('rk-h'), gmEl = document.getElementById('rk-gamma');
  const thResEl = document.getElementById('rk-res-thrust'), cfResEl = document.getElementById('rk-res-coeff');

  function update() {
    const phi_deg = parseFloat(phiEl.value), H = parseFloat(hEl.value), gamma = parseFloat(gmEl.value);
    if (isNaN(phi_deg) || isNaN(H) || isNaN(gamma) || phi_deg < 0 || phi_deg >= 50 || H <= 0 || gamma <= 0) return;

    const phi_rad = (phi_deg * Math.PI) / 180.0;

    // Rankine active coefficient: K_a = (1 - sin phi) / (1 + sin phi) = tan^2(45° - phi/2)
    const sin_phi = Math.sin(phi_rad);
    const K_a = (1.0 - sin_phi) / (1.0 + sin_phi);

    // Rankine passive coefficient: K_p = 1 / K_a = (1 + sin phi) / (1 - sin phi)
    const K_p = (1.0 + sin_phi) / (1.0 - sin_phi);

    // At-rest coefficient (Jaky formula): K_0 = 1 - sin phi
    const K_0 = 1.0 - sin_phi;

    // Active thrust force: P_a = 0.5 * K_a * gamma * H^2  [kN / m]
    const P_a = 0.5 * K_a * gamma * Math.pow(H, 2);
    // Passive thrust force: P_p = 0.5 * K_p * gamma * H^2
    const P_p = 0.5 * K_p * gamma * Math.pow(H, 2);

    thResEl.textContent = 'Active Thrust P_a = ' + P_a.toFixed(1) + ' kN / m Wall';
    cfResEl.textContent = 'K_a = ' + K_a.toFixed(3) + ' | K_p = ' + K_p.toFixed(3) + ' | K_0 = ' + K_0.toFixed(3) + ' (Max Passive P_p = ' + Math.round(P_p).toLocaleString() + ' kN/m @ H=' + H + ' m)';
  }

  [phiEl, hEl, gmEl].forEach(el => el.addEventListener('input', update));
  update();
})();