(() => {
  'use strict';
  const latEl = document.getElementById('utm-lat'), lonEl = document.getElementById('utm-lon'), cmEl = document.getElementById('utm-cm');
  const gResEl = document.getElementById('utm-res-gamma'), kResEl = document.getElementById('utm-res-k');

  const k0 = 0.9996; // Standard UTM central meridian scale factor

  function update() {
    const lat = parseFloat(latEl.value), lon = parseFloat(lonEl.value), cm = parseFloat(cmEl.value);
    if (isNaN(lat) || isNaN(lon) || isNaN(cm) || lat < -80 || lat > 84) return;

    const phiRad = (lat * Math.PI) / 180;
    const dLamDeg = lon - cm;
    const dLamRad = (dLamDeg * Math.PI) / 180;

    // First-order grid convergence: gamma = dLam * sin(phi)
    const gammaDeg = dLamDeg * Math.sin(phiRad);
    const gammaArcMin = gammaDeg * 60;

    // Transverse Mercator scale factor k ≈ k0 * (1 + 0.5 * (dLam * cos phi)^2)
    const k = k0 * (1 + 0.5 * Math.pow(dLamRad * Math.cos(phiRad), 2));

    gResEl.textContent = (gammaDeg >= 0 ? '+' : '') + gammaDeg.toFixed(3) + '° (' + gammaArcMin.toFixed(1) + ' arcmin)';
    kResEl.textContent = 'k = ' + k.toFixed(5) + ' (Grid Distance / Ground Distance)';
  }

  [latEl, lonEl, cmEl].forEach(el => el.addEventListener('input', update));
  update();
})();