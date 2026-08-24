(() => {
  'use strict';
  const pEl = document.getElementById('baro-p'), p0El = document.getElementById('baro-p0'), tEl = document.getElementById('baro-temp');
  const mResEl = document.getElementById('baro-res-alt-m'), ftResEl = document.getElementById('baro-res-alt-ft');

  function update() {
    const P = parseFloat(pEl.value), P0 = parseFloat(p0El.value), tempC = parseFloat(tEl.value);
    if (isNaN(P) || isNaN(P0) || isNaN(tempC) || P <= 0 || P0 <= 0) return;

    // International Standard Barometric Formula:
    // h = ( ((P0 / P)^(1 / 5.25588) - 1) * (tempC + 273.15) ) / 0.0065
    const altM = (((Math.pow(P0 / P, 1 / 5.25588)) - 1) * (tempC + 273.15)) / 0.0065;
    const altFt = altM * 3.28084;

    mResEl.textContent = Math.round(altM).toLocaleString() + ' meters';
    ftResEl.textContent = Math.round(altFt).toLocaleString() + ' Feet';
  }

  [pEl, p0El, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();