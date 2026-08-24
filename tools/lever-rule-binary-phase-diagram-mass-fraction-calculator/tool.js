(() => {
  'use strict';
  const c0El = document.getElementById('lr-c0'), clEl = document.getElementById('lr-cl'), caEl = document.getElementById('lr-ca');
  const frResEl = document.getElementById('lr-res-fracs'), msResEl = document.getElementById('lr-res-mass');

  function update() {
    const C0 = parseFloat(c0El.value), CL = parseFloat(clEl.value), C_alpha = parseFloat(caEl.value);
    if (isNaN(C0) || isNaN(CL) || isNaN(C_alpha) || CL >= C_alpha || C0 < CL || C0 > C_alpha) return;

    const tie_length = C_alpha - CL;

    // Lever Rule:
    // Fraction of liquid w_L = ( C_alpha - C0 ) / tie_length
    const w_L = (C_alpha - C0) / tie_length;
    // Fraction of solid w_alpha = ( C0 - CL ) / tie_length
    const w_alpha = (C0 - CL) / tie_length;

    const w_L_pct = w_L * 100.0;
    const w_alpha_pct = w_alpha * 100.0;

    frResEl.textContent = 'Solid α = ' + w_alpha_pct.toFixed(1) + '% | Liquid L = ' + w_L_pct.toFixed(1) + '%';
    msResEl.textContent = 'Tie-Line = ' + tie_length.toFixed(1) + ' wt% | Solid arm = ' + (C0 - CL).toFixed(1) + ' / ' + tie_length.toFixed(1) + ' (' + w_alpha_pct.toFixed(1) + '%)';
  }

  [c0El, clEl, caEl].forEach(el => el.addEventListener('input', update));
  update();
})();