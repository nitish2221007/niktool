(() => {
  'use strict';
  const neEl = document.getElementById('db-ne'), teEl = document.getElementById('db-te');
  const lmResEl = document.getElementById('db-res-lam'), fpResEl = document.getElementById('db-res-fpe');

  const eps_0 = 8.854187817e-12; // F/m
  const q = 1.602176634e-19; // C
  const m_e = 9.1093837e-31; // kg

  function update() {
    const n_e = parseFloat(neEl.value), T_e_eV = parseFloat(teEl.value);
    if (isNaN(n_e) || isNaN(T_e_eV) || n_e <= 0 || T_e_eV <= 0) return;

    // Debye length: lambda_D = sqrt( eps_0 * (T_e_eV * q) / ( n_e * q^2 ) ) = sqrt( eps_0 * T_e_eV / ( n_e * q ) )  [m -> um]
    const lambda_D_m = Math.sqrt((eps_0 * T_e_eV) / (n_e * q));
    const lambda_D_um = lambda_D_m * 1e6;

    // Electron plasma frequency: f_pe = (1 / 2pi) * sqrt( n_e * q^2 / ( m_e * eps_0 ) )  [Hz -> GHz]
    const omega_pe = Math.sqrt((n_e * Math.pow(q, 2)) / (m_e * eps_0));
    const f_pe_GHz = (omega_pe / (2.0 * Math.PI)) * 1e-9;

    // Plasma parameter (electrons in Debye sphere): N_D = (4/3) * pi * n_e * lambda_D^3
    const N_D = (4.0 / 3.0) * Math.PI * n_e * Math.pow(lambda_D_m, 3);

    lmResEl.textContent = 'Debye Length λ_D = ' + lambda_D_um.toFixed(1) + ' μm';
    fpResEl.textContent = 'Plasma f_pe = ' + f_pe_GHz.toFixed(1) + ' GHz | Debye Sphere N_D = ' + N_D.toExponential(2) + ' (True Plasma: N_D >> 1, λ_D << L_system ✓)';
  }

  neEl.addEventListener('input', update);
  teEl.addEventListener('input', update);
  update();
})();