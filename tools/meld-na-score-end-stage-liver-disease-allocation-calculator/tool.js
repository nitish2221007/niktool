(() => {
  'use strict';
  const biEl = document.getElementById('ml-bili'), inrEl = document.getElementById('ml-inr');
  const crEl = document.getElementById('ml-cr'), naEl = document.getElementById('ml-na');
  const mlResEl = document.getElementById('ml-res-meld'), mrResEl = document.getElementById('ml-res-mort');

  function update() {
    let bili = parseFloat(biEl.value), inr = parseFloat(inrEl.value);
    let cr = parseFloat(crEl.value), na = parseFloat(naEl.value);

    if (isNaN(bili) || isNaN(inr) || isNaN(cr) || isNaN(na) || bili <= 0 || inr <= 0 || cr <= 0 || na <= 0) return;

    // UNOS bounds: lower bound 1.0 for bili, inr, cr; upper bound 4.0 for cr; Na bounded [125, 137]
    bili = Math.max(1.0, bili);
    inr = Math.max(1.0, inr);
    cr = Math.min(4.0, Math.max(1.0, cr));
    const na_bound = Math.min(137.0, Math.max(125.0, na));

    // Original MELD = 9.57 * ln(Cr) + 3.78 * ln(Bili) + 11.20 * ln(INR) + 6.43
    const meld_orig = 9.57 * Math.log(cr) + 3.78 * Math.log(bili) + 11.20 * Math.log(inr) + 6.43;
    const meld_i = Math.round(meld_orig);

    // MELD-Na: If MELD > 11, MELD-Na = MELD_i + 1.32 * (137 - Na) - [ 0.033 * MELD_i * (137 - Na) ]
    let meld_na = meld_i;
    if (meld_i > 11) {
      meld_na = meld_i + 1.32 * (137.0 - na_bound) - (0.033 * meld_i * (137.0 - na_bound));
    }
    meld_na = Math.min(40, Math.max(6, Math.round(meld_na)));

    let mort = 1.9;
    if (meld_na >= 40) mort = 71.3;
    else if (meld_na >= 30) mort = 52.6;
    else if (meld_na >= 20) mort = 19.6;
    else if (meld_na >= 10) mort = 6.0;
    else mort = 1.9;

    mlResEl.textContent = 'MELD-Na = ' + meld_na + ' (UNOS Allocation)';
    mrResEl.textContent = '3-Month Mortality ≈ ' + mort + '% (MELD Base = ' + meld_i + ' | Na Correction = ' + (meld_na >= meld_i ? '+' : '') + (meld_na - meld_i) + ' pts)';
  }

  [biEl, inrEl, crEl, naEl].forEach(el => el.addEventListener('input', update));
  update();
})();