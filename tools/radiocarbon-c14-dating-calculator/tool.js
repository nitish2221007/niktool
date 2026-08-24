(() => {
  'use strict';
  const pEl = document.getElementById('c14-pct');
  const aEl = document.getElementById('c14-res-age'), hEl = document.getElementById('c14-res-halves');

  const halfLife = 5730; // C-14 half-life in years

  function update() {
    const pct = parseFloat(pEl.value);
    if (isNaN(pct) || pct <= 0 || pct > 100) return;

    // N(t) / N0 = pct / 100 = e^(-lambda * t)
    // t = -ln(pct / 100) / (ln(2) / 5730)
    const lambda = Math.log(2) / halfLife;
    const ageYears = -Math.log(pct / 100) / lambda;
    const halves = ageYears / halfLife;

    aEl.textContent = Math.round(ageYears).toLocaleString() + ' Years Old';
    hEl.textContent = halves.toFixed(2) + ' Half-Lives';
  }

  pEl.addEventListener('input', update);
  update();
})();