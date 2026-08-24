(() => {
  'use strict';
  const muEl = document.getElementById('str-mu'), nEl = document.getElementById('str-n'), pEl = document.getElementById('str-p');
  const hResEl = document.getElementById('str-res-h'), regResEl = document.getElementById('str-res-reg');

  function update() {
    const mu = parseFloat(muEl.value), N = parseFloat(nEl.value), P = parseFloat(pEl.value);
    if (isNaN(mu) || isNaN(N) || isNaN(P) || mu <= 0 || N <= 0 || P <= 0) return;

    // Hersey number H = (mu * N) / P where mu in cP (mPa*s), N in RPM, P in MPa
    const H = (mu * N) / P;

    let regime = '';
    let f_coeff = 0.0;
    let color = '#22543d';

    if (H < 100) {
      regime = 'BOUNDARY LUBRICATION (f ≈ 0.10 - 0.15: Direct metal-to-metal asperity contact, high wear!)';
      f_coeff = 0.12;
      color = '#c53030';
    } else if (H < 1500) {
      regime = 'MIXED / ELASTOHYDRODYNAMIC (f ≈ 0.02 - 0.05: Partial fluid support, moderate wear risk)';
      f_coeff = 0.035;
      color = '#d97706';
    } else {
      regime = 'HYDRODYNAMIC FULL-FILM (f ≈ 0.002 - 0.008: Complete fluid wedge separation, zero wear)';
      f_coeff = 0.0015 * Math.pow(H / 1000, 0.5);
      color = '#22543d';
    }

    hResEl.textContent = 'Hersey H = ' + Math.round(H).toLocaleString() + ' (f ≈ ' + f_coeff.toFixed(4) + ')';
    hResEl.style.color = color;
    regResEl.textContent = regime;
    regResEl.style.color = color;
  }

  [muEl, nEl, pEl].forEach(el => el.addEventListener('input', update));
  update();
})();