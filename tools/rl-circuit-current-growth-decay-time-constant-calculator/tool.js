(() => {
  'use strict';
  const lEl = document.getElementById('rl-ind2'), rEl = document.getElementById('rl-res2');
  const v0El = document.getElementById('rl-v02'), tEl = document.getElementById('rl-t2');
  const tauResEl = document.getElementById('rl-res-tau2'), itResEl = document.getElementById('rl-res-it');

  function update() {
    const L_mH = parseFloat(lEl.value), R = parseFloat(rEl.value);
    const V0 = parseFloat(v0El.value), t_ms = parseFloat(tEl.value);

    if (isNaN(L_mH) || isNaN(R) || isNaN(V0) || isNaN(t_ms) || L_mH <= 0 || R <= 0 || V0 <= 0 || t_ms < 0) return;

    const L = L_mH / 1000.0;
    const t_s = t_ms / 1000.0;

    // Time constant tau = L / R  [seconds]
    const tau_s = L / R;
    const tau_ms = tau_s * 1000.0;

    // Steady state maximum current I_max = V0 / R  [Amperes]
    const I_max = V0 / R;

    // Current growth: I(t) = I_max * ( 1 - exp(-t / tau) )
    const I_t = I_max * (1.0 - Math.exp(-t_s / tau_s));
    const pct_I = (I_t / I_max) * 100.0;

    // Stored magnetic energy: U = 0.5 * L * I^2  [Joules]
    const U_mJ = 0.5 * L * Math.pow(I_t, 2) * 1000.0;

    tauResEl.textContent = 'Time Constant τ = ' + (tau_ms >= 1000 ? (tau_ms/1000).toFixed(2) + ' s' : tau_ms.toFixed(2) + ' ms');
    itResEl.textContent = 'Current I(t) = ' + I_t.toFixed(3) + ' A (' + pct_I.toFixed(1) + '% I_max = ' + I_max.toFixed(3) + ' A | Energy U = ' + U_mJ.toFixed(1) + ' mJ @ t = ' + t_ms + ' ms)';
  }

  [lEl, rEl, v0El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();