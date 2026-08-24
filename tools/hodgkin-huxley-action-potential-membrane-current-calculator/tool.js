(() => {
  'use strict';
  const vEl = document.getElementById('hh-v'), mEl = document.getElementById('hh-m');
  const hEl = document.getElementById('hh-h'), nEl = document.getElementById('hh-n');
  const iTotResEl = document.getElementById('hh-res-itot'), spResEl = document.getElementById('hh-res-split');

  // Standard Hodgkin-Huxley 1952 Squid Giant Axon Parameters:
  const gbar_Na = 120.0; // mS / cm^2
  const gbar_K = 36.0;   // mS / cm^2
  const g_L = 0.30;      // mS / cm^2
  const E_Na = +50.0;    // mV
  const E_K = -77.0;     // mV
  const E_L = -54.4;     // mV

  function update() {
    const V = parseFloat(vEl.value), m = parseFloat(mEl.value);
    const h = parseFloat(hEl.value), n = parseFloat(nEl.value);

    if (isNaN(V) || isNaN(m) || isNaN(h) || isNaN(n) || m < 0 || m > 1 || h < 0 || h > 1 || n < 0 || n > 1) return;

    // Sodium Current I_Na = gbar_Na * m^3 * h * (V - E_Na)  [uA / cm^2]
    const g_Na = gbar_Na * Math.pow(m, 3) * h;
    const I_Na = g_Na * (V - E_Na);

    // Potassium Current I_K = gbar_K * n^4 * (V - E_K)  [uA / cm^2]
    const g_K = gbar_K * Math.pow(n, 4);
    const I_K = g_K * (V - E_K);

    // Leak Current I_L = g_L * (V - E_L)  [uA / cm^2]
    const I_L = g_L * (V - E_L);

    // Total ionic current I_ion = I_Na + I_K + I_L
    const I_ion = I_Na + I_K + I_L;

    iTotResEl.textContent = 'I_ion = ' + (I_ion >= 0 ? '+' : '') + I_ion.toFixed(1) + ' μA / cm²';
    spResEl.textContent = 'I_Na: ' + I_Na.toFixed(1) + ' μA/cm² (g_Na = ' + g_Na.toFixed(1) + ' mS) | I_K: +' + I_K.toFixed(1) + ' μA/cm² (g_K = ' + g_K.toFixed(1) + ' mS) | I_L: ' + I_L.toFixed(1) + ' μA/cm²';
  }

  [vEl, mEl, hEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();