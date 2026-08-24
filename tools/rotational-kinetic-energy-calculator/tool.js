(() => {
  'use strict';
  const iEl = document.getElementById('rot-i'), rpmEl = document.getElementById('rot-rpm');
  const kjEl = document.getElementById('rot-res-kj'), oEl = document.getElementById('rot-res-omega'), whEl = document.getElementById('rot-res-wh');

  function update() {
    const I = parseFloat(iEl.value), rpm = parseFloat(rpmEl.value);
    if (isNaN(I) || isNaN(rpm) || I <= 0 || rpm <= 0) return;

    // omega = (2 * pi * RPM) / 60 (rad/s)
    const omega = (2 * Math.PI * rpm) / 60;
    // KE = 0.5 * I * omega^2
    const joules = 0.5 * I * Math.pow(omega, 2);
    const kj = joules / 1000;
    const wh = joules / 3600;

    kjEl.textContent = kj >= 1000 ? (kj / 1000).toFixed(2) + ' MJ' : kj.toFixed(2) + ' kJ';
    oEl.textContent = omega.toFixed(2) + ' rad/s';
    whEl.textContent = wh.toFixed(2) + ' Wh';
  }

  iEl.addEventListener('input', update);
  rpmEl.addEventListener('input', update);
  update();
})();