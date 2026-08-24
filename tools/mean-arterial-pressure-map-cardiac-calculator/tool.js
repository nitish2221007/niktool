(() => {
  'use strict';
  const sEl = document.getElementById('map-sbp'), dEl = document.getElementById('map-dbp');
  const mResEl = document.getElementById('map-res-map'), pResEl = document.getElementById('map-res-perf');

  function update() {
    const sbp = parseFloat(sEl.value), dbp = parseFloat(dEl.value);
    if (isNaN(sbp) || isNaN(dbp) || sbp <= dbp || dbp <= 0) return;

    // Pulse Pressure PP = SBP - DBP
    const pp = sbp - dbp;
    // MAP = DBP + (1/3) * PP = (2 * DBP + SBP) / 3  [mmHg]
    const map = dbp + (pp / 3);

    mResEl.textContent = map.toFixed(1) + ' mmHg (Pulse Pressure ' + Math.round(pp) + ' mmHg)';

    if (map >= 70 && map <= 105) {
      pResEl.textContent = 'Normal Optimal Organ Perfusion (MAP 70 to 105 mmHg)';
      pResEl.style.color = '#22543d';
    } else if (map >= 65 && map < 70) {
      pResEl.textContent = 'Adequate Minimum Perfusion (MAP ≥ 65 mmHg ICU Threshold)';
      pResEl.style.color = '#2563eb';
    } else if (map < 65) {
      pResEl.textContent = 'HYPOPERFUSION RISK (MAP < 65 mmHg: Kidney & Brain Ischemia Danger)';
      pResEl.style.color = '#c53030';
    } else {
      pResEl.textContent = 'HYPERTENSION CRISIS RISK (MAP > 105 mmHg: High Cardiac Afterload)';
      pResEl.style.color = '#d97706';
    }
  }

  sEl.addEventListener('input', update);
  dEl.addEventListener('input', update);
  update();
})();