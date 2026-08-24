(() => {
  'use strict';
  const omrEl = document.getElementById('rb-omr'), detEl = document.getElementById('rb-det'), tmEl = document.getElementById('rb-time');
  const peResEl = document.getElementById('rb-res-pexc'), piResEl = document.getElementById('rb-res-pi');

  function update() {
    const f_Rabi_MHz = parseFloat(omrEl.value), f_det_MHz = parseFloat(detEl.value);
    const t_ns = parseFloat(tmEl.value);

    if (isNaN(f_Rabi_MHz) || isNaN(f_det_MHz) || isNaN(t_ns) || f_Rabi_MHz <= 0 || t_ns < 0) return;

    // Angular frequencies in rad/s:
    const Omega_R = 2.0 * Math.PI * f_Rabi_MHz * 1e6;
    const Delta = 2.0 * Math.PI * f_det_MHz * 1e6;

    // Generalized Rabi frequency: Omega = sqrt( Omega_R^2 + Delta^2 )
    const Omega = Math.sqrt(Math.pow(Omega_R, 2) + Math.pow(Delta, 2));

    const t_s = t_ns * 1e-9;

    // Transition probability: P_e(t) = (Omega_R / Omega)^2 * sin^2( Omega * t / 2 )
    const amplitude = Math.pow(Omega_R / Omega, 2);
    const P_e = amplitude * Math.pow(Math.sin((Omega * t_s) / 2.0), 2);
    const P_e_pct = P_e * 100.0;

    // Resonant pi-pulse time: t_pi = pi / Omega_R  [s -> ns]
    const t_pi_ns = (Math.PI / Omega_R) * 1e9;
    const t_pi2_ns = t_pi_ns / 2.0;

    peResEl.textContent = 'Excited State P_e(t) = ' + P_e_pct.toFixed(1) + '%';
    piResEl.textContent = 'π-Pulse t_π = ' + t_pi_ns.toFixed(2) + ' ns | π/2-Pulse = ' + t_pi2_ns.toFixed(2) + ' ns (Ω_gen / 2π = ' + (Omega / (2*Math.PI*1e6)).toFixed(1) + ' MHz @ t=' + t_ns + ' ns)';
  }

  [omrEl, detEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();