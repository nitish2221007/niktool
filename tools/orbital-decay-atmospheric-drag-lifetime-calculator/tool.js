(() => {
  'use strict';
  const hEl = document.getElementById('od-h'), mEl = document.getElementById('od-m');
  const aEl = document.getElementById('od-a'), cdEl = document.getElementById('od-cd');
  const lsResEl = document.getElementById('od-res-loss'), drResEl = document.getElementById('od-res-drag');

  const mu_earth = 398600.4418e9;
  const r_earth = 6378137;

  function update() {
    const hKm = parseFloat(hEl.value), mKg = parseFloat(mEl.value);
    const aM2 = parseFloat(aEl.value), Cd = parseFloat(cdEl.value);

    if (isNaN(hKm) || isNaN(mKg) || isNaN(aM2) || isNaN(Cd) || hKm <= 100 || mKg <= 0 || aM2 <= 0 || Cd <= 0) return;

    const rOrbit = r_earth + (hKm * 1000);
    const vOrbit = Math.sqrt(mu_earth / rOrbit);

    const H_scale = 50.0;
    const rhoAir = 6e-10 * Math.exp(-(hKm - 175) / H_scale);
    const aDrag = 0.5 * rhoAir * Math.pow(vOrbit, 2) * ((Cd * aM2) / mKg);

    const tOrbit = (2 * Math.PI * rOrbit) / vOrbit;
    const dailyLossMeters = 2 * (aDrag / vOrbit) * rOrbit * (86400 / tOrbit);
    const ballisticCoeff = mKg / (Cd * aM2);

    lsResEl.textContent = (dailyLossMeters >= 1000 ? (dailyLossMeters / 1000).toFixed(2) + ' km / day' : dailyLossMeters.toFixed(1) + ' m / day') + ' Altitude Loss';
    drResEl.textContent = 'Drag: ' + aDrag.toExponential(2) + ' m/s² (Ballistic B = ' + ballisticCoeff.toFixed(1) + ' kg/m², Density ρ = ' + rhoAir.toExponential(1) + ' kg/m³)';
  }

  [hEl, mEl, aEl, cdEl].forEach(el => el.addEventListener('input', update));
  update();
})();