(() => {
  'use strict';
  const fEl = document.getElementById('ym-force'), aEl = document.getElementById('ym-area');
  const l0El = document.getElementById('ym-l0'), dlEl = document.getElementById('ym-dl');
  const eEl = document.getElementById('ym-res-e'), sEl = document.getElementById('ym-res-stress'), stEl = document.getElementById('ym-res-strain');

  function update() {
    const fKn = parseFloat(fEl.value), aMm2 = parseFloat(aEl.value);
    const l0M = parseFloat(l0El.value), dlMm = parseFloat(dlEl.value);

    if (isNaN(fKn) || isNaN(aMm2) || isNaN(l0M) || isNaN(dlMm) || fKn <= 0 || aMm2 <= 0 || l0M <= 0 || dlMm <= 0) return;

    const fN = fKn * 1000;
    const aM2 = aMm2 * 1e-6;
    const dlM = dlMm * 1e-3;

    // Stress sigma = F / A (Pa)
    const stressPa = fN / aM2;
    const stressMpa = stressPa / 1e6;

    // Strain epsilon = dL / L0
    const strain = dlM / l0M;

    // Young's modulus E = sigma / epsilon
    const ePa = stressPa / strain;
    const eGpa = ePa / 1e9;

    eEl.textContent = eGpa.toFixed(1) + ' GPa';
    sEl.textContent = stressMpa.toFixed(1) + ' MPa';
    stEl.textContent = (strain * 100).toFixed(3) + '% (' + strain.toFixed(4) + ')';
  }

  [fEl, aEl, l0El, dlEl].forEach(el => el.addEventListener('input', update));
  update();
})();