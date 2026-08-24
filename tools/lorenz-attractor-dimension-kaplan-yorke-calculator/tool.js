(() => {
  'use strict';
  const l1El = document.getElementById('ky-l1'), l2El = document.getElementById('ky-l2'), l3El = document.getElementById('ky-l3');
  const dResEl = document.getElementById('ky-res-dim'), dvResEl = document.getElementById('ky-res-div');

  function update() {
    const l1 = parseFloat(l1El.value), l2 = parseFloat(l2El.value), l3 = parseFloat(l3El.value);
    if (isNaN(l1) || isNaN(l2) || isNaN(l3)) return;

    // Total divergence sum = l1 + l2 + l3
    const sumAll = l1 + l2 + l3;

    // Kaplan-Yorke formula for 3D system with l1 > 0, l2 = 0, l1 + l2 > 0 and l1 + l2 + l3 < 0:
    // k = 2 because sum(l1 + l2) > 0 while sum(l1 + l2 + l3) < 0
    let D_KY = 0.0;
    if ((l1 + l2) > 0 && l3 < 0) {
      D_KY = 2.0 + ((l1 + l2) / Math.abs(l3));
    } else if (l1 <= 0) {
      D_KY = 1.0;
    } else {
      D_KY = 3.0;
    }

    dResEl.textContent = 'D_KY = ' + D_KY.toFixed(3) + ' Fractal Dimension';
    dvResEl.textContent = 'Σ λ_i = ' + sumAll.toFixed(2) + ' s⁻¹ (' + (sumAll < 0 ? 'Dissipative Strange Attractor' : 'Conservative Hamiltonian') + ' | Lorenz 1963 Attractor D ≈ 2.06)';
  }

  [l1El, l2El, l3El].forEach(el => el.addEventListener('input', update));
  update();
})();