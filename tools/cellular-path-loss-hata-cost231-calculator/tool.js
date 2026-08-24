(() => {
  'use strict';
  const fEl = document.getElementById('ht-f'), hbEl = document.getElementById('ht-hb');
  const hmEl = document.getElementById('ht-hm'), dEl = document.getElementById('ht-d'), envEl = document.getElementById('ht-env');
  const plResEl = document.getElementById('ht-res-pl'), subResEl = document.getElementById('ht-res-sub');

  function update() {
    const f = parseFloat(fEl.value), hb = parseFloat(hbEl.value);
    const hm = parseFloat(hmEl.value), d = parseFloat(dEl.value);
    const env = envEl.value;

    if (isNaN(f) || isNaN(hb) || isNaN(hm) || isNaN(d) || f < 150 || f > 2000 || hb < 10 || hm <= 0 || d <= 0) return;

    const a_hm = ((1.1 * Math.log10(f) - 0.7) * hm) - ((1.56 * Math.log10(f)) - 0.8);
    const pl_urban = 69.55 + (26.16 * Math.log10(f)) - (13.82 * Math.log10(hb)) - a_hm + ((44.9 - (6.55 * Math.log10(hb))) * Math.log10(d));
    const pl_suburban = pl_urban - (2 * Math.pow(Math.log10(f / 28), 2)) - 5.4;
    const pl_rural = pl_urban - (4.78 * Math.pow(Math.log10(f), 2)) + (18.33 * Math.log10(f)) - 40.94;

    let selectedPL = pl_urban;
    if (env === 'suburban') selectedPL = pl_suburban;
    else if (env === 'rural') selectedPL = pl_rural;

    plResEl.textContent = 'PL = ' + selectedPL.toFixed(1) + ' dB Path Loss';
    subResEl.textContent = 'Urban: ' + pl_urban.toFixed(1) + ' dB | Suburban: ' + pl_suburban.toFixed(1) + ' dB | Rural: ' + pl_rural.toFixed(1) + ' dB';
  }

  [fEl, hbEl, hmEl, dEl].forEach(el => el.addEventListener('input', update));
  envEl.addEventListener('change', update);
  update();
})();