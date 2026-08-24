(() => {
  'use strict';
  const fEl = document.getElementById('vh-f'), d1El = document.getElementById('vh-d1'), d2El = document.getElementById('vh-d2');
  const hvResEl = document.getElementById('vh-res-hv'), gpaResEl = document.getElementById('vh-res-gpa');

  function update() {
    const F = parseFloat(fEl.value), d1Um = parseFloat(d1El.value), d2Um = parseFloat(d2El.value);
    if (isNaN(F) || isNaN(d1Um) || isNaN(d2Um) || F <= 0 || d1Um <= 0 || d2Um <= 0) return;

    // Average diagonal in millimeters
    const dAvgMm = ((d1Um + d2Um) / 2) * 1e-3;

    // HV = (1.8544 * F) / d^2
    const HV = (1.8544 * F) / Math.pow(dAvgMm, 2);
    const gpa = HV * 0.00980665;

    hvResEl.textContent = Math.round(HV) + ' HV' + (F >= 1 ? F : F * 1000 + 'g');
    gpaResEl.textContent = gpa.toFixed(2) + ' GPa Contact Pressure';
  }

  [fEl, d1El, d2El].forEach(el => el.addEventListener('input', update));
  update();
})();