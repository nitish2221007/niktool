(() => {
  'use strict';
  const angEl = document.getElementById('stp-ang'), ustepEl = document.getElementById('stp-ustep');
  const pprResEl = document.getElementById('stp-res-ppr'), resResEl = document.getElementById('stp-res-res'), spdResEl = document.getElementById('stp-res-spd');

  function update() {
    const stepAng = parseFloat(angEl.value), ustep = parseInt(ustepEl.value, 10);
    if (isNaN(stepAng) || isNaN(ustep) || stepAng <= 0 || ustep < 1) return;

    // Full steps per rev = 360 / stepAng
    const fullSteps = 360 / stepAng;
    // Total microsteps per rev = fullSteps * ustep
    const totalPpr = fullSteps * ustep;

    // Angular resolution = stepAng / ustep (degrees)
    const angResDeg = stepAng / ustep;
    const arcMins = angResDeg * 60;
    const pulsesPerDeg = totalPpr / 360;

    pprResEl.textContent = totalPpr.toLocaleString() + ' Pulses / Rev';
    resResEl.textContent = angResDeg.toFixed(4) + '° (' + arcMins.toFixed(2) + ' arcmin)';
    spdResEl.textContent = pulsesPerDeg.toFixed(2) + ' Steps / Degree';
  }

  angEl.addEventListener('change', update);
  ustepEl.addEventListener('change', update);
  update();
})();