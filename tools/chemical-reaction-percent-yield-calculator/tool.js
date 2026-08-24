(() => {
  'use strict';
  const actEl = document.getElementById('yld-act'), theoEl = document.getElementById('yld-theo');
  const pctEl = document.getElementById('yld-res-pct'), lossEl = document.getElementById('yld-res-loss');

  function update() {
    const act = parseFloat(actEl.value), theo = parseFloat(theoEl.value);
    if (isNaN(act) || isNaN(theo) || act < 0 || theo <= 0) return;

    const pct = (act / theo) * 100;
    const loss = theo - act;

    pctEl.textContent = pct.toFixed(2) + '%';
    lossEl.textContent = (loss >= 0 ? loss.toFixed(2) + ' g (' + (100 - pct).toFixed(2) + '%)' : 'Yield exceeds 100% (Check purity/dryness)');
  }

  actEl.addEventListener('input', update);
  theoEl.addEventListener('input', update);
  update();
})();