(() => {
  'use strict';
  const d0El = document.getElementById('gg-d0'), tmEl = document.getElementById('gg-time');
  const kEl = document.getElementById('gg-k'), nEl = document.getElementById('gg-n');
  const dfResEl = document.getElementById('gg-res-df'), asResEl = document.getElementById('gg-res-astm');

  function update() {
    const d0 = parseFloat(d0El.value), tMin = parseFloat(tmEl.value);
    const K = parseFloat(kEl.value), n = parseFloat(nEl.value);

    if (isNaN(d0) || isNaN(tMin) || isNaN(K) || isNaN(n) || d0 <= 0 || tMin < 0 || K <= 0 || n <= 0) return;

    // Isothermal grain growth equation: d^n - d0^n = K * t  =>  d = ( d0^n + K * t )^(1/n)
    const d_final = Math.pow(Math.pow(d0, n) + (K * tMin), 1 / n);

    // ASTM E112 Grain Size Number G approx: G = -6.643856 * log10(d_final_mm) - 3.288
    const d_mm = d_final / 1000;
    const astmG = (-6.643856 * Math.log10(d_mm)) - 3.288;

    dfResEl.textContent = 'd = ' + d_final.toFixed(1) + ' μm (' + (d_final / d0).toFixed(2) + '× Growth)';
    asResEl.textContent = 'ASTM Grain No. G = ' + astmG.toFixed(1) + ' (d₀ = ' + d0 + ' μm -> d = ' + d_final.toFixed(1) + ' μm after ' + tMin + ' min)';
  }

  [d0El, tmEl, kEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();