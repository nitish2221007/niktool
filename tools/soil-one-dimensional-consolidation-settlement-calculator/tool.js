(() => {
  'use strict';
  const h0El = document.getElementById('cs-h0'), e0El = document.getElementById('cs-e0');
  const ccEl = document.getElementById('cs-cc'), s0El = document.getElementById('cs-s0'), dsEl = document.getElementById('cs-ds');
  const scResEl = document.getElementById('cs-res-sc'), stResEl = document.getElementById('cs-res-strain');

  function update() {
    const H0 = parseFloat(h0El.value), e0 = parseFloat(e0El.value);
    const Cc = parseFloat(ccEl.value), s0 = parseFloat(s0El.value), ds = parseFloat(dsEl.value);

    if (isNaN(H0) || isNaN(e0) || isNaN(Cc) || isNaN(s0) || isNaN(ds) || H0 <= 0 || e0 <= 0 || Cc <= 0 || s0 <= 0 || ds <= 0) return;

    const Sc_m = ((Cc * H0) / (1 + e0)) * Math.log10((s0 + ds) / s0);
    const Sc_mm = Sc_m * 1000;
    const Sc_cm = Sc_m * 100;

    const vertStrainPct = (Sc_m / H0) * 100;
    const delta_e = Cc * Math.log10((s0 + ds) / s0);
    const e_final = e0 - delta_e;

    scResEl.textContent = Sc_mm.toFixed(1) + ' mm (' + Sc_cm.toFixed(1) + ' cm Settlement)';
    stResEl.textContent = vertStrainPct.toFixed(2) + '% Vertical Strain (Final Void Ratio e_f = ' + e_final.toFixed(3) + ')';
  }

  [h0El, e0El, ccEl, s0El, dsEl].forEach(el => el.addEventListener('input', update));
  update();
})();