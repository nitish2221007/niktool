(() => {
  'use strict';
  const sgEl = document.getElementById('mc-sigma'), mEl = document.getElementById('mc-m'), rhEl = document.getElementById('mc-rho');
  const sgResEl = document.getElementById('mc-res-sigma'), mfResEl = document.getElementById('mc-res-mfp');

  const N_A = 6.02214076e23; // Avogadro constant

  function update() {
    const sigma_barns = parseFloat(sgEl.value), M_g_mol = parseFloat(mEl.value), rho_g_cm3 = parseFloat(rhEl.value);
    if (isNaN(sigma_barns) || isNaN(M_g_mol) || isNaN(rho_g_cm3) || sigma_barns <= 0 || M_g_mol <= 0 || rho_g_cm3 <= 0) return;

    // Number density of atoms: N = ( rho * N_A ) / M  [atoms / cm^3]
    const N_atoms_cm3 = (rho_g_cm3 * N_A) / M_g_mol;

    // Microscopic cross section in cm^2: 1 barn = 1e-24 cm^2
    const sigma_cm2 = sigma_barns * 1e-24;

    // Macroscopic cross section: Sigma = N * sigma  [cm^-1]
    const Sigma_cm1 = N_atoms_cm3 * sigma_cm2;

    // Mean free path: lambda_mfp = 1 / Sigma  [cm]
    const lambda_mfp_cm = 1.0 / Sigma_cm1;
    const lambda_mfp_mm = lambda_mfp_cm * 10.0;

    sgResEl.textContent = 'Macroscopic Σ = ' + Sigma_cm1.toFixed(2) + ' cm⁻¹';
    mfResEl.textContent = 'Mean Free Path λ_mfp = ' + (lambda_mfp_mm < 1.0 ? (lambda_mfp_cm*1e4).toFixed(1) + ' μm' : lambda_mfp_mm.toFixed(2) + ' mm') + ' | N = ' + N_atoms_cm3.toExponential(2) + ' atoms/cm³ (σ=' + sigma_barns + ' b)';
  }

  [sgEl, mEl, rhEl].forEach(el => el.addEventListener('input', update));
  update();
})();