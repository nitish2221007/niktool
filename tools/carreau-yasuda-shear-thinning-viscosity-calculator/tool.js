(() => {
  'use strict';
  const eta0El = document.getElementById('cy-eta0'), lamEl = document.getElementById('cy-lam');
  const nEl = document.getElementById('cy-n'), gamEl = document.getElementById('cy-gamma');
  const eResEl = document.getElementById('cy-res-eta'), dpResEl = document.getElementById('cy-res-drop');

  function update() {
    const eta0 = parseFloat(eta0El.value), lambda = parseFloat(lamEl.value);
    const n = parseFloat(nEl.value), gammaDot = parseFloat(gamEl.value);

    if (isNaN(eta0) || isNaN(lambda) || isNaN(n) || isNaN(gammaDot) || eta0 <= 0 || lambda <= 0 || n <= 0 || gammaDot <= 0) return;

    // Carreau-Yasuda model with standard transition parameter a = 2:
    // eta(gammaDot) = eta0 * [ 1 + (lambda * gammaDot)^2 ]^( (n - 1) / 2 )
    const term = 1.0 + Math.pow(lambda * gammaDot, 2);
    const eta = eta0 * Math.pow(term, (n - 1) / 2);
    const dropPct = ((eta0 - eta) / eta0) * 100;

    eResEl.textContent = 'η = ' + eta.toFixed(1) + ' Pa · s (Apparent Viscosity)';
    dpResEl.textContent = dropPct.toFixed(1) + '% Shear-Thinning Drop (Shear Stress τ = ' + Math.round(eta * gammaDot).toLocaleString() + ' Pa @ γ̇ = ' + gammaDot + ' s⁻¹)';
  }

  [eta0El, lamEl, nEl, gamEl].forEach(el => el.addEventListener('input', update));
  update();
})();