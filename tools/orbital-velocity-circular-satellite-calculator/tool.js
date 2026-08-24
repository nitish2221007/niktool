(() => {
  'use strict';
  const altEl = document.getElementById('orb-alt');
  const velEl = document.getElementById('orb-res-vel'), kmhEl = document.getElementById('orb-res-kmh'), perEl = document.getElementById('orb-res-period');

  const G = 6.6743e-11;
  const M_EARTH = 5.9722e24; // kg
  const R_EARTH = 6371e3; // meters

  function update() {
    const altKm = parseFloat(altEl.value);
    if (isNaN(altKm) || altKm < 0) return;

    const r = R_EARTH + (altKm * 1000);
    // v = sqrt(G * M / r)
    const vMs = Math.sqrt((G * M_EARTH) / r);
    const vKms = vMs / 1000;
    const vKmh = vKms * 3600;
    // T = 2 * pi * r / v
    const tSec = (2 * Math.PI * r) / vMs;
    const tMin = tSec / 60;

    velEl.textContent = vKms.toFixed(2) + ' km/s';
    kmhEl.textContent = Math.round(vKmh).toLocaleString() + ' km/h';
    perEl.textContent = tMin >= 120 ? (tMin / 60).toFixed(2) + ' Hours' : tMin.toFixed(2) + ' Minutes';
  }

  altEl.addEventListener('input', update);
  update();
})();