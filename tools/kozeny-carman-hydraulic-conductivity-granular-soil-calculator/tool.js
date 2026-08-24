(() => {
  'use strict';
  const s0El = document.getElementById('kc-s0'), eEl = document.getElementById('kc-e'), tEl = document.getElementById('kc-temp');
  const kResEl = document.getElementById('kc-res-k'), pmResEl = document.getElementById('kc-res-perm');

  const rho_w = 1000.0; // kg/m^3
  const g = 9.80665; // m/s^2

  function update() {
    const S_0 = parseFloat(s0El.value), e = parseFloat(eEl.value), T_C = parseFloat(tEl.value);
    if (isNaN(S_0) || isNaN(e) || isNaN(T_C) || S_0 <= 0 || e <= 0 || T_C < 0) return;

    // Water viscosity vs temp approx: mu = 1.787 / (1 + 0.0337*T + 0.00022*T^2) * 1e-3 Pa*s
    const mu_Pa_s = (1.787 / (1.0 + 0.0337 * T_C + 0.000221 * Math.pow(T_C, 2))) * 1e-3;

    // Carman shape factor constant C_K approx 5.0
    const C_K = 5.0;

    // Intrinsic permeability: k = ( 1 / (C_K * S_0^2) ) * ( e^3 / (1 + e) )  [m^2]
    const void_factor = Math.pow(e, 3) / (1.0 + e);
    const k_perm_m2 = (1.0 / (C_K * Math.pow(S_0, 2))) * void_factor;
    const k_darcies = k_perm_m2 / 9.869233e-13;

    // Hydraulic conductivity: K = ( k * rho * g ) / mu  [m / s]
    const K_m_s = (k_perm_m2 * rho_w * g) / mu_Pa_s;
    const K_m_day = K_m_s * 86400.0;

    kResEl.textContent = 'K = ' + K_m_s.toExponential(2) + ' m/s (' + K_m_day.toFixed(1) + ' m/day)';
    pmResEl.textContent = 'Permeability k = ' + k_perm_m2.toExponential(2) + ' m² (' + k_darcies.toFixed(1) + ' Darcies @ e=' + e + ', ' + T_C + '°C)';
  }

  [s0El, eEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();