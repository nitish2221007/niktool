(() => {
  'use strict';
  const pk1El = document.getElementById('pi-pk1'), pk2El = document.getElementById('pi-pk2'), phEl = document.getElementById('pi-ph');
  const piResEl = document.getElementById('pi-res-val'), stResEl = document.getElementById('pi-res-state');

  function update() {
    const pk1 = parseFloat(pk1El.value), pk2 = parseFloat(pk2El.value), ph = parseFloat(phEl.value);
    if (isNaN(pk1) || isNaN(pk2) || isNaN(ph)) return;

    // pI = (pK1 + pK2) / 2
    const pI = (pk1 + pk2) / 2;

    piResEl.textContent = 'pI = ' + pI.toFixed(2);

    if (Math.abs(ph - pI) < 0.2) {
      stResEl.textContent = 'Neutral Zwitterionic Form (Net Charge ≈ 0)';
      stResEl.style.color = '#22543d';
    } else if (ph < pI) {
      stResEl.textContent = 'Positively Charged Cation (pH < pI, Migrates to Cathode)';
      stResEl.style.color = '#2563eb';
    } else {
      stResEl.textContent = 'Negatively Charged Anion (pH > pI, Migrates to Anode)';
      stResEl.style.color = '#c53030';
    }
  }

  [pk1El, pk2El, phEl].forEach(el => el.addEventListener('input', update));
  update();
})();