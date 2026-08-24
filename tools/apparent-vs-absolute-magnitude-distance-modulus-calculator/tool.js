(() => {
  'use strict';
  const mEl = document.getElementById('mag-m'), MEl = document.getElementById('mag-M');
  const dstResEl = document.getElementById('mag-res-dist'), modResEl = document.getElementById('mag-res-mod');

  function update() {
    const m = parseFloat(mEl.value), M = parseFloat(MEl.value);
    if (isNaN(m) || isNaN(M)) return;

    // Distance modulus: mu = m - M
    const mu = m - M;

    // Distance in parsecs: d = 10^( (mu + 5) / 5 )
    const d_pc = Math.pow(10.0, (mu + 5.0) / 5.0);
    const d_ly = d_pc * 3.26156;

    // Brightness flux ratio compared to standard 10 pc: (10 / d)^2 = 10^( -0.4 * mu )
    const flux_ratio = Math.pow(10.0, -0.4 * mu);

    dstResEl.textContent = 'Distance d = ' + (d_pc >= 1e6 ? (d_pc/1e6).toFixed(2) + ' Mpc' : (d_pc >= 1000 ? (d_pc/1000).toFixed(2) + ' kpc' : d_pc.toFixed(2) + ' pc')) + ' (' + (d_ly >= 1e6 ? (d_ly/1e6).toFixed(2) + ' Mly' : d_ly.toFixed(1) + ' Light-Years)');
    modResEl.textContent = 'Distance Modulus μ = ' + mu.toFixed(2) + ' | Flux = ' + flux_ratio.toFixed(2) + '× (m = ' + m + ', M = ' + M + ')';
  }

  mEl.addEventListener('input', update);
  MEl.addEventListener('input', update);
  update();
})();