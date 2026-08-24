(() => {
  'use strict';
  const aEl = document.getElementById('eig-a'), bEl = document.getElementById('eig-b');
  const cEl = document.getElementById('eig-c'), dEl = document.getElementById('eig-d');
  const l1El = document.getElementById('eig-res-l1'), l2El = document.getElementById('eig-res-l2'), trEl = document.getElementById('eig-res-trace');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const c = parseFloat(cEl.value), d = parseFloat(dEl.value);
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return;

    // Trace T = a + d
    const T = a + d;
    // Determinant D = ad - bc
    const D = (a * d) - (b * c);
    // Discriminant Delta = T^2 - 4D
    const delta = Math.pow(T, 2) - (4 * D);

    trEl.textContent = 'Tr(A) = ' + T.toFixed(2) + ', Det(A) = ' + D.toFixed(2);

    if (delta >= 0) {
      const l1 = (T + Math.sqrt(delta)) / 2;
      const l2 = (T - Math.sqrt(delta)) / 2;
      l1El.textContent = 'λ₁ = ' + l1.toFixed(2);
      l2El.textContent = 'λ₂ = ' + l2.toFixed(2);
    } else {
      const real = (T / 2).toFixed(2);
      const imag = (Math.sqrt(-delta) / 2).toFixed(2);
      l1El.textContent = 'λ₁ = ' + real + ' + ' + imag + 'i';
      l2El.textContent = 'λ₂ = ' + real + ' - ' + imag + 'i';
    }
  }

  [aEl, bEl, cEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();