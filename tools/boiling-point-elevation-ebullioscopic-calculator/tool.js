(() => {
  'use strict';
  const sEl = document.getElementById('bp-solv'), mEl = document.getElementById('bp-m'), iEl = document.getElementById('bp-i');
  const totResEl = document.getElementById('bp-res-tot'), dtResEl = document.getElementById('bp-res-dt');

  function update() {
    const [tbStr, kbStr] = sEl.value.split(',');
    const Tb0 = parseFloat(tbStr), Kb = parseFloat(kbStr);
    const m = parseFloat(mEl.value), iFactor = parseFloat(iEl.value);

    if (isNaN(m) || isNaN(iFactor) || m <= 0 || iFactor < 1) return;

    // Delta_Tb = i * Kb * m
    const dTb = iFactor * Kb * m;
    const elevatedTb = Tb0 + dTb;

    totResEl.textContent = elevatedTb.toFixed(2) + ' °C';
    dtResEl.textContent = '+' + dTb.toFixed(3) + ' °C Elevation';
  }

  sEl.addEventListener('change', update);
  mEl.addEventListener('input', update);
  iEl.addEventListener('input', update);
  update();
})();