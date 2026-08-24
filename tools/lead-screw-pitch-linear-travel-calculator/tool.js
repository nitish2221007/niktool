(() => {
  'use strict';
  const ldEl = document.getElementById('ls-lead'), msEl = document.getElementById('ls-mstep'), usEl = document.getElementById('ls-ustep');
  const spmResEl = document.getElementById('ls-res-spm'), resResEl = document.getElementById('ls-res-res');

  function update() {
    const leadMm = parseFloat(ldEl.value), fullSteps = parseFloat(msEl.value), usteps = parseFloat(usEl.value);
    if (isNaN(leadMm) || isNaN(fullSteps) || isNaN(usteps) || leadMm <= 0) return;

    // Total steps per revolution = fullSteps * usteps
    const totalStepsRev = fullSteps * usteps;
    // Steps per mm = totalStepsRev / leadMm
    const stepsPerMm = totalStepsRev / leadMm;
    // Resolution per step = 1 / stepsPerMm (in mm)
    const resMm = 1 / stepsPerMm;
    const resUm = resMm * 1000;

    spmResEl.textContent = stepsPerMm.toFixed(2) + ' Steps / mm';
    resResEl.textContent = resUm.toFixed(2) + ' μm (' + resMm.toFixed(4) + ' mm)';
  }

  [ldEl, msEl, usEl].forEach(el => el.addEventListener('input', update));
  update();
})();