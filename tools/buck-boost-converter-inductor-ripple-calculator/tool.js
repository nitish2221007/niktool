(() => {
  'use strict';
  const vinEl = document.getElementById('bb-vin'), voutEl = document.getElementById('bb-vout');
  const fEl = document.getElementById('bb-freq'), iEl = document.getElementById('bb-iout');
  const dResEl = document.getElementById('bb-res-duty'), lResEl = document.getElementById('bb-res-lmin');

  function update() {
    const Vin = parseFloat(vinEl.value), Vout = Math.abs(parseFloat(voutEl.value));
    const fKhz = parseFloat(fEl.value), Iout = parseFloat(iEl.value);

    if (isNaN(Vin) || isNaN(Vout) || isNaN(fKhz) || isNaN(Iout) || Vin <= 0 || Vout <= 0 || fKhz <= 0 || Iout <= 0) return;

    const fHz = fKhz * 1000;
    const D = Vout / (Vin + Vout);
    const D_pct = D * 100;

    const IL_avg = Iout / (1 - D);
    const targetDeltaIL = 0.30 * IL_avg;
    const targetL_H = (Vin * D) / (fHz * targetDeltaIL);
    const targetL_uH = targetL_H * 1e6;

    const L_crit_H = (Math.pow(1 - D, 2) * Vout) / (2 * Iout * fHz);
    const L_crit_uH = L_crit_H * 1e6;

    dResEl.textContent = 'D = ' + D.toFixed(3) + ' (' + D_pct.toFixed(1) + '% Duty Cycle)';
    lResEl.textContent = targetL_uH.toFixed(1) + ' μH Inductor (30% Ripple, CCM Boundary L_crit: ' + L_crit_uH.toFixed(1) + ' μH)';
  }

  [vinEl, voutEl, fEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();