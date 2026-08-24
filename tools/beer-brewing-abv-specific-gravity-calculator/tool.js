(() => {
  'use strict';
  const ogEl = document.getElementById('abv-og'), fgEl = document.getElementById('abv-fg');
  const pctResEl = document.getElementById('abv-res-pct'), attResEl = document.getElementById('abv-res-att');

  function update() {
    const OG = parseFloat(ogEl.value), FG = parseFloat(fgEl.value);
    if (isNaN(OG) || isNaN(FG) || OG <= FG || FG <= 0.990) return;

    // Standard formula: ABV = (OG - FG) * 131.25
    const abv = (OG - FG) * 131.25;
    // Apparent Attenuation = ((OG - FG) / (OG - 1.000)) * 100
    const attenuation = ((OG - FG) / (OG - 1.000)) * 100;
    // Approximate Calories per 12 oz: Cal ≈ [(6.9 * (ABW)) + 4.0 * (RE - 0.1)] * 3.55
    const abw = abv * 0.79336;
    const re = (0.1808 * ((OG - 1) * 1000)) + (0.8192 * ((FG - 1) * 1000));
    const cals = ((6.9 * abw) + 4.0 * ((re / 4) - 0.1)) * 3.55;

    pctResEl.textContent = abv.toFixed(2) + '% ABV (' + abw.toFixed(2) + '% ABW)';
    attResEl.textContent = attenuation.toFixed(1) + '% Attenuation (~' + Math.round(cals) + ' Cal / 12 oz)';
  }

  ogEl.addEventListener('input', update);
  fgEl.addEventListener('input', update);
  update();
})();