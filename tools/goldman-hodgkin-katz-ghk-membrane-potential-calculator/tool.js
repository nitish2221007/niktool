(() => {
  'use strict';
  const koEl = document.getElementById('ghk-ko'), kiEl = document.getElementById('ghk-ki');
  const naoEl = document.getElementById('ghk-nao'), naiEl = document.getElementById('ghk-nai'), pnaEl = document.getElementById('ghk-pna');
  const vmResEl = document.getElementById('ghk-res-vm'), nrResEl = document.getElementById('ghk-res-nernst');

  const R = 8.314462;
  const F = 96485.33;
  const T = 310.15; // 37°C in Kelvin
  const RT_F_mV = (R * T / F) * 1000; // ~26.7 mV (ln multiplier: 61.5 for log10)

  // Standard chloride concentrations:
  const clo = 110.0;
  const cli = 10.0;
  const P_Cl = 0.40;

  function update() {
    const Ko = parseFloat(koEl.value), Ki = parseFloat(kiEl.value);
    const Nao = parseFloat(naoEl.value), Nai = parseFloat(naiEl.value);
    const P_Na = parseFloat(pnaEl.value);

    if (isNaN(Ko) || isNaN(Ki) || isNaN(Nao) || isNaN(Nai) || isNaN(P_Na) || Ko <= 0 || Ki <= 0 || Nao <= 0 || Nai <= 0 || P_Na < 0) return;

    const P_K = 1.00;

    // GHK Voltage equation: Vm = (RT/F) * ln( (P_K*Ko + P_Na*Nao + P_Cl*Cli) / (P_K*Ki + P_Na*Nai + P_Cl*Clo) )  [mV]
    const num = (P_K * Ko) + (P_Na * Nao) + (P_Cl * cli);
    const den = (P_K * Ki) + (P_Na * Nai) + (P_Cl * clo);
    const Vm = RT_F_mV * Math.log(num / den);

    // Individual Nernst potentials:
    const E_K = RT_F_mV * Math.log(Ko / Ki);
    const E_Na = RT_F_mV * Math.log(Nao / Nai);
    const E_Cl = -RT_F_mV * Math.log(clo / cli); // negative valence

    vmResEl.textContent = 'V_m = ' + Vm.toFixed(1) + ' mV Resting Potential';
    nrResEl.textContent = 'Nernst: E_K = ' + E_K.toFixed(1) + ' mV | E_Na = +' + E_Na.toFixed(1) + ' mV | E_Cl = ' + E_Cl.toFixed(1) + ' mV (RT/F = ' + RT_F_mV.toFixed(1) + ' mV @ 37°C)';
  }

  [koEl, kiEl, naoEl, naiEl, pnaEl].forEach(el => el.addEventListener('input', update));
  update();
})();