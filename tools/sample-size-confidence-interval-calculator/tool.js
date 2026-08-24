(() => {
  'use strict';
  const confEl = document.getElementById('ss-conf'), moeEl = document.getElementById('ss-moe');
  const nResEl = document.getElementById('ss-res-n');

  function update() {
    const z = parseFloat(confEl.value);
    const moePct = parseFloat(moeEl.value);
    if (isNaN(z) || isNaN(moePct) || moePct <= 0 || moePct > 50) return;

    const E = moePct / 100;
    const p = 0.5; // Maximum variability assumption

    // n = (Z^2 * p * (1 - p)) / E^2
    const n = (Math.pow(z, 2) * p * (1 - p)) / Math.pow(E, 2);
    const nFinal = Math.ceil(n);

    nResEl.textContent = nFinal.toLocaleString() + ' Respondents';
  }

  confEl.addEventListener('change', update);
  moeEl.addEventListener('input', update);
  update();
})();