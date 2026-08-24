(() => {
  'use strict';
  const qEl = document.getElementById('dp-q'), dEl = document.getElementById('dp-d');
  const debEl = document.getElementById('dp-res-debye'), cmEl = document.getElementById('dp-res-cm');

  const eCharge = 1.602176634e-19; // Coulombs
  const debyeUnit = 3.33564e-30; // 1 Debye in C*m

  function update() {
    const qFrac = parseFloat(qEl.value), dAng = parseFloat(dEl.value);
    if (isNaN(qFrac) || isNaN(dAng) || qFrac <= 0 || dAng <= 0) return;

    const qCoulomb = qFrac * eCharge;
    const dMeters = dAng * 1e-10;

    // mu = q * d (C*m)
    const muCm = qCoulomb * dMeters;
    const muDebye = muCm / debyeUnit;

    debEl.textContent = muDebye.toFixed(2) + ' Debye';
    cmEl.textContent = muCm.toExponential(2) + ' C·m';
  }

  qEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();