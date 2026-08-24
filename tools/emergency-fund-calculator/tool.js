(() => {
  'use strict';
  const rentEl = document.getElementById('ef-rent'), foodEl = document.getElementById('ef-food');
  const debtEl = document.getElementById('ef-debts'), moEl = document.getElementById('ef-months');
  const tgtEl = document.getElementById('ef-res-target'), baseEl = document.getElementById('ef-res-monthly');

  function update() {
    const rent = parseFloat(rentEl.value) || 0;
    const food = parseFloat(foodEl.value) || 0;
    const debt = parseFloat(debtEl.value) || 0;
    const months = parseInt(moEl.value, 10) || 6;

    const monthlyTotal = rent + food + debt;
    const targetFund = monthlyTotal * months;

    tgtEl.textContent = '$' + Math.round(targetFund).toLocaleString();
    baseEl.textContent = '$' + Math.round(monthlyTotal).toLocaleString() + ' / mo';
  }

  [rentEl, foodEl, debtEl].forEach(el => el.addEventListener('input', update));
  moEl.addEventListener('change', update);
  update();
})();