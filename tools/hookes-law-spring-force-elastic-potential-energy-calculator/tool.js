(() => {
  'use strict';
  const kEl = document.getElementById('hk-k'), xEl = document.getElementById('hk-x');
  const fResEl = document.getElementById('hk-res-f'), epResEl = document.getElementById('hk-res-ep');

  function update() {
    const k = parseFloat(kEl.value), x_cm = parseFloat(xEl.value);
    if (isNaN(k) || isNaN(x_cm) || k <= 0 || x_cm < 0) return;

    const x_m = x_cm / 100.0;

    // F = k * x  [Newtons]
    const F = k * x_m;

    // E_p = 0.5 * k * x^2  [Joules]
    const E_p = 0.5 * k * Math.pow(x_m, 2);

    fResEl.textContent = 'F = ' + F.toFixed(2) + ' N (Restoring Force)';
    epResEl.textContent = 'Stored Energy E_p = ' + E_p.toFixed(3) + ' Joules (k = ' + k + ' N/m @ x = ' + x_m.toFixed(3) + ' m / ' + x_cm + ' cm)';
  }

  kEl.addEventListener('input', update);
  xEl.addEventListener('input', update);
  update();
})();