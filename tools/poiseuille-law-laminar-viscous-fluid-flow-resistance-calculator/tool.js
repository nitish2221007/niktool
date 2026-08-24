(() => {
  'use strict';
  const rEl = document.getElementById('ps-r'), dpEl = document.getElementById('ps-dp');
  const muEl = document.getElementById('ps-mu'), lEl = document.getElementById('ps-l');
  const qResEl = document.getElementById('ps-res-q'), r4ResEl = document.getElementById('ps-res-r4');

  function update() {
    const r_mm = parseFloat(rEl.value), dp_mmHg = parseFloat(dpEl.value);
    const mu_mPas = parseFloat(muEl.value), l_cm = parseFloat(lEl.value);

    if (isNaN(r_mm) || isNaN(dp_mmHg) || isNaN(mu_mPas) || isNaN(l_cm) || r_mm <= 0 || dp_mmHg <= 0 || mu_mPas <= 0 || l_cm <= 0) return;

    // Convert to SI:
    const r_m = r_mm / 1000.0;
    const dp_Pa = dp_mmHg * 133.322;
    const mu_Pas = mu_mPas / 1000.0;
    const l_m = l_cm / 100.0;

    // Hagen-Poiseuille equation: Q = ( pi * r^4 * deltaP ) / ( 8 * mu * L )  [m^3 / s]
    const Q_m3s = (Math.PI * Math.pow(r_m, 4) * dp_Pa) / (8.0 * mu_Pas * l_m);
    const Q_Lmin = Q_m3s * 60000.0; // 1 m^3/s = 60,000 L/min

    qResEl.textContent = 'Q = ' + Q_Lmin.toFixed(2) + ' L / min (' + (Q_Lmin * 1000 / 60).toFixed(1) + ' mL/s)';
    r4ResEl.textContent = '4th Power Rule: Halving radius drops flow by 16× (r⁴ = ' + Math.pow(r_mm, 4).toFixed(1) + ' mm⁴ @ ΔP = ' + dp_mmHg + ' mmHg, μ = ' + mu_mPas + ' cP)';
  }

  [rEl, dpEl, muEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();