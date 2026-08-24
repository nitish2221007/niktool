(() => {
  'use strict';
  const dyEl = document.getElementById('yed-dy'), dqEl = document.getElementById('yed-dq');
  const yResEl = document.getElementById('yed-res-val'), tResEl = document.getElementById('yed-res-type');

  function update() {
    const dY = parseFloat(dyEl.value), dQ = parseFloat(dqEl.value);
    if (isNaN(dY) || isNaN(dQ) || dY === 0) return;

    // YED = %dQ / %dY
    const yed = dQ / dY;

    yResEl.textContent = 'YED = ' + (yed >= 0 ? '+' : '') + yed.toFixed(2);

    if (yed > 1.0) {
      tResEl.textContent = 'Luxury / Superior Good (YED > 1: Demand grows faster than income)';
      tResEl.style.color = '#22543d';
    } else if (yed > 0 && yed <= 1.0) {
      tResEl.textContent = 'Normal Necessity Good (0 < YED ≤ 1: Stable staples e.g. groceries)';
      tResEl.style.color = '#2563eb';
    } else if (yed < 0) {
      tResEl.textContent = 'Inferior Good (YED < 0: Demand drops as income rises e.g. instant noodles)';
      tResEl.style.color = '#d97706';
    } else {
      tResEl.textContent = 'Zero Income Elasticity (YED = 0)';
      tResEl.style.color = '#64748b';
    }
  }

  dyEl.addEventListener('input', update);
  dqEl.addEventListener('input', update);
  update();
})();