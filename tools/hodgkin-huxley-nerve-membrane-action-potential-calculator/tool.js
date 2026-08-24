(() => {
  'use strict';
  const vEl = document.getElementById('hh-v'), mEl = document.getElementById('hh-m');
  const hEl = document.getElementById('hh-h'), nEl = document.getElementById('hh-n');
  const crResEl = document.getElementById('hh-res-curr'), spResEl = document.getElementById('hh-res-split');

  const g_Na_max = 120.0;
  const g_K_max = 36.0;
  const g_L = 0.3;
  const E_Na = 50.0;
  const E_K = -77.0;
  const E_L = -54.4;

  function update() {
    const V = parseFloat(vEl.value), m = parseFloat(mEl.value);
    const h = parseFloat(hEl.value), n = parseFloat(nEl.value);

    if (isNaN(V) || isNaN(m) || isNaN(h) || isNaN(n) || m < 0 || m > 1 || h < 0 || h > 1 || n < 0 || n > 1) return;

    const I_Na = g_Na_max * Math.pow(m, 3) * h * (V - E_Na) * 10.0;
    const I_K = g_K_max * Math.pow(n, 4) * (V - E_K) * 10.0;
    const I_L = g_L * (V - E_L) * 10.0;
    const I_total = I_Na + I_K + I_L;

    let dir = '';
    if (I_total < 0) {
      dir = ' (Inward Na⁺ Current -> Rapid Action Potential Upstroke)';
    } else {
      dir = ' (Outward K⁺ Current -> Repolarization / Hyperpolarization)';
    }

    crResEl.textContent = 'Total Current I_ion = ' + (I_total >= 0 ? '+' : '') + Math.round(I_total).toLocaleString() + ' μA / cm²' + dir;
    spResEl.textContent = 'I_Na = ' + Math.round(I_Na).toLocaleString() + ' μA/cm² | I_K = ' + (I_K >= 0 ? '+' : '') + Math.round(I_K).toLocaleString() + ' μA/cm² | I_L = ' + (I_L >= 0 ? '+' : '') + Math.round(I_L) + ' μA/cm² (V=' + V + ' mV)';
  }

  [vEl, mEl, hEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();