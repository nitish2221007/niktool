(() => {
  'use strict';
  const n0El = document.getElementById('pc-n0'), cEl = document.getElementById('pc-c'), efEl = document.getElementById('pc-eff');
  const ydResEl = document.getElementById('pc-res-yield'), fdResEl = document.getElementById('pc-res-fold');

  function update() {
    const N0 = parseFloat(n0El.value), C = parseFloat(cEl.value), eff_pct = parseFloat(efEl.value);
    if (isNaN(N0) || isNaN(C) || isNaN(eff_pct) || N0 <= 0 || C < 0 || eff_pct <= 0) return;

    const E = eff_pct / 100.0;

    // Exponential PCR formula: N = N0 * ( 1 + E )^C
    const multiplier = Math.pow(1.0 + E, C);
    const N_total = N0 * multiplier;

    // Mass in picomoles: moles = N_total / Avogadro (6.022e23) => pmol = moles * 1e12
    const pmol = (N_total / 6.02214076e23) * 1e12;

    ydResEl.textContent = 'Yield N = ' + N_total.toExponential(2) + ' Copies';
    fdResEl.textContent = 'Fold Amplification = ' + multiplier.toExponential(2) + '× (' + (pmol < 1 ? (pmol * 1000).toFixed(1) + ' fmol' : pmol.toFixed(2) + ' pmol') + ' product @ ' + C + ' cycles, E = ' + eff_pct + '%)';
  }

  [n0El, cEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();