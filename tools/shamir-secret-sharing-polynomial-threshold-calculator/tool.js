(() => {
  'use strict';
  const sEl = document.getElementById('sss-sec'), pEl = document.getElementById('sss-p');
  const shResEl = document.getElementById('sss-res-shares'), rcResEl = document.getElementById('sss-res-recon');

  // Coefficients for polynomial f(x) = S + a1*x + a2*x^2
  const a1 = 125;
  const a2 = 32;

  function update() {
    const S = parseInt(sEl.value, 10), p = parseInt(pEl.value, 10);
    if (isNaN(S) || isNaN(p) || S < 0 || p <= S) return;

    // Generate 5 shares: f(x) = S + a1*x + a2*x^2 mod p for x = 1, 2, 3, 4, 5
    const shares = [];
    for (let x = 1; x <= 5; x++) {
      const y = (S + (a1 * x) + (a2 * x * x)) % p;
      shares.push('(' + x + ', ' + y + ')');
    }

    shResEl.textContent = 'Shares (k=3, n=5): ' + shares.join(', ');
    rcResEl.textContent = 'Master Secret S = ' + S + ' | Any 3 of 5 shares reconstruct S via Lagrange Interpolation mod ' + p;
  }

  sEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();