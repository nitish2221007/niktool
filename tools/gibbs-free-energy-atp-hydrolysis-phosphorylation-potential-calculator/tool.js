(() => {
  'use strict';
  const atpEl = document.getElementById('atp-atp'), adpEl = document.getElementById('atp-adp');
  const piEl = document.getElementById('atp-pi'), tEl = document.getElementById('atp-temp');
  const dgResEl = document.getElementById('atp-res-dg'), stResEl = document.getElementById('atp-res-std');

  const R = 8.314462618e-3; // kJ / (mol * K)
  const dG0_std = -30.5; // kJ / mol at pH 7.0, 25°C

  function update() {
    const ATP_mM = parseFloat(atpEl.value), ADP_mM = parseFloat(adpEl.value);
    const Pi_mM = parseFloat(piEl.value), T_C = parseFloat(tEl.value);

    if (isNaN(ATP_mM) || isNaN(ADP_mM) || isNaN(Pi_mM) || isNaN(T_C) || ATP_mM <= 0 || ADP_mM <= 0 || Pi_mM <= 0) return;

    const T_K = T_C + 273.15;

    // Convert mM to M:
    const ATP_M = ATP_mM * 1e-3;
    const ADP_M = ADP_mM * 1e-3;
    const Pi_M = Pi_mM * 1e-3;

    // Mass action ratio Q = ( [ADP] * [Pi] ) / [ATP]
    const Q = (ADP_M * Pi_M) / ATP_M;

    // Actual Delta_G = Delta_G0 + R * T * ln(Q)  [kJ / mol]
    const deltaG = dG0_std + (R * T_K * Math.log(Q));
    const deltaG_kcal = deltaG / 4.184;

    dgResEl.textContent = 'Actual ΔG = ' + deltaG.toFixed(1) + ' kJ / mol (' + deltaG_kcal.toFixed(1) + ' kcal/mol)';
    stResEl.textContent = 'Standard ΔG°' = -30.5 kJ/mol | Mass action Q = ' + Q.toExponential(2) + ' (Adds ' + (deltaG - dG0_std).toFixed(1) + ' kJ/mol driving force @ ' + T_C + '°C)';
  }

  [atpEl, adpEl, piEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();