(() => {
  'use strict';
  const deEl = document.getElementById('fw-de'), rpmEl = document.getElementById('fw-rpm'), csEl = document.getElementById('fw-cs');
  const iResEl = document.getElementById('fw-res-i'), msResEl = document.getElementById('fw-res-mass');

  function update() {
    const deltaE_kJ = parseFloat(deEl.value), rpm = parseFloat(rpmEl.value), C_s = parseFloat(csEl.value);
    if (isNaN(deltaE_kJ) || isNaN(rpm) || isNaN(C_s) || deltaE_kJ <= 0 || rpm <= 0 || C_s <= 0 || C_s >= 1) return;

    const deltaE_J = deltaE_kJ * 1000.0;

    // Mean angular velocity: omega_0 = 2 * pi * N0 / 60  [rad / s]
    const omega_0 = (2.0 * Math.PI * rpm) / 60.0;

    // Required Moment of Inertia: I = Delta_E / ( omega_0^2 * C_s )  [kg * m^2]
    const I_req = deltaE_J / (Math.pow(omega_0, 2) * C_s);

    // Approximate rim mass assuming radius R = 0.30 m (I = m * R^2):
    const R_rim = 0.30;
    const m_rim_kg = I_req / Math.pow(R_rim, 2);

    const min_rpm = rpm * (1.0 - C_s / 2.0);
    const max_rpm = rpm * (1.0 + C_s / 2.0);

    iResEl.textContent = 'Required Inertia I = ' + I_req.toFixed(2) + ' kg·m²';
    msResEl.textContent = 'Rim Mass ≈ ' + m_rim_kg.toFixed(1) + ' kg (@ R = 0.30 m) | Speed: ' + min_rpm.toFixed(0) + ' to ' + max_rpm.toFixed(0) + ' RPM (ΔE = ' + deltaE_kJ + ' kJ)';
  }

  [deEl, rpmEl, csEl].forEach(el => el.addEventListener('input', update));
  update();
})();