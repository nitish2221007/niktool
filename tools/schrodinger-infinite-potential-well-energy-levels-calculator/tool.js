(() => {
  'use strict';
  const lEl = document.getElementById('qbox-l'), nEl = document.getElementById('qbox-n'), partEl = document.getElementById('qbox-part');
  const enResEl = document.getElementById('qbox-res-en'), trResEl = document.getElementById('qbox-res-trans');

  const h = 6.62607015e-34;     // J * s
  const c = 299792458;          // m / s
  const e_charge = 1.602176634e-19; // J / eV

  const PARTICLES = {
    'electron': { mass: 9.1093837e-31, name: 'Electron' },
    'proton':   { mass: 1.6726219e-27, name: 'Proton' }
  };

  function update() {
    const L_nm = parseFloat(lEl.value), n = parseInt(nEl.value, 10);
    const p = PARTICLES[partEl.value];

    if (isNaN(L_nm) || isNaN(n) || L_nm <= 0 || n < 1) return;

    const L_m = L_nm * 1e-9;

    // E_n = ( n^2 * h^2 ) / ( 8 * m * L^2 )  [Joules]
    const E_n_joules = (Math.pow(n, 2) * Math.pow(h, 2)) / (8.0 * p.mass * Math.pow(L_m, 2));
    const E_n_ev = E_n_joules / e_charge;

    // Ground state energy E_1
    const E_1_ev = E_n_ev / Math.pow(n, 2);

    // Transition from level n to level n+1:
    const n_next = n + 1;
    const E_next_ev = E_1_ev * Math.pow(n_next, 2);
    const deltaE_ev = E_next_ev - E_n_ev;
    const deltaE_joules = deltaE_ev * e_charge;

    // Photon wavelength lambda = h * c / deltaE  [nm]
    const lambda_nm = (h * c / deltaE_joules) * 1e9;

    enResEl.textContent = 'E_' + n + ' = ' + E_n_ev.toFixed(3) + ' eV (' + (E_n_joules).toExponential(2) + ' J | E₁ = ' + E_1_ev.toFixed(3) + ' eV)';
    trResEl.textContent = 'Transition n=' + n + ' -> n=' + n_next + ': ΔE = ' + deltaE_ev.toFixed(3) + ' eV (Emission λ = ' + lambda_nm.toFixed(1) + ' nm)';
  }

  [lEl, nEl].forEach(el => el.addEventListener('input', update));
  partEl.addEventListener('change', update);
  update();
})();