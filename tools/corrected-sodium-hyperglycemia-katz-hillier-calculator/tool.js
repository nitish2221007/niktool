(() => {
  'use strict';
  const naEl = document.getElementById('na-meas'), glEl = document.getElementById('na-glu');
  const crResEl = document.getElementById('na-res-corr'), hlResEl = document.getElementById('na-res-hil');

  function update() {
    const Na = parseFloat(naEl.value), Glu = parseFloat(glEl.value);
    if (isNaN(Na) || isNaN(Glu) || Na <= 0 || Glu <= 0) return;

    // Katz standard formula: Na_corr = Na + 0.016 * (Glu - 100) (1.6 mEq/L per 100 mg/dL over 100)
    const excessGlu = Math.max(0, Glu - 100.0);
    const Na_katz = Na + (0.016 * excessGlu);

    // Hillier formula: 2.4 mEq/L per 100 mg/dL glucose over 100
    const Na_hillier = Na + (0.024 * excessGlu);

    // Effective serum osmolality = 2 * Na + (Glu / 18)
    const eff_osmo = 2.0 * Na + (Glu / 18.0);

    crResEl.textContent = 'Corrected Na⁺ = ' + Na_katz.toFixed(1) + ' mEq / L (Katz 1.6)';
    hlResEl.textContent = 'Hillier 2.4 = ' + Na_hillier.toFixed(1) + ' mEq/L | Effective Osmolality = ' + eff_osmo.toFixed(1) + ' mOsm/kg (Measured Na: ' + Na + ' mEq/L @ Glucose: ' + Glu + ' mg/dL)';
  }

  naEl.addEventListener('input', update);
  glEl.addEventListener('input', update);
  update();
})();