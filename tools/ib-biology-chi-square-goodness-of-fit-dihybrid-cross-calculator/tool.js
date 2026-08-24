(() => {
  'use strict';
  const mEl = document.getElementById('chi-model');
  const o1El = document.getElementById('chi-o1'), o2El = document.getElementById('chi-o2');
  const o3El = document.getElementById('chi-o3'), o4El = document.getElementById('chi-o4');
  const grpO3 = document.getElementById('chi-grp-o3'), grpO4 = document.getElementById('chi-grp-o4');
  const stResEl = document.getElementById('chi-res-stat'), pResEl = document.getElementById('chi-res-p');

  // Critical values at alpha = 0.05 for df = 1, 2, 3
  const CRIT = { 1: 3.841, 2: 5.991, 3: 7.815 };

  function update() {
    const model = mEl.value;
    const o1 = parseFloat(o1El.value) || 0;
    const o2 = parseFloat(o2El.value) || 0;
    const o3 = parseFloat(o3El.value) || 0;
    const o4 = parseFloat(o4El.value) || 0;

    let observed = [], ratios = [];

    if (model === 'dihybrid') {
      observed = [o1, o2, o3, o4];
      ratios = [9/16, 3/16, 3/16, 1/16];
    } else if (model === 'monohybrid') {
      observed = [o1, o2];
      ratios = [3/4, 1/4];
    } else if (model === 'codominant') {
      observed = [o1, o2, o3];
      ratios = [1/4, 2/4, 1/4];
    } else if (model === 'testcross') {
      observed = [o1, o2, o3, o4];
      ratios = [1/4, 1/4, 1/4, 1/4];
    }

    const totalObs = observed.reduce((a, b) => a + b, 0);
    if (totalObs <= 0) return;

    let chi2 = 0;
    for (let i = 0; i < observed.length; i++) {
      const exp = totalObs * ratios[i];
      chi2 += Math.pow(observed[i] - exp, 2) / exp;
    }

    const df = observed.length - 1;
    const critVal = CRIT[df] || 3.841;

    let decision = '';
    let color = '#22543d';

    if (chi2 <= critVal) {
      decision = 'FAIL TO REJECT H₀ (χ² = ' + chi2.toFixed(3) + ' ≤ Critical ' + critVal + '): Observed data matches expected Mendelian inheritance ratio at p > 0.05';
      color = '#22543d';
    } else {
      decision = 'REJECT H₀ (χ² = ' + chi2.toFixed(3) + ' > Critical ' + critVal + '): Significant deviation! Genes may be linked on the same chromosome or lethal';
      color = '#c53030';
    }

    stResEl.textContent = 'χ² = ' + chi2.toFixed(3) + ' (df = ' + df + ', N = ' + totalObs + ')';
    pResEl.textContent = decision;
    pResEl.style.color = color;
  }

  [mEl, o1El, o2El, o3El, o4El].forEach(el => el.addEventListener('input', update));
  mEl.addEventListener('change', () => {
    if (mEl.value === 'monohybrid') {
      grpO3.style.display = 'none';
      grpO4.style.display = 'none';
    } else if (mEl.value === 'codominant') {
      grpO3.style.display = 'block';
      grpO4.style.display = 'none';
    } else {
      grpO3.style.display = 'block';
      grpO4.style.display = 'block';
    }
    update();
  });
  update();
})();