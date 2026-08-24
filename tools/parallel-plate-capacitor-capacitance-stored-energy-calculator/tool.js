(() => {
  'use strict';
  const aEl = document.getElementById('cp-area'), dEl = document.getElementById('cp-d');
  const kEl = document.getElementById('cp-kappa'), vEl = document.getElementById('cp-volt');
  const capResEl = document.getElementById('cp-res-cap'), enResEl = document.getElementById('cp-res-en');

  const eps_0 = 8.8541878128e-12; // F / m

  function update() {
    const Area_cm2 = parseFloat(aEl.value), d_mm = parseFloat(dEl.value);
    const kappa = parseFloat(kEl.value), V = parseFloat(vEl.value);

    if (isNaN(Area_cm2) || isNaN(d_mm) || isNaN(kappa) || isNaN(V) || Area_cm2 <= 0 || d_mm <= 0 || kappa < 1 || V < 0) return;

    const Area_m2 = Area_cm2 * 1e-4;
    const d_m = d_mm / 1000.0;

    // Capacitance: C = kappa * eps_0 * Area / d  [Farads]
    const C_farads = (kappa * eps_0 * Area_m2) / d_m;
    const C_pF = C_farads * 1e12;

    // Stored Energy: U = 0.5 * C * V^2  [Joules]
    const U_joules = 0.5 * C_farads * Math.pow(V, 2);
    const U_uJ = U_joules * 1e6;

    // Stored Charge: Q = C * V  [Coulombs]
    const Q_nC = C_farads * V * 1e9;

    // Electric field: E = V / d  [V / m]
    const E_kV_m = (V / d_m) / 1000.0;

    capResEl.textContent = 'Capacitance C = ' + (C_pF >= 1000 ? (C_pF/1000).toFixed(2) + ' nF' : C_pF.toFixed(1) + ' pF');
    enResEl.textContent = 'Stored Energy U = ' + U_uJ.toFixed(3) + ' μJ | Charge Q = ' + Q_nC.toFixed(2) + ' nC | Field E = ' + E_kV_m.toFixed(1) + ' kV/m (κ = ' + kappa + ')';
  }

  [aEl, dEl, kEl, vEl].forEach(el => el.addEventListener('input', update));
  update();
})();