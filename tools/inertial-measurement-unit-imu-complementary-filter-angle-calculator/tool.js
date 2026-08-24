(() => {
  'use strict';
  const thpEl = document.getElementById('im-thprev'), gyEl = document.getElementById('im-gyro');
  const dtEl = document.getElementById('im-dt'), acEl = document.getElementById('im-accel'), alEl = document.getElementById('im-alpha');
  const fsResEl = document.getElementById('im-res-fused'), ptResEl = document.getElementById('im-res-parts');

  function update() {
    const th_prev = parseFloat(thpEl.value), omega_gyro = parseFloat(gyEl.value);
    const dt = parseFloat(dtEl.value), th_accel = parseFloat(acEl.value), alpha = parseFloat(alEl.value);

    if (isNaN(th_prev) || isNaN(omega_gyro) || isNaN(dt) || isNaN(th_accel) || isNaN(alpha) || dt <= 0 || alpha <= 0 || alpha >= 1) return;

    // Gyro dead-reckoning integration:
    const gyro_integrated = th_prev + (omega_gyro * dt);

    // Complementary Filter equation:
    // theta_k = alpha * ( theta_{k-1} + omega_gyro * dt ) + ( 1 - alpha ) * theta_accel
    const part_gyro = alpha * gyro_integrated;
    const part_accel = (1.0 - alpha) * th_accel;
    const theta_fused = part_gyro + part_accel;

    fsResEl.textContent = 'Fused Tilt Angle θ_k = ' + theta_fused.toFixed(2) + '°';
    ptResEl.textContent = 'Gyro Track = ' + part_gyro.toFixed(2) + '° (' + (alpha * 100).toFixed(0) + '%) | Accel Drift Fix = ' + part_accel.toFixed(2) + '° (' + ((1.0 - alpha) * 100).toFixed(0) + '% @ ' + (1.0/dt).toFixed(0) + ' Hz)';
  }

  [thpEl, gyEl, dtEl, acEl, alEl].forEach(el => el.addEventListener('input', update));
  update();
})();