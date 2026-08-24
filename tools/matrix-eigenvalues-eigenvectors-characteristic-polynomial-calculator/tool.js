(() => {
  'use strict';
  const aEl = document.getElementById('eig-a'), bEl = document.getElementById('eig-b');
  const cEl = document.getElementById('eig-c'), dEl = document.getElementById('eig-d');
  const vResEl = document.getElementById('eig-res-val'), vcResEl = document.getElementById('eig-res-vec');

  function update() {
    const a = parseFloat(aEl.value), b = parseFloat(bEl.value);
    const c = parseFloat(cEl.value), d = parseFloat(dEl.value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) return;

    // Trace T = a + d
    const T = a + d;
    // Determinant D = a*d - b*c
    const D = (a * d) - (b * c);

    // Characteristic polynomial: lambda^2 - T*lambda + D = 0
    // Discriminant delta = T^2 - 4*D
    const delta = Math.pow(T, 2) - (4.0 * D);

    let l1_str = '', l2_str = '', vec_str = '';
    let color = '#22543d';

    if (delta >= 0) {
      const l1 = (T + Math.sqrt(delta)) / 2.0;
      const l2 = (T - Math.sqrt(delta)) / 2.0;
      l1_str = l1.toFixed(2);
      l2_str = l2.toFixed(2);

      // Eigenvectors: (a - lambda)*x + b*y = 0 => [b, lambda - a]
      const v1 = b !== 0 ? '[' + b.toFixed(2) + ', ' + (l1 - a).toFixed(2) + ']ᵀ' : '[1, 0]ᵀ';
      const v2 = b !== 0 ? '[' + b.toFixed(2) + ', ' + (l2 - a).toFixed(2) + ']ᵀ' : '[0, 1]ᵀ';
      vec_str = 'Trace = ' + T.toFixed(2) + ' | Det = ' + D.toFixed(2) + ' | v₁ ≈ ' + v1 + ', v₂ ≈ ' + v2;
    } else {
      const realPart = T / 2.0;
      const imagPart = Math.sqrt(-delta) / 2.0;
      l1_str = realPart.toFixed(2) + ' + ' + imagPart.toFixed(2) + 'j';
      l2_str = realPart.toFixed(2) + ' - ' + imagPart.toFixed(2) + 'j';
      vec_str = 'Complex Conjugate Eigenvalues | Characteristic Eq: λ² - ' + T.toFixed(2) + 'λ + ' + D.toFixed(2) + ' = 0';
      color = '#2563eb';
    }

    vResEl.textContent = 'λ₁ = ' + l1_str + ', λ₂ = ' + l2_str;
    vResEl.style.color = color;
    vcResEl.textContent = vec_str;
    vcResEl.style.color = color;
  }

  [aEl, bEl, cEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();