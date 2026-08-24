(() => {
  'use strict';
  const h1El = document.getElementById('rk-h1'), h2El = document.getElementById('rk-h2');
  const h3El = document.getElementById('rk-h3'), h4El = document.getElementById('rk-h4');
  const efResEl = document.getElementById('rk-res-eff'), hrResEl = document.getElementById('rk-res-hr');

  function update() {
    const h1 = parseFloat(h1El.value), h2 = parseFloat(h2El.value);
    const h3 = parseFloat(h3El.value), h4 = parseFloat(h4El.value);

    if (isNaN(h1) || isNaN(h2) || isNaN(h3) || isNaN(h4) || h1 <= h2 || h4 <= h3) return;

    // Turbine work: w_turb = h1 - h2
    const w_turb = h1 - h2;
    // Pump work: w_pump = h4 - h3
    const w_pump = h4 - h3;

    // Net work output: w_net = w_turb - w_pump
    const w_net = w_turb - w_pump;

    // Boiler heat input: q_in = h1 - h4
    const q_in = h1 - h4;

    // Thermal efficiency: eta = w_net / q_in
    const eta_pct = (w_net / q_in) * 100.0;

    // Net Heat Rate (kJ / kWh) = 3600 / (eta / 100)
    const heatRate_kJ_kWh = 3600.0 / (eta_pct / 100.0);

    efResEl.textContent = 'Thermal Efficiency η_th = ' + eta_pct.toFixed(2) + '%';
    hrResEl.textContent = 'Net Work = ' + w_net.toFixed(1) + ' kJ/kg | Heat In = ' + q_in.toFixed(1) + ' kJ/kg | Heat Rate = ' + Math.round(heatRate_kJ_kWh).toLocaleString() + ' kJ/kWh';
  }

  [h1El, h2El, h3El, h4El].forEach(el => el.addEventListener('input', update));
  update();
})();