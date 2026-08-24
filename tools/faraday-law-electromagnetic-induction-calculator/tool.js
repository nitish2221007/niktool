(() => {
  'use strict';
  const nEl = document.getElementById('far-n'), phiEl = document.getElementById('far-dphi'), tEl = document.getElementById('far-dt');
  const emfResEl = document.getElementById('far-res-emf'), rResEl = document.getElementById('far-res-rate');

  function update() {
    const N = parseInt(nEl.value, 10), dPhiMwb = parseFloat(phiEl.value), dtMs = parseFloat(tEl.value);
    if (isNaN(N) || isNaN(dPhiMwb) || isNaN(dtMs) || N < 1 || dtMs <= 0) return;

    const dPhiWb = dPhiMwb * 1e-3;
    const dtSec = dtMs * 1e-3;

    // Rate = dPhi / dt (Webers / sec = Volts)
    const rate = dPhiWb / dtSec;
    // EMF = N * (dPhi / dt)
    const emf = N * rate;

    emfResEl.textContent = Math.abs(emf).toFixed(2) + ' Volts';
    rResEl.textContent = rate.toFixed(3) + ' Wb / s';
  }

  [nEl, phiEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();