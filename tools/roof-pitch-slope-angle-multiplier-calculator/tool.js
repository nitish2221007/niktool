(() => {
  'use strict';
  const rEl = document.getElementById('rp-rise');
  const aResEl = document.getElementById('rp-res-angle'), mResEl = document.getElementById('rp-res-mult'), gResEl = document.getElementById('rp-res-grade');

  function update() {
    const rise = parseFloat(rEl.value);
    if (isNaN(rise) || rise <= 0) return;

    // Angle = atan(rise / 12) in degrees
    const rad = Math.atan(rise / 12);
    const deg = (rad * 180) / Math.PI;

    // Rafter multiplier = sqrt(12^2 + rise^2) / 12
    const rafterMult = Math.sqrt(144 + Math.pow(rise, 2)) / 12;
    const gradePct = (rise / 12) * 100;

    aResEl.textContent = deg.toFixed(2) + '°';
    mResEl.textContent = rafterMult.toFixed(4);
    gResEl.textContent = gradePct.toFixed(1) + '% Grade';
  }

  rEl.addEventListener('input', update);
  update();
})();