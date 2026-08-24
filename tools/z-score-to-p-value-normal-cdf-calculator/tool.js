(() => {
  'use strict';
  const zEl = document.getElementById('zp-z');
  const twoEl = document.getElementById('zp-res-two'), oneEl = document.getElementById('zp-res-one'), cdfEl = document.getElementById('zp-res-cdf');

  // Error function approximation
  function erf(x) {
    const a1 =  0.254829592, a2 = -0.284496736, a3 =  1.421413741;
    const a4 = -1.453152027, a5 =  1.061405429, p  =  0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  function normCDF(z) {
    return 0.5 * (1 + erf(z / Math.SQRT2));
  }

  function update() {
    const z = parseFloat(zEl.value);
    if (isNaN(z)) return;

    const cdf = normCDF(z);
    const absZ = Math.abs(z);
    const twoTail = 2 * (1 - normCDF(absZ));
    const rightTail = 1 - cdf;

    twoEl.textContent = 'p = ' + twoTail.toFixed(4);
    oneEl.textContent = 'p = ' + rightTail.toFixed(4);
    cdfEl.textContent = 'Φ(Z) = ' + cdf.toFixed(4);
  }

  zEl.addEventListener('input', update);
  update();
})();