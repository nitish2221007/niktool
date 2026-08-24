(() => {
  'use strict';
  const bEl = document.getElementById('hm-body'), r1El = document.getElementById('hm-r1'), r2El = document.getElementById('hm-r2');
  const dvTotResEl = document.getElementById('hm-res-dvtot'), tmResEl = document.getElementById('hm-res-time');

  function update() {
    const isEarth = bEl.value === 'earth';
    const mu = isEarth ? 398600.4418 : 1.32712440018e11;

    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0 || r1 === r2) return;

    const v1 = Math.sqrt(mu / r1);
    const v2 = Math.sqrt(mu / r2);
    const a_tx = (r1 + r2) / 2.0;

    const v_tx1 = Math.sqrt(mu * ((2.0 / r1) - (1.0 / a_tx)));
    const v_tx2 = Math.sqrt(mu * ((2.0 / r2) - (1.0 / a_tx)));

    const delta_v1 = Math.abs(v_tx1 - v1);
    const delta_v2 = Math.abs(v2 - v_tx2);
    const total_delta_v = delta_v1 + delta_v2;

    const t_seconds = Math.PI * Math.sqrt(Math.pow(a_tx, 3) / mu);
    const t_hours = t_seconds / 3600.0;
    const t_days = t_hours / 24.0;

    let timeStr = t_days >= 2.0 ? t_days.toFixed(1) + ' Days (' + (t_days/30.4).toFixed(1) + ' Months)' : t_hours.toFixed(2) + ' Hours';

    dvTotResEl.textContent = 'Total Δv = ' + total_delta_v.toFixed(2) + ' km / s';
    tmResEl.textContent = 'Burn 1 Δv₁ = ' + delta_v1.toFixed(2) + ' km/s | Burn 2 Δv₂ = ' + delta_v2.toFixed(2) + ' km/s | Transfer Duration = ' + timeStr;
  }

  [bEl, r1El, r2El].forEach(el => el.addEventListener('input', update));
  bEl.addEventListener('change', update);
  update();
})();