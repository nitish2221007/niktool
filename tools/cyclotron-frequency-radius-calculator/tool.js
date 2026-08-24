(() => {
  'use strict';
  const pEl = document.getElementById('cyc-part'), bEl = document.getElementById('cyc-b'), vEl = document.getElementById('cyc-v');
  const fResEl = document.getElementById('cyc-res-freq'), rResEl = document.getElementById('cyc-res-rad');

  function update() {
    const [m, q] = pEl.value.split(',').map(Number);
    const B = parseFloat(bEl.value), v = parseFloat(vEl.value);
    if (isNaN(B) || isNaN(v) || B <= 0 || v <= 0 || !m || !q) return;

    // f_c = (q * B) / (2 * pi * m)
    const fHz = (q * B) / (2 * Math.PI * m);
    // r_L = (m * v) / (q * B)
    const rM = (m * v) / (q * B);

    const fGhz = fHz / 1e9;
    const fMhz = fHz / 1e6;
    fResEl.textContent = fGhz >= 1.0 ? fGhz.toFixed(2) + ' GHz' : fMhz.toFixed(2) + ' MHz';

    const rUm = rM * 1e6;
    const rMm = rM * 1000;
    rResEl.textContent = rM >= 1.0 ? rM.toFixed(2) + ' meters' : (rMm >= 1.0 ? rMm.toFixed(2) + ' mm' : rUm.toFixed(2) + ' μm');
  }

  pEl.addEventListener('change', update);
  bEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();