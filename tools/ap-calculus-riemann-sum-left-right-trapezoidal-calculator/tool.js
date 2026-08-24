(() => {
  'use strict';
  const aEl = document.getElementById('rs-a'), bEl = document.getElementById('rs-b'), nEl = document.getElementById('rs-n');
  const trResEl = document.getElementById('rs-res-trap'), lrResEl = document.getElementById('rs-res-lr');

  // Benchmark function f(x) = x^2 + 2x + 1
  function f(x) { return (x * x) + (2.0 * x) + 1.0; }
  // Exact antiderivative F(x) = x^3/3 + x^2 + x
  function F(x) { return (Math.pow(x, 3) / 3.0) + Math.pow(x, 2) + x; }

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(a) || isNaN(b) || isNaN(n) || b <= a || n < 1) return;

    const dx = (b - a) / n;
    let leftSum = 0, rightSum = 0, midSum = 0;

    for (let i = 0; i < n; i++) {
      const x_left = a + (i * dx);
      const x_right = a + ((i + 1) * dx);
      const x_mid = a + ((i + 0.5) * dx);

      leftSum += f(x_left) * dx;
      rightSum += f(x_right) * dx;
      midSum += f(x_mid) * dx;
    }

    // Trapezoidal rule = (Left + Right) / 2
    const trapSum = (leftSum + rightSum) / 2.0;
    const exact = F(b) - F(a);

    trResEl.textContent = 'Trapezoid = ' + trapSum.toFixed(3) + ' (Exact: ' + exact.toFixed(3) + ' | Δx = ' + dx.toFixed(2) + ')';
    lrResEl.textContent = 'Left LRAM = ' + leftSum.toFixed(3) + ' | Right RRAM = ' + rightSum.toFixed(3) + ' | Midpoint MRAM = ' + midSum.toFixed(3) + ' (n = ' + n + ')';
  }

  [aEl, bEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();