(() => {
  'use strict';
  const phiEl = document.getElementById('ar-phi'), rtEl = document.getElementById('ar-rt');
  const rwEl = document.getElementById('ar-rw'), mEl = document.getElementById('ar-m'), nEl = document.getElementById('ar-n');
  const swResEl = document.getElementById('ar-res-sw'), fResEl = document.getElementById('ar-res-f');

  function update() {
    const phi = parseFloat(phiEl.value), R_t = parseFloat(rtEl.value);
    const R_w = parseFloat(rwEl.value), m = parseFloat(mEl.value), n = parseFloat(nEl.value);

    if (isNaN(phi) || isNaN(R_t) || isNaN(R_w) || isNaN(m) || isNaN(n) || phi <= 0 || phi >= 1 || R_t <= 0 || R_w <= 0 || m <= 0 || n <= 0) return;

    // Formation factor: F = 1 / (phi^m)  (assuming a = 1.0)
    const F = 1.0 / Math.pow(phi, m);

    // 100% water saturated rock resistivity: R_o = F * R_w
    const R_o = F * R_w;

    // Archie Water Saturation: S_w = ( R_o / R_t )^(1 / n)
    const S_w = Math.pow(R_o / R_t, 1.0 / n);
    const S_w_pct = Math.min(100.0, S_w * 100.0);
    const S_hc_pct = 100.0 - S_w_pct;

    swResEl.textContent = 'Water S_w = ' + S_w_pct.toFixed(1) + '% | Oil/Gas S_hc = ' + S_hc_pct.toFixed(1) + '%';
    fResEl.textContent = 'Formation F = ' + F.toFixed(2) + ' | 100% Brine R_o = ' + R_o.toFixed(2) + ' Ω·m (R_t / R_o = ' + (R_t / R_o).toFixed(1) + '× Resistivity Boost)';
  }

  [phiEl, rtEl, rwEl, mEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();