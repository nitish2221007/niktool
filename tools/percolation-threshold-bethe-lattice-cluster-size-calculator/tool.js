(() => {
  'use strict';
  const latEl = document.getElementById('perc-lat'), pEl = document.getElementById('perc-p');
  const sResEl = document.getElementById('perc-res-span'), stResEl = document.getElementById('perc-res-stat');

  const LATTICES = {
    'square':    { pc: 0.5000, beta_exp: 0.138, name: '2D Square Lattice' },
    'cubic':     { pc: 0.2488, beta_exp: 0.418, name: '3D Cubic Lattice' },
    'honeycomb': { pc: 0.6527, beta_exp: 0.138, name: '2D Honeycomb' },
    'bethe3':    { pc: 0.5000, beta_exp: 1.000, name: 'Bethe Tree z=3' }
  };

  function update() {
    const l = LATTICES[latEl.value];
    const p = parseFloat(pEl.value);

    if (isNaN(p) || p <= 0 || p >= 1.0) return;

    let P_inf = 0.0;
    let status = '';
    let color = '#22543d';

    if (p <= l.pc) {
      P_inf = 0.0;
      status = 'SUBCRITICAL / BLOCKED (p ≤ p_c = ' + l.pc.toFixed(4) + ': Only isolated disconnected micro-clusters exist; zero macroscopic conduction)';
      color = '#c53030';
    } else {
      // Near critical scaling P_inf approx = ( (p - pc) / (1 - pc) )^beta
      const reduced = (p - l.pc) / (1.0 - l.pc);
      P_inf = Math.pow(reduced, l.beta_exp);
      const P_inf_pct = P_inf * 100.0;
      status = 'SUPERCRITICAL PERCOLATION (p > p_c: Continuous giant spanning cluster spans from edge to edge with ' + P_inf_pct.toFixed(1) + '% mass density)';
      color = '#22543d';
    }

    sResEl.textContent = 'P_inf = ' + (P_inf * 100).toFixed(1) + '% (Spanning Strength)';
    sResEl.style.color = color;
    stResEl.textContent = status + ' | ' + l.name + ' (Critical Threshold p_c = ' + l.pc.toFixed(4) + ')';
    stResEl.style.color = color;
  }

  latEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();