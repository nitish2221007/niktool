(() => {
  'use strict';
  const rEl = document.getElementById('star-rad'), tEl = document.getElementById('star-temp');
  const lResEl = document.getElementById('star-res-lum'), wResEl = document.getElementById('star-res-watts');

  // Sun reference values: T_sun = 5778 K, L_sun = 3.828e26 Watts
  const T_sun = 5778;
  const L_sun_watts = 3.828e26;

  function update() {
    const rSolar = parseFloat(rEl.value), tempK = parseFloat(tEl.value);
    if (isNaN(rSolar) || isNaN(tempK) || rSolar <= 0 || tempK <= 0) return;

    // Luminosity scaling: L / L_sun = (R / R_sun)^2 * (T / T_sun)^4
    const lumSolar = Math.pow(rSolar, 2) * Math.pow(tempK / T_sun, 4);
    const lumWatts = lumSolar * L_sun_watts;

    if (lumSolar > 1000) {
      lResEl.textContent = Math.round(lumSolar).toLocaleString() + ' L_☉ (Solar Luminosities)';
    } else {
      lResEl.textContent = lumSolar.toFixed(2) + ' L_☉ (Solar Luminosities)';
    }

    wResEl.textContent = (lumWatts / 1e26).toFixed(2) + ' × 10²⁶ Watts (Spectral Class ' + (tempK > 30000 ? 'O' : (tempK > 10000 ? 'B' : (tempK > 7500 ? 'A' : (tempK > 6000 ? 'F' : (tempK > 5200 ? 'G (Sun-like)' : (tempK > 3700 ? 'K' : 'M Red Dwarf')))))) + ')';
  }

  rEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();