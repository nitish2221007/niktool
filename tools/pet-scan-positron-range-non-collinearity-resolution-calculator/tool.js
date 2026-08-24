(() => {
  'use strict';
  const isoEl = document.getElementById('pet-iso'), crystEl = document.getElementById('pet-cryst'), diaEl = document.getElementById('pet-dia');
  const fResEl = document.getElementById('pet-res-fwhm'), spResEl = document.getElementById('pet-res-split');

  const ISOS = {
    'f18':  { r_range: 0.54, name: 'Fluorine-18 (F-18)' },
    'c11':  { r_range: 0.92, name: 'Carbon-11 (C-11)' },
    'ga68': { r_range: 2.40, name: 'Gallium-68 (Ga-68)' },
    'rb82': { r_range: 5.50, name: 'Rubidium-82 (Rb-82)' }
  };

  function update() {
    const iso = ISOS[isoEl.value];
    const dMm = parseFloat(crystEl.value), ringDiaCm = parseFloat(diaEl.value);

    if (isNaN(dMm) || isNaN(ringDiaCm) || dMm <= 0 || ringDiaCm <= 0) return;

    // 1. Geometric detector resolution R_det = d / 2  [mm]
    const R_det = dMm / 2;

    // 2. Photon non-collinearity blurring R_180 = 0.0022 * D_ring  [mm]
    const D_ring_mm = ringDiaCm * 10;
    const R_180 = 0.0022 * D_ring_mm;

    // 3. Positron kinetic range blurring R_range
    const R_range = iso.r_range;

    // 4. Reconstruction filter blurring R_filter approx 1.0 mm
    const R_filter = 1.0;

    // Total FWHM resolution = sqrt( R_det^2 + R_180^2 + R_range^2 + R_filter^2 )
    const R_total = Math.sqrt(Math.pow(R_det, 2) + Math.pow(R_180, 2) + Math.pow(R_range, 2) + Math.pow(R_filter, 2));

    fResEl.textContent = 'R_FWHM = ' + R_total.toFixed(2) + ' mm (Spatial Resolution)';
    spResEl.textContent = 'Detector: ' + R_det.toFixed(2) + ' mm | 180° Acollinearity: ' + R_180.toFixed(2) + ' mm | Positron Range: ' + R_range.toFixed(2) + ' mm (' + iso.name + ')';
  }

  isoEl.addEventListener('change', update);
  crystEl.addEventListener('input', update);
  diaEl.addEventListener('input', update);
  update();
})();