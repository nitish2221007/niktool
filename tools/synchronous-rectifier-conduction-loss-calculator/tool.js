(() => {
  'use strict';
  const iEl = document.getElementById('sr-i'), rdsEl = document.getElementById('sr-rds'), vfEl = document.getElementById('sr-vf');
  const pResEl = document.getElementById('sr-res-ploss'), savResEl = document.getElementById('sr-res-sav');

  function update() {
    const I = parseFloat(iEl.value), rdsMohm = parseFloat(rdsEl.value), Vf = parseFloat(vfEl.value);
    if (isNaN(I) || isNaN(rdsMohm) || isNaN(Vf) || I <= 0 || rdsMohm <= 0 || Vf <= 0) return;

    const rdsOhms = rdsMohm * 1e-3;
    const pMosfet = Math.pow(I, 2) * rdsOhms;
    const pDiode = I * Vf;
    const pSaved = pDiode - pMosfet;
    const pctSaved = (pSaved / pDiode) * 100;

    pResEl.textContent = pMosfet.toFixed(2) + ' W (MOSFET Voltage Drop: ' + (I * rdsMohm).toFixed(1) + ' mV)';
    savResEl.textContent = pSaved.toFixed(2) + ' W Heat Saved (' + pctSaved.toFixed(1) + '% Reduction vs ' + pDiode.toFixed(1) + ' W Diode)';
  }

  [iEl, rdsEl, vfEl].forEach(el => el.addEventListener('input', update));
  update();
})();