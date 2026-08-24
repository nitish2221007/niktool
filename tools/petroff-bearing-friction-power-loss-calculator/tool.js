(() => {
  'use strict';
  const rEl = document.getElementById('pet-r'), lEl = document.getElementById('pet-l');
  const cEl = document.getElementById('pet-c'), muEl = document.getElementById('pet-mu'), rpmEl = document.getElementById('pet-rpm');
  const pResEl = document.getElementById('pet-res-pwr'), tResEl = document.getElementById('pet-res-trq');

  function update() {
    const rMm = parseFloat(rEl.value), lMm = parseFloat(lEl.value);
    const cUm = parseFloat(cEl.value), muCp = parseFloat(muEl.value), RPM = parseFloat(rpmEl.value);

    if (isNaN(rMm) || isNaN(lMm) || isNaN(cUm) || isNaN(muCp) || isNaN(RPM) || rMm <= 0 || lMm <= 0 || cUm <= 0 || muCp <= 0 || RPM <= 0) return;

    const r_m = rMm * 1e-3;
    const l_m = lMm * 1e-3;
    const c_m = cUm * 1e-6;
    const mu_pa_s = muCp * 1e-3;

    // Angular velocity omega = 2 * pi * RPM / 60  [rad / s]
    const omega = (2.0 * Math.PI * RPM) / 60.0;

    // Surface tangential velocity U = omega * r
    const U = omega * r_m;
    // Shear rate gamma_dot = U / c
    const gamma_dot = U / c_m;

    // Petroff's law friction torque: T = 2 * pi * mu * omega * r^3 * L / c  [N * m]
    const Torque_Nm = (2.0 * Math.PI * mu_pa_s * omega * Math.pow(r_m, 3) * l_m) / c_m;

    // Power loss P = Torque * omega  [Watts]
    const Power_watts = Torque_Nm * omega;
    const Power_hp = Power_watts / 745.7;

    pResEl.textContent = 'P_loss = ' + Power_watts.toFixed(1) + ' Watts (' + Power_hp.toFixed(2) + ' HP Heat Dissipation)';
    tResEl.textContent = 'Friction Torque T = ' + Torque_Nm.toFixed(3) + ' N·m | Shear Rate γ̇ = ' + gamma_dot.toExponential(2) + ' s⁻¹ (Surface Speed = ' + U.toFixed(2) + ' m/s)';
  }

  [rEl, lEl, cEl, muEl, rpmEl].forEach(el => el.addEventListener('input', update));
  update();
})();