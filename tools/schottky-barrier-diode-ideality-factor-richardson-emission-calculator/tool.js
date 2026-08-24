(() => {
  'use strict';
  const phEl = document.getElementById('sk-phi'), vEl = document.getElementById('sk-v');
  const nEl = document.getElementById('sk-n'), tEl = document.getElementById('sk-t');
  const jResEl = document.getElementById('sk-res-j'), jsResEl = document.getElementById('sk-res-js');

  const q = 1.602176634e-19; // C
  const k_B_eV = 8.617333262e-5; // eV/K
  const A_star = 112.0; // Richardson constant for n-type Silicon in A/(cm^2 * K^2)

  function update() {
    const Phi_B = parseFloat(phEl.value), V = parseFloat(vEl.value);
    const n = parseFloat(nEl.value), T_K = parseFloat(tEl.value);

    if (isNaN(Phi_B) || isNaN(V) || isNaN(n) || isNaN(T_K) || Phi_B <= 0 || n <= 0 || T_K <= 0) return;

    const kT_eV = k_B_eV * T_K;

    // Reverse saturation current density: J_s = A* * T^2 * exp( - Phi_B / kT )  [A / cm^2]
    const J_s_A_cm2 = A_star * Math.pow(T_K, 2) * Math.exp(-Phi_B / kT_eV);
    const J_s_uA_cm2 = J_s_A_cm2 * 1e6;

    // Forward current density: J = J_s * ( exp( V / (n * kT) ) - 1 )  [A / cm^2]
    const exp_term = Math.exp(V / (n * kT_eV));
    const J_A_cm2 = J_s_A_cm2 * (exp_term - 1.0);

    jResEl.textContent = 'Forward Current J = ' + J_A_cm2.toFixed(3) + ' A / cm²';
    jsResEl.textContent = 'Saturation J_s = ' + J_s_uA_cm2.toFixed(2) + ' μA/cm² | Low V_F = ' + V + ' V (A* = ' + A_star + ' A/(cm²·K²), Φ_B = ' + Phi_B + ' eV @ ' + T_K + ' K)';
  }

  [phEl, vEl, nEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();