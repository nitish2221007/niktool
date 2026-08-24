(() => {
  'use strict';
  const kEl = document.getElementById('gd-k'), muEl = document.getElementById('gd-mu');
  const dEl = document.getElementById('gd-d'), tEl = document.getElementById('gd-t'), rtEl = document.getElementById('gd-ratio');
  const lResEl = document.getElementById('gd-res-l'), alResEl = document.getElementById('gd-res-alpha');

  function update() {
    const K = parseFloat(kEl.value), mu = parseFloat(muEl.value);
    const d = parseFloat(dEl.value), t = parseFloat(tEl.value), ratio = parseFloat(rtEl.value);

    if (isNaN(K) || isNaN(mu) || isNaN(d) || isNaN(t) || isNaN(ratio) || K <= 0 || mu <= 0 || d <= 0 || t <= 0 || ratio <= 0 || ratio >= 1) return;

    // Glover-Dumm equation: h_t / h_0 = ( 4 / pi ) * exp( - alpha * t )
    // alpha = ( 1 / t ) * ln( (4 / pi) / (h_t / h_0) )
    const alpha = (1.0 / t) * Math.log((4.0 / Math.PI) / ratio);
    if (alpha <= 0) return;

    // alpha = ( pi^2 * K * d ) / ( mu * L^2 ) => L = sqrt( (pi^2 * K * d) / (mu * alpha) )
    const L = Math.sqrt((Math.pow(Math.PI, 2) * K * d) / (mu * alpha));

    lResEl.textContent = 'Drain Spacing L = ' + L.toFixed(1) + ' m';
    alResEl.textContent = 'Reaction Factor α = ' + alpha.toFixed(3) + ' day⁻¹ | ' + (ratio * 100).toFixed(0) + '% drop in ' + t + ' days (K=' + K + ' m/day, d=' + d + ' m)';
  }

  [kEl, muEl, dEl, tEl, rtEl].forEach(el => el.addEventListener('input', update));
  update();
})();