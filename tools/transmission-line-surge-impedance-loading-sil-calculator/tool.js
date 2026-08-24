(() => {
  'use strict';
  const vEl = document.getElementById('sil-v'), lEl = document.getElementById('sil-l'), cEl = document.getElementById('sil-c');
  const silResEl = document.getElementById('sil-res-sil'), zcResEl = document.getElementById('sil-res-zc');

  function update() {
    const V_kv = parseFloat(vEl.value), L_mH = parseFloat(lEl.value), C_nF = parseFloat(cEl.value);
    if (isNaN(V_kv) || isNaN(L_mH) || isNaN(C_nF) || V_kv <= 0 || L_mH <= 0 || C_nF <= 0) return;

    // Convert L to H/km (1e-3) and C to F/km (1e-9)
    // Surge impedance Z_c = sqrt( L / C )  [Ohms]
    const Z_c = Math.sqrt((L_mH * 1e-3) / (C_nF * 1e-9));

    // SIL in Megawatts: SIL = ( V_kv )^2 / Z_c  [MW]
    const SIL_MW = Math.pow(V_kv, 2) / Z_c;

    silResEl.textContent = 'SIL = ' + SIL_MW.toFixed(1) + ' MW (' + V_kv + ' kV EHV Line)';
    zcResEl.textContent = 'Surge Impedance Z_c = ' + Z_c.toFixed(1) + ' Ω (L = ' + L_mH + ' mH/km, C = ' + C_nF + ' nF/km | Flat Voltage Profile @ P = SIL)';
  }

  [vEl, lEl, cEl].forEach(el => el.addEventListener('input', update));
  update();
})();