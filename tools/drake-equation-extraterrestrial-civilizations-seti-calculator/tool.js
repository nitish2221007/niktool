(() => {
  'use strict';
  const rEl = document.getElementById('dr-r'), fpEl = document.getElementById('dr-fp');
  const neEl = document.getElementById('dr-ne'), flEl = document.getElementById('dr-fl');
  const fiEl = document.getElementById('dr-fi'), fcEl = document.getElementById('dr-fc');
  const lEl = document.getElementById('dr-l');
  const nResEl = document.getElementById('dr-res-n'), dsResEl = document.getElementById('dr-res-dist');

  function update() {
    const R = parseFloat(rEl.value), fp = parseFloat(fpEl.value), ne = parseFloat(neEl.value);
    const fl = parseFloat(flEl.value), fi = parseFloat(fiEl.value), fc = parseFloat(fcEl.value);
    const L = parseFloat(lEl.value);

    if (isNaN(R) || isNaN(fp) || isNaN(ne) || isNaN(fl) || isNaN(fi) || isNaN(fc) || isNaN(L) || R <= 0 || L <= 0) return;

    // Drake equation: N = R * fp * ne * fl * fi * fc * L
    const N = R * fp * ne * fl * fi * fc * L;

    // Milky Way galactic disk volume approx: Radius = 50,000 ly, Height = 1,000 ly => Vol = pi * R^2 * H approx 7.85e12 ly^3
    const Vol_MW = Math.PI * Math.pow(50000.0, 2) * 1000.0;
    const avgDist = N >= 1 ? Math.pow(Vol_MW / N, 1.0 / 3.0) : 100000.0;

    nResEl.textContent = 'N = ' + (N >= 10 ? Math.round(N).toLocaleString() : N.toFixed(2)) + ' Civilizations';
    dsResEl.textContent = 'Estimated Distance to Nearest Neighbor ≈ ' + (N >= 1 ? Math.round(avgDist).toLocaleString() + ' Light-Years' : 'Sole civilization in Galaxy (Rare Earth)') + ' [L = ' + L.toLocaleString() + ' yrs]';
  }

  [rEl, fpEl, neEl, flEl, fiEl, fcEl, lEl].forEach(el => el.addEventListener('input', update));
  update();
})();