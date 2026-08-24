(() => {
  'use strict';
  const nEl = document.getElementById('ns-n'), pEl = document.getElementById('ns-p'), hEl = document.getElementById('ns-h');
  const valResEl = document.getElementById('ns-res-val'), typResEl = document.getElementById('ns-res-type');

  function update() {
    const N = parseFloat(nEl.value), P_kw = parseFloat(pEl.value), H = parseFloat(hEl.value);
    if (isNaN(N) || isNaN(P_kw) || isNaN(H) || N <= 0 || P_kw <= 0 || H <= 0) return;

    const Ns = (N * Math.sqrt(P_kw)) / Math.pow(H, 1.25);
    valResEl.textContent = 'N_s = ' + Ns.toFixed(1) + ' (Metric kW units)';

    if (Ns < 35) {
      typResEl.textContent = 'Pelton Wheel (Single Jet Impulse Runner: High Head > 300m)';
      typResEl.style.color = '#2563eb';
    } else if (Ns < 70) {
      typResEl.textContent = 'Multi-Jet Pelton or Turgo Runner (High Head 150 - 400m)';
      typResEl.style.color = '#2563eb';
    } else if (Ns < 300) {
      typResEl.textContent = 'Francis Reaction Mixed-Flow Runner (Medium Head 40 - 250m)';
      typResEl.style.color = '#22543d';
    } else if (Ns < 500) {
      typResEl.textContent = 'High-Speed Francis or Deriaz Runner (Medium-Low Head 25 - 60m)';
      typResEl.style.color = '#22543d';
    } else {
      typResEl.textContent = 'Kaplan / Propeller Axial-Flow Runner (Low Head < 30m, High Flow)';
      typResEl.style.color = '#d97706';
    }
  }

  [nEl, pEl, hEl].forEach(el => el.addEventListener('input', update));
  update();
})();