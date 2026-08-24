(() => {
  'use strict';
  const ueEl = document.getElementById('ch-mue'), mEl = document.getElementById('ch-mass');
  const limResEl = document.getElementById('ch-res-lim'), stResEl = document.getElementById('ch-res-stat');

  function update() {
    const mu_e = parseFloat(ueEl.value), M_star = parseFloat(mEl.value);
    if (isNaN(mu_e) || isNaN(M_star) || mu_e <= 0 || M_star <= 0) return;

    // Exact Chandrasekhar mass formula: M_Ch = ( 5.83 / mu_e^2 ) * M_sun  [Solar masses]
    const M_Ch = 5.83 / Math.pow(mu_e, 2);

    let status = '';
    let color = '#22543d';

    if (M_star < M_Ch) {
      const margin = ((M_Ch - M_star) / M_Ch) * 100.0;
      status = 'STABLE WHITE DWARF (M = ' + M_star + ' M_☉ ≤ M_Ch: ' + margin.toFixed(1) + '% stability margin below collapse threshold)';
      color = '#22543d';
    } else {
      status = 'CATASTROPHIC COLLAPSE / TYPE Ia SUPERNOVA (M ≥ M_Ch: Relativistic electron pressure fails -> Neutron star or thermonuclear detonation!)';
      color = '#c53030';
    }

    limResEl.textContent = 'M_Ch = ' + M_Ch.toFixed(3) + ' M_☉ Limit';
    limResEl.style.color = color;
    stResEl.textContent = status + ' | μ_e = ' + mu_e + ' (Carbon/Oxygen core)';
    stResEl.style.color = color;
  }

  ueEl.addEventListener('change', update);
  mEl.addEventListener('input', update);
  update();
})();