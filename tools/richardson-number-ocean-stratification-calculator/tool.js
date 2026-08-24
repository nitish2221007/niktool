(() => {
  'use strict';
  const nEl = document.getElementById('ri-n'), sEl = document.getElementById('ri-shear');
  const vResEl = document.getElementById('ri-res-val'), fResEl = document.getElementById('ri-res-flow');

  function update() {
    const N = parseFloat(nEl.value), shear = parseFloat(sEl.value);
    if (isNaN(N) || isNaN(shear) || N <= 0 || shear <= 0) return;

    const Ri = Math.pow(N, 2) / Math.pow(shear, 2);
    vResEl.textContent = 'Ri = ' + Ri.toFixed(3);

    if (Ri < 0.25) {
      fResEl.textContent = 'DYNAMICALLY UNSTABLE (Ri < 0.25: Shear overcomes buoyancy, Kelvin-Helmholtz mixing)';
      fResEl.style.color = '#c53030';
    } else if (Ri < 1.0) {
      fResEl.textContent = 'MARGINALLY STABLE (0.25 ≤ Ri < 1.0: Intermittent shear wave breaking)';
      fResEl.style.color = '#d97706';
    } else {
      fResEl.textContent = 'STRONGLY STRATIFIED STABLE (Ri ≥ 1.0: Stable pycnocline, turbulent mixing suppressed)';
      fResEl.style.color = '#22543d';
    }
  }

  nEl.addEventListener('input', update);
  sEl.addEventListener('input', update);
  update();
})();