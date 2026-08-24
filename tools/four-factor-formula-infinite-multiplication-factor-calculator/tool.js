(() => {
  'use strict';
  const epsEl = document.getElementById('ff-eps'), pEl = document.getElementById('ff-p');
  const etaEl = document.getElementById('ff-eta'), fEl = document.getElementById('ff-f');
  const kiResEl = document.getElementById('ff-res-kinf'), evResEl = document.getElementById('ff-res-eval');

  function update() {
    const epsilon = parseFloat(epsEl.value), p = parseFloat(pEl.value);
    const eta = parseFloat(etaEl.value), f = parseFloat(fEl.value);

    if (isNaN(epsilon) || isNaN(p) || isNaN(eta) || isNaN(f) || epsilon <= 0 || p <= 0 || eta <= 0 || f <= 0) return;

    const k_inf = epsilon * p * eta * f;
    const excess_k = k_inf - 1.0;
    const excess_pcm = excess_k * 1e5;

    let qual = '', color = '#22543d';
    if (k_inf >= 1.15) {
      qual = 'SUPERCRITICAL POTENTIAL (k_∞ ≥ 1.15: Ample margin for finite core leakage & control poison ✓)';
      color = '#22543d';
    } else if (k_inf >= 1.0) {
      qual = 'CRITICAL MARGINAL (1.00 ≤ k_∞ < 1.15: Requires low leakage core)';
      color = '#ea580c';
    } else {
      qual = 'SUBCRITICAL (k_∞ < 1.00: Cannot achieve chain reaction even in infinite medium ✗)';
      color = '#c53030';
    }

    kiResEl.textContent = 'k_∞ = ' + k_inf.toFixed(4) + ' (' + qual.split(' (')[0] + ')';
    kiResEl.style.color = color;
    evResEl.textContent = 'Excess Reactivity Δk_∞ = ' + (excess_k >= 0 ? '+' : '') + excess_k.toFixed(4) + ' (' + Math.round(excess_pcm).toLocaleString() + ' pcm | ε=' + epsilon + ', p=' + p + ', η=' + eta + ', f=' + f + ')';
  }

  [epsEl, pEl, etaEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();