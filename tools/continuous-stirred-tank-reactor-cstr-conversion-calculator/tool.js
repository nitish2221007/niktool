(() => {
  'use strict';
  const vEl = document.getElementById('cs-v'), v0El = document.getElementById('cs-v0'), kEl = document.getElementById('cs-k');
  const xResEl = document.getElementById('cs-res-x'), dtResEl = document.getElementById('cs-res-details');

  function update() {
    const V = parseFloat(vEl.value), v0 = parseFloat(v0El.value), k = parseFloat(kEl.value);
    if (isNaN(V) || isNaN(v0) || isNaN(k) || V <= 0 || v0 <= 0 || k <= 0) return;

    // Space time tau = V / v0  [seconds]
    const tau = V / v0;

    // Damkohler number Da = k * tau
    const Da = k * tau;

    // 1st order CSTR conversion: X = Da / (1 + Da)
    const X = Da / (1.0 + Da);
    const X_pct = X * 100.0;

    xResEl.textContent = 'CSTR Conversion X = ' + X_pct.toFixed(1) + '%';
    dtResEl.textContent = 'Space Time τ = ' + tau.toFixed(1) + ' s | Damköhler Da = ' + Da.toFixed(2) + ' (V = ' + V + ' m³, v₀ = ' + v0 + ' m³/s)';
  }

  [vEl, v0El, kEl].forEach(el => el.addEventListener('input', update));
  update();
})();