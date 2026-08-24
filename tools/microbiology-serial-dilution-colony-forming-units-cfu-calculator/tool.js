(() => {
  'use strict';
  const cEl = document.getElementById('cfu-cnt'), vEl = document.getElementById('cfu-vol'), dEl = document.getElementById('cfu-dil');
  const valResEl = document.getElementById('cfu-res-val'), stResEl = document.getElementById('cfu-res-stat');

  function update() {
    const count = parseFloat(cEl.value), vol = parseFloat(vEl.value), dilExponent = parseFloat(dEl.value);
    if (isNaN(count) || isNaN(vol) || isNaN(dilExponent) || count < 0 || vol <= 0) return;

    const dilutionFactor = Math.pow(10, dilExponent);

    // CFU / mL = ( Count / Volume in mL ) * Dilution Factor
    const cfu_per_ml = (count / vol) * dilutionFactor;

    let status = '';
    let color = '#22543d';

    if (count < 30) {
      status = 'TOO FEW TO COUNT (TFTC: Count < 30 introduces high statistical sampling error)';
      color = '#d97706';
    } else if (count <= 300) {
      status = 'STATISTICALLY VALID (30 - 300 Count Range: Standard USP / FDA microbial limit threshold)';
      color = '#22543d';
    } else {
      status = 'TOO NUMEROUS TO COUNT (TNTC: Count > 300 leads to colony crowding & undercounting)';
      color = '#c53030';
    }

    valResEl.textContent = cfu_per_ml.toExponential(2) + ' CFU / mL';
    valResEl.style.color = color;
    stResEl.textContent = status + ' | ' + count + ' Colonies on ' + vol + ' mL @ 10^' + dilExponent + ' Dilution';
    stResEl.style.color = color;
  }

  [cEl, vEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();