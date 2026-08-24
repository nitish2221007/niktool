(() => {
  'use strict';
  const tEl = document.getElementById('het-t'), pEl = document.getElementById('het-p'), mEl = document.getElementById('het-mdot');
  const etaResEl = document.getElementById('het-res-eta'), ispResEl = document.getElementById('het-res-isp');

  const g0 = 9.80665;

  function update() {
    const T_mN = parseFloat(tEl.value), P_kW = parseFloat(pEl.value), mdot_mg_s = parseFloat(mEl.value);
    if (isNaN(T_mN) || isNaN(P_kW) || isNaN(mdot_mg_s) || T_mN <= 0 || P_kW <= 0 || mdot_mg_s <= 0) return;

    const T_N = T_mN * 1e-3;
    const P_W = P_kW * 1000.0;
    const mdot_kg_s = mdot_mg_s * 1e-6;

    // Specific impulse I_sp = T / ( mdot * g0 )  [seconds]
    const I_sp = T_N / (mdot_kg_s * g0);
    // Exhaust velocity v_e = I_sp * g0  [m / s -> km / s]
    const v_e_km_s = (I_sp * g0) / 1000.0;

    // Anode efficiency eta_a = T^2 / ( 2 * mdot * P_d )
    const eta_a = Math.pow(T_N, 2) / (2.0 * mdot_kg_s * P_W);
    const eta_pct = eta_a * 100.0;

    // Thrust-to-power ratio T/P in mN / kW
    const T_P = T_mN / P_kW;

    etaResEl.textContent = 'η_a = ' + eta_pct.toFixed(1) + '% Anode Efficiency';
    ispResEl.textContent = 'I_sp = ' + Math.round(I_sp).toLocaleString() + ' s (' + v_e_km_s.toFixed(1) + ' km/s | T/P = ' + T_P.toFixed(1) + ' mN/kW @ ' + P_kW + ' kW)';
  }

  [tEl, pEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();