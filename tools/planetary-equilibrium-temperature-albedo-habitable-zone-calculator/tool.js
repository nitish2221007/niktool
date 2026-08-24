(() => {
  'use strict';
  const tEl = document.getElementById('pe-tstar'), rEl = document.getElementById('pe-rstar');
  const dEl = document.getElementById('pe-dist'), aEl = document.getElementById('pe-albedo');
  const tqResEl = document.getElementById('pe-res-teq'), hzResEl = document.getElementById('pe-res-hz');

  const R_sun_AU = 0.00465047; // R_sun in AU

  function update() {
    const T_star = parseFloat(tEl.value), R_star_sun = parseFloat(rEl.value);
    const d_AU = parseFloat(dEl.value), A = parseFloat(aEl.value);

    if (isNaN(T_star) || isNaN(R_star_sun) || isNaN(d_AU) || isNaN(A) || T_star <= 0 || R_star_sun <= 0 || d_AU <= 0 || A < 0 || A >= 1) return;

    // Stellar luminosity relative to Sun: L / L_sun = (R / R_sun)^2 * (T / 5778)^4
    const L_rel = Math.pow(R_star_sun, 2) * Math.pow(T_star / 5778.0, 4);

    // Habitable zone inner (runaway greenhouse) and outer (maximum greenhouse) boundaries:
    const HZ_inner = Math.sqrt(L_rel / 1.1); // approx 0.95 AU for Sun
    const HZ_outer = Math.sqrt(L_rel / 0.53); // approx 1.37 AU for Sun

    // Equilibrium temperature: T_eq = T_star * (1 - A)^(1/4) * sqrt( R_star_AU / (2 * d_AU) )
    const R_star_AU = R_star_sun * R_sun_AU;
    const T_eq = T_star * Math.pow(1.0 - A, 0.25) * Math.sqrt(R_star_AU / (2.0 * d_AU));
    const T_eq_C = T_eq - 273.15;

    let hzStatus = '', color = '#22543d';
    if (d_AU >= HZ_inner && d_AU <= HZ_outer) {
      hzStatus = 'INSIDE HABITABLE ZONE (' + HZ_inner.toFixed(2) + ' - ' + HZ_outer.toFixed(2) + ' AU: Liquid water stable)';
      color = '#22543d';
    } else if (d_AU < HZ_inner) {
      hzStatus = 'TOO HOT / RUNAWAY GREENHOUSE (d < ' + HZ_inner.toFixed(2) + ' AU: Oceans vaporize like Venus)';
      color = '#c53030';
    } else {
      hzStatus = 'TOO COLD / GLOBAL GLACIATION (d > ' + HZ_outer.toFixed(2) + ' AU: Oceans freeze like Mars)';
      color = '#2563eb';
    }

    tqResEl.textContent = 'Equilibrium T_eq = ' + T_eq.toFixed(1) + ' K (' + (T_eq_C >= 0 ? '+' : '') + T_eq_C.toFixed(1) + ' °C)';
    tqResEl.style.color = color;
    hzResEl.textContent = hzStatus + ' [L* = ' + L_rel.toFixed(2) + ' L_sun, d = ' + d_AU + ' AU]';
    hzResEl.style.color = color;
  }

  [tEl, rEl, dEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();