(() => {
  'use strict';
  const neEl = document.getElementById('pef-ne'), regEl = document.getElementById('pef-reg');
  const fResEl = document.getElementById('pef-res-f'), rResEl = document.getElementById('pef-res-refl');

  function update() {
    const ne = parseFloat(neEl.value);
    if (isNaN(ne) || ne <= 0) return;

    const fHz = 8.9786 * Math.sqrt(ne);
    const fMhz = fHz / 1e6;
    const fGhz = fHz / 1e9;

    if (fGhz >= 1.0) {
      fResEl.textContent = fGhz.toFixed(2) + ' GHz (Plasma Frequency)';
      rResEl.textContent = 'Reflects microwaves below ' + fGhz.toFixed(2) + ' GHz (O-Mode Cutoff)';
    } else {
      fResEl.textContent = fMhz.toFixed(2) + ' MHz (Plasma Frequency)';
      rResEl.textContent = 'Reflects HF radio waves below ' + fMhz.toFixed(2) + ' MHz (Skywave Skip Distance)';
    }
  }

  regEl.addEventListener('change', () => {
    if (regEl.value !== 'custom') {
      neEl.value = regEl.value;
      update();
    }
  });

  neEl.addEventListener('input', () => {
    regEl.value = 'custom';
    update();
  });

  update();
})();