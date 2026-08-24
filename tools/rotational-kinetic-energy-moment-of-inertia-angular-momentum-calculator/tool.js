(() => {
  'use strict';
  const gEl = document.getElementById('rd-geom'), mEl = document.getElementById('rd-m');
  const rEl = document.getElementById('rd-r'), rpmEl = document.getElementById('rd-rpm');
  const krResEl = document.getElementById('rd-res-krot'), iResEl = document.getElementById('rd-res-i');

  function update() {
    const geom = gEl.value;
    const m = parseFloat(mEl.value), r = parseFloat(rEl.value), rpm = parseFloat(rpmEl.value);

    if (isNaN(m) || isNaN(r) || isNaN(rpm) || m <= 0 || r <= 0 || rpm < 0) return;

    // Moment of Inertia I:
    let I = 0;
    if (geom === 'cylinder') I = 0.5 * m * Math.pow(r, 2);
    else if (geom === 'sphere') I = 0.4 * m * Math.pow(r, 2);
    else if (geom === 'hoop') I = m * Math.pow(r, 2);
    else if (geom === 'rod') I = (1.0 / 12.0) * m * Math.pow(r, 2);

    // Angular velocity omega = RPM * 2*pi / 60  [rad / s]
    const omega = (rpm * 2.0 * Math.PI) / 60.0;

    // Rotational kinetic energy: K_rot = 0.5 * I * omega^2  [Joules]
    const K_rot_J = 0.5 * I * Math.pow(omega, 2);
    const K_rot_kJ = K_rot_J / 1000.0;

    // Angular momentum: L = I * omega  [kg * m^2 / s]
    const L_ang = I * omega;

    krResEl.textContent = 'Energy K_rot = ' + (K_rot_kJ >= 1 ? K_rot_kJ.toFixed(2) + ' kJ' : K_rot_J.toFixed(1) + ' J');
    iResEl.textContent = 'Inertia I = ' + I.toFixed(3) + ' kg·m² | Angular Momentum L = ' + L_ang.toFixed(1) + ' kg·m²/s (ω = ' + omega.toFixed(2) + ' rad/s @ ' + rpm + ' RPM)';
  }

  [gEl, mEl, rEl, rpmEl].forEach(el => el.addEventListener('input', update));
  gEl.addEventListener('change', update);
  update();
})();