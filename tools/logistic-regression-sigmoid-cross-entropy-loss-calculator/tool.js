(() => {
  'use strict';
  const zEl = document.getElementById('lr-z'), yEl = document.getElementById('lr-y');
  const prResEl = document.getElementById('lr-res-prob'), lsResEl = document.getElementById('lr-res-loss');

  function update() {
    const z = parseFloat(zEl.value), y = parseFloat(yEl.value);
    if (isNaN(z) || isNaN(y)) return;

    // Sigmoid function: p = 1 / (1 + exp(-z))
    const p = 1.0 / (1.0 + Math.exp(-z));

    // Odds = p / (1 - p) = exp(z)
    const odds = Math.exp(z);

    // Binary cross-entropy loss: L = -( y * ln(p) + (1-y) * ln(1-p) )
    const eps = 1e-15;
    const p_safe = Math.max(eps, Math.min(1.0 - eps, p));
    const loss = -( (y * Math.log(p_safe)) + ((1.0 - y) * Math.log(1.0 - p_safe)) );

    // Derivative dL/dz = p - y
    const grad = p - y;

    prResEl.textContent = 'Probability p = ' + p.toFixed(4) + ' (' + (p * 100).toFixed(2) + '%)';
    lsResEl.textContent = 'Log Loss ℒ = ' + loss.toFixed(4) + ' | Odds = ' + odds.toFixed(2) + ':1 | Gradient dℒ/dz = ' + (grad >= 0 ? '+' : '') + grad.toFixed(4) + ' (y = ' + y + ')';
  }

  zEl.addEventListener('input', update);
  yEl.addEventListener('change', update);
  update();
})();