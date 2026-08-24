(() => {
  'use strict';
  const pEl = document.getElementById('fly-pwr'), viEl = document.getElementById('fly-vin');
  const voEl = document.getElementById('fly-vout'), fEl = document.getElementById('fly-freq');
  const lpResEl = document.getElementById('fly-res-lp'), ratResEl = document.getElementById('fly-res-ratio');

  const eff = 0.88;
  const D_max = 0.45;

  function update() {
    const Pout = parseFloat(pEl.value), VinMin = parseFloat(viEl.value);
    const Vout = parseFloat(voEl.value), fKhz = parseFloat(fEl.value);

    if (isNaN(Pout) || isNaN(VinMin) || isNaN(Vout) || isNaN(fKhz) || Pout <= 0 || VinMin <= 0 || Vout <= 0 || fKhz <= 0) return;

    const Pin = Pout / eff;
    const fHz = fKhz * 1000;
    const LpH = (Math.pow(VinMin * D_max, 2)) / (2 * Pin * fHz);
    const Lp_uH = LpH * 1e6;
    const VR = (VinMin * D_max) / (1 - D_max);
    const turnsRatio = VR / (Vout + 0.5);
    const Ipk = Math.sqrt((2 * Pin) / (LpH * fHz));

    lpResEl.textContent = Lp_uH.toFixed(1) + ' μH (Primary L_p)';
    ratResEl.textContent = 'N_p / N_s = ' + turnsRatio.toFixed(2) + ' : 1 (Peak Primary Current I_pk = ' + Ipk.toFixed(2) + ' A)';
  }

  [pEl, viEl, voEl, fEl].forEach(el => el.addEventListener('input', update));
  update();
})();