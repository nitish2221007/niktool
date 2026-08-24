(() => {
  'use strict';
  const r1El = document.getElementById('t5-r1'), r2El = document.getElementById('t5-r2'), cEl = document.getElementById('t5-c');
  const fResEl = document.getElementById('t5-res-freq'), dResEl = document.getElementById('t5-res-duty'), tmResEl = document.getElementById('t5-res-times');

  function update() {
    const r1K = parseFloat(r1El.value), r2K = parseFloat(r2El.value), cUf = parseFloat(cEl.value);
    if (isNaN(r1K) || isNaN(r2K) || isNaN(cUf) || r1K <= 0 || r2K <= 0 || cUf <= 0) return;

    const r1 = r1K * 1000;
    const r2 = r2K * 1000;
    const C = cUf * 1e-6;

    // t_high = 0.693 * (R1 + R2) * C
    const tHigh = 0.693 * (r1 + r2) * C;
    // t_low = 0.693 * R2 * C
    const tLow = 0.693 * r2 * C;
    const period = tHigh + tLow;

    // Frequency = 1.44 / ((R1 + 2*R2) * C)
    const freqHz = 1 / period;
    const dutyPct = (tHigh / period) * 100;

    const thMs = tHigh * 1000;
    const tlMs = tLow * 1000;

    fResEl.textContent = freqHz >= 1000 ? (freqHz / 1000).toFixed(2) + ' kHz' : freqHz.toFixed(1) + ' Hz';
    dResEl.textContent = dutyPct.toFixed(1) + '% High';
    tmResEl.textContent = 't_high = ' + thMs.toFixed(2) + ' ms, t_low = ' + tlMs.toFixed(2) + ' ms';
  }

  [r1El, r2El, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();