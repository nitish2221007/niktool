(() => {
  'use strict';
  const mEl = document.getElementById('bh-mass'), tEl = document.getElementById('bh-type');
  const rsResEl = document.getElementById('bh-res-rs'), auResEl = document.getElementById('bh-res-au');

  // G = 6.67430e-11, c = 2.99792458e8, M_sun = 1.98847e30 kg
  // R_s (meters) = (2 * G * M_kg) / c^2
  // R_s per solar mass = (2 * 6.67430e-11 * 1.98847e30) / (2.99792458e8)^2 ≈ 2953.25 meters = 2.953 km / M_sun

  function update() {
    const mSolar = parseFloat(mEl.value);
    if (isNaN(mSolar) || mSolar <= 0) return;

    const rsKm = mSolar * 2.95325;
    const rsMiles = rsKm * 0.621371;
    const rsAu = rsKm / 1.495978707e8;

    if (rsKm > 1e6) {
      rsResEl.textContent = (rsKm / 1e6).toFixed(2) + ' Million km (Event Horizon Radius)';
    } else {
      rsResEl.textContent = rsKm.toFixed(2) + ' km (' + rsMiles.toFixed(2) + ' Miles)';
    }

    auResEl.textContent = rsAu.toFixed(4) + ' AU (' + (rsKm > 1e6 ? (rsMiles / 1e6).toFixed(2) + ' Million Miles' : rsMiles.toFixed(1) + ' Miles)');
  }

  tEl.addEventListener('change', () => {
    if (tEl.value !== 'custom') {
      mEl.value = tEl.value;
      update();
    }
  });

  mEl.addEventListener('input', () => {
    tEl.value = 'custom';
    update();
  });

  update();
})();