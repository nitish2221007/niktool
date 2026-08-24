(() => {
  'use strict';
  const atmEl = document.getElementById('npsh-hatm'), hsEl = document.getElementById('npsh-hs');
  const hfEl = document.getElementById('npsh-hf'), hvpEl = document.getElementById('npsh-hvp'), rEl = document.getElementById('npsh-npshr');
  const nResEl = document.getElementById('npsh-res-val'), mResEl = document.getElementById('npsh-res-margin');

  function update() {
    const Hatm = parseFloat(atmEl.value), Hs = parseFloat(hsEl.value);
    const Hf = parseFloat(hfEl.value), Hvp = parseFloat(hvpEl.value), Npshr = parseFloat(rEl.value);

    if (isNaN(Hatm) || isNaN(Hs) || isNaN(Hf) || isNaN(Hvp) || isNaN(Npshr) || Hatm <= 0) return;

    // NPSHA = Hatm + Hs - Hf - Hvp (ft)
    const npsha = Hatm + Hs - Hf - Hvp;
    const npshaM = npsha * 0.3048;
    const margin = npsha - Npshr;

    nResEl.textContent = npsha.toFixed(1) + ' ft (' + npshaM.toFixed(2) + ' meters)';

    if (margin < 0) {
      mResEl.textContent = margin.toFixed(1) + ' ft DEFICIT (CAVITATION DESTROYING PUMP!)';
      mResEl.style.color = '#c53030';
    } else if (margin < 3.0) {
      mResEl.textContent = '+' + margin.toFixed(1) + ' ft Margin (MARGINAL: Min 3-5 ft Recommended)';
      mResEl.style.color = '#d97706';
    } else {
      mResEl.textContent = '+' + margin.toFixed(1) + ' ft Cavitation Margin (SAFE > NPSHR)';
      mResEl.style.color = '#22543d';
    }
  }

  [atmEl, hsEl, hfEl, hvpEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();