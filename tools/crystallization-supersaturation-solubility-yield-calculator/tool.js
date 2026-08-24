(() => {
  'use strict';
  const sEl = document.getElementById('cr-solv'), chEl = document.getElementById('cr-chot'), ccEl = document.getElementById('cr-ccold');
  const ydResEl = document.getElementById('cr-res-yield'), efResEl = document.getElementById('cr-res-eff');

  function update() {
    const M_solv = parseFloat(sEl.value), C_hot = parseFloat(chEl.value), C_cold = parseFloat(ccEl.value);
    if (isNaN(M_solv) || isNaN(C_hot) || isNaN(C_cold) || M_solv <= 0 || C_hot <= C_cold || C_cold < 0) return;

    // Initial dissolved solute mass: M_hot = M_solv * (C_hot / 100)
    const M_hot = M_solv * (C_hot / 100.0);
    // Solute remaining in cold mother liquor: M_cold = M_solv * (C_cold / 100)
    const M_cold = M_solv * (C_cold / 100.0);

    // Theoretical anhydrous crystal yield: Yield = M_hot - M_cold
    const yield_kg = M_hot - M_cold;
    const recovery_pct = (yield_kg / M_hot) * 100.0;
    const S_ratio = C_hot / C_cold;

    ydResEl.textContent = 'Crystal Yield = ' + yield_kg.toFixed(2) + ' kg Pure Product';
    efResEl.textContent = 'Recovery = ' + recovery_pct.toFixed(1) + '% (' + yield_kg.toFixed(1) + ' kg Recovered / ' + M_hot.toFixed(1) + ' kg Feed | S_ratio = ' + S_ratio.toFixed(2) + ')';
  }

  [sEl, chEl, ccEl].forEach(el => el.addEventListener('input', update));
  update();
})();