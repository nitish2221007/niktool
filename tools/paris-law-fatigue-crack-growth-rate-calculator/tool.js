(() => {
  'use strict';
  const dsEl = document.getElementById('pl-ds'), aEl = document.getElementById('pl-a');
  const cEl = document.getElementById('pl-c'), mEl = document.getElementById('pl-m');
  const daResEl = document.getElementById('pl-res-dadn'), dkResEl = document.getElementById('pl-res-dk');

  function update() {
    const delta_sigma = parseFloat(dsEl.value), a_mm = parseFloat(aEl.value);
    const C = parseFloat(cEl.value), m = parseFloat(mEl.value);

    if (isNaN(delta_sigma) || isNaN(a_mm) || isNaN(C) || isNaN(m) || delta_sigma <= 0 || a_mm <= 0 || C <= 0 || m <= 0) return;

    const a_m = a_mm * 1e-3;
    const Y = 1.12; // Standard edge crack factor

    // Stress intensity factor range: Delta_K = Y * delta_sigma * sqrt(pi * a_m)  [MPa * m^0.5]
    const Delta_K = Y * delta_sigma * Math.sqrt(Math.PI * a_m);

    // Paris Law: da/dN = C * (Delta_K)^m  [m / cycle -> mm / cycle]
    const dadn_m = C * Math.pow(Delta_K, m);
    const dadn_mm = dadn_m * 1000.0;

    // Cycles to grow 1 mm:
    const cycles_per_mm = dadn_mm > 0 ? Math.round(1.0 / dadn_mm) : 0;

    daResEl.textContent = 'da/dN = ' + dadn_mm.toExponential(2) + ' mm / cycle';
    dkResEl.textContent = 'ΔK = ' + Delta_K.toFixed(1) + ' MPa·m^½ | +1 mm growth requires ~' + cycles_per_mm.toLocaleString() + ' cycles (Δσ=' + delta_sigma + ' MPa)';
  }

  [dsEl, aEl, cEl, mEl].forEach(el => el.addEventListener('input', update));
  update();
})();