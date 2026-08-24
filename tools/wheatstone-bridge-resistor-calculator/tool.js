(() => {
  'use strict';
  const r1El = document.getElementById('wb-r1'), r2El = document.getElementById('wb-r2'), r3El = document.getElementById('wb-r3');
  const rxEl = document.getElementById('wb-res-rx'), ratEl = document.getElementById('wb-res-ratio');

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value), r3 = parseFloat(r3El.value);
    if (isNaN(r1) || isNaN(r2) || isNaN(r3) || r1 <= 0 || r2 <= 0 || r3 <= 0) return;

    // Rx = (R2 * R3) / R1
    const rx = (r2 * r3) / r1;
    const ratio = r2 / r1;

    rxEl.textContent = rx >= 1000 ? (rx / 1000).toFixed(2) + ' kΩ' : rx.toFixed(2) + ' Ω';
    ratEl.textContent = ratio.toFixed(3);
  }

  [r1El, r2El, r3El].forEach(el => el.addEventListener('input', update));
  update();
})();