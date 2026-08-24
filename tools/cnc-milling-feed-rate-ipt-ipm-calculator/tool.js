(() => {
  'use strict';
  const dEl = document.getElementById('cnc-d'), sfmEl = document.getElementById('cnc-sfm');
  const flEl = document.getElementById('cnc-fl'), fptEl = document.getElementById('cnc-fpt');
  const ipmResEl = document.getElementById('cnc-res-ipm'), rpmResEl = document.getElementById('cnc-res-rpm');

  function update() {
    const D_in = parseFloat(dEl.value), SFM = parseFloat(sfmEl.value);
    const Z = parseInt(flEl.value, 10), FPT_in = parseFloat(fptEl.value);

    if (isNaN(D_in) || isNaN(SFM) || isNaN(Z) || isNaN(FPT_in) || D_in <= 0 || SFM <= 0 || Z <= 0 || FPT_in <= 0) return;

    const rpm = (SFM * 3.8197) / D_in;
    const ipm = rpm * Z * FPT_in;
    const mmMin = ipm * 25.4;

    ipmResEl.textContent = ipm.toFixed(1) + ' IPM (' + Math.round(mmMin).toLocaleString() + ' mm/min)';
    rpmResEl.textContent = Math.round(rpm).toLocaleString() + ' RPM Spindle Speed (D = ' + D_in + '", ' + Z + '-Flute)';
  }

  [dEl, sfmEl, flEl, fptEl].forEach(el => el.addEventListener('input', update));
  update();
})();