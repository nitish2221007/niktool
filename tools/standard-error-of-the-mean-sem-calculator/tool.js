(() => {
  'use strict';
  const sEl = document.getElementById('sem-s'), nEl = document.getElementById('sem-n');
  const semResEl = document.getElementById('sem-res-val'), ciEl = document.getElementById('sem-res-ci95');

  function update() {
    const s = parseFloat(sEl.value), n = parseInt(nEl.value, 10);
    if (isNaN(s) || isNaN(n) || s <= 0 || n < 2) return;

    // SEM = s / sqrt(n)
    const sem = s / Math.sqrt(n);
    const ci95 = 1.96 * sem;

    semResEl.textContent = sem.toFixed(3);
    ciEl.textContent = '± ' + ci95.toFixed(3) + ' (95% CI Margin)';
  }

  sEl.addEventListener('input', update);
  nEl.addEventListener('input', update);
  update();
})();