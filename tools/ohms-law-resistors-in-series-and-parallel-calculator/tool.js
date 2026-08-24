(() => {
  'use strict';
  const r1El = document.getElementById('res-r1'), r2El = document.getElementById('res-r2');
  const r3El = document.getElementById('res-r3'), vEl = document.getElementById('res-v');
  const parResEl = document.getElementById('res-res-par'), serResEl = document.getElementById('res-res-ser');

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    const r3 = parseFloat(r3El.value), V = parseFloat(vEl.value);

    if (isNaN(r1) || isNaN(r2) || isNaN(r3) || isNaN(V) || r1 <= 0 || r2 <= 0 || r3 <= 0 || V <= 0) return;

    // Series: R_ser = r1 + r2 + r3
    const R_ser = r1 + r2 + r3;
    const I_ser = V / R_ser;

    // Parallel: 1/R_par = 1/r1 + 1/r2 + 1/r3
    const inv_par = (1.0 / r1) + (1.0 / r2) + (1.0 / r3);
    const R_par = 1.0 / inv_par;
    const I_par = V / R_par;

    parResEl.textContent = 'Parallel R_eq = ' + R_par.toFixed(2) + ' Ω (Total I = ' + I_par.toFixed(2) + ' A)';
    serResEl.textContent = 'Series R_eq = ' + R_ser.toFixed(1) + ' Ω (I = ' + I_ser.toFixed(2) + ' A | V_drops: ' + (I_ser*r1).toFixed(1) + 'V, ' + (I_ser*r2).toFixed(1) + 'V, ' + (I_ser*r3).toFixed(1) + 'V)';
  }

  [r1El, r2El, r3El, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();