(() => {
  'use strict';
  const anEl = document.getElementById('sv-angle'), fqEl = document.getElementById('sv-freq');
  const plResEl = document.getElementById('sv-res-pulse'), dtResEl = document.getElementById('sv-res-duty');

  function update() {
    const angle_deg = parseFloat(anEl.value), freq_hz = parseFloat(fqEl.value);
    if (isNaN(angle_deg) || isNaN(freq_hz) || angle_deg < 0 || angle_deg > 180 || freq_hz <= 0) return;

    // Standard 1.0 ms (0 deg) to 2.0 ms (180 deg) pulse mapping:
    const pulse_width_ms = 1.0 + (angle_deg / 180.0) * 1.0;
    const pulse_width_us = pulse_width_ms * 1000.0;

    // Period T = 1 / freq_hz  [ms]
    const period_ms = (1.0 / freq_hz) * 1000.0;

    // Duty cycle percentage:
    const duty_cycle_pct = (pulse_width_ms / period_ms) * 100.0;

    plResEl.textContent = 'High Pulse = ' + Math.round(pulse_width_us).toLocaleString() + ' μs (' + pulse_width_ms.toFixed(3) + ' ms)';
    dtResEl.textContent = 'Duty Cycle = ' + duty_cycle_pct.toFixed(2) + '% (Period = ' + period_ms.toFixed(1) + ' ms @ ' + freq_hz + ' Hz | Angle = ' + angle_deg + '°)';
  }

  anEl.addEventListener('input', update);
  fqEl.addEventListener('input', update);
  update();
})();