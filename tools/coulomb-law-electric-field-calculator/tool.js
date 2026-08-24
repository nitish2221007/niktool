(() => {
  'use strict';
  const qEl = document.getElementById('ef-q'), rEl = document.getElementById('ef-r');
  const eResEl = document.getElementById('ef-res-val'), vResEl = document.getElementById('ef-res-pot');

  const kCoulomb = 8.9875517923e9; // N*m^2 / C^2

  function update() {
    const qUc = parseFloat(qEl.value), rM = parseFloat(rEl.value);
    if (isNaN(qUc) || isNaN(rM) || qUc === 0 || rM <= 0) return;

    const qC = qUc * 1e-6;
    // E = (k * |q|) / r^2
    const E = (kCoulomb * Math.abs(qC)) / Math.pow(rM, 2);
    // V = (k * q) / r
    const V = (kCoulomb * qC) / rM;
    const vKv = V / 1000;

    eResEl.textContent = E.toExponential(2) + ' N/C (V/m)';
    vResEl.textContent = Math.abs(vKv) >= 1000 ? (vKv / 1000).toFixed(2) + ' MV' : vKv.toFixed(1) + ' kV';
  }

  qEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();