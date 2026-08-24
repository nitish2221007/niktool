(() => {
  'use strict';
  const uaEl = document.getElementById('ntu-ua'), cminEl = document.getElementById('ntu-cmin'), crEl = document.getElementById('ntu-cr');
  const efResEl = document.getElementById('ntu-res-eff'), ntResEl = document.getElementById('ntu-res-ntu');

  function update() {
    const UA = parseFloat(uaEl.value), C_min = parseFloat(cminEl.value), C_r = parseFloat(crEl.value);
    if (isNaN(UA) || isNaN(C_min) || isNaN(C_r) || UA <= 0 || C_min <= 0 || C_r < 0 || C_r > 1) return;

    // NTU = UA / C_min
    const NTU = UA / C_min;

    // Counter-flow effectiveness formula:
    let epsilon = 0;
    if (C_r === 1.0) {
      epsilon = NTU / (1.0 + NTU);
    } else {
      const expTerm = Math.exp(-NTU * (1.0 - C_r));
      epsilon = (1.0 - expTerm) / (1.0 - (C_r * expTerm));
    }

    const eps_pct = epsilon * 100.0;

    efResEl.textContent = 'Effectiveness ε = ' + eps_pct.toFixed(2) + '%';
    ntResEl.textContent = 'NTU = ' + NTU.toFixed(2) + ' (UA / C_min) | C_r = ' + C_r.toFixed(2) + ' (Counter-Flow: ' + (eps_pct).toFixed(1) + '% max possible heat transfer)';
  }

  [uaEl, cminEl, crEl].forEach(el => el.addEventListener('input', update));
  update();
})();