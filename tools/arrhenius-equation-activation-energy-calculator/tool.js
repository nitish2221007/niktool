(() => {
  'use strict';
  const t1El = document.getElementById('arr-t1'), k1El = document.getElementById('arr-k1');
  const t2El = document.getElementById('arr-t2'), k2El = document.getElementById('arr-k2');
  const eaResEl = document.getElementById('arr-res-ea'), facResEl = document.getElementById('arr-res-factor');

  const R = 8.314462618; // J / (mol * K)

  function update() {
    const t1C = parseFloat(t1El.value), k1 = parseFloat(k1El.value);
    const t2C = parseFloat(t2El.value), k2 = parseFloat(k2El.value);

    if (isNaN(t1C) || isNaN(k1) || isNaN(t2C) || isNaN(k2) || k1 <= 0 || k2 <= 0 || t1C === t2C) return;

    const T1 = t1C + 273.15;
    const T2 = t2C + 273.15;

    // ln(k2 / k1) = -(Ea / R) * (1/T2 - 1/T1) = (Ea / R) * (1/T1 - 1/T2)
    // Ea = (R * ln(k2 / k1)) / (1/T1 - 1/T2)
    const EaJoules = (R * Math.log(k2 / k1)) / ((1 / T1) - (1 / T2));
    const EaKj = EaJoules / 1000;
    const factor = k2 / k1;

    eaResEl.textContent = EaKj.toFixed(2) + ' kJ / mol';
    facResEl.textContent = factor.toFixed(2) + 'x Rate Increase';
  }

  [t1El, k1El, t2El, k2El].forEach(el => el.addEventListener('input', update));
  update();
})();