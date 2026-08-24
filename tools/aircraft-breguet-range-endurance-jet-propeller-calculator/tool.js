(() => {
  'use strict';
  const vEl = document.getElementById('br-v'), tsEl = document.getElementById('br-tsfc');
  const ldEl = document.getElementById('br-ld'), w0El = document.getElementById('br-w0'), w1El = document.getElementById('br-w1');
  const rResEl = document.getElementById('br-res-r'), enResEl = document.getElementById('br-res-end');

  function update() {
    const V_kmh = parseFloat(vEl.value), TSFC_hr = parseFloat(tsEl.value);
    const LD = parseFloat(ldEl.value), W0 = parseFloat(w0El.value), W1 = parseFloat(w1El.value);

    if (isNaN(V_kmh) || isNaN(TSFC_hr) || isNaN(LD) || isNaN(W0) || isNaN(W1) || V_kmh <= 0 || TSFC_hr <= 0 || LD <= 0 || W0 <= W1 || W1 <= 0) return;

    const weight_ratio = W0 / W1;
    const ln_w = Math.log(weight_ratio);
    const Range_km = (V_kmh / TSFC_hr) * LD * ln_w;
    const Range_NM = Range_km / 1.852;
    const Endurance_hr = (1.0 / TSFC_hr) * LD * ln_w;
    const fuel_kg = W0 - W1;
    const fuel_pct = (fuel_kg / W0) * 100.0;

    rResEl.textContent = 'Cruise Range R = ' + Math.round(Range_km).toLocaleString() + ' km (' + Math.round(Range_NM).toLocaleString() + ' NM)';
    enResEl.textContent = 'Flight Endurance = ' + Endurance_hr.toFixed(2) + ' Hours | Fuel Burn = ' + Math.round(fuel_kg).toLocaleString() + ' kg (' + fuel_pct.toFixed(1) + '% MTOW @ L/D=' + LD + ')';
  }

  [vEl, tsEl, ldEl, w0El, w1El].forEach(el => el.addEventListener('input', update));
  update();
})();