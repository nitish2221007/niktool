(() => {
  'use strict';
  const nEl = document.getElementById('pib-n'), lEl = document.getElementById('pib-l');
  const enResEl = document.getElementById('pib-res-en'), jResEl = document.getElementById('pib-res-joules');

  const hPlanck = 6.62607015e-34;
  const mElectron = 9.1093837e-31;
  const eVToJ = 1.602176634e-19;

  function update() {
    const n = parseInt(nEl.value, 10), lNm = parseFloat(lEl.value);
    if (isNaN(n) || isNaN(lNm) || n < 1 || lNm <= 0) return;

    const lM = lNm * 1e-9;
    // E_n = (n^2 * h^2) / (8 * m * L^2)  [Joules]
    const energyJ = (Math.pow(n, 2) * Math.pow(hPlanck, 2)) / (8 * mElectron * Math.pow(lM, 2));
    const energyEv = energyJ / eVToJ;

    enResEl.textContent = energyEv >= 1000 ? (energyEv / 1000).toFixed(2) + ' keV' : energyEv.toFixed(3) + ' eV';
    jResEl.textContent = energyJ.toExponential(2) + ' Joules (n = ' + n + ')';
  }

  nEl.addEventListener('input', update);
  lEl.addEventListener('input', update);
  update();
})();