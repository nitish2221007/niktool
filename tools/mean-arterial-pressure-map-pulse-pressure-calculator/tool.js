(() => {
  'use strict';
  const sbpEl = document.getElementById('map-sbp'), dbpEl = document.getElementById('map-dbp');
  const mapResEl = document.getElementById('map-res-map'), ppResEl = document.getElementById('map-res-pp');

  function update() {
    const sbp = parseFloat(sbpEl.value), dbp = parseFloat(dbpEl.value);
    if (isNaN(sbp) || isNaN(dbp) || sbp <= 0 || dbp <= 0 || sbp <= dbp) return;

    // Pulse pressure PP = SBP - DBP
    const PP = sbp - dbp;

    // MAP = DBP + (1/3) * PP
    const MAP = dbp + (PP / 3.0);

    let status = '', color = '#22543d';
    if (MAP >= 70 && MAP <= 105) {
      status = 'OPTIMAL ORGAN PERFUSION (MAP 70 - 105 mmHg: Brain & renal autoregulation intact)';
      color = '#22543d';
    } else if (MAP >= 65) {
      status = 'ADEQUATE ICU THRESHOLD (MAP 65 - 69 mmHg: Surviving Sepsis Campaign target)';
      color = '#22543d';
    } else {
      status = 'HYPOPERFUSION RISK (MAP < 65 mmHg: Ischemia / acute tubular necrosis danger!)';
      color = '#c53030';
    }

    mapResEl.textContent = 'MAP = ' + MAP.toFixed(1) + ' mmHg';
    mapResEl.style.color = color;
    ppResEl.textContent = 'Pulse Pressure PP = ' + Math.round(PP) + ' mmHg | ' + status;
    ppResEl.style.color = color;
  }

  sbpEl.addEventListener('input', update);
  dbpEl.addEventListener('input', update);
  update();
})();