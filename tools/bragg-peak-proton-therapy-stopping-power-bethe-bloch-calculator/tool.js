(() => {
  'use strict';
  const ekEl = document.getElementById('bp-ek'), iEl = document.getElementById('bp-i');
  const deResEl = document.getElementById('bp-res-dedx'), rgResEl = document.getElementById('bp-res-range');

  function update() {
    const E_k_MeV = parseFloat(ekEl.value), I_eV = parseFloat(iEl.value);
    if (isNaN(E_k_MeV) || isNaN(I_eV) || E_k_MeV <= 0 || I_eV <= 0) return;

    // Relativistic velocity beta: gamma = 1 + E_k / 938.272 MeV
    const gamma = 1.0 + (E_k_MeV / 938.272);
    const beta = Math.sqrt(1.0 - (1.0 / Math.pow(gamma, 2)));

    // Bethe-Bloch electronic stopping power in water approx:
    // -dE/dx (MeV/cm) approx (0.307 / beta^2) * [ ln( 1.022e6 * beta^2 * gamma^2 / I_eV ) - beta^2 ]
    const bracket = Math.log((1.022e6 * Math.pow(beta * gamma, 2)) / I_eV) - Math.pow(beta, 2);
    const dedx_MeV_cm = (0.3071 / Math.pow(beta, 2)) * bracket;

    // Continuous Slowing Down Approximation (CSDA) Bragg peak range in water:
    // Range R (cm) approx alpha * E^p  (Bortfeld formula: R approx 0.0022 * E^1.77)
    const range_cm = 0.0022 * Math.pow(E_k_MeV, 1.77);

    deResEl.textContent = 'Stopping Power -dE/dx = ' + dedx_MeV_cm.toFixed(2) + ' MeV / cm';
    rgResEl.textContent = 'Bragg Peak Range = ' + range_cm.toFixed(1) + ' cm in Tissue (β = ' + beta.toFixed(3) + 'c @ E_k = ' + E_k_MeV + ' MeV)';
  }

  ekEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();