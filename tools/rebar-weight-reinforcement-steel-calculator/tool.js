(() => {
  'use strict';
  const szEl = document.getElementById('reb-size'), lEl = document.getElementById('reb-len');
  const lbsResEl = document.getElementById('reb-res-lbs'), kgResEl = document.getElementById('reb-res-kg');

  function update() {
    const [lbPerFt, kgPerM] = szEl.value.split(',').map(Number);
    const lenFt = parseFloat(lEl.value);
    if (isNaN(lenFt) || lenFt <= 0 || !lbPerFt) return;

    const totalLbs = lenFt * lbPerFt;
    const totalKg = totalLbs * 0.453592;
    const totalTons = totalKg / 1000;

    lbsResEl.textContent = totalLbs.toFixed(1) + ' lbs';
    kgResEl.textContent = totalKg.toFixed(1) + ' kg (' + totalTons.toFixed(3) + ' metric tons)';
  }

  szEl.addEventListener('change', update);
  lEl.addEventListener('input', update);
  update();
})();