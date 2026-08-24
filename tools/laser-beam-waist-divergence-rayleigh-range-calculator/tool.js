(() => {
  'use strict';
  const lEl = document.getElementById('lsr-lam'), w0El = document.getElementById('lsr-w0'), zEl = document.getElementById('lsr-z');
  const zrResEl = document.getElementById('lsr-res-zr'), wzResEl = document.getElementById('lsr-res-wz');

  function update() {
    const lamNm = parseFloat(lEl.value), w0Um = parseFloat(w0El.value), zM = parseFloat(zEl.value);
    if (isNaN(lamNm) || isNaN(w0Um) || isNaN(zM) || lamNm <= 0 || w0Um <= 0 || zM < 0) return;

    const lamM = lamNm * 1e-9;
    const w0M = w0Um * 1e-6;

    // Rayleigh range: z_R = (pi * w0^2) / lambda  [meters]
    const zrM = (Math.PI * Math.pow(w0M, 2)) / lamM;
    const zrMm = zrM * 1000;

    // Far-field divergence half angle theta = lambda / (pi * w0)  [rad]
    const thetaDivMrad = (lamM / (Math.PI * w0M)) * 1000;

    // Spot radius at distance z: w(z) = w0 * sqrt( 1 + (z / z_R)^2 )
    const wzM = w0M * Math.sqrt(1 + Math.pow(zM / zrM, 2));
    const wzMm = wzM * 1000;

    zrResEl.textContent = (zrMm >= 10.0 ? (zrMm / 10).toFixed(2) + ' cm' : zrMm.toFixed(2) + ' mm') + ' (z_R, 2z_R Depth: ' + (zrMm * 2).toFixed(1) + ' mm)';
    wzResEl.textContent = 'w(' + zM + 'm) = ' + wzMm.toFixed(2) + ' mm Radius (Divergence θ = ' + thetaDivMrad.toFixed(2) + ' mrad)';
  }

  [lEl, w0El, zEl].forEach(el => el.addEventListener('input', update));
  update();
})();