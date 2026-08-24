(() => {
  'use strict';
  const aEl = document.getElementById('kp-a'), mEl = document.getElementById('kp-m');
  const tResEl = document.getElementById('kp-res-t'), vResEl = document.getElementById('kp-res-vel');

  function update() {
    const a_AU = parseFloat(aEl.value), M_star = parseFloat(mEl.value);
    if (isNaN(a_AU) || isNaN(M_star) || a_AU <= 0 || M_star <= 0) return;

    // Kepler's Third Law in Solar System units: T (years) = sqrt( a^3 / M_star )
    const T_years = Math.sqrt(Math.pow(a_AU, 3) / M_star);
    const T_days = T_years * 365.256;

    // Orbital speed in km/s: v approx = 29.78 / sqrt(a_AU) * sqrt(M_star)
    const v_kms = (29.78 / Math.sqrt(a_AU)) * Math.sqrt(M_star);
    const dist_million_km = a_AU * 149.59787;

    tResEl.textContent = 'Period T = ' + T_years.toFixed(2) + ' Years (' + T_days.toFixed(1) + ' Days)';
    vResEl.textContent = 'Mean Speed = ' + v_kms.toFixed(2) + ' km/s (Orbit Radius: ' + dist_million_km.toFixed(1) + 'M km @ a = ' + a_AU + ' AU)';
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();