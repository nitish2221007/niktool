(() => {
  'use strict';
  const phEl = document.getElementById('ph-in'), hEl = document.getElementById('ph-hplus');
  const pohResEl = document.getElementById('ph-res-poh'), scResEl = document.getElementById('ph-res-scale');

  function fromPh() {
    const pH = parseFloat(phEl.value);
    if (isNaN(pH) || pH < 0 || pH > 14) return;

    // [H+] = 10^(-pH)
    const H_conc = Math.pow(10, -pH);
    hEl.value = H_conc.toExponential(2);

    // pOH = 14 - pH
    const pOH = 14.0 - pH;
    const OH_conc = Math.pow(10, -pOH);

    let nature = '';
    let color = '#22543d';

    if (pH < 3.0) { nature = 'STRONGLY ACIDIC (pH < 3.0: Stomach Acid / Lemon Juice)'; color = '#c53030'; }
    else if (pH < 6.5) { nature = 'WEAKLY ACIDIC (pH 3.0 - 6.5: Coffee / Rainwater / Milk)'; color = '#ea580c'; }
    else if (pH <= 7.5) { nature = 'NEUTRAL REGIME (pH 6.5 - 7.5: Pure Water / Human Blood pH 7.40)'; color = '#22543d'; }
    else if (pH <= 11.0) { nature = 'WEAKLY BASIC (pH 7.5 - 11.0: Baking Soda / Soap)'; color = '#2563eb'; }
    else { nature = 'STRONGLY BASIC (pH > 11.0: Bleach / Lye / Drain Cleaner)'; color = '#2563eb'; }

    pohResEl.textContent = 'pOH = ' + pOH.toFixed(2) + ' | [OH⁻] = ' + OH_conc.toExponential(2) + ' M';
    scResEl.textContent = nature;
    scResEl.style.color = color;
  }

  phEl.addEventListener('input', fromPh);
  fromPh();
})();