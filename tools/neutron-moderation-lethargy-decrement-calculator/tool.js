(() => {
  'use strict';
  const aEl = document.getElementById('mod-a'), e0El = document.getElementById('mod-e0'), ethEl = document.getElementById('mod-eth');
  const nResEl = document.getElementById('mod-res-n'), xiResEl = document.getElementById('mod-res-xi');

  function update() {
    const A = parseFloat(aEl.value), e0Mev = parseFloat(e0El.value), ethEv = parseFloat(ethEl.value);
    if (isNaN(A) || isNaN(e0Mev) || isNaN(ethEv) || A < 1 || e0Mev <= 0 || ethEv <= 0) return;

    const e0Ev = e0Mev * 1e6;
    const u = Math.log(e0Ev / ethEv);

    let xi = 1.0;
    if (Math.abs(A - 1.0) < 0.05) {
      xi = 1.0;
    } else {
      const term1 = Math.pow(A - 1, 2) / (2 * A);
      const term2 = Math.log((A - 1) / (A + 1));
      xi = 1 + (term1 * term2);
    }

    const nCollisions = Math.ceil(u / xi);

    nResEl.textContent = nCollisions + ' Collisions to Thermal Energy';
    xiResEl.textContent = 'ξ = ' + xi.toFixed(3) + ' (Total Lethargy u = ' + u.toFixed(2) + ')';
  }

  aEl.addEventListener('change', update);
  e0El.addEventListener('input', update);
  ethEl.addEventListener('input', update);
  update();
})();