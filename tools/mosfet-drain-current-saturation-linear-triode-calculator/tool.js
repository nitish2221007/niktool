(() => {
  'use strict';
  const vgsEl = document.getElementById('mc-vgs'), vdsEl = document.getElementById('mc-vds');
  const vthEl = document.getElementById('mc-vth'), kpEl = document.getElementById('mc-kp'), wlEl = document.getElementById('mc-wl');
  const idResEl = document.getElementById('mc-res-id'), gmResEl = document.getElementById('mc-res-gm');

  function update() {
    const V_GS = parseFloat(vgsEl.value), V_DS = parseFloat(vdsEl.value);
    const V_th = parseFloat(vthEl.value), k_prime_uA = parseFloat(kpEl.value), W_L = parseFloat(wlEl.value);

    if (isNaN(V_GS) || isNaN(V_DS) || isNaN(V_th) || isNaN(k_prime_uA) || isNaN(W_L) || k_prime_uA <= 0 || W_L <= 0) return;

    const beta_uA = k_prime_uA * W_L; // uA / V^2
    const V_ov = V_GS - V_th; // Overdrive voltage

    let I_D_uA = 0, g_m_mS = 0, mode = '', color = '#22543d';

    if (V_GS < V_th) {
      // Cutoff:
      I_D_uA = 0;
      g_m_mS = 0;
      mode = 'CUTOFF REGIME (V_GS < V_th: Channel not formed)';
      color = '#c53030';
    } else if (V_DS < V_ov) {
      // Linear Triode Regime: I_D = beta * [ (V_GS - V_th)*V_DS - 0.5*V_DS^2 ]
      I_D_uA = beta_uA * ((V_ov * V_DS) - (0.5 * Math.pow(V_DS, 2)));
      g_m_mS = (beta_uA * V_DS) * 1e-3; // mA / V
      mode = 'LINEAR TRIODE REGIME (V_DS < V_ov: Resistor-like behavior)';
      color = '#ea580c';
    } else {
      // Saturation Regime: I_D = 0.5 * beta * (V_GS - V_th)^2
      I_D_uA = 0.5 * beta_uA * Math.pow(V_ov, 2);
      g_m_mS = (beta_uA * V_ov) * 1e-3; // mA / V
      mode = 'SATURATION REGIME (V_DS ≥ V_ov: Pinched-off channel, current source)';
      color = '#22543d';
    }

    const I_D_mA = I_D_uA * 1e-3;

    idResEl.textContent = 'Drain Current I_D = ' + (I_D_mA >= 1.0 ? I_D_mA.toFixed(3) + ' mA' : I_D_uA.toFixed(1) + ' μA') + ' (' + mode.split(' (')[0] + ')';
    idResEl.style.color = color;
    gmResEl.textContent = 'Transconductance g_m = ' + g_m_mS.toFixed(2) + ' mS | Overdrive V_ov = ' + (V_ov >= 0 ? '+' : '') + V_ov.toFixed(2) + ' V (' + mode + ')';
  }

  [vgsEl, vdsEl, vthEl, kpEl, wlEl].forEach(el => el.addEventListener('input', update));
  update();
})();