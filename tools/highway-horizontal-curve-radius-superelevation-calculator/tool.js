(() => {
  'use strict';
  const vEl = document.getElementById('hc-v'), eEl = document.getElementById('hc-e'), fsEl = document.getElementById('hc-fs');
  const rmResEl = document.getElementById('hc-res-rmin'), dgResEl = document.getElementById('hc-res-deg');

  function update() {
    const v_kmh = parseFloat(vEl.value), e_pct = parseFloat(eEl.value), f_s = parseFloat(fsEl.value);
    if (isNaN(v_kmh) || isNaN(e_pct) || isNaN(f_s) || v_kmh <= 0 || e_pct < 0 || f_s <= 0) return;

    const e_dec = e_pct / 100.0;

    // Minimum radius: R_min = v^2 / ( 127 * ( e + f_s ) )  [meters]
    const R_min = Math.pow(v_kmh, 2) / (127.0 * (e_dec + f_s));

    // Degree of curve (100 ft arc definition): D = 1746.38 / R_min
    const D_deg = 1746.38 / R_min;

    rmResEl.textContent = 'Min Radius R_min = ' + R_min.toFixed(1) + ' m';
    dgResEl.textContent = 'Degree of Curve D = ' + D_deg.toFixed(2) + '° | e = ' + e_pct + '% bank + f_s = ' + f_s + ' (Resists centrifugal acceleration at ' + v_kmh + ' km/h)';
  }

  [vEl, eEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();