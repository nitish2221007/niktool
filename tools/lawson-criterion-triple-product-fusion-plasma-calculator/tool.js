(() => {
  'use strict';
  const nEl = document.getElementById('lc-n'), tEl = document.getElementById('lc-t'), tauEl = document.getElementById('lc-tau');
  const tpResEl = document.getElementById('lc-res-triple'), evResEl = document.getElementById('lc-res-eval');

  function update() {
    const n_scaled = parseFloat(nEl.value), T_keV = parseFloat(tEl.value), tau_s = parseFloat(tauEl.value);
    if (isNaN(n_scaled) || isNaN(T_keV) || isNaN(tau_s) || n_scaled <= 0 || T_keV <= 0 || tau_s <= 0) return;

    const n_m3 = n_scaled * 1e20;
    const triple_product = n_m3 * T_keV * tau_s;
    const triple_scaled = triple_product / 1e21;
    const T_million_K = T_keV * 11.6045;

    let qual = '', color = '#22543d';
    if (triple_product >= 3.0e21) {
      qual = 'IGNITION ACHIEVED (n·T·τ_E ≥ 3.0×10²¹: Self-sustaining alpha-particle heating ✓)';
      color = '#22543d';
    } else if (triple_product >= 1.0e21) {
      qual = 'BURNING PLASMA (Q ≥ 5 - 10: Alpha heating dominates external drive)';
      color = '#22543d';
    } else if (triple_product >= 5.0e20) {
      qual = 'SCIENTIFIC BREAKEVEN (Q ≈ 1.0: Fusion power equals input power)';
      color = '#ea580c';
    } else {
      qual = 'SUB-BREAKEVEN (n·T·τ_E < 5×10²⁰: Requires substantial auxiliary heating)';
      color = '#c53030';
    }

    tpResEl.textContent = 'Triple Product = ' + triple_scaled.toFixed(2) + ' × 10²¹ keV · s / m³';
    tpResEl.style.color = color;
    evResEl.textContent = qual + ' [T = ' + T_keV + ' keV (' + Math.round(T_million_K) + 'M K) @ τ_E = ' + tau_s + ' s]';
  }

  [nEl, tEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();