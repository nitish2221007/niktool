(() => {
  'use strict';
  const kfEl = document.getElementById('fp-kf'), mEl = document.getElementById('fp-m'), iEl = document.getElementById('fp-i');
  const newEl = document.getElementById('fp-res-new'), dEl = document.getElementById('fp-res-delta');

  function update() {
    const kf = parseFloat(kfEl.value), m = parseFloat(mEl.value), i = parseFloat(iEl.value);
    if (isNaN(kf) || isNaN(m) || isNaN(i) || kf <= 0 || m <= 0 || i <= 0) return;

    // Delta Tf = i * Kf * m
    const deltaTf = i * kf * m;
    const newFp = 0.0 - deltaTf; // For water pure FP = 0 C

    newEl.textContent = newFp.toFixed(2) + ' °C (' + ((newFp * 9/5) + 32).toFixed(2) + ' °F)';
    dEl.textContent = deltaTf.toFixed(2) + ' °C drop';
  }

  [kfEl, mEl, iEl].forEach(el => el.addEventListener('input', update));
  update();
})();