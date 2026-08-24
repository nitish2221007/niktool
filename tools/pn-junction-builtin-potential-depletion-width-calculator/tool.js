(() => {
  'use strict';
  const naEl = document.getElementById('pn-na'), ndEl = document.getElementById('pn-nd'), tEl = document.getElementById('pn-temp');
  const vResEl = document.getElementById('pn-res-vbi'), wResEl = document.getElementById('pn-res-w');

  const eps0 = 8.8541878128e-12;
  const eps_si = 11.7 * eps0;
  const q_e = 1.602176634e-19;
  const kB = 1.380649e-23;

  function update() {
    const Na_cm3 = parseFloat(naEl.value), Nd_cm3 = parseFloat(ndEl.value), T = parseFloat(tEl.value);
    if (isNaN(Na_cm3) || isNaN(Nd_cm3) || isNaN(T) || Na_cm3 <= 0 || Nd_cm3 <= 0 || T <= 0) return;

    const Vt = (kB * T) / q_e;
    const ni = 1.5e10 * Math.pow(T / 300, 1.5) * Math.exp(-((1.12 * q_e) / (2 * kB)) * (1 / T - 1 / 300));
    const Vbi = Vt * Math.log((Na_cm3 * Nd_cm3) / Math.pow(ni, 2));

    const Na_m3 = Na_cm3 * 1e6;
    const Nd_m3 = Nd_cm3 * 1e6;
    const W_m = Math.sqrt(((2 * eps_si) / q_e) * ((1 / Na_m3) + (1 / Nd_m3)) * Vbi);
    const W_um = W_m * 1e6;

    vResEl.textContent = Vbi.toFixed(3) + ' Volts (V_bi @ ' + T + ' K)';
    wResEl.textContent = 'W = ' + W_um.toFixed(3) + ' μm (Thermal Voltage V_t = ' + (Vt * 1000).toFixed(1) + ' mV)';
  }

  [naEl, ndEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();