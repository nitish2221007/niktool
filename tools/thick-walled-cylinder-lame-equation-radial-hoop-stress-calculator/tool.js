(() => {
  'use strict';
  const piEl = document.getElementById('lm-pi'), riEl = document.getElementById('lm-ri'), roEl = document.getElementById('lm-ro');
  const inResEl = document.getElementById('lm-res-inner'), otResEl = document.getElementById('lm-res-outer');

  function update() {
    const Pi_bar = parseFloat(piEl.value), ri_mm = parseFloat(riEl.value), ro_mm = parseFloat(roEl.value);
    if (isNaN(Pi_bar) || isNaN(ri_mm) || isNaN(ro_mm) || Pi_bar <= 0 || ri_mm <= 0 || ro_mm <= ri_mm) return;

    // Convert bar to MPa: 1 bar = 0.1 MPa
    const Pi = Pi_bar * 0.1;

    const ri2 = Math.pow(ri_mm, 2);
    const ro2 = Math.pow(ro_mm, 2);
    const den = ro2 - ri2;

    // Lamé constants: A = (Pi * ri^2) / (ro^2 - ri^2), B = (Pi * ri^2 * ro^2) / (ro^2 - ri^2)
    const A = (Pi * ri2) / den;
    const B = (Pi * ri2 * ro2) / den;

    // At inner bore (r = ri):
    // sigma_theta_inner = A + B / ri^2 = Pi * (ro^2 + ri^2) / (ro^2 - ri^2)
    const sigma_theta_inner = (Pi * (ro2 + ri2)) / den;
    const sigma_r_inner = -Pi;

    // At outer surface (r = ro):
    // sigma_theta_outer = 2 * Pi * ri^2 / (ro^2 - ri^2)
    const sigma_theta_outer = (2.0 * Pi * ri2) / den;
    const sigma_r_outer = 0.0;

    inResEl.textContent = 'Inner Bore: σ_θ = +' + sigma_theta_inner.toFixed(1) + ' MPa | σ_r = -' + Pi.toFixed(1) + ' MPa';
    otResEl.textContent = 'Outer Surface: σ_θ = +' + sigma_theta_outer.toFixed(1) + ' MPa | σ_r = 0.0 MPa (Wall Thickness = ' + (ro_mm - ri_mm) + ' mm)';
  }

  [piEl, riEl, roEl].forEach(el => el.addEventListener('input', update));
  update();
})();