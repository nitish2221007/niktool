(() => {
  'use strict';
  const mEl = document.getElementById('ps-min'), sEl = document.getElementById('ps-sec');
  const kmhEl = document.getElementById('ps-kmh'), mphEl = document.getElementById('ps-mph');
  const miEl = document.getElementById('ps-res-mile'), k5El = document.getElementById('ps-res-5k'), k10El = document.getElementById('ps-res-10k');

  function fmtTime(totalSec) {
    const m = Math.floor(totalSec / 60);
    const s = Math.round(totalSec % 60);
    return m + ':' + s.toString().padStart(2, '0');
  }

  function updateFromKmPace(totalSecPerKm) {
    if (totalSecPerKm <= 0) return;

    // Speed km/h = 3600 / sec_per_km
    const kmh = 3600 / totalSecPerKm;
    const mph = kmh * 0.621371;
    const secPerMile = totalSecPerKm * 1.60934;

    kmhEl.value = kmh.toFixed(2);
    mphEl.value = mph.toFixed(2);

    miEl.textContent = fmtTime(secPerMile) + ' min/mi';
    k5El.textContent = fmtTime(totalSecPerKm * 5);
    k10El.textContent = fmtTime(totalSecPerKm * 10);
  }

  function onPaceInput() {
    const m = parseInt(mEl.value, 10) || 0;
    const s = parseInt(sEl.value, 10) || 0;
    const tot = m * 60 + s;
    updateFromKmPace(tot);
  }

  mEl.addEventListener('input', onPaceInput);
  sEl.addEventListener('input', onPaceInput);

  kmhEl.addEventListener('input', () => {
    const kmh = parseFloat(kmhEl.value);
    if (!isNaN(kmh) && kmh > 0) {
      const secPerKm = 3600 / kmh;
      mEl.value = Math.floor(secPerKm / 60);
      sEl.value = Math.round(secPerKm % 60).toString().padStart(2, '0');
      updateFromKmPace(secPerKm);
    }
  });

  mphEl.addEventListener('input', () => {
    const mph = parseFloat(mphEl.value);
    if (!isNaN(mph) && mph > 0) {
      const kmh = mph / 0.621371;
      const secPerKm = 3600 / kmh;
      mEl.value = Math.floor(secPerKm / 60);
      sEl.value = Math.round(secPerKm % 60).toString().padStart(2, '0');
      updateFromKmPace(secPerKm);
    }
  });

  onPaceInput();
})();