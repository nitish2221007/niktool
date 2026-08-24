(() => {
  'use strict';
  const latEl = document.getElementById('ek-lat'), azEl = document.getElementById('ek-az'), tauEl = document.getElementById('ek-tau');
  const deResEl = document.getElementById('ek-res-de'), trResEl = document.getElementById('ek-res-trans');

  const omega = 7.2921159e-5;

  function update() {
    const lat = parseFloat(latEl.value), Az = parseFloat(azEl.value), tau = parseFloat(tauEl.value);
    if (isNaN(lat) || isNaN(Az) || isNaN(tau) || Math.abs(lat) === 0 || Math.abs(lat) > 90 || Az <= 0 || tau <= 0) return;

    const latRad = (lat * Math.PI) / 180;
    const f = 2 * omega * Math.sin(latRad);
    const absF = Math.abs(f);

    const DE = Math.PI * Math.sqrt((2 * Az) / absF);
    const ME = tau / absF;

    const deflectDir = lat > 0 ? '90° to the Right (Northern Hemisphere)' : '90° to the Left (Southern Hemisphere)';

    deResEl.textContent = DE.toFixed(1) + ' m Ekman Depth';
    trResEl.textContent = 'Net Transport: ' + Math.round(ME).toLocaleString() + ' kg/(m·s) (' + deflectDir + ')';
  }

  [latEl, azEl, tauEl].forEach(el => el.addEventListener('input', update));
  update();
})();