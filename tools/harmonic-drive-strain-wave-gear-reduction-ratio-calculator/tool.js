(() => {
  'use strict';
  const nfEl = document.getElementById('hd-nflex'), ncEl = document.getElementById('hd-ncirc'), rpmEl = document.getElementById('hd-rpm');
  const rtResEl = document.getElementById('hd-res-ratio'), tqResEl = document.getElementById('hd-res-torque');

  function update() {
    const N_flex = parseInt(nfEl.value, 10), N_circ = parseInt(ncEl.value, 10);
    const rpm_in = parseFloat(rpmEl.value);

    if (isNaN(N_flex) || isNaN(N_circ) || isNaN(rpm_in) || N_flex <= 0 || N_circ <= N_flex) return;

    // Harmonic drive reduction ratio with circular spline fixed and flexspline output:
    // Ratio R = N_flex / ( N_circ - N_flex )
    const diff = N_circ - N_flex;
    const ratio = N_flex / diff;

    // Output speed (rotates in opposite direction to wave generator):
    const rpm_out = - (rpm_in / ratio);

    rtResEl.textContent = 'Gear Ratio R = ' + ratio.toFixed(0) + ' : 1 (Output = ' + rpm_out.toFixed(1) + ' RPM)';
    tqResEl.textContent = 'Zero Backlash (< 1 arcsec) | Torque Boost: ' + ratio.toFixed(0) + '× | Wave Diff = ' + diff + ' Teeth (Input ' + rpm_in + ' RPM)';
  }

  [nfEl, ncEl, rpmEl].forEach(el => el.addEventListener('input', update));
  update();
})();