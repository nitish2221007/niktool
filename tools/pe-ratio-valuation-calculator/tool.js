(() => {
  'use strict';
  const pEl = document.getElementById('pe-price'), epsEl = document.getElementById('pe-eps'), gEl = document.getElementById('pe-growth');
  const peEl = document.getElementById('pe-res-pe'), pegEl = document.getElementById('pe-res-peg'), eyEl = document.getElementById('pe-res-ey');

  function update() {
    const price = parseFloat(pEl.value), eps = parseFloat(epsEl.value), growth = parseFloat(gEl.value);
    if (isNaN(price) || isNaN(eps) || isNaN(growth) || price <= 0 || eps <= 0 || growth <= 0) return;

    const pe = price / eps;
    const peg = pe / growth;
    const ey = (eps / price) * 100;

    peEl.textContent = pe.toFixed(1) + 'x';
    pegEl.textContent = peg.toFixed(2);
    eyEl.textContent = ey.toFixed(2) + '%';
  }

  pEl.addEventListener('input', update);
  epsEl.addEventListener('input', update);
  gEl.addEventListener('input', update);
  update();
})();