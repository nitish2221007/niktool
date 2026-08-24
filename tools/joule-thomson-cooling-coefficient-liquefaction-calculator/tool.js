(() => {
  'use strict';
  const gasEl = document.getElementById('jt-gas'), dpEl = document.getElementById('jt-dp');
  const dtResEl = document.getElementById('jt-res-dt'), cResEl = document.getElementById('jt-res-cool');

  const GASES = {
    'n2':  { mu_jt: +0.25, t_inv: 621, name: 'Nitrogen (N₂)' },
    'ch4': { mu_jt: +0.43, t_inv: 960, name: 'Methane (CH₄)' },
    'air': { mu_jt: +0.22, t_inv: 603, name: 'Compressed Air' },
    'he':  { mu_jt: -0.06, t_inv: 45,  name: 'Helium (He)' },
    'h2':  { mu_jt: -0.03, t_inv: 202, name: 'Hydrogen (H₂)' }
  };

  function update() {
    const g = GASES[gasEl.value];
    const dP = parseFloat(dpEl.value);

    if (isNaN(dP) || dP <= 0) return;

    // Delta_T = mu_JT * (-dP) where expansion is pressure drop
    const deltaT = -g.mu_jt * dP;

    let regime = '';
    let color = '#22543d';

    if (g.mu_jt > 0) {
      regime = 'COOLING REGIME (μ_JT = +' + g.mu_jt + ' K/bar): Throttling produces -' + Math.abs(deltaT).toFixed(1) + '°C cooling drop';
      color = '#22543d';
    } else {
      regime = 'HEATING REGIME (μ_JT = ' + g.mu_jt + ' K/bar): Gas HEATS UP by +' + Math.abs(deltaT).toFixed(1) + '°C upon expansion (Must pre-cool below ' + g.t_inv + ' K)';
      color = '#c53030';
    }

    dtResEl.textContent = 'ΔT = ' + (deltaT > 0 ? '+' : '') + deltaT.toFixed(1) + ' °C (' + (deltaT < 0 ? 'Cooling' : 'Heating') + ')';
    dtResEl.style.color = color;
    cResEl.textContent = regime + ' | Inversion Temp: ' + g.t_inv + ' K (' + (g.t_inv - 273.15).toFixed(0) + '°C)';
    cResEl.style.color = color;
  }

  gasEl.addEventListener('change', update);
  dpEl.addEventListener('input', update);
  update();
})();