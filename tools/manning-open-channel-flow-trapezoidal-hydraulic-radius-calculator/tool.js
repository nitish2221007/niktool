(() => {
  'use strict';
  const bEl = document.getElementById('mn-b'), yEl = document.getElementById('mn-y');
  const zEl = document.getElementById('mn-z'), sEl = document.getElementById('mn-s'), nEl = document.getElementById('mn-n');
  const qResEl = document.getElementById('mn-res-q'), gmResEl = document.getElementById('mn-res-geom');

  function update() {
    const b = parseFloat(bEl.value), y = parseFloat(yEl.value);
    const z = parseFloat(zEl.value), S = parseFloat(sEl.value), n = parseFloat(nEl.value);

    if (isNaN(b) || isNaN(y) || isNaN(z) || isNaN(S) || isNaN(n) || b <= 0 || y <= 0 || z < 0 || S <= 0 || n <= 0) return;

    // Cross-sectional area: A = (b + z*y) * y  [m^2]
    const A = (b + (z * y)) * y;

    // Wetted perimeter: P = b + 2 * y * sqrt(1 + z^2)  [m]
    const P = b + (2.0 * y * Math.sqrt(1.0 + Math.pow(z, 2)));

    // Hydraulic radius: R_h = A / P  [m]
    const R_h = A / P;

    // Mean velocity: v = (1 / n) * R_h^(2/3) * S^(1/2)  [m / s]
    const v = (1.0 / n) * Math.pow(R_h, 2.0 / 3.0) * Math.sqrt(S);

    // Discharge: Q = v * A  [m^3 / s]
    const Q = v * A;

    qResEl.textContent = 'Discharge Q = ' + Q.toFixed(2) + ' m³ / s (' + Math.round(Q * 1000).toLocaleString() + ' L/s)';
    gmResEl.textContent = 'Velocity v = ' + v.toFixed(2) + ' m/s | Area A = ' + A.toFixed(2) + ' m² | R_h = ' + R_h.toFixed(3) + ' m (Perimeter P = ' + P.toFixed(2) + ' m)';
  }

  [bEl, yEl, zEl, sEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();