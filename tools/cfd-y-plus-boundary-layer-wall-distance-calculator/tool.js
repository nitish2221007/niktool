(() => {
  'use strict';
  const uEl = document.getElementById('yp-u'), lEl = document.getElementById('yp-l');
  const ypEl = document.getElementById('yp-targ'), flEl = document.getElementById('yp-fluid');
  const dyResEl = document.getElementById('yp-res-dy'), reResEl = document.getElementById('yp-res-re');

  const FLUIDS = {
    'air':   { rho: 1.225, nu: 1.51e-5 },
    'water': { rho: 1000.0, nu: 1.00e-6 }
  };

  function update() {
    const f = FLUIDS[flEl.value];
    const U = parseFloat(uEl.value), L = parseFloat(lEl.value), yPlus = parseFloat(ypEl.value);

    if (isNaN(U) || isNaN(L) || isNaN(yPlus) || U <= 0 || L <= 0 || yPlus <= 0) return;

    // Reynolds number Re = (U * L) / nu
    const Re = (U * L) / f.nu;

    // Flat plate turbulent skin friction coefficient: C_f approx = (2 * log10(Re) - 0.65)^(-2.3)
    // Or standard Schlichting formula: C_f = 0.0592 * Re^(-0.2)
    const Cf = 0.0592 * Math.pow(Re, -0.2);

    // Wall shear stress tau_w = 0.5 * rho * U^2 * Cf  [Pa]
    const tau_w = 0.5 * f.rho * Math.pow(U, 2) * Cf;

    // Friction velocity u_tau = sqrt( tau_w / rho ) = U * sqrt( Cf / 2 )  [m / s]
    const u_tau = U * Math.sqrt(Cf / 2);

    // First cell height delta_y = ( yPlus * nu ) / u_tau  [meters]
    const dy_m = (yPlus * f.nu) / u_tau;
    const dy_um = dy_m * 1e6;
    const dy_mm = dy_m * 1000;

    let dyStr = '';
    if (dy_um < 1000) dyStr = dy_um.toFixed(1) + ' μm (' + dy_mm.toFixed(4) + ' mm)';
    else dyStr = dy_mm.toFixed(3) + ' mm (' + Math.round(dy_um) + ' μm)';

    dyResEl.textContent = 'Δy = ' + dyStr + ' (Target y+ = ' + yPlus + ')';
    reResEl.textContent = 'Re = ' + Re.toExponential(2) + ' | u_τ = ' + u_tau.toFixed(2) + ' m/s (C_f = ' + Cf.toFixed(4) + ', τ_w = ' + tau_w.toFixed(1) + ' Pa)';
  }

  [uEl, lEl, ypEl].forEach(el => el.addEventListener('input', update));
  flEl.addEventListener('change', update);
  update();
})();