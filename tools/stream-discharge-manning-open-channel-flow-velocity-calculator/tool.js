(() => {
  'use strict';
  const bEl = document.getElementById('mn-b'), yEl = document.getElementById('mn-y');
  const sEl = document.getElementById('mn-s'), nEl = document.getElementById('mn-n');
  const qResEl = document.getElementById('mn-res-q'), vResEl = document.getElementById('mn-res-v');

  function update() {
    const b = parseFloat(bEl.value), y = parseFloat(yEl.value);
    const S = parseFloat(sEl.value), n = parseFloat(nEl.value);

    if (isNaN(b) || isNaN(y) || isNaN(S) || isNaN(n) || b <= 0 || y <= 0 || S <= 0 || n <= 0) return;

    // Cross-sectional Area A = b * y
    const Area = b * y;
    // Wetted perimeter P_wet = b + 2*y
    const P_wet = b + (2.0 * y);
    // Hydraulic radius R_h = A / P_wet
    const R_h = Area / P_wet;

    // Manning's equation for velocity: v = (1 / n) * R_h^(2/3) * S^(1/2)  [m/s]
    const v = (1.0 / n) * Math.pow(R_h, 2.0 / 3.0) * Math.sqrt(S);
    // Discharge Q = A * v  [m^3 / s]
    const Q = Area * v;

    qResEl.textContent = 'Discharge Q = ' + Q.toFixed(2) + ' m³ / s';
    vResEl.textContent = 'Velocity v = ' + v.toFixed(2) + ' m/s | R_h = ' + R_h.toFixed(3) + ' m (A = ' + Area.toFixed(2) + ' m², P_wet = ' + P_wet.toFixed(2) + ' m @ n = ' + n + ')';
  }

  [bEl, yEl, sEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();