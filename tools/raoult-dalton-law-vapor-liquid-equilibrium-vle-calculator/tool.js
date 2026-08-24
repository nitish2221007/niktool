(() => {
  'use strict';
  const xaEl = document.getElementById('vl-xa'), paEl = document.getElementById('vl-pa'), pbEl = document.getElementById('vl-pb');
  const pResEl = document.getElementById('vl-res-p'), yaResEl = document.getElementById('vl-res-ya');

  function update() {
    const xA = parseFloat(xaEl.value), PA_sat = parseFloat(paEl.value), PB_sat = parseFloat(pbEl.value);
    if (isNaN(xA) || isNaN(PA_sat) || isNaN(PB_sat) || xA < 0 || xA > 1 || PA_sat <= 0 || PB_sat <= 0) return;

    const xB = 1.0 - xA;

    // Partial pressures: p_A = xA * PA_sat, p_B = xB * PB_sat
    const p_A = xA * PA_sat;
    const p_B = xB * PB_sat;

    // Total bubble point pressure: P = p_A + p_B
    const P_total = p_A + p_B;

    // Vapor mole fraction: yA = p_A / P_total
    const yA = P_total > 0 ? p_A / P_total : 0;
    const yB = 1.0 - yA;

    // Relative volatility: alpha_AB = PA_sat / PB_sat
    const alpha_AB = PA_sat / PB_sat;

    pResEl.textContent = 'Bubble Pressure P = ' + P_total.toFixed(3) + ' bar';
    yaResEl.textContent = 'Vapor y_A = ' + (yA * 100).toFixed(1) + '% (Enriched: ' + (xA*100).toFixed(0) + '% → ' + (yA*100).toFixed(1) + '%) | Relative Volatility α_AB = ' + alpha_AB.toFixed(2);
  }

  [xaEl, paEl, pbEl].forEach(el => el.addEventListener('input', update));
  update();
})();