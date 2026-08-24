(() => {
  'use strict';
  const dEl = document.getElementById('hp-d'), s0El = document.getElementById('hp-s0'), kyEl = document.getElementById('hp-ky');
  const syResEl = document.getElementById('hp-res-sy'), inResEl = document.getElementById('hp-res-inc');

  function update() {
    const d_um = parseFloat(dEl.value), sigma_0 = parseFloat(s0El.value), k_y = parseFloat(kyEl.value);
    if (isNaN(d_um) || isNaN(sigma_0) || isNaN(k_y) || d_um <= 0 || sigma_0 < 0 || k_y <= 0) return;

    // Hall-Petch equation: sigma_y = sigma_0 + k_y / sqrt(d_um)  [MPa]
    const delta_sigma = k_y / Math.sqrt(d_um);
    const sigma_y = sigma_0 + delta_sigma;
    const pct_inc = (delta_sigma / sigma_0) * 100.0;

    syResEl.textContent = 'Yield Strength σ_y = ' + sigma_y.toFixed(1) + ' MPa';
    inResEl.textContent = 'Refinement Δσ = +' + delta_sigma.toFixed(1) + ' MPa (' + pct_inc.toFixed(1) + '% boost | d=' + d_um + ' μm, k_y=' + k_y + ')';
  }

  [dEl, s0El, kyEl].forEach(el => el.addEventListener('input', update));
  update();
})();