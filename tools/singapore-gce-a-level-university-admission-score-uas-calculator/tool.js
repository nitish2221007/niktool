(() => {
  'use strict';
  const h2aEl = document.getElementById('sg-h2a'), h2bEl = document.getElementById('sg-h2b');
  const h2cEl = document.getElementById('sg-h2c'), gpEl = document.getElementById('sg-gp');
  const uasResEl = document.getElementById('sg-res-uas'), admResEl = document.getElementById('sg-res-adm');

  function update() {
    const h2a = parseFloat(h2aEl.value), h2b = parseFloat(h2bEl.value);
    const h2c = parseFloat(h2cEl.value), gp = parseFloat(gpEl.value);

    // New 70-Point UAS System (from 2026 admissions): 3 H2 (max 60) + H1 GP (max 10) = 70 RP
    const UAS_70 = h2a + h2b + h2c + gp;
    const UAS_90_equiv = (UAS_70 / 70.0) * 90.0;

    let rating = '';
    let color = '#22543d';

    if (UAS_70 >= 67.5) {
      rating = 'TOP TIER (67.5 - 70 RP / ~85-90 Legacy RP): Eligible for NUS/NTU Medicine, Law & Computer Science';
      color = '#22543d';
    } else if (UAS_70 >= 60.0) {
      rating = 'HIGHLY COMPETITIVE (60.0 - 67.0 RP): Eligible for NUS/NTU Business, Data Science & Engineering';
      color = '#22543d';
    } else if (UAS_70 >= 50.0) {
      rating = 'ELIGIBLE (50.0 - 59.5 RP): Meets Indicative Grade Profiles for Humanities, Sciences & SMU/SUTD';
      color = '#2563eb';
    } else {
      rating = 'BELOW DIRECT CUTOFF: Consider SIT, SUSS or appeal holistic aptitude pathways';
      color = '#d97706';
    }

    uasResEl.textContent = 'UAS = ' + UAS_70.toFixed(1) + ' / 70 RP (' + UAS_90_equiv.toFixed(1) + '/90 Equivalent)';
    uasResEl.style.color = color;
    admResEl.textContent = rating;
    admResEl.style.color = color;
  }

  [h2aEl, h2bEl, h2cEl, gpEl].forEach(el => el.addEventListener('change', update));
  update();
})();