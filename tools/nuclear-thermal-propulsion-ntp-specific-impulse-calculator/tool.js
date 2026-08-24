(() => {
  'use strict';
  const tEl = document.getElementById('ntp-temp'), pEl = document.getElementById('ntp-press'), gEl = document.getElementById('ntp-gas');
  const ispResEl = document.getElementById('ntp-res-isp'), pfResEl = document.getElementById('ntp-res-perf');

  const g0 = 9.80665;
  const R_univ = 8314.462; // J / (kmol * K)

  const PROPELLANTS = {
    'h2':  { M: 2.016, gamma: 1.40, name: 'Hydrogen LH₂' },
    'nh3': { M: 17.03, gamma: 1.33, name: 'Ammonia NH₃' },
    'ch4': { M: 16.04, gamma: 1.32, name: 'Methane CH₄' }
  };

  function update() {
    const Tc_K = parseFloat(tEl.value), Pc_bar = parseFloat(pEl.value);
    const p = PROPELLANTS[gEl.value];

    if (isNaN(Tc_K) || isNaN(Pc_bar) || Tc_K <= 0 || Pc_bar <= 0) return;

    // Ideal thermodynamic expansion velocity v_e into vacuum (expansion ratio ~ 100:1):
    // v_e approx = sqrt( (2 * gamma / (gamma - 1)) * (R_univ / M) * Tc * [ 1 - (Pe/Pc)^((gamma-1)/gamma) ] )
    const pr_ratio = 1.0 / (Pc_bar * 100.0); // expansion to deep space ~ 0.01 bar exit
    const exp_term = 1.0 - Math.pow(pr_ratio, (p.gamma - 1.0) / p.gamma);

    const v_e_m_s = Math.sqrt((2.0 * p.gamma / (p.gamma - 1.0)) * (R_univ / p.M) * Tc_K * Math.max(0.75, exp_term));
    const v_e_km_s = v_e_m_s / 1000.0;

    // Specific impulse I_sp = v_e / g0  [seconds]
    const I_sp = v_e_m_s / g0;

    const ratioChem = I_sp / 450.0; // Compared to best LH2/LOX RS-25 chemical rocket (450s)

    ispResEl.textContent = 'I_sp = ' + I_sp.toFixed(1) + ' s (' + v_e_km_s.toFixed(2) + ' km/s v_e)';
    pfResEl.textContent = ratioChem.toFixed(2) + '× Chemical Efficiency (' + p.name + ' @ T_core = ' + Tc_K + ' K, P_c = ' + Pc_bar + ' bar | DRACO Target: ~900 s)';
  }

  [tEl, pEl].forEach(el => el.addEventListener('input', update));
  gEl.addEventListener('change', update);
  update();
})();