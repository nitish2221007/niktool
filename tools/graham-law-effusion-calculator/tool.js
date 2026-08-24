(() => {
  'use strict';
  const m1El = document.getElementById('gr-m1'), m2El = document.getElementById('gr-m2');
  const resEl = document.getElementById('gr-res-ratio');

  function update() {
    const m1 = parseFloat(m1El.value), m2 = parseFloat(m2El.value);
    if (isNaN(m1) || isNaN(m2) || m1 <= 0 || m2 <= 0) return;

    // Rate1 / Rate2 = sqrt(M2 / M1)
    const ratio = Math.sqrt(m2 / m1);
    resEl.textContent = ratio.toFixed(2) + 'x Faster';
  }

  m1El.addEventListener('input', update);
  m2El.addEventListener('input', update);
  update();
})();