(() => {
  'use strict';
  const dEl = document.getElementById('prop-d'), rpmEl = document.getElementById('prop-rpm');
  const vaEl = document.getElementById('prop-va'), pdEl = document.getElementById('prop-pd');
  const efResEl = document.getElementById('prop-res-eff'), thResEl = document.getElementById('prop-res-thrust');

  const rho_water = 1025.0; // kg / m^3

  function update() {
    const D = parseFloat(dEl.value), RPM = parseFloat(rpmEl.value);
    const vaKnots = parseFloat(vaEl.value), PD = parseFloat(pdEl.value);

    if (isNaN(D) || isNaN(RPM) || isNaN(vaKnots) || isNaN(PD) || D <= 0 || RPM <= 0 || vaKnots <= 0 || PD <= 0) return;

    // Rotational frequency n = RPM / 60  [revs / second]
    const n = RPM / 60.0;
    // Speed of advance V_a in m/s
    const V_a = vaKnots * 0.514444;

    // Advance coefficient J = V_a / ( n * D )
    const J = V_a / (n * D);

    // Wageningen B-Series polynomial approximation for 4-blade propeller (P/D ~ 1.0):
    // K_T approx = 0.35 * (P/D) - 0.26 * J
    const K_T = Math.max(0.01, (0.35 * PD) - (0.26 * J));
    // 10 * K_Q approx = 0.45 * (P/D) - 0.25 * J
    const K_Q = Math.max(0.002, ((0.45 * PD) - (0.25 * J)) / 10.0);

    // Open water efficiency eta_0 = ( J / (2 * pi) ) * ( K_T / K_Q )
    const eta_0 = (J / (2.0 * Math.PI)) * (K_T / K_Q);
    const eta_pct = Math.min(85.0, Math.max(0, eta_0 * 100));

    // Thrust T = K_T * rho * n^2 * D^4  [N -> kN]
    const Thrust_N = K_T * rho_water * Math.pow(n, 2) * Math.pow(D, 4);
    const Thrust_kN = Thrust_N / 1000.0;

    efResEl.textContent = 'η₀ = ' + eta_pct.toFixed(1) + '% Propulsive Efficiency';
    thResEl.textContent = 'Thrust T = ' + Thrust_kN.toFixed(1) + ' kN (Advance J = ' + J.toFixed(3) + ' | K_T = ' + K_T.toFixed(3) + ', 10·K_Q = ' + (K_Q*10).toFixed(3) + ' @ ' + RPM + ' RPM)';
  }

  [dEl, rpmEl, vaEl, pdEl].forEach(el => el.addEventListener('input', update));
  update();
})();