(() => {
  'use strict';
  const epsEl = document.getElementById('bl-eps'), lEl = document.getElementById('bl-l'), cEl = document.getElementById('bl-c');
  const aResEl = document.getElementById('bl-res-abs'), tResEl = document.getElementById('bl-res-trans');

  function update() {
    const eps = parseFloat(epsEl.value), l = parseFloat(lEl.value), c = parseFloat(cEl.value);
    if (isNaN(eps) || isNaN(l) || isNaN(c) || eps <= 0 || l <= 0 || c <= 0) return;

    // A = eps * c * l
    const A = eps * c * l;
    // %T = 10^(-A) * 100
    const pctT = Math.pow(10, -A) * 100;

    aResEl.textContent = A.toFixed(3) + ' AU';
    tResEl.textContent = pctT.toFixed(2) + '%';
  }

  [epsEl, lEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();