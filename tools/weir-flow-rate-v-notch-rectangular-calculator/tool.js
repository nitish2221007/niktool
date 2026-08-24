(() => {
  'use strict';
  const tEl = document.getElementById('wr-type'), hEl = document.getElementById('wr-head');
  const qResEl = document.getElementById('wr-res-q'), m3ResEl = document.getElementById('wr-res-m3');

  const gGrav = 9.80665;

  function update() {
    const mode = tEl.value, hCm = parseFloat(hEl.value);
    if (isNaN(hCm) || hCm <= 0) return;

    const hM = hCm * 1e-2;
    let qM3s = 0;

    if (mode === '90') {
      // 90 deg V-Notch: Q ≈ 1.38 * H^(5/2)
      qM3s = 1.38 * Math.pow(hM, 2.5);
    } else if (mode === '60') {
      // 60 deg V-Notch: Q ≈ 0.79 * H^(5/2)
      qM3s = 0.79 * Math.pow(hM, 2.5);
    } else {
      // Rectangular 1.0m width: Francis formula Q = 1.84 * L * H^(3/2)
      qM3s = 1.84 * 1.0 * Math.pow(hM, 1.5);
    }

    const qLps = qM3s * 1000;
    const qM3hr = qM3s * 3600;
    const qGpm = qLps * 15.8503;

    qResEl.textContent = qLps.toFixed(2) + ' L / s';
    m3ResEl.textContent = qM3hr.toFixed(2) + ' m³ / hr (' + qGpm.toFixed(1) + ' GPM)';
  }

  tEl.addEventListener('change', update);
  hEl.addEventListener('input', update);
  update();
})();