(() => {
  'use strict';
  const pEl = document.getElementById('grm-price'), rEl = document.getElementById('grm-annual-rent');
  const grmEl = document.getElementById('grm-res-val'), yEl = document.getElementById('grm-res-years');

  function update() {
    const price = parseFloat(pEl.value), rent = parseFloat(rEl.value);
    if (isNaN(price) || isNaN(rent) || price <= 0 || rent <= 0) return;

    // GRM = Price / Annual Gross Rent
    const grm = price / rent;

    grmEl.textContent = grm.toFixed(2);
    yEl.textContent = grm.toFixed(1) + ' Years of Gross Rent';
  }

  pEl.addEventListener('input', update);
  rEl.addEventListener('input', update);
  update();
})();