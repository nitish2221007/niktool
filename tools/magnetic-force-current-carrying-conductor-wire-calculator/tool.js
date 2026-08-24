(() => {
  'use strict';
  const iEl = document.getElementById('mw-i'), lEl = document.getElementById('mw-l');
  const bEl = document.getElementById('mw-b'), thEl = document.getElementById('mw-th');
  const fResEl = document.getElementById('mw-res-force'), drResEl = document.getElementById('mw-res-dir');

  function update() {
    const I = parseFloat(iEl.value), L = parseFloat(lEl.value);
    const B = parseFloat(bEl.value), theta_deg = parseFloat(thEl.value);

    if (isNaN(I) || isNaN(L) || isNaN(B) || isNaN(theta_deg) || I < 0 || L <= 0 || B < 0 || theta_deg < 0 || theta_deg > 180) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;
    const sin_theta = Math.sin(theta_rad);

    // Magnetic force: F = I * L * B * sin(theta)  [Newtons]
    const F = I * L * B * sin_theta;

    fResEl.textContent = 'Force F = ' + F.toFixed(2) + ' N';
    drResEl.textContent = 'Perpendicular Force: ' + F.toFixed(2) + ' N (' + (sin_theta * 100).toFixed(1) + '% max force @ θ = ' + theta_deg + '°, I = ' + I + ' A, B = ' + B + ' T)';
  }

  [iEl, lEl, bEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();