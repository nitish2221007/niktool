(() => {
  'use strict';
  const mEl = document.getElementById('sdof-m'), kEl = document.getElementById('sdof-k'), zEl = document.getElementById('sdof-zeta');
  const tnResEl = document.getElementById('sdof-res-tn'), omResEl = document.getElementById('sdof-res-om');

  function update() {
    const mTonnes = parseFloat(mEl.value), kKnm = parseFloat(kEl.value), zetaPct = parseFloat(zEl.value);
    if (isNaN(mTonnes) || isNaN(kKnm) || isNaN(zetaPct) || mTonnes <= 0 || kKnm <= 0 || zetaPct < 0) return;

    const mKg = mTonnes * 1000;
    const kNm = kKnm * 1000;
    const zeta = zetaPct / 100;

    // Natural circular frequency omega_n = sqrt(k / m)  [rad / s]
    const omega_n = Math.sqrt(kNm / mKg);
    const fn_hz = omega_n / (2 * Math.PI);
    const Tn_sec = 1 / fn_hz;

    // Damped frequency f_d = f_n * sqrt(1 - zeta^2)
    const fd_hz = fn_hz * Math.sqrt(Math.max(0, 1 - Math.pow(zeta, 2)));

    // Critical damping coefficient c_c = 2 * sqrt(k * m)  [N * s / m]
    const c_c_kn_s_m = (2 * Math.sqrt(kNm * mKg)) / 1000;

    tnResEl.textContent = 'T_n = ' + Tn_sec.toFixed(3) + ' s (f_n = ' + fn_hz.toFixed(2) + ' Hz)';
    omResEl.textContent = 'ω_n = ' + omega_n.toFixed(2) + ' rad/s | f_d = ' + fd_hz.toFixed(2) + ' Hz (c_crit = ' + Math.round(c_c_kn_s_m).toLocaleString() + ' kN·s/m @ ζ = ' + zetaPct + '%)';
  }

  [mEl, kEl, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();