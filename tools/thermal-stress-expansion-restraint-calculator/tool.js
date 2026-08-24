(() => {
  'use strict';
  const eEl = document.getElementById('ts-e'), aEl = document.getElementById('ts-alpha');
  const dtEl = document.getElementById('ts-dt'), arEl = document.getElementById('ts-area');
  const sResEl = document.getElementById('ts-str-res-stress'), fResEl = document.getElementById('ts-str-res-force');

  function update() {
    const eGpa = parseFloat(eEl.value), alphaU = parseFloat(aEl.value);
    const dtC = parseFloat(dtEl.value), aCm2 = parseFloat(arEl.value);

    if (isNaN(eGpa) || isNaN(alphaU) || isNaN(dtC) || isNaN(aCm2) || eGpa <= 0 || alphaU <= 0 || dtC === 0 || aCm2 <= 0) return;

    const ePa = eGpa * 1e9;
    const alpha = alphaU * 1e-6;
    const aM2 = aCm2 * 1e-4;

    // sigma = E * alpha * DeltaT (Pa)
    const stressPa = ePa * alpha * Math.abs(dtC);
    const stressMpa = stressPa / 1e6;

    // F = sigma * A (N)
    const forceN = stressPa * aM2;
    const forceKn = forceN / 1000;
    const forceTons = forceKn / 9.80665;

    sResEl.textContent = stressMpa.toFixed(1) + ' MPa (' + (dtC > 0 ? 'Compressive' : 'Tensile') + ')';
    fResEl.textContent = forceKn.toFixed(1) + ' kN (' + forceTons.toFixed(1) + ' metric tons)';
  }

  [eEl, aEl, dtEl, arEl].forEach(el => el.addEventListener('input', update));
  update();
})();