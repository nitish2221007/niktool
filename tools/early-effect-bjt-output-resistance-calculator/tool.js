(() => {
  'use strict';
  const vaEl = document.getElementById('va-va'), icEl = document.getElementById('va-ic'), vceEl = document.getElementById('va-vce');
  const roResEl = document.getElementById('va-res-ro'), gnResEl = document.getElementById('va-res-gain');

  const V_T = 0.026; // 26 mV thermal voltage @ 300K

  function update() {
    const V_A = parseFloat(vaEl.value), I_c_mA = parseFloat(icEl.value), V_CE = parseFloat(vceEl.value);
    if (isNaN(V_A) || isNaN(I_c_mA) || isNaN(V_CE) || V_A <= 0 || I_c_mA <= 0 || V_CE < 0) return;

    const I_c_A = I_c_mA * 1e-3;

    // Small signal output resistance r_o = (V_A + V_CE) / I_C  [Ohms -> kOhms]
    const r_o_ohms = (V_A + V_CE) / I_c_A;
    const r_o_kohm = r_o_ohms / 1000.0;

    // Transconductance g_m = I_C / V_T  [A / V = Siemens]
    const g_m = I_c_A / V_T;

    // Maximum intrinsic single-transistor voltage gain A_v,max = g_m * r_o = (V_A + V_CE) / V_T
    const A_v_max = g_m * r_o_ohms;
    const gain_db = 20.0 * Math.log10(A_v_max);

    roResEl.textContent = 'r_o = ' + r_o_kohm.toFixed(1) + ' kΩ Output Resistance';
    gnResEl.textContent = 'A_v,max = ' + Math.round(A_v_max).toLocaleString() + ' V/V (' + gain_db.toFixed(1) + ' dB | g_m = ' + (g_m*1000).toFixed(1) + ' mA/V @ V_A = ' + V_A + ' V)';
  }

  [vaEl, icEl, vceEl].forEach(el => el.addEventListener('input', update));
  update();
})();