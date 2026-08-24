(() => {
  'use strict';
  const dEl = document.getElementById('lt-d'), sfmEl = document.getElementById('lt-sfm'), iprEl = document.getElementById('lt-ipr');
  const rpmResEl = document.getElementById('lt-res-rpm'), ipmResEl = document.getElementById('lt-res-ipm');

  function update() {
    const D = parseFloat(dEl.value), SFM = parseFloat(sfmEl.value), IPR = parseFloat(iprEl.value);
    if (isNaN(D) || isNaN(SFM) || isNaN(IPR) || D <= 0 || SFM <= 0 || IPR <= 0) return;

    const rpm = (SFM * 3.8197) / D;
    const ipm = rpm * IPR;
    const mmMin = ipm * 25.4;

    rpmResEl.textContent = Math.round(rpm).toLocaleString() + ' RPM (CSS ' + SFM + ' SFM @ Ø ' + D + '")';
    ipmResEl.textContent = ipm.toFixed(2) + ' IPM (' + Math.round(mmMin) + ' mm/min, Feed ' + IPR + ' IPR)';
  }

  [dEl, sfmEl, iprEl].forEach(el => el.addEventListener('input', update));
  update();
})();