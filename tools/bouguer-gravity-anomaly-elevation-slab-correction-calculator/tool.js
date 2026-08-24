(() => {
  'use strict';
  const gobsEl = document.getElementById('bg-gobs'), g0El = document.getElementById('bg-g0');
  const hEl = document.getElementById('bg-elev'), rhoEl = document.getElementById('bg-rho');
  const bgResEl = document.getElementById('bg-res-boug'), faResEl = document.getElementById('bg-res-fac');

  function update() {
    const g_obs = parseFloat(gobsEl.value), g_0 = parseFloat(g0El.value);
    const h = parseFloat(hEl.value), rho = parseFloat(rhoEl.value);

    if (isNaN(g_obs) || isNaN(g_0) || isNaN(h) || isNaN(rho) || rho <= 0) return;

    // Free-Air Correction: FAC = + 0.3086 * h  [mGal]
    const FAC = 0.3086 * h;
    const FreeAir_anomaly = (g_obs - g_0) + FAC;

    // Bouguer Plate Slab Correction: BC = - 2 * pi * G * rho * h = - 0.04193 * rho * h  [mGal]
    const BC = 0.04193 * rho * h;

    // Bouguer Anomaly: Delta_g_B = (g_obs - g_0) + FAC - BC
    const Delta_g_B = FreeAir_anomaly - BC;

    bgResEl.textContent = 'Bouguer Anomaly Δg_B = ' + (Delta_g_B >= 0 ? '+' : '') + Delta_g_B.toFixed(1) + ' mGal';
    faResEl.textContent = 'Free-Air Δg_FA = ' + (FreeAir_anomaly >= 0 ? '+' : '') + FreeAir_anomaly.toFixed(1) + ' mGal | Slab BC = -' + BC.toFixed(1) + ' mGal (h=' + h + ' m @ ρ=' + rho + ' g/cm³)';
  }

  [gobsEl, g0El, hEl, rhoEl].forEach(el => el.addEventListener('input', update));
  update();
})();