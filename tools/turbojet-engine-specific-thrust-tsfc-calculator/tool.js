(() => {
  'use strict';
  const mdEl = document.getElementById('tj-mdot'), veEl = document.getElementById('tj-ve');
  const v0El = document.getElementById('tj-v0'), mfEl = document.getElementById('tj-mf');
  const fnResEl = document.getElementById('tj-res-fn'), tsfcResEl = document.getElementById('tj-res-tsfc');

  function update() {
    const mdot = parseFloat(mdEl.value), v_e = parseFloat(veEl.value);
    const v_0 = parseFloat(v0El.value), mdot_f = parseFloat(mfEl.value);

    if (isNaN(mdot) || isNaN(v_e) || isNaN(v_0) || isNaN(mdot_f) || mdot <= 0 || v_e <= v_0 || mdot_f <= 0) return;

    // Net thrust F_n = mdot * (v_e - v_0)  [Newtons -> kN]
    const F_n_N = mdot * (v_e - v_0);
    const F_n_kN = F_n_N / 1000.0;
    const F_n_lbf = F_n_N * 0.224809;

    // TSFC in g / (kN * s) = (mdot_f * 1000) / F_n_kN
    const TSFC_SI = (mdot_f * 1000.0) / F_n_kN;
    const TSFC_imperial = (mdot_f * 3600.0 * 2.20462) / F_n_lbf;

    // Propulsive efficiency: eta_p = 2 * v_0 / (v_e + v_0)
    const eta_p = (2.0 * v_0) / (v_e + v_0) * 100.0;

    fnResEl.textContent = 'Net Thrust F_n = ' + F_n_kN.toFixed(2) + ' kN (' + Math.round(F_n_lbf).toLocaleString() + ' lbf)';
    tsfcResEl.textContent = 'TSFC = ' + TSFC_SI.toFixed(2) + ' g/(kN·s) (' + TSFC_imperial.toFixed(3) + ' lb/(lbf·hr)) | Propulsive η_p = ' + eta_p.toFixed(1) + '%';
  }

  [mdEl, veEl, v0El, mfEl].forEach(el => el.addEventListener('input', update));
  update();
})();