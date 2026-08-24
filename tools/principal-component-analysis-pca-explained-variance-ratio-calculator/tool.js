(() => {
  'use strict';
  const egEl = document.getElementById('pc-eigen');
  const evResEl = document.getElementById('pc-res-evr'), pcResEl = document.getElementById('pc-res-pcs');

  function update() {
    const lambdas = egEl.value.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n) && n >= 0);
    if (lambdas.length === 0) return;

    const totalVar = lambdas.reduce((a, b) => a + b, 0);
    if (totalVar === 0) return;

    const evrs = lambdas.map(l => l / totalVar);

    // Cumulative 2 PCs:
    const cum2 = (evrs[0] + (evrs.length > 1 ? evrs[1] : 0)) * 100.0;

    const desc = evrs.map((e, idx) => 'PC' + (idx+1) + ': ' + (e*100).toFixed(1) + '% (λ=' + lambdas[idx] + ')').join(' | ');

    evResEl.textContent = 'Top 2 PCs Retain ' + cum2.toFixed(1) + '% Total Variance';
    pcResEl.textContent = desc;
  }

  egEl.addEventListener('input', update);
  update();
})();