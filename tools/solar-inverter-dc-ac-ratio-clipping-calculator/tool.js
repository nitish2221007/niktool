(() => {
  'use strict';
  const dcEl = document.getElementById('ilr-dc'), acEl = document.getElementById('ilr-ac');
  const rResEl = document.getElementById('ilr-res-ratio'), clResEl = document.getElementById('ilr-res-clip');

  function update() {
    const dcKw = parseFloat(dcEl.value), acKw = parseFloat(acEl.value);
    if (isNaN(dcKw) || isNaN(acKw) || dcKw <= 0 || acKw <= 0) return;

    const ilr = dcKw / acKw;
    const ilrPct = ilr * 100;

    rResEl.textContent = 'ILR = ' + ilr.toFixed(2) + ' (' + ilrPct.toFixed(1) + '% DC/AC Ratio)';

    if (ilr < 1.10) {
      clResEl.textContent = 'Under-Loaded Inverter (ILR < 1.10: Inverter capacity underutilized in morning/evening)';
      clResEl.style.color = '#2563eb';
    } else if (ilr <= 1.35) {
      clResEl.textContent = 'Optimal Economic Sizing (ILR 1.15 - 1.35: Max energy harvest, Clipping < 1.5%)';
      clResEl.style.color = '#22543d';
    } else if (ilr <= 1.50) {
      clResEl.textContent = 'High DC Overbuild (ILR 1.35 - 1.50: Clipping ~2-5%, Good for winter/cloudy regions)';
      clResEl.style.color = '#d97706';
    } else {
      clResEl.textContent = 'Heavy Clipping Loss (ILR > 1.50: Severe midday thermal clipping > 8%)';
      clResEl.style.color = '#c53030';
    }
  }

  dcEl.addEventListener('input', update);
  acEl.addEventListener('input', update);
  update();
})();