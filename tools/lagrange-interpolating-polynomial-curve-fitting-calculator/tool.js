(() => {
  'use strict';
  const x1El = document.getElementById('lg-x1'), y1El = document.getElementById('lg-y1');
  const x2El = document.getElementById('lg-x2'), y2El = document.getElementById('lg-y2');
  const x3El = document.getElementById('lg-x3'), y3El = document.getElementById('lg-y3');
  const xeEl = document.getElementById('lg-xeval');
  const vResEl = document.getElementById('lg-res-val'), pResEl = document.getElementById('lg-res-poly');

  function update() {
    const x1 = parseFloat(x1El.value), y1 = parseFloat(y1El.value);
    const x2 = parseFloat(x2El.value), y2 = parseFloat(y2El.value);
    const x3 = parseFloat(x3El.value), y3 = parseFloat(y3El.value);
    const x = parseFloat(xeEl.value);

    if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2) || isNaN(x3) || isNaN(y3) || isNaN(x)) return;
    if (x1 === x2 || x1 === x3 || x2 === x3) return; // distinct x required

    // Lagrange Basis:
    // L1 = (x - x2)(x - x3) / ( (x1 - x2)(x1 - x3) )
    const L1 = ((x - x2) * (x - x3)) / ((x1 - x2) * (x1 - x3));
    const L2 = ((x - x1) * (x - x3)) / ((x2 - x1) * (x2 - x3));
    const L3 = ((x - x1) * (x - x2)) / ((x3 - x1) * (x3 - x2));

    const P_x = y1 * L1 + y2 * L2 + y3 * L3;

    vResEl.textContent = 'P(' + x + ') = ' + P_x.toFixed(2);
    pResEl.textContent = 'Lagrange Weights: L₁=' + L1.toFixed(2) + ', L₂=' + L2.toFixed(2) + ', L₃=' + L3.toFixed(2) + ' (Points: (' + x1 + ',' + y1 + '), (' + x2 + ',' + y2 + '), (' + x3 + ',' + y3 + '))';
  }

  [x1El, y1El, x2El, y2El, x3El, y3El, xeEl].forEach(el => el.addEventListener('input', update));
  update();
})();