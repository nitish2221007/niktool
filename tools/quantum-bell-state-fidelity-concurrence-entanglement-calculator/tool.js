(() => {
  'use strict';
  const stEl = document.getElementById('bell-state'), pEl = document.getElementById('bell-purity');
  const sResEl = document.getElementById('bell-res-s'), fidResEl = document.getElementById('bell-res-fid');

  const max_chsh = 2.0 * Math.sqrt(2.0); // 2.828427 Tsirelson's bound

  function update() {
    const p = parseFloat(pEl.value);
    if (isNaN(p) || p < 0 || p > 1.0) return;

    // Werner state parameterization: S = p * 2*sqrt(2)
    const S = p * max_chsh;

    // State fidelity F = (1 + 3*p) / 4
    const fidelity = (1.0 + (3.0 * p)) / 4.0;
    const fidelity_pct = fidelity * 100.0;

    // Concurrence C = max(0, (3p - 1)/2)
    const concurrence = Math.max(0.0, (3.0 * p - 1.0) / 2.0);

    let status = '';
    let color = '#22543d';

    if (S > 2.0) {
      status = 'QUANTUM NON-LOCALITY PROVEN (S = ' + S.toFixed(3) + ' > 2.0 Classical Limit: Einstein-Podolsky-Rosen Local Realism Disproven!)';
      color = '#22543d';
    } else {
      status = 'CLASSICALLY EXPLAINABLE (S ≤ 2.0: Werner state noise obscures quantum entanglement)';
      color = '#d97706';
    }

    sResEl.textContent = 'CHSH S = ' + S.toFixed(3) + ' (Tsirelson Bound: 2.828)';
    sResEl.style.color = color;
    fidResEl.textContent = status + ' | Entanglement Concurrence C = ' + concurrence.toFixed(2) + ' (Fidelity F = ' + fidelity_pct.toFixed(1) + '%)';
    fidResEl.style.color = color;
  }

  stEl.addEventListener('change', update);
  pEl.addEventListener('input', update);
  update();
})();