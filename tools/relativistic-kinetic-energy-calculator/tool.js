(() => {
  'use strict';
  const mEl = document.getElementById('rke-mass'), bEl = document.getElementById('rke-beta');
  const keResEl = document.getElementById('rke-res-ke'), gResEl = document.getElementById('rke-res-gamma'), tResEl = document.getElementById('rke-res-tot');

  const cSpeed = 299792458; // m / s
  const eVToJ = 1.602176634e-19;

  function update() {
    const mKg = parseFloat(mEl.value), beta = parseFloat(bEl.value);
    if (isNaN(mKg) || isNaN(beta) || mKg <= 0 || beta < 0 || beta >= 1.0) return;

    // Lorentz factor gamma = 1 / sqrt(1 - beta^2)
    const gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));
    // Rest Energy E0 = m * c^2 (Joules)
    const E0_J = mKg * Math.pow(cSpeed, 2);
    // Kinetic energy K = (gamma - 1) * E0
    const K_J = (gamma - 1) * E0_J;
    // Total energy E = gamma * E0
    const E_tot_J = gamma * E0_J;

    const K_eV = K_J / eVToJ;
    const E_tot_eV = E_tot_J / eVToJ;

    if (mKg < 1e-20) {
      // Subatomic formatting in MeV/GeV
      keResEl.textContent = K_eV >= 1e9 ? (K_eV / 1e9).toFixed(3) + ' GeV' : (K_eV / 1e6).toFixed(3) + ' MeV';
      tResEl.textContent = E_tot_eV >= 1e9 ? (E_tot_eV / 1e9).toFixed(3) + ' GeV' : (E_tot_eV / 1e6).toFixed(3) + ' MeV';
    } else {
      // Macroscopic formatting in Joules
      keResEl.textContent = (K_J / 1e15).toFixed(2) + ' Petajoules (' + K_J.toExponential(2) + ' J)';
      tResEl.textContent = (E_tot_J / 1e15).toFixed(2) + ' Petajoules';
    }

    gResEl.textContent = 'γ = ' + gamma.toFixed(3);
  }

  mEl.addEventListener('change', update);
  bEl.addEventListener('input', update);
  update();
})();