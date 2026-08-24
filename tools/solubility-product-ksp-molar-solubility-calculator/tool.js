(() => {
  'use strict';
  const tEl = document.getElementById('ksp-type'), kEl = document.getElementById('ksp-val'), mEl = document.getElementById('ksp-mw');
  const molEl = document.getElementById('ksp-res-molar'), massEl = document.getElementById('ksp-res-mass');

  function update() {
    const type = parseInt(tEl.value, 10);
    const ksp = parseFloat(kEl.value);
    const mw = parseFloat(mEl.value) || 100;

    if (isNaN(ksp) || isNaN(mw) || ksp <= 0 || mw <= 0) return;

    let s = 0;
    if (type === 1) { // Ksp = s^2
      s = Math.sqrt(ksp);
    } else if (type === 2) { // Ksp = 4s^3
      s = Math.pow(ksp / 4, 1/3);
    } else if (type === 3) { // Ksp = 27s^4
      s = Math.pow(ksp / 27, 1/4);
    } else if (type === 4) { // Ksp = 108s^5
      s = Math.pow(ksp / 108, 1/5);
    }

    const massSolGpl = s * mw;
    const massSolMgpl = massSolGpl * 1000;

    molEl.textContent = s.toExponential(2) + ' mol/L';
    massEl.textContent = massSolMgpl >= 1000 ? (massSolMgpl / 1000).toFixed(2) + ' g/L' : massSolMgpl.toFixed(2) + ' mg/L';
  }

  tEl.addEventListener('change', update);
  kEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();