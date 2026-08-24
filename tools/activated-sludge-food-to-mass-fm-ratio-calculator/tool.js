(() => {
  'use strict';
  const qEl = document.getElementById('fm-q'), bEl = document.getElementById('fm-bod');
  const vEl = document.getElementById('fm-v'), mEl = document.getElementById('fm-mlvss');
  const rResEl = document.getElementById('fm-res-ratio'), rgResEl = document.getElementById('fm-res-regime');

  function update() {
    const Q = parseFloat(qEl.value), bodMgL = parseFloat(bEl.value);
    const V = parseFloat(vEl.value), mlvssMgL = parseFloat(mEl.value);

    if (isNaN(Q) || isNaN(bodMgL) || isNaN(V) || isNaN(mlvssMgL) || Q <= 0 || bodMgL <= 0 || V <= 0 || mlvssMgL <= 0) return;

    // F (lbs BOD / day) = Q * BOD * 8.34
    // M (lbs MLVSS) = V * MLVSS * 8.34
    // F/M = (Q * BOD) / (V * MLVSS)
    const fm = (Q * bodMgL) / (V * mlvssMgL);
    const foodLbsDay = Q * bodMgL * 8.34;
    const massLbs = V * mlvssMgL * 8.34;

    rResEl.textContent = 'F/M = ' + fm.toFixed(3) + ' lb BOD / (lb MLVSS·d)';

    if (fm < 0.05) {
      rgResEl.textContent = 'Extended Aeration / Total Oxidation (F/M < 0.10)';
      rgResEl.style.color = '#2563eb';
    } else if (fm >= 0.05 && fm <= 0.15) {
      rgResEl.textContent = 'Extended Aeration / Oxidation Ditch (F/M 0.05 - 0.15)';
      rgResEl.style.color = '#22543d';
    } else if (fm > 0.15 && fm <= 0.40) {
      rgResEl.textContent = 'Conventional Complete-Mix / Plug-Flow (F/M 0.2 - 0.4: Optimal)';
      rgResEl.style.color = '#22543d';
    } else if (fm > 0.40 && fm <= 1.0) {
      rgResEl.textContent = 'High-Rate Activated Sludge (F/M 0.4 - 1.0)';
      rgResEl.style.color = '#d97706';
    } else {
      rgResEl.textContent = 'Severe Organic Overload! (F/M > 1.0: Sludge Bulking Risk)';
      rgResEl.style.color = '#c53030';
    }
  }

  [qEl, bEl, vEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();