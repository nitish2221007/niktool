(() => {
  'use strict';
  const odeEl = document.getElementById('eu-ode'), x0El = document.getElementById('eu-x0');
  const y0El = document.getElementById('eu-y0'), hEl = document.getElementById('eu-h');
  const valResEl = document.getElementById('eu-res-val'), errResEl = document.getElementById('eu-res-err');

  function f(type, x, y) {
    if (type === 'decay') return -y;
    if (type === 'linear') return 2.0 * x;
    return y;
  }

  function getExact(type, x) {
    if (type === 'decay') return Math.exp(-x);
    if (type === 'linear') return Math.pow(x, 2) + 1.0;
    return Math.exp(x);
  }

  function update() {
    const odeType = odeEl.value;
    let x = parseFloat(x0El.value), y = parseFloat(y0El.value);
    const h = parseFloat(hEl.value);
    const targetX = 1.0;

    if (isNaN(x) || isNaN(y) || isNaN(h) || h <= 0 || x >= targetX) return;

    let steps = 0;
    while (x < targetX - 1e-6 && steps < 1000) {
      const step_h = Math.min(h, targetX - x);
      y = y + step_h * f(odeType, x, y);
      x += step_h;
      steps++;
    }

    const exact = getExact(odeType, targetX);
    const err = y - exact;
    const pct = (err / exact) * 100.0;

    valResEl.textContent = 'Euler y(1.0) ≈ ' + y.toFixed(6) + ' (Exact = ' + exact.toFixed(6) + ')';
    errResEl.textContent = 'Global Error = ' + (err >= 0 ? '+' : '') + err.toFixed(6) + ' (' + pct.toFixed(2) + '% @ h = ' + h + ' in ' + steps + ' Steps)';
  }

  [odeEl, x0El, y0El, hEl].forEach(el => el.addEventListener('input', update));
  odeEl.addEventListener('change', update);
  update();
})();