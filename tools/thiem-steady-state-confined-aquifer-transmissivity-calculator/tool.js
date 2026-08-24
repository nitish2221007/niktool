(() => {
  'use strict';
  const qEl = document.getElementById('tm-q'), r1El = document.getElementById('tm-r1');
  const r2El = document.getElementById('tm-r2'), dhEl = document.getElementById('tm-dh'), bEl = document.getElementById('tm-b');
  const tResEl = document.getElementById('tm-res-t'), kResEl = document.getElementById('tm-res-k');

  function update() {
    const Q = parseFloat(qEl.value), r1 = parseFloat(r1El.value);
    const r2 = parseFloat(r2El.value), dh = parseFloat(dhEl.value), b = parseFloat(bEl.value);

    if (isNaN(Q) || isNaN(r1) || isNaN(r2) || isNaN(dh) || isNaN(b) || Q <= 0 || r1 <= 0 || r2 <= r1 || dh <= 0 || b <= 0) return;

    // Thiem equation: T = ( Q * ln(r2 / r1) ) / ( 2 * pi * dh )  [m^2 / day]
    const T = (Q * Math.log(r2 / r1)) / (2.0 * Math.PI * dh);

    // Hydraulic conductivity: K = T / b  [m / day]
    const K_m_day = T / b;
    const K_m_s = K_m_day / 86400.0;

    tResEl.textContent = 'Transmissivity T = ' + T.toFixed(1) + ' m² / day';
    kResEl.textContent = 'Conductivity K = ' + K_m_day.toFixed(2) + ' m/day (' + K_m_s.toExponential(2) + ' m/s @ b=' + b + ' m)';
  }

  [qEl, r1El, r2El, dhEl, bEl].forEach(el => el.addEventListener('input', update));
  update();
})();