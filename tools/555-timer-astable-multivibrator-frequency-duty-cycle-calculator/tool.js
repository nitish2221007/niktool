(() => {
  'use strict';
  const r1El = document.getElementById('t5-r1'), r2El = document.getElementById('t5-r2'), cEl = document.getElementById('t5-c');
  const fResEl = document.getElementById('t5-res-f'), dcResEl = document.getElementById('t5-res-dc');

  function update() {
    const R1_k = parseFloat(r1El.value), R2_k = parseFloat(r2El.value), C_uF = parseFloat(cEl.value);
    if (isNaN(R1_k) || isNaN(R2_k) || isNaN(C_uF) || R1_k <= 0 || R2_k <= 0 || C_uF <= 0) return;

    const R1 = R1_k * 1000.0;
    const R2 = R2_k * 1000.0;
    const C = C_uF * 1e-6;

    // t_high = ln(2) * (R1 + R2) * C = 0.693147 * (R1 + R2) * C
    const t_high = Math.LN2 * (R1 + R2) * C;
    // t_low = ln(2) * R2 * C = 0.693147 * R2 * C
    const t_low = Math.LN2 * R2 * C;

    const Period = t_high + t_low;
    const freq = 1.0 / Period;
    const dutyCycle_pct = (t_high / Period) * 100.0;

    fResEl.textContent = 'f = ' + (freq >= 1000 ? (freq/1000).toFixed(2) + ' kHz' : freq.toFixed(2) + ' Hz');
    dcResEl.textContent = 'Duty Cycle = ' + dutyCycle_pct.toFixed(1) + '% (T_high: ' + (t_high*1000).toFixed(2) + ' ms, T_low: ' + (t_low*1000).toFixed(2) + ' ms | Period: ' + (Period*1000).toFixed(2) + ' ms)';
  }

  [r1El, r2El, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();