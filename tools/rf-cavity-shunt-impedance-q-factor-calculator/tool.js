(() => {
  'use strict';
  const vEl = document.getElementById('rfc-v'), rEl = document.getElementById('rfc-rs'), qEl = document.getElementById('rfc-q');
  const pResEl = document.getElementById('rfc-res-pwr'), rqResEl = document.getElementById('rfc-res-roq');

  function update() {
    const vMv = parseFloat(vEl.value), rsMohm = parseFloat(rEl.value), Q0 = parseFloat(qEl.value);
    if (isNaN(vMv) || isNaN(rsMohm) || isNaN(Q0) || vMv <= 0 || rsMohm <= 0 || Q0 <= 0) return;

    const vVolts = vMv * 1e6;
    const rsOhms = rsMohm * 1e6;
    const pWatts = (Math.pow(vVolts, 2)) / (2 * rsOhms);
    const pKw = pWatts / 1000;
    const roq = rsOhms / Q0;

    pResEl.textContent = pKw.toFixed(1) + ' kW Dissipated (' + (pKw >= 1000 ? (pKw / 1000).toFixed(2) + ' MW' : pKw.toFixed(1) + ' kW') + ')';
    rqResEl.textContent = 'R / Q = ' + roq.toFixed(1) + ' Ω (Quality Factor Q₀ = ' + (Q0 >= 1e6 ? Q0.toExponential(1) : Math.round(Q0).toLocaleString()) + ')';
  }

  [vEl, rEl, qEl].forEach(el => el.addEventListener('input', update));
  update();
})();