(() => {
  'use strict';
  const dbaEl = document.getElementById('osh-dba'), hrsEl = document.getElementById('osh-hrs');
  const dsResEl = document.getElementById('osh-res-dose'), twResEl = document.getElementById('osh-res-twa');

  function update() {
    const L = parseFloat(dbaEl.value), C = parseFloat(hrsEl.value);
    if (isNaN(L) || isNaN(C) || L <= 0 || C < 0) return;

    // OSHA 5 dB exchange rate reference duration T = 8 / ( 2^( (L - 90) / 5 ) )  [hours]
    const T = 8 / Math.pow(2, (L - 90) / 5);
    // Dose % = (C / T) * 100
    const dosePct = (C / T) * 100;
    // 8-hour TWA = 16.61 * log10(Dose / 100) + 90
    const twa = dosePct > 0 ? 16.61 * Math.log10(dosePct / 100) + 90 : 0;

    dsResEl.textContent = dosePct.toFixed(1) + '% Daily Dose';

    if (dosePct > 100) {
      dsResEl.style.color = '#c53030';
      twResEl.textContent = twa.toFixed(1) + ' dBA TWA (EXCEEDS 100% OSHA PEL: Hearing Protection Required)';
      twResEl.style.color = '#c53030';
    } else if (dosePct >= 50) {
      dsResEl.style.color = '#d97706';
      twResEl.textContent = twa.toFixed(1) + ' dBA TWA (Exceeds 50% Action Level: Hearing Conservation Program)';
      twResEl.style.color = '#d97706';
    } else {
      dsResEl.style.color = '#22543d';
      twResEl.textContent = twa.toFixed(1) + ' dBA TWA (Within Safe 8-Hour OSHA Limits)';
      twResEl.style.color = '#22543d';
    }
  }

  dbaEl.addEventListener('input', update);
  hrsEl.addEventListener('input', update);
  update();
})();