(() => {
  'use strict';
  const rEl = document.getElementById('cx-real'), iEl = document.getElementById('cx-imag');
  const magEl = document.getElementById('cx-res-mag'), degEl = document.getElementById('cx-res-deg'), eulEl = document.getElementById('cx-res-euler');

  function update() {
    const a = parseFloat(rEl.value), b = parseFloat(iEl.value);
    if (isNaN(a) || isNaN(b)) return;

    // r = sqrt(a^2 + b^2)
    const r = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
    // theta = atan2(b, a)
    const thetaRad = Math.atan2(b, a);
    const thetaDeg = (thetaRad * 180) / Math.PI;

    magEl.textContent = r.toFixed(3);
    degEl.textContent = thetaDeg.toFixed(2) + '° (' + thetaRad.toFixed(3) + ' rad)';
    eulEl.textContent = r.toFixed(3) + ' · e^(i · ' + thetaRad.toFixed(3) + ')';
  }

  rEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();