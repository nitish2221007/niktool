(() => {
  'use strict';
  const matEl = document.getElementById('coin-mat'), thkEl = document.getElementById('coin-thk');
  const fcResEl = document.getElementById('coin-res-fc'), dResEl = document.getElementById('coin-res-desc');

  const c_sound = 343.0; // m / s

  const PANELS = {
    'glass':    { E_gpa: 70.0,  rho: 2500.0, nu: 0.22, name: 'Float Glass' },
    'gypsum':   { E_gpa: 2.5,   rho: 800.0,  nu: 0.30, name: 'Gypsum Drywall' },
    'steel':    { E_gpa: 200.0, rho: 7850.0, nu: 0.28, name: 'Sheet Steel' },
    'aluminum': { E_gpa: 70.0,  rho: 2700.0, nu: 0.33, name: 'Sheet Aluminum' },
    'plywood':  { E_gpa: 6.0,   rho: 600.0,  nu: 0.25, name: 'Plywood Wood' }
  };

  function update() {
    const p = PANELS[matEl.value];
    const tMm = parseFloat(thkEl.value);

    if (isNaN(tMm) || tMm <= 0) return;

    const tM = tMm * 1e-3;
    const E_pa = p.E_gpa * 1e9;

    // Bending stiffness per unit width B = E * t^3 / ( 12 * (1 - nu^2) )  [N * m]
    const B = (E_pa * Math.pow(tM, 3)) / (12.0 * (1.0 - Math.pow(p.nu, 2)));

    // Surface mass density m = rho * t  [kg / m^2]
    const massDensity = p.rho * tM;

    // Critical coincidence frequency: f_c = ( c^2 / (2 * pi) ) * sqrt( m / B )  [Hz]
    const f_c = (Math.pow(c_sound, 2) / (2 * Math.PI)) * Math.sqrt(massDensity / B);

    fcResEl.textContent = 'f_c = ' + Math.round(f_c).toLocaleString() + ' Hz Coincidence Dip';
    dResEl.textContent = p.name + ' (' + tMm + ' mm: Surface Mass m = ' + massDensity.toFixed(1) + ' kg/m², Bending Stiffness B = ' + B.toFixed(1) + ' N·m)';
  }

  matEl.addEventListener('change', update);
  thkEl.addEventListener('input', update);
  update();
})();