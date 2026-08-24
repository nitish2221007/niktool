(() => {
  'use strict';
  const qEl = document.getElementById('as-q'), s0El = document.getElementById('as-s0');
  const vEl = document.getElementById('as-vol'), xEl = document.getElementById('as-x');
  const fmResEl = document.getElementById('as-res-fm'), hrtResEl = document.getElementById('as-res-hrt');

  function update() {
    const Q = parseFloat(qEl.value), S0 = parseFloat(s0El.value);
    const V = parseFloat(vEl.value), X = parseFloat(xEl.value);

    if (isNaN(Q) || isNaN(S0) || isNaN(V) || isNaN(X) || Q <= 0 || S0 <= 0 || V <= 0 || X <= 0) return;

    // Daily Food load = Q * S0 / 1000  [kg BOD / day]
    const food_kg_day = (Q * S0) / 1000.0;

    // Total Microorganisms in aeration tank = V * X / 1000  [kg MLVSS]
    const mass_microbes_kg = (V * X) / 1000.0;

    // F/M ratio = Food / Microorganisms
    const FM_ratio = food_kg_day / mass_microbes_kg;

    // Hydraulic Retention Time HRT (hours) = (V / Q) * 24
    const HRT_hours = (V / Q) * 24.0;

    let regime = '', color = '#22543d';
    if (FM_ratio < 0.15) {
      regime = 'EXTENDED AERATION (F/M < 0.15: High endogenous respiration, low sludge yield)';
      color = '#2563eb';
    } else if (FM_ratio <= 0.50) {
      regime = 'CONVENTIONAL ACTIVATED SLUDGE (F/M 0.20 - 0.50: Optimal BOD removal & good settling)';
      color = '#22543d';
    } else {
      regime = 'HIGH RATE / OVERLOADED (F/M > 0.50: Turbid effluent, poor settling pin-point floc)';
      color = '#c53030';
    }

    fmResEl.textContent = 'F/M = ' + FM_ratio.toFixed(3) + ' kg BOD / kg MLVSS·day';
    fmResEl.style.color = color;
    hrtResEl.textContent = regime + ' | HRT = ' + HRT_hours.toFixed(1) + ' Hours (Food: ' + Math.round(food_kg_day).toLocaleString() + ' kg/d / Microbes: ' + Math.round(mass_microbes_kg).toLocaleString() + ' kg)';
    hrtResEl.style.color = color;
  }

  [qEl, s0El, vEl, xEl].forEach(el => el.addEventListener('input', update));
  update();
})();