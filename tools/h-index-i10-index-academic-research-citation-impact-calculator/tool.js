(() => {
  'use strict';
  const cEl = document.getElementById('hi-cites');
  const hResEl = document.getElementById('hi-res-h'), smResEl = document.getElementById('hi-res-sum');

  function update() {
    const raw = (cEl.value || '').split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n) && n >= 0);
    if (raw.length === 0) return;

    raw.sort((a, b) => b - a);

    let h = 0;
    for (let i = 0; i < raw.length; i++) {
      if (raw[i] >= i + 1) h = i + 1;
      else break;
    }

    const i10 = raw.filter(c => c >= 10).length;
    const totalCites = raw.reduce((a, b) => a + b, 0);
    const avgCites = totalCites / raw.length;

    hResEl.textContent = 'h-index = ' + h + ' | i10-index = ' + i10;
    smResEl.textContent = 'Total Citations = ' + totalCites.toLocaleString() + ' | Average = ' + avgCites.toFixed(2) + ' Citations/Paper (Total: ' + raw.length + ' Papers)';
  }

  cEl.addEventListener('input', update);
  update();
})();