(() => {
  'use strict';
  const dEl = document.getElementById('hub-dist'), h0El = document.getElementById('hub-h0');
  const vResEl = document.getElementById('hub-res-vel'), zResEl = document.getElementById('hub-res-z');

  const c_kms = 299792.458;

  function update() {
    const dMpc = parseFloat(dEl.value), H0 = parseFloat(h0El.value);
    if (isNaN(dMpc) || isNaN(H0) || dMpc <= 0 || H0 <= 0) return;

    const v_kms = H0 * dMpc;
    const beta = v_kms / c_kms;

    let z = 0;
    if (beta < 1.0) {
      z = Math.sqrt((1 + beta) / (1 - beta)) - 1;
    } else {
      z = beta;
    }

    const mly = dMpc * 3.26156;

    vResEl.textContent = 'v = ' + Math.round(v_kms).toLocaleString() + ' km / s (' + (beta * 100).toFixed(2) + '% Speed of Light)';
    zResEl.textContent = 'Redshift z = ' + z.toFixed(4) + ' | Lookback: ' + mly.toFixed(1) + ' Million Light-Years (H₀ = ' + H0 + ' km/s/Mpc)';
  }

  dEl.addEventListener('input', update);
  h0El.addEventListener('input', update);
  update();
})();