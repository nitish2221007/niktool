(() => {
  'use strict';
  const hbEl = document.getElementById('do-hb'), saEl = document.getElementById('do-sao2');
  const paEl = document.getElementById('do-pao2'), coEl = document.getElementById('do-co');
  const doResEl = document.getElementById('do-res-do2'), caResEl = document.getElementById('do-res-cao2');

  function update() {
    const Hb = parseFloat(hbEl.value), SaO2 = parseFloat(saEl.value);
    const PaO2 = parseFloat(paEl.value), CO = parseFloat(coEl.value);

    if (isNaN(Hb) || isNaN(SaO2) || isNaN(PaO2) || isNaN(CO) || Hb <= 0 || SaO2 <= 0 || PaO2 <= 0 || CO <= 0) return;

    // Bound O2 = 1.34 * Hb * (SaO2 / 100)  [mL / dL]
    const bound_O2 = 1.34 * Hb * (SaO2 / 100.0);
    // Dissolved O2 = 0.0031 * PaO2  [mL / dL]
    const dissolved_O2 = 0.0031 * PaO2;

    // Total Arterial O2 Content: CaO2 = Bound + Dissolved  [mL / dL]
    const CaO2 = bound_O2 + dissolved_O2;

    // Oxygen delivery: DO2 = CO * CaO2 * 10  [mL / min]
    const DO2 = CO * CaO2 * 10.0;

    let status = '', color = '#22543d';
    if (DO2 >= 900) { status = 'OPTIMAL OXYGEN DELIVERY (900 - 1,100 mL/min: Normal aerobic tissue support)'; color = '#22543d'; }
    else if (DO2 >= 600) { status = 'COMPENSATED (600 - 900 mL/min: Tissue extraction ratio rises)'; color = '#ea580c'; }
    else { status = 'CRITICAL DYSOXIA / SHOCK (DO₂ < 600 mL/min: Anaerobic metabolism & lactic acidosis)'; color = '#c53030'; }

    doResEl.textContent = 'DO₂ = ' + Math.round(DO2) + ' mL O₂ / min (' + status.split(' (')[0] + ')';
    doResEl.style.color = color;
    caResEl.textContent = 'CaO₂ = ' + CaO2.toFixed(2) + ' mL/dL (Hb Bound: ' + bound_O2.toFixed(2) + ' + Dissolved: ' + dissolved_O2.toFixed(2) + ' mL/dL)';
    caResEl.style.color = color;
  }

  [hbEl, saEl, paEl, coEl].forEach(el => el.addEventListener('input', update));
  update();
})();