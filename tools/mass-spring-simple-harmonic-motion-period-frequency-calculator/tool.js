(() => {
  'use strict';
  const mEl = document.getElementById('sh-m'), kEl = document.getElementById('sh-k'), ampEl = document.getElementById('sh-amp');
  const tResEl = document.getElementById('sh-res-t'), enResEl = document.getElementById('sh-res-en');

  function update() {
    const m = parseFloat(mEl.value), k = parseFloat(kEl.value), x_cm = parseFloat(ampEl.value);
    if (isNaN(m) || isNaN(k) || isNaN(x_cm) || m <= 0 || k <= 0 || x_cm < 0) return;

    const x_m = x_cm / 100.0;

    // Angular frequency omega = sqrt( k / m )  [rad / s]
    const omega = Math.sqrt(k / m);

    // Period T = 2 * pi / omega = 2 * pi * sqrt( m / k )  [seconds]
    const T = (2.0 * Math.PI) / omega;
    const freq = 1.0 / T;

    // Max potential energy U_max = 0.5 * k * x^2  [Joules]
    const U_max = 0.5 * k * Math.pow(x_m, 2);

    // Max speed v_max = omega * x  [m / s]
    const v_max = omega * x_m;

    tResEl.textContent = 'Period T = ' + T.toFixed(3) + ' s (f = ' + freq.toFixed(2) + ' Hz)';
    enResEl.textContent = 'Angular ω = ' + omega.toFixed(2) + ' rad/s | Energy U = ' + U_max.toFixed(2) + ' J | Max Velocity v_max = ' + v_max.toFixed(2) + ' m/s @ k = ' + k + ' N/m';
  }

  [mEl, kEl, ampEl].forEach(el => el.addEventListener('input', update));
  update();
})();