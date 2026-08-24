(() => {
  'use strict';
  const aaEl = document.getElementById('pw-aa'), trpEl = document.getElementById('pw-trp'), tyrEl = document.getElementById('pw-tyr');
  const mwResEl = document.getElementById('pw-res-mw'), extResEl = document.getElementById('pw-res-ext');

  function update() {
    const aaCount = parseFloat(aaEl.value), nTrp = parseFloat(trpEl.value), nTyr = parseFloat(tyrEl.value);
    if (isNaN(aaCount) || isNaN(nTrp) || isNaN(nTyr) || aaCount <= 0) return;

    // Molecular weight approx: 110 Daltons average per amino acid residue
    const MW_Da = aaCount * 110.0;
    const MW_kDa = MW_Da / 1000.0;

    // Gill & von Hippel method for molar extinction coefficient at 280 nm:
    // eps_280 = nTrp * 5500 + nTyr * 1490  [M^-1 * cm^-1]
    const eps_280 = (nTrp * 5500.0) + (nTyr * 1490.0);

    // Absorbance of a 1 mg/mL (0.1%) solution: A_0.1% = eps_280 / MW_Da
    const A_1mg_mL = MW_Da > 0 ? eps_280 / MW_Da : 0;

    mwResEl.textContent = 'Molecular Weight = ' + MW_kDa.toFixed(1) + ' kDa (' + Math.round(MW_Da).toLocaleString() + ' Da)';
    extResEl.textContent = 'ε₂₈₀ = ' + Math.round(eps_280).toLocaleString() + ' M⁻¹·cm⁻¹ | 1 mg/mL gives A₂₈₀ = ' + A_1mg_mL.toFixed(3) + ' (4 Trp, 10 Tyr residues)';
  }

  [aaEl, trpEl, tyrEl].forEach(el => el.addEventListener('input', update));
  update();
})();