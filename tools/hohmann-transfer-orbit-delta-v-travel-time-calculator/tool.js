(() => {
  'use strict';
  const r1El = document.getElementById('ho-r1'), r2El = document.getElementById('ho-r2'), muEl = document.getElementById('ho-mu');
  const dvResEl = document.getElementById('ho-res-dv'), tmResEl = document.getElementById('ho-res-time');

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value), mu = parseFloat(muEl.value);
    if (isNaN(r1) || isNaN(r2) || isNaN(mu) || r1 <= 0 || r2 <= 0 || mu <= 0 || r1 === r2) return;

    const v_circ_1 = Math.sqrt(mu / r1);
    const v_circ_2 = Math.sqrt(mu / r2);
    const a_tx = (r1 + r2) / 2.0;
    const v_tx_1 = Math.sqrt(mu * ((2.0 / r1) - (1.0 / a_tx)));
    const v_tx_2 = Math.sqrt(mu * ((2.0 / r2) - (1.0 / a_tx)));
    const delta_v1 = Math.abs(v_tx_1 - v_circ_1);
    const delta_v2 = Math.abs(v_circ_2 - v_tx_2);
    const delta_v_tot = delta_v1 + delta_v2;
    const t_tx_s = Math.PI * Math.sqrt(Math.pow(a_tx, 3) / mu);
    const t_tx_hr = t_tx_s / 3600.0;
    const t_tx_days = t_tx_hr / 24.0;

    dvResEl.textContent = 'Total Transfer Δv = ' + delta_v_tot.toFixed(3) + ' km / s';
    tmResEl.textContent = 'Flight Time = ' + (t_tx_days >= 2 ? t_tx_days.toFixed(1) + ' Days (' + Math.round(t_tx_hr) + ' hr)' : t_tx_hr.toFixed(2) + ' Hours') + ' | Burns: Δv₁=' + delta_v1.toFixed(3) + ' km/s, Δv₂=' + delta_v2.toFixed(3) + ' km/s (a_tx=' + Math.round(a_tx).toLocaleString() + ' km)';
  }

  [r1El, r2El, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();