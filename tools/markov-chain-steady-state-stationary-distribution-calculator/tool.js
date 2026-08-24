(() => {
  'use strict';
  const p12El = document.getElementById('mc-p12'), p21El = document.getElementById('mc-p21');
  const piResEl = document.getElementById('mc-res-pi'), rtResEl = document.getElementById('mc-res-ret');

  function update() {
    const p12 = parseFloat(p12El.value), p21 = parseFloat(p21El.value);
    if (isNaN(p12) || isNaN(p21) || p12 <= 0 || p21 <= 0 || p12 >= 1.0 || p21 >= 1.0) return;

    // For a 2-state ergodic Markov chain:
    // pi1 * p12 = pi2 * p21 (Detailed balance)
    // pi1 + pi2 = 1 => pi1 * p12 = (1 - pi1) * p21 => pi1 * (p12 + p21) = p21
    const pi1 = p21 / (p12 + p21);
    const pi2 = p12 / (p12 + p21);

    // Mean return times: mu_i = 1 / pi_i
    const mu1 = 1.0 / pi1;
    const mu2 = 1.0 / pi2;

    piResEl.textContent = 'π₁ = ' + (pi1 * 100).toFixed(1) + '% | π₂ = ' + (pi2 * 100).toFixed(1) + '%';
    rtResEl.textContent = 'Return Time: μ₁ = ' + mu1.toFixed(2) + ' steps | μ₂ = ' + mu2.toFixed(2) + ' steps (P₁₁ = ' + (1-p12).toFixed(2) + ', P₂₂ = ' + (1-p21).toFixed(2) + ')';
  }

  p12El.addEventListener('input', update);
  p21El.addEventListener('input', update);
  update();
})();