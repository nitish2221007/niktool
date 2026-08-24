(() => {
  'use strict';
  const dlEl = document.getElementById('jj-delta'), rnEl = document.getElementById('jj-rn'), vEl = document.getElementById('jj-v');
  const icResEl = document.getElementById('jj-res-ic'), acResEl = document.getElementById('jj-res-ac');

  const Phi_0 = 2.067833848e-15; // Wb (Magnetic Flux Quantum h / 2e)
  const e_charge = 1.602176634e-19; // C

  function update() {
    const Delta_meV = parseFloat(dlEl.value), R_n = parseFloat(rnEl.value), V_uV = parseFloat(vEl.value);
    if (isNaN(Delta_meV) || isNaN(R_n) || isNaN(V_uV) || Delta_meV <= 0 || R_n <= 0) return;

    // Ambegaokar-Baratoff formula at T = 0 K:
    // I_c = ( pi * Delta ) / ( 2 * e * R_n )  [Amperes]
    // where Delta is in Joules = Delta_meV * 1e-3 * e
    // Simplifying: I_c = ( pi * (Delta_meV * 1e-3) ) / ( 2 * R_n )
    const I_c_A = (Math.PI * (Delta_meV * 1e-3)) / (2.0 * R_n);
    const I_c_uA = I_c_A * 1e6;

    // Josephson non-linear inductance: L_J = Phi_0 / ( 2 * pi * I_c )  [Henries -> nH]
    const L_J_H = Phi_0 / (2.0 * Math.PI * I_c_A);
    const L_J_nH = L_J_H * 1e9;

    // AC Josephson effect frequency: f = 2 * e * V / h = V / Phi_0  [Hz -> GHz]
    const V_V = V_uV * 1e-6;
    const f_Hz = V_V / Phi_0;
    const f_GHz = f_Hz * 1e-9;

    icResEl.textContent = 'Critical Current I_c = ' + I_c_uA.toFixed(2) + ' μA';
    acResEl.textContent = 'AC Frequency f = ' + f_GHz.toFixed(3) + ' GHz (483.6 MHz/μV) | Inductance L_J = ' + L_J_nH.toFixed(1) + ' nH (R_n=' + R_n + ' Ω, Δ=' + Delta_meV + ' meV)';
  }

  [dlEl, rnEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();