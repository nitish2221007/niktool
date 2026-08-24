(() => {
  'use strict';
  const mEl = document.getElementById('bh-mass');
  const rResEl = document.getElementById('bh-res-rs'), tResEl = document.getElementById('bh-res-temp');

  const G = 6.67430e-11;
  const c = 2.99792458e8;
  const hbar = 1.054571817e-34;
  const kB = 1.380649e-23;
  const M_sun = 1.989e30;
  const M_earth = 5.9722e24;

  function update() {
    const val = mEl.value;
    let M = 0;
    if (val === 'earth') M = M_earth;
    else M = parseFloat(val) * M_sun;

    const rs = (2 * G * M) / Math.pow(c, 2);
    const Th = (hbar * Math.pow(c, 3)) / (8 * Math.PI * G * M * kB);

    let rsStr = '';
    if (rs < 0.01) rsStr = (rs * 1000).toFixed(2) + ' mm';
    else if (rs < 1000) rsStr = rs.toFixed(1) + ' m';
    else if (rs < 1e9) rsStr = (rs / 1000).toLocaleString(undefined, {maximumFractionDigits: 1}) + ' km';
    else rsStr = (rs / 1.496e11).toFixed(2) + ' AU (Astronomical Units)';

    let thStr = '';
    if (Th < 1e-6) thStr = (Th * 1e9).toFixed(2) + ' nK (Nanokelvin)';
    else if (Th < 1.0) thStr = (Th * 1000).toFixed(2) + ' mK';
    else thStr = Th.toExponential(2) + ' K';

    rResEl.textContent = 'r_s = ' + rsStr + ' (Horizon Diameter: ' + (rs >= 1000 ? ((2*rs)/1000).toLocaleString(undefined, {maximumFractionDigits: 1}) + ' km' : ((2*rs)).toFixed(1) + ' m') + ')';
    tResEl.textContent = 'Hawking Temp T_H = ' + thStr + ' (Surface Gravity κ = ' + (Math.pow(c,4)/(4*G*M)).toExponential(2) + ' m/s²)';
  }

  mEl.addEventListener('change', update);
  update();
})();