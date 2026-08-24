(() => {
  'use strict';
  const qEl = document.getElementById('fm-q'), bodEl = document.getElementById('fm-bod');
  const vEl = document.getElementById('fm-v'), mlvssEl = document.getElementById('fm-mlvss');
  const fmResEl = document.getElementById('fm-res-val'), rgResEl = document.getElementById('fm-res-reg');

  function update() {
    const Q = parseFloat(qEl.value), BOD = parseFloat(bodEl.value);
    const V = parseFloat(vEl.value), MLVSS = parseFloat(mlvssEl.value);

    if (isNaN(Q) || isNaN(BOD) || isNaN(V) || isNaN(MLVSS) || Q <= 0 || BOD <= 0 || V <= 0 || MLVSS <= 0) return;

    // Daily food mass = Q * BOD / 1000  [kg BOD5 / day]
    const foodKgDay = (Q * BOD) / 1000;

    // Total microorganism biomass = V * MLVSS / 1000  [kg MLVSS]
    const microKg = (V * MLVSS) / 1000;

    // F/M ratio = foodKgDay / microKg  [kg BOD / kg MLVSS * day = day^-1]
    const FM = foodKgDay / microKg;

    // Hydraulic Retention Time HRT = V / Q * 24  [hours]
    const HRT_hours = (V / Q) * 24;

    let regime = '';
    let color = '#22543d';

    if (FM < 0.05) {
      regime = 'UNDERLOADED: Endogenous Respiration / Pin-Point Floc Ashing (F/M < 0.05)';
      color = '#d97706';
    } else if (FM <= 0.15) {
      regime = 'EXTENDED AERATION (0.05 - 0.15: High Stabilization, Low Sludge Yield)';
      color = '#2563eb';
    } else if (FM <= 0.45) {
      regime = 'CONVENTIONAL ACTIVATED SLUDGE (0.2 - 0.45: Optimal Good Settling Floc)';
      color = '#22543d';
    } else {
      regime = 'OVERLOADED: High-Rate Dispersed Growth / Incomplete Treatment (F/M > 0.45)';
      color = '#c53030';
    }

    fmResEl.textContent = 'F/M = ' + FM.toFixed(3) + ' kg BOD / (kg MLVSS · day)';
    rgResEl.textContent = regime + ' | Food: ' + Math.round(foodKgDay).toLocaleString() + ' kg/d, Microbes: ' + Math.round(microKg).toLocaleString() + ' kg (HRT = ' + HRT_hours.toFixed(1) + ' h)';
    rgResEl.style.color = color;
  }

  [qEl, bodEl, vEl, mlvssEl].forEach(el => el.addEventListener('input', update));
  update();
})();