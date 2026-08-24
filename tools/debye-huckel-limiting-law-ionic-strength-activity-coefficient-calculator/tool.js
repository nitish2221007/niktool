(() => {
  'use strict';
  const tEl = document.getElementById('dh-type'), cEl = document.getElementById('dh-conc');
  const gmResEl = document.getElementById('dh-res-gamma'), isResEl = document.getElementById('dh-res-istr');

  const A = 0.509; // Debye-Huckel constant for water at 25°C

  function update() {
    const parts = tEl.value.split('_');
    const z_prod = parseFloat(parts[0]);
    const z_plus = parseFloat(parts[1]);
    const z_minus = parseFloat(parts[2]);

    const C = parseFloat(cEl.value);
    if (isNaN(C) || C <= 0) return;

    // Ionic strength calculation:
    // For 1:1 -> I = C
    // For 2:1 (e.g. CaCl2: Ca2+ + 2Cl-) -> I = 0.5 * (C * 4 + 2C * 1) = 3C
    // For 2:2 (e.g. MgSO4) -> I = 0.5 * (C * 4 + C * 4) = 4C
    // For 3:1 (e.g. AlCl3) -> I = 0.5 * (C * 9 + 3C * 1) = 6C
    let I = C;
    if (z_prod === 2) I = 3.0 * C;
    else if (z_prod === 4) I = 4.0 * C;
    else if (z_prod === 3) I = 6.0 * C;

    // Debye-Huckel Limiting Law: log10(gamma_pm) = -A * |z+ * z-| * sqrt(I)
    const log_gamma = -A * z_prod * Math.sqrt(I);
    const gamma_pm = Math.pow(10.0, log_gamma);

    const effectiveActivity = C * gamma_pm;

    gmResEl.textContent = 'Activity γ_± = ' + gamma_pm.toFixed(3);
    isResEl.textContent = 'Ionic Strength I = ' + I.toFixed(4) + ' M | True Activity a = ' + effectiveActivity.toFixed(4) + ' M (Debye A = ' + A + ' @ C = ' + C + ' M)';
  }

  tEl.addEventListener('change', update);
  cEl.addEventListener('input', update);
  update();
})();