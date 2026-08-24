(() => {
  'use strict';
  const bEl = document.getElementById('rb-beta'), thEl = document.getElementById('rb-theta');
  const dlResEl = document.getElementById('rb-res-delta'), btResEl = document.getElementById('rb-res-boost');

  function update() {
    const beta = parseFloat(bEl.value), theta_deg = parseFloat(thEl.value);
    if (isNaN(beta) || isNaN(theta_deg) || beta <= 0 || beta >= 1 || theta_deg < 0 || theta_deg > 90) return;

    const theta_rad = (theta_deg * Math.PI) / 180.0;

    // Lorentz factor gamma = 1 / sqrt(1 - beta^2)
    const gamma = 1.0 / Math.sqrt(1.0 - Math.pow(beta, 2));

    // Doppler factor delta = 1 / [ gamma * ( 1 - beta * cos(theta) ) ]
    const delta = 1.0 / (gamma * (1.0 - beta * Math.cos(theta_rad)));

    // Apparent transverse velocity: beta_app = (beta * sin(theta)) / ( 1 - beta * cos(theta) )
    const beta_app = (beta * Math.sin(theta_rad)) / (1.0 - beta * Math.cos(theta_rad));

    // Flux boosting factor approx: S_obs / S0 = delta^(3 + alpha) where spectral index alpha ~ 0.7 => delta^3.7
    const flux_boost = Math.pow(delta, 3.7);

    dlResEl.textContent = 'Doppler Factor δ = ' + delta.toFixed(2) + ' (Lorentz γ = ' + gamma.toFixed(2) + ')';
    btResEl.textContent = 'Apparent Speed = ' + beta_app.toFixed(2) + ' c (' + (beta_app > 1.0 ? 'SUPERLUMINAL ILLUSION' : 'Subluminal') + ') | Flux Boost = ' + (flux_boost >= 1000 ? flux_boost.toExponential(2) : flux_boost.toFixed(1)) + '×';
  }

  bEl.addEventListener('input', update);
  thEl.addEventListener('input', update);
  update();
})();