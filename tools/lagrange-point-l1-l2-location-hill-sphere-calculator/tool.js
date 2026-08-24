(() => {
  'use strict';
  const sysEl = document.getElementById('lag-system');
  const l1ResEl = document.getElementById('lag-res-l1'), hlResEl = document.getElementById('lag-res-hill');

  const SYSTEMS = {
    'sun_earth':   { R_km: 149597870.7, mu_ratio: 3.003e-6, name: 'Sun-Earth System (JWST @ L₂ / SOHO @ L₁)' },
    'earth_moon':  { R_km: 384400.0,    mu_ratio: 0.01215,  name: 'Earth-Moon System (Artemis Gateway L₂)' },
    'sun_jupiter': { R_km: 778500000.0, mu_ratio: 9.537e-4, name: 'Sun-Jupiter System (Trojan Asteroids @ L₄/L₅)' }
  };

  function update() {
    const s = SYSTEMS[sysEl.value];

    // Collinear L1 and L2 approximate distance r_L = R * ( mu_ratio / 3 )^(1/3)  [km]
    const r_L_km = s.R_km * Math.pow(s.mu_ratio / 3.0, 1.0 / 3.0);

    // Hill Sphere radius r_Hill = R * ( mu_ratio / 3 )^(1/3)
    const r_Hill_km = r_L_km;

    const r_L_miles = r_L_km * 0.621371;

    l1ResEl.textContent = 'L₁ / L₂ = ' + Math.round(r_L_km).toLocaleString() + ' km (' + Math.round(r_L_miles).toLocaleString() + ' mi from Secondary)';
    hlResEl.textContent = 'Hill Sphere: ' + Math.round(r_Hill_km).toLocaleString() + ' km | ' + s.name;
  }

  sysEl.addEventListener('change', update);
  update();
})();