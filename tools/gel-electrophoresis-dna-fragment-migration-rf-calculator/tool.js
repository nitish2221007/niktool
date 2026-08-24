(() => {
  'use strict';
  const bEl = document.getElementById('gel-band'), fEl = document.getElementById('gel-front');
  const rfResEl = document.getElementById('gel-res-rf'), bpResEl = document.getElementById('gel-res-bp');

  function update() {
    const d_band = parseFloat(bEl.value), d_front = parseFloat(fEl.value);
    if (isNaN(d_band) || isNaN(d_front) || d_band < 0 || d_front <= 0 || d_band > d_front) return;

    // Retention factor R_f = d_band / d_front
    const Rf = d_band / d_front;

    // Semi-logarithmic approximation for standard 1 kb DNA ladder on 1% agarose:
    // log10(bp) approx = 4.0 - (2.0 * Rf)  => bp = 10^(4.0 - 2*Rf)
    const log_bp = 4.0 - (2.0 * Rf);
    const est_bp = Math.round(Math.pow(10, log_bp));

    rfResEl.textContent = 'R_f = ' + Rf.toFixed(3) + ' (Relative Mobility)';
    bpResEl.textContent = 'Estimated DNA Size ≈ ' + est_bp.toLocaleString() + ' bp (' + (est_bp/1000).toFixed(2) + ' kb @ Band ' + d_band + ' mm / Front ' + d_front + ' mm)';
  }

  bEl.addEventListener('input', update);
  fEl.addEventListener('input', update);
  update();
})();