(() => {
  'use strict';
  const tpEl = document.getElementById('nd-type'), a260El = document.getElementById('nd-a260');
  const a280El = document.getElementById('nd-a280'), a230El = document.getElementById('nd-a230');
  const ccResEl = document.getElementById('nd-res-conc'), prResEl = document.getElementById('nd-res-purity');

  function update() {
    const parts = tpEl.value.split('_');
    const factor = parseFloat(parts[0]);
    const type = parts[1];

    const A260 = parseFloat(a260El.value), A280 = parseFloat(a280El.value), A230 = parseFloat(a230El.value);
    if (isNaN(A260) || isNaN(A280) || isNaN(A230) || A260 <= 0 || A280 <= 0 || A230 <= 0) return;

    // Concentration in ug / mL = A260 * factor (1 cm pathlength)
    const conc_ug_mL = A260 * factor;

    // Purity ratios:
    const ratio_260_280 = A260 / A280;
    const ratio_260_230 = A260 / A230;

    let p280Status = '', color = '#22543d';
    if (type === 'dsdna') {
      if (ratio_260_280 >= 1.75 && ratio_260_280 <= 2.05) { p280Status = 'PURE dsDNA (1.80 - 2.00)'; color = '#22543d'; }
      else if (ratio_260_280 < 1.75) { p280Status = 'PROTEIN / PHENOL CONTAMINATION (A260/A280 < 1.8)'; color = '#c53030'; }
      else { p280Status = 'RNA CONTAMINATION (A260/A280 > 2.0)'; color = '#ea580c'; }
    } else {
      if (ratio_260_280 >= 1.95 && ratio_260_280 <= 2.20) { p280Status = 'PURE RNA (~2.0)'; color = '#22543d'; }
      else { p280Status = 'CONTAMINATED RNA'; color = '#ea580c'; }
    }

    ccResEl.textContent = 'Conc = ' + conc_ug_mL.toFixed(1) + ' μg / mL (' + conc_ug_mL.toFixed(1) + ' ng/μL)';
    prResEl.textContent = 'A₂₆₀/A₂₈₀ = ' + ratio_260_280.toFixed(2) + ' (' + p280Status + ') | A₂₆₀/A₂₃₀ = ' + ratio_260_230.toFixed(2) + ' (' + (ratio_260_230 >= 2.0 ? 'Clean' : 'Residual Guanidine/Salts') + ')';
    prResEl.style.color = color;
  }

  [tpEl, a260El, a280El, a230El].forEach(el => el.addEventListener('input', update));
  tpEl.addEventListener('change', update);
  update();
})();