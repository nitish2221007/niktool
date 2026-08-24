(() => {
  'use strict';
  const aEl = document.getElementById('pp-area'), dEl = document.getElementById('pp-d'), epsEl = document.getElementById('pp-diel');
  const cResEl = document.getElementById('pp-res-c'), gResEl = document.getElementById('pp-res-gain');

  const eps0 = 8.8541878128e-12; // F / m

  function update() {
    const aCm2 = parseFloat(aEl.value), dMm = parseFloat(dEl.value), epsR = parseFloat(epsEl.value);
    if (isNaN(aCm2) || isNaN(dMm) || isNaN(epsR) || aCm2 <= 0 || dMm <= 0 || epsR < 1) return;

    const aM2 = aCm2 * 1e-4;
    const dM = dMm * 1e-3;

    // C = (eps0 * epsR * A) / d
    const C = (eps0 * epsR * aM2) / dM;
    const cPf = C * 1e12;
    const cNf = C * 1e9;

    cResEl.textContent = cPf >= 1000 ? cNf.toFixed(2) + ' nF' : cPf.toFixed(2) + ' pF';
    gResEl.textContent = epsR.toFixed(1) + 'x Relative Permittivity (ε_r)';
  }

  [aEl, dEl, epsEl].forEach(el => el.addEventListener('input', update));
  update();
})();