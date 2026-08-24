(() => {
  'use strict';
  const pEl = document.getElementById('sc-p'), cnEl = document.getElementById('sc-cn');
  const qResEl = document.getElementById('sc-res-q'), sResEl = document.getElementById('sc-res-s');

  function update() {
    const P_mm = parseFloat(pEl.value), CN = parseFloat(cnEl.value);
    if (isNaN(P_mm) || isNaN(CN) || P_mm <= 0 || CN <= 30 || CN >= 100) return;

    // Maximum potential retention: S = (25400 / CN) - 254  [mm]
    const S_mm = (25400.0 / CN) - 254.0;

    // Initial abstraction: Ia = 0.2 * S  [mm]
    const Ia_mm = 0.20 * S_mm;

    if (P_mm <= Ia_mm) {
      qResEl.textContent = 'Direct Runoff Q = 0.0 mm (0%)';
      qResEl.style.color = '#22543d';
      sResEl.textContent = 'All rainfall absorbed by soil/canopy (P = ' + P_mm + ' mm ≤ Initial Abstraction I_a = ' + Ia_mm.toFixed(1) + ' mm)';
      return;
    }

    // Direct runoff depth: Q = (P - 0.2*S)^2 / (P + 0.8*S)  [mm]
    const Q_mm = Math.pow(P_mm - Ia_mm, 2) / (P_mm + (0.80 * S_mm));
    const runoff_pct = (Q_mm / P_mm) * 100.0;

    qResEl.textContent = 'Direct Runoff Q = ' + Q_mm.toFixed(1) + ' mm (' + runoff_pct.toFixed(1) + '% of storm)';
    qResEl.style.color = '#22543d';
    sResEl.textContent = 'Soil Retention S = ' + S_mm.toFixed(1) + ' mm | Initial Abstraction I_a = ' + Ia_mm.toFixed(1) + ' mm (CN = ' + CN + ')';
  }

  pEl.addEventListener('input', update);
  cnEl.addEventListener('input', update);
  update();
})();