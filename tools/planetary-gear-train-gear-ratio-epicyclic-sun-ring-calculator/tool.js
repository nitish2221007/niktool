(() => {
  'use strict';
  const sEl = document.getElementById('pg-sun'), rEl = document.getElementById('pg-ring');
  const rpmEl = document.getElementById('pg-rpm'), cfgEl = document.getElementById('pg-cfg');
  const rtResEl = document.getElementById('pg-res-ratio'), outResEl = document.getElementById('pg-res-out');

  function update() {
    const N_s = parseInt(sEl.value, 10), N_r = parseInt(rEl.value, 10);
    const rpm_in = parseFloat(rpmEl.value), mode = cfgEl.value;

    if (isNaN(N_s) || isNaN(N_r) || isNaN(rpm_in) || N_s <= 0 || N_r <= N_s) return;

    const N_p = (N_r - N_s) / 2.0;
    const ratio = mode === 'red' ? 1.0 + (N_r / N_s) : -(N_r / N_s);
    const rpm_out = rpm_in / Math.abs(ratio);

    rtResEl.textContent = 'Gear Ratio R = ' + Math.abs(ratio).toFixed(2) + ':1 (' + (ratio < 0 ? 'REVERSE' : 'FORWARD') + ')';
    outResEl.textContent = 'Output = ' + (ratio < 0 ? '-' : '') + rpm_out.toFixed(0) + ' RPM (' + Math.abs(ratio).toFixed(2) + '× Torque) | Planet N_p = ' + N_p;
  }

  [sEl, rEl, rpmEl].forEach(el => el.addEventListener('input', update));
  cfgEl.addEventListener('change', update);
  update();
})();