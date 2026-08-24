(() => {
  'use strict';
  const caEl = document.getElementById('tit-ca'), vaEl = document.getElementById('tit-va');
  const vbEl = document.getElementById('tit-vb'), rxEl = document.getElementById('tit-rxn');
  const cbResEl = document.getElementById('tit-res-cb'), mlResEl = document.getElementById('tit-res-mols');

  function update() {
    const Ca = parseFloat(caEl.value), Va = parseFloat(vaEl.value), Vb = parseFloat(vbEl.value);
    const parts = rxEl.value.split('_');
    const na = parseFloat(parts[0]), nb = parseFloat(parts[1]);

    if (isNaN(Ca) || isNaN(Va) || isNaN(Vb) || Ca <= 0 || Va <= 0 || Vb <= 0) return;

    // Stoichiometric relation: ( Ca * Va ) / na = ( Cb * Vb ) / nb
    // Cb = ( Ca * Va * nb ) / ( Vb * na )
    const Cb = (Ca * Va * nb) / (Vb * na);

    const moles_acid = (Ca * Va) / 1000.0;
    const moles_base = (Cb * Vb) / 1000.0;

    cbResEl.textContent = 'Base C₂ = ' + Cb.toFixed(3) + ' M (mol/L)';
    mlResEl.textContent = 'Neutralized Moles = ' + moles_acid.toExponential(2) + ' mol Acid titrated by ' + moles_base.toExponential(2) + ' mol Base (Endpoint: ' + Vb + ' mL)';
  }

  [caEl, vaEl, vbEl].forEach(el => el.addEventListener('input', update));
  rxEl.addEventListener('change', update);
  update();
})();