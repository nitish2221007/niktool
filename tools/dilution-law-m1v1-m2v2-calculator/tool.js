(() => {
  'use strict';
  const m1El = document.getElementById('dil-m1'), m2El = document.getElementById('dil-m2'), v2El = document.getElementById('dil-v2');
  const v1ResEl = document.getElementById('dil-res-v1'), wResEl = document.getElementById('dil-res-water');

  function update() {
    const M1 = parseFloat(m1El.value), M2 = parseFloat(m2El.value), V2 = parseFloat(v2El.value);
    if (isNaN(M1) || isNaN(M2) || isNaN(V2) || M1 <= 0 || M2 <= 0 || V2 <= 0 || M2 > M1) {
      v1ResEl.textContent = 'Ensure M₁ ≥ M₂ > 0';
      return;
    }

    // M1 * V1 = M2 * V2 => V1 = (M2 * V2) / M1
    const V1 = (M2 * V2) / M1;
    const waterToAdd = V2 - V1;
    const dilFactor = M1 / M2;

    v1ResEl.textContent = V1.toFixed(2) + ' mL Stock (' + dilFactor.toFixed(1) + 'x Dilution)';
    wResEl.textContent = waterToAdd.toFixed(2) + ' mL Solvent (DI Water)';
  }

  [m1El, m2El, v2El].forEach(el => el.addEventListener('input', update));
  update();
})();