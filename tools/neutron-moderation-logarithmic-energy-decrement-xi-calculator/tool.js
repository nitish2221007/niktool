(() => {
  'use strict';
  const aEl = document.getElementById('nm-a'), e0El = document.getElementById('nm-e0');
  const xiResEl = document.getElementById('nm-res-xi'), clResEl = document.getElementById('nm-res-coll');

  function update() {
    const A = parseFloat(aEl.value), E0_MeV = parseFloat(e0El.value);
    if (isNaN(A) || isNaN(E0_MeV) || A < 1 || E0_MeV <= 0) return;

    let xi = 1.0;
    if (A === 1.0) {
      xi = 1.0; // Exact for hydrogen
    } else {
      // xi = 1 + ( (A - 1)^2 / (2 * A) ) * ln( (A - 1) / (A + 1) )
      const num = Math.pow(A - 1.0, 2);
      const den = 2.0 * A;
      const ln_term = Math.log((A - 1.0) / (A + 1.0));
      xi = 1.0 + ((num / den) * ln_term);
    }

    // Number of collisions to thermalize from E0 (e.g. 2 MeV) to 0.025 eV:
    const E0_eV = E0_MeV * 1e6;
    const E_th_eV = 0.0253; // 293 K thermal energy
    const total_log_drop = Math.log(E0_eV / E_th_eV);
    const N_collisions = Math.ceil(total_log_drop / xi);

    let mod_name = '';
    if (A === 1.0) mod_name = 'Hydrogen (H₂O: ~18 collisions)';
    else if (A === 2.0) mod_name = 'Deuterium (D₂O: ~25 collisions)';
    else if (A === 4.0) mod_name = 'Helium (~43 collisions)';
    else if (A === 9.0) mod_name = 'Beryllium (~86 collisions)';
    else if (A === 12.0) mod_name = 'Carbon (Graphite: ~114 collisions)';
    else if (A === 238.0) mod_name = 'Uranium-238 (~2,170 collisions)';
    else mod_name = 'A = ' + A;

    xiResEl.textContent = 'Energy Decrement ξ = ' + xi.toFixed(3) + ' (' + (xi === 1.0 ? 'Hydrogen Max' : 'A=' + A) + ')';
    clResEl.textContent = 'Collisions = ' + N_collisions + ' (' + mod_name + ' | 2.0 MeV → 0.025 eV: Total ln Drop = ' + total_log_drop.toFixed(2) + ')';
  }

  aEl.addEventListener('input', update);
  e0El.addEventListener('input', update);
  update();
})();