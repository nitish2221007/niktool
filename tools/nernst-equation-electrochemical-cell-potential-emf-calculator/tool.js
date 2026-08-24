(() => {
  'use strict';
  const e0El = document.getElementById('ne-e0'), nEl = document.getElementById('ne-n'), qEl = document.getElementById('ne-q');
  const emfResEl = document.getElementById('ne-res-emf'), dgResEl = document.getElementById('ne-res-dg');

  const F = 96485.33; // C / mol e-

  function update() {
    const E0 = parseFloat(e0El.value), n = parseInt(nEl.value, 10), Q = parseFloat(qEl.value);
    if (isNaN(E0) || isNaN(n) || isNaN(Q) || n < 1 || Q <= 0) return;

    // Nernst equation at 298.15 K (25°C): E = E0 - (0.05916 / n) * log10(Q)
    const deltaE = -(0.05916 / n) * Math.log10(Q);
    const E_cell = E0 + deltaE;

    // Delta G = -n * F * E_cell  [J / mol]
    const dG_kJ = (-n * F * E_cell) / 1000.0;

    let status = '', color = '#22543d';

    if (E_cell > 0) {
      status = 'SPONTANEOUS GALVANIC CELL (E > 0: Produces electric current)';
      color = '#22543d';
    } else if (E_cell === 0) {
      status = 'DEAD BATTERY AT EQUILIBRIUM (E = 0: Q = K_eq)';
      color = '#d97706';
    } else {
      status = 'ELECTROLYTIC CELL (E < 0: External voltage required to force reaction)';
      color = '#c53030';
    }

    emfResEl.textContent = 'Cell EMF E = ' + (E_cell >= 0 ? '+' : '') + E_cell.toFixed(3) + ' V (' + status.split(' (')[0] + ')';
    emfResEl.style.color = color;
    dgResEl.textContent = 'ΔG = ' + dG_kJ.toFixed(1) + ' kJ/mol | Nernst Shift = ' + (deltaE >= 0 ? '+' : '') + deltaE.toFixed(3) + ' V @ Q = ' + Q;
    dgResEl.style.color = color;
  }

  [e0El, nEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();