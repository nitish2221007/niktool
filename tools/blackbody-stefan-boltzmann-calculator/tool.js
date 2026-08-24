(() => {
  'use strict';
  const tEl = document.getElementById('sb-temp'), aEl = document.getElementById('sb-area'), eEl = document.getElementById('sb-emis');
  const pEl = document.getElementById('sb-res-power');

  const sigma = 5.670374419e-8; // W / (m^2 * K^4)

  function update() {
    const T = parseFloat(tEl.value), A = parseFloat(aEl.value), eps = parseFloat(eEl.value);
    if (isNaN(T) || isNaN(A) || isNaN(eps) || T <= 0 || A <= 0 || eps <= 0 || eps > 1) return;

    // P = eps * sigma * A * T^4
    const totalWatts = eps * sigma * A * Math.pow(T, 4);
    const fluxWm2 = eps * sigma * Math.pow(T, 4);

    if (fluxWm2 >= 1e6) {
      pEl.textContent = (fluxWm2 / 1e6).toFixed(2) + ' MW/m² (' + (totalWatts / 1e6).toFixed(2) + ' MW total)';
    } else if (fluxWm2 >= 1e3) {
      pEl.textContent = (fluxWm2 / 1e3).toFixed(2) + ' kW/m² (' + (totalWatts / 1e3).toFixed(2) + ' kW total)';
    } else {
      pEl.textContent = fluxWm2.toFixed(1) + ' W/m² (' + totalWatts.toFixed(1) + ' W total)';
    }
  }

  [tEl, aEl, eEl].forEach(el => el.addEventListener('input', update));
  update();
})();