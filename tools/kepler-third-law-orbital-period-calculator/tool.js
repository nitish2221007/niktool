(() => {
  'use strict';
  const aEl = document.getElementById('kep-a'), mEl = document.getElementById('kep-m');
  const tResEl = document.getElementById('kep-res-t'), dResEl = document.getElementById('kep-res-days');

  function update() {
    const aAu = parseFloat(aEl.value), mSolar = parseFloat(mEl.value);
    if (isNaN(aAu) || isNaN(mSolar) || aAu <= 0 || mSolar <= 0) return;

    // Kepler's Third Law in Solar System units:
    // T^2 = a^3 / M  =>  T = sqrt( a^3 / M )  [Earth Years]
    const tYears = Math.sqrt(Math.pow(aAu, 3) / mSolar);
    const tDays = tYears * 365.256;
    // Mean orbital speed v ≈ 29.78 * sqrt(M / a)  [km/s]
    const orbSpeed = 29.78 * Math.sqrt(mSolar / aAu);

    tResEl.textContent = tYears >= 1.0 ? tYears.toFixed(2) + ' Earth Years' : (tYears * 12).toFixed(2) + ' Months';
    dResEl.textContent = Math.round(tDays).toLocaleString() + ' Days (Mean Orbit Speed: ' + orbSpeed.toFixed(2) + ' km/s)';
  }

  aEl.addEventListener('input', update);
  mEl.addEventListener('input', update);
  update();
})();