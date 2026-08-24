(() => {
  'use strict';
  const vinEl = document.getElementById('bck-vin'), voutEl = document.getElementById('bck-vout');
  const ioutEl = document.getElementById('bck-iout'), fsEl = document.getElementById('bck-fs');
  const lResEl = document.getElementById('bck-res-l'), cResEl = document.getElementById('bck-res-c');

  function update() {
    const Vin = parseFloat(vinEl.value), Vout = parseFloat(voutEl.value);
    const Iout = parseFloat(ioutEl.value), fsKhz = parseFloat(fsEl.value);

    if (isNaN(Vin) || isNaN(Vout) || isNaN(Iout) || isNaN(fsKhz) || Vin <= Vout || Vout <= 0 || Iout <= 0 || fsKhz <= 0) return;

    const fsHz = fsKhz * 1000;
    // Ideal duty cycle D = Vout / Vin
    const D = Vout / Vin;

    // Standard inductor current ripple ratio r = 30% of Iout
    const deltaIL = 0.30 * Iout;

    // Inductance L = ( Vout * (1 - D) ) / ( deltaIL * fs )  [Henries]
    const L_h = (Vout * (1 - D)) / (deltaIL * fsHz);
    const L_uh = L_h * 1e6;

    // Target output voltage ripple deltaV = 1% of Vout (or 50mV)
    const deltaV = Math.max(0.02, 0.01 * Vout);
    // Output capacitance C = deltaIL / ( 8 * fs * deltaV )  [Farads]
    const C_f = deltaIL / (8 * fsHz * deltaV);
    const C_uf = C_f * 1e6;

    const peakCurrent = Iout + (deltaIL / 2);

    lResEl.textContent = 'L = ' + L_uh.toFixed(1) + ' μH (Duty D = ' + (D * 100).toFixed(1) + '%)';
    cResEl.textContent = 'C_out ≥ ' + C_uf.toFixed(1) + ' μF (ΔV_out ≤ ' + (deltaV*1000).toFixed(0) + ' mV | Peak I_L = ' + peakCurrent.toFixed(2) + ' A, Ripple ΔI_L = ' + deltaIL.toFixed(2) + ' A)';
  }

  [vinEl, voutEl, ioutEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();