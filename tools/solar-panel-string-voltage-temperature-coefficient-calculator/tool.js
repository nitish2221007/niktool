(() => {
  'use strict';
  const nEl = document.getElementById('sol-n'), vocEl = document.getElementById('sol-voc');
  const cEl = document.getElementById('sol-coeff'), tEl = document.getElementById('sol-tmin');
  const vmResEl = document.getElementById('sol-res-vmax'), chResEl = document.getElementById('sol-res-check');

  function update() {
    const N = parseInt(nEl.value, 10), vocStc = parseFloat(vocEl.value);
    const coeffPct = parseFloat(cEl.value), tMinC = parseFloat(tEl.value);

    if (isNaN(N) || isNaN(vocStc) || isNaN(coeffPct) || isNaN(tMinC) || N < 1 || vocStc <= 0) return;

    // Delta T from STC (25°C)
    const deltaT = tMinC - 25;
    // Single panel cold Voc = Voc_STC * (1 + (coeffPct / 100) * deltaT)
    const singlePanelColdVoc = vocStc * (1 + ((coeffPct / 100) * deltaT));
    const totalStringColdVoc = N * singlePanelColdVoc;
    const stcStringVoc = N * vocStc;

    vmResEl.textContent = totalStringColdVoc.toFixed(1) + ' V DC (STC ' + stcStringVoc.toFixed(1) + 'V)';

    if (totalStringColdVoc > 600) {
      chResEl.textContent = 'EXCEEDS 600V Inverter Limit! (Use 1000V Commercial Inverter or Reduce Panels)';
      chResEl.style.color = '#c53030';
    } else {
      chResEl.textContent = 'SAFE for 600V Residential Inverter (Headroom ' + (600 - totalStringColdVoc).toFixed(1) + 'V)';
      chResEl.style.color = '#22543d';
    }
  }

  [nEl, vocEl, cEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();