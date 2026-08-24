(() => {
  'use strict';
  const ndEl = document.getElementById('abb-nd'), nfEl = document.getElementById('abb-nf'), ncEl = document.getElementById('abb-nc');
  const vdResEl = document.getElementById('abb-res-vd'), glResEl = document.getElementById('abb-res-glass');

  function update() {
    const nd = parseFloat(ndEl.value), nf = parseFloat(nfEl.value), nc = parseFloat(ncEl.value);
    if (isNaN(nd) || isNaN(nf) || isNaN(nc) || nd <= 1.0 || nf <= nc) return;

    // Abbe Number V_d = (nd - 1) / (nf - nc)
    const deltaN = nf - nc;
    const Vd = (nd - 1) / deltaN;

    vdResEl.textContent = 'V_d = ' + Vd.toFixed(2) + ' (Principal Dispersion Δn = ' + deltaN.toFixed(4) + ')';

    if (Vd >= 55.0) {
      glResEl.textContent = 'Crown Glass (Low Dispersion V_d ≥ 55: High Color Clarity)';
      glResEl.style.color = '#22543d';
    } else {
      glResEl.textContent = 'Flint Glass (High Dispersion V_d < 55: Strong Prism Color Spreading)';
      glResEl.style.color = '#2563eb';
    }
  }

  [ndEl, nfEl, ncEl].forEach(el => el.addEventListener('input', update));
  update();
})();