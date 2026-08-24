(() => {
  'use strict';
  const capEl = document.getElementById('ex-cap'), tEl = document.getElementById('ex-time');
  const fEl = document.getElementById('ex-fill'), effEl = document.getElementById('ex-eff'), swEl = document.getElementById('ex-swell');
  const bcmResEl = document.getElementById('ex-res-bcm'), lcyResEl = document.getElementById('ex-res-lcy');

  function update() {
    const capM3 = parseFloat(capEl.value), tcSec = parseFloat(tEl.value);
    const fillPct = parseFloat(fEl.value), effPct = parseFloat(effEl.value), swPct = parseFloat(swEl.value);

    if (isNaN(capM3) || isNaN(tcSec) || isNaN(fillPct) || isNaN(effPct) || isNaN(swPct) || capM3 <= 0 || tcSec <= 0) return;

    // Cycles per hour = 3600 / tcSec
    const cyclesHour = 3600 / tcSec;
    // Loose volume per cycle = capM3 * (fillPct / 100)
    const loosePerCycle = capM3 * (fillPct / 100);
    // Loose production per hour = loosePerCycle * cyclesHour * (effPct / 100) (LCM/hr)
    const lcmHr = loosePerCycle * cyclesHour * (effPct / 100);
    // Bank Cubic Meters (BCM) = LCM / (1 + swPct/100)
    const bcmHr = lcmHr / (1 + (swPct / 100));
    // Loose Cubic Yards (LCY) = LCM * 1.30795
    const lcyHr = lcmHr * 1.30795;

    bcmResEl.textContent = bcmHr.toFixed(1) + ' BCM / hr (In-Situ)';
    lcyResEl.textContent = lcyHr.toFixed(1) + ' LCY / hr (' + lcmHr.toFixed(1) + ' Loose m³/hr)';
  }

  [capEl, tEl, fEl, effEl, swEl].forEach(el => el.addEventListener('input', update));
  update();
})();