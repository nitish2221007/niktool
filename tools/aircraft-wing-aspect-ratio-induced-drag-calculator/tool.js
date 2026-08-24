(() => {
  'use strict';
  const bEl = document.getElementById('ar-b'), sEl = document.getElementById('ar-s');
  const clEl = document.getElementById('ar-cl'), eEl = document.getElementById('ar-e');
  const arResEl = document.getElementById('ar-res-ar'), cdiResEl = document.getElementById('ar-res-cdi');

  function update() {
    const b = parseFloat(bEl.value), S = parseFloat(sEl.value);
    const C_L = parseFloat(clEl.value), e = parseFloat(eEl.value);

    if (isNaN(b) || isNaN(S) || isNaN(C_L) || isNaN(e) || b <= 0 || S <= 0 || C_L <= 0 || e <= 0) return;

    // Aspect ratio AR = b^2 / S
    const AR = Math.pow(b, 2) / S;

    // Induced drag C_Di = C_L^2 / (pi * e * AR)
    const C_Di = Math.pow(C_L, 2) / (Math.PI * e * AR);

    arResEl.textContent = 'Aspect Ratio AR = ' + AR.toFixed(2);
    cdiResEl.textContent = 'Induced Drag C_Di = ' + C_Di.toFixed(4) + ' (Oswald e = ' + e + ' @ C_L = ' + C_L + ')';
  }

  [bEl, sEl, clEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();