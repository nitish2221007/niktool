(() => {
  'use strict';
  const iEl = document.getElementById('lif-i'), rEl = document.getElementById('lif-r');
  const vthEl = document.getElementById('lif-vth'), trEl = document.getElementById('lif-tref');
  const fResEl = document.getElementById('lif-res-freq'), rhResEl = document.getElementById('lif-res-rheo');

  const tau_m_ms = 20.0; // 20 ms membrane time constant

  function update() {
    const I_pA = parseFloat(iEl.value), R_Mohm = parseFloat(rEl.value);
    const Vth_mV = parseFloat(vthEl.value), tref_ms = parseFloat(trEl.value);

    if (isNaN(I_pA) || isNaN(R_Mohm) || isNaN(Vth_mV) || isNaN(tref_ms) || R_Mohm <= 0 || Vth_mV <= 0 || tref_ms < 0) return;

    // Asymptotic steady-state voltage V_inf = I * R
    // I in pA (1e-12 A), R in MOhm (1e6 Ohm) => I * R in mV (1e-6 V = 1e-3 mV) => I_pA * R_Mohm / 1000  [mV]
    const V_inf_mV = (I_pA * R_Mohm) / 1000.0;

    // Rheobase threshold current I_rheo = (Vth / R) * 1000  [pA]
    const I_rheo_pA = (Vth_mV / R_Mohm) * 1000.0;

    if (V_inf_mV <= Vth_mV) {
      fResEl.textContent = '0.0 Hz (Sub-Threshold Quiescent)';
      rhResEl.textContent = 'Sub-threshold: I_inj (' + I_pA + ' pA) < Rheobase (' + I_rheo_pA.toFixed(1) + ' pA). No action potentials generated.';
      fResEl.style.color = '#2563eb';
      return;
    }
    fResEl.style.color = '#22543d';

    // Inter-spike interval ISI = t_ref + tau_m * ln( V_inf / (V_inf - Vth) )  [ms]
    const t_charge_ms = tau_m_ms * Math.log(V_inf_mV / (V_inf_mV - Vth_mV));
    const ISI_ms = tref_ms + t_charge_ms;

    // Firing frequency f = 1000 / ISI  [Hz]
    const f_hz = 1000.0 / ISI_ms;

    fResEl.textContent = 'f = ' + f_hz.toFixed(1) + ' Hz Spiking Rate';
    rhResEl.textContent = 'Rheobase I_th = ' + I_rheo_pA.toFixed(1) + ' pA | ISI = ' + ISI_ms.toFixed(1) + ' ms (Charge: ' + t_charge_ms.toFixed(1) + ' ms + Refractory: ' + tref_ms + ' ms)';
  }

  [iEl, rEl, vthEl, trEl].forEach(el => el.addEventListener('input', update));
  update();
})();