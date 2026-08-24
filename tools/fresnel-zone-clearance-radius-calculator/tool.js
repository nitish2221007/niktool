(() => {
  'use strict';
  const fEl = document.getElementById('fz-freq'), d1El = document.getElementById('fz-d1'), d2El = document.getElementById('fz-d2');
  const r1ResEl = document.getElementById('fz-res-r1'), c60ResEl = document.getElementById('fz-res-60');

  const c = 2.99792458e8;

  function update() {
    const fGhz = parseFloat(fEl.value), d1Km = parseFloat(d1El.value), d2Km = parseFloat(d2El.value);
    if (isNaN(fGhz) || isNaN(d1Km) || isNaN(d2Km) || fGhz <= 0 || d1Km <= 0 || d2Km <= 0) return;

    const fHz = fGhz * 1e9;
    const lambda = c / fHz;
    const d1_m = d1Km * 1000;
    const d2_m = d2Km * 1000;
    const D_total_m = d1_m + d2_m;

    const r1 = Math.sqrt((lambda * d1_m * d2_m) / D_total_m);
    const r1_ft = r1 * 3.28084;
    const r60 = r1 * 0.60;
    const r60_ft = r60 * 3.28084;

    r1ResEl.textContent = 'r₁ = ' + r1.toFixed(2) + ' m (' + r1_ft.toFixed(1) + ' ft Radius)';
    c60ResEl.textContent = '60% Clearance: ' + r60.toFixed(2) + ' m (' + r60_ft.toFixed(1) + ' ft) | Midpoint Total D = ' + (D_total_m/1000).toFixed(1) + ' km';
  }

  [fEl, d1El, d2El].forEach(el => el.addEventListener('input', update));
  update();
})();