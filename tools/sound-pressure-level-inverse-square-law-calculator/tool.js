(() => {
  'use strict';
  const l1El = document.getElementById('spl-l1'), r1El = document.getElementById('spl-r1'), r2El = document.getElementById('spl-r2');
  const l2ResEl = document.getElementById('spl-res-l2'), dpResEl = document.getElementById('spl-res-drop');

  function update() {
    const Lp1 = parseFloat(l1El.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(Lp1) || isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0) return;

    // L_p2 = L_p1 - 20 * log10(r2 / r1)
    const attenuation = 20 * Math.log10(r2 / r1);
    const Lp2 = Lp1 - attenuation;

    // Acoustic pressure p = p0 * 10^(Lp / 20) where p0 = 20 uPa
    const p2_pa = 20e-6 * Math.pow(10, Lp2 / 20);

    let oshaSafety = '';
    if (Lp2 < 85) oshaSafety = 'Continuous Safe Exposure (<85 dB)';
    else if (Lp2 <= 90) oshaSafety = 'OSHA 8-Hour Limit (90 dB)';
    else if (Lp2 <= 95) oshaSafety = 'OSHA 4-Hour Limit (95 dB)';
    else if (Lp2 <= 100) oshaSafety = 'OSHA 2-Hour Limit (100 dB)';
    else if (Lp2 <= 105) oshaSafety = 'OSHA 1-Hour Limit (105 dB)';
    else oshaSafety = 'DANGER: Immediate Hearing Protection Required (>110 dB)';

    l2ResEl.textContent = Lp2.toFixed(1) + ' dB SPL';
    dpResEl.textContent = '-' + attenuation.toFixed(1) + ' dB Attenuation (Pressure: ' + p2_pa.toFixed(3) + ' Pa | ' + oshaSafety + ')';
  }

  [l1El, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();