(() => {
  'use strict';
  const dEl = document.getElementById('nd-d'), saEl = document.getElementById('nd-sa');
  const tauEl = document.getElementById('nd-tau'), bgEl = document.getElementById('nd-bg');
  const lResEl = document.getElementById('nd-res-l'), pnlResEl = document.getElementById('nd-res-pnl');

  function update() {
    const D_cm = parseFloat(dEl.value), Sigma_a = parseFloat(saEl.value);
    const tau_cm2 = parseFloat(tauEl.value), Bg_sq = parseFloat(bgEl.value);

    if (isNaN(D_cm) || isNaN(Sigma_a) || isNaN(tau_cm2) || isNaN(Bg_sq) || D_cm <= 0 || Sigma_a <= 0 || tau_cm2 < 0 || Bg_sq < 0) return;

    const L_cm = Math.sqrt(D_cm / Sigma_a);
    const L_sq = D_cm / Sigma_a;
    const M_sq = L_sq + tau_cm2;
    const P_NL = 1.0 / (1.0 + (M_sq * Bg_sq));
    const P_NL_pct = P_NL * 100.0;
    const leakage_pct = (1.0 - P_NL) * 100.0;

    lResEl.textContent = 'Diffusion Length L = ' + L_cm.toFixed(2) + ' cm (M² = ' + M_sq.toFixed(2) + ' cm²)';
    pnlResEl.textContent = 'Non-Leakage P_NL = ' + P_NL_pct.toFixed(2) + '% (Neutron Leakage = ' + leakage_pct.toFixed(2) + '% @ B_g²=' + Bg_sq + ' cm⁻²)';
  }

  [dEl, saEl, tauEl, bgEl].forEach(el => el.addEventListener('input', update));
  update();
})();