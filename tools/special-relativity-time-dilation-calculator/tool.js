(() => {
  'use strict';
  const vEl = document.getElementById('td-vel-pct'), tEl = document.getElementById('td-time');
  const earthEl = document.getElementById('td-res-earth'), gamEl = document.getElementById('td-res-gamma');

  function update() {
    const vPct = parseFloat(vEl.value);
    const tProper = parseFloat(tEl.value);
    if (isNaN(vPct) || isNaN(tProper) || vPct < 0 || vPct >= 100 || tProper <= 0) return;

    const beta = vPct / 100;
    // gamma = 1 / sqrt(1 - beta^2)
    const gamma = 1 / Math.sqrt(1 - Math.pow(beta, 2));
    const tEarth = tProper * gamma;

    earthEl.textContent = tEarth.toFixed(2) + ' Years';
    gamEl.textContent = 'γ = ' + gamma.toFixed(3);
  }

  vEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();