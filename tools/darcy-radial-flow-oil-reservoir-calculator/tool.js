(() => {
  'use strict';
  const kEl = document.getElementById('rad-k'), hEl = document.getElementById('rad-h');
  const dpEl = document.getElementById('rad-dp'), muEl = document.getElementById('rad-mu'), boEl = document.getElementById('rad-bo');
  const qResEl = document.getElementById('rad-res-q'), piResEl = document.getElementById('rad-res-pi');

  // Assume standard drainage radius re = 660 ft (40-acre spacing), wellbore rw = 0.328 ft (7-7/8" hole)
  const ln_re_rw = Math.log(660 / 0.328); // ~7.607

  function update() {
    const k = parseFloat(kEl.value), h = parseFloat(hEl.value);
    const dP = parseFloat(dpEl.value), mu = parseFloat(muEl.value), Bo = parseFloat(boEl.value);

    if (isNaN(k) || isNaN(h) || isNaN(dP) || isNaN(mu) || isNaN(Bo) || k <= 0 || h <= 0 || dP <= 0 || mu <= 0 || Bo <= 0) return;

    // Darcy field units: q = (7.08e-3 * k * h * dP) / (mu * Bo * ln(re / rw))  [STB / day]
    const qStbDay = (7.08e-3 * k * h * dP) / (mu * Bo * ln_re_rw);
    const pi = qStbDay / dP;
    const m3Day = qStbDay * 0.158987;

    qResEl.textContent = qStbDay.toFixed(1) + ' STB / day (' + m3Day.toFixed(1) + ' m³/d)';
    piResEl.textContent = 'PI = ' + pi.toFixed(3) + ' STB/day/psi (Drainage re = 660 ft)';
  }

  [kEl, hEl, dpEl, muEl, boEl].forEach(el => el.addEventListener('input', update));
  update();
})();