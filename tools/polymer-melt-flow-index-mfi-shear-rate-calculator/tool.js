(() => {
  'use strict';
  const mfiEl = document.getElementById('mfi-val'), rhoEl = document.getElementById('mfi-rho'), wtEl = document.getElementById('mfi-wt');
  const gResEl = document.getElementById('mfi-res-gam'), flResEl = document.getElementById('mfi-res-flow');

  // Standard ASTM D1238 die: Diameter D = 2.095 mm (Radius R = 1.0475 mm), Length L = 8.000 mm
  const R_die_mm = 1.0475;
  const R_die_m = R_die_mm / 1000;

  function update() {
    const MFI = parseFloat(mfiEl.value), rhoMelt = parseFloat(rhoEl.value), loadKg = parseFloat(wtEl.value);
    if (isNaN(MFI) || isNaN(rhoMelt) || isNaN(loadKg) || MFI <= 0 || rhoMelt <= 0 || loadKg <= 0) return;

    // Mass flow rate in g / s: MFI / 600
    const massFlowGs = MFI / 600;

    // Volumetric flow rate Q in cm^3 / s: massFlow / rhoMelt
    const Q_cm3_s = massFlowGs / rhoMelt;
    const Q_mm3_s = Q_cm3_s * 1000;
    const Q_m3_s = Q_cm3_s * 1e-6;

    // Apparent wall shear rate gammaDot_w = (4 * Q) / (pi * R^3)  [s^-1]
    const gammaDot_w = (4 * Q_m3_s) / (Math.PI * Math.pow(R_die_m, 3));

    // Die velocity v = Q / (pi * R^2)
    const v_mm_s = Q_mm3_s / (Math.PI * Math.pow(R_die_mm, 2));

    gResEl.textContent = 'γ̇_w = ' + gammaDot_w.toFixed(1) + ' s⁻¹ Apparent Die Wall Shear Rate';
    flResEl.textContent = 'Q = ' + Q_mm3_s.toFixed(1) + ' mm³/s (Linear Die Speed: ' + v_mm_s.toFixed(2) + ' mm/s @ ' + loadKg + ' kg Load)';
  }

  [mfiEl, rhoEl, wtEl].forEach(el => el.addEventListener('input', update));
  update();
})();