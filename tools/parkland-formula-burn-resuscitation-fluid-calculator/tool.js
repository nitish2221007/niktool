(() => {
  'use strict';
  const wEl = document.getElementById('pk-w'), tbEl = document.getElementById('pk-tbsa');
  const totResEl = document.getElementById('pk-res-tot'), rtResEl = document.getElementById('pk-res-rates');

  function update() {
    const W = parseFloat(wEl.value), TBSA = parseFloat(tbEl.value);
    if (isNaN(W) || isNaN(TBSA) || W <= 0 || TBSA <= 0 || TBSA > 100) return;

    const total_vol_mL = 4.0 * W * TBSA;
    const vol_8h = total_vol_mL * 0.50;
    const rate_8h = vol_8h / 8.0;
    const vol_16h = total_vol_mL * 0.50;
    const rate_16h = vol_16h / 16.0;

    totResEl.textContent = '24-Hour Total = ' + Math.round(total_vol_mL).toLocaleString() + ' mL Lactated Ringer's';
    rtResEl.textContent = 'First 8 Hours: ' + Math.round(rate_8h) + ' mL/hr (' + Math.round(vol_8h).toLocaleString() + ' mL) | Next 16 Hours: ' + Math.round(rate_16h) + ' mL/hr';
  }

  wEl.addEventListener('input', update);
  tbEl.addEventListener('input', update);
  update();
})();