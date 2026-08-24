(() => {
  'use strict';
  const mrEl = document.getElementById('rel-mr'), veEl = document.getElementById('rel-ve'), dEl = document.getElementById('rel-dist');
  const vResEl = document.getElementById('rel-res-v'), tmResEl = document.getElementById('rel-res-time');

  function update() {
    const mass_ratio = parseFloat(mrEl.value), ve_c = parseFloat(veEl.value), dist_ly = parseFloat(dEl.value);
    if (isNaN(mass_ratio) || isNaN(ve_c) || isNaN(dist_ly) || mass_ratio <= 1.0 || ve_c <= 0 || ve_c > 1.0 || dist_ly <= 0) return;

    // Relativistic Tsiolkovsky equation:
    // v / c = tanh( (v_e / c) * ln( m0 / mf ) )
    const rapidity = ve_c * Math.log(mass_ratio);
    const beta = Math.tanh(rapidity); // v / c

    // Lorentz dilation factor gamma = 1 / sqrt(1 - beta^2) = cosh(rapidity)
    const gamma = 1.0 / Math.sqrt(1.0 - Math.pow(beta, 2));

    // Earth coordinate time to travel distance d at speed v: t_earth = d / v  [years]
    const t_earth_years = dist_ly / beta;

    // Astronaut shipboard proper time tau = t_earth / gamma  [years]
    const tau_ship_years = t_earth_years / gamma;

    vResEl.textContent = 'Final v = ' + beta.toFixed(3) + ' c (Lorentz γ = ' + gamma.toFixed(2) + ')';
    tmResEl.textContent = 'Ship Proper Time τ = ' + tau_ship_years.toFixed(2) + ' yrs | Earth Time t = ' + t_earth_years.toFixed(2) + ' yrs (' + dist_ly + ' ly Voyage @ v_e = ' + ve_c + ' c)';
  }

  [mrEl, veEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();