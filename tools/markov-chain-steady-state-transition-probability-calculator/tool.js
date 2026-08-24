(() => {
  'use strict';
  const aEl = document.getElementById('mc-alpha'), bEl = document.getElementById('mc-beta');
  const piResEl = document.getElementById('mc-res-pi'), rcResEl = document.getElementById('mc-res-rec');

  function update() {
    const alpha = parseFloat(aEl.value), beta = parseFloat(bEl.value);
    if (isNaN(alpha) || isNaN(beta) || alpha <= 0 || beta <= 0 || alpha >= 1 || beta >= 1) return;

    // Steady state stationary distribution:
    // pi1 = beta / (alpha + beta)
    // pi2 = alpha / (alpha + beta)
    const pi1 = beta / (alpha + beta);
    const pi2 = alpha / (alpha + beta);

    const rec1 = 1.0 / pi1;
    const rec2 = 1.0 / pi2;

    piResEl.textContent = 'π = [' + (pi1 * 100).toFixed(1) + '% State 1, ' + (pi2 * 100).toFixed(1) + '% State 2]';
    rcResEl.textContent = 'Return Times: State 1 = ' + rec1.toFixed(2) + ' Steps | State 2 = ' + rec2.toFixed(2) + ' Steps (α = ' + alpha + ', β = ' + beta + ')';
  }

  aEl.addEventListener('input', update);
  bEl.addEventListener('input', update);
  update();
})();