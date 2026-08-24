(() => {
  'use strict';
  const dpEl = document.getElementById('pt-dp'), fEl = document.getElementById('pt-fluid');
  const vResEl = document.getElementById('pt-res-vel'), sResEl = document.getElementById('pt-res-speed');

  function update() {
    const dp = parseFloat(dpEl.value), rho = parseFloat(fEl.value);
    if (isNaN(dp) || isNaN(rho) || dp <= 0 || rho <= 0) return;

    // Bernoulli: q = 0.5 * rho * v^2 => v = sqrt(2 * dp / rho) (m/s)
    const vMs = Math.sqrt((2 * dp) / rho);
    const vKmh = vMs * 3.6;
    const vMph = vMs * 2.23694;
    const vKnots = vMs * 1.94384;

    vResEl.textContent = vMs.toFixed(2) + ' m / s (' + vKnots.toFixed(1) + ' Knots)';
    sResEl.textContent = vKmh.toFixed(1) + ' km/h (' + vMph.toFixed(1) + ' MPH)';
  }

  dpEl.addEventListener('input', update);
  fEl.addEventListener('change', update);
  update();
})();