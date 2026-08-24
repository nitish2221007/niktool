(() => {
  'use strict';
  const fnEl = document.getElementById('bi-fn'), aEl = document.getElementById('bi-a'), bEl = document.getElementById('bi-b');
  const rtResEl = document.getElementById('bi-res-root'), stResEl = document.getElementById('bi-res-steps');

  function evalF(type, x) {
    if (type === 'x3_x_2') return Math.pow(x, 3) - x - 2;
    if (type === 'cos_x') return Math.cos(x) - x;
    return Math.pow(x, 2) - 3;
  }

  function update() {
    const fnType = fnEl.value;
    let a = parseFloat(aEl.value), b = parseFloat(bEl.value);

    if (isNaN(a) || isNaN(b) || a >= b) return;

    let fa = evalF(fnType, a), fb = evalF(fnType, b);
    if (fa * fb > 0) {
      rtResEl.textContent = 'INVALID BRACKET (f(a) and f(b) have same sign)';
      stResEl.textContent = 'f(' + a + ') = ' + fa.toFixed(2) + ', f(' + b + ') = ' + fb.toFixed(2) + ' (Opposite signs required by Bolzano Theorem)';
      return;
    }

    let mid = (a + b) / 2.0;
    let iter = 0;
    const tol = 1e-4;

    while ((b - a) / 2.0 > tol && iter < 100) {
      mid = (a + b) / 2.0;
      const fmid = evalF(fnType, mid);
      if (Math.abs(fmid) < 1e-12) break;

      if (fa * fmid < 0) {
        b = mid;
        fb = fmid;
      } else {
        a = mid;
        fa = fmid;
      }
      iter++;
    }

    rtResEl.textContent = 'Root x* ≈ ' + mid.toFixed(6);
    stResEl.textContent = 'Converged in ' + iter + ' bisections (Final interval width = ' + (b - a).toExponential(2) + ' | f(x*) = ' + evalF(fnType, mid).toExponential(2) + ')';
  }

  [fnEl, aEl, bEl].forEach(el => el.addEventListener('input', update));
  fnEl.addEventListener('change', update);
  update();
})();