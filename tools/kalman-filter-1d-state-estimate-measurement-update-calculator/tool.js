(() => {
  'use strict';
  const xEl = document.getElementById('kf-x'), pEl = document.getElementById('kf-p');
  const zEl = document.getElementById('kf-z'), rEl = document.getElementById('kf-r');
  const xpResEl = document.getElementById('kf-res-xpost'), gnResEl = document.getElementById('kf-res-gain');

  function update() {
    const x_prior = parseFloat(xEl.value), P_prior = parseFloat(pEl.value);
    const z = parseFloat(zEl.value), R = parseFloat(rEl.value);

    if (isNaN(x_prior) || isNaN(P_prior) || isNaN(z) || isNaN(R) || P_prior < 0 || R <= 0) return;

    // Measurement innovation / residual: y = z - x_prior
    const innovation = z - x_prior;

    // Kalman gain: K_k = P_prior / ( P_prior + R )
    const K_k = P_prior / (P_prior + R);

    // Posterior state estimate: x_post = x_prior + K_k * innovation
    const x_post = x_prior + (K_k * innovation);

    // Posterior variance: P_post = (1 - K_k) * P_prior
    const P_post = (1.0 - K_k) * P_prior;

    const unc_reduction_pct = P_prior > 0 ? ((P_prior - P_post) / P_prior) * 100.0 : 0;

    xpResEl.textContent = 'Updated State x̂_post = ' + x_post.toFixed(2);
    gnResEl.textContent = 'Gain K_k = ' + K_k.toFixed(3) + ' | Variance: ' + P_prior.toFixed(2) + ' → ' + P_post.toFixed(2) + ' (-' + unc_reduction_pct.toFixed(1) + '% Error Uncertainty | Residual = ' + (innovation >= 0 ? '+' : '') + innovation.toFixed(1) + ')';
  }

  [xEl, pEl, zEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();