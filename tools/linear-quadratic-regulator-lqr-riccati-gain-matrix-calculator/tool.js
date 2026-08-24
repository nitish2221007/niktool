(() => {
  'use strict';
  const aEl = document.getElementById('lq-a'), bEl = document.getElementById('lq-b');
  const qEl = document.getElementById('lq-q'), rEl = document.getElementById('lq-r');
  const kResEl = document.getElementById('lq-res-k'), rcResEl = document.getElementById('lq-res-ricc');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const q = parseFloat(qEl.value), r = parseFloat(rEl.value);

    if (isNaN(a) || isNaN(b) || isNaN(q) || isNaN(r) || b === 0 || q < 0 || r <= 0) return;

    // Algebraic Riccati Equation for 1D scalar: 2*a*P - (b^2 / r)*P^2 + q = 0
    // Quadratic in P: (b^2/r)*P^2 - (2*a)*P - q = 0
    const A_coef = Math.pow(b, 2) / r;
    const B_coef = -2.0 * a;
    const C_coef = -q;

    // Positive stabilizing root of quadratic:
    const disc = Math.pow(B_coef, 2) - (4.0 * A_coef * C_coef);
    const P = (-B_coef + Math.sqrt(disc)) / (2.0 * A_coef);

    // Optimal gain: K = (b * P) / r
    const K = (b * P) / r;

    // Closed loop pole: a_cl = a - b * K
    const a_cl = a - (b * K);

    kResEl.textContent = 'Optimal Gain K = ' + K.toFixed(2) + ' (u = -' + K.toFixed(2) + '·x)';
    rcResEl.textContent = 'Riccati P = ' + P.toFixed(3) + ' | Closed-Loop Pole s = ' + a_cl.toFixed(2) + ' (q/r = ' + (q/r).toFixed(1) + ' @ a=' + a + ')';
  }

  [aEl, bEl, qEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();