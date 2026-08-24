(() => {
  'use strict';
  const liqEl = document.getElementById('tve-liquid'), v0El = document.getElementById('tve-v0'), dtEl = document.getElementById('tve-dt');
  const dEl = document.getElementById('tve-res-delta'), totEl = document.getElementById('tve-res-tot');

  function update() {
    const beta = parseFloat(liqEl.value), v0 = parseFloat(v0El.value), dt = parseFloat(dtEl.value);
    if (isNaN(beta) || isNaN(v0) || isNaN(dt) || v0 <= 0 || dt === 0) return;

    // Delta V = beta * V0 * DeltaT
    const deltaV = beta * v0 * dt;
    const finalV = v0 + deltaV;

    dEl.textContent = (deltaV >= 0 ? '+' : '') + deltaV.toFixed(2) + ' Liters';
    totEl.textContent = finalV.toFixed(2) + ' Liters';
  }

  liqEl.addEventListener('change', update);
  v0El.addEventListener('input', update);
  dtEl.addEventListener('input', update);
  update();
})();