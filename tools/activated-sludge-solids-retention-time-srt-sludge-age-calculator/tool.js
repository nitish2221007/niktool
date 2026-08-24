(() => {
  'use strict';
  const vEl = document.getElementById('as-v'), xEl = document.getElementById('as-x');
  const qwEl = document.getElementById('as-qw'), xwEl = document.getElementById('as-xw');
  const srtResEl = document.getElementById('as-res-srt'), msResEl = document.getElementById('as-res-mass');

  function update() {
    const V = parseFloat(vEl.value), X = parseFloat(xEl.value);
    const Q_w = parseFloat(qwEl.value), X_w = parseFloat(xwEl.value);

    if (isNaN(V) || isNaN(X) || isNaN(Q_w) || isNaN(X_w) || V <= 0 || X <= 0 || Q_w <= 0 || X_w <= 0) return;

    // Total biomass inventory in aeration basin: Mass = V * X * 1e-3 [kg]
    const total_biomass_kg = (V * X) / 1000.0;

    // Daily waste biomass mass: Waste_kg_day = Q_w * X_w * 1e-3 [kg / day]
    const daily_waste_kg = (Q_w * X_w) / 1000.0;

    // Solids Retention Time: theta_c = ( V * X ) / ( Q_w * X_w )  [days]
    const theta_c = (V * X) / (Q_w * X_w);

    let status = '', color = '#22543d';
    if (theta_c >= 10.0) {
      status = 'COMPLETE NITRIFICATION (SRT ≥ 10 Days: Autotrophic nitrifiers flourish ✓)';
      color = '#22543d';
    } else if (theta_c >= 4.0) {
      status = 'CONVENTIONAL CARBONACEOUS BOD REMOVAL (4 - 8 Days)';
      color = '#22543d';
    } else {
      status = 'HIGH-RATE SHORT SRT (Sludge washout risk, poor settling)';
      color = '#ea580c';
    }

    srtResEl.textContent = 'Sludge Age (SRT) θ_c = ' + theta_c.toFixed(2) + ' Days';
    srtResEl.style.color = color;
    msResEl.textContent = 'Inventory = ' + Math.round(total_biomass_kg).toLocaleString() + ' kg MLSS | WAS Waste = ' + Math.round(daily_waste_kg).toLocaleString() + ' kg/day (' + status.split(' (')[0] + ')';
  }

  [vEl, xEl, qwEl, xwEl].forEach(el => el.addEventListener('input', update));
  update();
})();