(() => {
  'use strict';
  const typeEl = document.getElementById('hz-type'), fEl = document.getElementById('hz-f'), rEl = document.getElementById('hz-r');
  const pResEl = document.getElementById('hz-res-pmax'), tauResEl = document.getElementById('hz-res-tau');

  // Hardened 52100 bearing steel properties:
  const E = 210e9; // Pa
  const nu = 0.30;
  const E_star = E / (2.0 * (1.0 - Math.pow(nu, 2))); // Equivalent modulus = 115.4 GPa

  function update() {
    const isSphere = typeEl.value === 'sphere';
    const F_kN = parseFloat(fEl.value), R_mm = parseFloat(rEl.value);

    if (isNaN(F_kN) || isNaN(R_mm) || F_kN <= 0 || R_mm <= 0) return;

    const F_N = F_kN * 1000.0;
    const R_m = R_mm * 1e-3;

    if (isSphere) {
      // Circular Hertz contact:
      // Contact radius a = [ (3 * F * R) / (4 * E_star) ]^(1/3)  [meters]
      const a_m = Math.pow((3.0 * F_N * R_m) / (4.0 * E_star), 1.0 / 3.0);
      const a_mm = a_m * 1000;

      // Peak pressure p_max = 3 * F / ( 2 * pi * a^2 )  [Pa]
      const p_max_pa = (3.0 * F_N) / (2.0 * Math.PI * Math.pow(a_m, 2));
      const p_max_gpa = p_max_pa / 1e9;

      // Maximum subsurface shear stress tau_max = 0.31 * p_max at depth z = 0.48 * a
      const tau_max_mpa = (0.31 * p_max_pa) / 1e6;
      const z_depth_mm = 0.48 * a_mm;

      pResEl.textContent = 'p_max = ' + p_max_gpa.toFixed(2) + ' GPa (' + Math.round(p_max_gpa * 10000).toLocaleString() + ' bar)';
      tauResEl.textContent = 'Subsurface τ_max = ' + Math.round(tau_max_mpa) + ' MPa @ depth z = ' + z_depth_mm.toFixed(2) + ' mm (Contact Radius a = ' + a_mm.toFixed(2) + ' mm)';
    } else {
      // Cylinder on flat (Line contact L = 20 mm):
      const L_m = 0.020;
      // Semi-width b = sqrt( (4 * F * R) / (pi * L * E_star) )  [meters]
      const b_m = Math.sqrt((4.0 * F_N * R_m) / (Math.PI * L_m * E_star));
      const b_mm = b_m * 1000;

      // Peak line pressure p_max = 2 * F / ( pi * b * L )  [Pa]
      const p_max_pa = (2.0 * F_N) / (Math.PI * b_m * L_m);
      const p_max_gpa = p_max_pa / 1e9;

      const tau_max_mpa = (0.30 * p_max_pa) / 1e6;
      const z_depth_mm = 0.78 * b_mm;

      pResEl.textContent = 'p_max = ' + p_max_gpa.toFixed(2) + ' GPa (Cylinder Line Contact L=20mm)';
      tauResEl.textContent = 'Subsurface τ_max = ' + Math.round(tau_max_mpa) + ' MPa @ depth z = ' + z_depth_mm.toFixed(2) + ' mm (Contact Strip Half-Width b = ' + b_mm.toFixed(2) + ' mm)';
    }
  }

  [typeEl, fEl, rEl].forEach(el => el.addEventListener('input', update));
  typeEl.addEventListener('change', update);
  update();
})();