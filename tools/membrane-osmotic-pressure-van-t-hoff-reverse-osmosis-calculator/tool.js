(() => {
  'use strict';
  const tdsEl = document.getElementById('ro-tds'), dpEl = document.getElementById('ro-dp');
  const aEl = document.getElementById('ro-a'), tEl = document.getElementById('ro-temp');
  const fxResEl = document.getElementById('ro-res-flux'), piResEl = document.getElementById('ro-res-pi');

  const R = 0.08314462618; // L * bar / (mol * K)
  const MW_NaCl = 58.44; // g / mol

  function update() {
    const TDS_mg_L = parseFloat(tdsEl.value), dP_bar = parseFloat(dpEl.value);
    const A_permeability = parseFloat(aEl.value), T_C = parseFloat(tEl.value);

    if (isNaN(TDS_mg_L) || isNaN(dP_bar) || isNaN(A_permeability) || isNaN(T_C) || TDS_mg_L <= 0 || dP_bar <= 0 || A_permeability <= 0 || T_C < -273.15) return;

    const T_K = T_C + 273.15;

    // Molarity M = (TDS_mg_L * 1e-3 g/L) / MW_NaCl  [mol / L]
    const M = (TDS_mg_L * 1e-3) / MW_NaCl;

    // Van 't Hoff osmotic pressure: Pi = i * M * R * T  (i = 2 for NaCl: Na+ and Cl-)  [bar]
    const i = 2.0;
    const Pi_bar = i * M * R * T_K;

    // Net driving pressure NDP = dP - Pi  [bar]
    const NDP_bar = dP_bar - Pi_bar;

    let flux_LMH = 0;
    if (NDP_bar > 0) {
      flux_LMH = A_permeability * NDP_bar;
    }

    fxResEl.textContent = 'Water Flux J_w = ' + (NDP_bar > 0 ? flux_LMH.toFixed(1) + ' LMH' : '0.0 LMH (ΔP < Π: Osmotic Backflow)');
    piResEl.textContent = 'Osmotic Π = ' + Pi_bar.toFixed(1) + ' bar | Net Driving Pressure NDP = ' + NDP_bar.toFixed(1) + ' bar (' + (TDS_mg_L/1000).toFixed(1) + ' g/L @ ' + T_C + '°C)';
  }

  [tdsEl, dpEl, aEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();