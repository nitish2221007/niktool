(() => {
  'use strict';
  const fEl = document.getElementById('eq-fuel'), afrEl = document.getElementById('eq-afr');
  const phiResEl = document.getElementById('eq-res-phi'), regResEl = document.getElementById('eq-res-reg');

  const FUELS = {
    'gasoline': { stoich_afr: 14.70, name: 'Gasoline Octane' },
    'methane':  { stoich_afr: 17.20, name: 'Methane Gas' },
    'diesel':   { stoich_afr: 14.50, name: 'Diesel #2' },
    'ethanol':  { stoich_afr: 9.00,  name: 'Pure Ethanol' },
    'hydrogen': { stoich_afr: 34.30, name: 'Hydrogen' }
  };

  function update() {
    const f = FUELS[fEl.value];
    const actualAfr = parseFloat(afrEl.value);

    if (isNaN(actualAfr) || actualAfr <= 0) return;

    // Equivalence ratio Phi = (Fuel/Air)_actual / (Fuel/Air)_stoich = AFR_stoich / AFR_actual
    const Phi = f.stoich_afr / actualAfr;
    // Lambda = 1 / Phi = AFR_actual / AFR_stoich
    const Lambda = 1.0 / Phi;

    let regime = '';
    let color = '#22543d';

    if (Math.abs(Phi - 1.0) <= 0.02) {
      regime = 'STOICHIOMETRIC (Φ ≈ 1.00: Perfect complete combustion, peak 3-way catalytic converter efficiency)';
      color = '#22543d';
    } else if (Phi > 1.02) {
      const richPct = (Phi - 1.0) * 100;
      regime = 'RICH REGIME (Φ = ' + Phi.toFixed(3) + ' > 1.0: +' + richPct.toFixed(1) + '% Excess Fuel for maximum torque & chamber cooling)';
      color = '#2563eb';
    } else {
      const leanPct = (1.0 - Phi) * 100;
      regime = 'LEAN REGIME (Φ = ' + Phi.toFixed(3) + ' < 1.0: +' + leanPct.toFixed(1) + '% Excess Air for high thermal efficiency & low CO)';
      color = '#d97706';
    }

    phiResEl.textContent = 'Φ = ' + Phi.toFixed(3) + ' | λ = ' + Lambda.toFixed(3);
    phiResEl.style.color = color;
    regResEl.textContent = regime + ' (' + f.name + ' Stoichiometric AFR = ' + f.stoich_afr.toFixed(2) + ' : 1)';
    regResEl.style.color = color;
  }

  fEl.addEventListener('change', update);
  afrEl.addEventListener('input', update);
  update();
})();