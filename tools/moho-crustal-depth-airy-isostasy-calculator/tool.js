(() => {
  'use strict';
  const hEl = document.getElementById('iso-h'), t0El = document.getElementById('iso-t0');
  const rcEl = document.getElementById('iso-rhoc'), rmEl = document.getElementById('iso-rhom');
  const mResEl = document.getElementById('iso-res-moho'), rResEl = document.getElementById('iso-res-root');

  function update() {
    const h = parseFloat(hEl.value), T0 = parseFloat(t0El.value);
    const rho_c = parseFloat(rcEl.value), rho_m = parseFloat(rmEl.value);

    if (isNaN(h) || isNaN(T0) || isNaN(rho_c) || isNaN(rho_m) || h <= 0 || T0 <= 0 || rho_c <= 0 || rho_m <= rho_c) return;

    // Airy Isostasy root depth b = h * rho_c / (rho_m - rho_c)
    const deltaRho = rho_m - rho_c;
    const bRoot = h * (rho_c / deltaRho);

    // Total crustal thickness = T0 + h + b
    const totalCrust = T0 + h + bRoot;
    // Moho depth below sea level = T0 + b
    const mohoDepth = T0 + bRoot;

    mResEl.textContent = mohoDepth.toFixed(1) + ' km Moho Depth Below Sea Level';
    rResEl.textContent = 'Sub-Crustal Root: ' + bRoot.toFixed(1) + ' km (Total Crust: ' + totalCrust.toFixed(1) + ' km, Root/Top Ratio: ' + (bRoot/h).toFixed(1) + ':1)';
  }

  [hEl, t0El, rcEl, rmEl].forEach(el => el.addEventListener('input', update));
  update();
})();