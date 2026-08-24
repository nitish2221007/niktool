(() => {
  'use strict';
  const dEl = document.getElementById('dct-dia'), cfmEl = document.getElementById('dct-cfm'), lEl = document.getElementById('dct-len');
  const pResEl = document.getElementById('dct-res-dp'), vResEl = document.getElementById('dct-res-vel');

  const rho = 1.204;
  const f_darcy = 0.019;

  function update() {
    const D_mm = parseFloat(dEl.value), cfm = parseFloat(cfmEl.value), L_m = parseFloat(lEl.value);
    if (isNaN(D_mm) || isNaN(cfm) || isNaN(L_m) || D_mm <= 0 || cfm <= 0 || L_m <= 0) return;

    const D_m = D_mm / 1000;
    const area_m2 = Math.PI * Math.pow(D_m / 2, 2);
    const Q_m3s = cfm * 0.00047194745;
    const vel_ms = Q_m3s / area_m2;
    const vel_fpm = vel_ms * 196.85;

    const deltaP_pa = f_darcy * (L_m / D_m) * (0.5 * rho * Math.pow(vel_ms, 2));
    const deltaP_in_wg = deltaP_pa * 0.00401865;
    const pa_per_m = deltaP_pa / L_m;

    pResEl.textContent = deltaP_pa.toFixed(1) + ' Pa (' + deltaP_in_wg.toFixed(3) + ' in. w.g.)';
    vResEl.textContent = 'Velocity: ' + vel_ms.toFixed(2) + ' m/s (' + Math.round(vel_fpm) + ' FPM) | Friction: ' + pa_per_m.toFixed(3) + ' Pa/m (0.08 in/100ft opt)';
  }

  [dEl, cfmEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();