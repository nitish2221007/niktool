(() => {
  'use strict';
  const a0El = document.getElementById('rd-a0'), thEl = document.getElementById('rd-thalf'), tEl = document.getElementById('rd-t');
  const aResEl = document.getElementById('rd-res-a'), infResEl = document.getElementById('rd-res-info');

  function update() {
    const A0 = parseFloat(a0El.value), t_half = parseFloat(thEl.value), t = parseFloat(tEl.value);
    if (isNaN(A0) || isNaN(t_half) || isNaN(t) || A0 <= 0 || t_half <= 0 || t < 0) return;

    // Decay constant lambda = ln(2) / t_half
    const lambda = Math.LN2 / t_half;

    // A(t) = A0 * exp( -lambda * t ) = A0 * (0.5)^(t / t_half)
    const A_t = A0 * Math.pow(0.5, t / t_half);
    const pct_remain = (A_t / A0) * 100.0;
    const halfLivesElapsed = t / t_half;

    aResEl.textContent = 'Activity A = ' + A_t.toFixed(2) + ' MBq (' + pct_remain.toFixed(1) + '% Left)';
    infResEl.textContent = 'Decay Constant λ = ' + lambda.toFixed(4) + ' day⁻¹ | ' + halfLivesElapsed.toFixed(2) + ' Half-Lives Elapsed (t_½ = ' + t_half + ' d)';
  }

  [a0El, thEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();