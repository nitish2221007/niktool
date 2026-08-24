(() => {
  'use strict';
  const legEl = document.getElementById('wld-leg'), lenEl = document.getElementById('wld-len'), elEl = document.getElementById('wld-elec');
  const totResEl = document.getElementById('wld-res-tot'), unResEl = document.getElementById('wld-res-unit');

  const phi = 0.75;

  function update() {
    const w = parseFloat(legEl.value), L = parseFloat(lenEl.value), Fexx = parseFloat(elEl.value);
    if (isNaN(w) || isNaN(L) || isNaN(Fexx) || w <= 0 || L <= 0) return;

    // Effective throat te = 0.707 * w
    const te = 0.70710678 * w;
    // Nominal weld shear strength per inch = 0.60 * Fexx * te (kips/in)
    const Rn_per_in = 0.60 * Fexx * te;
    const phiRn_per_in = phi * Rn_per_in;
    const totalPhiRn = phiRn_per_in * L;
    const totalKn = totalPhiRn * 4.44822;

    totResEl.textContent = totalPhiRn.toFixed(2) + ' kips (' + totalKn.toFixed(1) + ' kN)';
    unResEl.textContent = phiRn_per_in.toFixed(2) + ' kips / inch (Effective Throat ' + te.toFixed(3) + ' in)';
  }

  [legEl, lenEl, elEl].forEach(el => el.addEventListener('input', update));
  update();
})();