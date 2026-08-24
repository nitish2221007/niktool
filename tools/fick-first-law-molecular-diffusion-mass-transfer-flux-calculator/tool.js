(() => {
  'use strict';
  const dEl = document.getElementById('fk-d'), dcEl = document.getElementById('fk-dc'), dxEl = document.getElementById('fk-dx');
  const jResEl = document.getElementById('fk-res-j'), grResEl = document.getElementById('fk-res-grad');

  function update() {
    const D = parseFloat(dEl.value), dC = parseFloat(dcEl.value), dx_mm = parseFloat(dxEl.value);
    if (isNaN(D) || isNaN(dC) || isNaN(dx_mm) || D <= 0 || dC <= 0 || dx_mm <= 0) return;

    const dx_m = dx_mm / 1000.0;
    // Concentration gradient = dC / dx  [mol / m^4]
    const grad = dC / dx_m;

    // Fick's First Law: J = D * (dC / dx)  [mol / (m^2 * s)]
    const J = D * grad;

    jResEl.textContent = 'Flux J = ' + J.toExponential(2) + ' mol / (m²·s)';
    grResEl.textContent = 'Concentration Gradient = ' + Math.round(grad).toLocaleString() + ' mol/m⁴ (Diffusivity D = ' + D.toExponential(2) + ' m²/s @ Δx = ' + dx_mm + ' mm)';
  }

  [dEl, dcEl, dxEl].forEach(el => el.addEventListener('input', update));
  update();
})();