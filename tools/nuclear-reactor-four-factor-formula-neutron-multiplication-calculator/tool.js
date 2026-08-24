(() => {
  'use strict';
  const epsEl = document.getElementById('nr-eps'), pEl = document.getElementById('nr-p');
  const etaEl = document.getElementById('nr-eta'), fEl = document.getElementById('nr-f');
  const kResEl = document.getElementById('nr-res-k'), crResEl = document.getElementById('nr-res-crit');

  function update() {
    const eps = parseFloat(epsEl.value), p = parseFloat(pEl.value);
    const eta = parseFloat(etaEl.value), f = parseFloat(fEl.value);

    if (isNaN(eps) || isNaN(p) || isNaN(eta) || isNaN(f) || eps <= 0 || p <= 0 || eta <= 0 || f <= 0) return;

    // Four factor formula: k_inf = eps * p * eta * f
    const k_inf = eps * p * eta * f;

    let crit = '';
    let color = '#22543d';

    if (k_inf > 1.0) {
      crit = 'CRITICALITY POSSIBLE (k_∞ = ' + k_inf.toFixed(3) + ' > 1.0: Ample excess reactivity to balance geometric boundary leakage)';
      color = '#22543d';
    } else if (k_inf === 1.0) {
      crit = 'EXACTLY CRITICAL (k_∞ = 1.0: Self-sustaining steady power in infinite medium)';
      color = '#22543d';
    } else {
      crit = 'SUBCRITICAL (k_∞ = ' + k_inf.toFixed(3) + ' < 1.0: Cannot sustain chain reaction; enrich fuel or improve moderation)';
      color = '#c53030';
    }

    kResEl.textContent = 'k_∞ = ' + k_inf.toFixed(3);
    kResEl.style.color = color;
    crResEl.textContent = crit;
    crResEl.style.color = color;
  }

  [epsEl, pEl, etaEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();