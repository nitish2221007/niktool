(() => {
  'use strict';
  const rEl = document.getElementById('st-r'), tEl = document.getElementById('st-t');
  const lResEl = document.getElementById('st-res-lum'), mResEl = document.getElementById('st-res-mag');

  const T_sun = 5778.0;
  const L_sun_watts = 3.828e26;

  function update() {
    const R_rel = parseFloat(rEl.value), Teff = parseFloat(tEl.value);
    if (isNaN(R_rel) || isNaN(Teff) || R_rel <= 0 || Teff <= 0) return;

    const L_rel = Math.pow(R_rel, 2) * Math.pow(Teff / T_sun, 4);
    const L_watts = L_rel * L_sun_watts;
    const M_bol = 4.74 - (2.5 * Math.log10(L_rel));

    let specClass = '';
    if (Teff >= 30000) specClass = 'O-Type Blue Supergiant';
    else if (Teff >= 10000) specClass = 'B-Type Blue-White Star (e.g. Rigel)';
    else if (Teff >= 7500) specClass = 'A-Type White Star (e.g. Sirius, Vega)';
    else if (Teff >= 6000) specClass = 'F-Type Yellow-White Star (e.g. Procyon)';
    else if (Teff >= 5200) specClass = 'G-Type Yellow Star (e.g. Sun, Alpha Centauri)';
    else if (Teff >= 3700) specClass = 'K-Type Orange Dwarf (e.g. Arcturus)';
    else specClass = 'M-Type Red Dwarf / Supergiant (e.g. Betelgeuse)';

    lResEl.textContent = 'L = ' + (L_rel >= 1000 ? L_rel.toExponential(2) : L_rel.toFixed(2)) + ' L_☉ (' + L_watts.toExponential(3) + ' W)';
    mResEl.textContent = 'M_bol = ' + (M_bol >= 0 ? '+' : '') + M_bol.toFixed(2) + ' | ' + specClass;
  }

  rEl.addEventListener('input', update);
  tEl.addEventListener('input', update);
  update();
})();