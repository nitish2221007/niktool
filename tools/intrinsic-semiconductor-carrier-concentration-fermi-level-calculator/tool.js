(() => {
  'use strict';
  const egEl = document.getElementById('in-eg'), ncEl = document.getElementById('in-nc');
  const nvEl = document.getElementById('in-nv'), tEl = document.getElementById('in-t');
  const niResEl = document.getElementById('in-res-ni'), eiResEl = document.getElementById('in-res-ei');

  const k_B_eV = 8.617333262e-5; // eV / K

  function update() {
    const E_g = parseFloat(egEl.value), N_C = parseFloat(ncEl.value);
    const N_V = parseFloat(nvEl.value), T_K = parseFloat(tEl.value);

    if (isNaN(E_g) || isNaN(N_C) || isNaN(N_V) || isNaN(T_K) || E_g <= 0 || N_C <= 0 || N_V <= 0 || T_K <= 0) return;

    // Thermal energy: kT in eV
    const kT_eV = k_B_eV * T_K;

    // Intrinsic concentration: n_i = sqrt(N_C * N_V) * exp( - E_g / (2 * kT) )  [cm^-3]
    const exp_term = Math.exp(-E_g / (2.0 * kT_eV));
    const n_i = Math.sqrt(N_C * N_V) * exp_term;

    // Intrinsic Fermi level offset from midgap: E_i - E_midgap = 0.5 * kT * ln( N_V / N_C )
    const offset_eV = 0.5 * kT_eV * Math.log(N_V / N_C);
    const offset_meV = offset_eV * 1000.0;

    niResEl.textContent = 'Intrinsic n_i = ' + n_i.toExponential(2) + ' cm⁻³';
    eiResEl.textContent = 'Fermi Offset (E_i - E_mid) = ' + (offset_meV >= 0 ? '+' : '') + offset_meV.toFixed(1) + ' meV | kT = ' + (kT_eV * 1000).toFixed(2) + ' meV (E_g = ' + E_g + ' eV @ ' + T_K + ' K)';
  }

  [egEl, ncEl, nvEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();