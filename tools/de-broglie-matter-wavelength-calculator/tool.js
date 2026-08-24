(() => {
  'use strict';
  const pEl = document.getElementById('db-part'), vEl = document.getElementById('db-v');
  const lResEl = document.getElementById('db-res-lambda'), pResEl = document.getElementById('db-res-p');

  const hPlanck = 6.62607015e-34; // J*s

  function update() {
    const mKg = parseFloat(pEl.value), vMs = parseFloat(vEl.value);
    if (isNaN(mKg) || isNaN(vMs) || mKg <= 0 || vMs <= 0) return;

    // p = m * v
    const p = mKg * vMs;
    // lambda = h / p
    const lambda = hPlanck / p;
    const lambdaNm = lambda * 1e9;
    const lambdaAng = lambda * 1e10;

    lResEl.textContent = lambda >= 1e-6 ? lambda.toExponential(2) + ' meters' : (lambdaNm >= 1.0 ? lambdaNm.toFixed(3) + ' nm' : lambdaAng.toFixed(2) + ' Å (' + lambda.toExponential(2) + ' m)');
    pResEl.textContent = p.toExponential(2) + ' kg·m/s';
  }

  pEl.addEventListener('change', update);
  vEl.addEventListener('input', update);
  update();
})();