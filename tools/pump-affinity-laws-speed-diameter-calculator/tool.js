(() => {
  'use strict';
  const n1El = document.getElementById('pal-n1'), n2El = document.getElementById('pal-n2');
  const q1El = document.getElementById('pal-q1'), h1El = document.getElementById('pal-h1'), p1El = document.getElementById('pal-p1');
  const q2ResEl = document.getElementById('pal-res-q2'), h2ResEl = document.getElementById('pal-res-h2'), p2ResEl = document.getElementById('pal-res-p2');

  function update() {
    const N1 = parseFloat(n1El.value), N2 = parseFloat(n2El.value);
    const Q1 = parseFloat(q1El.value), H1 = parseFloat(h1El.value), P1 = parseFloat(p1El.value);

    if (isNaN(N1) || isNaN(N2) || isNaN(Q1) || isNaN(H1) || isNaN(P1) || N1 <= 0 || N2 <= 0) return;

    const speedRatio = N2 / N1;

    // Q2 = Q1 * (N2 / N1)
    const Q2 = Q1 * speedRatio;
    // H2 = H1 * (N2 / N1)^2
    const H2 = H1 * Math.pow(speedRatio, 2);
    // P2 = P1 * (N2 / N1)^3
    const P2 = P1 * Math.pow(speedRatio, 3);
    const savingsPct = ((P1 - P2) / P1) * 100;

    q2ResEl.textContent = Math.round(Q2) + ' GPM';
    h2ResEl.textContent = H2.toFixed(1) + ' ft';
    p2ResEl.textContent = P2.toFixed(2) + ' HP (' + savingsPct.toFixed(1) + '% Energy Saved)';
  }

  [n1El, n2El, q1El, h1El, p1El].forEach(el => el.addEventListener('input', update));
  update();
})();