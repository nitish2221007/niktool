(() => {
  'use strict';
  const qEl = document.getElementById('eq-q'), fcEl = document.getElementById('eq-fc');
  const octResEl = document.getElementById('eq-res-oct'), spResEl = document.getElementById('eq-res-span');

  function update() {
    const Q = parseFloat(qEl.value), fc = parseFloat(fcEl.value);
    if (isNaN(Q) || isNaN(fc) || Q <= 0 || fc <= 0) return;

    // N (octaves) = (2 / ln(2)) * asinh(1 / (2*Q))
    const N = (2 / Math.LN2) * Math.asinh(1 / (2 * Q));

    // f_L and f_H bounds
    const fL = fc * (Math.sqrt(1 + (1 / (4 * Math.pow(Q, 2)))) - (1 / (2 * Q)));
    const fH = fc * (Math.sqrt(1 + (1 / (4 * Math.pow(Q, 2)))) + (1 / (2 * Q)));

    octResEl.textContent = N.toFixed(2) + ' Octaves';
    spResEl.textContent = Math.round(fL) + ' Hz to ' + Math.round(fH) + ' Hz (Δf = ' + Math.round(fH - fL) + ' Hz)';
  }

  qEl.addEventListener('input', update);
  fcEl.addEventListener('input', update);
  update();
})();