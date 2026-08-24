(() => {
  'use strict';
  const gsEl = document.getElementById('sp-gs'), eEl = document.getElementById('sp-e'), wEl = document.getElementById('sp-w');
  const dnResEl = document.getElementById('sp-res-dens'), prResEl = document.getElementById('sp-res-por');

  const gamma_w = 9.80665; // kN / m^3

  function update() {
    const G_s = parseFloat(gsEl.value), e = parseFloat(eEl.value), w_pct = parseFloat(wEl.value);
    if (isNaN(G_s) || isNaN(e) || isNaN(w_pct) || G_s <= 0 || e <= 0 || w_pct < 0) return;

    const w = w_pct / 100.0;

    // Porosity: n = e / (1 + e)
    const n = e / (1.0 + e);
    const n_pct = n * 100.0;

    // Dry unit weight: gamma_d = G_s * gamma_w / (1 + e)
    const gamma_d = (G_s * gamma_w) / (1.0 + e);

    // Total moist unit weight: gamma = gamma_d * (1 + w)
    const gamma_moist = gamma_d * (1.0 + w);

    // Saturated unit weight (Sr = 1.0): gamma_sat = (G_s + e) * gamma_w / (1 + e)
    const gamma_sat = ((G_s + e) * gamma_w) / (1.0 + e);

    // Submerged buoyant unit weight: gamma_prime = gamma_sat - gamma_w
    const gamma_prime = gamma_sat - gamma_w;

    // Degree of saturation: S_r = w * G_s / e
    const S_r_pct = (w * G_s / e) * 100.0;

    dnResEl.textContent = 'Moist Bulk γ = ' + gamma_moist.toFixed(2) + ' kN/m³ (Dry γ_d = ' + gamma_d.toFixed(2) + ' kN/m³)';
    prResEl.textContent = 'Porosity n = ' + n_pct.toFixed(2) + '% | γ_sat = ' + gamma_sat.toFixed(2) + ' kN/m³ | γ' = ' + gamma_prime.toFixed(2) + ' kN/m³ (S_r = ' + S_r_pct.toFixed(1) + '%)';
  }

  [gsEl, eEl, wEl].forEach(el => el.addEventListener('input', update));
  update();
})();