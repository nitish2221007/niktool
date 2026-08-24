(() => {
  'use strict';
  const tEl = document.getElementById('at-temp'), aEl = document.getElementById('at-a');
  const bEl = document.getElementById('at-b'), cEl = document.getElementById('at-c');
  const psResEl = document.getElementById('at-res-psat'), blResEl = document.getElementById('at-res-boil');

  function update() {
    const T = parseFloat(tEl.value), A = parseFloat(aEl.value);
    const B = parseFloat(bEl.value), C = parseFloat(cEl.value);

    if (isNaN(T) || isNaN(A) || isNaN(B) || isNaN(C) || (T + C) === 0) return;

    // Antoine equation: log10(P_mmHg) = A - ( B / (T + C) )
    const log10_P = A - (B / (T + C));
    const P_mmHg = Math.pow(10.0, log10_P);

    // Conversions:
    const P_bar = P_mmHg / 750.062;
    const P_kPa = P_bar * 100.0;

    let desc = '';
    if (Math.abs(P_mmHg - 760.0) < 5.0) desc = 'NORMAL BOILING POINT (P_sat ≈ 1 atm = 760 mmHg)';
    else if (P_mmHg > 760.0) desc = 'SUPERHEATED VAPOR (P_sat > 1 atm: Boiling under pressure)';
    else desc = 'SUBCOOLED LIQUID (P_sat < 1 atm)';

    psResEl.textContent = 'P_sat = ' + P_mmHg.toFixed(1) + ' mmHg (' + P_kPa.toFixed(2) + ' kPa | ' + P_bar.toFixed(3) + ' bar)';
    blResEl.textContent = desc + ' [A=' + A + ', B=' + B + ', C=' + C + ' @ ' + T + '°C]';
  }

  [tEl, aEl, bEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();