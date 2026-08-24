(() => {
  'use strict';
  const hEl = document.getElementById('pel-h'), qEl = document.getElementById('pel-q'), dEl = document.getElementById('pel-d');
  const pResEl = document.getElementById('pel-res-pwr'), jResEl = document.getElementById('pel-res-jet');

  const g = 9.80665;
  const rho_water = 1000;
  const Cv = 0.98;
  const eta = 0.90;

  function update() {
    const H = parseFloat(hEl.value), Q = parseFloat(qEl.value), D = parseFloat(dEl.value);
    if (isNaN(H) || isNaN(Q) || isNaN(D) || H <= 0 || Q <= 0 || D <= 0) return;

    const vJet = Cv * Math.sqrt(2 * g * H);
    const uBucket = 0.46 * vJet;
    const rpm = (uBucket * 60) / (Math.PI * D);

    const pWatts = eta * rho_water * g * Q * H;
    const pKw = pWatts / 1000;
    const pMw = pKw / 1000;

    pResEl.textContent = (pKw >= 1000 ? pMw.toFixed(2) + ' MW' : Math.round(pKw).toLocaleString() + ' kW') + ' (Shaft Power)';
    jResEl.textContent = 'Jet: ' + vJet.toFixed(1) + ' m/s (' + (vJet * 3.6).toFixed(0) + ' km/h) | ' + Math.round(rpm) + ' RPM (Runner D = ' + D + ' m)';
  }

  [hEl, qEl, dEl].forEach(el => el.addEventListener('input', update));
  update();
})();