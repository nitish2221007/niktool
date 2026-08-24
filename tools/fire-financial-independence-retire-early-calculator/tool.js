(() => {
  'use strict';
  const expEl = document.getElementById('fire-expenses'), swrEl = document.getElementById('fire-swr'), nwEl = document.getElementById('fire-networth');
  const tgtEl = document.getElementById('fire-res-target'), progEl = document.getElementById('fire-res-progress'), remEl = document.getElementById('fire-res-rem');

  function update() {
    const exp = parseFloat(expEl.value);
    const swr = parseFloat(swrEl.value) / 100;
    const nw = parseFloat(nwEl.value) || 0;

    if (isNaN(exp) || isNaN(swr) || exp <= 0 || swr <= 0) return;

    // FIRE Number = Annual Expenses / SWR
    const fireTarget = exp / swr;
    const gap = Math.max(0, fireTarget - nw);
    const progressPct = Math.min(100, (nw / fireTarget) * 100);

    tgtEl.textContent = '$' + Math.round(fireTarget).toLocaleString();
    progEl.textContent = progressPct.toFixed(1) + '% Complete';
    remEl.textContent = '$' + Math.round(gap).toLocaleString();
  }

  [expEl, swrEl, nwEl].forEach(el => el.addEventListener('input', update));
  update();
})();