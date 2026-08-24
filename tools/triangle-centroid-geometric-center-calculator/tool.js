(() => {
  'use strict';
  const x1El = document.getElementById('tc-x1'), y1El = document.getElementById('tc-y1');
  const x2El = document.getElementById('tc-x2'), y2El = document.getElementById('tc-y2');
  const x3El = document.getElementById('tc-x3'), y3El = document.getElementById('tc-y3');
  const centEl = document.getElementById('tc-res-cent'), areaEl = document.getElementById('tc-res-area');

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value);
    const x3 = parseFloat(x3El.value), y3 = parseFloat(y3El.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3)) return;

    // Centroid = ((x1+x2+x3)/3, (y1+y2+y3)/3)
    const cx = (x1 + x2 + x3) / 3;
    const cy = (y1 + y2 + y3) / 3;

    // Area = 0.5 * |x1(y2-y3) + x2(y3-y1) + x3(y1-y2)|
    const area = 0.5 * Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));

    centEl.textContent = '(' + cx.toFixed(2) + ', ' + cy.toFixed(2) + ')';
    areaEl.textContent = area.toFixed(2) + ' sq units';
  }

  [x1El, y1El, x2El, y2El, x3El, y3El].forEach(el => el.addEventListener('input', update));
  update();
})();