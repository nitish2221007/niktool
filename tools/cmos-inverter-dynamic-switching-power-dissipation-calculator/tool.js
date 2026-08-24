(() => {
  'use strict';
  const vddEl = document.getElementById('cp-vdd'), fEl = document.getElementById('cp-f');
  const clEl = document.getElementById('cp-cl'), alEl = document.getElementById('cp-alpha'), ilEl = document.getElementById('cp-ileak');
  const pdResEl = document.getElementById('cp-res-pdyn'), ttResEl = document.getElementById('cp-res-total');

  function update() {
    const V_DD = parseFloat(vddEl.value), f_GHz = parseFloat(fEl.value);
    const C_L_fF = parseFloat(clEl.value), alpha = parseFloat(alEl.value), I_leak_nA = parseFloat(ilEl.value);

    if (isNaN(V_DD) || isNaN(f_GHz) || isNaN(C_L_fF) || isNaN(alpha) || isNaN(I_leak_nA) || V_DD <= 0 || f_GHz <= 0 || C_L_fF <= 0 || alpha <= 0) return;

    const f_Hz = f_GHz * 1e9;
    const C_L_F = C_L_fF * 1e-15;

    // Dynamic switching power: P_dyn = alpha * C_L * V_DD^2 * f  [Watts -> uW]
    const P_dyn_W = alpha * C_L_F * Math.pow(V_DD, 2) * f_Hz;
    const P_dyn_uW = P_dyn_W * 1e6;

    // Static leakage power: P_leak = I_leak * V_DD  [Watts -> nW]
    const P_leak_W = (I_leak_nA * 1e-9) * V_DD;
    const P_leak_nW = P_leak_W * 1e9;

    // Energy per switch: E_switch = C_L * V_DD^2  [Joules -> fJ]
    const E_switch_fJ = C_L_fF * Math.pow(V_DD, 2);

    // 10 Million gates chip power:
    const P_chip_10M_W = (P_dyn_W + P_leak_W) * 1e7;

    pdResEl.textContent = 'Dynamic P_dyn = ' + P_dyn_uW.toFixed(2) + ' μW / Gate';
    ttResEl.textContent = '10M Gates = ' + P_chip_10M_W.toFixed(1) + ' W Chip Total | Energy/Switch = ' + E_switch_fJ.toFixed(2) + ' fJ (Leakage = ' + P_leak_nW.toFixed(1) + ' nW @ ' + f_GHz + ' GHz)';
  }

  [vddEl, fEl, clEl, alEl, ilEl].forEach(el => el.addEventListener('input', update));
  update();
})();