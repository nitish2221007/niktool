(() => {
  'use strict';
  const fnEl = document.getElementById('tp-fn'), aEl = document.getElementById('tp-a');
  const bEl = document.getElementById('tp-b'), nEl = document.getElementById('tp-n');
  const intResEl = document.getElementById('tp-res-int'), errResEl = document.getElementById('tp-res-err');

  function evalF(type, x) {
    if (type === 'x2') return Math.pow(x, 2);
    if (type === 'sin') return Math.sin(x);
    return Math.exp(x);
  }

  function getExact(type, a, b) {
    if (type === 'x2') return (Math.pow(b, 3) - Math.pow(a, 3)) / 3.0;
    if (type === 'sin') return -Math.cos(b) - (-Math.cos(a));
    return Math.exp(b) - Math.exp(a);
  }

  function update() {
    const fnType = fnEl.value;
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const n = parseInt(nEl.value, 10);

    if (isNaN(a) || isNaN(b) || isNaN(n) || n < 1 || a >= b) return;

    const h = (b - a) / n;
    let sum = 0.5 * (evalF(fnType, a) + evalF(fnType, b));

    for (let i = 1; i < n; i++) {
      sum += evalF(fnType, a + i * h);
    }

    const approx = h * sum;
    const exact = getExact(fnType, a, b);
    const err = approx - exact;
    const pct = (err / exact) * 100.0;

    intResEl.textContent = 'Integral I ≈ ' + approx.toFixed(4) + ' (Exact = ' + exact.toFixed(4) + ')';
    errResEl.textContent = 'Step h = ' + h.toFixed(3) + ' | Error = ' + (err >= 0 ? '+' : '') + err.toFixed(4) + ' (' + (pct >= 0 ? '+' : '') + pct.toFixed(2) + '% across ' + n + ' trapezoids)';
  }

  [fnEl, aEl, bEl, nEl].forEach(el => el.addEventListener('input', update));
  fnEl.addEventListener('change', update);
  update();
})();