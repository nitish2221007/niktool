(() => {
  'use strict';
  const b5El = document.getElementById('bod-5'), kEl = document.getElementById('bod-k'), tEl = document.getElementById('bod-temp');
  const uResEl = document.getElementById('bod-res-bodu'), fResEl = document.getElementById('bod-res-frac');

  function update() {
    const bod5 = parseFloat(b5El.value), k20 = parseFloat(kEl.value), tempC = parseFloat(tEl.value);
    if (isNaN(bod5) || isNaN(k20) || isNaN(tempC) || bod5 <= 0 || k20 <= 0) return;

    // Temperature correction: k_T = k_20 * theta^(T - 20) where theta = 1.047
    const kT = k20 * Math.pow(1.047, tempC - 20);

    // BOD_5 = BOD_u * (1 - exp(-5 * kT)) => BOD_u = BOD_5 / (1 - exp(-5 * kT))
    const exertionFraction = 1 - Math.exp(-5 * kT);
    const bodU = bod5 / exertionFraction;

    uResEl.textContent = bodU.toFixed(1) + ' mg / L Ultimate BOD';
    fResEl.textContent = (exertionFraction * 100).toFixed(1) + '% Exerted at ' + tempC + '°C (k_T = ' + kT.toFixed(3) + ' d⁻¹)';
  }

  [b5El, kEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();