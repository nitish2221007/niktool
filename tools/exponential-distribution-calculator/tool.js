(() => {
  'use strict';
  const mttfEl = document.getElementById('exp-mttf'), tEl = document.getElementById('exp-t');
  const survEl = document.getElementById('exp-res-surv'), failEl = document.getElementById('exp-res-fail');

  function update() {
    const mttf = parseFloat(mttfEl.value), t = parseFloat(tEl.value);
    if (isNaN(mttf) || isNaN(t) || mttf <= 0 || t < 0) return;

    // lambda = 1 / MTTF
    const lambda = 1 / mttf;
    // R(t) = e^(-lambda * t)
    const rT = Math.exp(-lambda * t);
    const fT = 1 - rT;

    survEl.textContent = (rT * 100).toFixed(2) + '% Survival';
    failEl.textContent = (fT * 100).toFixed(2) + '% Failed';
  }

  mttfEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();