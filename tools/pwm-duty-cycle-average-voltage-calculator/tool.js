(() => {
  'use strict';
  const vEl = document.getElementById('pwm-vpeak'), dEl = document.getElementById('pwm-duty'), fEl = document.getElementById('pwm-freq');
  const vAvgEl = document.getElementById('pwm-res-vavg'), tonEl = document.getElementById('pwm-res-ton'), toffEl = document.getElementById('pwm-res-toff');

  function update() {
    const vPeak = parseFloat(vEl.value), dutyPct = parseFloat(dEl.value), freqHz = parseFloat(fEl.value);
    if (isNaN(vPeak) || isNaN(dutyPct) || isNaN(freqHz) || vPeak < 0 || dutyPct < 0 || dutyPct > 100 || freqHz <= 0) return;

    // V_avg = V_peak * (Duty / 100)
    const vAvg = vPeak * (dutyPct / 100);
    // Period T = 1 / f
    const periodSec = 1 / freqHz;
    const tOnSec = periodSec * (dutyPct / 100);
    const tOffSec = periodSec - tOnSec;

    const tOnUs = tOnSec * 1e6;
    const tOffUs = tOffSec * 1e6;

    vAvgEl.textContent = vAvg.toFixed(2) + ' Volts DC';
    tonEl.textContent = tOnUs >= 1000 ? (tOnUs / 1000).toFixed(2) + ' ms' : tOnUs.toFixed(1) + ' μs';
    toffEl.textContent = tOffUs >= 1000 ? (tOffUs / 1000).toFixed(2) + ' ms' : tOffUs.toFixed(1) + ' μs';
  }

  [vEl, dEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();