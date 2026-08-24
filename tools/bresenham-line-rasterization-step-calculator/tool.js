(() => {
  'use strict';
  const x0El = document.getElementById('br-x0'), y0El = document.getElementById('br-y0');
  const x1El = document.getElementById('br-x1'), y1El = document.getElementById('br-y1');
  const cResEl = document.getElementById('br-res-cnt'), lResEl = document.getElementById('br-res-list');

  function update() {
    let x0 = parseInt(x0El.value, 10), y0 = parseInt(y0El.value, 10);
    let x1 = parseInt(x1El.value, 10), y1 = parseInt(y1El.value, 10);

    if (isNaN(x0) || isNaN(y0) || isNaN(x1) || isNaN(y1)) return;

    const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    const pixels = [];
    let curX = x0, curY = y0;

    while (true) {
      pixels.push('(' + curX + ',' + curY + ')');
      if (curX === x1 && curY === y1) break;
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        curX += sx;
      }
      if (e2 < dx) {
        err += dx;
        curY += sy;
      }
      if (pixels.length > 500) break;
    }

    cResEl.textContent = pixels.length + ' Pixels Rasterized (Δx=' + dx + ', Δy=' + dy + ')';
    lResEl.textContent = pixels.slice(0, 10).join(' -> ') + (pixels.length > 10 ? ' ... -> (' + x1 + ',' + y1 + ')' : '');
  }

  [x0El, y0El, x1El, y1El].forEach(el => el.addEventListener('input', update));
  update();
})();