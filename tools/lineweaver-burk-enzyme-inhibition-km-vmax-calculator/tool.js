(() => {
  'use strict';
  const vmEl = document.getElementById('lb-vmax'), kmEl = document.getElementById('lb-km'), mdEl = document.getElementById('lb-mode');
  const eqResEl = document.getElementById('lb-res-eq'), intResEl = document.getElementById('lb-res-int');

  function update() {
    const base_vmax = parseFloat(vmEl.value), base_km = parseFloat(kmEl.value);
    const mode = mdEl.value;

    if (isNaN(base_vmax) || isNaN(base_km) || base_vmax <= 0 || base_km <= 0) return;

    let V_max = base_vmax;
    let K_m = base_km;

    if (mode === 'comp') {
      K_m = base_km * 2.0; // Competitive increases apparent Km
    } else if (mode === 'noncomp') {
      V_max = base_vmax / 2.0; // Non-competitive reduces Vmax
    } else if (mode === 'uncomp') {
      K_m = base_km / 2.0;
      V_max = base_vmax / 2.0;
    }

    // Lineweaver-Burk: 1/V = (Km / Vmax) * (1/[S]) + (1 / Vmax)
    const slope = K_m / V_max;
    const y_intercept = 1.0 / V_max;
    const x_intercept = -1.0 / K_m;

    eqResEl.textContent = '1/V = ' + slope.toFixed(3) + '·(1/[S]) + ' + y_intercept.toFixed(3);
    intResEl.textContent = 'Apparent K_m = ' + K_m.toFixed(2) + ' mM | V_max = ' + V_max.toFixed(1) + ' μmol/min (y-int: ' + y_intercept.toFixed(3) + ', x-int: ' + x_intercept.toFixed(3) + ' mM⁻¹)';
  }

  [vmEl, kmEl].forEach(el => el.addEventListener('input', update));
  mdEl.addEventListener('change', update);
  update();
})();