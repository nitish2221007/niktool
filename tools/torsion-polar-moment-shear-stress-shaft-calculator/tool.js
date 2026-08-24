(() => {
  'use strict';
  const tEl = document.getElementById('ts-t'), dEl = document.getElementById('ts-d');
  const lEl = document.getElementById('ts-l'), gEl = document.getElementById('ts-g');
  const tuResEl = document.getElementById('ts-res-tau'), thResEl = document.getElementById('ts-res-theta');

  function update() {
    const T = parseFloat(tEl.value), D_mm = parseFloat(dEl.value);
    const L_m = parseFloat(lEl.value), G_GPa = parseFloat(gEl.value);

    if (isNaN(T) || isNaN(D_mm) || isNaN(L_m) || isNaN(G_GPa) || T <= 0 || D_mm <= 0 || L_m <= 0 || G_GPa <= 0) return;

    const D_m = D_mm * 1e-3;
    const r_m = D_m / 2.0;
    const G_Pa = G_GPa * 1e9;

    // Polar moment of inertia for solid circular shaft: J = pi * D^4 / 32  [m^4]
    const J_m4 = (Math.PI * Math.pow(D_m, 4)) / 32.0;
    const J_cm4 = J_m4 * 1e8;

    // Max surface shear stress: tau = T * r / J = 16 * T / (pi * D^3)  [Pa -> MPa]
    const tau_Pa = (T * r_m) / J_m4;
    const tau_MPa = tau_Pa / 1e6;

    // Angle of twist: theta = T * L / (G * J)  [rad -> deg]
    const theta_rad = (T * L_m) / (G_Pa * J_m4);
    const theta_deg = (theta_rad * 180.0) / Math.PI;

    tuResEl.textContent = 'Max Shear τ = ' + tau_MPa.toFixed(1) + ' MPa';
    thResEl.textContent = 'Angle of Twist θ = ' + theta_deg.toFixed(2) + '° (' + theta_rad.toFixed(4) + ' rad) | Polar J = ' + J_cm4.toFixed(2) + ' cm⁴';
  }

  [tEl, dEl, lEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();