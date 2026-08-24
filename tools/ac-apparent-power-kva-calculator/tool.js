(() => {
  'use strict';
  const pEl = document.getElementById('kva-phase'), vEl = document.getElementById('kva-volt'), aEl = document.getElementById('kva-amps');
  const kvaResEl = document.getElementById('kva-res-val'), kwResEl = document.getElementById('kva-res-kw');

  function update() {
    const is3Ph = pEl.value === '3';
    const V = parseFloat(vEl.value), I = parseFloat(aEl.value);
    if (isNaN(V) || isNaN(I) || V <= 0 || I <= 0) return;

    // S (kVA) = (V * I) / 1000 for 1Ph, (sqrt(3) * V * I) / 1000 for 3Ph
    const kva = is3Ph ? (Math.sqrt(3) * V * I) / 1000 : (V * I) / 1000;
    const kwAt08 = kva * 0.80;

    kvaResEl.textContent = kva.toFixed(2) + ' kVA';
    kwResEl.textContent = kwAt08.toFixed(2) + ' kW (@ 0.80 PF)';
  }

  [pEl, vEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();