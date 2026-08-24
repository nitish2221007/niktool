(() => {
  'use strict';
  const bEl = document.getElementById('tip-bill'), pEl = document.getElementById('tip-pct'), nEl = document.getElementById('tip-people');
  const ppEl = document.getElementById('tip-res-per-person'), ttEl = document.getElementById('tip-res-tot-tip'), gtEl = document.getElementById('tip-res-grand-tot');

  function update() {
    const bill = parseFloat(bEl.value);
    const tipPct = parseFloat(pEl.value) / 100;
    const people = parseInt(nEl.value, 10) || 1;

    if (isNaN(bill) || isNaN(tipPct) || bill <= 0 || people < 1) return;

    const tipTotal = bill * tipPct;
    const grandTotal = bill + tipTotal;
    const perPerson = grandTotal / people;

    ppEl.textContent = '$' + perPerson.toFixed(2);
    ttEl.textContent = '$' + tipTotal.toFixed(2);
    gtEl.textContent = '$' + grandTotal.toFixed(2);
  }

  [bEl, pEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();