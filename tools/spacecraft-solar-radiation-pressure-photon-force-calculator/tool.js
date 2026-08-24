(() => {
  'use strict';
  const arEl = document.getElementById('sp-area'), rEl = document.getElementById('sp-r');
  const mEl = document.getElementById('sp-m'), dsEl = document.getElementById('sp-dist');
  const fResEl = document.getElementById('sp-res-f'), acResEl = document.getElementById('sp-res-acc');

  const c_light = 2.99792458e8;
  const P_sun_1AU = 1361.0;

  function update() {
    const Area_m2 = parseFloat(arEl.value), R = parseFloat(rEl.value);
    const mass_kg = parseFloat(mEl.value), dist_AU = parseFloat(dsEl.value);

    if (isNaN(Area_m2) || isNaN(R) || isNaN(mass_kg) || isNaN(dist_AU) || Area_m2 <= 0 || R < 0 || R > 1 || mass_kg <= 0 || dist_AU <= 0) return;

    const P_sun = P_sun_1AU / Math.pow(dist_AU, 2);
    const P_rad_N_m2 = (P_sun / c_light) * (1.0 + R);
    const F_N = P_rad_N_m2 * Area_m2;
    const F_uN = F_N * 1e6;
    const F_mN = F_N * 1000.0;
    const a_mps2 = F_N / mass_kg;
    const a_um_s2 = a_mps2 * 1e6;
    const dv_per_day_mps = a_mps2 * 86400.0;

    fResEl.textContent = 'SRP Photon Force = ' + Math.round(F_uN).toLocaleString() + ' μN (' + F_mN.toFixed(3) + ' mN)';
    acResEl.textContent = 'Acceleration = ' + a_um_s2.toFixed(1) + ' μm/s² (+' + dv_per_day_mps.toFixed(2) + ' m/s Δv per day!) | Pressure = ' + (P_rad_N_m2*1e6).toFixed(2) + ' μN/m² @ ' + dist_AU + ' AU';
  }

  [arEl, rEl, mEl, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();