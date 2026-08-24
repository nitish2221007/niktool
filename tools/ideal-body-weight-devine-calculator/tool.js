(() => {
  'use strict';
  const gEl = document.getElementById('ibw-gender'), hEl = document.getElementById('ibw-ht-cm');
  const dEl = document.getElementById('ibw-res-devine'), rEl = document.getElementById('ibw-res-robinson'), mEl = document.getElementById('ibw-res-hamwi');

  function update() {
    const isMale = gEl.value === 'male';
    const hCm = parseFloat(hEl.value);
    if (isNaN(hCm) || hCm <= 100) return;

    const hInches = hCm / 2.54;
    const over5Ft = Math.max(0, hInches - 60);

    // Devine (1974): Male: 50.0 + 2.3 * over5Ft, Female: 45.5 + 2.3 * over5Ft
    const ibwDevine = isMale ? (50.0 + 2.3 * over5Ft) : (45.5 + 2.3 * over5Ft);
    // Robinson (1983): Male: 52.0 + 1.9 * over5Ft, Female: 49.0 + 1.7 * over5Ft
    const ibwRobinson = isMale ? (52.0 + 1.9 * over5Ft) : (49.0 + 1.7 * over5Ft);
    // Hamwi (1964): Male: 48.0 + 2.7 * over5Ft, Female: 45.5 + 2.2 * over5Ft
    const ibwHamwi = isMale ? (48.0 + 2.7 * over5Ft) : (45.5 + 2.2 * over5Ft);

    dEl.textContent = ibwDevine.toFixed(1) + ' kg (' + (ibwDevine * 2.20462).toFixed(1) + ' lbs)';
    rEl.textContent = ibwRobinson.toFixed(1) + ' kg (' + (ibwRobinson * 2.20462).toFixed(1) + ' lbs)';
    mEl.textContent = ibwHamwi.toFixed(1) + ' kg (' + (ibwHamwi * 2.20462).toFixed(1) + ' lbs)';
  }

  gEl.addEventListener('change', update);
  hEl.addEventListener('input', update);
  update();
})();