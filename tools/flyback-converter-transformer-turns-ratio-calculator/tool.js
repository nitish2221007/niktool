(() => {
  'use strict';
  const vinEl = document.getElementById('fly-vin'), voutEl = document.getElementById('fly-vout');
  const poutEl = document.getElementById('fly-pout'), fsEl = document.getElementById('fly-fs');
  const nResEl = document.getElementById('fly-res-npns'), lmResEl = document.getElementById('fly-res-lm');

  const D_max = 0.45; // standard maximum duty cycle limit
  const V_diode = 0.7; // output rectifier forward voltage drop
  const efficiency = 0.85; // SMPS efficiency

  function update() {
    const VinMin = parseFloat(vinEl.value), Vout = parseFloat(voutEl.value);
    const Pout = parseFloat(poutEl.value), fsKhz = parseFloat(fsEl.value);

    if (isNaN(VinMin) || isNaN(Vout) || isNaN(Pout) || isNaN(fsKhz) || VinMin <= 0 || Vout <= 0 || Pout <= 0 || fsKhz <= 0) return;

    const fsHz = fsKhz * 1000;
    const Pin = Pout / efficiency;

    // Flyback turns ratio n = Np / Ns = (VinMin * D_max) / ( (Vout + V_diode) * (1 - D_max) )
    const n_turns = (VinMin * D_max) / ((Vout + V_diode) * (1.0 - D_max));

    // For DCM / boundary conduction mode: L_m = (VinMin * D_max)^2 / (2 * Pin * fsHz)  [Henries]
    const Lm_h = Math.pow(VinMin * D_max, 2) / (2 * Pin * fsHz);
    const Lm_uh = Lm_h * 1e6;

    // Peak primary switch current I_pk = (VinMin * D_max) / (Lm_h * fsHz * ... ) approx = 2*Pin / (VinMin * D_max)
    const I_pk_primary = (2 * Pin) / (VinMin * D_max);

    // Primary reflected voltage V_reflected = (Vout + V_diode) * n_turns
    const V_reflected = (Vout + V_diode) * n_turns;

    nResEl.textContent = 'N_p / N_s = ' + n_turns.toFixed(2) + ' : 1 Turns Ratio';
    lmResEl.textContent = 'L_m = ' + Math.round(Lm_uh).toLocaleString() + ' μH | Peak Switch Current: ' + I_pk_primary.toFixed(2) + ' A (Reflected V_OR = ' + Math.round(V_reflected) + ' V)';
  }

  [vinEl, voutEl, poutEl, fsEl].forEach(el => el.addEventListener('input', update));
  update();
})();