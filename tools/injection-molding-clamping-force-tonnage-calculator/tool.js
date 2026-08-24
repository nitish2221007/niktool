(() => {
  'use strict';
  const aEl = document.getElementById('clm-area'), cEl = document.getElementById('clm-cav');
  const pEl = document.getElementById('clm-p'), sfEl = document.getElementById('clm-sf');
  const tnResEl = document.getElementById('clm-res-ton'), totResEl = document.getElementById('clm-res-tot');

  function update() {
    const singleAreaCm2 = parseFloat(aEl.value), cavities = parseFloat(cEl.value);
    const pBar = parseFloat(pEl.value), sf = parseFloat(sfEl.value);

    if (isNaN(singleAreaCm2) || isNaN(cavities) || isNaN(pBar) || isNaN(sf) || singleAreaCm2 <= 0 || cavities <= 0 || pBar <= 0 || sf < 1.0) return;

    // Total projected area including runner system (+10% for cold runner)
    const totalAreaCm2 = singleAreaCm2 * cavities * 1.10;
    const totalAreaM2 = totalAreaCm2 / 10000;

    // Pressure in Pa: pBar * 1e5
    const pPa = pBar * 1e5;

    // Opening Force F = P * Area  [Newtons]
    const F_open_N = pPa * totalAreaM2;

    // Clamp Force with safety factor: F_clamp = F_open * sf  [Newtons]
    const F_clamp_N = F_open_N * sf;
    const F_clamp_kN = F_clamp_N / 1000;

    // Metric Tonnes (1 tonne = 9.80665 kN)
    const metricTonnes = F_clamp_kN / 9.80665;
    const usTons = metricTonnes * 1.10231;

    tnResEl.textContent = Math.round(metricTonnes) + ' Metric Tonnes (' + Math.round(usTons) + ' US Tons Clamp)';
    totResEl.textContent = 'Projected Area: ' + Math.round(totalAreaCm2) + ' cm² (with Runners) | Peak Separating Force: ' + Math.round(F_clamp_kN) + ' kN';
  }

  [aEl, cEl, pEl, sfEl].forEach(el => el.addEventListener('input', update));
  update();
})();