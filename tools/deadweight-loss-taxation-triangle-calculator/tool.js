(() => {
  'use strict';
  const taxEl = document.getElementById('dwl-tax'), qPostEl = document.getElementById('dwl-qpost'), dqEl = document.getElementById('dwl-dq');
  const dwResEl = document.getElementById('dwl-res-dwl'), revResEl = document.getElementById('dwl-res-rev');

  function update() {
    const T = parseFloat(taxEl.value), Qtax = parseFloat(qPostEl.value), dQ = parseFloat(dqEl.value);
    if (isNaN(T) || isNaN(Qtax) || isNaN(dQ) || T <= 0 || Qtax <= 0 || dQ <= 0) return;

    // Harberger Triangle Deadweight Loss = 0.5 * T * dQ
    const dwl = 0.5 * T * dQ;
    // Government Tax Revenue = T * Qtax
    const revenue = T * Qtax;
    const lossRatio = (dwl / revenue) * 100;

    dwResEl.textContent = '$' + Math.round(dwl).toLocaleString() + ' Economic Loss (' + lossRatio.toFixed(1) + '% of Revenue)';
    revResEl.textContent = '$' + Math.round(revenue).toLocaleString() + ' Collected (Total Excess Burden: $' + Math.round(dwl).toLocaleString() + ')';
  }

  [taxEl, qPostEl, dqEl].forEach(el => el.addEventListener('input', update));
  update();
})();