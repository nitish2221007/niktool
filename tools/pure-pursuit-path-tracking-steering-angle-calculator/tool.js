(() => {
  'use strict';
  const ldEl = document.getElementById('pp-ld'), aEl = document.getElementById('pp-alpha'), lEl = document.getElementById('pp-l');
  const dResEl = document.getElementById('pp-res-delta'), cResEl = document.getElementById('pp-res-curv');

  function update() {
    const ld = parseFloat(ldEl.value), alphaDeg = parseFloat(aEl.value), L = parseFloat(lEl.value);
    if (isNaN(ld) || isNaN(alphaDeg) || isNaN(L) || ld <= 0 || L <= 0) return;

    const alphaRad = (alphaDeg * Math.PI) / 180;

    // Path curvature kappa = (2 * sin(alpha)) / ld  [m^-1]
    const kappa = (2 * Math.sin(alphaRad)) / ld;

    // Steering angle delta = atan( kappa * L ) = atan( (2 * L * sin(alpha)) / ld )
    const deltaRad = Math.atan(kappa * L);
    const deltaDeg = (deltaRad * 180) / Math.PI;

    // Turning radius R = 1 / kappa
    const turnRadius = Math.abs(kappa) > 1e-4 ? 1 / Math.abs(kappa) : 999.9;

    dResEl.textContent = 'Steering δ = ' + (deltaDeg >= 0 ? '+' : '') + deltaDeg.toFixed(1) + '° (' + (deltaRad).toFixed(3) + ' rad)';
    cResEl.textContent = 'Path Curvature κ = ' + kappa.toFixed(3) + ' m⁻¹ (Arc Radius R = ' + (turnRadius > 500 ? 'Straight' : turnRadius.toFixed(2) + ' m') + ')';
  }

  [ldEl, aEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();