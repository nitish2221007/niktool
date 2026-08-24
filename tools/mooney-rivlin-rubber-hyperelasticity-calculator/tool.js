(() => {
  'use strict';
  const lamEl = document.getElementById('mr-lambda'), c10El = document.getElementById('mr-c10'), c01El = document.getElementById('mr-c01');
  const strResEl = document.getElementById('mr-res-stress'), truResEl = document.getElementById('mr-res-true');

  function update() {
    const lambda = parseFloat(lamEl.value), C10 = parseFloat(c10El.value), C01 = parseFloat(c01El.value);
    if (isNaN(lambda) || isNaN(C10) || isNaN(C01) || lambda <= 1.0) return;

    // Uniaxial Mooney-Rivlin: sigma = 2 * (lambda - 1 / (lambda^2)) * (C10 + C01 / lambda)
    const sigmaEngMpa = 2 * (lambda - (1 / Math.pow(lambda, 2))) * (C10 + (C01 / lambda));
    const sigmaEngPsi = sigmaEngMpa * 145.038;
    const trueStressMpa = sigmaEngMpa * lambda;

    strResEl.textContent = sigmaEngMpa.toFixed(2) + ' MPa (' + Math.round(sigmaEngPsi) + ' psi Engineering)';
    truResEl.textContent = trueStressMpa.toFixed(2) + ' MPa True Cauchy Stress (' + Math.round((lambda - 1) * 100) + '% Strain)';
  }

  [lamEl, c10El, c01El].forEach(el => el.addEventListener('input', update));
  update();
})();