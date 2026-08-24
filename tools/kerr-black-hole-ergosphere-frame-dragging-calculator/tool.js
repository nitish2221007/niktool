(() => {
  'use strict';
  const mEl = document.getElementById('kerr-mass'), aEl = document.getElementById('kerr-spin'), thEl = document.getElementById('kerr-th');
  const reResEl = document.getElementById('kerr-res-re'), pnResEl = document.getElementById('kerr-res-pen');

  const G = 6.67430e-11;
  const c = 299792458;
  const M_sun_kg = 1.98847e30;

  function update() {
    const M_solar = parseFloat(mEl.value), a_star = parseFloat(aEl.value), thetaDeg = parseFloat(thEl.value);
    if (isNaN(M_solar) || isNaN(a_star) || isNaN(thetaDeg) || M_solar <= 0 || a_star < 0 || a_star > 1.0) return;

    const M_kg = M_solar * M_sun_kg;
    const thetaRad = (thetaDeg * Math.PI) / 180;

    // Characteristic gravitational radius r_g = G*M / c^2  [km]
    const r_g_km = ((G * M_kg) / Math.pow(c, 2)) / 1000.0;

    // Outer event horizon r_+ = r_g * ( 1 + sqrt(1 - a*^2) )
    const r_plus_km = r_g_km * (1.0 + Math.sqrt(1.0 - Math.pow(a_star, 2)));

    // Outer ergosphere radius r_E(theta) = r_g * ( 1 + sqrt(1 - a*^2 * cos^2(theta)) )
    const r_E_km = r_g_km * (1.0 + Math.sqrt(1.0 - (Math.pow(a_star, 2) * Math.pow(Math.cos(thetaRad), 2))));

    // Maximum theoretical Penrose energy extraction efficiency: eta = 1 - sqrt( (1 + sqrt(1 - a*^2)) / 2 )
    const eta_penrose = 1.0 - Math.sqrt((1.0 + Math.sqrt(1.0 - Math.pow(a_star, 2))) / 2.0);
    const eta_pct = eta_penrose * 100.0;

    reResEl.textContent = 'r_E = ' + r_E_km.toFixed(2) + ' km (θ = ' + thetaDeg + '°)';
    pnResEl.textContent = 'Horizon r_+ = ' + r_plus_km.toFixed(2) + ' km | Penrose Max Energy Extraction: ' + eta_pct.toFixed(1) + '% of M_BH·c² (Spin a* = ' + a_star + ')';
  }

  [mEl, aEl, thEl].forEach(el => el.addEventListener('input', update));
  update();
})();