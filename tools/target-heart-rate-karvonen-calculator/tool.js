(() => {
  'use strict';
  const ageEl = document.getElementById('hr-age'), restEl = document.getElementById('hr-rest');
  const z2El = document.getElementById('hr-z2'), z3El = document.getElementById('hr-z3'), z4El = document.getElementById('hr-z4'), z5El = document.getElementById('hr-z5');

  function update() {
    const age = parseFloat(ageEl.value);
    const rest = parseFloat(restEl.value);
    if (isNaN(age) || isNaN(rest) || age <= 0 || rest <= 0) return;

    // Max HR = 220 - age
    const maxHr = 220 - age;
    // HR Reserve (HRR) = Max HR - Resting HR
    const hrr = maxHr - rest;

    function calc(pct) { return Math.round(rest + (hrr * pct)); }

    z2El.textContent = calc(0.60) + ' - ' + calc(0.70) + ' BPM';
    z3El.textContent = calc(0.70) + ' - ' + calc(0.80) + ' BPM';
    z4El.textContent = calc(0.80) + ' - ' + calc(0.90) + ' BPM';
    z5El.textContent = calc(0.90) + ' - ' + maxHr + ' BPM';
  }

  ageEl.addEventListener('input', update);
  restEl.addEventListener('input', update);
  update();
})();