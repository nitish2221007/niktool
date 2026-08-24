(() => {
  'use strict';
  const eoxEl = document.getElementById('fn-eox'), phiEl = document.getElementById('fn-phi');
  const jfResEl = document.getElementById('fn-res-jfn'), prResEl = document.getElementById('fn-res-prog');

  function update() {
    const E_ox_MV_cm = parseFloat(eoxEl.value), Phi_B_eV = parseFloat(phiEl.value);
    if (isNaN(E_ox_MV_cm) || isNaN(Phi_B_eV) || E_ox_MV_cm <= 0 || Phi_B_eV <= 0) return;

    // Standard coefficients for Si-SiO2 interface:
    // A_FN approx 1.54e-6 * (1 / Phi_B) * 1e12  [A / V^2]
    // B_FN approx 6.83e7 * Phi_B^1.5 * 1e-6 = 68.3 * Phi_B^1.5  [MV / cm]
    const B_FN = 48.3 * Math.pow(Phi_B_eV, 1.5);

    // J_FN = A * E^2 * exp( - B / E )  [A / cm^2]
    const E_sq = Math.pow(E_ox_MV_cm, 2);
    const exp_term = Math.exp(-B_FN / E_ox_MV_cm);
    const J_FN = 1.54e-6 * (1.0 / Phi_B_eV) * E_sq * 1e12 * exp_term * 1e-12; // A/cm^2 scale

    let status = '', color = '#22543d';
    if (E_ox_MV_cm >= 8.0) {
      status = 'HIGH TUNNELING REGIME (Fast Flash Program/Erase: ~10 μs write)';
      color = '#22543d';
    } else if (E_ox_MV_cm >= 5.0) {
      status = 'MODERATE TUNNELING (Slow charge transfer)';
      color = '#ea580c';
    } else {
      status = 'NEGLIGIBLE TUNNELING (Non-volatile charge retention > 10 years ✓)';
      color = '#22543d';
    }

    jfResEl.textContent = 'Tunneling J_FN = ' + J_FN.toExponential(2) + ' A / cm²';
    prResEl.textContent = status + ' [B_FN = ' + B_FN.toFixed(1) + ' MV/cm @ E_ox = ' + E_ox_MV_cm + ' MV/cm]';
    prResEl.style.color = color;
  }

  eoxEl.addEventListener('input', update);
  phiEl.addEventListener('input', update);
  update();
})();