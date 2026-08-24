(() => {
  'use strict';
  const qEl = document.getElementById('th-q'), tEl = document.getElementById('th-t'), sEl = document.getElementById('th-s');
  const rEl = document.getElementById('th-r'), tmEl = document.getElementById('th-time');
  const ddResEl = document.getElementById('th-res-dd'), uResEl = document.getElementById('th-res-u');

  function update() {
    const Q = parseFloat(qEl.value), T = parseFloat(tEl.value), S = parseFloat(sEl.value);
    const r = parseFloat(rEl.value), t = parseFloat(tmEl.value);

    if (isNaN(Q) || isNaN(T) || isNaN(S) || isNaN(r) || isNaN(t) || Q <= 0 || T <= 0 || S <= 0 || r <= 0 || t <= 0) return;

    // u = (r^2 * S) / (4 * T * t)
    const u = (Math.pow(r, 2) * S) / (4 * T * t);

    // Well function W(u) approximated via series: W(u) approx = -0.5772 - ln(u) + u - u^2/4 + ...
    let Wu = 0;
    if (u < 1.0) {
      Wu = -0.57721566 - Math.log(u) + u - (Math.pow(u, 2) / 4);
    } else {
      Wu = (Math.exp(-u) / u) * ((Math.pow(u, 2) + 2.334733 * u + 0.250621) / (Math.pow(u, 2) + 3.330657 * u + 1.681534));
    }

    // Drawdown s = (Q / (4 * pi * T)) * W(u)  [meters]
    const sDrawdown = (Q / (4 * Math.PI * T)) * Wu;

    ddResEl.textContent = 's = ' + sDrawdown.toFixed(2) + ' m (' + (sDrawdown * 3.28084).toFixed(1) + ' ft Water Table Drop)';
    uResEl.textContent = 'W(u) = ' + Wu.toFixed(2) + ' | u = ' + u.toExponential(3) + ' (r = ' + r + 'm after ' + t + ' days)';
  }

  [qEl, tEl, sEl, rEl, tmEl].forEach(el => el.addEventListener('input', update));
  update();
})();