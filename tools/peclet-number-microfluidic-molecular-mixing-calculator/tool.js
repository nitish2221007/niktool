(() => {
  'use strict';
  const vEl = document.getElementById('pec-v'), wEl = document.getElementById('pec-w'), dEl = document.getElementById('pec-d');
  const peResEl = document.getElementById('pec-res-pe'), lmResEl = document.getElementById('pec-res-lmix');

  function update() {
    const vMms = parseFloat(vEl.value), wUm = parseFloat(wEl.value), D = parseFloat(dEl.value);
    if (isNaN(vMms) || isNaN(wUm) || isNaN(D) || vMms <= 0 || wUm <= 0 || D <= 0) return;

    const vMs = vMms * 1e-3;
    const wM = wUm * 1e-6;

    // Peclet number Pe = (v * w) / D
    const Pe = (vMs * wM) / D;

    // Diffusive time t_diff approx = w^2 / (2 * D)
    const t_diff = Math.pow(wM, 2) / (2 * D);

    // Diffusive mixing length L_mix approx = v * t_diff = (v * w^2) / (2 * D) = (w * Pe) / 2
    const L_mix_m = (wM * Pe) / 2;
    const L_mix_mm = L_mix_m * 1000;

    peResEl.textContent = 'Pe = ' + Math.round(Pe).toLocaleString() + ' (Advection / Diffusion Ratio)';

    let mixStrategy = '';
    if (Pe < 1.0) {
      mixStrategy = 'L_mix ≈ ' + L_mix_mm.toFixed(2) + ' mm: Fast Pure Molecular Diffusion';
    } else if (L_mix_mm < 10.0) {
      mixStrategy = 'L_mix ≈ ' + L_mix_mm.toFixed(1) + ' mm: Straight Laminar Co-Flow Channel Sufficient (t_diff = ' + t_diff.toFixed(2) + ' s)';
    } else {
      mixStrategy = 'L_mix ≈ ' + L_mix_mm.toFixed(1) + ' mm (Impractically Long): Staggered Herringbone Chaotic Mixer (SHM) Required';
    }

    lmResEl.textContent = mixStrategy;
  }

  [vEl, wEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();