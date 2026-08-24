(() => {
  'use strict';
  const p1El = document.getElementById('gl-p1'), t1El = document.getElementById('gl-t1'), t2El = document.getElementById('gl-t2');
  const p2El = document.getElementById('gl-res-p2');

  function update() {
    const p1 = parseFloat(p1El.value), t1 = parseFloat(t1El.value), t2 = parseFloat(t2El.value);
    if (isNaN(p1) || isNaN(t1) || isNaN(t2) || p1 <= 0 || t1 <= 0 || t2 <= 0) return;

    // P2 = P1 * (T2 / T1)
    const p2 = p1 * (t2 / t1);
    p2El.textContent = p2.toFixed(3) + ' pressure units';
  }

  [p1El, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();