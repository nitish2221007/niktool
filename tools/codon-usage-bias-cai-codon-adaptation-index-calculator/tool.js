(() => {
  'use strict';
  const wEl = document.getElementById('cai-w'), lEl = document.getElementById('cai-len');
  const caiResEl = document.getElementById('cai-res-cai'), expResEl = document.getElementById('cai-res-exp');

  function update() {
    const mean_w = parseFloat(wEl.value), L = parseFloat(lEl.value);
    if (isNaN(mean_w) || isNaN(L) || mean_w <= 0 || mean_w > 1 || L <= 0) return;

    // Geometric mean of relative adaptiveness: CAI = ( prod w_i )^(1/L) = exp( (1/L) * sum(ln w_i) )
    const CAI = mean_w;

    let expr = '', color = '#22543d';
    if (CAI >= 0.80) {
      expr = 'HIGH EXPRESSION (CAI ≥ 0.80: Optimal tRNA availability, high ribosomal translation)';
      color = '#22543d';
    } else if (CAI >= 0.60) {
      expr = 'MODERATE EXPRESSION (CAI 0.60 - 0.79: Acceptable protein yield, minor ribosome pausing)';
      color = '#ea580c';
    } else {
      expr = 'POOR EXPRESSION (CAI < 0.60: Rare codon ribosomal stalling / Codon optimization required)';
      color = '#c53030';
    }

    caiResEl.textContent = 'CAI Score = ' + CAI.toFixed(3);
    caiResEl.style.color = color;
    expResEl.textContent = expr;
    expResEl.style.color = color;
  }

  wEl.addEventListener('input', update);
  lEl.addEventListener('input', update);
  update();
})();