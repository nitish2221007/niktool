(() => {
  'use strict';
  const vbeEl = document.getElementById('bj-vbe'), vceEl = document.getElementById('bj-vce');
  const isEl = document.getElementById('bj-is'), vaEl = document.getElementById('bj-va'), btEl = document.getElementById('bj-beta');
  const icResEl = document.getElementById('bj-res-ic'), smResEl = document.getElementById('bj-res-small');

  const V_t = 0.02585; // Thermal voltage @ 300 K in Volts

  function update() {
    const V_BE = parseFloat(vbeEl.value), V_CE = parseFloat(vceEl.value);
    const I_S_fA = parseFloat(isEl.value), V_A = parseFloat(vaEl.value), beta = parseFloat(btEl.value);

    if (isNaN(V_BE) || isNaN(V_CE) || isNaN(I_S_fA) || isNaN(V_A) || isNaN(beta) || I_S_fA <= 0 || V_A <= 0 || beta <= 0) return;

    const I_S_A = I_S_fA * 1e-15;

    // Ebers-Moll forward active current with Early effect:
    // I_C = I_S * exp( V_BE / V_t ) * ( 1 + V_CE / V_A )  [Amperes]
    const exp_term = Math.exp(V_BE / V_t);
    const early_factor = 1.0 + (V_CE / V_A);
    const I_C_A = I_S_A * exp_term * early_factor;
    const I_C_mA = I_C_A * 1000.0;

    // Base current: I_B = I_C / beta  [uA]
    const I_B_uA = (I_C_A / beta) * 1e6;

    // Small-signal transconductance: g_m = I_C / V_t  [A/V -> mS]
    const g_m_mS = (I_C_A / V_t) * 1000.0;

    // Base input resistance: r_pi = beta / g_m  [ohms]
    const r_pi_ohm = beta / (I_C_A / V_t);

    // Output resistance: r_o = (V_A + V_CE) / I_C  [kOhms]
    const r_o_kohm = ((V_A + V_CE) / I_C_A) / 1000.0;

    icResEl.textContent = 'Collector I_C = ' + I_C_mA.toFixed(2) + ' mA (g_m = ' + Math.round(g_m_mS) + ' mS)';
    smResEl.textContent = 'Base I_B = ' + I_B_uA.toFixed(1) + ' μA | r_π = ' + Math.round(r_pi_ohm) + ' Ω | Output r_o = ' + r_o_kohm.toFixed(1) + ' kΩ (V_BE=' + V_BE + ' V, V_CE=' + V_CE + ' V)';
  }

  [vbeEl, vceEl, isEl, vaEl, btEl].forEach(el => el.addEventListener('input', update));
  update();
})();