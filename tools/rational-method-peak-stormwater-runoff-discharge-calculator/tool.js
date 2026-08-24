(() => {
  'use strict';
  const cEl = document.getElementById('rm-c'), iEl = document.getElementById('rm-i'), aEl = document.getElementById('rm-a');
  const qResEl = document.getElementById('rm-res-q'), eqResEl = document.getElementById('rm-res-equiv');

  function update() {
    const C = parseFloat(cEl.value), I_mm_hr = parseFloat(iEl.value), A_ha = parseFloat(aEl.value);
    if (isNaN(C) || isNaN(I_mm_hr) || isNaN(A_ha) || C <= 0 || C > 1 || I_mm_hr <= 0 || A_ha <= 0) return;

    // Rational Formula in SI metric:
    // Q (m^3 / s) = ( C * I (mm/hr) * A (ha) ) / 360
    const Q_m3_s = (C * I_mm_hr * A_ha) / 360.0;
    const Q_L_s = Q_m3_s * 1000.0;
    const Q_cfs = Q_m3_s * 35.3147;

    const A_acres = A_ha * 2.47105;

    qResEl.textContent = 'Peak Q = ' + Q_m3_s.toFixed(3) + ' m³/s (' + Q_cfs.toFixed(2) + ' cfs)';
    eqResEl.textContent = 'Flow = ' + Math.round(Q_L_s).toLocaleString() + ' L/s (' + (Q_m3_s * 60).toFixed(1) + ' m³/min) | Area: ' + A_ha + ' ha (' + A_acres.toFixed(1) + ' acres @ C=' + C + ')';
  }

  [cEl, iEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();