(() => {
  'use strict';
  const fnEl = document.getElementById('nr-fn'), x0El = document.getElementById('nr-x0');
  const rtResEl = document.getElementById('nr-res-root'), itResEl = document.getElementById('nr-res-iter');

  function getFandFprime(type, x) {
    if (type === 'x3_x_2') {
      return { f: Math.pow(x, 3) - x - 2, df: 3 * Math.pow(x, 2) - 1 };
    } else if (type === 'cos_x') {
      return { f: Math.cos(x) - x, df: -Math.sin(x) - 1 };
    } else if (type === 'x2_5') {
      return { f: Math.pow(x, 2) - 5, df: 2 * x };
    } else {
      return { f: Math.exp(x) - 3 * x, df: Math.exp(x) - 3 };
    }
  }

  function update() {
    const fnType = fnEl.value;
    let x = parseFloat(x0El.value);
    if (isNaN(x)) return;

    let history = [x.toFixed(3)];
    let iter = 0;
    const maxIter = 50, tol = 1e-8;

    while (iter < maxIter) {
      const { f, df } = getFandFprime(fnType, x);
      if (Math.abs(df) < 1e-12) break; // stationary point

      const x_next = x - (f / df);
      history.push(x_next.toFixed(3));

      if (Math.abs(x_next - x) < tol) {
        x = x_next;
        break;
      }
      x = x_next;
      iter++;
    }

    const { f } = getFandFprime(fnType, x);

    rtResEl.textContent = 'Root x* ≈ ' + x.toFixed(8);
    itResEl.textContent = 'Converged in ' + history.length + ' steps | ' + history.slice(0, 5).join(' -> ') + (history.length > 5 ? ' ...' : '') + ' (f(x*) = ' + f.toExponential(2) + ')';
  }

  fnEl.addEventListener('change', update);
  x0El.addEventListener('input', update);
  update();
})();