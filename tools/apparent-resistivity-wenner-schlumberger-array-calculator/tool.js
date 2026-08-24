(() => {
  'use strict';
  const arEl = document.getElementById('er-array'), aEl = document.getElementById('er-a');
  const dvEl = document.getElementById('er-dv'), iEl = document.getElementById('er-i');
  const rhResEl = document.getElementById('er-res-rho'), geResEl = document.getElementById('er-res-geo');

  function update() {
    const array = arEl.value, a_m = parseFloat(aEl.value);
    const dV_mV = parseFloat(dvEl.value), I_mA = parseFloat(iEl.value);

    if (isNaN(a_m) || isNaN(dV_mV) || isNaN(I_mA) || a_m <= 0 || dV_mV <= 0 || I_mA <= 0) return;

    // Resistance: R = dV / I  [ohms]
    const R_ohm = (dV_mV * 1e-3) / (I_mA * 1e-3);

    // Geometric factor K:
    let K_geom = 0;
    if (array === 'wenner') {
      // Wenner geometric factor: K = 2 * pi * a
      K_geom = 2.0 * Math.PI * a_m;
    } else {
      // Schlumberger with s = 2a (AB/2 = 2a, MN/2 = a/2): K approx pi * ( (AB/2)^2 - (MN/2)^2 ) / MN
      K_geom = Math.PI * a_m * 3.75;
    }

    // Apparent resistivity: rho_a = K_geom * R  [ohm * m]
    const rho_a = K_geom * R_ohm;

    let litho = '';
    if (rho_a < 10) litho = 'SALINE GROUNDWATER / GRAPHITE (< 10 Ω·m)';
    else if (rho_a <= 50) litho = 'CLAY / SILT / SHALE (10 - 50 Ω·m)';
    else if (rho_a <= 250) litho = 'FRESHWATER SAND / GRAVEL AQUIFER (50 - 250 Ω·m)';
    else if (rho_a <= 1000) litho = 'SANDSTONE / LIMESTONE BEDROCK (250 - 1,000 Ω·m)';
    else litho = 'DRY IGNEOUS GRANITE / BASALT (> 1,000 Ω·m)';

    rhResEl.textContent = 'Apparent ρ_a = ' + rho_a.toFixed(2) + ' Ω·m';
    geResEl.textContent = litho + ' [R = ' + R_ohm.toFixed(3) + ' Ω, Geom K = ' + K_geom.toFixed(2) + ' m @ a=' + a_m + ' m]';
  }

  [arEl, aEl, dvEl, iEl].forEach(el => el.addEventListener('input', update));
  arEl.addEventListener('change', update);
  update();
})();