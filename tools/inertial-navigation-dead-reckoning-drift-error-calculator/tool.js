(() => {
  'use strict';
  const baEl = document.getElementById('ins-ba'), bgEl = document.getElementById('ins-bg'), tmEl = document.getElementById('ins-time');
  const erResEl = document.getElementById('ins-res-err'), spResEl = document.getElementById('ins-res-split');

  const g = 9.80665;

  function update() {
    const ba_mg = parseFloat(baEl.value), bg_deg_hr = parseFloat(bgEl.value), tMin = parseFloat(tmEl.value);
    if (isNaN(ba_mg) || isNaN(bg_deg_hr) || isNaN(tMin) || ba_mg < 0 || bg_deg_hr < 0 || tMin <= 0) return;

    const tSec = tMin * 60;

    // Accelerometer bias in m / s^2: ba_mg * 1e-3 * g
    const ba_ms2 = ba_mg * 1e-3 * g;
    // Position error from accelerometer bias = 1/2 * ba * t^2
    const err_accel_m = 0.5 * ba_ms2 * Math.pow(tSec, 2);

    // Gyro bias in rad / s: (bg_deg_hr * pi/180) / 3600
    const bg_rad_s = ((bg_deg_hr * Math.PI) / 180) / 3600;
    // Position error from gyro tilt bias coupling with gravity = 1/6 * bg * g * t^3
    const err_gyro_m = (1 / 6) * bg_rad_s * g * Math.pow(tSec, 3);

    const totalErrorM = err_accel_m + err_gyro_m;
    const totalErrorKm = totalErrorM / 1000;

    let errStr = '';
    if (totalErrorM < 1000) errStr = totalErrorM.toFixed(1) + ' m';
    else errStr = totalErrorKm.toFixed(2) + ' km (' + Math.round(totalErrorM).toLocaleString() + ' m)';

    erResEl.textContent = errStr + ' Position Drift';
    spResEl.textContent = 'Accel: ' + (err_accel_m < 1000 ? err_accel_m.toFixed(1) + 'm' : (err_accel_m/1000).toFixed(2) + 'km') + ' (t²) | Gyro: ' + (err_gyro_m < 1000 ? err_gyro_m.toFixed(1) + 'm' : (err_gyro_m/1000).toFixed(2) + 'km') + ' (t³ coupling with 1g gravity)';
  }

  [baEl, bgEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();