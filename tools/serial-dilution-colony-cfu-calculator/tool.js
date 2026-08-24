(() => {
  'use strict';
  const cEl = document.getElementById('cfu-colonies'), dEl = document.getElementById('cfu-dil'), vEl = document.getElementById('cfu-vol');
  const valResEl = document.getElementById('cfu-res-val'), stResEl = document.getElementById('cfu-res-status');

  function update() {
    const colonies = parseFloat(cEl.value), dilFactor = parseFloat(dEl.value), volMl = parseFloat(vEl.value);
    if (isNaN(colonies) || isNaN(dilFactor) || isNaN(volMl) || colonies < 0 || dilFactor <= 0 || volMl <= 0) return;

    // CFU / mL = (Colonies * Dilution Factor) / Volume_mL
    const cfuPerMl = (colonies * dilFactor) / volMl;

    valResEl.textContent = cfuPerMl.toExponential(2) + ' CFU / mL';

    if (colonies >= 30 && colonies <= 300) {
      stResEl.textContent = 'Valid Standard Count (30-300 range)';
      stResEl.style.color = '#22543d';
    } else if (colonies < 30) {
      stResEl.textContent = 'TFTC (Too Few To Count < 30 colonies)';
      stResEl.style.color = '#d97706';
    } else {
      stResEl.textContent = 'TNTC (Too Numerous To Count > 300 colonies)';
      stResEl.style.color = '#c53030';
    }
  }

  [cEl, dEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();