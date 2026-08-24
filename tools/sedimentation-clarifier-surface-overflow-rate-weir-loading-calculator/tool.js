(() => {
  'use strict';
  const qEl = document.getElementById('cl-q'), dEl = document.getElementById('cl-d'), hEl = document.getElementById('cl-h');
  const soResEl = document.getElementById('cl-res-sor'), hrResEl = document.getElementById('cl-res-hrt');

  function update() {
    const Q = parseFloat(qEl.value), D = parseFloat(dEl.value), H = parseFloat(hEl.value);
    if (isNaN(Q) || isNaN(D) || isNaN(H) || Q <= 0 || D <= 0 || H <= 0) return;

    // Surface area: A = pi * D^2 / 4  [m^2]
    const A_surf = (Math.PI * Math.pow(D, 2)) / 4.0;

    // Clarifier volume: V = A * H  [m^3]
    const V = A_surf * H;

    // Surface overflow rate: SOR = Q / A_surf  [m^3 / (m^2 * day) -> m / day]
    const SOR = Q / A_surf;
    const SOR_m_hr = SOR / 24.0;

    // Hydraulic Retention Time: HRT = V / Q * 24  [hours]
    const HRT_hours = (V / Q) * 24.0;

    // Peripheral weir length: L_weir = pi * D  [m]
    const L_weir = Math.PI * D;
    const weir_loading = Q / L_weir;

    soResEl.textContent = 'Overflow Rate SOR = ' + SOR.toFixed(2) + ' m³ / (m²·day) (' + SOR_m_hr.toFixed(3) + ' m/hr)';
    hrResEl.textContent = 'HRT = ' + HRT_hours.toFixed(2) + ' Hours (V = ' + Math.round(V).toLocaleString() + ' m³) | Weir Loading = ' + weir_loading.toFixed(1) + ' m³/(m·day)';
  }

  [qEl, dEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();