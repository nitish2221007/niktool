(() => {
  'use strict';
  const p0El = document.getElementById('wk-p0'), rEl = document.getElementById('wk-r');
  const cEl = document.getElementById('wk-c'), tEl = document.getElementById('wk-t');
  const ptResEl = document.getElementById('wk-res-pt'), tauResEl = document.getElementById('wk-res-tau');

  function update() {
    const P0 = parseFloat(p0El.value), R = parseFloat(rEl.value);
    const C = parseFloat(cEl.value), t_sec = parseFloat(tEl.value);

    if (isNaN(P0) || isNaN(R) || isNaN(C) || isNaN(t_sec) || P0 <= 0 || R <= 0 || C <= 0 || t_sec < 0) return;

    const tau = R * C;
    const P_t = P0 * Math.exp(- t_sec / tau);
    const stored_vol_mL = C * (P0 - P_t);

    ptResEl.textContent = 'End-Diastolic P(t) = ' + P_t.toFixed(1) + ' mmHg (' + (P_t >= 90 ? 'ELEVATED' : 'NORMAL') + ')';
    tauResEl.textContent = 'RC Time Constant τ = ' + tau.toFixed(2) + ' s | Stored Blood Ejected in Diastole = ' + stored_vol_mL.toFixed(1) + ' mL (t = ' + t_sec + ' s @ R·C=' + tau.toFixed(2) + ' s)';
  }

  [p0El, rEl, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();