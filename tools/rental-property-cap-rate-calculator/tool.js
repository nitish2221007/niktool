(() => {
  'use strict';
  const pEl = document.getElementById('cap-price'), rEl = document.getElementById('cap-rent'), eEl = document.getElementById('cap-exp');
  const rateEl = document.getElementById('cap-res-rate'), noiEl = document.getElementById('cap-res-noi'), grossEl = document.getElementById('cap-res-gross');

  function update() {
    const price = parseFloat(pEl.value), mRent = parseFloat(rEl.value), annualExp = parseFloat(eEl.value);
    if (isNaN(price) || isNaN(mRent) || isNaN(annualExp) || price <= 0 || mRent <= 0 || annualExp < 0) return;

    const annualGross = mRent * 12;
    // NOI = Annual Gross Rent - Annual Operating Expenses
    const noi = annualGross - annualExp;
    // Cap Rate = (NOI / Price) * 100
    const capRate = (noi / price) * 100;
    const grossYield = (annualGross / price) * 100;

    rateEl.textContent = capRate.toFixed(2) + '%';
    rateEl.style.color = capRate >= 6 ? '#22543d' : (capRate >= 4 ? '#2563eb' : '#d97706');
    noiEl.textContent = '$' + Math.round(noi).toLocaleString() + ' / yr';
    grossEl.textContent = grossYield.toFixed(2) + '%';
  }

  [pEl, rEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();