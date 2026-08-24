(() => {
  'use strict';
  const p1El = document.getElementById('ber-p1'), v1El = document.getElementById('ber-v1');
  const v2El = document.getElementById('ber-v2'), rhoEl = document.getElementById('ber-rho');
  const p2El = document.getElementById('ber-res-p2'), dropEl = document.getElementById('ber-res-drop');

  function update() {
    const p1Kpa = parseFloat(p1El.value), v1 = parseFloat(v1El.value);
    const v2 = parseFloat(v2El.value), rho = parseFloat(rhoEl.value);
    if (isNaN(p1Kpa) || isNaN(v1) || isNaN(v2) || isNaN(rho) || rho <= 0 || v1 < 0 || v2 < 0) return;

    const p1Pa = p1Kpa * 1000;
    // P1 + 0.5*rho*v1^2 = P2 + 0.5*rho*v2^2 => P2 = P1 + 0.5*rho*(v1^2 - v2^2)
    const p2Pa = p1Pa + 0.5 * rho * (Math.pow(v1, 2) - Math.pow(v2, 2));
    const p2Kpa = p2Pa / 1000;
    const dropKpa = p2Kpa - p1Kpa;

    p2El.textContent = p2Kpa.toFixed(2) + ' kPa';
    dropEl.textContent = (dropKpa >= 0 ? '+' : '') + dropKpa.toFixed(2) + ' kPa';
  }

  [p1El, v1El, v2El, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();