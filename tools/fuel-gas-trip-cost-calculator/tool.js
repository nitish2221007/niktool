(() => {
  'use strict';
  const dEl = document.getElementById('gas-dist'), mEl = document.getElementById('gas-mileage');
  const pEl = document.getElementById('gas-price'), passEl = document.getElementById('gas-pass');
  const tEl = document.getElementById('gas-res-total'), lEl = document.getElementById('gas-res-liters'), sEl = document.getElementById('gas-res-split');

  function update() {
    const dist = parseFloat(dEl.value), mileage = parseFloat(mEl.value);
    const price = parseFloat(pEl.value), pass = parseInt(passEl.value, 10) || 1;

    if (isNaN(dist) || isNaN(mileage) || isNaN(price) || dist <= 0 || mileage <= 0 || price <= 0 || pass < 1) return;

    const totalLiters = (dist * mileage) / 100;
    const totalCost = totalLiters * price;
    const splitCost = totalCost / pass;

    tEl.textContent = '$' + totalCost.toFixed(2);
    lEl.textContent = totalLiters.toFixed(2) + ' Liters';
    sEl.textContent = '$' + splitCost.toFixed(2) + ' / person';
  }

  [dEl, mEl, pEl, passEl].forEach(el => el.addEventListener('input', update));
  update();
})();