(() => {
  'use strict';
  const uEl = document.getElementById('ct-u'), hEl = document.getElementById('ct-h');
  const muEl = document.getElementById('ct-mu'), aEl = document.getElementById('ct-area');
  const tauResEl = document.getElementById('ct-res-tau'), dgResEl = document.getElementById('ct-res-drag');

  function update() {
    const U = parseFloat(uEl.value), h_mm = parseFloat(hEl.value);
    const mu = parseFloat(muEl.value), Area = parseFloat(aEl.value);

    if (isNaN(U) || isNaN(h_mm) || isNaN(mu) || isNaN(Area) || U <= 0 || h_mm <= 0 || mu <= 0 || Area <= 0) return;

    const h_m = h_mm / 1000.0;

    // Shear strain rate gamma_dot = U / h  [s^-1]
    const gamma_dot = U / h_m;

    // Shear stress tau = mu * (U / h)  [Pa = N/m^2]
    const tau = mu * gamma_dot;

    // Viscous drag force F = tau * Area  [Newtons]
    const F_drag = tau * Area;

    tauResEl.textContent = 'Wall Shear τ = ' + tau.toFixed(1) + ' Pa (N/m²)';
    dgResEl.textContent = 'Viscous Drag Force F = ' + F_drag.toFixed(1) + ' N | Shear Rate γ̇ = ' + Math.round(gamma_dot).toLocaleString() + ' s⁻¹ (μ = ' + mu + ' Pa·s @ gap ' + h_mm + ' mm)';
  }

  [uEl, hEl, muEl, aEl].forEach(el => el.addEventListener('input', update));
  update();
})();