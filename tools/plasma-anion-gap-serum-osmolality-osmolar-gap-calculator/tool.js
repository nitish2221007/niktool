(() => {
  'use strict';
  const naEl = document.getElementById('ag-na'), clEl = document.getElementById('ag-cl');
  const hcEl = document.getElementById('ag-hc'), gluEl = document.getElementById('ag-glu'), bunEl = document.getElementById('ag-bun');
  const agResEl = document.getElementById('ag-res-ag'), osmResEl = document.getElementById('ag-res-osm');

  function update() {
    const Na = parseFloat(naEl.value), Cl = parseFloat(clEl.value);
    const HCO3 = parseFloat(hcEl.value), Glu = parseFloat(gluEl.value), BUN = parseFloat(bunEl.value);

    if (isNaN(Na) || isNaN(Cl) || isNaN(HCO3) || isNaN(Glu) || isNaN(BUN) || Na <= 0 || Cl <= 0 || HCO3 <= 0) return;

    // Serum anion gap: AG = Na - (Cl + HCO3)
    const Anion_Gap = Na - (Cl + HCO3);

    // Calculated serum osmolality in mOsm/kg:
    // Osm = 2 * Na + (Glu / 18) + (BUN / 2.8)
    const Osmolality = (2.0 * Na) + (Glu / 18.0) + (BUN / 2.8);

    let ag_eval = '', color = '#22543d';
    if (Anion_Gap > 12.0) {
      ag_eval = 'HIGH ANION GAP METABOLIC ACIDOSIS (HAGMA: MUDPILES / GOLDMARK - DKA, Lactic Acidosis, Toxic Alcohols, Uremia)';
      color = '#c53030';
    } else if (Anion_Gap < 6.0) {
      ag_eval = 'LOW ANION GAP (Severe Hypoalbuminemia, Multiple Myeloma IgG Paraproteinemia)';
      color = '#ea580c';
    } else {
      ag_eval = 'NORMAL ANION GAP (Non-Anion Gap / Hyperchloremic: Diarrhea, RTA, Saline Infusion)';
      color = '#22543d';
    }

    agResEl.textContent = 'Anion Gap = ' + Anion_Gap.toFixed(1) + ' mEq / L (' + (Anion_Gap > 12 ? 'ELEVATED HAGMA' : 'NORMAL') + ')';
    agResEl.style.color = color;
    osmResEl.textContent = 'Calculated Osmolality = ' + Osmolality.toFixed(1) + ' mOsm/kg | ' + ag_eval;
  }

  [naEl, clEl, hcEl, gluEl, bunEl].forEach(el => el.addEventListener('input', update));
  update();
})();