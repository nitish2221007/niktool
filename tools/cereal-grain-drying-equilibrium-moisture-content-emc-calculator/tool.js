(() => {
  'use strict';
  const cEl = document.getElementById('em-crop'), tEl = document.getElementById('em-temp'), rhEl = document.getElementById('em-rh');
  const emcResEl = document.getElementById('em-res-emc'), sfResEl = document.getElementById('em-res-safe');

  function update() {
    const parts = cEl.value.split('_');
    const A = parseFloat(parts[0]);
    const B = parseFloat(parts[1]);
    const C = parseFloat(parts[2]);
    const safeMax = parseFloat(parts[3]);

    const temp_C = parseFloat(tEl.value), RH_pct = parseFloat(rhEl.value);
    if (isNaN(temp_C) || isNaN(RH_pct) || RH_pct <= 0 || RH_pct >= 100) return;

    const rh_dec = RH_pct / 100.0;

    // ASABE standard Chung-Pfost EMC equation (Dry Basis):
    // EMC_db = ( -1 / B ) * ln( -(temp_C + C) * ln(rh_dec) / A )
    // Ensure valid logarithm argument:
    const inner = -((temp_C + C) * Math.log(rh_dec)) / A;
    if (inner <= 0) return;

    const EMC_db_dec = (-1.0 / B) * Math.log(inner);
    const EMC_db = EMC_db_dec * 100.0;

    // Convert Dry Basis to Wet Basis: EMC_wb = ( EMC_db / (100 + EMC_db) ) * 100
    const EMC_wb = (EMC_db / (100.0 + EMC_db)) * 100.0;

    let status = '', color = '#22543d';

    if (EMC_wb <= safeMax) {
      status = 'SAFE LONG-TERM STORAGE (EMC ' + EMC_wb.toFixed(1) + '% ≤ Safe Limit ' + safeMax + '%: No mold risk)';
      color = '#22543d';
    } else {
      status = 'SPOILAGE RISK DANGER (EMC ' + EMC_wb.toFixed(1) + '% > Safe Limit ' + safeMax + '%: Active aeration / heated drying required!)';
      color = '#c53030';
    }

    emcResEl.textContent = 'EMC = ' + EMC_wb.toFixed(2) + '% Wet Basis (' + EMC_db.toFixed(2) + '% Dry Basis)';
    emcResEl.style.color = color;
    sfResEl.textContent = status + ' @ ' + temp_C + '°C, ' + RH_pct + '% RH';
    sfResEl.style.color = color;
  }

  cEl.addEventListener('change', update);
  tEl.addEventListener('input', update);
  rhEl.addEventListener('input', update);
  update();
})();