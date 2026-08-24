(() => {
  'use strict';
  const apEl = document.getElementById('tel-ap'), fObjEl = document.getElementById('tel-f-obj'), fEyeEl = document.getElementById('tel-f-eye');
  const magEl = document.getElementById('tel-res-mag'), frEl = document.getElementById('tel-res-fratio'), exitEl = document.getElementById('tel-res-exit');

  function update() {
    const ap = parseFloat(apEl.value), fObj = parseFloat(fObjEl.value), fEye = parseFloat(fEyeEl.value);
    if (isNaN(ap) || isNaN(fObj) || isNaN(fEye) || ap <= 0 || fObj <= 0 || fEye <= 0) return;

    const mag = fObj / fEye;
    const fRatio = fObj / ap;
    const exitPupil = ap / mag;

    magEl.textContent = Math.round(mag) + 'x';
    frEl.textContent = 'f / ' + fRatio.toFixed(1);
    exitEl.textContent = exitPupil.toFixed(2) + ' mm';
  }

  [apEl, fObjEl, fEyeEl].forEach(el => el.addEventListener('input', update));
  update();
})();