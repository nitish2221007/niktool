(() => {
  'use strict';
  const spdEl = document.getElementById('vo2-spd'), grdEl = document.getElementById('vo2-grd'), wtEl = document.getElementById('vo2-wt');
  const vResEl = document.getElementById('vo2-res-val'), rResEl = document.getElementById('vo2-res-rate');

  function update() {
    const spdKmh = parseFloat(spdEl.value), gradePct = parseFloat(grdEl.value), wtKg = parseFloat(wtEl.value);
    if (isNaN(spdKmh) || isNaN(gradePct) || isNaN(wtKg) || spdKmh <= 0 || wtKg <= 0 || gradePct < 0) return;

    // Convert speed to meters / min (1 km/h = 16.6667 m/min)
    const spdMpm = spdKmh * (1000 / 60);
    const gradeFrac = gradePct / 100;

    // ACSM Running Equation: VO2 (mL/kg/min) = (0.2 * speed_m_min) + (0.9 * speed_m_min * grade) + 3.5
    const vo2 = (0.2 * spdMpm) + (0.9 * spdMpm * gradeFrac) + 3.5;
    const mets = vo2 / 3.5;

    // Caloric burn rate kcal/min = (VO2 * wtKg / 1000) * 5 kcal/L O2
    const kcalMin = (vo2 * wtKg / 1000) * 5.0;

    let fitnessTier = '';
    if (vo2 < 30) fitnessTier = 'Low Aerobic Capacity';
    else if (vo2 < 40) fitnessTier = 'Fair Fitness';
    else if (vo2 < 50) fitnessTier = 'Good / Excellent Fitness';
    else if (vo2 < 60) fitnessTier = 'Superior Endurance Athlete';
    else fitnessTier = 'Elite Olympic Endurance Tier';

    vResEl.textContent = vo2.toFixed(1) + ' mL / kg / min (VO₂)';
    rResEl.textContent = fitnessTier + ' (' + mets.toFixed(1) + ' METs | ' + kcalMin.toFixed(1) + ' kcal / min)';
  }

  [spdEl, grdEl, wtEl].forEach(el => el.addEventListener('input', update));
  update();
})();