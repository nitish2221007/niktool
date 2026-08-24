(() => {
  'use strict';
  const kwhEl = document.getElementById('bat-kwh'), chEl = document.getElementById('bat-chem'), ldEl = document.getElementById('bat-load');
  const uResEl = document.getElementById('bat-res-use'), tResEl = document.getElementById('bat-res-time');

  const CHEMS = {
    'lifepo4': { dod: 0.90, eff: 0.95, name: 'LiFePO4' },
    'nmc':     { dod: 0.90, eff: 0.92, name: 'Lithium NMC' },
    'lead':    { dod: 0.50, eff: 0.80, name: 'Lead-Acid AGM' }
  };

  function update() {
    const kwh = parseFloat(kwhEl.value), chem = CHEMS[chEl.value], loadKw = parseFloat(ldEl.value);
    if (isNaN(kwh) || isNaN(loadKw) || kwh <= 0 || loadKw <= 0) return;

    const usableKwh = kwh * chem.dod * chem.eff;
    const runtimeHrs = usableKwh / loadKw;
    const runtimeDays = runtimeHrs / 24;

    uResEl.textContent = usableKwh.toFixed(2) + ' kWh Usable (' + ((usableKwh / kwh) * 100).toFixed(1) + '% Net Delivery)';

    let timeStr = '';
    if (runtimeDays >= 1.0) timeStr = runtimeDays.toFixed(1) + ' Days (' + runtimeHrs.toFixed(1) + ' Hours)';
    else timeStr = runtimeHrs.toFixed(1) + ' Hours';

    tResEl.textContent = timeStr + ' Backup @ ' + loadKw.toFixed(2) + ' kW Continuous Load (DoD: ' + (chem.dod*100) + '%)';
  }

  [kwhEl, ldEl].forEach(el => el.addEventListener('input', update));
  chEl.addEventListener('change', update);
  update();
})();