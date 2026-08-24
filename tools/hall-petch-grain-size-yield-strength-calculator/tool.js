(() => {
  'use strict';
  const s0El = document.getElementById('hp-s0'), kyEl = document.getElementById('hp-ky'), dEl = document.getElementById('hp-d');
  const syResEl = document.getElementById('hp-res-sy'), bResEl = document.getElementById('hp-res-boost');

  function update() {
    const s0 = parseFloat(s0El.value), ky = parseFloat(kyEl.value), d_um = parseFloat(dEl.value);
    if (isNaN(s0) || isNaN(ky) || isNaN(d_um) || s0 < 0 || ky <= 0 || d_um <= 0) return;

    // Hall-Petch: sigma_y = sigma_0 + ky * (d_um)^(-0.5)
    const grainStrengthening = ky * (1 / Math.sqrt(d_um));
    const sigma_y = s0 + grainStrengthening;
    const boostPct = (grainStrengthening / s0) * 100;

    syResEl.textContent = 'σ_y = ' + sigma_y.toFixed(1) + ' MPa (' + (sigma_y * 0.145038).toFixed(1) + ' ksi)';
    bResEl.textContent = '+' + grainStrengthening.toFixed(1) + ' MPa Grain Hardening (d = ' + d_um + ' μm, +' + boostPct.toFixed(1) + '% above Base σ₀ = ' + s0 + ' MPa)';
  }

  [s0El, kyEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();