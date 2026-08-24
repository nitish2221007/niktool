(() => {
  'use strict';
  const assetEls = document.querySelectorAll('.nw-asset');
  const liabEls = document.querySelectorAll('.nw-liab');
  const netEl = document.getElementById('nw-res-net'), aEl = document.getElementById('nw-res-tot-assets'), lEl = document.getElementById('nw-res-tot-liab');

  function update() {
    let totAssets = 0, totLiab = 0;
    assetEls.forEach(el => totAssets += (parseFloat(el.value) || 0));
    liabEls.forEach(el => totLiab += (parseFloat(el.value) || 0));

    const netWorth = totAssets - totLiab;

    netEl.textContent = (netWorth >= 0 ? '$' : '-$') + Math.abs(netWorth).toLocaleString();
    netEl.style.color = netWorth >= 0 ? '#22543d' : '#c53030';
    aEl.textContent = '$' + Math.round(totAssets).toLocaleString();
    lEl.textContent = '$' + Math.round(totLiab).toLocaleString();
  }

  [...assetEls, ...liabEls].forEach(el => el.addEventListener('input', update));
  update();
})();