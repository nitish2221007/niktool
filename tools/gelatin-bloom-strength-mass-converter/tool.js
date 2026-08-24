(() => {
  'use strict';
  const m1El = document.getElementById('gel-m1'), b1El = document.getElementById('gel-b1'), b2El = document.getElementById('gel-b2');
  const m2ResEl = document.getElementById('gel-res-m2'), ratResEl = document.getElementById('gel-res-ratio');

  function update() {
    const m1 = parseFloat(m1El.value), b1 = parseFloat(b1El.value), b2 = parseFloat(b2El.value);
    if (isNaN(m1) || isNaN(b1) || isNaN(b2) || m1 <= 0) return;

    // Bloom conversion rule: m2 = m1 * sqrt( Bloom1 / Bloom2 )
    const ratio = Math.sqrt(b1 / b2);
    const m2 = m1 * ratio;

    m2ResEl.textContent = m2.toFixed(2) + ' g Target Gelatin';
    ratResEl.textContent = ratio.toFixed(3) + 'x Mass Multiplier (' + b1 + ' Bloom → ' + b2 + ' Bloom)';
  }

  [m1El, b1El, b2El].forEach(el => el.addEventListener('input', update));
  b1El.addEventListener('change', update);
  b2El.addEventListener('change', update);
  update();
})();