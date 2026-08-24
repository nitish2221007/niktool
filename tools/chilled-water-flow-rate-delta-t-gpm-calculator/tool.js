(() => {
  'use strict';
  const tEl = document.getElementById('chw-tons'), dtEl = document.getElementById('chw-dt');
  const gpmResEl = document.getElementById('chw-res-gpm'), pipResEl = document.getElementById('chw-res-pipe');

  function update() {
    const tons = parseFloat(tEl.value), dt = parseFloat(dtEl.value);
    if (isNaN(tons) || isNaN(dt) || tons <= 0 || dt <= 0) return;

    // GPM = (Tons * 24) / Delta_T
    const gpm = (tons * 24) / dt;
    const lps = gpm * 0.0630902;
    const gpmPerTon = gpm / tons;

    // Sizing pipe for ~6 to 8 ft/sec water velocity
    let pipeSize = '';
    if (gpm <= 60) pipeSize = '2" Pipe (up to 60 GPM)';
    else if (gpm <= 120) pipeSize = '3" Pipe (up to 120 GPM)';
    else if (gpm <= 250) pipeSize = '4" Pipe (up to 250 GPM)';
    else if (gpm <= 650) pipeSize = '6" Pipe (up to 650 GPM)';
    else if (gpm <= 1200) pipeSize = '8" Pipe (up to 1200 GPM)';
    else pipeSize = '10" to 12" Pipe Header';

    gpmResEl.textContent = gpm.toFixed(1) + ' GPM (' + lps.toFixed(1) + ' L/s, ' + gpmPerTon.toFixed(2) + ' GPM/Ton)';
    pipResEl.textContent = pipeSize;
  }

  tEl.addEventListener('input', update);
  dtEl.addEventListener('change', update);
  update();
})();