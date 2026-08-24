(() => {
  'use strict';
  const qEl = document.getElementById('cl-q'), diaEl = document.getElementById('cl-dia'), lEl = document.getElementById('cl-l');
  const hwResEl = document.getElementById('cl-res-hw'), stResEl = document.getElementById('cl-res-stat');

  function update() {
    const Q = parseFloat(qEl.value), D = parseFloat(diaEl.value), L = parseFloat(lEl.value);
    if (isNaN(Q) || isNaN(D) || isNaN(L) || Q <= 0 || D <= 0 || L <= 0) return;

    // Cross-sectional Area A = pi * (D/2)^2
    const Area = (Math.PI / 4.0) * Math.pow(D, 2);

    // Dimensionless discharge parameter: Q / ( A * sqrt(D) )
    const q_param = Q / (Area * Math.sqrt(D));

    // FHWA HDS-5 Form 1 Inlet Control for square edge concrete pipe:
    // For submerged inlet: HW / D = c * ( Q / (A*sqrt(D)) )^2 + Y - 0.5 * S
    // Typical empirical curve: HW/D approx = 0.50 + 0.35 * q_param^1.8
    const HW_over_D = 0.50 + 0.35 * Math.pow(q_param, 1.8);
    const HW_m = HW_over_D * D;

    let status = '', color = '#22543d';
    if (HW_over_D <= 1.2) {
      status = 'UNSUBMERGED INLET (HW/D ≤ 1.20: Low headwater, ample capacity)';
      color = '#22543d';
    } else if (HW_over_D <= 1.5) {
      status = 'SUBMERGED INLET SAFE (HW/D 1.20 - 1.50: Standard highway culvert design threshold)';
      color = '#22543d';
    } else {
      status = 'OVERTOPPING FLOOD RISK (HW/D > 1.50: Road embankment flooding danger, increase diameter!)';
      color = '#c53030';
    }

    hwResEl.textContent = 'Headwater HW = ' + HW_m.toFixed(2) + ' m (HW / D = ' + HW_over_D.toFixed(2) + ')';
    hwResEl.style.color = color;
    stResEl.textContent = status + ' [Q = ' + Q + ' m³/s, D = ' + D + ' m (' + (D * 39.37).toFixed(0) + '") @ L = ' + L + ' m]';
    stResEl.style.color = color;
  }

  [qEl, diaEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();