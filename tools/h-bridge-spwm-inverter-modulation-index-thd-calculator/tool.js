(() => {
  'use strict';
  const vdcEl = document.getElementById('inv-vdc'), vctrlEl = document.getElementById('inv-vctrl'), vtriEl = document.getElementById('inv-vtri');
  const vrmsResEl = document.getElementById('inv-res-vrms'), maResEl = document.getElementById('inv-res-ma');

  function update() {
    const Vdc = parseFloat(vdcEl.value), Vctrl = parseFloat(vctrlEl.value), Vtri = parseFloat(vtriEl.value);
    if (isNaN(Vdc) || isNaN(Vctrl) || isNaN(Vtri) || Vdc <= 0 || Vctrl <= 0 || Vtri <= 0) return;

    // Amplitude modulation index m_a = Vctrl / Vtri
    const m_a = Vctrl / Vtri;

    let V_LL_rms = 0;
    let regimeDesc = '';
    let color = '#22543d';

    if (m_a <= 1.0) {
      // Linear modulation regime: V_LN,1,peak = m_a * Vdc / 2
      // V_LL,1,rms = sqrt(3) / sqrt(2) * (m_a * Vdc / 2) = (sqrt(3) / (2 * sqrt(2))) * m_a * Vdc
      V_LL_rms = (Math.sqrt(3) / (2 * Math.sqrt(2))) * m_a * Vdc;
      regimeDesc = 'LINEAR MODULATION (m_a = ' + m_a.toFixed(3) + ' ≤ 1.0: Pure Sine AC with Low THD)';
      color = '#22543d';
    } else if (m_a <= 3.24) {
      // Overmodulation regime
      const maxLinear = (Math.sqrt(3) / (2 * Math.sqrt(2))) * 1.0 * Vdc;
      const sixStep = (Math.sqrt(6) / Math.PI) * Vdc;
      V_LL_rms = maxLinear + ((sixStep - maxLinear) * ((m_a - 1.0) / 2.24));
      regimeDesc = 'OVERMODULATION (1.0 < m_a < 3.24: Non-linear voltage gain with lower-order harmonics)';
      color = '#d97706';
    } else {
      // Six-step square wave limit: V_LL,rms = sqrt(6)/pi * Vdc = 0.7797 * Vdc
      V_LL_rms = (Math.sqrt(6) / Math.PI) * Vdc;
      regimeDesc = 'SIX-STEP SQUARE WAVE OPERATION (m_a >> 1: Maximum Voltage Utilization 0.78·V_dc)';
      color = '#c53030';
    }

    const V_LN_rms = V_LL_rms / Math.sqrt(3);

    vrmsResEl.textContent = 'V_LL = ' + V_LL_rms.toFixed(1) + ' V RMS (Phase V_LN = ' + V_LN_rms.toFixed(1) + ' V)';
    maResEl.textContent = regimeDesc;
    maResEl.style.color = color;
  }

  [vdcEl, vctrlEl, vtriEl].forEach(el => el.addEventListener('input', update));
  update();
})();