(() => {
  'use strict';
  const kEl = document.getElementById('drc-k'), hEl = document.getElementById('drc-h');
  const dpEl = document.getElementById('drc-dp'), muEl = document.getElementById('drc-mu'), boEl = document.getElementById('drc-bo');
  const qResEl = document.getElementById('drc-res-q'), piResEl = document.getElementById('drc-res-pi');

  function update() {
    const k = parseFloat(kEl.value), h = parseFloat(hEl.value);
    const dP = parseFloat(dpEl.value), mu = parseFloat(muEl.value), Bo = parseFloat(boEl.value);

    if (isNaN(k) || isNaN(h) || isNaN(dP) || isNaN(mu) || isNaN(Bo) || k <= 0 || h <= 0 || dP <= 0 || mu <= 0 || Bo <= 0) return;

    // Assume standard 40-acre drainage re=660ft, rw=0.33ft (4-inch radius) => ln(re/rw) approx 7.60
    const ln_re_rw = 7.60;

    // Oilfield units Darcy equation: q = (0.00708 * k * h * dP) / (mu * Bo * ln(re/rw))  [STB / day]
    const q_stb_day = (0.00708 * k * h * dP) / (mu * Bo * ln_re_rw);
    const pi = q_stb_day / dP;

    qResEl.textContent = Math.round(q_stb_day).toLocaleString() + ' STB / Day (' + (q_stb_day * 0.158987).toFixed(1) + ' m³/day)';
    piResEl.textContent = 'Productivity Index PI = ' + pi.toFixed(2) + ' STB/day/psi (k·h = ' + Math.round(k*h).toLocaleString() + ' mD-ft capacity)';
  }

  [kEl, hEl, dpEl, muEl, boEl].forEach(el => el.addEventListener('input', update));
  update();
})();