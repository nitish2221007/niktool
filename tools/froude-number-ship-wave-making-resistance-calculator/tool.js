(() => {
  'use strict';
  const lEl = document.getElementById('fn-lwl'), vEl = document.getElementById('fn-vknots');
  const fnResEl = document.getElementById('fn-res-fn'), hlResEl = document.getElementById('fn-res-hull');

  const g = 9.80665;

  function update() {
    const L_m = parseFloat(lEl.value), vKnots = parseFloat(vEl.value);
    if (isNaN(L_m) || isNaN(vKnots) || L_m <= 0 || vKnots <= 0) return;

    // Convert knots to m/s: 1 knot = 0.514444 m/s
    const v_m_s = vKnots * 0.514444;

    // Froude number Fn = v / sqrt( g * L )
    const Fn = v_m_s / Math.sqrt(g * L_m);

    // Length in feet for standard naval architecture formula: L_ft = L_m * 3.28084
    const L_ft = L_m * 3.28084;
    // Theoretical displacement hull speed in knots = 1.34 * sqrt(L_ft)
    const hullSpeedKnots = 1.34 * Math.sqrt(L_ft);

    // Speed-to-Length Ratio SLR = v_knots / sqrt(L_ft)
    const SLR = vKnots / Math.sqrt(L_ft);

    let regime = '';
    let color = '#22543d';

    if (Fn < 0.40) {
      regime = 'DISPLACEMENT REGIME (Fn < 0.40: Vessel supported purely by Archimedean buoyant forces)';
      color = '#22543d';
    } else if (Fn < 0.90) {
      regime = 'SEMI-DISPLACEMENT (0.40 ≤ Fn < 0.90: High wave-making drag hump, partial dynamic lift)';
      color = '#d97706';
    } else {
      regime = 'PLANING REGIME (Fn ≥ 0.90: Hydrodynamic lift supports hull, skimming above water)';
      color = '#2563eb';
    }

    fnResEl.textContent = 'Fn = ' + Fn.toFixed(3) + ' (' + regime.split('(')[0].trim() + ')';
    hlResEl.textContent = 'Hull Speed = ' + hullSpeedKnots.toFixed(1) + ' Knots (SLR = ' + SLR.toFixed(2) + ' | ' + regime + ')';
    fnResEl.style.color = color;
  }

  lEl.addEventListener('input', update);
  vEl.addEventListener('input', update);
  update();
})();