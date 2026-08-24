(() => {
  'use strict';
  const lEl = document.getElementById('dt-load'), hEl = document.getElementById('dt-haul');
  const dEl = document.getElementById('dt-dump'), rEl = document.getElementById('dt-ret');
  const tResEl = document.getElementById('dt-res-trucks'), mfResEl = document.getElementById('dt-res-mf');

  function update() {
    const tLoad = parseFloat(lEl.value), tHaul = parseFloat(hEl.value);
    const tDump = parseFloat(dEl.value), tRet = parseFloat(rEl.value);

    if (isNaN(tLoad) || isNaN(tHaul) || isNaN(tDump) || isNaN(tRet) || tLoad <= 0) return;

    // Total truck cycle time t_cycle = tLoad + tHaul + tDump + tRet
    const tCycle = tLoad + tHaul + tDump + tRet;
    // Theoretical exact trucks N = tCycle / tLoad
    const exactN = tCycle / tLoad;
    const roundedN = Math.round(exactN);

    // Match factor MF = (N_trucks * t_load) / (N_loaders * t_cycle)
    const matchFactor = (roundedN * tLoad) / tCycle;

    tResEl.textContent = roundedN + ' Trucks (' + exactN.toFixed(2) + ' Exact)';

    if (matchFactor >= 0.95 && matchFactor <= 1.05) {
      mfResEl.textContent = 'Match Factor = ' + matchFactor.toFixed(2) + ' (Perfect Equilibrium Balance)';
      mfResEl.style.color = '#22543d';
    } else if (matchFactor > 1.05) {
      mfResEl.textContent = 'Match Factor = ' + matchFactor.toFixed(2) + ' (Trucks Wait in Queue for Loader)';
      mfResEl.style.color = '#d97706';
    } else {
      mfResEl.textContent = 'Match Factor = ' + matchFactor.toFixed(2) + ' (Excavator Sits Idle Waiting for Trucks)';
      mfResEl.style.color = '#c53030';
    }
  }

  [lEl, hEl, dEl, rEl].forEach(el => el.addEventListener('input', update));
  update();
})();