(() => {
  'use strict';
  const rEl = document.getElementById('th-comp'), gEl = document.getElementById('th-gamma');
  const thEl = document.getElementById('th-thot'), tcEl = document.getElementById('th-tcold');
  const otResEl = document.getElementById('th-res-otto'), crResEl = document.getElementById('th-res-carnot');

  function update() {
    const r = parseFloat(rEl.value), gamma = parseFloat(gEl.value);
    const T_H = parseFloat(thEl.value), T_C = parseFloat(tcEl.value);

    if (isNaN(r) || isNaN(gamma) || isNaN(T_H) || isNaN(T_C) || r <= 1 || gamma <= 1 || T_H <= T_C || T_C <= 0) return;

    // Otto cycle efficiency: eta_otto = 1 - (1 / r^(gamma - 1))
    const eta_otto = (1.0 - (1.0 / Math.pow(r, gamma - 1.0))) * 100.0;

    // Carnot limit: eta_carnot = 1 - (T_C / T_H)
    const eta_carnot = (1.0 - (T_C / T_H)) * 100.0;

    otResEl.textContent = 'Otto Efficiency η = ' + eta_otto.toFixed(2) + '%';
    crResEl.textContent = 'Carnot Limit η_max = ' + eta_carnot.toFixed(2) + '% (T_H: ' + T_H + ' K / T_C: ' + T_C + ' K | r = ' + r + ')';
  }

  [rEl, gEl, thEl, tcEl].forEach(el => el.addEventListener('input', update));
  update();
})();