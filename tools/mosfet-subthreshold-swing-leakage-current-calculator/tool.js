(() => {
  'use strict';
  const tEl = document.getElementById('ss-t'), cEl = document.getElementById('ss-cdep'), vthEl = document.getElementById('ss-vth');
  const ssResEl = document.getElementById('ss-res-val'), ioResEl = document.getElementById('ss-res-ioff');

  const kB_q_mV = 0.08617333; // (k_B / q) * 1000 in mV / K

  function update() {
    const T = parseFloat(tEl.value), c_ratio = parseFloat(cEl.value), Vth = parseFloat(vthEl.value);
    if (isNaN(T) || isNaN(c_ratio) || isNaN(Vth) || T <= 0 || c_ratio < 0 || Vth <= 0) return;

    // Thermal voltage V_T = k_B * T / q  [mV]
    const V_T_mV = kB_q_mV * T;

    // Subthreshold swing SS = ln(10) * V_T * ( 1 + C_dep / C_ox )  [mV / decade]
    const SS_mV_dec = Math.log(10) * V_T_mV * (1.0 + c_ratio);

    // Number of decades of current suppression between V_th and V_gs = 0:
    const decades = (Vth * 1000.0) / SS_mV_dec;
    // Current attenuation ratio = 10^-decades
    const attenRatio = Math.pow(10, -decades);

    ssResEl.textContent = 'SS = ' + SS_mV_dec.toFixed(1) + ' mV / decade (Limit: ' + (Math.log(10) * V_T_mV).toFixed(1) + ' mV/dec)';
    ioResEl.textContent = 'I_off / I_on ≈ ' + attenRatio.toExponential(2) + ' (' + decades.toFixed(2) + ' Decades of Attenuation @ V_th = ' + Vth.toFixed(2) + ' V, T = ' + T + ' K)';
  }

  [tEl, cEl, vthEl].forEach(el => el.addEventListener('input', update));
  update();
})();