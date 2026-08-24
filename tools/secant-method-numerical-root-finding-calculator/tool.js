(() => {
  'use strict';
  const fnEl = document.getElementById('sc-fn'), x0El = document.getElementById('sc-x0'), x1El = document.getElementById('sc-x1');
  const rtResEl = document.getElementById('sc-res-root'), itResEl = document.getElementById('sc-res-iter');

  function evalF(type, x) {
    if (type === 'x3_x_2') return Math.pow(x, 3) - x - 2;
    if (type === 'cos_x') return Math.cos(x) - x;
    return Math.pow(x, 2) - 7;
  }

  function update() {
    const fnType = fnEl.value;
    let x_prev = parseFloat(x0El.value), x_curr = parseFloat(x1El.value);

    if (isNaN(x_prev) || isNaN(x_curr) || x_prev === x_curr) return;

    let iter = 0;
    const maxIter = 50, tol = 1e-7;

    while (iter < maxIter) {
      const f_prev = evalF(fnType, x_prev);
      const f_curr = evalF(fnType, x_curr);

      if (Math.abs(f_curr - f_prev) < 1e-12) break;

      const x_next = x_curr - f_curr * ((x_curr - x_prev) / (f_curr - f_prev));

      if (Math.abs(x_next - x_curr) < tol) {
        x_curr = x_next;
        break;
      }

      x_prev = x_curr;
      x_curr = x_next;
      iter++;
    }

    rtResEl.textContent = 'Root x* ≈ ' + x_curr.toFixed(6);
    itResEl.textContent = 'Converged in ' + iter + ' secant iterations (f(x*) = ' + evalF(fnType, x_curr).toExponential(2) + ' | No derivatives required)';
  }

  [fnEl, x0El, x1El].forEach(el => el.addEventListener('input', update));
  fnEl.addEventListener('change', update);
  update();
})();