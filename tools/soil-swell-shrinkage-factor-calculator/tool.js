(() => {
  'use strict';
  const sEl = document.getElementById('sw-soil'), bEl = document.getElementById('sw-bcy');
  const lResEl = document.getElementById('sw-res-lcy'), cResEl = document.getElementById('sw-res-ccy');

  function update() {
    const [swStr, shStr] = sEl.value.split(',');
    const swellPct = parseFloat(swStr), shrinkPct = parseFloat(shStr);
    const bcy = parseFloat(bEl.value);

    if (isNaN(bcy) || bcy <= 0) return;

    // LCY = BCY * (1 + swell / 100)
    const lcy = bcy * (1 + (swellPct / 100));
    // CCY = BCY * (1 - shrink / 100)
    const ccy = bcy * (1 - (shrinkPct / 100));

    lResEl.textContent = Math.round(lcy).toLocaleString() + ' LCY (Loose Haul)';
    cResEl.textContent = Math.round(ccy).toLocaleString() + ' CCY (Finished Embankment Fill)';
  }

  sEl.addEventListener('change', update);
  bEl.addEventListener('input', update);
  update();
})();