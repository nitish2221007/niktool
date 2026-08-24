(() => {
  'use strict';
  const angEl = document.getElementById('stp-ang'), ustepEl = document.getElementById('stp-ustep');
  const mechEl = document.getElementById('stp-mech'), spdEl = document.getElementById('stp-spd');
  const sResEl = document.getElementById('stp-res-steps'), fResEl = document.getElementById('stp-res-freq');

  const MECH_MM = {
    'gt2_20': 40.0,
    'gt2_16': 32.0,
    'lead_8': 8.0,
    'lead_2': 2.0
  };

  function update() {
    const stepAngle = parseFloat(angEl.value);
    const usteps = parseInt(ustepEl.value, 10);
    const mmPerRev = MECH_MM[mechEl.value];
    const speedMmS = parseFloat(spdEl.value);

    if (isNaN(stepAngle) || isNaN(usteps) || isNaN(speedMmS) || speedMmS <= 0) return;

    const fullSteps = 360 / stepAngle;
    const totalStepsPerRev = fullSteps * usteps;
    const stepsPerMm = totalStepsPerRev / mmPerRev;
    const resolutionUm = (1 / stepsPerMm) * 1000;

    const pulseHz = stepsPerMm * speedMmS;
    const pulseKhz = pulseHz / 1000;

    sResEl.textContent = stepsPerMm.toFixed(2) + ' Steps / mm (Marlin / Klipper)';
    fResEl.textContent = pulseKhz.toFixed(2) + ' kHz Pulse Rate @ ' + speedMmS.toFixed(0) + ' mm/s (Resolution: ' + resolutionUm.toFixed(2) + ' μm/step)';
  }

  [angEl, ustepEl, mechEl].forEach(el => el.addEventListener('change', update));
  spdEl.addEventListener('input', update);
  update();
})();