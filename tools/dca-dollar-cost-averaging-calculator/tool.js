(() => {
  'use strict';
  const container = document.getElementById('dca-rows-container');
  const avgEl = document.getElementById('dca-res-avg'), invEl = document.getElementById('dca-res-tot-invest'), shEl = document.getElementById('dca-res-tot-shares');

  function update() {
    const sEls = container.querySelectorAll('.dca-shares');
    const pEls = container.querySelectorAll('.dca-price');

    let totalShares = 0, totalInvested = 0;
    for (let i = 0; i < sEls.length; i++) {
      const s = parseFloat(sEls[i].value) || 0;
      const p = parseFloat(pEls[i].value) || 0;
      totalShares += s;
      totalInvested += (s * p);
    }

    if (totalShares <= 0) return;

    const avgPrice = totalInvested / totalShares;
    avgEl.textContent = '$' + avgPrice.toFixed(2) + ' / share';
    invEl.textContent = '$' + Math.round(totalInvested).toLocaleString();
    shEl.textContent = totalShares.toLocaleString() + ' Shares';
  }

  container.addEventListener('input', update);
  update();
})();