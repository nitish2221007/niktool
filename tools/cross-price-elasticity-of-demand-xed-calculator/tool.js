(() => {
  'use strict';
  const dpEl = document.getElementById('xed-dp'), dqEl = document.getElementById('xed-dq');
  const xResEl = document.getElementById('xed-res-val'), rResEl = document.getElementById('xed-res-rel');

  function update() {
    const pctDP = parseFloat(dpEl.value), pctDQ = parseFloat(dqEl.value);
    if (isNaN(pctDP) || isNaN(pctDQ) || pctDP === 0) return;

    // XED = %dQ_A / %dP_B
    const xed = pctDQ / pctDP;

    xResEl.textContent = 'XED = ' + (xed >= 0 ? '+' : '') + xed.toFixed(2);

    if (xed > 0.1) {
      rResEl.textContent = 'Substitute Goods (XED > 0: Higher Price of B shifts buyers to A)';
      rResEl.style.color = '#22543d';
    } else if (xed < -0.1) {
      rResEl.textContent = 'Complement Goods (XED < 0: Higher Price of B reduces demand for A)';
      rResEl.style.color = '#2563eb';
    } else {
      rResEl.textContent = 'Independent Unrelated Goods (XED ≈ 0)';
      rResEl.style.color = '#64748b';
    }
  }

  dpEl.addEventListener('input', update);
  dqEl.addEventListener('input', update);
  update();
})();