(() => {
  'use strict';
  const fnEl = document.getElementById('sp-fn'), aEl = document.getElementById('sp-a');
  const bEl = document.getElementById('sp-b'), nEl = document.getElementById('sp-n');
  const intResEl = document.getElementById('sp-res-int'), stpResEl = document.getElementById('sp-res-step');

  function evalF(type, x) {
    if (type === 'sin') return Math.sin(x);
    if (type === 'x2') return Math.pow(x, 2);
    if (type === 'exp') return Math.exp(x);
    return 1.0 / (1.0 + Math.pow(x, 2));
  }

  function update() {
    const fnType = fnEl.value;
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    let n = parseInt(nEl.value, 10);

    if (isNaN(a) || isNaN(b) || isNaN(n) || n < 2 || a >= b) return;
    if (n % 2 !== 0) n += 1; // force even

    const h = (b - a) / n;
    let sum = evalF(fnType, a) + evalF(fnType, b);

    for (let i = 1; i < n; i++) {
      const x_i = a + i * h;
      const weight = (i % 2 === 1) ? 4.0 : 2.0;
      sum += weight * evalF(fnType, x_i);
    }

    const integral = (h / 3.0) * sum;

    intResEl.textContent = 'Integral I ≈ ' + integral.toFixed(6);
    stpResEl.textContent = 'Step Size h = ' + h.toFixed(4) + ' | n = ' + n + ' intervals (h/3 · [f₀ + 4·Σf_odd + 2·Σf_even + f_n])';
  }

  [fnEl, aEl, bEl, nEl].forEach(el => el.addEventListener('input', update));
  fnEl.addEventListener('change', update);
  update();
})();