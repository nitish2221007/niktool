(() => {
  'use strict';
  const eEl = document.getElementById('fd-e'), efEl = document.getElementById('fd-ef'), tEl = document.getElementById('fd-temp');
  const feResEl = document.getElementById('fd-res-fe'), ktResEl = document.getElementById('fd-res-kbt');

  const kB_ev = 8.617333262e-5; // eV / K

  function update() {
    const E = parseFloat(eEl.value), E_F = parseFloat(efEl.value), T = parseFloat(tEl.value);
    if (isNaN(E) || isNaN(E_F) || isNaN(T) || T < 0) return;

    if (T === 0) {
      const f0 = E <= E_F ? 1.0 : 0.0;
      feResEl.textContent = 'f(E) = ' + f0 + ' (Step Function @ Absolute Zero T = 0 K)';
      ktResEl.textContent = 'Zero Kelvin Step Function: All states below E_F are 100% occupied; all above are 0% empty.';
      return;
    }

    const kBT_ev = kB_ev * T;
    const kBT_mev = kBT_ev * 1000;
    const deltaE = E - E_F;
    const x = deltaE / kBT_ev;

    // Fermi-Dirac: f(E) = 1 / ( exp( (E - EF) / kBT ) + 1 )
    let f_E = 0.0;
    if (x > 50) f_E = Math.exp(-x); // Maxwell-Boltzmann tail
    else if (x < -50) f_E = 1.0;
    else f_E = 1.0 / (Math.exp(x) + 1.0);

    const f_pct = f_E * 100;

    feResEl.textContent = 'f(E) = ' + (f_E < 0.001 ? f_E.toExponential(2) : f_E.toFixed(4)) + ' (' + f_pct.toFixed(2) + '% Occupied)';
    ktResEl.textContent = 'k_B·T = ' + kBT_mev.toFixed(2) + ' meV | ΔE = ' + (deltaE >= 0 ? '+' : '') + deltaE.toFixed(3) + ' eV (' + (deltaE / kBT_ev).toFixed(2) + ' k_B·T @ ' + T + ' K)';
  }

  [eEl, efEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();