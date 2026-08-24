(() => {
  'use strict';
  const vinEl = document.getElementById('bst-vin'), voutEl = document.getElementById('bst-vout');
  const ioutEl = document.getElementById('bst-iout'), fsEl = document.getElementById('bst-fs');
  const lResEl = document.getElementById('bst-res-l'), swResEl = document.getElementById('bst-res-sw');

  function update() {
    const Vin = parseFloat(vinEl.value), Vout = parseFloat(voutEl.value);
    const Iout = parseFloat(ioutEl.value), fsKhz = parseFloat(fsEl.value);

    if (isNaN(Vin) || isNaN(Vout) || isNaN(Iout) || isNaN(fsKhz) || Vout <= Vin || Vin <= 0 || Iout <= 0 || fsKhz <= 0) return;

    const fsHz = fsKhz * 1000;
    // Boost duty cycle D = 1 - (Vin / Vout)
    const D = 1.0 - (Vin / Vout);

    // Average input inductor current I_in = Iout / (1 - D)
    const I_in_avg = Iout / (1 - D);

    // 30% current ripple on input inductor
    const deltaIL = 0.30 * I_in_avg;

    // Inductance L = (Vin * D) / (deltaIL * fsHz)  [Henries]
    const L_h = (Vin * D) / (deltaIL * fsHz);
    const L_uh = L_h * 1e6;

    // Output capacitance for 1% ripple: C = (Iout * D) / (fs * deltaV)
    const deltaV = 0.01 * Vout;
    const C_uf = ((Iout * D) / (fsHz * deltaV)) * 1e6;

    const peakSwitchCurrent = I_in_avg + (deltaIL / 2);

    lResEl.textContent = 'L = ' + L_uh.toFixed(1) + ' μH (Duty D = ' + (D * 100).toFixed(1) + '%)';
    swResEl.textContent = 'Avg Input Current: ' + I_in_avg.toFixed(2) + ' A | Peak Switch I_pk: ' + peakSwitchCurrent.toFixed(2) + ' A (C_out ≥ ' + C_uf.toFixed(1) + ' μF @ ΔV ≤ ' + (deltaV*1000).toFixed(0) + 'mV)';
  }

  [vinEl, voutEl, ioutEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();