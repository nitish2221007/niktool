(() => {
  'use strict';
  const vEl = document.getElementById('eg-v'), dpEl = document.getElementById('eg-dp');
  const epEl = document.getElementById('eg-eps'), rhoEl = document.getElementById('eg-rho'), muEl = document.getElementById('eg-mu');
  const dpResEl = document.getElementById('eg-res-dp'), bkResEl = document.getElementById('eg-res-break');

  function update() {
    const v = parseFloat(vEl.value), dp_mm = parseFloat(dpEl.value);
    const eps = parseFloat(epEl.value), rho = parseFloat(rhoEl.value), mu = parseFloat(muEl.value);

    if (isNaN(v) || isNaN(dp_mm) || isNaN(eps) || isNaN(rho) || isNaN(mu) || v <= 0 || dp_mm <= 0 || eps <= 0 || eps >= 1 || rho <= 0 || mu <= 0) return;

    const dp_m = dp_mm * 1e-3;

    // Ergun equation terms:
    // Term 1 (Viscous Blake-Kozeny): 150 * mu * (1-eps)^2 * v / ( eps^3 * dp^2 )
    const term_viscous = 150.0 * mu * Math.pow(1.0 - eps, 2) * v / ( Math.pow(eps, 3) * Math.pow(dp_m, 2) );

    // Term 2 (Inertial Burke-Plummer): 1.75 * rho * (1-eps) * v^2 / ( eps^3 * dp )
    const term_inertial = 1.75 * rho * (1.0 - eps) * Math.pow(v, 2) / ( Math.pow(eps, 3) * dp_m );

    const total_dp_Pa_m = term_viscous + term_inertial;
    const total_dp_kPa_m = total_dp_Pa_m / 1000.0;

    const pct_visc = (term_viscous / total_dp_Pa_m) * 100.0;
    const pct_inert = (term_inertial / total_dp_Pa_m) * 100.0;

    dpResEl.textContent = 'ΔP / L = ' + total_dp_kPa_m.toFixed(1) + ' kPa / m';
    bkResEl.textContent = 'Viscous = ' + (term_viscous/1000).toFixed(2) + ' kPa/m (' + pct_visc.toFixed(1) + '%) | Inertial = ' + (term_inertial/1000).toFixed(2) + ' kPa/m (' + pct_inert.toFixed(1) + '%)';
  }

  [vEl, dpEl, epEl, rhoEl, muEl].forEach(el => el.addEventListener('input', update));
  update();
})();