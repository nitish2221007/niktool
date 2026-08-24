(() => {
  'use strict';
  const wiEl = document.getElementById('bnd-wi'), f80El = document.getElementById('bnd-f80'), p80El = document.getElementById('bnd-p80');
  const wResEl = document.getElementById('bnd-res-w'), rResEl = document.getElementById('bnd-res-ratio');

  function update() {
    const Wi = parseFloat(wiEl.value), F80 = parseFloat(f80El.value), P80 = parseFloat(p80El.value);
    if (isNaN(Wi) || isNaN(F80) || isNaN(P80) || Wi <= 0 || F80 <= P80 || P80 <= 0) return;

    // Bond's Law: W = 10 * Wi * ( (1 / sqrt(P80)) - (1 / sqrt(F80)) )  [kWh / metric ton]
    const W = 10 * Wi * ((1 / Math.sqrt(P80)) - (1 / Math.sqrt(F80)));
    const reductionRatio = F80 / P80;

    wResEl.textContent = W.toFixed(2) + ' kWh / metric ton';
    rResEl.textContent = reductionRatio.toFixed(1) + 'x (F₈₀ ' + F80 + 'μm → P₈₀ ' + P80 + 'μm)';
  }

  [wiEl, f80El, p80El].forEach(el => el.addEventListener('input', update));
  update();
})();