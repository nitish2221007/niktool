(() => {
  'use strict';
  const dEl = document.getElementById('wt-d'), vEl = document.getElementById('wt-v'), cpEl = document.getElementById('wt-cp');
  const kwResEl = document.getElementById('wt-res-kw'), bzResEl = document.getElementById('wt-res-betz');

  const rho_air = 1.225;

  function update() {
    const D = parseFloat(dEl.value), v = parseFloat(vEl.value), Cp = parseFloat(cpEl.value);
    if (isNaN(D) || isNaN(v) || isNaN(Cp) || D <= 0 || v <= 0 || Cp <= 0 || Cp > 0.593) return;

    const A = Math.PI * Math.pow(D / 2, 2);
    const pWindWatts = 0.5 * rho_air * A * Math.pow(v, 3);
    const pExtractWatts = pWindWatts * Cp * 0.92;
    const pExtractKw = pExtractWatts / 1000;
    const pExtractMw = pExtractKw / 1000;

    const pBetzWatts = pWindWatts * (16 / 27);
    const pBetzKw = pBetzWatts / 1000;
    const betzRatioPct = (pExtractKw / pBetzKw) * 100;

    kwResEl.textContent = (pExtractKw >= 1000 ? pExtractMw.toFixed(2) + ' MW' : Math.round(pExtractKw).toLocaleString() + ' kW') + ' Output Power';
    bzResEl.textContent = 'Betz Theoretical Max: ' + Math.round(pBetzKw).toLocaleString() + ' kW (' + betzRatioPct.toFixed(1) + '% of Betz Limit, Swept: ' + Math.round(A).toLocaleString() + ' m²)';
  }

  [dEl, vEl, cpEl].forEach(el => el.addEventListener('input', update));
  update();
})();