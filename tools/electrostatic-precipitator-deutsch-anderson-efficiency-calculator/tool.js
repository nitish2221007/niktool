(() => {
  'use strict';
  const qEl = document.getElementById('es-q'), aEl = document.getElementById('es-a'), wEl = document.getElementById('es-w');
  const efResEl = document.getElementById('es-res-eff'), scResEl = document.getElementById('es-res-sca');

  function update() {
    const Q = parseFloat(qEl.value), A = parseFloat(aEl.value), w = parseFloat(wEl.value);
    if (isNaN(Q) || isNaN(A) || isNaN(w) || Q <= 0 || A <= 0 || w <= 0) return;

    // Specific Collection Area: SCA = A / Q  [s / m]
    const SCA = A / Q;

    // Deutsch-Anderson equation: eta = 1 - exp( - w * A / Q )
    const exponent = (w * A) / Q;
    const eta = 1.0 - Math.exp(-exponent);
    const eta_pct = eta * 100.0;
    const penetration_pct = (1.0 - eta) * 100.0;

    efResEl.textContent = 'Collection Efficiency η = ' + eta_pct.toFixed(2) + '%';
    scResEl.textContent = 'SCA = ' + SCA.toFixed(1) + ' s/m (' + A.toLocaleString() + ' m² / ' + Q + ' m³/s) | Penetration = ' + penetration_pct.toFixed(2) + '% (w=' + w + ' m/s)';
  }

  [qEl, aEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();