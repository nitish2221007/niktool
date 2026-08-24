(() => {
  'use strict';
  const dEl = document.getElementById('pace-dist');
  const hEl = document.getElementById('pace-h'), mEl = document.getElementById('pace-m'), sEl = document.getElementById('pace-s');
  const kmEl = document.getElementById('pace-res-km'), miEl = document.getElementById('pace-res-mi'), spdEl = document.getElementById('pace-res-speed');

  function pad(n) { return n < 10 ? '0' + n : n; }

  function update() {
    const distKm = parseFloat(dEl.value);
    const h = parseInt(hEl.value, 10) || 0;
    const m = parseInt(mEl.value, 10) || 0;
    const s = parseInt(sEl.value, 10) || 0;

    const totalSeconds = h * 3600 + m * 60 + s;
    if (totalSeconds <= 0 || isNaN(distKm) || distKm <= 0) return;

    const secPerKm = totalSeconds / distKm;
    const distMiles = distKm * 0.621371;
    const secPerMile = totalSeconds / distMiles;
    const speedKmh = distKm / (totalSeconds / 3600);

    const kmMin = Math.floor(secPerKm / 60);
    const kmSec = Math.round(secPerKm % 60);

    const miMin = Math.floor(secPerMile / 60);
    const miSec = Math.round(secPerMile % 60);

    kmEl.textContent = kmMin + ':' + pad(kmSec) + ' / km';
    miEl.textContent = miMin + ':' + pad(miSec) + ' / mile';
    spdEl.textContent = speedKmh.toFixed(2) + ' km/h (' + (speedKmh * 0.621371).toFixed(2) + ' mph)';
  }

  [dEl, hEl, mEl, sEl].forEach(el => el.addEventListener('input', update));
  dEl.addEventListener('change', update);
  update();
})();