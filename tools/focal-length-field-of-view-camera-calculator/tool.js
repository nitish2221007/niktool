(() => {
  'use strict';
  const senEl = document.getElementById('fov-sensor'), flEl = document.getElementById('fov-fl');
  const hResEl = document.getElementById('fov-res-h'), vResEl = document.getElementById('fov-res-v'), dResEl = document.getElementById('fov-res-d');

  function update() {
    const [sw, sh] = senEl.value.split(',').map(Number);
    const fl = parseFloat(flEl.value);
    if (isNaN(fl) || fl <= 0 || !sw || !sh) return;

    // FOV = 2 * atan(dimension / (2 * f))
    const hFovRad = 2 * Math.atan(sw / (2 * fl));
    const vFovRad = 2 * Math.atan(sh / (2 * fl));
    const diag = Math.sqrt(Math.pow(sw, 2) + Math.pow(sh, 2));
    const dFovRad = 2 * Math.atan(diag / (2 * fl));

    const hDeg = (hFovRad * 180) / Math.PI;
    const vDeg = (vFovRad * 180) / Math.PI;
    const dDeg = (dFovRad * 180) / Math.PI;

    hResEl.textContent = hDeg.toFixed(2) + '°';
    vResEl.textContent = vDeg.toFixed(2) + '°';
    dResEl.textContent = dDeg.toFixed(2) + '°' + (fl < 35 ? ' (Wide Angle)' : (fl > 70 ? ' (Telephoto)' : ' (Standard)'));
  }

  senEl.addEventListener('change', update);
  flEl.addEventListener('input', update);
  update();
})();