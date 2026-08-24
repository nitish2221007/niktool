(() => {
  'use strict';
  const nEl = document.getElementById('law-n'), tEl = document.getElementById('law-t'), tauEl = document.getElementById('law-tau');
  const tripResEl = document.getElementById('law-res-trip'), stResEl = document.getElementById('law-res-stat');

  function update() {
    const n = parseFloat(nEl.value), T = parseFloat(tEl.value), tau = parseFloat(tauEl.value);
    if (isNaN(n) || isNaN(T) || isNaN(tau) || n <= 0 || T <= 0 || tau <= 0) return;

    const triple = n * T * tau;
    tripResEl.textContent = triple.toExponential(2) + ' keV·s / m³';

    if (triple >= 3.0e21) {
      stResEl.textContent = 'SELF-SUSTAINING IGNITION (n·T·τ ≥ 3×10²¹: Burns without external heating)';
      stResEl.style.color = '#22543d';
    } else if (triple >= 1.0e21) {
      stResEl.textContent = 'SCIENTIFIC BREAKEVEN Q > 1 (Net Power Production)';
      stResEl.style.color = '#2563eb';
    } else {
      stResEl.textContent = 'SUB-BREAKEVEN (n·T·τ < 10²¹: Heat losses exceed fusion alpha heating)';
      stResEl.style.color = '#d97706';
    }
  }

  [nEl, tEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();