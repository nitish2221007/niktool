(() => {
  'use strict';
  const matEl = document.getElementById('ht-mat'), mEl = document.getElementById('ht-mass'), dtEl = document.getElementById('ht-dt');
  const kjEl = document.getElementById('ht-res-kj'), kcalEl = document.getElementById('ht-res-kcal'), kwhEl = document.getElementById('ht-res-kwh');

  function update() {
    const c = parseFloat(matEl.value);
    const m = parseFloat(mEl.value);
    const dt = parseFloat(dtEl.value);

    if (isNaN(c) || isNaN(m) || isNaN(dt) || m <= 0 || dt === 0) return;

    // Q = m * c * deltaT (in Joules)
    const qJoules = m * c * dt;
    const qKj = qJoules / 1000;
    const qKcal = Math.abs(qJoules) / 4184;
    const qKwh = Math.abs(qJoules) / 3600000;

    kjEl.textContent = (qKj >= 0 ? '+' : '-') + Math.abs(qKj).toFixed(2) + ' kJ';
    kcalEl.textContent = qKcal.toFixed(2) + ' kcal';
    kwhEl.textContent = qKwh.toFixed(3) + ' kWh';
  }

  matEl.addEventListener('change', update);
  mEl.addEventListener('input', update);
  dtEl.addEventListener('input', update);
  update();
})();