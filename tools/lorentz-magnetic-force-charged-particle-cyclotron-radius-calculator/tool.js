(() => {
  'use strict';
  const pEl = document.getElementById('lf-part'), vEl = document.getElementById('lf-v'), bEl = document.getElementById('lf-b');
  const fResEl = document.getElementById('lf-res-force'), rResEl = document.getElementById('lf-res-rad');

  function update() {
    const parts = pEl.value.split('_');
    const q = parseFloat(parts[0]);
    const m = parseFloat(parts[1]);

    const v = parseFloat(vEl.value), B = parseFloat(bEl.value);
    if (isNaN(v) || isNaN(B) || v <= 0 || B <= 0) return;

    // Lorentz force (assuming perpendicular theta = 90 deg): F = q * v * B  [Newtons]
    const F = q * v * B;

    // Cyclotron radius: r = ( m * v ) / ( q * B )  [meters]
    const r_m = (m * v) / (q * B);
    const r_cm = r_m * 100.0;

    // Cyclotron frequency: f_c = ( q * B ) / ( 2 * pi * m )  [Hz]
    const f_c = (q * B) / (2.0 * Math.PI * m);
    const f_c_MHz = f_c / 1e6;

    fResEl.textContent = 'Force F = ' + F.toExponential(2) + ' N';
    rResEl.textContent = 'Cyclotron Radius r = ' + (r_cm >= 100 ? r_m.toFixed(2) + ' m' : r_cm.toFixed(2) + ' cm') + ' | Gyrofrequency f_c = ' + f_c_MHz.toFixed(2) + ' MHz (Field B = ' + B + ' T)';
  }

  pEl.addEventListener('change', update);
  vEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();