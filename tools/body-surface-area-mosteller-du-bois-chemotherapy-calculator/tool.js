(() => {
  'use strict';
  const wEl = document.getElementById('bsa-w'), hEl = document.getElementById('bsa-h');
  const mResEl = document.getElementById('bsa-res-most'), otResEl = document.getElementById('bsa-res-other');

  function update() {
    const W = parseFloat(wEl.value), H = parseFloat(hEl.value);
    if (isNaN(W) || isNaN(H) || W <= 0 || H <= 0) return;

    const bsa_mosteller = Math.sqrt((W * H) / 3600.0);
    const bsa_dubois = 0.007184 * Math.pow(W, 0.425) * Math.pow(H, 0.725);
    const bmi = W / Math.pow(H / 100.0, 2);

    mResEl.textContent = 'BSA = ' + bsa_mosteller.toFixed(2) + ' m² (Mosteller)';
    otResEl.textContent = 'Du Bois = ' + bsa_dubois.toFixed(2) + ' m² | BMI = ' + bmi.toFixed(1) + ' kg/m²';
  }

  wEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();