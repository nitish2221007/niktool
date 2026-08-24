(() => {
  'use strict';
  const pthEl = document.getElementById('rp-pth'), effEl = document.getElementById('rp-eff');
  const fsResEl = document.getElementById('rp-res-fiss'), bnResEl = document.getElementById('rp-res-burn');

  const MeV_per_fission = 200.0;
  const Joules_per_fission = MeV_per_fission * 1.602176634e-13; // 3.204e-11 J
  const fissions_per_Ws = 1.0 / Joules_per_fission; // 3.121e10 fissions/s per Watt

  function update() {
    const P_th_MW = parseFloat(pthEl.value), eff_pct = parseFloat(effEl.value);
    if (isNaN(P_th_MW) || isNaN(eff_pct) || P_th_MW <= 0 || eff_pct <= 0) return;

    const P_th_Watts = P_th_MW * 1e6;

    // Fissions per second:
    const fissions_per_sec = P_th_Watts * fissions_per_Ws;

    // Daily U-235 fission mass consumed:
    // M = (fissions/day * 235.044 g/mol) / N_A
    // 1 MW_th consumes approx 1.05 grams U-235 per day (including non-fission capture ~1.25 g/day)
    const U235_kg_day = (P_th_MW * 1.05) * 1e-3;

    // Electric output:
    const P_e_MW = P_th_MW * (eff_pct / 100.0);

    fsResEl.textContent = 'Fission Rate = ' + fissions_per_sec.toExponential(2) + ' Fissions / s';
    bnResEl.textContent = 'U-235 Burnup = ' + U235_kg_day.toFixed(2) + ' kg/day | Electric = ' + Math.round(P_e_MW) + ' MW_e (' + (P_e_MW/1000).toFixed(2) + ' GW_e @ η=' + eff_pct + '%)';
  }

  pthEl.addEventListener('input', update);
  effEl.addEventListener('input', update);
  update();
})();