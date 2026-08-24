(() => {
  'use strict';
  const vinEl = document.getElementById('vd-vin'), r1El = document.getElementById('vd-r1'), r2El = document.getElementById('vd-r2');
  const voutEl = document.getElementById('vd-res-vout'), curEl = document.getElementById('vd-res-current'), ratEl = document.getElementById('vd-res-ratio');

  function update() {
    const vin = parseFloat(vinEl.value), r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value);
    if (isNaN(vin) || isNaN(r1) || isNaN(r2) || r1 < 0 || r2 < 0 || (r1 + r2) <= 0) return;

    // Vout = Vin * (R2 / (R1 + R2))
    const vout = vin * (r2 / (r1 + r2));
    const currentA = vin / (r1 + r2);
    const currentMa = currentA * 1000;
    const ratio = r2 / (r1 + r2);

    voutEl.textContent = vout.toFixed(2) + ' V';
    curEl.textContent = currentMa >= 1 ? currentMa.toFixed(2) + ' mA' : (currentMa * 1000).toFixed(1) + ' μA';
    ratEl.textContent = ratio.toFixed(3);
  }

  [vinEl, r1El, r2El].forEach(el => el.addEventListener('input', update));
  update();
})();