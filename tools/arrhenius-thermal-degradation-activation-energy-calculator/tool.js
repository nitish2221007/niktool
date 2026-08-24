(() => {
  'use strict';
  const eaEl = document.getElementById('arh-ea'), t1El = document.getElementById('arh-t1'), t2El = document.getElementById('arh-t2');
  const aafResEl = document.getElementById('arh-res-aaf'), eqResEl = document.getElementById('arh-res-equiv');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const eaKj = parseFloat(eaEl.value), t1C = parseFloat(t1El.value), t2C = parseFloat(t2El.value);
    if (isNaN(eaKj) || isNaN(t1C) || isNaN(t2C) || eaKj <= 0) return;

    const eaJ = eaKj * 1000;
    const t1K = t1C + 273.15;
    const t2K = t2C + 273.15;

    if (t1K <= 0 || t2K <= 0) return;

    // Arrhenius Ratio: k2 / k1 = exp( (Ea / R) * (1/T1 - 1/T2) )
    const exponent = (eaJ / R) * ((1 / t1K) - (1 / t2K));
    const AAF = Math.exp(exponent);
    const testDaysFor1Year = 365.25 / AAF;

    aafResEl.textContent = AAF.toFixed(1) + 'x Accelerated Degradation Rate';
    eqResEl.textContent = testDaysFor1Year.toFixed(1) + ' Days at ' + t2C + '°C = Exactly 1 Year Life at ' + t1C + '°C';
  }

  [eaEl, t1El, t2El].forEach(el => el.addEventListener('input', update));
  update();
})();