(() => {
  'use strict';
  const f0El = document.getElementById('dp-f0'), vsEl = document.getElementById('dp-vs');
  const motEl = document.getElementById('dp-motion'), vEl = document.getElementById('dp-vsound');
  const fpResEl = document.getElementById('dp-res-fprime'), rcResEl = document.getElementById('dp-res-recede');

  function update() {
    const f0 = parseFloat(f0El.value), vs = parseFloat(vsEl.value);
    const isApproach = motEl.value === 'approach', v = parseFloat(vEl.value);

    if (isNaN(f0) || isNaN(vs) || isNaN(v) || f0 <= 0 || vs < 0 || v <= vs) return;

    // Approaching source: f_app = f0 * ( v / (v - vs) )
    const f_app = f0 * (v / (v - vs));
    // Receding source: f_rec = f0 * ( v / (v + vs) )
    const f_rec = f0 * (v / (v + vs));

    const current_f = isApproach ? f_app : f_rec;
    const diff = current_f - f0;
    const drop = f_app - f_rec;

    fpResEl.textContent = 'f' = ' + current_f.toFixed(2) + ' Hz (' + (diff >= 0 ? '+' : '') + diff.toFixed(2) + ' Hz Shift)';
    rcResEl.textContent = (isApproach ? 'When Receding: f' = ' + f_rec.toFixed(2) + ' Hz' : 'When Approaching: f' = ' + f_app.toFixed(2) + ' Hz') + ' | Total Pass Drop = ' + drop.toFixed(2) + ' Hz (Mach ' + (vs/v).toFixed(2) + ')';
  }

  [f0El, vsEl, vEl].forEach(el => el.addEventListener('input', update));
  motEl.addEventListener('change', update);
  update();
})();