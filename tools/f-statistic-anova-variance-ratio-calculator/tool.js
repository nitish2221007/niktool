(() => {
  'use strict';
  const s1El = document.getElementById('f-s1'), n1El = document.getElementById('f-n1');
  const s2El = document.getElementById('f-s2'), n2El = document.getElementById('f-n2');
  const fResEl = document.getElementById('f-res-f'), dfResEl = document.getElementById('f-res-df');

  function update() {
    const s1 = parseFloat(s1El.value), n1 = parseInt(n1El.value, 10);
    const s2 = parseFloat(s2El.value), n2 = parseInt(n2El.value, 10);

    if (isNaN(s1) || isNaN(n1) || isNaN(s2) || isNaN(n2) || s1 <= 0 || s2 <= 0 || n1 < 2 || n2 < 2) return;

    // F = s1^2 / s2^2 (or s1 / s2 if inputs are already variances)
    const F = s1 / s2;
    const df1 = n1 - 1;
    const df2 = n2 - 1;

    fResEl.textContent = 'F = ' + F.toFixed(3);
    dfResEl.textContent = 'df₁ = ' + df1 + ', df₂ = ' + df2;
  }

  [s1El, n1El, s2El, n2El].forEach(el => el.addEventListener('input', update));
  update();
})();