(() => {
  'use strict';
  const modEl = document.getElementById('mod-type');
  const lResEl = document.getElementById('mod-res-l'), mResEl = document.getElementById('mod-res-m2');

  const MODS = {
    'h2o':      { L_cm: 2.85, tau_cm2: 27.0, D_cm: 0.16, sa_cm: 0.022, desc: 'PWR / BWR Standard: Compact Core, requires Enriched U-235' },
    'd2o':      { L_cm: 171.0, tau_cm2: 131.0, D_cm: 0.87, sa_cm: 0.00003, desc: 'CANDU Reactor: Natural Uranium Fuel (0.7% U-235) capable' },
    'graphite': { L_cm: 59.0, tau_cm2: 368.0, D_cm: 0.84, sa_cm: 0.00024, desc: 'Gas-Cooled / RBMK: High slowing down Fermi age' },
    'be':       { L_cm: 21.0, tau_cm2: 102.0, D_cm: 0.50, sa_cm: 0.0011, desc: 'High-Flux Compact Neutron Reflector' }
  };

  function update() {
    const m = MODS[modEl.value];
    // Migration area M^2 = L^2 + tau  [cm^2]
    const M2 = Math.pow(m.L_cm, 2) + m.tau_cm2;
    const r_crow = Math.sqrt(6 * M2); // Root mean square crow-flight travel distance

    lResEl.textContent = 'L = ' + m.L_cm.toFixed(2) + ' cm (D = ' + m.D_cm + ' cm, Σ_a = ' + m.sa_cm + ' cm⁻¹)';
    mResEl.textContent = 'M² = ' + Math.round(M2).toLocaleString() + ' cm² (Fermi Age τ = ' + m.tau_cm2 + ' cm² | RMS Travel: ' + r_crow.toFixed(1) + ' cm) - ' + m.desc;
  }

  modEl.addEventListener('change', update);
  update();
})();