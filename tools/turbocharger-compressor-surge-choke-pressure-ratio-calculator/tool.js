(() => {
  'use strict';
  const bEl = document.getElementById('tb-boost'), tEl = document.getElementById('tb-tin'), efEl = document.getElementById('tb-eff');
  const prResEl = document.getElementById('tb-res-pr'), toResEl = document.getElementById('tb-res-tout');

  const P_atm_psi = 14.696, gamma = 1.40;

  function update() {
    const boost_psi = parseFloat(bEl.value), Tin_C = parseFloat(tEl.value), eff_pct = parseFloat(efEl.value);
    if (isNaN(boost_psi) || isNaN(Tin_C) || isNaN(eff_pct) || boost_psi < 0 || eff_pct <= 0) return;

    const Tin_K = Tin_C + 273.15;
    const eta_c = eff_pct / 100.0;

    // Absolute pressure ratio: PR = (P_atm + Boost) / P_atm
    const P_out_psi = P_atm_psi + boost_psi;
    const PR = P_out_psi / P_atm_psi;

    // Ideal isentropic temperature ratio: (PR)^((gamma-1)/gamma)
    const expTerm = (gamma - 1.0) / gamma;
    const isentropic_factor = Math.pow(PR, expTerm);

    // Actual compressor discharge temp: Tout = Tin * [ 1 + (isentropic_factor - 1) / eta_c ]
    const Tout_K = Tin_K * (1.0 + (isentropic_factor - 1.0) / eta_c);
    const Tout_C = Tout_K - 273.15;
    const boost_bar = boost_psi * 0.0689476;

    prResEl.textContent = 'Pressure Ratio PR = ' + PR.toFixed(2) + ':1 (' + boost_bar.toFixed(2) + ' bar Boost)';
    toResEl.textContent = 'Discharge T_out = ' + Math.round(Tout_C) + ' °C (' + Math.round(Tout_K) + ' K | +' + Math.round(Tout_C - Tin_C) + ' °C Rise @ η_c = ' + eff_pct + '%)';
  }

  [bEl, tEl, efEl].forEach(el => el.addEventListener('input', update));
  update();
})();