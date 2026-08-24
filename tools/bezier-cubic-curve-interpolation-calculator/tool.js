(() => {
  'use strict';
  const x1El = document.getElementById('bz-x1'), y1El = document.getElementById('bz-y1');
  const x2El = document.getElementById('bz-x2'), y2El = document.getElementById('bz-y2'), tEl = document.getElementById('bz-t');
  const pResEl = document.getElementById('bz-res-pt'), tgResEl = document.getElementById('bz-res-tang');

  const P0 = { x: 0.0, y: 0.0 };
  const P3 = { x: 1.0, y: 1.0 };

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value), t = parseFloat(tEl.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(t) || t < 0 || t > 1) return;

    const u = 1 - t;
    const Bx = (Math.pow(u, 3) * P0.x) + (3 * Math.pow(u, 2) * t * x1) + (3 * u * Math.pow(t, 2) * x2) + (Math.pow(t, 3) * P3.x);
    const By = (Math.pow(u, 3) * P0.y) + (3 * Math.pow(u, 2) * t * y1) + (3 * u * Math.pow(t, 2) * y2) + (Math.pow(t, 3) * P3.y);

    const dBx = (3 * Math.pow(u, 2) * (x1 - P0.x)) + (6 * u * t * (x2 - x1)) + (3 * Math.pow(t, 2) * (P3.x - x2));
    const dBy = (3 * Math.pow(u, 2) * (y1 - P0.y)) + (6 * u * t * (y2 - y1)) + (3 * Math.pow(t, 2) * (P3.y - y2));
    const slope = dBx !== 0 ? (dBy / dBx) : 9999;

    pResEl.textContent = 'B(' + t.toFixed(2) + ') = (' + Bx.toFixed(3) + ', ' + By.toFixed(3) + ')';
    tgResEl.textContent = 'Tangent: (' + dBx.toFixed(3) + ', ' + dBy.toFixed(3) + ') | Slope m = ' + slope.toFixed(3) + ' (Angle: ' + ((Math.atan2(dBy, dBx) * 180) / Math.PI).toFixed(1) + '°)';
  }

  [x1El, y1El, x2El, y2El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();