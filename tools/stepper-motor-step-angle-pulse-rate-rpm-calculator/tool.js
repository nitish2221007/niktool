(() => {
  'use strict';
  const stEl = document.getElementById('sm-step'), mcEl = document.getElementById('sm-micro'), ppEl = document.getElementById('sm-pps');
  const rpResEl = document.getElementById('sm-res-rpm'), rsResEl = document.getElementById('sm-res-res');

  function update() {
    const step_angle = parseFloat(stEl.value), micro = parseFloat(mcEl.value), pps = parseFloat(ppEl.value);
    if (isNaN(step_angle) || isNaN(micro) || isNaN(pps) || step_angle <= 0 || micro <= 0 || pps <= 0) return;

    // Full steps per revolution:
    const full_steps = 360.0 / step_angle;

    // Total microstep pulses per full revolution:
    const pulses_per_rev = full_steps * micro;

    // Rotational speed in RPM: RPM = (PPS * 60) / pulses_per_rev
    const rps = pps / pulses_per_rev;
    const rpm = rps * 60.0;

    // Angular resolution per microstep pulse in degrees:
    const deg_per_pulse = step_angle / micro;

    // Assuming standard 8mm lead screw (T8x8):
    const linear_feed_mm_s = rps * 8.0;

    rpResEl.textContent = 'Rotational Speed = ' + rpm.toFixed(1) + ' RPM (' + rps.toFixed(2) + ' Rev/s)';
    rsResEl.textContent = 'Resolution: ' + pulses_per_rev.toLocaleString() + ' Pulses/Rev (' + deg_per_pulse.toFixed(4) + '°/pulse) | T8 Lead Screw: ' + linear_feed_mm_s.toFixed(1) + ' mm/s';
  }

  [stEl, mcEl, ppEl].forEach(el => el.addEventListener('change', update));
  ppEl.addEventListener('input', update);
  update();
})();