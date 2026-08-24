(() => {
  'use strict';
  const typeEl = document.getElementById('fin-type'), hEl = document.getElementById('fin-h');
  const tEl = document.getElementById('fin-t'), countEl = document.getElementById('fin-count');
  const wResEl = document.getElementById('fin-res-weff'), cResEl = document.getElementById('fin-res-curr');

  const Jon_mA_um = 1.20; // 1.2 mA per um of effective width (typical high-performance node)

  function update() {
    const isGAA = typeEl.value === 'gaa';
    const H_nm = parseFloat(hEl.value), T_nm = parseFloat(tEl.value), N = parseInt(countEl.value, 10);

    if (isNaN(H_nm) || isNaN(T_nm) || isNaN(N) || H_nm <= 0 || T_nm <= 0 || N < 1) return;

    let Weff_single = 0.0;
    if (!isGAA) {
      // Tri-gate FinFET: Weff = 2 * H_fin + T_fin
      Weff_single = (2.0 * H_nm) + T_nm;
    } else {
      // GAA Nanosheet: Weff = 2 * ( W_ns + T_ns )
      Weff_single = 2.0 * (H_nm + T_nm);
    }

    const Weff_total_nm = N * Weff_single;
    const Weff_total_um = Weff_total_nm / 1000.0;

    // Drive current Ion = Jon * Weff_total  [uA]
    const Ion_uA = Jon_mA_um * Weff_total_um * 1000.0;

    wResEl.textContent = 'W_eff = ' + Weff_total_nm.toFixed(1) + ' nm Active Width';
    cResEl.textContent = 'Drive Current I_on ≈ ' + Ion_uA.toFixed(1) + ' μA (' + N + ' ' + (isGAA ? 'Sheets' : 'Fins') + ' × ' + Weff_single.toFixed(0) + ' nm/fin | J_on = ' + Jon_mA_um + ' mA/μm)';
  }

  [typeEl, hEl, tEl, countEl].forEach(el => el.addEventListener('input', update));
  typeEl.addEventListener('change', update);
  update();
})();