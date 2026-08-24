(() => {
  'use strict';
  const fEl = document.getElementById('sil-target'), tEl = document.getElementById('sil-temp');
  const lResEl = document.getElementById('sil-res-len'), hResEl = document.getElementById('sil-res-harm');

  function update() {
    const fTarget = parseFloat(fEl.value), Tc = parseFloat(tEl.value);
    if (isNaN(fTarget) || isNaN(Tc) || fTarget <= 0 || Tc < -100) return;

    // Sound speed in air c = 331.3 * sqrt(1 + Tc / 273.15)  [m / s]
    const c = 331.3 * Math.sqrt(1.0 + (Tc / 273.15));

    // Quarter-wave length L = c / (4 * fTarget)  [meters]
    const L_m = c / (4 * fTarget);
    const L_cm = L_m * 100;
    const L_inches = L_cm / 2.54;

    // Odd harmonics attenuated: f_n = (2n - 1) * fTarget
    const f3 = 3 * fTarget;
    const f5 = 5 * fTarget;

    lResEl.textContent = 'L = ' + L_cm.toFixed(1) + ' cm (' + L_inches.toFixed(1) + ' inches Stub Length)';
    hResEl.textContent = 'Notch Harmonics: ' + fTarget.toFixed(0) + ' Hz (1st), ' + f3.toFixed(0) + ' Hz (3rd), ' + f5.toFixed(0) + ' Hz (5th) | Sound Speed c = ' + c.toFixed(1) + ' m/s';
  }

  fEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();