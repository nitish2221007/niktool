(() => {
  'use strict';
  const n1El = document.getElementById('brew-n1'), n2El = document.getElementById('brew-n2');
  const degEl = document.getElementById('brew-res-deg'), compEl = document.getElementById('brew-res-comp');

  function update() {
    const n1 = parseFloat(n1El.value), n2 = parseFloat(n2El.value);
    if (isNaN(n1) || isNaN(n2) || n1 <= 0 || n2 <= 0) return;

    // tan(theta_B) = n2 / n1 => theta_B = atan(n2 / n1)
    const thetaRad = Math.atan(n2 / n1);
    const thetaDeg = (thetaRad * 180) / Math.PI;
    const compDeg = 90 - thetaDeg;

    degEl.textContent = thetaDeg.toFixed(2) + '°';
    compEl.textContent = compDeg.toFixed(2) + '°';
  }

  n1El.addEventListener('input', update);
  n2El.addEventListener('input', update);
  update();
})();