(() => {
  'use strict';
  const l1El = document.getElementById('db-l1'), r1El = document.getElementById('db-r1'), r2El = document.getElementById('db-r2');
  const l2ResEl = document.getElementById('db-res-l2'), intResEl = document.getElementById('db-res-int');

  const I_0 = 1.0e-12; // Reference threshold of human hearing in W / m^2

  function update() {
    const L1 = parseFloat(l1El.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(L1) || isNaN(r1) || isNaN(r2) || r1 <= 0 || r2 <= 0) return;

    // Inverse square law for sound pressure level in free spherical field:
    // L2 = L1 - 20 * log10( r2 / r1 )
    const drop_dB = 20.0 * Math.log10(r2 / r1);
    const L2 = L1 - drop_dB;

    // Physical intensity at r2: I = I_0 * 10^(L2 / 10)  [W / m^2]
    const I_watts_m2 = I_0 * Math.pow(10.0, L2 / 10.0);

    let desc = '';
    if (L2 >= 85.0) desc = 'HAZARDOUS (≥ 85 dB: OSHA Hearing Protection Required)';
    else if (L2 >= 70.0) desc = 'MODERATE NOISE (70-85 dB: Vacuum cleaner / Traffic)';
    else if (L2 >= 50.0) desc = 'CONVERSATIONAL (50-70 dB: Normal speech / Office)';
    else desc = 'QUIET (≤ 50 dB: Quiet library / Bedroom)';

    l2ResEl.textContent = 'L₂ = ' + L2.toFixed(1) + ' dB (' + desc.split(' (')[0] + ')';
    intResEl.textContent = 'Intensity I = ' + I_watts_m2.toExponential(2) + ' W/m² (' + (drop_dB >= 0 ? '-' : '+') + Math.abs(drop_dB).toFixed(1) + ' dB change @ ' + r2 + ' m | ' + desc + ')';
  }

  [l1El, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();