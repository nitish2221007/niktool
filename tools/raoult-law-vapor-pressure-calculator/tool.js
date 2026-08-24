(() => {
  'use strict';
  const x1El = document.getElementById('rl-x1'), p1El = document.getElementById('rl-p1'), p2El = document.getElementById('rl-p2');
  const totEl = document.getElementById('rl-res-ptot'), y1El = document.getElementById('rl-res-y1');

  function update() {
    const xA = parseFloat(x1El.value), pA0 = parseFloat(p1El.value), pB0 = parseFloat(p2El.value);
    if (isNaN(xA) || isNaN(pA0) || isNaN(pB0) || xA < 0 || xA > 1 || pA0 <= 0 || pB0 <= 0) return;

    const xB = 1 - xA;
    // Partial pressures: P_A = x_A * P_A0, P_B = x_B * P_B0
    const pA = xA * pA0;
    const pB = xB * pB0;
    const pTot = pA + pB;
    // Vapor composition y_A = P_A / P_tot
    const yA = pA / pTot;

    totEl.textContent = pTot.toFixed(2) + ' kPa';
    y1El.textContent = yA.toFixed(3) + ' (' + (yA * 100).toFixed(1) + '% A in vapor)';
  }

  [x1El, p1El, p2El].forEach(el => el.addEventListener('input', update));
  update();
})();