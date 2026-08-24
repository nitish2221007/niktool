(() => {
  'use strict';
  const wiEl = document.getElementById('bnd-wi'), f80El = document.getElementById('bnd-f80');
  const p80El = document.getElementById('bnd-p80'), tphEl = document.getElementById('bnd-tph');
  const wResEl = document.getElementById('bnd-res-w'), pResEl = document.getElementById('bnd-res-pwr');

  function update() {
    const Wi = parseFloat(wiEl.value), F80 = parseFloat(f80El.value);
    const P80 = parseFloat(p80El.value), TPH = parseFloat(tphEl.value);

    if (isNaN(Wi) || isNaN(F80) || isNaN(P80) || isNaN(TPH) || Wi <= 0 || F80 <= P80 || P80 <= 0 || TPH <= 0) return;

    // Bond Third Theory of Comminution: W = 10 * Wi * ( 1/sqrt(P80) - 1/sqrt(F80) )  [kWh / metric tonne]
    const W = 10 * Wi * ((1 / Math.sqrt(P80)) - (1 / Math.sqrt(F80)));
    const powerKw = W * TPH;
    const powerHp = powerKw * 1.34102;

    wResEl.textContent = W.toFixed(2) + ' kWh / tonne (Specific Energy)';
    pResEl.textContent = 'Ball Mill Motor: ' + Math.round(powerKw).toLocaleString() + ' kW (' + Math.round(powerHp).toLocaleString() + ' HP @ ' + TPH + ' TPH Feed)';
  }

  [wiEl, f80El, p80El, tphEl].forEach(el => el.addEventListener('input', update));
  update();
})();