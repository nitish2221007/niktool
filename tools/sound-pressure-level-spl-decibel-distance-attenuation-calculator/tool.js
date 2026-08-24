(() => {
  'use strict';
  const spl1El = document.getElementById('sp-spl1'), r1El = document.getElementById('sp-r1'), r2El = document.getElementById('sp-r2');
  const sp2ResEl = document.getElementById('sp-res-spl2'), dpResEl = document.getElementById('sp-res-drop');

  function update() {
    const spl1 = parseFloat(spl1El.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(spl1) || isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0) return;

    // Inverse Square Law spherical point source attenuation:
    // SPL2 = SPL1 - 20 * log10( r2 / r1 )
    const attenuation = 20.0 * Math.log10(r2 / r1);
    const spl2 = spl1 - attenuation;

    let status = '', color = '#22543d';
    if (spl2 <= 55.0) { status = 'QUIET RESIDENTIAL LEVEL (≤ 55 dBA ✓)'; color = '#22543d'; }
    else if (spl2 <= 70.0) { status = 'COMMERCIAL / DAYTIME LIMIT (55 - 70 dBA)'; color = '#22543d'; }
    else if (spl2 <= 85.0) { status = 'INDUSTRIAL OCCUPATIONAL LIMIT (70 - 85 dBA)'; color = '#ea580c'; }
    else { status = 'HAZARDOUS NOISE (> 85 dBA: OSHA Hearing Protection Mandatory ✗)'; color = '#c53030'; }

    sp2ResEl.textContent = 'Target Noise SPL₂ = ' + spl2.toFixed(1) + ' dB';
    sp2ResEl.style.color = color;
    dpResEl.textContent = 'Noise Reduction ΔSPL = -' + attenuation.toFixed(1) + ' dB (' + status + ' @ r₂=' + r2 + ' m)';
  }

  [spl1El, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();