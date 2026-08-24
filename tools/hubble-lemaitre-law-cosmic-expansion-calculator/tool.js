(() => {
  'use strict';
  const dEl = document.getElementById('hub-dist'), h0El = document.getElementById('hub-h0');
  const vResEl = document.getElementById('hub-res-v'), zResEl = document.getElementById('hub-res-z');

  const c_kms = 299792.458; // km / s

  function update() {
    const dMpc = parseFloat(dEl.value), H0 = parseFloat(h0El.value);
    if (isNaN(dMpc) || isNaN(H0) || dMpc <= 0 || H0 <= 0) return;

    // Hubble Law: v = H0 * d  [km / s]
    const v = H0 * dMpc;
    const z = v / c_kms;
    const lightYearsMly = dMpc * 3.26156;
    const pctC = (v / c_kms) * 100;

    vResEl.textContent = Math.round(v).toLocaleString() + ' km / s (' + pctC.toFixed(2) + '% speed of light)';
    zResEl.textContent = 'Redshift z = ' + z.toFixed(4) + ' (Distance: ' + Math.round(lightYearsMly) + ' Million Light-Years)';
  }

  dEl.addEventListener('input', update);
  h0El.addEventListener('input', update);
  update();
})();