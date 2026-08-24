(() => {
  'use strict';
  const meEl = document.getElementById('nz-me'), gEl = document.getElementById('nz-gamma');
  const arResEl = document.getElementById('nz-res-ar'), prResEl = document.getElementById('nz-res-pr');

  function update() {
    const M_e = parseFloat(meEl.value), gamma = parseFloat(gEl.value);
    if (isNaN(M_e) || isNaN(gamma) || M_e < 1.0 || gamma <= 1.0) return;

    // Isentropic Area-Mach Relation:
    // A / A* = (1 / M) * [ (2 / (gamma + 1)) * ( 1 + (gamma - 1)/2 * M^2 ) ]^( (gamma + 1) / (2 * (gamma - 1)) )
    const expTerm = (gamma + 1.0) / (2.0 * (gamma - 1.0));
    const baseTerm = (2.0 / (gamma + 1.0)) * (1.0 + ((gamma - 1.0) / 2.0) * Math.pow(M_e, 2));
    const A_over_Astar = (1.0 / M_e) * Math.pow(baseTerm, expTerm);

    // Isentropic Pressure Ratio: P_e / P_c = [ 1 + (gamma - 1)/2 * M_e^2 ]^( -gamma / (gamma - 1) )
    const p_ratio = Math.pow(1.0 + ((gamma - 1.0) / 2.0) * Math.pow(M_e, 2), -gamma / (gamma - 1.0));

    arResEl.textContent = 'Nozzle Area Ratio ε = A_e / A* = ' + A_over_Astar.toFixed(2);
    prResEl.textContent = 'Pressure Ratio P_e / P_c = ' + p_ratio.toExponential(3) + ' (' + (1.0/p_ratio).toFixed(1) + '× Expansion @ M_e = ' + M_e + ', γ = ' + gamma + ')';
  }

  [meEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();