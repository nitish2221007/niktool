(() => {
  'use strict';
  const cEl = document.getElementById('rm-c'), iEl = document.getElementById('rm-i'), aEl = document.getElementById('rm-area');
  const qResEl = document.getElementById('rm-res-q'), ppResEl = document.getElementById('rm-res-pipe');

  function update() {
    const C = parseFloat(cEl.value), I_mm_hr = parseFloat(iEl.value), A_ha = parseFloat(aEl.value);
    if (isNaN(C) || isNaN(I_mm_hr) || isNaN(A_ha) || C <= 0 || C > 1.0 || I_mm_hr <= 0 || A_ha <= 0) return;

    // Rational method SI formula: Q = ( C * I * A ) / 360  [m^3 / s]
    // where I is in mm/hr and A is in hectares (1 ha = 10,000 m^2)
    const Q_m3s = (C * I_mm_hr * A_ha) / 360.0;
    const Q_cfs = Q_m3s * 35.3147;

    // Approximate pipe sizing assuming full gravity flow at v = 1.5 m/s:
    // Area = Q / v => pi * D^2 / 4 = Q / 1.5 => D = sqrt( (4 * Q) / (1.5 * pi) )
    const D_req_m = Math.sqrt((4.0 * Q_m3s) / (1.5 * Math.PI));
    const D_req_mm = Math.round(D_req_m * 1000.0);
    const D_req_in = Math.round(D_req_m * 39.37);

    qResEl.textContent = 'Peak Q = ' + Q_m3s.toFixed(3) + ' m³ / s (' + Q_cfs.toFixed(1) + ' cfs)';
    ppResEl.textContent = 'Recommended Pipe Diameter ≈ ' + D_req_mm + ' mm (' + D_req_in + '" Culvert @ 1.5 m/s | C = ' + C + ' across ' + A_ha + ' ha)';
  }

  [cEl, iEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();