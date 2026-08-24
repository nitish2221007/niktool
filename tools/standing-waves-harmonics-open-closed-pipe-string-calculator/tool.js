(() => {
  'use strict';
  const sysEl = document.getElementById('sw-sys'), lEl = document.getElementById('sw-len'), vEl = document.getElementById('sw-v');
  const f1ResEl = document.getElementById('sw-res-f1'), hResEl = document.getElementById('sw-res-harm');

  function update() {
    const isOpen = sysEl.value === 'open';
    const L = parseFloat(lEl.value), v = parseFloat(vEl.value);

    if (isNaN(L) || isNaN(v) || L <= 0 || v <= 0) return;

    let f1 = 0, f2 = 0, f3 = 0, f4 = 0, lam1 = 0, harmText = '';

    if (isOpen) {
      // f_n = n * v / (2 * L) for n = 1, 2, 3, 4
      f1 = v / (2.0 * L);
      f2 = 2.0 * f1;
      f3 = 3.0 * f1;
      f4 = 4.0 * f1;
      lam1 = 2.0 * L;
      harmText = '2nd: ' + f2.toFixed(1) + ' Hz | 3rd: ' + f3.toFixed(1) + ' Hz | 4th: ' + f4.toFixed(1) + ' Hz (λ₁ = ' + lam1.toFixed(2) + ' m)';
    } else {
      // Closed pipe: f_n = n * v / (4 * L) for odd n = 1, 3, 5, 7
      f1 = v / (4.0 * L);
      f2 = 3.0 * f1;
      f3 = 5.0 * f1;
      f4 = 7.0 * f1;
      lam1 = 4.0 * L;
      harmText = '3rd: ' + f2.toFixed(1) + ' Hz | 5th: ' + f3.toFixed(1) + ' Hz | 7th: ' + f4.toFixed(1) + ' Hz (Only Odd Harmonics, λ₁ = ' + lam1.toFixed(2) + ' m)';
    }

    f1ResEl.textContent = 'f₁ = ' + f1.toFixed(2) + ' Hz (Fundamental)';
    hResEl.textContent = harmText + ' [Length L = ' + L + ' m, Wave Speed v = ' + v + ' m/s]';
  }

  [sysEl, lEl, vEl].forEach(el => el.addEventListener('input', update));
  sysEl.addEventListener('change', update);
  update();
})();