(() => {
  'use strict';
  const fEl = document.getElementById('dip-freq'), vfEl = document.getElementById('dip-vf');
  const lResEl = document.getElementById('dip-res-len'), lgResEl = document.getElementById('dip-res-legs');

  const c = 2.99792458e8;

  function update() {
    const fMhz = parseFloat(fEl.value), vf = parseFloat(vfEl.value);
    if (isNaN(fMhz) || isNaN(vf) || fMhz <= 0 || vf <= 0 || vf > 1.0) return;

    const fHz = fMhz * 1e6;
    const lambda = c / fHz;

    const totalLenM = 0.5 * lambda * vf;
    const totalLenFt = totalLenM * 3.28084;
    const legLenM = totalLenM / 2;
    const legLenFt = totalLenFt / 2;

    lResEl.textContent = totalLenM.toFixed(2) + ' m Total (' + totalLenFt.toFixed(1) + ' ft Tip-to-Tip)';
    lgResEl.textContent = 'Each Quarter-Wave Leg: ' + legLenM.toFixed(2) + ' m (' + legLenFt.toFixed(1) + ' ft) | Feed Z: 73.1 Ω (2.15 dBi / 0 dBd)';
  }

  fEl.addEventListener('input', update);
  vfEl.addEventListener('input', update);
  update();
})();