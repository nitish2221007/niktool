(() => {
  'use strict';
  const c0El = document.getElementById('lev-c0'), caEl = document.getElementById('lev-ca'), cbEl = document.getElementById('lev-cb');
  const frResEl = document.getElementById('lev-res-frac'), tiResEl = document.getElementById('lev-res-tie');

  function update() {
    const C0 = parseFloat(c0El.value), Ca = parseFloat(caEl.value), Cb = parseFloat(cbEl.value);
    if (isNaN(C0) || isNaN(Ca) || isNaN(Cb) || Ca >= Cb || C0 < Ca || C0 > Cb) return;

    // Total tie-line length = C_beta - C_alpha
    const totalTie = Cb - Ca;

    // Lever Rule (Opposite arm length over total tie-line length):
    // w_alpha = (C_beta - C0) / (C_beta - C_alpha)
    // w_beta  = (C0 - C_alpha) / (C_beta - C_alpha)
    const w_alpha = (Cb - C0) / totalTie;
    const w_beta = (C0 - Ca) / totalTie;

    const w_alpha_pct = w_alpha * 100;
    const w_beta_pct = w_beta * 100;

    frResEl.textContent = 'Phase α: ' + w_alpha_pct.toFixed(1) + '% | Phase β: ' + w_beta_pct.toFixed(1) + '%';
    tiResEl.textContent = 'Tie-Line: ' + totalTie.toFixed(1) + ' wt % (α arm: ' + (Cb - C0).toFixed(1) + ' wt %, β arm: ' + (C0 - Ca).toFixed(1) + ' wt %)';
  }

  [c0El, caEl, cbEl].forEach(el => el.addEventListener('input', update));
  update();
})();