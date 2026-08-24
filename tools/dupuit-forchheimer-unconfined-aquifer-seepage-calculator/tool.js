(() => {
  'use strict';
  const kEl = document.getElementById('df-k'), h1El = document.getElementById('df-h1');
  const h2El = document.getElementById('df-h2'), lEl = document.getElementById('df-l');
  const qResEl = document.getElementById('df-res-q'), mdResEl = document.getElementById('df-res-mid');

  function update() {
    const K = parseFloat(kEl.value), h1 = parseFloat(h1El.value);
    const h2 = parseFloat(h2El.value), L = parseFloat(lEl.value);

    if (isNaN(K) || isNaN(h1) || isNaN(h2) || isNaN(L) || K <= 0 || h1 <= h2 || h2 <= 0 || L <= 0) return;

    // Dupuit formula: q = K * (h1^2 - h2^2) / (2 * L)  [m^3 / (day * m)]
    const q = (K * (Math.pow(h1, 2) - Math.pow(h2, 2))) / (2.0 * L);

    // Midpoint water table height at x = L / 2: h(x) = sqrt( h1^2 - (h1^2 - h2^2)*x/L )
    const h_mid = Math.sqrt(Math.pow(h1, 2) - 0.5 * (Math.pow(h1, 2) - Math.pow(h2, 2)));

    qResEl.textContent = 'Seepage q = ' + q.toFixed(2) + ' m³ / day / m';
    mdResEl.textContent = 'Midpoint Head h(L/2) = ' + h_mid.toFixed(2) + ' m (Drop = ' + (h1 - h2).toFixed(1) + ' m over ' + L + ' m)';
  }

  [kEl, h1El, h2El, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();