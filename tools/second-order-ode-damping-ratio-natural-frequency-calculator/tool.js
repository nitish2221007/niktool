(() => {
  'use strict';
  const zEl = document.getElementById('so-zeta'), wEl = document.getElementById('so-wn');
  const osResEl = document.getElementById('so-res-os'), tmResEl = document.getElementById('so-res-time');

  function update() {
    const zeta = parseFloat(zEl.value), wn = parseFloat(wEl.value);
    if (isNaN(zeta) || isNaN(wn) || zeta < 0 || wn <= 0) return;

    let os_pct = 0, ts_s = 0, tp_s = 0, wd = 0, regime = '';
    let color = '#22543d';

    if (zeta < 1.0) {
      // Underdamped
      wd = wn * Math.sqrt(1.0 - Math.pow(zeta, 2));
      // %OS = exp( -pi * zeta / sqrt(1 - zeta^2) ) * 100
      os_pct = Math.exp((-Math.PI * zeta) / Math.sqrt(1.0 - Math.pow(zeta, 2))) * 100.0;
      tp_s = Math.PI / wd;
      ts_s = 4.0 / (zeta * wn);
      regime = 'UNDERDAMPED (0 < ζ < 1: Oscillatory transient with overshoot)';
      color = '#22543d';
    } else if (zeta === 1.0) {
      // Critically damped
      os_pct = 0.0;
      ts_s = 5.83 / wn;
      regime = 'CRITICALLY DAMPED (ζ = 1.0: Fastest response without overshoot)';
      color = '#22543d';
    } else {
      // Overdamped
      os_pct = 0.0;
      const s1 = -wn * (zeta - Math.sqrt(Math.pow(zeta, 2) - 1.0));
      ts_s = 4.0 / Math.abs(s1);
      regime = 'OVERDAMPED (ζ > 1: Sluggish non-oscillatory return to equilibrium)';
      color = '#2563eb';
    }

    osResEl.textContent = 'Overshoot %OS = ' + os_pct.toFixed(2) + '% (' + regime.split(' (')[0] + ')';
    osResEl.style.color = color;
    tmResEl.textContent = 'Settling Time t_s = ' + ts_s.toFixed(2) + ' s | ' + (zeta < 1 ? 'Peak Time t_p = ' + tp_s.toFixed(2) + ' s | Damped ω_d = ' + wd.toFixed(2) + ' rad/s' : 'No Oscillation (Real Poles)');
    tmResEl.style.color = color;
  }

  zEl.addEventListener('input', update);
  wEl.addEventListener('input', update);
  update();
})();