(() => {
  'use strict';
  const mgEl = document.getElementById('bd-mag'), phEl = document.getElementById('bd-phase');
  const gmResEl = document.getElementById('bd-res-gm'), pmResEl = document.getElementById('bd-res-pm');

  function update() {
    const mag_linear = parseFloat(mgEl.value), phase_deg = parseFloat(phEl.value);
    if (isNaN(mag_linear) || isNaN(phase_deg) || mag_linear <= 0) return;

    // Gain Margin: GM = - 20 * log10( |G(j*w_pi)| )  [dB]
    const GM_dB = -20.0 * Math.log10(mag_linear);
    const GM_linear = 1.0 / mag_linear;

    // Phase Margin: PM = 180° + phase(w_c)  [deg]
    const PM_deg = 180.0 + phase_deg;

    // Damping ratio approximation: zeta approx PM / 100
    const zeta_approx = Math.max(0, PM_deg / 100.0);

    let status = '', color = '#22543d';
    if (GM_dB >= 6.0 && PM_deg >= 40.0) {
      status = 'ROBUST STABILITY (GM ≥ 6 dB, PM ≥ 40°: Ideal transient response)';
      color = '#22543d';
    } else if (GM_dB > 0 && PM_deg > 0) {
      status = 'MARGINALLY STABLE (Under-damped ringing)';
      color = '#ea580c';
    } else {
      status = 'UNSTABLE CLOSED LOOP (GM < 0 dB or PM < 0°)';
      color = '#c53030';
    }

    gmResEl.textContent = 'Gain Margin GM = ' + (GM_dB >= 0 ? '+' : '') + GM_dB.toFixed(2) + ' dB (' + GM_linear.toFixed(2) + '× headroom)';
    gmResEl.style.color = color;
    pmResEl.textContent = 'Phase Margin PM = ' + (PM_deg >= 0 ? '+' : '') + PM_deg.toFixed(1) + '° (' + status + ')';
  }

  mgEl.addEventListener('input', update);
  phEl.addEventListener('input', update);
  update();
})();