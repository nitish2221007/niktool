(() => {
  'use strict';
  const phEl = document.getElementById('bd-phase'), mgEl = document.getElementById('bd-mag');
  const pmResEl = document.getElementById('bd-res-pm'), stResEl = document.getElementById('bd-res-stab');

  function update() {
    const phase_at_0dB = parseFloat(phEl.value), mag_at_180 = parseFloat(mgEl.value);
    if (isNaN(phase_at_0dB) || isNaN(mag_at_180)) return;

    // Phase Margin PM = 180 + Phase(omega_gc)
    const PM = 180.0 + phase_at_0dB;

    // Gain Margin GM = - Mag_dB(omega_pc)
    const GM = -mag_at_180;

    let status = '';
    let color = '#22543d';

    if (PM > 0 && GM > 0) {
      if (PM >= 45.0 && GM >= 6.0) {
        status = 'ROBUSTLY STABLE (PM ≥ 45°, GM ≥ 6 dB: Excellent damping and high disturbance tolerance)';
        color = '#22543d';
      } else {
        status = 'CONDITIONALLY STABLE (Low margin: PM < 45° or GM < 6 dB causes ringing / oscillation)';
        color = '#d97706';
      }
    } else {
      status = 'CLOSED-LOOP UNSTABLE (PM < 0° or GM < 0 dB: Loop gain creates destructive positive feedback)';
      color = '#c53030';
    }

    pmResEl.textContent = 'PM = ' + (PM >= 0 ? '+' : '') + PM.toFixed(1) + '° | GM = ' + (GM >= 0 ? '+' : '') + GM.toFixed(1) + ' dB';
    pmResEl.style.color = color;
    stResEl.textContent = status;
    stResEl.style.color = color;
  }

  phEl.addEventListener('input', update);
  mgEl.addEventListener('input', update);
  update();
})();