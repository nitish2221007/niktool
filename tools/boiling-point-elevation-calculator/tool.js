(() => {
  'use strict';
  const kbEl = document.getElementById('bp-kb'), mEl = document.getElementById('bp-m'), iEl = document.getElementById('bp-i');
  const newEl = document.getElementById('bp-res-new'), dEl = document.getElementById('bp-res-delta');

  function update() {
    const kb = parseFloat(kbEl.value), m = parseFloat(mEl.value), i = parseFloat(iEl.value);
    if (isNaN(kb) || isNaN(m) || isNaN(i) || kb <= 0 || m <= 0 || i <= 0) return;

    // Delta Tb = i * Kb * m
    const deltaTb = i * kb * m;
    const newBp = 100.0 + deltaTb; // Water pure BP = 100 C at 1 atm

    newEl.textContent = newBp.toFixed(2) + ' °C (' + ((newBp * 9/5) + 32).toFixed(2) + ' °F)';
    dEl.textContent = '+' + deltaTb.toFixed(2) + ' °C rise';
  }

  [kbEl, mEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();