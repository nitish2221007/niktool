(() => {
  'use strict';
  const nEl = document.getElementById('gm-n'), cEl = document.getElementById('gm-cond');
  const vResEl = document.getElementById('gm-res-vol'), mResEl = document.getElementById('gm-res-molc');

  const N_A = 6.02214e23;

  function update() {
    const n_moles = parseFloat(nEl.value), V_m = parseFloat(cEl.value);
    if (isNaN(n_moles) || isNaN(V_m) || n_moles <= 0 || V_m <= 0) return;

    // V = n * V_m  [Liters]
    const volume_L = n_moles * V_m;
    const volume_dm3 = volume_L; // 1 L = 1 dm^3

    // Number of molecules = n * N_A
    const molecules = n_moles * N_A;

    vResEl.textContent = 'Gas Volume V = ' + volume_L.toFixed(1) + ' Liters (' + volume_dm3.toFixed(1) + ' dm³)';
    mResEl.textContent = molecules.toExponential(2) + ' Molecules (' + n_moles + ' mol @ V_m = ' + V_m + ' L/mol)';
  }

  nEl.addEventListener('input', update);
  cEl.addEventListener('change', update);
  update();
})();