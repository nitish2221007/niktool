(() => {
  'use strict';
  const nbEl = document.getElementById('bo-nb'), naEl = document.getElementById('bo-na');
  const ordEl = document.getElementById('bo-res-order'), stabEl = document.getElementById('bo-res-stab');

  function update() {
    const nb = parseInt(nbEl.value, 10), na = parseInt(naEl.value, 10);
    if (isNaN(nb) || isNaN(na) || nb < 0 || na < 0) return;

    // Bond Order = 0.5 * (Nb - Na)
    const bo = 0.5 * (nb - na);

    ordEl.textContent = 'Bond Order = ' + bo.toFixed(1);

    if (bo === 3.0) {
      ordEl.textContent += ' (Triple Bond)';
      stabEl.textContent = 'Extremely Stable & High Bond Dissociation Energy';
      stabEl.style.color = '#22543d';
    } else if (bo === 2.0) {
      ordEl.textContent += ' (Double Bond)';
      stabEl.textContent = 'Stable Covalent Bond';
      stabEl.style.color = '#22543d';
    } else if (bo === 1.0) {
      ordEl.textContent += ' (Single Bond)';
      stabEl.textContent = 'Stable Single Covalent Bond';
      stabEl.style.color = '#2563eb';
    } else if (bo > 0) {
      ordEl.textContent += ' (Fractional Resonance Bond)';
      stabEl.textContent = 'Transient / Radical Species';
      stabEl.style.color = '#d97706';
    } else {
      ordEl.textContent += ' (No Bond Formed)';
      stabEl.textContent = 'Unstable / Does Not Exist in Standard Conditions (e.g. He₂)';
      stabEl.style.color = '#c53030';
    }
  }

  nbEl.addEventListener('input', update);
  naEl.addEventListener('input', update);
  update();
})();