(() => {
  'use strict';
  const pEl = document.getElementById('px-p'), uEl = document.getElementById('px-unit');
  const pcResEl = document.getElementById('px-res-pc'), auResEl = document.getElementById('px-res-au');

  function update() {
    let p_input = parseFloat(pEl.value);
    const isMas = uEl.value === 'mas';

    if (isNaN(p_input) || p_input <= 0) return;

    // Convert to arcseconds:
    const p_arcsec = isMas ? p_input / 1000.0 : p_input;

    // Distance in parsecs: d = 1 / p_arcsec
    const d_pc = 1.0 / p_arcsec;
    const d_ly = d_pc * 3.26156;
    const d_au = d_pc * 206264.806;
    const d_km = d_au * 1.495978707e8;

    pcResEl.textContent = 'Distance d = ' + (d_pc >= 1000 ? (d_pc/1000).toFixed(3) + ' kpc' : d_pc.toFixed(3) + ' Parsecs') + ' (' + d_ly.toFixed(3) + ' Light-Years)';
    auResEl.textContent = 'd = ' + Math.round(d_au).toLocaleString() + ' AU (' + d_km.toExponential(3) + ' km | p = ' + p_arcsec.toFixed(4) + ' arcsec)';
  }

  pEl.addEventListener('input', update);
  uEl.addEventListener('change', update);
  update();
})();