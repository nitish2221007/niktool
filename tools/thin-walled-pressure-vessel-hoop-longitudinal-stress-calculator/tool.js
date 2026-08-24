(() => {
  'use strict';
  const pEl = document.getElementById('pv-p'), rEl = document.getElementById('pv-r'), tEl = document.getElementById('pv-t');
  const hpResEl = document.getElementById('pv-res-hoop'), lgResEl = document.getElementById('pv-res-long');

  function update() {
    const P_bar = parseFloat(pEl.value), r_mm = parseFloat(rEl.value), t_mm = parseFloat(tEl.value);
    if (isNaN(P_bar) || isNaN(r_mm) || isNaN(t_mm) || P_bar <= 0 || r_mm <= 0 || t_mm <= 0) return;

    // Convert bar to MPa: 1 bar = 0.1 MPa
    const P_MPa = P_bar * 0.1;

    // Hoop stress (circumferential): sigma_h = P * r / t  [MPa]
    const sigma_h = (P_MPa * r_mm) / t_mm;

    // Longitudinal stress (axial): sigma_L = P * r / (2 * t)  [MPa]
    const sigma_L = (P_MPa * r_mm) / (2.0 * t_mm);

    const r_over_t = r_mm / t_mm;

    hpResEl.textContent = 'Hoop Stress σ_h = ' + sigma_h.toFixed(1) + ' MPa';
    lgResEl.textContent = 'Longitudinal σ_L = ' + sigma_L.toFixed(1) + ' MPa | Spherical σ = ' + sigma_L.toFixed(1) + ' MPa (r/t = ' + r_over_t.toFixed(1) + (r_over_t >= 10 ? ' Thin-walled ✓' : ' Thick-walled: Use Lamé') + ')';
  }

  [pEl, rEl, tEl].forEach(el => el.addEventListener('input', update));
  update();
})();