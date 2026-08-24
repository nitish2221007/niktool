(() => {
  'use strict';
  const fEl = document.getElementById('bh-f'), dEl = document.getElementById('bh-d'), indEl = document.getElementById('bh-ind');
  const bhnResEl = document.getElementById('bh-res-bhn'), utsResEl = document.getElementById('bh-res-uts');

  function update() {
    const F = parseFloat(fEl.value), D = parseFloat(dEl.value), d = parseFloat(indEl.value);
    if (isNaN(F) || isNaN(D) || isNaN(d) || F <= 0 || D <= 0 || d <= 0 || d >= D) {
      bhnResEl.textContent = 'Ensure 0 < d < D';
      return;
    }

    // BHN = (2 * F) / (pi * D * (D - sqrt(D^2 - d^2)))
    const bhn = (2 * F) / (Math.PI * D * (D - Math.sqrt(Math.pow(D, 2) - Math.pow(d, 2))));
    // Empirical UTS for carbon steels: UTS (MPa) ≈ 3.45 * HBW
    const utsMpa = 3.45 * bhn;
    const utsKsi = utsMpa / 6.89476;

    bhnResEl.textContent = Math.round(bhn) + ' HBW (kgf/mm²)';
    utsResEl.textContent = '~' + Math.round(utsMpa) + ' MPa (' + utsKsi.toFixed(1) + ' ksi Steel UTS)';
  }

  [fEl, dEl, indEl].forEach(el => el.addEventListener('input', update));
  update();
})();