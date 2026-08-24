(() => {
  'use strict';
  const mEl = document.getElementById('lh-m'), tEl = document.getElementById('lh-type');
  const qResEl = document.getElementById('lh-res-q'), infResEl = document.getElementById('lh-res-info');

  function update() {
    const mass = parseFloat(mEl.value), L = parseFloat(tEl.value);
    if (isNaN(mass) || isNaN(L) || mass <= 0 || L <= 0) return;

    // Q = m * L  [Joules]
    const Q_joules = mass * L;
    const Q_kJ = Q_joules / 1000.0;
    const Q_MJ = Q_joules / 1e6;

    qResEl.textContent = 'Q = ' + Q_MJ.toFixed(2) + ' MJ (' + Math.round(Q_kJ).toLocaleString() + ' kJ)';
    infResEl.textContent = 'Constant Temperature Transition: Complete phase change requires ' + Q_MJ.toFixed(2) + ' MJ with zero temperature rise (L = ' + (L/1000) + ' kJ/kg @ ' + mass + ' kg)';
  }

  mEl.addEventListener('input', update);
  tEl.addEventListener('change', update);
  update();
})();