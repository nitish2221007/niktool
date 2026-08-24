(() => {
  'use strict';
  const dEl = document.getElementById('bed-d'), nEl = document.getElementById('bed-n'), abEl = document.getElementById('bed-ab');
  const bResEl = document.getElementById('bed-res-val'), eqResEl = document.getElementById('bed-res-eqd2');

  function update() {
    const d = parseFloat(dEl.value), n = parseFloat(nEl.value), ab = parseFloat(abEl.value);
    if (isNaN(d) || isNaN(n) || isNaN(ab) || d <= 0 || n <= 0 || ab <= 0) return;

    const totalPhysicalDose = n * d;

    // Linear-Quadratic Model: BED = n * d * ( 1 + d / (alpha/beta) )  [Gy]
    const BED = totalPhysicalDose * (1.0 + (d / ab));

    // EQD2 = BED / ( 1 + 2.0 / (alpha/beta) )  [Gy in 2 Gy fractions]
    const EQD2 = BED / (1.0 + (2.0 / ab));

    bResEl.textContent = 'BED_' + ab.toFixed(0) + ' = ' + BED.toFixed(1) + ' Gy_' + ab.toFixed(0);
    eqResEl.textContent = 'EQD2 = ' + EQD2.toFixed(1) + ' Gy (Physical Dose: ' + totalPhysicalDose.toFixed(1) + ' Gy in ' + n + ' × ' + d.toFixed(1) + ' Gy Fractions)';
  }

  [dEl, nEl].forEach(el => el.addEventListener('input', update));
  abEl.addEventListener('change', update);
  update();
})();