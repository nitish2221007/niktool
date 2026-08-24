(() => {
  'use strict';
  const epsEl = document.getElementById('nuc-eps'), pEl = document.getElementById('nuc-p');
  const etaEl = document.getElementById('nuc-eta'), fEl = document.getElementById('nuc-f'), pnlEl = document.getElementById('nuc-pnl');
  const kResEl = document.getElementById('nuc-res-kinf'), stResEl = document.getElementById('nuc-res-stat');

  function update() {
    const eps = parseFloat(epsEl.value), p = parseFloat(pEl.value);
    const eta = parseFloat(etaEl.value), f = parseFloat(fEl.value), P_NL = parseFloat(pnlEl.value);

    if (isNaN(eps) || isNaN(p) || isNaN(eta) || isNaN(f) || isNaN(P_NL) || eps <= 0 || p <= 0 || eta <= 0 || f <= 0 || P_NL <= 0) return;

    // Four-factor formula: k_inf = eps * p * eta * f
    const k_inf = eps * p * eta * f;

    // Six-factor effective multiplication: k_eff = k_inf * P_NL
    const k_eff = k_inf * P_NL;
    const reactivityPcm = ((k_eff - 1) / k_eff) * 1e5; // reactivity rho in percent millirads (pcm)

    kResEl.textContent = 'k_∞ = ' + k_inf.toFixed(3) + ' | k_eff = ' + k_eff.toFixed(4);

    let status = '';
    let color = '#22543d';

    if (Math.abs(k_eff - 1.0) < 0.001) {
      status = 'EXACT CRITICAL (k_eff ≈ 1.000: Steady Constant Power | Reactivity ρ = ' + reactivityPcm.toFixed(0) + ' pcm)';
      color = '#22543d';
    } else if (k_eff > 1.0) {
      status = 'SUPERCRITICAL (k_eff > 1.0: Neutron Flux & Reactor Power Rising | ρ = +' + reactivityPcm.toFixed(0) + ' pcm)';
      color = '#c53030';
    } else {
      status = 'SUBCRITICAL (k_eff < 1.0: Chain Reaction Decaying to Shutdown | ρ = ' + reactivityPcm.toFixed(0) + ' pcm)';
      color = '#2563eb';
    }

    stResEl.textContent = status;
    stResEl.style.color = color;
  }

  [epsEl, pEl, etaEl, fEl, pnlEl].forEach(el => el.addEventListener('input', update));
  update();
})();