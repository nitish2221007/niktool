(() => {
  'use strict';
  const r1El = document.getElementById('lm-r1'), r2El = document.getElementById('lm-r2'), vinEl = document.getElementById('lm-vin');
  const voutResEl = document.getElementById('lm-res-vout'), dropResEl = document.getElementById('lm-res-drop');

  const Vref = 1.25; // Internal reference voltage 1.25V

  function update() {
    const r1 = parseFloat(r1El.value), r2 = parseFloat(r2El.value), vin = parseFloat(vinEl.value);
    if (isNaN(r1) || isNaN(r2) || isNaN(vin) || r1 <= 0 || r2 < 0 || vin <= 0) return;

    // V_out = 1.25 * (1 + R2 / R1)
    const vout = Vref * (1 + (r2 / r1));
    const drop = vin - vout;

    voutResEl.textContent = vout.toFixed(2) + ' Volts DC';

    if (drop < 2.0) {
      dropResEl.textContent = drop.toFixed(2) + ' V (DROPOUT WARNING: Need V_in ≥ V_out + 2V)';
      dropResEl.style.color = '#c53030';
    } else {
      dropResEl.textContent = drop.toFixed(2) + ' V Dropout Headroom';
      dropResEl.style.color = '#22543d';
    }
  }

  [r1El, r2El, vinEl].forEach(el => el.addEventListener('input', update));
  update();
})();