(() => {
  'use strict';
  const mfEl = document.getElementById('tf-mf'), fEl = document.getElementById('tf-f'), bpEl = document.getElementById('tf-bpr');
  const tsResEl = document.getElementById('tf-res-tsfc'), efResEl = document.getElementById('tf-res-eff');

  function update() {
    const mf_kg_s = parseFloat(mfEl.value), F_kN = parseFloat(fEl.value), BPR = parseFloat(bpEl.value);
    if (isNaN(mf_kg_s) || isNaN(F_kN) || isNaN(BPR) || mf_kg_s <= 0 || F_kN <= 0 || BPR < 0) return;

    // TSFC in SI units: g / (kN * s)
    const TSFC_g_kN_s = (mf_kg_s * 1000.0) / F_kN;

    // TSFC in Imperial English units: lbm / (lbf * hr)
    // 1 g/(kN*s) approx 0.03530 lbm/(lbf*hr)
    const TSFC_imperial = TSFC_g_kN_s * 0.0353039;

    // Fuel consumption per hour:
    const fuel_kg_hr = mf_kg_s * 3600.0;
    const F_lbf = F_kN * 224.809;

    tsResEl.textContent = 'TSFC = ' + TSFC_g_kN_s.toFixed(2) + ' g / (kN · s) (' + TSFC_imperial.toFixed(3) + ' lbm/(lbf·hr))';
    efResEl.textContent = 'Fuel Burn = ' + Math.round(fuel_kg_hr).toLocaleString() + ' kg/hr | Thrust = ' + Math.round(F_lbf).toLocaleString() + ' lbf (BPR = ' + BPR + ':1)';
  }

  [mfEl, fEl, bpEl].forEach(el => el.addEventListener('input', update));
  update();
})();