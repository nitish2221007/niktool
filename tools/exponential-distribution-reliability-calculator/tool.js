(() => {
  'use strict';
  const mEl = document.getElementById('exp-mtbf'), tEl = document.getElementById('exp-t');
  const rResEl = document.getElementById('exp-res-rel'), fResEl = document.getElementById('exp-res-fail');

  function update() {
    const mtbf = parseFloat(mEl.value), t = parseFloat(tEl.value);
    if (isNaN(mtbf) || isNaN(t) || mtbf <= 0 || t < 0) return;

    // Failure rate lambda = 1 / MTBF
    const lambda = 1 / mtbf;
    // R(t) = exp(-lambda * t) = exp(-t / mtbf)
    const R = Math.exp(-t / mtbf);
    const F = 1 - R;

    rResEl.textContent = (R * 100).toFixed(2) + '% Survival Probability';
    fResEl.textContent = (F * 100).toFixed(2) + '% Failure Risk (λ = ' + (lambda * 1e6).toFixed(2) + ' FIT)';
  }

  mEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();