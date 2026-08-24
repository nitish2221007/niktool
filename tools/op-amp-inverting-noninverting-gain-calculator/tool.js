(() => {
  'use strict';
  const rinEl = document.getElementById('oa-rin'), rfEl = document.getElementById('oa-rf'), vinEl = document.getElementById('oa-vin');
  const invEl = document.getElementById('oa-res-inv'), nonEl = document.getElementById('oa-res-noninv');

  function update() {
    const rin = parseFloat(rinEl.value), rf = parseFloat(rfEl.value), vin = parseFloat(vinEl.value);
    if (isNaN(rin) || isNaN(rf) || isNaN(vin) || rin <= 0 || rf < 0) return;

    // Inverting: Av = -Rf / Rin, Vout = Av * Vin
    const avInv = -rf / rin;
    const voutInv = avInv * vin;

    // Non-Inverting: Av = 1 + (Rf / Rin), Vout = Av * Vin
    const avNon = 1 + (rf / rin);
    const voutNon = avNon * vin;

    invEl.textContent = avInv.toFixed(1) + 'x (' + (voutInv >= 0 ? '+' : '') + voutInv.toFixed(2) + 'V)';
    nonEl.textContent = '+' + avNon.toFixed(1) + 'x (' + (voutNon >= 0 ? '+' : '') + voutNon.toFixed(2) + 'V)';
  }

  [rinEl, rfEl, vinEl].forEach(el => el.addEventListener('input', update));
  update();
})();