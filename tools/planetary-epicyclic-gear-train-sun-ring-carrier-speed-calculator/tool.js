(() => {
  'use strict';
  const nsEl = document.getElementById('pl-ns'), nrEl = document.getElementById('pl-nr');
  const mdEl = document.getElementById('pl-mode'), rpEl = document.getElementById('pl-rpm');
  const rtResEl = document.getElementById('pl-res-ratio'), plResEl = document.getElementById('pl-res-planet');

  function update() {
    const N_s = parseInt(nsEl.value, 10), N_r = parseInt(nrEl.value, 10);
    const mode = mdEl.value, rpm_in = parseFloat(rpEl.value);

    if (isNaN(N_s) || isNaN(N_r) || isNaN(rpm_in) || N_s <= 0 || N_r <= N_s) return;

    // Planet pinion teeth: N_p = (N_r - N_s) / 2
    const N_p = (N_r - N_s) / 2.0;

    let ratio = 0, rpm_out = 0, desc = '';

    if (mode === 'fixed_ring') {
      // Ring fixed (omega_r = 0): omega_s / omega_c = 1 + (N_r / N_s)
      ratio = 1.0 + (N_r / N_s);
      rpm_out = rpm_in / ratio;
      desc = 'Forward Reduction (Ratio = 1 + N_r/N_s)';
    } else if (mode === 'fixed_carrier') {
      // Carrier fixed (omega_c = 0): omega_s / omega_r = - (N_r / N_s)
      ratio = N_r / N_s;
      rpm_out = - (rpm_in / ratio);
      desc = 'Reverse Speed Reduction (Ratio = - N_r/N_s)';
    } else {
      // Sun fixed (omega_s = 0): omega_r / omega_c = 1 + (N_s / N_r)
      ratio = 1.0 + (N_s / N_r);
      rpm_out = rpm_in / ratio;
      desc = 'Low Overdrive Reduction (Ratio = 1 + N_s/N_r)';
    }

    rtResEl.textContent = 'Gear Ratio = ' + ratio.toFixed(2) + ' : 1 (Output = ' + (rpm_out >= 0 ? '+' : '') + rpm_out.toFixed(1) + ' RPM)';
    plResEl.textContent = 'Planet Pinion N_p = ' + N_p + ' Teeth | ' + desc + ' (Sun=' + N_s + ', Ring=' + N_r + ')';
  }

  [nsEl, nrEl, rpEl].forEach(el => el.addEventListener('input', update));
  mdEl.addEventListener('change', update);
  update();
})();