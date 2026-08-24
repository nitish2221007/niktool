(() => {
  'use strict';
  const pEl = document.getElementById('var-port'), vEl = document.getElementById('var-vol');
  const dEl = document.getElementById('var-days'), cEl = document.getElementById('var-conf');
  const vResEl = document.getElementById('var-res-var'), cvResEl = document.getElementById('var-res-cvar');

  const Z_SCORES = {
    '95':   { z: 1.644853, esFactor: 2.0627 },
    '99':   { z: 2.326348, esFactor: 2.6652 },
    '99.9': { z: 3.090232, esFactor: 3.3671 }
  };

  function update() {
    const portVal = parseFloat(pEl.value), volPct = parseFloat(vEl.value), days = parseFloat(dEl.value);
    const conf = Z_SCORES[cEl.value];

    if (isNaN(portVal) || isNaN(volPct) || isNaN(days) || portVal <= 0 || volPct <= 0 || days <= 0) return;

    const sigmaDaily = volPct / 100;
    // Multi-day volatility: sigma_T = sigma_daily * sqrt(days)
    const sigmaHorizon = sigmaDaily * Math.sqrt(days);

    // Parametric VaR = Portfolio * z * sigma_T
    const VaR = portVal * conf.z * sigmaHorizon;
    const varPct = (VaR / portVal) * 100;

    // Expected Shortfall (CVaR) for normal distribution: CVaR = Portfolio * (pdf(z) / (1-alpha)) * sigma_T
    const CVaR = portVal * conf.esFactor * sigmaHorizon;
    const cvarPct = (CVaR / portVal) * 100;

    vResEl.textContent = 'VaR = $' + Math.round(VaR).toLocaleString() + ' (' + varPct.toFixed(2) + '% of Portfolio)';
    cvResEl.textContent = 'CVaR (Expected Shortfall): $' + Math.round(CVaR).toLocaleString() + ' (' + cvarPct.toFixed(2) + '% Tail Loss | ' + days + '-Day Horizon @ ' + cEl.value + '% Conf)';
  }

  [pEl, vEl, dEl].forEach(el => el.addEventListener('input', update));
  cEl.addEventListener('change', update);
  update();
})();