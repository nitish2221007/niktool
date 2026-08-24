(() => {
  'use strict';
  const klaEl = document.getElementById('kla-val'), csEl = document.getElementById('kla-cstar'), clEl = document.getElementById('kla-cl');
  const otrResEl = document.getElementById('kla-res-otr'), mmResEl = document.getElementById('kla-res-mmol');

  function update() {
    const kla = parseFloat(klaEl.value), C_star = parseFloat(csEl.value), C_L = parseFloat(clEl.value);
    if (isNaN(kla) || isNaN(C_star) || isNaN(C_L) || kla <= 0 || C_star <= C_L || C_L < 0) return;

    // Driving concentration gradient delta_C = C* - C_L  [mg / L]
    const delta_C = C_star - C_L;

    // Oxygen Transfer Rate OTR = k_L_a * (C* - C_L)  [mg / (L * h)]
    const OTR_mg_l_h = kla * delta_C;

    // Molar OTR in mmol / (L * h) (Molecular weight O2 = 32 mg / mmol)
    const OTR_mmol_l_h = OTR_mg_l_h / 32.0;

    // Supported dry cell biomass estimation (typical OUR = 0.5 mmol O2 / g dry cell * h):
    const maxBiomass = OTR_mmol_l_h / 0.50;

    otrResEl.textContent = 'OTR = ' + OTR_mg_l_h.toFixed(1) + ' mg / (L·h)';
    mmResEl.textContent = OTR_mmol_l_h.toFixed(1) + ' mmol O₂/(L·h) (Driving Force ΔC = ' + delta_C.toFixed(2) + ' mg/L | Supports ~' + Math.round(maxBiomass) + ' g/L Cells @ k_L·a = ' + kla + ' h⁻¹)';
  }

  [klaEl, csEl, clEl].forEach(el => el.addEventListener('input', update));
  update();
})();