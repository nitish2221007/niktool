(() => {
  'use strict';
  const emitEl = document.getElementById('rs-emit'), obsEl = document.getElementById('rs-obs');
  const zEl = document.getElementById('rs-res-z'), velEl = document.getElementById('rs-res-vel'), cPctEl = document.getElementById('rs-res-c-pct');

  const c = 299792.458; // km/s

  function update() {
    const lambda0 = parseFloat(emitEl.value);
    const lambdaObs = parseFloat(obsEl.value);
    if (isNaN(lambda0) || isNaN(lambdaObs) || lambda0 <= 0 || lambdaObs <= 0) return;

    // z = (lambdaObs - lambda0) / lambda0
    const z = (lambdaObs - lambda0) / lambda0;
    // Relativistic velocity: v/c = ((z+1)^2 - 1) / ((z+1)^2 + 1)
    const zPlus1Sq = Math.pow(z + 1, 2);
    const beta = (zPlus1Sq - 1) / (zPlus1Sq + 1);
    const vKms = beta * c;

    zEl.textContent = 'z = ' + z.toFixed(4);
    velEl.textContent = Math.round(vKms).toLocaleString() + ' km/s';
    cPctEl.textContent = (beta * 100).toFixed(2) + '% of c';
  }

  emitEl.addEventListener('input', update);
  obsEl.addEventListener('input', update);
  update();
})();