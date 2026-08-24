(() => {
  'use strict';
  const naEl = document.getElementById('ag-na'), clEl = document.getElementById('ag-cl'), hcoEl = document.getElementById('ag-hco3');
  const gapResEl = document.getElementById('ag-res-gap'), delResEl = document.getElementById('ag-res-delta');

  function update() {
    const Na = parseFloat(naEl.value), Cl = parseFloat(clEl.value), HCO3 = parseFloat(hcoEl.value);
    if (isNaN(Na) || isNaN(Cl) || isNaN(HCO3) || Na <= 0 || Cl <= 0 || HCO3 <= 0) return;

    // Anion Gap AG = Na - ( Cl + HCO3 )  [mEq / L]
    const AG = Na - (Cl + HCO3);

    // Delta Ratio = ( AG - 12 ) / ( 24 - HCO3 )
    const deltaAG = AG - 12.0;
    const deltaHCO3 = 24.0 - HCO3;
    const deltaRatio = deltaHCO3 !== 0 ? deltaAG / deltaHCO3 : 1.0;

    let diag = '';
    let color = '#22543d';

    if (AG > 12) {
      if (deltaRatio < 0.8) {
        diag = 'MIXED HAGMA + NON-ANION GAP METABOLIC ACIDOSIS (Delta < 0.8: e.g. DKA + Diarrhea / RTA)';
        color = '#ea580c';
      } else if (deltaRatio <= 2.0) {
        diag = 'PURE HIGH ANION GAP METABOLIC ACIDOSIS (Delta 0.8 - 2.0: MUDPILES - Ketoacidosis, Lactic Acidosis, Uremia)';
        color = '#c53030';
      } else {
        diag = 'MIXED HAGMA + METABOLIC ALKALOSIS (Delta > 2.0: e.g. DKA + Vomiting / Diuretic use)';
        color = '#ea580c';
      }
    } else {
      diag = 'NORMAL ANION GAP (AG 8-12 mEq/L: Normal acid-base or Non-Anion Gap Acidosis if HCO₃⁻ is low)';
      color = '#22543d';
    }

    gapResEl.textContent = 'Anion Gap = ' + AG.toFixed(0) + ' mEq/L';
    gapResEl.style.color = AG > 12 ? '#c53030' : '#22543d';
    delResEl.textContent = diag + ' (Delta Ratio = ' + deltaRatio.toFixed(2) + ' | Na: ' + Na + ', Cl: ' + Cl + ', HCO₃⁻: ' + HCO3 + ')';
    delResEl.style.color = color;
  }

  [naEl, clEl, hcoEl].forEach(el => el.addEventListener('input', update));
  update();
})();