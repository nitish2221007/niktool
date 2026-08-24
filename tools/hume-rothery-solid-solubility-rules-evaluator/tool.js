(() => {
  'use strict';
  const raEl = document.getElementById('hr-ra'), rbEl = document.getElementById('hr-rb');
  const crEl = document.getElementById('hr-cryst'), enEl = document.getElementById('hr-en');
  const evResEl = document.getElementById('hr-res-eval'), dfResEl = document.getElementById('hr-res-diff');

  function update() {
    const rA = parseFloat(raEl.value), rB = parseFloat(rbEl.value);
    const cryst = crEl.value, dEN = parseFloat(enEl.value);

    if (isNaN(rA) || isNaN(rB) || isNaN(dEN) || rA <= 0 || rB <= 0 || dEN < 0) return;

    // Size difference percentage: |rA - rB| / rA * 100
    const delta_r_pct = (Math.abs(rA - rB) / rA) * 100.0;

    const sizePass = delta_r_pct < 15.0;
    const crystPass = (cryst === 'match');
    const enPass = dEN < 0.40;

    let evalText = '', color = '#22543d';
    if (sizePass && crystPass && enPass) {
      evalText = 'COMPLETE SOLID SOLUBILITY (Isomorphous System like Cu-Ni)';
      color = '#22543d';
    } else if (sizePass && enPass) {
      evalText = 'EXTENSIVE PARTIAL SOLUBILITY (Limited by crystal structure difference)';
      color = '#ea580c';
    } else {
      evalText = 'POOR / INSOLUBLE (Violates Hume-Rothery rules: Intermetallic compound forms)';
      color = '#c53030';
    }

    evResEl.textContent = evalText;
    evResEl.style.color = color;
    dfResEl.textContent = 'Size Difference Δr = ' + delta_r_pct.toFixed(2) + '% (' + (sizePass ? '< 15% ✓' : '> 15% ✗') + ') | Crystal: ' + (crystPass ? 'Match ✓' : 'Differs ✗') + ' | ΔEN = ' + dEN.toFixed(2);
  }

  [raEl, rbEl, enEl].forEach(el => el.addEventListener('input', update));
  crEl.addEventListener('change', update);
  update();
})();