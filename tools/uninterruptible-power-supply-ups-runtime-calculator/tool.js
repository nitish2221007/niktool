(() => {
  'use strict';
  const ldEl = document.getElementById('ups-load'), vEl = document.getElementById('ups-volt'), ahEl = document.getElementById('ups-ah');
  const mResEl = document.getElementById('ups-res-mins'), whResEl = document.getElementById('ups-res-wh');

  function update() {
    const loadW = parseFloat(ldEl.value), volt = parseFloat(vEl.value), ah = parseFloat(ahEl.value);
    if (isNaN(loadW) || isNaN(volt) || isNaN(ah) || loadW <= 0 || volt <= 0 || ah <= 0) return;

    // Total Wh = Volt * Ah
    const totalWh = volt * ah;
    // Inverter efficiency ~ 85%
    const usableWh = totalWh * 0.85;

    // Runtime hours = usableWh / loadW
    const runHours = usableWh / loadW;
    const runMins = Math.round(runHours * 60);

    mResEl.textContent = runMins >= 60 ? (runMins / 60).toFixed(1) + ' Hours (' + runMins + ' Mins)' : runMins + ' Minutes';
    whResEl.textContent = Math.round(totalWh) + ' Wh (' + Math.round(usableWh) + ' Wh usable @ 85% eff)';
  }

  [ldEl, vEl, ahEl].forEach(el => el.addEventListener('input', update));
  update();
})();