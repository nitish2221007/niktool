(() => {
  'use strict';
  const vEl = document.getElementById('iv-vol'), hEl = document.getElementById('iv-hrs'), dEl = document.getElementById('iv-drop');
  const gttResEl = document.getElementById('iv-res-gtt'), mlResEl = document.getElementById('iv-res-mlhr');

  function update() {
    const vol_mL = parseFloat(vEl.value), hours = parseFloat(hEl.value);
    const dropFactor = parseInt(dEl.value, 10);

    if (isNaN(vol_mL) || isNaN(hours) || isNaN(dropFactor) || vol_mL <= 0 || hours <= 0) return;

    // Pump rate in mL / h
    const mL_per_hr = vol_mL / hours;

    // Flow rate in gtt / min = ( Volume * Drop Factor ) / ( hours * 60 )
    const totalMins = hours * 60.0;
    const gtt_per_min_raw = (vol_mL * dropFactor) / totalMins;
    const gtt_per_min = Math.round(gtt_per_min_raw);

    // Drop interval in seconds = 60 / gtt_per_min
    const sec_per_drop = 60.0 / gtt_per_min_raw;

    gttResEl.textContent = gtt_per_min + ' gtt / min (Drops)';
    mlResEl.textContent = 'Pump Rate = ' + mL_per_hr.toFixed(0) + ' mL/h (1 drop every ' + sec_per_drop.toFixed(1) + ' s @ ' + dropFactor + ' gtt/mL)';
  }

  [vEl, hEl, dEl].forEach(el => el.addEventListener('input', update));
  dEl.addEventListener('change', update);
  update();
})();