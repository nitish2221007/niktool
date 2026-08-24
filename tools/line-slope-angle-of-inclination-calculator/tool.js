(() => {
  'use strict';
  const x1El = document.getElementById('ls-x1'), y1El = document.getElementById('ls-y1');
  const x2El = document.getElementById('ls-x2'), y2El = document.getElementById('ls-y2');
  const sEl = document.getElementById('ls-res-slope'), aEl = document.getElementById('ls-res-angle'), pEl = document.getElementById('ls-res-perp');

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) return;

    const dx = x2 - x1;
    const dy = y2 - y1;

    if (dx === 0) {
      sEl.textContent = 'm = Undefined (Vertical)';
      aEl.textContent = '90.00°';
      pEl.textContent = 'm_perp = 0.000 (Horizontal)';
      return;
    }

    const m = dy / dx;
    const rad = Math.atan(m);
    const deg = (rad * 180) / Math.PI;
    const angleDeg = deg >= 0 ? deg : deg + 180;

    const perp = m !== 0 ? -1 / m : 'Undefined (Vertical)';

    sEl.textContent = 'm = ' + m.toFixed(3);
    aEl.textContent = angleDeg.toFixed(2) + '°';
    pEl.textContent = typeof perp === 'number' ? 'm_perp = ' + perp.toFixed(3) : perp;
  }

  [x1El, y1El, x2El, y2El].forEach(el => el.addEventListener('input', update));
  update();
})();