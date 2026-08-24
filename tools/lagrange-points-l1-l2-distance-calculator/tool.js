(() => {
  'use strict';
  const sysEl = document.getElementById('lag-sys');
  const dResEl = document.getElementById('lag-res-dist'), mResEl = document.getElementById('lag-res-jwst');

  function update() {
    const [distKm, m1, m2, name] = sysEl.value.split(',');
    const R = parseFloat(distKm), M1 = parseFloat(m1), M2 = parseFloat(m2);

    // First-order Hill approximation for collinear points L1/L2:
    // r_L ≈ R * (M2 / (3 * M1))^(1/3)
    const rL = R * Math.pow(M2 / (3 * M1), 1 / 3);

    dResEl.textContent = Math.round(rL).toLocaleString() + ' km (' + (rL / R * 100).toFixed(2) + '% of Orbital Distance)';

    if (name === 'JWST') {
      mResEl.textContent = 'Sun-Earth L2 (JWST) & L1 (Solar DSCOVR / SOHO Observatories)';
    } else if (name === 'Artemis') {
      mResEl.textContent = 'Earth-Moon L2 / Halo Orbits (NASA Artemis Gateway Station)';
    } else {
      mResEl.textContent = 'Interplanetary Libration Point in Deep Space';
    }
  }

  sysEl.addEventListener('change', update);
  update();
})();