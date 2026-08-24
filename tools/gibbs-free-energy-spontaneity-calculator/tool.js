(() => {
  'use strict';
  const dhEl = document.getElementById('gfe-dh'), dsEl = document.getElementById('gfe-ds'), tEl = document.getElementById('gfe-t');
  const dgEl = document.getElementById('gfe-res-dg'), spEl = document.getElementById('gfe-res-spont');

  function update() {
    const dHkJ = parseFloat(dhEl.value), dSJ = parseFloat(dsEl.value), T = parseFloat(tEl.value);
    if (isNaN(dHkJ) || isNaN(dSJ) || isNaN(T) || T <= 0) return;

    // Convert dS from J to kJ: dSkJ = dSJ / 1000
    const dSkJ = dSJ / 1000;
    // Delta G = Delta H - T * Delta S
    const dG = dHkJ - (T * dSkJ);

    dgEl.textContent = (dG >= 0 ? '+' : '') + dG.toFixed(2) + ' kJ/mol';

    if (dG < 0) {
      spEl.textContent = 'Spontaneous (Exergonic, ΔG < 0)';
      spEl.style.color = '#22543d';
    } else if (dG === 0) {
      spEl.textContent = 'Dynamic Equilibrium (ΔG = 0)';
      spEl.style.color = '#d97706';
    } else {
      spEl.textContent = 'Non-Spontaneous (Endergonic, ΔG > 0)';
      spEl.style.color = '#c53030';
    }
  }

  [dhEl, dsEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();