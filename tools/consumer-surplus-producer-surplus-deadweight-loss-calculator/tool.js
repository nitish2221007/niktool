(() => {
  'use strict';
  const pmaxEl = document.getElementById('cs-pmax'), pminEl = document.getElementById('cs-pmin');
  const peqEl = document.getElementById('cs-peq'), qeqEl = document.getElementById('cs-qeq');
  const totResEl = document.getElementById('cs-res-tot'), brkResEl = document.getElementById('cs-res-break');

  function update() {
    const P_max = parseFloat(pmaxEl.value), P_min = parseFloat(pminEl.value);
    const P_eq = parseFloat(peqEl.value), Q_eq = parseFloat(qeqEl.value);

    if (isNaN(P_max) || isNaN(P_min) || isNaN(P_eq) || isNaN(Q_eq) || P_max <= P_eq || P_eq <= P_min || Q_eq <= 0) return;

    // Consumer surplus CS = 0.5 * ( P_max - P_eq ) * Q_eq
    const CS = 0.5 * (P_max - P_eq) * Q_eq;

    // Producer surplus PS = 0.5 * ( P_eq - P_min ) * Q_eq
    const PS = 0.5 * (P_eq - P_min) * Q_eq;

    const totalSurplus = CS + PS;

    totResEl.textContent = 'Total Welfare = $' + Math.round(totalSurplus).toLocaleString();
    brkResEl.textContent = 'Consumer CS = $' + Math.round(CS).toLocaleString() + ' (' + (CS/totalSurplus*100).toFixed(1) + '%) | Producer PS = $' + Math.round(PS).toLocaleString() + ' (' + (PS/totalSurplus*100).toFixed(1) + '%)';
  }

  [pmaxEl, pminEl, peqEl, qeqEl].forEach(el => el.addEventListener('input', update));
  update();
})();