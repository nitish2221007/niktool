(() => {
  'use strict';
  const mEl = document.getElementById('eq-m');
  const eResEl = document.getElementById('eq-res-e'), tntResEl = document.getElementById('eq-res-tnt');

  function update() {
    const M = parseFloat(mEl.value);
    if (isNaN(M) || M < 1.0 || M > 10.0) return;

    // Gutenberg-Richter energy formula: log10(E) = 4.8 + 1.5 * M  [Joules]
    const logE = 4.8 + (1.5 * M);
    const E_joules = Math.pow(10, logE);

    // 1 ton of TNT = 4.184 x 10^9 Joules
    const tons_tnt = E_joules / 4.184e9;

    let tntStr = '';
    if (tons_tnt >= 1e6) tntStr = (tons_tnt / 1e6).toFixed(2) + ' Megatons TNT';
    else if (tons_tnt >= 1000) tntStr = Math.round(tons_tnt / 1000) + ' Kilotons TNT';
    else tntStr = Math.round(tons_tnt) + ' Tons TNT';

    eResEl.textContent = 'E = ' + E_joules.toExponential(2) + ' Joules';
    tntResEl.textContent = 'TNT Equivalent = ' + tntStr + ' (Magnitude ' + M.toFixed(1) + ' | 31.62× energy per +1.0 step)';
  }

  mEl.addEventListener('input', update);
  update();
})();