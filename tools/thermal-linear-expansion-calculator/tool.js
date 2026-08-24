(() => {
  'use strict';
  const matEl = document.getElementById('tle-mat'), l0El = document.getElementById('tle-l0'), dtEl = document.getElementById('tle-dt');
  const dEl = document.getElementById('tle-res-delta'), fEl = document.getElementById('tle-res-final');

  function update() {
    const alpha = parseFloat(matEl.value);
    const l0 = parseFloat(l0El.value);
    const dt = parseFloat(dtEl.value);
    if (isNaN(alpha) || isNaN(l0) || isNaN(dt) || l0 <= 0 || dt === 0) return;

    // Delta L = alpha * L0 * DeltaT
    const deltaLM = alpha * l0 * dt;
    const deltaLMm = deltaLM * 1000;
    const finalLM = l0 + deltaLM;

    dEl.textContent = (deltaLMm >= 0 ? '+' : '') + deltaLMm.toFixed(1) + ' mm (' + (deltaLMm / 10).toFixed(2) + ' cm)';
    fEl.textContent = finalLM.toFixed(4) + ' meters';
  }

  matEl.addEventListener('change', update);
  l0El.addEventListener('input', update);
  dtEl.addEventListener('input', update);
  update();
})();