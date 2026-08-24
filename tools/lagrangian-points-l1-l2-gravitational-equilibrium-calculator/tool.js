(() => {
  'use strict';
  const sysEl = document.getElementById('lg-system');
  const dstResEl = document.getElementById('lg-res-dist'), dsResEl = document.getElementById('lg-res-desc');

  function update() {
    const sys = sysEl.value;

    let M1 = 1.989e30, M2 = 5.972e24, R_km = 1.495978707e8, desc = '';

    if (sys === 'sun_earth') {
      M1 = 1.989e30; M2 = 5.972e24; R_km = 1.495978707e8;
      desc = 'Sun-Earth L₂ hosts JWST / Gaia; L₁ hosts SOHO solar observatory';
    } else if (sys === 'earth_moon') {
      M1 = 5.972e24; M2 = 7.342e22; R_km = 384400.0;
      desc = 'Earth-Moon L₁/L₂ gateway for lunar exploration and Artemis missions';
    } else {
      M1 = 1.989e30; M2 = 1.898e27; R_km = 7.785e8;
      desc = 'Sun-Jupiter L₄/L₅ host thousands of Trojan asteroids';
    }

    // Hill sphere / L1-L2 distance approx: r = R * ( M2 / (3 * M1) )^(1/3)
    const r_km = R_km * Math.pow(M2 / (3.0 * M1), 1.0 / 3.0);
    const r_AU = r_km / 1.495978707e8;

    dstResEl.textContent = 'L₁ / L₂ Distance r = ' + Math.round(r_km).toLocaleString() + ' km (' + r_AU.toFixed(4) + ' AU)';
    dsResEl.textContent = desc;
  }

  sysEl.addEventListener('change', update);
  update();
})();