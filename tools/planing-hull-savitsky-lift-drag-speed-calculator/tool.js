(() => {
  'use strict';
  const bEl = document.getElementById('sav-b'), tauEl = document.getElementById('sav-tau');
  const vEl = document.getElementById('sav-v'), betaEl = document.getElementById('sav-beta');
  const clResEl = document.getElementById('sav-res-cl'), resResEl = document.getElementById('sav-res-res');

  const g = 9.80665;
  const rho_water = 1025.0; // kg / m^3

  function update() {
    const b = parseFloat(bEl.value), tauDeg = parseFloat(tauEl.value);
    const vKnots = parseFloat(vEl.value), betaDeg = parseFloat(betaEl.value);

    if (isNaN(b) || isNaN(tauDeg) || isNaN(vKnots) || isNaN(betaDeg) || b <= 0 || tauDeg <= 0 || vKnots <= 0 || betaDeg < 0) return;

    const v_m_s = vKnots * 0.514444;

    // Beam Froude number C_v = v / sqrt( g * b )
    const C_v = v_m_s / Math.sqrt(g * b);

    // Typical wetted length ratio lambda = 2.15
    const lambda = 2.15;

    // Flat plate lift coefficient: C_L0 = tau^1.1 * [ 0.0120 * sqrt(lambda) + 0.0055 * (lambda^2.5 / C_v^2) ]
    const C_L0 = Math.pow(tauDeg, 1.1) * ((0.0120 * Math.sqrt(lambda)) + (0.0055 * (Math.pow(lambda, 2.5) / Math.pow(C_v, 2))));

    // Deadrise correction: C_L_beta = C_L0 - 0.0065 * beta * C_L0^0.6
    const C_L_beta = Math.max(0.001, C_L0 - (0.0065 * betaDeg * Math.pow(C_L0, 0.6)));

    // Total supported dynamic displacement weight Delta = 0.5 * rho * v^2 * b^2 * C_L_beta  [N -> kg]
    const Lift_N = 0.5 * rho_water * Math.pow(v_m_s, 2) * Math.pow(b, 2) * C_L_beta;
    const Lift_kg = Lift_N / 9.80665;

    clResEl.textContent = 'C_Lβ = ' + C_L_beta.toFixed(4) + ' (Dynamic Lift: ' + Math.round(Lift_kg).toLocaleString() + ' kg)';
    resResEl.textContent = 'Beam Froude C_v = ' + C_v.toFixed(2) + ' (Fully Planing @ ' + vKnots + ' kts) | Wetted Length L_k = ' + (lambda * b).toFixed(2) + ' m (Deadrise β = ' + betaDeg + '°)';
  }

  [bEl, tauEl, vEl, betaEl].forEach(el => el.addEventListener('input', update));
  update();
})();