(() => {
  'use strict';
  const aEl = document.getElementById('bp-a'), pEl = document.getElementById('bp-p');
  const totResEl = document.getElementById('bp-res-tot'), indResEl = document.getElementById('bp-res-indiv');

  function update() {
    const a_AU = parseFloat(aEl.value), P_yr = parseFloat(pEl.value);
    if (isNaN(a_AU) || isNaN(P_yr) || a_AU <= 0 || P_yr <= 0) return;

    // Kepler's Third Law in Solar/AU/Year units: M_total = a^3 / P^2  [M_sun]
    const M_total = Math.pow(a_AU, 3) / Math.pow(P_yr, 2);

    // Approximate 55/45 split for typical visual binary:
    const m1 = M_total * 0.55;
    const m2 = M_total * 0.45;

    totResEl.textContent = 'Total Mass M₁ + M₂ = ' + M_total.toFixed(2) + ' M_sun';
    indResEl.textContent = 'M₁ ≈ ' + m1.toFixed(2) + ' M_sun | M₂ ≈ ' + m2.toFixed(2) + ' M_sun (Separation: ' + a_AU + ' AU, Period: ' + P_yr + ' Years)';
  }

  aEl.addEventListener('input', update);
  pEl.addEventListener('input', update);
  update();
})();