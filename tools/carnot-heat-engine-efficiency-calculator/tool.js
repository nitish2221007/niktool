(() => {
  'use strict';
  const thEl = document.getElementById('car-thot'), tcEl = document.getElementById('car-tcold');
  const effEl = document.getElementById('car-res-eff'), lossEl = document.getElementById('car-res-loss');

  function update() {
    const thC = parseFloat(thEl.value), tcC = parseFloat(tcEl.value);
    if (isNaN(thC) || isNaN(tcC)) return;

    const thK = thC + 273.15;
    const tcK = tcC + 273.15;

    if (thK <= tcK || tcK <= 0) {
      effEl.textContent = '-'; lossEl.textContent = 'Hot reservoir must exceed cold exhaust'; return;
    }

    // eta = 1 - (Tc / Th)
    const eff = 1 - (tcK / thK);
    const effPct = eff * 100;
    const lossPct = 100 - effPct;

    effEl.textContent = effPct.toFixed(2) + '%';
    lossEl.textContent = lossPct.toFixed(2) + '%';
  }

  thEl.addEventListener('input', update);
  tcEl.addEventListener('input', update);
  update();
})();