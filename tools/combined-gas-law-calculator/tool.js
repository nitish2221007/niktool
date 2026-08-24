(() => {
  'use strict';
  const p1El = document.getElementById('cg-p1'), v1El = document.getElementById('cg-v1'), t1El = document.getElementById('cg-t1');
  const p2El = document.getElementById('cg-p2'), t2El = document.getElementById('cg-t2');
  const resEl = document.getElementById('cg-res-v2');

  function update() {
    const p1 = parseFloat(p1El.value), v1 = parseFloat(v1El.value), t1 = parseFloat(t1El.value);
    const p2 = parseFloat(p2El.value), t2 = parseFloat(t2El.value);

    if (isNaN(p1) || isNaN(v1) || isNaN(t1) || isNaN(p2) || isNaN(t2) || p1 <= 0 || v1 <= 0 || t1 <= 0 || p2 <= 0 || t2 <= 0) return;

    // V2 = (P1 * V1 * T2) / (T1 * P2)
    const v2 = (p1 * v1 * t2) / (t1 * p2);
    resEl.textContent = v2.toFixed(2) + ' volume units';
  }

  [p1El, v1El, t1El, p2El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();