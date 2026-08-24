(() => {
  'use strict';
  const dpEl = document.getElementById('st-dp'), rhopEl = document.getElementById('st-rhop');
  const rhofEl = document.getElementById('st-rhof'), muEl = document.getElementById('st-mu');
  const vtResEl = document.getElementById('st-res-vt'), repResEl = document.getElementById('st-res-rep');

  const g = 9.80665; // m/s^2

  function update() {
    const dp_um = parseFloat(dpEl.value), rho_p = parseFloat(rhopEl.value);
    const rho_f = parseFloat(rhofEl.value), mu_cP = parseFloat(muEl.value);

    if (isNaN(dp_um) || isNaN(rho_p) || isNaN(rho_f) || isNaN(mu_cP) || dp_um <= 0 || rho_p <= rho_f || mu_cP <= 0) return;

    const dp_m = dp_um * 1e-6;
    const r_m = dp_m / 2.0;
    const mu_Pa_s = mu_cP * 1e-3;

    // Stokes' Law terminal velocity: v_t = ( 2 * r^2 * (rho_p - rho_f) * g ) / ( 9 * mu )  [m / s]
    const v_t_m_s = (2.0 * Math.pow(r_m, 2) * (rho_p - rho_f) * g) / (9.0 * mu_Pa_s);
    const v_t_mm_s = v_t_m_s * 1000.0;
    const v_t_m_hr = v_t_m_s * 3600.0;

    // Particle Reynolds number: Re_p = ( rho_f * v_t * dp ) / mu
    const Re_p = (rho_f * v_t_m_s * dp_m) / mu_Pa_s;

    let valid = '', color = '#22543d';
    if (Re_p < 0.2) {
      valid = 'CREEPING FLOW (Re_p < 0.2: Stokes law strictly valid ✓)';
      color = '#22543d';
    } else if (Re_p <= 1.0) {
      valid = 'TRANSITION REGIME (Re_p 0.2 - 1.0: Minor inertial drag deviation)';
      color = '#ea580c';
    } else {
      valid = 'TURBULENT WAKE (Re_p > 1.0: Stokes law overestimates settling velocity)';
      color = '#c53030';
    }

    vtResEl.textContent = 'Settling Velocity v_t = ' + v_t_mm_s.toFixed(2) + ' mm/s (' + v_t_m_hr.toFixed(2) + ' m/hr)';
    repResEl.textContent = 'Particle Re_p = ' + Re_p.toFixed(3) + ' (' + valid + ')';
    repResEl.style.color = color;
  }

  [dpEl, rhopEl, rhofEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();