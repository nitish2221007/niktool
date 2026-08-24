(() => {
  'use strict';
  const tEl = document.getElementById('ent-t'), wEl = document.getElementById('ent-w');
  const hResEl = document.getElementById('ent-res-h'), btuResEl = document.getElementById('ent-res-btu');

  function update() {
    const T = parseFloat(tEl.value), wGrams = parseFloat(wEl.value);
    if (isNaN(T) || isNaN(wGrams) || wGrams < 0) return;

    const W = wGrams * 1e-3; // kg H2O / kg dry air
    // ASHRAE Psychrometric formula: h = 1.006 * T + W * (2501 + 1.86 * T)  [kJ / kg dry air]
    const hKj = 1.006 * T + W * (2501 + 1.86 * T);
    // Convert kJ/kg to BTU/lb: 1 kJ/kg = 0.429923 BTU/lb
    const hBtu = hKj * 0.429923;

    hResEl.textContent = hKj.toFixed(2) + ' kJ / kg dry air';
    btuResEl.textContent = hBtu.toFixed(2) + ' BTU / lb dry air';
  }

  [tEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();