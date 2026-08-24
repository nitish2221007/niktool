(() => {
  'use strict';
  const nEl = document.getElementById('fus-n'), tEl = document.getElementById('fus-t'), tauEl = document.getElementById('fus-tau');
  const tpResEl = document.getElementById('fus-res-tp'), qResEl = document.getElementById('fus-res-q');

  const lawson_ignition_threshold = 3.0e21; // keV * s / m^3 (for D-T at ~15 keV)

  function update() {
    const n_factor = parseFloat(nEl.value), T_kev = parseFloat(tEl.value), tau_sec = parseFloat(tauEl.value);
    if (isNaN(n_factor) || isNaN(T_kev) || isNaN(tau_sec) || n_factor <= 0 || T_kev <= 0 || tau_sec <= 0) return;

    const n_m3 = n_factor * 1e20;

    // Triple product n * T * tau_E  [keV * s / m^3]
    const tripleProduct = n_m3 * T_kev * tau_sec;

    // Temperature in million degrees Celsius: 1 keV approx 11.6045 million K
    const tempMillionK = T_kev * 11.6045;

    // Fusion gain factor Q approximation:
    // Q = 5 / ( (lawson_ignition_threshold / tripleProduct) - 1 ) for TP < threshold
    let Q_str = '';
    let color = '#22543d';

    if (tripleProduct >= lawson_ignition_threshold) {
      Q_str = 'IGNITION / BURNING PLASMA (Q ≥ 10: Self-sustaining alpha heating dominates P_aux)';
      color = '#22543d';
    } else if (tripleProduct >= 0.5 * lawson_ignition_threshold) {
      const Q_val = (tripleProduct / lawson_ignition_threshold) * 8.0;
      Q_str = 'SCIENTIFIC BREAKEVEN (Q ≈ ' + Q_val.toFixed(1) + ' > 1: Generates more fusion power than injected heat)';
      color = '#2563eb';
    } else {
      const Q_val = (tripleProduct / lawson_ignition_threshold) * 2.0;
      Q_str = 'SUB-BREAKEVEN (Q ≈ ' + Q_val.toFixed(2) + ' < 1: Net energy loss, requires external heating)';
      color = '#d97706';
    }

    tpResEl.textContent = 'n·T·τ_E = ' + (tripleProduct).toExponential(2) + ' keV·s/m³';
    qResEl.textContent = Q_str + ' (T = ' + Math.round(tempMillionK) + ' Million °C @ ' + T_kev + ' keV)';
    qResEl.style.color = color;
  }

  [nEl, tEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();