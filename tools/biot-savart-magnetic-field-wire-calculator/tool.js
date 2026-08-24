(() => {
  'use strict';
  const iEl = document.getElementById('mag-i'), rEl = document.getElementById('mag-r');
  const bResEl = document.getElementById('mag-res-b'), gResEl = document.getElementById('mag-res-gauss');

  const mu0 = 4 * Math.PI * 1e-7; // T*m / A

  function update() {
    const I = parseFloat(iEl.value), rCm = parseFloat(rEl.value);
    if (isNaN(I) || isNaN(rCm) || I <= 0 || rCm <= 0) return;

    const rM = rCm / 100;
    // B = (mu0 * I) / (2 * pi * r)
    const B = (mu0 * I) / (2 * Math.PI * rM);
    const bMicroT = B * 1e6;
    const gauss = B * 10000; // 1 T = 10,000 Gauss

    bResEl.textContent = B.toExponential(2) + ' T (' + bMicroT.toFixed(1) + ' μT)';
    gResEl.textContent = gauss.toFixed(2) + ' Gauss (' + (bMicroT / 50).toFixed(1) + 'x Earth Field)';
  }

  iEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();