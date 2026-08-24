(() => {
  'use strict';
  const lEl = document.getElementById('rm-len'), wEl = document.getElementById('rm-wid'), hEl = document.getElementById('rm-hgt');
  const fResEl = document.getElementById('rm-res-fund'), mResEl = document.getElementById('rm-res-modes');

  const c_sound = 343.0; // m / s

  function update() {
    const L = parseFloat(lEl.value), W = parseFloat(wEl.value), H = parseFloat(hEl.value);
    if (isNaN(L) || isNaN(W) || isNaN(H) || L <= 0 || W <= 0 || H <= 0) return;

    // Fundamental axial modes: f = c / (2 * dim)
    const fL1 = c_sound / (2 * L);
    const fW1 = c_sound / (2 * W);
    const fH1 = c_sound / (2 * H);

    // Schroeder frequency approx f_sch = 2000 * sqrt( RT60 / V ) where assume RT60 ~ 0.4s
    const V = L * W * H;
    const fSchroeder = 2000 * Math.sqrt(0.4 / V);

    const minFund = Math.min(fL1, fW1, fH1);

    fResEl.textContent = minFund.toFixed(1) + ' Hz (Lowest Fundamental Axial Mode)';
    mResEl.textContent = 'Axial Modes: ' + fL1.toFixed(1) + ' Hz (L) | ' + fW1.toFixed(1) + ' Hz (W) | ' + fH1.toFixed(1) + ' Hz (H) | Schroeder: ' + Math.round(fSchroeder) + ' Hz';
  }

  [lEl, wEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();