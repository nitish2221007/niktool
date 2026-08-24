(() => {
  'use strict';
  const uEl = document.getElementById('cfl-u'), cEl = document.getElementById('cfl-c');
  const dxEl = document.getElementById('cfl-dx'), cflEl = document.getElementById('cfl-num');
  const dtResEl = document.getElementById('cfl-res-dt'), wvResEl = document.getElementById('cfl-res-wave');

  function update() {
    const u = parseFloat(uEl.value), c = parseFloat(cEl.value);
    const dxMm = parseFloat(dxEl.value), cflTarget = parseFloat(cflEl.value);

    if (isNaN(u) || isNaN(c) || isNaN(dxMm) || isNaN(cflTarget) || u < 0 || c < 0 || dxMm <= 0 || cflTarget <= 0) return;

    const dxM = dxMm * 1e-3;
    const waveSpeed = u + c;

    // Compressible CFL limit: delta_t = (CFL * dx) / (u + c)  [seconds]
    const dt_sec = (cflTarget * dxM) / waveSpeed;
    const dt_us = dt_sec * 1e6;
    const dt_ms = dt_sec * 1e3;

    // Incompressible (advective only) limit: delta_t_adv = (CFL * dx) / u
    const dt_adv_us = u > 0 ? ((cflTarget * dxM) / u) * 1e6 : 0;

    let dtStr = '';
    if (dt_us < 1000) dtStr = dt_us.toFixed(2) + ' μs';
    else dtStr = dt_ms.toFixed(3) + ' ms (' + Math.round(dt_us).toLocaleString() + ' μs)';

    dtResEl.textContent = 'Δt = ' + dtStr + ' (CFL = ' + cflTarget + ')';
    wvResEl.textContent = 'Wave Speed (u+c) = ' + Math.round(waveSpeed) + ' m/s | Advective Δt = ' + dt_adv_us.toFixed(2) + ' μs (100k steps = ' + (dt_sec * 1e5).toFixed(3) + ' s physical time)';
  }

  [uEl, cEl, dxEl, cflEl].forEach(el => el.addEventListener('input', update));
  update();
})();