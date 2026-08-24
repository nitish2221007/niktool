(() => {
  'use strict';
  const dEl = document.getElementById('hl-dist'), hEl = document.getElementById('hl-h0');
  const vResEl = document.getElementById('hl-res-v'), zResEl = document.getElementById('hl-res-z');

  const c_kms = 299792.458; // speed of light in km/s
  const Mpc_to_Mly = 3.26156;

  function update() {
    const d_Mpc = parseFloat(dEl.value), H0 = parseFloat(hEl.value);
    if (isNaN(d_Mpc) || isNaN(H0) || d_Mpc <= 0 || H0 <= 0) return;

    // Hubble law: v = H0 * d  [km / s]
    const v = H0 * d_Mpc;
    const beta = v / c_kms;

    // Relativistic redshift formula: 1 + z = sqrt((1 + beta)/(1 - beta)) if beta < 1
    let z = 0;
    if (beta < 0.99) {
      z = Math.sqrt((1.0 + beta) / (1.0 - beta)) - 1.0;
    } else {
      z = beta; // non-relativistic linear approximation fallback
    }

    // Lookback time approx: d_Mly = d_Mpc * 3.26156 Million light-years
    const d_Mly = d_Mpc * Mpc_to_Mly;

    // Hubble time: 1 / H0 converted to billions of years (Gyr)
    // 1 km/s/Mpc = 3.24078e-20 s^-1 => t_H = 1 / (H0 * 3.24078e-20) / (3.15576e16 seconds/Gyr)
    const t_Hubble_Gyr = 977.8 / H0;

    vResEl.textContent = 'Recession Velocity v = ' + Math.round(v).toLocaleString() + ' km / s (' + (beta * 100).toFixed(2) + '% c)';
    zResEl.textContent = 'Redshift z = ' + z.toFixed(4) + ' | Lookback = ' + d_Mly.toFixed(1) + ' Mly | Hubble Age t_H = ' + t_Hubble_Gyr.toFixed(2) + ' Billion Years';
  }

  dEl.addEventListener('input', update);
  hEl.addEventListener('input', update);
  update();
})();