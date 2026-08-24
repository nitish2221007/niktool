(() => {
  'use strict';
  const stcEl = document.getElementById('pv-stc'), tEl = document.getElementById('pv-tamb');
  const irrEl = document.getElementById('pv-irr'), gEl = document.getElementById('pv-gamma');
  const pResEl = document.getElementById('pv-res-pwr'), tmResEl = document.getElementById('pv-res-temp');

  const NOCT = 45.0;

  function update() {
    const Pstc = parseFloat(stcEl.value), Tamb = parseFloat(tEl.value);
    const Irr = parseFloat(irrEl.value), gamma = parseFloat(gEl.value);

    if (isNaN(Pstc) || isNaN(Tamb) || isNaN(Irr) || isNaN(gamma) || Pstc <= 0 || Irr <= 0) return;

    const Tcell = Tamb + (((NOCT - 20) / 800) * Irr);
    const deltaT = Tcell - 25.0;
    const deratePct = (gamma / 100) * deltaT;
    const Pactual = Pstc * (1 + deratePct) * (Irr / 1000);
    const lossPct = Math.abs(deratePct * 100);

    pResEl.textContent = Pactual.toFixed(1) + ' Watts (Actual Output)';
    tmResEl.textContent = 'Cell Temp: ' + Tcell.toFixed(1) + '°C (' + (deratePct < 0 ? '-' : '+') + lossPct.toFixed(1) + '% Thermal Shift @ ' + gamma + '%/°C)';
  }

  [stcEl, tEl, irrEl, gEl].forEach(el => el.addEventListener('input', update));
  update();
})();