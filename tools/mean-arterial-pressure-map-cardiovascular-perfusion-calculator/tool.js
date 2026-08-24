(() => {
  'use strict';
  const sbpEl = document.getElementById('map-sbp'), dbpEl = document.getElementById('map-dbp');
  const mapResEl = document.getElementById('map-res-val'), pfResEl = document.getElementById('map-res-perf');

  function update() {
    const SBP = parseFloat(sbpEl.value), DBP = parseFloat(dbpEl.value);
    if (isNaN(SBP) || isNaN(DBP) || SBP <= DBP || DBP <= 0) return;

    // Pulse Pressure PP = SBP - DBP
    const PP = SBP - DBP;

    // Mean Arterial Pressure MAP = DBP + (1/3) * PP  [mmHg]
    const MAP = DBP + (PP / 3.0);

    let status = '';
    let color = '#22543d';

    if (MAP < 60.0) {
      status = 'HYPOPERFUSION / SHOCK RISK (MAP < 60 mmHg: Ischemic risk to kidneys and brain! Vasopressors/fluids indicated)';
      color = '#c53030';
    } else if (MAP < 65.0) {
      status = 'BORDERLINE LOW (MAP 60 - 64 mmHg: Close monitoring required)';
      color = '#d97706';
    } else if (MAP <= 100.0) {
      status = 'ADEQUATE CLINICAL PERFUSION (MAP 65 - 100 mmHg: Optimal hemodynamic target in ICU/Surviving Sepsis guidelines)';
      color = '#22543d';
    } else {
      status = 'ELEVATED / HYPERTENSION (MAP > 100 mmHg: Increased myocardial workload)';
      color = '#d97706';
    }

    mapResEl.textContent = 'MAP = ' + MAP.toFixed(1) + ' mmHg';
    mapResEl.style.color = color;
    pfResEl.textContent = status + ' | Pulse Pressure = ' + PP + ' mmHg (SBP ' + SBP + ' / DBP ' + DBP + ')';
    pfResEl.style.color = color;
  }

  sbpEl.addEventListener('input', update);
  dbpEl.addEventListener('input', update);
  update();
})();