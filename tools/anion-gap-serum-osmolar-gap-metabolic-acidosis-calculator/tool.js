(() => {
  'use strict';
  const naEl = document.getElementById('ag-na'), clEl = document.getElementById('ag-cl');
  const hco3El = document.getElementById('ag-hco3'), albEl = document.getElementById('ag-alb');
  const agResEl = document.getElementById('ag-res-ag'), dtResEl = document.getElementById('ag-res-delta');

  function update() {
    const Na = parseFloat(naEl.value), Cl = parseFloat(clEl.value);
    const HCO3 = parseFloat(hco3El.value), Alb = parseFloat(albEl.value);

    if (isNaN(Na) || isNaN(Cl) || isNaN(HCO3) || isNaN(Alb) || Na <= 0 || Cl <= 0 || HCO3 <= 0 || Alb <= 0) return;

    // Uncorrected Anion Gap: AG = Na - (Cl + HCO3)
    const AG = Na - (Cl + HCO3);

    // Albumin corrected AG = AG + 2.5 * (4.0 - Albumin)
    const AG_corr = AG + 2.5 * (4.0 - Alb);

    // Delta-Delta: delta_AG = AG_corr - 12, delta_HCO3 = 24 - HCO3
    const delta_AG = AG_corr - 12.0;
    const delta_HCO3 = 24.0 - HCO3;
    const delta_ratio = delta_HCO3 > 0 ? delta_AG / delta_HCO3 : 1.0;

    let status = '', color = '#22543d';
    if (AG_corr > 12.0) {
      status = 'HIGH ANION GAP (HAGMA: MUDPILES - Ketoacidosis, Lactic Acidosis, Toxins)';
      color = '#c53030';
    } else {
      status = 'NORMAL ANION GAP (NAGMA: Diarrhea, RTA, Saline Infusion)';
      color = '#22543d';
    }

    agResEl.textContent = 'Anion Gap = ' + AG_corr.toFixed(1) + ' mEq / L (' + (AG_corr > 12 ? 'ELEVATED' : 'NORMAL') + ')';
    agResEl.style.color = color;
    dtResEl.textContent = status + ' | Delta Ratio = ' + delta_ratio.toFixed(2) + ' (Albumin: ' + Alb + ' g/dL)';
    dtResEl.style.color = color;
  }

  [naEl, clEl, hco3El, albEl].forEach(el => el.addEventListener('input', update));
  update();
})();