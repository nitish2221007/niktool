(() => {
  'use strict';
  const mEl = document.getElementById('mol-m'), mrEl = document.getElementById('mol-mr'), vEl = document.getElementById('mol-v');
  const cResEl = document.getElementById('mol-res-c'), nResEl = document.getElementById('mol-res-n');

  function update() {
    const mass_g = parseFloat(mEl.value), M_r = parseFloat(mrEl.value), vol_mL = parseFloat(vEl.value);
    if (isNaN(mass_g) || isNaN(M_r) || isNaN(vol_mL) || mass_g <= 0 || M_r <= 0 || vol_mL <= 0) return;

    // n = mass / M_r  [moles]
    const n_moles = mass_g / M_r;

    // Volume in Liters
    const vol_L = vol_mL / 1000.0;

    // Concentration c = n / V  [mol / L]
    const c_M = n_moles / vol_L;
    const c_mM = c_M * 1000.0;

    cResEl.textContent = 'c = ' + (c_M < 0.01 ? c_mM.toFixed(2) + ' mM' : c_M.toFixed(3) + ' M (mol/L)');
    nResEl.textContent = 'Solute Moles n = ' + n_moles.toFixed(3) + ' mol (' + mass_g + ' g / ' + M_r + ' g/mol in ' + vol_L.toFixed(3) + ' L)';
  }

  [mEl, mrEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();