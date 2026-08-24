(() => {
  'use strict';
  const cEl = document.getElementById('ct-c'), tEl = document.getElementById('ct-t'), tmpEl = document.getElementById('ct-temp');
  const ctResEl = document.getElementById('ct-res-val'), epaResEl = document.getElementById('ct-res-epa');

  function update() {
    const C = parseFloat(cEl.value), T = parseFloat(tEl.value), temp = parseFloat(tmpEl.value);
    if (isNaN(C) || isNaN(T) || isNaN(temp) || C <= 0 || T <= 0) return;

    // CT = C * T  [mg * min / L]
    const CT_achieved = C * T;

    let reqCT = 59.0;
    if (temp <= 5.0) reqCT = 122.0;
    else if (temp <= 10.0) reqCT = 59.0;
    else if (temp <= 15.0) reqCT = 40.0;
    else reqCT = 25.0;

    let status = '';
    let color = '#22543d';

    if (CT_achieved >= reqCT) {
      status = 'EPA 3-LOG COMPLIANT (Achieved ' + CT_achieved.toFixed(1) + ' ≥ Required ' + reqCT + ' mg·min/L): Complete 99.9% pathogen disinfection';
      color = '#22543d';
    } else {
      status = 'NON-COMPLIANT (Achieved ' + CT_achieved.toFixed(1) + ' < Required ' + reqCT + ' mg·min/L): Increase chlorine dose or baffle tank retention time!';
      color = '#c53030';
    }

    ctResEl.textContent = 'Achieved CT = ' + CT_achieved.toFixed(1) + ' mg·min/L';
    ctResEl.style.color = color;
    epaResEl.textContent = status + ' @ ' + temp + '°C water temperature';
    epaResEl.style.color = color;
  }

  [cEl, tEl, tmpEl].forEach(el => el.addEventListener('input', update));
  update();
})();