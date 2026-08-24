(() => {
  'use strict';
  const x0El = document.getElementById('log-x0'), xnEl = document.getElementById('log-xn'), nEl = document.getElementById('log-n');
  const zResEl = document.getElementById('log-res-zeta'), dResEl = document.getElementById('log-res-delta');

  function update() {
    const x0 = parseFloat(x0El.value), xn = parseFloat(xnEl.value), n = parseFloat(nEl.value);
    if (isNaN(x0) || isNaN(xn) || isNaN(n) || x0 <= 0 || xn <= 0 || n <= 0 || xn >= x0) return;

    // Logarithmic decrement delta = (1 / n) * ln(x0 / xn)
    const delta = (1 / n) * Math.log(x0 / xn);

    // Damping ratio zeta = delta / sqrt( 4*pi^2 + delta^2 )
    const zeta = delta / Math.sqrt((4 * Math.pow(Math.PI, 2)) + Math.pow(delta, 2));
    const zetaPct = zeta * 100;

    const dropPct = ((x0 - xn) / x0) * 100;

    zResEl.textContent = 'ζ = ' + zetaPct.toFixed(2) + '% Damping Ratio';
    dResEl.textContent = 'Log Decrement δ = ' + delta.toFixed(4) + ' (' + dropPct.toFixed(1) + '% Decay from ' + x0 + 'mm to ' + xn + 'mm across ' + n + ' Cycles)';
  }

  [x0El, xnEl, nEl].forEach(el => el.addEventListener('input', update));
  update();
})();